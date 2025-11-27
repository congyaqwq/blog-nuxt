#!/bin/bash
yarn build
scp -r ./nuxt.config.js .nuxt package.json ./static ./styles ./constants aliyun:/var/www/web/blog-nuxt