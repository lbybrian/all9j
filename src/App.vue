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

<style>
  html,body{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: SourceHanSansCN-Regular, 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*color: rgba(0,0,0,0.65);*/
    color: #47AFAE;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    /*background-color: rgba(14,238,252, 0.1);*/
    /*background-image: url("./assets/image/bg.png");
    background-size: 100% 100%;
    background-repeat: round;*/
  }
</style>
