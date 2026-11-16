


radio.browserName=navigator.appName;
radio.msxml4 = false;
radio.msxml3 = false;

if(radio.browserName=="Microsoft Internet Explorer")
{
document.write('<SCR' + 'IPT LANGUAGE=VBScript\> \n');
document.write('on error resume next \n');
document.write('radio.msxml4 = (IsObject(CreateObject("MSXML2.XMLHTTP.4.0"))) \n');
document.write('radio.msxml3 = (IsObject(CreateObject("MSXML2.XMLHTTP.3.0"))) \n');
document.write('<\/SCR' + 'IPT\> \n');}
else if(radio.browserName=='Netscape')
{
}

function radio(){
};

radio.userAgent = navigator.userAgent.toLowerCase();
radio.MIN_NS_VERSION = 7.1;
radio.SPECIAL_NS_VERSION = 8.0;
radio.MIN_WAOL_VERSION = 7.0;
radio.MIN_IE_VERSION = 5.5;
radio.MIN_AOLFORM_VERSION = 9.0;
radio.AOLFORMwidthAdjust = 6;
radio.AOLFORMHeightAdjust = 5;
radio.widthAdjust = 15;
radio.WINDOW_NAME= "radioaol";
radio.SORRY_PAGE = "sorry.html";
radio.MAC_SORRY_PAGE = "macSorry.html";
radio.CSERVE_PAGE = "csLaunch.html";
radio.CONTENT_PAGE = "content.html";
radio.XML_PAGE = "xmlParser.html";
radio.PLAY_PAGE = "PlayRadioNow.jsp";
radio.BLOCKER_PAGE = "popupBlocker.html";
radio.NEVER = new Date();
radio.NEVER.setFullYear(radio.NEVER.getFullYear()+ 10);
radio.DEFAULT_STATION = "-1";
radio.FAILURE = 0;
radio.SUCCESS = 1;
radio.REDIRECT = 2;

var _overrideDomain = null;
var _overrideNeedAuth = true;


radio.openPlayer = function(stationID, countryID, flavorID, ignoreAmp)
{
var station = radio.DEFAULT_STATION;
var aolVer = radio.waolVersion();

if(stationID && station.length)station = stationID;

var flavor = radio.flavor(countryID, flavorID);

if(radio.insideCompuServe())
{
if(!(countryID && countryID.length && countryID.toLowerCase()!= "us"))
{
var csUrl = radio.flavorURL(flavor)+ radio.CSERVE_PAGE;
window.open(csUrl);
return radio.REDIRECT;
}
}

if(!radio.meetsSystemRequirements(flavor))
{
var sorryUrl = radio.flavorURL(flavor);

if(!(countryID && countryID.length && countryID.toLowerCase()!= "us")&& radio.validMac())
{
sorryUrl += radio.MAC_SORRY_PAGE;
}
else
{
sorryUrl += radio.SORRY_PAGE;
}

if(aolVer == 0)
{
radio.doRedirect(sorryUrl);
}
else
{
window.open(sorryUrl);
}

return radio.REDIRECT;
}

if(!radio.validXMLParser())
{
var xmlUrl = radio.flavorURL(flavor)+ radio.XML_PAGE;

if(aolVer == 0)
{
radio.doRedirect(xmlUrl);
}
else
{
window.open(xmlUrl);
}

return radio.REDIRECT;
}

var height = radio.flavorHeight(flavor);
var width = radio.flavorWidth(flavor);
var launchURL = radio.baseURL(flavor)
+ "common/html/"
+ radio.PLAY_PAGE
+ "?stationid=" + station
+ "&auth=" + _overrideNeedAuth

if (countryID && countryID.length)launchURL += "&countryid=" + countryID;
if(flavorID && flavorID.length)launchURL += "&flavorid=" + flavorID;

width = (parseInt(width)- radio.widthAdjust).toString();

var options = "HEIGHT=" + height
+ ", WIDTH=" + width +
", RESIZABLE=FALSE, MENUBAR=FALSE, STATUS=FALSE, TOOLBAR=FALSE, LOCATION=FALSE, SCROLLBARS=FALSE";


if(aolVer >= radio.MIN_AOLFORM_VERSION)
{
width = (parseInt(width)+ radio.AOLFORMwidthAdjust).toString();
height = (parseInt(height)+ radio.AOLFORMHeightAdjust).toString();
launchURL += "&_AOLFORM=w" + width + ".h" + height + ".R";
document.location.href = launchURL;
return radio.SUCCESS;
}
else
{
var childWindow = window.open(launchURL, radio.WINDOW_NAME, options);
if(childWindow)
{
return radio.SUCCESS;
}

return radio.FAILURE;
}
}


radio.openSetup = function(countryID, flavorID, stationID)
{

var flavor = radio.flavor(countryID, flavorID);
var height = radio.flavorHeight(flavor);
var width = radio.flavorWidth(flavor);
var launchURL = radio.baseURL(flavor)+ "common/html/" + radio.PLAY_PAGE + "?setup=true"
+ "&stationid=" + stationID
+ "&countryid=" + countryID
+ "&flavorid=" + flavorID;

var options = "HEIGHT=" + height
+ ", WIDTH=" + width +
", RESIZABLE=FALSE, MENUBAR=FALSE, STATUS=FALSE, TOOLBAR=FALSE, LOCATION=FALSE, SCROLLBARS=FALSE";

var childWindow = window.open(launchURL, radio.WINDOW_SETUP_NAME, options);
if(childWindow)
{
return radio.SUCCESS;
}

return radio.FAILURE;
}



radio.ampInstalled = function()
{
return false;
}


radio.ampURL = function(stationID)
{
return "";
}


radio.insideCompuServe = function()
{
return (radio.userAgent.indexOf('cs 2000')!= -1);
}



radio.meetsSystemRequirements = function(flavor)
{
if(!flavor)flavor = "";
var valid = false;

if(radio.userAgent.indexOf('win')!= -1)
{
if((radio.validWAOL(flavor))|| radio.validIE()|| radio.validNS()|| radio.validFF())
{
valid = true;
}
}

return valid;
}


radio.validXMLParser = function()
{
var valid = false;

if(radio.validIE())
{
valid = (radio.msxml3 || radio.msxml4);
}
else
{
valid = true;
}

return valid;
}


radio.waolVersion = function()
{
var version = 0;
var pos1 = radio.userAgent.indexOf(' aol ');

if(pos1 !=-1)
{
var pos2 = radio.userAgent.indexOf(';', pos1 + 5);

try
{
version = parseFloat(radio.userAgent.substring(pos1 + 5, pos2));
}
catch (e)
{
}
}

return version;
}


radio.validNS = function()
{
var valid = false;
var version = 0;
var pos1 = radio.userAgent.indexOf('netscape/');

if(pos1 !=-1)
{
var pos2 = radio.userAgent.indexOf(' ', pos1 + 9);
try
{
version = parseFloat(radio.userAgent.substring(pos1 + 9, pos2));
}
catch (e)
{
}
}

if(version >= radio.MIN_NS_VERSION)
{
if(version < radio.SPECIAL_NS_VERSION)
{
valid = true;
}
else if (radio.userAgent.indexOf('msie')!= -1)
{
valid = true;
}
}

return valid;
}


radio.validFF = function()
{
var valid = false;
var version = 0;
var pos = radio.userAgent.indexOf('firefox/');

if(pos != -1)
{
if(radio.userAgent.indexOf('firefox/0')== -1)
{
valid = true;
}
}

return valid;
}


radio.validIE = function()
{
var valid = false;
var version = 0;
var pos1 = radio.userAgent.indexOf('msie ');

if(pos1 !=-1)
{

if(radio.userAgent.indexOf('opera')== -1)
{
var pos2 = radio.userAgent.indexOf(';', pos1 + 5);

try
{
version = parseFloat(radio.userAgent.substring(pos1 + 5, pos2));
}
catch (e)
{
}
}
}

if(version >= radio.MIN_IE_VERSION)
{
valid = true;
}

return valid;
}


radio.validWAOL = function(flavor)
{
if(!flavor)flavor = "";
var minWAOL = 0.0;

switch(flavor)
{
case "ukbb":
case "uknb":
case "ukbbnm":
minWAOL = 8.0;
break;

default:
minWAOL = radio.MIN_WAOL_VERSION;
break;
}

return ((radio.waolVersion()>= minWAOL)&& radio.validIE())
}


radio.validMac = function()
{
var valid = false;
var pos1 = radio.userAgent.indexOf('mac os x');

if(pos1 !=-1)
{
valid = true;
}

return valid;
}




radio.useAOLFORM = function()
{
return (radio.waolVersion()>= radio.MIN_AOLFORM_VERSION)
}


radio.flavor = function(countryID, overrideID)
{
var flavor = "usbb";

if(overrideID && overrideID.length)
{
flavor = overrideID.toLowerCase();
}
else
{
if(countryID && countryID.length)
{
flavor = countryID.toLowerCase()+ "bb";
}
}

return flavor;
}


radio.flavorURL = function(flavorID)
{
var flavorDir = "usbb";

if(flavorID && flavorID.length)flavorDir = flavorID.toLowerCase();

return radio.baseURL(flavorDir)+ flavorDir + "/html/";
}


radio.baseURL = function(flavor)
{
var domain;

if(_overrideDomain && _overrideDomain.length)
{
domain = _overrideDomain;
}
else
{
switch(flavor)
{
case "ukbb":
case "uknb":
case "ukbbnm":
domain = "rdlohbb-prod-web-rr.streamops.aol.com";
break;

case "frbb":
case "frnb":
case "frbbnm":
domain = "rdprsbb-prod-web-rr.streamops.aol.com";
break;

case "debb":
case "denb":
case "debbnm":
domain = "rdintlbb-prod-web-rr.streamops.aol.com";
break;

case "cabb":
case "canb":
case "cabbnm":
domain = "radcan-prod-web-rr.streamops.aol.com";
break;

case "usbb":
case "usnb":
case "usnbnm":
default:
domain = "radaol-prod-web-rr.streamops.aol.com";
break;
}
}

return "http://" + domain + "/radio/radioclient/";
}


radio.setDomain = function(domain)
{
_overrideDomain = domain;
}


radio.setAuth = function(needAuth)
{
_overrideNeedAuth = needAuth;
}


radio.flavorHeight = function(flavorID)
{
var height;

switch(flavorID)
{
case "ukbb":
case "uknb":
case "ukbbnm":
height = "342";
break;

default:
height = "357"
break;
}

return height;
}


radio.flavorWidth = function(flavorID)
{
var width;

switch(flavorID)
{
case "frbb":
case "frnbnm":
case "ukbb":
width = "786";
break;

default:
width = "785";
break;

}

return width;
}


radio.getCookie = function(name)
{
var myValue = "";

var myCookie;
var cookieAsString = document.cookie;
var expression = new RegExp(name + '=[^;]+');

while(expression.test(cookieAsString))
{
myCookie = cookieAsString.match(expression);
cookieAsString = cookieAsString.replace(expression, "");
}

if(myCookie)
{
var cookieValue = myCookie[0].match(/=(.*)/);
if(cookieValue && (cookieValue.length > 1))
{
myValue = cookieValue[1];
}
}

return myValue;
}


radio.setCookie = function(name, value, expires)
{
if(!expires)expires = radio.NEVER;

var cookieString = name + "=" + value;

if(expires)
{
cookieString += ';expires=' + expires.toGMTString();
}

document.cookie = cookieString;
}


radio.doRedirect = function(destURL)
{
try
{
var redirStr = 'window.location="' + destURL + '"';
setTimeout(redirStr, 200);
}
catch (e)
{
}
}



