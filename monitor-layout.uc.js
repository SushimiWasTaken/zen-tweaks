console.log("monitor-layout.uc.js running");
window.addEventListener("load", () => {
  function updateWindowLayout() {
    const isPortrait = window.screen.availHeight > window.screen.availWidth;
    const rightSideMenuItem = document.getElementById("zen-toolbar-context-tabs-right");
    const currentlyRightSide = document.getElementById("navigator-toolbox")?.hasAttribute("zen-right-side");

    if (isPortrait) {
      // Portrait monitor (left): maximized, windowed, sidebar on left
      if (window.fullScreen) {
        window.fullScreen = false;
      }
      if (window.windowState !== window.STATE_MAXIMIZED) {
        window.maximize();
      }
      if (currentlyRightSide && rightSideMenuItem) {
        rightSideMenuItem.click();
      }
    } else {
      // Landscape monitor (right): fullscreen, sidebar on right
      if (!window.fullScreen) {
        window.fullScreen = true;
      }
      if (!currentlyRightSide && rightSideMenuItem) {
        rightSideMenuItem.click();
      }
    }
  }

  updateWindowLayout();
  setInterval(updateWindowLayout, 1000);
}, { once: true });