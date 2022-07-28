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
        Se Connecter
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
      </v-container>
    </v-container>

    <UserAccount v-else />

    <v-snackbar
      :timeout="2000"
      color="error"
      right
      v-model="errorMessageHandler"
      transition="slide-x-reverse-transition"
    >
      <p class="font-weight-bold">
        {{ errorMessageResponse }}
      </p>
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          fab
          x-small
          class="error--text mr-2"
          v-bind="attrs"
          @click="errorMessageHandler = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import UserAccount from "../../components/UserAccount.vue";
const axiosConfig = require("../../configurations/axiosConfig");
const axios = require("axios");
export default {
  data: () => ({
    errorMessageHandler: false,
    loginBtnLoading: false,
    isLoading: true,
    isLogged: false,
    showPassword: false,
    login: "",
    password: "",
    valid: true,
    errorMessageResponse: "",
    loginValidation: true,
    passwordValidation: true,
  }),
  mounted() {
    this.startLogin();
  },
  methods: {
    async startLogin(body) {
      try {
        const response = await axios(
          axiosConfig("POST", "/api/user/login", body)
        );
        console.log(response);
        localStorage.setItem("idUser", response.data.idUser);
        this.isLogged = true;
      } catch (error) {
        this.errorMessageResponse =
          error.response.data && error.response.data.error
            ? error.response.data.error
            : "Erreur de connexion";
        this.errorMessageHandler = true;
        if (this.errorMessageResponse.includes("Mot de passe")) {
          this.passwordValidation = false;
        } else if (this.errorMessageResponse.includes("Utilisateur")) {
          this.loginValidation = false;
        }
        this.isLogged = false;
        this.$refs.form.validate();
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
      if (this.password) this.passwordValidation = true;
      this.$refs.form.validate()
    },
    password() {
      this.passwordValidation = true;
    },
  },
  components: { UserAccount },
};
</script>

<style></style>
