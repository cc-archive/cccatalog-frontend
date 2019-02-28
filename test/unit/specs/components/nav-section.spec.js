import NavSection from '@/components/NavSection';
import SET_QUERY from '@/store/mutation-types'
import render from '../../test-utils/render';

describe('NavSection', () => {
  it('should render correct contents', () => {
    const wrapper = render(NavSection);
    expect(wrapper.find('nav').vm).toBeDefined();
  });

  it('commits a mutation when the form is submitted', () => {
    const storeMock = {
      commit: jest.fn()
    }

    const options = {
      propsData: {
        ...props,
        showNavSearch: true,
      },
      mocks: {
        $store: storeMock,
      },
    };

    const wrapper = render(Navsection, options);

    wrapper.find('.hero_search-form').trigger('submit.prevent');

    expect(storeMock.commit).toHaveBeenCalledWith(
        SET_QUERY, 
        { query: { q: 'foo' }, shouldNavigate:true});
  });
});
