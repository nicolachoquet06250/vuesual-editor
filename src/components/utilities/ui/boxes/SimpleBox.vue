<template>
  <div :class="{
    pl: !p0 && (!!pl || !!px),
    pr: !p0 && (!!pr || !!px),
    pb: !p0 && (!!pb || !!py),
    pt: !p0 && (!!pt || !!py),
    p0
  }" :style="{
    '--pl': (px ? px : pl) + 'px',
    '--pr': (px ? px : pr) + 'px',
    '--pb': (py ? py : pb) + 'px',
    '--pt': (py ? py : pt) + 'px',
  }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  pl: Number,
  pr: Number,
  pb: Number,
  pt: Number,
  px: Number,
  py: Number,
  p0: {
    default: false
  }
});
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
}

div.pl {
  padding-left: var(--pl);
}
div.pr {
  padding-right: var(--pr);
}
div.pt {
  padding-top: var(--pt);
}
div.pb {
  padding-bottom: var(--pb);
}

div:not(.pt, .pb, .pl, .pr) {
  padding: 5px;
}

div.p0 {
  padding: 0!important;
}
</style>
