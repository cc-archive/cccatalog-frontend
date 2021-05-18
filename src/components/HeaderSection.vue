<template>
  <header>
    <NavSection :key="$route.path" :show-nav-search="showNavSearch" />
    <slot />
  </header>
</template>

<script>
import NavSection from '@/components/NavSection'

export default {
  name: 'HeaderSection',
  components: {
    NavSection,
  },
  props: { showNavSearch: { type: Boolean, default: false } },
}
</script>
