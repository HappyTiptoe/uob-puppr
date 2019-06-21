<template lang="pug">
section.home-content
  .container
    home-controls(@select="setSortBy", @input="setSearchQuery")
    home-gallery(
      :key="homeKey"
      :sort-by="sortBy"
      :search-query="searchQuery"
      @loaded="$emit('loaded')"
    )
</template>

<script>
import { mapGetters } from 'vuex'
import HomeControls from '@/components/home/HomeControls.vue'
import HomeGallery from '@/components/home/HomeGallery.vue'

export default {
  name: 'HomeContent',
  components: {
    HomeControls,
    HomeGallery
  },
  data () {
    return {
      homeGalleryKey: 0,
      sortBy: '',
      searchQuery: ''
    }
  },
  computed: {
    ...mapGetters({
      'homeKey': 'modal/getHomeKey'
    })
  },
  methods: {
    setSortBy (t) {
      this.sortBy = t
    },
    setSearchQuery (s) {
      this.searchQuery = s
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
