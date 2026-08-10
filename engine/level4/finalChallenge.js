// =====================================================
// FINAL CHALLENGE.JS
// Level 4 - Unit 7 (Final)
// =====================================================

const challengeInput = document.getElementById("studentCode");
const checkBtn = document.getElementById("checkChallenge");
const message = document.getElementById("challengeMessage");

const nextBtn = document.getElementById("nextBtn");
const questStatus = document.getElementById("questStatus");

const CHALLENGE_KEY = "l4_final_challenge";

// ----------------------------------------------------
// Initial State
// ----------------------------------------------------

if (localStorage.getItem(CHALLENGE_KEY) === "true") {

    challengeInput.disabled = true;
    checkBtn.disabled = true;

    message.textContent = "✅ Challenge Complete";

    nextBtn.disabled = false;

}

// ----------------------------------------------------
// Challenge
// ----------------------------------------------------

checkBtn.addEventListener("click", () => {

    const code = challengeInput.value;

    const hasParentClass = /\bclass\s+CampActivity\b/.test(code);
    const hasPrivateSpots = /self\.__spots_left/.test(code);
    const hasBookSpot = /def\s+book_spot\s*\(\s*self/.test(code);
    const hasTwoInfoMethods = countMatches(code, /def\s+info\s*\(\s*self/g) >= 2;
    const hasChildClass = /\bclass\s+OutdoorActivity\s*\(\s*CampActivity\s*\)/.test(code);
    const hasWeatherRisk = /weather_risk/.test(code);
    const hasSuperInfo = /super\s*\(\s*\)\.info\s*\(\s*\)/.test(code);
    const hasForLoop = /\bfor\b/.test(code);
    const callsBookSpotTwice = countMatches(code, /\.book_spot\s*\(\s*\)/g) >= 2;

    const correct = hasParentClass &&
        hasPrivateSpots &&
        hasBookSpot &&
        hasTwoInfoMethods &&
        hasChildClass &&
        hasWeatherRisk &&
        hasSuperInfo &&
        hasForLoop &&
        callsBookSpotTwice;

    if (!correct) {

        message.textContent =
        "❌ Your solution is incomplete. Make sure CampActivity has a private __spots_left, book_spot(), and info(); OutdoorActivity inherits from it, adds weather_risk, and overrides info() using super().info(); loop through a list of activities calling .info(); and call book_spot() at least twice on one object.";

        return;

    }

    // ------------------------------
    // Save Challenge
    // ------------------------------

    localStorage.setItem(CHALLENGE_KEY, "true");

    message.textContent =
    "✅ Excellent! Challenge Complete.";

    challengeInput.disabled = true;
    checkBtn.disabled = true;

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
