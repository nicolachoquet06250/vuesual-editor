<template>
  <div :class="{
    pl: !p0 && (!!pl || !!px),
    pr: !p0 && (!!pr || !!px),
    pb: !p0 && (!!pb || !!py),
    pt: !p0 && (!!pt || !!py),
    p0
  }">
    <slot></slot>
  </div>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
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

const pl = computed(() => (props.px ?? props.pl) + 'px');
const pr = computed(() => (props.px ?? props.pr) + 'px');
const pb = computed(() => (props.py ?? props.pb) + 'px');
const pt = computed(() => (props.py ?? props.pt) + 'px');
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;

  --pl: v-bind(pl);
  --pr: v-bind(pr);
  --pb: v-bind(pb);
  --pt: v-bind(pt);
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
