<template lang="pug">
.panel-login
  .box
    .h1.title.is-bold.has-text-centered Log In

    form(@submit.prevent="onSubmit")
      //- username
      .field
        .label Username
        .control.has-icons-left
          input.input.is-rounded(
            v-model="username"
            autofocus
          )
          span.icon.is-small.is-left
            i.fas.fa-user

      //- password
      .field
        .label Password
        .control.has-icons-left
          input.input.is-rounded(
            v-model="password"
            type="password"
          )
          span.icon.is-small.is-left
            i.fas.fa-lock

      //- submit
      .field
        .control
          button.button.is-rounded.is-link(
            type="submit"
            @click="onSubmit"
          ) Log In

  p.has-text-centered
    | No account?
    router-link(:to="{ path: '/register' }")  Create one here
    | .
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'PanelLogin',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit () {
      const { username, password } = this
      this.login({ username, password })
      this.$router.push('/')
    },
    ...mapActions({
      login: 'user/login'
    })
  }
}
</script>

<style lang="scss" scoped>
.panel-login {
  & .box {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .title {
    padding-bottom: 1rem;
  }

  .field {
    padding-bottom: 0.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .button {
    width: 100%;
    margin-top: 1rem;
  }
}

</style>
