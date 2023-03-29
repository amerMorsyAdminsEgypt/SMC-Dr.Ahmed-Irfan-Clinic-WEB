<template>
  <div v-if="branchData" class="">
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>{{ $t("employeeCode") }}</th>
            <th>{{ branchData.branchNameCurrent }}</th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "BranchNameTable",
  data() {
    return {};
  },
  props: ["branchData"],
  methods: {},
  computed: {},
};
</script>

<style lang="scss"></style>
