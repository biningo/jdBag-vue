<template>
    <div>

        

        
<div style="margin-bottom: 2%"></div>

<!--        标题头 Letter-->
        <div style="text-align: center">
            <p><strong style="font: italic 2em Georgia, serif;">Letter</strong></p>
        </div>

<div style="margin-right:10%">
        <el-form :model="messageForm" ref="messageForm" label-width="100px" class="demo-ruleForm">
            <el-form-item
                    label="Name"
                    prop="name"
                    :rules="[
      { required: true, message: 'Name cannot be empty'},
      { type: 'string', message: '姓名必须为字符串'},
      {max:100,message:'too long!'}
    ]"
            >
                <el-input type="name"  v-model="messageForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
                    label="contact"
                    prop="contact"
                    :rules="[
      { required: true, message: 'Contact information cannot be empty'},
      { type: 'string', message: '确保联系方式可用'},
      { max:500,message:'too long!'}
    ]"
            >
                <el-input  placeholder="Make sure the contact information is correct so that we can contact you" v-model="messageForm.contact" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
                    label="address"
                    prop="address"
                    :rules="[
      { required: true, message: 'Address cannot be empty'},
      { type: 'string', message: ''},
      { max:1000,message:'too long!'}
    ]"
            >
                <el-input  v-model="messageForm.address" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item
                    label="content"
                    prop="content"

                    :rules="[
      { required: true, message: 'Content cannot be empty'},
      { type: 'string', message: ''},
      { max:2000,message:'too long!'}
    ]">
                <el-input :rows="10" placeholder="What do you want to say to us......" type="textarea" v-model="messageForm.content"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button :loading="loading" type="primary" @click="submitForm('messageForm')">send</el-button>
                <el-button @click="resetForm('messageForm')">reset</el-button>
            </el-form-item>
        </el-form>
</div>


     <Footer></Footer>


    </div>
</template>

<script>


    import Footer from '../../components/footer'
    import request from "../../network/request";

    export default {
        name: "Message",

        data(){
            return {
                messageForm: {
                    loading:false,
                    name: '',
                    contact:'', //联系方式
                    address:'',
                    content:'',


                }
            }
        },

        methods:{

            open() {
                this.$alert('Submitted successfully', 'Successfully', {
                    confirmButtonText: 'OK',

                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading=true;
                        request({
                            url:'/message/save',
                            params:this.messageForm
                        }).then(resp=>{
                            this.open();
                            const h = this.$createElement;

                            this.$notify({
                                title: 'Submit successfully',
                                message:  h('i', { style: 'color: teal'},'Thank you for your letter!'),
                                position: 'top-left',
                                type: 'success'
                            });
                            this.loading=false;


                        })
                            .catch(err=>{
                                alert("error");
                                this.loading=false;
                            });



                    } else {
                        this.$message({
                            message: 'Content cannot be empty',
                            type: 'warning'
                        });
                        return false;
                    }
                });
            }

        },
        components:{
            Footer
        },
        mounted(){

        },
    }
</script>

<style scoped>

</style>