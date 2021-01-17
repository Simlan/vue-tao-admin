<template>
  <div class='page-content'>
    <table-bar :showTop="false">
      <div slot="top">
        <el-form label-width="70px">
          <el-row :gutter="20">
            <el-col :span="4">
              <el-form-item label="请求方法：">
                <el-input placeholder="请求方法" v-model.trim="search.method" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="请求路径：">
                <el-input placeholder="请求路径" v-model.trim="search.path" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="状态码：">
                <el-input placeholder="状态码" v-model.trim="search.status" clearable/>
              </el-form-item>
            </el-col>
            
            <el-row :span="4" style="float: right; margin-right: 10px;">
              <el-button type="primary" @click="getOperationList">搜索</el-button>
              <el-button @click="resetSearchForm()">重置</el-button>
            </el-row>
          </el-row>
        </el-form>
      </div>
    </table-bar>
    
    <tao-table :data="list" :page="page" @changePage="getOperationList">
      <el-table-column label="操作人" prop="user">
        <template slot-scope="scope">
          {{scope.row.user.userName}}
        </template>
      </el-table-column>
      <el-table-column label="日期" prop="CreatedAt"/>
      <el-table-column label="状态码" prop="user">
        <template slot-scope="scope">
          <el-tag type="success">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="请求ip" prop="ip"/>
      <el-table-column label="请求方法" prop="method"/>
      <el-table-column label="请求路径" prop="method"/>
      <el-table-column label="请求" prop="method"/>
      <el-table-column label="响应" prop="method"/>
      <el-table-column fixed="right" label="操作" width="150px">
        <template slot-scope="scope">
          <el-button type="text" style="color: #FA6962" icon="el-icon-delete" @click="deleteUser(scope)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </tao-table>
  </div>
</template>

<script>
  import { getOperationApi } from '@/api/operationApi'
  export default {
    data () {
      return {
        search: {
          method: '',
          path: '',
          status: ''
        },
        list: [],
        page: {
          page: 1,
          pageSize: 14,
          total: 0
        }
      };
    },
    mounted() {
      this.getOperationList()
    },
    methods: {
      getOperationList() {
        let { page, pageSize } = this.page
        let { method, path, status } = this.search
        
        getOperationApi({
          page,
          pageSize,
          method,
          path,
          status
        }).then(res => {
          if(res.code === 0) {
            let { list, page, pageSize, total } = res.data

            this.list = list
            this.page = {
              page,
              pageSize,
              total
            }
          }
        })
      },
      resetSearchForm() {
        this.search = {
          path: '',
          description: '',
          apiGroup: ''
        }
        this.getOperationList()
      },
      onSubmit() {
        
      },
      deleteUser(scope) {
        this.$confirm('您确定要删除当前服务器吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          
        }).catch(() => {})
      }
    },
  }
</script>

<style lang='scss' scoped>
  .page-content {
    width: 100%;
    height: 100%;

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
</style>