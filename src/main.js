import { createApp, useAttrs } from 'vue'

import App from './AppForVue'

import components from "@/components/UI";

import router from '@/router/router.js';

import VDirectives from '@/directives/index';

import store from "@/components/store/index"

const app = createApp(App)

components.forEach(component => {
   app.component(component.name, component)
})

VDirectives.forEach(directives => {
   app.directive(directives.name, directives)
})

app
   .use(router)
   .use(store)
   .mount('#app')
