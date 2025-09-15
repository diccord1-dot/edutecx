const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const restartContainer = document.querySelector('.restart-container');

// Faz o Mario pular
document.addEventListener('keydown', jump);

function jump() {
  if (!mario.classList.contains('jump')) {
    mario.classList.add('jump');
    setTimeout(() => {
      mario.classList.remove('jump');
    }, 500);
  }
}

// Verifica colisão
const checkCollision = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioBottom = parseInt(window.getComputedStyle(mario).bottom);

  if (pipePosition < 120 && pipePosition > 0 && marioBottom < 80) {
    // Parar animações
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioBottom}px`;

    mario.src = 'https://i.imgur.com/jz5sNYu.png'; // Mario morto
    mario.style.width = '75px';

    clearInterval(checkCollision);

    // Mostrar botão de recomeçar
    restartContainer.style.display = 'block';
  }
}, 10);

// Função para reiniciar a página
function restartGame() {
  location.reload();
}
