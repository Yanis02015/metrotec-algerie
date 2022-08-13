<template>
  <v-container>
    <h1
      class="text-center text-decoration-underline title-news mb-10"
      :class="$vuetify.breakpoint.smAndDown ? 'mt-16' : 'mt-5'"
    >
      Mon compte
    </h1>

    <div v-if="loading">
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
    </div>

    <div v-else>
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
              @click="dialogModifyPassword = true"
              class="ma-2 mt-auto success--text"
              outlined
              small
            >
              Modification
            </v-btn>
            <v-btn
              @click="$emit('logout')"
              class="ma-2 mt-auto red--text"
              outlined
              small
            >
              Se déconnecter
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </div>

    <h1
      class="text-center text-decoration-underline title-news mb-10"
      :class="$vuetify.breakpoint.smAndDown ? 'mt-16' : 'mt-5'"
    >
      Mes rapports
    </h1>

    <v-card flat class="text-center">
      <v-btn
        @click="refreshInformations"
        class="mx-2 mb-5"
        outlined
        color="primary"
      >
        <v-icon left> mdi-refresh </v-icon>
        Actualiser</v-btn
      >
    </v-card>

    <ReportTable :informations="informations" />

    <v-dialog v-model="dialogModifyPassword" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Modifier mon mot de passe</span>
        </v-card-title>
        <v-card-text>
          <v-form
            @submit.prevent="modifyPassword"
            ref="formModifyPassword"
            v-model="formModifyPassword"
          >
            <v-container>
              <v-row>
                <v-col class="pb-0" cols="12">
                  <v-text-field
                    v-model="newPassword.oldPassword"
                    :rules="[rules.required]"
                    :type="showOldPassword ? 'text' : 'password'"
                    outlined
                    dense
                    label="Ancien mot de passe*"
                    autocomplete="current-password"
                    :append-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showOldPassword = !showOldPassword"
                    required
                  ></v-text-field>
                </v-col>
                <v-col class="pb-0" cols="12">
                  <v-text-field
                    v-model="newPassword.newPassword"
                    :rules="[rules.required]"
                    :type="showNewPassword ? 'text' : 'password'"
                    outlined
                    dense
                    label="Nouveau mot de passe*"
                    autocomplete="new-password"
                    :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showNewPassword = !showNewPassword"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="grey darken-1"
                plain
                text
                @click="
                  () => {
                    dialogModifyPassword = false;
                    $refs.formModifyPassword.reset();
                  }
                "
              >
                Fermer
              </v-btn>
              <v-btn
                color="blue darken-1"
                :loading="newPasswordLoading"
                text
                type="submit"
              >
                Valider
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
import axiosConfig from "../configurations/axiosConfig";
import ReportTable from "./ReportTable.vue";
import { mapActions } from "vuex";

export default {
  data: () => ({
    informations: {},
    newPassword: {},
    loading: true,
    dialogModifyPassword: false,
    formModifyPassword: true,
    attrs: {
      tile: true,
      boilerplate: false,
      elevation: 0,
    },
    showOldPassword: false,
    showNewPassword: false,
    newPasswordLoading: false,
    rules: {
      required: (value) => !!value || "Ce champ est obligatoire.",
    },
  }),
  methods: {
    ...mapActions(["snackbarConfig"]),
    async refreshInformations(isOnMouted) {
      const idUser = localStorage.getItem("idUser");
      let response;
      try {
        response = await axios(axiosConfig("PUT", "/api/user/" + idUser));
        this.informations = response.data;
        if (isOnMouted)
          this.snackbarConfig({
            message: "Donées récupéré avec succées!",
            type: "success",
          });
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async modifyPassword() {
      try {
        if (this.$refs.formModifyPassword.validate()) {
          this.newPasswordLoading = true;
          const response = await axios(
            axiosConfig(
              "PUT",
              "/api/user/modify-password/" + localStorage.getItem("idUser"),
              this.newPassword
            )
          );
          this.dialogModifyPassword = false;
          this.$refs.formModifyPassword.reset();
          this.snackbarConfig({
            message: response.data.message,
            type: "success",
          });
        }
      } catch (error) {
        const message =
          error.response.data.error ||
          "Erreur inattendue, vérifiez votre connexion internet.";
        this.snackbarConfig({
          type: "error",
          message: message,
        });
      } finally {
        this.newPasswordLoading = false;
      }
    },
  },
  mounted() {
    this.refreshInformations(false);
  },
  components: { ReportTable },
};
</script>

<style></style>
