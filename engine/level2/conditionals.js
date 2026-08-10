// =====================================================
// CONDITIONALS.JS
// Level 2 - Unit 1
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

const CHALLENGE1_KEY = "l2_conditionals_challenge1";
const CHALLENGE2_KEY = "l2_conditionals_challenge2";

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
// Challenge 1 — Windhoek temperature
// ----------------------------------------------------

check1.addEventListener("click", () => {

    const code = challenge1.value;

    const hasTemp = /temperature\s*=.*int\s*\(\s*input/.test(code);
    const hasIfElifElse = /\bif\b/.test(code) && /\belif\b/.test(code) && /\belse\b/.test(code);
    const printsHot = /print\s*\(\s*["']Hot["']\s*\)/.test(code);
    const printsMild = /print\s*\(\s*["']Mild["']\s*\)/.test(code);
    const printsCool = /print\s*\(\s*["']Cool["']\s*\)/.test(code);

    const correct =
        hasTemp && hasIfElifElse && printsHot && printsMild && printsCool;

    if (!correct) {
        message1.textContent =
        "❌ Check that temperature is read with int(input(...)), and that your if/elif/else prints exactly \"Hot\", \"Mild\", and \"Cool\".";
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
// Challenge 2 — NamPower load-shedding
// ----------------------------------------------------

check2.addEventListener("click", () => {

    const code = challenge2.value;

    const hasStage = /stage\s*=.*int\s*\(\s*input/.test(code);
    const hasHour = /hour\s*=.*int\s*\(\s*input/.test(code);
    const hasNestedLogic = (code.match(/\bif\b/g) || []).length >= 2;
    const printsNoCuts = /print\s*\([^\n]*No power cuts today/i.test(code);
    const printsCutExpected = /print\s*\([^\n]*Power cut expected this hour/i.test(code);
    const printsPowerOn = /print\s*\([^\n]*Power is on for now/i.test(code);
    const printsExtended = /print\s*\([^\n]*Extended cuts likely/i.test(code);

    const correct =
        hasStage && hasHour && hasNestedLogic &&
        printsNoCuts && printsCutExpected && printsPowerOn && printsExtended;

    if (!correct) {
        message2.textContent =
        "❌ Check that stage and hour are both read with int(input(...)), that stages 1-2 nest a second check for the 18-21 hour window, and that all four exact messages are printed somewhere.";
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
