<template lang="pug">
  .home
    transition(
      v-if="isPageLoading"
      name="pageloader"
    )
      .pageloader.is-white.is-active
        span.title
          | Fetching
          strike  sticks
          |  information...
    home-hero
    home-content(@loaded="hidePageLoader")
</template>

<script>
import HomeHero from '@/components/home/HomeHero.vue'
import HomeContent from '@/components/home/HomeContent.vue'

export default {
  name: 'home',
  components: {
    HomeHero,
    HomeContent
  },
  data () {
    return {
      isPageLoading: true
    }
  },
  methods: {
    hidePageLoader () {
      this.isPageLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.pageloader {
  &-enter {
    opacity: 0;
  }

  &-enter-to, &-leave {
    opacity: 1;
  }

  &-leave-to {
    opacity: 0;
  }

  &-enter-active, &-leave-active {
    transition: all 0.35s ease;
  }
}
</style>
