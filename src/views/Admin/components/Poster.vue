<template>
    <div>
        <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" >
            <el-form-item>
                <div style="text-align: center;height:300px;overflow: scroll" class="demo-image__lazy">
                    <el-image style="height: 300px;width: 100%" v-for="url in detailUrls" :key="url" :src="url" lazy></el-image>
                </div>
            </el-form-item>
            <el-form-item  label="宣传海报" prop="imgUrl">
                <el-input :rows="10" type="textarea" v-model="ruleForm.imgUrl"></el-input>
            </el-form-item>


            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>

            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    import request from "../../../network/request";

    export default {
        name: "RecommendImage",
        data(){
            return {
                ruleForm:{
                    id:'',
                    imgUrl:''
                }
            }
        },
        mounted(){
          request({
              url:'/poster/all'
          }).then(resp=>{
              this.ruleForm = resp.data[0]?resp.data[0]:{
                  id:'',
                  imgUrl:''
              };
          })  .catch(err=>{
              alert("err")
          })
        },
        computed:{
            detailUrls(){
                return this.ruleForm.imgUrl.split('\n').filter(i=>i!='');
            }
        },
        methods:{
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        request({
                            url:'/poster/save',
                            params:this.ruleForm
                        }).then(resp=>{
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });





                        }).catch(err=>{alert("bcerror")})


                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>