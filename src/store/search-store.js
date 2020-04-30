import isEmpty from 'lodash.isempty';
import findIndex from 'lodash.findindex';
import { queryStringToQueryData } from '@/utils/searchQueryTransform';
import prepareSearchQueryParams from '@/utils/prepareSearchQueryParams';
import decodeImageData from '@/utils/decodeImageData';
import {
  FETCH_IMAGES,
  FETCH_IMAGE,
  FETCH_RELATED_IMAGES,
  FETCH_COLLECTION_IMAGES,
  HANDLE_IMAGE_ERROR,
} from './action-types';
import {
  FETCH_END_IMAGES,
  FETCH_IMAGES_ERROR,
  FETCH_START_IMAGES,
  SET_IMAGE,
  SET_IMAGE_PAGE,
  SET_IMAGES,
  SET_QUERY,
  SET_COLLECTION_QUERY,
  SET_RELATED_IMAGES,
  IMAGE_NOT_FOUND,
  RESET_QUERY,
  HANDLE_NO_IMAGES,
} from './mutation-types';
import { SEND_SEARCH_QUERY_EVENT, SEND_RESULT_CLICKED_EVENT } from './usage-data-analytics-types';

const initialState = (searchParams) => {
  const query = queryStringToQueryData(searchParams);
  return {
    errorMsg: null,
    image: {},
    imagesCount: 0,
    pageCount: 0,
    imagePage: 1,
    images: [],
    isFetchingImages: false,
    isFetchingImagesError: true,
    query,
    relatedImages: [],
    relatedImagesCount: 0,
  };
};

/**
 * hides the search results in case the user is performing a new search.
 * This prevents results from a previous search from showing while the
 * new search results are still loading
 */
const hideSearchResultsOnNewSearch = (commit, pageNumber) => {
  if (!pageNumber) {
    commit(SET_IMAGES, { images: [] });
  }
};

const allKeysUndefinedExcept = (value, keyName) => {
  const keys = Object.keys(value);
  return keys.reduce((matchedUndefinedCriteria, key) => {
    const shouldBeUndefined = key !== keyName;
    const isUndefined = isEmpty(value[key]);

    return matchedUndefinedCriteria && shouldBeUndefined === isUndefined;
  }, true);
};

const fetchCollectionImages = (commit, params, imageService) => {
  hideSearchResultsOnNewSearch(commit, params.page);

  const queryParams = {
    q: params.q,
    provider: params.provider,
    searchBy: params.searchBy,
  };
  // the provider collection API doesn't support the `q` parameter.
  // so if the `q`, or any other search filter is provided, and
  // since the `provider` parameter is passed, we can just call the search API instead
  const searchMethod = allKeysUndefinedExcept(queryParams, 'provider') ? imageService.getProviderCollection : imageService.search;
  const newParams = { ...params, source: params.provider };
  delete newParams.provider;
  return searchMethod(prepareSearchQueryParams(newParams));
};

const actions = ImageService => ({
  [FETCH_IMAGES]({ commit, dispatch, state }, params) {
    // does not send event if user is paginating for more results
    if (!params.page) {
      dispatch(SEND_SEARCH_QUERY_EVENT, { query: params.q, sessionId: state.sessionId });
    }

    commit(FETCH_START_IMAGES);
    hideSearchResultsOnNewSearch(commit, params.page);
    const queryParams = prepareSearchQueryParams(params);
    return ImageService.search(queryParams)
      .then(({ data }) => {
        commit(FETCH_END_IMAGES);
        commit(SET_IMAGES,
          { images: data.results,
            imagesCount: data.result_count,
            pageCount: data.page_count,
            shouldPersistImages: params.shouldPersistImages,
            page: params.page,
          },
        );
        dispatch(HANDLE_NO_IMAGES, data.results);
      })
      .catch((error) => {
        dispatch(HANDLE_IMAGE_ERROR, error);
      });
  },
  [FETCH_IMAGE]({ commit, dispatch, state }, params) {
    dispatch(SEND_RESULT_CLICKED_EVENT, {
      query: state.query.q,
      resultUuid: params.id,
      resultRank: findIndex(state.images, img => img.id === params.id),
      sessionId: state.sessionId,
    });

    commit(FETCH_START_IMAGES);
    commit(SET_IMAGE, { image: {} });
    return ImageService.getImageDetail(params)
      .then(({ data }) => {
        commit(FETCH_END_IMAGES);
        commit(SET_IMAGE, { image: data });
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          commit(IMAGE_NOT_FOUND);
        }
        else {
          dispatch(HANDLE_IMAGE_ERROR, error);
        }
      });
  },
  [FETCH_RELATED_IMAGES]({ commit, dispatch }, params) {
    commit(FETCH_START_IMAGES);
    return ImageService.getRelatedImages(params)
      .then(({ data }) => {
        commit(FETCH_END_IMAGES);
        commit(SET_RELATED_IMAGES,
          { relatedImages: data.results,
            relatedImagesCount: data.result_count,
          },
        );
        dispatch(HANDLE_NO_IMAGES, data.results);
      })
      .catch((error) => {
        dispatch(HANDLE_IMAGE_ERROR, error);
      });
  },
  [FETCH_COLLECTION_IMAGES]({ commit, dispatch }, params) {
    commit(FETCH_START_IMAGES);
    return fetchCollectionImages(commit, params, ImageService)
      .then(({ data }) => {
        commit(FETCH_END_IMAGES);
        commit(SET_IMAGES,
          { images: data.results,
            pageCount: data.page_count,
            imagesCount: data.result_count,
            shouldPersistImages: params.shouldPersistImages,
            page: params.page,
          },
        );
        dispatch(HANDLE_NO_IMAGES, data.results);
      })
      .catch((error) => {
        dispatch(HANDLE_IMAGE_ERROR, error);
      });
  },
  [HANDLE_IMAGE_ERROR]({ commit }, error) {
    if (error.response) {
      if (error.response.status === 500) {
        commit(FETCH_IMAGES_ERROR, { errorMsg: 'There was a problem with our servers' });
      }
      else {
        commit(FETCH_IMAGES_ERROR, { errorMsg: error.response.message });
      }
    }
    else {
      commit(FETCH_IMAGES_ERROR, { errorMsg: error.message });
      throw new Error(error);
    }
  },
  [HANDLE_NO_IMAGES]({ commit }, data) {
    if (!data.length) {
      commit(FETCH_IMAGES_ERROR, { errorMsg: 'No images were found for this query' });
    }
  },
});

function setQuery(_state, params, path, redirect) {
  const query = Object.assign({}, _state.query, params.query);
  _state.query = query;
  _state.images = [];

  if (params.shouldNavigate === true) {
    redirect({ path, query });
  }
}

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = redirect => ({
  [FETCH_START_IMAGES](_state) {
    _state.isFetchingImages = true;
    _state.isFetchingImagesError = false;
  },
  [FETCH_END_IMAGES](_state) {
    _state.isFetchingImages = false;
  },
  [FETCH_IMAGES_ERROR](_state, params) {
    _state.isFetchingImagesError = true;
    _state.isFetchingImages = false;
    _state.errorMsg = params.errorMsg;
  },
  [SET_IMAGE](_state, params) {
    _state.image = decodeImageData(params.image);
  },
  [SET_IMAGE_PAGE](_state, params) {
    _state.imagePage = params.imagePage;
  },
  [SET_RELATED_IMAGES](_state, params) {
    _state.relatedImages = params.relatedImages;
    _state.relatedImagesCount = params.relatedImagesCount;
  },
  [SET_IMAGES](_state, params) {
    let images = null;
    if (params.shouldPersistImages) {
      images = _state.images.concat(params.images);
    }
    else {
      images = params.images;
    }
    _state.images = images.map(image => decodeImageData(image));
    _state.pageCount = params.pageCount;
    _state.imagesCount = params.imagesCount || 0;
    _state.imagePage = params.page || 1;
  },
  [SET_QUERY](_state, params) {
    setQuery(_state, params, '/search', redirect);
  },
  [SET_COLLECTION_QUERY](_state, params) {
    setQuery(_state, params, `/collections/${params.provider}`, redirect);
  },
  [RESET_QUERY](_state) {
    _state.query = initialState('').query;
  },
  [IMAGE_NOT_FOUND]() {
    redirect({ path: '/not-found' }, true);
  },
});

export default {
  state: initialState,
  actions,
  mutations,
};
