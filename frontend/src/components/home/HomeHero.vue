<template lang="pug">
section.hero.is-medium.is-link
  .container.has-text-centered
    .hero-body
      img.logo(:src="logo")
</template>

<script>
export default {
  name: 'HomeHero',
  data () {
    return {
      logo: require('@/assets/logos/logov2Inverted.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  padding-top: 5.25rem;
}
.logo {
  height: 250px;
  padding-top: 0rem;
  padding-bottom: 0rem;
}
</style>
