<template>
  <div class="">
    <p class="alert alert-success text-center" role="alert">
      {{ success }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Success",
  props: ["success"],
};
</script>

<style scoped lang="scss"></style>
