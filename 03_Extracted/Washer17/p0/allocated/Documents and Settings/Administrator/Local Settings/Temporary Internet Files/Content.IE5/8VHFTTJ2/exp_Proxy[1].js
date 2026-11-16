
//GENERATION TIME VARIABLE
/* Generated: 07/24/2007  10:49 AM EST */



//COMMON VARIABLES
// From include/commonjsvars
var cp907926 = "http://cdn.eyewonder.com/100125/752145/907926/";

		// From include/commonjsvars
	
var ew907926_bannerWidth = 300;
var ew907926_bannerHeight = 250;
var ew907926_fullWidth = 500;
var ew907926_fullHeight = 300;

var ew_cacheBuster = new Date().getTime();
var ew_cacheBusterReplaceArray = new Array("\\[timestamp\\]", "\\[cachebuster\\]", "\\[random\\]", "\\[randnum\\]"); 	


function ew_getProtocol(cp)
{
	if (cp.indexOf("https://") != -1)
		return "https://";
	else
		return "http://";
}
var ew907926_protocol = ew_getProtocol("http://cdn.eyewonder.com/100125/752145/907926/");
	
	

//RESEARCH TAGS
document.writeln("<scr"+"ipt LANGUAGE=\"JavaScript\" SRC=\"http://amch.questionmarket.com/adsc/d338426/2/339586/randm.js\"></scr"+"ipt>");


//TRACKING VARIABLES
// From include/tracking	
	

var ew907926_startTime = ew_getTime907926();



var ew907926_imgArray = new Array();
var ew907926_imgArrayCounter = 0;
function ew_addImage907926(img)
{
	ew907926_imgArray[ew907926_imgArrayCounter] = new Image();
	ew907926_imgArray[ew907926_imgArrayCounter].src = img;
	ew907926_imgArrayCounter++;
}

function ew907926_otrk(img, extra)
{
	ew_addImage907926(cp907926+img+'?ewbust='+new Date().getTime()+extra);
	return '';
}

function ew907926_otrk_nobust(img, extra)
{
	ew_addImage907926(cp907926+img+'?ewbust=0'+extra);
	return '';
}

function ew907926_ctrk(type, info)
{ 

}

function ew907926_ctrk_nobust(type, info)
{ 

}

function ew_thirdpartytrackingcachebust907926(trkURL)
{
	
	for(var i = 0; i < ew_cacheBusterReplaceArray.length; i++)
	{
		trkURL = trkURL.replace(new RegExp(ew_cacheBusterReplaceArray[i],"gi"), ew_cacheBuster); 
	}
	
	return trkURL;
}


function ew_getTime907926() { var ew_t = new Date(); return ew_t.getTime();}



function onLoadTracker907926() { var ew_t = ew_getTime907926()-ew907926_startTime; ew907926_ctrk('onload',ew_t); return ew907926_otrk('ewtrack_onload.gif','&info='+ew_t); }
function flashTracker907926() { ew907926_ctrk('creative',''); return ew907926_otrk('ewtrack_v.gif',''); }
	
function impressionTracker907926() { ew907926_ctrk('impression',''); return ew907926_otrk('ewtrack.gif',''); }

function flashfailoverTracker907926() { ew907926_ctrk('failover_flash',''); return ew907926_otrk('ewtrack_ff.gif',''); }
function failoverTracker907926() {  ew907926_ctrk('failover_img',''); return ew907926_otrk('ewtrack_f.gif',''); }

function failoverReasonBrowserTracker907926() {  ew907926_ctrk('fail_reason_browser',''); return ew907926_otrk('ewtrack_rb.gif',''); }
function failoverReasonFlashTracker907926() { ew907926_ctrk('fail_reason_flash',''); return ew907926_otrk('ewtrack_rf.gif',''); }
function flashSupportTracker907926(verStr) { ew907926_ctrk('flash_support_'+verStr,''); return ew907926_otrk('ewtrack_'+verStr+'.gif',''); }
function weSupportTracker907926() { var ew_t = ew_getTime907926()-ew907926_startTime; ew907926_ctrk('wesupport',ew_t); return ew907926_otrk('ewtrack_wesupport.gif','&info='+ew_t); } 


// Expiration count versions of the _f, _ff, and _v trackers for AIM and ICQ cookie versions
function flashTrackerCache907926(expCount) { ew907926_ctrk('creative_aim_exposure',expCount); return ew907926_otrk('ewtrack_v'+expCount+'.gif',''); }
function flashfailoverTrackerCache907926(expCount) { ew907926_ctrk('failover_flash_aim_exposure',expCount); return ew907926_otrk('ewtrack_ff'+expCount+'.gif',''); }
function failoverTrackerCache907926(expCount) {  ew907926_ctrk('failover_img_aim_exposure',expCount); return ew907926_otrk('ewtrack_f'+expCount+'.gif',''); }



// Out of band tracker request for Flash to call through External Interface
function ew907926_outOfBandTrackRequest(url)
{
	ew_addImage907926(url);
}

// Send out the current location
function ew_urlTracker()
{

	return '';
}


document.writeln(impressionTracker907926());	


// Log the URL for troubleshooting purposes
document.writeln(ew_urlTracker());


	
	// Third Party Impression Tracking


function ew_thirdpartytracking907926()
{	
	for (var i = 0; i < ew907926_thirdPartyTrackers.length ; i++)
	{
		if (ew907926_thirdPartyTrackers[i] != "")
		ew_addImage907926(ew_thirdpartytrackingcachebust907926(ew907926_thirdPartyTrackers[i]));
	}
}

var ew907926_thirdPartyTrackers = new Array("","","","","","");

ew_thirdpartytracking907926();

	

	

//DESIGN VARIABLES
var ew_adFile_Proxy = cp907926+"exp_interimDetect.html";




function ew_clickTagCacheBust(_ct)
{
	
	for(var i = 0; i < ew_cacheBusterReplaceArray.length; i++)
		_ct = _ct.replace(new RegExp(ew_cacheBusterReplaceArray[i],"gi"), ew_cacheBuster); 
	if (_ct.indexOf("ord=") >= 0)
		_ct = _ct.split("ord=")[0] + "ord=" + ew_cacheBuster;
	return _ct;
}

clickTag4 = ew_clickTagCacheBust(clickTag4);
clickTag5 = ew_clickTagCacheBust(clickTag5);
clickTag6 = ew_clickTagCacheBust(clickTag6);
clickTag7 = ew_clickTagCacheBust(clickTag7);
clickTag1 = ew_clickTagCacheBust(clickTag1);
clickTag2 = ew_clickTagCacheBust(clickTag2);
clickTag3 = ew_clickTagCacheBust(clickTag3);
failclickTag = ew_clickTagCacheBust(failclickTag);



if (typeof(failclickTag) == "undefined")
	var failclickTag = "http://www.fxnetworks.com/shows/originals/damages/";	//define it anyway because it is referenced (even if not really used)
	
var ew_isIFrame = false;	// iframe detection turned off for this site
var ew_interimFile = "";
	
var inDapIF = false;
var inDapMgrIf = false;




if(inDapIF && inDapMgrIf)
{
		if (isGecko)
		{
			
			document.close();	
			
			delete document.close;
			document.close();	
			
			document.open();
		}
			

}

if (ew_isIFrame)
{

	var ew907926_iFrameQueryStringExtra = "";
}

if (ew_isIFrame)
{
	var ew_containsHTTP = (( ew_interimFile.indexOf("http://") > -1 ) || 
				( ew_interimFile.indexOf("https://") > -1 ));
	if (!ew_containsHTTP)
	{	
		var ref = document.referrer;
		var host='';
		if(ref == '') {
			host = 'http://'+document.domain; 
		}
		else {
			var pos1 = ref.indexOf("://");
			if (pos1 != -1) {
				pos2 = ref.indexOf("/", pos1+3);
				host = ref.substring(0, pos2);
			}
		}
	
		if(ew_interimFile.indexOf('/')==0) {
			ew_interimFile = host+ew_interimFile; 
		}
		else {
			ew_interimFile = host+'/'+ew_interimFile;
		}

	}
}

//AUTHENTICATION

	
/*** Begin include/authentication:AUTHENTICATION_SHORT ***/

var ua = ' ' + navigator.userAgent.toLowerCase();
var isIe = (ua.indexOf('msie') >= 0);
var isNav4 = ((ua.indexOf('mozilla') >= 0) && (ua.indexOf('compatible') == -1) && (parseInt(navigator.appVersion) < 5));
var isWin = (ua.indexOf('win') >= 0);
var isWinVista = false;
var isMac = (ua.indexOf('mac') >= 0);
//Opera
var isOpera = (ua.indexOf('opera') > 0);
if (isOpera)	// Opera's string is almost identical to IE's
	isIe = false;
//KHTML browsers
var ew_isSafari = (ua.indexOf('applewebkit') > 0);
var isKonqueror = (ua.indexOf('konqueror')>0);
// GECKO(Mozilla) browsers
// isGecko will also include Netscape 6+, Epiphany, Galeon, Camino, K-Meleon, etc
// safari says (like gecko) in it's UA string, but safari uses KHTML engine
var isGecko = (ua.indexOf('gecko/') > 0);
var isCamino = (ua.indexOf('camino/') > 0);

// Check for Vista
if(isWin)
{
	isWinVista = (ua.indexOf('windows nt 6.0') >= 0);
}

/*** End include/authentication:AUTHENTICATION_SHORT ***/

	

/*** Begin include/authentication:AUTHENTICATION ***/

// Check how old the gecko version is for the part following "gecko/" in the UA string
var geckoDate;
var geckoRevisionString;
var geckoRevision;
var geckoRevisionMajor;
var geckoRevisionMinor;

var webkitVersion;
if (isGecko)
{
	function ew_getGeckoRevisionString(ua)	// Keep temp variables from being placed into window object
	{
		var tempStr = ua.split("rv:");
		return tempStr[1].split(")")[0];
	}

	geckoRevisionString = ew_getGeckoRevisionString(ua);
	geckoRevision = parseFloat(geckoRevisionString);
	geckoRevisionMajor=parseFloat(geckoRevisionString.split(".")[0] )
	geckoRevisionMinor=parseFloat(geckoRevisionString.split(".")[1]+ "." + geckoRevisionString.split(".")[2])
	geckoDate = parseInt(ua.substr(ua.indexOf('gecko/')+6,8));
}
var ieVersion;
if (isIe)
{
	ieVersion = ua.substr(ua.indexOf('msie')+5,4);
	if (ieVersion.indexOf(';') > 0)
		ieVersion = ieVersion.substr(0,3);
}
var operaVersion
if (isOpera)
{
	operaVersion = ua.substr(ua.indexOf('opera')+6,4);
}
if (ew_isSafari)
{
    webkitVersion = parseInt(ua.substr(ua.indexOf('applewebkit')+12,4));

}
var ew907926_weSupport = false;
var failReason = "browser";	// Reason we failed over
 
	
/*** Begin include/authentication:AUTHENTICATION_FLASH ***/

var isFlash7up = false;	
var isFlash8up = false; 
var isFlash9up = false; 
var isFlashFailover = false; 
var isFlash9Pre28 = false;	

var ew907926_flashVersion = new Array(0,0,0);
var ew907926_flashVersionMajor = 0;
var ew907926_flashVersionMinor = 0;

// Check Flash info
function ew907926_getFlashVersion()
{

	if(isIe)
	{
		var checkStr = "ShockwaveFlash.ShockwaveFlash.7";
		if (isWinVista)
			checkStr = "ShockwaveFlash.ShockwaveFlash.9";
		try {
			var swf = new ActiveXObject(checkStr.toString()).GetVariable("$version");
			var ver = swf.substring(swf.indexOf(" "));
			ew907926_flashVersion = ver.split(",");
		} catch ( e )
		{
			ew907926_flashVersion = new Array(0,0,0); // Below Flash 7
		}
	} else if( isGecko || isOpera || ew_isSafari )
	{
		ver = new Array();
		var desc = navigator.plugins["Shockwave Flash"].description;
		desc = desc.split(" ");
	
		ver[0] = desc[2].split(".")[0];
		ver[1] = desc[2].split(".")[1];
		ver[2] = desc[desc.length-1].split("r")[1]; // Last element of array.. compensates in differences between Mac + Windows
		
		if( ver[0] >= 7 ) ew907926_flashVersion = ver;
	}
	
	ew907926_flashVersionMajor = ew907926_flashVersion[0] + "." + ew907926_flashVersion[1];
	ew907926_flashVersionMinor = ew907926_flashVersion[2];
}


if (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"])
	var navPlugin = (navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin);

if (navPlugin || (isIe && isWin))
{
	ew907926_getFlashVersion();
	isFlash9up = (ew907926_flashVersionMajor>=9);
	isFlash8up = (ew907926_flashVersionMajor>=8);
	isFlash7up = (ew907926_flashVersionMajor>=7);
	isFlashFailover = (ew907926_flashVersionMajor>=6);
	isFlash9Pre28 = (ew907926_flashVersionMajor == 9 && ew907926_flashVersionMinor < 28);

	if( isWinVista && isFlash9up && isFlash9Pre28 && isIe) 
	{ 
		// Vista requires 9,0,28,0 and up for proper behavior in IE
		ew907926_weSupport = false;
		failReason = "vistaflash";		
	}
}
else
	isFlash7up = false;
	
/*** End include/authentication:AUTHENTICATION_FLASH ***/

	
	
// Do a an exclusive check for support to protect page contents for rare and untested browsers
if(isGecko || ew_isSafari || (isIe && isWin && ieVersion >= 6) || (isOpera && operaVersion >= 8)) 
{
	// Support Mozilla-based browsers (i.e. Firefox), Safari Mac, 
	// and IE browsers (IE 6/Win and AOL Explorer), and Opera >= 8
	failReason = "none";
	ew907926_weSupport = true;

	// Do we support Flash 7?
	if (!isFlash7up)
	{
		ew907926_weSupport = false;
		failReason = "flash";
	}
}
else
{
	// Still attempt a flash failover if browser isn't supported
	failReason = "browser"
	ew907926_weSupport = false;
}



	

var ew907926_turnOffExecution = false;



if (!ew907926_turnOffExecution && isFlash8up)
	document.writeln(flashSupportTracker907926("8"));

if (!ew907926_turnOffExecution && isFlash9up)
	document.writeln(flashSupportTracker907926("9"));

/*** End include/authentication:AUTHENTICATION ***/

	
// We support expandables in Opera 8+ for JS ads & Opera 9+ for Iframe Ads
if (isOpera)
{
	failReason = "browser";
	ew907926_weSupport = false;
	if ((operaVersion >= 8 && !ew_isIFrame) || (operaVersion >= 9))
	{
		ew907926_weSupport = true;
		failReason = "none";
	}
}
// Flash doesn't currently honor clipping on *nix browsers (Q1 2006)
if (!isWin && !isMac)
{
    failReason = "flash";
    ew907926_weSupport = false;
}

//DISNEY SITE SPECIFIC


//CUSTOM FUNCTIONS

	
weSupport = ew907926_weSupport; 
ew907926_turnOffExecutionBackup = ew907926_turnOffExecution; 
	



var ew907926_localConnectionUUID;
function ew_setUpLocalConnectionUUID907926()
{
	var ewwin;
	if ( typeof(topWin) == "undefined")
		ewwin = window;
	else
		ewwin = topWin;
	
	if ( typeof( ewwin.ew_localConnectionUUID ) == "undefined")
	{
            ewwin.ew_localConnectionUUID = (new Date().getTime());
	}
       
	ew907926_localConnectionUUID = ewwin.ew_localConnectionUUID;
}
ew_setUpLocalConnectionUUID907926();



var ew907926_context = window; 
var ew907926_flashObjectWindow = window;
var ew907926_mainFunctionWindow = window;	
/* Note: The objects won't be present until the page is fully loaded */

/* Use ew_getSWFTag<id> to return either the object or embed tag depending on the browser  */
function ew_getSWFTag907926()
{ 
	if (isGecko || isOpera)	
		return ew_getEmbedTag907926();
	else
		return ew_getObjectTag907926();
}

/* The two functions below shouldn't generally be used, and ew_getSWFTag<id> should be used instead */
function ew_getObjectTag907926()
{ 
	if (ew907926_flashObjectWindow.document.getElementById("ewad907926"))
		return ew907926_flashObjectWindow.document.getElementById("ewad907926");
	else
		return null;
}
function ew_getEmbedTag907926() 
{
	if (ew907926_flashObjectWindow.document.getElementById("ewembed907926"))
		return ew907926_flashObjectWindow.document.getElementById("ewembed907926");
	else
		return null;
}

function findPosX(obj) {
	var curleft = obj.offsetLeft;
	if (obj.offsetParent) {
		while (obj.offsetParent) {
			obj = obj.offsetParent;
			curleft += obj.offsetLeft;			
		}
	}
	else if (obj.x)
		curleft += obj.x;
	return curleft;
}

function findPosY(obj) {
	var curtop = obj.offsetTop;
	if (obj.offsetParent) {
		while (obj.offsetParent) {
			obj = obj.offsetParent;
			curtop += obj.offsetTop;			
		}
	}
	else if (obj.y)
		curtop += obj.y;
	return curtop;
}


var ew907926_debugShowErrors = false;		// Whether to throw errors in JS-Flash functionality when encountered


/* ########################################  BEGIN CUSTOM FUNCTIONS #################################################### */

/* Begin ad-specific custom functions */



/*  End ad-specific custom functions */

/*  ############################################################################################# */

/*  Begin execution-specific custom functions */

if (isIe)	{
	function ew_doZIndex907926()	{
		var myObj = topWin.document.getElementById('ai300x250_h');
		if(typeof(myObj) != "undefined" && myObj)
		{
			myObj.style.zIndex = '150000';
		}
		else
		{
			var dummy = setTimeout('ew_doZIndex907926()',1500);
		}
	}

	if (typeof(isIFrameContent) != "undefined" && isIFrameContent)	{ 
		if (window.addEventListener) window.addEventListener("load",ew_doZIndex907926,false);
		else if (window.attachEvent) window.attachEvent("onload",ew_doZIndex907926);
	}
}

/*  End execution-specific custom functions */

/* #########################################  END CUSTOM FUNCTIONS #################################################### */

	

ew907926_weSupport = weSupport; 
ew907926_turnOffExecution = ew907926_turnOffExecutionBackup;
	
	

var ew907926_errorObject;

function ew_throwJSError907926()
{
	var e = ew907926_errorObject;
	
	var emsg = "";
	try	{ 
		if (isIe)
		{
			emsg = e.name + ": " + e.description;
		}
		if (isGecko)
		{
			emsg = e.name + ": " + e.message + " in file " + e.fileName + " on line " + e.lineNumber + "\n Stack: \n " + e.stack;
		}
		if (ew_isSafari)
		{
			emsg = e.name + ": " +  e.message + " on line " + e.line;
		}
		if (isOpera)
		{
			emsg = e.message + " on line " + e["opera#sourceloc"];
		}
		ew907926_debugExternalInterfaceErrorMessage = emsg;
	}
	catch(e)
	{
		ew907926_debugExternalInterfaceErrorMessage = "Failure in external interface";
	}
	
	if (ew907926_debugShowErrors == true)
	{
		throw(ew907926_errorObject);	/* Note: When a custom function causes an error, IE will say the error occurred here, but it didn't :-) The error message will give an idea of where the error is, or check in Firefox */
	}
}


function ew_delegate907926( functionName )
{
	var ew_args = new Array();
		
	for( var i = 1; i < arguments.length; i++ )
		ew_args[i-1] = arguments[i];
	try
	{
		return ew907926_mainFunctionWindow[functionName].apply( ew907926_mainFunctionWindow, ew_args );
	}
	catch (e)
	{
		ew907926_errorObject = e;
		var dummy = setTimeout(ew_throwJSError907926, 1);
		return null;
	}
}



function ew_isAvailableExternalInterface907926()
{
	var flashObj = ew_getSWFTag907926();
	if (typeof(flashObj) == "undefined" || flashObj == null || typeof(flashObj.ew_isAvailable) == "undefined" || !flashObj.ew_isAvailable())
		return false;
	return true;
}


var ew907926_debugExternalInterfaceErrorMessage = "";

// Usage: ew_callExternalInterface<id>("functionName","arg1","arg2", ...);
function ew_callExternalInterface907926(functionName)
{

	if (!ew_isAvailableExternalInterface907926())
	{
		ew907926_debugExternalInterfaceErrorMessage = "Object doesn't support External Interface.";
		return null;
	}
	
	var flashObj = ew_getSWFTag907926();	

	if (typeof(flashObj[functionName]) == "undefined" || flashObj[functionName] == null)
	{
		ew907926_debugExternalInterfaceErrorMessage = "Object doesn't support this method.";
		return null;
	}

	var ew_args = new Array();
	var ew_argsString = "";
			
	for( var i = 1; i < arguments.length; i++ )
	{
		if (i!=1)
			ew_argsString += ",";
		ew_argsString += "ew_args[" + (i-1) +  "]";
		ew_args[i-1] = arguments[i];
	}
		
	var execString = 'flashObj.'+functionName+'('+ew_argsString+')';
	try {
	return eval(execString);	
	}
	catch (e)
	{
		ew907926_errorObject = e;
		var dummy = setTimeout(ew_throwJSError907926, 1);
		return null;
	}	

}
	

// FLASH

/*** Begin include/flash:FLASH8 ***/




var ew907926_flvNames = "FX Damages_power_ambition 300x250,FX Damages_power_ambition 499x250";
var ew907926_creativeName = "AOL_500x300user_FL7.swf";
var ew907926_swfVersion = 7;


/*** Begin include/flash:FLASH8COMMON ***/

function ew_getfNames(flvvideos,flashBool)
{
	for(var i = 0; i < flashBool.length; i++)
	{
		if(flashBool[i] == "true")
			flvvideos[i] = "fl8_" + flvvideos[i];
	}
	
	return flvvideos.join(",");
}

function ew_setupCreative(flash7Creative, flash8Creative, flash9Creative)
{
	if (isFlash9up && flash9Creative != "" && !isFlash9Pre28)
	{
		ew907926_swfVersion = 9;
		return flash9Creative;
	}
	else if (isFlash8up && flash8Creative != "")
	{
		ew907926_swfVersion = 8;
		return flash8Creative;
	}
	else if (isFlash7up && flash7Creative != "")
	{
		ew907926_swfVersion = 7;
		return flash7Creative;
	}
	else /* no creative. failover */
	{
		ew907926_weSupport=false;
		failReason = "nocreative";
		return flash7Creative;	// return anyway, even if not used
	}
}
/*** End include/flash:FLASH8COMMON ***/



function ew_setupFlash8Videos()
{
	var flvvideos = new String("FX Damages_power_ambition 300x250,FX Damages_power_ambition 499x250").split(',');
	var flashBool = new String("true,true").split(',');
	ew907926_flvNames = ew_getfNames(flvvideos,flashBool);
}

ew907926_creativeName = ew_setupCreative("AOL_500x300user_FL7.swf","AOL_500x300user_FL8.swf","");

if (isFlash8up && (ew907926_swfVersion >= 8))
	ew_setupFlash8Videos();

/*** End include/flash:FLASH8 ***/

/*** Begin include/flash:FLASHVARS ***/


var ew907926_adMode = "prog";


var ew907926_videoPath = "http://cdn.eyewonder.com/100125/video/";


var ew907926_videoID = '6657,6658';



if (typeof(isIFrameContent) != "undefined" && isIFrameContent)
	ew_qaReportUUID = topWin.ew_qaReportUUID;
	
if (typeof(ew_qaReportUUID)=="undefined")
	ew_qaReportUUID = "common";
	



	
var ewclicktags907926 = ''
	+ '&clickTag4='+escape(clickTag4)
	+ '&clickTag5='+escape(clickTag5)
	+ '&clickTag6='+escape(clickTag6)
	+ '&clickTag7='+escape(clickTag7)
	+ '&clickTag1='+escape(clickTag1)
	+ '&clickTag2='+escape(clickTag2)
	+ '&clickTag3='+escape(clickTag3);

if( typeof( ew907926_flashvarsExtra ) == "undefined" )
	var ew907926_flashvarsExtra = "";


var ew907926_browserEngine = "unknown";
if (isGecko)
	ew907926_browserEngine = "gecko";
else if (isIe)
	ew907926_browserEngine = "ie";
else if (isOpera)
	ew907926_browserEngine = "opera";
else if (ew_isSafari)
	ew907926_browserEngine = "webkit";


var ew907926_adTypeID = '26';
var ew907926_adType = 'Expandable - Self-Select Video';
if (ew907926_adTypeID=='22' || ew907926_adType=="Interstitial")
	ew907926_adTypeID = '5';

if (ew907926_adTypeID=='30')
	ew907926_adTypeID = '8';
	
var ew907926_customFlashString = ''; 
if (ew907926_customFlashString != '') 
	{ 
		ew907926_customFlashString = '&' + ew907926_customFlashString.replace(/\|/g, '&'); 
	} 


if (typeof(ew907926_localConnectionUUID) == "undefined")
	ew907926_localConnectionUUID = (new Date().getTime());
	
	

var ewflashvars907926 = 'ewbase='+cp907926
	+ '&bwfile=bwtest.swf'
	+ '&creative=' + ew907926_creativeName
	+ '&vLength=28.8,28.8'
	+ '&bw=56,90,135,300,450,600'
	+ '&buf=5,4,3,2,2,2'
	+ '&flv=' + ew907926_flvNames
	+ '&flvId=0'
	+ '&formatId='+ew907926_adTypeID
	+ '&aInit='+'user'
	+ '&vInit=host'
	+ '&videoID='+ew907926_videoID
	+ '&videoPath='+ew907926_videoPath
	+ '&adId=907926'
	+ '&adMode=' + ew907926_adMode
	+ '&trkUrl=http://cdn.eyewonder.com/100125/'
	+ '&swfVersion=' + ew907926_swfVersion
	+ '&browserEngine=' + ew907926_browserEngine // ie, gecko, webkit, or opera
	+ '&qaReportUUID=' + ew_qaReportUUID
	+ '&localConnectionUUID=' + ew907926_localConnectionUUID
	+ '&edgeDetect=none' 
	+ ew907926_flashvarsExtra
	+ ew907926_customFlashString
	+ ewclicktags907926;

/*** End include/flash:FLASHVARS ***/	


//EXPAND FUNCTIONS
var ew907926_isOverflowHidden = false;

//ZINDEX


var ew_maxZIndex = 2147483647;	




/* Debug:
zIndexOverride=

Placement ratio=1.2
What is the detected placement:
isLeaderboard=false
isSkyscraper=false
isRectangle=true

Placement-based overrides (used if they exist):
Leaderboard override=
Skyscraper override=
Rectangle override=

Default Z-Index (if not overridden)=10000
*/


var ew907926_minZIndex = 10000 + 5;
					

var ew907926_saveZIndex;

function ew_checkOverflowHidden907926() 
{
	if (inDapIF || inDapMgrIf)	
		return false;
		
 	var tempNode = ew907926_flashObjectWindow.document.getElementById("ew_BannerDiv907926").parentNode; 		
	
	while (tempNode!=null && (tempNode.tagName != "BODY"))
	{
		var computedOverflow;
		if (isIe)
			computedOverflow = tempNode.currentStyle.overflow;
		else
			computedOverflow = document.defaultView.getComputedStyle(tempNode,"").getPropertyValue("overflow");
		if (computedOverflow == "hidden")
			return true;
		 tempNode = tempNode.parentNode;
	}
	
	return false;
}



function ew_modifyOverflow907926()
{
	   
	if (inDapIF || inDapMgrIf)	
		return;
		
	var tempNode = ew907926_flashObjectWindow.document.getElementById("ew_BannerDiv907926").parentNode;
	   
	if (isGecko)	// This workaround doesn't work yet in IE 5.5 and Safari 1.3
	{
		while (tempNode!=null && (tempNode.tagName != "BODY"))
		{
			var computedDisplay;
			if (isIe)
				computedDisplay = tempNode.currentStyle.display;
			else
				computedDisplay = document.defaultView.getComputedStyle(tempNode,"").getPropertyValue("display");
			if ((computedDisplay == "block") || (computedDisplay == "table-cell"))
			{
				var computedOverflow;
				if (isIe)
					computedOverflow = tempNode.currentStyle.overflow;
				else
					computedOverflow = document.defaultView.getComputedStyle(tempNode,"").getPropertyValue("overflow");
				if (computedOverflow == "hidden")
				{
					// Change overflow
					tempNode.style.overflow="visible";
				}
			}
			tempNode=tempNode.parentNode;
   		}
	}
}


function ew_modifyZIndex907926()
{
	if (inDapIF || inDapMgrIf)	
		return;
		
    if (isIe)
    {
		var count = 0;
		var tempElement = ew907926_flashObjectWindow.document.getElementById("ew_BannerDiv907926").parentElement; 
		
		// Safari also handles parentElement DOM object, unfortunately
		if (tempElement!=null) 
		{
		      // ew907926_saveZIndex is used to save the z-indexes before they are changed
			ew907926_saveZIndex = new Array();
			while (tempElement!=null && tempElement.tagName != "BODY")
			{
				computedDisplay = tempElement.currentStyle.display;
				if ((computedDisplay == "block") || (computedDisplay == "table-cell"))
				{
					if (tempElement.currentStyle.zIndex==0)
					{
						// Save the z-index here
						var tempPair=new Array(2);
						tempPair[0] = tempElement;
						tempPair[1] = tempElement.currentStyle.zIndex;
						ew907926_saveZIndex[count] = tempPair;
						count++;
						// Now change it
						tempElement.style.zIndex=1;
					}
				}
				tempElement=tempElement.parentElement;
			}
		}

	}
}

function ew_restoreZIndex907926()
{
	if (inDapIF || inDapMgrIf)	
		return;
		
	// IE6/5.5 restore the values saved in ew_expand
	if (ew907926_saveZIndex != null)
	{
		// restore the backed up zIndex values
		for (i = 0; i < ew907926_saveZIndex.length; i++)
		{
			var tempPair = ew907926_saveZIndex[i];
			var tempElement = tempPair[0];
			var tempZIndex = tempPair[1];
			if (tempElement != null)	// Is the element still on the page?
			{
				tempElement.style.zIndex = tempZIndex;
			}
		}

		ew907926_saveZIndex = null;	// delete the array
	}
}

function ew_contract907926()
{
	ew_resize907926(300, 250, 200, 0);
    
}

function ew_expand907926()
{
	ew_resize907926(500, 300, 0, 0);
    
}


if (typeof(ew907926_turnOffEdgeDetect)=='undefined') 
	var ew907926_turnOffEdgeDetect = true;
	
if (ew907926_turnOffEdgeDetect == false) 
{
	var ew907926_isExpanded = false;
	var ew907926_edgeRepoRight = false;
	var ew907926_edgeRepoLeft = false;
	var ew907926_edgeRepoUp = false;
	var ew907926_edgeRepoDown = false;
	var ew907926_expHoriz = false;
	var ew907926_expVert = false;

	if (typeof(ew907926_edgeDetectRepositionOffsetX)=='undefined') 
		var ew907926_edgeDetectRepositionOffsetX = 0;
		
	if (typeof(ew907926_edgeDetectRepositionOffsetY)=='undefined') 
		var ew907926_edgeDetectRepositionOffsetY = 0;

	if (ew907926_fullHeight > ew907926_bannerHeight) 
	{
		var ew907926_expVert = true;
		var ew907926_expY = ew907926_fullHeight - ew907926_bannerHeight;
	}

	if (ew907926_fullWidth > ew907926_bannerWidth) 
	{
		var ew907926_expHoriz = true;
		var ew907926_expX = ew907926_fullWidth - ew907926_bannerWidth;
	} 
}



function ew907926_getEdgePos() 
{
	var edgeDetect="none";
	
	var ew_907926edgeDetectObj = document.getElementById('ew_BannerDiv907926');
    
	if (ew907926_expVert == true) {
	var pageheight = document.body.clientHeight;
   var adYpos = findPosY(ew_907926edgeDetectObj);
	if (adYpos < ew907926_fullHeight) edgeDetect = "top";
	else if (adYpos > (pageheight - ew907926_fullHeight)) edgeDetect = "bottom";
	}

	if (ew907926_expHoriz == true) {
	var pagewidth = document.body.clientWidth;
	var adXpos = findPosX(ew_907926edgeDetectObj);
	if (adXpos < ew907926_fullWidth) edgeDetect = "left";
	else if (adXpos > (pagewidth - ew907926_fullWidth)) edgeDetect = "right";
	}
	
	return edgeDetect;	
}





function ew907926_edgeDetectNotifyFlashObject(pos)
{

}

function ew907926_edgeDetect(newWidth, newHeight, offsetX, offsetY) {
	
	var ew_907926edgeDetectObj = document.getElementById('ew_FlashDiv907926');
	
		if (ew907926_expHoriz == true) {
			var ew_originX = findPosX(ew_907926edgeDetectObj);
			if ( newWidth==ew907926_fullWidth ) { ew907926_isExpanded = true; } else { ew907926_isExpanded = false; }

			if (document.body.clientWidth > ew907926_fullWidth) {
				if (ew907926_isExpanded) 
				{
					var rightEdge = ew_originX + ew907926_fullWidth;
					if (newWidth > rightEdge) 
					{
						ew907926_edgeRepoLeft = true;
						var leftEdge = offsetX - ew907926_edgeDetectRepositionOffsetX;
						ew_907926edgeDetectObj.style.left = leftEdge.toString() + "px";
					} 
					else if ((ew_originX + ew907926_fullWidth) > document.body.clientWidth) 
					{
						ew907926_edgeRepoRight = true;
						var leftEdge = (ew907926_bannerWidth - newWidth) + ew907926_edgeDetectRepositionOffsetX;
						ew_907926edgeDetectObj.style.left = leftEdge.toString() + "px";
					}
				} else {
					ew_907926edgeDetectObj.style.left = "-" + (offsetX).toString() + "px";
					edgeRepoRight = false; edgeRepotLeft = false;
				}
			}	
		}

		if (ew907926_expVert == true) {
		
			var ew_originY = findPosY(ew_907926edgeDetectObj);
			if (newHeight==ew907926_fullHeight) { ew907926_isExpanded = true; } else { ew907926_isExpanded = false; }

			if (document.body.clientHeight > ew907926_fullHeight) {
				if (ew907926_isExpanded) 
				{
					var bottomEdge = ew_originY + ew907926_fullHeight;
					if (newHeight > bottomEdge) 
					{
						ew907926_edgeRepoDown=true;
						var topEdge = offsetY - ew907926_edgeDetectRepositionOffsetY;
						ew_907926edgeDetectObj.style.top = topEdge.toString() + "px";
					} 
					else if ((ew_originY + ew907926_fullHeight) > document.body.clientHeight) 
					{
						ew907926_edgeRepoUp=true;
						var bnDiff = ew907926_bannerHeight - newHeight;
						var topEdge = (bnDiff - offsetY) + ew907926_edgeDetectRepositionOffsetY;
						ew_907926edgeDetectObj.style.top = topEdge.toString() + "px";
					}
				
				} else {
					ew_907926edgeDetectObj.style.top = "-" + (offsetY).toString() + "px";
					edgeRepoUp = false; edgeRepoDown = false;
				}
			}
		}
}


function ew_resize907926(newWidth, newHeight, offsetX, offsetY)
{
	
	if (newWidth > 500 )
		newWidth = 500;
	if (newWidth < 300 )
		newWidth = 300;
	if (newHeight > 300 )
		newHeight = 300;
	if (newHeight < 250 )
		newHeight = 250;
	if (offsetX < 0)
		offsetX = 200;
	if (offsetY < 0)
		offsetY = 0;
	
	
	ew_reset907926();
	
	
	if (newWidth > 300 || newHeight > 250)
	{
		/* Performing an expand. Any expansion-specific code goes here */
		if (isIe)
			ew_modifyZIndex907926();
	}
	else
	{
		/* Performing a contract. Any contract-specific code goes here */
		if (isIe)
			ew_restoreZIndex907926();
	}
	
	if(isIe)
		ew907926_flashObjectWindow.document.getElementById('ew_shim907926').style.clip = "rect("+offsetY+"px "+(offsetX+newWidth)+"px "+(offsetY+newHeight)+"px "+offsetX+"px)";
	ew907926_flashObjectWindow.document.getElementById('ew_FlashDiv907926').style.clip = "rect("+offsetY+"px "+(offsetX+newWidth)+"px "+(offsetY+newHeight)+"px "+offsetX+"px)";

if (ew907926_turnOffEdgeDetect == false) 
		ew907926_edgeDetect(newWidth, newHeight, offsetX, offsetY);

}





function ew_reset907926()
{
	ew_changeHeight907926(300);
}

function ew_onmouseout907926()
{
	ew_changeHeight907926(301);
}

var ew907926_embed;
var ew907926_ewad;

function ew_changeHeight907926(newHeight)
{
	// Define variables only once to speed up execution
	if (typeof(ew907926_ewad) == "undefined" || ew907926_ewad == null)
	{
		ew907926_ewad = ew907926_flashObjectWindow.document.getElementById("ewad907926");
		
		
		if (typeof(ew907926_ewad) == "undefined" || ew907926_ewad == null)
			return;
		
		if (isGecko || isOpera)
		{
			ew907926_embed = ew907926_ewad.firstChild;
			while (ew907926_embed.nodeName != "EMBED")
				ew907926_embed = ew907926_embed.nextSibling;
		}
	}


	if (isIe || ew_isSafari)
	{
		ew907926_ewad.style.height=newHeight + "px";
	}

	if (isGecko || isOpera)
	{
		var ew907926_embed = ew907926_ewad.firstChild;
		while (ew907926_embed.nodeName != "EMBED")
			ew907926_embed = ew907926_embed.nextSibling;
		ew907926_embed.height = newHeight;
		ew907926_embed.style.height = newHeight + "px";
	}
}



var ew907926_bannerPos = "position: relative;";

var flashHTML907926='<div id="ew_BannerDiv907926" style="visibility: visible; position: relative; width:300px; height:250px; z-index: ' + ew907926_minZIndex + '">'

		+'<img src="'+cp907926+'preloader.gif" border="0">'
	
	+'</div>';

//EYEWONDER FLASH OBJECT
var flashHTMLonLoad907926='<div id="ew_FlashDiv907926" onmouseout="ew_onmouseout907926()" style="visibility: visible; position: absolute; top: -0px; left: -200px; width:500px; height:300px; clip: rect(0px 500px 250px 200px); z-index: ' + (ew907926_minZIndex+2) + '">'
	+'<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="' + ew907926_protocol + 'fpdownload.adobe.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="500" height="300" id="ewad907926" align="middle">'
	+'<param name="allowScriptAccess" value="always">'
	+'<param name="movie" value="'+cp907926+ew907926_creativeName+'">'
	+'<param name="quality" value="high">'
	+'<param name="bgcolor" value="#FFFFFF">'
	+'<param name="base" value="'+cp907926+'">'
	+'<param name="wmode" value="transparent">'
	+'<param name="FlashVars" value="'+ewflashvars907926+'" >'
	+'<embed id="ewembed907926" src="'+cp907926+ew907926_creativeName+'" base="'+cp907926+'" wmode="transparent" quality="high" bgcolor="#FFFFFF" width="500" height="300" name="ewad907926" FlashVars="'+ewflashvars907926+'" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="' + ew907926_protocol + 'adobe.com/go/getflashplayer">'
	+'</object>'
	+'</div>'
	+'<div style="position:absolute;top:0px;left:0px;z-index:0"><img src="'+cp907926+'dot.gif" id="trackingImage907926" width="1" height="1" border="0"></div>';

if(isIe)
	flashHTMLonLoad907926 +='<iframe id="ew_shim907926" src="" noresize="true" scrolling="no" display="none" frameborder=0 marginheight=0 marginwidth=0 style="filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0);visibility: visible;position:absolute;top: -0px; left: -200px; width:500px; height:300px;clip: rect(0px 500px 250px 200px);z-index: ' + ew907926_minZIndex + '"></iframe>';


//EYEWONDER FLASH FAILOVER OBJECT
var flashfailoverHTML907926 ='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="' + ew907926_protocol + 'fpdownload.adobe.com/pub/shockwave/cabs/flash/swflash.cab#version=4,0,0,0" width="300" height="250" id="ewfailad907926" align="middle">'
	+'<param name="allowScriptAccess" value="always">'
	+'<param name="movie" value="'+cp907926+'">'
	+'<param name="quality" value="high">'
	+'<param name="bgcolor" value="#FFFFFF">'
	+'<param name="wmode" value="opaque">'
	+'<param name="FlashVars" value="clickTag='+escape(failclickTag)+'" >'
	+'<embed id="ewembed907926"  src="'+cp907926+'" flashvars="clickTag='+escape(failclickTag)+'" quality="high" bgcolor="#FFFFFF" width="300" height="250" name="ewfaildesign" align="middle" allowScriptAccess="always" wmode="opaque"  type="application/x-shockwave-flash" base="'+cp907926+'" pluginspage="' + ew907926_protocol + 'adobe.com/go/getflashplayer">'
	+'</object>';

//EYEWONDER FAILOVER
var failoverHTML907926 = '<a href="http://www.eyewonderlabs.com/ct.cfm?ewbust=0&file=http://cdn.eyewonder.com/100125/752145/907926/failover.jpg&eid=907926&name=Clickthru-failover&num=1&time=0&diff=0&click='+escape(failclickTag)+'" target="_blank"><img src="'+cp907926+'failover.jpg" border="0"></a>';



//IFRAME HTML (if ad served in IFrame)
if(ew_isIFrame) { 
	var mpTrkStr = "";
	
	
	var ew907926_interimWidth = 300;
	var ew907926_interimHeight = 250;
	
	var attributesExtra = "";
	var styleExtra = "";

	if (isIe)
		attributesExtra = 'allowtransparency="true"';
	var iframeHTML907926 = '<iframe id="ew_expAd" border="0"  width="'+ew907926_interimWidth+'" height="'+ew907926_interimHeight+'" noresize'
	+ ' style="position: absolute; top: 0px; left: 0px; ' + styleExtra + '" ' + attributesExtra
	+ ' scrolling="No" frameborder="0" marginheight="0" marginwidth="0" src="'
	+ ew_adFile_Proxy
	+ '?interim='+escape(ew_interimFile)
		+ '&clickTag4='+escape(clickTag4)
				+ '&clickTag5='+escape(clickTag5)
				+ '&clickTag6='+escape(clickTag6)
				+ '&clickTag7='+escape(clickTag7)
				+ '&clickTag1='+escape(clickTag1)
				+ '&clickTag2='+escape(clickTag2)
				+ '&clickTag3='+escape(clickTag3)
				+ '&failclickTag='+escape(failclickTag)

	+ '&iframeURL='+escape(document.URL)
	+ '&cp='+escape(cp907926)
	+ '&extra='+escape(ew907926_iFrameQueryStringExtra)
	+ '&stime='+escape(ew907926_startTime)
	+ '&cb='+escape(ew_cacheBuster)
	+ mpTrkStr
	+ '"></iframe>';
}




var ew907926_onLoadWasCalled = false; //Protects against multiple of the same execution being loaded in the same page

//appends flash ad div to the banner div (called on page load)
function ew_onLoad907926() {

	flashHTMLonLoad907926 += onLoadTracker907926();
	
	if (ew907926_onLoadWasCalled == true)
		return;
	
	ew907926_onLoadWasCalled = true;
	
	if (isGecko && geckoRevisionMajor < 1)	// ew_CheckOverflowHidden doesn't work in Mozilla < 1.0
	{
		failReason = "browser";
		ew907926_weSupport = false;
	}

	if (ew907926_weSupport)
		ew907926_isOverflowHidden = ew_checkOverflowHidden907926();
	// We don't support expandables when overflow:hidden is set on anything but Gecko
	// browsers (Mozilla >= 1.0 and Firefox, etc) and IE >= 6.0
	if (ew907926_isOverflowHidden && !(isGecko  || (isIe && (ieVersion >= 6.0)) || (isOpera && (operaVersion >= 8))))
	{
		failReason = "browser"
		ew907926_weSupport = false;
	}
	if (ew907926_weSupport)	// Do we still support the expandable?
	{
		if (ew907926_isOverflowHidden == true)	
			ew_modifyOverflow907926();
		
		
		var edgeDetect = ew907926_getEdgePos();	
		if (edgeDetect != 'none') 
		{
			var flashvar_edgeDetect = "edgeDetect=" + edgeDetect;
			flashHTMLonLoad907926 = flashHTMLonLoad907926.replace(/edgeDetect=none/g, flashvar_edgeDetect);
		}
			
		
		 
		
		// Note: Don't do two innerHTML statements or IE will give an error when hovering
		ew907926_flashObjectWindow.document.getElementById('ew_BannerDiv907926').innerHTML+=flashHTMLonLoad907926;
        
        
        if (isCamino)
            ew907926_flashObjectWindow.document.getElementById('ew_BannerDiv907926').addEventListener("mouseout",ew_onmouseout907926,true);
		
		 
	}
	else
	{
		var failReasonTracker = "";
		// Reason for failover
		if (failReason == "browser")
			failReasonTracker = failoverReasonBrowserTracker907926();
		else if (failReason == "flash")
			failReasonTracker = failoverReasonFlashTracker907926();
		// Replace, don't append innerHTML (innerHTML= not innerHTML+=) to write out failovers because they are inline content
		if(!ew907926_turnOffExecution&&isFlashFailover&&false) 
		{
			document.getElementById('ew_BannerDiv907926').innerHTML=flashfailoverHTML907926+flashfailoverTracker907926()+failReasonTracker;
		}
		else 
		{
			document.getElementById('ew_BannerDiv907926').innerHTML=failoverHTML907926+failoverTracker907926()+failReasonTracker;
		}
	}
	
	
	/* BEGIN AOL SPECIFIC */
	
	// Remove preloader to prevent parent elements' CSS properties from popping the preloader out of its container		
	if (isGecko)
	{
		var bnDiv = document.getElementById("ew_BannerDiv907926");
		if (bnDiv)
		{
				var aDiv = bnDiv.firstChild;
				if (aDiv)
				{
					if (aDiv.nodeName.toLowerCase() == "a")
						aDiv.parentNode.removeChild(aDiv);
				}
		}
	}
	
	/* END AOL SPECIFIC */
	
	
}
	
//SERVE THE APPROPRIATE FILE
if (ew907926_weSupport) {
	document.writeln(weSupportTracker907926());
	if(ew_isIFrame) { 
		//serve the IFrame ad
		
		document.writeln(iframeHTML907926);
	}
	else 
	{
		document.writeln(flashHTML907926);
		document.writeln(flashTracker907926());
		if(!inDapIF)
		{
			if(isIe && document.readyState == 'complete') // page is already finished loading?
				ew_onLoad907926();
			else
			{
				if (window.addEventListener) window.addEventListener("load",ew_onLoad907926,false);
					else if (window.attachEvent) window.attachEvent("onload",ew_onLoad907926);
			}
		}	
		else
			ew907926_MSNDAP_weSupport();
	}
}
else { //serve failover
	
	if(!ew907926_turnOffExecution&&isFlashFailover&&false) {
		document.writeln(flashfailoverHTML907926);
		document.writeln(flashfailoverTracker907926());
	}
	else {
		document.writeln(failoverHTML907926);
		if(!ew907926_turnOffExecution)
			document.writeln(failoverTracker907926());
		else
			document.writeln(failoverTurnOffExecutionTracker907926());
	}
	// Reason for failover
	if (failReason == "browser")
		document.writeln(failoverReasonBrowserTracker907926());
	else if (failReason == "flash")
		document.writeln(failoverReasonFlashTracker907926());
}


if (inDapIF && inDapMgrIf)
	document.close();


