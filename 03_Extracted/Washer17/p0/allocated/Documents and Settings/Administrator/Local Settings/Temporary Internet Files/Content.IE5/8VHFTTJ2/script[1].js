//End JS


function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

function changeImageYBA(el) {
el.src="http://www.saatchi-gallery.co.uk/imgs/ballon_yba_over.gif";
el.onmouseout=function() {
el.src="http://www.saatchi-gallery.co.uk/imgs/ballon_yba.gif";

}
}


function changeImageYBACh(elch) {
	elch.src="http://www.saatchi-gallery.co.uk/imgs/ballon_yba_over_cn.gif";
	elch.onmouseout=function() {
		elch.src="http://www.saatchi-gallery.co.uk/imgs/ballon_yba_cn.gif";
	}
}

function changeImageCh(elch) {
	elch.src="/imgs/ballon2_cn.gif";
	elch.onmouseout=function() {
		elch.src="/imgs/ballon3_cn.gif";
	}
}
//End JS