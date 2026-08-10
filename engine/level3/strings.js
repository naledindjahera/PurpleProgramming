// =====================================================
// STRINGS.JS
// Level 3 - Unit 2
// =====================================================

const challengeInput = document.getElementById("studentCode");
const checkBtn = document.getElementById("checkChallenge");
const message = document.getElementById("challengeMessage");

const nextBtn = document.getElementById("nextBtn");
const questStatus = document.getElementById("questStatus");

const CHALLENGE_KEY = "l3_strings_challenge";

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

    const hasIdNumber = hasAssignment(code, "id_number");
    const usesInput = /\binput\s*\(/.test(code);
    const enoughSlices = countMatches(code, /\[\s*\d+\s*:\s*\d+\s*\]/g) >= 4;
    const usesReverseSlice = /\[\s*::\s*-1\s*\]/.test(code);
    const usesEqualityCheck = /==/.test(code);
    const printCount5 = countMatches(code, /\bprint\s*\(/g) >= 5;

    const correct = hasIdNumber &&
        usesInput &&
        enoughSlices &&
        usesReverseSlice &&
        usesEqualityCheck &&
        printCount5;

    if (!correct) {

        message.textContent =
        "❌ Your solution is incomplete. Make sure you ask for the ID number with input(), use slicing like id_number[0:2] to pull out each part, check the palindrome with id_number == id_number[::-1], and print all five results.";

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
