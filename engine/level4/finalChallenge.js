// =====================================================
// FINALCHALLENGE.JS
// Level 4 - The Olympiad - Final Challenge: The National Trial
// Challenge 1 is a worked example (no answer space, nothing to check).
// Challenge 2 is the graded challenge.
// =====================================================

const nextBtn = document.getElementById("nextBtn");
const questStatus = document.getElementById("questStatus");

const input2 = document.getElementById("studentCodeFinal");
const checkBtn2 = document.getElementById("checkChallengeFinal");
const message2 = document.getElementById("challengeMessageFinal");

// ----------------------------------------------------
// Initial State
// ----------------------------------------------------

if (isQuestComplete(QUEST.id)) {
    input2.disabled = true;
    checkBtn2.disabled = true;
    message2.textContent = "✅ Challenge Complete";
    nextBtn.disabled = false;
    questStatus.textContent = "🏆 The Olympiad already completed.";
}

// ----------------------------------------------------
// Challenge 2 — Your Turn
// ----------------------------------------------------

checkBtn2.addEventListener("click", () => {

    const code = input2.value;

    // Reads the stock/recipe/budget values — either several
    // input() calls, or lines split into multiple values.
    const inputCount = countMatches(code, /input\s*\(/g);
    const readsValues = inputCount >= 1 && (/\.split\s*\(/.test(code) || inputCount >= 3);

    // Some kind of loop to search increasing batch counts.
    const hasLoop = /\bfor\b/.test(code) || /\bwhile\b/.test(code);

    // Cost arithmetic: multiplying a shortfall by a price and summing.
    const hasCostArithmetic = /\*/.test(code) && /\+/.test(code);

    // A budget comparison of some kind.
    const hasBudgetCheck = /<=|>=|<|>/.test(code);

    const printCount = countMatches(code, /\bprint\s*\(/g);

    const correct =
        readsValues &&
        hasLoop &&
        hasCostArithmetic &&
        hasBudgetCheck &&
        printCount >= 1;

    if (!correct) {
        message2.textContent =
        "❌ Not quite. Make sure you read the stock, recipe, and budget, use a loop to try increasing batch counts, calculate the cost of each shortfall, compare it against the budget, and print the final answer.";
        return;
    }

    message2.textContent = "✅ Excellent! Challenge Complete.";
    input2.disabled = true;
    checkBtn2.disabled = true;

    completeQuest(QUEST.id);
    questStatus.textContent = "🏆 The Olympiad Complete! Well done, Champion.";
    nextBtn.disabled = false;
});

// ----------------------------------------------------
// Finish button
// ----------------------------------------------------

nextBtn.addEventListener("click", () => {
    if (!isQuestComplete(QUEST.id)) {
        questStatus.textContent = "⚠ Finish the challenge first.";
        return;
    }
    window.location.href = QUEST.nextHref;
});
