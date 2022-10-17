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
            <router-link
              aria-label="Revenir à la home page"
              to="/"
              v-if="!$vuetify.breakpoint.smAndDown"
            >
              <v-img
                alt="Metrotec Logo"
                class="shrink mt-1"
                transition="scale-transition"
                contain
                min-width="100"
                src="./assets/metrotec-logo-name.webp"
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
          <router-link to="/" aria-label="Revenir à la home page">
            <v-img
              v-if="true"
              alt="Metrotec Logo"
              class="shrink ma-2"
              transition="scale-transition"
              src="./assets/metrotec-logo-name.webp"
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
        <v-btn to="/" @click="goToTop" class="bottom-navigation-bug-couleur">
          <span>Accueil</span>

          <v-icon class="mb-1">mdi-home</v-icon>
        </v-btn>

        <v-btn
          to="/news"
          @click="goToTop"
          class="bottom-navigation-bug-couleur"
        >
          <span>Actualités</span>

          <v-icon class="mb-1">mdi-newspaper</v-icon>
        </v-btn>

        <v-btn
          to="/presentation"
          @click="goToTop"
          class="bottom-navigation-bug-couleur"
        >
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
              to="/activities"
              @click="goToTop"
              class="bottom-navigation-bug-couleur"
            >
              <span>
                Étalonnage
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
            <v-list-item
              :to="`/activities/${item.param}`"
              @click="goToTop"
              v-for="(item, index) in activities"
              :key="index"
              link
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn
          v-if="$vuetify.breakpoint.mdAndUp"
          to="/contact"
          @click="goToTop"
          class="bottom-navigation-bug-couleur"
        >
          <span>Contact</span>

          <v-icon class="mb-1">mdi-email</v-icon>
        </v-btn>

        <v-btn
          to="/account"
          @click="goToTop"
          class="bottom-navigation-bug-couleur"
        >
          <span>Mon compte</span>

          <v-icon class="mb-1">mdi-account</v-icon>
        </v-btn>
      </v-bottom-navigation>
      <router-view />

      <!-- Footer -->
      <v-footer padless class="mt-9">
        <v-card
          flat
          tile
          class="text-center"
          width="100%"
          id="background-footer"
        >
          <!-- src="https://www.beamex.com/wp-content/uploads/2017/05/footerbg-1600x816.jpg" -->
          <v-card
            class="transparent grey--text text--darken-4"
            tile
            elevation="0"
          >
            <router-link to="/" aria-label="Revenir à la home page">
              <v-card class="transparent mx-auto mt-9 pa-3" width="270" flat>
                <v-img
                  class="ma-auto"
                  width="100%"
                  src="./assets/metrotec-logo-name.webp"
                />
              </v-card>
            </router-link>
            <p style="font-size: 20px" class="ml-4 mt-5">
              Qualité maîtrise et fiabilité...
            </p>
          </v-card>

          <v-divider class="mx-16"></v-divider>

          <v-card-text>
            <a
              :href="icon.link"
              target="_blank"
              :title="icon.name"
              v-for="icon in icons"
              :key="icon.name"
            >
              <v-btn
                class="mx-4 grey--text text--darken-2"
                icon
                :aria-label="icon.ariaLabel"
                plain
              >
                <v-hover v-slot="{ hover }">
                  <v-icon :color="hover ? icon.color : ''" size="24px">
                    {{ icon.name }}
                  </v-icon>
                </v-hover>
              </v-btn>
            </a>
          </v-card-text>

          <v-row class="grey--text text--darken-4 ma-0">
            <v-hover v-slot="{ hover }">
              <v-col cols="12" md="4">
                <v-card-title class="text-h4">Qui sommes nous ?</v-card-title>
                <v-card
                  height="4"
                  :width="hover ? '320' : '50'"
                  class="ml-4 mb-5"
                  :class="color"
                  style="margin-top: -8px; transition: all 1.2s"
                  flat
                ></v-card>
                <v-card-text
                  :class="
                    hover
                      ? 'grey--text text--darken-4'
                      : 'grey--text text--darken-2'
                  "
                  class="pt-0 text-left"
                >
                  METROTEC ALGÉRIE est une SARL, résidente au capital de
                  100.000&nbsp;DA, qui a été créé en 2014, située à Bordj Bou
                  Arreridj (34000) en Algérie, accréditée par l’organisme
                  algérien d’accréditation ALGERAC, pour les activités
                  d’étalonnage DIMENSIONNEL :
                  <br /><br />
                  * Pour sa première fois en 2019 selon la norme ISO/CEI 17025
                  version 2005 (initiale)
                  <br />
                  * Décembre 2020 ISO/CEI 17025 version 2017 nouvelle version
                  <br />
                  * Et en mai 2022 ISO/CEI 17025 version 2017 pour sa deuxième
                  fois (renouvellement)
                </v-card-text>
              </v-col>
            </v-hover>

            <v-hover v-slot="{ hover }">
              <v-col cols="12" md="4">
                <v-card-title class="text-h4">Nos services</v-card-title>
                <v-card
                  height="4"
                  :width="hover ? '215' : '50'"
                  class="ml-4 mb-5 smooth-transaction"
                  :class="color"
                  style="margin-top: -8px; transition: all 1.2s"
                  flat
                ></v-card>

                <v-card-text
                  v-for="(item, index) in activities"
                  :key="index"
                  :class="
                    hover
                      ? 'grey--text text--darken-4'
                      : 'grey--text text--darken-2'
                  "
                  class="pt-0 text-left"
                >
                  <Link
                    :href="`/activities/${item.param}`"
                    :text="`${index + 1} - ${item.title}`"
                    :color="colorText"
                    :title="`Etalonnage en ${item.title}`"
                    routerLink
                  />
                </v-card-text>
              </v-col>
            </v-hover>

            <v-hover v-slot="{ hover }">
              <v-col cols="12" md="4">
                <v-card-title class="text-h4">Nous contacter</v-card-title>
                <v-card
                  height="4"
                  :width="hover ? '255' : '50'"
                  class="ml-4 mb-5 smooth-transaction"
                  :class="color"
                  style="margin-top: -8px; transition: all 1.2s"
                  flat
                ></v-card>
                <v-card-text
                  :class="
                    hover
                      ? 'grey--text text--darken-4'
                      : 'grey--text text--darken-2'
                  "
                  class="pt-0 text-left"
                >
                  <v-subheader
                    :class="hover ? 'text-decoration-underline' : ''"
                    style="margin-bottom: -20px; margin-top: -15px"
                    >Téléphone</v-subheader
                  >
                  <v-card-text class="ml-5">
                    <Link
                      :href="'tel:+21335768414'"
                      :text="'+213 (0) 35 76 84 14'"
                      :color="colorText"
                    />

                    <br />
                    <Link
                      :href="'tel:+21334803559'"
                      :text="'+213 (0) 34 80 35 59'"
                      :color="colorText"
                    />
                    <span>&ensp;(annexe Béjaïa)</span>

                    <br />
                    <br />
                    <Link
                      :href="'tel:+213663017897'"
                      :text="'+213 (0) 663 017 897'"
                      :color="colorText"
                    />
                    <br />
                    <Link
                      :href="'tel:+213542228088'"
                      :text="'+213 (0) 542 228 088'"
                      :color="colorText"
                    />
                  </v-card-text>
                  <v-subheader
                    :class="hover ? 'text-decoration-underline' : ''"
                    style="margin-bottom: -20px; margin-top: -15px"
                    >Fax</v-subheader
                  >
                  <v-card-text class="ml-5">
                    <Link
                      :href="'tel:+21335768414'"
                      :text="'+213 (0) 35 76 84 14'"
                      :color="colorText"
                    />

                    <br />
                    <Link
                      :href="'tel:+21334803559'"
                      :text="'+213 (0) 34 80 35 59'"
                      :color="colorText"
                    />
                    <span> (annexe Béjaïa)</span>
                  </v-card-text>

                  <v-subheader
                    :class="hover ? 'text-decoration-underline' : ''"
                    style="margin-bottom: -20px; margin-top: -15px"
                    >E-mail</v-subheader
                  >
                  <v-card-text class="ml-5">
                    <Link
                      :href="'mailto:contact@metrotec-algerie.com'"
                      :text="'contact@metrotec-algerie.com'"
                      :color="colorText"
                    />
                    <br />
                    <Link
                      :href="'mailto:a.haradj@metrotec-algerie.com'"
                      :text="'a.haradj@metrotec-algerie.com'"
                      :color="colorText"
                    />
                    <br />
                    <Link
                      :href="'mailto:i.touloum@metrotec-algerie.com'"
                      :text="'i.touloum@metrotec-algerie.com'"
                      :color="colorText"
                    />
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
                      style="width: 40px; height: 40px"
                      src="./assets/yanis-indt-logo.webp"
                    />
                  </v-avatar>
                  <v-card class="transparent" tile elevation="0">
                    <v-list-item-content
                      style="width: 100px"
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
                          href="https://yanis.dev"
                          >www.yanis.dev</a
                        >
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-card>
                </div>
              </v-card-text>
            </v-col>

            <v-col class="pa-0 ma-0" cols="12" md="4">
              <v-card-text :class="'black--text'">
                &#169; {{ new Date().getFullYear() }} Métrotech Algérie —
                <strong>Tous Droits Réservés.</strong>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-footer>

      <div
        v-if="
          $vuetify.breakpoint.smAndDown &&
          $router.currentRoute.fullPath !== '/contact'
        "
        class="elevation-button-contact"
      >
        <v-btn
          to="/contact"
          @click="goToTop"
          class="mx-2"
          fab
          dark
          :color="color"
          aria-label="Nous contacter | Envoyer une demande"
        >
          <v-icon dark> mdi-email</v-icon>
        </v-btn>
      </div>

      <v-snackbar
        :timeout="2000"
        :color="snackbarInformation.type"
        right
        v-model="snackbarInformation.model"
        transition="slide-x-reverse-transition"
      >
        <p class="font-weight-bold">
          {{ snackbarInformation.message }}
        </p>
        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            fab
            x-small
            :class="`${snackbarInformation.type}--text mr-2`"
            v-bind="attrs"
            @click="snackbarInformation.model = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import Link from "./components/Link.vue";

export default {
  name: "App",
  data: () => ({
    icons: [
      {
        name: "mdi-facebook",
        color: "blue darken-3",
        ariaLabel: "Nous rejoindre sur facebook",
        link: "https://www.facebook.com/people/Metrotec-Algerie/100063672957265/",
      },
      {
        name: "mdi-twitter",
        color: "light-blue accent-3",
        ariaLabel: "Nous rejoindre sur twitter",
        link: "#",
      },
      {
        name: "mdi-linkedin",
        color: "light-blue darken-2",
        ariaLabel: "Nous rejoindre sur linkedin",
        link: "#",
      },
      {
        name: "mdi-instagram",
        color: "pink accent-4",
        ariaLabel: "Nous rejoindre sur instagram",
        link: "#",
      },
    ],
    modelBottomNavigation: 0,
  }),
  methods: {
    goToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
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
        case "/account":
          return 5;
        default:
          if (route.includes("/activities/")) return 3;
          else return 6;
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
        case 5:
          return "black";
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
          return "blue-grey--text";
        case 5:
          return "black--text";
        default:
          return "blue-grey--text text--lighten-2";
      }
    },
    ...mapState(["snackbarInformation", "activities"]),
  },
  beforeMount() {
    this.$route;
    this.modelBottomNavigation = this.navBarItemSelected;
  },
  watch: {
    $route: {
      handler(to) {
        if (to.name === "ActivitieItem") {
          console.log(to.params.activity);
          return (document.title =
            `${
              this.activities.find(
                (activity) => activity.param === this.$route.params.activity
              ).title
            } | METROTEC ALGERIE` ||
            "Laboratoire d'étalonnage et vérification | METROTEC ALGERIE");
        }
        document.title =
          to.meta.title ||
          "Laboratoire d'étalonnage et vérification | METROTEC ALGERIE";
      },
      immediate: true
    },
  },
  components: { Link },
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
  background: center/200% url("./assets/white-background.webp");
  position: absolute;
  z-index: 99;
  border: 3px solid white;
}

#background-footer {
  background: repeat-y top/100% url("./assets/white-background.webp");
}
/*
#background-footer:hover {
  background: no-repeat center/200%
    url("https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=334&amp;q=80");
}
*/
.bottom-navigation-bug-couleur {
  background-color: transparent !important;
  height: inherit !important;
}

.elevation-button-contact {
  position: fixed;
  bottom: 90px;
  right: 10px;
  z-index: 99;
}
</style>
