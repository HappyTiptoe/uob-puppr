<template lang="pug">
.modal.is-active
  .modal-background(@click="hide")
  .modal-content
    .box
      figure.post-image.image.is-flex
        img(:src="post.imageURL")

      .post-details
        .post-author
          .media.is-flex
            figure.media-left
              p.image.is-48x48(@click="goToProfile(post.author)")
                img.is-rounded(:src="authorImageURL")
            .media-content
              .content
                span.author
                  a.has-text-weight-bold(@click="goToProfile(post.author)") {{ post.author }}
                br
                span.post-date {{ formatDate(post.date) }}
            .media-right
              span.icon.is-large
                i.fas.fa-heart.has-text-danger(
                  v-if="isPostFavorited"
                  @click="unfavoritePost"
                )
                i.far.fa-heart(
                  v-else
                  @click="favoritePost"
                )
              span.favorites {{ post.favorites }}
        p.caption {{ post.caption }}

        hr.post-divider

        .comments
          .comment(v-for="(comment, idx) in comments")
            a.has-text-weight-bold(@click="goToProfile(comment.author)") {{ comment.author }}

            span(v-if="activeDeleteButton !== idx")  {{ comment.body }}
              .delete-button.is-pulled-right(v-if="username === comment.author")
                span.icon.is-small(
                  v-if="activeDeleteButton !== idx"
                  @click="activeDeleteButton = idx"
                )
                  i.fas.fa-trash

            span.is-pulled-right(v-else)
              span.has-text-danger Are you sure?
              a(@click="deleteComment(comment.id)")  Yes
              |  /
              a(@click="activeDeleteButton = -1")  No

      .field
        .control.has-icons-left
          input.input.is-rounded(
            v-model="newComment"
            placeholder="Write a comment..."
            @keyup.enter="postComment"
          )
          span.icon.is-small.is-left
            i.fas.fa-edit
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
    const self = this

    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) self.hide()
    })

    await this.getAuthorImageURL()
    await this.getFavoritedPostIDs()
    this.isPostFavorited = this.userFavoritedPostIDs.includes(this.post.id)

    await this.getComments()
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

      this.comments.push({ author, body, postID: this.post.id })
      this.newComment = ''
    },
    async deleteComment (commentID) {
      this.isDeletingComment = true
      await PostService.deleteComment(this.post.id, commentID)
      this.comments.splice(this.activeDeleteButton, 1)
      this.activeDeleteButton = -1
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
    goToProfile (username) {
      this.$router.push(`/users/${username}`)
      this.hide()
    },
    ...mapActions({
      hide: 'modal/hidePostModal'
    })
  }
}
</script>

<style lang="scss" scoped>
.modal-content {
  min-width: 500px;
  max-width: 1000px;
  max-height: 1000px;
  // overflow: hidden;
  overflow: hidden;

  & .box {
    padding: 0;
  }

  & .post-image {
    width: auto;
    max-width: 40rem;
    justify-content: center;
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);

    & img {
      // max-height: 50%;
      width: auto;
      max-height: 30rem;
    }
  }

  & .post-details {
    padding: 25px;
    max-height: 15rem;
    overflow: auto;

    & .post-author {

      & .media {
        height: 48px;
        align-items: center;
        word-wrap: break-all;
      }

      & .icon, & .favorites {
        font-size: 1.5rem;
      }
    }

    & .caption {
      margin-top: 10px;
    }

    & hr.post-divider {
      margin: 15px 0;
    }

    & .comment {
      word-break: break-all;

      & .fas.fa-trash:hover {
        color: #ff0537;
      }
    }
  }

  & .field {
    padding: 5px 25px 20px 25px;
  }
}
</style>
