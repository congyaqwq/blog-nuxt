// import { instance } from '~/utils/request'

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
  async nuxtServerInit() {
    // { state, commit }, { app, req }
    // 服务端要放cookie上去
    // instance.defaults.headers['Cookie'] = req.headers.cookie
    // if (!state.uid) {
    //   const uid = app.$cookies.get('uuid')
    //   console.log(uid,1)
    //   app.$cookies.set('uuid', uid, {
    //     path: '/',
    //     maxAge: 60 * 60 * 24 * 7,
    //   })
    //   commit("SET_COMMIT", { uid })
    // }
  }
}
