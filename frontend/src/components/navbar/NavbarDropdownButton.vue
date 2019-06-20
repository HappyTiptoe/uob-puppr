<template lang="pug">
.navbar-link(@click="$emit('click')")
  figure.image.navbar-image.is-32x32
    img.is-rounded(:src="user.imageURL")
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavbarDropdownButton',
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    })
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  &-image {
    & img {
      min-height: 100%;
    }
  }
}
</style>
