var p_map=new Array();
var redir=false;
var peval=false;
var frecity=null,frestate=null,freform;
var ai_ie=document.all;
var ccId;
var CCPId=null;
var showCC=0;
var http=new Http();
var wasFcs=null;
var toFcs=null;
var errmsg;
var sqd=new Array();
function p_o(o){return document.getElementById(o);}
function Http(){
	this.chan=null;
	this.errTo=null;
	this.isErr=false;
}
function errMsg() {
	if (http.isErr) {
		alert(errmsg);
		setErr(false);
	}
}
function setErr(isErr){
	http.isErr=isErr;
}
function showTab(did,cid,cback){
	if(did==null)return false;
	var div=p_o(did);
	var tab=p_o(cid);
	if(tab==null)return false;
	var tabs=div.childNodes;
	for(var i=0;i<tabs.length;i++){
		tabs[i].className='dn';
	}
	tab.className='di';
	if(cback!=null)eval(cback);
	fcs();
}
function mkTab(did,cid,htm){
	var div=p_o(did);
	if(div==null)return;
	var newT=false;
	var tab=p_o(cid);
	if(!tab){
		tab=document.createElement('div');
		tab.setAttribute('id',cid);
		newT=true;
	}
	tab.className='dn';
	tab.innerHTML=htm;
	if(newT)div.appendChild(tab);
}
String.prototype.trim=function(){return this.replace( /^\s*/, '').replace( /\s*$/, '' );}
function trimQ(q){q.value=q.value.trim();}
function allLI(arg) {
var x = p_o((arg)).getElementsByTagName("li").length;
	while (x>0) {
		p_o((arg+x)).className="";
		p_o((arg+'a'+x)).className="";x--;
	}
}
function selTab(arg,i){
	if(arg!=null){
		allLI(arg);
		lidx = (arg +i);
		liadx = (arg+'a'+i);
	}
	if(arg == 'r'){
		p_o(liadx).className="curr";
	}else if(arg!=null){
		p_o(liadx).className="sel";
	}
}
function addState(u){
	for(var k in sqd){
		if(u.indexOf(k+'=')<0)u+='&'+k+'='+sqd[k];
	}
  	return u;
}
function pGet(url,i,arg,id,cback,frce,fcsId){
	var cid=id+i;
	toFcs=fcsId;
	if((frce!=null&&frce)||showTab(id,cid,cback)==false){
		var uid=(new Date()).getTime();
		url+='&uid='+uid+'&cid='+cid
		if(arg!=null)url+='&targ='+arg;
		url=addState(url);
		if(i!=null)url+='&tid='+i;
		if(cback!=null)url+='&cback='+escape(cback);

                sendReq(url);
	}else{
		selTab(arg,i);
	}
}
function fcs(id){
	if(id==null){
		if(toFcs==null)return;
		id=toFcs;
	}
	var o=p_o(id);
	toFcs=null;
	if(!o)return;
	if(o.getAttribute("tabIndex")==null||!o.getAttributeNode("tabIndex").specified){
		switch(o.nodeName.toLowerCase()){
			case 'a':
			case 'body':
			case 'button':
			case 'frame':
			case 'iframe':
			case 'img':
			case 'input':
			case 'object':
			case 'select':
			case 'textarea':
				break;
			default:
				o.setAttribute("tabIndex","-1");
				break;
		}
	}
	if(o.focus){
		if(document.all){
			o.focus();
			o.focus(); // intentional IE fix
		}else{
			setTimeout('p_o("' + o.id + '").focus()', 0);
		}
	}
}
function sendReq(u) {
	peval=true;
	setErr(true);
        if(http.errTo)clearTimeout(http.errTo);
	http.errTo=setTimeout(errMsg,10000);

	if(!http.chan)http.chan=createReq();
	http.chan.open('GET',u,true);
	http.chan.onreadystatechange=evalResp;
	http.chan.setRequestHeader('content-type','text/xml');
	http.chan.send(null);
}
function createReq() {
	var r = window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");

	return r;
}
function evalResp(){
	if(http.chan.readyState>3 && http.chan.status==200 && http.chan.responseText){
		eval(http.chan.responseText);
	}
}
function isRedir(){return redir;}
function setLoc(mod,zip,inc,div,inc2,div2,args,fcsId) {
	toFcs=fcsId;
	var url='locset.adp?mod='+escape(mod)+'&inc='+escape(inc)+'&div='+escape(div);
	if(zip==null){
		url+='&reset=1';
	}else{
		url+='&zip='+escape(zip);
	}
	if (inc2!=null){
		url+='&inc2='+escape(inc2)+'&div2='+escape(div2);
	}
	if(args!=null){
		url+=args;
	}
	var uid=(new Date()).getTime();
	url+='&uid='+uid;
	url=addState(url);
	redir=true;
        sendReq(url);
}
function redirLoc(url,qry){
	var oF=document.createElement('form');
	oF.action=url;
	oF.method='get';
	var q=qry.split('|');
	for(i=0;i<q.length;i++){
		var oI=document.createElement('input');
		oI.type='hidden';
		oI.name=q[i];
		oI.value=q[++i];
		oF.appendChild(oI);
	}
	document.getElementsByTagName('body')[0].appendChild(oF);
	oF.submit();
}
function replCt(destId,data){
	var node=p_o(destId);
	var newNode=document.createElement('div');
	newNode.innerHTML=data;
	for(i=node.childNodes.length - 1;i>=0;i--){
		node.removeChild(node.childNodes[i]);
	}
	node.appendChild(newNode);
	fcs();
}
function btnOvr(btn){
	btn.className+="over";
	btn.className=btn.className.replace("clk","");
}
function btnOut(btn){
	btn.className=btn.className.replace("over","");
	btn.className=btn.className.replace("clk", "");
}
function btnClk(btn){
	btn.className+="clk";
	btn.className=btn.className.replace("over","");
}
function doFcs(){
	if(document.activeElement&&wasFcs&&document.activeElement!=wasFcs) {
		wasFcs.focus();
	} else {
		p_o('topQuery2').focus();
	}
}
function p_sw(i,l){
	if(se==i)return;
	var c="";
	if(se==6)c="nb"; 
	p_o("stopa"+se).className=c;
	p_o("stopa"+i).className="nb";
	p_o("stop"+se).className="";
	p_o("stopa"+i).className="ava";
	p_o("stop"+i).className="av";
	if(i!=1){
		p_o("stopa"+(i-1)).className="nb";
	}
	if(se!=1&&(se-1!=i)){
		p_o("stopa"+(se-1)).className="";
	}
	p_o("topft2").sourceType.value=p_map[i-1];
	p_o(l+"Query2").focus();
	se=i;
}
function srchSub(id){
	var frm=p_o("topft2");
	frm.sourceType.value=id;
	if(frm.q.value!=""){
		frm.submit();
		return false;
	}
	return true;
}
function imp(u){
	if (!(u.length))return;
	var d=(new Date()).getTime();
	if (u.indexOf('?')>-1){
		u+='&'+d;
	}else{
		u+='?'+d;
	}
	var oI=document.createElement('img');
	oI.width=1;
	oI.height=1;
	p_o('itrk').appendChild(oI);
	oI.src=u;
}
function cf(){
	var fv=0,x;
	if(navigator.plugins&&navigator.plugins.length){
		x=navigator.plugins["Shockwave Flash"];
		if(x){
			if(x.description)fv=x.description.charAt(x.description.indexOf('.')-1);
			fv==7?fv=1:fv=0;
		}
	}else{
		try{
			x=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
			fv=1;
		}
		catch(e){}

	}
	return fv;
}
function ae(o,et,fn){
	var x;
	if(x=o.addEventListener)x(et,fn,0);
	else if(x=o.attachEvent){
		o['e'+et+fn]=fn;
		o[et+fn]=function(){o['e'+et+fn](window.event);}
		x('on'+et,o[et+fn]);
	}
}
function mkOmnObjs(){
	var omtags = new Array('a','div','ul','table','p','h4');
	for (i=0; i<omtags.length;i++) {
		var tags=document.getElementsByTagName(omtags[i]);
		if (omtags[i] == 'a') {
			var attr='name';
		} else {
			var attr='id';
		}
		for (j=0; j<tags.length; j++) {
			if (tags[j].getAttribute(attr) && tags[j].getAttribute(attr).indexOf('om_') == 0) {
				var name=tags[j].getAttribute(attr).substring(3);
				if (omtags[i] == 'a') {
					if(tags[j].onclick==null)tags[j].onclick=new Function("e","s_objectID='"+name+"';");
				} else {
					var atags=tags[j].getElementsByTagName('a');
					for (k=0;k<atags.length;k++) {
						if(atags[k].onclick==null)atags[k].onclick=new Function("e","s_objectID='"+name+(k+1)+"';");
					}
				}
			}
		}
	}
}
function omo(id,defaultId){
	if(defaultId&&s_objectID==defaultId)return;
	s_objectID=id;
}
function clk(e,btnId){
	e=(e)?e:event;
	var key=(e.charCode)?e.charCode:((e.which)?e.which:e.keyCode);
	if ((key==13||key==3)&&p_o(btnId)){
		p_o(btnId).click();
		return false;
 	}
	return true;
}
var c=0;
var tkr='';
var dlini=false;
var to=null;
var pto=null;
var dlnum=1;
var nDls=1;
var dldur=8000;
var dllast;
var qfcs;
var troflags = new Array();
var dlpops = new Array();
var dlpvs = new Array();
var pd;
var psed=false;
var fitab='';
function dlinit(){
	dlini=true;
}
function startdl(dur) {
	if(dur==null)dur=getdldur(dlnum);
	to=setTimeout('dlgo()',dur);
}
function dlf(){return dlgo('CTRL',1)}
function dlb(){return dlgo('CTRL',-1)}
function dlgo(typ,num){
	var fcsId='dlC';
	dlini=true;
	dllast=dlnum;
	switch(typ){
		case 'NUM':
			if(dlnum==num)return false;
			clrT();
			dlnum=num;
			psed=true;
			break;
		case 'CTRL':
			clrT(); 
			psed=true;
			(num>0)?dlnum++:dlnum--;
			break;
		default:
			if(!psed) dlnum++;
			fcsId=null;
			break;
			
	}
	if(dlnum>nDls){
		dlnum=1;
	}else if(dlnum<1){
		dlnum=nDls;
	}
	if(nDls!=1){
		var pUrl = 'tab.adp?type=portal&id=dlC&mod=dlDhtml&dlact=dl'+dlnum;
		if(dlpops['dl'+dlnum]) {
			pUrl += '&dlitem='+dlpops['dl'+dlnum];
		}
		pGet(pUrl,dlnum,null,'dlC','dlc()',null,fcsId);
	}
		
	setPse();
	return false;
}

function dlc() {
	dlteaser();
	dlcnt();

	if(!psed){
		startdl();
	}
	if(p_o('tr'+dlnum))track('tr'+dlnum);
	if(p_o('tro'+dlnum))track('tro'+dlnum,true);
	if(p_o('dla'+dlnum))track('dla'+dlnum,true);
}

function dlcnt() {
	if (p_o('dlcount')) {
		p_o('dlcount').innerHTML = dlnum + '/' + nDls;
	}
}

function dlteaser() {
	if (p_o('dlpv')) {
		if (dlnum == nDls) {
			nextDL = 1;
		} else {
			nextDL = dlnum + 1;
		}
		if (dlpvs[nextDL]) {
			p_o('dlpv').innerHTML = dlpvs[nextDL];
		} else {
			p_o('dlpv').innerHTML = '';
		}
	}
}

function dlblr() {
	qfcs=0;
}
function dlfcs() {
	qfcs=1;
}
function dlp(){
	if(psed){
		psed=false;
		startdl();
	}else{
		psed=true;
		clrT();
	}
	setPse();
	return false;
}
function setPse(){
	if(!p_o('dlpi'))return;
	if(psed){
		p_o('dlpi').src=pctrl_off;
	}else{
		p_o('dlpi').src=pctrl_on;
	}
}
function track(id,once) {
	if(!(o=p_o(id)))return;
	if(once && troflags[id]){
		return;
	}
	var d=o.innerHTML;
	var urls=d.split(",");
	for(i=0;i<urls.length;i++) {
		if(urls[i].length)imp(urls[i]);
	}
	if(once)troflags[id] = 1;
}
function fitrk() {
	if(fitab==null)return;
	track('fiap'+fitab,true);
}
function clrT(){
	if(to){
		clearTimeout(to);
		to=null;
	}
}
ae(window,'load',dlinit);
function getdldur(dlnum) {
	if (o=p_o('dlcyc'+dlnum)) {
		return (o.innerHTML * 1000);
	}
	return dldur;
}
function ai_ad(pid, aid){
	var par=p_o(pid);
	var adpt=p_o(aid);
	par.appendChild(adpt);
	adpt.style.position='inherit';
}
function ai_posX(obj){
	var left=0;
	if(obj.offsetParent){
		while(obj.offsetParent){
			left+=obj.offsetLeft;
			obj=obj.offsetParent;
		}
	}else if(obj.x)left+=obj.x;
	return left;
}
function ai_posY(obj){
	var top=0;
	if(obj.offsetParent){
		while(obj.offsetParent){
			top+=obj.offsetTop;
			obj=obj.offsetParent;
		}
	} else if(obj.x)top+=obj.y;
	return top;
}
function ai_pos(a,b){
	var oA=p_o(a);
	var oB=p_o(b);
	oB.style.display='block';
	oB.style.top=ai_posY(oA)+'px';
	oB.style.left=ai_posX(oA)+'px';
}
var ai_posArr=new Array();
function ai_poo(){
	if(ai_ie){
		for(var i=0;i<ai_posArr.length;i++){
			ai_pos(ai_posArr[i].targ,ai_posArr[i].hid);
		}
	}
}
function ai_inj(targ,tad){
	if (!ai_ie) {
		ai_ad(targ,tad);
	} else {
		var oTad=p_o(tad);
		if(oTad.className){
			oTad.className+=' ai_fl';
		}else{
			oTad.className='ai_fl';
		}
		ai_pos(targ,tad);
		ai_posArr.push({targ:targ,hid:tad});
	}
}
function resizeTarg(a,b) {
	p_o(a).style.height=p_o(b).offsetHeight;
        ai_poo();
}
function orsz(){
	ai_poo();
	posMore();
}
window.onresize=orsz;
function cb(e) {
	if(!e)var e=window.event;
	e.cancelBubble=true;
	if(e.stopPropagation)e.stopPropagation();
}
function gC(k){
	var c=document.cookie.split(';');
	for(var i=0;i<c.length;i++){
		var s=c[i].trim().split('=');
		if(s[0]==k)return s[1];
	}
	return null;
}
function setCC(p,v){
	var c=gC('cc');
	if(!c)c='|||';
	var sC=c.split('|');
	sC[p]=v;
	document.cookie="cc="+sC.join('|')+"; expires=Friday, 31-Dec-2032 23:59:59 GMT; path=/";
}
function selCCP(){
	if (p_o(CCPId)) {
		p_o(CCPId).className='cur';
		p_o(CCPId).firstChild.oldOnclick=p_o(CCPId).firstChild.onclick;
		p_o(CCPId).firstChild.onclick=function(){return false;};
	}
}
function openCCP(objId,id,pv,dly){
	showCC=new Date().getTime();
	if(!dly||dly==0){
		_openCCP(showCC,objId,id,pv);
	}else{
		setTimeout('_openCCP('+showCC+',\''+objId+'\',\''+id+'\',\''+pv+'\')',dly);
	}
}
function _openCCP(uid,objId,id,pv){
	if(showCC==uid){
		if(CCPId&&p_o(CCPId)){
			p_o(CCPId).className='';
			p_o(CCPId).firstChild.onclick=p_o(CCPId).firstChild.oldOnclick;
		}
		var obj=p_o(objId);
		var pObj=obj.parentNode;;
		CCPId='cp'+pObj.id;
		pGet('tab.adp?type=portal&mod=comm.picker&id=comP'+pv,'1',null,'comP','selCCP()');
		var p=p_o('comP');
		var pb=p_o('comPA');
		p.style.left=(ai_posX(obj)+document.body.offsetLeft+obj.offsetWidth-98)+'px';
		p.style.top=(ai_posY(pObj)+pObj.offsetHeight+document.body.offsetTop)+'px';
		p.style.zIndex=99999999;
		ccId=id;
		p.style.display='block';
		fcs('ccp')
		pb.style.left=(ai_posX(obj)+document.body.offsetLeft+obj.offsetWidth-13)+'px';
		pb.style.top=(ai_posY(pObj)+pObj.offsetHeight+document.body.offsetTop-14)+'px';
		pb.style.display='block';
	}
}
function closeCCP(){
	showCC=0;
	var p=p_o('comP');
	if(p)p.style.display='none';
	var pb=p_o('comPA');
	if(pb)pb.style.display='none';
	ccId=null;
}
function pickCCP(id,img,lbl,url,tgt){
	var objI=p_o('cc'+ccId+'i');
	var objL=p_o('cc'+ccId+'l');
	objI.parentNode.id='cc_'+id;
	objI.href=objL.href=url;
	objI.target=objL.target=tgt;
	objI.onclick=objL.onclick=function(){omo('cc_'+id)};
	objI.innerHTML='<img border="0" src="'+img+'" alt="'+lbl+'"\>';
	objL.innerHTML=lbl;
	setCC(ccId-1,escape(id));
	closeCCP();
	fcs(p_o('cc_'+id).childNodes.item(0).id);
}
window.document.onmouseover=closeCCP;
var uk="www.aol.co.uk",ca="www.aol.ca",de="www.aol.de",fr="www.aol.fr";
var ius=new Array(uk,ca,de,fr)
var TZs=new Array();
TZs={
	0:{'en-gb':uk},
	1:{'en-gb':uk,'de':de,'de-at':de,'de-li':de,'de-lu':de,'de-ch':de,'fr':fr,'fr-be':fr,'fr-lu':fr,'fr-mc':fr,'fr-ch':fr},
	2:{'de':de,'de-at':de,'de-li':de,'de-lu':de,'de-ch':de,'fr':fr,'fr-be':fr,'fr-lu':fr,'fr-mc':fr,'fr-ch':fr},
	3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{},11:{},12:{},13:{},
	"-12":{},"-11":{},"-10":{},"-9":{},
	"-8":{'en-ca':ca,'fr-ca':ca},
	"-7":{'en-ca':ca,'fr-ca':ca},
	"-6":{'en-ca':ca,'fr-ca':ca},
	"-5":{'en-ca':ca,'fr-ca':ca},
	"-4":{'en-ca':ca,'fr-ca':ca},
	"-3":{'en-ca':ca,'fr-ca':ca},
	"-2":{},"-1":{}
}
var offSet=String(-(new Date().getTimezoneOffset()/60));
var langloc=String(nav_lang());
var fqdn;
if(TZs[offSet] && TZs[offSet][langloc])fqdn=TZs[offSet][langloc];
if(!get_cookie("byPass")){
	var ckNm="l18nUrl";
	var myLclUrl=get_cookie(ckNm);
	if(myLclUrl!=null){
		for(i=0;i<ius.length;i++){
			if(myLclUrl.indexOf(ius[i])>=0){
				window.location.href=myLclUrl+"?redirect";
				break;
			}
		}
	} else if(fqdn){
		fqdn="http://"+fqdn;
		document.cookie=ckNm+"="+fqdn+";";
		window.location.href=fqdn+"?redirect";
	}
}
function nav_lang(){
	if(typeof(navigator.language)=="string")return (navigator.language.toLowerCase());
	else if(typeof(navigator.userLanguage)=="string")return (navigator.userLanguage.toLowerCase());
	else return 0;
}
function get_cookie(ckNm){
	if(document.cookie.length>0) {
		var begin=document.cookie.indexOf(ckNm+"=");
		if(begin!=-1) {
			begin+=ckNm.length+1;
			var end=document.cookie.indexOf(";",begin);
			if(end==-1)end=document.cookie.length;
			return unescape(document.cookie.substring(begin,end));
		}
  		return null;
	}
	return null;
}

function nwsDD(ncat) {
	if (p_o('nwsdd').style.display=='block') {
		nwsDDTgl(ncat);
	} else {
		pGet('tab.adp?type=portal&id=nwsdd&mod=news.picker&ncat='+ncat,1,null,'nwsdd','nwsDDTgl('+ncat+')',null,'nwsdd');
	}
	return false;
}

function closeNwsDD() {
	if (p_o('nwsdd') && p_o('nwsdd').style.display=='block')nwsDDTgl();
}

function nwsDDTgl(i) {
	var ddau=p_o('nwsddarrowup');
	var dd=p_o('nwsdd');
	ddau.style.display=='block'?ddau.style.display='none':ddau.style.display='block';
	dd.style.display=='block'?dd.style.display='none':dd.style.display='block';
	if (p_o('nwsddo'+i)) {
		var pobj=p_o('nwsddo'+i);
		ddau.style.left=(ai_posX(pobj)+pobj.offsetWidth+document.body.offsetLeft-ddau.offsetWidth)+'px';
		ddau.style.top=(ai_posY(pobj)+1)+'px';
		dd.style.left=(ai_posX(pobj)+pobj.offsetWidth+document.body.offsetLeft-dd.offsetWidth)+'px';
		dd.style.top=(ai_posY(pobj)+pobj.offsetHeight+3)+'px';
	}
	var list=dd.firstChild.firstChild;
	var items=list.childNodes;
	if (i) {
		for(var j=0;j<items.length;j++){
			items[j].className=null;
		}
		p_o('nwsddi'+i).className='nwsddact';
	}
}

function nwsSwp(ncat) {
	nwsDDTgl(ncat);
	pGet('tab.adp?type=portal&id=nws&mod=news.content&ncat='+ncat,ncat,null,'nws','showNwsCust('+ncat+')',null,'nws');
	document.cookie="aolpnews="+ncat+"; expires=Friday, 31-Dec-2032 23:59:59 GMT; path=/";
	return false;
}

function showNwsCust(ncat) {
	if (p_o('nwsddo'+ncat))p_o('nwsddo'+ncat).className="di";
}

function winClick() {
	closeNwsDD();
	togMore(0);
}
window.document.onclick=winClick;
var mre=0
function togMore(state){
	if(state==null)state=Math.abs(mre-1);
	var oDiv=p_o('smore');
	if(state){
		posMore();
		oDiv.style.zIndex=99999999;
		oDiv.style.display='block';
	} else {
		oDiv.style.display='none';
	}
	mre=state;
}
function posMore(){
	var oDiv=p_o('smore');
	var oLnk=p_o('smorea');
	oDiv.style.left=(ai_posX(oLnk)+15)+'px';
	oDiv.style.top=(ai_posY(oLnk)+oLnk.offsetHeight)+'px';
}
