<template>
  <!-- #option="slotProps" -->
  <div class="row-12 mt-3 ms-3">
    <div class="col-6">
      <Listbox
        v-model="selectedFriends"
        :options="this.userStore.users"
        :multiple="false"
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
        <Button @click="sendFriendRequest" class="p-button-raised p-button-secondary p-button-sm p-button-rounded" icon="pi pi-user plus" label=" Send Friend Request"></Button>
      </div>
    </div>
</template>

<script setup lang="ts">
import { UserStore } from "@/stores/userStore";
import { ref } from "vue";
import { FriendRequestStore} from "@/stores/friendRequestStore"


const userStore = UserStore();
const friendRequestStore = FriendRequestStore();
const search = ref("");
const selectedFriends = ref();
searchFriend();


function searchFriend() {
  userStore.findNonFriends(search.value);
}
function sendFriendRequest(){
  friendRequestStore.sendFriendRequest(selectedFriends.value.username, userStore.userName);

}
</script>
<style scoped></style>
