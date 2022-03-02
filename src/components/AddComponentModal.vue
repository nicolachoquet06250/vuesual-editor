<template>
  <Modal :name="Modals.AddComponent" style="min-width: 507px">
    <template v-slot:header>
      <h2>Ajouter un composant</h2>
    </template>

    <Tabs @loadDefaultTab="currentTab = $event.tab">
      <template v-slot:tab>
        <Tab :target="cat.slug"
             @click.stop="handleTitleClick($event)"
             v-for="cat of categoryList" :key="cat.slug"
             :icon="cat.slug === 'all' ? FaIcon.GLOBE : false"
             :active="cat.slug === currentTab">
          {{cat.name}}
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
                        style="min-width: 200px;"
                        @mouseover="$event.target.querySelector('img') && ($event.target.querySelector('img').style.height = '55px')"
                        @mouseout="$event.target.querySelector('img') && ($event.target.querySelector('img').style.height = '50px')">
                  <FlexBox :direction="'column'" :justify-content="'space-between'" :align-items="'center'">
                    <img :src="component.imagePreview"
                        style="height: 50px; transition: height .2s ease-out;"
                        @mouseover="$event.target && ($event.target.style.height = '55px')"
                        @mouseout="$event.target && ($event.target.style.height = '50px')" />
                    {{component.title}}
                  </FlexBox>
                </Button>
              </Col>

              <Col v-else>
                <Button @click="createComponent(component.title)"
                        :no-border="true"
                        style="min-width: 200px;"
                        :active-color="'rgba(0, 0, 0, .5)'"
                        @mouseover="$event.target.querySelector('img') && ($event.target.querySelector('img').style.height = '55px')"
                        @mouseout="$event.target.querySelector('img') && ($event.target.querySelector('img').style.height = '50px')">
                  <FlexBox :direction="'column'" :justify-content="'space-between'" :align-items="'center'">
                    <img :src="component.imagePreview"
                        style="height: 50px; transition: height .2s ease-out;"
                        @mouseover="$event.target && ($event.target.style.height = '55px')"
                        @mouseout="$event.target && ($event.target.style.height = '50px')" />
                    {{component.title}}
                  </FlexBox>
                </Button>
              </Col>
            </template>
          </Row>
        </Container>
      </TabContent>
    </Tabs>
  </Modal>
</template>

<script setup>
import {Modals} from '../enums';
import {Modal} from './utilities/ui/modals';
import {Container, Row, Col} from './utilities/grid';
import {Tabs, Tab, TabContent} from './utilities/ui/tabs';
import {useModal} from "../hooks/modal";
import {FaIcon} from "../enums/icons";
import {Button} from './utilities/ui/forms';
import {FlexBox} from './utilities/ui/boxes';
import {useComponents} from "../hooks/editor-components";
import {computed, ref} from "vue";

const { closeModal } = useModal();
const { components, injectComponentInPage } = useComponents();

const currentTab = ref();

const categoryList = computed(() => {
  return [{slug: 'all', name: 'All'}, ...components.value.reduce((r, c) => {
    if (r.reduce((r, c) => [...r, c.slug], []).indexOf((c.category.replace(/\ /g, '-').toLowerCase() ?? '')) === -1) {
      return [...r, { slug: (c.category.replace(/\ /g, '-').toLowerCase() ?? ''), name: c.category }];
    }
    return r;
  }, [])];
});
const componentList = computed(() => {
  const tmp = [];
  let cmp = 0;

  for (const component of components.value) {
    if (currentTab.value === 'all' || component.category.replace(/\ /g, '-').toLowerCase() === currentTab.value) {
      if (cmp === 0) {
        tmp.push([component]);
        cmp++;
      } else if (cmp < 3) {
        const last = tmp.pop();

        tmp.push([...(last ?? []), component]);
        cmp++;
      } else {
        const last = tmp.pop();

        tmp.push([...(last ?? []), component]);
        cmp = 0;
      }
    }
  }

  return tmp;
});

const handleTitleClick = e => {
  if (e.target?.tagName !== 'BUTTON') {
    currentTab.value = e.target?.parentElement?.getAttribute('data-target') ?? '';
  } else {
    currentTab.value = e.target?.getAttribute('data-target') ?? '';
  }
};

const createComponent = (title) => {
  injectComponentInPage(title);

  closeModal(Modals.AddComponent);
};
</script>
