(function () {
  function init() {
    const toolbox = document.getElementById("navigator-toolbox");
    if (!toolbox) return;
    const root = document.documentElement;

    function showToolbar() {
      root.removeAttribute("zen-force-toolbar-hidden");
    }
    function hideToolbar() {
      root.setAttribute("zen-force-toolbar-hidden", "true");
    }

    window.addEventListener("mousemove", (e) => {
      if (e.clientY <= 4) showToolbar();
    });

    toolbox.addEventListener("mouseenter", showToolbar);
    toolbox.addEventListener("mouseleave", hideToolbar);

    hideToolbar();
  }

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init, { once: true });
  }
})();