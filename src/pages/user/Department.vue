<template>
  <div class='page-content'>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-input placeholder="名称"></el-input>
      </el-col>
      <el-button>搜索</el-button>
      <el-button>新增部门</el-button>
    </el-row>

    <el-row style="margin-top: 15px">
      <tao-table
        :data="tableData"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        size="mediul"
      >
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="sort" label="排序" sortable></el-table-column>
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'info'">
              {{scope.row.status === 1 ? '启用' : '禁用'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150px">
          <template>
            <el-button type="text" icon="el-icon-edit">
              编辑
            </el-button>
            <el-button type="text" style="color: #FA6962" icon="el-icon-delete" >
              删除
            </el-button>
          </template>
        </el-table-column>
      </tao-table>
    </el-row>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dvEdit: false,
        dialogTitle: '',
        props: {
          label: 'name',
          children: 'zones'
        },
        count: 1,
        form: {
          username: '',
          mibile: '',
          email: '',
          sex: 1,
          dep: '',
          status: true
        },
        tableData: [
          {
            id: 1,
            date: '2016-05-02',
            name: '人力资源部',
            status: 1,
            sort: 1,
          }, {
            id: 2,
            date: '2016-05-04',
            name: '公关部',
            status: 1,
            sort: 2,
          }, {
            id: 3,
            date: '2016-05-01',
            name: '市场部',
            status: 1,
            sort: 3,
            children: [{
                id: 31,
                date: '2016-05-01',
                name: '王小虎',
                status: 1,
                sort: 1,
              }, {
                id: 32,
                date: '2016-05-01',
                name: '王小虎',
                status: 0,
                sort: 2,
            }]
          }, {
            id: 4,
            date: '2016-05-03',
            name: '财务部',
            status: 1,
            sort: 4
          }, {
            id: 5,
            date: '2016-05-03',
            name: '广告部',
            status: 1,
            sort: 5
          }, {
            id: 6,
            date: '2016-05-03',
            name: '营销部',
            status: 1,
            sort: 5
          }, {
            id: 7,
            date: '2016-05-03',
            name: '开发部',
            status: 1,
            sort: 5
          }, {
            id: 8,
            date: '2016-05-03',
            name: '测试部',
            status: 1,
            sort: 5
          }, {
            id: 9,
            date: '2016-05-03',
            name: '安全监察部',
            status: 0,
            sort: 5
          }, {
            id: 10,
            date: '2016-05-03',
            name: '设计部',
            status: 1,
            sort: 5
          }, {
            id: 11,
            date: '2016-05-03',
            name: '监事会',
            status: 1,
            sort: 5
          }, {
            id: 12,
            date: '2016-05-03',
            name: '董事会',
            status: 1,
            sort: 5
          }
        ],
      };
    },
    mounted() {
      
    },
    methods: {
      showDialog(type) {
        this.dvEdit = true
        this.dialogTitle = type === 'add' ? '新增用户' : '编辑用户'
      },
      onSubmit() {
        this.dvEdit = false
      },
      handleCheckChange(data, checked, indeterminate) {
        // console.log(data, checked, indeterminate);
      },
      handleNodeClick(data) {
        // console.log(data);
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "@css/tree.scss";

  .page-content {
    width: 100%;
    height: 100%;

    .department {
      display: flex;

      .left-wrap {
        width: 300px;

        .line {
          margin: 15px 0;
        }
      }

      .right-wrap {
        flex: 1;
      }
    }
  }
</style>