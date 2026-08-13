// =====================================================
// DICTIONARIES.JS
// Level 3 - Unit 3
// =====================================================

const challengeInput = document.getElementById("studentCode");
const checkBtn = document.getElementById("checkChallenge");
const message = document.getElementById("challengeMessage");

const nextBtn = document.getElementById("nextBtn");
const questStatus = document.getElementById("questStatus");

const CHALLENGE_KEY = "l3_dictionaries_challenge";

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

    const hasMenu = hasAssignment(code, "menu");
    const enoughItems = countMatches(code, /:\s*[\d.]+/g) >= 5;
    const usesInput = /\binput\s*\(/.test(code);
    const usesGet = /\.get\s*\(/.test(code);
    const addsNewItem = /menu\s*\[\s*["'][^"']+["']\s*\]\s*=/.test(code) || /menu\.update\s*\(/.test(code);
    const loopsItems = /\.items\s*\(\s*\)/.test(code);
    const usesSumValues = /\bsum\s*\(\s*menu\.values\s*\(\s*\)\s*\)/.test(code);
    const printCount3 = countMatches(code, /\bprint\s*\(/g) >= 3;

    const correct = hasMenu &&
        enoughItems &&
        usesInput &&
        usesGet &&
        addsNewItem &&
        loopsItems &&
        usesSumValues &&
        printCount3;

    if (!correct) {

        message.textContent =
        "❌ Your solution is incomplete. Make sure you build the menu dictionary with at least 5 items, use input() and .get() to look up an item, add a new item afterwards, loop through menu.items(), and print the total with sum(menu.values()).";

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
