<template>
  <v-container>
    <h1
      class="text-center text-decoration-underline title-news mb-10"
      :class="$vuetify.breakpoint.smAndDown ? 'mt-16' : 'mt-5'"
    >
      L'actualité chez Métrotec
    </h1>
    <v-row>
      <v-col v-for="(article, index) in articles" :key="index" cols="12" md="4">
        <v-hover v-slot="{ hover }">
          <v-card
            flat
            class="mx-auto"
            :elevation="hover ? '6' : '3'"
            max-width="600"
          >
            <v-img :aspect-ratio="16 / 9" :src="article.image">
              <v-card
                id="date-article"
                class="ml-auto mr-3 mt-3 text-center"
                tile
                flat
                width="50"
              >
                {{ adjustMonth(article.month) }}
                <v-card
                  class="teal ma-auto"
                  width="10"
                  height="2"
                  flat
                  tile
                ></v-card>
                <span style="font-size: 23px;">
                  {{ article.day }}
                </span>
                <v-card
                  class="teal ma-auto"
                  width="10"
                  height="2"
                  flat
                  tile
                ></v-card>
                {{ article.year }}
              </v-card>
            </v-img>
            <div class="mx-5 my-3 pb-3">
              <h3
                style="transition: all 1.2s;"
                class="text-h6 teal--text mb-2 font-weight-medium"
              >
                {{ adjustText(article.title, 30) }}
              </h3>
              <v-card
                height="3"
                :width="hover ? '280' : '40'"
                class="mb-5 teal"
                style="margin-top: -8px; transition: all 1.2s;"
                flat
              ></v-card>
              <v-card-text class="font-weight-light mb-2">
                {{ adjustText(article.contents[0], 130) }}
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

    <!-- -->
    <v-dialog v-model="dialogVisibilitie" width="800">
      <v-card tile>
        <v-card-title class="text-center mx-auto title-news mb-5">
          <v-btn @click="dialogVisibilitie = false" plain icon class="mr-1 my-2">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          {{ articles[articleSelected].title }}
        </v-card-title>
        <v-card-text>
          <v-img :aspect-ratio="16 / 9" :src="articles[articleSelected].image">
            <v-card
              id="date-article"
              class="ml-auto mr-3 mt-3 text-center"
              tile
              flat
              width="50"
            >
              {{ adjustMonth(articles[articleSelected].month) }}
              <v-card
                class="teal mx-auto mt-1 mb-3"
                width="10"
                height="2"
                flat
                tile
              ></v-card>
              <span style="font-size: 23px;">
                {{ articles[articleSelected].day }}
              </span>
              <v-card
                class="teal mx-auto my-1"
                width="10"
                height="2"
                flat
                tile
              ></v-card>
              {{ articles[articleSelected].year }}
            </v-card>
          </v-img>
          <v-card-text
            v-for="(content, index) in articles[articleSelected].contents"
            :key="index"
          >
            {{ content }}
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
export default {
  data() {
    return {
      articles: [
        {
          title: "Titre 1 en guise d'exemple",
          image: "https://picsum.photos/510/300?random",
          contents: [
            "Premier paragraphe",
            "Deuxieme paragraphe",
            "Troisieme paragraphe",
          ],
          day: "22",
          month: "Décembre",
          year: "2021",
        },
        {
          title: "Titre 2 en guise d'exemple",
          image:
            "https://inspectalgerie.com/wp-content/uploads/2021/03/ACCRESITATION-INSPECT-2020-724x1024.png",
          contents: [
            "Premier paragraphe",
            "Deuxieme paragraphe",
            "Troisieme paragraphe",
          ],
          day: "22",
          month: "Octobre",
          year: "2021",
        },
        {
          title: "Titre 3 en guise d'exemple",
          image: "https://picsum.photos/510/300?random",
          contents: [
            "Premier paragraphe",
            "Deuxieme paragraphe",
            "Troisieme paragraphe",
          ],
          day: "22",
          month: "Juillet",
          year: "2021",
        },
        {
          title:
            "Ceci est un titre particulièrement long, Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore culpa, dolores laborum.",
          image: "https://source.unsplash.com/random",
          contents: [
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore culpa, dolores laborum quibusdam nisi harum iste quidem perferendis doloremque deserunt laboriosam, accusantium et explicabo ab sed. Nam alias illum rem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore culpa, dolores laborum quibusdam nisi harum iste quidem perferendis doloremque deserunt laboriosam, accusantium et explicabo ab sed. Nam alias illum rem?",
            "Deuxieme paragraphe",
            "Troisieme paragraphe",
          ],
          day: "22",
          month: "Juin",
          year: "2021",
        },
      ],
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
    adjustMonth(text) {
      if (text.length > 5) return text.slice(0, 3);
      return text;
    },
  },
};
</script>

<style>
.title-news {
  font-family: "Cinzel Decorative", cursive;
  font-size: 25px;
}
#date-article {
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  font-size: 12px;
}
</style>
