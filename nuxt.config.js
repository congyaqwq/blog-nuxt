import { PROXY } from "./constants"
import { defineNuxtConfig } from '@nuxtjs/composition-api'

const isDev = process.env.NODE_ENV === "development"

export default defineNuxtConfig({
  transition: 'fade',
  head: {
    title: "lc个人博客",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
      },
      {
        name: "applicable-device",
        content: "mobile"
      },
      {
        hid: "keywords",
        name: "keywords",
        content:
          "李聪，博客，前端，nuxt，vue3.0"
      },
      {
        hid: "description",
        name: "description",
        content:
          "李聪-前端工程师的个人博客"
      },
      { name: "format-detection", content: "telephone=no,email=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 4000
  },

  proxy: {
    "/api": {
      target: PROXY,
      changeOrigin: true,
      ws: false,
      pathRewrite: {
        "^/api": "/api"
      }
    }
  },
  env: {
    NODE_ENV: process.env.NODE_ENV || "development"
  },
  loading: { color: "#0185F2" },

  css: ["./styles/index.less"],

  /*
   ** Plugins to load before mounting the App
   */
  // plugins: [
  //   { src: "~/plugins/mixin" }
  // ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['cookie-universal-nuxt'],
  buildModules: [
    "@nuxtjs/proxy",
    "@nuxtjs/eslint-module",
    '@nuxtjs/composition-api',
    '@nuxtjs/color-mode'
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    ...(isDev ? {} : { publicPath: "/client/" }),
    extractCSS: true,
    loaders: {
      fontUrl: { limit: 1 },
      imgUrl: { limit: 1 }
    },
    babel: {
      plugins: []
    },
  }
})
