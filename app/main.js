'use strict';


import Vue from 'vue';
import Router from 'vue-router';
import VueQuillEditor from 'vue-quill-editor';
import AppComponent from './components/app/app-component.vue';
import Post from './components/posts/post.vue';
import NewPost from './components/posts/create/new-post.vue';
import Home from './components/home/home.vue';
import Login from './components/auth/login/login.vue';
import SignUp from './components/auth/signup/signup.vue';

Vue.use(Router);
Vue.use(VueQuillEditor);

Vue.component(
  'app-component',
  AppComponent
);



const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/signup', component: SignUp },
  { path: '/posts/new', component: NewPost },
  { path: '/posts/:id', component: Post, name: 'post'},
];

export let router = new Router({
  routes
});

const App = new Vue({
  router
}).$mount('#app');
