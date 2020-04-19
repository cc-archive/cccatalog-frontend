<template>
  <div class="filters padding-vertical-big padding-left-big padding-right-normal">
    <div class="filters-title" @click.prevent="toggleFilterVisibility">
      <span>{{ title }}</span>
      <button class="filter-visibility-toggle is-white padding-vertical-small">
        <i v-if="filtersVisible"
           class="icon angle-up rotImg is-size-5 has-text-grey-light"
           title="toggle filters visibility" />
        <i v-else
           class="icon angle-down is-size-5 has-text-grey-light"
           title="toggle filters visibility" />
      </button>
    </div>
    <template v-if="filtersVisible">
    <div v-for="(item, index) in options" :key="index" class="margin-top-small">
      <label class="checkbox" :for="item.code">
        <div class="is-flex">
        <input type="checkbox"
             class="filter-checkbox margin-top-smaller"
             :id="item.code"
             :key="index"
             :checked="item.checked"
             :disabled="disabled"
             @change="onValueChange" />
        <div v-if="filterType === 'licenses'" class="margin-left-small icons">
        <i v-if="item.code === 'cc0' || 'pdm' || 'by' || 'by-sa' ||
                                 'by-nc' || 'by-nd' || 'by-nc-sa' || 'by-nc-nd'"
                                 :class="item.icon1" />
        <i v-if="item.code === 'by-sa' || 'by-nc' || 'by-nd'
                                 || 'by-nc-sa' || 'by-nc-nd'"
                                 :class="item.icon2" />
        <i v-show="item.code === 'by-nc-sa' || 'by-nc-nd'"
                                 :class="item.icon3" />
        </div>
        <div v-if="filterType === 'licenses'" class="margin-left-bigger name">
        {{ item.name }}
        </div>
        <div v-else class="margin-left-small other-filters" >
        {{ item.name }}
        </div>
        </div>
        </label>
        <img v-if="filterType === 'licenses'" class="question-mark"
                  :src="item.img" @click="modalOpen(index)" />
        <img v-if="item.code == 'tall'"
                                 class="margin-right-small"
                                 :src="item.img" />
        <img v-if="item.code == 'wide'"
                                 class="margin-top-smaller margin-right-smaller"
                                 :src="item.img" />
        <img v-if="item.code == 'square'"
                                 class="margin-right-small"
                                 :src="item.img" />
    </div>
    <transition name="modal" v-if="!isMobile()">
      <section v-if="showModal" class="modal" @click="showModal = false">
      <div class="modal__content padding-top-big padding-bottom-big
                  padding-left-normal padding-right-normal"
                  @click.stop v-for="(item, index) in options"
                  v-if="modalActive(index)" :key="index" >
      <h6> License {{ item.name }} : </h6>
      <div class="is-flex margin-top-small">
      <i :class="item.icon1" />
      <div class="margin-left-normal">
      {{ item.info1 }}
      </div>
      </div>
      <div class="is-flex margin-top-small">
      <i :class="item.icon2" />
      <div class="margin-left-normal">
      {{ item.info2 }}
      </div>
      </div>
      <div class="is-flex margin-top-small">
      <i :class="item.icon3" />
      <div class="margin-left-normal">
      {{ item.info3 }}
      </div>
      </div>
        <div class="modal__link margin-top-bigger" @click="showModal = false">
          Read more about the <a :href="item.link" target="_blank">
          license here
          </a>
        </div>
      </div>
     </section>
  </transition>
    </template>
  </div>
</template>
<script>

export default {
  name: 'filter-check-list',
  props: ['options', 'title', 'filterType', 'disabled'],
  data() {
    return { filtersVisible: false, active: 0, showModal: false };
  },
  methods: {
    onValueChange(e) {
      this.$emit('filterChanged', { code: e.target.id, filterType: this.$props.filterType });
    },
    toggleFilterVisibility() {
      this.filtersVisible = !this.filtersVisible;
    },
    modalOpen(i) {
      this.showModal = true;
      // eslint-disable-next-line
      return this.active = i;
    },
    modalActive(i) {
      return this.active === i;
    },
    isMobile() {
      let check = false;
      // eslint-disable-next-line
      (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; }(navigator.userAgent || navigator.vendor || window.opera));
      return check;
    },
  },
};
</script>

<style lang="scss" scoped>
.filters {
  border-bottom: 2px solid rgb(245, 245, 245);
}
.filters-title {
  font-size: 1.250em;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  cursor: pointer;
}
.filter-visibility-toggle {
  float: right;
  cursor: pointer;
  background: none;
  border: none;
}
label {
  color: #333333;
}
img {
 float: right;
}
.icons {
  width:65px;
}
.question-mark {
  width: 22px;
}
.name {
  width: 155px;
}
i.icon {
  font-size: larger;
  font-weight: bold;
}
.modal {
  width: 23%;
  position: fixed;
  top: 215px;
  left: 30px;
  display: -webkit-box;
  display: flex;
  z-index: 1;
}
@-moz-document url-prefix() {
  .modal {
  min-height: 45%;
  }
}
.modal-enter-active, .modal-leave-active {
  transition: opacity 350ms;
}
.modal-enter, .modal-leave-to {
  opacity: 0;
}
.modal-leave, .modal-enter-to {
  opacity: 1;
}
.modal__content {
  position: relative;
  width: 90%;
  max-width: 260px;
  min-height: 250px;
  background-color: white;
  border: 1px solid #c5d0d1;
  border-radius: 12px;
  box-shadow: 0 0.5rem 1.75rem -0.25rem rgba(61, 83, 88, 0.4);
}
.modal__link:hover::after {
  background-color: #f06532;
}
h6 {
  text-transform: none;
  font-size: 1.1rem;
}
</style>
