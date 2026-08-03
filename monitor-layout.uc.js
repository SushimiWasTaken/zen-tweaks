window.addEventListener("load", () => {
  function updateWindowLayout() {
    const isPortrait = window.screen.availHeight > window.screen.availWidth;
    const rightSideMenuItem = document.getElementById("zen-toolbar-context-tabs-right");
    const currentlyRightSide =
      document.getElementById("navigator-toolbox")?.getAttribute("zen-right-side") === "true";

    console.log("layout check — portrait:", isPortrait, "rightSide:", currentlyRightSide, "menuItem:", !!rightSideMenuItem);

    if (isPortrait) {
      if (window.fullScreen) window.fullScreen = false;
      if (window.windowState !== window.STATE_MAXIMIZED) window.maximize();
      if (currentlyRightSide && rightSideMenuItem) rightSideMenuItem.click();
    } else {
      if (!window.fullScreen) window.fullScreen = true;
      if (!currentlyRightSide && rightSideMenuItem) rightSideMenuItem.click();
    }
  }

  updateWindowLayout();
  setInterval(updateWindowLayout, 1000);
}, { once: true });