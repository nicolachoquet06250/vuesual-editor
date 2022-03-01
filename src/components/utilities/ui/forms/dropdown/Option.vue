<template>
  <a href="#" :data-target="target" @click.prevent="handleClick" class="dropdown-item">
    <slot></slot>
  </a>
</template>

<script setup>
import {onMounted} from "vue";

const props = defineProps({
  target: String,
  selected: String
})
const emit = defineEmits(['ready', 'click']);

onMounted(() => {
  emit('ready', props.target);
});

const handleClick = () => {
  emit('click', props.target);
}
</script>

<style scoped>
.dropdown-item {
  display: block;
  width: 100%;
  padding: .25rem 1.5rem;
  clear: both;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  text-decoration: none;
}

.dropdown-item:focus,
.dropdown-item:hover {
  color: #16181b;
  text-decoration: none;
  background-color: #f8f9fa;
}
</style>
