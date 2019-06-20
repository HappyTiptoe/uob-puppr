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
export default {
  name: 'OtherProfileDetails',
  data () {
    return {
      profile: {
        bio: 'I hate everything.',
        imageURL: 'https://picsum.photos/300',
        name: 'Eben T.',
        username: 'ebxn'
      }
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
    padding: 15px;

    & .bio {
      padding-bottom: 0;
      margin-bottom: 0;
      word-break: break-all;
    }
  }
}
</style>
