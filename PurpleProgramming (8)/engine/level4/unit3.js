// =====================================================
// UNIT3.JS
// Level 4 - The Olympiad - Unit 3: The Skeleton Coast Cipher
// Two challenges: 1 (warm-up, easy, ungraded, encode) and 2 (harder, no solution given, decode)
// =====================================================

const nextBtn = document.getElementById("nextBtn");
const questStatus = document.getElementById("questStatus");

const KEY2 = "ol_unit3_challenge2";

// ----------------------------------------------------
// Challenge 1 — Warm-up (ungraded practice, no check button)
// ----------------------------------------------------

// ----------------------------------------------------
// Challenge 2 — Harder, no solution given (decode)
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

    // Reads the encoded message and the shift amount.
    const inputCount = countMatches(code, /input\s*\(/g);
    const readsValues = inputCount >= 2;

    // Loops over the message one character at a time.
    const hasLoop = /\bfor\b.*\bin\b/.test(code) || /\bwhile\b/.test(code);

    // Checks whether a character is a letter.
    const checksLetter = /\.isalpha\s*\(/.test(code) || /\.isalnum\s*\(/.test(code);

    // Character-code arithmetic wrapped with % 26 — same core
    // ingredient as Challenge 1, whichever direction it's applied.
    const hasCharMath = /\bord\s*\(/.test(code) && /\bchr\s*\(/.test(code) && /%\s*26/.test(code);

    // Must actually shift BACKWARD somewhere — either by subtracting
    // the shift variable, or by encoding with a flipped shift such as
    // (26 - N). Either approach involves a subtraction near the shift.
    const shiftsBackward = /-\s*shift\b/.test(code) || /-\s*n\b/i.test(code) || /26\s*-/.test(code);

    const printCount = countMatches(code, /\bprint\s*\(/g);

    const correct = readsValues && hasLoop && checksLetter && hasCharMath && shiftsBackward && printCount >= 1;

    if (!correct) {
        message2.textContent =
        "❌ Not quite. Make sure you read the encoded message and the shift, loop over each character, check whether it's a letter, shift it BACKWARD (subtracting the shift, or using 26 - N) wrapped with % 26, leave non-letters unchanged, and print the decoded result.";
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
