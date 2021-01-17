const CODES = {
  A: 65,
  Z: 90,
};

function toCell() {
  return `
  <div class="excel__table__cell" contenteditable></div>
  `;
}

function toColumn(e) {
  return `
  <div class="excel__table__column">${e}</div>
  `;
}

function createRow(content, index) {
  return `
  <div class="excel__table__row">
    <div class="excel__table__info">${index ? index : ""}</div>
    <div class="excel__table__data">${content}</div>
  </div>`;
}

function toChar(_, i) {
  return String.fromCharCode(CODES.A + i);
}

export function createTable(rowsCount = 20) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount).fill("").map(toChar).map(toColumn).join("");
  const cells = new Array(colsCount).fill("").map(toCell).join("");

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    console.log(cells);
    rows.push(createRow(cells, i + 1));
  }
  return rows.join("");
}
