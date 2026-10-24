// ==UserScript==
// @name           Autoscroll ignores wheel
// @description    Mouse wheel no longer cancels middle-click autoscroll (Chromium behaviour)
// ==/UserScript==

(function () {
  const isAutoscrolling = () => {
    const state = document.getElementById("autoscroller")?.state;
    return state === "open" || state === "showing";
  };

  // The autoscroller panel is created with rolluponmousewheel="true", which
  // makes the popup widget close it on the first wheel tick outside the anchor
  // circle, before any JS or the cooldown pref gets a look in. With "false",
  // the widget swallows the tick instead and autoscroll carries on.
  function onPopupShowing(e) {
    if (e.target.id === "autoscroller") {
      e.target.setAttribute("rolluponmousewheel", "false");
    }
  }

  // A tick while the pointer is still over the anchor circle reaches chrome as
  // DOMMouseScroll, and the <browser> handler cancels autoscroll once its
  // cooldown has passed. That handler is only added when autoscroll starts, so
  // this one (added at load) runs first on the same target and eats the event.
  function onWheel(e) {
    if (!isAutoscrolling()) return;
    e.preventDefault();
    e.stopImmediatePropagation();
  }

  function init() {
    document.getElementById("autoscroller")
      ?.setAttribute("rolluponmousewheel", "false");
    window.addEventListener("popupshowing", onPopupShowing, true);
    window.addEventListener("DOMMouseScroll", onWheel, true);

    window.addEventListener("unload", () => {
      window.removeEventListener("popupshowing", onPopupShowing, true);
      window.removeEventListener("DOMMouseScroll", onWheel, true);
    }, { once: true });
  }

  if (document.readyState === "complete") init();
  else window.addEventListener("load", init, { once: true });
})();
