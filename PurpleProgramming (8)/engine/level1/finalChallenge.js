// =====================================================
// FINALCHALLENGE.JS
// Level 1 - Unit 6 (Crystal Guardian)
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

const CHALLENGE1_KEY = "l1_final_challenge1";
const CHALLENGE2_KEY = "l1_final_challenge2";

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
// Challenge 1 — class results
// ----------------------------------------------------

check1.addEventListener("click", () => {

    const code = challenge1.value;

    const hasLearners = /learners\s*=.*int\s*\(/.test(code);
    const hasTotalMarks = /total_marks\s*=.*int\s*\(/.test(code);
    const hasClassAvg = /class_avg\s*=.*float\s*\(/.test(code);
    const hasPercentage = /percentage\s*=.*round\s*\(/.test(code);
    const hasPassed = /passed\s*=.*(>=|>)/.test(code);
    const printsPassed = /print\s*\([^\n]*\bpassed\b/.test(code);
    const hasStrongGroup = /strong_group\s*=.*\band\b/.test(code);
    const printsStrongGroup = /print\s*\([^\n]*\bstrong_group\b/.test(code);
    const printsSentence = (code.match(/print\s*\(/g) || []).length >= 3;

    const correct =
        hasLearners && hasTotalMarks && hasClassAvg && hasPercentage &&
        hasPassed && printsPassed && hasStrongGroup && printsStrongGroup &&
        printsSentence;

    if (!correct) {
        message1.textContent =
        "❌ Check every step: int() for learners/total_marks, float() for class_avg, round() for percentage, a comparison for passed, 'and' for strong_group, and a final summary sentence.";
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
// Challenge 2 — camp store weekly target
// ----------------------------------------------------

check2.addEventListener("click", () => {

    const code = challenge2.value;

    const hasItemsSold = /items_sold\s*=.*int\s*\(/.test(code);
    const hasPriceEach = /price_each\s*=.*float\s*\(/.test(code);
    const hasRevenue = /revenue\s*=.*round\s*\(/.test(code) && /revenue\s*=.*\*/.test(code);
    const hasHitTarget = /hit_target\s*=.*(>=|>)/.test(code);
    const printsHitTarget = /print\s*\([^\n]*\bhit_target\b/.test(code);
    const hasBigWeek = /big_week\s*=.*\band\b/.test(code);
    const printsBigWeek = /print\s*\([^\n]*\bbig_week\b/.test(code);
    const printsSentence = (code.match(/print\s*\(/g) || []).length >= 3;

    const correct =
        hasItemsSold && hasPriceEach && hasRevenue &&
        hasHitTarget && printsHitTarget && hasBigWeek && printsBigWeek &&
        printsSentence;

    if (!correct) {
        message2.textContent =
        "❌ Check every step: int() for items_sold, float() for price_each, revenue = items_sold * price_each rounded, a comparison for hit_target, 'and' for big_week, and a final summary sentence.";
        return;
    }

    localStorage.setItem(CHALLENGE2_KEY, "true");
    message2.textContent = "✅ Excellent! Challenge 2 Complete.";
    challenge2.disabled = true;
    check2.disabled = true;

    completeQuest(QUEST.id);
    questStatus.textContent = "🏆 The Crystal Guardian steps aside. Level 2 is unlocked!";
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
