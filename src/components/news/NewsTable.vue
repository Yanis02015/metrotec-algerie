<template>
  <div>
    <v-card v-if="news">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Actualité</th>
              <th class="text-left">Date</th>
              <th class="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in news" :key="item.idNews">
              <td>
                <a :href="item.newsUrl" target="_blank">{{ item.title }}</a>
              </td>
              <td>{{ new Date(item.createdAt).toLocaleDateString() }}</td>
              <td class="text-center">
                <v-btn icon color="error" @click="showDialogMessageDelete(item)"
                  ><v-icon>mdi-delete-outline</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>

    <div v-else class="text-center">Vous n'avez aucun rapport</div>

    <v-dialog v-model="dialog" max-width="350">
      <v-card>
        <v-card-title class="text-h5"> Suppression </v-card-title>

        <v-card-text>
          Vous êtes sur le point de supprimer l'actualité :
        </v-card-text>

        <v-card-title class="black--text text-h6">
          {{ selectedNews.title }}
          <br />
          {{ selectedNews.date }}
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="grey darken-1" plain text @click="dialog = false">
            Annuler
          </v-btn>

          <v-btn
            color="red darken-1"
            text
            plain
            :loading="loadingDelete"
            @click="deleteNews(selectedNews)"
          >
            Supprimer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import axiosConfig from "../../configurations/axiosConfig";
import { mapActions } from "vuex";

export default {
  data: () => ({
    news: [],
    selectedNews: {},
    dialog: false,
    loadingDelete: false,
  }),
  methods: {
    ...mapActions(["snackbarConfig"]),
    async refreshNewsTable(options) {
      try {
        const response = await axios(axiosConfig("GET", "/api/news/"));
        this.news = response.data;
        if (options) {
          this.snackbarConfig({
            type: "success",
            message: "Table actualisé avec succès.",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    showDialogMessageDelete(item) {
      this.selectedNews = item;
      this.dialog = true;
    },
    async deleteNews(item) {
      this.loadingDelete = true;
      try {
        const response = await axios(
          axiosConfig("DELETE", "/api/news/" + item.idNews)
        );
        this.refreshNewsTable();
        this.snackbarConfig({
          type: "success",
          message: response.data.message,
        });
        this.dialog = false;
      } catch (error) {
        const message =
          error.response.data.error || "L'actualité n'a pas pu être supprimer.";
        this.snackbarConfig({
          type: "error",
          message: message,
        });
      } finally {
        this.loadingDelete = false;
      }
    },
    modifyNews(news) {
      alert(news);
    },
  },
  mounted() {
    this.refreshNewsTable();
  },
};
</script>

<style></style>
