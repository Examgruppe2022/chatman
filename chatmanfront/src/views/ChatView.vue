<template>

  <div style="overflow:scroll">
    <li v-for="(chat, index) in chatStore.chats" v-bind:key="index">
      {{ chat.sender }} : {{ chat.text }} : {{chat.timeStamp}}
    </li>
    <Button @click="connectToChatRoom" > Connect</Button>
  </div>
  <div class="left-man">
    <div class="top-man">
      <br />
      <h3>Send a Message</h3>
      <InputText v-model="txtChatInput" placeholder="Enter message" />
      <br/>
      <Button class="p-button-rounded p-button-secondary " @click="sendChat">Send</Button>
      <br />
      <br />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatStore } from "@/stores/chatStore";
import { UserStore } from "@/stores/userStore";
import { ref } from "vue";

const chatStore = ChatStore();
const userStore = UserStore();
const txtChatInput = ref("");
const roomChatInput = ref("");
const roomListener = ref("");
const loggedInUserName = userStore.userName;

function ListenToRoom() {
  chatStore.setRoom(roomListener.value);
}

function sendChat() {
  chatStore.createChat( {
    timeStamp: new Date(),
    text: txtChatInput.value,
    room: roomChatInput.value,
    sender: loggedInUserName
  });
}

function connectToChatRoom(){
  chatStore.setRoom("firstsroom")
}

</script>

<style>
.left-man{
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: left;
}
.top-man{
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
}

</style>
