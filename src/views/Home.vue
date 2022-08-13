<template>
  <v-container fluid flat class="pa-0 ma-0">
    <v-container fluid class="pa-0">
      <v-hover v-slot="{ hover }">
        <v-card flat tile class="ma-0 pa-0">
          <v-row class="mt-O pt-0" align="stretch">
            <v-col class="pa-0" height="200%" width="100%" cols="12" md="7">
              <v-card tile flat height="100%">
                <v-img
                  class="text-center align-center"
                  dark
                  height="100%"
                  src="../assets/vitrine.jpeg"
                  gradient="to top left, rgba(0, 106, 255,.3), rgba(0, 0, 0,.8)"
                >
                  <p
                    :class="
                      $vuetify.breakpoint.mobile
                        ? 'slogan-size-mobile'
                        : 'slogan-size'
                    "
                    :style="
                      $vuetify.breakpoint.smAndDown ? 'margin-top: 100px;' : ''
                    "
                    class="slogan"
                  >
                    Qualité maîtrise et fiabilité...
                  </p>
                  <v-card
                    height="4"
                    :width="hover ? '300' : '17'"
                    class="ma-auto white smooth-transaction yellow darken-3"
                    flat
                  ></v-card>
                </v-img>
              </v-card>
            </v-col>

            <v-col cols="12" md="5" class="pa-0">
              <v-card
                :style="$vuetify.breakpoint.smAndDown ? 'height: 400px;' : ''"
                class="transparent ma-auto"
                tile
                flat
              >
                <v-img
                  :class="$vuetify.breakpoint.smAndDown ? 'ma-auto' : ''"
                  height="100%"
                  :width="$vuetify.breakpoint.mdAndUp ? '100%' : '100%'"
                  src="../assets/accreditation.jpeg"
                />
              </v-card>
            </v-col>
          </v-row>
          <p v-if="false" class="slogan subtitle-slogan">
            Découvrez de meilleures manières d’étalonner
          </p>
        </v-card>
      </v-hover>
    </v-container>

    <v-divider class="my-12 mx-12"></v-divider>

    <!-- Se connecter -->
    <v-container class="mx-0 mb-9 pa-0" fluid>
      <v-card
        dark
        class="d-flex align-center mx-0 pt-9 ask-for-login"
        width="100%"
        flat
        tile
      >
        <v-row
          align="center"
          :style="
            !$vuetify.breakpoint.smAndDown
              ? 'margin-left: 150px; margin-right: 150px;'
              : $vuetify.breakpoint.width > 450
              ? 'margin-left: 50px; margin-right: 50px;'
              : ''
          "
        >
          <v-col cols="12" md="6">
            <v-card-title
              class="text-lg-h3 text-h5 text-sm-h4 font-weight-black"
            >
              Vous être client ?
            </v-card-title>
            <v-card-text class="text-subtitile-1 text-md-h6">
              Consulter votre compte pour voir toutes les nouveautés.
            </v-card-text>
          </v-col>

          <v-col cols="12" md="6">
            <v-card-actions>
              <v-btn
                @click="goToAccount"
                elevation="4"
                outlined
                class="call-number mx-auto pa-5"
                >Consulter mon compte</v-btn
              >
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <v-container fluid class="ma-0 pa-0">
      <h1 class="text-center text-decoration-underline title-partnaires">
        Nos partenaires
      </h1>
      <v-slide-group
        class="pa-4"
        :show-arrows="$vuetify.breakpoint.xs ? false : true"
      >
        <v-slide-item
          cycle
          v-for="partnaire in partnaires"
          :key="partnaire.nom"
        >
          <v-card class="ma-2 pa-2" elevation="1">
            <v-img
              :width="$vuetify.breakpoint.mobile ? 60 : 120"
              :src="partnaire.url"
            />
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-container>

    <v-carousel
      cycle
      height="400"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item
        align="center"
        v-for="(slide, i) in activities"
        :key="i"
        :src="'http://localhost:3000' + slide.image"
      >
        <v-sheet
          class="transparent d-flex justify-center align-center"
          dark
          height="100%"
          width="100%"
        >
          <v-sheet
            class="d-flex justify-center align-center carrousel-text-background"
            height="50"
            width="100%"
          >
            <span>{{ slide.title }}</span>
          </v-sheet>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

    <!-- -->
    <v-divider class="my-12 mx-12"></v-divider>

    <v-container class="text-center ma-auto pa-0">
      <h1 class="text-decoration-underline title-partnaires mb-5">
        Metrotec Algerie
      </h1>
      <v-card class="transparent my-5" flat>
        <v-img class="mx-auto" width="350" src="../assets/accreditation.jpeg" />
      </v-card>
      <v-card class="ma-auto" flat width="80%">
        <span
          >MÉTROTEC ALGÉRIE, est accréditée selon la norme ISO/CEI 17025 version
          2017 par l’organisme algerien d’accréditation ALGERAC, pour les
          activités d’étalonnage DIMENSIONNEL.</span
        >
      </v-card>
    </v-container>

    <!-- adresse 
    <v-container fluid class="ma-0 pa-0">
      <h1 class="text-center text-decoration-underline title-partnaires">
        Adresse
      </h1>
      
    </v-container>
    -->
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      model: 0,
      activiteSlides: [
        {
          title: "Contrôle technique APV/APG/APL/APE",
          url: "https://images.unsplash.com/photo-1579154204845-5d7f8d4dc785?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
        },
        {
          title: "Etalonnage et Tarage soupapes",
          url: "https://images.unsplash.com/photo-1581087724844-037b13e16b0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=334&q=80",
        },
        {
          title: "Contrôle Non Destructif",
          url: "https://images.unsplash.com/photo-1531935015902-64b87c1f4da5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=376&q=80",
        },
        {
          title: "Etude d'impact sur l'environnement PSI-EDD",
          url: "https://images.unsplash.com/photo-1578496480240-32d3e0c04525?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
        },
        {
          title: "Expertise maritimes et industrielles",
          url: "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
        },
        {
          title: "Accompagnement et Formations",
          url: "https://images.unsplash.com/photo-1621463678002-1a7d3c9224f7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
        },
      ],
      partnaires: [
        {
          nom: "Buerkert",
          url: "https://www.lhybride.info/media/images/iconHP/Buerkert.jpg",
        },
        {
          nom: "Socorex Swissth",
          url: "https://www.lhybride.info/media/images/iconHP/Logo_Socorex_Swissth.jpg",
        },
        {
          nom: "BRAND",
          url: "https://www.lhybride.info/media/images/iconHP/BRAND.gif",
        },
        {
          nom: "EAS",
          url: "https://www.lhybride.info/media/images/iconHP/Logo_EAS.jpg",
        },
        {
          nom: "Batailler",
          url: "https://www.lhybride.info/media/images/iconHP/batailler.jpg",
        },
        {
          nom: "Waters",
          url: "https://www.lhybride.info/media/images/iconHP/Waters_logo.jpg",
        },
        {
          nom: "Huber",
          url: "https://www.lhybride.info/media/images/iconHP/Huber_Logo_140.jpg",
        },
        {
          nom: "Anton Paar",
          url: "https://www.lhybride.info/media/images/iconHP/anton-paar-logo-th.jpg",
        },
        {
          nom: "GERSTEL",
          url: "https://www.lhybride.info/media/images/iconHP/GERSTEL-140_70.png",
        },
        {
          nom: "Promega",
          url: "https://www.lhybride.info/media/images/iconHP/PromegaLogo.jpg",
        },
        {
          nom: "VWR Interim",
          url: "https://www.lhybride.info/media/images/iconHP/VWR_InterimLogo-th.jpg",
        },
        {
          nom: "FST",
          url: "https://www.lhybride.info/media/images/iconHP/FST-logobth2.jpg",
        },
        {
          nom: "Belleville",
          url: "https://www.lhybride.info/media/images/iconHP/bellevilleG.jpg",
        },
        {
          nom: "Enzo",
          url: "https://www.lhybride.info/media/images/iconHP/enzo.png",
        },
        {
          nom: "Lauda",
          url: "https://www.lhybride.info/media/images/iconHP/lauda18.jpg",
        },
        {
          nom: "BHmettler",
          url: "https://www.lhybride.info/media/images/iconHP/BHmettler.jpg",
        },
      ],
      urlImageAcrditation: "../assets/accreditation.jpeg",
    };
  },
  methods: {
    goToAccount() {
      if (this.$router.currentRoute.fullPath !== "/account") {
        this.$router.replace("/account");
        window.scrollTo(0, 0);
      }
    },
  },
  computed: {
    ...mapState(["activities"]),
  },
};
</script>

<style scoped>
.title-partnaires {
  font-family: "Cinzel Decorative", cursive;
  font-size: 25px;
}

.slogan {
  font-weight: 700;
  text-shadow: 1px 1px 3px #000000;
}

.subtitle-slogan {
  font-size: 17px;
}

.slogan-size-mobile {
  font-size: 35px;
  margin-left: 10px;
  margin-right: 10px;
}

.slogan-size {
  font-size: 58px;
  margin-left: 90px;
  margin-right: 90px;
}

.smooth-transaction {
  transition: all 1.2s;
}

.carrousel-text-background {
  margin-top: 125px;
  background: rgba(61, 61, 61, 0.5);
  font-size: 20px;
  font-weight: bold;
}

.row {
  margin: 0px;
  overflow: hidden;
}

.ask-for-login {
  background-color: #002a6b !important;
  background-image: linear-gradient(280deg, #002c67 0%, #00a0df 100%);
}

.ask-for-login .call-number {
  /* background-color: #002a6b !important; */
}
</style>
