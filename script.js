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
    if (this.y > h) this.y = -10;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  }
}

for (let i = 0; i < 180; i++) flakes.push(new Flake());

function snow() {
  ctx.clearRect(0,0,w,h);
  flakes.forEach(f => { f.move(); f.draw(); });
  requestAnimationFrame(snow);
}
snow();

/************ Tear animation ************/
let startX = 0;
const tearZone = document.getElementById("tearZone");
const content = document.getElementById("cardContent");

tearZone.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

tearZone.addEventListener("touchmove", e => {
  const diff = startX - e.touches[0].clientX;
  if (diff > 60) tear();
}, { once: true });

function tear() {
  gsap.to(".card", {
    rotation: 1,
    duration: 0.1,
    yoyo: true,
    repeat: 3
  });

  gsap.to(tearZone, {
    x: -220,
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
