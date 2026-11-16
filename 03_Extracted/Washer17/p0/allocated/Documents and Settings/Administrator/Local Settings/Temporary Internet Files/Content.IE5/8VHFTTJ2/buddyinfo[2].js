var request1 = createRequest();
var request2 = createRequest();

function getBuddyInfo(sn) {

    var auth = false;
    if (sn && sn.length > 0) {
        auth = true;
    }

    if (auth) {
    
        var req1URL = "/fetchBuddyInfo?date=" + (new Date().getTime());
        var req2URL = "/fetchBuddyInfo?type=myinfo&date="  + (new Date().getTime());

        sendRequest (request1, req1URL, buddyListCallback);
        sendRequest (request2, req2URL, buddyListCallback);

        var unauthView = document.getElementById("bi_unauth_view");
        if (unauthView) unauthView.className = "hideDiv";
        var authView = document.getElementById("bi_auth_view");
        if (authView) authView.className = "showDiv";

    } else {
        showDefaultView();
    }
}

function setBuddyIconUrl(iconUrl) {
    var vanityIcon = document.getElementById("my_vi_buddyicon");
    if (vanityIcon) {
        var buddyIcon = iconUrl;
        if (!buddyIcon) {
            buddyIcon = "http://aimtoday.aolcdn.com/aimtoday_20/no_icon_new.gif";
        }
        vanityIcon.innerHTML = "<img src=\"" + buddyIcon + "\" hspace=\"0\" vspace=\"0\" border=\"0\">";
    } 
}

var buddyInfo = null;
var filter = DEFAULT_FILTER;
var display = DEFAULT_DISPLAY;
var sort = DEFAULT_SORT;
var LIST_MAX = 5;

// default filter - show profiles AND/OR away message
var DEFAULT_FILTER = "";

// default display - show all buddies
var DEFAULT_DISPLAY = "all";

var DEFAULT_SORT = "groupName";

// sort types
var SORT_TYPE = {
      "BUDDY_LIST": "groupName",
      "LAST_UPDATED": 1,
      "ALPHABETICAL": "aimId"
}

function buddyListCallback() {

    try {

        // make sure that buddy info doesn't alreaedy exist.
        if (!buddyInfo) {
            buddyInfo = new BuddyInfo();
        }

        if (request1.readyState == 4) {
            var obj = eval('(' + request1.responseText + ')');
            buddyInfo.storeBuddies(obj.response);
            request1 = createRequest();
        }

        if (request2.readyState == 4) {
            var obj = eval('(' + request2.responseText + ')');
            buddyInfo.storeMyInfo(obj.response);
            request2 = createRequest();
        }

    } catch (e) {}
}


/*
Function: bi_openTab
*/
function showBuddyInfoTab(tabName) {

    var buddiesContainer = document.getElementById("buddiesInfoContainer");
    var buddiesTab = document.getElementById("buddiesInfoTab");
    var myBuddyInfoContainer = document.getElementById("myBuddyInfoContainer");
    var myBuddyInfoTab = document.getElementById("myBuddyInfoTab");

    switch (tabName.id) {
        case "buddiesInfoTab":

            buddiesContainer.style.display = "block";
            buddiesTab.className = "focus_bi_tab";
            myBuddyInfoContainer.style.display = "none";
            myBuddyInfoTab.className = "unfocus_bi_tab";
            break;

        case "myBuddyInfoTab":

            buddiesContainer.style.display = "none";
            buddiesTab.className = "unfocus_bi_tab";
            myBuddyInfoContainer.style.display = "block";
            myBuddyInfoTab.className = "focus_bi_tab";
            break;
    }
}

function updateFilters() {
    var groupFilter = document.getElementById("groupFilter");
    removeChildren(groupFilter);
    if (buddyInfo) {
        buddyInfo.getGroupFilter(groupFilter);
    }
}

function updateDisplay () {

    var filterSelect = document.forms["bi_form"].elements["filter"];
    if (filterSelect) {
        filter = filterSelect.value;
    } else {
        filter = DEFAULT_FILTER;
    }

    var groupFilterSelect = document.forms["bi_form"].elements["groupFilter"];
    if (groupFilterSelect) {
        display = groupFilterSelect.value;
    } else {
        display = DEFAULT_DISPLAY;
    }

    var sortSelect = document.forms["bi_form"].elements["sort"];
    if (sortSelect) {
        sort = sortSelect.value;
    } else {
        sort = DEFAULT_SORT;
    }


    showPage(1, filter, display, sort, true);
}

/*
    Function: showPage
    Shows the BuddyInfo HTML content for the page index.

    Parameters:
    pageIndex - (_int_) the Page Index
*/
function showPage(pageIndex, filter, display, sort, sortFlag) {
    var parentContainer = document.getElementById("bi");
    if (parentContainer) {
        // remove the children
        removeChildren(parentContainer);
        if (buddyInfo) {
            buddyInfo.getDisplay(parentContainer, pageIndex, LIST_MAX, filter, display, sort, sortFlag);
        }
    }
}

function formatDate(dateObj) {
    var dateStr = "nothing";
    if (dateObj) {
        var month = dateObj.getMonth() + 1;
        var date = dateObj.getDate();
        var year = dateObj.getFullYear();
        var hr = dateObj.getHours();
        var min = dateObj.getMinutes();

        // need to make minutes 2 digits
        if (min < 10) {
            min = "0" + min;
        }
        var daypart = " A.M.";
        if (hr >= 12) {
            daypart = " P.M.";
            if (hr > 12) hr = hr - 12;
        }
        dateStr = hr + ":" + min + daypart + " " + month + "/" + date + "/" + year;
    }
    return dateStr;
}

function updateDivState(obj, id, img, expandImgSrc, closeImgSrc) {

    if (obj) {
        obj.onclick = function() {
            var div = document.getElementById(id);
            var className = div.className;
            switch (className) {
                case "expand":
                    div.className = "close";
                    swapImage(img, closeImgSrc);
                    break;
                case "close":
                    div.className = "expand";
                    swapImage(img, expandImgSrc);
                    break;
            }

        }
    }

}

function swapImage(imgContainer, imgSrc) {
    if (imgContainer) {
        imgContainer.src = imgSrc;
    }
}

function expandModule (imgContainer, parentId, closeImg, openImg) {
    if (parentId) {
        var divContainer  = document.getElementById(parentId);
        if (divContainer) {
            var className = divContainer.className;
            switch (className) {
                case "bi_mainContainer_close":
                    divContainer.className = "bi_mainContainer_open";
                    swapImage(imgContainer, openImg);
                    break;
                case "bi_mainContainer_open":
                    divContainer.className = "bi_mainContainer_close";
                    swapImage(imgContainer, closeImg);
                    break;
            }
        }
    }
}


function truncStr(str) {
    var newStr = "";
    if (str.length > 16) {
        newStr = str.substring(0, 16);
        newStr += "...";
    } else {
        newStr = str;
    }
    return newStr;
}

function BuddyInfo() {
    this.buddyObjArray = new Array();
}

//BuddyInfo.prototype.buddiesObj = null;
BuddyInfo.prototype.myInfoObj = null;
BuddyInfo.prototype.OFFLINE = "offline";
BuddyInfo.prototype.groupIndex = 0;
BuddyInfo.prototype.buddyIndex = 0;
BuddyInfo.prototype.buddyObjArray = null;
BuddyInfo.prototype.groupArray = null;

BuddyInfo.prototype.getBuddyObjArray = function() {
    return this.buddyObjArray;
}

BuddyInfo.prototype.storeBuddies = function(obj) {

//    this.buddiesObj = obj;
    this.parseObj(obj);
}

BuddyInfo.prototype.storeMyInfo = function(obj) {
//    this.myInfoObj = obj;
    this.parseMyInfo(obj);
}

BuddyInfo.prototype.parseObj = function(obj) {
    if (obj) {
        var parentContainer = document.getElementById("bi");
        if (parentContainer) {

            var statusCode = obj.statusCode;
            var statusText = obj.statusText;
            var requestId = obj.requestId;
            var dataObj = obj.data;
            var groups = dataObj.groups;
            if (groups) {

                var groupLen = groups.length;
                var str = "";
                var counter = 0;
                this.buddyObjArray = new Array();

                this.groupArray = new Array();
                for (var i = 0; i < groupLen; i++) {

                    var group = groups[i];
                    var groupName = group.name;
                    var buddies = group.buddies;

                    var groupObj = new Object();
                    groupObj.name = groupName;

                    var userList = new Array();
                    if (buddies) {

                        groupObj.total = buddies.length;
                        for (var j = 0; j < buddies.length; j++) {
                            if (groupName != "Recent Buddies") {
                                var buddyObj = new Object();
                                buddyObj.groupName = groupName;
                                buddyObj.aimId = buddies[j].aimId;
                                buddyObj.displayId = buddies[j].displayId;
                                buddyObj.state = buddies[j].state;
                                buddyObj.onlineTime = buddies[j].onlineTime;
                                buddyObj.idleTime = buddies[j].idleTime;
                                buddyObj.awayTime = buddies[j].awayTime;
                                buddyObj.icon = buddies[j].buddyIcon;
                                buddyObj.picon = buddies[j].presenceIcon;
                                buddyObj.awayMsg = buddies[j].awayMsg;
                                buddyObj.lastUpdate = 0;

                                buddyObj.profileMsg = buddies[j].profileMsg;
                                var displayInfo = false;
                                if (buddyObj.awayMsg || buddyObj.profileMsg) {
                                    displayInfo = true;
                                }

                                if (buddyObj.state != this.OFFLINE && displayInfo) {
                                    buddyObj.lastUpdate = this.getLastUpdate(buddyObj.onlineTime, buddyObj.awayTime, buddyObj.idleTime);
                                    this.buddyObjArray.push(buddyObj);
                                    userList.push (buddyObj);
                                }
                            }
                        }

                        groupObj.userList = userList;
                    }
                    this.groupArray.push(groupObj);
                }

                // update the filters
                updateFilters();
                showPage(1, "all", "all", "groupName", true);
            }
        }
    }
}

BuddyInfo.prototype.parseMyInfo = function(obj) {
    if (obj) {
        var statusCode = obj.statusCode;
        var statusText = obj.statusText;
        var requestId = obj.requestId;
        var data = obj.data;
        if (data) {
            var users = data.users;
            if (users && users.length > 0) {
                // only get the first one
                var infoArray = new Array();
                var user = users[0];
                if (user) {
                    this.myInfoObj = new Object();
                    this.myInfoObj.aimId = user.aimId;
                    this.myInfoObj.displayId = user.displayId;
                    this.myInfoObj.state = user.state;
                    this.myInfoObj.onlineTime = user.onlineTime;
                    this.myInfoObj.icon = user.buddyIcon;
                    setBuddyIconUrl(this.myInfoObj.icon);
                    this.myInfoObj.picon = user.presenceIcon;
                    this.myInfoObj.profileMsg = user.profileMsg;
                    this.myInfoObj.awayMsg = user.awayMsg;
                    this.myInfoObj.awayTime = user.awayTime;
                    this.myInfoObj.idleTime = user.idleTime;

                    if (this.myInfoObj.state != this.OFFLINE) {
                        this.myInfoObj.lastUpdate = this.getLastUpdate(this.myInfoObj.onlineTime, this.myInfoObj.awayTime, this.myInfoObj.idleTime);
                    }
                    infoArray.push(this.myInfoObj);
                    this.displayMyInfo(infoArray);
                }
            }
        }
    }
}

BuddyInfo.prototype.displayMyInfo = function (infoArray) {

    var myInfoContainer = document.getElementById("my_bi");
    this.getHTML (myInfoContainer, infoArray, 1, 1, "", "", false)
}

BuddyInfo.prototype.getGroupFilter = function (groupFilter) {
    if (groupFilter) {


        var defaultOption = document.createElement("option");
        defaultOption.setAttribute("value", "all");
        defaultOption.appendChild(document.createTextNode("All"));
        groupFilter.appendChild(defaultOption);

        for (var i=0; i<this.groupArray.length; i++) {
            var group = this.groupArray[i];
            if (group) {
                var groupName = group.name;
                var groupTotal = group.total;
                if (groupTotal) {
                    var userList = group.userList;
                    var totalOnline = 0;
                    if (userList) {
                        totalOnline = userList.length;
                    }
                    var option = document.createElement("option");
                    option.setAttribute("value", group.name);
                    option.appendChild(document.createTextNode(group.name + " (" + totalOnline + "/" + groupTotal + ")"));
                    groupFilter.appendChild(option);
                }
            }
        }
    }
}

/*
    Function: getDisplay
    Creates the HTML markup for Buddy Info

    Parameters:
    parentContainer - (_Element_) The parent element to append the DOM elements to.
    buddyObjArray - (_Array_) An array of buddyObj Objects
    pageIndex - (_int_) The page index used which will be used to calculate the start number.
    listMax - (_int_) list max to show per page

    TODO: maybe create a function like getTag where tag name, attributes, and text is passed and the HTML market is returned?
*/
BuddyInfo.prototype.getDisplay = function (parentContainer, pageIndex, listMax, filter, display, sort, sortFlag) {

    switch (display) {
        // get ALL
        case "all":
            this.displayAll(parentContainer, pageIndex, listMax, filter, sort, sortFlag);
            break;

        // get By Group
        default:

            this.displayGroup(parentContainer, pageIndex, listMax, display, filter, sort, sortFlag);
            break;
    }
}


BuddyInfo.prototype.displayGroup = function(parentContainer, pageIndex, listMax, display, filter, sort, sortFlag) {

    if (this.groupArray) {

        if (parentContainer) {

            var userList = null;
            var filteredObjArray = null;
            for (var i=0; i< this.groupArray.length; i++) {
                var groupName = this.groupArray[i].name;
                if (groupName != display) {
                    continue;
                }
                userList = this.groupArray[i].userList;
                if (sortFlag) {
                    this.sortList(userList, sort);
                }

                var groupDiv = document.createElement("div");
                groupDiv.className = "groupHeader";
                groupDiv.appendChild(document.createTextNode(groupName));

                // add groupName
                parentContainer.appendChild(groupDiv);

                filteredObjArray = this.getFilteredObjArray(userList, filter);
                this.getHTML(parentContainer, filteredObjArray, pageIndex, listMax, filter, sort, false);
            }

            var pageIndexContainer = this.getPageIndex(filteredObjArray, pageIndex, listMax, display, filter, sort);
            parentContainer.appendChild(pageIndexContainer);
        }
    }

}

BuddyInfo.prototype.displayAll = function(parentContainer, pageIndex, listMax, filter, sort, sortFlag) {
    if (this.buddyObjArray) {
        if (sortFlag) {
            this.sortList(this.buddyObjArray, sort);
        }
        if (parentContainer) {

            var showGroupHeader = false;
            if (sort == "groupName") {
                showGroupHeader = true;
            }

            var filteredObjArray = this.getFilteredObjArray(this.buddyObjArray, filter);
            this.getHTML(parentContainer, filteredObjArray, pageIndex, listMax, filter, sort, showGroupHeader);
            var pageIndexContainer = this.getPageIndex(filteredObjArray, pageIndex, listMax, "all", filter, sort);
            parentContainer.appendChild(pageIndexContainer);
        }
    }
}


BuddyInfo.prototype.getFilteredObjArray = function(objArray, filter) {
    var newObjArray = new Array();
    switch (filter) {
        case "awayMsg":
        case "profileMsg":
            for (var i=0; i< objArray.length; i++) {
                var buddyObj = objArray[i];
                var buddyObjWithFilter = buddyObj[filter];
                if (buddyObjWithFilter) {
                    newObjArray.push(buddyObj);
                }
            }
            return newObjArray;
            break;
        default:
            return objArray;
    }

}

BuddyInfo.prototype.getHTML = function(parentContainer, userArray, pageIndex, listMax, filter, sort, showGroupHeader) {


    if (parentContainer) {

        if (userArray) {

            var start = (pageIndex - 1) * listMax;
            var end = start + listMax;

            // make sure that end value is not larger than the array length!
            if (end > userArray.length) {
                end = userArray.length;
            }

            for (var i = start; i < end; i++) {

                var buddyObj = userArray[i];
                if (buddyObj) {
                    if (showGroupHeader) {

                        // TODO: Show only group name once! There's probably a better way to do this so change it if you know of
                        // a better solution! show group list if first in the list and also show when group list changes!
                        if (i == start || ((i > 0) && buddyObj.groupName != userArray[i - 1].groupName)) {
                            buddyObj.showGroupName = true;
                        } else {
                            buddyObj.showGroupName = false;
                        }
                        if (buddyObj.showGroupName) {
                            var groupDiv = document.createElement("div");
                            groupDiv.className = "groupHeader";
                            groupDiv.appendChild(document.createTextNode(buddyObj.groupName));

                            // add groupName
                            parentContainer.appendChild(groupDiv);
                        }
                    }

                    var buddyContainerDiv = document.createElement("div");
                    buddyContainerDiv.className = "buddyContainer";

                    var buddyIcon = buddyObj.icon;
                    if (!buddyIcon) {
                        buddyIcon = "http://aimtoday.aolcdn.com/aimtoday_20/no_icon_new.gif";
                    }

                    var buddyIconContainer = document.createElement("div");
                    buddyIconContainer.className = "bi_icon";
                    buddyIconContainer.innerHTML = "<img src=\"" + buddyIcon + "\" alt=\"Buddy Icon\" vspace=\"0\" hspace=\"0\" border=\"0\" width=\"48\" height=\"48\">";
                    buddyContainerDiv.appendChild(buddyIconContainer);

                    var contentContainer = document.createElement("div");
                    contentContainer.className = "bi_container";

                    // line with screenName and promo link to AIM Pages
                    var div1 = document.createElement("div");
                    
                    var sn = truncStr(buddyObj.aimId);
                    var snContainer = document.createElement("span");
                    snContainer.className = "bi_sn";
                    var imLink = document.createElement("a");
                    imLink.setAttribute("href", "aim:goim?screenname=" + buddyObj.aimId);
                    var sn = truncStr(buddyObj.aimId);
                    imLink.appendChild(document.createTextNode(sn));

                    snContainer.appendChild(imLink);
                    div1.appendChild(snContainer);
                    div1.appendChild(document.createTextNode(" | "));

                    // AIM Pages promo
                    var promoContainer = document.createElement("span");
                    promoContainer.className = "bi_ap";
                    var promoLink = document.createElement("a");
                    promoLink.setAttribute("href", "http://www.aimpages.com/" + buddyObj.aimId + "/profile.html");
                    promoLink.onclick = function() {
                        omo("bdsinfo_" + (i+1));
                    }
                    promoLink.appendChild(document.createTextNode("View AIM Page"));
                    promoContainer.appendChild(promoLink);
                    div1.appendChild(promoContainer);
                    contentContainer.appendChild(div1);
                    
                    var div2 = document.createElement("div");
                    div2.className = "bi_content";

                    var timeDiv = document.createElement("div");
                    var presenceImgTag = document.createElement("img");
                    presenceImgTag.setAttribute("src", "http://api.oscar.aol.com/SOA/key=BETA/presence/" + buddyObj.aimId);
                    presenceImgTag.setAttribute("alt", "Presence");
                    presenceImgTag.setAttribute("vspace", "0");
                    presenceImgTag.setAttribute("hspace", "2");
                
                    timeDiv.appendChild(presenceImgTag);

                    var showUpdated = true;
                    // away Message Update Time
                    if (buddyObj.awayMsg) {

                        if (buddyObj.awayTime) {
                            var awayDate = new Date((new Date()).getTime() - (buddyObj.awayTime * 1000));
                            var awayTimeText = document.createTextNode("Away since " + formatDate(awayDate));
                            timeDiv.appendChild(awayTimeText);
                            showUpdated = false;
                        } else {
                            showUpdated = true;
                        }

                    }

                    if (showUpdated) {
                    
                        var buddyInfoTimeText = "";
                        if ( buddyObj.lastUpdate ) {
                            var updateDate = new Date((new Date()).getTime() - (buddyObj.lastUpdate * 1000));
                            buddyInfoTimeText = "Buddy Info last updated: " + formatDate(updateDate);
                        } else {
                            if (buddyObj.state) {
                                buddyInfoTimeText = buddyObj.state;
                            } else {
                                buddyInfoTimeText = "Offline";
                            }
                        }
                        timeDiv.appendChild(document.createTextNode(buddyInfoTimeText));
                        
                    }

                    div2.appendChild(timeDiv);
                    
                    var profile = buddyObj.profileMsg;
                    var awayMsg = buddyObj.awayMsg;
                    
                    if (profile || awayMsg) {                    

                        // dynamic div container that expands and collapses
                        var dynamicDiv = document.createElement("div");
                        dynamicDiv.id = parentContainer.id + "-buddy" + i ;
                        dynamicDiv.className = "close";

                        var dynamicContentDiv = document.createElement("div");
                        dynamicContentDiv.className = "ml10";

                        var imgDiv = document.createElement("div");
                        imgDiv.className = "bi_picon";

                        var img = document.createElement ("img");
                        img.id = parentContainer.id + "-buddyImg" + i;
                        img.setAttribute("src", "http://aimtoday.aolcdn.com/aimtoday_20/icon_arrow_uncollapsed.gif");
                        img.vspace = "3";
                        img.hspace = "0";

                        imgDiv.appendChild(img);
                        dynamicDiv.appendChild(imgDiv);

                        // Away message block
                        if (buddyObj.awayMsg && buddyObj.awayMsg.length > 0) {

                            var awayMsgDiv = document.createElement("div");
                            awayMsgDiv.innerHTML = buddyObj.awayMsg;
                            dynamicContentDiv.appendChild(awayMsgDiv);

                            var clearDiv = document.createElement("div");
                            clearDiv.className = "clearBoth";
                            dynamicContentDiv.appendChild(clearDiv);
                        }

                        updateDivState(dynamicDiv, dynamicDiv.id, img, "http://aimtoday.aolcdn.com/aimtoday_20/icon_arrow_collapsed.gif", "http://aimtoday.aolcdn.com/aimtoday_20/icon_arrow_uncollapsed.gif");

                        // Buddy Profile block
                        if (buddyObj.profileMsg) {
                            var profileMsgDiv = document.createElement("div");
                            profileMsgDiv.innerHTML = buddyObj.profileMsg;
                            dynamicContentDiv.appendChild(profileMsgDiv);
                        }

                        dynamicDiv.appendChild(dynamicContentDiv);
                        div2.appendChild(dynamicDiv);
                        
                    } else {
                    
                        var clearDiv = document.createElement("div");
                        clearDiv.className = "clearBoth";
                        div2.appendChild(clearDiv);                    
                    
                    }

                    contentContainer.appendChild(div2);
                    buddyContainerDiv.appendChild(contentContainer);
                    parentContainer.appendChild(buddyContainerDiv);

                    // light gray divider line
                    var divider = document.createElement("div");
                    divider.className = "divider";
                    divider.setAttribute("align", "center");
                    parentContainer.appendChild(divider);
                }
            }
        }
    }
}

BuddyInfo.prototype.getPageIndex = function(objArray, pageIndex, listMax, display, filter, sort) {

    var pageIndexContainer = document.createElement("div");
    pageIndexContainer.className = "bi_pageIndex";

    // Calculate the total number of pages
    var totalPages = objArray.length / listMax;
    if (totalPages > (Math.floor(totalPages))) {
        totalPages  = Math.floor(totalPages) + 1;
    }

    // TODO: NEED LEFT/RIGHT ARROW GRAPHICS
    if (totalPages > 0) {
        if (pageIndex > 1) {
            var backLink = document.createElement("a");
            backLink.setAttribute("href", "javascript:showPage(" + (pageIndex - 1) + ", '" + filter + "','" + display + "','" + sort + "', false);");

            var backImg = document.createElement("img");
            backImg.setAttribute("src", "http://aimtoday.aolcdn.com/aimtoday_20/pagination_arrow_left.gif");
            backImg.setAttribute("border", "0");
            backImg.setAttribute("vspace", "0");
            backLink.appendChild(backImg);
            
            pageIndexContainer.appendChild(backLink);
        }

        pageIndexContainer.appendChild(document.createTextNode(" "));
        pageIndexContainer.appendChild(document.createTextNode(pageIndex + "/" + totalPages));
        pageIndexContainer.appendChild(document.createTextNode(" "));

        if (pageIndex < totalPages) {
            var nextLink = document.createElement("a");
            nextLink.setAttribute("href", "javascript:showPage(" + (pageIndex + 1) + ", '" + filter + "','" + display + "','" + sort + "', false);");

            var nextImg = document.createElement("img");
            nextImg.setAttribute("src", "http://aimtoday.aolcdn.com/aimtoday_20/pagination_arrow_right.gif");
            nextImg.setAttribute("border", "0");
            nextImg.setAttribute("vspace", "0");

            nextLink.appendChild(nextImg);
            pageIndexContainer.appendChild(nextLink);
        }
        pageIndexContainer.appendChild(document.createTextNode(" | "));
    }


    var aTag2 = document.createElement("a");
    aTag2.setAttribute("href", "http://buddyinfo.aim.com/away");
    aTag2.onclick = function() {
       omo("bdsinfo_1"); 
    }
    aTag2.appendChild(document.createTextNode("View All"));
    pageIndexContainer.appendChild(aTag2);

    return pageIndexContainer;
}

BuddyInfo.prototype.sortType = null;
/*
    Function: sortList
    Sorts the buddylist

    Parameters:
    buddyList - (_Array_) List to be sorted
    type - (_String_) Property to sort by.
*/
BuddyInfo.prototype.sortList = function(buddyList, type) {
    sortType = type;
    buddyList.sort(this.sortByType);
}

BuddyInfo.prototype.sortByType = function (a, b) {

   var x = a[sortType];
   var y = b[sortType];

   if (isNaN(x)) {
        x = x.toLowerCase();
   }

   if (isNaN(y)) {
        y = y.toLowerCase();
   }

   return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

BuddyInfo.prototype.getLastUpdate = function(onlineTime, awayTime, idleTime) {

    var lastUpdate = onlineTime;
    try {
        if (isNaN(awayTime) && isNaN(idleTime)) {
            return lastUpdate;
        }
        if (isNaN(awayTime)) {
            if (!isNaN(idleTime)) {
                lastUpdate = idleTime;
            }
        } else if (isNaN(idleTime)){
            if (!isNaN(awayTime)) {
                lastUpdate = awayTime;
            }
        } else {
            if (awayTime < idleTime) {
                lastUpdate = awayTime;
            } else {
                lastUpdate = idleTime;
            }
        }
    } catch (e) {}
    return lastUpdate;
}
  
function showDefaultView() {
    var unauthView = document.getElementById("bi_unauth_view");
    if (unauthView) unauthView.className = "showDiv";
    var authView = document.getElementById("bi_auth_view");
    if (authView) authView.className = "hideDiv";
}

// addToOnload("getBuddyInfo()");
