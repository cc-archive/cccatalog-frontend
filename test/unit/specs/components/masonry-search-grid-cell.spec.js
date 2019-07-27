import MasonrySearchGridCell from '@/components/MasonrySearchGridCell';
import render from '../../test-utils/render';

describe('SearchGridCell', () => {
  const props = {
    image: {
      id: 0,
      title: 'foo',
      source: 'flickr',
      url: 'foo.bar',
      thumbnail: 'foo.bar',
      foreign_landing_url: 'foreign_foo.bar',
    },
  };

  it('should render correct contents', () => {
    const wrapper = render(MasonrySearchGridCell, { propsData: props });
    expect(wrapper.find('div').find('figure').element).toBeDefined();
  });

  it('getSourceLogo should return existing logo', () => {
    const wrapper = render(MasonrySearchGridCell, { propsData: props });
    expect(wrapper.vm.getSourceLogo('flickr')).not.toBe('');
  });

  it('getSourceLogo should not return non existing logo', () => {
    const wrapper = render(MasonrySearchGridCell, { propsData: props });
    expect(wrapper.vm.getSourceLogo('does not exist')).toBe('');
  });

  it('getImageUrl returns image url with https://', () => {
    const wrapper = render(MasonrySearchGridCell, { propsData: props });
    expect(wrapper.vm.getImageUrl(props.image)).toBe('https://foo.bar');
  });

  it('getImageForeignUrl returns foreign image url with https://', () => {
    const wrapper = render(MasonrySearchGridCell, { propsData: props });
    expect(wrapper.vm.getImageForeignUrl(props.image)).toBe('https://foreign_foo.bar');
  });
});
