export default function longpress(node, options) {
  let timer;

  function handleMousedown() {
    const { duration = 2000 } = options;
    timer = setTimeout(() => {
      node.dispatchEvent(new CustomEvent("longpress"));
    }, duration);
  }

  function handleMouseup() {
    clearTimeout(timer);
  }

  node.addEventListener("mousedown", handleMousedown);
  node.addEventListener("mouseup", handleMouseup);

  return {
    update(newOptions) {
      options = newOptions;
    },
    destroy() {
      clearTimeout(timer);
      node.removeEventListener("mousedown", handleMousedown);
      node.removeEventListener("mouseup", handleMouseup);
    },
  };
}
