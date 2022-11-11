<template>
   <div class="post">
   <div>
      <!--Здесь используется создание новых постов по шаблону из массива в дате, при помощи интерполяции-->
      <div><strong>ID:</strong> {{ post.id }}</div>
      <div><strong>Название:</strong> {{ post.title }}</div>
      <div><strong>Описание:</strong> {{ post.body }}</div>
   </div>
         <div class="my__btn">
            <my-button
               @click="$router.push(`/posts/${post.id}`)"
            >
               Открыть
            </my-button>
            <my-button
               @click="$emit('remove', post)"
            >
               Удалить
            </my-button>
         </div>
   </div>
</template>

<script>
export default {
   props: {
      post: {
         type: Object,
         required: true
      }
   }
}
</script>

<style scoped>
   .post {
         margin-top: 15px;
         border: 2px solid green;
         padding: 15px;
         display: flex;
         align-items: center;
         justify-content: space-between;
      }
   .my__btn {
      display: flex;
   }
</style>