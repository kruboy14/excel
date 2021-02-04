import { TABLE_RESIZE_COL, TABLE_RESIZE_ROW } from "./types";

export function tableResizerCOL(data) {
  return {
    type: TABLE_RESIZE_COL, 
    data
  }
}
export function tableResizerROW(data) {
  return {
    type: TABLE_RESIZE_ROW, 
    data
  }
}