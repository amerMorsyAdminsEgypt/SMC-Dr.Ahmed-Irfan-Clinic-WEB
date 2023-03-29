<template>
  <div v-if="clientData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>{{ $t("employeeCode") }}</th>
            <th>{{ clientData.clientNameCurrent }}</th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClientNameTable",
  data() {
    return {};
  },
  props: ["clientData"],
  methods: {},
  computed: {},
};
</script>

<style lang="scss"></style>
