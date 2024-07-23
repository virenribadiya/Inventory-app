import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import axios from 'axios'
import { authService } from './services/authService'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' // instead of this we can use cdn also. 
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401 || error.response.status === 403) {
      authService.doLogout();
    }
    return Promise.reject(error);
  }
);

const app = createApp(App);

// Provide userData using Vue's provide/inject
app.provide('userData', async () => {
  try {
    const userData = await services.getLoginUserDetails({}); // Make API call to get user data
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null; // Return null if there's an error
  }
})

app.use(router)
app.use(vuetify)
app.use(createPinia())

app.mount('#app')
