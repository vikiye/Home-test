<template>
  <div id="app">
   
    <Post />
    
  </div>
</template>

<script>
import Post from './components/Post'

export default {
  name: 'App',
  components: {
    Post

  }
}
</script>

<style>

*{
 
 font-family:monospace;
}
body{
    display: flex;
    align-items:center;
    justify-content: center;
    min-height:100vh; 
}

button{
  float: right;
}
form{
 
  height: 100px;
  width: 300px;

}
</style>
