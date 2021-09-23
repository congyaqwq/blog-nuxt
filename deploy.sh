#!/bin/bash
yarn build
rsync -r ./nuxt.config.js .nuxt package.json ./static ./styles ./constants aliyun:/var/www/nuxt-blog