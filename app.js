const stages = [
  {
    name: "Think",
    tone: "Founder office-hours",
    questions: [
      {
        id: "idea",
        title: "What are you trying to make real?",
        why: "Start from the user-visible promise, not the technology or the category.",
        recommendation: "I am building [product] for [specific user] so they can [valuable outcome] without [painful current workaround]."
      },
      {
        id: "user",
        title: "Who feels this pain sharply enough to change behavior?",
        why: "A good first market is narrow, reachable, and already looking for relief.",
        recommendation: "The first user is [role/persona] who currently [observable behavior] and loses [time, money, status, quality, or momentum] because of it."
      },
      {
        id: "job",
        title: "What job are they hiring this product to do?",
        why: "The job gives you a testable promise. Features are negotiable. The job is not.",
        recommendation: "When [trigger happens], the user needs to [make progress], so they can [larger goal]. Today they use [alternative]."
      }
    ]
  },
  {
    name: "Grill",
    tone: "Relentless interrogation",
    questions: [
      {
        id: "stakes",
        title: "What happens if the user ignores this problem for another year?",
        why: "If nothing meaningfully breaks, the product may be nice-to-have.",
        recommendation: "If ignored, they will [specific worsening consequence], which costs about [amount/time/risk] and creates pressure from [customer, boss, market, internal goal]."
      },
      {
        id: "secret",
        title: "What do you believe that the obvious version of this idea misses?",
        why: "This is where founder taste shows up: an insight, a wedge, or a constraint that changes the product.",
        recommendation: "Most people think [common assumption]. I think [contrarian or underappreciated truth], because [evidence or lived observation]."
      },
      {
        id: "whyNow",
        title: "Why can this work now when it could not work before?",
        why: "Timing turns a plausible idea into a live opportunity.",
        recommendation: "This is newly possible because [technology/platform/regulation/behavior/distribution change], and the old blocker was [blocker]."
      }
    ]
  },
  {
    name: "Plan",
    tone: "Scope review",
    questions: [
      {
        id: "wedge",
        title: "What is the smallest useful wedge?",
        why: "The wedge should make one user meaningfully better off, quickly.",
        recommendation: "The first version only does [one workflow] for [one user segment], and it is successful if [measurable user action] happens."
      },
      {
        id: "scope",
        title: "What are you refusing to build at first?",
        why: "Scope discipline protects learning speed. A product with no exclusions is usually an idea still hiding from reality.",
        recommendation: "Version one will not include [feature], [audience], or [workflow], even though they are tempting, because [reason tied to learning]."
      },
      {
        id: "workflow",
        title: "What exact workflow does the product need to improve?",
        why: "A workflow reveals screens, data, integrations, and proof of value.",
        recommendation: "The user starts with [input/context], takes [3-5 key steps], and ends with [finished artifact or decision]."
      }
    ]
  },
  {
    name: "Build",
    tone: "Implementation brief",
    questions: [
      {
        id: "mvp",
        title: "What should a builder implement first?",
        why: "A good build brief translates product judgment into concrete behavior.",
        recommendation: "Build [core interaction], with [inputs], [state], [output], and [one retention or sharing loop]."
      },
      {
        id: "data",
        title: "What data must exist for the product to feel alive?",
        why: "Data shape is often the real product shape.",
        recommendation: "The product stores [entities], each with [fields], and the most important state transition is [from X to Y]."
      },
      {
        id: "ux",
        title: "Where can the interface remove thinking instead of adding options?",
        why: "Great first products feel obvious because the hard decision has already been made for the user.",
        recommendation: "The UI should default to [decision], hide [complexity], and make [primary action] the obvious next move."
      }
    ]
  },
  {
    name: "Review",
    tone: "Risk inspection",
    questions: [
      {
        id: "failure",
        title: "What is the most likely reason this fails?",
        why: "Naming failure modes early makes the idea stronger, not weaker.",
        recommendation: "The biggest risk is [adoption/value/distribution/technical/trust], because [specific weak assumption]."
      },
      {
        id: "competition",
        title: "What will users compare this against?",
        why: "The competitor is often a spreadsheet, a group chat, a person, or doing nothing.",
        recommendation: "Users will compare this to [current tool/workaround]. We win only if we are [faster/cheaper/more trusted/more delightful] by [clear margin]."
      },
      {
        id: "trust",
        title: "What would make a skeptical user trust it?",
        why: "Trust is part of the product, especially when the idea changes a decision or workflow.",
        recommendation: "Trust comes from [proof, controls, transparency, human review, examples, guarantees], shown at [moment in workflow]."
      }
    ]
  },
  {
    name: "Test",
    tone: "QA and validation",
    questions: [
      {
        id: "validation",
        title: "What is the fastest real-world test?",
        why: "The best validation creates contact with reality before the full product exists.",
        recommendation: "In [timeframe], I can test this by [concierge, landing page, prototype, manual workflow] with [number] target users."
      },
      {
        id: "success",
        title: "What signal proves the idea is getting sharper?",
        why: "Good metrics track changed behavior, not compliments.",
        recommendation: "The signal is [activation, repeat use, payment, referral, time saved, conversion], and the threshold is [number] by [date]."
      },
      {
        id: "qa",
        title: "What would you test before showing this to the next user?",
        why: "A product idea improves when every demo teaches you what broke.",
        recommendation: "Before the next user sees it, I would test [happy path], [edge case], [empty state], and [failure recovery]."
      }
    ]
  },
  {
    name: "Ship",
    tone: "Launch and retro",
    questions: [
      {
        id: "distribution",
        title: "How will the first ten users discover it?",
        why: "Distribution is not a later department. It changes what you should build first.",
        recommendation: "The first ten users come from [channel/community/personal outreach], using [specific message], because they already gather at [place]."
      },
      {
        id: "launch",
        title: "What is the launch promise in one sentence?",
        why: "If the promise cannot fit in one sentence, the product may still be too blurry.",
        recommendation: "For [user], ForgeRoom helps you [outcome] in [timeframe] without [pain]."
      },
      {
        id: "retro",
        title: "After launch, what will you learn and change first?",
        why: "A tight feedback loop keeps the product alive after the first shipment.",
        recommendation: "After launch I will review [metric/user feedback/session recordings/support requests], then decide whether to [double down, narrow, pivot, or kill]."
      }
    ]
  }
];

const STORAGE_KEY = "forgeroom.session.v1";

const flattenedQuestions = stages.flatMap((stage, stageIndex) =>
  stage.questions.map((question, questionIndex) => ({
    ...question,
    stage: stage.name,
    tone: stage.tone,
    stageIndex,
    questionIndex
  }))
);

const state = loadState();

const elements = {
  answerInput: document.querySelector("#answerInput"),
  answerTrail: document.querySelector("#answerTrail"),
  backButton: document.querySelector("#backButton"),
  completionMeter: document.querySelector("#completionMeter"),
  copyExportButton: document.querySelector("#copyExportButton"),
  currentStage: document.querySelector("#currentStage"),
  exportButton: document.querySelector("#exportButton"),
  exportDialog: document.querySelector("#exportDialog"),
  exportOutput: document.querySelector("#exportOutput"),
  ideaCore: document.querySelector("#ideaCore"),
  nextButton: document.querySelector("#nextButton"),
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
  useRecommendationButton: document.querySelector("#useRecommendationButton")
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved.currentIndex === "number" && saved.answers) {
      return saved;
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }

  return {
    currentIndex: 0,
    answers: {}
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function currentQuestion() {
  return flattenedQuestions[Math.min(state.currentIndex, flattenedQuestions.length - 1)];
}

function render() {
  renderStages();
  renderQuestion();
  renderBrief();
}

function renderStages() {
  elements.stageStrip.innerHTML = "";
  const answeredCount = Object.keys(state.answers).length;

  stages.forEach((stage, index) => {
    const stageStart = stages.slice(0, index).reduce((count, item) => count + item.questions.length, 0);
    const stageEnd = stageStart + stage.questions.length;
    const card = document.createElement("article");
    card.className = "stage-card";
    if (index === currentQuestion().stageIndex) card.classList.add("is-active");
    if (answeredCount >= stageEnd) card.classList.add("is-complete");
    card.innerHTML = `
      <span class="stage-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="stage-name">${stage.name}</span>
    `;
    elements.stageStrip.appendChild(card);
  });
}

function renderQuestion() {
  const question = currentQuestion();
  const previousQuestion = flattenedQuestions[state.currentIndex - 1];
  elements.currentStage.textContent = `${question.stage} - ${question.tone}`;
  elements.questionCount.textContent = `Question ${state.currentIndex + 1} of ${flattenedQuestions.length}`;
  elements.questionTitle.textContent = question.title;
  elements.questionWhy.textContent = question.why;
  elements.recommendedAnswer.textContent = question.recommendation;
  elements.answerInput.value = state.answers[question.id] || "";
  elements.backButton.disabled = state.currentIndex === 0;
  elements.nextButton.textContent = state.currentIndex === flattenedQuestions.length - 1 ? "Finish & Export" : "Save & Next";

  if (previousQuestion && state.answers[previousQuestion.id]) {
    elements.previousAnswerBlock.hidden = false;
    elements.previousAnswerText.textContent = state.answers[previousQuestion.id];
  } else {
    elements.previousAnswerBlock.hidden = true;
    elements.previousAnswerText.textContent = "";
  }
}

function renderBrief() {
  const answeredCount = Object.keys(state.answers).length;
  const completion = Math.round((answeredCount / flattenedQuestions.length) * 100);
  elements.completionMeter.textContent = `${completion}%`;
  elements.progressBar.style.width = `${completion}%`;

  const coreItems = [
    ["Idea", state.answers.idea],
    ["User", state.answers.user],
    ["Job", state.answers.job],
    ["Wedge", state.answers.wedge],
    ["Signal", state.answers.success],
    ["Launch", state.answers.launch]
  ];

  elements.ideaCore.innerHTML = coreItems
    .map(([label, value]) => `<dt>${label}</dt><dd>${escapeHtml(shorten(value) || "Unanswered")}</dd>`)
    .join("");

  const answeredQuestions = flattenedQuestions.filter(question => state.answers[question.id]);
  elements.answerTrail.innerHTML = answeredQuestions.length
    ? answeredQuestions
        .map(question => `<li><strong>${escapeHtml(question.title)}</strong><br>${escapeHtml(shorten(state.answers[question.id], 190))}</li>`)
        .join("")
    : "<li>No answers yet.</li>";

  elements.pressureList.innerHTML = buildPressureList()
    .map(item => `<li>${escapeHtml(item)}</li>`)
    .join("");
}

function buildPressureList() {
  const answers = state.answers;
  const items = [];

  if (!answers.user) items.push("The first user is still undefined.");
  if (!answers.stakes) items.push("The consequence of inaction is not yet sharp.");
  if (!answers.wedge) items.push("The smallest useful wedge needs a hard boundary.");
  if (!answers.failure) items.push("The leading failure mode has not been named.");
  if (!answers.distribution) items.push("The first distribution channel is still missing.");

  const allText = Object.values(answers).join(" ").toLowerCase();
  if (allText.includes("everyone") || allText.includes("anyone")) {
    items.push("The audience may be too broad. Narrow until you can picture one reachable buyer.");
  }
  if (allText.includes("ai") && !allText.includes("trust")) {
    items.push("AI is present, but trust mechanics may need to be explicit.");
  }
  if (allText.includes("marketplace")) {
    items.push("Marketplace ideas need a cold-start plan for both supply and demand.");
  }

  return items.length ? items.slice(0, 6) : ["The brief has enough structure to become a PRD, prototype, or user interview script."];
}

function shorten(value, maxLength = 145) {
  if (!value) return "";
  const trimmed = value.trim().replace(/\s+/g, " ");
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

function lockAnswer() {
  const question = currentQuestion();
  const answer = elements.answerInput.value.trim();

  if (!answer) {
    elements.answerInput.focus();
    elements.answerInput.placeholder = "This question needs an answer before the brief can get sharper.";
    return;
  }

  state.answers[question.id] = answer;
  const wasFinalQuestion = state.currentIndex === flattenedQuestions.length - 1;
  if (state.currentIndex < flattenedQuestions.length - 1) {
    state.currentIndex += 1;
  }
  saveState();
  render();
  elements.saveStatus.textContent = wasFinalQuestion
    ? "Saved. Your product brief is ready."
    : `Saved "${question.title}" and moved to the next question.`;
  elements.answerInput.focus();

  if (wasFinalQuestion) {
    openExport();
  }
}

function goBack() {
  if (state.currentIndex > 0) {
    state.currentIndex -= 1;
    saveState();
    render();
    elements.answerInput.focus();
  }
}

function resetSession() {
  const shouldReset = confirm("Reset this refinement session?");
  if (!shouldReset) return;
  state.currentIndex = 0;
  state.answers = {};
  saveState();
  elements.saveStatus.textContent = "";
  render();
}

function makeExport() {
  const sections = stages.map(stage => {
    const lines = stage.questions.map(question => {
      const answer = state.answers[question.id] || "Unanswered";
      return `### ${question.title}\n${answer}`;
    });
    return `## ${stage.name}\n${lines.join("\n\n")}`;
  });

  return [
    "# ForgeRoom Product Brief",
    "",
    `Generated: ${new Date().toLocaleString()}`,
    "",
    "## One-line Promise",
    state.answers.launch || state.answers.idea || "Unanswered",
    "",
    "## Pressure Notes",
    ...buildPressureList().map(item => `- ${item}`),
    "",
    ...sections,
    "",
    "## Next Actions",
    "- Turn the wedge into a prototype task list.",
    "- Run the fastest real-world validation test.",
    "- Review the leading failure mode before writing more code."
  ].join("\n");
}

function openExport() {
  elements.exportOutput.value = makeExport();
  elements.exportDialog.showModal();
}

async function copyExport() {
  elements.exportOutput.select();
  await navigator.clipboard.writeText(elements.exportOutput.value);
  elements.copyExportButton.textContent = "Copied";
  window.setTimeout(() => {
    elements.copyExportButton.textContent = "Copy";
  }, 1200);
}

elements.nextButton.addEventListener("click", lockAnswer);
elements.backButton.addEventListener("click", goBack);
elements.resetButton.addEventListener("click", resetSession);
elements.exportButton.addEventListener("click", openExport);
elements.copyExportButton.addEventListener("click", copyExport);
elements.useRecommendationButton.addEventListener("click", () => {
  const question = currentQuestion();
  const starter = state.answers[question.id] || question.recommendation;
  elements.answerInput.value = starter;
  elements.answerInput.focus();
});
elements.answerInput.addEventListener("keydown", event => {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    lockAnswer();
  }
});

render();
