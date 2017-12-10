import './style/app.css';
import './image/icon-search.png';
import './image/icon-link.png';
import './image/icon-twitter.png';
import './image/icon-weekly.png';
import './image/icon-quiz.png';

import Vue from 'Vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import locale from '../node_modules/element-ui/lib/locale/lang/ja'
import '../node_modules/element-ui/lib/theme-chalk/index.css';

import appHeader from './component/appHeader.vue'
import appContent from './component/appContent.vue'
import trackSearch from './component/trackSearch.vue'
import weekly from './component/weekly.vue'
import links from './component/links.vue'

Vue.use(VueRouter);
Vue.use(ElementUI, {locale});

const routes = [
  { path: '/', component: trackSearch },
  { path: '/weekly', component: weekly },
  { path: '/quiz', component: weekly },
  { path: '/links', component: links }
];
const router = new VueRouter({
  routes,
  mode: 'history'
});
router.replace('/');

var vm = new Vue({
  el: '#app',
  router,
  components: {
    'app-header': appHeader,
    'app-content': appContent,
  },
  template: '\
    <div>\
      <app-header></app-header>\
      <app-content></app-content>\
    </div>\
  '
});
