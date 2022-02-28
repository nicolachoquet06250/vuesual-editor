<template>
  <div class="dropdown">
    <Button class="dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            @click="toggleOpened()"
            @ready="dropdown = $event">
      {{modelValue}}
      <i class="fa-solid fa-caret-down"></i>
    </Button>

    <div :class="{ 'dropdown-menu': true, show: opened }"
         aria-labelledby="dropdownMenuButton"
         style="position: absolute; transform: translate3d(0px, 30px, 0px); top: 0; left: 0; will-change: transform;">
      <slot v-bind="{ selected: modelValue }"></slot>
    </div>
  </div>
</template>

<script setup>
import Button from "../buttons/Button.vue";
import { onMounted, ref, watch } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  modelValue: String,
  selected: String
});
const emit = defineEmits(['update:modelValue', 'change']);

const opened = ref(false);

const toggleOpened = () => opened.value = !opened.value;

const dropdown = ref();
onClickOutside(dropdown, () => {
  if (opened.value) {
    toggleOpened();
  }
});

watch(dropdown, () => {
  Array.from(dropdown.value.parentElement.querySelectorAll('.dropdown-item')).map(o => {
    if (!props.modelValue) {
      emit('update:modelValue', e.target.getAttribute('data-target'));
      emit('change', o.getAttribute('data-target'));
    }

    o.addEventListener('click', e => {
      // console.log('click', e);
      emit('update:modelValue', e.target.getAttribute('data-target'));
      emit('change', e.target.getAttribute('data-target'));
    });
  })
})
</script>

<style scoped>
.dropdown {
  position: relative;
}

.dropdown > .dropdown-toggle {
  cursor: pointer;
  min-width: 10rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.dropdown > .dropdown-menu {
  z-index: 1000;
  display: none;
  float: left;
  min-width: 10rem;
  padding: .5rem 0;
  margin: .125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0,0,0,.15);
  border-radius: .25rem;
}

.dropdown > .dropdown-menu.show {
  display: block;
  overflow: hidden;
}
</style>
