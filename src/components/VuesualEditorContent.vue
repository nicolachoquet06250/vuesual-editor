<template>
<!--  <pre>{{components}}</pre>-->
<!--  <pre>{{_components}}</pre>-->
  <template v-if="layout">
    <Layout>
      <template v-for="(UiComponent, i) of _components" :key="i">
        <component :is="UiComponent.Component" v-bind="{ data: UiComponent.data }"></component>
<!--        <component :is="UiComponent.uiComponent" :data="UiComponent.data"></component>-->
      </template>
    </Layout>
  </template>

  <main v-else>
    <template v-for="(UiComponent, i) of components" :key="i">
      <component :is="UiComponent.uiComponent" :data="UiComponent.data"></component>
    </template>
  </main>
</template>

<script setup>
import {useComponents} from "../hooks/editor-components";
import {computed, VueElement} from "vue";

const props = defineProps({
  layout: [VueElement, Object]
})

const { pageComponents: components } = useComponents();

const _components = computed(() => components.value.map(c => ({
  Component: c.uiComponent,
  data: c.data
})));

const Layout = computed(() => props.layout);
</script>

<style scoped>
main {
  padding: 5px;
}
</style>
