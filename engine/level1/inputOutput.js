// =====================================================
// INPUTOUTPUT.JS
// Level 1 - Unit 4
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

const CHALLENGE1_KEY = "l1_io_challenge1";
const CHALLENGE2_KEY = "l1_io_challenge2";

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
// Challenge 1 — camp check-in
// ----------------------------------------------------

check1.addEventListener("click", () => {

    const code = challenge1.value;

    const hasName = /name\s*=.*input\s*\(/.test(code);
    const hasRegion = /region\s*=.*input\s*\(/.test(code);
    const hasHours = /hours\s*=.*input\s*\(/.test(code);
    const convertsHours = /hours\s*=.*int\s*\(/.test(code) || /int\s*\(\s*hours\s*\)/.test(code);
    const printsWelcome = /print\s*\([^\n]*\bname\b[^\n]*\bregion\b|print\s*\([^\n]*\bregion\b[^\n]*\bname\b/.test(code) ||
        (/print\s*\([^\n]*\bname\b/.test(code) && /print\s*\([^\n]*\bregion\b/.test(code));
    const hasConditional = /\bif\b[^\n]*hours/.test(code) && /\belse\b/.test(code);
    const mentionsShort = /short/i.test(code);
    const mentionsLong = /long/i.test(code);

    const correct =
        hasName && hasRegion && hasHours && convertsHours &&
        printsWelcome && hasConditional && mentionsShort && mentionsLong;

    if (!correct) {
        message1.textContent =
        "❌ Make sure name, region, and hours all come from input(), hours gets converted with int(), you print a welcome message with name and region, and an if/else prints 'short trip' vs 'long journey'.";
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
// Challenge 2 — camp farewell
// ----------------------------------------------------

check2.addEventListener("click", () => {

    const code = challenge2.value;

    const hasActivity = /activity\s*=.*input\s*\(/.test(code);
    const hasDays = /days\s*=.*input\s*\(/.test(code);
    const convertsDays = /days\s*=.*int\s*\(/.test(code) || /int\s*\(\s*days\s*\)/.test(code);
    const printsActivity = /print\s*\([^\n]*\bactivity\b/.test(code);
    const hasConditional = /\bif\b[^\n]*days/.test(code) && /\belse\b/.test(code);
    const mentionsWeekend = /weekend/i.test(code);
    const mentionsFullWeek = /full.?week/i.test(code);

    const correct =
        hasActivity && hasDays && convertsDays &&
        printsActivity && hasConditional && mentionsWeekend && mentionsFullWeek;

    if (!correct) {
        message2.textContent =
        "❌ Make sure activity and days both come from input(), days gets converted with int(), you print a farewell with activity, and an if/else prints 'weekend camper' vs 'full week camper'.";
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
