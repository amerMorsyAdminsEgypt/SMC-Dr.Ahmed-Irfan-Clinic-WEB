<template>
  <div class="overflow-auto">
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      :first-text="$t('paginationFirstItem')"
      :prev-text="$t('paginationPrevItem')"
      :next-text="$t('paginationNextItem')"
      :last-text="$t('paginationLastItem')"
      first-number
      last-number
      align="center"
      class="mt-4"
    ></b-pagination>
  </div>
</template>

<script>
import { PAGE_SIZE } from "@/utils/constants";

export default {
  name: "Pagination",
  props: ["paginationData"],
  data() {
    return {
      totalPages: this.paginationData.totalPages,
      rows: this.paginationData.totalItems,
      perPage: PAGE_SIZE,
      currentPage: this.paginationData.selfPage,
    };
  },
  methods: {
    changePage(page) {
      this.$emit("changePage", page);
    },
  },
  watch: {
    currentPage: function (val) {
      this.changePage(val);
    },
  },
};
</script>
