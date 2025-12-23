const pass = document.querySelector(".pass");
let rect, cx, cy;

function move(e) {
  const x = e.touches ? e.touches[0].clientX : e.clientX;
  const y = e.touches ? e.touches[0].clientY : e.clientY;

  const dx = (x - cx) / rect.width;
  const dy = (y - cy) / rect.height;

  pass.style.transform =
    `rotateX(${-dy * 6}deg) rotateY(${dx * 8}deg)`;
}

function reset() {
  pass.style.transform = "rotateX(0) rotateY(0)";
}

pass.addEventListener("mouseenter", () => {
  rect = pass.getBoundingClientRect();
  cx = rect.left + rect.width / 2;
  cy = rect.top + rect.height / 2;
});

pass.addEventListener("mousemove", move);
pass.addEventListener("mouseleave", reset);

pass.addEventListener("touchstart", () => {
  rect = pass.getBoundingClientRect();
  cx = rect.left + rect.width / 2;
  cy = rect.top + rect.height / 2;
});
/* === TEAR EFFECT (NO DISAPPEAR) === */
const stub = document.querySelector(".pass-right");

let torn = false;

stub.addEventListener("click", () => {
  if (torn) return;
  torn = true;

  stub.style.transition = "transform 0.3s ease";
  stub.style.transform = "translateX(12px) rotate(1deg)";
});

pass.addEventListener("touchmove", move);
pass.addEventListener("touchend", reset);

