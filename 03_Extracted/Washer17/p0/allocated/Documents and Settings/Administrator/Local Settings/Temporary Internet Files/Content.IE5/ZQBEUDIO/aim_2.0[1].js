/* ******** INSTALL AIM REDIRECT DELAY ********** */
function timer()
{
    offersUrl = 'http://www.aim.com/get_aim/thankyou_offers.adp';
    window.setTimeout ("location.href=offersUrl", 2000);
}

/***** AIMExpress "class" *****/
var AIMExpress = new Object();

/** The default values to use when values are missing in AIM_EXPRESS */
AIMExpress.defaults = {
    host: 'http://aimexpress.aim.com',
    checkurl: 'http://www.aol.com/ae/CheckAIM.html',
    buddyListWidth: 170,
    buddyListHeight: 430,
    buddyListX: 5,
    buddyListY: 5,
    loginWindowWidth: 725,
    loginWindowHeight: 400,
    useNative: false,
    autoLaunch: false,
    autoThrottle: 0,
    END:0
};

/** This is version number of this file, since we can't think of any better way:( */
AIMExpress.versionString = "$Revision: 1.15 $";

/**
 * Launch AIMExpress according to the properties defined in AIM_EXPRESS
 */
AIMExpress.start = function(auto) {
    if (!auto) {
	auto = false;
    }
    // Get local shortcuts for parametr objects
    var ae = window.AIM_EXPRESS;
    var ad = AIMExpress.defaults;

    // Grab defaults for unspecified values
    ae = ae ? ae : new Object();
    for (var key in ad) {
        if (ae[key] == void 0) {
            ae[key] = ad[key];
        }
    }
    // Init w/ values for direct launching
    var url = ae.host + '/Login.svc';
    var w = ae.loginWindowWidth;
    var h = ae.loginWindowHeight;
    var x=(screen.width-w)/2;
    var y=(screen.height-h)/2;

    // Revamp params if we're doing the CheckAIM.html thing first
    if (ae.useNative) {
        w = 100;
        h = 100;
        // Try moving offscreen in case we actually can
        x = y = 2000;
	url = ae.checkurl+ '?' + 
	    'host=' + escape(ae.host) + 
	    '&width=' + ae.buddyListWidth + 
	    '&height=' + ae.buddyListHeight + 
	    '&x=' + ae.buddyListX + 
	    '&y=' + ae.buddyListY +
	    '&auto=' + auto;
	// for < NS6.x open a window
	if (navigator.appName == "Netscape" && parseInt(navigator.appVersion) < 5) {
	    AIMExpress._openWindow(url,w,h,x,y);
	}
	// else open an IFrame
	else {
	    var myFrame = document.createElement("IFRAME");
	    myFrame.style.position = "absolute";
	    myFrame.style.overflow = "hidden";
	    myFrame.style.width = "0px";
	    myFrame.style.height = "0px";
	    myFrame.style.top= -1000;
	    myFrame.style.left= -1000;
	    myFrame.src = url;
	    document.body.appendChild(myFrame);
	}
    }
    else {
	url = url + '?' + 'host=' + escape(ae.host) + 
	'&width=' + ae.buddyListWidth + 
	'&height=' + ae.buddyListHeight + 
	'&x=' + ae.buddyListX + 
	'&y=' + ae.buddyListY +
	'&auto=' +auto;
	
	AIMExpress._openWindow(url,w,h,x,y);
    }
}

/**
 * open a window with the given URL.
 */
AIMExpress._openWindow =  function(url,w,h,left,top) {
  location.href = url;
   // var myWin = window.open(url, 'aeLogin', 'resizable=yes,scrollbars=yes,width=' + w + ',height=' + h + ',left=' + left + ',top=' + top);
   // if ( myWin && typeof(myWin.name) != 'undefined') {
	//myWin.focus();
   // }
}

/**
 * onload event handler for firing off autolaunched users
 */
AIMExpress.onload = function(anEvent) {
    // Call pre-existing onload first
    if (AIMExpress._oldload) {
        AIMExpress._oldload(anEvent);
    }

    // Now setup a timeout to fire the AIMExpress.start() method
    if (window.AIM_EXPRESS && window.AIM_EXPRESS.autoLaunch) {
        if (AIMExpress._canAutolaunch(AIM_EXPRESS.autoThrottle)) {
            setTimeout('AIMExpress.start(true)', 500);
        }
    }
}

/**
 * Return true if the user is allowed to autolaunch
 */
AIMExpress._canAutolaunch = function(aLimit) {
    var throttle = document.cookie.match(/ae40Throttle=([^;]*)/);

    // Check the lottery #
    if (!throttle) {
        throttle=Math.floor(Math.random()*10000);
        var xdate = new Date(new Date().getTime() + 365*24*3600*1000).toGMTString();
        document.cookie='ae40Throttle=' + throttle + '; expires=' + xdate;
    } else {
        throttle = throttle[1];
    }

    return (throttle >= aLimit);
}

// Set up onload method (and honor any existing method)
AIMExpress._oldload = window.onload;
window.onload = AIMExpress.onload;

