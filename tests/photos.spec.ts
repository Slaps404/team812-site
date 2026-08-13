import { expect, test, type Browser, type Locator, type Response } from '@playwright/test';

const regularRatio = 1.3;
const tallRatio = regularRatio * 0.52;

async function renderedRatio(image: Locator) {
  await image.scrollIntoViewIfNeeded();
  await image.evaluate((element: HTMLImageElement) => element.decode());
  const box = await image.boundingBox();
  expect(box).not.toBeNull();
  return box!.width / box!.height;
}

function imageTagFor(markup: string, alt: string) {
  return markup.match(new RegExp(`<img[^>]+alt="${alt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`))?.[0];
}

async function selectedImage(browser: Browser, width: number, path: string, alt: string) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const imageResponses = new Map<string, Response>();
  page.on('response', (response) => {
    if (response.request().resourceType() === 'image') imageResponses.set(response.url(), response);
  });

  await page.goto(path);
  const image = page.getByAltText(alt);
  await image.evaluate((element: HTMLImageElement) => element.decode());
  const url = await image.evaluate((element: HTMLImageElement) => element.currentSrc);
  const response = imageResponses.get(url);
  expect(response, `No browser response recorded for ${url}`).toBeDefined();
  const bytes = (await response!.body()).byteLength;
  await context.close();
  return { url, bytes };
}

for (const width of [390, 1440]) {
  test(`regular and tall photos preserve their designed ratios at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');

    const tall = page.getByAltText("A mentor and two students working on the robot's shooter mechanism in the pit.");
    const regular = page.getByAltText('Students and a mentor working on the robot, with TEAM 812 on the bumper.');

    expect(await renderedRatio(tall)).toBeCloseTo(tallRatio, 2);
    expect(await renderedRatio(regular)).toBeCloseTo(regularRatio, 2);
  });
}

test('sponsor roster uses the regular desktop photo slot', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/sponsors/');

  const roster = page.getByAltText('The 2026 Team 812 roster in team shirts.');
  await roster.evaluate((element: HTMLImageElement) => element.decode());
  const box = await roster.boundingBox();

  expect(box).not.toBeNull();
  expect(box!.width).toBeCloseTo(397, 0);
  expect(box!.height).toBeCloseTo(305, 0);
  expect(box!.width / box!.height).toBeCloseTo(regularRatio, 2);
});

test('each route exposes its likely LCP image eagerly in the initial HTML', async ({ request }) => {
  const homeMarkup = await (await request.get('/')).text();
  const sponsorsMarkup = await (await request.get('/sponsors/')).text();
  const homeLead = imageTagFor(homeMarkup, 'Team 812 students and mentors working around their robot in the pit at the 2026 state championship.');
  const sponsorLead = imageTagFor(sponsorsMarkup, 'The 2026 Team 812 roster in team shirts.');
  const belowFold = imageTagFor(homeMarkup, "A mentor and two students working on the robot's shooter mechanism in the pit.");

  for (const lead of [homeLead, sponsorLead]) {
    expect(lead).toContain('loading="eager"');
    expect(lead).toContain('fetchpriority="high"');
  }
  expect(belowFold).toContain('loading="lazy"');
  expect(belowFold).not.toContain('fetchpriority="high"');
});

test('photo source sets describe their responsive layout slots', async ({ page }) => {
  await page.goto('/');

  const hero = page.getByAltText('Team 812 students and mentors working around their robot in the pit at the 2026 state championship.');
  const split = page.getByAltText("A mentor and two students working on the robot's shooter mechanism in the pit.");
  const pair = page.getByAltText('Students and a mentor working on the robot, with TEAM 812 on the bumper.');

  expect(await hero.getAttribute('srcset')).toContain('480w');
  expect(await hero.getAttribute('srcset')).toContain('2000w');
  expect(await hero.getAttribute('sizes')).toBe('(max-width: 820px) 100vw, 46vw');

  expect(await split.getAttribute('srcset')).toContain('320w');
  expect(await split.getAttribute('srcset')).toContain('1500w');
  expect(await split.getAttribute('sizes')).toBe('(max-width: 820px) calc(100vw - 3rem), calc((min(100vw, 68rem) - 6rem) * 0.4)');

  expect(await pair.getAttribute('srcset')).toContain('320w');
  expect(await pair.getAttribute('srcset')).toContain('1500w');
  expect(await pair.getAttribute('sizes')).toBe('(max-width: 820px) calc(100vw - 3rem), calc((min(100vw, 68rem) - 4.2rem) / 2)');

  await page.goto('/sponsors/');
  const roster = page.getByAltText('The 2026 Team 812 roster in team shirts.');
  expect(await roster.getAttribute('srcset')).toContain('320w');
  expect(await roster.getAttribute('sizes')).toBe('(max-width: 820px) calc(100vw - 3rem), calc((min(100vw, 68rem) - 6rem) * 0.4)');
});

test('mobile browsers transfer materially smaller lead photos', async ({ browser }) => {
  const leads = [
    ['/', 'Team 812 students and mentors working around their robot in the pit at the 2026 state championship.'],
    ['/sponsors/', 'The 2026 Team 812 roster in team shirts.'],
  ] as const;

  for (const [path, alt] of leads) {
    const mobile = await selectedImage(browser, 390, path, alt);
    const desktop = await selectedImage(browser, 1440, path, alt);

    expect(mobile.url).not.toBe(desktop.url);
    expect(mobile.bytes).toBeLessThan(desktop.bytes * 0.8);
  }
});
