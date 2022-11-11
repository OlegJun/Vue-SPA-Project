<template>
   <div class="parent">
      <div class="for__form">
         <form class="form" @submit.prevent>
            <h4>Создание поста</h4>
            <my-input 
               v-focus
               v-model.trim="post.title"
               placeholder="Название"
            />
            <my-input
               v-model.trim="post.body"
               placeholder="Описание"
            />
            <my-button
               class="button"
               @click="createPost"
               >
                  Создать
            </my-button>
         </form>
      </div>
   </div>
</template>

<script>
export default {
   data () {
      return {
         post: {
            title: '',
            body: '',
         }
      }
   },
   methods: {
      createPost() {
         this.post.id = Date.now();
         this.$emit('create', this.post)
         this.title = '',
         this.body = '',
         this.post = {
            title: '',
            body: '',
         }
      }
   },
}
</script>

<style scoped>
   .for__form {
      display: flex;
      justify-content: center;
      align-items: center;
      }
   .form {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
   }
   .button {
      align-self: flex-end;
   }
</style>