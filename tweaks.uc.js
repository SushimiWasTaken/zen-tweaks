// tweaks.uc.js — open every Zen window in fullscreen (F11 mode)

(() => {
  const goFullscreen = () => {
    if (!window.fullScreen) window.fullScreen = true;
  };

  const run = async () => {
    // Let the window finish its own startup first.
    try { await window.delayedStartupPromise; } catch (e) {}

    // Session restore puts the window back to its saved size/position after
    // startup, which knocks it out of fullscreen. Wait for that to finish.
    try { await SessionStore.promiseAllWindowsRestored; } catch (e) {}

    goFullscreen();

    // Safety net: if anything resizes the window in the next few seconds,
    // put it back into fullscreen. After that, F11 works normally.
    const recheck = () => goFullscreen();
    window.addEventListener("sizemodechange", recheck);
    window.addEventListener("resize", recheck);
    setTimeout(() => {
      window.removeEventListener("sizemodechange", recheck);
      window.removeEventListener("resize", recheck);
      goFullscreen();
    }, 3000);
  };

  if (document.readyState === "complete") run();
  else window.addEventListener("load", run, { once: true });
})();