<template>
  <div class="video-box" ref="videoBox" @mouseenter="showCover" @mouseleave="hideCover">
    <div class="img-wrap">
      <img :src="dataOfVideo.pic" class="videoImg">
    </div>
    <div class="cover-wrap" ref="coverWrap" v-show="isCover">
      <div class="cover-content" ref="coverContent">
        <a class="cover-title" :title="dataOfVideo.title" ref="coverTitle">{{dataOfVideo.title}}</a>
        <p class="cover-up" v-show="coverFlag">
          <a style="border-radius: 5px;border: 1px solid #e0e0e0;color: white;font-size: 10px;height: 8px;padding: 0 3px">
            up</a>
          {{dataOfVideo.owner.name}}
        </p>
        <p class="cover-play" v-show="coverFlag">{{playNum}}播放</p>
        <a class="cover-play-icon" v-show="coverFlag">
          <i class="iconfont">&#xe61a;</i>
        </a>
      </div>
      <div class="cover" ref="cover"></div>
    </div>
    <div class="external-wrap">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  name: 'videoBox',
  props: {
    // 是否有遮盖层
    isCover: {
      type: Boolean,
      default: false
    },
    // 是否包含播放量和点赞数
    withPlayAndStar: {
      type: Boolean,
      default: false
    },
    // 是否包含时间
    withTime: {
      type: Boolean,
      default: false
    },
    // 数据
    dataOfVideo: {
      type: Object,
      default: null
    }
  },
  setup (props) {
    const coverFlag = ref(false)
    const playNum = ref('')
    if (Math.abs(props.dataOfVideo.stat.view) > 100000000) {
      playNum.value = (props.dataOfVideo.stat.view / 100000000).toFixed(2) + '亿'
    } else if (Math.abs(props.dataOfVideo.stat.view) > 10000) {
      playNum.value = (props.dataOfVideo.stat.view / 10000).toFixed(2) + '万'
    } else {
      playNum.value = props.dataOfVideo.stat.view.toFixed(2)
    }
    return { coverFlag, playNum }
  },
  methods: {
    showCover () {
      this.coverFlag = true
      this.$refs.coverContent.style.transition = 'all 0.3s'
      this.$refs.coverContent.style.transform = 'translateY(-65px)'
      this.$refs.coverTitle.style.webkitLineClamp = '2'
      this.$refs.coverTitle.style.height = '36px'
      this.$refs.coverWrap.style.backgroundImage = 'linear-gradient(\n' +
        '        rgba(0,0,0,0.0) 0%,\n' +
        '        rgba(0,0,0,0.0) 100%\n' +
        '      )'
      this.$refs.cover.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
      this.coverFlag = true
    },
    hideCover () {
      this.coverFlag = false
      this.$refs.coverContent.style.transition = 'all 0.3s'
      this.$refs.coverContent.style.transform = 'translateY(0)'
      this.$refs.coverTitle.style.webkitLineClamp = '1'
      this.$refs.coverTitle.style.height = '18px'
      this.$refs.coverWrap.style.backgroundImage = 'linear-gradient(\n' +
        '      rgba(0,0,0,0) 0%,\n' +
        '      rgba(0,0,0,0.4) 30%,\n' +
        '      rgba(0,0,0,0.5) 45%,\n' +
        '      rgba(0,0,0,0.9) 85%,\n' +
        '      rgba(0,0,0,0.66)\n' +
        '    )'
      this.$refs.cover.style.backgroundColor = 'rgba(0, 0, 0, 0.0)'
      this.coverFlag = false
    }
  }
}

</script>

<style scoped lang="stylus">
.video-box
  height 100%
  overflow hidden
  .img-wrap
    width 100%
    height 100%
    .videoImg
      width 206px
      max-height 100%
  .cover-wrap
    width 186px
    height 82px
    padding 24px 10px 10px 10px
    position relative
    transform translateY(-54px)
    background-image linear-gradient(
      rgba(0,0,0,0) 0%,
      rgba(0,0,0,0.4) 30%,
      rgba(0,0,0,0.5) 45%,
      rgba(0,0,0,0.9) 85%,
      rgba(0,0,0,0.66)
    )
    .cover-content
      width 186px
      height 82px
      .cover-title
        height 18px
        width 186px
        color rgb(224,224,224)
        font-weight 500
        line-height 18px
        display -webkit-box
        -webkit-box-orient vertical
        text-overflow ellipsis
        overflow hidden
        -webkit-line-clamp 1
        font-size 14px
        margin-bottom 6px
      .cover-up
        width 100%
        height 18px
        color rgb(224,224,224)
        line-height 18px
        font-size 12px
        text-align left
        font-weight 400
        margin-bottom 3px
      .cover-play
        width 100%
        height 16px
        color rgb(224,224,224)
        font-size 12px
        text-align left
        margin-bottom 3px
      .cover-play-icon
        width 28px
        height 28px
        color white
        position relative
        top -34px
        right -150px
    .cover
      width 203px
      height 116px
      background-color rgba(0, 0, 0, 0.0)
      position relative
      top -168px
      left -10px
      z-index -2
@keyframes coverAnimation
  0%
    transform translateY(-116px)
  100%
    transform translateY(0px)
</style>
