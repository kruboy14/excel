import { $ } from "../../core/dom";
import { ExcelComponent } from "../../core/ExcelComponent";
import { isCell, matrix, nextSelector, resizeChecker } from "./table.functions";
import { tableResize } from "./table.resize";
import { createTable } from "./table.template";
import { TableSelection } from "./TableSelection";
import * as action from "../../redux/action";
import { defaultStyles } from "../../constants";

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
      this.updateTextStore(text);
    });
    this.$on("formula:enter", () => {
      this.selection.current.focus();
    });
    this.$on("toolbar:applyStyle", (value) => {
      this.selection.applyStyle(value);
      this.$dispatch(action.applyStyle({
        value,
        ids: this.selection.seceletedIds
      }))
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit("table:select", $cell);
    const styles = $cell.getStyles(Object.keys(defaultStyles));
    this.$dispatch(action.changeStyles(styles));
  }

  async resizeTable(event) {
    try {
      const data = await tableResize(this.$root, event);
      console.log(data, "2");
      if (event.target.dataset.resize === "col" || event.target.dataset.resize === "row") {
        this.$dispatch(action.tableResizer(data));
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

  updateTextStore(value) {
    this.$dispatch(
      action.changeText({
        value,
        id: this.selection.current.id(),
      })
    );
  }

  onInput(event) {
    this.updateTextStore($(event.target).text());
  }
}
