<template>
  <div>
    <slot></slot>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

div::v-slotted(> div) {
  flex: 1;
}
</style>
