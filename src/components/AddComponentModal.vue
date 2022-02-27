<template>
  <Modal :name="Modals.AddComponent" style="min-width: 507px">
    <template v-slot:header>
      <h2>Ajouter un composant</h2>
    </template>

    <Tabs @loadDefaultTab="currentTab = $event.tab">
      <template v-slot:tab>
        <Tab :target="cat"
             @click.stop="handleTitleClick($event)"
             v-for="cat of categoryList" :key="cat"
             :icon="cat === 'all' ? FaIcon.GLOBE : false"
             :active="cat === currentTab">
          {{cat}}
        </Tab>
      </template>

      <TabContent>
        <Container>
          <Row v-for="(row, j) of componentList" :key="j">
            <template v-for="(component, i) of row" :key="i">
              <Col style="flex: none; width: 25%; flex-basis: auto;"
                   v-if="row.length === 1">
                <Button @click="createComponent(component.title)"
                        :active-color="'rgba(0, 0, 0, .5)'"
                        style="display: flex; flex-direction: column; justify-content: space-between; align-items: center;"
                        @mouseover="$event.target.querySelector('img') && ($event.target.querySelector('img').style.height = '32px')"
                        @mouseout="$event.target.querySelector('img') && ($event.target.querySelector('img').style.height = '30px')">
                  <img :src="component.imagePreview"
                       style="height: 30px; transition: height .2s ease-out;"
                       @mouseover="$event.target.style.height = '32px';"
                       @mouseout="$event.target.style.height = '30px';" />
                  {{component.title}}
                </Button>
              </Col>

              <Col v-else>
                <Button @click="createComponent(component.title)"
                        :no-border="true">
                  <img :src="component.imagePreview" />
                  {{component.title}}
                </Button>
              </Col>
            </template>
          </Row>
        </Container>
      </TabContent>
    </Tabs>
  </Modal>
</template>

<script setup lang="ts">
import {Modals} from '../types';
import Modal from "./utilities/ui/modals/Modal.vue";
import Container from "./utilities/grid/Container.vue";
import Row from "./utilities/grid/Row.vue";
import Col from "./utilities/grid/Col.vue";
import Tabs from "./utilities/ui/tabs/Tabs.vue";
import Tab from "./utilities/ui/tabs/Tab.vue";
import TabContent from "./utilities/ui/tabs/TabContent.vue";
import {useModal} from "../hooks/modal";
import {FaIcon} from "../types/icons";
import Button from "./utilities/ui/forms/buttons/Button.vue";
import {useComponents} from "../hooks/editor-components";
import {computed, ref} from "vue";
import {EditorComponent} from "../types/hooks";
import {Matrix} from "../types/utils";

const { closeModal } = useModal();
const { components, injectComponentInPage } = useComponents();

const currentTab = ref<string>();

const categoryList = computed(() => {
  return ['all', ...components.value.reduce((r: string[], c: EditorComponent) => {
    if (r.indexOf((c.category.replace(/\ /g, '-').toLowerCase() ?? '')) === -1) {
      return [...r, (c.category.replace(/\ /g, '-').toLowerCase() ?? '')];
    }
    return r;
  }, [])];
});
const componentList = computed(() => {
  const tmp: Matrix<EditorComponent> = [];
  let cmp = 0;

  for (const component of components.value) {
    if (currentTab.value === 'all' || component.category.replace(/\ /g, '-').toLowerCase() === currentTab.value) {
      if (cmp === 0) {
        tmp.push([component]);
        cmp++;
      } else if (cmp < 3) {
        const last: Array<EditorComponent> | undefined = tmp.pop();

        tmp.push([...(last ?? []), component]);
        cmp++;
      } else {
        const last: Array<EditorComponent> | undefined = tmp.pop();

        tmp.push([...(last ?? []), component]);
        cmp = 0;
      }
    }
  }

  return tmp;
});

const handleTitleClick = (e: { target?: HTMLElement }) => {
  if (e.target?.tagName !== 'BUTTON') {
    currentTab.value = e.target?.parentElement?.getAttribute('data-target') ?? '';
  } else {
    currentTab.value = e.target?.getAttribute('data-target') ?? '';
  }
};

const createComponent = (title: string) => {
  injectComponentInPage(title);

  closeModal(Modals.AddComponent);
};
</script>
