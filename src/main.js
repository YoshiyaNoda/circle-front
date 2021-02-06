import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import axios from "axios";

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;

const store = {
  token: '',
  email: '',
  name: '',
  setUserData(queries) {
    this.updateUserData(this, queries);
    this.updateObserving(queries);
  },
  observingComponetns: [],
  updateObserving(queries) {
    const length = this.observingComponetns.length;
    console.log('number of components = ' + length);
    for(let i=0; i < length; i++) {
      this.updateUserData(this.observingComponetns[i], queries);
    }
  },
  appendObserving(component) {
    // 重複しないように気をつけたい
    this.observingComponetns.push(component);
  },
  updateUserData(ele, queries) {
    ele.token = queries.token;
    ele.email = queries.email;
    ele.name = queries.name;
  }
};

Vue.prototype.$store = store;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
