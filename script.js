const card = document.getElementById("card");

let isDown = false;
let startX, startY;
let rotX = -10;
let rotY = 20;

function updateRotation() {
  card.style.transform =
    `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
}

updateRotation();

/* Mouse */
card.addEventListener("mousedown", e => {
  isDown = true;
  startX = e.clientX;
  startY = e.clientY;
});

window.addEventListener("mouseup", () => isDown = false);

window.addEventListener("mousemove", e => {
  if (!isDown) return;
  rotY += (e.clientX - startX) * 0.3;
  rotX -= (e.clientY - startY) * 0.3;
  startX = e.clientX;
  startY = e.clientY;
  updateRotation();
});

/* Touch (mobile) */
card.addEventListener("touchstart", e => {
  isDown = true;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

card.addEventListener("touchend", () => isDown = false);

card.addEventListener("touchmove", e => {
  if (!isDown) return;
  rotY += (e.touches[0].clientX - startX) * 0.3;
  rotX -= (e.touches[0].clientY - startY) * 0.3;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  updateRotation();
});
