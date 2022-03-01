<template>
  <div class="vuesual-editor">
    <vue-resizable :width="resizerWidth"
                   :min-width="minSidebarWidth"
                   :height="height"
                   :active="['r']"
                   :fit-parent="true"
                   @resize:move="handleResize($event)">
      <nav :class="{
        sidebar: true,
        closed: sidebarClosed,
        opening: !sidebarClosed && animating
      }" ref="sidebar">
        <VuesualEditSidebar @send="$emit('send', $event)"
                            @open="handleOpenSidebar()"
                            @close="handleCloseSidebar()" />
      </nav>
    </vue-resizable>

    <div class="content">
      <VuesualEditorContent :layout="layout" />
    </div>
  </div>

  <AddComponentModal />
</template>

<script setup>
import {ref, defineEmits, computed, VueElement} from "vue"
import {useResize} from "../hooks/resize";
import VuesualEditorContent from "./VuesualEditorContent.vue";
import VuesualEditSidebar from "./VuesualEditSidebar.vue";
import VueResizable from 'vue-resizable/src/components/vue-resizable.vue';
import AddComponentModal from "./AddComponentModal.vue";
import {useWindowSize} from "@vueuse/core";

defineEmits(['send']);
defineProps({
  layout: [VueElement, Object]
});

const sidebar = ref();

const {
  closed: sidebarClosed,
  animating,
  onOpen: handleOpenSidebar,
  onClose: handleCloseSidebar
} = useResize();
const { height } = useWindowSize();

const minSidebarWidth = computed(() => sidebarClosed.value ? 0 : 300);
const _minSidebarWidth = computed(() => minSidebarWidth.value + 'px');
const oldSidebarWidth = ref(minSidebarWidth.value);
const resizerWidth = computed(() => sidebarClosed.value ? 0 : oldSidebarWidth.value);
const cssResizerWidth = computed(() => resizerWidth.value + 'px');

const handleResize = (e) => {
  if (!sidebarClosed.value) {
    oldSidebarWidth.value = e.width;
  }
}
</script>

<style scoped>
.vuesual-editor {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: white;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}

.vuesual-editor .sidebar {
  min-width: v-bind(_minSidebarWidth);
  border-right: 1px solid gray;
  position: relative;
  transition: width .3s ease-out;
}

.vuesual-editor .sidebar.closed {
  transition: width .3s ease-out;
  min-width: 0;
  width: 0;
  transform: translateX(-10px);
}

.vuesual-editor .sidebar + .content {
  overflow-y: auto;
  width: 100%;
}

.vuesual-editor .sidebar,
.vuesual-editor .content {
  height: 100%;
}

.vuesual-editor .content {
  width: calc(100% - v-bind(cssResizerWidth) - 1px);
  overflow-y: auto;
}
</style>
