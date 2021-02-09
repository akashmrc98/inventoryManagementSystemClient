//* Management Routes
const ManagementHome = () => import("../pages/ManagementHome");
const ViewAccommodations = () => import("../pages/ViewAccommodations");
const SingleAccommodation = () =>
  import("../components/Management/SingleAccommodation.vue");
const ReturnAsset = () => import("../components/Management/ReturnAsset.vue");
const DeleteAccommodation = () =>
  import("../components/Management/DeleteAccommodation.vue");
const EditAccommodation = () =>
  import("../components/Management/EditAccommodation.vue");

const routes = [
  {
    path: "accommodate",
    component: ManagementHome,
    name: "ManagementHome",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "view-accommodations",
    component: ViewAccommodations,
    name: "ViewAccommodations",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "view-accommodation/:id",
    component: SingleAccommodation,
    name: "SingleAccommodation",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "return-asset/:id",
    component: ReturnAsset,
    name: "ReturnAsset",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "delete-accommodation/:id",
    component: DeleteAccommodation,
    name: "DeleteAccommodation",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "edit-accommodation/:id",
    component: EditAccommodation,
    name: "EditAccommodation",
    meta: {
      requiresAuth: true
    }
  }
];

export default routes;
