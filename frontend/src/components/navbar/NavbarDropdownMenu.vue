<template lang="pug">
.navbar-dropdown.is-right
  p.navbar-item Signed in as: {{ username }}

  hr.navbar-divider

  span(@click="$emit('close')")
    router-link.navbar-item(:to="{ path: `/users/${username}` }"  )
      span.icon
        img.profile(:src="profileIcon")
      span Account

  a.navbar-item(@click="$emit('logout')")
    span.icon
      img.logout(:src="logoutIcon")
    span Log Out
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavbarDropdownMenu',
  data () {
    return {
      logoutIcon: require('@/assets/icons/Logout.svg'),
      profileIcon: require('@/assets/icons/Profile.svg')
    }
  },
  computed: {
    ...mapGetters({
      username: 'user/getUsername'
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

.logout {
  width: 100px;
}
</style>
