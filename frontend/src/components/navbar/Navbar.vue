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
        .navbar-item(v-if="isUserLoggedIn")
          a.button.is-rounded.is-link(@click="showPostUploadModal")
            span.icon
              i.fas.fa-plus
            span New Post

      //- right
      .navbar-end
        template(v-if="!isUserLoggedIn")
          .navbar-item
            a.button.is-rounded.is-link.is-outlined(@click="navToRegister")
              | Register

          .navbar-item
            a.button.is-rounded.is-link(@click="navToLogin")
              | Log In

        //- dropdown menu for desktop
        .is-hidden-touch
          .navbar-item.has-dropdown(
            v-if="isUserLoggedIn"
            :class="{ 'is-active': isNavbarDropdownActive }"
            @mouseleave="closeNavbarDropdown"
          )
            navbar-dropdown-button(@click="toggleNavbarDropdown")
            navbar-dropdown-menu(@close="closeNavbarDropdown", @logout="onLogout")

        //- buttons for mobile
        .is-hidden-desktop
          template(v-if="isUserLoggedIn")
            hr.navbar-divider
            .navbar-item
              a.button.is-rounded.is-link.is-outlined(@click="navToAccountMobile")
                span.icon
                  i.fas.fa-user
                span Account

            .navbar-item
              a.button.is-rounded.is-danger.is-outlined(@click="onLogout")
                span.icon
                  i.fas.fa-sign-out-alt
                span Log Out
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NavbarHamburger from '@/components/navbar/NavbarHamburger.vue'
import NavbarLogo from '@/components/navbar/NavbarLogo.vue'
import NavbarDropdownButton from '@/components/navbar/NavbarDropdownButton.vue'
import NavbarDropdownMenu from '@/components/navbar/NavbarDropdownMenu.vue'

export default {
  name: 'Navbar',
  components: {
    NavbarHamburger,
    NavbarLogo,
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
    ...mapGetters({
      isUserLoggedIn: 'user/getAuthStatus',
      username: 'user/getUsername'
    })
  },
  methods: {
    toggleNavbarHamburger () {
      this.isNavbarHamburgerActive = !this.isNavbarHamburgerActive
    },
    closeNavbarHamburger () {
      this.isNavbarHamburgerActive = false
    },
    toggleNavbarDropdown () {
      this.isNavbarDropdownActive = !this.isNavbarDropdownActive
    },
    closeNavbarDropdown () {
      this.isNavbarDropdownActive = false
    },
    navToRegister () {
      this.closeNavbarDropdown()
      this.closeNavbarHamburger()
      this.$router.push('/register')
    },
    navToLogin () {
      this.closeNavbarDropdown()
      this.closeNavbarHamburger()
      this.$router.push('/login')
    },
    onLogout () {
      this.logout()
      this.closeNavbarDropdown()
      this.closeNavbarHamburger()
      this.$router.push('/login')
    },
    navToAccountMobile () {
      this.closeNavbarDropdown()
      this.closeNavbarHamburger()
      this.$router.push(`/users/${this.username}`)
    },
    ...mapActions({
      logout: 'user/logout',
      showPostUploadModal: 'modal/showPostUploadModal'
    })
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2);

  &-item {
    height: 100%;
  }

  &-buttons {
    & a:not(:last-child) {
      margin-right: 1rem;
    }
  }

  @media screen and (max-width: 1024px) {
    .navbar-start, .navbar-end {
      width: 100%;
      padding: 0 15%;

      & .button {
        width: 100%;
      }
    }
  }
}
</style>
