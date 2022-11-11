<template>
   <button class="button">
      <slot></slot>
   </button>
</template>

<script>
export default {
   name: 'my-button'
}
</script>

<style scoped>
   .button {
      padding: 10px 30px;
      background: none;
      color: green;
      border: 1px solid green ;
   }
</style>