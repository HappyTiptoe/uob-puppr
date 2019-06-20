<template lang="pug">
.home-controls-toggle
  .icons.is-flex
    //- grid
    span.icon(
      :class="{ 'is-active': activeIcon==='grid' }"
      @click="toggleActiveIcon('grid')"
    )
      i.fas.fa-th-large

    //- list
    span.icon(
      :class="{ 'is-active': activeIcon==='list' }"
      @click="toggleActiveIcon('list')"
    )
      i.fas.fa-th-list
</template>

<script>
export default {
  name: 'HomeControlsToggle',
  data () {
    return {
      activeIcon: 'grid'
    }
  },
  methods: {
    toggleActiveIcon (icon) {
      this.activeIcon = icon
    }
  }
}
</script>

<style lang="scss" scoped>
.home-controls-toggle {
  width: 100%;
  height: 100%;
}
.icons {
  height: 100%;
  align-items: center;
  justify-content: center;

  & .icon {
    font-size: 2rem;
    opacity: 0.5;

    &.is-active {
      opacity: 1;
    }

    &:not(:last-child) {
      margin-right: 3rem;

      @media screen and (max-width: 768px) {
        margin-right: 2rem
      }
    }
  }
}
</style>
