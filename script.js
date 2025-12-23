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

pass.addEventListener("touchmove", move);
pass.addEventListener("touchend", reset);
