// =====================================================
// PARAMETERS.JS
// Level 2 - Unit 4
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

const CHALLENGE1_KEY = "l2_parameters_challenge1";
const CHALLENGE2_KEY = "l2_parameters_challenge2";

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
// Challenge 1 — describe_trip
// ----------------------------------------------------

check1.addEventListener("click", () => {

    const code = challenge1.value;

    const hasDef = /def\s+describe_trip\s*\(/.test(code);
    const hasDefault = /travel_mode\s*=\s*["']bus["']/.test(code);
    const hasPrint = /print\s*\(/.test(code);
    const callCount = (code.match(/describe_trip\s*\(/g) || []).length;
    const calledTwice = callCount >= 3; // 1 in the def line + 2 real calls
    const overridesMode = /describe_trip\s*\([^)]*,[^)]*,[^)]*\)/.test(code);

    const correct =
        hasDef && hasDefault && hasPrint && calledTwice && overridesMode;

    if (!correct) {
        message1.textContent =
        "❌ Check that describe_trip has a default travel_mode of \"bus\", prints the sentence, and is called twice — once using the default and once overriding travel_mode.";
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
// Challenge 2 — market_bill
// ----------------------------------------------------

check2.addEventListener("click", () => {

    const code = challenge2.value;

    const hasDef = /def\s+market_bill\s*\(/.test(code);
    const hasDefault = /weight_kg\s*=\s*1\b/.test(code);
    const hasCalc = /price_per_kg\s*\*\s*weight_kg/.test(code) || /weight_kg\s*\*\s*price_per_kg/.test(code);
    const hasPrint = /print\s*\(/.test(code);
    const callCount = (code.match(/market_bill\s*\(/g) || []).length;
    const calledThreeTimes = callCount >= 4; // 1 in the def line + 3 real calls
    const weightKgMentions = (code.match(/weight_kg\s*=/g) || []).length;
    const usesKeywordArgs = weightKgMentions >= 2 || /\bitem\s*=\s*["']/.test(code);

    const correct =
        hasDef && hasDefault && hasCalc && hasPrint &&
        calledThreeTimes && usesKeywordArgs;

    if (!correct) {
        message2.textContent =
        "❌ Check that market_bill has weight_kg defaulting to 1, calculates price_per_kg * weight_kg, prints the sentence, is called three times, and that at least one call uses keyword arguments.";
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
