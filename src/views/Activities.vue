<template>
  <v-container :class="$vuetify.breakpoint.smAndDown ? 'mt-12' : 'mt-4'">
    <h1
      class="
        text-center text-decoration-underline text-h6 text-lg-h4 text-sm-h5
        font-weight-bold
        mb-10
        mt-5
      "
    >
      Nos activités
    </h1>
    <v-card v-for="(item, i) in activities" :key="i" class="my-5" elevation="5">
      <v-hover v-slot="{ hover }">
        <v-row
          :class="hover ? 'indigo lighten-5' : ''"
          class="smooth-transition ma-0 pa-0"
        >
          <v-col cols="12" md="5" class="ma-0 pa-0">
            <v-card class="ma-2" height="250" tile flat>
              <v-img height="250" class="ma-0" :src="item.image" />
            </v-card>
          </v-col>

          <v-col class="ma-0 pa-0" cols="12" md="7">
            <v-card height="100%" flat class="transparent">
              <v-card-title>
                {{ item.title }}
              </v-card-title>
              <v-card-text>
                {{
                  $vuetify.breakpoint.mdAndDown
                    ? cutText(item.contents[0], 400)
                    : cutText(item.contents[0], 500)
                }}
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <router-link :title="`Etalonnage en ${item.title}`" :to="`/activities/${item.param}`">
                  <v-btn
                    @click="goToTop()"
                    class="indigo--text mr-1"
                    text
                    plain
                  >
                    Voir plus de details
                    <v-icon class="ml-1" size="20">mdi-arrow-right</v-icon>
                  </v-btn>
                </router-link>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-hover>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  methods: {
    cutText(text, x) {
      if (text.length > x - 3) return text.slice(0, x) + "...";
      return text;
    },
    goToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },

  computed: {
    ...mapState(["activities"]),
  },
};
</script>

<style>
.smooth-transition {
  transition: all 0.3s;
}
</style>
