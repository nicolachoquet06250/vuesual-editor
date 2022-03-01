<template>
    <div>
        <SimpleBox :p0="true">
            <Repeater title="Cartes" add-label="Ajouter une carte"
                      v-model="data.cards" :void-model="defaultCard"
                      @change="sendData()">
                <template v-slot:default="{ i }">
                    <Container>
                        <Row>
                            <Col>
                                <Row>
                                    <Col>
                                        <Text v-model="data.cards[i].title" placeholder="Titre" />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <LongText v-model="data.cards[i].content" placeholder="Contenu" />
                                    </Col>
                                </Row>
                            </Col>

                            <Col style="flex: .1">
                                <Button :icon="FaIcon.TRASH"
                                        :circle="true"
                                        :no-border="true"
                                        active-color="red"
                                        @click="deleteCard(i)" />
                            </Col>
                        </Row>
                    </Container>
                </template>
            </Repeater>
        </SimpleBox>
    </div>
</template>

<script setup>
import {reactive} from 'vue';
import {Text, LongText, Button} from '../../../components/utilities/ui/forms';
import {Container, Row, Col} from '../../../components/utilities/grid';
import {SimpleBox, Repeater} from '../../../components/utilities/ui/boxes';
import {FaIcon} from "../../../enums/icons";

const emit = defineEmits(['send']);
const props = defineProps({
    data: Object
});

const data = reactive({
    cards: props.data?.cards ?? []
});
const defaultCard = {
    title: '',
    content: ''
};

const sendData = () => emit('send', { data: { ...data } });

const deleteCard = index => {
    data.cards = data.cards.reduce((r, c, i) => index !== i ? [...r, c] : r, []);
};
</script>