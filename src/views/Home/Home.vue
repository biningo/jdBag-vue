<template>

    <div class="top"   >


        <!--      通知-->
        <el-alert
                    title="Welcome!"
                    type="info">
            </el-alert>



        <!--页头-->
        <div   style="margin-bottom: 7%">

            <!--轮播-->
            <div >
                <el-carousel     height="90%" >
                    <el-carousel-item v-for="item in poster.imgUrl.split('\n')" :key="item" interval="2000">
                        <img style="width: 100%;height: 100%" :src="item">
                    </el-carousel-item>
                </el-carousel>

            </div>


        </div>


<!--&lt;!&ndash;搜索框&ndash;&gt;-->
<!--        <Search></Search>-->


        <!--商品列表-->
        <recommend-commodity :category="i" v-for="i in categories" :key="i"></recommend-commodity>


<!--底部-->
        <Footer></Footer>



</div>







</template>

<script>

import Footer from '../../components/footer'
import RecommendCommodity from "./components/RecommendCommodity";
import Search from '../../components/search'
import request from "../../network/request";

    export default {
        name: "Home",
        data() {
            return {
                poster:'',
                categories:'',
                loading:false

            };
        },
        mounted(){
            this.loading =true;
            request({
                url:'/poster/all',
            }).then(resp=>{
                this.loading=false;
                this.poster = resp.data[0]
            });

//分类

            request({
                url:'/goods/categories'
            }).then(resp=>{
                this.categories = [];
                for(var i=0;i<resp.data.length;i++)
                {
                    if(resp.data[i].categoryName!=='other')
                        this.categories.push(resp.data[i].categoryName)

                }
                this.categories.push("other")
            });







        },
        methods:{

        },
        components:{
            Search,
            RecommendCommodity,
            Footer
        }

    }
</script>

<style scoped>



</style>