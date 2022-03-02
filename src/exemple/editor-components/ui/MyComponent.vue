<template>
  <div>
    <pre>{{data}}</pre>

    <p>{{data.text}}</p>

    <ul>
      <li v-for="(text, i) of data.texts" :key="i">
        {{ text }}
      </li>
    </ul>

    <div v-if="data.checked">😀</div>
    <div v-else>😥</div>

    <ComponentList v-model="data.component.data.component" />
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
