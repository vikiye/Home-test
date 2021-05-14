<template>
    <div class="file-upload-wrapper">
<!-- make a form -->
        
        <form @submit="postData" method="post" class="container-fluid">
            <input type="file" name="file" ref="file"  v-on:change="handleFileUpload()"><br>
           <br> <button type="submit">Submit</button>
            
           
        </form>
    </div> 
</template>
<script>
//install and import axios
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

export default {
    name:"Post",
    data(){
        return{
           file:'',
           report:''
        }

    },

    methods: {
//get form files 
        handleFileUpload(){
    this.file = this.$refs.file.files[0];
  },

    postData(e)
        {
        const formData = new FormData;
        formData.append('fileData', this.file);
        const headers = {'Content-Type':'application/x-www-form-urlencoded',
        'Authorization':  'Bearer curl -X POST https://app.debricked.com/api/login_check --data-urlencode _username=lucyandluly@hotmail.com --data-urlencode _password=Yyy@12345678'
};
//submit data to api
         this.axios.post('http://localhost:8081/api/1.0/open/uploads/dependencies/files', formData, { headers })
        .then(res => {
        console.log("Request complete! response:", res.data);
        })
        .catch(error =>{
            console.log("Error!", error)
        });
//get data from api       
        this.axios.get('http://localhost:8081/api/1.0/open/ci/upload/status', { headers })
            .then(res =>{
                this.report=res.data.data;
                console.log(res.data)
            })
            .catch(error =>{
            console.log("Error!", error)
        });   
        e.preventDefault();//preventing from default behaviour
      
        },
    }
        
}
</script>