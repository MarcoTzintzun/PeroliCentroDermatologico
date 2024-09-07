import { createRouter, createWebHistory } from "vue-router";
import PresentationView from "../views/Home/PresentationView.vue";
import AboutView from "../views/AboutUs/AboutView.vue";
import ContactView from "../views/ContactUs/ContactView.vue";
import SignInBasicView from "../views/SignIn/BasicView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "presentation",
      component: PresentationView,
    },
    {
      path: "/pages/landing-pages/about-us",
      name: "about",
      component: AboutView,
    },
    {
      path: "/pages/landing-pages/contact-us",
      name: "contactus",
      component: ContactView,
    },
    {
      path: "/pages/landing-pages/basic",
      name: "signin-basic",
      component: SignInBasicView,
    },
  ],
});

export default router;
