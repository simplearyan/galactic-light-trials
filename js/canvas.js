const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log('Width:', canvas.width, 'Height:', canvas.height);

var particleCount = 750; // Default particle count

if (canvas.width < 980) {
  particleCount = 900; // Increase particle count for mobile
}

const mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

// Event Listeners
let mouseDown = false;
addEventListener("mousedown", () => {
  mouseDown = true;
});
addEventListener("mouseup", () => {
  mouseDown = false;
});
addEventListener("touchstart", (e) => {
  mouseDown = true;
});
addEventListener("touchend", () => {
  mouseDown = false;
});

addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

// Objects
class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.shadowColor = this.color;
    c.shadowBlur = 15;
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
  }
}

// Implementation
let particles;
function init() {
  particles = [];

  for (let i = 0; i < particleCount; i++) {
    var canvasWidth = canvas.width + 300; // 900 for mobile

    if (canvas.width < 990) {
      canvasWidth = canvas.width + 900; // 300 for mobile
    }

    var canvasHeight = canvas.height + 300; // 900 for desktop

    if (canvas.width < 990) {
      canvasHeight = canvas.height + 900; // 300 for mobile
    }

    // Generate random x, y, radius, and color for each particle
    const x = Math.random() * canvasWidth - canvasWidth / 2;
    const y = Math.random() * canvasHeight - canvasHeight / 2;

    const radius = Math.random() * 2 ; // Random radius between 1 and 3

    const color = colors[Math.floor(Math.random() * colors.length)];

    // Create new particle and push it to the particles array
    particles.push(new Particle(x, y, radius, color));

  }
}

// Animation Loop
let radians = 0;
let alpha = 1;

function animate() {

  requestAnimationFrame(animate);
  c.fillStyle = `rgba(0, 2, 7, ${alpha})`; // Adjust alpha for fade effect
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.save();
  c.translate(canvas.width / 2, canvas.height / 2);
  c.rotate(radians);
  particles.forEach((particle) => {
    particle.update();
  });
  c.restore();

  // Update radians and alpha
  radians += 0.008;

  if (mouseDown && alpha >= 0.05) {
    alpha -= 0.01; // Decrease alpha when mouse is down
  } else if (!mouseDown && alpha < 1 && alpha >= 0.5) {
    alpha += 0.001; // Increase alpha when mouse is not down
  }
}

init();
animate();
