<template>
  <div class="page-content">
    <tao-table :showPage="false" :data="tableData">
      <el-table-column label="分类" style="display: flex;">
        <template slot-scope="scope" >
          <svg class="svg-icon" aria-hidden="true">
            <use :xlink:href="scope.row.icon"></use>
          </svg>
          <span style="margin-left: 5px">
            {{scope.row.title}}
          </span>
        </template>
      </el-table-column>

      <el-table-column prop="number" label="文章数量" show-overflow-tooltip />
      <el-table-column prop="date" label="创建时间" show-overflow-tooltip />
      <el-table-column fixed="right" label="操作" width="150px">
        <template>
          <el-button type="text" icon="el-icon-edit">
            编辑
          </el-button>
          <el-button type="text" icon="el-icon-delete" class="el-btn-red">
            删除
          </el-button>
        </template>
      </el-table-column>
    </tao-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [
          {
            icon: '#iconVue',
            title: 'Vue',
            number: 20,
            date: '2020-03-12'
          },
          {
            icon: '#iconReact',
            title: 'React',
            number: 20,
            date: '2020-03-12'
          },
          {
            icon: '#iconflutter-fill',
            title: 'Flutter',
            number: 20,
            date: '2020-03-12'
          },
          {
            icon: '#iconhtml',
            title: 'HTML',
            number: 20,
            date: '2020-03-12'
          },
          {
            icon: '#iconCSS',
            title: 'CSS',
            number: 20,
            date: '2020-03-12'
          },
          {
            icon: '#iconjs',
            title: 'js',
            number: 20,
            date: '2020-03-12'
          },
          {
            icon: '#iconjava',
            title: 'java',
            number: 20,
            date: '2020-03-12'
          },
          {
            icon: '#iconxiaoxiong',
            title: 'Golang',
            number: 20,
            date: '2020-03-12'
          },
          {
            icon: '#iconsikao',
            title: '总结',
            number: 20,
            date: '2020-03-12'
          },
          {
            icon: '#iconMySQL',
            title: 'MySQL',
            number: 20,
            date: '2020-03-12'
          },
          {
            icon: '#icongit',
            title: 'Git',
            number: 20,
            date: '2020-03-12'
          },
          {
            icon: '#iconlinux',
            title: 'Linux',
            number: 20,
            date: '2020-03-12'
          },
          {
            icon: '#iconnginx',
            title: 'Nginx',
            number: 20,
            date: '2020-03-12'
          },
        ]
      };
    },
    mounted() {
    },
    methods: {
      search() {

      },
    }
  };
</script>

<style lang="scss" scoped>
  .page-content {
    .svg-icon {
      width: 1.8em;
      height: 1.8em;
      vertical-align: -8px;
      fill: currentColor;
      overflow: hidden;
    }
  }
</style>