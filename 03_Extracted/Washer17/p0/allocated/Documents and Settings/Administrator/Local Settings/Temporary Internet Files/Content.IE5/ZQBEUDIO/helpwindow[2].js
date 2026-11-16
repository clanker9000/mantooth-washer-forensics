function openHelpWindow(url)
{
	var helpWindow;
  
	helpWindow = window.open(url, "Help", 'width=475,height=375,resizable,scrollbars');
	if (helpWindow)
		helpWindow.focus();
  
	return false;
}
