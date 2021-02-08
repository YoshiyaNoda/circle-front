import Vue from "vue";
import VueRouter from "vue-router";
import LP from "../views/LandingPage.vue";
import WebSite from "../views/WebSite.vue";
import Login from "../views/Login.vue";
import SelectArticle from "../views/SelectArticle.vue";
import AuthFinished from "../views/AuthFinished.vue";
import AuthFailed from "../views/AuthFailed.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/auth/failed",
    name: "AuthFailed",
    component: AuthFailed,
  },
  // ------------auth/*は認証されていなければ、認証画面に遷移するようにする。-------------
  {
    path: "/auth/finished",
    name: "AuthFinished",
    component: AuthFinished,
  },
  {
    path: "/auth/select-articles",
    name: "SelectArticle",
    component: SelectArticle,
  },
  // -----------------------------------------------
  {
    path: "/website",
    name: "WebSite",
    component: WebSite,
  },
  {
    path: "/website/*",
    name: "WebSite",
    component: WebSite,
  },
  {
    path: "/*",
    name: "LP",
    component: LP,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
