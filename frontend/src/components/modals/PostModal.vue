<template lang="pug">
.modal.is-active
  .modal-background(@click="hide")
  .modal-content
    .box
      .columns
        .column-is-narrow.post-image
          figure.image
            img(:src="post.imageURL")

        .column.post-details.is-flex-desktop
          .post-author-details
            .media.is-flex
              figure.media-left
                p.image.is-48x48
                  img.is-rounded(:src="authorImageURL")
              .media-content
                .content
                  p.post-author {{ post.author }}
                  p.post-date {{ formatDate(post.date) }}
              .media-right
                span.icon
                  i.fas.fa-heart.has-text-danger(
                    v-if="isPostFavorited"
                    @click="unfavoritePost"
                  )
                  i.far.fa-heart(
                    v-else
                    @click="favoritePost"
                  )
                span {{ post.favorites }}

            p.post-caption {{ post.caption }}

          hr.post-divider

          .comments.is-clearfix
            .comment(
              v-for="(comment, idx) in comments"
              :key="idx"
            )
              router-link.has-text-weight-bold(:to="{ path: `/users/${comment.author}` }") {{ comment.author }}
              span(v-if="activeDeleteButton !== idx")  {{ comment.body }}
              .delete-button.is-pulled-right(v-if="username === comment.author")
                span.icon.is-small(
                  v-if="activeDeleteButton !== idx"
                  @click="activeDeleteButton = idx"
                )
                  i.fas.fa-trash

                span(v-else)
                  span.has-text-danger Are you sure?
                  a(@click="deleteComment(comment.id)")  Yes
                  |  /
                  a(@click="activeDeleteButton = -1")  No

          .field
            .control.has-icons-left
              input.input.is-rounded(
                v-model="newComment"
                :disabled="isDeletingComment"
                placeholder="Write a comment..."
                @keyup.enter="postComment"
              )
              span.icon.is-small.is-left
                i.fas.fa-edit

  button.modal-close.is-large(@click="hide")
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DateService from '@/services/date.service'
import PostService from '@/services/post.service'
import UserService from '@/services/user.service'

export default {
  name: 'PostModal',
  data () {
    return {
      activeDeleteButton: -1,
      authorImageURL: '',
      comments: [],
      isDeletingComment: false,
      isPostFavorited: false,
      newComment: '',
      userFavoritedPostIDs: []
    }
  },
  computed: {
    ...mapGetters({
      post: 'modal/getPost',
      username: 'user/getUsername'
    })
  },
  async created () {
    const that = this

    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) that.hide()
    })

    await this.getAuthorImageURL()
    await this.getFavoritedPostIDs()
    await this.getComments()

    this.isPostFavorited = this.userFavoritedPostIDs.includes(this.post.id)
  },
  methods: {
    formatDate (date) {
      return DateService.fromNow(date)
    },
    async getAuthorImageURL () {
      const { data } = await UserService.getImageURL(this.post.author)
      this.authorImageURL = data.imageURL
    },
    async getComments () {
      const { data } = await PostService.getComments(this.post.id)
      this.comments = data.comments
    },
    async getFavoritedPostIDs () {
      const { data } = await UserService.getFavoritedPostIDs(this.username)
      const favoritedPostIDObjects = data.favoritedPostIDs
      this.userFavoritedPostIDs = favoritedPostIDObjects.map((o) => o.postID)
    },
    async postComment () {
      const author = this.username
      const body = this.newComment

      await PostService.createComment(this.post.id, { body, author })

      this.comments.unshift({ author, body, postID: this.post.id })
      this.newComment = ''
    },
    async deleteComment (commentID) {
      this.isDeletingComment = true
      await PostService.deleteComment(this.post.id, commentID)
      this.comments.splice(this.activeDeleteButton, 1)
      this.activeDeleteButton = -1
      this.isDeletingComment = false
    },
    async favoritePost () {
      this.isPostFavorited = true
      this.post.favorites++
      await PostService.createFavorite(this.post.id, this.username)
    },
    async unfavoritePost () {
      this.isPostFavorited = false
      this.post.favorites--
      await PostService.deleteFavorite(this.post.id, this.username)
    },
    ...mapActions({
      hide: 'modal/hidePostModal'
    })
  }
}
</script>

<style lang="scss" scoped>
.modal-content {
  width: auto;
  max-width: 1280px;
  max-height: 960px;

  // phone
  @media screen and (max-width: 768px) {
    width: 100%;
  }

  & .columns {
    padding: 0;
    margin: 0;

    & .column {
      width: 100%;
      min-height: 100%;
      padding: 0.5rem;
      flex-direction: column;
      // justify-content: center;
    }
  }

  & .box {
    overflow: hidden;
    padding: 0;
    margin: 0;
  }

  & .post-image {
    // width: auto;

    & img {
      min-height: 100%;
    }

    // desktop
    @media screen and (min-width: 769px) {
      height: 480px;
    }
  }

  & .post-details {
    // desktop
    @media screen and (min-width: 769px) {
      max-width: 290px;
    }
  }

  & .post-author-details {
    padding: 0.5rem;
    min-width: 15rem;
    // align-self: flex-start;

    & .media {
      align-items: center;
      word-wrap: break-all;
    }

    & .media-left {
      margin-right: 0.5rem;
    }

    & .post-date {
      margin-top: -1rem;
    }
  }

  .post-caption{
    margin-top: 0.5rem;
  }

  .post-divider {
    margin: 0.5rem 0;
  }

  & .comments {
    width: 100%;

    // desktop
    @media screen and (min-width: 769px) {
      max-height: 350px;
      overflow: auto;
    }

    & .comment {
      word-break: break-all;

      & .fas.fa-trash:hover {
        color: #ff0537;
      }
    }
  }

  & .field {
    margin-top: 0.5rem;
    // align-self: flex-end;
    width: 100%;
  }
}

button.modal-close {
  @media screen and (max-width: 768px) {
    background-color: white;
    border: 1px solid black;

    &::before, &::after {
      background-color: black;
    }
  }
}
</style>
