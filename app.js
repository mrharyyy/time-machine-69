const screen = document.getElementById("screen");
const goBtn = document.getElementById("go");
const yearInput = document.getElementById("year");

// Messages sequence (kept exactly like you asked, including aliens & the final line)
function buildSequence(y) {
  const yr = y?.trim();
  const target = yr ? yr : "future";
  return [
    `Dialing ${target}...`,
    `Missed call received from Narendra Modi...`,
    `Calling aliens... (2nd attempt)`,
    `Calling aliens... (3rd attempt)`,
    `Establishing secure link to NASA...`,
    `Decrypting future logs...`,
    `2026 me toh duniya khatam hai 💀`
  ];
}

// Typewriter with controllable speed (slower & readable)
function typeLine(text, { charSpeed = 60 } = {}) {
  return new Promise(resolve => {
    screen.innerHTML = `<span class="type fade-in"></span>`;
    const el = screen.querySelector(".type");
    let i = 0;
    const timer = setInterval(() => {
      el.textContent = text.slice(0, i++);
      if (i > text.length) {
        clearInterval(timer);
        resolve();
      }
    }, charSpeed);
  });
}

// Blink the whole line a few times before switching to next
function blinkLine() {
  return new Promise(r => {
    screen.classList.add("blink");
    setTimeout(() => {
      screen.classList.remove("blink");
      r();
    }, 260 * 5 + 60); // match CSS blink cycles
  });
}

async function runSequence() {
  const val = yearInput.value;
  if (!val) {
    yearInput.classList.add("shake");
    setTimeout(() => yearInput.classList.remove("shake"), 400);
    // still run for fun even if blank
  }

  goBtn.disabled = true;
  yearInput.disabled = true;

  const lines = buildSequence(val);

  // pacing controls (tweak if you want slower/faster)
  const charSpeed = 60;        // ms per character (higher = slower)
  const holdAfterType = 650;   // pause after a line finishes

  for (const line of lines) {
    await typeLine(line, { charSpeed });
    await new Promise(r => setTimeout(r, holdAfterType));
    await blinkLine();
  }

  goBtn.disabled = false;
  yearInput.disabled = false;
}

goBtn.addEventListener("click", runSequence);

// Optional: enter key triggers
yearInput.addEventListener("keydown", e => {
  if (e.key === "Enter") runSequence();
});
