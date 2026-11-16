function Xajax(){this.workId='xajaxWork'+new Date().getTime();this.depth=0;this.getRequestObject=function(){var req;try{req=new ActiveXObject("Msxml2.XMLHTTP");}
catch(e){try{req=new ActiveXObject("Microsoft.XMLHTTP");}
catch(e2){req=null;}
}
if(!req&&typeof XMLHttpRequest!="undefined")
req=new XMLHttpRequest();return req;}
this.$=function(sId){return document.getElementById(sId);}
this.getFormValues=function(frm){var objForm;if(typeof(frm)=="string")
objForm=this.$(frm);else
objForm=frm;var sXml="<xjxquery><q>";if(objForm&&objForm.tagName=='FORM'){var formElements=objForm.elements;for(var i=0;i < formElements.length;i++){if((formElements[i].type=='radio'||formElements[i].type=='checkbox')&&formElements[i].checked==false)
continue;var name=formElements[i].name;if(name){if(sXml!='<xjxquery><q>')
sXml+='&';sXml+=name+"="+encodeURIComponent(formElements[i].value);}
}
}
sXml+="</q></xjxquery>";return sXml;}
this.objectToXML=function(obj){var sXml="<xjxobj>";for(i in obj){try{if(i=='constructor')
continue;if(obj[i]&&typeof(obj[i])=='function')
continue;var key=i;var value=obj[i];if(value&&typeof(value)=="object"&&
(value.constructor==Array
)&&this.depth <=50){this.depth++;value=this.objectToXML(value);this.depth--;}
sXml+="<e><k>"+key+"</k><v>"+value+"</v></e>";}
catch(e){}
}
sXml+="</xjxobj>";return sXml;}
this.call=function(sFunction,aArgs,sRequestType){var i,r,postData;if(document.body)
document.body.style.cursor='wait';var xajaxRequestType=sRequestType;var uri=xajaxRequestUri;var value;switch(xajaxRequestType){case 0:{var uriGet=uri.indexOf("?")==-1?"?xajax="+encodeURIComponent(sFunction):"&xajax="+encodeURIComponent(sFunction);for(i=0;i<aArgs.length;i++){value=aArgs[i];if(typeof(value)=="object")
value=this.objectToXML(value);uriGet+="&xajaxargs[]="+encodeURIComponent(value);}
uriGet+="&xajaxr="+new Date().getTime();uri+=uriGet;postData=null;}break;case 1:{postData="xajax="+encodeURIComponent(sFunction);postData+="&xajaxr="+new Date().getTime();for(i=0;i <aArgs.length;i++){value=aArgs[i];if(typeof(value)=="object")
value=this.objectToXML(value);postData=postData+"&xajaxargs[]="+encodeURIComponent(value);}
}break;default:
alert("Illegal request type: "+xajaxRequestType);return false;break;}
r=this.getRequestObject();r.open(xajaxRequestType==0?"GET":"POST",uri,true);if(xajaxRequestType==1){try{r.setRequestHeader("Method","POST "+uri+" HTTP/1.1");r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");}
catch(e){alert("Your browser does not appear to  support asynchronous requests using POST.");return false;}
}
r.onreadystatechange=function(){if(r.readyState!=4)
return;if(r.status==200){var data=r.responseXML;if(data)
xajax.processResponse(data);}
}
r.send(postData);delete r;return true;}
this.willChange=function(element,attribute,newData){var oldData;if(attribute=="innerHTML"){tmpXajax=this.$(this.workId);if(tmpXajax==null){tmpXajax=document.createElement("div");tmpXajax.setAttribute('id',this.workId);tmpXajax.style.display="none";tmpXajax.style.visibility="hidden";document.body.appendChild(tmpXajax);}
tmpXajax.innerHTML=newData;newData=tmpXajax.innerHTML;}
eval("oldData=document.getElementById('"+element+"')."+attribute);if(newData!=oldData)
return true;return false;}
this.processResponse=function(xml){var tmpXajax=null;xml=xml.documentElement;for(i=0;i<xml.childNodes.length;i++){if(xml.childNodes[i].nodeName=="alert"){if(xml.childNodes[i].firstChild)
alert(xml.childNodes[i].firstChild.nodeValue);}
if(xml.childNodes[i].nodeName=="jscript"){if(xml.childNodes[i].firstChild)
eval(xml.childNodes[i].firstChild.nodeValue);}
if(xml.childNodes[i].nodeName=="update"){var action;var element;var attribute;var search;var data;var type;var objElement;for(j=0;j<xml.childNodes[i].attributes.length;j++){if(xml.childNodes[i].attributes[j].name=="action"){action=xml.childNodes[i].attributes[j].value;}
}
var node=xml.childNodes[i];for(j=0;j<node.childNodes.length;j++){if(node.childNodes[j].nodeName=="target"){for(k=0;k<node.childNodes[j].attributes.length;k++){if(node.childNodes[j].attributes[k].name=="attribute"){attribute=node.childNodes[j].attributes[k].value;}
}
element=node.childNodes[j].firstChild.nodeValue;}
if(node.childNodes[j].nodeName=="search"){if(node.childNodes[j].firstChild)
search=node.childNodes[j].firstChild.nodeValue;else
search="";}
if(node.childNodes[j].nodeName=="data"){if(node.childNodes[j].firstChild)
data=node.childNodes[j].firstChild.nodeValue;else
data="";}
if(node.childNodes[j].nodeName=="type"){if(node.childNodes[j].firstChild)
type=node.childNodes[j].firstChild.nodeValue;else
type="";}
}
if(action=="assign"){if(this.willChange(element,attribute,data)){eval("document.getElementById('"+element+"')."+attribute+"=data;");}
}
if(action=="append")
eval("document.getElementById('"+element+"')."+attribute+"+=data;");if(action=="prepend")
eval("document.getElementById('"+element+"')."+attribute+"=data+document.getElementById('"+element+"')."+attribute);if(action=="replace"){eval("var v=document.getElementById('"+element+"')."+attribute);var v2=v.indexOf(search)==-1?v:"";while(v.indexOf(search)>-1){x=v.indexOf(search)+search.length+1;v2+=v.substr(0,x).replace(search,data);v=v.substr(x,v.length-x);}
if(this.willChange(element,attribute,v2))
eval('document.getElementById("'+element+'").'+attribute+'=v2;');}
if(action=="clear")
eval("document.getElementById('"+element+"')."+attribute+"='';");if(action=="remove"){objElement=this.$(element);if(objElement.parentNode&&objElement.parentNode.removeChild){objElement.parentNode.removeChild(objElement);}
}
if(action=="create"){var objParent=this.$(element);objElement=document.createElement(attribute);objElement.setAttribute('id',data);if(type&&type!='')
objElement.setAttribute('type',type);objParent.appendChild(objElement);if(objParent.tagName=="FORM"){}
}
}
}
document.body.style.cursor='default';}
}
var xajax=new Xajax();function xajax_rateit(){xajax.call("rateit",arguments,1);}
