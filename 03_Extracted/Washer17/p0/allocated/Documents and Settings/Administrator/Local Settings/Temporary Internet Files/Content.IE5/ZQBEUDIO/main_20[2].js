function toggleAccessibility() {
    	var expdate = new Date ();
	expdate.setTime (expdate.getTime() + (365 * 24 * 60 * 60 * 1000));

	if (GetCookie ("accessibility") == "1") {
		SetCookie("accessibility","0",expdate,"","","");
	} else {
		SetCookie("accessibility","1",expdate,"","","");
	}
	window.location.href = unescape(window.location.pathname);
}

function checkAccessibility() {
	if (GetCookie("accessibility") == "1") {
		return true;
	} else {
		return false;
	}
}


var functionsForOnload = new Array();

function addToOnload(functionName) {
	functionsForOnload[functionsForOnload.length] = functionName;
}

function createRequest() {
    var request = null;
    try {
        request = new XMLHttpRequest();
    } catch(tryMicroSoft) {
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP");

        } catch(otherMicrosoft) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (failed) {
                request = null;
            }
        }
    }
    return request;
}

function sendRequest(req, url, callbackFn) {
    if (req == null) {
        alert("Error creating the request1 Object");
    } else {
        req.open("GET", url);
        req.onreadystatechange = callbackFn;
        req.send(null)
    }
}

/*
    Function: removeChildren
    Removes all the child elements of the specified node.

    Parameters:
    node - (_Element_) Node to remove children from.
*/
function removeChildren (node) {
    var len = node.childNodes.length;
    while (node.hasChildNodes()) {
        node.removeChild(node.firstChild);
    }
}

