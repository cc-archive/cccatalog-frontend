import CollectionsPage from '@/pages/CollectionsPage';
import render from '../../test-utils/render';

describe('CollectionsPage', () => {
  const options = {
    mocks: {
      $store: {
        state: {
          imageSources: [
            { source_name: 'met' },
            { source_name: 'flickr' },
          ],
        },
        dispatch: jest.fn(),
      },
    },
  };
  it('should render correct contents', () => {
    const wrapper = render(CollectionsPage, options);
    expect(wrapper.findAll({ name: 'collection-item' }).length).toBe(2);
  });

  it('should get museum sources', () => {
    const wrapper = render(CollectionsPage, options);
    const museumSources = wrapper.vm.museumSources;
    expect(museumSources[0].source_name).toBe('met');
  });

  it('should get museum sources', () => {
    const wrapper = render(CollectionsPage, options);
    const museumSources = wrapper.vm.otherSources;
    expect(museumSources[0].source_name).toBe('flickr');
  });

  it('should get all sources', () => {
    const wrapper = render(CollectionsPage, options);
    const museumSources = wrapper.vm.sources;
    expect(museumSources).toHaveLength(2);
  });
});
