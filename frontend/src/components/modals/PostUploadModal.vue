<template lang="pug">
.modal.is-active
  .modal-background(@click="hide")
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
        .progress(v-if="isUploading")

        figure.image
          img(:src="imageDataURL")

        .control.has-icons-left
          input.input.is-rounded(
            v-model="caption"
            placeholder="Write a caption..."
            autofocus
          )
          span.icon.is-small.is-left
            i.fas.fa-edit

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
import { mapActions, mapGetters } from 'vuex'
import PostService from '@/services/post.service'
import FirebaseService from '@/services/firebase.service'
import ModalFileSelect from '@/components/modals/ModalFileSelect.vue'

export default {
  name: 'PostUploadModal',
  components: {
    ModalFileSelect
  },
  data () {
    return {
      caption: '',
      imageDataURL: '',
      isUploading: false
    }
  },
  computed: {
    ...mapGetters({
      author: 'user/getUsername'
    })
  },
  created () {
    const self = this
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) self.hide()
    })
  },
  methods: {
    onFileSelect (file) {
      const reader = new FileReader()

      reader.onload = (e) => {
        this.imageDataURL = e.target.result
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

      // create post in database
      const { author, caption, imageDataURL } = this
      const imageURL = await FirebaseService.upload(imageDataURL)

      await PostService.create({ author, caption, imageURL })

      // clean up
      this.caption = ''
      this.imageDataURL = ''
      this.isUploading = false
      this.rerenderHome()
      this.hide()
    },
    ...mapActions({
      hide: 'modal/hidePostUploadModal',
      rerenderHome: 'modal/rerenderHome'
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

    & .image {
      width: auto;
      max-width: 35rem;

      & img {
        width: auto;
        max-height: 35rem;
        border-radius: 0.75rem;
      }
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
