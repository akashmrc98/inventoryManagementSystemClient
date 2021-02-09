//* Asset Routes
const AssetHome = () => import("../pages/AssetHome.vue");
const AssetEdit = () => import("../components/Asset/EditAsset.vue");
const DeleteAsset = () => import("../components/Asset/DeleteAsset.vue");
const AllAssets = () => import("../pages/ViewAllAssets.vue");
const SingleAsset = () => import("../components/Asset/SingleAsset.vue");

//* Product Routes
const ProductEdit = () => import("../components/Products/EditProduct.vue");
const ProductDelete = () => import("../components/Products/DeleteProduct.vue");
const SingleProduct = () => import("../components/Products/SingleProduct.vue");

//*Services Routes
const ServiceHome = () => import("../pages/ServicesHome.vue");
const ServiceView = () =>
  import("../components/Services/SingleViewService.vue");
const ServiceEdit = () => import("../components/Services/EditService.vue");
const ServiceDelete = () => import("../components/Services/DeleteService.vue");

//*Dashboard Routes
const UnReturnedAssets = () => import("../components/Dashboard/PendingAssets");
const ReturnedAssets = () => import("../components/Dashboard/ReturnedAssets");
const DamagedAssets = () => import("../components/Dashboard/DamagedAssets");

const routes = [
  {
    path: "assets",
    component: AssetHome,
    name: "AssetHome",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "edit-asset/:id",
    component: AssetEdit,
    name: "AssetEdit",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "delete-asset/:id",
    component: DeleteAsset,
    name: "AssetDelete",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "all-assets/",
    component: AllAssets,
    name: "AllAssets",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "single-asset/:id",
    component: SingleAsset,
    name: "SingleAsset",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "View-single-product/:id",
    component: SingleProduct,
    name: "SingleProduct",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "snap-product/:id",
    component: ProductEdit,
    name: "ProductEdit",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "delete-product/:id",
    component: ProductDelete,
    name: "ProductDelete",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "service-product/:id",
    component: ServiceHome,
    name: "ServiceHome",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "view-single-service/:id",
    component: ServiceView,
    name: "ServiceView",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "edit-service/:id",
    component: ServiceEdit,
    name: "ServiceEdit",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "delete-service/:id",
    component: ServiceDelete,
    name: "ServiceDelete",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "unreturned-assets/",
    component: UnReturnedAssets,
    name: "UnReturnedAssets",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "returned-assets/",
    component: ReturnedAssets,
    name: "ReturnedAssets",
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "damaged-assets/",
    component: DamagedAssets,
    name: "DamagedAssets",
    meta: {
      requiresAuth: true
    }
  }
];

export default routes;
