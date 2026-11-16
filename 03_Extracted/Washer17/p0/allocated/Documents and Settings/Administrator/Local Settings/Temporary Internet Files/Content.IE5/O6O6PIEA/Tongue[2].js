function Localize(myString) { return myString; }
document.write(
'<div style="font-family: Arial;	color: #5A5753; background-color: #FFFFFF;">' +
'	<img align="bottom" src="' + ws_resourcesUrl + 'images/progressAnimation.gif" />' +
'	<span style="font-size: 16px; font-weight: bold; color: #000000; position: relative; top:-2px;">&nbsp;&nbsp;' + ws_loadingText + '</span>' +
'	<br /><br />' +
'	<div style="font-size: 100px; font-weight:  bold;">' + Localize(":") + '<span style="font-size: 75px;">' + Localize("P") + '</span></div>' +
'	<div style="padding-top: 25px; font-size:  14px;">' + Localize("Sticking your tongue out") + '</div>' +
'</div>'
);
