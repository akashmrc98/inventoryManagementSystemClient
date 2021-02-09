const jwt = require("jsonwebtoken");

export default {
  token: () => {
    var localToken = JSON.parse(localStorage.getItem("user"));
    localToken = jwt.verify(localToken, "$msi_amd@98");
    return localToken;
  },
  USERS: state => {
    return state.users;
  }
};
