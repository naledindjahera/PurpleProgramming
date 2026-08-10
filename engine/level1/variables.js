// =====================================================
// VARIABLES.JS
// Level 1 - Unit 1
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
// NOTE: this template has no separate "Mark Complete" button — the lesson
// completes automatically the moment Challenge 2 is answered correctly.

const nextBtn = document.getElementById("nextBtn");
const questStatus = document.getElementById("questStatus");

// ----------------------------------------------------
// Save Keys
// ----------------------------------------------------

const CHALLENGE1_KEY = "l1_variables_challenge1";
const CHALLENGE2_KEY = "l1_variables_challenge2";

// ----------------------------------------------------
// Initial State
// ----------------------------------------------------

challenge2Panel.style.display = "none";
nextBtn.disabled = true;

// Restore progress if student already completed work

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
// Challenge 1
// ----------------------------------------------------

check1.addEventListener("click", () => {

    const code = challenge1.value;

    // ---------- Required variables ----------

    const hasName = hasAssignment(code, "name");
    const hasAge = hasAssignment(code, "age");
    const hasCity = hasAssignment(code, "city");

    // ---------- Required print statements ----------
    // Accept ANY valid way of printing the variable: its own print() call,
    // combined with other variables in one print(), inside an f-string,
    // concatenated with +, etc.

    const printsName = printsVar(code, "name");
    const printsAge = printsVar(code, "age");
    const printsCity = printsVar(code, "city");

    const correct =
        hasName &&
        hasAge &&
        hasCity &&
        printsName &&
        printsAge &&
        printsCity;

    if (!correct) {

        message1.textContent =
        "❌ Your solution is incomplete. Make sure you CREATE all three variables AND PRINT all three variables.";

        return;

    }

    // ------------------------------
    // Save Challenge 1
    // ------------------------------

    localStorage.setItem(CHALLENGE1_KEY, "true");

    message1.textContent =
    "✅ Excellent! Challenge 1 Complete.";

    challenge1.disabled = true;
    check1.disabled = true;

    // Unlock Challenge 2

    challenge2Locked.style.display = "none";
    challenge2Panel.style.display = "block";

});

// ----------------------------------------------------
// Challenge 2
// ----------------------------------------------------

check2.addEventListener("click", () => {

    const code = challenge2.value;

    // ---------- Required variables ----------

    const hasFirstName = hasAssignment(code, "first_name");
    const hasLastName  = hasAssignment(code, "last_name");
    const hasAge       = hasAssignment(code, "age");
    const hasSchool    = hasAssignment(code, "school");
    const hasCountry   = hasAssignment(code, "country");

    // ---------- Required print statements ----------
    // Accept ANY valid way of printing each variable (see Challenge 1).

    const printsFirstName = printsVar(code, "first_name");
    const printsLastName  = printsVar(code, "last_name");
    const printsAge       = printsVar(code, "age");
    const printsSchool    = printsVar(code, "school");
    const printsCountry   = printsVar(code, "country");

    const correct =
        hasFirstName &&
        hasLastName &&
        hasAge &&
        hasSchool &&
        hasCountry &&
        printsFirstName &&
        printsLastName &&
        printsAge &&
        printsSchool &&
        printsCountry;

    if (!correct) {

        message2.textContent =
        "❌ Your solution is incomplete. Make sure you CREATE and PRINT all five variables.";

        return;

    }

    // ------------------------------
    // Save Challenge 2
    // ------------------------------

    localStorage.setItem(CHALLENGE2_KEY, "true");

    message2.textContent =
    "✅ Excellent! Challenge 2 Complete.";

    challenge2.disabled = true;
    check2.disabled = true;

    // Save lesson progress

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