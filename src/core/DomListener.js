import { capitalize } from "./utils";

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`no $root provided for DOM`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListener() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      this.$root.on(listener, this[method]);
    });
  }
  removeDOMListener() {}
}

function getMethodName(eventName) {
  return "on" + capitalize(eventName);
}
