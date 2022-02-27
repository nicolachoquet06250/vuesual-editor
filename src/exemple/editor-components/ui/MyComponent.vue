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
  </div>
</template>

<script setup lang="ts">
defineProps({
  data: {
    default: {
      text: '',
      texts: [],
      checked: false
    }
  }
});
</script>

<style scoped>
ul li {
  list-style: inside;
}
</style>
