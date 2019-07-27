import CollectionItem from '@/components/CollectionItem';
import render from '../../test-utils/render';

describe('CollectionItem', () => {
  const source = {
    display_name: 'Met',
    source_name: 'met',
    image_count: 10000,
  };
  it('should render correct contents', () => {
    const wrapper = render(CollectionItem, {
      propsData: {
        source,
      },
    });
    expect(wrapper.find('a').element.href).toBe('/collections/met');
  });

  it('should format source count', () => {
    const wrapper = render(CollectionItem, {
      propsData: {
        source,
      },
    });
    expect(wrapper.vm.getSourceImageCount(source.image_count)).toBe('10,000');
  });

  it('should get logo', () => {
    const wrapper = render(CollectionItem, {
      propsData: {
        source,
      },
    });
    expect(wrapper.vm.getSourceLogo(source.source_name)).not.toBe('');
  });

  it('should not get unkown logo', () => {
    const wrapper = render(CollectionItem, {
      propsData: {
        source,
      },
    });
    expect(wrapper.vm.getSourceLogo('unknown')).toBe('');
  });
});
