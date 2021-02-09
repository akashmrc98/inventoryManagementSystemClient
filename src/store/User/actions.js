import axios from "axios";

//* NODEJS BACKEND REST-API BASE_URL
const BaseUrl = "http://localhost:3000/";

export default {
  //* REGISTER USER
  REGISTER_USER: async ({ commit }, user) => {
    const message = await axios.post(BaseUrl + "register-user/", user);
    commit("SEND_MESSAGE", message.data.message);
  },

  //* VIEW USERS
  VIEW_USERS: async ({ commit }) => {
    const users = await axios.get(BaseUrl + "view-users/");
    commit("VIEW_USERS", users.data.users);
  },

  //* VIEW USER
  VIEW_USER: async ({ commit }, id) => {
    const user = await axios.get(BaseUrl + "view-user/" + id);
    commit("VIEW_USER", user.data.user);
  },

  //* EDIT USER
  EDIT_USER: async ({ commit }, user) => {
    const message = await axios.put(
      BaseUrl + "edit-user/" + user.id,
      user.user
    );
    commit("SEND_MESSAGE", message.data.message);
  },
  //* DELETE USER
  DELETE_USER: async ({ commit }, id) => {
    const message = await axios.delete(BaseUrl + "delete-user/" + id);
    commit("SEND_MESSAGE", message.data.message);
  },

  //* LOGIN USER
  LOGIN_USER: async ({ commit }, login) => {
    const message = await axios.post(BaseUrl + "login/", login);
    JSON.stringify(
      localStorage.setItem("user", JSON.stringify(message.data.token))
    );
    setTimeout(() => {
      commit("LOGIN", message.data.token);
    }, 500);
    commit("COUNTER");
    setTimeout(() => {
      localStorage.removeItem("user");
    }, 1000 * 60 * 30);
  },

  //* LOGOUT CSV
  LOGOUT_USER: async ({ commit }) => {
    await axios.post(BaseUrl + "logout");
    commit("LOGOUT");
    setTimeout(() => {
      commit("COUNTER");
    }, 250);
  },

  //* ALL ASSETS CSV
  LOAD_CSVS: async () => {
    await axios.get(BaseUrl + "all_csv/");
  },

  LOAD_ASSETS_CSV: async () => {
    axios({
      url: BaseUrl + "assets-csv",
      method: "GET",
      responseType: "blob"
    }).then(response => {
      var fileURL = window.URL.createObjectURL(new Blob([response.data]));
      var fileLink = document.createElement("a");
      fileLink.href = fileURL;
      fileLink.setAttribute("download", "all_assets.csv");
      document.body.appendChild(fileLink);
      fileLink.click();
    });
  },
  LOAD_MANAGEMENTS_CSV: async () => {
    axios({
      url: BaseUrl + "managements-csv",
      method: "GET",
      responseType: "blob"
    }).then(response => {
      var fileURL = window.URL.createObjectURL(new Blob([response.data]));
      var fileLink = document.createElement("a");
      fileLink.href = fileURL;
      fileLink.setAttribute("download", "all_managements.csv");
      document.body.appendChild(fileLink);
      fileLink.click();
    });
  },
  LOAD_RECYCLES_CSV: async () => {
    axios({
      url: BaseUrl + "recycles-csv",
      method: "GET",
      responseType: "blob"
    }).then(response => {
      var fileURL = window.URL.createObjectURL(new Blob([response.data]));
      var fileLink = document.createElement("a");
      fileLink.href = fileURL;
      fileLink.setAttribute("download", "all_recycles.csv");
      document.body.appendChild(fileLink);
      fileLink.click();
    });
  },
  LOAD_USERS_CSV: async () => {
    axios({
      url: BaseUrl + "users-csv",
      method: "GET",
      responseType: "blob"
    }).then(response => {
      var fileURL = window.URL.createObjectURL(new Blob([response.data]));
      var fileLink = document.createElement("a");
      fileLink.href = fileURL;
      fileLink.setAttribute("download", "all_users.csv");
      document.body.appendChild(fileLink);
      fileLink.click();
    });
  },
  //* TRASH
  TRASH: async ({ commit }) => {
    const trash = await axios.get(BaseUrl + "trash-data/");
    commit("TRASH", trash.data.trash);
  }
};
