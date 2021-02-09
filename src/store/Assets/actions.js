import axios from "axios";

//* NODEJS BACKEND REST-API BASE_URL
const BaseUrl = "http://localhost:3000/";

export default {
  //* LOAD ALL ASSETS
  ALL_ASSETS: async ({ commit }) => {
    var assets = await axios.get(BaseUrl + "view-assets");
    assets = assets.data.assets;
    commit("ALL_ASSETS", assets);
  },

  //* POSTING ASSET
  ADD_ASSET: async ({ commit }, asset) => {
    const message = await axios.post(BaseUrl + "add-asset", asset);
    commit("SEND_MESSAGE", message.data);
  },

  //* RESTORE ASSET
  RESTORE_ASSET: async ({ commit }, asset) => {
    const message = await axios.post(BaseUrl + "restore-asset", asset);
    commit("SEND_MESSAGE", message.data);
  },

  //* GET SNAPSHOT OF ASSET
  PREVIEW_ASSET: async ({ commit }, id) => {
    var asset = await axios.get(BaseUrl + "edit-asset/" + id);
    asset = asset.data.asset;
    commit("PREVIEW_ASSET", asset);
  },

  //* EDIT SNAPSHOT OF ASSET
  PUT_ASSET: async ({ commit }, asset) => {
    var message = await axios.put(BaseUrl + "edit-asset/" + asset._id, asset);
    commit("SEND_MESSAGE", message.data);
  },

  //* DELETE ASSET
  DELETE_ASSET: async ({ commit }, info) => {
    var message = await axios.put(BaseUrl + "delete-asset/" + info.id, info);
    commit("SEND_MESSAGE", message.data.message);
  },

  //* LOAD ALL PRODUCTS
  ALL_PRODUCTS: async ({ commit }, id) => {
    var products = await axios.get(BaseUrl + "view-products/" + id);
    commit("ALL_PRODUCTS", products.data.products);
  },

  //* POST PRODUCT
  POST_PRODUCT: async ({ commit }, product) => {
    var message = await axios.post(
      BaseUrl + "add-product/" + product.id,
      product
    );
    commit("SEND_MESSAGE", message.data.message);
  },

  //* GET SNAPSHOT OF PRODUCT
  PREVIEW_PRODUCT: async ({ commit }, ids) => {
    commit("PREVIEW_PRODUCT", ids);
  },

  //* SNAPSHOT PRODUCT
  SNAPSHOT_PRODUCT: async ({ commit }, ids) => {
    var snapshot = await axios.post(
      BaseUrl + "snap-product/" + ids.assetId,
      ids
    );
    commit("SNAPSHOT_PRODUCT", snapshot.data.product);
  },

  //* EDIT SNAPSHOT OF PRODUCT
  PUT_PRODUCT: async ({ commit }, product) => {
    var message = await axios.post(
      BaseUrl + "edit-product/" + product.assetId,
      product
    );
    commit("SEND_MESSAGE", message.data.message);
  },

  //* DELETE PRODUCT
  DELETE_PRODUCT: async ({ commit }, ids) => {
    var message = await axios.put(
      BaseUrl + "delete-product/" + ids.assetId,
      ids
    );
    commit("SEND_MESSAGE", message.data.message);
  },

  //* ADD SERVICES
  ADD_SERVICE: async ({ commit }, service) => {
    var message = await axios.post(
      BaseUrl + "add-service/" + service.id,
      service
    );
    commit("SEND_MESSAGE", message.data.message);
  },
  VIEW_SERVICES: async ({ commit }, id) => {
    var services = await axios.get(BaseUrl + "view-services/" + id);
    commit("VIEW_SERVICES", services.data.services);
  },

  //* GET SNAPSHOT OF SERVICE
  PREVIEW_SERVICE: async ({ commit }, ids) => {
    commit("PREVIEW_SERVICE", ids);
  },

  //* SNAPSHOT SERVICE
  SNAPSHOT_SERVICE: async ({ commit }, ids) => {
    var snapshot = await axios.post(
      BaseUrl + "snap-service/" + ids.assetId,
      ids
    );
    commit("SNAPSHOT_SERVICE", snapshot.data.service);
  },
  //* EDIT SNAPSHOT OF SERVICE
  PUT_SERVICE: async ({ commit }, service) => {
    var message = await axios.put(
      BaseUrl + "edit-service/" + service.assetId,
      service
    );
    commit("SEND_MESSAGE", message.data.message);
  },
  //* DELETE SERVICE
  DELETE_SERVICE: async ({ commit }, ids) => {
    var message = await axios.put(
      BaseUrl + "delete-service/" + ids.assetId,
      ids
    );
    commit("SEND_MESSAGE", message.data.message);
  },
  //* DASHBOARD DETAILS
  DASHBOARD: async ({ commit }) => {
    var dashboard = await axios.get(BaseUrl + "dashboard/");
    commit("DASHBOARD", dashboard.data.dashboard);
  },
  //* VIEW PENDING ASSETS
  PENDING_ASSETS: async ({ commit }) => {
    var unReturnedAssets = await axios.get(BaseUrl + "view-unreturned-assets/");
    commit("PENDING_ASSETS", unReturnedAssets.data.unReturned);
  },
  //* VIEW RETURNED ASSETS
  RETURNED_ASSETS: async ({ commit }) => {
    var ReturnedAssets = await axios.get(BaseUrl + "view-returned-assets/");
    commit("RETURNED_ASSETS", ReturnedAssets.data.Returned);
  },
  //* VIEW DAMAGED ASSETS
  DAMAGED_ASSETS: async ({ commit }) => {
    var DamagedAssets = await axios.get(BaseUrl + "view-damaged-assets/");
    commit("DAMAGED_ASSETS", DamagedAssets.data.Damaged);
  }
};
