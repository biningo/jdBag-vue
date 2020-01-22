<template>
    <div>

        <!--搜索-->
        <div style="margin: auto;width: 50%">


            <div>
                <el-input placeholder="请输入内容" v-model="keywords">
                    <template slot="append"><el-button type="primary" plain  icon="el-icon-search"></el-button></template>
                </el-input>
            </div>

            <div class="recommend_keywords">
                <span v-for="i in 5" >
                    <el-link type="primary" >信息链接</el-link>
                </span>
            </div>




        </div>

    </div>
</template>

<script>
    export default {
        name: "search",
        data(){
            return {
                keywords:''
            }
        }
    }
</script>

<style scoped>

    .recommend_keywords {
        padding: 1%;

    }

    .recommend_keywords a {

        margin: 1%;
        text-decoration: none;
    }

    .recommend_keywords a:hover {
        color: #0080ff;
        text-decoration: underline;
    }
</style>