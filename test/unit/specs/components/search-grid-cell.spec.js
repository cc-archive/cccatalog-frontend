import SearchGridCell from '@/components/SearchGridCell';
import render from '../../test-utils/render';

describe('SearchGridCell', () => {
  const props = {
    image: {
      id: 0,
      title: 'foo',
      provider: 'flickr',
      url: 'foo.bar',
      thumbnail: 'foo.bar',
      foreign_landing_url: 'foreign_foo.bar',
    },
  };

  it('should render correct contents', () => {
    const wrapper = render(SearchGridCell, { propsData: props });
    expect(wrapper.find('div').find('figure').element).toBeDefined();
  });

  xit('getProviderLogo should return existing logo', () => {
    const wrapper = render(SearchGridCell, { propsData: props });
    expect(wrapper.vm.getProviderLogo('flickr')).not.toBe('');
  });

  xit('getProviderLogo should not return non existing logo', () => {
    const wrapper = render(SearchGridCell, { propsData: props });
    expect(wrapper.vm.getProviderLogo('does not exist')).toBe('');
  });

  it('getImageUrl returns image url with https://', () => {
    const wrapper = render(SearchGridCell, { propsData: props });
    expect(wrapper.vm.getImageUrl(props.image)).toBe('https://foo.bar');
  });

  it('getImageForeignUrl returns foreign image url with https://', () => {
    const wrapper = render(SearchGridCell, { propsData: props });
    expect(wrapper.vm.getImageForeignUrl(props.image)).toBe('https://foreign_foo.bar');
  });

  it('links to the details page', () => {
    const routerMock = {
      push: jest.fn(),
      params: {
        location: window.scrollY,
      },
    };
    const wrapper = render(SearchGridCell, {
      propsData: props,
      mocks: { $router: routerMock },
    });
    const link = wrapper.find('.search-grid_image-ctr');
    link.trigger('click');
    expect(routerMock.push).toHaveBeenCalledWith({
      name: 'photo-detail-page',
      params: { id: 0, location: routerMock.params.location },
    });
  });
});
