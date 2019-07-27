import Vue from 'vue'
import 'babel-polyfill'
import Vuex from 'vuex'
import axios from 'axios'
import Vuetify from 'vuetify'
import VueWait from 'vue-wait'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import VueLogger from 'vuejs-logger'
import VeeValidate from 'vee-validate'
import VueProgressBar from 'vue-progressbar'

// ===============
// Styles
// ===============
import 'vuetify/dist/vuetify.min.css'

// ===============
// Pages
// ===============
import store from '@/store'
import router from '@/router'
import layout from '@/layouts/default'

// ===============
// Plugins
// ===============
import VueLoggerOptions from "@/plugins/logger_options.js"


Vue.config.productionTip = false

Vue.use(store)
Vue.use(VueWait)
Vue.use(VueRouter)
Vue.use(VeeValidate)
Vue.use(VueAxios, axios)
Vue.use(Vuetify)
Vue.use(VueProgressBar, {
    color: '#78C786',
    failedColor: '#C03136',
    height: '2px'
})
Vue.use(VueLogger, VueLoggerOptions)

// -------------------
// Axios settings
// -------------------
axios.defaults.baseURL = 'https://perfectjourney1.ua.had.su/admin/ajax/'; // base url
// axios.defaults.headers.common['X-CSRF-TOKEN'] = 'Bearer ' + '0000';      // Токен

// -------------------
// --- vue layout init
// -------------------
var vm = new Vue({
    router,
    store,
    el: '#app',
    data: {
        domain: 'https://perfectjourney1.ua.had.su',
        cnf: {}
    },
    vuetify: new Vuetify({
        theme: {
            primary: '#7499CD',
            secondary: '#76CE84',
            accent: '#856FC5',
            error: '#C03136',
            blue: '#4268A9'
        }
    }),
    wait: new VueWait({
        useVuex: true, // You must pass this option `true` to use Vuex
        vuexModuleName: 'wait', // It's optional, `wait` by default.
        registerComponent: true,     // Registers `v-wait` component
        componentName: 'v-wait',     // <v-wait> component name, you can set `my-loader` etc.
        registerDirective: true,     // Registers `v-wait` directive
        directiveName: 'wait',       // <span v-wait /> directive name, you can set `my-loader` etc.
    }),
    render: h => h(layout)
})