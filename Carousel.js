export class Carousel {
  constructor(elem) {
    const scrollable = elem.querySelector(".carousel__scrollable");
    const buttons = elem.querySelector(".carousel__buttons");
    const list = elem.querySelector(".carousel__list");
    const items = list.children;
    const prev = elem.querySelector(".carousel__prev");
    const next = elem.querySelector(".carousel__next");

    // JSが実行され、ボタンが表示されるようになった
    buttons.hidden = false;

    prev.disabled = true;

    // コンテナの半分だけスクロールする
    const scrollAmount = list.offsetWidth / 2;

    prev.addEventListener("click", (e) => {
      scrollable.scrollLeft += -scrollAmount;
    });
    next.addEventListener("click", (e) => {
      scrollable.scrollLeft += scrollAmount;
    });

    function disableEnable() {
      prev.disabled = scrollable.scrollLeft < 1;
      next.disabled =
        scrollable.scrollLeft === list.scrollWidth - list.offsetWidth;
    }

    let debounced;
    scrollable.addEventListener("scroll", () => {
      window.clearTimeout(debounced);
      debounced = setTimeout(disableEnable, 200);
    });

    const observerSettings = {
      root: scrollable,
      threshold: 0.5,
    };

    const callback = (items, observer) => {
      Array.prototype.forEach.call(items, (item) => {
        if (item.intersectionRatio > 0.5) {
          item.target.removeAttribute("inert");
        } else {
          item.target.setAttribute("inert", "inert");
        }
      });
    };

    const observer = new IntersectionObserver(callback, observerSettings);
    Array.prototype.forEach.call(items, (item) => {
      observer.observe(item);
    });
  }
}
