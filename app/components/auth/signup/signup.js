'use strict';

import AuthService from '../auth.service';
import UtilService from '../../utils/util';


export default {
  data() {
      return {
        username: '',
        emailAddress: '',
        password: '',
        password_confirm: '',
        firstName: '',
        lastName: '',
        errors: [],
        success: {}
      }
    },
    methods: {
      signup() {
        const user = {
          username: this.username,
          emailAddress: this.emailAddress,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
        };

        AuthService.signup(this, user).then(user => {
          this.clear();
          this.success = { message: 'Sign up succesful. Please log in to continue'};
        }).catch(err => {
          this.errors.push({ message: err.message });
        });
      },
      matchUsername() {
        UtilService.matchUsername(this.username).then(res => {
          const user = res.data;
          if (user) {
            this.errors.push({ message: 'Username has been taken'});
          }
        }).catch(err => {
          this.errors.push({ message: err.message });
        });
      },
      matchEmailAddress() {
        UtilService.matchEmail(this.emailAddress).then(res => {
          const user = res.data;
          if (user) {
            this.errors.push({ message: 'Email address already exists' });
          }
        }).catch (err => {
          this.errors.push({ message: err.message });
        });
      },
      clear() {
        this.username = '';
        this.emailAddress = '';
        this.password = '';
        this.firstName = '';
        this.lastName = '';
        this.password_confirm = '';
      }
    }
};
