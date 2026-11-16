if (window.adsIn!=1){adsIn=1
var adsCp=0,adsLo=location.href,adsInd=adsLo.indexOf('atwCrPr=')
if (adsInd>0)adsCp=1
var adsHt="http://ar.atwola.com",adsD=new Date(),adsTz="&TZ="+adsD.getTimezoneOffset(),adsScr=adsD.getTime()%0x3fffffff,adsTar='_top',adsTpSet=0,adsExt='aol',adsTp='J',adsSL="<SCRIPT LANGUAGE='JavaScript' SRC='"
var adsDel=0,adsDel1=0,adsOld=1,adsNMSG,adsNG,adsNM,adsSr="",adsScS='',adsOt='',adsSN='',adsESN='',adsWM='',adsIP=" SCROLLING=NO FRAMEBORDER=0 MARGINHEIGHT=0 MARGINWIDTH=0></IFRAME>"
var adsNv=navigator,adsAN=adsNv.appName,adsAVA=adsNv.appVersion,adsAV=parseInt(adsAVA),adsUA=adsNv.userAgent,adsLNm=0,adsLMN=new Array(),adsCo=new Array(),adsCN=0
var adsAH1="<A HREF='",adsAH2="/"+adsScr+ "/",adsOne=0,adsI1="<IMG SRC=",adsI2="/"+adsScr +"/",adsI3=" BORDER=0 ALT=\"Advertisement\"></A>",adsDOth='',adsTile=1,adsInt=0
var adsIE=(adsAN=="Microsoft Internet Explorer"),adsNS=(adsAN=="Netscape"),adsN4=(adsNS&&adsAV==4),adsN6=(adsNS&&adsAV>=5),adsOp=(adsUA.indexOf("Opera")!=-1)
var adsPage='',adsDivs=new Array(),adsFAd=''
var adsUAL=adsUA.toLowerCase(),adsAppVer=navigator.appVersion.toLowerCase(),adsMin='',adsMac=(adsUAL.indexOf("mac")!=-1),adsIEP=adsAppVer.indexOf('msie'),adsIE6=''
if (adsIEP!=-1){if(adsMac){adsIEP=adsUAL.indexOf('msie')
adsMin=parseFloat(adsUAL.substring(adsIEP+5,adsUAL.indexOf(';',adsIEP)))}else{
adsMin=parseFloat(adsAppVer.substring(adsIEP+5,adsAppVer.indexOf(';',adsIEP)))}}
if ((adsIE)&&(parseInt(adsMin)>=6)){adsIE6=1}
if (((adsNS||adsIE)&&adsAV>=4)&&!adsN4&&!adsOp){adsOld=0}
function adsClFn(z){if (window.adsCol0)return eval('window.adsCol'+z)
else return('<!---->')}
function adSetRotate(){}
function adSetDelay(v){if (!adsOp){adsDel=escape(v);if (adsDel>0){adsDel1=1}}}
function adSetBucketMN(){}
function adSetHtNm(v){adsHt=(v.indexOf('http')==-1?"http://"+v:v)
if (v.indexOf('ar5')>=0||v.indexOf('ar6')>=0||v.indexOf('ar7')>=0||v.indexOf('ar8')>=0||v.indexOf('ar9')>=0){if (!adsTpSet){adsTp=''};adsInt=1}}
function adSetTarget(v){adsTar=escape(v)}
function adSetSN(v){adsSN='&SN='+escape(v)}
function adSetWM(v){adsWM='&WM='+escape(v)}
function adSetNewMedia(v){adsNM=escape(v);adsNMSG=(v!=''?"NM="+adsNM:"")}
function adSetExt(v){adsExt=escape(v)}
function adSetOthDclk(v){if(adsDOth==''){adsDOth='&dclkOther='+escape(v)}else{
if ((adsDOth.indexOf('rsi')==-1)||(v.indexOf('rsi=')==-1)){adsDOth+=escape(v)}}}
function adRSI(x){var c=document.cookie,q="",b=c.indexOf('rsi_segs=')
if(b>=0){b=c.indexOf('=',b)+1
if(b>0){var e=c.indexOf(';',b)
if(e==-1)e=c.length
var s=c.substring(b,e).split('|')
for (j=0;j<Math.min(x,s.length);j++){
q+=s[j].replace(/.*_(.*)/,"rsi=$1;")}}}
if (q!="")adSetOthDclk(q)
b=c.indexOf('RSP_COOKIE=')
if(b>=0){b=c.indexOf('&name=',b)+6
if(b>0){var e=c.indexOf(';',b)
var e1=c.indexOf('&',b)
if (e1<e)e=e1
if(e==-1)e=c.length
adsESN='&ESN='+c.substring(b,e)}}}
adRSI(30)
function adSetSearch(v){if (v){v=v.replace(/\+/g,' ');adsSr=(v!=''?(window.encodeURIComponent)?"&search="+encodeURIComponent(v):"&search="+escape(v):"")}}
function adSetType(v){if (v==''&&!adsInt)v='J'
adsTp=v.toUpperCase()
adsTpSet=1}
function adSetOther(v){adsOt=v}
function adSetSearchCat(v){}
function adsCkPlg(){
var e='</',ie=0,dc=document,dl=dc.layers,da=dc.all,dg=dc.getElementById,n=navigator,db=dc.body
var cid='componentid',beh='url(#default#clientCaps)',ie5=da&&dg,go=(da||dl||(dg&&!da))
if (adsUA.indexOf('MSIE')!=-1&&adsUA.indexOf('Win')!=-1){ie=1
var d=document.writeln
d('<script language="VBscript">')
d('Dim adsVB,po')
d('adsVB=0')
d('If ScriptEngineMajorVersion >=2 then adsVB=1')
d('Function adsAX(aX)')
d('on error resume next')
d('If adsVB=1 then')
d('adsAX=False')
d('set po=CreateObject(aX)')
d('adsAX=IsObject(po)')
d('If (err) then adsAX=False')
d('Else')
d('adsAX=False')
d('End If')
d('End Function')
d(e+'script>')}
var i,u=0,dF='',fS,p=n.plugins
if (ie&&window.adsVB){u=0}else{u=1}
if (p){var l=p.length
if (l>1){var m=n.mimeTypes,fl=m['application/x-shockwave-flash']
if (m&&((fl&&fl.enabledPlugin&&(fl.suffixes.indexOf('swf')!=-1)))){
var ds,f="Flash ",nm
if (adsNS&&(n.appVersion.indexOf('4.0')!=-1)){
for(i in p){
ds=p[i].description,fS=ds.indexOf(f)
if (fS!=-1){if (ds.substring(fS+6,fS+7)>=6){dF='F'}}}}else{
for (i=0;i<l;i++){
ds=p[i].description,nm=p[i].name
fS=ds.indexOf(f)
fN=nm.indexOf(f)
if (fS!=-1){if (ds.substring(fS+6,fS+7)>=6){dF='F'}else if (fN!=-1){if (nm.substring(fN+6,fN+7)>=6){dF='F'}}}}}
if (fl==null)dF=''
}}else if(ie==1&&!u){if (!ie5||adsUA.indexOf('NT')!=-1){fS="ShockwaveFlash.ShockwaveFlash."
dF=(adsAX(fS+"6")?'F':'')
if (!dF){dF=(adsAX(fS+"7")?'F':'')}
if (!dF){dF=(adsAX(fS+"8")?'F':'')}}}else{dF=''}
}else{dF=''}
if (go){if (n.platform=='Win32'){
if (ie5&&(db!=null)){db.style.behavior=beh
var fC='{D27CDB6E-AE6D-11CF-96B8-444553540000}',fV=db.getComponentVersion(fC,cid)
if (fV.charAt(0)>=6){dF='F'}}}}
adsNMSG="SNM=HIBV"+((!adsN4&&dF)?'D':'')+dF}
function adsGetAdURL(w){var d=w.frameElement.parentNode
return d.adURL}
function adsLoadAd(){var ifr=document.createElement('iframe')
ifr.id="adFr"
ifr.marginWidth=0
ifr.marginHeight=0
ifr.frameBorder=0
ifr.scrolling="no"
ifr.width="1px";
ifr.height="1px"
ifr.divName=this.divName
this.appendChild(ifr)
ifr.src=this.adPage}
function adSetupDiv(w,h,adURL,dv1,adPage){
if (typeof(dv1)!='object')var dv=document.getElementById(dv1)
else var dv=dv1
dv.LoadAd=adsLoadAd
dv.adURL=adURL
dv.adPage=adPage
dv.divName=dv1
dv.w=w
dv.h=h
adsDivs[adsDivs.length]=dv}
function htmlAdWH(m,w,h,t,divName,fName){if (t)t=t.toLowerCase()
var d=document,ah=adsExt+"' TARGET="+adsTar+">",p=" WIDTH="+w+" HEIGHT="+h,l=adsAH1+adsHt+"/link/"+m+adsAH2+ah,c='adsCo'
var p1=adsTz+adsSr+adsSN+adsESN+adsWM+adsOt+adsDOth,i1=adsI1+adsHt+"/image/"+m+adsI2+adsExt+"?"+p1+"'"+p+adsI3,j,r=0
if (adsCp){var ca=adsLo.substr(adsInd+8).split('|'),cF=new Array(),cW=new Array(),cH=new Array(),cAd=new Array(),k=0
for (var i=0;i<ca.length;i=i+4){cF[k]=ca[i];cW[k]=ca[i+1];cH[k]=ca[i+2];cAd[k++]=ca[i+3]}
for (var i=0;i<cF.length;i++){if ((cW[i]==w&&cH[i]==h)||(cAd[i]==adsTile)){
if (adsTp!='J'){d.write('<IFRAME SRC="'+cF[i]+'.html" WIDTH='+w+' HEIGHT='+h+adsIP)}
else{d.write(adsSL+cF[i]+".js'></SCRIPT>")}r=1
break}}}
if (r==0){if (!adsOld){if (!adsNMSG){if (!adsNG){adsCkPlg()
adsNG=adsNMSG}else{adsNMSG=adsNG}}
var s=adsHt+"/html/"+m+"/"+adsScr+"/"+adsExt+"?"+adsNMSG+"&width="+w+"&height="+h+"&target="+adsTar+"&tile="+adsTile+p1+"&CT=",ie4=(adsAVA.indexOf('MSIE 4')!=-1)
j=c+adsCN
if ((((t=='c'||t=='text')&&((adsN6&&(adsUA.indexOf('rv:0')!=-1||adsUA.indexOf('Safari')!=-1))||ie4||(adsAVA.indexOf('MSIE 5.0')!=-1))))||(ie4&&t=='d')||adsN4||(t=='text'&&adsIE&&!adsIE6)){
adsTp='J',t=''}
if(t=='c'&&adsInt){d.write ('<IFRAME ID="'+j+'" NAME="'+j+'" SRC="about:blank" HEIGHT=0 WIDTH=0'+adsIP)
adsCo[adsCN++]=s+"|"+w+"|"+h}
else if(t=='d'&&adsInt){d.write('<DIV ID="'+j+'" NAME="'+j+'"></DIV>')
adsCo[adsCN++]=s+"|T"}
else if (t=='text'){adSetupDiv(w,h,s+"J&hw=docw",divName,fName)
adsDivs[adsDivs.length-1].LoadAd()}
else{if (adsTp!='J'&&!adsN4){var x="<IFRAME NAME='adsF"+adsLNm+"' ID='adsF"+adsLNm+"' SRC="
if (adsDel==0){d.write(x+s+"I"+p+adsIP)}else{d.write(x+"''"+p+adsIP)
adsLMN[adsLNm]="adsF"+adsLNm+"|"+s+"I"}adsLNm++
}else if(adsTp=='J'||(adsTp.indexOf('I')==-1&&adsN4)){
d.write(adsSL+s+"J&hw=docw'></SCRIPT>")}else{d.write(l+i1)}}}
else{d.write(l+i1)}}adsTile++}
function imageAdWH(m,w,h){var s=adsHt+"/image/"+m+adsI2+adsExt+"?"+adsTz+adsSr+adsSN+adsESN+adsWM+"&tile="+adsTile+adsOt+adsDOth,p=" HEIGHT="+h+" WIDTH="+w+adsI3,d=document
d.write(adsAH1+adsHt+"/link/"+m+adsAH2+adsExt+"' TARGET="+adsTar+">")
if (!adsDel||adsOld){d.write(adsI1+s+p)
}else{d.write(adsI1+adsHt+"/file/blank.gif NAME=adsImg"+adsLNm+p)
adsLMN[adsLNm]="adsImg"+adsLNm+"|"+s
adsLNm++}adsTile++}
function adsEndFn(){}}