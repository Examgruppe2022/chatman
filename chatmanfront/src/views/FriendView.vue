<template>
  <!-- #option="slotProps" -->
  <div class="row-12 mt-3 ms-3">
    <div class="col-6">
      <Listbox
        v-model="selectedFriends"
        :options="this.userStore.users"
        :multiple="true"
        :filter="true"
        optionLabel="username"
        listStyle="min-height:500px"
        style="width: 15rem"
        filterPlaceholder="Search"
      >
        <div class="friend-item">
          <!-- <div>{{ slotProps.option.username }}</div> -->
        </div>
      </Listbox>
    </div>
      <br>
      <div class="col-6">
        <Button @click="searchFriend" class="p-button-raised p-button-secondary p-button-sm p-button-rounded" icon="pi pi-refresh" label="Refresh"></Button>
         <br>
          <br>
        <Button @click="sendFriendRequest" class="p-button-raised p-button-secondary p-button-sm p-button-rounded" icon="pi pi-user plus" label=" Send Friend Request"></Button>
      </div>
    </div>
</template>

<script setup lang="ts">
import { UserStore } from "@/stores/userStore";
import { ref } from "vue";
import { FriendRequestService } from "@/services/friendRequest.service";

const userStore = UserStore();
const search = ref("");
const selectedFriends = ref();
const confirmation = ref("");
const friendRequestService: FriendRequestService = new FriendRequestService();

function searchFriend() {
  userStore.findNonFriends(search.value);
}
function sendFriendRequest(){
  confirmation.value = "Friend Request sent !";
  friendRequestService.sendFriendRequest(
    userStore.loggedInUser._id,
    userStore.userName,
    userStore.foundUser._id,
    false
  );

}
</script>
<style scoped></style>
