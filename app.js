/* CONFIG: your message sequence before the final result */
const sequence = [
  "Missed Call Received from Narendra Modi…",
  "Calling aliens… (2nd attempt)",
  "Calling aliens… (3rd attempt)"
];
const finalLine = "2026 me toh duniya khatam hai 💀";

const yearInput = document.getElementById("year");
const goBtn = document.getElementById("go");
const screen = document.getElementById("screen");
const hint = document.getElementById("hint");

/* Ensure input starts blank (no default value) */
yearInput.value = "";
yearInput.placeholder = "enter future years only";

/* helpers */
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function error(msg){
  hint.textContent = msg;
  screen.textContent = "";
}

function clearError(){
  hint.textContent = "";
}

async function playSequence(){
  screen.textContent = "";
  for(const msg of sequence){
    // show message with single blink (in → hold → out)
    screen.className = "screen";     // reset
    screen.textContent = msg;
    screen.classList.add("blink-once","meta");
    await sleep(1850);               // slightly more than animation length
    screen.textContent = "";         // go to blank before next item
    await sleep(200);                // tiny gap
  }

  // Final result: blink in once and stay, red & distinct
  screen.className = "screen";
  screen.textContent = finalLine;
  screen.classList.add("blink-stick","result");
}

goBtn.addEventListener("click", async () => {
  clearError();

  const yr = Number(yearInput.value.trim());
  if(!yr){
    return error("Enter a year first.");
  }
  if(yr <= 2025){
    return error("Future only. 2026 se aage daalo.");
  }

  // valid → play the fun sequence
  await playSequence();
});
