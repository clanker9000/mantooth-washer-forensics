
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
