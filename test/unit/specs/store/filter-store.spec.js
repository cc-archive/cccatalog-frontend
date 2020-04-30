import store, { filterData } from '@/store/filter-store';
import { TOGGLE_FILTER } from '@/store/action-types';
import { SET_FILTER, SET_PROVIDERS_FILTERS, CLEAR_FILTERS, SET_FILTER_IS_VISIBLE } from '@/store/mutation-types';

describe('Filter Store', () => {
  describe('state', () => {
    it('state contains licenses', () => {
      const defaultState = store.state('');

      expect(defaultState.filters.licenses).toEqual(filterData.licenses);
    });

    it('state contains license types', () => {
      const defaultState = store.state('');

      expect(defaultState.filters.licenseTypes).toEqual(filterData.licenseTypes);
    });

    it('state contains image types', () => {
      const defaultState = store.state('');

      expect(defaultState.filters.categories).toEqual(filterData.categories);
    });

    it('state contains extensions', () => {
      const defaultState = store.state('');

      expect(defaultState.filters.extensions).toEqual(filterData.extensions);
    });

    it('state contains empty providers list', () => {
      const defaultState = store.state('');

      expect(defaultState.filters.providers).toEqual([]);
    });

    it('state contains search by author', () => {
      const defaultState = store.state('');

      expect(defaultState.filters.searchBy.author).toEqual(filterData.searchBy.author);
    });

    it('gets query from search params', () => {
      const state = store.state('?q=landscapes&source=met&license=by&license_type=commercial&searchBy=creator');
      expect(state.filters.providers.find(x => x.code === 'met').checked).toBeTruthy();
      expect(state.filters.licenses.find(x => x.code === 'by').checked).toBeTruthy();
      expect(state.filters.licenseTypes.find(x => x.code === 'commercial').checked).toBeTruthy();
      expect(state.filters.searchBy.creator).toBeTruthy();
    });

    it('state has filter visible', () => {
      const defaultState = store.state('');

      expect(defaultState.isFilterVisible).toBeTruthy();
    });

    it('state has isFilterApplied default as false', () => {
      const defaultState = store.state('');

      expect(defaultState.isFilterApplied).toBeFalsy();
    });

    it('isFilterApplied is set to true when provider filter is set', () => {
      const state = store.state('?q=landscapes&source=met&license=by&license_type=');
      expect(state.isFilterApplied).toBeTruthy();
    });

    it('isFilterApplied is set to true when searchBy filter is set', () => {
      const state = store.state('?q=landscapes&searchBy=creator');
      expect(state.isFilterApplied).toBeTruthy();
    });

    it('isFilterApplied is set to true when license type filter is set', () => {
      const state = store.state('?q=landscapes&license_type=commercial');
      expect(state.isFilterApplied).toBeTruthy();
    });

    it('isFilterApplied is set to true when license filter is set', () => {
      const state = store.state('?q=landscapes&license=by');
      expect(state.isFilterApplied).toBeTruthy();
    });

    it('isFilterApplied is set to true when categories filter is set', () => {
      const state = store.state('?q=landscapes&categories=photograph');
      expect(state.isFilterApplied).toBeTruthy();
    });

    it('isFilterApplied is set to true when size filter is set', () => {
      const state = store.state('?q=landscapes&size=large');
      expect(state.isFilterApplied).toBeTruthy();
    });

    it('isFilterApplied is set to true when aspect ratio filter is set', () => {
      const state = store.state('?q=landscapes&aspect_ratio=tall');
      expect(state.isFilterApplied).toBeTruthy();
    });

    it('isFilterApplied is set to false when no filter is set', () => {
      const state = store.state('?q=landscapes');
      expect(state.isFilterApplied).toBeFalsy();
    });

    it('isFilterVisible should be false when innerWidth property is undefined', () => {
      window.innerWidth = undefined;
      const state = store.state('');
      expect(state.isFilterVisible).toBeFalsy();
    });

    it('isFilterVisible should be true when window width is over 800', () => {
      window.innerWidth = 850;
      const state = store.state('');
      expect(state.isFilterVisible).toBeTruthy();
    });

    it('isFilterVisible should be false when window width is less then 800', () => {
      window.innerWidth = 500;
      const state = store.state('');
      expect(state.isFilterVisible).toBeFalsy();
    });
  });

  describe('mutations', () => {
    let state = null;
    let routePushMock = null;
    let mutations = null;

    beforeEach(() => {
      state = {
        query: { q: 'foo' },
        ...store.state(''),
      };
      routePushMock = jest.fn();
      mutations = store.mutations(routePushMock);
    });

    it('SET_FILTER updates license state', () => {
      mutations[SET_FILTER](state, { filterType: 'licenses', codeIdx: 0 });

      expect(state.filters.licenses[0].checked).toBeTruthy();
      expect(state.query).toEqual({
        q: 'foo',
        license: state.filters.licenses[0].code,
        extension: '',
        categories: '',
        license_type: '',
        source: '',
        searchBy: '',
        aspect_ratio: '',
        size: '',
      });
    });

    it('SET_FILTER updates license type state', () => {
      mutations[SET_FILTER](state, { filterType: 'licenseTypes', codeIdx: 0 });

      expect(state.filters.licenseTypes[0].checked).toBeTruthy();
      expect(state.query).toEqual({
        q: 'foo',
        license: '',
        extension: '',
        categories: '',
        license_type: state.filters.licenseTypes[0].code,
        source: '',
        searchBy: '',
        aspect_ratio: '',
        size: '',
      });
    });

    it('SET_FILTER updates extensions state', () => {
      mutations[SET_FILTER](state, { filterType: 'extensions', codeIdx: 0 });

      expect(state.filters.extensions[0].checked).toBeTruthy();
      expect(state.query).toEqual({
        q: 'foo',
        license: '',
        extension: state.filters.extensions[0].code,
        categories: '',
        license_type: '',
        source: '',
        searchBy: '',
        aspect_ratio: '',
        size: '',
      });
    });

    it('SET_FILTER updates image types state', () => {
      mutations[SET_FILTER](state, { filterType: 'categories', codeIdx: 0 });

      expect(state.filters.categories[0].checked).toBeTruthy();
      expect(state.query).toEqual({
        q: 'foo',
        license: '',
        extension: '',
        categories: state.filters.categories[0].code,
        license_type: '',
        source: '',
        searchBy: '',
        aspect_ratio: '',
        size: '',
      });
    });

    it('SET_FILTER updates search by creator', () => {
      mutations[SET_FILTER](state, { filterType: 'searchBy' });

      expect(state.filters.searchBy.creator).toBeTruthy();
      expect(state.query).toEqual({
        q: 'foo',
        license: '',
        extension: '',
        categories: '',
        license_type: '',
        source: '',
        searchBy: 'creator',
        aspect_ratio: '',
        size: '',
      });
    });

    it('SET_FILTER updates aspect ratio', () => {
      mutations[SET_FILTER](state, { filterType: 'aspectRatios', codeIdx: 0 });

      expect(state.filters.aspectRatios[0].checked).toBeTruthy();
      expect(state.query).toEqual({
        q: 'foo',
        license: '',
        extension: '',
        categories: '',
        license_type: '',
        source: '',
        searchBy: '',
        aspect_ratio: state.filters.aspectRatios[0].code,
        size: '',
      });
    });

    it('SET_FILTER updates size', () => {
      mutations[SET_FILTER](state, { filterType: 'sizes', codeIdx: 0 });

      expect(state.filters.sizes[0].checked).toBeTruthy();
      expect(state.query).toEqual({
        q: 'foo',
        license: '',
        extension: '',
        categories: '',
        license_type: '',
        source: '',
        searchBy: '',
        aspect_ratio: '',
        size: state.filters.sizes[0].code,
      });
    });

    it('SET_FILTER redirects to search path and with query object', () => {
      mutations[SET_FILTER](state, { filterType: 'categories', codeIdx: 0, shouldNavigate: true });

      expect(routePushMock).toHaveBeenCalledWith({
        path: '/search',
        query: state.query,
      });
    });

    it('SET_FILTER redirects to collections path and with query object', () => {
      mutations[SET_FILTER](state, {
        filterType: 'categories',
        codeIdx: 0,
        isCollectionsPage: true,
        provider: 'met',
        shouldNavigate: true,
      });

      expect(routePushMock).toHaveBeenCalledWith({
        path: '/collections/met',
        query: state.query,
      });
    });

    it('SET_FILTER updates isFilterApplied with provider', () => {
      state.filters.providers = [{ code: 'met', checked: false }];
      mutations[SET_FILTER](state, { filterType: 'providers', codeIdx: 0 });

      expect(state.isFilterApplied).toBeTruthy();
    });

    it('SET_FILTER updates isFilterApplied with license type', () => {
      mutations[SET_FILTER](state, { filterType: 'licenseTypes', codeIdx: 0 });

      expect(state.isFilterApplied).toBeTruthy();
    });

    it('SET_FILTER updates isFilterApplied with searchBy', () => {
      mutations[SET_FILTER](state, { filterType: 'searchBy' });

      expect(state.isFilterApplied).toBeTruthy();
    });


    it('SET_PROVIDERS_FILTERS merges with existing provider filters', () => {
      const existingProviderFilters = [
        { code: 'met', checked: true },
      ];

      const providers = [
        { source_name: 'met', display_name: 'Metropolitan' },
        { source_name: 'flickr', display_name: 'Flickr' },
      ];

      state.filters.providers = existingProviderFilters;

      mutations[SET_PROVIDERS_FILTERS](state, { imageProviders: providers });

      expect(state.filters.providers).toEqual([
        { code: 'met', name: 'Metropolitan', checked: true },
        { code: 'flickr', name: 'Flickr', checked: false },
      ]);
    });

    it('CLEAR_FILTERS resets filters to initial state', () => {
      mutations[CLEAR_FILTERS](state, { shouldNavigate: false });

      expect(state.filters).toEqual(store.state('').filters);
    });

    it('CLEAR_FILTERS sets providers filters checked to false', () => {
      state.filters.providers = [
        { code: 'met', name: 'Metropolitan', checked: true },
        { code: 'flickr', name: 'Flickr', checked: false },
      ];

      mutations[CLEAR_FILTERS](state, { shouldNavigate: false });

      expect(state.filters.providers).toEqual([
        { code: 'met', name: 'Metropolitan', checked: false },
        { code: 'flickr', name: 'Flickr', checked: false },
      ]);
    });

    it('SET_FILTER_IS_VISIBLE updates state', () => {
      const params = { isFilterVisible: 'bar' };
      mutations[SET_FILTER_IS_VISIBLE](state, params);

      expect(state.isFilterVisible).toBe(params.isFilterVisible);
    });
  });

  describe('actions', () => {
    let state = null;
    let commitMock = null;
    let actions = null;

    beforeEach(() => {
      state = {
        query: { q: 'foo' },
        ...store.state(''),
      };
      commitMock = jest.fn();
      actions = store.actions;
    });

    it('TOGGLE_FILTER commits SET_FILTER with filter index', () => {
      state.filters.providers = [
        { code: 'met', name: 'Metropolitan', checked: true },
        { code: 'flickr', name: 'Flickr', checked: false },
      ];

      const params = { filterType: 'providers', code: 'flickr' };

      actions[TOGGLE_FILTER]({ commit: commitMock, state }, params);

      expect(commitMock).toHaveBeenCalledWith(SET_FILTER, {
        codeIdx: 1,
        ...params,
      });
    });
  });
});

