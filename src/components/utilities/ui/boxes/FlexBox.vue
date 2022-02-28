<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  justifyContent: String,
  alignItems: String,
  direction: String
});
</script>

<style scoped>
div {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: v-bind(direction);
  justify-content: v-bind(justifyContent);
  align-items: v-bind(alignItems);
}
</style>
