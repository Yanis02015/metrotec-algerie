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
                <v-btn
                  v-if="isAdmin"
                  icon
                  color="success"
                  @click="openDialogModifyReport(item)"
                  ><v-icon>mdi-pencil-outline</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>

    <div v-else class="text-center">Vous n'avez aucun rapport</div>

    <v-dialog
      v-model="dialogModifyReport"
      persistent
      :overlay="false"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5"> Modifier le titre du document </span>
        </v-card-title>
        <v-card-text>
          <v-form
            @submit.prevent="validateNewModificationReport(modifyReport)"
            ref="formModifyReport"
            v-model="formValidModifyReport"
          >
            <v-container grid-list-xs>
              <v-row>
                <v-col class="pb-0" cols="12">
                  <v-text-field
                    dense
                    v-model="modifyReport.title"
                    type="text"
                    :rules="[rules.required]"
                    outlined
                    label="Titre du document"
                  ></v-text-field>
                </v-col>

                <v-col class="pb-0" cols="12">
                  <v-text-field
                    dense
                    :value="informations.company"
                    type="text"
                    disabled
                    outlined
                    label="Nom de la Compagnie*"
                  ></v-text-field>
                </v-col>

                <v-col class="pb-0" cols="12">
                  <v-text-field
                    dense
                    :value="selectedReportForModification.title"
                    type="text"
                    disabled
                    outlined
                    label="Le titre du document*"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*Indique un champ obligatoire</small>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="grey darken-1"
                text
                @click="
                  () => {
                    dialogModifyReport = false;
                    $refs.formModifyReport.reset();
                    loading.modifyReport = false;
                  }
                "
              >
                Fermer
              </v-btn>
              <v-btn
                type="submit"
                color="blue darken-1"
                text
                :loading="loading.modifyReport"
              >
                Valider
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
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
    pdfsrc: "",
    loading: {
      modifyReport: false,
    },
    selectedReportForModification: {},
    dialogModifyReport: false,
    formValidModifyReport: true,
    modifyReport: {
      title: "",
    },
    rules: {
      required: (value) => !!value || "Ce champ est obligatoire.",
    },
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
    openDialogModifyReport(report) {
      this.selectedReportForModification = { ...report };
      this.modifyReport = { ...report };
      this.dialogModifyReport = true;
    },
    async validateNewModificationReport(report) {
      if (this.$refs.formModifyReport.validate()) {
        this.loading.modifyReport = true;
        try {
          const response = await axios(
            axiosConfig(
              "PUT",
              "/api/report/modify/" + report.idReport,
              {title: this.modifyReport.title}
            )
          );
          this.$emit("snackbarConfig", response.data.message, "success");
          this.$emit("refreshSelectedClient", this.informations)
          this.dialogModifyReport = false;
        } catch (error) {
          const errorMsg =
            error.response.data.error ||
            "Le document n'a pas pu être mis à jour.";
          this.$emit("snackbarConfig", errorMsg, "error");
        } finally {
          this.loading.modifyReport = false;
        }
      }
    },
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
