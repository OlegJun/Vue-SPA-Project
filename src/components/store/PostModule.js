import axios from 'axios';

export const PostModule = {
   state: () => ({
         posts: [],
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
      }),
      getters: {
         sortedPosts(state) {
            return [...state.posts].sort((a, b) => {
               if(state.selectedSort !== 'id') {
                  return a[state.selectedSort]?.localeCompare(b[state.selectedSort])
               } else {
                  return a[state.selectedSort] - (b[state.selectedSort])
               }
            })
         },
         sortPostAndSearch(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQery.toLowerCase()))
         }
      },
      mutations: {
         setPosts(state, posts) {
            state.posts = posts;
         },
         setLoading(state, bool) {
            state.isPostLoading = bool;
         },
         setPage(state,page) {
            state.page = page;
         },
         setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
         },
         setTotalPaages(state, totalPages) {
            state.totalPages = totalPages;
         },
         setSearchQery(state, searchQery) {
            state.searchQery = searchQery;
         }
      },
      actions: {
         async fetchPosts({state, commit}) {
            try {
               commit('setLoading', true);
               const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                  params: {
                     _page: state.page,
                     _limit: state.limit
                  }
               });
               commit('totalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
               commit('setPosts', response.data)
            } catch(e) {
               console.error(e)
            } finally {
               commit('setLoading', false);
            }
         },
         async loadMorePosts({state, commit}) {
            commit('setPage', state.page + 1)
            try {
               const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                  params: {
                     _page: state.page,
                     _limit: state.limit
                  }
               });
               commit('totalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
               commit('setPosts', [...state.posts, ...response.data]);
            } catch(e) {
               alert('Ошибка')
            }
         },
      },
      namespaced: true
}