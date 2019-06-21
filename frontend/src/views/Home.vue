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
// .notification {
//   min-width: 10rem;
//   font-size: 1.25rem;
//   position: fixed;
//   left: 50%;
//   bottom: 0;
//   z-index: 9999;
//   transform: translate(-50%, -50%);
//   box-shadow: 0 3px 1px -2px rgba(0, 0, 0,  0.2),
//               0 2px 2px  0px rgba(0, 0, 0, 0.14),
//               0 1px 5px  0px rgba(0, 0, 0, 0.12);
// }
</style>
