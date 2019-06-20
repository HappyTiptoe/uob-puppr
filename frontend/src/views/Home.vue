<template lang="pug">
  .home
    home-hero
    home-content(@loaded="$emit('loaded')")
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
}
</script>
