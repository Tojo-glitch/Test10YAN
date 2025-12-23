/************ 3D Snow ************/
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
    this.reset();
    this.y = Math.random() * h;
  }
  reset() {
    this.x = Math.random() * w;
    this.y = -20;
    this.z = Math.random() * 0.8 + 0.2; // depth
    this.r = this.z * 4;
    this.speed = this.z * 1.5;
  }
  update() {
    this.y += this.speed;
    if (this.y > h) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${this.z})`;
    ctx.shadowBlur = 10 * this.z;
    ctx.shadowColor = "white";
    ctx.fill();
  }
}

for (let i = 0; i < 180; i++) flakes.push(new Flake());

function snow() {
  ctx.clearRect(0,0,w,h);
  flakes.forEach(f => { f.update(); f.draw(); });
  requestAnimationFrame(snow);
}
snow();

/************ Tear Interaction ************/
const tearZone = document.getElementById("tearZone");
const content = document.getElementById("cardContent");
const sound = document.getElementById("tearSound");

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

  // vibration
  if (navigator.vibrate) navigator.vibrate([30, 40, 30]);

  // sound
  sound.currentTime = 0;
  sound.play();

  // shake
  gsap.to(".card", {
    rotation: 1,
    duration: 0.1,
    yoyo: true,
    repeat: 3
  });

  // tear off
  gsap.to(tearZone, {
    x: -260,
    opacity: 0,
    duration: 0.6,
    ease: "power2.in",
    onComplete: () => {
      tearZone.remove();
      content.style.display = "flex";
      gsap.to(content, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      });
    }
  });
}

tearZone.addEventListener("touchstart", start, { passive: true });
tearZone.addEventListener("touchmove", move, { passive: true });
tearZone.addEventListener("touchend", end);

tearZone.addEventListener("mousedown", start);
tearZone.addEventListener("mousemove", move);
tearZone.addEventListener("mouseup", end);
