/************ Snow ************/
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

let w, h, flakes = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

class Flake {
  constructor() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.r = Math.random() * 3 + 1;
    this.s = Math.random() * 1 + 0.5;
  }
  move() {
    this.y += this.s;
    if (this.y > h) {
      this.y = -10;
      this.x = Math.random() * w;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  }
}

for (let i = 0; i < 160; i++) flakes.push(new Flake());

function snow() {
  ctx.clearRect(0, 0, w, h);
  flakes.forEach(f => { f.move(); f.draw(); });
  requestAnimationFrame(snow);
}
snow();

/************ Tear Interaction ************/
const tearZone = document.getElementById("tearZone");
const content = document.getElementById("cardContent");

let startX = 0;
let dragging = false;
let torn = false;

function start(e) {
  if (torn) return;
  dragging = true;
  startX = e.touches ? e.touches[0].clientX : e.clientX;
}

function move(e) {
  if (!dragging || torn) return;
  const x = e.touches ? e.touches[0].clientX : e.clientX;
  if (startX - x > 60) tear();
}

function end() {
  dragging = false;
}

function tear() {
  torn = true;

  // Shake
  gsap.to(".card", {
    rotation: 1,
    duration: 0.1,
    yoyo: true,
    repeat: 3
  });

  // Tear off
  gsap.to(tearZone, {
    x: -240,
    opacity: 0,
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => {
      tearZone.remove();
      content.style.display = "flex";

      gsap.to(content, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  });
}

/* Touch + Mouse */
tearZone.addEventListener("touchstart", start, { passive: true });
tearZone.addEventListener("touchmove", move, { passive: true });
tearZone.addEventListener("touchend", end);

tearZone.addEventListener("mousedown", start);
tearZone.addEventListener("mousemove", move);
tearZone.addEventListener("mouseup", end);
