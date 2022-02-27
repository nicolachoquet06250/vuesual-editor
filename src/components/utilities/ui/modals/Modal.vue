<template>
  <div :class="{
    overlay: true,
    closed: true
  }" ref="modal">
    <div class="modal" ref="modalContent" :style="style">
      <header :class="{
        'not-header': !slots['header']
      }">
        <div v-if="slots['header']">
          <slot name="header"></slot>
        </div>

        <Button :circle="true"
                :no-border="true"
                :close="true"
                :active-color="'red'"
                @click="closeModal(name)" />
      </header>

      <main>
        <slot></slot>
      </main>

      <footer v-if="slots['footer']">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onClickOutside} from "@vueuse/core";
import {useModal} from "../../../../hooks/modal";
import {Ref, ref, useSlots} from "vue";
import Button from "../forms/buttons/Button.vue";

const props = defineProps({
  name: String,
  style: [String, Object]
});

const slots = useSlots();

const modal: Ref<HTMLElement|undefined> = ref<HTMLElement>();
const modalContent: Ref<HTMLElement|undefined> = ref<HTMLElement>();

const { registerModal, closeModal } = useModal();

props.name && registerModal(props.name, modal);

onClickOutside(modalContent, e => {
  props.name && closeModal(props.name)
});
</script>

<style scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 999;
}

.overlay.closed {
  display: none;
}

.overlay .modal {
  min-width: 400px;
  max-width: calc(100% - 20px);
  min-height: 200px;
  max-height: calc(100vh - 20px);
  /*overflow-y: auto;*/
  background: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-left: 5px;
  padding-right: 5px;

  border-radius: 5px;

  cursor: default;
}

.overlay .modal main {
  flex: 1;
  height: auto;
  overflow-y: auto;
  width: 100%;

  padding: 5px;
}

.overlay .modal header,
.overlay .modal footer {
  min-height: 40px;
  height: auto;
  width: 100%;
  overflow-y: auto;

  padding: 5px;
}

.overlay .modal header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid lightblue;
}

.overlay .modal header.not-header {
  justify-content: flex-end;
}

.overlay .modal header > button {
  background: transparent;
  border: none;
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.overlay .modal footer {
  border-top: 1px solid lightblue;
}
</style>
