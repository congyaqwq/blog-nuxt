const cookieparser = process.server ? require("cookieparser") : undefined
const Cookie = process.browser ? require('js-cookie') : undefined

export const state = () => ({
  isMobile: 1,
  uid: ''
})

export const mutations = {
  SET_COMMIT(state, value) {
    Object.assign(state, value)
    if (value.uid && process.browser) {
      Cookie.set('uid', value.uid)
      document.cookie = { uid: value.uid }
    }
  }
}

export const actions = {
  // 服务端渲染周期
  async nuxtServerInit({ state, commit }, { req }) {
    // 打印IP
    // console.log(req)

    // 登录保存
    // let uid = ""
    // if (req.headers.cookie && !state.uid) {
    //   const parsed = cookieparser.parse(req.headers.cookie) || {}
    //   console.log(req.headers, 1)
    //   uid = parsed["uid"]
    //   commit("SET_COMMIT", { uid })
    // }
  }
}
