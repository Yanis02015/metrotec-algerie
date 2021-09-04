<template>
  <v-container :class="$vuetify.breakpoint.smAndDown ? 'mt-12' : 'mt-4'">
    <h1
      v-if="$vuetify.breakpoint.smAndDown"
      class="my-5 text-center text-decoration-underline title-presentation"
    >
      Mot du président
    </h1>
    <v-card
      class="text-center"
      :class="
        $vuetify.breakpoint.smAndDown ? 'image-president-md' : 'image-president'
      "
      flat
    >
      <img
        class="ma-auto"
        :width="$vuetify.breakpoint.xs ? '300' : '500'"
        src="https://media.istockphoto.com/photos/in-his-office-picture-id597241066"
      />
    </v-card>
    <v-container>
      <h1
        v-if="!$vuetify.breakpoint.smAndDown"
        class="text-center text-decoration-underline title-presentation"
      >
        Mot du président
      </h1>
      <v-card flat class="transparent text-president">
        <v-card-text class="text-body-1 grey--text text--darken-3">
          {{ lorem }}
        </v-card-text>
      </v-card>
    </v-container>

    <!-- Politique -->
    <v-container>
      <h1 class="text-center text-decoration-underline title-presentation">
        Politique de Métrotec
      </h1>
      <v-card flat class="transparent text-president">
        <v-card-text class="text-body-1 grey--text text--darken-3">
          {{ lorem }}
        </v-card-text>
        <v-card-text class="text-body-1 grey--text text--darken-3">
          {{ lorem }}
        </v-card-text>
      </v-card>
    </v-container>

    <v-divider class="mx-16 my-5"></v-divider>

    <!-- Adresse -->
    <v-container>
      <h1 class="text-center text-decoration-underline title-presentation mb-8">
        Adresse des locaux
      </h1>
      <v-row class="mx-auto">
        <v-col cols="12" md="8">
          <v-card>
            <v-card-title>
              Bordj Bou Arreridj
            </v-card-title>
            <v-card-text>
              Sarl METROTEC ALGERIE <br />
              Cooperative EL Aouras section 40 ilot 93 <br />
              Établissement ouvert : 08:00 - 16:30
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="brown--text" text plain>
                Voir sur Google maps
                <v-icon class="mb-1" size="22"> mdi-map-marker </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-slide-group
            class="py-2"
            :show-arrows="$vuetify.breakpoint.xs ? false : true"
          >
            <v-slide-item cycle v-for="image in imagesBBA" :key="image.url">
              <v-hover v-slot="{ hover }">
                <v-card
                  @click="
                    () => {
                      goThis(image.url);
                      urlImagSelcted = image.url;
                      dialogVisibilitie = true;
                    }
                  "
                  class="ma-2 pa-2"
                  :class="hover ? 'brown lighten-2' : 'brown lighten-3'"
                  elevation="1"
                >
                  <v-img width="200" :aspect-ratio="16 / 9" :src="image.url" />
                </v-card>
              </v-hover>
            </v-slide-item>
          </v-slide-group>
        </v-col>
        <v-col cols="12" md="4" class="text-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3224.6817707153505!2d4.747128914671927!3d36.07686531578091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128cbd58c7dfd599%3A0x49ec1d9fba70980d!2sSarl%20METROTECALGERIE!5e0!3m2!1sfr!2sdz!4v1629886727468!5m2!1sfr!2sdz"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </v-col>
      </v-row>
    </v-container>

    <!-- Dialog image -->
    <v-dialog v-model="dialogVisibilitie" max-width="800">
      <v-card tile>
        <v-img class="text-right" :src="urlImagSelcted">
          <v-btn
            right
            @click="dialogVisibilitie = false"
            class="ma-3 brown white--text"
            icon
          >
            <v-icon size="30">mdi-close</v-icon>
          </v-btn>
        </v-img>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quas voluptas optio magnam reiciendis natus praesentium iusto.Eveniet, aliquid. Quae quam libero velit, delectus rem possimus quo Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quas voluptas optio magnam reiciendis natus praesentium iusto.Eveniet, aliquid. Quae quam libero velit, delectus rem possimus quo Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quas voluptas optio magnam reiciendis natus praesentium iusto.Eveniet, aliquid. Quae quam libero velit, delectus rem possimus quo Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quas voluptas optio magnam reiciendis natus praesentium iusto.Eveniet, aliquid. Quae quam libero velit, delectus rem possimus quo Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quas voluptas optio magnam reiciendis natus praesentium iusto.Eveniet, aliquid. Quae quam libero velit, delectus rem possimus quo ",
      imagesBBA: [
        {
          url: "metrotec-bureau/exterieur.jpeg",
          alt: "Extérieur",
        },
        {
          url: "metrotec-bureau/vitrine.jpeg",
          alt: "Vitrine",
        },
        {
          url: "metrotec-bureau/laboratoire.jpeg",
          alt: "Entré laboratoire",
        },
        {
          url: "metrotec-bureau/reception.jpeg",
          alt: "Réception",
        },
      ],
      dialogVisibilitie: false,
      urlImagSelcted: "",
    };
  },
  methods: {
    goThis(text) {
      console.log(text);
    },
  },
};
</script>

<style scoped>
.image-president {
  float: right;
  margin: 0px 20px 0px 20px;
}
.image-president-md {
  float: top;
}
.text-president {
  text-align: justify;
  text-indent: 2em;
}
.title-presentation {
  font-family: "Cinzel Decorative", cursive;
  font-size: 25px;
}
</style>
