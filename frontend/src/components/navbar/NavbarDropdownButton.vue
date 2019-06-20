<template lang="pug">
.navbar-link(@click="$emit('click')")
  figure.image.navbar-image.is-32x32
    img.is-rounded(src="https://picsum.photos/200/200")
</template>

<script>
export default {
  name: 'NavbarDropdownButton'
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
