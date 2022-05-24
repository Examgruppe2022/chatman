<template #option="slotProps">
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
      <div>{{ slotProps.option.roomName() }}</div>
    </div>
  </Listbox>
  <Button @click="refresh" class="p-button-raised p-button-secondary" icon="pi pi-refresh">Refresh</Button>
  <Button @click="connectToChatRoom" > Connect</Button>

</template>

<script setup lang="ts">

import { RoomStore } from "@/stores/roomStore";
import { ChatStore } from "@/stores/chatStore";
import type { Room } from "@/models/Room";
import router from "@/router";

const roomStore = RoomStore();
const chatStore = ChatStore();
let selectAccessibleRooms: Room;


function refresh(){
  roomStore.getAccessibleRoom();
}
function connectToChatRoom(){
  chatStore.setRoom("firstsroom")
  router.push('/chat')
  //window.location.href =('/chat')
}

</script>

<style scoped>

</style>
