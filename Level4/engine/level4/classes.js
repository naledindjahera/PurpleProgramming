// =====================================================
// CLASSES.JS
// Level 4 - Unit 1
// =====================================================

const challengeInput = document.getElementById("studentCode");
const checkBtn = document.getElementById("checkChallenge");
const message = document.getElementById("challengeMessage");

const nextBtn = document.getElementById("nextBtn");
const questStatus = document.getElementById("questStatus");

const CHALLENGE_KEY = "l4_classes_challenge";

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

    const hasClassLearner = /\bclass\s+Learner\s*(\(\s*\))?\s*:/.test(code);
    const hasClassCamp = /\bclass\s+Camp\s*(\(\s*\))?\s*:/.test(code);
    const printsLearner = /print\s*\(\s*Learner\s*\)/.test(code);
    const printsCamp = /print\s*\(\s*Camp\s*\)/.test(code);
    const usesTypeTwice = countMatches(code, /\btype\s*\(/g) >= 2;

    const correct = hasClassLearner &&
        hasClassCamp &&
        printsLearner &&
        printsCamp &&
        usesTypeTwice;

    if (!correct) {

        message.textContent =
        "❌ Your solution is incomplete. Make sure you define both empty classes (Learner and Camp), print each class directly, and print type() of each class.";

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
