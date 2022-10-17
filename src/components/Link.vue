<template>
  <v-hover v-slot="{ hover }" open-delay="200">
    <router-link
      v-if="routerLink"
      :class="hover ? color : 'grey--text text--darken-2'"
      :to="href"
      @click.native="goToTop(href)"
    >
      {{ text }}
    </router-link>
    <a
      v-else
      :class="hover ? color : 'grey--text text--darken-2'"
      :href="href"
      >{{ text }}</a
    >
  </v-hover>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "red",
      required: false,
    },
    routerLink: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({}),
  methods: {
    goToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style></style>
