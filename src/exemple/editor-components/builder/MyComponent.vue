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

      <Repeater title="Repeater component title" add-label="Add text"
                v-model="data.texts" void-model=""
                @change="sendData()">
        <template v-slot:default="{ i }">
          <Row>
            <Col>
              <Text v-model="data.texts[i]"
                    :placeholder="wording.repeater.input.placeholder"
                     />
            </Col>

            <Col style="flex: .1">
              <Button :icon="FaIcon.TRASH"
                      :circle="true"
                      :no-border="true"
                      active-color="red"
                      @click="texts.delete(i)" />
            </Col>
          </Row>
        </template>
      </Repeater>

      <Container>
        <Row>
          <Col>
            <hr />
          </Col>
        </Row>
      </Container>

      <SimpleBox :py="5">
        <Container>
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

                  <Switch v-model="data.checked" @change="sendData()">
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

      <ComponentList :default-component="data.component" 
                      @send="data.component = $event; sendData()" />

      <Repeater title="Liste de composants" add-label="Ajouter un composant"
                v-model="data.components" :void-model="componentModel"
                @change="sendData()">
        <template v-slot:default="{ i, change }">
          <Row>
            <Col>
              <ComponentList :default-component="data.components[i]" 
                              @send="data.components[i] = $event; change()" />
            </Col>
            
            <Col style="flex: .1">
              <Button :icon="FaIcon.TRASH"
                      :circle="true"
                      :no-border="true"
                      active-color="red"
                      @click="components.delete(i)" />
            </Col>
          </Row>
        </template>
      </Repeater>
    </SimpleBox>
  </div>
</template>

<script setup>
import {computed, reactive, ref} from "vue";
import {useElementSize} from '@vueuse/core';
import {SimpleBox, Repeater} from '../../../components/utilities/ui/boxes';
import {Container, Row, Col} from '../../../components/utilities/grid';
import {Button, Text, Switch, Dropdown, Option} from '../../../components/utilities/ui/forms';
import {Tabs, Tab, TabContent} from '../../../components/utilities/ui/tabs';
import {ComponentList} from '../../../components/utilities/ui/lists/builder';
import {FaIcon} from "../../../enums/icons";

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
  select: props.data.select ?? 'toto',
  component: props.data?.component ?? {},
  components: props.data?.components ?? []
});

const componentModel = {
  data: {
    component: {
      slug: 'liste-de-cartes',
      data: {}
    }
  }
};

const card = ref();
const { width } = useElementSize(card);

const cardWidth = computed(() => width.value + 'px');

const currentCoucouTab = ref('coucou');

const sendData = () => emit('send', { data: { ...data } });

const texts = {
  delete(index) {
    data.texts = data.texts.reduce((r, c, i) => {
      if (i !== index) {
        return [...r, c];
      }
      return r;
    }, []);
  }
};

const components = {
  delete(index) {
    data.components = data.components.reduce((r, c, i) => {
      if (i !== index) {
        return [...r, c];
      }
      return r;
    }, []);
  }
};

const handleRepeaterChange = e => {
  console.log('handleRepeaterChange', (e ?? null));
}
</script>
