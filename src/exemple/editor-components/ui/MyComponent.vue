<template>
  <div>
    <p>{{data.text}}</p>

    <ul>
      <li v-for="(text, i) of data.texts" :key="i">
        {{ text }}
      </li>
    </ul>

    <div v-if="data.checked">😀</div>
    <div v-else>😥</div>

    <ComponentList v-model="data.component.data.component" />

    <ComponentList v-for="(component, i) of data.components" :key="i" 
                   v-model="component.data.component" />
  </div>

  <div style="margin-bottom: 20px;">
    <pre>{{data}}</pre>
  </div>
</template>

<script setup>
import {ComponentList} from '../../../components/utilities/ui/lists/ui';

defineProps({
  data: {
    default: {
      text: '',
      texts: [],
      checked: false,
      component: {
        data: {
          component: {
            slug: '',
            data: {}
          }
        }
      }
    }
  }
});
</script>

<style scoped>
ul li {
  list-style: inside;
}
</style>
