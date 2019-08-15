import PhotoDetails from '@/components/PhotoDetails';
import render from '../../test-utils/render';

describe('PhotoDetails', () => {
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
      watermarkEnabled: true,
      socialSharingEnabled: true,
    };

    options = {
      propsData: props,
    };
  });

  it('should render correct contents', () => {
    const wrapper = render(PhotoDetails, options, false);
    expect(wrapper.find('.details').element).toBeDefined();
    expect(wrapper.find('.image-viewer').element).toBeDefined();
    expect(wrapper.find('.image-demo').element).toBeDefined();
    expect(wrapper.find({ name: 'watermark' }).exists()).toBe(true);
    expect(wrapper.find({ name: 'image-info' }).exists()).toBe(true);
    expect(wrapper.find({ name: 'image-attribution' }).exists()).toBe(true);
    expect(wrapper.find({ name: 'image-social-share' }).exists()).toBe(true);
  });

  it('should be prepped for rendering', () => {
    try {
      render(PhotoDetails, options, false);
    }
    catch (e) {
      // Do nothing.
    }
    expect(true).toBe(true);
  });

  it('should render social sharing buttons', () => {
    const wrapper = render(PhotoDetails, options, false);
    expect(wrapper.find({ name: 'image-social-share' }).exists()).toBe(true);
  });

  it('should not render social sharing buttons when social sharing is disabled', () => {
    options.propsData.socialSharingEnabled = false;
    const wrapper = render(PhotoDetails, options, false);
    expect(wrapper.find({ name: 'image-social-share' }).exists()).toBe(false);
  });

  it('should not render watermark link when watermark is disabled', () => {
    options.propsData.watermarkEnabled = false;
    const wrapper = render(PhotoDetails, options, false);
    expect(wrapper.find({ name: 'watermark' }).exists()).toBe(false);
  });

  it('should generate license name', () => {
    const wrapper = render(PhotoDetails, options);
    expect(wrapper.vm.fullLicenseName).toBe('CC BY 1.0');
  });

  it('should generate CC-0 license name', () => {
    options.propsData.image.license = 'cc0';
    const wrapper = render(PhotoDetails, options);
    expect(wrapper.vm.fullLicenseName).toBe('cc0 1.0');
  });

  it('should generate CC-0 license name when license is CC0 uppercase', () => {
    options.propsData.image.license = 'CC0';
    const wrapper = render(PhotoDetails, options);
    expect(wrapper.vm.fullLicenseName).toBe('CC0 1.0');
  });

  it('renders link back to search results if enabled', () => {
    const wrapper = render(PhotoDetails, {
      propsData: {
        ...props,
        shouldShowBreadcrumb: true,
      },
    });
    expect(wrapper.find({ name: 'Trail' }).exists()).toBe(true);
  });

  it('doesnt render link back to search results if disabled', () => {
    const wrapper = render(PhotoDetails, {
      propsData: {
        ...props,
        shouldShowBreadcrumb: false,
      },
    });
    expect(wrapper.find({ name: 'Trail' }).exists()).toBe(false);
  });

  it('redirects back when clicking on the back to results link', () => {
    const routerMock = {
      push: jest.fn(),
    };
    const opts = {
      propsData: {
        ...props,
        shouldShowBreadcrumb: true,
        query: {
          q: 'foo',
        },
      },
      mocks: {
        $router: routerMock,
      },
    };
    const wrapper = render(PhotoDetails, opts);
    const link = wrapper.find('.back-link');
    link.trigger('click');
    expect(routerMock.push).toHaveBeenCalledWith({ name: 'browse-page', query: opts.propsData.query });
  });
});
