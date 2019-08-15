import Watermark from '@/components/Watermark';
import render from '../../test-utils/render';

describe('Watermark', () => {
  let options = null;
  let props = null;

  beforeEach(() => {
    props = {
      image: {
        id: 0,
        title: 'foo',
        provider: 'flickr',
        url: 'foo.bar',
        thumbnail: 'http://foo.bar',
        foreign_landing_url: 'http://foo.bar',
        license: 'BY',
        license_version: '1.0',
        creator: 'John',
        creator_url: 'http://creator.com',
      },
    };

    options = {
      propsData: props,
    };

    process.env.API_URL = 'https://watermark.test';
  });

  it('should render watermark link', () => {
    const wrapper = render(Watermark, options);
    expect(wrapper.find('.watermark').element).toBeDefined();
    expect(wrapper.find({ name: 'ChoiceField' })).toBeDefined();
    expect(wrapper.find({ name: 'Button' })).toBeDefined();
  });

  it('should generate watermark url', () => {
    const wrapper = render(Watermark, options);
    expect(wrapper.vm.watermarkUrl).toContain(`https://watermark.test/watermark/${props.image.id}`);
  });

  it('should generate watermark url with embed_metadata set to true', () => {
    const wrapper = render(Watermark, options);
    wrapper.setData({ customisations: ['embedMetadata'] });
    expect(wrapper.vm.watermarkUrl).toContain('embed_metadata=true');
  });

  it('should generate watermark url with embed_metadata set to false', () => {
    const wrapper = render(Watermark, options);
    wrapper.setData({ customisations: [] });
    expect(wrapper.vm.watermarkUrl).toContain('embed_metadata=false');
  });

  it('should generate watermark url with watermark set to true', () => {
    const wrapper = render(Watermark, options);
    wrapper.setData({ customisations: ['watermark'] });
    expect(wrapper.vm.watermarkUrl).toContain('watermark=true');
  });

  it('should generate watermark url with watermark set to false', () => {
    const wrapper = render(Watermark, options);
    wrapper.setData({ customisations: [] });
    expect(wrapper.vm.watermarkUrl).toContain('watermark=false');
  });
});
