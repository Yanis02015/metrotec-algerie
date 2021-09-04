<template>
  <v-container :class="$vuetify.breakpoint.smAndDown ? 'mt-12' : 'mt-4'">
    <h1
      class="text-center text-decoration-underline title-activities mb-10 mt-5"
    >
      Nos activités
    </h1>
    <v-card v-for="(item, i) in items" :key="i" class="my-5" elevation="5">
      <v-hover v-slot="{ hover }">
        <v-row :class="hover ? 'indigo lighten-5' : ''" class="smooth-transition ma-0 pa-0">
          <v-col cols="12" md="5" class="ma-0 pa-0">
            <v-card class="ma-2" height="250" tile flat>
              <v-img
                height="250"
                class="ma-0"
                src="https://picsum.photos/510/300?random"
              />
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
                    ? cutText(lorem, 400)
                    : cutText(lorem, 500)
                }}
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="goToActivitiesItem(i + 1)" class="indigo--text mr-1" text plain>
                  Voir plus de details
                  <v-icon class="ml-1" size="20">mdi-arrow-right</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-hover>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Contrôle technique APV/APG/APL/APE",
          image: "",
        },
        {
          title: "Etalonnage et Tarage soupapes",
          image: "",
        },
        {
          title: "Contrôle Non Destructif",
          image: "",
        },
        {
          title: "Etude d'impact sur l'environnement PSI-EDD",
          image: "",
        },
        {
          title: "Expertise maritimes et industrielles",
          image: "",
        },
        {
          title: "Accompagnement et Formations",
          image: "",
        },
      ],
      lorem:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quas voluptas optio magnam reiciendis natus praesentium iusto.Eveniet, aliquid. Quae quam libero velit, delectus rem possimus quo Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quas voluptas optio magnam reiciendis natus praesentium iusto.Eveniet, aliquid. Quae quam libero velit, delectus rem possimus quo Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quas voluptas optio magnam reiciendis natus praesentium iusto.Eveniet, aliquid. Quae quam libero velit, delectus rem possimus quo Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quas voluptas optio magnam reiciendis natus praesentium iusto.Eveniet, aliquid. Quae quam libero velit, delectus rem possimus quo Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quas voluptas optio magnam reiciendis natus ",
    };
  },
  methods: {
    cutText(text, x) {
      if (text.length > x - 3) return text.slice(0, x) + "...";
      return text;
    },
    goToActivitiesItem(i) {
      let url = "/activities/" + i;
      this.$router.replace(url);
      
    },
  },
};
</script>

<style>
.title-activities {
  font-family: "Cinzel Decorative", cursive;
  font-size: 25px;
}

.smooth-transition {
    transition: all 0.3s;
}
</style>