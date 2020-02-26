import CollectionItem from '@/components/CollectionItem';
import render from '../../test-utils/render';

describe('CollectionItem', () => {
  const provider = {
    display_name: 'Met',
    source_name: 'met',
    image_count: 10000,
  };
  it('should render correct contents', () => {
    const wrapper = render(CollectionItem, {
      propsData: {
        provider,
      },
    });
    expect(wrapper.find('a').element.href).toBe('/collections/met');
  });

  it('should format provider count', () => {
    const wrapper = render(CollectionItem, {
      propsData: {
        provider,
      },
    });
    expect(wrapper.vm.getProviderImageCount(provider.image_count)).toBe('10,000');
  });

  it('should get logo', () => {
    const wrapper = render(CollectionItem, {
      propsData: {
        provider,
      },
    });
    expect(wrapper.vm.getProviderLogo(provider.source_name)).not.toBe('');
  });

  it('should not get unkown logo', () => {
    const wrapper = render(CollectionItem, {
      propsData: {
        provider,
      },
    });
    expect(wrapper.vm.getProviderLogo('unknown')).toBe('');
  });
});
