import { $ } from "../../core/dom";
import { ExcelComponent } from "../../core/ExcelComponent";
import { isCell, matrix, nextSelector, resizeChecker } from "./table.functions";
import { tableResize } from "./table.resize";
import { createTable } from "./table.template";
import { TableSelection } from "./TableSelection";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root) {
    super($root, {
      listeners: ["mousedown", "keydown"],
    });
  }

  toHTML() {
    return createTable();
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.find(`[data-id="0:0"]`);
    this.selection.select($cell);
  }

  onMousedown(event) {
    console.log(event);
    if (resizeChecker(event)) {
      tableResize(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        );
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      "ArrowDown",
      "ArrowUp",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      "Enter",
    ];
    const { key } = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const { col, row } = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, col, row));
      this.selection.select($next);
    }
  }
}
