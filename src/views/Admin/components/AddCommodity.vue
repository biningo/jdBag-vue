<template>
    <div>

        <el-form :model="goodsForm" :rules="rules" ref="goodsForm" label-width="100px" >
            <el-form-item label="名称" prop="title">
                <el-input v-model="goodsForm.title"></el-input>
            </el-form-item>
            <el-form-item label="分类" prop="categoryName">

                <el-select v-model="goodsForm.categoryName" placeholder="请选择分类">

                    <el-option v-for="i in categories" :label="i" :value="i" :key="i"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="是否推荐" prop="recommend">
                <el-switch v-model="goodsForm.recommend"></el-switch>
            </el-form-item>


            <el-form-item  label="商品描述" prop="summary">
                <el-input :rows="10" type="textarea" v-model="goodsForm.summary"></el-input>
            </el-form-item>


            <el-form-item>
                <div style="text-align: center;height:300px;overflow: scroll" class="demo-image__lazy">
                    <el-image style="height: 300px;width: 100%" v-for="url in mainUrls" :key="url" :src="url" lazy></el-image>
                </div>
            </el-form-item>
            <el-form-item  label="主要图片" prop="mainImage">
                <el-input :rows="10" type="textarea" v-model="goodsForm.mainImage"></el-input>
            </el-form-item>




            <el-form-item>
                <div style="text-align: center;height:300px;overflow: scroll" class="demo-image__lazy">
                    <el-image style="height: 300px;width: 100%" v-for="url in detailUrls" :key="url" :src="url" lazy></el-image>
                </div>
            </el-form-item>
            <el-form-item  label="细节图片" prop="detailImage">
                <el-input :rows="10" type="textarea" v-model="goodsForm.detailImage"></el-input>
            </el-form-item>





            <el-form-item>
                <el-button type="primary" @click="submitForm('goodsForm')">保存</el-button>

            </el-form-item>


        </el-form>


    </div>
</template>

<script>
    import request from "../../../network/request";

    export default {
        name: "AddCommodity",

        data(){
            return{

                categories:[],
                categoriesBean:'',
                goodsForm: {
                    title: '',
                    categoryName: '',
                    recommend: false,
                    summary: '',
                    detailImage: '',
                    mainImage: ''
                },
                rules: {
                    title: [
                        { required: true, message: '请输入名称', trigger: 'blur' },

                    ],
                    summary: [
                        { required: true, message: '请填写概要', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted(){

            request({
                url:'/goods/categories'
            }).then(resp=>{
                this.categoriesBean = resp.data;
                for(var i=0;i<this.categoriesBean.length;i++){
                    this.categories.push(this.categoriesBean[i].categoryName)
                }
                this.categories.push("other")
            }).catch(err=>{alert("error")})




        },
        methods:{

            // editCommodity(commodity){
            //   this.commodity = commodity;
            // },

            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        request({
                            url:'/goods/savegoods',
                            params:this.goodsForm
                        }).then(resp=>{
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            this.goodsForm = resp.data

                        }).catch(err=>{alert("error")})


                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        computed:{
            mainUrls(){ return  this.goodsForm.mainImage.split('\n').filter(i => i!='')},
            detailUrls(){ return  this.goodsForm.detailImage.split('\n').filter(i=>i!='')},

        }

    }
</script>

<style scoped>

</style>