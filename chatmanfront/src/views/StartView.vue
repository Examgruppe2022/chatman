<template>
  <main>
    <div>
      <div class="center_man">
        <img src="../assets/Chatman_Logov3.png" width="600" height="450">
      </div>
      <div class="center_man">
        <InputText v-model="inputUsername" style="margin-bottom: 10px" placeholder="Enter Username" />
        <InputText type="password" v-model="inputPassword" style="margin-bottom: 10px" placeholder="Enter Password" />
        <sub @click="$router.push('/createUser')">Create Account</sub> <br>
        <Button @click="handleLoginUser" class="p-button-rounded p-button-secondary " > Sign in </Button>
      </div>
    </div>


  </main>
</template>

<script setup lang="ts">
import { UserStore } from "@/stores/userStore";
import { ref } from "vue";


const userStore = UserStore();
const inputUsername = ref("");
const inputPassword = ref("");

function handleLoginUser() {
  userStore.loginUser(inputUsername.value,inputPassword.value);
}

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
