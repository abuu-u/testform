import { createApp } from 'vue';
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';
import App from './App.vue';
import './assets/global.scss';
import { router } from './routes';
import { key, store } from './store';

createApp(App).use(store, key).use(router).mount('#app')
