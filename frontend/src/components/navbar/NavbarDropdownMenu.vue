<template lang="pug">
.navbar-dropdown.is-right
  p.navbar-item Signed in as: {{ username }}

  hr.navbar-divider

  span(@click="$emit('close')")
    router-link.navbar-item(:to="{ path: `/users/${username}` }"  )
      span.icon
        i.fas.fa-user
      span Account

  a.navbar-item(@click="onLogout")
    span.icon
      i.fas.fa-sign-out-alt
    span Log Out
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'NavbarDropdownMenu',
  computed: {
    ...mapGetters({
      username: 'user/getUsername'
    })
  },
  methods: {
    onLogout () {
      this.logout()
      this.$emit('close')
      this.$router.push('/login')
    },
    ...mapActions({
      logout: 'user/logout'
    })
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  &-divider {
    margin: 0.25rem;
  }

  &-dropdown {
    a.navbar-item {
      padding-left: 0.6rem;
    }
  }
}
</style>
