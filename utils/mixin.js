export default {
  methods: {
    isMobile() {
      if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent) || /BlackBerry/i.test(navigator.userAgent) || /IEMobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
        if (/iPad/i.test(navigator.userAgent)) {
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    }
  }
}