<template lang="pug">
.dropdown(
  :class="{ 'is-active': isDropdownActive }"
  @mouseleave="closeDropdown"
)
  .dropdown-trigger(@click="toggleDropdown")
    a.button.is-rounded.is-outlined.is-link
      span {{ dropdownButtonText }}
      span.icon.is-small
        i.fas.fa-angle-down

  .dropdown-menu
    .dropdown-content
      a.dropdown-item(@click="setDropdownButtonText('Newest')")
        span.icon
          i.fas.fa-clock
        span Newest

      a.dropdown-item(@click="setDropdownButtonText('Favorites')")
        span.icon
          i.fas.fa-heart
        span Favorites
</template>

<script>
export default {
  name: 'HomeControlsSort',
  data () {
    return {
      isDropdownActive: false,
      dropdownButtonText: 'Sort by...'
    }
  },
  methods: {
    toggleDropdown () {
      this.isDropdownActive = !this.isDropdownActive
    },
    closeDropdown () {
      this.isDropdownActive = false
    },
    setDropdownButtonText (text) {
      this.dropdownButtonText = text
      this.$emit('select', text.toLowerCase())
      this.closeDropdown()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
