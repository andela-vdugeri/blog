'use strict';

import {router} from '../../main';

export default {
  mounted() {
    let token = localStorage.getItem('usertoken');
    if (token) {
      this.authenticated = true;
    }
  },
  data() {
    return {
      authenticated: false
    };
  }
}
