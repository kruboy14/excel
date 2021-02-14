import { CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE } from "./types";

export function rootReducer(state, action) {
  switch (action.type) {
    case TABLE_RESIZE: {
      const field = action.data.type === "col" ? "colState" : "rowState";
      return { ...state, [field]: val(state, field, action) };
    }

    case CHANGE_TEXT: {
      const field = "dataState";
      return {
        ...state,
        currentText: action.data.value,
        [field]: val(state, field, action),
      };
    }

    case CHANGE_STYLES: {
      return {...state, currentStyles: action.data}
    }
    default:
      return state;
  }
}

function val(state, field, action) {
  const val = state[field] || {};
  val[action.data.id] = action.data.value;
  return val;
}
