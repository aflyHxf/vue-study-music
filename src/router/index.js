import Vue from "vue";
import VueRouter from "vue-router";
import Rank from "../components/rank/Rank.vue";
import Recommend from "../components/recommend/Recommend.vue";
import Search from "../components/search/Search.vue";
import Singer from "../components/singer/Singer.vue";
import SingerDetail from "../components/singer-detail/SingerDetail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/recommend", // 路由重定向
  },
  {
    path: "/rank",
    name: "rank",
    component: Rank,
  },
  {
    path: "/recommend",
    name: "recommend",
    component: Recommend,
  },
  {
    path: "/singer",
    name: "singer",
    component: Singer,
    children: [
      {
        path: ":id",
        component: SingerDetail,
      }
    ]
  },
  {
    path: "/search",
    name: "search",
    component: Search,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
