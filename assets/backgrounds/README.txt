HOW TO ADD YOUR OWN BACKGROUND IMAGES
======================================

Drop one image per level into this folder, named exactly:

  level1.jpg
  level2.jpg
  level3.jpg
  level4.jpg

That's it — no code changes needed. The site already looks for these
four files:

  - levels/levelSelect.html  -> shown on each realm card ("Choose Your Path")
  - levels/level1.html..4.html -> shown as the big banner at the top of
    each level's hub page

If a file is missing, that spot just falls back to the original purple
gradient — nothing breaks.

Tips:
  - Landscape/wide images work best (the banners are much wider than tall).
  - Keep each file under ~500KB–1MB so pages load fast, especially if this
    runs on camp laptops offline from a local folder.
  - Using a different format? Just change the extension in the two spots
    above (search style="--realm-img / style="--hero-img in the .html
    files) from .jpg to .png/.webp/etc.
