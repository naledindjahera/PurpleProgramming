// =====================================================
// FUNCTIONS.JS
// Level 2 - Unit 2
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

const CHALLENGE1_KEY = "l2_functions_challenge1";
const CHALLENGE2_KEY = "l2_functions_challenge2";

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
// Challenge 1 — greet_camper
// ----------------------------------------------------

check1.addEventListener("click", () => {

    const code = challenge1.value;

    const hasDef = /def\s+greet_camper\s*\(\s*\)\s*:/.test(code);
    const printsWelcome = /print\s*\([^\n]*Welcome to Purple Programming Camp/i.test(code);
    const callCount = (code.match(/greet_camper\s*\(\s*\)/g) || []).length;
    const calledTwice = callCount >= 3; // 1 in the def line + 2 real calls

    const correct = hasDef && printsWelcome && calledTwice;

    if (!correct) {
        message1.textContent =
        "❌ Check that greet_camper takes no parameters, prints the welcome message, and is called twice after being defined.";
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
// Challenge 2 — fuel_estimate
// ----------------------------------------------------

check2.addEventListener("click", () => {

    const code = challenge2.value;

    const hasDef = /def\s+fuel_estimate\s*\(\s*\)\s*:/.test(code);
    const hasDistanceInput = /distance\s*=.*float\s*\(\s*input/.test(code);
    const hasRateOf8 = /8/.test(code) && /100/.test(code);
    const hasPricePerLitre = /21\.5/.test(code);
    const hasPrint = /print\s*\(/.test(code);
    const callCount = (code.match(/fuel_estimate\s*\(\s*\)/g) || []).length;
    const calledTwice = callCount >= 3; // 1 in the def line + 2 real calls

    const correct =
        hasDef && hasDistanceInput && hasRateOf8 && hasPricePerLitre &&
        hasPrint && calledTwice;

    if (!correct) {
        message2.textContent =
        "❌ Check that fuel_estimate takes no parameters, reads distance with float(input(...)), uses 8 litres/100km at N$21.50/litre, prints the result, and is called twice.";
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
