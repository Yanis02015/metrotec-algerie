<template>
  <v-container>
    <h1
      class="text-center text-decoration-underline text-h6 text-lg-h4 text-sm-h5 font-weight-bold mb-10"
      :class="$vuetify.breakpoint.smAndDown ? 'mt-16' : 'mt-5'"
    >
      L'actualité chez Métrotec
    </h1>
    <v-row v-if="hasArticles">
      <v-col v-for="(article, index) in articles" :key="index" cols="12" md="4">
        <v-hover v-slot="{ hover }">
          <v-card
            flat
            class="mx-auto"
            :elevation="hover ? '6' : '3'"
            max-width="600"
          >
            <v-img :aspect-ratio="16 / 9" :src="article.imageUrl">
              <v-card
                id="date-article"
                class="ml-auto mr-3 mt-3 text-center"
                tile
                flat
                width="50"
              >
                {{ adjustMonth(new Date(article.date).getMonth()) }}
                <v-card
                  class="teal ma-auto"
                  width="10"
                  height="2"
                  flat
                  tile
                ></v-card>
                <span style="font-size: 23px">
                  {{ new Date(article.date).getDate() }}
                </span>
                <v-card
                  class="teal ma-auto"
                  width="10"
                  height="2"
                  flat
                  tile
                ></v-card>
                {{ new Date(article.date).getFullYear() }}
              </v-card>
            </v-img>
            <div class="mx-5 my-3 pb-3">
              <h3
                style="transition: all 1.2s"
                class="text-h6 teal--text mb-2 font-weight-medium"
              >
                {{ adjustText(article.title, 30) }}
              </h3>
              <v-card
                height="3"
                :width="hover ? '280' : '40'"
                class="mb-5 teal"
                style="margin-top: -8px; transition: all 1.2s"
                flat
              ></v-card>
              <v-card-text class="font-weight-light mb-2">
                {{ adjustText(article.description, 130) }}
              </v-card-text>
              <v-card-actions>
                <v-btn
                  @click="
                    () => {
                      articleSelected = index;
                      dialogVisibilitie = true;
                    }
                  "
                  class="teal--text"
                  text
                  dark
                >
                  Lire la suite
                  <v-icon class="ml-2" size="20">mdi-arrow-right</v-icon>
                </v-btn>
              </v-card-actions>
            </div>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <h2 class="text-center" v-else>{{ loadingText }}</h2>

    <!-- -->
    <v-dialog v-model="dialogVisibilitie" width="800">
      <v-card v-if="hasArticles" tile>
        <v-card-title class="text-center mx-auto text-h6 text-lg-h4 text-sm-h5 font-weight-bold mb-5">
          <v-btn
            @click="dialogVisibilitie = false"
            plain
            icon
            class="mr-1 my-2"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          {{ articles[articleSelected].title }}
        </v-card-title>
        <v-card-text>
          <v-img
            :aspect-ratio="16 / 9"
            :src="articles[articleSelected].imageUrl"
          >
            <v-card
              id="date-article"
              class="ml-auto mr-3 mt-3 text-center"
              tile
              flat
              width="50"
            >
              {{
                adjustMonth(new Date(articles[articleSelected].date).getMonth())
              }}

              <v-card
                class="teal mx-auto mt-1 mb-3"
                width="10"
                height="2"
                flat
                tile
              ></v-card>
              <span style="font-size: 23px">
                {{ new Date(articles[articleSelected].date).getDate() }}
              </span>
              <v-card
                class="teal mx-auto my-1"
                width="10"
                height="2"
                flat
                tile
              ></v-card>
              {{ new Date(articles[articleSelected].date).getFullYear() }}
            </v-card>
          </v-img>
          <v-card-text>
            {{ articles[articleSelected].description }}
          </v-card-text>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialogVisibilitie = false" class="red--text" text plain
            >Fermer</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
import axiosConfig from "../configurations/axiosConfig";
export default {
  data() {
    return {
      articles: [],
      loadingText: "Chargement...",
      color: "teal",
      dialogVisibilitie: false,
      articleSelected: 0,
    };
  },
  methods: {
    adjustText(text, n) {
      if (text.length > n - 3) return text.slice(0, n) + "...";
      return text;
    },
    adjustMonth(month) {
      switch (month) {
        case 0:
          return "Janv";
        case 1:
          return "Févr";
        case 2:
          return "Mars";
        case 3:
          return "Avr";
        case 4:
          return "Mai";
        case 5:
          return "Juin";
        case 6:
          return "Juill";
        case 7:
          return "Août";
        case 8:
          return "Sept";
        case 9:
          return "Oct";
        case 10:
          return "Nov";
        case 11:
          return "Déc";
        default:
          return month;
      }
    },
    async getAllNews() {
      try {
        const response = await axios(
          axiosConfig("GET", "/api/news/")
        );
        console.log(response.data);
        this.articles = response.data;
        this.loadingText = "Chargement...";
      } catch (error) {
        this.loadingText = "Erreur de connexion";
        console.log(error);
      }
    },
  },
  mounted() {
    this.getAllNews();
  },
  computed: {
    hasArticles() {
      return this.articles.length > 0;
    },
  },
};
</script>

<style>
#date-article {
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  font-size: 12px;
}
</style>
