import Vue from "vue";
import VueRouter from "vue-router";
import LP from "../views/LandingPage.vue";
import WebSite from "../views/WebSite.vue";
import Test from "../views/Test.vue";
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
    path: "/test",
    name: "Test",
    component: Test,
  },
  {
    path: "/website/*",
    name: "WebSite",
    component: WebSite,
  },
  {
    path: "/auth/failed",
    name: "AuthFailed",
    component: AuthFailed,
  },
  {
    path: "/auth/finished",
    name: "AuthFinished",
    component: AuthFinished,
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
