import SearchGridFilter from '@/components/SearchGridFilter';
import render from '../../test-utils/render';

describe('SearchGridFilter', () => {
  it('should render correct contents', () => {
    const wrapper = render(SearchGridFilter);
    expect(wrapper.find('.search-filter_providers').element).toBeDefined();
    expect(wrapper.find('.search-filter_licenses').element).toBeDefined();
    expect(wrapper.find('.search-filter_license-types').element).toBeDefined();
    expect(wrapper.find('.search-filter_search-by').element).toBeDefined();
    expect(wrapper.find({ name: 'search-grid-filter' }).element).toBeDefined();
  });
});