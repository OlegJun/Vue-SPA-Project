<template>
      <div v-if="posts.length > 0">
         <h3>List User</h3>
         <transition-group name="use-list">
            <post-item
               v-for="post in posts" 
               :post="post"
               :key="post.id"
               @remove="$emit('remove', post)"
            />
         </transition-group>
      </div>
      <h2 v-else>
         Постов нет
      </h2>
</template>

<script>
import PostItem from "@/components/PostItem";
export default {
   components: {PostItem},
   props: {
      posts: {
         type: Array,
         required: true,
      }
   }
}
</script>

<style scoped>
.use-list-item {
   display: inline-block;
   margin-right: 10px;
}
.use-list-enter-active,
.use-list-leave-active {
   transition: all 0.4s ease;
}
.use-listt-enter-from,
.use-list-leave-to {
   opacity: 0;
   transform: translateX(150px);
}

.use-list-move {
   transition: transform 0.4s ease;
}
</style>