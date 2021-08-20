<template>
  <v-app>
    <v-app-bar
      absolute
      app
      color="grey"
      dark
      height="180"
      src="https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=334&amp;q=80"
    >
      <v-row>
        <v-col cols="12" class="d-flex justify-center align-center">
          <div class="d-flex align-center">
            <v-img
              v-if="false"
              alt="Vuetify Logo"
              class="shrink mr-2"
              contain
              src="./assets/metrotec-logo.png"
              transition="scale-transition"
              width="30"
            />

            <v-img
              v-if="true"
              alt="Metrotec Logo"
              class="shrink mt-1"
              transition="scale-transition"
              contain
              min-width="100"
              src="./assets/metrotec-logo-name.png"
              width="250"
            />
          </div>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <v-bottom-navigation
        :background-color="color"
        v-model="value"
        grow
        dark
        :horizontal="!$vuetify.breakpoint.mobile"
        :shift="$vuetify.breakpoint.smAndDown"
        :fixed="$vuetify.breakpoint.smAndDown"
      >
        <v-btn>
          <span>Accueil</span>

          <v-icon class="mb-1">mdi-home</v-icon>
        </v-btn>

        <v-btn>
          <span>Actualités</span>

          <v-icon class="mb-1">mdi-newspaper</v-icon>
        </v-btn>

        <v-btn>
          <span>Présentation</span>

          <v-icon class="mb-1">mdi-creation</v-icon>
        </v-btn>

        <v-menu
          rounded
          offset-y
          open-on-hover
          :top="$vuetify.breakpoint.smAndDown"
        >
          <template v-slot:activator="{ attrs, on }">
            <v-btn v-bind="attrs" v-on="on">
              <span>
                Activités
                <v-icon size="20">
                  {{
                    $vuetify.breakpoint.smAndDown
                      ? "mdi-chevron-up"
                      : "mdi-chevron-down"
                  }}
                </v-icon>
              </span>
              <v-icon class="mb-1">mdi-check-all</v-icon>
            </v-btn>
          </template>

          <v-list >
            <v-list-item v-for="item in items" :key="item" link >
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn>
          <span>Contact</span>

          <v-icon class="mb-1">mdi-email</v-icon>
        </v-btn>
      </v-bottom-navigation>
      <NavBar />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    value: 1,
    items: [
      "Contrôle technique APV/APG/APL/APE",
      "Etalonnage et Tarage soupapes",
      "Contrôle Non Destructif",
      "Etude d'impact sur l'environnement PSI-EDD",
      "Expertise maritimes et industrielles",
      "Accompagnement et Formations",
    ],
  }),
  computed: {
    color() {
      switch (this.value) {
        case 0:
          return "blue-grey";
        case 1:
          return "teal";
        case 2:
          return "brown";
        case 3:
          return "indigo";
        default:
          return "blue-grey";
      }
    },
  },
};
</script>
