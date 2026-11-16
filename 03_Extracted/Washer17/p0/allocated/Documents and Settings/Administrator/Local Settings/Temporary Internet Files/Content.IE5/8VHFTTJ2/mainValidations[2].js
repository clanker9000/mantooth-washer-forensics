/* cssBtnFunctions start*/
var c;
function artzOvr(e){e = e ? e : event; var o = e.target ? e.target : e.srcElement; c = o.className; o.className = c + " " + c + "Hov";}
function artzOff(e){e = e ? e : event; var o = e.target ? e.target : e.srcElement; o.className = c;}
function artzClk(e){e = e ? e : event; var o = e.target ? e.target : e.srcElement; o.className = c + " " + c + "Act";}

function init() {
	attachEvents("input");
	attachEvents("button");
}

function attachEvents(elem) {
	var btns = document.getElementsByTagName(elem);
	for (var i=btns.length-1; i>=0; i--) {
		var btn = btns[i];
		if(elem != "input" || (btn.type == "submit" || btn.type == "button")) {
			btn.onmouseover = artzOvr;
			btn.onmouseout  = artzOff;
			btn.onmousedown = artzClk;
			btn.onmouseup   = artzOff;
		}
	}
}
window.onload = init;
/* cssBtnFunctions end*/

function RetVal(){
}
RetVal.SUCCESS=0; RetVal.EMPTY_ERR=1; RetVal.MIN_ERR=2; RetVal.MAX_ERR=3; RetVal.INVALID_ERR=4; RetVal.ICQ_INVALID_ERR=5;RetVal.FORMAT_ERR=6;

//function User(){
//}
//User.SNONLY=0;User.ONSONLY=1;User.ALL=2;

function prereqchecks(badBrowserUrl){
	var param="&badBrowser=1";
	var agt=navigator.userAgent.toLowerCase();
	var is_mac = (agt.indexOf("mac") != -1);
	var is_os9=(agt.indexOf("mac_ppc") !=-1);
	if (navigator.appName=="Netscape" && parseInt(navigator.appVersion) <=3 && is_mac==false){ handleUrl(badBrowserUrl+param);}
	if (navigator.appName=="Microsoft Internet Explorer" && parseInt(navigator.appVersion) <=3){handleUrl(badBrowserUrl+param);}
	if (is_mac && parseInt(navigator.appVersion) ==4 && is_os9){ handleUrl(badBrowserUrl+param);}
	var exp = new Date(); 
	exp.setTime(exp.getTime() + 1800000); 
 	setCookie("cookies", "cookies", exp, false, false, false); 
 	if (document.cookie.indexOf('cookies') == -1) { handleUrl(badBrowserUrl);}
 	exp = new Date(); 
 	exp.setTime(exp.getTime() - 1800000); 
	setCookie("cookies", "cookies", exp, false, false, false); 
}

function setCookie(name, value, expires, path, domain, secure) {
 var curCookie = name + "=" + escape(value) + 
        ((expires) ? "; expires=" + expires.toGMTString() : "") + 
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
 document.cookie = curCookie; 
}

function trimString(sStr){
 return sStr.replace(/^\s+/gi,"").replace(/\s+$/gi,"");
}

function validateSN(sn) {

 var numericRegExp = /^[0-9]*$/;

	
 if(sn.length < 1) {
  return RetVal.EMPTY_ERR;
 }
	
 else if(sn.length <3 ) {	
  return RetVal.MIN_ERR;
 }
 
 else if(sn.length > 16) {
  return RetVal.MAX_ERR;
 }

 else if( numericRegExp.test(sn) && (sn.length<5 || sn.length>10) ) { 
  //ICQ UIN <=4 or >=11 is invalid
  return RetVal.ICQ_INVALID_ERR;
 }else if (numericRegExp.test(sn)){
   return   RetVal.SUCCESS;
  }
 else {	
  var snRegExp = /^([a-zA-Z]{1})([a-zA-Z0-9\s]*)$/;  
  var result = (snRegExp.test(sn))?  RetVal.SUCCESS :  RetVal.INVALID_ERR; 
  return result;
 }   
}

function valPassword(pwd,minLength){	
	if(pwd.length < 1){ return  RetVal.EMPTY_ERR; }
	else if(pwd.length < minLength ){ return RetVal.MIN_ERR;}
	else if( pwd.length > 16){ return RetVal.MAX_ERR;}
	else{ return RetVal.SUCCESS;}
}

function validateEmail(emailAddr){	
	if(emailAddr.length <1){return RetVal.EMPTY_ERR;}
	else if(emailAddr.length <3 ){return RetVal.MIN_ERR;}
	else if( emailAddr.length >97){return RetVal.MAX_ERR;}
	else{ 					
			var validRegExp = /^([a-zA-Z0-9]{1}[\w\-\/&\*\+~%$!=\?#'\^\`{}|]*)(\.[\w\-\/&\*\+~%$!=\?#'\^`{}|]+)*@([\w\-\/&\*\+~%$!=\?#'\^`{}|]+)((\.[\w\-\/&\*\+~%$!=?#'\^`{}|]+)+)$/;
			var result=(validRegExp.test(emailAddr)) ? RetVal.SUCCESS : RetVal.INVALID_ERR ;	
			return result;		
	}	
}

function validateLoginId(loginId){
	var regExp = /@/;		
	var result= regExp.test(loginId) ? validateEmail(loginId) : validateSN(loginId);	
	return result;
}

function snsInfoPopUp(mode, pathOrTitleString, bodyString) {
	var newUrl;    
    var pattern = /\?/;
    var adjustedPathOrTitleString = pathOrTitleString.replace(pattern,"&");	
	if (mode==0) {  newUrl = "/help/infoPopUp.psp?title=" + adjustedPathOrTitleString + "&body=" + bodyString;}
	else if (mode==1) { newUrl=pathOrTitleString;}
	else { return;}		
	window.onerror = null;
	var x = 0, y = 0;
	if (document.all) {	x = window.screenLeft + 30;	y = window.screenTop - 50;}
	else if (document.layers) {x = window.screenX + 30;y = window.screenY + 75;}
	if (y <= 0) { y = 10;}        
    var propString = "scrollbars=yes,width=565,height=275,resizable=yes, top=" + y + ",screenY=" + y + ",left=" + x + ",screenX=" + x;
	var newwin = window.open(newUrl,"popup",propString);
	if (window.focus) {	newwin.focus();	}
	return;
}

function snsCheckSignInForm(loginForm,loginErr,pwdErr){
var loginId = loginForm.loginId;
var password =loginForm.password;
var loginIdVal = loginId.value;
var errCode, result;
errCode = validateLoginId(loginIdVal);
result =(errCode == RetVal.SUCCESS)? true:false;  
if(!result){alert(loginErr[errCode]);loginId.focus();return false;}
errCode = valPassword(password.value,3);
result = (errCode == RetVal.SUCCESS) ? true : false;  
if(!result){alert(pwdErr[errCode]);password.value="";password.focus();return false;}
  return true;
}

function snsCheckSignInForm(loginForm,loginErr,pwdErr){
var loginId = loginForm.loginId;
var password =loginForm.password;
var loginIdVal = loginId.value;
var errCode, result;
errCode = validateLoginId(loginIdVal);
result =(errCode == RetVal.SUCCESS)? true:false;  
if(!result){alert(loginErr[errCode]);loginId.focus();return false;}
errCode = valPassword(password.value,3);
result = (errCode == RetVal.SUCCESS) ? true : false;  
if(!result){alert(pwdErr[errCode]);password.value="";password.focus();return false;}
  return true;
}



function checkIcqForm(loginForm,loginErr,pwdErr) {
  var loginId = loginForm.loginId;
  var password =loginForm.password;
  var loginIdVal = loginId.value;
  var errCode; 
  var result;
  errCode = validateIcqId(loginIdVal);
  result =(errCode == RetVal.SUCCESS)? true:false;  
  if(!result) {
   alert(loginErr[errCode]);
   loginId.focus();
   return false;
  }
  errCode = valPassword(password.value,3);
  result = (errCode == RetVal.SUCCESS) ? true : false;  
  if(!result) {
   alert(pwdErr[errCode]);
   password.value="";
   password.focus();
   return false;
  }
  return true;
}


function validateIcqId(loginId) {
  var regExp = /@/;		
  var result= regExp.test(loginId) ? validateEmail(loginId) : validateIcqUin(loginId);	
  return result;
}



function validateIcqUin(sn) {

  var numericRegExp = /^[0-9]*$/;

  var trimmedId = trimString(sn);

  if(numericRegExp.test(trimmedId) && (trimmedId.length < 1)) {
   return RetVal.EMPTY_ERR;
  }

  else if(numericRegExp.test(trimmedId) && (trimmedId.length < 5)) {
   return RetVal.MIN_ERR;
  }

  else if(numericRegExp.test(trimmedId) && (trimmedId.length>10)) {
   return RetVal.MAX_ERR;
 }

  else {
  var result = (numericRegExp.test(trimmedId))?  RetVal.SUCCESS :  RetVal.INVALID_ERR;
  return result;
 }
}



function handleUrl(url){document.location.href = url;}

function stripOffAOLDomains(loginId){
var id=trimString(loginId.value);
var splitArr = id.match("^(.+)@(.+)$");
	if(splitArr != null && splitArr.length ==3){
	  	var domain=splitArr[2].toLowerCase();	 
	  	if(domain=="aol.com" || domain =="aim.com" || domain=="netscape.net"){ loginId.value=splitArr[1];}
	  	else {loginId.value=id;}
	  }else{loginId.value=id;}
}

function _sns_p(j) {
  return document.getElementById(j)
 }

 function _sns_o(j) {
  return document.getElementById(j).style
 }

 var _sns_tab_cur=new Array();

 function _sns_tab_init(mod,t) {
  var max=1;
  _sns_p(mod+".t"+t).className="selected";
  _sns_tab_cur[mod]=t;
  while(_sns_p(mod+"."+max)) {
   _sns_tab_set(mod,max);
   max++
  }
 }

 function _sns_tab_set(mod,t) { 
  var f=function c() {
   if(t!=_sns_tab_cur[mod]) {
  // if(_sns_p("errorBox")!=null){(t==3) ? _sns_p("errorBox").style.display="none" : _sns_p("errorBox").style.display="";}
    _sns_p(mod+".t"+_sns_tab_cur[mod]).className="";
    _sns_o(mod+"."+_sns_tab_cur[mod]).display="none";
    _sns_p(mod+".t"+t).className="selected";
    _sns_o(mod+"."+t).display="block";
    if(_sns_p("lgnId"+t)){
    	if(_sns_p("lgnId"+t).value==""){_sns_p("lgnId"+t).focus();}
    	else{_sns_p("pwdId"+t).focus();}
    }
    _sns_tab_cur[mod]=t;
   }
  }
  _sns_p(mod+".t"+t).onclick=f;
}
