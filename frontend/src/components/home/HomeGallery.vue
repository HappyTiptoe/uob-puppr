<template lang="pug">
.home-gallery
  .columns.is-multiline(v-if="posts")
    .column.is-6-tablet.is-3-desktop.is-flex(
      v-for="(post, idx) in posts"
      :key="idx"
    )
      .box.post
        figure.image.post-image.is-flex
          img(:src="post.imageURL")

        .post-details
          p.caption.has-text-weight-bold {{ post.caption }}
          p.post-info Posted {{ '2 days ago' }} by
            a  @{{ post.author }}

</template>

<script>
export default {
  name: 'HomeGallery',
  data () {
    return {
      posts: [
        { author: 'Jim', caption: 'Hello There', favorites: 0, imageURL: 'https://picsum.photos/200/300' },
        { author: 'Jim', caption: 'Hello There', favorites: 0, imageURL: 'https://picsum.photos/200/300' },
        { author: 'Jim', caption: 'Hello There', favorites: 0, imageURL: 'https://picsum.photos/200/300' },
        { author: 'Jim', caption: 'Hello There', favorites: 0, imageURL: 'https://picsum.photos/200/300' },
        { author: 'Jim', caption: 'Hello There', favorites: 0, imageURL: 'https://picsum.photos/200/300' },
        { author: 'Jim', caption: 'Hello There', favorites: 0, imageURL: 'https://picsum.photos/200/300' },
        { author: 'Jim', caption: 'Hello There', favorites: 0, imageURL: 'https://picsum.photos/200/300' },
        { author: 'Jim', caption: 'Hello There', favorites: 0, imageURL: 'https://picsum.photos/200/300' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.home-gallery {
  margin-top: 3rem;

  & .post {
    width: 100%;
    padding: 0rem;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 5px rgba(10, 10, 10, 0.1),
                  0 2px 3px rgba(10, 10, 10, 0.1);
    }

    &-image {
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
