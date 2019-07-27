import Vue from 'vue';
import Vuex from 'vuex';
import redirectTo from '@/router/redirectTo';
import ImageSourceService from '@/api/ImageSourceService';
import ImageService from '@/api/ImageService';
import BugReportService from '@/api/BugReportService';
import SearchStore from './search-store';
import ImageSourceStore from './image-source-store';
import AttributionStore from './attribution-store';
import BugReportStore from './bug-report-store';
import SocialMediaStore from './social-store';

Vue.use(Vuex);

const queryParams = !(typeof window === 'undefined') ? window.location.search : '';

const store = (GoogleAnalytics, router) => (new Vuex.Store({
  actions: Object.assign(
    SearchStore.actions(ImageService),
    ImageSourceStore.actions(ImageSourceService),
    AttributionStore.actions(GoogleAnalytics),
    BugReportStore.actions(BugReportService),
    SocialMediaStore.actions(GoogleAnalytics),
  ),
  state: Object.assign(
    SearchStore.state(queryParams),
    ImageSourceStore.state,
    BugReportStore.state,
  ),
  mutations: Object.assign(
    SearchStore.mutations(redirectTo(router)),
    ImageSourceStore.mutations,
    BugReportStore.mutations,
  ),
}));

export default store;
