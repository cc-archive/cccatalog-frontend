import MasonrySearchGridCell from '@/components/MasonrySearchGridCell';
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
    const wrapper = render(MasonrySearchGridCell, { propsData: props });
    expect(wrapper.find({ name: 'ImageView' })).toBeDefined();
  });

  it('getProviderLogo should return existing logo', () => {
    const wrapper = render(MasonrySearchGridCell, { propsData: props });
    expect(wrapper.vm.providerLogo).not.toBe('');
  });

  it('getProviderLogo should not return non existing logo', () => {
    props.image.provider = 'does not exist';
    const wrapper = render(MasonrySearchGridCell, { propsData: props });
    expect(wrapper.vm.providerLogo).toBe('');
  });

  it('getImageUrl returns image url with https://', () => {
    const wrapper = render(MasonrySearchGridCell, { propsData: props });
    expect(wrapper.vm.imageUrl).toBe('https://foo.bar');
  });

  it('getImageForeignUrl returns foreign image url with https://', () => {
    const wrapper = render(MasonrySearchGridCell, { propsData: props });
    expect(wrapper.vm.foreignUrl).toBe('https://foreign_foo.bar');
  });
});
