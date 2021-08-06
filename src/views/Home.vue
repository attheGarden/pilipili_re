<template>
  <div class="home">
    <div class="header">
      <Mheader @showLoginBox="showLoginBox" @hideLoginBox="hideLoginBox"></Mheader>
      <div class="banner" id="banner">
        <div class="banner-img-layer">
          <img src="../static/img/i1.png" data-move-multiple="16.395" class="banner-img-layer-img1" ref="i1" alt="">
        </div>
        <div class="banner-img-layer">
          <img src="../static/img/i2.png" data-move-multiple="16.395" class="banner-img-layer-img2" ref="i2" alt="">
        </div>
        <div class="banner-img-layer">
          <img src="../static/img/i3.png" data-move-multiple="12.145" class="banner-img-layer-img3" ref="i3" alt="">
        </div>
        <div class="banner-img-layer">
          <img src="../static/img/i4.png" data-move-multiple="3.718" class="banner-img-layer-img4" ref="i4" alt="">
        </div>
        <div class="banner-img-layer">
          <img src="../static/img/i5.png" data-move-multiple="14.573" class="banner-img-layer-img5" ref="i5" alt="">
        </div>
        <div class="banner-img-layer">
          <img src="../static/img/i6.png" data-move-multiple="29.277" class="banner-img-layer-img6" data-is-opacity="0" ref="i6" alt="error">
        </div>
        <div class="banner-img-layer">
          <img src="../static/img/i7.png" data-move-multiple="2.342" class="banner-img-layer-img7" ref="i7" alt="">
        </div>
        <div class="banner-img-layer">
          <img src="../static/img/i8.png" data-move-multiple="1.952" class="banner-img-layer-img8" ref="i8" alt="">
        </div>
        <div class="banner-img-layer">
          <img src="../static/img/i9.png" data-move-multiple="4.098" class="banner-img-layer-img9" data-is-opacity="1" ref="i9" alt="error">
        </div>
        <div class="banner-img-layer">
          <img src="../static/img/i10.png" data-move-multiple="2.826" class="banner-img-layer-img10" data-is-opacity="1" ref="i10" alt="error">
        </div>
        <div class="banner-img-layer">
          <img src="../static/img/i11.png" data-move-multiple="1.457" class="banner-img-layer-img11" ref="i11" alt="error">
        </div>
        <div class="banner-img-layer">
          <img src="../static/img/i12.png" data-move-multiple="1.092" class="banner-img-layer-img12" ref="i14" alt="error">
        </div>
        <div class="banner-img-layer">
          <img src="../static/img/i13.png" data-move-multiple="1.104" class="banner-img-layer-img13" ref="i13" alt="error">
        </div>
        <div class="banner-img-layer">
          <img src="../static/img/i14.png" data-move-multiple="0.781" class="banner-img-layer-img14" ref="i14" alt="error">
        </div>
        <div class="banner-img-layer">
          <img src="../static/img/i15.png" data-move-multiple="0.546" class="banner-img-layer-img15" id="i15" alt="error">
        </div>
        <canvas id="canvas" width="1920" height="180" class="snow"></canvas>
        <div class="banner-logo-wrap">
          <img src="https://i0.hdslb.com/bfs/feed-admin/10641bbc5189591221c00958f3458f33798c7caa.png" class="banner-logo" alt="error">
        </div>
      </div>
    </div>
    <transition name="loginBox">
      <div class="tooltip_popover1" v-show="login_popover_flag" @mouseenter="showLoginBox" @mouseleave="hideLoginBox">
        <div class="triangle"></div>
        <div class="tp1_container">
          <div class="title">
            登录后你可以:
          </div>
          <div class="img_panel">
            <div class="img">
              <img src="https://static.hdslb.com/images/danmu.png" class="img_style" alt="">
              <img src="https://static.hdslb.com/images/danmu.png" class="img_style" alt="">
            </div>
          </div>
          <div class="btn_box">
            <router-link class="btn_register" to="/register">注册</router-link>
            <router-link class="btn_login" to="/login">登录</router-link>
          </div>
        </div>
        <div class="lang_change">
          <div class="lang_item">
            <i class="iconfont"></i>
            <a>语言:简体中文</a>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
// import axios from 'axios'
import { ref } from 'vue'
import Mheader from '../components/m-header/m-header.vue'
import 'src/common/sakura'

export default {
  setup () {
    return {
      ...getSliderImg(),
      ...loginBoxFun()
    }
  },
  components: {
    Mheader
  },
  methods: {
  },
  mounted () {
    const temp_imgs = document.querySelectorAll('.banner-img-layer')
    const imgs = [...temp_imgs]

    const o_imgs_styles = imgs.map(el => {
      const s = window.getComputedStyle(el.getElementsByTagName('img')[0], null).getPropertyValue('transform')
      return `transform: ${s}`
    })

    const o_imgs_opacitys = imgs.map(el => {
      const o = window.getComputedStyle(el.getElementsByTagName('img')[0], null).getPropertyValue('opacity')
      return `opacity: ${o}`
    })

    const mb = document.getElementById('banner')
    let intX
    mb.onmouseenter = function ({ x }) {
      intX = x
    }

    mb.onmousemove = function ({ x }) {
      imgs.forEach((el, i) => {
        const dm = el.getElementsByTagName('img')[0].getAttribute('data-move-multiple')
        const dis = (intX - x) / Number(dm)
        const transform_arr = o_imgs_styles[i].split(',')
        const translate_x = Number(transform_arr[4])
        const new_translate_x = translate_x + dis
        transform_arr.splice(4, 1, new_translate_x.toString())
        let transform_str = transform_arr.join(',')

        if (el.getElementsByTagName('img')[0].getAttribute('data-is-opacity')) {
          const o_arr = o_imgs_opacitys[i].split(':')
          const href_w = window.screen.width / 2

          const o_dis = Number(el.getElementsByTagName('img')[0].getAttribute('data-is-opacity')) ? intX - x : x - intX

          const new_o_value = o_dis / href_w
          o_arr.splice(1, 1, new_o_value.toString())
          const o_str = o_arr.join(':')
          transform_str += `; ${o_str}`
        }

        el.getElementsByTagName('img')[0].setAttribute('style', transform_str)
      })
    }

    mb.onmouseleave = function () {
      imgs.forEach((el, i) => {
        el.getElementsByTagName('img')[0].setAttribute('style', o_imgs_styles[i])
      })
    }
  }
}

function loginBoxFun () {
  const login_popover_flag = ref(false)
  const showLoginBox = () => {
    login_popover_flag.value = true
  }
  const hideLoginBox = () => {
    login_popover_flag.value = false
  }
  return { login_popover_flag, showLoginBox, hideLoginBox }
}

function getSliderImg () {
  const sliderImg = ref([])
  sliderImg.value = []
  // axios.get('api/getSliderImg').then(res => {
  //   sliderImg.value = res.data
  // })
  return { sliderImg }
}
</script>

<style lang="stylus" scoped>
.home
  display block
  width 100%
  .header
    height 180px
    display block
    .banner
      margin 0 auto
      background-color #f9f9f9
      position relative
      z-index 0
      height 180px
      overflow hidden
      .banner-img-layer
        position absolute
        top 0
        left 0
        bottom 0
        right 0
        display flex
        align-items center
        justify-content center
        float left
        .banner-img-layer-img1
          width 5612px
          height 209px
          transform scale(1) translate(0px, -17.4194px) rotate(0deg)
          opacity 1
        .banner-img-layer-img2
          width 5612px
          height 209px
          transform scale(1) translate(1277.42px, 0px) rotate(0deg)
          opacity 1
        .banner-img-layer-img3
          width 1841px
          height 188px
          transform scale(1) translate(783.871px, 0px) rotate(0deg)
          opacity 1
        .banner-img-layer-img4
          width 1671px
          height 204px
          transform scale(1) translate(-739.742px, 0px) rotate(0deg)
          opacity 1
        .banner-img-layer-img5
          width 290px
          height 72px
          transform scale(1) translate(705.484px, 52.2581px) rotate(0deg)
          opacity 1
        .banner-img-layer-img6
          width 238px
          height 98px
          transform scale(1) translate(292.645px, 42.271px) rotate(0deg)
          opacity 0
        .banner-img-layer-img7
          width 1428px
          height 146px
          transform scale(1) translate(130.065px, 16.2581px) rotate(0deg)
          opacity 1
        .banner-img-layer-img8
          width 1428px
          height 94px
          transform scale(1) translate(-406.452px, 56.9032px) rotate(0deg)
          opacity 1
        .banner-img-layer-img9
          width 230px
          height 160px
          transform scale(1) translate(-278.71px, 18.5806px) rotate(0deg)
          opacity 0
        .banner-img-layer-img10
          width 67px
          height 118px
          transform scale(1) translate(-394.839px, 37.1613px) rotate(0deg)
          opacity 0
        .banner-img-layer-img11
          width 314px
          height 132px
          transform scale(1) translate(-104.516px, 15.6774px) rotate(0deg)
          opacity 1
        .banner-img-layer-img12
          width 2483px
          height 209px
          transform scale(1) translate(116.129px, 0px) rotate(0deg)
          opacity 1
        .banner-img-layer-img13
          width 487px
          height 170px
          transform scale(1) translate(250.839px, 15.6774px) rotate(0deg)
          opacity 1
        .banner-img-layer-img14
          width 515px
          height 245px
          transform scale(1) translate(2438.71px, 0px) rotate(0deg)
          filter blur(2px)
          opacity 1
        .banner-img-layer-img15
          width 1112px
          height 209px
          transform scale(1) translate(-1161.29px, 0px) rotate(0deg)
          filter blur(1px)
          opacity 1
      .snow
        z-index 100
        position absolute
        top 0
      .banner-logo-wrap
        width 74%
        height 180px
        margin 0 auto
        position relative
        bottom 0
        z-index 40
        .banner-logo
          position absolute
          bottom 0
          max-height 78px
  .tooltip_popover1
    width 360px
    position absolute
    right 40px
    top 60px
    z-index 100
    background-color #ffffff
    box-shadow rgba(0, 0, 0, 0.2) 0px 3px 6px 0px
    color rgb(96, 98, 102)
    font-size 14px
    font-weight normal
    &.tooltip_popover1-enter-active, &.tooltip_popover1-leave-active
      transition: all 1s

    &.tooltip_popover1-enter, &.tooltip_popover1-leave-to
      opacity: 0
    .tp1_container
      width 320px
      padding 16px 20px 12px 20px
      border-bottom 1px solid rgb(244, 244, 244)
      .title
        width 100%
        line-height 19px
        height 19px
        margin-bottom 15px
        color rgb(33, 33, 33)
      .img_panel
        height 200px
        width 100%
        overflow hidden
        background-image url("https://static.hdslb.com/images/base/danmu.png")
        .img
          float left
          position relative
          left 0
          top 0
          height 200px
          width 640px
          animation slideshow1 5s linear infinite
          .img_style
            float left
      .btn_box
        width 100%
        height 54px
        text-align center
        line-height 36px
        .btn_register
          width 46%
          height 36px
          float left
          border 1px solid rgb(0, 161, 214)
          border-radius 2px
          margin-top 15px
        .btn_login
          width 46%
          height 36px
          float right
          color white
          background-color rgb(0, 181, 229)
          border 1px solid rgb(0, 161, 214)
          border-radius 2px
          margin-top 15px
          &:hover
            background-color #66b1ff
    .lang_change
      width 100%
      height 42px
      .lang_item
        padding 8px 23px
        color rgb(96, 98, 102)
    .triangle
      display: block
      height: 0
      width: 0
      border: 10px solid transparent
      border-bottom-color: #ffffff
      position: absolute
      top: -20px
      left: calc(50% - 10px)
  @keyframes slideshow1
    0%
      left 0
    100%
      left -100%
</style>
