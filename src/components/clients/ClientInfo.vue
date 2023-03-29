<template>
  <b-modal id="ClientInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/clients.svg" class="icon-lg" />
        {{ $t("clientData") }}
      </h3>
    </template>
    <div class="">
      <b-button v-b-toggle.personalData class="btn btn-lg btn-collapse">
        {{ $t("personalData") }}
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </b-button>
      <b-collapse visible id="personalData">
        <div class="my-card">
          <span class="my-card-title">{{ $t("personalData") }}</span>

          <div class="row">
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.clientNameAr"
              :title="$t('clientNameAr')"
              :imgName="'clients.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.clientNameEn"
              :title="$t('clientNameEn')"
              :imgName="'clients.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.clientNameUnd"
              :title="$t('clientNameUnd')"
              :imgName="'clients.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.clientPhoneWithCC"
              :title="$t('phoneNumber')"
              :imgName="'phone.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.clientEmail"
              :title="$t('email')"
              :imgName="'email.svg'"
            />

            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.clientNickNameAr"
              :title="$t('clientNickNameAr')"
              :imgName="'clients.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.clientNickNameEn"
              :title="$t('clientNickNameEn')"
              :imgName="'clients.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.clientNickNameUnd"
              :title="$t('clientNickNameUnd')"
              :imgName="'clients.svg'"
            />

            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.clientAddressAr"
              :title="$t('addressAr')"
              :imgName="'address.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.clientAddressEn"
              :title="$t('addressEn')"
              :imgName="'address.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.clientAddressUnd"
              :title="$t('addressUnd')"
              :imgName="'address.svg'"
            />

            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.countryNameCurrent"
              :title="$t('country')"
              :imgName="'country.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.governateNameCurrent"
              :title="$t('governate')"
              :imgName="'governate.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.cityNameCurrent"
              :title="$t('city')"
              :imgName="'city.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.districtNameCurrent"
              :title="$t('district')"
              :imgName="'district.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.qualificationNameCurrent"
              :title="$t('qualificationName')"
              :imgName="'qualifications.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.clientBirthdate"
              :title="$t('birthdate')"
              :imgName="'date.svg'"
            />

            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.clientAgeCurrent"
              :title="$t('age')"
              :imgName="'number.svg'"
            />

            <DataLabelGroup
              :className="'col-lg-6'"
              :value="moneyFormat(clientData.clientWalletBalance)"
              :title="$t('pointsAndWallets.wallets.balance')"
              :imgName="'wallet.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.clientTotalTransactionPoints"
              :title="$t('pointsAndWallets.points.balance')"
              :imgName="'points.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-12'"
              :value="clientData.clientGenderNameCurrent"
              :title="$t('gender')"
              :imgName="'gender.svg'"
            />
          </div>
        </div>
      </b-collapse>
      <b-button v-b-toggle.clientData class="btn btn-lg btn-collapse">
        {{ $t("clientData") }}
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </b-button>
      <b-collapse visible id="clientData">
        <div class="my-card">
          <span class="my-card-title">{{ $t("clientData") }}</span>

          <div class="row">
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.insuranceCompanyNameCurrent"
              :title="$t('insuranceCompany')"
              :imgName="'type.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.clientInsuranceNumber"
              :title="$t('insuranceNumber')"
              :imgName="'number.svg'"
            />

            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.clientBankNameCurrent"
              :title="$t('bankName')"
              :imgName="'banks.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.clientCitizenShipTypeNameCurrent"
              :title="$t('citizenship')"
              :imgName="'citizenship.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.clientAddingDateToSystem"
              :title="$t('clientAddingDateToSystem')"
              :imgName="'date.svg'"
            />

            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.clientResidencyNumber"
              :title="$t('clientResidencyNumber')"
              :imgName="'number.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.clientResidencyStartDate"
              :title="$t('clientResidencyEndDate')"
              :imgName="'date.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.clientMaritalNameCurrent"
              :title="$t('maritalStatus')"
              :imgName="'maritalStatus.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.clientMaritalStatusNotes"
              :title="$t('maritalStatusNotes')"
              :imgName="'notes.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.clientMilitaryNameCurrent"
              :title="$t('militaryStatus')"
              :imgName="'militaryStatus.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.bloodTypeNameCurrent"
              :title="$t('bloodTypeName')"
              :imgName="'blood-types.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.clientMaritalStatusNotes"
              :title="$t('militaryStatusNotes')"
              :imgName="'notes.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="clientData.clientNationalNumber"
              :title="$t('nationalNumber')"
              :imgName="'number.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="
                clientData.clientActiveStatus === true ? $t('yes') : $t('no')
              "
              :title="$t('clientActiveStatus')"
              :imgName="'type.svg'"
            />
          </div>
        </div>
      </b-collapse>
    </div>
  </b-modal>
</template>

<script>
import DataLabelGroup from "@/components/general/DataLabelGroup.vue";
import { setDataMultiLang, timeToLang, moneyFormat } from "@/utils/functions";

export default {
  name: "ClientInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["clientData"],
  methods: {
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      return setDataMultiLang(lang, dataAr, dataEn);
    },
    moneyFormat(money) {
      return moneyFormat(money);
    },
  },
};
</script>

<style scoped lang="scss"></style>
