<template>
   <div class="navbar">
      <div @click="$router.push('/')">Vue 3</div>
      <div class="navbar__btn">
         <my-button
            @click="$router.push('/posts')"
         >
            Posts
         </my-button>
         <my-button
            @click="$router.push('/about')"
         >
            About
         </my-button>
         <my-button
            @click="$router.push('/storege')"
         >
            Storage
         </my-button>
      </div>
   </div>
</template>

<script>
export default {
}
</script>

<style scoped>
   .navbar {
      height: 50px;
      background-color: lightgray;
      box-shadow: 2px 2px 4px gray;
      display: flex;
      align-items: center;
      padding: 20px;
      justify-content: space-between;
   }
   button {
      margin: 0 20px 0 0;
   }
</style>
