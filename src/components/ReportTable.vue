<template>
  <div>
    <v-card v-if="hasReports">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Titre</th>
              <th class="text-left">Date</th>
              <th v-if="isAdmin" class="text-left">Nombre de consultations</th>
              <th v-if="isAdmin" class="text-left">Dernière consultation</th>
              <th class="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in informations.Reports" :key="item.idReport">
              <td>
                <a :href="item.reportUrl" target="_blank">{{ item.title }}</a>
              </td>
              <td>{{ new Date(item.createdAt).toLocaleDateString() }}</td>
              <td v-if="isAdmin">{{ item.consultations }}</td>
              <td v-if="isAdmin">
                <span v-if="item.consultationDate">{{
                  item.consultationDate
                }}</span>
                <span class="grey--text font-italic" v-else>/</span>
              </td>
              <td class="text-center">
                <a target="_blank" :href="item.reportUrl">
                  <v-btn icon color="primary"
                    ><v-icon>mdi-open-in-new</v-icon></v-btn
                  >
                </a>
                <a target="_blank">
                  <v-btn
                    icon
                    :loading="item.loading"
                    color="success"
                    @click="downloadPdfReport(item)"
                    ><v-icon>mdi-download</v-icon>
                  </v-btn>
                </a>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>

    <div v-else class="text-center">Vous n'avez aucun rapport</div>
  </div>
</template>

<script>
import axios from "axios";
import axiosConfig from "../configurations/axiosConfig";

export default {
  props: {
    informations: {
      type: Object,
      default: () => {},
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    pdfsrc: '',
  }),
  computed: {
    hasReports() {
      const hasOwnProperty = Object.prototype.hasOwnProperty.call(
        this.informations,
        "Reports"
      );
      if (hasOwnProperty) if (this.informations.Reports.length > 0) return true;
      return false;
    },
  },
  methods: {
    async downloadPdfReport(report) {
      const response = await axios(
        axiosConfig("GET", "/reports/download/" + report.idReport, null, true)
      );
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      this.pdfsrc = downloadUrl;
      console.log(response.headers["content-disposition"]);
      const filename = this.getFileName(response);
      this.downloadFile(downloadUrl, filename);
    },
    downloadFile(downloadUrl, filename) {
      const link = document.createElement("a");
      link.href = downloadUrl;
      console.log(filename);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
    getFileName(response) {
      const disposition = response.headers["content-disposition"];
      if (disposition && disposition.indexOf("attachment") !== -1) {
        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        var matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
          return matches[1].replace(/['"]/g, "");
        }
      }
      return "document.pdf";
    },
  },
};
</script>

<style></style>
