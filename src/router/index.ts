import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NotFound from "@/views/NotFound.vue";
import { META as META_HOME } from "@/metadata/homepage";
import { META as META_ABOUT } from "@/metadata/about";
import { META as META_GOVERNANCE } from "@/metadata/governance";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: META_HOME,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
      meta: META_ABOUT,
    },
    {
      path: "/governance",
      name: "governance",
      component: () => import("../views/GovernanceView.vue"),
      meta: META_GOVERNANCE,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
      meta: META_HOME,
    }, // 404 template
  ],
});

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title as string;

  for (const key in to.meta) {
    const item: HTMLMetaElement | HTMLScriptElement | HTMLElement | null =
      document.querySelector(`meta[name="${key}"]`) ??
      document.querySelector(`meta[property="${key}"]`) ??
      document.getElementById(key);
    switch (item?.constructor) {
      case HTMLMetaElement: {
        item.setAttribute("content", to.meta[key] as string);
        break;
      }
      case HTMLScriptElement: {
        item.innerHTML = JSON.stringify(to.meta[key] ?? {});
        break;
      }
    }
  }

  next();
});

export default router;
