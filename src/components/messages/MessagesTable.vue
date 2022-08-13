<template>
  <div>
    <v-card v-if="messages">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Objet</th>
              <th class="text-left">Entreprise</th>
              <th class="text-left">Email</th>
              <th class="text-center">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in messages"
              :key="item.idMessage"
              @click="showMessage(item)"
              class="tr-clickable"
              :class="item.seen ? 'table-row-consulted' : ''"
            >
              <td>{{ item.object }}</td>
              <td>{{ item.company }}</td>
              <td>{{ item.email }}</td>
              <td class="text-center">
                {{ new Date(item.createdAt).toLocaleDateString() }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>

    <div v-else class="text-center">Vous n'avez aucun message</div>

    <DialogMessageInformation
      :dialog="modelMessageInformation"
      :informations="selectedMessage"
      @closeDialogMessage="closeDialogMessage"
    />
  </div>
</template>

<script>
import axios from "axios";
import axiosConfig from "../../configurations/axiosConfig";
import DialogMessageInformation from "./DialogMessageInformation.vue";
export default {
  props: {
    messages: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  data: () => ({
    modelMessageInformation: false,
    selectedMessage: {},
  }),
  methods: {
    showMessage(item) {
      if (!item.seen) {
        axios(axiosConfig("PUT", "/api/message/" + item.idMessage));
        item.seen = true;
      }
      this.selectedMessage = item;
      this.modelMessageInformation = true;
    },
    closeDialogMessage() {
      this.modelMessageInformation = false;
    },
  },
  components: { DialogMessageInformation },
};
</script>

<style>
.tr-clickable {
  cursor: pointer;
}
.table-row-consulted {
  background-color: #f3f3f3;
}
</style>
