// =====================================================
// DATATYPES.JS
// Level 1 - Unit 2
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

const CHALLENGE1_KEY = "l1_datatypes_challenge1";
const CHALLENGE2_KEY = "l1_datatypes_challenge2";

// ----------------------------------------------------
// Helpers
// ----------------------------------------------------

// A variable is "used with type()" and "printed" somewhere in the code.
function usesTypeAndPrints(code, varName) {
    const typeUsed = new RegExp("type\\s*\\(\\s*" + varName + "\\s*\\)").test(code);
    const printed = new RegExp("print\\s*\\([^\\n]*\\b" + varName + "\\b").test(code);
    return typeUsed && printed;
}

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
// Challenge 1 — learner registration record
// ----------------------------------------------------

check1.addEventListener("click", () => {

    const code = challenge1.value;

    const hasFullName = /full_name\s*=\s*["']/.test(code);
    const hasNationalId = /national_id\s*=\s*["']/.test(code);      // must stay a string
    const hasGrade = /grade\s*=\s*\d+/.test(code);                   // int, not quoted
    const hasAverage = /average_mark\s*=\s*\d+\.\d+/.test(code);     // float
    const hasLaptop = /has_laptop\s*=\s*(True|False)/.test(code);    // bool

    const correct =
        hasFullName && usesTypeAndPrints(code, "full_name") &&
        hasNationalId && usesTypeAndPrints(code, "national_id") &&
        hasGrade && usesTypeAndPrints(code, "grade") &&
        hasAverage && usesTypeAndPrints(code, "average_mark") &&
        hasLaptop && usesTypeAndPrints(code, "has_laptop");

    if (!correct) {
        message1.textContent =
        "❌ Check that all five variables use the correct type (national_id must stay a string!) and that every variable is printed together with type().";
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
// Challenge 2 — inventory tag
// ----------------------------------------------------

check2.addEventListener("click", () => {

    const code = challenge2.value;

    const hasItemName = /item_name\s*=\s*["']/.test(code);
    const hasItemCode = /item_code\s*=\s*["']/.test(code);           // must stay a string
    const hasQuantity = /quantity_in_stock\s*=\s*\d+/.test(code);
    const hasPrice = /unit_price\s*=\s*\d+\.\d+/.test(code);

    const correct =
        hasItemName && usesTypeAndPrints(code, "item_name") &&
        hasItemCode && usesTypeAndPrints(code, "item_code") &&
        hasQuantity && usesTypeAndPrints(code, "quantity_in_stock") &&
        hasPrice && usesTypeAndPrints(code, "unit_price");

    if (!correct) {
        message2.textContent =
        "❌ Check that all four variables use the correct type (item_code must stay a string!) and that every variable is printed together with type().";
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
