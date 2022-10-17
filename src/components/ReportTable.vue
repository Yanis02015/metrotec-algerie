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
            <tr
              :class="item.consultations > 0 ? 'table-row-consulted' : ''"
              v-for="item in informations.Reports"
              :key="item.idReport"
            >
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
                <v-btn
                  v-if="isAdmin"
                  icon
                  color="error"
                  @click="showDialogReportDelete(item)"
                >
                  <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
                <a v-else target="_blank" :href="item.reportUrl">
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
                  color="primary"
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

    <!-- Delete report -->
    <v-dialog v-model="dialogDeleteReport" max-width="350">
      <v-card>
        <v-card-title class="text-h5"> Suppression </v-card-title>

        <v-card-text>
          Vous êtes sur le point de supprimer le document :
        </v-card-text>

        <v-card-title class="black--text text-h6">
          {{ selectedReportForDeleting.title }}
          <br />
          {{
            new Date(selectedReportForDeleting.createdAt).toLocaleDateString()
          }}
        </v-card-title>
        <v-card-text>
          <span class="caption text--secondary font-italic" v-if="selectedReportForDeleting.consultations > 0"
            >Consulté par l'utilisateur {{ informations.fullName }}.</span
          >
          <span v-else class="error--text caption font-weight-bold font-italic"
            >Non consulté par l'utilisateur {{ informations.fullName }}.</span
          >
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="grey darken-1"
            plain
            text
            @click="dialogDeleteReport = false"
          >
            Annuler
          </v-btn>

          <v-btn
            color="red darken-1"
            text
            plain
            :loading="loading.deleteReport"
            @click="deleteReport(selectedReportForDeleting.idReport)"
          >
            Supprimer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import axiosConfig from "../configurations/axiosConfig";
import { mapActions } from "vuex";

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
      deleteReport: false,
    },
    selectedReportForModification: {},
    selectedReportForDeleting: {},
    dialogModifyReport: false,
    dialogDeleteReport: false,
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
    ...mapActions(["snackbarConfig"]),
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
            axiosConfig("PUT", "/api/report/modify/" + report.idReport, {
              title: this.modifyReport.title,
            })
          );
          this.$emit("snackbarConfig", {
            message: response.data.message,
            type: "success",
          });
          this.$emit("refreshSelectedClient", this.informations);
          this.dialogModifyReport = false;
        } catch (error) {
          const errorMsg =
            error.response.data.error ||
            "Le document n'a pas pu être mis à jour.";
          this.$emit("snackbarConfig", { message: errorMsg, type: "error" });
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
    async deleteReport(idReport) {
      this.loading.deleteReport = true;
      try {
        const response = await axios(
          axiosConfig("DELETE", "/api/report/" + idReport)
        );
        this.snackbarConfig({
          type: "success",
          message: response.data.message,
        });
        this.$emit("refreshSelectedClient", this.informations);
        this.dialogDeleteReport = false;
      } catch (error) {
        const message =
          error.response.data.error || "Le document n'a pas pu être supprimer.";
        this.snackbarConfig({
          type: "error",
          message: message,
        });
      } finally {
        this.loading.deleteReport = false;
      }
    },
    showDialogReportDelete(report) {
      this.selectedReportForDeleting = report;
      this.dialogDeleteReport = true;
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

<style>
.table-row-consulted {
  background-color: #f3f3f3;
}
</style>
