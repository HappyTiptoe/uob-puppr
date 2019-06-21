<template lang="pug">
.auth.is-flex
  .container
    .columns.is-link
      //- slideshow
      .column.is-hidden-touch.is-flex.doggo
        transition(name="slideshow")
          img.dog-image(
            :key="dogImage"
            :src="dogImage"
          )
        br

      .column.panel.is-flex
        panel-login(
          v-if="panel === 'login'"
          :key="componentKey"
          @login-failure="onLoginFailure"
        )
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
  data () {
    return {
      componentKey: 0,
      currentImageIndex: 0,
      images: [
        require('@/assets/doggo.png'),
        require('@/assets/doggo2.png'),
        require('@/assets/doggo3.png'),
        require('@/assets/doggo4.png')
      ],
      logo: require('@/assets/logos/logov2.png')
    }
  },
  computed: {
    dogImage () {
      return this.images[this.currentImageIndex]
    }
  },
  created () {
    this.updateDogImage()
    document.title = this.panel.charAt(0).toUpperCase() + this.panel.slice(1)
  },
  mounted () {
    this.$emit('loaded')
  },
  methods: {
    updateDogImage () {
      // eslint-disable-next-line
      const imageCycleInterval = setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % 4
      }, 1000)
    },
    onLoginFailure () {
      this.componentKey += 1
    }
  }
}
</script>

<style lang="scss" scoped>

.column {
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1023px) {
    margin-top: 3.25rem;
    height: calc(100vh - 3.25rem);
  }
}

.doggo {
  margin-left: 10rem;
  padding-top: 30rem;

  flex-direction: column;
}

.dog-image {
  height: 316px;
  width: 316px;
  position: absolute;
  top: 30%;
}

h1 {
  position: absolute;
  top: 70%;
}

.panel {
  margin-top: 5.25rem;
  height: calc(100vh - 5.25rem);
}

.slideshow-enter-active, .slideshow-leave-active {
  transition: opacity .5s;
}
.slideshow-enter, .slideshow-leave-to {
  opacity: 0;
}

.logo {
  width: 900px;
  height: 550px;
  padding-right: 0;
  margin-top: 16rem;
}

</style>
