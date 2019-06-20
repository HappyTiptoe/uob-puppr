<template lang="pug">
.panel-login
  .box
    .h1.title.is-bold.has-text-centered Create an account

    form(@submit.prevent="onSubmit")
      //- name
      .field
        .label Name
        .control.has-icons-left
          input.input.is-rounded(
            v-model="name"
            autofocus
          )
          span.icon.is-small.is-left
            i.fas.fa-address-card

      //- username
      .field
        .label Username
        .control.has-icons-left
          input.input.is-rounded(
            v-model="username"
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

      //- password confirm
      .field
        .label Confirm Password
        .control.has-icons-left
          input.input.is-rounded(
            v-model="passwordConfirm"
            type="password"
          )
          span.icon.is-small.is-left
            i.fas.fa-lock

      //- submit
      .field
        .control
          a.button.is-rounded.is-link(type="submit") Register

  p.has-text-centered
    | Already have an account?
    router-link(:to="{ path: '/login' }")  Sign in
    | .
</template>

<script>
export default {
  name: 'PanelRegister',
  data () {
    return {
      name: '',
      username: '',
      password: '',
      passwordConfirm: ''
    }
  },
  methods: {
    onSubmit () {

    }
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
