<template>
  <label :class="{
    checked,
    switch: true
  }">
    <input type="checkbox" :value="modelValue" @change="handleChange()" />
  </label>

  <label @click="checked = !checked">
    <slot></slot>
  </label>
</template>

<script setup>
import {ref, defineEmits, watch} from "vue";

const props = defineProps({
  modelValue: Boolean
});

const emit = defineEmits(['update:modelValue', 'change']);

const checked = ref(props.modelValue);

const handleChange = () => {
  emit('update:modelValue', !props.modelValue); 
  checked.value = !checked.value;
}

watch(checked, () => {
  emit('change', checked);
})
</script>

<style scoped>
label.switch input[type=checkbox] {
  display: none;
}

label.switch {
  display: inline-block;
  width: 30px;
  height: 15px;
  border-radius: 30px;
  overflow: hidden;
  position: relative;
  border: 1px solid black;
  cursor: pointer;
}

label.switch::after {
  content: '';
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 15px;
  transform: translateX(0);
  transition: transform .2s ease-out;
  background-color: black;
  border: 1px solid white;
}

label.switch.checked::after {
  transform: translateX(15px);
}

label.switch::before {
  content: '';
  display: block;
  background-color: black;
  width: 100%;
  height: 100%;
  position: absolute;
  transform: translateX(-100%);
  transition: transform .1s ease-out;
}

label.switch.checked::before {
  transform: translateX(0);
}
</style>
