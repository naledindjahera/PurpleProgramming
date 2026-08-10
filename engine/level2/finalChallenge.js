// =====================================================
// FINALCHALLENGE.JS
// Level 2 - Unit 6 (Twin Sentinels)
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

const CHALLENGE1_KEY = "l2_final_challenge1";
const CHALLENGE2_KEY = "l2_final_challenge2";

// ----------------------------------------------------
// Helpers
// ----------------------------------------------------

function hasAllGradeBands(code) {
    return /return\s*["']A["']/.test(code) &&
           /return\s*["']B["']/.test(code) &&
           /return\s*["']C["']/.test(code) &&
           /return\s*["']D["']/.test(code) &&
           /return\s*["']F["']/.test(code);
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
// Challenge 1 — report card
// ----------------------------------------------------

check1.addEventListener("click", () => {

    const code = challenge1.value;

    const hasGradeDef = /def\s+grade_learner\s*\(/.test(code);
    const hasBands = hasAllGradeBands(code);
    const hasReportDef = /def\s+report_line\s*\(/.test(code);
    const reportCallsGrade = /def\s+report_line[\s\S]*?grade_learner\s*\(/.test(code);
    const hasList = /learners\s*=\s*\[/.test(code);
    const hasLoop = /for\s+\w+\s*,\s*\w+\s+in\s+learners/.test(code);
    const printsReportLine = /print\s*\(\s*report_line/.test(code);

    const correct =
        hasGradeDef && hasBands && hasReportDef && reportCallsGrade &&
        hasList && hasLoop && printsReportLine;

    if (!correct) {
        message1.textContent =
        "❌ Check that grade_learner returns A/B/C/D/F for the correct bands, report_line calls grade_learner and returns a formatted string, and that you loop over a learners list printing report_line for each.";
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
// Challenge 2 — class summary with counter
// ----------------------------------------------------

check2.addEventListener("click", () => {

    const code = challenge2.value;

    const hasGradeDef = /def\s+grade_learner\s*\(/.test(code);
    const hasBands = hasAllGradeBands(code);
    const hasReportDef = /def\s+report_line\s*\(/.test(code);
    const hasList = /learners\s*=\s*\[/.test(code);
    const hasLoop = /for\s+\w+\s*,\s*\w+\s+in\s+learners/.test(code);
    const printsReportLine = /print\s*\(\s*report_line/.test(code);
    const hasCounterInit = /good_count\s*=\s*0/.test(code);
    const hasIncrement = /good_count\s*\+=\s*1/.test(code);
    const checksGradeGroup = /in\s*\(\s*["']A["']\s*,\s*["']B["']\s*,\s*["']C["']\s*\)/.test(code);
    const printsCount = /print\s*\([^\n]*good_count/.test(code);

    const correct =
        hasGradeDef && hasBands && hasReportDef && hasList && hasLoop &&
        printsReportLine && hasCounterInit && hasIncrement &&
        checksGradeGroup && printsCount;

    if (!correct) {
        message2.textContent =
        "❌ Check that good_count starts at 0, increases by 1 whenever a learner's grade is in (\"A\", \"B\", \"C\"), and that you print a final sentence including good_count after the loop.";
        return;
    }

    localStorage.setItem(CHALLENGE2_KEY, "true");
    message2.textContent = "✅ Excellent! Challenge 2 Complete.";
    challenge2.disabled = true;
    check2.disabled = true;

    completeQuest(QUEST.id);
    questStatus.textContent = "🏆 The Twin Sentinels step aside. Level 3 is unlocked!";
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
