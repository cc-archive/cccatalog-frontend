import SearchGridFilter from '@/components/SearchGridFilter';
import render from '../../test-utils/render';

describe('SearchGridFilter', () => {
    const wrapper = render(SearchGridFilter);
    expect(wrapper.find({ name: 'search-grid-filter' }).element).toBeDefined();
    expect(wrapper.find('.search-filter_providers').element).toBeDefined();
  });
});
