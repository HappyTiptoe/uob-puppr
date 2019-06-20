<template lang="pug">
.modal.is-active
  .modal-background(@click="$emit('close')")
  .modal-content
    .box
      .columns
        .column-is-narrow.post-image
          figure.image
            img(src="https://picsum.photos/500/600")

        .column.post-details.is-flex-desktop
          .post-author-details
            .media.is-flex
              figure.media-left
                p.image.is-48x48
                  img.is-rounded(src="https://picsum.photos/500/500")
              .media-content
                .content
                  p.author ebxn
                  p.date 2 days ago

          hr.post-divider

          .comments.is-clearfix
            .comment(
              v-for="(comment, idx) in comments"
              :key="idx"
            )
              router-link.has-text-weight-bold(:to="{ path: '/' }") {{ comment.author }}
              span  {{ comment.body }}

          .field
            .control.has-icons-left
              input.input.is-rounded(placeholder="Write a comment...")
              span.icon.is-small.is-left
                i.fas.fa-edit

  button.modal-close.is-large(@click="$emit('close')")
</template>

<script>
export default {
  name: 'PostModal',
  data () {
    return {
      comments: [
        { author: 'ebxn', body: 'Hello there, this is a testing comment. You shouldn\'t be able to see this.' },
        { author: 'ebxn', body: 'Hello there, this is a testing comment. You shouldn\'t be able to see this.' },
        { author: 'ebxn', body: 'Hello there, this is a testing comment. You shouldn\'t be able to see this.' },
        { author: 'ebxn', body: 'Hello there, this is a testing comment. You shouldn\'t be able to see this.' },
        { author: 'ebxn', body: 'Hello there, this is a testing comment. You shouldn\'t be able to see this.' },
        { author: 'ebxn', body: 'Hello there, this is a testing comment. You shouldn\'t be able to see this.' },
        { author: 'ebxn', body: 'Hello there, this is a testing comment. You shouldn\'t be able to see this.' },
        { author: 'ebxn', body: 'Hello there, this is a testing comment. You shouldn\'t be able to see this.' },
        { author: 'ebxn', body: 'Hello there, this is a testing comment. You shouldn\'t be able to see this.' },
        { author: 'ebxn', body: 'Hello there, this is a testing comment. You shouldn\'t be able to see this.' },
        { author: 'ebxn', body: 'Hello there, this is a testing comment. You shouldn\'t be able to see this.' },
        { author: 'ebxn', body: 'Hello there, this is a testing comment. You shouldn\'t be able to see this.' },
        { author: 'ebxn', body: 'Hello there, this is a testing comment. You shouldn\'t be able to see this.' },
        { author: 'ebxn', body: 'Hello there, this is a testing comment. You shouldn\'t be able to see this.' },
        { author: 'ebxn', body: 'Hello there, this is a testing comment. You shouldn\'t be able to see this.' },
        { author: 'ebxn', body: 'Hello there, this is a testing comment. You shouldn\'t be able to see this.' },
        { author: 'ebxn', body: 'Hello there, this is a testing comment. You shouldn\'t be able to see this.' },
        { author: 'ebxn', body: 'Hello there, this is a testing comment. You shouldn\'t be able to see this.' },
        { author: 'ebxn', body: 'Hello there, this is a testing comment. You shouldn\'t be able to see this.' }
      ]
    }
  },
  created () {
    const vm = this
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) vm.$emit('close')
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
      justify-content: center;
    }
  }

  & .box {
    overflow: hidden;
    padding: 0;
    margin: 0;
  }

  & .post-image {
    width: auto;

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
    align-self: flex-start;

    & .media {
      align-items: center;
      word-wrap: break-all;
    }

    & .media-left {
      margin-right: 0.5rem;
    }

    & .date {
      margin-top: -1rem;
    }
  }

  .post-divider {
    margin: 0.5rem 0;
  }

  & .comments {
    width: 100%;

    // desktop
    @media screen and (min-width: 769px) {
      height: 356.5px;
      overflow: auto;
    }
  }

  & .field {
    margin-top: 0.5rem;
    align-self: flex-end;
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
