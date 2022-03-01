<template>
    <Container>
        <Row>
            <Col>
                <h5> {{ title }} </h5>
            </Col>
        </Row>
        
        <template v-for="(_, i) of values" :key="i">
            <slot :i="i" :change="() => $emit('change', values)"></slot>
        </template>

        <Row>
            <Col style="display: flex; justify-content: flex-end">
                <Button @click="handleAdd()">
                    {{ addLabel }}
                </Button>
            </Col>
        </Row>
    </Container>
</template>

<script setup>
import { ref, watch } from "vue";
import Container from "../../grid/Container.vue";
import Row from "../../grid/Row.vue";
import Col from '../../grid/Col.vue';
import Button from "../forms/buttons/Button.vue";

const props = defineProps({
    title: String,
    addLabel: String,
    modelValue: Array,
    voidModel: [Array, Object, String, Number]
});
const emit = defineEmits(['update:modelValue', 'change']);

const values = ref(props.modelValue);

watch(() => props.modelValue, () => {
    values.value = props.modelValue;
    emit('change', values.value);
});

const handleAdd = () => {
    values.value = [...values.value, props.voidModel];
    emit('update:modelValue', values.value);
    emit('change', values.value);
};
</script>

<style scoped>

</style>