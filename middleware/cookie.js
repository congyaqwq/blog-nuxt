// nuxt middleware
export default ({ app }) => {
  const set = ({ name, value }) => {
    app.$cookies.set(name, value, {
      maxAge: 60 * 60 * 24 * 7
    })
  }
  const get = (name) => {
    const cookieRes = app.$cookies.get(name)
    return cookieRes
  }
  return {
    get,
    set
  }
}