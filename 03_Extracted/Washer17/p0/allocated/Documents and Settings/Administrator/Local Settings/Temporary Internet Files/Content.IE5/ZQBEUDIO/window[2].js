var popupwin;
function popHomePage(newUrl) {
	window.name = "mainWin";
	window.onerror = null;
	var x = 0, y = 0;
	var width,height;
	if (document.all) {	x = window.screenLeft + 30; y = window.screenTop - 50;}
    else if (document.layers) {x = window.screenX + 30; y = window.screenY + 75;}
	if (y <= 0) {y = 10;}	
	if(document.all) { width = document.body.offsetWidth * .9;  height = document.body.offsetHeight * .5;}
    else if (document.layers) {width = window.innerWidth* .9; height = window.innerHeight* .5;}
    else { width=600; height=300;}
    if (width < 600 | height < 300) { width=600; height=300;}
	var propString = "scrollbars=yes,menubar=yes,location=yes,resizable=yes,status=yes,toolbar=yes,width=" + width + ",height=" + height + ", top=" + y + ",screenY=" + y + ",left=" + x + ",screenX=" + x;
	var homePageWin = window.open("","homePageWin",propString);
	homePageWin = window.open(newUrl,"homePageWin",propString);	
	if (homePageWin.opener == null) {homePageWin.opener = self;}	
	if (window.focus) {	homePageWin.focus();}
}

function popUp(mode,pathOrTitleString,body,width,height,name){
	popUp1(mode,pathOrTitleString,body,width,height,name,"yes");
}

function popUp1(mode,pathOrTitleString,body,width,height,name,scrollbars){
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
	if (y <= 0) {	y = 10;	}
	var propString = "scrollbars="+scrollbars+",width="+width+",height="+height+", top=" + y + ",screenY=" + y + ",left=" + x + ",screenX=" + x;
	popupwin = window.open("",name,propString);
	popupwin = window.open(newUrl,name,propString);
	if (window.focus) {popupwin.focus();}
}

function feedbackPopUp(mode, pathOrTitleString, bodyString) {   
    popUp(mode,pathOrTitleString,bodyString,565,475,"FeedBack");
}

function snspartnerPopUp(mode, pathOrTitleString, bodyString) {
	popUp(mode,pathOrTitleString,bodyString,650,650,"PopUp");    
}

function snsRedir(newloc) {
var appVer = navigator.appVersion.substring(0,1);
var uagent = navigator.userAgent.toLowerCase();
	if (appVer == '2' || (appVer == '3' && uagent.indexOf('msie') != -1)) {  parent.location = newloc;}
    else if ( uagent.indexOf('safari') != -1 ) { top.location.href = newloc;}
    else { parent.location.replace(newloc); }
}

function snsInFrameRedir(newloc) {	
	if (navigator.appVersion.substring(0,1) == '2' || (navigator.appVersion.substring(0,1) == '3' && navigator.userAgent.indexOf('MSIE') != -1)) {
            if( self != top )
                document.location = newloc;
            else 
                parent.location = newloc;
	} else {
            if( self != top )
                document.location.replace(newloc);
            else 
                parent.location.replace(newloc);
	}
}

function snsPopUp(newurl) {
	popUp1(1,newurl,"",390,400,"emailnag","no");    
}

// if doPOST is set to true, just submit the form - otherwise 
// do a document.location.replace with the given redirUrl
function snsSubForm(formName, doPOST, redirUrl) {    
    ( doPOST== "true")?  eval ('document.' + formName + '.submit()'): snsRedir(redirUrl);   
}