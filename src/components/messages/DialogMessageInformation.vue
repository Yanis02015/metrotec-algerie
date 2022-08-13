<template>
  <v-dialog persistent v-model="dialog" width="500">
    <v-card>
      <v-toolbar dark color="blue darken-4">
        <v-btn icon dark @click="() => $emit('closeDialogMessage')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title
          >Message de : {{ informations.company }}</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark plain text @click="() => $emit('closeDialogMessage')"
            >Fermer</v-btn
          >
        </v-toolbar-items>
      </v-toolbar>

      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline">Les details du message</div>
          <v-list-item-subtitle class="mb-1"> Nom </v-list-item-subtitle>
          <v-list-item-title class="text-h6 font-weight-regular mb-5">
            {{ informations.name }}
          </v-list-item-title>

          <v-list-item-subtitle class="mb-1"> Email </v-list-item-subtitle>
          <v-list-item-title class="text-h6 font-weight-regular mb-5">
            <a :href="`mailto:${informations.email}`">
              {{ informations.email }}
            </a>
          </v-list-item-title>

          <v-list-item-subtitle class="mb-1"> Société </v-list-item-subtitle>
          <v-list-item-title class="text-h6 font-weight-regular mb-5">{{
            informations.company
          }}</v-list-item-title>

          <v-list-item-subtitle class="mb-1">
            Objet de la requête
          </v-list-item-subtitle>
          <v-list-item-content class="text-h6 font-weight-regular mb-5">
            {{ informations.object }}
          </v-list-item-content>

          <v-list-item-subtitle class="mt-3">
            Contenu du message
          </v-list-item-subtitle>
          <v-list-item-content class="mb-5" v-html="informations.message">
          </v-list-item-content>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="$emit('closeDialogMessage')">
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: () => false,
      required: true,
    },
    informations: {
      type: String,
      required: true,
    },
  },
  data: () => ({}),
};
</script>

<style></style>
