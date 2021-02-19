
import { storage } from "../core/utils";

export function toHtml(key) {
  const model = storage(key);
  const id = key.split(":")[1];
  return `
  <li class="db__record">
              <a href="#excel/${id}">${model.title}</a>
              <strong>${new Date(model.openDate).toLocaleDateString()}
                      ${new Date(model.openDate).toLocaleTimeString()}
              </strong>
            </li>
            
  `;
}

function getAllKeys() {
  const keys = [];
  for (let index = 0; index < localStorage.length; index++) {
    const key = localStorage.key(index);
    if (!key.includes("excel")) {
      continue;
    } else {
      keys.push(key);
    }
  }
  return keys;
}

export function recordsTable() {
  const keys = getAllKeys();

  if (!keys.length) {
    return `<p>Your tables not found</p>`;
  }
  return `
  
          <div class="db__list-header">
            <span>Name</span>
            <span>Date</span>
          </div>

          <ul class="db__list">
          ${keys.map(toHtml).join("")}
          </ul> 
  `;
}
