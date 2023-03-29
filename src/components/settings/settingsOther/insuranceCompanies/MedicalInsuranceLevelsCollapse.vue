<template>
  <div class="mt-3">
    <b-button
      v-b-toggle="`Levels${index}`"
      class="btn btn-lg btn-collapse bg-secoundery"
    >
      <div class="p-t-container">
        <div class="row collapse-title">
          <div class="col-md-12 col-lg-12">
            {{ $t("insuranceCompanies.levels") }}
          </div>
        </div>
        <div class="collapse-icon">
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </div>
      </div>
    </b-button>
    <b-collapse :id="`Levels${index}`">
      <div class="my-card row">
        <div v-if="columnList.length && rowList.length" class="table-container">
          <table class="my-table">
            <thead>
              <tr>
                <th>{{ $t("serviceName") }}</th>
                <!-- <th v-for="(column, indexCol) in columnList" :key="indexCol">
                  {{ column.name }}
                </th> -->
                <td
                  v-for="(column, indexCol) in columnList"
                  :key="indexCol"
                  class="cell-color"
                  :style="{ backgroundColor: column.color }"
                >
                  <!-- <span>{{ column.name }}</span> -->
                  {{ column.name }}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, indexRo) in rowList" :key="indexRo">
                <td>{{ row.name }}</td>
                <td
                  v-for="(percentage, indexPer) in row.percentageList"
                  :key="indexPer"
                >
                  {{ percentage }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="">{{ $t("notFound") }}</div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "MedicalInsuranceLevelsCollapse",
  components: {},
  data() {
    return {};
  },
  props: {
    index: {},
    columnList: {
      type: Array,
    },
    rowList: {
      type: Array,
    },
  },
  methods: {},
  computed: {},
  async created() {},
};
</script>

<style lang="scss"></style>
