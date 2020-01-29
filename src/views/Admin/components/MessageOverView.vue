<template>
    <div>
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
                    label="留言日期"
                    sortable
                    width="200px"
                    column-key="date"
                    :filters="dateFilter"
                    :filter-method="filterDateHandler"
            >
            </el-table-column>

            <!--                名称        -->
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="200">
            </el-table-column>

            <!--是否已读-->
            <el-table-column
                    prop="visit"
                    column-key="visit"
                    label="是否已读"
                    width="100"
                    :filters="visitFilter"
                    :filter-method="filterTag"
                    filter-placement="bottom-end">

                <template slot-scope="scope">
                    <el-tag
                            :type="scope.row.visit === '未读' ? 'danger' : 'success'"
                            disable-transitions>{{scope.row.visit}}</el-tag>
                </template>

            </el-table-column>

            <!--                操作      -->
            <el-table-column

                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
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
            <el-dialog width="90%" :title="currentMessage.date"  :visible.sync="detailVisible">

                <div style="font-size: 15px;line-height: 40px">
                <div>Name:{{currentMessage.name}}</div>
                <div>联系方式：{{currentMessage.contact}}</div>
                <div>Address：{{currentMessage.address}}</div>
                    <div>留言时间：{{currentMessage.date}}</div>
                    <el-divider></el-divider>
                <el-card shadow="always">
                    {{currentMessage.content}}
                </el-card>
                </div>

                <div slot="footer" class="dialog-footer">

                    <el-button @click="detailVisible = false">取 消</el-button>
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
    import request from "../../../network/request";

    export default {
        name: "MessageOverView",
        data() {
            return {
                currentMessage:{
                    name:'',
                    address:'',
                    contact:'',
                    content:'',
                    date:''
                },
                deleteVisible:false,
                detailVisible:false,

                currentDelete:'',
                keywords:'',
                tableData: ''
            }
        },
        mounted(){
            request({
                url:'/message/overview'
            }).then(resp=>{
                this.tableData = resp.data
            }).catch(err=>{alert("error")})
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
            visitFilter(){
                var arr=new Set();
                for(var i=0;i<this.tableData.length;i++){

                    arr.add(this.tableData[i].visit)

                }
                arr = Array.from(arr);
                var r = [];
                for(var j=0;j<arr.length;j++){
                    r.push({"text":arr[j],"value":arr[j]})
                }

                return r
            }


        },
        methods: {

            clearFilter() {
                this.$refs.filterTable.clearFilter();
            },

            filterTag(value, row) {
                return row.visit === value;
            },

            filterDateHandler(value, row, column) {
                const property = column['property'];
                return row.date.split('-').splice(0,2).join('-') === value;
            },

            indexMethod(index) {
                return index;
            },


            handleEdit(index, row) {
                this.currentMessage = this.tableData[index];
                if (this.tableData[index].visit!=="已读"){
                    this.tableData[index].visit = "已读";

                    request({
                        url:'/message/save',
                        params:this.tableData[index]
                    }).catch(err=>{alert("error")});

                    this.detailVisible=true;
                    console.log(index, row);
                }
                this.detailVisible=true;
            },

            handleDelete(index, row) {
                this.currentDelete = row.id;
                this.deleteVisible=true;
                // console.log(index, row);

            },
            confirmDelete(){

                request({
                    url:'/message/delete',
                    method:'get',
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
                }).catch(err=>{alert("错误")});
                this.deleteVisible = false;
            }
        }
    }
</script>

<style scoped>

</style>