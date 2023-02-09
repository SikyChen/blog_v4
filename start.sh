#!/bin/bash

# 进入前端项目并构建
echo "cd front"
cd "$(dirname $0)/frontend"
yarn
yarn build

# 进入后端项目
echo "cd server"
cd '../server'
yarn

pwd

# 启动
echo "yarn fullstart"
yarn fullstart
