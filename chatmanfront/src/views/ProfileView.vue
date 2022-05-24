<template>
  <Splitter style="height: 500px">
    <SplitterPanel class="flex align-items-center justify-content-center" :size="20" :minSize="10">
      <div class="div_left">
        <h5> Anna Teresa Morales
          username: annamorri
        </h5>
      </div>
    </SplitterPanel>
    <SplitterPanel :size="80">
      <Splitter layout="vertical">
        <SplitterPanel class="flex align-items-center justify-content-center" :size="15">
          <div class="div_right_top">
            <i class="pi pi-bell mr-4 p-text-secondary" style="font-size: 2rem" v-badge="2"></i> &nbsp;&nbsp;&nbsp;&nbsp;
            <i class="pi pi-envelope p-text-secondary" style="font-size: 2rem" v-badge.danger></i>&nbsp;&nbsp;
          </div>
        </SplitterPanel>
        <SplitterPanel :size="85">
          <Splitter>
            <SplitterPanel class="flex align-items-center justify-content-center" :size="20">
             <br>
              <div class="div_right_middle">
                <h5>Friend List</h5>
                <Listbox v-model="FriendsList" :options="this.userStore.friends" optionLabel="username" style="width:15rem" />
                <Button @click="refresh" > Refresh</Button>
              </div>
            </SplitterPanel>
            <SplitterPanel class="flex align-items-center justify-content-center" :size="80">
              <br>
              <div class="div_right_bottom">
                <h5>Your Chats</h5>
                <Listbox v-model="chatList" :options="chat" optionLabel="name" style="width:15rem" />
              </div>
            </SplitterPanel>
          </Splitter>
        </SplitterPanel>
      </Splitter>
    </SplitterPanel>
  </Splitter>
</template>

<script setup lang="ts" >
 import { UserStore } from "@/stores/userStore";

 const userStore = UserStore();

 function refresh(){
   userStore.findMyFriends();
 }
</script>

<style scoped>

.div_right_middle{
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:right;
}
.div_right_bottom{
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:right;
}

.div_right_top{
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content:right;
}

</style>
