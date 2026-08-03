window.addEventListener("load", () => {
  function updateWindowLayout() {
    const isOnLeftMonitor = window.screenX < window.screen.availLeft + window.screen.availWidth / 2;
    const rightSideMenuItem = document.getElementById("zen-toolbar-context-tabs-right");
    const currentlyRightSide = document.documentElement.hasAttribute("zen-right-side")
      || document.getElementById("navigator-toolbox")?.hasAttribute("zen-right-side");

    if (isOnLeftMonitor) {
      // Left monitor: maximized, windowed, sidebar on left
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
      // Right monitor: fullscreen, sidebar on right
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