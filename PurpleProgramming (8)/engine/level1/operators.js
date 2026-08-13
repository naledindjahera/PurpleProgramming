// =====================================================
// OPERATORS.JS
// Level 1 - Unit 3
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

const CHALLENGE1_KEY = "l1_operators_challenge1";
const CHALLENGE2_KEY = "l1_operators_challenge2";

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
// Challenge 1 — bread loaves (// and %)
// ----------------------------------------------------

check1.addEventListener("click", () => {

    const code = challenge1.value;

    const hasLoaves = /bread_loaves\s*=\s*47/.test(code);
    const hasTables = /tables\s*=\s*9/.test(code);
    const hasPerTable = /per_table\s*=.*\/\//.test(code);
    const hasLeftover = /leftover\s*=.*%/.test(code);
    const hasEnough = /enough_for_extra\s*=.*(>=|leftover)/.test(code) && /tables/.test(code);
    const printsEnough = /print\s*\([^\n]*\benough_for_extra\b/.test(code);
    const printsSentence = (code.match(/print\s*\(/g) || []).length >= 3;

    const correct =
        hasLoaves && hasTables && hasPerTable && hasLeftover &&
        hasEnough && printsEnough && printsSentence;

    if (!correct) {
        message1.textContent =
        "❌ Make sure you use // for per_table, % for leftover, a comparison for enough_for_extra, and print all the results plus a summary sentence.";
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
// Challenge 2 — minibus taxi (subtraction, comparison, logical)
// ----------------------------------------------------

check2.addEventListener("click", () => {

    const code = challenge2.value;

    const hasCapacity = /capacity_seats\s*=\s*16/.test(code);
    const hasBooked = /passengers_booked\s*=\s*19/.test(code);
    const hasOverbooked = /overbooked\s*=.*-/.test(code);
    const hasIsFull = /is_full\s*=.*(>=|>)/.test(code);
    const printsIsFull = /print\s*\([^\n]*\bis_full\b/.test(code);
    const hasSecondTrip = /needs_second_trip\s*=.*\band\b/.test(code);
    const printsSecondTrip = /print\s*\([^\n]*\bneeds_second_trip\b/.test(code);
    const printsSentence = (code.match(/print\s*\(/g) || []).length >= 3;

    const correct =
        hasCapacity && hasBooked && hasOverbooked &&
        hasIsFull && printsIsFull &&
        hasSecondTrip && printsSecondTrip &&
        printsSentence;

    if (!correct) {
        message2.textContent =
        "❌ Make sure you use subtraction for overbooked, a comparison for is_full, 'and' for needs_second_trip, and print all the results plus a summary sentence.";
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
