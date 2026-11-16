
function brandInfo(){this.brandName='aol';this.brandString='AOL';}
brandInfo=new brandInfo();var checkDeleted=0;var showResults;var gibcurobj=null;var gibdestpage=null;var gibdestpagetarget="";var gibcurid;var gibtimer;function gibvisitcallback(status){return true;}
function makeRequest(url,data){var req=false;if(window.XMLHttpRequest){req=new XMLHttpRequest();if(req.overrideMimeType){req.overrideMimeType('text/xml');}}else if(window.ActiveXObject){try{req=new ActiveXObject("Msxml2.XMLHTTP");}catch(e){try{req=new ActiveXObject("Microsoft.XMLHTTP");}catch(e){}}}
if(!req){return false;}
req.open('GET',url+"?"+data,true);req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');req.send("");return true;}
function setactinv(f,actions,inv)
{f.action=actions;f.invocationType.value=inv;f.submit();return false;}
function gibgoto(){if(gibdestpage){if(gibtimer){clearTimeout(gibtimer);gibtimer=null;}
var ret=openNew(gibdestpage,gibdestpagetarget);gibdestpage=null;gibdestpagetarget="";return ret;}
return true;}
function gibcallback(status){return false;}
function gibDelLastItemCb(status){gibreload(status)}
function gibreload(status){document.location=document.location;}
function hatGhostText(obj){if(typeof hatClk=='undefined')obj.value='';hatClk='yes';}
function openNew(destpage,target)
{if(target&&target!=""){var pop=window.open(destpage,target);if(pop)pop.focus();}
else
{window.location=destpage;}
return false;}
function encodeParam(param){if(encodeURIComponent)return encodeURIComponent(param);return escape(param);}
function toggleGBList(obj){var mObj;if(obj.parentNode.nextSibling.nodeName=="DIV"){mObj=obj.parentNode.nextSibling;}else{mObj=obj.parentNode.nextSibling.nextSibling;}
var aObj=obj.childNodes[0];var iObj=obj.childNodes[0].childNodes[0];if(mObj.className.indexOf("closed")>=0){iObj.src=iObj.src.split("_closed").join("_open");iObj.alt=aObj.title="close";mObj.className="gb-list open";}else{iObj.src=iObj.src.split("_open").join("_closed");iObj.alt=aObj.title="open";mObj.className="gb-list closed";}
ffGBrefresh(mObj);}
function ffGBrefresh(obj){var ua=navigator.userAgent;if(ua)ua=ua.toLowerCase();if(ua&&ua.indexOf("firefox")>=0&&ua.indexOf("1.0.")>=0){var node=obj;while(node.parentNode){node=node.parentNode;if(node.id&&node.id.indexOf("gb-results")>=0){node.style.display="none";node.style.display="block";break;}}}}
function deleteGBList(obj,num,query){var gibFrame=document.getElementById("gibframe");obj.parentNode.parentNode.parentNode.className='deleted';checkDeleted+=1;if(num==checkDeleted)
{gibFrame.src="gib?op=delq&query="+query+"&cb=gibDelLastItemCb";}else{gibFrame.src="gib?op=delq&query="+query+"&cb=gibcallback";}
ffGBrefresh(obj);}
function deleteGBItem(obj,index){var count=0;var tObj;var lObj;var mObj=obj.parentNode.parentNode.parentNode;for(var x=0;mObj.childNodes[x];x++){if(mObj.childNodes[x].className=="gb-heading"||mObj.childNodes[x].className=="gb-heading gray"){for(var y=0;mObj.childNodes[x].childNodes[y];y++){if(mObj.childNodes[x].childNodes[y].className=="expand"){tObj=mObj.childNodes[x].childNodes[y];}}}
if(mObj.childNodes[x].className=="gb-list open"){lObj=mObj.childNodes[x];for(var y=0;mObj.childNodes[x].childNodes[y];y++){if(mObj.childNodes[x].childNodes[y].className=="result"){count++;}}}}
if(count==1){tObj.innerHTML=("");if(lObj){lObj.className='deleted';}}
obj.className='deleted';obj.parentNode.parentNode.className='deletedLi';document.getElementById("r"+index).className='deleted';ffGBrefresh(mObj);}
function expand(){document.body.innerHTML=document.body.innerHTML.split("gb-list closed").join("gb-list open");}
function deleteRecent(itaq){var form=document.getElementById("recent");form.elements[4].value=itaq;form.submit();}
var rdfaMap=new Object();var gibdestpage=null;var showResults=false;function getRdfaResults(htmlbody)
{listItems=htmlbody.getElementsByTagName("li");aboutItems=getElementsWithAttribute(listItems,"about");for(var k=0;k<aboutItems.length;k++)
{var id=aboutItems[k].getAttribute("about");rdfaObj=new Object();rdfaMap[id]=rdfaObj;var aboutKids=aboutItems[k].childNodes;if(aboutKids.length==1){aboutKids=aboutKids[0].childNodes}
for(var x=0;x<aboutKids.length;x++)
{var node=aboutKids.item(x);if(node.getAttribute){var prop=node.getAttribute("property");if(prop!=null){var con=node.getAttribute("content");if(con!=null){rdfaObj[prop.substr(2)]=con;}else{rdfaObj[prop.substr(2)]=node.innerHTML;}}else{var rel=node.getAttribute("rel");if(rel!=null){rdfaObj[rel.substr(2)]=node.href;}}}}}}
function getElementsWithAttribute(nodetree,attr)
{var attElements=new Array();if(nodetree==null||attr==null||attr=='')
{return;}
else{var treelength=nodetree.length;var pattern=new RegExp('^r[0-9]+');for(i=0,j=0;i<treelength;i++)
{att=nodetree[i].getAttribute(attr);if((att!=null||att!='')&&pattern.test(att))
{attElements[j]=nodetree[i];j++;}}}
return attElements;}
function track(tagItem,resId)
{gibtimer=setTimeout('gibgoto()',3500);var lobj=rdfaMap[resId];if(lobj==null){return true;}
gibdestpage=tagItem.href;if(tagItem.target){gibdestpagetarget=tagItem.target;}else{gibdestpagetarget="";}
var thequery=null;var query_param="encquery";if(s_query){thequery=s_query;query_param="query";}else{var encquery=getQuery("encquery");if(encquery!=null){thequery=encquery;}
else{thequery=getQuery("query");query_param="query";}}
showResults=false;gibcurobj=lobj;var reqStr=""
for(key in lobj){var encodedparam=encodeParam(lobj[key]);reqStr=reqStr+key+"="+encodedparam+"&";}
reqStr=reqStr+"spon="+false+"&"+query_param+"="+thequery+"&op=visit&json=true&cb=gibvisitcallback";makeRequest('gib',reqStr);if(gibtimer){clearTimeout(gibtimer);gibtimer=null;}
return true;}
function getQuery(queryparam){var queryString=window.location.search.substring(1);var parameters=new Array();parameters=queryString.split('&');for(var i=0;i<parameters.length;i++)
{if(parameters[i].indexOf(queryparam)>=0){var parameterValue=new Array();parameterValue=parameters[i].split('=');return parameterValue[1];}}
return null;}
var Class={create:function(){return function(){this.initialize.apply(this,arguments);}}}
Object.extend=function(destination,source){for(property in source)destination[property]=source[property];return destination;}
Function.prototype.bind=function(object){var __method=this;return function(){return __method.apply(object,arguments);}}
Function.prototype.bindAsEventListener=function(object){var __method=this;return function(event){__method.call(object,event||window.event);}}
function $(){if(arguments.length==1)return get$(arguments[0]);var elements=[];$c(arguments).each(function(el){elements.push(get$(el));});return elements;function get$(el){if(typeof el=='string')el=document.getElementById(el);return el;}}
if(!window.Element)var Element=new Object();Object.extend(Element,{remove:function(element){element=$(element);element.parentNode.removeChild(element);},hasClassName:function(element,className){element=$(element);if(!element)return;var hasClass=false;element.className.split(' ').each(function(cn){if(cn==className)hasClass=true;});return hasClass;},addClassName:function(element,className){element=$(element);Element.removeClassName(element,className);element.className+=' '+className;},removeClassName:function(element,className){element=$(element);if(!element)return;var newClassName='';element.className.split(' ').each(function(cn,i){if(cn!=className){if(i>0)newClassName+=' ';newClassName+=cn;}});element.className=newClassName;},cleanWhitespace:function(element){element=$(element);$c(element.childNodes).each(function(node){if(node.nodeType==3&&!/\S/.test(node.nodeValue))Element.remove(node);});},find:function(element,what){element=$(element)[what];while(element.nodeType!=1)element=element[what];return element;}});var Position={cumulativeOffset:function(element){var valueT=0,valueL=0;do{valueT+=element.offsetTop||0;valueL+=element.offsetLeft||0;element=element.offsetParent;}while(element);return[valueL,valueT];}};document.getElementsByClassName=function(className){var children=document.getElementsByTagName('*')||document.all;var elements=[];$c(children).each(function(child){if(Element.hasClassName(child,className))elements.push(child);});return elements;}
Array.prototype.iterate=function(func){for(var i=0;i<this.length;i++)func(this[i],i);}
if(!Array.prototype.each)Array.prototype.each=Array.prototype.iterate;function $c(array){var nArray=[];for(var i=0;i<array.length;i++)nArray.push(array[i]);return nArray;}
var fx=new Object();fx.Base=function(){};fx.Base.prototype={setOptions:function(options){this.options={duration:500,onComplete:'',transition:fx.sinoidal}
Object.extend(this.options,options||{});},step:function(){var time=(new Date).getTime();if(time>=this.options.duration+this.startTime){this.now=this.to;clearInterval(this.timer);this.timer=null;if(this.options.onComplete)setTimeout(this.options.onComplete.bind(this),10);}
else{var Tpos=(time-this.startTime)/(this.options.duration);this.now=this.options.transition(Tpos)*(this.to-this.from)+this.from;}
this.increase();},custom:function(from,to){if(this.timer!=null)return;this.from=from;this.to=to;this.startTime=(new Date).getTime();this.timer=setInterval(this.step.bind(this),13);},hide:function(){this.now=0;this.increase();},clearTimer:function(){clearInterval(this.timer);this.timer=null;}}
fx.Layout=Class.create();fx.Layout.prototype=Object.extend(new fx.Base(),{initialize:function(el,options){this.el=$(el);this.el.style.overflow="hidden";this.iniWidth=this.el.offsetWidth;this.iniHeight=this.el.offsetHeight;this.setOptions(options);}});fx.Height=Class.create();Object.extend(Object.extend(fx.Height.prototype,fx.Layout.prototype),{increase:function(){this.el.style.height=this.now+"px";},toggle:function(){if(this.el.offsetHeight>0){this.custom(this.el.offsetHeight,0);this.el.style.display="none";}
else{this.el.style.display="block";this.custom(0,this.el.scrollHeight);}}});fx.Width=Class.create();Object.extend(Object.extend(fx.Width.prototype,fx.Layout.prototype),{increase:function(){this.el.style.width=this.now+"px";},toggle:function(){if(this.el.offsetWidth>0)this.custom(this.el.offsetWidth,0);else this.custom(0,this.iniWidth);}});fx.Opacity=Class.create();fx.Opacity.prototype=Object.extend(new fx.Base(),{initialize:function(el,options){this.el=$(el);this.now=1;this.increase();this.setOptions(options);},increase:function(){if(this.now==1&&(/Firefox/.test(navigator.userAgent)))this.now=0.9999;this.setOpacity(this.now);},setOpacity:function(opacity){if(opacity==0&&this.el.style.visibility!="hidden")this.el.style.visibility="hidden";else if(this.el.style.visibility!="visible")this.el.style.visibility="visible";if(window.ActiveXObject)this.el.style.filter="alpha(opacity="+opacity*100+")";this.el.style.opacity=opacity;},toggle:function(){if(this.now>0)this.custom(1,0);else this.custom(0,1);}});fx.sinoidal=function(pos){return((-Math.cos(pos*Math.PI)/2)+0.5);}
fx.linear=function(pos){return pos;}
fx.cubic=function(pos){return Math.pow(pos,3);}
fx.circ=function(pos){return Math.sqrt(pos);}
fx.Scroll=Class.create();fx.Scroll.prototype=Object.extend(new fx.Base(),{initialize:function(options){this.setOptions(options);},scrollTo:function(el){var dest=Position.cumulativeOffset($(el))[1];var client=window.innerHeight||document.documentElement.clientHeight;var full=document.documentElement.scrollHeight;var top=window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop;if(dest+client>full)this.custom(top,dest-client+(full-dest));else this.custom(top,dest);},increase:function(){window.scrollTo(0,this.now);}});fx.Text=Class.create();fx.Text.prototype=Object.extend(new fx.Base(),{initialize:function(el,options){this.el=$(el);this.setOptions(options);if(!this.options.unit)this.options.unit="em";},increase:function(){this.el.style.fontSize=this.now+this.options.unit;}});fx.Combo=Class.create();fx.Combo.prototype={setOptions:function(options){this.options={opacity:true,height:true,width:false}
Object.extend(this.options,options||{});},initialize:function(el,options){this.el=$(el);this.setOptions(options);if(this.options.opacity){this.o=new fx.Opacity(el,options);options.onComplete=null;}
if(this.options.height){this.h=new fx.Height(el,options);options.onComplete=null;}
if(this.options.width)this.w=new fx.Width(el,options);},toggle:function(){this.checkExec('toggle');},hide:function(){this.checkExec('hide');},clearTimer:function(){this.checkExec('clearTimer');},checkExec:function(func){if(this.o)this.o[func]();if(this.h)this.h[func]();if(this.w)this.w[func]();},resizeTo:function(hto,wto){if(this.h&&this.w){this.h.custom(this.el.offsetHeight,this.el.offsetHeight+hto);this.w.custom(this.el.offsetWidth,this.el.offsetWidth+wto);}},customSize:function(hto,wto){if(this.h&&this.w){this.h.custom(this.el.offsetHeight,hto);this.w.custom(this.el.offsetWidth,wto);}}}
fx.Accordion=Class.create();fx.Accordion.prototype={setOptions:function(options){this.options={delay:100,opacity:false}
Object.extend(this.options,options||{});},initialize:function(togglers,elements,options){this.elements=elements;this.setOptions(options);var options=options||'';this.fxa=[];if(options&&options.onComplete)options.onFinish=options.onComplete;elements.each(function(el,i){options.onComplete=function(){if(el.offsetHeight>0)el.style.height='1%';if(options.onFinish)options.onFinish(el);}
this.fxa[i]=new fx.Combo(el,options);this.fxa[i].hide();}.bind(this));togglers.each(function(tog,i){if(typeof tog.onclick=='function')var exClick=tog.onclick;tog.onclick=function(){if(exClick)exClick();this.showThisHideOpen(elements[i]);}.bind(this);}.bind(this));},showThisHideOpen:function(toShow){this.elements.each(function(el,j){if(el.offsetHeight>0&&el!=toShow)this.clearAndToggle(el,j);if(el==toShow&&toShow.offsetHeight==0)setTimeout(function(){this.clearAndToggle(toShow,j);}.bind(this),this.options.delay);}.bind(this));},clearAndToggle:function(el,i){this.fxa[i].clearTimer();this.fxa[i].toggle();}}
var Remember=new Object();Remember=function(){};Remember.prototype={initialize:function(el,options){this.el=$(el);this.days=365;this.options=options;this.effect();var cookie=this.readCookie();if(cookie){this.fx.now=cookie;this.fx.increase();}},setCookie:function(value){var date=new Date();date.setTime(date.getTime()+(this.days*24*60*60*1000));var expires="; expires="+date.toGMTString();document.cookie=this.el+this.el.id+this.prefix+"="+value+expires+"; path=/";},readCookie:function(){var nameEQ=this.el+this.el.id+this.prefix+"=";var ca=document.cookie.split(';');for(var i=0;c=ca[i];i++){while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length);}
return false;},custom:function(from,to){if(this.fx.now!=to){this.setCookie(to);this.fx.custom(from,to);}}}
fx.RememberHeight=Class.create();fx.RememberHeight.prototype=Object.extend(new Remember(),{effect:function(){this.fx=new fx.Height(this.el,this.options);this.prefix='height';},toggle:function(){if(this.el.offsetHeight==0)this.setCookie(this.el.scrollHeight);else this.setCookie(0);this.fx.toggle();},resize:function(to){this.setCookie(this.el.offsetHeight+to);this.fx.custom(this.el.offsetHeight,this.el.offsetHeight+to);},hide:function(){if(!this.readCookie()){this.fx.hide();}}});fx.RememberText=Class.create();fx.RememberText.prototype=Object.extend(new Remember(),{effect:function(){this.fx=new fx.Text(this.el,this.options);this.prefix='text';}});Array.prototype.iterate=function(func){for(var i=0;i<this.length;i++)func(this[i],i);}
if(!Array.prototype.each)Array.prototype.each=Array.prototype.iterate;fx.expoIn=function(pos){return Math.pow(2,10*(pos-1));}
fx.expoOut=function(pos){return(-Math.pow(2,-10*pos)+1);}
fx.quadIn=function(pos){return Math.pow(pos,2);}
fx.quadOut=function(pos){return-(pos)*(pos-2);}
fx.circOut=function(pos){return Math.sqrt(1-Math.pow(pos-1,2));}
fx.circIn=function(pos){return-(Math.sqrt(1-Math.pow(pos,2))-1);}
fx.backIn=function(pos){return(pos)*pos*((2.7)*pos-1.7);}
fx.backOut=function(pos){return((pos-1)*(pos-1)*((2.7)*(pos-1)+1.7)+1);}
fx.sineOut=function(pos){return Math.sin(pos*(Math.PI/2));}
fx.sineIn=function(pos){return-Math.cos(pos*(Math.PI/2))+1;}
fx.sineInOut=function(pos){return-(Math.cos(Math.PI*pos)-1)/2;}
JIFDivManage=new Object();JIFDivManage.Accordion=Class.create();Object.extend(Object.extend(JIFDivManage.Accordion.prototype,fx.Accordion.prototype),{initialize:function(togglers,elements,options){this.elements=elements;this.setOptions(options);var options=options||'';this.fxa=[];if(options&&options.onComplete)options.onFinish=options.onComplete;elements.each(function(el,i){options.onComplete=function(){if(el.offsetHeight>0)el.style.height='1%';if(options.onFinish)options.onFinish(el);}
this.fxa[i]=new fx.Combo(el,options);this.fxa[i].hide();}.bind(this));togglers.each(function(tog,i){if(typeof tog.onclick=='function')var exClick=tog.onclick;tog.onclick=function(){if(exClick)exClick();this.showThisHideOpen(elements[i]);}.bind(this);}.bind(this));}});JIFDivManage.RememberHeight=Class.create();JIFDivManage.RememberHeight.prototype=Object.extend(new Remember(),{effect:function(){this.fx=new fx.Height(this.el,this.options);this.prefix='height';},toggle:function(){if(this.el.offsetHeight==0)this.setCookie(this.el.scrollHeight);else this.setCookie(0);this.fx.toggle();},resize:function(to){this.setCookie(this.el.offsetHeight+to);this.fx.custom(this.el.offsetHeight,this.el.offsetHeight+to);},hide:function(){if(!this.readCookie()){this.fx.hide();}}});JIFDivManage.Opacity=Class.create();JIFDivManage.Opacity.prototype=Object.extend(new fx.Base(),{initialize:function(el,options){this.el=$(el);this.now=1;this.increase();this.setOptions(options);},increase:function(){if(this.now==1&&(/Firefox/.test(navigator.userAgent)))this.now=0.9999;this.setOpacity(this.now);},setOpacity:function(opacity){if(opacity==0&&this.el.style.visibility!="hidden")this.el.style.visibility="hidden";else if(this.el.style.visibility!="visible")this.el.style.visibility="visible";if(window.ActiveXObject)this.el.style.filter="alpha(opacity="+opacity*100+")";this.el.style.opacity=opacity;},toggle:function(){if(this.now>0)this.custom(1,0);else this.custom(0,1);}});JIFDivManage.Combo=Class.create();JIFDivManage.Combo.prototype={setOptions:function(options){this.options={opacity:true,height:true,width:false}
Object.extend(this.options,options||{});},initialize:function(el,options){this.el=$(el);this.setOptions(options);if(this.options.opacity){this.o=new fx.Opacity(el,options);options.onComplete=null;}
if(this.options.height){this.h=new fx.Height(el,options);options.onComplete=null;}
if(this.options.width)this.w=new fx.Width(el,options);},toggle:function(){this.checkExec('toggle');},hide:function(){this.checkExec('hide');},clearTimer:function(){this.checkExec('clearTimer');},checkExec:function(func){if(this.o)this.o[func]();if(this.h)this.h[func]();if(this.w)this.w[func]();},resizeTo:function(hto,wto){if(this.h&&this.w){this.h.custom(this.el.offsetHeight,this.el.offsetHeight+hto);this.w.custom(this.el.offsetWidth,this.el.offsetWidth+wto);}},customSize:function(hto,wto){if(this.h&&this.w){this.h.custom(this.el.offsetHeight,hto);this.w.custom(this.el.offsetWidth,wto);}}}
JIFDivManage.Expander=Class.create();JIFDivManage.Expander.prototype={initialize:function(el,options){this.el=$(el);this.options=options;this.effect();},toggle:function(){this.fx.toggle();},effect:function(){this.fx=new fx.Height(this.el,this.options);this.prefix='height';}}
var moddirLocGeneral=new Object();moddirLocGeneral.close="Click to Close";moddirLocGeneral.expand="Click to Expand"
var jifExpanders=new Array();var evt=new universalEvent();var toggle="close";var tooltipEnabled=true;var tooltipTimer;var obj;var yOffset=100;var xOffset=-185;var tooltipIsUnder=true;var tooltipDelayOn=300;var tooltipDelayOff=100;var tooltipArwOn=true;var vidToolTipEnabled=true;var vidToolTipShowing=false;var viewStyle="detail";var confirmPop="no";function removeConfirm()
{var pop=document.getElementById("confirmpopup");pop.style.display="none";confirmPop="no";}
function sbManualFocus()
{var myLocation=window.location.href;if(myLocation.indexOf("#")==-1)
{if((myLocation.indexOf("/search?")==-1)&&((myLocation.indexOf("/image?")==-1))&&((myLocation.indexOf("/video?")==-1))&&((myLocation.indexOf("/audio?")==-1))&&((myLocation.indexOf("/news?")==-1))&&((myLocation.indexOf("/shopping?")==-1)))
{var d=document;var f=document.searchForm1;if(f!=null){var q=f.query1;if(q!=null){q.focus();}}
else{f=document.weboffersForm1;if(f!=null){var q=f.query1;if(q!=null){q.focus();}}}}}}
function openRecentSearchPref(elementID,styleAttribute,styleValue,top,left,which){if(document.getElementById){theElementStyle=document.getElementById(elementID).style;}else{theElementStyle=document.all[elementID].style;}
if(which&&which=="vertical"){if(document.getElementById)divMng=document.getElementById("hist");else divMng=document.all["hist"];if(divMng)theElementStyle.top=divMng.offsetHeight-30+'px';}
else if(which&&which=="settings"){if(document.getElementById)histDiv=document.getElementById("shsetting");else histDiv=document.all["shsetting"];if(histDiv){theElementStyle.left=histDiv.offsetLeft+150+'px';theElementStyle.top=histDiv.offsetHeight+150+'px';}
if(document.getElementById){clrArw=document.getElementById("clearArrow");offArw=document.getElementById("offArrow");radio=document.getElementById("preference_1");radio2=document.getElementById("memberPreference_1");}
else{clrArw=document.all["clearArrow"];offArw=document.all["offArrow"];radio=document.all("preference_1");radio2=document.all("memberPreference_1");}
if(clrArw)clrArw.className="dialogArrowL";if(offArw)offArw.className="dialogArrowL";if(elementID=="offSearchDiv")
radio.checked=true;if(elementID=="memberPrefDiv")
radio2.checked=true;}
if(top)
theElementStyle.top=top+'px';if(left)
theElementStyle.left=left+'px';theElementStyle[styleAttribute]=styleValue;}
function parentGo(goUrl,desc,obUrl,obQuery){if(goUrl.length>0){var redirUrl="actionLogger?src=PTL&clickedItemURN="+encodeParam(goUrl)+"&clickedItemDescription="+desc+"&obUrl="+obUrl+"&obQuery="+obQuery;window.location.href=goUrl;actionLog(redirUrl);}}
function changeRecentSearchPref(which,clearUrl,offUrl,obUrl,obQuery){if(which=='clear'){if(document.getElementsByName("turnoff")[0].checked)
{parentGo(offUrl,"SearchHistoryOff",obUrl,obQuery);}
else
{parentGo(clearUrl,"SearchHistoryClear",obUrl,obQuery);}}
else if(which=='off'){parentGo(offUrl,"SearchHistoryOff");}}
function saveSettings(){var elSRBtns=new Array();var index=0;var clickedItemDesc="PreferencesRedirectRefURL ";var tempSS=document.getElementsByName('safesearch');if(tempSS.length>0){var checkedRB=findCRB(tempSS);elSRBtns[index]=checkedRB;index++;var idValue=getSelectionValues(checkedRB);if(idValue[1]==1){clickedItemDesc+="safeSearchOn ";}else{clickedItemDesc+="safeSearchOff ";}}
var tempSH=document.getElementsByName('preference');if(tempSH.length>0){var checkedRB=findCRB(tempSH);elSRBtns[index]=checkedRB;index++;var idValue=getSelectionValues(checkedRB);if(idValue[1]==1){clickedItemDesc+="SearchHistoryOn ";}else{clickedItemDesc+="SearchHistoryOff ";}}
var tempSB=document.getElementsByName('smartbox');if(tempSB.length>0){var checkedRB=findCRB(tempSB);elSRBtns[index]=checkedRB;index++;var idValue=getSelectionValues(checkedRB);if(idValue[1]==1){clickedItemDesc+="smartboxOn ";}else{clickedItemDesc+="smartboxOff ";}}
var tempSaS=document.getElementsByName('safesurf');if(tempSaS.length>0){var checkedRB=findCRB(tempSaS);elSRBtns[index]=checkedRB;index++;var idValue=getSelectionValues(checkedRB);if(idValue[1]==1){clickedItemDesc+="safeSurfOn ";}else{clickedItemDesc+="safeSurfOff ";}}
var tempSSW=document.getElementsByName('sitesecuritywarn');if(tempSSW.length>0){var checkedRB=findCRB(tempSSW);elSRBtns[index]=checkedRB;index++;var idValue=getSelectionValues(checkedRB);if(idValue[1]==1){clickedItemDesc+="siteSecurityWarnOn ";}else{clickedItemDesc+="siteSecurityWarnOff ";}}
prefsRedirURL=document.settingsForm.prefsRedirURL.value;if(prefsRedirURL.indexOf("?")==-1){prefsRedirURL+="?"}
prefsRedirURL+="&clickedItemDescription="+clickedItemDesc;var prefURL="&type=2";for(var i=0;i<elSRBtns.length;i++){var idValue=getSelectionValues(elSRBtns[i]);prefURL+="&"+idValue[0]+"="+idValue[1];if(idValue[0]=="preference"){if(idValue[1]==0){prefURL+="&static=1";}else if(idValue[1]==1){prefURL+="&ro=1";}}}
prefsRedirURL+=prefURL;window.open(prefsRedirURL,'_top');}
function checkRSI(){if(document.settingsForm.preference_1.checked){rsiOn();}else if(document.settingsForm.preference_0.checked){rsiOff();}}
function findCRB(el){var i=0;for(i=0;i<el.length;i++){if(el[i].checked){break;}}
return(el[i]);}
function getSelectionValues(el){var values=el.id.split("_");if(values.length!=2)
return;return values;}
function changesetting(el,anch,desc){if(el.id=="memberPreference_1"){el.id="preference_1"};if(el.id=="memberPreference_1"){el.id="preference_1"};if(!el)
return;var temp=el.id.split("_");if(temp.length!=2)
return;var which=temp[0];var what=temp[1];var queryPath=window.location.pathname;var url=queryPath+"?type=2&"+which+"="+what;var redirUrl="actionLogger?src=PTL&clickedItemURN="+encodeParam(url)+"&clickedItemDescription="+desc;window.open(url,'_top');actionLog(redirUrl);}
function changeshsetting(el,desc){if(el.id=="memberPreference_1"){el.id="preference_1"};if(el.id=="memberPreference_1"){el.id="preference_1"};if(!el){return;}
var temp=el.id.split("_");if(temp.length!=2){return;}
if(desc=="SearchHistoryOn")
rsiOn();var which=temp[0];var what=temp[1];var queryPath=window.location.pathname;var url;if(what=="1")url=queryPath+"?"+which+"="+what+"&ro=1";else url=queryPath+"?preference="+what;window.open(url,'_top');var redirUrl="actionLogger?src=PTL&clickedItemURN="+encodeParam(url)+"&clickedItemDescription="+desc;actionLog(redirUrl);}
function avPop(url,w,h){openerWidth=document.body.clientWidth;openerHeight=screen.availHeight;openerLeft=screen.availWidth/20;openWidth=openerWidth*.75;openHeight=openerHeight*.5;openTop=50;openLeft=openerLeft+50;if(w.length<1)width=openWidth;else width=w;if(h.length<1)height=openHeight;else height=h;windowOptions="left="+openLeft+",top="+openTop+", width="+width+", height="+height+"menubar=yes,scrollbars=yes,status=yes,toolbar=yes,location=yes,resizable=yes";window.open(url,"referrer",windowOptions);}
function toggleExpander(e){hidetooltip();evt.refresh(e);var el=evt.evtSrc;var curEl=el;var anchor;for(var i=0;(i<8)&&(curEl.nodeName!='DIV')&&(curEl.className!='modFoot');i++){if(curEl.nodeName=='A')
anchor=curEl;curEl=curEl.parentNode;}
var parentDiv=curEl.parentNode;if(curEl.className!='modFoot'||!anchor){return false;}
anchor.blur();var moduleId=curEl.parentNode.className;if(jifExpanders[moduleId]){var expText=anchor.firstChild.firstChild.firstChild;jifExpanders[moduleId].toggle();if(anchor.className=="clickexpander"){anchor.className="clickcontracter";expText.nodeValue=moddirLocGeneral.close;toggle="expand";setVis(parentDiv,'bot','UL');}
else{anchor.className="clickexpander";expText.nodeValue=moddirLocGeneral.expand;toggle="close";}}}
function initExpanders(){var xs=document.getElementsByClassName('bot');for(var i=0;i<xs.length;i++){jifExpanders[xs[i].parentNode.className]=new JIFDivManage.Expander(xs[i].id,{opacity:0.1,onComplete:function(){if(!this.initVar){this.initVar=1;}
if(this.initVar==2){theElementStyle=this.el.style;theElementStyle.visibility="hidden";this.initVar=1;}else{this.initVar=2;}}});}
var xocs=document.getElementsByClassName('clickexpander');for(var i=0;i<xocs.length;i++)
xocs[i].onclick=toggleExpander;}
function setVis(parentElement,targetClass,targetElement){currentElement=parentElement.firstChild;while(currentElement.className!=targetClass&&currentElement!=parentElement.lastChild){currentElement=currentElement.nextSibling;}
if(currentElement.className==targetClass){theElementStyle=currentElement.style;theElementStyle.visibility='visible';}}
function initMouseovers(){var omos=getElementsByClassNameScoped(document,'div','rollover');var eles=[];for(var i=0;i<omos.length;i++){eles[i]=omos[i].parentNode;if(eles[i]==null)return false;var eles_links=eles[i].getElementsByTagName('A');for(var j=0;j<eles_links.length;j++){if(!inRollover(eles_links[j])){eles_links[j].setAttribute("onmouseover","showInfo(this);");eles_links[j].onmouseover=function(){showInfo(this);};eles_links[j].setAttribute("onmouseout","slow_hidetooltip();");eles_links[j].onmouseout=function(){slow_hidetooltip();};}}}}
function inRollover(linkEl){var i;for(i=0;i<4;i++){if(linkEl.className=="rollover")return true;linkEl=linkEl.parentNode;}
return false;}
function writeTooltip(){var s="";s+="<div id='tooltip' onmouseover='stop_timer()' onmouseout='slow_hidetooltip()'>";s+="<div id='tooltipContent' class='item' >";s+="</div>";s+="</div>";document.write(s);if(viewStyle=="detail"){vidToolTipEnabled=false;}
if(viewStyle=="list"){yOffset=20;vidToolTipEnabled=true;}
if(viewStyle=="v-grid"){yOffset=100;vidToolTipEnabled=true;}}
function tooltipRelPosY(targ,tt)
{var t_y=tooltipFindPosY(targ)+targ.offsetHeight-(parseInt(targ.offsetHeight*0.10));var objH=tt.offsetHeight;var tt_db=(document.compatMode&&document.compatMode!="BackCompat")?document.documentElement:document.body?document.body:null,ylim=parseInt(window.innerHeight||tt_db.clientHeight)+
parseInt(window.pageYOffset||(tt_db?tt_db.scrollTop:0)||0)-objH;origt_y=eval(t_y);if(t_y>ylim){t_y=tooltipFindPosY(targ)-objH;tooltipIsUnder=false;}
else{tooltipIsUnder=true;}
return t_y;}
var imgPageSize=0;function doResize(){var newPageSize=0;var count=0;var size3x6ff=960;var size3x6ie=940;var size4x5=1235;var size5x4ff=1473;var size5x4ie=1463;var hugeSize=9999;var maxcount=20;if(isIE){if(document.body.clientWidth<=size3x6ie){count=18;newPageSize=size3x6ie}
else if(document.body.clientWidth<size4x5){count=20;newPageSize=size4x5}
else if(document.body.clientWidth<size5x4ie){count=20;newPageSize=size5x4ie}
else{count=18;newPageSize=hugeSize}
if(document.body.clientWidth<756){document.getElementById("grid").style.width="756px";}
else{document.getElementById("grid").style.width="";}}
else{if(window.innerWidth<=size3x6ff){count=18;newPageSize=size3x6ff}
else if(window.innerWidth<size4x5){count=20;newPageSize=size4x5}
else if(window.innerWidth<size5x4ff){count=20;newPageSize=size5x4ff}
else{count=18;newPageSize=hugeSize}}
if(imgPageSize!=newPageSize)
{imgPageSize=newPageSize;setPaginatorDisplayCount(this,count);var o=0;for(i=1;(i<=maxcount);i++){var id="li"+i;var ele=document.getElementById(id);if(ele!=null){if(i<=count){ele.style.display='block';o++;}
else{ele.style.display='none';}}}
var ele=document.getElementById("firstRetrieved");if(ele!=null){var d=parseInt(ele.innerHTML,10);document.getElementById("upperLimit").innerHTML=d+o-1;}}}
function setPaginatorDisplayCount(node,count){var pagposs;var pagination;pagposs=document.getElementsByClassName("pagination");if(pagposs==null){alert("pagposs null");return;}
pagination=pagposs[0];var re_links=/(\&amp\;|\&)displayCount\=\d+/g;if(pagination){var pag_links=pagination.getElementsByTagName('A');for(var i=0;i<pag_links.length;i++){if(pag_links[i].href.match(re_links)){pag_links[i].href=pag_links[i].href.replace(re_links,'&displayCount='+count);}else{pag_links[i].href+='&displayCount='+count;}}}}
function doshowInfo(){if(document.getElementById("tooltip")){if(!hasRollover(obj)&&vidToolTipEnabled){vidToolTipShowing=true;}
var tooltip=document.getElementById("tooltip");tooltip.style.display='block';updateTooltip(obj);var yPos=tooltipRelPosY(obj,tooltip);var xPos=tooltipFindPosX(obj);tooltip.style.left=parseInt(xPos+xOffset+obj.offsetWidth/2)+'px';if(viewStyle=="list"){tooltip.style.left='50px';}
tooltip.style.top=parseInt(yPos)+'px';if(tooltipArwOn)
updateToolTipArrow(tooltipIsUnder);tooltip.style.visibility='visible';}}
function updateToolTipArrow(isUnder){var arw=document.getElementById("arw");var tooltip=document.getElementById("tooltip");if(arw&&tooltip){arw.style.left=tooltip.offsetWidth-40+"px";arw.className=isUnder?"arwtop":"arwbot";if(isUnder){arw.style.bottom=null;arw.style.top="-14px";}
else{arw.style.top=null;arw.style.bottom="-14px";}
if(vidToolTipShowing){arw.style.left="20px";}}}
function showInfo(newObj){var i;for(i=0;(i<8)&&(newObj.nodeName!='LI');i++){newObj=newObj.parentNode;}
if(newObj.nodeName!='LI'){return;}
if(tooltipEnabled&&(hasRollover(newObj)||vidToolTipEnabled)){obj=newObj;clearTimeout(tooltipTimer);tooltipTimer=setTimeout('doshowInfo()',tooltipDelayOn);}}
function updateTooltip(obj){vidToolTipShowing=false;if(tooltipEnabled){var tooltip=document.getElementById("tooltip");var tooltipContent=document.getElementById("tooltipContent");var sourceDiv=obj;if(hasRollover(sourceDiv)){tooltipContent.innerHTML=rolloverText(sourceDiv)+"<div id='arw' class='arwdef'></div>";tooltip.className="";}
else if(vidToolTipEnabled){vidToolTipShowing=true;tooltipContent.innerHTML=sourceDiv.innerHTML+"<div id='arw' class='arwdef'></div>";tooltip.className="large";var arw=document.getElementById("arw");arw.style.left="40px";if(viewStyle=="list"){tooltip.style.left='50px';}}}}
function slow_hidetooltip(){clearTimeout(tooltipTimer);tooltipTimer=setTimeout('hidetooltip()',tooltipDelayOff);}
function stop_timer(){clearTimeout(tooltipTimer);}
function hidetooltip(){vidToolTipShowing=false;if(tooltipEnabled){clearTimeout(tooltipTimer);if(document.getElementById("tooltip"))document.getElementById("tooltip").style.display='none';}}
function rolloverText(el){var rolloverEl=el.getElementsByTagName("div");for(var i=0;i<rolloverEl.length;i++){if(rolloverEl[i].className=="rollover")break;}
var pwidth=200;return rolloverEl[i].innerHTML;}
function hasRollover(el){var rolloverEl=el.getElementsByTagName("div");for(var i=0;i<rolloverEl.length;i++){if(rolloverEl[i].className=="rollover")return true;}
return false;}
var histif;var histOn=false;var histOpenPath=true;var waitingForHistRetry=false;function hist(state){if(!histOn){return false;}
var hist=document.getElementById('hist');if(!hist){return false;}
hist.onmouseout=deactivateHist;hist.onmouseover=null;var hist_btn=document.getElementById('btn_srch_hist');if(hist_btn){hist_btn.onmouseout=null;}
if(isIE&&document.getElementById('hist')){histif=document.getElementById('histif');if(!histif){histif=document.createElement('iframe');histif.id="histif";histif.src="";histif.frameBorder="0";histif.style.position="absolute";histif.style.top=hist.style.top;histif.style.left=hist.style.left;histif.style.zIndex="990";histif.style.display="none";histif.style.width="228px";histif.style.height=hist.offsetHeight;document.body.appendChild(histif);}}
var offConfirmationDiv=document.getElementById("offSearchDiv");var clearConfirmationDiv=document.getElementById("clearSearchDiv");hidetooltip();if(state=='on'&&hist.style.visibility=='hidden'){histOpenPath=false;var btn=document.getElementById('btn_srch_hist');var btnWidth=btn.clientWidth;var xOffset=60;var yOffset=1;if((isGecko)||(ieVersion>=7)){xOffset=64;yOffset=1;}
hist.style.top=(tooltipFindPosY(btn)+yOffset)+"px";hist.style.left=(tooltipFindPosX(btn,"l","body"))-btnWidth+xOffset+"px";hist.style.visibility="visible";if(histif){histif.style.top=hist.style.top;histif.style.left=hist.style.left;histif.style.display="block";}
hist.onmouseover=activateHist;}else if(state=='off'){if(waitingForHistRetry==true){return;}
if(!histOpenPath){if(waitingForHistRetry==false){histOpenPath=true;waitingForHistRetry=true;setTimeout(retryCloseHist,100);}
return;}
if(offConfirmationDiv.style.display=="block"||clearConfirmationDiv.style.display=="block"){return;}
offConfirmationDiv.style.display="none";clearConfirmationDiv.style.display="none";hist.style.visibility="hidden";hist.onmouseover=null;if(histif){histif.style.display="none";}}}
function retryCloseHist(){waitingForHistRetry=false;if(histOpenPath){hist('off');}}
function activateHist(){if(histOpenPath){histOpenPath=false;waitingForHistRetry=false;}
hist('on');return false;}
function deactivateHist(e){if(!e){var e=window.event;}
var relTarg=e.relatedTarget||e.toElement;if(relTarg){var curElement=relTarg;var theHist=document.getElementById('hist');for(var i=0;i<100&&curElement!=document.body&&curElement!=theHist;i++){curElement=curElement.parentNode;}
if(curElement==theHist){return true;}}
hist('off');return true;}
function tooltipFindPosY(obj)
{var curtop=0;if(obj.offsetParent){while(obj.offsetParent){curtop+=obj.offsetTop;obj=obj.offsetParent;}}else{if(obj.y){curtop+=obj.y;}}
return curtop;}
function tooltipFindPosX(obj,LR,stopTag)
{var curleft=0;if(obj.offsetParent){while(obj.offsetParent&&obj.tagName!=stopTag){curleft+=obj.offsetLeft;obj=obj.offsetParent;}}else{if(obj.x){curleft+=obj.x;}}
if(LR=="r"){curleft=document.getElementsByTagName(stopTag)[0].clientWidth-curleft;}
if(vidToolTipShowing){curleft+=150;}
return curleft;}
var isIE=navigator.userAgent.indexOf("MSIE")+1;var ieVersion=(isIE)?navigator.userAgent.substring(isIE+4).substring(0,1):-1;var isGecko=navigator.userAgent.indexOf("Gecko")+1;function universalEvent(){this.evtSrc=null;this.evtSrcId="";this.evtType=null;this.mouseX=null;this.mouseY=null;this.evtRef=null;this.key=null;}
universalEvent.prototype.refresh=function(evtObj){if(isIE)evtObj=event;if(isIE){this.evtRef=evtObj;this.evtSrc=evtObj.srcElement;this.evtSrcId=evtObj.srcElement.id;this.evtType=evtObj.type;this.mouseX=evtObj.clientX+document.body.scrollLeft;this.mouseY=evtObj.clientY+document.body.scrollTop;this.key=evtObj.keyCode;}
else if(isGecko){this.evtRef=evtObj;this.evtSrc=evtObj.target;while(this.evtSrc.nodeType!=1){this.evtSrc=this.evtSrc.parentNode;}
this.evtSrcId=this.evtSrc.id;this.evtType=evtObj.type;this.mouseX=evtObj.pageX;this.mouseY=evtObj.pageY;this.key=evtObj.charCode;}}
universalEvent.prototype.cancel=function(){if(isIE)this.evtRef.returnValue=false;else if(isGecko){if(this.evtRef.cancelable)this.evtRef.preventDefault();}}
function setCookie(name,value,expires,path,domain,secure)
{document.cookie=name+"="+escape(value)+
((expires)?"; expires="+expires.toGMTString():"")+
((path)?"; path="+path:"")+
((domain)?"; domain="+domain:"")+
((secure)?"; secure":"");}
function logExpander(url){var f=window.frames["aclogger"];if(toggle=="expand")
{url=url+"&clickedItemDescription=expanderOpen";}else if(toggle=="close")
{url=url+"&clickedItemDescription=expanderClose";}
f.location.replace(url);}
function setVideoView(node,mode){var wrapper;var view=new Array();var viewtype=node;var pagposs;var pagination;viewStyle=mode;if(mode=="list"){vidToolTipEnabled=true;}
if(mode=="v-grid"){vidToolTipEnabled=true;}
if(mode=="detail"){vidToolTipEnabled=false;}
while(viewtype.nodeName!='UL'&&viewtype.nodeName!='BODY'){viewtype=viewtype.parentNode;}
if(viewtype.nodeName=='BODY'){return;}
wrapper=viewtype.parentNode;for(var i=0;i<wrapper.childNodes.length;i++){if(wrapper.childNodes[i].nodeName=='UL'&&((wrapper.childNodes[i].className=='list')||(wrapper.childNodes[i].className=='detail')||(wrapper.childNodes[i].className=='v-grid'))){view.push(wrapper.childNodes[i]);}
if(wrapper.childNodes[i].className=='vDisplayCon'){videoControlWrapper=wrapper.childNodes[i];}}
if(view==null){return;}
pagposs=document.getElementsByClassName("pagination",wrapper,"div");if(pagposs==null){return;}
pagination=pagposs[0];var re_links=/(\&amp\;|\&)viewType\=(list|detail|v\-grid)/g;if(pagination){var pag_links=pagination.getElementsByTagName('A');for(var i=0;i<pag_links.length;i++){if(pag_links[i].href.match(re_links)){pag_links[i].href=pag_links[i].href.replace(re_links,'&viewType='+mode);}else{pag_links[i].href+='&viewType='+mode;}}}
if(document.getElementsByClassName("VIDL",document.getElementById('grid'),"div")!=null){var enc_links=/%26viewType%3D(list|detail|v\-grid)/g;var category_links=document.getElementById('cats').getElementsByTagName('A');for(var i=0;i<category_links.length;i++){if(category_links[i].href.match(enc_links)){category_links[i].href=category_links[i].href.replace(enc_links,'%26viewType%3D'+mode);}else{category_links[i].href+='%26viewType%3D'+mode;}}
var searchboxes=document.getElementsByClassName("sbc",document.root,"div");for(var i=0;i<searchboxes.length;i++){var form=searchboxes[i].getElementsByTagName('FORM')[0];var inputs=form.getElementsByTagName('INPUT');for(var j=0;j<inputs.length;j++){if(inputs[j].name=='viewType'){inputs[j].parentNode.removeChild(inputs[j]);}}
var new_input=document.createElement('INPUT');new_input.name='viewType';new_input.type='hidden';new_input.value=mode;form.appendChild(new_input)}}
for(var i=0;i<view.length;i++){view[i].className=mode;}
videoControlWrapper.childNodes[0].className=mode;viewtype.className=mode;}
function actionLog(url)
{var f=window.frames["aclogger"];f.location.replace(url);}
function rsiOptOut(url)
{var f=window.frames["rsioptout"];f.location.replace(url);}
var ulContainer;var iframeNode;var inline_pmmsid="";var inlinePlayerOpen=false;function fetchFile(url,objType){if(!url||!objType)return;var flg=true;var objARR=document.getElementsByTagName(objType);for(i=0;i<objARR.length;i++){if(objType=="script"&&getFileName(objARR[i].src)==getFileName(url)||objType=="link"&&getFileName(objARR[i].href)==getFileName(url)){flg=false;break;}}
if(flg){var scrObj=document.createElement(objType);document.getElementsByTagName("head")[0].appendChild(scrObj);if(objType=="script"){scrObj.type="text/javascript";scrObj.src=url;}else{scrObj.type="text/css";scrObj.rel="stylesheet";scrObj.media="all";scrObj.href=url;}}
function getFileName(fileName){return fileName.substring(fileName.lastIndexOf("/")+1,fileName.length);}}
function removeQuotes(formID){formField=document.getElementsByName(formID)[0];currentValue=formField.value;formField.value=currentValue.replace(/"/g,"");}
function submitSBEvent(f)
{var q=f.query.value;q=q.replace(/^\s+|\s+$/,'');var destAction=f.action;if(destAction.match('video.aol.com'))
{if(q!='')
{f.action=destAction.concat('/query/').concat(q);if(document.getElementById('safesearchVid').innerHTML!=null)
{var ff=f.action.concat('/familyFilter/').concat(document.getElementById('safesearchVid').innerHTML);f.action=ff;}
document.location.href=f.action;}
else
{f.action="http://video.aol.com";}
return false;}
else if(destAction.match('shopping.aol.com'))
{if(q!='')
{f.action=destAction.concat('?k=').concat(q);document.location.href=f.action;}
else
{f.action="http://shopping.aol.com";}
return false;}
f.submit();return false;}
function tabHopper(redirurl,searchurl,homeurl,query){query=query.replace(/^\s+|\s+$/,'');if(query==""){clickedItemURN=homeurl;}else{clickedItemURN=searchurl.replace(/{query}/,encodeParam(query));}
var goUrl=editQS(redirurl,"clickedItemURN",escape(clickedItemURN));if(goUrl.length>0){window.location.href=goUrl;}
return false;}
function parseQS(qryStr){var outArr=new Array();var str=(qryStr.indexOf("?")>-1)?qryStr.substr(qryStr.indexOf("?")+1):qryStr;do{if(str.indexOf("&")>-1){ws=str.substring(0,str.indexOf("&"));str=str.substr(str.indexOf("&")+1);}
else{ws=str;str="";}
outArr[ws.substring(0,ws.indexOf("="))]=ws.substr(ws.indexOf("=")+1);}while(str!="");return outArr;}
function getQueryStringItem(qryStr,index){var queryString=parseQS(qryStr);if(typeof(queryString[index])=="undefined")return null;else return queryString[index];}
function editQS(qryStr,item,value){if(qryStr.indexOf("?")>-1){if(qryStr.indexOf(item)>-1){var b=qryStr.substr(0,qryStr.indexOf(item)+(item.length+1))+value;var b2=qryStr.substr(qryStr.indexOf(item)+item.length+getQueryStringItem(qryStr,item).length+1);if(b2.indexOf("&")>-1)b+=b2.substr(b2.indexOf("&"));return b;}
else return qryStr+"&"+item+"="+value;}
else return qryStr+"?"+item+"="+value;}
function encodeParam(param){if(encodeURIComponent)return encodeURIComponent(param);return escape(param);}
var RSIOO_CSID="J05532";var RSIOO_ACT="1";var RSIOO_FSET="1";function sendRsiPref()
{var optoutURL="http://optout.revsci.net/optout_aol.aspx?a="+RSIOO_ACT+"&c="+RSIOO_CSID+"&f="+RSIOO_FSET;rsiOptOut(optoutURL);}
function rsiOn()
{RSIOO_CSID="J05532";RSIOO_ACT="2";RSIOO_FSET="1";sendRsiPref();}
function rsiClearHistory()
{RSIOO_CSID="J05532";RSIOO_ACT="3";RSIOO_FSET="1";sendRsiPref();}
function rsiOff()
{RSIOO_CSID="J05532";RSIOO_ACT="1";RSIOO_FSET="1";sendRsiPref();}
function createCookie(name,value,days){if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));var expires="; expires="+date.toGMTString();}
else var expires="";document.cookie=name+"="+value+expires+"; path=/";}
function readCookie(name){var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length);}
return null;}
function eraseCookie(name){createCookie(name,"",-1);}
function getBrowserWidth(){if(window.innerWidth){return window.innerWidth;}
else if(document.documentElement&&document.documentElement.clientWidth!=0){return document.documentElement.clientWidth;}
else if(document.body){return document.body.clientWidth;}
return 0;}
function toggleMoreTab(e,clickedObj){if(!e)var e=window.event;stopEventTrigger(e);var scope;if(clickedObj==null){scope=document;}
else{scope=clickedObj.parentNode.parentNode.parentNode;}
var yOs=(isIE)?3:0;var xOs=242;var moreTabs=getElementsByClassNameScoped(scope,'ul','moreTabNav');for(var i=0;i<moreTabs.length;i++){var moreTab=moreTabs[i];if(moreTab.className.indexOf("hidden")>0&&clickedObj!=null)
{var yPos=0;var xPos=0;moreTab.style.top=yPos+yOs+"px";moreTab.style.left=xPos+xOs+"px";moreTab.className=moreTab.className.split("hidden");}
else{moreTab.className="moreTabNav hidden";moreTab.style.left="-99999px";}}}
function stopEventTrigger(e){if(!e)e=window.event;e.cancelBubble=true;}
document.onclick=function(e){var moreTabs=document.getElementsByClassName('moreTabNav');var closedCount=0;for(var i=0;i<moreTabs.length;i++){var moreTab=moreTabs[i];if(moreTab.className.indexOf("hidden")>0)closedCount++;}
if(closedCount==moreTabs.length)return;toggleMoreTab(e);}
function getElementsByClassNameScoped(oElm,strTagName,strClassName){var arrElements=(strTagName=="*"&&oElm.all)?oElm.all:oElm.getElementsByTagName(strTagName);var arrReturnElements=new Array();strClassName=strClassName.replace(/\-/g,"\\-");var oRegExp=new RegExp("(^|\\s)"+strClassName+"(\\s|$)");var oElement;for(var i=0;i<arrElements.length;i++){oElement=arrElements[i];if(oRegExp.test(oElement.className)){arrReturnElements.push(oElement);}}
return(arrReturnElements)}
function $S(v){return($(v).style);}
function agent(v){return(Math.max(navigator.userAgent.toLowerCase().indexOf(v),0));}
function isset(v){return((typeof(v)=='undefined'||v.length==0)?false:true);}
function XYwin(v){var z=agent('msie')?Array(document.body.clientHeight,document.body.clientWidth):Array(window.innerHeight,window.innerWidth);return(isset(v)?z[v]:z);}
function closeSSBox(){$S('ssBG').display='none';$S('ssBOX').display='none';}
var b=400;function ssBOX(){var arrayPageSize=getPageSize();var objBody=document.getElementsByTagName("body").item(0);var objOverlay=document.createElement("div");objOverlay.setAttribute('id','ssBG');objOverlay.style.display='block';objOverlay.style.position='absolute';objOverlay.style.top='0';objOverlay.style.left='0';objOverlay.style.width='100%';objOverlay.style.height=(arrayPageSize[1]+'px');objBody.insertBefore(objOverlay,objBody.firstChild);$S('ssBOX').left=Math.round((XYwin(1)-b)/2)+'px';$S('ssBOX').width=b+'px';$S('ssBOX').display='block';objBody.insertBefore($('ssBOX'),objBody.firstChild);}
function getPageSize(){var xScroll,yScroll;if(window.innerHeight&&window.scrollMaxY){xScroll=document.body.scrollWidth;yScroll=window.innerHeight+window.scrollMaxY;}else if(document.body.scrollHeight>document.body.offsetHeight){xScroll=document.body.scrollWidth;yScroll=document.body.scrollHeight;}else{xScroll=document.body.offsetWidth;yScroll=document.body.offsetHeight;}
var windowWidth,windowHeight;if(self.innerHeight){windowWidth=self.innerWidth;windowHeight=self.innerHeight;}else if(document.documentElement&&document.documentElement.clientHeight){windowWidth=document.documentElement.clientWidth;windowHeight=document.documentElement.clientHeight;}else if(document.body){windowWidth=document.body.clientWidth;windowHeight=document.body.clientHeight;}
if(yScroll<windowHeight){pageHeight=windowHeight;}else{pageHeight=yScroll;}
if(xScroll<windowWidth){pageWidth=windowWidth;}else{pageWidth=xScroll;}
arrayPageSize=new Array(pageWidth,pageHeight,windowWidth,windowHeight)
return arrayPageSize;}
function snsHelpPopUp(pathOrTitleString){var pattern=/\?/;var adjustedPathOrTitleString=pathOrTitleString.replace(pattern,"&");var newUrl=pathOrTitleString;window.onerror=null;var x=0,y=0;if(document.all){x=window.screenLeft+30;y=window.screenTop-50;}else if(document.layers){x=window.screenX+30;y=window.screenY+75;}
if(y<=0)y=10;var propString="scrollbars=yes,width=565,height=275, top="+y+",screenY="+y+",left="+x+",screenX="+x;newwin=window.open("","popup",propString);newwin=window.open(newUrl,"popup",propString);if(window.focus)newwin.focus();}
function getObject(objname){return document.getElementById(objname);}
function toggleLayer(objname,layer_n,right_o,top_o,url){var obj=getObject(objname);var newX=0;if(obj!=null)newX=findPosX(obj);var newY=0;if(obj!=null)newY=findPosY(obj);var new_left=newX+right_o;var new_top=newY+top_o;if(layer_n!=""){if(getObject(layer_n).style.visibility=="visible")hideLayer(layer_n);else showLayer(layer_n,new_left,new_top,url);}}
function showLayer(layer_n,right_o,top_o,url){insertIFrame(layer_n,url);if(top_o==null)top_o=0;if(right_o==null)right_o=0;if(layer_n!=""){var p=getObject(layer_n);p.style.right=right_o+"px";p.style.top=top_o+"px";p.style.visibility="visible";p.style.display="";}}
function hideLayer(hs_layer){if(_sns_showByDef_!=1&&hs_layer!=""){var p=getObject(hs_layer);p.style.visibility="hidden";p.style.display="none";}}
function insertIFrame(layer_n,url){var _layer;if(!frameAlreadyInserted&&layer_n!=""){_layer=getObject(layer_n);loadIframe('loginframe',url);frameAlreadyInserted=true;}}
function loadIframe(frameid,url){if(document.layers&&document.layers[frameid].load)document.layers[frameid].load(url,0);else
if(window.frames&&window.frames.length)window.frames[frameid].location.href=url;}
function findPosX(obj){var curleft=0;while(obj.offsetParent){curleft+=obj.offsetLeft;obj=obj.offsetParent;}
curleft+=obj.offsetLeft;return curleft;}
function findPosY(obj){var curtop=0;while(obj.offsetParent){curtop+=obj.offsetTop;obj=obj.offsetParent;}
curtop+=obj.offsetTop;return curtop;}
function getValue(nmvalstr,name){var cookie_array=nmvalstr.split("&");nmvalpos=0;while(nmvalpos<cookie_array.length){if(cookie_array[nmvalpos].indexOf(name+"=")>=0){var sns_name_pos=cookie_array[nmvalpos].indexOf("=")+1;var nmval=cookie_array[nmvalpos].substring(sns_name_pos,cookie_array[nmvalpos].length);return nmval;}
nmvalpos++;}return null;}
function tLMoreTb(clickedObj){clickedObj.blur();var moreTab=getObject("lmre");if(moreTab.className.indexOf("hidden")>0){moreTab.className=moreTab.className.split("hidden");clickedObj.innerHTML=clickedObj.innerHTML.split("+ ").join("- ");}
else{moreTab.className="more hidden";clickedObj.innerHTML=clickedObj.innerHTML.split("- ").join("+ ");}}
function setFocus(obj_id){var tv=-1;var obj=document.getElementById(obj_id);obj.setAttribute("tabIndex",tv);obj.focus();}
function searchPlugin(redirUrl){this.appearAfter=1000;this.stayFor=20000;this.maxDisplays=3;this.cookieDuration=1461;this.redirUrl=redirUrl;this.displayStrings={before:"<div class=\"se_rel_wrap\">\n",after:"<a href=\"javascript:sp_instance.logAddTool();\" onclick=\"sp_instance.addSearch();\" class=\"se_add\">Add</a></div>",ie:"<div class=\"se_call_to_action\">Add AOL Search to Internet Explorer</div><div class=\"se_box se_ie7\"></div>\n",ff:"<div class=\"se_call_to_action\">Add AOL Search to Firefox</div><div class=\"se_box se_ff\"></div>\n",unknown:"<div class=\"se_call_to_action\">Add AOL Search to your browser</div><div class=\"se_box\"></div>\n",close:"<a href=\"#\" onclick=\"sp_instance.hidePanel();return false;\" class=\"se_closing\">Close</a>"};this.active=false;this.browser="Unsupported";if(isGecko&&navigator.userAgent.indexOf("Firefox/1.")>-1){this.browser="FF1";}
else if(isGecko&&!isNaN(parseInt(navigator.userAgent.substr(navigator.userAgent.indexOf("Firefox/")+8,1)))&&parseInt(navigator.userAgent.substr(navigator.userAgent.indexOf("Firefox/")+8,1))>=2){this.browser="FF2+";}
else if(isIE&&!isNaN(parseInt(navigator.userAgent.substr(isIE+4,1)))&&parseInt(navigator.userAgent.substr(isIE+4,1))>=7){this.browser="IE7+";}
this.cookiesEnabled=1;createCookie("cookieCheck","in the jar");if(readCookie("cookieCheck")!="in the jar"){this.cookiesEnabled=0;return;}
else{eraseCookie("cookieCheck");}
installed=false;try{if(window.external.IsSearchProviderInstalled('http://search.aol.com/')){installed=true;}}
catch(e){}
if(installed){return;}
this.initialise();}
searchPlugin.prototype={initialise:function(){this.numDisplays=parseInt(readCookie('searchPlugin_numDisplays'));this.pluginInstalled=parseInt(readCookie('searchPlugin_pluginInstalled'));if(isNaN(this.numDisplays)){this.numDisplays=0;}
if(isNaN(this.pluginInstalled)){this.pluginInstalled=0;}
if(this.browser!="IE7+"&&this.browser!="FF2+"&&this.browser!="FF1"){return;}
if(navigator.userAgent.indexOf('aol')!=-1){return;}
if(navigator.userAgent.indexOf('AOL')!=-1){return;}
if(this.pluginInstalled==1){return;}
window.setTimeout('sp_instance.showPanel();',this.appearAfter);},showPanel:function(){if(this.active){return;}
if(this.numDisplays>=this.maxDisplays){return;}
if(this.html==null||this.html.length==0){this.generateHTML();}
if(this.containingDiv==null){this.makeDiv();}
this.containingDiv.style.display='block';this.arrowDiv.style.display='block';window.setTimeout('sp_instance.hidePanel();',this.stayFor);this.active=true;this.numDisplays++;createCookie("searchPlugin_numDisplays",this.numDisplays,this.cookieDuration);sp_instance.logSAddTool();},hidePanel:function(){if(this.active==false){return;}
this.containingDiv.style.display='none';this.arrowDiv.style.display='none';this.active=false;},generateHTML:function(){this.html=this.displayStrings.before+this.displayStrings.close;if(this.browser=="IE7+"){this.html+=this.displayStrings.ie;}
else if(this.browser=="FF1"||this.browser=="FF2+"){this.html+=this.displayStrings.ff;}
else{this.html+=this.displayStrings.unknown;}
this.html+=this.displayStrings.after;},logSAddTool:function(){var f=window.frames["gclogger"];var path=""
var omniTrackingUrl="/click-to-add-tracker.html";f.location.replace(omniTrackingUrl);},logAddTool:function(){var f=window.frames["aclogger"];var description="ClickToAddTool_Browser_"+this.browser;;var redirUrl=this.redirUrl+"&clickedItemDescription="+description+"&clickedItemURN=ClickToAdd";try{f.location.replace(redirUrl);}
catch(e){}},makeDiv:function(){this.containingDiv=document.createElement('DIV');this.containingDiv.style.display='none';this.containingDiv.style.top='7px';this.containingDiv.style.left=''+(getBrowserWidth()-255)+'px';this.containingDiv.id='SP_Container';this.containingDiv.innerHTML=this.html;this.arrowDiv=document.createElement('DIV');this.arrowDiv.style.display='none';this.arrowDiv.style.top='7px';this.arrowDiv.style.left=''+(getBrowserWidth()-255)+'px';this.arrowDiv.id='SP_Arrow';document.body.appendChild(this.containingDiv);document.body.appendChild(this.arrowDiv);},addSearch:function(){this.hidePanel();if(this.browser=="FF1"){var srcLoc="http://"+location.host+"/aol/aolsearch.src";var pngLoc="http://"+location.host+"/aol/aolsearch.png";window.sidebar.addSearchEngine(srcLoc,pngLoc,"aolsearch","General");}else{var provider;if(this.browser=="FF2+"){provider='aolsearch-ff2.xml';}
else if(this.browser=="IE7+"){provider='aolsearch-ie7.xml';}
else{provider='aolsearch.xml';}
try{var osLoc="http://"+location.host+"/aol/"+provider;window.external.AddSearchProvider(osLoc);}
catch(e){alert("Unable to add AOL Search as your search provider.");}}
createCookie("searchPlugin_pluginInstalled",1,this.cookieDuration);return true;}};var sp_instance=null;function start_search_plugin(redirUrl){sp_instance=new searchPlugin(redirUrl);}