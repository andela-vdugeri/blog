'use strict';

import {Http} from '../../config/http';
import {router} from '../../main';


export default {
  signup(context, user) {
    const endpoint = '/users';
    return Http.post(endpoint, user);
  },

  login(user) {
    const endpoint = '/auth/login';
    return new Promise((resolve, reject) => {
      Http.post(endpoint, user).then(res => {
          window.location.reload();
        resolve(res.data);
      }).catch(err => {
        reject(err);
      });
    })
  },

  logout() {

    return new Promise((resolve, reject) => {
      let token = localStorage.getItem('usertoken');
      if (token) {
        window.location.reload();
          resolve();
      } else {
          router.push('/login');
      }
    });
  }
};
