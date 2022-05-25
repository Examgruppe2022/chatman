<template>
  <!--#option="slotProps"-->
  <div class="row ms-3 mt-3">
    <div class="col-2">
      <Listbox
        v-model="selectAccessibleRooms"
        :options="this.roomStore.accessibleRooms"
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
        @click="refresh"
        class="p-button-raised p-button-secondary p-button-sm p-button-rounded"
        icon="pi pi-refresh"
        label="Refresh"
      ></Button>
      <br />
      <br />
      <Button
        @click="connectToChatRoom"
        class="p-button-raised p-button-secondary p-button-sm p-button-rounded"
        icon="pi pi-check-circle"
        label="Connect"
      ></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RoomStore } from "@/stores/roomStore";
import { ChatStore } from "@/stores/chatStore";
import router from "@/router";
import { ref } from "vue";

const roomStore = RoomStore();
const chatStore = ChatStore();
const selectAccessibleRooms = ref();
refresh();

function refresh() {
  roomStore.getAccessibleRoom();
}
function connectToChatRoom() {
  chatStore.setRoom("firstsroom");
  router.push("/chat");
  //window.location.href =('/chat')
}
</script>

<style scoped></style>
