const mario = document.getElementById("mario");
const quiz = document.getElementById("quiz");
const alternativasDiv = document.getElementById("alternativas");
const overlay = document.getElementById("overlay");

let marioX = 50, marioY = 100, velocityY = 0;
const gravity = -0.8, jumpForce = 15, moveSpeed = 2.5; 

let gameActive = true, battleActive = false;

const keys = { left: false, right: false };

let enemies = Array.from(document.querySelectorAll(".enemy"));
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
  if (!gameActive) return;
  if (e.key === "ArrowRight" || e.key === "d") keys.right = true;
  if (e.key === "ArrowLeft" || e.key === "a") keys.left = true;
  if ((e.key === "ArrowUp" || e.key === "w") && velocityY === 0) velocityY = jumpForce;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight" || e.key === "d") keys.right = false;
  if (e.key === "ArrowLeft" || e.key === "a") keys.left = false;
});

function update() {
  if (!gameActive) return;

  
  if (keys.right) marioX += moveSpeed;
  if (keys.left) marioX -= moveSpeed;

  
  marioY += velocityY;
  velocityY += gravity;

 
  if (marioY < 100) {
    marioY = 100;
    velocityY = 0;
  }

  
  for (let pipe of pipes) {
    const pipeX = pipe.offsetLeft;
    const pipeWidth = pipe.offsetWidth;
    const pipeHeight = pipe.offsetHeight;
    const pipeTop = 100 + pipeHeight;

    if (marioX + mario.offsetWidth > pipeX && marioX < pipeX + pipeWidth) {
      if (marioX + mario.offsetWidth > pipeX && marioX < pipeX && marioY < pipeTop) {
        marioX = pipeX - mario.offsetWidth;
      }
      if (marioX < pipeX + pipeWidth && marioX + mario.offsetWidth > pipeX + pipeWidth && marioY < pipeTop) {
        marioX = pipeX + pipeWidth;
      }
      if (marioY <= pipeTop && marioY >= pipeTop - 30 && velocityY <= 0) {
        marioY = pipeTop;
        velocityY = 0;
      }
    }
  }

  
  mario.style.left = marioX + "px";
  mario.style.bottom = marioY + "px";

  if (!battleActive) checkCollision();

  requestAnimationFrame(update);
}

function checkCollision() {
    const m = mario.getBoundingClientRect();
  
    for (let enemy of enemies) {
      const e = enemy.getBoundingClientRect();
  
      if (!(m.top > e.bottom || m.bottom < e.top || m.right < e.left || m.left > e.right)) {
        
        
        if (enemy.classList.contains("big-enemy" && "enemy-jumpable")) {
          startQuiz(enemy);
          break;
        }
  
        
        if (
          m.bottom <= e.top + 10 && 
          velocityY <= 0           
        ) {
          enemy.remove();
          enemies = enemies.filter(en => en !== enemy);
          velocityY = jumpForce * 0.7; 
        } 
        break;
      }
    }
  }
  

function startQuiz(enemy) {
  battleActive = true;
  gameActive = false;

  enemy.scrollIntoView({ behavior: "smooth", inline: "center" });

  if (perguntasRestantes.length === 0) perguntasRestantes = [...perguntas];

  const idx = Math.floor(Math.random() * perguntasRestantes.length);
  const q = perguntasRestantes.splice(idx, 1)[0];

  document.getElementById("question").innerText = q.pergunta;
  alternativasDiv.innerHTML = "";

  q.alternativas.forEach(alt => {
    const btn = document.createElement("button");
    btn.innerText = alt;
    btn.onclick = () => checkAnswer(alt, q.respostaCorreta, enemy);
    alternativasDiv.appendChild(btn);
  });

  overlay.style.display = "block";
  setTimeout(() => overlay.classList.add("show"), 10);
  quiz.style.display = "block";
}

function checkAnswer(resposta, correta, enemy) {
  if (resposta === correta) {
    alert("Resposta correta!");
    enemy.remove();
    enemies = enemies.filter(e => e !== enemy);
    closeQuiz();

    if (enemy.classList.contains("big-enemy")) {
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

  battleActive = false;
  gameActive = true;
  requestAnimationFrame(update);
}

update();
