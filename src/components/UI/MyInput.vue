<template>
   <input class="input" :value="modelValue" @input="updateInput" type="text">
</template>

<script>
export default {
   name: 'my-input',
   props: {
      modelValue: [String, Number]
   },
   methods: {
   updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
   }
   }
}
</script>

<style scoped>
   .input {
      width: 100%;
      border: 2px solid green;
      margin: 10px 0 5px 0;
   }
</style>