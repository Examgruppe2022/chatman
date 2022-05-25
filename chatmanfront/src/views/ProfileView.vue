<template>
  <div class="row mt-3 ms-3 me-3">
    <div class="col-3 bg-light">
      <div class="w-75 mx-auto">
        <h5 style="font-size: 20px" class="mx-auto w-50">YOUR PROFILE</h5>
        <br />
        <h5 style="font-size: 18px">Username: {{userStore.userName}}</h5>
        <br />
        <h5 style="font-size: 18px">Email: {{userStore.email}}</h5>
        <br />
        <h5 style="font-size: 18px">If the boxes are empty, go to another page, then return, and the boxes should fill.</h5>
      </div>
    </div>
    <div class="col-3">
      <div class="div_right_middle">
        <h5 class="w-75 mx-auto">FriendsList</h5>
        <Listbox
          v-model="friendsList"
          :options="userStore.friends"
          optionLabel="username"
          style="width: 15rem; min-height: 300px"
        />
        <br />

      </div>
    </div>
    <div class="col-3">
      <div class="div_right_middle">
        <h5 class="w-75 mx-auto">ChatRooms</h5>
        <Listbox
          v-model="chatRoomList"
          :options="roomStore.myRooms"
          optionLabel="roomName"
          style="width: 15rem; min-height: 300px"
        />
        <br />

      </div>
    </div>
    <div class="col-3">
      <h5 class="w-75 mx-auto">Friend Request</h5>
      <Listbox
        v-model="friendRequestList"
        :options="friendRequestStore.myFriendRequest"
        optionLabel="senderUsername"
        style="width: 15rem; min-height: 300px"
      />
      <br />
      <Button
        @click="acceptFriend"
        class="p-button-raised p-button-secondary p-button-sm p-button-rounded"
        icon="pi pi-check"
        label="Accept Friend"
      ></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserStore } from "@/stores/userStore";
import { RoomStore } from "@/stores/roomStore";
import { FriendRequestStore } from "@/stores/friendRequestStore";
import { ref } from "vue";

const userStore = UserStore();
const roomStore = RoomStore();
const friendRequestStore = FriendRequestStore();
const friendsList = ref();
const chatRoomList = ref();
const friendRequestList = ref();
refreshFriends();
refreshRoom();
refreshFriendRequests();

function refreshFriends() {
  userStore.findMyFriends();
}
function refreshRoom() {
  roomStore.findMyRooms(userStore.userName);
}
function refreshFriendRequests() {
  friendRequestStore.getMyFriendRequest(userStore.userName);
}
function acceptFriend() {
  friendRequestStore.acceptFriendRequest(userStore.userName, friendRequestList.value.senderUsername)
}
</script>

<style scoped>
.knapper {
  text-align: end;
}
</style>
