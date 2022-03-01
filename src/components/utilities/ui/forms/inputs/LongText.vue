<template>
    <textarea :class="{ invalid: validated === false, valid: validated === true }"
              :value="modelValue"
              :placeholder="placeholder"
              @input="handleInput($event)"></textarea>
</template>

<script setup>
import {ref, watch, defineEmits} from "vue";
import {ValidateMoment} from "../../../../../enums/input-validator";
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
textarea {
  width: calc(100% - 11px);
  resize: vertical;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid black;
}

textarea:focus {
  outline: 1px solid blue;
}

textarea.invalid {
  border-color: red;
}

textarea.invalid:focus {
  outline: 1px solid red;
}

textarea.valid {
  border-color: green;
}

textarea.valid:focus {
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