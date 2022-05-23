-
<template #option="slotProps">
  <Listbox
    v-model="selectedFriends"
    :options="name"
    :multiple="true"
    :filter="true"
    optionLabel="Username"
    listStyle="max-height:250px"
    style="width: 15rem"
    filterPlaceholder="Search"
  >
    <li v-for="(user, index) in userStore.users" v-bind:key="index">
      {{user.name}}
    </li>
    <div class="friend-item">
      <div>{{ slotProps.option.name }}</div>
    </div>
  </Listbox>
</template>

<script setup lang="ts">

import { UserStore } from "@/stores/userStore";
import { ref } from "vue";

const userStore = UserStore();
const search = ref("");
const infoSearch = ref("");

function searchFriend(){
  userStore.findFriends(search.value);
}
function getInfo(){
  userStore.getUserInfo(infoSearch.value);
  console.log(userStore.userInfo);
}

</script>
<style scoped></style>
