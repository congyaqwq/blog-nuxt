export const state = () => ({
  isMobile: 1
})

export const mutations = {
  SET_COMMIT(state, value) {
    Object.assign(state, value)
  }
}
