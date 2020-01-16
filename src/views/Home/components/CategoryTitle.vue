<template>
    <div >
        <span class="category-font" ><span @click="detail" >{{title}}</span>
<a href="#"  class="el-icon-right" style="margin-right: 2%;float: right;font-size: 25px;" @click="detail">More</a>


            </span>
        <hr style="background-color:gainsboro;height:1px;border:none;">
    </div>
</template>

<script>
    export default {
        name: "CategoryTitle",
        props:['title'],
        methods:{
            detail(){
                this.$router.push({
                    path:'/category',
                    query:{
                        categoryName:this.title,
                        page:1
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .category-font {
        padding-left: 10px;border-left:6px red solid;font-size: 30px;

    }


    .category-font a {
        text-decoration: none;
        color: darkred;
    }

    .category-font span:hover {
        text-decoration: underline;
        cursor:hand;
        color:darkgrey;
    }
    .category-font a:hover {
        color: deepskyblue;


    }
</style>