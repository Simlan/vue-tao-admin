<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import axios from 'axios'
  import { allowRouters } from '@/router/index.js'

  export default {
    name: 'App',
    created() {
      this.getMenuList()
    },
    methods: {
      // 获取菜单列表
      getMenuList() {
        let{ href } = location
        let url = '/static/mock/menu.json'

        if(href.indexOf('localhost') === -1) {
          url = '/' + href.split('/')[3] + url
        }

        axios.get(url).then((res) => {
          if(res.data.code === 200) {
            let  { data } = res.data
            
            this.routerMatch(data, allowRouters).then(routes => {
              this.$store.dispatch('menu/setMenuList', data)
              this.$router.options.routes = Array.from(
                new Set(this.$router.options.routes.concat(routes))
              )
              this.$router.addRoutes(routes) // 动态添加路由
            })
          }
        })
      },
      /**
       * 根据权限匹配路由并返回
       * @param {array} permission    后台返回的权限列表（菜单列表）
       * @param {array} allowRouters  需要权限的路由表
       */
      routerMatch(permission, allowRouters) {
        return new Promise((resolve) => {
          const routers = []
          function createRouter(permission) {
            permission.forEach((item) => {
              let { path } = item
              let pathArr = path && path.split('/')

              if(pathArr) {
                path = pathArr[pathArr.length-1]
              }

              if (item.children && item.children.length) {
                createRouter(item.children)
              }

              allowRouters.find((s) => {
                if (s.children) {
                  s.children.find((y) => {
                    if (y.path === path) {
                      y.meta.permission = item.permission
                      routers.push(s);
                    }
                  })
                }else {
                  if (path && s.path === path) {
                    s.meta.permission = item.permission
                    routers.push(s);
                  }
                }
              })
            })
          }
          createRouter(permission)
          resolve(Array.from(new Set(routers)))
        })
      }
    }
  }
</script>

<style lang="scss">
  .btn-icon {
    font-size: 10px;
  }

  .el-btn-red {
    color: #FA6962 !important;

    &:hover {
      opacity: 0.9;
    }

    &:active {
      opacity: 0.7;
    }
  }

  // 处理移动端组件兼容性
  @media screen and (max-width: $device-phone){
    * {
      cursor: default !important;
    }

    .el-col2 {
      margin-top: 15px;
    }

    .el-message-box,
    .el-message,
    .el-dialog {
      width: calc(100% - 24px) !important;
    }

    // 覆盖消息提示组件
    .el-message {
      min-width: 220px !important;
      padding: 12px 16px !important;
      box-shadow: 0 4px 12px rgba(0,0,0,.15);
      background: #fff;
      border-radius: 4px;
      border: 0;

      .el-message__icon {
        font-size: 16px;
      }

      .el-icon-success {
        color: #50DCD5;
      }
    }

    .el-date-picker.has-sidebar.has-time {
      width: calc(100% - 24px);
      left: 12px !important;
    }

    .el-picker-panel *[slot=sidebar], .el-picker-panel__sidebar {
      display: none;
    }

    .el-picker-panel *[slot=sidebar] + .el-picker-panel__body, 
    .el-picker-panel__sidebar + .el-picker-panel__body {
      margin-left: 0;
    }
  }
</style>