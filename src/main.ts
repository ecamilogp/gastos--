import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import { Quasar } from 'quasar';
import quasarLang from 'quasar/lang/es';
import '@quasar/extras/material-icons/material-icons.css';
import router from './router';

const myApp = createApp(App);
const pinia = createPinia();

myApp.use(Quasar, {
  plugins: {},
  lang: quasarLang,
});
myApp.use(router);
myApp.use(pinia);
myApp.mount('#app');
