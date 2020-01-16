<template>
    <div>

        <nav class="menu-category">
            <el-card shadow="always">
                <div class="category-name">


                    <div  v-for="i in categories"  @click="change(i)" :key="i" :class="{'name-item':true,active:currentCategory==i}"><span ><a href="#">{{i}}</a></span></div>



                </div>
                <div style="clear:both;"></div>
            </el-card>
        </nav>

    </div>
</template>

<script>
    export default {
        name: "CategoryNameList",
        props:['currentCategory','categories'],
        data(){
            return {
                // currentCategory:1
            }
        },
        methods:{
            change(index){
               this.$emit('change',index,1)
            }
        }
    }
</script>

<style scoped>
    .menu-category {

        width: 100%;

    }

    .category-name {
        padding-left: 1%;
        padding-right: 1%;
        line-height: 100%;



    }
    .name-item {
        margin-left: 3%;
        padding: 1%;
        display: inline-block;
        margin-bottom: 1%;

    }
    .name-item a {
        text-decoration: none;
        color: #1c6ca1;
    }
    .name-item a:hover {
        color: red;
    }
    .name-item:hover {
        border-bottom: 2px red solid;

    }

    .active  {
        background-color: whitesmoke;
        border-bottom: 2px red solid;

    }
    .active a {
        color: red;
    }


</style>