import { ExcelComponent } from "../../core/ExcelComponent";
import { resizeChecker } from "./table.functions";
import { tableResize } from "./table.resize";
import { createTable } from "./table.template";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root) {
    super($root, {
      listeners: ["mousedown"],
    });
  }

  toHTML() {
    return createTable();
  }

  onMousedown(event) {
    if (resizeChecker(event)) {
      tableResize(this.$root, event);
    }
  }
}
