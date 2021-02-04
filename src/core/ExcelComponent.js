import { DomListener } from "@core/DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || "";
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store;
    this.unsubcribers = [];
    this.storeSub = null;

    this.prepare();
  }

  prepare() {}

  toHTML() {
    return "";
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubcribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  storeChanged() {}

  isWatching(key) { 
    return this.subscribe.includes(key);
  }

  init() {
    this.initDOMListener();
  }

  destroy() {
    this.removeDOMListener();
    this.unsubcribers.forEach((unsub) => unsub());
  }
}
