<template>
  <VuesualEditor @send="handleSend($event)"
                 :layout="Layout" />

  <Modal :name="Modals.ValidateData">
    <template v-slot:header>
      <h2>
        Valider la donnée
      </h2>
    </template>

    <pre>{{data}}</pre>

    <template v-slot:footer>
      <div class="modal-footer">
        <Button @click="closeModal(Modals.ValidateData)"
                :icon="FaIcon.CHECK"
                :circle="true" />
      </div>
    </template>
  </Modal>
</template>

<script setup>
import VuesualEditor from './components/VuesualEditor.vue';
import Modal from "./components/utilities/ui/modals/Modal.vue";
import {Modals} from './types';
import {ref} from "vue";
import {useModal} from "./hooks/modal";
import Layout from './exemple/editor-components/Layout.vue';
import Button from "./components/utilities/ui/forms/buttons/Button.vue";
import {FaIcon} from "./types/icons";
import {registerComponents} from "./exemple/editor-hooks/register-components";

const { closeModal } = useModal();

registerComponents();

const data = ref({});

const handleSend = e => {
  data.value = e.data;
};
</script>

<style>
html, body {
  overflow: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  margin: 0;
  padding: 0;
}

.modal-footer {
  min-height: 40px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.modal-footer > button {
  width: 30px;
  height: 30px;
  border-radius: 30px;
  border: 1px solid black;
  background: white;
  cursor: pointer;
}
</style>
