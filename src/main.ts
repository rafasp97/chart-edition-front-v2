import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import 'vue-color/style.css';    
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

createApp(App)
    .use(router)
    .use(vuetify)
    .use(Vue3Toastify, {
        theme: 'dark',
        position: 'top-center', 
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true
    })
    .mount('#app')
