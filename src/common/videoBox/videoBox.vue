<template>
  <div class="video-box">
    <div class="video-wrap">
      <div class="video-pic-wrap">
        <img :src="videoData.pic" class="video-pic">
      </div>
      <div class="video-pic-count">{{time}}</div>
    </div>
    <div class="title-wrap" :title="videoData.title">{{videoData.title}}</div>
    <div class="author-wrap">
      <i class="iconfont" style="font-size: 14px;margin-right: 3px">&#xe667;</i>
      <span class="name">{{ videoData.owner?.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { secondToNormal } from '@/common/utils'
import { ref, watch } from 'vue'

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
    return {
      time
    }
  },
  watch: {
    videoData: {
      handler (newVal, oldVal) {
        // console.log(typeof secondToNormal(newVal.duration))
        this.time = secondToNormal(newVal.duration)
      }
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
          rgba(0,0,0,0) 0%,
          rgba(0,0,0,0.4) 30%,
          rgba(0,0,0,0.5) 45%,
          rgba(0,0,0,0.9) 85%,
          rgba(0,0,0,0.66)
        )
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
