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
    <div class="friend-item">
      <div>{{ slotProps.option.name }}</div>
    </div>
  </Listbox>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const selectedFriends = ref();
    [{ name: "Anna" }, { name: "Rasmus" }];

    const items = ref(
      Array.from({ length: 100000 }, (_, i) => ({
        label: `Item #${i}`,
        value: i,
      }))
    );
    return { selectedFriends, name };
  },
};
</script>

<style scoped></style>
