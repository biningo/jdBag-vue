<template>
    <div>


<!--        名字-->
        <el-card shadow="always">
            <div class="commodity-title">
            {{goods.title}}
            </div>
        </el-card>

<!--        轮播图-->
        <div style="margin-top: 3%">
        <el-carousel :interval="2000" type="card" height="65%">
            <el-carousel-item v-for="item in goods.mainImage.split('\n')" :key="item">
                <img style="width: 100%;height: 100%" :src="item">
            </el-carousel-item>
        </el-carousel>
        </div>


        <div class="commodity-content">

            <div style="margin-bottom: 1%;font-size:20px;padding-left: 1%;border-left: 5px solid red;height: 5%">
                介绍
            </div>
            <div style="font-size: 18px;background-color: papayawhip;padding: 2%">
          {{goods.summary}}
            </div>
        </div>


        <el-divider><i style="font-size: 40px;color: red" class="el-icon-s-goods"></i></el-divider>

        <div class="commodity-img">


            <div style="font-size: 20px;padding-top:0.8%;padding-left: 1%;border-left: 5px solid red;height: 5%">
                图片
            </div>
            <div v-for="j  in goods.detailImage.split('\n')" :key="j" style="padding-top: 3%">
                <img :src="j" style="width: 100%;">
            </div>
            
        </div>

<Footer></Footer>
    </div>
</template>

<script>

    import Footer from '../../components/footer'
    import request from "../../network/request";

    export default {
        name: "CommodityDetail",
        components:{
            Footer
        },
        data(){
            return{
                goods:''
            }
        },
        mounted() {
            request({
                url:'/goods/goods/byid',
                params:{
                    id:this.$route.query.id
                }
            }).then(resp=>{
                this.goods = resp.data
            })
        }


    }
</script>

<style scoped>

    .commodity-content {
        margin-top: 5%;
        margin-bottom: 8%;
        line-height: 30px;
    }

    .commodity-title {
        font-size: 22px;
    }

    .commodity-img {
        
    }

</style>