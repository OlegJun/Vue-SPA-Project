import { createStore } from "vuex";

import { PostModule } from "@/components/store/PostModule";

export default createStore({
   modules: {
      post: PostModule
   }
})