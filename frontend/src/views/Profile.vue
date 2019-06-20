<template lang="pug">
  .profile
    .container
      .columns
        //- load from local storage/API depending on if user's profile
        .column.is-3
          own-profile-details(v-if="isUsersProfile")
          other-profile-details(v-else)

        .column.is-9
          profile-gallery

</template>

<script>
import OwnProfileDetails from '@/components/profile/OwnProfileDetails.vue'
import OtherProfileDetails from '@/components/profile/OtherProfileDetails.vue'
import ProfileGallery from '@/components/profile/ProfileGallery.vue'

export default {
  name: 'Profile',
  components: {
    OwnProfileDetails,
    OtherProfileDetails,
    ProfileGallery
  },
  props: {
    username: {
      type: String,
      default: '',
      required: true
    },
    isUsersProfile: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
  padding-top: 7.25rem;
  min-height: calc(100vh - 5.25rem);

  @media screen and (max-width: 1023px) {
    padding-top: 5.25rem;
    min-height: calc(100vh - 3.25rem);
  }
}
</style>
