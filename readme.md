<!-- markdownlint-disable MD026 MD028 MD033 MD041 -->

<div align="center">
  <a href="https://koishi.chat/" target="_blank">
    <img width="160" src="https://koishi.chat/logo.png" alt="logo">
  </a>

<h1><ruby>koishi-plugin-fate<rp>(</rp><rt>今日运势生成器</rt><rp>)</ruby></h1>

[![npm](https://img.shields.io/npm/v/koishi-plugin-fate?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-jrys-fix)
</div>

## 简介

基于jrys-fix开发，优化了代码结构，实现一些新功能。

## 功能

- [x] 获取每日运势
- [x] 支持 Monetary
- [x] 自定义背景图
- [x] 随机一言
- [x] 可自定义的搞怪黄历
- [x] 自定义签到等级
- [x] 好看！
- [x] 优化性能(暂未测试)

## TODO

- [ ] 支持更多自定义内容
- [ ] i18n

## 🚀 快速开始

插件市场搜索fate安装

> BackgroundURL（背景图片设置）
> 可以是本地路径,网络路径

## 构建的注意事项
- 构建后复制src/assets到lib目录下再publish

## 迁移到QQ官方Bot后的数据迁移

迁移功能存在于0.5.0版本，将于之后的版本移除

输入 `jrysmigrate 最后签到时的用户名` 来迁移数据
