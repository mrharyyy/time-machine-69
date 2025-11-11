'use strict';
(function(){
  // 🔧 Tweak these if you want slower/faster
  const DUR_BLINK = 1400;     // ms for each transient line (must match CSS var --blink-duration)
  const GAP_BETWEEN = 280;    // ms gap between lines
  const FINAL_IN = 1200;      // ms for final fade-in (must match CSS var --final-in)

  const screen = document.getElementById('screen');
  const goBtn = document.getElementById('go');
  const yearInput = document.getElementById('year');
  const errorEl = document.getElementById('error');

  // Sequence lines (customize freely)
  const lines = [
    'calling modi ji…',
    'calling aliens…',
    'decoding future…',
    'decrypting classified files…',
    'syncing timelines…',
    'projecting outcome…'
  ];

  // Validation: only years >= 2026 allowed
  function validateYear(raw){
    const y = parseInt(String(raw || '').trim(), 10);
    if (Number.isNaN(y)) return { ok:false, msg:'Enter a valid 4‑digit year.' };
    if (String(y).length !== 4) return { ok:false, msg:'Year must be 4 digits.' };
    if (y <= 2025) return { ok:false, msg:'Only future years ≥ 2026 are allowed.' };
    return { ok:true, year:y };
  }

  function clearScreen(){
    while (screen.firstChild) screen.removeChild(screen.firstChild);
  }

  function showTransient(text){
    return new Promise(resolve => {
      const el = document.createElement('div');
      el.className = 'line blink-once';
      el.textContent = text;
      screen.appendChild(el);
      el.addEventListener('animationend', () => {
        screen.removeChild(el); // remove after out
        setTimeout(resolve, GAP_BETWEEN);
      }, { once:true });
    });
  }

  function showFinal(text){
    const el = document.createElement('div');
    el.className = 'final final-in';
    el.textContent = text;
    screen.appendChild(el);
    return el;
  }

  async function runSequence(year){
    clearScreen();
    errorEl.textContent = '';
    goBtn.disabled = true;
    yearInput.disabled = true;

    // Play lines strictly in order
    for (const t of lines){
      await showTransient(t);
    }

    // Final result (red) stays
    showFinal('2026 me duniya khatam hai');

    // Re-enable controls after a short pause
    setTimeout(() => {
      goBtn.disabled = false;
      yearInput.disabled = false;
    }, FINAL_IN + 300);
  }

  // No default value; keep blank on load
  yearInput.value = '';

  // Submit handler
  function handleStart(){
    const v = validateYear(yearInput.value);
    if (!v.ok){
      errorEl.textContent = v.msg;
      clearScreen();
      return;
    }
    runSequence(v.year);
  }

  goBtn.addEventListener('click', handleStart);
  yearInput.addEventListener('keydown', (e)=>{
    if (e.key === 'Enter') handleStart();
  });
})();
