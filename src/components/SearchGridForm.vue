<template>
  <form role="search" method="post" @submit.prevent="onSubmit" class="search-form padding-normal">
    <div class="is-flex">
      <button class="button toggle-filter" @click.prevent="onToggleSearchGridFilter()">
        <i class="fi-list">
          <img v-if="!isFilterApplied" width="24" height="24" src="../assets/filter_icon_new.svg" />

          <img v-else width="24" height="24" src="../assets/filter_icon_new_applied.svg" />
        </i>
      </button>
      <div class="input input-container margin-left-small">
        <div class="icon-container">
          <i class="icon input input-icons-1">
            <img width="20" height="20" src="../assets/search-icon.svg" />
          </i>
        </div>
        <div class="input-box">
          <input
            :placeholder="searchBoxPlaceholder"
            required="required"
            autofocus="true"
            class="input is-medium search-form_input"
            type="search"
            autocapitalize="none"
            id="searchInput"
            v-model="searchTermsModel"
            ref="search"
            @keyup.enter="onSubmit"
          />
        </div>
      </div>
      <button class="button is-primary" @click.prevent="onSubmit">Search</button>
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
  padding: 1rem;
  height: 3.875rem;
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
  border: none;
  height: 95%;
  padding-left: 0;
  @media (max-width: 49em) {
    width: 100%;
  }
}
@media screen and (max-width: 600px) {
  .search-form_input {
    font-size: 18px;
  }
}
.input-container {
  width: 45%;
  height: 3.875rem;
  padding: 0;
  @media (max-width: 49em) {
    width: 45%;
  }
}
.input-box {
  width: 90%;
  @media (max-width: 49em) {
    width: 70%;
  }
}
.icon-container {
  width: 10%;
  padding-left: 0.5em;
  @media (max-width: 49em) {
    width: 30%;
  }
}
.input-icons-1 {
  color: red;
  border: none;
}
.input-icons {
  width: 100%;
  min-width: 20px;
  padding: 15px;
}
.icon {
  color: green;
  min-width: 100%;
  text-align: center;
  z-index: 10;
  top: 10;
}
</style>