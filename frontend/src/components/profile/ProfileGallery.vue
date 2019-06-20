<template lang="pug">
.profile-gallery
  .box
    .tabs.is-centered.is-medium.is-fullwidth
      ul
        li.tab(
          :class="{ 'is-active': activeTab === 'posts' }"
          @click="changeActiveTab('posts')"
        )
          a
            span.icon
              i.fas.fa-camera
            span Posts

        li.tab(
          :class="{ 'is-active': activeTab === 'favorites' }"
          @click="changeActiveTab('favorites')"
        )
          a
            span.icon
              i.fas.fa-heart
            span Favorites

    //- pictures
    .columns.is-multiline(v-if="images.length !== 0")
      .column.is-6-tablet.is-3-desktop(
        v-for="(image, idx) in images"
        :key="idx"
      )
        .box.post
          figure.image.is-flex
            img(
              ref="idx"
              :src="image.imageURL"
            )

    //- text
    .no-posts(v-else)
      h1.title.is-4.has-text-centered
        | This user has no {{ activeTab }}.
</template>

<script>
import UserService from '@/services/user.service'

export default {
  name: 'ProfileGallery',
  props: {
    username: {
      type: String,
      default: '',
      required: true
    }
  },
  data () {
    return {
      activeTab: 'posts',
      posts: [],
      favorites: [],
      images: []
    }
  },
  async created () {
    await this.getPosts()
    await this.getFavorites()

    this.images = this.posts

    this.$emit('loaded')
  },
  methods: {
    changeActiveTab (tab) {
      this.activeTab = tab
      this.images = this[tab]
    },
    async getPosts () {
      const { data } = await UserService.getPosts(this.username)
      this.posts = data.posts || []
    },
    async getFavorites () {
      const { data } = await UserService.getFavorites(this.username)
      this.favorites = data.favoritedPosts || []
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-gallery {
  & .tabs {
    padding-bottom: 2.5rem;

    & .tab {
     border: none;
    }
  }

  & .column {
    padding: 0.5rem;
  }

  & .post {
    width: 100%;
    padding: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 5px rgba(10, 10, 10, 0.1),
                  0 2px 3px rgba(10, 10, 10, 0.1);
    }

    & .image {
      justify-content: center;
      align-items: center;
      overflow: hidden;
      max-height: 175px;

      & img {
        width: auto;
        height: 100%;
      }
    }
  }

  & .no-posts {
    margin-bottom: 3rem;
  }
}
</style>
