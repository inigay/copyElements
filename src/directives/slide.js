function bloatElement(el, up = true) {
  if (up) {
    el.style.cssText = "transition: all 0.2s ease;transform: scale(1.05);";
    setTimeout(() => {
      el.style.cssText = "transition: all 0.2s ease;transform: scale(1);";
    }, 100);
  } else {
    el.style.cssText = "transition: all 0.2s ease;transform: scale(0.95);";
    setTimeout(() => {
      el.style.cssText = "transition: all 0.2s ease;transform: scale(1);";
    }, 100);
  }
}

export default {
  name: "slide",
  bind(el) {
    const copy = el.childNodes[0].cloneNode(true);
    copy.classList.add("shallow");
    el.appendChild(copy);
    el.shallowEl = copy;
    el.original = el.childNodes[0];
    el.original.classList.add("slide-bloat");
  },
  update(el, { value, oldValue }) {
    if (value === 1 && oldValue === 0) {
      requestAnimationFrame(() => {
        el.original.style.cssText =
          "transition: none; opacity:0; transform: translateX(-200%);";
        requestAnimationFrame(() => {
          el.original.style.cssText = "transition: all 0.1s ease-out;";
          requestAnimationFrame(() => {
            el.original.style.cssText =
              "transition: all 0.1s ease-out; opacity:1; transform: translateX(0);";
          });
        });
      });
    } else if (value > oldValue) {
      if (el.shallowEl) {
        //bloat original
        bloatElement(el.original);
        //place at start left-50% opacity 0.5 right away
        el.shallowEl.style.cssText =
          "transition: none; opacity:0; transform: translateX(-200%);";

        requestAnimationFrame(() => {
          el.shallowEl.style.transition = "transition: all 0.2s ease;";
          requestAnimationFrame(() => {
            el.shallowEl.style.cssText =
              "transition: all 0.1s ease-in; opacity:0.75; transform: translateX(0);";
          });
        });
      }
    } else if (value < oldValue) {
      //bloat original
      bloatElement(el.original, false);
      el.shallowEl.style.cssText =
        "transition: all 0.1s ease-out; opacity:0.5; transform: translateX(-200%);";
      setTimeout(() => {
        el.shallowEl.style.cssText = "transition: none;";
        requestAnimationFrame(() => {
          el.shallowEl.style.cssText = "transition: none;opacity: 0;";
        });
      }, 100);
    }
  }
};
