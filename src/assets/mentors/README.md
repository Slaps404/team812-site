# Mentor portraits

Drop a portrait here named after the mentor's `id` in `src/data/mentors.yaml`:

    dan-rupert.jpg
    shaoni-bandy.jpg
    dan-oneill.jpg

`src/components/Mentors.astro` picks the file up by name — no code change needed.
Square crops work best (the card slot is 1:1); anything else is cover-cropped to
the centre. Any mentor without a file here renders a monogram instead, so the
page never ships a broken or borrowed face.
