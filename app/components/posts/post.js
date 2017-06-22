'use strict';

import PostService from './post.service';

export default {
  created() {
    this.activate();
  },

  props: ['content'],

  data() {
    return {
      post: this.content
    };
  },

  methods: {
    activate() {
      const id = this.$route.params.id;
      PostService.find(id).then(res => {
        this.post = res.data;
      }).catch(err => {
        console.log(err);
      });
    }
  }
};
