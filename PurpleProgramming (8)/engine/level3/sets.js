// =====================================================
// SETS.JS
// Level 3 - Unit 4
// =====================================================

const challengeInput = document.getElementById("studentCode");
const checkBtn = document.getElementById("checkChallenge");
const message = document.getElementById("challengeMessage");

const nextBtn = document.getElementById("nextBtn");
const questStatus = document.getElementById("questStatus");

const CHALLENGE_KEY = "l3_sets_challenge";

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

    const setConversions = countMatches(code, /\bset\s*\(/g) >= 2;
    const usesIntersection = /&/.test(code) || /\.intersection\s*\(/.test(code);
    const usesDifference = /\w\s*-\s*\w/.test(code) || /\.difference\s*\(/.test(code);
    const usesUnion = /\|/.test(code) || /\.union\s*\(/.test(code);
    const usesLen = /\blen\s*\(/.test(code);
    const printCount4 = countMatches(code, /\bprint\s*\(/g) >= 4;

    const correct = setConversions &&
        usesIntersection &&
        usesDifference &&
        usesUnion &&
        usesLen &&
        printCount4;

    if (!correct) {

        message.textContent =
        "❌ Your solution is incomplete. Make sure you convert both sign-up lists to sets, then use & for intersection, - for difference, | for union, and len() for the counts, printing all four results.";

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
