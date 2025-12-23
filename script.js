const tearZone = document.getElementById("tearZone");
const sound = document.getElementById("tearSound");

let startX = 0;
let torn = false;

function start(e) {
  if (torn) return;
  startX = e.touches ? e.touches[0].clientX : e.clientX;
}

function move(e) {
  if (torn) return;
  const x = e.touches ? e.touches[0].clientX : e.clientX;
  if (startX - x > 70) tear();
}

function tear() {
  torn = true;
  sound.play();
  if (navigator.vibrate) navigator.vibrate([40, 30, 60]);

  tearZone.style.transition = "transform .6s ease";
  tearZone.style.transform = "translateX(-120px) rotate(-8deg)";
}

tearZone.addEventListener("touchstart", start);
tearZone.addEventListener("touchmove", move);
tearZone.addEventListener("mousedown", start);
tearZone.addEventListener("mousemove", move);

/* SNOW */
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");
let w, h, snow = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

for (let i = 0; i < 120; i++) {
  snow.push({
    x: Math.random() * w,
    y: Math.random() * h,
    z: Math.random() * 1 + .3,
    r: Math.random() * 2 + 1
  });
}

(function draw() {
  ctx.clearRect(0,0,w,h);
  snow.forEach(s => {
    s.y += s.z * 1.1;
    if (s.y > h) s.y = -5;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r * s.z, 0, Math.PI*2);
    ctx.fillStyle = "rgba(255,255,255,.8)";
    ctx.fill();
  });
  requestAnimationFrame(draw);
})();
