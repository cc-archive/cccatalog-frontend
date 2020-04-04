import Vue from 'vue';
import VueRouter from 'vue-router';
import AboutPage from '@/pages/AboutPage';
import HomePage from '@/pages/HomePage';
import BrowsePage from '@/pages/client/BrowsePage';
import PhotoDetailPage from '@/pages/client/PhotoDetailPage';
import FeedbackPage from '@/pages/FeedbackPage';
import CollectionsPage from '@/pages/CollectionsPage';
import CollectionBrowsePage from '@/pages/client/CollectionBrowsePage';
import SearchHelpPage from '@/pages/SearchHelpPage';
import NotFoundPage from '@/pages/NotFoundPage';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/search',
      name: 'browse-page',
      component: BrowsePage,
      meta: {
        requireParams: true,
      },
      props: route => ({ query: route.query.q }),
    },
    {
      path: '/photos/:id',
      name: 'photo-detail-page',
      component: PhotoDetailPage,
      props: true,
    },
    {
      path: '/about',
      name: 'about-page',
      component: AboutPage,
    },
    {
      path: '/search-help',
      name: 'search-help-page',
      component: SearchHelpPage,
    },
    {
      path: '/feedback',
      name: 'feedback-page',
      component: FeedbackPage,
    },
    {
      path: '/collections',
      name: 'collections-page',
      component: CollectionsPage,
    },
    {
      path: '/collections/:provider',
      name: 'collections-browse-page',
      component: CollectionBrowsePage,
      props: true,
    },
    {
      path: '/',
      name: 'home-page',
      component: HomePage,
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFoundPage,
    },
  ],
  scrollBehavior(to) {
    if (to.name === 'browse-page' && to.params.location) {
      // the setTimeout is for the time it takes it get the images
      // Else the page scrolls up after the images are fetched
      // Disabling linting for the reject argument that isn't used
      // eslint-disable-next-line
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ x: 0, y: to.params.location });
        }, 600);
      });
    }
    return { x: 0, y: 0 };
  },
});
// search route guard
router.beforeEach((to, _from, next) => {
  // check to see if route needs any requireParams
  if (to.matched.some(routeObject => routeObject.meta.requireParams)) {
    // check if the query has the q
    if (to.query.q) {
      // if q is present then preceed
      next();
    }
    else {
      next({
        name: 'home-page',
      });
    }
  }
  else {
    next();
  }
});

router.afterEach((to) => {
  if (typeof ga !== 'undefined') {
    ga('set', 'page', to.fullPath);
    ga('send', 'pageview');
  }
});

export default router;
