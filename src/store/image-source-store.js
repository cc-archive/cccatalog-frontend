import {
  FETCH_IMAGE_SOURCES,
} from './action-types';

import {
  FETCH_IMAGE_SOURCES_END,
  SET_FETCH_IMAGES_ERROR,
  FETCH_IMAGE_SOURCES_START,
  SET_IMAGE_SOURCES,
} from './mutation-types';

const state = {
  imageSources: [],
  isFetchingImageSourcesError: false,
  isFetchingImageSources: false,
};

const actions = ImageSourceService => ({
  [FETCH_IMAGE_SOURCES]({ commit }, params) {
    commit(SET_FETCH_IMAGES_ERROR, { isFetchingImageSourcesError: false });
    commit(FETCH_IMAGE_SOURCES_START);
    return ImageSourceService.getSourceStats(params)
      .then(({ data }) => {
        const sortedSources = data.sort((a, b) => {
          const nameA = a.source_name.toUpperCase();
          const nameB = b.source_name.toUpperCase();

          if (nameA < nameB) {
            return -1;
          }

          if (nameA > nameB) {
            return 1;
          }

          return 0;
        });
        commit(FETCH_IMAGE_SOURCES_END);
        commit(SET_IMAGE_SOURCES,
          { imageSources: sortedSources },
        );
      })
      .catch((error) => {
        commit(SET_FETCH_IMAGES_ERROR, { isFetchingImageSourcesError: true });
        throw new Error(error);
      });
  },
});

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [FETCH_IMAGE_SOURCES_START](_state) {
    _state.isFetchingImageSources = true;
  },
  [FETCH_IMAGE_SOURCES_END](_state) {
    _state.isFetchingImageSources = false;
  },
  [SET_FETCH_IMAGES_ERROR](_state, params) {
    _state.isFetchingImageSourcesError = params.isFetchingImageSourcesError;
  },
  [SET_IMAGE_SOURCES](_state, params) {
    _state.imageSources = params.imageSources;
  },
};

export default {
  state,
  actions,
  mutations,
};
