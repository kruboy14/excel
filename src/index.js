
import { Router } from "./core/routes/Route";
import { DashboardPage } from "./page/DashboardPage";
import { ExcelPage } from "./page/ExcelPage";
import "./scss/index.scss";

new Router("#app", {
  dashboard: DashboardPage,
  excel: ExcelPage,
})
