<template>
    <div >

    <el-row>

<!--        左边导航-->
        <el-col  :span="4">

            <el-menu
                    :default-active="navIndex"
                    class="el-menu-vertical-demo"


                    text-color="black"
                    active-text-color="blue">
                <el-submenu index="1">

                    <template slot="title">
                    <i class="el-icon-s-goods"></i>
                    <span slot="title">商品</span>
                    </template>
                    <el-menu-item-group>

                        <el-menu-item index="overview" @click="Link('overview')">全部商品</el-menu-item>
                        <el-menu-item index="add" @click="Link('add')">添加商品</el-menu-item>
                        <el-menu-item index="EditCategory" @click="Link('category')">添加分类</el-menu-item>
                    </el-menu-item-group>

                </el-submenu>

                <el-menu-item index="MessageOverView" @click="Link('messageoverview')">
                    <i class="el-icon-chat-dot-square"></i>
                    <span slot="title">留言</span>
                </el-menu-item>
                <el-menu-item index="poster" @click="Link('poster')">
                    <i class="el-icon-picture"></i>
                    <span slot="title">宣传海报</span>
                </el-menu-item>

                <el-menu-item index="4">
                    <i class="el-icon-s-tools"></i>
                    <span slot="title">系统</span>
                </el-menu-item>


            </el-menu>
        </el-col>

<!--        右侧内容-->
        <el-col style="margin-left: 4%;margin-top: 2%" :span="18">



           <router-view></router-view>



        </el-col>

    </el-row>

<el-row>

</el-row>






    </div>
</template>

<script>
    import Footer from '../../components/footer'
    export default {
        name: "Admin",
        mounted(){

        },
        data(){
            return{

            }
        },
        computed:{
            navIndex() {
                return this.$route.name;
            }
        },
        methods:{
            Link(path){

                this.$router.push("/admin/"+path)

            },
        },
        components:{
            Footer
        }


    }
</script>

<style scoped>

</style>