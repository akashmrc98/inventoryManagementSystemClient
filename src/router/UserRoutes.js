//* User Routes
const AdminHome = () => import("../pages/AdminHome.vue");
const ViewUser = () => import("../components/User/ViewUser.vue");
const EditUser = () => import("../components/User/EditUser.vue");
const DeleteUser = () => import("../components/User/DeleteUser.vue");
const Trash = () => import("../components/User/Trash.vue");
import store from "../store/store";

const routes = [
  {
    path: "admin",
    component: AdminHome,
    name: "AdminHome",
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      var token = store.getters.token;
      if (token.sign.isAdmin) {
        next();
      } else next("dashboard");
    }
  },
  {
    path: "view-user/:id",
    component: ViewUser,
    name: "ViewUser",
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      var token = store.getters.token;
      if (token.sign.isAdmin) {
        next();
      } else next("dashboard");
    }
  },
  {
    path: "edit-user/:id",
    component: EditUser,
    name: "EditUser",
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      var token = store.getters.token;
      if (token.sign.isAdmin) {
        next();
      } else next("dashboard");
    }
  },
  {
    path: "delete-user/:id",
    component: DeleteUser,
    name: "DeleteUser",
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {
      var token = store.getters.token;
      if (token.sign.isAdmin) {
        next();
      } else next("dashboard");
    }
  },
  {
    path: "trash/:id",
    component: Trash,
    name: "Trash",
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
];

export default routes;
