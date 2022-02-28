<template>
  <header class="main">
    <div>
      <Button @click="openModal(Modals.AddComponent)"
              :icon="FaIcon.PLUS"
              :circle="true" />
    </div>

    <Button :class="{
              close: !isOpened,
              open: isOpened
            }" @click="handleToggleSidebar()"
            :icon="(isOpened ? FaIcon.LOCK : FaIcon.LOCK_OPEN)"
            :circle="true" />
  </header>

  <main class="main">
    <template v-for="(builderComponent, i) of components" :key="i">
      <section class="component-builder-card opened"
               :style="`${i > 0 ? 'margin-top: 5px;' : ''}`">
        <header @click.stop.prevent="toggleOpenCard($event)">
          <SimpleBox :px="5">
            <Container>
              <Row>
                <Col>
                  <FlexBox :align-items="'center'">
                    <h5>
                      {{builderComponent.title}}
                    </h5>
                  </FlexBox>
                </Col>

                <Col>
                  <FlexBox :align-items="'center'" :justify-content="'flex-end'">
                    <Button :circle="true"
                            :icon="FaIcon.TRASH"
                            :no-border="true"
                            :active-color="'red'"
                            @click="handleDeleteComponent(builderComponent.title, i)" />
                  </FlexBox>

                </Col>
              </Row>
            </Container>
          </SimpleBox>
        </header>

        <main>
          <SimpleBox :px="5" :py="5" style="flex: 1">
            <component :is="builderComponent.builderComponent"
                       v-bind="{ data: builderComponent.data }"
                       @send="sendComponentData(builderComponent.title, i, $event)" />
          </SimpleBox>
        </main>
      </section>
    </template>
  </main>

  <footer class="main">
    <Button @click="handleExport()" :icon="FaIcon.EXPORT" :circle="false">
      <span>Export</span>
    </Button>

    <Button @click="handleSend()" :icon="FaIcon.SEND" :circle="true" />
  </footer>
</template>

<script setup>
import {ref, defineEmits} from "vue";
import {useModal} from "../hooks/modal";
import {Modals} from '../types';
import {useComponents} from "../hooks/editor-components";
import Button from "./utilities/ui/forms/buttons/Button.vue";
import {FaIcon} from "../types/icons";
import SimpleBox from "./utilities/ui/boxes/SimpleBox.vue";
import FlexBox from "./utilities/ui/boxes/FlexBox.vue";
import Container from "./utilities/grid/Container.vue";
import Row from "./utilities/grid/Row.vue";
import Col from "./utilities/grid/Col.vue";

const emit = defineEmits(['open', 'close', 'send']);

const { openModal } = useModal();
const { pageComponents: components, setData, deleteComponentInPage: unregisterComponent } = useComponents();

const isOpened = ref(true);

const handleToggleSidebar = () => {
  emit((isOpened.value ? 'close' : 'open'));
  isOpened.value = !isOpened.value;
};

const handleSend = () => {
  const data = components.value.reduce((r, c) =>
      [ ...r, { _name: c.slug, ...(c.data ?? {}) } ], []);
  emit('send', { data });
  openModal(Modals.ValidateData);
};

const sendComponentData = (title, i, e) => {
  // console.log(title, i, e.data);

  setData(title, i, e.data);
};

const handleDeleteComponent = (title, index) => {
  // console.log(title, index);
  unregisterComponent(title, index);
};

const handleExport = () => {
  const data = components.value.reduce((r, c) =>
      [ ...r, { _name: c.slug, ...(c.data ?? {}) } ], []);
  const _data = JSON.stringify(data)
  const blob = new Blob([_data], {type: 'text/plain'})
  const a = document.createElement('a');
  a.download = "page-data.json";
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
  a.dispatchEvent(new MouseEvent('click', {
    cancelable: false
  }));
};

const getParent = (tag, root) => {
  if (root?.parentElement?.tagName.toLowerCase() === tag) {
    return root?.parentElement;
  }
  return getParent(tag, root?.parentElement);
}

const toggleOpenCard = (e) => {
  const section = getParent('section', e.target);
  if (section?.classList.contains('opened')) {
    section?.classList.remove('opened');
  } else {
    section?.classList.add('opened');
  }
  console.log(e.target, section);
};
</script>

<style scoped>
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css);

:root {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

header.main {
  height: 40px;
  border-bottom: 1px solid lightblue;
}

header.main > div {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-right: 5px;
  height: 100%;
}

header.main button {
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background: white;
  border: 1px solid black;
  cursor: pointer;
}

header.main > button {
  border: 1px solid black;
  padding: 5px;
  position: absolute;
  top: 5px;
  right: 0;
  opacity: 0;
  transition: opacity .5s ease-out;
  background: rgba(255, 255, 255, .3);
}

header.main > button:hover {
  opacity: 1;
}

header.main > button.open {
  transform: translateX(calc(100% + 5px));
}

header.main > button.close {
  transform: translateX(calc(100% + 15px));
}

main.main {
  height: calc(100% - 90px);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 5px;
}

footer.main {
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  border-top: 1px solid lightblue;
}

footer.main button {
  margin-right: 5px;
}

section.component-builder-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid lightblue;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
  transition: background-color .2s ease-out;
}

section.component-builder-card > header {
  cursor: pointer;
}

section.component-builder-card > main {
  display: none;
}

section.component-builder-card.opened > main {
  width: 100%;
  display: flex;
}

section.component-builder-card:hover {
  background-color: rgba(0, 0, 0, .3);
}

section.component-builder-card > header {
  height: 40px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
