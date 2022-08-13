<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    persistent
    hide-overlay
    transition="dialog-transition"
  >
    <v-card tile>
      <v-toolbar dark color="black">
        <v-btn icon dark @click="() => $emit('disableDialogNews')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Les actualitées</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark plain text @click="() => $emit('disableDialogNews')"
            >Fermer</v-btn
          >
        </v-toolbar-items>
      </v-toolbar>

      <v-container grid-list-xs>
        <v-card tile flat>
          <v-subheader>Les actualitées Métrotec Algérie</v-subheader>

          <v-card flat class="text-center">
            <v-btn
              @click="dialogAddNews = true"
              class="mx-2 mb-5"
              outlined
              color="success"
            >
              <v-icon left> mdi-plus </v-icon>
              Ajouter une actualité</v-btn
            >
            <v-btn
              @click="refreshNews"
              class="mx-2 mb-5"
              outlined
              color="primary"
              :loading="refreshNewsTableLoading"
            >
              <v-icon left> mdi-refresh </v-icon>
              Actualiser</v-btn
            >
          </v-card>

          <NewsTable ref="newsTable" />
        </v-card>
      </v-container>
    </v-card>

    <v-dialog
      v-model="dialogAddNews"
      persistent
      :overlay="false"
      max-width="500px"
      max-height="90vh"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5"> Ajouter une actualité </span>
        </v-card-title>
        <v-card-text>
          <v-form
            @submit.prevent="addNews()"
            ref="formAddNews"
            v-model="formValidAddNews"
          >
            <v-container grid-list-xs>
              <v-row>
                <v-col class="pb-0" cols="12">
                  <v-text-field
                    dense
                    v-model="newNews.title"
                    type="text"
                    :rules="[rules.required]"
                    outlined
                    label="Titre du l'actualité"
                  ></v-text-field>
                </v-col>

                <v-col class="pb-0" cols="12">
                  <v-textarea
                    v-model="newNews.description"
                    outlined
                    label="Description de l'actualité*"
                    :rules="[rules.required]"
                    auto-grow
                    rows="2"
                  ></v-textarea>
                </v-col>

                <v-col class="pb-0" cols="12">
                  <v-file-input
                    dense
                    accept="image/png, image/jpeg, image/jpg"
                    v-model="newNews.file"
                    :rules="[rules.required]"
                    outlined
                    label="L'image de la nouveauté*"
                  ></v-file-input>
                </v-col>

                <v-col class="pb-0" cols="12">
                  <v-dialog
                    ref="datePickerDialog"
                    v-model="datePickerModel"
                    :return-value.sync="newNews.date"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="newNews.date"
                        label="Date de l'actualité"
                        prepend-icon="mdi-calendar"
                        readonly
                        outlined
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="newNews.date"
                      scrollable
                      locale="fr-fr"
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="datePickerModel = false"
                      >
                        Annuler
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.datePickerDialog.save(newNews.date)"
                      >
                        Valider
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
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
                    dialogAddNews = false;
                    $refs.formAddNews.reset();
                    loading.addNews = false;
                  }
                "
              >
                Fermer
              </v-btn>
              <v-btn
                type="submit"
                color="blue darken-1"
                text
                :loading="loading.addNews"
              >
                Ajouter
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script>
import axios from "axios";
import axiosConfig from "../../configurations/axiosConfig";
import NewsTable from "./NewsTable.vue";
import { mapActions } from "vuex";

export default {
  props: {
    dialog: {
      type: Boolean,
      default: () => false,
      required: true,
    },
  },
  data: () => ({
    formValidAddNews: true,
    newNews: {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substring(0, 10),
    },
    datePickerModel: false,
    dialogAddNews: false,
    loading: {
      addNews: false,
    },
    refreshNewsTableLoading: false,
    rules: {
      required: (value) => !!value || "Ce champ est obligatoire.",
    },
  }),
  mounted() {},
  methods: {
    ...mapActions(["snackbarConfig"]),
    refreshNews() {
      this.$refs.newsTable.refreshNewsTable("OPTION1");
    },
    async addNews() {
      if (this.$refs.formAddNews.validate()) {
        this.loading.addNews = true;
        const formData = new FormData();
        formData.append("file", this.newNews.file, this.newNews.file.name);
        formData.append("title", this.newNews.title);
        formData.append("description", this.newNews.description);
        formData.append("date", this.newNews.date);
        try {
          const response = await axios(
            axiosConfig("POST", "/api/news/", formData)
          );
          this.snackbarConfig({
            type: "success",
            message: response.data.message,
          });
          this.dialogAddNews = false;
          this.$refs.formAddNews.reset();
          this.$refs.newsTable.refreshNewsTable();
        } catch (error) {
          const message =
            error.response.data.error || "L'actualité n'a pas pu être ajouté.";
          this.snackbarConfig({
            type: "error",
            message: message,
          });
        } finally {
          this.loading.addNews = false;
        }
      }
    },
  },
  components: { NewsTable },
};
</script>

<style></style>
