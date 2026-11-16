function getSideBarHeight() {
  var windowheight = document.body.offsetHeight;
  return windowheight;
}

function setSideBarHeight() {
  if (document.getElementById) {
      var bodyHeight = getSideBarHeight() - 15;
      if (bodyHeight > 0) {
	 var leftElement = document.getElementById('left_bg');
	 var rightElement = document.getElementById('right_bg');

	 leftElement.style.height = bodyHeight + 'px';
	 rightElement.style.height = bodyHeight + 'px';
      }
  }
}

window.onload = setSideBarHeight;