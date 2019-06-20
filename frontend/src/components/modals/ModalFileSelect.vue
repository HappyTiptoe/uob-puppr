<template lang="pug">
.file.is-centered.has-name.is-boxed
  label.file-label
    input.file-input(
      type="file"
      @change="onChange"
    )

    span.file-cta
      span.file-icon
        i.fas.fa-upload
      span.file-label Select a file...

    span.file-name.has-text-centered {{ filename }}
</template>

<script>
export default {
  name: 'ModalFileSelect',
  data () {
    return {
      filename: ''
    }
  },
  methods: {
    onChange (e) {
      const [file] = e.target.files
      this.filename = file.name
      this.$emit('file-select', file)
    }
  }
}
</script>

<style lang="scss" scoped>
.file {
  width: 100%;
}
</style>
