<template>
  <b-modal id="EmployeeInfo" scrollable size="lg" centered hide-footer>
    <template #modal-title>
      <h3>
        <img src="@/assets/images/employees.svg" class="icon-lg" />
        {{ $t("employeeData") }}
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
              :value="employeeData.employeeNameAr"
              :title="$t('employeeNameAr')"
              :imgName="'man.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="employeeData.employeeNameEn"
              :title="$t('employeeNameEn')"
              :imgName="'man.svg'"
            />

            <DataLabelGroup
              :className="'col-lg-6'"
              :value="employeeData.employeeUserName"
              :title="$t('userName')"
              :imgName="'man.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="employeeData.employeeEmail"
              :title="$t('email')"
              :imgName="'email.svg'"
            />

            <DataLabelGroup
              :className="'col-lg-6'"
              :value="employeeData.employeePhone"
              :title="$t('phoneNumber')"
              :imgName="'phone.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="employeeData.employeeBirthdate"
              :title="$t('birthdate')"
              :imgName="'date.svg'"
            />

            <DataLabelGroup
              :className="'col-lg-6'"
              :value="employeeData.employeeGenderNameCurrent"
              :title="$t('gender')"
              :imgName="'gender.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="employeeData.qualificationNameCurrent"
              :title="$t('qualificationName')"
              :imgName="'qualifications.svg'"
            />
          </div>
        </div>
      </b-collapse>
      <b-button v-b-toggle.employeeData class="btn btn-lg btn-collapse">
        {{ $t("employeeData") }}
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </b-button>
      <b-collapse visible id="employeeData">
        <div class="my-card">
          <span class="my-card-title">{{ $t("employeeData") }}</span>

          <div class="row">
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="employeeData.sectorNameCurrent"
              :title="$t('sectorName')"
              :imgName="'sectors.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="employeeData.jobNameCurrent"
              :title="$t('jobName')"
              :imgName="'jobs.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="employeeData.generalSpecialtyNameCurrent"
              :title="$t('generalSpecialtyName')"
              :imgName="'general-specialities.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="employeeData.specialSpecialtyNameCurrent"
              :title="$t('specialSpecialtyName')"
              :imgName="'special-spcialities.svg'"
            />

            <DataLabelGroup
              :className="'col-lg-6'"
              :value="employeeData.employeeNationalNumber"
              :title="$t('nationalNumber')"
              :imgName="'nationalNumber.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="employeeData.employeeNationalNumberExpireDate"
              :title="$t('nationalNumberExpireDate')"
              :imgName="'date.svg'"
            />

            <DataLabelGroup
              :className="'col-lg-6'"
              :value="employeeData.employeeDrivingLicenceNumber"
              :title="$t('drivingLicenceNumber')"
              :imgName="'drivingLicense.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="employeeData.employeeDrivingLicenceExpireDate"
              :title="$t('drivingLicenceExpireDate')"
              :imgName="'date.svg'"
            />

            <DataLabelGroup
              :className="'col-lg-6'"
              :value="employeeData.employeePassportNumber"
              :title="$t('passportNumber')"
              :imgName="'passportNumber.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="employeeData.employeePassportExpireDate"
              :title="$t('passportExpireDate')"
              :imgName="'date.svg'"
            />

            <DataLabelGroup
              :className="'col-lg-6'"
              :value="employeeData.employeeMaritalNameCurrent"
              :title="$t('maritalStatus')"
              :imgName="'maritalStatus.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="employeeData.employeeMaritalStatusNotes"
              :title="$t('maritalStatusNotes')"
              :imgName="'notes.svg'"
            />

            <DataLabelGroup
              :className="'col-lg-6'"
              :value="employeeData.employeeMilitaryNameCurrent"
              :title="$t('militaryStatus')"
              :imgName="'militaryStatus.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="employeeData.employeeMilitaryStatusNotes"
              :title="$t('militaryStatusNotes')"
              :imgName="'notes.svg'"
            />

            <DataLabelGroup
              :className="'col-lg-6'"
              :value="employeeData.employeeTypeNameCurrent"
              :title="$t('employeeType')"
              :imgName="'man.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="employeeData.employeeNotes"
              :title="$t('employeeNotes')"
              :imgName="'notes.svg'"
            />

            <DataLabelGroup
              :className="'col-lg-6'"
              :value="employeeData.employeeAddressAr"
              :title="$t('employeeAddressAr')"
              :imgName="'address.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="employeeData.employeeAddressEn"
              :title="$t('employeeAddressEn')"
              :imgName="'address.svg'"
            />

            <DataLabelGroup
              :className="'col-lg-6'"
              :value="employeeData.bloodTypeNameCurrent"
              :title="$t('bloodTypeName')"
              :imgName="'blood-types.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-6'"
              :value="employeeData.scientificDegreeNameCurrent"
              :title="$t('scientificDegreeName')"
              :imgName="'scientific-degrees.svg'"
            />
            <DataLabelGroup
              :className="'col-lg-12'"
              :value="
                employeeData.employeeActiveStatus === true
                  ? $t('yes')
                  : $t('no')
              "
              :title="$t('employeeActiveStatus')"
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
import { timeToLang } from "@/utils/functions";

export default {
  name: "EmployeeInfo",
  components: {
    DataLabelGroup,
  },
  data() {
    return {
      language: localStorage.getItem("userLanguage") || "ar",
    };
  },
  props: ["employeeData"],
  methods: {
    timeToLang(time) {
      return timeToLang(time, this.language);
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
  },
};
</script>

<style scoped lang="scss"></style>
