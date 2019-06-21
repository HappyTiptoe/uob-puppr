<template lang="pug">
.home-gallery
  .columns.is-multiline(v-if="posts && sortBy === ''")
    .column.is-6-tablet.is-3-desktop.is-flex(
      v-for="(post, idx) in filteredPosts"
      :key="idx"
    )
      .box.post
        figure.image.post-image.is-flex(@click="showPostModal({ post })")
          img(:src="post.imageURL")

        .post-details
          p.caption.has-text-weight-bold {{ trimCaption(post.caption) }}
          p.post-info Posted {{ formatDate(post.date) }} by
            router-link(:to="{ path: `/users/${post.author}` }")  @{{ post.author }}

  .columns.is-multiline(v-if="posts && sortBy === 'newest'")
    .column.is-6-tablet.is-3-desktop.is-flex(
      v-for="(post, idx) in filteredPostsByNewest"
      :key="idx"
    )
      .box.post
        figure.image.post-image.is-flex(@click="showPostModal({ post })")
          img(:src="post.imageURL")

        .post-details
          p.caption.has-text-weight-bold {{ trimCaption(post.caption) }}
          p.post-info Posted {{ formatDate(post.date) }} by
            router-link(:to="{ path: `/users/${post.author}` }")  @{{ post.author }}

  .columns.is-multiline(v-if="posts && sortBy === 'favorites'")
    .column.is-6-tablet.is-3-desktop.is-flex(
      v-for="(post, idx) in filteredPostsByNewest"
      :key="idx"
    )
      .box.post
        figure.image.post-image.is-flex(@click="showPostModal({ post })")
          img(:src="post.imageURL")

        .post-details
          p.caption.has-text-weight-bold {{ trimCaption(post.caption) }}
          p.post-info Posted {{ formatDate(post.date) }} by
            router-link(:to="{ path: `/users/${post.author}` }")  @{{ post.author }}
</template>

<script>
import { mapActions } from 'vuex'
import DateService from '@/services/date.service'
import PostService from '@/services/post.service'

export default {
  name: 'HomeGallery',
  props: {
    sortBy: {
      type: String,
      default: '',
      required: false
    },
    searchQuery: {
      type: String,
      default: '',
      required: false
    }
  },
  data () {
    return {
      posts: []
    }
  },
  computed: {
    // a,b < 0 == a before b
    filteredPostsByNewest () {
      const posts = this.posts
      const sortedPosts = posts.sort((pA, pB) => {
        return pA.date < pB.date
      })
      return sortedPosts.filter((p) => {
        return p.caption.includes(this.searchQuery)
      })
    },
    filteredPostsByFavorites () {
      const posts = this.posts
      const sortedPosts = posts.sort((pA, pB) => {
        return pA.favorites < pB.favorites
      })
      return sortedPosts.filter((p) => {
        return p.caption.includes(this.searchQuery)
      })
    },
    filteredPosts () {
      return this.posts.filter((p) => {
        return p.caption.includes(this.searchQuery)
      })
    }
  },
  async created () {
    const { data } = await PostService.getAll()
    this.posts = data.posts || []
    this.$emit('loaded')
  },
  methods: {
    trimCaption (caption) {
      const nws = caption.trim()
      return nws.length > 40 ? nws.slice(0, 40) + '...' : nws
    },
    formatDate (date) {
      return DateService.fromNow(date)
    },
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
