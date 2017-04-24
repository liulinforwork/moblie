/**
 * Created by Administrator on 2017/4/24.
 */
var deviceWidth = document.documentElement.clientWidth;
if(deviceWidth > 1080) deviceWidth = 1080;

var docEl = document.documentElement;
console.log(devicePixelRatio);
dpr = window.devicePixelRatio || 1;
docEl.setAttribute('data-dpr', dpr);
var scale = 1 / devicePixelRatio;
document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px';