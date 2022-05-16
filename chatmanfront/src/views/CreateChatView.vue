<template>
<div class="middel">
  <div class="left-girl">
    <br>
    <h5> Create new chat room </h5>
    <InputText v-model="inputRoomName" style="margin-bottom: 10px" placeholder="Enter Room Name"/>
    <br>
    <Button @click="$router.push('/chatroom') " class="p-button-secondary p-button-rounded"> Create</Button>
  </div>
  <div class="right-girl">
    <h5>Chat Room List</h5>
    <Listbox v-model="FriendList" :options="friend" optionLabel="name" style="width:15rem" />
  </div>
</div>
</template>


<script>
export default {
  name: "CreateChatView.vue"
};
</script>

<style scoped>


</style>
