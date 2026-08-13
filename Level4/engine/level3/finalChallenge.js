// =====================================================
// FINAL CHALLENGE.JS
// Level 3 - Unit 7 (Final)
// =====================================================

const challengeInput = document.getElementById("studentCode");
const checkBtn = document.getElementById("checkChallenge");
const message = document.getElementById("challengeMessage");

const nextBtn = document.getElementById("nextBtn");
const questStatus = document.getElementById("questStatus");

const CHALLENGE_KEY = "l3_final_challenge";

// ----------------------------------------------------
// Initial State
// ----------------------------------------------------

if (localStorage.getItem(CHALLENGE_KEY) === "true") {

    challengeInput.disabled = true;
    checkBtn.disabled = true;

    message.textContent = "✅ Challenge Complete";

    nextBtn.disabled = false;

}

// ----------------------------------------------------
// Challenge
// ----------------------------------------------------

checkBtn.addEventListener("click", () => {

    const code = challengeInput.value;

    const hasRecords = hasAssignment(code, "records");
    const hasRegionTowns = hasAssignment(code, "region_towns");
    const hasForLoopUnpack = /\bfor\s+\w+\s*,\s*\w+\s+in\s+records\b/.test(code);
    const buildsDictNoDupes = /\.setdefault\s*\(/.test(code) || /not\s+in/.test(code);
    const usesSetForRegions = /\bset\s*\(/.test(code) || /\{[^{}]*\bfor\b[^{}]*\}/.test(code);
    const usesLen = /\blen\s*\(/.test(code);
    const usesMaxWithKey = /\bmax\s*\([^)]*key\s*=/.test(code);
    const printCount3 = countMatches(code, /\bprint\s*\(/g) >= 3;

    const correct = hasRecords &&
        hasRegionTowns &&
        hasForLoopUnpack &&
        buildsDictNoDupes &&
        usesSetForRegions &&
        usesLen &&
        usesMaxWithKey &&
        printCount3;

    if (!correct) {

        message.textContent =
        "❌ Your solution is incomplete. Make sure you build region_towns from records without duplicate towns, print it, count unique regions with a set, and find the region with the most towns using max() with a key= function.";

        return;

    }

    // ------------------------------
    // Save Challenge
    // ------------------------------

    localStorage.setItem(CHALLENGE_KEY, "true");

    message.textContent =
    "✅ Excellent! Challenge Complete.";

    challengeInput.disabled = true;
    checkBtn.disabled = true;

    completeQuest(QUEST.id);

    questStatus.textContent =
    "🏆 Lesson Complete! You may continue.";

    nextBtn.disabled = false;

});

// ----------------------------------------------------
// Next Lesson
// ----------------------------------------------------

nextBtn.addEventListener("click", () => {

    if (!isQuestComplete(QUEST.id)) {

        questStatus.textContent =
        "⚠ Finish this lesson first.";

        return;

    }

    window.location.href = QUEST.nextHref;

});

// ----------------------------------------------------
// Restore Lesson Completion
// ----------------------------------------------------

if (isQuestComplete(QUEST.id)) {

    nextBtn.disabled = false;

    questStatus.textContent =
    "🏆 Lesson already completed.";

}
