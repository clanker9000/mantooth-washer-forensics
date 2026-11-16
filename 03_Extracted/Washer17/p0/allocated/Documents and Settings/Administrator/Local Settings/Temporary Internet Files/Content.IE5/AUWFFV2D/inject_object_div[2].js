function google_inject_object_in_div(id) {
  // only do this for IE
  if (navigator.userAgent.indexOf("MSIE ") <= 0) {
    return;
  }
  // make sure we have a div
  var div = document.getElementById(id);
  if (!div) {
    return;
  }
  // make sure it has at least 1 object tag
  var objTags = div.getElementsByTagName("object");
  if (objTags.length == 0) {
    return;
  }

  // save FlashVars.
  var savedFlashVars;
  var params = objTags[0].getElementsByTagName("param");
  for (var i = 0; i < params.length; i++) {
    if (params[i].name.toLowerCase() == 'flashvars') {
      savedFlashVars = params[i].value;
    }
  }

  div.innerHTML = div.innerHTML;

  if (!savedFlashVars) {
    return;
  }

  // restore FlashVars.
  objTags = div.getElementsByTagName("object");
  if (objTags.length == 0) {
    return;
  }
  var s = objTags[0].outerHTML;
  var re = /<param name="FlashVars" value="">/ig;
  objTags[0].outerHTML
      = s.replace(re,
                  "<param name='FlashVars' value='" + savedFlashVars + "'>");
}

google_inject_object_in_div("google_flash_div");
