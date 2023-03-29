<template>
  <div class="home">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "@/components/user/LoginForm.vue";

export default {
  name: "Login",
  components: {
    LoginForm,
  },
};
</script>
