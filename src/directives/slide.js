function bloatElement(el, up = true) {
  if (up) {
    el.style.cssText = "transition: all 0.1s ease;transform: scale(1.03);";
    setTimeout(() => {
      el.style.cssText = "transition: all 0.1s ease;transform: scale(1);";
    }, 100);
  } else {
    el.style.cssText = "transition: all 0.1s ease;transform: scale(0.97);";
    setTimeout(() => {
      el.style.cssText = "transition: all 0.1s ease;transform: scale(1);";
    }, 100);
  }
}

export default {
  name: "slide",
  bind(el) {
    el.original = el.childNodes[0];
    el.original.classList.add("slide-bloat");
  },
  update(el, { value, oldValue }) {
    if (value === 1 && oldValue === 0) {
      requestAnimationFrame(() => {
        el.original.style.cssText =
          "transition: none; opacity:0; transform: translateX(-200%);";
        setTimeout(() => {
          el.original.style.cssText = "transition: all 0.2s ease-out;";
          requestAnimationFrame(() => {
            el.original.style.cssText =
              "transition: all 0.2s ease-out; opacity:1; transform: translateX(0);";
          });
        }, 32);
      });
    } else if (value > oldValue) {
      //bloat original
      bloatElement(el.original);
    } else if (value < oldValue) {
      //bloat original
      bloatElement(el.original, false);
    }
  }
};
