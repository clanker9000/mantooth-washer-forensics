/*
	Copyright (c) 2004-2006, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/community/licensing.shtml
*/

dojo.hostenv.packageLoaded({depends:[["provide","ws.layers.dojo2"],["provide","ws.address.ContactDetails"],["provide","dojo.widget.InlineEditBox"],["provide","ws.address.DistributionListWidget"],["provide","ws.address.EditContactDialog"],["provide","ws.address.ImportContactsWidget"],["provide","ws.address.AddressListView"],["provide","ws.settings.AccountSettings"],["provide","ws.settings.CalendarSettings"],["provide","ws.settings.ChatSettings"],["provide","ws.settings.ComposeSettings"],["provide","ws.settings.GeneralSettings"],["provide","ws.settings.SpamSettings"],["provide","ws.settings.SettingsContainer"],["kwCompoundRequire",{common:["ws.settings.SettingsContainer","ws.settings.GeneralSettings","ws.settings.AccountSettings","ws.settings.ComposeSettings","ws.settings.SpamSettings","ws.settings.ChatSettings","ws.settings.CalendarSettings"]}],["provide","ws.settings.*"],["provide","ws.calendar.GlobLayout"],["provide","ws.calendar.GridViewWidget"],["provide","ws.calendar.UntimedViewWidget"],["provide","ws.calendar.ColumnViewWidget"],["provide","ws.calendar.ExportCompsWidget"],["provide","ws.calendar.ImportCompsWidget"],["provide","ws.calendar.UpcomingEventsViewWidget"],["provide","ws.calendar.CalendarViewWidget"],["provide","ws.calendar.EventQuickViewWidget"],["provide","ws.calendar.InlineAddEvent"],["provide","ws.calendar.QuickAdd"],["provide","dojo.widget.Button"],["provide","ws.calendar.MySdkAddEvent"],["kwCompoundRequire",{common:["ws.calendar.AddEventDialog","ws.calendar.CalendarDragAndDrop","ws.calendar.CalendarViewModel","ws.calendar.CalendarViewWidget","ws.calendar.calutil","ws.calendar.ColumnViewWidget","ws.calendar.ConfirmRecurDialog","ws.calendar.EditCalendar","ws.calendar.EventQuickViewWidget","ws.calendar.ExportCompsWidget","ws.calendar.GlobLayout","ws.calendar.GridViewWidget","ws.calendar.ImportCompsWidget","ws.calendar.InlineAddEvent","ws.calendar.QuickAdd","ws.calendar.UntimedViewWidget","ws.calendar.UpcomingEventsViewWidget","ws.calendar.MySdkAddEvent"]}],["provide","ws.widget.*"],["provide","dojo.io.ScriptSrcIO"],["provide","ws.im.wim"],["provide","ws.im.AddBuddyCard"],["provide","ws.im.BuddyList"],["provide","ws.im.Im"],["provide","dojo.dnd.HtmlDragMove"],["provide","dojo.widget.ResizeHandle"],["provide","ws.im.ImGroup"],["provide","dojo.i18n.common"],["provide","ws.im.ImUser"],["provide","ws.im.ImPanel"],["kwCompoundRequire",{common:["ws.im.AddBuddyCard","ws.im.BuddyList","ws.im.Im","ws.im.ImGroup","ws.im.ImPanel","ws.im.ImUser","ws.im.wim"]}],["provide","ws.im.*"],["provide","ws.panels.EventPanel"],["provide","ws.panels.FeedPanel"],["kwCompoundRequire",{common:["ws.panels.EventPanel","ws.panels.FeedPanel","ws.panels.TaskPanel","ws.panels.TaskPanelEditDetailCard","ws.panels.TaskPanelMoreDetailCard"]}],["provide","ws.panels.*"]],definePackage:function(_1){
_1.provide("ws.layers.dojo2");
_1.provide("ws.address.ContactDetails");
_1.require("dojo.widget.*");
_1.require("dojo.widget.ContentPane");
_1.require("ws.address.AddressBookUtil");
_1.require("ws.date");
_1.require("ws.presence");
_1.require("ws.widget.BuddyIcon");
_1.require("ws.widget.OkCancelDialog");
_1.require("ws.widget.WSButton");
_1.require("ws.widget.WSLayoutContainer");
_1.require("ws.widget.WSToolbar");
_1.require("ws.settings");
_1.widget.defineWidget("ws.address.ContactDetails",_1.widget.HtmlWidget,{widgetsInTemplate:true,templateString:"<div class=\"contactDetail\">\r\n\t<div dojoType=\"ws:WSLayoutContainer\" deferred=\"true\" dojoAttachPoint=\"detailsContainer\" style=\"height: 100%; width: 100%;\">\r\n\t\t<div dojoType=\"ws:WSToolbar\" layoutAlign=\"top\">\r\n\t\t\t<div dojoType=\"ws:WSButton\" toolbarPosition=\"left\" border=\"right\" dojoAttachEvent=\"onClick: emailContact\" dojoAttachPoint=\"emailButton\">${Email}</div>\r\n\t\t\t<div dojoType=\"ws:WSButton\" toolbarPosition=\"left\" border=\"right\" dojoAttachEvent=\"onClick: showEditContact\">${Edit}</div>\r\n\t\t\t<div dojoType=\"ws:WSButton\" toolbarPosition=\"left\" border=\"right\" dojoAttachEvent=\"onClick: deleteContact\">${Delete}</div>\r\n\t\t\t<div dojoType=\"ws:WSButton\" toolbarPosition=\"left\" border=\"right\" dojoAttachEvent=\"onClick: printContact\">${PrintButton}</div>\r\n\t\t\t<div toolbarPosition=\"right\" dojoType=\"dojo:ContentPane\" class=\"closeButtonPane\">\r\n\t\t\t\t<img src=\"${spacer}\" class=\"closeButton\" dojoAttachEvent=\"onClick: close\">\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div dojoType=\"dojo:ContentPane\" dojoAttachPoint=\"searchInfoPane\" class=\"searchInfo\" layoutAlign=\"top\" style=\"display: none;\">\r\n\t\t\t<span class=\"wsLink\" dojoAttachPoint=\"searchResultsNode\" dojoAttachEvent=\"onClick: close\"></span>\r\n\t\t</div>\r\n\t\t<div dojoType=\"dojo:ContentPane\" dojoAttachPoint=\"iconContentPane\" layoutAlign=\"left\" class=\"iconPane\">\r\n\t\t\t<div dojoType=\"ws:BuddyIcon\" dojoAttachPoint=\"buddyIcon\"></div>\r\n\t\t\t<div class=\"nickNameDiv\"><span dojoAttachPoint=\"nickNameInfo\" class=\"nickNameInfo\"></span></div>\r\n\t\t</div>\r\n\t\t<div dojoType=\"dojo:ContentPane\" layoutAlign=\"client\" class=\"tablePane\">\r\n\t\t\t<table border=\"0\" cellpadding=\"1\" cellspacing=\"1\" style=\"table-layout: fixed; width: 98%;\">\r\n\t\t\t\t<tr dojoAttachPoint=\"nameRow\" class=\"headerRows\">\r\n\t\t\t\t\t<td colspan=\"100\"><div class=\"nameInfo\"><span dojoAttachPoint=\"nameInfo\"></span></div></td>\t\t\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"screenNameRow\" class=\"headerRows\">\r\n\t\t\t\t\t<td colspan=\"19\" valign=\"middle\"><span class=\"infoLabel\">${ScreenNameWithColon}</span></td>\r\n\t\t\t\t\t<td colspan=\"60\" valign=\"middle\"><a href=\"#\" dojoAttachPoint=\"screenNameInfo\" class=\"emailLink\"></a></td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"email1Row\" class=\"headerRows\">\r\n\t\t\t\t\t<td colspan=\"19\" valign=\"middle\"><span class=\"infoLabel\">${Email1WithColon}</span></td>\r\n\t\t\t\t\t<td colspan=\"60\" valign=\"middle\"><a href=\"#\" dojoAttachPoint=\"email1Info\" class=\"emailLink\"></a></td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"email2Row\" class=\"headerRows\">\r\n\t\t\t\t\t<td colspan=\"19\" valign=\"middle\"><span class=\"infoLabel\">${Email2WithColon}</span></td>\r\n\t\t\t\t\t<td colspan=\"60\" valign=\"middle\"><a href=\"#\" dojoAttachPoint=\"email2Info\" class=\"emailLink\"></a></td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"phone1Row\" class=\"headerRows\">\r\n\t\t\t\t\t<td colspan=\"19\" valign=\"middle\"><span class=\"infoLabel\">${PhonePrimaryWithColon}</span></td>\r\n\t\t\t\t\t<td colspan=\"60\" valign=\"middle\"><span dojoAttachPoint=\"phone1Info\" class=\"primaryInfo\"></span></td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"phone2Row\" class=\"headerRows\">\r\n\t\t\t\t\t<td colspan=\"19\" valign=\"middle\"><span class=\"infoLabel\">${PhoneOtherWithColon}</span></td>\r\n\t\t\t\t\t<td colspan=\"60\" valign=\"middle\"><span dojoAttachPoint=\"phone2Info\" class=\"primaryInfo\"></span></td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"phone3Row\" class=\"headerRows\">\r\n\t\t\t\t\t<td colspan=\"19\" valign=\"middle\"><span class=\"infoLabel\">${PhoneOtherWithColon}</span></td>\r\n\t\t\t\t\t<td colspan=\"60\" valign=\"middle\"><span dojoAttachPoint=\"phone3Info\" class=\"primaryInfo\"></span></td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"phone4Row\" class=\"headerRows\">\r\n\t\t\t\t\t<td colspan=\"19\" valign=\"middle\"><span class=\"infoLabel\">${PhoneOtherWithColon}</span></td>\r\n\t\t\t\t\t<td colspan=\"60\" valign=\"middle\"><span dojoAttachPoint=\"phone4Info\" class=\"primaryInfo\"></span></td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"phone5Row\" class=\"headerRows\">\r\n\t\t\t\t\t<td colspan=\"19\" valign=\"middle\"><span class=\"infoLabel\">${PhoneOtherWithColon}</span></td>\r\n\t\t\t\t\t<td colspan=\"60\" valign=\"middle\"><span dojoAttachPoint=\"phone5Info\" class=\"primaryInfo\"></span></td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"categoryRow\" class=\"headerRows\">\r\n\t\t\t\t\t<td colspan=\"19\" valign=\"middle\"><span class=\"infoLabel\">${CategoryWithColon}</span></td>\r\n\t\t\t\t\t<td colspan=\"60\" valign=\"middle\"><span dojoAttachPoint=\"categoryInfo\" class=\"primaryInfo\"></span></td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"workRow\" class=\"headerRows\">\r\n\t\t\t\t\t<td colspan=\"19\" valign=\"top\"><span class=\"infoLabel\">${WorkAddressWithColon}</span></td>\r\n\t\t\t\t\t<td colspan=\"65\" valign=\"middle\">\r\n\t\t\t\t\t\t<div><span dojoAttachPoint=\"companyInfo\" class=\"primaryInfo\"></span></div>\r\n\t\t\t\t\t\t<div><span dojoAttachPoint=\"jobTitleInfo\" class=\"primaryInfo\"></span></div>\r\n\t\t\t\t\t\t<div><span dojoAttachPoint=\"deptInfo\" class=\"primaryInfo\"></span></div>\r\n\t\t\t\t\t\t<div><span dojoAttachPoint=\"workAddress1Info\" class=\"primaryInfo\"></span></div>\r\n\t\t\t\t\t\t<div><span dojoAttachPoint=\"workAddress2Info\" class=\"primaryInfo\"></span></div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"homeRow\" class=\"headerRows\">\r\n\t\t\t\t\t<td colspan=\"19\" valign=\"top\"><span class=\"infoLabel\">${HomeAddressWithColon}</span></td>\r\n\t\t\t\t\t<td colspan=\"65\" valign=\"middle\">\r\n\t\t\t\t\t\t<div><span dojoAttachPoint=\"homeAddress1Info\" class=\"primaryInfo\"></span></div>\r\n\t\t\t\t\t\t<div><span dojoAttachPoint=\"homeAddress2Info\" class=\"primaryInfo\"></span></div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"personalSpouseRow\" class=\"headerRows\">\r\n\t\t\t\t\t<td colspan=\"19\" valign=\"middle\"><span class=\"infoLabel\">${SpouseWithColon}</span></td>\r\n\t\t\t\t\t<td colspan=\"60\" valign=\"middle\"><span dojoAttachPoint=\"personalSpouseInfo\" class=\"primaryInfo\"></span></td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"personalFamilyRow\" class=\"headerRows\">\r\n\t\t\t\t\t<td colspan=\"19\" valign=\"middle\"><span class=\"infoLabel\">${FamilyWithColon}</span></td>\r\n\t\t\t\t\t<td colspan=\"60\" valign=\"middle\"><span dojoAttachPoint=\"personalFamilyInfo\" class=\"primaryInfo\"></span></td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"personalBirthdayRow\" class=\"headerRows\">\r\n\t\t\t\t\t<td colspan=\"19\" valign=\"middle\"><span class=\"infoLabel\">${BirthdayWithColon}</span></td>\r\n\t\t\t\t\t<td colspan=\"60\" valign=\"middle\"><span dojoAttachPoint=\"personalBirthdayInfo\" class=\"primaryInfo\"></span></td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"personalAnniversaryRow\" class=\"headerRows\">\r\n\t\t\t\t\t<td colspan=\"19\" valign=\"middle\"><span class=\"infoLabel\">${AnniversaryWithColon}</span></td>\r\n\t\t\t\t\t<td colspan=\"60\" valign=\"middle\"><span dojoAttachPoint=\"personalAnniversaryInfo\" class=\"primaryInfo\"></span></td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"personalNotesRow\" class=\"headerRows\">\r\n\t\t\t\t\t<td colspan=\"19\" valign=\"middle\"><span class=\"infoLabel\">${NotesWithColon}</span></td>\r\n\t\t\t\t\t<td colspan=\"60\" valign=\"middle\"><span dojoAttachPoint=\"personalNotesInfo\" class=\"primaryInfo\"></span></td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr><td colspan=\"100\"></td></tr>\r\n\t\t\t</table>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n",templateCssString:".contactDetail\r\n{\r\n\tfont-family: Arial;\r\n}\r\n\r\n.contactDetail .closeButtonPane\r\n{\r\n\tpadding-top: 4px;\r\n\tpadding-right: 9px;\r\n}\r\n\r\n.contactDetail .closeButtonPane .closeButton\r\n{\r\n\twidth: 16px;\r\n\theight: 16px;\r\n\tcursor: pointer;\r\n\tbackground: url(\"${images}main.gif\") -1347px -1px;\r\n}\r\n\r\n.contactDetail .closeButtonPane .closeButton:hover\r\n{\r\n\tbackground-position: -1368px -1px;\r\n}\r\n\r\n.contactDetail .searchInfo\r\n{\r\n\tbackground-color: #c4f198;\r\n\tpadding: 5px 15px;\r\n\tborder-bottom: 1px solid #d8d6d3;\r\n\tcolor: #0066CC;\r\n}\r\n\r\n.contactDetail .iconPane\r\n{\r\n\twidth: 144px;\r\n\tmargin: 15px 3px 0px 11px;\r\n}\r\n\r\n.contactDetail .buddyIcon\r\n{\r\n\tmargin: 7px 0px 0px 21px;\r\n}\r\n\r\n.contactDetail .nickNameDiv\r\n{\r\n\ttext-align: center;\r\n\tpadding-top: 4px;\r\n}\r\n\r\n.contactDetail .nickNameDiv span.nickNameInfo\r\n{\r\n\tcolor: #000000;\r\n\tfont-size: 14px;\r\n\tfont-weight: 800;\r\n}\r\n\r\n.contactDetail .tablePane\r\n{\r\n\tmargin-top: 15px;\r\n}\r\n\r\n.contactDetail .tablePane .headerRows\r\n{\r\n\tpadding-top: 12px;\r\n\tpadding-left: 20px;\r\n}\r\n\r\n.contactDetail .tablePane span.infoLabel\r\n{\r\n\tcolor: #000000;\r\n\tfont-size: 12px;\r\n\tfont-weight: 800;\r\n\tfloat: right;\r\n\tmargin-top: 2px;\r\n\tmargin-bottom: 2px;\t\r\n}\r\n\r\n.contactDetail .tablePane .nameInfo\r\n{\r\n\tcolor: #000000;\r\n\tfont-size: 18px;\r\n\tfont-weight: 800;\r\n\tmargin-left: 12%;\r\n\tmargin-bottom: 1px;\r\n}\r\n\r\n.contactDetail .tablePane span.primaryInfo\r\n{\r\n\tcolor: #000000;\r\n\tfont-size: 12px;\r\n\tmargin-left: 8px;\r\n}\r\n\r\n.contactDetail .tablePane a.emailLink\r\n{\r\n\tcolor: #0265CA;\r\n\ttext-decoration: none;\r\n\tfont-size: 11px;\r\n\tfont-weight: 600;\r\n\tmargin-left: 8px;\r\n}\r\n\r\n.contactDetail .tablePane a.mapQuestLink\r\n{\r\n\tmargin-left: 15px;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/address/ContactDetails.css"),addressModel:null,closeCB:null,data:null,uid:null,backToString:Config.Strings.BackToContactDetails,showMapString:Config.Strings.ShowMap,infoRows:["name","screenName","email1","email2","phone1","phone2","phone3","phone4","phone5","category","work","home","personalSpouse","personalFamily","personalBirthday","personalAnniversary","personalNotes"],infoSpans:["nickName","name","screenName","email1","email2","phone1","phone2","phone3","phone4","phone5","category","company","dept","jobTitle","workAddress1","workAddress2","homeAddress1","homeAddress2","personalSpouse","personalFamily","personalBirthday","personalAnniversary","personalNotes"],contactPhoneTypes:["Undefined","Cellular","Fax","Home","Pager","Work"],phoneTypes:["phone1Type","phone2Type","phone3Type","phone4Type","phone5Type"],personalInfo:["personalSpouse","personalFamily","personalBirthday","personalAnniversary","personalNotes"],addressFields:Config.AddressOrder.split(" "),postCreate:function(_2,_3){
this.email1Info.onclick=ws.lang.hitch(this,"composeEmail",this.email1Info);
this.email2Info.onclick=ws.lang.hitch(this,"composeEmail",this.email2Info);
if(Config.PageLocale=="en-in"){
this.screenNameInfo.onclick=ws.lang.hitch(this,"composeEmail",this.screenNameInfo);
}else{
this.screenNameInfo.onclick=_1.lang.hitch(this,"openIM");
}
_1.event.topic.subscribe("Suite/onKeyOnPress",this,"_suiteOnKeyPress");
},showContact:function(_4,_5,_6){
if(_1.string.isBlank(_5)){
if(_1.render.html.ie){
_1.html.removeClass(this.searchInfoPane.domNode,"searchInfo");
}
this.searchInfoPane.hide();
}else{
if(_1.render.html.ie){
_1.html.addClass(this.searchInfoPane.domNode,"searchInfo");
}
this.searchResultsNode.innerHTML=_5;
this.searchInfoPane.show();
}
this.defaultView();
this.data=null;
this.uid=_4||0;
if(_4){
this.addressModel.getContact({uid:_4,load:_1.lang.hitch(this,function(_7){
this.fillInDetails(_7);
if(_6){
_6();
}
_1.event.topic.publish("WSFeedbackEnd",Config.Strings.Loading);
}),error:function(_8){
ws.widget.OkCancelDialog.alert(_1.string.isBlank(_8)?Config.Strings.ErrorLoadingContact:_8);
_1.event.topic.publish("WSFeedbackEnd",Config.Strings.Loading);
this.close();
}});
}
},showCreatedContact:function(_9){
this.defaultView();
this.data=null;
this.uid=_9.uid;
this.fillInDetails(_9);
},fillInDetails:function(_a){
var i=null;
this.data=_a;
if(_a.screenName||_a.email1||_a.email2){
this.emailButton.show();
}else{
this.emailButton.hide();
}
if(Config.ShowPresenceInfoOnContacts){
this.buddyIcon.show(_a);
}
if(_a.nickName){
this.nickNameInfo.innerHTML=(_a.nickName)?("\""+_1.string.summary(_1.string.escapeXml(_a.nickName),14)+"\""):"";
}
if((_a.firstName)||(_a.lastName)){
_1.html.show(this.nameRow);
this.nameInfo.innerHTML=ws.address.AddressBookUtil.getNameInfoHTML(_a,Config.ContactDetailDisplayFormat);
}
if(_a.screenName){
_1.html.show(this.screenNameRow);
this.screenNameInfo.innerHTML=_1.string.escapeXml(_a.screenName);
}
if(_a.email1){
_1.html.show(this.email1Row);
this.email1Info.innerHTML=_1.string.escapeXml(_a.email1);
}
if(_a.email2){
_1.html.show(this.email2Row);
this.email2Info.innerHTML=_1.string.escapeXml(_a.email2);
}
for(i=0;i<this.phoneTypes.length;i++){
if(_a["phone"+(i+1)]){
_1.html.show(this["phone"+(i+1)+"Row"]);
this["phone"+(i+1)+"Info"].innerHTML=this.buildPhoneString(_a["phone"+(i+1)+"Type"],_a["phone"+(i+1)]);
}
}
if(_a.category){
_1.html.show(this.categoryRow);
this.categoryInfo.innerHTML=this.translateCategoryName(_a.category);
}
if((_a.company)||(_a.jobTitle)||(_a.dept)||(_a.workStreet1)||(_a.workStreet2)||(_a.workStreet3)||(_a.workCity)||(_a.workState)||(_a.workZip)||(_a.workCountry)){
_1.html.show(this.workRow);
this.companyInfo.innerHTML=(_a.company)?_1.string.escapeXml(_a.company):"";
this.deptInfo.innerHTML=(_a.dept)?_1.string.escapeXml(_a.dept):"";
this.jobTitleInfo.innerHTML=(_a.jobTitle)?_1.string.escapeXml(_a.jobTitle):"";
this.workAddress1Info.innerHTML=(_a.workStreet1)?(_1.string.escapeXml(_a.workStreet1)+"&nbsp;"):"";
this.workAddress1Info.innerHTML+=(_a.workStreet2)?(_1.string.escapeXml(_a.workStreet2)+"&nbsp;"):"";
this.workAddress1Info.innerHTML+=(_a.workStreet3)?_1.string.escapeXml(_a.workStreet3):"";
var _c="work"+this.getAddressField(0);
this.workAddress2Info.innerHTML+=(_a[_c])?(_1.string.escapeXml(_a[_c])):"";
_c="work"+this.getAddressField(1);
this.workAddress2Info.innerHTML+=(_a[_c])?("&nbsp;"+_1.string.escapeXml(_a[_c])):"";
_c="work"+this.getAddressField(2);
this.workAddress2Info.innerHTML+=(_a[_c])?("&nbsp;"+_1.string.escapeXml(_a[_c])):"";
_c="work"+this.getAddressField(3);
this.workAddress2Info.innerHTML+=(_a[_c])?("&nbsp;"+_1.string.escapeXml(_a[_c])):"";
if(!_1.string.isBlank(this.workAddress1Info.innerHTML)){
this.workAddress1Info.innerHTML+=(_a.workMapQuestUrl)?"<a class=\"wsLink mapQuestLink\" href=\""+_a.workMapQuestUrl+"\" target=\"_blank\">"+this.showMapString+"</a>":"";
}else{
this.workAddress2Info.innerHTML+=(_a.workMapQuestUrl)?"<a class=\"wsLink mapQuestLink\" href=\""+_a.workMapQuestUrl+"\" target=\"_blank\">"+this.showMapString+"</a>":"";
}
}
if((_a.homeStreet1)||(_a.homeStreet2)||(_a.homeStreet3)||(_a.homeCity)||(_a.homeState)||(_a.homeZip)||(_a.homeCountry)){
_1.html.show(this.homeRow);
this.homeAddress1Info.innerHTML=(_a.homeStreet1)?(_1.string.escapeXml(_a.homeStreet1)+"&nbsp;"):"";
this.homeAddress1Info.innerHTML+=(_a.homeStreet2)?(_1.string.escapeXml(_a.homeStreet2)+"&nbsp;"):"";
this.homeAddress1Info.innerHTML+=(_a.homeStreet3)?_1.string.escapeXml(_a.homeStreet3):"";
var _c="home"+this.getAddressField(0);
this.homeAddress2Info.innerHTML+=(_a[_c])?(_1.string.escapeXml(_a[_c])):"";
_c="home"+this.getAddressField(1);
this.homeAddress2Info.innerHTML+=(_a[_c])?("&nbsp;"+_1.string.escapeXml(_a[_c])):"";
_c="home"+this.getAddressField(2);
this.homeAddress2Info.innerHTML+=(_a[_c])?("&nbsp;"+_1.string.escapeXml(_a[_c])):"";
_c="home"+this.getAddressField(3);
this.homeAddress2Info.innerHTML+=(_a[_c])?("&nbsp;"+_1.string.escapeXml(_a[_c])):"";
if(!_1.string.isBlank(this.homeAddress1Info.innerHTML)){
this.homeAddress1Info.innerHTML+=(_a.homeMapQuestUrl)?"<a class=\"wsLink mapQuestLink\" href=\""+_a.homeMapQuestUrl+"\" target=\"_blank\">"+this.showMapString+"</a>":"";
}else{
this.homeAddress2Info.innerHTML+=(_a.homeMapQuestUrl)?"<a class=\"wsLink mapQuestLink\" href=\""+_a.homeMapQuestUrl+"\" target=\"_blank\">"+this.showMapString+"</a>":"";
}
}
for(i=0;i<this.personalInfo.length;i++){
if(_a[this.personalInfo[i]]){
_1.html.show(this[this.personalInfo[i]+"Row"]);
this[this.personalInfo[i]+"Info"].innerHTML=_1.string.escapeXml(_a[this.personalInfo[i]]);
}
}
},getAddressField:function(_d){
var _e=this.addressFields[_d];
if(_e=="State"&&Config.ABHideState){
return "";
}else{
return _e;
}
},translateCategoryName:function(_f){
var _10=35;
if((_f=="Co-Workers")||(_f=="Friends")||(_f=="Family")||(_f=="General")||(_f=="Auto-Added")||(_f=="Uncategorized")){
var _11="Config.Strings.ABCat"+_f.replace("-","");
return eval(_11);
}else{
return _1.string.summary(_1.string.escapeXml(_f),_10);
}
},getEmailDomain:function(_12){
if((_12==null)||(_12=="")){
return "";
}
var _13="";
var _14="";
var _15=_12.match(/(.*)@(.*)/);
if((_15!=null)&&(_15.length==3)){
_13=_15[1];
_14=_15[2];
if(_14!=null){
_14=_14.toLowerCase();
}
}
return _14;
},buildPhoneString:function(_16,_17){
var _18=new String();
if(_16){
switch(_16){
case this.contactPhoneTypes[1]:
_18="("+Config.Strings.Cellular+") ";
break;
case this.contactPhoneTypes[2]:
_18="("+Config.Strings.Fax+") ";
break;
case this.contactPhoneTypes[3]:
_18="("+Config.Strings.Home+") ";
break;
case this.contactPhoneTypes[4]:
_18="("+Config.Strings.Pager+") ";
break;
case this.contactPhoneTypes[5]:
_18="("+Config.Strings.Work+") ";
break;
default:
return "";
break;
}
_18+=(_17)?_1.string.escapeXml(_17):"";
return _18;
}else{
return "";
}
},defaultView:function(){
var i=null;
for(i=0;i<this.infoSpans.length;i++){
this[this.infoSpans[i]+"Info"].innerHTML="";
}
for(i=0;i<this.infoRows.length;i++){
_1.html.hide(this[this.infoRows[i]+"Row"]);
}
},showEditContact:function(){
this.editContact(this.uid,this.data,false);
},editContact:function(uid,_1b,_1c){
},deleteContact:function(){
ws.widget.OkCancelDialog.alert(Config.Strings.DeleteContactsConfirmationSingular,_1.lang.hitch(this,function(_1d){
if(_1d){
this.addressModel.deleteAddresses({uids:[this.uid],load:function(){
_1.event.topic.publish("WSFeedbackStart",Config.Strings.ContactDeletedSingular,true);
},error:function(err){
ws.widget.OkCancelDialog.alert(_1.string.isBlank(err)?Config.Strings.ErrorDeletingContactNotFound:err);
}});
this.close();
}
}),true);
},emailContact:function(){
var _1f=null;
if(this.data.screenName){
_1f=this.data.screenName;
}else{
if(this.isEmailAddress(this.data.email2)){
_1f=this.data.email2;
}else{
if(this.isEmailAddress(this.data.email1)){
_1f=this.data.email1;
}
}
}
if(_1f){
this.composeEmail(_1f);
}else{
ws.widget.OkCancelDialog.alert(Config.Strings.EmailNotCorrectNoSN);
}
},composeEmail:function(_20){
if(_20){
var _21=null;
if(typeof (_20)=="string"){
_21=_20;
}else{
if(this.isEmailAddress(_20.innerHTML)){
_21=_20.innerHTML;
}
}
if(_21){
this.composeEmailCB(_1.lang.hitch(this,function(_22){
_22.reset({to:_21,backToString:this.backToString,isDirty:true});
}));
}else{
ws.widget.OkCancelDialog.alert(Config.Strings.EmailNotCorrect);
}
}
},composeEmailCB:function(_23){
},isEmailAddress:function(_24){
if(_24){
var _25=_24.match(/(.+)@(.+)\.(.+)/);
return ((_25!=null)&&(_25.length==4));
}else{
return false;
}
},openIM:function(){
if(this.data.screenName){
ws.presence.launchIM(this.data.screenName);
}
},GetRequestParamsForPrint:function(_26){
var _27={};
_27.sortBy=this.addressModel.core.sortBy;
_27.sortDir=this.addressModel.core.sortDirection;
_27.nameFormat=Settings.AddressNameDisplayFormat;
_27.categoryFilter=this.addressModel.getCurrentCategorySearchString();
return ws.address.AddressBookUtil.GetRequestParamsForPrint(_26,_27);
},printContact:function(){
var _28="selected";
var _29=this.uid+"";
if(_1.string.isBlank(_29)){
ws.widget.OkCancelDialog.alert(Config.Strings.NoContactsCheckedErrorMsg);
return;
}
var _2a="command="+_28+"&"+this.GetRequestParamsForPrint(_28)+"&uidList="+_29;
ws.address.AddressBookUtil.OpenAddressPrintWindow(_2a);
},_suiteOnKeyPress:function(evt){
if(!this.isShowing()){
return;
}
if(Config.EnableKeyboardShortcuts&&evt.key&&_1.lang.isString(evt.key)&&!(evt.ctrlKey||evt.altKey||evt.metaKey)){
switch(evt.key.toLowerCase()){
case Config.Strings.KeyPrintContactDetail:
this.printContact();
break;
case Config.Strings.KeyCloseContactDetail:
this.close();
break;
}
}
},close:function(){
if(this.closeCB){
this.closeCB();
}
}});
_1.provide("dojo.widget.InlineEditBox");
_1.require("dojo.widget.*");
_1.require("dojo.event.*");
_1.require("dojo.lfx.*");
_1.require("dojo.gfx.color");
_1.require("dojo.string");
_1.require("dojo.html.*");
_1.require("dojo.html.layout");
_1.widget.defineWidget("dojo.widget.InlineEditBox",_1.widget.HtmlWidget,function(){
this.history=[];
},{templateString:"<form class=\"inlineEditBox\" style=\"display: none\" dojoAttachPoint=\"form\" dojoAttachEvent=\"onSubmit:saveEdit; onReset:cancelEdit; onKeyUp: checkForValueChange;\">\r\n\t<input type=\"text\" dojoAttachPoint=\"text\" style=\"display: none;\" />\r\n\t<textarea dojoAttachPoint=\"textarea\" style=\"display: none;\"></textarea>\r\n\t<input type=\"submit\" value=\"Save\" dojoAttachPoint=\"submitButton\" />\r\n\t<input type=\"reset\" value=\"Cancel\" dojoAttachPoint=\"cancelButton\" />\r\n</form>\r\n",templateCssString:".editLabel {\r\n\tfont-size : small;\r\n\tpadding : 0 5px;\r\n\tdisplay : none;\r\n}\r\n\r\n.editableRegionDisabled {\r\n\tcursor : pointer;\r\n\t_cursor : hand;\r\n}\r\n\r\n.editableRegion {\r\n\tbackground-color : #ffc !important;\r\n\tcursor : pointer;\r\n\t_cursor : hand;\r\n}\r\n\r\n.editableRegion .editLabel {\r\n\tdisplay : inline;\r\n}\r\n\r\n.editableTextareaRegion .editLabel {\r\n\tdisplay : block;\r\n}\r\n\r\n.inlineEditBox {\r\n\t/*background-color : #ffc;*/\r\n\tdisplay : inline;\r\n}\r\n",templateCssPath:_1.uri.moduleUri("dojo.widget","templates/InlineEditBox.css"),mode:"text",name:"",minWidth:100,minHeight:200,editing:false,value:"",textValue:"",defaultText:"",postMixInProperties:function(){
if(this.textValue){
_1.deprecated("InlineEditBox: Use value parameter instead of textValue; will be removed in 0.5");
this.value=this.textValue;
}
if(this.defaultText){
_1.deprecated("InlineEditBox: Use value parameter instead of defaultText; will be removed in 0.5");
this.value=this.defaultText;
}
},postCreate:function(_2c,_2d){
this.editable=this.getFragNodeRef(_2d);
_1.html.insertAfter(this.editable,this.form);
_1.event.connect(this.editable,"onmouseover",this,"onMouseOver");
_1.event.connect(this.editable,"onmouseout",this,"onMouseOut");
_1.event.connect(this.editable,"onclick",this,"_beginEdit");
if(this.value){
this.editable.innerHTML=this.value;
return;
}else{
this.value=_1.string.trim(this.editable.innerHTML);
this.editable.innerHTML=this.value;
}
},onMouseOver:function(){
if(!this.editing){
if(this.disabled){
_1.html.addClass(this.editable,"editableRegionDisabled");
}else{
_1.html.addClass(this.editable,"editableRegion");
if(this.mode=="textarea"){
_1.html.addClass(this.editable,"editableTextareaRegion");
}
}
}
},onMouseOut:function(){
if(!this.editing){
_1.html.removeClass(this.editable,"editableRegion");
_1.html.removeClass(this.editable,"editableTextareaRegion");
_1.html.removeClass(this.editable,"editableRegionDisabled");
}
},_beginEdit:function(e){
if(this.editing||this.disabled){
return;
}
this.onMouseOut();
this.editing=true;
var ee=this[this.mode.toLowerCase()];
ee.value=_1.string.trim(this.value);
ee.style.fontSize=_1.html.getStyle(this.editable,"font-size");
ee.style.fontWeight=_1.html.getStyle(this.editable,"font-weight");
ee.style.fontStyle=_1.html.getStyle(this.editable,"font-style");
var bb=_1.html.getBorderBox(this.editable);
ee.style.width=Math.max(bb.width,this.minWidth)+"px";
if(this.mode.toLowerCase()=="textarea"){
ee.style.display="block";
ee.style.height=Math.max(bb.height,this.minHeight)+"px";
}else{
ee.style.display="";
}
this.form.style.display="";
this.editable.style.display="none";
ee.focus();
ee.select();
this.submitButton.disabled=true;
},saveEdit:function(e){
e.preventDefault();
e.stopPropagation();
var ee=this[this.mode.toLowerCase()];
if((this.value!=ee.value)&&(_1.string.trim(ee.value)!="")){
this.doFade=true;
this.history.push(this.value);
this.onSave(ee.value,this.value,this.name);
this.value=ee.value;
this.editable.innerHTML="";
var _33=document.createTextNode(this.value);
this.editable.appendChild(_33);
}else{
this.doFade=false;
}
this._finishEdit(e);
},_stopEditing:function(){
this.editing=false;
this.form.style.display="none";
this.editable.style.display="";
return true;
},cancelEdit:function(e){
this._stopEditing();
this.onCancel();
return true;
},_finishEdit:function(e){
this._stopEditing();
if(this.doFade){
_1.lfx.highlight(this.editable,_1.gfx.color.hex2rgb("#ffc"),700).play(300);
}
this.doFade=false;
},setText:function(txt){
_1.deprecated("setText() is deprecated, call setValue() instead, will be removed in 0.5");
this.setValue(txt);
},setValue:function(txt){
txt=""+txt;
var tt=_1.string.trim(txt);
this.value=tt;
this.editable.innerHTML=tt;
},undo:function(){
if(this.history.length>0){
var _39=this.value;
var _3a=this.history.pop();
this.editable.innerHTML=_3a;
this.value=_3a;
this.onUndo(_3a);
this.onSave(_3a,_39,this.name);
}
},onChange:function(_3b,_3c){
},onSave:function(_3d,_3e,_3f){
},onCancel:function(){
},checkForValueChange:function(){
var ee=this[this.mode.toLowerCase()];
if((this.value!=ee.value)&&(_1.string.trim(ee.value)!="")){
this.submitButton.disabled=false;
}
this.onChange(this.value,ee.value);
},disable:function(){
this.submitButton.disabled=true;
this.cancelButton.disabled=true;
var ee=this[this.mode.toLowerCase()];
ee.disabled=true;
_1.widget.InlineEditBox.superclass.disable.apply(this,arguments);
},enable:function(){
this.checkForValueChange();
this.cancelButton.disabled=false;
var ee=this[this.mode.toLowerCase()];
ee.disabled=false;
_1.widget.InlineEditBox.superclass.enable.apply(this,arguments);
}});
_1.provide("ws.address.DistributionListWidget");
_1.require("dojo.widget.*");
_1.require("dojo.widget.ContentPane");
_1.require("dojo.widget.LayoutContainer");
_1.require("dojo.widget.PageContainer");
_1.require("ws.address.AddressField");
_1.require("ws.reporting");
_1.require("ws.widget.ListView");
_1.require("ws.widget.OkCancelDialog");
_1.require("ws.widget.util");
_1.require("ws.widget.WSButton");
_1.require("ws.widget.WSToolbar");
_1.declare("ws.address.DistributionListGridModel",null,{columns:{Icon:0,Name:1,Hover:2,Email:3},modelUpdated:function(){
},listInfo:null,setListInfo:function(_43){
this.listInfo=_43;
this.modelUpdated();
},get:function(row,col){
var _46=null;
if(row<this.listInfo.contacts.length){
_46=true;
}else{
_46=false;
}
switch(col){
case this.columns.Icon:
return (_46)?this.getBuddyIcon(this.listInfo.contacts[row]):"";
case this.columns.Name:
if(_46){
return ws.address.AddressBookUtil.getNameInfoHTML(this.listInfo.contacts[row],Settings.AddressNameDisplayFormat);
}else{
return "";
}
case this.columns.Hover:
return this.getHoverColumnCB?this.getHoverColumnCB(row):"";
case this.columns.Email:
if(_46){
var _47=this.listInfo.contacts[row].email1?this.listInfo.contacts[row].email1+",":"";
var _48=this.listInfo.contacts[row].email2?this.listInfo.contacts[row].email2+",":"";
var _49=this.listInfo.contacts[row].screenName?this.listInfo.contacts[row].screenName:"";
return ws.string.substituteParams("{0} {1} {2}",_47,_48,_49);
}else{
return ws.string.substituteParams("({0})",this.listInfo.addresses[row-this.listInfo.contacts.length]);
}
}
},getRow:function(row){
var _4b=null;
if(row<this.listInfo.contacts.length){
_4b=true;
}else{
_4b=false;
}
var _4c=(_4b)?this.getBuddyIcon(this.listInfo.contacts[row]):"";
var _4d=this.getHoverColumnCB?this.getHoverColumnCB(row):"";
var _4e="";
var _4f="";
if(_4b){
_4e=ws.address.AddressBookUtil.getNameInfoHTML(this.listInfo.contacts[row],Settings.AddressNameDisplayFormat);
var _50=this.listInfo.contacts[row].email1?this.listInfo.contacts[row].email1+",":"";
var _51=this.listInfo.contacts[row].email2?this.listInfo.contacts[row].email2+",":"";
var _52=this.listInfo.contacts[row].screenName?this.listInfo.contacts[row].screenName:"";
_4f=ws.string.substituteParams("{0} {1} {2}",_50,_51,_52);
}else{
_4f=ws.string.substituteParams("({0})",this.listInfo.addresses[row-this.listInfo.contacts.length]);
}
return [_4c,_4e,_4d,_4f];
},getRowCount:function(){
return this.listInfo?(this.listInfo.contacts.length+this.listInfo.addresses.length):0;
},getBuddyIcon:function(_53){
var url=Config.SpacerImageURL;
if(Config.ShowPresenceInfoOnContacts){
url=ws.presence.getBuddyIconUrl(_53,true)||Config.SpacerImageURL;
}
if(url==Config.SpacerImageURL){
return ws.string.substituteParams("<img align='absmiddle' src=\"{0}\" class=\"noBuddyIcon\">",url);
}else{
return ws.string.substituteParams("<img width=32 height=32 align='absmiddle' src=\"{0}\" border=\"0\">",url);
}
}});
_1.widget.defineWidget("ws.address.DistributionListWidget",ws.widget.ListView,{widgetsInTemplate:true,templateString:"<div>\r\n\t<div dojoType=\"dojo:PageContainer\" class=\"listView distributionList\" dojoAttachPoint=\"pageContainer\">\r\n\t\t<div dojoType=\"dojo:LayoutContainer\" dojoAttachPoint=\"createPane\">\r\n\t\t\t<div dojoType=\"ws:WSToolbar\" layoutAlign=\"top\">\r\n\t\t\t\t<div dojoType=\"ws:WSButton\" border=\"right\" toolbarPosition=\"left\" dojoAttachEvent=\"onClick: checkRequiredFields\">${Create}</div>\r\n\t\t\t\t<div dojoType=\"ws:WSButton\" border=\"right\" toolbarPosition=\"left\" dojoAttachEvent=\"onClick: cancel\">${Cancel}</div>\r\n\t\t\t</div>\r\n\t\t\t<div dojoType=\"dojo:ContentPane\" class=\"contentPanes\" layoutAlign=\"client\">\r\n\t\t\t\t<table class=\"tableView\" border=\"0\" cellspacing=\"8\">\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td colspan=\"2\">\r\n\t\t\t\t\t\t\t<div class=\"headerDiv\"><span>${NewList}</span></div>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td width=\"20%\" align=\"right\"><span class=\"inputLabels\">${DistListName}:</span></td>\r\n\t\t\t\t\t\t<td width=\"90%\"><input maxlength=\"255\" class=\"wsInput nameInput\" dojoAttachPoint=\"createNameField\"></td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td width=\"20%\" align=\"right\" valign=\"top\"><a href=\"#\" class=\"labelLink\" dojoAttachEvent=\"onClick: showCreatePeoplePicker\" dojoAttachPoint=\"createPeoplePickerLink\">${AddContacts}</a></td>\r\n\t\t\t\t\t\t<td width=\"90%\" align=\"left\"><div dojoType=\"ws:AddressField\" class='nameInput' minHeight=\"72\" maxHeight=\"280\" dojoAttachPoint=\"createAddressField\"></div></td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t</table>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t\r\n\t\t<div dojoType=\"dojo:LayoutContainer\" dojoAttachPoint=\"editPane\">\r\n\t\t\t<div dojoType=\"ws:WSToolbar\" layoutAlign=\"top\">\r\n\t\t\t\t<div dojoType=\"ws:WSButton\" border=\"right\" toolbarPosition=\"left\" dojoAttachEvent=\"onClick: emailList\">${EmailList}</div>\r\n\t\t\t\t<div dojoType=\"ws:WSButton\" border=\"right\" toolbarPosition=\"left\" dojoAttachEvent=\"onClick: deleteList\">${Delete}</div>\r\n\t\t\t\t<div toolbarPosition=\"right\" dojoType=\"dojo:ContentPane\" class=\"closeButtonPane\">\r\n\t\t\t\t\t<img src=\"${spacer}\" class=\"closeButton\" dojoAttachEvent=\"onClick: cancel\">\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div dojoType=\"dojo:ContentPane\" class=\"contentPanes\" layoutAlign=\"top\">\r\n\t\t\t\t<div class=\"editNameDiv\">\r\n\t\t\t\t\t<span dojoType=\"dojo:InlineEditBox\" dojoAttachPoint=\"editNameField\"></span>\r\n\t\t\t\t\t<a href=\"#\" class=\"editNameLink\" dojoAttachPoint=\"editNameLink\" dojoAttachEvent=\"onClick: editListName\">${EditName}</a>\r\n\t\t\t\t</div>\r\n\t\t\t\t<table class=\"tableView\"; border=\"0\" cellspacing=\"2\" style=\"table-layout: fixed; width: 100%;\">\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td valign=\"top\">\r\n\t\t\t\t\t\t\t<div class=\"addContactDiv\">\r\n\t\t\t\t\t\t\t\t<span class=\"inputLabels floatLeft\">${Add} </span>\r\n\t\t\t\t\t\t\t\t<a href=\"#\" class=\"labelLink labelLinkEdit floatLeft\" dojoAttachEvent=\"onClick: showEditPeoplePicker\" dojoAttachPoint=\"editPeoplePickerLink\">${Contacts}</a>\r\n\t\t\t\t\t\t\t\t<div dojoType=\"ws:AddressField\" dojoAttachPoint=\"editAddressField\" textareaWidth=\"398px\"></div>\r\n\t\t\t\t\t\t\t\t<div dojoType=\"ws:WSButton\" dojoAttachEvent=\"onClick: addMembers\" className=\"addButton\" vizType=\"Blue\">${Add}</div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t</table>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"content\" dojoType=\"dojo:TurboDataGrid\" layoutAlign=\"client\" dojoAttachPoint=\"grid\" defaultLeftWidth=\"0\"></div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n",templateCssString:".distributionList .hoverControl { width: 12px; height: 12px; background-image: url(\"${images}main.gif\"); }\r\n.distributionList .trashHover { background-position: -1410px 0px; float: left; }\r\n.distributionList .trashHover:hover { background-position: -1395px 0px; }\r\n\r\n.distributionList {\r\n\theight: 100%;\r\n\twidth: 100%;\r\n}\r\n\r\n.distributionList .closeButtonPane\r\n{\r\n\tpadding-top: 4px;\r\n\tpadding-right: 9px;\r\n}\r\n\r\n.distributionList .closeButtonPane .closeButton\r\n{\r\n\twidth: 16px;\r\n\theight: 16px;\r\n\tcursor: pointer;\r\n\tbackground: url(\"${images}main.gif\") -1347px -1px;\r\n}\r\n\r\n.distributionList .closeButtonPane .closeButton:hover\r\n{\r\n\twidth: 16px;\r\n\theight: 16px;\r\n\tcursor: pointer;\r\n\tbackground: url(\"${images}main.gif\") -1368px -1px;\r\n}\r\n\r\n.distributionList .contentPanes .editNameDiv\r\n{\r\n\tmargin-bottom: 10px;\r\n}\r\n\r\n.distributionList .contentPanes .tableView \r\n{\r\n\twidth: 100%;\r\n}\r\n\r\n.distributionList .contentPanes .tableView .headerDiv \r\n{\r\n\tfloat: left;\r\n\tpadding-top: 2px;\r\n\tpadding-bottom: 15px;\r\n\tpadding-left: 5px;\r\n\tfont-size: 18px;\r\n\tfont-weight: 800;\r\n\tcolor: #000000;\r\n}\r\n\r\n.distributionList .contentPanes .tableView span.inputLabels\r\n{\r\n\tcolor: #000000;\r\n\tfont-size: 12px;\r\n\tfont-weight: 800;\t\r\n}\r\n\r\n.distributionList .contentPanes .tableView a.labelLink\r\n{\r\n\tcolor: #0265CA;\r\n\tfont-size: 12px;\r\n\tfont-weight: 800;\r\n\ttext-decoration: none;\r\n}\r\n\r\n.distributionList .contentPanes .tableView a.labelLinkEdit\r\n{\r\n\tmargin-left: 4px;\r\n\tmargin-right: 8px;\r\n}\r\n\r\n.distributionList .contentPanes a.editNameLink\r\n{\r\n\tmargin-left: 14px;\r\n\tcolor: #0265CA;\r\n\tfont-size: 11px;\r\n\tfont-weight: 600;\r\n\ttext-decoration: none;\r\n}\r\n\r\n.distributionList .contentPanes .tableView input.nameInput\r\n{\r\n\twidth: 90%;\r\n\tpadding: 1px 2px 1px 2px;\r\n\tmargin-left: 8px;\r\n}\r\n\r\n.distributionList .contentPanes .tableView .addressField\r\n{\r\n\tmargin-left: 8px;\r\n}\r\n\r\n.distributionList .contentPanes .tableView .addButton\r\n{\r\n\tfloat: left;\r\n\tmargin-left: 6px;\r\n\tmargin-top: 2px;\r\n}\r\n\r\n.distributionList .turbogrid-scrollbox {\r\n\tborder-top: none;\r\n}\r\n\r\n.distributionList .turbogrid\r\n{\r\n\tmargin-left: 6px;\r\n\tmargin-top: 4px;\r\n}\r\n\r\n.distributionList .contentPanes .editNameDiv\r\n{\r\n\tmargin-top: 10px;\r\n\tmargin-left: 10px;\r\n\tfont-size: 18px;\r\n\tfont-weight: 800;\r\n\tcolor: #000000;\r\n}\r\n\r\n.distributionList .contentPanes .addContactDiv\r\n{\r\n\tmargin-left: 8px;\r\n}\r\n\r\n.distributionList .floatLeft\r\n{\r\n\tfloat: left;\r\n}\r\n\t\r\n\t\r\n",templateCssPath:_1.uri.dojoUri("../ws/address/DistributionListWidget.css"),addressModel:null,listInfo:null,closeCB:null,backToString:Config.Strings.BackToDistList,speedUp:true,rowHeight:38,hoverColumnHtml:"<div class=\"hoverControl trashHover\"></div>",postCreate:function(_55,_56){
this.editNameField.submitButton.value=Config.Strings.Save;
this.editNameField.cancelButton.value=Config.Strings.Cancel;
_1.event.connect(this.editAddressField,"onResizedSelf",this,"layout");
_1.event.connect(this.editNameField,"onSave",this,"changeName");
_1.event.connect(this.editNameField,"cancelEdit",_1.lang.hitch(this,function(){
_1.html.show(this.editNameLink);
this.layout();
}));
_1.event.connect(this.editNameField.editable,"onclick",_1.lang.hitch(this,function(){
if(_1.html.isShowing(this.editNameLink)){
_1.html.hide(this.editNameLink);
}
this.layout();
}));
this.setModel(new ws.address.DistributionListGridModel());
},colStyles:["","color: #000000; font-weight: 600; font-size: 12px; padding-top: 10px;","padding-top: 10px;","color: #000000; font-weight: 500; font-size: 12px; padding-top: 10px;"],initView:function(){
this.columns=[[turbo.grid.columns.text,{caption:"",align:"center",width:35,colStyle:this.colStyles[0]}],[turbo.grid.format.text,{caption:"",align:"left",width:100,colStyle:this.colStyles[1]}],[turbo.grid.format.text,{caption:"",align:"left",width:18,colStyle:this.colStyles[2]}],[turbo.grid.format.text,{caption:"",align:"left",width:600,colStyle:this.colStyles[3]}]];
this.autosizeColumnIndex=this.gridModel.columns.NameAndEmail;
_1.html.hide(this.grid.headerNode);
_1.html.addClass(this.createAddressField.field,"addressField");
ws.address.DistributionListWidget.superclass.initView.apply(this,arguments);
},showCreateView:function(){
this.pageContainer.selectChild(this.createPane);
this.createNameField.value="";
this.createAddressField.setValue("");
ws.reporting.report("New DistList","Addresses");
},showList:function(uid){
this.pageContainer.selectChild(this.editPane);
this.addressModel.getDistributionList({uid:uid,load:_1.lang.hitch(this,function(_58){
this.listDataReceived(_58);
_1.event.topic.publish("WSFeedbackEnd",Config.Strings.Loading);
}),error:function(err){
ws.widget.OkCancelDialog.alert(_1.string.isBlank(err)?Config.Strings.ErrorLoadingDistList:err);
_1.event.topic.publish("WSFeedbackEnd",Config.Strings.Loading);
}});
ws.reporting.report("Edit DistList","Addresses");
},listDataReceived:function(_5a){
if(this.goToListDetails){
this.pageContainer.selectChild(this.editPane);
this.goToListDetails=false;
}
this.listInfo=_5a;
this.editNameField.setValue(_1.string.escapeXml(_5a.name));
this.editAddressField.setValue("");
this.gridModel.setListInfo(_5a);
this.layout();
},checkRequiredFields:function(){
var _5b="";
var _5c=this.createNameField.value;
_5c=_5c.replace(/^\s+/,"");
_5c=_5c.replace(/\s+$/,"");
var _5d=_1.lang.map(this.createAddressField.getValue().split(/[;,]/),_1.string.trim);
if(_1.string.isBlank(_5c)){
_5b=Config.Strings.NameDistList;
}else{
if(_5d.length==1&&_1.string.isBlank(_5d[0])){
_5b=Config.Strings.IncludeEmailDistList;
}
}
if(_1.string.isBlank(_5b)){
this.createList(_5c);
}else{
ws.widget.OkCancelDialog.alert(_5b);
}
},createList:function(_5e){
var _5f=this._mapAddressesToContacts(this.createAddressField);
this.listInfo={uid:0,name:_5e,contacts:_5f.contacts,addresses:_5f.addresses};
this.goToListDetails=true;
this.saveList(true,Config.Strings.DistributionListCreated);
},addMembers:function(){
var _60=this._mapAddressesToContacts(this.editAddressField);
if(_60.contacts.length||!_1.string.isBlank(_60.addresses[0])){
this.listInfo.contacts=this.listInfo.contacts.concat(_60.contacts);
this.listInfo.addresses=this.listInfo.addresses.concat(_60.addresses);
var _61=_60.contacts.length+_60.addresses.length;
this.saveList(true,(_61==1)?Config.Strings.DistListContactAddedSingular:ws.string.substituteParams(Config.Strings.DistListContactAddedPlural,_61));
}
},_mapAddressesToContacts:function(_62){
var _63=_1.lang.map(_62.getValue().split(/[;,]/),_1.string.trim);
for(var i=0;i<_63.length;i++){
if(_1.string.isBlank(_63[i])){
_63.splice(i--,1);
}
}
var _65=_62.selectedContacts;
var _66=[];
for(var i=_63.length-1;i>=0;i--){
for(var j=0;j<_65.length;j++){
if(_65[j].screenName==_63[i]){
_66.push(_65[j]);
_63.splice(i,1);
break;
}
if(_65[j].bType!="d"){
continue;
}
if(_65[j].contactUids.length&&_65[j].composeValue.match(_63[i])){
var _68=_65[j].contactUids.split(",");
for(var k=0;k<_68.length;k++){
var uid=_68[k];
var _6b=this.addressModel.getRecordByUID(uid*1);
if((_6b.screenName==_63[i])){
_66.push(_6b);
_63.splice(i,1);
break;
}
}
}
}
}
return {addresses:_63,contacts:_66};
},handleHoverControlClick:function(e){
if(_1.html.hasClass(e.target,"trashHover")){
var row=e.rowIndex;
if(row<this.listInfo.contacts.length){
this.listInfo.contacts.splice(row,1);
}else{
this.listInfo.addresses.splice(row-this.listInfo.contacts.length,1);
}
this.gridModel.modelUpdated();
this.saveList(true,Config.Strings.DistListContactRemoved);
}
},changeName:function(_6e,_6f){
_1.html.show(this.editNameLink);
this.listInfo.name=_6e;
this.saveList(false,Config.Strings.DistributionListUpdated);
},saveList:function(_70,_71){
this.addressModel.createOrModifyDistributionList({uid:this.listInfo.uid,name:this.listInfo.name,contactUids:_1.lang.map(this.listInfo.contacts,function(_72){
return _72.uid;
}),addresses:this.listInfo.addresses,load:_1.lang.hitch(this,function(_73){
if(_71){
_1.event.topic.publish("WSFeedbackStart",_71,true);
}
if(_70){
this.listDataReceived(_73);
}
}),error:function(err){
ws.widget.OkCancelDialog.alert(_1.string.isBlank(err)?Config.Strings.ErrorSavingDistList:err);
}});
},deleteList:function(){
var _75=Config.Strings.DeleteDistributionList;
var _76=Config.Strings.DistributionListDeletedSingular;
ws.widget.OkCancelDialog.alert(_75,_1.lang.hitch(this,function(_77){
if(_77){
this.addressModel.deleteAddresses({uids:[this.listInfo.uid],load:_1.lang.hitch(this,function(){
_1.event.topic.publish("WSFeedbackStart",_76,true);
this.cancel();
}),error:function(err){
ws.widget.OkCancelDialog.alert(_1.string.isBlank(err)?Config.Strings.ErrorDeletingDistListNotFound:err);
}});
}
}),true);
},showCreatePeoplePicker:function(e){
this.createAddressField.togglePeoplePicker(this.createPeoplePickerLink);
e.preventDefault();
},showEditPeoplePicker:function(e){
this.editAddressField.togglePeoplePicker(this.editPeoplePickerLink);
e.preventDefault();
},emailList:function(){
this.composeEmailCB(_1.lang.hitch(this,function(_7b){
_7b.reset({to:this.listInfo.composeValue,backToString:this.backToString,isDirty:true});
}));
},composeEmailCB:function(_7c){
},editListName:function(evt){
_1.html.hide(this.editNameLink);
this.editNameField._beginEdit(evt);
this.layout();
},cancel:function(){
if(this.closeCB){
this.closeCB();
}
},layout:function(){
this.editPane.onResized();
}});
_1.provide("ws.address.EditContactDialog");
_1.require("dojo.widget.*");
_1.require("dojo.widget.ContentPane");
_1.require("dojo.widget.LayoutContainer");
_1.require("ws.date");
_1.require("ws.widget.BuddyIcon");
_1.require("ws.widget.DefaultTextbox");
_1.require("ws.widget.OkCancelDialog");
_1.require("ws.widget.WSButton");
_1.require("ws.widget.WSMenu");
_1.require("ws.widget.WSToolbar");
_1.widget.defineWidget("ws.address.EditContactDialog",_1.widget.HtmlWidget,{widgetsInTemplate:true,templateString:"<div>\r\n\t<div class=\"editContact\" dojoAttachPoint=\"editContactContainer\" dojoType=\"dojo:LayoutContainer\" style=\"height: 100%; width: 100%;\">\r\n\t\t<div dojoType=\"ws:WSToolbar\" layoutAlign=\"top\">\r\n\t\t\t<div dojoType=\"ws:WSButton\" toolbarPosition=\"left\" border=\"right\" dojoAttachPoint = \"saveContactButton\" dojoAttachEvent=\"onClick: checkRequiredFields\">${Save}</div>\r\n\t\t\t<div dojoType=\"ws:WSButton\" toolbarPosition=\"left\" border=\"right\" dojoAttachPoint = \"deleteContactButton\" dojoAttachEvent=\"onClick: deleteContact\">${Delete}</div>\r\n\t\t\t<div dojoType=\"ws:WSButton\" toolbarPosition=\"left\" border=\"right\" dojoAttachEvent=\"onClick: cancel\">${Cancel}</div>\r\n\t\t</div>\r\n\t\t<div dojoType=\"dojo:ContentPane\" dojoAttachPoint=\"iconContentPane\" layoutAlign=\"left\" class=\"iconPane\">\r\n\t\t\t<div class=\"contactType\"><span dojoAttachPoint=\"contactTypeSpan\"></span></div>\r\n\t\t\t<div dojoType=\"ws:BuddyIcon\" dojoAttachPoint=\"buddyIcon\"></div>\r\n\t\t\t<div><div dojoType=\"ws:DefaultTextBox\" className=\"buddyIconInput\" dojoAttachPoint=\"nickNameInput\" maxlength=\"90\" defaultValue=\"${Nickname}\"></div></div>\r\n\t\t</div>\r\n\t\t<div dojoType=\"dojo:ContentPane\" layoutAlign=\"client\">\r\n\t\t\t<table class=\"mainTable\" border=\"0\" cellpadding=\"1\" cellspacing=\"1\">\r\n\t\t\t\t<tr dojoAttachPoint=\"row0\">\r\n\t\t\t\t\t<th nowrap=\"\"><span class=\"inputLabels rightAlign\">${ContactName}</span></th>\r\n\t\t\t\t\t<td nowrap=\"\">\r\n\t\t\t\t\t\t<div dojoType=\"ws:DefaultTextBox\" className=\"nameInput\" dojoAttachPoint=\"firstNameInput\" maxlength=\"255\" defaultValue=\"${First}\"></div>\r\n\t\t\t\t\t\t<div dojoType=\"ws:DefaultTextBox\" className=\"nameInput\" dojoAttachPoint=\"lastNameInput\" maxlength=\"255\" defaultValue=\"${Last}\"></div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row1\">\r\n\t\t\t\t\t<th nowrap=\"\"><span class=\"inputLabels rightAlign\">${ScreenName}</span></th>\r\n\t\t\t\t\t<td nowrap=\"\"><input maxlength=\"80\" class=\"regularInput\" dojoAttachPoint=\"screenNameInput\" /></td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row2\">\r\n\t\t\t\t\t<th nowrap=\"\"><span class=\"inputLabels rightAlign\">${Email1}</span></th>\r\n\t\t\t\t\t<td nowrap=\"\">\r\n\t\t\t\t\t\t<input maxlength=\"255\" class=\"regularInput\" dojoAttachPoint=\"email1Input\" />\r\n\t\t\t\t\t\t<a href=\"#\" dojoAttachPoint=\"addAnotherEmailLink\" dojoAttachEvent=\"onClick: addAnotherEmail\" class=\"wsLink addAnother\">+ ${Another}</a>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row3\">\r\n\t\t\t\t\t<th nowrap=\"\"><span class=\"inputLabels rightAlign\">${Email2}</span></th>\r\n\t\t\t\t\t<td nowrap=\"\"><input maxlength=\"255\" class=\"regularInput\" dojoAttachPoint=\"email2Input\" /></td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row4\">\r\n\t\t\t\t\t<th nowrap=\"\"><span class=\"inputLabels rightAlign\">${PhonePrimary}</span></th>\r\n\t\t\t\t\t<td nowrap=\"\">\r\n\t\t\t\t\t\t<input maxlength=\"255\" class=\"phoneInput leftAlign\" dojoAttachPoint=\"phone1Input\" />\r\n\t\t\t\t\t\t<div className=\"phoneDropDownButton leftAlign\" dojoType=\"ws:WSDropDownButton\" dojoAttachPoint=\"phone1Button\"></div>\r\n\t\t\t\t\t\t<div dojoType=\"ws:WSMenu\" dojoAttachPoint=\"primaryPhoneMenu\">\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${Cellular}\" dojoAttachPoint=\"cellItem1\"></div>\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${Home}\" dojoAttachPoint=\"homeItem1\"></div>\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${Work}\" dojoAttachPoint=\"workItem1\"></div>\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${Pager}\" dojoAttachPoint=\"pagerItem1\"></div>\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${Fax}\" dojoAttachPoint=\"faxItem1\"></div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<a href=\"#\" dojoAttachPoint=\"phone1Link\" dojoAttachEvent=\"onClick: addAnotherPhone1\" class=\"wsLink addAnother leftAlign\">+ ${Another}</a>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row5\">\r\n\t\t\t\t\t<th nowrap=\"\"><span class=\"inputLabels rightAlign\">${PhoneOther}</span></th>\r\n\t\t\t\t\t<td nowrap=\"\">\r\n\t\t\t\t\t\t<input maxlength=\"255\" class=\"phoneInput leftAlign\" dojoAttachPoint=\"phone2Input\" />\r\n\t\t\t\t\t\t<div className=\"phoneDropDownButton leftAlign\" dojoType=\"ws:WSDropDownButton\" dojoAttachPoint=\"phone2Button\"></div>\r\n\t\t\t\t\t\t<div dojoType=\"ws:WSMenu\" dojoAttachPoint=\"phone2Menu\">\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${Cellular}\" dojoAttachPoint=\"cellItem2\"></div>\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${Home}\" dojoAttachPoint=\"homeItem2\"></div>\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${Work}\" dojoAttachPoint=\"workItem2\"></div>\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${Pager}\" dojoAttachPoint=\"pagerItem2\"></div>\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${Fax}\" dojoAttachPoint=\"faxItem2\"></div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<a href=\"#\" dojoAttachPoint=\"phone2Link\" dojoAttachEvent=\"onClick: addAnotherPhone2\" class=\"wsLink addAnother leftAlign\">+ ${Another}</a>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row6\">\r\n\t\t\t\t\t<th nowrap=\"\"><span class=\"inputLabels rightAlign\">${PhoneOther}</span></th>\r\n\t\t\t\t\t<td nowrap=\"\">\r\n\t\t\t\t\t\t<input maxlength=\"255\" class=\"phoneInput leftAlign\" dojoAttachPoint=\"phone3Input\" />\r\n\t\t\t\t\t\t<div className=\"phoneDropDownButton leftAlign\" dojoType=\"ws:WSDropDownButton\" dojoAttachPoint=\"phone3Button\"></div>\r\n\t\t\t\t\t\t<div dojoType=\"ws:WSMenu\" dojoAttachPoint=\"phone3Menu\">\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${Cellular}\" dojoAttachPoint=\"cellItem3\"></div>\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${Home}\" dojoAttachPoint=\"homeItem3\"></div>\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${Work}\" dojoAttachPoint=\"workItem3\"></div>\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${Pager}\" dojoAttachPoint=\"pagerItem3\"></div>\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${Fax}\" dojoAttachPoint=\"faxItem3\"></div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<a href=\"#\" dojoAttachPoint=\"phone3Link\" dojoAttachEvent=\"onClick: addAnotherPhone3\" class=\"wsLink addAnother leftAlign\">+ ${Another}</a>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row7\">\r\n\t\t\t\t\t<th nowrap=\"\"><span class=\"inputLabels rightAlign\">${PhoneOther}</span></th>\r\n\t\t\t\t\t<td nowrap=\"\">\r\n\t\t\t\t\t\t<input maxlength=\"255\" class=\"phoneInput leftAlign\" dojoAttachPoint=\"phone4Input\" />\r\n\t\t\t\t\t\t<div className=\"phoneDropDownButton leftAlign\" dojoType=\"ws:WSDropDownButton\" dojoAttachPoint=\"phone4Button\"></div>\r\n\t\t\t\t\t\t<div dojoType=\"ws:WSMenu\" dojoAttachPoint=\"phone4Menu\">\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${Cellular}\" dojoAttachPoint=\"cellItem4\"></div>\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${Home}\" dojoAttachPoint=\"homeItem4\"></div>\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${Work}\" dojoAttachPoint=\"workItem4\"></div>\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${Pager}\" dojoAttachPoint=\"pagerItem4\"></div>\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${Fax}\" dojoAttachPoint=\"faxItem4\"></div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<a href=\"#\" dojoAttachPoint=\"phone4Link\" dojoAttachEvent=\"onClick: addAnotherPhone4\" class=\"wsLink addAnother leftAlign\">+ ${Another}</a>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row8\">\r\n\t\t\t\t\t<th nowrap=\"\"><span class=\"inputLabels rightAlign\">${PhoneOther}</span></th>\r\n\t\t\t\t\t<td nowrap=\"\">\r\n\t\t\t\t\t\t<input maxlength=\"255\" class=\"phoneInput leftAlign\" dojoAttachPoint=\"phone5Input\" />\r\n\t\t\t\t\t\t<div className=\"phoneDropDownButton leftAlign\" dojoType=\"ws:WSDropDownButton\" dojoAttachPoint=\"phone5Button\"></div>\r\n\t\t\t\t\t\t<div dojoType=\"ws:WSMenu\" dojoAttachPoint=\"phone5Menu\">\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${Cellular}\" dojoAttachPoint=\"cellItem5\"></div>\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${Home}\" dojoAttachPoint=\"homeItem5\"></div>\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${Work}\" dojoAttachPoint=\"workItem5\"></div>\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${Pager}\" dojoAttachPoint=\"pagerItem5\"></div>\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${Fax}\" dojoAttachPoint=\"faxItem5\"></div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row9\">\r\n\t\t\t\t\t<th nowrap=\"\"><span class=\"inputLabels rightAlign\">${Category}</span></th>\r\n\t\t\t\t\t<td nowrap=\"\">\r\n\t\t\t\t\t\t<div className=\"categoryDropDownButton\" dojoType=\"ws:WSDropDownButton\" dojoAttachPoint=\"categoryButton\" dojoAttachEvent=\"onClick: refreshDefaultItems\"></div>\r\n\t\t\t\t\t\t<div dojoType=\"ws:WSMenu\" dojoAttachPoint=\"categoryMenu\"></div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row10\">\r\n\t\t\t\t\t<td colspan=\"2\"><div class=\"headerLabels\"><span>${Work}</span></div></td>\r\n   \t\t\t\t</tr>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row11\">\r\n\t\t\t\t\t<th nowrap=\"\"><span class=\"inputLabels rightAlign\">${Company}</span></th>\r\n\t\t\t\t\t<td nowrap=\"\"><input maxlength=\"255\" class=\"regularInput\" dojoAttachPoint=\"companyInput\" /></td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row12\">\r\n\t\t\t\t\t<th nowrap=\"\"><span class=\"inputLabels rightAlign\">${JobTitle}</span></th>\r\n\t\t\t\t\t<td nowrap=\"\">\r\n\t\t\t\t\t\t<input maxlength=\"255\" class=\"jobTitleInput\" dojoAttachPoint=\"jobTitleInput\" />\r\n\t\t\t\t\t\t<span class=\"inputLabels\">${Department}</span>\r\n\t\t\t\t\t\t<input maxlength=\"255\" class=\"deptInput\" dojoAttachPoint=\"deptInput\" />\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row13\">\r\n\t\t\t\t\t<th nowrap=\"\"><span class=\"inputLabels rightAlign\">${Address}</span></th>\r\n\t\t\t\t\t<td nowrap=\"\">\r\n\t\t\t\t\t\t<div class=\"addressFieldDiv\">\r\n\t\t\t\t\t\t\t<div class=\"addressInputLabels\">${Street}</div>\r\n\t\t\t\t\t\t\t<input maxlength=\"255\" class=\"addressInput\" dojoAttachPoint=\"workStreet1Input\" />\r\n\t\t\t\t\t\t\t<a href=\"#\" dojoAttachPoint=\"addAnotherWorkStreet1Link\" dojoAttachEvent=\"onClick: addAnotherWorkStreet1\" class=\"wsLink addAnother\">+ ${StreetField}</a>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row14\">\r\n\t\t\t\t\t<th nowrap=\"\"></th>\r\n\t\t\t\t\t<td nowrap=\"\">\r\n\t\t\t\t\t\t<div class=\"addressFieldDiv\">\r\n\t\t\t\t\t\t\t<div class=\"addressInputLabels\">${Street}</div>\r\n\t\t\t\t\t\t\t<input maxlength=\"255\" class=\"addressInput\" dojoAttachPoint=\"workStreet2Input\" />\r\n\t\t\t\t\t\t\t<a href=\"#\" dojoAttachPoint=\"addAnotherWorkStreet2Link\" dojoAttachEvent=\"onClick: addAnotherWorkStreet2\" class=\"wsLink addAnother\">+ ${StreetField}</a>\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row15\">\r\n\t\t\t\t\t<th nowrap=\"\"></th>\r\n\t\t\t\t\t<td nowrap=\"\">\r\n\t\t\t\t\t\t<div class=\"addressFieldDiv2\">\r\n\t\t\t\t\t\t\t<div class=\"addressInputLabels\">${Street}</div>\r\n\t\t\t\t\t\t\t<input maxlength=\"255\" class=\"addressInput\" dojoAttachPoint=\"workStreet3Input\" />\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row16\">\r\n\t\t\t\t\t<th nowrap=\"\"></th>\r\n\t\t\t\t\t<td nowrap=\"\">\r\n\t\t\t\t\t\t<!--\r\n\t\t\t\t\t\t<div class=\"addressFieldDiv2\">\r\n\t\t\t\t\t\t\t<div class=\"addressInputLabels\">${City}</div>\r\n\t\t\t\t\t\t\t<input maxlength=\"255\" class=\"addressInput\" dojoAttachPoint=\"workCityInput\" />\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t-->\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row17\">\r\n\t\t\t\t\t<th nowrap=\"\"></th>\r\n\t\t\t\t\t<td nowrap=\"\">\r\n\t\t\t\t\t\t<!--\r\n\t\t\t\t\t\t<div class=\"addressFieldDiv2\">\r\n\t\t\t\t\t\t\t<div class=\"addressInputLabels\" dojoAttachPoint=\"workStateLabel\">${State}</div>\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<input maxlength=\"255\" class=\"addressStateInput\" dojoAttachPoint=\"workStateInput\" />\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t-->\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row18\">\r\n\t\t\t\t\t<th nowrap=\"\"></th>\r\n\t\t\t\t\t<td nowrap=\"\">\r\n\t\t\t\t\t\t<!--\r\n\t\t\t\t\t\t<div class=\"addressFieldDiv2\">\r\n\t\t\t\t\t\t\t<div class=\"addressInputLabels\">${Zip}</div>\r\n\t\t\t\t\t\t\t<input maxlength=\"255\" class=\"addressZipInput\" dojoAttachPoint=\"workZipInput\" />\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t-->\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row19\">\r\n\t\t\t\t\t<th nowrap=\"\"></th>\r\n\t\t\t\t\t<td nowrap=\"\">\r\n\t\t\t\t\t\t<!--\r\n\t\t\t\t\t\t<div class=\"addressFieldDiv2\">\r\n\t\t\t\t\t\t\t<div class=\"addressInputLabels\">${Country}</div>\r\n\t\t\t\t\t\t\t<input maxlength=\"255\" class=\"addressInput\" dojoAttachPoint=\"workCountryInput\" />\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t-->\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row20\">\r\n\t\t\t\t\t<td colspan=\"2\"><div class=\"headerLabels\"><span>${Home}</span></div></td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row21\">\r\n\t\t\t\t\t<th nowrap=\"\"><span class=\"inputLabels rightAlign\">${Address}</span></th>\r\n\t\t\t\t\t<td nowrap=\"\">\r\n\t\t\t\t\t\t<div class=\"addressFieldDiv\">\r\n\t\t\t\t\t\t\t<div class=\"addressInputLabels\">${Street}</div>\r\n\t\t\t\t\t\t\t<input maxlength=\"255\" class=\"addressInput\" dojoAttachPoint=\"homeStreet1Input\" />\r\n\t\t\t\t\t\t\t<a href=\"#\" dojoAttachPoint=\"addAnotherHomeStreet1Link\" dojoAttachEvent=\"onClick: addAnotherHomeStreet1\" class=\"wsLink addAnother\">+ ${StreetField}</a>\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row22\">\r\n\t\t\t\t\t<th nowrap=\"\"></th>\r\n\t\t\t\t\t<td nowrap=\"\">\r\n\t\t\t\t\t\t<div class=\"addressFieldDiv\">\r\n\t\t\t\t\t\t\t<div class=\"addressInputLabels\">${Street}</div>\r\n\t\t\t\t\t\t\t<input maxlength=\"255\" class=\"addressInput\" dojoAttachPoint=\"homeStreet2Input\" />\r\n\t\t\t\t\t\t\t<a href=\"#\" dojoAttachPoint=\"addAnotherHomeStreet2Link\" dojoAttachEvent=\"onClick: addAnotherHomeStreet2\" class=\"wsLink addAnother\">+ ${StreetField}</a>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row23\">\r\n\t\t\t\t\t<th nowrap=\"\"></th>\r\n\t\t\t\t\t<td nowrap=\"\">\r\n\t\t\t\t\t\t<div class=\"addressFieldDiv2\">\r\n\t\t\t\t\t\t\t<div class=\"addressInputLabels\">${Street}</div>\r\n\t\t\t\t\t\t\t<input maxlength=\"255\" class=\"addressInput\" dojoAttachPoint=\"homeStreet3Input\" />\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row24\">\r\n\t\t\t\t\t<th nowrap=\"\"></th>\r\n\t\t\t\t\t<td nowrap=\"\">\r\n\t\t\t\t\t<!--\r\n\t\t\t\t\t\t<div class=\"addressFieldDiv2\">\r\n\t\t\t\t\t\t\t<div class=\"addressInputLabels\">${City}</div>\r\n\t\t\t\t\t\t\t<input maxlength=\"255\" class=\"addressInput\" dojoAttachPoint=\"homeCityInput\" />\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t-->\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row25\">\r\n\t\t\t\t\t<th nowrap=\"\"></th>\r\n\t\t\t\t\t<td nowrap=\"\">\r\n\t\t\t\t\t<!--\r\n\t\t\t\t\t\t<div class=\"addressFieldDiv2\">\r\n\t\t\t\t\t\t\t<div class=\"addressInputLabels\" dojoAttachPoint=\"homeStateLabel\">${State}</div>\r\n\t\t\t\t\t\t\t<input maxlength=\"255\" class=\"addressStateInput\" dojoAttachPoint=\"homeStateInput\" />\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t-->\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row26\">\r\n\t\t\t\t\t<th nowrap=\"\"></th>\r\n\t\t\t\t\t<td nowrap=\"\">\r\n\t\t\t\t\t<!--\r\n\t\t\t\t\t\t<div class=\"addressFieldDiv2\">\r\n\t\t\t\t\t\t\t<div class=\"addressInputLabels\">${Zip}</div>\r\n\t\t\t\t\t\t\t<input maxlength=\"255\" class=\"addressZipInput\" dojoAttachPoint=\"homeZipInput\" />\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t-->\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row27\">\r\n\t\t\t\t\t<th nowrap=\"\"></th>\r\n\t\t\t\t\t<td nowrap=\"\">\r\n\t\t\t\t\t<!--\r\n\t\t\t\t\t\t<div class=\"addressFieldDiv2\">\r\n\t\t\t\t\t\t\t<div class=\"addressInputLabels\">${Country}</div>\r\n\t\t\t\t\t\t\t<input maxlength=\"255\" class=\"addressInput\" dojoAttachPoint=\"homeCountryInput\" />\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t-->\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row28\">\r\n\t\t\t\t\t<td colspan=\"2\"><div class=\"headerLabels\"><span>${Personal}</span></div></td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row29\">\r\n\t\t\t\t\t<th nowrap=\"\"><span class=\"inputLabels rightAlign\">${Spouse}</span></th>\r\n\t\t\t\t\t<td nowrap=\"\"><input maxlength=\"80\" class=\"regularInput\" dojoAttachPoint=\"personalSpouseInput\" /></td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row30\">\r\n\t\t\t\t\t<th nowrap=\"\" valign=\"top\"><span class=\"inputLabels familyLabel rightAlign\">${Family}</span></th>\r\n\t\t\t\t\t<td nowrap=\"\"><input maxlength=\"80\" class=\"familyInput\" dojoAttachPoint=\"personalFamilyInput\" /></td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row31\">\r\n\t\t\t\t\t<th nowrap=\"\"><span class=\"inputLabels rightAlign\">${Birthday}</span></th>\r\n\t\t\t\t\t<td nowrap=\"\">\r\n\t\t\t\t\t\t<input maxlength=\"80\" class=\"dateInput\" dojoAttachPoint=\"personalBirthdayInput\" />\r\n\t\t\t\t\t\t<span class=\"inputLabels\">${Anniversary}</span>\r\n\t\t\t\t\t\t<input maxlength=\"80\" class=\"dateInput\" dojoAttachPoint=\"personalAnniversaryInput\" />\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row32\">\r\n\t\t\t\t\t<th nowrap=\"\"><span class=\"inputLabels rightAlign\">${Notes}</span></th>\r\n\t\t\t\t\t<td nowrap=\"\"><input maxlength=\"4096\" class=\"regularInput\" dojoAttachPoint=\"personalNotesInput\" /></td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row33\">\r\n\t\t\t\t\t<th nowrap=\"\"></th>\r\n\t\t\t\t\t<td nowrap=\"\">\r\n\t\t\t\t\t\t<div class=\"addressFieldDiv2\">\r\n\t\t\t\t\t\t\t<a href=\"#\" dojoAttachPoint=\"personalAddAnotherCustomNote\" dojoAttachEvent=\"onClick: addAnotherCustomNote\" class=\"wsLink noteLink rightAlign\">+ ${Note}</a>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row34\">\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"row35\">\r\n\t\t\t\t\t<th nowrap=\"\"></th>\r\n\t\t\t\t\t<td nowrap=\"\">\r\n\t\t\t\t\t\t<span dojoAttachPoint=\"moreDetailLinksSpan\" class=\"inputLabels\">${AddMoreDetail}:</span>\r\n\t\t\t\t\t\t<a href=\"#\" dojoAttachPoint=\"workDetailLink\" dojoAttachEvent=\"onClick: showWorkDetail\" class=\"wsLink moreDetailLink\">${Work},</a>\r\n\t\t\t\t\t\t<a href=\"#\" dojoAttachPoint=\"homeDetailLink\" dojoAttachEvent=\"onClick: showHomeDetail\" class=\"wsLink moreDetailLink\">${Home},</a>\r\n\t\t\t\t\t\t<a href=\"#\" dojoAttachPoint=\"personalDetailLink\" dojoAttachEvent=\"onClick: showPersonalDetail\" class=\"wsLink moreDetailLink\">${Personal}</a>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t</table>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n",templateCssString:".editContact input\r\n{\r\n\tborder: 1px solid #85817c;\r\n\tpadding-left: 2px;\r\n}\t\r\n\r\n.editContact a.moreDetailLink\r\n{\r\n\tmargin-right: 3px;\r\n\tfont-size: 12px;\r\n\tfont-weight: 500;\r\n}\r\n\r\n.editContact a.addAnother\r\n{\r\n\tmargin-top: 6px;\r\n\tfont-size: 11px;\r\n\tfont-weight: 500;\r\n}\r\n\r\n.editContact .iconPane\r\n{\r\n\twidth: 90px;\r\n\tmargin-left: 11px;\r\n\tmargin-top: 15px;\r\n}\r\n\r\n.editContact .buddyIcon\r\n{\r\n\tmargin: 7px 0px 4px 18px;\r\n}\r\n\r\n.editContact .iconPane .contactType\r\n{\r\n\tcolor: #000000;\r\n\tfont-size: 15px;\r\n\tfont-weight: 800;\r\n}\r\n\r\n.editContact .iconPane .buddyIconInput\r\n{\r\n\twidth: 80px;\r\n\tfont-size: 12px;\r\n}\r\n\r\n.editContact .iconPane input.nickNameInput\r\n{\r\n\tmargin-top: 7px;\r\n\twidth: 80px;\r\n\tpadding-left: 4px;\r\n\tpadding-bottom: 2px;\r\n}\r\n\r\n.editContact .iconPane input.nickNameInputNew\r\n{\r\n\tmargin-top: 3px;\r\n\twidth: 80px;\r\n\tpadding-left: 4px;\r\n\tpadding-bottom: 2px;\r\n\tcolor: #A5A5A5;\r\n}\r\n\r\n.editContact .mainTable\r\n{\r\n\tmargin-top: 25px;\r\n\tmargin-left: 5px;\r\n\ttable-layout: fixed;\r\n\twidth: 95%;\r\n}\r\n\r\n.editContact .mainTable th\r\n{\r\n\twidth: 164px;\r\n}\r\n\r\n.editContact .mainTable span.inputLabels\r\n{\r\n\tpadding-right: 5px;\r\n\tpadding-top: 5px;\r\n\tpadding-bottom: 6px;\r\n\tcolor: #000000;\r\n\tfont-weight: 700;\r\n\tfont-size: 12px;\r\n}\r\n\r\n.editContact .mainTable input.regularInput\r\n{\r\n\twidth: 265px;\r\n}\r\n\r\n.editContact .mainTable input.phoneInput\r\n{\r\n\twidth: 100px;\r\n}\r\n\r\n.editContact .mainTable input.nameInput\r\n{\r\n\twidth: 125px;\r\n\tmargin-right: 4px;\r\n\tpadding-left: 2px !important;\r\n}\r\n\r\n.editContact .mainTable .phoneDropDownButton\r\n{\r\n\twidth: 79px !important;\r\n\tmargin-right: 10px;\r\n\tmargin-left: 6px;\r\n}\r\n\r\n.editContact .mainTable .phoneDropDownButton .content\r\n{\r\n\twidth: 65px !important;\r\n}\r\n\r\n.editContact .mainTable .phoneDropDownButtonWide\r\n{\r\n\twidth: 110px !important;\r\n\tmargin-right: 10px;\r\n\tmargin-left: 6px;\r\n}\r\n\r\n.editContact .mainTable .phoneDropDownButtonWide .content\r\n{\r\n\twidth: 96px !important;\r\n}\r\n\r\n\r\n.editContact .mainTable .categoryDropDownButton .content\r\n{\r\n\twidth: 151px !important;\r\n}\r\n\r\n.editContact .mainTable .headerLabels\r\n{\r\n\tfloat: left;\r\n\tcolor: #000000;\r\n\tpadding-top: 20px;\r\n\tpadding-left: 2px;\r\n\tfont-size: 15px;\r\n\tfont-weight: 800;\r\n\tborder-bottom: 1px solid #d8d6d3;\r\n\twidth: 98%;\r\n}\r\n\r\n.editContact .mainTable input.jobTitleInput\r\n{\r\n\twidth: 130px;\r\n\tmargin-right: 9px;\r\n}\r\n\r\n.editContact .mainTable input.deptInputFF\r\n{\r\n\twidth: 86px;\r\n}\r\n\r\n.editContact .mainTable input.deptInput\r\n{\r\n\twidth: 84px;\r\n}\r\n\r\n.editContact .mainTable .addressFieldDiv\r\n{\r\n\tfloat: left;\r\n\twidth: 100%;\r\n\toverflow: visible;\r\n}\r\n\r\n.editContact .mainTable .addressFieldDiv2\r\n{\r\n\tfloat: left;\r\n\twidth: 100%;\r\n\toverflow: visible;\r\n}\r\n\r\n.editContact .mainTable div.addressInputLabels\r\n{\r\n\tpadding-right: 3px;\r\n\tpadding-top: 5px;\r\n\tpadding-bottom: 5px;\r\n\tcolor: #000;\r\n\tfont-weight: 500;\r\n\tfont-size: 12px;\r\n\twidth: 58px;\r\n\ttext-align: right;\r\n\tfloat: left;\r\n}\r\n\r\n.editContact .mainTable input.addressInput\r\n{\r\n\twidth: 200px;\r\n\tmargin-right: 5px;\r\n}\r\n\r\n.editContact .mainTable input.addressStateInput\r\n{\r\n\twidth: 94px;\r\n\tmargin-right: 7px;\r\n}\r\n\r\n.editContact .mainTable input.addressZipInput\r\n{\r\n\tmargin-right: 5px;\r\n\twidth: 73px;\r\n}\r\n\r\n.editContact .mainTable input.familyInput\r\n{\r\n\twidth: 265px;\r\n\theight: 40px;\r\n}\r\n\r\n.editContact .mainTable span.familyLabel\r\n{\r\n\tpadding-top: 1px;\r\n}\r\n\r\n.editContact .mainTable input.dateInput\r\n{\r\n\twidth: 89px;\r\n\tmargin-right: 7px;\r\n}\r\n\r\n.editContact .mainTable a.noteLink\r\n{\r\n\tfont-size: 11px;\r\n\tfont-weight: 500;\r\n\tpadding-top: 5px;\r\n\tpadding-bottom: 5px;\r\n}\r\n\r\n.editContact .mainTable .separatorDiv\r\n{\r\n\tborder-bottom: 1px solid #d8d6d3;\r\n\twidth: 98%;\r\n\theight: 2px;\r\n}\r\n\r\n.editContact .leftAlign\r\n{\r\n\tfloat: left;\r\n}\r\n\r\n.editContact .rightAlign\r\n{\r\n\tfloat: right;\r\n}\r\n\r\n\r\n/* New Category menu item. */\r\n.newGroup\r\n{\r\n\tposition: relative;\r\n\toverflow: auto;  /* Fixes the Firefox no-blinking-cursor bug */\r\n}\r\n\r\n.newGroup .newCategoryInput\r\n{\r\n\twidth: 83px;\r\n\tmargin-bottom: 3px;\r\n\tmargin-right: 2px;\r\n\tborder: 1px solid #85817c;\r\n}\r\n\r\n.newGroup .newButtonImg\r\n{\r\n\twidth: 18px;\r\n\theight: 18px;\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tbackground-position: -1189px -0px;\r\n\tcursor: pointer;\r\n}\r\n\r\n.newGroup .newButtonImgFF\r\n{\r\n\twidth: 18px;\r\n\theight: 18px;\r\n\tfloat: right;\r\n\tmargin-top: -1px;\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tbackground-position: -1189px -0px;\r\n\tcursor: pointer;\r\n}\r\n\r\n.newGroup img.hover\r\n{\r\n\tbackground-position: -1212px -0px;\r\n}\r\n\r\n.contactsNewCategoryItemLabel\r\n{\r\n\tcolor: #000000;\r\n\tpadding: 2px 5px 2px 5px;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/address/EditContactDialog.css"),addressModel:null,closeCB:null,cancelCB:null,backToListCB:null,uid:null,data:null,returnToGridOnCancel:null,textValues:["personalBirthday","personalAnniversary","screenName","email1","email2","phone1","phone2","phone3","phone4","phone5","company","jobTitle","dept","workStreet1","workStreet2","workStreet3","workCity","workState","workZip","workCountry","homeStreet1","homeStreet2","homeStreet3","homeCity","homeState","homeZip","homeCountry","personalSpouse","personalFamily","personalNotes"],preferredEmailTypes:["Undefined","ScreenName","Email1","Email2"],contactPhoneTypes:["Undefined","Cellular","Fax","Home","Pager","Work"],phoneTypeItems:["cellItem","homeItem","workItem","pagerItem","faxItem"],phones:["phone1","phone2","phone3","phone4","phone5"],postCreate:function(_7e,_7f){
this.setupDropDownMenus();
_1.event.topic.subscribe("Suite/onKeyOnPress",this,"_suiteOnKeyPress");
if(_1.render.html.ie){
_1.html.setStyle(this.firstNameInput.textbox,"margin-right","7px");
this.browserIsIE=true;
}
if(Config.PageLocale=="es-es"||Config.PageLocale=="it-it"||Config.PageLocale=="sv-se"){
for(var i=1;i<6;i++){
_1.html.replaceClass(this["phone"+i+"Button"].domNode,"phoneDropDownButtonWide","phoneDropDownButton");
}
}
},fillInTemplate:function(_81,_82){
var _83=new Object();
_83.City="<div class=\"addressFieldDiv2\"><div class=\"addressInputLabels\">"+Config.Strings.City+"</div><input maxlength=\"255\" class=\"addressInput\"/></div>";
_83.State="<div class=\"addressFieldDiv2\"><div class=\"addressInputLabels\">"+Config.Strings.State+"</div><input maxlength=\"255\" class=\"addressStateInput\" /></div>";
_83.Zip="<div class=\"addressFieldDiv2\"><div class=\"addressInputLabels\">"+Config.Strings.Zip+"</div><input maxlength=\"255\" class=\"addressZipInput\"/></div>";
_83.Country="<div class=\"addressFieldDiv2\"><div class=\"addressInputLabels\">"+Config.Strings.Country+"</div><input maxlength=\"255\" class=\"addressInput\"/></div>";
var _84=Config.AddressOrder.split(" ");
this._buildAddressFields(this.row16,_83,_84[0],false);
this._buildAddressFields(this.row24,_83,_84[0],true);
this._buildAddressFields(this.row17,_83,_84[1],false);
this._buildAddressFields(this.row25,_83,_84[1],true);
this._buildAddressFields(this.row18,_83,_84[2],false);
this._buildAddressFields(this.row26,_83,_84[2],true);
this._buildAddressFields(this.row19,_83,_84[3],false);
this._buildAddressFields(this.row27,_83,_84[3],true);
},_buildAddressFields:function(row,_86,_87,_88){
var _89=_86[_87];
var td=_1.dom.lastElement(row,"td");
td.innerHTML=_89;
var _8b;
if(_88){
_8b="home"+_87+"Input";
}else{
_8b="work"+_87+"Input";
}
this[_8b]=td.getElementsByTagName("input")[0];
},buildCategoryDropDownMenu:function(){
if(!this.addressModel.getCategories()){
return;
}
var i=null;
var _8d=new Array();
_1.lang.forEach(this.addressModel.getCategories(),_1.lang.hitch(this,function(_8e){
_8d.push(_8e);
}));
while(this.categoryMenu.children.length){
this.categoryMenu.removeChild(this.categoryMenu.children[0]);
}
this.categoryButton.menu=this.categoryMenu;
for(var i=0;i<_8d.length;i++){
this["categoryItem"+i]=_1.widget.createWidget("ws:WSMenuItem",{caption:this.translateCategoryName(_8d[i])});
this["categoryItem"+i].value=_8d[i];
this.categoryMenu.addChild(this["categoryItem"+i]);
this["categoryItem"+i].onClick=ws.lang.hitch(this,"setupCategoryLabel",this["categoryItem"+i]);
}
this.addNewSeparator=_1.widget.createWidget("ws:WSMenuSeparator");
this.categoryMenu.addChild(this.addNewSeparator);
this.categoryItemAddNew=_1.widget.createWidget("ws:AddCategoryItem",{caption:Config.Strings.AddNew});
this.categoryMenu.addChild(this.categoryItemAddNew);
this.categoryItemAddNew.onClickCB=_1.lang.hitch(this,"addNewCategory");
if(this.newCategoryWidget){
this.categoryMenu.addChild(this.newCategoryWidget);
}
},translateCategoryName:function(_8f){
var _90=15;
if((_8f=="Co-Workers")||(_8f=="Friends")||(_8f=="Family")||(_8f=="General")||(_8f=="Auto-Added")||(_8f=="Uncategorized")){
var _91="Config.Strings.ABCat"+_8f.replace("-","");
return eval(_91);
}else{
return _1.string.summary(_1.string.escapeXml(_8f),_90);
}
},setupCategoryLabel:function(_92){
this.categoryButton.setLabel(_92.caption);
this.categoryButton.value=_92.value;
},setupDropDownMenus:function(){
this.phone1Button.menu=this.primaryPhoneMenu;
this.phone2Button.menu=this.phone2Menu;
this.phone3Button.menu=this.phone3Menu;
this.phone4Button.menu=this.phone4Menu;
this.phone5Button.menu=this.phone5Menu;
this.phone1Button.setLabel(this.cellItem1.caption);
this.phone2Button.setLabel(this.homeItem2.caption);
this.phone3Button.setLabel(this.workItem3.caption);
this.phone4Button.setLabel(this.pagerItem4.caption);
this.phone5Button.setLabel(this.faxItem5.caption);
for(var i=0;i<5;i++){
for(var j=1;j<6;j++){
this[this.phoneTypeItems[i]+j.toString()].onClick=ws.lang.hitch(this,"phoneTypeSelect",this[this.phoneTypeItems[i]+j.toString()]);
}
}
},phoneTypeSelect:function(_95){
_95.parent.parent.setLabel(_95.caption);
_1.debug(_95);
switch(_95.parent.parent.widgetId){
case "ws_WSDropDownButton_4":
break;
case "ws_WSDropDownButton_5":
break;
case "ws_WSDropDownButton_6":
break;
case "ws_WSDropDownButton_7":
break;
case "ws_WSDropDownButton_8":
break;
default:
_1.debug("here");
break;
}
},handleCategory:function(_96){
_96.parent.parent.setLabel(_96.caption);
switch(_96.caption){
case "General":
break;
case "Friends":
break;
case "Family":
break;
case "Co-Workers":
break;
default:
break;
}
},addNewCategory:function(){
if(!this.newCategoryWidget){
this.newCategoryWidget=_1.widget.createWidget("ws:NewCategoryWidget",{contactDialog:this,closeCB:_1.lang.hitch(this,"closeNewGroupWidget")});
this.categoryMenu.addChild(this.newCategoryWidget);
}
this.categoryItemAddNew.hide();
this.newCategoryWidget.show();
this.newCategoryWidget.initializeText();
},displayNewCategory:function(_97){
if(!_1.string.isBlank(_97)){
var _98=_1.widget.createWidget("ws:WSMenuItem",{caption:this.translateCategoryName(_97)});
_98.value=_97;
_98.onClick=ws.lang.hitch(this,"setupCategoryLabel",_98);
this.setupCategoryLabel(_98);
this.categoryMenu.closeAll(true);
this.categoryMenu.removeChild(this.addNewSeparator);
this.categoryMenu.removeChild(this.newCategoryWidget);
this.categoryMenu.removeChild(this.categoryItemAddNew);
this.categoryMenu.addChild(_98);
this.categoryMenu.addChild(this.addNewSeparator);
this.categoryMenu.addChild(this.categoryItemAddNew);
this.categoryItemAddNew.show();
this.categoryMenu.addChild(this.newCategoryWidget);
this.newCategoryWidget.hide();
}else{
this.closeNewGroupWidget();
}
},closeNewGroupWidget:function(){
this.newCategoryWidget.hide();
this.categoryItemAddNew.show();
},refreshDefaultItems:function(){
if(this.newCategoryWidget&&this.newCategoryWidget.isShowing()){
this.closeNewGroupWidget();
}
},checkRequiredFields:function(){
var _99="";
if((!_1.string.isBlank(this.email1Input.value))&&(!this.isEmailAddress(this.email1Input.value))){
_99=ws.string.substituteParams(Config.Strings.ErrorEmailFormat,Config.Strings.Email1);
}
if((!_1.string.isBlank(this.email2Input.value))&&(!this.isEmailAddress(this.email2Input.value))){
_99=ws.string.substituteParams(Config.Strings.ErrorEmailFormat,Config.Strings.Email2);
}
if(_1.string.isBlank(_99)){
this.saveAndClose();
}else{
ws.widget.OkCancelDialog.alert(_99);
}
},isEmailAddress:function(_9a){
var _9b=_9a.match(/(.+)@(.+)\.(.+)/);
return ((_9b!=null)&&(_9b.length==4));
},saveAndClose:function(){
var i=null;
var _9d=null;
var _9e={uid:this.uid};
if(!_1.string.isBlank(this.firstNameInput.getValue())){
_9e.firstName=this.stripWhiteSpace(this.firstNameInput.getValue());
}
if(!_1.string.isBlank(this.lastNameInput.getValue())){
_9e.lastName=this.stripWhiteSpace(this.lastNameInput.getValue());
}
var _9f=null;
var _a0=Config.Strings.CalDateParseFormat;
_9f=this.stripWhiteSpace(this.personalBirthdayInput.value);
if(_9f!=null&&_9f.length>0){
_9e.personalBirthday=_9f;
}
_9f=this.stripWhiteSpace(this.personalAnniversaryInput.value);
if(_9f!=null&&_9f.length>0){
_9e.personalAnniversary=_9f;
}
if(!_1.string.isBlank(this.nickNameInput.getValue())){
_9e.nickName=this.stripWhiteSpace(this.nickNameInput.getValue());
}
for(i=2;i<this.textValues.length;i++){
_9e[this.textValues[i]]=this.stripWhiteSpace(this[this.textValues[i]+"Input"].value);
}
for(i=0;i<this.phoneTypeItems.length;i++){
if(this[this.phones[i]+"Input"].value){
_9e[this.phones[i]+"Type"]=this.getPhoneType(this[this.phones[i]+"Button"].containerNode.innerHTML);
}
}
if(this.categoryButton.containerNode.innerHTML==Config.Strings.ABCatSelectGroup){
_9e.category="Uncategorized";
}else{
_9e.category=this.categoryButton.value?this.categoryButton.value:"Uncategorized";
}
_9e.preferredEmail=this.getPreferredEmail(_9e);
ws.widget.setEnabled(this.saveContactButton,false);
_9e.load=_1.lang.hitch(this,"contactSaved");
_9e.error=_1.lang.hitch(this,function(err){
ws.widget.setEnabled(this.saveContactButton,true);
ws.widget.Dialogs.ok(_1.string.isBlank(err)?Config.Strings.ErrorSavingContactServerError:err,_1.lang.hitch(this,function(i){
if(err==Config.Strings.InvalidBirthdayDate){
this.personalBirthdayInput.select();
}else{
if(err==Config.Strings.InvalidAnniversaryDate){
this.personalAnniversaryInput.select();
}
}
}));
});
this.addressModel.createOrModifyContact(_9e);
this.data=_9e;
},getPhoneType:function(_a3){
switch(_a3){
case Config.Strings.Cellular:
return this.contactPhoneTypes[1];
case Config.Strings.Fax:
return this.contactPhoneTypes[2];
case Config.Strings.Home:
return this.contactPhoneTypes[3];
case Config.Strings.Pager:
return this.contactPhoneTypes[4];
case Config.Strings.Work:
return this.contactPhoneTypes[5];
default:
return this.contactPhoneTypes[0];
}
},getPreferredEmail:function(_a4){
if(("screenName" in _a4)&&(!_1.string.isBlank(_a4.screenName))){
return this.preferredEmailTypes[1];
}else{
if(("email1" in _a4)&&(!_1.string.isBlank(_a4.email1))){
return this.preferredEmailTypes[2];
}else{
if(("email2" in _a4)&&(!_1.string.isBlank(_a4.email2))){
return this.preferredEmailTypes[3];
}else{
return this.preferredEmailTypes[1];
}
}
}
},populateForm:function(_a5){
_1.debug("populateForm()");
if(!_a5){
for(i=0;i<this.textValues.length;i++){
this[this.textValues[i]+"Input"].value="";
}
this.nickNameInput.setValue();
this.firstNameInput.setValue();
this.lastNameInput.setValue();
_1.html.setClass(_1.html.getParentByType(this.addAnotherWorkStreet1Link,"div"),"addressFieldDiv");
_1.html.setClass(_1.html.getParentByType(this.addAnotherWorkStreet2Link,"div"),"addressFieldDiv");
_1.html.setClass(_1.html.getParentByType(this.addAnotherHomeStreet1Link,"div"),"addressFieldDiv");
_1.html.setClass(_1.html.getParentByType(this.addAnotherHomeStreet2Link,"div"),"addressFieldDiv");
return;
}
var i=null;
if(Config.ShowPresenceInfoOnContacts){
this.buddyIcon.show(_a5);
}
if("personalBirthday" in _a5){
this.personalBirthdayInput.value=_a5.personalBirthday;
this.showSection("Personal");
}
if("personalAnniversary" in _a5){
this.personalAnniversaryInput.value=_a5.personalAnniversary;
this.showSection("Personal");
}
if(_a5.nickName){
this.nickNameInput.setValue(_a5.nickName);
}
if(_a5.firstName){
this.firstNameInput.setValue(_a5.firstName);
}
if(_a5.lastName){
this.lastNameInput.setValue(_a5.lastName);
}
for(i=2;i<this.textValues.length;i++){
this[this.textValues[i]+"Input"].value=(this.textValues[i] in _a5)?_a5[this.textValues[i]]:"";
if(this[this.textValues[i]+"Input"].value){
if((i>11)&&(i<22)){
this.showSection("Work");
}else{
if((i>21)&&(i<29)){
this.showSection("Home");
}else{
if((i>28)&&(i<32)){
this.showSection("Personal");
}else{
_1.html.show(this[this.textValues[i]+"Input"].parentNode.parentNode);
}
}
}
}
}
if(!_1.string.isBlank(this.email2Input.value)){
_1.html.hide(this.addAnotherEmailLink);
}
for(i=0;i<this.phones.length;i++){
this.setLocalizedPhoneType(this[this.phones[i]+"Button"],((this.phones[i]+"Type") in _a5)?_a5[(this.phones[i]+"Type")]:"Undefined");
if(i<4){
if((this.phones[i+1]+"Type") in _a5){
_1.html.hide(this[this.phones[i]+"Link"]);
}
}
}
this.categoryButton.setLabel(("category" in _a5)?this.translateCategoryName(_a5.category):Config.Strings.ABCatGeneral);
this.categoryButton.value=("category" in _a5)?_a5.category:"General";
},setLocalizedPhoneType:function(_a7,_a8){
switch(_a8){
case this.contactPhoneTypes[3]:
_a7.setLabel(Config.Strings.Home);
break;
case this.contactPhoneTypes[4]:
_a7.setLabel(Config.Strings.Pager);
break;
case this.contactPhoneTypes[5]:
_a7.setLabel(Config.Strings.Work);
break;
case this.contactPhoneTypes[2]:
_a7.setLabel(Config.Strings.Fax);
break;
case this.contactPhoneTypes[1]:
case this.contactPhoneTypes[0]:
default:
_a7.setLabel(Config.Strings.Cellular);
break;
}
},showSection:function(_a9){
var i=null;
switch(_a9){
case "Work":
for(i=10;i<20;i++){
_1.html.show(this["row"+i.toString()]);
}
_1.html.hide(this.workDetailLink);
if(this.workStreet2Input.value){
_1.html.setClass(_1.html.getParentByType(this.addAnotherWorkStreet1Link,"div"),"addressFieldDiv2");
_1.html.show(this.row14);
_1.html.hide(this.addAnotherWorkStreet1Link);
}else{
_1.html.hide(this.row14);
}
if(this.workStreet3Input.value){
_1.html.setClass(_1.html.getParentByType(this.addAnotherWorkStreet2Link,"div"),"addressFieldDiv2");
_1.html.show(this.row15);
_1.html.hide(this.addAnotherWorkStreet2Link);
}else{
_1.html.hide(this.row15);
}
if(Config.ABHideState){
var _ab=this.workStateInput.parentNode.getElementsByTagName("div")[0];
_1.html.hide(_ab);
_1.html.hide(this.workStateInput);
}
break;
case "Home":
for(i=20;i<28;i++){
_1.html.show(this["row"+i.toString()]);
}
_1.html.hide(this.homeDetailLink);
if(this.homeStreet2Input.value){
_1.html.setClass(_1.html.getParentByType(this.addAnotherHomeStreet1Link,"div"),"addressFieldDiv2");
_1.html.show(this.row22);
_1.html.hide(this.addAnotherHomeStreet1Link);
}else{
_1.html.hide(this.row22);
}
if(this.homeStreet3Input.value){
_1.html.setClass(_1.html.getParentByType(this.addAnotherHomeStreet2Link,"div"),"addressFieldDiv2");
_1.html.show(this.row23);
_1.html.hide(this.addAnotherHomeStreet2Link);
}else{
_1.html.hide(this.row23);
}
if(Config.ABHideState){
var _ab=this.homeStateInput.parentNode.getElementsByTagName("div")[0];
_1.html.hide(_ab);
_1.html.hide(this.homeStateInput);
}
break;
case "Personal":
for(i=28;i<32;i++){
_1.html.show(this["row"+i.toString()]);
}
if(this.personalNotesInput.value){
_1.html.show(this.row32);
_1.html.hide(this.row33);
}else{
_1.html.show(this.row33);
}
_1.html.hide(this.personalDetailLink);
break;
default:
break;
}
if(!_1.html.isShowing(this.workDetailLink)&&!_1.html.isShowing(this.homeDetailLink)&&!_1.html.isShowing(this.personalDetailLink)){
_1.html.hide(this.row34);
_1.html.hide(this.row35);
}
},getEmailDomain:function(_ac){
if((_ac==null)||(_ac=="")){
return "";
}
var _ad="";
var _ae="";
var _af=_ac.match(/(.*)@(.*)/);
if((_af!=null)&&(_af.length==3)){
_ad=_af[1];
_ae=_af[2];
if(_ae!=null){
_ae=_ae.toLowerCase();
}
}
return _ae;
},showContact:function(uid,_b1,_b2){
var i=null;
this.returnToGridOnCancel=(_b2)?_b2:false;
this.uid=uid||0;
this.data=null;
this.populateForm();
this.buildCategoryDropDownMenu();
this.categoryButton.setLabel(Config.Strings.ABCatSelectGroup);
for(i=5;i<35;i++){
_1.html.hide(this["row"+i.toString()]);
}
_1.html.hide(this.row3);
_1.html.show(this.row9);
_1.html.show(this.row34);
_1.html.show(this.row35);
_1.html.show(this.workDetailLink);
_1.html.show(this.homeDetailLink);
_1.html.show(this.personalDetailLink);
_1.html.show(this.addAnotherEmailLink);
for(i=1;i<5;i++){
_1.html.show(this["phone"+i+"Link"]);
}
_1.html.show(this.addAnotherWorkStreet1Link);
_1.html.show(this.addAnotherWorkStreet2Link);
_1.html.show(this.addAnotherHomeStreet1Link);
_1.html.show(this.addAnotherHomeStreet2Link);
this.deleteContactButton.hide();
if(_b1){
this.data=_b1;
if(uid){
this.deleteContactButton.show();
this.contactTypeSpan.innerHTML=Config.Strings.EditContact;
}else{
this.contactTypeSpan.innerHTML=Config.Strings.NewContact;
}
this.populateForm(_b1);
}else{
this.contactTypeSpan.innerHTML=Config.Strings.NewContact;
this.buddyIcon.show({});
}
this.resetDirty();
},addAnotherEmail:function(){
_1.html.show(this.row3);
_1.html.hide(this.addAnotherEmailLink);
},addAnotherPhone1:function(){
_1.html.show(this.row5);
_1.html.hide(this.phone1Link);
if(this.browserIsIE){
this.phone2Button.sizeMyself();
}
},addAnotherPhone2:function(){
_1.html.show(this.row6);
_1.html.hide(this.phone2Link);
if(this.browserIsIE){
this.phone3Button.sizeMyself();
}
},addAnotherPhone3:function(){
_1.html.show(this.row7);
_1.html.hide(this.phone3Link);
if(this.browserIsIE){
this.phone4Button.sizeMyself();
}
},addAnotherPhone4:function(){
_1.html.show(this.row8);
_1.html.hide(this.phone4Link);
if(this.browserIsIE){
this.phone5Button.sizeMyself();
}
},addAnotherWorkStreet1:function(){
_1.html.setClass(_1.html.getParentByType(this.addAnotherWorkStreet1Link,"div"),"addressFieldDiv2");
_1.html.show(this.row14);
_1.html.hide(this.addAnotherWorkStreet1Link);
},addAnotherWorkStreet2:function(){
_1.html.setClass(_1.html.getParentByType(this.addAnotherWorkStreet2Link,"div"),"addressFieldDiv2");
_1.html.show(this.row15);
_1.html.hide(this.addAnotherWorkStreet2Link);
},addAnotherHomeStreet1:function(){
_1.html.setClass(_1.html.getParentByType(this.addAnotherHomeStreet1Link,"div"),"addressFieldDiv2");
_1.html.show(this.row22);
_1.html.hide(this.addAnotherHomeStreet1Link);
},addAnotherHomeStreet2:function(){
_1.html.setClass(_1.html.getParentByType(this.addAnotherHomeStreet2Link,"div"),"addressFieldDiv2");
_1.html.show(this.row23);
_1.html.hide(this.addAnotherHomeStreet2Link);
},addAnotherCustomNote:function(){
_1.html.show(this.row32);
_1.html.hide(this.row33);
},showWorkDetail:function(){
this.showSection("Work");
},showHomeDetail:function(){
this.showSection("Home");
},showPersonalDetail:function(){
this.showSection("Personal");
},stripWhiteSpace:function(str){
var _b5=str.replace(/^\s+/,"");
_b5=_b5.replace(/\s+$/,"");
return _b5;
},isDirty:function(){
return this.getCurrentStateHash()!=this.initialStateHash;
},resetDirty:function(){
this.initialStateHash=this.getCurrentStateHash();
},getCurrentStateHash:function(){
var _b6="";
for(i=0;i<this.textValues.length;i++){
_b6+=this[this.textValues[i]+"Input"].value;
}
_b6+=this.nickNameInput.getValue();
_b6+=this.firstNameInput.getValue();
_b6+=this.lastNameInput.getValue();
return _b6;
},cancel:function(){
if(this.isDirty()&&this.cancelCB){
this.cancelCB(_1.lang.hitch(this,function(){
if(this.returnToGridOnCancel){
this.backToList();
}else{
this.close();
}
}));
}else{
if(this.returnToGridOnCancel){
this.backToList();
}else{
this.close();
}
}
},close:function(){
if(this.closeCB){
this.closeCB();
}
},contactSaved:function(_b7){
this.resetDirty();
this.data.uid=_b7.uid;
this.savedCB(this.data);
this.close();
if(this.uid){
_1.event.topic.publish("WSFeedbackStart",Config.Strings.ContactUpdated,true);
}else{
_1.event.topic.publish("WSFeedbackStart",Config.Strings.ContactCreated,true);
}
ws.widget.setEnabled(this.saveContactButton,true);
},deleteContact:function(){
ws.widget.OkCancelDialog.alert(Config.Strings.DeleteContactsConfirmationSingular,_1.lang.hitch(this,function(_b8){
if(_b8){
this.addressModel.deleteAddresses({uids:[this.uid],load:_1.lang.hitch(this,function(_b9){
this.resetDirty();
if(_b9.isSuccess){
_1.event.topic.publish("WSFeedbackStart",Config.Strings.ContactDeletedSingular,true);
}
}),error:function(err){
ws.widget.OkCancelDialog.alert(_1.string.isBlank(err)?Config.Strings.ErrorDeletingContactNotFound:err);
}});
this.backToList();
}
}),true);
},_suiteOnKeyPress:function(evt){
if(!this.isShowing()){
return;
}
if(Config.EnableKeyboardShortcuts&&evt.ctrlKey){
if(evt.key==evt.KEY_ENTER){
this.checkRequiredFields();
}
}else{
if(evt.key&&_1.lang.isString(evt.key)&&(evt.key.toLowerCase()==Config.Strings.KeyCancelAddContact)&&evt.altKey){
this.cancel();
}
}
},savedCB:function(_bc){
},backToList:function(){
if(this.backToListCB){
this.backToListCB();
}
}});
_1.widget.defineWidget("ws.address.AddCategoryItem",_1.widget.MenuItem2,{templateString:"<tr class=\"dojoMenuItem2\" dojoAttachEvent=\"onMouseOver: onHover; onMouseOut: onUnhover; onClick: _onClick; onKey:onKey;\">"+"\t<td tabIndex=\"-1\" colspan=\"3\" class=\"dojoMenuItem2Label\" dojoAttachPoint=\"labelNode\"></td>"+"</tr>",postCreate:function(){
this.labelNode.innerHTML=this.caption;
ws.address.AddCategoryItem.superclass.postCreate.apply(this,arguments);
},_onClick:function(evt){
evt.stopPropagation();
if(this.onClickCB){
this.onClickCB();
}
},setCaption:function(_be){
this.labelNode.innerHTML=_be;
}});
_1.widget.defineWidget("ws.address.NewCategoryWidget",ws.widget.WSMenuItem,{templateString:"<tr class=\"dojoMenuItem2\" dojoAttachEvent=\"onMouseOver: onHover; onMouseOut: onUnhover; onClick: _onClick; onKey: doKey;\">"+"\t<td tabIndex=\"-1\" colspan=\"3\" class=\"contactsNewCategoryItemLabel\" dojoAttachPoint=\"labelNode\">"+"\t\t<div class=\"newGroup\" dojoAttachPoint=\"itemContainer\" dojoAttachEvent=\"onKeyPress: _onKeyPress\">"+"\t\t\t<div dojoType=\"ws:DefaultTextBox\" className=\"newCategoryInput\" dojoAttachPoint=\"createGroupInput\" defaultValue=\"${NewCategory}\"></div>"+"\t\t\t<img dojoAttachPoint=\"newButton\" class=\"newButtonImg\" dojoAttachEvent=\"onClick: displayNewCategory; onMouseOver: onHoverButton; onMouseOut: onUnhoverButton\" src=\"${spacer}\" />"+"\t\t</div>"+"\t</td>"+"<td><div class=\"dojoMenuItem2Submenu\" style=\"display:${this.arrowDisplay};\"></div></td>"+"</tr>",templateCssString:".editContact input\r\n{\r\n\tborder: 1px solid #85817c;\r\n\tpadding-left: 2px;\r\n}\t\r\n\r\n.editContact a.moreDetailLink\r\n{\r\n\tmargin-right: 3px;\r\n\tfont-size: 12px;\r\n\tfont-weight: 500;\r\n}\r\n\r\n.editContact a.addAnother\r\n{\r\n\tmargin-top: 6px;\r\n\tfont-size: 11px;\r\n\tfont-weight: 500;\r\n}\r\n\r\n.editContact .iconPane\r\n{\r\n\twidth: 90px;\r\n\tmargin-left: 11px;\r\n\tmargin-top: 15px;\r\n}\r\n\r\n.editContact .buddyIcon\r\n{\r\n\tmargin: 7px 0px 4px 18px;\r\n}\r\n\r\n.editContact .iconPane .contactType\r\n{\r\n\tcolor: #000000;\r\n\tfont-size: 15px;\r\n\tfont-weight: 800;\r\n}\r\n\r\n.editContact .iconPane .buddyIconInput\r\n{\r\n\twidth: 80px;\r\n\tfont-size: 12px;\r\n}\r\n\r\n.editContact .iconPane input.nickNameInput\r\n{\r\n\tmargin-top: 7px;\r\n\twidth: 80px;\r\n\tpadding-left: 4px;\r\n\tpadding-bottom: 2px;\r\n}\r\n\r\n.editContact .iconPane input.nickNameInputNew\r\n{\r\n\tmargin-top: 3px;\r\n\twidth: 80px;\r\n\tpadding-left: 4px;\r\n\tpadding-bottom: 2px;\r\n\tcolor: #A5A5A5;\r\n}\r\n\r\n.editContact .mainTable\r\n{\r\n\tmargin-top: 25px;\r\n\tmargin-left: 5px;\r\n\ttable-layout: fixed;\r\n\twidth: 95%;\r\n}\r\n\r\n.editContact .mainTable th\r\n{\r\n\twidth: 164px;\r\n}\r\n\r\n.editContact .mainTable span.inputLabels\r\n{\r\n\tpadding-right: 5px;\r\n\tpadding-top: 5px;\r\n\tpadding-bottom: 6px;\r\n\tcolor: #000000;\r\n\tfont-weight: 700;\r\n\tfont-size: 12px;\r\n}\r\n\r\n.editContact .mainTable input.regularInput\r\n{\r\n\twidth: 265px;\r\n}\r\n\r\n.editContact .mainTable input.phoneInput\r\n{\r\n\twidth: 100px;\r\n}\r\n\r\n.editContact .mainTable input.nameInput\r\n{\r\n\twidth: 125px;\r\n\tmargin-right: 4px;\r\n\tpadding-left: 2px !important;\r\n}\r\n\r\n.editContact .mainTable .phoneDropDownButton\r\n{\r\n\twidth: 79px !important;\r\n\tmargin-right: 10px;\r\n\tmargin-left: 6px;\r\n}\r\n\r\n.editContact .mainTable .phoneDropDownButton .content\r\n{\r\n\twidth: 65px !important;\r\n}\r\n\r\n.editContact .mainTable .phoneDropDownButtonWide\r\n{\r\n\twidth: 110px !important;\r\n\tmargin-right: 10px;\r\n\tmargin-left: 6px;\r\n}\r\n\r\n.editContact .mainTable .phoneDropDownButtonWide .content\r\n{\r\n\twidth: 96px !important;\r\n}\r\n\r\n\r\n.editContact .mainTable .categoryDropDownButton .content\r\n{\r\n\twidth: 151px !important;\r\n}\r\n\r\n.editContact .mainTable .headerLabels\r\n{\r\n\tfloat: left;\r\n\tcolor: #000000;\r\n\tpadding-top: 20px;\r\n\tpadding-left: 2px;\r\n\tfont-size: 15px;\r\n\tfont-weight: 800;\r\n\tborder-bottom: 1px solid #d8d6d3;\r\n\twidth: 98%;\r\n}\r\n\r\n.editContact .mainTable input.jobTitleInput\r\n{\r\n\twidth: 130px;\r\n\tmargin-right: 9px;\r\n}\r\n\r\n.editContact .mainTable input.deptInputFF\r\n{\r\n\twidth: 86px;\r\n}\r\n\r\n.editContact .mainTable input.deptInput\r\n{\r\n\twidth: 84px;\r\n}\r\n\r\n.editContact .mainTable .addressFieldDiv\r\n{\r\n\tfloat: left;\r\n\twidth: 100%;\r\n\toverflow: visible;\r\n}\r\n\r\n.editContact .mainTable .addressFieldDiv2\r\n{\r\n\tfloat: left;\r\n\twidth: 100%;\r\n\toverflow: visible;\r\n}\r\n\r\n.editContact .mainTable div.addressInputLabels\r\n{\r\n\tpadding-right: 3px;\r\n\tpadding-top: 5px;\r\n\tpadding-bottom: 5px;\r\n\tcolor: #000;\r\n\tfont-weight: 500;\r\n\tfont-size: 12px;\r\n\twidth: 58px;\r\n\ttext-align: right;\r\n\tfloat: left;\r\n}\r\n\r\n.editContact .mainTable input.addressInput\r\n{\r\n\twidth: 200px;\r\n\tmargin-right: 5px;\r\n}\r\n\r\n.editContact .mainTable input.addressStateInput\r\n{\r\n\twidth: 94px;\r\n\tmargin-right: 7px;\r\n}\r\n\r\n.editContact .mainTable input.addressZipInput\r\n{\r\n\tmargin-right: 5px;\r\n\twidth: 73px;\r\n}\r\n\r\n.editContact .mainTable input.familyInput\r\n{\r\n\twidth: 265px;\r\n\theight: 40px;\r\n}\r\n\r\n.editContact .mainTable span.familyLabel\r\n{\r\n\tpadding-top: 1px;\r\n}\r\n\r\n.editContact .mainTable input.dateInput\r\n{\r\n\twidth: 89px;\r\n\tmargin-right: 7px;\r\n}\r\n\r\n.editContact .mainTable a.noteLink\r\n{\r\n\tfont-size: 11px;\r\n\tfont-weight: 500;\r\n\tpadding-top: 5px;\r\n\tpadding-bottom: 5px;\r\n}\r\n\r\n.editContact .mainTable .separatorDiv\r\n{\r\n\tborder-bottom: 1px solid #d8d6d3;\r\n\twidth: 98%;\r\n\theight: 2px;\r\n}\r\n\r\n.editContact .leftAlign\r\n{\r\n\tfloat: left;\r\n}\r\n\r\n.editContact .rightAlign\r\n{\r\n\tfloat: right;\r\n}\r\n\r\n\r\n/* New Category menu item. */\r\n.newGroup\r\n{\r\n\tposition: relative;\r\n\toverflow: auto;  /* Fixes the Firefox no-blinking-cursor bug */\r\n}\r\n\r\n.newGroup .newCategoryInput\r\n{\r\n\twidth: 83px;\r\n\tmargin-bottom: 3px;\r\n\tmargin-right: 2px;\r\n\tborder: 1px solid #85817c;\r\n}\r\n\r\n.newGroup .newButtonImg\r\n{\r\n\twidth: 18px;\r\n\theight: 18px;\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tbackground-position: -1189px -0px;\r\n\tcursor: pointer;\r\n}\r\n\r\n.newGroup .newButtonImgFF\r\n{\r\n\twidth: 18px;\r\n\theight: 18px;\r\n\tfloat: right;\r\n\tmargin-top: -1px;\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tbackground-position: -1189px -0px;\r\n\tcursor: pointer;\r\n}\r\n\r\n.newGroup img.hover\r\n{\r\n\tbackground-position: -1212px -0px;\r\n}\r\n\r\n.contactsNewCategoryItemLabel\r\n{\r\n\tcolor: #000000;\r\n\tpadding: 2px 5px 2px 5px;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/address/EditContactDialog.css"),widgetsInTemplate:true,contactDialog:null,closeCB:null,postCreate:function(){
if(_1.render.html.moz){
var _bf=_1.html.getMarginBox(this.createGroupInput.domNode).width+_1.html.getMarginBox(this.newButton).width+5;
_1.html.setStyle(this.itemContainer,"width",_bf+"px");
_1.html.setClass(this.newButton,"newButtonImgFF");
_1.html.setStyle(this.createGroupInput.textbox,"position","fixed");
}
ws.widget.WSMenuItem.superclass.postCreate.apply(this,arguments);
},initializeText:function(){
this.createGroupInput.setValue();
this.createGroupInput.textbox.focus();
},setCaption:function(_c0){
this.labelNode.innerHTML=_c0;
},_onClick:function(evt){
_1.debug("click");
evt.stopPropagation();
},_onKeyPress:function(evt){
evt.stopPropagation();
if(evt.keyCode==evt.KEY_ENTER){
this.displayNewCategory();
}else{
if(evt.keyCode==evt.KEY_ESCAPE){
this.closeCB();
}
}
},displayNewCategory:function(){
this.contactDialog.displayNewCategory(this.createGroupInput.getValue());
},onHoverButton:function(){
if(!_1.html.hasClass(this.newButton,"hover")){
_1.html.replaceClass(this.newButton,"hover","unHover");
}
},onUnhoverButton:function(){
if(!_1.html.hasClass(this.newButton,"unHover")){
_1.html.replaceClass(this.newButton,"unHover","hover");
}
}});
_1.provide("ws.address.ImportContactsWidget");
_1.require("dojo.widget.*");
_1.require("dojo.widget.ContentPane");
_1.require("dojo.widget.LayoutContainer");
_1.require("ws.widget.OkCancelDialog");
_1.require("ws.widget.util");
_1.require("ws.widget.WSButton");
_1.require("ws.widget.WSToolbar");
_1.require("ws.io");
_1.widget.defineWidget("ws.address.ImportContactsWidget",_1.widget.HtmlWidget,{widgetsInTemplate:true,templateString:"<div>\r\n\t<div dojoType=\"dojo:LayoutContainer\" class=\"importContacts\" style=\"height: 100%; width: 100%;\">\r\n\t\t<div dojoType=\"ws:WSToolbar\" layoutAlign=\"top\">\r\n\t\t\t<div toolbarPosition=\"right\" dojoType=\"dojo:ContentPane\" class=\"closeButtonPane\">\r\n\t\t\t\t<img src=\"${spacer}\" class=\"closeButton\" dojoAttachEvent=\"onClick: cancel\">\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div dojoType=\"dojo:ContentPane\" layoutAlign=\"client\" class=\"page\">\r\n\t\t\t<div class=\"heading\">${AB_Import_ContactsImport}</div>\r\n\t\t\t\r\n\t\t\t<!--\r\n\t\t\t<div dojoAttachPoint=\"PlaxoDiv\">\r\n\t\t\t\t<span dojoAttachPoint=\"PlaxoTitle\" class=\"title\">${AB_Import_Plaxo_Title}</span>\r\n\t\t\t\t<span dojoAttachPoint=\"PlaxoComment\" class=\"comment\">${AB_Import_Plaxo_Text1}</span>\r\n\t\t\t\t<div dojoType=\"ws:WSButton\" vizType=\"Blue\" dojoAttachEvent=\"onClick: openPlaxo\">${AB_Import_Plaxo_ButtonLabel}</div>\r\n\t\t\t</div>\r\n\t\t\t-->\r\n\r\n\t\t\t<div dojoAttachPoint=\"ImportAssistantDiv\" class=\"sectionTop\">\r\n\t\t\t\t<div dojoAttachPoint=\"ImportAssistantTitle\" class=\"title\">\r\n\t\t\t\t\t<span class=\"titleMain\">${AB_Import_Assistant_Title}</span>\r\n\t\t\t\t\t<span class=\"titleMinor\">${AB_Import_Assistant_TitleInfo}</span>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div dojoAttachPoint=\"ImportAssistantComment\" class=\"comment\">${AB_Import_Assistant_Text1}</div>\r\n\t\t\t\t<div dojoType=\"ws:WSButton\" vizType=\"Blue\" dojoAttachEvent=\"onClick: downloadOutlookAssistant\">${AB_Import_Assistant_ButtonLabel}</div>\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t<div dojoAttachPoint=\"ImportFileDiv\" class=\"sectionBottom\">\r\n\t\t\t\t<div dojoAttachPoint=\"ImportAssistantTitle\" class=\"title\">\r\n\t\t\t\t\t<span class=\"titleMain\">${AB_Import_File_Title}</span>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div dojoAttachPoint=\"ImportAssistantComment\" class=\"comment\">${AB_Import_File_Text1}</div>\r\n\t\t\t\r\n\t\t\t\t<table>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td align=\"right\">${AB_Import_File}:</td>\r\n\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t<form method=\"post\" enctype=\"multipart/form-data\" dojoAttachPoint=\"fileUploadForm\">\r\n\t\t\t\t\t\t\t\t<input style=\"width:300px\" type=\"file\" dojoAttachEvent=\"onChange: onFileInputChanged\" dojoAttachPoint=\"fileInputNode\" name=\"${this.widgetId}file\">\r\n\t\t\t\t\t\t\t</form>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td align=\"right\">${FileType}:</td>\r\n\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t<input type=\"radio\" name=\"${this.widgetId}type\" id=\"${this.widgetId}typecsv\" checked dojoAttachPoint=\"csvInputNode\">\r\n\t\t\t\t\t\t\t<label for=\"${this.widgetId}typecsv\">${CommaSeparated}</label>\r\n\t\t\t\t\t\t\t<input type=\"radio\" name=\"${this.widgetId}type\" id=\"${this.widgetId}typetxt\" dojoAttachPoint=\"txtInputNode\">\r\n\t\t\t\t\t\t\t<label for=\"${this.widgetId}typetxt\">${TabDelimited}</label>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td></td>\r\n\t\t\t\t\t\t<td><div dojoType=\"ws:WSButton\" vizType=\"Blue\" dojoAttachEvent=\"onClick: importFromFile\">${Import}</div></td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t</table>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n",templateCssString:".importContacts .closeButtonPane\r\n{\r\n\tpadding-top: 4px;\r\n\tpadding-right: 9px;\r\n}\r\n\r\n.importContacts .closeButtonPane .closeButton\r\n{\r\n\twidth: 16px;\r\n\theight: 16px;\r\n\tcursor: pointer;\r\n\tbackground: url(\"${images}main.gif\") -1347px -1px;\r\n}\r\n\r\n.importContacts .closeButtonPane .closeButton:hover\r\n{\r\n\tbackground-position: -1368px -1px;\r\n}\r\n\r\n.importContacts .page \r\n{\r\n\tpadding: 10px 20px 10px 20px;\t\r\n}\r\n\r\n.importContacts .heading\r\n{\r\n\tfont-weight: bold;\r\n\tfont-size: 24px;\r\n\tpadding-bottom: 20px;\r\n}\r\n\r\n.importContacts .title\r\n{\r\n\tpadding-bottom: 10px;\r\n}\r\n\r\n.importContacts .titleMain\r\n{\r\n\tfont-weight: bold;\r\n\tfont-size: 18px;\t\r\n}\r\n\r\n.importContacts .titleMinor\r\n{\r\n\tfont-weight: bold;\r\n\tfont-size: 16px;\t\r\n}\r\n\r\n.importContacts .comment\r\n{\r\n\tfont-size: 12px;\r\n\tpadding-bottom: 10px;\r\n}\r\n\r\n.importContacts .sectionTop\r\n{\r\n\tpadding: 5px 10px 15px 10px;\r\n\tborder-bottom: solid 1px #999999;\r\n}\r\n\r\n.importContacts .sectionMiddle\r\n{\r\n\tpadding: 15px 10px 15px 10px;\r\n\tborder-bottom: solid 1px #999999;\r\n}\r\n\r\n.importContacts .sectionBottom\r\n{\r\n\tpadding: 15px 10px 15px 10px;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/address/ImportContactsWidget.css"),addressModel:null,closeCB:null,postCreate:function(_c3,_c4){
if(!Config.EnableAddressBookImportAssistant||_1.string.isBlank(Config.ImportAssistantDownloadURL)){
_1.html.hide(this.ImportAssistantDiv);
}
},openEasyTransfer:function(){
var hw=ws.io.openWindow(Config.AOLEasyTransferURL,"","");
if(hw!=null){
hw.focus();
}
},downloadOutlookAssistant:function(){
var hw=ws.io.openWindow(Config.ImportAssistantDownloadURL,"","");
if(hw!=null){
hw.focus();
}
},onFileInputChanged:function(){
var _c7=this.fileInputNode.value;
var _c8=_c7.lastIndexOf(".");
if(_c8!=-1){
var ext=_c7.substring(_c8+1).toLowerCase();
if(ext=="csv"){
this.csvInputNode.checked=true;
}else{
if(ext=="txt"){
this.txtInputNode.checked=true;
}
}
}
},importFromFile:function(){
if(_1.string.isBlank(this.fileInputNode.value)){
ws.widget.OkCancelDialog.alert(Config.Strings.ErrorSelectFile);
return;
}
this.addressModel.importContacts({formNode:this.fileUploadForm,format:this.csvInputNode.checked?"csv":"txt",load:_1.lang.hitch(this,function(_ca){
ws.widget.OkCancelDialog.alert(ws.string.substituteParams(Config.Strings.ContactsImported,_ca.count),_1.lang.hitch(this,"cancel"));
}),error:function(err){
ws.widget.OkCancelDialog.alert(_1.string.isBlank(err)?Config.Strings.ErrorImportingContacts:err);
}});
},cancel:function(){
if(this.closeCB){
this.closeCB();
}
}});
_1.provide("ws.address.AddressListView");
_1.require("dojo.widget.*");
_1.require("dojo.widget.ContentPane");
_1.require("dojo.widget.PageContainer");
_1.require("ws.address.PresenceHoverCard");
_1.require("ws.presence");
_1.require("ws.reporting");
_1.require("ws.widget.ListView");
_1.require("ws.widget.util");
_1.require("ws.widget.WSButton");
_1.require("ws.widget.WSLayoutContainer");
_1.require("ws.widget.WSMenu");
_1.require("ws.widget.WSToolbar");
_1.require("ws.address.AddressBookUtil");
_1.declare("ws.address.AddressGridModel",turbo.data.virtual,function(_cc,_cd){
this.model=_cd;
_1.event.connect(this.model,"modelUpdated",this,"modelUpdated");
_1.event.connect(this.model,"change",this,"change");
},{columns:{Select:0,Icon:1,Name:2,Email:3,Phone:4},sortByMap:{3:"LastFirstNick",4:"PreferredEmail",5:"PreferredPhone"},modelUpdated:function(){
},get:function(row,col){
var _d0=this.model.getRow(row);
if(_d0==null){
return Config.Strings.ContactError;
}
switch(col){
case this.columns.Select:
return this.model.isSelected(_d0.uid)?"ON":"OFF";
case this.columns.Name:
return this.getNameColumnCB?this.getNameColumnCB(row,_d0):"";
case this.columns.Icon:
return this.getBuddyIcon(_d0);
case this.columns.Email:
if(_d0.bType=="c"){
var _d1=[];
if(_d0.screenName){
_d1.push("<span style=\"color: #000000;\">"+_1.string.escapeXml(_d0.screenName)+"</span>");
}
if(_d0.email1){
if(_d1.length){
_d1.push("<span style=\"color: #adaaa6;\">"+_1.string.escapeXml(_d0.email1)+"</span>");
}else{
_d1.push("<span style=\"color: #000000;\">"+_1.string.escapeXml(_d0.email1)+"</span>");
}
}
if(_d0.email2){
if(_d1.length){
_d1.push("<span style=\"color: #adaaa6;\">"+_1.string.escapeXml(_d0.email2)+"</span>");
}else{
_d1.push("<span style=\"color: #000000;\">"+_1.string.escapeXml(_d0.email2)+"</span>");
}
}
return (_d1.join(", "));
}else{
if(_d0.bType=="d"){
var _d2=(_d0.count==1)?Config.Strings.OneAddress:ws.string.substituteParams(Config.Strings.NAddresses,_d0.count);
return ws.string.substituteParams("{0} - {1}",_d2,_1.string.escapeXml(_d0.composeValue));
}else{
if(_d0.bType=="s"){
return _1.string.escapeXml(_d0.composeValue);
}
}
}
case this.columns.Phone:
return this.buildPhoneString(_d0);
default:
return "Invalid Column";
}
},getRow:function(row){
var _d4=this.model.getRow(row);
if(_d4==null){
return ["",Config.Strings.ContactError,"","","",""];
}
var _d5=this.model.isSelected(_d4.uid)?"ON":"OFF";
var _d6=this.getBuddyIcon(_d4);
var _d7=this.getNameColumnCB?this.getNameColumnCB(row,_d4):"";
var _d8="";
if(_d4.bType=="c"){
var _d9=[];
if(_d4.screenName){
_d9.push("<span style=\"color: #000000;\">"+_1.string.escapeXml(_d4.screenName)+"</span>");
}
if(_d4.email1){
if(_d9.length){
_d9.push("<span style=\"color: #adaaa6;\">"+_1.string.escapeXml(_d4.email1)+"</span>");
}else{
_d9.push("<span style=\"color: #000000;\">"+_1.string.escapeXml(_d4.email1)+"</span>");
}
}
if(_d4.email2){
if(_d9.length){
_d9.push("<span style=\"color: #adaaa6;\">"+_1.string.escapeXml(_d4.email2)+"</span>");
}else{
_d9.push("<span style=\"color: #000000;\">"+_1.string.escapeXml(_d4.email2)+"</span>");
}
}
_d8=_d9.join(", ");
}else{
if(_d4.bType=="d"){
var _da=(_d4.count==1)?Config.Strings.OneAddress:ws.string.substituteParams(Config.Strings.NAddresses,_d4.count);
_d8=ws.string.substituteParams("{0} - {1}",_da,_1.string.escapeXml(_d4.composeValue));
}else{
if(_d4.bType=="s"){
_d8=_1.string.escapeXml(_d4.composeValue);
}
}
}
var _db=this.buildPhoneString(_d4);
var row=[];
var i=0;
for(var x in this.columns){
switch(i){
case this.columns.Select:
row[i]=_d5;
break;
case this.columns.Icon:
row[i]=_d6;
break;
case this.columns.Name:
row[i]=_d7;
break;
case this.columns.Email:
row[i]=_d8;
break;
case this.columns.Phone:
row[i]=_db;
break;
}
i++;
}
return row;
},getBuddyIcon:function(_de){
var url=Config.SpacerImageURL;
if(_de.bType=="d"){
return ws.string.substituteParams("<img align='absmiddle' src=\"{0}\" class=\"distListBuddyIcon\">",url);
}else{
if(Config.ShowPresenceInfoOnAddressList){
url=ws.presence.getBuddyIconUrl(_de,true)||Config.SpacerImageURL;
}
if(url==Config.SpacerImageURL){
return ws.string.substituteParams("<img align='absmiddle' src=\"{0}\" class=\"noBuddyIcon\">",url);
}else{
return ws.string.substituteParams("<img style=\"display: none;\" onload=\"dojo.html.show(this);\" class=\"buddyIcon\" width=32 height=32 align='absmiddle' src=\"{0}\" border=\"1px solid #85817c\">",url);
}
}
},getRowCount:function(){
return this.model.getRowCount();
},buildPhoneString:function(_e0){
var _e1="";
var _e2="";
if(_e0.phone1Type&&_e0.phone1){
_e1=_e0.phone1;
_e2=_e0.phone1Type;
}else{
if(_e0.phone2Type&&_e0.phone2){
_e1=_e0.phone2;
_e2=_e0.phone2Type;
}else{
if(_e0.phone3Type&&_e0.phone3){
_e1=_e0.phone3;
_e2=_e0.phone3Type;
}else{
if(_e0.phone4Type&&_e0.phone4){
_e1=_e0.phone4;
_e2=_e0.phone4Type;
}else{
if(_e0.phone5Type&&_e0.phone5){
_e1=_e0.phone5;
_e2=_e0.phone5Type;
}else{
return "";
}
}
}
}
}
var _e3=new String();
switch(_e2){
case "Cellular":
_e3=Config.Strings.Cellular+" ";
break;
case "Fax":
_e3=Config.Strings.Fax+" ";
break;
case "Home":
_e3=Config.Strings.Home+" ";
break;
case "Pager":
_e3=Config.Strings.Pager+" ";
break;
case "Work":
_e3=Config.Strings.Work+" ";
break;
default:
break;
}
_e3+=(_e1)?_1.string.escapeXml(_e1):"";
return _e3;
},getSortColumnIndex:function(_e4){
var _e5="";
switch(_e4){
case this.columns.Name:
_e5="LastFirstNick";
break;
case this.columns.Email:
_e5="PreferredEmail";
break;
}
return _e5;
},canSort:function(){
return true;
},sort:function(_e6,_e7){
var _e8=this.getSortColumnIndex(Math.abs(_e6)-1);
_1.debug("ALV sort index: "+_e8);
var _e9=_e6<0?"Descending":"Ascending";
this.model.core.sortData(_e8,_e9);
}});
_1.widget.defineWidget("ws.address.AddressListView",ws.widget.ListView,{templateString:"<div>\r\n\t<div class=\"addressListView\" dojoType=\"dojo:PageContainer\" dojoAttachPoint=\"pageContainer\" style=\"height: 100%; width: 100%;\">\r\n\t\t<div class=\"listView addressListView\" dojoType=\"ws:WSLayoutContainer\" deferred=\"true\" dojoAttachPoint=\"mainView\">\r\n\t\t\t<div dojoType=\"ws:WSToolbar\" layoutAlign=\"top\" dojoAttachPoint=\"contactsToolbar\">\r\n\t\t\t\t<div toolbarPosition=\"left\" dojoType=\"ws:WSDropDownButton\" border=\"right\" dojoAttachPoint=\"newButton\">${New}</div>\r\n\t\t\t\t<div dojoType=\"ws:WSMenu\" dojoAttachPoint=\"newMenu\">\r\n\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${NewContact}\" dojoAttachEvent=\"onClick: newContact\"></div>\r\n\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${NewList}\" dojoAttachEvent=\"onClick: newDistributionList\"></div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div toolbarPosition=\"left\" dojoType=\"ws:WSButton\" border=\"right\" dojoAttachEvent=\"onClick: deleteSelection\" dojoAttachPoint=\"deleteButton\">${DeleteButton}</div>\r\n\t\t\t\t<div toolbarPosition=\"left\" dojoType=\"ws:WSButton\" border=\"right\" dojoAttachEvent=\"onClick: importContacts\" dojoAttachPoint=\"importButton\">${Import}</div>\r\n\t\t\t\t<div border=\"right\" dojoattachpoint=\"printButton\" dojotype=\"ws:WSDropDownButton\" toolbarposition=\"left\">${PrintButton}</div>\r\n\t\t\t\t<div dojoType=\"ws:WSMenu\" dojoAttachPoint=\"printMenu\">\r\n\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${SelectedContacts}\" dojoAttachPoint=\"printSelectedMenuItem\" dojoAttachEvent=\"onClick: PrintSelectedContacts\"></div>\r\n\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${CurrentContacts}\" dojoAttachEvent=\"onClick: PrintCurrentCategory\"></div>\r\n\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${AllContacts}\" dojoAttachEvent=\"onClick: PrintAllContacts\"></div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div toolbarPosition=\"left\" dojoType=\"ws:WSButton\" border=\"right\" dojoAttachEvent=\"onClick: LocateOnMap\" dojoAttachPoint=\"mapButton\">${LocateOnMapButton}</div>\r\n\t\t\t\t<div toolbarPosition=\"left\" dojoType=\"dojo:ContentPane\" style=\"margin-top:1px;\">\r\n\t\t\t\t\t<div class=\"searchInputDiv\">\r\n\t\t\t\t\t\t<span><input class=\"wsInput searchInput\" dojoAttachPoint=\"searchInput\" dojoAttachEvent=\"onkeyup: search; onclick: searchInputClick\" /></span>\r\n\t\t\t\t\t\t<img src=\"${spacer}\" dojoAttachPoint=\"clearSearchButton\" class=\"clearSearchImg\" dojoAttachEvent=\"onClick: clearSearch\" style=\"display: none;\">\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div toolbarPosition=\"right\" dojoType=\"ws:WSDropDownLink\" dojoAttachPoint=\"filterButton\" className=\"filterLink\"></div>\r\n\t\t\t\t<div dojoType=\"ws:WSMenu\" dojoAttachPoint=\"filterMenu\"></div>\r\n\t\t\t</div>\r\n\t\t\t<div dojoType=\"dojo:ContentPane\" dojoAttachPoint=\"searchInfoPane\" class=\"searchInfo\" layoutAlign=\"top\" style=\"display: none;\">\r\n\t\t\t\t<span dojoAttachPoint=\"searchResultsNode\"></span>\r\n\t\t\t</div>\r\n\t\t\t<div dojoAttachPoint=\"grid\" dojoType=\"TurboDataGrid\" layoutAlign=\"client\" defaultLeftWidth=\"0\"></div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n",templateCssString:".addressListView span.contactName\r\n{\r\n\tfloat: left;\r\n\tcolor: #000000;\r\n}\r\n\r\n.addressListView span.editHover\r\n{\r\n\tfloat: right;\r\n\tcolor: #0066CC;\r\n\tfont-size: 9px;\r\n}\r\n\r\n.addressListView span.editHover:hover\r\n{\r\n\ttext-decoration: underline;\r\n}\r\n\r\n.addressListView .composeHoverContacts\r\n{\r\n\tbackground-position: -0px -0px;\r\n\tfloat: right;\r\n\twidth: 16px;\r\n\theight: 16px;\r\n}\r\n.addressListView .composeHoverContacts:hover{ background-position: -30px -0px; }\r\n\r\n.addressListView .trashHoverContacts\r\n{\r\n\tbackground-position: -375px -0px;\r\n\tfloat: right;\r\n\tmargin-right: 2px;\r\n}\r\n.addressListView .trashHoverContacts:hover{ background-position: -360px -0px; }\r\n\r\n.addressListView .searchInputDiv\r\n{\r\n\twidth: 138px;\r\n\tpadding-left: 6px;\r\n\tmargin: 3px 15px;\r\n\tborder: solid 1px #85817c;\r\n\tbackground-color: #FFF;\r\n}\r\n.addressListView .searchInput\r\n{\r\n\t\r\n\tfont: normal 11px verdana;\r\n\tvertical-align: middle;\r\n\tborder: none;\r\n\twidth: 116px;\r\n\tpadding-top: 2px;\r\n\tpadding-bottom: 2px;\r\n}\r\n\r\n.addressListView .nickNameInputNew\r\n{\r\n\tcolor: #a5a5a5;\r\n}\r\n\r\n.addressListView .filterLink {\r\n\tpadding: 7px 15px 0px 0px;\r\n}\r\n.addressListView .filterLink .wsLink {\r\n\tcolor: #000000;\r\n\tfont-size: 11px;\r\n}\r\n\r\n.addressListView .searchInfo {\r\n\tbackground-color: #c4f198;\r\n\tpadding: 5px 15px;\r\n\tborder-bottom: 1px solid #d8d6d3;\r\n\tcolor: #0066CC;\r\n}\r\n\r\n.addressListView .distListBuddyIcon\r\n{\r\n\tbackground: url(\"${images}main.gif\") -0px -30px;\r\n\tborder: 1px solid #85817c;\r\n\twidth: 32px;\r\n\theight: 32px;\r\n}\r\n\r\n.addressListView .noBuddyIcon\r\n{\r\n\tbackground: url(\"${images}main.gif\") -44px -30px;\r\n\tborder: 1px solid #85817c;\r\n\twidth: 32px;\r\n\theight: 32px;\r\n}\r\n\r\n.addressListView .clearSearchImg\r\n{\r\n\tposition: absolute;\r\n\tz-index: 1000;\r\n\twidth: 10px;\r\n\theight: 10px;\r\n\tmargin-top: 5px;\r\n\tmargin-left: 2px;\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tbackground-position: -959px -2px;\r\n\tcursor: pointer;\r\n}\r\n.addressListView .clearSearchImgFF { margin-top: 4px; margin-left: 6px; }\r\n.addressListView .clearSearchImg:hover { background-position: -973px -2px; }\r\n\r\n\r\n.addressListView .turbogrid-header-sort-up \r\n{\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tbackground-position: right -96px;\r\n\tbackground-color:  #e4edfa !important;\r\n\theight: 16px;\r\n\tpadding: 4px 0px 2px 3px;\r\n\tmargin: 0px 0px 0px 0px;\r\n}\r\n\r\n.addressListView .turbogrid-header-sort-down \r\n{\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tbackground-position: right -111px;\r\n\tbackground-color:  #e4edfa !important;\r\n\theight: 16px;\r\n\tpadding: 4px 0px 2px 3px;\r\n\tmargin: 0px 0px 0px 0px;\r\n}\r\n\r\n.addressListView .turbogrid-header-sort-none \r\n{\r\n\tbackground-color: Transparent !important;\r\n\theight: 16px;\r\n\tpadding: 4px 0px 2px 3px;\r\n\tmargin: 0px 0px 0px 0px;\r\n}\r\n\r\n.addressListView .turbogrid-header-cell \r\n{\r\n\tpadding: 0px 0px 0px 0px !important;\r\n\tmargin: 0px 0px 0px 0px !important;\r\n}\r\n\r\n\r\n.addressListView .turbogrid-header-col \r\n{\r\n\tpadding: 0px 0px 0px 0px !important;\r\n\tmargin: 0px 0px 0px 0px !important;\r\n}\r\n\r\n/*\r\n * Presence hover card.\r\n */\r\n.buddyHoverCard\r\n{\r\n\tmargin-top: 1px;\r\n\tmargin-left: 3px;\r\n\tbackground-color: #FFFFFF;\r\n\tborder: 1px solid #5A5753;\r\n\tposition: absolute;\r\n\tcursor: pointer;\r\n\tpadding: 2px 7px 5px 3px;\r\n}\r\n\r\n.buddyHoverCardIE\r\n{\r\n\tmargin-top: 1px;\r\n\tmargin-left: 3px;\r\n\tbackground-color: #FFFFFF;\r\n\tborder: 1px solid #5A5753;\r\n\tposition: absolute;\r\n\tcursor: pointer;\r\n\tpadding: 4px 7px 4px 3px;\t\r\n}\r\n\r\n.buddyHoverCard span.nameSpan\r\n{\r\n\tposition: relative;\r\n\ttop: 2px;\r\n\tmargin-left: 8px;\r\n}\r\n\r\n.buddyHoverCardIE span.nameSpanIE\r\n{\r\n\tposition: relative;\r\n\ttop: 2px;\r\n\tmargin-left: 8px;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/address/AddressListView.css"),wrapperModelClass:ws.address.AddressGridModel,speedUp:true,rowHeight:38,backToString:Config.Strings.BackToAddressList,searchString:"",reportingTab:"Addresses",reportingScrollName:"Scroll Contacts",editContactWidget:null,importContactsWidget:null,distributionListWidget:null,columnDefaults:{Select:{order:0,width:18,hidden:false},Icon:{order:1,width:44,hidden:false},Name:{order:2,width:300,hidden:false},Email:{order:3,width:278,hidden:false},Phone:{order:4,width:136,hidden:false}},initView:function(){
this.initColumns();
ws.address.AddressListView.superclass.initView.apply(this,arguments);
this.gridModel.getNameColumnCB=_1.lang.hitch(this,"getNameColumn");
_1.html.addClass(this.searchInput,"nickNameInputNew");
this.searchInput.value=Config.Strings.FindContacts;
this.initButtons();
this.filterButton.setLabel("<b>"+Config.Strings.Show+":</b> "+Config.Strings.All);
this.buildFilterDropDownMenu();
_1.event.connect(this.model,"modelUpdated",this,"modelUpdated");
_1.event.connect(ws.WebSuite,"processKeyPress",this,"onKeyPress");
this.presenceHoverCard=_1.widget.createWidget("ws:PresenceHoverCard",{parentNode:this.grid.domNode,getDisplayNameAndPresenceTag:_1.lang.hitch(this,function(_ea){
var _eb=_1.html.getAttribute(_ea.parentNode.parentNode,"rowindex");
var _ec=this.model.getRow(_eb);
var _ed=ws.presence.getPresenceIcon(_ec);
var _ee=_ec.firstName?_ec.firstName:"";
_ee+=_ec.lastName?(" "+_ec.lastName):"";
if(_1.string.isBlank(_ee)){
var _ee=ws.presence.getScreenNameForContact(_ec);
}
var _ef=ws.presence.getScreenNameForContact(_ec);
return {"presenceIconHtmlTag":_ed,"displayName":_ee,"screenName":_ef};
})},_1.body(),"first");
if(!Config.EnableABImportButton){
this.importButton.hide();
}
this.mapButton.hide();
if(_1.render.html.moz){
_1.html.addClass(this.clearSearchButton,"clearSearchImgFF");
}
this.grid.docontextmenu=_1.lang.hitch(this,"onContextMenu");
},initColumns:function(_f0){
this.columns=[];
var _f1=this.gridModel.columns;
var _f2=_1.json.evalJson(Settings.AddressListPrefs);
if(_f0||!_f2||_f2==""||_f2===Settings.AddressListPrefs){
_f2=this.columnDefaults;
}
try{
_f1.Select=_f2.Select.order;
_f1.Icon=_f2.Icon.order;
_f1.Name=_f2.Name.order;
_f1.Email=_f2.Email.order;
_f1.Phone=_f2.Phone.order;
var _f3={Select:"<img src='"+Config.SpacerImageURL+"' class='gridIcon ckoffCol' />",Icon:" ",Name:Config.Strings.Name,Email:ws.string.substituteParams("<span style=\"padding-left: 9px;\">{0}</span>",Config.Strings.Email),Phone:ws.string.substituteParams("<span style=\"padding-left: 9px;\">{0}</span>",Config.Strings.Phone)};
var _f4=["padding-top: 10px;","padding-top: 1px; padding-bottom: 11px;","color: #0265CA; font-weight: 500; font-size: 12px; padding-top: 9px;","color: #000000; font-weight: 500; font-size: 12px; padding-top: 9px; padding-left: 9px;","color: #000000; font-weight: 500; font-size: 12px; padding-top: 9px; padding-left: 9px;"];
var _f5=["padding-top: 10px;","padding-top: 1px; padding-bottom: 6px;","color: #0265CA; font-weight: 500; font-size: 12px; padding-top: 9px;","color: #000000; font-weight: 500; font-size: 12px; padding-top: 9px; padding-left: 9px;","color: #000000; font-weight: 500; font-size: 12px; padding-top: 9px; padding-left: 9px;"];
this.columns[_f1.Select]=[turbo.grid.columns.sprite,{caption:_f3.Select,align:"center",width:_f2.Select.width,hidden:_f2.Select.hidden,sprites:this.baseSprites.chkBox,canResize:false,sortable:false,colStyle:(_1.render.html.ie)?_f4[0]:_f5[0]}],this.columns[_f1.Icon]=[turbo.grid.columns.text,{caption:_f3.Icon,align:"center",width:_f2.Icon.width,hidden:_f2.Icon.hidden,canResize:false,sortable:false,colStyle:(_1.render.html.ie)?_f4[1]:_f5[1]}],this.columns[_f1.Name]=[turbo.grid.format.text,{caption:_f3.Name,align:"left",width:_f2.Name.width,hidden:_f2.Name.hidden,canResize:true,sortable:true,colStyle:(_1.render.html.ie)?_f4[2]:_f5[2]}],this.columns[_f1.Email]=[turbo.grid.format.text,{caption:_f3.Email,align:"left",width:_f2.Email.width,hidden:_f2.Email.hidden,canResize:true,sortable:true,colStyle:(_1.render.html.ie)?_f4[3]:_f5[3]}],this.columns[_f1.Phone]=[turbo.grid.format.text,{caption:_f3.Phone,align:"left",width:_f2.Phone.width,hidden:_f2.Phone.hidden,canResize:true,sortable:false,colStyle:(_1.render.html.ie)?_f4[4]:_f5[4]}];
this.columnMenuSpec=[{caption:Config.Strings.ColumnBuddy,checked:false,onClick:ws.lang.hitch(this,"toggleColumn",_f1.Icon)},{caption:Config.Strings.Name,checked:false,onClick:ws.lang.hitch(this,"toggleColumn",_f1.Name)},{caption:Config.Strings.Email,checked:false,onClick:ws.lang.hitch(this,"toggleColumn",_f1.Email)},{caption:Config.Strings.Phone,checked:false,onClick:ws.lang.hitch(this,"toggleColumn",_f1.Phone)},{separator:true},{caption:Config.Strings.ColumnReset,onClick:ws.lang.hitch(this,"toggleColumn","RESET")}];
this.autosizeColumnIndex=_f1.Email;
}
catch(e){
if(!_f0){
this.initColumns(true);
}
_1.debug("Error initializing address list columns.");
}
},onHeaderColumnChange:function(){
var _f6={};
for(var i=0;i<this.grid.columns.count();i++){
var _f8=this.gridModel.columns;
var col=this.grid.columns.get(i);
var _fa={order:i,width:col.width,hidden:col.hidden};
switch(col.key){
case _f8.Select:
_f6.Select=_fa;
break;
case _f8.Icon:
_f6.Icon=_fa;
break;
case _f8.Name:
_f6.Name=_fa;
break;
case _f8.Email:
_f6.Email=_fa;
break;
case _f8.Phone:
_f6.Phone=_fa;
break;
}
}
this.saveGridPrefs({AddressListPrefs:_f6});
},onHeaderContextMenu:function(e){
_1.event.browser.stopEvent(e);
var i=this.gridModel.columns;
var _fd=this.columnMenuSpec;
_fd[0].checked=!this.columns[i.Icon][1].hidden;
_fd[1].checked=!this.columns[i.Name][1].hidden;
_fd[2].checked=!this.columns[i.Email][1].hidden;
_fd[3].checked=!this.columns[i.Phone][1].hidden;
var _fd=ws.widget.createMenu(_fd);
if(_fd.isShowingNow){
_fd.close();
}
_fd.open(e.pageX,e.pageY,null,[]);
},toggleColumn:function(_fe,_ff){
if(_fe=="RESET"){
this.initColumns(true);
}else{
this.columns[_fe][1].width=this.grid.header.columns.get(_fe).width;
if(typeof (_ff)=="undefined"){
var _ff=!this.columns[_fe][1].hidden;
}
this.columns[_fe][1].hidden=_ff;
}
this.grid.setColumns(this.columns);
this.onHeaderColumnChange();
this.autosizeColumnWidth=0;
this.updateGrid();
},modelUpdated:function(){
this.buildFilterDropDownMenu();
this.layout();
},_refreshView:function(){
if(this.pageContainer.selectedChildWidget==this.mainView){
this.mainView.onResized();
}
},initButtons:function(){
this.newButton.menu=this.newMenu;
this.printButton.menu=this.printMenu;
},getNameColumn:function(row,_101){
var _102="<span class=\"contactName\">"+_1.string.escapeXml(_101.name)+"</span>";
if(row==this.grid.over.row){
_102+="<div class=\"hoverControl composeHoverContacts\"></div>";
_102+="<div class=\"hoverControl trashHoverContacts\"></div>";
_102+=ws.string.substituteParams("<span class=\"editHover\">{0}</span>",Config.Strings.Edit);
}
return _102;
},searchInputClick:function(evt){
if(_1.html.hasClass(this.searchInput,"nickNameInputNew")){
this.searchInput.value="";
_1.html.removeClass(this.searchInput,"nickNameInputNew");
}
},clearSearch:function(){
this.searchInput.value="";
this.search();
},positionClearSearch:function(show){
if(show){
_1.html.show(this.clearSearchButton);
}else{
_1.html.hide(this.clearSearchButton);
}
},updateSearchInfo:function(){
if(this.model.currentTextSearch&&!_1.string.isBlank(this.model.currentTextSearch)){
if(this.model.currentCategorySearch&&!_1.string.isBlank(this.model.currentCategorySearch)){
this.searchString=ws.string.substituteParams(Config.Strings.ContactSearchHeaderCat,this.model.filteredIndex.offsets.length,this.model.currentTextSearch,this.translateCategoryName(this.model.getCurrentCategorySearchString()));
}else{
this.searchString=ws.string.substituteParams(Config.Strings.ContactSearchHeader,this.model.filteredIndex.offsets.length,this.model.currentTextSearch);
}
this.searchResultsNode.innerHTML=this.searchString;
this.searchInfoPane.show();
}else{
this.searchInfoPane.hide();
this.searchString="";
}
this._refreshView();
},GetRequestParamsForPrint:function(_105){
var args={};
args.sortBy=this.model.core.sortBy;
args.sortDir=this.model.core.sortDirection;
args.nameFormat=Settings.AddressNameDisplayFormat;
args.categoryFilter=this.model.getCurrentCategorySearchString();
return ws.address.AddressBookUtil.GetRequestParamsForPrint(_105,args);
},PrintSelectedContacts:function(){
var _107=this.model.getSelectedUids();
if(_107.length==0){
ws.widget.OkCancelDialog.alert(Config.Strings.NoContactsCheckedErrorMsg);
return;
}
var _108="selected";
var _109="";
var rows=this.model.getRowsForUids(_107);
for(var i=0;i<_107.length;i++){
var _10c=this.model.getRow(rows[i]);
if((_10c!=null)&&((_10c.bType=="c")||(_10c.bType=="d"))){
_109+=_107[i]+",";
}
}
if(_1.string.isBlank(_109)){
ws.widget.OkCancelDialog.alert(Config.Strings.NoContactsCheckedErrorMsg);
return;
}
_109=_109.substring(0,_109.length-1);
var _10d="command="+_108+"&"+this.GetRequestParamsForPrint(_108)+"&uidList="+_109;
ws.address.AddressBookUtil.OpenAddressPrintWindow(_10d);
},LocateOnMap:function(){
var _10e=Settings.AddressNameDisplayFormat;
var _10f=this.model.getSelectedUids();
if(_10f.length==0){
ws.widget.OkCancelDialog.alert(Config.Strings.NoContactsCheckedErrorMsg);
return;
}
var _110="selected";
var _111="";
var rows=this.model.getRowsForUids(_10f);
for(var i=0;i<_10f.length;i++){
var _114=this.model.getRow(rows[i]);
if((_114!=null)&&(_114.bType=="c")&&_114.addressMap!=0){
_111+=_10f[i]+",";
}
}
if(_1.string.isBlank(_111)){
ws.widget.OkCancelDialog.alert(Config.Strings.ContactsDontHaveProperAddresses);
return;
}
_111=_111.substring(0,_111.length-1);
var _115="command="+_110+"&uidList="+_111+"&nameFormat="+_10e+"&version="+VERSION;
ws.address.AddressBookUtil.OpenLocateOnMapWindow(_115);
},PrintCurrentCategory:function(){
var _116="category";
var _117="command="+_116+"&"+this.GetRequestParamsForPrint(_116);
ws.address.AddressBookUtil.OpenAddressPrintWindow(_117);
},PrintAllContacts:function(){
var _118="all";
var _119="command="+_118+"&"+this.GetRequestParamsForPrint(_118);
ws.address.AddressBookUtil.OpenAddressPrintWindow(_119);
},buildFilterDropDownMenu:function(){
_1.debug("buildFilterDropDownMenu()");
var _11a=this.model.getCurrentCategorySearchString();
if(_11a){
this.filterButton.setLabel("<b>"+Config.Strings.Show+":</b> "+this.translateCategoryName(_11a));
this.contactsToolbar.onResized();
}else{
if(typeof (_11a)=="undefined"){
this.model.categoryFilter("");
this.filterButton.setLabel("<b>"+Config.Strings.Show+":</b> "+Config.Strings.All);
this.contactsToolbar.onResized();
return;
}
}
if(!this.model.getCategories()){
_1.debug("No categories in model!");
return;
}
var i=null;
var _11c=new Array();
_1.lang.forEach(this.model.getCategories(),_1.lang.hitch(this,function(_11d){
_11c.push(_11d);
}));
this.filterButton.menu=this.filterMenu;
while(this.filterMenu.children.length){
this.filterMenu.removeChild(this.filterMenu.children[0]);
}
this.filterItemAll=_1.widget.createWidget("ws:WSMenuItem",{caption:Config.Strings.All});
this.filterMenu.addChild(this.filterItemAll);
this.filterItemAll.onClick=ws.lang.hitch(this,"handleFilter",this.filterItemAll);
for(var i=0;i<_11c.length;i++){
this["filterItem"+i]=_1.widget.createWidget("ws:WSMenuItem",{caption:this.translateCategoryName(_11c[i])});
this["filterItem"+i].value=_11c[i];
this.filterMenu.addChild(this["filterItem"+i]);
this["filterItem"+i].onClick=ws.lang.hitch(this,"handleFilter",this["filterItem"+i]);
}
this.updateSearchInfo();
},translateCategoryName:function(name){
var _11f=24;
if((name=="Co-Workers")||(name=="Friends")||(name=="Family")||(name=="General")||(name=="Auto-Added")||(name=="Uncategorized")){
var _120="Config.Strings.ABCat"+name.replace("-","");
return eval(_120);
}else{
return _1.string.summary(_1.string.escapeXml(name),_11f);
}
},handleFilter:function(_121){
this.filterButton.setLabel("<b>"+Config.Strings.Show+":</b> "+_121.caption);
this.contactsToolbar.onResized();
var temp=new Array();
var cats=this.model.getCategories();
for(var i=0;i<cats.length;i++){
temp[cats[i]]=i;
}
if(_121.caption==Config.Strings.All){
this.model.categoryFilter("");
}else{
this.model.categoryFilter(temp[_121.value]);
}
ws.reporting.report("Filter Contacts","Addresses");
},handleNameClick:function(e,_126){
if(_1.html.hasClass(e.target,"trashHoverContacts")){
var _126=this.model.getRow(e.rowIndex);
this.deleteSingle(e.rowIndex,_126.bType);
}else{
if(_1.html.hasClass(e.target,"composeHoverContacts")){
var info=this.model.getRow(e.rowIndex);
var _128="";
if(info.bType=="c"){
_128=info.screenName||info.email1||info.email2||"";
}else{
if(info.bType=="d"){
_128=info.composeValue||"";
}else{
return;
}
}
this.getComposeCB(_1.lang.hitch(this,function(_129){
_129.reset({to:_128,backToString:this.backToString,isDirty:true});
}));
}else{
if(_1.html.hasClass(e.target,"editHover")){
var _126=this.model.getRow(e.rowIndex);
if(_126.bType=="c"){
_1.event.topic.publish("WSFeedbackStart",Config.Strings.Loading);
this.model.getContact({uid:_126.uid,load:_1.lang.hitch(this,function(data){
this.editContact(_126.uid,data,true,true);
}),error:function(err){
ws.widget.OkCancelDialog.alert(_1.string.isBlank(err)?Config.Strings.ErrorLoadingContact:err);
_1.event.topic.publish("WSFeedbackEnd",Config.Strings.Loading);
this.close();
}});
}else{
if(_126.bType=="d"){
_1.debug("distributionList");
this.editDistributionList(_126.uid);
}else{
if(_126.bType=="s"){
_1.debug("s");
this.sharedGroup(_126.name);
}
}
}
}else{
if(_126.bType=="c"){
this.showContactDetails(_126);
}else{
if(_126.bType=="d"){
this.editDistributionList(_126.uid);
}else{
if(_126.bType=="s"){
this.sharedGroup(_126.name);
}
}
}
}
}
}
},onCellOver:function(_12c,_12d,_12e){
if(!this.grid.columns.get(this.gridModel.columns.Name).hidden){
this.grid.updateCell(_12d,this.keyToColIndex(this.gridModel.columns.Name));
}
},onCellOut:function(_12f,_130,_131){
if(!this.grid.columns.get(this.gridModel.columns.Name).hidden){
this.grid.updateCell(_12f,this.keyToColIndex(this.gridModel.columns.Name));
}
},selectView:function(_132,_133){
var _134={"contactDetails":["ws:ContactDetails","View Contact"],"editContactWidget":["ws:EditContactDialog","Edit Contact"],"importContactsWidget":["ws:ImportContactsWidget","Import Contacts"],"distributionListWidget":["ws:DistributionListWidget",null]};
if(!this[_132]){
var _135=_134[_132][0];
var _136={addressModel:this.model,closeCB:(_132=="editContactWidget")?ws.lang.hitch(this,"selectView","contactDetails"):_1.lang.hitch(this,"backToList")};
if(_132=="editContactWidget"){
_136.backToListCB=_1.lang.hitch(this,"backToList");
}
_136.cancelCB=_1.lang.hitch(this,"editContactCancel");
this[_132]=_1.widget.createWidget(_135,_136);
if((_132=="contactDetails")||(_132=="distributionListWidget")){
_1.event.connect(this[_132],"composeEmailCB",this,"getComposeCB");
if(_132=="contactDetails"){
_1.event.connect(this[_132],"editContact",this,"editContact");
}
}
if(_132=="editContactWidget"){
_1.event.connect(this[_132],"savedCB",_1.lang.hitch(this,function(data){
if(this.contactDetails){
this.contactDetails.showCreatedContact(data);
this.selectView("contactDetails");
}else{
this.selectView("contactDetails");
this.contactDetails.showCreatedContact(data);
}
}));
}
this.pageContainer.addChild(this[_132]);
}
if(_133){
return;
}
this.pageContainer.selectChild(this[_132]);
if(_134[_132][1]){
ws.reporting.report(_134[_132][1],"Addresses");
}
},deleteSelection:function(){
ws.widget.OkCancelDialog.alert(Config.Strings.DeleteContactsConfirmationPlural,_1.lang.hitch(this,function(_138){
if(_138){
var _139=this.model.getSelectedUids().length;
this.model.deleteAddresses({uids:this.model.getSelectedUids(),load:_1.lang.hitch(this,function(args){
if(args.isSuccess){
if(_139==1){
_1.event.topic.publish("WSFeedbackStart",Config.Strings.ContactDeletedSingular,true);
}else{
_1.event.topic.publish("WSFeedbackStart",ws.string.substituteParams(Config.Strings.ContactDeletedPlural,_139),true);
}
}
}),error:function(err){
ws.widget.OkCancelDialog.alert(_1.string.isBlank(err)?Config.Strings.ErrorDeletingContactNotFound:err);
}});
}
}),true);
},deleteSingle:function(row,_13d){
var _13e=Config.Strings.DeleteContactsGeneric;
var _13f=Config.Strings.ContactsGenericDeleted;
if(_13d=="c"){
_13e=Config.Strings.DeleteContactsConfirmationSingular;
_13f=Config.Strings.ContactDeletedSingular;
}else{
if(_13d=="d"){
_13e=Config.Strings.DeleteDistributionList;
_13f=Config.Strings.DistributionListDeletedSingular;
}else{
if(_13d=="s"){
_13e=Config.Strings.DeleteSharedGroup;
_13f=Config.Strings.SharedGroupDeleted;
}
}
}
ws.widget.OkCancelDialog.alert(_13e,_1.lang.hitch(this,function(_140){
if(_140){
this.model.deleteAddresses({rows:[row],load:function(args){
if(args.isSuccess){
_1.event.topic.publish("WSFeedbackStart",_13f,true);
}
},error:function(err){
ws.widget.OkCancelDialog.alert(_1.string.isBlank(err)?Config.Strings.ErrorDeletingContactNotFound:err);
}});
}
}),true);
},search:function(){
if(_1.string.isBlank(this.searchInput.value)){
this.positionClearSearch(false);
}else{
this.positionClearSearch(true);
}
this.model.search(this.searchInput.value);
},getZeroRowsMessage:function(){
if(!_1.string.isBlank(this.model.currentTextSearch)){
return Config.Strings.NoMatchesFound;
}else{
return Config.Strings.AddressBookEmpty;
}
},getErrorMessage:function(){
return Config.Strings.ErrorLoadingAddressBook;
},handleCellClick:function(e){
var _144=this.model.getRow(e.rowIndex);
if(e.colIndex==2){
this.handleNameClick(e,_144);
}else{
if(_144.bType=="c"&&e.colIndex!=1){
this.showContactDetails(_144);
}else{
if(_144.bType=="c"&&e.colIndex==1){
_1.debug("IM");
var SN=ws.presence.getScreenNameForContact(_144);
if(SN){
ws.presence.launchIM(SN);
}
}else{
if(_144.bType=="d"){
this.editDistributionList(_144.uid);
}else{
if(_144.bType=="s"){
this.sharedGroup(_144.name);
}
}
}
}
}
},onContextMenu:function(evt){
var _147=this.getRightClickMenu();
if(_147.isShowingNow){
_147.close();
}
this.rightClickMenu.rowIndex=evt.rowIndex;
this.rightClickMenu.contact=this.model.getRow(this.rightClickMenu.rowIndex);
if(!this.rightClickMenu.contact){
return;
}
var _148=this.rightClickMenu.contact;
var _149=(_148.screenName||_148.email1||_148.email2||_148.composeValue);
var _14a=(this.rightClickMenu.contact.screenName!=null);
this.rightClickMenu.children[3].setDisabled(!_149);
this.rightClickMenu.children[4].setDisabled(!_14a);
_147.open(evt.pageX,evt.pageY,null,[]);
evt.preventDefault();
evt.stopPropagation();
},getRightClickMenu:function(){
if(!this.rightClickMenu){
var _14b=[{caption:Config.Strings.Edit,onClick:ws.lang.hitch(this,"editContactFromMenu")},{caption:Config.Strings.Delete,onClick:ws.lang.hitch(this,"deleteContactFromMenu")},{separator:true},{caption:Config.Strings.SendEmail,onClick:ws.lang.hitch(this,"sendEmail")},{caption:Config.Strings.SendIM,onClick:ws.lang.hitch(this,"sendIM")},{separator:true},{caption:Config.Strings.NewContact,onClick:ws.lang.hitch(this,"newContact")},{caption:Config.Strings.NewDistList,onClick:ws.lang.hitch(this,"newDistributionList")}];
this.rightClickMenu=ws.widget.createMenu(_14b);
}
return this.rightClickMenu;
},deleteContactFromMenu:function(){
this.deleteSingle(this.rightClickMenu.rowIndex,this.rightClickMenu.contact.bType);
},sendIM:function(){
if(this.rightClickMenu.contact.screenName){
ws.presence.launchIM(this.rightClickMenu.contact.screenName);
}
},editContactFromMenu:function(){
var _14c=this.rightClickMenu.contact;
if(_14c.bType=="c"){
this.model.getContact({uid:_14c.uid,load:_1.lang.hitch(this,function(data){
ws.WebSuite.editContact(_14c.uid,data,true);
}),error:function(err){
ws.widget.OkCancelDialog.alert(_1.string.isBlank(err)?Config.Strings.ErrorLoadingContact:err);
this.close();
}});
}else{
if(_14c.bType=="d"){
ws.WebSuite.editDistributionList(_14c.uid);
}else{
if(_14c.bType=="s"){
ws.WebSuite.sharedGroup(_14c.name);
}
}
}
},sendEmail:function(){
var _14f=this.rightClickMenu.contact;
var _150=(_14f.screenName||_14f.email1||_14f.email2||_14f.composeValue);
if(_150){
ws.WebSuite.getCompose(null,function(_151){
_151.reset({to:_150,backToString:"setFolder"});
});
}
},showContactDetails:function(_152){
_1.event.topic.publish("WSFeedbackStart",Config.Strings.Loading);
_1.lang.setTimeout(this,function(){
if(this.contactDetails){
this.contactDetails.showContact(_152.uid,this.searchString,_1.lang.hitch(this,function(){
this.selectView("contactDetails");
this.contactDetails.detailsContainer.onResized();
}));
}else{
this.selectView("contactDetails");
this.contactDetails.showContact(_152.uid,this.searchString);
this.contactDetails.detailsContainer.onResized();
}
},0);
},updateToolbarState:function(){
var _153=this.model.getSelectedUids().length>0;
ws.widget.setEnabled(this.deleteButton,_153);
ws.widget.setEnabled(this.mapButton,_153);
ws.widget.setEnabled(this.printSelectedMenuItem,_153);
},newContact:function(){
this.editContact(null,null,true);
},editContact:function(uid,data,_156,_157){
var _158=false;
if(this.editContactWidget){
this.editContactWidget.showContact(uid,data,((_156)?_156:false));
this.selectView("editContactWidget");
}else{
_158=true;
if(_157){
this.selectView("editContactWidget");
this.editContactWidget.showContact(uid,data,((_156)?_156:false));
}else{
_1.event.topic.publish("WSFeedbackStart",Config.Strings.Loading);
_1.lang.setTimeout(this,function(){
this.selectView("editContactWidget");
this.editContactWidget.showContact(uid,data,((_156)?_156:false));
},0);
}
}
if(_158||_157){
_1.lang.setTimeout(function(){
_1.event.topic.publish("WSFeedbackEnd",Config.Strings.Loading);
},0);
}
},newDistributionList:function(){
if(this.distributionListWidget){
this.selectView("distributionListWidget");
this.distributionListWidget.showCreateView();
}else{
_1.event.topic.publish("WSFeedbackStart",Config.Strings.Loading);
_1.lang.setTimeout(this,function(){
this.selectView("distributionListWidget");
this.distributionListWidget.showCreateView();
_1.event.topic.publish("WSFeedbackEnd",Config.Strings.Loading);
},0);
}
},createEditContactWidget:function(){
this.selectView("editContactWidget",true);
},createDistributionList:function(){
this.selectView("distributionListWidget",true);
},editDistributionList:function(uid){
_1.event.topic.publish("WSFeedbackStart",Config.Strings.Loading);
_1.lang.setTimeout(this,function(){
this.selectView("distributionListWidget");
this.distributionListWidget.showList(uid);
},0);
},sharedGroup:function(name){
var url=ws.string.substituteParams(Config.SharedGroupEditURL,encodeURIComponent(name));
ws.io.openWindow(url);
},importContacts:function(){
this.selectView("importContactsWidget");
},editContactCancel:function(_15c){
this.confirmClose(_15c);
},confirmClose:function(_15d){
if((this.editContactWidget)&&(this.pageContainer.selectedChildWidget==this.editContactWidget)&&(this.editContactWidget.isDirty())){
ws.widget.OkCancelDialog.alert(Config.Strings.ConfirmClose1+"<br><br>"+Config.Strings.ConfirmClose2+"<br>"+Config.Strings.ConfirmClose3,_1.lang.hitch(this,function(ok){
if(ok&&_15d){
_1.lang.setTimeout(_15d,0);
}
}),true);
}else{
if(_15d){
_15d();
}
}
},onKeyPress:function(evt){
if(this.pageContainer.selectedChildWidget==this.mainView){
this._onKeyPress(evt);
}
},onEnterKeyPress:function(){
if(this.grid.lastOverCell){
var _160=this.model.getRow(this.grid.over.row);
if(_160.bType=="c"){
this.showContactDetails(_160);
}else{
if(_160.bType=="d"){
this.editDistributionList(_160.uid);
}else{
if(_160.bType=="s"){
this.sharedGroup(_160.name);
}
}
}
}
},onDelKeyPress:function(){
if(this.grid.lastOverCell){
var row=this.grid.over.row;
var _162=this.model.getRow(row);
this.deleteSingle(row,_162.bType);
}
},onOtherKeyPress:function(evt){
if(Config.EnableKeyboardShortcuts&&evt.key&&_1.lang.isString(evt.key)&&!(evt.ctrlKey||evt.altKey||evt.metaKey)){
switch(evt.key.toLowerCase()){
case Config.Strings.KeyNewContact:
this.newContact();
break;
}
}
},backToList:function(){
this.pageContainer.selectChild(this.mainView);
this.gridModel.modelUpdated();
this.buildFilterDropDownMenu();
this.layout();
ws.reporting.report("Contact List","Addresses");
}});
_1.provide("ws.settings.AccountSettings");
_1.require("dojo.html.*");
_1.require("ws.settings");
_1.widget.defineWidget("ws.settings.AccountSettings",_1.widget.HtmlWidget,{templateString:"<div class=\"settings page\">\r\n<h2 class=\"title\">${AccountsSettingsHead}</h2>\r\n<br />\r\n<table dojoAttachPoint=\"AOL\" class=\"settings content\" border=\"0\" cellpadding=\"5\" style=\"border-collapse: collapse\">\r\n\t<tbody>\r\n\t<tr>\r\n\t\t<td class=\"labelCell\">${Password}</td>\r\n\t\t<td class=\"valueCell\"><a id=\"ChangePasswordLink\" target=\"_blank\" href=\"#\">${PasswordText}</a></td>\r\n\t</tr>\r\n\t<tr dojoAttachPoint=\"lsnSep\" style=\"display:none\">\r\n\t\t<td colspan=\"2\" class=\"separator\"></td>\r\n\t</tr>\r\n\t<tr dojoAttachPoint=\"lsnNode\" style=\"display:none\">\r\n\t\t<td class=\"labelCell\">${LinkedAccountLabel}</td>\r\n\t\t<td class=\"valueCell\">${LinkedAccountDescription}&nbsp;<a id=\"ManageScreenNamesLink\" target=\"_blank\" href=\"#\">${LinkedAccountLink}</a></td>\r\n\t</tr>\r\n\t<tr dojoAttachPoint=\"eAddressSep\" style=\"display:none\">\r\n\t\t<td colspan=\"2\" class=\"separator\"></td>\r\n\t</tr>\r\n\t<tr dojoAttachPoint=\"eAddressNode\" style=\"display:none\">\r\n\t\t<td class=\"labelCell\">${MyEAddress}</td>\r\n\t\t<td class=\"valueCell\" dojoAttachPoint=\"MyEAddressText\"></td>\r\n\t</tr>\r\n\t<tr dojoAttachPoint=\"easyTransferSep\" style=\"display:none\">\r\n\t\t<td colspan=\"2\" class=\"separator\"></td>\r\n\t</tr>\r\n\t<tr dojoAttachPoint=\"easyTransferNode\" style=\"display:none\">\r\n\t\t<td class=\"labelCell\">${TransferAccounts}</td>\r\n\t\t<td class=\"valueCell\">\r\n\t\t\t<span>${EasyTransferText1}&nbsp;</span>\r\n\t\t\t<a dojoAttachPoint=\"easyTransferLink\" target=\"_blank\" href=\"#\">${EasyTransfer}&nbsp;</a>\r\n\t\t\t<span dojoAttachPoint=\"easyTransferSpan\"></span>\r\n\t\t</td>\r\n\t</tr>\r\n\t</tbody>\r\n</table>\r\n<table dojoAttachPoint=\"NEUF\" class=\"settings content\" border=\"0\" cellpadding=\"5\" style=\"border-collapse: collapse\">\r\n\t<tbody>\r\n\t<tr>\r\n\t\t<td class=\"labelCell\">${Password}</td>\r\n\t\t<td class=\"valueCell\"><a id=\"ChangePasswordLink9C\" target=\"_blank\" href=\"#\">${PasswordText}</a></td>\r\n\t</tr>\r\n\t<tr>\r\n\t\t<td colspan=\"2\" class=\"separator\"></td>\r\n\t</tr>\r\n\t<tr>\r\n\t\t<td class=\"labelCell\">Notification d'absence</td>\r\n\t\t<td class=\"valueCell\"><a id=\"VacationResponseLink\" target=\"_blank\" href=\"#\">G&eacute;rer vos absences</a></td>\r\n\t</tr>\r\n\t<tr>\r\n\t\t<td colspan=\"2\" class=\"separator\"></td>\r\n\t</tr>\r\n\t<tr>\r\n\t\t<td class=\"labelCell\">Filtre de messagerie</td>\r\n\t\t<td class=\"valueCell\"><a id=\"MessageFilterLink\" target=\"_blank\" href=\"#\">G&eacute;rer vos filtres</a></td>\r\n\t</tr>\r\n\t</tbody>\r\n</table>\r\n</div>\r\n",templateCssString:".accountSettings\r\n{\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/settings/AccountSettings.css"),widgetsInTemplate:false,isDirty:function(){
return false;
},showAccountSetting:function(){
_1.html.hide(this.AOL);
_1.html.hide(this.NEUF);
switch(Config.UIVariant){
case "NEUF":
case "CEGETEL":
_1.html.show(this.NEUF);
break;
default:
_1.html.show(this.AOL);
}
},init:function(){
switch(Config.UIVariant){
case "NEUF":
case "CEGETEL":
var _164=ws.UserContext.UserScreenName;
this.ChangePasswordLink9C.href=Config.ChangePasswordUrl;
this.VacationResponseLink.href=Config.VacationResponseUrl+_164;
this.MessageFilterLink.href=Config.MessageFilterUrl+_164;
break;
default:
this.ChangePasswordLink.href=Config.ChangePasswordUrl;
this.ManageScreenNamesLink.href=Config.ManageScreenNamesUrl;
var text,_166,_167;
if(Config.UIVariant=="AOLPD"){
_166="<a href='"+Config.PDRegUrl+"' target='_blank'>"+Config.Strings.MyEAddressPDLink1+"</a>";
_167="<a href='"+Config.PDControlPanelUrl+"' target='_blank'>"+Config.Strings.MyEAddressPDLink2+"</a>";
text=ws.string.substituteParams(Config.Strings.MyEAddressPDText,_166,_167);
}else{
_166="<a href='"+Config.PDRegUrl+"' target='_blank'>"+Config.Strings.MyEAddressLink1+"</a>";
_167="<a href='"+Config.PDControlPanelUrl+"' target='_blank'>"+Config.Strings.MyEAddressLink2+"</a>";
text=ws.string.substituteParams(Config.Strings.MyEAddressText,_166,_167);
}
this.MyEAddressText.innerHTML=text;
if(ws.settings.enableLinkedScreenName){
_1.html.show(this.lsnNode);
_1.html.show(this.lsnSep);
}else{
_1.html.hide(this.lsnNode);
_1.html.hide(this.lsnSep);
}
if(Config.ShowPDOptions){
_1.html.show(this.eAddressNode);
_1.html.show(this.eAddressSep);
}else{
_1.html.hide(this.eAddressNode);
_1.html.hide(this.eAddressSep);
}
if(Config.ShowEasyTransfer){
_1.html.show(this.easyTransferSep);
_1.html.show(this.easyTransferNode);
this.easyTransferLink.href=Config.EasyTransferUrl;
this.easyTransferSpan.innerHTML=ws.string.substituteParams(Config.Strings.EasyTransferText2,Config.Strings.ProductName);
}else{
_1.html.hide(this.easyTransferSep);
_1.html.hide(this.easyTransferNode);
}
}
this.showAccountSetting();
}});
_1.provide("ws.settings.CalendarSettings");
_1.require("dojo.widget.*");
_1.require("ws.string");
_1.require("ws.widget.WSSelect");
_1.widget.defineWidget("ws.settings.CalendarSettings",_1.widget.HtmlWidget,{templateString:"<div class=\"settings page calendarSettings\">\r\n\t<h2 class=\"title\">${CalendarSettingsTitle}</h2>\r\n\t<br />\r\n\t<table class=\"settings content\" border=\"0\" cellpadding=\"5\" style=\"border-collapse: collapse\" dojoattachevent=\"onClick: onChange\">\r\n\t\t<tbody>\r\n\t\t\t<tr>\r\n\t\t\t\t<td class=\"labelCell\">\r\n\t\t\t\t\t${CalendarDefaultViewLabel}\r\n\t\t\t\t</td>\r\n\t\t\t\t<td class=\"valueCell\">\r\n\t\t\t\t\t<ul dojotype=\"ws:WSSelect\" dojoattachpoint=\"viewSelect\" dojoattachevent=\"valueChanged: onChange\" className=\"viewSelect\" size=\"byValue\">\r\n\t\t\t\t\t\t<li value=\"Month\" selected=\"true\">${CalendarMonth}</li>\r\n\t\t\t\t\t\t<li value=\"Week\" selected=\"true\">${CalendarWeek}</li>\r\n\t\t\t\t\t\t<li value=\"Day\" selected=\"true\">${CalendarDay}</li>\r\n\t\t\t\t\t</ul>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td colspan=\"2\" class=\"separator\"></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td class=\"labelCell\">\r\n\t\t\t\t\t${CalendarTimeZoneLabel}\r\n\t\t\t\t</td>\r\n\t\t\t\t<td class=\"valueCell\">\r\n\t\t\t\t\t<ul dojotype=\"ws:WSSelect\" dojoattachpoint=\"timezoneSelect\" dojoattachevent=\"valueChanged: onChange\" className=\"timezoneSelect\" size=\"byValue\">\r\n\t\t\t\t\t</ul>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td colspan=\"2\" class=\"separator\"></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td class=\"labelCell\">\r\n\t\t\t\t\t${CalendarDisplayLabel}\r\n\t\t\t\t</td>\r\n\t\t\t\t<td class=\"valueCell\">\r\n\t\t\t\t\t${CalendarDisplayValue1} <ul dojotype=\"ws:WSSelect\" dojoattachpoint=\"dayStartSelect\" dojoattachevent=\"valueChanged: onChange\" className=\"daySelect\" size=\"byValue\"></ul>\r\n\t\t\t\t\t${CalendarDisplayValue2} <ul dojotype=\"ws:WSSelect\" dojoattachpoint=\"dayEndSelect\" dojoattachevent=\"valueChanged: onChange\" className=\"daySelect\" size=\"byValue\"></ul>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr dojoattachpoint=\"reminderSettingSep\">\r\n\t\t\t\t<td colspan=\"2\" class=\"separator\"></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr dojoattachpoint=\"reminderSetting\">\r\n\t\t\t\t<td class=\"labelCell\">${CalendarReminderLabel}</td>\r\n\t\t\t\t<td class=\"valueCell\"><a id=\"ReminderPrefsLink\" target=\"_blank\" href=\"#\">${CalendarReminderLink}</a> ${CalendarReminderValue}</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr dojoattachpoint=\"publicCalendarSettingSep\">\r\n\t\t\t\t<td colspan=\"2\" class=\"separator\"></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr dojoattachpoint=\"publicCalendarSetting\">\r\n\t\t\t\t<td class=\"labelCell\">${CalendarPublicLabel}</td>\r\n\t\t\t\t<td class=\"valueCell\">${CalendarPublicValue}<br /><a id=\"PublicCalendarLink\" target=\"_blank\" href=\"#\">${CalendarPublicLink}</a></td>\r\n\t\t\t</tr>\r\n\t\t</tbody>\r\n\t</table>\r\n</div> \r\n",templateCssString:".calendarSettings .daySelect\r\n{\r\n\tdisplay: inline;\r\n\tpadding-right: 20px;\r\n}\r\n\r\n.settings .calendarSettings .labelCell\r\n{\r\n\twidth: 80px;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/settings/CalendarSettings.css"),widgetsInTemplate:true,initialStateHash:"",hasChanged:false,onChangeCallback:null,isDirty:function(){
if(!this.hasChanged){
this.hasChanged=this.initialStateHash!=this.getCurrentStateHash();
}
return this.hasChanged;
},init:function(){
this.ReminderPrefsLink.href=Config.AlertsHostURL+Config.ReminderPrefsURL;
this.PublicCalendarLink.href=Config.EventDirectoryURL;
for(var i in this.viewSelect.options){
if(this.viewSelect.options[i].value==Settings.CalendarViewType){
this.viewSelect.setOption(i);
}
}
var _169=[];
_1.lang.forEach(Settings.CalendarTimeZoneList,function(tz){
var _16b=(tz.id==Settings.CalendarTimeZone);
_169.push({display:tz.disp,value:tz.id,selected:_16b});
});
if(_169.length>0){
this.timezoneSelect.setOptions(_169);
}
var _16c=new Date();
_169=[];
for(var i=0;i<24;i++){
var _16d=i*60;
var _16e=(Settings.CalendarDayStart==_16d);
var _16f=new Date(_16c.getFullYear(),_16c.getMonth(),_16c.getDate(),i,0);
var _170=ws.date.formatDateTime(_16f,Config.Strings.CalTimeFormat);
_169.push({display:_170,value:_16d.toString(),selected:_16e});
}
this.dayStartSelect.setOptions(_169);
for(var i=0;i<24;i++){
var _16d=i*60;
var _16e=(Settings.CalendarDayEnd==_16d);
_169[i].selected=_16e;
}
this.dayEndSelect.setOptions(_169);
this.hasChanged=false;
this.initialStateHash=this.getCurrentStateHash();
if(!Config.EnableCalendarDirectoryURL||!Config.EventDirectoryURL){
_1.html.hide(this.publicCalendarSettingSep);
_1.html.hide(this.publicCalendarSetting);
}
if(!Config.ShowReminderEvent){
_1.html.hide(this.reminderSettingSep);
_1.html.hide(this.reminderSetting);
}
},getCurrentStateHash:function(){
return ""+this.viewSelect.currentValue+this.timezoneSelect.currentValue+this.dayStartSelect.currentValue+this.dayEndSelect.currentValue+"";
},getRpcData:function(){
return {action:"CalendarSettings",content:{CalendarDayStart:parseInt(this.dayStartSelect.currentValue),CalendarDayEnd:parseInt(this.dayEndSelect.currentValue),CalendarTimeZone:this.timezoneSelect.currentValue,CalendarViewType:this.viewSelect.currentValue},load:_1.lang.hitch(this,function(data){
_1.debug("Calendar settings saved successfully");
_1.event.topic.publish("SettingsChanged/Calendar");
}),error:_1.lang.hitch(this,function(data){
_1.debug("Error saving Calendar settings");
})};
},onSaveSettings:function(){
this.hasChanged=false;
this.initialStateHash=this.getCurrentStateHash();
},onCancelSettings:function(){
this.init();
},onChange:function(){
if(this.onChangeCallback){
this.onChangeCallback();
}
}});
_1.provide("ws.settings.ChatSettings");
_1.require("dojo.html.*");
_1.require("dojo.widget.*");
_1.require("ws.widget.WSSelect");
_1.widget.defineWidget("ws.settings.ChatSettings",_1.widget.HtmlWidget,{templateString:"<div class=\"settings page chatSettings\">\r\n\t<h2 class=\"title\">${ChatSettingsHead}</h2>\r\n\t<br />\r\n\t<table class=\"settings content\" border=\"0\" cellpadding=\"5\" style=\"border-collapse: collapse\" dojoattachevent=\"onClick: onChange\">\r\n\t\t<tbody>\r\n\t\t\t<tr>\r\n\t\t\t\t<td class=\"labelCell\">\r\n\t\t\t\t\t${ChatSelectLabel}\r\n\t\t\t\t</td>\r\n\t\t\t\t<td class=\"valueCell\">\r\n\t\t\t\t\t<ul dojotype=\"ws:WSSelect\" dojoattachpoint=\"chatSelect\" dojoattachevent=\"valueChanged: onChange\">\r\n\t\t\t\t\t\t<!-- li value=\"None\">${ChatSelect1}</li -->\r\n\t\t\t\t\t\t<li value=\"Ae\" selected=\"true\">${ChatSelect2}</li>\r\n\t\t\t\t\t\t<li value=\"Aim\">${ChatSelect3}</li>\r\n\t\t\t\t\t</ul>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t</tbody>\r\n\t</table>\r\n</div>\r\n",templateCssString:".settings .chatSettings .valueCell\r\n{\r\n\twidth: 85%;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/settings/ChatSettings.css"),widgetsInTemplate:true,initialStateHash:"",hasChanged:false,onChangeCallback:null,isDirty:function(){
if(!this.hasChanged){
this.hasChanged=(this.initialStateHash!=this.getCurrentStateHash());
}
return this.hasChanged;
},init:function(){
for(var i in this.chatSelect.options){
if(this.chatSelect.options[i].value==Settings.IMSending){
this.chatSelect.setOption(i);
}
}
this.hasChanged=false;
this.initialStateHash=this.getCurrentStateHash();
},getCurrentStateHash:function(){
return ""+this.chatSelect.currentValue+"";
},getRpcData:function(){
return {action:"ChatSettings",content:{PresenceChoice:this.chatSelect.currentValue},load:_1.lang.hitch(this,function(data){
_1.debug("Chat Settings Saved Successfully");
}),error:_1.lang.hitch(this,function(data){
_1.debug("Error saving Calendar settings");
ws.widget.OkCancelDialog.alert(_1.string.isBlank(data)?Config.Strings.ServerErrorChangesNotSaved:data);
})};
},onSaveSettings:function(){
this.hasChanged=false;
this.initialStateHash=this.getCurrentStateHash();
_1.event.topic.publish("SettingsChanged/Chat");
},onCancelSettings:function(){
this.init();
},onChange:function(){
if(this.onChangeCallback){
this.onChangeCallback();
}
}});
_1.provide("ws.settings.ComposeSettings");
_1.require("dojo.html.*");
_1.require("dojo.string.*");
_1.require("dojo.widget.*");
_1.require("ws.browser");
_1.require("ws.widget.DefaultTextbox");
_1.require("ws.widget.DefaultTextarea");
_1.require("ws.widget.WSSelect");
_1.widget.defineWidget("ws.settings.ComposeSettings",_1.widget.HtmlWidget,{templateString:"<div class=\"settings page composeSettings\">\r\n<h2 class=\"title\">${ComposeSettingsHead}</h2>\r\n<br />\r\n<table class=\"settings content\" border=\"0\" cellpadding=\"5\" style=\"border-collapse: collapse\" dojoattachevent=\"onClick: onChange\">\r\n\t<tbody>\r\n\t<tr>\r\n\t\t<td class=\"labelCell\">${ComposeSettingsCompose}<br />\r\n\t\t<div class=\"tipText\">${ComposeSettingsComposeTip}</div></td>\r\n\t\t<td class=\"valueCell\">\r\n\t\t\t<input dojoAttachPoint=\"ShowCcField\" type=\"checkbox\" />&nbsp; ${ComposeSettingsComposeOption2}<br />\r\n\t\t\t<input dojoAttachPoint=\"ShowBccField\" type=\"checkbox\" />&nbsp; ${ComposeSettingsComposeOption3}<br />\r\n\t\t\t<span dojoAttachPoint=\"richTextSpan\" ><input dojoAttachPoint=\"UseRichEditor\" type=\"checkbox\" />&nbsp; ${ComposeSettingsComposeOption4}</span></td>\r\n\t</tr>\r\n\t<tr>\r\n\t\t<td colspan=\"2\" class=\"separator\"></td>\r\n\t</tr>\r\n\t<tr>\r\n\t\t<td class=\"labelCell\">${Signature}</td>\r\n\t\t<td class=\"valueCell\"><ul dojoType=\"ws:WSSelect\" dojoattachevent=\"valueChanged: onSignatureSelectChange; valueChanged: onChange\" dojoAttachPoint=\"SignatureSelect\" size=\"byValue\">\r\n\t\t\t\t\t<li value=\"1\">${SignatureOption1}</li>\r\n\t\t\t\t\t<li value=\"2\" selected=\"true\">${SignatureOption2}</li>\r\n\t\t</ul>\r\n\t\t<div dojoType=\"ws:DefaultTextarea\" dojoAttachPoint=\"SignatureTextarea\" defaultValue=\"${SignatureText}\" value=\"${SignatureText}\" dojoattachevent=\"onChange: onChange\"></div>\r\n\t\t<br />\r\n\t\t<div dojoAttachPoint=\"AddPresenceDiv\"><input dojoAttachPoint=\"AddPresenceSignature\" type=\"checkbox\" />&nbsp; ${SignatureOption3}&nbsp;&nbsp;<a class=\"tipText\" target=\"_blank\" dojoAttachPoint=\"MakeBuddyIconLink\" href=\"#\">${SignatureLink}</a></div>\r\n\t\t</td>\r\n\t</tr>\r\n\t<tr>\r\n\t\t<td colspan=\"2\" class=\"separator\"></td>\r\n\t</tr>\r\n\t<tr>\r\n\t\t<td class=\"labelCell\">${FromDisplayNameTitle}</td>\r\n\t\t<td class=\"valueCell\">\r\n\t\t\t<div dojoType=\"ws:DefaultTextbox\" dojoAttachPoint=\"FromDisplayNameField\" defaultValue=\"${FromDisplayNameDefault}\" size=\"30\" dojoattachevent=\"onChange: onChange\"></div>\r\n\t\t\t<div class=\"fromDisplayNameText\">${FromDisplayNameDescription}</div>\r\n\t\t</td>\r\n\t</tr>\r\n\t<tr>\r\n\t\t<td colspan=\"2\" class=\"separator\"></td>\r\n\t</tr>\r\n\t<tr>\r\n\t\t<td class=\"labelCell\">${OutboundCharset}<br />&nbsp;<a class=\"tipText\" href=\"#\" style=\"display:none\">${WhatIsOutboundCharset}</a></td>\r\n\t\t<td class=\"valueCell\">\r\n\t\t\t\t<ul dojoType=\"ws:WSSelect\" dojoAttachPoint=\"CharsetSelect\" dojoattachevent=\"valueChanged: onChange\" size=\"byValue\">\r\n\t\t\t\t\t<li value=\"0\" selected=\"true\">${UTF-8}</li>\r\n\t\t\t\t\t<li value=\"1\">${ISO-8859-1}</li>\r\n\t\t\t\t\t<li value=\"2\">${ISO-8859-2}</li>\r\n\t\t\t\t\t<li value=\"3\">${ISO-8859-15}</li>\r\n\t\t\t\t\t<li value=\"4\">${GB2312}</li>\r\n\t\t\t\t\t<li value=\"5\">${GB18030}</li>\r\n\t\t\t\t\t<li value=\"6\">${Big5}</li>\r\n\t\t\t\t\t<li value=\"7\">${ISO-2022-JP}</li>\r\n\t\t\t\t\t<li value=\"8\">${EUC-KR}</li>\r\n\t\t\t</ul>\r\n\t\t</td>\r\n\t</tr>\r\n\t<tr>\r\n\t\t<td colspan=\"2\" class=\"separator\"></td>\r\n\t</tr>\r\n\t<tr>\r\n\t\t<td class=\"labelCell\">${ComposeSettingsSending}</td>\r\n\t\t<td class=\"valueCell\"><div dojoAttachPoint=\"SpellCheckBeforeSendRow\"><input dojoAttachPoint=\"SpellCheckBeforeSend\" type=\"checkbox\" />&nbsp; ${ComposeSettingsSendingOption1}<br /></div>\r\n\t\t    <input dojoAttachPoint=\"AutoAddOnSend\" type=\"checkbox\" />&nbsp; ${ComposeSettingsSendingOption2}</td>\r\n\t</tr>\r\n</tbody>\r\n</table>\r\n</div>\r\n",templateCssString:".settings .composeSettings .valueCell\r\n{\r\n\twidth: 75%;\r\n}\r\n\r\n.composeSettings .signatureText\r\n{\r\n\tcolor: #000000;\r\n\tfont: normal 12px Arial;\r\n\tmargin: 0px 0px 0px 4px;\r\n\theight: 60px;\r\n\tpadding: 2px;\r\n}\r\n\r\n.composeSettings .fromDisplayNameText\r\n{\r\n\tmargin: 2px;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/settings/ComposeSettings.css"),widgetsInTemplate:true,initialStateHash:"",hasChanged:false,onChangeCallback:null,availableCharsets:["UTF-8","ISO-8859-1","ISO-8859-2","ISO-8859-15","GB2312","GB18030","Big5","ISO-2022-JP","EUC-KR"],isDirty:function(){
if(!this.hasChanged){
this.hasChanged=(this.initialStateHash!=this.getCurrentStateHash());
}
return this.hasChanged;
},init:function(){
this.ShowCcField.checked=Settings.ShowCcField;
this.ShowBccField.checked=Settings.ShowBccField;
this.UseRichEditor.checked=Settings.UseRichEditor;
if(_1.render.html.safari||(_1.render.html.ie&&ws.browser.ns8)){
_1.html.hide(this.richTextSpan);
}
this.SpellCheckBeforeSend.checked=Settings.SpellCheckBeforeSend;
this.SignatureSelect.setOption((Settings.SignatureEnabled?1:0));
if(Settings.Signature!=""){
this.SignatureTextarea.setValue(Settings.Signature);
}
this.FromDisplayNameField.setValue(Settings.FromDisplayName);
for(var i=0;i<this.availableCharsets.length;i++){
if(this.availableCharsets[i]==Settings.OutboundCharset){
this.CharsetSelect.setOption(i);
}
}
this.AddPresenceSignature.checked=Settings.AddPresenceSignature;
this.AutoAddOnSend.checked=Settings.AutoAddOnSend;
if(_1.string.isBlank(Config.MakeBuddyIconUrl)){
_1.html.hide(this.MakeBuddyIconLink);
}else{
this.MakeBuddyIconLink.href=Config.MakeBuddyIconUrl;
}
if(!Config.EnableSpellCheck){
_1.html.hide(this.SpellCheckBeforeSendRow);
}
this.onSignatureSelectChange();
this.hasChanged=false;
this.initialStateHash=this.getCurrentStateHash();
},getCurrentStateHash:function(){
return ""+this.ShowCcField.checked+this.ShowBccField.checked+this.UseRichEditor.checked+this.SignatureSelect.currentValue+this.FromDisplayNameField.getValue()+this.CharsetSelect.currentValue+this.AddPresenceSignature.checked+this.SignatureTextarea.getValue()+this.SpellCheckBeforeSend.checked+this.AutoAddOnSend.checked+"";
},getRpcData:function(){
return {action:"ComposeSettings",content:{ShowCcField:this.ShowCcField.checked,ShowBccField:this.ShowBccField.checked,UseRichEditor:this.UseRichEditor.checked,SignatureEnabled:(this.SignatureSelect.currentValue=="2"),OutboundCharset:""+this.availableCharsets[this.CharsetSelect.currentValue]+"",FromDisplayName:this.FromDisplayNameField.getValue(),AddPresenceSignature:this.AddPresenceSignature.checked,Signature:(this.SignatureSelect.currentValue=="2"?this.SignatureTextarea.getValue():""),SpellCheckBeforeSend:this.SpellCheckBeforeSend.checked,AutoAddOnSend:this.AutoAddOnSend.checked},load:_1.lang.hitch(this,function(data){
_1.debug("Compose Settings: saved successfully");
}),error:_1.lang.hitch(this,function(data){
_1.debug("Error saving Calendar settings");
ws.widget.OkCancelDialog.alert(_1.string.isBlank(data)?Config.Strings.ServerErrorChangesNotSaved:data);
})};
},onSaveSettings:function(){
this.hasChanged=false;
this.initialStateHash=this.getCurrentStateHash();
_1.event.topic.publish("SettingsChanged/Compose");
},onCancelSettings:function(){
this.init();
},onChange:function(){
if(this.onChangeCallback){
this.onChangeCallback();
}
},onSignatureSelectChange:function(){
var show=(this.SignatureSelect.currentValue=="2");
_1.html.setShowing(this.SignatureTextarea.domNode,show);
_1.html.setShowing(this.AddPresenceDiv,show&&Config.EnableAddPresenceSignature);
}});
_1.provide("ws.settings.GeneralSettings");
_1.require("dojo.html.*");
_1.require("dojo.widget.*");
_1.require("ws.date");
_1.require("ws.string");
_1.require("ws.widget.OkCancelDialog");
_1.require("ws.widget.PopupDatePicker");
_1.require("ws.widget.WSToolbar");
_1.require("ws.widget.WSSelect");
_1.widget.defineWidget("ws.settings.GeneralSettings",_1.widget.HtmlWidget,{templateString:"<div class=\"settings page generalSettings\">\r\n\t<h2 class=\"title\">${GeneralSettingsHead}</h2>\r\n\t<br />\r\n\t<table class=\"settings content\" border=\"0\" cellpadding=\"5\" style=\"border-collapse: collapse\" dojoattachevent=\"onClick: onChange\">\r\n\t\t<tbody>\r\n\t\t\t<tr dojoattachpoint=\"storageGauge\">\r\n\t\t\t\t<td class=\"labelCell\">\r\n\t\t\t\t\t${SpaceUsage}<br />\r\n\t\t\t\t</td>\r\n\t\t\t\t<td class=\"valueCell\">\r\n\t\t\t\t\t<div dojoattachpoint=\"gaugeLabel\" class=\"gaugeLabel\"></div><div dojoattachpoint=\"gaugeBackground\" class=\"gaugeBackground\"><div dojoattachpoint=\"gaugeForeground\" class=\"gaugeForeground\"></div></div>\r\n\t\t\t</tr>\r\n\t\t\t<tr dojoattachpoint=\"storageGaugeSeparator\" >\r\n\t\t\t\t<td colspan=\"2\" class=\"separator\"></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td class=\"labelCell\">\r\n\t\t\t\t\t${PopupWindows}\r\n\t\t\t\t</td>\r\n\t\t\t\t<td class=\"valueCell\">\r\n\t\t\t\t\t<input dojoattachpoint=\"ReadInPopup\" type=\"checkbox\" />&nbsp; ${ReadingOption1}<br />\r\n\t\t\t\t\t<input dojoAttachPoint=\"ComposeInPopup\" type=\"checkbox\" />&nbsp; ${ComposeSettingsComposeOption1}<br />\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td colspan=\"2\" class=\"separator\"></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td class=\"labelCell\">\r\n\t\t\t\t\t${Reading}<br />\r\n\t\t\t\t\t<div class=\"tipText\"><table><tr><td class=\"tipText\">${ReadingTip}</td><td valign=\"top\"><img src=\"${spacer}\" class=\"newWindowIcon\" /></td></tr></table></div>\r\n\t\t\t\t</td>\r\n\t\t\t\t<td class=\"valueCell\">\r\n\t\t\t\t\t<input dojoattachpoint=\"GotoNextOnDelete\" type=\"checkbox\" />&nbsp; ${ReadingOption2}<br />\r\n\t\t\t\t\t<div dojoattachpoint=\"DisplayImageWarningCell\">\r\n\t\t\t\t\t<input dojoAttachPoint=\"DisplayImageWarning\" type=\"checkbox\" />&nbsp; ${OptionsImgWarning}<br />\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<input dojoAttachPoint=\"DisplayFullHeader\" type=\"checkbox\" />&nbsp; ${DisplayFullHeader}<br />\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td colspan=\"2\" class=\"separator\"></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td class=\"labelCell\">\r\n\t\t\t\t\t${NewMail}</td>\r\n\t\t\t\t<td class=\"valueCell\">\r\n\t\t\t\t\t<input dojoattachpoint=\"AutoRefresh\" type=\"checkbox\" />&nbsp; ${NewMailOption1}<br />\r\n\t\t\t\t\t<input dojoattachpoint=\"PlaySound\" type=\"checkbox\" />&nbsp; ${NewMailOption2}&nbsp; <a class=\"tipText\" dojoattachevent=\"onclick: previewSound\" href=\"#\">${NewMailPreviewSound}</a><img dojoattachevent=\"onclick: previewSound\" src=\"${spacer}\" class=\"newMailPreviewIcon\" /><br />\r\n\t\t\t\t\t<span dojoattachpoint=\"InboxType\"><input dojoattachpoint=\"ShowStandardInbox\" type=\"checkbox\" />&nbsp; ${NewMailOption3}</span></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td colspan=\"2\" class=\"separator\"></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr dojoattachpoint=\"VacationResponse\">\r\n\t\t\t\t<td class=\"labelCell\">\r\n\t\t\t\t\t${VacationResponse}<div class=\"tipText\">${VacationResponseTip}</div><br />\r\n\t\t\t\t</td>\r\n\t\t\t\t<td dojoattachpoint=\"vacationResponseOptions\">\r\n\t\t\t\t\t<ul dojotype=\"ws:WSSelect\" dojoattachevent=\"valueChanged: onAwayChange; valueChanged: onChange\" dojoattachpoint=\"awaySelect\" className=\"awaySelect\">\r\n\t\t\t\t\t\t<li value=\"Disabled\" selected=\"true\">${VacationResponseOption1}</li>\r\n\t\t\t\t\t\t<li value=\"Generic\">${VacationResponseOption2}</li>\r\n\t\t\t\t\t\t<li value=\"Until\">${VacationResponseOption3}</li>\r\n\t\t\t\t\t</ul>\r\n\t\t\t\t\t<span class=\"awaySample\" id=\"awaySample1\">${VacationResponseText2}</span>\r\n\t\t\t\t\t<span class=\"awaySample\" id=\"awaySample2\"><span>${VacationResponseText3a}&nbsp;<input dojoAttachPoint=\"vacationInputDate\" class=\"vacationInputDate\" dojoattachevent=\"onFocus: onFocusDateField; onBlur: onBlurDateField\"/>&nbsp;${VacationResponseText3b}</span></span>\r\n\t\t\t\t</td>\r\n\t\t\t\t<td class=\"labelCell\" dojoattachpoint=\"vacationResponseOptionsError\">${AwayMessageUnavailableText}</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr dojoattachpoint=\"VacationResponseSeparator\">\r\n\t\t\t\t<td colspan=\"2\" class=\"separator\"></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td class=\"labelCell\">\r\n\t\t\t\t\t${AutoSignOff}\r\n\t\t\t\t</td>\r\n\t\t\t\t<td class=\"valueCell\">\r\n\t\t\t\t\t<span class=\"selectLabel\">${AutoSignOffText}&nbsp;</span>\r\n\t\t\t\t\t<ul dojotype=\"ws:WSSelect\" dojoattachevent=\"valueChanged: onIdleChange; valueChanged: onChange\" className=\"floatSelect\" dojoattachpoint=\"idleSelect\">\r\n\t\t\t\t\t\t<li value=\"1800\">${AutoSignOffOption1}</li>\r\n\t\t\t\t\t\t<li value=\"7200\">${AutoSignOffOption2}</li>\r\n\t\t\t\t\t\t<li value=\"34800\">${AutoSignOffOption3}</li>\r\n\t\t\t\t\t\t<li value=\"86400\">${AutoSignOffOption4}</li>\r\n\t\t\t\t\t\t<li value=\"1209600\" selected=\"true\">${AutoSignOffOption5}</li>\r\n\t\t\t\t\t</ul>\r\n\t\t\t\t\t<a style=\"display:none\" class=\"tipText\" href=\"#\">${AutoSignOffTip}</a>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td colspan=\"2\" class=\"separator\"></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td class=\"labelCell\">\r\n\t\t\t\t\t${Contacts}\r\n\t\t\t\t</td>\r\n\t\t\t\t<td class=\"valueCell\">\r\n\t\t\t\t\t<span class=\"selectLabel\">${DisplayOrder}:&nbsp;</span>\r\n\t\t\t\t\t<ul dojoType=\"ws:WSSelect\" dojoAttachEvent=\"valueChanged: onChange\" className=\"floatSelect\" dojoAttachPoint=\"displayOrderSelect\">\r\n\t\t\t\t\t\t<li value=\"FirstLastNick\">${AddressFormat1}</li>\r\n\t\t\t\t\t\t<li value=\"LastFirstNick\">${AddressFormat2}</li>\r\n\t\t\t\t\t\t<li value=\"LastNoCommaFirstNick\">${AddressFormat3}</li>\r\n\t\t\t\t\t</ul>\r\n\t\t\t\t\t<br><br>\r\n\t\t\t\t\t<span class=\"selectLabel\">${SortBy}:&nbsp;</span>\r\n\t\t\t\t\t<ul dojoType=\"ws:WSSelect\" dojoAttachEvent=\"valueChanged: onChange\" className=\"floatSelect\" dojoAttachPoint=\"sortOrderSelect\">\r\n\t\t\t\t\t\t<li value=\"FirstLastNick\">${SortFormat1}</li>\r\n\t\t\t\t\t\t<li value=\"LastFirstNick\">${SortFormat2}</li>\r\n\t\t\t\t\t</ul>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr dojoAttachPoint=\"otherMailOptionsSeparator\">\r\n\t\t\t\t<td colspan=\"2\" class=\"separator\"></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr dojoAttachPoint=\"otherMailOptionsLinks\">\r\n\t\t\t\t<td class=\"labelCell\">\r\n\t\t\t\t\t<span>${OtherMailOptions1}</span>\r\n\t\t\t\t\t<br>\r\n\t\t\t\t\t<span class=\"tipText\" dojoAttachPoint=\"otherMailOptionsSpan2\"></span>\r\n\t\t\t\t</td>\r\n\t\t\t\t<td class=\"valueCell\">\r\n\t\t\t\t\t<a href=\"#\" target=\"_blank\" dojoAttachPoint=\"otherMailLink\" class=\"tipText\"></a>&nbsp;${OtherEmailCaption2}\r\n\t\t\t\t\t<br>\r\n\t\t\t\t\t<a href=\"#\" target=\"_blank\" dojoAttachPoint=\"otherMobileLink\" class=\"tipText\"></a>&nbsp;${OtherMobileCaption2}\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t\r\n\t\t</tbody>\r\n\t</table>\r\n\t<div dojoType=\"ws:PopupDatePicker\" dojoAttachPoint=\"quickAddPicker\" toggle=\"wipe\" toggleDuration=\"150\" closeOnMouseOut=\"false\" width=\"150\"></div>\r\n</div> \r\n",templateCssString:".settings .generalSettings .valueCell\r\n{\r\n\twidth: 75%;\r\n}\r\n\r\n.generalSettings .awaySample\r\n{\r\n\tfont: normal 11px Arial;\r\n\tborder: solid 1px #cccccc;\r\n\tbackground-color: #F4F2F0;\r\n\tpadding: 5px;\r\n\tmargin: 4px 10px 4px 6px;\r\n\ttop: 10px;\r\n\tleft: -4px;\r\n\tposition: relative;\r\n\t-moz-border-radius: 4px;\r\n}\r\n\r\n.generalSettings .selectLabel\r\n{\r\n\tfloat: left;\r\n}\r\n.generalSettings .floatSelect\r\n{\r\n\tfloat: left;\r\n\tmargin-top: -2px;\r\n}\r\n\r\n.generalSettings .newWindowIcon {\r\n\tbackground: url(\"${images}main.gif\") -630px -0px;\r\n\tmargin: 3px 3px -3px 0px;\r\n\twidth: 15px;\r\n\theight: 15px;\r\n}\r\n\r\n.generalSettings .newMailPreviewIcon {\r\n\tbackground: url(\"${images}main.gif\") -1230px -30px;\r\n\tmargin: 0px 0px -2px 5px;\r\n\tborder: none;\r\n\twidth: 16px;\r\n\theight: 14px;\r\n\tcursor: hand;\r\n}\r\n\r\n.generalSettings .gaugeLabel\r\n{\r\n\t\tfloat: left;\r\n\t\tpadding-right: 10px;\r\n\t\tposition: relative;\r\n\t\ttop: 2px;\r\n\t\tleft: 0px;\r\n}\r\n\r\n.generalSettings .gaugeBackground\r\n{\r\n    width: 195px;\r\n    height: 21px;\r\n\t\tbackground: url(\"${images}main.gif\") -1345px -52px;\r\n\t\tfloat: left;\r\n}\r\n\r\n.generalSettings .gaugeForeground\r\n{\r\n    position: relative;\r\n    width: 195px;\r\n    height: 21px;\r\n    border: none;\r\n    left: 0px;\r\n    top: 0px;\r\n    background: url(\"${images}main.gif\") -1345px -27px;\r\n    clear: both;\r\n}\r\n\r\n.generalSettings .vacationInputDate\r\n{\r\n\tfont: normal 11px verdana;\r\n\tcolor: #999999;\r\n\twidth: 120px;\r\n\tvertical-align: middle;\r\n\tborder: solid 1px #cccccc;\r\n\tpadding: 2px 2px 2px 6px;\r\n\tmargin: 0px;\r\n\tposition: relative;\r\n\ttop: -1px;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/settings/GeneralSettings.css"),widgetsInTemplate:true,initialStateHash:"",hasChanged:false,onChangeCallback:null,QUICKADD_ACTIVE_COLOR:"#000000",QUICKADD_INACTIVE_COLOR:"#999999",isDirty:function(){
if(!this.hasChanged){
this.hasChanged=this.initialStateHash!=this.getCurrentStateHash();
}
return this.hasChanged;
},errMsgIsValidVacationDate:function(){
var _17a=null;
if(this.awaySelect.currentValue=="Until"){
var _17b=Config.Strings.CalDateParseFormat;
var _17c=this.vacationInputDate.value;
var _17d=ws.date.ParseDateFromFormat(_17c,_17b);
if(_17d==null){
_17a=Config.Strings.InvalidDateOnCreate;
}else{
var d=new Date();
var d2=new Date(d.getFullYear(),d.getMonth(),d.getDate());
if(_17d<d2){
_17a=Config.Strings.Settings_VacationDateBeforeToday;
}
}
}
return _17a;
},isValid:function(){
var _180=true;
var _181=null;
_181=this.errMsgIsValidVacationDate();
if(_181!=null){
ws.widget.OkCancelDialog.alert(_181);
_180=false;
}
return _180;
},init:function(){
this.ReadInPopup.checked=Settings.ReadInPopup;
this.ComposeInPopup.checked=Settings.ComposeInPopup;
this.GotoNextOnDelete.checked=Settings.GotoNextOnDelete;
this.DisplayImageWarning.checked=Settings.DisplayImageWarning;
this.DisplayFullHeader.checked=Settings.DisplayFullHeader;
this.AutoRefresh.checked=Settings.AutoRefresh;
this.PlaySound.checked=Settings.PlaySound;
this.ShowStandardInbox.checked=Settings.ShowStandardInbox;
if(Config.UIVariant!="AOL"||!Config.EnableInboxModeToggle){
_1.html.hide(this.InboxType);
}
if(Config.HideVacationResponse){
_1.html.hide(this.VacationResponse);
_1.html.hide(this.VacationResponseSeparator);
}
if(Config.UIVariant=="NEUF"||Config.UIVariant=="CEGETEL"){
_1.html.hide(this.DisplayImageWarningCell);
}
for(var i=0;i<this.idleSelect.options.length;i++){
if(this.idleSelect.options[i].value==Settings.IdleTimeout){
this.idleSelect.setOption(i);
}
}
for(var i=0;i<this.displayOrderSelect.options.length;i++){
if(this.displayOrderSelect.options[i].value==Settings.AddressNameDisplayFormat){
this.displayOrderSelect.setOption(i);
}
}
for(var i=0;i<this.sortOrderSelect.options.length;i++){
if(this.sortOrderSelect.options[i].value==Settings.AddressNameSortOrder){
this.sortOrderSelect.setOption(i);
}
}
this.ShowStandardInbox.checked=Settings.ShowStandardInbox;
if(Settings.AwayMessageSettingsAvailable){
_1.html.hide(this.vacationResponseOptionsError);
for(var i in this.awaySelect.options){
if(this.awaySelect.options[i].value==Settings.AwayMessageType){
this.awaySelect.setOption(i);
}
}
this.awaySelect.size="byValue";
var _183=new Date();
if(Settings.AwayMessageDate!="1/1/0001"){
_183=new Date(Settings.AwayMessageDate);
}
this.vacationInputDate.value=ws.date.formatDateTime(_183,Config.Strings.DatePickerFooterDateFormat);
this.vacationInputDate.onclick=ws.lang.hitch(this,"showQuickAddPicker",this.vacationInputDate,true);
_1.event.connect(this.quickAddPicker.datePicker,"selectDateConnect",this,"fillInDateField");
}else{
_1.html.hide(this.vacationResponseOptions);
}
if(typeof (Settings.HasUnlimitedMailStorage)=="undefined"||Settings.HasUnlimitedMailStorage==true||Settings.MailStorageQuota==0||!Config.ShowStorageGauge){
_1.html.hide(this.storageGauge);
_1.html.hide(this.storageGaugeSeparator);
}else{
var _184=Settings.MailStorageUsed/Settings.MailStorageQuota;
var _185=0;
var KB=1024;
var MB=1024*1024;
var GB=1024*1024*1024;
if(Settings.MailStorageQuota>GB){
_185=Math.round(Settings.MailStorageQuota/GB)+Config.Strings.Gigabytes;
}else{
if(Settings.MailStorageQuota>MB){
_185=Math.round(Settings.MailStorageQuota/MB)+Config.Strings.Megabytes;
}else{
_185=Math.round(Settings.MailStorageQuota/KB)+Config.Strings.Kilobytes;
}
}
_184=Math.min(_184,1);
_1.lang.setTimeout(_1.lang.hitch(this,function(){
this.setGauge(_184,ws.string.substituteParams(Config.Strings.SpaceUsageText,Math.round(_184*100),_185));
}),500);
}
this.onAwayChange();
this.hasChanged=false;
if(Config.EnableOtherMailOptions){
_1.html.show(this.otherMailOptionsSeparator);
_1.html.show(this.otherMailOptionsLinks);
this.otherMailOptionsSpan2.innerHTML=ws.string.substituteParams(Config.Strings.OtherMailOptions2,Config.Strings.ProductName);
this.otherMailLink.innerHTML=ws.string.substituteParams(Config.Strings.OtherEmailCaption1,Config.Strings.ProductName);
this.otherMailLink.href=Config.OtherEmailUrl;
this.otherMobileLink.innerHTML=ws.string.substituteParams(Config.Strings.OtherMobileCaption1,Config.Strings.ProductName);
this.otherMobileLink.href=Config.OtherMailMobileUrl;
}else{
_1.html.hide(this.otherMailOptionsSeparator);
_1.html.hide(this.otherMailOptionsLinks);
}
this.initialStateHash=this.getCurrentStateHash();
},getCurrentStateHash:function(){
return ""+this.ReadInPopup.checked+this.ComposeInPopup.checked+this.GotoNextOnDelete.checked+this.DisplayImageWarning.checked+this.DisplayFullHeader.checked+this.AutoRefresh.checked+this.PlaySound.checked+this.ShowStandardInbox.checked+this.idleSelect.currentValue+this.awaySelect.currentValue+this.vacationInputDate.value+this.displayOrderSelect.currentValue+this.sortOrderSelect.currentValue+"";
},getRpcData:function(){
var _189=new Date(ws.date.GetDateFromFormat(this.vacationInputDate.value,Config.Strings.DatePickerFooterDateFormat));
var _18a=(_189.getFullYear())+"/"+(_189.getMonth()+1)+"/"+_189.getDate();
return {action:"GeneralSettings",content:{ReadInPopup:this.ReadInPopup.checked,ComposeInPopup:this.ComposeInPopup.checked,GotoNextOnDelete:this.GotoNextOnDelete.checked,DisplayImageWarning:this.DisplayImageWarning.checked,DisplayFullHeader:this.DisplayFullHeader.checked,AutoRefresh:this.AutoRefresh.checked,PlaySound:this.PlaySound.checked,ShowStandardInbox:this.ShowStandardInbox.checked,IdleTimeoutValue:this.idleSelect.currentValue,AwayMessageType:this.awaySelect.currentValue,AwayMessageDate:_18a,AddressNameDisplayFormat:this.displayOrderSelect.currentValue,AddressNameSortOrder:this.sortOrderSelect.currentValue},load:_1.lang.hitch(this,function(data){
_1.debug("General Settings saved successfully");
if(Settings.ShowStandardInbox!=this.ShowStandardInbox.checked){
Settings.ShowStandardInbox=this.ShowStandardInbox.checked;
_1.event.topic.publish("SettingsChanged/ShowStandardInbox");
}
}),error:_1.lang.hitch(this,function(data){
_1.debug("Error saving Calendar settings");
ws.widget.OkCancelDialog.alert(_1.string.isBlank(data)?Config.Strings.ServerErrorChangesNotSaved:data);
})};
},onSaveSettings:function(){
this.hasChanged=false;
this.initialStateHash=this.getCurrentStateHash();
_1.event.topic.publish("SettingsChanged/General");
},onCancelSettings:function(){
this.init();
},onChange:function(){
if(this.onChangeCallback){
this.onChangeCallback();
}
},onAwayChange:function(){
_1.html.hide(_1.byId("awaySample1"));
_1.html.hide(_1.byId("awaySample2"));
if(this.awaySelect.currentValue=="Generic"){
_1.html.show(_1.byId("awaySample1"));
}else{
if(this.awaySelect.currentValue=="Until"){
var _18d=_1.byId("awaySample2");
_1.html.show(_18d);
}
}
},setGauge:function(_18e,_18f){
if(_18e<0||_18e>1){
return;
}
this.gaugeForeground.style.width=(this.gaugeBackground.clientWidth*_18e)+"px";
if(_18f!=null){
this.gaugeLabel.innerHTML=_18f;
}
},onFocusDateField:function(evt){
var _191=evt.currentTarget;
if(_191.value==ws.date.formatDateTime(new Date(),Config.Strings.DatePickerFooterDateFormat)){
_191.value="";
}
_191.style.color=this.QUICKADD_ACTIVE_COLOR;
},onBlurDateField:function(evt){
var _193=evt.currentTarget;
if(_193.value==""){
_193.style.color="";
_193.value=ws.date.formatDateTime(new Date(),Config.Strings.DatePickerFooterDateFormat);
}
},showQuickAddPicker:function(_194){
if(!this.quickAddPicker.isShowingNow){
this.quickAddPicker.open(_194,this,_194,{"BL":"TL"});
this.vacationInputDate=_194;
}
},fillInDateField:function(_195){
var d=new Date();
var d2=new Date(d.getFullYear(),d.getMonth(),d.getDate());
if(_195<d2){
ws.widget.OkCancelDialog.alert(Config.Strings.Settings_VacationDateBeforeToday);
}else{
this.vacationInputDate.value=ws.date.formatDateTime(new Date(_195),Config.Strings.DatePickerFooterDateFormat);
this.onChange();
if(this.vacationInputDate.style.color!=this.QUICKADD_ACTIVE_COLOR){
this.vacationInputDate.style.color=this.QUICKADD_ACTIVE_COLOR;
}
}
this.quickAddPicker.hidePopup();
},onIdleChange:function(){
},previewSound:function(){
ws.io.playSound(Config.BaseResourcesURL+"sounds/ygm.wav");
}});
_1.provide("ws.settings.SpamSettings");
_1.require("dojo.html.*");
_1.require("dojo.widget.*");
_1.require("ws.widget.DefaultTextbox");
_1.require("ws.widget.WSSelect");
_1.widget.defineWidget("ws.settings.SpamSettings",_1.widget.HtmlWidget,{templateString:"<div class=\"settings page spamSettings\">\r\n\t<h2 class=\"title\">${SpamSettingsHead}</h2>\r\n\t<br />\r\n\t<table dojoattachpoint=\"spamOptions\" class=\"settings content\" border=\"0\" cellpadding=\"5\" style=\"border-collapse: collapse\" dojoattachevent=\"onClick: onChange\">\r\n\t\t<tbody>\r\n\t\t\t<tr>\r\n\t\t\t\t<td class=\"labelCell\">\r\n\t\t\t\t\t${SpamFilter}<br />\r\n\t\t\t\t\t<div class=\"tipText\">${SpamFilterTip}</div>\r\n\t\t\t\t</td>\r\n\t\t\t\t<td class=\"valueCell\">\r\n\t\t\t\t\t<ul dojotype=\"ws:WSSelect\" dojoattachpoint=\"spamLevelSelect\" dojoattachevent=\"valueChanged: onSpamLevelChange; valueChanged: onChange\">\r\n\t\t\t\t\t\t<li value=\"Off\">${SpamFilterOptionOff}</li>\r\n\t\t\t\t\t\t<li value=\"Low\">${SpamFilterOptionLow}</li>\r\n\t\t\t\t\t\t<li value=\"Medium\" selected=\"true\">${SpamFilterOptionMedium}</li>\r\n\t\t\t\t\t\t<li value=\"High\">${SpamFilterOptionHigh}</li>\r\n\t\t\t\t\t</ul>\r\n\t\t\t\t\t<div id=\"spamLevelInfoOff\" class=\"spamLevelInfo\">\r\n\t\t\t\t\t\t<b>${SpamFilterTextOff}</b>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div id=\"spamLevelInfoLow\" class=\"spamLevelInfo\">\r\n\t\t\t\t\t\t<b>${SpamFilterTextLow1}</b><br />\r\n\t\t\t\t\t\t${SpamFilterTextLow2}\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div id=\"spamLevelInfoMedium\" class=\"spamLevelInfo\">\r\n\t\t\t\t\t\t<b>${SpamFilterTextMedium1}</b><br />\r\n\t\t\t\t\t\t${SpamFilterTextMedium2}\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div id=\"spamLevelInfoHigh\" class=\"spamLevelInfo\">\r\n\t\t\t\t\t\t<b>${SpamFilterTextHigh1}</b><br />\r\n\t\t\t\t\t\t${SpamFilterTextHigh2}\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td colspan=\"2\" class=\"separator\"></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td class=\"labelCell\">\r\n\t\t\t\t\t${SpamAddressTitle}</td>\r\n\t\t\t\t<td class=\"valueCell\">\r\n\t\t\t\t\t<ul dojotype=\"ws:WSSelect\" dojoattachpoint=\"spamAddressSelect\" dojoattachevent=\"valueChanged: onSpamAddressChange; valueChanged: onChange\">\r\n\t\t\t\t\t\t<li value=\"AllowAll\" selected=\"true\">${SpamAddress1}</li>\r\n\t\t\t\t\t\t<li value=\"AllowAOLAndListed\">${SpamAddress2}</li>\r\n\t\t\t\t\t\t<li value=\"AllowPeopleIKnow\">${SpamAddress3}</li>\r\n\t\t\t\t\t\t<li value=\"BlockAll\">${SpamAddress4}</li>\r\n\t\t\t\t\t\t<li value=\"Custom\">${SpamAddress5}</li>\r\n\t\t\t\t\t</ul>\r\n\t\t\t\t\t<div id=\"spamAddressOptions\">\r\n\t\t\t\t\t\t<input type=\"radio\" name=\"spamCustomRadioGroup\" dojoattachpoint=\"spamBlockRadio\" checked=\"true\" />${SpamAddressBlockChoice}&nbsp;&nbsp;<input type=\"radio\" name=\"spamCustomRadioGroup\" dojoattachpoint=\"spamAllowRadio\" />${SpamAddressAllowChoice}<br />\r\n\t\t\t\t\t\t<div dojoType=\"ws:DefaultTextbox\" dojoAttachPoint=\"spamAddressInput\" class=\"spamAddressInput\" defaultValue=\"${EnterEmailAddress}\" size=\"38\" dojoattachevent=\"onChange: onSpamChange; _onKeyPress: onSpamKeypress\"></div>&nbsp;&nbsp;<img src=\"${spacer}\" align=\"bottom\" class=\"spamAddIcon\" dojoattachpoint=\"spamAddIcon\" dojoattachevent=\"onClick: onSpamAdd\" /><br />\r\n\t\t\t\t\t\t<div class=\"spamAddressListContainer\"><div class=\"spamAddressList wsInput\" dojoattachpoint=\"spamAddressList\"></div></div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td colspan=\"2\" class=\"separator\"></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td class=\"labelCell\">\r\n\t\t\t\t\t${SpamFilterByContent}</td>\r\n\t\t\t\t<td class=\"valueCell\">\r\n\t\t\t\t\t<input type=\"checkbox\" dojoattachpoint=\"blockPicsCheckbox\" />&nbsp; ${SpamFilterByContentOption}<br />\r\n\t\t\t\t\t<div style=\"display:none\"><input type=\"checkbox\" dojoattachpoint=\"blockWordsCheckbox\" />&nbsp; ${SpamBlockEnable}&nbsp; <a id=\"customWordList\" href=\"#\">${SpamBlockWordList}</a></div></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td colspan=\"2\" class=\"separator\"></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td class=\"labelCell\">\r\n\t\t\t\t\t${BlockedMail}</td>\r\n\t\t\t\t<td class=\"valueCell\">\r\n\t\t\t\t\t<input type=\"radio\" name=\"spamBlockedRadioGroup\" dojoattachpoint=\"blockedDeleteRadio\" />&nbsp; ${BlockedMailOption1}<br />\r\n\t\t\t\t\t<input type=\"radio\" name=\"spamBlockedRadioGroup\" dojoattachpoint=\"blockedSpamRadio\"/>&nbsp; ${BlockedMailOption2}<br />\r\n\t\t\t</tr>\r\n\t\t\t<tr style=\"display: none\">\r\n\t\t\t\t<td colspan=\"2\" class=\"separator\"></td>\r\n\t\t\t</tr>\r\n\t\t\t<tr style=\"display: none\">\r\n\t\t\t\t<td class=\"labelCell\"></td>\r\n\t\t\t\t<td class=\"valueCell\">\r\n\t\t\t\t\t&nbsp;${AddExtraSettings} <a href=\"http://webmail.aol.com\" target=\"_blank\">${OriginalAOLSettings}</a>.\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t</tbody>\r\n\t</table>\r\n\r\n\t<table dojoattachpoint=\"spamOptionsError\" class=\"settings content\" border=\"0\" cellpadding=\"5\" style=\"border-collapse: collapse\">\r\n\t\t<tbody>\r\n\t\t\t<tr>\r\n\t\t\t\t<td class=\"labelCell\">${SpamControlsUnavailableText2}</td>\r\n\t\t\t</tr>\r\n\t\t</tbody>\r\n\t</table>\r\n</div>\r\n",templateCssString:".settings .spamAddressInput\r\n{\r\n\tpadding: 2px 0px 1px 3px;\r\n\twidth: 230px;\r\n}\r\n\r\n.settings .spamAddIcon\r\n{\r\n\tposition: relative;\r\n\tbackground: url(\"${images}main.gif\") -1189px -0px;\r\n\twidth: 18px;\r\n\theight: 18px;\r\n}\r\n\r\n.settings .spamAddIcon.disabled,\r\n.settings .spamAddIcon.disabled:hover\r\n{\r\n\tbackground-position: -1235px -0px;\r\n}\r\n\r\n.settings .spamAddIcon:hover\r\n{\r\n\tbackground-position: -1212px -0px;\r\n}\r\n\r\n.settings .spamAddressListContainer\r\n{\r\n\toverflow: hidden;\r\n}\r\n\r\n.settings .spamAddressList\r\n{\r\n\tborder: solid 1px #85817c;\r\n\twidth: 247px;\r\n\theight: 100px;\r\n\toverflow: auto;\r\n\tcursor: default;\r\n}\r\n\r\n.settings .spamAddressRow\r\n{\r\n\tpadding: 4px;\r\n\tclear: both;\r\n\tcursor: pointer;\r\n}\r\n\r\n.settings .spamAddressRowSelected, .settings .spamAddressRowSelected:hover\r\n{\r\n\tbackground-color: #e5edfa;\r\n}\r\n\r\n.settings .spamAddressValue\r\n{\r\n\tfont: Arial 12px normal;\r\n\twidth: 180px;\r\n\tleft: 0px;\r\n\tfloat: left;\r\n}\r\n\r\n.settings .spamAddressRemoveIcon\r\n{\r\n\tbackground: url(\"${images}main.gif\") -1394px -0px;\r\n\twidth: 14px;\r\n\theight: 14px;\r\n\tposition: relative;\r\n\tleft: 0px;\r\n\tvertical-align: top\r\n}\r\n\r\n.settings .spamAddressRemoveIcon:hover\r\n{\r\n\tbackground-position: -1409px -0px;\r\n}\r\n\r\n.settings .spamLevelInfo\r\n{\r\n\tpadding-left: 8px;\r\n\twidth: 500px;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/settings/SpamSettings.css"),widgetsInTemplate:true,initialStateHash:"",hasChanged:false,onChangeCallback:null,isDirty:function(){
if(!this.hasChanged){
this.hasChanged=(this.initialStateHash!=this.getCurrentStateHash());
}
return this.hasChanged;
},init:function(){
if(!Settings.SpamSettingsAvailable){
_1.html.hide(this.spamOptions);
this.hasChanged=false;
this.initialStateHash=this.getCurrentStateHash();
return;
}
_1.html.hide(this.spamOptionsError);
this.blockPicsCheckbox.checked=Settings.BlockMailWithAttachments;
this.blockWordsCheckbox.checked=Settings.BlockedWordListEnabled;
this.blockedDeleteRadio.checked=Settings.DeleteBlockedMail;
this.blockedSpamRadio.checked=!Settings.DeleteBlockedMail;
for(var i in this.spamAddressSelect.options){
var _199=Settings.IncomingMailControl;
if(_199=="AllowListed"||_199=="BlockListed"){
_199="Custom";
}
if(this.spamAddressSelect.options[i].value==_199){
this.spamAddressSelect.setOption(i);
}
}
if(Settings.IncomingMailControl=="AllowListed"){
this.spamAllowRadio.checked=true;
}else{
if(Settings.IncomingMailControl=="BlockListed"){
this.spamBlockRadio.checked=true;
}
}
for(var i in this.spamLevelSelect.options){
if(this.spamLevelSelect.options[i].value==Settings.PersonalAdaptiveSpamFilterLevel){
this.spamLevelSelect.setOption(i);
}
}
this.spamAddressSelect.size="byValue";
this.spamLevelSelect.size="byValue";
this.onSpamLevelChange();
this.onSpamAddressChange();
this.clearSpamAddressList();
for(var i in Settings.SpamAddressList){
this.addSpamAddress(Settings.SpamAddressList[i]);
}
this.hasChanged=false;
this.initialStateHash=this.getCurrentStateHash();
},getCurrentStateHash:function(){
return ""+this.spamAddressSelect.currentValue+this.spamLevelSelect.currentValue+this.getSpamAddressList()+this.blockPicsCheckbox.checked+this.blockWordsCheckbox.checked+this.blockedDeleteRadio.checked+this.spamAllowRadio.checked+this.spamBlockRadio.checked+"";
},getRpcData:function(){
var _19a=this.spamAddressSelect.currentValue;
if(_19a=="Custom"){
_19a=(this.spamAllowRadio.checked?"AllowListed":"BlockListed");
}
return {action:"SpamSettings",content:{IncomingMailControl:_19a,SpamAddressList:this.getSpamAddressList(),PersonalAdaptiveSpamFilterLevel:this.spamLevelSelect.currentValue,BlockMailWithAttachments:this.blockPicsCheckbox.checked,BlockedWordListEnabled:Settings.BlockedWordListEnabled,DeleteBlockedMail:this.blockedDeleteRadio.checked},load:_1.lang.hitch(this,function(data){
_1.debug("Spam Settings Saved Successfully");
}),error:_1.lang.hitch(this,function(data){
_1.debug("Error saving Calendar settings");
ws.widget.OkCancelDialog.alert(_1.string.isBlank(data)?Config.Strings.ServerErrorChangesNotSaved:data);
})};
},onSaveSettings:function(){
this.hasChanged=false;
this.initialStateHash=this.getCurrentStateHash();
_1.event.topic.publish("SettingsChanged/Spam");
},onCancelSettings:function(){
this.init();
},onChange:function(){
if(this.onChangeCallback){
this.onChangeCallback();
}
},onSpamChange:function(evt){
if((this.spamAddressInput.getValue()==this.spamAddressInput.defaultValue)||(this.spamAddressInput.getValue()=="")){
_1.html.addClass(this.spamAddIcon,"disabled");
}else{
_1.html.removeClass(this.spamAddIcon,"disabled");
}
this.onChange();
},onSpamRemove:function(evt){
var _19f=evt.currentTarget.parentNode;
_19f.parentNode.removeChild(_19f);
this.onChange();
},onSpamAdd:function(evt){
var _1a1=this.spamAddressInput.getValue();
if(_1a1==this.spamAddressInput.defaultValue||_1.string.isBlank(_1a1)){
return;
}
this.addSpamAddress(_1a1);
this.spamAddressInput.setValue("",true);
this.spamAddressInput.domNode.focus();
this.onChange();
},onSpamKeypress:function(evt){
if(evt.keyCode==evt.KEY_ENTER){
this.onSpamAdd(evt);
}
},addSpamAddress:function(_1a3){
var html="<div class=\"spamAddressRow\"><div class=\"spamAddressValue\">"+_1a3+"</div><img src=\""+Config.SpacerImageURL+"\" class=\"spamAddressRemoveIcon\"></div>";
var _1a5=_1.html.createNodesFromText(html)[0];
_1a5.emailAddress=_1a3;
_1.event.connect(_1a5,"onmouseover",this,"onMouseoverSpamRow");
_1.event.connect(_1a5,"onmouseout",this,"onMouseoutSpamRow");
var el=_1a5.getElementsByTagName("img")[0];
_1.html.setVisibility(el,false);
_1.event.connect(el,"onclick",this,"onSpamRemove");
this.spamAddressList.appendChild(_1a5);
},clearSpamAddressList:function(){
this.spamAddressList.innerHTML="";
},getSpamAddressList:function(){
var _1a7=[];
for(var i=0;i<this.spamAddressList.childNodes.length;i++){
_1a7.push(this.spamAddressList.childNodes[i].emailAddress);
}
return _1a7;
},onMouseoverSpamRow:function(evt){
var _1aa=evt.currentTarget;
_1.html.addClass(_1aa,"spamAddressRowSelected");
var el=_1aa.getElementsByTagName("img")[0];
_1.html.setVisibility(el,true);
},onMouseoutSpamRow:function(evt){
var _1ad=evt.currentTarget;
_1.html.removeClass(_1ad,"spamAddressRowSelected");
var _1ae=_1ad.getElementsByTagName("img")[0];
var el=_1ad.getElementsByTagName("img")[0];
_1.html.setVisibility(el,false);
},onSpamLevelChange:function(){
_1.html.hide(_1.byId("spamLevelInfoOff"));
_1.html.hide(_1.byId("spamLevelInfoLow"));
_1.html.hide(_1.byId("spamLevelInfoMedium"));
_1.html.hide(_1.byId("spamLevelInfoHigh"));
switch(this.spamLevelSelect.currentValue){
case "Off":
_1.html.show(_1.byId("spamLevelInfoOff"));
break;
case "Low":
_1.html.show(_1.byId("spamLevelInfoLow"));
break;
case "Medium":
_1.html.show(_1.byId("spamLevelInfoMedium"));
break;
case "High":
_1.html.show(_1.byId("spamLevelInfoHigh"));
break;
}
},onSpamAddressChange:function(){
var el=_1.byId("spamAddressOptions");
_1.html.hide(el);
if(this.spamAddressSelect.currentValue=="Custom"){
_1.html.show(el);
}
}});
_1.provide("ws.settings.SettingsContainer");
_1.require("dojo.html.*");
_1.require("dojo.widget.*");
_1.require("dojo.widget.PageContainer");
_1.require("ws.io");
_1.require("ws.widget.WSButton");
_1.require("ws.widget.WSToolbar");
_1.widget.defineWidget("ws.settings.SettingsContainer",_1.widget.HtmlWidget,{templateString:"<div class=\"settings\" style=\"display: none\" dojoattachpoint=\"settingsTop\">\r\n\t<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" height=\"100%\" width=\"100%\">\r\n\t\t<tr>\r\n\t\t\t<td dojoattachpoint=\"pageList\" class=\"pageList wsToolbar wsToolbarBare\" valign=\"top\" rowspan=\"2\" height=\"100%\">\r\n\t\t\t\t<div dojotype=\"ws:WSButton\" classname=\"backButton\" dojoattachevent=\"onClick: onExitSettings\" vizType=\"Compose\" dojoAttachPoint=\"backButton\">${BackToMail}&nbsp;</div>\r\n\t\t\t\t<div id=\"generalSettings\" class=\"pageItem\" widgettype=\"ws:GeneralSettings\" widgetid=\"GeneralSettings\" dojoattachevent=\"onClick: onPageClick\">${GeneralSettingsTab}</div>\r\n\t\t\t\t<div id=\"accountSettings\" class=\"pageItem\" widgettype=\"ws:AccountSettings\" widgetid=\"AccountSettings\" dojoattachevent=\"onClick: onPageClick\">${AccountsSettingsTab}</div>\r\n\t\t\t\t<div id=\"composeSettings\" class=\"pageItem\" widgettype=\"ws:ComposeSettings\" widgetid=\"ComposeSettings\" dojoattachevent=\"onClick: onPageClick\">${ComposeSettingsTab}</div>\r\n\t\t\t\t<div id=\"spamSettings\" dojoAttachPoint=\"spamSettings\" class=\"pageItem\" widgettype=\"ws:SpamSettings\" widgetid=\"SpamSettings\" dojoattachevent=\"onClick: onPageClick\">${SpamSettingsTab}</div>\r\n\t\t\t\t<div id=\"calendarSettings\" class=\"pageItem\" widgettype=\"ws:CalendarSettings\" widgetid=\"CalendarSettings\" dojoattachevent=\"onClick: onPageClick\">${CalendarSettingsTab}</div>\r\n\t\t\t\t<div id=\"chatSettings\" class=\"pageItem\" widgettype=\"ws:ChatSettings\" widgetid=\"ChatSettings\" dojoattachevent=\"onClick: onPageClick\" style=\"display:none\">${ChatSettingsTab}</div>\r\n\t\t\t</td>\r\n\t\t\t<td>\r\n\t\t\t\t<div dojoType=\"ws:WSToolbar\" dojoAttachPoint=\"settingsToolbar\">\r\n\t\t\t\t\t<div dojoType=\"ws:WSButton\" border=\"right\" dojoattachevent=\"onClick: onSaveSettings\" dojoAttachPoint=\"saveButton\">${Save}</div>\r\n\t\t\t\t\t<div dojoType=\"ws:WSButton\" border=\"right\" dojoattachevent=\"onClick: onExitSettings\" dojoAttachPoint=\"cancelButton\">${Cancel}</div>\r\n\t\t\t\t</div>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td align=\"left\">\r\n\t\t\t\t<div dojoattachpoint=\"pageContainer\" class=\"pageContainer\" style=\"overflow:auto\" dojotype=\"dojo:PageContainer\"></div>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t</table>\r\n</div>\r\n<form method=\"post\" enctype=\"multipart/form-data\" style=\"display: none;\" dojoattachpoint=\"settingsFormNode\">\r\n</form>\r\n",templateCssString:".settings\r\n{\r\n\tpadding: 0px;\r\n}\r\n\r\n.settings .pageList\r\n{\r\n\toverflow: hidden;\r\n\tmargin: 0px;\r\n\tpadding: 0px;\r\n\tbackground-color: #f3efe6;\r\n\tbackground-image: url(\"${images}navbackground.gif\"); \r\n\tbackground-position: left bottom;\r\n\tbackground-repeat: repeat-x;\r\n\theight: 100%;\r\n\twidth: 100%;\r\n\tborder: none;\r\n\tborder-right: 1px solid #adaaa6;\r\n\toverflow: hidden;\r\n}\r\n\r\n.settings .pageList .pageItem\r\n{\r\n\twidth: 155px;\r\n\tfont: normal 12px Arial;\r\n\tcolor: #000000;\r\n\tline-height: 16px;\r\n\tpadding: 3px 3px 3px 18px;\r\n\tcursor: pointer;\r\n\tcursor: hand;\r\n}\r\n\r\n.settings .pageList .pageItem.current,\r\n.settings .pageList .pageItem:hover\r\n{\r\n\tborder: none;\r\n\tbackground: #ffffff;\r\n}\r\n\r\n.settings .backButton\r\n{\r\n\tfont-size: 11px;\r\n\tpadding: 11px 0px;\r\n\tmargin: 0px auto;\r\n}\r\n\r\n.settings a\r\n{\r\n\ttext-decoration: none;\r\n\tcolor: #0066cc;\r\n}\r\n\r\n.settings a:hover\r\n{\r\n\ttext-decoration: underline;\r\n\tcolor: #0071bc;\r\n}\r\n\r\n.settings.page\r\n{\r\n\tpadding: 10px;\r\n\toverflow: auto;\r\n}\r\n\r\n.settings.content\r\n{\r\n\twidth: 100%;\r\n}\r\n\r\n.settings .labelCell\r\n{\r\n\tpadding-right: 20px;\r\n\tpadding-top: 10px;\r\n\tvertical-align: top;\r\n\tfont-weight: bold;\r\n\twidth: 180px;\r\n}\r\n\r\n.settings .valueCell\r\n{\r\n\tfont: normal 12px Arial;\r\n\tpadding-top: 10px;\r\n\tvertical-align: top;\r\n\talign: left;\r\n\twidth: 80%;\r\n}\r\n\r\n.settings .tipText\r\n{\r\n\tfont: normal 11px Arial;\r\n}\r\n\r\n.settings .title\r\n{\r\n\tfont: bold 18px Arial;\r\n\tmargin: 5px 5px 5px 5px;\r\n}\r\n\r\n.settings .wsSelect\r\n{\r\n\tfont-size: 11px;\r\n}\r\n\r\n.settings .wsInput\r\n{\r\n\tmargin: 3px 4px;\r\n}\r\n\r\n.settings .separator\r\n{\r\n\tborder-bottom: solid 1px #cccccc;\r\n\tpadding-top: 5px;\r\n}\r\n\r\n\r\n",templateCssPath:_1.uri.dojoUri("../ws/settings/SettingsContainer.css"),widgetsInTemplate:true,settingsFormNode:null,settingsExitCallback:null,selectedPage:null,selectedPageLabelNode:null,isSaving:false,isExiting:false,savingFeedbackString:Config.Strings.SaveSettingsFeedback,postCreate:function(){
if(!Config.ShowSpamControlOptions){
_1.html.hide(this.spamSettings);
}
if(!Config.EnableSpamSettings){
_1.html.hide(this.spamSettings);
}
_1.event.topic.subscribe("CalendarViewModel/CalendarAccountCreated",this,"reloadCalendarSettings");
},onResized:function(){
ws.style.setMarginBoxWidthFast(this.pageContainer.domNode,parseInt(this.settingsTop.style.width)-_1.html.getMarginBox(_1.byId("generalSettings")).width);
ws.style.setMarginBoxHeightFast(this.pageContainer.domNode,parseInt(this.settingsTop.style.height)-_1.html.getMarginBox(this.settingsToolbar.domNode).height);
this.pageContainer.onResized();
this.settingsToolbar.onResized();
if(this.selectedPage){
this.selectedPage.onResized();
}
},onSettingsChanged:function(){
var _1b1=this.selectedPage.isDirty();
ws.widget.setEnabled(this.saveButton,_1b1);
ws.widget.setEnabled(this.cancelButton,_1b1);
},onPageChange:function(){
var _1b2=true;
if(this.selectedPage&&this.selectedPage.isDirty()){
if(confirm(Config.Strings.ConfirmSaveSettings)){
_1b2=this.onSaveSettings();
}
}
return _1b2;
},selectPage:function(_1b3,_1b4){
var _1b5=_1.widget.byId(_1b3);
if(!_1b5){
_1b5=_1.widget.createWidget(_1b4,{widgetId:_1b3});
this.pageContainer.addChild(_1b5);
}
this.pageContainer.selectChild(_1b3);
this.selectedPage=_1b5;
this.selectedPage.init();
this.selectedPage.onChangeCallback=_1.lang.hitch(this,this.onSettingsChanged);
this.onSettingsChanged();
ws.widget.setEnabled(this.cancelButton,true);
if(this.isShowing()){
ws.reporting.report(this.selectedPage.widgetType,"Settings");
}
},onPageClick:function(evt){
if(this.onPageChange()){
if(this.selectedPageLabelNode){
_1.html.removeClass(this.selectedPageLabelNode,"current");
}
var el=evt.currentTarget;
_1.html.addClass(el,"current");
this.selectedPageLabelNode=el;
var _1b8=_1.html.getAttribute(el,"widgetId");
var _1b9=_1.html.getAttribute(el,"widgetType");
this.selectPage(_1b8,_1b9);
}
},postInitialize:function(){
ws.settings.SettingsContainer.superclass.postInitialize.apply(this,arguments);
if(Config.ShowIMOptions){
_1.html.show(_1.byId("chatSettings"));
}
ws.WebSuite.loadSettings(true,"all");
this.onPageClick({currentTarget:_1.byId("generalSettings")});
},reloadCalendarSettings:function(){
ws.WebSuite.loadSettings(true,"all");
},show:function(){
ws.settings.SettingsContainer.superclass.show.apply(this,arguments);
var nav=ws.WebSuite.Navigation;
var app=ws.WebSuite.Navigation.selectedApp;
var _1bc=[];
_1bc[nav.APP_MAIL]=Config.Strings.BackToMail;
_1bc[nav.APP_CALENDAR]=Config.Strings.BackToCalendar;
_1bc[nav.APP_CONTACTS]=Config.Strings.BackToContacts;
if(app in _1bc){
this.backButton.setLabel(_1bc[app]);
}else{
this.backButton.setLabel(Config.Strings.BackToMail);
}
if(this.selectedPage){
this.selectedPage.init();
ws.reporting.report(this.selectedPage.widgetType,"Settings");
}
this.isSaving=false;
this.isExiting=false;
},onSaveSettings:function(){
var _1bd=true;
if(this.selectedPage.isDirty()){
if(this.selectedPage.isValid){
_1bd=this.selectedPage.isValid();
}
if(_1bd){
var args=this.selectedPage.getRpcData();
this.saveSettings(args);
}
}
return _1bd;
},onCancelSettings:function(){
this.selectedPage.onCancelSettings();
this.onSettingsChanged();
},onExitSettings:function(){
if(!this.isSaving){
this.isExiting=true;
if(this.onPageChange()&&!this.isSaving){
if(this.settingsExitCallback){
this.settingsExitCallback();
}
ws.reporting.report("Exit Settings","Settings");
}
}
},saveSettings:function(args){
ws.widget.setEnabled(this.saveButton,false);
ws.widget.setEnabled(this.cancelButton,false);
this.isSaving=true;
_1.event.topic.publish("WSFeedbackStart",this.savingFeedbackString);
ws.io.rpc({action:args.action,content:args.content,formNode:this.settingsFormNode,load:_1.lang.hitch(this,function(data){
if(args.load){
args.load(data);
}
ws.WebSuite.loadSettings(true,"all");
_1.event.topic.publish("WSFeedbackEnd",this.savingFeedbackString);
this.selectedPage.onSaveSettings();
this.onSettingsChanged();
this.isSaving=false;
if(this.isExiting){
this.onExitSettings();
}
}),error:_1.lang.hitch(this,function(data){
_1.event.topic.publish("WSFeedbackEnd",this.savingFeedbackString);
if(args.error){
args.error(data);
}
this.isSaving=false;
ws.widget.OkCancelDialog.alert(Config.Settings_SaveError);
this.onSettingsChanged();
})});
}});
_1.kwCompoundRequire({common:["ws.settings.SettingsContainer","ws.settings.GeneralSettings","ws.settings.AccountSettings","ws.settings.ComposeSettings","ws.settings.SpamSettings","ws.settings.ChatSettings","ws.settings.CalendarSettings"]});
_1.provide("ws.settings.*");
_1.provide("ws.calendar.GlobLayout");
_1.require("ws.date");
ws.calendar.GlobLayout={UNLIMITED_CONFLICTS:0,REGION_CONTENT:0,REGION_PADDING:1,REGION_FILLER:2,REGION_OVERFLOW:3,GLOB_CONTENT:0,GLOB_PADDING:1};
_1.declare("ws.calendar.GlobLayout.Config",null,{gridInterval:30,maxConflicts:10,model:null,initializer:function(_1c2,_1c3,_1c4){
this.gridInterval=_1c2;
this.maxConflicts=_1c3;
this.model=_1c4;
}});
_1.declare("ws.calendar.GlobLayout.Content",null,{regionType:ws.calendar.GlobLayout.REGION_CONTENT,initializer:function(_1c5,_1c6,_1c7){
var _1c8=_1c7.model.calendarEnum;
var _1c9=_1c7.model.componentEnum;
var _1ca=_1c7.model.indexEnum;
this.componentInstance=_1c5;
this.component=_1c7.model.components[_1c5[_1ca.id]];
this.color=_1c7.model.calendars[this.component[_1c9.calid]][_1c8.color];
this.baseDay=_1c6;
this.globLayoutConfig=_1c7;
var _1cb=this.componentInstance[_1ca.start];
if(!_1cb){
_1cb=this.component[_1c9.start];
}
this.startDay=_1cb.getTime()-(_1cb.getTimezoneOffset()*60000);
this.startDay=Math.floor(this.startDay/86400000);
var end=this.componentInstance[_1ca.end];
if(!end){
end=this.component[_1c9.end];
}
this.endDay=end.getTime()-(end.getTimezoneOffset()*60000);
this.endDay=Math.floor(this.endDay/86400000);
var _1cd=(_1cb.getHours()*60)+_1cb.getMinutes();
var _1ce=((end.getHours()*60)+end.getMinutes())%1440;
var gi=_1c7.gridInterval;
var s;
if(this.component[_1c9.allDay]){
s=0;
}else{
if(this.startDay<this.baseDay){
s=0;
}else{
s=this.roundMinutes(_1cd);
}
}
if(s>=1440){
s=1440-gi;
}
this.startTimeInMinutes=s;
var _1d1=(end.getTime()-_1cb.getTime())/60000;
var e;
if(this.component[_1c9.allDay]){
e=0;
}else{
if((this.startDay<this.endDay)&&(this.endDay!=this.baseDay)){
e=1440;
}else{
if(this.roundMinutes(_1d1)==0){
e=this.roundMinutes(_1cd+gi);
}else{
e=this.roundMinutes(_1ce);
}
}
}
this.endTimeInMinutes=e;
var r;
var d=this.endTimeInMinutes-this.startTimeInMinutes;
if(d<=0){
r=1;
}else{
r=(d/gi);
}
this.rowspan=r;
this.colspan=1;
},roundMinutes:function(_1d5){
var _1d6=_1d5%this.globLayoutConfig.gridInterval;
if(_1d6==0){
return _1d5;
}
var _1d7;
var bias=_1d6/this.globLayoutConfig.gridInterval;
if(bias<0.5){
_1d7=_1d5-_1d6;
}else{
_1d7=_1d5+(this.globLayoutConfig.gridInterval-_1d6);
}
return _1d7;
}});
ws.calendar.GlobLayout.Padding={regionType:ws.calendar.GlobLayout.REGION_PADDING,rowspan:1,colspan:1};
ws.calendar.GlobLayout.Filler={regionType:ws.calendar.GlobLayout.REGION_FILLER,rowspan:1,colspan:1};
_1.declare("ws.calendar.GlobLayout.Overflow",null,{regionType:ws.calendar.GlobLayout.REGION_OVERFLOW,rowspan:1,colspan:1,initializer:function(){
this.rowspan=1;
}});
_1.declare("ws.calendar.GlobLayout.GlobColumn",null,{initializer:function(_1d9,_1da){
this.start=_1d9;
this.globLayoutConfig=_1da;
this.end=_1d9;
this.rowspan=0;
this.regions=new Array();
this.finalized=false;
},willFit:function(_1db){
if(_1db.startTimeInMinutes>=this.end){
return true;
}else{
return false;
}
},addRegion:function(_1dc){
var gi=this.globLayoutConfig.gridInterval;
if(_1dc.startTimeInMinutes!=this.end){
var diff=_1dc.startTimeInMinutes-this.end;
var _1df=diff/gi;
for(var i=0;i<_1df;i++){
this.regions[this.regions.length]=ws.calendar.GlobLayout.Padding;
this.end+=gi;
}
}
this.regions[this.regions.length]=_1dc;
var diff=(_1dc.endTimeInMinutes-_1dc.startTimeInMinutes)-gi;
var _1e1=diff/gi;
for(var i=0;i<_1e1;i++){
this.regions[this.regions.length]=ws.calendar.GlobLayout.Filler;
this.end+=gi;
}
this.end=_1dc.endTimeInMinutes;
this.rowspan=(this.end-this.start)/gi;
},finalize:function(_1e2){
var gi=this.globLayoutConfig.gridInterval;
if(this.rowspan<_1e2){
var _1e4=_1e2-this.rowspan;
for(var i=0;i<_1e4;i++){
this.regions[this.regions.length]=ws.calendar.GlobLayout.Padding;
this.end+=gi;
this.rowspan++;
}
}
this.finalized=true;
}});
_1.declare("ws.calendar.GlobLayout.ContentGlob",null,{globType:ws.calendar.GlobLayout.GLOB_CONTENT,initializer:function(_1e6,_1e7){
this.start=_1e6;
this.globLayoutConfig=_1e7;
this.end=_1e6;
this.rowspan=1;
this.colspan=1;
this.globColumns=new Array();
this.regionCount=0;
this.overflow=false;
this.overflowRegion=null;
this.finalized=false;
},willFit:function(_1e8){
if(this.globColumns.length==0){
if(_1e8.startTimeInMinutes==this.start){
return true;
}else{
return false;
}
}
if((_1e8.startTimeInMinutes>=this.start)&&(_1e8.startTimeInMinutes<this.end)){
return true;
}else{
return false;
}
},hasMaxConflicts:function(){
if(this.globLayoutConfig.maxConflicts==ws.calendar.GlobLayout.UNLIMITED_CONFLICTS){
return false;
}
if(this.globColumns.length<this.globLayoutConfig.maxConflicts){
return false;
}else{
return true;
}
},addRegion:function(_1e9){
var _1ea=false;
var c=null;
for(var i=0;i<this.globColumns.length;i++){
c=this.globColumns[i];
if(c.willFit(_1e9)){
c.addRegion(_1e9);
if(_1e9.endTimeInMinutes>this.end){
this.end=_1e9.endTimeInMinutes;
this.rowspan=c.rowspan;
}
this.regionCount++;
_1ea=true;
break;
}
}
if(_1ea){
return true;
}
if(this.hasMaxConflicts()){
if(this.overflow){
return false;
}
this.overflowRegion=new ws.calendar.GlobLayout.Overflow();
this.overflow=true;
return false;
}
var i=this.globColumns.length;
var c=new ws.calendar.GlobLayout.GlobColumn(this.start,this.globLayoutConfig);
c.addRegion(_1e9);
this.globColumns[i]=c;
this.colspan=this.globColumns.length;
if(_1e9.endTimeInMinutes>this.end){
this.end=_1e9.endTimeInMinutes;
this.rowspan=c.rowspan;
}
this.regionCount++;
return true;
},finalize:function(){
var _1ed=this.globColumns.length;
for(var i=0;i<_1ed;i++){
this.globColumns[i].finalize(this.rowspan);
}
if(this.regionCount>_1ed){
var _1ef=null;
var _1f0=true;
var _1f1=0;
var _1f2=null;
for(var j=0;j<this.rowspan;j++){
for(var i=this.colspan-1;i>=0;i--){
_1ef=this.globColumns[i].regions[j];
if(_1ef.regionType!=ws.calendar.GlobLayout.REGION_CONTENT){
continue;
}
_1f1=j+_1ef.rowspan;
for(var k=i+1;k<this.colspan;k++){
_1f0=true;
for(var l=j;l<_1f1;l++){
_1f2=this.globColumns[k].regions[l];
if(_1f2.regionType!=ws.calendar.GlobLayout.REGION_PADDING){
_1f0=false;
break;
}
}
if(!_1f0){
break;
}
_1ef.colspan++;
for(var l=j;l<_1f1;l++){
this.globColumns[k].regions[l]=ws.calendar.GlobLayout.Filler;
}
}
}
}
}
if(this.overflow){
this.overflowRegion.rowspan=this.rowspan;
}
this.finalized=true;
}});
ws.calendar.GlobLayout.PaddingGlob={globType:ws.calendar.GlobLayout.GLOB_PADDING};
_1.declare("ws.calendar.GlobLayout.DayGrid",null,{initializer:function(_1f6,_1f7,_1f8){
this.startDay=_1f6;
this.dayColumn=_1f7;
this.globLayoutConfig=_1f8;
this.globs=new Array();
this.finalized=false;
this.lastUsedGlobIndex=0;
},willFit:function(_1f9){
if(!(_1f9.startDay<=this.startDay)&&!(_1f9.endDay>=this.startDay)){
return false;
}else{
return true;
}
},addRegion:function(_1fa){
var _1fb=false;
var _1fc=true;
var g=null;
for(var i=this.lastUsedGlobIndex;i<this.globs.length;i++){
g=this.globs[i];
if(g==null){
continue;
}
if(g.willFit(_1fa)){
_1fb=g.addRegion(_1fa);
if(!_1fb){
_1fc=false;
}
this.lastUsedGlobIndex=i;
break;
}
}
if(!_1fb&&_1fc){
var _1ff=new ws.calendar.GlobLayout.ContentGlob(_1fa.startTimeInMinutes,this.globLayoutConfig);
_1fb=_1ff.addRegion(_1fa);
if(_1fb){
if(g!=null){
var diff=_1ff.start-g.end;
var _201=diff/this.globLayoutConfig.gridInterval;
for(var i=0;i<_201;i++){
this.globs[this.globs.length]=ws.calendar.GlobLayout.PaddingGlob;
}
}
this.globs[this.globs.length]=_1ff;
this.lastUsedGlobIndex=this.globs.length-1;
}
}
return _1fb;
},finalize:function(){
for(var i=0;i<this.globs.length;i++){
if(this.globs[i].globType==ws.calendar.GlobLayout.GLOB_CONTENT){
this.globs[i].finalize();
}
}
this.finalized=true;
}});
_1.declare("ws.calendar.GlobLayout.MultidayGrid",null,{initializer:function(_203,_204,_205){
this.startDay=_203;
this.endDay=_204;
this.globLayoutConfig=_205;
this.dayGrids=new Array();
var _206=_204-_203+1;
for(var i=0;i<_206;i++){
this.dayGrids[i]=new ws.calendar.GlobLayout.DayGrid(_203+i,i,this.globLayoutConfig);
}
this.finalized=false;
this.lastUsedDayGridIndex=0;
},addComponent:function(_208,_209){
this.lastUsedDayGridIndex=_209-this.startDay;
var _20a=false;
var _20b=null;
for(var i=this.lastUsedDayGridIndex;i<this.dayGrids.length;i++){
_20b=new ws.calendar.GlobLayout.Content(_208,this.startDay+i,this.globLayoutConfig);
if(!this.dayGrids[i].willFit(_20b)){
continue;
}
_20a=this.dayGrids[i].addRegion(_20b);
this.lastUsedDayGridIndex=i;
break;
}
return _20a;
},finalize:function(){
for(var i=0;i<this.dayGrids.length;i++){
this.dayGrids[i].finalize();
}
this.finalized=true;
}});
_1.provide("ws.calendar.GridViewWidget");
_1.require("dojo.widget.*");
_1.require("dojo.event.*");
_1.require("dojo.html.style");
_1.require("ws.date");
_1.require("ws.style");
_1.require("ws.debug");
_1.require("ws.calendar.CalendarDragAndDrop");
_1.require("ws.calendar.calutil");
_1.widget.defineWidget("ws.calendar.GridViewWidget",_1.widget.HtmlWidget,{templateString:"<div class=\"WSGridView\">\r\n\t<div dojoAttachPoint=\"headContainer\" class=\"headContainer\"></div>\r\n\t<div dojoAttachPoint=\"bodyContainer\" class=\"bodyContainer\"></div>\r\n</div>\r\n",templateCssString:".WSGridView\r\n{\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\toverflow: hidden;\r\n}\r\n\r\n.WSGridView .headContainer\r\n{\r\n\theight: 25px;\r\n\t/*border-top: 1px solid #ADAAA6;*/\r\n}\r\n\r\n.WSGridView .bodyContainer\r\n{\r\n\tposition: relative;\r\n\toverflow: auto;\r\n\t/*border-top: 1px solid #ADAAA6;*/\r\n}\r\n\r\n.WSGridView table\r\n{\r\n\ttable-layout: fixed;\r\n\t/* An initial width must be set to make all columns size equally! */\r\n\t/* This will be resized at runtime to be 100% - scrollWidth.      */\r\n\twidth: 100%;\r\n}\r\n\r\n.WSGridView .headCell\r\n{\r\n\theight: 25px;\r\n\ttext-align: center;\r\n\tborder-right: 1px solid black;\r\n\twhite-space: nowrap;\r\n}\r\n\r\n.WSGridView .headCell .dayName\r\n{\r\n\tfont-size: large;\r\n}\r\n\r\n.WSGridView .bodyCell\r\n{\r\n\theight: 100px;\r\n\ttext-align: right;\r\n\twhite-space: nowrap;\r\n\tvertical-align: top;\r\n\tborder-right: 1px solid #ADAAA6;\r\n\tborder-bottom: 1px solid #ADAAA6;\r\n\tcolor: #ADAAA6;\r\n}\r\n\r\n.WSGridView .bodyCellToday\r\n{\r\n\tbackground-color: #FFF2D9;\r\n}\r\n/* Safari fix - need to add top border to fix BLT 327225 */\r\n.dj_safari .WSGridView .bodyCellToday\r\n{\r\n\tborder-top: 1px solid #ADAAA6;\r\n}\r\n\r\n.WSGridView .bodyCellNotCurrentMonth\r\n{\r\n\tbackground-color: #EDEBE8;\r\n}\r\n/* Safari fix - need to add top border to fix BLT 327225 */\r\n.dj_safari .WSGridView .bodyCellNotCurrentMonth\r\n{\r\n\tborder-top: 1px solid #ADAAA6;\r\n}\r\n\r\n\r\n.WSGridView .bodyCell .dayNumber\r\n{\r\n\tpadding-right: 4px;\r\n\tcolor: #6D6560;\r\n\tfont-weight: bold;\r\n}\r\n\r\n.WSGridView .bodyCell .dayName\r\n{\r\n\tfloat: left;\r\n\tpadding-left: 2px;\r\n\tfont-size: large;\r\n\tcolor: #ADAAA6;\r\n}\r\n\r\n.WSGridView .component, .WSGridView .componentReadOnly\r\n{\r\n\tposition: absolute;\r\n\toverflow: hidden;\r\n\twhite-space: nowrap;\r\n\tcolor: #FFFFFF;\r\n\tborder: none;\r\n\tfont-size: 11px;\r\n}\r\n\r\n.WSGridView .component\r\n{\r\n\tcursor: pointer;\r\n}\r\n\r\n.WSGridView .componentReadOnly\r\n{\r\n\tcursor: pointer;\r\n\tcursor: hand;\r\n}\r\n\r\n.WSGridView .overflow\r\n{\r\n\tposition: absolute;\r\n\toverflow: hidden;\r\n\twhite-space: nowrap;\r\n\ttext-align: center;\r\n\tcolor: #FFFFFF;\r\n\tbackground-color: #CCCCCC;\r\n\tcursor: pointer;\r\n\tcursor: hand;\r\n\tfont-size: 11px;\r\n}\r\n\r\n.WSGridView .dropIndicator, .WSGridView .clickIndicator\r\n{\r\n\tposition: absolute;\r\n\tz-index: 799;\r\n\t/*border: 1px solid #E4EDFA;*/\r\n}\r\n\r\n.WSGridView .selectedCell\r\n{\r\n\tbackground-color: #E4EDFA;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/calendar/GridViewWidget.css"),scrollWidth:25,dragType:ws.calendar.CalendarDragAndDrop.TYPE_GRIDVIEWMOVE,columnView:false,timeFormatRange1:Config.Strings.CalTimeFormatRange1,timeFormatRange2:Config.Strings.CalTimeFormatRange2,mouseDelay:500,rows:6,columns:7,showGridHead:false,showDayInfo:false,showTimeLabel:false,fillInTemplate:function(){
this.targetDate=null;
this.gridHeadDateFormat="E";
this.divPool=new Array();
this.dragSources=new Array();
this.timeLabelWidth=0;
this.cellWidths=null;
this.cellOffsets=null;
this.cellHeaderHeight=0;
this.rowHeight=0;
this.cellPadBorderWidth=0;
this.cellPadBorderHeight=0;
this.spacing=1;
this.componentTemplate=null;
this.componentHeight=0;
this.oldContainerWidth=0;
this.fillInGridHead();
this.fillInGridBody();
},fillInGridHead:function(){
if(!this.showGridHead){
this.headContainer.style.display="none";
return;
}
var _20e=new Array();
_20e.push("<table border='0' cellpadding='0' cellspacing='0'>");
_20e.push("<tr>");
if(this.showTimeLabel){
_20e.push("<td class='headCell labelCell'>&nbsp;</td>");
}
var d=ws.date.getFirstDayOfWeek(new Date());
for(var i=0;i<this.columns;i++){
_20e.push("<td class='headCell'>");
_20e.push("<span class='dayName'>");
_20e.push(ws.date.formatDateTime(d,this.gridHeadDateFormat));
_20e.push("</span>");
_20e.push("</td>");
d=ws.date.add(d,ws.date.dateParts.DAY,1);
}
_20e.push("</tr>");
_20e.push("</table>");
this.headContainer.innerHTML=_20e.join("");
},fillInGridBody:function(){
var _211=new Array();
_211.push("<table border='0' cellpadding='0' cellspacing='0'>");
for(var i=0;i<this.rows;i++){
_211.push("<tr>");
if(this.showTimeLabel){
_211.push("<td class='bodyCell labelCell'><div style='height: 100%;'></div></td>");
}
for(var j=0;j<this.columns;j++){
_211.push("<td class='bodyCell'>");
_211.push("<div style='height: 100%; margin-top: 3px;'>");
if(this.showDayInfo){
_211.push("<span class='dayName'>");
if(!this.showGridHead&&(i==0)){
_211.push(ws.date.abbrevDays[(ws.date.firstDayOfWeek+j)%this.columns]);
_211.push("&nbsp;");
}
_211.push("</span>");
_211.push("<span class='dayNumber'></span>");
}
_211.push("</div>");
_211.push("</td>");
}
_211.push("</tr>");
}
_211.push("</table>");
this.bodyContainer.innerHTML=_211.join("");
},postCreate:function(args,frag){
var _216=this.domNode.getElementsByTagName("table");
if(this.showGridHead){
this.gridHead=_216[0];
this.gridBody=_216[1];
}else{
this.gridBody=_216[0];
}
var drh=_1.render.html;
this.componentTemplate=document.createElement("div");
this.componentTemplate.className="component";
var str="Do Not Localize";
if(drh.ie||drh.safari){
this.componentTemplate.innerText=str;
}else{
this.componentTemplate.textContent=str;
}
this.componentTemplate.style.left="0px";
this.componentTemplate.style.top="0px";
this.componentTemplate.style.visibility="hidden";
this.bodyContainer.appendChild(this.componentTemplate);
this.initDnD();
_1.event.connect("after",this.clickAction,"onClick",this,"onClick");
},initDnD:function(){
var _219=ws.calendar.CalendarDragAndDrop;
new ws.calendar.GridViewDropTarget(this.gridBody,[_219.TYPE_GRIDVIEWMOVE],this,this.gridBody,this.bodyContainer);
this.clickAction=new ws.calendar.CalendarClickAction(this.gridBody,this,this.gridBody,this.bodyContainer);
this.clickAction.rowHeight=1;
},updateGridHead:function(){
if(!this.showGridHead){
return;
}
var drh=_1.render.html;
var d=this.getFirstDateInView();
var row=this.gridHead.rows[0];
var cell=null;
var i=0;
var c=this.columns;
var text=null;
if(this.showTimeLabel){
i+=1;
c+=1;
}
for(;i<c;i++){
cell=row.cells[i];
text=ws.date.formatDateTime(d,this.gridHeadDateFormat);
if(drh.ie||drh.safari){
cell.childNodes[0].innerText=text;
}else{
cell.childNodes[0].textContent=text;
}
d=ws.date.add(d,ws.date.dateParts.DAY,1);
}
},updateGridBody:function(){
if(!this.showDayInfo){
return;
}
var drh=_1.render.html;
var d=this.getFirstDateInView();
var _223=new Date();
var _224=new Date(_223.getFullYear(),_223.getMonth(),_223.getDate());
var _225=false;
var row=null;
var cell=null;
var text=null;
for(var i=0;i<this.rows;i++){
row=this.gridBody.rows[i];
var j=0;
var c=this.columns;
if(this.showTimeLabel){
j+=1;
c+=1;
}
for(;j<c;j++){
cell=row.cells[j];
text=d.getDate();
if(drh.ie||drh.safari){
cell.childNodes[0].childNodes[1].innerText=text;
}else{
cell.childNodes[0].childNodes[1].textContent=text;
}
if(d.valueOf()==_224.valueOf()){
_1.html.addClass(cell,"bodyCellToday");
}else{
_1.html.removeClass(cell,"bodyCellToday");
}
if(d.getDate()>1&&!_225){
_1.html.addClass(cell,"bodyCellNotCurrentMonth");
}else{
if(d.getDate()==1&&!_225){
_1.html.removeClass(cell,"bodyCellNotCurrentMonth");
_225=true;
}else{
if(d.getDate()==1&&_225){
_1.html.addClass(cell,"bodyCellNotCurrentMonth");
_225=false;
}else{
_1.html.removeClass(cell,"bodyCellNotCurrentMonth");
}
}
}
d=ws.date.add(d,ws.date.dateParts.DAY,1);
}
}
},getMeasurements:function(){
var lat=new ws.debug.latometer(this.widgetType+".getMeasurements",true);
var row=this.gridBody.rows[0];
var _22e=row.cells;
this.cellOffsets=new Array();
this.cellWidths=new Array();
this.rowHeight=ws.style.getMarginBoxHeightFast(_22e[0]);
var _22f=_1.html.getPadBorder(_22e[0]);
this.cellPadBorderWidth=_22f.width;
this.cellPadBorderHeight=_22f.height;
var _230=0;
var i=0;
var c=this.columns;
if(this.showTimeLabel){
this.timeLabelWidth=ws.style.getMarginBoxWidthFast(_22e[0]);
i+=1;
c+=1;
}
if(this.showDayInfo){
this.cellHeaderHeight=ws.style.getMarginBoxHeightFast(_22e[i].childNodes[0].childNodes[0]);
}
var ai=0;
for(;i<c;i++){
this.cellOffsets[ai]=_230;
this.cellWidths[ai]=ws.style.getMarginBoxWidthFast(_22e[i]);
_230+=this.cellWidths[ai];
ai++;
}
this.componentHeight=ws.style.getMarginBoxHeightFast(this.componentTemplate);
lat.stop(true);
},drawComponents:function(){
if(!this.model||!this.model.isSuccess){
return;
}
var lat=new ws.debug.latometer(this.widgetType+".drawComponents",true);
var dei=ws.date.daysSpanned(this.model.dtstart,this.model.dtend);
var vsi=ws.date.daysSpanned(this.model.dtstart,this.getFirstDateInView());
var vei=ws.date.daysSpanned(this.model.dtstart,this.getLastDateInView());
if(vei>dei){
vei=dei;
}
var drh=_1.render.html;
var dbi=this.model.dayBucketIndex;
var _23a=this.model.calendarEnum;
var _23b=this.model.componentEnum;
var _23c=this.model.indexEnum;
var _23d=this.model.components;
var ccm=ws.style.componentColorMap;
var db=null;
var row=0;
var col=0;
var div=null;
var _243=null;
var _244=0;
var ci=null;
var comp=null;
var _247=null;
var cs=null;
var ce=null;
var _24a=0;
var x=0;
var y=0;
var _24d=0;
var _24e=0;
var _24f=null;
var _250=null;
var ft=ws.date.formatTime;
var _252=0;
var ds=ws.calendar.CalendarDragSource;
var _254=ws.calendar.CalendarDragAndDrop;
var c=this.columns;
if(this.showTimeLabel){
c+=1;
}
for(var i=vsi;i<=vei;i++){
if(i<0){
continue;
}
db=dbi[i];
row=Math.floor((i-vsi)/this.columns);
col=(i-vsi)%this.columns;
x=this.timeLabelWidth+this.cellOffsets[col]+this.spacing;
_24d=this.cellWidths[col]-this.cellPadBorderWidth-(this.spacing*2);
_24d=Math.max(_24d,0);
maxY=(this.rowHeight*(row+1))-this.componentHeight-this.cellPadBorderHeight;
_24e=0;
for(var j=0;j<db.length;j++){
ci=db[j];
comp=_23d[ci[_23c.id]];
_247=ci[_23c.id];
if(ci[_23c.rid]){
_247=_247+ci[_23c.rid];
}
if(!this.componentFilter(comp)){
continue;
}
div=this.divPool[_244];
_243=this.dragSources[_244];
if(!div){
this.divPool[_244]=document.createElement("div");
div=this.divPool[_244];
this.bodyContainer.appendChild(div);
this.dragSources[_244]=new ds(div,this.dragType,this,false,this.gridBody,this.bodyContainer);
_243=this.dragSources[_244];
_1.event.connect(div,"onclick",this,"componentClick");
_1.event.connect(div,"oncontextmenu",this,"onComponentRightClick");
}
_243.componentInstance=ci;
div.componentInstance=ci;
div.dayIndex=(row*this.columns)+col;
_244++;
y=this.cellHeaderHeight+(this.rowHeight*row)+(this.componentHeight*_24e)+(this.spacing*_24e);
if((y+this.componentHeight)>maxY){
_252=1;
for(var k=j+1;k<db.length;k++){
_252+=this.componentFilter(_23d[db[k][_23c.id]])?1:0;
}
_24f=_252+" "+Config.Strings.More;
if(drh.ie||drh.safari){
div.innerText=_24f;
}else{
div.textContent=_24f;
}
div.className="overflow";
div.style.left=x+"px";
div.style.top=maxY+"px";
div.style.width=_24d+"px";
div.style.color="";
div.style.backgroundColor="";
div.style.display="";
_243.componentInstance=null;
_243.disabled=true;
div.componentInstance=null;
break;
}
_24f=ws.calendar.calutil.DecodeHTMLEntities(comp[_23b.summary]);
if(comp[_23b.allDay]){
_24f=_24f;
}else{
_24f=ft(comp[_23b.start],this.timeFormatRange1,this.timeFormatRange2)+" "+_24f;
}
if(drh.ie||drh.safari){
div.innerText=_24f;
}else{
div.textContent=_24f;
}
if(this.model.calendars[comp[_23b.calid]][_23a.writable]){
div.className="component";
_243.disabled=false;
}else{
div.className="componentReadOnly";
_243.disabled=true;
}
div.style.left=x+"px";
div.style.top=y+"px";
div.style.width=_24d+"px";
_250=ccm[this.model.calendars[comp[_23b.calid]][_23a.color]];
if(comp[_23b.allDay]){
div.style.color="";
div.style.backgroundColor=_250.light;
}else{
div.style.color=_250.dark;
div.style.backgroundColor="";
}
div.style.display="";
_24e++;
}
}
var e=this.divPool.length;
for(var i=_244;i<e;i++){
this.divPool[i].style.display="none";
}
lat.stop(true);
},setModel:function(_25a){
this.model=_25a;
},setControllerWidget:function(_25b){
this.controllerWidget=_25b;
},setDate:function(_25c){
this.targetDate=_25c;
this.repaint();
},repaint:function(){
this.updateGridHead();
this.updateGridBody();
this.getMeasurements();
this.drawComponents();
},layout:function(){
this.onResized();
},cancelClick:function(){
this.clickAction.destroyClickIndicator();
},getFirstDateInView:function(){
var _25d=this.targetDate;
if(_25d==null){
_25d=new Date();
}
return ws.date.getFirstDayInMonthView(_25d);
},getLastDateInView:function(){
var _25e=this.targetDate;
if(_25e==null){
_25e=new Date();
}
return ws.date.getLastDayInMonthView(_25e);
},onResized:function(){
var lat=new ws.debug.latometer(this.widgetType+".onResized",true);
var _260=ws.style.getContentBoxWidthFast(this.domNode)-this.scrollWidth;
if(this.showGridHead){
ws.style.setMarginBoxWidthFast(this.gridHead,_260);
}
ws.style.setMarginBoxWidthFast(this.gridBody,_260);
var _261=ws.style.getContentBoxHeightFast(this.domNode)-ws.style.getMarginBoxHeightFast(this.headContainer);
ws.style.setMarginBoxHeightFast(this.bodyContainer,_261);
lat.stop(true);
if(_260!=this.oldContainerWidth){
this.repaint();
}
this.oldContainerWidth=_260;
},componentFilter:function(_262){
if(_262[this.model.componentEnum.compType]!=0){
return false;
}
return true;
},inlineAddEvent:function(_263,args,_265,_266,_267){
_1.debug("GridViewWidget.inlineAddEvent()");
},quickView:function(args,_269,_26a,_26b){
_1.debug("GridViewWidget.quickView");
},hideQuickView:function(){
_1.debug("GridViewWidget.hideQuickView");
},deleteEvents:function(){
_1.debug("GridViewWidget.deleteEvents");
},onClick:function(e){
var args=null;
var date=null;
var _26f=false;
var _270=0;
for(var i=0;i<this.clickAction.row;i++){
_270+=this.columns;
}
_270+=this.clickAction.column;
date=ws.date.add(this.getFirstDateInView(),null,_270);
_1.debug(date);
args=this.model.getDefaultComponentArgs();
args.start=date;
var _272={};
if(this.clickAction.column<5){
_272={"TR":"TL"};
}else{
_272={"TL":"TR"};
}
var _273=this.gridBody.rows[this.clickAction.row].cells[this.clickAction.column];
this.inlineAddEvent(_26f,args,this.clickAction.clickIndicator,_272,[_273]);
e.stopPropagation();
},getEventArgs:function(comp,ci){
var args=this.model.getComponentArgs(comp);
args.rid=ci[this.model.indexEnum.rid];
if(args.rid){
args.start=ci[this.model.indexEnum.start];
args.end=ci[this.model.indexEnum.end];
if(comp[this.model.componentEnum.recurEnd]){
args.recurEnd=comp[this.model.componentEnum.recurEnd];
}
}else{
args.start=comp[this.model.componentEnum.start];
args.end=comp[this.model.componentEnum.end];
}
args.moreInfo=comp[this.model.componentEnum.moreInfo];
return args;
},componentClick:function(e){
_1.debug("componentClick");
if(ws.WebSuite.eventQuickViewWidget&&ws.WebSuite.eventQuickViewWidget.isShowing()){
ws.WebSuite.eventQuickViewWidget.closeCard();
}
var div=e.target;
var ci=div.componentInstance;
_1.debugShallow(div.dayIndex);
if(ci==null){
this.controllerWidget.targetDate=ws.date.add(this.getFirstDateInView(),ws.date.dateParts.DAY,div.dayIndex);
this.controllerWidget.selectDayView();
return;
}
var comp=this.model.components[ci[this.model.indexEnum.id]];
var args=this.getEventArgs(comp,ci);
var _27c={};
if(this.clickAction.column<5){
_27c={"TR":"TL"};
}else{
_27c={"TL":"TR"};
}
var _27d=this.model.calendars[comp[this.model.componentEnum.calid]][this.model.calendarEnum.writable];
this.quickView(args,_27d,div,{"BL":"TL"});
e.stopPropagation();
},onComponentRightClick:function(evt){
var _27f=this.getRightClickMenu();
if(_27f.isShowingNow){
_27f.div=null;
_27f.close();
}
var div=evt.target;
var ci=div.componentInstance;
if(ci==null){
return;
}
var comp=this.model.components[ci[this.model.indexEnum.id]];
_27f.calendar=this.model.calendars[comp[this.model.componentEnum.calid]];
var _283=_27f.calendar[this.model.calendarEnum.writable];
_27f.eventData=this.getEventArgs(comp,ci);
_27f.writable=_283;
_27f.div=div;
this.rightClickMenu.children[0].setDisabled(!_283);
this.rightClickMenu.children[2].setDisabled(!_283);
_27f.open(evt.pageX,evt.pageY,null,[]);
evt.preventDefault();
evt.stopPropagation();
},getRightClickMenu:function(){
if(!this.rightClickMenu){
var _284=[{caption:Config.Strings.Edit,onClick:ws.lang.hitch(this,"editEvent")},{caption:Config.Strings.Details,onClick:ws.lang.hitch(this,"viewEvent")},{caption:Config.Strings.Delete,onClick:ws.lang.hitch(this,"deleteEvent")},{separator:true},{caption:Config.Strings.CalCM_HideThisCalendar,onClick:ws.lang.hitch(this,"hideThisCalendar")},{caption:Config.Strings.ShowThisCalendarOnly,onClick:ws.lang.hitch(this,"showThisCalendarOnly")},{separator:true},{caption:Config.Strings.NewEventBtn,onClick:ws.lang.hitch(this,"addEvent")}];
this.rightClickMenu=ws.widget.createMenu(_284);
}
return this.rightClickMenu;
},viewEvent:function(){
if(this.rightClickMenu.writable){
this.editEvent();
}else{
this.quickView(this.rightClickMenu.eventData,this.rightClickMenu.writable,this.rightClickMenu.div,{"BL":"TL"});
}
},addEvent:function(){
this.controllerWidget.addEvent();
},editEvent:function(){
this.controllerWidget.editEvent(this.rightClickMenu.eventData);
},hideThisCalendar:function(){
var args=this.model.getCalendarArgs(this.rightClickMenu.calendar,false);
args.selected=false;
this.model.saveCalendar(args);
},showThisCalendarOnly:function(){
var _286=this.model.calendarEnum;
var _287=this.rightClickMenu.calendar[_286.id];
for(var _288 in this.model.calendars){
if(_288!=_287){
var cal=this.model.calendars[_288];
if(cal[_286.selected]){
var args=this.model.getCalendarArgs(cal,false);
args.selected=false;
this.model.saveCalendar(args);
}
}
}
},deleteEvent:function(){
this.controllerWidget.promptConfirmDelete(this.rightClickMenu.eventData);
}});
_1.provide("ws.calendar.UntimedViewWidget");
_1.require("ws.style");
_1.widget.defineWidget("ws.calendar.UntimedViewWidget",ws.calendar.GridViewWidget,{templateString:"<div class=\"WSUntimedView\">\r\n\t<div dojoAttachPoint=\"headContainer\" class=\"headContainer\"></div>\r\n\t<div dojoAttachPoint=\"bodyContainer\" class=\"bodyContainer\"></div>\r\n</div>\r\n",templateCssString:".WSUntimedView\r\n{\r\n\twidth: 100%;\r\n\toverflow: hidden;\r\n}\r\n\r\n.WSUntimedView .headContainer\r\n{\r\n\tborder: 1px solid black;\r\n}\r\n\r\n.WSUntimedView .bodyContainer\r\n{\r\n\tposition: relative;\r\n\toverflow: auto;\r\n\t/*height: 100px;*/\r\n}\r\n\r\n.WSUntimedView table\r\n{\r\n\ttable-layout: fixed;\r\n\t/* An initial width must be set to make all columns size equally! */\r\n\t/* This will be resized at runtime to be 100% - scrollWidth.      */\r\n\twidth: 100%;\r\n}\r\n\r\n.WSUntimedView .headCell\r\n{\r\n\theight: 25px;\r\n\ttext-align: center;\r\n\tborder-right: 1px solid black;\r\n\twhite-space: nowrap;\r\n}\r\n\r\n.WSUntimedView .headCell .dayName\r\n{\r\n\tfont-size: large;\r\n}\r\n\r\n.WSUntimedView .bodyCell\r\n{\r\n\theight: 100px;\r\n\ttext-align: right;\r\n\twhite-space: nowrap;\r\n\tvertical-align: top;\r\n\tborder-right: 1px solid #ADAAA6;\r\n\tborder-bottom: 2px solid #D8D6D3;\r\n\tcolor: #ADAAA6;\r\n}\r\n\r\n.WSUntimedView .bodyCellToday\r\n{\r\n\tbackground-color: #FFF2D9;\r\n}\r\n\r\n.WSUntimedView .bodyCellNotCurrentMonth\r\n{\r\n\tbackground-color: #EDEBE8;\r\n}\r\n\r\n.WSUntimedView .bodyCell .dayNumber\r\n{\r\n\tpadding-right: 4px;\r\n\tcolor: #6D6560;\r\n\tfont-weight: bold;\r\n}\r\n\r\n.WSUntimedView .bodyCell .dayName\r\n{\r\n\tfloat: left;\r\n\tpadding-left: 2px;\r\n\tfont-size: large;\r\n\tcolor: #ADAAA6;\r\n}\r\n\r\n.WSUntimedView .component, .WSUntimedView .componentReadOnly\r\n{\r\n\tposition: absolute;\r\n\toverflow: hidden;\r\n\twhite-space: nowrap;\r\n\tcolor: #FFFFFF;\r\n\tborder: none;\r\n}\r\n\r\n.WSUntimedView .component\r\n{\r\n\tcursor: pointer;\r\n}\r\n\r\n.WSUntimedView .componentReadOnly\r\n{\r\n\tcursor: pointer;\r\n\tcursor: hand;\r\n}\r\n\r\n.WSUntimedView .overflow\r\n{\r\n\tposition: absolute;\r\n\toverflow: hidden;\r\n\twhite-space: nowrap;\r\n\ttext-align: center;\r\n\tcolor: #FFFFFF;\r\n\tbackground-color: #CCCCCC;\r\n\tcursor: pointer;\r\n\tcursor: hand;\r\n}\r\n\r\n.WSGridView .dropIndicator, .WSGridView .clickIndicator\r\n{\r\n\tposition: absolute;\r\n\tz-index: 799;\r\n}\r\n\r\n.WSUntimedView .selectedCell\r\n{\r\n\tbackground-color: #E4EDFA;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/calendar/UntimedViewWidget.css"),dragType:ws.calendar.CalendarDragAndDrop.TYPE_UNTIMEDVIEWMOVE,columnView:false,fillInTemplate:function(){
this.targetDate=null;
this.timedViewTodayColumn=null;
this.gridHeadDateFormat="E d";
this.divPool=new Array();
this.dragSources=new Array();
this.timeLabelWidth=0;
this.cellWidths=null;
this.cellOffsets=null;
this.cellHeaderHeight=0;
this.rowHeight=0;
this.cellPadBorderWidth=0;
this.cellPadBorderHeight=0;
this.spacing=1;
this.componentTemplate=null;
this.componentHeight=0;
this.oldContainerWidth=0;
this.fillInGridHead();
this.fillInGridBody();
},initDnD:function(){
var _28b=ws.calendar.CalendarDragAndDrop;
new ws.calendar.GridViewDropTarget(this.gridBody,[_28b.TYPE_UNTIMEDVIEWMOVE,_28b.TYPE_COLUMNVIEWMOVE],this,this.gridBody,this.bodyContainer);
this.clickAction=new ws.calendar.CalendarClickAction(this.gridBody,this,this.gridBody,this.bodyContainer);
this.clickAction.rowHeight=1;
},updateGridBody:function(){
var d=this.getFirstDateInView();
var _28d=new Date();
var _28e=new Date(_28d.getFullYear(),_28d.getMonth(),_28d.getDate());
if(!this.showDayInfo){
if(d.valueOf()==_28e.valueOf()){
this.timedViewTodayColumn=(this.showTimeLabel)?1:0;
}
return;
}
var drh=_1.render.html;
var _290=false;
var row=null;
var cell=null;
var text=null;
for(var i=0;i<this.rows;i++){
row=this.gridBody.rows[i];
var j=0;
var c=this.columns;
if(this.showTimeLabel){
j+=1;
c+=1;
}
for(;j<c;j++){
cell=row.cells[j];
text=d.getDate();
if(drh.ie||drh.safari){
cell.childNodes[0].childNodes[1].innerText=text;
}else{
cell.childNodes[0].childNodes[1].textContent=text;
}
if(d.valueOf()==_28e.valueOf()){
_1.html.addClass(cell,"bodyCellToday");
this.timedViewTodayColumn=j;
}else{
_1.html.removeClass(cell,"bodyCellToday");
}
d=ws.date.add(d,ws.date.dateParts.DAY,1);
}
}
},getFirstDateInView:function(){
var _297=this.targetDate;
if(_297==null){
_297=new Date();
}
if(this.columns==1){
return _297;
}else{
return ws.date.getFirstDayOfWeek(_297);
}
},getLastDateInView:function(){
var _298=this.targetDate;
if(_298==null){
_298=new Date();
}
if(this.columns==1){
return _298;
}else{
return ws.date.getLastDayOfWeek(_298);
}
},onResized:function(){
var lat=new ws.debug.latometer(this.widgetType+".onResized",true);
var _29a=ws.style.getContentBoxWidthFast(this.domNode)-this.scrollWidth;
if(this.showGridHead){
ws.style.setMarginBoxWidthFast(this.gridHead,_29a);
}
ws.style.setMarginBoxWidthFast(this.gridBody,_29a);
var _29b=ws.style.getContentBoxHeightFast(this.domNode)-ws.style.getMarginBoxHeightFast(this.headContainer);
ws.style.setMarginBoxHeightFast(this.gridBody.rows[0].cells[0],_29b);
lat.stop(true);
if(_29a!=this.oldContainerWidth){
this.repaint();
}
this.oldContainerWidth=_29a;
},componentFilter:function(_29c){
var _29d=this.model.componentEnum;
if(_29c[_29d.compType]!=0){
return false;
}
if(!_29c[_29d.allDay]){
return false;
}
return true;
}});
_1.provide("ws.calendar.ColumnViewWidget");
_1.require("dojo.event.*");
_1.require("dojo.html.style");
_1.require("dojo.widget.*");
_1.require("ws.calendar.CalendarDragAndDrop");
_1.require("ws.calendar.calutil");
_1.require("ws.date");
_1.require("ws.debug");
_1.require("ws.string");
_1.require("ws.style");
_1.widget.defineWidget("ws.calendar.ColumnViewWidget",_1.widget.HtmlWidget,{templateString:"<div class=\"WSColumnView\">\r\n\t<div dojoAttachPoint=\"untimedContainer\" class=\"untimedContainer\"><div></div></div>\r\n\t<div dojoAttachPoint=\"timedContainer\" class=\"timedContainer\"></div>\r\n</div>\r\n",templateCssString:".WSColumnView\r\n{\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\toverflow: hidden;\r\n}\r\n\r\n.WSColumnView .untimedContainer\r\n{\r\n\toverflow: hidden;\r\n}\r\n\r\n.WSColumnView .timedContainer\r\n{\r\n\tposition: relative;\r\n\toverflow: auto;\r\n}\r\n\r\n.WSColumnView table\r\n{\r\n\ttable-layout: fixed;\r\n\t/* An initial width must be set to make all columns size equally! */\r\n\t/* This will be resized at runtime to be 100% - scrollWidth.      */\r\n\twidth: 100%;\r\n}\r\n\r\n.WSColumnView .labelCell\r\n{\r\n\twidth: 50px;\r\n\theight: 21px;\r\n\tvertical-align: top;\r\n\ttext-align: right;\r\n}\r\n\r\n.WSColumnView a.timeLabel\r\n{\r\n\tfont-family: arial;\r\n\tfont-size: 11px;\r\n\tcolor: #6D6560;\r\n\tfont-weight: bold;\r\n\ttext-decoration: none;\r\n}\r\n.WSColumnView a.timeLabel:visited { color: #6D6560; }\r\n.WSColumnView a.timeLabel:hover { text-decoration: underline; color: #6D6560; }\r\n\r\n/* event in day range, not at top of table, not at right of table */\r\n.WSColumnView .gridCellState0 {background-color: #FFFFFF; border-top: 1px solid #ADAAA6; border-right: 1px solid #ADAAA6;}\r\n/* event in day range, at top of table, not at right of table */\r\n.WSColumnView .gridCellState1 {background-color: #FFFFFF; border-right: 1px solid #ADAAA6;}\r\n/* event in day range, not at top of table, at right of table */\r\n.WSColumnView .gridCellState2 {background-color: #FFFFFF; border-top: 1px solid #ADAAA6; border-right: 1px solid #ADAAA6;}\r\n/* event in day range, at top of table, at right of table */\r\n.WSColumnView .gridCellState3 {background-color: #FFFFFF; border-right: 1px solid #ADAAA6;}\r\n/* event not in day range, not at top of table, not at right of table */\r\n.WSColumnView .gridCellState4 {background-color: #F3F3F3; border-top: 1px solid #ADAAA6; border-right: 1px solid #ADAAA6;}\r\n/* event not in day range, at top of table, not at right of table */\r\n.WSColumnView .gridCellState5 {background-color: #F3F3F3; border-right: 1px solid #ADAAA6;}\r\n/* event not in day range, not at top of table, at right of table */\r\n.WSColumnView .gridCellState6 {background-color: #F3F3F3; border-top: 1px solid #C4C4C4; border-right: 1px solid #ADAAA6;}\r\n/* event not in day range, at top of table, at right of table */\r\n.WSColumnView .gridCellState7 {background-color: #F3F3F3; border-right: 1px solid #ADAAA6;}\r\n\r\n.WSColumnView .gridCellToday {background-color: #FFF2D9;}\r\n.WSColumnView .gridCellCurrentTime {border-bottom: 2px solid #FFE096; height: 20px;}\r\n.WSColumnView .gridCellNoTopBorder {border-top: none;}\r\n.WSColumnView .noLabelCellNoTopBorder {border-top: none;}\r\n\r\n.WSColumnView .filler\r\n{\r\n\theight: 100%;\r\n\tpadding-top: 3px;\r\n\ttext-align: center;\r\n}\r\n\r\n.WSColumnView .noLabelCell { border-top: 1px dotted #E3E3E3; }\r\n\r\n.WSColumnView .component, .WSColumnView .componentReadOnly\r\n{\r\n\tposition: absolute;\r\n\toverflow: hidden;\r\n\tcolor: #FFFFFF;\r\n\tborder-width: 1px;\r\n\tborder-style: solid;\r\n\tfont-size: 11px;\r\n}\r\n\r\n.WSColumnView .component .moveHandle\r\n{\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tcursor: pointer;\r\n\tpadding: 5px 2px 5px 2px;\r\n}\r\n\r\n.WSColumnView .component .nHandle\r\n{\r\n\tposition: absolute;\r\n\tleft: 0px;\r\n\ttop: 0px;\r\n\twidth: 100%;\r\n\theight: 5px;\r\n\tcursor: n-resize;\r\n}\r\n\r\n.WSColumnView .component .sHandle\r\n{\r\n\tposition: absolute;\r\n\tleft: 0px;\r\n\tbottom: 0px;\r\n\twidth: 100%;\r\n\theight: 5px;\r\n\tcursor: s-resize;\r\n}\r\n\r\n.WSColumnView .overflow\r\n{\r\n\tposition: absolute;\r\n\toverflow: hidden;\r\n\twidth: 20px;\r\n\tcolor: #FFFFFF;\r\n\tbackground-color: #336699;\r\n\tcursor: pointer;\r\n\tcursor: hand;\r\n}\r\n\r\n.WSColumnView .dropIndicator, .WSColumnView .clickIndicator\r\n{\r\n\tposition: absolute;\r\n\tz-index: 799;\r\n}\r\n\r\n.WSColumnView .selectedCell\r\n{\r\n\tbackground-color: #E4EDFA;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/calendar/ColumnViewWidget.css"),MASK_TOP_BORDER:1,MASK_RIGHT_BORDER:2,MASK_OUTSIDE_RANGE:4,componentTemplateString:"<div class=\"moveHandle\"></div><div class=\"nHandle\"></div><div class=\"sHandle\"></div>",timeFormatRange1:Config.Strings.CalTimeFormatRange1,timeFormatRange2:Config.Strings.CalTimeFormatRange2,mouseDelay:500,scrollWidth:25,columnView:true,dayStart:Settings.CalendarDayStart,dayEnd:Settings.CalendarDayEnd,gridInterval:30,wholeInterval:60,rows:0,columns:0,showGridHead:false,showDayInfo:false,showTimeLabel:false,maxConflicts:7,fillInTemplate:function(){
this.targetDate=null;
this.rowHeight=0;
this.cellWidths=null;
this.cellOffsets=null;
this.timeLabelWidth=0;
this.divPool=new Array();
this.dragSources=new Array();
this.cellPadBorderWidth=0;
this.cellPadBorderHeight=0;
this.componentSample=null;
this.componentPadBorderWidth=0;
this.componentPadBorderHeight=0;
this.spacing=1;
this.overflowSample=null;
this.overflowWidth=0;
this.shouldScrollToFirst=true;
this.oldContainerWidth=0;
this.fillInUntimed();
this.fillInTimed();
},fillInUntimed:function(){
var _29e={rows:this.rows,columns:this.columns,showGridHead:this.showGridHead,showDayInfo:this.showDayInfo,showTimeLabel:this.showTimeLabel};
var el=this.untimedContainer.childNodes[0];
this.untimedViewWidget=_1.widget.createWidget("ws:UntimedViewWidget",_29e,el);
},fillInTimed:function(){
this.dayStart=Settings.CalendarDayStart;
this.dayEnd=Settings.CalendarDayEnd;
var _2a0=new Array();
_2a0.push("<table border='0' cellpadding='0' cellspacing='0'>");
var time=0;
var rows=Math.floor(1440/this.gridInterval);
var _2a3=false;
var _2a4=false;
var _2a5=0;
var _2a6=null;
var cell=null;
var id=null;
for(var row=0;row<rows;row++){
_2a0.push("<tr>");
_2a3=((time%this.wholeInterval)==0);
_2a4=((time<this.dayStart)||(time>=this.dayEnd));
_2a5=0;
id=(row==0)?row:(row*((this.showTimeLabel)?(this.columns+1):this.columns));
if(time==0){
_2a5|=this.MASK_TOP_BORDER;
}
if(_2a4){
_2a5|=this.MASK_OUTSIDE_RANGE;
}
if(_2a3){
_2a6=ws.date.formatMinutes(time,Config.Strings.CalTimeFormatRange2);
cell=ws.string.substituteParams("<td id=\"{0}\" class=\"labelCell gridCellState%{1}\"><div class=\"filler\"><a href=\"#\" class=\"timeLabel\">%{2}</a></div></td>",this.widgetId+id,_2a5,_2a6);
_2a0.push(cell);
}else{
cell=ws.string.substituteParams("<td id=\"{0}\" class=\"labelCell gridCellState%{1} noLabelCell\"><div class=\"filler\"></div></td>",this.widgetId+id,_2a5);
_2a0.push(cell);
}
for(var i=0;i<this.columns;i++){
_2a5=0;
if(time==0){
_2a5|=this.MASK_TOP_BORDER;
}
if(!_2a3){
_2a5|=this.MASK_TOP_BORDER;
}
if(_2a4){
_2a5|=this.MASK_OUTSIDE_RANGE;
}
if(i==this.columns-1){
_2a5|=this.MASK_RIGHT_BORDER;
}
id++;
if(!_2a3){
_2a0.push(ws.string.substituteParams("<td id=\"{0}\" class=\"gridCellState%{1} noLabelCell\">&nbsp;</td>",this.widgetId+id,_2a5));
}else{
_2a0.push(ws.string.substituteParams("<td id=\"{0}\" class=\"gridCellState%{1}\">&nbsp;</td>",this.widgetId+id,_2a5));
}
}
_2a0.push("</tr>");
time+=this.gridInterval;
}
_2a0.push("</table>");
this.timedContainer.innerHTML=_2a0.join("");
},postCreate:function(args,frag){
this.timedGrid=this.timedContainer.getElementsByTagName("table")[0];
var _2ad=ws.calendar.CalendarDragAndDrop;
new ws.calendar.CalendarDragSource(this.timedGrid,_2ad.TYPE_COLUMNVIEWDIRECTENTRY,this,true,this.timedGrid,this.timedContainer);
new ws.calendar.ColumnViewDropTarget(this.timedGrid,[_2ad.TYPE_UNTIMEDVIEWMOVE,_2ad.TYPE_COLUMNVIEWMOVE,_2ad.TYPE_COLUMNVIEWRESIZE,_2ad.TYPE_COLUMNVIEWDIRECTENTRY],this,this.timedGrid,this.timedContainer);
this.clickAction={untimedClickAction:this.untimedViewWidget.clickAction,timedClickAction:new ws.calendar.CalendarClickAction(this.timedGrid,this,this.timedGrid,this.timedContainer),destroyClickIndicator:function(){
this.untimedClickAction.destroyClickIndicator();
this.timedClickAction.destroyClickIndicator();
}};
this.clickAction.untimedClickAction.dependency=this.clickAction.timedClickAction;
this.clickAction.timedClickAction.dependency=this.clickAction.untimedClickAction;
this.componentSample=document.createElement("div");
this.componentSample.className="component";
this.componentSample.style.left="0px";
this.componentSample.style.top="0px";
this.componentSample.style.visibility="hidden";
this.timedContainer.appendChild(this.componentSample);
this.overflowSample=document.createElement("div");
this.overflowSample.className="overflow";
this.overflowSample.style.left="0px";
this.overflowSample.style.top="0px";
this.overflowSample.style.visibility="hidden";
this.timedContainer.appendChild(this.overflowSample);
_1.event.connect(this.clickAction.untimedClickAction,"onClick",this,"onClickUntimed");
_1.event.connect(this.clickAction.timedClickAction,"onClick",this,"onClickTimed");
_1.event.connect(this.untimedViewWidget,"quickView",this,"quickView");
_1.event.connect(this.untimedViewWidget,"hideQuickView",this,"hideQuickView");
},getMeasurements:function(){
var lat=new ws.debug.latometer(this.widgetType+".getMeasurements",true);
var row=this.timedGrid.rows[1];
this.cellOffsets=new Array();
this.cellWidths=new Array();
var _2b0=row.cells;
this.rowHeight=ws.style.getMarginBoxHeightFast(_2b0[0]);
this.timeLabelWidth=ws.style.getMarginBoxWidthFast(_2b0[0]);
this.cellPadBorderWidth=_1.html.getPadBorder(_2b0[0]).width;
this.cellPadBorderHeight=_1.html.getPadBorder(_2b0[0]).height;
var i=1;
var c=this.columns+1;
var ai=0;
var _2b4=0;
for(;i<c;i++){
this.cellOffsets[ai]=_2b4;
this.cellWidths[ai]=ws.style.getMarginBoxWidthFast(_2b0[i]);
_2b4+=this.cellWidths[ai];
ai++;
}
var _2b5=_1.html.getPadBorder(this.componentSample);
this.componentPadBorderWidth=_2b5.width;
this.componentPadBorderHeight=_2b5.height;
this.overflowWidth=ws.style.getMarginBoxWidthFast(this.overflowSample);
lat.stop(true);
},shadeTodayDate:function(){
var _2b6=(this.showTimeLabel)?(this.columns+1)*Math.floor(1440/this.gridInterval):this.columns*Math.floor(1440/this.gridInterval);
var _2b7;
if(this.untimedViewWidget.timedViewTodayColumn===null){
if(!this.doResetView){
return;
}
for(var i=0;i<_2b6;i++){
_1.html.removeClass(_1.byId(this.widgetId+i),"gridCellToday");
_1.html.removeClass(_1.byId(this.widgetId+i),"gridCellCurrentTime");
_2b7=i+(this.showTimeLabel?this.columns+1:this.columns);
if(_2b7<_2b6){
if(_1.html.hasClass(_1.byId(this.widgetId+_2b7),"noLabelCellNoTopBorder")){
_1.html.replaceClass(_1.byId(this.widgetId+_2b7),"noLabelCell","noLabelCellNoTopBorder");
}else{
_1.html.removeClass(_1.byId(this.widgetId+_2b7),"gridCellNoTopBorder");
}
}
}
this.doResetView=false;
}else{
this.doResetView=true;
var _2b9=new Date();
var _2ba=_2b9.getHours()*2-1;
var _2bb=_2b9.getMinutes()/this.gridInterval;
var _2bc=_2b9.getMinutes()%this.gridInterval;
var _2bd=_2bc/Math.round(this.gridInterval/2);
if(_2bb<1){
if(_2bd>=1){
_2ba++;
}
}else{
_2ba++;
if(_2bd>=1){
_2ba++;
}
}
if(_2ba<0){
_2ba=Math.floor(1440/this.gridInterval)-1;
}
var _2be=_2ba*((this.showTimeLabel)?(this.columns+1):this.columns);
var _2bf={};
for(var i=0;i<((this.showTimeLabel)?(this.columns+1):this.columns);i++){
_2bf[_2be++]=true;
}
var _2c0=this.untimedViewWidget.timedViewTodayColumn;
if(this.columns==1){
for(var i=0;i<_2b6;i++){
_2b7=i+(this.showTimeLabel?this.columns+1:this.columns);
if(i in _2bf){
_1.html.addClass(_1.byId(this.widgetId+i),"gridCellCurrentTime");
if(_2b7<_2b6){
if(_1.html.hasClass(_1.byId(this.widgetId+_2b7),"noLabelCell")){
_1.html.replaceClass(_1.byId(this.widgetId+_2b7),"noLabelCellNoTopBorder","noLabelCell");
}else{
_1.html.addClass(_1.byId(this.widgetId+_2b7),"gridCellNoTopBorder");
}
}
}else{
_1.html.removeClass(_1.byId(this.widgetId+i),"gridCellCurrentTime");
if(_2b7<_2b6){
if(_1.html.hasClass(_1.byId(this.widgetId+_2b7),"noLabelCellNoTopBorder")){
_1.html.replaceClass(_1.byId(this.widgetId+_2b7),"noLabelCell","noLabelCellNoTopBorder");
}else{
_1.html.removeClass(_1.byId(this.widgetId+_2b7),"gridCellNoTopBorder");
}
}
}
}
}else{
for(var i=0;i<_2b6;i++){
if(i==_2c0){
_1.html.addClass(_1.byId(this.widgetId+i),"gridCellToday");
_2c0+=(this.showTimeLabel)?this.columns+1:this.columns;
}else{
_1.html.removeClass(_1.byId(this.widgetId+i),"gridCellToday");
}
_2b7=i+(this.showTimeLabel?this.columns+1:this.columns);
if(i in _2bf){
_1.html.addClass(_1.byId(this.widgetId+i),"gridCellCurrentTime");
if(_2b7<_2b6){
if(_1.html.hasClass(_1.byId(this.widgetId+_2b7),"noLabelCell")){
_1.html.replaceClass(_1.byId(this.widgetId+_2b7),"noLabelCellNoTopBorder","noLabelCell");
}else{
_1.html.addClass(_1.byId(this.widgetId+_2b7),"gridCellNoTopBorder");
}
}
}else{
_1.html.removeClass(_1.byId(this.widgetId+i),"gridCellCurrentTime");
if(_2b7<_2b6){
if(_1.html.hasClass(_1.byId(this.widgetId+_2b7),"noLabelCellNoTopBorder")){
_1.html.replaceClass(_1.byId(this.widgetId+_2b7),"noLabelCell","noLabelCellNoTopBorder");
}else{
_1.html.removeClass(_1.byId(this.widgetId+_2b7),"gridCellNoTopBorder");
}
}
}
}
}
this.untimedViewWidget.timedViewTodayColumn=null;
}
},drawComponents:function(){
if(!this.model||!this.model.isSuccess){
return;
}
var lat=new ws.debug.latometer(this.widgetType+".drawComponents",true);
var vs=this.getFirstDateInView();
var ve=this.getLastDateInView();
var sd=vs.getTime()-(vs.getTimezoneOffset()*60000);
sd=Math.floor(sd/86400000);
var ed=ve.getTime()-(ve.getTimezoneOffset()*60000);
ed=Math.floor(ed/86400000);
var glc=new ws.calendar.GlobLayout.Config(this.gridInterval,this.maxConflicts,this.model);
var MDG=new ws.calendar.GlobLayout.MultidayGrid(sd,ed,glc);
var dei=ws.date.daysSpanned(this.model.dtstart,this.model.dtend);
var vsi=ws.date.daysSpanned(this.model.dtstart,vs);
var vei=ws.date.daysSpanned(this.model.dtstart,ve);
if(vei>dei){
vei=dei;
}
var dbi=this.model.dayBucketIndex;
var _2cc=this.model.calendarEnum;
var _2cd=this.model.componentEnum;
var _2ce=this.model.indexEnum;
var _2cf=this.model.components;
var db=null;
var ci=null;
var comp=null;
var _2d3=0;
for(var i=vsi;i<=vei;i++){
if(i<0){
continue;
}
db=dbi[i];
_2d3=sd+(i-vsi);
for(var j=0;j<db.length;j++){
ci=db[j];
comp=_2cf[ci[_2ce.id]];
if(comp[_2cd.allDay]){
continue;
}
MDG.addComponent(ci,_2d3);
}
}
MDG.finalize();
var _2d6=1440;
var _2d7=0;
var _2d8=0;
var _2d9=null;
var glob=null;
var _2db=null;
var _2dc=null;
var _2dd=0;
var _2de=0;
var _2df=0;
var _2e0=0;
var x=0;
var y=0;
var _2e3=0;
var _2e4=0;
var div=null;
var _2e6=null;
var _2e7=null;
var drh=_1.render.html;
var gl=ws.calendar.GlobLayout;
var ccm=ws.style.componentColorMap;
var _2eb=MDG.dayGrids.length;
var _2ec=0;
var _2ed=0;
var _2ee=0;
var _2ef=null;
var ft=ws.date.formatTime;
var ds=ws.calendar.CalendarDragSource;
var _2f2=ws.calendar.CalendarDragAndDrop;
for(var i=0;i<_2eb;i++){
_2d9=MDG.dayGrids[i];
_2ec=_2d9.globs.length;
for(var j=0;j<_2ec;j++){
glob=_2d9.globs[j];
if(glob.globType!=gl.GLOB_CONTENT){
continue;
}
_2ed=glob.globColumns.length;
_2dd=this.timeLabelWidth+this.cellOffsets[i];
_2de=this.rowHeight*(glob.start/this.gridInterval);
_2df=glob.overflow?this.cellWidths[i]-this.overflowWidth:this.cellWidths[i];
_2df-=this.cellPadBorderWidth;
_2e0=Math.floor(_2df/_2ed);
for(var k=0;k<_2ed;k++){
_2db=glob.globColumns[k];
_2ee=_2db.regions.length;
for(var l=0;l<_2ee;l++){
_2dc=_2db.regions[l];
if(_2dc.regionType!=gl.REGION_CONTENT){
continue;
}
x=_2dd+(_2e0*k);
y=this.rowHeight*(_2dc.startTimeInMinutes/this.gridInterval);
if((k+_2dc.colspan)==_2ed){
_2e3=_2df-(_2e0*k);
}else{
_2e3=(_2e0*_2dc.colspan)-this.spacing;
}
_2e3-=this.componentPadBorderWidth;
_2e4=(this.rowHeight*_2dc.rowspan)-this.componentPadBorderHeight-this.cellPadBorderHeight;
if((_2e3<0)||(_2e4<0)){
continue;
}
div=this.divPool[_2d8];
_2e6=this.dragSources[_2d8];
if(!div){
div=document.createElement("div");
div.innerHTML=this.componentTemplateString;
this.divPool[_2d8]=div;
this.timedContainer.appendChild(div);
this.dragSources[_2d8]=[new ds(div.childNodes[0],_2f2.TYPE_COLUMNVIEWMOVE,this,false,this.timedGrid,this.timedContainer),new ds(div.childNodes[1],_2f2.TYPE_COLUMNVIEWRESIZE,this,true,this.timedGrid,this.timedContainer),new ds(div.childNodes[2],_2f2.TYPE_COLUMNVIEWRESIZE,this,true,this.timedGrid,this.timedContainer)];
_2e6=this.dragSources[_2d8];
_1.event.connect(div,"onclick",this,"componentClick");
_1.event.connect(div,"oncontextmenu",this,"onComponentRightClick");
}
_2d8++;
_2e7=ws.calendar.calutil.DecodeHTMLEntities(_2dc.component[_2cd.summary]);
_2e7=ft(_2dc.component[_2cd.start],this.timeFormatRange1,this.timeFormatRange2)+" "+_2e7;
if(drh.ie||drh.safari){
div.childNodes[0].innerText=_2e7;
}else{
div.childNodes[0].textContent=_2e7;
}
if(this.model.calendars[_2dc.component[_2cd.calid]][_2cc.writable]){
div.className="component";
_2e6[0].componentInstance=_2dc.componentInstance;
_2e6[1].componentInstance=_2dc.componentInstance;
_2e6[2].componentInstance=_2dc.componentInstance;
_2e6[0].disabled=false;
_2e6[1].disabled=false;
_2e6[2].disabled=false;
}else{
div.className="componentReadOnly";
_2e6[0].componentInstance=null;
_2e6[1].componentInstance=null;
_2e6[2].componentInstance=null;
_2e6[0].disabled=true;
_2e6[1].disabled=true;
_2e6[2].disabled=true;
}
div.componentInstance=_2dc.componentInstance;
div.dayIndex=i;
div.style.left=x+"px";
div.style.top=y+"px";
div.style.width=_2e3+"px";
div.style.height=_2e4+"px";
_2ef=ccm[_2dc.color];
div.style.backgroundColor=_2ef.light;
div.style.borderColor=_2ef.border;
div.style.display="";
}
}
if(glob.overflow){
div=this.divPool[_2d8];
_2e6=this.dragSources[_2d8];
if(!div){
div=document.createElement("div");
div.innerHTML=this.componentTemplateString;
this.divPool[_2d8]=div;
this.timedContainer.appendChild(div);
this.dragSources[_2d8]=[new ds(div.childNodes[0],_2f2.TYPE_COLUMNVIEWMOVE,this,false,this.timedGrid,this.timedContainer),new ds(div.childNodes[1],_2f2.TYPE_COLUMNVIEWRESIZE,this,true,this.timedGrid,this.timedContainer),new ds(div.childNodes[2],_2f2.TYPE_COLUMNVIEWRESIZE,this,true,this.timedGrid,this.timedContainer)];
_2e6=this.dragSources[_2d8];
_1.event.connect(div,"onclick",this,"componentClick");
_1.event.connect(div,"oncontextmenu",this,"onComponentRightClick");
}
_2e6[0].componentInstance=null;
_2e6[1].componentInstance=null;
_2e6[2].componentInstance=null;
_2e6[0].disabled=true;
_2e6[1].disabled=true;
_2e6[2].disabled=true;
div.componentInstance=null;
div.dayIndex=i;
_2d8++;
_2e7="||>";
if(drh.ie||drh.safari){
div.childNodes[0].innerText=_2e7;
}else{
div.childNodes[0].textContent=_2e7;
}
div.className="overflow";
div.style.left=(_2dd+this.cellWidths[i]-this.overflowWidth-this.cellPadBorderWidth)+"px";
div.style.top=_2de+"px";
div.style.width="";
div.style.height=((this.rowHeight*glob.rowspan)-this.cellPadBorderHeight)+"px";
div.style.backgroundColor="";
div.style.display="";
}
if(glob.start<_2d6){
_2d6=glob.start;
_2d7=this.rowHeight*(_2d6/this.gridInterval);
}
}
}
var _2f5=this.divPool.length;
for(var i=_2d8;i<_2f5;i++){
this.divPool[i].style.display="none";
this.dragSources[i].disabled=true;
}
if(this.shouldScrollToFirst){
if((_2d7==0)&&(_2d8==0)){
_2d7=this.rowHeight*(this.dayStart/this.gridInterval);
}
this.timedContainer.scrollTop=_2d7;
}
lat.stop(true);
},setModel:function(_2f6){
this.untimedViewWidget.setModel(_2f6);
this.model=_2f6;
},setControllerWidget:function(_2f7){
this.untimedViewWidget.setControllerWidget(_2f7);
this.controllerWidget=_2f7;
},setDate:function(_2f8){
this.untimedViewWidget.setDate(_2f8);
this.targetDate=_2f8;
this.repaint();
},repaint:function(){
this.getMeasurements();
this.shadeTodayDate();
this.updateDayHour();
this.drawComponents();
},layout:function(){
this.onResized();
},cancelClick:function(){
this.clickAction.destroyClickIndicator();
},getFirstDateInView:function(){
var _2f9=this.targetDate;
if(_2f9==null){
_2f9=new Date();
}
if(this.columns==1){
return _2f9;
}else{
return ws.date.getFirstDayOfWeek(_2f9);
}
},getLastDateInView:function(){
var _2fa=this.targetDate;
if(_2fa==null){
_2fa=new Date();
}
if(this.columns==1){
return _2fa;
}else{
return ws.date.getLastDayOfWeek(_2fa);
}
},onResized:function(){
this.untimedViewWidget.onResized();
var _2fb=ws.style.getContentBoxWidthFast(this.domNode)-this.scrollWidth;
ws.style.setMarginBoxWidthFast(this.timedGrid,_2fb);
var _2fc=ws.style.getContentBoxHeightFast(this.domNode)-ws.style.getMarginBoxHeightFast(this.untimedContainer);
ws.style.setMarginBoxHeightFast(this.timedContainer,_2fc);
if(_2fb!=this.oldContainerWidth){
this.repaint();
}
this.oldContainerWidth=_2fb;
},inlineAddEvent:function(_2fd,args,_2ff,_300,_301){
_1.debug("ColumnViewWidget.inlineAddEvent()");
},quickView:function(args,_303,_304,_305){
_1.debug("ColumnViewWidget.quickView");
},hideQuickView:function(){
_1.debug("ColumnViewWidget.hideQuickView");
},deleteEvents:function(){
_1.debug("ColumnViewWidget.deleteEvents");
},onClickUntimed:function(e){
_1.debug("click Untimed");
var args=null;
var date=null;
var _309=false;
var _30a=0;
_1.debug("Row is: "+this.clickAction.untimedClickAction.row);
_1.debug("Column is: "+this.clickAction.untimedClickAction.column);
_30a+=this.clickAction.untimedClickAction.column;
date=ws.date.add(this.getFirstDateInView(),null,_30a);
_1.debug(date);
args=this.model.getDefaultComponentArgs();
args.start=date;
var _30b={};
if(this.columns==1){
_30b={"BL":"TL"};
}else{
if(this.clickAction.untimedClickAction.column<5){
_30b={"TR":"TL"};
}else{
_30b={"TL":"TR"};
}
}
var col=this.showTimeLabel?(this.clickAction.untimedClickAction.column+1):this.clickAction.untimedClickAction.column;
var _30d=this.untimedViewWidget.gridBody.rows[this.clickAction.untimedClickAction.row].cells[col];
this.inlineAddEvent(_309,args,this.clickAction.untimedClickAction.clickIndicator,_30b,[_30d]);
e.stopPropagation();
},onClickTimed:function(e){
_1.debug("click Timed");
var args=null;
var date=null;
var _311=true;
var _312=0;
var sd=null;
_1.debug("Row is: "+this.clickAction.timedClickAction.row);
_1.debug("Column is: "+this.clickAction.timedClickAction.column);
_312+=this.clickAction.timedClickAction.column;
sd=new Date(this.getFirstDateInView());
sd.setHours(0,0,0,0);
date=ws.date.add(sd,ws.date.dateParts.DAY,_312);
date=ws.date.add(date,ws.date.dateParts.MINUTE,this.clickAction.timedClickAction.row*this.gridInterval);
_1.debug(date);
args=this.model.getDefaultComponentArgs();
args.start=date;
args.end=ws.date.add(date,ws.date.dateParts.MINUTE,60);
args.allDay=false;
var _314={};
if(this.columns==1){
_314={"BL":"TL"};
}else{
if(this.clickAction.timedClickAction.column<5){
_314={"TR":"TL"};
}else{
_314={"TL":"TR"};
}
}
var _315=[];
var cell=(this.showTimeLabel?((this.columns+1)*this.clickAction.timedClickAction.row+(this.clickAction.timedClickAction.column+1)):(this.columns*this.clickAction.timedClickAction.row+this.clickAction.timedClickAction.column));
_315.push(this.widgetId+cell);
cell+=this.showTimeLabel?(this.columns+1):this.columns;
_315.push(this.widgetId+cell);
this.inlineAddEvent(_311,args,this.clickAction.timedClickAction.clickIndicator,_314,_315);
e.stopPropagation();
},componentClick:function(e){
if(ws.WebSuite.eventQuickViewWidget&&ws.WebSuite.eventQuickViewWidget.isShowing()){
ws.WebSuite.eventQuickViewWidget.closeCard();
}
var div=e.target;
if((div.className!="component")&&(div.className!="componentReadOnly")&&(div.className!="overflow")){
div=div.parentNode;
}
var ci=div.componentInstance;
if(ci==null){
this.controllerWidget.targetDate=ws.date.add(this.getFirstDateInView(),ws.date.dateParts.DAY,div.dayIndex);
this.controllerWidget.selectDayView();
return;
}
var comp=this.model.components[ci[this.model.indexEnum.id]];
var args=this.model.getComponentArgs(comp);
args.rid=ci[this.model.indexEnum.rid];
if(args.rid){
args.start=ci[this.model.indexEnum.start];
args.end=ci[this.model.indexEnum.end];
if(comp[this.model.componentEnum.recurEnd]){
args.recurEnd=comp[this.model.componentEnum.recurEnd];
}
}else{
args.start=comp[this.model.componentEnum.start];
args.end=comp[this.model.componentEnum.end];
}
args.moreInfo=comp[this.model.componentEnum.moreInfo];
var _31c=this.model.calendars[comp[this.model.componentEnum.calid]][this.model.calendarEnum.writable];
this.quickView(args,_31c,div,{"BL":"TL"});
e.stopPropagation();
},getEventArgs:function(comp,ci){
var args=this.model.getComponentArgs(comp);
args.rid=ci[this.model.indexEnum.rid];
if(args.rid){
args.start=ci[this.model.indexEnum.start];
args.end=ci[this.model.indexEnum.end];
if(comp[this.model.componentEnum.recurEnd]){
args.recurEnd=comp[this.model.componentEnum.recurEnd];
}
}else{
args.start=comp[this.model.componentEnum.start];
args.end=comp[this.model.componentEnum.end];
}
args.moreInfo=comp[this.model.componentEnum.moreInfo];
return args;
},onComponentRightClick:function(evt){
var _321=this.getRightClickMenu();
if(_321.isShowingNow){
_321.div=null;
_321.close();
}
var div=evt.target;
if((div.className!="component")&&(div.className!="componentReadOnly")&&(div.className!="overflow")){
div=div.parentNode;
}
var ci=div.componentInstance;
if(ci==null){
return;
}
var comp=this.model.components[ci[this.model.indexEnum.id]];
_321.calendar=this.model.calendars[comp[this.model.componentEnum.calid]];
var _325=_321.calendar[this.model.calendarEnum.writable];
_321.eventData=this.getEventArgs(comp,ci);
_321.writable=_325;
_321.div=div;
this.rightClickMenu.children[0].setDisabled(!_325);
this.rightClickMenu.children[2].setDisabled(!_325);
_321.open(evt.pageX,evt.pageY,null,[]);
evt.preventDefault();
evt.stopPropagation();
},getRightClickMenu:function(){
if(!this.rightClickMenu){
var _326=[{caption:Config.Strings.Edit,onClick:ws.lang.hitch(this,"editEvent")},{caption:Config.Strings.Details,onClick:ws.lang.hitch(this,"viewEvent")},{caption:Config.Strings.Delete,onClick:ws.lang.hitch(this,"deleteEvent")},{separator:true},{caption:Config.Strings.CalCM_HideThisCalendar,onClick:ws.lang.hitch(this,"hideThisCalendar")},{caption:Config.Strings.ShowThisCalendarOnly,onClick:ws.lang.hitch(this,"showThisCalendarOnly")},{separator:true},{caption:Config.Strings.NewEventBtn,onClick:ws.lang.hitch(this,"addEvent")}];
this.rightClickMenu=ws.widget.createMenu(_326);
}
return this.rightClickMenu;
},viewEvent:function(){
if(this.rightClickMenu.writable){
this.editEvent();
}else{
this.quickView(this.rightClickMenu.eventData,this.rightClickMenu.writable,this.rightClickMenu.div,{"BL":"TL"});
}
},addEvent:function(){
this.controllerWidget.addEvent();
},editEvent:function(){
this.controllerWidget.editEvent(this.rightClickMenu.eventData);
},hideThisCalendar:function(){
var args=this.model.getCalendarArgs(this.rightClickMenu.calendar,true);
args.selected=false;
this.model.saveCalendar(args);
},deleteEvent:function(){
this.controllerWidget.promptConfirmDelete(this.rightClickMenu.eventData);
},showThisCalendarOnly:function(){
var _328=this.model.calendarEnum;
var _329=this.rightClickMenu.calendar[_328.id];
for(var _32a in this.model.calendars){
if(_32a!=_329){
var cal=this.model.calendars[_32a];
if(cal[_328.selected]){
var args=this.model.getCalendarArgs(cal,false);
args.selected=false;
this.model.saveCalendar(args);
}
}
}
},updateDayHour:function(){
var _32d=this.dayStart;
var _32e=this.dayEnd;
var _32f=Settings.CalendarDayStart;
var _330=Settings.CalendarDayEnd;
if((_32d==_32f)&&(_32e==_330)){
return;
}
var rows=Math.floor(1440/this.gridInterval);
var _332=Math.floor(_32d/this.gridInterval);
var _333=Math.floor(_32e/this.gridInterval);
var _334=Math.floor(_32f/this.gridInterval);
var _335=Math.floor(_330/this.gridInterval);
var _336=this.timedContainer.getElementsByTagName("table")[0];
for(var i=_332;i<_333;i++){
if((i>=_334)&&(i<_335)){
continue;
}
var row=_336.rows[i];
var tds=row.getElementsByTagName("td");
for(var j=0;j<tds.length;j++){
var td=tds[j];
var _33c=_1.html.getClass(td);
if(_33c){
var _33d=_33c.indexOf("gridCellState");
if(_33d>-1){
_33d+=13;
var _33e=parseInt(_33c.charAt(_33d));
if(!isNaN(_33e)){
if(_33e<this.MASK_OUTSIDE_RANGE){
_33e+=this.MASK_OUTSIDE_RANGE;
var _33f=_33c.substring(0,_33d)+_33e+_33c.substring(_33d+1);
_1.html.setClass(td,_33f);
}
}
}
}
}
}
for(var i=_334;i<_335;i++){
if((i>=_332)&&(i<_333)){
continue;
}
var row=_336.rows[i];
var tds=row.getElementsByTagName("td");
for(var j=0;j<tds.length;j++){
var td=tds[j];
var _33c=_1.html.getClass(td);
if(_33c){
var _33d=_33c.indexOf("gridCellState");
if(_33d>-1){
_33d+=13;
var _33e=parseInt(_33c.charAt(_33d));
if(!isNaN(_33e)){
if(_33e>=this.MASK_OUTSIDE_RANGE){
_33e-=this.MASK_OUTSIDE_RANGE;
var _33f=_33c.substring(0,_33d)+_33e+_33c.substring(_33d+1);
_1.html.setClass(td,_33f);
}
}
}
}
}
}
this.dayStart=_32f;
this.dayEnd=_330;
}});
_1.provide("ws.calendar.ExportCompsWidget");
_1.require("dojo.widget.*");
_1.require("dojo.widget.ContentPane");
_1.require("dojo.widget.LayoutContainer");
_1.require("ws.calendar.CalendarViewModel");
_1.require("ws.calendar.calutil");
_1.require("ws.date");
_1.require("ws.html");
_1.require("ws.UserContext");
_1.require("ws.widget.OkCancelDialog");
_1.require("ws.widget.PopupDatePicker");
_1.require("ws.widget.util");
_1.require("ws.widget.WSButton");
_1.require("ws.widget.WSSelect");
_1.require("ws.widget.WSToolbar");
_1.widget.defineWidget("ws.calendar.ExportCompsWidget",_1.widget.HtmlWidget,{widgetsInTemplate:true,templateString:"<div>\r\n\t<div dojoType=\"dojo:LayoutContainer\" class=\"exportComponents\" style=\"height: 100%; width: 100%;\">\r\n\t\t<div dojoType=\"ws:WSToolbar\" layoutAlign=\"top\">\r\n\t\t\t<div toolbarPosition=\"right\" dojoType=\"dojo:ContentPane\" class=\"closeButtonPane\">\r\n\t\t\t\t<img src=\"${spacer}\" class=\"closeButton\" dojoAttachEvent=\"onClick: cancel\">\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div dojoType=\"dojo:ContentPane\" layoutAlign=\"client\" class=\"page\">\r\n\t\t\t<h1 class=\"heading\" dojoAttachPoint=\"export_title\"></h1>\r\n\t\t\t<p class=\"ExportInstructions\">\r\n\t\t\t<span dojoAttachPoint=\"export_text1\"></span>\r\n\t\t\t<br /><span dojoAttachPoint=\"export_text2\"></span>\r\n\t\t\t<br />\r\n\t\t\t</p>\r\n\t\t\t<br/>\r\n\t\t\t<div class=\"cenParent\" style=\"padding-top:20px;\">\r\n\t\t\t\t<div class=\"cenChild\" style=\"width:400px;\">\r\n\t\t\t\t\t<div class=\"lightBox\">\r\n\t\t\t\t\t\t<table cellpadding=0 cellspacing=0 border=0>\r\n\t\t\t\t\t\t\t<tr dojoAttachPoint=\"eventonly_target_calendar\" style=\"text-align:left\">\r\n\t\t\t\t\t\t\t\t<td class=\"fieldLabel\" style=\"text-align: right\" nowrap>${TargetCalendar}:</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<div class=\"smallField\" dojoType=\"ws:WSSelect\" dojoAttachPoint=\"typeSelect\"></div>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr dojoAttachPoint=\"row1\">\r\n\t\t\t\t\t\t\t\t<td style=\"text-align: right\" nowrap><span class=\"inputLabels\">${StartDate}:</span></td>\r\n\t\t\t\t\t\t\t\t<td><input class=\"dateInputField\" dojoAttachPoint=\"startDateInput\" /></td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr dojoAttachPoint=\"row2\">\r\n\t\t\t\t\t\t\t\t<td style=\"text-align: right\" nowrap><span class=\"inputLabels\">${EndDate}:</span></td>\r\n\t\t\t\t\t\t\t\t<td><input class=\"dateInputField\" dojoAttachPoint=\"endDateInput\" /><br/></td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td></td>\r\n\t\t\t\t\t\t\t\t<td><div dojoType=\"ws:WSButton\" vizType=\"Blue\" dojoAttachEvent=\"onClick: exportToFile\">${Export}</div></td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<!--\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td class=\"fieldLabel\" colspan=2>\r\n\t\t\t\t\t\t\t\t\t<div class=\"fLeft\" style=\"width:10px;height:10px;\"></div>\r\n\t\t\t\t\t\t\t\t\t<div id=\"ExportWarning\" class=\"fLeft\" style=\"display:none;\">\r\n\t\t\t\t\t\t\t\t\t\t<br id=\"GetExportProgressWarningMsg\">\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div style=\"clear:both;\"></div>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t-->\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div dojoType=\"ws:PopupDatePicker\" dojoAttachPoint=\"eventPopupPicker\" toggle=\"wipe\" toggleDuration=\"150\" closeOnMouseOut=\"true\" width=\"150\"></div>\r\n\t</div>\r\n</div>\r\n",templateCssString:".exportComponents .closeButtonPane\r\n{\r\n\tpadding-top: 4px;\r\n\tpadding-right: 9px;\r\n}\r\n\r\n.exportComponents .closeButtonPane .closeButton\r\n{\r\n\twidth: 16px;\r\n\theight: 16px;\r\n\tcursor: pointer;\r\n\tbackground: url(\"${images}main.gif\") -1347px -1px;\r\n}\r\n\r\n.exportComponents .closeButtonPane .closeButton:hover\r\n{\r\n\tbackground-position: -1368px -1px;\r\n}\r\n\r\n.exportComponents .cenParent {\r\n\t/* Use this class in the parent div to center the children in this div cross-browser */\r\n\ttext-align: center;\r\n}\r\n\r\n.exportComponents .cenChild {\r\n\t/* Use this class in the child div to center this div within a cenParent div */\r\n\t/* NOTE: you must set the width of this child div explicitly... */\r\n\tmargin-left: auto;\r\n\tmargin-right: auto;\r\n}\r\n.exportComponents .lightBox\r\n{\r\n\tborder: solid 1px #ccc;\r\n\tpadding: 20px;\r\n}\r\n.exportComponents .page \r\n{\r\n\tpadding: 10px 10px 10px 10px;\t\r\n}\r\n.exportComponents .heading\r\n{\r\n\tfont: bold 18px Arial;\r\n}\r\n.exportComponents .ExportInstructions\r\n{\r\n\tpadding-left:40px;\r\n}\r\n.exportComponents .filenameInput\r\n{\r\n\twidth:300px;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/calendar/ExportCompsWidget.css"),calendarModel:null,closeCB:null,COMPTYPE_EVENT:0,COMPTYPE_TODO:1,compType:0,startDate:null,endDate:null,showPicker:function(_340,_341){
var date=this.startDate;
if(!_341){
date=this.endDate;
}
_1.debug("showPicker() S:"+this.startDate.getMonth()+"/"+this.startDate.getDate());
_1.debug("showPicker() E:"+this.endDate.getMonth()+"/"+this.endDate.getDate());
_1.debug("showPicker() G:"+date.getMonth()+"/"+date.getDate());
if(!this.eventPopupPicker.isShowingNow){
this.eventPopupPicker.setDate(date);
this.eventPopupPicker.open(_340,this,_340,{"BL":"TL"});
this.dateInputField=_340;
}
},setStrings:function(_343){
var _344=Config.Strings.CalendarFileExport;
var _345=Config.Strings.CalExportText1;
var _346=Config.Strings.CalExportText2;
if(this.COMPTYPE_TODO==_343){
}
ws.html.setInnerText(this.export_title,_344);
ws.html.setInnerText(this.export_text1,_345);
ws.html.setInnerText(this.export_text2,_346);
},populateCalendarList:function(_347){
var _348=this.calendarModel.getCalendarList();
var _349=this.calendarModel.calendarEnum;
if(!_348||!_349){
return;
}
var _34a="";
var _34b=new Array();
var j=0;
for(var i=0;i<_348.length;i++){
_1.debug("populateCalendarList: "+i);
var _34e=_348[i];
var _34f=_34e[_349.compType];
var _350=_34e[_349.calType];
var _351=_34e[_349.writable];
if(_34f==_347&&_351){
_34b[j++]=_34e;
_1.debug("writableCalArray: "+j+" "+_34e[_349.id]);
}
if(_350==0){
_34a=_34e[_349.id];
}
}
if(_34b.length==0){
_34a=ws.calendar.calutil.GetDefaultCalid(_34f);
}
ws.calendar.calutil.LocalPopulateCalendarListFromCalArray(_34b,_349,_34a,this.typeSelect);
},hideElements:function(_352){
if(this.COMPTYPE_TODO==_352){
this.eventonly_target_calendar.style.display="none";
}
},fillInDateField:function(_353){
var _354=new Date(_353);
this.dateInputField.value=ws.date.formatDateTime(_354,this.dateFormat);
if(this.dateInputField==this.startDateInput){
this.startDate=_354;
}else{
this.endDate=_354;
}
this.eventPopupPicker.hidePopup();
},fillInTemplate:function(){
this.dateFormat=Config.Strings.CalDateParseFormat;
this.dateInputField=null;
},defaultPopulateForm:function(){
var date=new Date();
date=ws.date.add(date,ws.date.dateParts.MONTH,-1);
this.startDate=date;
this.startDateInput.value=ws.date.formatDateTime(this.startDate,this.dateFormat);
date=ws.date.add(date,ws.date.dateParts.MONTH,7);
this.endDate=date;
this.endDateInput.value=ws.date.formatDateTime(this.endDate,this.dateFormat);
},postCreate:function(args,frag){
var _358=0;
this.compType=_358;
this.setStrings(_358);
this.hideElements(_358);
this.defaultPopulateForm();
this.startDateInput.onclick=ws.lang.hitch(this,"showPicker",this.startDateInput,true);
this.endDateInput.onclick=ws.lang.hitch(this,"showPicker",this.endDateInput,false);
_1.event.connect(this.eventPopupPicker.datePicker,"selectDateConnect",this,"fillInDateField");
},ShowResponse:function(_359,msg,_35b){
},exportToFile:function(){
var err=null;
if(_1.string.isBlank(this.startDateInput.value)){
err=Config.Strings.InvalidDateOnCreate;
}else{
if(_1.string.isBlank(this.endDateInput.value)){
err=Config.Strings.InvalidDateOnCreate;
}else{
var _35d=Config.Strings.CalDateParseFormat;
startDate=ws.date.ParseDateFromFormat(this.startDateInput.value,_35d);
endDate=ws.date.ParseDateFromFormat(this.endDateInput.value,_35d);
if(startDate>endDate){
err=Config.Strings.Calendar_AddEvent_InvalidStartAfterEnd;
}
}
}
if(err){
ws.widget.OkCancelDialog.alert(err);
return;
}
var _35e=(this.calendarModel.dummyTZID!=null)?this.calendarModel.dummyTZID:null;
var _35f=ws.date.formatRFC2445(this.startDate);
var _360=ws.date.formatRFC2445(this.endDate);
var _361=(this.compType==0)?"EVENT":"TODO";
var _362=this.typeSelect.currentValue;
url=Config.BaseRpcPagesURL+"ExportCalendar.aspx?comptype="+_361+"&lstCalendars="+_362+"&startDate="+_35f+"&endDate="+_360;
var _363=_1.io.createIFrame("ExportCalendar",null,Config.EmptyFileURL);
_1.io.setIFrameSrc(_363,url,true);
},cancel:function(){
if(this.closeCB){
this.closeCB();
}
},setControllerWidget:function(_364){
this.controllerWidget=_364;
},setModel:function(_365){
var _366=this.calendarModel;
this.calendarModel=_365;
if(null==_366){
this.populateCalendarList(this.compType);
}
},setDate:function(_367){
this.targetDate=_367;
},getFirstDateInView:function(){
var _368=this.targetDate;
if(_368==null){
_368=new Date();
}
return ws.date.getFirstDayInMonthView(_368);
},getLastDateInView:function(){
var _369=this.targetDate;
if(_369==null){
_369=new Date();
}
return ws.date.getLastDayInMonthView(_369);
}});
_1.provide("ws.calendar.ImportCompsWidget");
_1.require("dojo.widget.*");
_1.require("dojo.widget.ContentPane");
_1.require("dojo.widget.LayoutContainer");
_1.require("ws.calendar.CalendarViewModel");
_1.require("ws.calendar.calutil");
_1.require("ws.date");
_1.require("ws.html");
_1.require("ws.UserContext");
_1.require("ws.widget.OkCancelDialog");
_1.require("ws.widget.util");
_1.require("ws.widget.WSButton");
_1.require("ws.widget.WSSelect");
_1.require("ws.widget.WSToolbar");
_1.widget.defineWidget("ws.calendar.ImportCompsWidget",_1.widget.HtmlWidget,{widgetsInTemplate:true,templateString:"<div>\r\n\t<div dojoType=\"dojo:LayoutContainer\" class=\"importComponents\" style=\"height: 100%; width: 100%;\">\r\n\t\t<div dojoType=\"ws:WSToolbar\" layoutAlign=\"top\">\r\n\t\t\t<div toolbarPosition=\"right\" dojoType=\"dojo:ContentPane\" class=\"closeButtonPane\">\r\n\t\t\t\t<img src=\"${spacer}\" class=\"closeButton\" dojoAttachEvent=\"onClick: cancel\">\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div dojoType=\"dojo:ContentPane\" layoutAlign=\"client\" class=\"page\">\r\n\t\t\t<h1 class=\"heading\" dojoAttachPoint=\"import_title\"></h1>\r\n\t\t\t<p class=\"ImportInstructions\">\r\n\t\t\t<span dojoAttachPoint=\"import_text1\"></span>\r\n\t\t\t<br /><span dojoAttachPoint=\"import_text2\"></span>\r\n\t\t\t<br />\r\n\t\t\t<br /><span dojoAttachPoint=\"import_text3_csv\"></span>\r\n\t\t\t<br /><span dojoAttachPoint=\"import_text4_ics\">${CalImportText4}</span>\r\n\t\t\t<br /><span dojoAttachPoint=\"import_text5_vcs\">${CalImportText5}</span>\r\n\t\t\t<br />\r\n\t\t\t<br /><span dojoAttachPoint=\"import_text6\">${CalImportText6}</span>\r\n\t\t\t<br /><span dojoAttachPoint=\"import_text7_csv_info\"></span>\r\n\t\t\t</p>\r\n\t\t\t\r\n\t\t\t<div class=\"cenParent\" style=\"padding-top:20px;\">\r\n\t\t\t\t<div class=\"cenChild\" style=\"width:500px;\">\r\n\t\t\t\t\t<div class=\"lightBox\">\r\n\t\t\t\t\t\t<table cellpadding=0 cellspacing=0 border=0>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td dojoAttachPoint=\"file_label\" align=\"right\"></td>\r\n\t\t\t\t\t\t\t\t<td align=\"left\">\r\n\t\t\t\t\t\t\t\t\t<form method=\"post\" enctype=\"multipart/form-data\" dojoAttachPoint=\"fileUploadForm\">\r\n\t\t\t\t\t\t\t\t\t\t<input type=\"file\" dojoAttachEvent=\"onChange: onFileInputChanged\" dojoAttachPoint=\"fileInputNode\" name=\"${this.widgetId}file\" style=\"width:300px\">\r\n\t\t\t\t\t\t\t\t\t</form>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr dojoAttachPoint=\"eventonly_target_calendar\" style=\"text-align:left\">\r\n\t\t\t\t\t\t\t\t<td class=\"fieldLabel\" style=\"text-align: right\" nowrap>${TargetCalendar}:</td>\r\n\t\t\t\t\t\t\t\t<td align=\"left\">\r\n\t\t\t\t\t\t\t\t<div class=\"smallField\" dojoType=\"ws:WSSelect\" dojoAttachPoint=\"typeSelect\"></div>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td align=\"right\">${FileType}:</td>\r\n\t\t\t\t\t\t\t\t<td align=\"left\">\r\n\t\t\t\t\t\t\t\t\t<input type=\"radio\" name=\"${this.widgetId}type\" id=\"${this.widgetId}typecsv\" checked dojoAttachPoint=\"csvInputNode\">\r\n\t\t\t\t\t\t\t\t\t<label id=\"${this.widgetId}labelcsv\" for=\"${this.widgetId}typecsv\">${CalFileTypeCSV}</label>\r\n\t\t\t\t\t\t\t\t\t<br />\r\n\t\t\t\t\t\t\t\t\t<input type=\"radio\" name=\"${this.widgetId}type\" id=\"${this.widgetId}typeical\" dojoAttachPoint=\"icalInputNode\">\r\n\t\t\t\t\t\t\t\t\t<label for=\"${this.widgetId}typetxt\">${CalFileTypeiCal}</label>\r\n\t\t\t\t\t\t\t\t\t<br />\r\n\t\t\t\t\t\t\t\t\t<input type=\"radio\" name=\"${this.widgetId}type\" id=\"${this.widgetId}typevcal\" dojoAttachPoint=\"vcalInputNode\">\r\n\t\t\t\t\t\t\t\t\t<label for=\"${this.widgetId}typetxt\">${CalFileTypevCal}</label>\r\n\t\t\t\t\t\t\t\t\t<br />\r\n\t\t\t\t\t\t\t\t\t<br />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td align=\"right\">&nbsp;</td>\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<td align=\"left\"><div dojoType=\"ws:WSButton\" vizType=\"Blue\" dojoAttachEvent=\"onClick: importFromFile\">${Import}</div></td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<!--\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td class=\"fieldLabel\" colspan=2>\r\n\t\t\t\t\t\t\t\t\t<div class=\"fLeft\" style=\"width:10px;height:10px;\"></div>\r\n\t\t\t\t\t\t\t\t\t<div id=\"ImportWarning\" class=\"fLeft\" style=\"display:none;\">\r\n\t\t\t\t\t\t\t\t\t\t<br id=\"GetImportProgressWarningMsg\">\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t<div style=\"clear:both;\"></div>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t-->\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n",templateCssString:".importComponents .closeButtonPane\r\n{\r\n\tpadding-top: 4px;\r\n\tpadding-right: 9px;\r\n}\r\n\r\n.importComponents .closeButtonPane .closeButton\r\n{\r\n\twidth: 16px;\r\n\theight: 16px;\r\n\tcursor: pointer;\r\n\tbackground: url(\"${images}main.gif\") -1347px -1px;\r\n}\r\n\r\n.importComponents .closeButtonPane .closeButton:hover\r\n{\r\n\tbackground-position: -1368px -1px;\r\n}\r\n\r\n.importComponents .cenParent {\r\n\t/* Use this class in the parent div to center the children in this div cross-browser */\r\n\ttext-align: center;\r\n}\r\n\r\n.importComponents .cenChild {\r\n\t/* Use this class in the child div to center this div within a cenParent div */\r\n\t/* NOTE: you must set the width of this child div explicitly... */\r\n\tmargin-left: auto;\r\n\tmargin-right: auto;\r\n}\r\n.importComponents .lightBox\r\n{\r\n\tborder: solid 1px #ccc;\r\n\tpadding: 20px;\r\n}\r\n.importComponents .page \r\n{\r\n\tpadding: 10px 10px 10px 10px;\t\r\n}\r\n.importComponents .heading\r\n{\r\n\tfont: bold 18px Arial;\r\n}\r\n.importComponents .ImportInstructions\r\n{\r\n\tpadding-left:40px;\r\n}\r\n.importComponents .filenameInput\r\n{\r\n\twidth:300px;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/calendar/ImportCompsWidget.css"),calendarModel:null,closeCB:null,COMPTYPE_EVENT:0,COMPTYPE_TODO:1,compType:0,showCSV:true,openEasyTransfer:function(){
},onFileInputChanged:function(){
var _36a=this.fileInputNode.value;
var _36b=_36a.lastIndexOf(".");
if(_36b!=-1){
var ext=_36a.substring(_36b+1).toLowerCase();
if(this.showCSV&&ext=="csv"){
this.csvInputNode.checked=true;
}else{
if(ext=="ics"){
this.icalInputNode.checked=true;
}else{
if(ext=="vcs"){
this.vcalInputNode.checked=true;
}
}
}
}
},setStrings:function(_36d,_36e){
var _36f=Config.Strings.CalendarFileImport;
var _370=Config.Strings.CalImportText1;
var _371=Config.Strings.CalImportText2;
var _372=Config.Strings.CalImportText3;
var _373=Config.Strings.CalImportText7;
var _374=Config.Strings.CalendarFile+":";
if(this.COMPTYPE_TODO==_36d){
_36f=Config.Strings.CalendarFileImportTasks;
_370=Config.Strings.CalImportTaskText1;
_371=Config.Strings.CalImportTaskText2;
_374=Config.Strings.TasksFile+":";
}
if(!_36e){
_372="";
_373="";
}
ws.html.setInnerText(this.import_title,_36f);
ws.html.setInnerText(this.import_text1,_370);
ws.html.setInnerText(this.import_text2,_371);
ws.html.setInnerText(this.import_text3_csv,_372);
ws.html.setInnerText(this.import_text7_csv_info,_373);
ws.html.setInnerText(this.file_label,_374);
},populateCalendarList:function(_375){
var _376=this.calendarModel.getCalendarList();
var _377=this.calendarModel.calendarEnum;
if(!_376||!_377){
return;
}
var _378="";
var _379=new Array();
var j=0;
for(var i=0;i<_376.length;i++){
_1.debug("populateCalendarList: "+i);
var _37c=_376[i];
var _37d=_37c[_377.compType];
var _37e=_37c[_377.calType];
var _37f=_37c[_377.writable];
if(_37d==_375&&_37f){
_379[j++]=_37c;
_1.debug("writableCalArray: "+j+" "+_37c[_377.id]);
}
if(_37e==0){
_378=_37c[_377.id];
}
}
if(_379.length==0){
_378=ws.calendar.calutil.GetDefaultCalid(_37d);
}
ws.calendar.calutil.LocalPopulateCalendarListFromCalArray(_379,_377,_378,this.typeSelect);
},hideElements:function(_380,_381){
var _382=_1.byId(this.widgetId+"typecsv");
var _383=_1.byId(this.widgetId+"labelcsv");
if(!_381&&_382!=null){
_382.style.display="none";
_383.style.display="none";
}
if(this.COMPTYPE_TODO==_380){
this.eventonly_target_calendar.style.display="none";
}
},postCreate:function(args,frag){
var _386=0;
var _387=(Config.CalendarImportState!=null&&Config.CalendarImportState=="On");
this.showCSV=_387;
this.compType=_386;
this.setStrings(_386,_387);
this.hideElements(_386,_387);
},importFromFile:function(){
if(_1.string.isBlank(this.fileInputNode.value)){
ws.widget.OkCancelDialog.alert(Config.Strings.ErrorImportingSelectFile);
return;
}
var fmt="csv";
if(this.csvInputNode.checked){
fmt="csv";
}else{
if(this.icalInputNode.checked){
fmt="ical";
}else{
fmt="vcal";
}
}
var _389=Config.Strings.EventsImported;
if(this.COMPTYPE_TODO==this.compType){
_389=Config.Strings.TasksImported;
}
var _38a=Config.Strings.ErrorImportingCalData;
var _38b=(this.calendarModel.dummyTZID!=null)?this.calendarModel.dummyTZID:null;
this.calendarModel.importFromFile({formNode:this.fileUploadForm,compType:this.compType==0?"EVENT":"TODO",selectedCal:this.typeSelect.currentValue,dummyTZID:_38b,format:fmt,load:_1.lang.hitch(this,function(data){
_1.event.topic.publish("WSFeedbackStart",ws.string.substituteParams(_389,data.count),true);
this.calendarModel.loadDataInProgress=false;
}),error:function(err){
ws.widget.OkCancelDialog.alert(_1.string.isBlank(err)?_38a:err);
this.calendarModel.loadDataInProgress=false;
}});
},cancel:function(){
if(this.closeCB){
this.closeCB();
}
},setControllerWidget:function(_38e){
this.controllerWidget=_38e;
},setModel:function(_38f){
var _390=this.calendarModel;
this.calendarModel=_38f;
if(null==_390){
this.populateCalendarList(this.compType);
}
},setDate:function(_391){
this.targetDate=_391;
},getFirstDateInView:function(){
var _392=this.targetDate;
if(_392==null){
_392=new Date();
}
return ws.date.getFirstDayInMonthView(_392);
},getLastDateInView:function(){
var _393=this.targetDate;
if(_393==null){
_393=new Date();
}
return ws.date.getLastDayInMonthView(_393);
}});
_1.provide("ws.calendar.UpcomingEventsViewWidget");
_1.require("dojo.widget.*");
_1.require("dojo.widget.ContentPane");
_1.require("ws.calendar.CalendarViewModel");
_1.require("ws.date");
_1.require("ws.io");
_1.require("ws.lang");
_1.require("ws.reporting");
_1.require("ws.string");
_1.require("ws.widget.ListView");
_1.require("ws.widget.OkCancelDialog");
_1.require("ws.widget.util");
_1.require("ws.widget.WSLayoutContainer");
_1.require("ws.widget.WSMenu");
_1.declare("ws.calendar.UpcomingEventsViewModel",turbo.data.virtual,function(_394,_395){
_1.debug("UpcomingEventsViewModel.function");
this.dateFormat=Config.Strings.EventDateFormat;
this.dateFormatWithYear=Config.Strings.EventDateFormatWithYear;
this.timeFormat=Config.Strings.DateToday;
this.model=_395;
this.listViewEvents={eventsDate:new Array(),eventsTime:new Array(),eventsName:new Array(),eventsUID:new Array(),eventsID:new Array(),eventsRID:new Array(),eventsCI:new Array()};
this.selectedUids={};
this.selectedRows={};
this.columns={Select:0,Cal:1,Hover:2,Event:3,Date:4,Time:5};
this.columnMap={1:"CalendarDisplayName",3:"Summary",4:"StartTime",5:"StartTime"};
_1.event.connect(this.model,"toggleSelectRow",this,"toggleSelectRow");
this.model.selectAll=_1.lang.hitch(this,"selectAll");
this.model.deselectAll=_1.lang.hitch(this,"deselectAll");
this.model.isAllSelected=_1.lang.hitch(this,"isAllSelected");
this.model.isAnySelected=_1.lang.hitch(this,"isAnySelected");
},{sort:function(_396,_397){
var _398=this.columnMap[Math.abs(_396)-1];
var dir=_396<0?"Descending":"Ascending";
this.model.setSortData(_398,dir);
},modelUpdated:function(){
},deleteEvents:function(uids){
if(!uids){
_1.debug("Delete clicked, but no target UIDs.");
return;
}else{
_1.debug("deleteEvents");
var id=null;
var rid=null;
var ci=null;
var comp=null;
var ids=new Array();
var rids=new Array();
var _3a1=false;
for(var uid in uids){
_1.debug("UID is: "+uids[uid]);
ci=this.listViewEvents.eventsCI[uids[uid]];
comp=this.model.components[ci[this.model.indexEnum.id]];
if(this.model.calendars[comp[this.model.componentEnum.calid]][this.model.calendarEnum.writable]){
ids.push(this.listViewEvents.eventsID[uids[uid]]);
rids.push(this.listViewEvents.eventsRID[uids[uid]]);
}else{
_3a1=true;
}
}
_1.debug("# of events to delete: "+ids.length);
_1.debug("# of total UIDs selected: "+uids.length);
if(ids.length==0||_3a1){
_1.debug("Read only event, can't delete.");
ws.widget.OkCancelDialog.alert(Config.Strings.DeleteEventNotAllowedInList);
return;
}else{
ws.widget.OkCancelDialog.alert(Config.Strings.DeleteEventsConfirmationPlural,ws.lang.hitch(this,function(ok){
if(ok){
this.deleteEventsExecute(ids,rids,uids);
}
}),true);
}
}
},deleteEventsExecute:function(ids,rids,uids){
_1.debug("deleteEventsExecute");
var _3a7=this.model.searchStr;
var args=this.model.getDefaultComponentArgs(true);
args.ids=ids;
args.rids=rids;
args.multipleEvents=true;
args.index=true;
args.search=_3a7;
args.searchIn=null;
args.sortBy=null;
args.sortDir=null;
args.ignoreCache=true;
args.loadCallback=_1.lang.hitch(this,function(){
_1.event.topic.publish("WSFeedbackStart",ws.string.substituteParams(Config.Strings.EventsDeleted,uids.length),true);
});
this.model.deleteEvents(args);
this.removeEventsLocal(uids);
},deleteOneEvent:function(row){
if(null===row){
alert("Trash or Quick Action Delete clicked, but no target row info.");
return;
}else{
var uid=this.listViewEvents.eventsUID[row];
var _3ab=this.model.searchStr;
var args=this.model.getDefaultComponentArgs();
args.id=this.listViewEvents.eventsID[uid];
_1.debug("ID is: "+args.id);
if(this.listViewEvents.eventsRID[uid]){
args.rid=this.listViewEvents.eventsRID[uid];
_1.debug("RID is: "+args.rid);
}
args.index=true;
args.search=_3ab;
args.searchIn=null;
args.sortBy=null;
args.sortDir=null;
args.ignoreCache=true;
args.loadCallback=_1.lang.hitch(this,function(){
_1.event.topic.publish("WSFeedbackStart",Config.Strings.EventDeleted,true);
});
this.model.deleteEvents(args);
var uids=[];
_1.debug("UID is: "+uid);
uids.push(uid);
this.removeEventsLocal(uids);
}
},removeEventsLocal:function(uids){
_1.lang.forEach(uids,_1.lang.hitch(this,function(uid){
if(uid in this.selectedUids){
delete this.selectedUids[uid];
}
}));
this.modelUpdated();
},editEvent:function(row){
_1.debug("editEvent()");
if(null===row){
alert("Row clicked, but no target row info.");
return;
}else{
var uid=null;
var ci=null;
var comp=null;
var args=null;
var cs=null;
var ce=null;
uid=this.listViewEvents.eventsUID[row];
ci=this.listViewEvents.eventsCI[uid];
comp=this.model.components[ci[this.model.indexEnum.id]];
args=this.model.getComponentArgs(comp);
if(!ci[this.model.indexEnum.rid]){
cs=comp[this.model.componentEnum.start];
ce=comp[this.model.componentEnum.end];
}else{
cs=ci[this.model.indexEnum.start];
ce=ci[this.model.indexEnum.end];
args.rid=ci[this.model.indexEnum.rid];
}
args.start=cs;
args.end=ce;
args.summary=comp[this.model.componentEnum.summary];
args.allDay=comp[this.model.componentEnum.allDay];
return args;
}
},addEvent:function(args){
_1.debug("gridModel.addEvent");
},toggleSelectRow:function(row){
var uid=this.listViewEvents.eventsUID[row];
if(uid==null){
_1.debug("No UID found for row",row);
return;
}
if(uid in this.selectedUids){
delete this.selectedUids[uid];
}else{
this.selectedUids[uid]=true;
}
this.change(row);
},isSelected:function(uid){
return uid in this.selectedUids;
},getSelectedUids:function(){
var ret=[];
for(var uid in this.selectedUids){
ret.push(uid);
}
return ret;
},getRowCount:function(){
if(this.listViewEvents.eventsUID.length){
return this.listViewEvents.eventsUID.length;
}else{
_1.debug("0 rows");
return 0;
}
},getRow:function(row){
if(this.getRowCount()==0){
return "";
}
var data=this.getRowData(row);
if(data==null){
return ["","","","","",""];
}
var _3bf=data.eventUID;
var _3c0=this.isSelected(_3bf)?"ON":"OFF";
var _3c1=this.getHoverColumnCB?this.getHoverColumnCB(row):"";
var _3c2=data.eventName;
var _3c3=data.eventDate;
var _3c4=data.eventTime;
var _3c5="<div class=\"iconCB iconCB_"+data.eventColor+"\"></div>";
return [_3c0,_3c5,_3c1,_3c2,_3c3,_3c4];
},getRowData:function(row){
if(this.getRowCount()){
var uid=null;
var ci=null;
var comp=null;
var _3ca=null;
var _3cb=null;
var _3cc=null;
uid=this.listViewEvents.eventsUID[row];
ci=this.listViewEvents.eventsCI[uid];
comp=this.model.components[ci[this.model.indexEnum.id]];
_3ca=this.model.componentEnum;
_3cb=this.model.calendarEnum;
var _3cd={eventDate:this.listViewEvents.eventsDate[uid],eventTime:this.listViewEvents.eventsTime[uid],eventName:this.listViewEvents.eventsName[uid],eventColor:this.listViewEvents.eventsColor[uid],eventID:this.listViewEvents.eventsID[uid],eventRID:this.listViewEvents.eventsRID[uid],eventUID:uid};
if(this.model.calendars[comp[_3ca.calid]][_3cb.writable]){
_3cd.writable=true;
}else{
_3cd.writable=false;
}
return _3cd;
}else{
return null;
}
},selectAll:function(){
var uids=this.listViewEvents.eventsUID;
if(uids==null){
return false;
}
this.selectedUids={};
for(var i=0;i<uids.length;i++){
this.selectedUids[uids[i]]=true;
}
this.modelUpdated();
return true;
},deselectAll:function(){
this.selectedUids={};
this.modelUpdated();
},isAllSelected:function(){
var _3d0=this.listViewEvents.eventsUID;
if(_3d0==null){
return false;
}
var _3d1=this.getSelectedUids();
return (_3d0.length>0)&&(_3d1.length==_3d0.length);
},isAnySelected:function(){
return !ws.lang.isEmptyObject(this.selectedUids);
},get:function(row,col){
var data=this.getRowData(row);
if(data==null){
return "Event Error";
}
if(this.model.totalItems==0){
return "";
}
switch(col){
case this.columns.Select:
return this.isSelected(data.eventUID)?"ON":"OFF";
case this.columns.Cal:
return "<div class=\"iconCB iconCB_"+data.eventColor+"\"></div>";
case this.columns.Hover:
return this.getHoverColumnCB?this.getHoverColumnCB(row):"";
case this.columns.Event:
return data.eventName;
case this.columns.Date:
return data.eventDate;
case this.columns.Time:
return data.eventTime;
default:
return "Invalid Column";
}
}});
_1.widget.defineWidget("ws.calendar.UpcomingEventsViewWidget",ws.widget.ListView,{templateString:"<div>\r\n\t<div class=\"listView upcomingEventView\" dojoType=\"ws:WSLayoutContainer\" deferred=\"false\" dojoAttachPoint=\"layoutWidget\">\r\n\t\t<div dojoType=\"dojo:ContentPane\" dojoAttachPoint=\"searchInfoPane\" class=\"searchInfo\" layoutAlign=\"top\">\r\n\t\t\t<span dojoAttachPoint=\"searchResultsNode\"></span>\r\n\t\t\t&nbsp;&nbsp;\r\n\t\t\t<span class=\"wsLink\" dojoAttachPoint=\"clearSearchNode\" dojoAttachEvent=\"onClick: clearSearch\"></span>\r\n\t\t</div>\r\n\t\t<div dojoAttachPoint=\"grid\" dojoType=\"TurboDataGrid\" layoutAlign=\"client\" defaultLeftWidth=\"0\"></div>\r\n\t\t<div dojoType=\"ws:WSMenu\" dojoAttachPoint=\"quickActionMenu\">\r\n\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${CalEvAM_Edit}\" dojoAttachPoint=\"qaEditEvent\"></div>\r\n\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${CalEvAM_EmailEvent}\" dojoAttachPoint=\"qaEmailEvent\"></div>\r\n\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${CalEvAM_Delete}\" dojoAttachPoint=\"qaDeleteEvent\"></div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n",templateCssString:".upcomingEventView .searchInfo {\r\n\tbackground-color: #c4f198;\r\n\tpadding: 5px 7px;\r\n\tborder-bottom: 1px solid #d8d6d3;\r\n}\r\n\r\n.upcomingEventView .searchInfoHidden {\r\n\tdisplay: none;\r\n}\r\n.upcomingEventView .searchInfoShown {\r\n\tdisplay: block;\r\n}\r\n\r\n.turbogrid-cell .iconCB \r\n{\r\n\twidth: 13px;\r\n\theight: 13px;\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tbackground-repeat: no-repeat;\t\r\n}\r\n\r\n.turbogrid-cell .iconCB_009712 { background-image: url(\"${images}main.gif\"); background-position: -225px -60px; }\r\n.turbogrid-cell .iconCB_0360EB { background-image: url(\"${images}main.gif\"); background-position: -240px -60px; }\r\n.turbogrid-cell .iconCB_CC0000 { background-image: url(\"${images}main.gif\"); background-position: -255px -60px; }\r\n.turbogrid-cell .iconCB_E76808 { background-image: url(\"${images}main.gif\"); background-position: -270px -60px; }\r\n.turbogrid-cell .iconCB_808000 { background-image: url(\"${images}main.gif\"); background-position: -285px -60px; }\r\n.turbogrid-cell .iconCB_6600FF { background-image: url(\"${images}main.gif\"); background-position: -300px -60px; }\r\n.turbogrid-cell .iconCB_008080 { background-image: url(\"${images}main.gif\"); background-position: -315px -60px; }\r\n.turbogrid-cell .iconCB_800080 { background-image: url(\"${images}main.gif\"); background-position: -330px -60px; }\r\n.turbogrid-cell .iconCB_6C6C6C { background-image: url(\"${images}main.gif\"); background-position: -345px -60px; }\r\n.turbogrid-cell .iconCB_0088FF { background-image: url(\"${images}main.gif\"); background-position: -360px -60px; }\r\n.turbogrid-cell .iconCB_646496 { background-image: url(\"${images}main.gif\"); background-position: -375px -60px; }\r\n.turbogrid-cell .iconCB_FF0080 { background-image: url(\"${images}main.gif\"); background-position: -390px -60px; }\r\n",templateCssPath:_1.uri.dojoUri("../ws/calendar/UpcomingEventsViewWidget.css"),wrapperModelClass:ws.calendar.UpcomingEventsViewModel,reportingSortName:"Sort Events",reportingScrollName:"Scroll Events",closeCB:null,hoverColumnHtml:"<div class=\"hoverControl trashHover\"></div><div class=\"hoverControl quickActionHover\"></div>",speedUp:true,rowHeight:25,captions:["<img src='"+Config.SpacerImageURL+"' class='gridIcon ckoffCol' />",Config.Strings.CalColCal," ",Config.Strings.CalColEvent,Config.Strings.CalColDate,Config.Strings.CalColTime],colStyles:["","","","font-size: 14px;","font-size: 12px;","font-size: 12px;"],initView:function(){
_1.debug("UpcomingEventsViewWidget.initView");
this.columns=[[turbo.grid.columns.sprite,{caption:this.captions[0],align:"center",width:18,sprites:this.baseSprites.chkBox,canResize:true,sortable:false}],[turbo.grid.format.text,{caption:this.captions[1],align:"left",width:36,canResize:false,sortable:true}],[turbo.grid.format.text,{caption:this.captions[2],align:"right",width:36,canResize:false,sortable:false}],[turbo.grid.format.text,{caption:this.captions[3],align:"left",width:200,canResize:true,sortable:true,colStyle:this.colStyles[3]}],[turbo.grid.format.text,{caption:this.captions[4],align:"center",width:140,canResize:true,sortable:true,colStyle:this.colStyles[4]}],[turbo.grid.format.text,{caption:this.captions[5],align:"center",width:140,canResize:true,sortable:true,colStyle:this.colStyles[5]}]];
this.autosizeColumnIndex=this.gridModel.columns.Event;
ws.calendar.UpcomingEventsViewWidget.superclass.initView.apply(this,arguments);
this.qaEditEvent.onClick=ws.lang.hitch(this,"handleQuickAction","editEvent");
this.qaEmailEvent.onClick=ws.lang.hitch(this,"handleQuickAction","emailEvent");
this.qaDeleteEvent.onClick=ws.lang.hitch(this,"handleQuickAction","deleteEvent");
_1.event.connect(this.model,"modelUpdated",this,"modelUpdated");
_1.event.connect(ws.WebSuite,"processKeyPress",this,"onKeyPress");
_1.event.connectOnce(this.model,"requestUpdate",_1.lang.hitch(this,function(){
var _3d5=this.model.getSearchString();
this.model.setSearchStr(_3d5,true);
}));
this.model.setSearchStr(null,true);
this.fetchData();
this.updateFilterButton();
this.gridModel.modelUpdated();
},modelUpdated:function(){
this.fetchData();
this.updateSearchInfo();
this.updateFilterButton();
this.gridModel.modelUpdated();
},fetchData:function(){
_1.debug("UpcomingEventsViewWidget.fetchData");
if(!this.model||!this.model.isSuccess){
return;
}
var mi=this.model.index;
var _3d7=this.model.calendarEnum;
var _3d8=this.model.componentEnum;
var _3d9=this.model.indexEnum;
var _3da=this.model.components;
var ccm=ws.style.componentColorMap;
var row=0;
var col=0;
var ci=null;
var comp=null;
var _3e0=null;
var uid=null;
var cs=null;
var ce=null;
var _3e4=null;
var _3e5=null;
var _3e6=null;
this.gridModel.listViewEvents.eventsDate=[];
this.gridModel.listViewEvents.eventsTime=[];
this.gridModel.listViewEvents.eventsName=[];
this.gridModel.listViewEvents.eventsColor=[];
this.gridModel.listViewEvents.eventsUID=[];
this.gridModel.listViewEvents.eventsID=[];
this.gridModel.listViewEvents.eventsRID=[];
this.gridModel.listViewEvents.eventsCI=[];
var _3e7=new Date();
var dFmt=null;
if(mi!=null){
var len=mi.length;
for(var i=0;i<len;i++){
ci=mi[i];
_3e0=ci[_3d9.id];
if(ci[_3d9.rid]){
_3e0=_3e0+ci[_3d9.rid];
}
comp=_3da[ci[_3d9.id]];
uid=_3e0;
if(comp==null||!this.componentFilter(comp)){
continue;
}
if(!ci[_3d9.rid]){
cs=comp[_3d8.start];
ce=comp[_3d8.end];
}else{
cs=ci[_3d9.start];
ce=ci[_3d9.end];
}
_3e4=cs;
dFmt=this.gridModel.dateFormat;
if(_3e7.getFullYear()!=_3e4.getFullYear()){
dFmt=this.gridModel.dateFormatWithYear;
}
_3e5=ws.date.formatDateTime(_3e4,dFmt);
if(comp[_3d8.allDay]){
_3e6=Config.Strings.AllDay;
}else{
_3e6=ws.date.FormatTimeRange(_3e4,ce,comp[_3d8.allDay],this.gridModel.timeFormat,this.gridModel.timeFormat);
}
var _3eb=this.model.calendars[comp[_3d8.calid]][_3d7.color];
_3eb=_3eb.substring(1);
this.gridModel.listViewEvents.eventsID[uid]=ci[_3d9.id];
this.gridModel.listViewEvents.eventsDate[uid]=_3e5;
this.gridModel.listViewEvents.eventsTime[uid]=_3e6;
this.gridModel.listViewEvents.eventsName[uid]=_1.string.escapeXml(comp[_3d8.summary]||"");
this.gridModel.listViewEvents.eventsColor[uid]=_3eb;
this.gridModel.listViewEvents.eventsRID[uid]=ci[_3d9.rid];
this.gridModel.listViewEvents.eventsCI[uid]=ci;
this.gridModel.listViewEvents.eventsUID.push(uid);
}
}
this.gridModel.modelUpdated();
},updateFilterButton:function(){
var _3ec=this.gridModel.getRowCount();
var _3ed="Viewing: "+_3ec+" Events";
},handleQuickAction:function(_3ee){
var uid=null;
var ci=null;
var comp=null;
uid=this.gridModel.listViewEvents.eventsUID[this.quickActionRow];
ci=this.gridModel.listViewEvents.eventsCI[uid];
comp=this.model.components[ci[this.model.indexEnum.id]];
switch(_3ee){
case "editEvent":
if(!this.model.calendars[comp[this.model.componentEnum.calid]][this.model.calendarEnum.writable]){
_1.debug("Read only event, can't edit.");
return;
}else{
this.editEvent(this.gridModel.editEvent(this.quickActionRow));
}
break;
case "emailEvent":
this.getComposeCB(_1.lang.hitch(this,function(_3f2){
_3f2.reset({subject:comp[this.model.componentEnum.summary],body:comp[this.model.componentEnum.description],isDirty:true});
}));
break;
case "deleteEvent":
if(!this.model.calendars[comp[this.model.componentEnum.calid]][this.model.calendarEnum.writable]){
_1.debug("Read only event, can't delete.");
ws.widget.OkCancelDialog.alert(Config.Strings.DeleteEventNotAllowed);
return;
}
this.promptConfirmDelete();
break;
}
},promptConfirmDelete:function(){
ws.widget.OkCancelDialog.alert(Config.Strings.RegEventMsg,ws.lang.hitch(this,function(ok){
if(ok){
this.deleteOneEvent();
}
}),true);
},deleteOneEvent:function(){
this.gridModel.deleteOneEvent(this.quickActionRow);
},handleCellClick:function(e){
if(ws.WebSuite.eventQuickViewWidget&&ws.WebSuite.eventQuickViewWidget.isShowing()){
ws.WebSuite.eventQuickViewWidget.closeCard();
}
var uid=null;
var ci=null;
var comp=null;
uid=this.gridModel.listViewEvents.eventsUID[e.rowIndex];
ci=this.gridModel.listViewEvents.eventsCI[uid];
comp=this.model.components[ci[this.model.indexEnum.id]];
if(!this.model.calendars[comp[this.model.componentEnum.calid]][this.model.calendarEnum.writable]){
var div=e.target;
this.readOnlyView(this.gridModel.editEvent(e.rowIndex),div);
}else{
this.editEvent(this.gridModel.editEvent(e.rowIndex));
}
e.stopPropagation();
},handleHoverControlClick:function(e){
_1.debug("UpcomingEventsViewWidget.handleHoverControlClick");
var uid=null;
var ci=null;
var comp=null;
uid=this.gridModel.listViewEvents.eventsUID[e.rowIndex];
ci=this.gridModel.listViewEvents.eventsCI[uid];
comp=this.model.components[ci[this.model.indexEnum.id]];
if(_1.html.hasClass(e.target,"trashHover")){
if(!this.model.calendars[comp[this.model.componentEnum.calid]][this.model.calendarEnum.writable]){
_1.debug("Read only event, can't delete.");
ws.widget.OkCancelDialog.alert(Config.Strings.DeleteEventNotAllowed);
return;
}
this.quickActionRow=e.rowIndex;
this.promptConfirmDelete();
}else{
ws.calendar.UpcomingEventsViewWidget.superclass.handleHoverControlClick.apply(this,arguments);
}
},setDate:function(_3fd){
this.targetDate=_3fd;
},setControllerWidget:function(_3fe){
this.controllerWidget=_3fe;
},getFirstDateInView:function(){
var _3ff=this.targetDate;
if(_3ff==null){
_3ff=new Date();
}
return ws.date.getFirstDayInMonthView(_3ff);
},getLastDateInView:function(){
var _400=this.targetDate;
if(_400==null){
_400=new Date();
}
return ws.date.getLastDayInMonthView(_400);
},componentFilter:function(_401){
if(_401[this.model.componentEnum.compType]!=0){
return false;
}
return true;
},addEvent:function(){
_1.debug("UpcomingEventsViewWidget.addEvent");
this.gridModel.addEvent();
},editEvent:function(args){
},readOnlyView:function(args,div){
},clearSearch:function(){
this.model.setSearchStr(null,true);
if(this.closeCB){
this.closeCB();
}
},updateSearchInfo:function(){
var _405=this.model.getSearchString();
_1.debug("searchString = "+_405);
if(_405){
_1.html.setClass(this.searchInfoPane,"searchInfoShown");
var _406=Math.max(this.gridModel.getRowCount(),0);
this.searchResultsNode.innerHTML=ws.string.substituteParams(Config.Strings.Calendar_Search_DisplaySearchHeader,_406,_1.string.escapeXml(_405));
this.clearSearchNode.innerHTML=Config.Strings.Clear;
}else{
this.searchResultsNode.innerHTML="";
this.clearSearchNode.innerHTML="";
}
},deleteEvents:function(){
_1.debug("UpcomingEventsViewWidget.deleteEvents");
_1.debug(this.gridModel.getSelectedUids().length);
_1.debugShallow(this.gridModel.getSelectedUids());
if(this.gridModel.getSelectedUids().length==0){
ws.widget.OkCancelDialog.alert(Config.Strings.NoCalItemsCheckedErrorMsg);
}else{
this.gridModel.deleteEvents(this.gridModel.getSelectedUids());
}
},updateToolbarState:function(){
var _407=this.gridModel.getSelectedUids().length>0;
if(this.setDeleteButtonEnabledCB){
this.setDeleteButtonEnabledCB(_407);
}
},isShowing:function(){
return (_1.html.isShowing(this.domNode)&&(ws.WebSuite.ViewWidget.selectedChild=="calendarView"));
},onKeyPress:function(evt){
if(this.isShowing()){
this._onKeyPress(evt);
}
},onEnterKeyPress:function(){
if(this.grid.lastOverCell){
if(ws.WebSuite.eventQuickViewWidget&&ws.WebSuite.eventQuickViewWidget.isShowing()){
ws.WebSuite.eventQuickViewWidget.closeCard();
}
var row=this.grid.over.row;
var uid=this.gridModel.listViewEvents.eventsUID[row];
var ci=this.gridModel.listViewEvents.eventsCI[uid];
var comp=this.model.components[ci[this.model.indexEnum.id]];
if(!this.model.calendars[comp[this.model.componentEnum.calid]][this.model.calendarEnum.writable]){
var col=this.gridModel.columns.Event;
var div=this.grid.rowNodes[row].childNodes[col];
this.readOnlyView(this.gridModel.editEvent(row),div);
}else{
this.editEvent(this.gridModel.editEvent(row));
}
}
},onDelKeyPress:function(){
if(this.grid.lastOverCell){
var row=this.grid.over.row;
var uid=this.gridModel.listViewEvents.eventsUID[row];
var ci=this.gridModel.listViewEvents.eventsCI[uid];
var comp=this.model.components[ci[this.model.indexEnum.id]];
if(!this.model.calendars[comp[this.model.componentEnum.calid]][this.model.calendarEnum.writable]){
ws.widget.OkCancelDialog.alert(Config.Strings.DeleteEventNotAllowed);
return;
}
this.quickActionRow=row;
this.promptConfirmDelete();
}
},notImplemented:function(){
alert("Not yet implemented");
}});
_1.provide("ws.calendar.CalendarViewWidget");
_1.require("dojo.widget.*");
_1.require("dojo.widget.PageContainer");
_1.require("ws.calendar.CalendarViewModel");
_1.require("ws.date");
_1.require("ws.reporting");
_1.require("ws.settings");
_1.require("ws.style");
_1.require("ws.widget.PopupDatePicker");
_1.require("ws.widget.WSButton");
_1.require("ws.widget.WSMenu");
_1.require("ws.io");
_1.widget.defineWidget("ws.calendar.CalendarViewWidget",_1.widget.HtmlWidget,{widgetsInTemplate:true,templateString:"<div class=\"WSCalendarView\" style=\"display: none;\">\r\n\t<div dojoAttachPoint=\"toolbar\" class=\"toolbar\">\r\n\t\t<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"table-layout: fixed; width: 100%;\">\r\n\t\t\t<tr>\r\n\t\t\t\t<td class=\"left wsToolbar\">\r\n\t\t\t\t\t<div dojoType=\"ws:WSButton\" border=\"right\" dojoAttachEvent=\"onClick: addEvent\">${NewEventBtn}</div>\r\n\t\t\t\t\t<div dojoType=\"ws:WSButton\" border=\"right\" dojoAttachPoint=\"printButton\" dojoAttachEvent=\"onClick: showPrintView\">${PrintButton}</div>\r\n\t\t\t\t\t<div dojoType=\"ws:WSDropDownButton\" border=\"right\" dojoAttachPoint=\"actionButton\"></div>\r\n\t\t\t\t\t<div dojoType=\"ws:WSMenu\" dojoAttachPoint=\"actionMenu\">\r\n\t\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${CalImportBtnLbl}\" dojoAttachPoint=\"importItem\"></div>\r\n\t\t\t\t\t\t<div dojoType=\"ws:WSMenuItem\" caption=\"${Export}\" dojoAttachPoint=\"exportItem\"></div>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div dojoType=\"ws:WSButton\" border=\"right\" dojoAttachPoint=\"deleteButton\" dojoAttachEvent=\"onClick: deleteEvents\">${Delete}</div>\r\n\t\t\t\t</td>\r\n\t\t\t\t<td align=\"right\" class=\"wsToolbar\">\r\n\t\t\t\t\t<a href=\"#\" dojoAttachPoint=\"monthViewLink\" dojoAttachEvent=\"onClick: selectMonthView\" class=\"wsLink viewLink\">${UCMonth}</a>\r\n\t\t\t\t\t<a href=\"#\" dojoAttachPoint=\"weekViewLink\" dojoAttachEvent=\"onClick: selectWeekView\" class=\"wsLink viewLink\">${UCWeek}</a>\r\n\t\t\t\t\t<a href=\"#\" dojoAttachPoint=\"dayViewLink\" dojoAttachEvent=\"onClick: selectDayView\" class=\"wsLink viewLink lastViewLink\">${UCday}</a>\r\n\t\t\t\t\t<!-- <a href=\"#\" dojoAttachPoint=\"upcomingViewLink\" dojoAttachEvent=\"onClick: selectUpcomingView\" class=\"wsLink viewLink\">${Upcoming}</a> -->\r\n\t\t\t\t</td>\r\n\t\t\t\t<td width=\"40\" class=\"wsToolbar\">\r\n\t\t\t\t\t<div dojoAttachEvent=\"onMouseOver: showPicker\" dojoAttachPoint=\"pickerButton\" class=\"pickerButton\">&nbsp;</div>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t</table>\r\n\t</div>\r\n\t<div dojoAttachPoint=\"searchbar\" class=\"searchbar\">\r\n\t\t<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"table-layout: fixed; width: 100%;\">\r\n\t\t\t<tr>\r\n\t\t\t\t<td align=\"left\" width=\"30\"><div class=\"prevButton\" dojoAttachEvent=\"onClick: decrementRange\">&nbsp;</div></td>\r\n\t\t\t\t<td align=\"left\" width=\"25\"><div class=\"nextButton\" dojoAttachEvent=\"onClick: incrementRange\">&nbsp;</div></td>\r\n\t\t\t\t<td align=\"left\" width=\"60\">\r\n\t\t\t\t<div class=\"todayButton\" dojoAttachEvent=\"onClick: setToday\">\r\n\t\t\t\t\t<nobr class=\"content\">\r\n\t\t\t\t\t${Today}\r\n\t\t\t\t\t</nobr>\r\n\t\t\t\t</div>\r\n\t\t\t\t</td>\r\n\t\t\t\t<td align=\"left\" class=\"dateSpanContainer\"><span dojoAttachPoint=\"dateSpanLabel\" class=\"dateSpanLabel\"></span></td>\r\n\t\t\t\t<td>\r\n\t\t\t\t\t<input dojoAttachPoint=\"calendarInputDate\" class=\"eventInputDate wsInput\"/>\r\n\t\t\t\t\t<input dojoAttachPoint=\"calendarInputName\" class=\"eventInputName wsInput\" value=\"${AddEventNameShort}\"/>\r\n\t\t\t\t</td>\r\n\t\t\t\t<td width=\"40\"><div class=\"quickAddButton\" dojoAttachPoint=\"quickAddButton\" dojoAttachEvent=\"onClick: onQuickAdd\">&nbsp;</div></td>\r\n\t\t\t</tr>\r\n\t\t</table>\r\n\t</div>\r\n\t<div dojoAttachPoint=\"view\"></div>\r\n\t<div dojoType=\"ws:PopupDualDatePicker\" dojoAttachPoint=\"popupPicker\" toggle=\"wipe\" toggleDuration=\"150\" closeOnMouseOut=\"true\" width=\"150\"></div>\r\n\t<div dojoType=\"ws:PopupDatePicker\" dojoAttachPoint=\"quickAddPicker\" toggle=\"wipe\" toggleDuration=\"150\" closeOnMouseOut=\"true\" width=\"150\" hidePickerOnSetDate=\"true\"></div>\r\n</div>\r\n",templateCssString:".WSCalendarView\r\n{\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\toverflow: hidden;\r\n}\r\n\r\n.WSCalendarView .toolbar\r\n{\r\n\tbackground-color: #f3efe6;\r\n}\r\n\r\n.WSCalendarView .toolbar td.left .wsButton\r\n{\r\n\tfloat: left;\r\n}\r\n.WSCalendarView .toolbar td.left .wsButton .content\r\n{\r\n\tpadding: 6px 9px 5px 7px;\r\n}\r\n\r\n.WSCalendarView .toolbar td.center\r\n{\r\n\twidth: 240px;\r\n}\r\n\r\n.WSCalendarView .toolbar a.viewLink\r\n{\r\n\tpadding-right: 5px;\r\n}\r\n\r\n.WSCalendarView .toolbar a.lastViewLink\r\n{\r\n\tmargin-right: 5px;\r\n}\r\n\r\n.WSCalendarView .toolbar a.viewLinkSelected\r\n{\r\n\tcolor: #000;\r\n\tfont-weight:bold;\r\n\tcursor: default;\r\n\ttext-decoration: none;\r\n}\r\n\r\n.WSCalendarView .toolbar .pickerButton\r\n{\r\n\tbackground: url(\"${images}main.gif\") -1151px 0px;\r\n\twidth: 18px;\r\n\theight: 18px;\r\n\tcursor: pointer;\r\n}\r\n\r\n.WSCalendarView .toolbar .pickerButton:hover\r\n{\r\n\tbackground-position: -1170px 0px;\r\n}\r\n\r\n.WSCalendarView .searchbar\r\n{\r\n\tpadding: 4px 1px;\r\n\tbackground-color: #F4F2F0;\r\n\tborder-bottom: 2px solid #D8D6D3;\r\n\tfont-family: verdana;\r\n\tfont-size: 11px;\r\n\tcolor: #999999;\r\n}\r\n\r\n.WSCalendarView .searchbar a.searchLink\r\n{\r\n\tcolor: #000000;\r\n\ttext-decoration: underline;\r\n}\r\n\r\n.WSCalendarView .searchbar .dateSpanContainer\r\n{\r\n\t/*width: 150px;*/\r\n\twhite-space: nowrap;\r\n}\r\n\r\n.WSCalendarView .searchbar span.dateSpanLabel\r\n{\r\n\tcolor: #000000;\r\n\tfont-size: large;\r\n\tfont-family: Arial;\r\n\ttext-decoration: none;\r\n}\r\n\r\n.WSCalendarView .searchbar a.dateSpanLabel:hover\r\n{\r\n\ttext-decoration: underline;\r\n}\r\n\r\n.WSCalendarView .searchbar .prevButton\r\n{\r\n\tbackground: url(\"${images}main.gif\") -1545px -1px;\r\n\twidth: 16px;\r\n\theight: 16px;\r\n\tcursor: pointer;\r\n\tmargin-left: 9px;\r\n}\r\n\r\n.WSCalendarView .searchbar .prevButton:hover\r\n{\r\n\tbackground-position: -1575px -1px;\r\n}\r\n\r\n.WSCalendarView .searchbar .nextButton\r\n{\r\n\tbackground: url(\"${images}main.gif\") -1455px -1px;\r\n\twidth: 16px;\r\n\theight: 16px;\r\n\tcursor: pointer;\r\n}\r\n.WSCalendarView .searchbar .nextButton:hover\r\n{\r\n\tbackground-position: -1485px -1px;\r\n}\r\n\r\n.WSCalendarView .searchbar .quickAddButton\r\n{\r\n\tbackground: url(\"${images}main.gif\") -1190px -1px;\r\n\twidth: 16px;\r\n\theight: 16px;\r\n\tcursor: pointer;\r\n\tmargin: 0px auto auto 2px;\r\n}\r\n.WSCalendarView .searchbar .quickAddButton:hover\r\n{\r\n\tbackground-position: -1213px -1px;\r\n}\r\n\r\n\r\n\r\n.WSCalendarView .searchbar input.eventInputName, .WSCalendarView .searchbar input.eventInputDate\r\n{\r\n\tfont-family: verdana;\r\n\tfont-size: 11px;\r\n\tcolor: #999999;\r\n\twidth: 134px;\r\n\tvertical-align: middle;\r\n\tborder: solid 1px #85817c;\r\n\tpadding: 2px 2px 2px 6px;\r\n\tmargin-right: 3px;\r\n\tfloat: right;\r\n}\r\n\r\n.WSCalendarView .searchbar input.eventInputNameNatural\r\n{\r\n\tfont-family: verdana;\r\n\tfont-size: 11px;\r\n\tcolor: #999999;\r\n\twidth: 240px;\r\n\tvertical-align: middle;\r\n\tborder: solid 1px #85817c;\r\n\tpadding: 2px 2px 2px 6px;\r\n\tmargin-right: 3px;\r\n\tfloat: right;\r\n}\r\n\r\n.WSCalendarView .searchbar input.eventInputDate\r\n{\r\n\twidth: 90px;\r\n\tcolor: #000;\r\n}\r\n\r\n.WSCalendarView .todayButton \r\n{\r\n\tfont-family: verdana;\r\n\tfont-size: 9px;\r\n\tfont-weight:bold;\r\n\tmargin: 0px 1px;\r\n\tposition: relative;\r\n\ttext-align: center;\r\n\tvertical-align: middle;\r\n\tcolor: #FFFFFF;\r\n\twidth: 50px;\r\n\theight: 16px;\r\n}\r\n\r\n.WSCalendarView .todayButton .content\r\n{\r\n\tbackground: url(\"${images}backgrounds.gif\") -0px -214px repeat-x;\r\n\tcursor: pointer;\r\n\tdisplay: block;\r\n\tposition: absolute;\r\n\tleft: 0px;\t\r\n\twidth: 50px;\r\n\theight: 16px;\r\n}\r\n\r\n.WSCalendarView .todayButton .content:hover\r\n{\r\n\tbackground: url(\"${images}backgrounds.gif\") -0px -230px repeat-x;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/calendar/CalendarViewWidget.css"),VIEW_MONTH:0,VIEW_WEEK:1,VIEW_DAY:2,VIEW_UPCOMING:3,VIEW_IMPORT:4,VIEW_EXPORT:5,dndCleanupClasses:{"columnViewDirectEntryGhost":true},initTmpDate:null,initTmpView:0,defaultView:this.VIEW_MONTH,defaultSearchInputText:null,QUICKADD_ACTIVE_COLOR:"#000000",QUICKADD_INACTIVE_COLOR:"#999999",fillInTemplate:function(){
this.initialized=false;
this.targetDate=null;
this.model=null;
this.views=new Array();
this.viewLinks=new Array();
this.selectedViewId=0;
},postCreate:function(args,frag){
this.viewLinks[this.VIEW_MONTH]=this.monthViewLink;
this.viewLinks[this.VIEW_WEEK]=this.weekViewLink;
this.viewLinks[this.VIEW_DAY]=this.dayViewLink;
this.viewLinks[this.VIEW_UPCOMING]=this.upcomingViewLink;
this.viewLinks[this.VIEW_IMPORT]=this.importLink;
this.viewLinks[this.VIEW_EXPORT]=this.exportLink;
this.calendarInputName.value=this.getCalendarInputNameText(Config.NaturalLanguageEnabled);
if(Config.NaturalLanguageEnabled){
this.calendarInputName.title=this.getCalendarInputNameTooltip(Config.NaturalLanguageEnabled);
this.calendarInputDate.style.display="none";
_1.html.setClass(this.calendarInputName,"eventInputNameNatural");
_1.event.connect(this.calendarInputName,"onclick",ws.lang.hitch(this,"naturalLanguageStart",this.calendarInputName));
}else{
_1.event.connect(this.calendarInputName,"onclick",ws.lang.hitch(this,"openQuickAdd",this.calendarInputName));
_1.event.connect(this.calendarInputDate,"onclick",ws.lang.hitch(this,"openQuickAdd",this.calendarInputDate));
}
_1.event.topic.subscribe("Suite/onKeyOnPress",this,"onKeyPress");
},onQuickAdd:function(evt){
if(Config.NaturalLanguageEnabled){
this.naturalLanguageQuickAdd();
}else{
this.openQuickAdd(null,evt);
}
},setModel:function(_416){
this.model=_416;
_1.event.connectOnce(this.model,"modelUpdated",_1.lang.hitch(this,function(){
this.update(true);
}));
_1.event.connectOnce(this.model,"requestUpdate",this,"fetchData");
},getCalendarInputNameText:function(_417){
var ret=Config.Strings.AddEventNameShort;
if(_417){
var _419=null;
var rand=Math.ceil(Math.random()*3);
switch(rand){
case 1:
_419=Config.Strings.Calendar_QuickAdd_GhostTextEx1;
break;
case 2:
_419=Config.Strings.Calendar_QuickAdd_GhostTextEx2;
break;
case 3:
_419=Config.Strings.Calendar_QuickAdd_GhostTextEx3;
break;
}
_419=ws.string.substituteParams(Config.Strings.Calendar_QuickAdd_GhostTextExContainer,_419);
ret=Config.Strings.Calendar_QuickAdd_GhostText+" "+_419;
}
return ret;
},getCalendarInputNameTooltip:function(_41b){
var ret="";
if(_41b){
var sep=Config.Strings.Calendar_QuickAdd_GhostTextExSeparator+"\n";
ret=Config.Strings.Calendar_QuickAdd_GhostTextEx1+sep+Config.Strings.Calendar_QuickAdd_GhostTextEx2+sep+Config.Strings.Calendar_QuickAdd_GhostTextEx3;
ret=ws.string.substituteParams(Config.Strings.Calendar_QuickAdd_GhostTextExContainer,ret);
}
return ret;
},init:function(){
if(this.initialized){
return;
}
_1.debug("CalendarViewWidget.init");
this.deleteButton.hide();
this.isIE60=_1.render.html.ie60;
this.notebookWidget=_1.widget.createWidget("dojo:PageContainer",null,this.view);
if(Settings.CalendarViewType=="Day"){
this.defaultView=this.VIEW_DAY;
}else{
if(Settings.CalendarViewType=="Week"){
this.defaultView=this.VIEW_WEEK;
}else{
this.defaultView=this.VIEW_MONTH;
}
}
this.selectTab(this.defaultView);
if(this.model.isSuccess){
this.update();
}else{
this.model.getData();
}
this.model.retrieveIndexOnGetDataCB=ws.lang.hitch(this,"retrieveIndexOnGetData");
_1.event.connect(this.popupPicker.datePicker,"selectDateConnect",this,"setDate");
_1.event.connect(this.quickAddPicker.datePicker,"selectDateConnect",this,"fillInDateField");
_1.event.topic.subscribe("InlineAddEvent/close",this,"dndCleanup");
_1.event.topic.subscribe("SettingsChanged/Calendar",ws.lang.hitch(this,"needsRepaint"));
_1.event.topic.subscribe("EditCalendar/Delete",ws.lang.hitch(this,"needsRepaint"));
if(!Config.NaturalLanguageEnabled){
this.calendarInputDate.value=ws.date.formatDateTime(new Date(),Config.Strings.DatePickerFooterDateFormat);
}
this.firstLoadingMessageShown=false;
_1.event.topic.publish("WSFeedbackStart",Config.Strings.Loading);
this.initialized=true;
this.actionButton.menu=this.actionMenu;
this.actionButton.setLabel(Config.Strings.ActionButton);
this.importItem.onClick=ws.lang.hitch(this,"handleAction",this.importItem);
this.exportItem.onClick=ws.lang.hitch(this,"handleAction",this.exportItem);
this.initSelectViewFromQueryParam();
},update:function(_41e){
if(this.targetDate==null){
if(this.model.today){
this.targetDate=this.model.today;
}else{
var now=new Date();
this.targetDate=new Date(now.getFullYear(),now.getMonth(),now.getDate());
}
}
var _420=this.getViewDateSpanText(this.selectedViewId,this.targetDate);
ws.html.setInnerText(this.dateSpanLabel,_420);
var _421=this.notebookWidget.selectedChildWidget;
_421.setModel(this.model);
_421.setDate(this.targetDate);
if(_421.clickAction){
_421.clickAction.destroyClickIndicator();
}
var _422=_421.getFirstDateInView();
var _423=_421.getLastDateInView();
if((_422<this.model.dtstart)||(_423>this.model.dtend)){
var _424=ws.date.add(this.targetDate,ws.date.dateParts.MONTH,-3);
var _425=ws.date.add(this.targetDate,ws.date.dateParts.MONTH,3);
var _426=this.isUpcomingView();
var _427=this.model.getDefaultArgs(_426);
_427.dtstart=ws.date.formatISO8601(_424);
_427.dtend=ws.date.formatISO8601(_425);
if(_426&&!(_1.string.isBlank(this.model.searchStr))){
_427.search=this.model.searchStr;
_427.searchIn=null;
_427.sortBy=this.model.sortBy;
_427.sortDir=this.model.sortDir;
_427.ignoreCache=true;
}
if(!_41e){
this.model.getData(_427);
}
}else{
if((null!=this.initTmpView&&this.initTmpView!=this.VIEW_MONTH)||null!=this.initTmpDate){
_1.lang.setTimeout(this,"initSelectTabAndDate",0,this.initTmpDate,this.initTmpView);
}
}
if(false==this.firstLoadingMessageShown){
_1.event.topic.publish("WSFeedbackEnd",Config.Strings.Loading);
this.firstLoadingMessageShown=true;
}
},fetchData:function(){
var _428=ws.date.add(this.targetDate,ws.date.dateParts.MONTH,-3);
var _429=ws.date.add(this.targetDate,ws.date.dateParts.MONTH,3);
var _42a=this.isUpcomingView();
var _42b=this.model.getDefaultArgs(_42a);
_42b.dtstart=ws.date.formatISO8601(_428);
_42b.dtend=ws.date.formatISO8601(_429);
this.model.getData(_42b);
},onResized:function(){
var _42c=ws.style.getContentBoxHeightFast(this.domNode)-ws.style.getMarginBoxHeightFast(this.toolbar)-ws.style.getMarginBoxHeightFast(this.searchbar);
ws.style.setMarginBoxHeightFast(this.notebookWidget.domNode,_42c);
if(this.isIE60){
var _42d=ws.style.getContentBoxWidthFast(this.domNode);
ws.style.setMarginBoxWidthFast(this.notebookWidget.domNode,_42d);
}
this.notebookWidget.onResized();
},isUpcomingView:function(){
return (this.VIEW_UPCOMING==this.selectedViewId);
},handleAction:function(item){
switch(item.caption){
case Config.Strings.CalImportBtnLbl:
_1.debug("import");
this.selectImport();
break;
case Config.Strings.Export:
_1.debug("export");
this.selectExport();
break;
default:
break;
}
},selectTab:function(_42f){
var tab=this.views[_42f];
var link=this.viewLinks[_42f];
var _432=false;
if(!tab){
var _433=null;
var _434=null;
switch(_42f){
case this.VIEW_MONTH:
_433="GridViewWidget";
_434={rows:6,columns:7,showGridHead:false,showDayInfo:true,showTimeLabel:false};
break;
case this.VIEW_WEEK:
_433="ColumnViewWidget";
_434={rows:1,columns:7,showGridHead:false,showDayInfo:true,showTimeLabel:true,maxConflicts:7};
break;
case this.VIEW_DAY:
_433="ColumnViewWidget";
_434={rows:1,columns:1,showGridHead:false,showDayInfo:false,showTimeLabel:true,maxConflicts:0};
break;
case this.VIEW_UPCOMING:
_433="UpcomingEventsViewWidget";
_434={closeCB:_1.lang.hitch(this,"backToList")};
break;
case this.VIEW_IMPORT:
_433="ImportCompsWidget";
_434={closeCB:_1.lang.hitch(this,"backToList")};
_432=true;
break;
case this.VIEW_EXPORT:
_433="ExportCompsWidget";
_434={closeCB:_1.lang.hitch(this,"backToList")};
_432=true;
break;
}
tab=_1.widget.createWidget("ws:"+_433,_434);
tab.setControllerWidget(this);
this.notebookWidget.addChild(tab);
this.views[_42f]=tab;
_1.event.connect("after",tab,"editEvent",this,"editEvent");
_1.event.connect("after",tab,"readOnlyView",this,"readOnlyView");
_1.event.connect(tab,"quickView",this,"quickView");
_1.event.connect(tab,"hideQuickView",this,"hideQuickView");
_1.event.connect("after",tab,"inlineAddEvent",this,"inlineAddEvent");
if(this.VIEW_UPCOMING==_42f){
tab.getComposeCB=this.getComposeCB;
tab.setDeleteButtonEnabledCB=ws.lang.hitch(this,"setDeleteButtonEnabled");
}
}
if(_42f==this.VIEW_IMPORT||_42f==this.VIEW_EXPORT){
_432=true;
}
if(_432){
this.toolbar.style.display="none";
this.searchbar.style.display="none";
}else{
if(this.toolbar.style.display=="none"){
this.toolbar.style.display="";
}
if(this.searchbar.style.display=="none"){
this.searchbar.style.display="";
}
}
_1.html.removeClass(this.viewLinks[this.selectedViewId],"viewLinkSelected");
_1.html.addClass(this.viewLinks[_42f],"viewLinkSelected");
this.notebookWidget.selectChild(tab);
this.selectedViewId=_42f;
this.update();
if(this.isShowing()){
this.reportCurrentView();
}
},reportCurrentView:function(){
var _435;
switch(this.selectedViewId){
case this.VIEW_MONTH:
_435="Month View";
break;
case this.VIEW_WEEK:
_435="Week View";
break;
case this.VIEW_DAY:
_435="Day View";
break;
case this.VIEW_UPCOMING:
_435="Search Calendar";
break;
case this.VIEW_IMPORT:
_435="Import Calendar";
break;
case this.VIEW_EXPORT:
_435="Export Calendar";
break;
}
ws.reporting.report(_435,"Calendar");
},onShow:function(){
ws.calendar.CalendarViewWidget.superclass.onShow.apply(this,arguments);
this.reportCurrentView();
},openQuickAdd:function(_436,evt){
evt.stopPropagation();
var _438=_1.render.html.ie?[-15,-9]:[-17,-9];
var _439=((this.selectedViewId==this.VIEW_DAY)||(this.selectedViewId==this.VIEW_WEEK))?false:true;
this.getQuickAddWidgetCB(_1.lang.hitch(this,function(){
ws.WebSuite.quickAddWidget.setModel(this.model);
ws.WebSuite.quickAddWidget.initAndShow(this.calendarInputName,{"TL":"TL"},_438,this.isUpcomingView(),this,_436?_436:null,_439);
_1.event.connect(ws.WebSuite.quickAddWidget,"setDate",this,"setDate");
}));
ws.reporting.reportAction("Quick Add Event");
},naturalLanguageQuickAdd:function(evt){
var _43b=this.isUpcomingView();
this.eventInfo=this.model.getDefaultComponentArgs(_43b);
this.eventInfo.useNaturalLanguage=true;
this.eventInfo.summary=this.calendarInputName.value;
this.eventInfo.loadCallback=_1.lang.hitch(this,function(){
_1.event.topic.publish("WSFeedbackStart",Config.Strings.EventCreated,true);
});
this.model.saveComponent(this.eventInfo);
this.calendarInputName.value=this.getCalendarInputNameText(Config.NaturalLanguageEnabled);
this.calendarInputName.style.color="#999999";
},naturalLanguageStart:function(evt){
this.calendarInputName.value="";
this.calendarInputName.style.color="#000000";
},initSelectTabAndDate:function(date,view){
if(null!=this.initTmpDate){
this.targetDate=this.initTmpDate;
}
if(null!=this.initTmpView){
if(this.VIEW_DAY==this.initTmpView){
this.selectDayView();
}else{
if(this.VIEW_WEEK==this.initTmpView){
this.selectWeekView();
}else{
if(this.VIEW_MONTH==this.initTmpView){
this.selectMonthView();
}else{
if(this.VIEW_UPCOMING==this.initTmpView){
this.selectUpcomingView();
}
}
}
}
}
this.initTmpDate=null;
this.initTmpView=null;
},initSelectViewFromQueryParam:function(){
var _43f=ws.io.getQueryParameter("view");
if(null!=_43f){
var _440=ws.io.getQueryParameter("date");
var date=null;
if(null!=_440){
if(_440.length>8){
_440=_440.substring(0,8);
}
try{
date=new Date(ws.date.GetDateFromFormat(_440,ws.date.RFC2445));
}
catch(ex){
date=new Date();
}
}
var view=this.VIEW_MONTH;
if(_43f=="d"){
view=this.VIEW_DAY;
}else{
if(_43f=="w"){
view=this.VIEW_WEEK;
}else{
if(_43f=="m"){
view=this.VIEW_MONTH;
}else{
if(_43f=="u"){
view=this.VIEW_UPCOMING;
}
}
}
}
if(null!=date){
}
this.initTmpDate=date;
this.initTmpView=view;
}
},isPageLocaleDateSpanStyle1:function(){
return ("de-de"==Config.PageLocale);
},isPageLocaleDateSpanStyle2:function(){
var ret=false;
switch(Config.PageLocale){
case "fr-fr":
case "en-gb":
case "en-in":
case "es-es":
case "it-it":
ret=true;
break;
}
return ret;
},getViewDateSpanText:function(id,_445){
var txt=null;
if(id==this.VIEW_WEEK){
var _447=Config.FirstDayOfWeek;
var _448=ws.date.GetFirstDayInWeek(_445,_447);
var _449=ws.date.GetLastDayInWeek(_445,_447);
var _44a;
if(_448.getMonth()==_449.getMonth()){
if(this.isPageLocaleDateSpanStyle1()){
_44a=_448.getDate()+". - "+_449.getDate()+". "+ws.date.formatDateTime(_448,"NNN")+" "+_449.getFullYear();
}else{
if(this.isPageLocaleDateSpanStyle2()){
_44a=_448.getDate()+" - "+_449.getDate()+" "+ws.date.formatDateTime(_448,"NNN")+" "+_449.getFullYear();
}else{
_44a=ws.date.formatDateTime(_448,Config.Strings.CalYboxDateFormat)+"-"+_449.getDate()+", "+_449.getFullYear();
}
}
}else{
if(this.isPageLocaleDateSpanStyle1()){
_44a=ws.date.formatDateTime(_448,Config.Strings.CalYboxDateFormat)+" - "+ws.date.formatDateTime(_449,Config.Strings.CalYboxDateFormat)+" "+_449.getFullYear();
}else{
if(this.isPageLocaleDateSpanStyle2()){
_44a=ws.date.formatDateTime(_448,Config.Strings.CalYboxDateFormat)+" - "+ws.date.formatDateTime(_449,Config.Strings.CalYboxDateFormat)+" "+_449.getFullYear();
}else{
_44a=ws.date.formatDateTime(_448,Config.Strings.CalYboxDateFormat)+" - "+ws.date.formatDateTime(_449,Config.Strings.CalYboxDateFormat)+", "+_449.getFullYear();
}
}
}
txt=_44a;
}else{
switch(id){
case this.VIEW_MONTH:
fmt=Config.Strings.DatePickerHeaderDateFormat;
break;
case this.VIEW_DAY:
fmt=Config.Strings.CalYboxDateFormat3;
break;
case this.VIEW_UPCOMING:
fmt=Config.Strings.DatePickerHeaderDateFormat;
break;
default:
fmt=Config.Strings.DatePickerHeaderDateFormat;
break;
}
txt=ws.date.formatDateTime(this.targetDate,fmt);
}
return txt;
},selectGridView:function(id){
var _44c=this.getViewDateSpanText(id,this.targetDate);
ws.html.setInnerText(this.dateSpanLabel,_44c);
this.model.setSearchStr(this.defaultSearchInputText);
this.deleteButton.hide();
this.printButton.show();
if(this.views[id]){
this.selectTab(id);
}else{
_1.event.topic.publish("WSFeedbackStart",Config.Strings.Loading);
_1.lang.setTimeout(this,function(){
this.selectTab(id);
_1.event.topic.publish("WSFeedbackEnd",Config.Strings.Loading);
},0);
}
},selectMonthView:function(evt){
this.monthViewLink.blur();
this.selectGridView(this.VIEW_MONTH);
},selectWeekView:function(evt){
this.weekViewLink.blur();
this.selectGridView(this.VIEW_WEEK);
},selectDayView:function(evt){
this.dayViewLink.blur();
this.selectGridView(this.VIEW_DAY);
},selectListView:function(evt,_451,_452){
this.deleteButton.show();
this.printButton.hide();
if(this.views[this.VIEW_UPCOMING]){
this.selectTab(this.VIEW_UPCOMING);
this.model.setSearchStr(_452);
}else{
_1.event.topic.publish("WSFeedbackStart",Config.Strings.Loading);
_1.lang.setTimeout(this,function(){
this.selectTab(this.VIEW_UPCOMING);
if(_452!=null){
this.model.setSearchStr(_452);
}
_1.event.topic.publish("WSFeedbackEnd",Config.Strings.Loading);
},0);
}
},selectUpcomingView:function(evt){
this.model.setSearchStr(this.defaultSearchInputText);
this.selectListView(evt);
},selectSearchViewWithArg:function(_454,_455){
this.selectListView(null,_454,_455);
},selectSearchView:function(evt){
this.selectListView(evt);
},onSearchLinkKeyPress:function(evt){
if(evt.keyCode==evt.KEY_ENTER){
this.selectSearchView(evt);
}else{
if(evt.keyCode==evt.KEY_ESCAPE){
this.calendarInputName.value=this.defaultSearchInputText;
}
}
},selectImport:function(evt){
if(this.views[this.VIEW_IMPORT]){
this.selectTab(this.VIEW_IMPORT);
}else{
_1.event.topic.publish("WSFeedbackStart",Config.Strings.Loading);
_1.lang.setTimeout(this,function(){
this.selectTab(this.VIEW_IMPORT);
_1.event.topic.publish("WSFeedbackEnd",Config.Strings.Loading);
},0);
}
},selectExport:function(evt){
if(this.views[this.VIEW_EXPORT]){
this.selectTab(this.VIEW_EXPORT);
}else{
_1.event.topic.publish("WSFeedbackStart",Config.Strings.Loading);
_1.lang.setTimeout(this,function(){
this.selectTab(this.VIEW_EXPORT);
_1.event.topic.publish("WSFeedbackEnd",Config.Strings.Loading);
},0);
}
},decrementRange:function(evt){
switch(this.selectedViewId){
case this.VIEW_MONTH:
case this.VIEW_UPCOMING:
this.targetDate=ws.date.getPreviousMonth(this.targetDate);
break;
case this.VIEW_WEEK:
this.targetDate=ws.date.add(this.targetDate,ws.date.dateParts.DAY,-7);
break;
case this.VIEW_DAY:
this.targetDate=ws.date.add(this.targetDate,ws.date.dateParts.DAY,-1);
break;
}
this.update();
this.reportCurrentView();
},incrementRange:function(evt){
switch(this.selectedViewId){
case this.VIEW_MONTH:
case this.VIEW_UPCOMING:
this.targetDate=ws.date.getNextMonth(this.targetDate);
break;
case this.VIEW_WEEK:
this.targetDate=ws.date.add(this.targetDate,ws.date.dateParts.DAY,7);
break;
case this.VIEW_DAY:
this.targetDate=ws.date.add(this.targetDate,ws.date.dateParts.DAY,1);
break;
}
this.update();
this.reportCurrentView();
},setToday:function(){
var now=new Date();
this.setDate(new Date(now.getFullYear(),now.getMonth(),now.getDate()));
},setDeleteButtonEnabled:function(_45d){
ws.widget.setEnabled(this.deleteButton,_45d);
},setDate:function(_45e){
this.targetDate=_45e;
this.update();
this.reportCurrentView();
},showPicker:function(evt){
if(this.popupPicker!=null&&!this.popupPicker.isShowingNow){
this.popupPicker.open(this.pickerButton,this,this.pickerButton,{"BR":"TR"});
}
},inlineAddEvent:function(_460,args,_462,_463,_464){
_1.debug("CalendarViewWidget.inlineAddEvent()");
this.getInlineAddEventWidgetCB(_1.lang.hitch(this,function(){
if(_462&&_463){
ws.WebSuite.inlineAddEventDialog.initializeView(_460,args,_462,_463,_464?_464:null);
}else{
ws.WebSuite.inlineAddEventDialog.initializeView(_460,args,null,null,_464?_464:null);
}
}));
ws.reporting.reportAction("Add Event - Inline");
},addEvent:function(){
_1.debug("CalendarViewWidget.addEvent()");
this.getAddEditWidgetCB(_1.lang.hitch(this,function(){
ws.WebSuite.addEditDialog.setModel(this.model);
ws.WebSuite.addEditDialog.showIndexCB=ws.lang.hitch(this,"isUpcomingView");
ws.WebSuite.addEditDialog.show();
_1.event.connect(ws.WebSuite.addEditDialog,"setDate",this,"setDate");
}));
ws.reporting.reportAction("Add Event - Full");
},editEvent:function(args){
_1.debug("CalendarViewWidget.editEvent()");
this.getAddEditWidgetCB(_1.lang.hitch(this,function(){
ws.WebSuite.addEditDialog.setModel(this.model);
ws.WebSuite.addEditDialog.showIndexCB=ws.lang.hitch(this,"isUpcomingView");
ws.WebSuite.addEditDialog.show(1,args);
_1.event.connect(ws.WebSuite.addEditDialog,"setDate",this,"setDate");
}));
ws.reporting.reportAction("Edit Event");
},readOnlyView:function(args,div){
this.quickView(args,false,div,{"BL":"TL"});
},quickView:function(args,_469,_46a,_46b){
this.getEventQuickViewWidgetCB(_1.lang.hitch(this,function(){
ws.WebSuite.eventQuickViewWidget.setModel(this.model);
ws.WebSuite.eventQuickViewWidget.initializeView(args,_469,_46a,_46b);
}));
ws.reporting.reportAction("Event Quick View");
},hideQuickView:function(){
_1.debug("calendarViewWidget.hideQuickView()");
if(ws.WebSuite.eventQuickViewWidget!=null&&ws.WebSuite.eventQuickViewWidget.isShowing()){
ws.WebSuite.eventQuickViewWidget.closeCard();
}
},deleteEvents:function(evt){
this.notebookWidget.selectedChildWidget.deleteEvents();
},showPrintView:function(){
var str=null;
var date=ws.date.formatRFC2445(this.targetDate);
var _46f=Config.Strings.PrintButton;
var _470="";
switch(this.selectedViewId){
case this.VIEW_MONTH:
str=Config.BaseCalendarPagesURL+"PrintMonth.aspx?date="+date;
_470="Print Month";
break;
case this.VIEW_WEEK:
str=Config.BaseCalendarPagesURL+"PrintWeek.aspx?date="+date;
_470="Print Week";
break;
case this.VIEW_DAY:
str=Config.BaseCalendarPagesURL+"PrintDay.aspx?date="+date;
_470="Print Day";
break;
}
if(str!=null){
var hw=ws.io.openWindow(str,_46f,"");
if(hw!=null){
hw.focus();
ws.reporting.report(_470,"Calendar");
}
}
},dndCleanup:function(){
_1.debug("CalendarViewWidget.dndCleanup");
var _472=this.notebookWidget.selectedChildWidget;
var node=_472.domNode;
_472.cancelClick();
for(var c in this.dndCleanupClasses){
var _475=_1.html.getElementsByClass(c,node);
for(var i=0;i<_475.length;i++){
_1.html.removeNode(_475[i]);
}
}
},backToList:function(){
this.toolbar.style.display="";
this.searchbar.style.display="";
if(this.defaultView==this.VIEW_MONTH){
this.selectMonthView();
}else{
if(this.defaultView==this.VIEW_WEEK){
this.selectWeekView();
}else{
if(this.defaultView==this.VIEW_DAY){
this.selectDayView();
}else{
if(this.defaultView==this.VIEW_UPCOMING){
this.selectUpcomingView();
}
}
}
}
},retrieveIndexOnGetData:function(){
return this.isUpcomingView();
},needsRepaint:function(){
_1.debug("needsRepaint");
this.needsRepaint=true;
},repaint:function(){
_1.debug("repaint");
if(this.needsRepaint){
_1.debug("repaint: getDataSettingsChanged");
this.model.getDataSettingsChanged();
this.needsRepaint=false;
}
this.update();
},selectViewAndUpdate:function(){
_1.debug("selectViewAndUpdate called");
switch(this.selectedViewId){
case this.VIEW_MONTH:
this.selectGridView(this.VIEW_MONTH);
break;
case this.VIEW_WEEK:
this.selectGridView(this.VIEW_WEEK);
break;
case this.VIEW_DAY:
this.selectGridView(this.VIEW_DAY);
break;
case this.VIEW_UPCOMING:
this.selectUpcomingView();
break;
default:
this.selectGridView(this.VIEW_MONTH);
break;
}
},notImplemented:function(evt){
alert("not implemented");
},onKeyPress:function(evt){
if(!this.isShowing()){
return;
}
if(Config.EnableKeyboardShortcuts&&evt.key&&_1.lang.isString(evt.key)&&!(evt.ctrlKey||evt.altKey||evt.metaKey)){
switch(evt.key.toLowerCase()){
case Config.Strings.KeyCalPrevious:
this.decrementRange();
break;
case Config.Strings.KeyCalNext:
this.incrementRange();
break;
case Config.Strings.KeyCalMonth:
this.selectMonthView();
break;
case Config.Strings.KeyCalWeek:
this.selectWeekView();
break;
case Config.Strings.KeyCalDay:
this.selectDayView();
break;
case Config.Strings.KeyCalAddEvent:
this.addEvent();
break;
case Config.Strings.KeyCalToday:
this.setToday();
break;
case Config.Strings.KeyCalPrint:
this.showPrintView();
break;
}
}
},promptConfirmDelete:function(_479){
if(_479.rid&&_479.rid.length>0){
ws.calendar.ConfirmRecurDialog.display(false,ws.lang.hitch(this,function(ok,_47b){
if(ok){
this.deleteEvent(_479,_47b);
}
}));
}else{
ws.widget.OkCancelDialog.alert(Config.Strings.RegEventMsg,ws.lang.hitch(this,function(ok){
if(ok){
this.deleteEvent(_479);
}
}),true);
}
},deleteEvent:function(_47d,_47e){
var args=this.model.getDefaultComponentArgs(false);
args.id=_47d.id;
if(_47d.rid){
args.rid=_47d.rid;
}
args.index=true;
if(!_47e){
_47e="CHANGE_CURRENT";
}
args.recurChangeMode=_47e;
args.loadCallback=_1.lang.hitch(this,function(){
_1.event.topic.publish("WSFeedbackStart",Config.Strings.EventDeleted,true);
});
this.model.deleteEvents(args);
}});
_1.provide("ws.calendar.EventQuickViewWidget");
_1.require("dojo.widget.*");
_1.require("dojo.widget.ContentPane");
_1.require("ws.calendar.calutil");
_1.require("ws.calendar.ConfirmRecurDialog");
_1.require("ws.widget.WSButton");
_1.widget.defineWidget("ws.calendar.EventQuickViewWidget",_1.widget.HtmlWidget,{templateString:"<div class=\"eventQuickView\" style=\"display: none;\">\r\n\t<div dojoType=\"dojo:ContentPane\" dojoAttachPoint=\"quickViewWritable\" style=\"display: none;\">\r\n\t\t<div dojoAttachPoint=\"writableHeader\" class=\"headerDiv\">\r\n\t\t\t<img src=\"${spacer}\" class=\"closeButton\" dojoAttachEvent=\"onClick: closeCard\">\r\n\t\t\t<div class=\"eventSummary\">\r\n\t\t\t\t<span dojoAttachPoint=\"eventSummaryW\" class=\"eventSummary\"></span>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"contentDiv\">\r\n\t\t\t<span dojoAttachPoint=\"eventDateW\" class=\"eventDate\"></span>\r\n\t\t\t<img dojoAttachPoint=\"repeatIconW\" src=\"${spacer}\" class=\"icon iconRepeat\" />\r\n\t\t\t<img dojoAttachPoint=\"reminderIconW\" src=\"${spacer}\" class=\"icon iconReminder\" />\r\n\t\t</div>\r\n\t\t<div class=\"contentDiv2\">\r\n\t\t\t<span dojoAttachPoint=\"calendarNameW\"></span>\r\n\t\t</div>\r\n\t\t<div dojoAttachPoint=\"descriptionDivW\" class=\"contentDiv3\">\r\n\t\t\t<span dojoAttachPoint=\"descriptionW\"></span>\r\n\t\t</div>\r\n\t\t<div dojoAttachPoint=\"moreInfoDivW\" class=\"contentDiv3\">\r\n\t\t</div>\r\n\t\t<div dojoType=\"ws:WSButton\" vizType=\"Link\" className=\"leftButton alignLeft\" border=\"right\" dojoAttachEvent=\"onClick: goToEdit\">${Edit}</div>\r\n\t\t<div dojoType=\"ws:WSButton\" vizType=\"Link\" className=\"alignLeft\" dojoAttachEvent=\"onClick: promptConfirmDelete\">${Delete}</div>\r\n\t\t<div dojoType=\"ws:WSButton\" vizType=\"Link\" className=\"rightButton alignRight\" dojoAttachEvent=\"onClick: goToEdit\">${Details}</div>\r\n\t</div>\r\n\t<div dojoType=\"dojo:ContentPane\" dojoAttachPoint=\"quickViewReadOnly\" style=\"display: none;\">\r\n\t\t<div dojoAttachPoint=\"readOnlyHeader\" class=\"headerDiv\">\r\n\t\t\t<img src=\"${spacer}\" class=\"closeButton\" dojoAttachEvent=\"onClick: closeCard\">\r\n\t\t\t<div class=\"eventSummary\">\r\n\t\t\t\t<span dojoAttachPoint=\"eventSummaryRO\" class=\"eventSummary\"></span>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"contentDiv\">\r\n\t\t\t<span dojoAttachPoint=\"eventDateRO\" class=\"eventDate\"></span>\r\n\t\t\t<img dojoAttachPoint=\"repeatIconRO\" src=\"${spacer}\" class=\"icon iconRepeat\" />\r\n\t\t\t<img dojoAttachPoint=\"reminderIconRO\" src=\"${spacer}\" align=\"absmiddle\" class=\"icon iconReminder\" />\r\n\t\t</div>\r\n\t\t<div class=\"contentDiv2\">\r\n\t\t\t<span dojoAttachPoint=\"calendarNameRO\"></span>\r\n\t\t</div>\r\n\t\t<div dojoAttachPoint=\"descriptionDivRO\" class=\"contentDiv3\">\t\t\r\n\t\t\t<span dojoAttachPoint=\"descriptionRO\"></span>\r\n\t\t</div>\r\n\t\t<div dojoAttachPoint=\"moreInfoDivRO\" class=\"contentDiv3\">\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n",templateCssString:".eventQuickView\r\n{\r\n\tbackground-color: #FFFFFF;\r\n\tborder: 1px solid #8A8A8A;\r\n\tpadding-bottom: 6px;\r\n\twidth: 265px;\r\n\tz-index: 800;\r\n\tposition: absolute;\r\n}\r\n\r\n\r\n\r\n.eventQuickView .closeButton\r\n{\r\n\twidth: 14px;\r\n\theight: 14px;\r\n\tcursor: pointer;\r\n\tfloat: right;\r\n\tbackground: url(\"${images}main.gif\") -1424px -0px;\r\n\tmargin-top: 2px;\r\n\tmargin-right: 6px;\r\n}\r\n\r\n.eventQuickView .closeButton:hover\r\n{\r\n\tbackground-position: -1439px -0px;\r\n}\r\n\r\n.eventQuickView img.icon\r\n{\r\n\twidth: 18px;\r\n\theight: 18px;\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tmargin-right: 5px;\r\n}\r\n\r\n.eventQuickView img.iconRepeat\t\t{ background-position: -1303px -51px;\t}\r\n.eventQuickView img.iconReminder\t{ background-position: -1260px -53px;\t}\r\n\r\n.eventQuickView .eventSummary\r\n{\r\n\tcolor: #FFF;\r\n\tfont-weight: bold;\r\n\tfont-size: 14px;\r\n\tpadding: 5px 4px 5px 4px;\r\n}\r\n\r\n.eventQuickView .eventDate\r\n{\r\n\tfont-weight: bold;\r\n\tpadding-right: 10px;\r\n}\r\n\r\n.eventQuickView .contentDiv\r\n{\r\n\twidth: auto;\r\n\tpadding: 8px 6px 10px 7px;\r\n}\r\n\r\n.eventQuickView .contentDiv2\r\n{\r\n\twidth: auto;\r\n\tpadding: 0px 6px 5px 7px;\r\n}\r\n\r\n.eventQuickView .contentDiv3\r\n{\r\n\tpadding: 0px 6px 5px 7px;\r\n\twidth: 90%;\r\n\toverflow: hidden;\r\n}\r\n\r\n\r\n.eventQuickView .headerDiv\r\n{\r\n\twidth: 100%;\r\n}\r\n\r\n/* Writable Event */\r\n.eventQuickView .leftButton\r\n{\r\n\tmargin-left: 7px;\r\n}\r\n\r\n.eventQuickView .rightButton\r\n{\r\n\tmargin-right: 7px;\r\n}\r\n\r\n.eventQuickView .alignLeft\r\n{\r\n\tfloat: left;\r\n}\r\n\r\n.eventQuickView .alignRight\r\n{\r\n\tfloat: right;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/calendar/EventQuickViewWidget.css"),widgetsInTemplate:true,isUpcomingView:false,setModel:function(_480){
this.model=_480;
},initializeView:function(args,_482,_483,_484){
_1.debug("EventQuickViewWidget.initializeView()");
_1.debugShallow(args);
this.data=args;
if(args.index){
this.isUpcomingView=args.index;
}
if(ws.WebSuite.inlineAddEventDialog&&ws.WebSuite.inlineAddEventDialog.isShowing()){
ws.WebSuite.inlineAddEventDialog.closeCard();
}
var _485=Config.Strings.CalYboxDateFormat2;
var _486=Config.Strings.CalTimeFormatRange1;
var _487=new String();
_487=ws.date.formatDateTime(args.start,_485);
if(!args.allDay){
_487+=", "+ws.date.formatDateTime(args.start,_486)+" - "+ws.date.formatDateTime(args.end,_486);
}
if(_482){
this.quickViewReadOnly.hide();
this.quickViewWritable.show();
_1.html.hide(this.repeatIconW);
_1.html.hide(this.reminderIconW);
_1.html.hide(this.descriptionDivW);
this.eventSummaryW.innerHTML=_1.string.escapeXml(args.summary||"");
this.eventDateW.innerHTML=_487;
if(args.rid){
_1.html.show(this.repeatIconW);
}
if(args.reminderEnabled&&Config.ShowReminderEvent){
_1.html.show(this.reminderIconW);
}
if("description" in args&&!_1.string.isBlank(args.description)){
var desc=args.description;
desc=ws.calendar.calutil.DecodeHTMLEntities(desc);
_1.html.show(this.descriptionDivW);
var _489="";
var _48a=30;
if(desc){
_489=desc.substring(0,_48a);
if(desc.length>_48a){
_489+="...";
}
}
this.descriptionW.innerHTML=_1.string.escapeXml(_489);
}
if("moreInfo" in args&&!_1.string.isBlank(args.moreInfo)){
var _48b=this.sanitizedMoreInfo(args.moreInfo);
this.moreInfoDivW.innerHTML=_48b;
}
}else{
this.quickViewWritable.hide();
this.quickViewReadOnly.show();
_1.html.hide(this.repeatIconRO);
_1.html.hide(this.reminderIconRO);
_1.html.hide(this.descriptionDivRO);
this.eventSummaryRO.innerHTML=_1.string.escapeXml(args.summary||"");
this.eventDateRO.innerHTML=_487;
if(args.rid){
_1.html.show(this.repeatIconRO);
}
if(args.reminderEnabled&&Config.ShowReminderEvent){
_1.html.show(this.reminderIconRO);
}
if("description" in args&&!_1.string.isBlank(args.description)){
_1.html.show(this.descriptionDivRO);
var desc=args.description;
desc=ws.calendar.calutil.DecodeHTMLEntities(desc);
this.descriptionRO.innerHTML=_1.string.escapeXml(desc);
}
if("moreInfo" in args&&!_1.string.isBlank(args.moreInfo)){
var _48b=this.sanitizedMoreInfo(args.moreInfo);
this.moreInfoDivRO.innerHTML=_48b;
}
}
this.setupHeaderColorAndCalendarName(_482);
this.quickViewWritable.onResized();
this.quickViewReadOnly.onResized();
if(_483!=null){
_1.html.placeOnScreenAroundElement(this.domNode,_483,[10,5],null,_484);
}
_1.event.connect(document.documentElement,"onmousedown",this,"closeCardClick");
this.show();
},sanitizedMoreInfo:function(_48c){
var _48d=_48c.replace(/ href=/ig," target=\"_blank\" href=");
return _48d;
},setupHeaderColorAndCalendarName:function(_48e){
var _48f=this.model.calendarEnum;
var _490=this.model.calendars[this.data.calid];
var _491=_490[_48f.color];
var _492=_490[_48f.displayName];
var _493=_490[_48f.calType];
var _494=_492;
if(_493!=0){
if(_494==null||_494.length==0){
var _495=_490[_48f.id];
var hat=_495.indexOf("^");
if(hat>=0){
_495=_495.substring(0,hat);
}
_494=_495;
}
}else{
_494="";
}
if(_48e){
ws.html.setInnerText(this.calendarNameW,_494);
_1.html.setStyleAttributes(this.calendarNameW,ws.string.substituteParams("color: {0};",_491));
}else{
ws.html.setInnerText(this.calendarNameRO,_494);
_1.html.setStyleAttributes(this.calendarNameRO,ws.string.substituteParams("color: {0};",_491));
}
if(_48e){
_1.html.setStyleAttributes(this.writableHeader,ws.string.substituteParams("background-color: {0};",_491));
}else{
_1.html.setStyleAttributes(this.readOnlyHeader,ws.string.substituteParams("background-color: {0};",_491));
}
},goToEdit:function(){
_1.debug("gotoedit()");
ws.WebSuite.getAddEditWidget(_1.lang.hitch(this,function(){
ws.WebSuite.addEditDialog.setModel(this.model);
ws.WebSuite.addEditDialog.show(1,this.data);
this.closeCard();
}));
ws.reporting.reportAction("Edit Event");
},isSelectedEventRecurring:function(){
var ret=false;
var data=this.data;
if(data&&data.rid){
ret=(data.rid.length>0);
}
return ret;
},promptConfirmDelete:function(){
this.showOrHideOnDelete(false);
if(this.isSelectedEventRecurring()){
ws.calendar.ConfirmRecurDialog.display(false,ws.lang.hitch(this,function(ok,_49a){
if(ok){
this.deleteEvent(_49a);
}else{
this.cancelDelete();
}
}));
}else{
ws.widget.OkCancelDialog.alert(Config.Strings.RegEventMsg,ws.lang.hitch(this,function(ok){
if(ok){
this.deleteEvent(null);
}else{
this.cancelDelete();
}
}),true);
}
},deleteEvent:function(_49c){
var args=this.model.getDefaultComponentArgs(this.isUpcomingView);
args.id=this.data.id;
if(this.data.rid){
args.rid=this.data.rid;
}
args.index=true;
if(!_49c){
_49c="CHANGE_CURRENT";
}
args.recurChangeMode=_49c;
args.loadCallback=_1.lang.hitch(this,function(){
_1.event.topic.publish("WSFeedbackStart",Config.Strings.EventDeleted,true);
});
this.model.deleteEvents(args);
this.closeCard();
},cancelDelete:function(){
},showOrHideOnDelete:function(show){
if(show){
}else{
this.quickViewWritable.hide();
this.quickViewReadOnly.hide();
this.hide();
}
},closeCardClick:function(evt){
var _4a0=_1.html.overElement(this.domNode,evt);
if(!_4a0){
this.closeCard();
}
},closeCard:function(){
_1.debug("closeCard()");
this.quickViewWritable.hide();
this.quickViewReadOnly.hide();
_1.event.disconnect(document.documentElement,"onmousedown",this,"closeCardClick");
this.hide();
}});
_1.provide("ws.calendar.InlineAddEvent");
_1.require("dojo.widget.*");
_1.require("dojo.widget.ContentPane");
_1.require("ws.widget.OkCancelDialog");
_1.require("ws.date");
_1.require("ws.calendar.calutil");
_1.require("ws.widget.PopupTimePicker");
_1.require("ws.widget.WSButton");
_1.require("ws.widget.WSSelect");
_1.widget.defineWidget("ws.calendar.InlineAddEvent",_1.widget.HtmlWidget,{widgetsInTemplate:true,templateString:"<div class=\"inlineAddEvent\" style=\"display: none;\">\r\n\t<div dojoType=\"dojo:ContentPane\" dojoAttachPoint=\"inlineAddEventWidget\">\r\n\t\t<img src=\"${spacer}\" class=\"closeButton\" dojoAttachEvent=\"onClick: closeCard\">\r\n\t\t<div class=\"inputData\">\r\n\t\t\t<table border=\"0\" cellpadding=\"1\" cellspacing=\"1\" style=\"table-layout: fixed; width: 100%;\">\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td><span class=\"dateSpan\" dojoAttachPoint=\"dateSpan\"></span></td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td>\r\n\t\t\t\t\t\t<div style=\"overflow:auto\">\r\n\t\t\t\t\t\t<input dojoAttachPoint=\"summaryInput\" maxlength=\"100\" dojoAttachEvent=\"onFocus: summaryTextType; onBlur: summaryTextOnBlur\"/>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr dojoAttachPoint=\"timeInputRow\">\r\n\t\t\t\t\t<td>\t\r\n\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t<input class=\"timeInputField\" dojoAttachPoint=\"startTimeInput\" />\r\n\t\t\t\t\t\t<span dojoAttachPoint=\"toSpan\">&nbsp;${CalTo}&nbsp;</span>\r\n\t\t\t\t\t\t<input class=\"timeInputField\" dojoAttachPoint=\"endTimeInput\" />\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t<input type=\"checkbox\" dojoAttachEvent=\"onClick: checkBoxChange\" dojoAttachPoint=\"allDayBox\"/>\t\r\n\t\t\t\t\t\t<span dojoAttachPoint=\"checkBoxSpan\" class=\"checkBoxChecked\">${AllDay}</span>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td>\r\n\t\t\t\t\t\t<div class=\"menuDivs\">\r\n\t\t\t\t\t\t\t<img src=\"${spacer}\" align=\"absmiddle\" class=\"icon iconCalendar\" />\r\n\t\t\t\t\t\t\t<ul dojoType=\"ws:WSSelect\" className=\"selectMenu\" dojoAttachPoint=\"calendarMenu\" size=\"150\"></ul>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td>\r\n\t\t\t\t\t\t<div class=\"addAndClose\">\r\n\t\t\t\t\t\t\t<div dojoType=\"ws:WSButton\" className=\"addEventButton\" vizType=\"Blue\" dojoAttachEvent=\"onClick: addAndClose\">${AddEventBtn}</div>\r\n\t\t\t\t\t\t\t<a href=\"#\" dojoAttachEvent=\"onClick: moreDetails\" class=\"wsLink moreDetailsLink\">${MoreDetails}</a>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t</table>\r\n\t\t\t<div dojoType=\"ws:PopupTimePicker\" dojoAttachPoint=\"eventTimePopupPicker\" toggle=\"wipe\" toggleDuration=\"150\" hidePickerOnSetTime=\"true\" closeOnMouseOut=\"true\"></div>\r\n\t\t</div>\t\t\r\n\t</div>\r\n</div>\r\n",templateCssString:".inlineAddEvent\r\n{\r\n\tposition: absolute;\r\n\tz-index: 800;\r\n\twidth: 260px;\r\n\tbackground: #fff;\r\n\tborder: 1px solid #000;\r\n\t/*-moz-border-radius: 5px;*/\r\n}\r\n\r\n.inlineAddEvent .closeButton\r\n{\r\n\twidth: 12px;\r\n\theight: 12px;\r\n\tcursor: pointer;\r\n\tfloat: right;\r\n\tbackground: url(\"${images}main.gif\") -1425px -1px;\r\n\tmargin-top: 4px;\r\n\tmargin-right: 4px;\r\n\tmargin-bottom: 4px;\r\n}\r\n\r\n.inlineAddEvent .closeButton \r\n{\r\n\tbackground-position: -1440px -1px;\r\n}\r\n\r\n.inlineAddEvent .inputData\r\n{\r\n\tmargin-top: 1px;\r\n\tpadding: 10px 14px 6px 10px;\r\n}\r\n\r\n.inlineAddEvent .inputData .menuDivs\r\n{\r\n\tmargin-top: 4px;\r\n\tmargin-bottom: 4px;\r\n\tpadding: 4px;\r\n\tbackground-color: #EDEBE8;\r\n}\r\n\r\n.inlineAddEvent .inputData .menuDivs img.icon\r\n{\r\n\tfloat: left;\r\n\tmargin-top: 5px;\r\n\twidth: 16px;\r\n\theight: 16px;\r\n\tbackground-image: url(\"${images}main.gif\");\r\n}\r\n\r\n.inlineAddEvent .inputData .menuDivs img.iconCalendar\t\t{ background-position: -120px -0px;\t}\r\n\r\n.inlineAddEvent .inputData .menuDivs .selectMenu\r\n{\r\n\tleft: 20px;\r\n}\r\n\r\n.inlineAddEvent .inputData .menuDivs .selectMenuIE\r\n{\r\n\tleft: 5px;\r\n}\r\n\r\n.inlineAddEvent .inputData .dateSpan\r\n{\r\n\tfont-family: Tahoma, Arial;\r\n\tcolor: Black;\t\t/* Replace with more precise color. */\r\n\tfont-size: 15px;\r\n\tfont-weight: bold;\r\n}\r\n\r\n.inlineAddEvent .inputData input.summaryInput\r\n{\r\n\twidth: 95%;\r\n\tmargin-top: 5px;\r\n\tmargin-bottom: 4px;\r\n\tpadding-left: 4px;\r\n\tpadding-bottom: 2px;\r\n}\r\n\r\n.inlineAddEvent .inputData input.summaryInputNew\r\n{\r\n\twidth: 95%;\r\n\tmargin-top: 5px;\r\n\tmargin-bottom: 4px;\r\n\tpadding-left: 4px;\r\n\tpadding-bottom: 2px;\r\n\tcolor: #A5A5A5;\r\n}\r\n\r\n\r\n.inlineAddEvent .inputData .checkBoxChecked\r\n{\r\n\tmargin-top: 8px;\r\n\tmargin-bottom: 1px;\r\n\tfont-family: Tahoma, Arial;\r\n\tcolor: #000000;\r\n\tfont-size: 12px;\r\n}\r\n\r\n.inlineAddEvent .inputData .checkBoxNotChecked\r\n{\r\n\tmargin-top: 0px;\r\n\tmargin-bottom: 0px;\r\n\tfont-family: Tahoma, Arial;\r\n\tcolor: #cccccc;\r\n\tfont-size: 12px;\r\n}\r\n\r\n.inlineAddEvent .inputData input.timeInputField\r\n{\r\n\twidth: 53px;\r\n}\r\n\r\n.inlineAddEvent .inputData .addAndClose\r\n{\r\n\tpadding-top: 2px;\r\n}\r\n\r\n.inlineAddEvent .inputData .addAndClose .buttonDiv\r\n{\r\n\tpadding-left: 3px;\r\n\tpadding-right: 5px;\r\n\tfloat:left;\r\n}\r\n\r\n.inlineAddEvent .inputData .addAndClose a.moreDetailsLink\r\n{\r\n\tfloat: left;\r\n}\r\n\r\n.inlineAddEvent .inputData .addAndClose .addEventButton\r\n{\r\n\tfloat: right;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/calendar/InlineAddEvent.css"),calendarMenuValueChanged:false,summaryInputHasFocus:false,fillInTemplate:function(){
this.dateFormatSpan=Config.Strings.Calendar_InlineAddEvent_DateFormatSpan;
this.dateTimeFormatSpan=Config.Strings.Calendar_InlineAddEvent_DateTimeFormatSpan;
this.timeFormat=Config.Strings.CalTimeFormatRange1;
this.timeFormatShort=Config.Strings.CalTimeFormatRange2;
this.model=null;
this.eventInfo=null;
this.columnView=null;
this.selectedCells=[];
},postCreate:function(args,frag){
if(_1.render.html.ie&&!_1.html.hasClass(this.calendarMenu.domNode,"selectMenuIE")){
_1.html.replaceClass(this.calendarMenu.domNode,"selectMenuIE","selectMenu");
}
_1.event.connect(this.calendarMenu,"valueChanged",this,"handleCalendar");
_1.event.topic.registerPublisher("InlineAddEvent/close",this,"closeCard");
this.startTimeInput.onclick=ws.lang.hitch(this,"showTimePicker",this.startTimeInput);
this.endTimeInput.onclick=ws.lang.hitch(this,"showTimePicker",this.endTimeInput);
_1.event.connect(this.eventTimePopupPicker.timePicker,"selectTimeConnect",this,"fillInTimeField");
},showTimePicker:function(_4a3){
if(!this.eventTimePopupPicker.isShowingNow){
this.eventTimePopupPicker.open(_4a3,this,_4a3,{"BL":"TL"});
this.timeInputField=_4a3;
var _4a4=new Date();
var _4a5=ws.date.ParseHourMinTextField(_4a3.value,this.timeFormat,this.timeFormatShort);
if(_4a5!=null){
_4a4.setHours(_4a5.hr,_4a5.min);
this.eventTimePopupPicker.initializeTime(_4a4);
}else{
this.eventTimePopupPicker.initializeTime();
}
}
},fillInTimeField:function(_4a6){
this.timeInputField.value=_4a6;
},update:function(){
_1.debug("INLINEADDEVENT update()");
this.buildCalendarList();
},buildCalendarList:function(){
var _4a7=[];
var _4a8=this.model.getCalendarList();
var _4a9=this.model.calendarEnum;
if(!_4a8||!_4a9){
this.calendarMenu.setOptions([{display:"",calid:""}]);
return;
}
for(var i=0;i<_4a8.length;i++){
var _4ab=_4a8[i];
var _4ac=_4ab[_4a9.id];
var _4ad=_4ab[_4a9.displayName];
if(_4ab[_4a9.writable]){
_4a7.push({display:_4ad,value:_4ac});
}
}
this.calendarMenu.setOptions(_4a7);
},setModel:function(_4ae){
if(this.model){
_1.event.disconnect(this.model,"modelUpdated",this,"update");
}
this.model=_4ae;
_1.event.connect(this.model,"modelUpdated",this,"update");
},handleCalendar:function(){
this.calendarMenuValueChanged=true;
},addAndClose:function(){
var _4af=this.checkAndGetInfo(false);
if(null===_4af){
this.eventInfo.start=ws.date.formatISO8601(this.eventInfo.start);
if(this.eventInfo.end){
this.eventInfo.end=ws.date.formatISO8601(this.eventInfo.end);
}
this.eventInfo.index=true;
_1.debugShallow(this.eventInfo);
this.model.saveComponent(this.eventInfo);
this.closeCard();
this.eventInfo=null;
}else{
ws.widget.OkCancelDialog.alert(_4af);
}
},checkAndGetInfo:function(_4b0){
if(!_4b0&&this.summaryInput.value==""){
return Config.Strings.AddTitleToEvent;
}
this.eventInfo.summary=this.summaryInput.value;
if(typeof (this.calendarMenu.currentValue)=="string"){
this.eventInfo.calid=this.calendarMenu.currentValue;
}
if(!this.columnView){
var _4b1=null;
var _4b2=null;
var _4b3=null;
var time=null;
var hr=null;
var min=null;
if(!this.allDayBox.checked){
_4b1=new Date(this.eventInfo.start);
_4b2=new Date(_4b1);
var _4b7=ws.date.ParseHourMinTextField(this.startTimeInput.value,this.timeFormat,this.timeFormatShort);
if(!_4b0&&_4b7==null){
retErrMsg=Config.Strings.Calendar_AddEvent_InvalidStart;
return retErrMsg;
}
_4b1.setHours(_4b7.hr,_4b7.min);
_1.debug(_4b1);
var _4b7=ws.date.ParseHourMinTextField(this.endTimeInput.value,this.timeFormat,this.timeFormatShort);
if(!_4b0&&_4b7==null){
retErrMsg=Config.Strings.Calendar_AddEvent_InvalidEnd;
return retErrMsg;
}
_4b2.setHours(_4b7.hr,_4b7.min);
_1.debug(_4b2);
if(!_4b0&&_4b1>_4b2){
retErrMsg=Config.Strings.Calendar_AddEvent_InvalidStartAfterEnd;
return retErrMsg;
}
if(!_4b0&&(_4b2.getTime()>=_4b1.getTime()+86400000)){
retErrMsg=Config.Strings.Calendar_AddEvent_EndDateMustBeWithin24Hours;
return retErrMsg;
}
this.eventInfo.start=_4b1;
this.eventInfo.end=_4b2;
_1.debug("End of if (!this.allDayBox.checked) --");
}
this.eventInfo.allDay=this.allDayBox.checked;
}
return null;
},defaultPopulateForm:function(){
_1.html.setClass(this.summaryInput,"summaryInputNew");
this.summaryInput.value=Config.Strings.AddEventName;
if(!this.columnView){
var date=new Date();
var _4b9=null;
var _4ba=null;
this.allDayBox.checked=true;
date=ws.calendar.calutil.GetNext30MinuteIncrement(date);
_4b9=ws.date.formatDateTime(date,this.timeFormat);
this.startTimeInput.value=_4b9;
date=ws.date.add(date,ws.date.dateParts.MINUTE,30);
_4ba=ws.date.formatDateTime(date,this.timeFormat);
this.endTimeInput.value=_4ba;
_1.html.hide(this.startTimeInput);
_1.html.hide(this.endTimeInput);
_1.html.hide(this.toSpan);
_1.html.setClass(this.checkBoxSpan,"checkBoxChecked");
this.calendarMenu.setOption(0);
}
},checkBoxChange:function(){
if(this.allDayBox.checked){
_1.html.hide(this.startTimeInput);
_1.html.hide(this.toSpan);
_1.html.hide(this.endTimeInput);
_1.html.setClass(this.checkBoxSpan,"checkBoxChecked");
}else{
_1.html.show(this.startTimeInput);
_1.html.show(this.toSpan);
_1.html.show(this.endTimeInput);
_1.html.setClass(this.checkBoxSpan,"checkBoxNotChecked");
}
},summaryTextType:function(){
if(_1.html.hasClass(this.summaryInput,"summaryInput")){
return;
}
this.summaryInput.value="";
_1.html.setClass(this.summaryInput,"summaryInput");
this.summaryInputHasFocus=true;
},summaryTextOnBlur:function(){
this.summaryInputHasFocus=false;
},moreDetails:function(){
_1.debug("more details");
var _4bb=this.checkAndGetInfo(true);
if(null===_4bb){
if(!this.eventInfo.end){
this.eventInfo.end=ws.date.add(this.eventInfo.start,ws.date.dateParts.MINUTE,30);
}
ws.WebSuite.getAddEditWidget(_1.lang.hitch(this,function(){
ws.WebSuite.addEditDialog.setModel(this.model);
ws.WebSuite.addEditDialog.show(4,this.eventInfo);
this.closeCard();
this.eventInfo=null;
}));
}else{
ws.widget.OkCancelDialog.alert(_4bb);
}
},initializeView:function(_4bc,args,_4be,_4bf,_4c0){
_1.debug("inlineAddEvent.show()");
this.buildCalendarList();
if(ws.WebSuite.eventQuickViewWidget&&ws.WebSuite.eventQuickViewWidget.isShowing()){
ws.WebSuite.eventQuickViewWidget.closeCard();
}
var _4c1=null;
this.columnView=_4bc;
if(_4bc){
_1.html.hide(this.timeInputRow);
_4c1=ws.date.formatDateTime(args.start,this.dateTimeFormatSpan)+"-"+ws.date.formatDateTime(args.end,this.timeFormat);
this.dateSpan.innerHTML=_4c1;
}else{
_1.html.show(this.timeInputRow);
_4c1=ws.date.formatDateTime(args.start,this.dateFormatSpan);
this.dateSpan.innerHTML=_4c1;
}
this.eventInfo=args;
this.defaultPopulateForm();
if(_4c0&&_4c0.length){
this.selectedCells=_4c0;
for(cell in _4c0){
_1.html.addClass(_4c0[cell],"selectedCell");
}
}
if(_4be!=null){
_1.html.placeOnScreenAroundElement(this.domNode,_4be,[10,5],null,_4bf);
}
this.show();
_1.lang.setTimeout(this,function(){
_1.event.connect(document.documentElement,"onmousedown",this,"closeClick");
},0);
},clearCells:function(){
if(this.selectedCells.length){
for(cell in this.selectedCells){
_1.html.removeClass(this.selectedCells[cell],"selectedCell");
}
this.selectedCells=[];
}
},closeClick:function(evt){
var _4c3=false;
var _4c4=_1.html.overElement(this.inlineAddEventWidget.domNode,evt);
var _4c5=_1.html.overElement(this.eventTimePopupPicker.domNode,evt);
var _4c6=this.calendarMenuValueChanged;
var _4c7=this.summaryInputHasFocus;
if(_1.render.html.safari&&_4c4==false){
_4c3=_1.html.overElement(this.timeInputRow.domNode,evt);
}
if(!_4c4&&!_4c3&&!_4c5&&!_4c6&&!_4c7){
this.closeCard();
}
this.calendarMenuValueChanged=false;
evt.stopPropagation();
},closeCard:function(){
_1.event.disconnect(document.documentElement,"onmousedown",this,"closeClick");
this.clearCells();
this.hide();
}});
_1.provide("ws.calendar.QuickAdd");
_1.require("dojo.html.display");
_1.require("dojo.html.iframe");
_1.require("dojo.html.layout");
_1.require("dojo.html.style");
_1.require("dojo.widget.*");
_1.require("ws.calendar.calutil");
_1.require("ws.widget.OkCancelDialog");
_1.require("ws.widget.PopupDatePicker");
_1.require("ws.widget.PopupTimePicker");
_1.require("ws.style");
_1.widget.defineWidget("ws.calendar.QuickAdd",_1.widget.HtmlWidget,{templateString:"<div class=\"quickAdd\" style=\"display: none;\">\r\n\t<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"table-layout: fixed; width: 100%;\">\r\n\t\t<tr>\r\n\t\t\t<td colspan=\"91\">\r\n\t\t\t\t<input dojoAttachPoint=\"calendarInputDate\" class=\"eventInputDate wsInput\" dojoAttachEvent=\"onFocus: onFocusDateField; onBlur: onBlurDateField\"/>\r\n\t\t\t\t<input dojoAttachPoint=\"calendarInputName\" maxlength=\"100\" class=\"eventInputName wsInput\" dojoAttachEvent=\"onClick: onClickNameField; onFocus: onFocusNameField; onBlur: onBlurNameField; onKeyPress: onKeyPressNameField\" value=\"${AddEventNameShort}\"/>\r\n\t\t\t</td>\r\n\t\t\t<td colspan=\"9\"><div class=\"quickAddButton\" dojoAttachPoint=\"quickAddButton\" dojoAttachEvent=\"onClick: quickAdd\">&nbsp;</div></td>\r\n\t\t</tr>\r\n\t\t<tr dojoAttachPoint=\"timeInputRow\">\r\n\t\t\t<td colspan=\"100\">\r\n\t\t\t\t<div class=\"rowContent\">\r\n\t\t\t\t\t<input class=\"timeInputField\" dojoAttachPoint=\"startTimeInput\" />\r\n\t\t\t\t\t<span dojoAttachPoint=\"toSpan\">&nbsp;${CalTo}&nbsp;</span>\r\n\t\t\t\t\t<input class=\"timeInputField\" dojoAttachPoint=\"endTimeInput\" />\r\n\t\t\t\t</div>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td colspan=\"58\">\r\n\t\t\t\t<input type=\"checkbox\" dojoAttachEvent=\"onClick: checkBoxChange\" dojoAttachPoint=\"allDayBox\"/>\t\r\n\t\t\t\t<span dojoAttachPoint=\"checkBoxSpan\" class=\"checkBoxNotChecked\">${AllDay}</span>\r\n\t\t\t</td>\r\n\t\t\t<td align=\"right\" colspan=\"42\">\r\n\t\t\t\t<div class=\"rowContent\">\r\n\t\t\t\t\t<a href=\"#\" dojoAttachEvent=\"onClick: moreDetails\" class=\"wsLink moreDetailsLink\">${MoreDetails}</a>\r\n\t\t\t\t</div>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t</table>\r\n\t<div dojoType=\"ws:PopupDatePicker\" dojoAttachPoint=\"quickAddPicker\" toggle=\"wipe\" toggleDuration=\"150\" hidePickerOnSetDate=\"true\" closeOnMouseOut=\"true\" width=\"150\"></div>\r\n\t<div dojoType=\"ws:PopupTimePicker\" dojoAttachPoint=\"eventTimePopupPicker\" toggle=\"wipe\" toggleDuration=\"150\" hidePickerOnSetTime=\"true\" closeOnMouseOut=\"true\"></div>\r\n</div>\r\n",templateCssString:".quickAdd\r\n{\r\n\tbackground-color: #F4F2F0;\r\n\tborder: 1px solid #85817c;\r\n\tposition: absolute;\r\n\tz-index: 800;\r\n\twidth: 280px;\r\n\tpadding: 5px 4px 7px;\r\n}\r\n\r\n/* Safari fix - make the width 310 px to fix BLT 323601 */\r\n.dj_safari .quickAdd\r\n{\r\n\twidth: 310px;\r\n}\r\n\r\n.quickAdd input.eventInputName, .quickAdd input.eventInputDate\r\n{\r\n\tfloat: right;\r\n\tfont-family: verdana;\r\n\tfont-size: 11px;\r\n\tcolor: #999999;\r\n\twidth: 134px;\r\n\tvertical-align: middle;\r\n\tborder: 1px solid #85817c;\r\n\tpadding: 2px 2px 2px 6px;\r\n\tmargin-right: 3px;\r\n}\r\n\r\n.quickAdd input.eventInputDate\r\n{\r\n\twidth: 90px;\r\n\tcolor: #000;\r\n}\r\n\r\n.quickAdd input.active\r\n{\r\n\tcolor: #000;\r\n}\r\n\r\n.quickAdd input.inactive\r\n{\r\n\tcolor: #999999;\r\n}\r\n\r\n.quickAdd input.timeInputField\r\n{\r\n\twidth: 53px;\r\n}\r\n\r\n.quickAdd span.checkBoxChecked\r\n{\r\n\tfont-family: Tahoma, Arial, Helvetica, sans-serif;\r\n\tcolor: Black;\t\t/* Replace with more precise color. */\r\n\tfont-size: 12px;\r\n}\r\n\r\n.quickAdd span.checkBoxNotChecked\r\n{\r\n\tfont-family: Tahoma, Arial, Helvetica, sans-serif;\r\n\tcolor: Gray;\t\t/* Replace with more precise color. */\r\n\tfont-size: 12px;\r\n}\r\n\r\n.quickAdd .rowContent\r\n{\r\n\tmargin-top: 7px;\r\n}\r\n\r\n.quickAdd a.moreDetailsLink\r\n{\r\n\tmargin-right: 4px;\r\n}\r\n\r\n.quickAdd .quickAddButton\r\n{\r\n\tbackground: url(\"${images}main.gif\") -1190px -1px;\r\n\twidth: 16px;\r\n\theight: 16px;\r\n\tcursor: pointer;\r\n\tmargin: 0px auto auto 2px;\r\n}\r\n\r\n.quickAdd .quickAddButton:hover\r\n{\r\n\tbackground-position: -1213px -1px;\r\n}\r\n\r\n.quickAdd .quickAddButtonFF\r\n{\r\n\tmargin: 1px auto auto 2px;\r\n}\r\n\r\n.quickAdd .closeButton\r\n{\r\n\twidth: 12px;\r\n\theight: 12px;\r\n\tcursor: pointer;\r\n\tfloat: right;\r\n\tbackground: url(\"${images}main.gif\") -1425px -1px;\r\n\tmargin-top: 2px;\r\n\tmargin-right: 2px;\r\n}\r\n\r\n.quickAdd .closeButton:hover\r\n{\r\n\tbackground-position: -1440px -1px;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/calendar/QuickAdd.css"),widgetsInTemplate:true,isUpcomingView:false,fillInTemplate:function(){
this.timeFormat=Config.Strings.CalTimeFormatRange1;
this.timeFormatShort=Config.Strings.CalTimeFormatRange2;
this.model=null;
this.eventInfo=null;
this.focusNameInput=false;
this.targetDate=null;
},postCreate:function(){
this.calendarInputDate.onclick=ws.lang.hitch(this,"showQuickAddPicker",this.calendarInputDate);
this.startTimeInput.onclick=ws.lang.hitch(this,"showTimePicker",this.startTimeInput);
this.endTimeInput.onclick=ws.lang.hitch(this,"showTimePicker",this.endTimeInput);
_1.event.connect(this.quickAddPicker.datePicker,"selectDateConnect",this,"fillInDateField");
_1.event.connect(this.eventTimePopupPicker.timePicker,"selectTimeConnect",this,"fillInTimeField");
if(_1.render.html.moz){
_1.html.addClass(this.quickAddButton,"quickAddButtonFF");
_1.html.setStyleAttributes(this.startTimeInput,"margin-left: 6px;");
_1.html.setStyleAttributes(this.allDayBox,"margin-left: 6px;");
}else{
if(_1.render.html.ie){
_1.html.setStyleAttributes(this.startTimeInput,"margin-left: 4px;");
}
}
new _1.html.BackgroundIframe(this.domNode);
},setModel:function(_4c8){
this.model=_4c8;
},initAndShow:function(_4c9,_4ca,_4cb,_4cc,_4cd,_4ce,_4cf){
this.focusNameInput=false;
if(_4cc){
this.isUpcomingView=_4cc;
}
this.resetQuickAddToInactive(Config.Strings.AddEventNameShort,"inactive");
this.setAllDayView(_4cf?_4cf:false);
_1.html.placeOnScreenAroundElement(this.domNode,_4c9,(_4cb)?_4cb:null,null,(_4ca)?_4ca:{"BL":"TL"});
this.show();
if(_4cd){
this.calendarWidget=_4cd;
_1.html.hide(_4cd.calendarInputName);
_1.html.hide(_4cd.calendarInputDate);
_1.html.hide(_4cd.quickAddButton);
}
if(_4ce){
if(_1.html.hasClass(_4ce,"eventInputName")){
this.calendarInputName.value="";
this.calendarInputName.focus();
_1.html.replaceClass(this.calendarInputName,"active","inactive");
}else{
if(_1.html.hasClass(_4ce,"eventInputDate")){
this.calendarInputDate.value="";
this.showQuickAddPicker(this.calendarInputDate);
}
}
}
_1.event.connect(document.documentElement,"onmousedown",this,"closeCardClick");
},showTimePicker:function(_4d0){
_1.debug("QuickAdd:showTimePicker");
if(!this.eventTimePopupPicker.isShowingNow){
this.eventTimePopupPicker.open(_4d0,this,_4d0,{"BL":"TL"});
this.timeInputField=_4d0;
var _4d1=new Date();
var _4d2=ws.date.ParseHourMinTextField(_4d0.value,this.timeFormat,this.timeFormatShort);
if(_4d2!=null){
_4d1.setHours(_4d2.hr,_4d2.min);
this.eventTimePopupPicker.initializeTime(_4d1);
}else{
this.eventTimePopupPicker.initializeTime();
}
}
},setAllDayView:function(_4d3){
if(_4d3){
this.allDayBox.checked="true";
_1.html.hide(this.timeInputRow);
_1.html.setClass(this.checkBoxSpan,"checkBoxChecked");
}else{
this.allDayBox.checked="";
_1.html.show(this.timeInputRow);
_1.html.setClass(this.checkBoxSpan,"checkBoxNotChecked");
}
},onClickNameField:function(){
if(this.focusNameInput){
this.calendarInputName.value="";
_1.html.replaceClass(this.calendarInputName,"active","inactive");
this.focusNameInput=false;
}
},onFocusNameField:function(){
if(this.focusNameInput){
return;
}
if(_1.html.hasClass(this.calendarInputName,"inactive")){
this.calendarInputName.value="";
}
_1.html.replaceClass(this.calendarInputName,"active","inactive");
},onBlurNameField:function(){
if(this.calendarInputName.value==""){
_1.html.replaceClass(this.calendarInputName,"inactive","active");
this.calendarInputName.value=Config.Strings.AddEventNameShort;
}
if(this.focusNameInput){
this.focusNameInput=false;
}
},onKeyPressNameField:function(evt){
if(evt.keyCode==evt.KEY_ENTER){
this.quickAdd();
}else{
if(evt.keyCode==evt.KEY_ESCAPE){
this.resetQuickAddToInactive("","active");
}else{
_1.html.replaceClass(this.calendarInputName,"active","inactive");
}
}
if(this.focusNameInput){
this.focusNameInput=false;
}
},onFocusDateField:function(){
if(this.calendarInputDate.value==Config.Strings.Date){
this.calendarInputDate.value="";
}
},onBlurDateField:function(){
if(this.calendarInputDate.value==""){
this.calendarInputDate.value=ws.date.formatDateTime(new Date(),Config.Strings.DatePickerFooterDateFormat);
}
},showQuickAddPicker:function(_4d5){
if(!this.quickAddPicker.isShowingNow){
this.quickAddPicker.open(_4d5,this,_4d5,{"BL":"TL"});
this.calendarInputDate=_4d5;
}
},fillInTimeField:function(_4d6){
_1.debug("QuickAdd:fillInTimeField");
this.timeInputField.value=_4d6;
},fillInDateField:function(_4d7){
var _4d8=Config.Strings.DatePickerFooterDateFormat;
this.calendarInputDate.value=ws.date.formatDateTime(new Date(_4d7),_4d8);
},resetQuickAddToInactive:function(str,_4da){
this.calendarInputName.value=str;
if(_1.html.hasClass(this.calendarInputName,"active")){
_1.html.replaceClass(this.calendarInputName,_4da,"active");
}else{
if(_1.html.hasClass(this.calendarInputName,"inactive")){
_1.html.replaceClass(this.calendarInputName,_4da,"inactive");
}else{
_1.html.addClass(this.calendarInputName,_4da);
}
}
this.calendarInputDate.value=ws.date.formatDateTime(new Date(),Config.Strings.DatePickerFooterDateFormat);
var _4db=new Date();
_4db=ws.calendar.calutil.GetNext30MinuteIncrement(_4db);
this.startTimeInput.value=ws.date.formatDateTime(_4db,this.timeFormat);
this.endTimeInput.value=ws.date.formatDateTime(ws.date.add(_4db,ws.date.dateParts.MINUTE,60),this.timeFormat);
},quickAdd:function(evt){
var _4dd=this.isUpcomingView;
this.eventInfo=this.model.getDefaultComponentArgs(_4dd);
var _4de=this.checkAndGetInfo();
if(null===_4de){
this.targetDate=this.eventInfo.start;
this.eventInfo.start=ws.date.formatISO8601(this.eventInfo.start);
if(this.eventInfo.end){
this.eventInfo.end=ws.date.formatISO8601(this.eventInfo.end);
}
this.eventInfo.index=true;
this.eventInfo.loadCallback=_1.lang.hitch(this,function(){
_1.event.topic.publish("WSFeedbackStart",Config.Strings.EventCreated,true);
this.setDate(this.targetDate);
});
this.model.saveComponent(this.eventInfo);
this.resetQuickAddToInactive(Config.Strings.AddEventNameShort,"inactive");
this.closeCard();
}else{
if(this.focusNameInput){
_1.html.selectInputText(this.calendarInputName);
}else{
_1.event.disconnect(document.documentElement,"onmousedown",this,"closeCardClick");
ws.widget.OkCancelDialog.alert(_4de,_1.lang.hitch(this,function(ok){
if(ok){
setTimeout(_1.lang.hitch(this,"reconnectMouseEvent"),0);
}
}));
}
}
ws.reporting.reportAction("Quick Add Event");
},checkAndGetInfo:function(_4e0){
if(!_4e0){
if(this.calendarInputName.value==""||_1.html.hasClass(this.calendarInputName,"inactive")){
this.focusNameInput=true;
return Config.Strings.AddTitleToEvent;
}else{
this.focusNameInput=false;
}
}
this.eventInfo.summary=this.calendarInputName.value;
var val=this.calendarInputDate.value;
if(null===val||Config.Strings.Date==val||""==val){
var _4e2=Config.Strings.DatePickerFooterDateFormat;
this.calendarInputDate.value=ws.date.formatDateTime(new Date(),_4e2);
}
var _4e3=Config.Strings.CalDateParseFormat;
var _4e4=ws.date.ParseDateFromFormat(this.calendarInputDate.value,_4e3);
if(_4e4==null){
return Config.Strings.InvalidDateOnCreate;
}
if(!this.allDayBox.checked){
var _4e4=null;
var _4e5=null;
var _4e6=null;
var time=null;
var hr=null;
var min=null;
_4e4=ws.date.ParseDateFromFormat(this.calendarInputDate.value,_4e3);
_4e5=new Date(_4e4);
var _4ea=ws.date.ParseHourMinTextField(this.startTimeInput.value,this.timeFormat,this.timeFormatShort);
if(_4ea==null){
retErrMsg=Config.Strings.Calendar_AddEvent_InvalidStart;
return retErrMsg;
}
_4e4.setHours(_4ea.hr,_4ea.min);
var _4ea=ws.date.ParseHourMinTextField(this.endTimeInput.value,this.timeFormat,this.timeFormatShort);
if(_4ea==null){
retErrMsg=Config.Strings.Calendar_AddEvent_InvalidEnd;
return retErrMsg;
}
_4e5.setHours(_4ea.hr,_4ea.min);
if(_4e4>_4e5){
retErrMsg=Config.Strings.Calendar_AddEvent_InvalidStartAfterEnd;
return retErrMsg;
}
if(_4e5.getTime()>=_4e4.getTime()+86400000){
retErrMsg=Config.Strings.Calendar_AddEvent_EndDateMustBeWithin24Hours;
return retErrMsg;
}
this.eventInfo.start=_4e4;
this.eventInfo.end=_4e5;
}else{
this.eventInfo.start=ws.date.ParseDateFromFormat(this.calendarInputDate.value,_4e3);
}
this.eventInfo.allDay=this.allDayBox.checked;
return null;
},checkBoxChange:function(evt){
evt.stopPropagation();
if(this.allDayBox.checked){
_1.html.hide(this.timeInputRow);
_1.html.setClass(this.checkBoxSpan,"checkBoxChecked");
}else{
_1.html.show(this.timeInputRow);
_1.html.setClass(this.checkBoxSpan,"checkBoxNotChecked");
}
},moreDetails:function(){
var _4ec=this.isUpcomingView;
this.eventInfo=this.model.getDefaultComponentArgs(_4ec);
var _4ed=this.checkAndGetInfo(true);
if(null===_4ed){
if(!this.eventInfo.end){
this.eventInfo.end=ws.date.add(this.eventInfo.start,ws.date.dateParts.MINUTE,30);
}
ws.WebSuite.getAddEditWidget(_1.lang.hitch(this,function(){
ws.WebSuite.addEditDialog.setModel(this.model);
ws.WebSuite.addEditDialog.show(1,this.eventInfo);
this.hide();
this.eventInfo=null;
}));
}else{
_1.event.disconnect(document.documentElement,"onmousedown",this,"closeCardClick");
ws.widget.OkCancelDialog.alert(_4ed,_1.lang.hitch(this,function(ok){
if(ok){
setTimeout(_1.lang.hitch(this,"reconnectMouseEvent"),0);
}
}));
}
},setDate:function(_4ef){
},reconnectMouseEvent:function(){
_1.event.connect(document.documentElement,"onmousedown",this,"closeCardClick");
},closeCardClick:function(evt){
var _4f1=_1.html.overElement(this.domNode,evt);
var _4f2=this.quickAddPicker.isShowingNow?_1.html.overElement(this.quickAddPicker.domNode,evt):false;
var _4f3=this.eventTimePopupPicker.isShowingNow?_1.html.overElement(this.eventTimePopupPicker.domNode,evt):false;
if(!_4f1&&!_4f2&&!_4f3){
this.closeCard();
}
},closeCard:function(){
_1.event.disconnect(document.documentElement,"onmousedown",this,"closeCardClick");
if(this.calendarWidget){
_1.html.show(this.calendarWidget.calendarInputName);
_1.html.show(this.calendarWidget.calendarInputDate);
_1.html.show(this.calendarWidget.quickAddButton);
}
this.hide();
this.calendarWidget=null;
}});
_1.provide("dojo.widget.Button");
_1.require("dojo.lang.extras");
_1.require("dojo.html.*");
_1.require("dojo.html.selection");
_1.require("dojo.widget.*");
_1.widget.defineWidget("dojo.widget.Button",_1.widget.HtmlWidget,{isContainer:true,caption:"",templateString:"<div dojoAttachPoint=\"buttonNode\" class=\"dojoButton\" style=\"position:relative;\" dojoAttachEvent=\"onMouseOver; onMouseOut; onMouseDown; onMouseUp; onClick:buttonClick; onKey:onKey; onFocus;\">\r\n  <div class=\"dojoButtonContents\" align=center dojoAttachPoint=\"containerNode\" style=\"position:absolute;z-index:2;\"></div>\r\n  <img dojoAttachPoint=\"leftImage\" style=\"position:absolute;left:0px;\">\r\n  <img dojoAttachPoint=\"centerImage\" style=\"position:absolute;z-index:1;\">\r\n  <img dojoAttachPoint=\"rightImage\" style=\"position:absolute;top:0px;right:0px;\">\r\n</div>\r\n",templateCssString:"/* ---- button --- */\r\n.dojoButton {\r\n\tpadding: 0 0 0 0;\r\n\tfont-size: 8pt;\r\n\twhite-space: nowrap;\r\n\tcursor: pointer;\r\n\tfont-family: Myriad, Tahoma, Verdana, sans-serif;\r\n}\r\n\r\n.dojoButton .dojoButtonContents {\r\n\tpadding: 2px 2px 2px 2px;\r\n\ttext-align: center;\t\t/* if icon and label are split across two lines, center icon */\r\n\tcolor: white;\r\n}\r\n\r\n.dojoButtonLeftPart .dojoButtonContents {\r\n\tpadding-right: 8px;\r\n}\r\n\r\n.dojoButtonDisabled {\r\n\tcursor: url(\"images/no.gif\"), default;\r\n}\r\n\r\n\r\n.dojoButtonContents img {\r\n\tvertical-align: middle;\t/* if icon and label are on same line, center them */\r\n}\r\n\r\n/* -------- colors ------------ */\r\n\r\n.dojoButtonHover .dojoButtonContents {\r\n}\r\n\r\n.dojoButtonDepressed .dojoButtonContents {\r\n\tcolor: #293a4b;\r\n}\r\n\r\n.dojoButtonDisabled .dojoButtonContents {\r\n\tcolor: #aaa;\r\n}\r\n\r\n\r\n/* ---------- drop down button specific ---------- */\r\n\r\n/* border between label and arrow (for drop down buttons */\r\n.dojoButton .border {\r\n\twidth: 1px;\r\n\tbackground: gray;\r\n}\r\n\r\n/* button arrow */\r\n.dojoButton .downArrow {\r\n\tpadding-left: 10px;\r\n\ttext-align: center;\r\n}\r\n\r\n.dojoButton.disabled .downArrow {\r\n\tcursor : default;\r\n}\r\n",templateCssPath:_1.uri.moduleUri("dojo.widget","templates/ButtonTemplate.css"),inactiveImg:"templates/images/soriaButton-",activeImg:"templates/images/soriaActive-",pressedImg:"templates/images/soriaPressed-",disabledImg:"templates/images/soriaDisabled-",width2height:1/3,fillInTemplate:function(){
if(this.caption){
this.containerNode.appendChild(document.createTextNode(this.caption));
}
_1.html.disableSelection(this.containerNode);
},postCreate:function(){
this._sizeMyself();
},_sizeMyself:function(){
if(this.domNode.parentNode){
var _4f4=document.createElement("span");
_1.html.insertBefore(_4f4,this.domNode);
}
_1.body().appendChild(this.domNode);
this._sizeMyselfHelper();
if(_4f4){
_1.html.insertBefore(this.domNode,_4f4);
_1.html.removeNode(_4f4);
}
},_sizeMyselfHelper:function(){
var mb=_1.html.getMarginBox(this.containerNode);
this.height=mb.height;
this.containerWidth=mb.width;
var _4f6=this.height*this.width2height;
this.containerNode.style.left=_4f6+"px";
this.leftImage.height=this.rightImage.height=this.centerImage.height=this.height;
this.leftImage.width=this.rightImage.width=_4f6+1;
this.centerImage.width=this.containerWidth;
this.centerImage.style.left=_4f6+"px";
this._setImage(this.disabled?this.disabledImg:this.inactiveImg);
if(this.disabled){
_1.html.prependClass(this.domNode,"dojoButtonDisabled");
this.domNode.removeAttribute("tabIndex");
_1.widget.wai.setAttr(this.domNode,"waiState","disabled",true);
}else{
_1.html.removeClass(this.domNode,"dojoButtonDisabled");
this.domNode.setAttribute("tabIndex","0");
_1.widget.wai.setAttr(this.domNode,"waiState","disabled",false);
}
this.domNode.style.height=this.height+"px";
this.domNode.style.width=(this.containerWidth+2*_4f6)+"px";
},onMouseOver:function(e){
if(this.disabled){
return;
}
if(!_1.html.hasClass(this.buttonNode,"dojoButtonHover")){
_1.html.prependClass(this.buttonNode,"dojoButtonHover");
}
this._setImage(this.activeImg);
},onMouseDown:function(e){
if(this.disabled){
return;
}
_1.html.prependClass(this.buttonNode,"dojoButtonDepressed");
_1.html.removeClass(this.buttonNode,"dojoButtonHover");
this._setImage(this.pressedImg);
},onMouseUp:function(e){
if(this.disabled){
return;
}
_1.html.prependClass(this.buttonNode,"dojoButtonHover");
_1.html.removeClass(this.buttonNode,"dojoButtonDepressed");
this._setImage(this.activeImg);
},onMouseOut:function(e){
if(this.disabled){
return;
}
if(e.toElement&&_1.html.isDescendantOf(e.toElement,this.buttonNode)){
return;
}
_1.html.removeClass(this.buttonNode,"dojoButtonHover");
_1.html.removeClass(this.buttonNode,"dojoButtonDepressed");
this._setImage(this.inactiveImg);
},onKey:function(e){
if(!e.key){
return;
}
var menu=_1.widget.getWidgetById(this.menuId);
if(e.key==e.KEY_ENTER||e.key==" "){
this.onMouseDown(e);
this.buttonClick(e);
_1.lang.setTimeout(this,"onMouseUp",75,e);
_1.event.browser.stopEvent(e);
}
if(menu&&menu.isShowingNow&&e.key==e.KEY_DOWN_ARROW){
_1.event.disconnect(this.domNode,"onblur",this,"onBlur");
}
},onFocus:function(e){
var menu=_1.widget.getWidgetById(this.menuId);
if(menu){
_1.event.connectOnce(this.domNode,"onblur",this,"onBlur");
}
},onBlur:function(e){
var menu=_1.widget.getWidgetById(this.menuId);
if(!menu){
return;
}
if(menu.close&&menu.isShowingNow){
menu.close();
}
},buttonClick:function(e){
if(!this.disabled){
try{
this.domNode.focus();
}
catch(e2){
}
this.onClick(e);
}
},onClick:function(e){
},_setImage:function(_503){
this.leftImage.src=_1.uri.moduleUri("dojo.widget",_503+"l.gif");
this.centerImage.src=_1.uri.moduleUri("dojo.widget",_503+"c.gif");
this.rightImage.src=_1.uri.moduleUri("dojo.widget",_503+"r.gif");
},_toggleMenu:function(_504){
var menu=_1.widget.getWidgetById(_504);
if(!menu){
return;
}
if(menu.open&&!menu.isShowingNow){
var pos=_1.html.getAbsolutePosition(this.domNode,false);
menu.open(pos.x,pos.y+this.height,this);
_1.event.disconnect(this.domNode,"onblur",this,"onBlur");
}else{
if(menu.close&&menu.isShowingNow){
menu.close();
}else{
menu.toggle();
}
}
},setCaption:function(_507){
this.caption=_507;
this.containerNode.innerHTML=_507;
this._sizeMyself();
},setDisabled:function(_508){
this.disabled=_508;
this._sizeMyself();
}});
_1.widget.defineWidget("dojo.widget.DropDownButton",_1.widget.Button,{menuId:"",downArrow:"templates/images/whiteDownArrow.gif",disabledDownArrow:"templates/images/whiteDownArrow.gif",fillInTemplate:function(){
_1.widget.DropDownButton.superclass.fillInTemplate.apply(this,arguments);
this.arrow=document.createElement("img");
_1.html.setClass(this.arrow,"downArrow");
_1.widget.wai.setAttr(this.domNode,"waiState","haspopup",this.menuId);
},_sizeMyselfHelper:function(){
this.arrow.src=_1.uri.moduleUri("dojo.widget",this.disabled?this.disabledDownArrow:this.downArrow);
this.containerNode.appendChild(this.arrow);
_1.widget.DropDownButton.superclass._sizeMyselfHelper.call(this);
},onClick:function(e){
this._toggleMenu(this.menuId);
}});
_1.widget.defineWidget("dojo.widget.ComboButton",_1.widget.Button,{menuId:"",templateString:"<div class=\"dojoButton\" style=\"position:relative;top:0px;left:0px; text-align:none;\" dojoAttachEvent=\"onKey;onFocus\">\r\n\r\n\t<div dojoAttachPoint=\"buttonNode\" class=\"dojoButtonLeftPart\" style=\"position:absolute;left:0px;top:0px;\"\r\n\t\tdojoAttachEvent=\"onMouseOver; onMouseOut; onMouseDown; onMouseUp; onClick:buttonClick;\">\r\n\t\t<div class=\"dojoButtonContents\" dojoAttachPoint=\"containerNode\" style=\"position:absolute;top:0px;right:0px;z-index:2;\"></div>\r\n\t\t<img dojoAttachPoint=\"leftImage\" style=\"position:absolute;left:0px;top:0px;\">\r\n\t\t<img dojoAttachPoint=\"centerImage\" style=\"position:absolute;right:0px;top:0px;z-index:1;\">\r\n\t</div>\r\n\r\n\t<div dojoAttachPoint=\"rightPart\" class=\"dojoButtonRightPart\" style=\"position:absolute;top:0px;right:0px;\"\r\n\t\tdojoAttachEvent=\"onMouseOver:rightOver; onMouseOut:rightOut; onMouseDown:rightDown; onMouseUp:rightUp; onClick:rightClick;\">\r\n\t\t<img dojoAttachPoint=\"arrowBackgroundImage\" style=\"position:absolute;top:0px;left:0px;z-index:1;\">\r\n\t\t<img src=\"${dojoWidgetModuleUri}templates/images/whiteDownArrow.gif\"\r\n\t\t  \t\tstyle=\"z-index:2;position:absolute;left:3px;top:50%;\">\r\n\t\t<img dojoAttachPoint=\"rightImage\" style=\"position:absolute;top:0px;right:0px;\">\r\n\t</div>\r\n\r\n</div>\r\n",splitWidth:2,arrowWidth:5,_sizeMyselfHelper:function(e){
var mb=_1.html.getMarginBox(this.containerNode);
this.height=mb.height;
this.containerWidth=mb.width;
var _50c=this.height/3;
if(this.disabled){
_1.widget.wai.setAttr(this.domNode,"waiState","disabled",true);
this.domNode.removeAttribute("tabIndex");
}else{
_1.widget.wai.setAttr(this.domNode,"waiState","disabled",false);
this.domNode.setAttribute("tabIndex","0");
}
this.leftImage.height=this.rightImage.height=this.centerImage.height=this.arrowBackgroundImage.height=this.height;
this.leftImage.width=_50c+1;
this.centerImage.width=this.containerWidth;
this.buttonNode.style.height=this.height+"px";
this.buttonNode.style.width=_50c+this.containerWidth+"px";
this._setImage(this.disabled?this.disabledImg:this.inactiveImg);
this.arrowBackgroundImage.width=this.arrowWidth;
this.rightImage.width=_50c+1;
this.rightPart.style.height=this.height+"px";
this.rightPart.style.width=this.arrowWidth+_50c+"px";
this._setImageR(this.disabled?this.disabledImg:this.inactiveImg);
this.domNode.style.height=this.height+"px";
var _50d=this.containerWidth+this.splitWidth+this.arrowWidth+2*_50c;
this.domNode.style.width=_50d+"px";
},_setImage:function(_50e){
this.leftImage.src=_1.uri.moduleUri("dojo.widget",_50e+"l.gif");
this.centerImage.src=_1.uri.moduleUri("dojo.widget",_50e+"c.gif");
},rightOver:function(e){
if(this.disabled){
return;
}
_1.html.prependClass(this.rightPart,"dojoButtonHover");
this._setImageR(this.activeImg);
},rightDown:function(e){
if(this.disabled){
return;
}
_1.html.prependClass(this.rightPart,"dojoButtonDepressed");
_1.html.removeClass(this.rightPart,"dojoButtonHover");
this._setImageR(this.pressedImg);
},rightUp:function(e){
if(this.disabled){
return;
}
_1.html.prependClass(this.rightPart,"dojoButtonHover");
_1.html.removeClass(this.rightPart,"dojoButtonDepressed");
this._setImageR(this.activeImg);
},rightOut:function(e){
if(this.disabled){
return;
}
_1.html.removeClass(this.rightPart,"dojoButtonHover");
_1.html.removeClass(this.rightPart,"dojoButtonDepressed");
this._setImageR(this.inactiveImg);
},rightClick:function(e){
if(this.disabled){
return;
}
try{
this.domNode.focus();
}
catch(e2){
}
this._toggleMenu(this.menuId);
},_setImageR:function(_514){
this.arrowBackgroundImage.src=_1.uri.moduleUri("dojo.widget",_514+"c.gif");
this.rightImage.src=_1.uri.moduleUri("dojo.widget",_514+"r.gif");
},onKey:function(e){
if(!e.key){
return;
}
var menu=_1.widget.getWidgetById(this.menuId);
if(e.key==e.KEY_ENTER||e.key==" "){
this.onMouseDown(e);
this.buttonClick(e);
_1.lang.setTimeout(this,"onMouseUp",75,e);
_1.event.browser.stopEvent(e);
}else{
if(e.key==e.KEY_DOWN_ARROW&&e.altKey){
this.rightDown(e);
this.rightClick(e);
_1.lang.setTimeout(this,"rightUp",75,e);
_1.event.browser.stopEvent(e);
}else{
if(menu&&menu.isShowingNow&&e.key==e.KEY_DOWN_ARROW){
_1.event.disconnect(this.domNode,"onblur",this,"onBlur");
}
}
}
}});
_1.provide("ws.calendar.MySdkAddEvent");
_1.require("dojo.widget.*");
_1.require("dojo.widget.ContentPane");
_1.require("dojo.widget.LayoutContainer");
_1.require("dojo.widget.Menu2");
_1.require("ws.calendar.calutil");
_1.require("ws.date");
_1.require("ws.html");
_1.require("ws.io");
_1.require("ws.string");
_1.require("ws.widget.util");
_1.require("ws.widget.WSButton");
_1.require("ws.widget.WSSelect");
_1.widget.defineWidget("ws.calendar.MySdkAddEvent",_1.widget.HtmlWidget,{widgetsInTemplate:true,templateCssString:".SdkAddEventDlg .wsButton {\tfont-family: arial;\tfont-size: 12px;\tmargin: 0px;\tposition: relative;}.SdkAddEventDlg .wsButton .content {\tcursor: pointer;\tpadding: 4px 7px;\tcolor: #000000;\tdisplay: block;\tposition: absolute;\tleft: 0px;\t\tborder: solid 1px #999999;}.SdkAddEventDlg .wsButton .contentDisabled {\theight: 28px;\tcursor: default;\tcolor: #999999;}.SdkAddEventDlg .wsToolbarBare div.wsButton:hover .content,.SdkAddEventDlg div.wsButton:hover .content,.SdkAddEventDlg div.wsButtonHover .content {}.SdkAddEventDlg .wsToolbarBare div.wsButton:hover .contentDisabled,.SdkAddEventDlg div.wsButton:hover .contentDisabled,.SdkAddEventDlg div.wsButtonHover .contentDisabled {\tbackground: none;}.SdkAddEventDlg .wsButton .label {\tposition: absolute;\tleft: 7px;}.SdkAddEventDlg .wsButton .arrow {\tposition: absolute;\tright: 0px;\ttop: 0px;\twidth: 13px;\theight: 100%;}.SdkAddEventDlg .wsButton .splitArrow {\tborder-left: 1px solid #659ad0;}.SdkAddEventDlg .wsButton .arrow img {\tbackground: url(\"${images}main.gif\") -1038px -2px;\twidth: 9px;\theight: 5px;\tmargin: 10px 0px 0px 0px;}.SdkAddEventDlg .wsButton .splitArrow img {\tmargin-left: 3px;}.SdkAddEventDlg .wsButton .splitArrow:hover {\tbackground: url(\"${images}backgrounds.gif\") -0px -38px;}/* Blue theme */.SdkAddEventDlg .wsButtonBlue {\tfont-size: 10px;\tfont-family: Verdana;}.SdkAddEventDlg .wsToolbarBare .wsButtonBlue .content,.SdkAddEventDlg .wsButtonBlue .content {\tbackground: url(\"${images}backgrounds.gif\") -0px -0px repeat-x;\tborder: 1px solid #b7cee2;\tcolor: #000000;\tpadding: 3px 7px;}.SdkAddEventDlg .wsToolbarBare div.wsButtonBlue:hover .content,.SdkAddEventDlg div.wsButtonBlue:hover .content,.SdkAddEventDlg div.wsButtonHoverBlue .content {\tbackground-position: -0px -19px;\tborder: 1px solid #76bbe4;}.SdkAddEventDlg div.wsButtonBlue:hover .contentDisabled,.SdkAddEventDlg div.wsButtonHoverBlue .contentDisabled {\tbackground-position: -0px -0px;\tborder: 1px solid #b7cee2;}.SdkAddEventDlg .wsButtonBlue .arrow img {\tmargin-top: 8px;\tbackground-position: -1036px -3px;\twidth: 6px;\theight: 3px;}.SdkAddEventDlg .wsButtonBlue.rightBorder .content {\tborder-right: solid 1px #b3b3b3;\tmargin-right: 4px;}/* Yellow theme */.SdkAddEventDlg .wsButtonYellow .content {\tbackground: url(\"${images}backgrounds.gif\") -0px -145px repeat-x;\tborder: 1px solid #b7cee2;\tcolor: #000000;\tpadding: 3px 7px;}.SdkAddEventDlg div.wsButtonYellow:hover .content,.SdkAddEventDlg div.wsButtonHoverYellow .content {\tbackground-position: -0px -169px;\tborder: 1px solid #76bbe4;}/* Toolbar buttons */.SdkAddEventDlg .wsToolbar .wsButton .content {\tpadding: 6px 9px 7px 7px;\tbackground: url(\"${images}backgrounds.gif\") -0px -262px repeat-x;\tborder: none;}.SdkAddEventDlg .wsToolbar .wsButton .contentDisabled {\tcursor: default;\tcolor: #999999;}.SdkAddEventDlg .wsToolbar .wsButton.rightBorder .content {\tborder-right: solid 1px #b3b3b3;}.SdkAddEventDlg .wsToolbar .wsButton .arrow img {\tmargin: 11px 0px 0px 0px;}.SdkAddEventDlg .wsToolbar div.wsButton:hover .content,.SdkAddEventDlg .wsToolbar div.wsButtonHover .content {\tbackground: url(\"${images}backgrounds.gif\") -0px -290px repeat-x;}.SdkAddEventDlg .wsToolbar div.wsButton:hover .contentDisabled,.SdkAddEventDlg .wsToolbar div.wsButtonHover .contentDisabled {\tbackground: none;}/* Compose buttons */.SdkAddEventDlg .wsButtonCompose {\tfont: bold 12px verdana;}.SdkAddEventDlg .wsToolbarBare .wsButtonCompose .content {\tbackground: url(\"${images}backgrounds.gif\") -0px -318px repeat-x;\tborder: 1px solid #000000;\tcolor: #000000;\tpadding: 3px 7px;}.SdkAddEventDlg .wsToolbar div.wsButtonCompose:hover .content,.SdkAddEventDlg .wsToolbar div.wsButtonHoverCompose .content {\tbackground-position: -0px -341px;\tborder: 1px solid #000000;}/* Hat buttons */.SdkAddEventDlg .wsButtonHat {\tfont: normal 10px verdana;}.SdkAddEventDlg .wsButtonHat .content {\tbackground: url(\"${images}backgrounds.gif\") -0px -364px repeat-x;\tborder: 1px solid #000000;\tcolor: #000000;\tpadding: 3px 7px;}.SdkAddEventDlg div.wsButtonHat:hover .content,.SdkAddEventDlg div.wsButtonHoverHat .content {\tbackground-position: -0px -383px;\tborder: 1px solid #000000;}.SdkAddEventDlg .wsButtonHat .arrow img {\tmargin-top: 8px;\tbackground-position: -1037px -20px;\twidth: 5px;\theight: 3px;}.SdkAddEventDlg .wsButtonHat .splitArrow {\tborder-left: 1px solid #000000;}.SdkAddEventDlg .wsButtonHat .splitArrow:hover {\tbackground-position: -0px -402px;}/* Send Confirmation buttons */.SdkAddEventDlg .wsButtonSendConfirmation {\tfont: 12px arial;\tmargin-right: 17px;}.SdkAddEventDlg .wsToolbarBare .wsButtonSendConfirmation .content {\tbackground: url(\"${images}backgrounds.gif\") -0px -318px repeat-x;\tborder: 1px solid #000000;\tcolor: #000000;\tpadding: 3px 7px;}.SdkAddEventDlg .wsToolbar div.wsButtonSendConfirmation:hover .content,.SdkAddEventDlg .wsToolbar div.wsButtonHoverSendConfirmation .content {\tbackground-position: -0px -341px;\tborder: 1px solid #000000;}.SdkAddEventDlg .leftButton{\tmargin-left: 4px;}.SdkAddEventDlg .rightButton{\tmargin-right: 4px;}.SdkAddEventDlg .alignLeft{\tfloat: left;}.SdkAddEventDlg .alignRight{\tfloat: right;}",templateString:"<div id=\"dialog\" class=\"SdkAddEventDlg\">\t<div dojoType=\"dojo:LayoutContainer\" class=\"SdkAddEvent\" style=\"height: 100%; width: 100%;\">    <div id=\"header\">\t    <div class=\"noTabs\">\t\t    <div id=\"title\">  \t\t\t    <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"100%\">\t\t\t    <tr><td>\t\t\t    <IMG src=\"${images}/img_calendar_pageId.jpg\" ><br>\t\t\t    </td></tr>\t\t\t    </table>\t\t    </div>\t    </div>    </div>    <div dojoAttachPoint=\"titlediv\" id=\"titlediv\" style=\"padding: 8px 16px 6px 20px;\">\t    <span dojoAttachPoint=\"titledivmsg\" id=\"titledivmsg\" class=\"titlespan\">${CalendarHeader}</span>    </div>    <div id=\"editdiv\" style=\"padding: 0px 16px 0px 16px;\">\t    <div id=\"containerdiv\" style=\"padding: 0px 3px 8px 3px;\" class=\"calSdkTabPanel2\">\t    <table>\t\t    <tr>\t\t\t    <th style=\"vertical-align:top;\">${Cal_SdkAddEvent_FieldEvent}</th>\t\t\t    <td>\t\t\t\t    <div dojoAttachPoint=\"fieldEvent\" style=\"width:270px;height:15px;overflow:hidden;\"></div>\t\t\t    </td>\t\t    </tr>\t\t    <tr>\t\t\t    <th style=\"vertical-align:top;\">${Cal_SdkAddEvent_FieldWhen}</th>\t\t\t    <td><div dojoAttachPoint=\"fieldDate\" ></div>\t\t\t\t    <div dojoAttachPoint=\"fieldTime\" ></div>\t\t\t    </td>\t\t    </tr>\t\t\t\t    <tr>\t\t\t    <th style=\"vertical-align:top;\">${Cal_SdkAddEvent_FieldWhere}</th>\t\t\t    <td><div dojoAttachPoint=\"fieldWhere\" style=\"width:270px;height:25px;overflow:hidden;\"></div>\t\t\t    </td>\t\t    </tr>\t\t    <tr>\t\t\t    <td colspan=\"2\"><br/></td>\t\t    </tr>\t\t    <tr width=\"50px\">\t\t\t    <td colspan=\"2\">\t\t\t\t    <h3>${Cal_SdkAddEvent_OptionsHeading}</h3>\t\t\t    </td>\t\t    </tr>\t\t    <tr>\t\t\t\t    <th>${Cal_SdkAddEvent_FieldCalendar}</th>\t\t\t\t\t\t    <td>\t\t\t    <ul dojoType=\"ws:WSSelect\" dojoAttachPoint=\"calendarMenu\" class=\"smallField\"></ul> \t\t\t    </td>\t\t    </tr>\t\t    <tr>\t\t\t\t    <th>${RemindMe}</th>\t\t\t    <td>\t\t\t\t    <ul dojoType=\"ws:WSSelect\" name=\"lstRemindMe\" dojoAttachPoint=\"reminderMenu\" class=\"smallField\">\t\t\t\t        <li value=\"noReminder\" selected=\"true\">${NoReminder}</li>\t\t\t\t        <li value=\"AtDateandTimeAbove\">${AtDateAndTimeAbove}</li>\t\t\t\t\t    <li value=\"15\">15 ${MinsBefore}</li>\t\t\t\t\t    <li value=\"30\">30 ${MinsBefore}</li>\t\t\t\t\t    <li value=\"60\">1 ${HourBefore}</li>\t\t\t\t\t    <li value=\"120\">2 ${HoursBefore}</li>\t\t\t\t\t    <li value=\"180\">3 ${HoursBefore}</li>\t\t\t\t\t    <li value=\"360\">6 ${HoursBefore}</li>\t\t\t\t\t    <li value=\"720\">12 ${HoursBefore}</li>\t\t\t\t\t    <li value=\"1440\">1 ${DayBefore}</li>\t\t\t\t\t    <li value=\"2880\">2 ${DaysBefore}</li>\t\t\t\t\t    <li value=\"4320\">3 ${DaysBefore}</li>\t\t\t\t        <li value=\"5760\">4 ${DaysBefore}</li>\t\t\t\t\t    <li value=\"10080\">1 ${WeekBefore}</li>\t\t\t\t\t    <li value=\"20160\">2 ${WeeksBefore}</li>\t\t\t\t\t    <li value=\"30240\">3 ${WeeksBefore}</li>\t\t\t\t\t    <li value=\"40320\">4 ${WeeksBefore}</li>\t\t\t\t    </ul>\t\t\t    </td>\t\t    </tr>\t\t\t    </table>\t    </div>\t\t\t<div dojoType=\"dojo:ContentPane\" style=\"margin-top: 3px; margin-right:10px\">\t\t\t<div style=\"height: 25px; width: 52px;\" class=\"wsButton wsButtonHat rightButton alignRight CancelBtn\" dojoAttachPoint=\"cancelBtn\" dojoattachevent=\"onClick: onCancelCalendar; onMouseOver; onMouseDown\">\t\t\t\t<div class=\"label content\" dojoattachpoint=\"containerNode\">${Cal_SdkAddEvent_ButtonCancel}</div>\t\t\t</div>\t\t\t<div style=\"height: 25px; width: 140px;\" class=\"wsButton wsButtonHat alignRight SaveBtn\" dojoAttachPoint=\"saveBtn\" dojoattachevent=\"onClick: onAddCalendar; onMouseOver; onMouseDown\">\t\t\t\t<div class=\"label content\" dojoattachpoint=\"containerNode\">${Cal_SdkAddEvent_ButtonSave}</div>\t\t\t</div>\t\t</div>\t</div>    <div dojoAttachPoint=\"successdiv\" style=\"padding: 0px 16px 0px 16px;\">\t    <span dojoAttachPoint=\"successdivmsg1\" class=\"titlespan\"></span>\t\t<div dojoType=\"dojo:ContentPane\" style=\"margin-top: 3px; margin-right:10px\">\t\t\t<div style=\"height: 25px; width: 52px;\" class=\"wsButton wsButtonHat rightButton alignRight CancelBtn\" dojoAttachPoint=\"CloseButtonLink1\" dojoattachevent=\"onClick: onCancelCalendar; onMouseOver; onMouseDown\">\t\t\t\t<div class=\"label content\" dojoattachpoint=\"containerNode\">${Cal_SdkAddEvent_ButtonFinished}</div>\t\t\t</div>\t\t\t<div style=\"height: 25px; width: 135px;\" class=\"wsButton wsButtonHat alignRight SaveBtn\" dojoAttachPoint=\"GoToCalendarLink\" dojoattachevent=\"onClick: handleGoToCalendar; onMouseOver; onMouseDown\">\t\t\t\t<div class=\"label content\" dojoattachpoint=\"containerNode\">${Cal_SdkAddEvent_ButtonGoToCalendar}</div>\t\t\t</div>\t\t</div>\t    </div>    <div dojoAttachPoint=\"errordiv\" style=\"padding: 0px 16px 0px 20px;\">\t    <span dojoAttachPoint=\"errordivmsg1\" class=\"titlespan\"></span>\t    <center>\t    <table><tr><td>\t    \t    <div dojoType=\"dojo:ContentPane\" style=\"margin-top: 3px; margin-right:10px\">\t\t\t<div style=\"height: 25px; width: 52px;\" class=\"wsButton wsButtonHat rightButton alignRight CancelBtn\" dojoAttachPoint=\"CloseButtonLink2\" dojoattachevent=\"onClick: onCancelCalendar; onMouseOver; onMouseDown\">\t\t\t\t<div class=\"label content\" dojoattachpoint=\"containerNode\">${Cal_SdkAddEvent_ButtonClose}</div>\t\t\t</div>\t\t</div>\t\t    \t    </td></tr></table>\t    </center>    </div>    \t<!-- TODO: L10N English -->\t\t<div id=\"footer\" style=\"\">\t    <div id=\"copyright\"><nobr><span>&copy; 2007 AOL LLC. All Rights Reserved.\t    </span><span></span></nobr>\t    </div>\t</div>\t</div></div>",jumpToDate:null,fillInTemplate:function(){
this.theCalendarModel=new ws.calendar.CalendarViewModel();
this.eventInfo=new Object();
this.eventValue="";
this.locationValue="";
this.dateValue="";
this.timeValue="";
this.remLeadTimeValue="";
this.theCalendarModel.getData();
},postCreate:function(args,frag){
_1.event.connectOnce(this.theCalendarModel,"modelUpdated",this,"update");
_1.event.connectOnce(this.theCalendarModel,"requestUpdate",_1.lang.hitch(this,function(){
this.theCalendarModel.getData();
}));
_1.event.connect(this.reminderMenu,"valueChanged",this,"handleReminder");
},setValues:function(_519,type){
switch(type){
case "Event":
this.eventValue=_519;
ws.html.setInnerText(this.fieldEvent,this.eventValue);
break;
case "Where":
this.locationValue=_519;
ws.html.setInnerText(this.fieldWhere,this.locationValue);
break;
case "Date":
this.dateValue=_519;
ws.html.setInnerText(this.fieldDate,this.dateValue);
break;
case "Time":
this.timeValue=_519;
ws.html.setInnerText(this.fieldTime,this.timeValue);
break;
default:
break;
}
},buildCalendarList:function(){
var _51b=[];
var _51c=this.theCalendarModel.getCalendarList();
var _51d=this.theCalendarModel.calendarEnum;
if(!_51c||!_51d){
alert("the calendar list is empty");
this.calendarMenu.setOptions([{display:"",calid:""}]);
return;
}
for(var i=0;i<_51c.length;i++){
var _51f=_51c[i];
var _520=_51f[_51d.id];
var _521=_51f[_51d.displayName];
if(_51f[_51d.writable]){
_51b.push({display:_521,value:_520});
}
}
this.calendarMenu.setOptions(_51b);
},update:function(){
_1.debug("update(): event was saved");
this.buildCalendarList();
},handleReminder:function(){
this.remLeadTimeValue=this.reminderMenu.currentValue;
},getAOLCalendarURL:function(){
_1.debug("Config.BasePagesURL"+Config.BasePagesURL);
var url=Config.BasePagesURL+"Suite.aspx?app=calendar&view=d";
if(this.jumpToDate!=null){
url+="&date="+this.jumpToDate;
}else{
if(this.jumpToDTStart!=null){
url+="&date="+this.jumpToDTStart;
}
}
return url;
},handleGoToCalendar:function(){
var url=this.getAOLCalendarURL();
ws.io.openWindow(url,"_aolcal","width=800,height=600,status=yes,resizable=yes,toolbar=yes,menubar=yes,scrollbars=yes,location=yes");
window.close();
},showDiv:function(iDiv){
_1.debug("showDiv");
if(iDiv==0){
_1.html.show(this.editdiv);
_1.html.hide(this.successdiv);
_1.html.hide(this.errordiv);
}else{
if(iDiv==1){
_1.html.hide(this.editdiv);
_1.html.show(this.successdiv);
_1.html.hide(this.errordiv);
}else{
_1.html.hide(this.editdiv);
_1.html.hide(this.successdiv);
_1.html.show(this.errordiv);
}
}
},showErrorDiv:function(){
this.showDiv(2);
},showErrorDiv:function(msg,_526){
this.showDiv(2);
var _527=Config.Strings.Cal_SdkAddEvent_ConfirmationErrorHeading;
ws.html.setInnerText(this.titledivmsg,_527);
var _528=Config.Strings.Cal_SdkAddEvent_ConfirmationErrorMessage;
ws.html.setInnerText(this.errordivmsg1,_528);
},showSuccessDiv:function(){
this.showDiv(1);
},showSuccessDiv:function(_529,msg,_52b){
this.showDiv(1);
_1.debug("the successMsg is"+Config.Strings.Cal_SdkAddEvent_ConfirmationSuccessMessage);
var _52c=ws.string.substituteParams(Config.Strings.Cal_SdkAddEvent_ConfirmationSuccessMessage,_529);
ws.html.setInnerText(this.titledivmsg,_52c);
this.titledivmsg.style.color="#52AB26";
if(_52b!=null&&_52b.length>0){
var _52d=ws.string.substituteParams(Config.Strings.Cal_SdkAddEvent_ShowUnselectedMessageFmt,_52b);
ws.html.setInnerText(this.successdivmsg1,_52d);
}else{
if(this.warnMsg!=null&&this.warnMsg.length>0){
ws.html.setInnerText(this.successdivmsg1,this.warnMsg);
}
}
},onMouseDown:function(){
},onAddCalendar:function(){
_1.debug("checkAndGetInfo");
if(this.eventInfo==null){
this.eventInfo=new Object();
}
this.eventInfo.SDK_Calid=this.calendarMenu.currentValue;
this.eventInfo.SDK_Summary=ws.io.getQueryParameter("summary");
this.eventInfo.SDK_DTStart=ws.io.getQueryParameter("dtstart");
this.eventInfo.SDK_DTEnd=ws.io.getQueryParameter("dtend");
this.eventInfo.SDK_Duration=ws.io.getQueryParameter("duration");
this.eventInfo.SDK_Tzid=ws.io.getQueryParameter("tzid");
this.eventInfo.SDK_Desc=ws.io.getQueryParameter("desc");
this.eventInfo.SDK_Location=ws.io.getQueryParameter("location");
this.eventInfo.SDK_AllDay=ws.io.getQueryParameter("allday");
this.eventInfo.SDK_EventType=ws.io.getQueryParameter("eventType");
this.jumpToDTStart=this.eventInfo.SDK_DTStart;
this.eventInfo.SDK_RemEnabled=(this.remLeadTimeValue!="noReminder");
if(this.eventInfo.SDK_RemEnabled){
this.eventInfo.SDK_RemLeadTime=this.remLeadTimeValue;
}else{
this.eventInfo.SDK_RemEnabled=false;
}
_1.debug("this.eventInfo.SDK_RemEnabled = "+this.eventInfo.SDK_RemEnabled);
_1.debug("this.eventInfo.SDK_RemLeadTime = "+this.eventInfo.SDK_RemLeadTime);
this.saveComponentSDK(this.eventInfo);
this.eventInfo=null;
},saveComponentSDK:function(args){
if(!args){
args=this.model.getDefaultComponentArgs();
}
_1.debug("saveComponentSDK called");
ws.io.rpc({action:"SaveComponentSDK",content:args,load:_1.lang.hitch(this,function(data){
this.zventsProcessResponse(data);
}),error:function(err){
this.showErrorDiv("","");
}});
},zventsProcessResponse:function(data,tag){
_1.debug(data);
this.warnMsg=data.errMsg;
this.warnMsg=ws.calendar.calutil.DecodeHTMLEntities(this.warnMsg);
this.warnMsgUnselectedCal=data.errMsgUnselectedCal;
this.warnMsgUnselectedCal=ws.calendar.calutil.DecodeHTMLEntities(this.warnMsgUnselectedCal);
this.retSummary=data.summary;
this.retSummary=ws.calendar.calutil.DecodeHTMLEntities(this.retSummary);
this.retSummary=ws.calendar.calutil.DecodeHTML(this.retSummary);
this.jumpToDate=data.jumpToDate;
this.writeFailed=data.writeFailed;
this.showSuccessDiv(this.retSummary,this.warnMsg,this.warnMsgUnselectedCal);
},onCancelCalendar:function(){
_1.debug("onCancelCalendar");
window.opener=self;
window.close();
}});
_1.kwCompoundRequire({common:["ws.calendar.AddEventDialog","ws.calendar.CalendarDragAndDrop","ws.calendar.CalendarViewModel","ws.calendar.CalendarViewWidget","ws.calendar.calutil","ws.calendar.ColumnViewWidget","ws.calendar.ConfirmRecurDialog","ws.calendar.EditCalendar","ws.calendar.EventQuickViewWidget","ws.calendar.ExportCompsWidget","ws.calendar.GlobLayout","ws.calendar.GridViewWidget","ws.calendar.ImportCompsWidget","ws.calendar.InlineAddEvent","ws.calendar.QuickAdd","ws.calendar.UntimedViewWidget","ws.calendar.UpcomingEventsViewWidget","ws.calendar.MySdkAddEvent"]});
_1.provide("ws.widget.*");
_1.provide("dojo.io.ScriptSrcIO");
_1.require("dojo.io.BrowserIO");
_1.require("dojo.undo.browser");
_1.io.ScriptSrcTransport=new function(){
this.preventCache=false;
this.maxUrlLength=1000;
this.inFlightTimer=null;
this.DsrStatusCodes={Continue:100,Ok:200,Error:500};
this.startWatchingInFlight=function(){
if(!this.inFlightTimer){
this.inFlightTimer=setInterval("dojo.io.ScriptSrcTransport.watchInFlight();",100);
}
};
this.watchInFlight=function(){
var _533=0;
var _534=0;
for(var _535 in this._state){
_533++;
var _536=this._state[_535];
if(_536.isDone){
_534++;
delete this._state[_535];
}else{
if(!_536.isFinishing){
var _537=_536.kwArgs;
try{
if(_536.checkString&&eval("typeof("+_536.checkString+") != 'undefined'")){
_536.isFinishing=true;
this._finish(_536,"load");
_534++;
delete this._state[_535];
}else{
if(_537.timeoutSeconds&&_537.timeout){
if(_536.startTime+(_537.timeoutSeconds*1000)<(new Date()).getTime()){
_536.isFinishing=true;
this._finish(_536,"timeout");
_534++;
delete this._state[_535];
}
}else{
if(!_537.timeoutSeconds){
_534++;
}
}
}
}
catch(e){
_536.isFinishing=true;
this._finish(_536,"error",{status:this.DsrStatusCodes.Error,response:e});
}
}
}
}
if(_534>=_533){
clearInterval(this.inFlightTimer);
this.inFlightTimer=null;
}
};
this.canHandle=function(_538){
return _1.lang.inArray(["text/javascript","text/json","application/json"],(_538["mimetype"].toLowerCase()))&&(_538["method"].toLowerCase()=="get")&&!(_538["formNode"]&&_1.io.formHasFile(_538["formNode"]))&&(!_538["sync"]||_538["sync"]==false)&&!_538["file"]&&!_538["multipart"];
};
this.removeScripts=function(){
var _539=document.getElementsByTagName("script");
for(var i=0;_539&&i<_539.length;i++){
var _53b=_539[i];
if(_53b.className=="ScriptSrcTransport"){
var _53c=_53b.parentNode;
_53c.removeChild(_53b);
i--;
}
}
};
this.bind=function(_53d){
var url=_53d.url;
var _53f="";
if(_53d["formNode"]){
var ta=_53d.formNode.getAttribute("action");
if((ta)&&(!_53d["url"])){
url=ta;
}
var tp=_53d.formNode.getAttribute("method");
if((tp)&&(!_53d["method"])){
_53d.method=tp;
}
_53f+=_1.io.encodeForm(_53d.formNode,_53d.encoding,_53d["formFilter"]);
}
if(url.indexOf("#")>-1){
_1.debug("Warning: dojo.io.bind: stripping hash values from url:",url);
url=url.split("#")[0];
}
var _542=url.split("?");
if(_542&&_542.length==2){
url=_542[0];
_53f+=(_53f?"&":"")+_542[1];
}
if(_53d["backButton"]||_53d["back"]||_53d["changeUrl"]){
_1.undo.browser.addToHistory(_53d);
}
var id=_53d["apiId"]?_53d["apiId"]:"id"+this._counter++;
var _544=_53d["content"];
var _545=_53d.jsonParamName;
if(_53d.sendTransport||_545){
if(!_544){
_544={};
}
if(_53d.sendTransport){
_544["dojo.transport"]="scriptsrc";
}
if(_545){
_544[_545]="dojo.io.ScriptSrcTransport._state."+id+".jsonpCall";
}
}
if(_53d.postContent){
_53f=_53d.postContent;
}else{
if(_544){
_53f+=((_53f)?"&":"")+_1.io.argsFromMap(_544,_53d.encoding,_545);
}
}
if(_53d["apiId"]){
_53d["useRequestId"]=true;
}
var _546={"id":id,"idParam":"_dsrid="+id,"url":url,"query":_53f,"kwArgs":_53d,"startTime":(new Date()).getTime(),"isFinishing":false};
if(!url){
this._finish(_546,"error",{status:this.DsrStatusCodes.Error,statusText:"url.none"});
return;
}
if(_544&&_544[_545]){
_546.jsonp=_544[_545];
_546.jsonpCall=function(data){
if(data["Error"]||data["error"]){
if(_1["json"]&&_1["json"]["serialize"]){
_1.debug(_1.json.serialize(data));
}
_1.io.ScriptSrcTransport._finish(this,"error",data);
}else{
_1.io.ScriptSrcTransport._finish(this,"load",data);
}
};
}
if(_53d["useRequestId"]||_53d["checkString"]||_546["jsonp"]){
this._state[id]=_546;
}
if(_53d["checkString"]){
_546.checkString=_53d["checkString"];
}
_546.constantParams=(_53d["constantParams"]==null?"":_53d["constantParams"]);
if(_53d["preventCache"]||(this.preventCache==true&&_53d["preventCache"]!=false)){
_546.nocacheParam="dojo.preventCache="+new Date().valueOf();
}else{
_546.nocacheParam="";
}
var _548=_546.url.length+_546.query.length+_546.constantParams.length+_546.nocacheParam.length+this._extraPaddingLength;
if(_53d["useRequestId"]){
_548+=_546.idParam.length;
}
if(!_53d["checkString"]&&_53d["useRequestId"]&&!_546["jsonp"]&&!_53d["forceSingleRequest"]&&_548>this.maxUrlLength){
if(url>this.maxUrlLength){
this._finish(_546,"error",{status:this.DsrStatusCodes.Error,statusText:"url.tooBig"});
return;
}else{
this._multiAttach(_546,1);
}
}else{
var _549=[_546.constantParams,_546.nocacheParam,_546.query];
if(_53d["useRequestId"]&&!_546["jsonp"]){
_549.unshift(_546.idParam);
}
var _54a=this._buildUrl(_546.url,_549);
_546.finalUrl=_54a;
this._attach(_546.id,_54a);
}
this.startWatchingInFlight();
};
this._counter=1;
this._state={};
this._extraPaddingLength=16;
this._buildUrl=function(url,_54c){
var _54d=url;
var _54e="?";
for(var i=0;i<_54c.length;i++){
if(_54c[i]){
_54d+=_54e+_54c[i];
_54e="&";
}
}
return _54d;
};
this._attach=function(id,url){
var _552=document.createElement("script");
_552.type="text/javascript";
_552.src=url;
_552.id=id;
_552.className="ScriptSrcTransport";
document.getElementsByTagName("head")[0].appendChild(_552);
};
this._multiAttach=function(_553,part){
if(_553.query==null){
this._finish(_553,"error",{status:this.DsrStatusCodes.Error,statusText:"query.null"});
return;
}
if(!_553.constantParams){
_553.constantParams="";
}
var _555=this.maxUrlLength-_553.idParam.length-_553.constantParams.length-_553.url.length-_553.nocacheParam.length-this._extraPaddingLength;
var _556=_553.query.length<_555;
var _557;
if(_556){
_557=_553.query;
_553.query=null;
}else{
var _558=_553.query.lastIndexOf("&",_555-1);
var _559=_553.query.lastIndexOf("=",_555-1);
if(_558>_559||_559==_555-1){
_557=_553.query.substring(0,_558);
_553.query=_553.query.substring(_558+1,_553.query.length);
}else{
_557=_553.query.substring(0,_555);
var _55a=_557.substring((_558==-1?0:_558+1),_559);
_553.query=_55a+"="+_553.query.substring(_555,_553.query.length);
}
}
var _55b=[_557,_553.idParam,_553.constantParams,_553.nocacheParam];
if(!_556){
_55b.push("_part="+part);
}
var url=this._buildUrl(_553.url,_55b);
this._attach(_553.id+"_"+part,url);
};
this._finish=function(_55d,_55e,_55f){
if(_55e!="partOk"&&!_55d.kwArgs[_55e]&&!_55d.kwArgs["handle"]){
if(_55e=="error"){
_55d.isDone=true;
throw _55f;
}
}else{
switch(_55e){
case "load":
var _560=_55f?_55f.response:null;
if(!_560){
_560=_55f;
}
_55d.kwArgs[(typeof _55d.kwArgs.load=="function")?"load":"handle"]("load",_560,_55f,_55d.kwArgs);
_55d.isDone=true;
break;
case "partOk":
var part=parseInt(_55f.response.part,10)+1;
if(_55f.response.constantParams){
_55d.constantParams=_55f.response.constantParams;
}
this._multiAttach(_55d,part);
_55d.isDone=false;
break;
case "error":
_55d.kwArgs[(typeof _55d.kwArgs.error=="function")?"error":"handle"]("error",_55f.response,_55f,_55d.kwArgs);
_55d.isDone=true;
break;
default:
_55d.kwArgs[(typeof _55d.kwArgs[_55e]=="function")?_55e:"handle"](_55e,_55f,_55f,_55d.kwArgs);
_55d.isDone=true;
}
}
};
_1.io.transports.addTransport("ScriptSrcTransport");
};
window.onscriptload=function(_562){
var _563=null;
var _564=_1.io.ScriptSrcTransport;
if(_564._state[_562.id]){
_563=_564._state[_562.id];
}else{
var _565;
for(var _566 in _564._state){
_565=_564._state[_566];
if(_565.finalUrl&&_565.finalUrl==_562.id){
_563=_565;
break;
}
}
if(_563==null){
var _567=document.getElementsByTagName("script");
for(var i=0;_567&&i<_567.length;i++){
var _569=_567[i];
if(_569.getAttribute("class")=="ScriptSrcTransport"&&_569.src==_562.id){
_563=_564._state[_569.id];
break;
}
}
}
if(_563==null){
throw "No matching state for onscriptload event.id: "+_562.id;
}
}
var _56a="error";
switch(_562.status){
case _1.io.ScriptSrcTransport.DsrStatusCodes.Continue:
_56a="partOk";
break;
case _1.io.ScriptSrcTransport.DsrStatusCodes.Ok:
_56a="load";
break;
}
_564._finish(_563,_56a,_562);
};
_1.provide("ws.im.wim");
_1.require("dojo.lang.array");
_1.require("ws.io");
ws.im.wim={listeners:[],events:"buddylist,presence,im,typing,offlineIM",user:null,buddies:{},acceptedBuddies:{"aolsystemmsg":true},declinedBuddies:{},groups:[],customOnlineMessages:[],customAwayMessages:[],cannedAwayMessages:[Config.Strings.BuddyStatus_Label_IAmAway,Config.Strings.BuddyStatus_Label_OnThePhone,Config.Strings.BuddyStatus_Label_BeRightBack],prefStoreIm:true,resetUserData:function(){
this._token=null;
this._tokenExpiresIn=0;
this._aimsid=null;
this._fetchBaseUrl=null;
this._redirectUrl=null;
this._fetchFailures=0;
this._sessionFailures=0;
this.user=null;
this.buddies={};
this.groups=[];
this.customOnlineMessages=[];
this.customAwayMessages=[];
},getTokenFromWim:function(){
this._token=null;
this._call("auth/getToken","_getTokenResponse",1,{language:Config.PageLocale});
},start:function(){
this._endCalled=false;
var _56b=this;
setTimeout(function(){
_1.addOnLoad(function(){
_56b._token=null;
var _56c=false;
var _56d=ws.io.getObjectCookie("Auth");
if(_56d!=null){
if(_56d.hasOwnProperty("wim")){
if(_56d.wim.length>0){
_56c=true;
}
}
}
if(_56c){
ws.io.rpc({action:"GetOpenAuthToken",load:_1.lang.hitch(this,function(data){
_56b._token=data.token_a;
_56b._startSession();
}),error:_1.lang.hitch(this,function(){
_56b.getTokenFromWim();
})});
}else{
_56b.getTokenFromWim();
}
});
},10);
var _56f=function(){
ws.im.wim.end(true);
};
if(typeof (window.addEventListener)=="undefined"){
window.attachEvent("onbeforeunload",_56f);
}else{
window.addEventListener("beforeunload",_56f,false);
}
if(!this._removalIntervalId){
this._removalIntervalId=setInterval(function(){
if(typeof (ws)!="undefined"&&ws["im"]&&ws.im["wim"]){
ws.im.wim._removeFinishedScripts();
}
},5000);
}
},end:function(_570){
this._stopFetchEvents();
if(this._endCalled){
return;
}
this._endCalled=true;
var _571="_sessionEndResponse";
if(_570){
if(this._removalIntervalId){
clearInterval(this._removalIntervalId);
}
this._stopFetchEvents();
_1.io.ScriptSrcTransport.removeScripts();
var _572=_1.io.argsFromMap;
_1.io.argsFromMap=function(){
var _573=_572.apply(_1.io,arguments);
return _573.replace(/dojo\.io\.ScriptSrcTransport\._state\.id[0-9]+\.jsonpCall/,"void");
};
_571=null;
}
this._call("aim/endSession",_571,1,{aimsid:this._aimsid});
var _574=(new Date()).getTime();
var _575=_574;
while(_574+1000>_575){
_575=(new Date()).getTime();
}
},setState:function(_576,_577){
_577=_577||"";
var _578="";
_577=_577.replace(/^\s+/,"").replace(/\s+$/,"");
if(_577){
var _579=null;
var _57a=[];
if(_576=="away"){
_579=this.customAwayMessages;
_57a=this.cannedAwayMessages;
_578=_577;
}else{
if(_576=="online"){
_579=this.customOnlineMessages;
this._call("presence/setStatus","_discardResponse",9,{aimsid:this._aimsid,statusMsg:_577});
}
}
if(_579){
var _57b=_1.lang.some(_57a,function(item){
return item==_577;
});
if(!_57b){
var _57d=!_1.lang.some(_579,function(item){
return item==_577;
});
if(_57d){
_579.push(_577);
}
}
}
}
this._call("presence/setState","_setStateResponse",9,{aimsid:this._aimsid,view:_576,away:_578});
},sendIm:function(_57f,_580,_581){
_581=_581||false;
var im={senderAimId:this.user.aimId,message:_580,autoresponse:false,timestamp:(new Date()).getTime()};
this._storeIm(_57f,im);
this.declinedBuddies[_57f]=false;
this._call("im/sendIM","_discardResponse",9,{aimsid:this._aimsid,t:_57f,message:_580,offlineIM:_581});
},addBuddy:function(_583,_584){
this._call("buddylist/addBuddy","_discardResponse",5,{aimsid:this._aimsid,buddy:_583,group:_584});
},removeBuddy:function(_585,_586){
this._call("buddylist/removeBuddy","_discardResponse",5,{aimsid:this._aimsid,buddy:_585,group:_586});
},isInBuddyList:function(_587){
return !!(this.buddies[_587]&&this.buddies[_587].groups);
},_getTokenResponse:function(data){
if(data["token"]){
this._token=data.token.a;
this._tokenExpiresIn=data.token.expiresIn;
var _589=this;
setTimeout(function(){
_589._startSession();
},10);
}else{
this._notify("onError",Config.Strings.Error_BadGetTokenResponse+data);
}
},_startSessionResponse:function(data){
if(data["fetchBaseURL"]){
this._aimsid=data.aimsid;
this._fetchBaseUrl=data.fetchBaseURL;
this.user=data.myInfo;
this._sessionFailures=0;
this._notify("onUserLoad");
this._fetchTimeoutId=setTimeout(this._fetchEvents,700);
}else{
this._notify("onError",Config.Strings.Error_BadStartSessionResponse+data);
}
},_startSession:function(){
this._call("aim/startSession","_startSessionResponse",1,{events:this.events,assertCaps:"",interestCaps:""});
},_restartSession:function(){
this._stopFetchEvents();
this.resetUserData();
this.start();
},_fetchEvents:function(){
if(ws.im.wim._fetchTimeoutId!=0){
ws.im.wim._call("fetchEvents","_fetchEventsResponse",9,{timeout:ws.im.wim._fetchTimeout});
}
},_fetchTimeout:((navigator.userAgent.indexOf("Firefox")>-1||navigator.userAgent.indexOf("Camino")>-1||window.opera)&&!document.all)?2000:60000,_fetchEventsResponse:function(data){
if(data.fetchBaseURL){
this._fetchBaseUrl=data.fetchBaseURL;
}
var _58c=true;
var _58d=data.events;
this._fetchFailures=0;
if(_58d){
for(var i=0;i<_58d.length;i++){
var evt=_58d[i];
if(evt.type=="sessionEnded"){
_58c=false;
this.resetUserData();
this._notify("onSessionEnd");
}else{
if(evt.type=="buddylist"){
this._unpackBuddyList(evt.eventData);
this._notify("onBuddyListLoad");
}else{
if(evt.type=="presence"){
this._presenceChanged(evt.eventData);
}else{
if(evt.type=="im"){
var _590=evt.eventData;
var _591=_590.source.aimId;
var _592=this.buddies[_591];
if(!_592){
_592=this.buddies[_591]=_590.source;
}else{
var _593=this._presenceChanged(_590.source);
}
var im={senderAimId:_590.source.aimId,message:_590.message,autoresponse:_590.autoresponse,timestamp:_590.timestamp};
this._storeIm(_591,im);
this._notify("onIm",im);
}else{
if(evt.type=="typing"){
this._notify("onTypingChanged",{aimId:evt.eventData.aimId,status:evt.eventData.typingStatus});
}else{
if(evt.type=="offlineIM"){
this._notify("onOfflineIm",evt.eventData);
}else{
_1.debug(" ");
_1.debug("EVENT: ");
for(var _595 in evt){
this._debugOut(_595,evt[_595]);
}
}
}
}
}
}
}
}
}
if(_58c){
this._fetchTimeoutId=setTimeout(this._fetchEvents,data.timeToNextFetch);
}else{
this._stopFetchEvents();
}
},_sessionEndResponse:function(data){
this._notify("onSessionEnd");
this.resetUserData();
},_storeIm:function(_597,im){
if(this.prefStoreIm){
var _599=this.buddies[_597];
if(!_599){
_599=this.buddies[_597]={aimId:_597};
}
if(!_599["im"]){
_599.im=[];
}
_599.im.push(im);
}
},_setStateResponse:function(data){
this.user=data.myInfo;
this._notify("onUserLoad");
},_presenceChanged:function(_59b){
var _59c=null;
var _59d=this.buddies[_59b.aimId];
if(!_59d){
_59d=this.buddies[_59b.aimId]=_59b;
_59c={};
}else{
for(var _59e in _59b){
if(!_59d[_59e]||_59d[_59e]!=_59b[_59e]){
if(!_59c){
_59c={};
}
_59c[_59e]=_59d[_59e];
_59d[_59e]=_59b[_59e];
}
}
if(_59d.awayMsg&&!_59b.awayMsg){
_59c.awayMsg=_59d.awayMsg;
_59d.awayMsg=null;
}
}
_59d.baseTime=new Date();
if(_59c){
this._notify("onPresenceChanged",{aimId:_59b.aimId,oldValues:_59c});
}
},_stopFetchEvents:function(){
clearTimeout(this._fetchTimeoutId);
this._fetchTimeoutId=0;
},_call:function(_59f,_5a0,_5a1,args){
if(!args){
args={};
}
var url="";
if("fetchEvents"==_59f){
url=this._fetchBaseUrl;
}else{
if("auth/getToken"==_59f){
url=Config.AuthServer+_59f;
}else{
url=Config.WIMUrl+_59f;
}
}
if(url==null){
return;
}
args.r=this._requestId++;
args.k=Config.WIMKey;
args.f="json";
if(this._token){
args.a=this._token;
}
var _5a4=7;
if(args["timeout"]){
_5a4+=args.timeout/1000;
}
_1.io.bind({url:url,mimetype:"text/javascript",transport:"ScriptSrcTransport",jsonParamName:"c",content:args,handle:this._callResponse,timeoutSeconds:_5a4,preventCache:true,_wimAction:_59f,_wimCall:_5a0,_wimErrorType:_5a1});
},_callResponse:function(type,data,evt,_5a8){
var _5a9=ws.im.wim;
if(type=="load"){
var _5aa=data.statusCode;
if(_5aa==200){
if(_5a8["_wimCall"]){
_5a9[_5a8._wimCall](data.data);
}
}else{
if((_5aa==330||_5aa==401||_5aa==450)&&data.data&&data.data["redirectURL"]){
_5a9._waitingBindArgs=_5a8;
_5a9._needAuth(data.data.redirectURL);
}else{
_5a9._notify("onError",{action:_5a8._wimAction,statusCode:data.statusCode,statusText:data.statusText,params:_5a8.content,errorType:_5a8._wimErrorType,errorMsg:data.statusText});
type="error";
}
}
}else{
if(type=="error"){
_5a9._notify("onError",{errorType:_5a8._wimErrorType,errorMsg:data});
}else{
if(type=="timeout"){
if(_5a8._wimAction=="fetchEvents"){
if(++_5a9._fetchFailures>2){
_5a9._restartSession();
return;
}else{
_5a9._fetchTimeoutId=setTimeout(_5a9._fetchEvents,700);
}
}
_5a9._notify("onError",{errorType:_5a8._wimErrorType,errorMsg:Config.Strings.Error_ActionTimedOut+_5a8._wimAction});
}
}
}
if(!_5a9._finishedRequestIds){
_5a9._finishedRequestIds={};
}
_5a9._finishedRequestIds["req"+_5a8.content.r]=true;
if((type=="error"||type=="timeout")&&_5a8._wimAction=="aim/endSession"){
_5a9.resetUserData();
}
},_notify:function(_5ab,data){
var _5ad=false;
for(var i=0;i<this.listeners.length;i++){
var _5af=this.listeners[i];
if(_5af[_5ab]){
_5af[_5ab](data);
_5ad=true;
}
}
if(!_5ad){
_1.debug("ws.im.wim message: "+_5ab+", data: ",data);
}
},_needAuth:function(url,_5b1){
this._redirectUrl=url;
this._authAction=_5b1;
var _5b2=this;
this._authInterval=setInterval(function(){
_5b2._watchAuth();
},200);
this._launchAuth();
},_watchAuth:function(){
var _5b3=window.location.hash;
if(_5b3&&_5b3!="#"){
var _5b4="#AUTHDONE|#AUTHCANCEL|#CONSENTDONE|#CONSENTCANCEL|#CONSENTINVALIDTOKEN".indexOf(_5b3);
if(_5b4!=-1){
clearTimeout(this._authInterval);
this._authInterval=0;
window.location="#";
this._closeAuth();
if(_5b3=="#AUTHDONE"||_5b3=="#CONSENTDONE"){
_1.io.bind(this._waitingBindArgs);
}else{
if(_5b3=="#AUTHCANCEL"){
this._notify("onAuthCancel");
}else{
if(_5b3=="#CONSENTCANCEL"){
this._notify("onConsentCancel");
}else{
if(_5b3=="#CONSENTINVALIDTOKEN"){
this._notify("onConsentInvalidToken");
}else{
this._notify("onError",Config.Strings.Error_InvalidAuthState+_5b3);
}
}
}
}
}
}
},_launchAuth:function(){
var _5b5=this._redirectUrl+(this._redirectUrl.indexOf("?")==-1?"?":"&")+"k="+Config.WIMKey+"&refresh="+(new Date()).getTime();
var _5b6=_1.byId("aimWimAuthWindow");
if(!_5b6){
var _5b6=_1.doc().createElement("iframe");
_5b6.id="aimWimAuthWindow";
_5b6.src=_5b5;
_5b6.frameborder=0;
var _5b7=_5b6.style;
_5b7.position="absolute";
_5b7.top="5px";
_5b7.border="2px solid black";
_5b7.backgroundColor="white";
_5b7.left="5px";
_5b7.width="510px";
_5b7.height="400px";
_5b7.zIndex="100";
_1.body().appendChild(_5b6);
}else{
_5b6.style.display="block";
_5b6.src=_5b5;
}
},_closeAuth:function(){
var _5b8=_1.byId("aimWimAuthWindow");
if(_5b8){
_5b8.parentNode.removeChild(_5b8);
_5b8=null;
}
},_debugOut:function(name,obj){
if(typeof obj=="object"){
_1.debug(name+": OBJECT:");
_1.debugShallow(obj);
}else{
_1.debug(name+": "+obj);
}
},_unpackBuddyList:function(_5bb){
if(_5bb&&_5bb.groups){
this.buddies={};
this.groups=[];
var _5bc={displayName:Config.Strings.BuddyList_Label_GroupOffline,name:this._offlineGroupName,buddies:[],isOfflineGroup:true};
var _5bd=_5bb.groups;
for(var i=0;i<_5bd.length;i++){
var _5bf=_5bd[i].name;
var _5c0=_5bd[i].buddies;
var _5c1=_5c0.length;
var _5c2={"Buddies":Config.Strings.BuddyList_Label_GroupBuddies,"Co-Workers":Config.Strings.BuddyList_Label_GroupCoworkers,"Family":Config.Strings.BuddyList_Label_GroupFamily,"Recent Buddies":Config.Strings.BuddyList_Label_GroupRecentBuddies};
var _5c3=_5c2[_5bf]||_5bf;
var _5c4={displayName:_5c3,name:_5bf,buddies:[]};
this.groups.push(_5c4);
for(var j=0;j<_5c1;j++){
var _5c6=_5c0[j].aimId;
var _5c7=this.buddies[_5c6];
if(!_5c7){
_5c7=this.buddies[_5c6]=_5c0[j];
_5c7.groups=[this._offlineGroupName];
_5bc.buddies.push(_5c6);
}
_5c7.baseTime=new Date();
_5c7.groups.push(_5bf);
_5c4.buddies.push(_5c6);
}
}
_5bc.buddies=_5bc.buddies.sort();
this.groups.push(_5bc);
}
},_discardResponse:function(){
},_removeFinishedScripts:function(){
if(this._finishedRequestIds){
var _5c8=this._finishedRequestIds;
this._finishedRequestIds=null;
var _5c9=document.getElementsByTagName("script");
for(var i=_5c9.length-1;i>-1;i--){
var _5cb=_5c9[i];
var src=_5cb.src||"";
var _5cd=src.match(/\Wr\=([0-9]+)/);
if(_5cd&&_5c8["req"+_5cd[1]]){
_1.dom.destroyNode(_5cb);
}
}
}
},_token:null,_tokenExpiresIn:0,_aimsid:null,_fetchBaseUrl:null,_requestId:1,_finishedRequestIds:null,_removalIntervalId:0,_fetchFailures:0,_sessionFailures:0,_offlineGroupName:"Offline",_systemAimId:">>$y$tem<<"};
ws.im.wim.listeners.push({onError:function(data){
_1.debug("wim.onError:",data);
_1.debugShallow(data);
},onAuthCancel:function(){
_1.debug("wim.onAuthCancel");
},onConsentCancel:function(){
_1.debug("wim.onConsentCancel");
},onUserLoad:function(){
_1.debug("wim.onUserLoad:",ws.im.wim.user);
},onSessionEnd:function(){
_1.debug("wim.onSessionEnd");
},onBuddyListLoad:function(){
_1.debug("wim.onBuddyListLoad:",ws.im.wim.buddies);
},onIm:function(data){
_1.debug("wim.onIm:",data);
},onOfflineIm:function(data){
_1.debug("wim.onOfflineIm:",data);
},onPresenceChanged:function(data){
_1.debug("wim.onPresenceChanged:",data,"new value:",ws.im.wim.buddies[data.aimId]);
},onTypingChanged:function(data){
_1.debug("wim.onTypingChanged:",data);
}});
_1.provide("ws.im.AddBuddyCard");
_1.require("dojo.widget.*");
_1.require("dojo.widget.PopupContainer");
_1.widget.defineWidget("ws.im.AddBuddyCard",_1.widget.PopupContainer,{templateString:"<div class=\"addBuddyCard\" style=\"display: none;\">\r\n\t<img src=\"${spacer}\" class=\"wsSmallCoolCloseButton\" dojoAttachEvent=\"onClick: onClickCloseButton\">\r\n\t<div>\r\n\t\t<div dojoType=\"ws:DefaultTextbox\" dojoAttachPoint=\"screenNameTextbox\" defaultValue=\"${AIM_ScreenName}\"></div>\r\n\t</div>\r\n\t<span style=\"clear: both;\"></span>\r\n\t<ul dojoType=\"ws:WSSelect\" size=\"135\" dojoAttachPoint=\"groupSelect\"></ul>\r\n\t<span style=\"clear: both;\"></span>\r\n\t<div dojoType=\"ws:WSButton\" dojoAttachEvent=\"onClick: onClickAddButton\" vizType=\"Blue\">${Add}</div>\r\n</div>\r\n",templateCssString:".addBuddyCard {\r\n\tbackground-color: #FFFFFF;\r\n\twidth: 155px;\r\n\tpadding: 5px 7px 8px 12px;\r\n\tborder: 1px solid #8A8A8A;\r\n\tz-index: 1000;\r\n\tposition: absolute;\r\n\toverflow: auto;  /* Fixes the Firefox no-blinking-cursor bug */\r\n}\t\r\n\r\n.addBuddyCard .wsSmallCoolCloseButton {\r\n\tfloat: right;\r\n}\r\n\r\n.addBuddyCard .wsInput {\r\n\twidth: 135px;\r\n\tclear: both;\r\n\tmargin-top: 5px;\r\n\t_margin-top: 0px;  /* IE6 only */\r\n}\r\n\r\n.addBuddyCard .wsSelect {\r\n\tmargin: 7px 0px 0px 0px;\r\n\tfloat: left;\r\n\tclear: both;\r\n}\r\n\r\n.addBuddyCard .wsButton {\r\n\tfloat: right;\r\n\tclear: both;\r\n\tmargin: 9px 8px 0px 0px;\r\n\tdisplay: inline; /* Fixes the IE double float margin bug */\r\n}\r\n",templateCssPath:_1.uri.moduleUri("ws.im","AddBuddyCard.css"),widgetsInTemplate:true,isContainer:false,beginZIndex:500,onShow:function(){
ws.im.AddBuddyCard.superclass.onShow.apply(this,arguments);
this.screenNameTextbox.setValue("");
var _5d3=[];
_1.lang.forEach(ws.im.wim.groups,function(_5d4){
if(_5d4.name!="Offline"&&_5d4.name!="Recent Buddies"){
_5d3.push({value:_5d4.name,display:_1.string.escapeXml(_5d4.displayName)});
}
});
this.groupSelect.setOptions(_5d3);
},onClickCloseButton:function(evt){
this.close();
},onClickAddButton:function(evt){
var sn=this.screenNameTextbox.getValue();
if(!sn){
ws.widget.Dialogs.ok(Config.Strings.AddBuddy_Label_NoScreenName);
return;
}
ws.im.wim.addBuddy(sn,this.groupSelect.currentValue);
ws.reporting.reportAction("Add Buddy");
this.close();
}});
_1.provide("ws.im.BuddyList");
_1.require("dojo.event.*");
_1.require("dojo.html.style");
_1.require("dojo.string.common");
_1.require("dojo.string.extras");
_1.require("dojo.widget.*");
_1.require("dojo.widget.Menu2");
_1.require("dojo.widget.PopupContainer");
_1.require("ws.html");
_1.require("ws.widget.BuddyIcon");
_1.require("ws.widget.HoverCardManager");
_1.widget.defineWidget("ws.im.BuddyList",_1.widget.HtmlWidget,{buddyListDisplay:null,htmlIdMap:{},templateString:"<div dojoattachpoint=\"buddyListDisplay\" class=\"buddyList\"></div>",templateCssString:".buddyList .groupTitle {\r\n\tfont-size: 12px;\r\n\tfont-weight: bold;\r\n\tmargin: 0px 0px 1px 0px;\r\n\tpadding: 0px;\r\n\tbackground-color: #EDE1CF;\r\n\twhite-space: nowrap;\r\n}\r\n.buddyList .groupTitle a {\r\n\tpadding: 2px 0px 2px 3px;\r\n}\r\n\r\n.buddyList .buddiesList {\r\n\tmargin-left: 4px;\r\n}\r\n\r\n.buddyList .buddy {\r\n\twhite-space: nowrap;\r\n\tfont-size: 12px;\r\n}\r\n.buddyList .buddy a {\r\n\tpadding: 2px 0px;\r\n}\r\n\r\n.buddyList .groupTitle a:hover, .buddyList .buddy a:hover {\r\n\tbackground-color: #E5EDFA;\r\n}\r\n\r\n.buddyList .buddy .icon {\r\n\theight: 16px;\r\n\twidth: 16px;\r\n\tborder: none;\r\n\tmargin-right: 3px;\r\n}\r\n\r\n.buddyList .buddy-online {\r\n}\r\n\r\n.buddyList .buddy-idle {\r\n\tfont-style: italic;\r\n}\r\n.buddyList .buddy-idle .icon {\r\n\tbackground-image: url(\"${images}aimex/buddy-art-list-idle.gif\");\r\n}\r\n\r\n.buddyList .buddy-away {\r\n\tcolor: gray;\r\n}\r\n.buddyList .buddy-away .icon {\r\n\tbackground-image: url(\"${images}aimex/buddy-art-list-away.gif\");\t\r\n}\r\n\r\n.buddyList .buddy-mobile {\r\n\tcolor: blue;\r\n}\r\n.buddyList .buddy-mobile .icon {\r\n\tbackground-image: url(\"${images}aimex/buddy-art-list-wireless-twoway.gif\");\t\r\n}\r\n\r\n.buddyList .buddy-offline {\r\n\tdisplay: none;\r\n}\r\n\r\n.buddyList .offlineGroup .buddy {\r\n\tdisplay: none;\r\n}\r\n.buddyList .offlineGroup .buddy-offline {\r\n\tdisplay: block;\r\n\tfont-style: italic;\r\n}\r\n.buddyList .offlineGroup .buddy-offline a {\r\n\tcolor: #6A6A6A;\r\n}\r\n\r\n.buddyList .buddiesCollapsed {\r\n\tdisplay: none;\r\n}\r\n\r\n.buddyList .groupTwisty {\r\n\tbackground: url(\"${images}main.gif\") -1066px -16px;\r\n\twidth: 9px;\r\n\theight: 9px;\r\n\tborder: 0px;\r\n}\r\n.buddyList .groupTwistyClosed {\r\n\tbackground-position: -1050px -16px;\r\n}\r\n\r\n.buddyList ul {\r\n\tlist-style-type: none;\r\n\tpadding-left: 0px;\r\n\tmargin: 0px;\r\n}\r\n\r\n.buddyList li a {\r\n\tdisplay: block;\r\n\tcolor: #000000;\r\n\ttext-decoration: none;\r\n\t-moz-outline-style: none;\r\n}\r\n\r\n/*\r\n *\tHover card\r\n */\r\n\r\n.buddyListHoverCard {\r\n\tbackground-color: #FFFFFF;\r\n\tborder: 1px solid black;\r\n\tposition: absolute;\r\n\tmin-width: 220px;\r\n\tmax-width: 400px;\r\n\t_width: 220px;\r\n}\r\n\r\n.buddyListHoverCard .contentContainer {\r\n\tpadding: 5px 7px 5px 8px;\t\t\r\n}\r\n\r\n.buddyListHoverCard .screenName {\r\n\tfont-weight: bold;\r\n\tfont-size: 14px;\r\n}\r\n\r\n.buddyListHoverCard .time {\r\n\tfont-size: 11px;\r\n\tcolor: #6A6A6A;\r\n}\r\n\r\n.buddyListHoverCard .away {\r\n\twidth: 205px;\r\n\tword-wrap: break-word;\r\n\toverflow: hidden;\r\n}\r\n\r\n.buddyListHoverCard .delete {\r\n\twidth: 205px;\r\n\ttext-align: right;\r\n\tmargin: 0px 10px 5px;\r\n}\r\n",templateCssPath:_1.uri.moduleUri("ws.im","BuddyList.css"),onSessionEnd:function(){
this._setOffline();
},onBuddyListLoad:function(){
var _5d8=ws.im.wim.groups;
var html=["<ul class='groupList'>"];
if(_5d8){
for(var i=0;i<_5d8.length;i++){
html.push(this._getGroupHtml(_5d8[i]));
}
}
html.push("</ul>");
this.buddyListDisplay.innerHTML=html.join("");
},onPresenceChanged:function(data){
this.updateBuddy(data.aimId);
},postCreate:function(){
this._setOffline();
ws.im.wim.listeners.push(this);
_1.event.topic.subscribe("aimWimGroupNodeClicked",this,"groupNodeClicked");
_1.event.topic.subscribe("aimWimBuddyNodeClicked",this,"buddyNodeClicked");
var _5dc=this;
new ws.widget.HoverCardManager(this.buddyListDisplay.parentNode,"ws:BuddyListHoverCard","buddy",{buddyList:this},function(_5dd){
var _5de=_5dc.htmlIdMap[_5dd.id].aimId;
var _5df=ws.im.wim.buddies[_5de];
return !(_5df.state=="offline");
});
},groupNodeClicked:function(_5e0){
var _5e1=_1.dom.getAncestors(_5e0,function(_5e2){
return _1.html.hasClass(_5e2,"groupItem");
},true);
var _5e3=_1.html.getElementsByClass("buddiesList",_5e1,"ul");
if(_5e3[0]){
this._toggleClass(_5e3[0],"buddiesCollapsed");
}
var _5e4=_1.html.getElementsByClass("groupTwisty",_5e1,"img");
if(_5e4){
this._toggleClass(_5e4[0],"groupTwistyClosed");
}
var _5e5=ws.im.wim._offlineGroupName;
var _5e6=this.makeHtmlId(_5e5);
if((_5e0.id==_5e6+"-groupLink")&&!_1.byId(_5e6+"-buddiesList")){
var _5e7=ws.im.wim.groups;
for(var i=_5e7.length-1;i>-1;i--){
if(_5e7[i].name==_5e5){
offlineGroup=_5e7[i];
break;
}
}
var _5e9=this._getBuddiesHtml(offlineGroup.buddies,offlineGroup,false);
_1.byId(_5e6+"-groupItem").innerHTML+=_5e9;
}
},buddyNodeClicked:function(_5ea){
var _5eb=this.htmlIdMap[_5ea.parentNode.id];
_1.event.topic.publish("aimWimBuddyClicked",_5eb);
},_getGroupHtml:function(_5ec){
var html=[];
var _5ee=_5ec.buddies;
html.push("<li class=\"groupItem\" id=\""+this.makeHtmlId(_5ec.name)+"-groupItem\"><h2 class=\"groupTitle\"><a href=\"#\" id=\""+this.makeHtmlId(_5ec.name)+"-groupLink\" onclick=\"dojo.event.topic.publish('aimWimGroupNodeClicked', this); return false;\">","<img class=\"groupTwisty",(_5ec.isOfflineGroup?" groupTwistyClosed":""),"\" src=\""+Config.SpacerImageURL+"\" border=\"0\"/> ",_1.string.escapeXml(_5ec.displayName),"</a></h2>");
if(!_5ec.isOfflineGroup){
html.push(this._getBuddiesHtml(_5ee,_5ec,_5ec.isOfflineGroup));
}
html.push("</li>");
return html.join("");
},_getBuddiesHtml:function(_5ef,_5f0,_5f1){
var html=[];
if(_5ef){
var _5f3=ws.im.wim.buddies;
html.push("<ul id=\""+this.makeHtmlId(_5f0.name)+"-buddiesList\" class=\"buddiesList "+(_5f0.isOfflineGroup?" offlineGroup":"")+(_5f1?" buddiesCollapsed":"")+"\">");
for(var i=0;i<_5ef.length;i++){
var _5f5=_5f3[_5ef[i]];
html.push(this._getBuddyHtml(_5f5,_5f0));
}
html.push("</ul>");
}
return html.join("");
},_getBuddyHtml:function(_5f6,_5f7){
return ["<li id=\"",this.makeHtmlId(_5f7.name,_5f6.aimId),"\" class=\"buddy ",this.makePresenceStyle(_5f6.state),"\">","<a href=\"#\" onclick=\"dojo.event.topic.publish('aimWimBuddyNodeClicked', this); return false;\">","<img src=\"",this._getMiniIconUrl(_5f6),"\" class=\"icon\" align=\"absmiddle\" onerror=\"ws.im.BuddyList.prototype.miniIconFailed(this, '",_5f6.aimId,"')\">","<span class=\"name\">",_1.string.escapeXml(_5f6.displayId),"</span>","</a></li>"].join("");
},updateBuddy:function(_5f8){
var _5f9=ws.im.wim.buddies[_5f8];
var _5fa=this._isGroupClosed(ws.im.wim._offlineGroupName);
_1.lang.forEach(_5f9.groups||[],function(_5fb){
if(_5fb!=ws.im.wim._offlineGroupName||!_5fa){
var node=_1.byId(this.makeHtmlId(_5fb,_5f8));
node.className="buddy "+this.makePresenceStyle(_5f9.state);
var _5fd=_1.html.getElementsByClassName("name",node)[0];
_5fd.innerHTML=_5f9.displayId;
_1.html.getElementsByClassName("icon",node)[0].src=this._getMiniIconUrl(_5f9);
}
},this);
},_getMiniIconUrl:function(_5fe){
return (_5fe.state=="online")?"http://api.oscar.aol.com/expressions/get?type=miniIcon&f=redirect&t="+_5fe.aimId:Config.SpacerImageURL;
},miniIconFailed:function(node,_600){
var _601=ws.im.wim.buddies[_600];
if(node.src.indexOf("/get?")!=-1&&_601){
node.src=_601.buddyIcon;
}else{
if(node.src.indexOf("/getAsset")!=-1){
node.src=Config.BaseResourcesURL+"images/aimex/online.gif";
}else{
node.src=Config.SpacerImageURL;
}
}
},makePresenceStyle:function(_602){
return "buddy-"+_602;
},makeHtmlId:function(_603,_604){
newBuddyAimId=(_604||"").toLowerCase().replace(/\s+/,"").replace(/\W+/,"");
newGroupName=(_603||"").toLowerCase().replace(/\s+/,"").replace(/\W+/,"");
var _605="aimWim-"+newGroupName+"-"+newBuddyAimId;
this.htmlIdMap[_605]={groupName:_603,aimId:_604};
return _605;
},_isGroupClosed:function(_606){
var node=_1.byId(this.makeHtmlId(_606)+"-buddiesList");
var _608=!node;
if(node){
_608=_1.html.hasClass(node,"buddiesCollapsed");
}
return _608;
},_setOffline:function(){
this.buddyListDisplay.innerHTML="";
},_toggleClass:function(_609,_60a){
if(_1.html.hasClass(_609,_60a)){
_1.html.removeClass(_609,_60a);
}else{
_1.html.addClass(_609,_60a);
}
}});
_1.widget.defineWidget("ws.im.BuddyListHoverCard",_1.widget.PopupContainer,{templateString:"<div class=\"buddyListHoverCard dojoPopupContainer\" style=\"display: none;\">\r\n\t<table>\r\n\t\t<tr>\r\n\t\t\t<td valign=\"top\" class=\"contentContainer\" style=\"width: 50px;\">\r\n\t\t\t\t<div dojoType=\"ws:BuddyIcon\" dojoAttachPoint=\"buddyIcon\"></div>\r\n\t\t\t</td>\r\n\t\t\t<td valign=\"top\" class=\"contentContainer\">\r\n\t\t\t\t<div class=\"screenName\" dojoAttachPoint=\"screenNameNode\"></div>\r\n\t\t\t\t<div dojoAttachPoint=\"offlineIndicator\">${BuddyStatus_Label_Offline}</div>\r\n\t\t\t\t<div class=\"time\" dojoAttachPoint=\"onlineTimeContainer\">${BuddyInfo_Label_OnlineTime} <span dojoAttachPoint=\"onlineTimeNode\"></span></div>\r\n\t\t\t\t<div class=\"time\" dojoAttachPoint=\"idleTimeContainer\">${BuddyInfo_Label_IdleTime} <span dojoAttachPoint=\"idleTimeNode\"></span></div>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t</table>\r\n\t<div dojoAttachPoint=\"awayMessageNode\" class=\"contentContainer away\"></div>\r\n\t<div class=\"delete\">\r\n\t\t<span class=\"wsLink\" dojoAttachPoint=\"deleteLink\" dojoAttachEvent=\"onClick: onClickDelete\">${Delete}</span>\r\n\t</div>\r\n</div>\r\n",templateCssString:".buddyList .groupTitle {\r\n\tfont-size: 12px;\r\n\tfont-weight: bold;\r\n\tmargin: 0px 0px 1px 0px;\r\n\tpadding: 0px;\r\n\tbackground-color: #EDE1CF;\r\n\twhite-space: nowrap;\r\n}\r\n.buddyList .groupTitle a {\r\n\tpadding: 2px 0px 2px 3px;\r\n}\r\n\r\n.buddyList .buddiesList {\r\n\tmargin-left: 4px;\r\n}\r\n\r\n.buddyList .buddy {\r\n\twhite-space: nowrap;\r\n\tfont-size: 12px;\r\n}\r\n.buddyList .buddy a {\r\n\tpadding: 2px 0px;\r\n}\r\n\r\n.buddyList .groupTitle a:hover, .buddyList .buddy a:hover {\r\n\tbackground-color: #E5EDFA;\r\n}\r\n\r\n.buddyList .buddy .icon {\r\n\theight: 16px;\r\n\twidth: 16px;\r\n\tborder: none;\r\n\tmargin-right: 3px;\r\n}\r\n\r\n.buddyList .buddy-online {\r\n}\r\n\r\n.buddyList .buddy-idle {\r\n\tfont-style: italic;\r\n}\r\n.buddyList .buddy-idle .icon {\r\n\tbackground-image: url(\"${images}aimex/buddy-art-list-idle.gif\");\r\n}\r\n\r\n.buddyList .buddy-away {\r\n\tcolor: gray;\r\n}\r\n.buddyList .buddy-away .icon {\r\n\tbackground-image: url(\"${images}aimex/buddy-art-list-away.gif\");\t\r\n}\r\n\r\n.buddyList .buddy-mobile {\r\n\tcolor: blue;\r\n}\r\n.buddyList .buddy-mobile .icon {\r\n\tbackground-image: url(\"${images}aimex/buddy-art-list-wireless-twoway.gif\");\t\r\n}\r\n\r\n.buddyList .buddy-offline {\r\n\tdisplay: none;\r\n}\r\n\r\n.buddyList .offlineGroup .buddy {\r\n\tdisplay: none;\r\n}\r\n.buddyList .offlineGroup .buddy-offline {\r\n\tdisplay: block;\r\n\tfont-style: italic;\r\n}\r\n.buddyList .offlineGroup .buddy-offline a {\r\n\tcolor: #6A6A6A;\r\n}\r\n\r\n.buddyList .buddiesCollapsed {\r\n\tdisplay: none;\r\n}\r\n\r\n.buddyList .groupTwisty {\r\n\tbackground: url(\"${images}main.gif\") -1066px -16px;\r\n\twidth: 9px;\r\n\theight: 9px;\r\n\tborder: 0px;\r\n}\r\n.buddyList .groupTwistyClosed {\r\n\tbackground-position: -1050px -16px;\r\n}\r\n\r\n.buddyList ul {\r\n\tlist-style-type: none;\r\n\tpadding-left: 0px;\r\n\tmargin: 0px;\r\n}\r\n\r\n.buddyList li a {\r\n\tdisplay: block;\r\n\tcolor: #000000;\r\n\ttext-decoration: none;\r\n\t-moz-outline-style: none;\r\n}\r\n\r\n/*\r\n *\tHover card\r\n */\r\n\r\n.buddyListHoverCard {\r\n\tbackground-color: #FFFFFF;\r\n\tborder: 1px solid black;\r\n\tposition: absolute;\r\n\tmin-width: 220px;\r\n\tmax-width: 400px;\r\n\t_width: 220px;\r\n}\r\n\r\n.buddyListHoverCard .contentContainer {\r\n\tpadding: 5px 7px 5px 8px;\t\t\r\n}\r\n\r\n.buddyListHoverCard .screenName {\r\n\tfont-weight: bold;\r\n\tfont-size: 14px;\r\n}\r\n\r\n.buddyListHoverCard .time {\r\n\tfont-size: 11px;\r\n\tcolor: #6A6A6A;\r\n}\r\n\r\n.buddyListHoverCard .away {\r\n\twidth: 205px;\r\n\tword-wrap: break-word;\r\n\toverflow: hidden;\r\n}\r\n\r\n.buddyListHoverCard .delete {\r\n\twidth: 205px;\r\n\ttext-align: right;\r\n\tmargin: 0px 10px 5px;\r\n}\r\n",templateCssPath:_1.uri.moduleUri("ws.im","BuddyList.css"),widgetsInTemplate:true,isContainer:false,manager:null,buddyList:null,postCreate:function(args,frag){
ws.im.BuddyListHoverCard.superclass.postCreate.apply(this,arguments);
if(!Config.EnableDeleteBuddy){
_1.html.hide(this.deleteLink);
}
},populate:function(_60d){
this.aimId=this.buddyList.htmlIdMap[_60d.id].aimId;
this.groupName=this.buddyList.htmlIdMap[_60d.id].groupName;
var _60e=ws.im.wim.buddies[this.aimId];
this.buddyIcon.show({screenName:this.aimId});
ws.html.setInnerText(this.screenNameNode,_60e.displayId);
_1.html.setShowing(this.offlineIndicator,_60e.state=="offline");
_1.html.setShowing(this.onlineTimeContainer,_60e.onlineTime>0);
if(_60e.onlineTime){
var _60f=_60e.onlineTime+((new Date()-_60e.baseTime)/1000);
ws.html.setInnerText(this.onlineTimeNode,ws.date.readableDuration(_60f));
}
_1.html.setShowing(this.idleTimeContainer,_60e.idleTime>0);
if(_60e.idleTime){
var _610=(_60e.idleTime*60)+((new Date()-_60e.baseTime)/1000);
ws.html.setInnerText(this.idleTimeNode,ws.date.readableDuration(_610));
}
_1.html.setShowing(this.awayMessageNode,!!_60e.awayMsg);
this.awayMessageNode.innerHTML=_60e.awayMsg||"";
ws.html.targetLinksToNewWindow(this.awayMessageNode);
},onClickDelete:function(evt){
ws.widget.Dialogs.yesNo(ws.string.substituteParams(Config.Strings.DeleteBuddy_Label,this.aimId),_1.lang.hitch(this,function(yes){
if(yes){
ws.im.wim.removeBuddy(this.aimId,this.groupName);
}
}));
this.hide();
}});
if(ws.im.BuddyListHoverCard.prototype.templateString==_1.widget.PopupContainer.prototype.templateString){
ws.im.BuddyListHoverCard.prototype.templateString=null;
}
_1.provide("ws.im.Im");
_1.require("dojo.event.topic");
_1.require("dojo.html.style");
_1.require("dojo.widget.*");
_1.require("dojo.widget.ContentPane");
_1.require("dojo.widget.LayoutContainer");
_1.require("ws.html");
_1.widget.defineWidget("ws.im.Im",_1.widget.HtmlWidget,{templateString:"<div>\r\n\t<div class=\"imWidget\" dojoType=\"dojo:PageContainer\" dojoAttachPoint=\"pageContainer\">\r\n\t\t<div dojoType=\"dojo:LayoutContainer\" dojoAttachPoint=\"mainPane\">\r\n\t\t\t<div dojoType=\"dojo:ContentPane\" class=\"screenNameContainer\" dojoAttachPoint=\"screenNamePane\" layoutAlign=\"top\">\r\n\t\t\t\t<span dojoAttachPoint=\"screenNameLabel\">${To}:</span>\r\n\t\t\t\t<input dojoType=\"ws:DefaultTextbox\" defaultValue=\"${ScreenName}\" dojoAttachPoint=\"screenNameTextbox\">\r\n\t\t\t</div>\r\n\t\t\t<div dojoType=\"dojo:ContentPane\" dojoAttachPoint=\"conversationPane\" layoutAlign=\"client\" class=\"conversation\"></div>\r\n\t\t\t<div dojoType=\"ws:WSToolbar\" vizType=\"Bare\" layoutAlign=\"bottom\">\r\n\t\t\t\t<div dojoType=\"ws:WSButton\" toolbarPosition=\"center\" vizType=\"Blue\" dojoAttachEvent=\"onClick: onClickSendButton\">${Button_Label_Send}</div>\r\n\t\t\t</div>\r\n\t\t\t<div dojoType=\"dojo:ContentPane\" class=\"inputContainer\" layoutAlign=\"bottom\">\r\n\t\t\t\t<div>\r\n\t\t\t\t\t<textarea dojoAttachPoint=\"messageInput\" class=\"wsInput\" dojoAttachEvent=\"onkeypress: onKeyPress; onblur: onBlurTextarea\"></textarea>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"imTyping\" dojoType=\"dojo:ContentPane\" layoutAlign=\"bottom\">\r\n\t\t\t\t<span class=\"aimWimImTyping typingOff\" dojoAttachPoint=\"typingIndicator\">typing</span>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"knockKnock\" dojoType=\"dojo:LayoutContainer\" dojoAttachPoint=\"knockKnockPane\">\r\n\t\t\t<div dojoType=\"dojo:ContentPane\" layoutAlign=\"top\">\r\n\t\t\t\t<div class=\"logo\"></div>\r\n\t\t\t\t<div dojoAttachPoint=\"knockKnockPromptNode\" class=\"prompt\"></div>\r\n\t\t\t</div>\r\n\t\t\t<div dojoType=\"ws:WSToolbar\" vizType=\"Bare\" layoutAlign=\"top\">\r\n\t\t\t\t<div dojoType=\"ws:WSButton\" toolbarPosition=\"center\" vizType=\"Blue\" dojoAttachEvent=\"onClick: onClickAccept\">${KnockKnock_Label_Accept}</div>\r\n\t\t\t\t<div dojoType=\"ws:WSButton\" toolbarPosition=\"center\" vizType=\"Blue\" dojoAttachEvent=\"onClick: onClickDecline\">${KnockKnock_Label_Decline}</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n",templateCssString:".imWidget {\r\n\theight: 100%;\r\n\twidth: 100%;\r\n}\r\n\r\n.imWidget .conversation {\r\n\theight: 150px;\r\n\tbackground-color: white;\r\n\toverflow: auto;\r\n\tmargin-left: 7px;\r\n\tpadding-top: 5px;\r\n}\r\n\r\n.imWidget .imBlock {\r\n\tpadding-bottom: 3px;\t\t\r\n}\r\n\r\n.imWidget .systemIm {\r\n\tcolor: gray;\r\n\tdisplay: block;\r\n\ttext-align: center;\t\t\r\n}\r\n\r\n.imWidget .userImName {\r\n\tfont-weight: bold;\r\n\tcolor: red;\r\n}\r\n\r\n.imWidget .buddyImName {\r\n\tfont-weight: bold;\r\n\tcolor: blue;\r\n}\r\n\r\n.imWidget .userIm div {\r\n\tdisplay: inline;\r\n}\r\n\r\n.imWidget .screenNameContainer {\r\n\tpadding: 5px;\r\n\twhite-space: nowrap;\r\n}\r\n.imWidget .wsInput {\r\n\tborder: 1px solid #95C2EC;\t\r\n}\r\n\r\n.imWidget .inputContainer {\r\n\tborder: 1px solid #95C2EC;\r\n\tmargin: 0px 6px 3px 6px;\r\n\tpadding-left: 5px;\r\n}\r\n\r\n.dj_gecko .imWidget .inputContainer,\r\n.dj_gecko .imWidget .screenNameContainer {\r\n\toverflow: auto; /* Fixes the missing-cursor bug in Firefox.  Don't want this to apply to IE6 because it adds scrollbars. */\r\n}\r\n\r\n.imWidget textarea.wsInput {\r\n\twidth: 100%;\r\n\tborder: none;\r\n\theight: 50px;\r\n\toverflow: auto;\r\n}\r\n\r\n.imWidget .typing {\r\n\tdisplay: none;\r\n\tfont-weight: normal;\r\n}\r\n\r\n.imWidget .typingOn {\r\n    color: gray;\r\n}\r\n\r\n.imWidget .typingOff {\r\n    color: white;\r\n}\r\n\r\n.imWidget .imTyping {\r\n\tfont-weight: normal;\r\n\ttext-align: center;\r\n    height: 14px;\r\n    width: 100%;\r\n}\r\n\r\n.imWidget .aimWimImTyping {\r\n\ttext-align: center;\r\n    width: 100%;\r\n    font-size: 10px;\r\n}\r\n\r\n.imWidget .wsToolbar {\r\n\theight: 24px;\r\n}\r\n\r\n.imWidget .knockKnock {\r\n\tpadding: 40px 25px 0px;\r\n}\r\n.imWidget .knockKnock .logo {\r\n\tfloat: right;\r\n\twidth: 55px;\r\n\theight: 44px;\r\n\tbackground: url(\"${images}aim_logos.gif\") -67px -4px;\r\n\tmargin: 0px 20px 8px;\r\n\tdisplay: inline; /* Fix the IE double float margin bug */\r\n}\r\n.imWidget .knockKnock .prompt {\r\n\tclear: right;\r\n\tfont-weight: bold;\r\n\tmargin-bottom: 15px;\r\n}\r\n.imWidget .knockKnock .prompt .sn {\r\n\tcolor: #ff3333;\r\n}\r\n",templateCssPath:_1.uri.moduleUri("ws.im","Im.css"),widgetsInTemplate:true,imGroup:null,buddyAimId:"",postCreate:function(){
ws.im.Im.superclass.postCreate.apply(this,arguments);
this._showSavedConversation();
ws.widget.setShowing(this.screenNamePane,this.isAnon());
this.label=this.getImTitleHtml();
var _613=ws.im.wim.isInBuddyList(this.buddyAimId)||this.isAnon()||ws.im.wim.acceptedBuddies[this.buddyAimId];
if(!_613&&!this.isUserInitiated){
this.setupKnockKnock();
}
ws.browser.focus(this.messageInput);
},isAnon:function(){
return this.buddyAimId.indexOf(this.imGroup.anonIdPrefix)==0;
},close:function(){
this.parent.closeChild(this);
},_showSavedConversation:function(){
var _614=ws.im.wim.buddies[this.buddyAimId];
if(_614&&_614.im){
var _615=_614.im;
var html="";
for(var i=0;i<_615.length;i++){
html+=this._formatMessage(_615[i].message,_615[i].senderAimId,true);
}
this.conversationPane.domNode.innerHTML=html;
ws.html.targetLinksToNewWindow(this.conversationPane.domNode);
this.conversationPane.domNode.scrollTop=this.conversationPane.domNode.scrollHeight;
}
},onPopOutButtonClick:function(evt){
this.imGroup.popOutChild(this.parent);
evt.preventBubble();
},onShow:function(){
ws.im.Im.superclass.onShow.apply(this,arguments);
var _619=this;
setTimeout(function(){
ws.browser.focus(_619.messageInput);
},500);
},addMessage:function(_61a,_61b,_61c){
this.typingChanged("none");
this._appendToConversationDisplay(this._formatMessage(_61a,_61b,false,_61c));
_1.html.removeClass(this.conversationPane.domNode,"conversationDisabled");
},onKeyPress:function(e){
if((e.keyCode==e.KEY_ENTER)&&!e.shiftKey){
e.preventDefault();
this.onInputSubmit();
}else{
}
},onBlurTextarea:function(){
if(_1.render.html.moz){
ws.browser._onblur();
}
},onInputSubmit:function(){
if(this.isAnon()){
var _61e=this.screenNameTextbox.getValue();
_61e=_1.string.trim(_61e||"");
if(!_61e){
ws.widget.Dialogs.ok(Config.Strings.IM_Label_NoRecipient);
return;
}
this.imGroup.updateImGroup(this,this.buddyAimId,_61e);
this.buddyAimId=_61e;
this.updateTitle();
this.screenNamePane.hide();
this.mainPane.onResized();
}
var _61f=_1.string.trim(this.messageInput.value||"");
this.messageInput.value="";
if(_61f&&ws.im.wim.user){
_61f=_1.string.escapeXml(_61f);
_61f=_61f.replace(/\n/g,"<br>");
this.addMessage(_61f,ws.im.wim.user.displayId);
ws.im.wim.sendIm(this.buddyAimId,_61f,false);
}
},onClickSendButton:function(){
this.onInputSubmit();
},typingChanged:function(_620){
ws.html.setInnerText(this.typingIndicator,ws.string.substituteParams(Config.Strings.IM_Notice_UserTyping,this.buddyAimId));
if(_620=="typing"){
_1.html.addClass(this.typingIndicator,"typingOn");
_1.html.removeClass(this.typingIndicator,"typingOff");
}else{
_1.html.removeClass(this.typingIndicator,"typingOn");
_1.html.addClass(this.typingIndicator,"typingOff");
}
},updateTitle:function(){
this.label=this.getImTitleHtml();
this.imGroup._updateTabLabel(this);
},getImTitleHtml:function(){
return this.isAnon()?Config.Strings.IM_Title_NewIM:this.buddyAimId;
},onResized:function(){
if(this.screenNamePane.isReallyShowing()){
var _621=_1.html.getContentBox(this.screenNamePane.domNode).width;
var _622=_1.html.getMarginBox(this.screenNameLabel).width;
_1.html.setMarginBox(this.screenNameTextbox.domNode,{width:_621-_622-5});
}
ws.im.Im.superclass.onResized.apply(this,arguments);
},_formatMessage:function(_623,_624,_625,_626){
var _627=_624;
if(_624){
if(_624==ws.im.wim.user.aimId){
_627=ws.im.wim.user.displayId;
}else{
var _628=ws.im.wim.buddies[_624];
_627=(_628&&_628.displayId)||_627;
}
if(_626){
_627=Config.Strings.IM_Label_AutoResponsePrefix+_627;
}
}
_623=_623.replace(/("http(s)?\:\S+")\s*>/g,"$1 target=\"_blank\">");
_623=this._insertSmileyImages(_623);
var _629="";
if(_624==this.buddyAimId){
_629+="<span class=\"buddyImName\">"+_627+": </span><span class=\"userIm\">";
}else{
if(_624==ws.im.wim._systemAimId){
_629+="<span class=\"systemIm\">";
}else{
_629+="<span class=\"userImName\">"+_627+": </span><span class=\"userIm\">";
}
}
_629+=_623+"</span>";
if(_626){
_629="<hr>"+_629+"<hr>";
}
if(_625){
_629="<div class=\"imBlock\">"+_629+"</div>";
}
return _629;
},_appendToConversationDisplay:function(html){
var _62b=_1.doc().createElement("div");
_62b.className="imBlock";
_62b.innerHTML=html;
ws.html.targetLinksToNewWindow(_62b);
this.conversationPane.domNode.appendChild(_62b);
this.conversationPane.domNode.scrollTop=this.conversationPane.domNode.scrollHeight;
},smiliesRegExps:[{image:"shock",regexp:/=-O/gi},{image:"greed",regexp:/:-\$/gi},{image:"indecision",regexp:/:-\\/gi},{image:"frown",regexp:/:-\(/gi},{image:"kiss",regexp:/:-\*/gi},{image:"foot",regexp:/:-!/gi},{image:"cry",regexp:/:\'\(/gi},{image:"yell",regexp:/>:O/gi},{image:"shame",regexp:/:-\[/gi},{image:"bigkiss",regexp:/:-X/gi},{image:"wink",regexp:/;-\)/gi},{image:"tongue",regexp:/:-P/gi},{image:"cool",regexp:/8-\)/gi},{image:"halo",regexp:/O:-\)/gi},{image:"smile",regexp:/:-\)/gi},{image:"smile",regexp:/:\)/gi},{image:"smile",regexp:/:=\)/gi},{image:"grin",regexp:/:-D/gi}],_smileyImagePath:Config.BaseResourcesURL+"images/aimex/",_insertSmileyImages:function(_62c){
for(var i=0;i<this.smiliesRegExps.length;i++){
var _62e=this.smiliesRegExps[i];
var _62f="<img src=\""+this._smileyImagePath+_62e.image+".gif\" align=\"absmiddle\">";
_62c=_62c.replace(_62e.regexp,_62f);
}
return _62c;
},setupKnockKnock:function(){
this.knockKnockPromptNode.innerHTML=ws.string.substituteParams(Config.Strings.KnockKnock_Label_Prompt,"<span class='sn'>"+this.buddyAimId+"</span>");
this.pageContainer.selectChild(this.knockKnockPane);
},onClickAccept:function(){
ws.im.wim.acceptedBuddies[this.buddyAimId]=true;
this.pageContainer.selectChild(this.mainPane);
},onClickDecline:function(){
ws.im.wim.declinedBuddies[this.buddyAimId]=true;
this.parent.closeChild(this);
}});
_1.provide("dojo.dnd.HtmlDragMove");
_1.require("dojo.dnd.*");
_1.declare("dojo.dnd.HtmlDragMoveSource",_1.dnd.HtmlDragSource,{onDragStart:function(){
var _630=new _1.dnd.HtmlDragMoveObject(this.dragObject,this.type);
if(this.constrainToContainer){
_630.constrainTo(this.constrainingContainer);
}
return _630;
},onSelected:function(){
for(var i=0;i<this.dragObjects.length;i++){
_1.dnd.dragManager.selectedSources.push(new _1.dnd.HtmlDragMoveSource(this.dragObjects[i]));
}
}});
_1.declare("dojo.dnd.HtmlDragMoveObject",_1.dnd.HtmlDragObject,{onDragStart:function(e){
_1.html.clearSelection();
this.dragClone=this.domNode;
if(_1.html.getComputedStyle(this.domNode,"position")!="absolute"){
this.domNode.style.position="relative";
}
var left=parseInt(_1.html.getComputedStyle(this.domNode,"left"));
var top=parseInt(_1.html.getComputedStyle(this.domNode,"top"));
this.dragStartPosition={x:isNaN(left)?0:left,y:isNaN(top)?0:top};
this.scrollOffset=_1.html.getScroll().offset;
this.dragOffset={y:this.dragStartPosition.y-e.pageY,x:this.dragStartPosition.x-e.pageX};
this.containingBlockPosition={x:0,y:0};
if(this.constrainToContainer){
this.constraints=this.getConstraints();
}
_1.event.connect(this.domNode,"onclick",this,"_squelchOnClick");
},onDragEnd:function(e){
},setAbsolutePosition:function(x,y){
if(!this.disableY){
this.domNode.style.top=y+"px";
}
if(!this.disableX){
this.domNode.style.left=x+"px";
}
},_squelchOnClick:function(e){
_1.event.browser.stopEvent(e);
_1.event.disconnect(this.domNode,"onclick",this,"_squelchOnClick");
}});
_1.provide("dojo.widget.ResizeHandle");
_1.require("dojo.widget.*");
_1.require("dojo.html.layout");
_1.require("dojo.event.*");
_1.widget.defineWidget("dojo.widget.ResizeHandle",_1.widget.HtmlWidget,{targetElmId:"",templateCssString:".dojoHtmlResizeHandle {\r\n\tfloat: right;\r\n\tposition: absolute;\r\n\tright: 2px;\r\n\tbottom: 2px;\r\n\twidth: 13px;\r\n\theight: 13px;\r\n\tz-index: 20;\r\n\tcursor: nw-resize;\r\n\tbackground-image: url(grabCorner.gif);\r\n\tline-height: 0px;\r\n}\r\n",templateCssPath:_1.uri.moduleUri("dojo.widget","templates/ResizeHandle.css"),templateString:"<div class=\"dojoHtmlResizeHandle\"><div></div></div>",postCreate:function(){
_1.event.connect(this.domNode,"onmousedown",this,"_beginSizing");
},_beginSizing:function(e){
if(this._isSizing){
return false;
}
this.targetWidget=_1.widget.byId(this.targetElmId);
this.targetDomNode=this.targetWidget?this.targetWidget.domNode:_1.byId(this.targetElmId);
if(!this.targetDomNode){
return;
}
this._isSizing=true;
this.startPoint={"x":e.clientX,"y":e.clientY};
var mb=_1.html.getMarginBox(this.targetDomNode);
this.startSize={"w":mb.width,"h":mb.height};
_1.event.kwConnect({srcObj:_1.body(),srcFunc:"onmousemove",targetObj:this,targetFunc:"_changeSizing",rate:25});
_1.event.connect(_1.body(),"onmouseup",this,"_endSizing");
e.preventDefault();
},_changeSizing:function(e){
try{
if(!e.clientX||!e.clientY){
return;
}
}
catch(e){
return;
}
var dx=this.startPoint.x-e.clientX;
var dy=this.startPoint.y-e.clientY;
var newW=this.startSize.w-dx;
var newH=this.startSize.h-dy;
if(this.minSize){
var mb=_1.html.getMarginBox(this.targetDomNode);
if(newW<this.minSize.w){
newW=mb.width;
}
if(newH<this.minSize.h){
newH=mb.height;
}
}
if(this.targetWidget){
this.targetWidget.resizeTo(newW,newH);
}else{
_1.html.setMarginBox(this.targetDomNode,{width:newW,height:newH});
}
e.preventDefault();
},_endSizing:function(e){
_1.event.disconnect(_1.body(),"onmousemove",this,"_changeSizing");
_1.event.disconnect(_1.body(),"onmouseup",this,"_endSizing");
this._isSizing=false;
}});
_1.provide("ws.im.ImGroup");
_1.require("dojo.dom");
_1.require("dojo.event.*");
_1.require("dojo.html.style");
_1.require("dojo.html.util");
_1.require("dojo.string.common");
_1.require("dojo.string.extras");
_1.require("dojo.widget.*");
_1.require("dojo.widget.ContentPane");
_1.require("dojo.widget.LayoutContainer");
_1.require("dojo.widget.PageContainer");
_1.require("ws.html");
_1.widget.defineWidget("ws.im.ImGroup",_1.widget.HtmlWidget,{imMap:{},anonIdPrefix:">>@n0n<<",anonIdCounter:0,navWidth:106,isMinimized:false,templateString:"<div class=\"imGroup\">\r\n\t<div class=\"imGroupWindow\" id=\"${this.widgetId}_window\" dojoType=\"dojo:LayoutContainer\" dojoAttachPoint=\"windowPane\" layoutChildPriority=\"top-bottom\">\r\n\t\t<div dojoType=\"dojo:ContentPane\" dojoAttachPoint=\"titlePane\" class=\"titleBar\" layoutAlign=\"top\">\r\n\t\t\t<img class=\"logo\" src=\"${spacer}\">\r\n\t\t\t<span class=\"title\" dojoAttachPoint=\"windowTitleNode\"></span>\r\n\t\t\t<span class=\"wsSmallCoolCloseButton\" dojoAttachEvent=\"onClick: onClickCloseButton\"></span>\r\n\t\t\t<span class=\"minimizeButton\" dojoAttachEvent=\"onClick: onClickMinimizeButton\"></span>\r\n\t\t</div>\r\n\t\t<div dojoType=\"dojo:PageController\" dojoAttachPoint=\"pageController\" containerId=\"${this.widgetId}pageContainer\" buttonWidget=\"ws:ImPageButton\" class=\"nav\" layoutAlign=\"left\"></div>\r\n\t\t<div dojoType=\"dojo:PageContainer\" dojoAttachPoint=\"pageContainer\" id=\"${this.widgetId}pageContainer\" layoutAlign=\"client\"></div>\r\n\t</div>\r\n\t<div class=\"imGroupMinimized titleBar\" style=\"display: none;\" dojoAttachPoint=\"minimizedNode\" dojoAttachEvent=\"onClick: onClickRestoreButton\">\r\n\t\t<img class=\"logo\" src=\"${spacer}\">\r\n\t\t<span dojoAttachPoint=\"minimizedTitleNode\" class=\"title\"></span>\r\n\t\t<span class=\"wsSmallCoolCloseButton\" dojoAttachEvent=\"onClick: onClickCloseButton\"></span>\r\n\t\t<span class=\"restoreButton\"></span>\r\n\t</div>\r\n</div>\r\n\r\n",templateCssString:".imGroupWindow {\r\n\tposition: absolute;\r\n\tz-index: 10;\r\n\tborder: 1px solid #5A5653;\r\n\theight: 255px;\r\n\twidth: 250px;\r\n\tbackground-color: #FFFFFF;\r\n}\r\n\r\n.imGroupMinimized {\r\n\tposition: absolute;\r\n\tz-index: 10;\r\n\tbottom: 0px;\r\n\tright: 0px;\r\n\twidth: 200px;\r\n\tborder: 1px solid #AAAAAA;\r\n}\r\n\r\n.imGroup .titleBar {\r\n\theight: 22px;\r\n\tbackground: url(\"${images}backgrounds.gif\") 0px -264px;\r\n\tbackground-color: #EADEC8;\r\n\tborder-bottom: 1px solid #AAAAAA;\r\n\tcursor: default;\r\n}\r\n.imGroupMinimized .titleBar {\r\n\tborder-bottom: none;\r\n}\r\n\r\n.imGroup .titleBar .logo {\r\n\tfloat: left;\r\n\tbackground: url(\"${images}aim_logos.gif\") -129px 0px;\t\r\n\twidth: 22px;\r\n\theight: 19px;\r\n\tmargin-left: 2px;\r\n}\r\n.imGroup .titleBar .title {\r\n\tfont-weight: bold;\r\n\tmargin: 4px;\r\n\tfloat: left;\r\n}\r\n.imGroup .titleBar .title .newCounter {\r\n\tcolor: #248F03;\r\n}\r\n.imGroup .titleBar .wsSmallCoolCloseButton {\r\n\tmargin: 4px;\r\n\tfloat: right;\r\n}\r\n.imGroup .titleBar .minimizeButton {\r\n\tfloat: right;\r\n\theight: 14px;\r\n\twidth: 14px;\r\n\tmargin: 4px 0px;\r\n\tcursor: pointer;\r\n\tbackground: url(\"${images}main.gif\") -1633px -0px;\r\n}\r\n.imGroup .titleBar .minimizeButton:hover {\r\n\tbackground-position: -1649px -0px;\r\n}\r\n.imGroup .titleBar .restoreButton {\r\n\tfloat: right;\r\n\theight: 14px;\r\n\twidth: 14px;\r\n\tmargin: 4px 0px;\r\n\tcursor: pointer;\r\n\tbackground: url(\"${images}main.gif\") -1665px -0px;\r\n}\r\n.imGroup .titleBar .restoreButton:hover {\r\n\tbackground-position: -1681px -0px;\r\n}\r\n\r\nbody .imGroup .minimizedNewMessages {\r\n\tbackground-position: 0px -443px;\r\n}\r\nbody .imGroup .minimizedNewMessages .logo {\r\n\tbackground-position: -160px 0px;\t\r\n}\r\n\r\n.imGroup .nav {\r\n\twidth: 105px;\r\n\tbackground-color: #F4ECE1;\r\n\tborder-right: 1px solid #AAAAAA;\r\n\toverflow: auto;\r\n}\r\n\r\n.imGroup .nav .item {\r\n\tposition: relative;\r\n\tdisplay: block;\r\n\tpadding: 3px;\r\n\tcursor: pointer;\r\n\twhite-space: nowrap;\r\n}\r\n.imGroup .nav .item .newMessageIcon {\r\n\theight: 13px;\r\n\twidth: 13px;\r\n\tmargin-bottom: -2px;\r\n}\r\n.imGroup .nav .itemWithNewMessage .newMessageIcon {\r\n\tbackground: url(\"${images}main.gif\") -1699px -0px;\r\n}\r\n.imGroup .nav .itemOffline {\r\n\tcolor: #A4A4A4;\r\n}\r\n.imGroup .nav .item:hover {\r\n\tbackground-color: #FFFFFF;\r\n}\r\n.imGroup .nav .item .wsSmallCoolCloseButton {\r\n\tposition: absolute;\r\n\ttop: 3px;\r\n\tright: 1px;\r\n}\r\n.imGroup .nav .current {\r\n\tbackground-color: #FFFFFF;\r\n\tfont-weight: bold;\r\n}\r\n\r\n.imGroup .dojoHtmlResizeHandle {\r\n\tbackground: url(\"${images}main.gif\") -1734px -3px;\r\n\tbottom: 0px;\r\n\tright: 0px;\r\n\theight: 11px;\r\n\twidth: 11px;\r\n}\r\n",templateCssPath:_1.uri.moduleUri("ws.im","ImGroup.css"),widgetsInTemplate:true,postCreate:function(){
ws.im.ImGroup.superclass.postCreate.apply(this,arguments);
this.drag=new _1.dnd.HtmlDragMoveSource(this.windowPane.domNode);
this.drag.setDragHandle(this.titlePane.domNode);
_1.widget.createWidget("dojo:ResizeHandle",{targetElmId:this.windowPane.domNode.id,minSize:{w:250,h:250}},this.windowPane.domNode,"first");
var _642=_1.html.getViewport();
var size=_1.html.getMarginBox(this.windowPane.domNode);
this.windowPane.domNode.style.left=(_642.width-size.width-190)+"px";
this.windowPane.domNode.style.top=(_642.height-size.height-40)+"px";
this.pageController.hide();
this.onResized();
_1.event.topic.subscribe("aimWimImWindowPopIn",this,"imWindowPopIn");
_1.event.topic.subscribe("aimWimImWindowClosing",this,"imWindowClosing");
_1.event.topic.subscribe(this.pageContainer.widgetId+"-selectChild",this,"onSelectChild");
_1.event.topic.subscribe(this.pageContainer.widgetId+"-removeChild",this,"onRemoveChild");
_1.event.topic.subscribe("wsresize",this,"ensureOnscreen");
_1.event.connect(window,"onbeforeunload",this,"unload");
ws.im.wim.listeners.push(this);
},unload:function(){
for(var _644 in this.imMap){
var im=this.imMap[_644];
if(im){
im.close();
}
}
},onError:function(data){
if(data.action=="im/sendIM"){
var _647=data.statusCode;
var _648=data.params.t;
var _649=_1.string.substituteParams(Config.Strings.IM_Notice_MessageNotSent,_648)+" ";
if(_647==602||_647==603){
_649+=_1.string.substituteParams(Config.Strings.IM_Notice_RemoteUserOffline,_648);
}else{
if(_647==606){
_649+=_1.string.substituteParams(Config.Strings.IM_Notice_MessageTooLarge,_648);
}else{
if(_647==430){
_649+=Config.Strings.Notice_NearRateLimit;
}else{
_649+=data.statusText;
}
}
}
if(ws.im.wim.user){
this.addIm(_648,_649,ws.im.wim._systemAimId);
}
}else{
if(this.isShowing()&&!this.isMinimized&&data.errorType!=9){
var _64a=data;
if(typeof _64a=="object"){
_64a="";
for(var _64b in data){
if(_64b!="params"){
_64a+=_64b+": "+data[_64b]+", ";
}
}
}
if(ws.im.wim.user){
this.pageContainer.selectedChildWidget.addMessage(Config.Strings.Error_AimGeneric,ws.im.wim._systemAimId);
this.pageContainer.selectedChildWidget.addMessage(_64a,ws.im.wim._systemAimId);
}
}
}
},onPresenceChanged:function(data){
var _64d=data.aimId;
var _64e=data.state;
if(this.imMap[_64d]){
var _64f=ws.im.wim.buddies[_64d];
if(_64f&&_64f.state&&data.oldValues.state&&data.oldValues.state!=_64f.state){
var _64e=_64f.state;
var _650="";
if(_64e=="online"){
_650=_1.string.substituteParams(Config.Strings.IM_Notice_RemoteUserOnline,_64d);
}else{
if(_64e=="offline"){
_650=_1.string.substituteParams(Config.Strings.IM_Notice_RemoteUserOffline,_64d);
}else{
if(_64e=="away"){
_650=_1.string.substituteParams(Config.Strings.IM_Notice_RemoteUserAway,_64d);
_650+=_64f.awayMsg;
}
}
}
if(_650){
this.addIm(_64d,_650,ws.im.wim._systemAimId,false,false,true);
}
}
this._setOffline(this.imMap[_64d],_64e=="offline"||_64e=="away");
}
},addIm:function(_651,_652,_653,_654,_655,_656){
if(!_651){
_651=this.anonIdPrefix+(this.anonIdCounter++);
}
var im=this.imMap[_651];
if(!im){
if(ws.im.wim.declinedBuddies[_653]&&!ws.im.wim.isInBuddyList(_653)&&!_654){
return;
}
im=this.imMap[_651]=_1.widget.createWidget("ws:Im",{isUserInitiated:_654,imGroup:this,buddyAimId:_651,label:_651});
this.pageContainer.addChild(im);
if(_654||this.pageContainer.children.length==1){
this.pageContainer.selectChild(im);
}
this.onResized();
if(this.pageContainer.children.length==1){
ws.reporting.reportAction("IM Win Open");
}else{
ws.reporting.reportAction("IM Tab Open");
}
}else{
if(_652){
im.addMessage(_652,_653,_655);
}
}
if(!this.isShowing()){
this.show();
this.onClickRestoreButton();
}
this._showHideNavPane();
if(!_656){
if(this.isMinimized||(im!=this.pageContainer.selectedChildWidget)){
this._setNewMessage(im,true);
}
if(_652){
ws.browser.setFlashingWindowTitle(ws.string.substituteParams(Config.Strings.IM_Title,_651));
}
}
if(_654){
this.onClickRestoreButton();
}
},closeIm:function(_658){
var im=this.imMap[_658];
if(im){
im.close(this);
delete this.imMap[_658];
}
},onClickCloseButton:function(evt){
while(this.pageContainer.children.length>0){
this.pageContainer.closeChild(this.pageContainer.children[0]);
}
ws.reporting.reportAction("IM Win Close");
evt.stopPropagation();
},onClickMinimizeButton:function(evt){
this.windowPane.hide();
_1.html.show(this.minimizedNode);
this.isMinimized=true;
},onClickRestoreButton:function(evt){
this.windowPane.show();
_1.html.hide(this.minimizedNode);
this._showHideNavPane();
this.onResized();
this.ensureOnscreen();
this.isMinimized=false;
this._setNewMessage(this.pageContainer.selectedChildWidget,false);
},typingChanged:function(_65d,_65e){
if(this.imMap[_65d]){
this.imMap[_65d].typingChanged(_65e);
}
},updateImGroup:function(_65f,_660,_661){
if(this._updatedExistingIm(_661)){
var _662=this;
setTimeout(function(){
_662.closeIm(_660);
},10);
}else{
if(this.imMap[_660]){
delete this.imMap[_660];
this.imMap[_661]=_65f;
}
}
},_updatedExistingIm:function(_663){
var _664=this.imMap[_663];
if(_664){
setTimeout(function(){
_664._showSavedConversation();
_664._informNewMessage("",true);
},200);
}
return !!_664;
},_setOffline:function(im,_666){
var _667=this.pageController.pane2button[im];
_667.setOffline(_666);
},_setNewMessage:function(im,_669){
var _66a=this.pageController.pane2button[im];
_66a.setNewMessage(_669);
this._updateTitle();
},_updateTabLabel:function(im){
var _66c=this.pageController.pane2button[im];
_66c.setLabel(im.label);
this._updateTitle();
},_updateTitle:function(){
var _66d=this.pageContainer.selectedChildWidget;
var _66e=_66d.isAnon()?Config.Strings.IM_Title_NewIM:_66d.buddyAimId;
this.windowTitleNode.innerHTML=ws.string.substituteParams(Config.Strings.IM_Title,_66e);
var _66f=this.pageController.children.length;
var _670=_1.lang.filter(this.pageController.children,function(btn){
return btn.hasNewMessage;
}).length;
var _672=_670?ws.string.substituteParams(Config.Strings.IM_Title_NewCount,_670):"";
_672="<span class='newCounter'>"+_672+"</span>";
var _673=(_66f==1)?Config.Strings.IM_Title_OneIM:ws.string.substituteParams(Config.Strings.IM_Title_MultipleIMs,_66f);
this.minimizedTitleNode.innerHTML=_673+_672;
ws.html.toggleClass(this.minimizedNode,"minimizedNewMessages",_670>0);
},onSelectChild:function(page){
this._setNewMessage(page,false);
},onRemoveChild:function(page){
delete this.imMap[page.buddyAimId];
this._updateTitle();
if(this.pageContainer.children.length==0){
this.hide();
}else{
this._showHideNavPane();
}
},_showHideNavPane:function(){
if(!this.windowPane.isShowing()){
return;
}
var _676=this.pageController.isShowing();
var _677=this.pageContainer.children.length>1;
var pos=_1.html.getAbsolutePosition(this.windowPane.domNode,false,_1.html.boxSizing.BORDER_BOX);
var size=_1.html.getBorderBox(this.windowPane.domNode);
if(_676&&!_677){
this.pageController.hide();
this.windowPane.resizeTo(size.width-this.navWidth,size.height);
_1.html.placeOnScreen(this.windowPane.domNode,pos.x+this.navWidth,pos.y);
}else{
if(_677&&!_676){
this.pageController.domNode.style.width="";
this.pageController.show();
this.windowPane.resizeTo(size.width+this.navWidth,size.height);
_1.html.placeOnScreen(this.windowPane.domNode,pos.x-this.navWidth,pos.y);
}
}
},onResized:function(){
this.pageController.domNode.style.width="";
this.windowPane.onResized();
},ensureOnscreen:function(){
if(!this.windowPane.isShowing()){
return;
}
var pos=_1.html.getAbsolutePosition(this.windowPane.domNode,false,_1.html.boxSizing.BORDER_BOX);
_1.html.placeOnScreen(this.windowPane.domNode,pos.x,pos.y);
}});
_1.widget.defineWidget("ws.im.ImPageButton",_1.widget.PageButton,{templateString:"<span class=\"item\" dojoAttachEvent=\"onClick; onMouseOver; onMouseOut\">"+"\t<img src=\"${spacer}\" class=\"newMessageIcon\">"+"\t<span dojoAttachPoint=\"titleNode\" class=\"selectButton\">${this.label}</span>"+"\t<span dojoAttachEvent=\"onClick: onCloseButtonClick\" dojoAttachPoint=\"closeButton\" class=\"wsSmallCoolCloseButton\" style=\"display: none;\"></span>"+"\t<span style=\"clear: both;\"></span>"+"</span>",templateCssString:".imGroupWindow {\r\n\tposition: absolute;\r\n\tz-index: 10;\r\n\tborder: 1px solid #5A5653;\r\n\theight: 255px;\r\n\twidth: 250px;\r\n\tbackground-color: #FFFFFF;\r\n}\r\n\r\n.imGroupMinimized {\r\n\tposition: absolute;\r\n\tz-index: 10;\r\n\tbottom: 0px;\r\n\tright: 0px;\r\n\twidth: 200px;\r\n\tborder: 1px solid #AAAAAA;\r\n}\r\n\r\n.imGroup .titleBar {\r\n\theight: 22px;\r\n\tbackground: url(\"${images}backgrounds.gif\") 0px -264px;\r\n\tbackground-color: #EADEC8;\r\n\tborder-bottom: 1px solid #AAAAAA;\r\n\tcursor: default;\r\n}\r\n.imGroupMinimized .titleBar {\r\n\tborder-bottom: none;\r\n}\r\n\r\n.imGroup .titleBar .logo {\r\n\tfloat: left;\r\n\tbackground: url(\"${images}aim_logos.gif\") -129px 0px;\t\r\n\twidth: 22px;\r\n\theight: 19px;\r\n\tmargin-left: 2px;\r\n}\r\n.imGroup .titleBar .title {\r\n\tfont-weight: bold;\r\n\tmargin: 4px;\r\n\tfloat: left;\r\n}\r\n.imGroup .titleBar .title .newCounter {\r\n\tcolor: #248F03;\r\n}\r\n.imGroup .titleBar .wsSmallCoolCloseButton {\r\n\tmargin: 4px;\r\n\tfloat: right;\r\n}\r\n.imGroup .titleBar .minimizeButton {\r\n\tfloat: right;\r\n\theight: 14px;\r\n\twidth: 14px;\r\n\tmargin: 4px 0px;\r\n\tcursor: pointer;\r\n\tbackground: url(\"${images}main.gif\") -1633px -0px;\r\n}\r\n.imGroup .titleBar .minimizeButton:hover {\r\n\tbackground-position: -1649px -0px;\r\n}\r\n.imGroup .titleBar .restoreButton {\r\n\tfloat: right;\r\n\theight: 14px;\r\n\twidth: 14px;\r\n\tmargin: 4px 0px;\r\n\tcursor: pointer;\r\n\tbackground: url(\"${images}main.gif\") -1665px -0px;\r\n}\r\n.imGroup .titleBar .restoreButton:hover {\r\n\tbackground-position: -1681px -0px;\r\n}\r\n\r\nbody .imGroup .minimizedNewMessages {\r\n\tbackground-position: 0px -443px;\r\n}\r\nbody .imGroup .minimizedNewMessages .logo {\r\n\tbackground-position: -160px 0px;\t\r\n}\r\n\r\n.imGroup .nav {\r\n\twidth: 105px;\r\n\tbackground-color: #F4ECE1;\r\n\tborder-right: 1px solid #AAAAAA;\r\n\toverflow: auto;\r\n}\r\n\r\n.imGroup .nav .item {\r\n\tposition: relative;\r\n\tdisplay: block;\r\n\tpadding: 3px;\r\n\tcursor: pointer;\r\n\twhite-space: nowrap;\r\n}\r\n.imGroup .nav .item .newMessageIcon {\r\n\theight: 13px;\r\n\twidth: 13px;\r\n\tmargin-bottom: -2px;\r\n}\r\n.imGroup .nav .itemWithNewMessage .newMessageIcon {\r\n\tbackground: url(\"${images}main.gif\") -1699px -0px;\r\n}\r\n.imGroup .nav .itemOffline {\r\n\tcolor: #A4A4A4;\r\n}\r\n.imGroup .nav .item:hover {\r\n\tbackground-color: #FFFFFF;\r\n}\r\n.imGroup .nav .item .wsSmallCoolCloseButton {\r\n\tposition: absolute;\r\n\ttop: 3px;\r\n\tright: 1px;\r\n}\r\n.imGroup .nav .current {\r\n\tbackground-color: #FFFFFF;\r\n\tfont-weight: bold;\r\n}\r\n\r\n.imGroup .dojoHtmlResizeHandle {\r\n\tbackground: url(\"${images}main.gif\") -1734px -3px;\r\n\tbottom: 0px;\r\n\tright: 0px;\r\n\theight: 11px;\r\n\twidth: 11px;\r\n}\r\n",templateCssPath:_1.uri.moduleUri("ws.im","ImGroup.css"),hasNewMessage:false,setNewMessage:function(_67b){
this.hasNewMessage=_67b;
ws.html.toggleClass(this.domNode,"itemWithNewMessage",_67b);
},setOffline:function(_67c){
ws.html.toggleClass(this.domNode,"itemOffline",_67c);
},setLabel:function(_67d){
this.titleNode.innerHTML=_67d;
},onMouseOver:function(evt){
_1.html.show(this.closeButton);
},onMouseOut:function(evt){
_1.html.hide(this.closeButton);
},onCloseButtonClick:function(evt){
ws.im.ImPageButton.superclass.onCloseButtonClick.call(evt);
ws.reporting.reportAction("IM Tab Close");
evt.stopPropagation();
}});
_1.provide("dojo.i18n.common");
_1.i18n.getLocalization=function(_681,_682,_683){
_1.hostenv.preloadLocalizations();
_683=_1.hostenv.normalizeLocale(_683);
var _684=_683.split("-");
var _685=[_681,"nls",_682].join(".");
var _686=_1.hostenv.findModule(_685,true);
var _687;
for(var i=_684.length;i>0;i--){
var loc=_684.slice(0,i).join("_");
if(_686[loc]){
_687=_686[loc];
break;
}
}
if(!_687){
_687=_686.ROOT;
}
if(_687){
var _68a=function(){
};
_68a.prototype=_687;
return new _68a();
}
_1.raise("Bundle not found: "+_682+" in "+_681+" , locale="+_683);
};
_1.i18n.isLTR=function(_68b){
var lang=_1.hostenv.normalizeLocale(_68b).split("-")[0];
var RTL={ar:true,fa:true,he:true,ur:true,yi:true};
return !RTL[lang];
};
_1.provide("ws.im.ImUser");
_1.require("dojo.event.*");
_1.require("dojo.string.common");
_1.require("dojo.string.extras");
_1.require("dojo.html.style");
_1.require("dojo.widget.*");
_1.require("dojo.widget.HtmlWidget");
_1.require("ws.widget.WSMenu");
_1.widget.defineWidget("ws.im.ImUser",_1.widget.HtmlWidget,{signOnEnabled:true,presenceStates:["online","invisible","notFound","idle","away","mobile","offline"],templateString:"<div class=\"imUser\">"+"\t<img src=\"${spacer}\" class=\"icon\" dojoAttachPoint=\"iconNode\" style=\"display: none;\">"+"\t<a dojoattachPoint=\"nameDisplay\" dojoAttachEvent=\"onClick: onNameClick\" class=\"name\"></a>"+"\t<a dojoattachpoint=\"presenceDisplay\" class=\"wsLink presence\">&nbsp;</a>"+"\t<input type=\"text\" dojoAttachEvent=\"onBlur: hideCustomMessageInput; onKey: onKeyCustomMessage\" dojoattachpoint=\"customMessageInput\" class=\"wsInput customMessage hidden\"/>"+"</div>",templateCssString:".imUser {\r\n\tborder: 1px solid #AAD31F;\r\n\tbackground-color: #E8F6B8;\r\n\tpadding: 5px;\r\n\tmargin: 6px;\r\n\t-moz-border-radius: 5px;\r\n\theight: 32px;\r\n}\r\n\r\n.imUser .icon {\r\n\twidth: 30px;\r\n\theight: 30px;\r\n\tborder: 1px solid #000000;\r\n}\r\n\r\n.imUser .name {\r\n\tposition: absolute;\r\n\ttop: 4px;\r\n\tleft: 41px;\r\n\tdisplay: block;\r\n\tfont-size: 13px;\r\n\tfont-weight: bold;\r\n\twhite-space: nowrap;\r\n\ttext-overflow: ellipsis;\r\n\toverflow: hidden;\r\n\twidth: 89px;\r\n}\r\n\r\n.imUser .presence {\r\n\tdisplay:block;\r\n\tposition: absolute;\r\n\ttop: 22px;\r\n\tleft: 42px;\r\n\twidth: 87px;\r\n\tfont-size: 11px;\r\n\tcursor: pointer;\r\n\tborder: 1px solid #AAD31F;\r\n\tbackground-color: #C3E15D;\r\n\t-moz-border-radius: 2px;\r\n\tcolor: #0064CC;\r\n\tpadding-left: 1px;\r\n\twhite-space: nowrap;\r\n\toverflow: hidden;\r\n}\r\n\r\n.imUser .presenceText {\r\n\tdisplay: block;\r\n\ttext-overflow: ellipsis;\r\n\toverflow: hidden;\r\n\twidth: 75px;\r\n}\r\n\r\n.imUser .hidden {\r\n\tdisplay: none;\r\n}\r\n\r\n.imUser .customMessage {\r\n\tposition: absolute;\r\n\ttop: 20px;\r\n\tleft: 40px;\r\n\twidth: 89px;\r\n\tfont-size: 10px;\r\n}\r\n\r\n.imUser .arrow {\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tbackground-repeat: no-repeat;\r\n\tbackground-position: -1066px -5px;\r\n\tposition: absolute;\r\n\ttop: 4px;\r\n\tright: 2px;\r\n\twidth: 9px;\r\n\theight: 5px;\r\n\tborder: 0;\r\n}\r\n\r\n.imUser-state-away {\r\n\tborder-color: #C8C8C8;\r\n\tbackground-color: #FFF8CA;\r\n}\r\n\r\n.imUser-state-away .presence {\r\n\tborder-color: #C8C8C8;\r\n\tbackground-color: #FCF46F;\r\n}\r\n\r\n.imUser-state-invisible {\r\n\tborder-color: #C8C8C8;\r\n\tbackground-color: white;\r\n}\r\n\r\n.imUser-state-invisible .presence {\r\n\tbackground-color: white;\r\n\tborder-color: #C8C8C8;\r\n}\r\n\r\n.imUserPresenceMenu {\r\n\twidth: 128px;\r\n}\r\n\r\nbody .imUserPresenceMenu .imUserOffCol {\r\n\tbackground-image: none;\r\n\twidth: 13px;\r\n\theight: 13px;\r\n\tmargin-left: 2px;\r\n}\t\r\n\r\nbody .imUserPresenceMenu .imUserOnCol {\r\n\tbackground-image: url(\"${images}main.gif\");\t\r\n\tbackground-position: -1137px -13px;\r\n\twidth: 13px;\r\n\theight: 13px;\r\n\tmargin-left: 2px;\r\n}\t\r\n",templateCssPath:_1.uri.moduleUri("ws.im","ImUser.css"),onUserLoad:function(){
this.updateUserPresence(ws.im.wim.user);
_1.html.hide(this.iconNode);
_1.event.browser.addListener(this.iconNode,"onload",_1.lang.hitch(this,function(){
_1.html.show(this.iconNode);
}));
this.iconNode.src=ws.presence.getBuddyIconUrl({screenName:ws.im.wim.user.aimId});
},onSessionEnd:function(){
this.setUserOffline();
},onPresenceChanged:function(data){
if(data.aimId==ws.im.wim.user.aimId){
this.updateUserPresence(ws.im.wim.user,data.state);
}
},postCreate:function(){
this.setUserOffline();
this.checkMarkChoices=["online","invisible","custom"];
var _68f=ws.im.wim.cannedAwayMessages;
for(var i=0;i<_68f.length;i++){
this.checkMarkChoices.push(this.makeHtmlId(_68f[i]));
}
this.createPresenceMenu();
ws.im.wim.listeners.push(this);
},layout:function(){
if(this.parent&&this.parent.onResized){
this.parent.onResized();
}
},updateUserPresence:function(user,_692){
this.nameDisplay.innerHTML=user.displayId;
this.nameDisplay.title=user.displayId;
this.nameDisplay.style.cursor="text";
this.signOnEnabled=false;
var _693="";
if(user.state=="away"){
if(user.awayMsg){
_693=user.awayMsg.replace(/^\<div\>/,"").replace(/\<\/div\>$/,"");
}
}
for(var i=0;i<this.presenceStates.length;i++){
_1.html.removeClass(this.domNode,"imUser-state-"+this.presenceStates[i]);
}
_1.html.addClass(this.domNode,"imUser-state-"+user.state);
var _695={online:Config.Strings.BuddyStatus_Label_Available,invisible:Config.Strings.BuddyStatus_Label_Invisible,idle:Config.Strings.BuddyStatus_Label_Idle,away:"",mobile:Config.Strings.BuddyStatus_Label_Mobile,offline:Config.Strings.BuddyStatus_Label_Offline}[user.state];
var _696=(_693?_1.string.escapeXml(_693):"");
this.presenceDisplay.innerHTML="<span class=\"presenceText\" title=\""+_696+"\" >"+_695+_696+"</span> <img class=\"arrow\" src=\""+Config.SpacerImageURL+"\" />";
for(var i=0;i<this.checkMarkChoices.length;i++){
var item=_1.widget.byId("aimWimMenuItem-"+this.checkMarkChoices[i]);
if(item){
item.setChecked(false);
}
}
var item=null;
if(user.state=="online"||user.state=="invisible"){
item=_1.widget.byId("aimWimMenuItem-"+user.state);
}else{
if(user.state=="away"){
if(Settings.ChatAwayMessage&&_693==Settings.ChatAwayMessage){
item=_1.widget.byId("aimWimMenuItem-custom");
}else{
var _698=ws.im.wim.cannedAwayMessages;
for(var i=0;i<_698.length;i++){
if(_698[i]&&_693==_698[i]){
item=_1.widget.byId("aimWimMenuItem-"+this.makeHtmlId(_698[i]));
break;
}
}
}
}
}
if(item){
item.setChecked(true);
}
this.layout();
},setUserOffline:function(){
_1.html.hide(this.iconNode);
this.nameDisplay.innerHTML=Config.Strings.SignIn;
this.nameDisplay.title=Config.Strings.SignIn;
this.nameDisplay.style.cursor="pointer";
this.presenceDisplay.innerHTML="&nbsp;";
this.destroyPresenceMenu();
this.signOnEnabled=true;
},onNameClick:function(evt){
if(this.signOnEnabled){
ws.im.wim.start();
}
},onKeyCustomMessage:function(evt){
if(evt.keyCode==13){
var _69b=_1.string.trim(this.customMessageInput.value);
ws.im.wim.setState("away",_69b);
Settings.ChatAwayMessage=_69b;
ws.io.rpc({action:"ChatSettings",content:{ChatAwayMessage:_69b},load:_1.lang.hitch(this,function(data){
_1.debug("ChatSettings: "+data.toSource());
}),error:_1.lang.hitch(this,function(){
_1.debug("ChatSettings error");
})});
this.customMessageInput.blur();
this.createPresenceMenu();
}
},showCustomMessageInput:function(){
_1.html.addClass(this.presenceDisplay,"hidden");
_1.html.removeClass(this.customMessageInput,"hidden");
this.customMessageInput.focus();
},hideCustomMessageInput:function(){
this.customMessageInput.value="";
_1.html.addClass(this.customMessageInput,"hidden");
_1.html.removeClass(this.presenceDisplay,"hidden");
},createPresenceMenuItem:function(_69d,_69e,_69f){
var _6a0=_1.widget.createWidget("ws:WSMenuItem",{widgetId:_69d,caption:_1.string.escapeXml(_69e),iconClass:"",checkOnClass:"imUserOnCol",checkOffClass:"imUserOffCol",onClick:_69f});
this.presenceMenu.addChild(_6a0);
return _6a0;
},makeHtmlId:function(_6a1){
return _6a1.toLowerCase().replace(/\s+/,"").replace(/\W+/,"");
},createPresenceMenu:function(){
this.destroyPresenceMenu();
this.presenceMenu=_1.widget.createWidget("ws:WSMenu",{showPresenceMenu:function(evt){
this.open(evt.currentTarget,null,evt.currentTarget);
}});
_1.html.addClass(this.presenceMenu.domNode,"imUserPresenceMenu");
this.createPresenceMenuItem("aimWimMenuItem-online",Config.Strings.BuddyStatus_Label_Available,function(){
ws.im.wim.setState("online");
});
this.presenceMenu.addChild(_1.widget.createWidget("ws:WSMenuSeparator",{}));
var _6a3=ws.im.wim.cannedAwayMessages;
for(var i=0;i<_6a3.length;i++){
if(_6a3[i]){
this.createPresenceMenuItem("aimWimMenuItem-"+this.makeHtmlId(_6a3[i]),_6a3[i],function(){
ws.im.wim.setState("away",this.caption);
});
}
}
this.createPresenceMenuItem("aimWimMenuItem-invisible",Config.Strings.BuddyStatus_Label_Invisible,function(){
ws.im.wim.setState("invisible");
});
if(Settings.ChatAwayMessage.length>0){
this.createPresenceMenuItem("aimWimMenuItem-custom",Settings.ChatAwayMessage,function(){
ws.im.wim.setState("away",Settings.ChatAwayMessage);
});
}
var _6a5=this;
this.createPresenceMenuItem("aimWimMenuItem-customAction",Config.Strings.BuddyStatus_Label_CustomMessage,function(){
_6a5.showCustomMessageInput();
});
this.presenceMenu.addChild(_1.widget.createWidget("ws:WSMenuSeparator",{}));
this.createPresenceMenuItem("aimWimMenuItem-signOut",Config.Strings.SignOut,function(){
ws.im.wim.end();
ws.reporting.reportAction("IM Sign Out");
});
_1.event.connect(this.presenceDisplay,"onclick",this.presenceMenu,"showPresenceMenu");
},destroyPresenceMenu:function(){
if(this.presenceMenu){
}
}});
_1.provide("ws.im.ImPanel");
_1.require("dojo.widget.*");
_1.require("dojo.widget.LayoutContainer");
_1.require("dojo.widget.PageContainer");
_1.require("ws.widget.WSButton");
_1.widget.defineWidget("ws.im.ImPanel",_1.widget.HtmlWidget,{templateString:"<div class=\"imPanel\">\r\n\t<div dojoType=\"dojo:PageContainer\" dojoAttachPoint=\"pageContainer\" style=\"height: 100%; width: 100%;\">\r\n\t\t<div dojoType=\"dojo:ContentPane\" dojoAttachPoint=\"offlinePane\" class=\"offline\">\r\n\t\t\t<img src=\"${spacer}\" class=\"logo\">\r\n\t\t\t<div dojoAttachPoint=\"statusNode\" class=\"status\"><span class=\"statusSmall\">${SignOnStatus_Offline}</span></div>\r\n\t\t\t<div dojoType=\"ws:WSButton\" dojoAttachPoint=\"signOnButton\" vizType=\"Blue\" dojoAttachEvent=\"onClick: onClickSignOn\">${SignIn}</div>\r\n\t\t\t<div dojoAttachPoint=\"errorMsgNode\" class=\"error\"></div>\r\n\t\t\t<div dojoAttachPoint=\"errorCodeNode\" class=\"errorCode\"></div>\r\n\t\t</div>\r\n\t\t<div dojoType=\"dojo:LayoutContainer\" dojoAttachPoint=\"onlinePane\">\r\n\t\t\t<div dojoType=\"ws:ImUser\" layoutAlign=\"top\"></div>\r\n\t\t\t<div dojoType=\"dojo:ContentPane\" layoutAlign=\"top\" dojoAttachPoint=\"buttonsPane\" class=\"buttonsPane\">\r\n\t\t\t\t<div class=\"addBuddyLink\" dojoAttachEvent=\"onClick: addBuddy\">\r\n\t\t\t\t\t<img src=\"${spacer}\" class=\"wsSmallAddButton\">\r\n\t\t\t\t\t<span class=\"wsLink\">${AddBuddy_Title}</span>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"imButton\" dojoAttachEvent=\"onClick: onClickImButton\">IM</div>\r\n\t\t\t</div>\r\n\t\t\t<div dojoType=\"ws:BuddyList\" layoutAlign=\"client\"></div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n",templateCssString:".imPanel {\r\n\theight: 100%;\r\n\twidth: 100%;\r\n\tbackground: #FFFFFF;\r\n}\r\n\r\n.imPanel .offline {\r\n\tpadding-top: 60px;\r\n\ttext-align: center;\r\n}\r\n\r\n.imPanel .offline .logo {\r\n\twidth: 55px;\r\n\theight: 44px;\r\n\tbackground: url(\"${images}aim_logos.gif\") -67px -4px;\r\n\tborder-left: 30px solid #FFFFFF;\r\n}\r\n\r\n.imPanel .offline .status {\r\n\tfont-size: 16px;\r\n\tfont-weight: bold;\t\r\n}\r\n\r\n.imPanel .offline .statusSmall {\r\n\tfont-size: 12px;\r\n\tfont-weight: normal;\r\n}\r\n\r\n.imPanel .offline .statusSmall p {\r\n\ttext-align: left;\r\n\tmargin: 10px;\r\n}\r\n\r\n\r\n.imPanel .offline .statusSmall .buddyName {\r\n\tfont-weight: bold;\t\r\n}\r\n\r\n.imPanel .offline .wsButton {\r\n\tmargin: 10px auto;\r\n}\r\n\r\n.imPanel .errorCode {\r\n\tcolor: gray;\r\n}\r\n\r\n.imPanel .buttonsPane {\r\n\tpadding: 5px;\r\n}\r\n.imPanel .wsSmallAddButton {\r\n\tmargin-bottom: -2px;\t\r\n}\r\n.imPanel .addBuddyLink {\r\n\tfloat: left;\r\n}\r\n.imPanel .imButton {\r\n\tfloat: right;\r\n\tfont-size: 11px;\r\n\tfont-weight: bold;\r\n\ttext-align: center;\r\n\tvertical-align: middle;\r\n\tcolor: #FFFFFF;\r\n\tmin-width: 30px;\r\n\t_width: 30px;\r\n\theight: 16px;\r\n\tbackground: url(\"${images}backgrounds.gif\") -0px -465px repeat-x;\r\n\tcursor: pointer;\r\n}\r\n.imPanel .imButton:hover {\r\n\tbackground-position: 0px -481px;\r\n}\r\n",templateCssPath:_1.uri.moduleUri("ws.im","ImPanel.css"),widgetsInTemplate:true,postCreate:function(args,frag){
ws.im.wim.listeners.push(this);
_1.event.topic.subscribe("aimWimBuddyClicked",this,"openIm");
},onError:function(data){
var _6a9=data.errorMsg;
if(typeof _6a9=="object"){
if(data["action"]&&data.action=="im/sendIM"&&data.statusCode!=450&&data.statusCode!=460){
return;
}
_6a9="";
for(var _6aa in data){
if(_6aa!="params"){
_6a9+=_6aa+": "+data[_6aa]+", ";
}
}
}
ws.html.setInnerText(this.errorMsgNode,Config.Strings.Error_AimGeneric);
ws.html.setInnerText(this.errorCodeNode,_6a9);
switch(data.errorType){
case 1:
this.onSessionEnd();
if(ws.im.wim["user"]&&ws.im.wim.user["aimId"]){
setTimeout(function(){
ws.im.wim.end();
},100);
}
break;
case 5:
case 6:
ws.widget.Dialogs.ok(Config.Strings.UnspecifiedError);
break;
case 9:
case 2:
default:
break;
}
},onAuthCancel:function(){
this.onSessionEnd();
},onConsentCancel:function(){
this.onSessionEnd();
},onConsentInvalidToken:function(){
this.onError("InvalidToken");
},onIm:function(data){
this._addToImDisplay(data.senderAimId,data.message,data.senderAimId,false,data.autoresponse);
},onBuddyListLoad:function(data){
this.pageContainer.selectChild(this.onlinePane);
this.onlinePane.onResized();
if(this._signOnCallback){
this._signOnCallback();
this._signOnCallback=null;
}
},onSessionEnd:function(){
this.statusNode.innerHTML="<span class='statusSmall'><p>"+Config.Strings.SignOnStatus_Offline+"</p></span>";
this.signOnButton.show();
this.pageContainer.selectChild(this.offlinePane);
},onTypingChanged:function(data){
if(this.imGroup){
this.imGroup.typingChanged(data.aimId,data.status);
}
},onClickImButton:function(evt){
this.openIm();
},onPanelSelected:function(){
this._signOnCallback=null;
this.statusNode.innerHTML="<span class='statusSmall'><p>"+Config.Strings.SignOnStatus_Offline+"</p></span>";
ws.html.setInnerText(this.errorMsgNode,"");
ws.html.setInnerText(this.errorCodeNode,"");
},openIm:function(data){
data=data||{};
if(this.isSignedOn()){
this._addToImDisplay(data.aimId,data.message,ws.im.wim.user.displayId,true);
if(data.aimId&&data.message){
ws.im.wim.sendIm(data.aimId,data.message,false);
}
}else{
this.statusNode.innerHTML="<span class=\"statusSmall\"><p>"+Config.Strings.SignOnStatus_Offline_SignInForIm+"</p><p><span class=\"buddyName\">"+data.aimId+"</span></p></span>";
var _6b0=this;
this._signOnCallback=function(){
_6b0.openIm(data);
};
}
},onClickSignOn:function(evt){
this.signOn();
ws.reporting.reportAction("IM Sign In");
},signOn:function(_6b2){
this.statusNode.innerHTML="<img src='"+Config.BaseResourcesURL+"images/progressAnimation.gif' width='12' height='12'> "+Config.Strings.SignOnStatus_Connecting;
ws.html.setInnerText(this.errorMsgNode,"");
ws.html.setInnerText(this.errorCodeNode,"");
this.signOnButton.hide();
ws.im.wim.start();
if(_6b2){
this._signOnCallback=_6b2;
}
},isSignedOn:function(){
return ws.im.wim.user!=null;
},addBuddy:function(){
if(!this.addBuddyCard){
this.addBuddyCard=_1.widget.createWidget("ws:AddBuddyCard",null,_1.body(),"first");
}
this.addBuddyCard.open(this.buttonsPane.domNode,this,null,{"TR":"TR"},null,10);
ws.reporting.reportAction("Add Buddy Win Open");
},_addToImDisplay:function(_6b3,_6b4,_6b5,_6b6,_6b7){
if(!this.imGroup){
this.imGroup=_1.widget.createWidget("ws:ImGroup",null,_1.body(),"first");
}
this.imGroup.addIm(_6b3,_6b4,_6b5,_6b6,_6b7);
}});
_1.kwCompoundRequire({common:["ws.im.AddBuddyCard","ws.im.BuddyList","ws.im.Im","ws.im.ImGroup","ws.im.ImPanel","ws.im.ImUser","ws.im.wim"]});
_1.provide("ws.im.*");
_1.provide("ws.panels.EventPanel");
_1.require("dojo.io.*");
_1.require("dojo.widget.*");
_1.require("dojo.widget.ContentPane");
_1.require("dojo.widget.LayoutContainer");
_1.require("ws.date");
_1.require("ws.widget.ListView");
_1.require("ws.widget.util");
_1.require("ws.widget.WSDatePicker");
_1.declare("DateEventData",null,function(_6b8,date,_6ba){
this.rawDate=rawDate;
this.date=date;
this.dayList=_6ba;
});
_1.declare("EventData",null,function(_6bb,_6bc,_6bd,args,_6bf){
this.eventStartTimeFormatted=_6bb;
this.eventStartTime=_6bc;
this.eventEndTime=_6bd;
this.eventArgs=args;
this.eventWriteable=_6bf;
});
_1.declare("EventInfo",null,function(_6c0,_6c1,_6c2){
this.summary=_6c0;
this.startDate=_6c1;
this.endDate=_6c2;
});
_1.declare("ws.panels.EventGridModel",turbo.data.virtual,function(_6c3,_6c4){
this.model=_6c4;
this.currDate=new Date();
this.dayOfWeekSelected=ws.date.formatDateTime(new Date(),this.dayofWeekFormat);
this.dateSelected=ws.date.formatDateTime(new Date(),this.dateFormat);
this.todaysDate=this.dateSelected;
this.buffer=new turbo.buffer.table();
this.calId=null;
this.loadData();
_1.event.connect(this.model,"modelUpdated",this,"onModelUpdated");
_1.event.connectOnce(this.model,"requestUpdate",_1.lang.hitch(this,function(){
this.loadData();
}));
},{columnNames:new Array(),buffer:turbo.buffer.table,columns:{EventName:0},hasEventsDays:new Array(),hasEventDaysCount:0,bufferLineCount:0,numDays:14,arrayEventLists:new Array(this.numDays),dateFormat:Config.Strings.Panel_EventPanel_DateFormat,timeFormat:Config.Strings.Panel_EventPanel_TimeFormat,dayofWeekFormat:Config.Strings.Panel_EventPanel_DayOfWeekFormat,todaysDate:null,dateSelected:null,dayOfWeekSelected:null,currDate:null,calStartDate:null,calEndDate:null,getCalId:function(){
return this.calId;
},getDefaultEventArgs:function(){
var args={compType:"EVENT",calendars:true,components:true,index:true,dayBucketIndex:true,enums:true,dtstart:null,dtend:null,sortBy:null,sortDir:null};
return args;
},loadData:function(){
_1.debug("Event Panel loadData()");
var args=this.getDefaultEventArgs();
var _6c7=new Date();
this.calStartDate=ws.date.add(_6c7,ws.date.dateParts.MONTH,-3);
this.calEndDate=ws.date.add(_6c7,ws.date.dateParts.MONTH,3);
args.dtstart=ws.date.formatISO8601(this.calStartDate);
args.dtend=ws.date.formatISO8601(this.calEndDate);
this.model.getData(args);
},clearBuffer:function(){
this.buffer.setData(new Array());
this.bufferLineCount=0;
},getBufferLineCount:function(){
return this.bufferLineCount;
},incBufferLineCount:function(){
this.bufferLineCount++;
},getLastDateInViewForFetchRange:function(_6c8){
var d2=ws.date.add(_6c8,ws.date.dateParts.DAY,(0-_6c8.getDay()));
var d3=ws.date.add(d2,ws.date.dateParts.DAY,35);
if(d3.getMonth()!=_6c8.getMonth()){
return d3;
}else{
return ws.date.add(d2,ws.date.dateParts.DAY,42);
}
},setDate:function(_6cb){
_1.debugShallow(_6cb);
if(_6cb<this.calStartDate||_6cb>this.calEndDate){
var _6cc=ws.date.add(_6cb,ws.date.dateParts.MONTH,-3);
var _6cd=ws.date.add(_6cb,ws.date.dateParts.MONTH,3);
this.calStartDate=_6cc;
this.calStartDate.setDate(1);
this.calEndDate=_6cd;
this.calEndDate.setDate(1);
var _6ce=ws.date.getFirstDayInMonthView(this.calStartDate);
var _6cf=this.getLastDateInViewForFetchRange(this.calEndDate);
var args=this.getDefaultEventArgs();
args.dtstart=ws.date.formatISO8601(_6ce);
args.dtend=ws.date.formatISO8601(_6cf);
_1.debugShallow(args);
this.model.getData(args);
}
this.currDate=_6cb;
this.dayOfWeekSelected=ws.date.formatDateTime(new Date(_6cb),this.dayofWeekFormat);
this.dateSelected=ws.date.formatDateTime(new Date(_6cb),this.dateFormat);
this.hasEventsDays=null;
this.hasEventsDays=new Array();
this.hasEventDaysCount=0;
var _6d1=0;
var _6d2=Config.Strings.Panel_EventPanel_DayFormat;
var _6d3=Config.Strings.Panel_EventPanel_MonthFormat;
var _6d4=ws.date.formatDateTime(new Date(this.currDate),_6d3);
var _6d5=ws.date.formatDateTime(new Date(this.currDate),_6d2);
var _6d6=this.model.index;
var _6d7=this.model.components;
var _6d8=this.model.componentEnum;
var _6d9=this.model.calendarEnum;
var _6da=this.model.getCalendarList();
rawDate=this.currDate;
for(var i=0;i<this.numDays;i++){
var date=ws.date.formatDateTime(rawDate,this.dateFormat);
this.arrayEventLists[i]=new DateEventData(rawDate,date,new Array());
rawDate=ws.date.add(rawDate,ws.date.dateParts.DAY,1);
}
var _6dd=this.model.indexEnum;
for(var i=0;i<_6d6.length;i++){
var _6de=_6d6[i];
var _6df=_6de[_6dd.id];
var _6e0=_6d7[_6df];
if(null!==_6e0&&_6e0[_6d8.compType]==0){
var date=null;
var _6e1=null;
var _6e2=null;
var _6e3=null;
var args=this.model.getComponentArgs(_6e0);
if(_6de[_6dd.rid]){
args.rid=_6de[_6dd.rid];
}
var _6e4=this.model.calendars[_6e0[_6d8.calid]][_6d9.writable];
if(args.rid){
args.start=_6de[this.model.indexEnum.start];
args.end=_6de[this.model.indexEnum.end];
if(_6e0[this.model.componentEnum.recurEnd]){
args.recurEnd=_6e0[this.model.componentEnum.recurEnd];
}
date=new Date(_6de[this.model.indexEnum.start]);
var _6e1=ws.date.formatDateTime(date,this.dateFormat);
var _6e2=ws.date.formatDateTime(date,this.timeFormat);
var _6e5=ws.date.formatDateTime(date,_6d2);
var _6e6=ws.date.formatDateTime(date,_6d3);
if(_6e6==_6d4&&_6d1!=_6e5&&_6e5>_6d1){
_6d1=_6e5;
this.hasEventsDays[this.hasEventDaysCount++]=_6e5;
}
}else{
date=new Date(_6e0[_6d8.start]);
_6e1=ws.date.formatDateTime(date,this.dateFormat);
_6e2=ws.date.formatDateTime(date,this.timeFormat);
_6e3=_6e0[_6d8.end];
args.start=_6e0[_6d8.start];
args.end=_6e0[_6d8.end];
var _6e5=ws.date.formatDateTime(date,_6d2);
var _6e6=ws.date.formatDateTime(date,_6d3);
if(_6e6==_6d4&&_6d1!=_6e5&&_6e5>_6d1){
_6d1=_6e5;
this.hasEventsDays[this.hasEventDaysCount++]=_6e5;
}
}
var _6e7=new EventData(_6e2,_6e0[_6d8.start],_6e3,args,_6e4);
for(var j=0;j<this.numDays;j++){
if(_6e1==this.arrayEventLists[j].date){
this.arrayEventLists[j].dayList.push(_6e7);
break;
}
}
}
}
this.eventGridModelUpdated();
},onModelUpdated:function(){
_1.debug("onModelUpdated");
this.setDate(this.currDate);
},eventGridModelUpdated:function(){
},get:function(row,col){
if(this.getRowCount()!=0){
return this.buffer.get(row,col);
}else{
return new Array("No events");
}
},getRowCount:function(){
return this.buffer.getRowCount();
},getColCount:function(){
return this.buffer.getColCount();
},getDispBuffer:function(){
return this.buffer;
},getRawDate:function(i){
return this.arrayEventLists[i-1].rawDate;
},getDate:function(i){
return this.arrayEventLists[i-1].date;
},getDataListElement:function(i,j){
return this.arrayEventLists[i-1].dayList[j];
},getCounter:function(i){
return this.arrayEventLists[i-1].dayList.length;
}});
_1.widget.defineWidget("ws.panels.EventPanel",ws.widget.ListView,{templateString:"<div style=\"height: 100%;\">\r\n    <div class=\"listView eventPanel\" dojoType=\"dojo:LayoutContainer\" dojoAttachPoint=\"layoutWidget\">\r\n\t    <div dojoType=\"dojo:ContentPane\" layoutAlign=\"top\">\r\n\t        <div dojoType=\"ws:EventDatePicker\" widgetId=\"DatePicker\" dojoAttachPoint=\"DatePickerNode\" dojoAttachEvent=\"updateUI: refreshView\"></div> \r\n\t        <div id=\"addEventTag\" class=\"addEvent\" dojoAttachEvent=\"onClick: addEvent\" dojoAttachPoint=\"AddEventButtonNode\">\r\n\t\t\t\t    <img src=\"${spacer}\" class=\"icon\">\r\n\t\t\t\t    <span class=\"wsLink\">${Panel_EventPanel_AddEvent}</span>\r\n\t\t    </div>\r\n        </div> \r\n        <div dojoAttachPoint=\"grid\" dojoType=\"TurboDataGrid\" layoutAlign=\"client\" defaultLeftWidth=\"0\"></div>\r\n    </div>\r\n</div>\r\n",templateCssString:"body .eventPanel .turbogrid-scrollbox {\r\n\tborder-top: none;\r\n}\r\n\r\n.eventPanel input {\r\n\tfont: normal 11px verdana;\r\n\tvertical-align: middle;\r\n\tborder: solid 1px #85817c;\r\n\tpadding: 2px 2px 2px 6px;\r\n\tmargin: 3px;\r\n}\r\n\r\n.eventPanel input.default {\r\n\tcolor: #a5a5a5;\r\n}\r\n\r\n.eventPanel .addEvent {\r\n\tcursor: pointer;\r\n\tmargin-top: 3px;\r\n\ttext-align: left;\r\n}\r\n\r\n.eventPanel .addEvent .icon {\r\n\twidth: 12px;\r\n\theight: 12px;\r\n\tbackground: url(\"${images}main.gif\") -1260px -1px;\r\n\tmargin: 3px 0px 0px 3px;\r\n\tpadding-top: 2px;\r\n}\r\n\r\n.eventPanel .addEvent .icon:hover {\r\n\tbackground-position: -1275px -1px;\r\n}\r\n\r\n.eventPanel .wsLink  {\r\n\tposition: relative;\r\n\ttop: -3px;\r\n}\r\n\r\n.eventPanel .turbogrid-row {\r\n\tposition: relative;\r\n\toverflow: hidden;\r\n\tborder-left: 1px solid #F5F4EB;\r\n\twhite-space: nowrap;\r\n\theight: 15px;\r\n}\r\n",templateCssPath:_1.uri.dojoUri("../ws/panels/EventPanel.css"),widgetsInTemplate:true,wrapperModelClass:ws.panels.EventGridModel,speedUp:false,addEventInputDefaultValue:Config.Strings.AddEventName,selectedDate:null,eventsToMark:new Array(),DateRowsDisplayed:0,dateStylingStart_:"<span style=\"font-size:12px; font-family:Arial;\" id=\"",dateStylingStart2_:"\"",dateStylingStart3_:">",dateStylingStart:"<span style=\"color: #0066CC;font-size:12px; font-family:Arial;\">",dateStylingEnd:"&nbsp;&nbsp; </span>",moreLinkStart:"<a href=\"#\" id=\"moreData-",moreLinkEnd:"\">"+Config.Strings.Panel_EventPanel_More+"</a>",strHeading:"<span style=\"font-size:12px; font-weight:bold; font-family:Arial;\">",strHeadingEnd:"&nbsp;&nbsp; </span>",strEventStyle:"<span style=\"color: #0066CC; font-family:Arial;\" id=\"",strEventStyle2_:"\"",strEventStyle3_:">",strEventStyleEnd:"</span>",initView:function(){
this.selectedDate=new Date();
this.columns=[[turbo.grid.format.text,{align:"left",canResize:false,sortable:false}]];
this.autosizeColumnIndex=this.gridModel.columns.EventName;
this.rowHeight=20;
ws.panels.EventPanel.superclass.initView.apply(this,arguments);
this.disableHover=true;
_1.event.connect(this.gridModel,"eventGridModelUpdated",this,"modelUpdated");
_1.event.connect(this.DatePickerNode,"selectDateConnect",this,"dateSelectionChanged");
_1.html.hide(this.grid.headerNode);
this.DatePickerNode.domNode.style.border="1px solid #CCCCCC";
this.grid.docontextmenu=_1.lang.hitch(this,"onContextMenu");
},modelUpdated:function(){
_1.debug("EventPanel: modelUpdated");
this.formatRawDataToView();
},refreshView:function(){
var rows=this.DatePickerNode.getNumRows();
_1.debug("curr Num rows = "+rows+"last num of rows = "+this.DateRowsDisplayed);
if(this.DateRowsDisplayed!=rows){
_1.debug("Datepicker resized");
this.layoutWidget.onResized();
this.DateRowsDisplayed=rows;
}
},getUpcomingEventsOnLabel:function(_6f1,_6f2){
var _6f3=_6f1;
var _6f4=ws.date.add(_6f1,ws.date.dateParts.DAY,_6f2-1);
var _6f5=ws.date.formatDateTime(_6f3,Config.Strings.Panel_EventPanel_MonthDateFormat);
var _6f6=ws.date.formatDateTime(_6f4,Config.Strings.Panel_EventPanel_MonthDateFormat);
var _6f7=ws.string.substituteParams("{0}: {1} - {2}",Config.Strings.Panel_EventLabel,_6f5,_6f6);
return _6f7;
},handleReFormat:function(date,item){
var _6fa=0;
var _6fb=this.gridModel;
_6fb.clearBuffer();
var _6fc=this.getUpcomingEventsOnLabel(_6fb.currDate,_6fb.numDays);
var _6fd=this.strHeading+_6fc+this.strHeadingEnd;
_6fb.buffer.setRow(new Array(_6fd),_6fb.bufferLineCount++);
var _6fe=null;
if(_6fb.dateSelected==_6fb.todaysDate){
_6fe=Config.Strings.Panel_EventPanel_Today;
}else{
_6fe=_6fb.dayOfWeekSelected;
}
_6fe+="&nbsp;&nbsp;"+_6fb.dateSelected;
_6ff=this.strHeading+_6fe+this.strHeadingEnd;
_6fb.buffer.setRow(new Array(_6ff),_6fb.bufferLineCount++);
if(_6fb.getCounter(1)!=0){
var _700=0;
if(date!=1){
_700=_6fb.getCounter(1)>10?10:_6fb.getCounter(1);
}else{
_700=_6fb.getCounter(1);
}
_1.debug("limit for 1 is : "+_700);
for(var i=0;i<_700;i++){
var _6ff=this.setEventStr(1,i,_6fb.getDataListElement(1,i).eventStartTimeFormatted,_6fb.getDataListElement(1,i).eventArgs.summary,_6fb.getDataListElement(1,i).eventArgs.allDay);
_6fb.buffer.setRow(new Array(_6ff),_6fb.bufferLineCount++);
_6fa++;
}
if(_700==10){
var _702=this.setMoreLinkStr(1,i);
_6fb.buffer.setRow(new Array(_702),_6fb.bufferLineCount++);
}
}else{
var _6ff=this.dateStylingStart+Config.Strings.Panel_EventPanel_NoEvents+this.dateStylingEnd;
_6fb.buffer.setRow(new Array(_6ff),_6fb.bufferLineCount++);
}
if((_6fb.getCounter(2)!=0)&&(_6fa<25)){
var _700=0;
if(date!=2){
_700=_6fb.getCounter(2)>5?5:_6fb.getCounter(2);
}else{
_700=_6fb.getCounter(2);
}
if(date!=2&&_6fa+_700>25){
var temp=_6fa+_700;
max=Math.max(temp,25);
min=Math.min(temp,25);
_700=max-min;
}
if(_700>0){
var day2=ws.date.formatDateTime(new Date(_6fb.getRawDate(2)),_6fb.dayofWeekFormat);
var _6fe=null;
var _6ff=null;
if(_6fb.dateSelected==_6fb.todaysDate){
_6ff=Config.Strings.Panel_EventPanel_Tomorrow;
}else{
_6ff=day2;
}
var _705=this.strHeading+_6ff+"&nbsp;&nbsp;"+_6fb.getDate(2)+this.strHeadingEnd;
_6fb.buffer.setRow(new Array(_705),_6fb.bufferLineCount++);
for(var i=0;i<_700;i++){
var _6ff=this.setEventStr(2,i,_6fb.getDataListElement(2,i).eventStartTimeFormatted,_6fb.getDataListElement(2,i).eventArgs.summary,_6fb.getDataListElement(2,i).eventArgs.allDay);
_6fb.buffer.setRow(new Array(_6ff),_6fb.bufferLineCount++);
_6fa++;
}
if(_700<_6fb.getCounter(2)){
var _702=this.setMoreLinkStr(2,i);
_6fb.buffer.setRow(new Array(_702),_6fb.bufferLineCount++);
}
}
}
for(var j=3;j<=14;j++){
if(_6fa>=25){
break;
}
if(_6fb.getCounter(j)!=0){
var _700=0;
if(date!=j){
_700=_6fb.getCounter(j)>5?5:_6fb.getCounter(j);
}else{
_700=_6fb.getCounter(j);
}
if(date!=j&&_6fa+_700>25){
var temp=_6fa+_700;
max=Math.max(temp,25);
min=Math.min(temp,25);
_700=max-min;
}
if(_700>0){
var day=null;
if(_6fb.dateSelected==_6fb.todaysDate&&j<7){
day=ws.string.substituteParams(Config.Strings.Panel_EventPanel_InDays,(j-1));
}else{
day=ws.date.formatDateTime(new Date(_6fb.getRawDate(j)),_6fb.dayofWeekFormat);
}
var _705=this.strHeading+day+"&nbsp;&nbsp;"+_6fb.getDate(j)+this.strHeadingEnd;
_6fb.buffer.setRow(new Array(_705),_6fb.bufferLineCount++);
for(var m=0;m<_700;m++){
var _709=new EventData(null,null);
_709=_6fb.getDataListElement(j,m);
var _6ff=this.setEventStr(j,m,_709.eventStartTimeFormatted,_709.eventArgs.summary,_709.eventArgs.allDay);
_6fb.buffer.setRow(new Array(_6ff),_6fb.bufferLineCount++);
_6fa++;
}
if(_700<_6fb.getCounter(j)){
var _702=this.setMoreLinkStr(j,m);
_6fb.buffer.setRow(new Array(_702),_6fb.bufferLineCount++);
}
}
}
}
_6fb.modelUpdated();
},setEventStr:function(row,col,date,_70d,_70e){
if(_70e==true){
date=Config.Strings.AllDay;
}
var _70f=_1.string.escapeXml(_70d||"");
var _710=this.gridModel;
var _711=this.dateStylingStart_+row+"-"+col+this.dateStylingStart2_+"title=\""+_70f+"\""+this.dateStylingStart3_+date+this.dateStylingEnd+this.strEventStyle+row+"-"+col+this.strEventStyle2_+"title=\""+_70f+"\""+this.strEventStyle3_+_70f+this.strEventStyleEnd;
return _711;
},setMoreLinkStr:function(row,col){
var more=this.moreLinkStart+row+"-"+col+this.moreLinkEnd;
return more;
},formatRawDataToView:function(){
_1.debug("formatRawDataToView");
var _715=0;
var _716=this.gridModel;
_716.clearBuffer();
var _717=this.getUpcomingEventsOnLabel(_716.currDate,_716.numDays);
var _718=this.strHeading+_717+this.strHeadingEnd;
_716.buffer.setRow(new Array(_718),_716.bufferLineCount++);
var _719=null;
if(_716.dateSelected==_716.todaysDate){
_719=Config.Strings.Panel_EventPanel_Today;
}else{
_719=_716.dayOfWeekSelected;
}
_719+="&nbsp;&nbsp;"+_716.dateSelected;
_71a=this.strHeading+_719+this.strHeadingEnd;
_716.buffer.setRow(new Array(_71a),_716.bufferLineCount++);
if(_716.getCounter(1)!=0){
var _71b=_716.getCounter(1)>10?10:_716.getCounter(1);
_1.debug("limit is : "+_71b);
for(var i=0;i<_71b;i++){
var _71a=this.setEventStr(1,i,_716.getDataListElement(1,i).eventStartTimeFormatted,_716.getDataListElement(1,i).eventArgs.summary,_716.getDataListElement(1,i).eventArgs.allDay);
_716.buffer.setRow(new Array(_71a),_716.bufferLineCount++);
_715++;
}
if(_71b==10){
var _71d=this.setMoreLinkStr(1,i);
_716.buffer.setRow(new Array(_71d),_716.bufferLineCount++);
}
}else{
var _71a=this.dateStylingStart+Config.Strings.Panel_EventPanel_NoEvents+this.dateStylingEnd;
_716.buffer.setRow(new Array(_71a),_716.bufferLineCount++);
}
if(_716.getCounter(2)!=0){
var day2=ws.date.formatDateTime(new Date(_716.getRawDate(2)),_716.dayofWeekFormat);
var day=null;
if(_716.dateSelected==_716.todaysDate){
day=Config.Strings.Panel_EventPanel_Tomorrow;
}else{
day=day2;
}
var _720=this.strHeading+day+"&nbsp;&nbsp;"+_716.getDate(2)+this.strHeadingEnd;
_716.buffer.setRow(new Array(_720),_716.bufferLineCount++);
var _71b=_716.getCounter(2)>5?5:_716.getCounter(2);
for(var i=0;i<_71b;i++){
var _71a=this.setEventStr(2,i,_716.getDataListElement(2,i).eventStartTimeFormatted,_716.getDataListElement(2,i).eventArgs.summary,_716.getDataListElement(2,i).eventArgs.allDay);
_716.buffer.setRow(new Array(_71a),_716.bufferLineCount++);
_715++;
}
if(_71b==5){
var _71d=this.setMoreLinkStr(2,i);
_716.buffer.setRow(new Array(_71d),_716.bufferLineCount++);
}
}
for(var j=3;j<=14;j++){
if(_715>=25){
break;
}
if(_716.getCounter(j)!=0){
var day=null;
if(_716.dateSelected==_716.todaysDate&&j<7){
day=ws.string.substituteParams(Config.Strings.Panel_EventPanel_InDays,(j-1));
}else{
day=ws.date.formatDateTime(new Date(_716.getRawDate(j)),_716.dayofWeekFormat);
}
var _720=this.strHeading+day+"&nbsp;&nbsp;"+_716.getDate(j)+this.strHeadingEnd;
_716.buffer.setRow(new Array(_720),_716.bufferLineCount++);
var _71b=_716.getCounter(j)>5?5:_716.getCounter(j);
if(_715+_71b>25){
var temp=_715+_71b;
_71b=25-(_715+_71b);
}
for(var m=0;m<_71b;m++){
var _724=new EventData(null,null);
_724=_716.getDataListElement(j,m);
var _71a=this.setEventStr(j,m,_724.eventStartTimeFormatted,_724.eventArgs.summary,_724.eventArgs.allDay);
_716.buffer.setRow(new Array(_71a),_716.bufferLineCount++);
_715++;
}
if(_71b==5){
var _71d=this.setMoreLinkStr(j,m);
_716.buffer.setRow(new Array(_71d),_716.bufferLineCount++);
}
}
}
_716.modelUpdated();
this.DatePickerNode.setEventDates(this.getMarkedEvents());
this.DatePickerNode.listenerUpdateUI();
},getMarkedEvents:function(){
this.eventsToMark=new Array();
if(this.gridModel.hasEventDaysCount){
this.eventsToMark=this.gridModel.hasEventsDays;
}
return this.eventsToMark;
},postCreate:function(){
var _725=new ws.calendar.CalendarViewModel();
this.setModel(_725);
this.DatePickerNode.setModel(this.gridModel);
},dateSelectionChanged:function(_726){
_1.debug("dateSelectionChanged: "+_726);
this.selectedDate=_726;
this.gridModel.setDate(_726);
this.formatRawDataToView();
this.DatePickerNode.setEventDates(this.getMarkedEvents());
this.DatePickerNode.updateUI();
},handleCellClick:function(e){
var _728=this.gridModel.getRow(e.rowIndex);
_1.debug("eid:"+e.target.id);
var id=e.target.id;
var _72a=id.split("-");
_1.debug("indices.length "+_72a.length);
if(_72a.length==2){
mappedDate=this.gridModel.getRawDate(_72a[0]);
mappedData=this.gridModel.getDataListElement(_72a[0],_72a[1]);
var args=new Object();
args=mappedData.eventArgs;
args.index=true;
this.viewEvent(args,mappedData.eventWriteable,this.grid.rowNodes[e.rowIndex]);
}else{
if(_72a.length==3){
_1.debug("more data to come..."+_72a[0]+","+_72a[1]+","+_72a[2]);
this.handleReFormat(_72a[1],_72a[2]);
}else{
_1.debug("no action reqd");
}
}
},addEvent:function(){
_1.debug("addEvent:Model");
ws.WebSuite.getQuickAddWidget(_1.lang.hitch(this,function(){
ws.WebSuite.quickAddWidget.setModel(this.model);
ws.WebSuite.quickAddWidget.initAndShow(this.AddEventButtonNode,{"TL":"TL"},padding,index);
}));
padding=0;
index=true;
ws.reporting.reportAction("Add Event - Full");
},viewEvent:function(args,_72d,_72e){
ws.WebSuite.getEventQuickViewWidget(_1.lang.hitch(this,function(){
ws.WebSuite.eventQuickViewWidget.setModel(this.model);
ws.WebSuite.eventQuickViewWidget.initializeView(args,_72d,_72e,{"TR":"TR"});
}));
ws.reporting.reportAction("Event Quick View");
},editEvent:function(){
ws.WebSuite.getAddEditWidget(_1.lang.hitch(this,function(){
ws.WebSuite.addEditDialog.setModel(this.model);
ws.WebSuite.addEditDialog.show(1,this.rightClickMenu.eventData);
}));
ws.reporting.reportAction("Edit Event");
},viewEventFromMenu:function(evt){
evt.stopPropagation();
this.rightClickMenu.closeAll(true);
if(this.rightClickMenu.writable){
this.editEvent();
}else{
this.viewEvent(this.rightClickMenu.eventData,this.rightClickMenu.writable,this.rightClickMenu.div);
}
},addEventFromMenu:function(evt){
evt.stopPropagation();
this.rightClickMenu.closeAll(true);
this.addEvent();
},promptConfirmDelete:function(){
var _731=this.rightClickMenu.eventData;
if(_731.rid&&_731.rid.length>0){
ws.calendar.ConfirmRecurDialog.display(false,ws.lang.hitch(this,function(ok,_733){
if(ok){
this.deleteEvent(_731,_733);
}
}));
}else{
ws.widget.OkCancelDialog.alert(Config.Strings.RegEventMsg,ws.lang.hitch(this,function(ok){
if(ok){
this.deleteEvent(_731);
}
}),true);
}
},deleteEvent:function(_735,_736){
var args=this.model.getDefaultComponentArgs(false);
args.id=_735.id;
if(_735.rid){
args.rid=_735.rid;
}
args.index=true;
if(!_736){
_736="CHANGE_CURRENT";
}
args.recurChangeMode=_736;
args.loadCallback=_1.lang.hitch(this,function(){
_1.event.topic.publish("WSFeedbackStart",Config.Strings.EventDeleted,true);
});
this.model.deleteEvents(args);
},onContextMenu:function(evt){
var _739=this.gridModel.getRow(evt.rowIndex);
var id=evt.target.id;
var _73b=id.split("-");
if(_73b.length==2){
var _73c=this.getRightClickMenu();
if(_73c.isShowingNow){
_73c.close();
}
mappedDate=this.gridModel.getRawDate(_73b[0]);
mappedData=this.gridModel.getDataListElement(_73b[0],_73b[1]);
var args=new Object();
args=mappedData.eventArgs;
args.index=true;
this.rightClickMenu.model=this.model;
this.rightClickMenu.eventData=args;
this.rightClickMenu.writable=mappedData.eventWriteable;
this.rightClickMenu.div=this.grid.rowNodes[evt.rowIndex];
this.rightClickMenu.children[0].setDisabled(!this.rightClickMenu.writable);
this.rightClickMenu.children[2].setDisabled(!this.rightClickMenu.writable);
_73c.open(evt.pageX,evt.pageY,null,[]);
}
evt.preventDefault();
evt.stopPropagation();
},getRightClickMenu:function(){
if(!this.rightClickMenu){
var _73e=[{caption:Config.Strings.Edit,onClick:ws.lang.hitch(this,"editEvent")},{caption:Config.Strings.Details,_onClick:ws.lang.hitch(this,"viewEventFromMenu")},{caption:Config.Strings.Delete,onClick:ws.lang.hitch(this,"promptConfirmDelete")},{separator:true},{caption:Config.Strings.NewEventBtn,_onClick:ws.lang.hitch(this,"addEventFromMenu")}];
this.rightClickMenu=ws.widget.createMenu(_73e);
}
return this.rightClickMenu;
}});
_1.widget.defineWidget("ws.panels.EventDatePicker",ws.widget.WSDatePicker,{model:null,datesToMark:new Array(),fillInTemplate:function(_73f,_740){
ws.panels.EventDatePicker.superclass.fillInTemplate.apply(this,arguments);
},setModel:function(_741){
_1.debug("datepicker:setmodel");
this.model=_741;
},setEventDates:function(_742){
this.datesToMark=new Array();
this.datesToMark=_742;
_1.debug("datePicker:setEventDates"+this.datesToMark);
},postCreate:function(){
_1.event.connect(this,"updateUI",this,"listenerUpdateUI");
_1.event.connect(this,"incrementMonth",this,"setSelectedDate");
_1.event.connect(this,"decrementMonth",this,"setSelectedDate");
ws.panels.EventDatePicker.superclass.postCreate.apply(this,arguments);
},setSelectedDate:function(){
_1.debug("setSelectedDate:"+this.selectedDate);
var _743=Config.Strings.Panel_EventPanel_DayFormat;
var _744=Config.Strings.Panel_EventPanel_MonthFormat;
var date=ws.date.formatDateTime(new Date(this.selectedDate),_743);
var _746=ws.date.formatDateTime(new Date(this.selectedDate),_744);
if(date=="31"&&_746=="03"){
_1.debug("its feb");
date="28";
}else{
if(date=="30"){
}
}
_1.debug(" date: "+date+" month:"+_746);
if(this.selectedDate==ws.date.getLastDayInMonthView(this.displayDate)){
_1.debug("last day: "+date);
}else{
this.selectedDate=this.displayDate;
this.setDate(this.displayDate);
this.selectDateConnect(this.selectedDate);
}
},listenerUpdateUI:function(){
if(this.datesToMark.length<=0){
return;
}
var _747=new Object();
for(var i=0;i<this.datesToMark.length;i++){
var key=this.datesToMark[i];
if(key[0]=="0"){
key=key.substring(1);
}
_747[key]=1;
}
ws.panels.EventDatePicker.superclass.updateUI.call(this,_747);
}});
_1.provide("ws.panels.FeedPanel");
_1.require("dojo.dom");
_1.require("dojo.event.*");
_1.require("dojo.widget.*");
_1.require("dojo.io.*");
_1.widget.defineWidget("ws.panels.FeedPanel",_1.widget.HtmlWidget,{templateString:"<div class=\"feedPanel\">\r\n\t<div align=right dojoattachpoint=\"feedTitle\" class=\"feedTitle\"></div>\r\n\t<div dojoattachpoint=\"feedData\" class=\"feedData\"></div>\r\n\t<div align=left class=\"feedMore\"><a dojoattachpoint=\"feedMore\" href=\"#\" target=\"_blank\">More headlines</a></div>\r\n</div>\r\n",templateCssString:".feedPanel\r\n{\r\n\tbackground-color: #ffffff;\r\n\tcolor: #0066cc;\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\toverflow: auto;\r\n\tfont: normal 12px Arial;\r\n\ttext-align: left;\r\n}\r\n\r\n.feedTitle\r\n{\r\n\tpadding: 8px 0px 8px 15px;\r\n\toverflow: hidden;\r\n}\r\n\r\n.feedData\r\n{\r\n\tcolor: #331122;\r\n\tpadding-left: 5px;\r\n\tpadding-right: 5px;\r\n}\r\n\r\n.feedData img\r\n{\r\n\tpadding: 2px;\r\n}\r\n\r\n.feedPanel a\r\n{\r\n\ttext-decoration: none;\r\n\tcolor: #0066cc;\r\n}\r\n\r\n.feedPanel a:hover\r\n{\r\n\tcolor: #0066cc;\r\n\ttext-decoration: underline;\r\n}\r\n\r\n.feedSeparator\r\n{\r\n\theight: 0px;\r\n\twidth: 95%;\r\n\tborder-top: dotted 1px #cccccc;\r\n\tmargin: 5px 0px 5px 0px;\r\n}\r\n\r\n.feedMore\r\n{\r\n\tpadding-left: 5px;\r\n\tfont-weight: bold;\r\n}\r\n\r\n",templateCssPath:_1.uri.dojoUri("../ws/panels/FeedPanel.css"),feedUrl:Config.BasePagesURL+"common/proxy.aspx/tmzFeed",maxItems:8,widgetsInTemplate:true,loadFeed:function(){
_1.io.bind({url:this.feedUrl,mimetype:"text/xml",load:_1.lang.hitch(this,function(type,data,evt){
try{
var _74d=data.getElementsByTagName("channel")[0];
var _74e=this.getDomNodeText(_74d.getElementsByTagName("copyright")[0]);
}
catch(e){
_1.debug("Feed Panel - channelNode is Undefined");
}
try{
var _74f=_74d.getElementsByTagName("image")[0];
if(_74f){
var _750=this.getDomNodeText(_74f.getElementsByTagName("url")[0]);
var _751=this.getDomNodeText(_74f.getElementsByTagName("link")[0]);
if(_750&&_751){
this.feedTitle.innerHTML="<div align=center><a target='itemWindow' href='"+_751+"'><img border=0 src='"+_750+"'></a></div>";
this.feedMore.href=_751;
}
}
}
catch(e){
_1.debug("Feed Panel - imageNode is Undefined");
_1.html.hide(this.feedTitle);
_1.html.hide(this.feedMore);
}
var _752="";
var _753=data.getElementsByTagName("item");
for(var i=0;i<_753.length&&i<this.maxItems;i++){
var _755=_753[i].getElementsByTagName((_1.render.html.ie?"media:thumbnail":"thumbnail"))[0];
if(_755){
var _756=_755.attributes.getNamedItem("url").value;
var _757=this.getDomNodeText(_753[i].getElementsByTagName("link")[0]);
_752+="<div align=center><a target='itemWindow' href='"+_757+"'><img border=0 src='"+_756+"'></a></div>";
}else{
var _758=this.getDomNodeText(_753[i].getElementsByTagName("title")[0]);
var _757=this.getDomNodeText(_753[i].getElementsByTagName("link")[0]);
_752+="<div><a target='itemWindow' href='"+_757+"'>"+_758+"</a></div>";
_752+="<div class='feedSeparator'><hr style='display:none'></div>";
}
}
this.feedData.innerHTML=_1.string.isBlank(_752)?ws.string.substituteParams(Config.Strings.PanelNotAvailable,"<br><br>"):_752;
}),error:_1.lang.hitch(this,function(type,_75a){
this.feedData.innerHTML=_75a;
})});
},publishFeed:function(){
},onShow:function(){
ws.panels.FeedPanel.superclass.onShow.apply(this,arguments);
this.loadFeed();
},initialize:function(){
},getDomNodeText:function(node){
return (node?node.firstChild.nodeValue:"");
}});
_1.kwCompoundRequire({common:["ws.panels.EventPanel","ws.panels.FeedPanel","ws.panels.TaskPanel","ws.panels.TaskPanelEditDetailCard","ws.panels.TaskPanelMoreDetailCard"]});
_1.provide("ws.panels.*");
}});
