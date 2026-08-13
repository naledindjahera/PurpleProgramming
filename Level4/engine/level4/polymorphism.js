// =====================================================
// POLYMORPHISM.JS
// Level 4 - Unit 5
// =====================================================

const challengeInput = document.getElementById("studentCode");
const checkBtn = document.getElementById("checkChallenge");
const message = document.getElementById("challengeMessage");

const nextBtn = document.getElementById("nextBtn");
const questStatus = document.getElementById("questStatus");

const CHALLENGE_KEY = "l4_polymorphism_challenge";

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

    const hasKapana = /\bclass\s+Kapana\b/.test(code);
    const hasVetkoek = /\bclass\s+Vetkoek\b/.test(code);
    const hasOshifima = /\bclass\s+OshifimaMeal\b/.test(code);
    const describeCount = countMatches(code, /def\s+describe\s*\(\s*self/g) >= 3;
    const instantiatesAll = /Kapana\s*\(\s*\)/.test(code) && /Vetkoek\s*\(\s*\)/.test(code) && /OshifimaMeal\s*\(\s*\)/.test(code);
    const hasForLoop = /\bfor\b/.test(code);
    const callsDescribe = /\.describe\s*\(\s*\)/.test(code);

    const correct = hasKapana &&
        hasVetkoek &&
        hasOshifima &&
        describeCount &&
        instantiatesAll &&
        hasForLoop &&
        callsDescribe;

    if (!correct) {

        message.textContent =
        "❌ Your solution is incomplete. Make sure all three classes (Kapana, Vetkoek, OshifimaMeal) define describe(), you put one of each into a list, and loop through it calling .describe() on every item.";

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
