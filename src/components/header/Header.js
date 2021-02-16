import { defaultTitle } from "../../constants";
import { $ } from "../../core/dom";
import { ExcelComponent } from "../../core/ExcelComponent";
import * as action from "../../redux/action";

export class Header extends ExcelComponent {
  static className = "excel__header";

  constructor($root, options) {
    super($root, {
      name: "Header",
      listeners: ["input"],
      ...options,
    });
  }


  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(action.addTitle($target.text()));
  }

  onKeydown(event) {
    const keys = ["Enter", "Tab"];
    if (keys.includes(event.key)) {
      event.preventDefault();
      const $target = $(event.target);
      this.$dispatch(action.addTitle($target.text()));
    }
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `<input type="text" class="input" value="${title}" />

    <div>
      <div class="excel__header__buttons">
        <span class="material-icons"> delete </span>
      </div>
      <div class="excel__header__buttons">
        <span class="material-icons"> exit_to_app </span>
      </div>
    </div>`;
  }
}
