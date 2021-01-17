<template>
  <div class='page-content'>
    <table-bar :showTop="false">
      <div slot="top">
        <el-form label-width="70px">
          <el-row :gutter="20">
            <el-col :span="4">
              <el-form-item label="路径：">
                <el-input placeholder="路径" v-model.trim="search.path" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="描述：">
                <el-input placeholder="描述" v-model.trim="search.description" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="API组：">
                <el-input placeholder="API组" v-model.trim="search.apiGroup" clearable/>
              </el-form-item>
            </el-col>
            
            <el-row :span="4" style="float: right; margin-right: 10px;">
              <el-button type="primary" @click="getApiList">搜索</el-button>
              <el-button @click="resetSearchForm()">重置</el-button>
            </el-row>
          </el-row>
        </el-form>
      </div>
      <div slot="bottom">
        <el-button type="primary" plain @click="showDialog('add')">新增</el-button>
      </div>
    </table-bar>
    
    <tao-table :data="list" :page="page" @changePage="getApiList">
      <el-table-column label="ID" prop="ID" width="100"/>
      <el-table-column label="路径" prop="path"/>
      <el-table-column label="分组" prop="apiGroup"/>
      <el-table-column label="描述" prop="description"/>
      <el-table-column label="请求" prop="method"/>
      <el-table-column fixed="right" label="操作" width="150px">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="showDialog('edit')">
            编辑
          </el-button>
          <el-button type="text" style="color: #FA6962" icon="el-icon-delete" @click="deleteUser(scope)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </tao-table>

    <el-dialog :title="dialogTitle" width="500px" :visible.sync="dvEdit" top="30vh">
      <el-form ref="form" :model="form" label-width="60px">
        <el-form-item label="名称">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="ip">
          <el-input v-model="form.mibile"></el-input>
        </el-form-item>
        <el-form-item label="端口">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-switch v-model="form.status"></el-switch>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dvEdit = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getApiListApi } from '@/api/apiApi'
  export default {
    data () {
      return {
        dvEdit: false,
        dialogTitle: '',
        form: {
          username: '',
          mibile: '',
          email: '',
          sex: 1,
          dep: '',
          status: true
        },
        search: {
          path: '',
          description: '',
          apiGroup: ''
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
      this.getApiList()
    },
    methods: {
      getApiList() {
        let { page, pageSize } = this.page
        let { path, description, apiGroup } = this.search
        
        getApiListApi({
          page,
          pageSize,
          path,
          description,
          apiGroup
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
        this.getApiList()
      },
      showDialog(type) {
        this.dvEdit = true
        this.dialogTitle = type === 'add' ? '新增' : '编辑'
      },
      onSubmit() {
        this.dvEdit = false
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