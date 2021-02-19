import { defaultStyles, defaultTitle } from "../constants";

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: "",
  currentStyles: defaultStyles,
  openDate: new Date().toJSON(),
};
const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: "",
});

export function normalizeInitState(state) {
  return state ? normalize(state) : JSON.parse(JSON.stringify(defaultState));
}
