import { ExcelComponent } from "../../core/ExcelComponent";

export class Table extends ExcelComponent {
  static className = "excel__table";

  toHTML() {
    return `
    <div class="excel__table__row">
            <div class="excel__table__info">0</div>
            <div class="excel__table__data">
              <div class="excel__table__column">A</div>
              <div class="excel__table__column">B</div>
              <div class="excel__table__column">C</div>
              <div class="excel__table__column">A</div>
              <div class="excel__table__column">B</div>
              <div class="excel__table__column">C</div>
              <div class="excel__table__column">A</div>
              <div class="excel__table__column">B</div>
              <div class="excel__table__column">C</div>
              <div class="excel__table__column">A</div>
              <div class="excel__table__column">B</div>
              <div class="excel__table__column">C</div>
              <div class="excel__table__column">A</div>
              <div class="excel__table__column">B</div>
              <div class="excel__table__column">C</div>
              <div class="excel__table__column">A</div>
              <div class="excel__table__column">B</div>
              <div class="excel__table__column">C</div>
              <div class="excel__table__column">A</div>
              <div class="excel__table__column">B</div>
              <div class="excel__table__column">C</div>
              <div class="excel__table__column">A</div>
              <div class="excel__table__column">B</div>
              <div class="excel__table__column">C</div>
            </div>
          </div>
          <div class="excel__table__row">
            <div class="excel__table__info">1</div>
            <div class="excel__table__data">
              <div class="excel__table__cell selected" contenteditable="">
                cell
              </div>
              <div class="excel__table__cell" contenteditable="">fafa</div>
              <div class="excel__table__cell" contenteditable="">fafafab</div>
            </div>
          </div>
          <div class="excel__table__row">
            <div class="excel__table__info">1</div>
            <div class="excel__table__data">
              <div class="excel__table__cell">cell</div>
              <div class="excel__table__cell">fafa</div>
              <div class="excel__table__cell">fafafab</div>
            </div>
          </div>`;
  }
}
