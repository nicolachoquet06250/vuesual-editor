<template>
  <input type="number"
         :value="modelValue"
         @input="$emit('update:modelValue', parseInt($event.target.value))" />
</template>

<script setup lang="ts">
defineProps({
  modelValue: Number
})

defineEmits(['update:modelValue'])
</script>

<style scoped>

</style>
