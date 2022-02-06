const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const colorArray = [
  "#9139B4",
  "#FE3E6D",
  "#DA6D73",
  "#DCB687",
  "#42A6D8",
  "#9b111e",
  "#d8e2dc",
];

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

//delete all particles with space bar
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    particlesArray = [];
  }
});

function getRandomInt(min, max) {
  let randomInt = Math.floor(Math.random() * (max - min + 1) + min);

  if (randomInt === 0) {
    getRandomInt(min, max); //need to improve this
  } else {
    return randomInt;
  }
}

function getRandomColor(colorsArray) {
  return colorArray[Math.floor(Math.random() * colorArray.length)];
}

function getDistance(x1, y1, x2, y2) {
  const xDististance = x2 - x1;
  const yDististance = y2 - y1;

  return Math.hypot(xDististance, yDististance);
}

class Particle {
  constructor(x, y, directionX, directionY, radius, color) {
    this.x = x;
    this.y = y;
    this.directionY = directionY;
    this.directionX = directionX;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.closePath();
  }

  update() {
    let step = getRandomInt(1, 4); //random step

    if (step === 1) {
      this.y += this.directionY;
    }
    if (step === 2) {
      this.x += this.directionX;
    }
    if (step === 3) {
      this.y -= this.directionY;
    }
    if (step === 4) {
      this.x -= this.directionX;
    }

    this.draw();
  }
}

// Implementation
let particlesArray;
function init() {
  particlesArray = [];
  for (let i = 0; i < 850; i++) {
    let radius = 0.1;
    let x = getRandomInt(20, canvas.width - this.radius);
    let y = getRandomInt(0, canvas.height - this.radius);
    let directionX = getRandomInt(-3, 3);
    let directionY = getRandomInt(-3, 3);
    particlesArray.push(
      new Particle(
        x,
        y,
        directionX,
        directionY,
        radius,
        getRandomColor(colorArray)
      )
    );
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  particlesArray.forEach((ptcl) => {
    ptcl.update();
  });
}

init();
animate();
