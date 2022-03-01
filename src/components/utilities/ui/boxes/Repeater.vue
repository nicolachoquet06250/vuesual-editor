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
import {ref, watch} from "vue";
import {Container, Row, Col} from '../../grid';
import {Button} from '../forms';

const props = defineProps({
    title: String,
    addLabel: String,
    modelValue: Array,
    voidModel: [Array, Object, String, Number]
});
const emit = defineEmits(['update:modelValue', 'change']);

const values = ref(props.modelValue ?? []);

watch(() => props.modelValue, () => {
    values.value = props.modelValue;
    emit('change', values.value);
});

const handleAdd = () => {
    if (typeof props.voidModel === "object") {
        if (props.voidModel instanceof Array) {
            values.value = [...values.value, [ ...props.voidModel ]];
        } else {
            values.value = [...values.value, { ...props.voidModel }];
        }
    } else {
        values.value = [...values.value, props.voidModel];
    }
    
    emit('update:modelValue', values.value);
    emit('change', values.value);
};
</script>

<style scoped>

</style>