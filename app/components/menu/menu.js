'use strict';

import AuthService from '../auth/auth.service';
import {router} from '../../main';

export default {
  data() {
    return {}
  },

  methods: {
    logout() {
      AuthService.logout().then(() => {
        localStorage.removeItem('usertoken');
        router.push('/');
      });
    }
  }
}
