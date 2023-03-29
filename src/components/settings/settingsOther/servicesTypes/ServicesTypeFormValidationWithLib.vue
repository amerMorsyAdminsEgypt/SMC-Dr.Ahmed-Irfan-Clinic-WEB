<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />
    <form autocomplete="off" method="post" @submit.prevent="submit" novalidate>
      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="'serviceTypeNameAr'"
            :value="form.serviceTypeNameAr"
            :title="$t('serviceTypeNameAr')"
            :imgName="'services-types.svg'"
            @:changeValue="form.serviceTypeNameAr = $event"
            v-model="form.serviceTypeNameAr"
            :v="$v.form.serviceTypeNameAr"
          />

          <!-- show errors -->
          <div v-if="$v.form.serviceTypeNameAr.$error">
            <div
              class="modal fade"
              id="addon_modal"
              tabindex="-1"
              role="dialog"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-body">
                    <p>modal test</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- <div v-if="$v.form.serviceTypeNameAr.$error">
            <span
              class="errorMessage"
              v-if="!$v.form.serviceTypeNameAr.requiredIf"
            >
              enter one at least*
            </span>
            <span
              class="errorMessage"
              v-if="!$v.form.serviceTypeNameAr.minLength"
            >
              serviceTypeNameAr must have at least
              {{ $v.form.serviceTypeNameAr.$params.minLength.min }}
              letters.*
            </span>
            <span
              class="errorMessage"
              v-if="!$v.form.serviceTypeNameAr.maxLength"
            >
              serviceTypeNameAr length must be less than
              {{ $v.form.serviceTypeNameAr.$params.maxLength.max }}
              letters*
            </span>
            <span class="errorMessage" v-if="!$v.form.serviceTypeNameAr.isAr">
              {{ $t("serviceTypeNameArMustBeArabic") }}
            </span>
          </div> -->

          <CustomInput
            :className="'col-md-6'"
            :id="'serviceTypeNameEn'"
            :value="form.serviceTypeNameEn"
            :title="$t('serviceTypeNameEn')"
            :imgName="'services-types.svg'"
            v-on:changeValue="form.serviceTypeNameEn = $event"
            v-model="form.serviceTypeNameEn"
            :v="$v.form.serviceTypeNameEn"
          />
          <!-- show errors -->
          <!-- <div v-if="$v.form.serviceTypeNameEn.$error">
            <span
              class="errorMessage"
              v-if="!$v.form.serviceTypeNameEn.requiredIf"
            >
              enter one at least*
            </span>
            <span
              class="errorMessage"
              v-if="!$v.form.serviceTypeNameEn.minLength"
            >
              serviceTypeNameEn must have at least
              {{ $v.form.serviceTypeNameEn.$params.minLength.min }}
              letters.*
            </span>
            <span
              class="errorMessage"
              v-if="!$v.form.serviceTypeNameEn.maxLength"
            >
              i18n.t("serviceTypeNameEnMustBeValidLength")
              {{ $v.form.serviceTypeNameEn.$params.maxLength.max }}
              letters*
            </span>
            <span class="errorMessage" v-if="!$v.form.serviceTypeNameEn.isEn">
              {{ $t("serviceTypeNameArMustBeEnglish") }}
            </span>
          </div> -->

          <CustomInput
            :className="'col-md-6'"
            :id="'serviceTypeNameUnd'"
            :value="form.serviceTypeNameUnd"
            :title="$t('serviceTypeNameUnd')"
            :imgName="'services-types.svg'"
            v-on:changeValue="form.serviceTypeNameUnd = $event"
            v-model="form.serviceTypeNameUnd"
            :v="$v.form.serviceTypeNameUnd"
          />
          <!-- show errors -->
          <!-- <div v-if="$v.form.serviceTypeNameUnd.$error">
            <span
              class="errorMessage"
              v-if="!$v.form.serviceTypeNameUnd.requiredIf"
            >
              enter one at least*
            </span>
            <span
              class="errorMessage"
              v-if="!$v.form.serviceTypeNameUnd.minLength"
            >
              serviceTypeNameUnd must have at least
              {{ $v.form.serviceTypeNameUnd.$params.minLength.min }}
              letters.*
            </span>
            <span
              class="errorMessage"
              v-if="!$v.form.serviceTypeNameUnd.maxLength"
            >
              serviceTypeNameUnd length must be less than
              {{ $v.form.serviceTypeNameUnd.$params.maxLength.max }}
              letters*
            </span>
          </div> -->

          <!-- descriptions -->
          <TextArea
            :className="'col-md-6'"
            :id="'serviceTypeDescriptionAr'"
            :value="form.serviceTypeDescriptionAr"
            :title="$t('serviceTypeDescriptionAr')"
            :imgName="'description.svg'"
            v-on:changeValue="form.serviceTypeDescriptionAr = $event"
            v-model="form.serviceTypeDescriptionAr"
            :v="$v.form.serviceTypeNameUnd"
          />
          <!-- show errors -->
          <!-- <div v-if="$v.form.serviceTypeDescriptionAr.$error">
            <span
              class="errorMessage"
              v-if="!$v.form.serviceTypeDescriptionAr.isArText"
            >
              write serviceTypeDescriptionAr correctly!
            </span>
            <span
              class="errorMessage"
              v-if="!$v.form.serviceTypeDescriptionAr.minLength"
            >
              serviceTypeDescriptionAr must have at least
              {{ $v.form.serviceTypeDescriptionAr.$params.minLength.min }}
              letters.*
            </span>
            <span
              class="errorMessage"
              v-if="!$v.form.serviceTypeDescriptionAr.maxLength"
            >
              serviceTypeDescriptionAr length must be less than
              {{ $v.form.serviceTypeDescriptionAr.$params.maxLength.max }}
              letters*
            </span>
          </div> -->
        </div>
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ submitName }}
        </button>
        <router-link to="/services-types" class="btn btn-cancel">
          {{ $t("cancel") }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { minLength, maxLength, requiredUnless } from "vuelidate/lib/validators";
import { isAr, isEn, isArText } from "@/servicesTypeValidator";
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import CustomInput from "@/components/general/CustomInput.vue";
import TextArea from "@/components/general/TextArea.vue";

export default {
  name: "ServicesTypeForm",
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomInput,
    TextArea,
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
      form: {
        serviceTypeNameAr: "",
        serviceTypeNameEn: "",
        serviceTypeNameUnd: "",
        serviceTypeDescriptionAr: "",
        serviceTypeDescriptionEn: "",
        serviceTypeDescriptionUnd: "",
      },
    };
  },
  validations: {
    form: {
      serviceTypeNameEn: {
        minLength: minLength(3),
        maxLength: maxLength(50),
        isEn,
        requiredIf: requiredUnless(function () {
          return (
            this.form.serviceTypeNameAr !== "" ||
            this.form.serviceTypeNameUnd !== ""
          );
        }),
      },
      serviceTypeNameAr: {
        minLength: minLength(3),
        maxLength: maxLength(50),
        isAr,
        requiredIf: requiredUnless(function () {
          return (
            this.form.serviceTypeNameEn !== "" ||
            this.form.serviceTypeNameUnd !== ""
          );
        }),
      },
      serviceTypeNameUnd: {
        minLength: minLength(3),
        maxLength: maxLength(50),
        requiredIf: requiredUnless(function () {
          return (
            this.form.serviceTypeNameAr !== "" ||
            this.form.serviceTypeNameEn !== ""
          );
        }),
      },
      serviceTypeDescriptionAr: {
        minLength: minLength(3),
        maxLength: maxLength(500),
        isArText,
      },
    },
  },
  props: ["servicesTypeData", "submitName"],
  methods: {
    async addOrUpdateServicesType() {
      this.$emit("addOrUpdateServicesType");
    },
    setDataMultiLang(lang, dataAr, dataEn) {
      if (lang == "en") return dataEn;
      else return dataAr;
    },
    submit() {
      this.$v.form.$touch();
      // if its still pending or an error is returned do not submit
      if (this.$v.form.$pending || this.$v.form.$error) return;
      // to form submit after this
      alert("Form submitted");
      console.log(this.form);
    },
  },
  watch: {},
  async created() {},
};
</script>

<style scoped>
.errorMessage {
  color: #f00;
}
.btn {
  background-color: blue;
  color: azure;
}
.red-border {
  border-color: #f00;
}
</style>
