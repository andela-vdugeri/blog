'use strict';

import AuthService from '../auth.service.js';
import {router} from '../../../main';

export default {
  data() {
    return {
      username: '',
      password: '',
      errors: [],
    }
  },
  methods: {
    login() {

      const user = {
        username: this.username,
        password: this.password,
      };

      AuthService.login(user).then(res => {
        if (res.token) {
          localStorage.setItem('usertoken', JSON.stringify(res.token));
          router.push('/');
        }
      }).catch(err => {
        this.errors.push({ message: 'Invalid username or password' });
      });
    }
  }
};
