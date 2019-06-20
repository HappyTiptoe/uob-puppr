<template lang="pug">
  .home
    .pageloader.is-danger(
      :class="{ 'is-active': isLoadingPage }"
      ref="pageloader"
    )
      span.title Preparing good boys...
    home-hero
    home-content
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
      isLoadingPage: true
    }
  },
  mounted () {
    this.isLoadingPage = false
  }
}
</script>
