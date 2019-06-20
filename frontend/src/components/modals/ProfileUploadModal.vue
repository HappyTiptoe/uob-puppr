<template lang="pug">
.modal.is-active
  .modal-background(@click="$emit('close')")
  .modal-content
    .box.is-flex
      h1.title.has-text-centered Create a new post

      h2.subtitle.has-text-centered(v-if="!imageDataURL") Choose an image...
      h2.subtitle.has-text-centered(v-else) Now add a caption!

      modal-file-select(
        v-if="!imageDataURL"
        @file-select="onFileSelect"
      )

      template(v-else)
        .progress(v-show="isUploading")

        v-cropper.cropper(
          :src="imageDataURL"
          :aspectRatio="1"
          ref="cropper"
        )

        .buttons
          a.button.is-rounded.is-outlined.is-link(
            v-if="imageDataURL"
            @click="onCancel"
          ) Cancel
          a.button.is-rounded.is-link(@click="onSave") Save

  button.modal-close.is-large(@click="$emit('close')")
</template>

<script>
import VCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

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
      if (e.keyCode === 27) vm.$emit('close')
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
      this.$emit('close')
    },
    onSave () {
      this.isUploading = true

      // save image preview in "edit" section of profile

      // clean up
      this.caption = ''
      this.imageDataURL = ''
      this.isUploading = false
      this.$emit('close')
    }
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
