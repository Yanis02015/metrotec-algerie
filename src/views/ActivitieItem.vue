<template>
  <v-container :class="$vuetify.breakpoint.smAndDown ? 'mt-12' : 'mt-4'">
    <v-container class="text-center" v-if="activitieSelected">
      <h1 class="text-center text-decoration-underline title-activities">
        {{ activitie.title }}
      </h1>
      <v-img
        class="mx-auto my-3"
        width="700"
        :src="`http://localhost:3000${activitie.image}`"
      ></v-img>
      <v-card flat class="ma-auto" width="700">
        <v-card-text v-html="content" v-for="(content, i) in activitie.contents" :key="i" class="ma-0"/>
      </v-card>
    </v-container>

    <!-- 404 -->
    <v-container v-else>
      <h1>Erreur 404</h1>
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
      return this.activities[this.activitieSelected - 1];
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

<style>
.title-activities {
  font-family: "Cinzel Decorative", cursive;
  font-size: 25px;
}
</style>
