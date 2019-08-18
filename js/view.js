var deviceWidth = document.documentElement.clientWidth;//获取html宽度（设备宽度）
// 720可以根据实际设计稿的宽度进行修改
if(deviceWidth>1920){
    deviceWidth = 1920;
}
var fs = (deviceWidth*100)/1920;
document.documentElement.style.fontSize = fs + 'px';

