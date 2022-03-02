<template>
    <ComponentRenderer :data="modelValue.data" />
</template>

<script setup>
import {computed} from "vue";
import {useComponents} from "../../../../../hooks/editor-components";

const props = defineProps({
    modelValue: () => ({
        slug: String,
        data: Object
    })
});

const {components} = useComponents();

const ComponentRenderer = computed(() => components.value.reduce((r, c) => c.slug === props.modelValue.slug ? c.uiComponent : r, null));
</script>

<style scoped>

</style>