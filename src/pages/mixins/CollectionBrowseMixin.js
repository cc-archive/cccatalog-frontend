import { FETCH_COLLECTION_IMAGES } from '@/store/action-types';
import { SET_COLLECTION_QUERY } from '@/store/mutation-types';
import getSourceName from '@/utils/getSourceName';

const CollectionBrowsePage = {
  name: 'collection-browse-page',
  props: ['source'],
  computed: {
    query() {
      return {
        ...this.$store.state.query,
        source: this.$props.source,
      };
    },
    sourceName() {
      return getSourceName(this.$store.state.imageSources, this.$props.source);
    },
  },
  methods: {
    getImages(params) {
      this.$store.dispatch(FETCH_COLLECTION_IMAGES, params);
    },
    onLoadMoreImages(searchParams) {
      this.getImages(searchParams);
    },
    onSearchFormSubmit(searchParams) {
      this.$store.commit(SET_COLLECTION_QUERY, {
        ...searchParams,
        source: this.$props.source,
      });
    },
  },
  created() {
    this.ticking = false;
    if (this.query.source) {
      this.getImages(this.query);
    }
  },
};

export default CollectionBrowsePage;
