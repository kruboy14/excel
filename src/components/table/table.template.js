const CODES = {
  A: 65,
  Z: 90,
};

function toCell(_, i) {
  return `
  <div class="excel__table__cell" contenteditable data-col="${i}"></div>
  `;
}

function toColumn(e, i) {
  return `
  <div class="excel__table__column" data-type="resizable" >
  ${e}
  <div class="col-resize" data-resize="col" data-col="${i}"></div>
  </div>
  `;
}

function createRow(content, index) {
  const resize = index ? `<div class="row-resize" data-resize="row"></div>` : "";
  return `
  <div class="excel__table__row" data-type="resizable">
    <div class="excel__table__info">
    ${index ? index : ""}
    ${resize}
    </div>
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
    rows.push(createRow(cells, i + 1));
  }
  return rows.join("");
}


