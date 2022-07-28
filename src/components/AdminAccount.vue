<template>
  <v-container>
    <h1
      class="text-center text-decoration-underline title-news mb-10"
      :class="$vuetify.breakpoint.smAndDown ? 'mt-16' : 'mt-5'"
    >
      Mon compte
    </h1>

    <!-- Metrotec banniere -->
    <v-container>
      <v-card>
        <div class="d-flex flex-wrap justify-left">
          <v-avatar class="ma-3" size="125" tile>
            <v-img contain src="../assets/metrotec-logo.png"></v-img>
          </v-avatar>
          <div>
            <v-card-title class="text-h5">Metrotec</v-card-title>

            <v-card-subtitle class="py-0">Abderraouf HARADJ</v-card-subtitle>
            <v-card-subtitle class="py-0"
              >contact@metrotec-algerie.com</v-card-subtitle
            >
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
      Mes clients
    </h1>

    <!-- Bouttons d'actions -->
    <v-card flat class="text-center">
      <v-btn
        @click="dialogAddUser = true"
        class="mx-2 mb-5"
        outlined
        color="success"
      >
        <v-icon left> mdi-plus </v-icon>
        Ajouter un client</v-btn
      >
      <v-btn
        @click="refreshClientsTable"
        class="mx-2 mb-5"
        outlined
        color="primary"
      >
        <v-icon left> mdi-refresh </v-icon>
        Actualiser</v-btn
      >
    </v-card>

    <!-- Table des clients -->
    <v-card v-if="clients.length">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Titre</th>
              <th class="text-left">Référent</th>
              <th class="text-left">E-mail</th>
              <th v-if="$vuetify.breakpoint.smAndUp" class="text-center">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in clients" :key="item.name">
              <td>
                <a @click="refreshSelectedClient(item)" target="_blank">{{
                  item.username
                }}</a>
              </td>
              <td>
                <span v-if="item.firstname && item.lastname">{{
                  item.firstname + " " + item.lastname
                }}</span>
                <span v-else class="grey--text font-italic">Non renseigné</span>
              </td>
              <td>
                <a :href="'mailto:' + item.email" target="_blank">{{
                  item.email
                }}</a>
              </td>
              <td class="text-center" v-if="$vuetify.breakpoint.smAndUp">
                {{ new Date(item.createdAt).toISOString().split("T")[0] }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>

    <div v-else class="text-center">{{ clientsListChargementText }}</div>

    <!--  -------
          Dialog
     -->

    <!-- Les details de l'utilisateur -->
    <v-dialog
      v-model="dialogFullScreen"
      v-if="selectedClient.idUser"
      fullscreen
      hide-overlay
      persistent
      transition="dialog-bottom-transition"
    >
      <v-card tile>
        <v-toolbar dark color="black">
          <v-btn icon dark @click="dialogFullScreen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{
            selectedClient.idUser + " - " + selectedClient.company
          }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialogFullScreen = false">Fermer</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-container grid-list-xs>
          <v-card tile flat>
            <v-subheader>Information du client</v-subheader>
            <v-card width="100%">
              <div class="d-flex flex-wrap justify-left">
                <v-avatar class="ma-3" size="125" tile>
                  <v-img contain :src="selectedClient.image"></v-img>
                </v-avatar>
                <div>
                  <v-card-title class="text-h5">{{
                    selectedClient.company
                  }}</v-card-title>

                  <v-card-subtitle class="py-0">
                    <span
                      v-if="selectedClient.firstname && selectedClient.lastname"
                      >{{
                        selectedClient.firstname + " " + selectedClient.lastname
                      }}</span
                    >
                    <span v-else-if="selectedClient.firstname">{{
                      selectedClient.firstname
                    }}</span>
                    <span v-else-if="selectedClient.lastname">{{
                      selectedClient.lastname
                    }}</span>
                    <span v-else class="grey--text font-italic"
                      >Non renseigné</span
                    >
                  </v-card-subtitle>

                  <v-card-subtitle class="py-0">
                    {{ selectedClient.email }}
                  </v-card-subtitle>
                  <v-card-subtitle class="py-0">
                    <span v-if="selectedClient.adress">{{
                      selectedClient.adress
                    }}</span>
                    <span v-else class="grey--text font-italic"
                      >Adresse non renseigné</span
                    >
                  </v-card-subtitle>
                  <v-card-subtitle class="py-0">
                    {{ selectedClient.phone }}
                  </v-card-subtitle>
                </div>
                <v-card-actions class="ml-auto">
                  <v-btn
                    @click="
                      () => {
                        clientModification = { ...selectedClient };
                        dialogModifyUser = true;
                      }
                    "
                    class="ma-2 mt-auto success--text"
                    outlined
                    small
                  >
                    <v-icon x-small left>mdi-pencil-outline</v-icon>
                    Modifier
                  </v-btn>
                </v-card-actions>
              </div>
            </v-card>

            <v-divider class="my-5 mx-auto" width="50%"></v-divider>

            <v-subheader>Les documents</v-subheader>

            <v-card flat class="text-center">
              <v-btn
                @click="dialogAddReport = true"
                class="mx-2 mb-5"
                outlined
                color="success"
              >
                <v-icon left> mdi-plus </v-icon>
                Ajouter un document</v-btn
              >
              <v-btn
                @click="refreshSelectedClient(selectedClient)"
                class="mx-2 mb-5"
                outlined
                color="primary"
                :loading="refreshClientsTableLoading"
              >
                <v-icon left> mdi-refresh </v-icon>
                Actualiser</v-btn
              >
            </v-card>

            <ReportTable isAdmin :informations="selectedClient" />
          </v-card>
        </v-container>
      </v-card>
    </v-dialog>

    <!-- Ajouter un nouvel utilisateur -->
    <v-dialog
      v-model="dialogAddUser"
      scrollable
      persistent
      :overlay="false"
      max-width="600px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Ajouter un client</span>
        </v-card-title>
        <v-card-text>
          <v-form
            @submit.prevent="addClient"
            ref="formAddUser"
            v-model="formValidAddUser"
          >
            <v-container grid-list-xs>
              <v-row>
                <v-col class="pb-0" cols="12" sm="6">
                  <v-text-field
                    dense
                    :rules="[rules.email]"
                    v-model="newClient.email"
                    type="email"
                    outlined
                    label="Email*"
                    autocomplete="off"
                    required
                  ></v-text-field>
                </v-col>
                <v-col class="pb-0" cols="12" sm="6">
                  <v-text-field
                    v-model="newClient.username"
                    :rules="[rules.required, rules.username]"
                    type="text"
                    dense
                    outlined
                    label="Nom d'utilisateur*"
                    autocomplete="off"
                    required
                  ></v-text-field>
                </v-col>
                <v-col class="pb-0" cols="12" sm="6">
                  <v-text-field
                    v-model="newClient.company"
                    :rules="[rules.required]"
                    type="text"
                    outlined
                    dense
                    label="Nom de la Compagnie*"
                    autocomplete="off"
                    required
                  ></v-text-field>
                </v-col>
                <v-col class="pb-0" cols="12" sm="6">
                  <v-text-field
                    v-model="newClient.phone"
                    :rules="[rules.required, rules.phone]"
                    :hint="getPhoneType(newClient.phone)"
                    persistent-hint
                    type="tel"
                    outlined
                    dense
                    label="Numéro de téléphone*"
                    autocomplete="off"
                    required
                  ></v-text-field>
                </v-col>
                <v-col class="pb-0" cols="12">
                  <v-text-field
                    v-model="newClient.password"
                    :rules="[rules.required]"
                    :type="showPassword ? 'text' : 'password'"
                    outlined
                    dense
                    label="Mot de passe*"
                    autocomplete="new-password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*Indique un champ obligatoire</small>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="grey darken-1"
                text
                @click="
                  () => {
                    this.dialogAddUser = false;
                    this.$refs.formAddUser.reset();
                  }
                "
                :disabled="addUserLoading"
              >
                Fermer
              </v-btn>
              <v-btn
                type="submit"
                color="blue darken-1"
                text
                :loading="addUserLoading"
              >
                Ajouter
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Modifier l'utilisateur -->
    <v-dialog
      v-model="dialogModifyUser"
      scrollable
      persistent
      :overlay="false"
      max-width="700px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">
            Modifier les information de {{ selectedClient.company }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-form
            @submit.prevent="modifyClient"
            ref="formModify"
            v-model="formValidModify"
          >
            <v-container grid-list-xs>
              <v-row>
                <v-col class="pb-0" cols="12" sm="6">
                  <v-text-field
                    dense
                    v-model="clientModification.firstname"
                    :rules="[rules.name]"
                    type="text"
                    outlined
                    label="Prénom"
                  ></v-text-field>
                </v-col>

                <v-col class="pb-0" cols="12" sm="6">
                  <v-text-field
                    dense
                    v-model="clientModification.lastname"
                    :rules="[rules.name]"
                    type="text"
                    outlined
                    label="Nom"
                    required
                  ></v-text-field>
                </v-col>

                <v-col class="pb-0" cols="12" sm="6">
                  <v-text-field
                    dense
                    :value="selectedClient.company"
                    type="text"
                    disabled
                    outlined
                    label="Nom de la Compagnie*"
                    required
                  ></v-text-field>
                </v-col>

                <v-col class="pb-0" cols="12" sm="6">
                  <v-text-field
                    dense
                    :rules="[rules.phone]"
                    v-model="clientModification.phone"
                    type="tel"
                    outlined
                    label="Numéro de téléphone*"
                    required
                  ></v-text-field>
                </v-col>

                <v-col class="pb-0" cols="12">
                  <v-text-field
                    dense
                    v-model="clientModification.image"
                    type="url"
                    outlined
                    label="URL de l'image de la compagnie*"
                    required
                  ></v-text-field>
                </v-col>

                <v-col class="pb-0" cols="12">
                  <v-textarea
                    v-model="clientModification.adress"
                    outlined
                    label="Adresse"
                    auto-grow
                    rows="2"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
            <small>*Indique un champ obligatoire</small>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="grey darken-1"
                text
                @click="dialogModifyUser = false"
              >
                Fermer
              </v-btn>
              <v-btn type="submit" color="blue darken-1" text> Modifier </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Ajouter un document -->
    <v-dialog
      v-model="dialogAddReport"
      scrollable
      persistent
      :overlay="false"
      max-width="700px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">
            Ajouter un document à {{ selectedClient.company }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-form
            @submit.prevent="addReport"
            ref="formAddReport"
            v-model="formValidAddReport"
          >
            <v-container grid-list-xs>
              <v-row>
                <v-col class="pb-0" cols="12">
                  <v-text-field
                    dense
                    v-model="newReport.title"
                    type="text"
                    :rules="[rules.required]"
                    outlined
                    label="Titre du document"
                  ></v-text-field>
                </v-col>

                <v-col class="pb-0" cols="12">
                  <v-text-field
                    dense
                    :value="selectedClient.company"
                    type="text"
                    disabled
                    outlined
                    label="Nom de la Compagnie*"
                  ></v-text-field>
                </v-col>

                <v-col class="pb-0" cols="12">
                  <v-file-input
                    label="Fichier à importer"
                    v-model="newReport.file"
                    outlined
                    dense
                  ></v-file-input>
                </v-col>
              </v-row>
            </v-container>
            <small>*Indique un champ obligatoire</small>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="grey darken-1"
                text
                @click="
                  () => {
                    dialogAddReport = false;
                    $refs.formAddReport.reset();
                    loading.addReport = false
                  }
                "
              >
                Fermer
              </v-btn>
              <v-btn
                type="submit"
                color="blue darken-1"
                text
                :loading="loading.addReport"
              >
                Valider
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

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
  </v-container>
</template>

<script>
import axios from "axios";
import axiosConfig from "../configurations/axiosConfig";
import ReportTable from "./ReportTable.vue";
export default {
  data: () => ({
    loading: {
      addReport: false,
    },
    snackbarInformation: {
      model: false,
      message: "",
      type: "success",
    },
    formValidModify: true,
    formValidAddUser: true,
    formValidAddReport: true,
    clients: [],
    clientModification: {},
    newClient: {},
    newReport: {},
    selectedClient: {},
    showPassword: false,
    dialogFullScreen: false,
    dialogAddReport: false,
    dialogAddUser: false,
    dialogModifyReport: false,
    dialogModifyUser: false,
    addUserLoading: false,
    addReportLoading: false,
    refreshClientsTableLoading: false,
    clientsListChargementText: "Vous n'avez aucun client",
    rules: {
      required: (value) => !!value || "Ce champ est obligatoire.",
      counter: (value) => value.length <= 20 || "Max 20 characters",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "E-mail invalide.";
      },
      phone: (value) => {
        const pattern = /^(00213|\+213|0)((5|6|7)[0-9]{8}|([1-48-9][0-9]{7}))$/;
        return pattern.test(value) || "Numéro téléphone invalide.";
      },
      name: (value) => {
        //eslint-disable-next-line
        const pattern = /^[a-zA-Z\é\è\ç\à\ê\î\ \-]+$/;
        return (
          pattern.test(value) ||
          value.length == 0 ||
          "Caractère invalide détecté."
        );
      },
      username: (value) => {
        const pattern = /^[a-zA-Z][a-zA-Z0-9]+$/;
        return pattern.test(value) || "Nom d'utilisateur invalide.";
      },
    },
  }),
  methods: {
    getPhoneType(value) {
      const ooredoo = /^(00213|\+213|0)((5)[0-9]{8})$/.test(value);
      const mobilis = /^(00213|\+213|0)((6)[0-9]{8})$/.test(value);
      const djezzy = /^(00213|\+213|0)((7)[0-9]{8})$/.test(value);
      const fixe = /^(00213|\+213|0)(([1-9][0-9]{7}))$/.test(value);
      if (ooredoo) return "Numéro : Ooredoo correct.";
      if (mobilis) return "Numéro : Mobilis correct.";
      if (djezzy) return "Numéro : Djezzy correct.";
      if (fixe) return "Numéro : Fixe correct.";
      return "";
    },
    async logout() {
      localStorage.removeItem("idUser");
      try {
        await axios(axiosConfig("GET", "/api/user/clear-cookies"))
      } catch (error) {
        console.log(error);
      }
      this.$router.go();
    },
    async refreshSelectedClient(item) {
      this.dialogFullScreen = true;
      this.selectedClient = { ...item };
      try {
        const response = await axios(
          axiosConfig("PUT", "/api/user/" + item.idUser)
        );
        if (response.data.idUser) {
          this.selectedClient = response.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    snackbarConfig(message, type) {
      this.snackbarInformation.message = message;
      this.snackbarInformation.type = type;
      this.snackbarInformation.model = true;
    },
    addClient() {
      if (this.$refs.formAddUser.validate()) {
        this.addUserLoading = true;
        axios(axiosConfig("POST", "/api/user/add-user", this.newClient))
          .then((response) => {
            this.snackbarConfig(response.data.message, "success");
            this.dialogAddUser = false;
            this.$refs.formAddUser.reset();
            this.addUserLoading = false;
            this.refreshClientsTable();
          })
          .catch((error) => {
            this.addUserLoading = false;
            console.log(error);
            const message =
              error.response.data.error || "Le client n'a pas pu être ajouté.";
            this.snackbarConfig(message, "error");
          });
      }
    },
    async refreshClientsTable() {
      this.refreshClientsTableLoading = true;
      try {
        this.clientsListChargementText = "Chargement...";
        const response = await axios(
          axiosConfig("GET", "/api/user/")
        );
        this.snackbarConfig("Table actuialisé avec succès.", "success");
        this.clients = response.data;
        this.clientsListChargementText = "Vous n'avez aucun client.";
      } catch (error) {
        this.clientsListChargementText =
          error.response.data.error ||
          "Erreur inattendue, vérifiez votre connexion internet.";
        this.snackbarConfig(this.clientsListChargementText, "error");
        console.log(error);
      }
      this.refreshClientsTableLoading = false;
    },
    async modifyClient() {
      if (this.$refs.formModify.validate()) {
        try {
          await axios(
            axiosConfig(
              "PUT",
              "/api/user/modify/" + this.clientModification.idUser,
              this.clientModification
            )
          );
          this.refreshClientsTable();
          this.dialogModifyUser = false;
          this.refreshSelectedClient(this.clientModification);
        } catch (error) {
          const message =
            error.response.data.error || "Le client n'a pas pu être modifié.";
          this.snackbarConfig(message, "error");
          console.log(error);
        }
      }
    },
    async addReport() {
      if (this.$refs.formAddReport.validate()) {
        this.loading.addReport = true;
        const formData = new FormData();
        formData.append("pdf", this.newReport.file, this.newReport.file.name);
        formData.append("company", this.selectedClient.company);
        formData.append("title", this.newReport.title);
        try {
          await axios(
            axiosConfig(
              "PUT",
              "/api/report/" + this.selectedClient.idUser,
              formData
            )
          );
          this.$refs.formAddReport.reset();
          this.refreshSelectedClient(this.selectedClient);
        } catch (error) {
          console.log(error);
          const message =
            error.response.data.error || "Le rapport n'a pas pu être ajouté.";
          this.snackbarConfig(message, "error");
        }
        this.dialogAddReport = false;
      }
      this.loading.addReport = false;
    },
  },
  mounted() {
    this.refreshClientsTable();
  },
  components: { ReportTable },
};
</script>

<style></style>
