<template>
  <input type="text"
         :class="{ invalid: validated === false, valid: validated === true }"
         :value="modelValue"
         :placeholder="placeholder"
         @input="handleInput($event)" />

  <div v-if="validated === true && $slots.success_message"
        :class="{ message: true, valid: true }">
    <slot name="success_message"></slot>
  </div>

  <div v-if="validated === false && $slots.error_message"
       :class="{ message: true, invalid: true }">
    <slot name="error_message"></slot>
  </div>
</template>

<script setup>
import {ref, watch, defineEmits} from "vue";
import {ValidateMoment} from "../../../../../types/input-validator";
import {match} from "../../../../../hooks/string";

const props = defineProps({
  modelValue: String,
  validator: [RegExp, Boolean],
  validOn: String,
  sent: {
    default: false
  },
  placeholder: {
    default: ''
  }
});
const emit = defineEmits(['update:modelValue', 'input']);

const value = ref(props.modelValue ?? '');
const validated = ref(null);

const validField = e => {
  if (props.validator && props.validOn) {
    const v = e && e.target?.value !== null && e.target?.value !== undefined ? e.target?.value : value.value;

    return match(props.validator, v.toString());
  }

  return true;
};

const handleInput = e => {
  if (props.validator && props.validOn === ValidateMoment.INPUT) {
    emit('update:modelValue', (e.target?.value ?? ''));
    validated.value = validField(e);
    if ((e.target?.value ?? '') === '') {
      validated.value = null;
    }
  } else {
    emit('update:modelValue', (e.target?.value ?? ''));
  }
  emit('input', e);
}

watch(() => props.sent, () => {
  if (props.validator && props.sent && props.validOn === ValidateMoment.SEND) {
    validated.value = validField();
    if (value.value === '') {
      validated.value = null;
    }
  }
});
watch(() => props.modelValue, () => (value.value = props.modelValue ?? ''));
</script>

<style scoped>
input {
  width: calc(100% - 11px);
  padding: 5px;
  border-radius: 5px;
  border: 1px solid black;
}

input:focus {
  outline: 1px solid blue;
}

input.invalid {
  border-color: red;
}

input.invalid:focus {
  outline: 1px solid red;
}

input.valid {
  border-color: green;
}

input.valid:focus {
  outline: 1px solid green;
}

.message {
  display: none;
}

.message.invalid {
  display: block;
  color: red;
}

.message.valid {
  display: block;
  color: green;
}
</style>
