<template>
  <div id="app">
      <Header />
      <Tab />
      <router-view />
  </div>
</template>

<script>
import Header from './components/header/Header'
import Tab from './components/tab/Tab'

export default {
  components:{
    Header,
    Tab
  }
}
</script>

<style lang="scss" scoped>

</style>
