import { $ } from "../../core/dom";
import { ExcelComponent } from "../../core/ExcelComponent";
import { isCell, matrix, nextSelector, resizeChecker } from "./table.functions";
import { tableResize } from "./table.resize";
import { createTable } from "./table.template";
import { TableSelection } from "./TableSelection";
import * as action from "../../redux/action";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root, options) {
    super($root, {
      name: "Table",
      listeners: ["mousedown", "keydown", "input"],
      ...options,
    });
  }

  toHTML() {
    return createTable(20, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $cell = this.$root.find(`[data-id="0:0"]`);
    this.selectCell($cell);

    this.$on("formula:input", (text) => {
      this.selection.current.text(text);
    });
    this.$on("formula:enter", () => {
      this.selection.current.focus();
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit("table:select", $cell);
  }

  async resizeTable(event) {
    try {
      const data = await tableResize(this.$root, event);
      if (event.target.dataset.resize === "col") {
        this.$dispatch(action.tableResizerCOL(data));
      } else if (event.target.dataset.resize === "row") {
        this.$dispatch(action.tableResizerROW(data));
      }
    } catch (error) {
      console.warn("resize error", error);
    }
  }

  onMousedown(event) {
    if (resizeChecker(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        );
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
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
      this.selectCell($next);
    }
  }

  onInput(event) {
    // this.$emit("table:input", $(event.target));
    this.$dispatch(
      action.changeText({
        value: $(event.target).text(),
        id: this.selection.current.id()
      })
    );
  }
}
