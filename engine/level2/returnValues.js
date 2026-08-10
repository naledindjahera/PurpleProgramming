// =====================================================
// RETURNVALUES.JS
// Level 2 - Unit 5
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

const CHALLENGE1_KEY = "l2_return_challenge1";
const CHALLENGE2_KEY = "l2_return_challenge2";

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
// Challenge 1 — convert_to_percentage
// ----------------------------------------------------

check1.addEventListener("click", () => {

    const code = challenge1.value;

    const hasDef = /def\s+convert_to_percentage\s*\(/.test(code);
    const hasReturn = /return[^\n]*round\s*\(/.test(code);
    const storesScore = /score\s*=\s*convert_to_percentage\s*\(/.test(code);
    const printsUsingScore = /print\s*\([^\n]*score\s*\+/.test(code);

    const correct = hasDef && hasReturn && storesScore && printsUsingScore;

    if (!correct) {
        message1.textContent =
        "❌ Check that convert_to_percentage returns a rounded value (not printing it), that you store the call in score, and that you print score + 5.";
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
// Challenge 2 — nsfaf_ready / describe_status
// ----------------------------------------------------

check2.addEventListener("click", () => {

    const code = challenge2.value;

    const hasReadyDef = /def\s+nsfaf_ready\s*\(/.test(code);
    const hasReadyLogic = /return[^\n]*>=\s*60[^\n]*and[^\n]*>=\s*80/.test(code) ||
                           /return[^\n]*>=\s*80[^\n]*and[^\n]*>=\s*60/.test(code);
    const hasStatusDef = /def\s+describe_status\s*\(/.test(code);
    const hasStatusReturn = /return\s+f["']/.test(code);
    const hasStudentsList = /students\s*=\s*\[/.test(code);
    const hasLoop = /for\s+\w+.*\bin\s+students\b/.test(code);
    const printsInLoop = /print\s*\(\s*describe_status/.test(code);

    const correct =
        hasReadyDef && hasReadyLogic && hasStatusDef && hasStatusReturn &&
        hasStudentsList && hasLoop && printsInLoop;

    if (!correct) {
        message2.textContent =
        "❌ Check that nsfaf_ready returns a boolean combining average >= 60 and attendance >= 80, that describe_status returns an f-string sentence, and that you loop over a students list printing describe_status for each.";
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
