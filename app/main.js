'use strict';


import Vue from 'vue';
import Router from 'vue-router';
import AppComponent from './components/app/app-component.vue';
import Sidebar from './components/sidebar/sidebar.vue';
import Post from './components/posts/post.vue';
import Home from './components/home/home.vue';
import Login from './components/auth/login/login.vue';
import SignUp from './components/auth/signup/signup.vue';

Vue.use(Router);

Vue.component(
  'app-component',
  AppComponent
);



const routes = [
  { path: '/', component: Home},
  { path: '/login', component: Login},
  { path: '/signup', component: SignUp},
];

const router = new Router({
  routes
});

const App = new Vue({
  router
}).$mount('#app');
