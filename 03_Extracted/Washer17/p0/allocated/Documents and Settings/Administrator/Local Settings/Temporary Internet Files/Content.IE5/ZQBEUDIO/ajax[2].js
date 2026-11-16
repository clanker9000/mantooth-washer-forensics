function XHConn(){
var _1,_2=false;
try{
_1=new ActiveXObject("Msxml2.XMLHTTP");
}
catch(e){
try{
_1=new ActiveXObject("Microsoft.XMLHTTP");
}
catch(e){
try{
_1=new XMLHttpRequest();
}
catch(e){
_1=false;
}
}
}
if(!_1){
return null;
}
this.connect=function(_3,_4,_5,_6){
if(!_1){
return false;
}
_2=false;
_4=_4.toUpperCase();
try{
if(_4=="GET"){
_1.open(_4,_3+"?"+_5,true);
_5="";
}else{
_1.open(_4,_3,true);
_1.setRequestHeader("Method","POST "+_3+" HTTP/1.1");
_1.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
_1.onreadystatechange=function(){
if(_1.readyState==4&&!_2){
_2=true;
_6(_1);
}
};
_1.send(_5);
}
catch(z){
return false;
}
return true;
};
return this;
}

