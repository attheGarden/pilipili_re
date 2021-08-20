/**
 * 秒数转为xx:xx:xx格式
 * @param time
 */
export function secondToNormal (time:number):string {
  const second = time % 60
  const hour = Math.floor(time / 60 / 60)
  const minute = hour > 0 ? Math.floor(time / 60) % 60 : Math.floor(time / 60)
  console.log(second)
  if (hour === 0) {
    return minute + ':' + (second > 9 ? second : 0 + second.toString())
  }
  return hour + ':' + (minute > 9 ? minute : 0 + minute.toString()) + ':' + (second > 9 ? second : 0 + second.toString())
}

/**
 * 数字处理为带单位字符串
 * @param num
 */
export function numberDeal (num:number):string {
  let temp
  if (Math.abs(num) > 100000000) {
    temp = (num / 100000000).toFixed(2) + '亿'
  } else if (Math.abs(num) > 10000) {
    temp = (num / 10000).toFixed(2) + '万'
  } else {
    temp = num
  }
  return temp
}
