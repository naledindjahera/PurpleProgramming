// =====================================================
// STACKS.JS
// Level 3 - Unit 5
// =====================================================

const challengeInput = document.getElementById("studentCode");
const checkBtn = document.getElementById("checkChallenge");
const message = document.getElementById("challengeMessage");

const nextBtn = document.getElementById("nextBtn");
const questStatus = document.getElementById("questStatus");

const CHALLENGE_KEY = "l3_stacks_challenge";

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

    const hasMinibus = hasAssignment(code, "minibus");
    const usesAppend = /\.append\s*\(/.test(code);
    const usesPopNoArg = /\.pop\s*\(\s*\)/.test(code);
    const hasForLoop = /\bfor\b/.test(code);
    const usesLen = /\blen\s*\(/.test(code);
    const usesPeek = /\[\s*-1\s*\]/.test(code);
    const printCount3 = countMatches(code, /\bprint\s*\(/g) >= 3;

    const correct = hasMinibus &&
        usesAppend &&
        usesPopNoArg &&
        hasForLoop &&
        usesLen &&
        usesPeek &&
        printCount3;

    if (!correct) {

        message.textContent =
        "❌ Your solution is incomplete. Make sure you build the minibus stack, .append() 6 names, .pop() 3 times, print the remaining count with len(), and peek the next passenger with minibus[-1].";

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
