<template>
  <div
    v-if="servicesReservationAddedServices.servicesReservationAddedServicesData"
    class=""
  >
    <div class="table-container">
      <table class="my-table">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("reservation") }}</th>
            <th>{{ $t("ServicesReservationAddedServices.code") }}</th>
            <th>{{ $t("ServicesReservationAddedServices.name") }}</th>
            <th>{{ $t("responsibleForProvidingTheService") }}</th>
            <th>{{ $t("serviceName") }}</th>
            <th>{{ $t("serviceTypeName") }}</th>
            <th>{{ $t("specialSpecialtyName") }}</th>
            <th>{{ $t("generalSpecialtyName") }}</th>
            <th>{{ $t("serviceProvideTypeName") }}</th>
            <th>{{ $t("servicePrice") }}</th>
            <th>{{ $t("totalPaid") }}</th>
            <th>{{ $t("remainingAmount") }}</th>
            <th>{{ $t("newPayment") }}</th>
            <th>{{ $t("receipt") }}</th>
            <th>{{ $t("receiptWithTax") }}</th>
            <th>{{ $t("info") }}</th>
            <th>{{ $t("cancel") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(
              AddedItem, index
            ) in servicesReservationAddedServices.servicesReservationAddedServicesData"
            :key="index"
          >
            <td>{{ ++index }}</td>
            <td>
              {{
                `${$t("reservationCode")}: ${isDataExist(
                  AddedItem.mainReservationData.reservationCode
                )} ${$t("quma")} ${$t("onDate")}: ${isDataExist(
                  AddedItem.mainReservationData.reservationDate
                )}`
              }}
            </td>
            <td>{{ isDataExist(AddedItem.reservationAddedServicesCode) }}</td>
            <td>
              {{ isDataExist(AddedItem.reservationAddedServicesNameCurrent) }}
            </td>
            <td>
              {{
                (AddedItem.mainReservationData.jobNameCurrent
                  ? AddedItem.mainReservationData.jobNameCurrent + ": "
                  : "") +
                isDataExist(AddedItem.mainReservationData.employeeNameCurrent)
              }}
            </td>
            <td>{{ isDataExist(AddedItem.serviceNameCurrent) }}</td>
            <td>{{ isDataExist(AddedItem.serviceTypeNameCurrent) }}</td>
            <td>{{ isDataExist(AddedItem.specialSpecialtyNameCurrent) }}</td>
            <td>{{ isDataExist(AddedItem.generalSpecialtyNameCurrent) }}</td>
            <td>{{ isDataExist(AddedItem.serviceProvideTypeNameCurrent) }}</td>
            <td>{{ moneyFormat(AddedItem.servicePrice) }}</td>
            <td>{{ moneyFormat(AddedItem.totalPaid) }}</td>
            <td>{{ moneyFormat(AddedItem.remainingAmount) }}</td>
            <td>
              <button
                :disabled="AddedItem.remainingAmount == 0"
                class="btn p-0"
                :title="$t('newPayment')"
                @click="newPayment(AddedItem)"
              >
                <img src="@/assets/images/pay.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <button
                v-b-modal.ServicesReservationAddedServiceReceipt
                class="btn p-0"
                :title="$t('receipt')"
                @click="setServicesReservationAddedServiceData(AddedItem)"
              >
                <img src="@/assets/images/receipt.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <button
                v-b-modal.ServicesReservationAddedServiceReceiptWithTax
                class="btn p-0"
                :title="$t('receiptWithTax')"
                @click="setServicesReservationAddedServiceData(AddedItem)"
              >
                <img src="@/assets/images/receiptWithTax.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <button
                v-b-modal.ServicesReservationAddedServiceInfo
                class="btn p-0"
                :title="$t('info')"
                @click="setServicesReservationAddedServiceData(AddedItem)"
              >
                <img src="@/assets/images/info.svg" class="icon-lg" />
              </button>
            </td>
            <td>
              <span v-if="AddedItem.refoundStatus">
                {{ $t("canceled") }}
              </span>
              <button
                v-else
                v-b-modal.ServicesReservationAddedServiceCancel
                class="btn p-0"
                :title="$t('cancel')"
                @click="setServicesReservationAddedServiceData(AddedItem)"
              >
                <img src="@/assets/images/cancel.svg" class="icon-lg" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from "@/utils/constants";
import {
  setDataMultiLang,
  timeToLang,
  isDataExist,
  moneyFormat,
} from "@/utils/functions";
import createToastMixin from "@/utils/create-toast-mixin";

export default {
  name: "ServicesReservationAddedServicesTable",
  mixins: [createToastMixin],
  components: {},
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
      userAuthorizeToken:
        this.$store.getters.userData.userPersonalData.userAuthorizeToken ||
        null,
      baseUrl: BASE_URL,
    };
  },
  props: ["servicesReservationAddedServices", "filterData"],
  methods: {
    async newPayment(AddedItem) {
      this.$emit("newPayment", AddedItem);
    },

    setServicesReservationAddedServiceData(
      servicesReservationAddedServiceData
    ) {
      this.$emit(
        "setServicesReservationAddedServiceData",
        servicesReservationAddedServiceData
      );
    },
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    setDataMultiLang(lang, dataAr, dataEn, dataUnd) {
      return setDataMultiLang(lang, dataAr, dataEn, dataUnd);
    },
    isDataExist(data) {
      return isDataExist(data);
    },
    moneyFormat(money) {
      return moneyFormat(money);
    },
  },
  computed: {},
};
</script>

<style lang="scss"></style>
