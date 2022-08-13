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

    <div v-else-if="!isLogged">
      <h1
        class="text-center text-decoration-underline title-news mb-10"
        :class="$vuetify.breakpoint.smAndDown ? 'mt-16' : 'mt-5'"
      >
        Se Connecter
      </h1>
      <div grid-list-xs>
        <v-row justify="center" no-gutters>
          <v-col cols="12" md="6" sm="10">
            <v-card flat>
              <v-card-text>
                <v-form @submit.prevent="submit" ref="form" v-model="valid">
                  <v-text-field
                    v-model="login"
                    :rules="[
                      () => !!login || 'Ce champ est requis',
                      () => loginValidation || 'Le login est incorrect',
                    ]"
                    outlined
                    prepend-icon="mdi-account"
                    name="login"
                    label="Login"
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
                      :loading="loginBtnLoading"
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
      </div>
    </div>

    <UserAccount @logout="logout" v-else />
  </v-container>
</template>

<script>
import UserAccount from "../../components/UserAccount.vue";
import { mapActions } from "vuex";

const axiosConfig = require("../../configurations/axiosConfig");
const axios = require("axios");
export default {
  data: () => ({
    loginBtnLoading: false,
    isLoading: true,
    isLogged: false,
    showPassword: false,
    login: "",
    password: "",
    valid: true,
    loginValidation: true,
    passwordValidation: true,
  }),
  mounted() {
    this.startLogin();
  },
  methods: {
    ...mapActions(["snackbarConfig"]),
    async logout() {
      localStorage.removeItem("idUser");
      try {
        await axios(axiosConfig("GET", "/api/user/clear-cookies"));
        this.snackbarConfig({
          message: "À très bientôt.",
          type: "warning",
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.startLogin();
      }
    },
    async startLogin(body) {
      try {
        const response = await axios(
          axiosConfig("POST", "/api/user/login", body)
        );
        localStorage.setItem("idUser", response.data.idUser);
        if (body)
          this.snackbarConfig({
            message: response.data.message || "",
            type: "success",
          });
        this.isLogged = true;
      } catch (error) {
        this.isLogged = false;
        if (body) {
          const message =
            error.response.data && error.response.data.error
              ? error.response.data.error
              : "Erreur de connexion";
          this.snackbarConfig({ message: message, type: "error" });
          if (message.includes("Mot de passe")) {
            this.passwordValidation = false;
          } else if (message.includes("Utilisateur")) {
            this.loginValidation = false;
          }
          this.$refs.form.validate();
        }
      } finally {
        this.loginBtnLoading = false;
        this.isLoading = false;
      }
    },

    submit() {
      if (this.$refs.form.validate()) {
        this.loginBtnLoading = true;
        this.startLogin({ login: this.login, password: this.password });
      }
    },
  },
  watch: {
    login() {
      this.loginValidation = true;
      if (this.password.length > 0) {
        this.passwordValidation = true;
        this.$refs.form.validate();
      }
    },
    password() {
      this.passwordValidation = true;
    },
  },
  components: { UserAccount },
};
</script>

<style></style>
