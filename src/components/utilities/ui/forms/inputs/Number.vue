<template>
  <input type="number"
         :value="modelValue"
         @input="handleInput($event)" />
</template>

<script setup>
import {defineEmits} from 'vue';

defineProps({
  modelValue: Number
})

const emit = defineEmits(['update:modelValue']);

const handleInput = (e) => {
  emit('update:modelValue', parseInt(e.target?.getAttribute('value') ?? '0'))
}
</script>

<style scoped>

</style>
