import CopyLicense from '@/components/ImageDetails/CopyLicense';
import { COPY_ATTRIBUTION, EMBED_ATTRIBUTION } from '@/store/action-types';
import { DETAIL_PAGE_EVENTS, SEND_DETAIL_PAGE_EVENT } from '@/store/usage-data-analytics-types';
import render from '../../../test-utils/render';

describe('CopyLicense', () => {
  let options = null;
  let props = null;
  const eventData = {
    content: 'Foo',
  };
  let dispatchMock = null;

  beforeEach(() => {
    dispatchMock = jest.fn();
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
      ccLicenseURL: 'http://license.com',
      fullLicenseName: 'LICENSE',
      attributionHtml: '<div>attribution</div>',
    };
    options = {
      propsData: props,
      mocks: {
        $store: {
          dispatch: dispatchMock,
        },
      },
    };
  });

  it('should contain the correct contents', () => {
    const wrapper = render(CopyLicense, options);
    expect(wrapper.find('.copy-license')).toBeDefined();
  });

  it('should dispatch COPY_ATTRIBUTION', () => {
    const wrapper = render(CopyLicense, options);
    wrapper.vm.onCopyAttribution(eventData);
    expect(dispatchMock).toHaveBeenCalledWith(COPY_ATTRIBUTION, {
      content: eventData.content,
    });
  });

  it('should dispatch EMBED_ATTRIBUTION', () => {
    const wrapper = render(CopyLicense, options);
    wrapper.vm.onEmbedAttribution();
    expect(dispatchMock).toHaveBeenCalledWith(EMBED_ATTRIBUTION);
  });

  it('should dispatch SEND_DETAIL_PAGE_EVENT on copy attribution', () => {
    const wrapper = render(CopyLicense, options);
    wrapper.vm.onCopyAttribution(eventData);
    expect(dispatchMock).toHaveBeenCalledWith(SEND_DETAIL_PAGE_EVENT, {
      eventType: DETAIL_PAGE_EVENTS.ATTRIBUTION_CLICKED,
      resultUuid: props.image.id,
    });
  });

  it('should dispatch SEND_DETAIL_PAGE_EVENT on embed attribution', () => {
    const wrapper = render(CopyLicense, options);
    wrapper.vm.onEmbedAttribution();
    expect(dispatchMock).toHaveBeenCalledWith(SEND_DETAIL_PAGE_EVENT, {
      eventType: DETAIL_PAGE_EVENTS.ATTRIBUTION_CLICKED,
      resultUuid: props.image.id,
    });
  });
});
