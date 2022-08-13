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
        <v-btn icon dark @click="() => $emit('disableDialogMessages')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Les messages</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark plain text @click="() => $emit('disableDialogMessages')"
            >Fermer</v-btn
          >
        </v-toolbar-items>
      </v-toolbar>

      <v-container grid-list-xs>
        <v-card tile flat>
          <v-subheader>Les messages Métrotec Algérie</v-subheader>

          <v-card flat class="text-center">
            <v-btn
              @click="refreshMessage"
              class="mx-2 mb-5"
              outlined
              color="primary"
              :loading="refreshMessageTableLoading"
            >
              <v-icon left> mdi-refresh </v-icon>
              Actualiser</v-btn
            >
          </v-card>

          <MessagesTable :messages="messages" />
        </v-card>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import axiosConfig from "../../configurations/axiosConfig";
import MessagesTable from "./MessagesTable.vue";
import { mapActions } from "vuex";

const DO_NOT_SHOW = "OPTION1";
export default {
  props: {
    dialog: {
      type: Boolean,
      default: () => false,
      required: true,
    },
    bus: {
      required: false,
    },
  },
  data: () => ({
    messages: [],
    isMessageSeen: 0,
    refreshMessageTableLoading: false,
  }),
  methods: {
    ...mapActions(["snackbarConfig"]),
    async refreshMessage(show) {
      try {
        const response = await axios(axiosConfig("GET", "/api/message/"));
        if (show !== DO_NOT_SHOW)
          this.snackbarConfig({
            type: "success",
            message: "Messages récupéré avec succès",
          });
        if (response) this.messages = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    messages() {
      if (this.messages.length > 0) {
        this.isMessageSeen = this.messages.reduce((accumulator, obj) => {
          if (!obj.seen) {
            return accumulator + 1;
          }

          return accumulator;
        }, 0);
        console.log(this.isMessageSeen);
        this.$emit("setIsMessageSeen", this.isMessageSeen);
      }
    },
  },
  mounted() {
    this.refreshMessage(DO_NOT_SHOW);
  },
  components: { MessagesTable },
};
</script>

<style></style>
