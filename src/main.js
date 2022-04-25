import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import  VueGoogleMaps from '@fawmi/vue-google-maps'

const app = createApp(App)
app.use(VueGoogleMaps,{
    load:{
        key:'AIzaSyDjohJNE3DLtPuPS36-9ROF41HfdwnnItc',
    },
})
app.use(ElementPlus)
app.mount('#app')
