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
            v-model.trim="username"
            :class="{ 'is-danger': $v.username.$error && $v.username.$dirty }"
            autofocus
          )
          span.icon.is-small.is-left
            i.fas.fa-user
        template(v-if="$v.username.$dirty")
          p.help.is-danger(v-if="!$v.username.required") This field is required.

      //- password
      .field
        .label Password
        .control.has-icons-left
          input.input.is-rounded(
            v-model="password"
            :class="{ 'is-danger': $v.password.$error && $v.password.$dirty }"
            type="password"
          )
          span.icon.is-small.is-left
            i.fas.fa-lock
          template(v-if="$v.password.$dirty")
            p.help.is-danger(v-if="!$v.password.required") This field is required.

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
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'PanelLogin',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  validations: {
    username: {
      required
    },
    password: {
      required
    }
  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const username = this.username.toLowerCase()
        const { password } = this
        this.login({ username, password })
        this.$router.push('/')
      }
    },
    ...mapActions({
      login: 'user/login'
    })
  }
}
</script>

<style lang="scss" scoped>
.panel-login {
  width: 19.5rem;

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
