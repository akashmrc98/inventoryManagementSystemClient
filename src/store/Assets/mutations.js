export default {
  //* SIGNAL MESSAGE FOR POST, PUT CONTENT
  SEND_MESSAGE: (state, message) => {
    state.message = message;
    state.assetsRefresh = true;
  },

  //* SIGNAL TO CLEAR MESSAGE
  CLEAR_MESSAGE: state => {
    state.message = "";
    state.assetsRefresh = false;
  },

  //* LOAD ALL ASSETS
  ALL_ASSETS: (state, assets) => {
    state.assets = assets;
  },

  //* LOAD ALL PRODUCTS
  ALL_PRODUCTS: (state, products) => {
    state.products = products;
  },

  //* GET PREVIEW SNAPSHOT OF ASSET
  PREVIEW_ASSET: (state, asset) => {
    state.editAsset = asset;
  },

  //* GET PREVIEW SNAPSHOT OF PRODUCT
  PREVIEW_PRODUCT: (state, product) => {
    state.product_ids = product;
  },

  //* SNAPSHOT PRODUCT
  SNAPSHOT_PRODUCT: (state, product) => {
    state.product = product;
  },

  //* VIEW SERVICES
  VIEW_SERVICES: (state, services) => {
    state.services = services;
  },

  //* GET PREVIEW SNAPSHOT OF SERVICE
  PREVIEW_SERVICE: (state, service) => {
    state.service_ids = service;
  },

  //* SNAPSHOT SERVICE
  SNAPSHOT_SERVICE: (state, service) => {
    state.service = service;
  },
  //* DASHBOARD
  DASHBOARD: (state, dashboard) => {
    state.dashboard = dashboard;
  },
  //* PENDING ASSETS
  PENDING_ASSETS: (state, unReturnedAssets) => {
    state.unReturnedAssets = unReturnedAssets;
  },
  //* PENDING ASSETS
  RETURNED_ASSETS: (state, ReturnedAssets) => {
    state.ReturnedAssets = ReturnedAssets;
  }, //* DAMAGED ASSETS
  DAMAGED_ASSETS: (state, Damaged) => {
    state.DamagedAssets = Damaged;
  }
};
