<template>
  <div class="row ms-3 mt-3">
    <div class="col-6">
      <h5>Create chat room</h5>
      <InputText
        v-model="inputRoomName"
        style="margin-bottom: 10px"
        placeholder="Enter Room Name"
      />
      <br />
      <Button
        @click="handleCreateRoom"
        class="p-button-raised p-button-secondary p-button-sm p-button-rounded"
        icon="pi pi-caret-right"
        label="Create"
      ></Button>
    </div>
    <div class="col-6">
      <h5 class="w-75 mx-auto">Chat Room List</h5>
      <Listbox
        v-model="chatList"
        :options="roomStore.accessibleRooms"
        optionLabel="roomName"
        style="width: 15rem; min-height: 300px"
      />
      <br />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RoomService } from "@/services/room.service";
import { RoomStore } from "@/stores/roomStore";
import { UserStore } from "@/stores/userStore";

const inputRoomName = ref("");
const roomService = new RoomService();
const roomStore = RoomStore();
const userStore = UserStore();
const chatList = ref();
refresh();

function handleCreateRoom() {
  roomStore.createRoom(inputRoomName.value, userStore.userName);
}
function refresh() {
  roomStore.getAccessibleRoom();
}
</script>

<style scoped>
.left-girl {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
}

.right-girl {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: right;
}
</style>
