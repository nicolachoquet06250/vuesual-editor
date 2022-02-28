<template>
  <div :id="id + '-' + uniqId" v-if="id">
    <slot></slot>
  </div>

  <div v-else>
    <slot></slot>
  </div>
</template>

<script setup>
import {useUniqId} from "../../../../hooks/identifier";

defineProps({
  id: String
});

const uniqId = useUniqId();
</script>

<style scoped>
div[id] {
  display: none;
}

div[id].active,
div:not([id]) {
  display: unset;
  flex: 1;
  min-height: 200px;
  /*border: 1px solid black;*/
  width: 100%;
}
</style>
