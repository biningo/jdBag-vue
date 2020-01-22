<template>
  <div id="app" style="margin: 0px;height: 100%;width: 100%">

      <div class="menu">
          <el-menu

                  :default-active="navIndex"

                  mode="horizontal"

                  background-color="#2C3E50"
                  text-color="#FFFFFF"
                  active-text-color="#ff5c04">
              <img style="margin-left: 1%;margin-top: 0.5%;float: left;width: 50px;height: 47px" src="./assets/logo.png" >
              <el-menu-item style="margin-left: 2%;" index="home" @click="Link('home')">Home</el-menu-item>
              <el-menu-item index="category" @click="Link('category')"><i class="el-icon-goods"></i>All bags</el-menu-item>
              <el-menu-item index="message" @click="Link('message')"><i class="el-icon-message"></i>Leaving a Message</el-menu-item>
              <el-menu-item index="about" @click="Link('about')"><i class="el-icon-phone-outline"></i>About</el-menu-item>


          </el-menu>
      </div>


        <router-view></router-view>


  </div>
</template>

<script>


import request from "./network/request";

export default {
    name: 'app',
    data() {
        return {};
    },
    computed: {
        navIndex() {
            return this.$route.name;
        }
    },
    methods: {
        Link(path) {
            if (path !== 'category')
                this.$router.push('/' + path);
            else {
                this.$router.push({
                    path: '/' + path,
                    query: {
                        categoryName: 'all',
                        page: 1
                    }
                })
            }
        }
    },

    watch: {
        //权限控制
        '$route.path': function (newVal, oldVal) {
            if (newVal.indexOf('admin') !== -1) {

                if(this.$store.state.isLogin){

                    this.$router.push(newVal)
                }
                else{
                    var token = localStorage.getItem("token");
                    request({
                        url:'/admin/check',
                        method:'get',

                    }).then(resp=>{
                        if(token===resp.data){

                            this.$router.push(newVal)
                        }else{
                            this.$router.push("/login")
                        }
                            })
                      .catch(err=>{this.$router.push("/login")})
                }

            }
        }
    }



}
</script>

<style scoped>
    .menu {




        width: 100%;


    }

</style>
