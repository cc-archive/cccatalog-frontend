import SearchGridForm from '@/components/SearchGridForm';
import render from '../../test-utils/render';

describe('SearchGridForm', () => {
  it('should render correct contents', () => {
    const wrapper = render(SearchGridForm);
    expect(wrapper.find({ name: 'Container' })).toBeDefined();
    expect(wrapper.find({ name: 'InputForm' })).toBeDefined();
    expect(wrapper.find({ name: 'Button' })).toBeDefined();
  });
});
