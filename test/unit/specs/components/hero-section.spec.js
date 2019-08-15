import HeroSection from '@/components/HeroSection';
import render from '../../test-utils/render';

describe('HeroSection', () => {
  it('should render correct contents', () => {
    const wrapper = render(HeroSection);
    expect(wrapper.find({ name: 'header-section' }).vm).toBeDefined();
    expect(wrapper.find('div.hero').element).toBeDefined();
  });
});
