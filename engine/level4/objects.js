// =====================================================
// OBJECTS.JS
// Level 4 - Unit 2
// =====================================================

const challengeInput = document.getElementById("studentCode");
const checkBtn = document.getElementById("checkChallenge");
const message = document.getElementById("challengeMessage");

const nextBtn = document.getElementById("nextBtn");
const questStatus = document.getElementById("questStatus");

const CHALLENGE_KEY = "l4_objects_challenge";

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
    const threeInstances = countMatches(code, /=\s*Learner\s*\(\s*\)/g) >= 3;
    const threeNameAssigns = countMatches(code, /\.name\s*=/g) >= 3;
    const usesIsComparison = /\bis\b/.test(code);
    const printCount4 = countMatches(code, /\bprint\s*\(/g) >= 4;

    const correct = hasClassLearner &&
        threeInstances &&
        threeNameAssigns &&
        usesIsComparison &&
        printCount4;

    if (!correct) {

        message.textContent =
        "❌ Your solution is incomplete. Make sure you create three separate Learner objects, attach a .name attribute to each one, print a sentence for each, and print learner1 is learner2.";

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
