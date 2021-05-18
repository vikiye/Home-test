<template>
    <div class="container-fluid">
<!-- make a form -->
        <form @submit="postData" method="post" class="container-fluid">
            <div class=" bg2 area smallerarea" @dragover="dragover" @dragleave="dragleave" @drop="drop">
           
            <input type="file" name="file" ref="file"  id="assetsFieldHandle" v-on:change="handleFileUpload()" hidden><br>
             <label for="assetsFieldHandle" class="block cursor-pointer">
            <div class="notice">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="white" class="bi bi-cloud-arrow-up" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"/>
            <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
            </svg>
                <p style="margin-top:15px">Drag and drop files here 
                or <span>click here</span> to upload their files</p>
            </div>
            </label>
            <ul v-if="this.file" v-cloak>
            <span class="notice">
                {{ this.file.name }}
            </span>
            </ul>
            
            
            </div>
            <br><button type="submit" @click="emerge" style="font-weight:600">Submit</button><br>
        </form>

        <details id="lastResult">
            <summary>Show previous scan results</summary>
           <p id="last">
               <ul>
             <li>Progress: {{storeData.progress}}</li>
             <li>Vulnerabilities: {{storeData.vulnerabilitiesFound}}</li>
             <li>Unaffected vulnerabilities: {{storeData.unaffectedVulnerabilitiesFound}}</li>
             <li>Policy engine action: {{storeData.policyEngineAction}}</li>
             </ul>
           </p>
          
           <button @click="deletebtn" style="margin-left:10px" id="delete">Delete</button> 
        </details>
        

        <div id="processpage" class="modal">

            <span @click="close" class="close" title="Close Modal">&times;</span>
        <h2 style="margin-top:50px;margin-bottom:70px;color:#5256ad">
            Your Dependency's Security Posture</h2>
        
        <div id="loader">
            <img src="@/assets/duck.gif" alt="loading" width="40px" height="40px"/>
        </div>
        <ul id="dataView">
            <li>Progress: <span>{{data.progress}}</span></li>
            <li>Vulnerabilities Found: <span>{{data.vulnerabilitiesFound}}</span></li>
            <li>Unaffected Vulnerabilities Found: <span>{{data.unaffectedVulnerabilitiesFound}}</span></li>
            <li>Policy Engine Action: <span>{{data.policyEngineAction}}</span></li>
        </ul>
        
         
          </div>
          
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
           request3:'',
           id:'',
           data:"",
           itemsArray:[],
           storeData:'',
        }

    },
//check if there is array stored in localstrage 
  mounted() {
      
  if (localStorage.getItem("items")){
    this.storeData = JSON.parse(localStorage.getItem("items"))
    this.storeData = this.storeData[0]
    console.log(this.storeData)
  } else {
      document.getElementById('delete').style.display = 'none'
  }
},
    methods: {
    deletebtn(){
        console.log('delete')
        localStorage.clear()
        document.getElementById('last').style.display = 'none'
        document.getElementById('delete').style.display = 'none'
        },
//get form files 
        handleFileUpload(){
    this.file = this.$refs.file.files[0];
  },
 
//*****************The drag and drop file area*****************//
    dragover(e) {
      e.preventDefault();
      // Add some visual fluff to show the user can drop its files
      if (!e.currentTarget.classList.contains('bg1')) {
        e.currentTarget.classList.remove('bg2');
        e.currentTarget.classList.add('bg1');
        
      }
    },
    dragleave(e) {
      // Clean up
      e.currentTarget.classList.remove('bg1');
      e.currentTarget.classList.add('bg2');
     
    },
    drop(e) {
      e.preventDefault();
      this.$refs.file.files = e.dataTransfer.files;// hold the data that is being dragged during a drag and drop operation.
      console.log(this.$refs.file.files)
      this.handleFileUpload(); // Trigger the onChange event manually
      // Clean up
      e.currentTarget.classList.remove('bg1');
      e.currentTarget.classList.add('bg2');
    },
//*****************submit data to api*****************//
    postData(e)
        {
    e.preventDefault();//preventing from default behaviour
        const formData = new FormData;
        var id
        formData.append('repositoryName', 'unknown');
        formData.append('commitName', 'unknown');
        formData.append('fileData', this.file);
        const headers = {'Content-Type':'application/x-www-form-urlencoded',
        'Authorization':  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJpYXQiOjE2MjEzNDkzNDMsImV4cCI6MTYyMTM1Mjk0Mywicm9sZXMiOlsiUk9MRV9VU0VSIiwiUk9MRV9DT01QQU5ZX0FETUlOIl0sInVzZXJuYW1lIjoiOTk4Y2IyZGY4MjNjYjhjNzQ3MTA2NjFmYTU2NTVkNzk3ZjE3NDAxMCJ9.aUyfs3GL3M8f0Bth3vCDR8RTqL52EbhCOugkchMCuvNdaU6S-R6_Xsnzyx5NC652Y9nhwVgfzZKRNymuQDCB9IZysc14wclcqv4tX2bSaE-GYaopWvsMK4hmAZGQ5Z5nL7h0s1t7iClT6D6Ccgax9E7BsM6JiThY-uAREwoca2B_TP1wu6esIC8-9bWK_4mXbHKmGKkujKByJwy8mtkKyRtnxFZCeek5-OBOTbNQq8dLBHfTOajQHzCocCyy2aCIizMRp-YmpoW1HvR5RAQsF7bppcYPX7EoObs6T4GAV9qc_wevP_xAkVZ1WqA64aueBxWeOeCtv1WBpgVMcjrBVy4DYj95MvPzwy2a9t2wpEL56ALU00WoU4lBG0FXTMmyakFUPmvrG_QcY0ZQsWw7El3PjbEEOfO7biUiaw7hIusWnPKNWyh6oXWpc68ZqUXv08WHFpgDYIbo_-fihWKt2qJ_Km5VzV2Bc5Fw5nZzAs-BWWygZNm17UNG4uP5YSkZ-bDtf4cIkOgVdqoB4ae27pu7HM7NYZ0szIcjBysjk0FasBIUQ1WcMsrplTIuQheNO1g1TnJ8rkZDrsck-DAFLQXElcLP7E97rEl9-uyDwEMkJuohoED4bOI88KO1bg44-P3vl-pSgq6N66o4yVj10u33zLSPvQ58B5V2GDWYhxs'
};
//send the post requests
        this.axios.post('http://localhost:8081/api/1.0/open/uploads/dependencies/files', formData, { headers })//request 1
        .then(res =>{
        console.log("Request complete! response:", res.data);
        id = res.data.ciUploadId;
        console.log(id)
        formData.append('ciUploadId', id)
        this.axios.post('http://localhost:8081/api/1.0/open/finishes/dependencies/files/uploads', formData, { headers })//request 2
        .then(res => {
        console.log("Request complete! response:", res.data);
        this.getResult(id)//trigger the getResult function to send get requests after post request has sent successfully
        })
        .catch(error =>{
            console.log("Error!", error)
        });
        
         })  
        },
//***********************get data from api******************//  
             
     async getResult(fileid){
            const headers = {'Content-Type':'application/x-www-form-urlencoded',
        'Authorization':  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJpYXQiOjE2MjEzNDkzNDMsImV4cCI6MTYyMTM1Mjk0Mywicm9sZXMiOlsiUk9MRV9VU0VSIiwiUk9MRV9DT01QQU5ZX0FETUlOIl0sInVzZXJuYW1lIjoiOTk4Y2IyZGY4MjNjYjhjNzQ3MTA2NjFmYTU2NTVkNzk3ZjE3NDAxMCJ9.aUyfs3GL3M8f0Bth3vCDR8RTqL52EbhCOugkchMCuvNdaU6S-R6_Xsnzyx5NC652Y9nhwVgfzZKRNymuQDCB9IZysc14wclcqv4tX2bSaE-GYaopWvsMK4hmAZGQ5Z5nL7h0s1t7iClT6D6Ccgax9E7BsM6JiThY-uAREwoca2B_TP1wu6esIC8-9bWK_4mXbHKmGKkujKByJwy8mtkKyRtnxFZCeek5-OBOTbNQq8dLBHfTOajQHzCocCyy2aCIizMRp-YmpoW1HvR5RAQsF7bppcYPX7EoObs6T4GAV9qc_wevP_xAkVZ1WqA64aueBxWeOeCtv1WBpgVMcjrBVy4DYj95MvPzwy2a9t2wpEL56ALU00WoU4lBG0FXTMmyakFUPmvrG_QcY0ZQsWw7El3PjbEEOfO7biUiaw7hIusWnPKNWyh6oXWpc68ZqUXv08WHFpgDYIbo_-fihWKt2qJ_Km5VzV2Bc5Fw5nZzAs-BWWygZNm17UNG4uP5YSkZ-bDtf4cIkOgVdqoB4ae27pu7HM7NYZ0szIcjBysjk0FasBIUQ1WcMsrplTIuQheNO1g1TnJ8rkZDrsck-DAFLQXElcLP7E97rEl9-uyDwEMkJuohoED4bOI88KO1bg44-P3vl-pSgq6N66o4yVj10u33zLSPvQ58B5V2GDWYhxs'
};
            const formData = new FormData;
            
            formData.append('fileData', this.file);
            formData.append('ciUploadId', fileid)
//send the get requests   
            let response = await fetch('http://localhost:8081/api/1.0/open/ci/upload/status?ciUploadId='+fileid+'',  { headers })//request 3
            this.data  = await response.json()
            this.itemsArray.push(this.data)
            localStorage.setItem('items', JSON.stringify(this.itemsArray))
            console.log('!!!!!', this.itemsArray)
//make a loader, if data is ready, remove loader     
            const loader = document.getElementById('loader')  
            if(this.data!=undefined){ 
                loader.style.display = 'none'
      } 
      
        },
//call the processPage emerge on the top of original page , the scan result will display on it       
         emerge(){
            document.getElementById('processpage').style.display='block' 
    },
//A close button to close the result page
        close(){
            document.getElementById('processpage').style.display='none'
        }
         },
         
       
}

</script>


