<template>
    <div >

        <!--            分类字体-->
        <category-title :title="category"></category-title>

        <!--            分类商品列表-->


<div >
        <commodity-item :commodity="i" v-for="i in goods" :key="i.id"></commodity-item>
<!--        <next-flag v-if="goods.length%3" ></next-flag>-->
</div>






        <div style="clear:both;"></div>

    </div>
</template>

<script>
    import CategoryTitle from "./CategoryTitle"
    import NextFlag from "./NextFlag";
    import CommodityItem from '../../../components/commodity-item'
    import request from "../../../network/request";
    export default {
        name: "RecommendCommodity",
        props:['category'],
        data(){
            return{
                goods:''
            }
        },
        mounted(){

            request({
                url:'/goods/goods/recommend',
                params:{
                    "category":this.category
                }
            }).then(resp=>{
                this.goods = resp.data;

            })


        },
        components:{
            CategoryTitle,
            CommodityItem,
            NextFlag
        }
    }
</script>

<style scoped>

</style>