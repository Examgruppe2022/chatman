<template>
  <div class="center_man">
    <h3>Create New User</h3>
    <br />
    <InputText
      v-model="inputEmail"
      style="margin-bottom: 10px"
      placeholder="Enter Email"
    />
    <InputText
      v-model="inputUsername"
      style="margin-bottom: 10px"
      placeholder="Enter Username"
    />
    <InputText
      type="password"
      v-model="inputPassword"
      style="margin-bottom: 10px"
      placeholder="Enter Password"
    />
    <Button @click="handleCreateUser" class="btn"> Sign up </Button>
  </div>
</template>

<script setup lang="ts">
import { UserStore } from "@/stores/userStore";
import { ref } from "vue";

const userStore = UserStore();
const inputUsername = ref("");
const inputPassword = ref("");
const inputEmail = ref("");

function handleCreateUser() {
  userStore.createUser(
    inputEmail.value,
    inputUsername.value,
    inputPassword.value
  );
  window.location.href = "/";
}
</script>
<style>
.center_man {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.btn1 {
  background-color: dimgrey;
  border: none;
  color: white;
  padding: 12px 16px;
  font-size: 16px;
  cursor: pointer;
}
</style>
