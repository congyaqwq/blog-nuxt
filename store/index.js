const uuid = () => ~~(Math.random() * 100000)

export const state = () => ({
  isMobile: 1,
  uid: ''
})

export const mutations = {
  SET_COMMIT(state, value) {
    Object.assign(state, value)
  }
}

export const actions = {
  // 服务端渲染周期
  async nuxtServerInit({ state, commit }, { app }) {
    if (!state.uid) {
      const uid = app.$cookies.get('uid') || uuid()
      console.log(uid, 'uid')
      app.$cookies.set('uid', uid, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
      commit("SET_COMMIT", { uid })
    }
  }
}
