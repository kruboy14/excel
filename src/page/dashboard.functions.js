export function toHtml() {
  return `
  <li class="db__record">
              <a href="#">Table nubmer 1</a>
              <strong>12.12.1212</strong>
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
