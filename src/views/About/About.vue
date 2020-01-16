<template>
    <div style="">

        <div>
            <p class="font-content" @click="gotoHome">
            xxxxxxxxxxxxx.com
            </p>
        </div>

        <div style="padding: 1%">

        <el-row style="margin-bottom: 2%">

                <el-col :span="30">
                    <el-card shadow="always" style="height: 50%">
                        <div style="text-align: center;">
                            <img style="height: 50%" src="../../assets/logo.png">
                        </div>
                        <p class="font-content" style="text-indent:40px;text-align: left;font-size: 20px">
                            Jiade Bag Inc.
                            2nd Building Hongri Workshop
                            Huazheng Group
                            Lingxi Industrial Zone Cangnan County,
                            Wenzhou City, Zhejiang, China


                        </p>

                    </el-card>
                </el-col>

            </el-row>

        <el-row :gutter="10">
            <el-col :span="12">
                <el-card shadow="always" style="height: 50%">
                   <p class="font-content" style="font-size: 30px">
                       <i class="el-icon-phone-outline" style="font-size: 40px;"></i><br>
                    008613989767350<br>
                    008615869463688

                   </p>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card   shadow="always" style="text-align: center;height: 50%">

                    <p  @click="gotoMessage" class="font-content">
                    Give me Letter<br>
                        <i class="el-icon-message" style="font-size: 40px;"></i>
                    </p>
                </el-card>
            </el-col>
        </el-row>



        </div>




        <Footer></Footer>

    </div>
</template>

<script>

    import Footer from '../../components/footer'

    export default {
        name: "About",
        methods:{
            gotoMessage(){
                this.$router.push("/message")
            },
            gotoHome(){
                this.$router.push('/home')
            },
        },
        components:{
            Footer
        }
    }
</script>

<style scoped>

    .font-content {
        font-size: 30px;text-align: center;
        font: italic 2em Georgia, serif;
    }

    .font-content:hover {
        color: #0080ff;
    }

</style>