import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import axios from "axios";

Vue.config.productionTip = false;

Vue.prototype.$axios = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 10000
});

const store = {
  // token: 'ya29.a0AfH6SMBMynDVhDXaeauqakgHX7CgtJP8rjJCGhOuQueTyu0bKUV3Qv4rL0WSCYDlpp370yC7tBof6EHQPk2znvCvUWYrVU0ymIJprG9Zv_ZN5col988R43yhJpmggF7eVoigJgHD584uXBeSYayF_xveQpUsO5dxSxHJGFxL2JU', //デバッグ用
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

const imageSelectorStore = {
  selectedImageEditor: null,
  registerdArticleEdit: null,
  checkIsImageEditorSet() {
    return this.selectedImageEditor
  },
  setSelectedImageEditor(editor) {
    if(editor) {
      if(this.selectedImageEditor) {
        this.selectedImageEditor.setActive(false) //オレンジ色の枠線を消す
      } 
      this.selectedImageEditor = editor
      this.selectedImageEditor.setActive(true) //オレンジ色の枠線をつける
    } else {
      // nullがきた時
      if(this.selectedImageEditor) {
        this.selectedImageEditor.setActive(false) //オレンジ色の枠線を消す
      }
      this.selectedImageEditor = editor
    }
    this.registerdArticleEdit.selectedImageEditor = editor //sync
  },
  register(ele) {
    this.registerdArticleEdit = ele
  },
  setURL(url) {
    this.selectedImageEditor.setURL(url)
  }
};

Vue.prototype.$store = store;
Vue.prototype.$imageSelectorStore = imageSelectorStore;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
