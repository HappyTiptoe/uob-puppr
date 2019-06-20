<template lang="pug">
.home-gallery
  .columns.is-multiline(v-if="posts")
    .column.is-6-tablet.is-3-desktop.is-flex(
      v-for="(post, idx) in posts"
      :key="idx"
    )
      .box.post
        figure.image.post-image.is-flex(@click="showPostModal({ post })")
          img(:src="post.imageURL")

        .post-details
          p.caption.has-text-weight-bold {{ post.caption }}
          p.post-info Posted {{ '2 days ago' }} by
            router-link(:to="{ path: `/users/${post.author}` }")  @{{ post.author }}
</template>

<script>
import { mapActions } from 'vuex'
import PostService from '@/services/post.service'

export default {
  name: 'HomeGallery',
  data () {
    return {
      posts: []
    }
  },
  async created () {
    const { data } = await PostService.getAll()
    this.posts = data.posts || []
    this.$emit('loaded')
  },
  methods: {
    ...mapActions({
      showPostModal: 'modal/showPostModal'
    })
  }
}
</script>

<style lang="scss" scoped>
.home-gallery {
  margin-top: 3rem;

  & .post {
    width: 100%;
    padding: 0rem;
    overflow: hidden;
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 5px rgba(10, 10, 10, 0.1),
                  0 2px 3px rgba(10, 10, 10, 0.1);
    }

    &-image {
      cursor: pointer;
      max-height: 175px;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }

    &-details {
      padding: 0.25rem 1rem 0.5rem 1rem;
    }
  }
}
</style>
