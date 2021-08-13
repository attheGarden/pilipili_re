<template>
  <div class="video-box">
    <div class="video-wrap" @mouseenter="getPreVideo" @mousemove="changePreVideo" @mouseleave="closePreVideo">
      <div class="video-pic-wrap" v-show="flag">
        <img :src="videoData.pic" class="video-pic">
      </div>
      <div class="video-pic-count" v-show="flag">{{ time }}</div>
      <div class="video-pre-wrap" v-show="!flag" ref="videoPreWrap">
        <div class="video-pre-percentage">
          <el-progress :percentage="percentage" color="#66b1ff" :show-text="false"></el-progress>
        </div>
        <div class="video-pre-danmu-warp">
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
import { secondToNormal } from '@/common/utils'
import { ref } from 'vue'
import axios from 'axios'

export default {
  name: 'videoBox',
  props: {
    videoData: {
      type: Object,
      default: null
    }
  },
  setup (props) {
    console.log(props.videoData.duration)
    const time = ref('')
    const boxWidth = ref(206)
    const flag = ref(true)
    const preImgUrl = ref('')
    const preImgNum = ref(0)
    const space = ref(0)
    const layerX = ref(0)
    const percentage = ref(0)
    const danmu = ref([])
    return {
      time, // 视频时长,
      boxWidth,
      flag, // 鼠标移入标志
      preImgUrl, // 预览图url
      preImgNum, // 预览图切片数目
      space, // 每个快照切片所占长度
      layerX,
      percentage, // 进度
      danmu
    }
  },
  watch: {
    videoData: {
      handler (newVal, oldVal) {
        // console.log(typeof secondToNormal(newVal.duration))
        this.time = secondToNormal(newVal.duration)
      }
    }
  },
  methods: {
    // 获取预览图信息和弹幕信息
    async getPreVideo (event) {
      await axios.get('/api/pvideo?aid=761930368').then(res => {
        // console.log(event.layerX)
        this.preImgUrl = 'http:' + res.data.data.image[0]
        this.preImgNum = (res.data.data.image.length > 1) ? 100 : (res.data.data.index.length - 1)
        // console.log(this.preImgNum)
        this.space = this.boxWidth / this.preImgNum
        this.changePreVideo(event)
        this.flag = false
      })
      await axios.get('/api/x/v2/dm/ajax?aid=761930368').then(res => {
        // console.log(res.data.data)
        this.danmu = res.data.data
        const temp = document.querySelectorAll('.video-pre-danmu')
        if (temp.length > 0) {
          // temp[0].setAttribute('style', 'transform: translateX(-206px);')
          // console.log(temp[0].clientWidth)
        }
      })
    },
    changePreVideo (event) {
      // console.log(event.layerX)
      const currentImgNum: number = Math.floor(event.layerX / this.space) // 当前是第几张快照切片
      this.percentage = currentImgNum > 0 ? currentImgNum < 100 ? currentImgNum : 100 : 0
      // console.log('currentImgNum: ' + currentImgNum)
      const currentY: number = Math.floor((currentImgNum % 10 === 0) ? currentImgNum / 10 : currentImgNum / 10 + 1) * 116
      const currentX: number = (currentImgNum % 10 === 0) ? 0 : (currentImgNum % 10 - 1) * 206
      this.$refs.videoPreWrap.style.backgroundImage = `url('${this.preImgUrl}')`
      this.$refs.videoPreWrap.style.backgroundPosition = `-${currentX}px -${currentY}px`
    },
    closePreVideo () {
      this.flag = true
      const temp = document.querySelectorAll('.video-pre-danmu')
      temp[0].setAttribute('style', 'transform: translateX(0px);')
    }
  }
}
</script>

<style scoped lang="stylus">
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
          transition 3s

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
