<template lang="pug">
#app
  transition(
    v-if="isPageLoading"
    name="pageloader"
  )
    .pageloader.is-white.is-active
      span.title
        | Fetching
        strike  sticks
        |  information...

  post-modal(v-if="isPostModalActive")
  post-upload-modal(v-if="isPostUploadModalActive")
  profile-upload-modal(v-if="isProfileUploadModalActive")

  navbar

  router-view(
    :key="$route.fullPath"
    @loaded="isPageLoading = false"
  )
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PostModal from '@/components/modals/PostModal.vue'
import PostUploadModal from '@/components/modals/PostUploadModal.vue'
import ProfileUploadModal from '@/components/modals/ProfileUploadModal.vue'
import Navbar from '@/components/navbar/Navbar.vue'

export default {
  name: 'App',
  components: {
    PostModal,
    PostUploadModal,
    ProfileUploadModal,
    Navbar
  },
  data () {
    return {
      isPageLoading: true
    }
  },
  computed: {
    route () {
      return this.$route.fullPath
    },
    ...mapGetters({
      isPostModalActive: 'modal/getPostModalStatus',
      isPostUploadModalActive: 'modal/getPostUploadModalStatus',
      isProfileUploadModalActive: 'modal/getProfileUploadModalStatus'
    })
  },
  watch: {
    route (n, o) {
      this.isPageLoading = true
    }
  },
  created () {
    this.validateSession()
  },
  methods: {
    ...mapActions({
      validateSession: 'user/validate'
    })
  }
}

</script>

<style lang="scss" scoped>
@import '~@/../public/css/style.css';
@import '~@/../node_modules/@fortawesome/fontawesome-free/css/all.css';

.pageloader {
  &-enter {
    opacity: 0;
  }

  &-enter-to, &-leave {
    opacity: 1;
  }

  &-leave-to {
    opacity: 0;
  }

  &-enter-active, &-leave-active {
    transition: all 0.35s ease;
  }
}
</style>
