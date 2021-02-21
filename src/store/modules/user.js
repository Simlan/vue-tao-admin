/**
 * 用户
 */

const state = {
  user: {
    info: {},       // 用户信息
    worktab: {         // 选项卡
      current: {},  // 当前
      opened: []    // 打开的
    },
    setting: {}     // 个性化设置及其它设置
  }
}

const getters = {
  user: (state) => state.user
}

const mutations = {
  // 初始化state
  initState() {
    let sys = JSON.parse(localStorage.getItem("sys"))
    if(sys && sys.user.info.ID) {
      state.user.info = sys.user.info
    }
  },
  // 用户数据持久化存储
  storeStorage(state, rootState) {
    state.user.worktab = rootState.worktab.worktab
    state.user.setting = rootState.setting.setting
    localStorage.setItem("sys",  JSON.stringify(state))
  },
  setUserInfo(state, e) {
    state.user.info = e.user
    state.user.info.token = e.token

    let sys = JSON.parse(localStorage.getItem("sys"))

    if(sys) {
      sys.user.info = e.user
      sys.user.info.token = e.token
      localStorage.setItem("sys",  JSON.stringify(sys))
    }
  }
}

const actions = {
  initState ({commit }) {
    commit('initState')
  },
  storeStorage({commit, rootState}) {
    commit('storeStorage', rootState)
  },
  setUserInfo({commit}, e) {
    commit('setUserInfo', e)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}