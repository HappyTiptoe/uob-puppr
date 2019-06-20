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
    .columns.is-multiline(v-if="posts")
      .column.is-6-tablet.is-3-desktop(
        v-for="(post, idx) in posts"
        :key="idx"
      )
        .box.post
          fugre.image.is-flex
            img(
              ref="idx"
              :src="post.imageURL"
            )

    //- text
    .no-posts(v-else)
      h1.title.has-text-centered
        | No {{ activeTab }} found.
</template>

<script>
export default {
  name: 'ProfileGallery',
  data () {
    return {
      activeTab: 'posts',
      posts: [
        { imageURL: 'https://picsum.photos/832' },
        { imageURL: 'https://picsum.photos/832' },
        { imageURL: 'https://picsum.photos/832' },
        { imageURL: 'https://picsum.photos/832' },
        { imageURL: 'https://picsum.photos/832' },
        { imageURL: 'https://picsum.photos/832' },
        { imageURL: 'https://picsum.photos/832' }
      ]
    }
  },
  methods: {
    changeActiveTab (tab) {
      this.activeTab = tab
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
}
</style>
