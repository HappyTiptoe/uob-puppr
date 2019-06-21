<template lang="pug">
router-link.navbar-item(:to="{ path: '/' }")
  img(:src="logo")
</template>

<script>
export default {
  name: 'NavbarLogo',
  data () {
    return {
      logo: require('@/assets/logos/puppr.png')
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  max-height: 2.5rem;
}
</style>
