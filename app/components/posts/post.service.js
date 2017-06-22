'use strict';

import {Http} from '../../config/http';

export default {
  publish(post) {
    const endpoint = '/posts';
    return Http.post(endpoint, post);
  },

  save(post) {
    const endpoint = '/posts?draft=true';
    return Http.post(endpoint, post);
  },

  all() {
    const endpoint = 'posts';

    return Http.get(endpoint);
  },
  
  find(id) {
    const endpoint = `posts/${id}`;
    return Http.get(endpoint);
  }
};