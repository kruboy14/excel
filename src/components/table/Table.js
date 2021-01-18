import { $ } from "../../core/dom";
import { ExcelComponent } from "../../core/ExcelComponent";
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
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      const $parent = $resizer.closest(`[data-type="resizable"]`);
      const cords = $parent.getCords();
      const type = $resizer.data.resize;
      
      const sideProp = type === "col" ? "bottom" : "right"
      let value = null;

      $resizer.css({
        opacity: 1,
        [sideProp]: "-5000px",
      });

      document.onmousemove = (e) => {
        if (type === "col") {
          const delta = e.screenX - cords.right;
          value = cords.width + delta;
          $resizer.css({
            right: -delta + "px",
          });
        } else if (type === "row") {
          const delta = e.pageY - cords.bottom;
          value = cords.height + delta;
          console.log($parent.$el);
          $resizer.css({
            bottom: -delta + "px",
          });
        }
      };

      document.onmouseup = () => {
        if (type === "col") {
          this.$root
            .findAll(`[data-col="${$resizer.data.col}"]`)
            .forEach((elem) => (elem.style.width = value + "px"));
          $parent.css({
            width: value + "px",
          });
        } else if (type === "row") {
          $parent.css({
            height: value + "px",
          });
        }

        $resizer.css({
          opacity: 0,
          bottom: 0,
          right: 0,
        });
        document.onmouseup = null;
        document.onmousemove = null;
      };
    }
  }
}
