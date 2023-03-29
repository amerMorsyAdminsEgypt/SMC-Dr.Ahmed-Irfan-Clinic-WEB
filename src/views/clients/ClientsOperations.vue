<template>
  <Clients :key="currentSubPage" :currentSubPage="currentSubPage" />
</template>

<script>
import Clients from "./Clients.vue";

export default {
  name: "ClientsOperations",

  components: {
    Clients,
  },
  data() {
    return {
      currentSubPage: "",
    };
  },
  methods: {},
  computed: {},
  async created() {
    this.currentSubPage = this.$route.meta.currentSubPage;
  },
  watch: {
    $route() {
      this.currentSubPage = this.$route.meta.currentSubPage;
    },
  },
};
</script>
