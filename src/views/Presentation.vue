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
          <strong>Chers partenaires,</strong>
          <br /><br />
          Nous sommes particulièrement heureux de vous accueillir sur notre site
          web, pour une relation de proximité et aussi pour s’inscrire dans une
          relation d’échange perpétuel et constructif avec vous.
          <br /><br />
          <strong>« Qualité, maîtrise et fiabilité...»</strong> : c’est notre
          slogan que, quotidiennement, nous souhaitons traduire et réaliser avec
          nos clients, nos fournisseurs et nos partenaires. <br /><br />
          L’activité est assurée par des responsables techniques et ingénieurs
          métrologues expérimentés et habilités.
          <br /><br />
          Ce qui nous démarque : un constat fidèle du réel, du présent,
          objectif, analysé et constamment projeté vers l’avenir.
          <br /><br />
          Nous investissons chaque année pour renouveler notre parc d’étalons,
          moderniser nos laboratoires, mettre au point des solutions ainsi que
          former nos professionnels. Ces investissements nous permettent de
          renforcer notre excellence technique et notre présence dans le domaine
          de la métrologie.
          <br /><br />
          Au plaisir de vous lire !
          <br /><br />
          Sincèrement,
          <br /><br />
          <strong>HARADJ Abderraouf</strong> directeur générale MÉTROTEC
          ALGÉRIE.
        </v-card-text>
      </v-card>
    </v-container>

    <!-- Politique -->
    <v-container>
      <h1 class="text-center text-decoration-underline title-presentation">
        Politique de l'entreprise
      </h1>
      <v-card flat class="transparent text-president">
        <v-card-text class="text-body-1 grey--text text--darken-3">
          Aujourd’hui, l’appétence clientèles s’étend vers des prestations de
          service qui sont de qualité, la raison pour laquelle notre laboratoire
          de métrologie industrielle METROTEC Algérie a allié un système qualité
          suivant le référentiel normatif ISO CEI 17025/2017 à son activité
          d’étalonnage engageant l’entreprise dans un processus de maîtrise
          professionnelle.
        </v-card-text>
        <v-card-text class="text-body-1 grey--text text--darken-3">
          Pour ce faire, nous, Directeur Général de METROTEC Algérie, nous nous
          engageons :
          <ol class="list-politique">
            <li>
              A mettre à disposition tous les moyens nécessaires et poursuivre
              nos efforts dans la mise en place des bonnes pratiques
              professionnelles afin de maintenir le système et d’atteindre nos
              objectifs.
            </li>
            <li>
              A agir en toute objectivité et en toute liberté de toutes
              pressions d’ordre administratif, commercial et financière afin de
              répondre au critère de l’impartialité.
            </li>
            <li>
              A assurer tous les moyens afin de garantir la confidentialité dans
              l’activité d’étalonnage et les résultats d’étalonnage.
            </li>
            <li>
              A satisfaire au mieux notre clientèle et partenaires à travers
              l’écoute client, réclamations et les analyses des enquêtes de
              satisfaction client.
            </li>
            <li>
              A développer par la formation, les compétences du personnel.
            </li>
            <li>
              A exiger à tous le personnel du Laboratoire de métrologie
              Industrielle de se familiariser avec la documentation qualité et à
              appliquer les politiques; procédure et instructions dans ses
              travaux d’étalonnage.
            </li>
            <li>
              A maintenir et améliorer en continue le système de management de
              la qualité.
            </li>
          </ol>
        </v-card-text>
        <v-card-text class="text-body-1 grey--text text--darken-3">
          A ce titre, nous avons nommé un Responsable Laboratoire, I. TOULOUM
          ayant toute autorité pour intervenir et nous rendre compte sur toute
          activité à caractère non conforme liée aux activités laboratoire.
        </v-card-text>
        <v-card-text class="text-body-1 grey--text text--darken-3">
          Le dévouement, le sérieux et L’implication de chacun de nous,
          représentent des éléments indispensables pour la bonne qualité,
          l’efficacité et la pérennité de METROTEC Algérie.
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
            <v-card-title> Bordj Bou Arreridj </v-card-title>
            <v-card-text>
              Sarl METROTEC ALGERIE <br />
              Cooperative EL Aouras section 40 ilot 93 Bordj Bou Arreridj 34000
              Algérie<br />
              Établissement ouvert : 08:00 - 16:30
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn href="https://www.google.com/maps?ll=36.076903,4.749377&z=16&t=m&hl=fr&gl=DZ&mapclient=embed&cid=5326665031137400845" target="_blank" class="brown--text" text plain>
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
            style="border: 0"
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
        "Chers partenaires, Nous sommes particulièrement heureux de vous accueillir sur notre site web, pour une relation de proximité et aussi pour s’inscrire dans une relation d’échange perpétuel et constructif avec vous. « Qualité, maîtrise et fiabilité...» : c’est notre slogan que, quotidiennement, nous souhaitons traduire et réaliser avec nos clients, nos fournisseurs et nos partenaires. L’activitée est assurée par des responsables techniques et ingénieurs métrologues expérimentés et habilités. Ce qui nous démarque : un constat fidèle du réel, du présent, objectif, analysé et constamment projeté vers l’avenir. Nous investissons chaque année pour renouveler notre parc d’étalons, moderniser nos laboratoires, mettre au point des solutions ainsi que former nos professionnels. Ces investissements nous permettent de renforcer notre excellence technique et notre présence dans le domaine de la métroogie. Au plaisir de vous lire ! Sincèrement, **HARADJ Abderraouf** directeur générale du laboratoire",
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
  /* text-indent: 2em; */
}
.title-presentation {
  font-family: "Cinzel Decorative", cursive;
  font-size: 25px;
}

.list-politique li {
  margin: 20px 0;
}
</style>
