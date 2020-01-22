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
                <el-button type="primary" @click="NewCategory"  style="margin-left: 1%" icon="el-icon-plus">添加分类</el-button>
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



        <el-dialog title="分类" :visible.sync="edit">
            <el-form :model="categoryForm" ref="categoryForm">
                <el-form-item label="分类名称"
                              prop="categoryName"
                              :rules="[
      { required: true, message: 'Content cannot be empty'},
      { type: 'string', message: ''},
      { max:100,message:'too long!'}
    ]">
                    <el-input v-model="categoryForm.categoryName"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="edit = false">取 消</el-button>
                <el-button @click="deleteCategory" type="danger">删除分类</el-button>
                <el-button type="primary" @click="confirmSave('categoryForm')">确 定</el-button>
            </div>
        </el-dialog>



    </div>
</template>

<script>
    import request from "../../../network/request";

    export default {
        name: "AddCommodity",

        data(){
            return{
                isEdit:false,
                edit:false,
                categoryForm:{
                    categoryName:'',
                    id:''
                },

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
        methods: {

            // editCommodity(commodity){
            //   this.commodity = commodity;
            // },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        request({
                            url: '/goods/savegoods',
                            params: this.goodsForm
                        }).then(resp => {
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            this.goodsForm = resp.data
                            this.goodsForm.id = null  //id为空 方便多次保存多个商品
                        }).catch(err => {
                            alert("error")
                        })


                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },


            //分类
            Edit(i) {
                this.categoryForm = i;
                this.edit = true;
                this.isEdit = true;
            },
            NewCategory() {
                this.categoryForm = {
                    categoryName: '',
                    id: ''
                };
                this.isEdit = false
                this.edit = true;

            },
            confirmSave(formName) {


                this.$refs[formName].validate((valid) => {

                    if (valid) {
                        request({
                            url: '/goods/savecategory',
                            params: this.categoryForm
                        }).then(resp => {
                            if (!this.isEdit)
                                this.categories.splice(this.categories.length-1,0,this.categoryForm.categoryName)
                                //this.categories.push(this.categoryForm.categoryName);
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            this.edit = false
                        }).catch(err => {
                            alert("error")
                        })
                    } else {
                        alert("数据不完整")
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