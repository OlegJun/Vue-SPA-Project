<template>
         <div
            v-for="pageNumber in totalPages"
            :key="pageNumber"
            @click="changePage(pageNumber)"
            class="page"
            :class="{
               'curent__page': modelValue === pageNumber
            }"
         >
            {{ pageNumber }}
         </div>
</template>

<script>
export default {
   name: 'my-pages',
   props: {
      modelValue: {
         type: Number,
      },
      totalPages:{
         type: Number
         },
   },
   methods: {
      changePage(pageNumber) {
         console.log(pageNumber)
         this.$emit('update:modelValue', pageNumber)
      },
   }
}
</script>

<style scoped>
   .page__wraper {
      display:flex;
      margin: 15px 0;
   }
   .page {
      border: 1px solid black;
      padding: 10px;
      margin: 0 10px;
   }
   .curent__page {
      border: 2px solid green ;
      background: rgba(17, 0, 255, 0.5);
   }
</style>