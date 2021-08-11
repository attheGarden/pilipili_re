<template>
  <div class="adBox">
    <div class="img-wrap">
      <img src="https://i0.hdslb.com/bfs/sycp/creative_img/202106/ed7a38f96b6fc524ca1885b5f666c01a.jpg@412w_232h_1c"
           class="ad-img">
    </div>
    <div class="title-wrap">
      <span class="title-wrap-left">广告</span>
      <span class="title-wrap-right">每天兼职一小时,在家接单赚外快!!!</span>
    </div>
    <div class="author-wrap">中职通</div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'adBox'
}
</script>

<style scoped lang="stylus">
.adBox
  overflow hidden
  min-height 192px
  .img-wrap
    width 100%
    height 116px
    .ad-img
      width 206px
  .title-wrap
    width 194px
    height 40px
    padding-right 12px
    margin 10px 0 8px 0
    font-size 14px
    line-height 20px
    .title-wrap-left
      width 30px
      height 14px
      color #b2b2b2
      border 1px solid #b2b2b2
      margin-right 8px
      font-size 12px
      border-radius 2px
      text-align center
    .title-wrap-right
      color rgb(33, 33, 33)
      cursor pointer
      &:hover
        color #66b1ff
  .author-wrap
    width 100%
    height 16px
    font-size 12px
    line-height 16px
    color #999
    text-align left
    cursor pointer
    &:hover
      color #66b1ff
</style>
