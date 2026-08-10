// =====================================================================
// PURPLE PROGRAMMING — SAVE ENGINE
// Local, offline progress tracking. No accounts, no server, no XP.
// =====================================================================

const SAVE_KEY = "purpleProgrammingSave";

// Ordered quest ids per level. Order matters — it drives sequential
// unlocking within a level.
const LEVEL_QUESTS = {
  1: ["l1-variables", "l1-datatypes", "l1-operators", "l1-io", "l1-typecasting", "l1-final"],
  2: ["l2-conditionals", "l2-functions", "l2-methods", "l2-parameters", "l2-return", "l2-final"],
  3: ["l3-lists", "l3-strings", "l3-dictionaries", "l3-sets", "l3-stacks", "l3-queues", "l3-final"],
  4: ["l4-classes", "l4-objects", "l4-constructors", "l4-inheritance", "l4-polymorphism", "l4-encapsulation", "l4-final"]
};

const TOTAL_LEVELS = Object.keys(LEVEL_QUESTS).length;

const defaultSave = {
  unlockedLevels: [1],
  completedLevels: [],
  completedQuests: []
};

// Some browsers (Safari always, others under stricter privacy settings)
// block localStorage entirely when a page is opened as a file:// URL
// instead of served over http(s). Detect that once up front so the rest
// of the app can fail gracefully instead of silently breaking mid-click.
let STORAGE_OK = true;
let memorySave = { ...defaultSave };

(function checkStorage() {
  try {
    const testKey = "__pp_storage_test__";
    localStorage.setItem(testKey, "1");
    localStorage.removeItem(testKey);
  } catch (e) {
    STORAGE_OK = false;
  }
})();

function createSave() {
  if (!STORAGE_OK) return;
  try {
    if (!localStorage.getItem(SAVE_KEY)) {
      localStorage.setItem(SAVE_KEY, JSON.stringify(defaultSave));
    }
  } catch (e) {
    STORAGE_OK = false;
  }
}

function getSave() {
  if (!STORAGE_OK) return { ...memorySave };
  try {
    const raw = JSON.parse(localStorage.getItem(SAVE_KEY));
    if (!raw) return { ...defaultSave };
    // guard against corrupted/partial saves
    return {
      unlockedLevels: raw.unlockedLevels || [1],
      completedLevels: raw.completedLevels || [],
      completedQuests: raw.completedQuests || []
    };
  } catch (e) {
    return { ...defaultSave };
  }
}

function saveGame(data) {
  if (!STORAGE_OK) {
    memorySave = data;
    return;
  }
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch (e) {
    STORAGE_OK = false;
    memorySave = data;
  }
}

function resetGame() {
  memorySave = { ...defaultSave };
  if (!STORAGE_OK) return;
  try {
    localStorage.removeItem(SAVE_KEY);
    createSave();
  } catch (e) {
    STORAGE_OK = false;
  }
}

// If storage is blocked, tell the player plainly instead of leaving them
// stuck with a Next button that never enables. Progress made on THIS
// page will still work (so Mark Complete / Next behave correctly), but
// it won't carry over once you leave the page — the real fix is to run
// the site through a local server instead of double-clicking the file.
function warnIfStorageBlocked() {
  if (STORAGE_OK) return;
  const bar = document.createElement("div");
  bar.textContent =
    "⚠ Your browser is blocking saved progress on this page (this happens when opening the file directly instead of through a web server). " +
    "You can keep going, but progress won't be remembered once you leave this page. See the README for the one-line fix.";
  bar.style.cssText =
    "position:relative;z-index:9999;background:#3a1424;color:#f2cdd8;" +
    "font-family:system-ui,sans-serif;font-size:13px;line-height:1.5;" +
    "padding:10px 18px;text-align:center;border-bottom:1px solid rgba(255,255,255,.15);";
  document.body.prepend(bar);
}
document.addEventListener("DOMContentLoaded", warnIfStorageBlocked);

function hasAnyProgress() {
  const save = getSave();
  return save.completedQuests.length > 0 || save.unlockedLevels.length > 1;
}

// ---------- levels ----------

function isLevelUnlocked(level) {
  return getSave().unlockedLevels.includes(level);
}

function isLevelComplete(level) {
  return getSave().completedLevels.includes(level);
}

function unlockLevel(level) {
  const save = getSave();
  if (!save.unlockedLevels.includes(level)) {
    save.unlockedLevels.push(level);
    saveGame(save);
  }
}

function completeLevel(level) {
  const save = getSave();
  if (!save.completedLevels.includes(level)) {
    save.completedLevels.push(level);
    saveGame(save);
  }
  if (LEVEL_QUESTS[level + 1]) unlockLevel(level + 1);
}

function levelProgress(level) {
  const quests = LEVEL_QUESTS[level] || [];
  const save = getSave();
  const done = quests.filter(id => save.completedQuests.includes(id)).length;
  return { done, total: quests.length };
}

function foundationProgress() {
  const save = getSave();
  return { done: save.completedLevels.length, total: TOTAL_LEVELS };
}

// ---------- quests ----------

function levelOfQuest(questId) {
  for (const [level, quests] of Object.entries(LEVEL_QUESTS)) {
    if (quests.includes(questId)) return Number(level);
  }
  return null;
}

function isQuestComplete(questId) {
  return getSave().completedQuests.includes(questId);
}

function isQuestUnlocked(questId) {
  const level = levelOfQuest(questId);
  if (level === null) return false;
  if (!isLevelUnlocked(level)) return false;

  const quests = LEVEL_QUESTS[level];
  const index = quests.indexOf(questId);
  if (index === 0) return true;

  const save = getSave();
  return save.completedQuests.includes(quests[index - 1]);
}

function completeQuest(questId) {
  const save = getSave();
  if (!save.completedQuests.includes(questId)) {
    save.completedQuests.push(questId);
    saveGame(save);
  }

  const level = levelOfQuest(questId);
  const quests = LEVEL_QUESTS[level] || [];
  const isFinal = quests[quests.length - 1] === questId;
  if (isFinal) completeLevel(level);
}

function nextQuestId(questId) {
  const level = levelOfQuest(questId);
  const quests = LEVEL_QUESTS[level] || [];
  const index = quests.indexOf(questId);
  return quests[index + 1] || null;
}

createSave();
