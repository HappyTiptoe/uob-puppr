<template lang="pug">
.modal.is-active
  .modal-background(@click="hide")
  .modal-content
    .box.is-flex
      h1.title.has-text-centered Upload a profile picture

      h2.subtitle.has-text-centered(v-if="!imageDataURL") Choose an image...
      h2.subtitle.has-text-centered(v-else) Crop to your liking!

      modal-file-select(
        v-if="!imageDataURL"
        @file-select="onFileSelect"
      )

      template(v-else)
        .progress(v-if="isUploading")

        v-cropper.cropper(
          :src="imageDataURL"
          :aspectRatio="1"
          ref="cropper"
        )

        .buttons
          a.button.is-rounded.is-outlined.is-link(
            v-if="imageDataURL"
            :disabled="isUploading"
            @click="onCancel"
          ) Cancel
          a.button.is-rounded.is-link(
            :class="{ 'is-loading': isUploading }"
            :disabled="isUploading"
            @click="onSave"
          ) Save

  button.modal-close.is-large(@click="hide")
</template>

<script>
import { mapActions } from 'vuex'
import VCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import FirebaseService from '@/services/firebase.service'
import ModalFileSelect from '@/components/modals/ModalFileSelect.vue'

export default {
  name: 'ProfileUploadModal',
  components: {
    ModalFileSelect,
    VCropper
  },
  data () {
    return {
      imageDataURL: '',
      isUploading: false
    }
  },
  created () {
    const vm = this
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) vm.hide()
    })
  },
  methods: {
    onFileSelect (file) {
      const reader = new FileReader()

      reader.onload = (e) => {
        this.imageDataURL = e.target.result
        this.$nextTick(() => {
          this.$refs.cropper.replace(e.target.result)
        })
      }

      reader.readAsDataURL(file)
    },
    onCancel () {
      this.caption = ''
      this.imageDataURL = ''
      this.hide()
    },
    async onSave () {
      this.isUploading = true

      const croppedImageDataURL = this.$refs.cropper.getCroppedCanvas().toDataURL()

      // upload image to Firebase
      const newImageURL = await FirebaseService.upload(croppedImageDataURL)

      this.updateUserImage({ newImageURL })

      // clean up
      this.caption = ''
      this.imageDataURL = ''
      this.isUploading = false
      this.hide()
    },
    ...mapActions({
      hide: 'modal/hideProfileUploadModal',
      updateUserImage: 'user/updateImageURL'
    })
  }
}
</script>

<style lang="scss" scoped>
.modal {

  &-content {
    & .box {
      align-items: center;
      flex-direction: column;
    }

    & .cropper {
      border-radius: 0.75rem;
      overflow: hidden;
    }

    & .control {
      margin-top: 1.25rem;
    }

    & .buttons {
      margin-top: 1.25rem;

      & a:not(:last-child) {
        margin-right: 1.25rem;
      }
    }
  }
}
</style>
