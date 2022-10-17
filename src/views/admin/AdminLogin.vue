<template>
  <v-container>
    <v-card
      v-if="isLoading"
      flat
      style="height: 60vh"
      class="text-center d-flex flex-column align-center justify-center"
    >
      <v-progress-circular
        :size="70"
        color="primary"
        indeterminate
      ></v-progress-circular>
      <v-card-text class="pt-6">Chargment... </v-card-text>
    </v-card>

    <v-container v-else-if="!isLogged">
      <h1
        class="text-center text-decoration-underline title-news mb-10"
        :class="$vuetify.breakpoint.smAndDown ? 'mt-16' : 'mt-5'"
      >
        Administration connexion
      </h1>
      <v-container grid-list-xs>
        <v-row justify="center" no-gutters>
          <v-col cols="12" md="6" sm="10">
            <v-card flat>
              <v-card-text>
                <v-form @submit.prevent="submit" ref="form" v-model="valid">
                  <v-text-field
                    v-model="login"
                    :rules="[
                      () => !!login || 'Ce champ est requis',
                      () =>
                        loginValidation ||
                        'Le Nom administrateur est incorrect',
                    ]"
                    outlined
                    prepend-icon="mdi-account"
                    name="login"
                    label="Nom administrateur"
                    type="text"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    outlined
                    prepend-icon="mdi-lock"
                    :rules="[
                      () => !!password || 'Ce champ est requis',
                      () =>
                        passwordValidation || 'Le mot de passe est incorrect',
                    ]"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    name="password"
                    label="Password"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                    required
                  ></v-text-field>
                  <v-card-actions class="justify-center">
                    <v-btn
                      :disabled="!valid"
                      class="p-1"
                      type="submit"
                      color="black white--text"
                      >Se connecter
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <AdminAccount @logout="logout" v-else />
  </v-container>
</template>

<script>
import AdminAccount from "../../components/AdminAccount.vue";
import { mapActions } from "vuex";

const axiosConfig = require("../../configurations/axiosConfig");
const axios = require("axios");
export default {
  data: () => ({
    isLoading: true,
    isLogged: false,
    showPassword: false,
    login: "",
    password: "",
    valid: true,
    loginValidation: true,
    passwordValidation: true,
  }),
  async mounted() {
    try {
      let response = await axios(axiosConfig("POST", "/api/user/login-admin"));
      if (response.status === 200) this.isLogged = true;

      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      this.isLogged = false;
    }
  },
  methods: {
    ...mapActions(["snackbarConfig"]),
    submit() {
      if (this.$refs.form.validate()) {
        axios(
          axiosConfig("POST", "/api/user/login-admin", {
            login: this.login,
            password: this.password,
          })
        )
          .then(() => (this.isLogged = true))
          .catch((error) => {
            const errorMessageResponse =
              error.response.data.error || "Erreur de connexion";
            this.snackbarConfig({
              type: "error",
              message: errorMessageResponse,
            });
            if (errorMessageResponse.includes("Mot de passe")) {
              this.passwordValidation = false;
            } else if (errorMessageResponse.includes("Utilisateur")) {
              this.loginValidation = false;
            }
            this.$refs.form.validate();
          });
      }
    },
    async logout() {
      localStorage.removeItem("idUser");
      try {
        await axios(axiosConfig("GET", "/api/user/clear-cookies"));
        this.snackbarConfig({
          message: "À très bientôt.",
          type: "warning",
        });
        this.$router.go(0);
      } catch (error) {
        this.snackbarConfig({
          message: "Erreur réseau.",
          type: "error",
        });
      }
    },
  },
  watch: {
    login() {
      this.loginValidation = true;
      if (this.password.length > 0) this.passwordValidation = true;
      if (this.isLoading && !this.isLogged) this.$refs.form.validate();
    },
    password() {
      this.passwordValidation = true;
    },
  },
  components: { AdminAccount },
};
</script>

<style></style>
