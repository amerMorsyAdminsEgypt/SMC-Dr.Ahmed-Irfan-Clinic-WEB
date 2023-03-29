<template>
  <div v-if="storeData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>{{ $t("employeeCode") }}</th>
            <th>{{ storeData.storeNameCurrent }}</th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "StoreNameTable",
  data() {
    return {};
  },
  props: ["storeData"],
  methods: {},
  computed: {},
};
</script>

<style lang="scss"></style>
