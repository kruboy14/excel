export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`no $root provided for DOM`);
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListener() {

  }
  removeDOMListener() {}
}
