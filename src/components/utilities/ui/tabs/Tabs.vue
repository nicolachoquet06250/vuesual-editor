<template>
  <div class="tab-container" ref="tabs">
    <div class="tabs">
      <slot name="tab" @click="handleTabClick($event)"></slot>
    </div>

    <slot></slot>
  </div>
</template>

<script setup>
import {onMounted, ref, defineEmits} from "vue";

const props = defineProps({
  active: String,
  parentWidth: String
});

const emit = defineEmits(['click', 'loadDefaultTab'])

const tabs = ref();

onMounted(() => {
  if (tabs.value) {
    if (props.active) {
      tabs.value?.querySelector(`.tabs > button[data-target=${props.active}]`)?.classList.add('active');
      tabs.value?.querySelector(`.tabs ~ [id^=${props.active}]`)?.classList.add('active');
    } else {
      tabs.value?.querySelector(`.tabs > button`)?.classList.add('active');
      tabs.value?.querySelector(`.tabs ~ [id^=${tabs.value?.querySelector('.tabs > button')?.getAttribute('data-target')}]`)?.classList.add('active');
      emit('loadDefaultTab', {
        tab: tabs.value?.querySelector(`.tabs > button`)?.getAttribute('data-target')
      })
    }
  }
})

const handleTabClick = e => {
  if (e) {
    emit('click', e);
  }
}
</script>

<style scoped>
.tab-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.tab-container > .tabs {
  margin-bottom: 5px;
  display: flex;
  overflow-x: auto;
  flex-wrap: nowrap;
  width: calc(v-bind(parentWidth) - 7px);
}
</style>
