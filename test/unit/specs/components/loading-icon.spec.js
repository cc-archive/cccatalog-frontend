import LoadingIcon from '@/components/LoadingIcon';
import render from '../../test-utils/render';

describe('LoadingIcon', () => {
  it('should render correct contents', () => {
    const wrapper = render(LoadingIcon);
    expect(wrapper.find('.lds-ring').vm).toBeDefined();
  });
});
