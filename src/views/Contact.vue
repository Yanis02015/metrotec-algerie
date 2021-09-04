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
                v-model="name"
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
                v-model="societe"
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
                v-model="email"
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
                v-model="object"
                :rules="[rules.required]"
                label="Object *"
                type="text"
                required
                outlined
                clearable
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="12">
              <v-textarea
                v-model="message"
                :rules="[rules.required]"
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
      <v-col cols="12" md="4">
        <strong>TODO :</strong> Nom de l'adresee
      </v-col>
      <v-col cols="12" md="4">
        <strong>TODO :</strong> Information (num, email, president.. etc)
      </v-col>
      <v-col cols="12" md="4">
        <strong>TODO :</strong> Google Maps
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    name: "",
    societe: "",
    email: "",
    object: "",
    message: "",
    rules: {
      required: (value) => !!value || "Ce champ est obligatoire.",
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
      if (this.valid) {
        window.open(
          "mailto:contact@metrotec-algerie.com" +
            "?subject=" +
            this.object +
            "&body=Nom : " +
            this.name +
            "%0A" +
            "Nom de l'organisme : " +
            this.societe +
            "%0A" +
            "E-mail : " +
            this.email +
            "%0A%0A" +
            "Contenu : " +
            this.message,
          "_blank"
        );
      }
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
