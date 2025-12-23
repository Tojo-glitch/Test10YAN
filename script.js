const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

let w, h;
const flakes = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

for (let i = 0; i < 120; i++) {
  flakes.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2 + 1,
    s: Math.random() + 0.5
  });
}

function draw() {
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle = "rgba(255,255,255,.8)";
  flakes.forEach(f => {
    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ctx.fill();
    f.y += f.s;
    if (f.y > h) f.y = 0;
  });
  requestAnimationFrame(draw);
}

draw();
