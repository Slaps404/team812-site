# themidnightmechanics.com

Website for **FRC Team 812, The Midnight Mechanics**, The Preuss School UC San Diego.

Built for sponsors. It answers one question: what does a company get for funding
this team, and where does the money go.

Astro, static output, no server and no database.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # writes dist/
```

Node 22.12 or newer. `.nvmrc` pins the version we use.

## Edit content

Page text lives in `src/pages/*.astro`. Repeating lists (sponsors, tiers, funds,
stats) are YAML in `src/data/`, checked by a schema in `src/content.config.ts`, so
a missing field fails the build with a named error instead of shipping a blank
page.

You do not need a local setup to change text. Edit the file on github.com.

## Design tokens

Every colour, size, and spacing value is one CSS custom property in
`src/styles/tokens.css`. Nothing else hardcodes them.

Press **T** on the dev server to open a tuning panel. Drag the sliders, click
Download, replace `tokens.css`. That is the whole theming workflow.

## Unconfirmed facts are flagged

Placeholder and unverified content is marked with class `ph` and shows an orange
flag. **Do not publish a flagged item.** Confirm the fact, then remove the flag.

## Photos

`src/assets/photos/` holds site-ready images with EXIF stripped, so they carry no
GPS coordinates. These are photos of minors at a school. Keep it that way.
The `photos/` folder is a local working archive (HEIC originals, intermediate
passes) and is gitignored. Git keeps every version of a binary forever, so camera
files never go in. See `photos/INDEX.md`.

## Ownership

This repo belongs to the team, not to a student. Keep at least two owners at all
times, and add the new one before removing the old one.
