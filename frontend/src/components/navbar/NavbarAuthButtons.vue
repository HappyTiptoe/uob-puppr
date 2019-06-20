<template lang="pug">
.navbar-buttons
  a.button.is-text(@click="$router.push('/register')")
    | Register

  a.button.is-rounded.is-link(@click="$router.push('/login')")
    | Log In
</template>

<script>
export default {
  name: 'NavbarAuthButtons'
}
</script>

<style lang="scss" scoped>
.navbar {
  &-buttons {
    & a:not(:last-child) {
      margin-right: 1rem;
    }
  }
}
</style>
