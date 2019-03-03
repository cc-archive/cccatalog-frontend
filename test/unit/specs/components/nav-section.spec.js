import NavSection from '@/components/NavSection';
import render from '../../test-utils/render';

describe('NavSection', () => {

  it('commits a mutation when the form is submitted', () => {
    const storeMock = {
      state: {
        shareLists: {
          length: 2
        }
      },
      mutations: {
        commit: jest.fn()
      }
    }

    const options = {
      propsData: {
        fixedNav: null,
        showNavSearch: true,
      },
      mocks: {
        $store: storeMock,
      },
    };

   const wrapper = render(NavSection, options);

   wrapper.find('.hero_search-form').trigger('submit');

   wrapper.setData({ form: { searchTerm:'foo' } });

    expect(storeMock.mutations.commit).toHaveBeenCalled();
  });

  it('should render correct contents', () => {
    const wrapper = render(NavSection);
    expect(wrapper.find('nav').vm).toBeDefined();
  });
});
