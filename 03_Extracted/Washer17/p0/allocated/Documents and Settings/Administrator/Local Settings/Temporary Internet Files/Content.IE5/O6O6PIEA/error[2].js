function Localize(myString) {return myString;}

// Find the error code and language parameters
var gGenericCode = "C0FE1800";
var gDefaultCode = "C0FE1801";
var gCode = GetQueryParameter("code", gDefaultCode);
var gSSM = GetQueryParameter("ssm", "false");
var gCHM = GetQueryParameter("chm", "true");
var gPH = GetQueryParameter("ph", null);
var gASPX = GetQueryParameter("aspxerrorpath", null);
var gRID = GetQueryParameter("reportid", null);
var gTitle = "";

//
// GetQueryParameter
//
// This function was copied from compatibility.js.  We should periodically
// sync this implementation to the version there, to get any bug fixes, etc.
//
function GetQueryParameter(name, defaultValue)
{
	var returnValue = null;
	if (defaultValue != null)
		returnValue = defaultValue;

	queryString = document.location.search;

	var matchArray = eval("queryString.match(/" + name + "=([^&]*)/)");
	if (matchArray != null) {
		returnValue = matchArray[1];
		if ((returnValue != null) && (returnValue != ""))
			returnValue = decodeURIComponent(returnValue.replace(/\+/g, " "));	// remove both %escapes AND the "+" char
	}

	return returnValue;
}

function SetReportID(reportID)
{
	var rpt = document.getElementById("ReportCodeSpan");
	if (rpt != null) {
		rpt.innerHTML = reportID;

	var div = document.getElementById("ReportID");
	if (div != null)
		div.className = "ErrorInfoViz";
	}
}

function reloadTop()
{
	var myLocation;
	var locale = "/en-us/";	// Default locale is en-us
	
	var match = /\/[a-z][a-z]-[a-z][a-z]\//i.exec(document.URL);
	if( match != null )
		locale = match[0];	// Found locale in the URL

	if( gPH == null )
		myLocation = "http://" + document.location.hostname + locale;
	else
		myLocation = "http://" + gPH + locale;

    try {
        top.location.replace(myLocation);
    } catch (ex) {
        top.location = myLocation;
    }
}

function PageLoaded()
{
	document.title = gTitle;
}

function InitializePage(forSafari)
{
	// Before we show ANYTHING, check to see if we're embedded in an
	// iframe.  If we are, then assume we should show "minimal" formatting...
	if (top != window) {
		var con = document.getElementById("Content");
		if (con != null)
			con.className = "embedded";
	}

	// We should call error-report only if this was not a ASP.NET error.. because we don't want
	// to compound the situation by asking the server to execute more aspx pages.
	// error-report.aspx is used to generate the ReportID string seen by the user.
	if( gASPX == null )
	{
		// If we didn't get the reportid as URL parameter, call error-report
		if( gRID == null )
		{
			var url = document.URL;
			url = url.replace(/error.htm\?.*$/, "common/error-report.aspx");
			url += "?code=" + gCode;

			// We want to call ReportID only if we are getting the PrimaryHost.. because otherwise,
			// we are not sure where we will land for error-report.
			// Actually, most probably we will land on CDN, which is not a good idea.
			if( gPH != null )
			{
				url = url.replace(/http:\/\/[^\/]+.+\/([0-9]+)\//, "http://" + gPH + "/$1/");
				document.write("<iframe class='offscreen' src='" + url + "' height=1 width=1 border=0></iframe>");
			}
		}
		else
			SetReportID(gRID);
	}

	// Try to find the DIV element that corresponds to that error
	var div = document.getElementById("E" + gCode);
	if (div == null)
		div = document.getElementById("E" + gGenericCode);

	// Display the appropriate error message block...
	if (div != null) {
		// Take the content of the h1 element and set that as
		// the window's title.
		var h = div.getElementsByTagName("h1");
		if ((h != null) && (h.length > 0)) {
			// always hide the first h1 element, because we copy out the
			// content of it into the PageTitle element!
			h[0].style.display = "none";
			var t = h[0].innerHTML;
			if (t != null) {
				gTitle = t;
				var tdiv = document.getElementById("PageTitle");
				if (tdiv != null) {
					tdiv.innerHTML = t;
					tdiv.style.display = "block";
				}
			}
		}

		// Now that we've mucked with the block and the header and all, show the actual
		// error message block...
		var vizDiv = document.getElementById("ErrorMessage");
		if (vizDiv != null)
			vizDiv.innerHTML = div.innerHTML;
	}

	// Now find the ErrorCode block, and insert the error code there...
	var ec = document.getElementById("ErrorCodeSpan");
	if (ec != null)
		ec.innerHTML = gCode;

	var div = document.getElementById("ErrorCode");
	if (div != null)
		div.className = "ErrorInfoViz";

	// If we're supposed to show the support message, show it.
	if (gSSM != "false") {
		var ssmdiv = document.getElementById("SupportMessage");
		if (ssmdiv != null)
			ssmdiv.style.display = "block";
	}

	// If we're supposed to show the click here link
	if (gCHM != "false") {
		var chmdiv = document.getElementById("ClickHereMessage");
		if (chmdiv != null)
			chmdiv.style.display = "block";
	}
}

InitializePage();
