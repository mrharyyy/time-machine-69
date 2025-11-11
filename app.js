(() => {
  const screen = document.getElementById("screen");
  const yearEl = document.getElementById("year");
  const goBtn = document.getElementById("go");

  // ✅ Added new "calling aliens" line (3rd message)
  function buildMessages(y){
    return [
      "Booting temporal core…",
      "Routing request to NASA Deep Space Network…",
      "Trying to contact aliens on Channel 69… 👽",        // ✅ NEW LINE
      "Secure link established.",
      `Calibrating timeline: ${y}…`,
      "Wormhole phase alignment 1/3…",
      "Wormhole phase alignment 2/3…",
      "Wormhole phase alignment 3/3… ✔",
      "Missed Call Received from Narendra Modi…",
      "Spacetime checksum failed. Searching nearest stable node…",
      "Prediction window collapsed.",
      "2026 me toh duniya khatam hai 💀|danger"
    ];
  }

  let typing = false, timer;
  const cursor = document.querySelector(".cursor");

  function typeSequence(lines){
    if(typing) return;
    typing = true;
    let i = 0;

    const setText = (text, cls) => {
      screen.innerHTML = `<span class="line ${cls||""}">${text}</span>`;
      screen.appendChild(cursor);
    };

    const typeOne = (txt, cls, cb) => {
      let pos = 0;
      const step = () => {
        setText(txt.slice(0, pos++), cls);
        if(pos <= txt.length) timer = setTimeout(step, 22);
        else cb && setTimeout(cb, 500);
      };
      step();
    };

    const erase = (cb) => {
      let text = screen.querySelector(".line").textContent;
      const cls = screen.querySelector(".line").className.replace("line","").trim();
      const step = () => {
        text = text.slice(0, -2);
        setText(text, cls);
        if(text.length > 0) timer = setTimeout(step, 12);
        else cb && setTimeout(cb, 200);
      };
      step();
    };

    const next = () => {
      if(i >= lines.length){ typing = false; return; }
      const raw = lines[i++];
      const [msg, flag] = raw.split("|");
      const cls = flag === "danger" ? "danger" : "";
      typeOne(msg, cls, () => {
        if(flag === "danger"){ typing = false; return; }
        erase(next);
      });
    };

    next();
  }

  goBtn.addEventListener("click", () => {
    clearTimeout(timer);
    typeSequence(buildMessages(String(yearEl.value || "2050")));
  });

  yearEl.addEventListener("keydown", e => { if(e.key === "Enter") goBtn.click(); });
})();
