export default function (context) {
  context.userAgent = process.server
    ? context.req.headers["user-agent"]
    : navigator.userAgent;
  if (/AppleWebKit.*Mobile/i.test(context.userAgent) || /Android/i.test(context.userAgent) || /BlackBerry/i.test(context.userAgent) || /IEMobile/i.test(context.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(context.userAgent))) {
    if (/iPad/i.test(context.userAgent)) {
      return context.store.commit('SET_COMMIT', { isMobile: 0 })
    } else {
      return context.store.commit('SET_COMMIT', { isMobile: 1 })
    }
  } else {
    return context.store.commit('SET_COMMIT', { isMobile: 0 })
  }
}