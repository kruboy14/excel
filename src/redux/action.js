import { CHANGE_TEXT, TABLE_RESIZE_COL, TABLE_RESIZE_ROW } from "./types";

export function tableResizerCOL(data) {
  return {
    type: TABLE_RESIZE_COL,
    data,
  };
}
export function tableResizerROW(data) {
  return {
    type: TABLE_RESIZE_ROW,
    data,
  };
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data,
  };
}
