<template>
  <div id="app" :class="menuIsOpen ? 'active' : ''">
    <div class="page-navbar">
      <NavbarLogin v-if="!userData" />
      <Navbar v-if="userData" v-on:changeMenuStatus="changeMenuStatus" />
    </div>

    <div class="page-sidebar">
      <Sidebar v-if="userData" />
    </div>

    <div class="page-content">
      <router-view
        :class="{ 'p-3': userData }"
        class="page-content-container"
      />

      <Footer />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NavbarLogin from "@/components/general/NavbarLogin.vue";
import Navbar from "@/components/general/Navbar.vue";
import Sidebar from "@/components/general/Sidebar.vue";
import Footer from "@/components/general/Footer.vue";

export default {
  name: "App",
  components: {
    NavbarLogin,
    Navbar,
    Sidebar,
    Footer,
  },
  data() {
    return {
      menuIsOpen: false,
    };
  },
  methods: {
    changeMenuStatus() {
      this.menuIsOpen = !this.menuIsOpen;
    },
  },
  computed: {
    ...mapGetters(["userData"]),
  },
};
</script>

<style lang="scss"></style>
