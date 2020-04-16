import {
  SET_FILTER_BTN_INFOR,
} from './mutation-types';

const state = {
  filterTags: [],
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [SET_FILTER_BTN_INFOR](_state, { label, type }) {
    if (!_state.filterTags.length) {
      _state.filterTags.push({ label, type });
      return;
    }

    if (_state.filterTags.length) {
      const newFilterTags = _state.filterTags.filter(tag => tag.type === type);

      if (newFilterTags.length > 0 && type !== 'licenses') {
        _state.filterTags = _state.filterTags.filter(tag => tag.type !== type);
      }

      if (newFilterTags.length === 0 || type === 'licenses') {
        _state.filterTags.push({ label, type });
      }
    }
  },
};

export default {
  state,
  mutations,
};
