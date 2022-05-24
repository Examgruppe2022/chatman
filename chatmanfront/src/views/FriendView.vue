<template #option="slotProps">
  <Listbox
    v-model="selectedFriends"
    :options="this.userStore.users"
    :multiple="true"
    :filter="true"
    optionLabel="username"
    listStyle="max-height:500px"
    style="width: 15rem"
    filterPlaceholder="Search"
  >
    <div class="friend-item">
      <div>{{ slotProps.option.username }}</div>
    </div>
  </Listbox>
  <br>
    <Button @click="searchFriend" class="p-button-raised p-button-secondary" icon="pi pi-refresh">Refresh</Button>
</template>

<script setup lang="ts">

import { UserStore } from "@/stores/userStore";
import { ref } from "vue";

const userStore = UserStore();
const search = ref("");
const infoSearch = ref("");

function searchFriend(){
  userStore.findNonFriends(search.value);
}
function getInfo(){
  userStore.getUserInfo(infoSearch.value);
  console.log(userStore.userInfo);
}

</script>
<style scoped></style>
