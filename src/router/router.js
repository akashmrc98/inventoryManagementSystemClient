import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/store";

Vue.use(VueRouter);

import AssetRoutes from "./AssetRouter";
import managementRoutes from "./ManagementRoutes";
import userRoutes from "./UserRoutes";

const LoginUser = () => import("../components/User/LoginUser.vue");
const dashboard = () => import("../components/Dashboard/Dashboard.vue");
const Extras = () => import("../components/extras/Extras.vue");
const pageNotFound = () => import("../reusables/PageNotFound.vue");
const Header = () => import("../Header.vue");

const routes = [
  {
    path: "/alcpg/",
    component: Header,
    name: "Header",
    children: [
      ...AssetRoutes,
      ...managementRoutes,
      ...userRoutes,
      {
        path: "dashboard",
        component: dashboard,
        name: "dashboard",
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "extras",
        component: Extras,
        name: "extras",
        meta: {
          requiresAuth: true
        },
        beforeEnter: (to, from, next) => {
          var token = store.getters.token;
          if (token.sign.isAdmin) {
            next();
          } else next("dashboard");
        }
      }
    ]
  },
  {
    path: "/login",
    component: LoginUser,
    name: "LoginUser"
  },
  {
    path: "*",
    component: pageNotFound,
    name: "pageNotFound",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/",
    redirect: "/alcpg/dashboard"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  var auth = JSON.parse(localStorage.getItem("user"));
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (auth) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
