let startY = 0;
const tear = document.getElementById("tear");
const content = document.getElementById("content");

tear.addEventListener("touchstart", e => {
  startY = e.touches[0].clientY;
});

tear.addEventListener("touchmove", e => {
  let diff = startY - e.touches[0].clientY;

  if (diff > 80) { // ปัดขึ้นเกิน 80px
    tear.style.display = "none";
    content.style.display = "block";
  }
});
