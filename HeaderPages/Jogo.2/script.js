const mario = document.getElementById("mario")
const quiz = document.getElementById("quiz")
const alternativasDiv = document.getElementById("alternativas")
const overlay = document.getElementById("overlay")

let marioX = 50, marioY = 100, velocidadeY = 0
const gravidade = -0.8, pulo = 15, Movimento = 2.5
let gameAtivo = true, batalhaAtiva = false
const key = { left: false, right: false }

let inimigos = Array.from(document.querySelectorAll(".inimigo"))
let pipes = Array.from(document.querySelectorAll(".pipe"))

const perguntas = [
  { pergunta: "Qual é a principal função da fotossíntese?", alternativas: ["Produzir energia elétrica","Converter energia solar em energia química","Transformar oxigênio em gás carbônico","Aumentar a temperatura da Terra"], respostaCorreta: "Converter energia solar em energia química" },
  { pergunta: "Além de se alimentarem, as plantas desempenham qual papel essencial?", alternativas: ["Gerar calor para o planeta","Regular o ciclo da água e produzir oxigênio","Absorver apenas calor","Produzir apenas frutos"], respostaCorreta: "Regular o ciclo da água e produzir oxigênio" },
  { pergunta: "O que causa o aquecimento global?", alternativas: ["Apenas fenômenos naturais","Excesso de gases de efeito estufa devido às atividades humanas","A respiração das plantas","A rotação da Terra"], respostaCorreta: "Excesso de gases de efeito estufa devido às atividades humanas" },
  { pergunta: "Qual impacto do aquecimento global sobre os ecossistemas?", alternativas: ["Aumento da biodiversidade","Degelo, extinção de espécies e mudanças climáticas extremas","Aumento da fotossíntese","Estabilidade social e climática"], respostaCorreta: "Degelo, extinção de espécies e mudanças climáticas extremas" },
  { pergunta: "As plantas são consideradas a base da cadeia alimentar porque:", alternativas: ["Produzem seu próprio alimento","Comem outros animais","Não respiram oxigênio","Vivem para sempre"], respostaCorreta: "Produzem seu próprio alimento" }
]

let perguntasRestantes = [...perguntas]

document.addEventListener("keydown", e => {
  if (!gameAtivo) return
  if (e.key === "ArrowRight" || e.key === "d") key.right = true
  if (e.key === "ArrowLeft" || e.key === "a") key.left = true
  if ((e.key === "ArrowUp" || e.key === "w") && velocidadeY === 0) velocidadeY = pulo
})

document.addEventListener("keyup", e => {
  if (e.key === "ArrowRight" || e.key === "d") key.right = false
  if (e.key === "ArrowLeft" || e.key === "a") key.left = false
})

function update() {
  if (!gameAtivo) return
  if (key.right) marioX += Movimento
  if (key.left) marioX -= Movimento

  marioY += velocidadeY
  velocidadeY += gravidade
  if (marioY < 100) { marioY = 100; velocidadeY = 0 }

  for (let pipe of pipes) {
    const pipeX = pipe.offsetLeft, pipeWidth = pipe.offsetWidth, pipeHeight = pipe.offsetHeight
    const pipeTop = 100 + pipeHeight, pipeRight = pipeX + pipeWidth
    const marioRight = marioX + mario.offsetWidth, marioBottom = marioY, marioTop = marioY + mario.offsetHeight

    if (marioRight > pipeX && marioX < pipeRight) {
      if (marioBottom <= pipeTop && marioBottom >= pipeTop - 30 && velocidadeY <= 0) {
        marioY = pipeTop; velocidadeY = 0
      } else if (marioTop > 100 && marioBottom < pipeTop) {
        marioX = key.right ? pipeX - mario.offsetWidth : pipeRight
      }
    }
  }

  for (let inimigo of [...inimigos]) {
    const inimigoX = inimigo.offsetLeft, inimigoWidth = inimigo.offsetWidth, inimigoHeight = inimigo.offsetHeight
    const inimigoTop = 100 + inimigoHeight, inimigoRight = inimigoX + inimigoWidth
    const marioRight = marioX + mario.offsetWidth, marioBottom = marioY, marioTop = marioY + mario.offsetHeight

    if (marioRight > inimigoX && marioX < inimigoRight && marioTop > 100 && marioBottom < inimigoTop) {
      if (velocidadeY < 0 && inimigo.classList.contains("inimigo-pulavel")) {
        if (inimigo.classList.contains("grande-inimigo")) {
          startQuiz(inimigo)
        } else {
          inimigo.remove()
          inimigos = inimigos.filter(i => i !== inimigo)
          velocidadeY = pulo
        }
      }
    }
  }

  mario.style.left = marioX + "px"
  mario.style.bottom = marioY + "px"

  requestAnimationFrame(update)
}

function startQuiz(inimigo) {
  if (batalhaAtiva) return
  batalhaAtiva = true
  gameAtivo = false
  overlay.classList.add("show")
  quiz.style.display = "block"

  const pergunta = perguntasRestantes.shift()
  document.getElementById("question").textContent = pergunta.pergunta
  alternativasDiv.innerHTML = ""

  pergunta.alternativas.forEach(alt => {
    const btn = document.createElement("button")
    btn.textContent = alt
    btn.onclick = () => checkAnswer(alt, pergunta.respostaCorreta, inimigo)
    alternativasDiv.appendChild(btn)
  })
}

function checkAnswer(resposta, correta, inimigo) {
  if (resposta === correta) {
    inimigo.remove()
    inimigos = inimigos.filter(i => i !== inimigo)
    quiz.style.display = "none"
    overlay.classList.remove("show")
    batalhaAtiva = false
    gameAtivo = true

    
    if (inimigo.classList.contains("grande-inimigo")) {
      gameAtivo = false
      batalhaAtiva = false

      
      const mensagem = document.createElement("div")
      mensagem.className = "mensagem-vitoria"
      mensagem.innerHTML = "🏆 Você venceu!"
      document.body.appendChild(mensagem)
    }
  } else {
    alert("Resposta incorreta! Tente novamente.")
  }
}


update()
