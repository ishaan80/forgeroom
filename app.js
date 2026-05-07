const stages = [
  { name: "Think", tone: "GStack office-hours" },
  { name: "Grill", tone: "Relentless Grill Me" },
  { name: "Plan", tone: "Narrowest wedge" },
  { name: "Review", tone: "Premise challenge" },
  { name: "Alternatives", tone: "Approaches considered" },
  { name: "Test", tone: "Validation" },
  { name: "Ship", tone: "Launch and retro" }
];

const fallbackQuestions = {
  startup: [
    {
      id: "idea",
      stage: "Think",
      title: "What are you trying to make real?",
      why: "Start with the user-visible promise, not the technology or category.",
      recommendation: "I am building [product] for [specific user] so they can [valuable outcome] without [painful current workaround]."
    },
    {
      id: "demand",
      stage: "Grill",
      title: "What's the strongest evidence that someone actually wants this?",
      why: "GStack office-hours starts with demand reality: behavior beats compliments, waitlists, and market vibes.",
      recommendation: "The strongest evidence is [specific behavior/payment/repeat usage], from [specific person/company], when [situation happened]."
    },
    {
      id: "statusQuo",
      stage: "Grill",
      title: "What are users doing right now to solve this problem, even badly?",
      why: "The status quo is the real competitor. If nobody works around the pain, the pain may not be urgent.",
      recommendation: "Today they use [tool/process/person], which costs [time/money/risk/status] every [day/week/month]."
    },
    {
      id: "human",
      stage: "Grill",
      title: "Name the actual human who needs this most.",
      why: "A category cannot buy. A specific person with a specific consequence can.",
      recommendation: "The first user is [name/title], who gets promoted for [outcome], gets fired for [failure], and worries about [specific consequence]."
    },
    {
      id: "wedge",
      stage: "Plan",
      title: "What's the smallest version someone would pay for this week?",
      why: "The narrowest wedge forces the idea to prove value before it grows into a platform.",
      recommendation: "The wedge is [one workflow/output], delivered to [one user], and worth paying for because [specific urgent result]."
    },
    {
      id: "observation",
      stage: "Test",
      title: "Have you watched a user try this or the workaround without helping them? What surprised you?",
      why: "Surprise is where product truth leaks through. Surveys and demos are weaker evidence.",
      recommendation: "I watched [person] do [workflow]. The surprising part was [unexpected behavior], which changes the product because [implication]."
    },
    {
      id: "futureFit",
      stage: "Review",
      title: "If the world changes meaningfully in three years, does this become more essential or less?",
      why: "Future-fit turns trend talk into a product thesis.",
      recommendation: "This becomes more essential because [specific change] makes [user pain] worse or more frequent, and our wedge benefits by [mechanism]."
    },
    {
      id: "distribution",
      stage: "Ship",
      title: "How will the first ten users discover it?",
      why: "Distribution changes what you should build first.",
      recommendation: "The first ten users come from [specific channel/community/outreach list], using [message], because they already gather at [place]."
    }
  ],
  builder: [
    {
      id: "idea",
      stage: "Think",
      title: "What are you trying to make real?",
      why: "Start with the thing someone can actually use or show.",
      recommendation: "I am building [thing] for [person/community] so they can [cool outcome] without [current friction]."
    },
    {
      id: "coolest",
      stage: "Grill",
      title: "What's the coolest version of this?",
      why: "Builder mode optimizes for the version that makes someone say 'whoa'.",
      recommendation: "The coolest version would [surprising interaction/output], especially when [moment] happens."
    },
    {
      id: "show",
      stage: "Grill",
      title: "Who would you show this to first, and what would make them say 'whoa'?",
      why: "A shareable first audience gives the project shape.",
      recommendation: "I would show [specific person/group]. They would say 'whoa' if [specific visible moment] happened."
    },
    {
      id: "fastest",
      stage: "Plan",
      title: "What's the fastest path to something you can actually use or share?",
      why: "The best version is the one that exists.",
      recommendation: "In [timebox], I can build [small demo] with [inputs], [core interaction], and [shareable output]."
    },
    {
      id: "closest",
      stage: "Review",
      title: "What existing thing is closest, and how is yours different?",
      why: "The comparison reveals what is genuinely new or delightful.",
      recommendation: "The closest thing is [tool/project]. Mine differs by [specific behavior/taste/constraint]."
    },
    {
      id: "tenx",
      stage: "Alternatives",
      title: "What would you add if you had unlimited time? What's the 10x version?",
      why: "The 10x version helps choose a wedge that points in the right direction.",
      recommendation: "The 10x version adds [capability], but the first step that points there is [small version]."
    }
  ]
};

const STORAGE_KEY = "forgeroom.session.v2";
const legacyStorageKey = "forgeroom.session.v1";

const state = loadState();

const elements = {
  aiToggle: document.querySelector("#aiToggle"),
  answerInput: document.querySelector("#answerInput"),
  answerTrail: document.querySelector("#answerTrail"),
  apiStatus: document.querySelector("#apiStatus"),
  alternativesList: document.querySelector("#alternativesList"),
  alternativesSection: document.querySelector("#alternativesSection"),
  backButton: document.querySelector("#backButton"),
  completionMeter: document.querySelector("#completionMeter"),
  copyExportButton: document.querySelector("#copyExportButton"),
  coachNoteBlock: document.querySelector("#coachNoteBlock"),
  coachNoteText: document.querySelector("#coachNoteText"),
  currentStage: document.querySelector("#currentStage"),
  exportButton: document.querySelector("#exportButton"),
  exportDialog: document.querySelector("#exportDialog"),
  exportOutput: document.querySelector("#exportOutput"),
  ideaCore: document.querySelector("#ideaCore"),
  nextButton: document.querySelector("#nextButton"),
  premiseChallenge: document.querySelector("#premiseChallenge"),
  premiseSection: document.querySelector("#premiseSection"),
  previousAnswerBlock: document.querySelector("#previousAnswerBlock"),
  previousAnswerText: document.querySelector("#previousAnswerText"),
  pressureList: document.querySelector("#pressureList"),
  progressBar: document.querySelector("#progressBar"),
  questionCount: document.querySelector("#questionCount"),
  questionTitle: document.querySelector("#questionTitle"),
  questionWhy: document.querySelector("#questionWhy"),
  recommendedAnswer: document.querySelector("#recommendedAnswer"),
  resetButton: document.querySelector("#resetButton"),
  saveStatus: document.querySelector("#saveStatus"),
  stageStrip: document.querySelector("#stageStrip"),
  startupModeButton: document.querySelector("#startupModeButton"),
  builderModeButton: document.querySelector("#builderModeButton"),
  useRecommendationButton: document.querySelector("#useRecommendationButton")
};

function defaultState(mode = "startup") {
  return {
    mode,
    useAi: true,
    currentQuestion: fallbackQuestions[mode][0],
    currentFallbackIndex: 0,
    answers: [],
    skipped: [],
    pressureNotes: ["The first answer should become specific enough that a stranger can tell who it is for and why now."],
    premiseChallenge: "",
    alternatives: [],
    brief: {},
    complete: false,
    lastCoachNote: "",
    source: "local"
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && saved.currentQuestion && Array.isArray(saved.answers)) return saved;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
  localStorage.removeItem(legacyStorageKey);
  return defaultState();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function stageIndex(stageName) {
  return Math.max(0, stages.findIndex(stage => stage.name === stageName));
}

function answeredCount() {
  return state.answers.length;
}

function targetCount() {
  return state.mode === "startup" ? 8 : 6;
}

function render() {
  renderModes();
  renderStages();
  renderQuestion();
  renderBrief();
}

function renderModes() {
  elements.aiToggle.checked = state.useAi;
  elements.startupModeButton.classList.toggle("is-active", state.mode === "startup");
  elements.builderModeButton.classList.toggle("is-active", state.mode === "builder");
  elements.apiStatus.className = `api-pill ${state.source === "ai" ? "is-live" : "is-fallback"}`;
  elements.apiStatus.textContent = state.source === "ai" ? "AI live" : "Local fallback";
}

function renderStages() {
  elements.stageStrip.innerHTML = "";
  const activeIndex = stageIndex(state.currentQuestion.stage);
  stages.forEach((stage, index) => {
    const card = document.createElement("article");
    card.className = "stage-card";
    if (index === activeIndex) card.classList.add("is-active");
    if (index < activeIndex || state.complete) card.classList.add("is-complete");
    card.innerHTML = `
      <span class="stage-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="stage-name">${stage.name}</span>
    `;
    elements.stageStrip.appendChild(card);
  });
}

function renderQuestion() {
  const question = state.currentQuestion;
  const lastAnswer = state.answers[state.answers.length - 1];
  elements.currentStage.textContent = `${question.stage} - ${stages[stageIndex(question.stage)]?.tone || "Adaptive coach"}`;
  elements.questionCount.textContent = `${state.complete ? "Complete" : `Question ${answeredCount() + 1}`} of about ${targetCount()}`;
  elements.questionTitle.textContent = question.title;
  elements.questionWhy.textContent = question.why;
  elements.recommendedAnswer.textContent = question.recommendation;
  elements.answerInput.value = question.draft || "";
  elements.answerInput.disabled = state.complete;
  elements.backButton.disabled = state.answers.length === 0;
  elements.nextButton.disabled = state.complete;
  elements.nextButton.textContent = state.complete ? "Complete" : "Save & Coach";

  if (state.lastCoachNote) {
    elements.coachNoteBlock.hidden = false;
    elements.coachNoteText.textContent = state.lastCoachNote;
  } else {
    elements.coachNoteBlock.hidden = true;
    elements.coachNoteText.textContent = "";
  }

  if (lastAnswer) {
    elements.previousAnswerBlock.hidden = false;
    elements.previousAnswerText.textContent = lastAnswer.answer;
  } else {
    elements.previousAnswerBlock.hidden = true;
    elements.previousAnswerText.textContent = "";
  }
}

function renderBrief() {
  const completion = state.complete ? 100 : Math.min(95, Math.round((answeredCount() / targetCount()) * 100));
  elements.completionMeter.textContent = `${completion}%`;
  elements.progressBar.style.width = `${completion}%`;

  const coreItems = [
    ["Mode", state.mode === "startup" ? "Startup" : "Builder"],
    ["Idea", state.brief.problemStatement || answerById("idea")],
    ["User", state.brief.targetUser || answerById("human") || answerById("demand")],
    ["Wedge", state.brief.narrowestWedge || answerById("wedge") || answerById("fastest")],
    ["Signal", state.brief.successCriteria || answerById("observation")],
    ["Launch", state.brief.distributionPlan || answerById("distribution")]
  ];

  elements.ideaCore.innerHTML = coreItems
    .map(([label, value]) => `<dt>${label}</dt><dd>${escapeHtml(shorten(value) || "Unanswered")}</dd>`)
    .join("");

  elements.answerTrail.innerHTML = state.answers.length
    ? state.answers.map(item => `<li><strong>${escapeHtml(item.questionTitle)}</strong><br>${escapeHtml(shorten(item.answer, 210))}</li>`).join("")
    : "<li>No answers yet.</li>";

  elements.pressureList.innerHTML = buildPressureList().map(item => `<li>${escapeHtml(item)}</li>`).join("");

  elements.premiseSection.hidden = !state.premiseChallenge;
  elements.premiseChallenge.textContent = state.premiseChallenge;

  elements.alternativesSection.hidden = !state.alternatives.length;
  elements.alternativesList.innerHTML = state.alternatives.map(item => `<li><strong>${escapeHtml(item.name || "Approach")}</strong><br>${escapeHtml(item.summary || item)}</li>`).join("");
}

function answerById(id) {
  return state.answers.find(item => item.questionId === id)?.answer || "";
}

function buildPressureList() {
  const notes = [...(state.pressureNotes || [])];
  const allText = state.answers.map(item => item.answer).join(" ").toLowerCase();
  if (!allText.includes("pay") && !allText.includes("paid") && state.mode === "startup") {
    notes.push("Demand evidence still needs payment, repeated usage, or a concrete workaround cost.");
  }
  if (allText.includes("everyone") || allText.includes("anyone")) {
    notes.push("Audience is drifting broad. Name a reachable human, not a category.");
  }
  if (state.skipped?.length) {
    notes.push(`Smart-skipped: ${state.skipped.join(", ")}.`);
  }
  return notes.length ? [...new Set(notes)].slice(0, 7) : ["The brief is ready for a PRD, prototype plan, or user interview script."];
}

function shorten(value, maxLength = 145) {
  if (!value) return "";
  const trimmed = String(value).trim().replace(/\s+/g, " ");
  return trimmed.length > maxLength ? `${trimmed.slice(0, maxLength - 1)}...` : trimmed;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function lockAnswer() {
  if (state.complete) return;
  const answer = elements.answerInput.value.trim();
  if (!answer) {
    elements.answerInput.focus();
    elements.answerInput.placeholder = "The coach needs an answer before it can grill the next branch.";
    return;
  }

  const question = state.currentQuestion;
  state.answers.push({
    questionId: question.id,
    questionTitle: question.title,
    stage: question.stage,
    answer
  });
  elements.saveStatus.textContent = "Saved. Coach is reading your answer...";
  elements.nextButton.disabled = true;
  saveState();
  renderBrief();

  const coachResult = await getCoachResult();
  applyCoachResult(coachResult);
  saveState();
  render();
  elements.saveStatus.textContent = state.complete ? "Saved. Your design brief is ready." : "Saved. Next question adapted to your answer.";
  elements.answerInput.focus();

  if (state.complete) openExport();
}

async function getCoachResult() {
  if (state.useAi && location.protocol !== "file:") {
    try {
      const response = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(publicSession())
      });
      if (response.ok) {
        const result = await response.json();
        return { ...result, source: "ai" };
      }
    } catch {
      // Local fallback keeps the app usable from static hosts or file://.
    }
  }
  return localCoach(publicSession());
}

function publicSession() {
  return {
    mode: state.mode,
    answers: state.answers,
    skipped: state.skipped,
    pressureNotes: state.pressureNotes,
    currentFallbackIndex: state.currentFallbackIndex,
    complete: state.complete
  };
}

function applyCoachResult(result) {
  state.source = result.source || "local";
  state.lastCoachNote = result.coachNote || "";
  state.pressureNotes = Array.isArray(result.pressureNotes) ? result.pressureNotes : state.pressureNotes;
  state.skipped = Array.isArray(result.skipped) ? result.skipped : state.skipped;
  state.premiseChallenge = result.premiseChallenge || state.premiseChallenge;
  state.alternatives = Array.isArray(result.alternatives) ? result.alternatives : state.alternatives;
  state.brief = result.brief || state.brief || {};
  state.complete = Boolean(result.complete);

  if (result.nextQuestion && !state.complete) {
    state.currentQuestion = result.nextQuestion;
    state.currentFallbackIndex = Math.max(state.currentFallbackIndex, fallbackIndexForQuestion(result.nextQuestion.id));
  }

  if (state.complete) {
    state.currentQuestion = {
      ...state.currentQuestion,
      draft: state.answers[state.answers.length - 1]?.answer || ""
    };
  }
}

function fallbackIndexForQuestion(id) {
  const index = fallbackQuestions[state.mode].findIndex(item => item.id === id);
  return index >= 0 ? index : state.currentFallbackIndex;
}

function localCoach(session) {
  const questions = fallbackQuestions[session.mode];
  const lastAnswer = session.answers[session.answers.length - 1];
  const answeredIds = new Set(session.answers.map(item => item.questionId));
  const allText = session.answers.map(item => item.answer).join(" ").toLowerCase();
  const skipped = [...(session.skipped || [])];
  let nextIndex = Math.max(0, session.currentFallbackIndex + 1);

  if (session.mode === "startup" && answeredIds.has("demand") && /3 years|future|trend|ai makes|world changes|more essential|less essential/.test(allText)) {
    const futureFitIndex = questions.findIndex(item => item.id === "futureFit");
    if (nextIndex === futureFitIndex) {
      skipped.push("future-fit already covered by an earlier answer");
      nextIndex += 1;
    }
  }

  const nextQuestion = questions.find(question => !answeredIds.has(question.id) && questions.indexOf(question) >= nextIndex);
  const pressureNotes = buildLocalPressureNotes(session);
  const brief = synthesizeBrief(session);
  const premiseChallenge = makePremiseChallenge(session);
  const alternatives = makeAlternatives(session);
  const complete = !nextQuestion || session.answers.length >= questions.length;

  return {
    source: "local",
    complete,
    nextQuestion: nextQuestion || questions[questions.length - 1],
    skipped,
    pressureNotes,
    premiseChallenge,
    alternatives,
    brief,
    coachNote: lastAnswer ? localCoachNote(lastAnswer.answer, session.mode) : ""
  };
}

function buildLocalPressureNotes(session) {
  const notes = [];
  const allText = session.answers.map(item => item.answer).join(" ").toLowerCase();
  if (session.mode === "startup") {
    if (!/paid|pay|invoice|contract|repeat|workflow|scramble/.test(allText)) notes.push("Push harder on demand reality: name behavior, money, repeated use, or workaround cost.");
    if (!/specific|first|founder|manager|operator|engineer|sales|ops|name|title/.test(allText)) notes.push("Target user is not yet concrete enough. GStack would ask for an actual human and consequence.");
    if (!/smallest|wedge|first version|one workflow|this week/.test(allText)) notes.push("The narrowest wedge still needs a hard boundary.");
  } else {
    if (!/show|share|demo|whoa|cool/.test(allText)) notes.push("Builder mode needs a visible 'whoa' moment, not only utility.");
    if (!/weekend|hour|day|fastest|prototype|demo/.test(allText)) notes.push("Name the fastest thing you can actually ship or show.");
  }
  return notes.length ? notes : ["The session has enough specificity to generate a useful design brief."];
}

function localCoachNote(answer, mode) {
  if (mode === "startup" && /interesting|users|market|everyone|anyone/i.test(answer)) {
    return "That answer still leans broad. I am going to force specificity before letting the idea become a platform.";
  }
  if (mode === "startup") return "Good. I am looking for concrete behavior, current workaround, named user, and smallest paid wedge.";
  return "Good. I am looking for the most shareable, delightful version and the fastest path to a demo.";
}

function makePremiseChallenge(session) {
  const allText = session.answers.map(item => item.answer).join(" ");
  if (!allText) return "";
  if (session.mode === "startup") {
    return "Premise to challenge: the user wants a broad coach. Evidence may point to a narrower paid wedge around one painful moment. Prove the wedge before building the full platform.";
  }
  return "Premise to challenge: the useful version and the delightful version may not be the same. Build the version someone would show first.";
}

function makeAlternatives(session) {
  if (session.answers.length < 4) return [];
  if (session.mode === "startup") {
    return [
      { name: "Concierge wedge", summary: "Manually deliver the output to 5-10 users before automating the product." },
      { name: "Self-serve tool", summary: "Build the smallest paste-in workflow with one strong output and export." },
      { name: "Advisor workflow", summary: "Position it as a structured prep tool for office-hours or investor/customer calls." }
    ];
  }
  return [
    { name: "Weekend demo", summary: "Ship the most visible single-player version first." },
    { name: "Share artifact", summary: "Make the output easy to send as a link, image, or markdown." },
    { name: "Open-source seed", summary: "Release the core workflow and let builders extend the fun parts." }
  ];
}

function synthesizeBrief(session) {
  const byStage = Object.fromEntries(session.answers.map(item => [item.questionId, item.answer]));
  return {
    problemStatement: byStage.idea || "",
    demandEvidence: byStage.demand || "",
    statusQuo: byStage.statusQuo || "",
    targetUser: byStage.human || byStage.show || "",
    narrowestWedge: byStage.wedge || byStage.fastest || "",
    successCriteria: byStage.observation || "",
    distributionPlan: byStage.distribution || "",
    recommendedApproach: session.mode === "startup" ? "Start with the narrowest paid/urgent wedge, then expand only after repeat usage." : "Start with the most showable demo, then polish the workflow people repeat."
  };
}

function goBack() {
  if (!state.answers.length) return;
  const last = state.answers.pop();
  state.currentQuestion = fallbackQuestions[state.mode].find(item => item.id === last.questionId) || state.currentQuestion;
  state.currentFallbackIndex = fallbackIndexForQuestion(last.questionId);
  state.complete = false;
  state.lastCoachNote = "";
  saveState();
  render();
  elements.answerInput.value = last.answer;
  elements.answerInput.focus();
}

function switchMode(mode) {
  if (mode === state.mode) return;
  const hasWork = state.answers.length > 0;
  if (hasWork && !confirm("Switch modes and reset this session?")) return;
  Object.assign(state, defaultState(mode));
  saveState();
  render();
}

function resetSession() {
  if (!confirm("Reset this refinement session?")) return;
  Object.assign(state, defaultState(state.mode));
  saveState();
  elements.saveStatus.textContent = "";
  render();
}

function makeExport() {
  const modeLabel = state.mode === "startup" ? "Startup" : "Builder";
  const lines = [
    `# Design: ${briefTitle()}`,
    "",
    `Generated by ForgeRoom on ${new Date().toLocaleString()}`,
    `Mode: ${modeLabel}`,
    `Coach source: ${state.source === "ai" ? "Adaptive AI" : "Local fallback"}`,
    "Status: DRAFT",
    "",
    "## Problem Statement",
    state.brief.problemStatement || answerById("idea") || "Unanswered",
    "",
    ...(state.mode === "startup" ? [
      "## Demand Evidence",
      state.brief.demandEvidence || answerById("demand") || "Unanswered",
      "",
      "## Status Quo",
      state.brief.statusQuo || answerById("statusQuo") || "Unanswered",
      "",
      "## Target User & Narrowest Wedge",
      [state.brief.targetUser, state.brief.narrowestWedge].filter(Boolean).join("\n\n") || "Unanswered"
    ] : [
      "## What Makes This Cool",
      answerById("coolest") || state.brief.narrowestWedge || "Unanswered",
      "",
      "## Fastest Shareable Version",
      answerById("fastest") || "Unanswered"
    ]),
    "",
    "## Premises",
    state.premiseChallenge || "Unanswered",
    "",
    "## Approaches Considered",
    ...(state.alternatives.length ? state.alternatives.map(item => `### ${item.name}\n${item.summary}`) : ["Unanswered"]),
    "",
    "## Recommended Approach",
    state.brief.recommendedApproach || "Unanswered",
    "",
    "## Open Questions",
    ...buildPressureList().map(item => `- ${item}`),
    "",
    "## Success Criteria",
    state.brief.successCriteria || "Unanswered",
    "",
    "## Distribution Plan",
    state.brief.distributionPlan || "Unanswered",
    "",
    "## Answer Trail",
    ...state.answers.map(item => `### ${item.questionTitle}\n${item.answer}`),
    "",
    "## The Assignment",
    state.mode === "startup"
      ? "Find one real user and test whether the narrowest wedge creates behavior, not compliments."
      : "Build the smallest demo someone would actually show to another person."
  ];
  return lines.join("\n");
}

function briefTitle() {
  const first = answerById("idea");
  const match = first.match(/(?:building|make|create)\s+([^,.]{3,70})/i);
  return match ? shorten(match[1], 70) : "ForgeRoom Session";
}

function openExport() {
  elements.exportOutput.value = makeExport();
  elements.exportDialog.showModal();
}

async function copyExport() {
  elements.exportOutput.select();
  let copied = false;
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(elements.exportOutput.value);
      copied = true;
    } catch {
      copied = false;
    }
  }
  if (!copied) {
    try {
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    }
  }
  elements.copyExportButton.textContent = copied ? "Copied" : "Selected";
  window.setTimeout(() => {
    elements.copyExportButton.textContent = "Copy";
  }, 1200);
}

elements.nextButton.addEventListener("click", lockAnswer);
elements.backButton.addEventListener("click", goBack);
elements.resetButton.addEventListener("click", resetSession);
elements.exportButton.addEventListener("click", openExport);
elements.copyExportButton.addEventListener("click", copyExport);
elements.startupModeButton.addEventListener("click", () => switchMode("startup"));
elements.builderModeButton.addEventListener("click", () => switchMode("builder"));
elements.aiToggle.addEventListener("change", () => {
  state.useAi = elements.aiToggle.checked;
  saveState();
  renderModes();
});
elements.useRecommendationButton.addEventListener("click", () => {
  elements.answerInput.value = state.currentQuestion.recommendation;
  elements.answerInput.focus();
});
elements.answerInput.addEventListener("keydown", event => {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") lockAnswer();
});

render();
