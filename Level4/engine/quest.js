// =====================================================================
// PURPLE PROGRAMMING — QUEST PAGE ENGINE
// Expects a global `QUEST` config object defined on the page before this
// script runs:
//   QUEST = {
//     id: "l1-datatypes",
//     hub: "../../levels/level1.html",
//     index: 2,          // 1-based position within the level
//     total: 6,          // total units in the level
//     nextHref: "operators.html" | null,
//     nextLabel: "Next Unit →"
//   }
// =====================================================================

function initQuestPage() {
  if (!isQuestUnlocked(QUEST.id)) {
    window.location.href = QUEST.hub;
    return;
  }

  renderStepDots();
  wireReveals();
  wireCompletion();
}

function renderStepDots() {
  const track = document.getElementById("stepDots");
  const count = document.getElementById("stepCount");
  if (!track) return;

  track.innerHTML = "";
  for (let i = 1; i <= QUEST.total; i++) {
    const dot = document.createElement("span");
    if (i < QUEST.index) dot.classList.add("is-filled");
    if (i === QUEST.index) dot.classList.add("is-current");
    track.appendChild(dot);
  }
  if (count) count.textContent = `${QUEST.index} / ${QUEST.total}`;
}

function wireReveals() {
  document.querySelectorAll("[data-toggle]").forEach(btn => {
    const targetId = btn.getAttribute("data-toggle");
    const target = document.getElementById(targetId);
    if (!target) return;
    btn.addEventListener("click", () => {
      const showing = !target.hasAttribute("hidden");
      if (showing) {
        target.setAttribute("hidden", "");
        btn.textContent = btn.dataset.showLabel;
      } else {
        target.removeAttribute("hidden");
        btn.textContent = btn.dataset.hideLabel;
      }
    });
  });
}

function wireCompletion() {
  const completeBtn = document.getElementById("completeBtn");
  const nextBtn = document.getElementById("nextBtn");
  const status = document.getElementById("questStatus");

  const alreadyDone = isQuestComplete(QUEST.id);
  if (alreadyDone) markUiComplete();

  if (completeBtn) {
    completeBtn.addEventListener("click", () => {
      completeQuest(QUEST.id);
      markUiComplete();
      if (status) status.textContent = "✦ Progress saved on this computer";
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (!isQuestComplete(QUEST.id)) {
        if (status) status.textContent = "⚠ Finish this lesson first.";
        return;
      }
      window.location.href = QUEST.nextHref || QUEST.hub;
    });
  }

  function markUiComplete() {
    if (completeBtn) {
      completeBtn.disabled = true;
      completeBtn.textContent = "✔ Quest Complete";
    }
    if (nextBtn) nextBtn.disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", initQuestPage);
