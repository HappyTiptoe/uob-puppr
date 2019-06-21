<template lang="pug">
.auth.is-flex
  .container
    .columns
      //- slideshow
      .column.is-hidden-touch
        //- TODO

      .column.is-flex
        panel-login(v-if="panel === 'login'")
        panel-register(v-else)
</template>

<script>
import PanelLogin from '@/components/auth/PanelLogin.vue'
import PanelRegister from '@/components/auth/PanelRegister.vue'

export default {
  name: 'Auth',
  components: {
    PanelLogin,
    PanelRegister
  },
  props: {
    panel: {
      type: String,
      default: 'login',
      required: true
    }
  },
  mounted () {
    this.$emit('loaded')
  }
}
</script>

<style lang="scss" scoped>
.column {
  margin-top: 5.25rem;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 5.25rem);

  @media screen and (max-width: 1023px) {
    margin-top: 3.25rem;
    height: calc(100vh - 3.25rem);
  }
}
</style>
