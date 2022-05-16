<template>
  <div class="center_man">
    <InputText v-model="inputUsername" style="margin-bottom: 10px" placeholder="Enter Username" />
    <InputText v-model="inputEmail" style="margin-bottom: 10px" placeholder="Enter E-mail" />
    <InputText type="password" v-model="inputPassword" style="margin-bottom: 10px" placeholder="Enter Password" />
    <Button class="p-button-rounded p-button-secondary " > Sign up </Button>
  </div>
</template>

<script setup lang="ts">
import { UserStore } from "@/stores/userStore";
import { ref } from "vue";


const userStore = UserStore();
const inputUsername = ref("");
const inputPassword = ref("");
const inputEmail = ref("");

</script>
<style>
.center_man{
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
