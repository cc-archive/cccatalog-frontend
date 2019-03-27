import PhotoDetailPage from '@/pages/PhotoDetailPage';
import render from '../../test-utils/render';

describe('PhotoDetailPage', () => {
  it('should render correct contents', () => {
    const wrapper = render(PhotoDetailPage);

    expect(wrapper.find({ name: 'header-section' }).vm).toBeDefined();
    expect(wrapper.find({ name: 'footer-section' }).vm).toBeDefined();
    expect(wrapper.find('.photo-detail-page').element).toBeDefined();
  });
});