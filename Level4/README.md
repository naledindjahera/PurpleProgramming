# Purple Programming — Foundation (Level 1 rebuild)

Offline Python learning game for the coding camp. No build step, no
dependencies, no internet required — just open `index.html`.

## What changed in this rebuild

- **Welcome screen** is now real HTML/CSS (title, pills, button) instead of
  a single baked PNG with an invisible button positioned by percentage —
  it now scales correctly on any screen and any zoom level.
- **One shared `style.css`**, organized exactly as planned (Reset → Root
  Variables → Global → Buttons → Welcome → Level Select → Level Page →
  Quest Page → Cards → Animations → Responsive). No duplicate classes.
- **Real unlock logic.** `engine/save.js` is the single source of truth
  for progress (localStorage only, no accounts/server). It knows the
  quest order for every level and computes what's unlocked — the level
  select page, the level hub, and every quest page all read from it
  instead of hardcoding `locked`/`unlocked` classes in the HTML.
- **One shared `engine/quest.js`** drives every quest page: the step
  dots at the top, the hint/reveal toggles, and the Mark Complete → Next
  Unit flow. Visiting a locked quest URL directly now redirects you back
  to the level hub instead of quietly showing it.
- Broken/missing background images (`level1.png`…`level4.png`, the empty
  `welcome_v2.png`) are gone — realm art is generated with CSS gradients
  per level/unit instead, so nothing 404s.
- Fonts use a system stack (`Iowan Old Style`/Palatino/Georgia for
  display, system sans for body, system mono for code) so the site looks
  right with **zero internet access**, which matters since this runs
  offline on camp laptops.

## Structure

```
index.html                    Welcome screen
style.css                     Single design system
engine/save.js                Progress engine + quest/level registry
engine/quest.js                Shared quest-page behaviour
levels/levelSelect.html       "Choose Your Path" — 4 realms
levels/level1.html            Level 1 hub — unit path
quests/level1/*.html          The 6 Level 1 units (5 topics + Crystal Guardian)
```

## Extending to Level 2–4

1. Add the level's quest ids to `LEVEL_QUESTS` in `engine/save.js` (already
   stubbed in for all 4 levels).
2. Copy `levels/level1.html` → `levels/level2.html`, update the copy and
   `data-quest` / icon / href values in each `.unit-row`.
3. Copy a `quests/level1/*.html` file as the template for each new unit —
   keep the `panel.definition` → `panel.example` → `panel.challenge` →
   actions structure so `engine/quest.js` keeps working with no changes.
4. Update `levels/levelSelect.html`'s `LEVEL_HREF` button for that level
   (it already reads lock state from `save.js` automatically).

## Reset progress (for testing)

Open the browser console on any page and run `resetGame()`.

## "I can't advance past a unit" / progress doesn't save

This app saves progress with `localStorage`, keyed per unit. Most
browsers allow that fine even when you just double-click `index.html`
(a `file://` URL) — but some don't: Safari blocks it outright, and
Chrome/Edge can block it too depending on privacy settings, antivirus
software, or if the folder lives on a USB drive or network share. When
that happens, clicking "Mark Challenge Complete" silently fails to
save, so "Next Unit" never lights up.

If you see a pink warning bar at the top of the page saying storage is
blocked, that's what's happening. The fix is to serve the folder over
`http://` instead of opening the file directly:

```
cd PurpleProgramming
python3 -m http.server 8000
```

then open `http://localhost:8000` in your browser. (Any simple static
server works — VS Code's "Live Server" extension is another easy
option.) Once it's served over http, localStorage works normally in
every browser and progress will save and persist as expected.
