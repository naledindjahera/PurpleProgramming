// =====================================================
// TYPECASTING.JS
// Level 1 - Unit 5
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

const CHALLENGE1_KEY = "l1_typecasting_challenge1";
const CHALLENGE2_KEY = "l1_typecasting_challenge2";

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
// Challenge 1 — cuca shop till
// ----------------------------------------------------

check1.addEventListener("click", () => {

    const code = challenge1.value;

    const hasPriceText = /price_text\s*=.*input\s*\(/.test(code);
    const hasQtyText = /qty_text\s*=.*input\s*\(/.test(code);
    const hasPrice = /price\s*=.*float\s*\(/.test(code);
    const hasQuantity = /quantity\s*=.*int\s*\(/.test(code);
    const hasTotal = /total\s*=.*round\s*\(/.test(code);
    const hasTotalText = /total_text\s*=.*str\s*\(/.test(code) || /total_text\s*=\s*f["']/.test(code);
    const printsReceipt = /print\s*\([^\n]*total/.test(code);

    const correct =
        hasPriceText && hasQtyText && hasPrice && hasQuantity &&
        hasTotal && hasTotalText && printsReceipt;

    if (!correct) {
        message1.textContent =
        "❌ Make sure price uses float(), quantity uses int(), total uses round(), total_text converts the total to a string, and you print the receipt sentence.";
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
// Challenge 2 — weather station
// ----------------------------------------------------

check2.addEventListener("click", () => {

    const code = challenge2.value;

    const hasTempText = /temp_text\s*=\s*["']/.test(code);
    const hasTempFloat = /temp_float\s*=.*float\s*\(/.test(code);
    const hasTempInt = /temp_int\s*=.*int\s*\(/.test(code);
    const printsBoth =
        /print\s*\([^\n]*temp_float[^\n]*temp_int|print\s*\([^\n]*temp_int[^\n]*temp_float/.test(code) ||
        (/print\s*\([^\n]*temp_float/.test(code) && /print\s*\([^\n]*temp_int/.test(code));

    const correct = hasTempText && hasTempFloat && hasTempInt && printsBoth;

    if (!correct) {
        message2.textContent =
        "❌ Make sure temp_float uses float(), temp_int uses int(), and you print a sentence containing both values.";
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
