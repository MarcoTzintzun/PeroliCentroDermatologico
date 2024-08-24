<template>
  <div class="input-block" :class="classBlock">
    <label :for="id">
      {{ label }}
    </label>
    <input
      class="text-field"
      :class="classInput"
      :id="id"
      :inputmode="inputMode"
      type="text"
      v-bind:value="value"
      @input="$emit('input', $event.target.value)"
    >
  </div>
</template>

<script>
export default {
  name: 'BasicInput',
  props: {
    label: String,
    classBlock: String,
    classInput: String,
    inputMode: String,
    id: String,
    value: String
  }
}
</script>

<style lang="scss" scoped>
.input-block {
  display: flex;
  align-items: flex-end;

  label,
  span {
    white-space: nowrap;
  }

  input {
    text-align: center;
  }

  .radio {
    &:first-of-type {
      margin-inline-end: 1rem;
    }
  }
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0 1000px #fff inset;
  box-shadow: 0 0 0 1000px #fff inset;
  transition: background-color 5000s ease-in-out 0s;
}

.text-field {
  color: var(--input-text-color);
  width: 100%;
  border: none;
  padding: 0;
  border-bottom: 1px solid #d4d4d4;
  outline: none;

  &focus {
   border-bottom: 1px solid #26a69a;
   box-shadow: 0 1px 0 0 #26a69a;
  }
}
</style>
