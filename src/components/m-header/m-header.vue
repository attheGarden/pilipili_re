<template>
  <div class="m-header">
    <div class="m-header-content">
      <div class="m-header-content-nav-link">
        <ul class="m-header-content-nav-link-ul">
          <li class="m-header-content-nav-link-ul-li" v-for="(item, index) in menus" :key="index" :href="item.url">
            <div style="display: block; float: left">
              <a class="iconfont" v-if="(index === 0)" style="font-size: 18px;margin-right: 6px;color: #ffffff">&#xe608;</a>
              <a class="iconfont" v-if="(index === 8)" style="font-size: 24px;margin-right: -2px;color: #ffffff">&#xe65d;</a>
            </div>
            <div class="m-header-content-nav-link-ul-li-imgAndTitle" v-if="item.img !== ''">
              <div class="m-header-content-nav-link-ul-li-imgAndTitle-box" ref="menuItem">
                <p style="float: top">颁奖</p>
                <img :src="item.img" width="54" height="36" alt="error">
                <p style="float: bottom">颁奖</p>
              </div>
            </div>
            <a :href="item.url" style="color: #ffffff">{{item.name}}</a>
          </li>
        </ul>
      </div>
      <div class="login-box">
        <div class="login-box-left">
          <div class="item">
            <div class="login-content" @mouseenter="showLoginBox" @mouseleave="hideLoginBox">
              <span class="login-img">
                <img src="../../static/img/测试头像.jpg" height="30" width="30" alt="error"/>
              </span>
              <span><router-link style="color: #ffffff" to="/login">登录</router-link></span>
            </div>
          </div>
          <div class="item">
            <router-link style="color: #ffffff" to="/register">注册</router-link>
          </div>
        </div>
        <div class="login-box-right">
          <div class="contribution-box">投稿</div>
        </div>
      </div>
      <div class="search-box" ref="search_box" v-show="searchFlag" :style="{width: `${searchInputWidth}px`}">
        <transition name="normal">
          <el-input
            placeholder="请输入内容"
            v-model="searchInput"
            v-show="searchFlag">
            <template #prefix>
              <i class="el-input__icon el-icon-search"></i>
            </template>
          </el-input>
        </transition>
      </div>
      <div class="search-icon" v-show="searchFlag">
          <el-svg-icon>
            <search />
          </el-svg-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

export default {
  emits: ['showLoginBox', 'hideLoginBox'],
  setup (props, context:any) {
    const searchInput = ref('')
    const menus = [
      { name: '主站', url: '/', img: '' },
      { name: '番剧', url: '', img: '' },
      { name: '游戏中心', url: '', img: '' },
      { name: '直播', url: '', img: '' },
      { name: '会员购', url: '', img: '' },
      { name: '漫画', url: '', img: '' },
      { name: '赛事', url: '', img: '' },
      { name: '', url: '', img: 'https://i0.hdslb.com/bfs/archive/09790b27ddaa4164860198ba2051a7cd25d72bbb.png' },
      { name: '下载app', url: '', img: '' }
    ]
    const screenWidth = ref(document.body.clientWidth)
    const searchFlag = ref(true)
    const searchInputWidth = computed(() => {
      return document.body.clientWidth * 0.35513
    })
    onMounted(() => {
      window.addEventListener('resize', () => {
        screenWidth.value = document.body.clientWidth
      })
    })
    watch(screenWidth, () => {
      console.log(screenWidth)
      if (screenWidth.value > 1300) {
        searchFlag.value = true
      } else {
        searchFlag.value = false
      }
    })
    const showLoginBox = () => {
      context.emit('showLoginBox')
    }
    const hideLoginBox = () => {
      context.emit('hideLoginBox')
    }

    return {
      searchInput,
      menus,
      searchFlag,
      screenWidth,
      searchInputWidth,
      showLoginBox,
      hideLoginBox
    }
  },
  methods: {
  },
  watch: {
  }
}
</script>

<style lang="stylus" scoped>
.m-header
  position absolute
  width 100%
  height 56px
  float left
  z-index 3
  box-shadow 0 50px 3px rgba(0,0,0,.2) inset
  .m-header-content
    z-index 3
    display block
    height 36px
    line-height 36px
    padding 10px 24px 10px 24px
    overflow hidden
    word-break keep-all

    .m-header-content-nav-link
      display block
      width 501px
      height 36px
      float left

      .m-header-content-nav-link-ul
        display block
        width 501px
        height 36px
        line-height 30px
        float left

        .m-header-content-nav-link-ul-li
          display block
          height 36px
          line-height 30px
          overflow hidden
          margin-right 12px
          font-size 14px
          font-weight 400
          color #ffffff
          float left

          .m-header-content-nav-link-ul-li-imgAndTitle
            display block
            width 54px
            height 108px
            text-align center
            float left

            .m-header-content-nav-link-ul-li-imgAndTitle-box
              animation move1 5s linear infinite
              animation-fill-mode: backwards

    .login-box
      float right
      width 231px
      height 36px
      font-size 14px
      font-weight 400
      text-align center
      color #ffffff

      .login-box-left
        float left
        height 36px

        .item
          float left
          height 32px
          margin-left 12px
          .login-content
            float left
            width 65px
            height 32px
            .login-img
              display block
              float left
              width 30px
              height 30px
              margin-right 5px
              border 1px solid rgb(192, 192, 192)
              border-radius 50%
              overflow hidden

      .login-box-right
        float left
        height 36px

        .contribution-box
          float left
          width 100px
          height 36px
          margin-left 14px
          line-height 36px
          background-color rgb(251, 114, 153)
          border-radius 2px

    .search-box
      max-width 500px
      height 36px
      margin 0 10px
      float right
      &.normal-enter-active
        animation bounce-in 1s
      &.normal-leave-active
        animation bounce-in 1s
    .search-icon
      width 16px
      float right
@keyframes bounce-in
  0%
    transform: scale(0);
  100%
    transform: scale(1);
</style>
