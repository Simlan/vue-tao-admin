<template>
  <div class="menu" v-if="showMenuMobile">
    <router-link tag="div" class="el-menu-header"
      :style="{background: theme.menuLeftBc}" to="/"
    >
      <div class="pc-header">
        <svg class="svg-icon" aria-hidden="true">
          <use xlink:href="#iconzhaopian-copy"></use>
        </svg>
        <p :style="{color: theme.textColor, width: collapse ? '0' : '190px'}">{{systemName}}</p>
      </div>
      <div class="phone-header" :style="{width: collapseMobile ? '0' : '100%'}">
        <svg class="svg-icon" aria-hidden="true">
          <use xlink:href="#iconzhaopian-copy"></use>
        </svg>
        <!-- <p :style="{color: theme.textColor, width: collapseMobile ? '0' : '100%'}" >{{systemName}}</p> -->
      </div>
    </router-link>
     
    <el-menu class="el-menu" :class="'el-menu-'+ theme.theme"
      :unique-opened="uniqueOpened"
      :collapse="collapse" 
      :default-active="routerPath"
      :background-color="theme.menuLeftBc"
      :text-color="theme.textColor"
      :active-text-color="theme.activeColor"
    >
      <el-submenu :index="item1.title" v-for="item1 in menuList" :key="item1.title">
        <template slot="title">
          <i class="iconfont"
            :style="{
              color: routerPath !== item1.route ? theme.iconColor : theme.iconColorActive
            }" 
          >{{item1.icon}}</i>
          <span>
            {{item1.title}}
          </span>
        </template>

        <div v-for="item2 in item1.children" :key="item2.title">
          <el-submenu :index="item2.title" v-if="!item2.path">
            <template slot="title">
              {{item2.title}}
            </template>
            <el-menu-item 
              :index="routerPathCihld(item3)"
              v-for="item3 in item2.children" 
              :key="item3.title" @click="goPage(item3.path, item3.params, item3)"
            >
              {{item3.title}}
            </el-menu-item>
          </el-submenu>

          <el-menu-item :index="item2.path" v-else @click="goPage(item2.path, item2.params, item2)"
            v-show="!item2.noMenu"
          >
            <span slot="title">{{item2.title}}</span>
          </el-menu-item>
        </div>
      </el-submenu>
    </el-menu>
    <div class="menu-model" @click="visibleMenu()" 
      :style="{opacity: collapse ? 0 : 1, transform: showMobileModel ? 'scale(1)' : 'scale(0)'}">
    </div>
  </div>
</template>

<script>
  import setting from '@/config/setting'
  import axios from 'axios'
  import { flatten } from '@/utils/utils'
  import { mapState } from 'vuex'
  import { allowRouters } from '@/router/index.js'

  export default {
    name: "MenuLeft",
    inject: ['reload'],
    computed: {
      ...mapState({
        worktab: state => state.worktab.worktab,
        setting: state => state.setting.setting,
        menu: state => state.menu
      }),
      routerPath() {
        let { current } = this.worktab
        let { path, params } = current
        let { status } = current.params
        return status ? path + params.status : path
      }
    },
    watch: { 
      'setting.theme': {
        handler(theme) {
          this.getTheme(theme)
        },
        immediate: true
      },
      'setting.uniqueOpened' (uniqueOpened) {
        this.uniqueOpened = uniqueOpened
      },
      'menu.menuList' (list) {
        this.menuList = list
      }
    },
    data() {
      return {
        status: '',
        systemName: setting.systemName, // 系统名称
        menuList: [],                   // 菜单数据
        collapse: false,                // 是否水平折叠收起菜单
        collapseMobile: false,           // 移动端菜header折叠
        theme: {},                      // 主题
        uniqueOpened: '',               // 是否只保持一个子菜单的展开
        screenWidth: '',
        isMobileModel: false,
        showMenuMobile: false,
        showMobileModel: false,
        resizeList: [0, 0]
      }
    },
    mounted() {
      this.lisenterWindowResize()
      this.initUserSetting()
      this.getMenuList()
    },
    methods: {
      lisenterWindowResize() {
        this.screenWidth = document.body.clientWidth;
        this.setMenuModel()

        window.onresize = () => {
          return (() => {
            this.screenWidth = document.body.clientWidth;
            this.setMenuModel()
          })();
        };
      },
      setMenuModel() {
        let { screenWidth, resizeList } = this

        if(screenWidth > 800) {
          if(resizeList[0] === 0) {
            this.isMobileModel = false
            this.collapse = false
            this.collapseMobile = false
            this.showMenuMobile = true
            this.$emit('topBarCollapse', true)
          }
          
          this.$set(this.resizeList, 0, 1)
        }else {
          this.isMobileModel = true
          this.collapse = true
          this.$emit('topBarCollapse', false)
          this.collapseMobile = true
          this.showMobileModel = false
          this.$set(this.resizeList, 0, 0)
        }

        setTimeout(() => {
          this.showMenuMobile = true
        }, 10)
      },
      // 获取菜单列表|权限列表
      getMenuList() {
        this.menuList = this.$store.state.menu.menuList
      },
      // 获取主题
      getTheme(theme) {
        if(theme) {
          let t = setting.themeList.filter((item) => {
            return item.theme === theme
          })
          this.theme = t[0]
        }
      },
      // 初始化用户设置
      initUserSetting() {
        this.uniqueOpened = this.setting.uniqueOpened
      },
      // 菜单展开 | 收缩
      visibleMenu() {
        this.collapse = !this.collapse

        setTimeout(() => {
          this.collapseMobile = !this.collapseMobile
        }, 200)
        
        // 移动端模态框
        if(!this.showMobileModel) {
          this.showMobileModel = true
        }else {
          setTimeout(() => {
            this.showMobileModel = false
          }, 200)
        }
      },
      // 返回子菜单路径
      routerPathCihld(item) {
        let { params, path } = item

        if(params) {
          if(params.status) {
            return path + params.status
          }
        }else {
          return path
        }
      },
      // 切换页面
      goPage(path, params, item) {
        let currentPath = this.$route.path
        let arr = currentPath.split('/')

        if(this.isMobileModel) {
          this.collapse = true
          this.collapseMobile = true
          this.showMobileModel = false
        }

        if(currentPath === path) { // 当前页跳转
          if(params) {
            let { status } = params;
            
            if(status) {
              this.$store.dispatch('worktab/worktabRoute', {
                to: { name, params },
                from: { name, params }
              })
              this.reload()
            }
          }
        }else { // 跳转其它页
          this.$router.push({path, params})
        }
      }
    }
  };
</script>

<style lang="scss">
  .menu {
    // 黑色主题
    .el-menu-dark {
      // 选中颜色
      .el-menu-item.is-active {
        background: #2d8cf0 !important;
      }

      // 鼠标移入背景色
      .el-submenu__title:hover {
        background: #121319 !important;
      }
    }

    // 白色主题
    .el-menu-white  {
      
      // box-shadow: 5px 5px 8px 0 red;

      // 选中颜色
      .el-menu-item.is-active {
        background: #F0FAFF !important;

        // 左侧线条
        &::before {
          content: '';
          width: 3px;
          height: 100%;
          position: absolute;
          left: 0;
          background: #3296FA;
        }
      }

      // 鼠标移入背景色
      .el-submenu__title:hover,
      .el-submenu .el-menu-item:hover {
        color: #3296FA !important;
        background: #F0FAFF !important;
      }

      // 鼠标移入图标颜色
      .el-submenu__title:hover i,
      .el-submenu .el-menu-item:hover i {
        color: #3296FA !important;
      }
    }

    // 折叠后宽度
    .el-menu--collapse {
      width: $menu-left-shrink-width;
    }
    // 左边距
    .el-submenu__title {
      padding-left: 25px !important;
    }
    // 设置文字与图标的距离
    .el-submenu__title span {
      margin-left: 10px;
    }
    .el-submenu .el-menu-item span{
      margin-left: 15px;
    }
    // 箭头加粗
    .el-submenu__icon-arrow {
      font-weight: bold;
    }
  }
</style>

<style lang="scss" scoped>
  .menu {
    height: 100vh;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    position: fixed;
    z-index: 1001;
    top: 0;
    left: 0;
    box-shadow: 5px 5px 8px 0 rgba(29,35,41,.05);

    .el-menu-header {
      
      > div {
        height: 45px;
        line-height: 45px;
        box-sizing: border-box;
        cursor: pointer;
        display: flex;
        overflow: hidden;
        // padding-left: 25px;

        .svg-icon {
          width: 22px;
          vertical-align: -0.15em;
          fill: currentColor;
          overflow: hidden;
          margin-left: -2px;
          margin-top: 10px;
          margin-left: 25px;
        }

        p {
          color: #C3C3C3;
          font-size: 15px;
          margin-left: 10px;
          margin-top: 5px;
          overflow: hidden;
          transition: width .3s ease-in-out;
        }
      }

      .phone-header {
        display: none;
      }
    }

    .el-menu {
      border-right: 0;
      height: calc(100vh - 45px);
      box-sizing: border-box;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 0px !important;
      }
    }

    .el-menu:not(.el-menu--collapse) {
      width: $menu-left-open-width;
    }

    .menu-model {
      display: none;
    }
  }

  @media only screen and (max-width: $device-ipad) { 
    .menu {

      .el-menu-header { 
        padding: 0;

        .pc-header {
          display: none;
        }

        .phone-header {
          display: flex;
          overflow: hidden;
          box-sizing: border-box;
        }
      }

      .el-menu--collapse {
        width: 0;
      }

      .menu-model {
        display: block;
        width: 100%;
        height: 100vh;
        position: fixed;
        z-index: -1;
        left: 0;
        top: 0;
        background: rgba($color: #000000, $alpha: 0.5);
        transition: opacity .2s ease-in-out;
      }
    }
  }
</style>