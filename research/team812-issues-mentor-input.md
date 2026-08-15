# Team 812 issues 1-2, 3-5, 7, and 9-11

Research checked 2026-08-13. `Publicly verified` means a first-party public source supports the fact. It does not automatically mean that the team has approved publishing it. `Public lead only` means the source is useful for follow-up but is not sufficient proof. `Not found` means no adequate public evidence was located.

## Executive summary

| Issue | What it is | Public availability | Mentor input still needed |
|---|---|---|---|
| [#1](https://github.com/Slaps404/team812-site/issues/1) | Finish sponsor email, donation, invoice, and W-9 flow | Donation destination and UCSD procedures are public. The team-specific approval is not. | Exact public email, approved payment route, legal payee/W-9 path, invoice owner, and final copy. |
| [#2](https://github.com/Slaps404/team812-site/issues/2) | Replace four `$0,000` budget placeholders | No Team 812 2027 figures found. FIRST examples are planning references only. | Four approved amounts, estimate/committed status, scope, and reconciliation to `$10,000`. |
| [#3](https://github.com/Slaps404/team812-site/issues/3) | Replace supporter placeholder and show all approved supporters | No public individual supporter list found. | Approved names and spelling, or approval for an empty state. |
| [#4](https://github.com/Slaps404/team812-site/issues/4) | Reconcile current/past/in-kind/institutional sponsor categories | FIRST publicly lists six 2026 organizations. It does not classify them or grant logo permission. | Category, effective year, display name, and logo treatment for each organization. |
| [#5](https://github.com/Slaps404/team812-site/issues/5) | Replace or remove the dead `Join the team` CTA | A public team recruitment lead exists, but the linked page contains placeholder/sample copy. | Approved current destination, audience, CTA text, or approval to remove it. |
| [#7](https://github.com/Slaps404/team812-site/issues/7) | Fix duplicated sponsor benefits and the ten-item claim | The current draft has 10 rows but only 8 unique benefits. | Final stacking model, benefit list, unique count, and deliverability approval. |
| [#9](https://github.com/Slaps404/team812-site/issues/9) | Promote stats and explain 2001 versus 2002 | FIRST verifies 25 seasons, 51 events, and 5 Championship trips. FIRST also supports 2001 start and 2002 rookie year. | Approval of exact wording and the canonical chant. |
| [#10](https://github.com/Slaps404/team812-site/issues/10) | Verify 2026 photo captions | FIRST verifies the official event, but not the exact photo timing, activity, or complete roster claims. | Per-photo event, date, activity, timing, roster status, and approved caption/alt text. |
| [#11](https://github.com/Slaps404/team812-site/issues/11) | Remove unsupported absolutes about student backgrounds | Preuss supports careful low-income and first-generation eligibility wording. It does not support the household, family-engineer, or first-exposure absolutes. | Approved sourced wording or anonymized aggregate evidence. Do not collect student-level details. |

## Source-backed findings

### Issue #1

- The official team site links to [UCSD Give, fund 4144](https://giveto.ucsd.edu/giving/home/?sk=3&txtFundNo=4144). UCSD's [fund reference](https://www-bfs.ucsd.edu/gen/coa/IndexTips/FundRef.pdf) identifies E4144 as the Preuss School Robotics Team fund.
- UCSD publishes a [Gift Services process](https://blink.ucsd.edu/sponsor/advancement/advancement-services/gift-services-and-accounting/gift-services/get-help.html) for gift requests and a [W-9 process](https://blink.ucsd.edu/finance/tax/forms/w9/index.html). These are institutional procedures, not proof that Team 812 has approved its public sponsor workflow.
- The repo's `sponsors@themidnightmechanics.com` address is explicitly flagged as needing a real address in [`src/pages/sponsors.astro`](../src/pages/sponsors.astro).

Ask the mentor to confirm the exact public inbox, who owns it, whether corporate sponsorship uses UCSD Give or an invoice path, who submits the invoice request, the legal payee, and how sponsors obtain the current W-9.

### Issue #2

The site currently publishes `$0,000` for registration, parts, travel, and tools in [`src/data/funds.yaml`](../src/data/funds.yaml). FIRST publishes example prices in its [registration pricing](https://www.firstinspires.org/programs/cost-and-registration) and [fundraising guide](https://info.firstinspires.org/hubfs/web/program/frc/resources/fundraising-guide.pdf), but those are not Team 812's approved 2027 budget.

Ask for the approved amount, scope, and status for each category. The four values must total `$10,000`, or the difference must be explained.

### Issue #3

The official [officers page](https://www.themidnightmechanics.com/officers) and [mentors page](https://www.themidnightmechanics.com/mentors-team812) list team people but do not identify individual supporters. Do not turn those pages into a supporter list. Ask for approved public supporter names, exact spelling, and permission to publish, or approval to hide the section/use an empty state.

### Issue #4

[FIRST's 2026 Team 812 record](https://frc-events.firstinspires.org/2026/team/812) lists Qualcomm, LEIDOS, Nordson, Cluely, University of California San Diego Machine Shop, and Preuss School. It does not say which are current, past, in-kind, or institutional supporters, and it does not grant logo usage permission.

Ask the mentor to classify each organization, provide the approved display name, effective season/year, and logo or text-only treatment.

### Issue #5

The official team homepage links a student join action to [Schedule Appointment](https://www.themidnightmechanics.com/schedule-appointment-ready), but that destination contains placeholder/sample copy. [Preuss ASB](https://preuss.ucsd.edu/current-students/asb.html) confirms Robotics as a club but does not provide a current join route. Ask the mentor to approve a real recruitment URL, email, or school process, or approve removing the CTA.

### Issue #7

The public draft in [`src/data/tiers.yaml`](../src/data/tiers.yaml) has `$1,000`, `$2,500`, and `$5,000` additive tiers. The sponsor page says the tiers stack and a `$5,000` sponsor gets all ten rows, but the robot decal and team-shirt benefits repeat. That produces 10 listed rows and 8 unique benefits. The team still needs to approve the final model and confirm that each benefit is deliverable.

The current unique deliverables are: robot decal, team shirts, robot demo at a sponsor office, homepage logo, pit-banner logo, sponsors-page logo, social thank-you post, and team thank-you letter.

### Issue #9

[FIRST's Team 812 record](https://frc-events.firstinspires.org/team/812) reports 25 seasons competed, 51 total events competed, and 5 trips to FIRST Championship. FIRST's [2016 team essay](https://info.firstinspires.org/hubfs/web/program/frc/awards/fia-essays/2016/812.pdf) says the team started in 2001, while the current FIRST record lists rookie year 2002. The official team site displays the chant, “What time is it? Midnight! What are we? Mechanics!”

Suggested wording for mentor approval: `Founded in 2001; first competed in FIRST in 2002. FIRST reports 25 seasons, 51 events, and 5 trips to the FIRST Championship.`

### Issue #10

FIRST verifies the official event name and attendance: [FIRST California Southern State Championship presented by Qualcomm](https://frc-events.firstinspires.org/2026/CASCMP), April 9-12, 2026. The public [photo index](https://github.com/Slaps404/team812-site/blob/main/photos/INDEX.md) is useful team-owned evidence, but it does not independently prove the exact timing, activity, or complete roster for each image.

The mentor should confirm these files individually:

| File | Current claim needing confirmation |
|---|---|
| `IMG_1045` | Pit crew at the 2026 state championship. |
| `IMG_1026` | Shooter tuning between matches. |
| `IMG_1033` | Drivetrain repair, 30 minutes to queue. |
| `IMG_0935` | 2026 people at The Preuss School, and whether this is intended as a roster claim. |
| `IMG_1011` | 2026 Team 812 roster / “people you would be funding.” |

For each, request event code, date, photographer/source, activity, timing, roster status, and the final caption/alt text.

### Issue #11

The [Preuss eligibility page](https://preuss.ucsd.edu/about-preuss/preuss-at-a-glance.html) supports careful wording about low-income eligibility and first-generation college eligibility. It does not establish that every student has no home workshop, has no family engineer, or first encounters CAD, motor controllers, version control, and deadlines through Team 812.

The phrase `25 seasons of first-generation engineers` is also too broad: first-generation college eligibility is not the same as every student becoming an engineer. Ask the mentor to approve school-source wording or provide an anonymized aggregate source. Do not collect student names, household details, or individually identifiable information in the form.

## Google Form proposal

### Title

**Team 812 Website Facts and Public Copy Approval**

### Description

`This form collects the team-approved facts and wording needed to finish website issues 1, 2, 3, 4, 5, 7, 9, 10, and 11. Please answer as a mentor, school representative, or team owner authorized to approve public copy. Do not include student names, household details, private financial information, or a W-9 upload. Link to the approved document or tell us who manages it instead.`

### Section 1: respondent

1. Name and role - short answer, required.
2. Date reviewed - date, required.
3. Authorization - checkbox, required: `I am authorized to approve these facts or will route them to the person who is.`

### Section 2: sponsor contact and payment flow, issue #1

1. Approved public sponsor email - short answer, required.
2. Backup contact route - short answer.
3. Approved donation route - multiple choice: `UCSD Give fund 4144`, `Different approved URL`, `No public donation link`, `Other`.
4. If different, paste the exact approved URL - short answer with URL validation.
5. Corporate payment process - multiple choice: `Donate through the public fund link`, `Request an invoice first`, `Both`, `Other`.
6. Who issues or submits the invoice request? - short answer.
7. Legal payee name and W-9 delivery process - paragraph. Ask for a link or responsible office, not the W-9 file itself.
8. Paste the exact public “How to give” wording - paragraph.

### Section 3: 2027 budget, issue #2

Create one repeated block for each category: registration/event fees, robot parts/materials, travel, and tools/shop equipment.

- Approved amount - short answer with number validation.
- Status - multiple choice: `Estimate`, `Committed`, `Covered by existing school/team resources`, `Other`.
- What does this amount include? - paragraph.
- Source or last-reviewed date - short answer.

Then ask: `Do these four approved amounts total $10,000?` - yes/no. If no, explain the difference - paragraph.

### Section 4: supporters and sponsor roster, issues #3 and #4

1. Supporter section - multiple choice: `Publish the approved names below`, `Hide the section`, `Show an approved empty state`.
2. Approved supporter display names and spelling - paragraph, one per line.
3. Do the listed supporters have permission for public listing? - yes/no.
4. For each of these organizations, provide category, approved display name, effective year, and logo treatment: Qualcomm, LEIDOS, Nordson, Cluely, UC San Diego Machine Shop, and The Preuss School.

Use a separate repeated block per organization:

- Category - multiple choice: `Current sponsor`, `Past support`, `In-kind support`, `Institutional support`, `Other`, `Do not display`.
- Approved public name - short answer.
- Logo treatment - multiple choice: `Use approved logo`, `Text only`, `Do not display`, `Needs separate permission`.
- Notes/source - paragraph.

### Section 5: recruitment CTA, issue #5

1. CTA decision - multiple choice: `Approve a recruitment destination`, `Remove Join the team`, `Keep hidden until approved`.
2. Audience - checkboxes: `Students`, `Mentors`, `Volunteers`, `Other`.
3. Approved destination URL or email - short answer with URL/email validation.
4. Approved CTA label and surrounding copy - paragraph.

### Section 6: sponsorship tiers, issue #7

1. Tier model - multiple choice: `Stacking/additive`, `Non-stacking`, `Other`.
2. Final approved benefits - checkboxes: robot decal, team shirts, robot demo at sponsor office, homepage logo, pit-banner logo, sponsors-page logo, social thank-you post, team thank-you letter, other.
3. For each selected benefit, what exact condition or limit should the site state? - paragraph.
4. Are all selected benefits deliverable by the team? - yes/no/needs review.
5. Approved unique benefit count - short answer with number validation.
6. Paste approved tier copy - paragraph.

### Section 7: team history and chant, issue #9

1. Approve this history wording - multiple choice: `Yes`, `Edit it below`, `Do not publish`.
2. Edited history wording - paragraph: `Founded in 2001; first competed in FIRST in 2002. FIRST reports 25 seasons, 51 events, and 5 trips to the FIRST Championship.`
3. Canonical chant - short answer or paragraph.
4. May the site attribute the figures to FIRST? - yes/no.

### Section 8: photo verification, issue #10

Make one subsection per filename: `IMG_1045`, `IMG_1026`, `IMG_1033`, `IMG_0935`, and `IMG_1011`.

For each filename ask:

1. Official event/location and event code - short answer.
2. Date or date range - short answer.
3. What is visibly happening? - paragraph.
4. Is the current activity claim accurate? - yes/no/edit below.
5. Is the exact timing claim accurate? - yes/no/not stated.
6. Does the image represent the complete roster? - yes/no/not a roster claim.
7. Photographer/source and permission notes - paragraph.
8. Final approved caption and alt text - paragraph.

### Section 9: student-background copy, issue #11

1. Approved evidence basis - multiple choice: `Use Preuss's public eligibility wording only`, `Use an approved anonymized aggregate statistic`, `Remove the claim`, `Other`.
2. Exact approved replacement copy - paragraph.
3. Public source URL or internal record owner - short answer.
4. Can the site say students may not have comparable tools at home? - yes/no/needs evidence.
5. Can the site make any aggregate family-engineering claim? - yes/no/needs evidence.
6. Can the site say the team gives students hands-on experience with CAD, motor controllers, version control, and deadlines? - yes/no/edit below.

Do not ask for household-by-household answers. If evidence is not already approved and anonymized, use careful access-based wording or remove the absolute claim.

## Suggested handling after the form

1. Save the response spreadsheet as the approval record.
2. Treat public facts as usable only after the mentor approves the exact website wording.
3. Put approved values into the existing single sources of truth: `src/data/funds.yaml`, `src/data/sponsors.yaml`, `src/data/tiers.yaml`, and `src/data/stats.yaml`.
4. Update the page copy and captions only from the approved responses.
5. Re-run the site build and manually test every new email, URL, and CTA.
