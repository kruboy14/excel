import { CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE, APPLY_STYLE, ADD_HEADER, UPDATE_DATE } from "./types";

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
      return { ...state, currentStyles: action.data };
    }

    case APPLY_STYLE: {
      const field = "stylesState";
      const value = state[field] || {};
      action.data.ids.forEach((id) => {
        value[id] = { ...value[id], ...action.data.value };
      });
      return {
        ...state,
        [field]: value,
        currentStyles: { ...state.currentStyles, ...action.data.value },
      };
    }

    case ADD_HEADER: {
      return {...state, title: action.data}
    }

    case UPDATE_DATE: {
      return {...state, openDate: new Date().toJSON()}
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
