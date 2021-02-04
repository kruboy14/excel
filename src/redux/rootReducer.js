import { CHANGE_TEXT, TABLE_RESIZE_COL, TABLE_RESIZE_ROW } from "./types";

export function rootReducer(state, action) {
  switch (action.type) {
    case TABLE_RESIZE_COL: {
      const prevState = state.colState || {};
      prevState[action.data.id] = action.data.value;
      return {
        ...state,
        colState: prevState,
      };
    }
    case TABLE_RESIZE_ROW: {
      const prevState = state.rowState || {};
      prevState[action.data.id] = action.data.value;
      return {
        ...state,
        rowState: prevState,
      };
    }

    case CHANGE_TEXT: {
      const prevState = state["dataState"] || {};
      prevState[action.data.id] = action.data.value;
      return {...state, currentText: action.data.value, dataState: prevState}
    }

    default:
      return state;
  }
}
