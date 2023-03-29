<template>
  <div>
    <table class="my-table">
      <tr>
        <td>
          <aplayer :audio="audio" />
        </td>
        <td>
          <router-link
            :to="{
              name: 'ReservationMediaEdit',
              params: {
                clientToken: reservationMediaData.clientToken,
                reservationMediaToken:
                  reservationMediaData.reservationMediaToken,
              },
            }"
            :title="$t('edit')"
          >
            <img src="@/assets/images/pencil.svg" class="icon-lg" />
          </router-link>
        </td>
        <td>
          <button
            v-b-modal.ReservationMediaDelete
            class="btn p-0"
            :title="$t('delete')"
            @click="setReservationMediaData(reservationMediaData)"
          >
            <img src="@/assets/images/trash.svg" class="icon-lg" />
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { BASE_URL } from "@/utils/constants";
export default {
  name: "CustomAudioPlayer",
  data() {
    return {
      audio: {
        name: this.name,
        artist: this.artist,
        url: BASE_URL + this.audioSrc,
        cover: this.image,
      },
    };
  },
  methods: {
    setReservationMediaData() {
      this.$emit("setReservationMediaData", this.reservationMediaData);
    },
  },
  props: {
    name: {
      type: String,
      default: "",
    },
    artist: {
      type: String,
      default: "",
    },
    audioSrc: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "aplyer",
    },
    reservationMediaData: {
      type: Object,
    },
  },
  watch: {},
  async created() {},
};
</script>

<style lang="scss" scoped></style>
