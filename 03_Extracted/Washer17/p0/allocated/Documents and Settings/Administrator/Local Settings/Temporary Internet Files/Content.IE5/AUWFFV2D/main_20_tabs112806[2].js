	var tab = new Array(); //array of each tab object
		var tabProps = new Array(); //array of the name and url of each tab -- has to be seperate from it's tab for json.
		var tabTextNode = new Array();
		var tabNum = 0;
		var okOpen = 1;
		var nameBoxOpen = 0;
		var isIE = false;
		var isSafari = false;
		var topAdjust = 0;
		var leftAdjust = 0;
		var finalTop = 45;
		var finalLeft = 10;
		focusTabName = 'aimtoday';
		var timer=0;
		var time=1500;
		var expireDate = new Date();
		(window.ActiveXObject)?isIE=true:isIE=false;
		(navigator.userAgent.indexOf('AppleWebKit') > -1)?isSafari=true:isSafari=false;

		function initTabs() {  //the page has to be completely loaded before DOM objects can be found or manipulated
			var aimToday = document.getElementById('aimToday');
			var editableTabs = document.getElementById('editableTabs');
			var aimtodayContent = document.getElementById('aimtodayContent');
			var showRight = document.getElementById('showRight');
			var hideRight = document.getElementById('hideRight');
			var showLeft = document.getElementById('showLeft');
			var hideLeft = document.getElementById('hideLeft');
			
			if(!getCookieValue('newAtTab')) {
				createAimPages();
			}
			populateExistingTabs();
		}
		
		function createAimPages() {
				tabProps[0] = new Object();
				tabProps[0].name = 'AIM';
			    tabProps[0].url = 'http://www.aim.com/';

				storeCookie(tabProps);
		}
		
		
		function populateExistingTabs(){
			 if(getCookieValue('newAtTab')) { //if there is a cookie tab
			 	if(getCookieValue('newAtTab') != 'none'){ 
					tabProps = getCookieValue('newAtTab').parseJSON(); //parse json object as json can't handle dom manipulation
					var tabFrag = document.createDocumentFragment(); //improves DOM manipulation efficiency
					for (i=0;i<tabProps.length;i++) {
						//tab[i] = document.createElement('span');
						tab[i] = document.createElement('a');
						tab[i].setAttribute('id',i);
						tab[i].onclick = showOtherPages;
						tab[i].setAttribute('href','javascript:void(0)');
						tab[i].onmouseover = function () {
							openDelay(this);
						}
						tab[i].onmouseout = function () {
							hideDelay();
							okOpen=0;
							timer=time; //so there'll be the same delay on the next tab
						}
						tabTextNode[i]= document.createTextNode(tabProps[i].name);
						tab[i].appendChild(tabTextNode[i]);
						tabFrag.appendChild(tab[i]);
						tabNum = i + 1; //so createTab() starts at the right index
					}
					editableTabs.appendChild(tabFrag);
				}
			 }
			if (findFocusTab() == -1) {
				showAimToday(); //determine if a tab is in focus and focus it here if needed.
			} else {
				focusTab();
			}
		}
		function createTab() {
			var tabName = checkName(document.getElementById('tabName').value);
			var tabURL = document.getElementById('tabURL').value;
			if (isValidURL(tabURL)){
				tab[tabNum] = document.createElement('a');
				tab[tabNum].setAttribute('id',tabNum);
				tabProps[tabNum] = new Object();
				tabProps[tabNum].name = tabName;
				tabProps[tabNum].url = tabURL;
				tab[tabNum].onclick = showOtherPages;
				tab[tabNum].onmouseover = function () {
					openDelay(this);
				}
				tab[tabNum].onmouseout = function () {
					hideDelay();
					okOpen=0;
					timer=time;
				}
				tabTextNode[tabNum]= document.createTextNode(tabProps[tabNum].name);
				tab[tabNum].appendChild(tabTextNode[tabNum]);
				editableTabs.appendChild(tab[tabNum]);
				tabId = tabNum;
				tabNum++;
				closeTabBox();
				storeCookie(tabProps);
				showOtherPages();
			} else {
				alert('Please Enter Valid URL');
			}
		}
		
		function addProgramLink(copy, url){
			document.getElementById('tabName').value = copy;
			document.getElementById('tabURL').value = url;
		}
		

		function deleteAllTabs(){
			while(editableTabs.hasChildNodes()){
				editableTabs.removeChild(editableTabs.firstChild);
				tabNum = 0;
			}
		}
		function deleteTab(){
			deleteAllTabs();
			if(tabId > -1)
			{
				tab.splice(tabId,1);
				tabProps.splice(tabId,1);
			}
			if(tabProps.length == 0){
				document.cookie = "newAtTab=none;expires=" + expireDate.toGMTString() + ";"; //if there are no tabs. don't want to delete cookie, because then populateExistingTabs() would create a aimpages tab
			} else {
				storeCookie(tabProps);
			}
			okOpen = 0;
			closeControlMenu();
			populateExistingTabs();
		}

		function storeCookie(obj) {
			var jTab= obj.toJSONString();
			
			expireDate.setMonth(expireDate.getMonth() + 6);
			document.cookie = "newAtTab=" + jTab + ";expires=" + expireDate.toGMTString() + ";";
 
		}
		
		function getCookieValue(cookieName)
		{
   			var cookieValue = document.cookie;
   			var cookieStartsAt = cookieValue.indexOf(" " + cookieName + "=");

   			if (cookieStartsAt == -1)
   			{
      			cookieStartsAt = cookieValue.indexOf(cookieName + "=");
   			}

   			if (cookieStartsAt == -1)
   			{
      			cookieValue = null;
   			}
   			else
   			{
      			cookieStartsAt = cookieValue.indexOf("=", cookieStartsAt) + 1;
      			var cookieEndsAt = cookieValue.indexOf(";", cookieStartsAt);
      			if (cookieEndsAt == -1)
      			{
         			cookieEndsAt = cookieValue.length;
      			}
      			cookieValue = unescape(cookieValue.substring(cookieStartsAt,
         		cookieEndsAt));
   			}
			return cookieValue;
			
		}

		//set pos for tabs.
		function setPos(obj){
			if (isIE) {
				topAdjust = 1;
				leftAdjust = 15;
			} else if (isSafari) {
				topAdjust = 1;
				leftAdjust = 15;
			}
			objTop = obj.offsetTop;
			objLeft = obj.offsetLeft;
			objHeight = obj.offsetHeight;
			finalTop = objTop + objHeight + topAdjust;
			finalLeft = objLeft + leftAdjust;
			//alert(objTop);
		} 
		
		function openAddTabBox(obj){
			var addTabBox = document.getElementById('addTabBox');
			setPos(obj);
			addTabBox.style.display = 'block';
			addTabBox.style.top = finalTop;
			addTabBox.style.left = finalLeft;
			document.getElementById('tabName').value = ""; //so input fields are not prepopulated
			document.getElementById('tabURL').value = "";
			nameBoxOpen = 1;
		}
		function closeTabBox(){
			addTabBox.style.display = 'none';
			nameBoxOpen = 0;
		}
		
		function openControlMenu () {
			if(okOpen == 1){ //
				controlMenu.style.display = 'block';
			}
		}
	
		function showControlLinks(){
				if(tabId < tabProps.length - 1){
					showRight.style.display = 'block';
					hideRight.style.display = 'none';
				} else {
					showRight.style.display = 'none';
					hideRight.style.display = 'block';
				}
				if(tabId > 0) {
					showLeft.style.display = 'block';
					hideLeft.style.display = 'none';
				} else {
					showLeft.style.display = 'none';
					hideLeft.style.display = 'block';
				}
		}
		function openDelay(obj) {
			okOpen=1;
			if (okOpen == 1 && nameBoxOpen == 0) {
				var controlMenu = document.getElementById('controlMenu');
			
				if (isIE==1) {
					topAdjust = 16;
					leftAdjust = 10;
				}
				tabId = obj.id;
				setPos(obj);
				controlMenu.style.top = finalTop
				controlMenu.style.left = finalLeft
				showControlLinks();
				setTimeout("openControlMenu();",time);
			}
		}
		
		function hideDelay() {
			okOpen = 0;
			setTimeout("closeControlMenu();",1);
		}
		
		function closeControlMenu() {
			if (okOpen == 0) {
				var controlMenu = document.getElementById('controlMenu');
				controlMenu.style.display = 'none';
			}
		}
		
		function showEditBox(){
			var editBox = document.getElementById('editBox');
			editBox.style.display = 'block';
			editBox.style.top = finalTop;
			editBox.style.left = finalLeft;
			document.getElementById('newName').value = tabProps[tabId].name;
			document.getElementById('newURL').value = tabProps[tabId].url;
			nameBoxOpen = 1;
		}
		
		function closeEditBox() {
			editBox.style.display = 'none';
			nameBoxOpen = 0;
		}
		function getUnicode(e){
			var unicode=e.charCode? e.charCode : e.keyCode;
			return unicode;
		}
		function checkLength(e, obj){
			unicode = getUnicode(e);
			if (unicode!=8 && unicode!=46 && unicode != 13 && unicode != 37 && unicode != 38 && unicode != 39){ //dont' count backspace, delete keys tabs, or arrow keys.
				if(obj.value.length > 11 && unicode != 9) {
					alert("Hey Shakespeare, there is a 12-character limit for this tab. Please use a nickname that is under 12 characters. Thanks.");
				} 
			}
		}
		
		function onAddTabEnter(e){
				unicode = getUnicode(e);
				if(unicode == 13) {
					createTab();
				}
		}
		function onEditTabEnter(e){
				unicode = getUnicode(e);
				if(unicode == 13) {
					changeName();
				}
		}
		function checkNumTabs(obj){
			if(tab.length > 4){
				alert("Whoa! You've got a lot of favorite sites. There is a five tab limit, please either delete a tab or save this link in your bookmarks.");
			} else {
				openAddTabBox(obj);
			}
		}
		function checkName(n) {
			(n == '')?n='Unnamed':n=n;
		 	return n;
		}
		function isValidURL(u){
			var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
			return regexp.test(u);
		}
		
		function changeName() {
			var tab = document.getElementById(tabId);//needed????
			var newName = checkName(document.getElementById('newName').value);
			var newURL = document.getElementById('newURL').value;

			if(isValidURL(newURL)){
				tabProps[tabId].name = newName;
				tabProps[tabId].url = newURL;
				//focusTabName = '';
				storeCookie(tabProps);
				closeEditBox();
				deleteAllTabs();
				populateExistingTabs();
			} else {
				alert('Please Enter a Valid URL');
			}
	}
	function moveTab(direction){
		(direction=='left')?nextId=tabId-1:nextId=parseInt(tabId) + 1;
		var tmpName = tabProps[nextId].name;
		var tmpURL = tabProps[nextId].url;
		tabProps[nextId].name = tabProps[tabId].name;
		tabProps[nextId].url = tabProps[tabId].url;
		tabProps[tabId].name = tmpName;
		tabProps[tabId].url = tmpURL;
		storeCookie(tabProps);
		deleteAllTabs();
		populateExistingTabs();
		hideDelay();
	}

	
	function showAimToday(){
		var otherContent = document.getElementById('otherContent');
		aimtodayContent.style.display = 'block';
		otherContent.src='';
		otherContent.style.display = 'none';
		unFocusAllTabs();
		aimToday.className = 'focusTab';
		focusTabName = 'aimtoday';
		
	}
	function showOtherPages(){
		if (nameBoxOpen == 0) {
			var otherContent = document.getElementById('otherContent');
			aimToday.className = '';//take focus of aimtoday tab
			aimtodayContent.style.display = 'none'; //hide aimtoday content
			otherContent.style.display = 'block'; //display iframe
			otherContent.src=tabProps[tabId].url; //populate iframe
			focusTabName = tabProps[tabId].name;
			focusTab();
		}
	}
	function unFocusAllTabs(){
		if(tab.length > -1){
			for(i=0;i<tab.length;i++){
				if(tab[i].className == 'focusTab'){
					tab[i].className = '';
				}
			}
		}
	}
	
	function focusTab(){
		unFocusAllTabs();
		focusNum = findFocusTab();
		if(tab.length > -1 && focusNum < tab.length ) {
			tab[focusNum].className = 'focusTab';
		}
		
		
	}
	
	function findFocusTab(){
		num = -1;
		for (i=0;i<tab.length;i++){
			if(tabProps[i].name == focusTabName){
				num = i;
			}
		}
		return num;
	}


addToOnload("initTabs()");