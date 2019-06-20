<template lang="pug">
.navbar.is-fixed-top.is-spaced
  .container
    //- logo and hamburger (mobile only)
    .navbar-brand
      navbar-logo
      navbar-hamburger(
        :is-active="isNavbarHamburgerActive"
        @toggle="toggleNavbarHamburger"
      )

    //- content that's hidden on mobile
    .navbar-menu(:class="{ 'is-active': isNavbarHamburgerActive }")
      //- left
      .navbar-start
        .navbar-item(v-if="!isUserLoggedIn")
          a.button.is-rounded.is-link(@click="$emit('show-upload-modal')")
            span.icon
              i.fas.fa-plus
            span New Post

      //- right
      .navbar-end
        .is-hidden-touch
          .navbar-item(v-if="!isUserLoggedIn")
            navbar-auth-buttons

          .navbar-item.has-dropdown(
            v-else
            :class="{ 'is-active': isNavbarDropdownActive }"
            @mouseleave="closeNavbarDropdown"
          )
            navbar-dropdown-button(@click="toggleNavbarDropdown")
            navbar-dropdown-menu
</template>

<script>
import NavbarHamburger from '@/components/navbar/NavbarHamburger.vue'
import NavbarLogo from '@/components/navbar/NavbarLogo.vue'
import NavbarAuthButtons from '@/components/navbar/NavbarAuthButtons.vue'
import NavbarDropdownButton from '@/components/navbar/NavbarDropdownButton.vue'
import NavbarDropdownMenu from '@/components/navbar/NavbarDropdownMenu.vue'

export default {
  name: 'Navbar',
  components: {
    NavbarHamburger,
    NavbarLogo,
    NavbarAuthButtons,
    NavbarDropdownButton,
    NavbarDropdownMenu
  },
  data () {
    return {
      isNavbarHamburgerActive: false,
      isNavbarDropdownActive: false
    }
  },
  computed: {
    isUserLoggedIn () {
      return false
    }
  },
  methods: {
    toggleNavbarHamburger () {
      this.isNavbarHamburgerActive = !this.isNavbarHamburgerActive
    },
    toggleNavbarDropdown () {
      this.isNavbarDropdownActive = !this.isNavbarDropdownActive
    },
    closeNavbarDropdown () {
      this.isNavbarDropdownActive = false
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2);

  &-item {
    height: 100%;
  }
}
</style>
