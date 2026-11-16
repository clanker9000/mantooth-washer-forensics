var adsAIM_CI=200,adsAIM_DI,adsAIM_W,adsAIM_H,adsAIM_M,adsAIM_Try=0
function adsAIM_Reload(){
if (window.external.AimAdCanRotate!="false"){
window.location.reload()}}
function htmlAdWHAIM(m,w,h){
adSetTarget('_blank')
adSetType('I')
htmlAdWH(m,w,h)
document.write('<IFRAME ID="adsF1" NAME="adsF1" STYLE="display:none;" WIDTH='+w+' HEIGHT='+h+' MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO FRAMEBORDER=0></IFRAME>')
adsAIM_W=w
adsAIM_H=h
adsAIM_M=m
if (!window.external.AimAdRotateInterval){
adsAIM_DI=60000
}else{adsAIM_DI=window.external.AimAdRotateInterval}
if (adsIE&&adsUA.indexOf('Win')!=-1&&document.getElementById&&adsUA.indexOf('MSIE 5.0')==-1){
adsAIM_ck_adLoaded('adsF0')
}else{x=setInterval("adsAIM_Reload()",adsAIM_DI)}}
function adsAIM_ck_adLoaded(id){
if (adsAIM_Try>9){adsAIM_Try=0;adsAIM_adLoaded(id)}
else {var ad=document.getElementById(id)
if (ad&&ad.readyState=='complete'){
adsAIM_adLoaded(id)
adsAIM_Try=0
}else{adsAIM_Try++;setTimeout('adsAIM_ck_adLoaded("'+id+'")',adsAIM_CI)}}}
function adsAIM_adLoaded(ti){
var oi=(ti=='adsF0'?'adsF1':'adsF0'),oa=document.getElementById(oi),ta=document.getElementById(ti)
if (oa&&ta){
oa.style.display='none'
ta.style.display=''
setTimeout('adsAIM_loadNextAd("'+oi+'")',adsAIM_DI)}}
function adsAIM_loadNextAd(id){
if (window.external.AimAdCanRotate!="false"){
var n=document.getElementById(id)
var adsDAIM=new Date()
var adsScrAIM=adsDAIM.getTime()%0x3fffffff
n.src=adsHt+"/html/"+adsAIM_M+"/"+adsScrAIM+"/"+adsExt+"?"+adsNMSG+"&width="+adsAIM_W+"&height="+adsAIM_H+"&target=_blank"+adsTz+adsScS+adsSr+adsSN+adsWM+adsOt+adsDOth+"&tile=1&CT=I"
setTimeout('adsAIM_ck_adLoaded("'+id+'")',adsAIM_CI)
}else{setTimeout('adsAIM_loadNextAd("'+id+'")',adsAIM_DI)}}
