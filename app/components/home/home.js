'use strict';

import Post from '../posts/post.vue';
import Sidebar from '../sidebar/sidebar.vue';
import PostService from '../posts/post.service';


export default {
  components: {
    post: Post,
    sidebar: Sidebar,
  },

  created() {
    this.activate();
  },

  data() {
    return {
      posts: [],
      errors: [],
    };
  },

  methods: {
    activate() {
      PostService.all().then(res => {
        this.posts = res.data;
      }).catch(error => {
        this.errors.push({ message: error.message });
      })
    }
  }
};
