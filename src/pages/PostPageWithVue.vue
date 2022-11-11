<template>
<!-- Предстовляет собой html который встроится на главной странице в app -->
   <div>
      <h1>Заголовок с постами</h1>
      <my-input
         v-focus
         :model-value="searchQery"
         @update:model-value="setSearchQuery"
         placeholder="Поиск по названию..."
      />
      <div class="appButtons">
         <my-button
         @click="showDialog"
         >
            Создать пост
         </my-button>
         <my-select
            :model-value="selectedSort"
            @update:model-value="setSelectedSort" 
            :options="sortOption"
         />
      </div>
      <my-dialog v-model:show="myDialogVisible">
      <!-- Это называется декомпанизация полезная вещь, чтобы проект не превращался в огромную кучу кода непонятную -->
      <post-form
         @create="createPost"
      />
      </my-dialog>
      <post-list 
         :posts = "sortPostAndSearch"
         @remove="removePost"
         v-if="!isPostLoading"
      />
      <div v-else>Not загрузка...</div>
      <!-- <div class="page__wraper">
         <my-pages
            v-model="page"
            :totalPages="totalPages"
         >
            {{ pageNumber }}
         </my-pages>
      </div> -->
   <!-- ------------------------------------------------------------------- -->
   <div v-intersection="loadMorePosts" class="observer"></div>
   </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyDialogWindow from '@/components/UI/MyDialogWindow';
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
/* Экспортируем скрипт дл мэйн js */
export default {
   components: {
      PostList,
      PostForm,
      MyDialogWindow
   },
   data() {
      // Функция дата со свойствами и так далее которая вызывается при попытки получения компонентов
      return {
         // Работа с массивом для реактивности и ненадобности повторения кода
         myDialogVisible: false,
         /* ----------------------------------------------------------------- */
      }
   },
   methods: {
      /* функции методы для интеграции в код */
      ...mapMutations({
         setPage: 'post/setPage',
         setSearchQuery: 'post/setSearchQery',
         setSelectedSort: 'post/setSelectedSort',
      }),
      ...mapActions({
         loadMorePosts: 'post/loadMorePosts',
         fetchPosts: 'post/fetchPosts'
      }),

      createPost(post) {
         this.posts.push(post);
         this.myDialogVisible = false;
      },
      removePost(post) {
         this.posts = this.posts.filter(p => p.id !== post.id)
      },
      showDialog () {
         this.myDialogVisible = true;
      },
   },
   mounted() {
      this.fetchPosts();
   },
   computed: {
      ...mapState({
         posts: state => state.post.posts,
         isPostLoading: state => state.post.isPostLoading,
         selectedSort: state => state.post.selectedSort,
         searchQery: state => state.post.searchQery,
         page: state => state.post.page,
         limit: state => state.post.limit,
         totalPages: state => state.post.totalPages,
         sortOption: state => state.post.sortOption
      }),
      ...mapGetters({
         sortedPosts: 'post/sortedPost',
         sortPostAndSearch: 'post/sortPostAndSearch'
      })
   },
   watch: {
/*       page() {
         this.fetchPosts();
      } */
   }
}
</script>





<style>
/* Стили как обычный css */
   .appButtons {
      display: flex;
      justify-content: space-between;
   }
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
      border: 2px solid green;
      background: rgba(17, 0, 255, 0.5);
   }
   .observer {
      height: 30px;
      margin: 20px;
      background: green;
   }
</style>