import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'vue-toast-notification/dist/theme-sugar.css'
import VueToast from 'vue-toast-notification'

createApp(App)
  .use(VueToast, {
    // One of the options
    position: 'top'
  })
  .use(store)
  .use(router)
  .mount('#app')
