const CODES = {
  A: 65,
  Z: 90,
};


function toCell(row) {
  return function (_, col) {
    return `
      <div class="excel__table__cell" contenteditable data-col="${col}" data-type="cell" data-id="${row}:${col}"></div>
  `;
  };
}

function toColumn(e, i) {
  return `
  <div class="excel__table__column" data-type="resizable"  data-col="${i}">
  ${e}
  <div class="col-resize" data-resize="col" data-col="${i}"></div>
  </div>
  `;
}

function createRow(content, index) {
  const resize = index
    ? `<div class="row-resize" data-resize="row"></div>`
    : "";
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

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill("").map(toCell(i)).join("");
    rows.push(createRow(cells, i + 1));
  }
  return rows.join("");
}
