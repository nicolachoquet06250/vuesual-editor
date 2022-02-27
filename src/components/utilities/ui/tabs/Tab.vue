<template>
  <Button :data-target="target"
          @click="handleClick($event)"
          @ready="button = $event"
          :active="active"
          :class="{ icon: !!icon }">
    <i v-if="icon" :class="icon"></i>
    <slot v-else></slot>
  </Button>
</template>

<script setup lang="ts">
import {onMounted, Ref, ref, watch} from "vue";
import Button from "../forms/buttons/Button.vue";

const props = defineProps({
  target: String,
  active: Boolean,
  icon: {
    type: [String, Boolean],
    default: false
  }
});
const emit = defineEmits(['click']);
const button: Ref<HTMLElement|undefined> = ref();

const selectTab = () => {
  const target = props.target;

  [
    ...Array.from(button.value?.parentElement?.querySelectorAll('[data-target]') ?? []),
    ...Array.from(button.value?.parentElement?.parentElement?.querySelectorAll(`[id]`) ?? [])
  ].map((c: Element) => (c.classList.remove('active')));

  button.value?.parentElement?.parentElement?.querySelector(`[id^=${target}]`)?.classList.add('active');
};

const handleClick = (e: MouseEvent) => {
  e.stopPropagation();
  e.preventDefault();

  emit('click', e);

  selectTab();
};
</script>

<style scoped>
button:first-child {
  margin-right: 2px;
  margin-left: 0;
}

button {
  cursor: pointer;
  padding: 5px;
  margin-left: 2px;
  margin-right: 2px;
  border: 1px solid black;
  background-color: white;
  color: black;
  border-radius: 5px;
  transition: background-color .3s ease-out, color .3s ease-out;
  height: 30px;
  white-space: nowrap;
}

button.icon {
  width: 30px;
  height: 30px;
  border-radius: 30px;
}

button:hover,
button:active,
button:focus {
  background-color: #efe8e8;
}

button:last-child {
  margin-left: 2px;
  margin-right: 0;
}

button.active {
  background-color: blue;
  color: white;
}
</style>
