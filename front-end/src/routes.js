/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Maps from "views/examples/Maps.js";
import AllLogs from "views/examples/AllLogs.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/all-logs",
    name: "Semua Log",
    icon: "ni ni-archive-2 text-yellow",
    component: AllLogs,
    layout: "/admin",
  },
  {
    path: "/historical-report",
    name: "Laporan Historis",
    icon: "ni ni-bullet-list-67 text-red",
    component: Index, // Ganti dengan komponen laporan Anda nanti
    layout: "/admin",
  },
];
export default routes;
