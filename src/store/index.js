import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activities: [
      {
        title: "Dimensionnel",
        param: "dimensionnel",
        image: "/images/services/dimensionnel.webp",
        contents: [
          "Le laboratoire étalonne tous les instruments de mesure dimensionnel. L'étalonnage de vos instruments de mesure permet de les raccorder au système d'unités international et d'assurer la traçabilité métrologique de vos mesures.",
          "Accrédité ALGERAC (<a target='_blank' href='/images/services/accreditation.jpeg'>Accréditation</a> / <a target='_blank' href='#'>Annexe technique</a>)",
          "* Pied à coulisse",
          "* Mécrométre d’exterieur",
        ],
      },
      {
        title: "Température",
        param: "temperature",
        image: "/images/services/temperature.webp",
        contents: [
          "Le laboratoire étalonne tous les instruments de mesure de température. La chaine d'étalonnage et les méthodes mises en place permettent le raccordement au Système International d’unités (SI) de la quasi-totalité des instruments.",
        ],
      },
      {
        title: "Pression",
        param: "pression",
        image: "/images/services/pression.webp",
        contents: [
          "Le laboratoire étalonne tous les instruments de mesure de pression. La chaine d'étalonnage et les méthodes mises en place permettent le raccordement au Système International d’unités (SI) de la quasi-totalité des instruments.",
        ],
      },
      {
        title: "Torque",
        param: "torque",
        image: "/images/services/torque.webp",
        contents: [
          "L'étalonnage de vos instruments de mesure permet de les raccorder au système d'unités international et d'assurer la traçabilité métrologique de vos mesures. Notre banc des couples permet la détermination de la justesse de vos instruments jusqu'à 550 N.m.",
        ],
      },
      {
        title: "Balance",
        param: "balance",
        image: "/images/services/balance.webp",
        contents: [
          "Le laboratoire étalonne tous les instruments de mesure de balance. La chaine d'étalonnage et les méthodes mises en place permettent le raccordement au Système International d’unités (SI) de la quasi-totalité des instruments.",
        ],
      },
      {
        title: "Formation",
        param: "formation",
        image: "/images/services/formation.webp",
        contents: [
          "Le laboratoire <strong>METROTEC ALGERIE</strong> assure des formations et accompagnement dans <strong>le domaine de métrologie quel que soit votre activité.</strong>",
        ],
      },
    ],
    snackbarInformation: {
      type: "error",
      model: false,
      message: "",
    },
  },
  mutations: {
    MODIFY_SNACKBAR(state, payload) {
      state.snackbarInformation.type = payload.type;
      state.snackbarInformation.message = payload.message;
      state.snackbarInformation.model = true;
    },
  },
  actions: {
    snackbarConfig(context, payload) {
      if (payload.type && payload.message)
        context.commit("MODIFY_SNACKBAR", payload);
    },
  },
  modules: {},
});
