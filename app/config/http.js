import Axios from 'axios';
import Config from './config.js';
import {token} from './token.js';

export const Http = Axios.create({
  baseURL: Config.baseUrl,
  headers: {
    Authorization: `Bearer ${token}`
  }
});
