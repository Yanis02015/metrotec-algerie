<template>
  <v-container :class="$vuetify.breakpoint.smAndDown ? 'mt-12' : 'mt-4'">
    <v-container class="text-center" v-if="activitie">
      <h1
        class="
          text-center text-decoration-underline text-h6 text-lg-h4 text-sm-h5
          font-weight-bold
        "
      >
        {{ activitie.title }}
      </h1>
      <v-img
        class="mx-auto my-3"
        width="700"
        :src="`${activitie.image}`"
      ></v-img>
      <v-card flat class="ma-auto" width="700">
        <v-card-text
          v-html="content"
          v-for="(content, i) in activitie.contents"
          :key="i"
          class="ma-0"
        />
      </v-card>
    </v-container>

    <!-- 404 -->
    <v-container v-else>
      <h1>Erreur 404</h1>
      <router-link to="/">Revenir à l'accueil</router-link>
    </v-container>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["activities"]),
    activitie() {
      return this.activities.find((activity) => activity.param === this.$route.params.activity)
    },

    route() {
      return this.$route.fullPath;
    },

    activitieSelected() {
      switch (this.route) {
        case "/activities/1":
          return 1;
        case "/activities/2":
          return 2;
        case "/activities/3":
          return 3;
        case "/activities/4":
          return 4;
        case "/activities/5":
          return 5;
        case "/activities/6":
          return 6;
        default:
          return 0;
      }
    },
  },
  methods: {},
};
</script>

<style></style>
