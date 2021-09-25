<template>
  <v-app>
    <v-app-bar
      absolute
      app
      color="grey"
      dark
      :height="$vuetify.breakpoint.smAndDown ? 60 : 130"
      src="https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=334&amp;q=80"
    >
      <v-row>
        <v-col cols="12" class="d-flex justify-center align-center">
          <div class="d-flex align-center">
            <router-link to="/" v-if="!$vuetify.breakpoint.smAndDown">
              <v-img
                alt="Metrotec Logo"
                class="shrink mt-1"
                transition="scale-transition"
                contain
                min-width="100"
                src="./assets/metrotec-logo-name.png"
                width="200"
              />
            </router-link>
          </div>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main :class="$vuetify.breakpoint.smAndDown ? 'mb-14' : 'mb-0'">
      <!-- v-if="$vuetify.breakpoint.smAndDown" -->
      <v-card
        v-if="$vuetify.breakpoint.smAndDown"
        elevation="5"
        class="d-flex justify-center align-center"
        :class="color"
        width="100%"
        height="10"
        tile
      >
        <v-card id="logoTopOnMobile" elevation="5">
          <router-link to="/">
            <v-img
              v-if="true"
              alt="Metrotec Logo"
              class="shrink ma-2"
              transition="scale-transition"
              src="./assets/metrotec-logo-name.png"
              width="200"
            />
          </router-link>
        </v-card>
      </v-card>

      <v-bottom-navigation
        :background-color="color"
        v-model="modelBottomNavigation"
        grow
        dark
        :horizontal="!$vuetify.breakpoint.mobile"
        :shift="$vuetify.breakpoint.smAndDown"
        :fixed="$vuetify.breakpoint.smAndDown"
      >
        <v-btn @click="goToHome" id="bottom-navigation-bug-couleur">
          <span>Accueil</span>

          <v-icon class="mb-1">mdi-home</v-icon>
        </v-btn>

        <v-btn @click="goToNews" id="bottom-navigation-bug-couleur">
          <span>Actualités</span>

          <v-icon class="mb-1">mdi-newspaper</v-icon>
        </v-btn>

        <v-btn @click="goToPresentation" id="bottom-navigation-bug-couleur">
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
            <v-btn
              v-bind="attrs"
              v-on="on"
              @click="goToActivities"
              id="bottom-navigation-bug-couleur"
            >
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

          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index" link>
              <v-list-item-title @click="goToActivitiesMenu(index + 1)">{{
                item
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn @click="goToContact" id="bottom-navigation-bug-couleur">
          <span>Contact</span>

          <v-icon class="mb-1">mdi-email</v-icon>
        </v-btn>
      </v-bottom-navigation>
      <router-view />

      <!-- -->

      <v-footer padless class="mt-9">
        <v-card flat tile class="text-center" width="100%" id="background-footer">
          <!-- src="https://www.beamex.com/wp-content/uploads/2017/05/footerbg-1600x816.jpg" -->
            <v-card class="transparent grey--text text--darken-4" tile elevation="0">
              <router-link to="/">
                  <v-card
                    class="transparent mx-auto mt-9 pa-3"
                    width="270"
                    flat
                  >
                    <v-img
                      class="ma-auto"
                      width="100%"
                      src="./assets/metrotec-logo-name.png"
                    />
                  </v-card>
              </router-link>
              <p style="font-size: 20px" class="ml-4 mt-5">
                Qualité maîtrise et fiabilité...
              </p>
            </v-card>

            <v-divider class="mx-16"></v-divider>

            <v-card-text>
              <v-btn
                v-for="icon in icons"
                :key="icon.name"
                class="mx-4 grey--text text--darken-2"
                icon
                plain
              >
                <v-hover v-slot="{ hover }">
                  <v-icon :color="hover ? icon.color : ''" size="24px">
                    {{ icon.name }}
                  </v-icon>
                </v-hover>
              </v-btn>
            </v-card-text>

            <v-row class="grey--text text--darken-4 ma-0">
              <v-hover v-slot="{ hover }">
                <v-col cols="12" md="4">
                  <v-card-title class="text-h4">Qui sommes nous ?</v-card-title>
                  <v-card
                    height="4"
                    :width="hover ? '320' : '50'"
                    class="ml-4 mb-5 white"
                    :class="color"
                    style="margin-top: -8px; transition: all 1.2s;"
                    flat
                  ></v-card>
                    <v-card-text
                      :class="
                        hover ? 'grey--text text--darken-4' : 'grey--text text--darken-2'
                      "
                      class="pt-0 text-left"
                    >
                      Phasellus feugiat arcu sapien, et iaculis ipsum elementum
                      sit amet. Mauris cursus commodo interdum. Praesent ut
                      risus eget metus luctus accumsan id ultrices nunc.
                      <br /><br />
                      Sed at orci sed massa consectetur dignissim a sit amet
                      dui. Duis commodo vitae velit et faucibus. Morbi vehicula
                      lacinia malesuada. Nulla placerat augue vel ipsum
                      ultrices, cursus iaculis dui sollicitudin. Vestibulum eu
                      ipsum vel diam elementum tempor vel ut orci. Orci varius
                      natoque penatibus et magnis dis parturient montes,
                      nascetur ridiculus mus.
                    </v-card-text>
                </v-col>
              </v-hover>

              <v-hover v-slot="{ hover }">
                <v-col cols="12" md="4">
                  <v-card-title class="text-h4">Nos services</v-card-title>
                  <v-card
                    height="4"
                    :width="hover ? '215' : '50'"
                    class="ml-4 mb-5 white smooth-transaction"
                    :class="color"
                    style="margin-top: -8px; transition: all 1.2s;"
                    flat
                  ></v-card>
                  <v-card-text
                    v-for="(item, index) in items"
                    :key="index"
                    :class="
                      hover ? 'grey--text text--darken-4' : 'grey--text text--darken-2'
                    "
                    class="pt-0 text-left"
                  >
                    {{ index + 1 }} - {{ item }}
                  </v-card-text>
                </v-col>
              </v-hover>

              <v-hover v-slot="{ hover }">
                <v-col cols="12" md="4">
                  <v-card-title class="text-h4">Nous contacter</v-card-title>
                  <v-card
                    height="4"
                    :width="hover ? '255' : '50'"
                    class="ml-4 mb-5 white smooth-transaction"
                    :class="color"
                    style="margin-top: -8px; transition: all 1.2s;"
                    flat
                  ></v-card>
                  <v-card-text
                    :class="
                      hover ? 'grey--text text--darken-4' : 'grey--text text--darken-2'
                    "
                    class="pt-0 text-left"
                  >
                    <v-subheader
                      :class="hover ? 'text-decoration-underline' : ''"
                      style="margin-bottom: -20px; margin-top: -15px;"
                      >Téléphone</v-subheader
                    >
                    <v-card-text class="ml-5">
                      034 368 367
                      <br />
                      034 457 518
                      <br />
                      06 69 13 15 95
                    </v-card-text>
                    <v-subheader
                      :class="hover ? 'text-decoration-underline' : ''"
                      style="margin-bottom: -20px; margin-top: -15px;"
                      >Fax</v-subheader
                    >
                    <v-card-text class="ml-5">
                      034 368 367
                    </v-card-text>

                    <v-subheader
                      :class="hover ? 'text-decoration-underline' : ''"
                      style="margin-bottom: -20px; margin-top: -15px;"
                      >E-mail</v-subheader
                    >
                    <v-card-text class="ml-5">
                      contact@metrotec-algerie.com
                    </v-card-text>
                  </v-card-text>
                </v-col>
              </v-hover>
            </v-row>

            <v-divider></v-divider>

            <v-row class="align-center ma-0">
              <v-col cols="12" md="4">
                <v-card-text>
                  <div
                    :class="
                      $vuetify.breakpoint.smAndDown
                        ? 'justify-center'
                        : 'justify-start'
                    "
                    class="d-flex align-center"
                  >
                    <v-avatar class="mr-3" size="40">
                      <img
                        alt="yanis.indt"
                        src="./assets/yanis-indt-logo.jpg"
                      />
                    </v-avatar>
                    <v-card class="transparent" tile elevation="0">
                      <v-list-item-content
                        style="width: 100px;"
                        class="text-left py-0"
                      >
                        <v-list-item-title class="py-0"
                          >Réalisation</v-list-item-title
                        >
                        <v-list-item-subtitle class="py-0">
                          <!-- class="pink--text text--lighten-2" -->
                          <a
                            target="_blank"
                            :class="colorText"
                            href="https://instagram.com/yanis.indt"
                            >@yanis.indt</a
                          >
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-card>
                  </div>
                </v-card-text>
              </v-col>

              <v-col class="pa-0 ma-0" cols="12" md="4">
                <v-card-text class="black--text">
                  &#169; {{ new Date().getFullYear() }} Métrotech Algérie —
                  <strong>Tous Droits Réservés.</strong>
                </v-card-text>
              </v-col>
            </v-row>
        </v-card>
      </v-footer>
      
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "App",

  data: () => ({
    icons: [
      {
        name: "mdi-facebook",
        color: "blue darken-3",
      },
      {
        name: "mdi-twitter",
        color: "light-blue accent-3",
      },
      {
        name: "mdi-linkedin",
        color: "light-blue darken-2",
      },
      {
        name: "mdi-instagram",
        color: "pink accent-4",
      },
    ],
    items: [
      "Contrôle technique APV/APG/APL/APE",
      "Etalonnage et Tarage soupapes",
      "Contrôle Non Destructif",
      "Etude d'impact sur l'environnement PSI-EDD",
      "Expertise maritimes et industrielles",
      "Accompagnement et Formations",
    ],
    modelBottomNavigation: 0,
  }),
  methods: {
    ...mapActions(['goToActivitiesItem']),
    goToHome() {
      this.$router.replace("/");
    },
    goToNews() {
      this.$router.replace("/news");
      console.log("R = ", this.$route.fullPath);
    },
    goToPresentation() {
      this.$router.replace("/presentation");
    },
    goToActivities() {
      this.$router.replace("/activities");
    },
    goToActivitiesMenu(i) {
      let url = "/activities/" + i;
      this.$router.replace(url);
      
    },
    goToContact() {
      this.$router.replace("/contact");
    },
  },
  computed: {
    route() {
      return this.$route.fullPath;
    },
    navBarItemSelected() {
      let route = "" + this.route;
      switch (route) {
        case "/":
          return 0;
        case "/news":
          return 1;
        case "/presentation":
          return 2;
        case "/activities":
          return 3;
        case "/contact":
          return 4;
        default:
          if (route.includes("/activities/")) return 3;
          else return 5;
      }
    },
    color() {
      switch (this.navBarItemSelected) {
        case 0:
          return "yellow darken-3";
        case 1:
          return "teal";
        case 2:
          return "brown";
        case 3:
          return "indigo";
        case 4:
          return "blue-grey";
        default:
          return "grey";
      }
    },
    colorText() {
      switch (this.navBarItemSelected) {
        case 0:
          return "yellow--text text--darken-4";
        case 1:
          return "teal--text";
        case 2:
          return "brown--text";
        case 3:
          return "indigo--text";
        case 4:
          return "blue-grey--tex";
        default:
          return "blue-grey--text text--lighten-2";
      }
    },
  },
  beforeMount() {
    this.modelBottomNavigation = this.navBarItemSelected;
  },
};
</script>

<style>
p,
span {
  font-family: "Roboto", sans-serif;
}
a {
  color: pink;
  text-decoration: none;
}
#logoTopOnMobile {
  background: center/200%
    url("./assets/white-background.jpeg");
  position: absolute;
  z-index: 99;
  border: 3px solid white;
}

#background-footer {
  background: repeat-y top/100% url("./assets/white-background.jpeg");
}
/*
#background-footer:hover {
  background: no-repeat center/200%
    url("https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=334&amp;q=80");
}
*/
#bottom-navigation-bug-couleur {
  background-color: transparent !important;
  height: inherit !important;
}
</style>
