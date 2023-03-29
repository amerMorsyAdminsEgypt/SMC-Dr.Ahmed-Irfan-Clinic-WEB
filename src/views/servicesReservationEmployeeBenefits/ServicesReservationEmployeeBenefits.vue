<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />
    <div v-if="servicesReservationEmployeeBenefitsData">
      <div class="table-container">
        <table class="my-table">
          <thead>
            <tr>
              <th>#</th>
              <th>{{ $t("image") }}</th>
              <th>{{ $t("employeeCode") }}</th>
              <th>{{ $t("employeeName") }}</th>
              <th>{{ $t("phoneNumber") }}</th>
              <th>{{ $t("specialSpecialty") }}</th>
              <th>{{ $t("insuranceCompanies.servicesCount") }}</th>
              <th>
                {{ $t("servicesReservationEmployeeBenefits.sumServicesPrice") }}
              </th>
              <th>
                {{
                  $t(
                    "servicesReservationEmployeeBenefits.sumEmployeeBenefitValue"
                  )
                }}
              </th>
              <th>
                {{
                  $t("servicesReservationEmployeeBenefits.branchBenefitValue")
                }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(
                benefit, index
              ) in servicesReservationEmployeeBenefitsData"
              :key="index"
            >
              <td>{{ ++index }}</td>
              <td>
                <img
                  class="item-img-table"
                  :src="imgSrc(benefit)"
                  :onerror="`this.src='${servicesReservationEmployeeBenefit.defaultImg}'`"
                />
              </td>
              <td>{{ benefit.employeeCode }}</td>
              <td>{{ benefit.employeeNameCurrent }}</td>
              <td>
                {{
                  benefit.employeePhone ? benefit.employeePhone : $t("notFound")
                }}
              </td>
              <td>
                {{
                  benefit.specialSpecialtyNameCurrent
                    ? benefit.specialSpecialtyNameCurrent
                    : $t("notFound")
                }}
              </td>
              <td>{{ benefit.countServices }}</td>
              <td>{{ moneyFormat(benefit.sumServicesPrice) }}</td>
              <td>{{ moneyFormat(benefit.sumEmployeeBenefitValue) }}</td>
              <td>{{ moneyFormat(benefit.difference) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination
        v-if="!isLoading"
        :paginationData="paginationData"
        v-on:changePage="changePage"
      />
    </div>

    <ServicesReservationEmployeeBenefitBtns
      :filterData="filterData"
      v-on:search="search"
    />
  </div>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import Pagination from "@/components/general/Pagination.vue";
import { STATUS, BASE_URL } from "@/utils/constants";
import { moneyFormat } from "@/utils/functions";
import ServicesReservationEmployeeBenefit from "@/models/servicesReservationEmployeeBenefits/ServicesReservationEmployeeBenefit";
import ServicesReservationEmployeeBenefitFilter from "@/models/servicesReservationEmployeeBenefits/ServicesReservationEmployeeBenefitFilter";
import ServicesReservationEmployeeBenefitBtns from "./ServicesReservationEmployeeBenefitBtns.vue";

export default {
  name: "ServicesReservationEmployeeBenefits",
  components: {
    PreLoader,
    ServicesReservationEmployeeBenefitBtns,
    ExceptionWithImg,
    Pagination,
  },
  props: {
    employeeToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      textSearch: "",
      paginationData: {
        totalPages: 1,
        totalItems: 0,
        countItemsInPage: 0,
        selfPage: 1,
        baseUrl: BASE_URL,
      },
      servicesReservationEmployeeBenefitsData: null,
      servicesReservationEmployeeBenefit:
        new ServicesReservationEmployeeBenefit(),
      filterData: new ServicesReservationEmployeeBenefitFilter(),
    };
  },
  methods: {
    moneyFormat,
    changePage(page) {
      this.paginationData.selfPage = page;
      this.getAllServicesReservationEmployeeBenefit();
    },
    search(filterData) {
      this.filterData.fillData(filterData);
      this.getAllServicesReservationEmployeeBenefit();
    },
    async getAllServicesReservationEmployeeBenefit() {
      this.isLoading = true;
      this.servicesReservationEmployeeBenefitsData = null;

      try {
        const response =
          await this.servicesReservationEmployeeBenefit.getAllServicesReservationEmployeeBenefit(
            this.language,
            this.userAuthorizeToken,
            this.selfPage,
            this.filterData
          );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
          this.paginationData = {
            totalPages:
              response.data.servicesReservationEmployeeBenefitPagination
                .totalPages,
            totalItems:
              response.data.servicesReservationEmployeeBenefitPagination
                .totalItems,
            countItemsInPage:
              response.data.servicesReservationEmployeeBenefitPagination
                .countItemsInPage,
            selfPage:
              response.data.servicesReservationEmployeeBenefitPagination
                .selfPage,
          };
          this.servicesReservationEmployeeBenefitsData =
            response.data.servicesReservationEmployeeBenefitPagination.servicesReservationEmployeeBenefitData;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.exceptionMsg = response.data.msg;
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    imgSrc(employee) {
      return BASE_URL + employee.employeeImagePath;
    },
  },
  async created() {
    this.filterData.employeeToken = this.employeeToken;
    this.getAllServicesReservationEmployeeBenefit();
  },
};
</script>

<style scoped lang="scss"></style>
