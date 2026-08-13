// =====================================================
// UNIT2.JS
// Level 4 - The Olympiad - Unit 2: The Welwitschia's Age
// Two challenges: 1 (warm-up, easy, ungraded) and 2 (harder, no solution given)
// =====================================================

const nextBtn = document.getElementById("nextBtn");
const questStatus = document.getElementById("questStatus");

const KEY2 = "ol_unit2_challenge2";

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

    // Reads three values (height, rate, target).
    const inputCount = countMatches(code, /input\s*\(/g);
    const readsValues = inputCount >= 3 || /\.split\s*\(/.test(code);

    // The number of years isn't known ahead of time, so a condition-
    // driven loop (while) is the natural fit — though a generous for
    // loop with a break would also work, so just require a loop.
    const hasLoop = /\bwhile\b/.test(code) || /\bfor\b/.test(code);

    // A comparison against the target height.
    const hasComparison = /<|>|<=|>=/.test(code);

    // Same compounding growth calculation as Challenge 1.
    const hasPercentGrowth = /\*/.test(code) && /\/\/\s*100/.test(code);

    const printCount = countMatches(code, /\bprint\s*\(/g);

    const correct = readsValues && hasLoop && hasComparison && hasPercentGrowth && printCount >= 1;

    if (!correct) {
        message2.textContent =
        "❌ Not quite. Make sure you read the height, growth rate, and target height, loop while the height is still below the target, grow the height by rate% of its CURRENT value each pass, count the years, and print the total.";
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
