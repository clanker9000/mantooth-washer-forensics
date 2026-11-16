function vi_createRequest() {
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

var vi_request1 = vi_createRequest();

function getVanityInfo() {
    var rand=Math.floor(Math.random()*100);
    vi_sendRequest (vi_request1, "/fetchVanityInfo/?cb="+rand, vanityListCallback);
}

function vi_sendRequest(req, url, callback) {
    if (req == null) {
        alert("Error creating the request Object");
    } else {
        req.open("GET", url);
        req.onreadystatechange = callback;
        req.send(null)
    }
}

var vanityInfo = null;

function vanityListCallback() {
    try {
        if (vi_request1.readyState == 4) {
            var obj = eval('(' + vi_request1.responseText + ')');
//            vanityInfo.storeBuddies(obj.response);
//            vi_request1 = createRequest();
	    vi_update(obj.response);
        }

    } catch (e) {}
}

function vi_update(obj) {
        var statusCode = obj.statusCode;
        var statusText = obj.statusText;
        var dataObj = obj.data;

        var onlineTimeHours = Math.round(dataObj.onlineTime / 3600);

        (onlineTimeHours == 0) ? onlineTimeHours = 1: 0;

        var avgImsSent = Math.round(dataObj.imsSent / onlineTimeHours);
        var avgImsReceived = Math.round(dataObj.imsReceived / onlineTimeHours);

        document.getElementById('vi_imssent').innerHTML = avgImsSent+"/hr";
        document.getElementById('vi_imsrecv').innerHTML = avgImsReceived+"/hr";
}


function showVanityInfoTab(tabName) {
	alert("showing");
    var myVanityInfoContainer = document.getElementById("myVanityInfoContainer");

}

function vi_expandModule (imgContainer, parentId, closeImg, openImg) {
    if (parentId) {
        var divContainer  = document.getElementById(parentId);
        if (divContainer) {
            var className = divContainer.className;
            switch (className) {
                case "vi_mainContainer_close":
                    divContainer.className = "vi_mainContainer_open";
                    swapImage(imgContainer, openImg);
                    break;
                case "vi_mainContainer_open":
                    divContainer.className = "vi_mainContainer_close";
                    swapImage(imgContainer, closeImg);
                    break;
            }
        }
    }
}

function vi_convertTime(tot_seconds) {
	var tot_minutes = parseInt(tot_seconds/60);

	var hours = parseInt(tot_minutes/60);
	var days = parseInt(hours/24);
	var minutes = parseInt(tot_minutes - (hours*60));

	var hours_mins = new Array();
	hours_mins[0] = minutes;
	hours_mins[1] = (hours - (days*24));
	hours_mins[2] = days;
	return hours_mins;
}

function vi_getDate() {
	var myDate=new Date();
	var year = "" + myDate.getFullYear();
	var monthInt = ( myDate.getMonth() + 1)
	var date = myDate.getDate();
	var monthString = "";
	switch (monthInt){
	case 1:
		monthString = "Jan. ";
		break;
	case 2:
		monthString = "Feb. ";
		break;
	case 3:
		monthString = "Mar. ";
		break;
	case 4:
		monthString = "Apr. ";
		break;
	case 5:
		monthString = "May. ";
		break;
	case 6:
		monthString = "Jun. ";
		break;
	case 7:
		monthString = "Jul. ";
		break;
	case 8:
		monthString = "Aug. ";
		break;
	case 9:
		monthString = "Sep. ";
		break;
	case 10:
		monthString = "Oct. ";
		break;
	case 11:
		monthString = "Nov. ";
		break;
	case 12:
		monthString = "Dec. ";
		break;
	}


	var dateString = monthString + date + " '" + year.substring(2);
	return dateString;
}

//addToOnload("getVanityInfo()");
