<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="scss">
  .btn-icon {
    font-size: 10px;
  }

  .el-btn-red {
    color: #FA6962 !important;

    &:hover {
      opacity: 0.9;
    }

    &:active {
      opacity: 0.7;
    }
  }
</style>
