<template>
    <div>
        <div style="display: block">

        <el-button style="" @click="NewCategory" type="primary">添加</el-button>

        </div>
        <div style="margin-top:1%">
        <el-button v-for="i in categories" @click="Edit(i)" :key="i">{{i.categoryName}}</el-button>
        </div>


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
        name: "EditCategory",
        data(){
            return {

                isEdit:false,
                edit:false,
                categories:'',


                categoryForm:{
                    categoryName:'',
                    id:''
                },

            }
        },
        mounted(){

            request({
                url:'/goods/categories'
            }).then(resp=>{
                this.categories = resp.data
            })
                .catch(err=>{alert("error")})

        },
        methods:{
            deleteCategory(){
                request({
                    url:'/goods/deletecategory',
                    params: this.categoryForm
                }).then(resp=>{

                    for(var i=0;i<this.categories.length;i++){
                        if(this.categories[i].id==this.categoryForm.id)
                            this.categories.splice(i,1);
                    }
                    this.edit=false
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.edit=false;
                }).catch(error=>{
                    alert("无此分类")
                })
            },
            Edit(i){
                this.categoryForm=i;
                this.edit=true;
                this.isEdit=true;
            },
            NewCategory(){
                this.categoryForm={
                    categoryName:'',
                    id:''
                };
                this.isEdit=false
                this.edit=true;

            },
            confirmSave(formName) {


                this.$refs[formName].validate((valid) =>{

                    if(valid)
                    {
                        request({
                            url: '/goods/savecategory',
                            params: this.categoryForm
                        }).then(resp => {
                            if (!this.isEdit)
                                this.categories.push(this.categoryForm);
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            this.edit = false
                        }).catch(err => {
                            alert("error")
                        })
                    }
                    else{
                        alert("数据不完整")
                    }



                });


            }

        }
    }
</script>

<style scoped>

</style>