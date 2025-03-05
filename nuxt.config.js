import { PROXY } from "./constants"
// import path from 'path'
// import fs from 'fs'

const isDev = process.env.NODE_ENV === "development"

export default {
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
    port: process.env.PORT || 4000,
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, 'cert.key')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt'))
    // }
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
  modules: [
    '@nuxtjs/composition-api/module',
    '@nuxtjs/proxy'
  ],
  
  buildModules: [
    "@nuxtjs/eslint-module",
    '@nuxtjs/color-mode'
  ],
  
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light',    // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'nuxt-color-mode'
  },

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
}
