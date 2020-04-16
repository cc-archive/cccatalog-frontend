import {
  SET_FILTER_BTN_INFOR,
} from './mutation-types';

const state = {
  filterTags: [],
};

const mutations = {
  [SET_FILTER_BTN_INFOR](state, { label, display, type }) {
    if (!state.filterTags.length) {
      state.filterTags.push({ label, type, display });
      return;
    }

    if (state.filterTags.length) {
      const newFilterTags = state.filterTags.filter(tag => tag.type === type);

      if (newFilterTags.length > 0) {
        state.filterTags = state.filterTags.filter(tag => tag.type !== type);
      }

      if (newFilterTags.length === 0) {
        state.filterTags.push({ label, type, display });
      }
    }
  },
};

export default {
  state,
  mutations,
};
