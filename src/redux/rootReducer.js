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
    // case TABLE_RESIZE: {
    //   field = action.data.type === "col" ? "colState" :
    // }

    case CHANGE_TEXT: {
      const field = "dataState"; 
      const prevState = state[field] || {};
      prevState[action.data.id] = action.data.value;
      return {...state, currentText: action.data.value, [field]: prevState}
    }

    default:
      return state;
  }
}

// function val(state, field, action) {
//   const val = state[field] || {};
//   val[action.data.id] = action.data.value;
//   return val;
  
// }