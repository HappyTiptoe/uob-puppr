<template lang="pug">
#app
  //- post-modal
  //- post-upload-modal
  //- profile-upload-modal
  navbar(@show-upload-modal="showUploadModal")
  router-view(:key="$route.fullPath")
</template>

<script>
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
  methods: {
    showUploadModal () {
      console.log(`showing upload modal`)
    }
  }
}

</script>

<style lang="scss" scoped>
@import '~@/../public/css/style.css';
@import '~@/../node_modules/@fortawesome/fontawesome-free/css/all.css';
#app {
  overflow: hidden;
}
</style>
