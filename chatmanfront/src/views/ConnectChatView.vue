<template>
  <!--#option="slotProps"-->
  <div class="row ms-3 mt-3">
    <div class="col-2">
      <Listbox
        v-model="selectAccessibleRooms"
        :options="roomStore.accessibleRooms"
        :multiple="false"
        :filter="true"
        optionLabel="roomName"
        listStyle="max-height:500px"
        style="width: 15rem"
        filterPlaceholder="Search"
      >
        <div class="friend-item">
          <!--<div>{{ slotProps.option.roomName() }}</div>-->
        </div>
      </Listbox>
    </div>
    <div class="col-2">
      <Button
        @click="connectToChatRoom"
        class="p-button-raised p-button-secondary p-button-sm p-button-rounded"
        icon="pi pi-refresh"
        label="connect"
      ></Button>
      <br />
      <br />
      <InputText v-model="txtChatRoomInput" placeholder="Enter room name" />
      <Button
        class="p-button-rounded p-button-secondary p-button-raised"
        @click="connect"
        >backup connect</Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { RoomStore } from "@/stores/roomStore";
import { ChatStore } from "@/stores/chatStore";
import router from "@/router";
import { ref } from "vue";
import { UserStore } from "@/stores/userStore";

const roomStore = RoomStore();
const chatStore = ChatStore();
const userStore = UserStore();
const selectAccessibleRooms = ref();
const txtChatRoomInput = ref("");
refresh();

function refresh() {
  roomStore.getAccessibleRoom(userStore.userName);
}
async function connectToChatRoom() {
  console.log(selectAccessibleRooms.value.roomName);
  await chatStore.setRoom(selectAccessibleRooms.value.roomName);
  //await router.push("/chat");
}
async function connect() {
  await chatStore.setRoom(txtChatRoomInput.value);
}
</script>

<style scoped></style>
