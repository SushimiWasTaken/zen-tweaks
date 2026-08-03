console.log("tweaks.uc.js ran")
js
if (document.readyState === "complete") {
  window.fullScreen = true;
} else {
  window.addEventListener("load", () => {
    window.fullScreen = true;
  }, { once: true });
}