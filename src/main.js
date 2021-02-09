import Vue from "vue";
import Buefy from "buefy";
import Vuelidate from "vuelidate";

import "buefy/dist/buefy.css";
import "vue-awesome/icons/flag";
import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon";

Vue.component("v-icon", Icon);

import App from "./App.vue";
import router from "./router/router";
import store from "./store/store.js";

Vue.use(Vuelidate);
Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
