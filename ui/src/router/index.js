import Vue from 'vue';
import VueRouter from 'vue-router';
import TopicBrowser from '../views/TopicBrowser.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'TopicBrowser',
    component: TopicBrowser,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
