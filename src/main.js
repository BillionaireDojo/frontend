import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import BootstrapVue3 from 'bootstrap-vue-3';
import VueSplide from '@splidejs/vue-splide';
import router from './router';
import Vue3Lottie from 'vue3-lottie';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

import mitt from 'mitt';
const emitter = mitt();

import Ethers from "@/services/ethers";

const ethersInstance = new Ethers();

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(BootstrapVue3);
app.use( VueSplide );
app.use(Vue3Lottie);

app.config.globalProperties.emitter = emitter;
app.config.globalProperties.ethersInstance = ethersInstance;

app.mount('#app');
