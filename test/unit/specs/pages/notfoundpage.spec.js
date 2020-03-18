import NotFoundPage from '@/pages/NotFoundPage';
import render from '../../test-utils/render';

describe('NotFoundPage', () => {
  it('should render correct contents', () => {
    const wrapper = render(NotFoundPage);

    expect(wrapper.find({ name: 'header-section' }).vm).toBeDefined();
    expect(wrapper.find({ name: 'footer-section' }).vm).toBeDefined();
  });
});

