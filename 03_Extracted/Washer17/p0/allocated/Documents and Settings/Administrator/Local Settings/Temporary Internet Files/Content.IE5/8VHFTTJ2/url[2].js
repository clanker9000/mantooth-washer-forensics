function toggleDisplay(e){
if(e==null){
return true;
}else{
var _2=document.getElementById(e);
_2.style.display=_2.style.display=="none"?"block":"none";
}
}
function toggleMulti(_3){
try{
for(i=0,max=_3.length;i<max;i++){
var _4=document.getElementById(_3[i]);
_4.style.display=_4.style.display=="none"?"block":"none";
}
}
catch(e){
return false;
}
}
function getkey(e){
var _6;
if(e==null){
_6=event.keyCode;
if(typeof (event.srcElement.type)=="undefined"||event.srcElement.id!="searchtext"){
return true;
}
}else{
if(e.altKey||e.ctrlKey){
return true;
}
_6=e.which;
if(typeof (e.target.type)=="undefined"||e.target.id!="searchtext"){
return true;
}
}
var _7=String.fromCharCode(_6).toLowerCase();
var _8=document.layers?e.which:document.all?event.keyCode:document.getElementById?e.keyCode:0;
if(_8==13){
click_search();
return true;
}
return true;
}
document.onkeydown=getkey;
function click_search(){
var _9=document.getElementById("searchtext").value;
_9=_9.replace(" ","-");
if(_9!=""){
document.location.href="http://www.stumbleupon.com/tag/"+_9+"/";
}else{
document.location.href="http://www.stumbleupon.com/tag/";
}
}
function submitForm(_a){
try{
var t=document.getElementById(_a);
t.submit();
}
catch(e){
}
}
function add_tag(_c){
var _d=document.getElementById("addTag");
var _e=_d.options[_d.selectedIndex].value;
if(_e==""){
return false;
}
var tt=document.getElementById(_c);
if(tt.value!=""){
var len=tt.value.length;
if(len){
var end=len-1;
if(tt.value.charAt(end)!=","&&tt.value.charAt(end-1)!=","){
tt.value+=", ";
}
}
}
tt.value+=_e;
}
function editReview(){
var _12={success:function(o){
try{
var _14=eval("("+o.responseText+")");
}
catch(e){
return false;
}
if(_14.success){
var rev=document.getElementById("myreview");
rev.innerHTML=_14.newcom;
toggleDisplay("myedit");
toggleDisplay("myreview");
toggleDisplay("mytagcont");
if(_14.newdate){
var dt=document.getElementById("mydate");
dt.innerHTML=_14.newdate;
}
if(_14.newtags){
var tg=document.getElementById("mytags");
tg.innerHTML=_14.newtags;
}
}
},failure:function(o){
},timeout:10000};
YAHOO.util.Connect.setForm("editReviewForm");
var _19=YAHOO.util.Connect.asyncRequest("POST","/url_ajax.php",_12);
}
function parseMorePeople(){
var m=document.getElementById("morePeople");
if(m.innerHTML==""){
m.innerHTML=more_people;
}
}
function blockUser(_1b,_1c,_1d,_1e){
if(confirm("By ignoring this person, you will no longer receive messages or pages from them (you can unignore this person from your Network tab). Are you sure you want to do this?")){
if(_1d&&_1e){
location.href=_1d+"?ignore="+_1b+"&fauth="+_1c+"&posturl="+_1e;
}else{
location.href="?ignore="+_1b+"&fauth="+_1c;
}
}
}
function fillContent(_1f,_20){
var c=document.getElementById(_1f);
if(c){
c.innerHTML=_20;
}
}

