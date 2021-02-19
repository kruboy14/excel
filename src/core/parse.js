const FormulaParser = require("hot-formula-parser").Parser;
const parser = new FormulaParser();

export function parse(value = "") {
  return parser.parse(value).result || value
}
