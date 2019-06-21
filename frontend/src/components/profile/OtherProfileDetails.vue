<template lang="pug">
.profile-card
  .profile-details-image
    figure.image.is-square
      img.is-rounded(:src="profile.imageURL")

  .profile-details-content
    .content
      p.title.is-4 {{ profile.name }}
      p.subtitle.is-6 @{{ profile.username }}

      p.bio {{ profile.bio}}
</template>

<script>
import UserService from '@/services/user.service'

export default {
  name: 'OtherProfileDetails',
  props: {
    username: {
      type: String,
      default: '',
      required: true
    }
  },
  data () {
    return {
      profile: {}
    }
  },
  async created () {
    const { data, status } = await UserService.get(this.username)
    if (status === 404) {
      this.$router.push('/404')
    } else {
      this.profile = data.user
      this.$emit('loaded')
    }
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
  }
}
</style>
