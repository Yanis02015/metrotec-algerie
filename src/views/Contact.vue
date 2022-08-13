<template>
  <v-container :class="$vuetify.breakpoint.smAndDown ? 'mt-12' : 'mt-4'">
    <h1 class="text-center text-decoration-underline title-contact mb-10 mt-5">
      Nous contacter
    </h1>
    <v-container>
      <v-form ref="form" v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="message.name"
                :rules="[rules.required]"
                label="Nom *"
                type="text"
                required
                outlined
                clearable
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="message.company"
                :rules="[rules.required]"
                label="Société *"
                type="text"
                required
                outlined
                clearable
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="message.email"
                :rules="[rules.required, rules.email]"
                label="E-mail *"
                type="email"
                required
                outlined
                clearable
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12">
              <v-text-field
                v-model="message.object"
                counter
                :rules="[rules.required, rules.object]"
                label="Object *"
                type="text"
                required
                outlined
                clearable
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12">
              <v-textarea
                v-model="message.message"
                counter
                :rules="[rules.required, rules.message]"
                outlined
                name="input-7-4"
                label="Message"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-btn :disabled="!valid" color="success" @click="validate">
            Validate
          </v-btn>
        </v-container>
      </v-form>
    </v-container>

    <h1 class="text-center text-decoration-underline title-contact mb-10 mt-5">
      Adresse
    </h1>
    <v-row class="text-center">
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title> Bordj Bou Arreridj </v-card-title>
              <v-card-text class="text-left">
                Sarl METROTEC ALGERIE <br />
                Cooperative EL Aouras section 40 ilot 93 Bordj Bou Arreridj 34000 Algérie <br />
                Établissement ouvert : 08:00 - 16:30
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn href="https://www.google.com/maps?ll=36.076903,4.749377&z=16&t=m&hl=fr&gl=DZ&mapclient=embed&cid=5326665031137400845" target="_blank" class="blue-grey--text" text plain>
                  Voir sur Google maps
                  <v-icon class="mb-1" size="22"> mdi-map-marker </v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-list one-line>
              <v-list-item v-for="item in contactList" :key="item.icon">
                <v-list-item-icon class="mr-2">
                  <v-icon size="20">
                    {{ item.icon }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="subtitle-2 text-left">
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-slide-group
              class="py-2"
              :show-arrows="$vuetify.breakpoint.xs ? false : true"
            >
              <v-slide-item cycle v-for="image in imagesBBA" :key="image.url">
                <v-hover v-slot="{ hover }">
                  <v-card
                    @click="
                      () => {
                        urlImagSelcted = image.url;
                        dialogVisibilitie = true;
                      }
                    "
                    class="ma-2 pa-2"
                    :class="
                      hover ? 'blue-grey lighten-2' : 'blue-grey lighten-3'
                    "
                    elevation="1"
                  >
                    <v-img
                      width="200"
                      :aspect-ratio="16 / 9"
                      :src="image.url"
                    />
                  </v-card>
                </v-hover>
              </v-slide-item>
            </v-slide-group>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3224.6817707153505!2d4.747128914671927!3d36.07686531578091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128cbd58c7dfd599%3A0x49ec1d9fba70980d!2sSarl%20METROTECALGERIE!5e0!3m2!1sfr!2sdz!4v1629886727468!5m2!1sfr!2sdz"
          width="100%"
          height="100%"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
        >
        </iframe>
      </v-col>
    </v-row>

    <!-- Dialog image -->
    <v-dialog v-model="dialogVisibilitie" max-width="800">
      <v-card tile>
        <v-img class="text-right" :src="urlImagSelcted">
          <v-btn
            right
            @click="dialogVisibilitie = false"
            class="ma-3 blue-grey white--text"
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
import axios from "axios";
import axiosConfig from "../configurations/axiosConfig";

export default {
  data: () => ({
    valid: false,
    message: {
      name: "",
      company: "",
      email: "",
      object: "",
      message: "",
    },
    rules: {
      required: (value) => !!value || "Ce champ est obligatoire.",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
      message: (value) => value.length <= 500 || "Maximum 500 caractères",
      object: (value) => value.length <= 40 || "Maximum 40 caractères",
    },
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
    contactList: [
      {
        icon: "mdi-account-box",
        text: "Mr HARADJ Abderraouf",
      },
      {
        icon: "mdi-phone-outline",
        text: "+213 (0) 35 76 84 14",
      },
      {
        icon: "mdi-phone",
        text: "+213 (0) 34 80 35 59",
      },
      {
        icon: "mdi-map-marker",
        text: "Bordj Bou Arreridj",
      },
    ],
  }),
  methods: {
    async validate() {
      // TODO DELETE
      let test = this.message.message;
      console.log(test.replace("\n", "<br />"));
      console.log(test.replace(/\n/g, "\\n"));
      console.log(test.replace(/\n/g, "<br/>"));
      this.$refs.form.validate();
      if (this.valid) {
        try {
          await axios(axiosConfig("POST", "/api/message/", this.message));
          alert("Message envoyé avec succées");
          this.$refs.form.reset();
        } catch (error) {
          alert("Erreur");
        }
      }

      // if (this.valid) {
      //   window.open(
      //     "mailto:contact@metrotec-algerie.com" +
      //       "?subject=" +
      //       this.object +
      //       "&body=Nom : " +
      //       this.name +
      //       "%0A" +
      //       "Nom de l'organisme : " +
      //       this.company +
      //       "%0A" +
      //       "E-mail : " +
      //       this.email +
      //       "%0A%0A" +
      //       "Contenu : " +
      //       this.message,
      //     "_blank"
      //   );
      // }
    },
  },
};
</script>

<style>
.title-contact {
  font-family: "Cinzel Decorative", cursive;
  font-size: 25px;
}
</style>
