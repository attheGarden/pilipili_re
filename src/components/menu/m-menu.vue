<template>
  <div class="home-menu-wrap">
    <div class="home-menu">
      <div class="left-wrap">
        <ul class="left-content">
          <li class="left-item">
            <a href="">
              <div class="item-icon" style="background-color: rgb(255, 92, 124)">
                <i class="iconfont">&#xe609;</i>
              </div>
              <span class="item-text">首页</span>
            </a>
          </li>
          <li class="left-item">
            <a href="">
              <div class="item-icon" style="background-color: rgb(252, 186, 42)">
                <i class="iconfont" style="font-weight: 700; font-size: 28px">&#xe625;</i>
              </div>
              <span class="item-text">动态</span>
            </a>
          </li>
          <li class="left-item">
            <a href="">
              <div class="item-icon" style="background-color: rgb(255, 113, 109)">
                <i class="iconfont" style="font-weight: 600; font-size: 27px">&#xe88e;</i>
              </div>
              <span class="item-text">热门</span>
            </a>
          </li>
          <li class="left-item">
            <a href="">
              <div class="item-icon" style="background-color: rgb(109, 199, 129)">
                <i class="iconfont" style="font-weight: 600; font-size: 21px">&#xe628;</i>
              </div>
              <span class="item-text">频道</span>
            </a>
          </li>
        </ul>
      </div>
      <span class="tab-line"></span>
      <div class="content-wrap">
        <div class="content-item" v-for="(item,index) in menuItem" :key="index" @mouseenter="showMenuSub(item)"
             @mouseleave="hideMenuSub(item)">
          <div class="content-item-text">{{item.name}}</div>
          <div v-if="item.num !== 'NO'" class="content-item-num" style="font-size: 12px">{{item.num}}</div>
          <div v-if="item.num === 'NO'" style="cursor: pointer">
            <i class="iconfont">&#xe645;</i>
          </div>
          <div v-show="item.flag" class="content-item-sub" @mouseenter="showMenuSub(item)" @mouseleave="hideMenuSub(item)">
            <div class="item-sub-triangle2"></div>
            <div v-for="(it, i) in item.sub" :key="i" class="sub-item">
              {{it}}
            </div>
          </div>
        </div>
      </div>
      <span class="tab-line"></span>
      <div class="right-wrap">
        <div class="right-wrap-item">
          <i class="iconfont" style="font-size: 20px;color: #00A1D6">&#xe763;</i>
          <i class="right-wrap-item-text">专栏</i>
        </div>
        <div class="right-wrap-item">
          <i class="iconfont" style="font-size: 22px;color: #00A1D6;font-weight: 700">&#xe619;</i>
          <i class="right-wrap-item-text">直播</i>
        </div>
        <div class="right-wrap-item">
          <i class="iconfont" style="font-size: 22px;color: #f39800">&#xe617;</i>
          <i class="right-wrap-item-text">活动</i>
        </div>
        <div class="right-wrap-item">
          <i class="iconfont" style="font-size: 20px;color: #ffea85">&#xe61f;</i>
          <i class="right-wrap-item-text">课堂</i>
        </div>
        <div class="right-wrap-item">
          <i class="iconfont" style="font-size: 21px;color: #f39800">&#xf1c9;</i>
          <i class="right-wrap-item-text">小黑屋</i>
        </div>
        <div class="right-wrap-item">
          <i class="iconfont" style="font-size: 22px;color: #00A1D6">&#xe697;</i>
          <i class="right-wrap-item-text">音乐PLUS</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  name: 'Mmenu',
  setup () {
    const menuItem = ref([])
    menuItem.value = [
      { name: '动画', num: '999+', sub: ['MAD·AMV', 'MMD·3D', '短书·手书·配音', '手办·模玩', '特摄·综合'], flag: false },
      { name: '音乐', num: '999+', sub: ['原创音乐', '翻唱', 'VOCALOID·UTAU', '电音', '演奏', 'MV', '说唱', '音乐现场', '音乐综合', '音频'], flag: false },
      { name: '舞蹈', num: '817', sub: ['MAD·AMV', 'MMD·3D', '短书·手书·配音', '手办·模玩', '特摄·综合'], flag: false },
      { name: '知识', num: '999+', sub: ['原创音乐', '翻唱', 'VOCALOID·UTAU', '电音', '演奏', 'MV', '说唱', '音乐现场', '音乐综合', '音频'], flag: false },
      { name: '生活', num: '999+', sub: ['MAD·AMV', 'MMD·3D', '短书·手书·配音', '手办·模玩', '特摄·综合'], flag: false },
      { name: '时尚', num: '999+', sub: ['原创音乐', '翻唱', 'VOCALOID·UTAU', '电音', '演奏', 'MV', '说唱', '音乐现场', '音乐综合', '音频'], flag: false },
      { name: '娱乐', num: '999+', sub: ['MAD·AMV', 'MMD·3D', '短书·手书·配音', '手办·模玩', '特摄·综合'], flag: false },
      { name: '放映厅', num: '185', sub: ['原创音乐', '翻唱', 'VOCALOID·UTAU', '电音', '演奏', 'MV', '说唱', '音乐现场', '音乐综合', '音频'], flag: false },
      { name: '番剧', num: '126', sub: ['MAD·AMV', 'MMD·3D', '短书·手书·配音', '手办·模玩', '特摄·综合'], flag: false },
      { name: '国创', num: '999+', sub: ['原创音乐', '翻唱', 'VOCALOID·UTAU', '电音', '演奏', 'MV', '说唱', '音乐现场', '音乐综合', '音频'], flag: false },
      { name: '游戏', num: '999+', sub: ['MAD·AMV', 'MMD·3D', '短书·手书·配音', '手办·模玩', '特摄·综合'], flag: false },
      { name: '数码', num: '950', sub: ['原创音乐', '翻唱', 'VOCALOID·UTAU', '电音', '演奏', 'MV', '说唱', '音乐现场', '音乐综合', '音频'], flag: false },
      { name: '鬼畜', num: '999+', sub: ['MAD·AMV', 'MMD·3D', '短书·手书·配音', '手办·模玩', '特摄·综合'], flag: false },
      { name: '资讯', num: '501', sub: ['原创音乐', '翻唱', 'VOCALOID·UTAU', '电音', '演奏', 'MV', '说唱', '音乐现场', '音乐综合', '音频'], flag: false },
      { name: '影视', num: '999+', sub: ['MAD·AMV', 'MMD·3D', '短书·手书·配音', '手办·模玩', '特摄·综合'], flag: false },
      { name: '更多', num: 'NO', sub: ['搞笑', '美食', '动物圈', '单机游戏', '汽车', 'VLOG'], flag: false }
    ]
    // const showMenuSub = function (el) {
    //   el.flag = true
    // }
    return {
      menuItem
    }
  },
  methods: {
    showMenuSub (el) {
      el.flag = true
    },
    hideMenuSub (el) {
      el.flag = false
    }
  }
}
</script>

<style scoped lang="stylus">
.home-menu-wrap
  width 100%
  height 108px
  .home-menu
    height 68px
    padding 20px 0
    width 100%
    display flex
    .left-wrap
      width 16%
      .left-content
        display flex
        .left-item
          width 64px
          height 66px
          border 1px solid rgb(255,255,255)
          text-align center
          .item-icon
            width 36px
            height 36px
            margin 0 auto 5px auto
            line-height 36px
            color white
            border-radius 50%
          .item-text
            font-size 14px
            color #000000
            text-align center
            &:hover {
              color #00a1d6
            }
    .content-wrap
      width 62%
      height 68px
      display flex
      flex-wrap wrap
      .content-item
        height 34px
        width  12%
        font-size 14px
        line-height 34px
        text-align left
        color rgb(33,33,33)
        .content-item-text
          float left
          margin-right 3px
          cursor pointer
          &:hover{
            color rgb(115,201,229)
          }
        .content-item-num
          width 30px
          height 14px
          margin-top 10px
          line-height 14px
          text-align center
          float left
          background-color rgb(115,201,229)
          color white
          font-size 10px
          border-radius 2px
          overflow hidden
        .content-item-sub
          min-width 160px
          height calc(43px * 4)
          position relative
          top 5px
          z-index 10
          display flex
          flex-direction row
          flex-wrap wrap
          background-color white
          border-radius 4px
          border 1px solid #ebeef5
          box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)
          writing-mode vertical-lr
          .item-sub-triangle1
            display block
            height 0
            width 0
            border 10px solid transparent
            border-top-color #ffffff
            position absolute
            bottom  -20px
            left calc(20% - 10px)
          .item-sub-triangle2
            display block
            height 0
            width 0
            border 10px solid transparent
            border-bottom-color #ffffff
            position absolute
            top  -20px
            left calc(10% - 10px)
          .sub-item
            writing-mode horizontal-tb
            font-size 12px
            padding 10px 13px
            height 17px
            cursor pointer
            &:hover {
              color #00A1D6
            }
    .right-wrap
      width 19%
      height 68px
      display flex
      flex-direction column
      flex-wrap wrap
      margin-left 20px
      .right-wrap-item
        height 34px
        font-size 14px
        line-height 34px
        cursor pointer
        .right-wrap-item-text
          color #212121
          font-style normal
          &:hover {
            color #00A1D6
          }
    .tab-line
      margin 10px 8px
      height 46px
      border-right 1px solid rgb(231,231,231)
</style>
