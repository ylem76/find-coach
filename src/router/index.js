import { createRouter, createWebHistory } from 'vue-router';

import CoachDetail from '../pages/coaches/CoachDetail.vue';
import CoachesList from '../pages/coaches/CoachesList.vue';
import CoachRegistration from '../pages/coaches/CoachRegistration.vue';
import ContactCoach from '../pages/requests/ContactCoach.vue';
import RequestsReveived from '../pages/requests/RequestsReveived.vue';
import NotFound from '../pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [
        { path: 'contact', component: ContactCoach } // coaches/c1/contact path에 슬래쉬 안 붙음!
      ]
    },
    { path: '/register', component: CoachRegistration },
    { path: '/requests', component: RequestsReveived },
    { path: '/:notFound(.*)', component: NotFound } // error page
  ]
});

export default router;
