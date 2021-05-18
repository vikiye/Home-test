<template>
  <div id="app">
    <Animation />
    <Post />
    
  </div>
</template>

<script>

import Animation from './components/Animation'

import Post from './components/Post'
export default {
  name: 'App',
  components: {
 
    Animation,
    Post
    
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@200&family=Roboto:wght@100&display=swap');
body, html {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background: #5256ad;
}
* {
  font-family: 'Roboto Slab', serif;
}
#app{
  text-align: center;
  background: #5256ad;
  color:white;
  width:100%;
  height: 100%;
}
.bg1{
  background-color: #dccfec;
}
.bg2{
  background-color: #5256ad;
}
[v-cloak] {
  display: none;
}
@media (min-width: 674px) {
  .area{
  border: 2px dashed white;
  width: 600px;
  height: 250px;
  margin: auto;
}
@media (max-width:674px){
  .smallerarea{
  width: 400px;
  height: 110px;
  border: 2px dashed white;
  }
  .smheader{
    font-size: 1.5em;
  }
}
}

.area,span:hover{
  cursor: pointer;
}
li > span {
  color:red;
  margin-left: 10px;
}
span{
  font-size: 1.5em;
}
button{

  border: white;
  color: #5256ad;
  background-color: white;
  font-size:15px;
  width: 80px;
  height: 40px;
  font-weight: bold;
  
}
.btn{
   font-size:15px;
   margin-left: 5px;
   border: 1px solid ;
   background-color: white;
}

.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    width: 100%;
    height: 100%; 
    overflow-y:auto; /* Enable scroll if needed */
    background-color: white;
    color: black;
    padding-top: 0;
}
.close {
    position: absolute;
    right: 15px;
    top: 10px;
    font-size: 35px;
    font-weight: bold;
    color:black;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    opacity: 0.7;
    cursor: pointer;
  }
#loader{
  position:absolute;
  top:18%;
  left:40%;
  width:100px;
  height:100px;
}

#dataView{
  border:2px dashed #5256ad;
  margin:60px;
}  
ul{
  padding: 40px;
  list-style-type: none;
  margin-top:100px;
}
li{
  margin-top: 10px;
  margin-bottom:10px;
  
}
#lastResult{
  margin-top:70px;
}
details > p,details > button {
  margin-top: 10px;
  margin-bottom: 10px;
}

</style>

