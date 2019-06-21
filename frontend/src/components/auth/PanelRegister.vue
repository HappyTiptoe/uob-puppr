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
            :class="{ 'is-danger': $v.name.$error && $v.name.$dirty }"
            v-model.trim="$v.name.$model"
            autofocus
          )
          span.icon.is-small.is-left
            i.fas.fa-address-card
        template(v-if="$v.name.$dirty")
          p.help.is-danger(v-if="!$v.name.required") This field is required.
          p.help.is-danger(v-if="!$v.name.minLength") Name must be at least {{$v.name.$params.minLength.min}} characters

      //- username
      .field
        .label Username
        .control.has-icons-left
          input.input.is-rounded(
            v-model.trim="$v.username.$model"
            :class="{ 'is-danger': $v.username.$error && $v.username.$dirty }"
          )
          span.icon.is-small.is-left
            i.fas.fa-user
        template(v-if="$v.username.$dirty")
          p.help.is-danger(v-if="!$v.username.required") This field is required.
          p.help.is-danger(v-if="!$v.username.isUnique") This username is already taken.
          p.help.is-danger(v-if="!$v.username.minLength") Username must be at least {{$v.username.$params.minLength.min}} characters

      //- password
      .field
        .label Password
        .control.has-icons-left
          input.input.is-rounded(
            v-model.trim="$v.password.$model"
            :class="{ 'is-danger': $v.password.$error && $v.password.$dirty }"
            type="password"
          )
          span.icon.is-small.is-left
            i.fas.fa-lock
        template(v-if="$v.password.$dirty")
          p.help.is-danger(v-if="!$v.password.required") This field is required.
          p.help.is-danger(v-if="!$v.password.minLength")
            | Password must have at least {{ $v.password.$params.minLength.min }} characters.
          p.help.is-danger(v-if="!$v.password.maxLength")
            | Password must have at most {{ $v.password.$params.maxLength.max }} characters.

      //- password confirm
      .field
        .label Confirm Password
        .control.has-icons-left
          input.input.is-rounded(
            v-model.trim="$v.passwordConfirm.$model"
            :class="{ 'is-danger': $v.passwordConfirm.$error && $v.passwordConfirm.$dirty }"
            type="password"
          )
          span.icon.is-small.is-left
            i.fas.fa-lock
        template(v-if="$v.passwordConfirm.$dirty")
          p.help.is-danger(v-if="!$v.passwordConfirm.required") This field is required.
          p.help.is-danger(v-if="!$v.passwordConfirm.sameAsPassword") Passwords don't match.

      //- submit
      .field
        .control
          button.button.is-rounded.is-link(
            type="submit"
            @click="onSubmit"
          ) Register

  p.has-text-centered
    | Already have an account?
    router-link(:to="{ path: '/login' }")  Sign in
    | .
</template>

<script>
import { mapActions } from 'vuex'
import { required, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'
import UserService from '@/services/user.service'
const isUnique = async (value) => {
  if (value.length < 5) return true
  const { status } = await UserService.get(value.toLowerCase())
  return status !== 200
}

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
  validations: {
    name: {
      required,
      minLength: minLength(5)
    },
    username: {
      required,
      isUnique,
      minLength: minLength(5)
    },
    password: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(20)
    },
    passwordConfirm: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const username = this.username.toLowerCase()
        const { name, password } = this
        this.register({ name, username, password })
        this.$router.push('/')
      }
    },
    ...mapActions({
      register: 'user/register'
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
