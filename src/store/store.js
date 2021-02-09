import Vue from "vue";
import Vuex from "vuex";

import Assets from "./Assets/module";
import Management from "./Management/module";
import User from "./User/module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    User,
    Assets,
    Management
  }
});
