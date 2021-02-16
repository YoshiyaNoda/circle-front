import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import axios from "axios";

Vue.config.productionTip = false;

Vue.prototype.$axios = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 10000,
  
});

const store = {
  token: '',
  email: '',
  name: '',
  selectedArticleId: 0,
  setUserData(queries) {
    this.updateUserData(this, queries);
    this.updateObservable(queries);


  },
  ObservableComponetns: [],
  updateObservable(queries) {
    const length = this.ObservableComponetns.length;
    console.log('number of components = ' + length);
    for(let i=0; i < length; i++) {
      this.updateUserData(this.ObservableComponetns[i], queries);
    }
  },
  appendObservable(component) {
    // 重複しないように気をつけたい
    this.ObservableComponetns.push(component);
  },
  updateUserData(ele, queries) {
    ele.token = queries.token;
    ele.email = queries.email;
    ele.name = queries.name;
  },
  checkTokenIsSet() {
    return this.token;
  }
};

Vue.prototype.$store = store;






new Vue({
  router,
  render: h => h(App),
  created(){
    if(!this.$store.checkTokenIsSet()){
      this.$axios.get("session-token",{withCredentials: true}).then((response) => {
       const queries=
       {
         'token':response.data[0].token,
         'email':response.data[0].email,
         'name':response.data[0].name
       };
       //this.$store.appendObservable(this);
       this.$store.setUserData(queries);
       //console.log(response.data[0].token)
       
      });
    }
  }
}).$mount("#app");
