function placeDL(movieurl, DLXMLFileName) {
	var currDomain = document.domain;
	var xmlURL = "http://" +  currDomain + "/" + DLXMLFileName;
	document.write("<object id=\"dlf\" classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" codebase=\"http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0\" width=310 height=240>");
    document.write("<param name=\"salign\" value=\"lt\">");
    document.write("<param name=\"scale\" value=\"noborder\">");
    document.write("<param name=\"movie\" value=\""+movieurl+"\">");
	document.write('<PARAM NAME=FlashVars VALUE="xmlURL=' + xmlURL + '">');
    document.write("<param name=\"quality\" value=\"high\">");
    document.write("<param name=\"wmode\" value=\"transparent\">");
	document.write('<embed src=\"' + movieurl + '\"  FlashVars=\"xmlURL=' + xmlURL + '\" name=\"dlf\" swLiveConnect=\"true\" quality=\"high\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" type=\"application/x-shockwave-flash\" wmode=\"transparent\" scale=\"noborder\" salign=\"lt\" width=\"310\" height=\"240\"></embed>');
    document.write("</object>");

}
