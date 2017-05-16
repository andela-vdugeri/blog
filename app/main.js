'use strict';


import Vue from 'vue';
import AppComponent from './components/app/app-component.vue';


const App = new Vue({
    el: '#app',
    components: {
      app: AppComponent,
    },
    render: h => h('app')
});
