// =====================================================
// CONSTRUCTORS.JS
// Level 4 - Unit 3
// =====================================================

const challengeInput = document.getElementById("studentCode");
const checkBtn = document.getElementById("checkChallenge");
const message = document.getElementById("challengeMessage");

const nextBtn = document.getElementById("nextBtn");
const questStatus = document.getElementById("questStatus");

const CHALLENGE_KEY = "l4_constructors_challenge";

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

    const hasClassLearner = /\bclass\s+Learner\b/.test(code);
    const hasInit = /def\s+__init__\s*\(\s*self/.test(code);
    const setsName = /self\.name\s*=/.test(code);
    const setsRegion = /self\.region\s*=/.test(code);
    const setsAverage = /self\.average\s*=/.test(code);
    const fourInstances = countMatches(code, /=\s*Learner\s*\(/g) >= 4;
    const hasForLoop = /\bfor\b/.test(code);
    const printsInLoop = /print\s*\([^)]*\)/.test(code);

    const correct = hasClassLearner &&
        hasInit &&
        setsName &&
        setsRegion &&
        setsAverage &&
        fourInstances &&
        hasForLoop &&
        printsInLoop;

    if (!correct) {

        message.textContent =
        "❌ Your solution is incomplete. Make sure your Learner class's constructor stores name, region, and average, you create four objects, loop through them, and print a formatted line for each one.";

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
