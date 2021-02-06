import Vue from "vue";
import VueRouter from "vue-router";
import LP from "../views/LandingPage.vue";
import WebSite from "../views/WebSite.vue";
import Test from "../views/Test.vue";
import AuthFinished from "../views/AuthFinished.vue";

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
    path: "/test",
    name: "Test",
    component: Test,
  },
  {
    path: "/website/*",
    name: "WebSite",
    component: WebSite,
  },
  // -----こっからは認証を挟むルーティング-------
  {
    path: "/auth/finished",
    name: "AuthFinished",
    component: AuthFinished,
  },
  // --------------------------------------
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
