import { defaultTitle } from "../../constants";
import { $ } from "../../core/dom";
import { ExcelComponent } from "../../core/ExcelComponent";
import { ActiveRoute } from "../../core/routes/ActiveRoute";
import { debounce } from "../../core/utils";
import * as action from "../../redux/action";

export class Header extends ExcelComponent {
  static className = "excel__header";

  constructor($root, options) {
    super($root, {
      name: "Header",
      listeners: ["input", "click"],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(action.addTitle($target.text()));
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.button === "exit") {
      ActiveRoute.navigate("");
    } else if ($target.data.button === "delete") {
      const decision = confirm("do you want to delete this table");
      if (decision) {
        localStorage.removeItem("excel:" + ActiveRoute.param);
        ActiveRoute.navigate("");
      }
    }
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `<input type="text" class="input" value="${title}" />

    <div>
      <div class="excel__header__buttons" data-button="delete">
        <span class="material-icons " data-button="delete"> delete </span>
      </div>
      <div class="excel__header__buttons" data-button="exit">
        <span class="material-icons " data-button="exit"> exit_to_app </span>
      </div>
    </div>`;
  }
}
