import isEmpty from 'lodash.isempty';
import getParameterByName from '@/utils/getParameterByName';
import prepareSearchQueryParams from '@/utils/prepareSearchQueryParams';
import decodeImageData from '@/utils/decodeImageData';
import {
  FETCH_IMAGES,
  FETCH_IMAGE,
  FETCH_RELATED_IMAGES,
  FETCH_COLLECTION_IMAGES,
} from './action-types';
import {
  FETCH_END_IMAGES,
  FETCH_IMAGES_ERROR,
  FETCH_START_IMAGES,
  SET_FILTER_IS_APPLIED,
  SET_FILTER_IS_VISIBLE,
  SET_IMAGE,
  SET_IMAGE_PAGE,
  SET_IMAGES,
  SET_QUERY,
  SET_COLLECTION_QUERY,
  SET_RELATED_IMAGES,
} from './mutation-types';

const state = (searchParams) => {
  const query = {
    q: getParameterByName('q', searchParams),
    source: getParameterByName('source', searchParams),
    li: getParameterByName('li', searchParams),
    lt: getParameterByName('lt', searchParams),
    searchBy: getParameterByName('searchBy', searchParams),
  };
  return {
    image: {},
    imagesCount: 0,
    imagePage: 1,
    images: [],
    isFetchingImages: false,
    isFetchingImagesError: true,
    isFilterVisible: false,
    isFilterApplied: !!query.source || !!query.li || !!query.lt || !!query.searchBy,
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
    source: params.source,
    searchBy: params.searchBy,
  };
  // the source collection API doesn't support the `q` parameter.
  // so if the `q`, or any other search filter is provided, and
  // since the `source` parameter is passed, we can just call the search API instead
  const searchMethod = allKeysUndefinedExcept(queryParams, 'source') ? imageService.getSourceCollection : imageService.search;
  return searchMethod(prepareSearchQueryParams(params));
};

const actions = ImageService => ({
  [FETCH_IMAGES]({ commit }, params) {
    commit(FETCH_START_IMAGES);
    hideSearchResultsOnNewSearch(commit, params.page);
    const queryParams = prepareSearchQueryParams(params);
    return ImageService.search(queryParams)
      .then(({ data }) => {
        commit(FETCH_END_IMAGES);
        commit(SET_IMAGES,
          { images: data.results,
            imagesCount: data.result_count,
            shouldPersistImages: params.shouldPersistImages,
            page: params.page,
          },
        );
      })
      .catch((error) => {
        commit(FETCH_IMAGES_ERROR);
        throw new Error(error);
      });
  },
  [FETCH_IMAGE]({ commit }, params) {
    commit(FETCH_START_IMAGES);
    commit(SET_IMAGE, { image: {} });
    return ImageService.getImageDetail(params)
      .then(({ data }) => {
        commit(FETCH_END_IMAGES);
        commit(SET_IMAGE, { image: data });
      })
      .catch((error) => {
        commit(FETCH_IMAGES_ERROR);
        throw new Error(error);
      });
  },
  [FETCH_RELATED_IMAGES]({ commit }, params) {
    commit(FETCH_START_IMAGES);
    return ImageService.getRelatedImages(params)
      .then(({ data }) => {
        commit(FETCH_END_IMAGES);
        commit(SET_RELATED_IMAGES,
          { relatedImages: data.results,
            relatedImagesCount: data.result_count,
          },
        );
      })
      .catch((error) => {
        commit(FETCH_IMAGES_ERROR);
        throw new Error(error);
      });
  },
  [FETCH_COLLECTION_IMAGES]({ commit }, params) {
    commit(FETCH_START_IMAGES);
    return fetchCollectionImages(commit, params, ImageService)
      .then(({ data }) => {
        commit(FETCH_END_IMAGES);
        commit(SET_IMAGES,
          { images: data.results,
            imagesCount: data.result_count,
            shouldPersistImages: params.shouldPersistImages,
            page: params.page,
          },
        );
      })
      .catch((error) => {
        commit(FETCH_IMAGES_ERROR);
        throw new Error(error);
      });
  },
});

function setQuery(_state, params, path, routePush) {
  const query = Object.assign({}, _state.query, params.query);
  const isFilterApplied = ['li', 'source', 'lt', 'searchBy']
    .some(key => query[key] && query[key].length > 0);

  _state.isFilterApplied = isFilterApplied;
  _state.query = query;

  if (params.shouldNavigate === true) {
    routePush({ path, query });
  }
}

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = routePush => ({
  [FETCH_START_IMAGES](_state) {
    _state.isFetchingImages = true;
    _state.isFetchingImagesError = false;
  },
  [FETCH_END_IMAGES](_state) {
    _state.isFetchingImages = false;
  },
  [FETCH_IMAGES_ERROR](_state) {
    _state.isFetchingImagesError = true;
    _state.isFetchingImages = false;
  },
  [SET_IMAGE](_state, params) {
    _state.image = decodeImageData(params.image);
  },
  [SET_FILTER_IS_VISIBLE](_state, params) {
    _state.isFilterVisible = params.isFilterVisible;
  },
  [SET_FILTER_IS_APPLIED](_state, params) {
    _state.isFilterApplied = params.isFilterApplied;
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

    _state.imagesCount = params.imagesCount || 0;
    _state.imagePage = params.page || 1;
  },
  [SET_QUERY](_state, params) {
    setQuery(_state, params, '/search', routePush);
  },
  [SET_COLLECTION_QUERY](_state, params) {
    setQuery(_state, params, `/collections/${params.source}`, routePush);
  },
});

export default {
  state,
  actions,
  mutations,
};
