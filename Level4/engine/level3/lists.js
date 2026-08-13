// =====================================================
// LISTS.JS
// Level 3 - Unit 1
// =====================================================

const challengeInput = document.getElementById("studentCode");
const checkBtn = document.getElementById("checkChallenge");
const message = document.getElementById("challengeMessage");

const nextBtn = document.getElementById("nextBtn");
const questStatus = document.getElementById("questStatus");

const CHALLENGE_KEY = "l3_lists_challenge";

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

    const hasTowns = hasAssignment(code, "towns");
    const hasPopulations = hasAssignment(code, "populations");
    const usesMax = /\bmax\s*\(/.test(code);
    const usesIndex = /\.index\s*\(/.test(code);
    const usesSum = /\bsum\s*\(/.test(code);
    const usesRound = /\bround\s*\(/.test(code);
    const usesLastThreeSlice = /\[\s*-3\s*:\s*\]/.test(code);
    const printCount = countMatches(code, /\bprint\s*\(/g);

    const correct =
        hasTowns &&
        hasPopulations &&
        usesMax &&
        usesIndex &&
        usesSum &&
        usesRound &&
        usesLastThreeSlice &&
        printCount >= 4;

    if (!correct) {

        message.textContent =
        "❌ Your solution is incomplete. Make sure you create both the towns and populations lists, use max() and .index() to find the biggest town, sum() and round() for the totals, and a [-3:] slice for the last three towns.";

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
