<template>
  <form role="search" method="post" @submit.prevent="onSubmit" class="search-form padding-normal">
    <div class="is-flex is-hidden-touch">
      <button
        class="button toggle-filter padding-normal"
        @click.prevent="onToggleSearchGridFilter()"
      >
        <img v-if="!isFilterApplied" width="24" src="../assets/filter_icon_new.svg" />
        <img v-else width="24" src="../assets/filter_icon_new_applied.svg" />
      </button>
      <div class="input-container input margin-left-small">
        <div class="icon-container">
          <i class="search-icon">
            <img width="20" src="../assets/search-icon_black.svg" />
          </i>
        </div>
        <div class="input-box">
          <input
            id="searchInput"
            required="required"
            class="input is-medium search-form_input"
            type="search"
            ref="search"
            :placeholder="searchBoxPlaceholder"
            v-model="searchTermsModel"
            @keyup.enter="onSubmit"
          />
        </div>
      </div>
      <button class="button is-primary" @click.prevent="onSubmit">Search</button>
    </div>
    <div class="is-flex is-hidden-desktop">
      <button
        class="button small toggle-filter-small padding-small"
        @click.prevent="onToggleSearchGridFilter()"
      >
        <img v-if="!isFilterApplied" width="64" src="../assets/filter_icon_new.svg" />
        <img v-else width="64" src="../assets/filter_icon_new_applied.svg" />
      </button>
      <div class="input-container-small input margin-left-small">
        <div class="icon-container">
          <i class="search-icon">
            <img width="64" src="../assets/search-icon_black.svg" />
          </i>
        </div>
        <div class="input-box">
          <input
            id="searchInput"
            required="required"
            class="input search-form_input"
            type="search"
            ref="search"
            :placeholder="searchBoxPlaceholder"
            v-model="searchTermsModel"
            @keyup.enter="onSubmit"
          />
        </div>
      </div>
      <button class="button is-primary small" @click.prevent="onSubmit">Search</button>
    </div>
  </form>
</template>

<script>
import SearchGridFilter from "@/components/SearchGridFilter";
import { SET_FILTER_IS_VISIBLE } from "@/store/mutation-types";

export default {
  name: "search-grid-form",
  props: {
    searchBoxPlaceholder: {
      default: "Search all images"
    }
  },
  data: () => ({ searchTermsModel: null }),
  components: {
    SearchGridFilter
  },
  computed: {
    searchTerms() {
      return this.$store.state.query.q;
    },
    isFilterVisible() {
      return this.$store.state.isFilterVisible;
    },
    isFilterApplied() {
      return this.$store.state.isFilterApplied;
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      if (this.searchTermsModel) {
        this.$emit("onSearchFormSubmit", {
          query: { q: this.searchTermsModel },
          shouldNavigate: true
        });
        this.$refs.search.blur();
      }
    },
    onToggleSearchGridFilter() {
      this.$store.commit(SET_FILTER_IS_VISIBLE, {
        isFilterVisible: !this.isFilterVisible
      });
    },
    onSearchFilterChanged(query) {
      this.$emit("onSearchFormSubmit", query);
    },
    setFormInput() {
      this.searchTermsModel = this.searchTerms;
    }
  },
  watch: {
    searchTerms: function handler() {
      this.setFormInput();
    }
  },
  mounted: function handler() {
    this.setFormInput();
  }
};
</script>

<style lang="scss" scoped>
.toggle-filter {
  height: 3.875rem;
}

.toggle-filter-small {
  width: 4rem;
  padding-top: 0.35rem !important;

  img {
    max-width: 1.5rem;
  }
}

.search-form {
  width: 100%;
  top: 0;
  position: sticky;
  background-color: #e9ebee;
  z-index: 10;
}

.search-form_input {
  width: 100%;
  height: 100%;
  border: none;
  padding: 0;
  @media (max-width: 48em) {
    width: 100%;
  }
}
.input-box {
  height: 95%;
  display: flex;
  width: 95%;
  @media (max-width: 49em) {
    width: 85%;
    height: 100%;
  }
}
.input-container-small {
  width: 45%;
  float: left;
  @media (max-width: 49em) {
    width: 100%;
    height: 2.5em;
  }
}
.input-container {
  width: 45%;
  height: 3.875rem;
  float: left;
  @media (max-width: 49em) {
    width: 100%;
    height: 2.5em;
  }
}
.icon-container {
  height: 95%;
  display: flex;
  align-items: center;
  margin-right: 1em;
  z-index: 10;
  @media (max-width: 49em) {
    margin-right: 1em;
  }
}
.search-icon {
  z-index: 10;
  min-width: 30%;
  img {
    min-width: 30%;
    max-width: 1.5rem;
    @media (max-width: 49em) {
      width: 14px;
    }
  }
}
</style>
