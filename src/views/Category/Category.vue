<template>


<div >


       <category-name-list :categories="categories" style="margin-bottom: 2%" @change="change" :currentCategory="currentCategory"></category-name-list>


<!--        <Search v-if="currentCategory=='all'"></Search>-->

<!--商品列表-->
<div  v-loading="loading" style="margin-top: 3%">

   <commodity-item @detail="detail" v-for="i in goods" :commodity="i" :key="i.id"></commodity-item>


    <div style="clear: both"></div>

<!--    页码-->
    <div class="page">
        <el-pagination
                background

                @current-change="handleCurrentPageChange"
                :current-page="currentPage"
                :page-size="1"
                layout="prev, pager, next"
                :total="totalPages">
        </el-pagination>
    </div>

</div>


    <Footer ></Footer>

</div>


</template>

<script>

    import Footer from '../../components/footer'
    import CommodityItem from '../../components/commodity-item'
    import CategoryNameList from "./components/CategoryNameList";
    import Search from '../../components/search';
    import request from "../../network/request";

    export default {
        name: "Category",
        data(){
            return{
                categories:'',
                goods:'',
                totalPages:'',
                loading:false
            }
        },
        computed:{
            currentCategory(){return this.$route.query.categoryName},
            currentPage(){return this.$route.query.page},
            commodities(){
                return []
            }
        },
        mounted(){

            request({
                url:'/goods/categories'
            }).then(resp=>{
                this.categories = ['all'];
                for(var i=0;i<resp.data.length;i++)
                {
                    if(resp.data[i].categoryName!=='other')
                        this.categories.push(resp.data[i].categoryName)

                }
                this.categories.push("other")
            });

            this.loading=true;
            request({
                url:'/goods/goods/bycategory',
                params:{
                    category:this.currentCategory,
                    page:this.currentPage
                }

            }).then(resp=>{
               this.goods = resp.data.content;
               this.totalPages = resp.data.totalPages
                this.loading=false;
            })


        },


        methods:{
            detail(index){
              this.$router.push({
                  path:'/detail',
                  query:{
                      id:index
                  }
              })
            },
            change(index,page){
                this.currentPage = page;
                this.currentCategory = index;

                this.$router.push({
                    path:'/category',
                    query:{
                        categoryName:index,
                        page:page
                    },
                });
                this.loading=true;
                request({
                    url:'/goods/goods/bycategory',
                    params:{
                        category:this.currentCategory,
                        page:this.currentPage
                    }



                }).then(resp=>{
                    this.goods = resp.data.content;
                    this.totalPages = resp.data.totalPages;
                    this.loading=false;
                })

            },
            handleCurrentPageChange(newPage){
                this.currentPage = newPage;
                this.change(this.currentCategory,newPage);
            },
        },
        components:{
            Footer,
            CommodityItem,
            CategoryNameList,
            Search
        }

    }
</script>

<style scoped>




    .page {
        text-align: center;
        font-size: 30px;
    }
</style>