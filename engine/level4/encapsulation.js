// =====================================================
// ENCAPSULATION.JS
// Level 4 - Unit 6
// =====================================================

const challengeInput = document.getElementById("studentCode");
const checkBtn = document.getElementById("checkChallenge");
const message = document.getElementById("challengeMessage");

const nextBtn = document.getElementById("nextBtn");
const questStatus = document.getElementById("questStatus");

const CHALLENGE_KEY = "l4_encapsulation_challenge";

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

    const hasClassWallet = /\bclass\s+NamibianWallet\b/.test(code);
    const hasPrivateBalance = /self\.__balance/.test(code);
    const hasDeposit = /def\s+deposit\s*\(\s*self/.test(code);
    const hasWithdraw = /def\s+withdraw\s*\(\s*self/.test(code);
    const hasGetBalance = /def\s+get_balance\s*\(\s*self/.test(code);
    const instantiatesWallet = /=\s*NamibianWallet\s*\(/.test(code);
    const callsDeposit = /\.deposit\s*\(/.test(code);
    const callsWithdrawTwice = countMatches(code, /\.withdraw\s*\(/g) >= 2;
    const callsGetBalance = /\.get_balance\s*\(\s*\)/.test(code);

    const correct = hasClassWallet &&
        hasPrivateBalance &&
        hasDeposit &&
        hasWithdraw &&
        hasGetBalance &&
        instantiatesWallet &&
        callsDeposit &&
        callsWithdrawTwice &&
        callsGetBalance;

    if (!correct) {

        message.textContent =
        "❌ Your solution is incomplete. Make sure NamibianWallet has a private __balance set in the constructor, deposit(), withdraw(), and get_balance() methods, and that you create a wallet and call deposit() once and withdraw() twice.";

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
