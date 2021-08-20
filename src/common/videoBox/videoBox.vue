<template>
  <div class="video-box">
    <div class="video-wrap" @mouseenter="getPreVideo" @mousemove="changePreVideo" @mouseleave="closePreVideo">
      <div class="video-pic-wrap" v-show="flag">
        <img :src="videoData.pic" class="video-pic">
      </div>
      <div class="video-pic-count" v-show="flag">
        <span class="video-pic-count-item" v-show="ifViewAndLike">
          <i class="iconfont" style="font-size: 14px;margin-right: 2px">&#xe72b;</i>
          {{view}}
        </span>
        <span class="video-pic-count-item" v-show="ifViewAndLike">
          <i class="iconfont" style="font-size: 16px;margin-right: 2px">&#xe61b;</i>
          {{like}}
        </span>
        <span>{{ time }}</span>
      </div>
      <div class="video-pre-wrap" v-show="!flag" ref="videoPreWrap">
        <div class="video-pre-percentage">
          <el-progress :percentage="percentage" color="#66b1ff" :show-text="false"></el-progress>
        </div>
        <div class="video-pre-danmu-warp" ref="preDanmuWrap">
          <span class="video-pre-danmu" v-for="(item, index) in danmu" :key="index"
                :style="{'top': (index % 2 ===0) ? '17px' : '0'}">
            {{ item }}
          </span>
        </div>
      </div>
    </div>
    <div class="title-wrap" :title="videoData.title">{{ videoData.title }}</div>
    <div class="author-wrap">
      <i class="iconfont" style="font-size: 14px;margin-right: 3px">&#xe667;</i>
      <span class="name">{{ videoData.owner?.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { numberDeal, secondToNormal } from '@/common/utils'
import { nextTick, ref } from 'vue'
import axios from 'axios'

export default {
  name: 'videoBox',
  props: {
    videoData: {
      type: Object,
      default: null
    },
    // 是否显示播放数和点赞数
    ifViewAndLike: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const time = ref(secondToNormal(props.videoData.duration))
    const view = ref(numberDeal(props.videoData.stat.view))
    const like = ref(numberDeal(props.videoData.stat.like))
    const boxWidth = ref(206)
    const flag = ref(true)
    const preImgUrl = ref('')
    const preImgNum = ref(0)
    const space = ref(0)
    const layerX = ref(0)
    const percentage = ref(0)
    const danmu = ref([])
    const timeFlags = ref([])
    return {
      time, // 视频时长,
      boxWidth,
      flag, // 鼠标移入标志
      preImgUrl, // 预览图url
      preImgNum, // 预览图切片数目
      space, // 每个快照切片所占长度
      layerX,
      percentage, // 进度
      danmu,
      timeFlags,
      view,
      like
    }
  },
  methods: {
    // 获取预览图信息和弹幕信息
    async getPreVideo (event) {
      const videoUrlTemp = '/api/pvideo?aid=' + this.videoData.aid
      const res1 = await axios.get(videoUrlTemp)
      this.preImgUrl = 'http:' + res1.data.data.image[0]
      this.preImgNum = (res1.data.data.image.length > 1) ? 100 : (res1.data.data.index.length - 1)
      this.space = this.boxWidth / this.preImgNum
      this.changePreVideo(event)
      this.flag = false

      // console.log(temp)
      const danmuUrlTemp = '/api/x/v2/dm/ajax?aid=' + this.videoData.aid
      const res2 = await axios.get(danmuUrlTemp)
      this.danmu = res2.data.data
      await this.$nextTick()
      const temp = this.$refs.preDanmuWrap.children
      for (let i = 0; i < temp.length; i++) {
        temp[i].setAttribute('style', 'transform: translateX(0px);')
        clearTimeout(this.timeFlags[i])
      }
      if (temp.length > 0) {
        let i = 0
        let widthTemp = 0
        let topTemp = 0
        const timeFlagsTemp = []
        timeFlagsTemp[i] = setTimeout(function setTimeFunc () {
          widthTemp = temp[i].clientWidth + 206
          topTemp = (i % 2) === 0 ? 17 : 0
          temp[i].setAttribute('style', `transform: translateX(-${widthTemp}px);top: ${topTemp}px;`)
          if (i === (temp.length - 1)) {
            timeFlagsTemp[i] = setTimeout(() => {
              temp[i].setAttribute('style', `transform: translateX(-${widthTemp}px);top: ${topTemp}px;`)
            }, 1500)
          } else {
            i++
            timeFlagsTemp[i] = setTimeout(setTimeFunc, 1500)
          }
        }, 0)
        this.timeFlags = timeFlagsTemp
      }
    },
    changePreVideo (event) {
      const currentImgNum: number = Math.floor(event.layerX / this.space) // 当前是第几张快照切片
      this.percentage = currentImgNum > 0 ? currentImgNum < 100 ? currentImgNum : 100 : 0
      const currentY: number = Math.floor((currentImgNum % 10 === 0) ? currentImgNum / 10 : currentImgNum / 10) * 116
      const currentX: number = (currentImgNum % 10 === 0) ? 0 : (currentImgNum % 10 - 1) * 206
      this.$refs.videoPreWrap.style.backgroundImage = `url('${this.preImgUrl}')`
      this.$refs.videoPreWrap.style.backgroundPosition = `-${currentX}px -${currentY}px`
    },
    closePreVideo () {
      this.flag = true
      const temp = this.$refs.preDanmuWrap.children
      for (let i = 0; i < temp.length; i++) {
        temp[i].setAttribute('style', 'transform: translateX(0px);')
        clearTimeout(this.timeFlags[i])
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.video-box
  width 206px
  display flex
  flex-direction column

  .video-wrap
    height 116px
    overflow hidden

    .video-pic-wrap
      height 116px

      .video-pic
        height 116px
        width 206px

    .video-pic-count
      width 190px
      height 16px
      color white
      font-size 12px
      line-height 16px
      text-align right
      padding 6px 8px
      position relative
      top -28px
      z-index 10
      .video-pic-count-item
        display flex
        float left
        margin-right 4px
      background-image linear-gradient(
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.4) 30%,
        rgba(0, 0, 0, 0.5) 45%,
        rgba(0, 0, 0, 0.9) 85%,
        rgba(0, 0, 0, 0.66)
      )

    .video-pre-wrap
      height 116px
      background-size 2060px

      .video-pre-percentage
        width 190px
        height 2px
        background-color rgb(63, 63, 63)
        padding 4px 8px
        overflow hidden

      .video-pre-danmu-warp
        height 45px
        width 206px
        overflow hidden
        white-space nowrap
        position absolute

        .video-pre-danmu
          height 17px
          font-size 12px
          line-height 17px
          color white
          position absolute
          left 206px
          transition 6s linear

  .title-wrap
    height 40px
    line-height 20px
    padding-right 12px
    font-size 14px
    font-weight 500
    margin 10px 0
    color rgb(33, 33, 33)
    display -webkit-box
    -webkit-line-clamp 2
    -webkit-box-orient vertical
    overflow hidden
    cursor pointer

    &:hover
      color #66b1ff

  .author-wrap
    display flex
    height 16px
    font-size 12px
    color #999
    line-height 16px

    .name
      overflow hidden
      cursor pointer

      &:hover
        color #66b1ff
</style>
