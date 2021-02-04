const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;


function toCell(state, row) {
  return function (_, col) {
    const id = `${row}:${col}`;
    const data = state.dataState[id];
    return `
      <div class="excel__table__cell" contenteditable data-col="${col}" data-type="cell" data-id="${id}" style="width: ${getWidth(
      state.colState,
      col
    )}">${data || ""}</div>
  `;
  };
}

function toColumn({ value, index, width }) {
  return `
  <div class="excel__table__column" data-type="resizable"  data-col="${index}" style="width: ${width}">
  ${value}
  <div class="col-resize" data-resize="col" data-col="${index}" ></div>
  </div>
  `;
}

function createRow(content, index, height) {
  const resize = index
    ? `<div class="row-resize" data-resize="row"></div>`
    : "";
  return `
  <div class="excel__table__row" data-type="resizable" data-row="${index}" style="height: ${height}">
    <div class="excel__table__info" >
    ${index ? index : ""}
    ${resize}
    </div>
    <div class="excel__table__data">${content}</div>
  </div>`;
}

function toChar(_, i) {
  return String.fromCharCode(CODES.A + i);
}

function getWidth(state = {}, index) {
  return (state[index] || DEFAULT_WIDTH) + "px";
}
function getHeight(state = {}, index) {
  return (state[index] || DEFAULT_HEIGHT) + "px";
}

function widthAdder(state) {
  return function (value, index) {
    const width = getWidth(state.colState, index) 
    return {
      value,
      index,
      width,
    };
  };
}

export function createTable(rowsCount = 20, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
    .fill("")
    .map(toChar)
    .map(widthAdder(state))
    .map(toColumn)
    .join("");

    
  rows.push(createRow(cols, undefined));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill("").map(toCell(state, i)).join("");
    const rowHeight = getHeight(state.rowState, i + 1);
    rows.push(createRow(cells, i + 1, rowHeight));
  }
  return rows.join("");
}
