<template>
  <button :class="{ circle, 'no-border': noBorder, active }"
          @click.stop.prevent="$emit('click', $event)"
          @mouseover="$emit('mouseover', $event)"
          @mouseout="$emit('mouseout', $event)"
          ref="button">
    <i :class="_icon" v-if="_icon"></i>
    <slot></slot>
  </button>
</template>

<script setup>
import {defineEmits, computed, onMounted, ref} from "vue";
import {FaIcon} from "../../../../../enums/icons";

const emit = defineEmits(['ready', 'click', 'mouseover', "mouseout"]);

const props = defineProps({
  icon: {
    type: [String, Boolean],
    default: false
  },
  circle: {
    default: false
  },
  close: {
    default: false
  },
  activeColor: {
    default: 'black'
  },
  noBorder: {
    default: false
  },
  active: {
    default: false
  }
});

const _icon = computed(() => props.close ? FaIcon.CLOSE : props.icon);
const activeColor = computed(() => props.activeColor);

const button = ref();

onMounted(() => {
  emit('ready', button.value);
})
</script>

<style scoped>
button {
  cursor: pointer;
  padding: 5px;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  transition: background-color .2s ease-out, color .2s ease-out;
}

button:hover,
button:active,
button:focus,
button.active {
  background-color: v-bind(activeColor)!important;
  color: white;
  outline: none;
}

button.circle {
  width: 30px;
  height: 30px;
  border-radius: 30px;
}

button.no-border {
  border: none;
}
</style>
