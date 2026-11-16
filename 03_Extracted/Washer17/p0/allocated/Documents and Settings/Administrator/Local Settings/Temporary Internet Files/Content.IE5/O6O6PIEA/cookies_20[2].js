/*
     This file is meant to be included in the <head> of a file
       ex: <script src="js/cookie.js"></script>

     This file allows multiple cookie values to be saved into one cookie, thus reducing the number of
     browser cookies a page has. It also handles all the error checking and methods to get and set cookies.
     
     Once this file is loaded, anywhere in your JS code you can do things like:
       pageCookie.setValue("usernmae","JohnDoe");
     Once this call is made, username=JohnDoe is stored to the values hash and the cookie is immediatly re-written
     
     You can immediatly use the value in the form of:
       pageCookie.getValue("usernmae");
     This value is also available to you (if the value was previously set) once this file is called.

     Do NOT store values like "size" or "name". These are too generic and might be overwritten by
      another developer in another module. Instead store things like: mailwidget_size, and emailauth_name.
      This reduced the possibility of stomping, or being stomped on.

     **
          Public Methods:
               pageCookie.getValue(key)       - returns value of 'key' if it exists, undefined otherwise
               pageCookie.setValue(key,value) - sets key=value, if value is empty, key is removed
               pageCookie.hasValue(key)       - returns true if key exists, false otherwise
     **
     
     Notes: Since I wanted this to be as easy as possible, I have elected to have the file init itself.
     Using this method: "pageCookie" and its parameters become hard set. Change the initCookie line below
     to suit your needs.

     If cookies are disabled, "pageCookie" will be false.

     Code example:
     <script>
          pageCookie.setValue("username","JohnDoe");
          pageCookie.setValue("password","mypassword");

          if (pageCookie) {
               alert("page username="+pageCookie.getValue("username"));
               alert("page username="+pageCookie.getValue("password"));
               alert("page other="+pageCookie.getValue("other")); // will return undefined on first page load
          
               pageCookie.setValue("other","other");
          
               alert("page other="+pageCookie.hasValue("other1")); // will return false
          }
     </script>
*/

/*
     I have purposly left 4 functions outside of the cookies Object.
     SetCookie()    \
     GetCookie()     | = generic Cookie handling routines.
     getCookieVal() /
     Hash() - Object to create a hash table
     Use at own risk, see functions below.
*/

var pageCookie = initCookie("aimtoday20","190","","","");

function initCookie(masterCookieName, cookieLifeSpanInDays, domain, path, secure) {
     if (navigator.cookieEnabled == 0) {
          alert("You need to enable cookies for this site to load properly!");
          return false;
     }
     mypageCookie = new cookies(masterCookieName,cookieLifeSpanInDays,domain,path,secure);
     mypageCookie.readCookie();
     return mypageCookie; 
}
function cookies(name,expires,domain,path,secure) {
     this.name    = name;       // What is the main cookie name
     this.expires = expires;    // how many DAYS does the cookie live?
     this.domain  = domain;     // top level domain cookie is avail on (ex: .aol.com)
     this.path    = path;       // top level page cookie is avail on (ex: /)
     this.secure  = secure;     // is cookie secure?
     this.getValue = function (name) {
          return this.valuesHash.getItem(name);
     };
     this.setValue = function (name,value) {
          if ( value == "" ) {
               this.valuesHash.removeItem(name);
          } else {
               this.valuesHash.setItem(name,value);
          }
          this.writeCookie();
     };
     this.hasValue = function (name) {
          return this.valuesHash.hasItem(name);
     };
     /* End public section */

    	this.valueDelim = "%v%";
    	this.pairDelim = "%p%";
    	if (this.expires == "" ) this.expires = 365;
    	this.expdate = new Date ();
	this.expdate.setTime (this.expdate.getTime() + (this.expires * 24 * 60 * 60 * 1000));
     this.valuesHash = new Hash();
     this.readCookie = function () {
          var cookieData = GetCookie(this.name);
          if (cookieData) this.parseCookie(cookieData);
     };
     this.writeCookie = function () {
          if ( this.valuesToString() != "" ) {
                SetCookie(this.name,this.valuesToString(),this.expdate,this.path,this.domain,this.secure);
          } else {
		var pastDate = new Date();
		pastDate.setTime (pastDate.getTime() - 10000 );
                SetCookie(this.name,this.valuesToString(),pastDate,this.path,this.domain,this.secure);
          }
     };
     this.parseCookie = function (cookieData) {
          var splitCookieData = cookieData.split(this.pairDelim);
          /* -1 hack for extra || at end of cookie data */
          for ( var i=0; i < splitCookieData.length-1; i++ ) {
               var splitValueData = splitCookieData[i].split(this.valueDelim)
               this.valuesHash.setItem(splitValueData[0],splitValueData[1]);
          }
     };
     this.valuesToString = function () {
          return this.valuesHash.toString(this.valueDelim,this.pairDelim);
     };
}

function SetCookie (name,value,expires,path,domain,secure) {
  document.cookie = name + "=" + escape (value) +
    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    ((secure) ? "; secure" : "");
}
function GetCookie (name) {
  var arg = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0;
  while (i < clen) {
    var j = i + alen;
    if (document.cookie.substring(i, j) == arg)
      return getCookieVal (j);
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) break; 
  }
  return null;
}
function getCookieVal (offset) {
  var endstr = document.cookie.indexOf (";", offset);
  if (endstr == -1)
    endstr = document.cookie.length;
  return unescape(document.cookie.substring(offset, endstr));
}

function Hash() {
	this.length = 0;
	this.items = new Array();
	for (var i = 0; i < arguments.length; i += 2) {
		if (typeof(arguments[i + 1]) != 'undefined') {
			this.items[arguments[i]] = arguments[i + 1];
			this.length++;
		}
	}
	this.removeItem = function(in_key)	{
		var tmp_value;
		if (typeof(this.items[in_key]) != 'undefined') {
			this.length--;
			var tmp_value = this.items[in_key];
			delete this.items[in_key];
		}
		return tmp_value;
	}
	this.getItem = function(in_key) {
		return this.items[in_key];
	}
	this.setItem = function(in_key, in_value) {
		if (typeof(in_value) != 'undefined') {
			if (typeof(this.items[in_key]) == 'undefined') {
				this.length++;
			}
			this.items[in_key] = in_value;
		}
		return in_value;
	}
	this.hasItem = function(in_key) {
		return typeof(this.items[in_key]) != 'undefined';
	}
     this.toString = function(valueDelim,pairDelim) {
          // returns key1/valueDelim/value1/pairDelim/key2/valueDelim/value2/pairDelim/
          var hashString = "";
          for (var i in this.items) {
	          if ( i != "toJSONString" ) {
	               hashString = hashString + i + valueDelim + this.items[i] + pairDelim;
	          }
          }
          return hashString;
     }
}