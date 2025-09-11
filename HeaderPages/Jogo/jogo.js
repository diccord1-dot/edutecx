const dadosDoQuiz = [
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

let perguntaAtual = 0;
let pontuacao = 0;
let opcaoSelecionada = "";

const elementoPergunta = document.getElementById("pergunta");
const elementoAlternativas = document.getElementById("alternativas");
const elementoResultado = document.getElementById("resultado");
const botaoProxima = document.querySelector(".btn");

const botaoReiniciar = document.createElement("button");
botaoReiniciar.textContent = "Recomeçar";
botaoReiniciar.classList.add("reiniciar-btn");
botaoReiniciar.onclick = reiniciarQuiz;
botaoReiniciar.style.display = "none";
document.querySelector(".quiz-container").appendChild(botaoReiniciar);

const botaoComecar = document.createElement("button");
botaoComecar.textContent = "Começar Quiz";
botaoComecar.classList.add("começar-btn");
botaoComecar.onclick = comecarQuiz;
document.querySelector(".quiz-container").appendChild(botaoComecar);

elementoPergunta.style.display = "none";
elementoAlternativas.style.display = "none";
botaoProxima.style.display = "none";

function carregarPergunta() {
  const p = dadosDoQuiz[perguntaAtual];
  elementoPergunta.textContent = p.pergunta;
  elementoAlternativas.innerHTML = "";
  p.alternativas.forEach(alternativa => {
    const btn = document.createElement("div");
    btn.textContent = alternativa;
    btn.classList.add("alternativa");
    btn.onclick = () => selecionarAlternativa(alternativa, btn);
    elementoAlternativas.appendChild(btn);
  });
}

function selecionarAlternativa(alternativa, elemento) {
  opcaoSelecionada = alternativa;
  document.querySelectorAll(".alternativa").forEach(btn => btn.style.background = "#e9f5ec");
  elemento.style.background = "#b3d9ff";
}

function proximaPergunta() {
  if (!opcaoSelecionada) {
    alert("Escolha uma opção!");
    return;
  }
  const respostaCorreta = dadosDoQuiz[perguntaAtual].respostaCorreta;
  const botoesAlternativa = document.querySelectorAll(".alternativa");
  botoesAlternativa.forEach(btn => {
    if (btn.textContent === respostaCorreta) {
      btn.style.background = "#8BC34A"; // verde se for correta
      btn.style.color = "#fff";
    } else if (btn.textContent === opcaoSelecionada) {
      btn.style.background = "#F44336"; // vermelho se errada
      btn.style.color = "#fff";
    }
    btn.style.pointerEvents = "none"; // desabilita o clique após resposta
  });
  if (opcaoSelecionada === respostaCorreta) {
    pontuacao++; // aumenta a pontuação se a resposta estiver certa
  }
  setTimeout(() => {
    opcaoSelecionada = "";
    perguntaAtual++;
    if (perguntaAtual < dadosDoQuiz.length) {
      carregarPergunta(); // carrega a próxima pergunta
    } else {
      exibirResultado(); // exibe o resultado final
    }
  }, 1500); // delay para mostrar as cores antes de seguir
}

function exibirResultado() {
  elementoPergunta.style.display = "none";
  elementoAlternativas.style.display = "none";
  botaoProxima.style.display = "none";
  elementoResultado.textContent = `Você acertou ${pontuacao} de ${dadosDoQuiz.length} perguntas! 🌱`;
  botaoReiniciar.style.display = "inline-block";
}

function reiniciarQuiz() {
  perguntaAtual = 0;
  pontuacao = 0;
  opcaoSelecionada = "";
  elementoResultado.textContent = "";
  botaoReiniciar.style.display = "none";
  botaoComecar.style.display = "inline-block";
}

function comecarQuiz() {
  botaoComecar.style.display = "none";
  elementoPergunta.style.display = "block";
  elementoAlternativas.style.display = "block";
  botaoProxima.style.display = "inline-block";
  elementoResultado.textContent = "";
  carregarPergunta();
}
