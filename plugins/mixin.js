/* eslint-disabled */
import Vue from "vue"
// const Vue = require('vue')
// import mixin from '@/utils/mixin'

// Make sure to pick a unique name for the flag
// so it won't conflict with any other mixin.
if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true
  Vue.mixin({
    methods: {
      isMobile() {
        if (!process.client) return
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
  })
}