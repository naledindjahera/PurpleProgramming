// =====================================================
// INHERITANCE.JS
// Level 4 - Unit 4
// =====================================================

const challengeInput = document.getElementById("studentCode");
const checkBtn = document.getElementById("checkChallenge");
const message = document.getElementById("challengeMessage");

const nextBtn = document.getElementById("nextBtn");
const questStatus = document.getElementById("questStatus");

const CHALLENGE_KEY = "l4_inheritance_challenge";

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

    const hasParentClass = /\bclass\s+SchoolProgram\b/.test(code);
    const hasChildClass = /\bclass\s+CodingCamp\s*\(\s*SchoolProgram\s*\)/.test(code);
    const hasSuperInit = /super\s*\(\s*\)\.__init__\s*\(/.test(code);
    const hasTwoSummaryMethods = countMatches(code, /def\s+summary\s*\(\s*self/g) >= 2;
    const hasSuperSummary = /super\s*\(\s*\)\.summary\s*\(\s*\)/.test(code);
    const instantiatesChild = /CodingCamp\s*\(/.test(code);
    const callsSummary = /\.summary\s*\(\s*\)/.test(code);

    const correct = hasParentClass &&
        hasChildClass &&
        hasSuperInit &&
        hasTwoSummaryMethods &&
        hasSuperSummary &&
        instantiatesChild &&
        callsSummary;

    if (!correct) {

        message.textContent =
        "❌ Your solution is incomplete. Make sure CodingCamp inherits from SchoolProgram, calls super().__init__() and super().summary(), overrides summary(), and that you create a CodingCamp object and call its summary().";

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
