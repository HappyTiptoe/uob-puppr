<template lang="pug">
.navbar-dropdown.is-right
  p.navbar-item Signed in as: ebxn
  hr.navbar-divider
  router-link.navbar-item(:to="{ path: `/users/ebxn` }")
    span.icon
      i.fas.fa-user
    span Account
  a.navbar-item
    span.icon
      i.fas.fa-sign-out-alt
    span Log Out
</template>

<script>
export default {
  name: 'NavbarDropdownMenu'
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
