<template lang="pug">
.field
  .control.has-icons-left
    input.input.is-rounded(
      :value="value"
      ref="homeControlsSearch"
      placeholder="Search images..."
      @input="$emit('input', $refs.input.value)"
    )
    span.icon.is-small.is-left
      i.fas.fa-search
</template>

<script>
export default {
  name: 'HomeControlsSearch',
  props: {
    value: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.field {
  width: 100%;
}
</style>
