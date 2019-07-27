import SearchStore from '@/store/search-store';
import ImageSourceStore from '@/store/image-source-store';

const store = {
  state: Object.assign(
    SearchStore.state('?q=nature'),
    ImageSourceStore.state,
  ),
};

export default store;
