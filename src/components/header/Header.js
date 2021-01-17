import { ExcelComponent } from "../../core/ExcelComponent";

export class Header extends ExcelComponent {
  static className = "excel__header";

  toHTML() {
    return `<input type="text" class="input" value="New table" />

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
