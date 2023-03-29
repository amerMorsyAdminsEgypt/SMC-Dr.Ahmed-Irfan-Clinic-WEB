<template>
  <b-modal
    id="ServicesReservationAddClient"
    scrollable
    centered
    hide-footer
    size="xl"
  >
    <PreLoader v-if="isLoading" />
    <ExceptionWithImg v-if="exceptionMsg" :msg="exceptionMsg" />

    <template #modal-title>
      <h3>
        <img src="@/assets/images/plus.svg" class="icon-lg" />
        {{ $t("addClient") }}
      </h3>
    </template>
    <form autocomplete="off" method="post" @submit.prevent="addClient">
      <div class="row">
        <CustomInput
          v-if="language == 'ar'"
          :className="'col-lg-6'"
          :id="'clientNameAr'"
          :value="clientData.clientNameAr"
          :title="$t('clientNameAr')"
          :imgName="'clients.svg'"
          v-on:changeValue="clientData.clientNameAr = $event"
        />
        <CustomInput
          v-else
          :className="'col-lg-6'"
          :id="'clientNameEn'"
          :value="clientData.clientNameEn"
          :title="$t('clientNameEn')"
          :imgName="'clients.svg'"
          v-on:changeValue="clientData.clientNameEn = $event"
        />
        <CustomInput
          :className="'col-lg-6'"
          :id="'clientCode'"
          :value="clientData.clientCode"
          :title="$t('clientCode')"
          :imgName="'number.svg'"
          v-on:changeValue="clientData.clientCode = $event"
        />
        <TelPicker
          :className="'col-lg-6'"
          :value="clientData.clientCCWithCCName"
          v-on:changeCC="clientData.clientCCWithCCName = $event"
          :id="'clientCCWithCCName'"
        />
        <CustomInput
          :className="'col-lg-6'"
          :id="'clientPhone'"
          :value="clientData.clientPhone"
          :title="$t('phoneNumber')"
          :imgName="'phone.svg'"
          v-on:changeValue="clientData.clientPhone = $event"
        />
        <CustomInput
          :className="'col-lg-6'"
          :id="'clientEmail'"
          :value="clientData.clientEmail"
          :title="$t('email')"
          :imgName="'email.svg'"
          v-on:changeValue="clientData.clientEmail = $event"
        />
        <CustomInput
          :className="'col-lg-6'"
          :id="'clientUserName'"
          :value="clientData.clientUserName"
          :title="$t('userName')"
          :imgName="'man.svg'"
          v-on:changeValue="clientData.clientUserName = $event"
        />
        <TextArea
          v-if="language == 'ar'"
          :className="'col-lg-6'"
          :id="'clientAddressAr'"
          :value="clientData.clientAddressAr"
          :title="$t('addressAr')"
          :imgName="'address.svg'"
          v-on:changeValue="clientData.clientAddressAr = $event"
        />
        <TextArea
          v-else
          :className="'col-lg-6'"
          :id="'clientAddressEn'"
          :value="clientData.clientAddressEn"
          :title="$t('addressEn')"
          :imgName="'address.svg'"
          v-on:changeValue="clientData.clientAddressEn = $event"
        />

        <DatePicker
          :className="'col-lg-6'"
          :id="'clientBirthdate'"
          :value="clientData.clientBirthdate"
          :title="$t('birthdate')"
          :language="language"
          v-on:changeValue="clientData.clientBirthdate = $event"
        />
      </div>

      <div class="form-footer">
        <button name="submit" type="submit" class="btn btn-submit">
          {{ $t("add") }}
        </button>
        <button
          class="btn btn-cancel"
          @click.prevent="$bvModal.hide('ServicesReservationAddClient')"
        >
          {{ $t("cancel") }}
        </button>
      </div>
    </form>
  </b-modal>
</template>

<script>
import PreLoader from "@/components/general/PreLoader.vue";
import ExceptionWithImg from "@/components/general/ExceptionWithImg.vue";
import { STATUS } from "@/utils/constants";
import Client from "@/models/clients/Client";
import createToastMixin from "@/utils/create-toast-mixin";
import TelPicker from "@/components/general/TelPicker.vue";
import CustomInput from "@/components/general/CustomInput.vue";
import TextArea from "@/components/general/TextArea.vue";
import DatePicker from "@/components/general/DatePicker.vue";

export default {
  name: "ServicesReservationAddClient",
  mixins: [createToastMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    TelPicker,
    CustomInput,

    TextArea,
    DatePicker,
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
      clientData: new Client(),
    };
  },
  methods: {
    async addClient() {
      this.isLoading = true;
      try {
        let response = await this.clientData.addOrUpdateClient(
          this.language,
          this.userAuthorizeToken
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("ServicesReservationAddClient");
          this.$emit("clientAdded");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("updateUserData", null);
          this.$router.push("/").catch(() => {});
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (e) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
  },
  props: [""],
  computed: {},
  async created() {},
};
</script>

<style scoped lang="scss"></style>
