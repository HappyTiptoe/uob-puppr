<template lang="pug">
router-link.navbar-item(:to="{ path: '/' }")
  img(:src="logo")
</template>

<script>
export default {
  name: 'NavbarLogo',
  data () {
    return {
      logo: require('@/assets/logo.png')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
