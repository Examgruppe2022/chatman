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
          <Button @click="refresh" class="btn"> Refresh</Button>
        </div>
      </div>
      <div class="col-3">
        <div class="div_right_middle">
          <h5 class="w-75 mx-auto">ChatRooms</h5>
          <Listbox v-model="chatRoomList" :options="this.roomStore.myRooms" optionLabel="roomName" style="width:15rem; min-height:300px;" />
          <br>
          <Button @click="refresh2" class="btn"> Refresh</Button>
        </div>
      </div>
        <div class="col-3 knapper">
          <i class="pi pi-bell mr-4 p-text-secondary" style="font-size: 2rem" v-badge="2"></i> &nbsp;&nbsp;&nbsp;&nbsp;
          <i class="pi pi-envelope p-text-secondary" style="font-size: 2rem" v-badge.danger></i>&nbsp;&nbsp;
        </div>
    </div>
  </template>

<script setup lang="ts" >
 import { UserStore } from "@/stores/userStore";
 import { RoomStore } from "@/stores/roomStore";

 const userStore = UserStore();
 const roomStore = RoomStore();


 function refresh(){
   userStore.findMyFriends();
 }
 function refresh2(){
   roomStore.findMyRooms();
 }

</script>

<style scoped>

.btn {
  background-color: dimgrey;
  border: none;
  color: white;
  padding: 12px 16px;
  font-size: 16px;
  cursor: pointer;
}
.knapper{
  text-align: end;
}
</style>
