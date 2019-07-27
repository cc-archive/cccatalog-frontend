import store from '@/store/image-source-store';
import {
  FETCH_IMAGE_SOURCES_END,
  SET_FETCH_IMAGES_ERROR,
  FETCH_IMAGE_SOURCES_START,
  SET_IMAGE_SOURCES,
} from '@/store/mutation-types';
import {
  FETCH_IMAGE_SOURCES,
} from '@/store/action-types';


describe('Image Source Store', () => {
  describe('state', () => {
    it('exports default state', () => {
      expect(store.state.imageSources).toHaveLength(0);
      expect(store.state.isFetchingImageSourcesError).toBeFalsy();
      expect(store.state.isFetchingImageSources).toBeFalsy();
    });
  });

  describe('mutations', () => {
    let state = null;

    beforeEach(() => {
      state = {};
    });

    it('FETCH_IMAGE_SOURCES_START sets isFetchingImageSources to true', () => {
      store.mutations[FETCH_IMAGE_SOURCES_START](state);

      expect(state.isFetchingImageSources).toBeTruthy();
    });

    it('FETCH_IMAGE_SOURCES_END sets isFetchingImageSources to false', () => {
      store.mutations[FETCH_IMAGE_SOURCES_END](state);

      expect(state.isFetchingImageSources).toBeFalsy();
    });

    it('SET_FETCH_IMAGES_ERROR sets isFetchingImageSourcesError', () => {
      const params = {
        isFetchingImageSourcesError: true,
      };
      store.mutations[SET_FETCH_IMAGES_ERROR](state, params);

      expect(state.isFetchingImageSourcesError).toBe(params.isFetchingImageSourcesError);
    });

    it('SET_IMAGE_SOURCES sets imageSources', () => {
      const params = {
        imageSources: true,
      };
      store.mutations[SET_IMAGE_SOURCES](state, params);

      expect(state.imageSources).toBe(params.imageSources);
    });
  });

  describe('actions', () => {
    const data = [{ source_name: 'foo' }, { source_name: 'bar' }];
    const imageSourceServiceMock = {
      getSourceStats: jest.fn(() => Promise.resolve({ data })),
    };
    const commit = jest.fn();
    it('FETCH_IMAGE_SOURCES on success', (done) => {
      const action = store.actions(imageSourceServiceMock)[FETCH_IMAGE_SOURCES];
      action({ commit }, {}).then(() => {
        expect(commit).toBeCalledWith(SET_FETCH_IMAGES_ERROR, {
          isFetchingImageSourcesError: false,
        });
        expect(commit).toBeCalledWith(FETCH_IMAGE_SOURCES_START);

        expect(imageSourceServiceMock.getSourceStats).toBeCalled();

        expect(commit).toBeCalledWith(FETCH_IMAGE_SOURCES_END);
        expect(commit).toBeCalledWith(SET_IMAGE_SOURCES, { imageSources: data });
        done();
      });
    });

    it('FETCH_IMAGE_SOURCES on failure', (done) => {
      const failedServiceMock = {
        getSourceStats: jest.fn(() => Promise.reject('error')),
      };
      const action = store.actions(failedServiceMock)[FETCH_IMAGE_SOURCES];
      action({ commit }, {}).catch(() => {
        expect(imageSourceServiceMock.getSourceStats).toBeCalled();
        expect(commit).toBeCalledWith(SET_FETCH_IMAGES_ERROR, {
          isFetchingImageSourcesError: true,
        });
        done();
      });
    });
  });
});
