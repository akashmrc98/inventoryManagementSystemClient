import axios from "axios";

//* NODEJS BACKEND REST-API BASE_URL
const BaseUrl = "http://localhost:3000/";

export default {
  //* ACCOMMODATE USER
  ADD_USER: async ({ commit }, user) => {
    const token = await axios.post(BaseUrl + "accommodate-asset", user);
    commit("SEND_MESSAGE", token.data.message);
  },

  //* VIEW ACCOMMODATIONS
  VIEW_ACCOMMODATIONS: async ({ commit }) => {
    const accommodations = await axios.get(BaseUrl + "view-accommodate");
    commit("VIEW_ACCOMMODATIONS", accommodations.data.results);
  },
  //* SINGLE PAGE VIEW ACCOMMODATION
  SINGLE_ACCOMMODATION_VIEW: async ({ commit }, id) => {
    const accommodate = await axios.get(BaseUrl + "view-accommodate/" + id);
    commit("SINGLE_ACCOMMODATION_VIEW", accommodate.data.result);
  },
  //* PRINT PDF
  PRINT_PDF: async ({ commit }, id) => {
    const accommodate = await axios.get(BaseUrl + "view-accommodate/" + id);
    commit("SINGLE_ACCOMMODATION_VIEW", accommodate.data.result);
  },
  //*RETURN ASSET
  RETURN_ASSET: async ({ commit }, AssetInfo) => {
    const message = await axios.put(
      BaseUrl + "return-asset/" + AssetInfo.tokenId,
      AssetInfo
    );
    commit("RETURN_ASSET", message.data.message);
  },

  RETURN_SINGLE_ASSET: async ({ commit }, AssetInfo) => {
    const message = await axios.put(
      BaseUrl + "return-single-asset/" + AssetInfo.assetId,
      AssetInfo
    );
    commit("RETURN_ASSET", message.data.message);
  },

  //* DELETE ACCOMMODATION
  DELETE_ACCOMMODATION: async ({ commit }, info) => {
    const message = await axios.post(
      BaseUrl + "delete-accommodation/" + info.id,
      info
    );
    commit("SEND_MESSAGE", message.data.message);
  },
  EDIT_ACCOMMODATION: async ({ commit }, accommodation) => {
    const message = await axios.put(
      BaseUrl + "edit-accommodation/" + accommodation.Id,
      accommodation
    );
    commit("SEND_MESSAGE", message);
  }
};
