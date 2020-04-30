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
      socialSharingEnabled: true,
    };

    options = {
      propsData: props,
    };
  });

  it('should render correct contents', () => {
    const wrapper = render(PhotoDetails, options);
    expect(wrapper.find('.photo_image').element).toBeDefined();
    expect(wrapper.find({ name: 'image-info' }).exists()).toBe(true);
    expect(wrapper.find({ name: 'image-attribution' }).exists()).toBe(true);
    expect(wrapper.find({ name: 'image-social-share' }).exists()).toBe(true);
  });

  it('should render social sharing buttons', () => {
    const wrapper = render(PhotoDetails, options);
    expect(wrapper.find({ name: 'image-social-share' }).exists()).toBe(true);
  });

  it('should not render social sharing buttons when social sharing is disabled', () => {
    options.propsData.socialSharingEnabled = false;
    const wrapper = render(PhotoDetails, options);
    expect(wrapper.find({ name: 'image-social-share' }).exists()).toBe(false);
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
    expect(wrapper.find('.photo_breadcrumb').element).toBeDefined();
  });

  it('doesnt render link back to search results if disabled', () => {
    const wrapper = render(PhotoDetails, {
      propsData: {
        ...props,
        shouldShowBreadcrumb: false,
      },
    });
    expect(wrapper.find('.photo_breadcrumb').element).toBeUndefined();
  });

  it('redirects back when clicking on the back to results link', () => {
    const routerMock = {
      push: jest.fn(),
    };
    const routeMock = {
      params: {
        location: window.scrollY,
      },
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
        $route: routeMock,
      },
    };
    const wrapper = render(PhotoDetails, opts);
    const link = wrapper.find('.photo_breadcrumb');
    link.trigger('click');
    expect(routerMock.push).toHaveBeenCalledWith({ name: 'browse-page', query: opts.propsData.query, params: { location: routeMock.params.location } });
  });
});
