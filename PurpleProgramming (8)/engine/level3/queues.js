// =====================================================
// QUEUES.JS
// Level 3 - Unit 6
// =====================================================

const challengeInput = document.getElementById("studentCode");
const checkBtn = document.getElementById("checkChallenge");
const message = document.getElementById("challengeMessage");

const nextBtn = document.getElementById("nextBtn");
const questStatus = document.getElementById("questStatus");

const CHALLENGE_KEY = "l3_queues_challenge";

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

    const usesImportDeque = /from\s+collections\s+import\s+deque/.test(code);
    const usesDequeCall = /\bdeque\s*\(/.test(code);
    const usesAppend = /\.append\s*\(/.test(code);
    const usesPopleft = /\.popleft\s*\(/.test(code);
    const usesWhile = /\bwhile\b/.test(code);
    const usesPeekFront = /\[\s*0\s*\]/.test(code);
    const printCount3 = countMatches(code, /\bprint\s*\(/g) >= 3;

    const correct = usesImportDeque &&
        usesDequeCall &&
        usesAppend &&
        usesPopleft &&
        usesWhile &&
        usesPeekFront &&
        printCount3;

    if (!correct) {

        message.textContent =
        "❌ Your solution is incomplete. Make sure you import deque, add 7 customers with .append(), serve people with a while loop using .popleft(), and print the count and the front of the line with till[0].";

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
