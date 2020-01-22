<template>
    <div>

        <div   class="commodity-item" >
            <div style="width: 395px;">
                <el-image class="commodity-img"
                        :src="commodity.mainImage.split('\n')[0]"
                        :preview-src-list="commodity.mainImage.split('\n')"></el-image>
                <a href="#" @click="detail(commodity.id)" class="image-footer">{{commodity.title}}</a>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "commodity-item",
        props:['commodity'],
        data(){
            return{

            }
        },
        methods:{
            detail(id) {
               this.$router.push({
                   path:'/detail',
                   query: {
                       id: id
                   }
                })

            }
        }

    }
</script>

<style scoped>
    .commodity-item {
        float: left;margin-bottom: 2%;margin-left: 1%;
    }
    .commodity-img {
        display: block;width: 100%;height: 42%;
    }
    .image-footer {

        text-align: center;
        display: block;
        text-decoration: none;
        padding: 5% ;
        font-size: 18px;
        color: darkslateblue;
    }

    .image-footer:hover {
        text-decoration: underline;
        color: black;
    }
</style>