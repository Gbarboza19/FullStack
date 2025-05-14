// Canvas e elementos
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");

// Imagens
const imgMario = new Image();
const imgCano = new Image();
const imgFundo = new Image();
const imgMoeda = new Image();

// Carregamento das imagens
imgMario.src = "imagens/mario.gif";
imgCano.src = "imagens/pipe.png";
imgFundo.src = "imagens/fundo.png";
imgMoeda.src = "imagens/moeda.png";

// Variáveis do jogo
let gameRunning = false;
let gravity = 0.6;
let velocity = 0;
let mario = {
    x: 50,
    y: canvas.height - 70, // Alinhar com o "chão"
    width: 48,
    height: 48,
    jumping: false
  };
  

let pipes = [];
let coins = [];
let frame = 0;
let score = 0;
let gameSpeed = 2;

// Função que inicializa o jogo
function resetGame() {
  mario.y = 300;
  velocity = 0;
  pipes = [];
  coins = [];
  frame = 0;
  score = 0;
  gameSpeed = 2;
  gameRunning = true;
  animate();
}

// Função de fundo
function drawBackground() {
  ctx.drawImage(imgFundo, 0, 0, canvas.width, canvas.height);
}

// Função para desenhar o Mario
function drawMario() {
  ctx.drawImage(imgMario, mario.x, mario.y, mario.width, mario.height);
}

// Função para desenhar os canos
function drawPipes() {
  pipes.forEach(pipe => {
    ctx.drawImage(imgCano, pipe.x, pipe.y, pipe.width, pipe.height);
  });
}

// Função para desenhar as moedas
function drawCoins() {
  coins.forEach(coin => {
    ctx.drawImage(imgMoeda, coin.x - 10, coin.y - 10, 20, 20);
  });
}

// Função para gerar canos
function spawnPipe() {
    const height = 30 + Math.random() * 100;
    pipes.push({
      x: canvas.width,
      y: canvas.height - height - 25, // Subtrai a altura da grama
      width: 40,
      height: height
    });
  }
  

// Função para gerar moedas
function spawnCoin() {
  coins.push({
    x: canvas.width,
    y: 200 + Math.random() * 100,
    radius: 8
  });
}

// Função para detectar colisão
function detectCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

// Função de animação do jogo
function animate() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  frame++;

  if (frame % 90 === 0) spawnPipe();
  if (frame % 150 === 0) spawnCoin();

  velocity += gravity;
  mario.y += velocity;
  if (mario.y + mario.height > canvas.height - 25) {
    mario.y = canvas.height - mario.height - 25;
    velocity = 0;
    mario.jumping = false;
  }
  

  pipes.forEach(pipe => pipe.x -= gameSpeed);
  pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);

  coins.forEach(coin => coin.x -= gameSpeed);
  coins = coins.filter(coin => coin.x + coin.radius > 0);

  for (let pipe of pipes) {
    if (detectCollision(mario, pipe)) {
      gameRunning = false;
      alert("Game Over! Pontuação: " + score);
      return;
    }
  }

  coins.forEach((coin, index) => {
    if (
      mario.x < coin.x + coin.radius &&
      mario.x + mario.width > coin.x - coin.radius &&
      mario.y < coin.y + coin.radius &&
      mario.y + mario.height > coin.y - coin.radius
    ) {
      score++;
      coins.splice(index, 1);
    }
  });

  if (frame % 300 === 0) gameSpeed += 0.2;

  drawMario();
  drawPipes();
  drawCoins();

  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Pontuação: " + score, 10, 25);

  requestAnimationFrame(animate);
}

// Evento de pulo
document.addEventListener("keydown", e => {
  if (e.code === "Space" && !mario.jumping) {
    velocity = -10;
    mario.jumping = true;
  }
});

// Início do jogo
startBtn.addEventListener("click", () => {
  resetGame();
});

// Esperar todas as imagens carregarem antes de iniciar o jogo
function checkImagesLoaded() {
  return new Promise(resolve => {
    let imagesLoaded = 0;
    const totalImages = 4;

    const imageLoadHandler = () => {
      imagesLoaded++;
      if (imagesLoaded === totalImages) {
        resolve();
      }
    };

    imgMario.onload = imageLoadHandler;
    imgCano.onload = imageLoadHandler;
    imgFundo.onload = imageLoadHandler;
    imgMoeda.onload = imageLoadHandler;
  });
}

// Carregar imagens e iniciar o jogo
checkImagesLoaded().then(() => {
  console.log("Imagens carregadas. O jogo pode ser iniciado.");
  startBtn.style.display = "block"; // Mostrar botão para iniciar o jogo
});
