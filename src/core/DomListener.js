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
      if (!this[method]) {
        throw new Error(
          `Method ${method} is not implenented in ${this.name} component`
        );
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }
  removeDOMListener() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      this.$root.off(listener, this[method]);
    });
  }
}

function getMethodName(eventName) {
  return "on" + capitalize(eventName);
}
