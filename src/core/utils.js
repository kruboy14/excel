export function capitalize(string = "") {
  if (typeof string !== "string") {
    return "";
  }
  return string.charAt(0).toUpperCase().concat(string.slice(1));
}

export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data))
}
