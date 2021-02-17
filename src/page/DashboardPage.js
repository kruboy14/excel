import { $ } from "../core/dom";
import { Page } from "../core/Page";

export class DashboardPage extends Page {
  getRoot() {
    return $.create("div", "db").html(`
    <div class="db__header">
          <h1>Dashboard</h1>
        </div>
        <div class="db__new">
          <div class="db__view">
            <a href="#" class="db__create">
              New <br />
              table
            </a>
          </div>
        </div>
        <div class="db__table db__view">
          <div class="db__list-header">
            <span>Name</span>
            <span>Date</span>
          </div>

          <ul class="db__list">
            <li class="db__record">
              <a href="#">Table nubmer 1</a>
              <strong>12.12.1212</strong>
            </li>
            <li class="db__record">
              <a href="#">Table nubmer 2</a>
              <strong>13.13.1212</strong>
            </li>
            <li class="db__record">
              <a href="#">Table nubmer 3</a>
              <strong>14.14.1212</strong>
            </li>
          </ul>
        </div>
    `);
  }
}
