<template>
  <div class="left-girl">
    <br>
    <h5> Create new chat room </h5>
    <InputText v-model="inputRoomName" style="margin-bottom: 10px" placeholder="Enter Room Name"/>
    <br>
    <Button @click="handleCreateRoom" class="p-button-secondary p-button-rounded"> Create</Button>
  </div>
  <div class="right-girl">
    <h5>Chat Room List</h5>
    <Listbox v-model="ChatList" :options="chatroom" optionLabel="name" style="width:15rem" />
  </div>
</template>


<script setup lang="ts">

import { ref } from "vue";
import { RoomService } from "@/services/room.service";

const inputRoomName = ref("");
const roomService = new RoomService();

function handleCreateRoom() {
  roomService.createRoom(inputRoomName.value);
}
</script>

<style scoped>

.left-girl{
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
}

.right-girl{
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: right;
}

</style>
