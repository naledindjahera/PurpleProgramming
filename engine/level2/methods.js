// =====================================================
// METHODS.JS
// Level 2 - Unit 3
// =====================================================

// ---------- Challenge 1 ----------

const challenge1 = document.getElementById("studentCode1");
const check1 = document.getElementById("checkChallenge1");
const message1 = document.getElementById("challenge1Message");

// ---------- Challenge 2 ----------

const challenge2Panel = document.getElementById("challenge2");
const challenge2Locked = document.getElementById("challenge2Locked");

const challenge2 = document.getElementById("studentCode2");
const check2 = document.getElementById("checkChallenge2");
const message2 = document.getElementById("challenge2Message");

// ---------- Lesson ----------

const nextBtn = document.getElementById("nextBtn");
const questStatus = document.getElementById("questStatus");

// ----------------------------------------------------
// Save Keys
// ----------------------------------------------------

const CHALLENGE1_KEY = "l2_methods_challenge1";
const CHALLENGE2_KEY = "l2_methods_challenge2";

// ----------------------------------------------------
// Initial State
// ----------------------------------------------------

challenge2Panel.style.display = "none";
nextBtn.disabled = true;

if (localStorage.getItem(CHALLENGE1_KEY) === "true") {
    challenge2Locked.style.display = "none";
    challenge2Panel.style.display = "block";
    challenge1.disabled = true;
    check1.disabled = true;
    message1.textContent = "✅ Challenge 1 Complete";
}

if (localStorage.getItem(CHALLENGE2_KEY) === "true") {
    challenge2.disabled = true;
    check2.disabled = true;
    message2.textContent = "✅ Challenge 2 Complete";
    nextBtn.disabled = false;
}

// ----------------------------------------------------
// Challenge 1 — name cleanup
// ----------------------------------------------------

check1.addEventListener("click", () => {

    const code = challenge1.value;

    const hasInput = /name\s*=\s*input\s*\(/.test(code);
    const hasCleaned = /cleaned\s*=.*\.strip\s*\(\s*\).*\.upper\s*\(\s*\)/.test(code) ||
                        /cleaned\s*=.*\.upper\s*\(\s*\).*\.strip\s*\(\s*\)/.test(code);
    const printCount = (code.match(/print\s*\(/g) || []).length;
    const printsBoth = printCount >= 2 && /print\s*\([^\n]*\bname\b/.test(code) && /print\s*\([^\n]*\bcleaned\b/.test(code);

    const correct = hasInput && hasCleaned && printsBoth;

    if (!correct) {
        message1.textContent =
        "❌ Check that name comes from input(), that cleaned chains .strip() and .upper() together, and that you print both name and cleaned.";
        return;
    }

    localStorage.setItem(CHALLENGE1_KEY, "true");
    message1.textContent = "✅ Excellent! Challenge 1 Complete.";
    challenge1.disabled = true;
    check1.disabled = true;

    challenge2Locked.style.display = "none";
    challenge2Panel.style.display = "block";
});

// ----------------------------------------------------
// Challenge 2 — school name & vowel count
// ----------------------------------------------------

check2.addEventListener("click", () => {

    const code = challenge2.value;

    const hasRaw = /raw\s*=\s*input\s*\(/.test(code);
    const hasClean = /clean\s*=.*\.strip\s*\(\s*\).*\.title\s*\(\s*\)/.test(code);
    const hasLowered = /lowered\s*=.*\.lower\s*\(\s*\)/.test(code);
    const countCalls = (code.match(/\.count\s*\(/g) || []).length;
    const hasVowelCount = /vowel_count\s*=/.test(code) && countCalls >= 5;
    const printsClean = /print\s*\([^\n]*\bclean\b/.test(code);
    const printsVowelCount = /print\s*\([^\n]*vowel_count\b/.test(code);

    const correct =
        hasRaw && hasClean && hasLowered && hasVowelCount &&
        printsClean && printsVowelCount;

    if (!correct) {
        message2.textContent =
        "❌ Check that raw comes from input(), clean chains .strip().title(), lowered uses .lower(), vowel_count adds up five .count() calls, and both clean and vowel_count are printed.";
        return;
    }

    localStorage.setItem(CHALLENGE2_KEY, "true");
    message2.textContent = "✅ Excellent! Challenge 2 Complete.";
    challenge2.disabled = true;
    check2.disabled = true;

    completeQuest(QUEST.id);
    questStatus.textContent = "🏆 Lesson Complete! You may continue.";
    nextBtn.disabled = false;
});

// ----------------------------------------------------
// Next Lesson
// ----------------------------------------------------

nextBtn.addEventListener("click", () => {
    if (!isQuestComplete(QUEST.id)) {
        questStatus.textContent = "⚠ Finish this lesson first.";
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
