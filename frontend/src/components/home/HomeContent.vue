<template lang="pug">
section.home-content
  .container
    home-controls
    home-gallery(@loaded="$emit('loaded')")
</template>

<script>
import HomeControls from '@/components/home/HomeControls.vue'
import HomeGallery from '@/components/home/HomeGallery.vue'

export default {
  name: 'HomeContent',
  components: {
    HomeControls,
    HomeGallery
  }
}
</script>

<style lang="scss" scoped>

</style>
