const puppeteer = require("puppeteer-core");

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 780 });
  await page.goto("http://localhost:5188/", { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 2500));

  await page.evaluate(() => {
    const s = document.createElement("style");
    s.textContent = "html,body{scroll-behavior:auto!important}";
    document.head.appendChild(s);
  });

  const snap = () =>
    page.evaluate(() => {
      const stage = () => document.querySelector("[data-workflow-wash]")?.parentElement;
      const track = () => {
        const s = stage();
        if (!s) return null;
        return [...s.querySelectorAll("div")].find(
          (e) => e.classList.contains("w-max") && e.querySelector("article"),
        );
      };
      const st = stage();
      const tr = track();
      return {
        y: Math.round(window.scrollY),
        stageTop: Math.round(st?.getBoundingClientRect().top ?? NaN),
        trackX: tr ? getComputedStyle(tr).transform : "n/a",
      };
    });

  const site = await page.evaluate(() => {
    const stage = () => document.querySelector("[data-workflow-wash]")?.parentElement;
    const topSect = stage()?.parentElement;
    const topAbs = topSect?.getBoundingClientRect().top + window.scrollY ?? 0;
    const vh = window.innerHeight;
    return {
      startY: Math.max(0, topAbs - 92),
      endY: Math.max(0, topAbs + (topSect?.offsetHeight ?? 0) - vh),
    };
  });

  const client = await page.target().createCDPSession();
  const out = { ...site, items: [] };

  await page.evaluate((y) => window.scrollTo(0, y), site.startY);
  await new Promise((r) => setTimeout(r, 400));
  out.items.push({ method: "scrollTo-start", ...(await snap()) });

  for (let i = 0; i < 12; i++) {
    await client.send("Input.dispatchMouseEvent", {
      type: "mouseWheel",
      x: 720,
      y: 500,
      deltaX: 0,
      deltaY: 1000,
    });
    await new Promise((r) => setTimeout(r, 130));
    out.items.push({ method: `wheel#${i + 1}`, ...(await snap()) });
  }

  console.log(JSON.stringify(out, null, 1));
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});