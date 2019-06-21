<template lang="pug">
  .wrapper.is-flex
    figure.image
      img(:src="image")
</template>

<script>
export default {
  name: 'FourOhFour',
  data () {
    return {
      image: require('@/assets/404.jpg')
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  margin-top: 5.25rem;
  height: calc(100vh - 5.25rem);
  justify-content: center;
  align-items: center;
  background-color: black;
}
</style>
