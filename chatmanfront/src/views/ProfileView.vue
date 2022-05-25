  <template>
    <div class="row mt-3 ms-3 me-3">
      <div class="col-3 bg-light">
        <div class="w-75 mx-auto">
          <h5 style="font-size: 20px" class="mx-auto w-50"> YOUR PROFILE </h5>
          <br>
          <h5 style="font-size: 18px">Username: </h5>
          <br>
          <h5 style="font-size: 18px">Email: </h5>
        </div>
      </div>
      <div class="col-3">
        <div class="div_right_middle">
          <h5 class="w-75 mx-auto">FriendsList</h5>
          <Listbox v-model="FriendsList" :options="this.userStore.friends" optionLabel="username" style="width:15rem; min-height: 300px;" />
          <br>
          <Button @click="refresh" class="p-button-raised p-button-secondary p-button-sm p-button-rounded" icon="pi pi-refresh" label="Refresh"></Button>
        </div>
      </div>
      <div class="col-3">
        <div class="div_right_middle">
          <h5 class="w-75 mx-auto">ChatRooms</h5>
          <Listbox v-model="chatRoomList" :options="this.roomStore.myRooms" optionLabel="roomName" style="width:15rem; min-height:300px;" />
          <br>
          <Button @click="refresh2" class="p-button-raised p-button-secondary p-button-sm p-button-rounded" icon="pi pi-refresh" label="Refresh"></Button>
        </div>
      </div>
        <div class="col-3">
          <h5 class="w-75 mx-auto">Friend Request</h5>
          <Listbox v-model="friendRequestList" :options="this.friendRequestStore.myFriendRequest" optionLabel="senderUsername" style="width:15rem; min-height:300px;" />
          <br>
          <Button @click="acceptFriend" class="p-button-raised p-button-secondary p-button-sm p-button-rounded" icon="pi pi-check" label="Accept Friend"></Button>
        </div>
    </div>
  </template>

<script setup lang="ts" >
 import { UserStore } from "@/stores/userStore";
 import { RoomStore } from "@/stores/roomStore";
 import { FriendRequestStore } from "@/stores/friendRequestStore";

 const userStore = UserStore();
 const roomStore = RoomStore();
 const friendRequestStore = FriendRequestStore();


 function refresh(){
   userStore.findMyFriends();
 }
 function refresh2(){
   roomStore.findMyRooms();
 }
 function acceptFriend(){

 }

</script>

<style scoped>
.knapper{
  text-align: end;
}
</style>
