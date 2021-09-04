import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activities: [
      {
        title: "Premier domaine d'activité",
        image: "",
        contents: [
          "Premier paragraphe",
          "Deuxiéme paragraphe",
          "Troisiéme paragraphe",
        ],
      },
      {
        title: "Deuxième domaine d'activité",
        image: "",
        contents: [
          "Premier paragraphe",
          "Deuxiéme paragraphe",
          "Troisiéme paragraphe",
        ],
      },
      {
        title: "Troisième domaine d'activité",
        image: "",
        contents: [
          "Premier paragraphe",
          "Deuxiéme paragraphe",
          "Troisiéme paragraphe",
        ],
      },
      {
        title: "Quatrième domaine d'activité",
        image: "",
        contents: [
          "Premier paragraphe",
          "Deuxiéme paragraphe",
          "Troisiéme paragraphe",
        ],
      },
      {
        title: "Cinquème domaine d'activité",
        image: "",
        contents: [
          "Premier paragraphe",
          "Deuxiéme paragraphe",
          "Troisiéme paragraphe",
        ],
      },
      {
        title: "Sixième domaine d'activité",
        image: "",
        contents: [
          "Premier paragraphe",
          "Deuxiéme paragraphe",
          "Troisiéme paragraphe",
        ],
      },
    ],
  },
  mutations: {},
  actions: {},
  modules: {},
});
