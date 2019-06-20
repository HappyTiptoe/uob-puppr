<template lang="pug">
a.navbar-burger.burger(
  :class="{ 'is-active': isActive }"
  @click="$emit('toggle')"
)
  span
  span
  span
</template>

<script>
export default {
  name: 'NavbarHamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false,
      required: true
    }
  }
}
</script>
