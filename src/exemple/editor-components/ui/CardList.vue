<template>
    <!--<pre>{{data.cards}}</pre>-->

    <Container style="width: 100%;">
        <GridType>
            <Col class="col" :style="colStyle" v-for="(card, i) of data.cards" :key="i">
                <div class="card">
                    <Container>
                        <Row>
                            <Col>
                                <h2>{{card.title}}</h2>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <p>
                                    <template v-for="(content, i) of cardContent(card.content)" :key="i">
                                        {{content}} <br v-if="i < cardContent(card.content).length - 1" />
                                    </template>
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Col>
        </GridType>
    </Container>
</template>

<script setup>
import { useWindowSize } from '@vueuse/core';
import { computed, watch } from 'vue';
import {Container, Row, Col, Column} from '../../../components/utilities/grid';

defineProps({
    data: {
        default: {
            cards: []
        }
    }
});

const { width } = useWindowSize();

const GridType = computed(() => width.value < 1000 ? Column : Row);

const colStyle = computed(() => width.value < 1000 ? { 
    'width': '100%', 
    'box-sizing': 'border-box', 
    'padding-left': '10px', 
    'padding-right': '10px',
    'margin': '5px'
} : {});

watch(width, () => {
    //console.log(width.value, GridType.value);
})

const cardContent = content => {
    if (typeof content !== "string") {
        return content;
    }

    if (content.indexOf('\n') === -1) {
        return [content];
    }

    return content.split('\n');
};
</script>

<style scoped>
.col {
    /*min-width: 300px;*/
    flex: 1;
    min-height: 250px;
    margin: 5px;
}

.col:not(:first-child) {
    margin-left: 20px;
}

.col .card {
    min-height: 250px;
    width: 100%;
    border: 1px solid lightblue;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
}
</style>