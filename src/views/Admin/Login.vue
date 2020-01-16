<template>
    <div>

        <div style="margin-bottom: 5%">
            <el-card shadow="always">欢迎您！管理员 请登录</el-card>
        </div>

        <el-card style="width: 50%;margin: auto;" shadow="hover">

                <div style="text-align: center">
            <img src="../../assets/logo.png" style="width: 10%;margin-bottom: 3%;">
                </div>
        <el-form ref="admin" label-width="100px" :model="admin" >
            <el-form-item label="UserName"
                          prop="username"
                          :rules="[
      { required: true, message: '不能为空'},
      { type: 'string', message: ''},
      { max:3000,message:'too long!'}
      ]"
            >
                <el-input v-model="admin.username"></el-input>
            </el-form-item>
            <el-form-item label="Password"
                          prop="password"
                          :rules="[
      { required: true, message: '不能为空'},
      { type: 'string', message: ''},
      { max:3000,message:'too long!'}]"
            >
                <el-input v-model="admin.password"></el-input>
            </el-form-item>
            <el-button style="margin-left: 80%" type="primary" @click="Login('admin')">登录</el-button>


        </el-form>

        </el-card>


    </div>
</template>

<script>

import request from "../../network/request"
import axios from 'axios'
import qs from 'qs'

// //设置axios为form-data
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.transformRequest = [function (data) {
//     let ret = ''
//     for (let it in data) {
//         ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//     }
//     return ret
// }]
//
//
// //然后再修改原型链
// Vue.prototype.$axios =   axios;

    export default {
        name: "Login",
        data(){
            return {
                admin:{
                    username:'',
                    password:''
                }
            }
        },
        methods:{
            Login(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // let data = new URLSearchParams();
                        //
                        //     data.append('username',this.admin.username);
                        //     data.append('password',this.admin.password);

                        request({

                            url:'/admin/login',
                            method:'post',
                            params:this.admin        //params用于get请求


                        }).then(resp=>{
                            localStorage.setItem("token",resp.data);
                            this.$store.state.isLogin = true;
                           this.$router.push("/admin");
                        }).catch(error=>{

                            alert("账号或密码错误")
                        })

                    } else {
                        alert('error submit!!');
                        return false;
                    }


                });
            }  //登录检查
        }
    }
</script>

<style scoped>

</style>