const quizData = [
  {
    question: "Qual é a principal função da fotossíntese?",
    options: [
      "Produzir energia elétrica",
      "Converter energia solar em energia química",
      "Transformar oxigênio em gás carbônico",
      "Aumentar a temperatura da Terra"
    ],
    answer: "Converter energia solar em energia química"
  },
  {
    question: "Além de se alimentarem, as plantas desempenham qual papel essencial?",
    options: [
      "Gerar calor para o planeta",
      "Regular o ciclo da água e produzir oxigênio",
      "Absorver apenas calor",
      "Produzir apenas frutos"
    ],
    answer: "Regular o ciclo da água e produzir oxigênio"
  },
  {
    question: "O que causa o aquecimento global?",
    options: [
      "Apenas fenômenos naturais",
      "Excesso de gases de efeito estufa devido às atividades humanas",
      "A respiração das plantas",
      "A rotação da Terra"
    ],
    answer: "Excesso de gases de efeito estufa devido às atividades humanas"
  },
  {
    question: "Qual impacto do aquecimento global sobre os ecossistemas?",
    options: [
      "Aumento da biodiversidade",
      "Degelo, extinção de espécies e mudanças climáticas extremas",
      "Aumento da fotossíntese",
      "Estabilidade social e climática"
    ],
    answer: "Degelo, extinção de espécies e mudanças climáticas extremas"
  },
  {
    question: "As plantas são consideradas a base da cadeia alimentar porque:",
    options: [
      "Produzem seu próprio alimento",
      "Comem outros animais",
      "Não respiram oxigênio",
      "Vivem para sempre"
    ],
    answer: "Produzem seu próprio alimento"
  }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = "";

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const nextBtn = document.querySelector(".btn");

const restartBtn = document.createElement("button");
restartBtn.textContent = "Recomeçar";
restartBtn.classList.add("restart-btn");
restartBtn.onclick = restartQuiz;
restartBtn.style.display = "none";
document.querySelector(".quiz-container").appendChild(restartBtn);

const startBtn = document.createElement("button");
startBtn.textContent = "Começar Quiz";
startBtn.classList.add("start-btn");
startBtn.onclick = startQuiz;
document.querySelector(".quiz-container").appendChild(startBtn);

questionEl.style.display = "none";
optionsEl.style.display = "none";
nextBtn.style.display = "none";

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach(option => {
    const btn = document.createElement("div");
    btn.textContent = option;
    btn.classList.add("option");
    btn.onclick = () => selectOption(option, btn);
    optionsEl.appendChild(btn);
  });
}

function selectOption(option, element) {
  selectedOption = option;
  document.querySelectorAll(".option").forEach(btn => btn.style.background = "#e9f5ec");
  element.style.background = "#b3d9ff";
}

function nextQuestion() {
  if (!selectedOption) {
    alert("Escolha uma opção!");
    return;
  }
  const correctAnswer = quizData[currentQuestion].answer;
  const optionButtons = document.querySelectorAll(".option");
  optionButtons.forEach(btn => {
    if (btn.textContent === correctAnswer) {
      btn.style.background = "#8BC34A";
      btn.style.color = "#fff";
    } else if (btn.textContent === selectedOption) {
      btn.style.background = "#F44336";
      btn.style.color = "#fff";
    }
    btn.style.pointerEvents = "none";
  });
  if (selectedOption === correctAnswer) {
    score++;
  }
  setTimeout(() => {
    selectedOption = "";
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 1500);
}

function showResult() {
  questionEl.style.display = "none";
  optionsEl.style.display = "none";
  nextBtn.style.display = "none";
  resultEl.textContent = `Você acertou ${score} de ${quizData.length} perguntas! 🌱`;
  restartBtn.style.display = "inline-block";
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  selectedOption = "";
  resultEl.textContent = "";
  restartBtn.style.display = "none";
  startBtn.style.display = "inline-block";
}

function startQuiz() {
  startBtn.style.display = "none";
  questionEl.style.display = "block";
  optionsEl.style.display = "block";
  nextBtn.style.display = "inline-block";
  resultEl.textContent = "";
  loadQuestion();
}
