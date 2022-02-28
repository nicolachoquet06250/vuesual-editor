<template>
  <div ref="card">
    <SimpleBox :p0="true">
      <Container>
        <Row>
          <Col>
            <h6>{{ wording.input.title }}</h6>
            <Text v-model="data.text" :placeholder="wording.input.placeholder" @input="sendData()">
              <template v-slot:success_message> {{ wording.input.messages.success }} </template>

              <template v-slot:error_message> {{ wording.input.messages.error }} </template>
            </Text>
          </Col>

          <Col>
            <h6> {{ wording.test_text.title }} </h6>
            <span> {{ wording.test_text.text }} </span>
          </Col>
        </Row>

        <Row>
          <Col>
            <Dropdown v-model="data.select" @change="sendData()">
              <Option target="toto">
                Toto
              </Option>
              <Option target="tata">
                Tata
              </Option>
              <Option target="titi">
                Titi
              </Option>
            </Dropdown>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <h5> {{ wording.repeater.title }} </h5>
          </Col>
        </Row>

        <Row v-for="(_, i) of data.texts" :key="i">
          <Col>
            <Text v-model="data.texts[i]"
                  :placeholder="wording.repeater.input.placeholder"
                  @input="sendData()" />
          </Col>
          <Col style="flex: .1">
            <Button :icon="FaIcon.TRASH"
                    :circle="true"
                    :no-border="true"
                    active-color="red"
                    @click="texts.delete(i)" />
          </Col>
        </Row>

        <Row>
          <Col style="display: flex; justify-content: flex-end">
            <Button @click="texts.add()">
              {{ wording.repeater.add_button.label }}
            </Button>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <hr />
          </Col>
        </Row>
      </Container>

      <SimpleBox :py="5">
        <Container class="repeater">
          <Row>
            <Col>
              <Tabs :parent-width="cardWidth">
                <template v-slot:tab>
                  <Tab target="coucou"
                       :active="currentCoucouTab === 'coucou'"
                       @click="currentCoucouTab = $event.target?.getAttribute('data-target') ?? ''">
                    coucou
                  </Tab>

                  <Tab target="coucou2"
                       :active="currentCoucouTab === 'coucou2'"
                       @click="currentCoucouTab = $event.target?.getAttribute('data-target') ?? ''">
                    coucou 2
                  </Tab>
                </template>

                <TabContent id="coucou" style="min-height: 0; height: auto;">
                  <div>Coucou</div>

                  <Switch v-model="data.checked">
                    Un switch
                  </Switch>
                </TabContent>

                <TabContent id="coucou2" style="min-height: 0; height: auto;">
                  Coucou 2
                </TabContent>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </SimpleBox>
    </SimpleBox>
  </div>
</template>

<script setup>
import {computed, reactive, ref, watch} from "vue";
import { useElementSize } from '@vueuse/core';
import SimpleBox from "../../../components/utilities/ui/boxes/SimpleBox.vue";
import Text from "../../../components/utilities/ui/forms/inputs/Text.vue";
import Container from "../../../components/utilities/grid/Container.vue";
import Row from "../../../components/utilities/grid/Row.vue";
import Col from '../../../components/utilities/grid/Col.vue';
import Button from "../../../components/utilities/ui/forms/buttons/Button.vue";
import Tabs from "../../../components/utilities/ui/tabs/Tabs.vue";
import Tab from "../../../components/utilities/ui/tabs/Tab.vue";
import TabContent from "../../../components/utilities/ui/tabs/TabContent.vue";
import {FaIcon} from "../../../enums/icons";
import Switch from "../../../components/utilities/ui/forms/switches/Switch.vue";
import Dropdown from "../../../components/utilities/ui/forms/dropdown/Dropdown.vue";
import Option from "../../../components/utilities/ui/forms/dropdown/Option.vue";

const emit = defineEmits(['send']);
const props = defineProps({
  data: Object
});

const wording = {
  input: {
    messages: {
      success: 'Saisie valide',
      error: 'Erreur de saisie'
    },
    placeholder: 'toto',
    title: 'Input'
  },
  test_text: {
    title: 'Test',
    text: 'Coucou c\'est moi'
  },
  repeater: {
    title: 'Repeater title',
    input: {
      placeholder: 'titi'
    },
    add_button: {
      label: 'Add text'
    }
  }
};

const data = reactive({
  text: props.data?.text ?? '',
  texts: props.data?.texts ?? [],
  checked: props.data?.checked ?? false,
  select: props.data.select ?? 'toto'
});

const card = ref();
const { width } = useElementSize(card);

const cardWidth = computed(() => width.value + 'px');

const currentCoucouTab = ref('coucou');

const sendData = () => emit('send', { data: { ...data } });

const texts = {
  add() {
    data.texts = [
      ...data.texts,
      ''
    ]
    sendData();
  },

  delete(index) {
    data.texts = data.texts.reduce((r, c, i) => {
      if (i !== index) {
        return [...r, c];
      }
      return r;
    }, []);
    sendData();
  }
};

watch(() => data.checked, () => {
  sendData()
});
</script>

<style scoped>

</style>
