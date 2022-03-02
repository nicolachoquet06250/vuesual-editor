<template>
    <div>
        <SimpleBox :px="5" :py="5" style="border: 1px solid lightblue; border-radius: 5px;">
            <Container>
                <Row>
                    <Col>
                        <Dropdown v-model="chosenComponent" :label="chosenComponentTitle" 
                                  @change="sendData()">
                            <Option v-for="(component, i) of components" :key="i"
                                    :target="component.slug">
                                {{component.title}}
                            </Option>
                        </Dropdown>
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                        <ChosenBuilderComponent :data="chosenComponentData"
                                                @send="handleSend($event)" />
                    </Col>
                </Row>
            </Container>
        </SimpleBox>
    </div>
</template>

<script setup>
import {computed, ref, watch} from 'vue';
import {useComponents} from '../../../../../hooks/editor-components';
import {Container, Row, Col} from '../../../grid';
import {Dropdown, Option} from '../../forms';
import {SimpleBox} from '../../boxes';

const props = defineProps({
    defaultComponent: () => ({
        slug: String,
        data: Object
    })
})
const emit = defineEmits(['send']);

const {components} = useComponents();

const chosenComponent = ref(props.defaultComponent?.slug ?? components.value.reduce((r, c) => !r && !c.recursive ? c.slug : r, ''));
const chosenComponentData = ref(components.value.reduce((r, c) => c.slug === chosenComponent.value ? c.data : r, {}));
const chosenComponentTitle = computed(() => components.value.reduce((r, c) => c.slug === chosenComponent.value ? c.title : r, 'None'));
const ChosenBuilderComponent = computed(() => components.value.reduce((r, c) => c.slug === chosenComponent.value ? c.builderComponent : r, null));

let sendData;
(sendData = () => emit('send', {
    data: {
        component: {
            slug: chosenComponent.value,
            data: chosenComponentData.value
        }
    }
}))();

const handleSend = e => {
    chosenComponentData.value = e.data;
    sendData();
}

watch(chosenComponent, () => {
    chosenComponentData.value = components.value.reduce((r, c) => c.slug === chosenComponent.value ? c.data : r, {});
    sendData();
});
</script>

<style scoped>

</style>