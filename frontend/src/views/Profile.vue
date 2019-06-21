<template lang="pug">
  .profile
    transition(
      v-if="isPageLoading"
      name="pageloader"
    )
      .pageloader.is-white.is-active
        span.title
          | Fetching
          strike  sticks
          |  information...
    .container
      .columns
        //- load from local storage/API depending on if user's profile
        .column.is-3
          own-profile-details(
            v-if="isUsersProfile"
            @loaded="isProfileLoaded = true"
          )
          other-profile-details(
            v-else
            @loaded="isProfileLoaded = true"
          )

        .column.is-9
          profile-gallery(
            :username="username"
            @loaded="isGalleryLoaded = true"
          )

</template>

<script>
import { mapGetters } from 'vuex'
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
    }
  },
  data () {
    return {
      isProfileLoaded: false,
      isGalleryLoaded: false
    }
  },
  computed: {
    isUsersProfile () {
      return this.username === this.ownUsername
    },
    isPageLoading () {
      return !(this.isProfileLoaded && this.isGalleryLoaded)
    },
    ...mapGetters({
      ownUsername: 'user/getUsername'
    })
  },
  created () {
    document.title = `${this.username}'s Profile`
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
