// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack-base.conf with an alias.

import Vue from 'vue';
import ApiService from '@/api/ApiService';
import App from './App';

import i18n from './i18n';
import store from './store';
import GoogleAnalytics from './analytics/GoogleAnalytics';

function createApp(router, __INITIAL_STATE__) {
  Vue.config.productionTip = false;

  ApiService.init();
  const analytics = GoogleAnalytics();
  analytics.anonymizeIpAddress();
  analytics.setTransportBeacon();

  const appStore = store(analytics, router);

  // prime the store with server-initialized state.
  // the state is determined during SSR and inlined in the page markup.
  // doesn't replace query values from __INITIAL_STATE__
  // query values are initialized from URL inside store (see search store state definition)
  if (__INITIAL_STATE__) {
    const { query, ...initialState } = __INITIAL_STATE__;
    initialState.query = appStore.state.query;
    appStore.replaceState(initialState);
  }

  const app = new Vue({
    el: '#app',
    store: appStore,
    i18n,
    router,
    render: h => h(App),
  });

  return { app, store: appStore, router };
}


export default createApp;
