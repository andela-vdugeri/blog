'use strict';

import HeaderComponent from '../header/header-component.vue';
import Menu from '../menu/menu.vue';

export default {
  name: 'Blogger',
  components: {
    'sidemenu': Menu,
    'header-component': HeaderComponent,
  },
  data() {
    return {}
  },
}
