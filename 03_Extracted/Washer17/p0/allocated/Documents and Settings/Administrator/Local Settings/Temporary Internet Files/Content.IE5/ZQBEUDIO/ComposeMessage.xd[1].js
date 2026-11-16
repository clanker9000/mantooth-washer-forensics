/*
	Copyright (c) 2004-2006, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/community/licensing.shtml
*/

dojo.hostenv.packageLoaded({depends:[["provide","ws.layers.ComposeMessage"],["provide","ws.mail.SendConfirmationCard"],["require","dojo.html.display"],["require","dojo.html.layout"],["require","dojo.html.style"],["require","dojo.widget.*"],["require","dojo.widget.ContentPane"],["require","ws.widget.OkCancelDialog"],["require","ws.widget.WSButton"],["provide","ws.mail.SendConfirmationPage"],["require","dojo.html.display"],["require","dojo.html.layout"],["require","dojo.html.style"],["require","dojo.widget.*"],["require","dojo.widget.ContentPane"],["require","ws.widget.Advertisement"],["require","ws.widget.OkCancelDialog"],["require","ws.widget.WSButton"],["require","ws.widget.WSLayoutContainer"],["require","ws.widget.WSToolbar"],["provide","ws.pictures.PictureEditControl"],["require","dojo.html.display"],["require","dojo.html.layout"],["require","dojo.widget.*"],["require","ws.html"],["require","ws.style"],["require","ws.widget.util"],["provide","dojo.widget.TabContainer"],["require","dojo.lang.func"],["require","dojo.widget.*"],["require","dojo.widget.PageContainer"],["require","dojo.event.*"],["require","dojo.html.selection"],["require","dojo.widget.html.layout"],["provide","ws.pictures.PictureUploader"],["require","dojo.widget.*"],["require","ws.widget.WSButton"],["provide","ws.pictures.PicturePicker"],["require","dojo.html.layout"],["require","dojo.html.metrics"],["require","dojo.widget.*"],["require","dojo.widget.ContentPane"],["require","dojo.widget.LayoutContainer"],["require","dojo.widget.PageContainer"],["require","ws.pictures.model"],["require","ws.widget.ListView"],["provide","dojo.widget.ColorPalette"],["require","dojo.widget.*"],["require","dojo.html.layout"],["require","dojo.html.display"],["require","dojo.html.selection"],["provide","ws.widget.SmileyPalette"],["require","dojo.widget.*"],["require","dojo.widget.PopupContainer"],["provide","ws.widget.WSEditor"],["require","dojo.event.browser"],["require","dojo.html.layout"],["require","dojo.html.style"],["require","dojo.widget.*"],["require","dojo.widget.ContentPane"],["require","ws.browser"],["require","ws.html"],["require","ws.settings"],["require","ws.widget.util"],["require","ws.widget.WSButton"],["require","ws.widget.WSLayoutContainer"],["require","ws.widget.WSSelect"],["provide","ws.widget.SpellCheckEditor"],["require","dojo.dom"],["require","dojo.html.util"],["require","dojo.widget.*"],["require","dojo.widget.ContentPane"],["require","ws.dom"],["require","ws.html"],["require","ws.io"],["require","ws.widget.OkCancelDialog"],["require","ws.widget.WSMenu"],["provide","ws.pictures.PictureEditor"],["require","dojo.widget.*"],["require","ws.reporting"],["require","ws.widget.util"],["require","ws.widget.WSButton"],["provide","ws.mail.ComposeMessageWidget"],["require","dojo.html.display"],["require","dojo.html.layout"],["require","dojo.html.style"],["require","dojo.widget.*"],["require","dojo.widget.ContentPane"],["require","dojo.widget.PageContainer"],["require","ws.address.AddressField"],["require","ws.browser"],["require","ws.html"],["require","ws.io"],["require","ws.reporting"],["require","ws.settings"],["require","ws.UserContext"],["require","ws.widget.Dialogs"],["require","ws.widget.OkCancelDialog"],["require","ws.widget.util"],["require","ws.widget.WSButton"],["require","ws.widget.WSLayoutContainer"],["require","ws.widget.WSSelect"],["require","ws.widget.WSToolbar"]],definePackage:function(_1){
_1.provide("ws.layers.ComposeMessage");
_1.provide("ws.mail.SendConfirmationCard");
_1.require("dojo.html.display");
_1.require("dojo.html.layout");
_1.require("dojo.html.style");
_1.require("dojo.widget.*");
_1.require("dojo.widget.ContentPane");
_1.require("ws.widget.OkCancelDialog");
_1.require("ws.widget.WSButton");
_1.widget.defineWidget("ws.mail.SendConfirmationCard",_1.widget.HtmlWidget,{templateString:"<div dojoAttachPoint=\"confirmationDialog\" class=\"sendInvitePane\" style=\"display: none;\">\r\n\t<div dojoType=\"dojo:ContentPane\" dojoAttachPoint=\"invitePane\" style=\"display: none;\">\r\n\t\t<table class=\"sendConfirmationTable\" border=\"0\" cellpadding=\"4\" cellspacing=\"1\">\r\n\t\t\t<tr>\r\n\t\t\t\t<td colspan=\"10\"><span class=\"inputLabels\">${To}: </span></td>\r\n\t\t\t\t<td colspan=\"40\"><input class=\"regularInput\" dojoAttachPoint=\"toInput\" /></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td colspan=\"10\"><span class=\"inputLabels\">${Subject}: </span></td>\r\n\t\t\t\t<td colspan=\"40\"><input class=\"regularInput\" dojoAttachPoint=\"subjectInput\" /></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td colspan=\"50\">\r\n\t\t\t\t\t<textarea class=\"contentText\" dojoAttachPoint=\"inviteContent\" rows=\"5\" wrap=\"virtual\"></textarea>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td colspan=\"25\" align=\"right\">\r\n\t\t\t\t\t<div dojoType=\"ws:WSButton\" dojoAttachEvent=\"onClick: sendInvite\">${Invite}</div>\r\n\t\t\t\t</td>\r\n\t\t\t\t<td colspan=\"25\" align=\"left\">\r\n\t\t\t\t\t<div dojoType=\"ws:WSButton\" dojoAttachEvent=\"onClick: hide\">${Cancel}</div>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t</table>\r\n\t</div>\r\n\t<div dojoType=\"dojo:ContentPane\" dojoAttachPoint=\"createListPane\" style=\"display: none;\">\r\n\t\t<div dojoType=\"dojo:ContentPane\" dojoAttachPoint=\"creatingList\" style=\"display: none;\">\r\n\t\t\t<img src=\"${spacer}\" class=\"closeButton\" dojoAttachEvent=\"onClick: closeCard\">\r\n\t\t\t<table class=\"createListTable\">\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td valign=\"top\" dojoAttachPoint=\"listNameInputRow\">\r\n\t\t\t\t\t\t<input class=\"wsInput listNameInput\" dojoAttachPoint=\"listNameInput\" />\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td valign=\"top\">\r\n\t\t\t\t\t\t<div class=\"listContacts\" dojoAttachPoint=\"listContacts\"></div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td valign=\"bottom\" align=\"center\">\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSButton\" vizType=\"Blue\" dojoAttachEvent=\"onClick: checkRequiredFields\">${Create}</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t</table>\r\n\t\t</div>\r\n\t\t<div dojoType=\"dojo:ContentPane\" dojoAttachPoint=\"listCreated\" style=\"display: none;\">\r\n\t\t\t<table style=\"height: 100%; width: 98%;\">\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td valign=\"middle\" align=\"center\">\r\n\t\t\t\t\t\t<div class=\"listCreatedText\"><span>${ListCreated}</span></div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td valign=\"bottom\" align=\"center\">\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSButton\" vizType=\"Blue\" dojoAttachEvent=\"onClick: closeCard\">${OK}</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t</table>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n",templateCssString:".sendInvitePane\r\n{\r\n\tbackground-color: #FFFFFF;\r\n\tborder: 1px solid #8A8A8A;\r\n\tposition: absolute;\r\n\tz-index: 1000;\r\n\twidth: 250px;\r\n\tpadding: 2px 2px 2px 2px;\r\n}\r\n\r\n.sendInvitePane .sendConfirmationTable\r\n{\r\n\twidth: 100%;\r\n}\r\n\r\n.sendInvitePane .contentText\r\n{\r\n\twidth: 98%;\r\n\tfont-size: 11px;\r\n}\r\n\r\n.sendInvitePane span.inputLabels\r\n{\r\n\tfloat: right;\r\n\tpadding-right: 3px;\r\n\tfont-size: 11px;\r\n}\r\n\r\n.sendInvitePane input.regularInput\r\n{\r\n\tfont-size: 11px;\r\n\twidth: 98%;\r\n}\r\n\r\n.createListPane\r\n{\r\n\tbackground-color: #FFFFFF;\r\n\tborder: 1px solid #8A8A8A;\r\n\tposition: absolute;\r\n\tz-index: 900;\r\n\twidth: 320px;\r\n\tpadding-bottom: 5px;\r\n}\r\n\r\n.createListPane .createListTable\r\n{\r\n\theight: 100%;\r\n\twidth: 98%;\r\n\tmargin: 17px 0px 0px 5px;\r\n}\r\n\r\n.createListPane input.listNameInput\r\n{\r\n\twidth: 98%;\r\n}\t\r\n\r\n.createListPane .listContacts\r\n{\r\n\tborder: 1px solid #85817C;\r\n\twidth: 98%;\r\n\theight: auto;\r\n\tpadding-bottom: 2px;\r\n\tmargin-bottom: 12px;\r\n}\r\n\r\n.createListPane .overMax\r\n{\r\n\toverflow: auto;\r\n}\r\n\r\n.createListPane .listContacts .itemDiv\r\n{\r\n\tpadding-top: 2px;\r\n\tpadding-bottom: 2px;\r\n}\r\n\r\n.createListPane .listContacts span.itemSpan\r\n{\r\n\tmargin-left: 5px;\r\n\tfont-size: 11px;\r\n}\r\n\r\n.createListPane .closeButton\r\n{\r\n\twidth: 12px;\r\n\theight: 12px;\r\n\tcursor: pointer;\r\n\tfloat: right;\r\n\tbackground: url(\"${images}main.gif\") -1425px -1px;\r\n\tmargin-top: 2px;\r\n\tmargin-right: 2px;\r\n}\r\n.createListPane .closeButton:hover\r\n{\r\n\tbackground-position: -1440px -1px;\r\n}\r\n.listNameRowIE\r\n{\r\n\tpadding-right: 3px;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/mail/SendConfirmationCard.css"),widgetsInTemplate:true,isContainer:false,confirmationWidget:null,model:null,addressModel:null,from:null,addresses:null,maxEmailsToDisplay:10,fillOutInvite:function(_2,_3,_4,_5){
this.createListPane.hide();
this.invitePane.show();
_1.html.setClass(this.domNode,"sendInvitePane");
this.toInput.value=_3;
this.subjectInput.value=_4;
this.inviteContent.innerHTML=_5;
this.from=_2;
this.show();
},fillOutList:function(_6,_7,_8){
this.invitePane.hide();
this.createListPane.show();
this.creatingList.show();
this.listCreated.hide();
_1.html.setClass(this.domNode,"createListPane");
var i=null;
this.addresses=[];
this.addresses=_6.concat(_7,_8);
while(this.listContacts.childNodes.length){
_1.html.destroyNode(this.listContacts.firstChild);
}
_1.html.setClass(this.listContacts,"listContacts");
_1.html.setStyle(this.listContacts,"height","auto");
this.show();
for(i=0;i<this.addresses.length;i++){
this["listItemParentDiv"+i]=document.createElement("div");
this["listItemParentDiv"+i].className="itemDiv";
this["listItemCheckBox"+i]=document.createElement("input");
this["listItemCheckBox"+i].setAttribute("type","checkbox");
this["listItemCheckBox"+i].checked="true";
this["listItemParentDiv"+i].appendChild(this["listItemCheckBox"+i]);
this["listItemSpan"+i]=document.createElement("span");
this["listItemSpan"+i].className="itemSpan";
this["listItemSpan"+i].innerHTML=this.addresses[i];
this["listItemParentDiv"+i].appendChild(this["listItemSpan"+i]);
this.listContacts.appendChild(this["listItemParentDiv"+i]);
if((i>(this.maxEmailsToDisplay-1))&&!_1.html.hasClass(this.listContacts,"overMax")){
var _a=_1.html.getMarginBox(this["listItemParentDiv"+i]).height*this.maxEmailsToDisplay;
_1.html.setStyle(this.listContacts,"height",_a+"px");
_1.html.addClass(this.listContacts,"overMax");
}
}
if(_1.render.html.ie){
_1.html.setClass(this.listNameInputRow,"listNameRowIE");
}
this.listNameInput.value=Config.Strings.EnterListName;
this.listNameInput.select();
this.listNameInput.focus();
_1.event.connect(document.documentElement,"onmousedown",this,"closeCardClick");
},sendInvite:function(){
_1.debug("sendInvite");
this.model.sendMessage({content:{From:this.from,To:this.toInput.value,Subject:this.subjectInput.value,PlainBody:this.inviteContent.innerHTML},load:_1.lang.hitch(this,function(_b){
ws.widget.OkCancelDialog.alert(Config.Strings.InviteSent);
this.hide();
}),error:_1.lang.hitch(this,function(_c){
ws.widget.OkCancelDialog.alert(_1.string.isBlank(_c)?Config.Strings.ErrorSending:_c);
})});
},checkRequiredFields:function(){
var _d="";
var _e=this.listNameInput.value;
_e=_e.replace(/^\s+/,"");
_e=_e.replace(/\s+$/,"");
if(_1.string.isBlank(_e)){
_d=Config.Strings.NameDistList;
ws.widget.OkCancelDialog.alert(_d);
}else{
this.saveDistributionList(_e);
}
},saveDistributionList:function(_f){
_1.debug("saveDistributionList");
var _10=[];
for(var i=0;i<this.addresses.length;i++){
if(this["listItemCheckBox"+i].checked){
_10.push(this["listItemSpan"+i].innerHTML);
}
}
if(_10.length==0){
this.hide();
ws.widget.OkCancelDialog.alert(Config.Strings.IncludeEmailDistList);
return;
}
this.addressModel.createOrModifyDistributionList({uid:0,name:_f,contactUids:[],addresses:_10,load:_1.lang.hitch(this,function(_12){
_1.html.setContentBox(this.listCreated.domNode,_1.html.getContentBox(this.creatingList.domNode));
this.creatingList.hide();
this.listCreated.show();
}),error:function(err){
ws.widget.OkCancelDialog.alert(_1.string.isBlank(err)?Config.Strings.ErrorSavingDistList:err);
}});
},closeCardClick:function(evt){
var _15=_1.html.overElement(this.confirmationWidget.createDistributionListButton.domNode,evt);
var _16=_1.html.overElement(this.domNode,evt);
if(!_15&&!_16){
this.closeCard();
}
},closeCard:function(){
this.creatingList.hide();
this.listCreated.hide();
this.createListPane.hide();
_1.event.disconnect(document.documentElement,"onmousedown",this,"closeCardClick");
this.hide();
}});
_1.provide("ws.mail.SendConfirmationPage");
_1.require("dojo.html.display");
_1.require("dojo.html.layout");
_1.require("dojo.html.style");
_1.require("dojo.widget.*");
_1.require("dojo.widget.ContentPane");
_1.require("ws.widget.Advertisement");
_1.require("ws.widget.OkCancelDialog");
_1.require("ws.widget.WSButton");
_1.require("ws.widget.WSLayoutContainer");
_1.require("ws.widget.WSToolbar");
_1.widget.defineWidget("ws.mail.SendConfirmationPage",_1.widget.HtmlWidget,{templateString:"<div>\r\n\t<div dojoType=\"ws:WSLayoutContainer\" deferred=\"true\" class=\"sendConfirmation\" dojoAttachPoint=\"sendConfirmation\">\r\n\t\t<div dojoType=\"dojo:ContentPane\" class=\"confirmationHeader\" layoutAlign=\"top\">\r\n\t\t\t<div class=\"confirmText\">\r\n\t\t\t\t<img src=\"${spacer}\" align=\"absmiddle\" />\r\n\t\t\t\t<div class=\"confirmMessage\">\r\n\t\t\t\t\t${YourMessage} \"<div class=\"confirmSubject\"><span dojoAttachPoint=\"confirmSubject\"></span></div>\" ${BeenSent}\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div dojoType=\"ws:WSToolbar\" layoutAlign=\"top\" dojoAttachPoint=\"sendConfToolbar\" vizType=\"Bare\">\r\n\t\t\t<div toolbarPosition=\"left\" dojoType=\"ws:WSButton\" vizType=\"SendConfirmation\" dojoAttachPoint=\"backToButton\" dojoAttachEvent=\"onClick: cancel\"></div>\r\n\t\t\t<div toolbarPosition=\"left\" dojoType=\"dojo:ContentPane\" dojoAttachPoint=\"createDistributionListButton\" class=\"buttonsPane ieFix\">\r\n\t\t\t\t<div><a href=\"#\" dojoAttachEvent=\"onClick: createDistributionList\" class=\"wsLink\">${CreateDistListButton}</a></div>\r\n\t\t\t</div>\r\n\t\t\t<!--\r\n\t\t\t<div toolbarPosition=\"left\" dojoType=\"dojo:ContentPane\" dojoAttachPoint=\"unsendButton\" class=\"buttonsPane\">\r\n\t\t\t\t<a href=\"#\" dojoAttachEvent=\"onClick: unSend\" class=\"wsLink\">${UnsendButton}</a>\r\n\t\t\t</div>\r\n\t\t\t<div toolbarPosition=\"left\" dojoType=\"dojo:ContentPane\" dojoAttachPoint=\"alertMeButton\" class=\"buttonsPane\">\r\n\t\t\t\t<a href=\"#\" dojoAttachEvent=\"onClick: alertMe\" class=\"wsLink\">${AlertMeButton}</a>\r\n\t\t\t</div>\r\n\t\t\t<div toolbarPosition=\"left\" dojoType=\"dojo:ContentPane\" dojoAttachPoint=\"inviteButton\" class=\"buttonsPane\">\r\n\t\t\t\t<a href=\"#\" dojoAttachEvent=\"onClick: invite\" class=\"wsLink\"></a>\r\n\t\t\t</div>\r\n\t\t\t-->\r\n\t\t</div>\r\n\t\t\r\n\t\t<div dojoType=\"dojo:ContentPane\" class=\"feedbackPane\" layoutAlign=\"left\">\t\r\n\t\t\t<iframe dojoAttachPoint=\"sendConfirmationPane\" src=\"about:blank\" frameborder=0 style=\"width: 370px; height:300px;\"></iframe>\r\n\t\t</div>\r\n\t\t<div dojoType=\"ws:Advertisement\" layoutAlign=\"client\" adtype=\"sendconfirm\" dojoAttachPoint=\"confirmationAdvertisement\"></div>\r\n\t\t<div layoutAlign=\"bottom\" dojoType=\"ws:Advertisement\"  adtype=\"sendconfirmtext\" dojoAttachPoint=\"confirmationTxtAdvertisement\"></div>\t\r\n\t</div>\r\n</div>\r\n",templateCssString:".composeMessage .sendConfirmation\r\n{\r\n\theight: 100%;\r\n\twidth: 100%;\r\n}\r\n\r\n.composeMessage .sendConfirmation .confirmationHeader\r\n{\r\n\tbackground-color: #F4F2F0;\r\n\tpadding-top: 24px;\r\n\tpadding-left: 36px;\r\n}\r\n\r\n.composeMessage .sendConfirmation .confirmationHeader .confirmText\r\n{\r\n\tfont-size: 18px;\r\n\tfont-weight: 500;\r\n\tpadding-left: 2px;\r\n}\r\n\r\n.composeMessage .sendConfirmation .confirmationHeader .confirmText .confirmMessage\r\n{\r\n\tdisplay: inline;\r\n\tmargin-bottom: 10px;\r\n\tmargin-left: 3px;\r\n}\r\n\r\n.composeMessage .sendConfirmation .confirmationHeader img\r\n{\r\n\twidth: 36px;\r\n\theight: 36px;\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tbackground-position: -1550px -29px;\r\n}\r\n\r\n.composeMessage .sendConfirmation .confirmationHeader .confirmSubject\r\n{\r\n\tdisplay: inline;\r\n\twidth: 200px;\r\n\twhite-space: nowrap;\r\n\toverflow: hidden;\r\n}\r\n\r\n.composeMessage .sendConfirmation .wsToolbar\r\n{\r\n\tmargin-top: 0px;\r\n\tmargin-bottom: 5px;\r\n\tpadding-left: 82px;\r\n\tbackground-color: #F4F2F0;\r\n}\r\n\r\n.composeMessage .sendConfirmation .buttonsPane\r\n{\r\n\tmargin-top: 3px;\r\n}\r\n\r\n.composeMessage .sendConfirmation .feedbackPane\r\n{\r\n\tpadding: 1px 2px 3px 4px;\r\n}\r\n\r\n.composeMessage .sendConfirmation .confirmationAdvertisement\r\n{\r\n\tmargin: 1px 2px 3px 4px;\r\n\tpadding: 1px 2px 3px 4px;\r\n\ttext-align: left;\r\n}\r\n\r\n.composeMessage .sendConfirmation .textAdsCotainer \r\n{\r\n\theight: 14px;\r\n}\r\n\r\n.dj_ie .composeMessage .sendConfirmation .ieFix\r\n{\r\n\twhite-space: nowrap;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/mail/SendConfirmationPage.css"),widgetsInTemplate:true,composeWidget:null,postCreate:function(){
_1.event.topic.subscribe(this.composeWidget.notebook.widgetId+"-selectChild",this,"testShowConfirmationAd");
_1.event.topic.subscribe("ws_view-selectChild",this,"testShowConfirmationAd");
this.confirmationTxtAdvertisement.domNode.style.height="25px";
},setupSendConfirmation:function(_17,_18){
var _19="";
this.toAddresses=[];
this.ccAddresses=[];
this.bccAddresses=[];
var _1a=false;
var _1b=false;
this.confirmSubject.innerHTML=_18;
if(this.confirmSubject.innerHTML.length>30){
this.confirmSubject.innerHTML=this.confirmSubject.innerHTML.substr(0,30)+"...";
}
if(_1.string.isBlank(this.confirmSubject.innerHTML)){
this.confirmSubject.innerHTML=Config.Strings.YourMessageNoCaps;
}
this.backToButton.setLabel(_17);
this.createDistributionListButton.hide();
_1.lang.setTimeout(_1.lang.hitch(this,function(){
_1.html.addClass(this.confirmationAdvertisement.domNode,"confirmationAdvertisement");
this.confirmationAdvertisement.block(false);
var url=Config.SendConfirmationLink||(Config.BaseResourcesURL+"SendConfirmation.htm");
_1.io.setIFrameSrc(this.sendConfirmationPane,url,true);
}),0);
if(this.composeWidget.toField.getValue()){
_19=this.composeWidget.toField.getValue().replace(/\s/g,"");
_19=_19.replace(/\,/g,";");
this.toAddresses=_19.split(";");
this._stripOutEmptyStrings(this.toAddresses);
}
if(this.composeWidget.ccField.getValue()){
_19=this.composeWidget.ccField.getValue().replace(/\s/g,"");
_19=_19.replace(/\,/g,";");
this.ccAddresses=_19.split(";");
this._stripOutEmptyStrings(this.ccAddresses);
}
if(this.composeWidget.bccField.getValue()){
_19=this.composeWidget.bccField.getValue().replace(/\s/g,"");
_19=_19.replace(/\,/g,";");
this.bccAddresses=_19.split(";");
this._stripOutEmptyStrings(this.bccAddresses);
}
if((this.toAddresses.length+this.ccAddresses.length+this.bccAddresses.length)>1){
_1.debug("lengths "+this.toAddresses.length+this.ccAddresses.length+this.bccAddresses.length);
this.createDistributionListButton.show();
}
},_stripOutEmptyStrings:function(_1d){
for(var i=0;i<_1d.length;i++){
if(_1.string.isBlank(_1d[i])){
_1d.splice(i--,1);
}
}
},layout:function(){
this.sendConfToolbar.onResized();
this.sendConfirmation.onResized();
},invite:function(){
var _1f="";
if(!this.sendConfirmationCard){
this.sendConfirmationCard=_1.widget.createWidget("ws:SendConfirmationCard",{confirmationWidget:this,model:this.composeWidget.model},_1.body(),"first");
}
if(this.toAddresses.length){
_1f=this.toAddresses[0];
}else{
if(this.ccAddresses.length){
_1f=this.ccAddresses[0];
}else{
if(this.bccAddresses.length){
_1f=this.bccAddresses[0];
}else{
_1.debug("Error setting address for Invite.");
return;
}
}
}
this.sendConfirmationCard.fillOutInvite(this.composeWidget.fromSelect.currentValue,_1f,this.inviteSubjects[0],this.inviteMessages[0]);
this.sendConfirmationCard.show();
_1.html.placeOnScreenAroundElement(this.sendConfirmationCard.domNode,this.inviteButton.domNode,[0,3],null,{"BL":"TL"});
},createDistributionList:function(){
if(!this.sendConfirmationCard){
this.sendConfirmationCard=_1.widget.createWidget("ws:SendConfirmationCard",{confirmationWidget:this,model:this.composeWidget.model,addressModel:this.composeWidget.toField.peoplePicker.model},_1.body(),"first");
}
_1.html.placeOnScreenAroundElement(this.sendConfirmationCard.domNode,this.createDistributionListButton.domNode,[0,3],null,{"BL":"TL"});
this.sendConfirmationCard.fillOutList(this.toAddresses,this.ccAddresses,this.bccAddresses);
},testShowConfirmationAd:function(_20){
if(_20.widgetId==this.widgetId){
if(this.confirmationAdvertisement.blocked){
this.confirmationAdvertisement.block(false);
}
}else{
if(!this.confirmationAdvertisement.blocked){
this.confirmationAdvertisement.block(true);
}
}
},onBetaReminderClick:function(){
var url="http://cta.aol.com/Pass?_open=true&_container=7&_language=en&_PID=100000&cid=FE6C6CA0-6DAC-11DA-801F-BF698958D45D&as=Webmail+Beta&amp;ad=Webmail+Beta&ld=";
var _22="scrollbars=no,location=no,directories=no,height=265,width=275,menubar=no,resizable=no,titlebar=no";
ws.io.openWindow(url,"CTA",_22);
},cancel:function(){
if(this.cancelCB){
this.cancelCB();
}
}});
_1.provide("ws.pictures.PictureEditControl");
_1.require("dojo.html.display");
_1.require("dojo.html.layout");
_1.require("dojo.widget.*");
_1.require("ws.html");
_1.require("ws.style");
_1.require("ws.widget.util");
_1.widget.defineWidget("ws.pictures.PictureEditControl",_1.widget.HtmlWidget,{templateString:"<div class=\"pictureEditControl\" style=\"display: none;\" dojoAttachEvent=\"onMouseOver; onMouseOut\">\r\n\t<div class=\"buttons\">\r\n\t\t<a href=\"#\" class=\"options\" dojoAttachEvent=\"onClick: showMenu\"></a>\r\n\t\t<a href=\"#\" class=\"delete\" dojoAttachPoint=\"deleteButton\"></a>\r\n\t</div>\r\n\t\t\r\n\t<div class=\"menu\" dojoAttachPoint=\"menuNode\" style=\"display: none;\" dojoAttachEvent=\"onMouseOver: onMouseOverMenu; onMouseOut: onMouseOutMenu\">\r\n\t\t<h2>${YGP_HoverOptionsTitle}</h2>\r\n\t\t<div class=\"row size\">\r\n\t\t\t<h3>${YGP_Size}</h3>\r\n\t\t\t<a href=\"#\" class=\"small\" dojoAttachPoint=\"sizeSmallButton\"></a>\r\n\t\t\t<a href=\"#\" class=\"medium\" dojoAttachPoint=\"sizeMediumButton\"></a>\r\n\t\t\t<a href=\"#\" class=\"large\" dojoAttachPoint=\"sizeLargeButton\"></a>\r\n\t\t</div>\r\n\t\t<div class=\"row align\">\r\n\t\t\t<h3>${YGP_Align}</h3>\r\n\t\t\t<a href=\"#\" class=\"left\" dojoAttachPoint=\"alignLeftButton\"></a>\r\n\t\t\t<a href=\"#\" class=\"center\" dojoAttachPoint=\"alignCenterButton\"></a>\r\n\t\t\t<a href=\"#\" class=\"right\" dojoAttachPoint=\"alignRightButton\"></a>\r\n\t\t</div>\r\n\t\t<div class=\"row wrap\">\r\n\t\t\t<h3>${YGP_Wrap}</h3>\r\n\t\t\t<a href=\"#\" class=\"right\" dojoAttachPoint=\"wrapRightButton\"></a>\r\n\t\t\t<a href=\"#\" class=\"none\" dojoAttachPoint=\"wrapNoneButton\"></a>\r\n\t\t\t<a href=\"#\" class=\"left\" dojoAttachPoint=\"wrapLeftButton\"></a>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n\r\n",templateCssString:".pictureEditControl {\r\n\tposition: absolute;\r\n\tz-index: 1;\r\n}\r\n\r\n.pictureEditControl .buttons a {\r\n\tdisplay: block;\r\n\tbackground: #fff url(\"${images}main.gif\");\r\n\tborder: 1px solid #A8D3EA;\r\n\tborder-top: none;\r\n\twidth: 24px;\r\n\theight: 24px;\r\n\t-moz-outline-style: none;\r\n}\r\n\r\n.pictureEditControl .buttons a.options {\r\n\tbackground-position: -221px -26px;\r\n\tborder-left: none;\r\n\tfloat: left;\t\r\n}\r\n.pictureEditControl .buttons a.options:hover {\r\n\tbackground-position: -251px -26px;\r\n}\r\n\r\n.pictureEditControl .buttons a.delete {\r\n\tbackground-position: -1301px 4px;\r\n\tborder-right: none;\r\n\tfloat: right;\t\r\n}\r\n.pictureEditControl .buttons a.delete:hover {\r\n\tbackground-position: -1322px 4px;\r\n}\r\n\r\n.pictureEditControl .menu {\r\n\tposition: absolute;\r\n\ttop: 26px;\r\n\tleft: 26px;\r\n\tbackground-color: white;\r\n\twidth: 156px;\r\n\tpadding: 7px 10px 9px 10px;\r\n\tborder: 1px solid #A8D3EA;\r\n}\r\n\r\n.pictureEditControl .menu h2 {\r\n\tfont: bold 11px Arial, Tahoma, sans-serif;\r\n\tmargin-bottom: 6px;\r\n\tmargin-top: 0px;\r\n\tcolor: #4B494B;\r\n}\r\n\r\n.pictureEditControl .menu .row {\r\n\tbackground-color: #C8E6F3;\r\n\tpadding: 5px 3px 5px 10px;\r\n\tmargin-bottom: 1px;\r\n\tfloat: left;\r\n}\r\n\r\n.pictureEditControl .menu .row h3 {\r\n\tdisplay: block;\r\n\twidth: 59px;\r\n\tmargin: 4px 0 0 0;\r\n\tfloat: left;\r\n\tfont: 10px Arial, Tahoma, sans-serif;\r\n\tcolor: #4B494B;\r\n}\r\n\r\n.pictureEditControl .menu .row a {\r\n\theight: 23px;\r\n\twidth: 23px;\r\n\tmargin-right: 5px;\r\n\tbackground: url(\"${images}main.gif\");\r\n\tfloat: left;\r\n\tdisplay: inline; /* fixes the IE double float margin bug */\r\n}\r\n\r\n.pictureEditControl .menu .size .small\t\t\t{ background-position: -285px -30px; }\r\n.pictureEditControl .menu .size .medium\t\t\t{ background-position: -315px -30px; }\r\n.pictureEditControl .menu .size .large\t\t\t{ background-position: -345px -30px; }\r\n.pictureEditControl .menu .align .left\t\t\t{ background-position: -375px -30px; }\r\n.pictureEditControl .menu .align .center\t\t{ background-position: -405px -30px; }\r\n.pictureEditControl .menu .align .right\t\t\t{ background-position: -435px -30px; }\r\n.pictureEditControl .menu .wrap .right\t\t\t{ background-position: -465px -30px; }\r\n.pictureEditControl .menu .wrap .none\t\t\t{ background-position: -495px -30px; }\r\n.pictureEditControl .menu .wrap .left\t\t\t{ background-position: -526px -30px; }\r\n\r\n.pictureEditControl .menu .size .smallActive\t\t{ background-position: -555px -30px; }\r\n.pictureEditControl .menu .size .mediumActive\t{ background-position: -585px -30px; }\r\n.pictureEditControl .menu .size .largeActive\t\t{ background-position: -615px -30px; }\r\n.pictureEditControl .menu .align .leftActive\t\t{ background-position: -645px -30px; }\r\n.pictureEditControl .menu .align .centerActive\t{ background-position: -675px -30px; }\r\n.pictureEditControl .menu .align .rightActive\t{ background-position: -705px -30px; }\r\n.pictureEditControl .menu .wrap .rightActive\t\t{ background-position: -735px -30px; }\r\n.pictureEditControl .menu .wrap .noneActive\t\t{ background-position: -765px -30px; }\r\n.pictureEditControl .menu .wrap .leftActive\t\t{ background-position: -796px -30px; }\r\n",templateCssPath:_1.uri.dojoUri("../ws/pictures/PictureEditControl.css"),editor:null,hoveredImage:null,postCreate:function(_23,_24){
_1.event.connect(this.sizeSmallButton,"onclick",ws.lang.hitch(this,"execCommand","size","small"));
_1.event.connect(this.sizeMediumButton,"onclick",ws.lang.hitch(this,"execCommand","size","medium"));
_1.event.connect(this.sizeLargeButton,"onclick",ws.lang.hitch(this,"execCommand","size","large"));
_1.event.connect(this.alignLeftButton,"onclick",ws.lang.hitch(this,"execCommand","align","left"));
_1.event.connect(this.alignCenterButton,"onclick",ws.lang.hitch(this,"execCommand","align","center"));
_1.event.connect(this.alignRightButton,"onclick",ws.lang.hitch(this,"execCommand","align","right"));
_1.event.connect(this.wrapRightButton,"onclick",ws.lang.hitch(this,"execCommand","wrap","right"));
_1.event.connect(this.wrapNoneButton,"onclick",ws.lang.hitch(this,"execCommand","wrap","none"));
_1.event.connect(this.wrapLeftButton,"onclick",ws.lang.hitch(this,"execCommand","wrap","left"));
_1.event.connect(this.deleteButton,"onclick",ws.lang.hitch(this,"execCommand","remove"));
this.handledImages=[];
setInterval(_1.lang.hitch(this,"installEventHandlers"),500);
},installEventHandlers:function(){
var _25=this.editor.doc().getElementsByTagName("img");
for(var i=0;i<_25.length;i++){
if(this.editor.picturePicker.imageIdMap[_25[i].id]&&_1.lang.find(this.handledImages,_25[i])==-1){
if(_1.render.html.ie){
_25[i].onmouseover=this.ieMouseOverImage;
_25[i].onmouseout=this.ieMouseOutImage;
}else{
_1.event.browser.addListener(_25[i],"onmouseover",ws.lang.hitch(this,"onMouseOverImage",_25[i]),false,true);
_1.event.browser.addListener(_25[i],"onmouseout",ws.lang.hitch(this,"onMouseOutImage"),false,true);
}
this.handledImages.push(_25[i]);
}
}
if(this.hoveredImage&&!this.hoveredImage.parentNode){
_1.html.hide(this.menuNode);
_1.html.hide(this.domNode);
this.hoveredImage=null;
}
},ieMouseOverImage:function(){
_1.widget.widgetIds.ws_PictureEditControl_0.onMouseOverImage(this,null);
},onMouseOverImage:function(img,evt){
var _29=_1.html.getBorderBox(img).width;
var _2a=ws.html.getAbsolutePositionExt(img,false,null,window);
var _2b=_1.html.getAbsolutePosition(this.editor.iframe);
var _2c=this.editor.doc().body.clientWidth;
if(_2a.x<_2b.x){
_29-=(_2b.x-_2a.x);
_2a.x=_2b.x;
}
if(_2a.x+_29>_2b.x+_2c){
_29=(_2b.x+_2c-_2a.x);
}
if(_2a.y<_2b.y){
_2a.y=_2b.y;
}
this.domNode.style.left=(_2a.x)+"px";
this.domNode.style.top=(_2a.y)+"px";
this.domNode.style.width=(_29)+"px";
ws.html.showSoon(this.domNode);
this.hoveredImage=img;
},ieMouseOutImage:function(evt){
_1.widget.widgetIds.ws_PictureEditControl_0.onMouseOutImage(this,null);
},onMouseOutImage:function(evt){
ws.html.hideSoon(this.menuNode);
ws.html.hideSoon(this.domNode);
},onMouseOver:function(evt){
ws.html.showSoon(this.domNode);
},onMouseOut:function(evt){
ws.html.hideSoon(this.domNode);
},onMouseOverMenu:function(evt){
ws.html.showSoon(this.menuNode);
ws.html.showSoon(this.domNode);
},onMouseOutMenu:function(evt){
if(evt.target==this.menuNode){
ws.html.hideSoon(this.menuNode);
ws.html.hideSoon(this.domNode);
}
},showMenu:function(){
this.updateMenuState(this.hoveredImage);
_1.html.show(this.menuNode);
},execCommand:function(cmd,_34){
var img=this.hoveredImage;
switch(cmd){
case "size":
this.setSize(img,_34);
break;
case "align":
this.setAlign(img,_34);
break;
case "wrap":
this.setWrap(img,_34);
break;
case "remove":
this.removeImage(img);
break;
}
_1.html.hide(this.menuNode);
_1.html.hide(this.domNode);
},sizes:{small:96,medium:Config.InsertedPictureLongestEdge,large:600},setSize:function(img,_37){
var _38=this.sizes[_37];
var pic=this.editor.picturePicker.imageIdMap[img.id];
var _3a=pic.getDimensionsForLongestEdge(_38);
var _3b=pic.getPictureSizeForDimensions(_3a);
var url=pic.getPermalinkForPictureSize(_3b);
img.src=url;
img.height=_3a.height;
img.width=_3a.width;
img.style.height="";
img.style.width="";
},setAlign:function(img,_3e){
var env=this.envelopImage(img);
env.align=_3e;
ws.style.setFloat(env,"none");
},setWrap:function(img,_41){
var flt={left:"right",right:"left",none:"none"}[_41];
var env=this.envelopImage(img);
ws.style.setFloat(env,flt);
if(_41=="none"){
env.align="left";
}
},removeImage:function(img){
img.parentNode.removeChild(img);
if(_1.render.html.moz){
this.editor.insertHTML("<span></span>");
}
},envelopImage:function(img){
var env=this.getEnvelope(img);
if(env){
return env;
}
env=this.editor.doc().createElement("div");
env.className="envelope";
var _47=img.cloneNode(false);
env.appendChild(_47);
img.parentNode.replaceChild(env,img);
return env;
},getEnvelope:function(img){
var env=img.parentNode;
if(env&&env.className=="envelope"&&env.childNodes.length==1){
return env;
}else{
return null;
}
},updateMenuState:function(img){
var env=this.getEnvelope(img);
var pic=this.editor.picturePicker.imageIdMap[img.id];
var _4d=_1.html.getContentBox(img);
var _4e=env?env.align:"left";
var flt=env?ws.style.getFloat(env):"none";
var _50=flt!="left"&&flt!="right";
function eq(sz1,sz2){
return sz1.height==sz2.height&&sz1.width==sz2.width;
}
var _53={sizeSmall:["small",eq(_4d,pic.getDimensionsForLongestEdge(this.sizes["small"]))],sizeMedium:["medium",eq(_4d,pic.getDimensionsForLongestEdge(this.sizes["medium"]))],sizeLarge:["large",eq(_4d,pic.getDimensionsForLongestEdge(this.sizes["large"]))],alignLeft:["left",_50&&(_4e=="left"||_4e=="")],alignCenter:["center",_50&&(_4e=="center")],alignRight:["right",_50&&(_4e=="right")],wrapRight:["right",flt=="left"],wrapLeft:["left",flt=="right"],wrapNone:["none",_50]};
for(var i in _53){
ws.html.toggleClass(this[i+"Button"],_53[i][0]+"Active",_53[i][1]);
}
}});
_1.provide("dojo.widget.TabContainer");
_1.require("dojo.lang.func");
_1.require("dojo.widget.*");
_1.require("dojo.widget.PageContainer");
_1.require("dojo.event.*");
_1.require("dojo.html.selection");
_1.require("dojo.widget.html.layout");
_1.widget.defineWidget("dojo.widget.TabContainer",_1.widget.PageContainer,{labelPosition:"top",closeButton:"none",templateString:null,templateString:"<div id=\"${this.widgetId}\" class=\"dojoTabContainer\">\r\n\t<div dojoAttachPoint=\"tablistNode\"></div>\r\n\t<div class=\"dojoTabPaneWrapper\" dojoAttachPoint=\"containerNode\" dojoAttachEvent=\"onKey\" waiRole=\"tabpanel\"></div>\r\n</div>\r\n",templateCssString:".dojoTabContainer {\r\n\tposition : relative;\r\n}\r\n\r\n.dojoTabPaneWrapper {\r\n\tborder : 1px solid #6290d2;\r\n\t_zoom: 1; /* force IE6 layout mode so top border doesnt disappear */\r\n\tdisplay: block;\r\n\tclear: both;\r\n\toverflow: hidden;\r\n}\r\n\r\n.dojoTabLabels-top {\r\n\tposition : relative;\r\n\ttop : 0px;\r\n\tleft : 0px;\r\n\toverflow : visible;\r\n\tmargin-bottom : -1px;\r\n\twidth : 100%;\r\n\tz-index: 2;\t/* so the bottom of the tab label will cover up the border of dojoTabPaneWrapper */\r\n}\r\n\r\n.dojoTabNoLayout.dojoTabLabels-top .dojoTab {\r\n\tmargin-bottom: -1px;\r\n\t_margin-bottom: 0px; /* IE filter so top border lines up correctly */\r\n}\r\n\r\n.dojoTab {\r\n\tposition : relative;\r\n\tfloat : left;\r\n\tpadding-left : 9px;\r\n\tborder-bottom : 1px solid #6290d2;\r\n\tbackground : url(images/tab_left.gif) no-repeat left top;\r\n\tcursor: pointer;\r\n\twhite-space: nowrap;\r\n\tz-index: 3;\r\n}\r\n\r\n.dojoTab div {\r\n\tdisplay : block;\r\n\tpadding : 4px 15px 4px 6px;\r\n\tbackground : url(images/tab_top_right.gif) no-repeat right top;\r\n\tcolor : #333;\r\n\tfont-size : 90%;\r\n}\r\n\r\n.dojoTab .close {\r\n\tdisplay : inline-block;\r\n\theight : 12px;\r\n\twidth : 12px;\r\n\tpadding : 0 12px 0 0;\r\n\tmargin : 0 -10px 0 10px;\r\n\tcursor : default;\r\n\tfont-size: small;\r\n}\r\n\r\n.dojoTab .closeImage {\r\n\tbackground : url(images/tab_close.gif) no-repeat right top;\r\n}\r\n\r\n.dojoTab .closeHover {\r\n\tbackground-image : url(images/tab_close_h.gif);\r\n}\r\n\r\n.dojoTab.current {\r\n\tpadding-bottom : 1px;\r\n\tborder-bottom : 0;\r\n\tbackground-position : 0 -150px;\r\n}\r\n\r\n.dojoTab.current div {\r\n\tpadding-bottom : 5px;\r\n\tmargin-bottom : -1px;\r\n\tbackground-position : 100% -150px;\r\n}\r\n\r\n/* bottom tabs */\r\n\r\n.dojoTabLabels-bottom {\r\n\tposition : relative;\r\n\tbottom : 0px;\r\n\tleft : 0px;\r\n\toverflow : visible;\r\n\tmargin-top : -1px;\r\n\twidth : 100%;\r\n\tz-index: 2;\r\n}\r\n\r\n.dojoTabNoLayout.dojoTabLabels-bottom {\r\n\tposition : relative;\r\n}\r\n\r\n.dojoTabLabels-bottom .dojoTab {\r\n\tborder-top :  1px solid #6290d2;\r\n\tborder-bottom : 0;\r\n\tbackground : url(images/tab_bot_left.gif) no-repeat left bottom;\r\n}\r\n\r\n.dojoTabLabels-bottom .dojoTab div {\r\n\tbackground : url(images/tab_bot_right.gif) no-repeat right bottom;\r\n}\r\n\r\n.dojoTabLabels-bottom .dojoTab.current {\r\n\tborder-top : 0;\r\n\tbackground : url(images/tab_bot_left_curr.gif) no-repeat left bottom;\r\n}\r\n\r\n.dojoTabLabels-bottom .dojoTab.current div {\r\n\tpadding-top : 4px;\r\n\tbackground : url(images/tab_bot_right_curr.gif) no-repeat right bottom;\r\n}\r\n\r\n/* right-h tabs */\r\n\r\n.dojoTabLabels-right-h {\r\n\toverflow : visible;\r\n\tmargin-left : -1px;\r\n\tz-index: 2;\r\n}\r\n\r\n.dojoTabLabels-right-h .dojoTab {\r\n\tpadding-left : 0;\r\n\tborder-left :  1px solid #6290d2;\r\n\tborder-bottom : 0;\r\n\tbackground : url(images/tab_bot_right.gif) no-repeat right bottom;\r\n\tfloat : none;\r\n}\r\n\r\n.dojoTabLabels-right-h .dojoTab div {\r\n\tpadding : 4px 15px 4px 15px;\r\n}\r\n\r\n.dojoTabLabels-right-h .dojoTab.current {\r\n\tborder-left :  0;\r\n\tborder-bottom :  1px solid #6290d2;\r\n}\r\n\r\n/* left-h tabs */\r\n\r\n.dojoTabLabels-left-h {\r\n\toverflow : visible;\r\n\tmargin-right : -1px;\r\n\tz-index: 2;\r\n}\r\n\r\n.dojoTabLabels-left-h .dojoTab {\r\n\tborder-right :  1px solid #6290d2;\r\n\tborder-bottom : 0;\r\n\tfloat : none;\r\n\tbackground : url(images/tab_top_left.gif) no-repeat left top;\r\n}\r\n\r\n.dojoTabLabels-left-h .dojoTab.current {\r\n\tborder-right : 0;\r\n\tborder-bottom :  1px solid #6290d2;\r\n\tpadding-bottom : 0;\r\n\tbackground : url(images/tab_top_left.gif) no-repeat 0 -150px;\r\n}\r\n\r\n.dojoTabLabels-left-h .dojoTab div {\r\n\tbackground : 0;\r\n\tborder-bottom :  1px solid #6290d2;\r\n}\r\n",templateCssPath:_1.uri.moduleUri("dojo.widget","templates/TabContainer.css"),selectedTab:"",postMixInProperties:function(){
if(this.selectedTab){
_1.deprecated("selectedTab deprecated, use selectedChild instead, will be removed in","0.5");
this.selectedChild=this.selectedTab;
}
if(this.closeButton!="none"){
_1.deprecated("closeButton deprecated, use closable='true' on each child instead, will be removed in","0.5");
}
_1.widget.TabContainer.superclass.postMixInProperties.apply(this,arguments);
},fillInTemplate:function(){
this.tablist=_1.widget.createWidget("TabController",{id:this.widgetId+"_tablist",labelPosition:this.labelPosition,doLayout:this.doLayout,containerId:this.widgetId},this.tablistNode);
_1.widget.TabContainer.superclass.fillInTemplate.apply(this,arguments);
},postCreate:function(_55,_56){
_1.widget.TabContainer.superclass.postCreate.apply(this,arguments);
this.onResized();
},_setupChild:function(tab){
if(this.closeButton=="tab"||this.closeButton=="pane"){
tab.closable=true;
}
_1.html.addClass(tab.domNode,"dojoTabPane");
_1.widget.TabContainer.superclass._setupChild.apply(this,arguments);
},onResized:function(){
if(!this.doLayout){
return;
}
var _58=this.labelPosition.replace(/-h/,"");
var _59=[{domNode:this.tablist.domNode,layoutAlign:_58},{domNode:this.containerNode,layoutAlign:"client"}];
_1.widget.html.layout(this.domNode,_59);
if(this.selectedChildWidget){
var _5a=_1.html.getContentBox(this.containerNode);
this.selectedChildWidget.resizeTo(_5a.width,_5a.height);
}
},selectTab:function(tab,_5c){
_1.deprecated("use selectChild() rather than selectTab(), selectTab() will be removed in","0.5");
this.selectChild(tab,_5c);
},onKey:function(e){
if(e.keyCode==e.KEY_UP_ARROW&&e.ctrlKey){
var _5e=this.correspondingTabButton||this.selectedTabWidget.tabButton;
_5e.focus();
_1.event.browser.stopEvent(e);
}else{
if(e.keyCode==e.KEY_DELETE&&e.altKey){
if(this.selectedChildWidget.closable){
this.closeChild(this.selectedChildWidget);
_1.event.browser.stopEvent(e);
}
}
}
},destroy:function(){
this.tablist.destroy();
_1.widget.TabContainer.superclass.destroy.apply(this,arguments);
}});
_1.widget.defineWidget("dojo.widget.TabController",_1.widget.PageController,{templateString:"<div wairole='tablist' dojoAttachEvent='onKey'></div>",labelPosition:"top",doLayout:true,"class":"",buttonWidget:"TabButton",postMixInProperties:function(){
if(!this["class"]){
this["class"]="dojoTabLabels-"+this.labelPosition+(this.doLayout?"":" dojoTabNoLayout");
}
_1.widget.TabController.superclass.postMixInProperties.apply(this,arguments);
}});
_1.widget.defineWidget("dojo.widget.TabButton",_1.widget.PageButton,{templateString:"<div class='dojoTab' dojoAttachEvent='onClick'>"+"<div dojoAttachPoint='innerDiv'>"+"<span dojoAttachPoint='titleNode' tabIndex='-1' waiRole='tab'>${this.label}</span>"+"<span dojoAttachPoint='closeButtonNode' class='close closeImage' style='${this.closeButtonStyle}'"+"    dojoAttachEvent='onMouseOver:onCloseButtonMouseOver; onMouseOut:onCloseButtonMouseOut; onClick:onCloseButtonClick'></span>"+"</div>"+"</div>",postMixInProperties:function(){
this.closeButtonStyle=this.closeButton?"":"display: none";
_1.widget.TabButton.superclass.postMixInProperties.apply(this,arguments);
},fillInTemplate:function(){
_1.html.disableSelection(this.titleNode);
_1.widget.TabButton.superclass.fillInTemplate.apply(this,arguments);
},onCloseButtonClick:function(evt){
evt.stopPropagation();
_1.widget.TabButton.superclass.onCloseButtonClick.apply(this,arguments);
}});
_1.widget.defineWidget("dojo.widget.a11y.TabButton",_1.widget.TabButton,{imgPath:_1.uri.moduleUri("dojo.widget","templates/images/tab_close.gif"),templateString:"<div class='dojoTab' dojoAttachEvent='onClick;onKey'>"+"<div dojoAttachPoint='innerDiv'>"+"<span dojoAttachPoint='titleNode' tabIndex='-1' waiRole='tab'>${this.label}</span>"+"<img class='close' src='${this.imgPath}' alt='[x]' style='${this.closeButtonStyle}'"+"    dojoAttachEvent='onClick:onCloseButtonClick'>"+"</div>"+"</div>"});
_1.provide("ws.pictures.PictureUploader");
_1.require("dojo.widget.*");
_1.require("ws.widget.WSButton");
_1.widget.defineWidget("ws.pictures.PictureUploader",_1.widget.HtmlWidget,{widgetsInTemplate:true,templateString:"<table style='height: 100%; width: 100%;'><tr><td valign='center' align='center'>"+"\t<div dojoType='ws:WSButton' vizType='Blue' dojoAttachPoint='browseButton'>"+Config.Strings.YGP_BrowseButtonLabel+"</div>"+"\t<iframe style='display: none;' src='about:blank' name='${this.widgetId}UploadFrame'></iframe>"+"</td></tr></table>",validTypes:["jpg","jpeg","jpe","gif","bmp"],nextUploadFormIndex:0,placeholderCount:0,model:null,picker:null,editor:null,postCreate:function(_60,_61){
this.uploadForms=[];
this.addUploadForm();
this.browseButton.domNode.style.overflow="hidden";
},addUploadForm:function(){
var _62=ws.string.substituteParams("<form enctype='multipart/form-data' method='post'><input type='file' name='%{name}' style='position: absolute; right: 0px; top: 0px; font-size: 5em; z-index: 2;'></form>",{name:"uploadfile"+this.nextUploadFormIndex});
var _63=document.createElement("div");
_63.innerHTML=_62;
this.browseButton.domNode.appendChild(_63);
var _64=_63.getElementsByTagName("form")[0];
var _65=_64.getElementsByTagName("input")[0];
_1.event.connect(_65,"onchange",this,"onSelectFile");
_1.html.setOpacity(_65,0);
var _66={};
_66.container=_63;
_66.form=_64;
_66.input=_65;
_66.status="empty";
this.uploadForms.push(_66);
this.nextUploadFormIndex++;
},onSelectFile:function(e){
var tgt=e.target;
if(!tgt.value){
_1.debug("onSelectFile: Could not get filename from form field");
return;
}
var _69=this.getFileInfo(tgt.value);
var _6a=this.uploadForms[this.uploadForms.length-1];
if(!_69.isValid){
_6a.form.reset();
ws.widget.OkCancelDialog.alert(Config.Strings.YGP_InvalidFormat);
return;
}
tgt.onchange=null;
_6a.status="ready";
_6a.fileInfo=_69;
_6a.placeholderId=this.insertPlaceholder();
_1.html.hide(_6a.form);
this.addUploadForm();
this.startUploadProcess();
},getFileInfo:function(_6b){
var _6c={};
var _6d=_1.render.os.win?"\\":"/";
var _6e=_6b.lastIndexOf(_6d);
var _6f=_6b.substring(_6e+1);
var _70=_6b.substring(0,_6e);
var _71=false;
var ext="unknown";
var _73=_6b.lastIndexOf(".");
if(_73!=-1){
ext=_6b.substring(_73+1).toLowerCase();
_71=_1.lang.find(this.validTypes,ext)!=-1;
}
_6c.fullName=_6b;
_6c.filename=_6f;
_6c.path=_70;
_6c.type=ext;
_6c.isValid=_71;
return _6c;
},insertPlaceholder:function(){
var id="wsPlaceholder"+this.placeholderCount;
this.editor.insertImage(Config.SpacerImageURL,{width:Config.InsertedPictureLongestEdge,height:Config.InsertedPictureLongestEdge},id,null,"wsPlaceholder");
this.placeholderCount++;
return id;
},startUploadProcess:function(){
this.model.getUploadToken(_1.lang.hitch(this,function(){
if(this.model.uploadUrl){
this.submitNextQueuedForm();
}else{
ws.widget.OkCancelDialog.alert(Config.Strings.YGP_UploadError);
for(var i=0;i<this.uploadForms.length;i++){
this.uploadForms[i].status="error";
}
for(var i=0;i<this.placeholderCount;i++){
this.replacePlaceholder(null,"wsPlaceholder"+i);
}
}
}));
},submitNextQueuedForm:function(){
if(!this.model.uploadUrl){
_1.debug("submitNextQueuedForm: no uploadUrl");
return;
}
if(this.uploadInProgress()){
return;
}
for(var i=0;i<this.uploadForms.length;i++){
if(this.uploadForms[i].status=="ready"){
_1.io.bind({url:this.model.uploadUrl,formNode:this.uploadForms[i].form,method:"post",mimetype:"application/json",handle:_1.lang.hitch(this,"handleUploadResponse")});
this.uploadForms[i].status="uploading";
break;
}
}
},uploadInProgress:function(){
return _1.lang.some(this.uploadForms,function(_77){
return _77.status=="uploading";
});
},handleUploadResponse:function(_78,_79,evt){
var _7b=null;
if(_78=="load"&&_79&&_79.isSuccess){
var _7c=_79.album.pictures;
if(_7c.length>0){
var p=_7c[_7c.length-1];
_7b=new ws.pictures.picture(p);
}
}
var _7e=null;
for(var i=0;i<this.uploadForms.length;i++){
if(this.uploadForms[i].status=="uploading"){
_7e=this.uploadForms[i];
break;
}
}
if(_7e){
_7e.status="complete";
if(_7e.placeholderId){
this.replacePlaceholder(_7b,_7e.placeholderId);
}
if(!_7b){
ws.widget.OkCancelDialog.alert(ws.string.substituteParams("The picture {0} failed to upload. Please try again later",_7e.fileInfo.filename));
}
}
this.submitNextQueuedForm();
},replacePlaceholder:function(pic,id){
var ph=_1.byId(id,this.editor.doc());
if(!pic||!pic.id){
if(ph){
ph.parentNode.removeChild(ph);
}
return;
}
var _83=pic.getDimensionsForLongestEdge(Config.InsertedPictureLongestEdge);
var _84=pic.getPictureSizeForDimensions(_83);
var url=pic.getPermalinkForPictureSize(_84);
if(ph){
ph.src=url;
ph.id=this.picker.createIdForImage(pic);
ph.height=_83.height;
ph.width=_83.width;
ph.className="AOLInlineImage";
ph.setAttribute("_viewlink",pic.getImageViewURL());
}
}});
_1.provide("ws.pictures.PicturePicker");
_1.require("dojo.html.layout");
_1.require("dojo.html.metrics");
_1.require("dojo.widget.*");
_1.require("dojo.widget.ContentPane");
_1.require("dojo.widget.LayoutContainer");
_1.require("dojo.widget.PageContainer");
_1.require("ws.pictures.model");
_1.require("ws.widget.ListView");
_1.declare("ws.pictures.PicturePickerGridModel",turbo.data.virtual,function(_86,_87){
this.model=_87;
_1.event.connect(_87,"albumListUpdated",this,"modelUpdated");
_1.event.connect(_87,"currentAlbumUpdated",this,"modelUpdated");
},{columns:{Name:0,Select:1},modelUpdated:function(){
},get:function(row,col){
var _8a=this.model.albums[row];
if(_8a==null){
return "Album Error";
}
switch(col){
case this.columns.Name:
return _1.string.escapeXml(_8a.title)+" <b>("+_8a.pictureCount+")</b>";
case this.columns.Select:
return _8a===this.model.currentAlbum?"ON":"OFF";
}
},getRow:function(row){
var _8c=this.model.albums[row];
if(_8c==null){
return "Album Error";
}
var _8d=_1.string.escapeXml(_8c.title)+" <b>("+_8c.pictureCount+")</b>";
return [_8d,""];
},getRowCount:function(){
return this.model.albums.length;
}});
_1.widget.defineWidget("ws.pictures.PicturePicker",ws.widget.ListView,{templateString:"<div class=\"picturePicker\" style=\"display: none;\">\r\n\t<div class=\"listView\" dojoType=\"dojo:LayoutContainer\" dojoAttachPoint=\"layoutWidget\" style=\"height: 100%; width: 100%;\">\r\n\t\t<div layoutAlign=\"left\" dojoType=\"dojo:TabContainer\" dojoAttachPoint=\"tabPanel\">\r\n\t\t\t<div dojoType=\"TurboDataGrid\" dojoAttachPoint=\"grid\" label=\"${YGP_AOLTabTitle}\" defaultLeftWidth=\"0\"></div>\r\n\t\t\t<div dojoType=\"ws:PictureUploader\" label=\"${YGP_UploadTabTitle}\" dojoAttachPoint=\"uploader\"></div>\r\n\t\t</div>\r\n\t\t<div dojoAttachPoint=\"thumbnailPaneInfo\" class=\"thumbnailPaneInfo\">${YGP_InsertText}</div>\r\n\t\t<div layoutAlign=\"client\" dojoType=\"dojo:PageContainer\" dojoAttachPoint=\"thumbnailPageContainer\">\r\n\t\t\t<div dojoType=\"dojo:ContentPane\" dojoAttachPoint=\"thumbnailPaneWrapper\" class=\"rightPane thumbnailPaneWrapper\">\r\n\t\t\t\t<div dojoType=\"dojo:ContentPane\" dojoAttachPoint=\"thumbnailPane\" class=\"thumbnailPane\"></div>\r\n\t\t\t</div>\r\n\t\t\t<div dojoType=\"dojo:ContentPane\" dojoAttachPoint=\"messagePane\" class=\"rightPane message\">\r\n\t\t\t\t<table><tr><td valign=\"center\" dojoAttachPoint=\"messageNode\"></td></tr></table>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n",templateCssString:".picturePicker {\r\n\tposition: absolute;\r\n\tbackground-color: #F4F2F0;\r\n\tz-index: 10;\r\n\tpadding: 5px 13px 5px 5px;\r\n}\r\n\r\n.picturePicker .dojoTabContainer {\r\n\tmargin-right: 5px;\r\n}\r\n\r\n.picturePicker .dojoTabLabels-top {\r\n\tmargin-bottom: -2px;\r\n\tz-index: 2;\r\n}\r\n\r\n.picturePicker .dojoTabPaneWrapper {\r\n\tborder: 1px solid #B3B3B3;\r\n\tbackground-color: #FFFFFF;\r\n\tz-index: 1;\r\n}\r\n\r\n.picturePicker .dojoTab {\r\n\tbackground-image: none;\r\n\tbackground-color: #E9E9E9;\r\n\tborder: 1px solid #B3B3B3;\r\n\tmargin-top: 1px;\r\n}\r\n\r\n.picturePicker .dojoTab div {\r\n\tbackground-image: none;\r\n\tcolor: #464646;\r\n\tpadding: 2px 9px 2px 0px;\r\n}\r\n\r\n.picturePicker .dojoTab span {\r\n\t-moz-outline: none;\r\n}\r\n\r\n.picturePicker .dojoTab.current {\r\n\tborder-bottom: 1px solid #FFFFFF;\r\n\tbackground-color: #FFFFFF;\r\n\tmargin-top: 0px;\r\n\tfont-weight: bold;\r\n}\r\n\r\n.picturePicker .dojoTab.current div {\r\n\tcolor: #000000;\r\n}\r\n\r\n.picturePicker .turbogrid-scrollbox {\r\n\tborder-top: none;\r\n}\r\n\r\n/* These need to be specific enough to override the rules in ListView.css */\r\nbody .picturePicker .turbogrid-row-over .turbogrid-cell { background-color: #FFFFFF !important; }\r\nbody .picturePicker .row-selected .turbogrid-cell { background-color: #E1E9FE !important; }\r\n\r\n\r\n.picturePicker .rightPane {\r\n\tbackground-color: #FFFFFF;\r\n\tborder: 1px solid #B3B3B3;\r\n}\r\n\r\n.picturePicker .thumbnailPaneWrapper {\r\n\t/*x overflow: hidden; */\r\n\toverflow: auto;\r\n}\r\n\r\n.picturePicker .thumbnailPane {\r\n\t/*x\r\n\theight: 100%;\r\n\toverflow: scroll;\r\n\t*/\r\n\tposition: relative;\r\n\toverflow: visible;\r\n}\r\n\r\n.picturePicker .thumbnailPaneInfo {\r\n\tposition: absolute;\r\n\tz-index: 11;\r\n\ttext-align: center;\r\n\tfont-weight: bold;\r\n\tcolor: #90bc00;\r\n\ttop: 3px;\r\n}\r\n\r\n.picturePicker .message table {\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\ttext-align: center;\r\n\tcolor: #000000;\r\n}\r\n\r\n.thumbnail {\r\n\tposition: absolute;\r\n\theight: 62px;\r\n\twidth: 62px;\r\n\toverflow: hidden;\r\n\tborder: 1px solid #F2F2F2;\r\n\tbackground-color: #FDFDFD;\r\n\tmargin: 3px;\r\n}\r\n.thumbnailSelected {\r\n\tborder-color: #31C103;\r\n}\r\n\r\n.thumbnail .imageDiv {\r\n\twidth: 56px;\r\n\theight: 56px;\r\n\tborder: 3px solid #FDFDFD;\r\n\tposition: relative;\r\n\toverflow: hidden;\r\n\tz-index: 1;\r\n}\r\n\r\n.thumbnail .imageDivHover,\r\n.thumbnail .imageDiv:hover {\r\n\tborder-color: #4291DC;\r\n}\r\n\r\n.thumbnailSelected .imageDiv {\r\n\tborder-color: #31C103 !important;\r\n\t/* This is important so that the selected color overrides the above rule for hover color */\r\n}\r\n\r\n.thumbnail .imageDiv img {\r\n\tposition: absolute;\r\n}\r\n\r\n.thumbnail .checkbox {\r\n\tdisplay: none;\r\n\tposition: absolute;\r\n\tbottom: 2px;\r\n\tleft: 2px;\t\r\n\tbackground: url(\"${images}main.gif\") -885px -30px;\r\n\twidth: 18px;\r\n\theight: 18px;\r\n\tz-index: 2; /* to appear in front of the imageDiv */\r\n}\r\n\r\n.thumbnailSelected .checkbox {\r\n\tdisplay: block;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/pictures/PicturePicker.css"),wrapperModelClass:ws.pictures.PicturePickerGridModel,speedUp:true,editor:null,thumbnailShortestEdge:56,initView:function(){
this.columns=[[turbo.grid.format.text,{caption:"Name",align:"left",width:75}],[turbo.grid.format.text,{hidden:true}]];
this.autosizeColumnIndex=this.gridModel.columns.Name;
_1.html.hide(this.grid.headerNode);
this.model.getAlbumList();
_1.event.connect(this.model,"currentAlbumUpdated",this,"updateThumbnailPane");
_1.event.connect("after",this.tabPanel,"selectChild",this,"updateThumbnailPane");
window.setInterval(_1.lang.hitch(this,"checkForDroppedThumbnails"),1000);
this.uploader.model=this.model;
this.uploader.editor=this.editor;
this.uploader.picker=this;
this.imageIdMap={};
_1.html.hide(this.thumbnailPaneInfo);
ws.pictures.PicturePicker.superclass.initView.apply(this,arguments);
},layout:function(){
this.tabPanel.domNode.style.width="190px";
this.layoutWidget.onResized();
this.thumbnailPaneInfo.style.left=_1.html.getContentBox(this.tabPanel.domNode).width+"px";
this.thumbnailPaneInfo.style.width=_1.html.getContentBox(this.thumbnailPageContainer.domNode).width+"px";
},handleCellClick:function(e){
var row=e.rowIndex;
var _90=this.model.albums[row];
this.model.selectAlbum(_90);
},updateThumbnailPane:function(){
if(this.tabPanel.selectedChildWidget==this.uploader){
this.showMessage(ws.string.substituteParams(Config.Strings.YGP_UploadNotStartedHelp,"<br>"));
return;
}else{
if(!this.model.currentAlbum){
this.showMessage(null);
return;
}else{
if(!this.model.currentAlbum.loaded){
this.showMessage(Config.Strings.YGP_AlbumLoading);
return;
}else{
if(this.model.currentAlbum.pictures.length==0){
this.showMessage(ws.string.substituteParams(Config.Strings.YGP_EmptyShoebox,"<br>","",""));
return;
}
}
}
}
this.showMessage(null);
var _91=0;
var _92=0;
this.paneHeight=_1.html.getContentBox(this.thumbnailPaneWrapper.domNode).height;
if(this.model.currentAlbum==this.currentlyDisplayedAlbum){
return;
}
this.currentlyDisplayedAlbum=this.model.currentAlbum;
this.thumbnailPane.destroyChildren();
this.renderPictureRange(this.model.currentAlbum.pictures,0);
},showMessage:function(msg){
if(msg){
this.messageNode.innerHTML=msg;
this.thumbnailPageContainer.selectChild(this.messagePane);
_1.html.hide(this.thumbnailPaneInfo);
}else{
this.thumbnailPageContainer.selectChild(this.thumbnailPaneWrapper);
_1.html.show(this.thumbnailPaneInfo);
}
},renderPictureRange:function(_94,_95){
var _96=_94.length;
var _97=(_95==0)?5:2;
var _98=_95+Math.min(_97,_94.length-_95);
this.nextChunkIndex=(_98<_94.length)?_98:null;
for(var i=_95;i<_98;i++){
var thm=_1.widget.createWidget("ws:Thumbnail",{picture:_94[i],shortestEdge:this.thumbnailShortestEdge},this.thumbnailPane.domNode,"last");
this.thumbnailPane.addChild(thm);
if(!this.thmWidth){
this.thmWidth=_1.html.getMarginBox(thm.domNode).width;
}
if(!this.thmHeight){
this.thmHeight=_1.html.getMarginBox(thm.domNode).height;
}
thm.domNode.style.left=(i*this.thmWidth)+"px";
}
if(_95==0){
var w=_1.html.getContentBox(this.thumbnailPane.domNode).width;
var _9c=(_94.length*this.thmWidth)>w;
if(!this.scrollbarWidth){
this.scrollbarWidth=_1.html.getScrollbar().width;
}
var _9d=this.paneHeight-(_9c?this.scrollbarWidth:0);
var _9e=(_9d-this.thmHeight)/2;
_9e+=5;
_1.html.setPositivePixelValue(this.thumbnailPane.domNode,"marginTop",_9e);
}
this.thumbnailPane.domNode.style.width=(_98*this.thmWidth)+"px";
if(this.nextChunkIndex){
_1.lang.setTimeout(_1.lang.hitch(this,function(){
if(this.nextChunkIndex){
this.renderPictureRange(_94,this.nextChunkIndex);
}
}),100);
}
},checkForDroppedThumbnails:function(){
var doc=this.editor.doc();
var _a0=doc.getElementsByTagName("img");
if(!this.model.currentAlbum){
return;
}
for(var i=0;i<_a0.length;i++){
var _a2=_a0[i];
if(_1.string.startsWith(_a2.id,"wsThumbnail")){
var id=_a2.id.substring(11);
var _a4=this.model.currentAlbum.getPictureById(id);
if(_a4){
_a2.parentNode.removeChild(_a2);
var thm=this.getThumbnailForPicture(_a4);
var _a6=thm.selected?this.getSelectedThumbnails():[thm];
for(var i=0;i<_a6.length;i++){
this.insertPictureAtCursor(_a6[i].picture);
}
this.deselectAllThumbnails();
}
}
}
},insertPictureAtCursor:function(pic){
var _a8=pic.getDimensionsForLongestEdge(Config.InsertedPictureLongestEdge);
var _a9=pic.getPictureSizeForDimensions(_a8);
var url=pic.getPermalinkForPictureSize(_a9);
var id=this.createIdForImage(pic);
this.editor.insertImage(url,_a8,id,pic.getImageViewURL(),"AOLInlineImage",pic.caption);
},createIdForImage:function(pic){
var id="AOLP"+Math.floor(Math.random()*1000000);
this.imageIdMap[id]=pic;
return id;
},getThumbnailForPicture:function(pic){
for(var i=0;i<this.thumbnailPane.children.length;i++){
if(this.thumbnailPane.children[i].picture.id==pic.id){
return this.thumbnailPane.children[i];
}
}
return null;
},getSelectedThumbnails:function(){
return _1.lang.filter(this.thumbnailPane.children,function(thm){
return thm.selected;
});
},deselectAllThumbnails:function(){
_1.lang.map(this.thumbnailPane.children,function(thm){
thm.select(false);
});
},processBeforeSend:function(){
var _b2=this.editor.doc().getElementsByTagName("img");
for(var i=0;i<_b2.length;i++){
var _b4=_b2[i];
var _b5=_b4.getAttribute("_viewlink");
if(_b5){
var _b6=this.editor.doc().createElement("a");
_b6.href=_b5;
_b4.removeAttribute("_viewlink");
var _b7=_b4.cloneNode(false);
_b6.appendChild(_b7);
_b6.style.display="block";
_b6.style.width=(_b4.width+10)+"px";
_b6.style.textDecoration="none";
_b7.style.display="block";
var _b8=this.editor.doc().createElement("div");
_b8.className="AOLPicturesFullSizeLink";
_b8.innerHTML=Config.Strings.YGP_ViewFullSize;
_b8.style.textAlign="right";
_b8.style.marginTop="-6px";
_b8.style.fontSize="11px";
_b6.appendChild(_b8);
_b4.parentNode.replaceChild(_b6,_b4);
}
}
}});
_1.widget.defineWidget("ws.pictures.Thumbnail",_1.widget.HtmlWidget,{picture:null,shortestEdge:56,loaded:false,selected:false,templateString:"<div class='thumbnail' dojoAttachEvent='onClick; ondblclick'>"+"\t<div dojoAttachPoint='imageDiv' class='imageDiv'>"+"\t\t<img class='wsThumbnail' dojoAttachPoint='imageNode' style='display: none;'>"+"\t</div>"+"\t<div class='checkbox'></div>"+"</div>",postCreate:function(_b9,_ba){
var _bb=this.picture.getDimensionsForShortestEdge(this.shortestEdge);
var _bc=this.picture.getPictureSizeForDimensions(_bb);
var _bd=this.picture.getUrlForPictureSize(_bc);
_1.event.connect(this.imageNode,"onload",_1.lang.hitch(this,function(){
_1.html.show(this.imageNode);
this.onLoad();
}));
this.imageNode.id="wsThumbnail"+this.picture.id;
this.imageNode.style.width=_bb.width+"px";
this.imageNode.style.height=_bb.height+"px";
this.imageNode.src=_bd;
if(this.picture.portrait){
this.imageNode.style.left="0px";
this.imageNode.style.top=(-(_bb.height-this.shortestEdge)/2)+"px";
}else{
this.imageNode.style.top="0px";
this.imageNode.style.left=(-(_bb.width-this.shortestEdge)/2)+"px";
}
var _be=_1.widget.getWidgetsByType("PicturePicker")[0];
_1.event.connect(this,"addPicture",_be,"insertPictureAtCursor");
ws.html.addHoverClass(this.imageDiv,"imageDivHover");
},onClick:function(){
this.select(!this.selected);
},ondblclick:function(){
this.addPicture(this.picture);
this.select(false);
},addPicture:function(_bf){
},onLoad:function(){
},select:function(sel){
this.selected=sel;
ws.html.toggleClass(this.domNode,"thumbnailSelected",sel);
}});
_1.provide("dojo.widget.ColorPalette");
_1.require("dojo.widget.*");
_1.require("dojo.html.layout");
_1.require("dojo.html.display");
_1.require("dojo.html.selection");
_1.widget.defineWidget("dojo.widget.ColorPalette",_1.widget.HtmlWidget,{palette:"7x10",_palettes:{"7x10":[["fff","fcc","fc9","ff9","ffc","9f9","9ff","cff","ccf","fcf"],["ccc","f66","f96","ff6","ff3","6f9","3ff","6ff","99f","f9f"],["c0c0c0","f00","f90","fc6","ff0","3f3","6cc","3cf","66c","c6c"],["999","c00","f60","fc3","fc0","3c0","0cc","36f","63f","c3c"],["666","900","c60","c93","990","090","399","33f","60c","939"],["333","600","930","963","660","060","366","009","339","636"],["000","300","630","633","330","030","033","006","309","303"]],"3x4":[["ffffff","00ff00","008000","0000ff"],["c0c0c0","ffff00","ff00ff","000080"],["808080","ff0000","800080","000000"]]},buildRendering:function(){
this.domNode=document.createElement("table");
_1.html.disableSelection(this.domNode);
_1.event.connect(this.domNode,"onmousedown",function(e){
e.preventDefault();
});
with(this.domNode){
cellPadding="0";
cellSpacing="1";
border="1";
style.backgroundColor="white";
}
var _c2=this._palettes[this.palette];
for(var i=0;i<_c2.length;i++){
var tr=this.domNode.insertRow(-1);
for(var j=0;j<_c2[i].length;j++){
if(_c2[i][j].length==3){
_c2[i][j]=_c2[i][j].replace(/(.)(.)(.)/,"$1$1$2$2$3$3");
}
var td=tr.insertCell(-1);
with(td.style){
backgroundColor="#"+_c2[i][j];
border="1px solid gray";
width=height="15px";
fontSize="1px";
}
td.color="#"+_c2[i][j];
td.onmouseover=function(e){
this.style.borderColor="white";
};
td.onmouseout=function(e){
this.style.borderColor="gray";
};
_1.event.connect(td,"onmousedown",this,"onClick");
td.innerHTML="&nbsp;";
}
}
},onClick:function(e){
this.onColorSelect(e.currentTarget.color);
e.currentTarget.style.borderColor="gray";
},onColorSelect:function(_ca){
}});
_1.provide("ws.widget.SmileyPalette");
_1.require("dojo.widget.*");
_1.require("dojo.widget.PopupContainer");
_1.widget.defineWidget("ws.widget.SmileyPalette",_1.widget.PopupContainer,{templateString:"<div style='position: absolute; width: 103px; height: 103px; overflow: hidden; border: 1px solid black; background: white url(${images}smileyPalette.gif); cursor: pointer;' dojoAttachEvent='onClick'></div>",imageNames:[["smile","wink","kiss","bigkiss"],["cry","frown","indecision","shame"],["grin","greed","shock","yell"],["cool","foot","halo","tongue"]],altTexts:[[":-)",";-)",":-*",":-X"],[":'(",":-(",":-\\",":-["],[":-D",":-$","=-O",">:O"],["8-)",":-!","O:-)",":-P"]],onClick:function(evt){
var _cc=_1.html.getAbsolutePosition(this.domNode);
var _cd=evt.pageX-_cc.x;
var _ce=evt.pageY-_cc.y;
var row=Math.floor(_ce/this.smileyHeight);
var col=Math.floor(_cd/this.smileyWidth);
var _d1=this.altTexts[row][col];
var _d2=this.imageNames[row][col];
var _d3=Config.BaseResourcesURL+"images/aimex/"+_d2+".gif";
this.onSmileyClicked(_d1,_d3);
},smileyHeight:25,smileyWidth:25,onSmileyClicked:function(_d4,_d5){
}});
_1.provide("ws.widget.WSEditor");
_1.require("dojo.event.browser");
_1.require("dojo.html.layout");
_1.require("dojo.html.style");
_1.require("dojo.widget.*");
_1.require("dojo.widget.ContentPane");
_1.require("ws.browser");
_1.require("ws.html");
_1.require("ws.settings");
_1.require("ws.widget.util");
_1.require("ws.widget.WSButton");
_1.require("ws.widget.WSLayoutContainer");
_1.require("ws.widget.WSSelect");
ws.widget.WSEditorDocument={templateCssString:"html, body {\r\n\tpadding: 5px;\r\n\tmargin: 0px;\r\n\tborder: none;\r\n\tbackground-color: transparent;\r\n\tfont-family: Verdana, Arial, Helvetica, sans-serif;\r\n\tfont-size: 10pt;\r\n}\r\n\r\np {\r\n\tmargin: 0px;\r\n\tpadding: 0px;\r\n}\r\n\r\na.spell {\r\n\tpadding-bottom: 2px;\r\n\tbackground: yellow url(\"${images}bg_spellingErr.gif\") bottom left repeat-x;\r\n\tcolor: #000;\r\n\ttext-decoration: none;\r\n\tcursor: pointer;\r\n}\r\n\r\na.spell:hover {\r\n\tcolor: #b00;\r\n}\r\n\r\n/* Don't show thumbnails that have been dragged in from the picture picker before they\r\n   are replaced. */\r\nimg.wsThumbnail {\r\n\tdisplay: none;\r\n}\r\n\r\nimg.wsPlaceholder {\r\n\tbackground: #F4F4F4 url(\"${images}progressAnimation.gif\") center center no-repeat;\r\n\tborder: 1px solid #DADAD6 !important;  /* overrides the inline style on inserted images */\r\n}\r\n\r\n/* Don't show the \"View full size\" link below inserted images */\r\n.AOLPicturesFullSizeLink {\r\n\theight: 1px;\r\n\twidth: 1px;\r\n\toverflow: hidden;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/widget/WSEditorDocument.css")};
_1.widget.defineWidget("ws.widget.WSEditor",_1.widget.HtmlWidget,{widgetsInTemplate:true,templateString:"<div style=\"height:100%;width:100%;\">\r\n<div class=\"wsEditor\" dojoType=\"ws:WSLayoutContainer\" deferred=\"true\" dojoAttachPoint=\"layoutWidget\">\r\n\t<div dojoType=\"dojo:ContentPane\" layoutAlign=\"top\" class=\"toolbar\" dojoAttachPoint=\"toolbarPane\">\r\n\t\t<div dojoType=\"ws:WSButton\" vizType=\"Blue\" dojoAttachPoint=\"attachFileButton\" className=\"attachFile\">${AttachFile}</div>\r\n\t\t<div dojoType=\"ws:WSSelect\" dojoAttachPoint=\"fontPicker\" size=\"100\"></div>\r\n\t\t<div dojoType=\"ws:WSSelect\" dojoAttachPoint=\"fontSizePicker\" size=\"46\"></div>\r\n\t\t<a href=\"#\" dojoAttachPoint=\"boldItem\" title=\"${Bold}\" dojoAttachEvent=\"onClick: boldClick\" class=\"boldIcon icon\"></a>\r\n\t\t<a href=\"#\" dojoAttachPoint=\"italicItem\" title=\"${Italic}\" dojoAttachEvent=\"onClick: italicClick\" class=\"italicIcon icon\"></a>\r\n\t\t<a href=\"#\" dojoAttachPoint=\"underlineItem\" title=\"${Underline}\" dojoAttachEvent=\"onClick: underlineClick\" class=\"underlineIcon icon\"></a>\r\n\t\t<a href=\"#\" dojoAttachPoint=\"forecolorItem\" title=\"${FontColor}\" dojoAttachEvent=\"onClick: fontColorClick\" class=\"forecolorIcon icon\" dojoAttachPoint=\"forecolorButton\"></a>\r\n\t\t<a href=\"#\" dojoAttachPoint=\"hilitecolorItem\" title=\"${BackgroundColor}\" dojoAttachEvent=\"onClick: backgroundColorClick\" class=\"hilitecolorIcon icon\"></a>\r\n\t\t<a href=\"#\" dojoAttachPoint=\"justifyleftItem\" title=\"${JustifyLeft}\" dojoAttachEvent=\"onClick: alignLeftClick\" class=\"justifyleftIcon icon\"></a>\r\n\t\t<a href=\"#\" dojoAttachPoint=\"justifycenterItem\" title=\"${JustifyCenter}\" dojoAttachEvent=\"onClick: alignCenterClick\" class=\"justifycenterIcon icon\"></a>\r\n\t\t<a href=\"#\" dojoAttachPoint=\"justifyrightItem\" title=\"${JustifyRight}\" dojoAttachEvent=\"onClick: alignRightClick\" class=\"justifyrightIcon icon\"></a>\r\n\t\t<a href=\"#\" dojoAttachPoint=\"insertorderedlistItem\" title=\"${OrderedList}\" dojoAttachEvent=\"onClick: orderedListClick\" class=\"insertorderedlistIcon icon\"></a>\r\n\t\t<a href=\"#\" dojoAttachPoint=\"insertunorderedlistItem\" title=\"${BulletedList}\" dojoAttachEvent=\"onClick: unorderedListClick\" class=\"insertunorderedlistIcon icon\"></a>\r\n\t\t<a href=\"#\" title=\"${DecreaseIndent}\" dojoAttachEvent=\"onClick: outdentClick\" class=\"outdentIcon icon\"></a>\r\n\t\t<a href=\"#\" title=\"${IncreaseIndent}\" dojoAttachEvent=\"onClick: indentClick\" class=\"indentIcon icon\"></a>\r\n\t\t<a href=\"#\" title=\"${HorizontalRule}\" dojoAttachEvent=\"onClick: horizontalRuleClick\" class=\"insertHorizontalRuleIcon icon\"></a>\r\n\t\t<a href=\"#\" title=\"${InsertSmiley}\" dojoAttachEvent=\"onClick: smileyClick\" class=\"smileyIcon icon\" dojoAttachPoint=\"smileyButton\"></a>\r\n\t\t<a href=\"#\" dojoAttachPoint=\"htmlmodeItem\" title=\"${ViewHTMLSource}\" dojoAttachEvent=\"onClick: htmlModeClick\" class=\"htmlmodeIcon icon\"></a>\r\n\t\t<div style=\"clear: both;\"></div>\r\n\t</div>\r\n\r\n\t<input style=\"width:0px;height:0px;position:absolute;left:-500px;\" tabindex=\"${this.tabindex}\" dojoAttachEvent=\"onFocus: onFocusBogusField\">\r\n\t\r\n\t<div dojoType=\"dojo:ContentPane\" layoutAlign=\"client\" dojoAttachPoint=\"iframePane\">\t\r\n\t\t<iframe dojoAttachPoint=\"iframe\" width=\"100%\" height=\"100%\" src=\"about:blank\" allowtransparency=true dojoAttachEvent=\"onLoad: onIframeLoaded\"></iframe>\r\n\t</div>\r\n\t\r\n\t<div dojoType=\"dojo:ContentPane\" layoutAlign=\"client\" dojoAttachPoint=\"textareaPane\" style=\"display: none;\">\r\n\t\t<textarea dojoAttachPoint=\"textarea\"></textarea>\r\n\t</div>\r\n</div>\r\n</div>\r\n",templateCssString:".wsEditor {\r\n\theight: 100%;\r\n\twidth: 100%;\r\n}\r\n\r\n.wsEditor .toolbar {\r\n\tpadding: 0px 0px 0px 2px;\r\n\tborder-bottom: 1px solid #d5d5d5;\r\n\tbackground-color: #f4f2f0;\r\n}\r\n\r\n.wsEditor .toolbar a {\r\n\tfloat: left;\r\n\tmargin-top: 3px;\r\n\twidth: 22px;\r\n\theight: 22px;\r\n\tborder: 1px solid #f4f2f0;\r\n\tcursor: pointer;\r\n\tbackground-image: url(\"${images}textedit.gif\");\r\n\tbackground-repeat: no-repeat;\r\n\t-moz-outline: none;\r\n}\r\n.wsEditor .toolbar a:hover {\r\n\tborder: 1px solid #999CA1;\r\n\tbackground-color: #efefef;\r\n}\r\n.wsEditor .toolbar a.activated {\r\n\tborder: solid 1px #999CA1;\r\n\tbackground-color: #f8eeb3;\r\n}\r\n\r\n.wsEditor .toolbar .wsButton {\r\n\tfloat: left;\r\n\tdisplay: inline;  /* fixes the IE double float margin bug */\r\n\tmargin-top: 3px;\r\n\tmargin-right: 3px;\r\n\toverflow: hidden; /* without this, the Attach File button expands in IE6 */\r\n}\r\n\r\n.wsEditor .toolbar .wsSelect {\r\n\tfloat: left;\r\n\theight: 14px;\r\n\t/* WSSelect can size itself, but for the font picker, the height\r\n\t   varies as you pick different fonts, so we set a fixed height. */\r\n}\r\n\r\n.wsEditor .toolbar .boldIcon\t\t\t\t{ background-position: 6px 6px; }\r\n.wsEditor .toolbar .italicIcon\t\t\t{ background-position: -23px 6px; }\r\n.wsEditor .toolbar .underlineIcon\t\t\t{ background-position: -54px 6px; }\r\n.wsEditor .toolbar .forecolorIcon\t\t\t{ background-position: -87px 3px; }\r\n.wsEditor .toolbar .hilitecolorIcon\t\t{ background-position: -117px 3px; }\r\n.wsEditor .toolbar .justifyleftIcon\t\t{ background-position: -146px 5px; }\r\n.wsEditor .toolbar .justifycenterIcon\t\t{ background-position: -177px 5px; }\r\n.wsEditor .toolbar .justifyrightIcon\t\t{ background-position: -202px 5px; }\r\n.wsEditor .toolbar .insertorderedlistIcon\t{ background-position: -297px 4px; }\r\n.wsEditor .toolbar .insertunorderedlistIcon\t{ background-position: -326px 4px; }\r\n.wsEditor .toolbar .indentIcon\t\t\t{ background-position: -267px 3px; }\r\n.wsEditor .toolbar .outdentIcon\t\t\t{ background-position: -237px 3px; }\r\n.wsEditor .toolbar .insertHorizontalRuleIcon { background-position: -356px 7px; }\r\n.wsEditor .toolbar .smileyIcon\t\t\t{ background: url(\"${images}smileyPalette.gif\") -2px -2px; }\r\n.wsEditor .toolbar .htmlmodeIcon\t\t\t{ background: url(\"${images}main.gif\") -852px -27px; }\r\n\r\n.wsEditor iframe {\r\n\theight: 100%;\r\n\twidth: 100%;\r\n\tborder: none;\r\n\tbackground-color: #fff; \r\n}\r\n\r\n.wsEditor textarea {\r\n\theight: 100%;\r\n\twidth: 100%;\r\n\tborder: none;\r\n\tmargin: 0;\r\n\tpadding: 0px;\r\n\tfont-family: Tahoma, Arial, Sans-Serif;\r\n\tfont-size: 12px;\r\n\tbackground-color: #ffffff;\r\n\tcolor: #000000;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/widget/WSEditor.css"),rng:null,currentCommand:null,htmlMode:false,showAttachFile:false,blankLine:_1.render.html.moz?"<div> <br></div>":"<br>",tabindex:500,postCreate:function(){
_1.event.connect(this.fontPicker,"valueChanged",this,"changeFont");
_1.event.connect("before",this.fontPicker.domNode,"onmousedown",this,"setRange");
_1.event.connect(this.fontSizePicker,"valueChanged",this,"changeFontSize");
_1.event.connect("before",this.fontSizePicker.domNode,"onmousedown",this,"setRange");
if(!this.showAttachFile){
this.attachFileButton.hide();
}
if(!Config.ShowRichTextHtml){
_1.html.hide(this.htmlmodeItem);
}
this.fontPicker.setOptions([{value:"Arial, Helvetica, sans-serif",display:"<b style=\"font-weight: normal; font-family: Arial,Helvetica,sans-serif\">Arial</b>"},{value:"Comic Sans MS, sans-serif",display:"<b style=\"font-weight: normal; font-family: Comic Sans MS, sans-serif\">Comic Sans MS</b>"},{value:"Courier New, Courier, mono",display:"<b style=\"font-weight: normal; font-family: Courier New, Courier, mono\">Courier New</b>"},{value:"Georgia, Times New Roman, Times, Serif",display:"<b style=\"font-weight: normal; font-family: Georgia, Times New Roman, Times, Serif\">Georgia</b>"},{value:"impact, sans-serif",display:"<b style=\"font-weight: normal; font-family: impact, sans-serif\">Impact</b>"},{value:"Tahoma, Arial, Helvetica, sans-serif",display:"<b style=\"font-weight: normal; font-family: Tahoma, Arial, Helvetica, sans-serif\">Tahoma</b>"},{value:"Times New Roman, Times, serif",display:"<b style=\"font-weight: normal; font-family: Times New Roman, Times, serif\">Times New Roman</b>"},{value:"Verdana, Arial, Helvetica, sans-serif",display:"<b style=\"font-weight: normal; font-family: Verdana, Arial, Helvetica, sans-serif\">Verdana</b>",selected:true},{value:"WingDings",display:"<b style=\"font-weight: normal;\">WingDings</b>"}]);
this.fontSizePicker.setOptions([{value:"1",display:"8 pt"},{value:"2",display:"10 pt",selected:true},{value:"3",display:"12 pt"},{value:"4",display:"14 pt"},{value:"5",display:"18 pt"},{value:"6",display:"24 pt"},{value:"7",display:"36 pt"}]);
},setContent:function(_d6,_d7,_d8){
this.updateMode();
if(this.richMode){
if(this.designModeEnabled){
this.doc().body.innerHTML=_d6;
if(_1.render.html.moz){
this.doc().designMode="off";
this.doc().designMode="on";
}
this.updateToolbar();
if(_d7){
_d7();
}
}else{
this.enableDesignMode(_d6,_d7);
}
}else{
this.textarea.value=(_d8)?_d6:ws.html.getText(_d6);
if(_d7){
_d7();
}
}
},enableDesignMode:function(_d9,_da){
var _db=_1.lang.hitch(this,function(){
this._enableDesignMode(_d9);
if(_da){
_da();
}
});
if(_1.render.html.ie||this.iframe._loaded){
_1.lang.setTimeout(_db,10);
}else{
this.iframe.onload=_db;
}
},_enableDesignMode:function(_dc){
var doc=this.doc();
try{
if(ws.widget.WSEditorDocument.templateCssString){
_1.html.insertCssText(ws.widget.WSEditorDocument.templateCssString,doc);
}else{
_1.html.insertCssFile(ws.widget.WSEditorDocument.templateCssPath,doc);
}
doc.body.innerHTML=_dc;
}
catch(e){
_1.debug("Error preloading content.");
}
if(_1.render.html.ie){
doc.body.contentEditable="true";
}else{
try{
doc.designMode="on";
}
catch(e){
_1.debug("couldn't enable design mode");
if(_1.render.html.moz){
_1.lang.setTimeout(_1.lang.hitch(this,function(){
this.enableDesignMode(_dc);
}),10);
}else{
return;
}
}
}
if(_1.render.html.ie){
_1.event.connect(this.doc(),"onmousedown",_1.widget.PopupManager,"onClick");
}else{
_1.event.browser.addListener(this.win(),"onmousedown",_1.lang.hitch(_1.widget.PopupManager,"onClick"));
}
doc=this.doc();
_1.event.browser.addListener(doc,"onkeyup",_1.lang.hitch(this,"updateToolbar"),false,true);
_1.event.browser.addListener(doc,"onmouseup",_1.lang.hitch(this,"updateToolbar"),false,true);
if(_1.render.html.moz){
_1.event.browser.addListener(doc,"onkeypress",_1.lang.hitch(this,"geckoKeyPress"),false,true);
}else{
if(_1.render.html.ie){
_1.event.browser.addListener(doc,"onkeydown",_1.lang.hitch(this,"ieKeyDown"),false,true);
_1.event.browser.addListener(doc,"onkeypress",_1.lang.hitch(this,"ieKeyPress"),false,true);
}
}
this.designModeEnabled=true;
},showAttachFileButtonInToolBar:function(){
var _de=this.toolbarPane.domNode.childNodes;
for(i=0;i<_de.length;i++){
if(_de[i].nodeType==_1.html.ELEMENT_NODE){
if(_de[i]!=this.attachFileButton.domNode){
_1.html.hide(_de[i]);
}else{
this.positionAttachFileButton(true);
_1.html.show(_de[i]);
}
}
}
},showAllInToolBar:function(){
var _df=this.toolbarPane.domNode.childNodes;
for(i=0;i<_df.length;i++){
if((_df[i].nodeType==_1.html.ELEMENT_NODE)&&((_df[i]!=this.htmlmodeItem)||Config.ShowRichTextHtml)){
_1.html.show(_df[i]);
}
}
this.positionAttachFileButton(false);
},positionAttachFileButton:function(_e0){
},updateMode:function(){
this.richMode=this.useRichMode();
if(this.richMode){
this.textareaPane.hide();
this.showAllInToolBar();
this.iframePane.show();
}else{
this.textareaPane.show();
this.showAttachFileButtonInToolBar();
this.iframePane.hide();
}
this.onResized();
},useRichMode:function(){
return ws.settings.getUseRichEditor()&&!_1.render.html.safari&&!(_1.render.html.ie&&ws.browser.ns8);
},getBlankLine:function(){
return this.useRichMode()?this.blankLine:"<br>";
},getRichContent:function(){
var _e1="";
if(this.htmlMode){
_e1=_1.html.renderedTextContent(this.doc().body);
}else{
_e1=this.doc().body.innerHTML;
}
_e1=_e1.replace(/<p /gi,"<div ").replace(/<p>/gi,"<div>").replace(/<\/p>/gi,"</div>");
_e1=_e1.replace(/<div/gi,"\n<div").replace(/<\/div>/gi,"</div>\n").replace(/<br>/gi,"<br>\n");
return _e1;
},getPlainContent:function(){
if(this.richMode){
return _1.html.renderedTextContent(this.doc().body);
}else{
return this.textarea.value;
}
},getContent:function(){
return (this.richMode?this.getRichContent():this.getPlainContent());
},processBeforeSend:function(){
return false;
},boldClick:function(e){
e.preventDefault();
this.command("bold");
},italicClick:function(e){
e.preventDefault();
this.command("italic");
},underlineClick:function(e){
e.preventDefault();
this.command("underline");
},alignLeftClick:function(e){
e.preventDefault();
this.command("justifyleft");
},alignRightClick:function(e){
e.preventDefault();
this.command("justifyright");
},alignCenterClick:function(e){
e.preventDefault();
this.command("justifycenter");
},indentClick:function(e){
e.preventDefault();
this.command("indent");
},outdentClick:function(e){
e.preventDefault();
this.command("outdent");
},horizontalRuleClick:function(e){
e.preventDefault();
this.command("inserthorizontalrule");
},orderedListClick:function(e){
e.preventDefault();
this.command("insertorderedlist");
},unorderedListClick:function(e){
e.preventDefault();
this.command("insertunorderedlist");
},fontColorClick:function(e){
e.preventDefault();
this.dlgColorPalette("forecolor");
},backgroundColorClick:function(e){
e.preventDefault();
this.dlgColorPalette("hilitecolor");
},smileyClick:function(e){
e.preventDefault();
this.dlgSmileyPalette();
},command:function(_f0,_f1){
var _f2=this.win();
if(_1.render.html.moz){
try{
_f2.document.execCommand("useCSS",false,true);
if(_f0=="hilitecolor"||_f0=="indent"||_f0=="outdent"){
_f2.document.execCommand("useCSS",false,false);
}
}
catch(e){
}
}
try{
_f2.focus();
_f2.document.execCommand(_f0,false,_f1);
_f2.focus();
}
catch(e){
_1.debug("WSEditor.command("+_f0+") failed:",e);
}
this.updateToolbar();
return true;
},changeFont:function(){
if(_1.render.html.ie&&this.rng){
this.rng.select();
}
this.command("fontname",this.fontPicker.currentValue);
},changeFontSize:function(){
if(_1.render.html.ie&&this.rng){
this.rng.select();
}
this.command("fontsize",this.fontSizePicker.currentValue);
},htmlModeClick:function(){
if(!this.htmlMode){
var _f3=this.getRichContent();
if(_1.render.html.ie){
this.doc().body.innerText=_f3;
}else{
var _f4=this.doc();
var _f5=_f4.createTextNode(_f3);
_f4.body.innerHTML="";
_f4.body.appendChild(_f5);
}
this.htmlMode=true;
_1.html.addClass(this.htmlmodeItem,"activated");
}else{
if(_1.render.html.ie){
var _f6=escape(this.doc().body.innerText);
_f6=_f6.replace("%3CP%3E%0D%0A%3CHR%3E","%3CHR%3E");
_f6=_f6.replace("%3CHR%3E%0D%0A%3C/P%3E","%3CHR%3E");
this.doc().body.innerHTML=unescape(_f6);
}else{
var _f4=this.doc();
var _f7=_f4.body.ownerDocument.createRange();
_f7.selectNodeContents(_f4.body);
_f4.body.innerHTML=_f7.toString();
}
this.htmlMode=false;
_1.html.removeClass(this.htmlmodeItem,"activated");
}
},dlgSmileyPalette:function(){
this.setRange();
if(!this.smileyPalette){
this.smileyPalette=_1.widget.createWidget("ws:SmileyPalette",{},this.domNode,"after");
_1.event.connect(this.smileyPalette,"onSmileyClicked",this,"insertSmiley");
}
var _f8=this.smileyButton;
var pos=_1.html.getAbsolutePosition(_f8);
var _fa=_1.html.getBorderBox(_f8).height;
if(this.smileyPalette.isShowingNow){
this.smileyPalette.close();
}else{
this.smileyPalette.open(pos.x,_fa+pos.y,null,_f8);
}
},insertSmiley:function(_fb,_fc){
this.smileyPalette.close();
var _fd="<img src='"+_fc+"' alt='"+_fb+"' height=19 width=19>";
if(_1.render.html.ie){
this.rng.select();
}
this.insertHTML(_fd);
},dlgColorPalette:function(_fe){
this.setRange();
var _ff=this[_fe+"Palette"];
if(!_ff){
_ff=this[_fe+"Palette"]=_1.widget.createWidget("dojo:ColorPalette",{},_1.body(),"first");
_ff.domNode.style.zIndex="1";
_ff.domNode.style.position="absolute";
_1.event.connect(_ff,"onColorSelect",this,"setColor");
}
var _100=this[_fe+"Item"];
var pos=_1.html.getAbsolutePosition(_100);
var _102=_1.html.getBorderBox(_100).height;
if(_fe==this.currentCommand){
this.hideColorPalette();
}else{
_ff.domNode.style.left=pos.x+"px";
_ff.domNode.style.top=(_102+pos.y)+"px";
_ff.show();
if(!this.hideColorPaletteHandler){
this.hideColorPaletteHandler=_1.lang.hitch(this,"hideColorPalette");
}
_1.event.connect(document,"onmousedown",this,"hideColorPalette");
if(_1.render.html.moz){
_1.event.browser.addListener(this.doc(),"onmousedown",this.hideColorPaletteHandler,false,true);
}else{
_1.event.connect(this.doc(),"onmousedown",this,"hideColorPalette");
}
this.currentCommand=_fe;
}
},hideColorPalette:function(evt){
var _104=this[this.currentCommand+"Palette"];
if(_104&&(!evt||(!_1.dom.isDescendantOf(evt.target,_104.domNode)&&!_1.dom.isDescendantOf(evt.target,this[this.currentCommand+"Item"])))){
_104.hide();
_1.event.disconnect(document,"onmousedown",this,"hideColorPalette");
if(_1.render.html.moz){
_1.event.browser.removeListener(this.doc(),"onmousedown",this.hideColorPaletteHandler);
}else{
_1.event.disconnect(this.doc(),"onmousedown",this,"hideColorPalette");
}
this.currentCommand=null;
}
},setColor:function(_105){
_1.lang.setTimeout(this,"_setColor",0,_105);
},_setColor:function(_106){
var cmd=this.currentCommand;
if(_1.render.html.ie){
if(cmd=="hilitecolor"){
cmd="backcolor";
}
this.rng.select();
}
this.command(cmd,_106);
this.hideColorPalette();
},insertHTML:function(html){
var oRTE=this.win();
oRTE.focus();
if(_1.render.html.ie){
var oRng=oRTE.document.selection.createRange();
oRng.pasteHTML(html);
oRng.collapse(false);
oRng.select();
}else{
oRTE.document.execCommand("insertHTML",false,html);
}
this.updateToolbar();
},setRange:function(){
var oRTE=this.win();
if(_1.render.html.ie){
var _10c=oRTE.document.selection;
if(_10c!=null){
this.rng=_10c.createRange();
}
}else{
var _10c=oRTE.getSelection();
this.rng=_10c.getRangeAt(_10c.rangeCount-1).cloneRange();
}
return this.rng;
},ieKeyDown:function(){
var evt=this.win().event;
var _10e=false;
if(evt.keyCode==8){
var sel=this.doc().selection;
if(sel&&sel.type=="Control"){
var img=sel.createRange().item(0);
if(img&&img.parentNode){
img.parentNode.removeChild(img);
}
_10e=true;
}
}
if(evt.ctrlKey&&(evt.keyCode==13)){
this.sendMessage();
_10e=true;
}else{
if(evt.altKey&&(evt.keyCode==187)){
this.spellCheck();
_10e=true;
}else{
if(evt.altKey){
switch(String.fromCharCode(evt.keyCode).toLowerCase()){
case Config.Strings.KeyComposeClose:
this.cancel();
_10e=true;
break;
}
}else{
if(evt.ctrlKey&&(evt.keyCode>=65)&&(evt.keyCode<=90)){
switch(String.fromCharCode(evt.keyCode).toLowerCase()){
case Config.Strings.KeyComposeBold:
this.command("bold",null);
_10e=true;
break;
case Config.Strings.KeyComposeItalic:
this.command("italic",null);
_10e=true;
break;
case Config.Strings.KeyComposeUnderline:
this.command("underline",null);
_10e=true;
break;
}
}
}
}
}
if(_10e){
evt.cancelBubble=true;
evt.returnValue=false;
_1.event.browser.currentEvent.cancelBubble=true;
_1.event.browser.currentEvent.returnValue=false;
return false;
}
},ieKeyPress:function(){
var evt=this.win().event;
var _112=false;
if(evt.keyCode==13){
var sel=this.doc().selection;
var rng=sel.createRange();
if(_1.html.getFirstAncestorByTag(rng.parentElement(),"li")){
return;
}
rng.pasteHTML("<br>");
rng.collapse(false);
rng.select();
_112=true;
}
if(_112){
evt.cancelBubble=true;
evt.returnValue=false;
}
},geckoKeyPress:function(evt){
var _116=false;
if(evt.ctrlKey){
switch(String.fromCharCode(evt.charCode).toLowerCase()){
case Config.Strings.KeyComposeBold:
this.command("bold",null);
_116=true;
break;
case Config.Strings.KeyComposeItalic:
this.command("italic",null);
_116=true;
break;
case Config.Strings.KeyComposeUnderline:
this.command("underline",null);
_116=true;
break;
}
if(evt.keyCode==13){
this.sendMessage();
_116=true;
}
}else{
if(evt.altKey){
var _116=false;
switch(String.fromCharCode(evt.charCode).toLowerCase()){
case Config.Strings.KeyComposeClose:
this.cancel();
_116=true;
break;
case Config.Strings.KeyComposeSpellcheck:
this.spellCheck();
_116=true;
break;
}
}
}
if(_116){
evt.preventDefault();
evt.stopPropagation();
}
},cancel:function(){
},sendMessage:function(){
},updateToolbar:function(){
if(this.updateToolbarTimeout){
_1.lang.clearTimeout(this.updateToolbarTimeout);
}
this.updateToolbarTimeout=_1.lang.setTimeout(_1.lang.hitch(this,"_updateToolbar"),200);
},_updateToolbar:function(){
try{
var doc=this.doc();
var _118=doc.queryCommandValue("fontname");
if(_1.string.isBlank(_118)){
this.fontPicker.setOption(7);
}else{
_118=_1.string.trim(_118.split(",")[0].toLowerCase());
var _119=false;
for(var i=0;i<this.fontPicker.options.length;i++){
if(this.fontPicker.options[i].value.toLowerCase().split(",")[0].indexOf(_118)>=0){
this.fontPicker.setOption(i);
_119=true;
}
}
if(!_119){
this.fontPicker.setOption(7);
}
}
var _11b=doc.queryCommandValue("fontsize");
if(_11b==null||_11b==""){
this.fontSizePicker.setOption(1);
}else{
var _119=false;
for(var i=0;i<this.fontSizePicker.options.length;i++){
if(_11b==this.fontSizePicker.options[i].value){
this.fontSizePicker.setOption(i);
_119=true;
}
}
if(_119!=1){
this.fontSizePicker.setOption(1);
}
}
var _11c=["bold","italic","underline","justifyleft","justifycenter","justifyright","insertorderedlist","insertunorderedlist"];
for(var i=0;i<_11c.length;i++){
var btn=this[_11c[i]+"Item"];
var _11e=doc.queryCommandState(_11c[i]);
ws.html.toggleClass(btn,"activated",_11e);
}
}
catch(e){
_1.debug("updateToolbar: exception: "+e);
}
},onResized:function(){
ws.widget.WSEditor.superclass.onResized.apply(this,arguments);
if(_1.render.html.ie&&!this.richMode){
_1.html.setMarginBox(this.textarea,_1.html.getContentBox(this.textarea.parentNode));
}
},focus:function(){
if(this.richMode){
this.win().focus();
}else{
this.textarea.focus();
}
},onFocusBogusField:function(){
_1.lang.setTimeout(this,"focus",10);
},selectNode:function(node){
if(!node){
return;
}
if(_1.render.html.ie){
var rng=this.doc().body.createTextRange();
try{
rng.moveToElementText(node);
rng.collapse(true);
rng.select();
}
catch(e){
WARN("selectNode: "+e);
}
}else{
var sel=this.win().getSelection();
var rng=this.doc().createRange();
rng.selectNode(node);
rng.collapse(true);
sel.removeAllRanges();
sel.addRange(rng);
}
},win:function(){
return this.iframe.contentWindow;
},doc:function(){
return this.win().document;
},onIframeLoaded:function(){
this.iframe._loaded=true;
}});
_1.provide("ws.widget.SpellCheckEditor");
_1.require("dojo.dom");
_1.require("dojo.html.util");
_1.require("dojo.widget.*");
_1.require("dojo.widget.ContentPane");
_1.require("ws.dom");
_1.require("ws.html");
_1.require("ws.io");
_1.require("ws.widget.OkCancelDialog");
_1.require("ws.widget.WSMenu");
_1.widget.defineWidget("ws.widget.SpellCheckEditor",ws.widget.WSEditor,{templateCssString:".spellCheckEditor .spellBody {\r\n\tfont-size: 12px;\r\n\tfont-family: Tahoma, Arial, Sans-Serif;\r\n\tbackground-color: #FDF6E4;\r\n\tcolor: #000000;\r\n}\r\n\r\n.spellCheckEditor .spellBody a.spell {\r\n\tpadding-bottom: 2px;\r\n\tbackground: yellow url(\"${images}bg_spellingErr.gif\") bottom left repeat-x;\r\n\tcolor: #000;\r\n\ttext-decoration: none;\r\n\tcursor: pointer;\r\n}\r\n\r\n.spellCheckEditor .spellBody a.spell:hover {\r\n\tcolor: #b00;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/widget/SpellCheckEditor.css"),spellNodeCount:0,misspellings:0,spellChecking:false,postCreate:function(args,frag){
ws.widget.SpellCheckEditor.superclass.postCreate.apply(this,arguments);
_1.html.addClass(this.domNode,"spellCheckEditor");
},_enableDesignMode:function(html){
ws.widget.SpellCheckEditor.superclass._enableDesignMode.apply(this,arguments);
_1.event.browser.addListener(this.doc(),"onkeypress",_1.lang.hitch(this,"endSpellCheck"),false,true);
},toggleSpellCheck:function(){
if(this.spellChecking){
this.endSpellCheck();
}else{
this.spellCheck();
}
},spellCheck:function(_125){
if(this.richMode){
var text=_1.html.renderedTextContent(this.doc().body);
}else{
var text=this.textarea.value;
}
ws.io.rpc({action:"SpellCheck",content:{check:text},error:function(err){
ws.widget.OkCancelDialog.alert(_1.string.isBlank(err)?Config.Strings.ErrorSpellChecking:err);
},load:ws.lang.hitch(this,"handleSpellCheckResult",_125)});
},handleSpellCheckResult:function(_128,data){
if(_1.lang.isEmpty(data.sets)){
if(!_128){
ws.widget.OkCancelDialog.alert(Config.Strings.PerfectSpelling);
}
this.onPerfectSpelling();
return;
}
this.onImperfectSpelling();
this.spellChecking=true;
this.spellNodeCount=0;
this.misspellings=0;
this.sets=data.sets;
if(this.richMode){
this.iframe.style.backgroundColor="#FDF6E4";
this.spellDoc=this.doc();
this.spellWin=this.win();
this.spellBody=this.doc().body;
if(_1.render.html.ie&&this.spellBody.innerHTML.charAt(0)!="<"){
this.spellBody.innerHTML="<wbr>"+this.spellBody.innerHTML;
}
}else{
if(!this.spellBodyPane){
this.spellBodyPane=_1.widget.createWidget("dojo:ContentPane",{layoutAlign:"client"});
this.spellBodyPane.domNode.className="spellBody";
this.spellBodyPane.hide();
this.layoutWidget.addChild(this.spellBodyPane);
}
var html=this.textarea.value.replace(/&/g,"&amp;").replace(/</g,"&lt;");
html=html.replace(_1.render.html.ie?/\r\n/g:/\n/g,"<br>\n");
this.spellBodyPane.domNode.innerHTML=html;
this.textareaPane.hide();
this.spellBodyPane.show();
this.spellDoc=document;
this.spellWin=window;
this.spellBody=this.spellBodyPane.domNode;
if(_1.render.html.safari){
this.hide();
_1.lang.setTimeout(this,"show",0);
}
}
_1.event.browser.addListener(this.spellDoc,"onclick",_1.lang.hitch(this,"closeSpellMenu"),false,true);
for(var _12b in this.sets){
this.highlightErrors(_12b,this.sets[_12b]);
}
},onPerfectSpelling:function(){
},onImperfectSpelling:function(){
},highlightErrors:function(_12c,_12d){
ws.dom.forEachNode(this.spellBody,null,_1.lang.hitch(this,function(node){
if(node.nodeType!=_1.dom.TEXT_NODE){
return 0;
}
if(node.parentNode.id!=null&&node.parentNode.id.substr(0,3)=="sp-"){
return 0;
}
var _12f=0;
var _130=node.nodeValue.split(_12c);
if(_130.length<=1){
return 0;
}
var _131=0;
for(var i=0;i<_130.length-1;i++){
if((_130[i+1].search(/^[a-z0-9_]/i)==0)||(_130[i].search(/[a-z0-9_]$/i)!=-1)){
_131+=_130[i].length+_12c.length;
continue;
}
node=node.splitText(_130[i].length+_131);
_131=0;
var _133;
if(_1.render.html.safari){
if(node.nodeValue.length>_12c.length){
_133=node.splitText(_12c.length);
}else{
_133=null;
}
}else{
_133=node.splitText(_12c.length);
}
var _134=this.spellDoc.createElement("a");
_134.href="#";
_134.id="sp-"+this.spellNodeCount;
_134.title=_12d.length?Config.Strings.ClickToReplaceWith+(_1.render.html.ie?"\n":"")+_12d.join(", "):Config.Strings.NoSpellingSuggestions;
_134.className="spell";
_1.event.browser.addListener(_134,"onclick",_1.lang.hitch(this,"showSpellMenu"),false,true);
node.parentNode.replaceChild(_134,node);
_134.appendChild(node);
var _135=this.spellDoc.createElement("span");
_135.id="cr-"+this.spellNodeCount;
_134.parentNode.insertBefore(_135,_134);
node=_133;
this.spellNodeCount++;
this.misspellings++;
_12f+=2;
}
return _12f;
}));
},closeSpellMenu:function(evt){
if(this.spellMenu&&this.spellMenu.isShowingNow){
this.spellMenu.close();
}
},showSpellMenu:function(evt){
evt=_1.event.browser.fixEvent(evt||this.spellWin.event);
var node=evt.target;
var _139=node.childNodes[0].nodeValue;
var _13a=this.sets[_139];
if(this.spellMenu){
this.spellMenu.close();
this.spellMenu.destroyChildren();
}else{
this.spellMenu=_1.widget.createWidget("ws:WSMenu",{},_1.body(),"first");
}
var _13b=_1.lang.hitch(this,function(_13c,_13d){
var item=_1.widget.createWidget("ws:WSMenuItem",{caption:_13c});
item.onClick=_13d;
this.spellMenu.addChild(item);
});
for(var i=0;i<_13a.length;i++){
_13b(_13a[i],ws.lang.hitch(this,"correctWord",node,_13a[i]));
}
if(_13a.length>0){
var item=_1.widget.createWidget("dojo:MenuSeparator2");
this.spellMenu.addChild(item);
}
_13b(_13a.length?Config.Strings.IgnoreWord:Config.Strings.NoSuggestions,ws.lang.hitch(this,"ignoreWord",node));
_13b(Config.Strings.IgnoreAll,ws.lang.hitch(this,"ignoreAll",node));
var _141=ws.html.getAbsolutePositionExt(node,false,null,window);
var _142=_1.html.getBorderBox(node);
this.spellMenu.open(_141.x,_141.y+_142.height,this);
evt.stopPropagation();
},changeWord:function(node,_144){
if(_144==null){
_144=node.childNodes[0].nodeValue;
}
node.childNodes[0].nodeValue="";
var spID=node.id.substr(3);
var _146=this.spellDoc.getElementById("cr-"+spID);
var _147=_146.parentNode;
var _148=this.spellDoc.createTextNode(_144);
_1.dom.destroyNode(node);
_1.dom.insertBefore(_148,_146,true);
_1.dom.destroyNode(_146);
},correctWord:function(node,_14a){
this.changeWord(node,_14a);
this.misspellings--;
if(this.misspellings==0){
this.endSpellCheck();
}
},ignoreWord:function(node){
this.correctWord(node,null);
},ignoreAll:function(node){
var _14d=node.childNodes[0].nodeValue.toLowerCase();
for(var i=0;i<this.spellNodeCount;i++){
var el=this.spellDoc.getElementById("sp-"+i);
if(el&&el.childNodes.length==1&&el.childNodes[0].nodeType==3&&el.childNodes[0].nodeValue.toLowerCase()==_14d){
this.correctWord(el,null);
}
}
},endSpellCheck:function(){
if(!this.spellChecking){
return;
}
for(var i=0;i<this.spellNodeCount;i++){
var el=this.spellDoc.getElementById("sp-"+i);
if(el&&el.innerHTML!=""){
this.changeWord(el,null);
}
}
if(this.spellMenu){
this.spellMenu.hide();
}
if(this.richMode){
this.iframe.style.backgroundColor="white";
}else{
if(_1.render.html.safari){
var html=this.spellBody.innerHTML;
html=html.replace(/<br>\n/g,"\n");
this.spellBody.innerHTML=html;
}
this.textarea.value=_1.html.renderedTextContent(this.spellBody);
this.spellBodyPane.hide();
this.textareaPane.show();
}
this.spellChecking=false;
this.onEndSpellCheck();
},onEndSpellCheck:function(){
}});
_1.provide("ws.pictures.PictureEditor");
_1.require("dojo.widget.*");
_1.require("ws.reporting");
_1.require("ws.widget.util");
_1.require("ws.widget.WSButton");
_1.widget.defineWidget("ws.pictures.PictureEditor",ws.widget.SpellCheckEditor,{picturesModel:null,picturePicker:null,postCreate:function(args,frag){
ws.pictures.PictureEditor.superclass.postCreate.apply(this,arguments);
if(!Config.EnablePictures||(ws.UserContext.ParentalControls=="Y")){
return;
}
this.picturesButton=_1.widget.createWidget("ws:WSButton",{vizType:"Blue",onClick:_1.lang.hitch(this,"picturesClick")},this.toolbarPane.domNode,"first");
this.picturesButton.setLabel(Config.Strings.YGP_OpenPickerButton);
},setPicturesModel:function(_155){
this.picturesModel=_155;
if(this.picturePicker){
this.picturePicker.setModel(_155);
}
},processBeforeSend:function(){
if(this.picturePicker){
return this.picturePicker.processBeforeSend();
}
return false;
},picturesClick:function(){
this.showPicturePicker(!(this.picturePicker&&this.picturePicker.isShowing()));
},showPicturePicker:function(show){
if(!this.picturePicker){
if(!show){
return;
}
this.picturePicker=_1.widget.createWidget("ws:PicturePicker",{editor:this},this.domNode,"after");
this.picturePicker.setModel(this.picturesModel);
}
if(show){
this.picturePicker.show();
this.picturesButton.setLabel(Config.Strings.YGP_ClosePickerEditorButton);
this.positionPicturePicker(this.picturePicker);
this.picturePicker.layout();
ws.reporting.reportAction("Insert Pictures");
}else{
this.picturePicker.hide();
this.picturesButton.setLabel(Config.Strings.YGP_OpenPickerButton);
}
},positionPicturePicker:function(_157){
},insertImage:function(url,dim,id,_15b,cls,_15d){
var _15e="margin: 5px; vertical-align: middle; border: 1px solid #0066CC;";
var _15f="<div class=\"envelope\" align=\"left\" style=\"float: none;\">\n"+"\t<img src=\"%{0}\" width=\"%{1}\" height=\"%{2}\" id=\"%{3}\" style=\"%{4}\" _viewlink=\"%{5}\" class=\"%{6}\" title=\"%{7}\">"+"</div>"+"<div><span></span></div>";
var html=ws.string.substituteParams(_15f,url,dim.width,dim.height,id||"",_15e,_15b||"",cls||"",_1.string.escapeXml(_15d||""));
this.insertHTML(html);
if(!this.editControl){
this.editControl=_1.widget.createWidget("ws:PictureEditControl",{editor:this},_1.body(),"first");
}
}});
_1.provide("ws.mail.ComposeMessageWidget");
_1.require("dojo.html.display");
_1.require("dojo.html.layout");
_1.require("dojo.html.style");
_1.require("dojo.widget.*");
_1.require("dojo.widget.ContentPane");
_1.require("dojo.widget.PageContainer");
_1.require("ws.address.AddressField");
_1.require("ws.browser");
_1.require("ws.html");
_1.require("ws.io");
_1.require("ws.reporting");
_1.require("ws.settings");
_1.require("ws.UserContext");
_1.require("ws.widget.Dialogs");
_1.require("ws.widget.OkCancelDialog");
_1.require("ws.widget.util");
_1.require("ws.widget.WSButton");
_1.require("ws.widget.WSLayoutContainer");
_1.require("ws.widget.WSSelect");
_1.require("ws.widget.WSToolbar");
_1.widget.defineWidget("ws.mail.ComposeMessageWidget",_1.widget.HtmlWidget,{widgetsInTemplate:true,templateString:"<div style=\"display: none;\"  dojoAttachEvent=\"onKeyDown: onKeyPressInputField\"> \r\n<!-- We start out with display:none to avoid a layout call at widget creation time. When the\r\n\tPageContainer parent shows this widget, it will call show(). In ComposeMessage.aspx, where\r\n\tthere is no PageContainer, we call show() directly. -->\r\n\t<div dojoType=\"dojo:PageContainer\" class=\"composeMessage\" dojoAttachPoint=\"notebook\">\r\n\t\t<div dojoType=\"ws:WSLayoutContainer\" deferred=\"true\" dojoAttachPoint=\"layoutWidget\">\r\n\t\t\t<div dojoType=\"ws:WSToolbar\" layoutAlign=\"top\" dojoAttachPoint=\"toolbar\">\r\n\t\t\t\t<div dojoType=\"ws:WSButton\" border=\"right\" toolbarPosition=\"left\" dojoAttachEvent=\"onClick: sendMessage\" dojoAttachPoint=\"sendButton\">${ComposeSendButton}</div>\r\n\t\t\t\t<div dojoType=\"ws:WSButton\" border=\"right\" toolbarPosition=\"left\" dojoAttachEvent=\"onClick: spellCheck\" dojoAttachPoint=\"spellCheckButton\">${ComposeSpellingButton}</div>\r\n\t\t\t\t<div dojoType=\"ws:WSButton\" border=\"right\" toolbarPosition=\"left\" dojoAttachEvent=\"onClick: saveMessage\" dojoAttachPoint=\"saveDraftButton\">${ComposeSaveAsDraftButton}</div>\r\n\t\t\t\t<div dojoType=\"ws:WSButton\" border=\"right\" toolbarPosition=\"left\" dojoAttachEvent=\"onClick: deleteDraft\" dojoAttachPoint=\"deleteDraftButton\">${ComposeDeleteDraftButton}</div>\r\n\t\t\t\t<div dojoType=\"ws:WSButton\" border=\"right\" toolbarPosition=\"left\" dojoAttachEvent=\"onClick: cancel\" dojoAttachPoint=\"cancelButton\">${Cancel}</div>\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t<div dojoType=\"dojo:ContentPane\" layoutAlign=\"top\" class=\"header\" dojoAttachPoint=\"headerWidget\">\r\n\t\t\t\t<table>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td class=\"lcol\" dojoAttachPoint=\"fromLabelCell\"><nobr>${From}:</nobr></td>\r\n\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSSelect\" dojoAttachPoint=\"fromSelect\" size=\"byValue\"></div>\r\n\t\t\t\t\t\t\t<div class=\"feedback\" dojoAttachPoint=\"feedbackNode\"></div>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<div dojoType=\"ws:WSButton\" className=\"newWindowLink\" dojoAttachEvent=\"onClick: onClickNewWindow\" dojoAttachPoint=\"newWindowLink\">\r\n\t\t\t\t\t\t\t\t\t<span class=\"wsLink\">${NewWindow}</span>\r\n\t\t\t\t\t\t\t\t\t<img src=\"${spacer}\" class=\"icon\" />\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td class=\"lcol\"><nobr><span class=\"wsLink\" dojoAttachEvent=\"onClick: onToButton\" dojoAttachPoint=\"toLink\">${To}</span>:</nobr></td>\r\n\t\t\t\t\t\t<td><div dojoType=\"ws:AddressField\" dojoAttachPoint=\"toField\" tabindex=\"100\"></div></td>\r\n\t\t\t\t\t\t<td class=\"rcol\" dojoAttachPoint=\"ccLinksCell\">\r\n\t\t\t\t\t\t\t<nobr>\r\n\t\t\t\t\t\t\t\t<span dojoAttachEvent=\"onClick: showCc\" class=\"wsLink\" dojoAttachPoint=\"showCcLink\">${Cc}</span>&nbsp;\r\n\t\t\t\t\t\t\t\t<span dojoAttachEvent=\"onClick: showBcc\" class=\"wsLink\" style=\"margin-right: 20px;\" dojoAttachPoint=\"showBccLink\">${Bcc}</span>\r\n\t\t\t\t\t\t\t</nobr>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr dojoAttachPoint=\"ccRow\" style=\"display: none;\">\r\n\t\t\t\t\t\t<td class=\"lcol\"><nobr><span class=\"wsLink\" dojoAttachEvent=\"onClick: onCcButton\" dojoAttachPoint=\"ccLink\">${Cc}:</span></nobr></td>\r\n\t\t\t\t\t\t<td><div dojoType=\"ws:AddressField\" dojoAttachPoint=\"ccField\" tabindex=\"101\"></div></td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr dojoAttachPoint=\"bccRow\" style=\"display: none;\">\r\n\t\t\t\t\t\t<td class=\"lcol\"><nobr><span class=\"wsLink\" dojoAttachEvent=\"onClick: onBccButton\" dojoAttachPoint=\"bccLink\">${Bcc}:</span></nobr></td>\r\n\t\t\t\t\t\t<td><div dojoType=\"ws:AddressField\" dojoAttachPoint=\"bccField\" tabindex=\"102\"></div></td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td class=\"lcol\"><nobr>${Subject}:</nobr></td>\r\n\t\t\t\t\t\t<td><input class=\"wsInput\" name=\"Subject\" dojoAttachPoint=\"subjectInput\" tabindex=\"103\" /></td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr dojoAttachPoint=\"attachmentRow\" style=\"display: none;\">\r\n\t\t\t\t\t\t<td class=\"lcol\"><img src=\"${spacer}\" class=\"attachmentIcon\"></td>\r\n\t\t\t\t\t\t<td class=\"attachmentContainer\">\r\n\t\t\t\t\t\t\t<div >\r\n\t\t\t\t\t\t\t\t<span dojoAttachPoint=\"attachmentDisplay\"></span>\r\n\t\t\t\t\t\t\t\t<nobr dojoAttachPoint=\"saveToShoeboxNode\" class=\"saveToShoeboxLink\" style=\"display: none;\">\r\n\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" dojoAttachPoint=\"saveToShoeboxCheckbox\" class=\"checkbox\">\r\n\t\t\t\t\t\t\t\t\t${YGP_SaveComposeAttachments}\r\n\t\t\t\t\t\t\t\t</nobr>\r\n\t\t\t\t\t\t\t\t<span style=\"clear: both;\">&nbsp;</span>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t</table>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div dojoType=\"dojo:ContentPane\" layoutAlign=\"client\" class=\"editorWrapper\">\r\n\t\t\t\t<div dojoType=\"ws:PictureEditor\" shareToolbar=\"true\" dojoAttachPoint=\"editor\" showAttachFile=\"true\" showInsertPictures=\"true\" style=\"height:100%;width:100%;\" tabindex=\"104\"></div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n",templateCssString:".composeMessage {\r\n\theight: 100%;\r\n\twidth: 100%;\r\n}\r\n\r\n.composeMessage .wsToolbar \r\n{\r\n}\r\n\r\n.composeMessage .header {\r\n\tbackground-color: #f3f2f0;\r\n\tpadding: 0px 3px 3px 3px;\r\n\tfont-size: 12px;\r\n\tcolor: #464646;\r\n}\r\n\r\n.composeMessage .header input {\r\n\tpadding: 2px;\r\n\twidth: 100%;\r\n}\r\n.composeMessage .header .checkbox {\r\n\twidth: auto;\r\n\tmargin: 0px;\t\r\n}\r\n\r\n.composeMessage .header td {\r\n\tpadding-right: 0px;\r\n}\r\n\r\n.composeMessage .header .lcol {\r\n\ttext-align: right;\r\n\tpadding-left: 20px;\r\n}\r\n\r\n.composeMessage .header .lcol .wsButton {\r\n\tfloat: right;\r\n}\r\n\r\n.composeMessage .header .rcol {\r\n\tpadding-left: 5px;\r\n}\r\n\r\n/* Override appearance of the from address selector */\r\n.composeMessage .header .wsSelect {\r\n\tborder: none;\r\n\tbackground-color: transparent;\r\n\tmargin: 0px;\r\n\tfloat: left;\r\n\tfont-size: 12px;\r\n\tpadding-left: 0px;\r\n}\r\n\r\n.composeMessage .header .feedback {\r\n\tfloat: right;\r\n\tcolor: #F3A704;\r\n}\r\n\r\n.composeMessage .attachmentIcon {\r\n\tbackground: url(\"${images}main.gif\") -618px -2px;\r\n\theight: 11px;\r\n\twidth: 7px;\r\n}\r\n\r\n.composeMessage .attachmentContainer {\r\n\tborder: 1px solid #ADAAA6;\r\n\tbackground-color: #EDEBE8;\r\n\tpadding: 3px 9px;\r\n}\r\n\r\n.composeMessage .attachment {\r\n\tmargin-right: 5px;\r\n\tfloat: left;\r\n\tcursor: default;\r\n\t\r\n\t/* Without this, IE will wrap within the float instead of just moving it to the next line.  But with it,\r\n       Safari expands the panel width indefinitely instead of wrapping to the next line.  So we make it IE-only. */\r\n\t_white-space: nowrap;\r\n}\r\n\r\n.composeMessage .deleteAttachment {\r\n\tbackground: url(\"${images}main.gif\") -959px -2px;\r\n\twidth: 10px;\r\n\theight: 10px;\r\n\tcursor: pointer;\r\n\tvisibility: hidden;\r\n\tmargin-left: 3px;\r\n}\r\n\r\n.composeMessage .deleteAttachment:hover {\r\n\tbackground: url(\"${images}main.gif\") -973px -2px;\r\n}\r\n\r\n.composeMessage span.attachment:hover .deleteAttachment,\r\n.composeMessage span.attachmentHover .deleteAttachment {\r\n\tvisibility: visible;\r\n}\r\n\r\n.composeMessage .saveToShoeboxLink {\r\n\tfont-size: 11px;\r\n\tfloat: left;\r\n\t_white-space: nowrap;\r\n}\r\n\r\n.composeMessage .newWindowLink {\r\n  padding: 2px 5px 0px 0px;\r\n\tfont-size: 11px;\r\n\tbackground: none;\r\n}\r\n\r\n.composeMessage .wsButton.newWindowLink .content,\r\n.composeMessage .newWindowLink .wsButton:hover .content {\r\n\tbackground: none;\r\n\tborder: none;\r\n}\r\n\r\n.composeMessage .newWindowLink img {\r\n\tbackground: url(\"${images}main.gif\") -630px -0px;\r\n\twidth: 14px;\r\n\theight: 12px;\r\n\tmargin-left: 3px;\r\n}\r\n\r\n.composeMessage .attachFile {\r\n\tposition: relative;\r\n\toverflow: hidden;\r\n}\r\n.composeMessage .attachFile input {\r\n\tposition: absolute;\r\n\tright: 0px;\r\n\ttop: 0px;\r\n\tz-index: 2;\r\n\tfont-size: 5em;\r\n}\r\n\r\n.composeMessage .editorWrapper {\r\n\toverflow: visible;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/mail/ComposeMessageWidget.css"),showNewWindowLink:true,model:null,picturesModel:null,backToString:"setFolder",backToStringOverride:"",inTransition:false,beaconSuffix:"",isStandAlone:false,isPopup:false,callBackTimeout:100,postCreate:function(){
this.addressModel=new ws.address.AddressModel();
_1.event.connect(this.editor,"positionPicturePicker",this,"positionPicturePicker");
_1.event.connect(this.editor,"positionAttachFileButton",this,"positionAttachFileButton");
_1.event.connect("after",this.layoutWidget,"onResized",this,"positionPicturePicker");
_1.event.connect(this.editor,"onPerfectSpelling",this,"onPerfectSpelling");
_1.event.connect(this.editor,"onImperfectSpelling",this,"onImperfectSpelling");
_1.event.connect("after",this.editor,"onEndSpellCheck",this,"onEndSpellCheck");
_1.event.connect(this.editor,"sendMessage",this,"sendMessage");
_1.event.connect(this.editor,"cancel",this,"cancel");
if(!Config.EnableSaveAsDraft){
this.saveDraftButton.hide();
}
if(!Config.EnableSpellCheck){
this.spellCheckButton.hide();
}
if(!this.showNewWindowLink){
this.newWindowLink.hide();
}
_1.event.connect(this.toField,"onResizedSelf",this,"layoutSoon");
_1.event.connect(this.ccField,"onResizedSelf",this,"layoutSoon");
_1.event.connect(this.bccField,"onResizedSelf",this,"layoutSoon");
this.editor.picturesModel=this.picturesModel;
ws.browser.addOnBeforeUnload(this,"onBeforeUnload");
if(_1.render.html.ie){
this.form=document.createElement("<form method='post' enctype='multipart/form-data'>");
}else{
this.form=document.createElement("form");
this.form.method="post";
this.form.enctype="multipart/form-data";
}
this.editor.attachFileButton.domNode.appendChild(this.form);
_1.event.topic.subscribe("AddressFieldFocusChange",_1.lang.hitch(this,function(_161){
this.onFocusAddressField=_161;
}));
_1.event.topic.subscribe("AddressFieldBlurChange",_1.lang.hitch(this,function(_162){
if(_1.render.html.ie){
_1.lang.setTimeout(this,function(){
if(this.justAddedEmail){
this.justAddedEmail=false;
}else{
if(this.onFocusAddressField==_162){
this.onFocusAddressField=null;
}
}
},300);
}else{
this.onFocusAddressField=null;
}
}));
_1.event.topic.subscribe("Suite/onKeyOnPress",this,"onKeyPress");
},setModel:function(_163){
this.model=_163;
},setPicturesModel:function(_164){
this.picturesModel=_164;
this.editor.setPicturesModel(_164);
},showHideField:function(_165,show){
var row=this[_165.toLowerCase()+"Row"];
var link=this["show"+_165+"Link"];
var _165=this[_165.toLowerCase()+"Field"];
_1.html.setShowing(row,show);
_1.html.setShowing(link,!show);
if(show){
_165.focus();
}
this.layoutSoon();
},showCc:function(){
this.showHideField("Cc",true);
},showBcc:function(){
this.showHideField("Bcc",true);
},layoutSoon:function(){
if(this.layoutTimeout){
_1.lang.clearTimeout(this.layoutTimeout);
}
this.layoutTimeout=_1.lang.setTimeout(this,"layout",0);
},layout:function(){
this.layoutWidget.onResized();
},onKeyPressInputField:function(evt){
evt.key=evt.keyCode;
if(evt.key>=65&&evt.key<=90){
evt.key=String.fromCharCode(evt.key);
}
this.handleKey(evt);
},onKeyPress:function(evt){
if(!this.isShowing()){
return;
}
this.handleKey(evt);
},handleKey:function(evt){
var _16c=false;
if(Config.EnableKeyboardShortcuts&&evt.altKey&&_1.lang.isString(evt.key)){
switch(evt.key.toLowerCase()){
case Config.Strings.KeyComposeClose:
this.cancel();
_16c=true;
break;
}
}else{
if(Config.EnableKeyboardShortcuts&&evt.ctrlKey){
switch(evt.key){
case _1.event.browser.keys.KEY_ENTER:
this.sendMessage();
_16c=true;
break;
}
}else{
if(Config.EnableKeyboardShortcuts&&evt.altKey){
if(evt.key==219){
_1.lang.setTimeout(this,"onToButton",100);
_16c=true;
}else{
if(evt.key==221){
this.showCc();
_1.lang.setTimeout(this,"onCcButton",100);
_16c=true;
}else{
if(evt.key==220){
this.showBcc();
_1.lang.setTimeout(this,"onBccButton",100);
_16c=true;
}
}
}
}
}
}
if(_16c){
evt.preventDefault();
evt.stopPropagation();
}
},onResized:function(){
if(!this.staticWidth){
this.staticWidth=_1.html.getMarginBox(this.fromLabelCell).width+_1.html.getMarginBox(this.ccLinksCell).width+20;
}
var _16d=_1.html.getContentBox(this.domNode).width;
var _16e=_16d-this.staticWidth;
this.toField.resizeTo(_16e);
this.ccField.resizeTo(_16e);
this.bccField.resizeTo(_16e);
_1.html.setMarginBox(this.subjectInput,{width:_16e});
ws.mail.ComposeMessageWidget.superclass.onResized.apply(this,arguments);
},addEmail:function(_16f){
if(!this.onFocusAddressField){
this.onFocusAddressField=this.toField;
}
var _170=this.onFocusAddressField.getValue(_16f);
_170=_170.replace(/^\s+/,"");
_170=_170.replace(/\s+$/,"");
if(_1.string.isBlank(_170)){
_170=_16f+",";
}else{
if((_170.charAt(_170.length-1)==";")||(_170.charAt(_170.length-1)==",")){
_170+=" "+_16f+",";
}else{
_170+=", "+_16f+",";
}
}
this.onFocusAddressField.focus();
this.onFocusAddressField.setValue(_170);
this.justAddedEmail=true;
},reset:function(_171,_172){
if(this.layoutWidget!=this.notebook.selectedChildWidget){
this.notebook.selectChild(this.layoutWidget);
}
_171=_171||{};
this.setupFromAddress(_171.from);
this.showHideField("Cc",!_1.string.isBlank(_171.cc));
this.showHideField("Bcc",!_1.string.isBlank(_171.bcc));
this.toField.setValue(_171.to);
this.ccField.setValue(_171.cc);
this.bccField.setValue(_171.bcc);
this.subjectInput.value=_1.string.isBlank(_171.subject)?"":_171.subject;
this.draftMessage=ws.lang.shallowCopy(_171.draftMessage||{},true);
this.originalMessage=ws.lang.shallowCopy(_171.originalMessage||{},true);
this.composeType=_171.composeType||"";
this.initAttachments();
this.missingAttachmentWarningShown=false;
this.showFeedback();
this.editor.showPicturePicker(false);
this.sendAfterSpellCheck=false;
this.spellCheckFailure=false;
this.editor.endSpellCheck();
this.updateToolbar();
this.toggleButtonState(true);
this.layoutSoon();
this.initBody(_171.body,_171.quote,_171.dontAddSignature,_171.isPopOut,_1.lang.hitch(this,function(){
if(_171.isDirty){
this.setDirty();
}else{
this.resetDirty();
}
if(_172){
_172();
}
ws.reporting.report("Compose Message - "+this.beaconSuffix,"Mail");
}));
if(_171.backToString){
this.backToButtonString=_171.backToString=="setFolder"?ws.string.substituteParams(Config.Strings.BackToFolder,_1.string.summary(this.model.getCurrentFolder().displayName,15)):_171.backToString;
}
},initBody:function(body,_174,_175,_176,_177){
var body=_1.string.isBlank(body)?"":body;
var _178=_1.string.startsWithAny(this.composeType,"reply","forward");
var sig=this.model.richSignature;
var _17a=!_175&&!_1.string.isBlank(sig);
var _17b=this.editor.getBlankLine();
_174=_174?(_17b+_174):"";
if(_17a){
sig=sig.replace(/\r\n/g,"<br>").replace(/\n/g,"<br>").replace(/\r/g,"<br>");
sig="<div style='clear:both;'>"+sig+"</div>";
}
if(!_176){
if(_178&&_17a){
body=_174+_17b+_17b+sig+_17b+_17b+body;
}else{
if(_178){
body=_174+_17b+_17b+_17b+body;
}else{
if(_17a){
body=_174+_17b+_17b+sig+body;
}
}
}
}
this.editor.setContent(body,_177,_176);
if(Settings.ShowCcField){
this.showCc();
}
if(Settings.ShowBccField){
this.showBcc();
}
this.focusField();
},focusField:function(){
if(_1.string.isBlank(this.toField.getValue())){
this.toField.focus();
}else{
if(_1.string.isBlank(this.subjectInput.value)){
this.subjectInput.focus();
}else{
this.editor.focus();
}
}
},setupFromAddress:function(_17c){
var _17d=this.model.sendAddresses;
var opts=[];
var _17f=0;
if(!_1.string.isBlank(_17c)){
for(var i=0;i<_17d.length;i++){
if(_17c.indexOf(_17d[i])!=-1){
_17f=i;
}
}
}
for(var i=0;i<_17d.length;i++){
opts.push({display:_1.string.escapeXml(_17d[i]),value:_17d[i],selected:_17f==i});
}
this.fromSelect.setOptions(opts);
},confirmClose:function(_181){
if(this.isDirty()){
if(Config.EnableSaveAsDraft){
ws.widget.Dialogs.show(Config.Strings.DirtyMessageSent+"<br><br>"+Config.Strings.DirtyMessage1,[Config.Strings.KeepWriting,Config.Strings.No,Config.Strings.Yes],_1.lang.hitch(this,function(ret){
if(ret==2){
this.saveMessage();
}else{
if(ret==1&&_181){
_1.lang.setTimeout(_181,this.callBackTimeout);
}
}
}));
}else{
if(!this.isStandAlone&&this.showNewWindowLink){
ws.widget.Dialogs.show(Config.Strings.DirtyMessageSent+"<br><br>"+Config.Strings.DirtyMessage2,[Config.Strings.KeepWriting,Config.Strings.No,Config.Strings.Yes],_1.lang.hitch(this,function(ret){
if(ret==2){
this.popOut();
}else{
if(ret==1&&_181){
_1.lang.setTimeout(_181,this.callBackTimeout);
}
}
}));
}else{
ws.widget.OkCancelDialog.alert(Config.Strings.DirtyMessageSent+"<br><br>"+Config.Strings.DirtyMessage3,_1.lang.hitch(this,function(ok){
if(ok&&_181){
_1.lang.setTimeout(_181,this.callBackTimeout);
}
}),true);
}
}
}else{
if(_181){
_1.lang.setTimeout(_181,this.callBackTimeout);
}
}
},onSessionExpired:function(_185){
if(!this.isDirty()){
if(_185){
_185();
}
return;
}
ws.widget.Dialogs.yesNo(Config.Strings.AuthTimeoutMain+"<br><br>"+Config.Strings.DirtyMessage2,_1.lang.hitch(this,function(yes){
if(yes){
this.popOut(true,_185);
}else{
this.resetDirty();
if(_185){
_185();
}
}
}));
},onBeforeUnload:function(){
if(this.isShowing()&&this.isDirty()){
return Config.EnableSaveAsDraft?Config.Strings.DirtyMessageSaveOrSent:Config.Strings.DirtyMessageSent;
}else{
return null;
}
},isDirty:function(){
return this.getCurrentStateHash()!=this.initialStateHash;
},setDirty:function(){
this.initialStateHash=this.getCurrentStateHash()+"x";
},resetDirty:function(){
this.initialStateHash=this.getCurrentStateHash();
},getCurrentStateHash:function(){
return this.toField.getValue()+this.ccField.getValue()+this.bccField.getValue()+this.subjectInput.value+this.editor.getPlainContent()+this.attachmentDisplay.innerHTML;
},getConcatenatedAddressDisplayForm:function(_187){
var ret="";
for(var i=0;i<_187.length;i++){
ret+=_187[i].displayForm;
if(i<_187.length-1){
ret+="; ";
}
}
return ret;
},openDraft:function(_18a,uid){
this.model.getMessage({folder:_18a,uid:uid,load:_1.lang.hitch(this,function(data){
var to=this.getConcatenatedAddressDisplayForm(data.to);
var cc=this.getConcatenatedAddressDisplayForm(data.cc);
var bcc=this.getConcatenatedAddressDisplayForm(data.bcc);
this.reset({dontAddSignature:true,draftMessage:data,composeType:"draft",to:to,cc:cc,bcc:bcc,subject:data.subject,body:data.body,backToString:this.backToString});
})});
},deleteDraft:function(){
this.confirmClose(_1.lang.hitch(this,function(){
this.model.deleteMessages({folder:this.draftMessage.folder,uids:[this.draftMessage.uid],error:function(err){
ws.widget.OkCancelDialog.alert(_1.string.isBlank(err)?Config.Strings.ErrorDeletingDraft:err);
}});
this.resetDirty();
this.cancel();
}));
},updateToolbar:function(){
ws.widget.setShowing(this.deleteDraftButton,this.draftMessage.uid);
},toggleButtonState:function(_191){
ws.widget.setEnabled(this.sendButton,_191);
ws.widget.setEnabled(this.spellCheckButton,_191);
ws.widget.setEnabled(this.saveDraftButton,_191);
ws.widget.setEnabled(this.deleteDraftButton,_191);
ws.widget.setEnabled(this.cancelButton,_191);
},sendMessage:function(){
if(!this._sendMessage()){
this.toggleButtonState(true);
}
},_sendMessage:function(){
this.toggleButtonState(false);
if(Config.ValidateEmailFormat){
if(this.checkEmailFields()){
return false;
}
}
if(this.showBccParenWarning()){
return false;
}
if(this.showMissingAttachmentWarning()){
return false;
}
if(!this.sendAfterSpellCheck&&ws.settings.getSpellCheckBeforeSend()&&Config.EnableSpellCheck){
this.editor.endSpellCheck();
this.sendAfterSpellCheck=true;
this.editor.spellCheck(true);
return false;
}
this.spellCheckFailure=false;
if(this.editor.processBeforeSend()){
return false;
}
if(this.isPopup){
this.showFeedback(Config.Strings.SendingProgress);
}else{
_1.event.topic.publish("WSFeedbackStart",Config.Strings.SendingProgress);
}
this.inTransition=true;
this.saveOrSendMessage({action:"sendMessage",load:_1.lang.hitch(this,function(data){
this.setupSendConfirmation();
this.notebook.selectChild(this.sendConfirmation);
this.sendConfirmation.layout();
if(this.isPopup){
this.showFeedback();
}else{
_1.event.topic.publish("WSFeedbackEnd",Config.Strings.SendingProgress);
}
this.toggleButtonState(true);
this.resetDirty();
ws.reporting.report("Send Confirmation","Mail");
this.inTransition=false;
this.onShowSendConfirmation();
}),error:_1.lang.hitch(this,function(err){
ws.widget.OkCancelDialog.alert(_1.string.isBlank(err)?Config.Strings.ErrorSending:err);
if(this.isPopup){
this.showFeedback();
}else{
_1.event.topic.publish("WSFeedbackEnd",Config.Strings.SendingProgress);
}
this.toggleButtonState(true);
this.inTransition=false;
})});
return true;
},onShowSendConfirmation:function(){
},saveMessage:function(){
this.toggleButtonState(false);
if(this.isPopup){
this.showFeedback(Config.Strings.SavingProgress);
}else{
_1.event.topic.publish("WSFeedbackStart",Config.Strings.SavingProgress);
}
this.saveOrSendMessage({action:"saveMessage",load:_1.lang.hitch(this,function(data){
ws.widget.OkCancelDialog.alert(Config.Strings.MessageSaved,_1.lang.hitch(this,"closeAfterSuccess"));
if(this.isPopup){
this.showFeedback();
}else{
_1.event.topic.publish("WSFeedbackEnd",Config.Strings.SavingProgress);
}
this.toggleButtonState(true);
this.resetDirty();
ws.reporting.reportAction("Save Message");
}),error:_1.lang.hitch(this,function(err){
ws.widget.OkCancelDialog.alert(_1.string.isBlank(err)?Config.Strings.ErrorSaving:err);
if(this.isPopup){
this.showFeedback();
}else{
_1.event.topic.publish("WSFeedbackEnd",Config.Strings.SavingProgress);
}
this.toggleButtonState(true);
})});
},saveOrSendMessage:function(args){
this.editor.endSpellCheck();
var _197=[];
for(var i=0;i<this.sourceAttachments.length;i++){
_197.push(this.sourceAttachments[i].id);
}
this.model[args.action]({content:{From:this.fromSelect.currentValue,To:this.toField.getValue(),Cc:this.ccField.getValue(),Bcc:this.bccField.getValue(),Subject:this.subjectInput.value,RichBody:this.editor.richMode?this.editor.getRichContent():null,PlainBody:this.editor.getPlainContent(),RichEdit:this.editor.richMode,ParentMessageID:this.originalMessage.messageID,ParentReferences:this.originalMessage.references,ParentInReplyTo:this.originalMessage.inReplyTo,AnswerUID:(this.composeType.indexOf("reply")!=-1)?this.originalMessage.uid:null,AnswerFolder:(this.composeType.indexOf("reply")!=-1)?this.originalMessage.folder:null,DraftMsgFolder:this.draftMessage.folder,DraftMsgUID:this.draftMessage.uid,SourceMsgUID:this.originalMessage.uid||this.draftMessage.uid,SourceMsgFolder:this.originalMessage.folder||this.draftMessage.folder,SourceAttachmentIDs:_197,SavePicturesToShoebox:_1.html.isShowing(this.saveToShoeboxNode)?(this.saveToShoeboxCheckbox.checked?1:0):-1},formNode:this.form,load:args.load,error:args.error});
},spellCheck:function(){
if(!this.editor.spellChecking){
this.showFeedback(Config.Strings.SpellCheckProgress);
ws.reporting.report("Spell Check","Mail");
}
this.editor.toggleSpellCheck();
},onEndSpellCheck:function(){
this.spellCheckButton.setLabel(Config.Strings.ComposeSpellingButton);
this.toolbar.onResized();
if(this.sendAfterSpellCheck&&this.spellCheckFailure){
ws.widget.OkCancelDialog.alert(Config.Strings.SendConfirmationPrompt,_1.lang.hitch(this,function(ok){
if(ok){
this.sendMessage();
}
this.sendAfterSpellCheck=false;
}),true);
}
},onPerfectSpelling:function(){
this.spellCheckFailure=false;
this.showFeedback();
if(this.sendAfterSpellCheck){
this.sendMessage();
}
},onImperfectSpelling:function(){
this.spellCheckFailure=true;
this.showFeedback();
this.spellCheckButton.setLabel(Config.Strings.ComposeExitSpelling);
this.toolbar.onResized();
if(this.sendAfterSpellCheck){
ws.widget.Dialogs.show(Config.Strings.SpellingErrorsFound,[Config.Strings.ReviewErrors,Config.Strings.SendNow],_1.lang.hitch(this,function(i){
if(i==1){
this.spellCheckFailure=false;
this.sendMessage();
}
}),true);
}
},cancel:function(){
if(this.cancelCB){
this.cancelCB();
}
},closeAfterSuccess:function(){
if(this.cancelCB){
this.cancelCB(null,true);
}
},onClickNewWindow:function(){
this.popOut();
},popOut:function(_19b,_19c){
if(this.filledFileInputs.length>0){
ws.widget.Dialogs[_19b?"ok":"okCancel"](Config.Strings.PopOutWithAttachedFilesWarning,_1.lang.hitch(this,function(ok){
if(_19b||ok){
this._popOut();
}
if(_19c){
_19c();
}
}));
}else{
this._popOut();
if(_19c){
_19c();
}
}
},_popOut:function(){
window.composeContext={model:this.model,picturesModel:this.picturesModel,callback:_1.lang.hitch(this,"popOutComplete")};
ws.io.openWindow(Config.BaseMailPagesURL+"ComposeMessage.aspx","","status=yes,resizable=yes,left=5,top=5,width=885,height=606");
},popOutComplete:function(_19e){
var args={to:this.toField.getValue(),cc:this.ccField.getValue(),bcc:this.bccField.getValue(),subject:this.subjectInput.value,body:this.editor.getContent(),originalMessage:this.originalMessage,draftMessage:this.draftMessage,composeType:this.composeType,dontAddSignature:true,isDirty:this.isDirty(),isPopOut:true};
_19e.reset(args,_1.lang.hitch(this,function(){
this.resetDirty();
if(this.cancelCB){
this.cancelCB();
}
}));
},onToButton:function(){
this.toField.togglePeoplePicker(this.toLink);
},onCcButton:function(){
this.ccField.togglePeoplePicker(this.ccLink);
},onBccButton:function(){
this.bccField.togglePeoplePicker(this.bccLink);
},initAttachments:function(){
if(this.filledFileInputs){
for(var i=0;i<this.filledFileInputs.length;i++){
_1.dom.removeNode(this.filledFileInputs[i]);
}
}
this.filledFileInputs=[];
if(this.emptyFileInput){
_1.dom.removeNode(this.emptyFileInput);
}
this.fileInputCounter=0;
this.createEmptyFileInput();
this.sourceAttachments=[];
var _1a1=this.originalMessage.attachments||this.draftMessage.attachments;
if(_1a1&&(this.composeType=="forward"||this.composeType=="draft")){
for(var i=0;i<_1a1.length;i++){
this.sourceAttachments.push(_1a1[i]);
}
}
this.saveToShoeboxCheckbox.checked=ws.settings.getSaveImageAttachments();
this.updateAttachmentRow();
},createEmptyFileInput:function(){
this.emptyFileInput=document.createElement("input");
this.emptyFileInput.setAttribute("type","file");
this.emptyFileInput.name="file"+this.fileInputCounter++;
_1.html.setOpacity(this.emptyFileInput,0);
_1.event.connect(this.emptyFileInput,"onchange",this,"onSelectFile");
this.form.appendChild(this.emptyFileInput);
},onSelectFile:function(){
var el=this.emptyFileInput;
el.style.top="-10000px";
el.style.left="-10000px";
this.filledFileInputs.push(el);
this.createEmptyFileInput();
this.updateAttachmentRow();
},updateAttachmentRow:function(){
_1.dom.removeChildren(this.attachmentDisplay);
var _1a3=0;
var _1a4=0;
var _1a5=_1.lang.hitch(this,function(name,_1a7){
var span=document.createElement("span");
span.className="attachment";
span.innerHTML=ws.string.substituteParams("%{name}<img class='deleteAttachment' src='%{spacer}'>",{name:_1.string.escapeXml(name),spacer:Config.SpacerImageURL});
ws.html.addHoverClass(span,"attachmentHover");
var _1a9=span.getElementsByTagName("img")[0];
_1.event.connect(_1a9,"onclick",_1a7);
this.attachmentDisplay.appendChild(span);
_1a3++;
if(this.isImageFile(name)){
_1a4++;
}
});
for(var i=0;i<this.sourceAttachments.length;i++){
_1a5(this.sourceAttachments[i].name,ws.lang.hitch(this,"deleteSourceAttachment",i));
}
for(var i=0;i<this.filledFileInputs.length;i++){
_1a5(this.getFileName(this.filledFileInputs[i].value),ws.lang.hitch(this,"deleteFileAttachment",i));
}
_1.html.setShowing(this.attachmentRow,_1a3>0);
_1.html.setShowing(this.saveToShoeboxNode,_1a4>0&&Config.EnablePictures&&(ws.UserContext.ParentalControls!="Y"));
this.layoutSoon();
},getFileName:function(path){
if(path.indexOf("/")>-1){
return path.substring(path.lastIndexOf("/")+1);
}else{
return path.substring(path.lastIndexOf("\\")+1);
}
},isImageFile:function(_1ac){
var _1ad=new RegExp(".("+Config.SupportedImageTypes+")$","i");
return _1ac.search(_1ad)!=-1;
},deleteSourceAttachment:function(idx){
this.sourceAttachments.splice(idx,1);
this.updateAttachmentRow();
},deleteFileAttachment:function(idx){
_1.dom.removeNode(this.filledFileInputs[idx]);
this.filledFileInputs.splice(idx,1);
this.updateAttachmentRow();
},positionPicturePicker:function(_1b0){
_1b0=_1b0||this.editor.picturePicker;
if(!_1b0||!_1b0.isShowing()){
return;
}
ws.html.setAbsolutePosition(_1b0.domNode,_1.html.getAbsolutePosition(this.domNode));
var _1b1=_1.html.getContentBox(this.domNode).width;
var _1b2=_1.html.getMarginBox(this.toolbar.domNode).height+_1.html.getMarginBox(this.headerWidget.domNode).height;
_1.html.setMarginBox(_1b0.domNode,{width:_1b1,height:_1b2});
_1b0.layout();
},positionAttachFileButton:function(_1b3){
if(_1b3){
var x=_1.html.getAbsoluteX(this.subjectInput);
var x2=_1.html.getAbsoluteX(this.domNode);
this.editor.attachFileButton.domNode.style.left=(x-x2-6)+"px";
}else{
this.editor.attachFileButton.domNode.style.left="";
}
},fetchAndRespond:function(_1b6,uid,_1b8){
this.model.getMessage({folder:_1b6,uid:uid,load:_1.lang.hitch(this,function(data){
this[_1b8](data);
})});
},reply:function(_1ba){
this.composeResponse(_1ba,"reply",Config.Strings.ReplyPrefix,_1ba.replyToAddrs);
},containsSenderAddress:function(_1bb,_1bc){
var ret=false;
if(_1bb&&_1bb.length>0&&_1bc){
var _1be=_1bc.toLowerCase();
for(var i=0;i<_1bb.length;i++){
var big=_1bb[i].userInputForm.toLowerCase();
ret=big.indexOf(_1be)!=-1;
if(ret){
break;
}
}
}
return ret;
},replyAll:function(_1c1){
var _1c2=ws.UserContext.UserAddress;
var isTo=this.containsSenderAddress(_1c1.to,_1c2);
var isCc=this.containsSenderAddress(_1c1.cc,_1c2);
var _1c5=this.containsSenderAddress(_1c1.bcc,_1c2);
var _1c6=_1c5&&!isTo&&!isCc;
this.composeResponse(_1c1,"reply-all",Config.Strings.ReplyPrefix,_1c1.replyAllAddrs,_1c1.replyAllCcAddrs);
if(_1c6){
ws.widget.Dialogs.okCancel(Config.Strings.BccReplyConfirm,_1.lang.hitch(this,function(ret){
if(!ret){
this.resetDirty();
this.cancel();
}
}));
ws.browser.focus(_1.body());
}
},isImageRemoved:function(_1c8){
var _1c9=_1c8.stripImagesKey&&(_1c8.body.indexOf(_1c8.stripImagesKey)!=-1);
if(_1c9&&(!Settings.DisplayImageWarning||this.addressModel.getRecordByEmail(_1c8.from[0].userInputForm))){
_1c9=false;
}
return _1c9;
},restoreImages:function(_1ca){
var re=new RegExp(_1ca.stripImagesKey,"g");
_1ca.body=_1ca.body.replace(re,"");
_1ca.stripImagesKey=null;
return _1ca;
},forward:function(_1cc){
if(this.isImageRemoved(_1cc)){
ws.widget.OkCancelDialog.alert(Config.Strings.ShowImagesBeforeSending,ws.lang.hitch(this,function(ok){
if(ok){
_1cc=this.restoreImages(_1cc);
}
this.composeResponse(_1cc,"forward",Config.Strings.ForwardPrefix);
}),true);
}else{
this.composeResponse(_1cc,"forward",Config.Strings.ForwardPrefix);
}
},composeResponse:function(_1ce,type,_1d0,to,cc){
var _1d3=_1ce.selectedText?("<blockquote style='border-left: 2px solid blue; padding-left: 3px;'>"+_1ce.selectedText+"</blockquote>"):"";
var _1d4=this.buildOrigMessageBodyHeader(_1ce);
var body=_1ce.body.replace(new RegExp("<div[^>]+AOLImageAttachmentHeader[^\n]+\n\r\n","gi"),"");
body=body.replace(new RegExp("<img[^>]+AOLAttachedImage[^>]+get-attachment.aspx[^>]+>","gi"),Config.Strings.ImageRemoved);
var _1d6=[_1ce.displayTo,_1ce.displayCc,_1ce.displayBcc,_1ce.displayFrom].join(";");
this.reset({from:_1d6,to:to,cc:cc,subject:_1d0+" "+this.model.getBaseSubject(_1ce.subject),quote:_1d3,body:_1d4+body,originalMessage:_1ce,composeType:type,backToString:this.backToString});
},buildOrigMessageBodyHeader:function(_1d7){
var _1d8=Config.Strings.OriginalMessage+"\n";
if(!_1.string.isBlank(_1d7.displayFrom)){
_1d8+=Config.Strings.From+": "+_1d7.displayFrom+"\n";
}
if(!_1.string.isBlank(_1d7.displayTo)){
_1d8+=Config.Strings.To+": "+_1d7.displayTo+"\n";
}
if(!_1.string.isBlank(_1d7.displayCc)){
_1d8+=Config.Strings.Cc+": "+_1d7.displayCc+"\n";
}
if(!_1.string.isBlank(_1d7.displayBcc)){
_1d8+=Config.Strings.Bcc+": "+_1d7.displayBcc+"\n";
}
if(!_1.string.isBlank(_1d7.sentTime)){
_1d8+=Config.Strings.SentOn+": ";
_1d7.sentTime=_1d7.sentTime.replace(/Eastern Daylight Time/i,"EDT");
_1d7.sentTime=_1d7.sentTime.replace(/Eastern Standard Time/i,"EST");
var _1d9=Date.parse(_1d7.sentTime);
if(isNaN(_1d9)){
_1d8+=_1d7.sentTime;
}else{
_1d8+=ws.date.formatDateTime(new Date(_1d7.sentTime),Config.Strings.MsgViewDateFormat);
}
_1d8+="\n";
}
if(_1d7.subject!=null&&_1d7.subject!=""){
_1d8+=Config.Strings.Subject+": ";
_1d8+=_1d7.subject;
_1d8+="\n";
}
_1d8+="\n";
_1d8=_1.string.escapeXml(_1d8);
_1d8=_1d8.replace(/\n/g,"<br>");
return _1d8;
},showFeedback:function(msg){
ws.html.setInnerText(this.feedbackNode,msg||"");
},checkEmailFields:function(){
var _1db=this.toField.getValue();
var _1dc=this.ccField.getValue();
var _1dd=this.bccField.getValue();
if((!_1.string.isBlank(_1db))&&(!this.isEmailAddress(_1db))){
ws.widget.OkCancelDialog.alert(ws.string.substituteParams(Config.Strings.InvalidAddressInField,_1db,_1.string.trim(Config.Strings.To,-1)));
return true;
}
if((!_1.string.isBlank(_1dc))&&(!this.isEmailAddress(_1dc))){
ws.widget.OkCancelDialog.alert(ws.string.substituteParams(Config.Strings.InvalidAddressInField,_1dc,_1.string.trim(Config.Strings.Cc,-1)));
return true;
}
if((!_1.string.isBlank(_1dd))&&(!this.isEmailAddress(_1dd))){
ws.widget.OkCancelDialog.alert(ws.string.substituteParams(Config.Strings.InvalidAddressInField,_1dd,_1.string.trim(Config.Strings.Bcc,-1)));
return true;
}
return false;
},isEmailAddress:function(_1de){
var _1df=_1de.match(/(.+)@(.+)\.(.+)/);
return ((_1df!=null)&&(_1df.length==4));
},showBccParenWarning:function(){
var s=this.toField.getValue()+this.ccField.getValue()+this.bccField.getValue();
if(s.indexOf("(")!=-1||s.indexOf(")")!=-1){
ws.widget.OkCancelDialog.alert(Config.Strings.ProductName+Config.Strings.BccParenthesesWarning,_1.lang.hitch(this,"showBcc"));
return true;
}
return false;
},showMissingAttachmentWarning:function(){
if(this.sourceAttachments.length>0||this.filledFileInputs.length>0){
return false;
}else{
if(this.missingAttachmentWarningShown){
return false;
}
}
var body=this.editor.getPlainContent();
var idx=body.indexOf(Config.Strings.OriginalMessage);
if(idx!=-1){
body=body.substring(0,idx);
}
var _1e3="attached,attachment";
var _1e4=_1e3.split(",");
for(var i=0;i<_1e4.length;i++){
if(body.indexOf(_1e4[i])!=-1){
ws.widget.OkCancelDialog.alert(ws.string.substituteParams(Config.Strings.MissingAttachmentWarning,"<br><br>",_1e4[i]),_1.lang.hitch(this,function(ok){
if(ok){
this.sendMessage();
}
}),true);
this.missingAttachmentWarningShown=true;
return true;
}
}
return false;
},setupSendConfirmation:function(){
if(!this.sendConfirmation){
this.sendConfirmation=_1.widget.createWidget("ws:SendConfirmationPage",{composeWidget:this,cancelCB:_1.lang.hitch(this,"closeAfterSuccess")});
this.notebook.addChild(this.sendConfirmation);
}
var _1e7=this.backToStringOverride||this.backToButtonString||Config.Strings.Back;
this.backToButtonString=null;
var _1e8=new String(_1.string.escapeXml(this.subjectInput.value?this.subjectInput.value:""));
this.sendConfirmation.setupSendConfirmation(_1e7,_1e8);
}});
}});
