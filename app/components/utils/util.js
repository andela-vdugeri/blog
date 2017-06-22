'use strict';

import {Http} from '../../config/http';

export default {
  matchUsername(username) {
    return Http.get(`/users/match?username=${username}`);
  },
  matchEmail(emailAddress) {
    return Http.get(`/users/match?emailAddress=${emailAddress}`);
  }
};
