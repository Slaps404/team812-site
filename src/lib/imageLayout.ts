// HTML's `sizes` attribute cannot read CSS custom properties. Keep these
// browser hints together and validate the resulting resource choice in the
// rendered-site tests whenever the matching layout tokens change.
export const HERO_IMAGE_WIDTHS = [480, 768, 960, 1280, 1600, 2000];
export const CONTENT_IMAGE_WIDTHS = [320, 360, 480, 640, 800, 1024, 1280, 1500];

export const HERO_IMAGE_SIZES = '100vw';
export const SPLIT_IMAGE_SIZES =
  '(max-width: 820px) calc(100vw - 3rem), calc((min(100vw, 68rem) - 6rem) * 0.4)';
export const PAIR_IMAGE_SIZES =
  '(max-width: 820px) calc(100vw - 3rem), calc((min(100vw, 68rem) - 4.2rem) / 2)';
