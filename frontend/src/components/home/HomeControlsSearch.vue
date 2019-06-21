<template lang="pug">
.field
  .control.has-icons-left
    input.input.is-rounded(
      v-model="query"
      ref="homeControlsSearch"
      placeholder="Search images..."
      @input="$emit('input', query.toLowerCase())"
    )
    span.icon.is-small.is-left
      i.fas.fa-search
</template>

<script>
export default {
  name: 'HomeControlsSearch',
  data () {
    return {
      query: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.field {
  width: 100%;
}
</style>
