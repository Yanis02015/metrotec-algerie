<template>
  <v-container>
    <h1
      class="text-center text-decoration-underline title-news mb-10"
      :class="$vuetify.breakpoint.smAndDown ? 'mt-16' : 'mt-5'"
    >
      Mon compte
    </h1>

    <v-container v-if="loading">
      <v-card elevation="1" class="ma-0 pa-0" tile>
        <v-row class="pa-0 ma-0">
          <v-col cols="12" md="4" sm="6" class="pa-0 ma-0">
            <v-skeleton-loader v-bind="attrs" type="image"></v-skeleton-loader>
          </v-col>
          <v-col cols="12" md="8" sm="6"
            ><v-skeleton-loader
              v-bind="attrs"
              type="article"
            ></v-skeleton-loader>
            <v-row class="ma-0" justify="end">
              <v-skeleton-loader
                v-bind="attrs"
                class="pr-4"
                type="button"
                height="30"
              ></v-skeleton-loader>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <v-container v-else>
      <v-card>
        <div class="d-flex flex-wrap justify-left">
          <v-avatar class="ma-3" size="125" tile>
            <v-img contain :src="informations.image"></v-img>
          </v-avatar>
          <div>
            <v-card-title class="text-h5">{{
              informations.company
            }}</v-card-title>
            <v-card-subtitle class="py-0">
              <span v-if="informations.firstname && informations.lastname">{{
                informations.firstname + " " + informations.lastname
              }}</span>
              <span
                v-else-if="informations.firstname || informations.lastname"
                >{{
                  informations.firstname || informations.lastname || "yp"
                }}</span
              >
              <span class="grey--text font-italic" v-else>Non renseigné</span>
            </v-card-subtitle>
            <v-card-subtitle class="py-0">{{
              informations.email
            }}</v-card-subtitle>
            <v-card-subtitle v-if="informations.adress" class="py-0">{{
              informations.adress
            }}</v-card-subtitle>
            <v-card-subtitle class="py-0">{{
              informations.phone
            }}</v-card-subtitle>
          </div>
          <v-card-actions class="ml-auto">
            <v-btn
              @click="logout"
              class="ma-2 mt-auto red--text"
              outlined
              small
            >
              Se déconnecter
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-container>

    <h1
      class="text-center text-decoration-underline title-news mb-10"
      :class="$vuetify.breakpoint.smAndDown ? 'mt-16' : 'mt-5'"
    >
      Mes rapports
    </h1>

    <ReportTable :informations="informations" />

    <a v-if="downloadLink" :href="downloadLink">Télécharger</a>
  </v-container>
</template>

<script>
import axios from "axios";
import axiosConfig from "../configurations/axiosConfig";
import ReportTable from "./ReportTable.vue";
export default {
  data: () => ({
    downloadLink: "",
    informations: {},
    loading: true,
    attrs: {
      tile: true,
      boilerplate: false,
      elevation: 0,
    },
  }),
  methods: {
    async logout() {
      localStorage.removeItem("idUser");
      try {
        await axios(axiosConfig("GET", "/api/user/clear-cookies"));
      } catch (error) {
        console.log(error);
      }
      this.$router.go();
    },
    async refreshInformations() {
      this.loading = true;
      const idUser = localStorage.getItem("idUser");
      let response;
      try {
        response = await axios(axiosConfig("PUT", "/api/user/" + idUser));
        console.log(response.data);
        this.informations = response.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.refreshInformations();
  },
  components: { ReportTable },
};
</script>

<style></style>
