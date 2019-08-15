/* eslint-disable no-param-reassign */
import Vuex from 'vuex';
import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import sampleStore from '../sampleStore/';

const localVue = createLocalVue();
localVue.use(Vuex);

const render = (Component, options = { localVue }, isShallow = true) => {
  if (!options.store) {
    options.store = new Vuex.Store(sampleStore);
  }

  if (!options.mocks) {
    options.mocks = {};
  }
  options.mocks.$t = key => key;
  options.mocks.$tc = key => key;

  if (isShallow) {
    return shallowMount(Component, options);
  }
  return mount(Component, options);
};

export default render;
