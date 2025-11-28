import confettiLib from "canvas-confetti";

export function runConfetti() {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "200000";

  document.body.appendChild(canvas);

  const c = confettiLib.create(canvas, { resize: true });

  c({
    particleCount: 105,
    spread: 800,
    startVelocity: 35,
    scalar: 1,
    origin: { y: 0.6 },
  });

  setTimeout(() => canvas.remove(), 1200);
}
