/* eslint-disable no-param-reassign */
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import sampleStore from '../sampleStore/';

const localVue = createLocalVue();
localVue.use(Vuex);

const render = (Component, options = { localVue }) => {
  if (!options.store) {
    options.store = new Vuex.Store(sampleStore);
  }

  if (!options.mocks) {
    options.mocks = {};
  }
  options.mocks.$t = key => key;
  options.mocks.$tc = key => key;

  return shallowMount(Component, options);
};

export default render;
