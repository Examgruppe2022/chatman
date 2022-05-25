<template #option="slotProps">
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
          <div>{{ slotProps.option.username }}</div>
        </div>
      </Listbox>
    </div>
    <br />
    <div class="col-6">
      <Button
        @click="searchFriend"
        class="p-button-raised p-button-secondary p-button-sm p-button-rounded"
        icon="pi pi-refresh"
        label="Refresh"
      ></Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserStore } from "@/stores/userStore";
import { ref } from "vue";

const userStore = UserStore();
const search = ref("");
const infoSearch = ref("");
const selectedFriends = ref();

function searchFriend() {
  userStore.findNonFriends(search.value);
}
function getInfo() {
  userStore.getUserInfo(infoSearch.value);
  console.log(userStore.userInfo);
}
</script>
<style scoped></style>
