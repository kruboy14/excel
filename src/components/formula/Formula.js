import { ExcelComponent } from "../../core/ExcelComponent";

export class Formula extends ExcelComponent {
  static className = "excel__formula";

  toHTML() {
    return `
    <div class="formula__info">fx</div>

    <div class="formula__input" contenteditable spellcheck="false"></div>`;
  }
}
