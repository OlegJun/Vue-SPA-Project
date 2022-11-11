<template>
<!-- Предстовляет собой html который встроится на главной странице в app -->
   <div>
      <h1>Заголовок с постами</h1>
      <my-input
         v-focus
         v-model="searchQery"
         placeholder="Поиск по названию..."
      />
      <div class="appButtons">
         <my-button
         @click="showDialog"
         >
            Создать пост
         </my-button>
         <my-select
            v-model="selectedSort"
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
      <div v-else>Идеть загрузка...</div>
      <!-- <div class="page__wraper">
         <my-pages
            v-model="page"
            :totalPages="totalPages"
         >
            {{ pageNumber }}
         </my-pages>
      </div> -->
   <!-- ------------------------------------------------------------------- -->
   <div v-intersection="loadMorePost" class="observer"></div>
   </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyDialogWindow from '@/components/UI/MyDialogWindow';
import axios from 'axios';
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
         posts: [],
         myDialogVisible: false,
         isPostLoading: false,
         selectedSort: '',
         searchQery: '',
         page: 1,
         limit: 10,
         totalPages: 0,
         sortOption: [
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По содержанию'},
            {value: 'id', name: 'По ID'},
         ]
         /* ----------------------------------------------------------------- */
      }
   },
   methods: {
      /* функции методы для интеграции в код */
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
      async fetchPosts() {
         try {
            this.isPostLoading = true
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
               params: {
                  _page: this.page,
                  _limit: this.limit
               }
            });
            this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
            this.posts = response.data;
         } catch(e) {
            alert('Ошибка')
         } finally {
            this.isPostLoading = false;
         }
      },
      async loadMorePost() {
         this.page += 1
         try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
               params: {
                  _page: this.page,
                  _limit: this.limit
               }
            });
/*             this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit) */
            this.posts = [...this.posts, ...response.data];
         } catch(e) {
            alert('Ошибка')
         }
      },
   },
   mounted() {
      this.fetchPosts();
   },
   computed: {
      sortedPost() {
         return [...this.posts].sort((a, b) => {
            if(this.selectedSort !== 'id') {
               return a[this.selectedSort]?.localeCompare(b[this.selectedSort])
            } else {
               return a[this.selectedSort] - (b[this.selectedSort])
            }
         })
      },
      sortPostAndSearch() {
         return this.sortedPost.filter(post => post.title.toLowerCase().includes(this.searchQery.toLowerCase()))
      }
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