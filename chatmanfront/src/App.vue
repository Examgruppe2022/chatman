<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
import PWAPrompt from './components/PWAPrompt.vue'

import { computed, createApp } from "vue";
import App from "./App.vue";
import { UserStore } from "@/stores/userStore";

import { ref } from "vue";

export default {
  components: { PWAPrompt },
  setup() {
    const userStore = UserStore();
    const showToolBar = computed<boolean>((): boolean => {
      return userStore.isLoggedIn;
    });
    const logOutUser = () => {
      userStore.logOut();
    };
    const items = ref([
      {
        label: "Create chat",
        icon: "pi pi-plus",
        command: () => {
          window.location.href = "/createchat";
        },
      },
      {
        label: "Connect to chat",
        icon: "pi pi-directions",
        command: () => {
          window.location.href = "ConnectChatView";
        },
      },
      {
        label: "Chat Room",
        icon: "pi pi-comments",
        command: () => {
          window.location.href = "/chat";
        },
      },
    ]);
    return { items, showToolBar, logOutUser };
  },
};
</script>

<template>
  <PWAPrompt />
  <Toolbar style="margin: 5px 15px" v-if="true">
    <template #start>
      <div id="img_reroute" @click="$router.push('/')">
        <img src="../src/assets/mini-logov2.png" width="46" height="46" />
        &nbsp; &nbsp; &nbsp;
      </div>
      <SplitButton
        label="CHAT"
        icon="pi pi-comment"
        :model="items"
        class="p-button-rounded p-button-raised p-button-secondary"
        style="margin-right: 15px"
      />

      <Button
        @click="$router.push('/friend')"
        label="FRIENDS"
        icon="pi pi-user-edit"
        class="p-button-rounded p-button-secondary"
        style="margin-right: 15px"
      />
    </template>
    <template #end>
      <Button
        @click="logOutUser"
        icon="pi pi-times"
        class="p-button-secondary p-button-rounded"
      />
    </template>
  </Toolbar>
  <RouterView style="grid-area: body" />
</template>

<style>
#app {
  font-family: "Avenir", "Helvetica", "Arial", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: grid;
  grid-template-rows: 100px 1fr;
  grid-template-areas: "header" "body";
  height: 100%;
}

html,
body {
  height: 100vh;
}

* {
  padding: 0;
  margin: 0;
}
</style>
