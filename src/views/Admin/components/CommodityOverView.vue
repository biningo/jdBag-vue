<template>


    <div>

        <!--                搜索-->
        <div>
            <el-col :span="20">
                <el-input
                        placeholder="请输入内容"
                        v-model="keywords"
                        clearable>
                </el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="success">搜索</el-button>
            </el-col>
        </div>

        <!--                表格-->
        <el-table

                height="480"

                ref="filterTable"
                :data="tableData"
        >

            <!--                索引  -->
            <el-table-column
                    type="index"
                    :index="indexMethod">
            </el-table-column>

            <!--                日期   -->
            <el-table-column
                    prop="date"
                    label="添加/更新日期"
                    sortable
                    width="200px"
                    column-key="date"
                    :filters="dateFilter"
                    :filter-method="filterDateHandler"
            >
            </el-table-column>

            <!--                名称        -->
            <el-table-column
                    prop="title"
                    label="商品名称"
                    width="200">
            </el-table-column>

            <!--分类-->
            <el-table-column
                    prop="categoryName"
                    label="类别"
                    width="100"
                    :filters="categoryFilter"
                    :filter-method="filterTag"
                    filter-placement="bottom-end">

                <template slot-scope="scope">
                    <el-tag
                            :type="'success'"
                            disable-transitions>{{scope.row.categoryName}}</el-tag>
                </template>

            </el-table-column>
            <!--分类-->
            <el-table-column
                    prop="categoryName"
                    label="推荐"
                    width="100"
                    :filters="recommendFilter"
                    :filter-method="filterRecommend"
                    filter-placement="bottom-end">

                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.recommend?'warning':'info'"
                            disable-transitions>{{scope.row.recommend?"是":"否"}}</el-tag>
                </template>

            </el-table-column>
            <!--                操作      -->
            <el-table-column

                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>

            </el-table-column>


        </el-table>




        <!--                提醒框-->
        <div>
            <!--        商品编辑表单-->
            <el-dialog width="90%" title="编辑"  :visible.sync="editFormVisible">

                <AddCommodity ref="addCommodity"></AddCommodity>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="editFormVisible = false">取 消</el-button>

                </div>
            </el-dialog>

            <!--        是否删除-->
            <el-dialog
                    title="删除"
                    :visible.sync="deleteVisible"
                    width="30%"

            >
                <span>是否删除?</span>
                <span slot="footer" class="dialog-footer">
    <el-button @click="deleteVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmDelete">确 定</el-button>
  </span>
            </el-dialog>
        </div>


    </div>

</template>

<script>
 import AddCommodity from "./AddCommodity";
 import request from "../../../network/request";
    export default {
        name: "CommodityOverView",
        components: {AddCommodity},
        data() {
            return {

                commodity:{
                    title: '',
                    date:'',
                    categoryName: '',
                    recommend: false,
                    summary: '',
                    detailImage:'',
                    mainImage:''
                },
                deleteVisible:false, //删除确认
                editFormVisible:false,
                keywords:'',
                tableData: '',
                currentDelete:'',
                categoryFilter:[]
            }
        },
        mounted(){

          request({
              url:'/goods/goods'
          }).then(resp=>{
              this.tableData = resp.data

          }).catch(err=>{alert(err)});


          request({
              url:'/goods/categories'
          }).then(resp=>{
              var arr = resp.data;

              for(var i=0;i<arr.length;i++){
                  this.categoryFilter.push({'text':arr[i].categoryName,'value':arr[i].categoryName})
              }
              this.categoryFilter.push({'text':'other','value':'other'})

          }).catch(err=>{alert(err)})

        },
        computed:{
            dateFilter(){
                var arr=new Set();
                for(var i=0;i<this.tableData.length;i++){

                    arr.add(this.tableData[i].date.split('-').splice(0,2).join('-'))

                }
                arr = Array.from(arr);
                var r = [];
                for(var j=0;j<arr.length;j++){
                    r.push({"text":arr[j],"value":arr[j]})
                }

                return r
            },


            recommendFilter(){
               return [{"text":"是","value":true},{"text":"否","value":false}]
            },


            },


        methods: {

            clearFilter() {
                this.$refs.filterTable.clearFilter();
            },

            filterTag(value, row) {
                return row.categoryName === value;
            },
            filterRecommend(value,row){
                return row.recommend === value;
            },


            filterDateHandler(value, row, column) {
                const property = column['property'];
                return row.date.split('-').splice(0,2).join('-') === value;
            },

            indexMethod(index) {
                return index;
            },


            handleEdit(index, row) {
                //this.commodity = this.tableData[index];
                this.commodity=this.tableData[index];
                //稍延迟 等子组件出来了再进行操作
                setTimeout(()=>{
                    this.$refs.addCommodity.goodsForm = this.commodity;
                },10);

                this.editFormVisible=true;
                // console.log(index, row);
            },
            handleDelete(index, row) {


                this.deleteVisible=true;
                this.currentDelete=row.id;
                // console.log(index, row);

            },
            confirmDelete(){
                request({
                    url:'/goods/deletegoods',
                    params:{
                        id:this.currentDelete
                    }
                }).then(resp=>{
                    for(var i=0;i<this.tableData.length;i++){
                        if(this.tableData[i].id==this.currentDelete)
                            this.tableData.splice(i,1)
                    }

                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                }).catch(err=>{alert("出错")});
                this.deleteVisible = false
            }
        }
    }
</script>

<style scoped>

</style>