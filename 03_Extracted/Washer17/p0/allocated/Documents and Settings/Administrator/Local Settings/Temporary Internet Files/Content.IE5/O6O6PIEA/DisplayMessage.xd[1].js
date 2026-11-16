/*
	Copyright (c) 2004-2006, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/community/licensing.shtml
*/

dojo.hostenv.packageLoaded({depends:[["provide","ws.layers.DisplayMessage"],["provide","dojo.html.metrics"],["require","dojo.html.layout"],["provide","ws.address.PresenceHoverCard"],["provide","ws.calendar.ConfirmRecurDialog"],["require","dojo.widget.*"],["require","dojo.widget.ContentPane"],["require","dojo.widget.Dialog"],["require","ws.lang"],["require","ws.widget.util"],["require","ws.widget.WSButton"],["provide","ws.widget.WSDatePicker"],["provide","ws.widget.WSDualDatePicker"],["provide","ws.widget.WSMiniDatePickerDropTarget"],["provide","ws.widget.WSDatePickerDropTarget"],["require","dojo.widget.HtmlWidget"],["require","dojo.event.*"],["require","ws.string"],["require","ws.date"],["provide","ws.widget.WSTimePicker"],["require","dojo.widget.HtmlWidget"],["require","dojo.event.*"],["require","ws.string"],["require","ws.date"],["provide","ws.widget.PopupDatePicker"],["provide","ws.widget.PopupDualDatePicker"],["require","dojo.widget.*"],["provide","ws.widget.PopupTimePicker"],["provide","ws.calendar.AddEventDialog"],["require","dojo.widget.*"],["require","dojo.widget.Dialog"],["require","ws.calendar.calutil"],["require","ws.date"],["require","ws.widget.OkCancelDialog"],["require","ws.widget.WSButton"],["require","ws.widget.WSSelect"],["provide","ws.panels.TaskPanelEditDetailCard"],["require","dojo.html.display"],["require","dojo.html.iframe"],["require","dojo.io.*"],["require","dojo.widget.*"],["require","ws.calendar.CalendarViewModel"],["require","ws.calendar.calutil"],["require","ws.date"],["require","ws.widget.ListView"],["require","ws.widget.util"],["provide","ws.panels.TaskPanel"],["provide","ws.panels.TaskPanelUtil"],["require","dojo.html.display"],["require","dojo.io.*"],["require","dojo.widget.*"],["require","dojo.widget.ContentPane"],["require","dojo.widget.LayoutContainer"],["require","ws.calendar.CalendarViewModel"],["require","ws.calendar.calutil"],["require","ws.date"],["require","ws.widget.ListView"],["require","ws.widget.util"],["require","ws.widget.WSButton"],["require","ws.widget.WSSelect"],["provide","ws.panels.TaskPanelMoreDetailCard"],["require","dojo.html.display"],["require","dojo.html.iframe"],["require","dojo.io.*"],["require","dojo.widget.*"],["require","ws.calendar.CalendarViewModel"],["require","ws.date"],["require","ws.widget.ListView"],["require","ws.widget.util"],["require","ws.calendar.calutil"],["provide","ws.pictures.PictureViewControl"],["require","dojo.html.common"],["require","dojo.html.display"],["require","dojo.html.util"],["require","dojo.io.common"],["require","dojo.io.IframeIO"],["require","dojo.widget.*"],["require","ws.html"],["require","ws.io"],["require","ws.widget.util"],["provide","ws.mail.DisplayMessageWidget"],["require","dojo.html.display"],["require","dojo.html.iframe"],["require","dojo.html.selection"],["require","dojo.html.style"],["require","dojo.io"],["require","dojo.string.extras"],["require","dojo.widget.*"],["require","dojo.widget.ContentPane"],["require","dojo.widget.PopupContainer"],["require","ws.address.AddressModel"],["require","ws.html"],["require","ws.io"],["require","ws.lang"],["require","ws.mail.MessageStatusDialog"],["require","ws.reporting"],["require","ws.string"],["require","ws.widget.BuddyIcon"],["require","ws.widget.OkCancelDialog"],["require","ws.widget.util"],["require","ws.widget.WSButton"],["require","ws.widget.WSLayoutContainer"],["require","ws.widget.WSMenu"],["require","ws.widget.WSToolbar"]],definePackage:function(_1){
_1.provide("ws.layers.DisplayMessage");
_1.provide("dojo.html.metrics");
_1.require("dojo.html.layout");
_1.html.getScrollbar=function(){
var _2=document.createElement("div");
_2.style.width="100px";
_2.style.height="100px";
_2.style.overflow="scroll";
_2.style.position="absolute";
_2.style.top="-300px";
_2.style.left="0px";
var _3=document.createElement("div");
_3.style.width="400px";
_3.style.height="400px";
_2.appendChild(_3);
_1.body().appendChild(_2);
var _4=_2.offsetWidth-_2.clientWidth;
_1.body().removeChild(_2);
_2.removeChild(_3);
_2=_3=null;
return {width:_4};
};
_1.html.getFontMeasurements=function(){
var _5={"1em":0,"1ex":0,"100%":0,"12pt":0,"16px":0,"xx-small":0,"x-small":0,"small":0,"medium":0,"large":0,"x-large":0,"xx-large":0};
if(_1.render.html.ie){
document.documentElement.style.fontSize="100%";
}
var _6=document.createElement("div");
_6.style.position="absolute";
_6.style.left="-100px";
_6.style.top="0";
_6.style.width="30px";
_6.style.height="1000em";
_6.style.border="0";
_6.style.margin="0";
_6.style.padding="0";
_6.style.outline="0";
_6.style.lineHeight="1";
_6.style.overflow="hidden";
_1.body().appendChild(_6);
for(var p in _5){
_6.style.fontSize=p;
_5[p]=Math.round(_6.offsetHeight*12/16)*16/12/1000;
}
_1.body().removeChild(_6);
_6=null;
return _5;
};
_1.html._fontMeasurements=null;
_1.html.getCachedFontMeasurements=function(_8){
if(_8||!_1.html._fontMeasurements){
_1.html._fontMeasurements=_1.html.getFontMeasurements();
}
return _1.html._fontMeasurements;
};
_1.html.measureFragment=function(_9,_a,_b){
var _c=_9.cloneNode(true);
_c.innerHTML=_a;
_9.parentNode.appendChild(_c);
var _d=_1.html.getElementBox(_c,_b);
_9.parentNode.removeChild(_c);
_c=null;
return _d;
};
_1.html.getFittedFragment=function(_e,_f){
function cl(_10){
var _11=document.createElement(_10.tagName);
_11.id=_10.id+"-clone";
_11.className=_10.className;
for(var j=0;j<_10.attributes.length;j++){
if(_10.attributes[j].specified){
if(_10.attributes[j].nodeName.toLowerCase()!="style"&&_10.attributes[j].nodeName.toLowerCase()!="edited"&&_10.attributes[j].nodeName.toLowerCase()!="contenteditable"&&_10.attributes[j].nodeName.toLowerCase()!="id"&&_10.attributes[j].nodeName.toLowerCase()!="class"){
_11.setAttribute(_10.attributes[j].nodeName.toLowerCase(),_10.attributes[j].nodeValue);
}
}
}
return _11;
}
var _13=_1.html.getFontMeasurements()["16px"];
var n=cl(_e);
n.style.width=_1.html.getBorderBox(_e).width+"px";
n.style.height=(_13+4)+"px";
_e.parentNode.appendChild(n);
var rem=_1.html.fitToElement(n,_f);
var ret=n.innerHTML;
n.parentNode.removeChild(n);
return ret;
};
_1.html.fitToElement=function(_17,_18){
function cl(_19){
var _1a=document.createElement(_19.tagName);
_1a.id=_19.id+"-clone";
_1a.className=_19.className;
for(var j=0;j<_19.attributes.length;j++){
if(_19.attributes[j].specified){
if(_19.attributes[j].nodeName.toLowerCase()!="style"&&_19.attributes[j].nodeName.toLowerCase()!="edited"&&_19.attributes[j].nodeName.toLowerCase()!="contenteditable"&&_19.attributes[j].nodeName.toLowerCase()!="id"&&_19.attributes[j].nodeName.toLowerCase()!="class"){
_1a.setAttribute(_19.attributes[j].nodeName.toLowerCase(),_19.attributes[j].nodeValue);
}
}
}
return _1a;
}
var _1c=cl(_17);
_17.parentNode.appendChild(_1c);
var t=_1.html.getBorderBox(_17);
_1c.style.width=t.width+"px";
var _1e=["br","img","hr","input","!--"];
var _1f=["<BR>","<br>","<br/>","<br />","<p></p>","<P></P>"];
var _20=[];
var str=_18;
var i=0;
var _23=str.length;
var add=0;
var _25=true;
_1c.innerHTML=str;
while(_25){
add=Math.round((_23-i)/2);
if(add<=1){
_25=false;
}
i+=add;
_1c.innerHTML=str.substr(0,i);
if(_1c.offsetHeight>t.height){
_23=i;
i-=add;
}
}
if(str.substr(0,i)!=str){
var _26=str.substr(0,i).lastIndexOf(" ");
var _27=str.substr(0,i).lastIndexOf("\n");
var _28=str.substr(0,i).lastIndexOf(">");
var _29=str.substr(0,i).lastIndexOf("<");
if(_29<=_28&&_27==i-1){
i=i;
}else{
if(_26!=-1&&_26>_28&&_28>_29){
i=_26+1;
}else{
if(_29>_28){
i=_29;
}else{
if(_28!=-1){
i=_28+1;
}
}
}
}
}
str=str.substr(0,i);
var ret=_18.substr(str.length);
var _2b=true;
var _2c=str.split("<");
_2c.shift();
for(var j=0;j<_2c.length;j++){
_2c[j]=_2c[j].split(">")[0];
if(_2c[j].charAt(_2c[j].length-1)=="/"){
continue;
}
if(_2c[j].charAt(0)!="/"){
for(var k=0;k<_1e.length;k++){
if(_2c[j].split(" ")[0].toLowerCase()==_1e[k]){
_2b=false;
}
}
if(_2b){
_20.push(_2c[j]);
}
_2b=true;
}else{
_20.pop();
}
}
for(var j=0;j<_1f.length;j++){
if(ret.charAt(0)=="\n"){
ret=ret.substr(1);
}
while(ret.indexOf(_1f[j])==0){
ret=ret.substr(_1f[j].length);
}
}
for(var j=_20.length-1;j>=0;j--){
if(str.lastIndexOf(_20[j])==(str.length-_20[j].length-1)){
str=str.substring(0,str.lastIndexOf(_20[j]));
}else{
str+="</"+_20[j]+">";
}
if(ret.length>0){
ret="<"+_20[j]+">"+ret;
}
}
for(var j=0;j<_1f.length;j++){
if(ret.charAt(0)=="\n"){
ret=ret.substr(1);
}
while(ret.indexOf(_1f[j])==0){
ret=ret.substr(_1f[j].length);
}
}
_17.innerHTML=str;
_1c.parentNode.removeChild(_1c);
_1c=null;
return ret;
};
_1.provide("ws.address.PresenceHoverCard");
_1.widget.defineWidget("ws.address.PresenceHoverCard",_1.widget.PopupContainer,{templateString:"<div class=\"buddyHoverCard dojoPopupContainer\" dojoAttachPoint=\"presenceInfo\" dojoAttachEvent=\"onClick: onClick\" style=\"display: none;\"></div>",templateCssString:".addressListView span.contactName\r\n{\r\n\tfloat: left;\r\n\tcolor: #000000;\r\n}\r\n\r\n.addressListView span.editHover\r\n{\r\n\tfloat: right;\r\n\tcolor: #0066CC;\r\n\tfont-size: 9px;\r\n}\r\n\r\n.addressListView span.editHover:hover\r\n{\r\n\ttext-decoration: underline;\r\n}\r\n\r\n.addressListView .composeHoverContacts\r\n{\r\n\tbackground-position: -0px -0px;\r\n\tfloat: right;\r\n\twidth: 16px;\r\n\theight: 16px;\r\n}\r\n.addressListView .composeHoverContacts:hover{ background-position: -30px -0px; }\r\n\r\n.addressListView .trashHoverContacts\r\n{\r\n\tbackground-position: -375px -0px;\r\n\tfloat: right;\r\n\tmargin-right: 2px;\r\n}\r\n.addressListView .trashHoverContacts:hover{ background-position: -360px -0px; }\r\n\r\n.addressListView .searchInputDiv\r\n{\r\n\twidth: 138px;\r\n\tpadding-left: 6px;\r\n\tmargin: 3px 15px;\r\n\tborder: solid 1px #85817c;\r\n\tbackground-color: #FFF;\r\n}\r\n.addressListView .searchInput\r\n{\r\n\t\r\n\tfont: normal 11px verdana;\r\n\tvertical-align: middle;\r\n\tborder: none;\r\n\twidth: 116px;\r\n\tpadding-top: 2px;\r\n\tpadding-bottom: 2px;\r\n}\r\n\r\n.addressListView .nickNameInputNew\r\n{\r\n\tcolor: #a5a5a5;\r\n}\r\n\r\n.addressListView .filterLink {\r\n\tpadding: 7px 15px 0px 0px;\r\n}\r\n.addressListView .filterLink .wsLink {\r\n\tcolor: #000000;\r\n\tfont-size: 11px;\r\n}\r\n\r\n.addressListView .searchInfo {\r\n\tbackground-color: #c4f198;\r\n\tpadding: 5px 15px;\r\n\tborder-bottom: 1px solid #d8d6d3;\r\n\tcolor: #0066CC;\r\n}\r\n\r\n.addressListView .distListBuddyIcon\r\n{\r\n\tbackground: url(\"${images}main.gif\") -0px -30px;\r\n\tborder: 1px solid #85817c;\r\n\twidth: 32px;\r\n\theight: 32px;\r\n}\r\n\r\n.addressListView .noBuddyIcon\r\n{\r\n\tbackground: url(\"${images}main.gif\") -44px -30px;\r\n\tborder: 1px solid #85817c;\r\n\twidth: 32px;\r\n\theight: 32px;\r\n}\r\n\r\n.addressListView .clearSearchImg\r\n{\r\n\tposition: absolute;\r\n\tz-index: 1000;\r\n\twidth: 10px;\r\n\theight: 10px;\r\n\tmargin-top: 5px;\r\n\tmargin-left: 2px;\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tbackground-position: -959px -2px;\r\n\tcursor: pointer;\r\n}\r\n.addressListView .clearSearchImgFF { margin-top: 4px; margin-left: 6px; }\r\n.addressListView .clearSearchImg:hover { background-position: -973px -2px; }\r\n\r\n\r\n.addressListView .turbogrid-header-sort-up \r\n{\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tbackground-position: right -96px;\r\n\tbackground-color:  #e4edfa !important;\r\n\theight: 16px;\r\n\tpadding: 4px 0px 2px 3px;\r\n\tmargin: 0px 0px 0px 0px;\r\n}\r\n\r\n.addressListView .turbogrid-header-sort-down \r\n{\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tbackground-position: right -111px;\r\n\tbackground-color:  #e4edfa !important;\r\n\theight: 16px;\r\n\tpadding: 4px 0px 2px 3px;\r\n\tmargin: 0px 0px 0px 0px;\r\n}\r\n\r\n.addressListView .turbogrid-header-sort-none \r\n{\r\n\tbackground-color: Transparent !important;\r\n\theight: 16px;\r\n\tpadding: 4px 0px 2px 3px;\r\n\tmargin: 0px 0px 0px 0px;\r\n}\r\n\r\n.addressListView .turbogrid-header-cell \r\n{\r\n\tpadding: 0px 0px 0px 0px !important;\r\n\tmargin: 0px 0px 0px 0px !important;\r\n}\r\n\r\n\r\n.addressListView .turbogrid-header-col \r\n{\r\n\tpadding: 0px 0px 0px 0px !important;\r\n\tmargin: 0px 0px 0px 0px !important;\r\n}\r\n\r\n/*\r\n * Presence hover card.\r\n */\r\n.buddyHoverCard\r\n{\r\n\tmargin-top: 1px;\r\n\tmargin-left: 3px;\r\n\tbackground-color: #FFFFFF;\r\n\tborder: 1px solid #5A5753;\r\n\tposition: absolute;\r\n\tcursor: pointer;\r\n\tpadding: 2px 7px 5px 3px;\r\n}\r\n\r\n.buddyHoverCardIE\r\n{\r\n\tmargin-top: 1px;\r\n\tmargin-left: 3px;\r\n\tbackground-color: #FFFFFF;\r\n\tborder: 1px solid #5A5753;\r\n\tposition: absolute;\r\n\tcursor: pointer;\r\n\tpadding: 4px 7px 4px 3px;\t\r\n}\r\n\r\n.buddyHoverCard span.nameSpan\r\n{\r\n\tposition: relative;\r\n\ttop: 2px;\r\n\tmargin-left: 8px;\r\n}\r\n\r\n.buddyHoverCardIE span.nameSpanIE\r\n{\r\n\tposition: relative;\r\n\ttop: 2px;\r\n\tmargin-left: 8px;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/address/AddressListView.css"),isContainer:false,openDelay:200,closeDelay:200,parentNode:null,model:null,orient:{"TR":"TL"},postCreate:function(_2f,_30){
_1.event.connect(this.parentNode,"onmouseover",this,"onMouseOver");
ws.address.PresenceHoverCard.superclass.postCreate.apply(this,arguments);
},onMouseOver:function(e){
var t=e.target;
if(this.isShowingNow){
if(_1.html.hasClass(t,"buddyIcon")){
this.openSoon(t);
}else{
this.closeSoon();
}
}else{
if(_1.html.hasClass(t,"buddyIcon")){
this.openSoon(t);
}else{
this.cancelOpen();
}
}
},onMouseMove:function(e){
this.overCard=_1.html.overElement(this.domNode,e);
this.overGridNode=_1.html.overElement(this.parentNode,e);
if(this.isShowingNow&&!this.openTimer){
var _34=_1.html.getCursorPosition(e);
this.overRefNode=(_34.x>=this.refPos.x)&&(_34.x<=this.refPos.x+this.refSize.width)&&(_34.y>=this.refPos.y)&&(_34.y<=this.refPos.y+this.refSize.height);
if(this.overRefNode||this.overCard){
this.cancelTimeouts();
}else{
this.closeSoon();
}
}else{
if(!this.overGridNode){
this.closeSoon();
}
}
},openSoon:function(_35){
this.cancelTimeouts();
this.openTimer=setTimeout(ws.lang.hitch(this,"open",_35),this.openDelay);
},closeSoon:function(){
if(this.closeTimer){
return;
}
this.cancelTimeouts();
this.closeTimer=setTimeout(ws.lang.hitch(this,"close"),this.closeDelay);
},cancelTimeouts:function(){
this.cancelOpen();
this.cancelClose();
},cancelOpen:function(){
if(this.openTimer){
clearTimeout(this.openTimer);
}
this.openTimer=null;
},cancelClose:function(){
if(this.closeTimer){
clearTimeout(this.closeTimer);
}
this.closeTimer=null;
},open:function(_36){
if(!this._tracking){
_1.event.connect(document.documentElement,"onmousemove",this,"onMouseMove");
this._tracking=true;
}
if(this.isShowingNow){
this.close();
}
this.refNode=_36;
this.refPos=_1.html.getAbsolutePosition(_36,true);
this.refSize=_1.html.getBorderBox(_36);
this.populateCard(_36);
_1.widget.PopupContainer.prototype.open.call(this,_36,this.parentNode,null,this.orient);
},close:function(){
if(this._tracking){
_1.event.disconnect(document.documentElement,"onmousemove",this,"onMouseMove");
this._tracking=false;
}
_1.widget.PopupContainer.prototype.close.apply(this,arguments);
},populateCard:function(_37){
if(!this.getDisplayNameAndPresenceTag){
return;
}
var ret=this.getDisplayNameAndPresenceTag(_37);
this.screenName=ret.screenName;
var _39=ret.presenceIconHtmlTag;
if(_1.render.html.ie){
_1.html.setClass(this.presenceInfo,"buddyHoverCardIE");
_39+=ws.string.substituteParams("<span class=\"nameSpanIE\">{0}</span>",_1.string.summary(ret.displayName,25));
}else{
_1.html.setClass(this.presenceInfo,"buddyHoverCard");
_39+=ws.string.substituteParams("<span class=\"nameSpan\">{0}</span>",_1.string.summary(ret.displayName,25));
}
this.presenceInfo.innerHTML=_39;
},onClick:function(){
if(this.screenName){
ws.presence.launchIM(this.screenName);
}
}});
_1.provide("ws.calendar.ConfirmRecurDialog");
_1.require("dojo.widget.*");
_1.require("dojo.widget.ContentPane");
_1.require("dojo.widget.Dialog");
_1.require("ws.lang");
_1.require("ws.widget.util");
_1.require("ws.widget.WSButton");
_1.widget.defineWidget("ws.calendar.ConfirmRecurDialog",_1.widget.HtmlWidget,{widgetsInTemplate:true,templateString:"<div>\r\n\t<div dojoType=\"Dialog\" dojoAttachPoint=\"dialogWidget\" bgColor=\"white\" bgOpacity=\"0.75\">\r\n\t\t<div class=\"ConfirmRecurDialog\" style=\"width: 430px; height: 130px; background: #fff; border: 1px solid #000; padding: 0px; overflow: hidden;\">\r\n\t\t\t<div class=\"titleNodeStyle\" dojoAttachPoint=\"titleNode\">\r\n\t\t\t</div>\r\n\t\t\t<div class=\"textNodeStyle\" dojoAttachPoint=\"textNode\" style=\"min-height: 50px;\">\r\n\t\t\t</div>\r\n\t\t\t<div><br /></div>\r\n\t\t\t<div dojoType=\"dojo:ContentPane\">\r\n\t\t\t\t<div dojoType=\"ws:WSButton\" className=\"rightButton alignRight\" vizType=\"Blue\" dojoAttachPoint=\"cancelBtn\">${Cancel}</div>\r\n\t\t\t\t<div dojoType=\"ws:WSButton\" className=\"alignRight\" vizType=\"Blue\" dojoAttachPoint=\"thisFutureBtn\"></div>\r\n\t\t\t\t<div dojoType=\"ws:WSButton\" className=\"alignRight\" border=\"right\" vizType=\"Blue\" dojoAttachPoint=\"thisOnlyBtn\"></div>\r\n\t\t\t</div>\t\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n",templateCssString:".ConfirmRecurDialog .blueBtn\r\n{\r\n\tbackground-color: #DDE7F1;\r\n}\r\n\r\n.ConfirmRecurDialog .defBtn\r\n{\r\n\tbackground-color: #B7ED9C;\r\n}\r\n\r\n.ConfirmRecurDialog .titleNodeStyle \r\n{\r\n\tbackground-color: #DDE7F1;\r\n\tpadding: 4px 0px 3px 5px;\r\n\tmargin: 0px;\r\n\tborder-bottom: solid 1px #87A3B3;\r\n\tfont-family: Arial;\r\n\tfont-size: 14px;\r\n\tfont-weight: bold;\r\n\tcolor: #333;\r\n}\r\n\r\n.ConfirmRecurDialog .textNodeStyle\r\n{\r\n\tpadding: 15px 15px 0px 15px;\r\n\tfont-family: Verdana;\r\n\tfont-size: 11px;\r\n\tcolor: #333;\r\n}\r\n\r\n/* Writable Event */\r\n.ConfirmRecurDialog .leftButton\r\n{\r\n\tmargin-left: 7px;\r\n}\r\n\r\n.ConfirmRecurDialog .rightButton\r\n{\r\n\tmargin-right: 7px;\r\n}\r\n\r\n.ConfirmRecurDialog .alignLeft\r\n{\r\n\tfloat: left;\r\n}\r\n\r\n.ConfirmRecurDialog .alignRight\r\n{\r\n\tfloat: right;\r\n}\r\n\r\n.ConfirmRecurDialog .wsButtonBlue.rightBorder .content\r\n{\r\n\tborder-right:1px solid #000000;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/calendar/ConfirmRecurDialog.css"),postCreate:function(){
ws.calendar.ConfirmRecurDialog.superclass.postCreate.call(this);
this.cancelBtn.onClick=ws.lang.hitch(this,"modify",false);
this.thisOnlyBtn.onClick=ws.lang.hitch(this,"modify",true,"CHANGE_CURRENT");
this.thisFutureBtn.onClick=ws.lang.hitch(this,"modify",true,"CHANGE_FUTURE");
},show:function(_3a,_3b){
var _3c=null;
var _3d=null;
var _3e=null;
var _3f=null;
if(_3a){
_3e=Config.Strings.RepeatEventOnly;
_3f=Config.Strings.RepeatEventFuture;
_3c=Config.Strings.RepeatEventTitle;
_3d=Config.Strings.RepeatEventMsg;
}else{
_3e=Config.Strings.RepeatEventDelOnly;
_3f=Config.Strings.RepeatEventDelFuture;
_3c=Config.Strings.RepeatEventDelTitle;
_3d=Config.Strings.RepeatEventDelMsg;
}
this.thisOnlyBtn.setLabel(_3e);
this.thisFutureBtn.setLabel(_3f);
_3d=_3d.replace(/\\x22/g,"&quot;");
_3d=_3d.replace(/\\n/g,"<br>");
this.textNode.innerHTML=_3d;
_3c=_3c.replace(/\\x22/g,"&quot;");
_3c=_3c.replace(/\\n/g,"<br>");
this.titleNode.innerHTML=_3c;
this.callback=_3b;
this.dialogWidget.show();
this.thisOnlyBtn.sizeMyself();
},modify:function(ret,_41){
if(this.callback){
this.callback(ret,_41);
}
this.dialogWidget.hide();
}});
_1.lang.mixin(ws.calendar.ConfirmRecurDialog,{display:function(_42,_43){
ws.calendar.ConfirmRecurDialog.createDialog();
ws.calendar.ConfirmRecurDialog.theDialog.show(_42,_43);
},createDialog:function(){
if(ws.calendar.ConfirmRecurDialog.theDialog){
return;
}
ws.calendar.ConfirmRecurDialog.theDialog=_1.widget.createWidget("ws:confirmrecurdialog",null,document.body,"first");
}});
_1.provide("ws.widget.WSDatePicker");
_1.provide("ws.widget.WSDualDatePicker");
_1.provide("ws.widget.WSMiniDatePickerDropTarget");
_1.provide("ws.widget.WSDatePickerDropTarget");
_1.require("dojo.widget.HtmlWidget");
_1.require("dojo.event.*");
_1.require("ws.string");
_1.require("ws.date");
_1.widget.defineWidget("ws.widget.WSDatePicker",_1.widget.HtmlWidget,{templateString:"<div class=\"WSDatePicker\">\r\n\t<table dojoAttachPoint=\"content\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\r\n\t\t<thead dojoAttachPoint=\"datePickerHead\">\r\n\t\t\t<tr class=\"nav\">\r\n\t\t\t\t<td align=\"center\" colspan=\"7\">\r\n\t\t\t\t<div style=\"width: 38px;\">\t\t\t\t\r\n\t\t\t\t<div class=\"prevButton\" dojoattachevent=\"onClick: decrementMonth\"></div>\r\n\t\t\t\t<div class=\"nextButton\" dojoattachevent=\"onClick: incrementMonth\"></div>\r\n\t\t\t\t</div>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr height=5></tr>\r\n\t\t</thead>\r\n\t\t<tbody dojoAttachPoint=\"datePickerBody\">\r\n\t\t\t<tr>\r\n\t\t\t\t<td colspan=\"7\"><span dojoAttachPoint=\"monthYearNode\" class=\"monthyear\"></span></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr dojoAttachPoint=\"datePickerDaysOfWeek\" class=\"days\">\r\n\t\t\t\t<td><span class=\"dayofweek\"></span></td>\r\n\t\t\t\t<td><span class=\"dayofweek\"></span></td>\r\n\t\t\t\t<td><span class=\"dayofweek\"></span></td>\r\n\t\t\t\t<td><span class=\"dayofweek\"></span></td>\r\n\t\t\t\t<td><span class=\"dayofweek\"></span></td>\r\n\t\t\t\t<td><span class=\"dayofweek\"></span></td>\r\n\t\t\t\t<td><span class=\"dayofweek\"></span></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr style=\"display:none\" dojoAttachPoint=\"fivthWeekRow\">\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr style=\"display:none\" dojoAttachPoint=\"sixthWeekRow\">\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr style=\"display:none;\" height=10>\r\n\t\t\t</tr>\r\n\t\t\t<tr style=\"display:none\" >\r\n\t\t\t\t<td colspan=\"7\"><span dojoAttachPoint=\"monthYearNode2\" class=\"monthyear\"></span></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr style=\"display:none\"  dojoAttachPoint=\"datePickerDaysOfWeek2\" class=\"days\">\r\n\t\t\t\t<td><span class=\"dayofweek\"></span></td>\r\n\t\t\t\t<td><span class=\"dayofweek\"></span></td>\r\n\t\t\t\t<td><span class=\"dayofweek\"></span></td>\r\n\t\t\t\t<td><span class=\"dayofweek\"></span></td>\r\n\t\t\t\t<td><span class=\"dayofweek\"></span></td>\r\n\t\t\t\t<td><span class=\"dayofweek\"></span></td>\r\n\t\t\t\t<td><span class=\"dayofweek\"></span></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr style=\"display:none\" >\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr style=\"display:none\" >\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr style=\"display:none\" >\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr style=\"display:none\">\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr style=\"display:none\" dojoAttachPoint=\"fivthWeekRow2\">\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr style=\"display:none\" dojoAttachPoint=\"sixthWeekRow2\">\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t</tr>\r\n\t\t</tbody>\r\n\t\t<tfoot dojoAttachPoint=\"datePickerFoot\">\r\n\t\t\t<tr height=30>\r\n\t\t\t\t<td colspan=\"7\">\r\n\t\t\t\t<span class=\"wsLink\" dojoAttachPoint=\"todayNode\" dojoAttachEvent=\"onClick: selectToday\"></span>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t</tfoot>\r\n\t</table>\r\n</div>\r\n",templateCssString:".WSDatePicker\r\n{\r\n\tbackground-color: #FFFFFF;\r\n\tpadding: 5px 5px 5px 5px;\r\n\tborder: 1px #5A5753 solid;\r\n}\r\n\r\n.WSDatePicker table\r\n{\r\n\ttable-layout: fixed;\r\n\twidth: 100%;\r\n\tborder: none;\r\n\ttext-align: center;\r\n\tfont-family: Arial, Serif;\r\n\tfont-size: 11px;\r\n\tcolor: black; \r\n}\r\n\r\n.WSDatePicker thead tr.nav { background-color: #FFFFFF;}\r\n.WSDatePicker thead tr.days { }\r\n.WSDatePicker tbody span.monthyear { font-family: Arial, Serif; font-size: 12px; font-weight: bold; color: #000000; }\r\n.WSDatePicker tbody span.dayofweek { font-family:Arial; font-size: 11px; color: #85817C; }\r\n.WSDatePicker tbody tr { background-color: #FFFFFF; }\r\n.WSDatePicker tbody td { height: 14px; border: 0px }\r\n.WSDatePicker tbody td.outsiderange { }\r\n.WSDatePicker tbody td.selected { background-color: #E4EDFA; }\r\n.WSDatePicker tbody td.hovered { background-color: #E4EDFA; }\r\n.WSDatePicker tbody td.today { background-color: #FFE096; }\r\n.WSDatePicker tbody td.dragover { background-color: #89C9EC; }\r\n.WSDatePicker tbody a { text-decoration: none; color: black; }\r\n.WSDatePicker tbody td.outsiderange a { color: #C1D0DD; }\r\n.WSDatePicker tbody a.hasdata { color: #5C5C72; font-weight: bold; }\r\n.WSDatePicker tfoot a {color: #0066CC;  font-size:11px}\r\n\r\n.WSDatePicker .nav .prevButton\r\n{\r\n\tbackground: url(\"${images}main.gif\") -1544px 0px;\r\n\twidth: 18px;\r\n\theight: 18px;\r\n\tcursor: pointer;\r\n\tfloat:left;\r\n}\r\n\r\n.WSDatePicker .nav .prevButton:hover\r\n{\r\n\tbackground: url(\"${images}main.gif\") -1574px 0px;\r\n}\r\n\r\n.WSDatePicker .nav .nextButton\r\n{\r\n\tbackground: url(\"${images}main.gif\") -1454px 0px;\r\n\twidth: 18px;\r\n\theight: 18px;\r\n\tcursor: pointer;\r\n\tfloat:right;\r\n}\r\n\r\n.WSDatePicker .nav .nextButton:hover\r\n{\r\n\tbackground: url(\"${images}main.gif\") -1484px 0px;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/widget/WSDatePicker.css"),widgetType:"WSDatePicker",gridHeadDateFormat:Config.Strings.DatePickerHeaderDateFormat,gridFooterDateFormat:Config.Strings.DatePickerFooterDateFormat,fillInTemplate:function(){
this.now=null;
this.today=null;
this.displayDate=null;
this.selectedDate=null;
this.viewStart=null;
this.viewEnd=null;
this.dateRows=null;
this.dateCells=null;
this.startRow=2;
this.endRow=7;
this.numRowsBeingDisplayed=5;
this.dateRows=this.datePickerBody.rows;
this.dateCells=new Array();
var row,_45;
for(var i=this.startRow;i<=this.endRow;i++){
row=this.dateRows[i];
this.dateCells[i-this.startRow]=new Array();
_45=row.cells;
for(var j=0;j<_45.length;j++){
this.dateCells[i-this.startRow][j]=_45[j];
this.dateCells[i-this.startRow][j]._dayOffset=(i-this.startRow)*7+j;
}
}
var _48=0;
var _49=new Array();
var i;
while(_48<ws.date.abbrevDays.length){
i=(ws.date.firstDayOfWeek+_48)%ws.date.abbrevDays.length;
_49[_48]=ws.date.abbrevDays[i];
_48++;
}
var _4a=this.datePickerDaysOfWeek.getElementsByTagName("span");
for(var i=0;i<_4a.length;i++){
_4a[i].innerHTML=_49[i];
}
},postCreate:function(_4b,_4c){
this.setDate(null);
if(this.isDropTarget){
var _4d=new ws.widget.DatePickerDropTarget(this.content,[ws.calendar.CalendarDragAndDrop.TYPE_GRIDVIEWMOVE,ws.calendar.CalendarDragAndDrop.TYPE_UNTIMEDVIEWMOVE,ws.calendar.CalendarDragAndDrop.TYPE_COLUMNVIEWMOVE],this,this.content);
}
},selectDateConnect:function(_4e){
},updateUI:function(arg){
var _50=new Object();
if(arg){
_50=arg;
}
this.monthYearNode.innerHTML=ws.date.formatDateTime(this.displayDate,this.gridHeadDateFormat);
var _51=null;
var _52=null;
var _53=this.viewStart;
var _54=(this.endRow-this.startRow)+1;
var i=0;
for(i=0;i<_54;i++){
if((i==(_54-1))&&(_53.getMonth()!=this.displayDate.getMonth())){
_1.html.hide(this.sixthWeekRow);
break;
}else{
if((i==(_54-2))&&(_53.getMonth()!=this.displayDate.getMonth())){
_1.html.hide(this.fivthWeekRow);
break;
}else{
if(i==(_54-1)){
_1.html.show(this.sixthWeekRow);
}
if(i==(_54-2)){
_1.html.show(this.fivthWeekRow);
}
for(var j=0;j<this.dateCells[i].length;j++){
_51=this.dateCells[i][j];
_52=_51.childNodes[0];
if(_53.getMonth()!=this.displayDate.getMonth()){
_52.innerHTML="";
_52.style.fontWeight="normal";
}else{
var nd=_53.getDate();
if(_50[nd]){
_52.style.fontWeight="bold";
}else{
_52.style.fontWeight="normal";
}
_52.innerHTML=_53.getDate();
}
var _58="";
if(_52.innerHTML!=""){
if(_53.getTime()==this.today.getTime()){
_58="today";
}
if(_53.getTime()==this.selectedDate.getTime()){
_58="selected";
}
}
_1.html.setClass(_51,_58);
_53=ws.date.add(_53,ws.date.dateParts.DAY,1);
}
}
}
}
this.numRowsBeingDisplayed=i;
var _59=ws.date.formatDateTime(this.today,this.gridFooterDateFormat);
this.todayNode.innerHTML=Config.Strings.TodayIs+_59;
},getNumRows:function(){
return this.numRowsBeingDisplayed;
},setDate:function(_5a){
this.now=new Date();
this.today=new Date(this.now.getFullYear(),this.now.getMonth(),this.now.getDate());
this.displayDate=_5a;
if(this.displayDate==null){
this.displayDate=new Date(this.now.getFullYear(),this.now.getMonth(),this.now.getDate());
}
if(this.selectedDate==null){
this.selectedDate=new Date(this.now.getFullYear(),this.now.getMonth(),this.now.getDate());
}
this.viewStart=ws.date.getFirstDayInMonthView(this.displayDate);
this.viewEnd=ws.date.getLastDayInMonthView(this.displayDate);
this.updateUI();
},decrementMonth:function(evt){
var _5c=ws.date.add(this.displayDate,ws.date.dateParts.MONTH,-1);
this.setDate(_5c);
},incrementMonth:function(evt){
var _5e=ws.date.incrementMonth(this.displayDate);
this.setDate(_5e);
},onSelectDate:function(evt){
var _60=evt.currentTarget;
if(_60&&_60.childNodes[0].innerHTML!=""){
this.selectedDate=ws.date.add(this.viewStart,ws.date.dateParts.DAY,_60._dayOffset);
this.setDate(this.selectedDate);
this.selectDateConnect(this.selectedDate);
}
},selectToday:function(evt){
this.selectedDate=this.today;
this.setDate(this.selectedDate);
this.selectDateConnect(this.selectedDate);
},onMouseOverDate:function(evt){
var _63=evt.currentTarget;
if(_63&&_63.childNodes[0].innerHTML!=""){
_1.html.addClass(_63,"hovered");
}
},onMouseOutDate:function(evt){
var _65=evt.currentTarget;
if(_65&&_65.childNodes[0].innerHTML!=""){
_1.html.removeClass(_65,"hovered");
}
}});
_1.widget.defineWidget("ws.widget.WSDualDatePicker",ws.widget.WSDatePicker,{templateString:"<div class=\"WSDatePicker\">\r\n\t<table dojoAttachPoint=\"content\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\r\n\t\t<thead dojoAttachPoint=\"datePickerHead\">\r\n\t\t\t<tr class=\"nav\">\r\n\t\t\t\t<td align=\"center\" colspan=\"7\">\r\n\t\t\t\t<div style=\"width: 38px;\">\t\t\t\t\r\n\t\t\t\t<div class=\"prevButton\" dojoattachevent=\"onClick: decrementMonth\"></div>\r\n\t\t\t\t<div class=\"nextButton\" dojoattachevent=\"onClick: incrementMonth\"></div>\r\n\t\t\t\t</div>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr height=5></tr>\r\n\t\t</thead>\r\n\t\t<tbody dojoAttachPoint=\"datePickerBody\">\r\n\t\t\t<tr>\r\n\t\t\t\t<td colspan=\"7\"><span dojoAttachPoint=\"monthYearNode\" class=\"monthyear\"></span></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr dojoAttachPoint=\"datePickerDaysOfWeek\" class=\"days\">\r\n\t\t\t\t<td><span class=\"dayofweek\"></span></td>\r\n\t\t\t\t<td><span class=\"dayofweek\"></span></td>\r\n\t\t\t\t<td><span class=\"dayofweek\"></span></td>\r\n\t\t\t\t<td><span class=\"dayofweek\"></span></td>\r\n\t\t\t\t<td><span class=\"dayofweek\"></span></td>\r\n\t\t\t\t<td><span class=\"dayofweek\"></span></td>\r\n\t\t\t\t<td><span class=\"dayofweek\"></span></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr style=\"display:none\" dojoAttachPoint=\"fivthWeekRow\">\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr style=\"display:none\" dojoAttachPoint=\"sixthWeekRow\">\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate\"><a href=\"#\"></a></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr style=\"display:none;\" height=10>\r\n\t\t\t</tr>\r\n\t\t\t<tr style=\"display:none\" >\r\n\t\t\t\t<td colspan=\"7\"><span dojoAttachPoint=\"monthYearNode2\" class=\"monthyear\"></span></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr style=\"display:none\"  dojoAttachPoint=\"datePickerDaysOfWeek2\" class=\"days\">\r\n\t\t\t\t<td><span class=\"dayofweek\"></span></td>\r\n\t\t\t\t<td><span class=\"dayofweek\"></span></td>\r\n\t\t\t\t<td><span class=\"dayofweek\"></span></td>\r\n\t\t\t\t<td><span class=\"dayofweek\"></span></td>\r\n\t\t\t\t<td><span class=\"dayofweek\"></span></td>\r\n\t\t\t\t<td><span class=\"dayofweek\"></span></td>\r\n\t\t\t\t<td><span class=\"dayofweek\"></span></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr style=\"display:none\" >\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr style=\"display:none\" >\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr style=\"display:none\" >\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr style=\"display:none\">\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr style=\"display:none\" dojoAttachPoint=\"fivthWeekRow2\">\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr style=\"display:none\" dojoAttachPoint=\"sixthWeekRow2\">\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t\t<td dojoAttachEvent=\"onMouseOver: onMouseOverDate; onMouseOut: onMouseOutDate; onClick: onSelectDate2\"><a href=\"#\"></a></td>\r\n\t\t\t</tr>\r\n\t\t</tbody>\r\n\t\t<tfoot dojoAttachPoint=\"datePickerFoot\">\r\n\t\t\t<tr height=30>\r\n\t\t\t\t<td colspan=\"7\">\r\n\t\t\t\t<span class=\"wsLink\" dojoAttachPoint=\"todayNode\" dojoAttachEvent=\"onClick: selectToday\"></span>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t</tfoot>\r\n\t</table>\r\n</div>\r\n",templateCssString:".WSDatePicker\r\n{\r\n\tbackground-color: #FFFFFF;\r\n\tpadding: 5px 5px 5px 5px;\r\n\tborder: 1px #5A5753 solid;\r\n}\r\n\r\n.WSDatePicker table\r\n{\r\n\ttable-layout: fixed;\r\n\twidth: 100%;\r\n\tborder: none;\r\n\ttext-align: center;\r\n\tfont-family: Arial, Serif;\r\n\tfont-size: 11px;\r\n\tcolor: black; \r\n}\r\n\r\n.WSDatePicker thead tr.nav { background-color: #FFFFFF;}\r\n.WSDatePicker thead tr.days { }\r\n.WSDatePicker tbody span.monthyear { font-family: Arial, Serif; font-size: 12px; font-weight: bold; color: #000000; }\r\n.WSDatePicker tbody span.dayofweek { font-family:Arial; font-size: 11px; color: #85817C; }\r\n.WSDatePicker tbody tr { background-color: #FFFFFF; }\r\n.WSDatePicker tbody td { height: 14px; border: 0px }\r\n.WSDatePicker tbody td.outsiderange { }\r\n.WSDatePicker tbody td.selected { background-color: #E4EDFA; }\r\n.WSDatePicker tbody td.hovered { background-color: #E4EDFA; }\r\n.WSDatePicker tbody td.today { background-color: #FFE096; }\r\n.WSDatePicker tbody td.dragover { background-color: #89C9EC; }\r\n.WSDatePicker tbody a { text-decoration: none; color: black; }\r\n.WSDatePicker tbody td.outsiderange a { color: #C1D0DD; }\r\n.WSDatePicker tbody a.hasdata { color: #5C5C72; font-weight: bold; }\r\n.WSDatePicker tfoot a {color: #0066CC;  font-size:11px}\r\n\r\n.WSDatePicker .nav .prevButton\r\n{\r\n\tbackground: url(\"${images}main.gif\") -1544px 0px;\r\n\twidth: 18px;\r\n\theight: 18px;\r\n\tcursor: pointer;\r\n\tfloat:left;\r\n}\r\n\r\n.WSDatePicker .nav .prevButton:hover\r\n{\r\n\tbackground: url(\"${images}main.gif\") -1574px 0px;\r\n}\r\n\r\n.WSDatePicker .nav .nextButton\r\n{\r\n\tbackground: url(\"${images}main.gif\") -1454px 0px;\r\n\twidth: 18px;\r\n\theight: 18px;\r\n\tcursor: pointer;\r\n\tfloat:right;\r\n}\r\n\r\n.WSDatePicker .nav .nextButton:hover\r\n{\r\n\tbackground: url(\"${images}main.gif\") -1484px 0px;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/widget/WSDatePicker.css"),widgetType:"WSDualDatePicker",fillInTemplate:function(){
ws.widget.WSDualDatePicker.superclass.fillInTemplate.call(this);
this.startRow2=11;
this.endRow2=16;
this.viewStart2=null;
var row,_67;
this.dateRows[8].style.display="";
this.dateRows[9].style.display="";
this.dateRows[10].style.display="";
var k=this.dateCells.length;
for(var i=this.startRow2;i<=this.endRow2;i++){
row=this.dateRows[i];
row.style.display="";
this.dateCells[k]=new Array();
_67=row.cells;
for(var j=0;j<_67.length;j++){
this.dateCells[k][j]=_67[j];
this.dateCells[k][j]._dayOffset=(i-this.startRow2)*7+j;
}
k++;
}
var _6b=0;
var _6c=new Array();
var i;
while(_6b<ws.date.abbrevDays.length){
i=(ws.date.firstDayOfWeek+_6b)%ws.date.abbrevDays.length;
_6c[_6b]=ws.date.abbrevDays[i];
_6b++;
}
var _6d=this.datePickerDaysOfWeek2.getElementsByTagName("span");
for(var i=0;i<_6d.length;i++){
_6d[i].innerHTML=_6c[i];
}
},updateUI:function(){
ws.widget.WSDualDatePicker.superclass.updateUI.call(this);
var _6e=ws.date.incrementMonth(this.displayDate);
this.monthYearNode2.innerHTML=ws.date.formatDateTime(_6e,this.gridHeadDateFormat);
this.viewStart2=ws.date.getFirstDayInMonthView(_6e);
var _6f=null;
var _70=null;
var _71=this.viewStart2;
var _72=this.dateCells.length/2;
var _73=_72+(this.endRow2-this.startRow2);
for(var i=_72;i<=_73;i++){
if((i==_73-1)&&(_71.getMonth()!=_6e.getMonth())){
_1.html.hide(this.sixthWeekRow2);
break;
}else{
if((i==_73-2)&&(_71.getMonth()!=_6e.getMonth())){
_1.html.hide(this.fivthWeekRow2);
break;
}else{
if(i==_73-1){
_1.html.show(this.sixthWeekRow2);
}
if(i==_73-2){
_1.html.show(this.fivthWeekRow2);
}
for(var j=0;j<this.dateCells[i].length;j++){
_6f=this.dateCells[i][j];
_70=_6f.childNodes[0];
if(_71.getMonth()!=_6e.getMonth()){
_70.innerHTML="";
}else{
_70.innerHTML=_71.getDate();
}
var _76="";
if(_70.innerHTML!=""){
if(_71.getTime()==this.today.getTime()){
_76="today";
}
if(_71.getTime()==this.selectedDate.getTime()){
_76="selected";
}
}
_1.html.setClass(_6f,_76);
_71=ws.date.add(_71,ws.date.dateParts.DAY,1);
}
}
}
}
},onSelectDate2:function(evt){
var _78=evt.currentTarget;
if(_78&&_78.childNodes[0].innerHTML!=""){
this.selectedDate=ws.date.add(this.viewStart2,ws.date.dateParts.DAY,_78._dayOffset);
this.setDate(this.selectedDate);
this.selectDateConnect(this.selectedDate);
}
},decrementMonth:function(evt){
var _7a=ws.date.add(this.displayDate,ws.date.dateParts.MONTH,-2);
this.setDate(_7a);
},incrementMonthHelper:function(evt){
var _7c=ws.date.incrementMonth(this.displayDate);
this.setDate(_7c);
},incrementMonth:function(evt){
this.incrementMonthHelper(evt);
this.incrementMonthHelper(evt);
}});
_1.provide("ws.widget.WSTimePicker");
_1.require("dojo.widget.HtmlWidget");
_1.require("dojo.event.*");
_1.require("ws.string");
_1.require("ws.date");
_1.widget.defineWidget("ws.widget.WSTimePicker",_1.widget.HtmlWidget,{templateString:"<div dojoAttachPoint=\"timePickerContainer\" class=\"WSTimePicker\">\r\n\t<table dojoAttachPoint=\"timePickerBody\" class=\"pickerBody\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t\t<tr><td dojoAttachEvent=\"onMouseOver: onMouseOverTime; onMouseOut: onMouseOutTime; onClick: onSelectTime\"><a href=\"#\"></a></td></tr>\r\n\t</table>\r\n</div>\r\n",templateCssString:".WSTimePicker\r\n{\r\n\theight: 120px;\r\n\toverflow: auto;\r\n\tbackground-color: #FFFFFF;\r\n\tborder: 1px #5A5753 solid;\r\n}\r\n\r\n.WSTimePicker .pickerBody\r\n{\r\n\ttable-layout: fixed;\r\n\tborder: none;\r\n\ttext-align: center;\r\n\tfont-family: Arial, Serif;\r\n\tfont-size: 11px;\r\n\tcolor: black; \r\n}\r\n\r\n.WSTimePicker .pickerBodyFF\r\n{\r\n\twidth: 100%;\r\n}\r\n\r\n.WSTimePicker tr { background-color: #FFFFFF; }\r\n.WSTimePicker td { height: 20px; border: 0px }\r\n.WSTimePicker td.selected { background-color: #E4EDFA; }\r\n.WSTimePicker td.hovered { background-color: #E4EDFA; }\r\n.WSTimePicker td.target { background-color: #FFE096; }\r\n.WSTimePicker a { text-decoration: none; color: black; }\r\n",templateCssPath:_1.uri.dojoUri("../ws/widget/WSTimePicker.css"),widgetType:"WSTimePicker",timeFormat:Config.Strings.CalTimeFormatRange1,fillInTemplate:function(){
_1.debug("WSTimePicker fillInTemplate()");
this.selectedCell=null;
this.selectedTime="";
this.timeLinks=new Array();
var _7e,_7f,_80,min;
var _82=new Date();
for(var i=0;i<48;i++){
_7e=_1.html.getFirstChildElement(this.timePickerBody.rows[i]);
_7f=_1.html.getFirstChildElement(_7e,"a");
if(i%2){
_80=Math.floor(i/2);
min=30;
}else{
_80=i/2;
min=0;
}
_82.setHours(_80,min);
_7f.innerHTML=ws.date.formatDateTime(_82,this.timeFormat);
this.timeLinks[i]=_7f;
}
},postCreate:function(_84,_85){
if(_1.render.html.moz){
_1.html.addClass(this.timePickerBody,"pickerBodyFF");
}
this.setTime(null);
},selectTimeConnect:function(_86){
},updateUI:function(arg){
},setTime:function(_88){
if(this.selectedCell){
_1.html.removeClass(this.selectedCell,"selected");
}
if(_88){
_1.debugShallow(_88);
var _89=_88.getHours();
var min=_88.getMinutes();
var _8b=_89*2+((min>0)?1:0)+((min>30)?1:0);
if(_8b==48){
_8b=0;
}
this.selectedCell=_1.html.getFirstChildElement(this.timePickerBody.rows[_8b]);
_1.html.addClass(this.selectedCell,"selected");
this.selectedTime=_1.html.getFirstChildElement(this.selectedCell,"a").innerHTML;
var _8c=_8b*20;
this.timePickerContainer.scrollTop=_8c;
}else{
this.timePickerContainer.scrollTop=0;
}
this.updateUI();
},onSelectTime:function(evt){
_1.debug("WSTimePicker onSelectTime()");
var _8e=evt.currentTarget;
if(_8e&&_8e.childNodes[0].innerHTML!=""){
if(this.selectedCell){
_1.html.removeClass(this.selectedCell,"selected");
}
this.selectedCell=_8e;
_1.html.addClass(_8e,"selected");
this.selectedTime=_8e.childNodes[0].innerHTML;
this.selectTimeConnect(this.selectedTime);
}
},onMouseOverTime:function(evt){
var _90=evt.currentTarget;
if(_90&&_90.childNodes[0].innerHTML!=""){
_1.html.addClass(_90,"hovered");
}
},onMouseOutTime:function(evt){
var _92=evt.currentTarget;
if(_92&&_92.childNodes[0].innerHTML!=""){
_1.html.removeClass(_92,"hovered");
}
}});
_1.provide("ws.widget.PopupDatePicker");
_1.provide("ws.widget.PopupDualDatePicker");
_1.require("dojo.widget.*");
_1.widget.defineWidget("ws.widget.PopupDatePicker",_1.widget.PopupContainer,{width:150,closeOnMouseOut:false,displayDate:null,isContainer:true,templateString:"<div dojoAttachPoint=\"containerNode\" style=\"display:none;position:absolute;\" class=\"dojoPopupContainer\" ></div>",hidePickerOnSetDate:false,postCreate:function(_93,_94){
this.hideTimeout=null;
this.datePicker=_1.widget.createWidget("ws:WSDatePicker",null,this.containerNode,"child");
_1.html.setMarginBox(this.domNode,{width:this.width});
this.datePicker.setDate(this.displayDate);
if(this.hidePickerOnSetDate){
_1.event.connect(this.datePicker,"selectDateConnect",this,"hidePopup");
}
},setDate:function(_95){
this.displayDate=_95;
this.datePicker.setDate(this.displayDate);
if(this.hidePickerOnSetDate){
this.hidePopup();
}
},initializeDate:function(_96){
this.displayDate=_96;
this.datePicker.setDate(this.displayDate);
},aboutToShow:function(){
if(this.closeOnMouseOut){
_1.event.connect(this.domNode,"onmouseover",this,"cancelTimeouts");
_1.event.connect(this.domNode,"onmouseout",this,"hidePopup");
}
},cancelTimeouts:function(){
if(this.hideTimeout!=null){
_1.lang.clearTimeout(this.hideTimeout);
this.hideTimeout=null;
}
},hidePopup:function(){
this.cancelTimeouts();
this.hideTimeout=_1.lang.setTimeout(this,"delayedHidePopup",10);
},delayedHidePopup:function(){
if(this.hideTimeout==null){
return;
}
this.hideTimeout=null;
this.close(true);
_1.event.disconnect(this.domNode,"onmouseover",this,"cancelTimeouts");
_1.event.disconnect(this.domNode,"onmouseout",this,"hide");
},getSelectedDate:function(){
return this.datePicker.selectedDate;
}});
_1.widget.defineWidget("ws.widget.PopupDualDatePicker",ws.widget.PopupDatePicker,{postCreate:function(_97,_98){
this.hideTimeout=null;
this.datePicker=_1.widget.createWidget("ws:WSDualDatePicker",null,this.containerNode,"child");
_1.html.setMarginBox(this.domNode,{width:this.width});
this.datePicker.setDate(this.displayDate);
}});
_1.provide("ws.widget.PopupTimePicker");
_1.widget.defineWidget("ws.widget.PopupTimePicker",_1.widget.PopupContainer,{width:100,closeOnMouseOut:false,displayTime:null,isContainer:true,templateString:"<div dojoAttachPoint=\"containerNode\" style=\"display:none;position:absolute;\" class=\"dojoPopupContainer\" ></div>",hidePickerOnSetTime:false,postCreate:function(_99,_9a){
this.hideTimeout=null;
this.timePicker=_1.widget.createWidget("ws:WSTimePicker",null,this.containerNode,"child");
if(_1.render.html.moz||_1.render.html.ie){
this.width=72;
}
_1.html.setMarginBox(this.domNode,{width:this.width});
this.timePicker.setTime(this.displayTime);
if(this.hidePickerOnSetTime){
_1.event.connect(this.timePicker,"selectTimeConnect",this,"hidePopup");
}
},setTime:function(_9b){
this.displayTime=_9b;
this.timePicker.setTime(this.displayTime);
if(this.hidePickerOnSetTime){
this.hidePopup();
}
},initializeTime:function(_9c){
this.displayTime=_9c;
this.timePicker.setTime(this.displayTime);
},aboutToShow:function(){
if(this.closeOnMouseOut){
_1.event.connect(this.domNode,"onmouseover",this,"cancelTimeouts");
_1.event.connect(this.domNode,"onmouseout",this,"hidePopup");
}
},cancelTimeouts:function(){
if(this.hideTimeout!=null){
_1.lang.clearTimeout(this.hideTimeout);
this.hideTimeout=null;
}
},hidePopup:function(){
this.cancelTimeouts();
this.hideTimeout=_1.lang.setTimeout(this,"delayedHidePopup",10);
},delayedHidePopup:function(){
if(this.hideTimeout==null){
return;
}
this.hideTimeout=null;
this.close(true);
_1.event.disconnect(this.domNode,"onmouseover",this,"cancelTimeouts");
_1.event.disconnect(this.domNode,"onmouseout",this,"hide");
},getSelectedTime:function(){
return this.timePicker.selectedTime;
}});
_1.provide("ws.calendar.AddEventDialog");
_1.require("dojo.widget.*");
_1.require("dojo.widget.Dialog");
_1.require("ws.calendar.calutil");
_1.require("ws.date");
_1.require("ws.widget.OkCancelDialog");
_1.require("ws.widget.WSButton");
_1.require("ws.widget.WSSelect");
_1.widget.defineWidget("ws.calendar.AddEventDialog",_1.widget.HtmlWidget,{widgetsInTemplate:true,templateString:"<div>\r\n\t<div dojoType=\"dojo:Dialog\" dojoAttachPoint=\"addDialogWidget\" bgColor=\"white\" bgOpacity=\"0.75\">\r\n\t\t<div class=\"addEditEvent\"  dojoAttachEvent=\"onKeyPress: onKeyPress; onKeyDown: onKeyPress\">\r\n\t\t\t<img src=\"${spacer}\" class=\"closeButton\" dojoAttachEvent=\"onClick: hide\">\r\n\t\t\t<div dojoAttachPoint=\"contentPane\" class=\"inputData\">\r\n\t\t\t\t<table border=\"0\" cellpadding=\"1\" cellspacing=\"1\" style=\"table-layout: fixed; width: 100%;\">\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td><input class=\"wsInput summaryInput\" maxlength=\"100\" dojoAttachPoint=\"summaryInput\" dojoAttachEvent=\"onClick: summaryTextClick; onBlur: summaryTextBlur\" /></td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t<div class=\"dateTimeDiv\">\r\n\t\t\t\t\t\t\t\t<input class=\"wsInput dateInputField\" dojoAttachPoint=\"startDateInput\" />\r\n\t\t\t\t\t\t\t\t<input class=\"wsInput timeInputField\" dojoAttachPoint=\"startTimeInput\" />\r\n\t\t\t\t\t\t\t\t<span>&nbsp;${CalTo}&nbsp;</span>\r\n\t\t\t\t\t\t\t\t<input class=\"wsInput timeInputField\" dojoAttachPoint=\"endTimeInput\" />\r\n\t\t\t\t\t\t\t\t<input class=\"wsInput dateInputField\" dojoAttachPoint=\"endDateInput\" />\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t\t<input type=\"checkbox\" dojoAttachEvent=\"onClick: checkBoxChange\" dojoAttachPoint=\"allDayBox\" />\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<span dojoAttachPoint=\"checkBoxSpan\" class=\"checkBoxChecked\">${AllDay}</span>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t<div class=\"menuDivs\">\r\n\t\t\t\t\t\t\t\t<img src=\"${spacer}\" align=\"absmiddle\" class=\"icon iconCalendar\" />\r\n\t\t\t\t\t\t\t\t<ul dojoType=\"ws:WSSelect\" className=\"selectMenu\" dojoAttachPoint=\"calendarMenu\" size=\"185\"></ul>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t<div dojoAttachPoint=\"repeatDiv\" class=\"menuDivs\">\r\n\t\t\t\t\t\t\t\t<img src=\"${spacer}\" align=\"absmiddle\" class=\"icon iconRepeat\" />\r\n\t\t\t\t\t\t\t\t<ul dojoType=\"ws:WSSelect\" className=\"selectMenu\" dojoAttachPoint=\"repeatMenu\" size=\"185\">\r\n\t\t\t\t\t\t\t\t\t<li value=\"doesNotRepeat\">${DoesNotRepeat}</li>\r\n\t\t\t\t\t\t\t\t\t<li value=\"everyDay\">${EveryDay}</li>\r\n\t\t\t\t\t\t\t\t\t<li value=\"everyWeek\">${EveryWeek}</li>\r\n\t\t\t\t\t\t\t\t\t<li value=\"everyMonth\">${EveryMonth}</li>\r\n\t\t\t\t\t\t\t\t\t<li value=\"everyYear\">${EveryYear}</li>\r\n\t\t\t\t\t\t\t\t\t<li value=\"customRepeat\">${CustomRepeat}</li>\r\n\t\t\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<div class=\"customDialog\" dojoAttachPoint=\"repeatDialog\" style=\"display: none;\">\r\n\t\t\t\t\t\t\t\t\t<table dojoAttachPoint=\"repeatTable\" border=\"0\" cellpadding=\"2\" cellspacing=\"1\" style=\"table-layout:fixed; width: 100%;\">\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td colspan=\"105\" align=\"left\" valign=middle\" >\r\n\t\t\t\t\t\t\t\t\t\t\t<nobr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"spanText\">${Every}&nbsp;</span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input class=\"wsInput everyInput\" dojoAttachPoint=\"repeatEveryInput\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t<ul dojoType=\"ws:WSSelect\" dojoAttachPoint=\"repeatEveryMenu\" size=\"75\" className=\"repeatOption\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<li value=\"repeatEveryDay\">${day}</li>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<li value=\"repeatEveryWeek\">${week}</li>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<li value=\"repeatEveryMonth\">${month}</li>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<li value=\"repeatEveryYear\">${year}</li>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<div style=\"display:inline\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"spanText\" dojoAttachPoint=\"onTextSpan\">${CalendarOn}:</span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t</nobr>\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr dojoAttachPoint=\"dayIntervalSelect\" class=\"dayIntervalSelect\">\r\n\t\t\t\t\t\t\t\t\t\t\t<td colspan=\"10\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"pickDaySpan\" dojoAttachPoint=\"day0Span\"></span>\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td colspan=\"10\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"pickDaySpan\" dojoAttachPoint=\"day1Span\"></span>\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td colspan=\"10\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"pickDaySpan\" dojoAttachPoint=\"day2Span\"></span>\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td colspan=\"10\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"pickDaySpan\" dojoAttachPoint=\"day3Span\"></span>\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td colspan=\"10\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"pickDaySpan\" dojoAttachPoint=\"day4Span\"></span>\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td colspan=\"10\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"pickDaySpan\" dojoAttachPoint=\"day5Span\"></span>\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td colspan=\"10\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"pickDaySpan\" dojoAttachPoint=\"day6Span\"></span>\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td colspan=\"30\"></td>\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr dojoAttachPoint=\"monthIntervalSelect\" class=\"monthIntervalSelect\" style=\"display: none;\">\r\n\t\t\t\t\t\t\t\t\t\t\t<td colspan=\"100\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input name=\"monthSelect\" type=\"radio\" dojoAttachEvent=\"onChange: monthButtonChange\" dojoAttachPoint=\"customMonthDateButton\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span dojoAttachPoint=\"customMonthDate\">on the 15th&nbsp;</span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input name=\"monthSelect\" type=\"radio\" dojoAttachEvent=\"onChange: monthButtonChange\" dojoAttachPoint=\"customMonthDayButton\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span dojoAttachPoint=\"customMonthDay\">on the fourth Monday</span>\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td colspan=\"100\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<div class=\"endMenuRow\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<ul dojoType=\"ws:WSSelect\" className=\"zeroMarginLeft\" dojoAttachPoint=\"endDateMenu\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li value=\"noEndDate\">${NoEndDate}</li>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li value=\"repeatUntil\">${RepeatUntil}</li>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<input dojoAttachPoint=\"endRepeatDateInput\" class=\"wsInput dateInputField\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t<div dojoAttachPoint=\"repeatCustomSummary\" class=\"customSummaryDiv\" style=\"display: none;\">\r\n\t\t\t\t\t\t\t\t\t<span dojoAttachPoint=\"repeatEverySummarySpan\"></span>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</td>\t\t\t\t\t\t\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr dojoAttachPoint=\"remindRow\">\r\n\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t<div dojoAttachPoint=\"remindDiv\" class=\"menuDivs menuDivsLast\">\r\n\t\t\t\t\t\t\t\t<img src=\"${spacer}\" align=\"absmiddle\" class=\"icon iconReminder\" />\r\n\t\t\t\t\t\t\t\t<input type=\"checkbox\" dojoAttachEvent=\"onClick: toggleCustomReminder\" dojoAttachPoint=\"customReminderCheckBox\" class=\"reminderCheckBox\" />\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<span>${RemindMe}</span>\r\n\t\t\t\t\t\t\t\t<div dojoAttachPoint=\"remindDialog\" class=\"customDialog\" style=\"display: none;\">\r\n\t\t\t\t\t\t\t\t\t<table dojoAttachPoint=\"repeatTable\" border=\"0\" style=\"table-layout:fixed; width: 100%;\">\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td width=\"28\" align=\"left\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input dojoAttachPoint=\"remindInput\" class=\"wsInput everyInput\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td width=\"100\" align=\"left\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<ul dojoType=\"ws:WSSelect\" dojoAttachPoint=\"customRemindMenu\" size=\"80\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<li value=\"remindMinutes\">${Minutes}</li>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<li value=\"remindHours\">${Hours}</li>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<li value=\"remindDays\">${Days}</li>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<li value=\"remindyWeeks\">${Weeks}</li>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td align=\"left\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span>${Before}</span>\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr dojoAttachPoint=\"remindSummaryRow\" style=\"display: none;\">\r\n\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t<div class=\"customSummaryDiv\">\r\n\t\t\t\t\t\t\t\t<span dojoAttachPoint=\"remindSummarySpan\"></span>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t<span class=\"wsLink addNotesLink\" dojoAttachPoint=\"addNotesLink\" dojoAttachEvent=\"onClick: addNotes\">${AddNote}</span>\r\n\t\t\t\t\t\t\t<textarea class=\"addNotesInputShowNew\" dojoAttachEvent=\"onClick: notesTextType\" dojoAttachPoint=\"addNotesInput\"></textarea>\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSButton\" vizType=\"Blue\" dojoAttachPoint=\"saveButton\" className=\"saveButton\" dojoAttachEvent=\"onClick: saveAndClose\">${Save}</div>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t</table>\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t<div dojoType=\"ws:PopupDatePicker\" dojoAttachPoint=\"eventPopupPicker\" toggle=\"wipe\" toggleDuration=\"150\" hidePickerOnSetDate=\"true\" closeOnMouseOut=\"true\" width=\"150\"></div>\r\n\t\t\t<div dojoType=\"ws:PopupTimePicker\" dojoAttachPoint=\"eventTimePopupPicker\" toggle=\"wipe\" toggleDuration=\"150\" hidePickerOnSetTime=\"true\" closeOnMouseOut=\"true\"></div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n",templateCssString:".addEditEvent\r\n{\r\n\tposition: relative;\r\n\twidth: 395px;\r\n\theight: auto;\r\n\tbackground: #fff;\r\n\tborder: 1px solid #000;\r\n\t/*-moz-border-radius: 5px; */\r\n\toverflow: hidden;\r\n}\r\n\r\n.addEditEvent .closeButton\r\n{\r\n\twidth: 12px;\r\n\theight: 12px;\r\n\tmargin-top: 4px;\r\n\tmargin-right: 4px;\r\n\tmargin-bottom: 4px;\r\n\tcursor: pointer;\r\n\tfloat: right;\r\n\tbackground: url(\"${images}main.gif\") -1425px -1px;\r\n}\r\n\r\n.addEditEvent .closeButton:hover {\r\n\tbackground-position: -1440px -1px;\r\n}\r\n\r\n.addEditEvent .inputData\r\n{\r\n\toverflow:auto;\r\n\tmargin-top: 2px;\r\n\tpadding: 13px 1px 8px 13px;\r\n}\r\n\r\n.addEditEvent .inputData .dateTimeDiv\r\n{\r\n\tmargin-top: 6px;\r\n\tmargin-bottom: 6px;\r\n}\r\n\r\n.addEditEvent .inputData .menuDivs\r\n{\r\n\tmargin-bottom: 2px;\r\n\tpadding: 4px;\r\n\tbackground-color: #EDEBE8;\r\n}\r\n\r\n.addEditEvent .inputData .menuDivsLast\r\n{\r\n\tmargin-bottom: 6px;\r\n}\r\n\r\n.addEditEvent .inputData .menuDivs img.icon\r\n{\r\n\tmargin-top: 5px;\r\n\tmargin-left: 3px;\r\n\twidth: 18px;\r\n\theight: 18px;\r\n\tbackground-image: url(\"${images}main.gif\");\r\n}\r\n\r\n.addEditEvent .inputData .menuDivs img.iconCalendar\t\t{ float: left; background-position: -120px -0px;\t}\r\n.addEditEvent .inputData .menuDivs img.iconRepeat\t\t{ float: left; background-position: -1303px -30px;\t}\r\n.addEditEvent .inputData .menuDivs img.iconReminder\t\t{ background-position: -1261px -31px;\t}\r\n\r\n.addEditEvent .inputData .selectMenu\r\n{\r\n\tleft: 20px;\r\n}\r\n\r\n.addEditEvent .inputData .selectMenuIE\r\n{\r\n\tleft: 5px;\r\n}\r\n\r\n.addEditEvent .inputData .checkBoxChecked\r\n{\r\n\tfont-family: Tahoma;\r\n\tcolor: #000000;\r\n\tfont-size: 12px;\r\n}\r\n\r\n.addEditEvent .inputData .checkBoxNotChecked\r\n{\r\n\tfont-family: Tahoma;\r\n\tcolor: #cccccc;\r\n\tfont-size: 12px;\r\n}\r\n\r\n.addEditEvent .inputData .customSummaryDiv\r\n{\r\n\tpadding-left: 5px;\r\n\tmargin-top: 3px;\r\n}\r\n\r\n.addEditEvent .inputData input.summaryInput\r\n{\r\n\twidth: 98%;\r\n\tpadding-left: 4px;\r\n\tpadding-bottom: 2px;\r\n}\r\n\r\n.addEditEvent .inputData input.summaryInputNew\r\n{\r\n\twidth: 98%;\r\n\tpadding-left: 4px;\r\n\tpadding-bottom: 2px;\r\n\tcolor: #A5A5A5;\r\n}\r\n\r\n.addEditEvent .inputData input.dateInputField\r\n{\r\n\twidth: 100px;\r\n}\r\n\r\n.addEditEvent .inputData input.timeInputField\r\n{\r\n\twidth: 53px;\r\n}\r\n\r\n.addEditEvent .inputData span.addNotesLink\r\n{\r\n\tfloat: left;\r\n\tfont-size: 11px;\r\n}\r\n\r\n.addEditEvent .inputData .addNotesInputShowNew\r\n{\r\n\tcolor: #A5A5A5; \r\n\twidth: 98%; \r\n\theight: 80px;\r\n\toverflow: auto;\r\n\tborder: 1px solid #85817c;\r\n\tmargin-bottom: 9px;\r\n\tpadding-left: 4px;\r\n\tpadding-top: 3px;\r\n}\r\n\r\n.addEditEvent .inputData .addNotesInputShow\r\n{\r\n\twidth: 98%; \r\n\theight: 80px;\r\n\toverflow: auto;\r\n\tborder: 1px solid #85817c;\r\n\tmargin-bottom: 9px;\r\n\tpadding-left: 4px;\r\n\tpadding-top: 3px;\r\n}\r\n\r\n.addEditEvent .inputData .saveButton\r\n{\r\n\tfloat: right;\r\n}\r\n\r\n.addEditEvent .inputData .menuDivs .reminderCheckBox\r\n{\r\n\tmargin-bottom: 0px;\r\n\tmargin-left: 4px;\r\n\tmargin-right: 5px;\r\n}\r\n\r\n.addEditEvent .inputData .menuDivs .customDialog\r\n{\r\n\tmargin-top: 7px;\r\n\tpadding-left: 1px;\r\n\tfont-family: Tahoma;\r\n}\r\n\r\n.addEditEvent .customDialog .repeatOption\r\n{\r\n\tdisplay: inline;\r\n\ttop: -1px;\r\n}\r\n\r\n.addEditEvent .customDialog .repeatOptionIE\r\n{\r\n\ttop: -2px;\r\n}\r\n\r\n.addEditEvent .customDialog .repeatOptionIE .arrow\r\n{\r\n\ttop: 11px;\r\n}\r\n\r\n.addEditEvent .customDialog .wsSelect .option \r\n{\r\n\tpadding-right: 30px;\t\r\n}\r\n\r\n\r\n.addEditEvent .customDialog input.everyInput\r\n{\r\n\twidth: 23px;\r\n}\r\n\r\n.addEditEvent .customDialog span.spanText\r\n{\r\n\tfont-size: 12px;\r\n}\r\n\r\n.addEditEvent .customDialog .dayIntervalSelect .pickDaySpan\r\n{\r\n\tcursor: pointer;\r\n\tdisplay: block;\r\n\twidth: 22px;\r\n\theight: 22px;\r\n\tbackground-color: #FFF;\r\n\tborder: 1px solid #85817c;\r\n\tfont-size: 13px;\r\n\ttext-align: center;\r\n}\r\n\r\n.addEditEvent .customDialog .dayIntervalSelect .pickDaySpanOnHover\r\n{\r\n\tbackground-color: #D2E5F5;\r\n}\r\n\r\n.addEditEvent .customDialog .endMenuRow\r\n{\r\n\tpadding-top: 3px;\r\n}\r\n\r\n.addEditEvent .customDialog .zeroMarginLeft\r\n{\r\n\tfloat: left;\r\n\tmargin-top: 0px;\r\n\tmargin-left: 0px;\r\n\tmargin-right: 8px;\r\n}\r\n\r\n.addEditEvent .customDialog .monthIntervalSelect\r\n{\r\n\tcolor: Black;\t\t/* Replace with more precise color. */\r\n\tfont-size: 11px;\r\n}\r\n\r\n\r\n\r\n",templateCssPath:_1.uri.dojoUri("../ws/calendar/AddEventDialog.css"),textValues:["summary","startDate","startTime","endDate","endTime"],daySpanValues:["day0","day1","day2","day3","day4","day5","day6"],fillInTemplate:function(){
this.dateFormat=Config.Strings.DateYear;
this.timeFormat=Config.Strings.CalTimeFormatRange1;
this.timeFormatShort=Config.Strings.CalTimeFormatRange2;
this.dateInputField=null;
this.model=null;
this.eventInfo=null;
this.selectedDays={};
this.customSelectUnit=null;
this.sortedDays=new Array();
this.editEvent=false;
this.showIndexCB=null;
this.targetDate=null;
},postCreate:function(_9d,_9e){
this.startDateInput.onclick=ws.lang.hitch(this,"showPicker",this.startDateInput);
this.endDateInput.onclick=ws.lang.hitch(this,"showPicker",this.endDateInput);
this.endRepeatDateInput.onclick=ws.lang.hitch(this,"showPicker",this.endRepeatDateInput);
this.startTimeInput.onclick=ws.lang.hitch(this,"showTimePicker",this.startTimeInput);
this.endTimeInput.onclick=ws.lang.hitch(this,"showTimePicker",this.endTimeInput);
this.setupPickDaySpans();
if(!Config.ShowReminderEvent){
_1.html.hide(this.remindRow);
_1.html.hide(this.remindSummaryRow);
}
if(_1.render.html.ie){
_1.html.addClass(this.repeatEveryMenu.domNode,"repeatOptionIE");
}
_1.event.connect(this.eventPopupPicker.datePicker,"selectDateConnect",this,"fillInDateField");
_1.event.connect(this.eventTimePopupPicker.timePicker,"selectTimeConnect",this,"fillInTimeField");
_1.event.connect(this.repeatMenu,"valueChanged",this,"handleRepeat");
_1.event.connect(this.repeatEveryMenu,"valueChanged",this,"handleCustomRepeat");
_1.event.connect(this.endDateMenu,"valueChanged",this,"handleEndDate");
_1.event.connect(this.customRemindMenu,"valueChanged",this,"handleCustomRemind");
},update:function(){
this.buildCalendarList();
},setupPickDaySpans:function(){
for(var i=0;i<this.daySpanValues.length;i++){
this[this.daySpanValues[i]+"Span"].innerHTML=((i+ws.date.firstDayOfWeek)<ws.date.abbrevDays.length)?ws.date.abbrevDays[i+ws.date.firstDayOfWeek]:ws.date.abbrevDays[i+ws.date.firstDayOfWeek-ws.date.abbrevDays.length];
this[this.daySpanValues[i]+"Span"].value=i;
this[this.daySpanValues[i]+"Span"].onmouseover=ws.lang.hitch(this,"onMouseOverSpan",this[this.daySpanValues[i]+"Span"]);
this[this.daySpanValues[i]+"Span"].onmouseout=ws.lang.hitch(this,"onMouseOutSpan",this[this.daySpanValues[i]+"Span"]);
this[this.daySpanValues[i]+"Span"].onclick=ws.lang.hitch(this,"onClickSpan",this[this.daySpanValues[i]+"Span"]);
}
},handleRepeat:function(){
switch(this.repeatMenu.currentValue){
case "doesNotRepeat":
this.repeatEverySummarySpan.innerHTML="";
_1.html.hide(this.repeatCustomSummary);
this.customSelectUnit=null;
this.eventInfo.recurType="0";
this.hideRepeat();
break;
case "everyDay":
this.repeatEverySummarySpan.innerHTML="";
_1.html.hide(this.repeatCustomSummary);
this.customSelectUnit=null;
this.eventInfo.recurType="1";
this.eventInfo.frequency=1;
this.hideRepeat();
break;
case "everyWeek":
this.repeatEverySummarySpan.innerHTML="";
_1.html.hide(this.repeatCustomSummary);
this.customSelectUnit=null;
this.eventInfo.recurType="2";
this.eventInfo.frequency=1;
this.hideRepeat();
break;
case "everyMonth":
this.repeatEverySummarySpan.innerHTML="";
_1.html.hide(this.repeatCustomSummary);
this.customSelectUnit=null;
this.eventInfo.recurType="5";
this.eventInfo.frequency=1;
this.hideRepeat();
break;
case "everyYear":
this.repeatEverySummarySpan.innerHTML="";
_1.html.hide(this.repeatCustomSummary);
this.customSelectUnit=null;
this.eventInfo.recurType="6";
this.eventInfo.frequency=1;
this.hideRepeat();
break;
case "customRepeat":
_1.debug("Custom repeat...");
_1.html.show(this.dayIntervalSelect);
_1.html.hide(this.monthIntervalSelect);
this.repeatEveryInput.value="1";
this.customSelectUnit="repeatEveryWeek";
_1.html.show(this.onTextSpan);
this.repeatEveryMenu.setOption(1);
_1.html.hide(this.endRepeatDateInput);
this.endDateMenu.setOption(0);
this.customMonthDateButton.checked=true;
this.eventInfo.recurType="2";
_1.html.show(this.repeatDialog);
break;
default:
break;
}
},toggleCustomReminder:function(){
if(_1.html.isShowing(this.remindDialog)){
this.remindSummarySpan.innerHTML="";
_1.html.hide(this.remindSummaryRow);
this.eventInfo.reminderEnabled=false;
if("reminderLeadTime" in this.eventInfo){
delete this.eventInfo.reminderLeadTime;
}
this.hideRemind();
}else{
this.remindInput.value="1";
this.customRemindMenu.setOption(0);
_1.html.show(this.remindDialog);
}
},handleCustomRepeat:function(){
if(_1.html.isShowing(this.repeatCustomSummary)){
this.repeatEverySummarySpan.innerHTML="";
_1.html.hide(this.repeatCustomSummary);
}
switch(this.repeatEveryMenu.currentValue){
case "repeatEveryDay":
_1.html.hide(this.dayIntervalSelect);
_1.html.hide(this.monthIntervalSelect);
_1.html.hide(this.onTextSpan);
this.eventInfo.recurType="1";
break;
case "repeatEveryWeek":
_1.html.show(this.dayIntervalSelect);
_1.html.hide(this.monthIntervalSelect);
_1.html.show(this.onTextSpan);
this.eventInfo.recurType="2";
break;
case "repeatEveryMonth":
var _a0=[Config.Strings.Sunday,Config.Strings.Monday,Config.Strings.Tuesday,Config.Strings.Wednesday,Config.Strings.Thursday,Config.Strings.Friday,Config.Strings.Saturday];
var _a1=Config.Strings.CalDateParseFormat;
var _a2=ws.date.ParseDateFromFormat(this.startDateInput.value,_a1);
this.customMonthDate.innerHTML=Config.Strings.CalendarOn+" "+ws.string.substituteParams(Config.Strings.OnTheMonthDay,_a2.getDate());
if(_a2.getDate()<8){
this.customMonthDay.innerHTML=Config.Strings.onTheFirst+" "+_a0[_a2.getDay()];
}else{
if((_a2.getDate()>7)&&(_a2.getDate()<15)){
this.customMonthDay.innerHTML=Config.Strings.onTheSecond+" "+_a0[_a2.getDay()];
}else{
if((_a2.getDate()>14)&&(_a2.getDate()<22)){
this.customMonthDay.innerHTML=Config.Strings.onTheThird+" "+_a0[_a2.getDay()];
}else{
if((_a2.getDate()>21)&&(_a2.getDate()<29)){
this.customMonthDay.innerHTML=Config.Strings.onTheFourth+" "+_a0[_a2.getDay()];
}else{
this.customMonthDay.innerHTML=Config.Strings.onTheFifth+" "+_a0[_a2.getDay()];
}
}
}
}
_1.html.hide(this.dayIntervalSelect);
_1.html.show(this.monthIntervalSelect);
_1.html.hide(this.onTextSpan);
this.eventInfo.recurType="5";
break;
case "repeatEveryYear":
_1.html.hide(this.dayIntervalSelect);
_1.html.hide(this.monthIntervalSelect);
_1.html.hide(this.onTextSpan);
this.eventInfo.recurType="6";
break;
default:
break;
}
this.customSelectUnit=this.repeatEveryMenu.currentValue;
},handleCustomRemind:function(){
switch(this.customRemindMenu.currentValue){
case "repeatEveryDay":
_1.debug("day");
break;
case "repeatEveryWeek":
_1.debug("week");
break;
case "repeatEveryMonth":
_1.debug("month");
break;
case "repeatEveryYear":
_1.debug("year");
default:
break;
}
},handleEndDate:function(){
switch(this.endDateMenu.currentValue){
case "noEndDate":
_1.html.hide(this.endRepeatDateInput);
break;
case "repeatUntil":
this.endRepeatDateInput.value="";
_1.html.show(this.endRepeatDateInput);
break;
default:
break;
}
},onMouseOverSpan:function(_a3){
_1.html.addClass(_a3,"pickDaySpanOnHover");
},onMouseOutSpan:function(_a4){
if(!this.selectedDays[_a4.value]){
_1.html.removeClass(_a4,"pickDaySpanOnHover");
}
},onClickSpan:function(_a5){
if(_a5.value in this.selectedDays){
delete this.selectedDays[_a5.value];
_1.html.removeClass(_a5,"pickDaySpanOnHover");
}else{
this.selectedDays[_a5.value]=true;
_1.html.addClass(_a5,"pickDaySpanOnHover");
}
},addNotes:function(){
_1.html.setClass(this.addNotesInput,"addNotesInputShowNew");
this.addNotesInput.value=Config.Strings.AddNoteHere;
_1.html.show(this.addNotesInput);
_1.html.hide(this.addNotesLink);
},notesTextType:function(){
if(_1.html.hasClass(this.addNotesInput,"addNotesInputShow")){
return;
}
this.addNotesInput.value="";
_1.html.setClass(this.addNotesInput,"addNotesInputShow");
},setModel:function(_a6){
if(this.model){
_1.event.disconnect(this.model,"modelUpdated",this,"update");
}
this.model=_a6;
_1.event.connect(this.model,"modelUpdated",this,"update");
},saveAndClose:function(){
_1.debug("saveAndClose");
var _a7=this.checkAndGetInfo();
if(null===_a7){
this.eventInfo.index=true;
_1.debugShallow(this.eventInfo);
if(this.isSelectedEventRecurring()){
ws.calendar.ConfirmRecurDialog.display(true,ws.lang.hitch(this,function(ok,_a9){
if(ok){
this.saveComponentCallback(_a9);
}else{
this.cancelSave();
}
}));
}else{
this.saveComponentCallback();
}
}else{
this.addDialogWidget.hide();
ws.widget.OkCancelDialog.alert(_a7,ws.lang.hitch(this,function(){
this.addDialogWidget.show();
}));
}
},isSelectedEventRecurring:function(){
var ret=false;
var _ab=this.eventInfo;
if(_ab&&_ab.rid){
ret=(_ab.rid.length>0);
}
return ret;
},cancelSave:function(){
},saveComponentCallback:function(_ac){
if(!_ac){
_ac="CHANGE_CURRENT";
}
this.eventInfo.recurChangeMode=_ac;
this.eventInfo.loadCallback=_1.lang.hitch(this,function(){
if(this.eventInfo.id){
_1.event.topic.publish("WSFeedbackStart",Config.Strings.EventUpdated,true);
}else{
_1.event.topic.publish("WSFeedbackStart",Config.Strings.EventCreated,true);
}
this.setDate(this.targetDate);
});
var _ad=false;
if(this.showIndexCB){
_ad=this.showIndexCB;
}
this.model.saveComponent(this.eventInfo,_ad);
this.hide();
},setDate:function(_ae){
},checkAndGetInfo:function(){
var _af=null;
var _b0=null;
var _b1=null;
var _b2=null;
var _b3=null;
var hr=null;
var min=null;
if(this.summaryInput.value==""){
return Config.Strings.AddTitleToEvent;
}
var _b6=Config.Strings.CalDateParseFormat;
_b0=ws.date.ParseDateFromFormat(this.startDateInput.value,_b6);
_b1=ws.date.ParseDateFromFormat(this.endDateInput.value,_b6);
if(_b0==null){
return Config.Strings.InvalidDateOnCreate;
}
if(_b1==null){
return Config.Strings.InvalidDateOnCreate;
}
if(!this.allDayBox.checked){
var _b7=ws.date.ParseHourMinTextField(this.startTimeInput.value,this.timeFormat,this.timeFormatShort);
if(_b7==null){
_af=Config.Strings.Calendar_AddEvent_InvalidStart;
return _af;
}
_b0.setHours(_b7.hr,_b7.min);
_1.debug(_b0);
var _b7=ws.date.ParseHourMinTextField(this.endTimeInput.value,this.timeFormat,this.timeFormatShort);
if(_b7==null){
_af=Config.Strings.Calendar_AddEvent_InvalidEnd;
return _af;
}
_b1.setHours(_b7.hr,_b7.min);
_1.debug(_b1);
}
if(_b0>_b1){
_af=Config.Strings.Calendar_AddEvent_InvalidStartAfterEnd;
return _af;
}
if(_b1.getTime()>=_b0.getTime()+86400000){
_af=Config.Strings.Calendar_AddEvent_EndDateMustBeWithin24Hours;
return _af;
}
if(this.eventInfo.recurType){
if(this.repeatMenu.currentValue=="customRepeat"){
if(this.repeatEveryInput.value!=""&&Number(this.repeatEveryInput.value).toString()!="NaN"){
this.eventInfo.frequency=(Number(this.repeatEveryInput.value));
this.eventInfo.frequency=Math.floor(this.eventInfo.frequency);
if(this.eventInfo.frequency<1){
this.eventInfo.frequency=1;
}
}else{
_af=Config.Strings.Calendar_AddEvent_InvalidNumberCustomRepeat;
return _af;
}
}
if(this.customSelectUnit=="repeatEveryWeek"){
this.sortSelectedDays();
if(this.sortedDays.length){
this.eventInfo.occursOn=this.getOccursOnDay(this.sortedDays,true);
}else{
}
}else{
if(this.customSelectUnit=="repeatEveryMonth"){
if(this.customMonthDayButton.checked){
if(_b0.getDate()<8){
this.eventInfo.occursOn=_b0.getDay();
}else{
if((_b0.getDate()>7)&&(_b0.getDate()<15)){
this.eventInfo.occursOn=_b0.getDay()+7;
}else{
if((_b0.getDate()>14)&&(_b0.getDate()<22)){
this.eventInfo.occursOn=_b0.getDay()+14;
}else{
if((_b0.getDate()>21)&&(_b0.getDate()<29)){
this.eventInfo.occursOn=_b0.getDay()+21;
}else{
this.eventInfo.occursOn=_b0.getDay()+28;
}
}
}
}
}else{
if(this.customMonthDateButton.checked){
this.eventInfo.occursOn=_b0.getDate();
}else{
_af=Config.Strings.Calendar.AddEvent.InvalidCustomMonth;
return _af;
}
}
}else{
if(this.eventInfo.recurType=="2"){
var _b8=new Array();
var _b9=_b0.getDay();
_b8.push(_b9);
this.eventInfo.occursOn=this.getOccursOnDay(_b8,false);
}else{
if(this.eventInfo.recurType=="5"){
this.eventInfo.occursOn=_b0.getDate();
}else{
this.eventInfo.occursOn=0;
}
}
}
}
if(this.endDateMenu.currentValue=="repeatUntil"){
var _ba=null;
var _b6=Config.Strings.CalDateParseFormat;
_ba=this.endRepeatDateInput.value;
var _bb=ws.date.ParseDateFromFormat(_ba,_b6);
if(null!=_bb){
if(_b0>_bb){
_af=Config.Strings.Calendar_AddEvent_InvalidStartAfterEnd;
return _af;
}
this.eventInfo.recurEnd=ws.date.formatISO8601(_bb);
}else{
_af=ws.string.substituteParams(Config.Strings.ErrorDateNotValidFormat,Config.Strings.EventRepeatEndDate,Config.Strings.CalDateFormat);
return _af;
}
}else{
if(this.eventInfo.recurEnd){
delete this.eventInfo.recurEnd;
}
}
}
if(_1.html.isShowing(this.remindDialog)){
this.eventInfo.reminderEnabled=true;
this.eventInfo.reminderLeadTime=this.calculateLeadTimeInMinutes(this.customRemindMenu.currentValue,Math.round(new Number(this.remindInput.value)));
var _bc=this.eventInfo.reminderLeadTime*60;
var _bd=(_b0.getTime()/1000);
var _be=_bd-_bc;
if(_be>0){
var _bf=new Date(_be*1000);
var now=this.model.currentServerTime;
if(_bf.getTime()<now.getTime()){
_af=Config.Strings.InvalidReminderDateInPastOnCreate;
return _af;
}
}
}
this.targetDate=_b0;
if(!(_1.string.isBlank(this.addNotesInput.value)||_1.html.hasClass(this.addNotesInput,"addNotesInputShowNew"))){
this.eventInfo.description=this.addNotesInput.value;
}else{
delete this.eventInfo.description;
}
this.eventInfo.summary=this.summaryInput.value;
this.eventInfo.start=ws.date.formatISO8601(_b0);
this.eventInfo.end=ws.date.formatISO8601(_b1);
this.eventInfo.allDay=this.allDayBox.checked;
if(typeof (this.calendarMenu.currentValue)=="string"){
this.eventInfo.calid=this.calendarMenu.currentValue;
}
_af=null;
return _af;
},getOccursOnDay:function(_c1,_c2){
var _c3=0;
var i=null;
var _c5=0;
for(i=0;i<_c1.length;i++){
if(_c2){
_c5=((_c1[i]+ws.date.firstDayOfWeek)<7)?(_c1[i]+ws.date.firstDayOfWeek):(_c1[i]+ws.date.firstDayOfWeek-7);
}else{
_c5=_c1[i];
}
switch(_c5){
case (0):
_c3+=1;
break;
case (1):
_c3+=2;
break;
case (2):
_c3+=4;
break;
case (3):
_c3+=8;
break;
case (4):
_c3+=16;
break;
case (5):
_c3+=32;
break;
case (6):
_c3+=64;
break;
default:
break;
}
}
return _c3;
},decodeSelectedDays:function(){
var _c6=this.eventInfo.occursOn;
var _c7=[Config.Strings.Sunday,Config.Strings.Monday,Config.Strings.Tuesday,Config.Strings.Wednesday,Config.Strings.Thursday,Config.Strings.Friday,Config.Strings.Saturday];
var _c8=new Array();
var _c9=new Array();
var _ca=1;
for(var j=0;j<7;j++){
var i=j+ws.date.firstDayOfWeek;
if(i>=7){
i-=7;
}
_ca=Math.pow(2,i);
if(_c6&_ca){
_c8.push(_c7[i]);
var _cd=((i-ws.date.firstDayOfWeek)<0)?(i-ws.date.firstDayOfWeek+7):(i-ws.date.firstDayOfWeek);
_c9.push(_cd);
}
}
return {days:_c8,daysValues:_c9};
},getCustomMonthly:function(_ce){
var _cf=null;
var _d0=[Config.Strings.Sunday,Config.Strings.Monday,Config.Strings.Tuesday,Config.Strings.Wednesday,Config.Strings.Thursday,Config.Strings.Friday,Config.Strings.Saturday];
if(_ce){
this.customMonthDayButton.checked=true;
var _d1=Math.floor((this.eventInfo.occursOn/7));
var day=this.eventInfo.occursOn%7;
if(_d1==0){
_cf=Config.Strings.onTheFirst+" "+_d0[day];
}else{
if(_d1==1){
_cf=Config.Strings.onTheSecond+" "+_d0[day];
}else{
if(_d1==2){
_cf=Config.Strings.onTheThird+" "+_d0[day];
}else{
if(_d1==3){
_cf=Config.Strings.onTheFourth+" "+_d0[day];
}else{
_cf=Config.Strings.onTheFifth+" "+_d0[day];
}
}
}
}
}else{
this.customMonthDateButton.checked=true;
_cf=Config.Strings.CalendarOn+" "+ws.string.substituteParams(Config.Strings.OnTheMonthDay,this.eventInfo.occursOn);
}
return _cf;
},buildCalendarList:function(_d3){
if(this.model==null){
return;
}
var _d4=[];
var _d5=this.model.getCalendarList();
var _d6=this.model.calendarEnum;
var _d7=(_d3&&_d3.calid)?_d3.calid:null;
var _d8=_d7!=null;
if(!_d5||!_d6){
this.calendarMenu.setOptions([{display:"",calid:""}]);
return;
}
for(var i=0;i<_d5.length;i++){
var _da=_d5[i];
var _db=_da[_d6.id];
var _dc=_da[_d6.displayName];
if(_da[_d6.writable]){
_d4.push({display:_dc,value:_db,selected:(_d8&&(_db==_d7))});
}
}
this.calendarMenu.setOptions(_d4);
},clearForm:function(){
for(var i=0;i<this.textValues.length;i++){
this[this.textValues[i]+"Input"].value="";
}
this.allDayBox.checked=true;
_1.html.hide(this.startTimeInput);
_1.html.hide(this.endTimeInput);
},defaultPopulateForm:function(){
var _de=new Date();
var _df=null;
var _e0=null;
this.editEvent=false;
this.startDateInput.value=ws.date.formatDateTime(_de,this.dateFormat);
_de=ws.calendar.calutil.GetNext30MinuteIncrement(_de);
_df=ws.date.formatDateTime(_de,this.timeFormat);
this.startTimeInput.value=_df;
_de=ws.date.add(_de,ws.date.dateParts.MINUTE,30);
_e0=ws.date.formatDateTime(_de,this.timeFormat);
this.endTimeInput.value=_e0;
this.endDateInput.value=ws.date.formatDateTime(_de,this.dateFormat);
this.allDayBox.checked=true;
_1.html.setClass(this.checkBoxSpan,"checkBoxChecked");
_1.html.hide(this.startTimeInput);
_1.html.hide(this.endTimeInput);
this.repeatMenu.setOption(0);
this.customReminderCheckBox.checked=false;
this.calendarMenu.setOption(0);
this.repeatEveryMenu.setOption(1);
this.customRemindMenu.setOption(0);
this.endDateMenu.setOption(0);
this.addNotesInput.value="";
_1.html.hide(this.addNotesInput);
_1.html.show(this.addNotesLink);
},populateForm:function(_e1){
var _e2=null;
var _e3=null;
_1.debugShallow(this.eventInfo);
this.editEvent=true;
_1.html.replaceClass(this.summaryInput,"summaryInput","summaryInputNew");
if(this.eventInfo.calid){
this.calendarMenu.currentValue=this.eventInfo.calid;
}
var _e4=this.eventInfo.summary;
if(_e1!=null&&_e1==4&&_e4==Config.Strings.AddEventName){
_1.html.replaceClass(this.summaryInput,"summaryInputNew","summaryInput");
}else{
_e4=ws.calendar.calutil.DecodeHTMLEntities(_e4);
}
this.summaryInput.value=_e4;
this.startDateInput.value=ws.date.formatDateTime(this.eventInfo.start,this.dateFormat);
_e2=ws.date.formatDateTime(this.eventInfo.start,this.timeFormat);
this.startTimeInput.value=_e2;
_e3=ws.date.formatDateTime(this.eventInfo.end,this.timeFormat);
this.endTimeInput.value=_e3;
this.endDateInput.value=ws.date.formatDateTime(this.eventInfo.end,this.dateFormat);
this.allDayBox.checked=this.eventInfo.allDay;
if(this.allDayBox.checked){
_1.html.setClass(this.checkBoxSpan,"checkBoxChecked");
}else{
_1.html.setClass(this.checkBoxSpan,"checkBoxNotChecked");
}
this.checkBoxChange();
if(this.eventInfo.rid){
var _e5=null;
var _e6=null;
if(this.eventInfo.frequency){
if(this.eventInfo.frequency==1){
_e6=true;
}else{
_e6=false;
}
}else{
_1.debug("Could not read event frequency.");
return;
}
switch(this.eventInfo.recurType){
case "1":
if(_e6){
this.repeatEverySummarySpan.innerHTML="";
_1.html.hide(this.repeatCustomSummary);
this.repeatMenu.setOption(1);
}else{
this.repeatMenu.setOption(5);
_1.html.show(this.repeatDialog);
this.repeatEveryInput.value=this.eventInfo.frequency;
this.repeatEveryMenu.setOption(0);
this.handleCustomRepeat();
_e5=Config.Strings.Every+" "+this.eventInfo.frequency+" "+Config.Strings.Days;
}
break;
case "2":
var _e7=this.decodeSelectedDays();
if(_e7.days.length){
if(_e6){
_e5=Config.Strings.EveryWeekOn+" ";
}else{
_e5=Config.Strings.Every+" "+this.eventInfo.frequency+" "+Config.Strings.WeeksOn;
}
if(_e7.days.length>1){
for(var i=0;i<(_e7.days.length-1);i++){
if(i<_e7.days.length-2){
_e5+=_e7.days[i]+", ";
}else{
_e5+=_e7.days[i];
}
}
_e5+=" "+Config.Strings.And+" "+_e7.days[i];
}else{
_e5+=_e7.days[0];
}
this.repeatMenu.setOption(5);
_1.html.show(this.repeatDialog);
this.repeatEveryInput.value=this.eventInfo.frequency;
this.repeatEveryMenu.setOption(1);
this.handleCustomRepeat();
for(var i=0;i<_e7.daysValues.length;i++){
this.selectedDays[_e7.daysValues[i]]=true;
}
this.setupDaySpans();
}else{
this.repeatMenu.setOption(2);
}
break;
case "4":
this.repeatMenu.setOption(5);
_1.html.show(this.repeatDialog);
this.repeatEveryInput.value=this.eventInfo.frequency;
this.repeatEveryMenu.setOption(2);
this.handleCustomRepeat();
this.eventInfo.recurType="4";
_e5=this.getCustomMonthly(true)+" "+Config.Strings.OfEvery+" ";
if(_e6){
_e5+=Config.Strings.month;
}else{
_e5+=this.eventInfo.frequency+" "+Config.Strings.Months;
}
break;
case "5":
if(_e6){
this.repeatMenu.setOption(3);
}else{
this.repeatMenu.setOption(5);
_1.html.show(this.repeatDialog);
this.repeatEveryInput.value=this.eventInfo.frequency;
this.repeatEveryMenu.setOption(2);
this.handleCustomRepeat();
_e5=this.getCustomMonthly(false)+" "+Config.Strings.OfEvery+" ";
if(_e6){
_e5+=Config.Strings.month;
}else{
_e5+=this.eventInfo.frequency+" "+Config.Strings.Months;
}
}
break;
case "6":
this.repeatMenu.setOption(5);
_1.html.show(this.repeatDialog);
this.repeatEveryInput.value=this.eventInfo.frequency;
this.repeatEveryMenu.setOption(3);
this.handleCustomRepeat();
if(_e6){
_e5=Config.Strings.EveryYear;
}else{
_e5=Config.Strings.Every+" "+this.eventInfo.frequency+" "+Config.Strings.Years;
}
break;
default:
break;
}
if(this.eventInfo.recurEnd){
this.endRepeatDateInput.value=ws.date.formatDateTime(this.eventInfo.recurEnd,Config.Strings.CalDateFormat);
_1.html.show(this.endRepeatDateInput);
this.endDateMenu.setOption(1);
}else{
_1.html.hide(this.endRepeatDateInput);
this.endDateMenu.setOption(0);
}
if(_e5){
_1.html.show(this.repeatCustomSummary);
this.repeatEverySummarySpan.innerHTML=_e5;
}
}else{
this.repeatMenu.setOption(0);
}
if(this.eventInfo.reminderEnabled){
this.customReminderCheckBox.checked=true;
_1.html.show(this.remindDialog);
this.populateCustomReminder(this.eventInfo.reminderLeadTime);
}else{
this.customReminderCheckBox.checked=false;
}
if(this.eventInfo.description&&!_1.string.isBlank(this.eventInfo.description)){
var _e9=this.eventInfo.description;
_e9=ws.calendar.calutil.DecodeHTMLEntities(_e9);
_1.html.setClass(this.addNotesInput,"addNotesInputShow");
this.addNotesInput.value=_e9;
_1.html.show(this.addNotesInput);
_1.html.hide(this.addNotesLink);
}else{
this.addNotesInput.value="";
_1.html.hide(this.addNotesInput);
_1.html.show(this.addNotesLink);
}
},populateCustomReminder:function(_ea){
if((_ea%10080)==0){
this.remindInput.value=_ea/10080;
this.customRemindMenu.setOption(3);
}else{
if((_ea%1440)==0){
this.remindInput.value=_ea/1440;
this.customRemindMenu.setOption(2);
}else{
if((_ea%60)==0){
this.remindInput.value=_ea/60;
this.customRemindMenu.setOption(1);
}else{
this.remindInput.value=_ea;
this.customRemindMenu.setOption(0);
}
}
}
},show:function(_eb,_ec){
this.eventInfo=null;
if(_1.render.html.ie&&!_1.html.hasClass(this.repeatMenu.domNode,"selectMenuIE")){
_1.html.replaceClass(this.repeatMenu.domNode,"selectMenuIE","selectMenu");
_1.html.replaceClass(this.calendarMenu.domNode,"selectMenuIE","selectMenu");
}
this.buildCalendarList(_ec);
if(_eb==1||_eb==4){
if(!_ec){
_1.debug("No args for edit dialog!");
return;
}else{
this.eventInfo=_ec;
if(_ec.index!=null){
this.showIndexCB=_ec.index;
}
this.populateForm(_eb);
this.addDialogWidget.show();
}
}else{
if(_eb==2){
if(!_ec){
_1.debug("No args for edit dialog!");
return;
}else{
if(!this.model.isSuccess){
this.model.getData();
}
_1.debugShallow(_ec);
this.defaultPopulateForm();
this.eventInfo=this.model.getDefaultArgs();
if(!_1.string.isBlank(_ec.notes)){
_1.html.setClass(this.addNotesInput,"addNotesInputShow");
this.addNotesInput.value=_ec.notes;
_1.html.show(this.addNotesInput);
_1.html.hide(this.addNotesLink);
}
this.addDialogWidget.show();
if(!_1.string.isBlank(_ec.summary)){
_1.html.replaceClass(this.summaryInput,"summaryInput","summaryInputNew");
this.summaryInput.value=_ec.summary;
}else{
var _ed=_1.render.html.moz?50:0;
_1.lang.setTimeout(this,function(){
this.summaryInput.value=Config.Strings.AddEventName;
this.summaryInput.select();
_1.lang.setTimeout(this,function(){
this.summaryInput.focus();
},0);
},_ed);
}
}
}else{
this.eventInfo=this.model.getDefaultArgs();
this.defaultPopulateForm();
this.addDialogWidget.show();
var _ed=_1.render.html.moz?50:0;
_1.lang.setTimeout(this,function(){
this.summaryInput.value=Config.Strings.AddEventName;
this.summaryInput.select();
_1.lang.setTimeout(this,function(){
this.summaryInput.focus();
},0);
},_ed);
}
}
},hide:function(){
this.hideRepeat();
this.customSelectUnit=null;
this.sortedDays=[];
this.hideRemind();
this.repeatEverySummarySpan.innerHTML="";
_1.html.hide(this.repeatCustomSummary);
this.remindSummarySpan.innerHTML="";
_1.html.hide(this.remindSummaryRow);
_1.html.hide(this.addNotesInput);
_1.html.show(this.addNotesLink);
this.addDialogWidget.hide();
},checkBoxChange:function(){
if(this.allDayBox.checked){
_1.html.setClass(this.checkBoxSpan,"checkBoxChecked");
_1.html.hide(this.startTimeInput);
_1.html.hide(this.endTimeInput);
}else{
_1.html.setClass(this.checkBoxSpan,"checkBoxNotChecked");
_1.html.show(this.startTimeInput);
_1.html.show(this.endTimeInput);
}
},showPicker:function(_ee){
if(!this.eventPopupPicker.isShowingNow){
this.eventPopupPicker.open(_ee,this,_ee,{"BL":"TL"});
this.dateInputField=_ee;
}
},showTimePicker:function(_ef){
if(!this.eventTimePopupPicker.isShowingNow){
this.eventTimePopupPicker.open(_ef,this,_ef,{"BL":"TL"});
this.timeInputField=_ef;
var _f0=new Date();
var _f1=ws.date.ParseHourMinTextField(_ef.value,this.timeFormat,this.timeFormatShort);
if(_f1!=null){
_f0.setHours(_f1.hr,_f1.min);
this.eventTimePopupPicker.initializeTime(_f0);
}else{
this.eventTimePopupPicker.initializeTime();
}
}
},fillInDateField:function(_f2){
this.dateInputField.value=ws.date.formatDateTime(new Date(_f2),this.dateFormat);
if((this.dateInputField==this.startDateInput)&&(this.repeatEveryMenu.currentValue=="repeatEveryMonth")){
this.handleCustomRepeat();
}
},fillInTimeField:function(_f3){
this.timeInputField.value=_f3;
},monthButtonChange:function(){
if(this.customMonthDateButton.checked){
this.eventInfo.recurType="5";
}else{
this.eventInfo.recurType="4";
}
},setupDaySpans:function(){
for(var day in this.selectedDays){
switch(day){
case "0":
_1.html.addClass(this.day0Span,"pickDaySpanOnHover");
break;
case "1":
_1.html.addClass(this.day1Span,"pickDaySpanOnHover");
break;
case "2":
_1.html.addClass(this.day2Span,"pickDaySpanOnHover");
break;
case "3":
_1.html.addClass(this.day3Span,"pickDaySpanOnHover");
break;
case "4":
_1.html.addClass(this.day4Span,"pickDaySpanOnHover");
break;
case "5":
_1.html.addClass(this.day5Span,"pickDaySpanOnHover");
break;
case "6":
_1.html.addClass(this.day6Span,"pickDaySpanOnHover");
break;
default:
break;
}
}
},sortSelectedDays:function(){
for(var day in this.selectedDays){
this.sortedDays.push(day*1);
}
this.sortedDays.sort(function(a,b){
return a-b;
});
},hideRepeat:function(){
this.selectedDays={};
for(var i=0;i<this.daySpanValues.length;i++){
_1.html.removeClass(this[this.daySpanValues[i]+"Span"],"pickDaySpanOnHover");
}
_1.html.hide(this.repeatDialog);
},hideRemind:function(){
_1.html.hide(this.remindDialog);
},getLeadTimeInMinutes:function(_f9){
var _fa=0;
switch(_f9){
case "timeOfEvent":
_fa=0;
break;
case "min15Before":
_fa=15;
break;
case "min30Before":
_fa=30;
break;
case "hour1Before":
_fa=60;
break;
case "day1Before":
_fa=1440;
break;
default:
_fa=0;
break;
}
return _fa;
},calculateLeadTimeInMinutes:function(_fb,_fc){
var _fd=0;
switch(_fb){
case "remindMinutes":
_fd=_fc;
break;
case "remindHours":
_fd=_fc*this.getLeadTimeInMinutes("hour1Before");
break;
case "remindDays":
_fd=_fc*this.getLeadTimeInMinutes("day1Before");
break;
case "remindyWeeks":
_fd=_fc*this.getLeadTimeInMinutes("day1Before")*7;
break;
default:
_fd=0;
}
return _fd;
},summaryTextClick:function(){
if(_1.html.hasClass(this.summaryInput,"summaryInputNew")){
this.summaryInput.value="";
_1.html.replaceClass(this.summaryInput,"summaryInput","summaryInputNew");
}
},summaryTextBlur:function(){
_1.debug("summaryTextBlur()");
if(_1.string.isBlank(this.summaryInput.value)){
_1.html.addClass(this.summaryInput,"summaryInputNew");
this.summaryInput.value=Config.Strings.AddEventName;
}
if(_1.render.html.moz){
_1.html.replaceClass(this.contentPane,"inputData","inputData");
}
},onKeyPress:function(evt){
if(!this.isShowing()){
return;
}
if(Config.EnableKeyboardShortcuts&&evt.ctrlKey){
if(evt.key==evt.KEY_ENTER){
this.saveAndClose();
}
}else{
if(evt.key&&_1.lang.isString(evt.key)&&(evt.key.toLowerCase()==Config.Strings.KeyCancelAddContact)&&evt.altKey){
this.hide();
}
}
}});
_1.provide("ws.panels.TaskPanelEditDetailCard");
_1.require("dojo.html.display");
_1.require("dojo.html.iframe");
_1.require("dojo.io.*");
_1.require("dojo.widget.*");
_1.require("ws.calendar.CalendarViewModel");
_1.require("ws.calendar.calutil");
_1.require("ws.date");
_1.require("ws.widget.ListView");
_1.require("ws.widget.util");
_1.widget.defineWidget("ws.panels.TaskPanelEditDetailCard",_1.widget.HtmlWidget,{templateString:"<div class=\"taskPanelEditDetailCard\" style=\"display: none;\">\r\n\t<div>\r\n\t<img src=\"${spacer}\" class=\"closeButton\" dojoAttachEvent=\"onClick: hide\">\r\n\t</div>\r\n\t<div class=\"taskNameTd\">\r\n\t\t<input dojoAttachPoint=\"taskNameInput\" maxlength=\"100\" class=\"taskNameInput default\" dojoAttachEvent=\"onFocus: onFocus; onBlur: onBlur; onKeyPress: onKeyPressInput;\"/>\r\n\t</div>\r\n\t\r\n\t<div class=\"dueDateTd\">\r\n\t    <label>${DueDate}: </label><input dojoAttachPoint=\"dueDateInput\" class=\"dueDateInput\" dojoAttachEvent=\"onBlur: reminderOnBlur; onFocus: reminderOnFocus; onChange: onChange; onKeyPress: onKeyPressInput;\"/></td>\r\n\t</div>\t\r\n\t\r\n\t<div dojoAttachPoint=\"noteAndReminderRow\" class=\"linkTd\">\r\n\t    <span style=\"padding-top:4px; padding-left:-1px; font-family:Arial; float:left; font-size:11px;\">${Panel_TodoPanel_Add}${Panel_TodoPanel_Hyphen}&nbsp;</span>\r\n        <span dojoAttachPoint=\"addNoteLink1\" class=\"wsLink addNoteLink\" dojoAttachEvent=\"onClick: addNote\">${Panel_TodoPanel_Note}</span>\r\n\t\t<span dojoAttachPoint=\"addNoteComma\"  class=\"addNoteLink\" >${Panel_TodoPanel_Comma}&nbsp;</span>\r\n        <span dojoAttachPoint=\"addReminderLink1\" class=\"wsLink addNoteLink\" dojoAttachEvent=\"onClick: addReminder\">${Panel_TodoPanel_Reminder}</span>\t\t    \r\n    </div>\r\n   <div dojoAttachPoint=\"addNoteInputRow2\" class=\"addNoteInputTd\">    \r\n\t\t<textarea dojoAttachEvent=\"onClick:changeDefaultTextForNote\" dojoAttachPoint=\"addNoteInput2\" class=\"addNoteInputDefault\" wrap=\"virtual\"></textarea>\r\n\t</div>    \r\n    <div dojoAttachPoint=\"reminderCheckBoxRow\" class=\"reminderCheckBoxRowTd\">\r\n\t    <input type=\"checkbox\" dojoAttachPoint=\"reminderCheckBox\" dojoAttachEvent=\"onChange: reminderOnChange\" style=\"vertical-align:middle;\"/>\r\n\t    <label dojoAttachPoint=\"reminderLabel\"> ${RemindMeAt}</label>\r\n\t</div>\r\n\t<div dojoAttachPoint=\"reminderDetailsRow\" class=\"reminderDetailsRowTd\">\r\n\t    <!--<img src=\"${spacer}\" class=\"reminderIcon\">-->\r\n\t    <!--<input style=\"border: 1px #A5A5A5 solid; margin-left:4px; margin-top:-5px; font-size:11px; float:left; height:16px; width:50px;\" dojoAttachPoint=\"reminderTimeSelect\" />-->\r\n\t    <input class=\"reminderTimeSelectDefault\" dojoAttachPoint=\"reminderTimeSelect\" />\t\t\t\t\t\t\r\n\t    <ul dojoType=\"ws:WSSelect\" className=\"dueDateSelectDefault\" dojoAttachPoint=\"dueDateSelect\">\r\n\t\t\t        <li value=\"Default\">${OnDueDate}</li>\r\n\t\t\t\t\t<li value=\"OneDayBefore\">1 ${DayBefore}</li>\r\n\t\t\t\t\t<li value=\"TwoDaysBefore\">2 ${DaysBefore}</li>\r\n\t\t\t\t\t<li value=\"OneWeekBefore\">1 ${WeekBefore}</li>\r\n\t\t</ul>\r\n\t\t\t\r\n\t</div>\r\n    <div dojoAttachPoint=\"addNoteInputRow\"  class=\"addNoteInputTd\">    \r\n\t\t<textarea dojoAttachEvent=\"onClick:changeDefaultTextForNote\" dojoAttachPoint=\"addNoteInput\" class=\"addNoteInputDefault\"></textarea>\r\n\t</div>\r\n\t<div dojoAttachPoint=\"noteLinkRow\" class=\"linkTd\">\r\n\t    <span style=\"padding-top:4px; padding-left:-1px; font-family:Arial; float:left; font-size:11px;\">${Panel_TodoPanel_Add}${Panel_TodoPanel_Hyphen}</span>\r\n        <span dojoAttachPoint=\"addNoteLink2\" class=\"wsLink addNoteLink\" dojoAttachEvent=\"onClick: addNote\">${Panel_TodoPanel_Note}</span>        \r\n    </div>\r\n    <div dojoAttachPoint=\"reminderLinkRow\" class=\"linkTd\"\">\r\n\t    <span style=\"padding-top:4px; padding-left:-1px; font-family:Arial; float:left; font-size:11px;\">${Panel_TodoPanel_Add}${Panel_TodoPanel_Hyphen}</span>\r\n        <span dojoAttachPoint=\"addReminderLink2\" class=\"wsLink addNoteLink\" dojoAttachEvent=\"onClick: addReminder\">${Panel_TodoPanel_Reminder}</span>\t\t    \r\n    </div>\r\n\t<div dojoAttachPoint=\"updateButton\" dojoType=\"ws:WSButton\" vizType=\"Blue\" className=\"updateButton\" dojoAttachEvent=\"onClick: updateTask\">${UpdateItem}\r\n\t</div>\r\n    \r\n\t<div dojoType=\"ws:PopupDatePicker\" dojoAttachPoint=\"dueDatePopupPicker\" toggle=\"wipe\" hidePickerOnSetDate=\"true\" toggleDuration=\"150\" closeOnMouseOut=\"true\" width=\"150\"></div>\r\n\t<div dojoType=\"ws:PopupTimePicker\" dojoAttachPoint=\"eventTimePopupPicker\" toggle=\"wipe\" toggleDuration=\"150\" closeOnMouseOut=\"true\"></div>\r\n  \t<span style=\"clear: both;\"></span>\r\n</div>\r\n",templateCssString:".taskPanel\r\n{\r\n\t\r\n}\r\n\r\n.taskPanel input\r\n{\r\n\tmargin: 5px;\r\n\tpadding-left: 6px;\r\n\tfloat:left;\r\n\twidth: 70%;\r\n\tborder: 1px solid #85817c;\r\n}\r\n\r\n.taskPanel input.default \r\n{\r\n\tcolor: #A5A5A5;\r\n}\r\n\r\n.taskPanel .moreDetailLink\r\n{\r\n\tmargin: 2px 6px 0px 3px;\r\n\tfloat: right;\r\n\tfont: normal 11px Arial;\r\n\tpadding: 0px 0px 10px 11px;\r\n}\r\n\r\n.taskPanel .completedTask .turbogrid-cell\r\n{\r\n\tcolor: #D8D6D3;\r\n\t\r\n}\r\n\r\n.taskPanel .default .turbogrid-cell\r\n{\r\n\tfont-family: Arial;\r\n\tfont-size: 12px;\r\n}\r\n\r\n.taskPanel .deleteTaskIcon\r\n{\r\n\twidth: 12px;\r\n\theight: 12px;\r\n\tbackground: url(\"${images}main.gif\") -1395px -1px;\r\n\t\r\n}\r\n\r\n.taskPanel .deleteTaskIcon:hover\r\n{\r\n\tbackground-position: -1410px -1px;\r\n}\r\n\r\n.taskPanel .reminderIcon\r\n{\r\n\r\n\twidth: 14px;\r\n\theight: 12px;\r\n\tbackground: url(\"${images}main.gif\") -1284px -53px;\r\n\tmargin-bottom:-2px;\r\n\t\r\n}\r\n\r\n.taskPanel .addTaskImageDefault\r\n{\r\n\tleft: 125px;\r\n\r\n\t\r\n\tbackground-repeat: no-repeat;\r\n\tcursor: pointer;\r\n\t\r\n\twidth: 16px;\r\n\theight: 16px;\r\n\tbackground: url(\"${images}main.gif\") -1236px -1px;\r\n\tmargin: 7px 0px 0px 2px;\r\n}\r\n\r\n.taskPanel .addTaskImageEnabled\r\n{\r\n\tleft: 125px;\r\n\r\n\t\r\n\tbackground-repeat: no-repeat;\r\n\tcursor: pointer;\r\n\t\r\n\twidth: 16px;\r\n\theight: 16px;\r\n\tbackground: url(\"${images}main.gif\") -1190px -1px;\r\n\tmargin: 7px 0px 0px 2px;\r\n\r\n}\r\n\r\n.taskPanel .addTaskImageEnabled:hover\r\n{\r\n\tbackground-position: -1213px -1px;\r\n}\r\n\r\n\r\n.taskPanel .turbogrid-scrollbox \r\n{\r\n\tborder: none;\r\n}\r\n\r\n\r\n/*\r\n * TaskPanelMoreDetailCard\r\n */\r\n.taskPanelMoreDetailCard\r\n{\r\n\twidth: 245px;\r\n\theight:auto;\r\n\tbackground-color: #FFFFFF;\r\n\tborder: 1px solid #8A8A8A;\r\n\tz-index: 800;\r\n\tposition: absolute;\r\n\tpadding: 3px 3px 0px 3px;\r\n\toverflow: auto;\t/* Fixes the Firefox no-blinking-cursor bug */\r\n}\r\n \r\n.taskPanelMoreDetailCard. label\r\n{\r\n\tvertical-align: middle;\r\n\tcolor: #A5A5A5;\r\n }\r\n\r\n.taskPanelMoreDetailCard .reminderTimeSelect\r\n{\r\n\tmargin-top:-5px;\r\n\tfloat:left;\r\n }\r\n\r\n.taskPanelMoreDetailCard .dueDateSelect\r\n{\r\n\tmargin-top:-5px;\r\n\t_margin-top:1px;\r\n\tfloat:left; \t\r\n}\r\n\r\n.taskPanelMoreDetailCard input.reminderTimeSelectDefault\r\n{\r\n\tborder: 1px #A5A5A5 solid; \r\n\tmargin-left:4px; \r\n\tmargin-top:-5px;\r\n\tfont-size:11px; \r\n\tfloat:left; \r\n\theight:16px; \r\n\twidth:50px; \r\n\t_margin-left:0px;\r\n\t_padding-top:0px; \r\n\t_padding-left:-5px; \r\n\t_margin-top:1px; \r\n\t\t\r\n}\r\n.taskPanelMoreDetailCard .dueDateSelectDefault\r\n{\r\n\tmargin-top:-5px;\r\n\tcolor: #A5A5A5;\r\n\tfloat:left;\r\n\t_margin-top:1px;\r\n\t\r\n}\r\n.taskPanelMoreDetailCard .closeButton \r\n{\r\n\t_zoom:1;\r\n\twidth: 12px;\r\n\theight: 12px;\r\n\tcursor: pointer;\r\n\tfloat: right;\r\n\tbackground: url(\"${images}main.gif\") -1425px -1px;\r\n}\r\n\r\n.taskPanelMoreDetailCard .closeButton:hover \r\n{\r\n\tbackground-position: -1440px -1px;\r\n}\r\n\r\n.taskPanelMoreDetailCard .default \r\n{\r\n\tcolor: #A5A5A5;\r\n}\r\n\r\n.taskPanelMoreDetailCard input.default \r\n{\r\n\tcolor: #A5A5A5;\r\n\tpadding-left: 6px;\r\n}\r\n\r\n.taskPanelMoreDetailCard label.default \r\n{\r\n\tcolor: #A5A5A5;\r\n}\r\n\r\n.taskPanelMoreDetailCard .taskNameInput \r\n{\r\n\theight:auto;\t\r\n\twidth: 90%;\r\n\tborder: 1px solid #8A8A8A;\r\n\tpadding-left: 6px;\t\r\n}\r\n\r\n.taskPanelMoreDetailCard .dueDateInputDefault \r\n{\r\n\theight:auto;\t\t\r\n\twidth:40%;\r\n\tborder: 1px solid #8A8A8A;\r\n\tpadding-left: 6px;\r\n\tcolor:#A5A5A5;\r\n\t\r\n}\r\n\r\n.taskPanelMoreDetailCard .dueDateInput \r\n{\r\n\theight:auto;\t\t\r\n\twidth:40%;\r\n\tborder: 1px solid #8A8A8A;\r\n\tpadding-left: 6px;\r\n\r\n\t\r\n}\r\n\r\n.taskPanelMoreDetailCard .taskNameTd \r\n{\r\n\tpadding-left:16px;\r\n\tpadding-top:10px;\r\n}\r\n\r\n.taskPanelMoreDetailCard .dueDateTd\r\n{\r\n\tpadding-left:5px; \r\n\twidth:89%; \r\n\tmargin:20px 0px 12px 12px;\r\n\t\r\n}\r\n\r\n.taskPanelMoreDetailCard .linkTd\r\n{\r\n\tfloat:left; \r\n\tpadding-left:5px;\r\n\twidth:89%; \r\n\tmargin:14px 0px 12px 12px;\r\n\t\r\n}\r\n.taskPanelMoreDetailCard .addNoteInputTd\r\n{\r\n\tfloat:left; \r\n\tpadding-left: 10px; \r\n\tpadding-right: 10px;\r\n}\r\n\r\n.taskPanelMoreDetailCard .reminderCheckBoxRowTd\r\n{\r\n\twidth:89%; \r\n\tmargin:14px 0px 12px 12px;\r\n}\r\n.taskPanelMoreDetailCard .reminderDetailsRowTd\r\n{\r\n\twidth:89%; \r\n\tmargin:14px 0px 12px 12px;\r\n}\r\n\r\n.taskPanelMoreDetailCard .wsLink\r\n{\r\n\tfont-size: 11px;\t\r\n}\r\n\r\n.taskPanelMoreDetailCard .addNoteLink \r\n{\t\r\n\tfloat: left;\r\n\tfont-size: 11px;\r\n\tpadding-top: 4px;\r\n}\r\n\r\n.taskPanelMoreDetailCard .addNoteInput\r\n{\r\n\tborder: 1px solid #8A8A8A;\r\n\twidth: 200px;\r\n\theight: 60px;\r\n\tmargin-left:5px;\r\n\tpadding-left: 2px;\r\n}\r\n\r\n.taskPanelMoreDetailCard .addNoteInputDefault\r\n{\r\n\tborder: 1px solid #8A8A8A;\r\n\twidth: 200px;\r\n\theight: 60px;\r\n\tmargin-left:5px;\r\n\tcolor:#A5A5A5;\r\n\tpadding-left: 2px;\r\n}\r\n\r\n.taskPanelMoreDetailCard .addButton \r\n{\r\n\tmargin-top: -2px;\r\n\tfloat:right;\r\n\tpadding-top:10px;\r\n\tpadding-bottom:10px\r\n}\r\n.taskPanelMoreDetailCard .linkStr \r\n{\r\n\tpadding-top:4px; \r\n\tpadding-left:-1px; \r\n\tfont-family:Arial; \r\n\tfloat:left; \r\n\tfont-size:11px;\r\n}\r\n\r\n/*\r\n * TaskPanelEditDetailCard\r\n */\r\n\r\n.taskPanelEditDetailCard\r\n{\r\n\twidth: 245px;\r\n\theight:auto;\r\n\tbackground-color: #FFFFFF;\r\n\tborder: 1px solid #8A8A8A;\r\n\tz-index: 800;\r\n\tposition: absolute;\r\n\tpadding: 3px 3px 0px 3px;\r\n\toverflow: auto;\t/* Fixes the Firefox no-blinking-cursor bug */\r\n}\r\n\r\n.taskPanelEditDetailCard. label\r\n{\r\nvertical-align: middle;\r\ncolor: #A5A5A5;\r\n}\r\n\r\n.taskPanelEditDetailCard input.reminderTimeSelect\r\n{\r\n\tmargin-top:-5px;\r\n\tfloat:left;\t\r\n\twidth:50px;\r\n}\r\n\r\n.taskPanelEditDetailCard .dueDateSelect\r\n{\r\n\tmargin-top:-5px;\r\n\t_margin-top:1px;\r\n\tfloat:left;\t\r\n}\r\n\r\n.taskPanelEditDetailCard input.reminderTimeSelectDefault\r\n{\r\n\tborder: 1px #A5A5A5 solid; \r\n\tmargin-left:4px; \r\n\tmargin-top:-5px;\r\n\tfont-size:11px; \r\n\tfloat:left; \r\n\theight:16px; \r\n\twidth:50px; \r\n\t_margin-left:0px;\r\n\t_padding-top:0px; \r\n\t_padding-left:-5px; \r\n\t_margin-top:1px; \r\n\t\t\r\n}\r\n\r\n.taskPanelEditDetailCard .dueDateSelectDefault\r\n{\r\n\tmargin-top:-5px;\r\n\tcolor: #A5A5A5;\r\n\tfloat:left;\r\n\t_margin-top:1px;\r\n}\r\n\r\n.taskPanelEditDetailCard .closeButton \r\n{\r\n\twidth: 12px;\r\n\theight: 12px;\r\n\tcursor: pointer;\r\n\tfloat: right;\r\n\tbackground: url(\"${images}main.gif\") -1425px -1px;\r\n}\r\n.taskPanelEditDetailCard .closeButton:hover \r\n{\r\n\tbackground-position: -1440px -1px;\r\n}\r\n\r\n.taskPanelEditDetailCard input.default \r\n{\r\n\tcolor: #A5A5A5;\r\n\tpadding-left: 6px;\r\n}\r\n\r\n.taskPanelEditDetailCard label.default \r\n{\r\n\tcolor: #A5A5A5;\r\n}\r\n.taskPanelEditDetailCard .taskNameInput \r\n{\r\n\theight:auto;\t\r\n\twidth: 90%;\r\n\tborder: 1px solid #8A8A8A;\r\n\tpadding-left: 6px;\r\n}\r\n\r\n.taskPanelEditDetailCard .dueDateInput \r\n{\r\n\theight:auto;\t\t\r\n\twidth:50%;\r\n\tborder: 1px solid #8A8A8A;\r\n\tpadding-left: 6px;\t\r\n}\r\n\r\n.taskPanelEditDetailCard .dueDateInputDefault \r\n{\r\n\theight:auto;\t\t\r\n\twidth:50%;\r\n\tborder: 1px solid #8A8A8A;\r\n\tpadding-left: 6px;\r\n\tcolor:#A5A5A5;\r\n\t\r\n}\r\n\r\n.taskPanelEditDetailCard .taskNameTd \r\n{\r\n\tpadding-left:16px;\r\n\tpadding-top:10px;\t\r\n}\r\n\r\n.taskPanelEditDetailCard .dueDateTd\r\n{\r\n\tpadding-left:5px;\r\n\twidth:89%; \r\n\tmargin:20px 0px 12px 12px;\t\r\n}\r\n\r\n.taskPanelEditDetailCard .linkTd\r\n{\r\n\tfloat:left; \r\n\tpadding-left:5px;\r\n\twidth:89%; \r\n\tmargin:14px 0px 12px 12px;\r\n\t\r\n}\r\n.taskPanelEditDetailCard .addNoteInputTd\r\n{\r\n\tfloat:left; \r\n\tpadding-left: 10px; \r\n\tpadding-right: 10px;\r\n}\r\n\r\n.taskPanelEditDetailCard .reminderCheckBoxRowTd\r\n{\r\n\twidth:89%; \r\n\tmargin:14px 0px 12px 12px;\r\n}\r\n.taskPanelEditDetailCard .reminderDetailsRowTd\r\n{\r\n\twidth:89%; \r\n\tmargin:14px 0px 12px 12px;\r\n}\r\n\r\n.taskPanelEditDetailCard .addNoteLink \r\n{\r\n\tfloat: left;\r\n\tfont-size: 11px;\r\n\tpadding-top: 4px;\t\r\n}\r\n\r\n.taskPanelEditDetailCard .addNoteInput\r\n{\r\n\tborder: 1px solid #8A8A8A;\r\n\twidth: 200px;\r\n\theight: 60px;\r\n\tmargin-left:5px;\r\n\tpadding-left: 2px;    \r\n}\r\n.taskPanelEditDetailCard .addNoteInputDefault\r\n{\r\n\tborder: 1px solid #8A8A8A;\r\n\twidth: 200px;\r\n\theight: 60px;\r\n\tmargin-left:5px;\r\n\tcolor:#A5A5A5;\r\n\tpadding-left: 2px;\r\n}\r\n.taskPanelEditDetailCard .updateButton \r\n{\r\n\tmargin-top: -2px;\r\n\tfloat:right;\r\n\tpadding-top:10px;\r\n\tpadding-bottom:10px\r\n}\r\n\r\n.taskPanelEditDetailCard .updateButtonTd\r\n{\r\n\tpadding-left:151px;\t\r\n}\r\n\r\n\r\n.taskPanelEditDetailCard .reminderTimeSelectTd\r\n{\r\n\tpadding-left:0px;\r\n\tfloat:left;\r\n\r\n}\r\n\r\n.taskPanelEditDetailCard .reminderIcon\r\n{\r\n\twidth: 15px;\r\n\theight: 18px;\r\n\tcursor: pointer;\r\n\tbackground: url(\"${images}main.gif\") -1285px -53px;\r\n\tmargin-top:-2px;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/panels/TaskPanel.css"),widgetsInTemplate:true,isContainer:false,taskPanel:null,model:null,taskName:null,dateHasBeenChosen:false,addTaskInputDefaultValue:Config.Strings.EnterTask,dueDateDefaultValue:Config.Strings.Panel_TodoPanel_NoDueDate,noteDefaultValue:Config.Strings.Panel_TodoPanel_EnterNote,timeFormat:Config.Strings.CalTimeFormatRange1,timeFormatShort:Config.Strings.CalTimeFormatRange2,reminderFlag:false,noteFlag:false,currentTaskUId:null,dueDateItems:["Default","OneDayBefore","TwoDaysBefore","OneWeekBefore"],postCreate:function(_ff,frag){
this.dueDateInput.onclick=ws.lang.hitch(this,"showDueDatePopupPicker",this.dueDateInput);
this.dueDateInput.onfocus=ws.lang.hitch(this,"showDueDatePopupPicker",this.dueDateInput);
_1.event.connect(this.dueDatePopupPicker.datePicker,"selectDateConnect",this,"fillInDateField");
this.reminderTimeSelect.onclick=ws.lang.hitch(this,"showTimePicker",this.reminderTimeSelect);
_1.event.connect(this.eventTimePopupPicker.timePicker,"selectTimeConnect",this,"fillInTimeField");
_1.event.connect(this.dueDateSelect,"valueChanged",this,"dueDateSelected");
if(false==Config.ShowReminderTask){
_1.html.hide(this.addReminderLink1);
_1.html.hide(this.addNoteComma);
_1.html.hide(this.reminderLinkRow);
}
},openPopUp:function(_101,_102,_103){
_1.debug("TaskPanelEditDetailCard:open");
this.dateHasBeenChosen=false;
this.currentTaskUId=_101;
this.closeNote();
this.populateFields(_101);
if(_102!=null){
_1.html.placeOnScreenAroundElement(this.domNode,_102,null,null,_103);
}
this.show();
_1.lang.setTimeout(this,function(){
_1.event.connect(document.documentElement,"onmousedown",this,"closeClick");
},0);
},populateFields:function(_104){
var _105=this.model.components;
var _106=this.model.componentEnum;
var _107=null;
_107=_105[_104];
_1.debugShallow(_107);
this.taskNameInput.value=_107[_106.summary];
_1.html.removeClass(this.taskNameInput,"default");
if(_107[_106.end]){
var _108=Config.Strings.DateYear;
var date=ws.date.formatDateTime(_107[_106.end],_108);
var time=ws.date.formatDateTime(_107[_106.end],this.timeFormat);
_1.html.removeClass(this.dueDateInput,"dueDateInputDefault");
this.dueDateInput.value=date;
}else{
this.dueDateInput.value="";
}
if(_107[_106.reminderEnabled]&&date!=""){
this.reminderCheckBox.checked=true;
_1.html.removeClass(this.reminderLabel,"default");
this.enableReminderRow();
_1.debug("time = "+time);
this.reminderTimeSelect.value=time;
this.dueDateSelect.currentValueNode.innerHTML=ws.panels.TaskPanelUtil.GetLeadTimeStrings(_107[_106.reminderLeadTime]);
}else{
_1.html.addClass(this.reminderLabel,"default");
_1.html.addClass(this.reminderTimeSelectDefault,"reminderTimeSelectDefault");
if(this.dueDateInput.value==""){
this.dueDateInput.value=this.dueDateDefaultValue;
_1.html.addClass(this.dueDateInput,"dueDateInputDefault");
}
this.reminderCheckBox.checked=false;
this.disableReminderRow();
}
if(_107[_106.description]!=""){
this.openNote(_107[_106.description]);
}else{
this.closeNote();
}
},showTimePicker:function(_10b){
_1.debug("QuickAdd:showTimePicker");
if(!this.eventTimePopupPicker.isShowingNow){
this.eventTimePopupPicker.open(_10b,this,_10b,{"BL":"TL"});
var _10c=new Date();
var _10d=ws.date.ParseHourMinTextField(_10b.value,this.timeFormat,this.timeFormatShort);
if(_10d!=null){
_10c.setHours(_10d.hr,_10d.min);
this.eventTimePopupPicker.setTime(_10c);
}else{
this.eventTimePopupPicker.setTime();
}
}
},reset:function(){
this.addNoteInput.value=this.noteDefaultValue;
this.addNoteInput2.value=this.noteDefaultValue;
this.reminderTimeSelect.value="";
_1.html.addClass(this.addNoteInput2,"addNoteInputDefault");
_1.html.addClass(this.addNoteInput2,"addNoteInputDefault");
},addReminder:function(){
this.openReminder();
},openReminder:function(){
this.enableReminderRow(true);
},closeReminder:function(){
},addNote:function(){
this.openNote();
},openNote:function(_10e){
_1.html.hide(this.noteAndReminderRow);
_1.html.hide(this.noteLinkRow);
if(this.reminderFlag==false){
if(Config.ShowReminderTask){
_1.html.show(this.reminderLinkRow);
}
_1.html.hide(this.addNoteInputRow);
_1.html.show(this.addNoteInputRow2);
if(_10e){
_1.html.replaceClass(this.addNoteInput2,"addNoteInput","addNoteInputDefault");
this.addNoteInput2.value=_10e;
}else{
this.addNoteInput2.value=this.noteDefaultValue;
}
this.noteFlag=2;
}else{
_1.html.hide(this.reminderLinkRow);
_1.html.hide(this.addNoteInputRow2);
_1.html.show(this.addNoteInputRow);
if(_10e){
_1.html.replaceClass(this.addNoteInput,"addNoteInput","addNoteInputDefault");
this.addNoteInput.value=_10e;
}else{
this.addNoteInput.value=this.noteDefaultValue;
}
this.noteFlag=1;
}
},closeNote:function(){
_1.html.hide(this.addNoteInputRow);
_1.html.hide(this.addNoteInputRow2);
_1.html.show(this.addNoteLink);
this.noteFlag=false;
},updateTask:function(){
_1.debug("TaskPanelEditDetailCard:updateTask");
var _10f=this.model.components;
var _110=this.model.componentEnum;
var _111=null;
var _112=false;
var _113=false;
var _114=false;
var _115=this.taskNameInput.value;
_115=ws.panels.TaskPanelUtil.TrimWhiteSpace(_115);
if(_115!=""&&this.isUpdateTaskEnabled()){
this.taskPanel.updateTaskFlag=true;
_111=_10f[this.currentTaskUId];
var args=this.model.getComponentArgsForTask(_111);
args.sortBy="TodoStatus";
args.sortDir="Ascending";
args.summary=this.taskNameInput.value;
var date=ws.panels.TaskPanelUtil.TrimWhiteSpace(this.dueDateInput.value);
if(date!=""&&!_1.html.hasClass(this.dueDateInput,"dueDateInputDefault")){
var _118=null;
var _119=null;
if(this.reminderCheckBox.checked&&this.reminderFlag){
var _11a=ws.date.ParseHourMinTextField(this.reminderTimeSelect.value,this.timeFormat,this.timeFormatShort);
_118=_11a.hr;
_119=_11a.min;
}
var _11b=ws.panels.TaskPanelUtil.ValidateDate(date,_118,_119,Config.Strings.DateYear,this.model.currentServerTime);
if(_11b.isValidDate){
var _11c=_11b.oDate;
if(_118!=null){
if(!_11b.isDateInPast){
args.end=ws.date.formatISO8601(_11c);
args.start=args.end;
args.reminderEnabled=true;
args.reminderLeadTime=ws.panels.TaskPanelUtil.GetLeadTimeInMinutes(this.dueDateSelect.currentValue);
if(_11c<_111[_110.start]){
args.start=args.end;
}
_113=true;
}else{
_113=false;
_114=true;
}
}else{
_113=true;
args.end=ws.date.formatISO8601(_11c);
if(_11c<_111[_110.start]){
args.start=args.end;
}
}
}else{
ws.widget.OkCancelDialog.alert(Config.Strings.InvalidDateOnCreate);
}
}else{
if(this.noteFlag==1){
args.description=this.addNoteInput.value;
}
if(this.noteFlag==2){
args.description=this.addNoteInput2.value;
}
args.end=null;
args.reminderEnabled=false;
args.reminderLeadTime=0;
args.status=ws.panels.TaskPanelUtil.GetTodoStatus(_111[_110.status]);
args.start=ws.date.formatISO8601(new Date());
_1.debugShallow(args);
args.loadCallback=_1.lang.hitch(this,function(){
_1.event.topic.publish("WSFeedbackStart",Config.Strings.ToDoUpdated,true);
});
this.model.saveComponent(args);
this.closeCard();
}
if(_113){
if(this.noteFlag==1){
args.description=this.addNoteInput.value;
}else{
if(this.noteFlag==2){
args.description=this.addNoteInput2.value;
}
}
args.status=ws.panels.TaskPanelUtil.GetTodoStatus(_111[_110.status]);
if(this.reminderCheckBox.checked){
args.reminderEnabled=true;
args.reminderLeadTime=ws.panels.TaskPanelUtil.GetLeadTimeInMinutes(this.dueDateSelect.currentValue);
}else{
args.reminderEnabled=false;
}
if(args.end.length==0){
args.start=ws.date.formatISO8601(new Date());
}
args.start=args.end;
_1.debugShallow(args);
args.loadCallback=_1.lang.hitch(this,function(){
_1.event.topic.publish("WSFeedbackStart",Config.Strings.ToDoUpdated,true);
});
this.model.saveComponent(args);
this.closeCard();
}
if(_114){
ws.widget.OkCancelDialog.alert(Config.Strings.InvalidReminderDateInPastOnCreate);
}
}
},isUpdateTaskEnabled:function(){
if(_1.html.hasClass(this.taskNameInput,"default")){
return false;
}else{
return true;
}
},fillInTimeField:function(_11d){
_1.debug("TaskPanelEdit:fillInTimeField");
this.reminderTimeSelect.value=_11d;
},fillInDateField:function(_11e){
_1.html.removeClass(this.dueDateInput,"dueDateInputDefault");
var _11f=Config.Strings.DateYear;
this.dueDateInput.value=ws.date.formatDateTime(new Date(_11e),_11f);
if(this.dueDateInput.value){
this.enableReminderRow();
}else{
if(!this.dateHasBeenChosen){
this.reminderCheckBox.disabled=false;
this.reminderCheckBox.checked=false;
this.disableReminderRow();
this.dateHasBeenChosen=true;
}
}
},showDueDatePopupPicker:function(_120){
if(!this.dueDatePopupPicker.isShowingNow){
this.dueDatePopupPicker.open(_120,this,_120,{"BL":"TL"});
}
},reminderOnChange:function(){
if(this.reminderCheckBox.checked){
this.reminderFlag=true;
this.enableReminderRow();
}else{
this.reminderFlag=false;
this.disableReminderRow();
}
},hideReminderRows:function(){
_1.html.hide(this.reminderCheckBoxRow);
_1.dom.insertAfter(this.reminderDetailsRow,this.reminderCheckBoxRow);
this.domNode.removeChild(this.reminderDetailsRow);
},showReminderRows:function(){
_1.html.show(this.reminderCheckBoxRow);
_1.dom.insertAfter(this.reminderDetailsRow,this.reminderCheckBoxRow);
},enableReminderRow:function(_121){
var date=ws.panels.TaskPanelUtil.TrimWhiteSpace(this.dueDateInput.value);
if((date!=""&&date!=this.dueDateDefaultValue)||_121){
this.reminderCheckBox.disabled=false;
_1.html.removeClass(this.reminderLabel,"default");
this.dueDateSelect.setClass("dueDateSelect");
if(_1.string.isBlank(this.reminderTimeSelect.value)){
var _123=new Date();
_123=ws.calendar.calutil.GetNext30MinuteIncrement(_123);
var _124=ws.date.formatDateTime(_123,this.timeFormat);
this.reminderTimeSelect.value=_124;
}
}
this.reminderTimeSelect.enabled=true;
this.dueDateSelect.enabled=true;
this.reminderFlag=true;
_1.html.hide(this.noteAndReminderRow);
_1.html.hide(this.reminderLinkRow);
if(Config.ShowReminderTask){
this.showReminderRows();
}
if(this.noteFlag==false){
_1.html.show(this.noteLinkRow);
}else{
_1.html.hide(this.noteLinkRow);
}
},disableReminderRow:function(){
var date=ws.panels.TaskPanelUtil.TrimWhiteSpace(this.dueDateInput.value);
if(date==this.dueDateDefaultValue||date==""){
this.reminderCheckBox.disabled="disabled";
}
_1.html.addClass(this.reminderLabel,"default");
this.reminderTimeSelect.enabled=false;
this.dueDateSelect.enabled=false;
this.reminderFlag=false;
if(this.noteFlag==false){
_1.html.hide(this.noteLinkRow);
_1.html.hide(this.reminderLinkRow);
_1.html.show(this.noteAndReminderRow);
}else{
_1.html.hide(this.noteLinkRow);
if(Config.ShowReminderTask){
_1.html.show(this.reminderLinkRow);
}
_1.html.hide(this.noteAndReminderRow);
}
this.hideReminderRows();
},onFocus:function(){
if(this.taskNameInput.value==this.taskPanel.addTaskInputNodeDefaultValue){
this.taskNameInput.value="";
_1.html.removeClass(this.taskNameInput,"default");
}
},onBlur:function(){
if(this.taskNameInput.value==""){
this.taskNameInput.value=this.taskPanel.addTaskInputNodeDefaultValue;
_1.html.addClass(this.taskNameInput,"default");
}
},onChange:function(){
if(this.dueDateInput.value==""&&!this.dueDatePopupPicker.isShowingNow){
this.reminderCheckBox.checked=false;
this.disableReminderRow();
_1.html.addClass(this.dueDateInput,"default");
this.dueDateInput.value=this.dueDateDefaultValue;
this.dateHasBeenChosen=false;
}else{
this.reminderCheckBox.removeAttribute("disabled");
this.dateHasBeenChosen=true;
}
},reminderOnFocus:function(){
if(_1.html.hasClass(this.dueDateInput,"default")){
this.reminderCheckBox.checked=false;
_1.html.removeClass(this.dueDateInput,"default");
this.dueDateInput.value="";
}
},reminderOnBlur:function(){
if(this.dueDateInput.value==""&&!this.dueDatePopupPicker.isShowingNow){
this.reminderCheckBox.checked=false;
this.disableReminderRow();
_1.html.addClass(this.dueDateInput,"default");
this.dueDateInput.value=this.dueDateDefaultValue;
this.dateHasBeenChosen=false;
}
},onKeyPressInput:function(evt){
if(evt.keyCode==evt.KEY_ENTER){
this.updateTask();
}else{
if(evt.keyCode==evt.KEY_ESCAPE){
_1.html.addClass(this.taskNameInput,"default");
this.taskNameInput.value=this.taskNameInputDefaultValue;
_1.html.addClass(this.dueDateInput,"default");
this.dueDateInput.value=this.dueDateInputDefaultValue;
this.dueDatePopupPicker.close();
this.closeCard();
}
}
},changeDefaultTextForNote:function(){
_1.debug("changeDefaultTextForNote:"+this.noteFlag);
if(this.noteFlag==1){
if(this.addNoteInput.value==this.noteDefaultValue){
this.addNoteInput.value="";
_1.html.replaceClass(this.addNoteInput,"addNoteInput","addNoteInputDefault");
}
}else{
if(this.noteFlag==2){
if(this.addNoteInput2.value==this.noteDefaultValue){
this.addNoteInput2.value="";
_1.html.replaceClass(this.addNoteInput2,"addNoteInput","addNoteInputDefault");
}
}
}
},dueDateSelected:function(){
this.dueDateClick=true;
},closeClick:function(evt){
var _128=_1.html.overElement(this.domNode,evt);
var _129=_1.html.overElement(this.dueDatePopupPicker.domNode,evt);
var _12a=this.eventTimePopupPicker.isShowingNow?_1.html.overElement(this.eventTimePopupPicker.domNode,evt):false;
if(!_128&&!_129&&!_12a&&!this.dueDateClick){
this.closeCard();
}
this.dueDateClick=false;
evt.stopPropagation();
},closeCard:function(){
_1.event.disconnect(document.documentElement,"onmousedown",this,"closeClick");
this.hide();
this.reset();
}});
_1.provide("ws.panels.TaskPanel");
_1.provide("ws.panels.TaskPanelUtil");
_1.require("dojo.html.display");
_1.require("dojo.io.*");
_1.require("dojo.widget.*");
_1.require("dojo.widget.ContentPane");
_1.require("dojo.widget.LayoutContainer");
_1.require("ws.calendar.CalendarViewModel");
_1.require("ws.calendar.calutil");
_1.require("ws.date");
_1.require("ws.widget.ListView");
_1.require("ws.widget.util");
_1.require("ws.widget.WSButton");
_1.require("ws.widget.WSSelect");
ws.panels.TaskPanelUtil={IsDateInPast:function(date){
var _12c=new Date();
return (date<_12c);
},IsValidDate:function(_12d,_12e){
var ret=true;
if(_12d!=null&&_12d.length>0){
var date=ws.date.ParseDateFromFormat(_12d,_12e);
ret=(null!=date);
}
return ret;
},ValidateDate:function(date,_132,_133,_134,_135){
var _136=false;
var _137=false;
var _138=new Object();
var _139=ws.date.ParseDateFromFormat(date,_134);
if(null!=_139){
_136=true;
if(null!==_132){
_139.setHours(_132,_133);
}else{
}
_137=(_139<_135);
}
_138.isValidDate=_136;
_138.isDateInPast=_137;
_138.oDate=_139;
return _138;
},GetLeadTimeInMinutes:function(_13a){
var ret=0;
switch(_13a){
case "Default":
ret=0;
break;
case "OneDayBefore":
ret=1440;
break;
case "TwoDaysBefore":
ret=2880;
break;
case "OneWeekBefore":
ret=10080;
break;
default:
ret=0;
break;
}
return ret;
},BuildTimeMenuItems:function(){
var opts=[];
var _13d;
var fmt=Config.Strings.CalTimeFormatRange1;
var _13f=new Date();
for(var i=0;i<24;i++){
_13f.setHours(i,0);
_13d=ws.date.formatDateTime(_13f,fmt);
opts.push({display:_13d,selected:null,value:i});
}
return opts;
},TrimWhiteSpace:function(str){
str=str.replace(/^\s+/,"");
str=str.replace(/\s+$/,"");
return str;
},GetTodoStatus:function(_142){
switch(_142){
case 0:
return "Unknown";
case 1:
return "Draft";
case 2:
return "Completed";
case 3:
return "Cancelled";
case 4:
return "Assigned";
case 5:
return "In_Progress";
case 6:
return "Not_Started";
default:
return "In_Progress";
}
},GetLeadTimeStrings:function(_143){
switch(_143){
case 0:
return Config.Strings.OnDueDate;
case 1440:
return Config.Strings.OneDayBefore;
case 2880:
return Config.Strings.TwoDaysBefore;
case 10080:
return Config.Strings.OneWeekBefore;
default:
return 0;
}
}};
_1.declare("ws.panels.TaskGridModel",turbo.data.virtual,function(_144,_145){
this.model=_145;
_1.event.connect(this.model,"modelUpdated",this,"modelUpdated");
},{task:{taskCount:0,taskCalId:new Array(),taskUId:new Array(),taskName:new Array(),taskCompleted:new Array(),taskDueDate:new Array(),taskStatus:new Array(),taskReminderEnabled:new Array()},taskList:null,compEnum:null,columns:{Completed:0,TaskName:1,Hover:2},modelUpdated:function(){
},get:function(row,col){
var _148=this.getTaskData(row);
if(_148==null){
return Config.Strings.TaskError;
}
var task="";
var _14a="";
var _14b="";
var _14c=_1.html.getContentBox(this.grid.domNode).width-18;
var _14d=_14c-15-this.grid.builder.cellWidthPad-15-this.grid.builder.cellWidthPad-this.grid.builder.cellWidthPad;
if(_148.taskDueDate){
var _14e=Config.Strings.Panel_EventPanel_DateFormat;
var date=new Date(_148.taskDueDate);
var _150=ws.date.formatDateTime(date,_14e);
if(_148.taskCompleted){
_14a="<span style=\"color: #D8D6D3;font-size:11px; font-family:Arial;\">"+_150+"</span>";
}else{
_14a="<span style=\"color: #76B144;font-size:11px; font-family:Arial;\">"+_150+"</span>";
}
_14d-=37;
}
if(_148.taskReminderEnabled&&Config.ShowReminderTask){
_14b="<img src=\""+Config.SpacerImageURL+"\" class=\"reminderIcon\">";
_14d-=16;
}
var _151=_1.string.escapeXml(_148.taskName||"");
var _152=Math.round(_14d/(_1.render.html.ie?10:8));
task=ws.string.substituteParams("<span title=\"{0}\">{1}</span>",_151,_1.string.summary(_151,_152));
task+="&nbsp;"+_14a;
task+="&nbsp;"+_14b;
switch(col){
case this.columns.Completed:
return _148.taskCompleted?"ON":"OFF";
case this.columns.TaskName:
return task;
case this.columns.Hover:
return this.getHoverColumnCB?this.getHoverColumnCB(row):"";
default:
return "Invalid Column";
}
},getRow:function(row){
var _154=this.getTaskData(row);
if(_154==null){
return ["",""];
}
var _155=_154.taskCompleted?"ON":"OFF";
var _156=_154.taskName;
var _157=this.getHoverColumnCB?this.getHoverColumnCB(row):"";
if(_154.taskDueDate){
var _158=Config.Strings.Panel_EventPanel_DateFormat;
var date=new Date(_154.taskDueDate);
var _15a=ws.date.formatDateTime(date,_158);
var _15b=null;
if(_154.taskCompleted){
_15b="<span style=\"color: #D8D6D3; font-size:11px; font-family:Arial;\">"+dueDate+"</span>";
}else{
_15b="<span style=\"color: #76B144; font-size:11px; font-family:Arial;\">"+dueDate+"</span>";
}
_156=_156+"&nbsp&nbsp"+_15b;
}
if(_154.taskReminderEnabled&&Config.ShowReminderTask){
var _15c="<div class=\"taskpanel reminderIcon\"></div>";
_156=+"&nbsp&nbsp"+_15c;
}
return [_155,_156];
},getTaskData:function(row){
var _15e={taskName:this.task.taskName[row],taskCompleted:this.task.taskCompleted[row],taskDueDate:this.task.taskDueDate[row],taskReminderEnabled:this.task.taskReminderEnabled[row]};
return _15e;
},getRowCount:function(){
if(this.task==null){
return 0;
}else{
return this.task.taskCount;
}
}});
_1.widget.defineWidget("ws.panels.TaskPanel",ws.widget.ListView,{templateString:"<div style=\"height: 100%;\">\r\n    <div class=\"listView taskPanel\" dojoType=\"dojo:LayoutContainer\" dojoAttachPoint=\"layoutWidget\">\r\n        <div layoutAlign=\"top\" dojoType=\"dojo:ContentPane\">\r\n            <input dojoAttachPoint=\"addTaskInputNode\" maxlength=\"100\" dojoAttachEvent=\"onFocus: onFocus; onBlur: onBlur; onKeyPress: onAddTaskKeyPress;\" class=\"default\"/>\r\n            <div dojoAttachEvent=\"onClick: addTask;\"><img title=\"${EnterTask}\" src=\"${spacer}\" class=\"addTaskImageDefault\" dojoAttachPoint=\"addTaskImage\"></div>\r\n            <div class=\"moreDetailLink\" dojoAttachEvent=\"onClick: openMoreDetailCard\" dojoAttachPoint=\"moreDetailLink\">\r\n\t\t\t\t<span class=\"wsLink\">${MoreDetails}</span>\r\n\t\t   </div>\r\n        \r\n        </div>\r\n        <div dojoAttachPoint=\"grid\" dojoType=\"TurboDataGrid\" layoutAlign=\"client\" defaultLeftWidth=\"0\"></div>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n",templateCssString:".taskPanel\r\n{\r\n\t\r\n}\r\n\r\n.taskPanel input\r\n{\r\n\tmargin: 5px;\r\n\tpadding-left: 6px;\r\n\tfloat:left;\r\n\twidth: 70%;\r\n\tborder: 1px solid #85817c;\r\n}\r\n\r\n.taskPanel input.default \r\n{\r\n\tcolor: #A5A5A5;\r\n}\r\n\r\n.taskPanel .moreDetailLink\r\n{\r\n\tmargin: 2px 6px 0px 3px;\r\n\tfloat: right;\r\n\tfont: normal 11px Arial;\r\n\tpadding: 0px 0px 10px 11px;\r\n}\r\n\r\n.taskPanel .completedTask .turbogrid-cell\r\n{\r\n\tcolor: #D8D6D3;\r\n\t\r\n}\r\n\r\n.taskPanel .default .turbogrid-cell\r\n{\r\n\tfont-family: Arial;\r\n\tfont-size: 12px;\r\n}\r\n\r\n.taskPanel .deleteTaskIcon\r\n{\r\n\twidth: 12px;\r\n\theight: 12px;\r\n\tbackground: url(\"${images}main.gif\") -1395px -1px;\r\n\t\r\n}\r\n\r\n.taskPanel .deleteTaskIcon:hover\r\n{\r\n\tbackground-position: -1410px -1px;\r\n}\r\n\r\n.taskPanel .reminderIcon\r\n{\r\n\r\n\twidth: 14px;\r\n\theight: 12px;\r\n\tbackground: url(\"${images}main.gif\") -1284px -53px;\r\n\tmargin-bottom:-2px;\r\n\t\r\n}\r\n\r\n.taskPanel .addTaskImageDefault\r\n{\r\n\tleft: 125px;\r\n\r\n\t\r\n\tbackground-repeat: no-repeat;\r\n\tcursor: pointer;\r\n\t\r\n\twidth: 16px;\r\n\theight: 16px;\r\n\tbackground: url(\"${images}main.gif\") -1236px -1px;\r\n\tmargin: 7px 0px 0px 2px;\r\n}\r\n\r\n.taskPanel .addTaskImageEnabled\r\n{\r\n\tleft: 125px;\r\n\r\n\t\r\n\tbackground-repeat: no-repeat;\r\n\tcursor: pointer;\r\n\t\r\n\twidth: 16px;\r\n\theight: 16px;\r\n\tbackground: url(\"${images}main.gif\") -1190px -1px;\r\n\tmargin: 7px 0px 0px 2px;\r\n\r\n}\r\n\r\n.taskPanel .addTaskImageEnabled:hover\r\n{\r\n\tbackground-position: -1213px -1px;\r\n}\r\n\r\n\r\n.taskPanel .turbogrid-scrollbox \r\n{\r\n\tborder: none;\r\n}\r\n\r\n\r\n/*\r\n * TaskPanelMoreDetailCard\r\n */\r\n.taskPanelMoreDetailCard\r\n{\r\n\twidth: 245px;\r\n\theight:auto;\r\n\tbackground-color: #FFFFFF;\r\n\tborder: 1px solid #8A8A8A;\r\n\tz-index: 800;\r\n\tposition: absolute;\r\n\tpadding: 3px 3px 0px 3px;\r\n\toverflow: auto;\t/* Fixes the Firefox no-blinking-cursor bug */\r\n}\r\n \r\n.taskPanelMoreDetailCard. label\r\n{\r\n\tvertical-align: middle;\r\n\tcolor: #A5A5A5;\r\n }\r\n\r\n.taskPanelMoreDetailCard .reminderTimeSelect\r\n{\r\n\tmargin-top:-5px;\r\n\tfloat:left;\r\n }\r\n\r\n.taskPanelMoreDetailCard .dueDateSelect\r\n{\r\n\tmargin-top:-5px;\r\n\t_margin-top:1px;\r\n\tfloat:left; \t\r\n}\r\n\r\n.taskPanelMoreDetailCard input.reminderTimeSelectDefault\r\n{\r\n\tborder: 1px #A5A5A5 solid; \r\n\tmargin-left:4px; \r\n\tmargin-top:-5px;\r\n\tfont-size:11px; \r\n\tfloat:left; \r\n\theight:16px; \r\n\twidth:50px; \r\n\t_margin-left:0px;\r\n\t_padding-top:0px; \r\n\t_padding-left:-5px; \r\n\t_margin-top:1px; \r\n\t\t\r\n}\r\n.taskPanelMoreDetailCard .dueDateSelectDefault\r\n{\r\n\tmargin-top:-5px;\r\n\tcolor: #A5A5A5;\r\n\tfloat:left;\r\n\t_margin-top:1px;\r\n\t\r\n}\r\n.taskPanelMoreDetailCard .closeButton \r\n{\r\n\t_zoom:1;\r\n\twidth: 12px;\r\n\theight: 12px;\r\n\tcursor: pointer;\r\n\tfloat: right;\r\n\tbackground: url(\"${images}main.gif\") -1425px -1px;\r\n}\r\n\r\n.taskPanelMoreDetailCard .closeButton:hover \r\n{\r\n\tbackground-position: -1440px -1px;\r\n}\r\n\r\n.taskPanelMoreDetailCard .default \r\n{\r\n\tcolor: #A5A5A5;\r\n}\r\n\r\n.taskPanelMoreDetailCard input.default \r\n{\r\n\tcolor: #A5A5A5;\r\n\tpadding-left: 6px;\r\n}\r\n\r\n.taskPanelMoreDetailCard label.default \r\n{\r\n\tcolor: #A5A5A5;\r\n}\r\n\r\n.taskPanelMoreDetailCard .taskNameInput \r\n{\r\n\theight:auto;\t\r\n\twidth: 90%;\r\n\tborder: 1px solid #8A8A8A;\r\n\tpadding-left: 6px;\t\r\n}\r\n\r\n.taskPanelMoreDetailCard .dueDateInputDefault \r\n{\r\n\theight:auto;\t\t\r\n\twidth:40%;\r\n\tborder: 1px solid #8A8A8A;\r\n\tpadding-left: 6px;\r\n\tcolor:#A5A5A5;\r\n\t\r\n}\r\n\r\n.taskPanelMoreDetailCard .dueDateInput \r\n{\r\n\theight:auto;\t\t\r\n\twidth:40%;\r\n\tborder: 1px solid #8A8A8A;\r\n\tpadding-left: 6px;\r\n\r\n\t\r\n}\r\n\r\n.taskPanelMoreDetailCard .taskNameTd \r\n{\r\n\tpadding-left:16px;\r\n\tpadding-top:10px;\r\n}\r\n\r\n.taskPanelMoreDetailCard .dueDateTd\r\n{\r\n\tpadding-left:5px; \r\n\twidth:89%; \r\n\tmargin:20px 0px 12px 12px;\r\n\t\r\n}\r\n\r\n.taskPanelMoreDetailCard .linkTd\r\n{\r\n\tfloat:left; \r\n\tpadding-left:5px;\r\n\twidth:89%; \r\n\tmargin:14px 0px 12px 12px;\r\n\t\r\n}\r\n.taskPanelMoreDetailCard .addNoteInputTd\r\n{\r\n\tfloat:left; \r\n\tpadding-left: 10px; \r\n\tpadding-right: 10px;\r\n}\r\n\r\n.taskPanelMoreDetailCard .reminderCheckBoxRowTd\r\n{\r\n\twidth:89%; \r\n\tmargin:14px 0px 12px 12px;\r\n}\r\n.taskPanelMoreDetailCard .reminderDetailsRowTd\r\n{\r\n\twidth:89%; \r\n\tmargin:14px 0px 12px 12px;\r\n}\r\n\r\n.taskPanelMoreDetailCard .wsLink\r\n{\r\n\tfont-size: 11px;\t\r\n}\r\n\r\n.taskPanelMoreDetailCard .addNoteLink \r\n{\t\r\n\tfloat: left;\r\n\tfont-size: 11px;\r\n\tpadding-top: 4px;\r\n}\r\n\r\n.taskPanelMoreDetailCard .addNoteInput\r\n{\r\n\tborder: 1px solid #8A8A8A;\r\n\twidth: 200px;\r\n\theight: 60px;\r\n\tmargin-left:5px;\r\n\tpadding-left: 2px;\r\n}\r\n\r\n.taskPanelMoreDetailCard .addNoteInputDefault\r\n{\r\n\tborder: 1px solid #8A8A8A;\r\n\twidth: 200px;\r\n\theight: 60px;\r\n\tmargin-left:5px;\r\n\tcolor:#A5A5A5;\r\n\tpadding-left: 2px;\r\n}\r\n\r\n.taskPanelMoreDetailCard .addButton \r\n{\r\n\tmargin-top: -2px;\r\n\tfloat:right;\r\n\tpadding-top:10px;\r\n\tpadding-bottom:10px\r\n}\r\n.taskPanelMoreDetailCard .linkStr \r\n{\r\n\tpadding-top:4px; \r\n\tpadding-left:-1px; \r\n\tfont-family:Arial; \r\n\tfloat:left; \r\n\tfont-size:11px;\r\n}\r\n\r\n/*\r\n * TaskPanelEditDetailCard\r\n */\r\n\r\n.taskPanelEditDetailCard\r\n{\r\n\twidth: 245px;\r\n\theight:auto;\r\n\tbackground-color: #FFFFFF;\r\n\tborder: 1px solid #8A8A8A;\r\n\tz-index: 800;\r\n\tposition: absolute;\r\n\tpadding: 3px 3px 0px 3px;\r\n\toverflow: auto;\t/* Fixes the Firefox no-blinking-cursor bug */\r\n}\r\n\r\n.taskPanelEditDetailCard. label\r\n{\r\nvertical-align: middle;\r\ncolor: #A5A5A5;\r\n}\r\n\r\n.taskPanelEditDetailCard input.reminderTimeSelect\r\n{\r\n\tmargin-top:-5px;\r\n\tfloat:left;\t\r\n\twidth:50px;\r\n}\r\n\r\n.taskPanelEditDetailCard .dueDateSelect\r\n{\r\n\tmargin-top:-5px;\r\n\t_margin-top:1px;\r\n\tfloat:left;\t\r\n}\r\n\r\n.taskPanelEditDetailCard input.reminderTimeSelectDefault\r\n{\r\n\tborder: 1px #A5A5A5 solid; \r\n\tmargin-left:4px; \r\n\tmargin-top:-5px;\r\n\tfont-size:11px; \r\n\tfloat:left; \r\n\theight:16px; \r\n\twidth:50px; \r\n\t_margin-left:0px;\r\n\t_padding-top:0px; \r\n\t_padding-left:-5px; \r\n\t_margin-top:1px; \r\n\t\t\r\n}\r\n\r\n.taskPanelEditDetailCard .dueDateSelectDefault\r\n{\r\n\tmargin-top:-5px;\r\n\tcolor: #A5A5A5;\r\n\tfloat:left;\r\n\t_margin-top:1px;\r\n}\r\n\r\n.taskPanelEditDetailCard .closeButton \r\n{\r\n\twidth: 12px;\r\n\theight: 12px;\r\n\tcursor: pointer;\r\n\tfloat: right;\r\n\tbackground: url(\"${images}main.gif\") -1425px -1px;\r\n}\r\n.taskPanelEditDetailCard .closeButton:hover \r\n{\r\n\tbackground-position: -1440px -1px;\r\n}\r\n\r\n.taskPanelEditDetailCard input.default \r\n{\r\n\tcolor: #A5A5A5;\r\n\tpadding-left: 6px;\r\n}\r\n\r\n.taskPanelEditDetailCard label.default \r\n{\r\n\tcolor: #A5A5A5;\r\n}\r\n.taskPanelEditDetailCard .taskNameInput \r\n{\r\n\theight:auto;\t\r\n\twidth: 90%;\r\n\tborder: 1px solid #8A8A8A;\r\n\tpadding-left: 6px;\r\n}\r\n\r\n.taskPanelEditDetailCard .dueDateInput \r\n{\r\n\theight:auto;\t\t\r\n\twidth:50%;\r\n\tborder: 1px solid #8A8A8A;\r\n\tpadding-left: 6px;\t\r\n}\r\n\r\n.taskPanelEditDetailCard .dueDateInputDefault \r\n{\r\n\theight:auto;\t\t\r\n\twidth:50%;\r\n\tborder: 1px solid #8A8A8A;\r\n\tpadding-left: 6px;\r\n\tcolor:#A5A5A5;\r\n\t\r\n}\r\n\r\n.taskPanelEditDetailCard .taskNameTd \r\n{\r\n\tpadding-left:16px;\r\n\tpadding-top:10px;\t\r\n}\r\n\r\n.taskPanelEditDetailCard .dueDateTd\r\n{\r\n\tpadding-left:5px;\r\n\twidth:89%; \r\n\tmargin:20px 0px 12px 12px;\t\r\n}\r\n\r\n.taskPanelEditDetailCard .linkTd\r\n{\r\n\tfloat:left; \r\n\tpadding-left:5px;\r\n\twidth:89%; \r\n\tmargin:14px 0px 12px 12px;\r\n\t\r\n}\r\n.taskPanelEditDetailCard .addNoteInputTd\r\n{\r\n\tfloat:left; \r\n\tpadding-left: 10px; \r\n\tpadding-right: 10px;\r\n}\r\n\r\n.taskPanelEditDetailCard .reminderCheckBoxRowTd\r\n{\r\n\twidth:89%; \r\n\tmargin:14px 0px 12px 12px;\r\n}\r\n.taskPanelEditDetailCard .reminderDetailsRowTd\r\n{\r\n\twidth:89%; \r\n\tmargin:14px 0px 12px 12px;\r\n}\r\n\r\n.taskPanelEditDetailCard .addNoteLink \r\n{\r\n\tfloat: left;\r\n\tfont-size: 11px;\r\n\tpadding-top: 4px;\t\r\n}\r\n\r\n.taskPanelEditDetailCard .addNoteInput\r\n{\r\n\tborder: 1px solid #8A8A8A;\r\n\twidth: 200px;\r\n\theight: 60px;\r\n\tmargin-left:5px;\r\n\tpadding-left: 2px;    \r\n}\r\n.taskPanelEditDetailCard .addNoteInputDefault\r\n{\r\n\tborder: 1px solid #8A8A8A;\r\n\twidth: 200px;\r\n\theight: 60px;\r\n\tmargin-left:5px;\r\n\tcolor:#A5A5A5;\r\n\tpadding-left: 2px;\r\n}\r\n.taskPanelEditDetailCard .updateButton \r\n{\r\n\tmargin-top: -2px;\r\n\tfloat:right;\r\n\tpadding-top:10px;\r\n\tpadding-bottom:10px\r\n}\r\n\r\n.taskPanelEditDetailCard .updateButtonTd\r\n{\r\n\tpadding-left:151px;\t\r\n}\r\n\r\n\r\n.taskPanelEditDetailCard .reminderTimeSelectTd\r\n{\r\n\tpadding-left:0px;\r\n\tfloat:left;\r\n\r\n}\r\n\r\n.taskPanelEditDetailCard .reminderIcon\r\n{\r\n\twidth: 15px;\r\n\theight: 18px;\r\n\tcursor: pointer;\r\n\tbackground: url(\"${images}main.gif\") -1285px -53px;\r\n\tmargin-top:-2px;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/panels/TaskPanel.css"),wrapperModelClass:ws.panels.TaskGridModel,addTaskInputNodeDefaultValue:Config.Strings.EnterTask,speedUp:false,taskListInitializedFlag:false,addTaskFlag:false,deleteTaskFlag:false,updateTaskFlag:false,currentEditDetailCard:null,deletedTaskUId:null,deleteTaskHoverFlag:false,hoverColumnHtml:"<div class=\"taskpanel deleteTaskIcon\"></div>",postCreate:function(){
var _15f=new ws.calendar.CalendarViewModel();
this.setModel(_15f);
this.addTaskInputNode.value=this.addTaskInputNodeDefaultValue;
},initView:function(){
this.columns=[[turbo.grid.columns.sprite,{align:"center",width:15,sprites:this.baseSprites.chkBox,canResize:false,sortable:false}],[turbo.grid.format.text,{align:"left",width:100,canResize:false,sortable:false}],[turbo.grid.format.text,{align:"center",width:15,canResize:false,sortable:false}]];
this.autosizeColumnIndex=this.gridModel.columns.TaskName;
ws.panels.TaskPanel.superclass.initView.apply(this,arguments);
this.gridModel.grid=this.grid;
_1.html.hide(this.grid.headerNode);
this.initializeTaskList();
_1.event.connect(this.model,"modelUpdated",this,"modelUpdated");
_1.event.connectOnce(this.model,"requestUpdate",_1.lang.hitch(this,function(){
var args=this.model.getDefaultTaskArgs();
args.sortBy="TodoStatus";
args.sortDir="Ascending";
this.model.getData(args);
}));
this.grid.docontextmenu=_1.lang.hitch(this,"onContextMenu");
},getAddTaskArgs:function(_161){
var args=this.model.getDefaultTaskArgs();
args.sortBy="TodoStatus";
args.sortDir="Ascending";
args.start=ws.date.formatISO8601(new Date());
args.summary=_161;
return args;
},getDeleteTaskArgs:function(row){
var args=this.model.getDefaultTaskArgs();
args.sortBy="TodoStatus";
args.sortDir="Ascending";
args.calid=this.gridModel.task.taskCalId[row];
args.id=this.gridModel.task.taskUId[row];
return args;
},getZeroRowsMessage:function(){
return Config.Strings.Panel_TodoPanel_EmptyList;
},initializeTaskList:function(){
this.gridModel.taskList=new Array();
var args=this.model.getDefaultTaskArgs();
args.sortBy="TodoStatus";
args.sortDir="Ascending";
this.gridModel.model.getData(args);
},modelUpdated:function(){
if(!this.taskListInitializedFlag){
this.buildTaskList();
this.taskListInitializedFlag=true;
}else{
if(this.addTaskFlag){
this.cleanLists();
this.buildTaskList();
this.addTaskFlag=false;
}else{
if(this.deleteTaskFlag){
this.cleanLists();
this.buildTaskList();
this.deleteTaskFlag=false;
if(this.currentEditDetailCard){
if(this.currentEditDetailCard.isShowing){
if(this.deletedTaskUId==this.currentEditDetailCard.currentTaskUId){
this.currentEditDetailCard.hide();
}
}
}
}else{
if(this.updateTaskFlag){
this.cleanLists();
this.buildTaskList();
this.updateTaskFlag=false;
}
}
}
}
},reverseTaskList:function(){
this.gridModel.task.taskCalId.reverse();
this.gridModel.task.taskUId.reverse();
this.gridModel.task.taskName.reverse();
this.gridModel.task.taskDueDate.reverse();
this.gridModel.task.taskCompleted.reverse();
this.gridModel.task.taskStatus.reverse();
this.gridModel.task.taskReminderEnabled.reverse();
},cleanLists:function(){
this.gridModel.task.taskCalId=[];
this.gridModel.task.taskUId=[];
this.gridModel.task.taskName=[];
this.gridModel.task.taskDueDate=[];
this.gridModel.task.taskCompleted=[];
this.gridModel.task.taskStatus=[];
this.gridModel.task.taskReminderEnabled=[];
this.gridModel.task.taskCount=0;
},buildTaskList:function(){
var _166=this.gridModel.model.index;
var _167=this.gridModel.model.components;
var _168=this.gridModel.model.componentEnum;
this.gridModel.compEnum=_168;
var _169=null;
var task=null;
for(var i=0;i<_166.length;i++){
_169=_166[i];
componentName=_169[0];
task=_167[componentName];
if(task[_168.completed]==null){
this.gridModel.task.taskCalId.push(task[_168.calid]);
this.gridModel.task.taskUId.push(task[_168.id]);
this.gridModel.task.taskName.push(task[_168.summary]);
this.gridModel.task.taskDueDate.push(task[_168.end]);
this.gridModel.task.taskCompleted.push(task[_168.completed]);
this.gridModel.task.taskStatus.push(task[_168.status]);
this.gridModel.task.taskReminderEnabled.push(task[_168.reminderEnabled]);
this.gridModel.task.taskCount+=1;
}
}
this.orderTaskList();
this.gridModel.modelUpdated();
},onFocus:function(){
if(this.addTaskInputNode.value==this.addTaskInputNodeDefaultValue){
this.addTaskInputNode.value="";
_1.html.removeClass(this.addTaskInputNode,"default");
_1.html.removeClass(this.addTaskImage,"addTaskImageDefault");
_1.html.addClass(this.addTaskImage,"addTaskImageEnabled");
}
},onBlur:function(){
var _16c=ws.panels.TaskPanelUtil.TrimWhiteSpace(this.addTaskInputNode.value);
if(_16c==""){
this.addTaskInputNode.value=this.addTaskInputNodeDefaultValue;
_1.html.addClass(this.addTaskInputNode,"default");
_1.html.removeClass(this.addTaskImage,"addTaskImageEnabled");
_1.html.addClass(this.addTaskImage,"addTaskImageDefault");
}
},isAddTaskEnabled:function(){
if(_1.html.hasClass(this.addTaskInputNode,"default")){
return false;
}else{
return true;
}
},onAddTaskKeyPress:function(evt){
if(evt.keyCode==evt.KEY_ENTER){
var _16e=this.addTaskInputNode.value;
_16e=ws.panels.TaskPanelUtil.TrimWhiteSpace(_16e);
if(this.taskName!=""){
this.addTaskFlag=true;
var args=this.getAddTaskArgs(this.addTaskInputNode.value);
args.loadCallback=_1.lang.hitch(this,function(){
_1.event.topic.publish("WSFeedbackStart",Config.Strings.ToDoCreated,true);
});
this.gridModel.model.saveComponent(args);
if(this.addTaskInputNode.value!=""){
_1.html.addClass(this.addTaskInputNode,"default");
this.addTaskInputNode.value=this.addTaskInputNodeDefaultValue;
this.addTaskInputNode.blur();
}
}
_1.html.removeClass(this.addTaskImage,"addTaskImageEnabled");
_1.html.addClass(this.addTaskImage,"addTaskImageDefault");
}else{
if(evt.keyCode==evt.KEY_ESCAPE){
_1.html.addClass(this.addTaskInputNode,"default");
this.addTaskInputNode.value=this.addTaskInputNodeDefaultValue;
_1.html.removeClass(this.addTaskImage,"addTaskImageEnabled");
_1.html.addClass(this.addTaskImage,"addTaskImageDefault");
this.addTaskInputNode.blur();
}
}
},getHoverColumn:function(_170){
var _171=this.getQuickActionMenu(true);
var _172=(_171&&_171.isShowingNow)?this.quickActionRow:this.grid.over.row;
if(_170==_172&&!this.disableHover){
return this.hoverColumnHtml;
}else{
return "";
}
},handleHoverControlClick:function(e){
if(!this.deleteTaskHoverFlag){
this.deleteTaskHoverFlag=true;
if(_1.html.hasClass(e.target,"deleteTaskIcon")){
if(this.deleteTaskHoverFlag){
this.deleteTaskHoverFlag=false;
this.deleteTask(e.rowIndex);
}
}
}
},handleCellClick:function(e){
_1.debug("handleCellClick");
var _175=this.gridModel.model.components;
var _176=this.gridModel.model.componentEnum;
var _177=null;
switch(e.colIndex){
case this.gridModel.columns.TaskName:
this.editTask(e.rowIndex);
break;
case this.gridModel.columns.Completed:
if(this.gridModel.task.taskCompleted[e.rowIndex]){
this.markIncomplete(e.rowIndex);
}else{
this.markComplete(e.rowIndex);
}
break;
}
this.gridModel.modelUpdated();
},editTask:function(_178){
if(this.editDetailCard){
if(this.editDetailCard.isShowing()){
this.editDetailCard.closeCard();
}
}else{
this.editDetailCard=_1.widget.createWidget("ws:TaskPanelEditDetailCard",{model:this.model,taskPanel:this},_1.body(),"first");
}
this.currentEditDetailCard=this.editDetailCard;
this.editDetailCard.closeNote();
this.editDetailCard.openPopUp(this.gridModel.task.taskUId[_178],this.grid.rowNodes[_178],{"TL":"TR"});
},markIncomplete:function(_179){
var _17a=this.gridModel.model.components;
this.gridModel.task.taskCompleted[_179]=null;
this.gridModel.task.taskStatus[_179]=5;
taskComponent=_17a[this.gridModel.task.taskUId[_179]];
var args=this.gridModel.model.getComponentArgsForTask(taskComponent);
args.sortBy="TodoStatus";
args.sortDir="Ascending";
args.completed=null;
args.status="In_Progress";
args.percentComplete=0;
if(this.gridModel.task.taskDueDate[_179]){
args.end=ws.date.formatISO8601(taskComponent[compEnum.end]);
}
if(this.gridModel.task.taskReminderEnabled[_179]){
args.reminderEnabled=true;
args.reminderLeadTime=taskComponent[compEnum.reminderLeadTime];
args.reminderDeliveryOptions=taskComponent[compEnum.reminderDeliveryOptions];
}
args.loadCallback=_1.lang.hitch(this,function(){
_1.event.topic.publish("WSFeedbackStart",Config.Strings.ToDoMarkedIncomplete,true);
});
this.gridModel.model.saveComponent(args);
this.addUncheckedEventToList(_179);
},markComplete:function(_17c){
var _17d=this.gridModel.model.index;
var _17e=this.gridModel.model.components;
var _17f=this.gridModel.model.componentEnum;
var _180=null;
var task=null;
taskComponent=_17e[this.gridModel.task.taskUId[_17c]];
this.gridModel.task.taskCompleted[_17c]=ws.date.formatISO8601(new Date());
this.gridModel.task.taskStatus[_17c]=2;
var args=this.gridModel.model.getComponentArgsForTask(taskComponent);
args.completed=ws.date.formatISO8601(new Date());
args.status="Completed";
args.percentComplete=100;
args.sortBy="TodoStatus";
args.sortDir="Ascending";
if(this.gridModel.task.taskDueDate[_17c]){
args.end=ws.date.formatISO8601(taskComponent[_17f.end]);
}
if(this.gridModel.task.taskReminderEnabled[_17c]){
args.reminderEnabled=true;
args.reminderLeadTime=taskComponent[_17f.reminderLeadTime];
args.reminderDeliveryOptions=taskComponent[_17f.reminderDeliveryOptions];
}
args.loadCallback=_1.lang.hitch(this,function(){
_1.event.topic.publish("WSFeedbackStart",Config.Strings.ToDoMarkedCompleted,true);
});
this.gridModel.model.saveComponent(args);
this.moveTaskToEndOfList(_17c);
},getRowClasses:function(_183){
var cls=ws.panels.TaskPanel.superclass.getRowClasses.apply(this,arguments);
cls.push("default");
if(this.gridModel.task.taskCompleted[_183]){
cls.push("completedTask");
}
return cls;
},deleteTask:function(row){
if(this.editDetailCard){
this.editDetailCard.closeCard();
}
ws.widget.OkCancelDialog.alert(Config.Strings.RegTodoMsg,ws.lang.hitch(this,function(ok){
if(ok){
this.deleteTaskFlag=true;
var args=this.getDeleteTaskArgs(row);
args.loadCallback=_1.lang.hitch(this,function(){
_1.event.topic.publish("WSFeedbackStart",Config.Strings.ToDoDeleted,true);
});
this.gridModel.model.deleteEvents(args);
}
}),true);
},addTask:function(){
var _188=this.addTaskInputNode.value;
_188=ws.panels.TaskPanelUtil.TrimWhiteSpace(_188);
if(_188!=""&&this.isAddTaskEnabled()){
this.addTaskFlag=true;
var args=this.getAddTaskArgs(_188);
args.loadCallback=_1.lang.hitch(this,function(){
_1.event.topic.publish("WSFeedbackStart",Config.Strings.ToDoCreated,true);
});
this.gridModel.model.saveComponent(args);
if(this.addTaskInputNode.value!=""){
this.addTaskInputNode.value=this.addTaskInputNodeDefaultValue;
_1.html.addClass(this.addTaskInputNode,"default");
}
_1.html.removeClass(this.addTaskImage,"addTaskImageEnabled");
_1.html.addClass(this.addTaskImage,"addTaskImageDefault");
}
},addUncheckedEventToList:function(row){
_1.debug("addUncheckedEventToList");
if(row==0){
return;
}
var _18b=this.gridModel.task.taskCalId[row];
var _18c=this.gridModel.task.taskUId[row];
var _18d=this.gridModel.task.taskName[row];
var _18e=this.gridModel.task.taskDueDate[row];
var _18f=this.gridModel.task.taskCompleted[row];
var _190=this.gridModel.task.taskStatus[row];
var _191=this.gridModel.task.taskReminderEnabled[row];
if(_18e){
this.gridModel.task.taskCalId.splice(row,1);
this.gridModel.task.taskUId.splice(row,1);
this.gridModel.task.taskName.splice(row,1);
this.gridModel.task.taskDueDate.splice(row,1);
this.gridModel.task.taskCompleted.splice(row,1);
this.gridModel.task.taskStatus.splice(row,1);
this.gridModel.task.taskReminderEnabled.splice(row,1);
_1.debugShallow(this.gridModel.task.taskName);
var _192=0;
for(_192=0;_192<this.gridModel.task.taskCount;_192++){
_1.debug("tempTaskDueDate :"+_18e);
_1.debug("this.gridModel.duedate:"+this.gridModel.task.taskDueDate[_192]);
if(_18e<=this.gridModel.task.taskDueDate[_192]){
break;
}
if(!this.gridModel.task.taskDueDate[_192]){
break;
}
}
_1.debug("pos = "+_192);
this.gridModel.task.taskCalId.splice(_192,0,_18b);
this.gridModel.task.taskUId.splice(_192,0,_18c);
this.gridModel.task.taskName.splice(_192,0,_18d);
this.gridModel.task.taskDueDate.splice(_192,0,_18e);
this.gridModel.task.taskCompleted.splice(_192,0,_18f);
this.gridModel.task.taskStatus.splice(_192,0,_190);
this.gridModel.task.taskReminderEnabled.splice(_192,0,_191);
_1.debugShallow(this.gridModel.task.taskName);
}
},moveTaskToEndOfList:function(row){
var _194=new Array();
var _195=new Array();
var _196=new Array();
var _197=new Array();
var _198=new Array();
var _199=new Array();
var _19a=new Array();
var _19b=this.gridModel.task.taskCalId[row];
var _19c=this.gridModel.task.taskUId[row];
var _19d=this.gridModel.task.taskName[row];
var _19e=this.gridModel.task.taskDueDate[row];
var _19f=this.gridModel.task.taskCompleted[row];
var _1a0=this.gridModel.task.taskStatus[row];
var _1a1=this.gridModel.task.taskReminderEnabled[row];
for(var i=0;i<this.gridModel.task.taskCount;i++){
if(row!=i){
_194.push(this.gridModel.task.taskCalId[i]);
_195.push(this.gridModel.task.taskUId[i]);
_196.push(this.gridModel.task.taskName[i]);
_197.push(this.gridModel.task.taskDueDate[i]);
_198.push(this.gridModel.task.taskCompleted[i]);
_199.push(this.gridModel.task.taskStatus[i]);
_19a.push(this.gridModel.task.taskReminderEnabled[i]);
}else{
}
}
_194.push(_19b);
_195.push(_19c);
_196.push(_19d);
_197.push(_19e);
_198.push(_19f);
_199.push(_1a0);
_19a.push(_1a1);
this.gridModel.task.taskCalId=_194;
this.gridModel.task.taskUId=_195;
this.gridModel.task.taskName=_196;
this.gridModel.task.taskDueDate=_197;
this.gridModel.task.taskCompleted=_198;
this.gridModel.task.taskStatus=_199;
this.gridModel.task.taskReminderEnabled=_19a;
},orderTaskList:function(){
var _1a3=new Array();
var _1a4=new Array();
var _1a5=new Array();
var _1a6=new Array();
var _1a7=new Array();
var _1a8=new Array();
var _1a9=new Array();
var _1aa=new Array();
var _1ab=new Array();
var _1ac=new Array();
var _1ad=new Array();
var _1ae=new Array();
var _1af=new Array();
var _1b0=new Array();
for(var i=0;i<this.gridModel.task.taskCount;i++){
if(this.gridModel.task.taskDueDate[i]){
_1a3.push(this.gridModel.task.taskCalId[i]);
_1a4.push(this.gridModel.task.taskUId[i]);
_1a5.push(this.gridModel.task.taskName[i]);
_1a6.push(this.gridModel.task.taskDueDate[i]);
_1a7.push(this.gridModel.task.taskCompleted[i]);
_1a8.push(this.gridModel.task.taskStatus[i]);
_1a9.push(this.gridModel.task.taskReminderEnabled[i]);
}else{
_1aa.push(this.gridModel.task.taskCalId[i]);
_1ab.push(this.gridModel.task.taskUId[i]);
_1ac.push(this.gridModel.task.taskName[i]);
_1ad.push(this.gridModel.task.taskDueDate[i]);
_1ae.push(this.gridModel.task.taskCompleted[i]);
_1af.push(this.gridModel.task.taskStatus[i]);
_1b0.push(this.gridModel.task.taskReminderEnabled[i]);
}
}
this.gridModel.task.taskCalId=_1a3;
this.gridModel.task.taskUId=_1a4;
this.gridModel.task.taskName=_1a5;
this.gridModel.task.taskDueDate=_1a6;
this.gridModel.task.taskCompleted=_1a7;
this.gridModel.task.taskStatus=_1a8;
this.gridModel.task.taskReminderEnabled=_1a9;
for(var j=0;j<_1aa.length;j++){
this.gridModel.task.taskCalId.push(_1aa[j]);
this.gridModel.task.taskUId.push(_1ab[j]);
this.gridModel.task.taskName.push(_1ac[j]);
this.gridModel.task.taskDueDate.push(_1ad[j]);
this.gridModel.task.taskCompleted.push(_1ae[j]);
this.gridModel.task.taskStatus.push(_1af[j]);
this.gridModel.task.taskReminderEnabled.push(_1b0[j]);
}
},openMoreDetailCard:function(){
if(this.moreDetailCard){
if(this.moreDetailCard.isShowing()){
this.moreDetailCard.closeCard();
}
}else{
this.moreDetailCard=_1.widget.createWidget("ws:TaskPanelMoreDetailCard",{model:this.model,taskPanel:this},_1.body(),"first");
}
if(_1.html.getClass(this.addTaskInputNode)=="default"){
this.moreDetailCard.openPopUp(null,null,true,this.addTaskInputNode,{"TL":"TR"},[12,0]);
}else{
this.moreDetailCard.openPopUp(this.addTaskInputNode.value,null,true,this.addTaskInputNode,{"TL":"TR"},[12,0]);
}
if(this.addTaskInputNode.value!=""){
if(this.addTaskInputNode.value!=this.addTaskInputNodeDefaultValue){
_1.html.removeClass(this.addTaskInputNode,"default");
}
}
this.gridModel.modelUpdated();
},onContextMenu:function(evt){
var _1b4=this.getRightClickMenu();
if(_1b4.isShowingNow){
_1b4.close();
}
this.rightClickMenu.rowIndex=evt.rowIndex;
var _1b5=this.gridModel.task.taskCompleted[evt.rowIndex];
this.rightClickMenu.children[3].setDisabled(_1b5);
this.rightClickMenu.children[4].setDisabled(!_1b5);
_1b4.open(evt.pageX,evt.pageY,null,[]);
evt.preventDefault();
evt.stopPropagation();
},getRightClickMenu:function(){
if(!this.rightClickMenu){
var _1b6=[{caption:Config.Strings.Edit,onClick:ws.lang.hitch(this,"editTaskFromMenu")},{caption:Config.Strings.Delete,onClick:ws.lang.hitch(this,"deleteTaskFromMenu")},{separator:true},{caption:Config.Strings.MarkToDoComplete,onClick:ws.lang.hitch(this,"markCompleteFromMenu")},{caption:Config.Strings.MarkToDoIncomplete,onClick:ws.lang.hitch(this,"markIncompleteFromMenu")},{separator:true},{caption:Config.Strings.NewToDo,onClick:ws.lang.hitch(this,"openMoreDetailCard")}];
this.rightClickMenu=ws.widget.createMenu(_1b6);
}
return this.rightClickMenu;
},deleteTaskFromMenu:function(){
this.deleteTask(this.rightClickMenu.rowIndex);
},editTaskFromMenu:function(){
this.editTask(this.rightClickMenu.rowIndex);
},markCompleteFromMenu:function(){
this.markComplete(this.rightClickMenu.rowIndex);
},markIncompleteFromMenu:function(){
this.markIncomplete(this.rightClickMenu.rowIndex);
}});
_1.provide("ws.panels.TaskPanelMoreDetailCard");
_1.require("dojo.html.display");
_1.require("dojo.html.iframe");
_1.require("dojo.io.*");
_1.require("dojo.widget.*");
_1.require("ws.calendar.CalendarViewModel");
_1.require("ws.date");
_1.require("ws.widget.ListView");
_1.require("ws.widget.util");
_1.require("ws.calendar.calutil");
_1.widget.defineWidget("ws.panels.TaskPanelMoreDetailCard",_1.widget.HtmlWidget,{templateString:"<div class=\"taskPanelMoreDetailCard\" style=\" display:none;\">\r\n\t  \t<div>\r\n        <img src=\"${spacer}\" class=\"closeButton\" dojoAttachEvent=\"onClick: closeCard\">\r\n\t    </div>\r\n\t  \t<div class=\"taskNameTd\">\r\n            <input dojoAttachPoint=\"taskNameInput\" maxlength=\"100\" class=\"taskNameInput default\" dojoAttachEvent=\"onFocus: onFocus; onBlur: onBlur; onKeyPress: onKeyPressInput;\">\r\n        </div>\r\n\t    <div class=\"dueDateTd\">\r\n\t        <label>${DueDate}: </label><input dojoAttachPoint=\"dueDateInput\" class=\"dueDateInputDefault\" dojoAttachEvent=\"onBlur: reminderOnBlur; onFocus: reminderOnFocus; onChange: onChange; onKeyPress: onKeyPressInput;\"/></td>\r\n\t    </div>\r\n\t\t<div  dojoAttachPoint=\"noteAndReminderRow\" class=\"linkTd\">\r\n\t\t\t<nobr>\r\n\t        <span style=\"padding-top:4px; padding-left:-1px; font-family:Arial; float:left; font-size:11px;\">${Panel_TodoPanel_Add}${Panel_TodoPanel_Hyphen}&nbsp;</span>\r\n            <span dojoAttachPoint=\"addNoteLink1\" class=\"wsLink addNoteLink\" dojoAttachEvent=\"onClick: addNote\">${Panel_TodoPanel_Note}</span>\r\n            <span dojoAttachPoint=\"addNoteComma\"  class=\"addNoteLink\" >${Panel_TodoPanel_Comma}&nbsp;</span>\r\n            <span dojoAttachPoint=\"addReminderLink1\" class=\"wsLink addNoteLink\" dojoAttachEvent=\"onClick: addReminder\">${Panel_TodoPanel_Reminder}</span>\t\t    \r\n\t\t\t</nobr>\r\n        </div>\r\n    \r\n\t\t <div dojoAttachPoint=\"addNoteInputRow2\" class=\"addNoteInputTd\">    \r\n\t\t<textarea dojoAttachEvent=\"onClick:changeDefaultTextForNote\" dojoAttachPoint=\"addNoteInput2\" class=\"addNoteInputDefault\"></textarea>\r\n\t</div>    \r\n    <div dojoAttachPoint=\"reminderCheckBoxRow\" class=\"reminderCheckBoxRowTd\">\r\n\t    <input type=\"checkbox\" dojoAttachPoint=\"reminderCheckBox\" dojoAttachEvent=\"onChange: reminderOnChange\" style=\"vertical-align:middle;\"/>\r\n\t    <label dojoAttachPoint=\"reminderLabel\"> ${RemindMeAt}</label>\r\n\t</div>\r\n\t<div dojoAttachPoint=\"reminderDetailsRow\" class=\"reminderDetailsRowTd\">\r\n\t    <!--<img src=\"${spacer}\" class=\"reminderIcon\">-->\r\n\t    <input class=\"reminderTimeSelectDefault\" dojoAttachPoint=\"reminderTimeSelect\" />\t\t\t\t\t\t\r\n\t    <ul dojoType=\"ws:WSSelect\" className=\"dueDateSelectDefault\" dojoAttachPoint=\"dueDateSelect\">\r\n\t\t\t        <li value=\"Default\">${OnDueDate}</li>\r\n\t\t\t\t\t<li value=\"OneDayBefore\">1 ${DayBefore}</li>\r\n\t\t\t\t\t<li value=\"TwoDaysBefore\">2 ${DaysBefore}</li>\r\n\t\t\t\t\t<li value=\"OneWeekBefore\">1 ${WeekBefore}</li>\r\n\t\t</ul>\r\n\t\t\t\r\n\t</div>\r\n    <div dojoAttachPoint=\"addNoteInputRow\" class=\"addNoteInputTd\">    \r\n\t\t<textarea dojoAttachEvent=\"onClick:changeDefaultTextForNote\" dojoAttachPoint=\"addNoteInput\" class=\"addNoteInputDefault\" wrap=\"virtual\"></textarea>\r\n\t</div>\r\n\t<div dojoAttachPoint=\"noteLinkRow\" class=\"linkTd\">\r\n\t    <span style=\"padding-top:4px; padding-left:-1px; font-family:Arial; float:left; font-size:11px;\">${Panel_TodoPanel_Add}${Panel_TodoPanel_Hyphen}</span>\r\n        <span dojoAttachPoint=\"addNoteLink2\" class=\"wsLink addNoteLink\" dojoAttachEvent=\"onClick: addNote\">${Panel_TodoPanel_Note}</span>        \r\n    </div>\r\n    <div dojoAttachPoint=\"reminderLinkRow\" class=\"linkTd\"\">\r\n\t    <span style=\"padding-top:4px; padding-left:-1px; font-family:Arial; float:left; font-size:11px;\">${Panel_TodoPanel_Add}${Panel_TodoPanel_Hyphen}</span>\r\n        <span dojoAttachPoint=\"addReminderLink2\" class=\"wsLink addNoteLink\" dojoAttachEvent=\"onClick: addReminder\">${Panel_TodoPanel_Reminder}</span>\t\t    \r\n    </div>\r\n     <div dojoType=\"ws:WSButton\" vizType=\"Blue\" className=\"addButton\" dojoAttachEvent=\"onClick: addTask\">${AddItem}\r\n    </div>\r\n\t<div dojoType=\"ws:PopupDatePicker\" dojoAttachPoint=\"dueDatePopupPicker\" hidePickerOnSetDate=\"true\" toggle=\"wipe\" toggleDuration=\"150\" closeOnMouseOut=\"true\" width=\"150\">\r\n\t<div dojoType=\"ws:PopupTimePicker\" dojoAttachPoint=\"eventTimePopupPicker\" toggle=\"wipe\" toggleDuration=\"150\" closeOnMouseOut=\"true\"></div>\r\n  </div>\r\n  \t<span style=\"clear: both;\"></span>\r\n</div>\r\n",templateCssString:".taskPanel\r\n{\r\n\t\r\n}\r\n\r\n.taskPanel input\r\n{\r\n\tmargin: 5px;\r\n\tpadding-left: 6px;\r\n\tfloat:left;\r\n\twidth: 70%;\r\n\tborder: 1px solid #85817c;\r\n}\r\n\r\n.taskPanel input.default \r\n{\r\n\tcolor: #A5A5A5;\r\n}\r\n\r\n.taskPanel .moreDetailLink\r\n{\r\n\tmargin: 2px 6px 0px 3px;\r\n\tfloat: right;\r\n\tfont: normal 11px Arial;\r\n\tpadding: 0px 0px 10px 11px;\r\n}\r\n\r\n.taskPanel .completedTask .turbogrid-cell\r\n{\r\n\tcolor: #D8D6D3;\r\n\t\r\n}\r\n\r\n.taskPanel .default .turbogrid-cell\r\n{\r\n\tfont-family: Arial;\r\n\tfont-size: 12px;\r\n}\r\n\r\n.taskPanel .deleteTaskIcon\r\n{\r\n\twidth: 12px;\r\n\theight: 12px;\r\n\tbackground: url(\"${images}main.gif\") -1395px -1px;\r\n\t\r\n}\r\n\r\n.taskPanel .deleteTaskIcon:hover\r\n{\r\n\tbackground-position: -1410px -1px;\r\n}\r\n\r\n.taskPanel .reminderIcon\r\n{\r\n\r\n\twidth: 14px;\r\n\theight: 12px;\r\n\tbackground: url(\"${images}main.gif\") -1284px -53px;\r\n\tmargin-bottom:-2px;\r\n\t\r\n}\r\n\r\n.taskPanel .addTaskImageDefault\r\n{\r\n\tleft: 125px;\r\n\r\n\t\r\n\tbackground-repeat: no-repeat;\r\n\tcursor: pointer;\r\n\t\r\n\twidth: 16px;\r\n\theight: 16px;\r\n\tbackground: url(\"${images}main.gif\") -1236px -1px;\r\n\tmargin: 7px 0px 0px 2px;\r\n}\r\n\r\n.taskPanel .addTaskImageEnabled\r\n{\r\n\tleft: 125px;\r\n\r\n\t\r\n\tbackground-repeat: no-repeat;\r\n\tcursor: pointer;\r\n\t\r\n\twidth: 16px;\r\n\theight: 16px;\r\n\tbackground: url(\"${images}main.gif\") -1190px -1px;\r\n\tmargin: 7px 0px 0px 2px;\r\n\r\n}\r\n\r\n.taskPanel .addTaskImageEnabled:hover\r\n{\r\n\tbackground-position: -1213px -1px;\r\n}\r\n\r\n\r\n.taskPanel .turbogrid-scrollbox \r\n{\r\n\tborder: none;\r\n}\r\n\r\n\r\n/*\r\n * TaskPanelMoreDetailCard\r\n */\r\n.taskPanelMoreDetailCard\r\n{\r\n\twidth: 245px;\r\n\theight:auto;\r\n\tbackground-color: #FFFFFF;\r\n\tborder: 1px solid #8A8A8A;\r\n\tz-index: 800;\r\n\tposition: absolute;\r\n\tpadding: 3px 3px 0px 3px;\r\n\toverflow: auto;\t/* Fixes the Firefox no-blinking-cursor bug */\r\n}\r\n \r\n.taskPanelMoreDetailCard. label\r\n{\r\n\tvertical-align: middle;\r\n\tcolor: #A5A5A5;\r\n }\r\n\r\n.taskPanelMoreDetailCard .reminderTimeSelect\r\n{\r\n\tmargin-top:-5px;\r\n\tfloat:left;\r\n }\r\n\r\n.taskPanelMoreDetailCard .dueDateSelect\r\n{\r\n\tmargin-top:-5px;\r\n\t_margin-top:1px;\r\n\tfloat:left; \t\r\n}\r\n\r\n.taskPanelMoreDetailCard input.reminderTimeSelectDefault\r\n{\r\n\tborder: 1px #A5A5A5 solid; \r\n\tmargin-left:4px; \r\n\tmargin-top:-5px;\r\n\tfont-size:11px; \r\n\tfloat:left; \r\n\theight:16px; \r\n\twidth:50px; \r\n\t_margin-left:0px;\r\n\t_padding-top:0px; \r\n\t_padding-left:-5px; \r\n\t_margin-top:1px; \r\n\t\t\r\n}\r\n.taskPanelMoreDetailCard .dueDateSelectDefault\r\n{\r\n\tmargin-top:-5px;\r\n\tcolor: #A5A5A5;\r\n\tfloat:left;\r\n\t_margin-top:1px;\r\n\t\r\n}\r\n.taskPanelMoreDetailCard .closeButton \r\n{\r\n\t_zoom:1;\r\n\twidth: 12px;\r\n\theight: 12px;\r\n\tcursor: pointer;\r\n\tfloat: right;\r\n\tbackground: url(\"${images}main.gif\") -1425px -1px;\r\n}\r\n\r\n.taskPanelMoreDetailCard .closeButton:hover \r\n{\r\n\tbackground-position: -1440px -1px;\r\n}\r\n\r\n.taskPanelMoreDetailCard .default \r\n{\r\n\tcolor: #A5A5A5;\r\n}\r\n\r\n.taskPanelMoreDetailCard input.default \r\n{\r\n\tcolor: #A5A5A5;\r\n\tpadding-left: 6px;\r\n}\r\n\r\n.taskPanelMoreDetailCard label.default \r\n{\r\n\tcolor: #A5A5A5;\r\n}\r\n\r\n.taskPanelMoreDetailCard .taskNameInput \r\n{\r\n\theight:auto;\t\r\n\twidth: 90%;\r\n\tborder: 1px solid #8A8A8A;\r\n\tpadding-left: 6px;\t\r\n}\r\n\r\n.taskPanelMoreDetailCard .dueDateInputDefault \r\n{\r\n\theight:auto;\t\t\r\n\twidth:40%;\r\n\tborder: 1px solid #8A8A8A;\r\n\tpadding-left: 6px;\r\n\tcolor:#A5A5A5;\r\n\t\r\n}\r\n\r\n.taskPanelMoreDetailCard .dueDateInput \r\n{\r\n\theight:auto;\t\t\r\n\twidth:40%;\r\n\tborder: 1px solid #8A8A8A;\r\n\tpadding-left: 6px;\r\n\r\n\t\r\n}\r\n\r\n.taskPanelMoreDetailCard .taskNameTd \r\n{\r\n\tpadding-left:16px;\r\n\tpadding-top:10px;\r\n}\r\n\r\n.taskPanelMoreDetailCard .dueDateTd\r\n{\r\n\tpadding-left:5px; \r\n\twidth:89%; \r\n\tmargin:20px 0px 12px 12px;\r\n\t\r\n}\r\n\r\n.taskPanelMoreDetailCard .linkTd\r\n{\r\n\tfloat:left; \r\n\tpadding-left:5px;\r\n\twidth:89%; \r\n\tmargin:14px 0px 12px 12px;\r\n\t\r\n}\r\n.taskPanelMoreDetailCard .addNoteInputTd\r\n{\r\n\tfloat:left; \r\n\tpadding-left: 10px; \r\n\tpadding-right: 10px;\r\n}\r\n\r\n.taskPanelMoreDetailCard .reminderCheckBoxRowTd\r\n{\r\n\twidth:89%; \r\n\tmargin:14px 0px 12px 12px;\r\n}\r\n.taskPanelMoreDetailCard .reminderDetailsRowTd\r\n{\r\n\twidth:89%; \r\n\tmargin:14px 0px 12px 12px;\r\n}\r\n\r\n.taskPanelMoreDetailCard .wsLink\r\n{\r\n\tfont-size: 11px;\t\r\n}\r\n\r\n.taskPanelMoreDetailCard .addNoteLink \r\n{\t\r\n\tfloat: left;\r\n\tfont-size: 11px;\r\n\tpadding-top: 4px;\r\n}\r\n\r\n.taskPanelMoreDetailCard .addNoteInput\r\n{\r\n\tborder: 1px solid #8A8A8A;\r\n\twidth: 200px;\r\n\theight: 60px;\r\n\tmargin-left:5px;\r\n\tpadding-left: 2px;\r\n}\r\n\r\n.taskPanelMoreDetailCard .addNoteInputDefault\r\n{\r\n\tborder: 1px solid #8A8A8A;\r\n\twidth: 200px;\r\n\theight: 60px;\r\n\tmargin-left:5px;\r\n\tcolor:#A5A5A5;\r\n\tpadding-left: 2px;\r\n}\r\n\r\n.taskPanelMoreDetailCard .addButton \r\n{\r\n\tmargin-top: -2px;\r\n\tfloat:right;\r\n\tpadding-top:10px;\r\n\tpadding-bottom:10px\r\n}\r\n.taskPanelMoreDetailCard .linkStr \r\n{\r\n\tpadding-top:4px; \r\n\tpadding-left:-1px; \r\n\tfont-family:Arial; \r\n\tfloat:left; \r\n\tfont-size:11px;\r\n}\r\n\r\n/*\r\n * TaskPanelEditDetailCard\r\n */\r\n\r\n.taskPanelEditDetailCard\r\n{\r\n\twidth: 245px;\r\n\theight:auto;\r\n\tbackground-color: #FFFFFF;\r\n\tborder: 1px solid #8A8A8A;\r\n\tz-index: 800;\r\n\tposition: absolute;\r\n\tpadding: 3px 3px 0px 3px;\r\n\toverflow: auto;\t/* Fixes the Firefox no-blinking-cursor bug */\r\n}\r\n\r\n.taskPanelEditDetailCard. label\r\n{\r\nvertical-align: middle;\r\ncolor: #A5A5A5;\r\n}\r\n\r\n.taskPanelEditDetailCard input.reminderTimeSelect\r\n{\r\n\tmargin-top:-5px;\r\n\tfloat:left;\t\r\n\twidth:50px;\r\n}\r\n\r\n.taskPanelEditDetailCard .dueDateSelect\r\n{\r\n\tmargin-top:-5px;\r\n\t_margin-top:1px;\r\n\tfloat:left;\t\r\n}\r\n\r\n.taskPanelEditDetailCard input.reminderTimeSelectDefault\r\n{\r\n\tborder: 1px #A5A5A5 solid; \r\n\tmargin-left:4px; \r\n\tmargin-top:-5px;\r\n\tfont-size:11px; \r\n\tfloat:left; \r\n\theight:16px; \r\n\twidth:50px; \r\n\t_margin-left:0px;\r\n\t_padding-top:0px; \r\n\t_padding-left:-5px; \r\n\t_margin-top:1px; \r\n\t\t\r\n}\r\n\r\n.taskPanelEditDetailCard .dueDateSelectDefault\r\n{\r\n\tmargin-top:-5px;\r\n\tcolor: #A5A5A5;\r\n\tfloat:left;\r\n\t_margin-top:1px;\r\n}\r\n\r\n.taskPanelEditDetailCard .closeButton \r\n{\r\n\twidth: 12px;\r\n\theight: 12px;\r\n\tcursor: pointer;\r\n\tfloat: right;\r\n\tbackground: url(\"${images}main.gif\") -1425px -1px;\r\n}\r\n.taskPanelEditDetailCard .closeButton:hover \r\n{\r\n\tbackground-position: -1440px -1px;\r\n}\r\n\r\n.taskPanelEditDetailCard input.default \r\n{\r\n\tcolor: #A5A5A5;\r\n\tpadding-left: 6px;\r\n}\r\n\r\n.taskPanelEditDetailCard label.default \r\n{\r\n\tcolor: #A5A5A5;\r\n}\r\n.taskPanelEditDetailCard .taskNameInput \r\n{\r\n\theight:auto;\t\r\n\twidth: 90%;\r\n\tborder: 1px solid #8A8A8A;\r\n\tpadding-left: 6px;\r\n}\r\n\r\n.taskPanelEditDetailCard .dueDateInput \r\n{\r\n\theight:auto;\t\t\r\n\twidth:50%;\r\n\tborder: 1px solid #8A8A8A;\r\n\tpadding-left: 6px;\t\r\n}\r\n\r\n.taskPanelEditDetailCard .dueDateInputDefault \r\n{\r\n\theight:auto;\t\t\r\n\twidth:50%;\r\n\tborder: 1px solid #8A8A8A;\r\n\tpadding-left: 6px;\r\n\tcolor:#A5A5A5;\r\n\t\r\n}\r\n\r\n.taskPanelEditDetailCard .taskNameTd \r\n{\r\n\tpadding-left:16px;\r\n\tpadding-top:10px;\t\r\n}\r\n\r\n.taskPanelEditDetailCard .dueDateTd\r\n{\r\n\tpadding-left:5px;\r\n\twidth:89%; \r\n\tmargin:20px 0px 12px 12px;\t\r\n}\r\n\r\n.taskPanelEditDetailCard .linkTd\r\n{\r\n\tfloat:left; \r\n\tpadding-left:5px;\r\n\twidth:89%; \r\n\tmargin:14px 0px 12px 12px;\r\n\t\r\n}\r\n.taskPanelEditDetailCard .addNoteInputTd\r\n{\r\n\tfloat:left; \r\n\tpadding-left: 10px; \r\n\tpadding-right: 10px;\r\n}\r\n\r\n.taskPanelEditDetailCard .reminderCheckBoxRowTd\r\n{\r\n\twidth:89%; \r\n\tmargin:14px 0px 12px 12px;\r\n}\r\n.taskPanelEditDetailCard .reminderDetailsRowTd\r\n{\r\n\twidth:89%; \r\n\tmargin:14px 0px 12px 12px;\r\n}\r\n\r\n.taskPanelEditDetailCard .addNoteLink \r\n{\r\n\tfloat: left;\r\n\tfont-size: 11px;\r\n\tpadding-top: 4px;\t\r\n}\r\n\r\n.taskPanelEditDetailCard .addNoteInput\r\n{\r\n\tborder: 1px solid #8A8A8A;\r\n\twidth: 200px;\r\n\theight: 60px;\r\n\tmargin-left:5px;\r\n\tpadding-left: 2px;    \r\n}\r\n.taskPanelEditDetailCard .addNoteInputDefault\r\n{\r\n\tborder: 1px solid #8A8A8A;\r\n\twidth: 200px;\r\n\theight: 60px;\r\n\tmargin-left:5px;\r\n\tcolor:#A5A5A5;\r\n\tpadding-left: 2px;\r\n}\r\n.taskPanelEditDetailCard .updateButton \r\n{\r\n\tmargin-top: -2px;\r\n\tfloat:right;\r\n\tpadding-top:10px;\r\n\tpadding-bottom:10px\r\n}\r\n\r\n.taskPanelEditDetailCard .updateButtonTd\r\n{\r\n\tpadding-left:151px;\t\r\n}\r\n\r\n\r\n.taskPanelEditDetailCard .reminderTimeSelectTd\r\n{\r\n\tpadding-left:0px;\r\n\tfloat:left;\r\n\r\n}\r\n\r\n.taskPanelEditDetailCard .reminderIcon\r\n{\r\n\twidth: 15px;\r\n\theight: 18px;\r\n\tcursor: pointer;\r\n\tbackground: url(\"${images}main.gif\") -1285px -53px;\r\n\tmargin-top:-2px;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/panels/TaskPanel.css"),widgetsInTemplate:true,isContainer:false,taskPanel:null,model:null,taskName:null,dateHasBeenChosen:false,taskNameInputDefaultValue:Config.Strings.EnterTask,dueDateDefaultValue:Config.Strings.Optional,noteDefaultValue:Config.Strings.Panel_TodoPanel_EnterNote,reminderFlag:false,timeFormat:Config.Strings.CalTimeFormatRange1,timeFormatShort:Config.Strings.CalTimeFormatRange2,dueDateItems:["Default","OneDayBefore","TwoDaysBefore","OneWeekBefore"],initializer:function(){
this.moreDetailsRows=[];
this.reminderRows=[];
},defaultView:function(){
_1.html.hide(this.addNoteInputRow2);
_1.html.hide(this.addNoteInputRow);
_1.html.hide(this.noteLinkRow);
_1.html.hide(this.reminderLinkRow);
_1.html.hide(this.reminderCheckBoxRow);
_1.dom.insertAfter(this.reminderDetailsRow,this.reminderCheckBoxRow);
this.domNode.removeChild(this.reminderDetailsRow);
_1.html.show(this.noteAndReminderRow);
if(false==Config.ShowReminderTask){
_1.html.hide(this.addReminderLink1);
_1.html.hide(this.addNoteComma);
_1.html.hide(this.reminderLinkRow);
}
},postCreate:function(){
this.dueDateInput.onclick=ws.lang.hitch(this,"showDueDatePopupPicker",this.dueDateInput);
this.dueDateInput.onfocus=ws.lang.hitch(this,"showDueDatePopupPicker",this.dueDateInput);
_1.event.connect(this.dueDatePopupPicker.datePicker,"selectDateConnect",this,"fillInDateField");
this.reminderTimeSelect.onclick=ws.lang.hitch(this,"showTimePicker",this.reminderTimeSelect);
_1.event.connect(this.eventTimePopupPicker.timePicker,"selectTimeConnect",this,"fillInTimeField");
_1.event.connect(this.dueDateSelect,"valueChanged",this,"dueDateSelected");
this.defaultView();
if(!Config.ShowReminderTask&&this.reminderRows!=null){
_1.lang.forEach(this.reminderRows,function(row){
_1.html.hide(row);
});
}
},getAddTaskArgs:function(){
var args=this.model.getDefaultTaskArgs();
args.sortBy="TodoStatus";
args.sortDir="Ascending";
return args;
},showTimePicker:function(_1b9){
_1.debug("showTimePicker");
if(!this.eventTimePopupPicker.isShowingNow){
this.eventTimePopupPicker.open(_1b9,this,_1b9,{"BL":"TL"});
var _1ba=new Date();
var _1bb=ws.date.ParseHourMinTextField(_1b9.value,this.timeFormat,this.timeFormatShort);
if(_1bb!=null){
_1ba.setHours(_1bb.hr,_1bb.min);
this.eventTimePopupPicker.setTime(_1ba);
}else{
this.eventTimePopupPicker.setTime();
}
}
},addTask:function(){
_1.debug("TaskPanelMoreDetailCard: addTask");
var _1bc=this.taskNameInput.value;
_1bc=ws.panels.TaskPanelUtil.TrimWhiteSpace(_1bc);
var _1bd=false;
var _1be=false;
var _1bf=false;
if(_1bc!=""&&this.isAddTaskEnabled()){
var args=this.getAddTaskArgs();
args.summary=_1bc;
if(this.taskPanel){
this.taskPanel.addTaskFlag=true;
}
var _1c1=new Date();
args.start=ws.date.formatISO8601(_1c1);
var date=ws.panels.TaskPanelUtil.TrimWhiteSpace(this.dueDateInput.value);
if(date!=""&&!_1.html.hasClass(this.dueDateInput,"dueDateInputDefault")){
var _1c3=null;
var _1c4=null;
if(this.reminderCheckBox.checked&&this.reminderFlag){
var _1c5=ws.date.ParseHourMinTextField(this.reminderTimeSelect.value,this.timeFormat,this.timeFormatShort);
_1c3=_1c5.hr;
_1c4=_1c5.min;
}
var _1c6=ws.panels.TaskPanelUtil.ValidateDate(date,_1c3,_1c4,Config.Strings.DateYear,this.model.currentServerTime);
if(_1c6.isValidDate){
var _1c7=_1c6.oDate;
if(_1c3!=null){
if(!_1c6.isDateInPast){
args.end=ws.date.formatISO8601(_1c7);
args.start=args.end;
args.reminderEnabled=true;
args.reminderLeadTime=ws.panels.TaskPanelUtil.GetLeadTimeInMinutes(this.dueDateSelect.currentValue);
if(_1c7<_1c1){
args.start=args.end;
}
_1be=true;
}else{
_1be=false;
_1bf=true;
}
}else{
_1be=true;
args.reminderEnabled=false;
args.reminderLeadTime=0;
args.end=ws.date.formatISO8601(_1c7);
if(_1c7<_1c1){
args.start=args.end;
}
}
}else{
ws.widget.OkCancelDialog.alert(Config.Strings.InvalidDateOnCreate);
}
}else{
_1be=false;
if(this.noteFlag==1){
args.description=this.addNoteInput.value;
}
if(this.noteFlag==2){
args.description=this.addNoteInput2.value;
}
args.end=null;
args.reminderEnabled=false;
args.reminderLeadTime=0;
args.start=ws.date.formatISO8601(new Date());
_1.debugShallow(args);
args.loadCallback=_1.lang.hitch(this,function(){
_1.event.topic.publish("WSFeedbackStart",Config.Strings.ToDoCreated,true);
});
this.model.saveComponent(args);
this.closeCard();
}
if(_1be){
if(this.noteFlag==1){
args.description=this.addNoteInput.value;
}else{
if(this.noteFlag==2){
args.description=this.addNoteInput2.value;
}
}
if(this.reminderCheckBox.checked){
args.reminderEnabled=true;
args.reminderLeadTime=ws.panels.TaskPanelUtil.GetLeadTimeInMinutes(this.dueDateSelect.currentValue);
}else{
args.reminderEnabled=false;
}
if(args.end.length==0){
args.start=ws.date.formatISO8601(new Date());
}
args.start=args.end;
_1.debugShallow(args);
args.loadCallback=_1.lang.hitch(this,function(){
_1.event.topic.publish("WSFeedbackStart",Config.Strings.ToDoCreated,true);
});
this.model.saveComponent(args);
this.closeCard();
}
if(_1bf){
ws.widget.OkCancelDialog.alert(Config.Strings.InvalidReminderDateInPastOnCreate);
}
}
},isAddTaskEnabled:function(){
if(_1.html.hasClass(this.taskNameInput,"default")){
return false;
}else{
return true;
}
},addReminder:function(){
this.openReminder();
},openReminder:function(){
this.enableReminderRow(true);
},closeReminder:function(){
},addNote:function(){
this.openNote();
},openNote:function(_1c8){
_1.html.hide(this.noteAndReminderRow);
_1.html.hide(this.noteLinkRow);
if(this.reminderFlag==false){
if(Config.ShowReminderTask){
_1.html.show(this.reminderLinkRow);
}
_1.html.hide(this.addNoteInputRow);
_1.html.show(this.addNoteInputRow2);
this.noteFlag=2;
}else{
_1.html.hide(this.reminderLinkRow);
_1.html.hide(this.addNoteInputRow2);
_1.html.show(this.addNoteInputRow);
this.noteFlag=1;
}
if(_1c8==null){
if(this.noteFlag==1){
this.addNoteInput.value=this.noteDefaultValue;
}else{
if(this.noteFlag==2){
this.addNoteInput2.value=this.noteDefaultValue;
}
}
}else{
this.fillNotes(_1c8);
}
},closeNote:function(){
_1.html.hide(this.addNoteInputRow);
_1.html.hide(this.addNoteInputRow2);
_1.html.show(this.addNoteLink);
this.noteFlag=false;
},showMoreDetails:function(){
this.setMoreDetailsShowing(true);
},setMoreDetailsShowing:function(show){
},reset:function(){
_1.debug("TaskPanelMoreDetailCard: reset");
this.defaultView();
_1.html.addClass(this.taskNameInput,"default");
this.taskNameInput.value=this.taskNameInputDefaultValue;
_1.html.addClass(this.dueDateInput,"dueDateInputDefault");
this.dueDateInput.value=this.dueDateDefaultValue;
this.reminderTimeSelect.value="";
this.reminderCheckBox.checked=false;
this.addNoteInput.value=this.noteDefaultValue;
this.addNoteInput2.value=this.noteDefaultValue;
_1.html.addClass(this.addNoteInput2,"addNoteInputDefault");
_1.html.addClass(this.addNoteInput2,"addNoteInputDefault");
this.reminderFlag=false;
this.noteFlag=false;
},fillInDateField:function(_1ca){
var _1cb=Config.Strings.DateYear;
this.dueDateInput.value=ws.date.formatDateTime(new Date(_1ca),_1cb);
if(this.dueDateInput.value){
this.enableReminderRow();
}else{
if(!this.dateHasBeenChosen){
this.reminderCheckBox.disabled=false;
this.reminderCheckBox.checked=false;
this.disableReminderRow();
this.dateHasBeenChosen=true;
}
}
},fillInTimeField:function(_1cc){
_1.debug("TaskPanelMoreDetailCard:fillInTimeField");
this.reminderTimeSelect.value=_1cc;
},onKeyPressInput:function(evt){
if(evt.keyCode==evt.KEY_ENTER){
this.addTask();
}else{
if(evt.keyCode==evt.KEY_ESCAPE){
_1.html.addClass(this.taskNameInput,"default");
this.taskNameInput.value=this.taskNameInputDefaultValue;
_1.html.addClass(this.dueDateInput,"dueDateInputDefault");
this.dueDateInput.value=this.dueDateInputDefaultValue;
this.dueDatePopupPicker.close();
this.closeCard();
}
}
},reminderOnChange:function(){
if(this.reminderCheckBox.checked){
this.reminderFlag=true;
this.enableReminderRow();
}else{
this.reminderFlag=false;
this.disableReminderRow();
}
},hideReminderRows:function(){
_1.html.hide(this.reminderCheckBoxRow);
_1.dom.insertAfter(this.reminderDetailsRow,this.reminderCheckBoxRow);
this.domNode.removeChild(this.reminderDetailsRow);
},showReminderRows:function(){
_1.html.show(this.reminderCheckBoxRow);
_1.dom.insertAfter(this.reminderDetailsRow,this.reminderCheckBoxRow);
},enableReminderRow:function(_1ce){
var date=ws.panels.TaskPanelUtil.TrimWhiteSpace(this.dueDateInput.value);
if((date!=""&&date!=this.dueDateDefaultValue)||_1ce){
this.reminderCheckBox.disabled=false;
_1.html.removeClass(this.reminderLabel,"default");
this.dueDateSelect.setClass("dueDateSelect");
this.dateHasBeenChosen=true;
if(_1.string.isBlank(this.reminderTimeSelect.value)){
var _1d0=new Date();
_1d0=ws.calendar.calutil.GetNext30MinuteIncrement(_1d0);
var _1d1=ws.date.formatDateTime(_1d0,this.timeFormat);
this.reminderTimeSelect.value=_1d1;
}
}
_1.html.removeClass(this.reminderLabel,"default");
this.dueDateSelect.setClass("dueDateSelect");
this.reminderTimeSelect.enabled=true;
this.dueDateSelect.enabled=true;
this.reminderFlag=true;
_1.html.hide(this.noteAndReminderRow);
_1.html.hide(this.reminderLinkRow);
if(Config.ShowReminderTask){
this.showReminderRows();
}
if(this.noteFlag==false){
_1.html.show(this.noteLinkRow);
}else{
_1.html.hide(this.noteLinkRow);
}
},disableReminderRow:function(){
var date=ws.panels.TaskPanelUtil.TrimWhiteSpace(this.dueDateInput.value);
if(date==this.dueDateDefaultValue||date==""){
this.reminderCheckBox.disabled="disabled";
}
_1.html.addClass(this.reminderLabel,"default");
this.reminderTimeSelect.enabled=false;
this.dueDateSelect.enabled=false;
this.reminderFlag=false;
if(this.noteFlag==false){
_1.html.hide(this.noteLinkRow);
_1.html.hide(this.reminderLinkRow);
_1.html.show(this.noteAndReminderRow);
}else{
_1.html.hide(this.noteLinkRow);
if(Config.ShowReminderTask){
_1.html.show(this.reminderLinkRow);
}
_1.html.hide(this.noteAndReminderRow);
}
this.hideReminderRows();
},reminderOnFocus:function(){
if(_1.html.hasClass(this.dueDateInput,"dueDateInputDefault")){
this.reminderCheckBox.checked=false;
_1.html.removeClass(this.dueDateInput,"dueDateInputDefault");
_1.html.addClass(this.dueDateInput,"dueDateInput");
this.dueDateInput.value="";
}
},reminderOnBlur:function(){
if(this.dueDateInput.value==""&&!this.dueDatePopupPicker.isShowingNow){
this.reminderCheckBox.checked=false;
this.disableReminderRow();
_1.html.addClass(this.dueDateInput,"dueDateInputDefault");
this.dueDateInput.value=this.dueDateDefaultValue;
this.dateHasBeenChosen=false;
}
},openPopUp:function(_1d3,_1d4,_1d5,_1d6,_1d7,_1d8){
this.dueDateInput.value=this.dueDateDefaultValue;
if(_1d4){
this.openNote(_1d4);
}else{
this.closeNote();
}
this.setMoreDetailsShowing(_1d5);
if(_1d3){
_1.html.removeClass(this.taskNameInput,"default");
this.taskNameInput.value=_1d3;
}else{
this.taskNameInput.value=this.taskNameInputDefaultValue;
}
if(_1d6!=null){
_1.html.placeOnScreenAroundElement(this.domNode,_1d6,_1d8,null,_1d7);
}
this.show();
_1.lang.setTimeout(this,function(){
_1.event.connect(document.documentElement,"onmousedown",this,"closeClick");
},0);
},showDueDatePopupPicker:function(_1d9){
if(_1.html.hasClass(this.dueDateInput,"dueDateInputDefault")){
_1.html.removeClass(this.dueDateInput,"dueDateInputDefault");
_1.html.addClass(this.dueDateInput,"dueDateInput");
this.dueDateInput.value="";
}
if(!this.dueDatePopupPicker.isShowingNow){
this.dueDatePopupPicker.open(_1d9,this,_1d9,{"BL":"TL"});
}
},onFocus:function(){
if(this.taskNameInput.value==this.taskNameInputDefaultValue){
this.taskNameInput.value="";
_1.html.removeClass(this.taskNameInput,"default");
}
},onBlur:function(){
if(this.taskNameInput.value==""){
this.taskNameInput.value=this.taskNameInputDefaultValue;
_1.html.addClass(this.taskNameInput,"default");
}
},onChange:function(){
if(this.dueDateInput.value==""&&!this.dueDatePopupPicker.isShowingNow){
this.reminderCheckBox.checked=false;
this.disableReminderRow();
_1.html.addClass(this.dueDateInput,"dueDateInputDefault");
this.dueDateInput.value=this.dueDateDefaultValue;
this.dateHasBeenChosen=false;
}else{
this.reminderCheckBox.removeAttribute("disabled");
this.dateHasBeenChosen=true;
}
},fillNotes:function(_1da){
_1.debug("fillNotes:"+this.noteFlag+":"+_1da);
if(this.noteFlag==1){
if(_1da){
this.addNoteInput.value=_1da;
}
_1.html.replaceClass(this.addNoteInput,"addNoteInput","addNoteInputDefault");
}else{
if(this.noteFlag==2){
if(_1da){
this.addNoteInput2.value=_1da;
}
_1.html.replaceClass(this.addNoteInput2,"addNoteInput","addNoteInputDefault");
}
}
},changeDefaultTextForNote:function(){
_1.debug("changeDefaultTextForNote:"+this.noteFlag);
if(this.noteFlag==1){
if(this.addNoteInput.value==this.noteDefaultValue){
this.addNoteInput.value="";
_1.html.replaceClass(this.addNoteInput,"addNoteInput","addNoteInputDefault");
}
}else{
if(this.noteFlag==2){
if(this.addNoteInput2.value==this.noteDefaultValue){
this.addNoteInput2.value="";
_1.html.replaceClass(this.addNoteInput2,"addNoteInput","addNoteInputDefault");
}
}
}
},dueDateSelected:function(){
this.dueDateClick=true;
},closeClick:function(evt){
_1.debug("closeClick()");
var _1dc=_1.html.overElement(this.domNode,evt);
var _1dd=_1.html.overElement(this.dueDatePopupPicker.domNode,evt);
var _1de=_1.html.overElement(this.eventTimePopupPicker.domNode,evt);
if(!_1dc&&!_1dd&&!_1de&&!this.dueDateClick){
this.closeCard();
}
this.dueDateClick=false;
evt.stopPropagation();
},closeCard:function(){
_1.debug("close()");
_1.event.disconnect(document.documentElement,"onmousedown",this,"closeClick");
this.hide();
this.reset();
}});
_1.provide("ws.pictures.PictureViewControl");
_1.require("dojo.html.common");
_1.require("dojo.html.display");
_1.require("dojo.html.util");
_1.require("dojo.io.common");
_1.require("dojo.io.IframeIO");
_1.require("dojo.widget.*");
_1.require("ws.html");
_1.require("ws.io");
_1.require("ws.widget.util");
_1.widget.defineWidget("ws.pictures.PictureViewControl",_1.widget.HtmlWidget,{templateString:"<div class=\"pictureViewControl\" style=\"position: absolute; font-size: 11px;\">\r\n\t<div dojoAttachPoint=\"filenameNode\"></div>\r\n\t<div style=\"border: solid 1px #0066CC; padding: 3px 5px;\">\r\n\t\t<a href=\"#\" dojoAttachPoint=\"viewFullSizeNode\" style=\"text-decoration: none; color: #0066CC;\">${YGP_ViewFullSize}</a>\r\n\t\t<span dojoAttachPoint=\"viewFullSizeNodeSep\">&nbsp;|&nbsp;</span>\r\n\t\t<a href=\"#\" dojoAttachPoint=\"saveNode\" style=\"text-decoration: none; color: #0066CC;\">${YGP_SaveOne}</a>\r\n\t\t<span dojoAttachPoint=\"savingNode\" style=\"display: none;\">${YGP_SaveProgress}</span>\r\n\t\t<span dojoAttachPoint=\"saveNodeSep\">&nbsp;|&nbsp;</span>\r\n\t\t<a href=\"#\" dojoAttachPoint=\"downloadNode\" style=\"text-decoration: none; color: #0066CC;\">${YGP_Download}</a>\r\n\t</div>\r\n</div>\r\n",picturesModel:null,image:null,isAttachment:false,filename:"",folder:"",uid:"",postCreate:function(args,frag){
_1.html.setOpacity(this.domNode,0.85);
_1.lang.setTimeout(this,"positionSelf",0);
this.isAttachment=_1.html.hasClass(this.image,"AOLAttachedImage");
this.filename=_1.html.getAttribute(this.image,"filename");
if(this.filename){
this.filenameNode.innerHTML=_1.string.escapeXml(this.filename);
}
_1.event.connect(this.viewFullSizeNode,"onclick",this,"viewFullSize");
_1.event.connect(this.saveNode,"onclick",this,"saveToShoebox");
_1.event.connect(this.downloadNode,"onclick",this,"download");
if(!this.isAttachment){
_1.html.hide(this.domNode);
_1.event.connect(this.domNode,"onmouseover",this,"onMouseOver");
_1.event.connect(this.domNode,"onmouseout",this,"onMouseOut");
_1.event.connect(this.image,"onmouseover",this,"onMouseOverImage");
_1.event.connect(this.image,"onmouseout",this,"onMouseOutImage");
}
if(!Config.EnablePictures||(ws.UserContext.ParentalControls=="Y")){
_1.html.hide(this.saveNode);
_1.html.hide(this.saveNodeSep);
_1.html.hide(this.savingNode);
_1.html.hide(this.viewFullSizeNode);
_1.html.hide(this.viewFullSizeNodeSep);
}
ws.pictures.PictureViewControl.superclass.postCreate.apply(this,arguments);
},viewFullSize:function(evt){
for(var node=this.image;node!=null;node=node.parentNode){
if(node.tagName&&(node.tagName.toLowerCase()=="a")){
break;
}
}
var url=(node==null)?this.image.src:node.href;
ws.io.openWindow(url);
evt.preventDefault();
},saveToShoebox:function(evt){
_1.html.hide(this.saveNode);
_1.html.show(this.savingNode);
var _1e5=_1.html.getAttribute(this.image,"partId");
var _1e6=_1.lang.hitch(this,function(err){
ws.widget.OkCancelDialog.alert(_1.string.isBlank(err)?"Error saving image.":err);
_1.html.hide(this.savingNode);
_1.html.show(this.saveNode);
});
if(_1e5!=null&&this.isAttachment){
this.picturesModel.saveAttachedImages({folder:this.folder,uid:this.uid,partId:parseInt(_1e5),load:_1.lang.hitch(this,function(data){
if(data.pictures[0].status=="failure"){
throw 0;
}
this.savingNode.innerHTML=Config.Strings.YGP_SaveOneDone;
}),error:_1e6});
}else{
this.picturesModel.saveRemoteImage({url:this.image.src,load:_1.lang.hitch(this,function(data){
this.savingNode.innerHTML=Config.Strings.YGP_SaveOneDone;
}),error:_1e6});
}
evt.preventDefault();
},download:function(evt){
var url="";
if(this.isAttachment&&!_1.string.isBlank(this.filename)){
url=this.image.src+"&saveAs="+encodeURIComponent(this.filename);
}else{
url=Config.BaseRpcPagesURL+"DownloadRemoteImage.aspx?url="+encodeURIComponent(this.image.src);
}
var _1ec=_1.io.createIFrame("PictureDownloadFrame",null,Config.EmptyFileURL);
_1.io.setIFrameSrc(_1ec,url,true);
evt.preventDefault();
},positionSelf:function(){
if(this.domNode){
var doc=this.domNode.ownerDocument;
var _1ee=_1.withDoc(doc,_1.html.getAbsolutePosition,_1.html,[this.image,true]);
var _1ef=_1.withDoc(doc,_1.html.getBorderBox,_1.html,[this.image]);
this.domNode.style.left=_1ee.x+"px";
this.domNode.style.top=(_1ee.y+_1ef.height)+"px";
}
},onMouseOverImage:function(evt){
this.positionSelf();
ws.html.showSoon(this.domNode);
},onMouseOutImage:function(evt){
ws.html.hideSoon(this.domNode);
},onMouseOver:function(evt){
ws.html.showSoon(this.domNode);
},onMouseOut:function(evt){
ws.html.hideSoon(this.domNode);
}});
_1.provide("ws.mail.DisplayMessageWidget");
_1.require("dojo.html.display");
_1.require("dojo.html.iframe");
_1.require("dojo.html.selection");
_1.require("dojo.html.style");
_1.require("dojo.io");
_1.require("dojo.string.extras");
_1.require("dojo.widget.*");
_1.require("dojo.widget.ContentPane");
_1.require("dojo.widget.PopupContainer");
_1.require("ws.address.AddressModel");
_1.require("ws.html");
_1.require("ws.io");
_1.require("ws.lang");
_1.require("ws.mail.MessageStatusDialog");
_1.require("ws.reporting");
_1.require("ws.string");
_1.require("ws.widget.BuddyIcon");
_1.require("ws.widget.OkCancelDialog");
_1.require("ws.widget.util");
_1.require("ws.widget.WSButton");
_1.require("ws.widget.WSLayoutContainer");
_1.require("ws.widget.WSMenu");
_1.require("ws.widget.WSToolbar");
_1.widget.defineWidget("ws.mail.DisplayMessageWidget",_1.widget.HtmlWidget,{widgetsInTemplate:true,templateString:"<div style=\"display: none;\"> <!-- We start out with display:none to avoid a layout call at widget creation time. When the\r\n\t\t\t\t\t\t    PageContainer parent shows this widget, it will call show(). -->\r\n\t<div dojoType=\"ws:WSLayoutContainer\" deferred=\"true\" class=\"displayMessage\" dojoAttachPoint=\"layoutWidget\">\r\n\t\t<div layoutAlign=\"top\" dojoType=\"ws:WSToolbar\" dojoAttachPoint=\"toolbar\">\r\n\t\t\t\t<div toolbarPosition=\"left\" dojoType=\"ws:WSButton\" border=\"right\" dojoAttachEvent=\"onClick: reportNotSpam\" dojoAttachPoint=\"notSpamButton\">${NotSpamButton}</div>\r\n\t\t\t\t<div toolbarPosition=\"left\" dojoType=\"ws:WSButton\" border=\"right\" dojoAttachEvent=\"onClick: markUnread\" dojoAttachPoint=\"keepNewButton\">${KeepAsNewActionLabel}</div>\r\n\t\t\t\t<div toolbarPosition=\"left\" dojoType=\"ws:WSSplitDropDownButton\" border=\"right\" dojoAttachEvent=\"onClick: reply; onMouseDown: saveSelection\" dojoAttachPoint=\"comboReplyButton\">${DisplayReply}</div>\r\n\t\t\t\t<div toolbarPosition=\"left\" dojoType=\"ws:WSButton\" border=\"right\" dojoAttachEvent=\"onClick: reply; onMouseDown: saveSelection\" dojoAttachPoint=\"replyButton\">${DisplayReply}</div>\r\n\t\t\t\t<div toolbarPosition=\"left\" dojoType=\"ws:WSButton\" border=\"right\" dojoAttachEvent=\"onClick: replyAll; onMouseDown: saveSelection\" dojoAttachPoint=\"replyAllButton\">${DisplayReplyAll}</div>\r\n\t\t\t\t<div toolbarPosition=\"left\" dojoType=\"ws:WSButton\" border=\"right\" dojoAttachEvent=\"onClick: forward; onMouseDown: saveSelection\">${DisplayForward}</div>\r\n\t\t\t\t<div toolbarPosition=\"left\" dojoType=\"ws:WSButton\" border=\"right\" dojoAttachEvent=\"onClick: unsendMessage\" dojoAttachPoint=\"unsendButton\">${UnsendButton}</div>\r\n\t\t\t\t<div toolbarPosition=\"left\" dojoType=\"ws:WSDropDownButton\" border=\"right\" dojoAttachPoint=\"actionButton\">${ActionButton}</div>\r\n\t\t\t\t<div toolbarPosition=\"left\" dojoType=\"ws:WSButton\" border=\"right\" dojoAttachEvent=\"onClick: deleteMessage\">${DeleteButton}</div>\r\n\t\t\t\t<div toolbarPosition=\"left\" dojoType=\"ws:WSButton\" border=\"right\" dojoAttachEvent=\"onClick: restoreMessage\" dojoAttachPoint=\"restoreButton\">${RestoreButton}</div>\r\n\t\t\t\t<div toolbarPosition=\"left\" dojoType=\"ws:WSButton\" border=\"right\" dojoAttachEvent=\"onClick: reportSpam\" dojoAttachPoint=\"spamButton\">${ReportSpamButton}</div>\r\n\t\t\t\t<div toolbarPosition=\"right\" dojoType=\"dojo:ContentPane\">\r\n\t\t\t\t\t<img src=\"${spacer}\" class=\"prevButton\" dojoAttachPoint=\"prevButtonNode\" dojoAttachEvent=\"onClick: prevMessage\">\r\n\t\t\t\t\t<img src=\"${spacer}\" class=\"nextButton\" dojoAttachPoint=\"nextButtonNode\" dojoAttachEvent=\"onClick: nextMessage\">\r\n\t\t\t\t\t<img src=\"${spacer}\" class=\"backButton\" dojoAttachPoint=\"backButton\" dojoAttachEvent=\"onClick: backToList\">\r\n\t\t\t\t</div>\r\n\t\t</div>\r\n\t\t\r\n\t\t<div dojoType=\"dojo:ContentPane\" layoutAlign=\"top\" >\r\n\t\t\t<div dojoAttachPoint=\"chromeOfficialPane\" class=\"chrome\" style=\"display:none\">\r\n\t\t\t\t<img src=\"${spacer}\" class=\"chromeOfficial\"><span class=\"chromeText\">${AOLOfficialMail}</span>\r\n\t\t\t</div>\r\n\t\t\t<div dojoAttachPoint=\"chromeCertifiedPane\" class=\"chrome\" style=\"display:none\">\r\n\t\t\t\t<img src=\"${spacer}\" class=\"chromeCertified\"><span class=\"chromeText\">${AOLCertifiedMail}</span>\r\n\t\t\t</div>\r\n\t\t\t<div dojoAttachPoint=\"chromePriorityPane\" class=\"chrome\" style=\"display:none\">\r\n\t\t\t\t<img src=\"${spacer}\" class=\"chromeOfficial\"><span class=\"chromeText\">${AOLPriorityMail}</span>\r\n\t\t\t</div>\r\n\t\t\t<div dojoAttachPoint=\"chromeVoicePane\" class=\"chrome\" style=\"display:none\">\r\n\t\t\t\t<img src=\"${spacer}\" class=\"chromeOfficial\"><span class=\"chromeText\">${AOLVoiceMail}</span>\r\n\t\t\t</div>\r\n\t\t\t<div dojoAttachPoint=\"chromeBillPayPane\" class=\"chrome\" style=\"display:none\">\r\n\t\t\t\t<img src=\"${spacer}\" class=\"chromeOfficial\"><span class=\"chromeText\">${AOLBillPayMail}</span>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t\r\n\t\t\r\n\t\t<div dojoType=\"dojo:ContentPane\" layoutAlign=\"top\" class=\"searchInfo\" dojoAttachPoint=\"searchInfoPane\" style=\"display: none;\">\r\n\t\t\t<span class=\"wsLink\" dojoAttachPoint=\"searchInfoNode\" dojoAttachEvent=\"onClick: backToList\"></span>\r\n\t\t</div>\r\n\r\n\t\t<div dojoType=\"dojo:ContentPane\" dojoAttachPoint=\"removedImagesPane\" class=\"removedImages\" layoutAlign=\"top\" style=\"display: none;\">\r\n\t\t\t${RestoreImages}\r\n\t\t\t<span class=\"wsLink\" dojoAttachEvent=\"onClick: restoreImages\">${ForThisMessage}</span> |\r\n\t\t\t<span class=\"wsLink\" dojoAttachEvent=\"onClick: restoreImagesAndAddContact\">${AlwaysForThisSender}</span>\r\n\t\t</div>\r\n\t\t\r\n\t\t<div dojoType=\"dojo:ContentPane\" layoutAlign=\"top\" class=\"header\" dojoAttachPoint=\"headerPane\">\r\n\t\t\t<div class=\"buddyIconContainer\" dojoAttachPoint=\"buddyIconContainer\">\r\n\t\t\t\t<div dojoType=\"ws:BuddyIcon\" dojoAttachPoint=\"buddyIcon\"></div>\r\n\t\t\t</div>\r\n\t\t\r\n\t\t\t<div class=\"main\" dojoAttachPoint=\"mainHeaderNode\">\r\n\t\t\t\t<div class=\"linksNode\" dojoAttachPoint=\"headerLinksNode\">\r\n\t\t\t\t\t<nobr class=\"wsLink printLink\" dojoAttachEvent=\"onClick: print\" dojoAttachPoint=\"printLink\">\r\n\t\t\t\t\t\t<img src=\"${spacer}\" class=\"icon\">\r\n\t\t\t\t\t\t${PrintButton}\r\n\t\t\t\t\t</nobr>\r\n\t\t\t\t\t<span class=\"separator\">|</span>\r\n\t\t\t\t\t<nobr class=\"wsLink newWindowLink\" dojoAttachEvent=\"onClick: popOut\" dojoAttachPoint=\"newWindowLink\">\r\n\t\t\t\t\t\t<img src=\"${spacer}\" class=\"icon\">\r\n\t\t\t\t\t\t${NewWindow}\r\n\t\t\t\t\t</nobr>\r\n\t\t\t\t\t<br>\r\n\t\t\t\t\t<nobr class=\"addToLinks\" dojoAttachPoint=\"addToLinksNode\">\r\n\t\t\t\t\t\t${AddTo}\r\n\t\t\t\t\t\t<span dojoAttachPoint=\"addToBlogLink\">\r\n\t\t\t\t\t\t\t<span class=\"wsLink\" dojoAttachEvent=\"onClick: addToBlog; onMouseDown: saveSelection\">${Blog}</span>,\r\n\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t<span class=\"wsLink\" dojoAttachEvent=\"onClick: addToTask; onMouseDown: saveSelection\">${ToDo}</span>,\r\n\t\t\t\t\t\t<span class=\"wsLink\" dojoAttachEvent=\"onClick: addToCalendar; onMouseDown: saveSelection\">${Calendar}</span>\r\n\t\t\t\t\t</nobr>\r\n\t\t\t\t</div>\r\n\t\t\t\t\r\n\t\t\t\t<div dojoAttachPoint=\"subjectContainer\" style=\"float: left;\" class=\"subjectContainer\">\r\n\t\t\t\t\t<span class=\"subject\" dojoAttachPoint=\"subjectNode\"></span>\r\n\t\t\t\t\t<img src=\"${spacer}\" class=\"flag\" dojoAttachPoint=\"flagIcon\" dojoAttachEvent=\"onClick: toggleFlag\">\r\n\t\t\t\t</div>\r\n\t\t\t\t\r\n\t\t\t\t<div dojoAttachPoint=\"shortHeaderContainer\" class=\"shortHeader\" style=\"float: left;\">\r\n\t\t\t\t\t<span dojoAttachPoint=\"shortHeaderNode\"></span>\r\n\t\t\t\t\t<span dojoAttachEvent=\"onClick: toggleFullHeader\" dojoAttachPoint=\"showFullHeaderLink\" class=\"toggleLink wsLink\">${MoreInfo}</span>\r\n\t\t\t\t\t<div style=\"clear: both;\"></div>\r\n\t\t\t\t</div>\r\n\t\t\t\t\r\n\t\t\t\t<div dojoAttachPoint=\"fromRow\" class=\"fieldRow\" style=\"display: none;\">\r\n\t\t\t\t\t<div class=\"label\" dojoAttachPoint=\"fromLabel\">${From}:</div>\r\n\t\t\t\t\t<div dojoAttachPoint=\"fullFromContainer\" class=\"value\">\r\n\t\t\t\t\t\t<span dojoAttachPoint=\"fullFromNode\"></span>\r\n\t\t\t\t\t\t<span dojoAttachEvent=\"onClick: toggleFullHeader\" class=\"toggleLink wsLink\">${Hide}</span>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div style=\"clear: both;\"></div>\r\n\t\t\t\t</div>\r\n\t\t\t\t\r\n\t\t\t\t<div style=\"clear: both;\"></div>\r\n\t\t\t\t\r\n\t\t\t\t<div dojoAttachPoint=\"toRow\" class=\"fieldRow\" style=\"display: none;\">\t\t\t\t\r\n\t\t\t\t\t<div class=\"label\">${To}:</div>\r\n\t\t\t\t\t<div dojoAttachPoint=\"fullToNode\" class=\"addrList value\"></div>\r\n\t\t\t\t\t<div style=\"clear: both;\"></div>\r\n\t\t\t\t</div>\r\n\t\t\t\r\n\t\t\t\t<div dojoAttachPoint=\"ccRow\" class=\"fieldRow\" style=\"display: none;\">\r\n\t\t\t\t\t<div class=\"label\">${Cc}:</div>\r\n\t\t\t\t\t<div dojoAttachPoint=\"fullCcNode\" class=\"addrList value\"></div>\r\n\t\t\t\t\t<div style=\"clear: both;\"></div>\r\n\t\t\t\t</div>\r\n\t\t\t\r\n\t\t\t\t<div dojoAttachPoint=\"bccRow\" class=\"fieldRow\" style=\"display: none;\">\r\n\t\t\t\t\t<div class=\"label\">${Bcc}:</div>\r\n\t\t\t\t\t<div dojoAttachPoint=\"fullBccNode\" class=\"addrList value\"></div>\r\n\t\t\t\t\t<div style=\"clear: both;\"></div>\r\n\t\t\t\t</div>\r\n\t\t\t\r\n\t\t\t\t<div dojoAttachPoint=\"dateRow\" class=\"fieldRow\" style=\"display: none;\">\r\n\t\t\t\t\t<div class=\"label\">${Date}:</div>\r\n\t\t\t\t\t<div dojoAttachPoint=\"fullDateNode\" class=\"value\"></div>\t\r\n\t\t\t\t\t<div style=\"clear: both;\"></div>\r\n\t\t\t\t</div>\r\n\t\t\t\r\n\t\t\t\t<div dojoAttachPoint=\"attachmentsRow\" class=\"fieldRow\" style=\"display: none;\">\r\n\t\t\t\t\t<div class=\"label attachmentsLabel\" dojoAttachPoint=\"attachmentsLabel\"><img src=\"${spacer}\" class=\"attachmentIcon\"></div>\r\n\t\t\t\t\t<div dojoAttachPoint=\"attachmentsContainer\" class=\"value\">\r\n\t\t\t\t\t\t\t<span dojoAttachPoint=\"attachmentsNode\" class=\"attachments\"></span>&nbsp;&nbsp;&nbsp;\r\n\t\t\t\t\t\t\t<nobr class=\"imagesLink wsLink\" dojoAttachPoint=\"saveImagesLink\" dojoAttachEvent=\"onClick: saveImagesToShoebox\" href=\"#\" style=\"display: none;\">${YGP_SaveAll}</nobr>\r\n\t\t\t\t\t\t\t<nobr dojoAttachPoint=\"savingImagesProgressNode\" style=\"display: none;\" class=\"imagesLink\">${YGP_SaveProgress}</nobr>\r\n\t\t\t\t\t\t\t<nobr class=\"imagesLink wsLink\" dojoAttachPoint=\"viewImagesLink\" dojoAttachEvent=\"onClick: viewImagesInShoebox\" href=\"#\" style=\"display: none;\">${YGP_ViewAfterSave}</nobr>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div style=\"clear: both;\"></div>\r\n\t\t\t\t</div>\t\t\t\t\r\n\t\t\t\t<span style=\"clear: both;\"></span>\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t</div>\r\n\r\n\t\t<div dojoType=\"dojo:ContentPane\" layoutAlign=\"client\" class=\"iframeContainer\">\r\n\t\t\t<iframe dojoAttachPoint=\"bodyFrame\" class=\"msgBody\" src=\"about:blank\" frameBorder=\"no\"></iframe>\r\n\t\t</div>\r\n\t\t\r\n\t\t<div dojoType=\"dojo:ContentPane\" dojoAttachPoint=\"feedbackPane\" layoutAlign=\"bottom\" class=\"feedbackPane\" style=\"display: none;\">\r\n\t\t\t<div class=\"feedback\" dojoAttachPoint=\"feedbackNode\"></div>\r\n\t\t</div>\r\n\t</div>\r\n\r\n\t<form dojoAttachPoint=\"addToBlogForm\" action=\"\" method=\"post\">\r\n\t\t<input type=\"hidden\" name=\"cu\" value=\"\">\r\n\t\t<input type=\"hidden\" name=\"js\" value=\"\">\r\n\t\t<input type=\"hidden\" name=\"je\" value=\"\">\r\n\t</form>\r\n\t<img src=\"${spacer}\" dojoAttachPoint=\"addToBlogPreloadImage\" style=\"display:none;\">\r\n</div>\r\n",templateCssString:".displayMessage {\r\n\theight: 100%;\r\n\twidth: 100%;\r\n\tcolor: #000000;\r\n}\r\n\r\n.displayMessage .wsToolbar {\r\n\tpadding-right: 10px;\r\n}\r\n\r\n.displayMessage .header {\r\n\tbackground-color: #f4f2f0;\r\n\tpadding: 0px 10px 10px 10px;\r\n\tborder-bottom: 1px solid #d5d5d5;\r\n\tposition: relative;\r\n}\r\n\r\n.displayMessage .header .buddyIconContainer {\r\n\twidth: 48px;\r\n\tborder: 1px solid #D8D6D3;\r\n\tpadding: 3px;\r\n\tposition: absolute;\r\n\ttop: 3px;\r\n\tleft: 10px;\r\n\tmargin-right: 13px;\r\n}\r\n\r\n.displayMessage .header .main {\r\n\tposition: absolute;\r\n\ttop: 3px;\r\n\tright: 10px;\r\n}\r\n\r\n.displayMessage .header .subjectContainer {\r\n\tpadding-bottom: 6px;\r\n\tmargin-top: 7px;\r\n\toverflow: hidden;\r\n\ttext-overflow: ellipsis;\r\n}\r\n.displayMessage .header .subject {\r\n\tfont-size: 14px;\r\n\tfont-weight: bold;\r\n}\r\n\r\n.displayMessage .header .flag {\r\n\tbackground: url(\"${images}main.gif\") -645px -2px;\r\n\twidth: 14px;\r\n\theight: 10px;\r\n\tcursor: pointer;\r\n\tmargin-left: 5px;\r\n}\r\n.displayMessage .header .flagged {\r\n\tbackground-position: -720px -2px;\r\n}\r\n.displayMessage .header .flag:hover {\r\n\tbackground-position: -765px -2px;\r\n}\r\n\r\n.displayMessage .shortHeader {\r\n\tcolor: #5B5B5B;\r\n\tmargin-bottom: 5px;\r\n\tmargin-top: 4px;\r\n}\r\n.displayMessage .shortHeader .from {\r\n\tcolor: #000000;\r\n\tfont-weight: bold;\r\n}\r\n\r\n.displayMessage .shortHeader .buddyIcon {\r\n\tcursor: pointer;\r\n}\r\n\r\n.displayMessage .shortHeader .buddyIcon:hover {\r\n\ttext-decoration: underline;\r\n}\r\n\r\n.displayMessage .shortHeader .time {\r\n\tcolor: #000000;\r\n}\r\n\r\n.displayMessage .header .toggleLink {\r\n\tfont-weight: bold;\r\n\tpadding-left: 10px;\r\n\tfont-size: 11px;\r\n\twhite-space: nowrap;\r\n\tzoom: 1; /* Computing the offsetTop of the More Info link in updateShortHeader returns 0 unless it has layout. */\r\n}\r\n\r\n.displayMessage .header .addrList {\r\n\toverflow: auto;\r\n}\r\n\r\n.displayMessage .chrome {\r\n\tpadding: 0px 10px;\r\n\theight: 20px;\r\n\tbackground: #4292DC;\r\n\t\r\n}\r\n\r\n.displayMessage .chromeText {\r\n\tcolor: #FFFFFF;\r\n\tfont: 14px arial;\r\n\tfont-weight: bold;\r\n\tpadding-left: 10px;\r\n\tvertical-align: 20%;\r\n}\r\n\r\n.displayMessage .chromeOfficial {\r\n\tbackground:  url(\"${images}main.gif\") -899px -0px;\r\n\tmargin-top: 2px;\r\n\twidth: 16px;\r\n\theight: 16px;\r\n}\r\n.displayMessage .chromeCertified {\r\n\tbackground: url(\"${images}main.gif\") -780px -0px;\r\n\tmargin-top: 2px;\r\n\twidth: 14px;\r\n\theight: 16px;\r\n}\r\n\r\n.displayMessage .linksNode {\r\n\ttext-align: right;\r\n\tfont-size: 11px;\r\n\tfloat: right;\r\n}\r\n\r\n.displayMessage .newWindowLink {\r\n\tmargin-bottom: 6px;\r\n\tline-height: 30px;\r\n}\r\n\r\n.displayMessage .newWindowLink:hover {\r\n\ttext-decoration: none;\r\n}\r\n\r\n.displayMessage .newWindowLink .icon {\r\n\tbackground: url(\"${images}main.gif\") -630px -0px;\r\n\tmargin-bottom: -1px;\r\n\tmargin-left: 3px;\r\n\twidth: 14px;\r\n\theight: 12px;\r\n}\r\n\r\n\r\n.displayMessage .printLink {\r\n\tmargin-bottom: 6px;\r\n\tline-height: 30px;\r\n}\r\n\r\n.displayMessage .printLink:hover {\r\n\ttext-decoration: none;\r\n}\r\n\r\n.displayMessage .printLink .icon {\r\n\tbackground: url(\"${images}main.gif\") -581px -61px;\r\n\tmargin-bottom: -1px;\r\n\tmargin-left: 3px;\r\n\twidth: 18px;\r\n\theight: 14px;\r\n}\r\n\r\n.displayMessage .separator \r\n{\r\n\tcolor:#999999;\r\n\tmargin-left:4px;\r\n\tmargin-right:4px;\r\n}\r\n\r\n.displayMessage .header .fieldRow {\r\n\tmargin-top: 4px;\r\n}\r\n\r\n.displayMessage .header .fieldRow .label {\r\n\twidth: 40px;\r\n\tmargin-right: 4px;\r\n\ttext-align: right;\r\n\tfloat: left;\r\n\tclear: left;\r\n\tdisplay: inline;  /* fixes the IE6 double float margin bug */\r\n}\r\n\r\n.displayMessage .header .fieldRow .value {\r\n\tfloat: left;\r\n\tcolor: #5b5b5b;\r\n}\r\n\r\n.displayMessage .feedbackPane {\r\n\tbackground-color: #C4F198;\r\n\tborder-top: 1px solid #D8D6D3;\r\n\tpadding: 5px 15px;\r\n}\r\n\r\n.displayMessage .feedbackPane .feedback {\r\n\tcolor: #000000;\r\n}\r\n\r\n.displayMessage .attachmentIcon {\r\n\tbackground: url(\"${images}main.gif\") -618px -2px;\r\n\twidth: 7px;\r\n\theight: 11px;\r\n\tmargin-right: 3px;\r\n}\r\n.displayMessage .imagesLink {\r\n\tfont-size: 11px;\r\n}\r\n\r\n.displayMessage .backButton,\r\n.displayMessage .nextButton,\r\n.displayMessage .prevButton {\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\theight: 18px;\r\n\twidth: 18px;\r\n\tmargin: 4px 0px;\r\n\tcursor: pointer;\r\n}\r\n.displayMessage .backButton\t\t\t{ background-position: -1346px -0px; margin: 4px 8px 4px 6px; }\r\n.displayMessage .nextButton\t\t\t{ background-position: -1454px -0px; }\r\n.displayMessage .prevButton\t\t\t{ background-position: -1544px -0px; }\r\n.displayMessage .backButton:hover\t\t{ background-position: -1367px -0px; }\r\n.displayMessage .nextButton:hover\t\t{ background-position: -1484px -0px; }\r\n.displayMessage .prevButton:hover\t\t{ background-position: -1574px -0px; }\r\n.displayMessage .nextButtonDisabled,\r\n.displayMessage .nextButtonDisabled:hover {\r\n\tbackground-position: -1514px -0px;\r\n\tcursor: default;\r\n}\r\n.displayMessage .prevButtonDisabled,\r\n.displayMessage .prevButtonDisabled:hover\r\n{\r\n\tbackground-position: -1604px -0px;\r\n\tcursor: default;\r\n}\r\n\r\n.displayMessage .searchInfo {\r\n\tbackground-color: #c4f198;\r\n\tpadding: 5px 8px;\r\n}\r\n\r\n.displayMessage .removedImages {\r\n\tbackground-color: #ffe097;\r\n\tpadding: 5px 8px;\r\n}\r\n.displayMessage .removedImages .wsLink {\r\n\tmargin: 0px 5px;\r\n}\r\n\r\n.displayMessage .searchInfo span {\r\n\tcursor: pointer;\r\n}\r\n\r\n.displayMessage .iframeContainer {\r\n\tpadding-left: 5px;\r\n}\r\n\r\n.displayMessage .msgBody {\r\n\theight: 100%;\r\n\twidth: 100%;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/mail/DisplayMessageWidget.css"),model:null,picturesModel:null,msgInfo:null,addEditDialog:null,calendarModel:null,extraBodyHtml:"<style>.AOLWebSuite .AOLPicturesFullSizeLink { height: 1px; width: 1px; overflow: hidden; }</style>",pictureViewControls:[],showNewWindowLink:true,showSearchItems:true,beaconSuffix:"",isPopup:false,hideFeedbackDelay:7000,postCreate:function(){
this.addressModel=new ws.address.AddressModel();
this.actionButton.menu=this.actionMenu;
this.updateToolbarState();
if(!this.showNewWindowLink){
_1.html.hide(this.newWindowLink);
}
if(_1.string.isBlank(Config.AddToBlogUrl)){
_1.html.hide(this.addToBlogLink);
}
this.defineActionMenu();
if(!Config.ShowPresenceInfoOnDisplayMsg){
_1.html.hide(this.buddyIconContainer);
}
window.setInterval(_1.lang.hitch(this,"updateNextPrevButtons"),2000);
_1.event.topic.subscribe("Suite/onKeyOnPress",this,"onKeyPress");
this.presenceHoverCard=_1.widget.createWidget("ws:PresenceHoverCard",{parentNode:this.shortHeaderNode,orient:{"BL":"TL"},getDisplayNameAndPresenceTag:_1.lang.hitch(this,function(_1f4){
var _1f5=_1.html.getAttribute(_1f4,"userInputForm");
var _1f6=ws.presence.getPresenceIconForScreenName(_1f5);
var _1f7=ws.presence.getScreenNameForAddress(_1f5);
if(!_1f7){
_1f7=_1f5;
}
return {"presenceIconHtmlTag":_1f6,"displayName":_1f4.innerHTML,"screenName":_1f7};
})},_1.body(),"first");
},setModel:function(_1f8){
this.model=_1f8;
if(this.statusDialog){
this.statusDialog.model=_1f8;
}
},setPicturesModel:function(_1f9){
this.picturesModel=_1f9;
_1.lang.forEach(this.pictureViewControls,function(ctl){
ctl.picturesModel=_1f9;
});
},onHide:function(){
ws.mail.DisplayMessageWidget.superclass.hide.apply(this,arguments);
this.hidePopups();
},hidePopups:function(){
if(this.addToTaskCard){
this.addToTaskCard.closeCard();
}
},displayMessage:function(_1fb,uid,_1fd){
this.folder=_1fb;
if(this.isPopup){
this.showFeedback(Config.Strings.MessageLoading);
}else{
_1.event.topic.publish("WSFeedbackStart",Config.Strings.MessageLoading);
}
this.model.getMessage({folder:_1fb,uid:uid,load:_1.lang.hitch(this,function(info){
this.messageReceived(info);
if(this.isPopup){
this.showFeedback();
}else{
_1.event.topic.publish("WSFeedbackEnd",Config.Strings.MessageLoading);
}
if(_1fd){
_1fd();
}
}),error:_1.lang.hitch(this,function(err){
if(this.isPopup){
this.showFeedback();
}else{
_1.event.topic.publish("WSFeedbackEnd",Config.Strings.MessageLoading);
}
ws.widget.OkCancelDialog.alert(_1.string.isBlank(err)?Config.Strings.ErrorLoadingMessage:err);
})});
},getFullDisplayAddress:function(_200){
if(!_200){
return;
}
var _201="";
for(var i=0;i<_200.length;i++){
var pTag=ws.presence.getPresenceIconForScreenName(_200[i].userInputForm);
var sn=ws.presence.getScreenNameForAddress(_200[i].userInputForm);
if(!sn){
sn=_200[i].userInputForm;
}
pTag=pTag.replace("<a ","<a onclick='ws.presence.launchIM(\""+sn+"\");' ");
_201+=pTag;
_201+="&nbsp;&nbsp;";
_201+=_200[i].displayForm;
if(i<_200.length-1){
_201+=";&nbsp;&nbsp;";
}
}
return _201;
},messageReceived:function(info){
this.uninitializeImages();
this.hidePopups();
_1.event.browser.clean(_1.html.iframeContentDocument(this.bodyFrame));
this.msgInfo=ws.lang.shallowCopy(info,true);
this.foldersCanMoveTo=ws.lang.shallowCopy(this.model.getFoldersCanMoveTo());
this.showFullHeader(Settings.DisplayFullHeader);
this.updateBuddyIcon();
this.updateShortHeader();
ws.html.setInnerText(this.subjectNode,this.msgInfo.subject||Config.Strings.NoSubject);
this.fullFromNode.innerHTML=this.getFullDisplayAddress(this.msgInfo.from);
this.fullToNode.innerHTML=this.getFullDisplayAddress(this.msgInfo.to);
this.fullCcNode.innerHTML=this.getFullDisplayAddress(this.msgInfo.cc);
this.fullBccNode.innerHTML=this.getFullDisplayAddress(this.msgInfo.bcc);
ws.html.setInnerText(this.fullDateNode,ws.date.formatDateTime(new Date(this.msgInfo.receivedTime),Config.Strings.MsgViewDateFormat));
ws.html.toggleClass(this.flagIcon,"flagged",this.msgInfo.isFlagged);
this.updateChrome();
this.updateAttachments();
var _206=this.msgInfo.stripImagesKey&&(this.msgInfo.body.indexOf(this.msgInfo.stripImagesKey)!=-1);
if(_206&&(!Settings.DisplayImageWarning||this.addressModel.getRecordByEmail(this.msgInfo.from[0].userInputForm))){
this._restoreImages();
_206=false;
}
ws.widget.setShowing(this.removedImagesPane,_206);
_1.html.setVisibility(this.removedImagesPane.domNode,_206);
this.writeBody();
this.updateActionMenu();
this.updateSearchInfo();
this.setToolbarEnabled(true);
this.updateToolbarState();
this.layout();
},writeBody:function(){
if(!this.msgInfo||!this.isReallyShowing()){
return;
}
var win=_1.html.iframeContentWindow(this.bodyFrame);
_1.widget.PopupManager.unRegisterWin(win);
var body=this.msgInfo.body+this.extraBodyHtml;
if(!_1.render.html.ie){
var _209=body.indexOf("<body");
if(_209!=-1){
body=body.substring(0,_209+5)+" onload=\"parent.dojo.widget.byId('"+this.widgetId+"').onBodyLoaded()\" "+body.substring(_209+5);
}
}
this.bodyFrame=ws.html.rewriteIframe(this.bodyFrame,body);
if(_1.render.html.ie){
this.watchForBodyLoaded();
}
if(_1.render.html.safari){
win.document.body.scrollTop=0;
}
},onShow:function(){
ws.mail.DisplayMessageWidget.superclass.onShow.apply(this,arguments);
this.writeBody();
if(_1.render.html.safari){
this.onResized();
}
},watchForBodyLoaded:function(){
if(_1.html.iframeContentDocument(this.bodyFrame).readyState=="complete"){
this.onBodyLoaded();
}else{
_1.lang.setTimeout(this,"watchForBodyLoaded",100);
}
},onBodyLoaded:function(){
win=_1.html.iframeContentWindow(this.bodyFrame);
_1.widget.PopupManager.registerWin(win);
if(_1.render.html.moz){
_1.event.browser.addListener(win,"onmousedown",_1.lang.hitch(_1.widget.PopupManager,"onClick"));
}
this.initializeImages();
this.initializeLinks();
ws.reporting.report("Read Message - "+this.beaconSuffix,"Mail");
},layoutHeader:function(){
var _20a=parseInt(this.domNode.style.width);
_1.html.setMarginBox(this.headerPane.domNode,{width:_20a});
var _20b=_1.html.getContentBox(this.headerPane.domNode).width;
var _20c=_1.html.getMarginBox(this.buddyIconContainer).width;
var _20d=_20b-_20c;
_1.html.setMarginBox(this.mainHeaderNode,{width:_20d});
var _20e=_1.html.getMarginBox(this.fromLabel).width;
var _20f=_1.html.getMarginBox(this.headerLinksNode).width;
_1.html.setMarginBox(this.subjectContainer,{width:_20d-_20f});
_1.html.setMarginBox(this.shortHeaderContainer,{width:_20d-_20f});
_1.html.setMarginBox(this.fullFromContainer,{width:_20d-_20f-_20e});
_1.html.setMarginBox(this.fullToNode,{width:_20d-_20e});
_1.html.setMarginBox(this.fullCcNode,{width:_20d-_20e});
_1.html.setMarginBox(this.fullBccNode,{width:_20d-_20e});
_1.html.setMarginBox(this.fullDateNode,{width:_20d-_20e});
var _210=_1.html.getMarginBox(this.attachmentsLabel).width;
_1.html.setMarginBox(this.attachmentsContainer,{width:_20d-_210});
this.updateShortHeader();
var _211=_1.html.getMarginBox(this.mainHeaderNode).height;
var _212=_1.html.getMarginBox(this.buddyIconContainer).height;
_1.html.setContentBox(this.headerPane.domNode,{height:Math.max(_211,_212)});
},onResized:function(){
this.layoutHeader();
this.layoutWidget.onResized();
pictViewCtls=this.pictureViewControls;
for(var i=0;i<pictViewCtls.length;i++){
pictViewCtls[i].positionSelf();
}
},layout:function(){
if(_1.html.isDisplayed(this.domNode)){
this.layoutHeader();
this.layoutWidget.onResized();
}else{
this.width=0;
this.height=0;
}
},updateToolbarState:function(){
if(!this.model){
return;
}
var _214=this.model.getCurrentFolder();
if(!_214){
return;
}
var _215=_214.name.toLowerCase();
var _216=(_215 in Config.FolderButtons)?Config.FolderButtons[_215]:Config.FolderButtons.other;
this.buttonViz=_1.lang.map(_216.split(","),function(s){
return _1.string.trim(s)=="true";
});
if(Config.EnableSpamButton){
ws.widget.setShowing(this.spamButton,this.buttonViz[4]);
ws.widget.setShowing(this.notSpamButton,this.buttonViz[5]);
}else{
ws.widget.setShowing(this.spamButton,0);
ws.widget.setShowing(this.notSpamButton,0);
}
ws.widget.setShowing(this.restoreButton,this.buttonViz[8]);
if(Config.EnableUnsendButton){
ws.widget.setShowing(this.unsendButton,this.buttonViz[10]);
}else{
ws.widget.setShowing(this.unsendButton,0);
}
var _218=this.buttonViz[12];
ws.widget.setShowing(this.keepNewButton,_218);
ws.widget.setShowing(this.comboReplyButton,_218);
ws.widget.setShowing(this.replyButton,!_218);
ws.widget.setShowing(this.replyAllButton,!_218);
this.updateNextPrevButtons();
},updateNextPrevButtons:function(){
var good=this.model&&this.msgInfo;
ws.html.toggleClass(this.nextButtonNode,"nextButtonDisabled",good&&(this.model.getAdjacentMessageUid(this.msgInfo.uid,1)==null));
ws.html.toggleClass(this.prevButtonNode,"prevButtonDisabled",good&&(this.model.getAdjacentMessageUid(this.msgInfo.uid,-1)==null));
},setToolbarEnabled:function(_21a){
_1.lang.forEach(this.toolbar.children,function(_21b){
if(_21b.enable){
ws.widget.setEnabled(_21b,_21a);
}
});
_1.html.addClass(this.nextButtonNode,"nextButtonDisabled");
_1.html.addClass(this.prevButtonNode,"prevButtonDisabled");
},updateSearchInfo:function(){
if(this.model.getSearchString()){
var _21c=Math.max(this.model.getRowCount(),0);
var info="< "+ws.string.substituteParams(Config.Strings.DisplaySearchHeader,_21c,this.model.getSearchString());
ws.html.setInnerText(this.searchInfoNode,info);
this.searchInfoPane.show();
}else{
this.searchInfoPane.hide();
}
},toggleFullHeader:function(){
var _21e=_1.html.isShowing(this.shortHeaderContainer);
this.showFullHeader(_21e);
this.layout();
},showFullHeader:function(show){
_1.html.setShowing(this.shortHeaderContainer,!show);
_1.html.setShowing(this.fromRow,show);
_1.html.setShowing(this.toRow,show&&!_1.string.isBlank(this.msgInfo.displayTo));
_1.html.setShowing(this.ccRow,show&&!_1.string.isBlank(this.msgInfo.displayCc));
_1.html.setShowing(this.bccRow,show&&!_1.string.isBlank(this.msgInfo.displayBcc));
_1.html.setShowing(this.dateRow,show);
this.attachmentsLabel.style.width=show?"":"10px";
if(show){
this.limitFieldSize(this.fullToNode);
this.limitFieldSize(this.fullCcNode);
this.limitFieldSize(this.fullBccNode);
}
},limitFieldSize:function(_220){
var _221=3.6*_1.html.getCachedFontMeasurements()["1em"];
_220.style.height="auto";
var _222=_1.html.getContentBox(_220).height;
if(_222>_221){
_220.style.height="3.6em";
}
},updateBuddyIcon:function(){
var _223=this.msgInfo.from[0].userInputForm.toLowerCase();
this.buddyIcon.show({email:_223});
},updateChrome:function(){
_1.html.setShowing(this.chromeOfficialPane,this.msgInfo.isOfficialMail);
_1.html.setShowing(this.chromePriorityPane,this.msgInfo.isPriorityMail);
_1.html.setShowing(this.chromeCertifiedPane,this.msgInfo.isCertifiedMail);
_1.html.setShowing(this.chromeVoicePane,this.msgInfo.isVoicemail);
_1.html.setShowing(this.chromeBillPayPane,this.msgInfo.isBillPayMail);
},restoreImages:function(){
this._restoreImages();
this.messageReceived(this.msgInfo);
},restoreImagesAndAddContact:function(){
this.restoreImages();
this.addressModel.createOrModifyContact({uid:0,category:"Auto-Added",email1:this.msgInfo.from[0].userInputForm,load:_1.lang.hitch(this,function(){
if(this.isPopup){
this.showFeedback(Config.Strings.SenderAdded,true);
}else{
_1.event.topic.publish("WSFeedbackStart",Config.Strings.SenderAdded,true);
}
})});
},_restoreImages:function(){
var re=new RegExp(this.msgInfo.stripImagesKey,"g");
this.msgInfo.body=this.msgInfo.body.replace(re,"");
this.msgInfo.stripImagesKey=null;
},updateShortHeader:function(){
if(!this.msgInfo){
return;
}
var _225="<span userInputForm='"+this.msgInfo.from[0].userInputForm+"' class='from buddyIcon'>"+_1.string.escapeXml(this.msgInfo.from[0].shorterDisplayForm)+"</span> "+Config.Strings.ToLowerCase+" ";
var _226=" - <span class='time'>"+ws.date.timeAgo(this.msgInfo.receivedTime)+"</span>";
var _227=this.msgInfo.to;
_227=_227.concat(this.msgInfo.cc);
_227=_227.concat(this.msgInfo.bcc);
var you=null;
var idx;
var _22a=null;
if((idx=this.findMyEmail(this.msgInfo.to))!=-1){
you=Config.Strings.ToYou;
_22a=this.msgInfo.to[idx].userInputForm;
_227.splice(idx,1);
}else{
if((idx=this.findMyEmail(this.msgInfo.cc))!=-1){
you=Config.Strings.ToYou+" ("+Config.Strings.CcLowerCase+")";
_22a=this.msgInfo.cc[idx].userInputForm;
_227.splice(this.msgInfo.to.length+idx,1);
}else{
if((idx=this.findMyEmail(this.msgInfo.bcc))!=-1){
you=Config.Strings.ToYou+" ("+Config.Strings.BccLowerCase+")";
_22a=this.msgInfo.bcc[idx].userInputForm;
_227.splice(this.msgInfo.to.length+this.msgInfo.cc.length+idx,1);
}
}
}
var tmpl="<span class='buddyIcon' userInputForm='%{0}'>%{1}</span>";
_227=(you?[ws.string.substituteParams(tmpl,_22a,you)]:[]).concat(_1.lang.map(_227,function(a){
return ws.string.substituteParams(tmpl,a.userInputForm,_1.string.escapeXml(a.shorterDisplayForm));
}));
var _22d=null;
for(var _22e=1;_22e<=_227.length;_22e++){
var _22f=[];
for(var i=0;i<_22e;i++){
_22f.push(_227[i]);
}
var _231=_227.length-_22e;
if(_231>0){
_22f.push(_231==1?Config.Strings.OneOther:ws.string.substituteParams(Config.Strings.NOthers,_231));
}
var _232;
if(_22f.length==1){
newToStr=_22f[0];
}else{
if(_22f.length==2){
newToStr=_22f[0]+" "+Config.Strings.And+" "+_22f[1];
}else{
_22f[_22f.length-1]=Config.Strings.And+" "+_22f[_22f.length-1];
newToStr=_22f.join(", ");
}
}
var full=_225+newToStr+_226;
this.shortHeaderNode.innerHTML=full;
if((_22d==null)||(this.showFullHeaderLink.offsetTop<=(this.shortHeaderNode.offsetTop+3))){
_22d=newToStr;
}else{
break;
}
}
this.shortHeaderNode.innerHTML=_225+_22d+_226;
},findMyEmail:function(_234){
var _235=_1.lang.map(this.model.sendAddresses,function(s){
return s.toLowerCase();
});
for(var i=0;i<_234.length;i++){
var addr=_234[i].userInputForm.toLowerCase();
if(_1.lang.find(_235,addr)!=-1){
return i;
}
}
return -1;
},reply:function(){
this.composeResponse("reply");
},replyAll:function(){
this.composeResponse("replyAll");
},forward:function(){
this.composeResponse("forward");
},composeResponse:function(type){
if(!this.getComposeCB){
return _1.debug("no compose widget found");
}
this.msgInfo.selectedText=this.selectedHtml;
this.getComposeCB(_1.lang.hitch(this,function(_23a){
_23a[type](this.msgInfo);
}));
},toggleFlag:function(){
var flag=!this.msgInfo.isFlagged;
this.msgInfo.isFlagged=flag;
ws.html.toggleClass(this.flagIcon,"flagged",flag);
this.model.flagMessages({folder:this.folder,uids:[this.msgInfo.uid],flag:flag,load:_1.lang.hitch(this,function(data){
if(this.isPopup){
this.showFeedback((flag?Config.Strings.MessageFlagged:Config.Strings.MessageUnflagged),true);
}else{
_1.event.topic.publish("WSFeedbackStart",(flag?Config.Strings.MessageFlagged:Config.Strings.MessageUnflagged),true);
}
}),error:function(err){
ws.widget.OkCancelDialog.alert(_1.string.isBlank(err)?Config.Strings.ErrorSettingFlag:err);
}});
this.updateActionMenu();
},markRead:function(){
this.changeReadState(true);
},markUnread:function(){
this.changeReadState(false);
},changeReadState:function(read){
var _23f=this.getNextUid(this.msgInfo.uid);
this.model.changeMessagesReadState({msgInfos:[this.msgInfo],folder:this.folder,uids:[this.msgInfo.uid],read:read,load:_1.lang.hitch(this,function(data){
if(this.isPopup){
this.showFeedback((read?Config.Strings.MessageMarkedRead:Config.Strings.MessageMarkedNew),true);
}else{
_1.event.topic.publish("WSFeedbackStart",(read?Config.Strings.MessageMarkedRead:Config.Strings.MessageMarkedNew),true);
}
}),error:function(err){
ws.widget.OkCancelDialog.alert(_1.string.isBlank(err)?Config.Strings.MarkReadError:err);
}});
var _242=this.model.getFolderByName(this.folder).type;
if((read&&Config.EnableMoveForMarkSeen&&_242=="NewMail")||(!read&&Config.EnableMoveForMarkUnseen&&_242=="OldMail")){
this.showNextOrList(_23f);
}else{
this.updateActionMenu();
}
},deleteMessage:function(){
var _243=this.model.getFolderByName(this.folder);
if(_243.type=="Deleted"){
ws.widget.OkCancelDialog.alert(Config.Strings.PermDeleteConfirmation,ws.lang.hitch(this,function(ok){
if(ok){
this.deleteMessageHelper();
}
}),true);
}else{
return this.deleteMessageHelper();
}
},deleteMessageHelper:function(){
var _245=this.getNextUid(this.msgInfo.uid);
this.setToolbarEnabled(false);
this.model.deleteMessages({folder:this.folder,uids:[this.msgInfo.uid],error:function(err){
ws.widget.OkCancelDialog.alert(_1.string.isBlank(err)?Config.Strings.DeleteMessageError:err);
}});
this.showNextOrList(_245);
},restoreMessage:function(){
var _247=this.getNextUid(this.msgInfo.uid);
this.setToolbarEnabled(false);
this.model.restoreMessages({folder:this.folder,uids:[this.msgInfo.uid],error:function(err){
ws.widget.OkCancelDialog.alert(_1.string.isBlank(err)?Config.Strings.RestoreMessageError:err);
}});
this.showNextOrList(_247);
},moveMessage:function(_249,_24a){
var _24b=this.getNextUid(this.msgInfo.uid);
this.setToolbarEnabled(false);
this.model.moveMessages({folder:this.folder,destFolder:_249,uids:[this.msgInfo.uid],load:_1.lang.hitch(this,function(data){
if(this.isPopup){
this.showFeedback(Config.Strings.MessageMoved,true);
}else{
_1.event.topic.publish("WSFeedbackStart",ws.string.substituteParams(Config.Strings.MessageMoved,_24a),true);
}
}),error:function(err){
ws.widget.OkCancelDialog.alert(_1.string.isBlank(err)?Config.Strings.MoveMessageError:err);
}});
this.showNextOrList(_24b);
},reportSpam:function(){
this.spamAction(true);
},reportNotSpam:function(){
this.spamAction(false);
},spamAction:function(_24e){
var _24f=this.getNextUid(this.msgInfo.uid);
this.setToolbarEnabled(false);
this.model.reportSpamMessages({folder:this.folder,uids:[this.msgInfo.uid],isSpam:_24e,load:_1.lang.hitch(this,function(data){
if(_24e){
if(this.isPopup){
this.showFeedback(Config.Strings.MessageMarkedSpam,true);
}else{
_1.event.topic.publish("WSFeedbackStart",Config.Strings.MessageMarkedSpam,true);
}
}
}),error:function(err){
ws.widget.OkCancelDialog.alert(_1.string.isBlank(err)?Config.Strings.ReportSpamError:err);
}});
this.showNextOrList(_24f);
},unsendMessage:function(){
var _252=this.model.getFolderByName(this.folder);
var msg=ws.string.substituteParams(Config.Strings.UnsendSingleMessageConfirmation,_252.displayName);
ws.widget.OkCancelDialog.alert(msg,_1.lang.hitch(this,function(res){
if(!res){
return;
}
this.model.unsendMessages({folder:this.folder,uids:[this.msgInfo.uid],load:_1.lang.hitch(this,"backToList"),error:function(err){
ws.widget.OkCancelDialog.alert(_1.string.isBlank(err)?Config.Strings.UnsendError:err);
}});
}),true);
},nextMessage:function(){
this.nextPrevMessage(1);
},prevMessage:function(){
this.nextPrevMessage(-1);
},nextPrevMessage:function(_256){
var uid=this.model.getAdjacentMessageUid(this.msgInfo.uid,_256);
if(uid){
this.setToolbarEnabled(false);
this.displayMessage(this.folder,uid);
}
},getNextUid:function(_258){
var _259=this.model.getAdjacentMessageUid(_258,1);
if(!_259){
_259=this.model.getAdjacentMessageUid(_258,-1);
}
return _259;
},showNextOrList:function(uid){
if(Settings.GotoNextOnDelete&&uid){
this.displayMessage(this.folder,uid);
}else{
this.backToListCB();
}
},backToList:function(){
if(this.backToListCB){
this.backToListCB();
}
},defineActionMenu:function(){
this.comboReplyButton.menuDefinition=[{caption:Config.Strings.DisplayReply,onClick:_1.lang.hitch(this,"reply")},{caption:Config.Strings.DisplayReplyAll,onClick:_1.lang.hitch(this,"replyAll")}];
this.actionButton.menuDefinition=[{caption:Config.Strings.MarkReadActionLabel,onClick:_1.lang.hitch(this,"markRead")},{caption:Config.EnableKeepAsNewButton?Config.Strings.KeepAsNewActionLabel:Config.Strings.MarkUnreadActionLabel,onClick:_1.lang.hitch(this,"markUnread")},{caption:Config.Strings.FlagForFollowUp,onClick:_1.lang.hitch(this,"toggleFlag")},{caption:Config.Strings.ClearFlag,onClick:_1.lang.hitch(this,"toggleFlag")},{separator:true},{caption:Config.Strings.SearchForSubject,onClick:_1.lang.hitch(this,"searchForSubject")},{caption:Config.Strings.SearchForSender,onClick:_1.lang.hitch(this,"searchForSender")},{separator:true},{caption:Config.Strings.PrintMessage,onClick:_1.lang.hitch(this,"print")},{caption:Config.Strings.ShowMessageStatus,onClick:_1.lang.hitch(this,"viewStatus")},{caption:Config.Strings.ViewMessageSource,onClick:_1.lang.hitch(this,"viewSource")},{separator:true},{caption:Config.Strings.MoveActionLabel,disabled:true}];
_1.event.connect("after",this.actionButton,"createMenu",this,"updateActionMenu");
},updateActionMenu:function(){
var menu=this.actionButton.menu;
if(!menu){
return;
}
var _25c=menu.children[0];
var _25d=menu.children[1];
var _25e=menu.children[2];
var _25f=menu.children[3];
var _260=menu.children[4];
var _261=menu.children[5];
var _262=menu.children[6];
var _263=menu.children[9];
var _264=12;
var _265=this.buttonViz[7]&&this.model.canChangeMessageReadState(this.msgInfo.folder);
ws.widget.setShowing(_25c,_265&&!this.msgInfo.isSeen);
ws.widget.setShowing(_25d,_265&&this.msgInfo.isSeen);
ws.widget.setShowing(_25e,!this.msgInfo.isFlagged);
ws.widget.setShowing(_25f,this.msgInfo.isFlagged);
var _266=this.showSearchItems&&this.model.getFolderByName(this.msgInfo.folder).type!="Sent";
ws.widget.setShowing(_261,this.showSearchItems);
ws.widget.setShowing(_262,_266);
ws.widget.setShowing(_260,_266);
ws.widget.setShowing(_263,Config.ShowMessageStatus);
for(var i=menu.children.length-1;i>_264;i--){
var item=menu.children[i];
menu.removeChild(item);
item.destroy();
}
_1.lang.forEach(this.model.folders,_1.lang.hitch(this,function(_269){
if(_1.lang.inArray(this.foldersCanMoveTo,_269.name)){
var item=_1.widget.createWidget("ws:WSMenuItem",{caption:"&nbsp;&nbsp;"+_269.displayName});
item.onClick=ws.lang.hitch(this,"moveMessage",_269.name,_269.displayName);
menu.addChild(item);
}
}));
},popOut:function(){
window.openerContext={model:this.model,picturesModel:this.picturesModel,folder:this.folder,uid:this.msgInfo.uid,Settings:Settings,callback:_1.lang.hitch(this,"backToList")};
ws.io.openWindow(Config.BaseMailPagesURL+"DisplayMessage.aspx","","status=yes,resizable=yes,left=5,top=5,width=885,height=606");
},searchForSubject:function(){
var subj=this.model.getBaseSubject(this.msgInfo.subject);
this.model.search(subj,"subject");
this.backToList();
},searchForSender:function(){
var _26c=this.msgInfo.from[0].userInputForm;
this.model.search(_26c,"from");
this.backToList();
},initializeLinks:function(){
var doc=_1.html.iframeContentDocument(this.bodyFrame);
var _26e=doc.getElementsByTagName("a");
_1.lang.forEach(_26e,_1.lang.hitch(this,function(link){
try{
if(_1.string.startsWith(link.href,"mailto:")){
_1.event.connect(link,"onclick",ws.lang.hitch(this,"onMailtoClick",link));
}else{
if(link.href.match(this.presenceIconRE)){
_1.event.connect(link,"onclick",ws.lang.hitch(this,"onPresenceIconClick",link));
}
}
}
catch(e){
}
}));
},onMailtoClick:function(link,evt){
var re=/mailto:([^?]+)(\?(.*))?/i;
var _273=link.href.match(re);
var _274={to:decodeURIComponent(_273[1])};
var _275=_273[3];
if(_275){
var _276=["subject","cc","bcc","body"];
_275=_275.split("&");
for(var i=0;i<_275.length;i++){
var _278=_275[i].split("=");
if(_278[0]&&_1.lang.find(_276,_278[0].toLowerCase())!=-1){
_274[_278[0].toLowerCase()]=decodeURIComponent(_278[1]);
}
}
}
this.getComposeCB(_1.lang.hitch(this,function(_279){
_279.reset(_274);
}));
evt.preventDefault();
},presenceIconRE:/IM\/\?sn=([^&]*)&locale=([^&]*)&pd=(0|1)$/,onPresenceIconClick:function(link,evt){
var _27c=link.href.match(this.presenceIconRE);
ws.presence.launchIM(_27c[1],_27c[3]=="1");
evt.preventDefault();
},viewSource:function(){
var url=ws.string.substituteParams("%{0}ViewSource.aspx?user=%{1}&folder=%{2}&uid=%{3}",Config.BaseMailPagesURL,encodeURIComponent(ws.UserContext.UserUID),encodeURIComponent(this.msgInfo.folder),encodeURIComponent(this.msgInfo.uid));
ws.io.openWindow(url,"","status=yes,resizable=yes,menubar=yes,scrollbars=yes");
ws.reporting.report("Message Source","Mail");
},viewStatus:function(){
if(!this.statusDialog){
this.statusDialog=_1.widget.createWidget("ws:MessageStatusDialog",{model:this.model},document.body,"first");
}
this.statusDialog.show(this.msgInfo.folder,[this.msgInfo.uid]);
ws.reporting.reportAction("Message Status");
},print:function(){
window.printContext=this.msgInfo;
ws.io.openWindow(Config.BaseMailPagesURL+"PrintMessage.aspx",null,"");
},updateAttachments:function(){
var _27e=this.msgInfo.attachments||[];
var html="";
var _280=false;
var _281=new RegExp(".("+Config.SupportedImageTypes+")$","i");
for(var i=0;i<_27e.length;i++){
var att=_27e[i];
html+=ws.string.substituteParams("%{comma}<a href=\"%{url}\" class=\"wsLink\" title=\"%{size} - %{virus}\">%{name}</a>",{comma:(i>0)?", ":"",url:att.url,name:_1.string.escapeXml(att.name).replace(/ /g,"&nbsp;"),size:(att.size<1024)?att.size:(Math.round(att.size/1024)+"K"),virus:Config.Strings.NoVirusesFound});
if(att.name.search(_281)!=-1){
_280=true;
}
}
this.attachmentsNode.innerHTML=html;
_1.html.setShowing(this.attachmentsRow,_27e.length>0);
_1.html.setShowing(this.saveImagesLink,_280&&Config.EnablePictures&&(ws.UserContext.ParentalControls!="Y"));
_1.html.hide(this.viewImagesLink);
},saveImagesToShoebox:function(evt){
this.picturesModel.saveAttachedImages({folder:this.msgInfo.folder,uid:this.msgInfo.uid,load:_1.lang.hitch(this,function(data){
var _286=[];
for(var i=0;i<data.pictures.length;i++){
if(data.pictures[i].status=="failure"){
_286.push(data.pictures[i].filename);
}
}
if(_286.length>0){
ws.widget.OkCancelDialog.alert(ws.string.substituteParams(Config.Strings.YGP_SaveSomeError,_286.join(", ")));
}
_1.html.hide(this.savingImagesProgressNode);
_1.html.show(this.viewImagesLink);
}),error:_1.lang.hitch(this,function(err){
ws.widget.OkCancelDialog.alert(_1.string.isBlank(err)?Config.Strings.YGP_SaveAllError:err);
_1.html.hide(this.savingImagesProgressNode);
_1.html.show(this.saveImagesLink);
})});
_1.html.hide(this.saveImagesLink);
_1.html.show(this.savingImagesProgressNode);
evt.preventDefault();
},viewImagesInShoebox:function(evt){
ws.io.openWindow(Config.PicturesServer+Config.ShoeboxPath,"AolpShoeboxAlbum"+Math.round(Math.random()*10000));
evt.preventDefault();
},initializeImages:function(){
var doc=_1.html.iframeContentDocument(this.bodyFrame);
var imgs=doc.getElementsByTagName("img");
this.pictureViewControls=[];
for(var i=0;i<imgs.length;i++){
var _28d=_1.html.hasClass(imgs[i],"AOLAttachedImage");
var _28e=_1.html.hasClass(imgs[i],"AOLInlineImage");
if(_28d){
var size=_1.html.getContentBox(imgs[i]);
var _290=Config.InsertedPictureLongestEdge;
var _291=size.width<size.height;
if(_291&&size.height>_290){
_1.html.setContentBox(imgs[i],{height:_290,width:Math.round(size.width*(_290/size.height))});
}else{
if(!_291&&size.width>_290){
_1.html.setContentBox(imgs[i],{width:_290,height:Math.round(size.height*(_290/size.width))});
}
}
imgs[i].style.visibility="visible";
}
if(imgs[i].src&&(_28d||_28e)){
var _292=doc.createElement("div");
doc.body.appendChild(_292);
var ctl=_1.withDoc(doc,_1.widget.createWidget,_1.widget,["ws:PictureViewControl",{image:imgs[i],picturesModel:this.picturesModel,folder:this.msgInfo.folder,uid:this.msgInfo.uid},_292]);
this.pictureViewControls.push(ctl);
}
}
},uninitializeImages:function(){
_1.lang.forEach(this.pictureViewControls,function(ctl){
ctl.destroy();
});
},saveSelection:function(){
var _295=false;
var _296="";
var _297="";
try{
var _298=_1.html.iframeContentWindow(this.bodyFrame);
_295=_1.withGlobal(_298,function(){
return _1.html.selection.getAncestorElement("pre");
});
_296=_1.withGlobal(_298,_1.html.selection.getSelectedHtml);
_297=_1.withGlobal(_298,_1.html.selection.getSelectedText);
}
catch(e){
}
if(_295&&!_1.string.isBlank(_296)){
_296="<pre><tt>"+_296+"</pre></tt>";
}
this.selectedHtml=_296;
this.selectedText=_297;
},addToBlog:function(){
var url=Config.AddToBlogUrl;
this.addToBlogPreloadImage.src=url;
var _29a=false;
var _29b=this.msgInfo.subject;
var _29c=this.selectedHtml;
if(_1.string.isBlank(_29c)){
_29c=this.msgInfo.body;
_29a=true;
}
_29c=_29c.replace(/<style(.|\n|\r)*?<\/style>/gi,"");
var _29d=/<pre>((.|\n|\r)*?)<\/pre>/i;
var _29e;
while(_29e=_29d.exec(_29c)){
_29c=_29c.replace(_29d,_29e[1].replace(/\n/g,"<br>"));
}
var _29f=/<[^>]*\s(_(\w*=))/i;
while(_29e=_29f.exec(_29c)){
_29c=_29c.replace(_29f,_29e[0].replace(_29e[1],"X"+_29e[2]));
}
var _2a0=this.msgInfo.from[0].userInputForm;
var _2a1=this.msgInfo.from[0].displayForm;
if(_29a){
_29c=ws.string.substituteParams("<b>%{0}:</b> <a href=\"mailto:%{1}\">%{2}</a><br /><b>%{3}:</b> %{4}<br />",Config.Strings.From,_2a0,_1.string.escapeXml(_2a1),Config.Strings.Subject,_1.string.escapeXml(_29b))+_29c;
}
var _2a2="directories=yes,location=yes,menubar=yes,resizable=yes,scrollbars=yes,status=yes,titlebar=yes,toolbar=yes,width=680,height=640";
var _2a3="AddToJournal"+Math.round(Math.random()*100000);
var win=ws.io.openWindow("about:blank",_2a3,_2a2);
if(!win){
return;
}
this.addToBlogForm.action=url;
this.addToBlogForm.target=_2a3;
this.addToBlogForm.cu.value="javascript:window.close();";
this.addToBlogForm.js.value=_29b;
this.addToBlogForm.je.value=_29c;
this.addToBlogForm.submit();
if(win.focus){
win.focus();
}
},addToCalendar:function(){
var _2a5=this.selectedText;
if(_1.string.isBlank(_2a5)){
_2a5=_1.html.renderedTextContent(_1.html.iframeContentDocument(this.bodyFrame).body);
}
this.getAddEditWidgetCB(_1.lang.hitch(this,function(){
if(null==this.addEditDialog){
if(null==this.calendarModel){
this.calendarModel=new ws.calendar.CalendarViewModel();
}
var _2a6={};
_2a6.model=this.calendarModel;
this.addEditDialog=_1.widget.createWidget("ws:AddEventDialog",_2a6,_1.body(),"first");
this.addEditDialog.setModel(this.calendarModel);
}
this.addEditDialog.show(2,{summary:this.msgInfo.subject,notes:_2a5});
}));
},showFeedback:function(msg,_2a8){
if(msg){
if(this.hideTimer){
clearTimeout(this.hideTimer);
this.hideTimer=null;
}
if(_2a8){
this.hideTimer=setTimeout(ws.lang.hitch(this,"_showFeedback",null),this.hideFeedbackDelay);
}
this._showFeedback(msg);
}else{
this._showFeedback();
}
},_showFeedback:function(msg){
ws.widget.setShowing(this.feedbackPane,msg?true:false);
ws.html.setInnerText(this.feedbackNode,(msg||""));
this.layout();
},addToTask:function(){
if(!this.taskModel){
this.taskModel=new ws.calendar.CalendarViewModel();
}
var _2aa=_1.widget.byType("taskpanel")[0];
var _2ab=_2aa?_2aa.model:this.taskModel;
if(this.addToTaskCard){
this.addToTaskCard.reset();
}else{
this.addToTaskCard=_1.widget.createWidget("ws:TaskPanelMoreDetailCard",{model:_2ab},_1.body(),"first");
}
this.addToTaskCard.model=_2ab;
this.addToTaskCard.taskPanel=_2aa;
this.addToTaskCard.openPopUp(this.msgInfo.subject,this.selectedText,false,this.addToLinksNode,{"BR":"TR"});
},onKeyPress:function(evt){
if(!this.isShowing()){
return;
}
if(Config.EnableKeyboardShortcuts&&evt.key&&_1.lang.isString(evt.key)&&!(evt.ctrlKey||evt.altKey||evt.metaKey)){
switch(evt.key.toLowerCase()){
case Config.Strings.KeyMailReply:
this.saveSelection();
this.reply();
break;
case Config.Strings.KeyMailReplyAll:
this.saveSelection();
this.replyAll();
break;
case Config.Strings.KeyMailForward:
this.saveSelection();
this.forward();
break;
case Config.Strings.KeyMailPopout:
this.popOut();
break;
case Config.Strings.KeyMailNext:
this.nextMessage();
break;
case Config.Strings.KeyMailPrevious:
this.prevMessage();
break;
case Config.Strings.KeyMailPrint:
this.print();
break;
case Config.Strings.KeyMailClose:
this.backToList();
break;
case Config.Strings.KeyMailAddToCalendar:
this.saveSelection();
this.addToCalendar();
break;
case Config.Strings.KeyMailAddToToDo:
this.saveSelection();
this.addToTask();
break;
case Config.Strings.KeyMailAddToBlog:
if(!_1.string.isBlank(Config.AddToBlogUrl)){
this.saveSelection();
this.addToBlog();
}
break;
}
}else{
if(Config.EnableKeyboardShortcuts&&evt.key){
switch(evt.key){
case _1.event.browser.keys.KEY_DELETE:
this.deleteMessage();
break;
}
}
}
}});
}});
