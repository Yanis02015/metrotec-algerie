import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import News from "../views/News.vue";
import Presentation from "../views/Presentation.vue";
import Activities from "../views/Activities.vue";
import ActivitieItem from "../views/ActivitieItem.vue";
import Contact from "../views/Contact.vue";
import UserLogin from "../views/user/Login.vue";
import AdminLogin from "../views/admin/AdminLogin.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Laboratoire d'étalonnage et vérification | METROTEC ALGERIE",
    },
  },
  {
    path: "/news",
    name: "News",
    component: News,
    meta: {
      title: "Actualité METROTEC ALGERIE",
    },
  },
  {
    path: "/presentation",
    name: "Presentation",
    component: Presentation,
    meta: {
      title: "Présentation et Mot du président | METROTEC ALGERIE",
    },
  },
  {
    path: "/activities",
    name: "Activities",
    component: Activities,
    meta: {
      title: "Dimensionnel - Température - Pression... | METROTEC ALGERIE",
    },
  },
  {
    path: "/activities/:activity",
    name: "ActivitieItem",
    component: ActivitieItem,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
    meta: {
      title: "Nous contacter | METROTEC ALGERIE",
    },
  },
  {
    path: "/account",
    name: "Login",
    component: UserLogin,
    meta: {
      title: "Se connecter à votre compte | METROTEC ALGERIE",
    },
  },
  {
    path: "/admin",
    name: "AdminLogin",
    component: AdminLogin,
    meta: {
      title: "Tableau de bord administrateur | METROTEC ALGERIE",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
