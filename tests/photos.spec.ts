import { expect, test, type Browser, type Locator, type Response } from '@playwright/test';

const regularRatio = 1.3;
const tallRatio = regularRatio * 0.72;

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

async function selectedCandidate(image: Locator) {
  await image.scrollIntoViewIfNeeded();
  await image.evaluate((element: HTMLImageElement) => element.decode());
  const box = await image.boundingBox();
  const source = await image.evaluate((element: HTMLImageElement) => ({
    currentSrc: element.currentSrc,
    sizes: element.sizes,
    candidates: element.srcset.split(',').map((candidate) => {
      const [url, descriptor] = candidate.trim().split(/\s+/);
      return { url: new URL(url, document.baseURI).href, width: Number.parseInt(descriptor, 10) };
    }),
  }));
  const candidate = source.candidates.find(({ url }) => url === source.currentSrc);

  expect(box).not.toBeNull();
  expect(source.sizes).not.toBe('');
  // Small source assets may have fewer generated variants. The important
  // invariant is that the selected candidate is large enough for its slot.
  expect(source.candidates.length).toBeGreaterThanOrEqual(2);
  expect(candidate, `No srcset candidate matched ${source.currentSrc}`).toBeDefined();
  return { box: box!, candidateWidth: candidate!.width };
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
  const expectedWidth = (68 * 16 - 3 * 16 - 3 * 16) * 0.6;

  expect(box).not.toBeNull();
  expect(box!.width).toBeCloseTo(expectedWidth, 0);
  expect(box!.height).toBeCloseTo(expectedWidth / regularRatio, 1);
  expect(box!.width / box!.height).toBeCloseTo(regularRatio, 2);
});

test('each route exposes its likely LCP image eagerly in the initial HTML', async ({ request }) => {
  const homeMarkup = await (await request.get('/')).text();
  const sponsorsMarkup = await (await request.get('/sponsors/')).text();
  const homeLead = imageTagFor(homeMarkup, 'Team 812 members in matching team shirts posing together in a hotel lobby.');
  const sponsorLead = imageTagFor(sponsorsMarkup, 'The 2026 Team 812 roster in team shirts.');
  const belowFold = imageTagFor(homeMarkup, "A mentor and two students working on the robot's shooter mechanism in the pit.");

  for (const lead of [homeLead, sponsorLead]) {
    expect(lead).toContain('loading="eager"');
    expect(lead).toContain('fetchpriority="high"');
  }
  expect(belowFold).toContain('loading="lazy"');
  expect(belowFold).not.toContain('fetchpriority="high"');
});

test('homepage hero uses four alternating team and robot photos', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('.hero-slide')).toHaveCount(4);
  await expect(page.locator('.hero-slide img')).toHaveCount(4);
  const heroAlts = await page.locator('.hero-slide img').evaluateAll((images) => images.map((image) => (image as HTMLImageElement).alt));
  expect(heroAlts).toEqual([
    'Team 812 members in matching team shirts posing together in a hotel lobby.',
    "Team 812's competition robot collecting yellow game pieces beside the field wall.",
    'Team 812 members posing with their competition robot in the arena at a REBUILT event.',
    'Team 812 students and a mentor moving their competition robot through the arena.',
  ]);
});

test('homepage hero does not auto-advance', async ({ page }) => {
  await page.goto('/');

  const activeSlide = page.locator('.hero-slide.is-active img');
  await expect(activeSlide).toHaveAttribute('alt', 'Team 812 members in matching team shirts posing together in a hotel lobby.');
  await page.waitForTimeout(6500);
  await expect(activeSlide).toHaveAttribute('alt', 'Team 812 members in matching team shirts posing together in a hotel lobby.');

  await page.getByRole('button', { name: 'Next photo' }).click();
  await expect(page.locator('.hero-slide.is-active img')).toHaveAttribute('alt', "Team 812's competition robot collecting yellow game pieces beside the field wall.");
});

test('responsive source sets select a right-sized resource for every photo slot', async ({ page }) => {
  const alts = [
    'Team 812 members in matching team shirts posing together in a hotel lobby.',
    "A mentor and two students working on the robot's shooter mechanism in the pit.",
    'Students and a mentor working on the robot, with TEAM 812 on the bumper.',
  ];

  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');

    for (const alt of alts) {
      const { box, candidateWidth } = await selectedCandidate(page.getByAltText(alt));
      expect(candidateWidth).toBeGreaterThanOrEqual(Math.ceil(box.width));
      expect(candidateWidth).toBeLessThan(box.width * 1.65);
    }
  }
});

test('mobile browsers transfer materially smaller lead photos', async ({ browser }) => {
  const leads = [
    ['/', 'Team 812 members in matching team shirts posing together in a hotel lobby.'],
    ['/sponsors/', 'The 2026 Team 812 roster in team shirts.'],
  ] as const;

  for (const [path, alt] of leads) {
    const mobile = await selectedImage(browser, 390, path, alt);
    const desktop = await selectedImage(browser, 1440, path, alt);

    expect(mobile.url).not.toBe(desktop.url);
    expect(mobile.bytes).toBeLessThan(desktop.bytes * 0.8);
  }
});
