<template lang="pug">
.profile-card
  .profile-details-image
    figure.image.is-square
      img.is-rounded(:src="user.imageURL")

  .profile-details-content
    .content
      p.title.is-4 {{ user.name }}
      p.subtitle.is-6 @{{ user.username }}

      template(v-if="!isEditing")
        p.bio {{ user.bio}}
        a.bio-edit(@click="onEdit") Edit

      template(v-else)
        .label Edit bio:
        .control
          textarea.textarea(
            v-model="newBio"
            placeholder="Write a bio..."
            @keyup.enter="onSave"
          )

        .bio-edit-buttons
          a(@click="onCancel") Cancel
          a(@click="onSave") Save
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'OwnProfileDetails',
  data () {
    return {
      isEditing: false,
      isUploading: false,
      newBio: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    })
  },
  mounted () {
    this.$emit('loaded')
  },
  methods: {
    onEdit () {
      this.isEditing = true
      this.newBio = this.user.bio
    },
    onCancel () {
      this.isEditing = false
    },
    onSave () {
      const { newBio } = this
      this.isEditing = false
      this.updateBio({ newBio })
    },
    ...mapActions({
      updateBio: 'user/updateBio'
    })
  }
}
</script>

<style lang="scss" scoped>
.profile-details {
  max-width: 100%;
  position: relative;

  &-image {
    padding: 15px;
  }

  &-content {
    padding: 10px 20px;

    & .bio {
      padding-bottom: 0;
      margin-bottom: 0;
      word-break: break-all;
    }

    & .textarea {
      border-radius: 0.75rem;
    }

    & .bio-edit-buttons {
      & a:last-child {
        margin-left: 1rem;
      }
    }
  }
}
</style>
