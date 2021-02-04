import { TABLE_RESIZE } from "./types";

export function tableResizer(data) {
  return {
    type: TABLE_RESIZE, 
    data
  }
}