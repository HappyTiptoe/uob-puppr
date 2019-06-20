<template lang="pug">
.home-controls
  .columns.is-multiline.is-mobile
    //- sorting
    .column.is-6-mobile.is-3-tablet.is-flex
      home-controls-sort

    //- search
    .column.is-12-mobile.is-4-tablet.is-offset-1-tablet.is-flex
      home-controls-search(v-model="query")

    //- grid/list toggle
    .column.is-6-mobile.is-3-tablet.is-offset-1-tablet.is-flex
      home-controls-toggle

</template>

<script>
import HomeControlsSort from '@/components/home/HomeControlsSort.vue'
import HomeControlsSearch from '@/components/home/HomeControlsSearch.vue'
import HomeControlsToggle from '@/components/home/HomeControlsToggle.vue'

export default {
  name: 'HomeControls',
  components: {
    HomeControlsSort,
    HomeControlsSearch,
    HomeControlsToggle
  },
  data () {
    return {
      query: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.home-controls {
  margin-top: 2rem;

  @media screen and (max-width: 768px) {
    margin-top: 0
  }
}

.column {
  margin-top: 0.75rem;
  justify-content: center;

  @media screen and (max-width: 768px) {
    &:nth-child(1), &:nth-child(3) {
      margin-top: 0;
      order: 2;
    }

    &:nth-child(2) {
      margin: 2rem 0;
      padding: 0 6.5rem;
      order: 1;
    }
  }
}
</style>
