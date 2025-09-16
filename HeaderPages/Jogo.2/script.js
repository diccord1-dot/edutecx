const mario = document.getElementById("mario");
const quiz = document.getElementById("quiz");
const alternativasDiv = document.getElementById("alternativas");
const overlay = document.getElementById("overlay");

let marioX = 50, marioY = 100, velocidadeY = 0;
const gravidade = -0.8, pulo = 15, Movimento = 2.5; 

let gameAtivo = true, batalhaAtiva = false;

const key = { left: false, right: false };

let inimigos = Array.from(document.querySelectorAll(".inimigo"));
let pipes = Array.from(document.querySelectorAll(".pipe"));

const perguntas = [
  {
    pergunta: "Qual é a principal função da fotossíntese?",
    alternativas: [
      "Produzir energia elétrica",
      "Converter energia solar em energia química",
      "Transformar oxigênio em gás carbônico",
      "Aumentar a temperatura da Terra"
    ],
    respostaCorreta: "Converter energia solar em energia química"
  },
  {
    pergunta: "Além de se alimentarem, as plantas desempenham qual papel essencial?",
    alternativas: [
      "Gerar calor para o planeta",
      "Regular o ciclo da água e produzir oxigênio",
      "Absorver apenas calor",
      "Produzir apenas frutos"
    ],
    respostaCorreta: "Regular o ciclo da água e produzir oxigênio"
  },
  {
    pergunta: "O que causa o aquecimento global?",
    alternativas: [
      "Apenas fenômenos naturais",
      "Excesso de gases de efeito estufa devido às atividades humanas",
      "A respiração das plantas",
      "A rotação da Terra"
    ],
    respostaCorreta: "Excesso de gases de efeito estufa devido às atividades humanas"
  },
  {
    pergunta: "Qual impacto do aquecimento global sobre os ecossistemas?",
    alternativas: [
      "Aumento da biodiversidade",
      "Degelo, extinção de espécies e mudanças climáticas extremas",
      "Aumento da fotossíntese",
      "Estabilidade social e climática"
    ],
    respostaCorreta: "Degelo, extinção de espécies e mudanças climáticas extremas"
  },
  {
    pergunta: "As plantas são consideradas a base da cadeia alimentar porque:",
    alternativas: [
      "Produzem seu próprio alimento",
      "Comem outros animais",
      "Não respiram oxigênio",
      "Vivem para sempre"
    ],
    respostaCorreta: "Produzem seu próprio alimento"
  }
];

let perguntasRestantes = [...perguntas];


document.addEventListener("keydown", (e) => {
  if (!gameAtivo) return;
  if (e.key === "ArrowRight" || e.key === "d") key.right = true;
  if (e.key === "ArrowLeft" || e.key === "a") key.left = true;
  if ((e.key === "ArrowUp" || e.key === "w") && velocidadeY === 0) velocidadeY = pulo;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight" || e.key === "d") key.right = false;
  if (e.key === "ArrowLeft" || e.key === "a") key.left = false;
});

function update() {
  if (!gameAtivo) return;

  if (key.right) marioX += Movimento;
  if (key.left) marioX -= Movimento;

  marioY += velocidadeY;
  velocidadeY += gravidade;

  if (marioY < 100) {
    marioY = 100;
    velocidadeY = 0;
  }

  for (let pipe of pipes) {
    const pipeX = pipe.offsetLeft;
    const pipeWidth = pipe.offsetWidth;
    const pipeHeight = pipe.offsetHeight;
    const pipeTop = 100 + pipeHeight;
    const pipeRight = pipeX + pipeWidth;
  
    const marioRight = marioX + mario.offsetWidth;
    const marioBottom = marioY;
    const marioTop = marioY + mario.offsetHeight;
  
    // Se Mario está alinhado horizontalmente com o cano
    if (marioRight > pipeX && marioX < pipeRight) {
      
      // Colisão pelo topo (Mario cai em cima do cano)
      if (marioBottom <= pipeTop && marioBottom >= pipeTop - 30 && velocidadeY <= 0) {
        marioY = pipeTop;
        velocidadeY = 0;
      }
  
      // Colisão pela esquerda do cano
      if (marioRight > pipeX && marioX < pipeX && marioTop > 100 && marioBottom < pipeTop) {
        marioX = pipeX - mario.offsetWidth;
      }
  
      // Colisão pela direita do cano
      if (marioX < pipeRight && marioRight > pipeRight && marioTop > 100 && marioBottom < pipeTop) {
        marioX = pipeRight;
      }
    }
  }
  
  
  
  mario.style.left = marioX + "px";
  mario.style.bottom = marioY + "px";

  if (!batalhaAtiva) checkCollision();

  requestAnimationFrame(update);
}

function checkCollision() {
  const m = mario.getBoundingClientRect();
  for (let inimigo of inimigos) {
    const e = inimigo.getBoundingClientRect();
    if (!(m.top > e.bottom || m.bottom < e.top || m.right < e.left || m.left > e.right)) {
      if (inimigo.classList.contains("grande-inimigo" && "inimigo-pulavel")) {
        startQuiz(inimigo);
        break;
      }
      if (m.bottom <= e.top + 10 && velocidadeY <= 0) {
        inimigo.remove();
        inimigos = inimigos.filter(en => en !== inimigo);
        velocidadeY = pulo * 0.7; 
      } 
      break;
    }
  }
}

function startQuiz(inimigo) {
  batalhaAtiva = true;
  gameAtivo = false;

  inimigo.scrollIntoView({ behavior: "smooth", inline: "center" });

  if (perguntasRestantes.length === 0) perguntasRestantes = [...perguntas];

  const idx = Math.floor(Math.random() * perguntasRestantes.length);
  const q = perguntasRestantes.splice(idx, 1)[0];

  document.getElementById("question").innerText = q.pergunta;
  alternativasDiv.innerHTML = "";

  q.alternativas.forEach(alt => {
    const btn = document.createElement("button");
    btn.innerText = alt;
    btn.onclick = () => checkAnswer(alt, q.respostaCorreta, inimigo);
    alternativasDiv.appendChild(btn);
  });

  overlay.style.display = "block";
  setTimeout(() => overlay.classList.add("show"), 10);
  quiz.style.display = "block";
}

function checkAnswer(resposta, correta, inimigo) {
  if (resposta === correta) {
    alert("Resposta correta!");
    inimigo.remove();
    inimigos = inimigos.filter(e => e !== inimigo);
    closeQuiz();
    if (inimigo.classList.contains("inimigo-grande")) {
      alert("🎉 Você derrotou o Boss e venceu o jogo!");
      document.querySelector(".end").innerText = "🏆 Vitória!";
    }
  } else {
    alert("Resposta errada! Você perdeu!");
    location.reload();
  }
}

function closeQuiz() {
  quiz.style.display = "none";
  overlay.classList.remove("show");
  setTimeout(() => {
    overlay.style.display = "none";
  }, 400);
  batalhaAtiva = false;
  gameAtivo = true;
  requestAnimationFrame(update);
}

update();
