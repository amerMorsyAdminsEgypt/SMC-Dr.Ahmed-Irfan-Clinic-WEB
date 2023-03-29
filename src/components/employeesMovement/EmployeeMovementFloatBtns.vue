<template>
  <div class="fab-container">
    <div class="fab-parent fab-icon-holder">
      <i class="fa fa-chevron-up"></i>
    </div>
    <ul class="fab-options">
      <li>
        <span class="fab-label">
          <router-link :to="'/add-movement-employee/' + attendanceToken">
            {{ $t("movementAdd") }}
          </router-link>
        </span>
        <div class="fab-icon-holder">
          <router-link :to="'/add-movement-employee/' + attendanceToken">
            <img src="@/assets/images/plus.svg" />
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "EmployeeMovementFloatBtns",
  props: {
    attendanceToken: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
