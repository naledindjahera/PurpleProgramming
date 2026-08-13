// =====================================================
// UNIT1.JS
// Level 4 - The Olympiad - Unit 1: The Namib Mosaic
// Two challenges: 1 (warm-up, easy) and 2 (harder, no solution given)
// =====================================================

const nextBtn = document.getElementById("nextBtn");
const questStatus = document.getElementById("questStatus");

const KEY2 = "ol_unit1_challenge2";

// ----------------------------------------------------
// Challenge 1 — Warm-up (ungraded practice, no check button)
// ----------------------------------------------------

// ----------------------------------------------------
// Challenge 2 — Harder, no solution given
// ----------------------------------------------------

const input2 = document.getElementById("studentCode2");
const checkBtn2 = document.getElementById("checkChallenge2");
const message2 = document.getElementById("challengeMessage2");

if (localStorage.getItem(KEY2) === "true") {
    input2.disabled = true;
    checkBtn2.disabled = true;
    message2.textContent = "✅ Challenge Complete";
}

checkBtn2.addEventListener("click", () => {

    const code = input2.value;

    // Reads two integers, either as two separate input() calls
    // or one line split into two values.
    const inputCount = countMatches(code, /input\s*\(/g);
    const readsTwoValues = inputCount >= 2 || /\.split\s*\(/.test(code);

    // A parity check is the natural way to solve this — either in a
    // loop-based approach or a formula-based one.
    const usesParity = /%\s*2/.test(code);

    const printCount = countMatches(code, /\bprint\s*\(/g);

    const correct = readsTwoValues && usesParity && printCount >= 1;

    if (!correct) {
        message2.textContent =
        "❌ Not quite. Make sure you read both width and height, use a parity check ( % 2 ) to work out which tiles are terracotta, and print the total.";
        return;
    }

    localStorage.setItem(KEY2, "true");
    message2.textContent = "✅ Excellent! Challenge Complete.";
    input2.disabled = true;
    checkBtn2.disabled = true;

    completeQuest(QUEST.id);
    questStatus.textContent = "🏆 Lesson Complete! You may continue.";
    nextBtn.disabled = false;
});

// ----------------------------------------------------
// Next Lesson
// ----------------------------------------------------

nextBtn.addEventListener("click", () => {
    if (!isQuestComplete(QUEST.id)) {
        questStatus.textContent = "⚠ Finish Challenge 2 first.";
        return;
    }
    window.location.href = QUEST.nextHref;
});

// ----------------------------------------------------
// Restore Lesson Completion
// ----------------------------------------------------

if (isQuestComplete(QUEST.id)) {
    nextBtn.disabled = false;
    questStatus.textContent = "🏆 Lesson already completed.";
}
