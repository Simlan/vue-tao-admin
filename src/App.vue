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
      // 获取菜单列表(权限列表)
      getMenuList() {
        let isPro = location.href.indexOf('tao_admin')
        let url = '/static/mock/menu.json'

        if(isPro !== -1) {
          url = '/tao_admin' + url
        }

        axios.get(url).then((res) => {
          if(res.data.code === 200) {
            this.$store.dispatch('menu/setMenuList', res.data.data)

            this.routerMatch(res.data.data, allowRouters).then(res => {
              this.$router.addRoutes(res[0]);
              let { path } = this.$route
              let localPath = JSON.parse(localStorage.getItem('router'))

              if(path !== localPath) {
                this.$router.push(localPath)
              }
            })
          }
        })
      },
      /**
       * 根据权限匹配路由并返回
       * @param {array} permission 后台返回的权限列表（菜单列表）
       * @param {array} allowRouters 需要权限的路由表
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
                }
                if (path && s.path === path) {
                  s.meta.permission = item.permission
                  routers.push(s);
                }
              })
            })
          }

          createRouter(permission)
          resolve([routers])
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
</style>
