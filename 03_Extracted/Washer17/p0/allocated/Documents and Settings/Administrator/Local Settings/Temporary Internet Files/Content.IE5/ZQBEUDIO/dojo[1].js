/*
	This is a compiled version of Dojo, built for deployment and not for
	development. To get an editable version, please visit:

		http://dojotoolkit.org

	for documentation and information on getting the source.
*/

if(typeof dojo=="undefined"){
var dj_global=this;
var dj_currentContext=this;
function dj_undef(_1,_2){
return (typeof (_2||dj_currentContext)[_1]=="undefined");
}
if(dj_undef("djConfig",this)){
var djConfig={};
}
if(dj_undef("dojo",this)){
var dojo={};
}
dojo.global=function(){
return dj_currentContext;
};
dojo.locale=djConfig.locale;
dojo.version={major:0,minor:4,patch:3,flag:"",revision:Number("$Rev: 8617 $".match(/[0-9]+/)[0]),toString:function(){
with(dojo.version){
return major+"."+minor+"."+patch+flag+" ("+revision+")";
}
}};
dojo.evalProp=function(_3,_4,_5){
if((!_4)||(!_3)){
return undefined;
}
if(!dj_undef(_3,_4)){
return _4[_3];
}
return (_5?(_4[_3]={}):undefined);
};
dojo.parseObjPath=function(_6,_7,_8){
var _9=(_7||dojo.global());
var _a=_6.split(".");
var _b=_a.pop();
for(var i=0,l=_a.length;i<l&&_9;i++){
_9=dojo.evalProp(_a[i],_9,_8);
}
return {obj:_9,prop:_b};
};
dojo.evalObjPath=function(_e,_f){
if(typeof _e!="string"){
return dojo.global();
}
if(_e.indexOf(".")==-1){
return dojo.evalProp(_e,dojo.global(),_f);
}
var ref=dojo.parseObjPath(_e,dojo.global(),_f);
if(ref){
return dojo.evalProp(ref.prop,ref.obj,_f);
}
return null;
};
dojo.errorToString=function(_11){
if(!dj_undef("message",_11)){
return _11.message;
}else{
if(!dj_undef("description",_11)){
return _11.description;
}else{
return _11;
}
}
};
dojo.raise=function(_12,_13){
if(_13){
_12=_12+": "+dojo.errorToString(_13);
}else{
_12=dojo.errorToString(_12);
}
try{
if(djConfig.isDebug){
dojo.hostenv.println("FATAL exception raised: "+_12);
}
}
catch(e){
}
throw _13||Error(_12);
};
dojo.debug=function(){
};
dojo.debugShallow=function(obj){
};
dojo.profile={start:function(){
},end:function(){
},stop:function(){
},dump:function(){
}};
function dj_eval(_15){
return dj_global.eval?dj_global.eval(_15):eval(_15);
}
dojo.unimplemented=function(_16,_17){
var _18="'"+_16+"' not implemented";
if(_17!=null){
_18+=" "+_17;
}
dojo.raise(_18);
};
dojo.deprecated=function(_19,_1a,_1b){
var _1c="DEPRECATED: "+_19;
if(_1a){
_1c+=" "+_1a;
}
if(_1b){
_1c+=" -- will be removed in version: "+_1b;
}
dojo.debug(_1c);
};
dojo.render=(function(){
function vscaffold(_1d,_1e){
var tmp={capable:false,support:{builtin:false,plugin:false},prefixes:_1d};
for(var i=0;i<_1e.length;i++){
tmp[_1e[i]]=false;
}
return tmp;
}
return {name:"",ver:dojo.version,os:{win:false,linux:false,osx:false},html:vscaffold(["html"],["ie","opera","khtml","safari","moz"]),svg:vscaffold(["svg"],["corel","adobe","batik"]),vml:vscaffold(["vml"],["ie"]),swf:vscaffold(["Swf","Flash","Mm"],["mm"]),swt:vscaffold(["Swt"],["ibm"])};
})();
dojo.hostenv=(function(){
var _21={isDebug:false,allowQueryConfig:false,baseScriptUri:"",baseRelativePath:"",libraryScriptUri:"",iePreventClobber:false,ieClobberMinimal:true,preventBackButtonFix:true,delayMozLoadingFix:false,searchIds:[],parseWidgets:true};
if(typeof djConfig=="undefined"){
djConfig=_21;
}else{
for(var _22 in _21){
if(typeof djConfig[_22]=="undefined"){
djConfig[_22]=_21[_22];
}
}
}
return {name_:"(unset)",version_:"(unset)",getName:function(){
return this.name_;
},getVersion:function(){
return this.version_;
},getText:function(uri){
dojo.unimplemented("getText","uri="+uri);
}};
})();
dojo.hostenv.getBaseScriptUri=function(){
if(djConfig.baseScriptUri.length){
return djConfig.baseScriptUri;
}
var uri=new String(djConfig.libraryScriptUri||djConfig.baseRelativePath);
if(!uri){
dojo.raise("Nothing returned by getLibraryScriptUri(): "+uri);
}
var _25=uri.lastIndexOf("/");
djConfig.baseScriptUri=djConfig.baseRelativePath;
return djConfig.baseScriptUri;
};
(function(){
var _26={pkgFileName:"__package__",loading_modules_:{},loaded_modules_:{},addedToLoadingCount:[],removedFromLoadingCount:[],inFlightCount:0,modulePrefixes_:{dojo:{name:"dojo",value:"src"}},setModulePrefix:function(_27,_28){
this.modulePrefixes_[_27]={name:_27,value:_28};
},moduleHasPrefix:function(_29){
var mp=this.modulePrefixes_;
return Boolean(mp[_29]&&mp[_29].value);
},getModulePrefix:function(_2b){
if(this.moduleHasPrefix(_2b)){
return this.modulePrefixes_[_2b].value;
}
return _2b;
},getTextStack:[],loadUriStack:[],loadedUris:[],post_load_:false,modulesLoadedListeners:[],unloadListeners:[],loadNotifying:false};
for(var _2c in _26){
dojo.hostenv[_2c]=_26[_2c];
}
})();
dojo.hostenv.loadPath=function(_2d,_2e,cb){
var uri;
if(_2d.charAt(0)=="/"||_2d.match(/^\w+:/)){
uri=_2d;
}else{
uri=this.getBaseScriptUri()+_2d;
}
if(djConfig.cacheBust&&dojo.render.html.capable){
uri+="?"+String(djConfig.cacheBust).replace(/\W+/g,"");
}
try{
return !_2e?this.loadUri(uri,cb):this.loadUriAndCheck(uri,_2e,cb);
}
catch(e){
dojo.debug(e);
return false;
}
};
dojo.hostenv.loadUri=function(uri,cb){
if(this.loadedUris[uri]){
return true;
}
var _33=this.getText(uri,null,true);
if(!_33){
return false;
}
this.loadedUris[uri]=true;
if(cb){
_33="("+_33+")";
}
var _34=dj_eval(_33);
if(cb){
cb(_34);
}
return true;
};
dojo.hostenv.loadUriAndCheck=function(uri,_36,cb){
var ok=true;
try{
ok=this.loadUri(uri,cb);
}
catch(e){
dojo.debug("failed loading ",uri," with error: ",e);
}
return Boolean(ok&&this.findModule(_36,false));
};
dojo.loaded=function(){
};
dojo.unloaded=function(){
};
dojo.hostenv.loaded=function(){
this.loadNotifying=true;
this.post_load_=true;
var mll=this.modulesLoadedListeners;
for(var x=0;x<mll.length;x++){
mll[x]();
}
this.modulesLoadedListeners=[];
this.loadNotifying=false;
dojo.loaded();
};
dojo.hostenv.unloaded=function(){
var mll=this.unloadListeners;
while(mll.length){
(mll.pop())();
}
dojo.unloaded();
};
dojo.addOnLoad=function(obj,_3d){
var dh=dojo.hostenv;
if(arguments.length==1){
dh.modulesLoadedListeners.push(obj);
}else{
if(arguments.length>1){
dh.modulesLoadedListeners.push(function(){
obj[_3d]();
});
}
}
if(dh.post_load_&&dh.inFlightCount==0&&!dh.loadNotifying){
dh.callLoaded();
}
};
dojo.addOnUnload=function(obj,_40){
var dh=dojo.hostenv;
if(arguments.length==1){
dh.unloadListeners.push(obj);
}else{
if(arguments.length>1){
dh.unloadListeners.push(function(){
obj[_40]();
});
}
}
};
dojo.hostenv.modulesLoaded=function(){
if(this.post_load_){
return;
}
if(this.loadUriStack.length==0&&this.getTextStack.length==0){
if(this.inFlightCount>0){
dojo.debug("files still in flight!");
return;
}
dojo.hostenv.callLoaded();
}
};
dojo.hostenv.callLoaded=function(){
if(typeof setTimeout=="object"||(djConfig["useXDomain"]&&dojo.render.html.opera)){
setTimeout("dojo.hostenv.loaded();",0);
}else{
dojo.hostenv.loaded();
}
};
dojo.hostenv.getModuleSymbols=function(_42){
var _43=_42.split(".");
for(var i=_43.length;i>0;i--){
var _45=_43.slice(0,i).join(".");
if((i==1)&&!this.moduleHasPrefix(_45)){
_43[0]="../"+_43[0];
}else{
var _46=this.getModulePrefix(_45);
if(_46!=_45){
_43.splice(0,i,_46);
break;
}
}
}
return _43;
};
dojo.hostenv._global_omit_module_check=false;
dojo.hostenv.loadModule=function(_47,_48,_49){
if(!_47){
return;
}
_49=this._global_omit_module_check||_49;
var _4a=this.findModule(_47,false);
if(_4a){
return _4a;
}
if(dj_undef(_47,this.loading_modules_)){
this.addedToLoadingCount.push(_47);
}
this.loading_modules_[_47]=1;
var _4b=_47.replace(/\./g,"/")+".js";
var _4c=_47.split(".");
var _4d=this.getModuleSymbols(_47);
var _4e=((_4d[0].charAt(0)!="/")&&!_4d[0].match(/^\w+:/));
var _4f=_4d[_4d.length-1];
var ok;
if(_4f=="*"){
_47=_4c.slice(0,-1).join(".");
while(_4d.length){
_4d.pop();
_4d.push(this.pkgFileName);
_4b=_4d.join("/")+".js";
if(_4e&&_4b.charAt(0)=="/"){
_4b=_4b.slice(1);
}
ok=this.loadPath(_4b,!_49?_47:null);
if(ok){
break;
}
_4d.pop();
}
}else{
_4b=_4d.join("/")+".js";
_47=_4c.join(".");
var _51=!_49?_47:null;
ok=this.loadPath(_4b,_51);
if(!ok&&!_48){
_4d.pop();
while(_4d.length){
_4b=_4d.join("/")+".js";
ok=this.loadPath(_4b,_51);
if(ok){
break;
}
_4d.pop();
_4b=_4d.join("/")+"/"+this.pkgFileName+".js";
if(_4e&&_4b.charAt(0)=="/"){
_4b=_4b.slice(1);
}
ok=this.loadPath(_4b,_51);
if(ok){
break;
}
}
}
if(!ok&&!_49){
dojo.raise("Could not load '"+_47+"'; last tried '"+_4b+"'");
}
}
if(!_49&&!this["isXDomain"]){
_4a=this.findModule(_47,false);
if(!_4a){
dojo.raise("symbol '"+_47+"' is not defined after loading '"+_4b+"'");
}
}
return _4a;
};
dojo.hostenv.startPackage=function(_52){
var _53=String(_52);
var _54=_53;
var _55=_52.split(/\./);
if(_55[_55.length-1]=="*"){
_55.pop();
_54=_55.join(".");
}
var _56=dojo.evalObjPath(_54,true);
this.loaded_modules_[_53]=_56;
this.loaded_modules_[_54]=_56;
return _56;
};
dojo.hostenv.findModule=function(_57,_58){
var lmn=String(_57);
if(this.loaded_modules_[lmn]){
return this.loaded_modules_[lmn];
}
if(_58){
dojo.raise("no loaded module named '"+_57+"'");
}
return null;
};
dojo.kwCompoundRequire=function(_5a){
var _5b=_5a["common"]||[];
var _5c=_5a[dojo.hostenv.name_]?_5b.concat(_5a[dojo.hostenv.name_]||[]):_5b.concat(_5a["default"]||[]);
for(var x=0;x<_5c.length;x++){
var _5e=_5c[x];
if(_5e.constructor==Array){
dojo.hostenv.loadModule.apply(dojo.hostenv,_5e);
}else{
dojo.hostenv.loadModule(_5e);
}
}
};
dojo.require=function(_5f){
dojo.hostenv.loadModule.apply(dojo.hostenv,arguments);
};
dojo.requireIf=function(_60,_61){
var _62=arguments[0];
if((_62===true)||(_62=="common")||(_62&&dojo.render[_62].capable)){
var _63=[];
for(var i=1;i<arguments.length;i++){
_63.push(arguments[i]);
}
dojo.require.apply(dojo,_63);
}
};
dojo.requireAfterIf=dojo.requireIf;
dojo.provide=function(_65){
return dojo.hostenv.startPackage.apply(dojo.hostenv,arguments);
};
dojo.registerModulePath=function(_66,_67){
return dojo.hostenv.setModulePrefix(_66,_67);
};
if(djConfig["modulePaths"]){
for(var param in djConfig["modulePaths"]){
dojo.registerModulePath(param,djConfig["modulePaths"][param]);
}
}
dojo.setModulePrefix=function(_68,_69){
dojo.deprecated("dojo.setModulePrefix(\""+_68+"\", \""+_69+"\")","replaced by dojo.registerModulePath","0.5");
return dojo.registerModulePath(_68,_69);
};
dojo.exists=function(obj,_6b){
var p=_6b.split(".");
for(var i=0;i<p.length;i++){
if(!obj[p[i]]){
return false;
}
obj=obj[p[i]];
}
return true;
};
dojo.hostenv.normalizeLocale=function(_6e){
var _6f=_6e?_6e.toLowerCase():dojo.locale;
if(_6f=="root"){
_6f="ROOT";
}
return _6f;
};
dojo.hostenv.searchLocalePath=function(_70,_71,_72){
_70=dojo.hostenv.normalizeLocale(_70);
var _73=_70.split("-");
var _74=[];
for(var i=_73.length;i>0;i--){
_74.push(_73.slice(0,i).join("-"));
}
_74.push(false);
if(_71){
_74.reverse();
}
for(var j=_74.length-1;j>=0;j--){
var loc=_74[j]||"ROOT";
var _78=_72(loc);
if(_78){
break;
}
}
};
dojo.hostenv.localesGenerated;
dojo.hostenv.registerNlsPrefix=function(){
dojo.registerModulePath("nls","nls");
};
dojo.hostenv.preloadLocalizations=function(){
if(dojo.hostenv.localesGenerated){
dojo.hostenv.registerNlsPrefix();
function preload(_79){
_79=dojo.hostenv.normalizeLocale(_79);
dojo.hostenv.searchLocalePath(_79,true,function(loc){
for(var i=0;i<dojo.hostenv.localesGenerated.length;i++){
if(dojo.hostenv.localesGenerated[i]==loc){
dojo["require"]("nls.dojo_"+loc);
return true;
}
}
return false;
});
}
preload();
var _7c=djConfig.extraLocale||[];
for(var i=0;i<_7c.length;i++){
preload(_7c[i]);
}
}
dojo.hostenv.preloadLocalizations=function(){
};
};
dojo.requireLocalization=function(_7e,_7f,_80,_81){
dojo.hostenv.preloadLocalizations();
var _82=dojo.hostenv.normalizeLocale(_80);
var _83=[_7e,"nls",_7f].join(".");
var _84="";
if(_81){
var _85=_81.split(",");
for(var i=0;i<_85.length;i++){
if(_82.indexOf(_85[i])==0){
if(_85[i].length>_84.length){
_84=_85[i];
}
}
}
if(!_84){
_84="ROOT";
}
}
var _87=_81?_84:_82;
var _88=dojo.hostenv.findModule(_83);
var _89=null;
if(_88){
if(djConfig.localizationComplete&&_88._built){
return;
}
var _8a=_87.replace("-","_");
var _8b=_83+"."+_8a;
_89=dojo.hostenv.findModule(_8b);
}
if(!_89){
_88=dojo.hostenv.startPackage(_83);
var _8c=dojo.hostenv.getModuleSymbols(_7e);
var _8d=_8c.concat("nls").join("/");
var _8e;
dojo.hostenv.searchLocalePath(_87,_81,function(loc){
var _90=loc.replace("-","_");
var _91=_83+"."+_90;
var _92=false;
if(!dojo.hostenv.findModule(_91)){
dojo.hostenv.startPackage(_91);
var _93=[_8d];
if(loc!="ROOT"){
_93.push(loc);
}
_93.push(_7f);
var _94=_93.join("/")+".js";
_92=dojo.hostenv.loadPath(_94,null,function(_95){
var _96=function(){
};
_96.prototype=_8e;
_88[_90]=new _96();
for(var j in _95){
_88[_90][j]=_95[j];
}
});
}else{
_92=true;
}
if(_92&&_88[_90]){
_8e=_88[_90];
}else{
_88[_90]=_8e;
}
if(_81){
return true;
}
});
}
if(_81&&_82!=_84){
_88[_82.replace("-","_")]=_88[_84.replace("-","_")];
}
};
(function(){
var _98=djConfig.extraLocale;
if(_98){
if(!_98 instanceof Array){
_98=[_98];
}
var req=dojo.requireLocalization;
dojo.requireLocalization=function(m,b,_9c,_9d){
req(m,b,_9c,_9d);
if(_9c){
return;
}
for(var i=0;i<_98.length;i++){
req(m,b,_98[i],_9d);
}
};
}
})();
dojo.hostenv.resetXd=function(){
this.isXDomain=djConfig.useXDomain||false;
this.xdTimer=0;
this.xdInFlight={};
this.xdOrderedReqs=[];
this.xdDepMap={};
this.xdContents=[];
this.xdDefList=[];
};
dojo.hostenv.resetXd();
dojo.hostenv.createXdPackage=function(_9f,_a0,_a1){
var _a2=[];
var _a3=/dojo.(requireLocalization|require|requireIf|requireAll|provide|requireAfterIf|requireAfter|kwCompoundRequire|conditionalRequire|hostenv\.conditionalLoadModule|.hostenv\.loadModule|hostenv\.moduleLoaded)\(([\w\W]*?)\)/mg;
var _a4;
while((_a4=_a3.exec(_9f))!=null){
if(_a4[1]=="requireLocalization"){
eval(_a4[0]);
}else{
_a2.push("\""+_a4[1]+"\", "+_a4[2]);
}
}
var _a5=[];
_a5.push("dojo.hostenv.packageLoaded({\n");
if(_a2.length>0){
_a5.push("depends: [");
for(var i=0;i<_a2.length;i++){
if(i>0){
_a5.push(",\n");
}
_a5.push("["+_a2[i]+"]");
}
_a5.push("],");
}
_a5.push("\ndefinePackage: function(dojo){");
_a5.push(_9f);
_a5.push("\n}, resourceName: '"+_a0+"', resourcePath: '"+_a1+"'});");
return _a5.join("");
};
dojo.hostenv.loadPath=function(_a7,_a8,cb){
var _aa=_a7.indexOf(":");
var _ab=_a7.indexOf("/");
var uri;
var _ad=false;
if(_aa>0&&_aa<_ab){
uri=_a7;
this.isXDomain=_ad=true;
}else{
uri=this.getBaseScriptUri()+_a7;
_aa=uri.indexOf(":");
_ab=uri.indexOf("/");
if(_aa>0&&_aa<_ab&&(!location.host||uri.indexOf("http://"+location.host)!=0)){
this.isXDomain=_ad=true;
}
}
if(djConfig.cacheBust&&dojo.render.html.capable){
uri+="?"+String(djConfig.cacheBust).replace(/\W+/g,"");
}
try{
return ((!_a8||this.isXDomain)?this.loadUri(uri,cb,_ad,_a8):this.loadUriAndCheck(uri,_a8,cb));
}
catch(e){
dojo.debug(e);
return false;
}
};
dojo.hostenv.loadUri=function(uri,cb,_b0,_b1){
if(this.loadedUris[uri]){
return 1;
}
if(this.isXDomain&&_b1){
if(uri.indexOf("__package__")!=-1){
_b1+=".*";
}
this.xdOrderedReqs.push(_b1);
if(_b0||uri.indexOf("/nls/")==-1){
this.xdInFlight[_b1]=true;
this.inFlightCount++;
}
if(!this.xdTimer){
this.xdTimer=setInterval("dojo.hostenv.watchInFlightXDomain();",100);
}
this.xdStartTime=(new Date()).getTime();
}
if(_b0){
var _b2=uri.lastIndexOf(".");
if(_b2<=0){
_b2=uri.length-1;
}
var _b3=uri.substring(0,_b2)+".xd";
if(_b2!=uri.length-1){
_b3+=uri.substring(_b2,uri.length);
}
var _b4=document.createElement("script");
_b4.type="text/javascript";
_b4.src=_b3;
if(!this.headElement){
this.headElement=document.getElementsByTagName("head")[0];
if(!this.headElement){
this.headElement=document.getElementsByTagName("html")[0];
}
}
this.headElement.appendChild(_b4);
}else{
var _b5=this.getText(uri,null,true);
if(_b5==null){
return 0;
}
if(this.isXDomain&&uri.indexOf("/nls/")==-1){
var pkg=this.createXdPackage(_b5,_b1,uri);
dj_eval(pkg);
}else{
if(cb){
_b5="("+_b5+")";
}
var _b7=dj_eval(_b5);
if(cb){
cb(_b7);
}
}
}
this.loadedUris[uri]=true;
return 1;
};
dojo.hostenv.packageLoaded=function(pkg){
var _b9=pkg.depends;
var _ba=null;
var _bb=null;
var _bc=[];
if(_b9&&_b9.length>0){
var dep=null;
var _be=0;
var _bf=false;
for(var i=0;i<_b9.length;i++){
dep=_b9[i];
if(dep[0]=="provide"||dep[0]=="hostenv.moduleLoaded"){
_bc.push(dep[1]);
}else{
if(!_ba){
_ba=[];
}
if(!_bb){
_bb=[];
}
var _c1=this.unpackXdDependency(dep);
if(_c1.requires){
_ba=_ba.concat(_c1.requires);
}
if(_c1.requiresAfter){
_bb=_bb.concat(_c1.requiresAfter);
}
}
var _c2=dep[0];
var _c3=_c2.split(".");
if(_c3.length==2){
dojo[_c3[0]][_c3[1]].apply(dojo[_c3[0]],dep.slice(1));
}else{
dojo[_c2].apply(dojo,dep.slice(1));
}
}
var _c4=this.xdContents.push({content:pkg.definePackage,resourceName:pkg["resourceName"],resourcePath:pkg["resourcePath"],isDefined:false})-1;
for(var i=0;i<_bc.length;i++){
this.xdDepMap[_bc[i]]={requires:_ba,requiresAfter:_bb,contentIndex:_c4};
}
for(var i=0;i<_bc.length;i++){
this.xdInFlight[_bc[i]]=false;
}
}
};
dojo.hostenv.xdLoadFlattenedBundle=function(_c5,_c6,_c7,_c8){
_c7=_c7||"root";
var _c9=dojo.hostenv.normalizeLocale(_c7).replace("-","_");
var _ca=[_c5,"nls",_c6].join(".");
var _cb=dojo.hostenv.startPackage(_ca);
_cb[_c9]=_c8;
var _cc=[_c5,_c9,_c6].join(".");
var _cd=dojo.hostenv.xdBundleMap[_cc];
if(_cd){
for(var _ce in _cd){
_cb[_ce]=_c8;
}
}
};
dojo.hostenv.xdBundleMap={};
dojo.xdRequireLocalization=function(_cf,_d0,_d1,_d2){
var _d3=_d2.split(",");
var _d4=dojo.hostenv.normalizeLocale(_d1);
var _d5="";
for(var i=0;i<_d3.length;i++){
if(_d4.indexOf(_d3[i])==0){
if(_d3[i].length>_d5.length){
_d5=_d3[i];
}
}
}
var _d7=_d5.replace("-","_");
var _d8=dojo.evalObjPath([_cf,"nls",_d0].join("."));
if(_d8&&_d8[_d7]){
bundle[_d4.replace("-","_")]=_d8[_d7];
}else{
var _d9=[_cf,(_d7||"root"),_d0].join(".");
var _da=dojo.hostenv.xdBundleMap[_d9];
if(!_da){
_da=dojo.hostenv.xdBundleMap[_d9]={};
}
_da[_d4.replace("-","_")]=true;
dojo.require(_cf+".nls"+(_d5?"."+_d5:"")+"."+_d0);
}
};
(function(){
var _db=djConfig.extraLocale;
if(_db){
if(!_db instanceof Array){
_db=[_db];
}
dojo._xdReqLoc=dojo.xdRequireLocalization;
dojo.xdRequireLocalization=function(m,b,_de,_df){
dojo._xdReqLoc(m,b,_de,_df);
if(_de){
return;
}
for(var i=0;i<_db.length;i++){
dojo._xdReqLoc(m,b,_db[i],_df);
}
};
}
})();
dojo.hostenv.unpackXdDependency=function(dep){
var _e2=null;
var _e3=null;
switch(dep[0]){
case "requireIf":
case "requireAfterIf":
case "conditionalRequire":
if((dep[1]===true)||(dep[1]=="common")||(dep[1]&&dojo.render[dep[1]].capable)){
_e2=[{name:dep[2],content:null}];
}
break;
case "requireAll":
dep.shift();
_e2=dep;
dojo.hostenv.flattenRequireArray(_e2);
break;
case "kwCompoundRequire":
case "hostenv.conditionalLoadModule":
var _e4=dep[1];
var _e5=_e4["common"]||[];
var _e2=(_e4[dojo.hostenv.name_])?_e5.concat(_e4[dojo.hostenv.name_]||[]):_e5.concat(_e4["default"]||[]);
dojo.hostenv.flattenRequireArray(_e2);
break;
case "require":
case "requireAfter":
case "hostenv.loadModule":
_e2=[{name:dep[1],content:null}];
break;
}
if(dep[0]=="requireAfterIf"||dep[0]=="requireIf"){
_e3=_e2;
_e2=null;
}
return {requires:_e2,requiresAfter:_e3};
};
dojo.hostenv.xdWalkReqs=function(){
var _e6=null;
var req;
for(var i=0;i<this.xdOrderedReqs.length;i++){
req=this.xdOrderedReqs[i];
if(this.xdDepMap[req]){
_e6=[req];
_e6[req]=true;
this.xdEvalReqs(_e6);
}
}
};
dojo.hostenv.xdEvalReqs=function(_e9){
while(_e9.length>0){
var req=_e9[_e9.length-1];
var pkg=this.xdDepMap[req];
if(pkg){
var _ec=pkg.requires;
if(_ec&&_ec.length>0){
var _ed;
for(var i=0;i<_ec.length;i++){
_ed=_ec[i].name;
if(_ed&&!_e9[_ed]){
_e9.push(_ed);
_e9[_ed]=true;
this.xdEvalReqs(_e9);
}
}
}
var _ef=this.xdContents[pkg.contentIndex];
if(!_ef.isDefined){
var _f0=_ef.content;
_f0["resourceName"]=_ef["resourceName"];
_f0["resourcePath"]=_ef["resourcePath"];
this.xdDefList.push(_f0);
_ef.isDefined=true;
}
this.xdDepMap[req]=null;
var _ec=pkg.requiresAfter;
if(_ec&&_ec.length>0){
var _ed;
for(var i=0;i<_ec.length;i++){
_ed=_ec[i].name;
if(_ed&&!_e9[_ed]){
_e9.push(_ed);
_e9[_ed]=true;
this.xdEvalReqs(_e9);
}
}
}
}
_e9.pop();
}
};
dojo.hostenv.clearXdInterval=function(){
clearInterval(this.xdTimer);
this.xdTimer=0;
};
dojo.hostenv.watchInFlightXDomain=function(){
var _f1=(djConfig.xdWaitSeconds||15)*1000;
if(this.xdStartTime+_f1<(new Date()).getTime()){
this.clearXdInterval();
var _f2="";
for(var _f3 in this.xdInFlight){
if(this.xdInFlight[_f3]){
_f2+=_f3+" ";
}
}
dojo.raise("Could not load cross-domain packages: "+_f2);
}
for(var _f3 in this.xdInFlight){
if(this.xdInFlight[_f3]){
return;
}
}
this.clearXdInterval();
this.xdWalkReqs();
var _f4=this.xdDefList.length;
for(var i=0;i<_f4;i++){
var _f6=dojo.hostenv.xdDefList[i];
if(djConfig["debugAtAllCosts"]&&_f6["resourceName"]){
if(!this["xdDebugQueue"]){
this.xdDebugQueue=[];
}
this.xdDebugQueue.push({resourceName:_f6.resourceName,resourcePath:_f6.resourcePath});
}else{
_f6(dojo);
}
}
for(var i=0;i<this.xdContents.length;i++){
var _f7=this.xdContents[i];
if(_f7.content&&!_f7.isDefined){
_f7.content(dojo);
}
}
this.resetXd();
if(this["xdDebugQueue"]&&this.xdDebugQueue.length>0){
this.xdDebugFileLoaded();
}else{
this.xdNotifyLoaded();
}
};
dojo.hostenv.xdNotifyLoaded=function(){
this.inFlightCount=0;
if(this._djInitFired&&!this.loadNotifying){
this.callLoaded();
}
};
dojo.hostenv.flattenRequireArray=function(_f8){
if(_f8){
for(var i=0;i<_f8.length;i++){
if(_f8[i] instanceof Array){
_f8[i]={name:_f8[i][0],content:null};
}else{
_f8[i]={name:_f8[i],content:null};
}
}
}
};
dojo.hostenv.xdHasCalledPreload=false;
dojo.hostenv.xdRealCallLoaded=dojo.hostenv.callLoaded;
dojo.hostenv.callLoaded=function(){
if(this.xdHasCalledPreload||dojo.hostenv.getModulePrefix("dojo")=="src"||!this.localesGenerated){
this.xdRealCallLoaded();
}else{
if(this.localesGenerated){
this.registerNlsPrefix=function(){
dojo.registerModulePath("nls",dojo.hostenv.getModulePrefix("dojo")+"/../nls");
};
this.preloadLocalizations();
}
}
this.xdHasCalledPreload=true;
};
}
if(typeof window!="undefined"){
(function(){
if(djConfig.allowQueryConfig){
var _fa=document.location.toString();
var _fb=_fa.split("?",2);
if(_fb.length>1){
var _fc=_fb[1];
var _fd=_fc.split("&");
for(var x in _fd){
var sp=_fd[x].split("=");
if((sp[0].length>9)&&(sp[0].substr(0,9)=="djConfig.")){
var opt=sp[0].substr(9);
try{
djConfig[opt]=eval(sp[1]);
}
catch(e){
djConfig[opt]=sp[1];
}
}
}
}
}
if(((djConfig["baseScriptUri"]=="")||(djConfig["baseRelativePath"]==""))&&(document&&document.getElementsByTagName)){
var _101=document.getElementsByTagName("script");
var _102=/(__package__|dojo|bootstrap1)\.js([\?\.]|$)/i;
for(var i=0;i<_101.length;i++){
var src=_101[i].getAttribute("src");
if(!src){
continue;
}
var m=src.match(_102);
if(m){
var root=src.substring(0,m.index);
if(src.indexOf("bootstrap1")>-1){
root+="../";
}
if(!this["djConfig"]){
djConfig={};
}
if(djConfig["baseScriptUri"]==""){
djConfig["baseScriptUri"]=root;
}
if(djConfig["baseRelativePath"]==""){
djConfig["baseRelativePath"]=root;
}
break;
}
}
}
var dr=dojo.render;
var drh=dojo.render.html;
var drs=dojo.render.svg;
var dua=(drh.UA=navigator.userAgent);
var dav=(drh.AV=navigator.appVersion);
var t=true;
var f=false;
drh.capable=t;
drh.support.builtin=t;
dr.ver=parseFloat(drh.AV);
dr.os.mac=dav.indexOf("Macintosh")>=0;
dr.os.win=dav.indexOf("Windows")>=0;
dr.os.linux=dav.indexOf("X11")>=0;
drh.opera=dua.indexOf("Opera")>=0;
drh.khtml=(dav.indexOf("Konqueror")>=0)||(dav.indexOf("Safari")>=0);
drh.safari=dav.indexOf("Safari")>=0;
var _10e=dua.indexOf("Gecko");
drh.mozilla=drh.moz=(_10e>=0)&&(!drh.khtml);
if(drh.mozilla){
drh.geckoVersion=dua.substring(_10e+6,_10e+14);
}
drh.ie=(document.all)&&(!drh.opera);
drh.ie50=drh.ie&&dav.indexOf("MSIE 5.0")>=0;
drh.ie55=drh.ie&&dav.indexOf("MSIE 5.5")>=0;
drh.ie60=drh.ie&&dav.indexOf("MSIE 6.0")>=0;
drh.ie70=drh.ie&&dav.indexOf("MSIE 7.0")>=0;
var cm=document["compatMode"];
drh.quirks=(cm=="BackCompat")||(cm=="QuirksMode")||drh.ie55||drh.ie50;
dojo.locale=dojo.locale||(drh.ie?navigator.userLanguage:navigator.language).toLowerCase();
dr.vml.capable=drh.ie;
drs.capable=f;
drs.support.plugin=f;
drs.support.builtin=f;
var tdoc=window["document"];
var tdi=tdoc["implementation"];
if((tdi)&&(tdi["hasFeature"])&&(tdi.hasFeature("org.w3c.dom.svg","1.0"))){
drs.capable=t;
drs.support.builtin=t;
drs.support.plugin=f;
}
if(drh.safari){
var tmp=dua.split("AppleWebKit/")[1];
var ver=parseFloat(tmp.split(" ")[0]);
if(ver>=420){
drs.capable=t;
drs.support.builtin=t;
drs.support.plugin=f;
}
}else{
}
})();
dojo.hostenv.startPackage("dojo.hostenv");
dojo.render.name=dojo.hostenv.name_="browser";
dojo.hostenv.searchIds=[];
dojo.hostenv._XMLHTTP_PROGIDS=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];
dojo.hostenv.getXmlhttpObject=function(){
var http=null;
var _115=null;
try{
http=new XMLHttpRequest();
}
catch(e){
}
if(!http){
for(var i=0;i<3;++i){
var _117=dojo.hostenv._XMLHTTP_PROGIDS[i];
try{
http=new ActiveXObject(_117);
}
catch(e){
_115=e;
}
if(http){
dojo.hostenv._XMLHTTP_PROGIDS=[_117];
break;
}
}
}
if(!http){
return dojo.raise("XMLHTTP not available",_115);
}
return http;
};
dojo.hostenv._blockAsync=false;
dojo.hostenv.getText=function(uri,_119,_11a){
if(!_119){
this._blockAsync=true;
}
var http=this.getXmlhttpObject();
function isDocumentOk(http){
var stat=http["status"];
return Boolean((!stat)||((200<=stat)&&(300>stat))||(stat==304));
}
if(_119){
var _11e=this,_11f=null,gbl=dojo.global();
var xhr=dojo.evalObjPath("dojo.io.XMLHTTPTransport");
http.onreadystatechange=function(){
if(_11f){
gbl.clearTimeout(_11f);
_11f=null;
}
if(_11e._blockAsync||(xhr&&xhr._blockAsync)){
_11f=gbl.setTimeout(function(){
http.onreadystatechange.apply(this);
},10);
}else{
if(4==http.readyState){
if(isDocumentOk(http)){
_119(http.responseText);
}
}
}
};
}
http.open("GET",uri,_119?true:false);
try{
http.send(null);
if(_119){
return null;
}
if(!isDocumentOk(http)){
var err=Error("Unable to load "+uri+" status:"+http.status);
err.status=http.status;
err.responseText=http.responseText;
throw err;
}
}
catch(e){
this._blockAsync=false;
if((_11a)&&(!_119)){
return null;
}else{
throw e;
}
}
this._blockAsync=false;
return http.responseText;
};
dojo.hostenv.defaultDebugContainerId="dojoDebug";
dojo.hostenv._println_buffer=[];
dojo.hostenv._println_safe=false;
dojo.hostenv.println=function(line){
if(!dojo.hostenv._println_safe){
dojo.hostenv._println_buffer.push(line);
}else{
try{
var _124=document.getElementById(djConfig.debugContainerId?djConfig.debugContainerId:dojo.hostenv.defaultDebugContainerId);
if(!_124){
_124=dojo.body();
}
var div=document.createElement("div");
div.appendChild(document.createTextNode(line));
_124.appendChild(div);
}
catch(e){
try{
document.write("<div>"+line+"</div>");
}
catch(e2){
window.status=line;
}
}
}
};
dojo.addOnLoad(function(){
dojo.hostenv._println_safe=true;
while(dojo.hostenv._println_buffer.length>0){
dojo.hostenv.println(dojo.hostenv._println_buffer.shift());
}
});
function dj_addNodeEvtHdlr(node,_127,fp){
var _129=node["on"+_127]||function(){
};
node["on"+_127]=function(){
fp.apply(node,arguments);
_129.apply(node,arguments);
};
return true;
}
dojo.hostenv._djInitFired=false;
function dj_load_init(e){
dojo.hostenv._djInitFired=true;
var type=(e&&e.type)?e.type.toLowerCase():"load";
if(arguments.callee.initialized||(type!="domcontentloaded"&&type!="load")){
return;
}
arguments.callee.initialized=true;
if(typeof (_timer)!="undefined"){
clearInterval(_timer);
delete _timer;
}
var _12c=function(){
if(dojo.render.html.ie){
dojo.hostenv.makeWidgets();
}
};
if(dojo.hostenv.inFlightCount==0){
_12c();
dojo.hostenv.modulesLoaded();
}else{
dojo.hostenv.modulesLoadedListeners.unshift(_12c);
}
}
if(document.addEventListener){
if(dojo.render.html.opera||(dojo.render.html.moz&&(djConfig["enableMozDomContentLoaded"]===true))){
document.addEventListener("DOMContentLoaded",dj_load_init,null);
}
window.addEventListener("load",dj_load_init,null);
}
if(dojo.render.html.ie&&dojo.render.os.win){
document.attachEvent("onreadystatechange",function(e){
if(document.readyState=="complete"){
dj_load_init();
}
});
}
if(/(WebKit|khtml)/i.test(navigator.userAgent)){
var _timer=setInterval(function(){
if(/loaded|complete/.test(document.readyState)){
dj_load_init();
}
},10);
}
if(dojo.render.html.ie){
dj_addNodeEvtHdlr(window,"beforeunload",function(){
dojo.hostenv._unloading=true;
window.setTimeout(function(){
dojo.hostenv._unloading=false;
},0);
});
}
dj_addNodeEvtHdlr(window,"unload",function(){
dojo.hostenv.unloaded();
if((!dojo.render.html.ie)||(dojo.render.html.ie&&dojo.hostenv._unloading)){
dojo.hostenv.unloaded();
}
});
dojo.hostenv.makeWidgets=function(){
var sids=[];
if(djConfig.searchIds&&djConfig.searchIds.length>0){
sids=sids.concat(djConfig.searchIds);
}
if(dojo.hostenv.searchIds&&dojo.hostenv.searchIds.length>0){
sids=sids.concat(dojo.hostenv.searchIds);
}
if((djConfig.parseWidgets)||(sids.length>0)){
if(dojo.evalObjPath("dojo.widget.Parse")){
var _12f=new dojo.xml.Parse();
if(sids.length>0){
for(var x=0;x<sids.length;x++){
var _131=document.getElementById(sids[x]);
if(!_131){
continue;
}
var frag=_12f.parseElement(_131,null,true);
dojo.widget.getParser().createComponents(frag);
}
}else{
if(djConfig.parseWidgets){
var frag=_12f.parseElement(dojo.body(),null,true);
dojo.widget.getParser().createComponents(frag);
}
}
}
}
};
dojo.addOnLoad(function(){
if(!dojo.render.html.ie){
dojo.hostenv.makeWidgets();
}
});
try{
if(dojo.render.html.ie){
document.namespaces.add("v","urn:schemas-microsoft-com:vml");
document.createStyleSheet().addRule("v\\:*","behavior:url(#default#VML)");
}
}
catch(e){
}
dojo.hostenv.writeIncludes=function(){
};
if(!dj_undef("document",this)){
dj_currentDocument=this.document;
}
dojo.doc=function(){
return dj_currentDocument;
};
dojo.body=function(){
return dojo.doc().body||dojo.doc().getElementsByTagName("body")[0];
};
dojo.byId=function(id,doc){
if((id)&&((typeof id=="string")||(id instanceof String))){
if(!doc){
doc=dj_currentDocument;
}
var ele=doc.getElementById(id);
if(ele&&(ele.id!=id)&&doc.all){
ele=null;
eles=doc.all[id];
if(eles){
if(eles.length){
for(var i=0;i<eles.length;i++){
if(eles[i].id==id){
ele=eles[i];
break;
}
}
}else{
ele=eles;
}
}
}
return ele;
}
return id;
};
dojo.setContext=function(_137,_138){
dj_currentContext=_137;
dj_currentDocument=_138;
};
dojo._fireCallback=function(_139,_13a,_13b){
if((_13a)&&((typeof _139=="string")||(_139 instanceof String))){
_139=_13a[_139];
}
return (_13a?_139.apply(_13a,_13b||[]):_139());
};
dojo.withGlobal=function(_13c,_13d,_13e,_13f){
var rval;
var _141=dj_currentContext;
var _142=dj_currentDocument;
try{
dojo.setContext(_13c,_13c.document);
rval=dojo._fireCallback(_13d,_13e,_13f);
}
finally{
dojo.setContext(_141,_142);
}
return rval;
};
dojo.withDoc=function(_143,_144,_145,_146){
var rval;
var _148=dj_currentDocument;
try{
dj_currentDocument=_143;
rval=dojo._fireCallback(_144,_145,_146);
}
finally{
dj_currentDocument=_148;
}
return rval;
};
}
dojo.requireIf((djConfig["isDebug"]||djConfig["debugAtAllCosts"]),"dojo.debug");
dojo.requireIf(djConfig["debugAtAllCosts"]&&!window.widget&&!djConfig["useXDomain"],"dojo.browser_debug");
dojo.requireIf(djConfig["debugAtAllCosts"]&&!window.widget&&djConfig["useXDomain"],"dojo.browser_debug_xd");
dojo.provide("dojo.dom");
dojo.dom.ELEMENT_NODE=1;
dojo.dom.ATTRIBUTE_NODE=2;
dojo.dom.TEXT_NODE=3;
dojo.dom.CDATA_SECTION_NODE=4;
dojo.dom.ENTITY_REFERENCE_NODE=5;
dojo.dom.ENTITY_NODE=6;
dojo.dom.PROCESSING_INSTRUCTION_NODE=7;
dojo.dom.COMMENT_NODE=8;
dojo.dom.DOCUMENT_NODE=9;
dojo.dom.DOCUMENT_TYPE_NODE=10;
dojo.dom.DOCUMENT_FRAGMENT_NODE=11;
dojo.dom.NOTATION_NODE=12;
dojo.dom.dojoml="http://www.dojotoolkit.org/2004/dojoml";
dojo.dom.xmlns={svg:"http://www.w3.org/2000/svg",smil:"http://www.w3.org/2001/SMIL20/",mml:"http://www.w3.org/1998/Math/MathML",cml:"http://www.xml-cml.org",xlink:"http://www.w3.org/1999/xlink",xhtml:"http://www.w3.org/1999/xhtml",xul:"http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",xbl:"http://www.mozilla.org/xbl",fo:"http://www.w3.org/1999/XSL/Format",xsl:"http://www.w3.org/1999/XSL/Transform",xslt:"http://www.w3.org/1999/XSL/Transform",xi:"http://www.w3.org/2001/XInclude",xforms:"http://www.w3.org/2002/01/xforms",saxon:"http://icl.com/saxon",xalan:"http://xml.apache.org/xslt",xsd:"http://www.w3.org/2001/XMLSchema",dt:"http://www.w3.org/2001/XMLSchema-datatypes",xsi:"http://www.w3.org/2001/XMLSchema-instance",rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",rdfs:"http://www.w3.org/2000/01/rdf-schema#",dc:"http://purl.org/dc/elements/1.1/",dcq:"http://purl.org/dc/qualifiers/1.0","soap-env":"http://schemas.xmlsoap.org/soap/envelope/",wsdl:"http://schemas.xmlsoap.org/wsdl/",AdobeExtensions:"http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"};
dojo.dom.isNode=function(wh){
if(typeof Element=="function"){
try{
return wh instanceof Element;
}
catch(e){
}
}else{
return wh&&!isNaN(wh.nodeType);
}
};
dojo.dom.getUniqueId=function(){
var _14a=dojo.doc();
do{
var id="dj_unique_"+(++arguments.callee._idIncrement);
}while(_14a.getElementById(id));
return id;
};
dojo.dom.getUniqueId._idIncrement=0;
dojo.dom.firstElement=dojo.dom.getFirstChildElement=function(_14c,_14d){
var node=_14c.firstChild;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.nextSibling;
}
if(_14d&&node&&node.tagName&&node.tagName.toLowerCase()!=_14d.toLowerCase()){
node=dojo.dom.nextElement(node,_14d);
}
return node;
};
dojo.dom.lastElement=dojo.dom.getLastChildElement=function(_14f,_150){
var node=_14f.lastChild;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.previousSibling;
}
if(_150&&node&&node.tagName&&node.tagName.toLowerCase()!=_150.toLowerCase()){
node=dojo.dom.prevElement(node,_150);
}
return node;
};
dojo.dom.nextElement=dojo.dom.getNextSiblingElement=function(node,_153){
if(!node){
return null;
}
do{
node=node.nextSibling;
}while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE);
if(node&&_153&&_153.toLowerCase()!=node.tagName.toLowerCase()){
return dojo.dom.nextElement(node,_153);
}
return node;
};
dojo.dom.prevElement=dojo.dom.getPreviousSiblingElement=function(node,_155){
if(!node){
return null;
}
if(_155){
_155=_155.toLowerCase();
}
do{
node=node.previousSibling;
}while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE);
if(node&&_155&&_155.toLowerCase()!=node.tagName.toLowerCase()){
return dojo.dom.prevElement(node,_155);
}
return node;
};
dojo.dom.moveChildren=function(_156,_157,trim){
var _159=0;
if(trim){
while(_156.hasChildNodes()&&_156.firstChild.nodeType==dojo.dom.TEXT_NODE){
_156.removeChild(_156.firstChild);
}
while(_156.hasChildNodes()&&_156.lastChild.nodeType==dojo.dom.TEXT_NODE){
_156.removeChild(_156.lastChild);
}
}
while(_156.hasChildNodes()){
_157.appendChild(_156.firstChild);
_159++;
}
return _159;
};
dojo.dom.copyChildren=function(_15a,_15b,trim){
var _15d=_15a.cloneNode(true);
return this.moveChildren(_15d,_15b,trim);
};
dojo.dom.replaceChildren=function(node,_15f){
var _160=[];
if(dojo.render.html.ie){
for(var i=0;i<node.childNodes.length;i++){
_160.push(node.childNodes[i]);
}
}
dojo.dom.removeChildren(node);
node.appendChild(_15f);
for(var i=0;i<_160.length;i++){
dojo.dom.destroyNode(_160[i]);
}
};
dojo.dom.removeChildren=function(node){
var _163=node.childNodes.length;
while(node.hasChildNodes()){
dojo.dom.removeNode(node.firstChild);
}
return _163;
};
dojo.dom.replaceNode=function(node,_165){
return node.parentNode.replaceChild(_165,node);
};
dojo.dom.destroyNode=function(node){
if(node.parentNode){
node=dojo.dom.removeNode(node);
}
if(node.nodeType!=3){
if(dojo.evalObjPath("dojo.event.browser.clean",false)){
dojo.event.browser.clean(node);
}
if(dojo.render.html.ie){
node.outerHTML="";
}
}
};
dojo.dom.removeNode=function(node){
if(node&&node.parentNode){
return node.parentNode.removeChild(node);
}
};
dojo.dom.getAncestors=function(node,_169,_16a){
var _16b=[];
var _16c=(_169&&(_169 instanceof Function||typeof _169=="function"));
while(node){
if(!_16c||_169(node)){
_16b.push(node);
}
if(_16a&&_16b.length>0){
return _16b[0];
}
node=node.parentNode;
}
if(_16a){
return null;
}
return _16b;
};
dojo.dom.getAncestorsByTag=function(node,tag,_16f){
tag=tag.toLowerCase();
return dojo.dom.getAncestors(node,function(el){
return ((el.tagName)&&(el.tagName.toLowerCase()==tag));
},_16f);
};
dojo.dom.getFirstAncestorByTag=function(node,tag){
return dojo.dom.getAncestorsByTag(node,tag,true);
};
dojo.dom.isDescendantOf=function(node,_174,_175){
if(_175&&node){
node=node.parentNode;
}
while(node){
if(node==_174){
return true;
}
node=node.parentNode;
}
return false;
};
dojo.dom.innerXML=function(node){
if(node.innerXML){
return node.innerXML;
}else{
if(node.xml){
return node.xml;
}else{
if(typeof XMLSerializer!="undefined"){
return (new XMLSerializer()).serializeToString(node);
}
}
}
};
dojo.dom.createDocument=function(){
var doc=null;
var _178=dojo.doc();
if(!dj_undef("ActiveXObject")){
var _179=["MSXML2","Microsoft","MSXML","MSXML3"];
for(var i=0;i<_179.length;i++){
try{
doc=new ActiveXObject(_179[i]+".XMLDOM");
}
catch(e){
}
if(doc){
break;
}
}
}else{
if((_178.implementation)&&(_178.implementation.createDocument)){
doc=_178.implementation.createDocument("","",null);
}
}
return doc;
};
dojo.dom.createDocumentFromText=function(str,_17c){
if(!_17c){
_17c="text/xml";
}
if(!dj_undef("DOMParser")){
var _17d=new DOMParser();
return _17d.parseFromString(str,_17c);
}else{
if(!dj_undef("ActiveXObject")){
var _17e=dojo.dom.createDocument();
if(_17e){
_17e.async=false;
_17e.loadXML(str);
return _17e;
}else{
dojo.debug("toXml didn't work?");
}
}else{
var _17f=dojo.doc();
if(_17f.createElement){
var tmp=_17f.createElement("xml");
tmp.innerHTML=str;
if(_17f.implementation&&_17f.implementation.createDocument){
var _181=_17f.implementation.createDocument("foo","",null);
for(var i=0;i<tmp.childNodes.length;i++){
_181.importNode(tmp.childNodes.item(i),true);
}
return _181;
}
return ((tmp.document)&&(tmp.document.firstChild?tmp.document.firstChild:tmp));
}
}
}
return null;
};
dojo.dom.prependChild=function(node,_184){
if(_184.firstChild){
_184.insertBefore(node,_184.firstChild);
}else{
_184.appendChild(node);
}
return true;
};
dojo.dom.insertBefore=function(node,ref,_187){
if((_187!=true)&&(node===ref||node.nextSibling===ref)){
return false;
}
var _188=ref.parentNode;
_188.insertBefore(node,ref);
return true;
};
dojo.dom.insertAfter=function(node,ref,_18b){
var pn=ref.parentNode;
if(ref==pn.lastChild){
if((_18b!=true)&&(node===ref)){
return false;
}
pn.appendChild(node);
}else{
return this.insertBefore(node,ref.nextSibling,_18b);
}
return true;
};
dojo.dom.insertAtPosition=function(node,ref,_18f){
if((!node)||(!ref)||(!_18f)){
return false;
}
switch(_18f.toLowerCase()){
case "before":
return dojo.dom.insertBefore(node,ref);
case "after":
return dojo.dom.insertAfter(node,ref);
case "first":
if(ref.firstChild){
return dojo.dom.insertBefore(node,ref.firstChild);
}else{
ref.appendChild(node);
return true;
}
break;
default:
ref.appendChild(node);
return true;
}
};
dojo.dom.insertAtIndex=function(node,_191,_192){
var _193=_191.childNodes;
if(!_193.length||_193.length==_192){
_191.appendChild(node);
return true;
}
if(_192==0){
return dojo.dom.prependChild(node,_191);
}
return dojo.dom.insertAfter(node,_193[_192-1]);
};
dojo.dom.textContent=function(node,text){
if(arguments.length>1){
var _196=dojo.doc();
dojo.dom.replaceChildren(node,_196.createTextNode(text));
return text;
}else{
if(node.textContent!=undefined){
return node.textContent;
}
var _197="";
if(node==null){
return _197;
}
for(var i=0;i<node.childNodes.length;i++){
switch(node.childNodes[i].nodeType){
case 1:
case 5:
_197+=dojo.dom.textContent(node.childNodes[i]);
break;
case 3:
case 2:
case 4:
_197+=node.childNodes[i].nodeValue;
break;
default:
break;
}
}
return _197;
}
};
dojo.dom.hasParent=function(node){
return Boolean(node&&node.parentNode&&dojo.dom.isNode(node.parentNode));
};
dojo.dom.isTag=function(node){
if(node&&node.tagName){
for(var i=1;i<arguments.length;i++){
if(node.tagName==String(arguments[i])){
return String(arguments[i]);
}
}
}
return "";
};
dojo.dom.setAttributeNS=function(elem,_19d,_19e,_19f){
if(elem==null||((elem==undefined)&&(typeof elem=="undefined"))){
dojo.raise("No element given to dojo.dom.setAttributeNS");
}
if(!((elem.setAttributeNS==undefined)&&(typeof elem.setAttributeNS=="undefined"))){
elem.setAttributeNS(_19d,_19e,_19f);
}else{
var _1a0=elem.ownerDocument;
var _1a1=_1a0.createNode(2,_19e,_19d);
_1a1.nodeValue=_19f;
elem.setAttributeNode(_1a1);
}
};
dojo.provide("dojo.xml.Parse");
dojo.xml.Parse=function(){
var isIE=((dojo.render.html.capable)&&(dojo.render.html.ie));
function getTagName(node){
try{
return node.tagName.toLowerCase();
}
catch(e){
return "";
}
}
function getDojoTagName(node){
var _1a5=getTagName(node);
if(!_1a5){
return "";
}
if((dojo.widget)&&(dojo.widget.tags[_1a5])){
return _1a5;
}
var p=_1a5.indexOf(":");
if(p>=0){
return _1a5;
}
if(_1a5.substr(0,5)=="dojo:"){
return _1a5;
}
if(dojo.render.html.capable&&dojo.render.html.ie&&node.scopeName!="HTML"){
return node.scopeName.toLowerCase()+":"+_1a5;
}
if(_1a5.substr(0,4)=="dojo"){
return "dojo:"+_1a5.substring(4);
}
var djt=node.getAttribute("dojoType")||node.getAttribute("dojotype");
if(djt){
if(djt.indexOf(":")<0){
djt="dojo:"+djt;
}
return djt.toLowerCase();
}
djt=node.getAttributeNS&&node.getAttributeNS(dojo.dom.dojoml,"type");
if(djt){
return "dojo:"+djt.toLowerCase();
}
try{
djt=node.getAttribute("dojo:type");
}
catch(e){
}
if(djt){
return "dojo:"+djt.toLowerCase();
}
if((dj_global["djConfig"])&&(!djConfig["ignoreClassNames"])){
var _1a8=node.className||node.getAttribute("class");
if((_1a8)&&(_1a8.indexOf)&&(_1a8.indexOf("dojo-")!=-1)){
var _1a9=_1a8.split(" ");
for(var x=0,c=_1a9.length;x<c;x++){
if(_1a9[x].slice(0,5)=="dojo-"){
return "dojo:"+_1a9[x].substr(5).toLowerCase();
}
}
}
}
return "";
}
this.parseElement=function(node,_1ad,_1ae,_1af){
var _1b0=getTagName(node);
if(isIE&&_1b0.indexOf("/")==0){
return null;
}
try{
var attr=node.getAttribute("parseWidgets");
if(attr&&attr.toLowerCase()=="false"){
return {};
}
}
catch(e){
}
var _1b2=true;
if(_1ae){
var _1b3=getDojoTagName(node);
_1b0=_1b3||_1b0;
_1b2=Boolean(_1b3);
}
var _1b4={};
_1b4[_1b0]=[];
var pos=_1b0.indexOf(":");
if(pos>0){
var ns=_1b0.substring(0,pos);
_1b4["ns"]=ns;
if((dojo.ns)&&(!dojo.ns.allow(ns))){
_1b2=false;
}
}
if(_1b2){
var _1b7=this.parseAttributes(node);
for(var attr in _1b7){
if((!_1b4[_1b0][attr])||(typeof _1b4[_1b0][attr]!="array")){
_1b4[_1b0][attr]=[];
}
_1b4[_1b0][attr].push(_1b7[attr]);
}
_1b4[_1b0].nodeRef=node;
_1b4.tagName=_1b0;
_1b4.index=_1af||0;
}
var _1b8=0;
for(var i=0;i<node.childNodes.length;i++){
var tcn=node.childNodes.item(i);
switch(tcn.nodeType){
case dojo.dom.ELEMENT_NODE:
var ctn=getDojoTagName(tcn)||getTagName(tcn);
if(!_1b4[ctn]){
_1b4[ctn]=[];
}
_1b4[ctn].push(this.parseElement(tcn,true,_1ae,_1b8));
if((tcn.childNodes.length==1)&&(tcn.childNodes.item(0).nodeType==dojo.dom.TEXT_NODE)){
_1b4[ctn][_1b4[ctn].length-1].value=tcn.childNodes.item(0).nodeValue;
}
_1b8++;
break;
case dojo.dom.TEXT_NODE:
if(node.childNodes.length==1){
_1b4[_1b0].push({value:node.childNodes.item(0).nodeValue});
}
break;
default:
break;
}
}
return _1b4;
};
this.parseAttributes=function(node){
var _1bd={};
var atts=node.attributes;
var _1bf,i=0;
while((_1bf=atts[i++])){
if(isIE){
if(!_1bf){
continue;
}
if((typeof _1bf=="object")&&(typeof _1bf.nodeValue=="undefined")||(_1bf.nodeValue==null)||(_1bf.nodeValue=="")){
continue;
}
}
var nn=_1bf.nodeName.split(":");
nn=(nn.length==2)?nn[1]:_1bf.nodeName;
_1bd[nn]={value:_1bf.nodeValue};
}
return _1bd;
};
};
dojo.provide("dojo.lang.common");
dojo.lang.inherits=function(_1c2,_1c3){
if(!dojo.lang.isFunction(_1c3)){
dojo.raise("dojo.inherits: superclass argument ["+_1c3+"] must be a function (subclass: ["+_1c2+"']");
}
_1c2.prototype=new _1c3();
_1c2.prototype.constructor=_1c2;
_1c2.superclass=_1c3.prototype;
_1c2["super"]=_1c3.prototype;
};
dojo.lang._mixin=function(obj,_1c5){
var tobj={};
for(var x in _1c5){
if((typeof tobj[x]=="undefined")||(tobj[x]!=_1c5[x])){
obj[x]=_1c5[x];
}
}
if(dojo.render.html.ie&&(typeof (_1c5["toString"])=="function")&&(_1c5["toString"]!=obj["toString"])&&(_1c5["toString"]!=tobj["toString"])){
obj.toString=_1c5.toString;
}
return obj;
};
dojo.lang.mixin=function(obj,_1c9){
for(var i=1,l=arguments.length;i<l;i++){
dojo.lang._mixin(obj,arguments[i]);
}
return obj;
};
dojo.lang.extend=function(_1cc,_1cd){
for(var i=1,l=arguments.length;i<l;i++){
dojo.lang._mixin(_1cc.prototype,arguments[i]);
}
return _1cc;
};
dojo.inherits=dojo.lang.inherits;
dojo.mixin=dojo.lang.mixin;
dojo.extend=dojo.lang.extend;
dojo.lang.find=function(_1d0,_1d1,_1d2,_1d3){
if(!dojo.lang.isArrayLike(_1d0)&&dojo.lang.isArrayLike(_1d1)){
dojo.deprecated("dojo.lang.find(value, array)","use dojo.lang.find(array, value) instead","0.5");
var temp=_1d0;
_1d0=_1d1;
_1d1=temp;
}
var _1d5=dojo.lang.isString(_1d0);
if(_1d5){
_1d0=_1d0.split("");
}
if(_1d3){
var step=-1;
var i=_1d0.length-1;
var end=-1;
}else{
var step=1;
var i=0;
var end=_1d0.length;
}
if(_1d2){
while(i!=end){
if(_1d0[i]===_1d1){
return i;
}
i+=step;
}
}else{
while(i!=end){
if(_1d0[i]==_1d1){
return i;
}
i+=step;
}
}
return -1;
};
dojo.lang.indexOf=dojo.lang.find;
dojo.lang.findLast=function(_1d9,_1da,_1db){
return dojo.lang.find(_1d9,_1da,_1db,true);
};
dojo.lang.lastIndexOf=dojo.lang.findLast;
dojo.lang.inArray=function(_1dc,_1dd){
return dojo.lang.find(_1dc,_1dd)>-1;
};
dojo.lang.isObject=function(it){
if(typeof it=="undefined"){
return false;
}
return (typeof it=="object"||it===null||dojo.lang.isArray(it)||dojo.lang.isFunction(it));
};
dojo.lang.isArray=function(it){
return (it&&it instanceof Array||typeof it=="array");
};
dojo.lang.isArrayLike=function(it){
if((!it)||(dojo.lang.isUndefined(it))){
return false;
}
if(dojo.lang.isString(it)){
return false;
}
if(dojo.lang.isFunction(it)){
return false;
}
if(dojo.lang.isArray(it)){
return true;
}
if((it.tagName)&&(it.tagName.toLowerCase()=="form")){
return false;
}
if(dojo.lang.isNumber(it.length)&&isFinite(it.length)){
return true;
}
return false;
};
dojo.lang.isFunction=function(it){
return (it instanceof Function||typeof it=="function");
};
(function(){
if((dojo.render.html.capable)&&(dojo.render.html["safari"])){
dojo.lang.isFunction=function(it){
if((typeof (it)=="function")&&(it=="[object NodeList]")){
return false;
}
return (it instanceof Function||typeof it=="function");
};
}
})();
dojo.lang.isString=function(it){
return (typeof it=="string"||it instanceof String);
};
dojo.lang.isAlien=function(it){
if(!it){
return false;
}
return !dojo.lang.isFunction(it)&&/\{\s*\[native code\]\s*\}/.test(String(it));
};
dojo.lang.isBoolean=function(it){
return (it instanceof Boolean||typeof it=="boolean");
};
dojo.lang.isNumber=function(it){
return (it instanceof Number||typeof it=="number");
};
dojo.lang.isUndefined=function(it){
return ((typeof (it)=="undefined")&&(it==undefined));
};
dojo.provide("dojo.lang.func");
dojo.lang.hitch=function(_1e8,_1e9){
var args=[];
for(var x=2;x<arguments.length;x++){
args.push(arguments[x]);
}
var fcn=(dojo.lang.isString(_1e9)?_1e8[_1e9]:_1e9)||function(){
};
return function(){
var ta=args.concat([]);
for(var x=0;x<arguments.length;x++){
ta.push(arguments[x]);
}
return fcn.apply(_1e8,ta);
};
};
dojo.lang.anonCtr=0;
dojo.lang.anon={};
dojo.lang.nameAnonFunc=function(_1ef,_1f0,_1f1){
var nso=(_1f0||dojo.lang.anon);
if((_1f1)||((dj_global["djConfig"])&&(djConfig["slowAnonFuncLookups"]==true))){
for(var x in nso){
try{
if(nso[x]===_1ef){
return x;
}
}
catch(e){
}
}
}
var ret="__"+dojo.lang.anonCtr++;
while(typeof nso[ret]!="undefined"){
ret="__"+dojo.lang.anonCtr++;
}
nso[ret]=_1ef;
return ret;
};
dojo.lang.forward=function(_1f5){
return function(){
return this[_1f5].apply(this,arguments);
};
};
dojo.lang.curry=function(_1f6,func){
var _1f8=[];
_1f6=_1f6||dj_global;
if(dojo.lang.isString(func)){
func=_1f6[func];
}
for(var x=2;x<arguments.length;x++){
_1f8.push(arguments[x]);
}
var _1fa=(func["__preJoinArity"]||func.length)-_1f8.length;
function gather(_1fb,_1fc,_1fd){
var _1fe=_1fd;
var _1ff=_1fc.slice(0);
for(var x=0;x<_1fb.length;x++){
_1ff.push(_1fb[x]);
}
_1fd=_1fd-_1fb.length;
if(_1fd<=0){
var res=func.apply(_1f6,_1ff);
_1fd=_1fe;
return res;
}else{
return function(){
return gather(arguments,_1ff,_1fd);
};
}
}
return gather([],_1f8,_1fa);
};
dojo.lang.curryArguments=function(_202,func,args,_205){
var _206=[];
var x=_205||0;
for(x=_205;x<args.length;x++){
_206.push(args[x]);
}
return dojo.lang.curry.apply(dojo.lang,[_202,func].concat(_206));
};
dojo.lang.tryThese=function(){
for(var x=0;x<arguments.length;x++){
try{
if(typeof arguments[x]=="function"){
var ret=(arguments[x]());
if(ret){
return ret;
}
}
}
catch(e){
dojo.debug(e);
}
}
};
dojo.lang.delayThese=function(farr,cb,_20c,_20d){
if(!farr.length){
if(typeof _20d=="function"){
_20d();
}
return;
}
if((typeof _20c=="undefined")&&(typeof cb=="number")){
_20c=cb;
cb=function(){
};
}else{
if(!cb){
cb=function(){
};
if(!_20c){
_20c=0;
}
}
}
setTimeout(function(){
(farr.shift())();
cb();
dojo.lang.delayThese(farr,cb,_20c,_20d);
},_20c);
};
dojo.provide("dojo.lang.array");
dojo.lang.mixin(dojo.lang,{has:function(obj,name){
try{
return typeof obj[name]!="undefined";
}
catch(e){
return false;
}
},isEmpty:function(obj){
if(dojo.lang.isObject(obj)){
var tmp={};
var _212=0;
for(var x in obj){
if(obj[x]&&(!tmp[x])){
_212++;
break;
}
}
return _212==0;
}else{
if(dojo.lang.isArrayLike(obj)||dojo.lang.isString(obj)){
return obj.length==0;
}
}
},map:function(arr,obj,_216){
var _217=dojo.lang.isString(arr);
if(_217){
arr=arr.split("");
}
if(dojo.lang.isFunction(obj)&&(!_216)){
_216=obj;
obj=dj_global;
}else{
if(dojo.lang.isFunction(obj)&&_216){
var _218=obj;
obj=_216;
_216=_218;
}
}
if(Array.map){
var _219=Array.map(arr,_216,obj);
}else{
var _219=[];
for(var i=0;i<arr.length;++i){
_219.push(_216.call(obj,arr[i]));
}
}
if(_217){
return _219.join("");
}else{
return _219;
}
},reduce:function(arr,_21c,obj,_21e){
var _21f=_21c;
if(arguments.length==2){
_21e=_21c;
_21f=arr[0];
arr=arr.slice(1);
}else{
if(arguments.length==3){
if(dojo.lang.isFunction(obj)){
_21e=obj;
obj=null;
}
}else{
if(dojo.lang.isFunction(obj)){
var tmp=_21e;
_21e=obj;
obj=tmp;
}
}
}
var ob=obj||dj_global;
dojo.lang.map(arr,function(val){
_21f=_21e.call(ob,_21f,val);
});
return _21f;
},forEach:function(_223,_224,_225){
if(dojo.lang.isString(_223)){
_223=_223.split("");
}
if(Array.forEach){
Array.forEach(_223,_224,_225);
}else{
if(!_225){
_225=dj_global;
}
for(var i=0,l=_223.length;i<l;i++){
_224.call(_225,_223[i],i,_223);
}
}
},_everyOrSome:function(_228,arr,_22a,_22b){
if(dojo.lang.isString(arr)){
arr=arr.split("");
}
if(Array.every){
return Array[_228?"every":"some"](arr,_22a,_22b);
}else{
if(!_22b){
_22b=dj_global;
}
for(var i=0,l=arr.length;i<l;i++){
var _22e=_22a.call(_22b,arr[i],i,arr);
if(_228&&!_22e){
return false;
}else{
if((!_228)&&(_22e)){
return true;
}
}
}
return Boolean(_228);
}
},every:function(arr,_230,_231){
return this._everyOrSome(true,arr,_230,_231);
},some:function(arr,_233,_234){
return this._everyOrSome(false,arr,_233,_234);
},filter:function(arr,_236,_237){
var _238=dojo.lang.isString(arr);
if(_238){
arr=arr.split("");
}
var _239;
if(Array.filter){
_239=Array.filter(arr,_236,_237);
}else{
if(!_237){
if(arguments.length>=3){
dojo.raise("thisObject doesn't exist!");
}
_237=dj_global;
}
_239=[];
for(var i=0;i<arr.length;i++){
if(_236.call(_237,arr[i],i,arr)){
_239.push(arr[i]);
}
}
}
if(_238){
return _239.join("");
}else{
return _239;
}
},unnest:function(){
var out=[];
for(var i=0;i<arguments.length;i++){
if(dojo.lang.isArrayLike(arguments[i])){
var add=dojo.lang.unnest.apply(this,arguments[i]);
out=out.concat(add);
}else{
out.push(arguments[i]);
}
}
return out;
},toArray:function(_23e,_23f){
var _240=[];
for(var i=_23f||0;i<_23e.length;i++){
_240.push(_23e[i]);
}
return _240;
}});
dojo.provide("dojo.lang.extras");
dojo.lang.setTimeout=function(func,_243){
var _244=window,_245=2;
if(!dojo.lang.isFunction(func)){
_244=func;
func=_243;
_243=arguments[2];
_245++;
}
if(dojo.lang.isString(func)){
func=_244[func];
}
var args=[];
for(var i=_245;i<arguments.length;i++){
args.push(arguments[i]);
}
return dojo.global().setTimeout(function(){
func.apply(_244,args);
},_243);
};
dojo.lang.clearTimeout=function(_248){
dojo.global().clearTimeout(_248);
};
dojo.lang.getNameInObj=function(ns,item){
if(!ns){
ns=dj_global;
}
for(var x in ns){
if(ns[x]===item){
return new String(x);
}
}
return null;
};
dojo.lang.shallowCopy=function(obj,deep){
var i,ret;
if(obj===null){
return null;
}
if(dojo.lang.isObject(obj)){
ret=new obj.constructor();
for(i in obj){
if(dojo.lang.isUndefined(ret[i])){
ret[i]=deep?dojo.lang.shallowCopy(obj[i],deep):obj[i];
}
}
}else{
if(dojo.lang.isArray(obj)){
ret=[];
for(i=0;i<obj.length;i++){
ret[i]=deep?dojo.lang.shallowCopy(obj[i],deep):obj[i];
}
}else{
ret=obj;
}
}
return ret;
};
dojo.lang.firstValued=function(){
for(var i=0;i<arguments.length;i++){
if(typeof arguments[i]!="undefined"){
return arguments[i];
}
}
return undefined;
};
dojo.lang.getObjPathValue=function(_251,_252,_253){
with(dojo.parseObjPath(_251,_252,_253)){
return dojo.evalProp(prop,obj,_253);
}
};
dojo.lang.setObjPathValue=function(_254,_255,_256,_257){
dojo.deprecated("dojo.lang.setObjPathValue","use dojo.parseObjPath and the '=' operator","0.6");
if(arguments.length<4){
_257=true;
}
with(dojo.parseObjPath(_254,_256,_257)){
if(obj&&(_257||(prop in obj))){
obj[prop]=_255;
}
}
};
dojo.provide("dojo.lang.declare");
dojo.lang.declare=function(_258,_259,init,_25b){
if((dojo.lang.isFunction(_25b))||((!_25b)&&(!dojo.lang.isFunction(init)))){
var temp=_25b;
_25b=init;
init=temp;
}
var _25d=[];
if(dojo.lang.isArray(_259)){
_25d=_259;
_259=_25d.shift();
}
if(!init){
init=dojo.evalObjPath(_258,false);
if((init)&&(!dojo.lang.isFunction(init))){
init=null;
}
}
var ctor=dojo.lang.declare._makeConstructor();
var scp=(_259?_259.prototype:null);
if(scp){
scp.prototyping=true;
ctor.prototype=new _259();
scp.prototyping=false;
}
ctor.superclass=scp;
ctor.mixins=_25d;
for(var i=0,l=_25d.length;i<l;i++){
dojo.lang.extend(ctor,_25d[i].prototype);
}
ctor.prototype.initializer=null;
ctor.prototype.declaredClass=_258;
if(dojo.lang.isArray(_25b)){
dojo.lang.extend.apply(dojo.lang,[ctor].concat(_25b));
}else{
dojo.lang.extend(ctor,(_25b)||{});
}
dojo.lang.extend(ctor,dojo.lang.declare._common);
ctor.prototype.constructor=ctor;
ctor.prototype.initializer=(ctor.prototype.initializer)||(init)||(function(){
});
var _262=dojo.parseObjPath(_258,null,true);
_262.obj[_262.prop]=ctor;
return ctor;
};
dojo.lang.declare._makeConstructor=function(){
return function(){
var self=this._getPropContext();
var s=self.constructor.superclass;
if((s)&&(s.constructor)){
if(s.constructor==arguments.callee){
this._inherited("constructor",arguments);
}else{
this._contextMethod(s,"constructor",arguments);
}
}
var ms=(self.constructor.mixins)||([]);
for(var i=0,m;(m=ms[i]);i++){
(((m.prototype)&&(m.prototype.initializer))||(m)).apply(this,arguments);
}
if((!this.prototyping)&&(self.initializer)){
self.initializer.apply(this,arguments);
}
};
};
dojo.lang.declare._common={_getPropContext:function(){
return (this.___proto||this);
},_contextMethod:function(_268,_269,args){
var _26b,_26c=this.___proto;
this.___proto=_268;
try{
_26b=_268[_269].apply(this,(args||[]));
}
catch(e){
throw e;
}
finally{
this.___proto=_26c;
}
return _26b;
},_inherited:function(prop,args){
var p=this._getPropContext();
do{
if((!p.constructor)||(!p.constructor.superclass)){
return;
}
p=p.constructor.superclass;
}while(!(prop in p));
return (dojo.lang.isFunction(p[prop])?this._contextMethod(p,prop,args):p[prop]);
},inherited:function(prop,args){
dojo.deprecated("'inherited' method is dangerous, do not up-call! 'inherited' is slated for removal in 0.5; name your super class (or use superclass property) instead.","0.5");
this._inherited(prop,args);
}};
dojo.declare=dojo.lang.declare;
dojo.provide("dojo.ns");
dojo.ns={namespaces:{},failed:{},loading:{},loaded:{},register:function(name,_273,_274,_275){
if(!_275||!this.namespaces[name]){
this.namespaces[name]=new dojo.ns.Ns(name,_273,_274);
}
},allow:function(name){
if(this.failed[name]){
return false;
}
if((djConfig.excludeNamespace)&&(dojo.lang.inArray(djConfig.excludeNamespace,name))){
return false;
}
return ((name==this.dojo)||(!djConfig.includeNamespace)||(dojo.lang.inArray(djConfig.includeNamespace,name)));
},get:function(name){
return this.namespaces[name];
},require:function(name){
var ns=this.namespaces[name];
if((ns)&&(this.loaded[name])){
return ns;
}
if(!this.allow(name)){
return false;
}
if(this.loading[name]){
dojo.debug("dojo.namespace.require: re-entrant request to load namespace \""+name+"\" must fail.");
return false;
}
var req=dojo.require;
this.loading[name]=true;
try{
if(name=="dojo"){
req("dojo.namespaces.dojo");
}else{
if(!dojo.hostenv.moduleHasPrefix(name)){
dojo.registerModulePath(name,"../"+name);
}
req([name,"manifest"].join("."),false,true);
}
if(!this.namespaces[name]){
this.failed[name]=true;
}
}
finally{
this.loading[name]=false;
}
return this.namespaces[name];
}};
dojo.ns.Ns=function(name,_27c,_27d){
this.name=name;
this.module=_27c;
this.resolver=_27d;
this._loaded=[];
this._failed=[];
};
dojo.ns.Ns.prototype.resolve=function(name,_27f,_280){
if(!this.resolver||djConfig["skipAutoRequire"]){
return false;
}
var _281=this.resolver(name,_27f);
if((_281)&&(!this._loaded[_281])&&(!this._failed[_281])){
var req=dojo.require;
req(_281,false,true);
if(dojo.hostenv.findModule(_281,false)){
this._loaded[_281]=true;
}else{
if(!_280){
dojo.raise("dojo.ns.Ns.resolve: module '"+_281+"' not found after loading via namespace '"+this.name+"'");
}
this._failed[_281]=true;
}
}
return Boolean(this._loaded[_281]);
};
dojo.registerNamespace=function(name,_284,_285){
dojo.ns.register.apply(dojo.ns,arguments);
};
dojo.registerNamespaceResolver=function(name,_287){
var n=dojo.ns.namespaces[name];
if(n){
n.resolver=_287;
}
};
dojo.registerNamespaceManifest=function(_289,path,name,_28c,_28d){
dojo.registerModulePath(name,path);
dojo.registerNamespace(name,_28c,_28d);
};
dojo.registerNamespace("dojo","dojo.widget");
dojo.provide("dojo.event.common");
dojo.event=new function(){
this._canTimeout=dojo.lang.isFunction(dj_global["setTimeout"])||dojo.lang.isAlien(dj_global["setTimeout"]);
function interpolateArgs(args,_28f){
var dl=dojo.lang;
var ao={srcObj:dj_global,srcFunc:null,adviceObj:dj_global,adviceFunc:null,aroundObj:null,aroundFunc:null,adviceType:(args.length>2)?args[0]:"after",precedence:"last",once:false,delay:null,rate:0,adviceMsg:false,maxCalls:-1};
switch(args.length){
case 0:
return;
case 1:
return;
case 2:
ao.srcFunc=args[0];
ao.adviceFunc=args[1];
break;
case 3:
if((dl.isObject(args[0]))&&(dl.isString(args[1]))&&(dl.isString(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
}else{
if((dl.isString(args[1]))&&(dl.isString(args[2]))){
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
}else{
if((dl.isObject(args[0]))&&(dl.isString(args[1]))&&(dl.isFunction(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
var _292=dl.nameAnonFunc(args[2],ao.adviceObj,_28f);
ao.adviceFunc=_292;
}else{
if((dl.isFunction(args[0]))&&(dl.isObject(args[1]))&&(dl.isString(args[2]))){
ao.adviceType="after";
ao.srcObj=dj_global;
var _292=dl.nameAnonFunc(args[0],ao.srcObj,_28f);
ao.srcFunc=_292;
ao.adviceObj=args[1];
ao.adviceFunc=args[2];
}
}
}
}
break;
case 4:
if((dl.isObject(args[0]))&&(dl.isObject(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isString(args[1]))&&(dl.isObject(args[2]))){
ao.adviceType=args[0];
ao.srcObj=dj_global;
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isFunction(args[1]))&&(dl.isObject(args[2]))){
ao.adviceType=args[0];
ao.srcObj=dj_global;
var _292=dl.nameAnonFunc(args[1],dj_global,_28f);
ao.srcFunc=_292;
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isObject(args[1]))&&(dl.isString(args[2]))&&(dl.isFunction(args[3]))){
ao.srcObj=args[1];
ao.srcFunc=args[2];
var _292=dl.nameAnonFunc(args[3],dj_global,_28f);
ao.adviceObj=dj_global;
ao.adviceFunc=_292;
}else{
if(dl.isObject(args[1])){
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=dj_global;
ao.adviceFunc=args[3];
}else{
if(dl.isObject(args[2])){
ao.srcObj=dj_global;
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
ao.srcObj=ao.adviceObj=ao.aroundObj=dj_global;
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
ao.aroundFunc=args[3];
}
}
}
}
}
}
break;
case 6:
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=args[3];
ao.adviceFunc=args[4];
ao.aroundFunc=args[5];
ao.aroundObj=dj_global;
break;
default:
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=args[3];
ao.adviceFunc=args[4];
ao.aroundObj=args[5];
ao.aroundFunc=args[6];
ao.once=args[7];
ao.delay=args[8];
ao.rate=args[9];
ao.adviceMsg=args[10];
ao.maxCalls=(!isNaN(parseInt(args[11])))?args[11]:-1;
break;
}
if(dl.isFunction(ao.aroundFunc)){
var _292=dl.nameAnonFunc(ao.aroundFunc,ao.aroundObj,_28f);
ao.aroundFunc=_292;
}
if(dl.isFunction(ao.srcFunc)){
ao.srcFunc=dl.getNameInObj(ao.srcObj,ao.srcFunc);
}
if(dl.isFunction(ao.adviceFunc)){
ao.adviceFunc=dl.getNameInObj(ao.adviceObj,ao.adviceFunc);
}
if((ao.aroundObj)&&(dl.isFunction(ao.aroundFunc))){
ao.aroundFunc=dl.getNameInObj(ao.aroundObj,ao.aroundFunc);
}
if(!ao.srcObj){
dojo.raise("bad srcObj for srcFunc: "+ao.srcFunc);
}
if(!ao.adviceObj){
dojo.raise("bad adviceObj for adviceFunc: "+ao.adviceFunc);
}
if(!ao.adviceFunc){
dojo.debug("bad adviceFunc for srcFunc: "+ao.srcFunc);
dojo.debugShallow(ao);
}
return ao;
}
this.connect=function(){
if(arguments.length==1){
var ao=arguments[0];
}else{
var ao=interpolateArgs(arguments,true);
}
if(dojo.lang.isString(ao.srcFunc)&&(ao.srcFunc.toLowerCase()=="onkey")){
if(dojo.render.html.ie){
ao.srcFunc="onkeydown";
this.connect(ao);
}
ao.srcFunc="onkeypress";
}
if(dojo.lang.isArray(ao.srcObj)&&ao.srcObj!=""){
var _294={};
for(var x in ao){
_294[x]=ao[x];
}
var mjps=[];
dojo.lang.forEach(ao.srcObj,function(src){
if((dojo.render.html.capable)&&(dojo.lang.isString(src))){
src=dojo.byId(src);
}
_294.srcObj=src;
mjps.push(dojo.event.connect.call(dojo.event,_294));
});
return mjps;
}
var mjp=dojo.event.MethodJoinPoint.getForMethod(ao.srcObj,ao.srcFunc);
if(ao.adviceFunc){
var mjp2=dojo.event.MethodJoinPoint.getForMethod(ao.adviceObj,ao.adviceFunc);
}
mjp.kwAddAdvice(ao);
return mjp;
};
this.log=function(a1,a2){
var _29c;
if((arguments.length==1)&&(typeof a1=="object")){
_29c=a1;
}else{
_29c={srcObj:a1,srcFunc:a2};
}
_29c.adviceFunc=function(){
var _29d=[];
for(var x=0;x<arguments.length;x++){
_29d.push(arguments[x]);
}
dojo.debug("("+_29c.srcObj+")."+_29c.srcFunc,":",_29d.join(", "));
};
this.kwConnect(_29c);
};
this.connectBefore=function(){
var args=["before"];
for(var i=0;i<arguments.length;i++){
args.push(arguments[i]);
}
return this.connect.apply(this,args);
};
this.connectAround=function(){
var args=["around"];
for(var i=0;i<arguments.length;i++){
args.push(arguments[i]);
}
return this.connect.apply(this,args);
};
this.connectOnce=function(){
var ao=interpolateArgs(arguments,true);
ao.once=true;
return this.connect(ao);
};
this.connectRunOnce=function(){
var ao=interpolateArgs(arguments,true);
ao.maxCalls=1;
return this.connect(ao);
};
this._kwConnectImpl=function(_2a5,_2a6){
var fn=(_2a6)?"disconnect":"connect";
if(typeof _2a5["srcFunc"]=="function"){
_2a5.srcObj=_2a5["srcObj"]||dj_global;
var _2a8=dojo.lang.nameAnonFunc(_2a5.srcFunc,_2a5.srcObj,true);
_2a5.srcFunc=_2a8;
}
if(typeof _2a5["adviceFunc"]=="function"){
_2a5.adviceObj=_2a5["adviceObj"]||dj_global;
var _2a8=dojo.lang.nameAnonFunc(_2a5.adviceFunc,_2a5.adviceObj,true);
_2a5.adviceFunc=_2a8;
}
_2a5.srcObj=_2a5["srcObj"]||dj_global;
_2a5.adviceObj=_2a5["adviceObj"]||_2a5["targetObj"]||dj_global;
_2a5.adviceFunc=_2a5["adviceFunc"]||_2a5["targetFunc"];
return dojo.event[fn](_2a5);
};
this.kwConnect=function(_2a9){
return this._kwConnectImpl(_2a9,false);
};
this.disconnect=function(){
if(arguments.length==1){
var ao=arguments[0];
}else{
var ao=interpolateArgs(arguments,true);
}
if(!ao.adviceFunc){
return;
}
if(dojo.lang.isString(ao.srcFunc)&&(ao.srcFunc.toLowerCase()=="onkey")){
if(dojo.render.html.ie){
ao.srcFunc="onkeydown";
this.disconnect(ao);
}
ao.srcFunc="onkeypress";
}
if(!ao.srcObj[ao.srcFunc]){
return null;
}
var mjp=dojo.event.MethodJoinPoint.getForMethod(ao.srcObj,ao.srcFunc,true);
mjp.removeAdvice(ao.adviceObj,ao.adviceFunc,ao.adviceType,ao.once);
return mjp;
};
this.kwDisconnect=function(_2ac){
return this._kwConnectImpl(_2ac,true);
};
};
dojo.event.MethodInvocation=function(_2ad,obj,args){
this.jp_=_2ad;
this.object=obj;
this.args=[];
for(var x=0;x<args.length;x++){
this.args[x]=args[x];
}
this.around_index=-1;
};
dojo.event.MethodInvocation.prototype.proceed=function(){
this.around_index++;
if(this.around_index>=this.jp_.around.length){
return this.jp_.object[this.jp_.methodname].apply(this.jp_.object,this.args);
}else{
var ti=this.jp_.around[this.around_index];
var mobj=ti[0]||dj_global;
var meth=ti[1];
return mobj[meth].call(mobj,this);
}
};
dojo.event.MethodJoinPoint=function(obj,_2b5){
this.object=obj||dj_global;
this.methodname=_2b5;
this.methodfunc=this.object[_2b5];
this.squelch=false;
};
dojo.event.MethodJoinPoint.getForMethod=function(obj,_2b7){
if(!obj){
obj=dj_global;
}
var ofn=obj[_2b7];
if(!ofn){
ofn=obj[_2b7]=function(){
};
if(!obj[_2b7]){
dojo.raise("Cannot set do-nothing method on that object "+_2b7);
}
}else{
if((typeof ofn!="function")&&(!dojo.lang.isFunction(ofn))&&(!dojo.lang.isAlien(ofn))){
return null;
}
}
var _2b9=_2b7+"$joinpoint";
var _2ba=_2b7+"$joinpoint$method";
var _2bb=obj[_2b9];
if(!_2bb){
var _2bc=false;
if(dojo.event["browser"]){
if((obj["attachEvent"])||(obj["nodeType"])||(obj["addEventListener"])){
_2bc=true;
dojo.event.browser.addClobberNodeAttrs(obj,[_2b9,_2ba,_2b7]);
}
}
var _2bd=ofn.length;
obj[_2ba]=ofn;
_2bb=obj[_2b9]=new dojo.event.MethodJoinPoint(obj,_2ba);
if(!_2bc){
obj[_2b7]=function(){
return _2bb.run.apply(_2bb,arguments);
};
}else{
obj[_2b7]=function(){
var args=[];
if(!arguments.length){
var evt=null;
try{
if(obj.ownerDocument){
evt=obj.ownerDocument.parentWindow.event;
}else{
if(obj.documentElement){
evt=obj.documentElement.ownerDocument.parentWindow.event;
}else{
if(obj.event){
evt=obj.event;
}else{
evt=window.event;
}
}
}
}
catch(e){
evt=window.event;
}
if(evt){
args.push(dojo.event.browser.fixEvent(evt,this));
}
}else{
for(var x=0;x<arguments.length;x++){
if((x==0)&&(dojo.event.browser.isEvent(arguments[x]))){
args.push(dojo.event.browser.fixEvent(arguments[x],this));
}else{
args.push(arguments[x]);
}
}
}
return _2bb.run.apply(_2bb,args);
};
}
obj[_2b7].__preJoinArity=_2bd;
}
return _2bb;
};
dojo.lang.extend(dojo.event.MethodJoinPoint,{squelch:false,unintercept:function(){
this.object[this.methodname]=this.methodfunc;
this.before=[];
this.after=[];
this.around=[];
},disconnect:dojo.lang.forward("unintercept"),run:function(){
var obj=this.object||dj_global;
var args=arguments;
var _2c3=[];
for(var x=0;x<args.length;x++){
_2c3[x]=args[x];
}
var _2c5=function(marr){
if(!marr){
dojo.debug("Null argument to unrollAdvice()");
return;
}
var _2c7=marr[0]||dj_global;
var _2c8=marr[1];
if(!_2c7[_2c8]){
dojo.raise("function \""+_2c8+"\" does not exist on \""+_2c7+"\"");
}
var _2c9=marr[2]||dj_global;
var _2ca=marr[3];
var msg=marr[6];
var _2cc=marr[7];
if(_2cc>-1){
if(_2cc==0){
return;
}
marr[7]--;
}
var _2cd;
var to={args:[],jp_:this,object:obj,proceed:function(){
return _2c7[_2c8].apply(_2c7,to.args);
}};
to.args=_2c3;
var _2cf=parseInt(marr[4]);
var _2d0=((!isNaN(_2cf))&&(marr[4]!==null)&&(typeof marr[4]!="undefined"));
if(marr[5]){
var rate=parseInt(marr[5]);
var cur=new Date();
var _2d3=false;
if((marr["last"])&&((cur-marr.last)<=rate)){
if(dojo.event._canTimeout){
if(marr["delayTimer"]){
clearTimeout(marr.delayTimer);
}
var tod=parseInt(rate*2);
var mcpy=dojo.lang.shallowCopy(marr);
marr.delayTimer=setTimeout(function(){
mcpy[5]=0;
_2c5(mcpy);
},tod);
}
return;
}else{
marr.last=cur;
}
}
if(_2ca){
_2c9[_2ca].call(_2c9,to);
}else{
if((_2d0)&&((dojo.render.html)||(dojo.render.svg))){
dj_global["setTimeout"](function(){
if(msg){
_2c7[_2c8].call(_2c7,to);
}else{
_2c7[_2c8].apply(_2c7,args);
}
},_2cf);
}else{
if(msg){
_2c7[_2c8].call(_2c7,to);
}else{
_2c7[_2c8].apply(_2c7,args);
}
}
}
};
var _2d6=function(){
if(this.squelch){
try{
return _2c5.apply(this,arguments);
}
catch(e){
dojo.debug(e);
}
}else{
return _2c5.apply(this,arguments);
}
};
if((this["before"])&&(this.before.length>0)){
dojo.lang.forEach(this.before.concat(new Array()),_2d6);
}
var _2d7;
try{
if((this["around"])&&(this.around.length>0)){
var mi=new dojo.event.MethodInvocation(this,obj,args);
_2d7=mi.proceed();
}else{
if(this.methodfunc){
_2d7=this.object[this.methodname].apply(this.object,args);
}
}
}
catch(e){
if(!this.squelch){
dojo.debug(e,"when calling",this.methodname,"on",this.object,"with arguments",args);
dojo.raise(e);
}
}
if((this["after"])&&(this.after.length>0)){
dojo.lang.forEach(this.after.concat(new Array()),_2d6);
}
return (this.methodfunc)?_2d7:null;
},getArr:function(kind){
var type="after";
if((typeof kind=="string")&&(kind.indexOf("before")!=-1)){
type="before";
}else{
if(kind=="around"){
type="around";
}
}
if(!this[type]){
this[type]=[];
}
return this[type];
},kwAddAdvice:function(args){
this.addAdvice(args["adviceObj"],args["adviceFunc"],args["aroundObj"],args["aroundFunc"],args["adviceType"],args["precedence"],args["once"],args["delay"],args["rate"],args["adviceMsg"],args["maxCalls"]);
},addAdvice:function(_2dc,_2dd,_2de,_2df,_2e0,_2e1,once,_2e3,rate,_2e5,_2e6){
var arr=this.getArr(_2e0);
if(!arr){
dojo.raise("bad this: "+this);
}
var ao=[_2dc,_2dd,_2de,_2df,_2e3,rate,_2e5,_2e6];
if(once){
if(this.hasAdvice(_2dc,_2dd,_2e0,arr)>=0){
return;
}
}
if(_2e1=="first"){
arr.unshift(ao);
}else{
arr.push(ao);
}
},hasAdvice:function(_2e9,_2ea,_2eb,arr){
if(!arr){
arr=this.getArr(_2eb);
}
var ind=-1;
for(var x=0;x<arr.length;x++){
var aao=(typeof _2ea=="object")?(new String(_2ea)).toString():_2ea;
var a1o=(typeof arr[x][1]=="object")?(new String(arr[x][1])).toString():arr[x][1];
if((arr[x][0]==_2e9)&&(a1o==aao)){
ind=x;
}
}
return ind;
},removeAdvice:function(_2f1,_2f2,_2f3,once){
var arr=this.getArr(_2f3);
var ind=this.hasAdvice(_2f1,_2f2,_2f3,arr);
if(ind==-1){
return false;
}
while(ind!=-1){
arr.splice(ind,1);
if(once){
break;
}
ind=this.hasAdvice(_2f1,_2f2,_2f3,arr);
}
return true;
}});
dojo.provide("dojo.event.topic");
dojo.event.topic=new function(){
this.topics={};
this.getTopic=function(_2f7){
if(!this.topics[_2f7]){
this.topics[_2f7]=new this.TopicImpl(_2f7);
}
return this.topics[_2f7];
};
this.registerPublisher=function(_2f8,obj,_2fa){
var _2f8=this.getTopic(_2f8);
_2f8.registerPublisher(obj,_2fa);
};
this.subscribe=function(_2fb,obj,_2fd){
var _2fb=this.getTopic(_2fb);
_2fb.subscribe(obj,_2fd);
};
this.unsubscribe=function(_2fe,obj,_300){
var _2fe=this.getTopic(_2fe);
_2fe.unsubscribe(obj,_300);
};
this.destroy=function(_301){
this.getTopic(_301).destroy();
delete this.topics[_301];
};
this.publishApply=function(_302,args){
var _302=this.getTopic(_302);
_302.sendMessage.apply(_302,args);
};
this.publish=function(_304,_305){
var _304=this.getTopic(_304);
var args=[];
for(var x=1;x<arguments.length;x++){
args.push(arguments[x]);
}
_304.sendMessage.apply(_304,args);
};
};
dojo.event.topic.TopicImpl=function(_308){
this.topicName=_308;
this.subscribe=function(_309,_30a){
var tf=_30a||_309;
var to=(!_30a)?dj_global:_309;
return dojo.event.kwConnect({srcObj:this,srcFunc:"sendMessage",adviceObj:to,adviceFunc:tf});
};
this.unsubscribe=function(_30d,_30e){
var tf=(!_30e)?_30d:_30e;
var to=(!_30e)?null:_30d;
return dojo.event.kwDisconnect({srcObj:this,srcFunc:"sendMessage",adviceObj:to,adviceFunc:tf});
};
this._getJoinPoint=function(){
return dojo.event.MethodJoinPoint.getForMethod(this,"sendMessage");
};
this.setSquelch=function(_311){
this._getJoinPoint().squelch=_311;
};
this.destroy=function(){
this._getJoinPoint().disconnect();
};
this.registerPublisher=function(_312,_313){
dojo.event.connect(_312,_313,this,"sendMessage");
};
this.sendMessage=function(_314){
};
};
dojo.provide("dojo.event.browser");
dojo._ie_clobber=new function(){
this.clobberNodes=[];
function nukeProp(node,prop){
try{
node[prop]=null;
}
catch(e){
}
try{
delete node[prop];
}
catch(e){
}
try{
node.removeAttribute(prop);
}
catch(e){
}
}
this.clobber=function(_317){
var na;
var tna;
if(_317){
tna=_317.all||_317.getElementsByTagName("*");
na=[_317];
for(var x=0;x<tna.length;x++){
if(tna[x]["__doClobber__"]){
na.push(tna[x]);
}
}
}else{
try{
window.onload=null;
}
catch(e){
}
na=(this.clobberNodes.length)?this.clobberNodes:document.all;
}
tna=null;
var _31b={};
for(var i=na.length-1;i>=0;i=i-1){
var el=na[i];
try{
if(el&&el["__clobberAttrs__"]){
for(var j=0;j<el.__clobberAttrs__.length;j++){
nukeProp(el,el.__clobberAttrs__[j]);
}
nukeProp(el,"__clobberAttrs__");
nukeProp(el,"__doClobber__");
}
}
catch(e){
}
}
na=null;
};
};
if(dojo.render.html.ie){
dojo.addOnUnload(function(){
dojo._ie_clobber.clobber();
try{
if((dojo["widget"])&&(dojo.widget["manager"])){
dojo.widget.manager.destroyAll();
}
}
catch(e){
}
if(dojo.widget){
for(var name in dojo.widget._templateCache){
if(dojo.widget._templateCache[name].node){
dojo.dom.destroyNode(dojo.widget._templateCache[name].node);
dojo.widget._templateCache[name].node=null;
delete dojo.widget._templateCache[name].node;
}
}
}
try{
window.onload=null;
}
catch(e){
}
try{
window.onunload=null;
}
catch(e){
}
dojo._ie_clobber.clobberNodes=[];
});
}
dojo.event.browser=new function(){
var _320=0;
this.normalizedEventName=function(_321){
switch(_321){
case "CheckboxStateChange":
case "DOMAttrModified":
case "DOMMenuItemActive":
case "DOMMenuItemInactive":
case "DOMMouseScroll":
case "DOMNodeInserted":
case "DOMNodeRemoved":
case "RadioStateChange":
return _321;
break;
default:
var lcn=_321.toLowerCase();
return (lcn.indexOf("on")==0)?lcn.substr(2):lcn;
break;
}
};
this.clean=function(node){
if(dojo.render.html.ie){
dojo._ie_clobber.clobber(node);
}
};
this.addClobberNode=function(node){
if(!dojo.render.html.ie){
return;
}
if(!node["__doClobber__"]){
node.__doClobber__=true;
dojo._ie_clobber.clobberNodes.push(node);
node.__clobberAttrs__=[];
}
};
this.addClobberNodeAttrs=function(node,_326){
if(!dojo.render.html.ie){
return;
}
this.addClobberNode(node);
for(var x=0;x<_326.length;x++){
node.__clobberAttrs__.push(_326[x]);
}
};
this.removeListener=function(node,_329,fp,_32b){
if(!_32b){
var _32b=false;
}
_329=dojo.event.browser.normalizedEventName(_329);
if(_329=="key"){
if(dojo.render.html.ie){
this.removeListener(node,"onkeydown",fp,_32b);
}
_329="keypress";
}
if(node.removeEventListener){
node.removeEventListener(_329,fp,_32b);
}
};
this.addListener=function(node,_32d,fp,_32f,_330){
if(!node){
return;
}
if(!_32f){
var _32f=false;
}
_32d=dojo.event.browser.normalizedEventName(_32d);
if(_32d=="key"){
if(dojo.render.html.ie){
this.addListener(node,"onkeydown",fp,_32f,_330);
}
_32d="keypress";
}
if(!_330){
var _331=function(evt){
if(!evt){
evt=window.event;
}
var ret=fp(dojo.event.browser.fixEvent(evt,this));
if(_32f){
dojo.event.browser.stopEvent(evt);
}
return ret;
};
}else{
_331=fp;
}
if(node.addEventListener){
node.addEventListener(_32d,_331,_32f);
return _331;
}else{
_32d="on"+_32d;
if(typeof node[_32d]=="function"){
var _334=node[_32d];
node[_32d]=function(e){
_334(e);
return _331(e);
};
}else{
node[_32d]=_331;
}
if(dojo.render.html.ie){
this.addClobberNodeAttrs(node,[_32d]);
}
return _331;
}
};
this.isEvent=function(obj){
return (typeof obj!="undefined")&&(obj)&&(typeof Event!="undefined")&&(obj.eventPhase);
};
this.currentEvent=null;
this.callListener=function(_337,_338){
if(typeof _337!="function"){
dojo.raise("listener not a function: "+_337);
}
dojo.event.browser.currentEvent.currentTarget=_338;
return _337.call(_338,dojo.event.browser.currentEvent);
};
this._stopPropagation=function(){
dojo.event.browser.currentEvent.cancelBubble=true;
};
this._preventDefault=function(){
dojo.event.browser.currentEvent.returnValue=false;
};
this.keys={KEY_BACKSPACE:8,KEY_TAB:9,KEY_CLEAR:12,KEY_ENTER:13,KEY_SHIFT:16,KEY_CTRL:17,KEY_ALT:18,KEY_PAUSE:19,KEY_CAPS_LOCK:20,KEY_ESCAPE:27,KEY_SPACE:32,KEY_PAGE_UP:33,KEY_PAGE_DOWN:34,KEY_END:35,KEY_HOME:36,KEY_LEFT_ARROW:37,KEY_UP_ARROW:38,KEY_RIGHT_ARROW:39,KEY_DOWN_ARROW:40,KEY_INSERT:45,KEY_DELETE:46,KEY_HELP:47,KEY_LEFT_WINDOW:91,KEY_RIGHT_WINDOW:92,KEY_SELECT:93,KEY_NUMPAD_0:96,KEY_NUMPAD_1:97,KEY_NUMPAD_2:98,KEY_NUMPAD_3:99,KEY_NUMPAD_4:100,KEY_NUMPAD_5:101,KEY_NUMPAD_6:102,KEY_NUMPAD_7:103,KEY_NUMPAD_8:104,KEY_NUMPAD_9:105,KEY_NUMPAD_MULTIPLY:106,KEY_NUMPAD_PLUS:107,KEY_NUMPAD_ENTER:108,KEY_NUMPAD_MINUS:109,KEY_NUMPAD_PERIOD:110,KEY_NUMPAD_DIVIDE:111,KEY_F1:112,KEY_F2:113,KEY_F3:114,KEY_F4:115,KEY_F5:116,KEY_F6:117,KEY_F7:118,KEY_F8:119,KEY_F9:120,KEY_F10:121,KEY_F11:122,KEY_F12:123,KEY_F13:124,KEY_F14:125,KEY_F15:126,KEY_NUM_LOCK:144,KEY_SCROLL_LOCK:145};
this.revKeys=[];
for(var key in this.keys){
this.revKeys[this.keys[key]]=key;
}
this.fixEvent=function(evt,_33b){
if(!evt){
if(window["event"]){
evt=window.event;
}
}
if((evt["type"])&&(evt["type"].indexOf("key")==0)){
evt.keys=this.revKeys;
for(var key in this.keys){
evt[key]=this.keys[key];
}
if(evt["type"]=="keydown"&&dojo.render.html.ie){
switch(evt.keyCode){
case evt.KEY_SHIFT:
case evt.KEY_CTRL:
case evt.KEY_ALT:
case evt.KEY_CAPS_LOCK:
case evt.KEY_LEFT_WINDOW:
case evt.KEY_RIGHT_WINDOW:
case evt.KEY_SELECT:
case evt.KEY_NUM_LOCK:
case evt.KEY_SCROLL_LOCK:
case evt.KEY_NUMPAD_0:
case evt.KEY_NUMPAD_1:
case evt.KEY_NUMPAD_2:
case evt.KEY_NUMPAD_3:
case evt.KEY_NUMPAD_4:
case evt.KEY_NUMPAD_5:
case evt.KEY_NUMPAD_6:
case evt.KEY_NUMPAD_7:
case evt.KEY_NUMPAD_8:
case evt.KEY_NUMPAD_9:
case evt.KEY_NUMPAD_PERIOD:
break;
case evt.KEY_NUMPAD_MULTIPLY:
case evt.KEY_NUMPAD_PLUS:
case evt.KEY_NUMPAD_ENTER:
case evt.KEY_NUMPAD_MINUS:
case evt.KEY_NUMPAD_DIVIDE:
break;
case evt.KEY_PAUSE:
case evt.KEY_TAB:
case evt.KEY_BACKSPACE:
case evt.KEY_ENTER:
case evt.KEY_ESCAPE:
case evt.KEY_PAGE_UP:
case evt.KEY_PAGE_DOWN:
case evt.KEY_END:
case evt.KEY_HOME:
case evt.KEY_LEFT_ARROW:
case evt.KEY_UP_ARROW:
case evt.KEY_RIGHT_ARROW:
case evt.KEY_DOWN_ARROW:
case evt.KEY_INSERT:
case evt.KEY_DELETE:
case evt.KEY_F1:
case evt.KEY_F2:
case evt.KEY_F3:
case evt.KEY_F4:
case evt.KEY_F5:
case evt.KEY_F6:
case evt.KEY_F7:
case evt.KEY_F8:
case evt.KEY_F9:
case evt.KEY_F10:
case evt.KEY_F11:
case evt.KEY_F12:
case evt.KEY_F12:
case evt.KEY_F13:
case evt.KEY_F14:
case evt.KEY_F15:
case evt.KEY_CLEAR:
case evt.KEY_HELP:
evt.key=evt.keyCode;
break;
default:
if(evt.ctrlKey||evt.altKey){
var _33d=evt.keyCode;
if(_33d>=65&&_33d<=90&&evt.shiftKey==false){
_33d+=32;
}
if(_33d>=1&&_33d<=26&&evt.ctrlKey){
_33d+=96;
}
evt.key=String.fromCharCode(_33d);
}
}
}else{
if(evt["type"]=="keypress"){
if(dojo.render.html.opera){
if(evt.which==0){
evt.key=evt.keyCode;
}else{
if(evt.which>0){
switch(evt.which){
case evt.KEY_SHIFT:
case evt.KEY_CTRL:
case evt.KEY_ALT:
case evt.KEY_CAPS_LOCK:
case evt.KEY_NUM_LOCK:
case evt.KEY_SCROLL_LOCK:
break;
case evt.KEY_PAUSE:
case evt.KEY_TAB:
case evt.KEY_BACKSPACE:
case evt.KEY_ENTER:
case evt.KEY_ESCAPE:
evt.key=evt.which;
break;
default:
var _33d=evt.which;
if((evt.ctrlKey||evt.altKey||evt.metaKey)&&(evt.which>=65&&evt.which<=90&&evt.shiftKey==false)){
_33d+=32;
}
evt.key=String.fromCharCode(_33d);
}
}
}
}else{
if(dojo.render.html.ie){
if(!evt.ctrlKey&&!evt.altKey&&evt.keyCode>=evt.KEY_SPACE){
evt.key=String.fromCharCode(evt.keyCode);
}
}else{
if(dojo.render.html.safari){
switch(evt.keyCode){
case 25:
evt.key=evt.KEY_TAB;
evt.shift=true;
break;
case 63232:
evt.key=evt.KEY_UP_ARROW;
break;
case 63233:
evt.key=evt.KEY_DOWN_ARROW;
break;
case 63234:
evt.key=evt.KEY_LEFT_ARROW;
break;
case 63235:
evt.key=evt.KEY_RIGHT_ARROW;
break;
case 63236:
evt.key=evt.KEY_F1;
break;
case 63237:
evt.key=evt.KEY_F2;
break;
case 63238:
evt.key=evt.KEY_F3;
break;
case 63239:
evt.key=evt.KEY_F4;
break;
case 63240:
evt.key=evt.KEY_F5;
break;
case 63241:
evt.key=evt.KEY_F6;
break;
case 63242:
evt.key=evt.KEY_F7;
break;
case 63243:
evt.key=evt.KEY_F8;
break;
case 63244:
evt.key=evt.KEY_F9;
break;
case 63245:
evt.key=evt.KEY_F10;
break;
case 63246:
evt.key=evt.KEY_F11;
break;
case 63247:
evt.key=evt.KEY_F12;
break;
case 63250:
evt.key=evt.KEY_PAUSE;
break;
case 63272:
evt.key=evt.KEY_DELETE;
break;
case 63273:
evt.key=evt.KEY_HOME;
break;
case 63275:
evt.key=evt.KEY_END;
break;
case 63276:
evt.key=evt.KEY_PAGE_UP;
break;
case 63277:
evt.key=evt.KEY_PAGE_DOWN;
break;
case 63302:
evt.key=evt.KEY_INSERT;
break;
case 63248:
case 63249:
case 63289:
break;
default:
evt.key=evt.charCode>=evt.KEY_SPACE?String.fromCharCode(evt.charCode):evt.keyCode;
}
}else{
evt.key=evt.charCode>0?String.fromCharCode(evt.charCode):evt.keyCode;
}
}
}
}
}
}
if(dojo.render.html.ie){
if(!evt.target){
evt.target=evt.srcElement;
}
if(!evt.currentTarget){
evt.currentTarget=(_33b?_33b:evt.srcElement);
}
if(!evt.layerX){
evt.layerX=evt.offsetX;
}
if(!evt.layerY){
evt.layerY=evt.offsetY;
}
var doc=(evt.srcElement&&evt.srcElement.ownerDocument)?evt.srcElement.ownerDocument:document;
var _33f=((dojo.render.html.ie55)||(doc["compatMode"]=="BackCompat"))?doc.body:doc.documentElement;
if(!evt.pageX){
evt.pageX=evt.clientX+(_33f.scrollLeft||0);
}
if(!evt.pageY){
evt.pageY=evt.clientY+(_33f.scrollTop||0);
}
if(evt.type=="mouseover"){
evt.relatedTarget=evt.fromElement;
}
if(evt.type=="mouseout"){
evt.relatedTarget=evt.toElement;
}
this.currentEvent=evt;
evt.callListener=this.callListener;
evt.stopPropagation=this._stopPropagation;
evt.preventDefault=this._preventDefault;
}
return evt;
};
this.stopEvent=function(evt){
if(window.event){
evt.cancelBubble=true;
evt.returnValue=false;
}else{
evt.preventDefault();
evt.stopPropagation();
}
};
};
dojo.kwCompoundRequire({common:["dojo.event.common","dojo.event.topic"],browser:["dojo.event.browser"],dashboard:["dojo.event.browser"]});
dojo.provide("dojo.event.*");
dojo.provide("dojo.widget.Manager");
dojo.widget.manager=new function(){
this.widgets=[];
this.widgetIds=[];
this.topWidgets={};
var _341={};
var _342=[];
this.getUniqueId=function(_343){
var _344;
do{
_344=_343+"_"+(_341[_343]!=undefined?++_341[_343]:_341[_343]=0);
}while(this.getWidgetById(_344));
return _344;
};
this.add=function(_345){
this.widgets.push(_345);
if(!_345.extraArgs["id"]){
_345.extraArgs["id"]=_345.extraArgs["ID"];
}
if(_345.widgetId==""){
if(_345["id"]){
_345.widgetId=_345["id"];
}else{
if(_345.extraArgs["id"]){
_345.widgetId=_345.extraArgs["id"];
}else{
_345.widgetId=this.getUniqueId(_345.ns+"_"+_345.widgetType);
}
}
}
if(this.widgetIds[_345.widgetId]){
dojo.debug("widget ID collision on ID: "+_345.widgetId);
}
this.widgetIds[_345.widgetId]=_345;
};
this.destroyAll=function(){
for(var x=this.widgets.length-1;x>=0;x--){
try{
this.widgets[x].destroy(true);
delete this.widgets[x];
}
catch(e){
}
}
};
this.remove=function(_347){
if(dojo.lang.isNumber(_347)){
var tw=this.widgets[_347].widgetId;
delete this.topWidgets[tw];
delete this.widgetIds[tw];
this.widgets.splice(_347,1);
}else{
this.removeById(_347);
}
};
this.removeById=function(id){
if(!dojo.lang.isString(id)){
id=id["widgetId"];
if(!id){
dojo.debug("invalid widget or id passed to removeById");
return;
}
}
for(var i=0;i<this.widgets.length;i++){
if(this.widgets[i].widgetId==id){
this.remove(i);
break;
}
}
};
this.getWidgetById=function(id){
if(dojo.lang.isString(id)){
return this.widgetIds[id];
}
return id;
};
this.getWidgetsByType=function(type){
var lt=type.toLowerCase();
var _34e=(type.indexOf(":")<0?function(x){
return x.widgetType.toLowerCase();
}:function(x){
return x.getNamespacedType();
});
var ret=[];
dojo.lang.forEach(this.widgets,function(x){
if(_34e(x)==lt){
ret.push(x);
}
});
return ret;
};
this.getWidgetsByFilter=function(_353,_354){
var ret=[];
dojo.lang.every(this.widgets,function(x){
if(_353(x)){
ret.push(x);
if(_354){
return false;
}
}
return true;
});
return (_354?ret[0]:ret);
};
this.getAllWidgets=function(){
return this.widgets.concat();
};
this.getWidgetByNode=function(node){
var w=this.getAllWidgets();
node=dojo.byId(node);
for(var i=0;i<w.length;i++){
if(w[i].domNode==node){
return w[i];
}
}
return null;
};
this.byId=this.getWidgetById;
this.byType=this.getWidgetsByType;
this.byFilter=this.getWidgetsByFilter;
this.byNode=this.getWidgetByNode;
var _35a={};
var _35b=["dojo.widget"];
for(var i=0;i<_35b.length;i++){
_35b[_35b[i]]=true;
}
this.registerWidgetPackage=function(_35d){
if(!_35b[_35d]){
_35b[_35d]=true;
_35b.push(_35d);
}
};
this.getWidgetPackageList=function(){
return dojo.lang.map(_35b,function(elt){
return (elt!==true?elt:undefined);
});
};
this.getImplementation=function(_35f,_360,_361,ns){
var impl=this.getImplementationName(_35f,ns);
if(impl){
var ret=_360?new impl(_360):new impl();
return ret;
}
};
function buildPrefixCache(){
for(var _365 in dojo.render){
if(dojo.render[_365]["capable"]===true){
var _366=dojo.render[_365].prefixes;
for(var i=0;i<_366.length;i++){
_342.push(_366[i].toLowerCase());
}
}
}
}
var _368=function(_369,_36a){
if(!_36a){
return null;
}
for(var i=0,l=_342.length,_36d;i<=l;i++){
_36d=(i<l?_36a[_342[i]]:_36a);
if(!_36d){
continue;
}
for(var name in _36d){
if(name.toLowerCase()==_369){
return _36d[name];
}
}
}
return null;
};
var _36f=function(_370,_371){
var _372=dojo.evalObjPath(_371,false);
return (_372?_368(_370,_372):null);
};
this.getImplementationName=function(_373,ns){
var _375=_373.toLowerCase();
ns=ns||"dojo";
var imps=_35a[ns]||(_35a[ns]={});
var impl=imps[_375];
if(impl){
return impl;
}
if(!_342.length){
buildPrefixCache();
}
var _378=dojo.ns.get(ns);
if(!_378){
dojo.ns.register(ns,ns+".widget");
_378=dojo.ns.get(ns);
}
if(_378){
_378.resolve(_373);
}
impl=_36f(_375,_378.module);
if(impl){
return (imps[_375]=impl);
}
_378=dojo.ns.require(ns);
if((_378)&&(_378.resolver)){
_378.resolve(_373);
impl=_36f(_375,_378.module);
if(impl){
return (imps[_375]=impl);
}
}
dojo.deprecated("dojo.widget.Manager.getImplementationName","Could not locate widget implementation for \""+_373+"\" in \""+_378.module+"\" registered to namespace \""+_378.name+"\". "+"Developers must specify correct namespaces for all non-Dojo widgets","0.5");
for(var i=0;i<_35b.length;i++){
impl=_36f(_375,_35b[i]);
if(impl){
return (imps[_375]=impl);
}
}
throw new Error("Could not locate widget implementation for \""+_373+"\" in \""+_378.module+"\" registered to namespace \""+_378.name+"\"");
};
this.resizing=false;
this.onWindowResized=function(){
if(this.resizing){
return;
}
try{
this.resizing=true;
for(var id in this.topWidgets){
var _37b=this.topWidgets[id];
if(_37b.checkSize){
_37b.checkSize();
}
}
}
catch(e){
}
finally{
this.resizing=false;
}
};
if(typeof window!="undefined"){
dojo.addOnLoad(this,"onWindowResized");
dojo.event.connect(window,"onresize",this,"onWindowResized");
}
};
(function(){
var dw=dojo.widget;
var dwm=dw.manager;
var h=dojo.lang.curry(dojo.lang,"hitch",dwm);
var g=function(_380,_381){
dw[(_381||_380)]=h(_380);
};
g("add","addWidget");
g("destroyAll","destroyAllWidgets");
g("remove","removeWidget");
g("removeById","removeWidgetById");
g("getWidgetById");
g("getWidgetById","byId");
g("getWidgetsByType");
g("getWidgetsByFilter");
g("getWidgetsByType","byType");
g("getWidgetsByFilter","byFilter");
g("getWidgetByNode","byNode");
dw.all=function(n){
var _383=dwm.getAllWidgets.apply(dwm,arguments);
if(arguments.length>0){
return _383[n];
}
return _383;
};
g("registerWidgetPackage");
g("getImplementation","getWidgetImplementation");
g("getImplementationName","getWidgetImplementationName");
dw.widgets=dwm.widgets;
dw.widgetIds=dwm.widgetIds;
dw.root=dwm.root;
})();
dojo.provide("dojo.uri.Uri");
dojo.uri=new function(){
this.dojoUri=function(uri){
return new dojo.uri.Uri(dojo.hostenv.getBaseScriptUri(),uri);
};
this.moduleUri=function(_385,uri){
var loc=dojo.hostenv.getModuleSymbols(_385).join("/");
if(!loc){
return null;
}
if(loc.lastIndexOf("/")!=loc.length-1){
loc+="/";
}
var _388=loc.indexOf(":");
var _389=loc.indexOf("/");
if(loc.charAt(0)!="/"&&(_388==-1||_388>_389)){
loc=dojo.hostenv.getBaseScriptUri()+loc;
}
return new dojo.uri.Uri(loc,uri);
};
this.Uri=function(){
var uri=arguments[0];
for(var i=1;i<arguments.length;i++){
if(!arguments[i]){
continue;
}
var _38c=new dojo.uri.Uri(arguments[i].toString());
var _38d=new dojo.uri.Uri(uri.toString());
if((_38c.path=="")&&(_38c.scheme==null)&&(_38c.authority==null)&&(_38c.query==null)){
if(_38c.fragment!=null){
_38d.fragment=_38c.fragment;
}
_38c=_38d;
}else{
if(_38c.scheme==null){
_38c.scheme=_38d.scheme;
if(_38c.authority==null){
_38c.authority=_38d.authority;
if(_38c.path.charAt(0)!="/"){
var path=_38d.path.substring(0,_38d.path.lastIndexOf("/")+1)+_38c.path;
var segs=path.split("/");
for(var j=0;j<segs.length;j++){
if(segs[j]=="."){
if(j==segs.length-1){
segs[j]="";
}else{
segs.splice(j,1);
j--;
}
}else{
if(j>0&&!(j==1&&segs[0]=="")&&segs[j]==".."&&segs[j-1]!=".."){
if(j==segs.length-1){
segs.splice(j,1);
segs[j-1]="";
}else{
segs.splice(j-1,2);
j-=2;
}
}
}
}
_38c.path=segs.join("/");
}
}
}
}
uri="";
if(_38c.scheme!=null){
uri+=_38c.scheme+":";
}
if(_38c.authority!=null){
uri+="//"+_38c.authority;
}
uri+=_38c.path;
if(_38c.query!=null){
uri+="?"+_38c.query;
}
if(_38c.fragment!=null){
uri+="#"+_38c.fragment;
}
}
this.uri=uri.toString();
var _391="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$";
var r=this.uri.match(new RegExp(_391));
this.scheme=r[2]||(r[1]?"":null);
this.authority=r[4]||(r[3]?"":null);
this.path=r[5];
this.query=r[7]||(r[6]?"":null);
this.fragment=r[9]||(r[8]?"":null);
if(this.authority!=null){
_391="^((([^:]+:)?([^@]+))@)?([^:]*)(:([0-9]+))?$";
r=this.authority.match(new RegExp(_391));
this.user=r[3]||null;
this.password=r[4]||null;
this.host=r[5];
this.port=r[7]||null;
}
this.toString=function(){
return this.uri;
};
};
};
dojo.kwCompoundRequire({common:[["dojo.uri.Uri",false,false]]});
dojo.provide("dojo.uri.*");
dojo.provide("dojo.html.common");
dojo.lang.mixin(dojo.html,dojo.dom);
dojo.html.body=function(){
dojo.deprecated("dojo.html.body() moved to dojo.body()","0.5");
return dojo.body();
};
dojo.html.getEventTarget=function(evt){
if(!evt){
evt=dojo.global().event||{};
}
var t=(evt.srcElement?evt.srcElement:(evt.target?evt.target:null));
while((t)&&(t.nodeType!=1)){
t=t.parentNode;
}
return t;
};
dojo.html.getViewport=function(){
var _395=dojo.global();
var _396=dojo.doc();
var w=0;
var h=0;
if(dojo.render.html.mozilla){
w=_396.documentElement.clientWidth;
h=_395.innerHeight;
}else{
if(!dojo.render.html.opera&&_395.innerWidth){
w=_395.innerWidth;
h=_395.innerHeight;
}else{
if(!dojo.render.html.opera&&dojo.exists(_396,"documentElement.clientWidth")){
var w2=_396.documentElement.clientWidth;
if(!w||w2&&w2<w){
w=w2;
}
h=_396.documentElement.clientHeight;
}else{
if(dojo.body().clientWidth){
w=dojo.body().clientWidth;
h=dojo.body().clientHeight;
}
}
}
}
return {width:w,height:h};
};
dojo.html.getScroll=function(){
var _39a=dojo.global();
var _39b=dojo.doc();
var top=_39a.pageYOffset||_39b.documentElement.scrollTop||dojo.body().scrollTop||0;
var left=_39a.pageXOffset||_39b.documentElement.scrollLeft||dojo.body().scrollLeft||0;
return {top:top,left:left,offset:{x:left,y:top}};
};
dojo.html.getParentByType=function(node,type){
var _3a0=dojo.doc();
var _3a1=dojo.byId(node);
type=type.toLowerCase();
while((_3a1)&&(_3a1.nodeName.toLowerCase()!=type)){
if(_3a1==(_3a0["body"]||_3a0["documentElement"])){
return null;
}
_3a1=_3a1.parentNode;
}
return _3a1;
};
dojo.html.getAttribute=function(node,attr){
node=dojo.byId(node);
if((!node)||(!node.getAttribute)){
return null;
}
var ta=typeof attr=="string"?attr:new String(attr);
var v=node.getAttribute(ta.toUpperCase());
if((v)&&(typeof v=="string")&&(v!="")){
return v;
}
if(v&&v.value){
return v.value;
}
if((node.getAttributeNode)&&(node.getAttributeNode(ta))){
return (node.getAttributeNode(ta)).value;
}else{
if(node.getAttribute(ta)){
return node.getAttribute(ta);
}else{
if(node.getAttribute(ta.toLowerCase())){
return node.getAttribute(ta.toLowerCase());
}
}
}
return null;
};
dojo.html.hasAttribute=function(node,attr){
return dojo.html.getAttribute(dojo.byId(node),attr)?true:false;
};
dojo.html.getCursorPosition=function(e){
e=e||dojo.global().event;
var _3a9={x:0,y:0};
if(e.pageX||e.pageY){
_3a9.x=e.pageX;
_3a9.y=e.pageY;
}else{
var de=dojo.doc().documentElement;
var db=dojo.body();
_3a9.x=e.clientX+((de||db)["scrollLeft"])-((de||db)["clientLeft"]);
_3a9.y=e.clientY+((de||db)["scrollTop"])-((de||db)["clientTop"]);
}
return _3a9;
};
dojo.html.isTag=function(node){
node=dojo.byId(node);
if(node&&node.tagName){
for(var i=1;i<arguments.length;i++){
if(node.tagName.toLowerCase()==String(arguments[i]).toLowerCase()){
return String(arguments[i]).toLowerCase();
}
}
}
return "";
};
if(dojo.render.html.ie&&!dojo.render.html.ie70){
if(window.location.href.substr(0,6).toLowerCase()!="https:"){
(function(){
var _3ae=dojo.doc().createElement("script");
_3ae.src="javascript:'dojo.html.createExternalElement=function(doc, tag){ return doc.createElement(tag); }'";
dojo.doc().getElementsByTagName("head")[0].appendChild(_3ae);
})();
}
}else{
dojo.html.createExternalElement=function(doc,tag){
return doc.createElement(tag);
};
}
dojo.html._callDeprecated=function(_3b1,_3b2,args,_3b4,_3b5){
dojo.deprecated("dojo.html."+_3b1,"replaced by dojo.html."+_3b2+"("+(_3b4?"node, {"+_3b4+": "+_3b4+"}":"")+")"+(_3b5?"."+_3b5:""),"0.5");
var _3b6=[];
if(_3b4){
var _3b7={};
_3b7[_3b4]=args[1];
_3b6.push(args[0]);
_3b6.push(_3b7);
}else{
_3b6=args;
}
var ret=dojo.html[_3b2].apply(dojo.html,args);
if(_3b5){
return ret[_3b5];
}else{
return ret;
}
};
dojo.html.getViewportWidth=function(){
return dojo.html._callDeprecated("getViewportWidth","getViewport",arguments,null,"width");
};
dojo.html.getViewportHeight=function(){
return dojo.html._callDeprecated("getViewportHeight","getViewport",arguments,null,"height");
};
dojo.html.getViewportSize=function(){
return dojo.html._callDeprecated("getViewportSize","getViewport",arguments);
};
dojo.html.getScrollTop=function(){
return dojo.html._callDeprecated("getScrollTop","getScroll",arguments,null,"top");
};
dojo.html.getScrollLeft=function(){
return dojo.html._callDeprecated("getScrollLeft","getScroll",arguments,null,"left");
};
dojo.html.getScrollOffset=function(){
return dojo.html._callDeprecated("getScrollOffset","getScroll",arguments,null,"offset");
};
dojo.provide("dojo.a11y");
dojo.a11y={imgPath:dojo.uri.moduleUri("dojo.widget","templates/images"),doAccessibleCheck:true,accessible:null,checkAccessible:function(){
if(this.accessible===null){
this.accessible=false;
if(this.doAccessibleCheck==true){
this.accessible=this.testAccessible();
}
}
return this.accessible;
},testAccessible:function(){
this.accessible=false;
if(dojo.render.html.ie||dojo.render.html.mozilla){
var div=document.createElement("div");
div.style.backgroundImage="url(\""+this.imgPath+"/tab_close.gif\")";
dojo.body().appendChild(div);
var _3ba=null;
if(window.getComputedStyle){
var _3bb=getComputedStyle(div,"");
_3ba=_3bb.getPropertyValue("background-image");
}else{
_3ba=div.currentStyle.backgroundImage;
}
var _3bc=false;
if(_3ba!=null&&(_3ba=="none"||_3ba=="url(invalid-url:)")){
this.accessible=true;
}
dojo.body().removeChild(div);
}
return this.accessible;
},setCheckAccessible:function(_3bd){
this.doAccessibleCheck=_3bd;
},setAccessibleMode:function(){
if(this.accessible===null){
if(this.checkAccessible()){
dojo.render.html.prefixes.unshift("a11y");
}
}
return this.accessible;
}};
dojo.provide("dojo.widget.Widget");
dojo.declare("dojo.widget.Widget",null,function(){
this.children=[];
this.extraArgs={};
},{parent:null,isTopLevel:false,disabled:false,isContainer:false,widgetId:"",widgetType:"Widget",ns:"dojo",getNamespacedType:function(){
return (this.ns?this.ns+":"+this.widgetType:this.widgetType).toLowerCase();
},toString:function(){
return "[Widget "+this.getNamespacedType()+", "+(this.widgetId||"NO ID")+"]";
},repr:function(){
return this.toString();
},enable:function(){
this.disabled=false;
},disable:function(){
this.disabled=true;
},onResized:function(){
this.notifyChildrenOfResize();
},notifyChildrenOfResize:function(){
for(var i=0;i<this.children.length;i++){
var _3bf=this.children[i];
if(_3bf.onResized){
_3bf.onResized();
}
}
},create:function(args,_3c1,_3c2,ns){
if(ns){
this.ns=ns;
}
this.satisfyPropertySets(args,_3c1,_3c2);
this.mixInProperties(args,_3c1,_3c2);
this.postMixInProperties(args,_3c1,_3c2);
dojo.widget.manager.add(this);
this.buildRendering(args,_3c1,_3c2);
this.initialize(args,_3c1,_3c2);
this.postInitialize(args,_3c1,_3c2);
this.postCreate(args,_3c1,_3c2);
return this;
},destroy:function(_3c4){
if(this.parent){
this.parent.removeChild(this);
}
this.destroyChildren();
this.uninitialize();
this.destroyRendering(_3c4);
dojo.widget.manager.removeById(this.widgetId);
},destroyChildren:function(){
var _3c5;
var i=0;
while(this.children.length>i){
_3c5=this.children[i];
if(_3c5 instanceof dojo.widget.Widget){
this.removeChild(_3c5);
_3c5.destroy();
continue;
}
i++;
}
},getChildrenOfType:function(type,_3c8){
var ret=[];
var _3ca=dojo.lang.isFunction(type);
if(!_3ca){
type=type.toLowerCase();
}
for(var x=0;x<this.children.length;x++){
if(_3ca){
if(this.children[x] instanceof type){
ret.push(this.children[x]);
}
}else{
if(this.children[x].widgetType.toLowerCase()==type){
ret.push(this.children[x]);
}
}
if(_3c8){
ret=ret.concat(this.children[x].getChildrenOfType(type,_3c8));
}
}
return ret;
},getDescendants:function(){
var _3cc=[];
var _3cd=[this];
var elem;
while((elem=_3cd.pop())){
_3cc.push(elem);
if(elem.children){
dojo.lang.forEach(elem.children,function(elem){
_3cd.push(elem);
});
}
}
return _3cc;
},isFirstChild:function(){
return this===this.parent.children[0];
},isLastChild:function(){
return this===this.parent.children[this.parent.children.length-1];
},satisfyPropertySets:function(args){
return args;
},mixInProperties:function(args,frag){
if((args["fastMixIn"])||(frag["fastMixIn"])){
for(var x in args){
this[x]=args[x];
}
return;
}
var _3d4;
var _3d5=dojo.widget.lcArgsCache[this.widgetType];
if(_3d5==null){
_3d5={};
for(var y in this){
_3d5[((new String(y)).toLowerCase())]=y;
}
dojo.widget.lcArgsCache[this.widgetType]=_3d5;
}
var _3d7={};
for(var x in args){
if(!this[x]){
var y=_3d5[(new String(x)).toLowerCase()];
if(y){
args[y]=args[x];
x=y;
}
}
if(_3d7[x]){
continue;
}
_3d7[x]=true;
if((typeof this[x])!=(typeof _3d4)){
if(typeof args[x]!="string"){
this[x]=args[x];
}else{
if(dojo.lang.isString(this[x])){
this[x]=args[x];
}else{
if(dojo.lang.isNumber(this[x])){
this[x]=new Number(args[x]);
}else{
if(dojo.lang.isBoolean(this[x])){
this[x]=(args[x].toLowerCase()=="false")?false:true;
}else{
if(dojo.lang.isFunction(this[x])){
if(args[x].search(/[^\w\.]+/i)==-1){
this[x]=dojo.evalObjPath(args[x],false);
}else{
var tn=dojo.lang.nameAnonFunc(new Function(args[x]),this);
dojo.event.kwConnect({srcObj:this,srcFunc:x,adviceObj:this,adviceFunc:tn});
}
}else{
if(dojo.lang.isArray(this[x])){
this[x]=args[x].split(";");
}else{
if(this[x] instanceof Date){
this[x]=new Date(Number(args[x]));
}else{
if(typeof this[x]=="object"){
if(this[x] instanceof dojo.uri.Uri){
this[x]=dojo.uri.dojoUri(args[x]);
}else{
var _3d9=args[x].split(";");
for(var y=0;y<_3d9.length;y++){
var si=_3d9[y].indexOf(":");
if((si!=-1)&&(_3d9[y].length>si)){
this[x][_3d9[y].substr(0,si).replace(/^\s+|\s+$/g,"")]=_3d9[y].substr(si+1);
}
}
}
}else{
this[x]=args[x];
}
}
}
}
}
}
}
}
}else{
this.extraArgs[x.toLowerCase()]=args[x];
}
}
},postMixInProperties:function(args,frag,_3dd){
},initialize:function(args,frag,_3e0){
return false;
},postInitialize:function(args,frag,_3e3){
return false;
},postCreate:function(args,frag,_3e6){
return false;
},uninitialize:function(){
return false;
},buildRendering:function(args,frag,_3e9){
dojo.unimplemented("dojo.widget.Widget.buildRendering, on "+this.toString()+", ");
return false;
},destroyRendering:function(){
dojo.unimplemented("dojo.widget.Widget.destroyRendering");
return false;
},addedTo:function(_3ea){
},addChild:function(_3eb){
dojo.unimplemented("dojo.widget.Widget.addChild");
return false;
},removeChild:function(_3ec){
for(var x=0;x<this.children.length;x++){
if(this.children[x]===_3ec){
this.children.splice(x,1);
_3ec.parent=null;
break;
}
}
return _3ec;
},getPreviousSibling:function(){
var idx=this.getParentIndex();
if(idx<=0){
return null;
}
return this.parent.children[idx-1];
},getSiblings:function(){
return this.parent.children;
},getParentIndex:function(){
return dojo.lang.indexOf(this.parent.children,this,true);
},getNextSibling:function(){
var idx=this.getParentIndex();
if(idx==this.parent.children.length-1){
return null;
}
if(idx<0){
return null;
}
return this.parent.children[idx+1];
}});
dojo.widget.lcArgsCache={};
dojo.widget.tags={};
dojo.widget.tags.addParseTreeHandler=function(type){
dojo.deprecated("addParseTreeHandler",". ParseTreeHandlers are now reserved for components. Any unfiltered DojoML tag without a ParseTreeHandler is assumed to be a widget","0.5");
};
dojo.widget.tags["dojo:propertyset"]=function(_3f1,_3f2,_3f3){
var _3f4=_3f2.parseProperties(_3f1["dojo:propertyset"]);
};
dojo.widget.tags["dojo:connect"]=function(_3f5,_3f6,_3f7){
var _3f8=_3f6.parseProperties(_3f5["dojo:connect"]);
};
dojo.widget.buildWidgetFromParseTree=function(type,frag,_3fb,_3fc,_3fd,_3fe){
dojo.a11y.setAccessibleMode();
var _3ff=type.split(":");
_3ff=(_3ff.length==2)?_3ff[1]:type;
var _400=_3fe||_3fb.parseProperties(frag[frag["ns"]+":"+_3ff]);
var _401=dojo.widget.manager.getImplementation(_3ff,null,null,frag["ns"]);
if(!_401){
throw new Error("cannot find \""+type+"\" widget");
}else{
if(!_401.create){
throw new Error("\""+type+"\" widget object has no \"create\" method and does not appear to implement *Widget");
}
}
_400["dojoinsertionindex"]=_3fd;
var ret=_401.create(_400,frag,_3fc,frag["ns"]);
return ret;
};
dojo.widget.defineWidget=function(_403,_404,_405,init,_407){
if(dojo.lang.isString(arguments[3])){
dojo.widget._defineWidget(arguments[0],arguments[3],arguments[1],arguments[4],arguments[2]);
}else{
var args=[arguments[0]],p=3;
if(dojo.lang.isString(arguments[1])){
args.push(arguments[1],arguments[2]);
}else{
args.push("",arguments[1]);
p=2;
}
if(dojo.lang.isFunction(arguments[p])){
args.push(arguments[p],arguments[p+1]);
}else{
args.push(null,arguments[p]);
}
dojo.widget._defineWidget.apply(this,args);
}
};
dojo.widget.defineWidget.renderers="html|svg|vml";
dojo.widget._defineWidget=function(_40a,_40b,_40c,init,_40e){
var _40f=_40a.split(".");
var type=_40f.pop();
var regx="\\.("+(_40b?_40b+"|":"")+dojo.widget.defineWidget.renderers+")\\.";
var r=_40a.search(new RegExp(regx));
_40f=(r<0?_40f.join("."):_40a.substr(0,r));
dojo.widget.manager.registerWidgetPackage(_40f);
var pos=_40f.indexOf(".");
var _414=(pos>-1)?_40f.substring(0,pos):_40f;
_40e=(_40e)||{};
_40e.widgetType=type;
if((!init)&&(_40e["classConstructor"])){
init=_40e.classConstructor;
delete _40e.classConstructor;
}
dojo.declare(_40a,_40c,init,_40e);
};
dojo.provide("dojo.widget.Parse");
dojo.widget.Parse=function(_415){
this.propertySetsList=[];
this.fragment=_415;
this.createComponents=function(frag,_417){
var _418=[];
var _419=false;
try{
if(frag&&frag.tagName&&(frag!=frag.nodeRef)){
var _41a=dojo.widget.tags;
var tna=String(frag.tagName).split(";");
for(var x=0;x<tna.length;x++){
var ltn=tna[x].replace(/^\s+|\s+$/g,"").toLowerCase();
frag.tagName=ltn;
var ret;
if(_41a[ltn]){
_419=true;
ret=_41a[ltn](frag,this,_417,frag.index);
_418.push(ret);
}else{
if(ltn.indexOf(":")==-1){
ltn="dojo:"+ltn;
}
ret=dojo.widget.buildWidgetFromParseTree(ltn,frag,this,_417,frag.index);
if(ret){
_419=true;
_418.push(ret);
}
}
}
}
}
catch(e){
dojo.debug("dojo.widget.Parse: error:",e);
}
if(!_419){
_418=_418.concat(this.createSubComponents(frag,_417));
}
return _418;
};
this.createSubComponents=function(_41f,_420){
var frag,_422=[];
for(var item in _41f){
frag=_41f[item];
if(frag&&typeof frag=="object"&&(frag!=_41f.nodeRef)&&(frag!=_41f.tagName)&&(!dojo.dom.isNode(frag))){
_422=_422.concat(this.createComponents(frag,_420));
}
}
return _422;
};
this.parsePropertySets=function(_424){
return [];
};
this.parseProperties=function(_425){
var _426={};
for(var item in _425){
if((_425[item]==_425.tagName)||(_425[item]==_425.nodeRef)){
}else{
var frag=_425[item];
if(frag.tagName&&dojo.widget.tags[frag.tagName.toLowerCase()]){
}else{
if(frag[0]&&frag[0].value!=""&&frag[0].value!=null){
try{
if(item.toLowerCase()=="dataprovider"){
var _429=this;
this.getDataProvider(_429,frag[0].value);
_426.dataProvider=this.dataProvider;
}
_426[item]=frag[0].value;
var _42a=this.parseProperties(frag);
for(var _42b in _42a){
_426[_42b]=_42a[_42b];
}
}
catch(e){
dojo.debug(e);
}
}
}
switch(item.toLowerCase()){
case "checked":
case "disabled":
if(typeof _426[item]!="boolean"){
_426[item]=true;
}
break;
}
}
}
return _426;
};
this.getDataProvider=function(_42c,_42d){
dojo.io.bind({url:_42d,load:function(type,_42f){
if(type=="load"){
_42c.dataProvider=_42f;
}
},mimetype:"text/javascript",sync:true});
};
this.getPropertySetById=function(_430){
for(var x=0;x<this.propertySetsList.length;x++){
if(_430==this.propertySetsList[x]["id"][0].value){
return this.propertySetsList[x];
}
}
return "";
};
this.getPropertySetsByType=function(_432){
var _433=[];
for(var x=0;x<this.propertySetsList.length;x++){
var cpl=this.propertySetsList[x];
var cpcc=cpl.componentClass||cpl.componentType||null;
var _437=this.propertySetsList[x]["id"][0].value;
if(cpcc&&(_437==cpcc[0].value)){
_433.push(cpl);
}
}
return _433;
};
this.getPropertySets=function(_438){
var ppl="dojo:propertyproviderlist";
var _43a=[];
var _43b=_438.tagName;
if(_438[ppl]){
var _43c=_438[ppl].value.split(" ");
for(var _43d in _43c){
if((_43d.indexOf("..")==-1)&&(_43d.indexOf("://")==-1)){
var _43e=this.getPropertySetById(_43d);
if(_43e!=""){
_43a.push(_43e);
}
}else{
}
}
}
return this.getPropertySetsByType(_43b).concat(_43a);
};
this.createComponentFromScript=function(_43f,_440,_441,ns){
_441.fastMixIn=true;
var ltn=(ns||"dojo")+":"+_440.toLowerCase();
if(dojo.widget.tags[ltn]){
return [dojo.widget.tags[ltn](_441,this,null,null,_441)];
}
return [dojo.widget.buildWidgetFromParseTree(ltn,_441,this,null,null,_441)];
};
};
dojo.widget._parser_collection={"dojo":new dojo.widget.Parse()};
dojo.widget.getParser=function(name){
if(!name){
name="dojo";
}
if(!this._parser_collection[name]){
this._parser_collection[name]=new dojo.widget.Parse();
}
return this._parser_collection[name];
};
dojo.widget.createWidget=function(name,_446,_447,_448){
var _449=false;
var _44a=(typeof name=="string");
if(_44a){
var pos=name.indexOf(":");
var ns=(pos>-1)?name.substring(0,pos):"dojo";
if(pos>-1){
name=name.substring(pos+1);
}
var _44d=name.toLowerCase();
var _44e=ns+":"+_44d;
_449=(dojo.byId(name)&&!dojo.widget.tags[_44e]);
}
if((arguments.length==1)&&(_449||!_44a)){
var xp=new dojo.xml.Parse();
var tn=_449?dojo.byId(name):name;
return dojo.widget.getParser().createComponents(xp.parseElement(tn,null,true))[0];
}
function fromScript(_451,name,_453,ns){
_453[_44e]={dojotype:[{value:_44d}],nodeRef:_451,fastMixIn:true};
_453.ns=ns;
return dojo.widget.getParser().createComponentFromScript(_451,name,_453,ns);
}
_446=_446||{};
var _455=false;
var tn=null;
var h=dojo.render.html.capable;
if(h){
tn=document.createElement("span");
}
if(!_447){
_455=true;
_447=tn;
if(h){
dojo.body().appendChild(_447);
}
}else{
if(_448){
dojo.dom.insertAtPosition(tn,_447,_448);
}else{
tn=_447;
}
}
var _457=fromScript(tn,name.toLowerCase(),_446,ns);
if((!_457)||(!_457[0])||(typeof _457[0].widgetType=="undefined")){
throw new Error("createWidget: Creation of \""+name+"\" widget failed.");
}
try{
if(_455&&_457[0].domNode.parentNode){
_457[0].domNode.parentNode.removeChild(_457[0].domNode);
}
}
catch(e){
dojo.debug(e);
}
return _457[0];
};
dojo.provide("dojo.html.style");
dojo.html.getClass=function(node){
node=dojo.byId(node);
if(!node){
return "";
}
var cs="";
if(node.className){
cs=node.className;
}else{
if(dojo.html.hasAttribute(node,"class")){
cs=dojo.html.getAttribute(node,"class");
}
}
return cs.replace(/^\s+|\s+$/g,"");
};
dojo.html.getClasses=function(node){
var c=dojo.html.getClass(node);
return (c=="")?[]:c.split(/\s+/g);
};
dojo.html.hasClass=function(node,_45d){
return (new RegExp("(^|\\s+)"+_45d+"(\\s+|$)")).test(dojo.html.getClass(node));
};
dojo.html.prependClass=function(node,_45f){
_45f+=" "+dojo.html.getClass(node);
return dojo.html.setClass(node,_45f);
};
dojo.html.addClass=function(node,_461){
if(dojo.html.hasClass(node,_461)){
return false;
}
_461=(dojo.html.getClass(node)+" "+_461).replace(/^\s+|\s+$/g,"");
return dojo.html.setClass(node,_461);
};
dojo.html.setClass=function(node,_463){
node=dojo.byId(node);
var cs=new String(_463);
try{
if(typeof node.className=="string"){
node.className=cs;
}else{
if(node.setAttribute){
node.setAttribute("class",_463);
node.className=cs;
}else{
return false;
}
}
}
catch(e){
dojo.debug("dojo.html.setClass() failed",e);
}
return true;
};
dojo.html.removeClass=function(node,_466,_467){
try{
if(!_467){
var _468=dojo.html.getClass(node).replace(new RegExp("(^|\\s+)"+_466+"(\\s+|$)"),"$1$2");
}else{
var _468=dojo.html.getClass(node).replace(_466,"");
}
dojo.html.setClass(node,_468);
}
catch(e){
dojo.debug("dojo.html.removeClass() failed",e);
}
return true;
};
dojo.html.replaceClass=function(node,_46a,_46b){
dojo.html.removeClass(node,_46b);
dojo.html.addClass(node,_46a);
};
dojo.html.classMatchType={ContainsAll:0,ContainsAny:1,IsOnly:2};
dojo.html.getElementsByClass=function(_46c,_46d,_46e,_46f,_470){
_470=false;
var _471=dojo.doc();
_46d=dojo.byId(_46d)||_471;
var _472=_46c.split(/\s+/g);
var _473=[];
if(_46f!=1&&_46f!=2){
_46f=0;
}
var _474=new RegExp("(\\s|^)(("+_472.join(")|(")+"))(\\s|$)");
var _475=_472.join(" ").length;
var _476=[];
if(!_470&&_471.evaluate){
var _477=".//"+(_46e||"*")+"[contains(";
if(_46f!=dojo.html.classMatchType.ContainsAny){
_477+="concat(' ',@class,' '), ' "+_472.join(" ') and contains(concat(' ',@class,' '), ' ")+" ')";
if(_46f==2){
_477+=" and string-length(@class)="+_475+"]";
}else{
_477+="]";
}
}else{
_477+="concat(' ',@class,' '), ' "+_472.join(" ') or contains(concat(' ',@class,' '), ' ")+" ')]";
}
var _478=_471.evaluate(_477,_46d,null,XPathResult.ANY_TYPE,null);
var _479=_478.iterateNext();
while(_479){
try{
_476.push(_479);
_479=_478.iterateNext();
}
catch(e){
break;
}
}
return _476;
}else{
if(!_46e){
_46e="*";
}
_476=_46d.getElementsByTagName(_46e);
var node,i=0;
outer:
while(node=_476[i++]){
var _47c=dojo.html.getClasses(node);
if(_47c.length==0){
continue outer;
}
var _47d=0;
for(var j=0;j<_47c.length;j++){
if(_474.test(_47c[j])){
if(_46f==dojo.html.classMatchType.ContainsAny){
_473.push(node);
continue outer;
}else{
_47d++;
}
}else{
if(_46f==dojo.html.classMatchType.IsOnly){
continue outer;
}
}
}
if(_47d==_472.length){
if((_46f==dojo.html.classMatchType.IsOnly)&&(_47d==_47c.length)){
_473.push(node);
}else{
if(_46f==dojo.html.classMatchType.ContainsAll){
_473.push(node);
}
}
}
}
return _473;
}
};
dojo.html.getElementsByClassName=dojo.html.getElementsByClass;
dojo.html.toCamelCase=function(_47f){
var arr=_47f.split("-"),cc=arr[0];
for(var i=1;i<arr.length;i++){
cc+=arr[i].charAt(0).toUpperCase()+arr[i].substring(1);
}
return cc;
};
dojo.html.toSelectorCase=function(_483){
return _483.replace(/([A-Z])/g,"-$1").toLowerCase();
};
if(dojo.render.html.ie){
dojo.html.getComputedStyle=function(node,_485,_486){
node=dojo.byId(node);
if(!node||!node.currentStyle){
return _486;
}
return node.currentStyle[dojo.html.toCamelCase(_485)];
};
dojo.html.getComputedStyles=function(node){
return node.currentStyle;
};
}else{
dojo.html.getComputedStyle=function(node,_489,_48a){
node=dojo.byId(node);
if(!node||!node.style){
return _48a;
}
var s=document.defaultView.getComputedStyle(node,null);
return (s&&s[dojo.html.toCamelCase(_489)])||"";
};
dojo.html.getComputedStyles=function(node){
return document.defaultView.getComputedStyle(node,null);
};
}
dojo.html.getStyleProperty=function(node,_48e){
node=dojo.byId(node);
return (node&&node.style?node.style[dojo.html.toCamelCase(_48e)]:undefined);
};
dojo.html.getStyle=function(node,_490){
var _491=dojo.html.getStyleProperty(node,_490);
return (_491?_491:dojo.html.getComputedStyle(node,_490));
};
dojo.html.setStyle=function(node,_493,_494){
node=dojo.byId(node);
if(node&&node.style){
var _495=dojo.html.toCamelCase(_493);
node.style[_495]=_494;
}
};
dojo.html.setStyleText=function(_496,text){
try{
_496.style.cssText=text;
}
catch(e){
_496.setAttribute("style",text);
}
};
dojo.html.copyStyle=function(_498,_499){
if(!_499.style.cssText){
_498.setAttribute("style",_499.getAttribute("style"));
}else{
_498.style.cssText=_499.style.cssText;
}
dojo.html.addClass(_498,dojo.html.getClass(_499));
};
dojo.html.getUnitValue=function(node,_49b,_49c){
var s=dojo.html.getComputedStyle(node,_49b);
if((!s)||((s=="auto")&&(_49c))){
return {value:0,units:"px"};
}
var _49e=s.match(/(\-?[\d.]+)([a-z%]*)/i);
if(!_49e){
return dojo.html.getUnitValue.bad;
}
return {value:Number(_49e[1]),units:_49e[2].toLowerCase()};
};
dojo.html.getUnitValue.bad={value:NaN,units:""};
if(dojo.render.html.ie){
dojo.html.toPixelValue=function(_49f,_4a0){
if(!_4a0){
return 0;
}
if(_4a0.slice(-2)=="px"){
return parseFloat(_4a0);
}
var _4a1=0;
with(_49f){
var _4a2=style.left;
var _4a3=runtimeStyle.left;
runtimeStyle.left=currentStyle.left;
try{
style.left=_4a0||0;
_4a1=style.pixelLeft;
style.left=_4a2;
runtimeStyle.left=_4a3;
}
catch(e){
}
}
return _4a1;
};
}else{
dojo.html.toPixelValue=function(_4a4,_4a5){
return (_4a5&&(_4a5.slice(-2)=="px")?parseFloat(_4a5):0);
};
}
dojo.html.getPixelValue=function(node,_4a7,_4a8){
return dojo.html.toPixelValue(node,dojo.html.getComputedStyle(node,_4a7));
};
dojo.html.setPositivePixelValue=function(node,_4aa,_4ab){
if(isNaN(_4ab)){
return false;
}
node.style[_4aa]=Math.max(0,_4ab)+"px";
return true;
};
dojo.html.styleSheet=null;
dojo.html.insertCssRule=function(_4ac,_4ad,_4ae){
if(!dojo.html.styleSheet){
if(document.createStyleSheet){
dojo.html.styleSheet=document.createStyleSheet();
}else{
if(document.styleSheets[0]){
dojo.html.styleSheet=document.styleSheets[0];
}else{
return null;
}
}
}
if(arguments.length<3){
if(dojo.html.styleSheet.cssRules){
_4ae=dojo.html.styleSheet.cssRules.length;
}else{
if(dojo.html.styleSheet.rules){
_4ae=dojo.html.styleSheet.rules.length;
}else{
return null;
}
}
}
if(dojo.html.styleSheet.insertRule){
var rule=_4ac+" { "+_4ad+" }";
return dojo.html.styleSheet.insertRule(rule,_4ae);
}else{
if(dojo.html.styleSheet.addRule){
return dojo.html.styleSheet.addRule(_4ac,_4ad,_4ae);
}else{
return null;
}
}
};
dojo.html.removeCssRule=function(_4b0){
if(!dojo.html.styleSheet){
dojo.debug("no stylesheet defined for removing rules");
return false;
}
if(dojo.render.html.ie){
if(!_4b0){
_4b0=dojo.html.styleSheet.rules.length;
dojo.html.styleSheet.removeRule(_4b0);
}
}else{
if(document.styleSheets[0]){
if(!_4b0){
_4b0=dojo.html.styleSheet.cssRules.length;
}
dojo.html.styleSheet.deleteRule(_4b0);
}
}
return true;
};
dojo.html._insertedCssFiles=[];
dojo.html.insertCssFile=function(URI,doc,_4b3,_4b4){
if(!URI){
return;
}
if(!doc){
doc=document;
}
var _4b5=dojo.hostenv.getText(URI,false,_4b4);
if(_4b5===null){
return;
}
_4b5=dojo.html.fixPathsInCssText(_4b5,URI);
if(_4b3){
var idx=-1,node,ent=dojo.html._insertedCssFiles;
for(var i=0;i<ent.length;i++){
if((ent[i].doc==doc)&&(ent[i].cssText==_4b5)){
idx=i;
node=ent[i].nodeRef;
break;
}
}
if(node){
var _4ba=doc.getElementsByTagName("style");
for(var i=0;i<_4ba.length;i++){
if(_4ba[i]==node){
return;
}
}
dojo.html._insertedCssFiles.shift(idx,1);
}
}
var _4bb=dojo.html.insertCssText(_4b5,doc);
dojo.html._insertedCssFiles.push({"doc":doc,"cssText":_4b5,"nodeRef":_4bb});
if(_4bb&&djConfig.isDebug){
_4bb.setAttribute("dbgHref",URI);
}
return _4bb;
};
dojo.html.insertCssText=function(_4bc,doc,URI){
if(!_4bc){
return;
}
if(!doc){
doc=document;
}
if(URI){
_4bc=dojo.html.fixPathsInCssText(_4bc,URI);
}
var _4bf=doc.createElement("style");
_4bf.setAttribute("type","text/css");
var head=doc.getElementsByTagName("head")[0];
if(!head){
dojo.debug("No head tag in document, aborting styles");
return;
}else{
head.appendChild(_4bf);
}
if(_4bf.styleSheet){
var _4c1=function(){
try{
_4bf.styleSheet.cssText=_4bc;
}
catch(e){
dojo.debug(e);
}
};
if(_4bf.styleSheet.disabled){
setTimeout(_4c1,10);
}else{
_4c1();
}
}else{
var _4c2=doc.createTextNode(_4bc);
_4bf.appendChild(_4c2);
}
return _4bf;
};
dojo.html.fixPathsInCssText=function(_4c3,URI){
if(!_4c3||!URI){
return;
}
var _4c5,str="",url="",_4c8="[\\t\\s\\w\\(\\)\\/\\.\\\\'\"-:#=&?~]+";
var _4c9=new RegExp("url\\(\\s*("+_4c8+")\\s*\\)");
var _4ca=/(file|https?|ftps?):\/\//;
regexTrim=new RegExp("^[\\s]*(['\"]?)("+_4c8+")\\1[\\s]*?$");
if(dojo.render.html.ie55||dojo.render.html.ie60){
var _4cb=new RegExp("AlphaImageLoader\\((.*)src=['\"]("+_4c8+")['\"]");
while(_4c5=_4cb.exec(_4c3)){
url=_4c5[2].replace(regexTrim,"$2");
if(!_4ca.exec(url)){
url=(new dojo.uri.Uri(URI,url).toString());
}
str+=_4c3.substring(0,_4c5.index)+"AlphaImageLoader("+_4c5[1]+"src='"+url+"'";
_4c3=_4c3.substr(_4c5.index+_4c5[0].length);
}
_4c3=str+_4c3;
str="";
}
while(_4c5=_4c9.exec(_4c3)){
url=_4c5[1].replace(regexTrim,"$2");
if(!_4ca.exec(url)){
url=(new dojo.uri.Uri(URI,url).toString());
}
str+=_4c3.substring(0,_4c5.index)+"url("+url+")";
_4c3=_4c3.substr(_4c5.index+_4c5[0].length);
}
return str+_4c3;
};
dojo.html.setActiveStyleSheet=function(_4cc){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("title")){
a.disabled=true;
if(a.getAttribute("title")==_4cc){
a.disabled=false;
}
}
}
};
dojo.html.getActiveStyleSheet=function(){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("title")&&!a.disabled){
return a.getAttribute("title");
}
}
return null;
};
dojo.html.getPreferredStyleSheet=function(){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("rel").indexOf("alt")==-1&&a.getAttribute("title")){
return a.getAttribute("title");
}
}
return null;
};
dojo.html.applyBrowserClass=function(node){
var drh=dojo.render.html;
var _4d8={dj_ie:drh.ie,dj_ie55:drh.ie55,dj_ie6:drh.ie60,dj_ie7:drh.ie70,dj_iequirks:drh.ie&&drh.quirks,dj_opera:drh.opera,dj_opera8:drh.opera&&(Math.floor(dojo.render.version)==8),dj_opera9:drh.opera&&(Math.floor(dojo.render.version)==9),dj_khtml:drh.khtml,dj_safari:drh.safari,dj_gecko:drh.mozilla};
for(var p in _4d8){
if(_4d8[p]){
dojo.html.addClass(node,p);
}
}
};
dojo.provide("dojo.widget.DomWidget");
dojo.widget._cssFiles={};
dojo.widget._cssStrings={};
dojo.widget._templateCache={};
dojo.widget.defaultStrings={dojoRoot:dojo.hostenv.getBaseScriptUri(),dojoWidgetModuleUri:dojo.uri.moduleUri("dojo.widget"),baseScriptUri:dojo.hostenv.getBaseScriptUri()};
dojo.widget.fillFromTemplateCache=function(obj,_4db,_4dc,_4dd){
var _4de=_4db||obj.templatePath;
var _4df=dojo.widget._templateCache;
if(!_4de&&!obj["widgetType"]){
do{
var _4e0="__dummyTemplate__"+dojo.widget._templateCache.dummyCount++;
}while(_4df[_4e0]);
obj.widgetType=_4e0;
}
var wt=_4de?_4de.toString():obj.widgetType;
var ts=_4df[wt];
if(!ts){
_4df[wt]={"string":null,"node":null};
if(_4dd){
ts={};
}else{
ts=_4df[wt];
}
}
if((!obj.templateString)&&(!_4dd)){
obj.templateString=_4dc||ts["string"];
}
if(obj.templateString){
obj.templateString=this._sanitizeTemplateString(obj.templateString);
}
if((!obj.templateNode)&&(!_4dd)){
obj.templateNode=ts["node"];
}
if((!obj.templateNode)&&(!obj.templateString)&&(_4de)){
var _4e3=this._sanitizeTemplateString(dojo.hostenv.getText(_4de));
obj.templateString=_4e3;
if(!_4dd){
_4df[wt]["string"]=_4e3;
}
}
if((!ts["string"])&&(!_4dd)){
ts.string=obj.templateString;
}
};
dojo.widget._sanitizeTemplateString=function(_4e4){
if(_4e4){
_4e4=_4e4.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _4e5=_4e4.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_4e5){
_4e4=_4e5[1];
}
}else{
_4e4="";
}
return _4e4;
};
dojo.widget._templateCache.dummyCount=0;
dojo.widget.attachProperties=["dojoAttachPoint","id"];
dojo.widget.eventAttachProperty="dojoAttachEvent";
dojo.widget.onBuildProperty="dojoOnBuild";
dojo.widget.waiNames=["waiRole","waiState"];
dojo.widget.wai={waiRole:{name:"waiRole","namespace":"http://www.w3.org/TR/xhtml2",alias:"x2",prefix:"wairole:"},waiState:{name:"waiState","namespace":"http://www.w3.org/2005/07/aaa",alias:"aaa",prefix:""},setAttr:function(node,ns,attr,_4e9){
if(dojo.render.html.ie){
node.setAttribute(this[ns].alias+":"+attr,this[ns].prefix+_4e9);
}else{
node.setAttributeNS(this[ns]["namespace"],attr,this[ns].prefix+_4e9);
}
},getAttr:function(node,ns,attr){
if(dojo.render.html.ie){
return node.getAttribute(this[ns].alias+":"+attr);
}else{
return node.getAttributeNS(this[ns]["namespace"],attr);
}
},removeAttr:function(node,ns,attr){
var _4f0=true;
if(dojo.render.html.ie){
_4f0=node.removeAttribute(this[ns].alias+":"+attr);
}else{
node.removeAttributeNS(this[ns]["namespace"],attr);
}
return _4f0;
}};
dojo.widget.attachTemplateNodes=function(_4f1,_4f2,_4f3){
var _4f4=dojo.dom.ELEMENT_NODE;
function trim(str){
return str.replace(/^\s+|\s+$/g,"");
}
if(!_4f1){
_4f1=_4f2.domNode;
}
if(_4f1.nodeType!=_4f4){
return;
}
var _4f6=_4f1.all||_4f1.getElementsByTagName("*");
var _4f7=_4f2;
for(var x=-1;x<_4f6.length;x++){
var _4f9=(x==-1)?_4f1:_4f6[x];
var _4fa=[];
if(!_4f2.widgetsInTemplate||!_4f9.getAttribute("dojoType")){
for(var y=0;y<this.attachProperties.length;y++){
var _4fc=_4f9.getAttribute(this.attachProperties[y]);
if(_4fc){
_4fa=_4fc.split(";");
for(var z=0;z<_4fa.length;z++){
if(dojo.lang.isArray(_4f2[_4fa[z]])){
_4f2[_4fa[z]].push(_4f9);
}else{
_4f2[_4fa[z]]=_4f9;
}
}
break;
}
}
var _4fe=_4f9.getAttribute(this.eventAttachProperty);
if(_4fe){
var evts=_4fe.split(";");
for(var y=0;y<evts.length;y++){
if((!evts[y])||(!evts[y].length)){
continue;
}
var _500=null;
var tevt=trim(evts[y]);
if(evts[y].indexOf(":")>=0){
var _502=tevt.split(":");
tevt=trim(_502[0]);
_500=trim(_502[1]);
}
if(!_500){
_500=tevt;
}
var tf=function(){
var ntf=new String(_500);
return function(evt){
if(_4f7[ntf]){
_4f7[ntf](dojo.event.browser.fixEvent(evt,this));
}
};
}();
dojo.event.browser.addListener(_4f9,tevt,tf,false,true);
}
}
for(var y=0;y<_4f3.length;y++){
var _506=_4f9.getAttribute(_4f3[y]);
if((_506)&&(_506.length)){
var _500=null;
var _507=_4f3[y].substr(4);
_500=trim(_506);
var _508=[_500];
if(_500.indexOf(";")>=0){
_508=dojo.lang.map(_500.split(";"),trim);
}
for(var z=0;z<_508.length;z++){
if(!_508[z].length){
continue;
}
var tf=function(){
var ntf=new String(_508[z]);
return function(evt){
if(_4f7[ntf]){
_4f7[ntf](dojo.event.browser.fixEvent(evt,this));
}
};
}();
dojo.event.browser.addListener(_4f9,_507,tf,false,true);
}
}
}
}
var _50b=_4f9.getAttribute(this.templateProperty);
if(_50b){
_4f2[_50b]=_4f9;
}
dojo.lang.forEach(dojo.widget.waiNames,function(name){
var wai=dojo.widget.wai[name];
var val=_4f9.getAttribute(wai.name);
if(val){
if(val.indexOf("-")==-1){
dojo.widget.wai.setAttr(_4f9,wai.name,"role",val);
}else{
var _50f=val.split("-");
dojo.widget.wai.setAttr(_4f9,wai.name,_50f[0],_50f[1]);
}
}
},this);
var _510=_4f9.getAttribute(this.onBuildProperty);
if(_510){
eval("var node = baseNode; var widget = targetObj; "+_510);
}
}
};
dojo.widget.getDojoEventsFromStr=function(str){
var re=/(dojoOn([a-z]+)(\s?))=/gi;
var evts=str?str.match(re)||[]:[];
var ret=[];
var lem={};
for(var x=0;x<evts.length;x++){
if(evts[x].length<1){
continue;
}
var cm=evts[x].replace(/\s/,"");
cm=(cm.slice(0,cm.length-1));
if(!lem[cm]){
lem[cm]=true;
ret.push(cm);
}
}
return ret;
};
dojo.declare("dojo.widget.DomWidget",dojo.widget.Widget,function(){
if((arguments.length>0)&&(typeof arguments[0]=="object")){
this.create(arguments[0]);
}
},{templateNode:null,templateString:null,templateCssString:null,preventClobber:false,domNode:null,containerNode:null,widgetsInTemplate:false,addChild:function(_518,_519,pos,ref,_51c){
if(!this.isContainer){
dojo.debug("dojo.widget.DomWidget.addChild() attempted on non-container widget");
return null;
}else{
if(_51c==undefined){
_51c=this.children.length;
}
this.addWidgetAsDirectChild(_518,_519,pos,ref,_51c);
this.registerChild(_518,_51c);
}
return _518;
},addWidgetAsDirectChild:function(_51d,_51e,pos,ref,_521){
if((!this.containerNode)&&(!_51e)){
this.containerNode=this.domNode;
}
var cn=(_51e)?_51e:this.containerNode;
if(!pos){
pos="after";
}
if(!ref){
if(!cn){
cn=dojo.body();
}
ref=cn.lastChild;
}
if(!_521){
_521=0;
}
_51d.domNode.setAttribute("dojoinsertionindex",_521);
if(!ref){
cn.appendChild(_51d.domNode);
}else{
if(pos=="insertAtIndex"){
dojo.dom.insertAtIndex(_51d.domNode,ref.parentNode,_521);
}else{
if((pos=="after")&&(ref===cn.lastChild)){
cn.appendChild(_51d.domNode);
}else{
dojo.dom.insertAtPosition(_51d.domNode,cn,pos);
}
}
}
},registerChild:function(_523,_524){
_523.dojoInsertionIndex=_524;
var idx=-1;
for(var i=0;i<this.children.length;i++){
if(this.children[i].dojoInsertionIndex<=_524){
idx=i;
}
}
this.children.splice(idx+1,0,_523);
_523.parent=this;
_523.addedTo(this,idx+1);
delete dojo.widget.manager.topWidgets[_523.widgetId];
},removeChild:function(_527){
dojo.dom.removeNode(_527.domNode);
return dojo.widget.DomWidget.superclass.removeChild.call(this,_527);
},getFragNodeRef:function(frag){
if(!frag){
return null;
}
if(!frag[this.getNamespacedType()]){
dojo.raise("Error: no frag for widget type "+this.getNamespacedType()+", id "+this.widgetId+" (maybe a widget has set it's type incorrectly)");
}
return frag[this.getNamespacedType()]["nodeRef"];
},postInitialize:function(args,frag,_52b){
var _52c=this.getFragNodeRef(frag);
if(_52b&&(_52b.snarfChildDomOutput||!_52c)){
_52b.addWidgetAsDirectChild(this,"","insertAtIndex","",args["dojoinsertionindex"],_52c);
}else{
if(_52c){
if(this.domNode&&(this.domNode!==_52c)){
this._sourceNodeRef=dojo.dom.replaceNode(_52c,this.domNode);
}
}
}
if(_52b){
_52b.registerChild(this,args.dojoinsertionindex);
}else{
dojo.widget.manager.topWidgets[this.widgetId]=this;
}
if(this.widgetsInTemplate){
var _52d=new dojo.xml.Parse();
var _52e;
var _52f=this.domNode.getElementsByTagName("*");
for(var i=0;i<_52f.length;i++){
if(_52f[i].getAttribute("dojoAttachPoint")=="subContainerWidget"){
_52e=_52f[i];
}
if(_52f[i].getAttribute("dojoType")){
_52f[i].setAttribute("isSubWidget",true);
}
}
if(this.isContainer&&!this.containerNode){
if(_52e){
var src=this.getFragNodeRef(frag);
if(src){
dojo.dom.moveChildren(src,_52e);
frag["dojoDontFollow"]=true;
}
}else{
dojo.debug("No subContainerWidget node can be found in template file for widget "+this);
}
}
var _532=_52d.parseElement(this.domNode,null,true);
dojo.widget.getParser().createSubComponents(_532,this);
var _533=[];
var _534=[this];
var w;
while((w=_534.pop())){
for(var i=0;i<w.children.length;i++){
var _536=w.children[i];
if(_536._processedSubWidgets||!_536.extraArgs["issubwidget"]){
continue;
}
_533.push(_536);
if(_536.isContainer){
_534.push(_536);
}
}
}
for(var i=0;i<_533.length;i++){
var _537=_533[i];
if(_537._processedSubWidgets){
dojo.debug("This should not happen: widget._processedSubWidgets is already true!");
return;
}
_537._processedSubWidgets=true;
if(_537.extraArgs["dojoattachevent"]){
var evts=_537.extraArgs["dojoattachevent"].split(";");
for(var j=0;j<evts.length;j++){
var _53a=null;
var tevt=dojo.string.trim(evts[j]);
if(tevt.indexOf(":")>=0){
var _53c=tevt.split(":");
tevt=dojo.string.trim(_53c[0]);
_53a=dojo.string.trim(_53c[1]);
}
if(!_53a){
_53a=tevt;
}
if(dojo.lang.isFunction(_537[tevt])){
dojo.event.kwConnect({srcObj:_537,srcFunc:tevt,targetObj:this,targetFunc:_53a});
}else{
alert(tevt+" is not a function in widget "+_537);
}
}
}
if(_537.extraArgs["dojoattachpoint"]){
this[_537.extraArgs["dojoattachpoint"]]=_537;
}
}
}
if(this.isContainer&&!frag["dojoDontFollow"]){
dojo.widget.getParser().createSubComponents(frag,this);
}
},buildRendering:function(args,frag){
var ts=dojo.widget._templateCache[this.widgetType];
if(args["templatecsspath"]){
args["templateCssPath"]=args["templatecsspath"];
}
var _540=args["templateCssPath"]||this.templateCssPath;
if(_540&&!dojo.widget._cssFiles[_540.toString()]){
if((!this.templateCssString)&&(_540)){
this.templateCssString=dojo.hostenv.getText(_540);
this.templateCssPath=null;
}
dojo.widget._cssFiles[_540.toString()]=true;
}
if((this["templateCssString"])&&(!dojo.widget._cssStrings[this.templateCssString])){
dojo.html.insertCssText(this.templateCssString,null,_540);
dojo.widget._cssStrings[this.templateCssString]=true;
}
if((!this.preventClobber)&&((this.templatePath)||(this.templateNode)||((this["templateString"])&&(this.templateString.length))||((typeof ts!="undefined")&&((ts["string"])||(ts["node"]))))){
this.buildFromTemplate(args,frag);
}else{
this.domNode=this.getFragNodeRef(frag);
}
this.fillInTemplate(args,frag);
},buildFromTemplate:function(args,frag){
var _543=false;
if(args["templatepath"]){
args["templatePath"]=args["templatepath"];
}
dojo.widget.fillFromTemplateCache(this,args["templatePath"],null,_543);
var ts=dojo.widget._templateCache[this.templatePath?this.templatePath.toString():this.widgetType];
if((ts)&&(!_543)){
if(!this.templateString.length){
this.templateString=ts["string"];
}
if(!this.templateNode){
this.templateNode=ts["node"];
}
}
var _545=false;
var node=null;
var tstr=this.templateString;
if((!this.templateNode)&&(this.templateString)){
_545=this.templateString.match(/\$\{([^\}]+)\}/g);
if(_545){
var hash=this.strings||{};
for(var key in dojo.widget.defaultStrings){
if(dojo.lang.isUndefined(hash[key])){
hash[key]=dojo.widget.defaultStrings[key];
}
}
for(var i=0;i<_545.length;i++){
var key=_545[i];
key=key.substring(2,key.length-1);
var kval=(key.substring(0,5)=="this.")?dojo.lang.getObjPathValue(key.substring(5),this):hash[key];
var _54c;
if((kval)||(dojo.lang.isString(kval))){
_54c=new String((dojo.lang.isFunction(kval))?kval.call(this,key,this.templateString):kval);
while(_54c.indexOf("\"")>-1){
_54c=_54c.replace("\"","&quot;");
}
tstr=tstr.replace(_545[i],_54c);
}
}
}else{
this.templateNode=this.createNodesFromText(this.templateString,true)[0];
if(!_543){
ts.node=this.templateNode;
}
}
}
if((!this.templateNode)&&(!_545)){
dojo.debug("DomWidget.buildFromTemplate: could not create template");
return false;
}else{
if(!_545){
node=this.templateNode.cloneNode(true);
if(!node){
return false;
}
}else{
node=this.createNodesFromText(tstr,true)[0];
}
}
this.domNode=node;
this.attachTemplateNodes();
if(this.isContainer&&this.containerNode){
var src=this.getFragNodeRef(frag);
if(src){
dojo.dom.moveChildren(src,this.containerNode);
}
}
},attachTemplateNodes:function(_54e,_54f){
if(!_54e){
_54e=this.domNode;
}
if(!_54f){
_54f=this;
}
return dojo.widget.attachTemplateNodes(_54e,_54f,dojo.widget.getDojoEventsFromStr(this.templateString));
},fillInTemplate:function(){
},destroyRendering:function(){
try{
dojo.dom.destroyNode(this.domNode);
delete this.domNode;
}
catch(e){
}
if(this._sourceNodeRef){
try{
dojo.dom.destroyNode(this._sourceNodeRef);
}
catch(e){
}
}
},createNodesFromText:function(){
dojo.unimplemented("dojo.widget.DomWidget.createNodesFromText");
}});
dojo.provide("dojo.html.display");
dojo.html._toggle=function(node,_551,_552){
node=dojo.byId(node);
_552(node,!_551(node));
return _551(node);
};
dojo.html.show=function(node){
node=dojo.byId(node);
if(dojo.html.getStyleProperty(node,"display")=="none"){
dojo.html.setStyle(node,"display",(node.dojoDisplayCache||""));
node.dojoDisplayCache=undefined;
}
};
dojo.html.hide=function(node){
node=dojo.byId(node);
if(typeof node["dojoDisplayCache"]=="undefined"){
var d=dojo.html.getStyleProperty(node,"display");
if(d!="none"){
node.dojoDisplayCache=d;
}
}
dojo.html.setStyle(node,"display","none");
};
dojo.html.setShowing=function(node,_557){
dojo.html[(_557?"show":"hide")](node);
};
dojo.html.isShowing=function(node){
return (dojo.html.getStyleProperty(node,"display")!="none");
};
dojo.html.toggleShowing=function(node){
return dojo.html._toggle(node,dojo.html.isShowing,dojo.html.setShowing);
};
dojo.html.displayMap={tr:"",td:"",th:"",img:"inline",span:"inline",input:"inline",button:"inline"};
dojo.html.suggestDisplayByTagName=function(node){
node=dojo.byId(node);
if(node&&node.tagName){
var tag=node.tagName.toLowerCase();
return (tag in dojo.html.displayMap?dojo.html.displayMap[tag]:"block");
}
};
dojo.html.setDisplay=function(node,_55d){
dojo.html.setStyle(node,"display",((_55d instanceof String||typeof _55d=="string")?_55d:(_55d?dojo.html.suggestDisplayByTagName(node):"none")));
};
dojo.html.isDisplayed=function(node){
return (dojo.html.getComputedStyle(node,"display")!="none");
};
dojo.html.toggleDisplay=function(node){
return dojo.html._toggle(node,dojo.html.isDisplayed,dojo.html.setDisplay);
};
dojo.html.setVisibility=function(node,_561){
dojo.html.setStyle(node,"visibility",((_561 instanceof String||typeof _561=="string")?_561:(_561?"visible":"hidden")));
};
dojo.html.isVisible=function(node){
return (dojo.html.getComputedStyle(node,"visibility")!="hidden");
};
dojo.html.toggleVisibility=function(node){
return dojo.html._toggle(node,dojo.html.isVisible,dojo.html.setVisibility);
};
dojo.html.setOpacity=function(node,_565,_566){
node=dojo.byId(node);
var h=dojo.render.html;
if(!_566){
if(_565>=1){
if(h.ie){
dojo.html.clearOpacity(node);
return;
}else{
_565=0.999999;
}
}else{
if(_565<0){
_565=0;
}
}
}
if(h.ie){
if(node.nodeName.toLowerCase()=="tr"){
var tds=node.getElementsByTagName("td");
for(var x=0;x<tds.length;x++){
tds[x].style.filter="Alpha(Opacity="+_565*100+")";
}
}
node.style.filter="Alpha(Opacity="+_565*100+")";
}else{
if(h.moz){
node.style.opacity=_565;
node.style.MozOpacity=_565;
}else{
if(h.safari){
node.style.opacity=_565;
node.style.KhtmlOpacity=_565;
}else{
node.style.opacity=_565;
}
}
}
};
dojo.html.clearOpacity=function(node){
node=dojo.byId(node);
var ns=node.style;
var h=dojo.render.html;
if(h.ie){
try{
if(node.filters&&node.filters.alpha){
ns.filter="";
}
}
catch(e){
}
}else{
if(h.moz){
ns.opacity=1;
ns.MozOpacity=1;
}else{
if(h.safari){
ns.opacity=1;
ns.KhtmlOpacity=1;
}else{
ns.opacity=1;
}
}
}
};
dojo.html.getOpacity=function(node){
node=dojo.byId(node);
var h=dojo.render.html;
if(h.ie){
var opac=(node.filters&&node.filters.alpha&&typeof node.filters.alpha.opacity=="number"?node.filters.alpha.opacity:100)/100;
}else{
var opac=node.style.opacity||node.style.MozOpacity||node.style.KhtmlOpacity||1;
}
return opac>=0.999999?1:Number(opac);
};
dojo.provide("dojo.html.layout");
dojo.html.sumAncestorProperties=function(node,prop){
node=dojo.byId(node);
if(!node){
return 0;
}
var _572=0;
while(node){
if(dojo.html.getComputedStyle(node,"position")=="fixed"){
return 0;
}
var val=node[prop];
if(val){
_572+=val-0;
if(node==dojo.body()){
break;
}
}
node=node.parentNode;
}
return _572;
};
dojo.html.setStyleAttributes=function(node,_575){
node=dojo.byId(node);
var _576=_575.replace(/(;)?\s*$/,"").split(";");
for(var i=0;i<_576.length;i++){
var _578=_576[i].split(":");
var name=_578[0].replace(/\s*$/,"").replace(/^\s*/,"").toLowerCase();
var _57a=_578[1].replace(/\s*$/,"").replace(/^\s*/,"");
switch(name){
case "opacity":
dojo.html.setOpacity(node,_57a);
break;
case "content-height":
dojo.html.setContentBox(node,{height:_57a});
break;
case "content-width":
dojo.html.setContentBox(node,{width:_57a});
break;
case "outer-height":
dojo.html.setMarginBox(node,{height:_57a});
break;
case "outer-width":
dojo.html.setMarginBox(node,{width:_57a});
break;
default:
node.style[dojo.html.toCamelCase(name)]=_57a;
}
}
};
dojo.html.boxSizing={MARGIN_BOX:"margin-box",BORDER_BOX:"border-box",PADDING_BOX:"padding-box",CONTENT_BOX:"content-box"};
dojo.html.getAbsolutePosition=dojo.html.abs=function(node,_57c,_57d){
node=dojo.byId(node,node.ownerDocument);
var ret={x:0,y:0};
var bs=dojo.html.boxSizing;
if(!_57d){
_57d=bs.CONTENT_BOX;
}
var _580=2;
var _581;
switch(_57d){
case bs.MARGIN_BOX:
_581=3;
break;
case bs.BORDER_BOX:
_581=2;
break;
case bs.PADDING_BOX:
default:
_581=1;
break;
case bs.CONTENT_BOX:
_581=0;
break;
}
var h=dojo.render.html;
var db=document["body"]||document["documentElement"];
if(h.ie){
with(node.getBoundingClientRect()){
ret.x=left-2;
ret.y=top-2;
}
}else{
if(document.getBoxObjectFor){
_580=1;
try{
var bo=document.getBoxObjectFor(node);
ret.x=bo.x-dojo.html.sumAncestorProperties(node,"scrollLeft");
ret.y=bo.y-dojo.html.sumAncestorProperties(node,"scrollTop");
}
catch(e){
}
}else{
if(node["offsetParent"]){
var _585;
if((h.safari)&&(node.style.getPropertyValue("position")=="absolute")&&(node.parentNode==db)){
_585=db;
}else{
_585=db.parentNode;
}
if(node.parentNode!=db){
var nd=node;
if(dojo.render.html.opera){
nd=db;
}
ret.x-=dojo.html.sumAncestorProperties(nd,"scrollLeft");
ret.y-=dojo.html.sumAncestorProperties(nd,"scrollTop");
}
var _587=node;
do{
var n=_587["offsetLeft"];
if(!h.opera||n>0){
ret.x+=isNaN(n)?0:n;
}
var m=_587["offsetTop"];
ret.y+=isNaN(m)?0:m;
_587=_587.offsetParent;
}while((_587!=_585)&&(_587!=null));
}else{
if(node["x"]&&node["y"]){
ret.x+=isNaN(node.x)?0:node.x;
ret.y+=isNaN(node.y)?0:node.y;
}
}
}
}
if(_57c){
var _58a=dojo.html.getScroll();
ret.y+=_58a.top;
ret.x+=_58a.left;
}
var _58b=[dojo.html.getPaddingExtent,dojo.html.getBorderExtent,dojo.html.getMarginExtent];
if(_580>_581){
for(var i=_581;i<_580;++i){
ret.y+=_58b[i](node,"top");
ret.x+=_58b[i](node,"left");
}
}else{
if(_580<_581){
for(var i=_581;i>_580;--i){
ret.y-=_58b[i-1](node,"top");
ret.x-=_58b[i-1](node,"left");
}
}
}
ret.top=ret.y;
ret.left=ret.x;
return ret;
};
dojo.html.isPositionAbsolute=function(node){
return (dojo.html.getComputedStyle(node,"position")=="absolute");
};
dojo.html._sumPixelValues=function(node,_58f,_590){
var _591=0;
for(var x=0;x<_58f.length;x++){
_591+=dojo.html.getPixelValue(node,_58f[x],_590);
}
return _591;
};
dojo.html.getMargin=function(node){
return {width:dojo.html._sumPixelValues(node,["margin-left","margin-right"],(dojo.html.getComputedStyle(node,"position")=="absolute")),height:dojo.html._sumPixelValues(node,["margin-top","margin-bottom"],(dojo.html.getComputedStyle(node,"position")=="absolute"))};
};
dojo.html.getBorder=function(node){
return {width:dojo.html.getBorderExtent(node,"left")+dojo.html.getBorderExtent(node,"right"),height:dojo.html.getBorderExtent(node,"top")+dojo.html.getBorderExtent(node,"bottom")};
};
dojo.html.getBorderExtent=function(node,side){
return (dojo.html.getStyle(node,"border-"+side+"-style")=="none"?0:dojo.html.getPixelValue(node,"border-"+side+"-width"));
};
dojo.html.getMarginExtent=function(node,side){
return dojo.html._sumPixelValues(node,["margin-"+side],dojo.html.isPositionAbsolute(node));
};
dojo.html.getPaddingExtent=function(node,side){
return dojo.html._sumPixelValues(node,["padding-"+side],true);
};
dojo.html.getPadding=function(node){
return {width:dojo.html._sumPixelValues(node,["padding-left","padding-right"],true),height:dojo.html._sumPixelValues(node,["padding-top","padding-bottom"],true)};
};
dojo.html.getPadBorder=function(node){
var pad=dojo.html.getPadding(node);
var _59e=dojo.html.getBorder(node);
return {width:pad.width+_59e.width,height:pad.height+_59e.height};
};
dojo.html.getBoxSizing=function(node){
var h=dojo.render.html;
var bs=dojo.html.boxSizing;
if(((h.ie)||(h.opera))&&node.nodeName.toLowerCase()!="img"){
var cm=document["compatMode"];
if((cm=="BackCompat")||(cm=="QuirksMode")){
return bs.BORDER_BOX;
}else{
return bs.CONTENT_BOX;
}
}else{
if(arguments.length==0){
node=document.documentElement;
}
var _5a3;
if(!h.ie){
_5a3=dojo.html.getStyle(node,"-moz-box-sizing");
if(!_5a3){
_5a3=dojo.html.getStyle(node,"box-sizing");
}
}
return (_5a3?_5a3:bs.CONTENT_BOX);
}
};
dojo.html.isBorderBox=function(node){
return (dojo.html.getBoxSizing(node)==dojo.html.boxSizing.BORDER_BOX);
};
dojo.html.getBorderBox=function(node){
node=dojo.byId(node);
return {width:node.offsetWidth,height:node.offsetHeight};
};
dojo.html.getPaddingBox=function(node){
var box=dojo.html.getBorderBox(node);
var _5a8=dojo.html.getBorder(node);
return {width:box.width-_5a8.width,height:box.height-_5a8.height};
};
dojo.html.getContentBox=function(node){
node=dojo.byId(node);
var _5aa=dojo.html.getPadBorder(node);
return {width:node.offsetWidth-_5aa.width,height:node.offsetHeight-_5aa.height};
};
dojo.html.setContentBox=function(node,args){
node=dojo.byId(node);
var _5ad=0;
var _5ae=0;
var isbb=dojo.html.isBorderBox(node);
var _5b0=(isbb?dojo.html.getPadBorder(node):{width:0,height:0});
var ret={};
if(typeof args.width!="undefined"){
_5ad=args.width+_5b0.width;
ret.width=dojo.html.setPositivePixelValue(node,"width",_5ad);
}
if(typeof args.height!="undefined"){
_5ae=args.height+_5b0.height;
ret.height=dojo.html.setPositivePixelValue(node,"height",_5ae);
}
return ret;
};
dojo.html.getMarginBox=function(node){
var _5b3=dojo.html.getBorderBox(node);
var _5b4=dojo.html.getMargin(node);
return {width:_5b3.width+_5b4.width,height:_5b3.height+_5b4.height};
};
dojo.html.setMarginBox=function(node,args){
node=dojo.byId(node);
var _5b7=0;
var _5b8=0;
var isbb=dojo.html.isBorderBox(node);
var _5ba=(!isbb?dojo.html.getPadBorder(node):{width:0,height:0});
var _5bb=dojo.html.getMargin(node);
var ret={};
if(typeof args.width!="undefined"){
_5b7=args.width-_5ba.width;
_5b7-=_5bb.width;
ret.width=dojo.html.setPositivePixelValue(node,"width",_5b7);
}
if(typeof args.height!="undefined"){
_5b8=args.height-_5ba.height;
_5b8-=_5bb.height;
ret.height=dojo.html.setPositivePixelValue(node,"height",_5b8);
}
return ret;
};
dojo.html.getElementBox=function(node,type){
var bs=dojo.html.boxSizing;
switch(type){
case bs.MARGIN_BOX:
return dojo.html.getMarginBox(node);
case bs.BORDER_BOX:
return dojo.html.getBorderBox(node);
case bs.PADDING_BOX:
return dojo.html.getPaddingBox(node);
case bs.CONTENT_BOX:
default:
return dojo.html.getContentBox(node);
}
};
dojo.html.toCoordinateObject=dojo.html.toCoordinateArray=function(_5c0,_5c1,_5c2){
if(_5c0 instanceof Array||typeof _5c0=="array"){
dojo.deprecated("dojo.html.toCoordinateArray","use dojo.html.toCoordinateObject({left: , top: , width: , height: }) instead","0.5");
while(_5c0.length<4){
_5c0.push(0);
}
while(_5c0.length>4){
_5c0.pop();
}
var ret={left:_5c0[0],top:_5c0[1],width:_5c0[2],height:_5c0[3]};
}else{
if(!_5c0.nodeType&&!(_5c0 instanceof String||typeof _5c0=="string")&&("width" in _5c0||"height" in _5c0||"left" in _5c0||"x" in _5c0||"top" in _5c0||"y" in _5c0)){
var ret={left:_5c0.left||_5c0.x||0,top:_5c0.top||_5c0.y||0,width:_5c0.width||0,height:_5c0.height||0};
}else{
var node=dojo.byId(_5c0);
var pos=dojo.html.abs(node,_5c1,_5c2);
var _5c6=dojo.html.getMarginBox(node);
var ret={left:pos.left,top:pos.top,width:_5c6.width,height:_5c6.height};
}
}
ret.x=ret.left;
ret.y=ret.top;
return ret;
};
dojo.html.setMarginBoxWidth=dojo.html.setOuterWidth=function(node,_5c8){
return dojo.html._callDeprecated("setMarginBoxWidth","setMarginBox",arguments,"width");
};
dojo.html.setMarginBoxHeight=dojo.html.setOuterHeight=function(){
return dojo.html._callDeprecated("setMarginBoxHeight","setMarginBox",arguments,"height");
};
dojo.html.getMarginBoxWidth=dojo.html.getOuterWidth=function(){
return dojo.html._callDeprecated("getMarginBoxWidth","getMarginBox",arguments,null,"width");
};
dojo.html.getMarginBoxHeight=dojo.html.getOuterHeight=function(){
return dojo.html._callDeprecated("getMarginBoxHeight","getMarginBox",arguments,null,"height");
};
dojo.html.getTotalOffset=function(node,type,_5cb){
return dojo.html._callDeprecated("getTotalOffset","getAbsolutePosition",arguments,null,type);
};
dojo.html.getAbsoluteX=function(node,_5cd){
return dojo.html._callDeprecated("getAbsoluteX","getAbsolutePosition",arguments,null,"x");
};
dojo.html.getAbsoluteY=function(node,_5cf){
return dojo.html._callDeprecated("getAbsoluteY","getAbsolutePosition",arguments,null,"y");
};
dojo.html.totalOffsetLeft=function(node,_5d1){
return dojo.html._callDeprecated("totalOffsetLeft","getAbsolutePosition",arguments,null,"left");
};
dojo.html.totalOffsetTop=function(node,_5d3){
return dojo.html._callDeprecated("totalOffsetTop","getAbsolutePosition",arguments,null,"top");
};
dojo.html.getMarginWidth=function(node){
return dojo.html._callDeprecated("getMarginWidth","getMargin",arguments,null,"width");
};
dojo.html.getMarginHeight=function(node){
return dojo.html._callDeprecated("getMarginHeight","getMargin",arguments,null,"height");
};
dojo.html.getBorderWidth=function(node){
return dojo.html._callDeprecated("getBorderWidth","getBorder",arguments,null,"width");
};
dojo.html.getBorderHeight=function(node){
return dojo.html._callDeprecated("getBorderHeight","getBorder",arguments,null,"height");
};
dojo.html.getPaddingWidth=function(node){
return dojo.html._callDeprecated("getPaddingWidth","getPadding",arguments,null,"width");
};
dojo.html.getPaddingHeight=function(node){
return dojo.html._callDeprecated("getPaddingHeight","getPadding",arguments,null,"height");
};
dojo.html.getPadBorderWidth=function(node){
return dojo.html._callDeprecated("getPadBorderWidth","getPadBorder",arguments,null,"width");
};
dojo.html.getPadBorderHeight=function(node){
return dojo.html._callDeprecated("getPadBorderHeight","getPadBorder",arguments,null,"height");
};
dojo.html.getBorderBoxWidth=dojo.html.getInnerWidth=function(){
return dojo.html._callDeprecated("getBorderBoxWidth","getBorderBox",arguments,null,"width");
};
dojo.html.getBorderBoxHeight=dojo.html.getInnerHeight=function(){
return dojo.html._callDeprecated("getBorderBoxHeight","getBorderBox",arguments,null,"height");
};
dojo.html.getContentBoxWidth=dojo.html.getContentWidth=function(){
return dojo.html._callDeprecated("getContentBoxWidth","getContentBox",arguments,null,"width");
};
dojo.html.getContentBoxHeight=dojo.html.getContentHeight=function(){
return dojo.html._callDeprecated("getContentBoxHeight","getContentBox",arguments,null,"height");
};
dojo.html.setContentBoxWidth=dojo.html.setContentWidth=function(node,_5dd){
return dojo.html._callDeprecated("setContentBoxWidth","setContentBox",arguments,"width");
};
dojo.html.setContentBoxHeight=dojo.html.setContentHeight=function(node,_5df){
return dojo.html._callDeprecated("setContentBoxHeight","setContentBox",arguments,"height");
};
dojo.provide("dojo.html.util");
dojo.html.getElementWindow=function(_5e0){
return dojo.html.getDocumentWindow(_5e0.ownerDocument);
};
dojo.html.getDocumentWindow=function(doc){
if(dojo.render.html.safari&&!doc._parentWindow){
var fix=function(win){
win.document._parentWindow=win;
for(var i=0;i<win.frames.length;i++){
fix(win.frames[i]);
}
};
fix(window.top);
}
if(dojo.render.html.ie&&window!==document.parentWindow&&!doc._parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc._parentWindow||doc.parentWindow||doc.defaultView;
};
dojo.html.gravity=function(node,e){
node=dojo.byId(node);
var _5e8=dojo.html.getCursorPosition(e);
with(dojo.html){
var _5e9=getAbsolutePosition(node,true);
var bb=getBorderBox(node);
var _5eb=_5e9.x+(bb.width/2);
var _5ec=_5e9.y+(bb.height/2);
}
with(dojo.html.gravity){
return ((_5e8.x<_5eb?WEST:EAST)|(_5e8.y<_5ec?NORTH:SOUTH));
}
};
dojo.html.gravity.NORTH=1;
dojo.html.gravity.SOUTH=1<<1;
dojo.html.gravity.EAST=1<<2;
dojo.html.gravity.WEST=1<<3;
dojo.html.overElement=function(_5ed,e){
_5ed=dojo.byId(_5ed);
var _5ef=dojo.html.getCursorPosition(e);
var bb=dojo.html.getBorderBox(_5ed);
var _5f1=dojo.html.getAbsolutePosition(_5ed,true,dojo.html.boxSizing.BORDER_BOX);
var top=_5f1.y;
var _5f3=top+bb.height;
var left=_5f1.x;
var _5f5=left+bb.width;
return (_5ef.x>=left&&_5ef.x<=_5f5&&_5ef.y>=top&&_5ef.y<=_5f3);
};
dojo.html.renderedTextContent=function(node){
node=dojo.byId(node);
var _5f7="";
if(node==null){
return _5f7;
}
for(var i=0;i<node.childNodes.length;i++){
switch(node.childNodes[i].nodeType){
case 1:
case 5:
var _5f9="unknown";
try{
_5f9=dojo.html.getStyle(node.childNodes[i],"display");
}
catch(E){
}
switch(_5f9){
case "block":
case "list-item":
case "run-in":
case "table":
case "table-row-group":
case "table-header-group":
case "table-footer-group":
case "table-row":
case "table-column-group":
case "table-column":
case "table-cell":
case "table-caption":
_5f7+="\n";
_5f7+=dojo.html.renderedTextContent(node.childNodes[i]);
_5f7+="\n";
break;
case "none":
break;
default:
if(node.childNodes[i].tagName&&node.childNodes[i].tagName.toLowerCase()=="br"){
_5f7+="\n";
}else{
_5f7+=dojo.html.renderedTextContent(node.childNodes[i]);
}
break;
}
break;
case 3:
case 2:
case 4:
var text=node.childNodes[i].nodeValue;
var _5fb="unknown";
try{
_5fb=dojo.html.getStyle(node,"text-transform");
}
catch(E){
}
switch(_5fb){
case "capitalize":
var _5fc=text.split(" ");
for(var i=0;i<_5fc.length;i++){
_5fc[i]=_5fc[i].charAt(0).toUpperCase()+_5fc[i].substring(1);
}
text=_5fc.join(" ");
break;
case "uppercase":
text=text.toUpperCase();
break;
case "lowercase":
text=text.toLowerCase();
break;
default:
break;
}
switch(_5fb){
case "nowrap":
break;
case "pre-wrap":
break;
case "pre-line":
break;
case "pre":
break;
default:
text=text.replace(/\s+/," ");
if(/\s$/.test(_5f7)){
text.replace(/^\s/,"");
}
break;
}
_5f7+=text;
break;
default:
break;
}
}
return _5f7;
};
dojo.html.createNodesFromText=function(txt,trim){
if(trim){
txt=txt.replace(/^\s+|\s+$/g,"");
}
var tn=dojo.doc().createElement("div");
tn.style.visibility="hidden";
dojo.body().appendChild(tn);
var _600="none";
if((/^<t[dh][\s\r\n>]/i).test(txt.replace(/^\s+/))){
txt="<table><tbody><tr>"+txt+"</tr></tbody></table>";
_600="cell";
}else{
if((/^<tr[\s\r\n>]/i).test(txt.replace(/^\s+/))){
txt="<table><tbody>"+txt+"</tbody></table>";
_600="row";
}else{
if((/^<(thead|tbody|tfoot)[\s\r\n>]/i).test(txt.replace(/^\s+/))){
txt="<table>"+txt+"</table>";
_600="section";
}
}
}
tn.innerHTML=txt;
if(tn["normalize"]){
tn.normalize();
}
var _601=null;
switch(_600){
case "cell":
_601=tn.getElementsByTagName("tr")[0];
break;
case "row":
_601=tn.getElementsByTagName("tbody")[0];
break;
case "section":
_601=tn.getElementsByTagName("table")[0];
break;
default:
_601=tn;
break;
}
var _602=[];
for(var x=0;x<_601.childNodes.length;x++){
_602.push(_601.childNodes[x].cloneNode(true));
}
tn.style.display="none";
dojo.html.destroyNode(tn);
return _602;
};
dojo.html.placeOnScreen=function(node,_605,_606,_607,_608,_609,_60a){
if(_605 instanceof Array||typeof _605=="array"){
_60a=_609;
_609=_608;
_608=_607;
_607=_606;
_606=_605[1];
_605=_605[0];
}
if(_609 instanceof String||typeof _609=="string"){
_609=_609.split(",");
}
if(!isNaN(_607)){
_607=[Number(_607),Number(_607)];
}else{
if(!(_607 instanceof Array||typeof _607=="array")){
_607=[0,0];
}
}
var _60b=dojo.html.getScroll().offset;
var view=dojo.html.getViewport();
node=dojo.byId(node);
var _60d=node.style.display;
node.style.display="";
var bb=dojo.html.getBorderBox(node);
var w=bb.width;
var h=bb.height;
node.style.display=_60d;
if(!(_609 instanceof Array||typeof _609=="array")){
_609=["TL"];
}
var _611,_612,_613=Infinity,_614;
for(var _615=0;_615<_609.length;++_615){
var _616=_609[_615];
var _617=true;
var tryX=_605-(_616.charAt(1)=="L"?0:w)+_607[0]*(_616.charAt(1)=="L"?1:-1);
var tryY=_606-(_616.charAt(0)=="T"?0:h)+_607[1]*(_616.charAt(0)=="T"?1:-1);
if(_608){
tryX-=_60b.x;
tryY-=_60b.y;
}
if(tryX<0){
tryX=0;
_617=false;
}
if(tryY<0){
tryY=0;
_617=false;
}
var x=tryX+w;
if(x>view.width){
x=view.width-w;
_617=false;
}else{
x=tryX;
}
x=Math.max(_607[0],x)+_60b.x;
var y=tryY+h;
if(y>view.height){
y=view.height-h;
_617=false;
}else{
y=tryY;
}
y=Math.max(_607[1],y)+_60b.y;
if(_617){
_611=x;
_612=y;
_613=0;
_614=_616;
break;
}else{
var dist=Math.pow(x-tryX-_60b.x,2)+Math.pow(y-tryY-_60b.y,2);
if(_613>dist){
_613=dist;
_611=x;
_612=y;
_614=_616;
}
}
}
if(!_60a){
node.style.left=_611+"px";
node.style.top=_612+"px";
}
return {left:_611,top:_612,x:_611,y:_612,dist:_613,corner:_614};
};
dojo.html.placeOnScreenPoint=function(node,_61e,_61f,_620,_621){
dojo.deprecated("dojo.html.placeOnScreenPoint","use dojo.html.placeOnScreen() instead","0.5");
return dojo.html.placeOnScreen(node,_61e,_61f,_620,_621,["TL","TR","BL","BR"]);
};
dojo.html.placeOnScreenAroundElement=function(node,_623,_624,_625,_626,_627){
var best,_629=Infinity;
_623=dojo.byId(_623);
var _62a=_623.style.display;
_623.style.display="";
var mb=dojo.html.getElementBox(_623,_625);
var _62c=mb.width;
var _62d=mb.height;
var _62e=dojo.html.getAbsolutePosition(_623,true,_625);
_623.style.display=_62a;
for(var _62f in _626){
var pos,_631,_632;
var _633=_626[_62f];
_631=_62e.x+(_62f.charAt(1)=="L"?0:_62c);
_632=_62e.y+(_62f.charAt(0)=="T"?0:_62d);
pos=dojo.html.placeOnScreen(node,_631,_632,_624,true,_633,true);
if(pos.dist==0){
best=pos;
break;
}else{
if(_629>pos.dist){
_629=pos.dist;
best=pos;
}
}
}
if(!_627){
node.style.left=best.left+"px";
node.style.top=best.top+"px";
}
return best;
};
dojo.html.scrollIntoView=function(node){
if(!node){
return;
}
if(dojo.render.html.ie){
if(dojo.html.getBorderBox(node.parentNode).height<=node.parentNode.scrollHeight){
node.scrollIntoView(false);
}
}else{
if(dojo.render.html.mozilla){
node.scrollIntoView(false);
}else{
var _635=node.parentNode;
var _636=_635.scrollTop+dojo.html.getBorderBox(_635).height;
var _637=node.offsetTop+dojo.html.getMarginBox(node).height;
if(_636<_637){
_635.scrollTop+=(_637-_636);
}else{
if(_635.scrollTop>node.offsetTop){
_635.scrollTop-=(_635.scrollTop-node.offsetTop);
}
}
}
}
};
dojo.provide("dojo.gfx.color");
dojo.gfx.color.Color=function(r,g,b,a){
if(dojo.lang.isArray(r)){
this.r=r[0];
this.g=r[1];
this.b=r[2];
this.a=r[3]||1;
}else{
if(dojo.lang.isString(r)){
var rgb=dojo.gfx.color.extractRGB(r);
this.r=rgb[0];
this.g=rgb[1];
this.b=rgb[2];
this.a=g||1;
}else{
if(r instanceof dojo.gfx.color.Color){
this.r=r.r;
this.b=r.b;
this.g=r.g;
this.a=r.a;
}else{
this.r=r;
this.g=g;
this.b=b;
this.a=a;
}
}
}
};
dojo.gfx.color.Color.fromArray=function(arr){
return new dojo.gfx.color.Color(arr[0],arr[1],arr[2],arr[3]);
};
dojo.extend(dojo.gfx.color.Color,{toRgb:function(_63e){
if(_63e){
return this.toRgba();
}else{
return [this.r,this.g,this.b];
}
},toRgba:function(){
return [this.r,this.g,this.b,this.a];
},toHex:function(){
return dojo.gfx.color.rgb2hex(this.toRgb());
},toCss:function(){
return "rgb("+this.toRgb().join()+")";
},toString:function(){
return this.toHex();
},blend:function(_63f,_640){
var rgb=null;
if(dojo.lang.isArray(_63f)){
rgb=_63f;
}else{
if(_63f instanceof dojo.gfx.color.Color){
rgb=_63f.toRgb();
}else{
rgb=new dojo.gfx.color.Color(_63f).toRgb();
}
}
return dojo.gfx.color.blend(this.toRgb(),rgb,_640);
}});
dojo.gfx.color.named={white:[255,255,255],black:[0,0,0],red:[255,0,0],green:[0,255,0],lime:[0,255,0],blue:[0,0,255],navy:[0,0,128],gray:[128,128,128],silver:[192,192,192]};
dojo.gfx.color.blend=function(a,b,_644){
if(typeof a=="string"){
return dojo.gfx.color.blendHex(a,b,_644);
}
if(!_644){
_644=0;
}
_644=Math.min(Math.max(-1,_644),1);
_644=((_644+1)/2);
var c=[];
for(var x=0;x<3;x++){
c[x]=parseInt(b[x]+((a[x]-b[x])*_644));
}
return c;
};
dojo.gfx.color.blendHex=function(a,b,_649){
return dojo.gfx.color.rgb2hex(dojo.gfx.color.blend(dojo.gfx.color.hex2rgb(a),dojo.gfx.color.hex2rgb(b),_649));
};
dojo.gfx.color.extractRGB=function(_64a){
var hex="0123456789abcdef";
_64a=_64a.toLowerCase();
if(_64a.indexOf("rgb")==0){
var _64c=_64a.match(/rgba*\((\d+), *(\d+), *(\d+)/i);
var ret=_64c.splice(1,3);
return ret;
}else{
var _64e=dojo.gfx.color.hex2rgb(_64a);
if(_64e){
return _64e;
}else{
return dojo.gfx.color.named[_64a]||[255,255,255];
}
}
};
dojo.gfx.color.hex2rgb=function(hex){
var _650="0123456789ABCDEF";
var rgb=new Array(3);
if(hex.indexOf("#")==0){
hex=hex.substring(1);
}
hex=hex.toUpperCase();
if(hex.replace(new RegExp("["+_650+"]","g"),"")!=""){
return null;
}
if(hex.length==3){
rgb[0]=hex.charAt(0)+hex.charAt(0);
rgb[1]=hex.charAt(1)+hex.charAt(1);
rgb[2]=hex.charAt(2)+hex.charAt(2);
}else{
rgb[0]=hex.substring(0,2);
rgb[1]=hex.substring(2,4);
rgb[2]=hex.substring(4);
}
for(var i=0;i<rgb.length;i++){
rgb[i]=_650.indexOf(rgb[i].charAt(0))*16+_650.indexOf(rgb[i].charAt(1));
}
return rgb;
};
dojo.gfx.color.rgb2hex=function(r,g,b){
if(dojo.lang.isArray(r)){
g=r[1]||0;
b=r[2]||0;
r=r[0]||0;
}
var ret=dojo.lang.map([r,g,b],function(x){
x=new Number(x);
var s=x.toString(16);
while(s.length<2){
s="0"+s;
}
return s;
});
ret.unshift("#");
return ret.join("");
};
dojo.provide("dojo.lfx.Animation");
dojo.lfx.Line=function(_659,end){
this.start=_659;
this.end=end;
if(dojo.lang.isArray(_659)){
var diff=[];
dojo.lang.forEach(this.start,function(s,i){
diff[i]=this.end[i]-s;
},this);
this.getValue=function(n){
var res=[];
dojo.lang.forEach(this.start,function(s,i){
res[i]=(diff[i]*n)+s;
},this);
return res;
};
}else{
var diff=end-_659;
this.getValue=function(n){
return (diff*n)+this.start;
};
}
};
if((dojo.render.html.khtml)&&(!dojo.render.html.safari)){
dojo.lfx.easeDefault=function(n){
return (parseFloat("0.5")+((Math.sin((n+parseFloat("1.5"))*Math.PI))/2));
};
}else{
dojo.lfx.easeDefault=function(n){
return (0.5+((Math.sin((n+1.5)*Math.PI))/2));
};
}
dojo.lfx.easeIn=function(n){
return Math.pow(n,3);
};
dojo.lfx.easeOut=function(n){
return (1-Math.pow(1-n,3));
};
dojo.lfx.easeInOut=function(n){
return ((3*Math.pow(n,2))-(2*Math.pow(n,3)));
};
dojo.lfx.IAnimation=function(){
};
dojo.lang.extend(dojo.lfx.IAnimation,{curve:null,duration:1000,easing:null,repeatCount:0,rate:10,handler:null,beforeBegin:null,onBegin:null,onAnimate:null,onEnd:null,onPlay:null,onPause:null,onStop:null,play:null,pause:null,stop:null,connect:function(evt,_669,_66a){
if(!_66a){
_66a=_669;
_669=this;
}
_66a=dojo.lang.hitch(_669,_66a);
var _66b=this[evt]||function(){
};
this[evt]=function(){
var ret=_66b.apply(this,arguments);
_66a.apply(this,arguments);
return ret;
};
return this;
},fire:function(evt,args){
if(this[evt]){
this[evt].apply(this,(args||[]));
}
return this;
},repeat:function(_66f){
this.repeatCount=_66f;
return this;
},_active:false,_paused:false});
dojo.lfx.Animation=function(_670,_671,_672,_673,_674,rate){
dojo.lfx.IAnimation.call(this);
if(dojo.lang.isNumber(_670)||(!_670&&_671.getValue)){
rate=_674;
_674=_673;
_673=_672;
_672=_671;
_671=_670;
_670=null;
}else{
if(_670.getValue||dojo.lang.isArray(_670)){
rate=_673;
_674=_672;
_673=_671;
_672=_670;
_671=null;
_670=null;
}
}
if(dojo.lang.isArray(_672)){
this.curve=new dojo.lfx.Line(_672[0],_672[1]);
}else{
this.curve=_672;
}
if(_671!=null&&_671>0){
this.duration=_671;
}
if(_674){
this.repeatCount=_674;
}
if(rate){
this.rate=rate;
}
if(_670){
dojo.lang.forEach(["handler","beforeBegin","onBegin","onEnd","onPlay","onStop","onAnimate"],function(item){
if(_670[item]){
this.connect(item,_670[item]);
}
},this);
}
if(_673&&dojo.lang.isFunction(_673)){
this.easing=_673;
}
};
dojo.inherits(dojo.lfx.Animation,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Animation,{_startTime:null,_endTime:null,_timer:null,_percent:0,_startRepeatCount:0,play:function(_677,_678){
if(_678){
clearTimeout(this._timer);
this._active=false;
this._paused=false;
this._percent=0;
}else{
if(this._active&&!this._paused){
return this;
}
}
this.fire("handler",["beforeBegin"]);
this.fire("beforeBegin");
if(_677>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_678);
}),_677);
return this;
}
this._startTime=new Date().valueOf();
if(this._paused){
this._startTime-=(this.duration*this._percent/100);
}
this._endTime=this._startTime+this.duration;
this._active=true;
this._paused=false;
var step=this._percent/100;
var _67a=this.curve.getValue(step);
if(this._percent==0){
if(!this._startRepeatCount){
this._startRepeatCount=this.repeatCount;
}
this.fire("handler",["begin",_67a]);
this.fire("onBegin",[_67a]);
}
this.fire("handler",["play",_67a]);
this.fire("onPlay",[_67a]);
this._cycle();
return this;
},pause:function(){
clearTimeout(this._timer);
if(!this._active){
return this;
}
this._paused=true;
var _67b=this.curve.getValue(this._percent/100);
this.fire("handler",["pause",_67b]);
this.fire("onPause",[_67b]);
return this;
},gotoPercent:function(pct,_67d){
clearTimeout(this._timer);
this._active=true;
this._paused=true;
this._percent=pct;
if(_67d){
this.play();
}
return this;
},stop:function(_67e){
clearTimeout(this._timer);
var step=this._percent/100;
if(_67e){
step=1;
}
var _680=this.curve.getValue(step);
this.fire("handler",["stop",_680]);
this.fire("onStop",[_680]);
this._active=false;
this._paused=false;
return this;
},status:function(){
if(this._active){
return this._paused?"paused":"playing";
}else{
return "stopped";
}
return this;
},_cycle:function(){
clearTimeout(this._timer);
if(this._active){
var curr=new Date().valueOf();
var step=(curr-this._startTime)/(this._endTime-this._startTime);
if(step>=1){
step=1;
this._percent=100;
}else{
this._percent=step*100;
}
if((this.easing)&&(dojo.lang.isFunction(this.easing))){
step=this.easing(step);
}
var _683=this.curve.getValue(step);
this.fire("handler",["animate",_683]);
this.fire("onAnimate",[_683]);
if(step<1){
this._timer=setTimeout(dojo.lang.hitch(this,"_cycle"),this.rate);
}else{
this._active=false;
this.fire("handler",["end"]);
this.fire("onEnd");
if(this.repeatCount>0){
this.repeatCount--;
this.play(null,true);
}else{
if(this.repeatCount==-1){
this.play(null,true);
}else{
if(this._startRepeatCount){
this.repeatCount=this._startRepeatCount;
this._startRepeatCount=0;
}
}
}
}
}
return this;
}});
dojo.lfx.Combine=function(_684){
dojo.lfx.IAnimation.call(this);
this._anims=[];
this._animsEnded=0;
var _685=arguments;
if(_685.length==1&&(dojo.lang.isArray(_685[0])||dojo.lang.isArrayLike(_685[0]))){
_685=_685[0];
}
dojo.lang.forEach(_685,function(anim){
this._anims.push(anim);
anim.connect("onEnd",dojo.lang.hitch(this,"_onAnimsEnded"));
},this);
};
dojo.inherits(dojo.lfx.Combine,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Combine,{_animsEnded:0,play:function(_687,_688){
if(!this._anims.length){
return this;
}
this.fire("beforeBegin");
if(_687>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_688);
}),_687);
return this;
}
if(_688||this._anims[0].percent==0){
this.fire("onBegin");
}
this.fire("onPlay");
this._animsCall("play",null,_688);
return this;
},pause:function(){
this.fire("onPause");
this._animsCall("pause");
return this;
},stop:function(_689){
this.fire("onStop");
this._animsCall("stop",_689);
return this;
},_onAnimsEnded:function(){
this._animsEnded++;
if(this._animsEnded>=this._anims.length){
this.fire("onEnd");
}
return this;
},_animsCall:function(_68a){
var args=[];
if(arguments.length>1){
for(var i=1;i<arguments.length;i++){
args.push(arguments[i]);
}
}
var _68d=this;
dojo.lang.forEach(this._anims,function(anim){
anim[_68a](args);
},_68d);
return this;
}});
dojo.lfx.Chain=function(_68f){
dojo.lfx.IAnimation.call(this);
this._anims=[];
this._currAnim=-1;
var _690=arguments;
if(_690.length==1&&(dojo.lang.isArray(_690[0])||dojo.lang.isArrayLike(_690[0]))){
_690=_690[0];
}
var _691=this;
dojo.lang.forEach(_690,function(anim,i,_694){
this._anims.push(anim);
if(i<_694.length-1){
anim.connect("onEnd",dojo.lang.hitch(this,"_playNext"));
}else{
anim.connect("onEnd",dojo.lang.hitch(this,function(){
this.fire("onEnd");
}));
}
},this);
};
dojo.inherits(dojo.lfx.Chain,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Chain,{_currAnim:-1,play:function(_695,_696){
if(!this._anims.length){
return this;
}
if(_696||!this._anims[this._currAnim]){
this._currAnim=0;
}
var _697=this._anims[this._currAnim];
this.fire("beforeBegin");
if(_695>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_696);
}),_695);
return this;
}
if(_697){
if(this._currAnim==0){
this.fire("handler",["begin",this._currAnim]);
this.fire("onBegin",[this._currAnim]);
}
this.fire("onPlay",[this._currAnim]);
_697.play(null,_696);
}
return this;
},pause:function(){
if(this._anims[this._currAnim]){
this._anims[this._currAnim].pause();
this.fire("onPause",[this._currAnim]);
}
return this;
},playPause:function(){
if(this._anims.length==0){
return this;
}
if(this._currAnim==-1){
this._currAnim=0;
}
var _698=this._anims[this._currAnim];
if(_698){
if(!_698._active||_698._paused){
this.play();
}else{
this.pause();
}
}
return this;
},stop:function(){
var _699=this._anims[this._currAnim];
if(_699){
_699.stop();
this.fire("onStop",[this._currAnim]);
}
return _699;
},_playNext:function(){
if(this._currAnim==-1||this._anims.length==0){
return this;
}
this._currAnim++;
if(this._anims[this._currAnim]){
this._anims[this._currAnim].play(null,true);
}
return this;
}});
dojo.lfx.combine=function(_69a){
var _69b=arguments;
if(dojo.lang.isArray(arguments[0])){
_69b=arguments[0];
}
if(_69b.length==1){
return _69b[0];
}
return new dojo.lfx.Combine(_69b);
};
dojo.lfx.chain=function(_69c){
var _69d=arguments;
if(dojo.lang.isArray(arguments[0])){
_69d=arguments[0];
}
if(_69d.length==1){
return _69d[0];
}
return new dojo.lfx.Chain(_69d);
};
dojo.provide("dojo.html.color");
dojo.html.getBackgroundColor=function(node){
node=dojo.byId(node);
var _69f;
do{
_69f=dojo.html.getStyle(node,"background-color");
if(_69f.toLowerCase()=="rgba(0, 0, 0, 0)"){
_69f="transparent";
}
if(node==document.getElementsByTagName("body")[0]){
node=null;
break;
}
node=node.parentNode;
}while(node&&dojo.lang.inArray(["transparent",""],_69f));
if(_69f=="transparent"){
_69f=[255,255,255,0];
}else{
_69f=dojo.gfx.color.extractRGB(_69f);
}
return _69f;
};
dojo.provide("dojo.lfx.html");
dojo.lfx.html._byId=function(_6a0){
if(!_6a0){
return [];
}
if(dojo.lang.isArrayLike(_6a0)){
if(!_6a0.alreadyChecked){
var n=[];
dojo.lang.forEach(_6a0,function(node){
n.push(dojo.byId(node));
});
n.alreadyChecked=true;
return n;
}else{
return _6a0;
}
}else{
var n=[];
n.push(dojo.byId(_6a0));
n.alreadyChecked=true;
return n;
}
};
dojo.lfx.html.propertyAnimation=function(_6a3,_6a4,_6a5,_6a6,_6a7){
_6a3=dojo.lfx.html._byId(_6a3);
var _6a8={"propertyMap":_6a4,"nodes":_6a3,"duration":_6a5,"easing":_6a6||dojo.lfx.easeDefault};
var _6a9=function(args){
if(args.nodes.length==1){
var pm=args.propertyMap;
if(!dojo.lang.isArray(args.propertyMap)){
var parr=[];
for(var _6ad in pm){
pm[_6ad].property=_6ad;
parr.push(pm[_6ad]);
}
pm=args.propertyMap=parr;
}
dojo.lang.forEach(pm,function(prop){
if(dj_undef("start",prop)){
if(prop.property!="opacity"){
prop.start=parseInt(dojo.html.getComputedStyle(args.nodes[0],prop.property));
}else{
prop.start=dojo.html.getOpacity(args.nodes[0]);
}
}
});
}
};
var _6af=function(_6b0){
var _6b1=[];
dojo.lang.forEach(_6b0,function(c){
_6b1.push(Math.round(c));
});
return _6b1;
};
var _6b3=function(n,_6b5){
n=dojo.byId(n);
if(!n||!n.style){
return;
}
for(var s in _6b5){
try{
if(s=="opacity"){
dojo.html.setOpacity(n,_6b5[s]);
}else{
n.style[s]=_6b5[s];
}
}
catch(e){
dojo.debug(e);
}
}
};
var _6b7=function(_6b8){
this._properties=_6b8;
this.diffs=new Array(_6b8.length);
dojo.lang.forEach(_6b8,function(prop,i){
if(dojo.lang.isFunction(prop.start)){
prop.start=prop.start(prop,i);
}
if(dojo.lang.isFunction(prop.end)){
prop.end=prop.end(prop,i);
}
if(dojo.lang.isArray(prop.start)){
this.diffs[i]=null;
}else{
if(prop.start instanceof dojo.gfx.color.Color){
prop.startRgb=prop.start.toRgb();
prop.endRgb=prop.end.toRgb();
}else{
this.diffs[i]=prop.end-prop.start;
}
}
},this);
this.getValue=function(n){
var ret={};
dojo.lang.forEach(this._properties,function(prop,i){
var _6bf=null;
if(dojo.lang.isArray(prop.start)){
}else{
if(prop.start instanceof dojo.gfx.color.Color){
_6bf=(prop.units||"rgb")+"(";
for(var j=0;j<prop.startRgb.length;j++){
_6bf+=Math.round(((prop.endRgb[j]-prop.startRgb[j])*n)+prop.startRgb[j])+(j<prop.startRgb.length-1?",":"");
}
_6bf+=")";
}else{
_6bf=((this.diffs[i])*n)+prop.start+(prop.property!="opacity"?prop.units||"px":"");
}
}
ret[dojo.html.toCamelCase(prop.property)]=_6bf;
},this);
return ret;
};
};
var anim=new dojo.lfx.Animation({beforeBegin:function(){
_6a9(_6a8);
anim.curve=new _6b7(_6a8.propertyMap);
},onAnimate:function(_6c2){
dojo.lang.forEach(_6a8.nodes,function(node){
_6b3(node,_6c2);
});
}},_6a8.duration,null,_6a8.easing);
if(_6a7){
for(var x in _6a7){
if(dojo.lang.isFunction(_6a7[x])){
anim.connect(x,anim,_6a7[x]);
}
}
}
return anim;
};
dojo.lfx.html._makeFadeable=function(_6c5){
var _6c6=function(node){
if(dojo.render.html.ie){
if((node.style.zoom.length==0)&&(dojo.html.getStyle(node,"zoom")=="normal")){
node.style.zoom="1";
}
if((node.style.width.length==0)&&(dojo.html.getStyle(node,"width")=="auto")){
node.style.width="auto";
}
}
};
if(dojo.lang.isArrayLike(_6c5)){
dojo.lang.forEach(_6c5,_6c6);
}else{
_6c6(_6c5);
}
};
dojo.lfx.html.fade=function(_6c8,_6c9,_6ca,_6cb,_6cc){
_6c8=dojo.lfx.html._byId(_6c8);
var _6cd={property:"opacity"};
if(!dj_undef("start",_6c9)){
_6cd.start=_6c9.start;
}else{
_6cd.start=function(){
return dojo.html.getOpacity(_6c8[0]);
};
}
if(!dj_undef("end",_6c9)){
_6cd.end=_6c9.end;
}else{
dojo.raise("dojo.lfx.html.fade needs an end value");
}
var anim=dojo.lfx.propertyAnimation(_6c8,[_6cd],_6ca,_6cb);
anim.connect("beforeBegin",function(){
dojo.lfx.html._makeFadeable(_6c8);
});
if(_6cc){
anim.connect("onEnd",function(){
_6cc(_6c8,anim);
});
}
return anim;
};
dojo.lfx.html.fadeIn=function(_6cf,_6d0,_6d1,_6d2){
return dojo.lfx.html.fade(_6cf,{end:1},_6d0,_6d1,_6d2);
};
dojo.lfx.html.fadeOut=function(_6d3,_6d4,_6d5,_6d6){
return dojo.lfx.html.fade(_6d3,{end:0},_6d4,_6d5,_6d6);
};
dojo.lfx.html.fadeShow=function(_6d7,_6d8,_6d9,_6da){
_6d7=dojo.lfx.html._byId(_6d7);
dojo.lang.forEach(_6d7,function(node){
dojo.html.setOpacity(node,0);
});
var anim=dojo.lfx.html.fadeIn(_6d7,_6d8,_6d9,_6da);
anim.connect("beforeBegin",function(){
if(dojo.lang.isArrayLike(_6d7)){
dojo.lang.forEach(_6d7,dojo.html.show);
}else{
dojo.html.show(_6d7);
}
});
return anim;
};
dojo.lfx.html.fadeHide=function(_6dd,_6de,_6df,_6e0){
var anim=dojo.lfx.html.fadeOut(_6dd,_6de,_6df,function(){
if(dojo.lang.isArrayLike(_6dd)){
dojo.lang.forEach(_6dd,dojo.html.hide);
}else{
dojo.html.hide(_6dd);
}
if(_6e0){
_6e0(_6dd,anim);
}
});
return anim;
};
dojo.lfx.html.wipeIn=function(_6e2,_6e3,_6e4,_6e5){
_6e2=dojo.lfx.html._byId(_6e2);
var _6e6=[];
dojo.lang.forEach(_6e2,function(node){
var _6e8={};
var _6e9,_6ea,_6eb;
with(node.style){
_6e9=top;
_6ea=left;
_6eb=position;
top="-9999px";
left="-9999px";
position="absolute";
display="";
}
var _6ec=dojo.html.getBorderBox(node).height;
with(node.style){
top=_6e9;
left=_6ea;
position=_6eb;
display="none";
}
var anim=dojo.lfx.propertyAnimation(node,{"height":{start:1,end:function(){
return _6ec;
}}},_6e3,_6e4);
anim.connect("beforeBegin",function(){
_6e8.overflow=node.style.overflow;
_6e8.height=node.style.height;
with(node.style){
overflow="hidden";
height="1px";
}
dojo.html.show(node);
});
anim.connect("onEnd",function(){
with(node.style){
overflow=_6e8.overflow;
height=_6e8.height;
}
if(_6e5){
_6e5(node,anim);
}
});
_6e6.push(anim);
});
return dojo.lfx.combine(_6e6);
};
dojo.lfx.html.wipeOut=function(_6ee,_6ef,_6f0,_6f1){
_6ee=dojo.lfx.html._byId(_6ee);
var _6f2=[];
dojo.lang.forEach(_6ee,function(node){
var _6f4={};
var anim=dojo.lfx.propertyAnimation(node,{"height":{start:function(){
return dojo.html.getContentBox(node).height;
},end:1}},_6ef,_6f0,{"beforeBegin":function(){
_6f4.overflow=node.style.overflow;
_6f4.height=node.style.height;
with(node.style){
overflow="hidden";
}
dojo.html.show(node);
},"onEnd":function(){
dojo.html.hide(node);
with(node.style){
overflow=_6f4.overflow;
height=_6f4.height;
}
if(_6f1){
_6f1(node,anim);
}
}});
_6f2.push(anim);
});
return dojo.lfx.combine(_6f2);
};
dojo.lfx.html.slideTo=function(_6f6,_6f7,_6f8,_6f9,_6fa){
_6f6=dojo.lfx.html._byId(_6f6);
var _6fb=[];
var _6fc=dojo.html.getComputedStyle;
if(dojo.lang.isArray(_6f7)){
dojo.deprecated("dojo.lfx.html.slideTo(node, array)","use dojo.lfx.html.slideTo(node, {top: value, left: value});","0.5");
_6f7={top:_6f7[0],left:_6f7[1]};
}
dojo.lang.forEach(_6f6,function(node){
var top=null;
var left=null;
var init=(function(){
var _701=node;
return function(){
var pos=_6fc(_701,"position");
top=(pos=="absolute"?node.offsetTop:parseInt(_6fc(node,"top"))||0);
left=(pos=="absolute"?node.offsetLeft:parseInt(_6fc(node,"left"))||0);
if(!dojo.lang.inArray(["absolute","relative"],pos)){
var ret=dojo.html.abs(_701,true);
dojo.html.setStyleAttributes(_701,"position:absolute;top:"+ret.y+"px;left:"+ret.x+"px;");
top=ret.y;
left=ret.x;
}
};
})();
init();
var anim=dojo.lfx.propertyAnimation(node,{"top":{start:top,end:(_6f7.top||0)},"left":{start:left,end:(_6f7.left||0)}},_6f8,_6f9,{"beforeBegin":init});
if(_6fa){
anim.connect("onEnd",function(){
_6fa(_6f6,anim);
});
}
_6fb.push(anim);
});
return dojo.lfx.combine(_6fb);
};
dojo.lfx.html.slideBy=function(_705,_706,_707,_708,_709){
_705=dojo.lfx.html._byId(_705);
var _70a=[];
var _70b=dojo.html.getComputedStyle;
if(dojo.lang.isArray(_706)){
dojo.deprecated("dojo.lfx.html.slideBy(node, array)","use dojo.lfx.html.slideBy(node, {top: value, left: value});","0.5");
_706={top:_706[0],left:_706[1]};
}
dojo.lang.forEach(_705,function(node){
var top=null;
var left=null;
var init=(function(){
var _710=node;
return function(){
var pos=_70b(_710,"position");
top=(pos=="absolute"?node.offsetTop:parseInt(_70b(node,"top"))||0);
left=(pos=="absolute"?node.offsetLeft:parseInt(_70b(node,"left"))||0);
if(!dojo.lang.inArray(["absolute","relative"],pos)){
var ret=dojo.html.abs(_710,true);
dojo.html.setStyleAttributes(_710,"position:absolute;top:"+ret.y+"px;left:"+ret.x+"px;");
top=ret.y;
left=ret.x;
}
};
})();
init();
var anim=dojo.lfx.propertyAnimation(node,{"top":{start:top,end:top+(_706.top||0)},"left":{start:left,end:left+(_706.left||0)}},_707,_708).connect("beforeBegin",init);
if(_709){
anim.connect("onEnd",function(){
_709(_705,anim);
});
}
_70a.push(anim);
});
return dojo.lfx.combine(_70a);
};
dojo.lfx.html.explode=function(_714,_715,_716,_717,_718){
var h=dojo.html;
_714=dojo.byId(_714);
_715=dojo.byId(_715);
var _71a=h.toCoordinateObject(_714,true);
var _71b=document.createElement("div");
h.copyStyle(_71b,_715);
if(_715.explodeClassName){
_71b.className=_715.explodeClassName;
}
with(_71b.style){
position="absolute";
display="none";
var _71c=h.getStyle(_714,"background-color");
backgroundColor=_71c?_71c.toLowerCase():"transparent";
backgroundColor=(backgroundColor=="transparent")?"rgb(221, 221, 221)":backgroundColor;
}
dojo.body().appendChild(_71b);
with(_715.style){
visibility="hidden";
display="block";
}
var _71d=h.toCoordinateObject(_715,true);
with(_715.style){
display="none";
visibility="visible";
}
var _71e={opacity:{start:0.5,end:1}};
dojo.lang.forEach(["height","width","top","left"],function(type){
_71e[type]={start:_71a[type],end:_71d[type]};
});
var anim=new dojo.lfx.propertyAnimation(_71b,_71e,_716,_717,{"beforeBegin":function(){
h.setDisplay(_71b,"block");
},"onEnd":function(){
h.setDisplay(_715,"block");
_71b.parentNode.removeChild(_71b);
}});
if(_718){
anim.connect("onEnd",function(){
_718(_715,anim);
});
}
return anim;
};
dojo.lfx.html.implode=function(_721,end,_723,_724,_725){
var h=dojo.html;
_721=dojo.byId(_721);
end=dojo.byId(end);
var _727=dojo.html.toCoordinateObject(_721,true);
var _728=dojo.html.toCoordinateObject(end,true);
var _729=document.createElement("div");
dojo.html.copyStyle(_729,_721);
if(_721.explodeClassName){
_729.className=_721.explodeClassName;
}
dojo.html.setOpacity(_729,0.3);
with(_729.style){
position="absolute";
display="none";
backgroundColor=h.getStyle(_721,"background-color").toLowerCase();
}
dojo.body().appendChild(_729);
var _72a={opacity:{start:1,end:0.5}};
dojo.lang.forEach(["height","width","top","left"],function(type){
_72a[type]={start:_727[type],end:_728[type]};
});
var anim=new dojo.lfx.propertyAnimation(_729,_72a,_723,_724,{"beforeBegin":function(){
dojo.html.hide(_721);
dojo.html.show(_729);
},"onEnd":function(){
_729.parentNode.removeChild(_729);
}});
if(_725){
anim.connect("onEnd",function(){
_725(_721,anim);
});
}
return anim;
};
dojo.lfx.html.highlight=function(_72d,_72e,_72f,_730,_731){
_72d=dojo.lfx.html._byId(_72d);
var _732=[];
dojo.lang.forEach(_72d,function(node){
var _734=dojo.html.getBackgroundColor(node);
var bg=dojo.html.getStyle(node,"background-color").toLowerCase();
var _736=dojo.html.getStyle(node,"background-image");
var _737=(bg=="transparent"||bg=="rgba(0, 0, 0, 0)");
while(_734.length>3){
_734.pop();
}
var rgb=new dojo.gfx.color.Color(_72e);
var _739=new dojo.gfx.color.Color(_734);
var anim=dojo.lfx.propertyAnimation(node,{"background-color":{start:rgb,end:_739}},_72f,_730,{"beforeBegin":function(){
if(_736){
node.style.backgroundImage="none";
}
node.style.backgroundColor="rgb("+rgb.toRgb().join(",")+")";
},"onEnd":function(){
if(_736){
node.style.backgroundImage=_736;
}
if(_737){
node.style.backgroundColor="transparent";
}
if(_731){
_731(node,anim);
}
}});
_732.push(anim);
});
return dojo.lfx.combine(_732);
};
dojo.lfx.html.unhighlight=function(_73b,_73c,_73d,_73e,_73f){
_73b=dojo.lfx.html._byId(_73b);
var _740=[];
dojo.lang.forEach(_73b,function(node){
var _742=new dojo.gfx.color.Color(dojo.html.getBackgroundColor(node));
var rgb=new dojo.gfx.color.Color(_73c);
var _744=dojo.html.getStyle(node,"background-image");
var anim=dojo.lfx.propertyAnimation(node,{"background-color":{start:_742,end:rgb}},_73d,_73e,{"beforeBegin":function(){
if(_744){
node.style.backgroundImage="none";
}
node.style.backgroundColor="rgb("+_742.toRgb().join(",")+")";
},"onEnd":function(){
if(_73f){
_73f(node,anim);
}
}});
_740.push(anim);
});
return dojo.lfx.combine(_740);
};
dojo.lang.mixin(dojo.lfx,dojo.lfx.html);
dojo.kwCompoundRequire({browser:["dojo.lfx.html"],dashboard:["dojo.lfx.html"]});
dojo.provide("dojo.lfx.*");
dojo.provide("dojo.lfx.toggle");
dojo.lfx.toggle.plain={show:function(node,_747,_748,_749){
dojo.html.show(node);
if(dojo.lang.isFunction(_749)){
_749();
}
},hide:function(node,_74b,_74c,_74d){
dojo.html.hide(node);
if(dojo.lang.isFunction(_74d)){
_74d();
}
}};
dojo.lfx.toggle.fade={show:function(node,_74f,_750,_751){
dojo.lfx.fadeShow(node,_74f,_750,_751).play();
},hide:function(node,_753,_754,_755){
dojo.lfx.fadeHide(node,_753,_754,_755).play();
}};
dojo.lfx.toggle.wipe={show:function(node,_757,_758,_759){
dojo.lfx.wipeIn(node,_757,_758,_759).play();
},hide:function(node,_75b,_75c,_75d){
dojo.lfx.wipeOut(node,_75b,_75c,_75d).play();
}};
dojo.lfx.toggle.explode={show:function(node,_75f,_760,_761,_762){
dojo.lfx.explode(_762||{x:0,y:0,width:0,height:0},node,_75f,_760,_761).play();
},hide:function(node,_764,_765,_766,_767){
dojo.lfx.implode(node,_767||{x:0,y:0,width:0,height:0},_764,_765,_766).play();
}};
dojo.provide("dojo.widget.HtmlWidget");
dojo.declare("dojo.widget.HtmlWidget",dojo.widget.DomWidget,{templateCssPath:null,templatePath:null,lang:"",toggle:"plain",toggleDuration:150,initialize:function(args,frag){
},postMixInProperties:function(args,frag){
if(this.lang===""){
this.lang=null;
}
this.toggleObj=dojo.lfx.toggle[this.toggle.toLowerCase()]||dojo.lfx.toggle.plain;
},createNodesFromText:function(txt,wrap){
return dojo.html.createNodesFromText(txt,wrap);
},destroyRendering:function(_76e){
try{
if(this.bgIframe){
this.bgIframe.remove();
delete this.bgIframe;
}
if(!_76e&&this.domNode){
dojo.event.browser.clean(this.domNode);
}
dojo.widget.HtmlWidget.superclass.destroyRendering.call(this);
}
catch(e){
}
},isShowing:function(){
return dojo.html.isShowing(this.domNode);
},toggleShowing:function(){
if(this.isShowing()){
this.hide();
}else{
this.show();
}
},show:function(){
if(this.isShowing()){
return;
}
this.animationInProgress=true;
this.toggleObj.show(this.domNode,this.toggleDuration,null,dojo.lang.hitch(this,this.onShow),this.explodeSrc);
},onShow:function(){
this.animationInProgress=false;
this.checkSize();
},hide:function(){
if(!this.isShowing()){
return;
}
this.animationInProgress=true;
this.toggleObj.hide(this.domNode,this.toggleDuration,null,dojo.lang.hitch(this,this.onHide),this.explodeSrc);
},onHide:function(){
this.animationInProgress=false;
},_isResized:function(w,h){
if(!this.isShowing()){
return false;
}
var wh=dojo.html.getMarginBox(this.domNode);
var _772=w||wh.width;
var _773=h||wh.height;
if(this.width==_772&&this.height==_773){
return false;
}
this.width=_772;
this.height=_773;
return true;
},checkSize:function(){
if(!this._isResized()){
return;
}
this.onResized();
},resizeTo:function(w,h){
dojo.html.setMarginBox(this.domNode,{width:w,height:h});
if(this.isShowing()){
this.onResized();
}
},resizeSoon:function(){
if(this.isShowing()){
dojo.lang.setTimeout(this,this.onResized,0);
}
},onResized:function(){
dojo.lang.forEach(this.children,function(_776){
if(_776.checkSize){
_776.checkSize();
}
});
}});
dojo.kwCompoundRequire({common:["dojo.xml.Parse","dojo.widget.Widget","dojo.widget.Parse","dojo.widget.Manager"],browser:["dojo.widget.DomWidget","dojo.widget.HtmlWidget"],dashboard:["dojo.widget.DomWidget","dojo.widget.HtmlWidget"],svg:["dojo.widget.SvgWidget"],rhino:["dojo.widget.SwtWidget"]});
dojo.provide("dojo.widget.*");
dojo.provide("dojo.string.common");
dojo.string.trim=function(str,wh){
if(!str.replace){
return str;
}
if(!str.length){
return str;
}
var re=(wh>0)?(/^\s+/):(wh<0)?(/\s+$/):(/^\s+|\s+$/g);
return str.replace(re,"");
};
dojo.string.trimStart=function(str){
return dojo.string.trim(str,1);
};
dojo.string.trimEnd=function(str){
return dojo.string.trim(str,-1);
};
dojo.string.repeat=function(str,_77d,_77e){
var out="";
for(var i=0;i<_77d;i++){
out+=str;
if(_77e&&i<_77d-1){
out+=_77e;
}
}
return out;
};
dojo.string.pad=function(str,len,c,dir){
var out=String(str);
if(!c){
c="0";
}
if(!dir){
dir=1;
}
while(out.length<len){
if(dir>0){
out=c+out;
}else{
out+=c;
}
}
return out;
};
dojo.string.padLeft=function(str,len,c){
return dojo.string.pad(str,len,c,1);
};
dojo.string.padRight=function(str,len,c){
return dojo.string.pad(str,len,c,-1);
};
dojo.provide("dojo.string");
dojo.provide("dojo.io.common");
dojo.io.transports=[];
dojo.io.hdlrFuncNames=["load","error","timeout"];
dojo.io.Request=function(url,_78d,_78e,_78f){
if((arguments.length==1)&&(arguments[0].constructor==Object)){
this.fromKwArgs(arguments[0]);
}else{
this.url=url;
if(_78d){
this.mimetype=_78d;
}
if(_78e){
this.transport=_78e;
}
if(arguments.length>=4){
this.changeUrl=_78f;
}
}
};
dojo.lang.extend(dojo.io.Request,{url:"",mimetype:"text/plain",method:"GET",content:undefined,transport:undefined,changeUrl:undefined,formNode:undefined,sync:false,bindSuccess:false,useCache:false,preventCache:false,jsonFilter:function(_790){
if((this.mimetype=="text/json-comment-filtered")||(this.mimetype=="application/json-comment-filtered")){
var _791=_790.indexOf("/*");
var _792=_790.lastIndexOf("*/");
if((_791==-1)||(_792==-1)){
dojo.debug("your JSON wasn't comment filtered!");
return "";
}
return _790.substring(_791+2,_792);
}
dojo.debug("please consider using a mimetype of text/json-comment-filtered to avoid potential security issues with JSON endpoints");
return _790;
},load:function(type,data,_795,_796){
},error:function(type,_798,_799,_79a){
},timeout:function(type,_79c,_79d,_79e){
},handle:function(type,data,_7a1,_7a2){
},timeoutSeconds:0,abort:function(){
},fromKwArgs:function(_7a3){
if(_7a3["url"]){
_7a3.url=_7a3.url.toString();
}
if(_7a3["formNode"]){
_7a3.formNode=dojo.byId(_7a3.formNode);
}
if(!_7a3["method"]&&_7a3["formNode"]&&_7a3["formNode"].method){
_7a3.method=_7a3["formNode"].method;
}
if(!_7a3["handle"]&&_7a3["handler"]){
_7a3.handle=_7a3.handler;
}
if(!_7a3["load"]&&_7a3["loaded"]){
_7a3.load=_7a3.loaded;
}
if(!_7a3["changeUrl"]&&_7a3["changeURL"]){
_7a3.changeUrl=_7a3.changeURL;
}
_7a3.encoding=dojo.lang.firstValued(_7a3["encoding"],djConfig["bindEncoding"],"");
_7a3.sendTransport=dojo.lang.firstValued(_7a3["sendTransport"],djConfig["ioSendTransport"],false);
var _7a4=dojo.lang.isFunction;
for(var x=0;x<dojo.io.hdlrFuncNames.length;x++){
var fn=dojo.io.hdlrFuncNames[x];
if(_7a3[fn]&&_7a4(_7a3[fn])){
continue;
}
if(_7a3["handle"]&&_7a4(_7a3["handle"])){
_7a3[fn]=_7a3.handle;
}
}
dojo.lang.mixin(this,_7a3);
}});
dojo.io.Error=function(msg,type,num){
this.message=msg;
this.type=type||"unknown";
this.number=num||0;
};
dojo.io.transports.addTransport=function(name){
this.push(name);
this[name]=dojo.io[name];
};
dojo.io.bind=function(_7ab){
if(!(_7ab instanceof dojo.io.Request)){
try{
_7ab=new dojo.io.Request(_7ab);
}
catch(e){
dojo.debug(e);
}
}
var _7ac="";
if(_7ab["transport"]){
_7ac=_7ab["transport"];
if(!this[_7ac]){
dojo.io.sendBindError(_7ab,"No dojo.io.bind() transport with name '"+_7ab["transport"]+"'.");
return _7ab;
}
if(!this[_7ac].canHandle(_7ab)){
dojo.io.sendBindError(_7ab,"dojo.io.bind() transport with name '"+_7ab["transport"]+"' cannot handle this type of request.");
return _7ab;
}
}else{
for(var x=0;x<dojo.io.transports.length;x++){
var tmp=dojo.io.transports[x];
if((this[tmp])&&(this[tmp].canHandle(_7ab))){
_7ac=tmp;
break;
}
}
if(_7ac==""){
dojo.io.sendBindError(_7ab,"None of the loaded transports for dojo.io.bind()"+" can handle the request.");
return _7ab;
}
}
this[_7ac].bind(_7ab);
_7ab.bindSuccess=true;
return _7ab;
};
dojo.io.sendBindError=function(_7af,_7b0){
if((typeof _7af.error=="function"||typeof _7af.handle=="function")&&(typeof setTimeout=="function"||typeof setTimeout=="object")){
var _7b1=new dojo.io.Error(_7b0);
setTimeout(function(){
_7af[(typeof _7af.error=="function")?"error":"handle"]("error",_7b1,null,_7af);
},50);
}else{
dojo.raise(_7b0);
}
};
dojo.io.queueBind=function(_7b2){
if(!(_7b2 instanceof dojo.io.Request)){
try{
_7b2=new dojo.io.Request(_7b2);
}
catch(e){
dojo.debug(e);
}
}
var _7b3=_7b2.load;
_7b2.load=function(){
dojo.io._queueBindInFlight=false;
var ret=_7b3.apply(this,arguments);
dojo.io._dispatchNextQueueBind();
return ret;
};
var _7b5=_7b2.error;
_7b2.error=function(){
dojo.io._queueBindInFlight=false;
var ret=_7b5.apply(this,arguments);
dojo.io._dispatchNextQueueBind();
return ret;
};
dojo.io._bindQueue.push(_7b2);
dojo.io._dispatchNextQueueBind();
return _7b2;
};
dojo.io._dispatchNextQueueBind=function(){
if(!dojo.io._queueBindInFlight){
dojo.io._queueBindInFlight=true;
if(dojo.io._bindQueue.length>0){
dojo.io.bind(dojo.io._bindQueue.shift());
}else{
dojo.io._queueBindInFlight=false;
}
}
};
dojo.io._bindQueue=[];
dojo.io._queueBindInFlight=false;
dojo.io.argsFromMap=function(map,_7b8,last){
var enc=/utf/i.test(_7b8||"")?encodeURIComponent:dojo.string.encodeAscii;
var _7bb=[];
var _7bc=new Object();
for(var name in map){
var _7be=function(elt){
var val=enc(name)+"="+enc(elt);
_7bb[(last==name)?"push":"unshift"](val);
};
if(!_7bc[name]){
var _7c1=map[name];
if(dojo.lang.isArray(_7c1)){
dojo.lang.forEach(_7c1,_7be);
}else{
_7be(_7c1);
}
}
}
return _7bb.join("&");
};
dojo.io.setIFrameSrc=function(_7c2,src,_7c4){
try{
var r=dojo.render.html;
if(!_7c4){
if(r.safari){
_7c2.location=src;
}else{
frames[_7c2.name].location=src;
}
}else{
var idoc;
if(r.ie){
idoc=_7c2.contentWindow.document;
}else{
if(r.safari){
idoc=_7c2.document;
}else{
idoc=_7c2.contentWindow;
}
}
if(!idoc){
_7c2.location=src;
return;
}else{
idoc.location.replace(src);
}
}
}
catch(e){
dojo.debug(e);
dojo.debug("setIFrameSrc: "+e);
}
};
dojo.provide("dojo.string.extras");
dojo.string.substituteParams=function(_7c7,hash){
var map=(typeof hash=="object")?hash:dojo.lang.toArray(arguments,1);
return _7c7.replace(/\%\{(\w+)\}/g,function(_7ca,key){
if(typeof (map[key])!="undefined"&&map[key]!=null){
return map[key];
}
dojo.raise("Substitution not found: "+key);
});
};
dojo.string.capitalize=function(str){
if(!dojo.lang.isString(str)){
return "";
}
if(arguments.length==0){
str=this;
}
var _7cd=str.split(" ");
for(var i=0;i<_7cd.length;i++){
_7cd[i]=_7cd[i].charAt(0).toUpperCase()+_7cd[i].substring(1);
}
return _7cd.join(" ");
};
dojo.string.isBlank=function(str){
if(!dojo.lang.isString(str)){
return true;
}
return (dojo.string.trim(str).length==0);
};
dojo.string.encodeAscii=function(str){
if(!dojo.lang.isString(str)){
return str;
}
var ret="";
var _7d2=escape(str);
var _7d3,re=/%u([0-9A-F]{4})/i;
while((_7d3=_7d2.match(re))){
var num=Number("0x"+_7d3[1]);
var _7d6=escape("&#"+num+";");
ret+=_7d2.substring(0,_7d3.index)+_7d6;
_7d2=_7d2.substring(_7d3.index+_7d3[0].length);
}
ret+=_7d2.replace(/\+/g,"%2B");
return ret;
};
dojo.string.escape=function(type,str){
var args=dojo.lang.toArray(arguments,1);
switch(type.toLowerCase()){
case "xml":
case "html":
case "xhtml":
return dojo.string.escapeXml.apply(this,args);
case "sql":
return dojo.string.escapeSql.apply(this,args);
case "regexp":
case "regex":
return dojo.string.escapeRegExp.apply(this,args);
case "javascript":
case "jscript":
case "js":
return dojo.string.escapeJavaScript.apply(this,args);
case "ascii":
return dojo.string.encodeAscii.apply(this,args);
default:
return str;
}
};
dojo.string.escapeXml=function(str,_7db){
str=str.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!_7db){
str=str.replace(/'/gm,"&#39;");
}
return str;
};
dojo.string.escapeSql=function(str){
return str.replace(/'/gm,"''");
};
dojo.string.escapeRegExp=function(str){
return str.replace(/\\/gm,"\\\\").replace(/([\f\b\n\t\r[\^$|?*+(){}])/gm,"\\$1");
};
dojo.string.escapeJavaScript=function(str){
return str.replace(/(["'\f\b\n\t\r])/gm,"\\$1");
};
dojo.string.escapeString=function(str){
return ("\""+str.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");
};
dojo.string.summary=function(str,len){
if(!len||str.length<=len){
return str;
}
return str.substring(0,len).replace(/\.+$/,"")+"...";
};
dojo.string.endsWith=function(str,end,_7e4){
if(_7e4){
str=str.toLowerCase();
end=end.toLowerCase();
}
if((str.length-end.length)<0){
return false;
}
return str.lastIndexOf(end)==str.length-end.length;
};
dojo.string.endsWithAny=function(str){
for(var i=1;i<arguments.length;i++){
if(dojo.string.endsWith(str,arguments[i])){
return true;
}
}
return false;
};
dojo.string.startsWith=function(str,_7e8,_7e9){
if(_7e9){
str=str.toLowerCase();
_7e8=_7e8.toLowerCase();
}
return str.indexOf(_7e8)==0;
};
dojo.string.startsWithAny=function(str){
for(var i=1;i<arguments.length;i++){
if(dojo.string.startsWith(str,arguments[i])){
return true;
}
}
return false;
};
dojo.string.has=function(str){
for(var i=1;i<arguments.length;i++){
if(str.indexOf(arguments[i])>-1){
return true;
}
}
return false;
};
dojo.string.normalizeNewlines=function(text,_7ef){
if(_7ef=="\n"){
text=text.replace(/\r\n/g,"\n");
text=text.replace(/\r/g,"\n");
}else{
if(_7ef=="\r"){
text=text.replace(/\r\n/g,"\r");
text=text.replace(/\n/g,"\r");
}else{
text=text.replace(/([^\r])\n/g,"$1\r\n").replace(/\r([^\n])/g,"\r\n$1");
}
}
return text;
};
dojo.string.splitEscaped=function(str,_7f1){
var _7f2=[];
for(var i=0,_7f4=0;i<str.length;i++){
if(str.charAt(i)=="\\"){
i++;
continue;
}
if(str.charAt(i)==_7f1){
_7f2.push(str.substring(_7f4,i));
_7f4=i+1;
}
}
_7f2.push(str.substr(_7f4));
return _7f2;
};
dojo.provide("dojo.undo.browser");
try{
if((!djConfig["preventBackButtonFix"])&&(!dojo.hostenv.post_load_)){
document.write("<iframe style='border: 0px; width: 1px; height: 1px; position: absolute; bottom: 0px; right: 0px; visibility: visible;' name='djhistory' id='djhistory' src='"+(djConfig["dojoIframeHistoryUrl"]||dojo.hostenv.getBaseScriptUri()+"iframe_history.html")+"'></iframe>");
}
}
catch(e){
}
if(dojo.render.html.opera){
dojo.debug("Opera is not supported with dojo.undo.browser, so back/forward detection will not work.");
}
dojo.undo.browser={initialHref:(!dj_undef("window"))?window.location.href:"",initialHash:(!dj_undef("window"))?window.location.hash:"",moveForward:false,historyStack:[],forwardStack:[],historyIframe:null,bookmarkAnchor:null,locationTimer:null,setInitialState:function(args){
this.initialState=this._createState(this.initialHref,args,this.initialHash);
},addToHistory:function(args){
this.forwardStack=[];
var hash=null;
var url=null;
if(!this.historyIframe){
if(djConfig["useXDomain"]&&!djConfig["dojoIframeHistoryUrl"]){
dojo.debug("dojo.undo.browser: When using cross-domain Dojo builds,"+" please save iframe_history.html to your domain and set djConfig.dojoIframeHistoryUrl"+" to the path on your domain to iframe_history.html");
}
this.historyIframe=window.frames["djhistory"];
}
if(!this.bookmarkAnchor){
this.bookmarkAnchor=document.createElement("a");
dojo.body().appendChild(this.bookmarkAnchor);
this.bookmarkAnchor.style.display="none";
}
if(args["changeUrl"]){
hash="#"+((args["changeUrl"]!==true)?args["changeUrl"]:(new Date()).getTime());
if(this.historyStack.length==0&&this.initialState.urlHash==hash){
this.initialState=this._createState(url,args,hash);
return;
}else{
if(this.historyStack.length>0&&this.historyStack[this.historyStack.length-1].urlHash==hash){
this.historyStack[this.historyStack.length-1]=this._createState(url,args,hash);
return;
}
}
this.changingUrl=true;
setTimeout("window.location.href = '"+hash+"'; dojo.undo.browser.changingUrl = false;",1);
this.bookmarkAnchor.href=hash;
if(dojo.render.html.ie){
url=this._loadIframeHistory();
var _7f9=args["back"]||args["backButton"]||args["handle"];
var tcb=function(_7fb){
if(window.location.hash!=""){
setTimeout("window.location.href = '"+hash+"';",1);
}
_7f9.apply(this,[_7fb]);
};
if(args["back"]){
args.back=tcb;
}else{
if(args["backButton"]){
args.backButton=tcb;
}else{
if(args["handle"]){
args.handle=tcb;
}
}
}
var _7fc=args["forward"]||args["forwardButton"]||args["handle"];
var tfw=function(_7fe){
if(window.location.hash!=""){
window.location.href=hash;
}
if(_7fc){
_7fc.apply(this,[_7fe]);
}
};
if(args["forward"]){
args.forward=tfw;
}else{
if(args["forwardButton"]){
args.forwardButton=tfw;
}else{
if(args["handle"]){
args.handle=tfw;
}
}
}
}else{
if(dojo.render.html.moz){
if(!this.locationTimer){
this.locationTimer=setInterval("dojo.undo.browser.checkLocation();",200);
}
}
}
}else{
url=this._loadIframeHistory();
}
this.historyStack.push(this._createState(url,args,hash));
},checkLocation:function(){
if(!this.changingUrl){
var hsl=this.historyStack.length;
if((window.location.hash==this.initialHash||window.location.href==this.initialHref)&&(hsl==1)){
this.handleBackButton();
return;
}
if(this.forwardStack.length>0){
if(this.forwardStack[this.forwardStack.length-1].urlHash==window.location.hash){
this.handleForwardButton();
return;
}
}
if((hsl>=2)&&(this.historyStack[hsl-2])){
if(this.historyStack[hsl-2].urlHash==window.location.hash){
this.handleBackButton();
return;
}
}
}
},iframeLoaded:function(evt,_801){
if(!dojo.render.html.opera){
var _802=this._getUrlQuery(_801.href);
if(_802==null){
if(this.historyStack.length==1){
this.handleBackButton();
}
return;
}
if(this.moveForward){
this.moveForward=false;
return;
}
if(this.historyStack.length>=2&&_802==this._getUrlQuery(this.historyStack[this.historyStack.length-2].url)){
this.handleBackButton();
}else{
if(this.forwardStack.length>0&&_802==this._getUrlQuery(this.forwardStack[this.forwardStack.length-1].url)){
this.handleForwardButton();
}
}
}
},handleBackButton:function(){
var _803=this.historyStack.pop();
if(!_803){
return;
}
var last=this.historyStack[this.historyStack.length-1];
if(!last&&this.historyStack.length==0){
last=this.initialState;
}
if(last){
if(last.kwArgs["back"]){
last.kwArgs["back"]();
}else{
if(last.kwArgs["backButton"]){
last.kwArgs["backButton"]();
}else{
if(last.kwArgs["handle"]){
last.kwArgs.handle("back");
}
}
}
}
this.forwardStack.push(_803);
},handleForwardButton:function(){
var last=this.forwardStack.pop();
if(!last){
return;
}
if(last.kwArgs["forward"]){
last.kwArgs.forward();
}else{
if(last.kwArgs["forwardButton"]){
last.kwArgs.forwardButton();
}else{
if(last.kwArgs["handle"]){
last.kwArgs.handle("forward");
}
}
}
this.historyStack.push(last);
},_createState:function(url,args,hash){
return {"url":url,"kwArgs":args,"urlHash":hash};
},_getUrlQuery:function(url){
var _80a=url.split("?");
if(_80a.length<2){
return null;
}else{
return _80a[1];
}
},_loadIframeHistory:function(){
var url=(djConfig["dojoIframeHistoryUrl"]||dojo.hostenv.getBaseScriptUri()+"iframe_history.html")+"?"+(new Date()).getTime();
this.moveForward=true;
dojo.io.setIFrameSrc(this.historyIframe,url,false);
return url;
}};
dojo.provide("dojo.io.BrowserIO");
if(!dj_undef("window")){
dojo.io.checkChildrenForFile=function(node){
var _80d=false;
var _80e=node.getElementsByTagName("input");
dojo.lang.forEach(_80e,function(_80f){
if(_80d){
return;
}
if(_80f.getAttribute("type")=="file"){
_80d=true;
}
});
return _80d;
};
dojo.io.formHasFile=function(_810){
return dojo.io.checkChildrenForFile(_810);
};
dojo.io.updateNode=function(node,_812){
node=dojo.byId(node);
var args=_812;
if(dojo.lang.isString(_812)){
args={url:_812};
}
args.mimetype="text/html";
args.load=function(t,d,e){
while(node.firstChild){
dojo.dom.destroyNode(node.firstChild);
}
node.innerHTML=d;
};
dojo.io.bind(args);
};
dojo.io.formFilter=function(node){
var type=(node.type||"").toLowerCase();
return !node.disabled&&node.name&&!dojo.lang.inArray(["file","submit","image","reset","button"],type);
};
dojo.io.encodeForm=function(_819,_81a,_81b){
if((!_819)||(!_819.tagName)||(!_819.tagName.toLowerCase()=="form")){
dojo.raise("Attempted to encode a non-form element.");
}
if(!_81b){
_81b=dojo.io.formFilter;
}
var enc=/utf/i.test(_81a||"")?encodeURIComponent:dojo.string.encodeAscii;
var _81d=[];
for(var i=0;i<_819.elements.length;i++){
var elm=_819.elements[i];
if(!elm||elm.tagName.toLowerCase()=="fieldset"||!_81b(elm)){
continue;
}
var name=enc(elm.name);
var type=elm.type.toLowerCase();
if(type=="select-multiple"){
for(var j=0;j<elm.options.length;j++){
if(elm.options[j].selected){
_81d.push(name+"="+enc(elm.options[j].value));
}
}
}else{
if(dojo.lang.inArray(["radio","checkbox"],type)){
if(elm.checked){
_81d.push(name+"="+enc(elm.value));
}
}else{
_81d.push(name+"="+enc(elm.value));
}
}
}
var _823=_819.getElementsByTagName("input");
for(var i=0;i<_823.length;i++){
var _824=_823[i];
if(_824.type.toLowerCase()=="image"&&_824.form==_819&&_81b(_824)){
var name=enc(_824.name);
_81d.push(name+"="+enc(_824.value));
_81d.push(name+".x=0");
_81d.push(name+".y=0");
}
}
return _81d.join("&")+"&";
};
dojo.io.FormBind=function(args){
this.bindArgs={};
if(args&&args.formNode){
this.init(args);
}else{
if(args){
this.init({formNode:args});
}
}
};
dojo.lang.extend(dojo.io.FormBind,{form:null,bindArgs:null,clickedButton:null,init:function(args){
var form=dojo.byId(args.formNode);
if(!form||!form.tagName||form.tagName.toLowerCase()!="form"){
throw new Error("FormBind: Couldn't apply, invalid form");
}else{
if(this.form==form){
return;
}else{
if(this.form){
throw new Error("FormBind: Already applied to a form");
}
}
}
dojo.lang.mixin(this.bindArgs,args);
this.form=form;
this.connect(form,"onsubmit","submit");
for(var i=0;i<form.elements.length;i++){
var node=form.elements[i];
if(node&&node.type&&dojo.lang.inArray(["submit","button"],node.type.toLowerCase())){
this.connect(node,"onclick","click");
}
}
var _82a=form.getElementsByTagName("input");
for(var i=0;i<_82a.length;i++){
var _82b=_82a[i];
if(_82b.type.toLowerCase()=="image"&&_82b.form==form){
this.connect(_82b,"onclick","click");
}
}
},onSubmit:function(form){
return true;
},submit:function(e){
e.preventDefault();
if(this.onSubmit(this.form)){
dojo.io.bind(dojo.lang.mixin(this.bindArgs,{formFilter:dojo.lang.hitch(this,"formFilter")}));
}
},click:function(e){
var node=e.currentTarget;
if(node.disabled){
return;
}
this.clickedButton=node;
},formFilter:function(node){
var type=(node.type||"").toLowerCase();
var _832=false;
if(node.disabled||!node.name){
_832=false;
}else{
if(dojo.lang.inArray(["submit","button","image"],type)){
if(!this.clickedButton){
this.clickedButton=node;
}
_832=node==this.clickedButton;
}else{
_832=!dojo.lang.inArray(["file","submit","reset","button"],type);
}
}
return _832;
},connect:function(_833,_834,_835){
if(dojo.evalObjPath("dojo.event.connect")){
dojo.event.connect(_833,_834,this,_835);
}else{
var fcn=dojo.lang.hitch(this,_835);
_833[_834]=function(e){
if(!e){
e=window.event;
}
if(!e.currentTarget){
e.currentTarget=e.srcElement;
}
if(!e.preventDefault){
e.preventDefault=function(){
window.event.returnValue=false;
};
}
fcn(e);
};
}
}});
dojo.io.XMLHTTPTransport=new function(){
var _838=this;
var _839={};
this.useCache=false;
this.preventCache=false;
function getCacheKey(url,_83b,_83c){
return url+"|"+_83b+"|"+_83c.toLowerCase();
}
function addToCache(url,_83e,_83f,http){
_839[getCacheKey(url,_83e,_83f)]=http;
}
function getFromCache(url,_842,_843){
return _839[getCacheKey(url,_842,_843)];
}
this.clearCache=function(){
_839={};
};
function doLoad(_844,http,url,_847,_848){
if(((http.status>=200)&&(http.status<300))||(http.status==304)||(http.status==1223)||(location.protocol=="file:"&&(http.status==0||http.status==undefined))||(location.protocol=="chrome:"&&(http.status==0||http.status==undefined))){
var ret;
if(_844.method.toLowerCase()=="head"){
var _84a=http.getAllResponseHeaders();
ret={};
ret.toString=function(){
return _84a;
};
var _84b=_84a.split(/[\r\n]+/g);
for(var i=0;i<_84b.length;i++){
var pair=_84b[i].match(/^([^:]+)\s*:\s*(.+)$/i);
if(pair){
ret[pair[1]]=pair[2];
}
}
}else{
if(_844.mimetype=="text/javascript"){
try{
ret=dj_eval(http.responseText);
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=null;
}
}else{
if(_844.mimetype.substr(0,9)=="text/json"||_844.mimetype.substr(0,16)=="application/json"){
try{
ret=dj_eval("("+_844.jsonFilter(http.responseText)+")");
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=false;
}
}else{
if((_844.mimetype=="application/xml")||(_844.mimetype=="text/xml")){
ret=http.responseXML;
if(!ret||typeof ret=="string"||!http.getResponseHeader("Content-Type")){
ret=dojo.dom.createDocumentFromText(http.responseText);
}
}else{
ret=http.responseText;
}
}
}
}
if(_848){
addToCache(url,_847,_844.method,http);
}
_844[(typeof _844.load=="function")?"load":"handle"]("load",ret,http,_844);
}else{
var _84e=new dojo.io.Error("XMLHttpTransport Error: "+http.status+" "+http.statusText);
_844[(typeof _844.error=="function")?"error":"handle"]("error",_84e,http,_844);
}
}
function setHeaders(http,_850){
if(_850["headers"]){
for(var _851 in _850["headers"]){
if(_851.toLowerCase()=="content-type"&&!_850["contentType"]){
_850["contentType"]=_850["headers"][_851];
}else{
http.setRequestHeader(_851,_850["headers"][_851]);
}
}
}
}
this.inFlight=[];
this.inFlightTimer=null;
this.startWatchingInFlight=function(){
if(!this.inFlightTimer){
this.inFlightTimer=setTimeout("dojo.io.XMLHTTPTransport.watchInFlight();",10);
}
};
this.watchInFlight=function(){
var now=null;
if(!dojo.hostenv._blockAsync&&!_838._blockAsync){
for(var x=this.inFlight.length-1;x>=0;x--){
try{
var tif=this.inFlight[x];
if(!tif||tif.http._aborted||!tif.http.readyState){
this.inFlight.splice(x,1);
continue;
}
if(4==tif.http.readyState){
this.inFlight.splice(x,1);
doLoad(tif.req,tif.http,tif.url,tif.query,tif.useCache);
}else{
if(tif.startTime){
if(!now){
now=(new Date()).getTime();
}
if(tif.startTime+(tif.req.timeoutSeconds*1000)<now){
if(typeof tif.http.abort=="function"){
tif.http.abort();
}
this.inFlight.splice(x,1);
tif.req[(typeof tif.req.timeout=="function")?"timeout":"handle"]("timeout",null,tif.http,tif.req);
}
}
}
}
catch(e){
try{
var _855=new dojo.io.Error("XMLHttpTransport.watchInFlight Error: "+e);
tif.req[(typeof tif.req.error=="function")?"error":"handle"]("error",_855,tif.http,tif.req);
}
catch(e2){
dojo.debug("XMLHttpTransport error callback failed: "+e2);
}
}
}
}
clearTimeout(this.inFlightTimer);
if(this.inFlight.length==0){
this.inFlightTimer=null;
return;
}
this.inFlightTimer=setTimeout("dojo.io.XMLHTTPTransport.watchInFlight();",10);
};
var _856=dojo.hostenv.getXmlhttpObject()?true:false;
this.canHandle=function(_857){
var mlc=_857["mimetype"].toLowerCase()||"";
return _856&&((dojo.lang.inArray(["text/plain","text/html","application/xml","text/xml","text/javascript"],mlc))||(mlc.substr(0,9)=="text/json"||mlc.substr(0,16)=="application/json"))&&!(_857["formNode"]&&dojo.io.formHasFile(_857["formNode"]));
};
this.multipartBoundary="45309FFF-BD65-4d50-99C9-36986896A96F";
this.bind=function(_859){
if(!_859["url"]){
if(!_859["formNode"]&&(_859["backButton"]||_859["back"]||_859["changeUrl"]||_859["watchForURL"])&&(!djConfig.preventBackButtonFix)){
dojo.deprecated("Using dojo.io.XMLHTTPTransport.bind() to add to browser history without doing an IO request","Use dojo.undo.browser.addToHistory() instead.","0.4");
dojo.undo.browser.addToHistory(_859);
return true;
}
}
var url=_859.url;
var _85b="";
if(_859["formNode"]){
var ta=_859.formNode.getAttribute("action");
if((ta)&&(!_859["url"])){
url=ta;
}
var tp=_859.formNode.getAttribute("method");
if((tp)&&(!_859["method"])){
_859.method=tp;
}
_85b+=dojo.io.encodeForm(_859.formNode,_859.encoding,_859["formFilter"]);
}
if(url.indexOf("#")>-1){
dojo.debug("Warning: dojo.io.bind: stripping hash values from url:",url);
url=url.split("#")[0];
}
if(_859["file"]){
_859.method="post";
}
if(!_859["method"]){
_859.method="get";
}
if(_859.method.toLowerCase()=="get"){
_859.multipart=false;
}else{
if(_859["file"]){
_859.multipart=true;
}else{
if(!_859["multipart"]){
_859.multipart=false;
}
}
}
if(_859["backButton"]||_859["back"]||_859["changeUrl"]){
dojo.undo.browser.addToHistory(_859);
}
var _85e=_859["content"]||{};
if(_859.sendTransport){
_85e["dojo.transport"]="xmlhttp";
}
do{
if(_859.postContent){
_85b=_859.postContent;
break;
}
if(_85e){
_85b+=dojo.io.argsFromMap(_85e,_859.encoding);
}
if(_859.method.toLowerCase()=="get"||!_859.multipart){
break;
}
var t=[];
if(_85b.length){
var q=_85b.split("&");
for(var i=0;i<q.length;++i){
if(q[i].length){
var p=q[i].split("=");
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+p[0]+"\"","",p[1]);
}
}
}
if(_859.file){
if(dojo.lang.isArray(_859.file)){
for(var i=0;i<_859.file.length;++i){
var o=_859.file[i];
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}else{
var o=_859.file;
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}
if(t.length){
t.push("--"+this.multipartBoundary+"--","");
_85b=t.join("\r\n");
}
}while(false);
var _864=_859["sync"]?false:true;
var _865=_859["preventCache"]||(this.preventCache==true&&_859["preventCache"]!=false);
var _866=_859["useCache"]==true||(this.useCache==true&&_859["useCache"]!=false);
if(!_865&&_866){
var _867=getFromCache(url,_85b,_859.method);
if(_867){
doLoad(_859,_867,url,_85b,false);
return;
}
}
var http=dojo.hostenv.getXmlhttpObject(_859);
var _869=false;
if(_864){
var _86a=this.inFlight.push({"req":_859,"http":http,"url":url,"query":_85b,"useCache":_866,"startTime":_859.timeoutSeconds?(new Date()).getTime():0});
this.startWatchingInFlight();
}else{
_838._blockAsync=true;
}
if(_859.method.toLowerCase()=="post"){
if(!_859.user){
http.open("POST",url,_864);
}else{
http.open("POST",url,_864,_859.user,_859.password);
}
setHeaders(http,_859);
http.setRequestHeader("Content-Type",_859.multipart?("multipart/form-data; boundary="+this.multipartBoundary):(_859.contentType||"application/x-www-form-urlencoded"));
try{
http.send(_85b);
}
catch(e){
if(typeof http.abort=="function"){
http.abort();
}
doLoad(_859,{status:404},url,_85b,_866);
}
}else{
var _86b=url;
if(_85b!=""){
_86b+=(_86b.indexOf("?")>-1?"&":"?")+_85b;
}
if(_865){
_86b+=(dojo.string.endsWithAny(_86b,"?","&")?"":(_86b.indexOf("?")>-1?"&":"?"))+"dojo.preventCache="+new Date().valueOf();
}
if(!_859.user){
http.open(_859.method.toUpperCase(),_86b,_864);
}else{
http.open(_859.method.toUpperCase(),_86b,_864,_859.user,_859.password);
}
setHeaders(http,_859);
try{
http.send(null);
}
catch(e){
if(typeof http.abort=="function"){
http.abort();
}
doLoad(_859,{status:404},url,_85b,_866);
}
}
if(!_864){
doLoad(_859,http,url,_85b,_866);
_838._blockAsync=false;
}
_859.abort=function(){
try{
http._aborted=true;
}
catch(e){
}
return http.abort();
};
return;
};
dojo.io.transports.addTransport("XMLHTTPTransport");
};
}
dojo.provide("dojo.io.cookie");
dojo.io.cookie.setCookie=function(name,_86d,days,path,_870,_871){
var _872=-1;
if((typeof days=="number")&&(days>=0)){
var d=new Date();
d.setTime(d.getTime()+(days*24*60*60*1000));
_872=d.toGMTString();
}
_86d=escape(_86d);
document.cookie=name+"="+_86d+";"+(_872!=-1?" expires="+_872+";":"")+(path?"path="+path:"")+(_870?"; domain="+_870:"")+(_871?"; secure":"");
};
dojo.io.cookie.set=dojo.io.cookie.setCookie;
dojo.io.cookie.getCookie=function(name){
var idx=document.cookie.lastIndexOf(name+"=");
if(idx==-1){
return null;
}
var _876=document.cookie.substring(idx+name.length+1);
var end=_876.indexOf(";");
if(end==-1){
end=_876.length;
}
_876=_876.substring(0,end);
_876=unescape(_876);
return _876;
};
dojo.io.cookie.get=dojo.io.cookie.getCookie;
dojo.io.cookie.deleteCookie=function(name){
dojo.io.cookie.setCookie(name,"-",0);
};
dojo.io.cookie.setObjectCookie=function(name,obj,days,path,_87d,_87e,_87f){
if(arguments.length==5){
_87f=_87d;
_87d=null;
_87e=null;
}
var _880=[],_881,_882="";
if(!_87f){
_881=dojo.io.cookie.getObjectCookie(name);
}
if(days>=0){
if(!_881){
_881={};
}
for(var prop in obj){
if(obj[prop]==null){
delete _881[prop];
}else{
if((typeof obj[prop]=="string")||(typeof obj[prop]=="number")){
_881[prop]=obj[prop];
}
}
}
prop=null;
for(var prop in _881){
_880.push(escape(prop)+"="+escape(_881[prop]));
}
_882=_880.join("&");
}
dojo.io.cookie.setCookie(name,_882,days,path,_87d,_87e);
};
dojo.io.cookie.getObjectCookie=function(name){
var _885=null,_886=dojo.io.cookie.getCookie(name);
if(_886){
_885={};
var _887=_886.split("&");
for(var i=0;i<_887.length;i++){
var pair=_887[i].split("=");
var _88a=pair[1];
if(isNaN(_88a)){
_88a=unescape(pair[1]);
}
_885[unescape(pair[0])]=_88a;
}
}
return _885;
};
dojo.io.cookie.isSupported=function(){
if(typeof navigator.cookieEnabled!="boolean"){
dojo.io.cookie.setCookie("__TestingYourBrowserForCookieSupport__","CookiesAllowed",90,null);
var _88b=dojo.io.cookie.getCookie("__TestingYourBrowserForCookieSupport__");
navigator.cookieEnabled=(_88b=="CookiesAllowed");
if(navigator.cookieEnabled){
this.deleteCookie("__TestingYourBrowserForCookieSupport__");
}
}
return navigator.cookieEnabled;
};
if(!dojo.io.cookies){
dojo.io.cookies=dojo.io.cookie;
}
dojo.kwCompoundRequire({common:["dojo.io.common"],rhino:["dojo.io.RhinoIO"],browser:["dojo.io.BrowserIO","dojo.io.cookie"],dashboard:["dojo.io.BrowserIO","dojo.io.cookie"]});
dojo.provide("dojo.io.*");
dojo.provide("dojo.string.Builder");
dojo.string.Builder=function(str){
this.arrConcat=(dojo.render.html.capable&&dojo.render.html["ie"]);
var a=[];
var b="";
var _88f=this.length=b.length;
if(this.arrConcat){
if(b.length>0){
a.push(b);
}
b="";
}
this.toString=this.valueOf=function(){
return (this.arrConcat)?a.join(""):b;
};
this.append=function(){
for(var x=0;x<arguments.length;x++){
var s=arguments[x];
if(dojo.lang.isArrayLike(s)){
this.append.apply(this,s);
}else{
if(this.arrConcat){
a.push(s);
}else{
b+=s;
}
_88f+=s.length;
this.length=_88f;
}
}
return this;
};
this.clear=function(){
a=[];
b="";
_88f=this.length=0;
return this;
};
this.remove=function(f,l){
var s="";
if(this.arrConcat){
b=a.join("");
}
a=[];
if(f>0){
s=b.substring(0,(f-1));
}
b=s+b.substring(f+l);
_88f=this.length=b.length;
if(this.arrConcat){
a.push(b);
b="";
}
return this;
};
this.replace=function(o,n){
if(this.arrConcat){
b=a.join("");
}
a=[];
b=b.replace(o,n);
_88f=this.length=b.length;
if(this.arrConcat){
a.push(b);
b="";
}
return this;
};
this.insert=function(idx,s){
if(this.arrConcat){
b=a.join("");
}
a=[];
if(idx==0){
b=s+b;
}else{
var t=b.split("");
t.splice(idx,0,s);
b=t.join("");
}
_88f=this.length=b.length;
if(this.arrConcat){
a.push(b);
b="";
}
return this;
};
this.append.apply(this,arguments);
};
dojo.kwCompoundRequire({common:["dojo.string","dojo.string.common","dojo.string.extras","dojo.string.Builder"]});
dojo.provide("dojo.string.*");
dojo.provide("dojo.widget.ContentPane");
dojo.widget.defineWidget("dojo.widget.ContentPane",dojo.widget.HtmlWidget,function(){
this._styleNodes=[];
this._onLoadStack=[];
this._onUnloadStack=[];
this._callOnUnload=false;
this._ioBindObj;
this.scriptScope;
this.bindArgs={};
},{isContainer:true,adjustPaths:true,href:"",extractContent:true,parseContent:true,cacheContent:true,preload:false,refreshOnShow:false,handler:"",executeScripts:false,scriptSeparation:true,loadingMessage:"Loading...",isLoaded:false,postCreate:function(args,frag,_89c){
if(this.handler!==""){
this.setHandler(this.handler);
}
if(this.isShowing()||this.preload){
this.loadContents();
}
},show:function(){
if(this.refreshOnShow){
this.refresh();
}else{
this.loadContents();
}
dojo.widget.ContentPane.superclass.show.call(this);
},refresh:function(){
this.isLoaded=false;
this.loadContents();
},loadContents:function(){
if(this.isLoaded){
return;
}
if(dojo.lang.isFunction(this.handler)){
this._runHandler();
}else{
if(this.href!=""){
this._downloadExternalContent(this.href,this.cacheContent&&!this.refreshOnShow);
}
}
},setUrl:function(url){
this.href=url;
this.isLoaded=false;
if(this.preload||this.isShowing()){
this.loadContents();
}
},abort:function(){
var bind=this._ioBindObj;
if(!bind||!bind.abort){
return;
}
bind.abort();
delete this._ioBindObj;
},_downloadExternalContent:function(url,_8a0){
this.abort();
this._handleDefaults(this.loadingMessage,"onDownloadStart");
var self=this;
this._ioBindObj=dojo.io.bind(this._cacheSetting({url:url,mimetype:"text/html",handler:function(type,data,xhr){
delete self._ioBindObj;
if(type=="load"){
self.onDownloadEnd.call(self,url,data);
}else{
var e={responseText:xhr.responseText,status:xhr.status,statusText:xhr.statusText,responseHeaders:xhr.getAllResponseHeaders(),text:"Error loading '"+url+"' ("+xhr.status+" "+xhr.statusText+")"};
self._handleDefaults.call(self,e,"onDownloadError");
self.onLoad();
}
}},_8a0));
},_cacheSetting:function(_8a6,_8a7){
for(var x in this.bindArgs){
if(dojo.lang.isUndefined(_8a6[x])){
_8a6[x]=this.bindArgs[x];
}
}
if(dojo.lang.isUndefined(_8a6.useCache)){
_8a6.useCache=_8a7;
}
if(dojo.lang.isUndefined(_8a6.preventCache)){
_8a6.preventCache=!_8a7;
}
if(dojo.lang.isUndefined(_8a6.mimetype)){
_8a6.mimetype="text/html";
}
return _8a6;
},onLoad:function(e){
this._runStack("_onLoadStack");
this.isLoaded=true;
},onUnLoad:function(e){
dojo.deprecated(this.widgetType+".onUnLoad, use .onUnload (lowercased load)",0.5);
},onUnload:function(e){
this._runStack("_onUnloadStack");
delete this.scriptScope;
if(this.onUnLoad!==dojo.widget.ContentPane.prototype.onUnLoad){
this.onUnLoad.apply(this,arguments);
}
},_runStack:function(_8ac){
var st=this[_8ac];
var err="";
var _8af=this.scriptScope||window;
for(var i=0;i<st.length;i++){
try{
st[i].call(_8af);
}
catch(e){
err+="\n"+st[i]+" failed: "+e.description;
}
}
this[_8ac]=[];
if(err.length){
var name=(_8ac=="_onLoadStack")?"addOnLoad":"addOnUnLoad";
this._handleDefaults(name+" failure\n "+err,"onExecError","debug");
}
},addOnLoad:function(obj,func){
this._pushOnStack(this._onLoadStack,obj,func);
},addOnUnload:function(obj,func){
this._pushOnStack(this._onUnloadStack,obj,func);
},addOnUnLoad:function(){
dojo.deprecated(this.widgetType+".addOnUnLoad, use addOnUnload instead. (lowercased Load)",0.5);
this.addOnUnload.apply(this,arguments);
},_pushOnStack:function(_8b6,obj,func){
if(typeof func=="undefined"){
_8b6.push(obj);
}else{
_8b6.push(function(){
obj[func]();
});
}
},destroy:function(){
this.onUnload();
dojo.widget.ContentPane.superclass.destroy.call(this);
},onExecError:function(e){
},onContentError:function(e){
},onDownloadError:function(e){
},onDownloadStart:function(e){
},onDownloadEnd:function(url,data){
data=this.splitAndFixPaths(data,url);
this.setContent(data);
},_handleDefaults:function(e,_8c0,_8c1){
if(!_8c0){
_8c0="onContentError";
}
if(dojo.lang.isString(e)){
e={text:e};
}
if(!e.text){
e.text=e.toString();
}
e.toString=function(){
return this.text;
};
if(typeof e.returnValue!="boolean"){
e.returnValue=true;
}
if(typeof e.preventDefault!="function"){
e.preventDefault=function(){
this.returnValue=false;
};
}
this[_8c0](e);
if(e.returnValue){
switch(_8c1){
case true:
case "alert":
alert(e.toString());
break;
case "debug":
dojo.debug(e.toString());
break;
default:
if(this._callOnUnload){
this.onUnload();
}
this._callOnUnload=false;
if(arguments.callee._loopStop){
dojo.debug(e.toString());
}else{
arguments.callee._loopStop=true;
this._setContent(e.toString());
}
}
}
arguments.callee._loopStop=false;
},splitAndFixPaths:function(s,url){
var _8c4=[],_8c5=[],tmp=[];
var _8c7=[],_8c8=[],attr=[],_8ca=[];
var str="",path="",fix="",_8ce="",tag="",_8d0="";
if(!url){
url="./";
}
if(s){
var _8d1=/<title[^>]*>([\s\S]*?)<\/title>/i;
while(_8c7=_8d1.exec(s)){
_8c4.push(_8c7[1]);
s=s.substring(0,_8c7.index)+s.substr(_8c7.index+_8c7[0].length);
}
if(this.adjustPaths){
var _8d2=/<[a-z][a-z0-9]*[^>]*\s(?:(?:src|href|style)=[^>])+[^>]*>/i;
var _8d3=/\s(src|href|style)=(['"]?)([\w()\[\]\/.,\\'"-:;#=&?\s@]+?)\2/i;
var _8d4=/^(?:[#]|(?:(?:https?|ftps?|file|javascript|mailto|news):))/;
while(tag=_8d2.exec(s)){
str+=s.substring(0,tag.index);
s=s.substring((tag.index+tag[0].length),s.length);
tag=tag[0];
_8ce="";
while(attr=_8d3.exec(tag)){
path="";
_8d0=attr[3];
switch(attr[1].toLowerCase()){
case "src":
case "href":
if(_8d4.exec(_8d0)){
path=_8d0;
}else{
path=(new dojo.uri.Uri(url,_8d0).toString());
}
break;
case "style":
path=dojo.html.fixPathsInCssText(_8d0,url);
break;
default:
path=_8d0;
}
fix=" "+attr[1]+"="+attr[2]+path+attr[2];
_8ce+=tag.substring(0,attr.index)+fix;
tag=tag.substring((attr.index+attr[0].length),tag.length);
}
str+=_8ce+tag;
}
s=str+s;
}
_8d1=/(?:<(style)[^>]*>([\s\S]*?)<\/style>|<link ([^>]*rel=['"]?stylesheet['"]?[^>]*)>)/i;
while(_8c7=_8d1.exec(s)){
if(_8c7[1]&&_8c7[1].toLowerCase()=="style"){
_8ca.push(dojo.html.fixPathsInCssText(_8c7[2],url));
}else{
if(attr=_8c7[3].match(/href=(['"]?)([^'">]*)\1/i)){
_8ca.push({path:attr[2]});
}
}
s=s.substring(0,_8c7.index)+s.substr(_8c7.index+_8c7[0].length);
}
var _8d1=/<script([^>]*)>([\s\S]*?)<\/script>/i;
var _8d5=/src=(['"]?)([^"']*)\1/i;
var _8d6=/.*(\bdojo\b\.js(?:\.uncompressed\.js)?)$/;
var _8d7=/(?:var )?\bdjConfig\b(?:[\s]*=[\s]*\{[^}]+\}|\.[\w]*[\s]*=[\s]*[^;\n]*)?;?|dojo\.hostenv\.writeIncludes\(\s*\);?/g;
var _8d8=/dojo\.(?:(?:require(?:After)?(?:If)?)|(?:widget\.(?:manager\.)?registerWidgetPackage)|(?:(?:hostenv\.)?setModulePrefix|registerModulePath)|defineNamespace)\((['"]).*?\1\)\s*;?/;
while(_8c7=_8d1.exec(s)){
if(this.executeScripts&&_8c7[1]){
if(attr=_8d5.exec(_8c7[1])){
if(_8d6.exec(attr[2])){
dojo.debug("Security note! inhibit:"+attr[2]+" from  being loaded again.");
}else{
_8c5.push({path:attr[2]});
}
}
}
if(_8c7[2]){
var sc=_8c7[2].replace(_8d7,"");
if(!sc){
continue;
}
while(tmp=_8d8.exec(sc)){
_8c8.push(tmp[0]);
sc=sc.substring(0,tmp.index)+sc.substr(tmp.index+tmp[0].length);
}
if(this.executeScripts){
_8c5.push(sc);
}
}
s=s.substr(0,_8c7.index)+s.substr(_8c7.index+_8c7[0].length);
}
if(this.extractContent){
_8c7=s.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_8c7){
s=_8c7[1];
}
}
if(this.executeScripts&&this.scriptSeparation){
var _8d1=/(<[a-zA-Z][a-zA-Z0-9]*\s[^>]*?\S=)((['"])[^>]*scriptScope[^>]*>)/;
var _8da=/([\s'";:\(])scriptScope(.*)/;
str="";
while(tag=_8d1.exec(s)){
tmp=((tag[3]=="'")?"\"":"'");
fix="";
str+=s.substring(0,tag.index)+tag[1];
while(attr=_8da.exec(tag[2])){
tag[2]=tag[2].substring(0,attr.index)+attr[1]+"dojo.widget.byId("+tmp+this.widgetId+tmp+").scriptScope"+attr[2];
}
str+=tag[2];
s=s.substr(tag.index+tag[0].length);
}
s=str+s;
}
}
return {"xml":s,"styles":_8ca,"titles":_8c4,"requires":_8c8,"scripts":_8c5,"url":url};
},_setContent:function(cont){
this.destroyChildren();
for(var i=0;i<this._styleNodes.length;i++){
if(this._styleNodes[i]&&this._styleNodes[i].parentNode){
this._styleNodes[i].parentNode.removeChild(this._styleNodes[i]);
}
}
this._styleNodes=[];
try{
var node=this.containerNode||this.domNode;
while(node.firstChild){
dojo.html.destroyNode(node.firstChild);
}
if(typeof cont!="string"){
node.appendChild(cont);
}else{
node.innerHTML=cont;
}
}
catch(e){
e.text="Couldn't load content:"+e.description;
this._handleDefaults(e,"onContentError");
}
},setContent:function(data){
this.abort();
if(this._callOnUnload){
this.onUnload();
}
this._callOnUnload=true;
if(!data||dojo.html.isNode(data)){
this._setContent(data);
this.onResized();
this.onLoad();
}else{
if(typeof data.xml!="string"){
this.href="";
data=this.splitAndFixPaths(data);
}
this._setContent(data.xml);
for(var i=0;i<data.styles.length;i++){
if(data.styles[i].path){
this._styleNodes.push(dojo.html.insertCssFile(data.styles[i].path,dojo.doc(),false,true));
}else{
this._styleNodes.push(dojo.html.insertCssText(data.styles[i]));
}
}
if(this.parseContent){
for(var i=0;i<data.requires.length;i++){
try{
eval(data.requires[i]);
}
catch(e){
e.text="ContentPane: error in package loading calls, "+(e.description||e);
this._handleDefaults(e,"onContentError","debug");
}
}
}
var _8e0=this;
function asyncParse(){
if(_8e0.executeScripts){
_8e0._executeScripts(data.scripts);
}
if(_8e0.parseContent){
var node=_8e0.containerNode||_8e0.domNode;
var _8e2=new dojo.xml.Parse();
var frag=_8e2.parseElement(node,null,true);
dojo.widget.getParser().createSubComponents(frag,_8e0);
}
_8e0.onResized();
_8e0.onLoad();
}
if(dojo.hostenv.isXDomain&&data.requires.length){
dojo.addOnLoad(asyncParse);
}else{
asyncParse();
}
}
},setHandler:function(_8e4){
var fcn=dojo.lang.isFunction(_8e4)?_8e4:window[_8e4];
if(!dojo.lang.isFunction(fcn)){
this._handleDefaults("Unable to set handler, '"+_8e4+"' not a function.","onExecError",true);
return;
}
this.handler=function(){
return fcn.apply(this,arguments);
};
},_runHandler:function(){
var ret=true;
if(dojo.lang.isFunction(this.handler)){
this.handler(this,this.domNode);
ret=false;
}
this.onLoad();
return ret;
},_executeScripts:function(_8e7){
var self=this;
var tmp="",code="";
for(var i=0;i<_8e7.length;i++){
if(_8e7[i].path){
dojo.io.bind(this._cacheSetting({"url":_8e7[i].path,"load":function(type,_8ed){
dojo.lang.hitch(self,tmp=";"+_8ed);
},"error":function(type,_8ef){
_8ef.text=type+" downloading remote script";
self._handleDefaults.call(self,_8ef,"onExecError","debug");
},"mimetype":"text/plain","sync":true},this.cacheContent));
code+=tmp;
}else{
code+=_8e7[i];
}
}
try{
if(this.scriptSeparation){
delete this.scriptScope;
this.scriptScope=new (new Function("_container_",code+"; return this;"))(self);
}else{
var djg=dojo.global();
if(djg.execScript){
djg.execScript(code);
}else{
var djd=dojo.doc();
var sc=djd.createElement("script");
sc.appendChild(djd.createTextNode(code));
(this.containerNode||this.domNode).appendChild(sc);
}
}
}
catch(e){
e.text="Error running scripts from content:\n"+e.description;
this._handleDefaults(e,"onExecError","debug");
}
}});
dojo.provide("dojo.html.iframe");
dojo.html.iframeContentWindow=function(_8f3){
var win=dojo.html.getDocumentWindow(dojo.html.iframeContentDocument(_8f3))||dojo.html.iframeContentDocument(_8f3).__parent__||(_8f3.name&&document.frames[_8f3.name])||null;
return win;
};
dojo.html.iframeContentDocument=function(_8f5){
var doc=_8f5.contentDocument||((_8f5.contentWindow)&&(_8f5.contentWindow.document))||((_8f5.name)&&(document.frames[_8f5.name])&&(document.frames[_8f5.name].document))||null;
return doc;
};
dojo.html.BackgroundIframe=function(node){
if(dojo.render.html.ie55||dojo.render.html.ie60){
var html="<iframe src='javascript:false'"+" style='position: absolute; left: 0px; top: 0px; width: 100%; height: 100%;"+"z-index: -1; filter:Alpha(Opacity=\"0\");' "+">";
this.iframe=dojo.doc().createElement(html);
this.iframe.tabIndex=-1;
if(node){
node.appendChild(this.iframe);
this.domNode=node;
}else{
dojo.body().appendChild(this.iframe);
this.iframe.style.display="none";
}
}
};
dojo.lang.extend(dojo.html.BackgroundIframe,{iframe:null,onResized:function(){
if(this.iframe&&this.domNode&&this.domNode.parentNode){
var _8f9=dojo.html.getMarginBox(this.domNode);
if(_8f9.width==0||_8f9.height==0){
dojo.lang.setTimeout(this,this.onResized,100);
return;
}
this.iframe.style.width=_8f9.width+"px";
this.iframe.style.height=_8f9.height+"px";
}
},size:function(node){
if(!this.iframe){
return;
}
var _8fb=dojo.html.toCoordinateObject(node,true,dojo.html.boxSizing.BORDER_BOX);
with(this.iframe.style){
width=_8fb.width+"px";
height=_8fb.height+"px";
left=_8fb.left+"px";
top=_8fb.top+"px";
}
},setZIndex:function(node){
if(!this.iframe){
return;
}
if(dojo.dom.isNode(node)){
this.iframe.style.zIndex=dojo.html.getStyle(node,"z-index")-1;
}else{
if(!isNaN(node)){
this.iframe.style.zIndex=node;
}
}
},show:function(){
if(this.iframe){
this.iframe.style.display="block";
}
},hide:function(){
if(this.iframe){
this.iframe.style.display="none";
}
},remove:function(){
if(this.iframe){
dojo.html.removeNode(this.iframe,true);
delete this.iframe;
this.iframe=null;
}
}});
dojo.provide("dojo.widget.Dialog");
dojo.declare("dojo.widget.ModalDialogBase",null,{isContainer:true,focusElement:"",bgColor:"black",bgOpacity:0.4,followScroll:true,closeOnBackgroundClick:false,trapTabs:function(e){
if(e.target==this.tabStartOuter){
if(this._fromTrap){
this.tabStart.focus();
this._fromTrap=false;
}else{
this._fromTrap=true;
this.tabEnd.focus();
}
}else{
if(e.target==this.tabStart){
if(this._fromTrap){
this._fromTrap=false;
}else{
this._fromTrap=true;
this.tabEnd.focus();
}
}else{
if(e.target==this.tabEndOuter){
if(this._fromTrap){
this.tabEnd.focus();
this._fromTrap=false;
}else{
this._fromTrap=true;
this.tabStart.focus();
}
}else{
if(e.target==this.tabEnd){
if(this._fromTrap){
this._fromTrap=false;
}else{
this._fromTrap=true;
this.tabStart.focus();
}
}
}
}
}
},clearTrap:function(e){
var _8ff=this;
setTimeout(function(){
_8ff._fromTrap=false;
},100);
},postCreate:function(){
with(this.domNode.style){
position="absolute";
zIndex=999;
display="none";
overflow="visible";
}
var b=dojo.body();
b.appendChild(this.domNode);
this.bg=document.createElement("div");
this.bg.className="dialogUnderlay";
with(this.bg.style){
position="absolute";
left=top="0px";
zIndex=998;
display="none";
}
b.appendChild(this.bg);
this.setBackgroundColor(this.bgColor);
this.bgIframe=new dojo.html.BackgroundIframe();
if(this.bgIframe.iframe){
with(this.bgIframe.iframe.style){
position="absolute";
left=top="0px";
zIndex=90;
display="none";
}
}
if(this.closeOnBackgroundClick){
dojo.event.kwConnect({srcObj:this.bg,srcFunc:"onclick",adviceObj:this,adviceFunc:"onBackgroundClick",once:true});
}
},uninitialize:function(){
this.bgIframe.remove();
dojo.html.removeNode(this.bg,true);
},setBackgroundColor:function(_901){
if(arguments.length>=3){
_901=new dojo.gfx.color.Color(arguments[0],arguments[1],arguments[2]);
}else{
_901=new dojo.gfx.color.Color(_901);
}
this.bg.style.backgroundColor=_901.toString();
return this.bgColor=_901;
},setBackgroundOpacity:function(op){
if(arguments.length==0){
op=this.bgOpacity;
}
dojo.html.setOpacity(this.bg,op);
try{
this.bgOpacity=dojo.html.getOpacity(this.bg);
}
catch(e){
this.bgOpacity=op;
}
return this.bgOpacity;
},_sizeBackground:function(){
if(this.bgOpacity>0){
var _903=dojo.html.getViewport();
var h=_903.height;
var w=_903.width;
with(this.bg.style){
width=w+"px";
height=h+"px";
}
var _906=dojo.html.getScroll().offset;
this.bg.style.top=_906.y+"px";
this.bg.style.left=_906.x+"px";
var _903=dojo.html.getViewport();
if(_903.width!=w){
this.bg.style.width=_903.width+"px";
}
if(_903.height!=h){
this.bg.style.height=_903.height+"px";
}
}
this.bgIframe.size(this.bg);
},_showBackground:function(){
if(this.bgOpacity>0){
this.bg.style.display="block";
}
if(this.bgIframe.iframe){
this.bgIframe.iframe.style.display="block";
}
},placeModalDialog:function(){
var _907=dojo.html.getScroll().offset;
var _908=dojo.html.getViewport();
var mb;
if(this.isShowing()){
mb=dojo.html.getMarginBox(this.domNode);
}else{
dojo.html.setVisibility(this.domNode,false);
dojo.html.show(this.domNode);
mb=dojo.html.getMarginBox(this.domNode);
dojo.html.hide(this.domNode);
dojo.html.setVisibility(this.domNode,true);
}
var x=_907.x+(_908.width-mb.width)/2;
var y=_907.y+(_908.height-mb.height)/2;
with(this.domNode.style){
left=x+"px";
top=y+"px";
}
},_onKey:function(evt){
if(evt.key){
var node=evt.target;
while(node!=null){
if(node==this.domNode){
return;
}
node=node.parentNode;
}
if(evt.key!=evt.KEY_TAB){
dojo.event.browser.stopEvent(evt);
}else{
if(!dojo.render.html.opera){
try{
this.tabStart.focus();
}
catch(e){
}
}
}
}
},showModalDialog:function(){
if(this.followScroll&&!this._scrollConnected){
this._scrollConnected=true;
dojo.event.connect(window,"onscroll",this,"_onScroll");
}
dojo.event.connect(document.documentElement,"onkey",this,"_onKey");
this.placeModalDialog();
this.setBackgroundOpacity();
this._sizeBackground();
this._showBackground();
this._fromTrap=true;
setTimeout(dojo.lang.hitch(this,function(){
try{
this.tabStart.focus();
}
catch(e){
}
}),50);
},hideModalDialog:function(){
if(this.focusElement){
dojo.byId(this.focusElement).focus();
dojo.byId(this.focusElement).blur();
}
this.bg.style.display="none";
this.bg.style.width=this.bg.style.height="1px";
if(this.bgIframe.iframe){
this.bgIframe.iframe.style.display="none";
}
dojo.event.disconnect(document.documentElement,"onkey",this,"_onKey");
if(this._scrollConnected){
this._scrollConnected=false;
dojo.event.disconnect(window,"onscroll",this,"_onScroll");
}
},_onScroll:function(){
var _90e=dojo.html.getScroll().offset;
this.bg.style.top=_90e.y+"px";
this.bg.style.left=_90e.x+"px";
this.placeModalDialog();
},checkSize:function(){
if(this.isShowing()){
this._sizeBackground();
this.placeModalDialog();
this.onResized();
}
},onBackgroundClick:function(){
if(this.lifetime-this.timeRemaining>=this.blockDuration){
return;
}
this.hide();
}});
dojo.widget.defineWidget("dojo.widget.Dialog",[dojo.widget.ContentPane,dojo.widget.ModalDialogBase],{templateString:"<div id=\"${this.widgetId}\" class=\"dojoDialog\" dojoattachpoint=\"wrapper\">\r\n\t<span dojoattachpoint=\"tabStartOuter\" dojoonfocus=\"trapTabs\" dojoonblur=\"clearTrap\"\ttabindex=\"0\"></span>\r\n\t<span dojoattachpoint=\"tabStart\" dojoonfocus=\"trapTabs\" dojoonblur=\"clearTrap\" tabindex=\"0\"></span>\r\n\t<div dojoattachpoint=\"containerNode\" style=\"position: relative; z-index: 2;\"></div>\r\n\t<span dojoattachpoint=\"tabEnd\" dojoonfocus=\"trapTabs\" dojoonblur=\"clearTrap\" tabindex=\"0\"></span>\r\n\t<span dojoattachpoint=\"tabEndOuter\" dojoonfocus=\"trapTabs\" dojoonblur=\"clearTrap\" tabindex=\"0\"></span>\r\n</div>\r\n",blockDuration:0,lifetime:0,closeNode:"",postMixInProperties:function(){
dojo.widget.Dialog.superclass.postMixInProperties.apply(this,arguments);
if(this.closeNode){
this.setCloseControl(this.closeNode);
}
},postCreate:function(){
dojo.widget.Dialog.superclass.postCreate.apply(this,arguments);
dojo.widget.ModalDialogBase.prototype.postCreate.apply(this,arguments);
},show:function(){
if(this.lifetime){
this.timeRemaining=this.lifetime;
if(this.timerNode){
this.timerNode.innerHTML=Math.ceil(this.timeRemaining/1000);
}
if(this.blockDuration&&this.closeNode){
if(this.lifetime>this.blockDuration){
this.closeNode.style.visibility="hidden";
}else{
this.closeNode.style.display="none";
}
}
if(this.timer){
clearInterval(this.timer);
}
this.timer=setInterval(dojo.lang.hitch(this,"_onTick"),100);
}
this.showModalDialog();
dojo.widget.Dialog.superclass.show.call(this);
},onLoad:function(){
this.placeModalDialog();
dojo.widget.Dialog.superclass.onLoad.call(this);
},fillInTemplate:function(){
},hide:function(){
this.hideModalDialog();
dojo.widget.Dialog.superclass.hide.call(this);
if(this.timer){
clearInterval(this.timer);
}
},setTimerNode:function(node){
this.timerNode=node;
},setCloseControl:function(node){
this.closeNode=dojo.byId(node);
dojo.event.connect(this.closeNode,"onclick",this,"hide");
},setShowControl:function(node){
node=dojo.byId(node);
dojo.event.connect(node,"onclick",this,"show");
},_onTick:function(){
if(this.timer){
this.timeRemaining-=100;
if(this.lifetime-this.timeRemaining>=this.blockDuration){
if(this.closeNode){
this.closeNode.style.visibility="visible";
}
}
if(!this.timeRemaining){
clearInterval(this.timer);
this.hide();
}else{
if(this.timerNode){
this.timerNode.innerHTML=Math.ceil(this.timeRemaining/1000);
}
}
}
}});
dojo.provide("dojo.namespaces.dojo");
(function(){
var map={html:{"accordioncontainer":"dojo.widget.AccordionContainer","animatedpng":"dojo.widget.AnimatedPng","button":"dojo.widget.Button","chart":"dojo.widget.Chart","checkbox":"dojo.widget.Checkbox","clock":"dojo.widget.Clock","colorpalette":"dojo.widget.ColorPalette","combobox":"dojo.widget.ComboBox","combobutton":"dojo.widget.Button","contentpane":"dojo.widget.ContentPane","currencytextbox":"dojo.widget.CurrencyTextbox","datepicker":"dojo.widget.DatePicker","datetextbox":"dojo.widget.DateTextbox","debugconsole":"dojo.widget.DebugConsole","dialog":"dojo.widget.Dialog","dropdownbutton":"dojo.widget.Button","dropdowndatepicker":"dojo.widget.DropdownDatePicker","dropdowntimepicker":"dojo.widget.DropdownTimePicker","emaillisttextbox":"dojo.widget.InternetTextbox","emailtextbox":"dojo.widget.InternetTextbox","editor":"dojo.widget.Editor","editor2":"dojo.widget.Editor2","filteringtable":"dojo.widget.FilteringTable","fisheyelist":"dojo.widget.FisheyeList","fisheyelistitem":"dojo.widget.FisheyeList","floatingpane":"dojo.widget.FloatingPane","modalfloatingpane":"dojo.widget.FloatingPane","form":"dojo.widget.Form","googlemap":"dojo.widget.GoogleMap","inlineeditbox":"dojo.widget.InlineEditBox","integerspinner":"dojo.widget.Spinner","integertextbox":"dojo.widget.IntegerTextbox","ipaddresstextbox":"dojo.widget.InternetTextbox","layoutcontainer":"dojo.widget.LayoutContainer","linkpane":"dojo.widget.LinkPane","popupmenu2":"dojo.widget.Menu2","menuitem2":"dojo.widget.Menu2","menuseparator2":"dojo.widget.Menu2","menubar2":"dojo.widget.Menu2","menubaritem2":"dojo.widget.Menu2","pagecontainer":"dojo.widget.PageContainer","pagecontroller":"dojo.widget.PageContainer","popupcontainer":"dojo.widget.PopupContainer","progressbar":"dojo.widget.ProgressBar","radiogroup":"dojo.widget.RadioGroup","realnumbertextbox":"dojo.widget.RealNumberTextbox","regexptextbox":"dojo.widget.RegexpTextbox","repeater":"dojo.widget.Repeater","resizabletextarea":"dojo.widget.ResizableTextarea","richtext":"dojo.widget.RichText","select":"dojo.widget.Select","show":"dojo.widget.Show","showaction":"dojo.widget.ShowAction","showslide":"dojo.widget.ShowSlide","slidervertical":"dojo.widget.Slider","sliderhorizontal":"dojo.widget.Slider","slider":"dojo.widget.Slider","slideshow":"dojo.widget.SlideShow","sortabletable":"dojo.widget.SortableTable","splitcontainer":"dojo.widget.SplitContainer","tabcontainer":"dojo.widget.TabContainer","tabcontroller":"dojo.widget.TabContainer","taskbar":"dojo.widget.TaskBar","textbox":"dojo.widget.Textbox","timepicker":"dojo.widget.TimePicker","timetextbox":"dojo.widget.DateTextbox","titlepane":"dojo.widget.TitlePane","toaster":"dojo.widget.Toaster","toggler":"dojo.widget.Toggler","toolbar":"dojo.widget.Toolbar","toolbarcontainer":"dojo.widget.Toolbar","toolbaritem":"dojo.widget.Toolbar","toolbarbuttongroup":"dojo.widget.Toolbar","toolbarbutton":"dojo.widget.Toolbar","toolbardialog":"dojo.widget.Toolbar","toolbarmenu":"dojo.widget.Toolbar","toolbarseparator":"dojo.widget.Toolbar","toolbarspace":"dojo.widget.Toolbar","toolbarselect":"dojo.widget.Toolbar","toolbarcolordialog":"dojo.widget.Toolbar","tooltip":"dojo.widget.Tooltip","tree":"dojo.widget.Tree","treebasiccontroller":"dojo.widget.TreeBasicController","treecontextmenu":"dojo.widget.TreeContextMenu","treedisablewrapextension":"dojo.widget.TreeDisableWrapExtension","treedociconextension":"dojo.widget.TreeDocIconExtension","treeeditor":"dojo.widget.TreeEditor","treeemphasizeonselect":"dojo.widget.TreeEmphasizeOnSelect","treeexpandtonodeonselect":"dojo.widget.TreeExpandToNodeOnSelect","treelinkextension":"dojo.widget.TreeLinkExtension","treeloadingcontroller":"dojo.widget.TreeLoadingController","treemenuitem":"dojo.widget.TreeContextMenu","treenode":"dojo.widget.TreeNode","treerpccontroller":"dojo.widget.TreeRPCController","treeselector":"dojo.widget.TreeSelector","treetoggleonselect":"dojo.widget.TreeToggleOnSelect","treev3":"dojo.widget.TreeV3","treebasiccontrollerv3":"dojo.widget.TreeBasicControllerV3","treecontextmenuv3":"dojo.widget.TreeContextMenuV3","treedndcontrollerv3":"dojo.widget.TreeDndControllerV3","treeloadingcontrollerv3":"dojo.widget.TreeLoadingControllerV3","treemenuitemv3":"dojo.widget.TreeContextMenuV3","treerpccontrollerv3":"dojo.widget.TreeRpcControllerV3","treeselectorv3":"dojo.widget.TreeSelectorV3","urltextbox":"dojo.widget.InternetTextbox","usphonenumbertextbox":"dojo.widget.UsTextbox","ussocialsecuritynumbertextbox":"dojo.widget.UsTextbox","usstatetextbox":"dojo.widget.UsTextbox","usziptextbox":"dojo.widget.UsTextbox","validationtextbox":"dojo.widget.ValidationTextbox","treeloadingcontroller":"dojo.widget.TreeLoadingController","wizardcontainer":"dojo.widget.Wizard","wizardpane":"dojo.widget.Wizard","yahoomap":"dojo.widget.YahooMap"},svg:{"chart":"dojo.widget.svg.Chart"},vml:{"chart":"dojo.widget.vml.Chart"}};
dojo.addDojoNamespaceMapping=function(_913,_914){
map[_913]=_914;
};
function dojoNamespaceResolver(name,_916){
if(!_916){
_916="html";
}
if(!map[_916]){
return null;
}
return map[_916][name];
}
dojo.registerNamespaceResolver("dojo",dojoNamespaceResolver);
})();
dojo.provide("dojo.html.selection");
dojo.html.selectionType={NONE:0,TEXT:1,CONTROL:2};
dojo.html.clearSelection=function(){
var _917=dojo.global();
var _918=dojo.doc();
try{
if(_917["getSelection"]){
if(dojo.render.html.safari){
_917.getSelection().collapse();
}else{
_917.getSelection().removeAllRanges();
}
}else{
if(_918.selection){
if(_918.selection.empty){
_918.selection.empty();
}else{
if(_918.selection.clear){
_918.selection.clear();
}
}
}
}
return true;
}
catch(e){
dojo.debug(e);
return false;
}
};
dojo.html.disableSelection=function(_919){
_919=dojo.byId(_919)||dojo.body();
var h=dojo.render.html;
if(h.mozilla){
_919.style.MozUserSelect="none";
}else{
if(h.safari){
_919.style.KhtmlUserSelect="none";
}else{
if(h.ie){
_919.unselectable="on";
}else{
return false;
}
}
}
return true;
};
dojo.html.enableSelection=function(_91b){
_91b=dojo.byId(_91b)||dojo.body();
var h=dojo.render.html;
if(h.mozilla){
_91b.style.MozUserSelect="";
}else{
if(h.safari){
_91b.style.KhtmlUserSelect="";
}else{
if(h.ie){
_91b.unselectable="off";
}else{
return false;
}
}
}
return true;
};
dojo.html.selectElement=function(_91d){
dojo.deprecated("dojo.html.selectElement","replaced by dojo.html.selection.selectElementChildren",0.5);
};
dojo.html.selectInputText=function(_91e){
var _91f=dojo.global();
var _920=dojo.doc();
_91e=dojo.byId(_91e);
if(_920["selection"]&&dojo.body()["createTextRange"]){
var _921=_91e.createTextRange();
_921.moveStart("character",0);
_921.moveEnd("character",_91e.value.length);
_921.select();
}else{
if(_91f["getSelection"]){
var _922=_91f.getSelection();
_91e.setSelectionRange(0,_91e.value.length);
}
}
_91e.focus();
};
dojo.html.isSelectionCollapsed=function(){
dojo.deprecated("dojo.html.isSelectionCollapsed","replaced by dojo.html.selection.isCollapsed",0.5);
return dojo.html.selection.isCollapsed();
};
dojo.lang.mixin(dojo.html.selection,{getType:function(){
if(dojo.doc()["selection"]){
return dojo.html.selectionType[dojo.doc().selection.type.toUpperCase()];
}else{
var _923=dojo.html.selectionType.TEXT;
var oSel;
try{
oSel=dojo.global().getSelection();
}
catch(e){
}
if(oSel&&oSel.rangeCount==1){
var _925=oSel.getRangeAt(0);
if(_925.startContainer==_925.endContainer&&(_925.endOffset-_925.startOffset)==1&&_925.startContainer.nodeType!=dojo.dom.TEXT_NODE){
_923=dojo.html.selectionType.CONTROL;
}
}
return _923;
}
},isCollapsed:function(){
var _926=dojo.global();
var _927=dojo.doc();
if(_927["selection"]){
return _927.selection.createRange().text=="";
}else{
if(_926["getSelection"]){
var _928=_926.getSelection();
if(dojo.lang.isString(_928)){
return _928=="";
}else{
return _928.isCollapsed||_928.toString()=="";
}
}
}
},getSelectedElement:function(){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
if(dojo.doc()["selection"]){
var _929=dojo.doc().selection.createRange();
if(_929&&_929.item){
return dojo.doc().selection.createRange().item(0);
}
}else{
var _92a=dojo.global().getSelection();
return _92a.anchorNode.childNodes[_92a.anchorOffset];
}
}
},getParentElement:function(){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
var p=dojo.html.selection.getSelectedElement();
if(p){
return p.parentNode;
}
}else{
if(dojo.doc()["selection"]){
return dojo.doc().selection.createRange().parentElement();
}else{
var _92c=dojo.global().getSelection();
if(_92c){
var node=_92c.anchorNode;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.parentNode;
}
return node;
}
}
}
},getSelectedText:function(){
if(dojo.doc()["selection"]){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
return null;
}
return dojo.doc().selection.createRange().text;
}else{
var _92e=dojo.global().getSelection();
if(_92e){
return _92e.toString();
}
}
},getSelectedHtml:function(){
if(dojo.doc()["selection"]){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
return null;
}
return dojo.doc().selection.createRange().htmlText;
}else{
var _92f=dojo.global().getSelection();
if(_92f&&_92f.rangeCount){
var frag=_92f.getRangeAt(0).cloneContents();
var div=document.createElement("div");
div.appendChild(frag);
return div.innerHTML;
}
return null;
}
},hasAncestorElement:function(_932){
return (dojo.html.selection.getAncestorElement.apply(this,arguments)!=null);
},getAncestorElement:function(_933){
var node=dojo.html.selection.getSelectedElement()||dojo.html.selection.getParentElement();
while(node){
if(dojo.html.selection.isTag(node,arguments).length>0){
return node;
}
node=node.parentNode;
}
return null;
},isTag:function(node,tags){
if(node&&node.tagName){
for(var i=0;i<tags.length;i++){
if(node.tagName.toLowerCase()==String(tags[i]).toLowerCase()){
return String(tags[i]).toLowerCase();
}
}
}
return "";
},selectElement:function(_938){
var _939=dojo.global();
var _93a=dojo.doc();
_938=dojo.byId(_938);
if(_93a.selection&&dojo.body().createTextRange){
try{
var _93b=dojo.body().createControlRange();
_93b.addElement(_938);
_93b.select();
}
catch(e){
dojo.html.selection.selectElementChildren(_938);
}
}else{
if(_939["getSelection"]){
var _93c=_939.getSelection();
if(_93c["removeAllRanges"]){
var _93b=_93a.createRange();
_93b.selectNode(_938);
_93c.removeAllRanges();
_93c.addRange(_93b);
}
}
}
},selectElementChildren:function(_93d){
var _93e=dojo.global();
var _93f=dojo.doc();
_93d=dojo.byId(_93d);
if(_93f.selection&&dojo.body().createTextRange){
var _940=dojo.body().createTextRange();
_940.moveToElementText(_93d);
_940.select();
}else{
if(_93e["getSelection"]){
var _941=_93e.getSelection();
if(_941["setBaseAndExtent"]){
_941.setBaseAndExtent(_93d,0,_93d,_93d.innerText.length-1);
}else{
if(_941["selectAllChildren"]){
_941.selectAllChildren(_93d);
}
}
}
}
},getBookmark:function(){
var _942;
var _943=dojo.doc();
if(_943["selection"]){
var _944=_943.selection.createRange();
_942=_944.getBookmark();
}else{
var _945;
try{
_945=dojo.global().getSelection();
}
catch(e){
}
if(_945){
var _944=_945.getRangeAt(0);
_942=_944.cloneRange();
}else{
dojo.debug("No idea how to store the current selection for this browser!");
}
}
return _942;
},moveToBookmark:function(_946){
var _947=dojo.doc();
if(_947["selection"]){
var _948=_947.selection.createRange();
_948.moveToBookmark(_946);
_948.select();
}else{
var _949;
try{
_949=dojo.global().getSelection();
}
catch(e){
}
if(_949&&_949["removeAllRanges"]){
_949.removeAllRanges();
_949.addRange(_946);
}else{
dojo.debug("No idea how to restore selection for this browser!");
}
}
},collapse:function(_94a){
if(dojo.global()["getSelection"]){
var _94b=dojo.global().getSelection();
if(_94b.removeAllRanges){
if(_94a){
_94b.collapseToStart();
}else{
_94b.collapseToEnd();
}
}else{
dojo.global().getSelection().collapse(_94a);
}
}else{
if(dojo.doc().selection){
var _94c=dojo.doc().selection.createRange();
_94c.collapse(_94a);
_94c.select();
}
}
},remove:function(){
if(dojo.doc().selection){
var _94d=dojo.doc().selection;
if(_94d.type.toUpperCase()!="NONE"){
_94d.clear();
}
return _94d;
}else{
var _94d=dojo.global().getSelection();
for(var i=0;i<_94d.rangeCount;i++){
_94d.getRangeAt(i).deleteContents();
}
return _94d;
}
}});
dojo.provide("dojo.style");
dojo.kwCompoundRequire({browser:["dojo.html.style"]});
dojo.deprecated("dojo.style","replaced by dojo.html.style","0.5");
dojo.lang.mixin(dojo.style,dojo.html);
turbo={turbo:{}};
turbo.global=this;
turbo.require=dojo.require;
turbo.provide=dojo.provide;
turbo.provide("turbo.lib.plumbing");
if(dojo.version.revision>4770){
turbo.style=dojo.html;
turbo.getAbsoluteX=function(){
return dojo.html.getAbsolutePosition.apply(dojo.html,arguments).x;
};
turbo.getAbsoluteY=function(){
return dojo.html.getAbsolutePosition.apply(dojo.html,arguments).y;
};
turbo.setMarginBoxSize=function(_94f,inW,inH){
dojo.html.setMarginBox(_94f,{width:(inW>=0?inW:undefined),height:(inH>=0?inH:undefined)});
};
turbo.disableSelection=dojo.html.disableSelection;
}else{
turbo.style=dojo.style;
turbo.disableSelection=dojo.style.disableSelection;
turbo.getAbsoluteX=dojo.style.getAbsoluteX;
turbo.setMarginBoxSize=function(_952,inW,inH){
if(inW>=0){
dojo.style.setMarginBox(_952,{width:inW});
}
if(inH>=0){
dojo.style.setMarginBox(_952,{height:inH});
}
};
}
dojo.require("dojo.io");
turbo.io=dojo.io;
turbo.widget=dojo.widget;
turbo.env=dojo.render.html;
turbo.uri=dojo.uri.dojoUri;
turbo.evalObjPath=dojo.evalObjPath;
turbo.isArray=dojo.lang.isArray;
turbo.isObject=dojo.lang.isObject;
turbo.isString=dojo.lang.isString;
turbo.isUndefined=dojo.lang.isUndefined;
turbo.inArray=dojo.lang.inArray;
turbo.mixin=dojo.lang.mixin;
turbo.declare=dojo.declare;
turbo.defineClass=dojo.declare;
turbo.defineWidget=dojo.widget.defineWidget;
turbo.escapeXml=dojo.string.escapeXml;
turbo.getFirstAncestorByTag=dojo.dom.getFirstAncestorByTag;
turbo.isDescendantOf=dojo.dom.isDescendantOf;
turbo.addClass=dojo.html.addClass;
turbo.removeClass=dojo.html.removeClass;
turbo.event=dojo.event;
turbo.connect=dojo.event.connect;
turbo.disconnect=dojo.event.disconnect;
if(!this.dojo){
throw new Exception("Requires Dojo toolkit");
}
dojo.provide("turbo.turbo");
turbo.global=this;
turbo.require=dojo.require;
turbo.provide=dojo.provide;
dojo.registerModulePath("turbo","../turbo");
turbo.require("turbo.lib.plumbing");
turbo.isGoodIndex=function(_955,_956){
return (_955&&_956>=0&&_956<_955.length);
};
turbo.moveIndex=function(_957,_958,_959){
if(_957==_958){
return _959-(_957<_959);
}
return _957-(_957>_958)+(_957>=_959);
};
turbo.filter=function(_95a,_95b,_95c){
_95c=(_95c||dj_global);
var _95d=[];
for(var i=0,elt;i<_95a.length;i++){
elt=_95b.call(_95c,_95a[i]);
if(elt!==undefined){
_95d.push(elt);
}
}
return _95d;
};
turbo.arrayInsert=function(_960,_961,_962){
if(_960.length<=_961){
_960[_961]=_962;
}else{
_960.splice(_961,0,_962);
}
};
turbo.arrayRemove=function(_963,_964){
_963.splice(_964,1);
};
turbo.arraySwap=function(_965,inI,inJ){
var _968=_965[inI];
_965[inI]=_965[inJ];
_965[inJ]=_968;
};
turbo.arrayMove=function(_969,_96a,_96b){
var e=_969[_96a];
_969.splice(_96a,1);
turbo.arrayInsert(_969,(_96b<_96a?_96b:_96b-1),e);
};
turbo.arrayDup=function(_96d){
return _96d.slice(0);
};
turbo.cat=function(){
if(turbo.env.ie){
return turbo.cloneArguments(arguments).join("");
}else{
var s="";
for(var i=0,l=arguments.length;i<l;i++){
s+=arguments[i];
}
return s;
}
};
turbo.stringOf=function(_971,_972){
if(_971<=0){
return "";
}
var _973=new Array(_971);
for(var i=0;i<_971;i++){
_973[i]=_972;
}
return _973.join("");
};
turbo.alphabetizeIndex=function(_975){
var _976=function(c){
return String.fromCharCode("A".charCodeAt(0)+c);
};
var a=Math.floor(_975/26);
return (a>0?_976(a-1):"")+_976(_975%26);
};
turbo.pathpop=function(_979,_97a){
var _97b=_979.lastIndexOf((_97a==undefined?"/":_97a));
return (_97b>=0?_979.substring(0,_97b):"");
};
turbo.escapeText=function(_97c){
return turbo.escapeXml(String(_97c)).replace(/\n/g,"<br />");
};
turbo.conjoin=function(_97d,_97e,_97f){
return _97e+_97d.join(_97f+_97e)+_97f;
};
turbo.supplant=function(s,o){
var i,j;
for(;;){
i=s.lastIndexOf("{");
if(i<0){
break;
}
j=s.indexOf("}",i);
if(i+1>=j){
break;
}
s=s.substring(0,i)+o[s.substring(i+1,j)]+s.substring(j+1);
}
return s;
};
turbo.printf=function(s){
for(var a=1,i=0,r;a<arguments.length;){
i=s.indexOf("%",i);
if(i==-1){
break;
}
if(s.charAt(i+1)=="%"){
r="%";
}else{
r=arguments[a++];
}
s=s.substring(0,i)+r+s.substring(i+2);
if(r=="%"){
i++;
}
}
return (s==undefined?"":s);
};
turbo.stringReplace=function(_988,_989,_98a){
if(!turbo.env.safari){
return _988.replace(_989,_98a);
}
var str=_988;
var _98c=_98a;
var reg=_989;
var _98e=[];
var _98f=reg.lastIndex;
var re;
while((re=reg.exec(str))!=null){
var idx=re.index;
var args=re.concat(idx,str);
_98e.push(str.slice(_98f,idx),_98c.apply(null,args).toString());
if(!reg.global){
_98f+=(RegExp.lastMatch?RegExp.lastMatch.length:0);
break;
}else{
_98f=reg.lastIndex;
}
}
_98e.push(str.slice(_98f));
return _98e.join("");
};
turbo.macros=new function(){
this.apply=function(_993,_994){
return turbo.stringReplace(_993,new RegExp("%%([^%]*)%%","ig"),function(w,m){
return (_994[m]?_994[m]:m);
});
};
this.interpolate=function(_997){
for(var i in _997){
_997[i]=this.apply(_997[i],_997);
}
return _997;
};
this.insert=function(_999,_99a){
if(!_99a){
return _999;
}
_99a=(turbo.isString(_99a)?eval("("+_99a+")"):_99a);
_99a=this.interpolate(_99a);
return this.apply(_999,_99a);
};
};
turbo.time=function(){
return new Date().getTime();
};
turbo.clamp=function(_99b,_99c,_99d){
return Math.max(_99c,Math.min(_99d,_99b));
};
turbo.mix=function(){
var obj={};
for(var i=0,l=arguments.length;i<l;i++){
turbo.mixin(obj,arguments[i]);
}
return obj;
};
turbo._swiss=function(_9a1,_9a2){
for(var i in _9a1){
_9a2[i]=_9a1[i];
}
return _9a2;
};
turbo.swiss=function(_9a4,_9a5){
if(!_9a4||!_9a5){
return;
}
if(!turbo.isArray(_9a4)){
turbo._swiss(_9a4,_9a5);
}else{
for(var i=0,l=_9a4.length;i<l;i++){
turbo._swiss(_9a4[i],_9a5);
}
}
return _9a5;
};
turbo.stringToReference=function(_9a8){
var obj=turbo.global;
var _9aa=_9a8.split(".");
var prop=_9aa.pop();
while(_9aa.length&&obj){
obj=obj[_9aa.shift()];
}
return (prop&&(prop in obj)?obj[prop]:null);
};
turbo.emptyFunction=function(){
};
turbo.nop=turbo.emptyFunction;
turbo.cloneArguments=function(_9ac,_9ad){
var i=(_9ad||0);
var l=_9ac.length;
var _9b0=new Array(l-i);
for(j=0;i<l;i++,j++){
_9b0[j]=_9ac[i];
}
return _9b0;
};
turbo.bind=function(_9b1,_9b2){
if(_9b2){
if(turbo.isString(_9b2)){
_9b2=_9b1[_9b2];
}
return function(){
return _9b2.apply(_9b1,arguments);
};
}else{
turbo.debug("turbo.bind called with null method");
return turbo.nop;
}
};
turbo.tie=function(_9b3,_9b4){
for(var i=1,a=arguments[i];a;a=arguments[++i]){
_9b3[a]=turbo.bind(_9b3,a);
}
return _9b3[arguments[1]];
};
turbo.bindArgs=function(_9b7,_9b8){
if(!_9b8){
turbo.debug("turbo.bindArgs called with null method");
return turbo.nop;
}
if(turbo.isString(_9b8)){
_9b8=_9b7[_9b8];
}
var _9b9=turbo.cloneArguments(arguments,2);
return function(){
return _9b8.apply(_9b7,_9b9.concat(turbo.cloneArguments(arguments)));
};
};
turbo.defer=function(_9ba,_9bb){
if(arguments.length>3){
var args=turbo.cloneArguments(arguments);
var _9bd=args.pop();
return window.setTimeout(turbo.bindArgs.apply(turbo,args),_9bd);
}
if(arguments.length>2){
return window.setTimeout(turbo.bind(arguments[0],arguments[1]),arguments[2]);
}else{
return window.setTimeout(arguments[0],arguments[1]);
}
};
turbo.deferUntil=function(evt,_9bf,_9c0,_9c1){
_9c1=(_9c1||5000);
_9c0=(_9c0||100);
var func=function(){
if(evt()){
window.clearInterval(job);
_9bf();
}else{
_9c1-=_9c0;
if(_9c1<=0){
window.clearInterval(job);
}
}
};
var job=window.setInterval(func,_9c0);
};
turbo.cancel=function(_9c4){
if(_9c4){
window.clearTimeout(_9c4);
}
};
turbo.jobs=[];
turbo.job=function(_9c5,_9c6,_9c7){
turbo.cancel(turbo.jobs[_9c5]);
var job=function(){
delete turbo.jobs[_9c5];
_9c7();
};
turbo.jobs[_9c5]=turbo.defer(job,_9c6);
};
turbo.getFunction=turbo.stringToReference;
turbo.$=function(_9c9,_9ca){
return (!_9c9?null:(!turbo.isString(_9c9)?_9c9:(_9ca?_9ca:document).getElementById(_9c9)));
};
turbo.create=function(_9cb){
return document.createElement(_9cb);
};
turbo.remove=function(_9cc){
_9cc=turbo.$(_9cc);
if(_9cc&&_9cc.parentNode){
_9cc.parentNode.removeChild(_9cc);
}
return _9cc;
};
turbo.append=function(_9cd,_9ce){
(_9ce?_9ce:document.body).appendChild(_9cd);
};
turbo.addBodyNode=function(_9cf){
document.body.appendChild(_9cf);
};
turbo.addHeadNode=function(_9d0){
document.getElementsByTagName("head").item(0).appendChild(_9d0);
};
turbo.marshall=function(){
var id="";
var _9d2=dj_global;
for(var i=0;i<arguments.length;i++){
id=arguments[i];
if(i==0&&!turbo.isString(i)){
_9d2=id;
}else{
if(!_9d2[id]){
_9d2[id]=turbo.$(id);
}
}
}
return dj_global[id];
};
turbo.getTagName=function(_9d4){
var node=turbo.$(_9d4);
return (node&&node.tagName?node.tagName.toLowerCase():"");
};
turbo.indexInParent=function(_9d6){
var i=0,n,p=_9d6.parentNode;
while(n=p.childNodes[i++]){
if(n==_9d6){
return i-1;
}
}
return -1;
};
turbo.kids=function(_9da,_9db){
var _9dc=[];
var i=0,n;
while(n=_9da.childNodes[i++]){
if(turbo.getTagName(n)==_9db){
_9dc.push(n);
}
}
return _9dc;
};
turbo.divkids=function(_9df){
return turbo.kids(_9df,"div");
};
turbo.nthkid=function(_9e0,inN,_9e2){
var _9e3=[];
var i=0,n;
while(n=_9e0.childNodes[i++]){
if(turbo.getTagName(n)==_9e2){
if(inN--==0){
return n;
}
}
}
return null;
};
turbo.nthdiv=function(_9e6,inN){
return turbo.nthkid(_9e6,inN,"div");
};
turbo.capture=function(_9e8){
if(_9e8.setCapture){
_9e8.setCapture();
}else{
document.addEventListener("mousemove",_9e8.onmousemove,true);
document.addEventListener("mouseup",_9e8.onmouseup,true);
}
};
turbo.release=function(_9e9){
if(_9e9.releaseCapture){
_9e9.releaseCapture();
}else{
document.removeEventListener("mousemove",_9e9.onmousemove,true);
document.removeEventListener("mouseup",_9e9.onmouseup,true);
}
};
turbo.getScrollbarWidth=function(){
if(turbo["_scrollBarWidth"]){
return turbo._scrollBarWidth;
}
turbo._scrollBarWidth=18;
try{
var e=document.createElement("div");
with(e.style){
top="0px";
left="0px";
width="100px";
height="100px";
overflow="scroll";
position="absolute";
visibility="hidden";
}
document.body.appendChild(e);
turbo._scrollBarWidth=e.offsetWidth-e.clientWidth;
document.body.removeChild(e);
delete e;
}
catch(ex){
}
return turbo._scrollBarWidth;
};
turbo.hasHorizontalScrollbar=function(_9eb){
return (_9eb.scrollWidth>_9eb.clientWidth);
};
turbo.preloads=[];
turbo.preloadImage=function(_9ec){
var i=new Image();
i.src=_9ec;
turbo.preloads.push(i);
};
turbo.setCursor=function(_9ee){
document.body.style.cursor=_9ee;
};
turbo.setBusyCursor=function(){
turbo.setCursor("wait");
};
turbo.setDefaultCursor=function(){
turbo.setCursor("default");
};
turbo.getStyleText=function(_9ef,_9f0){
if(turbo.isUndefined(_9ef.style.cssText)){
return _9ef.getAttribute("style");
}
return _9ef.style.cssText;
};
turbo.setStyleText=function(_9f1,_9f2){
if(turbo.isUndefined(_9f1.style.cssText)){
_9f1.setAttribute("style",_9f2);
}else{
_9f1.style.cssText=_9f2;
}
};
turbo.getSelectValue=function(_9f3){
var s=turbo.$(_9f3);
if(!s){
return "";
}
with(s.options[s.selectedIndex]){
return (value?value:innerHTML);
}
};
turbo.getCellIndex=function(inTd){
if(inTd.cellIndex){
return inTd.cellIndex;
}
var _9f6=inTd.parentNode.cells;
var l=_9f6.length;
for(var i=0;i<l;i++){
if(inTd==_9f6[i]){
return i;
}
}
return -1;
};
turbo.getRowIndex=function(inTr){
if(inTr.rowIndex&&inTr.rowIndex>=0){
return inTr.rowIndex;
}
var rows=inTr.parentNode.childNodes;
for(var i=0,l=rows.length;i<l;i++){
if(inTr==rows[i]){
return i;
}
}
return -1;
};
turbo.getTableRow=function(_9fd,_9fe){
if(!_9fd){
return null;
}
if(_9fd.rows&&_9fd.rows.length>0){
return _9fd.rows[_9fe];
}else{
if(_9fd.childNodes.length>_9fe){
return _9fd.childNodes[_9fe];
}else{
return null;
}
}
};
turbo.getWindowSize=function(){
if(window.innerWidth){
return {w:window.innerWidth,h:window.innerHeight};
}else{
return {w:document.documentElement.clientWidth,h:document.documentElement.clientHeight};
}
};
turbo.getContentSize=function(_9ff){
if(_9ff&&_9ff!=document.body){
var h=turbo.style.getContentBox(_9ff).height;
var w=turbo.style.getContentBox(_9ff).width;
return {w:w,h:h};
}else{
return turbo.getWindowSize();
}
};
turbo.getInnerSize=function(_a02){
if(_a02&&_a02!=document.body){
var w=turbo.style.getBorderBox(_a02).width;
var h=turbo.style.getBorderBox(_a02).height;
return {w:w,h:h};
}else{
return turbo.getWindowSize();
}
};
turbo.getOuterSize=function(_a05){
if(_a05&&_a05!=document.body){
var w=turbo.style.getMarginBox(_a05).width;
var h=turbo.style.getMarginBox(_a05).height;
return {w:w,h:h};
}else{
return turbo.getWindowSize();
}
};
turbo.setContentSize=function(_a08,inW,inH){
var siz=turbo.getContentSize(_a08);
if(inW>0&&inW!=siz.w){
_a08.style.width=inW+"px";
}
if(inH>0&&inH!=siz.h){
_a08.style.height=inH+"px";
}
};
turbo.setBounds=function(_a0c,inL,inT,inW,inH){
if(!_a0c){
return;
}
with(_a0c.style){
if(inL>=0){
left=inL+"px";
}
if(inT>=0){
top=inT+"px";
}
}
turbo.setMarginBoxSize(_a0c,inW,inH);
};
turbo.setStyle=function(_a11,_a12,_a13){
if(_a11&&_a11.style[_a12]!=_a13){
_a11.style[_a12]=_a13;
}
};
turbo.setStyleLeftPx=function(_a14,_a15){
turbo.setStyle(_a14,"left",_a15+"px");
};
turbo.setStyleTopPx=function(_a16,_a17){
turbo.setStyle(_a16,"top",_a17+"px");
};
turbo.setStyleWidthPx=function(_a18,_a19){
if(_a19>=0){
turbo.setStyle(_a18,"width",_a19+"px");
}
};
turbo.setStyleHeightPx=function(_a1a,_a1b){
if(_a1b>=0){
turbo.setStyle(_a1a,"height",_a1b+"px");
}
};
turbo.setStyleSizePx=function(_a1c,_a1d,_a1e){
turbo.setStyleWidthPx(_a1c,_a1d);
turbo.setStyleHeightPx(_a1c,_a1e);
};
turbo.setStyleBoundsPx=function(_a1f,_a20,_a21,_a22,_a23){
turbo.setVisibility(_a1f,false);
turbo.setStyleLeftPx(_a1f,_a20);
turbo.setStyleTopPx(_a1f,_a21);
turbo.setStyleWidthPx(_a1f,_a22);
turbo.setStyleHeightPx(_a1f,_a23);
turbo.setVisibility(_a1f,true);
};
turbo.setOuterStyleWidthPx=function(_a24,_a25){
if(_a24){
turbo.style.setMarginBox(_a24,{width:_a25});
}
};
turbo.setOuterStyleHeightPx=function(_a26,_a27){
if(_a26){
turbo.style.setMarginBox(_a26,{height:_a27});
}
};
turbo.debugOut=function(_a28){
dojo.debug(_a28);
};
turbo.debugArray=function(_a29){
for(var i=0,l=_a29.length;i<l;i++){
if(_a29[i]){
turbo.debug(i+":",_a29[i]);
}
}
};
turbo.debugNode=function(_a2c,_a2d){
turbo.debugOut(_a2d+"(node) "+_a2c.tagName);
};
turbo.debugObjs=[];
turbo.debugObject=function(_a2e,_a2f){
if(!_a2f){
_a2f="";
}
if(_a2e.nodeName){
turbo.debugNode(_a2e,_a2f);
}else{
if(_a2f.length>6*10){
turbo.debugOut(_a2f+"too deep");
}else{
if(turbo.inArray(turbo.debugObjs,_a2e)){
turbo.debugOut(_a2f+"(circular reference)");
}else{
var l=turbo.debugObjs.length;
turbo.debugObjs.push(_a2e);
try{
for(var name in _a2e){
var obj=_a2e[name];
s=_a2f+"| "+name;
if(obj!=null&&typeof (obj)=="object"){
turbo.debugOut(s+" = ("+(obj instanceof Array?"array":"object")+")");
turbo.debugObject(obj,_a2f+"......");
}else{
turbo.debugOut(s+" = "+obj);
}
}
}
finally{
delete turbo.debugObjs[l];
}
}
}
}
};
turbo.debugTop=function(_a33,_a34){
if(!_a34){
_a34="";
}
for(var name in _a33){
var obj=_a33[name];
s=_a34+name;
if(obj!=null&&typeof (obj)=="object"){
turbo.debugOut(s+" = ("+(obj instanceof Array?"array":"object")+")");
}else{
turbo.debugOut(s+" = "+obj);
}
}
};
turbo.debugf=function(){
turbo.debug(turbo.printf.apply(turbo,arguments));
};
turbo.debug=function(){
var c=arguments.length;
for(var i=0;i<c;i++){
if(turbo.isArray(arguments[i])){
turbo.debugArray(arguments[i]);
}else{
if(turbo.isObject(arguments[i])){
turbo.debugTop(arguments[i]);
}else{
turbo.debugOut(arguments[i]);
}
}
}
};
turbo.setShowing=function(_a39,_a3a){
_a39=turbo.$(_a39);
if(_a39&&_a39.style){
_a39.style.display=(_a3a?"":"none");
}
};
turbo.showHide=function(){
var l=arguments.length-1;
var show=arguments[l];
if(show!==true&&show!==false){
show=true;
l++;
}
for(var i=0;i<l;i++){
turbo.setShowing(arguments[i],show);
}
};
turbo.show=turbo.showHide;
turbo.hide=function(){
var l=arguments.length;
for(var i=0;i<l;i++){
turbo.setShowing(arguments[i],false);
}
};
turbo.isShowing=function(_a40){
_a40=turbo.$(_a40);
if(!_a40||(_a40["style"]&&turbo.style.getComputedStyle(_a40,"display")=="none")){
return false;
}else{
if(_a40["parentNode"]&&_a40.parentNode&&_a40.parentNode!=document.body){
return turbo.showing(_a40.parentNode);
}else{
return true;
}
}
};
turbo.showing=turbo.isShowing;
turbo.setVisibility=function(_a41,_a42){
_a41=turbo.$(_a41);
if(_a41&&_a41.style){
_a41.style.visibility=(_a42?"":"hidden");
}
};
turbo.setStyleProperties=function(_a43,_a44){
if(!_a43||!_a43.style){
return;
}
for(var i in _a44){
if(i=="opacity"){
turbo.style.setOpacity(_a43,_a44[i]);
}else{
if(i in _a43.style){
_a43.style[i]=_a44[i];
}
}
}
};
turbo.clean=function(_a46){
if(!_a46){
return;
}
var _a47=function(inW){
return inW.domNode&&turbo.isDescendantOf(inW.domNode,_a46,true);
};
var ws=turbo.widget.byFilter(_a47);
for(var i=0;i<ws.length;i++){
var w=ws[i];
if(turbo.widget.widgetIds[w.widgetId]==w){
w.destroy();
}
}
turbo.event.browser.clean(_a46);
};
turbo.funnelEvents=function(_a4c,_a4d,_a4e,_a4f){
var evts=(_a4f?_a4f:["mouseover","mouseout","mousemove","mousedown","mouseup","click","dblclick","keyup","keydown","keypress","contextmenu"]);
for(var i=0,l=evts.length;i<l;i++){
turbo.connect(_a4c,"on"+evts[i],_a4d,_a4e);
}
};
turbo.killEvent=function(e){
if(e){
turbo.event.browser.stopEvent(e);
}
};
turbo.parseWidgets=function(_a54,_a55){
try{
var n,_a57=new dojo.xml.Parse(),sids=(_a55?_a55:djConfig.searchIds);
if(sids&&sids.length>0){
for(var i=0,l=sids.length;i<l;i++){
n=document.getElementById(sids[i]);
if(n){
turbo.widget.getParser().createComponents(_a57.parseElement(n,null,true));
}
}
}else{
turbo.widget.getParser().createSubComponents(_a57.parseElement(_a54,null,true));
}
}
catch(e){
turbo.debug("turbo.makeWidgets: an exception was thrown",e);
}
};
turbo.widgetClick=function(id,_a5c){
var w=turbo.widget.byId("id");
var f=turbo.evalObjPath(onClick);
if(w&&f){
f.call(w);
}
};
turbo.scripts=[];
turbo.loadScript=function(_a5f){
if(turbo.scripts[_a5f]){
return;
}
turbo.scripts[_a5f]=true;
turbo.io.bind({url:_a5f,load:function(type,_a61){
},error:function(type,_a63){
},mimetype:"text/javascript",sync:true});
};
turbo.loadScriptByTag=function(_a64){
if(turbo.scripts[_a64]){
return;
}
turbo.scripts[_a64]=true;
var _a65=document.createElement("script");
_a65.type="text/javascript";
_a65.language="JavaScript";
turbo.addHeadNode(_a65);
_a65.src=_a64;
};
dojo.provide("turbo.lib.scrim");
turbo.defineClass("turbo.pool",null,{pool:[],findUnused:function(){
for(var i=this.pool.length-1;i>=0;i--){
if(!pool[i].__inuse){
return this.pool[i];
}
}
return false;
},create:function(){
},_create:function(){
var _a67=this.create();
this.pool.push(_a67);
},get:function(){
var _a68=this.findUnused()||this._create();
if(_a68){
_a68.__inuse=true;
}
return _a68;
},release:function(_a69){
if(_a69){
_a69.__inuse=false;
}
}});
turbo.scrim={pool:new turbo.pool(),createIFrame:function(){
var node=document.createElement("iframe");
node.setAttribute("frameBorder",0);
node.setAttribute("scrolling","no");
return node;
},createDiv:function(){
return document.createElement("div");
},createScrim:function(){
var node=(dojo.render.html.ie?turbo.scrim.createIFrame():turbo.scrim.createDiv());
node.isScrim=true;
return node;
},get:function(_a6c,inId,_a6e){
var node=turbo.scrim.pool.get();
node.scrimActive=true;
node.style.border=0;
node.style.position="absolute";
node.id=inId;
node.name=inId;
turbo.setStyleProperties(node,_a6e);
_a6c.appendChild(node);
turbo.scrim.size(node);
return node;
},release:function(_a70){
if(_a70.isScrim){
turbo.scrim.pool.release(_a70);
dojo.dom.removeNode(_a70);
}
},size:function(_a71){
var siz=turbo.getInnerSize(_a71.parentNode);
if(_a71.parentNode==document.body){
var _a73=0;
var aW=_a73;
var aH=_a73;
}else{
var aW=-turbo.style.getBorderWidth(_a71.parentNode);
var aH=-turbo.style.getBorderHeight(_a71.parentNode);
}
turbo.setBounds(_a71,0,0,siz.w+aW,siz.h+aH);
}};
turbo.scrim.pool.get=turbo.scrim.createScrim;
dojo.provide("turbo.lib.align");
dojo.require("turbo.turbo");
turbo.aligner=new function(){
this.enabled=false;
this.targets=[];
this.getAlignment=function(_a76){
return _a76.getAttribute("turboAlign")||_a76.getAttribute("turboalign");
};
this.visible=function(_a77){
return (turbo.style.getComputedStyle(_a77,"display")!="none");
};
this.listChildrenByAlignment=function(_a78,_a79){
var _a7a=[];
var node=_a78.firstChild;
while(node){
if(node.nodeType==1&&(this.getAlignment(node)==_a79)&&this.visible(node)){
_a7a.push(node);
}
node=node.nextSibling;
}
return _a7a;
};
this.listAlignedChildren=function(_a7c){
var _a7d={none:[],top:[],left:[],client:[],right:[],bottom:[]};
var node=_a7c.firstChild;
while(node){
if(node.nodeType==1&&this.visible(node)){
var _a7f=this.getAlignment(node);
if(_a7f){
if(_a7d[_a7f]){
_a7d[_a7f].push(node);
}else{
_a7d[_a7f]=[node];
}
}
}
node=node.nextSibling;
}
return _a7d;
};
this.setStylePosition=function(_a80,_a81){
if(_a80.style.position!=_a81){
_a80.style.position=_a81;
}
};
this.normalizeAlignedElement=function(_a82){
this.setStylePosition(_a82,"absolute");
};
this.alignElement=function(_a83,inL,inT,inW,inH){
this.normalizeAlignedElement(_a83);
turbo.setBounds(_a83,inL,inT,inW,inH);
this.alignChildren(_a83);
};
this.alignChildren=function(_a88){
var _a89=this.listAlignedChildren(_a88);
var siz=turbo.getContentSize(_a88);
var top=turbo.style.getPixelValue(_a88,"padding-top",true);
var left=turbo.style.getPixelValue(_a88,"padding-left",true);
var l,r,t,b,w,h,c,_a94;
_a94=_a89.none;
for(var i=0;i<_a94.length;i++){
var p=turbo.style.getComputedStyle(_a94[i],"position");
}
_a94=_a89.top;
t=top;
for(var i=0;i<_a94.length;i++){
this.alignElement(_a94[i],left,t,siz.w);
t+=_a94[i].offsetHeight;
}
_a94=_a89.bottom;
b=siz.h+top;
c=_a94.length;
for(var i=c-1;i>=0;i--){
b-=_a94[i].offsetHeight;
this.alignElement(_a94[i],left,b,siz.w);
}
h=b-t;
_a94=_a89.left;
l=left;
for(var i=0;i<_a94.length;i++){
this.alignElement(_a94[i],l,t,-1,h);
l+=_a94[i].offsetWidth;
}
_a94=_a89.right;
r=siz.w+left;
c=_a94.length;
for(var i=c-1;i>=0;i--){
r-=_a94[i].offsetWidth;
this.alignElement(_a94[i],r,t,-1,h);
}
w=r-l;
_a94=_a89.client;
for(var i=0;i<_a94.length;i++){
this.alignElement(_a94[i],l,t,w,h);
break;
}
_a94=_a89.none;
for(var i=0;i<_a94.length;i++){
this.alignChildren(_a94[i]);
}
};
this.alignTargets=function(){
for(var i=0,l=turbo.aligner.targets.length;i<l;i++){
turbo.aligner.alignChildren(turbo.aligner.targets[i]);
}
};
this.alignFrom=function(_a99){
if(turbo.aligner.enabled){
turbo.aligner.alignChildren(_a99);
}
};
this.alignNow=function(){
turbo.aligner.alignFrom(document.body);
turbo.aligner.alignTargets();
};
this.lastAlign=0;
this.align=function(){
if(!turbo.aligner.enabled){
return;
}
turbo.aligner.alignNow();
};
this.alignLater=function(_a9a){
turbo.defer(turbo.aligner.align,(_a9a?_a9a:200));
};
this.enable=function(_a9b){
turbo.aligner.enabled=(_a9b!==false);
};
this.start=function(){
turbo.aligner.enable();
turbo.aligner.alignLater(500);
};
this.addTarget=function(_a9c){
var e=(dojo.lang.isString(_a9c)?turbo.$(_a9c):_a9c);
e.style.position="relative";
turbo.aligner.targets.push(e);
};
};
dojo.provide("turbo.lib.theme");
dojo.require("dojo.io.*");
dojo.require("turbo.turbo");
turbo.stylesheet={cssFiles:[],links:[],rules:0,loadCost:0,processCost:0,dummy:0};
turbo.stylesheet.create=function(_a9e){
var l=document.createElement("link");
l.setAttribute("rel","stylesheet");
l.setAttribute("type","text/css");
l.setAttribute("href",_a9e+"/base.css");
return l;
};
turbo.stylesheet.getLink=function(_aa0){
var l=turbo.stylesheet.links[_aa0];
if(!l){
l=turbo.stylesheet.create(_aa0);
turbo.addHeadNode(l);
turbo.stylesheet.links[_aa0]=l;
}
return l;
};
turbo.stylesheet.getLinkSheet=function(_aa2){
var s=null;
if(!_aa2.addRule){
turbo.debug("stylesheet has no addRule method");
if(_aa2.styleSheet){
s=_aa2.styleSheet;
}else{
turbo.debug("turbo.stylesheet.getLinkSheet: link has no .styleSheet property");
}
}
return s;
};
turbo.stylesheet.loaded=function(_aa4){
if(!_aa4||turbo.stylesheet.cssFiles[_aa4]){
return true;
}
turbo.stylesheet.cssFiles[_aa4]=true;
return false;
};
turbo.stylesheet.append=function(_aa5){
turbo.stylesheet.importStyleSheet(_aa5);
};
turbo.stylesheet.importStyleSheet=function(_aa6){
if(turbo.stylesheet.loaded(_aa6)){
return;
}
turbo.style.insertCssFile(_aa6);
};
turbo.stylesheet.importThemeFile=function(_aa7){
if(turbo.by_hand_css||djConfig["turbo_hand_css"]){
return;
}
if(turbo.fine_css||djConfig["turbo_fine_css"]){
if(dojo.render.html.ie){
turbo.stylesheet.append(_aa7);
}else{
turbo.stylesheet.importStyleSheet(_aa7);
}
}else{
turbo.stylesheet.importStyleSheet(turbo.pathpop(_aa7)+"/theme.css");
}
};
turbo.themes=new function(){
this.theme="";
this.themeable=[];
this.addThemeable=function(_aa8){
this.themeable.push(_aa8);
};
this.removeThemeable=function(_aa9){
for(var i in this.themeable){
if(this.themeable[i]==_aa9){
this.themeable.splice(i,1);
return;
}
}
};
this.setTheme=function(_aab){
this.theme=(_aab&&_aab.toLowerCase()!="xp"?_aab:"default");
for(var i=0,l=this.themeable.length;i<l;i++){
this.themeable[i].setTheme(this.theme);
}
if(turbo["aligner"]){
turbo.defer(turbo.aligner.align,250);
turbo.defer(turbo.aligner.align,1000);
}
};
this.set=this.setTheme;
};
dojo.addOnLoad(function(){
dojo.html.addClass(document.body,(dojo.render.html.moz?"turbo-gecko":(dojo.render.html.ie?"turbo-ie":"")));
});
dojo.provide("turbo.lib.app");
dojo.require("turbo.lib.align");
dojo.require("turbo.lib.scrim");
dojo.require("dojo.event.*");
turbo.app={marshall:function(){
var id="";
var _aaf=dj_global;
for(var i=0;i<arguments.length;i++){
id=arguments[i];
if(!_aaf[id]){
_aaf[id]=turbo.$(id);
}
}
return _aaf[id];
},onresize:function(){
},alignerAlign:function(){
this.onresize();
},resize:function(){
turbo.aligner.align();
},_windowResize:function(){
turbo.app.resize();
turbo.app.resizePending=null;
},windowResize:function(){
if(this.resizePending){
return;
}
this.resizePending=turbo.defer(turbo.app._windowResize,250);
},display:function(){
turbo.aligner.enable();
this._windowResize();
turbo.defer(turbo.app.windowResize,500);
if(turbo.turbo_disable_curtain||djConfig["turbo_disable_curtain"]){
this.showPageBody();
}else{
turbo.scrim.release(this.scrim);
this.scrim=null;
}
},encurtain:function(){
this.scrim=turbo.scrim.get(document.body,"turboCurtain",{zIndex:9999,backgroundColor:"white"});
this.showPageBody();
},showPageBody:function(){
document.body.style.display="block";
},init:function(){
},initialize:function(){
if(!turbo.turbo_disable_curtain&&!djConfig["turbo_disable_curtain"]){
this.encurtain();
}
try{
this.init();
}
catch(e){
dojo.debug("turbo.app.init failed: "+e);
turbo.debug(e);
}
turbo.defer(turbo.bind(this,this.display),100);
dojo.event.connect(turbo.aligner,"align",this,"alignerAlign");
dojo.event.connect(window,"onresize",this,"windowResize");
}};
turbo.app.curtainHtml="";
dojo.addOnLoad(turbo.app,"initialize");
if(false){
dojo.addOnLoad(function(){
showHideGrids=function(_ab1){
var _ab2=dojo.widget.getWidgetsByType("TurboGridClassic");
for(var i=0;i<_ab2.length;i++){
turbo.showHide(_ab2[i].domNode,_ab1);
}
};
hideGrids=function(){
showHideGrids(false);
};
showGrids=function(){
showHideGrids(true);
};
dojo.event.connect("before",turbo.aligner,"align","hideGrids");
dojo.event.connect("after",turbo.aligner,"align","showGrids");
});
}
dojo.event.topic.registerPublisher("turboresize",turbo.app,"onresize");
dojo.provide("turbo.widgets.TurboWidget");
turbo.widgetRoot="../turbo/widgets/";
turbo.templateRoot=turbo.widgetRoot+"templates/";
turbo.themeRoot=turbo.widgetRoot+"themes/";
turbo.themePath=dojo.hostenv.getBaseScriptUri()+turbo.themeRoot;
turbo.loadJs=function(_ab4){
turbo.loadScript(dojo.hostenv.getBaseScriptUri()+_ab4);
};
turbo.loadCss=function(_ab5){
turbo.stylesheet.importThemeFile(dojo.hostenv.getBaseScriptUri()+_ab5);
};
turbo.setWidgetType=function(_ab6,_ab7){
if(_ab6.widgetType=="HtmlWidget"){
_ab6.widgetType=_ab7;
}
};
dojo.widget.defineWidget("dojo.widget.html.TurboWidget",dojo.widget.HtmlWidget,function(){
this.styleRoot=(this.styleRoot||this.widgetType);
this.setClassName=this.setStyledClass;
},{themeRoot:turbo.themeRoot,templateRoot:turbo.templateRoot,isContainer:false,align:"",debuggable:true,style:"",theme:"",themeable:true,themeJs:false,turboalign:"",turboCreate:function(){
},turboDestroy:function(){
},setTemplatePath:function(){
dojo.uri.dojoUri(turbo.templateRoot+this.widgetType+".html");
},initialize:function(){
if(this.widgetId.substr(-2,1)!="_"&&this.widgetId.substr(-3,1)!="_"){
dj_global[this.widgetId]=this;
}
if(this.extraArgs["turboAlign"]){
this.turboalign=this.extraArgs.turboAlign;
}
if(this.turboalign){
this.domNode.setAttribute("turboalign",this.turboalign);
}
this.className=this.extraArgs["class"];
if(this.className){
this.domNode.className=this.className;
}
this.domNode.id=this.widgetId;
if(this.themeable){
turbo.themes.addThemeable(this);
if(!this.theme){
this.theme=turbo.themes.theme;
}
this.setTheme(this.theme);
}
this.turboCreate();
},uninitialize:function(){
if(this.themeable){
turbo.themes.removeThemeable(this);
}
this.turboDestroy();
},tie:function(_ab8){
return turbo.tie.apply(turbo,[this].concat(turbo.cloneArguments(arguments)));
},bindArgEvent:function(_ab9,_aba){
if(_aba[_ab9]){
this[_ab9]=turbo.getFunction(_aba[_ab9]);
}
},bindArgEvents:function(_abb){
return;
for(var arg in _abb){
if(dojo.lang.isFunction(this[arg])){
var _abd=_abb[arg];
if(_abd.search(/[^\w\.]+/i)==-1){
var func=turbo.getFunction(_abd);
if(func){
this[arg]=func;
}else{
this.debug("bindArgEvents","could not bind \""+arg+"\" to \""+_abd+"\"");
}
}
}
}
},connectEvents:function(_abf){
for(var i=1,l=arguments.length;i<l;i++){
dojo.event.connect(_abf,"on"+arguments[i].toLowerCase(),this,"do"+arguments[i]);
}
},getWidgetFragment:function(_ac2){
return _ac2["dojo:"+this.widgetType.toLowerCase()];
},createChildWidgets:function(_ac3){
dojo.widget.getParser().createSubComponents(_ac3);
},installChildren:function(_ac4,_ac5){
this.createChildWidgets(_ac4);
var _ac6=(_ac5?_ac5:this.domNode);
dojo.dom.moveChildren(this.getFragNodeRef(_ac4),_ac6);
},getStylePath:function(_ac7){
return this.themeRoot+(_ac7?_ac7:"default")+"/"+this.styleRoot+_ac7;
},loadStyle:function(_ac8){
var p=this.getStylePath(_ac8);
turbo.loadCss(p+".css");
if(this.themeJs){
turbo.loadJs(p+"Theme.js");
}
},setStyle:function(_aca){
this.style=(_aca=="default"||_aca=="XP"?"":_aca);
this.loadStyle(this.style);
this.styleChanged();
},setTheme:function(_acb){
this.loadStyle("");
if(!this.themeable){
return;
}
if(_acb&&(_acb.charAt(0)=="+")){
this.themeable=false;
_acb=_acb.substring(1);
}
this.setStyle(_acb);
},styleChanged:function(){
},setStyledClass:function(_acc,_acd){
if(!_acd){
_acd="";
}
_acc.className=this.classTag+_acd+(this.style?" "+this.classTag+this.style+_acd:"");
},debug:function(_ace,_acf){
if(this.debuggable){
turbo.debug(this.widgetId+" ["+this.widgetType+"]: "+_ace+": "+turbo.printf.apply(turbo,turbo.cloneArguments(arguments,1)));
}
},showHide:function(_ad0){
if(_ad0){
this.show();
}else{
this.hide();
}
}});
dojo.provide("turbo.data.classic.fields");
turbo.data.index=function(){
this.defaultValue={};
this.values=[];
this.count=function(){
return this.values.length;
};
this.clear=function(){
this.values=[];
};
this.get=function(_ad1){
var _ad2=this.values[_ad1];
if(!_ad2){
_ad2=turbo.swiss(this.defaultValue,{});
this.values[_ad1]=_ad2;
}
return _ad2;
};
this._set=function(_ad3,_ad4){
var v=this.get(_ad3);
for(var i=1;i<arguments.length;i++){
turbo.swiss(arguments[i],v);
}
this.values[_ad3]=v;
};
this.set=function(){
if(arguments.length<1){
return;
}
var a=arguments[0];
if(!dojo.lang.isArray(a)){
this._set.apply(this,arguments);
}else{
for(i=0,l=a.length;i<l;i++){
this._set(i,a[i]);
}
}
};
this.insert=function(_ad8,_ad9){
if(_ad8>=this.values.length){
this.values[_ad8]=_ad9;
}else{
this.values.splice(_ad8,0,_ad9);
}
};
this.remove=function(_ada){
this.values.splice(_ada,1);
};
this.swap=function(_adb,_adc){
turbo.arraySwap(this.values,_adb,_adc);
};
this.move=function(_add,_ade){
turbo.arrayMove(this.values,_add,_ade);
};
};
turbo.data.fields=function(_adf){
turbo.data.index.call(this);
var _ae0=(_adf?_adf:Object);
this.defaultValue=new _ae0();
this.setDefault=function(_ae1){
if(typeof (_ae1)!="object"){
alert("tubo.data.fields.setDefaultField (stores.js): bad input field object. Are your field definitions included?");
}
turbo.swiss(_ae1,this.defaultValue);
};
};
turbo.data.comparator=function(_ae2){
return function(a,b){
return (a[_ae2]>b[_ae2]?1:(a[_ae2]==b[_ae2]?0:-1));
};
};
turbo.data.field=function(_ae5){
this.name=_ae5;
this.comparator=turbo.data.comparator;
this.getComparator=function(_ae6,_ae7){
var _ae8=this.comparator(_ae6);
if(!_ae7){
return _ae8;
}else{
return function(a,b){
return -_ae8(a,b);
};
}
};
};
dojo.provide("turbo.data.classic.stores");
turbo.data.table=function(_aeb){
this.fields=new turbo.data.fields(turbo.data.field);
this.fields.set(_aeb);
this.rowinfo=new turbo.data.index();
this.sortIndex=-1;
this.sortField="";
this.sortDesc=false;
this.autoSort=false;
this.getFieldNameArray=function(){
var f=this.fields.values;
var a=new Array(f.length);
for(var i=0,l=f.length;i<l;i++){
a[i]=f[i].name;
}
return a;
};
this.getFieldNameIndex=function(_af0){
var f=this.fields.values;
for(var i=0,l=f.length;i<l;i++){
if(f[i].name==_af0){
return i;
}
}
return false;
};
this.getColCount=function(){
return this.fields.count();
};
this.hasData=function(){
return (this.fields.count()>0);
};
this.deleteRows=function(_af4,inOk,_af6){
inOk(_af4,_af4.length);
};
this._setSortField=function(_af7,_af8){
if(_af8){
this.sortDesc=_af8;
}else{
if(this.sortField==_af7){
this.sortDesc=!this.sortDesc;
}else{
this.sortDesc=false;
}
}
this.sortField=_af7;
};
this.setSortIndex=function(_af9,_afa){
if(_af9<0){
this.sortField="";
}else{
this._setSortField(this.fields.get(_af9).name,_afa);
}
this.sortIndex=_af9;
};
this.setSortField=function(_afb,_afc){
if(_afb==""){
this.setSortIndex(-1);
}else{
this._setSortField(_afb,_afc);
this.sortIndex=this.getFieldNameIndex(this.sortField);
}
};
this.hasEdits=function(){
var v=this.rowinfo.values;
for(var i in v){
if(!v.constructor.prototype[i]&&v[i].edit){
return true;
}
}
return false;
};
this.startEdit=function(_aff){
this.cacheRow(_aff);
this.rowinfo.set(_aff,{edit:true});
};
this.cancelEdit=function(_b00){
this.restoreRow(_b00);
this.clearRowInfo(_b00);
};
this.applyEdit=function(_b01,inOk,_b03){
if(this.rowChanged(_b01)||this.rowinfo.get(_b01).error){
this._applyEdit(_b01,inOk,_b03);
}else{
this.cancelEdit(_b01);
}
};
this.clearRowInfo=function(_b04){
with(this.rowinfo.get(_b04)){
delete cache;
delete edit;
delete insert;
delete inflight;
delete error;
}
};
this._applyEdit=function(_b05,inOk,_b07){
this.rowinfo.get(_b05).inflight=true;
var self=this;
var _b09=function(){
self.clearRowInfo(_b05);
inOk.apply(this,arguments);
};
var _b0a=function(_b0b){
var i=self.rowinfo.get(_b05);
delete i.inflight;
if(_b0b){
i.error=_b0b;
}
_b07.apply(this,arguments);
};
this.commitRow(_b05,_b09,_b0a);
};
this.commitRow=function(_b0d,inOk,_b0f){
inOk();
};
};
turbo.data.store=function(_b10,_b11){
turbo.data.table.call(this);
this.data=[];
this.hasData=function(){
return (this.data&&this.data.length>0);
};
this.setData=function(_b12,_b13){
this.data=(_b12?_b12:[]);
this.fields.set(_b13);
};
this.sort=function(){
if(this.sortIndex>=0&&this.hasData()){
this.data.sort(this.fields.get(this.sortIndex).getComparator(this.sortIndex,this.sortDesc));
}
};
this.getColCount=function(){
var _b14=this.fields.count();
var _b15=(this.data&&this.data.length?this.data[0].length:0);
return Math.max(_b14,_b15);
};
this.getRowCount=function(){
return (this.data&&this.data.length?this.data.length:0);
};
this.getDatum=function(_b16,_b17){
if(djConfig.isDebug&&(_b17<0||_b17>=this.data.length)){
turbo.debug("turbo.data.arrayStore.getDatum: bad row: "+_b17);
return null;
}
return this.data[_b17][_b16];
};
this.setDatum=function(_b18,_b19,_b1a){
this.data[_b19][_b18]=_b1a;
};
this.getRow=function(_b1b){
return this.data[_b1b];
};
this.copyRow=function(_b1c){
return this.data[_b1c].slice(0);
};
this.compareRow=function(_b1d,_b1e){
var c=this.getColCount();
if(!_b1e||_b1e.length!=c){
return false;
}
var row=this.getRow(_b1d);
for(var i=0;i<c;i++){
if(_b1e[i]!==row[i]){
return false;
}
}
return true;
};
this.removeRow=function(_b22){
this.data.splice(_b22,1);
this.rowinfo.remove(_b22);
};
this.replaceRow=function(_b23,_b24){
this.data[_b23]=_b24;
};
this.swapRows=function(_b25,_b26){
turbo.arraySwap(this.data,_b25,_b26);
this.rowinfo.swap(_b25,_b26);
};
this.getRowCache=function(_b27){
return this.rowinfo.get(_b27).cache;
};
this.getRowBacking=function(_b28){
var c=this.getRowCache(_b28);
return (c?c:this.getRow(_b28));
};
this.cacheRow=function(_b2a){
if(!this.getRowCache(_b2a)){
this.rowinfo.set(_b2a,{cache:this.copyRow(_b2a)});
}
};
this.rowChanged=function(_b2b){
var c=this.getRowCache(_b2b);
return (!c?true:!this.compareRow(_b2b,c));
};
this.restoreRow=function(_b2d){
var c=this.getRowCache(_b2d);
if(c){
this.replaceRow(_b2d,c);
}
};
this.addRow=function(_b2f,_b30){
var c=this.getColCount();
if(!_b30){
_b30=[];
}
for(var i=0;i<c;i++){
if(dojo.lang.isUndefined(_b30[i])){
_b30[i]=this.fields.get(i).defaultValue;
}
}
if(this.data.length>0){
this.data.splice(_b2f,0,_b30);
}else{
this.data=[_b30];
}
this.rowinfo.insert(_b2f,{edit:true,insert:true});
};
this.setData(_b10,_b11);
};
turbo.data.paged=function(_b33){
turbo.data.store.call(this,null,_b33);
this.totalRows=0;
this.rowsPerPage=50;
this.pageCount=0;
this.pages=[];
this.page=-1;
this.invalidPage=-1;
this.requestPage=function(_b34){
};
this.clear=function(){
this.setTotalRows(0);
this.page=-1;
this.pages=[];
this.setSortIndex(-1);
};
this.setTotalRows=function(_b35){
var _b36=this.pageCount;
var _b37=this.page;
this.totalRows=_b35;
this.pageCount=Math.ceil(this.totalRows/this.rowsPerPage);
if(this.page>=this.pageCount){
this.page=this.pageCount-1;
}
return (_b36!=this.pageCount||_b37!=this.page);
};
this.getPageLength=function(_b38){
var page=(_b38==this.page?this.data:this.pages[_b38]);
return (page?page.length:this.rowsPerPage);
};
this.fetchRowCount=function(){
return this.totalRows;
};
this.repaginate=function(){
var rows=this.fetchRowCount();
this.pages=[];
if(this.page>=0){
this.pages[this.page]=this.data;
}
return this.setTotalRows(rows);
};
this.getTopRow=function(_b3b){
var page=(_b3b===undefined?this.page:_b3b);
return page*this.rowsPerPage;
};
this.getBottomRow=function(_b3d){
var row=this.getTopRow(_b3d)+this.getPageLength(_b3d)-1;
return Math.min(row,this.totalRows-1);
};
this.fillPage=function(_b3f,_b40){
this.pages[_b3f]=_b40;
};
this.selectPage=function(_b41){
this.page=_b41;
if(!this.pages[_b41]){
this.requestPage(_b41);
}
this.rowinfo.clear();
if(this.pages[_b41]){
this.invalidPage=-1;
this.data=this.pages[_b41];
}else{
this.invalidPage=_b41;
this.data=[];
}
};
this.invalidatePage=function(){
this.pages[this.page]=null;
};
this.pageIsValid=function(_b42){
return (this.pages[_b42]?true:false);
};
this.reloadPage=function(){
this.pages[this.page]=null;
this.selectPage(this.page);
};
this.reloadPages=function(){
this.pages=[];
this.selectPage(this.page);
};
this.fillNextPage=function(){
for(var i=0;i<this.pageCount;i++){
if(!this.pages[i]){
break;
}
}
if(i==this.pageCount){
return false;
}
turbo.debug("turbo.data.pages: fillNextPage: "+i);
this.requestPageAsync(i);
return true;
};
this.sort=function(){
this.reloadPages();
};
};
turbo.provide("turbo.grid.classic.columns");
turbo.grid.format={};
turbo.grid.format.noformat=function(_b44,_b45){
return _b44;
};
turbo.grid.edit={};
turbo.grid.edit.noedit={edit:function(_b46,_b47,_b48){
return false;
},getValue:function(){
return null;
}};
turbo.grid.column=function(_b49){
this.name=(_b49?_b49:"");
this.width=96;
this.readonly=false;
this.editor=null;
this.formatter=turbo.grid.format.text;
this.format=function(_b4a,_b4b){
if(!this.formatter){
turbo.debug("turbo.grid.column: illegal formatter for column ["+this.name+"]");
this.formatter=turbo.grid.format.text;
}
var _b4c=(this.readonly||_b4b||!this.editor);
return this.formatter.call(this,_b4a,_b4c);
};
this.getEditor=function(){
if(!this.editor||this.readonly){
return turbo.grid.edit.noedit;
}else{
this.editor.column=this;
return this.editor;
}
};
};
turbo.grid.format.html=function(_b4d,_b4e){
var s="width:"+this.width+"px;";
if(this.align){
s+=" text-align: "+this.align+";";
}
return "<div style=\""+s+"\">"+_b4d+"</div>";
};
turbo.grid.format.text=function(_b50,_b51){
var s="width:"+this.width+"px;";
if(_b50==null){
s+=" color: #CCBBB3;";
_b50="~";
}else{
if(typeof (_b50)=="string"&&_b50.length>255){
_b50="(text: "+_b50.length+" chars)";
}else{
_b50=turbo.escapeText(_b50);
}
}
if(this.align){
s+=" text-align: "+this.align+";";
}
return "<div style=\""+s+"\">"+_b50+"</div>";
};
turbo.grid.format.line=turbo.grid.format.text;
turbo.grid.edit.line=new function(){
this.createInput=function(_b53,_b54){
var i=document.createElement("input");
i.setAttribute("autocomplete","OFF");
i.value=(_b54===undefined?"":String(_b54));
i.style.width=_b53.clientWidth-10+"px";
_b53.innerHTML="";
_b53.appendChild(i);
if(i.clientHeight<_b53.clientHeight-4){
i.style.height=_b53.clientHeight-4+"px";
}
turbo.defer(function(){
i.select();
i.focus();
},10);
return i;
};
this.edit=function(_b56,_b57){
this.client.input=this.createInput(_b56,_b57);
};
this.getValue=function(){
return (this.client.input.value=="null"?null:(this.client.input.value=="undefined"?undefined:this.client.input.value));
};
};
turbo.grid.edit.multiLine=new function(){
this.createInput=function(_b58,_b59){
var i=document.createElement("textarea");
i.value=String(_b59);
i.rows=2;
i.style.width=_b58.clientWidth-8+"px";
_b58.innerHTML="";
_b58.appendChild(i);
if(i.clientHeight<_b58.clientHeight-4){
i.style.height=_b58.clientHeight-4+"px";
}
i.select();
i.focus();
return i;
};
this.edit=function(_b5b,_b5c){
this.client.input=this.createInput(_b5b,_b5c);
};
this.getValue=function(){
return (this.client.input.value=="null"?null:this.client.input.value);
};
};
turbo.grid.format.bool=function(_b5d,_b5e){
_b5d=(_b5d?parseInt(_b5d)!=0:false);
var s=" text-align: "+(this.align?this.align:"center")+";";
return "<div style=\"width:"+this.width+"px; "+s+"\">"+"<input type=\"checkbox\""+(_b5e?" disabled=\"disabled\"":"")+(_b5d?" checked=\"checked\"":"")+"/>"+"</div>";
};
turbo.grid.edit.bool=new function(){
this.edit=function(_b60,_b61,_b62){
while(turbo.getTagName(_b60)!="input"){
_b60=_b60.childNodes[0];
}
if(!_b60){
return false;
}
this.client.input=_b60;
this.client.input.focus();
if(this.column.onclick){
this.client.input.onclick=turbo.bindArgs(this,this.column.onclick,_b62);
this.client.input.onclick();
}
};
this.getValue=function(){
return (this.client.input.checked?1:0);
};
};
turbo.grid.isIntChar=function(_b63){
return (_b63.search(/[-+\0\t\n\r\d]/)!=-1);
};
turbo.grid.format.integer=function(_b64,_b65){
var s=" width:"+this.width+"px; text-align: "+(this.align?this.align:"right")+";";
var f="~";
if(_b64==null){
s+=" color: #CCBBB3;";
}else{
f=parseInt(_b64)+(this.units?this.units:"");
}
return "<div style=\""+s+"\">"+f+"</div>";
};
turbo.grid.edit.integer=new function(){
this.limitToInteger=function(_b68){
if(!turbo.grid.isIntChar(String.fromCharCode(_b68.charCode))){
_b68.preventDefault();
}
};
this.createInput=turbo.grid.edit.line.createInput;
this.edit=function(_b69,_b6a){
this.client.input=this.createInput(_b69,_b6a);
turbo.connect(this.client.input,"onkeypress",this,"limitToInteger");
};
this.getValue=function(){
var _b6b=Number(this.client.input.value);
return (isNaN(_b6b)?0:_b6b);
};
};
turbo.grid.format.decimal=function(_b6c,_b6d){
var s="text-align: "+(this.align?this.align:"right")+";";
var f="~";
if(_b6c==null){
s+=" color: #CCBBB3;";
}else{
f=parseFloat(_b6c);
f=(this.decimals?f.toFixed(this.decimals):f)+(this.units?this.units:"");
}
return "<div style=\""+s+"\">"+f+"</div>";
};
turbo.grid.decimalIsOk=function(_b70,_b71){
return (_b71=="."&&!/[\.]/.test(_b70));
};
turbo.grid.edit.decimal=new function(){
this.limitToDecimal=function(_b72){
var s=String.fromCharCode(_b72.charCode);
if(!turbo.grid.isIntChar(s)&&!turbo.grid.decimalIsOk(this.client.input.value,s)){
_b72.preventDefault();
}
};
this.createInput=turbo.grid.edit.line.createInput;
this.edit=function(_b74,_b75){
this.client.input=this.createInput(_b74,_b75);
turbo.connect(this.client.input,"onkeypress",this,"limitToDecimal");
};
this.getValue=function(){
var _b76=Number(this.client.input.value);
return (isNaN(_b76)?0:_b76);
};
};
turbo.grid.format.money=function(_b77,_b78){
var f=parseFloat(_b77);
var s=(f<0?-1:1);
f=Math.abs(f);
var i=Math.floor(f).toString();
var l=i.length+(s<0?1:0);
f=(s<0?"&#45;":"")+f.toFixed(2);
l=(this.digits?this.digits:5)-l;
var k="$"+turbo.stringOf(l,"&#160;")+f;
return "<div style=\"width:"+this.width+"px;\" class=\"turbo-grid-money"+(s<0?" turbo-grid-money-neg":"")+"\">"+k+"</div>";
};
turbo.grid.format.enumerated=function(_b7e,_b7f){
var opts="";
if(this.options){
for(var i=0,v,s;i<this.options.length;i++){
if(this.values&&this.values[i]){
v=" value=\""+this.values[i]+"\"";
s=(this.values[i]==_b7e);
}else{
v="";
s=(this.options[i]==_b7e);
}
s=(s?" selected":"");
opts+="<option"+v+s+">"+this.options[i]+"</option>";
}
}else{
opts="<option>"+_b7e+"</option>";
}
return "<div>"+"<select"+(_b7f?" disabled=\"disabled\"":"")+">"+opts+"</select>"+"</div>";
};
turbo.grid.edit.enumerated=new function(){
this.edit=function(_b84,_b85){
while(_b84.tagName!="SELECT"){
_b84=_b84.childNodes[0];
}
this.client.input=_b84;
};
this.getValue=function(){
return turbo.getSelectValue(this.client.input);
};
};
turbo.grid.format.autoInc=function(_b86){
var s="";
s+="width:"+(this.width-4)+"px;";
s+=" text-align: "+(this.align?this.align:"right")+";";
if(_b86===undefined){
s+=" color: #CCBBB3;";
_b86="auto";
}
return "<div style=\""+s+"\">"+_b86+"</div>";
};
turbo.grid.columns={};
turbo.grid.columns.basic={width:128,formatter:turbo.grid.format.line,editor:turbo.grid.edit.line};
turbo.grid.columns.html={width:128,formatter:turbo.grid.format.html,editor:turbo.grid.edit.line};
turbo.grid.columns.integer={width:64,align:"right",formatter:turbo.grid.format.integer,editor:turbo.grid.edit.integer};
turbo.grid.columns.decimal={width:80,align:"right",decimals:3,formatter:turbo.grid.format.decimal,editor:turbo.grid.edit.decimal};
turbo.grid.columns.bool={width:48,align:"center",formatter:turbo.grid.format.bool,editor:turbo.grid.edit.bool};
turbo.grid.columns.enumerated={width:96,formatter:turbo.grid.format.enumerated,editor:turbo.grid.edit.enumerated};
turbo.grid.columns.money={width:96,align:"right",digits:5,formatter:turbo.grid.format.money,editor:turbo.grid.edit.decimal};
turbo.grid.columns.autoInc={align:"right",formatter:turbo.grid.format.autoInc,editor:turbo.grid.edit.integer};
turbo.provide("turbo.grid.classic.controllers");
turbo.require("turbo.grid.classic.columns");
turbo.grid.controllers={};
turbo.grid.controller=function(_b88,_b89,_b8a){
if(_b88){
this.readonly=false;
this.columns=new turbo.data.fields(turbo.grid.column);
this.columns.set(_b8a);
this.grid=(turbo.isString(_b88)?turbo.widget.getWidgetById(_b88):_b88);
this.grid.controller=this;
this.setModel(_b89);
}
};
dojo.lang.extend(turbo.grid.controller,{canSort:function(_b8b){
},showMessage:function(_b8c){
},rowsChanged:function(){
}});
dojo.lang.extend(turbo.grid.controller,{clear:function(){
this.editingCell=null;
this.editingRow=-1;
},build:function(){
this.clear();
this.grid.setSize(this.getColCount(),this.model.getRowCount());
this.grid.build();
},setReadonly:function(_b8d){
if(_b8d!=this.readonly){
this.readonly=_b8d;
this.build();
}
},setModel:function(_b8e){
this.model=_b8e;
if(this.model){
this.build();
}
},getColCount:function(){
var _b8f=this.columns.count();
return (_b8f?_b8f:this.model.getColCount());
},getColumnWidth:function(_b90,_b91){
return this.columns.get(_b91).width;
},getDatum:function(_b92,_b93){
return this.model.getDatum(_b92,_b93);
},getCell:function(_b94,_b95,_b96){
return this.columns.get(_b95).format(this.getDatum(_b95,_b96),this.readonly,_b96);
},getHeaderAlign:function(_b97,_b98){
var a=this.columns.get(_b98)["align"];
return (a?a:"left");
},getColumnTitle:function(_b9a,_b9b){
var t=this.columns.get(_b9b).name;
return (t?t:this.model.fields.get(_b9b).name);
},getSortInfo:function(_b9d){
return {column:this.model.sortIndex,desc:this.model.sortDesc};
},onHeaderClick:function(_b9e,_b9f){
if(this.canSort(_b9f)===false){
return;
}
this.applyEdit();
this.model.setSortIndex(_b9f);
this.model.sort();
this.grid.clearMarkers();
this.grid.refresh();
},getClientRowClass:function(_ba0){
},getRowClass:function(_ba1){
var _ba2="";
if(this.grid.selected[_ba1]&&this.grid.selectCount>1){
_ba2="selected";
}else{
_ba2=this.getClientRowClass(_ba1);
if(_ba2){
return _ba2;
}
}
if(!_ba2){
var i=this.model.rowinfo.get(_ba1);
if(i.inflight){
_ba2="inflight";
}else{
if(i.error){
_ba2="error";
}else{
if(this.grid.selected[_ba1]&&!_ba2){
_ba2=(i.edit?"editing":"selected");
}
}
}
}
return this.grid.classTag+"-row-"+(_ba1&1)+(_ba2?" "+this.grid.classTag+"-"+_ba2:"");
}});
dojo.lang.extend(turbo.grid.controller,{setRow:function(_ba4,_ba5){
this.model.replaceRow(_ba4,_ba5);
this.grid.updateRow(_ba4);
},addRow:function(_ba6,_ba7){
var row=Number(_ba6!=undefined&&_ba6>=0?_ba6:this.grid.getFirstSelectedRow()+1);
this.applyEdit();
this.model.addRow(row,_ba7);
this.grid.addRow(row);
this.editingRow=row;
this.grid.setRowSelected(row);
this.grid.onSelectionChange();
this.rowsChanged();
},appendRow:function(_ba9){
this.addRow(Math.max(this.grid.rows,0),_ba9);
},removeRow:function(_baa){
this.model.removeRow(_baa);
this.grid.removeRow(_baa);
},removeSelectedRows:function(){
var rows=this.grid.getSelectedRows();
for(var i=0;i<rows.length;i++){
this.removeRow(rows[i]-i);
}
},swapRows:function(inI,inJ){
this.finishGridEdit();
this.model.swapRows(inI,inJ);
this.grid.swapRows(inI,inJ);
},canMoveRow:function(_baf){
var src=this.grid.selectedRow;
var dst=src+_baf;
return (src>=0&&dst>=0&&dst<this.grid.rows);
},moveRow:function(_bb2){
if(!this.canMoveRow(_bb2)){
return;
}
this.finishGridEdit();
var src=this.grid.selectedRow;
var dst=src+_bb2;
this.swapRows(src,src+_bb2);
this.grid.setRowSelected(src,false);
this.grid.setRowSelected(dst,true);
this.grid.onSelectionChange();
},moveRowUp:function(){
this.moveRow(-1);
},moveRowDown:function(){
this.moveRow(1);
}});
turbo.grid.controller.prototype.newRow=turbo.grid.controller.prototype.addRow;
dojo.lang.extend(turbo.grid.controller,{onBeginEdit:function(_bb5){
},onEditRowStart:function(_bb6){
},onEditRowDone:function(){
},editingCell:null,editingRow:-1,editCellDone:function(){
this.editingCell=null;
},cancelEditCell:function(){
if(this.editingCell){
this.grid.refreshCell(this.editingCell);
this.editCellDone();
}
},updateEditCell:function(){
if(this.editingCell&&this.editor){
this.updateCell(this.editingCell,this.editor);
this.grid.refreshCell(this.editingCell);
}
},finishEditCell:function(){
this.updateEditCell();
if(this.editingCell){
this.grid.updateRowClass(this.editingCell.row);
}
this.editCellDone();
},editRowStart:function(_bb7){
if(this.editingRow!=_bb7){
this.editingRow=_bb7;
this.model.startEdit(_bb7);
this.onEditRowStart(_bb7);
}
},editRowDone:function(){
this.editingRow=-1;
this.onEditRowDone();
},cancelEditRow:function(){
if(this.editingRow>=0){
var row=this.editingRow;
this.editingRow=-1;
this.grid.updateRowClass(row);
this.editRowDone();
}
},finishEditRow:function(){
if(this.editingRow>=0){
var row=this.editingRow;
this.updateRow(row);
this.editingRow=-1;
this.grid.updateRowClass(row);
this.editRowDone();
}
},cancelGridEdit:function(){
this.cancelEditCell();
this.cancelEditRow();
},finishGridEdit:function(){
this.finishEditCell();
this.finishEditRow();
},editCell:function(_bba,_bbb,_bbc){
if(!_bba){
return;
}
var cell=this.grid.getCellPos(_bba);
if(this.grid.sameCell(this.editingCell,cell)||(!this.grid.goodCell(cell)&&cell.row==this.editingRow)){
return;
}
this.finishEditCell();
if(!this.grid.goodCell(cell)||_bbb||_bbc){
this.finishEditRow();
this.grid.clickSelect(cell.row,_bbb,_bbc);
dojo.html.clearSelection();
}else{
this.grid.unselectRows(cell.row);
if(_bba.parentNode==null){
return;
}
cell=this.grid.getCellPos(_bba);
this.editor=this.getEditor(cell);
if(this.editor){
this.editingCell=cell;
this.editRowStart(cell.row);
window.setTimeout(turbo.bind(this.grid,this.grid.updateRowSizes),10);
this.onBeginEdit(cell);
}
this.grid.setRowSelected(cell.row,true);
this.grid.onSelectionChange();
}
},onDataClick:function(_bbe,_bbf,_bc0){
this.editCell(_bbf,_bc0.ctrlKey,_bc0.shiftKey);
},onDataDblClick:function(_bc1,_bc2,_bc3){
}});
dojo.lang.extend(turbo.grid.controller,{getEditor:function(_bc4){
var _bc5=(this.readonly?null:this.columns.get(_bc4.col).getEditor());
if(_bc5){
_bc5.client=this;
if(_bc5.edit(this.grid.getDomCell(_bc4),this.getDatum(_bc4.col,_bc4.row),_bc4)===false){
_bc5=null;
}
}
return _bc5;
},updateCell:function(_bc6,_bc7){
_bc7.client=this;
this.model.setDatum(_bc6.col,_bc6.row,_bc7.getValue());
}});
dojo.lang.extend(turbo.grid.controller,{onUnselectRow:function(_bc8,_bc9){
if(_bc9==this.editingRow){
this.applyEdit();
}
},applyEdit:function(_bca){
if(this.editingRow>=0){
this.model.rowinfo.get(this.editingRow).sync=Boolean(_bca);
this.finishGridEdit();
}
},applyEditSync:function(){
this.applyEdit(true);
},cancelEdit:function(){
if(this.editingRow>=0){
var row=this.editingRow;
this.cancelGridEdit();
if(this.model.rowinfo.get(row).insert){
this.removeRow(row);
}else{
this.model.cancelEdit(row);
this.grid.updateRow(row);
}
}
}});
dojo.lang.extend(turbo.grid.controller,{_commitError:function(_bcc,_bcd){
this.grid.updateRow(_bcc);
var e=(_bcd?_bcd:this.model.rowinfo.get(_bcc).error);
turbo.debug("turbo.grid.controller._commitError: "+e);
this.showMessage("A server commit error occured: ["+e+"]",true);
},_commitOk:function(_bcf){
this.grid.updateRow(_bcf);
this.rowsChanged();
},updateRow:function(_bd0){
var ok=turbo.bindArgs(this,"_commitOk",_bd0);
var _bd2=turbo.bindArgs(this,"_commitError",_bd0);
this.model.applyEdit(_bd0,ok,_bd2);
}});
dojo.lang.extend(turbo.grid.controller,{_deleteError:function(){
},_deleteOk:function(_bd3,_bd4){
var c=_bd4;
turbo.debug("turbo.grid.controller._deleteOk: deleted "+c+" row(s)");
var self=this;
var _bd7=0;
var each=function(_bd9){
if(_bd7>=c){
return false;
}
self.removeRow(_bd9-_bd7++);
return true;
};
dojo.lang.every(_bd3,each);
if(this.model.repaginate()){
turbo.debug("turbo.grid.controller._deleteOk: repaginate signalled page change, reloading");
this.reloadPage();
}else{
this.model.invalidatePage();
}
this.rowsChanged();
},_deleteRows:function(){
var rows=this.grid.getSelectedRows();
var _bdb=rows.length;
if(!confirm("Ok to delete "+(_bdb!=1?_bdb+" rows":"one row")+" from table \""+this.model.table+"\""+"?")){
return;
}
this.cancelGridEdit();
var _bdc=0;
var _bdd=function(_bde){
var row=_bde-_bdc;
var e=this.model.rowinfo.get(row);
if(!e.insert){
return row;
}else{
_bdc++;
turbo.debug("turbo.grid.controller._deleteRows: removing non-committed row "+row);
this.removeRow(row);
return undefined;
}
};
rows=turbo.filter(rows,_bdd,this);
turbo.debug("turbo.grid.controller._deleteRows: deleting "+rows.length+" row(s)");
this.model.deleteRows(rows,turbo.bind(this,this._deleteOk),turbo.bind(this,this._deleteError));
},deleteRows:function(){
this.grid.setBusyStatus();
try{
this._deleteRows();
}
finally{
this.grid.setReadyStatus();
}
}});
dojo.lang.extend(turbo.grid.controller,{prevEdit:function(){
if(this.editingCell){
var cell={col:this.editingCell.col,row:this.editingCell.row};
if(--cell.col>=0){
this.editCell(this.grid.getDomCell(cell));
}else{
if(--cell.row>=0){
this.editCell(this.grid.getDomCell({col:this.grid.cols-1,row:cell.row}));
}
}
}
},nextEdit:function(){
if(this.editingCell){
var cell={col:this.editingCell.col,row:this.editingCell.row};
if(++cell.col<this.grid.cols){
this.editCell(this.grid.getDomCell(cell));
}else{
if(++cell.row<this.grid.rows){
this.editCell(this.grid.getDomCell({col:0,row:cell.row}));
}
}
}
},onKeyDown:function(_be3,_be4){
if(_be4.altKey||_be4.ctrlKey||_be4.metaKey){
return;
}
switch(_be4.keyCode){
case _be4.KEY_ESCAPE:
this.cancelEditCell();
break;
case _be4.KEY_ENTER:
if(!_be4.shiftKey){
this.finishEditCell();
}
break;
case _be4.KEY_TAB:
if(this.editingCell){
dojo.event.browser.stopEvent(_be4);
if(_be4.shiftKey){
this.prevEdit();
}else{
this.nextEdit();
}
}
break;
}
}});
turbo.grid.controllers.paged=function(_be5,_be6,_be7){
turbo.grid.controller.call(this,_be5,_be6,_be7);
};
dojo.inherits(turbo.grid.controllers.paged,turbo.grid.controller);
dojo.lang.extend(turbo.grid.controllers.paged,{setModel:function(_be8){
this.model=_be8;
if(this.model){
this.model.repaginate();
this.model.selectPage(0);
this.build();
}
},_selectPage:function(_be9,_bea){
this.model.selectPage(_be9);
this.build();
this.grid.setReadyStatus();
if(_bea){
_bea();
}
},selectPage:function(_beb,_bec){
this.grid.setBusyStatus();
this.grid.teardownRows();
turbo.defer(turbo.bindArgs(this,this._selectPage,_beb,_bec),20);
},reloadPage:function(){
this.model.reloadPage();
this.build();
},formatFixedCol:function(_bed,_bee){
return Number(_bee)+1+this.model.getTopRow();
}});
dojo.provide("turbo.grid.classic.extensions");
turbo.grid.extensions={};
turbo.grid.extensions.edit={extend:function(_bef){
dojo.lang.mixin(_bef,this);
},getEditor:function(_bf0){
},updateCell:function(_bf1,_bf2){
},updateRow:function(_bf3){
},cacheEditRow:function(_bf4){
},onEditRowStart:function(){
},onEditRowDone:function(){
},editingCell:null,editingRow:-1,editClear:function(){
this.editingCell=null;
this.editingRow=-1;
},editCellDone:function(){
this.editingCell=null;
},cancelEditCell:function(){
if(this.editingCell){
this.refreshCell(this.editingCell);
this.editCellDone();
}
},updateEditCell:function(){
if(this.editingCell&&this.editor){
this.updateCell(this.editingCell,this.editor);
this.refreshCell(this.editingCell);
}
},finishEditCell:function(){
this.updateEditCell();
if(this.editingCell){
this.updateRowClass(this.editingCell.row);
}
this.editCellDone();
},editRowStart:function(_bf5){
if(this.editingRow!=_bf5){
this.editingRow=_bf5;
this.cacheEditRow(_bf5);
this.onEditRowStart(_bf5);
}
},editRowDone:function(){
this.editingRow=-1;
this.onEditRowDone();
},cancelEditRow:function(){
if(this.editingRow>=0){
var row=this.editingRow;
this.editingRow=-1;
this.updateRowClass(row);
this.editRowDone();
}
},finishEditRow:function(){
if(this.editingRow>=0){
var row=this.editingRow;
this.updateRow(row);
this.editingRow=-1;
this.updateRowClass(row);
this.editRowDone();
}
},cancelGridEdit:function(){
this.cancelEditCell();
this.cancelEditRow();
},finishGridEdit:function(){
this.finishEditCell();
this.finishEditRow();
},editCell:function(_bf8,_bf9,_bfa){
if(!_bf8){
return;
}
var cell=this.getCellPos(_bf8);
if(!this.goodCell(cell)||this.sameCell(this.editingCell,cell)){
return;
}
this.finishEditCell();
if(_bf9||_bfa){
this.finishEditRow();
this.clickSelect(cell.row,_bf9,_bfa);
dojo.html.clearSelection();
}else{
this.unselectRows(cell.row);
if(_bf8.parentNode==null){
return;
}
cell=this.getCellPos(_bf8);
this.editor=this.getEditor(cell,_bf8);
if(this.editor){
this.editor.client=this;
this.editingCell=cell;
this.editRowStart(cell.row);
window.setTimeout(turbo.bind(this,this.updateRowSizes),10);
}
this.setRowSelected(cell.row,true);
this.onSelectionChange();
}
},editClick:function(_bfc,_bfd,_bfe){
this.editCell(_bfc,_bfd,_bfe);
},prevEdit:function(){
if(this.editingCell){
var cell={col:this.editingCell.col,row:this.editingCell.row};
if(--cell.col>=0){
this.editCell(this.getDomCell(cell));
}else{
if(--cell.row>=0){
this.editCell(this.getDomCell({col:this.cols-1,row:cell.row}));
}
}
}
},nextEdit:function(){
if(this.editingCell){
var cell={col:this.editingCell.col,row:this.editingCell.row};
if(++cell.col<this.cols){
this.editCell(this.getDomCell(cell));
}else{
if(++cell.row<this.rows){
this.editCell(this.getDomCell({col:0,row:cell.row}));
}
}
}
},editKeyDown:function(_c01){
if(_c01.altKey||_c01.ctrlKey||_c01.metaKey){
return;
}
switch(_c01.keyCode){
case _c01.KEY_ESCAPE:
this.cancelEditCell();
break;
case _c01.KEY_ENTER:
if(!_c01.shiftKey){
this.finishEditCell();
}
break;
case _c01.KEY_TAB:
if(this.editingCell){
dojo.event.browser.stopEvent(_c01);
if(_c01.shiftKey){
this.prevEdit();
}else{
this.nextEdit();
}
}
break;
}
},getRowClass:function(_c02){
var _c03=this.rowMarkerClass[_c02];
if(this.selected[_c02]&&(!_c03||this.selectCount>1)){
_c03=(this.editingRow==_c02?"editing":"selected");
}
return this.classTag+"-row-"+(_c02&1)+(_c03?" "+this.classTag+"-"+_c03:"");
},dataClick:function(_c04,_c05){
this.editClick(_c04,_c05.ctrlKey,_c05.shiftKey);
},dataKeyDown:function(_c06){
this.editKeyDown(_c06);
}};
dojo.provide("turbo.lib.drag");
turbo.drag={};
turbo.drag.dragging=false;
turbo.drag.hysteresis=2;
turbo.drag.capture=function(_c07){
if(_c07.setCapture){
_c07.setCapture();
}else{
document.addEventListener("mousemove",_c07.onmousemove,true);
document.addEventListener("mouseup",_c07.onmouseup,true);
document.addEventListener("click",_c07.onclick,true);
}
};
turbo.drag.release=function(_c08){
if(_c08.releaseCapture){
_c08.releaseCapture();
}else{
document.removeEventListener("click",_c08.onclick,true);
document.removeEventListener("mouseup",_c08.onmouseup,true);
document.removeEventListener("mousemove",_c08.onmousemove,true);
}
};
turbo.drag.start=function(_c09,_c0a,_c0b,_c0c,_c0d){
if(!_c09||turbo.drag.dragging){
turbo.debug("failed to start drag: bad input node or already dragging");
return;
}
turbo.drag.dragging=true;
turbo.drag.elt=_c09;
turbo.drag.events={drag:_c0a,end:_c0b,oldmove:_c09.onmousemove,oldup:_c09.onmouseup,oldclick:_c09.onclick,start:_c0d};
turbo.drag.position=(_c0c&&("layerX" in _c0c)?_c0c.layerX:false);
turbo.drag.started=turbo.drag.position===false;
_c09.onmousemove=turbo.drag.mousemove;
_c09.onmouseup=turbo.drag.mouseup;
_c09.onclick=turbo.drag.click;
turbo.drag.capture(turbo.drag.elt);
};
turbo.drag.end=function(){
turbo.drag.release(turbo.drag.elt);
turbo.drag.elt.onmousemove=turbo.drag.events.oldmove;
turbo.drag.elt.onmouseup=turbo.drag.events.oldup;
turbo.drag.elt.onclick=turbo.drag.events.oldclick;
turbo.drag.elt=null;
try{
if(turbo.drag.started&&turbo.drag.events.end){
turbo.drag.events.end();
}
}
finally{
turbo.drag.dragging=false;
}
};
turbo.drag.mousemove=function(_c0e){
_c0e=dojo.event.browser.fixEvent(_c0e);
turbo.killEvent(_c0e);
if(!turbo.drag.started&&Math.abs(_c0e.layerX-turbo.drag.position)>turbo.drag.hysteresis){
if(turbo.drag.events.start){
turbo.drag.events.start(_c0e);
}
turbo.drag.started=true;
}
if(turbo.drag.started){
turbo.drag.events.drag(_c0e);
}
};
turbo.drag.mouseup=function(_c0f){
turbo.killEvent(dojo.event.browser.fixEvent(_c0f));
turbo.drag.end();
};
turbo.drag.click=function(_c10){
turbo.killEvent(dojo.event.browser.fixEvent(_c10));
};
dojo.provide("turbo.lib.selection");
turbo.cancelSelectStart=function(){
if(window.event){
return (!window.event.ctrlKey&&!window.event.shiftKey);
}
};
turbo.cancelSelection=function(){
if(window.getSelection){
window.getSelection().removeAllRanges();
}
};
turbo.selection=function(){
this.multiSelect=true;
this.selected=[];
this.selectedIndex=-1;
this.onCanSelect=function(_c11){
};
this.onCanDeselect=function(_c12){
};
this.onSetSelected=function(_c13,_c14){
};
this.onSelected=function(_c15){
};
this.onDeselected=function(_c16){
};
this.onChanging=function(){
};
this.onChanged=function(){
};
this.isSelected=function(_c17){
return this.selected[_c17];
};
this.getFirstSelected=function(){
for(var i in this.selected){
if(this.selected[i]){
return i;
}
}
return -1;
};
this.getNextSelected=function(_c19){
for(var i=_c19+1;i<this.selected.length;i++){
if(this.selected[i]){
return i;
}
}
return -1;
};
this.getSelected=function(){
var _c1b=[];
for(var i=0;i<this.selected.length;i++){
if(this.selected[i]){
_c1b.push(i);
}
}
return _c1b;
};
this.getSelectedCount=function(){
var c=0;
for(var i=0;i<this.selected.length;i++){
if(this.selected[i]){
c++;
}
}
return c;
};
this.beginUpdate=function(){
if(this.updating==0){
this.onChanging();
}
this.updating++;
};
this.endUpdate=function(){
this.updating--;
if(this.updating==0){
this.onChanged();
}
};
this.select=function(_c1f){
_c1f=Number(_c1f);
if(this.selected[_c1f]){
this.selectedIndex=_c1f;
}else{
if(this.onCanSelect(_c1f)===false){
return;
}
this.selectedIndex=_c1f;
this.beginUpdate();
this.selected[_c1f]=true;
this.onSelected(_c1f);
this.onSetSelected(_c1f,true);
this.endUpdate();
}
};
this.deselect=function(_c20){
_c20=Number(_c20);
if(this.selectedIndex==_c20){
this.selectedIndex=-1;
}
if(this.selected[_c20]){
if(this.onCanDeselect(_c20)===false){
return;
}
this.beginUpdate();
delete this.selected[_c20];
this.onDeselected(_c20);
this.onSetSelected(_c20,false);
this.endUpdate();
}
};
this.setSelected=function(_c21,_c22){
this[(_c22?"select":"deselect")](_c21);
};
this.toggleSelect=function(_c23){
this.setSelected(_c23,!this.selected[_c23]);
};
this.insert=function(_c24){
this.selected.splice(_c24,0,false);
if(this.selectedIndex>=_c24){
this.selectedIndex++;
}
};
this.remove=function(_c25){
this.selected.splice(_c25,1);
if(this.selectedIndex>=_c25){
this.selectedIndex--;
}
};
this.unselectAll=function(_c26){
for(var i in this.selected){
if(i!=_c26&&this.selected[i]){
this.setSelected(i,false);
}
}
};
this.clickSelect=function(_c28,_c29,_c2a){
this.beginUpdate();
var _c2b=this.selectedIndex;
if(!this.multiSelect||!_c29){
this.unselectAll(_c28);
}
if(!_c2a){
if(_c29){
this.toggleSelect(_c28);
}else{
this.setSelected(_c28,true);
}
}else{
var s=(_c2b<0?_c28:_c2b);
var e=_c28;
if(s>e){
e=s;
s=_c28;
}
for(var i=s;i<=e;i++){
this.setSelected(i,true);
}
}
this.endUpdate();
};
this.clear=function(){
this.beginUpdate();
this.unselectAll();
this.endUpdate();
};
};
dojo.provide("turbo.lib.scroller");
dojo.require("dojo.event.*");
turbo.defineClass("turbo.scroller.base",null,{initializer:function(){
this.pageHeights=[];
this.stack=[];
},rowCount:0,defaultRowHeight:10,keepRows:100,contentNode:null,scrollboxNode:null,defaultPageHeight:0,keepPages:10,pageCount:0,windowHeight:0,firstVisibleRow:0,lastVisibleRow:0,page:0,pageTop:0,init:function(_c2f,_c30,_c31){
switch(arguments.length){
case 3:
this.rowsPerPage=_c31;
case 2:
this.keepRows=_c30;
case 1:
this.rowCount=_c2f;
}
this.defaultPageHeight=this.defaultRowHeight*Math.min(this.rowsPerPage,this.rowCount);
this.pageCount=Math.ceil(this.rowCount/this.rowsPerPage);
this.keepPages=Math.max(Math.ceil(this.keepRows/this.rowsPerPage),2);
this.invalidate();
if(this.scrollboxNode){
this.scrollboxNode.scrollTop=0;
this.scroll(0);
this.scrollboxNode.onscroll=turbo.bind(this,"onscroll");
}
},setRowCount:function(_c32){
this.rowCount=_c32;
this.defaultPageHeight=this.defaultRowHeight*Math.min(this.rowsPerPage,this.rowCount);
this.pageCount=Math.ceil(this.rowCount/this.rowsPerPage);
},pageExists:function(_c33){
},measurePage:function(_c34){
},positionPage:function(_c35,_c36){
},repositionPages:function(_c37,_c38,_c39){
},installPage:function(_c3a){
},preparePage:function(_c3b,_c3c,_c3d){
},renderPage:function(_c3e){
},removePage:function(_c3f){
},resize:function(){
if(this.scrollboxNode){
this.windowHeight=this.scrollboxNode.clientHeight;
}
turbo.setStyleHeightPx(this.contentNode,this.height);
},updateContentHeight:function(inDh){
this.height+=inDh;
this.resize(this.height);
},invalidate:function(){
while(this.stack.length){
this.destroyPage(this.popPage());
}
this.pageHeights=[];
this.height=this.pageCount*this.defaultPageHeight;
this.resize();
},createPageNode:function(){
var p=document.createElement("div");
p.style.position="absolute";
p.style.width="100%";
p.style.left="0";
return p;
},getPageHeight:function(_c42){
var ph=this.pageHeights[_c42];
return (ph===undefined?this.defaultPageHeight:ph);
},pushPage:function(_c44){
return this.stack.push(_c44);
},popPage:function(){
return this.stack.shift();
},findPage:function(_c45){
var i=0,h=0;
for(var ph=0;i<this.pageCount;i++,h+=ph){
ph=this.getPageHeight(i);
if(h+ph>=_c45){
break;
}
}
this.page=i;
this.pageTop=h;
},buildPage:function(_c49,_c4a,_c4b){
this.preparePage(_c49,_c4a);
this.positionPage(_c49,_c4b);
this.renderPage(_c49);
this.installPage(_c49);
this.pushPage(_c49);
},needPage:function(_c4c,_c4d){
var h=this.getPageHeight(_c4c),oh=h;
if(!this.pageExists(_c4c)){
this.buildPage(_c4c,(this.keepPages&&(this.stack.length>=this.keepPages)),_c4d);
h=this.measurePage(_c4c)||h;
this.pageHeights[_c4c]=h;
if(h&&(oh!=h)){
this.updateContentHeight(h-oh);
}
}else{
this.positionPage(_c4c,_c4d);
}
return h;
},onscroll:function(){
this.scroll(this.scrollboxNode.scrollTop);
},getScrollBottom:function(_c50){
return _c50+this.windowHeight;
},scroll:function(_c51){
this.findPage(_c51);
var b=this.getScrollBottom(_c51);
var h=this.height;
for(var p=this.page,y=this.pageTop;p<this.pageCount&&y<b;p++){
y+=this.needPage(p,y);
}
this.firstVisibleRow=this.getFirstVisibleRow(this.page,this.pageTop,_c51);
this.lastVisibleRow=this.getLastVisibleRow(p-1,y,b);
if(h!=this.height){
this.repositionPages(p,y,b);
}
},processNodeEvent:function(e,_c57){
var t=e.target;
while(t&&(t!=_c57)&&t.parentNode&&(t.parentNode.parentNode!=_c57)){
t=t.parentNode;
}
if(!t||!t.parentNode||(t.parentNode.parentNode!=_c57)){
return false;
}
var page=t.parentNode;
e.topRowIndex=page.pageIndex*this.rowsPerPage;
e.rowIndex=e.topRowIndex+turbo.indexInParent(t);
e.rowTarget=t;
return true;
},processEvent:function(e){
return this.processNodeEvent(e,this.contentNode);
},dummy:0});
turbo.defineClass("turbo.scroller",turbo.scroller.base,{initializer:function(){
this.pageNodes=[];
},renderRow:function(_c5b,_c5c){
},removeRow:function(_c5d){
},getDefaultNodes:function(){
return this.pageNodes;
},getDefaultPageNode:function(_c5e){
return this.getDefaultNodes()[_c5e];
},positionPageNode:function(_c5f,_c60){
_c5f.style.top=_c60+"px";
},getPageNodePosition:function(_c61){
return _c61.offsetTop;
},repositionPageNodes:function(_c62,_c63,_c64,_c65){
var last=0;
for(var i=0;i<this.stack.length;i++){
last=Math.max(this.stack[i],last);
}
for(var p=_c62,y=_c63;p<=last;p++){
var n=_c65[p];
if(n){
if(this.getPageNodePosition(n)==y){
return;
}
this.positionPage(p,y);
}
y+=this.getPageHeight(p);
}
},invalidatePageNode:function(_c6b,_c6c){
var p=_c6c[_c6b];
if(p){
delete _c6c[_c6b];
this.removePage(_c6b,p);
turbo.clean(p);
p.innerHTML="";
}
return p;
},preparePageNode:function(_c6e,_c6f,_c70){
var p=(_c6f===null?this.createPageNode():this.invalidatePageNode(_c6f,_c70));
p.pageIndex=_c6e;
p.id="page-"+_c6e;
_c70[_c6e]=p;
},pageExists:function(_c72){
return Boolean(this.getDefaultPageNode(_c72));
},measurePage:function(_c73){
return this.getDefaultPageNode(_c73).offsetHeight;
},positionPage:function(_c74,_c75){
this.positionPageNode(this.getDefaultPageNode(_c74),_c75);
},repositionPages:function(_c76,_c77,_c78){
this.repositionPageNodes(_c76,_c77,_c78,this.getDefaultNodes());
},preparePage:function(_c79,_c7a){
this.preparePageNode(_c79,(_c7a?this.popPage():null),this.getDefaultNodes());
},installPage:function(_c7b){
this.contentNode.appendChild(this.getDefaultPageNode(_c7b));
},destroyPage:function(_c7c){
var p=this.invalidatePageNode(_c7c,this.getDefaultNodes());
turbo.remove(p);
},renderPage:function(_c7e){
var node=this.pageNodes[_c7e];
for(var i=0,j=_c7e*this.rowsPerPage;i<this.rowsPerPage&&j<this.rowCount;i++,j++){
this.renderRow(j,node);
}
},removePage:function(_c82){
for(var i=0,j=_c82*this.rowsPerPage;i<this.rowsPerPage;i++,j++){
this.removeRow(j);
}
},getPageRow:function(_c85){
return _c85*this.rowsPerPage;
},getLastPageRow:function(_c86){
return Math.min(this.rowCount,this.getPageRow(_c86+1))-1;
},getFirstVisibleRowNodes:function(_c87,_c88,_c89,_c8a){
var row=this.getPageRow(_c87);
var rows=turbo.divkids(_c8a[_c87]);
for(var i=0,l=rows.length;i<l&&_c88<_c89;i++,row++){
_c88+=rows[i].offsetHeight;
}
return (row?row-1:row);
},getFirstVisibleRow:function(_c8f,_c90,_c91){
if(!this.pageExists(_c8f)){
return 0;
}
return this.getFirstVisibleRowNodes(_c8f,_c90,_c91,this.getDefaultNodes());
},getLastVisibleRowNodes:function(_c92,_c93,_c94,_c95){
var row=this.getLastPageRow(_c92);
var rows=turbo.divkids(_c95[_c92]);
for(var i=rows.length-1;i>=0&&_c93>_c94;i--,row--){
_c93-=rows[i].offsetHeight;
}
return row+1;
},getLastVisibleRow:function(_c99,_c9a,_c9b){
if(!this.pageExists(_c99)){
return 0;
}
return this.getLastVisibleRowNodes(_c99,_c9a,_c9b,this.getDefaultNodes());
},findTopRowForNodes:function(_c9c,_c9d){
var rows=turbo.divkids(_c9d[this.page]);
for(var i=0,l=rows.length,t=this.pageTop,h;i<l;i++){
h=rows[i].offsetHeight;
t+=h;
if(t>=_c9c){
this.offset=h-(t-_c9c);
return i+this.page*this.rowsPerPage;
}
}
return -1;
},findScrollTopForNodes:function(_ca3,_ca4){
var _ca5=Math.floor(_ca3/this.rowsPerPage);
var t=0;
for(var i=0;i<_ca5;i++){
t+=this.getPageHeight(i);
}
this.pageTop=t;
this.needPage(_ca5,this.pageTop);
var rows=turbo.divkids(_ca4[_ca5]);
var r=_ca3-this.rowsPerPage*_ca5;
for(var i=0,l=rows.length;i<l&&i<r;i++){
t+=rows[i].offsetHeight;
}
return t;
},findTopRow:function(_cab){
return this.findTopRowForNodes(_cab,this.getDefaultNodes());
},findScrollTop:function(_cac){
return this.findScrollTopForNodes(_cac,this.getDefaultNodes());
},dummy:0});
turbo.defineClass("turbo.scroller.columns",turbo.scroller,{initializer:function(_cad){
this.contentNodes=_cad;
this.colCount=this.contentNodes.length;
this.pageNodes=[];
for(var i=0;i<this.colCount;i++){
this.pageNodes[i]=[];
}
},getDefaultNodes:function(){
return this.pageNodes[0];
},resize:function(){
if(this.scrollboxNode){
this.windowHeight=this.scrollboxNode.clientHeight;
}
for(var i=0;i<this.colCount;i++){
turbo.setStyleHeightPx(this.contentNodes[i],this.height);
}
},positionPage:function(_cb0,_cb1){
for(var i=0;i<this.colCount;i++){
this.positionPageNode(this.pageNodes[i][_cb0],_cb1);
}
},preparePage:function(_cb3,_cb4){
var p=(_cb4?this.popPage():null);
for(var i=0;i<this.colCount;i++){
this.preparePageNode(_cb3,p,this.pageNodes[i]);
}
},installPage:function(_cb7){
for(var i=0;i<this.colCount;i++){
this.contentNodes[i].appendChild(this.pageNodes[i][_cb7]);
}
},destroyPage:function(_cb9){
for(var i=0;i<this.colCount;i++){
turbo.remove(this.invalidatePageNode(_cb9,this.pageNodes[i]));
}
},renderPage:function(_cbb){
var _cbc=[];
for(var i=0;i<this.colCount;i++){
_cbc[i]=this.pageNodes[i][_cbb];
}
for(var i=0,j=_cbb*this.rowsPerPage;i<this.rowsPerPage&&j<this.rowCount;i++,j++){
this.renderRow(j,_cbc);
}
},dummy:0});
dojo.provide("turbo.data.fields");
turbo.data.mixer=function(){
this.defaultValue={};
this.values=[];
this.count=function(){
return this.values.length;
};
this.clear=function(){
this.values=[];
};
this.build=function(_cbf){
var _cc0=turbo.swiss(this.defaultValue,{owner:this});
_cc0.key=_cbf;
this.values[_cbf]=_cc0;
return _cc0;
};
this.getDefault=function(){
return this.defaultValue;
};
this.setDefault=function(_cc1){
for(var i=0,l=arguments.length;i<l;i++){
turbo.swiss(arguments[i],this.defaultValue);
}
};
this.get=function(_cc4){
return (this.values[_cc4]||this.build(_cc4));
};
this._set=function(_cc5,_cc6){
var v=this.get(_cc5);
for(var i=1;i<arguments.length;i++){
turbo.swiss(arguments[i],v);
}
this.values[_cc5]=v;
};
this.set=function(){
if(arguments.length<1){
return;
}
var a=arguments[0];
if(!dojo.lang.isArray(a)){
this._set.apply(this,arguments);
}else{
for(i=0,l=a.length;i<l;i++){
this._set(i,a[i]);
}
}
};
this.insert=function(_cca,_ccb){
if(_cca>=this.values.length){
this.values[_cca]=_ccb;
}else{
this.values.splice(_cca,0,_ccb);
}
};
this.remove=function(_ccc){
this.values.splice(_ccc,1);
};
this.swap=function(_ccd,_cce){
turbo.arraySwap(this.values,_ccd,_cce);
};
this.move=function(_ccf,_cd0){
turbo.arrayMove(this.values,_ccf,_cd0);
};
};
turbo.data.field=function(_cd1){
this.name=_cd1;
this.compare=turbo.data.compare;
this.na="...";
};
turbo.data.fields=function(_cd2){
turbo.data.mixer.call(this);
var _cd3=(_cd2?_cd2:turbo.data.field);
this.defaultValue=new _cd3();
};
turbo.data.compare=function(a,b){
return (a>b?1:(a==b?0:-1));
};
turbo.data.generateComparator=function(_cd6,_cd7,_cd8){
return function(a,b){
var c=Math.abs(_cd7)-1;
var ineq=_cd6(a[c],b[c]);
return (ineq?(_cd7>0?ineq:-ineq):(_cd8&&_cd8(a,b)));
};
};
dojo.provide("turbo.data.model");
dojo.require("turbo.data.fields");
turbo.defineClass("turbo.buffer",null,{badIndex:function(_cdd,_cde){
},isGoodIndex:function(){
return true;
},setData:function(){
},get:function(){
},getDatum:function(){
if(!this.isGoodIndex.apply(this,arguments)){
return this.badIndex.call(this,"getDatum",arguments);
}
return this.get.apply(this,arguments);
},set:function(_cdf){
},setDatum:function(_ce0){
if(!this.isGoodIndex.apply(this,turbo.cloneArguments(arguments,1))){
return this.badIndex.call(this,"setDatum",turbo.cloneArguments(arguments,1));
}
return this.set.apply(this,arguments);
},dummy:0},function(){
if(!djConfig.isDebug){
this.getDatum=this.get;
this.setDatum=this.set;
}
});
turbo.defineClass("turbo.buffer.table",turbo.buffer,{data:[],getRowCount:function(){
return (this.data?this.data.length:0);
},getColCount:function(){
return (this.data&&this.data.length?this.data[0].length:0);
},badIndex:function(_ce1,_ce2){
turbo.debugf("%s.%s: bad index (%d, %d)",this.className,_ce1,_ce2[0],(_ce2[1]||"n/a"));
},isGoodIndex:function(_ce3,_ce4){
return (_ce3>=0&&_ce3<this.getRowCount()&&(arguments.length<2||(_ce4>=0&&_ce4<this.getColCount())));
},setData:function(_ce5){
this.data=_ce5;
},get:function(_ce6,_ce7){
return this.data[_ce6][_ce7];
},set:function(_ce8,_ce9,_cea){
this.data[_ce9][_cea]=_ce8;
},getRow:function(_ceb){
return this.data[_ceb];
},setRow:function(_cec,_ced){
this.data[_ced]=_cec;
},getRowData:function(_cee){
if(!this.isGoodIndex(_cee)){
return this.badIndex.call(this,"getRowData",arguments);
}
return this.getRow.apply(this,arguments);
},setRowData:function(_cef,_cf0){
if(!this.isGoodIndex(_cf0)){
return this.badIndex.call(this,"setRowData",[_cf0]);
}
return this.setRow.apply(this,arguments);
},sort:function(_cf1){
if(_cf1){
this.data.sort(_cf1);
}
},dummy:0},function(){
if(!djConfig.isDebug){
this.getRowData=this.getRow;
this.setRowData=this.setRow;
}
});
turbo.defineClass("turbo.data.model",null,{buffer:null,bufferType:turbo.buffer,clearData:function(){
this.setData(null);
},change:function(){
},getColCount:function(){
return this.fields.count()||this.buffer.getColCount();
},getRowCount:function(){
return this.buffer.getRowCount();
},setData:function(){
this.buffer.setData.apply(this.buffer,arguments);
this.change();
},get:function(){
return this.buffer.getDatum.apply(this.buffer,arguments);
},set:function(_cf2){
this.buffer.setDatum.apply(this.buffer,arguments);
this.change.apply(this,turbo.cloneArguments(arguments,1));
},getRow:function(_cf3){
return this.buffer.getRowData(_cf3);
},setRow:function(_cf4,_cf5){
this.buffer.setRowData(_cf4,_cf5);
this.change(_cf5);
},makeComparator:function(){
var _cf6=null;
for(var i=arguments.length-1,col;i>=0;i--){
col=Math.abs(arguments[i])-1;
if(col>=0){
_cf6=turbo.data.generateComparator(this.fields.get(col).compare,arguments[i],_cf6);
}
}
return _cf6;
},canSort:function(){
return Boolean(this.buffer.sort);
},sort:function(){
this.buffer.sort(this.makeComparator.apply(this,arguments));
},dummy:0},function(_cf9){
this.buffer=new (_cf9||this.bufferType);
this.buffer.model=this;
this.fields=new turbo.data.fields();
});
turbo.defineClass("turbo.data.virtual",turbo.data.model,{bufferType:turbo.buffer,colCount:0,rowCount:0,getColCount:function(){
return this.colCount;
},getRowCount:function(){
return this.rowCount;
},get:function(){
},sort:null,canSort:function(){
return Boolean(this.sort);
}},function(){
this.buffer.get=function(){
return this.model.get.apply(this.model,arguments);
};
});
turbo.defineClass("turbo.data.table",turbo.data.model,{bufferType:turbo.buffer.table});
turbo.defineClass("turbo.data.dynamic",turbo.data.table,{rowsPerPage:100,page:[],pages:[],bop:-1,eop:-1,rowCount:0,clearData:function(){
this.pages=[];
this.bop=this.eop=-1;
this.setData([]);
},rowToPage:function(_cfa){
return (this.rowsPerPage?Math.floor(_cfa/this.rowsPerPage):_cfa);
},pageToRow:function(_cfb){
return (this.rowsPerPage?this.rowsPerPage*_cfb:_cfb);
},requestRows:function(_cfc,_cfd){
},requestPage:function(_cfe){
var row=this.pageToRow(_cfe);
var _d00=Math.min(this.rowsPerPage,this.rowCount-row);
if(_d00>0){
this.requestRows(row,_d00);
}
},needPage:function(_d01){
if(!this.pages[_d01]){
this.pages[_d01]=true;
this.requestPage(_d01);
}
},preparePage:function(_d02,_d03){
if(_d02<this.bop||_d02>=this.eop){
var _d04=this.rowToPage(_d02);
this.needPage(_d04);
this.bop=_d04*this.rowsPerPage;
this.eop=this.bop+(this.rowsPerPage||this.rowCount);
}
},getRow:function(_d05){
var row=turbo.data.table.prototype.getRow.call(this,_d05);
if(!row){
this.preparePage(_d05);
}
return row;
},get:function(_d07,_d08){
var row=this.getRow(_d07);
return (row?row[_d08]:this.fields.get(_d08).na);
},set:function(_d0a,_d0b,_d0c){
var row=this._getRow(_d0b);
if(!row){
throw new Error(this.className+"set: cannot set data on an unloaded row");
}
row[_d0c]=_d0a;
},canSort:function(){
return false;
}},function(){
this.buffer.getRowCount=function(){
return this.model.rowCount;
};
});
dojo.provide("turbo.grid.editors");
turbo.mix=function(){
var obj={};
for(var i=0,l=arguments.length;i<l;i++){
dojo.lang.mixin(obj,arguments[i]);
}
return obj;
};
turbo.grid.edit={};
turbo.grid.edit.noedit={edit:function(_d11,_d12,_d13){
return false;
},clicked:function(e){
return false;
},getValue:function(){
return null;
},selectAndFocus:function(){
}};
turbo.grid.edit.line={createInput:function(_d15,_d16){
var i=turbo.create("input");
i.setAttribute("autocomplete","OFF");
i.style.width=(_d15.clientWidth-8)+"px";
i.style.height=(_d15.clientHeight-4)+"px";
i.value=(_d16===undefined?"":String(_d16));
i.onselectstart=function(){
return true;
};
i.className="turbogrid-textinput";
_d15.innerHTML="";
_d15.appendChild(i);
return i;
},edit:function(_d18,_d19){
this.client.input=this.createInput(_d18,_d19);
},selectAndFocus:function(){
try{
this.client.input.focus();
this.client.input.select();
}
catch(e){
}
},getValue:function(){
return (this.client.input.value=="null"?null:(this.client.input.value=="undefined"?undefined:this.client.input.value));
}};
turbo.grid.edit.number=turbo.mix(turbo.grid.edit.line,{getValue:function(){
return Number(turbo.grid.edit.line.getValue.call(this));
}});
turbo.grid.edit.clickable={doclick:function(e){
if(this.column.onclick&&this.column.onclick(e,this)===false){
return false;
}
this.client.applyEdit();
return true;
},edit:function(_d1b,_d1c,_d1d){
return true;
},clicked:function(e){
return this.doclick(e);
}};
turbo.grid.edit.input=turbo.mix(turbo.grid.edit.clickable,{edit:function(_d1f,_d20,_d21){
this.input=_d1f.childNodes[0];
return this.clicked(_d21);
},clicked:function(e){
if(e&&(turbo.getTagName(e.target)!=turbo.getTagName(this.input))){
return false;
}
return this.doclick(e);
},getValue:function(){
return this.input.value;
}});
turbo.grid.edit.bool=turbo.mix(turbo.grid.edit.input,{getValue:function(){
return this.input.checked;
}});
turbo.grid.edit.enumerated={buildOptions:function(_d23){
var h="";
var os=this.column.options;
if(!os){
return h;
}
var vs=this.column.values;
for(var i=0,l=os.length,v,s;i<l;i++){
if(vs&&vs[i]){
v=" value=\""+vs[i]+"\"";
s=(vs[i]==_d23);
}else{
v="";
s=(os[i]==_d23);
}
s=(s?" selected":"");
h+="<option"+v+s+">"+os[i]+"</option>";
}
return h;
},createInput:function(_d2b,_d2c){
_d2b.innerHTML="<select autocomplete=\"off\" class=\"turbogrid-select\">"+this.buildOptions(_d2c)+"</select>";
dojo.html.addClass(_d2b,"turbogrid-select-cell");
var s=_d2b.childNodes[0];
if(this.column.autoCommit){
dojo.event.connect(s,"onchange",turbo.grid.edit.enumerated,"change");
}
return s;
},change:function(){
this.client.applyEdit();
},edit:function(_d2e,_d2f){
this.client.input=this.createInput(_d2e,_d2f);
},getValue:function(){
return turbo.getSelectValue(this.client.input);
}};
dojo.provide("turbo.grid.formatters");
turbo.grid.format={};
turbo.grid.format.noformat=function(_d30,_d31){
return _d30;
};
turbo.grid.format.text=function(_d32,_d33){
return _d32;
};
turbo.grid.format.line=turbo.grid.format.text;
turbo.grid.format.text2=function(_d34,_d35){
if(_d34==null){
this.style+=" color: #CCBBB3;";
_d34="~";
}else{
if(typeof (_d34)=="string"&&_d34.length>255){
_d34="(text: "+_d34.length+" chars)";
}else{
if(!this.noespace){
_d34=turbo.escapeText(_d34);
}
}
}
return _d34;
};
turbo.grid.format.bool=function(_d36,_d37){
return "<input class=\"turbogrid-checkbox\" type=\"checkbox\""+(_d36?" checked=\"checked\"":"")+(_d37?" disabled=\"disabled\"":"")+" >";
};
turbo.grid.format.inputButton=function(_d38,_d39){
return "<input type=\"button\" style=\"width: 100%; height: 100%;\""+(_d39?" disabled=\"disabled\"":"")+" value=\""+_d38+"\" />";
};
turbo.grid.format.button=function(_d3a,_d3b){
return "<button style=\"width: 100%; height: 100%;\""+(_d3b?" disabled=\"disabled\"":"")+" >"+_d3a+"</button>";
};
turbo.grid.format.enumerated=function(_d3c,_d3d){
var s="width: "+(this.width-20)+"px; height: 16px;";
var p=dojo.uri.dojoUri(turbo.themeRoot+"default/images/turbo_drop_indicator"+(_d3d?"_dis":"")+".gif");
s+=" background: url('"+p+"') right center no-repeat; padding-right: 20px;";
if(this.align){
s+=" text-align: "+this.align+";";
}
return "<div"+(s?" style=\""+s+"\"":"")+"\">"+_d3c+"</div>";
};
turbo.grid.format.decimal=function(_d40,_d41){
var f="~";
f=parseFloat(_d40);
f=(this.decimals?f.toFixed(this.decimals):f)+(this.units?this.units:"");
return f;
};
turbo.grid.format.money=function(_d43,_d44){
var f=parseFloat(_d43);
if(isNaN(f)){
return "n/a";
}
var s=(f<0?-1:1);
this.cellClasses.push(s>=0?"":(this.negClassName||""));
f=f*s;
var i=Math.floor(f).toString();
var l=i.length+(s<0?1:0);
f=(s<0?"&#45;":"")+f.toFixed(2);
l=(this.digits||5)-l;
return "$"+turbo.stringOf(l,"&#160;")+f;
};
turbo.grid.format.image=function(_d49,_d4a){
var src=(this.images?this.images[_d49]:_d49);
return (src?"<img src=\""+(this.root||"")+src+"\" alt=\""+_d49+"\" title=\""+_d49+"\"/>":_d49);
};
dojo.provide("turbo.grid.columns");
turbo.defineClass("turbo.grid.columns",null,{units:"px",getColByValue:function(_d4c,_d4d){
_d4d=_d4d||"name";
for(var i=0,c=this.count(),col;i<c;i++){
col=this.get(i);
if(col[_d4d]==_d4c){
return col;
}
}
return null;
},visibleToColIndex:function(_d51){
for(var i=0,l=this.count(),idx=_d51;i<l;i++){
if(!this.get(i).hidden&&!idx--){
return i;
}
}
return _d51;
},colToVisibleIndex:function(_d55){
for(var i=0,idx=_d55;i<=_d55;i++){
if(this.get(i).hidden){
idx--;
}
}
return idx;
},moveColumn:function(_d58,_d59){
var c=this.count();
var map=new Array(c);
for(var i=0,j=0;i<c;i++){
if(i==_d58){
j=i+1;
}
map[i]=(i!=j&&this.get(i).canMove===false?i:j++);
while(j<c&&this.get(j).canMove===false){
j++;
}
}
if(_d59>_d58){
_d59--;
}
for(var i=0,j=0;i<c;i++){
if(j==_d58){
j++;
while(j<c&&this.get(j).canMove===false){
j++;
}
}
if(i==_d59){
map[i]=_d58;
}else{
map[i]=(i!=j&&this.get(i).canMove===false?i:j++);
}
}
return map;
}},function(){
turbo.data.fields.call(this,turbo.grid.column);
});
turbo.defineClass("turbo.grid.column",null,{client:null,key:null,caption:"",width:64,readonly:false,editor:null,formatter:turbo.grid.format.text,colClass:"",colStyle:"",stylize:function(_d5e,_d5f,_d60,_d61){
},format:function(_d62,_d63,_d64,_d65){
if(!this.formatter){
turbo.debug("turbo.grid.column: null formatter for column ["+this.caption+"]");
this.formatter=turbo.grid.format.text;
}
this.client=this.owner.client;
this.cellStyles=[];
this.cellClasses=[];
var _d66=(this.readonly||_d63||!this.editor);
var f=this.formatter.call(this,_d62,_d66,_d64,_d65);
this.stylize(_d64,_d65,_d62,_d66);
return f;
},getEditor:function(_d68,_d69,_d6a){
if(!this.editor||this.readonly){
return turbo.grid.edit.noedit;
}else{
this.editor.client=_d68;
this.editor.column=this;
return this.editor;
}
}},function(_d6b){
this.caption=(_d6b||this.caption);
});
turbo.grid.columns.number={align:"right",editor:turbo.grid.edit.number};
turbo.grid.columns.decimal={align:"right",formatter:turbo.grid.format.decimal,decimals:3,editor:turbo.grid.edit.number};
turbo.grid.columns.bool={width:20,align:"center",formatter:turbo.grid.format.bool,editor:turbo.grid.edit.bool};
turbo.grid.columns.button={formatter:turbo.grid.format.button,editor:turbo.grid.edit.input};
turbo.grid.columns.enumerated={formatter:turbo.grid.format.enumerated,editor:turbo.grid.edit.enumerated};
turbo.grid.columns.money={align:"right",formatter:turbo.grid.format.money,colClass:"turbogrid-money",negClassName:"turbogrid-money-neg"};
turbo.grid.columns.image={align:"center",formatter:turbo.grid.format.image,root:"images/"};
dojo.provide("turbo.grid.header");
turbo.grid.header=function(_d6c,_d6d,_d6e){
this.client=_d6c;
this.columns=_d6d;
this.colCount=0;
this.node=_d6e;
this.kids=null;
this.moving=false;
this.resizing=false;
this.sepWidth=7;
this.hysteresis=4;
this.minColWidth=12;
this.sortColumn=-1;
this.leftPad=2;
this.widthPad=6;
this.heightPad=8;
this.sortPad=12;
this.sortMin=16;
this.defaultRowHeight=21;
this.sortDesc=false;
this.classTag="turbogrid-header";
turbo.funnelEvents(this.node,this,"dispatchEvent");
this.getDatum=function(_d6f,_d70){
};
this.getHeaderAlign=function(_d71,_d72){
return (_d72.align||"left");
};
this.sortClick=function(){
return false;
};
this.getColCount=function(){
return this.colCount;
};
this.getColWidth=function(_d73){
var col=this.columns.get(_d73);
return (col.hidden?0:col.width+this.widthPad);
};
this.expandSortColumn=function(_d75){
if(this.sortColumn>=0){
this.client.doSetColWidth(this.sortColumn,this.columns.get(this.sortColumn).width+_d75);
}
};
this.setSortColumn=function(_d76){
this.sortDesc=(this.sortColumn==_d76?!this.sortDesc:false);
this.sortColumn=_d76;
};
this.getSortIndex=function(){
return (this.sortColumn<0?0:(this.columns.get(this.sortColumn).key+1)*(this.sortDesc?-1:1));
};
this.getHeaderSortClass=function(_d77,_d78){
return " class=\""+this.classTag+"-sort-"+((_d78.width<this.sortMin)||(this.sortColumn!==_d77)?"none":(this.sortDesc?"down":"up"))+"\"";
};
this.getCellContent=function(_d79,_d7a){
var col=this.columns.get(_d79);
var d=(this.getDatum(col.key,_d7a)||col.caption||col.name||turbo.alphabetizeIndex(col.key));
return "<div"+this.getHeaderSortClass(_d79,col)+" style=\"text-align:"+this.getHeaderAlign(_d79,col)+";\">"+d+"</div>";
};
this.getRowContent=function(){
this.cols=this.getColCount();
if(this.cols<=0){
return "";
}
var cols=[];
for(var i=0,x=0,w,c;i<this.cols;i++){
w=this.getColWidth(i);
if(!w){
continue;
}
c=this.getCellContent(i,this.row);
cols.push(turbo.printf("%d%s; left: %d%s;\"><div class=\"%s-cell\">%s",w,this.columns.units,x,this.columns.units,this.classTag,c));
x+=w+this.leftPad;
}
if(cols.length==0){
return "";
}
return turbo.conjoin(cols,"<div class=\"turbogrid-header-col\" style=\"width: ","</div></div>");
};
this.measureRowHeight=function(){
return this.measureHeights(this.kids);
};
this.normalizeRowHeight=function(){
this.node.style.height="";
var h=this.measureHeights(this.kids);
this.normalizeHeights(h);
turbo.setStyleHeightPx(this.node,(this.kids.length?this.kids[0].offsetHeight:this.defaultRowHeight));
var ret=this.node.offsetHeight;
return (ret==null)?0:ret;
};
this.measureHeights=function(_d84){
for(var i=0,l=_d84.length,h=0;i<l;i++){
h=Math.max(_d84[i].childNodes[0].offsetHeight,h);
}
return h;
};
this.normalizeHeights=function(inH){
for(var i=0,l=this.kids.length,h=0;i<l;i++){
turbo.setStyleHeightPx(this.kids[i].childNodes[0],inH);
}
};
this.build=function(){
this.node.innerHTML=this.getRowContent();
this.kids=turbo.divkids(this.node);
};
this.updateColumn=function(_d8c){
this.positionColumns(_d8c);
};
this.positionColumns=function(_d8d){
_d8d=(_d8d||0);
for(var i=0,d=0,x=0,w,l=this.getColCount(),div;i<l;i++){
w=this.getColWidth(i);
if(!w){
continue;
}
if(i>=_d8d){
div=this.kids[d];
turbo.setStyleLeftPx(div,x);
turbo.setStyleWidthPx(div,w);
}
d++;
x+=w+this.leftPad;
}
this.node.offsetHeight;
};
this.findEventCol=function(e){
var n=(e.target!=this.node?e.target:null);
while(n&&n.parentNode!=this.node){
n=n.parentNode;
}
e.cellTarget=n;
return (n!=null);
};
this.calcCellX=function(e){
e.cellX=e.layerX;
var n=e.target;
while(n&&n!=e.cellTarget){
e.cellX+=(n.offsetLeft<0?0:n.offsetLeft);
n=n.parentNode;
}
};
this.processEvent=function(e){
if(!this.findEventCol(e)){
if(e.currentTarget==this.node){
this.node.style.cursor="default";
}
return false;
}
e.cellIndex=turbo.indexInParent(e.cellTarget);
e.colIndex=this.columns.visibleToColIndex(e.cellIndex);
this.calcCellX(e);
return (e.cellIndex>=0&&e.cellIndex<this.cols);
};
this.dispatchEvent=function(e){
if(!this.processEvent(e)){
return;
}
var m=e.type;
if(m in this){
this[m](e);
}
};
this.mouseover=function(e){
if(!turbo.drag.dragging){
dojo.html.addClass(e.cellTarget,"turbogrid-header-selected");
}
};
this.mouseout=function(e){
dojo.html.removeClass(e.cellTarget,"turbogrid-header-selected");
};
this.mousemove=function(e){
if(!turbo.drag.dragging){
this.node.style.cursor=(this.overLeftResizeArea(e)?"w-resize":(this.overRightResizeArea(e)?"e-resize":"default"));
}
};
this.mousedown=function(e){
if(!turbo.drag.dragging){
if(this.overLeftResizeArea(e)){
this.beginColumnLeftResize(e);
}else{
if(this.overRightResizeArea(e)){
this.beginColumnRightResize(e);
}else{
this.beginMoveColumn(e);
}
}
}
};
this.click=function(e){
this.setSortColumn(this.columns.get(e.colIndex).key);
if(!this.sortClick()){
this.setSortColumn(-1);
}
};
this.canResizeColumn=function(_da0){
return (_da0>=this.cols||this.columns.get(_da0).canResize!==false);
};
this.overLeftResizeArea=function(e){
return (e.cellIndex>0&&e.cellX<this.hysteresis&&this.canResizeColumn(e.colIndex-1));
};
this.overRightResizeArea=function(e){
return (e.cellX>=e.cellTarget.offsetWidth-this.hysteresis&&this.canResizeColumn(e.colIndex));
};
this.beginColumnLeftResize=function(e){
e.cellIndex--;
e.colIndex--;
this.beginColumnResize(e);
};
this.beginColumnRightResize=function(e){
this.beginColumnResize(e);
};
this.beginColumnResize=function(e){
turbo.killEvent(e);
var drag={colIndex:e.colIndex,x:e.clientX,w:this.getColWidth(e.colIndex)};
turbo.drag.start(e.cellTarget,turbo.bindArgs(this,"doResizeColumn",drag),turbo.bindArgs(this,"endResizeColumn",drag));
};
this.doResizeColumn=function(_da7,_da8){
var dx=_da7.x-_da8.clientX;
var w=_da7.w-dx;
if(w>=this.minColWidth){
this.client.doSetColWidth(_da7.colIndex,w);
this.updateColumn(_da7.colIndex);
}
_da7.w=w;
_da7.x=_da8.clientX;
};
this.endResizeColumn=function(_dab){
this.resizing=false;
turbo.defer(this.client,"update",100);
};
this.beginMoveColumn=function(e){
turbo.killEvent(e);
window.status=e.colIndex;
if(this.columns.get(e.colIndex).canMove===false){
return;
}
var drag={colIndex:e.colIndex,cellNode:e.cellTarget,rowLeft:turbo.getAbsoluteX(this.node,true)};
var _dae=turbo.bindArgs(this,"startDragColumn",drag);
var _daf=turbo.bindArgs(this,"doDragColumn",drag);
var _db0=turbo.bindArgs(this,"endDragColumn",drag);
turbo.drag.start(this.node,_daf,_db0,e,_dae);
};
this.startDragColumn=function(_db1,_db2){
this.moving=true;
_db1.cellNode.style.backgroundColor="#E0DEC9";
this.node.style.cursor="move";
};
this.doDragColumn=function(_db3,_db4){
var dst=this.findColumnByX(_db3.colIndex,_db4.clientX-_db3.rowLeft);
if(dst>=0&&dst!=_db3.colIndex){
this.moveColumn(_db3.colIndex,dst);
_db3.colIndex=dst;
}
};
this.endDragColumn=function(_db6){
this.node.style.cursor="";
_db6.cellNode.style.backgroundColor="";
this.moving=false;
this.client.update();
};
this.findColumnByX=function(_db7,inX){
for(var i=0,x=0,w;i<this.cols;i++){
w=this.getColWidth(i);
if(!w){
continue;
}
if(x+w>inX){
w/=2;
return (i>_db7?(x+w<inX?i:_db7):(x+w>inX?i:_db7));
}
x+=w+this.leftPad;
}
return -1;
};
this.getColumnNode=function(_dbc){
return this.kids[this.columns.colToVisibleIndex(_dbc)];
};
this.moveColumn=function(_dbd,_dbe){
var _dbf=(_dbe>_dbd?1:0);
var s=this.columns.colToVisibleIndex(_dbd);
var d=this.columns.colToVisibleIndex(_dbe)+_dbf;
this.node.insertBefore(this.kids[s],this.kids[d]);
this.kids=turbo.divkids(this.node);
_dbe+=_dbf;
this.sortColumn=turbo.moveIndex(this.sortColumn,_dbd,_dbe);
this.client.doMoveColumn(_dbd,_dbe);
this.positionColumns();
};
};
dojo.provide("turbo.grid.rowbuilder");
turbo.defineClass("turbo.grid.rowBuilder",null,{initializer:function(_dc2){
this.client=_dc2;
},client:null,rowClass:"",defaultRowWidth:2000,defaultRowHeight:24,defaultUnits:"px",getRowWidth:function(){
return this.defaultRowWidth;
},getRowHeight:function(){
return this.defaultRowHeight;
},buildContent:function(_dc3,_dc4){
this.defaultBuildContent(_dc3,_dc4);
},defaultBuildContent:function(_dc5,_dc6){
_dc6.innerHTML="<div>"+_dc5+"</div>";
},buildRow:function(_dc7,_dc8){
var row=document.createElement("div");
if(this.rowClass){
row.className=this.rowClass;
}
row.style.height=this.defaultRowHeight+this.defaultUnits;
row.dataIndex=_dc7;
this.buildContent(_dc7,row);
_dc8.appendChild(row);
return row;
}});
turbo.defineClass("turbo.grid.columnsBuilder",turbo.grid.rowBuilder,{html:[],cellClass:"cell",cellTag:"span",colCount:14,cellWidthPad:8,cellHeightPad:8,columns:null,readOnly:false,cellPre:"",cellPos:"",calcRowWidth:function(){
var w=0;
for(var i=0,col;i<this.colCount;i++){
col=this.columns.get(i);
if(!col.hidden){
w+=col.width+this.cellWidthPad;
}
}
return w;
},getDatum:function(_dcd,_dce){
return _dce+" : "+_dcd;
},getCellDatum:function(_dcf,_dd0,_dd1){
var col=(_dd1||this.columns.get(_dd0));
return this.getDatum(_dcf,col.key);
},getFormattedCellDatum:function(_dd3,_dd4,_dd5){
var col=(_dd5||this.columns.get(_dd4));
return col.format(this.getCellDatum(_dd3,_dd4,col),this.readOnly,_dd3,_dd4);
},getColumnClassName:function(_dd7){
return _dd7.cellClasses.concat([this.cellClass,_dd7.colClass]).join(" ");
},getColumnStyles:function(_dd8,_dd9){
return (_dd8.colStyle||"")+";"+_dd8.cellStyles.join(";")+";"+(dojo.render.html.moz?"left:"+_dd9+";":"");
},buildCell:function(cell,row,x){
this.html.push(this.cellPre);
var col=this.columns.get(cell);
if(col.hidden){
return 0;
}
if(!col.preformat){
var f=[this.cellHeight,"width:",col.width,this.columns.units,";"];
if(col.align){
f.push("text-align:",col.align,";");
}
col.preStyles=f.join("");
col.preformat="style=\""+col.preStyles;
}
var d=this.getFormattedCellDatum(row,cell,col);
var c=this.getColumnClassName(col);
if(c){
this.html.push("class=\"",c,"\" ");
}
this.html.push(col.preformat,this.getColumnStyles(col,x+this.columns.units));
this.html.push("\">",d,this.cellPost);
return col.width+this.cellWidthPad;
},prebuildRenderStrings:function(){
if(!this.cellPre){
this.cellPre=turbo.cat("<",this.cellTag," ");
this.cellHeight="height: "+turbo.cat(this.defaultRowHeight-this.cellHeightPad,this.columns.units,"; ");
this.cellPost="</"+this.cellTag+">";
}
},buildCells:function(_de1){
this.prebuildRenderStrings();
this.html=[];
for(var i=0,x=0;i<this.colCount;i++){
x+=this.buildCell(i,_de1,x);
}
return this.html.join("");
},defaultBuildContent:function(_de4,_de5){
_de5.builderNode=true;
_de5.innerHTML=this.buildCells(_de4);
},getCellNode:function(_de6,_de7){
return turbo.nthkid(_de6,_de7,this.cellTag);
},updateCellNode:function(_de8,_de9,_dea){
var node=this.getCellNode(_de8,_dea);
if(node){
node.innerHTML=this.getFormattedCellDatum(_de8.dataIndex,_dea);
var col=this.columns.get(_dea);
node.className=this.getColumnClassName(col);
turbo.setStyleText(node,col.preStyles+this.getColumnStyles(col,node.style.left));
}
},processEvent:function(e){
var t=e.target;
if(!e.rowTarget||!e.rowTarget.builderNode){
return false;
}
while(t&&t!=e.rowTarget&&t.parentNode!=e.rowTarget){
t=t.parentNode;
}
if(!t||t.parentNode!=e.rowTarget){
return false;
}
e.cellTarget=t;
e.cellIndex=turbo.indexInParent(t);
e.colIndex=this.columns.visibleToColIndex(e.cellIndex);
return true;
}});
dojo.provide("turbo.widgets.TurboGrid");
turbo.funnelEvents=function(_def,_df0,_df1,_df2){
var evts=(_df2?_df2:["mouseover","mouseout","mousemove","mousedown","mouseup","click","dblclick","keyup","keydown","keypress","contextmenu"]);
for(var i=0,l=evts.length;i<l;i++){
dojo.event.connect(_def,"on"+evts[i],_df0,_df1);
}
};
turbo.moveIndex=function(_df6,_df7,_df8){
if(_df6==_df7){
return _df8-(_df6<_df8);
}
return _df6-(_df6>_df7)+(_df6>=_df8);
};
turbo.hasHorizontalScrollbar=function(_df9){
return (_df9.scrollWidth>_df9.clientWidth);
};
turbo.emptyFunction=function(){
};
turbo.getStyleText=function(_dfa,_dfb){
if(dojo.lang.isUndefined(_dfa.style.cssText)){
return _dfa.getAttribute("style");
}
return _dfa.style.cssText;
};
turbo.setStyleText=function(_dfc,_dfd){
if(dojo.lang.isUndefined(_dfc.style.cssText)){
_dfc.setAttribute("style",_dfd);
}else{
_dfc.style.cssText=_dfd;
}
};
turbo.deferUntil=function(evt,_dff,_e00,_e01){
_e01=(_e01||5000);
_e00=(_e00||100);
var func=function(){
if(evt()){
window.clearInterval(job);
_dff();
}else{
_e01-=_e00;
if(_e01<=0){
window.clearInterval(job);
}
}
};
var job=window.setInterval(func,_e00);
};
dojo.widget.defineWidget("dojo.widget.html.TurboGrid",dojo.widget.html.TurboWidget,{styleRoot:"TurboGrid",classTag:"turbogrid",colCount:0,rowCount:0,defaultRowHeight:21,keepRows:120,rowsPerPage:20,fixedColCount:1,defaultLeftWidth:64,fastScroll:true,scrollRedrawThreshold:(dojo.render.html.ie?100:50),scrollboxNode:null,contentNode:null,leftNode:null,leftContentNode:null,topNode:null,topContentNode:null,headerNode:null,builder:null,scroller:null,leftBuilder:null,header:null,built:false,editCell:0,editRow:0,editor:null,over:{},lastOverCell:null,templateString:"<div><div turboalign=\"none\" class=\"turbogrid-left\" dojoAttachPoint=\"leftNode\"><div class=\"turbogrid-left-content\" dojoAttachPoint=\"leftContentNode\"></div></div><div turboalign=\"none\" class=\"turbogrid-top\" dojoAttachPoint=\"topNode\"><div class=\"turbogrid-top-content\" dojoAttachPoint=\"topContentNode\"><div turboalign=\"none\" class=\"turbogrid-header\" dojoAttachPoint=\"headerNode\"></div></div></div><div turboalign=\"none\" class=\"turbogrid-scrollbox\" dojoAttachPoint=\"scrollboxNode\"><div class=\"turbogrid-content\" dojoAttachPoint=\"contentNode\"></div></div></div>",getDatum:function(){
},init:function(){
},fillInTemplate:function(_e04,_e05){
this.rowNodes=[];
this.leftRowNodes=[];
this.bindArgEvents(_e04);
this.initColumns();
this.initBuilder();
this.initLeftBuilder();
this.initScroller();
this.initHeader();
turbo.funnelEvents(this.leftNode,this,"dispatchLeftEvent");
turbo.funnelEvents(this.contentNode,this,"dispatchContentEvent");
dojo.html.disableSelection(this.leftNode);
dojo.html.disableSelection(this.headerNode);
if(!dojo.render.html.safari){
this.scrollboxNode.onmousedown=function(){
return false;
};
dojo.event.browser.addClobberNodeAttrs(this.scrollboxNode,["onmousedown"]);
}
if(dojo.render.html.ie){
turbo.funnelEvents(this.contentNode,this,"dispatchContentEvent",["selectstart"]);
}
dojo.event.topic.subscribe("turboresize",this,"refresh");
},postCreate:function(){
this.init();
if(!this.built&&this.rowCount&&this.colCount){
var node=this.domNode;
turbo.deferUntil(function(){
return node.offsetHeight>0;
},turbo.bind(this,"build"));
}
},styleChanged:function(){
this.setStyledClass(this.domNode,"");
},initColumns:function(){
this.columns=new turbo.grid.columns();
var _e07=this.extraArgs["columns"];
this.columns.set((_e07&&dojo.evalObjPath(_e07))||[]);
},initHeader:function(){
this.header=new turbo.grid.header(this,this.columns,this.headerNode);
this.header.sortClick=turbo.bind(this,"sortClick");
},initBuilder:function(){
var b=new turbo.grid.columnsBuilder(this);
b.cellClass=this.classTag+"-cell";
var self=this;
b.buildContent=function(){
return self.buildRowContent.apply(self,arguments);
};
this.builder=b;
},initLeftBuilder:function(){
var b=new turbo.grid.rowBuilder(this);
this.leftBuilder=b;
},initScroller:function(){
var s=new turbo.scroller.columns([this.leftContentNode,this.contentNode]);
s.renderRow=turbo.bind(this,"renderRow");
s.removeRow=turbo.bind(this,"rowRemoved");
this.scroller=s;
},setColumns:function(_e0c){
if(_e0c){
this.columns.clear();
this.columns.set(_e0c);
}
},setSize:function(_e0d,_e0e){
this.rowCount=_e0d;
this.colCount=_e0e;
},build:function(){
this.built=true;
this.columns.client=this;
this.leftBuilder.defaultRowHeight=this.defaultRowHeight-1;
this.builder.defaultRowHeight=this.defaultRowHeight;
this.builder.columns=this.columns;
this.builder.colCount=this.colCount;
this.builder.getDatum=this.getDatum;
this.header.columns=this.columns;
this.header.colCount=this.colCount;
this.header.build();
this.resize();
this.scroller.defaultRowHeight=this.defaultRowHeight;
this.scroller.init(this.rowCount,this.keepRows,this.rowsPerPage);
this.scrollboxNode.scrollTop=0;
this.scrollboxNode.onscroll=turbo.bind(this,"onscroll");
dojo.event.browser.addClobberNodeAttrs(this.scrollboxNode,["onscroll"]);
this.scroll(0,0);
},delayScroll:false,onscroll:function(){
if(!this.fastScroll){
this.scroll(this.scrollboxNode.scrollLeft,this.scrollboxNode.scrollTop);
return;
}
var _e0f=Math.abs(this.lastScrollTop-this.scrollboxNode.scrollTop);
this.lastScrollTop=this.scrollboxNode.scrollTop;
if(_e0f>this.scrollRedrawThreshold||this.delayScroll){
this.delayScroll=true;
this.customScroll(this.scrollboxNode.scrollLeft,this.scrollboxNode.scrollTop);
turbo.job("turbogrid-scroll",200,turbo.bind(this,"doscroll"));
}else{
this.scroll(this.scrollboxNode.scrollLeft,this.scrollboxNode.scrollTop);
}
},doscroll:function(){
this.delayScroll=false;
this.scroll(this.scrollboxNode.scrollLeft,this.scrollboxNode.scrollTop);
},customScroll:function(_e10,_e11){
this.leftNode.scrollTop=_e11;
this.topNode.scrollLeft=_e10;
},scroll:function(_e12,_e13){
this.customScroll(_e12,_e13);
this.scroller.scroll(_e13);
},refresh:function(){
this.resize();
this.doscroll();
},calcRowWidth:function(){
return this.builder.calcRowWidth();
},resize:function(){
if(!this.built||!turbo.isShowing(this.domNode)){
return;
}
var w=this.calcRowWidth();
turbo.setStyleWidthPx(this.contentNode,w);
turbo.setStyleWidthPx(this.topContentNode,w+128);
var w=this.domNode.clientWidth;
var h=this.domNode.clientHeight;
var _e16=this.defaultLeftWidth;
var _e17=this.header.normalizeRowHeight();
w=w-_e16;
turbo.setStyleBoundsPx(this.topNode,_e16,0,w,_e17);
h=h-_e17;
turbo.setStyleBoundsPx(this.scrollboxNode,_e16,_e17,w,h-1);
h=this.scrollboxNode.offsetHeight;
if(turbo.hasHorizontalScrollbar(this.scrollboxNode)){
h-=turbo.getScrollbarWidth();
}
turbo.setStyleBoundsPx(this.leftNode,0,_e17,_e16,h-1);
this.scroller.windowHeight=h;
},getRowHeight:function(_e18){
},isOver:function(_e19,_e1a){
return (_e19==this.over.row&&(arguments.length<2||_e1a==this.over.col));
},tagClass:function(_e1b){
return this.classTag+"-"+_e1b;
},modifyNodeClass:function(_e1c,_e1d,_e1e){
dojo.html[(_e1e?"addClass":"removeClass")](_e1c,this.tagClass(_e1d));
},getRowState:function(_e1f){
return {selected:Boolean(this.selection.selected[_e1f]),editing:this.isEditing(_e1f),over:this.isOver(_e1f),odd:Boolean(_e1f&1)};
},prepareRowStyles:function(){
this.rowStyles=[];
this.rowClasses=[];
},applyRowStyles:function(_e20){
turbo.setStyleText(_e20,this.rowStyles.join(";")+";"+(_e20._style||""));
_e20.className=this.rowClasses.join(" ");
},coreStylizeRow:function(_e21,_e22){
this.rowState=this.getRowState(_e21);
this.prepareRowStyles();
this.stylizeRow(_e21);
this.defaultStylizeRow(_e21);
this.applyRowStyles(_e22);
this.modifyNodeClass(_e22,"row",true);
},coreStylizeLeftRow:function(_e23,_e24){
this.modifyNodeClass(_e24,"left-row",true);
},stylizeRow:function(_e25){
this.defaultStylizeRow(_e25);
},defaultStylizeRow:function(_e26){
if(this.rowState.over){
this.rowClasses.push(this.tagClass("row-over"));
}else{
if(this.rowState.selected){
this.rowClasses.push(this.tagClass("row-selected"));
}else{
if(this.rowState.editing){
this.rowClasses.push(this.tagClass("row-editing"));
}else{
if(this.rowState.odd){
this.rowClasses.push(this.tagClass("row-odd"));
}
}
}
}
},buildRow:function(_e27,_e28){
return this.defaultBuildRow(_e27,_e28);
},buildContent:function(_e29,_e2a){
this.defaultBuildContent(_e29,_e2a);
},defaultBuildRow:function(_e2b,_e2c){
var node=this.builder.buildRow(_e2b,_e2c);
node._style=turbo.getStyleText(node);
this.coreStylizeRow(_e2b,node);
return node;
},defaultBuildContent:function(_e2e,_e2f){
this.builder.defaultBuildContent(_e2e,_e2f);
},buildRowContent:function(_e30,_e31){
this.buildContent(_e30,_e31);
},renderRightRow:function(_e32,_e33){
this.rowState=this.getRowState(_e32);
var node=this.buildRow(_e32,_e33);
node.rowIndex=_e32;
this.rowNodes[_e32]=node;
if(this.rowHeight){
turbo.setStyleHeightPx(node,this.rowHeight);
}
if(this.editor&&_e32==this.editRow){
this.restoreEditState();
}
},renderLeftRow:function(_e35,_e36){
var node=this.leftBuilder.buildRow(_e35,_e36);
node.rowIndex=_e35;
this.leftRowNodes[_e35]=node;
this.coreStylizeLeftRow(_e35,node);
if(this.rowHeight){
turbo.setStyleHeightPx(node,this.rowHeight-1);
}
},collapsedRows:[],nextIndex:-1,dataIndex:-1,translateIndex:function(_e38){
var r=0,i=0;
do{
while(this.collapsedRows[r]){
r++;
}
}while((i<_e38)&&++r&&++i);
return r;
},getNextIndex:function(_e3b){
if(_e3b!=this.nextIndex){
this.nextIndex=_e3b;
this.dataIndex=this.translateIndex(_e3b);
}
this.nextIndex++;
while(this.collapsedRows[this.dataIndex]){
this.dataIndex++;
}
return this.dataIndex++;
},renderRow:function(_e3c,_e3d){
var i=this.getNextIndex(_e3c);
this.rowHeight=this.getRowHeight(i);
this.renderRightRow(i,_e3d[1]);
this.renderLeftRow(i,_e3d[0]);
},rowRemoved:function(_e3f){
this.defaultRowRemoved(this.getNextIndex(_e3f));
},defaultRowRemoved:function(_e40){
if(this.editor&&_e40==this.editRow){
this.saveEditState();
}
delete this.rowNodes[_e40];
delete this.leftRowNodes[_e40];
},scrollCache:{},saveScrollPos:function(){
this.scrollCache.topRow=this.scroller.findTopRow(this.scrollboxNode.scrollTop);
this.scrollCache.offset=this.scroller.offset;
},restoreScrollPos:function(){
var t=this.scroller.findScrollTop(this.scrollCache.topRow)+this.scrollCache.offset;
if(this.scrollboxNode.scrollTop!=t){
this.scrollboxNode.scrollTop=t;
}else{
this.onscroll();
}
},beginCollapseJob:function(){
var job=this.widgetId+"-collapse";
if(!turbo.jobs[job]){
this.saveEditState();
this.saveScrollPos();
}
turbo.job(job,1,turbo.bind(this,"endCollapseJob"));
},endCollapseJob:function(){
this.scroller.setRowCount(this.rowCount);
this.scroller.invalidate();
this.restoreScrollPos();
this.restoreEditState();
},collapseRow:function(_e43,_e44){
this.beginCollapseJob();
var c=this.collapsedRows[_e43];
this.collapsedRows[_e43]=_e44;
if(!c&&_e44){
this.rowCount--;
}else{
if(c&&!_e44){
this.rowCount++;
}
}
},update:function(_e46){
this.over={};
this.saveEditState();
if(_e46){
this.saveScrollPos();
}
this.header.build();
this.resize();
this.scroller.invalidate();
if(_e46){
this.restoreScrollPos();
}else{
this.onscroll();
}
this.restoreEditState();
},updateRow:function(_e47){
var _e48=this.rowNodes[_e47];
if(_e48){
this.updateRowNode(_e47,_e48);
}
},updateRowNode:function(_e49,_e4a){
this.builder.buildContent(_e49,_e4a);
this.updateRowNodeClass(_e49,_e4a);
},updateRowNodeClass:function(_e4b,_e4c){
this.coreStylizeRow(_e4b,_e4c);
},updateLeftRowNodeClass:function(_e4d,_e4e){
this.coreStylizeLeftRow(_e4d,_e4e);
},updateRowStyles:function(_e4f){
var _e50=this.rowNodes[_e4f];
if(_e50){
this.updateRowNodeClass(_e4f,_e50);
}
_e50=this.leftRowNodes[_e4f];
if(_e50){
this.updateLeftRowNodeClass(_e4f,_e50);
}
},updateCell:function(_e51,_e52){
var _e53=this.rowNodes[_e51];
if(_e53){
this.builder.updateCellNode(_e53,_e51,_e52);
}
},updateRowCell:function(_e54,_e55){
this.updateCell(_e54,_e55);
this.updateRowStyles(_e54);
},doSetColWidth:function(_e56,_e57){
var col=this.columns.get(_e56);
col.width=_e57;
col.preformat="";
},setColWidth:function(_e59,_e5a){
this.doSetColWidth(_e59,_e5a);
this.update();
},doMoveColumn:function(_e5b,_e5c){
this.columns.move(_e5b,_e5c);
this.editCell=turbo.moveIndex(this.editCell,_e5b,_e5c);
},moveColumn:function(_e5d,_e5e){
this.doMoveColumn(_e5d,_e5e);
this.update();
},_selected:function(_e5f,_e60){
this.updateRowStyles(_e5f);
},getRowNode:function(_e61){
return this.rowNodes[_e61];
},getCellNode:function(_e62,_e63){
var node=this.rowNodes[_e62];
return (node?this.builder.getCellNode(node,_e63):null);
},isEditing:function(_e65,_e66){
return (this.editor&&(arguments.length<1||this.editRow==_e65)&&(arguments.length<2||this.editCell==_e66));
},editCellNode:function(_e67,_e68,_e69,_e6a){
var _e6b=this.getCellNode(_e67,_e68);
if(!_e6b){
this.cancelEdit();
return;
}
if(!_e69){
this.applyEdit();
}
this.editRow=_e67;
this.editCell=_e68;
this.editor=(_e69||this.getEditor(_e67,_e68));
var _e6c=(_e6a||this.builder.getCellDatum(_e67,_e68));
if(this.editor&&this.editor.edit(_e6b,_e6c)===false){
this.editor=null;
}
this.updateRowStyles(_e67);
},defaultCellClick:function(e){
if(this.isEditing(e.rowIndex,e.cellIndex)){
if("clicked" in this.editor){
this.editor.clicked(e);
}
return;
}
this.selectClick(e);
if(e.ctrlKey||e.shiftKey){
return;
}
this.editCellNode(e.rowIndex,e.cellIndex);
if(this.editor&&this.editor.selectAndFocus){
this.editor.selectAndFocus();
}
},saveEditState:function(){
if(this.editor){
this.editValue=this.editor.getValue();
}
},restoreEditState:function(){
if(!this.editor){
return;
}
this.editCellNode(this.editRow,this.editCell,this.editor,this.editValue);
},getEditor:function(){
return this.columns.get(this.editCell).getEditor(this);
},commitEdit:function(_e6e,_e6f,_e70){
},applyEdit:function(){
if(this.editor){
var e=this.editor;
this.editor=null;
this.commitEdit(this.editRow,this.columns.get(this.editCell).key,e.getValue());
}
},cancelEdit:function(){
if(this.editor){
this.editor=null;
this.updateCell(this.editRow,this.editCell);
this.updateRowStyles(this.editRow);
}
},prevEdit:function(){
if(!this.isEditing()){
return;
}
if(this.editCell>0){
this.editCellNode(this.editRow,this.editCell-1);
}else{
if(this.editRow>0){
this.editCellNode(this.editRow-1,this.colCount-1);
}
}
if(this.editor&&this.editor.selectAndFocus){
this.editor.selectAndFocus();
}
},nextEdit:function(){
if(!this.isEditing()){
return;
}
if(this.editCell+1<this.colCount){
this.editCellNode(this.editRow,this.editCell+1);
}else{
if(this.editRow+1<this.rowCount){
this.editCellNode(this.editRow+1,0);
}
}
if(this.editor&&this.editor.selectAndFocus){
this.editor.selectAndFocus();
}
},canSort:function(){
return true;
},_canSort:function(){
return Boolean(this.sortData!=turbo.emptyFunction)&&(this.columns.get(this.header.sortColumn).sortable!==false);
},sortClick:function(){
if(!this.canSort()){
return false;
}
if(!this._canSort()){
return false;
}
this.applyEdit();
this.selection.clear();
this.header.build();
turbo.defer(this,"sort",100);
return true;
},sort:function(){
this.sortData();
this.update();
},sortData:turbo.emptyFunction,dispatchEvent:function(e){
var m="do"+e.dispatch;
return (m in this?this[m](e):true);
},selectClick:function(e){
this.applyEdit();
this.selection.clickSelect(e.rowIndex,e.ctrlKey,e.shiftKey);
},processLeftEvent:function(e){
if(!this.scroller.processNodeEvent(e,this.leftContentNode)){
return false;
}
e.rowIndex=e.rowTarget.rowIndex;
e.dispatch=e.type+"Left";
return true;
},dispatchLeftEvent:function(e){
if(this.processLeftEvent(e)){
return this.dispatchEvent(e);
}
},doclickLeft:function(e){
return this.selectClick(e);
},processEvent:function(e){
if(!this.scroller.processNodeEvent(e,this.contentNode)){
return false;
}
e.rowIndex=e.rowTarget.rowIndex;
this.builder.processEvent(e);
e.dispatch=e.type;
return true;
},dispatchContentEvent:function(e){
if(this.processEvent(e)){
return this.dispatchEvent(e);
}
},domouseover:function(e){
this.defaultMouseOver(e);
},domouseout:function(e){
this.defaultMouseOut(e);
},defaultMouseOver:function(e){
if(!this.lastOverCell||(this.lastOverCell!=e.cellTarget)){
if(this.lastOverCell){
this.cellOut(this.over.row,this.over.col,this.over.row==e.rowIndex);
}
if(e.cellTarget){
this.cellOver(e.cellTarget,e.rowIndex,e.colIndex);
e.rowTarget.offsetHeight;
}
}
},defaultMouseOut:function(e){
var _e7e=e.relatedTarget;
try{
_e7e.id;
}
catch(e){
_e7e=null;
}
if(e.cellTarget&&this.lastOverCell==e.cellTarget&&(!_e7e||!dojo.dom.isDescendantOf(_e7e,e.cellTarget))){
var _e7f=false;
if(_e7e){
var re={target:_e7e};
_e7f=(this.scroller.processNodeEvent(re,this.contentNode)&&re.rowIndex==this.over.row);
}
this.cellOut(this.over.row,this.over.col,_e7f);
}
},cellOver:function(_e81,_e82,_e83){
this.over={row:_e82,col:_e83};
this.lastOverCell=_e81;
this.updateRowCell(_e82,_e83);
},cellOut:function(_e84,_e85,_e86){
this.over={};
this.lastOverCell=null;
if(_e86){
this.updateCell(_e84,_e85);
}else{
this.updateRowCell(_e84,_e85);
}
},domousedown:function(e){
this.doselectstart(e);
},doselectstart:function(e){
if(!this.isEditing(e.rowIndex,e.cellIndex)){
turbo.killEvent(e);
}
},doclick:function(e){
if(e.cellTarget){
this.cellClick(e);
}
},cellClick:function(e){
this.defaultCellClick(e);
},defaultKeydown:function(e){
if(e.altKey||e.ctrlKey||e.metaKey||!this.isEditing()){
return;
}
switch(e.keyCode){
case e.KEY_ESCAPE:
this.cancelEdit();
break;
case e.KEY_ENTER:
if(!e.shiftKey){
this.applyEdit();
}
break;
case e.KEY_TAB:
turbo.killEvent(e);
if(e.shiftKey){
this.prevEdit();
}else{
this.nextEdit();
}
break;
}
},dokeydown:function(e){
this.defaultKeydown(e);
}},"html",function(){
this.selection=new turbo.selection();
this.selection.onSetSelected=turbo.bind(this,"_selected");
});
dojo.provide("turbo.widgets.TurboDataGrid");
dojo.widget.defineWidget("dojo.widget.html.TurboDataGrid",dojo.widget.html.TurboGrid,{widgetType:"TurboDataGrid",model:"turbo.data.table",lastSortIndex:0,secondSortIndex:0,fillInTemplate:function(_e8d,_e8e){
dojo.widget.html.TurboDataGrid.superclass.fillInTemplate.apply(this,arguments);
},postCreate:function(){
if(this.model&&typeof this.model=="string"){
var m=dojo.evalObjPath(this.model);
this._setModel(typeof m=="function"?new m():m);
}
dojo.widget.html.TurboDataGrid.superclass.postCreate.apply(this,arguments);
},_setModel:function(_e90){
this.model=_e90;
if(this.model){
dojo.event.connect(this.model,"change",this,"modelChange");
this.measureModel();
}
},setModel:function(_e91){
if(this.model){
dojo.event.disconnect(this.model,"change",this,"modelChange");
}
this._setModel(_e91);
if(this.model){
this.modelChanged();
}
},measureModel:function(){
this.colCount=this.columns.count()||this.model.getColCount();
this.rowCount=this.model.getRowCount();
},modelChanged:function(){
this.measureModel();
this.build();
},modelUpdates:["modelChanged","updateRow","updateCell"],defaultModelChange:function(_e92,_e93){
this[this.modelUpdates[arguments.length]].apply(this,arguments);
},modelChange:function(_e94,_e95){
this.defaultModelChange.apply(this,arguments);
},getDatum:function(_e96,_e97){
return this.client.model.get(_e96,_e97);
},_canSort:function(){
return this.model.canSort()&&dojo.widget.html.TurboGrid.prototype._canSort.apply(this);
},sortData:function(){
var i=this.header.getSortIndex();
if(Math.abs(i)!=Math.abs(this.lastSortIndex)){
this.secondSortIndex=this.lastSortIndex;
}
this.model.sort(i,this.secondSortIndex);
this.lastSortIndex=i;
},commitEdit:function(_e99,_e9a,_e9b){
this.model.set(_e9b,_e99,_e9a);
}},"html");
dojo.provide("dojo.dnd.DragAndDrop");
dojo.declare("dojo.dnd.DragSource",null,{type:"",onDragEnd:function(evt){
},onDragStart:function(evt){
},onSelected:function(evt){
},unregister:function(){
dojo.dnd.dragManager.unregisterDragSource(this);
},reregister:function(){
dojo.dnd.dragManager.registerDragSource(this);
}});
dojo.declare("dojo.dnd.DragObject",null,{type:"",register:function(){
var dm=dojo.dnd.dragManager;
if(dm["registerDragObject"]){
dm.registerDragObject(this);
}
},onDragStart:function(evt){
},onDragMove:function(evt){
},onDragOver:function(evt){
},onDragOut:function(evt){
},onDragEnd:function(evt){
},onDragLeave:dojo.lang.forward("onDragOut"),onDragEnter:dojo.lang.forward("onDragOver"),ondragout:dojo.lang.forward("onDragOut"),ondragover:dojo.lang.forward("onDragOver")});
dojo.declare("dojo.dnd.DropTarget",null,{acceptsType:function(type){
if(!dojo.lang.inArray(this.acceptedTypes,"*")){
if(!dojo.lang.inArray(this.acceptedTypes,type)){
return false;
}
}
return true;
},accepts:function(_ea6){
if(!dojo.lang.inArray(this.acceptedTypes,"*")){
for(var i=0;i<_ea6.length;i++){
if(!dojo.lang.inArray(this.acceptedTypes,_ea6[i].type)){
return false;
}
}
}
return true;
},unregister:function(){
dojo.dnd.dragManager.unregisterDropTarget(this);
},onDragOver:function(evt){
},onDragOut:function(evt){
},onDragMove:function(evt){
},onDropStart:function(evt){
},onDrop:function(evt){
},onDropEnd:function(){
}},function(){
this.acceptedTypes=[];
});
dojo.dnd.DragEvent=function(){
this.dragSource=null;
this.dragObject=null;
this.target=null;
this.eventStatus="success";
};
dojo.declare("dojo.dnd.DragManager",null,{selectedSources:[],dragObjects:[],dragSources:[],registerDragSource:function(_ead){
},dropTargets:[],registerDropTarget:function(_eae){
},lastDragTarget:null,currentDragTarget:null,onKeyDown:function(){
},onMouseOut:function(){
},onMouseMove:function(){
},onMouseUp:function(){
}});
dojo.provide("dojo.dnd.HtmlDragManager");
dojo.declare("dojo.dnd.HtmlDragManager",dojo.dnd.DragManager,{disabled:false,nestedTargets:false,mouseDownTimer:null,dsCounter:0,dsPrefix:"dojoDragSource",dropTargetDimensions:[],currentDropTarget:null,previousDropTarget:null,_dragTriggered:false,selectedSources:[],dragObjects:[],dragSources:[],dropTargets:[],currentX:null,currentY:null,lastX:null,lastY:null,mouseDownX:null,mouseDownY:null,threshold:7,dropAcceptable:false,cancelEvent:function(e){
e.stopPropagation();
e.preventDefault();
},registerDragSource:function(ds){
if(ds["domNode"]){
var dp=this.dsPrefix;
var _eb2=dp+"Idx_"+(this.dsCounter++);
ds.dragSourceId=_eb2;
this.dragSources[_eb2]=ds;
ds.domNode.setAttribute(dp,_eb2);
if(dojo.render.html.ie){
dojo.event.browser.addListener(ds.domNode,"ondragstart",this.cancelEvent);
}
}
},unregisterDragSource:function(ds){
if(ds["domNode"]){
var dp=this.dsPrefix;
var _eb5=ds.dragSourceId;
delete ds.dragSourceId;
delete this.dragSources[_eb5];
ds.domNode.setAttribute(dp,null);
if(dojo.render.html.ie){
dojo.event.browser.removeListener(ds.domNode,"ondragstart",this.cancelEvent);
}
}
},registerDropTarget:function(dt){
this.dropTargets.push(dt);
},unregisterDropTarget:function(dt){
var _eb8=dojo.lang.find(this.dropTargets,dt,true);
if(_eb8>=0){
this.dropTargets.splice(_eb8,1);
}
},getDragSource:function(e){
var tn=e.target;
if(tn===dojo.body()){
return;
}
var ta=dojo.html.getAttribute(tn,this.dsPrefix);
while((!ta)&&(tn)){
tn=tn.parentNode;
if((!tn)||(tn===dojo.body())){
return;
}
ta=dojo.html.getAttribute(tn,this.dsPrefix);
}
return this.dragSources[ta];
},onKeyDown:function(e){
},onMouseDown:function(e){
if(this.disabled){
return;
}
if(dojo.render.html.ie){
if(e.button!=1){
return;
}
}else{
if(e.which!=1){
return;
}
}
var _ebe=e.target.nodeType==dojo.html.TEXT_NODE?e.target.parentNode:e.target;
if(dojo.html.isTag(_ebe,"button","textarea","input","select","option")){
return;
}
var ds=this.getDragSource(e);
if(!ds){
return;
}
if(!dojo.lang.inArray(this.selectedSources,ds)){
this.selectedSources.push(ds);
ds.onSelected();
}
this.mouseDownX=e.pageX;
this.mouseDownY=e.pageY;
e.preventDefault();
dojo.event.connect(document,"onmousemove",this,"onMouseMove");
},onMouseUp:function(e,_ec1){
if(this.selectedSources.length==0){
return;
}
this.mouseDownX=null;
this.mouseDownY=null;
this._dragTriggered=false;
e.dragSource=this.dragSource;
if((!e.shiftKey)&&(!e.ctrlKey)){
if(this.currentDropTarget){
this.currentDropTarget.onDropStart();
}
dojo.lang.forEach(this.dragObjects,function(_ec2){
var ret=null;
if(!_ec2){
return;
}
if(this.currentDropTarget){
e.dragObject=_ec2;
var ce=this.currentDropTarget.domNode.childNodes;
if(ce.length>0){
e.dropTarget=ce[0];
while(e.dropTarget==_ec2.domNode){
e.dropTarget=e.dropTarget.nextSibling;
}
}else{
e.dropTarget=this.currentDropTarget.domNode;
}
if(this.dropAcceptable){
ret=this.currentDropTarget.onDrop(e);
}else{
this.currentDropTarget.onDragOut(e);
}
}
e.dragStatus=this.dropAcceptable&&ret?"dropSuccess":"dropFailure";
dojo.lang.delayThese([function(){
try{
_ec2.dragSource.onDragEnd(e);
}
catch(err){
var _ec5={};
for(var i in e){
if(i=="type"){
_ec5.type="mouseup";
continue;
}
_ec5[i]=e[i];
}
_ec2.dragSource.onDragEnd(_ec5);
}
},function(){
_ec2.onDragEnd(e);
}]);
},this);
this.selectedSources=[];
this.dragObjects=[];
this.dragSource=null;
if(this.currentDropTarget){
this.currentDropTarget.onDropEnd();
}
}else{
}
dojo.event.disconnect(document,"onmousemove",this,"onMouseMove");
this.currentDropTarget=null;
},onScroll:function(){
for(var i=0;i<this.dragObjects.length;i++){
if(this.dragObjects[i].updateDragOffset){
this.dragObjects[i].updateDragOffset();
}
}
if(this.dragObjects.length){
this.cacheTargetLocations();
}
},_dragStartDistance:function(x,y){
if((!this.mouseDownX)||(!this.mouseDownX)){
return;
}
var dx=Math.abs(x-this.mouseDownX);
var dx2=dx*dx;
var dy=Math.abs(y-this.mouseDownY);
var dy2=dy*dy;
return parseInt(Math.sqrt(dx2+dy2),10);
},cacheTargetLocations:function(){
dojo.profile.start("cacheTargetLocations");
this.dropTargetDimensions=[];
dojo.lang.forEach(this.dropTargets,function(_ece){
var tn=_ece.domNode;
if(!tn||!_ece.accepts([this.dragSource])){
return;
}
var abs=dojo.html.getAbsolutePosition(tn,true);
var bb=dojo.html.getBorderBox(tn);
this.dropTargetDimensions.push([[abs.x,abs.y],[abs.x+bb.width,abs.y+bb.height],_ece]);
},this);
dojo.profile.end("cacheTargetLocations");
},onMouseMove:function(e){
if((dojo.render.html.ie)&&(e.button!=1)){
this.currentDropTarget=null;
this.onMouseUp(e,true);
return;
}
if((this.selectedSources.length)&&(!this.dragObjects.length)){
var dx;
var dy;
if(!this._dragTriggered){
this._dragTriggered=(this._dragStartDistance(e.pageX,e.pageY)>this.threshold);
if(!this._dragTriggered){
return;
}
dx=e.pageX-this.mouseDownX;
dy=e.pageY-this.mouseDownY;
}
this.dragSource=this.selectedSources[0];
dojo.lang.forEach(this.selectedSources,function(_ed5){
if(!_ed5){
return;
}
var tdo=_ed5.onDragStart(e);
if(tdo){
tdo.onDragStart(e);
tdo.dragOffset.y+=dy;
tdo.dragOffset.x+=dx;
tdo.dragSource=_ed5;
this.dragObjects.push(tdo);
}
},this);
this.previousDropTarget=null;
this.cacheTargetLocations();
}
dojo.lang.forEach(this.dragObjects,function(_ed7){
if(_ed7){
_ed7.onDragMove(e);
}
});
if(this.currentDropTarget){
var c=dojo.html.toCoordinateObject(this.currentDropTarget.domNode,true);
var dtp=[[c.x,c.y],[c.x+c.width,c.y+c.height]];
}
if((!this.nestedTargets)&&(dtp)&&(this.isInsideBox(e,dtp))){
if(this.dropAcceptable){
this.currentDropTarget.onDragMove(e,this.dragObjects);
}
}else{
var _eda=this.findBestTarget(e);
if(_eda.target===null){
if(this.currentDropTarget){
this.currentDropTarget.onDragOut(e);
this.previousDropTarget=this.currentDropTarget;
this.currentDropTarget=null;
}
this.dropAcceptable=false;
return;
}
if(this.currentDropTarget!==_eda.target){
if(this.currentDropTarget){
this.previousDropTarget=this.currentDropTarget;
this.currentDropTarget.onDragOut(e);
}
this.currentDropTarget=_eda.target;
e.dragObjects=this.dragObjects;
this.dropAcceptable=this.currentDropTarget.onDragOver(e);
}else{
if(this.dropAcceptable){
this.currentDropTarget.onDragMove(e,this.dragObjects);
}
}
}
},findBestTarget:function(e){
var _edc=this;
var _edd=new Object();
_edd.target=null;
_edd.points=null;
dojo.lang.every(this.dropTargetDimensions,function(_ede){
if(!_edc.isInsideBox(e,_ede)){
return true;
}
_edd.target=_ede[2];
_edd.points=_ede;
return Boolean(_edc.nestedTargets);
});
return _edd;
},isInsideBox:function(e,_ee0){
if((e.pageX>_ee0[0][0])&&(e.pageX<_ee0[1][0])&&(e.pageY>_ee0[0][1])&&(e.pageY<_ee0[1][1])){
return true;
}
return false;
},onMouseOver:function(e){
},onMouseOut:function(e){
}});
dojo.dnd.dragManager=new dojo.dnd.HtmlDragManager();
(function(){
var d=document;
var dm=dojo.dnd.dragManager;
dojo.event.connect(d,"onkeydown",dm,"onKeyDown");
dojo.event.connect(d,"onmouseover",dm,"onMouseOver");
dojo.event.connect(d,"onmouseout",dm,"onMouseOut");
dojo.event.connect(d,"onmousedown",dm,"onMouseDown");
dojo.event.connect(d,"onmouseup",dm,"onMouseUp");
dojo.event.connect(window,"onscroll",dm,"onScroll");
})();
dojo.provide("dojo.collections.Collections");
dojo.collections.DictionaryEntry=function(k,v){
this.key=k;
this.value=v;
this.valueOf=function(){
return this.value;
};
this.toString=function(){
return String(this.value);
};
};
dojo.collections.Iterator=function(arr){
var a=arr;
var _ee9=0;
this.element=a[_ee9]||null;
this.atEnd=function(){
return (_ee9>=a.length);
};
this.get=function(){
if(this.atEnd()){
return null;
}
this.element=a[_ee9++];
return this.element;
};
this.map=function(fn,_eeb){
var s=_eeb||dj_global;
if(Array.map){
return Array.map(a,fn,s);
}else{
var arr=[];
for(var i=0;i<a.length;i++){
arr.push(fn.call(s,a[i]));
}
return arr;
}
};
this.reset=function(){
_ee9=0;
this.element=a[_ee9];
};
};
dojo.collections.DictionaryIterator=function(obj){
var a=[];
var _ef1={};
for(var p in obj){
if(!_ef1[p]){
a.push(obj[p]);
}
}
var _ef3=0;
this.element=a[_ef3]||null;
this.atEnd=function(){
return (_ef3>=a.length);
};
this.get=function(){
if(this.atEnd()){
return null;
}
this.element=a[_ef3++];
return this.element;
};
this.map=function(fn,_ef5){
var s=_ef5||dj_global;
if(Array.map){
return Array.map(a,fn,s);
}else{
var arr=[];
for(var i=0;i<a.length;i++){
arr.push(fn.call(s,a[i]));
}
return arr;
}
};
this.reset=function(){
_ef3=0;
this.element=a[_ef3];
};
};
dojo.provide("dojo.collections.ArrayList");
dojo.collections.ArrayList=function(arr){
var _efa=[];
if(arr){
_efa=_efa.concat(arr);
}
this.count=_efa.length;
this.add=function(obj){
_efa.push(obj);
this.count=_efa.length;
};
this.addRange=function(a){
if(a.getIterator){
var e=a.getIterator();
while(!e.atEnd()){
this.add(e.get());
}
this.count=_efa.length;
}else{
for(var i=0;i<a.length;i++){
_efa.push(a[i]);
}
this.count=_efa.length;
}
};
this.clear=function(){
_efa.splice(0,_efa.length);
this.count=0;
};
this.clone=function(){
return new dojo.collections.ArrayList(_efa);
};
this.contains=function(obj){
for(var i=0;i<_efa.length;i++){
if(_efa[i]==obj){
return true;
}
}
return false;
};
this.forEach=function(fn,_f02){
var s=_f02||dj_global;
if(Array.forEach){
Array.forEach(_efa,fn,s);
}else{
for(var i=0;i<_efa.length;i++){
fn.call(s,_efa[i],i,_efa);
}
}
};
this.getIterator=function(){
return new dojo.collections.Iterator(_efa);
};
this.indexOf=function(obj){
for(var i=0;i<_efa.length;i++){
if(_efa[i]==obj){
return i;
}
}
return -1;
};
this.insert=function(i,obj){
_efa.splice(i,0,obj);
this.count=_efa.length;
};
this.item=function(i){
return _efa[i];
};
this.remove=function(obj){
var i=this.indexOf(obj);
if(i>=0){
_efa.splice(i,1);
}
this.count=_efa.length;
};
this.removeAt=function(i){
_efa.splice(i,1);
this.count=_efa.length;
};
this.reverse=function(){
_efa.reverse();
};
this.sort=function(fn){
if(fn){
_efa.sort(fn);
}else{
_efa.sort();
}
};
this.setByIndex=function(i,obj){
_efa[i]=obj;
this.count=_efa.length;
};
this.toArray=function(){
return [].concat(_efa);
};
this.toString=function(_f10){
return _efa.join((_f10||","));
};
};
dojo.provide("dojo.collections.Set");
dojo.collections.Set=new function(){
this.union=function(setA,setB){
if(setA.constructor==Array){
var setA=new dojo.collections.ArrayList(setA);
}
if(setB.constructor==Array){
var setB=new dojo.collections.ArrayList(setB);
}
if(!setA.toArray||!setB.toArray){
dojo.raise("Set operations can only be performed on array-based collections.");
}
var _f13=new dojo.collections.ArrayList(setA.toArray());
var e=setB.getIterator();
while(!e.atEnd()){
var item=e.get();
if(!_f13.contains(item)){
_f13.add(item);
}
}
return _f13;
};
this.intersection=function(setA,setB){
if(setA.constructor==Array){
var setA=new dojo.collections.ArrayList(setA);
}
if(setB.constructor==Array){
var setB=new dojo.collections.ArrayList(setB);
}
if(!setA.toArray||!setB.toArray){
dojo.raise("Set operations can only be performed on array-based collections.");
}
var _f18=new dojo.collections.ArrayList();
var e=setB.getIterator();
while(!e.atEnd()){
var item=e.get();
if(setA.contains(item)){
_f18.add(item);
}
}
return _f18;
};
this.difference=function(setA,setB){
if(setA.constructor==Array){
var setA=new dojo.collections.ArrayList(setA);
}
if(setB.constructor==Array){
var setB=new dojo.collections.ArrayList(setB);
}
if(!setA.toArray||!setB.toArray){
dojo.raise("Set operations can only be performed on array-based collections.");
}
var _f1d=new dojo.collections.ArrayList();
var e=setA.getIterator();
while(!e.atEnd()){
var item=e.get();
if(!setB.contains(item)){
_f1d.add(item);
}
}
return _f1d;
};
this.isSubSet=function(setA,setB){
if(setA.constructor==Array){
var setA=new dojo.collections.ArrayList(setA);
}
if(setB.constructor==Array){
var setB=new dojo.collections.ArrayList(setB);
}
if(!setA.toArray||!setB.toArray){
dojo.raise("Set operations can only be performed on array-based collections.");
}
var e=setA.getIterator();
while(!e.atEnd()){
if(!setB.contains(e.get())){
return false;
}
}
return true;
};
this.isSuperSet=function(setA,setB){
if(setA.constructor==Array){
var setA=new dojo.collections.ArrayList(setA);
}
if(setB.constructor==Array){
var setB=new dojo.collections.ArrayList(setB);
}
if(!setA.toArray||!setB.toArray){
dojo.raise("Set operations can only be performed on array-based collections.");
}
var e=setB.getIterator();
while(!e.atEnd()){
if(!setA.contains(e.get())){
return false;
}
}
return true;
};
}();
dojo.provide("dojo.profile");
dojo.profile={_profiles:{},_pns:[],start:function(name){
if(!this._profiles[name]){
this._profiles[name]={iters:0,total:0};
this._pns[this._pns.length]=name;
}else{
if(this._profiles[name]["start"]){
this.end(name);
}
}
this._profiles[name].end=null;
this._profiles[name].start=new Date();
},end:function(name){
var ed=new Date();
if((this._profiles[name])&&(this._profiles[name]["start"])){
with(this._profiles[name]){
end=ed;
total+=(end-start);
start=null;
iters++;
}
}else{
return true;
}
},dump:function(_f29){
var tbl=document.createElement("table");
with(tbl.style){
border="1px solid black";
borderCollapse="collapse";
}
var hdr=tbl.createTHead();
var _f2c=hdr.insertRow(0);
var cols=["Identifier","Calls","Total","Avg"];
for(var x=0;x<cols.length;x++){
var ntd=_f2c.insertCell(x);
with(ntd.style){
backgroundColor="#225d94";
color="white";
borderBottom="1px solid black";
borderRight="1px solid black";
fontFamily="tahoma";
fontWeight="bolder";
paddingLeft=paddingRight="5px";
}
ntd.appendChild(document.createTextNode(cols[x]));
}
for(var x=0;x<this._pns.length;x++){
var prf=this._profiles[this._pns[x]];
this.end(this._pns[x]);
if(prf.iters>0){
var _f31=tbl.insertRow(true);
var vals=[this._pns[x],prf.iters,prf.total,parseInt(prf.total/prf.iters)];
for(var y=0;y<vals.length;y++){
var cc=_f31.insertCell(y);
cc.appendChild(document.createTextNode(vals[y]));
with(cc.style){
borderBottom="1px solid gray";
paddingLeft=paddingRight="5px";
if(x%2){
backgroundColor="#e1f1ff";
}
if(y>0){
textAlign="right";
borderRight="1px solid gray";
}else{
borderRight="1px solid black";
}
}
}
}
}
if(_f29){
var ne=document.createElement("div");
ne.id="profileOutputTable";
with(ne.style){
fontFamily="Courier New, monospace";
fontSize="12px";
lineHeight="16px";
borderTop="1px solid black";
padding="10px";
}
if(document.getElementById("profileOutputTable")){
dojo.body().replaceChild(ne,document.getElementById("profileOutputTable"));
}else{
dojo.body().appendChild(ne);
}
ne.appendChild(tbl);
}
return tbl;
}};
dojo.profile.stop=dojo.profile.end;
dojo.provide("dojo.io.IframeIO");
dojo.io.createIFrame=function(_f36,_f37,uri){
if(window[_f36]){
return window[_f36];
}
if(window.frames[_f36]){
return window.frames[_f36];
}
var r=dojo.render.html;
var _f3a=null;
var turi=uri;
if(!turi){
if(djConfig["useXDomain"]&&!djConfig["dojoIframeHistoryUrl"]){
dojo.debug("dojo.io.createIFrame: When using cross-domain Dojo builds,"+" please save iframe_history.html to your domain and set djConfig.dojoIframeHistoryUrl"+" to the path on your domain to iframe_history.html");
}
turi=(djConfig["dojoIframeHistoryUrl"]||dojo.uri.moduleUri("dojo","../iframe_history.html"))+"#noInit=true";
}
var _f3c=((r.ie)&&(dojo.render.os.win))?"<iframe name=\""+_f36+"\" src=\""+turi+"\" onload=\""+_f37+"\">":"iframe";
_f3a=document.createElement(_f3c);
with(_f3a){
name=_f36;
setAttribute("name",_f36);
id=_f36;
}
dojo.body().appendChild(_f3a);
window[_f36]=_f3a;
with(_f3a.style){
if(!r.safari){
position="absolute";
}
left=top="0px";
height=width="1px";
visibility="hidden";
}
if(!r.ie){
dojo.io.setIFrameSrc(_f3a,turi,true);
_f3a.onload=new Function(_f37);
}
return _f3a;
};
dojo.io.IframeTransport=new function(){
var _f3d=this;
this.currentRequest=null;
this.requestQueue=[];
this.iframeName="dojoIoIframe";
this.fireNextRequest=function(){
try{
if((this.currentRequest)||(this.requestQueue.length==0)){
return;
}
var cr=this.currentRequest=this.requestQueue.shift();
cr._contentToClean=[];
var fn=cr["formNode"];
var _f40=cr["content"]||{};
if(cr.sendTransport){
_f40["dojo.transport"]="iframe";
}
if(fn){
if(_f40){
for(var x in _f40){
if(!fn[x]){
var tn;
if(dojo.render.html.ie){
tn=document.createElement("<input type='hidden' name='"+x+"' value='"+_f40[x]+"'>");
fn.appendChild(tn);
}else{
tn=document.createElement("input");
fn.appendChild(tn);
tn.type="hidden";
tn.name=x;
tn.value=_f40[x];
}
cr._contentToClean.push(x);
}else{
fn[x].value=_f40[x];
}
}
}
if(cr["url"]){
cr._originalAction=fn.getAttribute("action");
fn.setAttribute("action",cr.url);
}
if(!fn.getAttribute("method")){
fn.setAttribute("method",(cr["method"])?cr["method"]:"post");
}
cr._originalTarget=fn.getAttribute("target");
fn.setAttribute("target",this.iframeName);
fn.target=this.iframeName;
fn.submit();
}else{
var _f43=dojo.io.argsFromMap(this.currentRequest.content);
var _f44=cr.url+(cr.url.indexOf("?")>-1?"&":"?")+_f43;
dojo.io.setIFrameSrc(this.iframe,_f44,true);
}
}
catch(e){
this.iframeOnload(e);
}
};
this.canHandle=function(_f45){
return ((dojo.lang.inArray(["text/plain","text/html","text/javascript","text/json","application/json"],_f45["mimetype"]))&&(dojo.lang.inArray(["post","get"],_f45["method"].toLowerCase()))&&(!((_f45["sync"])&&(_f45["sync"]==true))));
};
this.bind=function(_f46){
if(!this["iframe"]){
this.setUpIframe();
}
this.requestQueue.push(_f46);
this.fireNextRequest();
return;
};
this.setUpIframe=function(){
this.iframe=dojo.io.createIFrame(this.iframeName,"dojo.io.IframeTransport.iframeOnload();");
};
this.iframeOnload=function(_f47){
if(!_f3d.currentRequest){
_f3d.fireNextRequest();
return;
}
var req=_f3d.currentRequest;
if(req.formNode){
var _f49=req._contentToClean;
for(var i=0;i<_f49.length;i++){
var key=_f49[i];
if(dojo.render.html.safari){
var _f4c=req.formNode;
for(var j=0;j<_f4c.childNodes.length;j++){
var _f4e=_f4c.childNodes[j];
if(_f4e.name==key){
var _f4f=_f4e.parentNode;
_f4f.removeChild(_f4e);
break;
}
}
}else{
var _f50=req.formNode[key];
req.formNode.removeChild(_f50);
req.formNode[key]=null;
}
}
if(req["_originalAction"]){
req.formNode.setAttribute("action",req._originalAction);
}
if(req["_originalTarget"]){
req.formNode.setAttribute("target",req._originalTarget);
req.formNode.target=req._originalTarget;
}
}
var _f51=function(_f52){
var doc=_f52.contentDocument||((_f52.contentWindow)&&(_f52.contentWindow.document))||((_f52.name)&&(document.frames[_f52.name])&&(document.frames[_f52.name].document))||null;
return doc;
};
var _f54;
var _f55=false;
if(_f47){
this._callError(req,"IframeTransport Request Error: "+_f47);
}else{
var ifd=_f51(_f3d.iframe);
try{
var cmt=req.mimetype;
if((cmt=="text/javascript")||(cmt=="text/json")||(cmt=="application/json")){
var js=ifd.getElementsByTagName("textarea")[0].value;
if(cmt=="text/json"||cmt=="application/json"){
js="("+js+")";
}
_f54=dj_eval(js);
}else{
if(cmt=="text/html"){
_f54=ifd;
}else{
_f54=ifd.getElementsByTagName("textarea")[0].value;
}
}
_f55=true;
}
catch(e){
this._callError(req,"IframeTransport Error: "+e);
}
}
try{
if(_f55&&dojo.lang.isFunction(req["load"])){
req.load("load",_f54,req);
}
}
catch(e){
throw e;
}
finally{
_f3d.currentRequest=null;
_f3d.fireNextRequest();
}
};
this._callError=function(req,_f5a){
var _f5b=new dojo.io.Error(_f5a);
if(dojo.lang.isFunction(req["error"])){
req.error("error",_f5b,req);
}
};
dojo.io.transports.addTransport("IframeTransport");
};
dojo.provide("dojo.AdapterRegistry");
dojo.AdapterRegistry=function(_f5c){
this.pairs=[];
this.returnWrappers=_f5c||false;
};
dojo.lang.extend(dojo.AdapterRegistry,{register:function(name,_f5e,wrap,_f60,_f61){
var type=(_f61)?"unshift":"push";
this.pairs[type]([name,_f5e,wrap,_f60]);
},match:function(){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[1].apply(this,arguments)){
if((pair[3])||(this.returnWrappers)){
return pair[2];
}else{
return pair[2].apply(this,arguments);
}
}
}
throw new Error("No match found");
},unregister:function(name){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[0]==name){
this.pairs.splice(i,1);
return true;
}
}
return false;
}});
dojo.provide("dojo.json");
dojo.json={jsonRegistry:new dojo.AdapterRegistry(),register:function(name,_f69,wrap,_f6b){
dojo.json.jsonRegistry.register(name,_f69,wrap,_f6b);
},evalJson:function(json){
try{
return eval("("+json+")");
}
catch(e){
dojo.debug(e);
return json;
}
},serialize:function(o){
var _f6e=typeof (o);
if(_f6e=="undefined"){
return "undefined";
}else{
if((_f6e=="number")||(_f6e=="boolean")){
return o+"";
}else{
if(o===null){
return "null";
}
}
}
if(_f6e=="string"){
return dojo.string.escapeString(o);
}
var me=arguments.callee;
var _f70;
if(typeof (o.__json__)=="function"){
_f70=o.__json__();
if(o!==_f70){
return me(_f70);
}
}
if(typeof (o.json)=="function"){
_f70=o.json();
if(o!==_f70){
return me(_f70);
}
}
if(_f6e!="function"&&typeof (o.length)=="number"){
var res=[];
for(var i=0;i<o.length;i++){
var val=me(o[i]);
if(typeof (val)!="string"){
val="undefined";
}
res.push(val);
}
return "["+res.join(",")+"]";
}
try{
window.o=o;
_f70=dojo.json.jsonRegistry.match(o);
return me(_f70);
}
catch(e){
}
if(_f6e=="function"){
return null;
}
res=[];
for(var k in o){
var _f75;
if(typeof (k)=="number"){
_f75="\""+k+"\"";
}else{
if(typeof (k)=="string"){
_f75=dojo.string.escapeString(k);
}else{
continue;
}
}
val=me(o[k]);
if(typeof (val)!="string"){
continue;
}
res.push(_f75+":"+val);
}
return "{"+res.join(",")+"}";
}};
dojo.provide("ws.string");
ws.string={substituteParams:function(_f76,hash){
var map=(typeof hash=="object")?hash:dojo.lang.toArray(arguments,1);
return _f76.replace(/\%?\{(\w+)\}/g,function(_f79,key){
if(typeof (map[key])!="undefined"&&map[key]!=null){
return map[key];
}
dojo.raise("Substitution not found: "+key);
});
},alphabet:"abcdefghijklmnopqrstuvwxyz"};
dojo.provide("ws.html");
ws.html={setInnerText:function(el,text){
if(dojo.render.html.ie){
el.innerText=text;
}else{
if(dojo.render.html.mozilla){
el.textContent=text;
}else{
if(dojo.render.html.safari){
el.innerText=text;
}else{
el.innerHTML=dojo.string.escapeXml(text);
}
}
}
},asciiSeperator:"------------------------------------------------------------",getText:function(html){
var node=document.createElement("div");
var _f7f=dojo.render.html.ie?"":"<br>";
node.innerHTML=html.replace(/\<hr[^>]+\>/g,_f7f+this.asciiSeperator+"<br>");
return dojo.html.renderedTextContent(node);
},toggleClass:function(el,cls,add){
if(add){
dojo.html.addClass(el,cls);
}else{
dojo.html.removeClass(el,cls);
}
},addHoverClass:function(el,cl){
if(!dojo.render.html.ie){
return;
}
if(!cl){
cl="hover";
}
dojo.event.browser.addListener(el,"onmouseenter",function(){
dojo.html.addClass(el,cl);
});
dojo.event.browser.addListener(el,"onmouseleave",function(){
dojo.html.removeClass(el,cl);
});
},hideSoon:function(node){
if(node.wsHtmlTimeoutId){
window.clearTimeout(node.wsHtmlTimeoutId);
}
node.wsHtmlTimeoutId=dojo.lang.setTimeout(dojo.html.hide,100,node);
},showSoon:function(node){
if(node.wsHtmlTimeoutId){
window.clearTimeout(node.wsHtmlTimeoutId);
}
node.wsHtmlTimeoutId=dojo.lang.setTimeout(dojo.html.show,100,node);
},getAbsolutePositionExt:function(node,_f88,_f89,_f8a){
var _f8b=dojo.html.getElementWindow(node);
var ret=dojo.withGlobal(_f8b,"getAbsolutePosition",dojo.html,arguments);
var win=dojo.html.getElementWindow(node);
if(_f8a!=win&&win.frameElement){
var ext=ws.html.getAbsolutePositionExt(win.frameElement,_f88,_f89,_f8a);
ret.x+=ext.x;
ret.y+=ext.y;
}
ret.top=ret.y;
ret.left=ret.x;
return ret;
},setAbsolutePosition:function(node,pos){
var base=node.offsetParent||dojo.body();
var _f92=dojo.html.getAbsolutePosition(base);
node.style.left=(pos.x-_f92.x)+"px";
node.style.top=(pos.y-_f92.y)+"px";
},recreateIframe:function(_f93,url){
var html=_f93.innerHTML;
var _f96=/( src=["'][^"']*["'])/i;
var _f97=_f96.exec(html);
if(_f97){
html=html.replace(_f97[0]," src=\"about:blank\"");
}else{
html=html.replace(/<iframe/i,"<iframe src=\"about:blank\"");
}
_f93.innerHTML="";
_f93.innerHTML=html;
var _f98=_f93.getElementsByTagName("iframe")[0];
if(url){
dojo.io.setIFrameSrc(_f98,url,true);
}
return _f98;
},rewriteIframe:function(_f99,html){
var doc=dojo.html.iframeContentDocument(_f99);
if(dojo.render.html.ie||dojo.render.html.moz){
ws.html._rewriteIframeContent=html;
return ws.html.recreateIframe(_f99.parentNode,"javascript:document.write(parent.ws.html._rewriteIframeContent);document.close()");
}else{
doc.open();
doc.write(html);
doc.close();
return _f99;
}
},targetLinksToNewWindow:function(node){
dojo.lang.forEach(node.getElementsByTagName("a"),function(link){
link.target="_blank";
});
}};
dojo.provide("ws.browser");
ws.browser={addOnBeforeUnload:function(_f9e,_f9f){
if(!ws.browser._onBeforeUnloadAttached){
ws.browser._onBeforeUnloadAttached=true;
ws.browser._oldOnBeforeUnloadHandler=window.onbeforeunload||function(){
};
ws.browser._onBeforeUnloadHandlers=[];
window.onbeforeunload=ws.browser._onBeforeUnload;
dojo.event.browser.addClobberNodeAttrs(window,"onbeforeunload");
}
var _fa0=(arguments.length==1)?_f9e:dojo.lang.hitch(_f9e,_f9f);
ws.browser._onBeforeUnloadHandlers.push(_fa0);
},_onBeforeUnload:function(){
ws.browser._oldOnBeforeUnloadHandler();
window.onbeforeunload=null;
dojo.lang.setTimeout(function(){
window.onbeforeunload=ws.browser._onBeforeUnload;
},0);
if(ws.io.closeWindowInProgress){
return;
}
for(var i=0;i<ws.browser._onBeforeUnloadHandlers.length;i++){
var s=ws.browser._onBeforeUnloadHandlers[i]();
if(!dojo.string.isBlank(s)){
return s;
}
}
},_doNothing:function(){
},_initialize:function(){
var _fa3=[document,document.body,document.documentElement,];
this.docClickHandlerObj=null;
for(var i=0;i<_fa3.length;i++){
var _fa5=true;
try{
dojo.event.connect(_fa3[i],"onclick",this,"_doNothing");
dojo.event.disconnect(_fa3[i],"onclick",this,"_doNothing");
}
catch(ex){
_fa5=false;
}
if(_fa5){
this.docClickHandlerObj=_fa3[i];
break;
}
}
this._trackWindowFocus();
},ns7:(navigator.userAgent.indexOf("Netscape/7")!=-1),ns8:(navigator.userAgent.indexOf("Netscape/8")!=-1),isWindowFocused:true,_trackWindowFocus:function(){
if(dojo.render.html.ie){
dojo.event.connect(dojo.body(),"onfocusin",this,"_onfocus");
dojo.event.connect(dojo.body(),"onfocusout",this,"_onblur");
}else{
dojo.event.connect(window,"onfocus",this,"_onfocus");
dojo.event.connect(window,"onblur",this,"_onblur");
}
},_onfocus:function(){
this.isWindowFocused=true;
this._clearFlashingWindowTitle();
},_onblur:function(){
this.isWindowFocused=false;
},focus:function(el){
if(!this.isWindowFocused){
return;
}
try{
el.focus();
}
catch(e){
}
},setWindowTitle:function(_fa7){
if(document.title!=this._flashingTitle){
document.title=_fa7;
}
this._normalTitle=_fa7;
},setFlashingWindowTitle:function(_fa8){
if(this.isWindowFocused){
return;
}
this._clearFlashingWindowTitle();
this._flashingTitle=_fa8;
this._alternateWindowTitle();
},_flashingTitle:null,_normalTitle:document.title,_alternateWindowTitle:function(){
document.title=(document.title==this._normalTitle)?this._flashingTitle:this._normalTitle;
this._flashTitleTimeout=window.setTimeout(dojo.lang.hitch(this,"_alternateWindowTitle"),2000);
},_clearFlashingWindowTitle:function(){
this._flashingTitle=null;
document.title=this._normalTitle;
if(this._flashTitleTimeout){
window.clearTimeout(this._flashTitleTimeout);
}
}};
dojo.addOnLoad(ws.browser,"_initialize");
dojo.provide("ws.widget.WSButton");
dojo.widget.defineWidget("ws.widget.WSButton",dojo.widget.HtmlWidget,{isContainer:true,border:"none",showArrow:false,showArrowBorder:false,vizType:"",className:"",templateString:"<div class=\"wsButton\" dojoAttachEvent=\"onClick: _onClick; onMouseOver; onMouseDown\">"+"\t<nobr dojoAttachPoint=\"contentNode\" class=\"content\">"+"\t\t<div class=\"label\" dojoAttachPoint=\"containerNode\"></div>"+"\t\t<div class=\"arrow\" dojoAttachPoint=\"arrowNode\" dojoAttachEvent=\"onClick: onArrowClick\" style=\"display: none;\">"+"\t\t\t<img src=\""+Config.SpacerImageURL+"\">"+"\t\t</div>"+"\t</nobr>"+"</div>",templateCssString:".wsButton {\r\n\tfont-family: arial;\r\n\tfont-size: 12px;\r\n\tmargin: 0px;\r\n\tposition: relative;\r\n}\r\n.wsButton .content {\r\n\tcursor: pointer;\r\n\tpadding: 4px 7px;\r\n\tcolor: #000000;\r\n\tdisplay: block;\r\n\tposition: absolute;\r\n\tleft: 0px;\t\r\n\tborder: solid 1px #999999;\r\n}\r\n.wsButton .contentDisabled {\r\n\theight: 28px;\r\n\tcursor: default;\r\n\tcolor: #999999;\r\n}\r\n.wsToolbarBare div.wsButton:hover .content,\r\ndiv.wsButton:hover .content,\r\ndiv.wsButtonHover .content {\r\n}\r\n.wsToolbarBare div.wsButton:hover .contentDisabled,\r\ndiv.wsButton:hover .contentDisabled,\r\ndiv.wsButtonHover .contentDisabled {\r\n\tbackground: none;\r\n}\r\n.wsButton .label {\r\n\tposition: absolute;\r\n\tleft: 7px;\r\n}\r\n.wsButton .label_ns8moz {\r\n\tposition: static;\r\n}\r\n\r\n.wsButton .arrow {\r\n\tposition: absolute;\r\n\tright: 0px;\r\n\ttop: 0px;\r\n\twidth: 13px;\r\n\theight: 100%;\r\n}\r\n.wsButton .arrow img {\r\n\tbackground: url(\"${images}main.gif\") -1038px -2px;\r\n\twidth: 9px;\r\n\theight: 5px;\r\n\tmargin: 10px 0px 0px 0px;\r\n}\r\n.wsButton .splitArrow img {\r\n\tmargin-left: 3px;\r\n}\r\n\r\n\r\n/* Toolbar buttons */\r\n.wsToolbar .wsButton .content {\r\n\tpadding: 6px 9px 7px 7px;\r\n\tbackground: url(\"${images}backgrounds.gif\") -0px -262px repeat-x;\r\n\tborder: none;\r\n}\r\n.wsToolbar .wsButton .contentDisabled {\r\n\tcursor: default;\r\n\tcolor: #999999;\r\n}\r\n.wsToolbar .wsButton.rightBorder .content {\r\n\tborder-right: solid 1px #b3b3b3;\r\n}\r\n.wsToolbar .wsButton .arrow img {\r\n\tmargin: 11px 0px 0px 0px;\r\n}\r\n.wsToolbar .wsButton .splitArrow {\r\n\tborder-left: solid 1px #b3b3b3;\r\n}\r\n.wsToolbar div.wsButton:hover .content,\r\n.wsToolbar div.wsButtonHover .content {\r\n\tbackground: url(\"${images}backgrounds.gif\") -0px -290px repeat-x;\r\n}\r\n.wsToolbar div.wsButton:hover .contentDisabled,\r\n.wsToolbar div.wsButtonHover .contentDisabled {\r\n\tbackground: none;\r\n}\r\n.wsToolbar .wsButton .splitArrow img {\r\n\tmargin-left: 1px;\r\n}\r\n.wsToolbar .wsButton div.splitArrowHover,\r\n.wsToolbar .wsButton div.splitArrow:hover {\r\n\tbackground: #c1df58;\r\n}\r\n\r\n\r\n/* IE waffles on whether to honor the height:100% on the arrow element, so we\r\n   give it an extra bottom border to extend the height. */\r\n.wsToolbar .wsButton .splitArrow {\r\n\tborder-bottom: 12px solid #ebdfca;\r\n}\r\n.wsToolbar div.wsButton:hover .splitArrow,\r\n.wsToolbar div.wsButtonHover .splitArrow {\r\n\tborder-bottom: 12px solid #a3cf11;\r\n}\r\n.wsToolbar .wsButton div.splitArrowHover,\r\n.wsToolbar .wsButton div.splitArrow:hover {\r\n\tborder-bottom: 12px solid #c1df58;\r\n}\r\n\r\n\r\n/* Blue theme */\r\n.wsButtonBlue {\r\n\tfont-size: 10px;\r\n\tfont-family: Verdana;\r\n}\r\n\r\n.wsToolbar.wsToolbarBare .wsButton.wsButtonBlue .content,\r\n.wsButton.wsButtonBlue .content {\r\n\tbackground: url(\"${images}backgrounds.gif\") -0px -0px repeat-x;\r\n\tborder: 1px solid #000000;\r\n\tcolor: #000000;\r\n\tpadding: 3px 7px;\r\n\tmargin: 0px 2px 0px 2px;\r\n}\r\n\r\n.wsToolbar.wsToolbarBare .wsButton.wsButtonBlue:hover .content,\r\n.wsToolbar.wsToolbarBare .wsButton.wsButtonHoverBlue .content,\r\ndiv.wsButtonBlue:hover .content,\r\ndiv.wsButtonHoverBlue .content {\r\n\tbackground-position: -0px -19px;\r\n}\r\ndiv.wsButtonBlue:hover .contentDisabled,\r\ndiv.wsButtonHoverBlue .contentDisabled {\r\n\tbackground-position: -0px -0px;\r\n\tborder: 1px solid #000000;\r\n}\r\n.wsButtonBlue .arrow img {\r\n\tmargin-top: 8px;\r\n\tbackground-position: -1036px -3px;\r\n\twidth: 6px;\r\n\theight: 3px;\r\n}\r\n.wsButtonBlue.rightBorder .content {\r\n\tborder-right: solid 1px #b3b3b3;\r\n\tmargin-right: 4px;\r\n}\r\n\r\n\r\n/* Yellow theme */\r\n.wsButtonYellow .content {\r\n\tbackground: url(\"${images}backgrounds.gif\") -0px -145px repeat-x;\r\n\tborder: 1px solid #000000;\r\n\tcolor: #000000;\r\n\tpadding: 3px 7px;\r\n}\r\n\r\ndiv.wsButtonYellow:hover .content,\r\ndiv.wsButtonHoverYellow .content {\r\n\tbackground-position: -0px -169px;\r\n}\r\n\r\n\r\n\r\n/* Compose buttons */\r\n.wsButtonCompose {\r\n\tfont: bold 12px verdana;\r\n}\r\n.wsToolbarBare .wsButtonCompose .content {\r\n\tbackground: url(\"${images}backgrounds.gif\") -0px -318px repeat-x;\r\n\tborder: 1px solid #000000;\r\n\tcolor: #000000;\r\n\tpadding: 3px 7px;\r\n}\r\n.wsToolbar div.wsButtonCompose:hover .content,\r\n.wsToolbar div.wsButtonHoverCompose .content {\r\n\tbackground-position: -0px -341px;\r\n\tborder: 1px solid #000000;\r\n}\r\n\r\n/* Hat buttons */\r\n.wsButtonHat \r\n{\r\n\tmargin-right: 10px;\r\n\tfont: normal 10px verdana;\r\n}\r\n.wsButtonHat .content {\r\n\tbackground: url(\"${images}backgrounds.gif\") -0px -364px repeat-x;\r\n\tborder: 1px solid #000000;\r\n\tcolor: #000000;\r\n\tpadding: 3px 7px;\r\n}\r\ndiv.wsButtonHat:hover .content,\r\ndiv.wsButtonHoverHat .content {\r\n\tbackground-position: -0px -383px;\r\n\tborder: 1px solid #000000;\r\n}\r\n.wsButtonHat .arrow img {\r\n\tmargin-top: 8px;\r\n\tbackground-position: -1037px -20px;\r\n\twidth: 5px;\r\n\theight: 3px;\r\n}\r\n.wsButtonHat .splitArrow {\r\n\tborder-left: 1px solid #000000;\r\n}\r\n.wsButtonHat .splitArrow:hover {\r\n\tbackground-position: -0px -402px;\r\n}\r\n\r\n\r\n/* Send Confirmation buttons */\r\n.wsButtonSendConfirmation {\r\n\tfont: 12px arial;\r\n\tmargin-right: 17px;\r\n}\r\n.wsToolbarBare .wsButtonSendConfirmation .content {\r\n\tbackground: url(\"${images}backgrounds.gif\") -0px -318px repeat-x;\r\n\tborder: 1px solid #000000;\r\n\tcolor: #000000;\r\n\tpadding: 3px 7px;\r\n}\r\n.wsToolbar div.wsButtonSendConfirmation:hover .content,\r\n.wsToolbar div.wsButtonHoverSendConfirmation .content {\r\n\tbackground-position: -0px -341px;\r\n\tborder: 1px solid #000000;\r\n}\r\n\r\n/* Link style buttons - Calendar dialogs will use it*/\r\n.wsButtonLink \r\n{\r\n\tfont-family: Arial, Helvetica, Sans-Serif;\r\n\tfont-size: 12px;\r\n\tmargin: 0px 1px;\r\n}\r\n.wsButtonLink .content {\r\n\tborder: 1px solid #f4f2f0;\r\n\tcolor: #0066cc;\r\n\tpadding: 4px 7px;\r\n}\r\ndiv.wsButtonLink:hover .content,\r\ndiv.wsButtonHoverLink .content {\r\n\tbackground-color: #ffffff;\r\n\tborder: 1px solid #bfd7f4;\r\n}\r\n\r\ndiv.wsButtonLink:hover .contentDisabled,\r\ndiv.wsButtonHoverLink .contentDisabled {\r\n\tcursor: default;\r\n\tcolor: #999999;\r\n}\r\n\r\n.wsButtonLink .arrow img {\r\n\tbackground: url(\"${images}main.gif\") -1038px -2px;\r\n\twidth: 9px;\r\n\theight: 5px;\r\n\tmargin: 9px 0px 0px 0px;\r\n}\r\n.wsButtonLink .splitArrow {\r\n\tborder-left: 1px solid #000000;\r\n}\r\n.wsButtonLink .splitArrow:hover {\r\n\tbackground: url(\"${images}backgrounds.gif\") -0px -402px;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("../ws/widget/WSButton.css"),postCreate:function(args,frag){
if(!dojo.string.isBlank(this.vizType)){
dojo.html.addClass(this.domNode,"wsButton"+this.vizType);
}
if(!dojo.string.isBlank(this.className)){
dojo.html.addClass(this.domNode,this.className);
}
if(this.border=="right"){
dojo.html.addClass(this.domNode,"rightBorder");
}
if(this.showArrow){
dojo.html.show(this.arrowNode);
}
if(this.showArrowBorder){
dojo.html.addClass(this.arrowNode,"splitArrow");
ws.html.addHoverClass(this.arrowNode,"splitArrowHover");
}
if(dojo.render.html.moz&&(ws.browser.ns7||ws.browser.ns8)){
dojo.html.addClass(this.containerNode,"label_ns8moz");
}
if(this.disabled){
this.disable();
}
this.sizeMyself();
ws.html.addHoverClass(this.domNode,"wsButtonHover"+(this.vizType||""));
},getLabel:function(){
return this.containerNode.innerHTML;
},IsEqualsLabel:function(_fab){
return (this.containerNode.innerHTML==_fab);
},setLabel:function(_fac){
this.containerNode.innerHTML=_fac;
this.sizeMyself();
},sizeMyself:function(){
if(this.domNode.parentNode){
var _fad=document.createElement("span");
dojo.dom.insertBefore(_fad,this.domNode);
}
dojo.body().appendChild(this.domNode);
this.sizeMyselfHelper();
if(_fad){
dojo.dom.insertBefore(this.domNode,_fad);
dojo.dom.removeNode(_fad);
}
},sizeMyselfHelper:function(){
var _fae=dojo.html.getMarginBox(this.containerNode);
var _faf=this.showArrow?dojo.html.getMarginBox(this.arrowNode).width:0;
this.contentNode.style.width=(_fae.width+_faf)+"px";
this.contentNode.style.height=_fae.height+"px";
var _fb0=(this.border=="right")?1:0;
var _fb1=dojo.html.getMarginBox(this.contentNode);
this.domNode.style.height=_fb1.height+"px";
this.domNode.style.width=(_fb1.width+_fb0)+"px";
this.height=_fb1.height;
},enable:function(){
ws.widget.WSButton.superclass.enable.apply(this,arguments);
dojo.html.removeClass(this.contentNode,"contentDisabled");
},disable:function(){
ws.widget.WSButton.superclass.disable.apply(this,arguments);
dojo.html.addClass(this.contentNode,"contentDisabled");
},_onClick:function(e){
if(!this.disabled){
this.onClick(e);
}
},onClick:function(){
},onMouseOver:function(){
},onMouseDown:function(){
},onArrowClick:function(){
}});
dojo.declare("ws.widget.WSDropDownBase",null,{menuId:"",menu:null,menuDefinition:null,onClick:function(){
this.toggleMenu();
},toggleMenu:function(){
if(!this.menu){
this.getMenu();
}
if(this.menu.isShowingNow){
this.menu.close();
}else{
this.updateMenu(this.menu);
this.menu.open(this.contentNode,this,null,{"BL":"TL"});
}
},getMenu:function(){
if(this.menuId){
this.menu=dojo.widget.byId(this.menuId);
}else{
this.createMenu();
}
},createMenu:function(){
this.menu=ws.widget.createMenu(this.menuDefinition);
},updateMenu:function(menu){
}});
dojo.widget.defineWidget("ws.widget.WSDropDownButton",[ws.widget.WSButton,ws.widget.WSDropDownBase],{showArrow:true});
dojo.widget.defineWidget("ws.widget.WSDropDownLink",[dojo.widget.HtmlWidget,ws.widget.WSDropDownBase],{templateString:"<span class=\"${this.className}\" dojoAttachPoint=\"contentNode\" dojoAttachEvent=\"onClick\" style=\"white-space: nowrap; cursor: pointer;\">"+"\t<span class=\"wsLink\" dojoAttachPoint=\"containerNode\"></span>&nbsp;<img src=\"${spacer}\" style=\"background: url('${images}main.gif') -1022px -2px; height: 6px; width: 11px;\">"+"</span>",isContainer:true,className:"",setLabel:function(_fb4){
this.containerNode.innerHTML=_fb4;
}});
dojo.widget.defineWidget("ws.widget.WSSplitDropDownButton",ws.widget.WSDropDownButton,{showArrowBorder:true,onClick:function(){
dojo.debug("onclick");
},onArrowClick:function(e){
this.toggleMenu();
e.stopPropagation();
}});
dojo.provide("ws.style");
ws.style=dojo.html;
ws.style.SELECTORS_MARGINWIDTH=["margin-left","margin-right"];
ws.style.SELECTORS_MARGINHEIGHT=["margin-top","margin-bottom"];
ws.style.SELECTORS_PADBORDERWIDTH=["border-left-width","border-right-width","padding-left","padding-right"];
ws.style.SELECTORS_PADBORDERHEIGHT=["border-top-width","border-bottom-width","padding-top","padding-bottom"];
ws.style.SELECTORS_BORDERBOXWIDTH=ws.style.SELECTORS_MARGINWIDTH.concat(ws.style.SELECTORS_PADBORDERWIDTH);
ws.style.SELECTORS_BORDERBOXHEIGHT=ws.style.SELECTORS_MARGINHEIGHT.concat(ws.style.SELECTORS_PADBORDERHEIGHT);
dojo.html.toCamelCaseMap={};
dojo.html.toCamelCase=function(_fb6){
if(this.toCamelCaseMap[_fb6]){
return this.toCamelCaseMap[_fb6];
}
var arr=_fb6.split("-"),cc=arr[0];
for(var i=1;i<arr.length;i++){
cc+=arr[i].charAt(0).toUpperCase()+arr[i].substring(1);
}
this.toCamelCaseMap[_fb6]=cc;
return cc;
};
ws.style.setFloat=function(el,flt){
el.style[ws.style.floatAttr]=flt;
};
ws.style.getFloat=function(el){
return el.style[ws.style.floatAttr];
};
ws.style.floatAttr=dojo.render.html.ie?"styleFloat":"cssFloat";
ws.style.getComputedStyles=function(node,_fbe){
node=dojo.byId(node);
var _fbf=new Array();
var _fc0=null;
var arr=null;
var _fc2=null;
var s=null;
var sv=0;
var _fc5=null;
for(var i=0;i<_fbe.length;i++){
_fc0=_fbe[i];
_fc0=_fc0.replace(/([A-Z])/g,"-$1").toLowerCase();
arr=_fc0.split("-");
_fc2=arr[0];
for(var j=1;j<arr.length;j++){
_fc2+=arr[j].charAt(0).toUpperCase()+arr[j].substring(1);
}
s=null;
if(!node||!node.style){
s=null;
}else{
if(document.defaultView){
try{
if(dojo.render.html.safari&&(node.tagName.toLowerCase()=="td")&&((_fc0=="margin-top")||(_fc0=="margin-bottom"))){
s="0px";
}else{
var cs=document.defaultView.getComputedStyle(node,"");
if(cs){
s=cs.getPropertyValue(_fc0);
}else{
s=null;
}
}
}
catch(e){
if(node.style.getPropertyValue){
s=node.style.getPropertyValue(_fc0);
}else{
s=null;
}
}
}else{
if(node.currentStyle){
s=node.currentStyle[_fc2];
}else{
if(node.style.getPropertyValue){
s=node.style.getPropertyValue(_fc0);
}else{
s=null;
}
}
}
}
sv=0;
if(!s||(s=="auto")){
sv=0;
}else{
_fc5=s.match(/(\-?[\d.]+)([a-z%]*)/i);
if(!_fc5){
sv=0;
}else{
if(_fc5[2].toLowerCase()!="px"){
sv=NaN;
}else{
sv=Number(_fc5[1]);
}
}
}
_fbf[i]=sv;
}
return _fbf;
};
ws.style.getMarginBoxWidthFast=function(node){
node=dojo.byId(node);
var _fca=node.offsetWidth;
var _fcb=ws.style.getComputedStyles(node,ws.style.SELECTORS_MARGINWIDTH);
_fca+=_fcb[0]+_fcb[1];
return _fca;
};
if(dojo.render.html.safari){
ws.style.getMarginBoxWidthFast=function(node){
return dojo.html.getMarginBox(dojo.byId(node)).width;
};
ws.style.getMarginBoxHeightFast=function(node){
return dojo.html.getMarginBox(dojo.byId(node)).height;
};
}
ws.style.setMarginBoxWidthFast=function(node,_fcf){
node=dojo.byId(node);
var _fd0=ws.style.isBorderBox(node);
var _fd1=_fd0?ws.style.SELECTORS_MARGINWIDTH:ws.style.SELECTORS_BORDERBOXWIDTH;
var _fd2=ws.style.getComputedStyles(node,_fd1);
if(!_fd0){
_fcf-=_fd2[2]+_fd2[3]+_fd2[4]+_fd2[5];
}
_fcf-=_fd2[0]+_fd2[1];
if(isNaN(_fcf)){
return false;
}else{
node.style["width"]=Math.max(0,_fcf)+"px";
return true;
}
};
ws.style.getContentBoxWidthFast=function(node){
node=dojo.byId(node);
var _fd4=node.offsetWidth;
var _fd5=ws.style.getComputedStyles(node,ws.style.SELECTORS_PADBORDERWIDTH);
_fd4-=_fd5[0]+_fd5[1]+_fd5[2]+_fd5[3];
return _fd4;
};
ws.style.setContentBoxWidthFast=function(node,_fd7){
node=dojo.byId(node);
if(ws.style.isBorderBox(node)){
var _fd8=ws.style.getComputedStyles(node,ws.style.SELECTORS_PADBORDERWIDTH);
_fd7+=_fd8[0]+_fd8[1]+_fd8[2]+_fd8[3];
}
if(isNaN(_fd7)){
return false;
}else{
node.style["width"]=Math.max(0,_fd7)+"px";
return true;
}
};
ws.style.getMarginBoxHeightFast=function(node){
node=dojo.byId(node);
var _fda=node.offsetHeight;
var _fdb=ws.style.getComputedStyles(node,ws.style.SELECTORS_MARGINHEIGHT);
_fda+=_fdb[0]+_fdb[1];
return _fda;
};
if(dojo.render.html.safari){
ws.style.getMarginBoxHeightFast=function(node){
return dojo.html.getMarginBox(dojo.byId(node)).height;
};
}
ws.style.setMarginBoxHeightFast=function(node,_fde){
node=dojo.byId(node);
var _fdf=ws.style.isBorderBox(node);
var _fe0=_fdf?ws.style.SELECTORS_MARGINHEIGHT:ws.style.SELECTORS_BORDERBOXHEIGHT;
var _fe1=ws.style.getComputedStyles(node,_fe0);
if(!_fdf){
_fde-=_fe1[2]+_fe1[3]+_fe1[4]+_fe1[5];
}
_fde-=_fe1[0]+_fe1[1];
if(isNaN(_fde)){
return false;
}else{
node.style["height"]=Math.max(0,_fde)+"px";
return true;
}
};
ws.style.getContentBoxHeightFast=function(node){
node=dojo.byId(node);
var _fe3=node.offsetHeight;
var _fe4=ws.style.getComputedStyles(node,ws.style.SELECTORS_PADBORDERHEIGHT);
_fe3-=_fe4[0]+_fe4[1]+_fe4[2]+_fe4[3];
return _fe3;
};
ws.style.setContentBoxHeightFast=function(node,_fe6){
node=dojo.byId(node);
if(ws.style.isBorderBox(node)){
var _fe7=ws.style.getComputedStyles(node,ws.style.SELECTORS_PADBORDERHEIGHT);
_fe6+=_fe7[0]+_fe7[1]+_fe7[2]+_fe7[3];
}
if(isNaN(_fe6)){
return false;
}else{
node.style["height"]=Math.max(0,_fe6)+"px";
return true;
}
};
dojo.declare("ws.style.ComponentColor",null,{initializer:function(_fe8,dark,_fea,_feb,_fec){
this.border=_fe8;
this.dark=dark;
this.light=_fea;
this.darkText=_feb;
this.lightText=_fec;
}});
ws.style.componentColorMap={"#0360EB":new ws.style.ComponentColor("#2563D3","#2563D3","#2563D3","#FFFFFF","#FFFFFF"),"#E76808":new ws.style.ComponentColor("#F07E04","#F07E04","#F07E04","#FFFFFF","#FFFFFF"),"#CC0000":new ws.style.ComponentColor("#E02828","#E02828","#E02828","#FFFFFF","#FFFFFF"),"#009712":new ws.style.ComponentColor("#0F9804","#0F9804","#0F9804","#FFFFFF","#FFFFFF"),"#6600FF":new ws.style.ComponentColor("#BC05BC","#BC05BC","#BC05BC","#FFFFFF","#FFFFFF"),"#0088FF":new ws.style.ComponentColor("#B0CC2A","#B0CC2A","#B0CC2A","#FFFFFF","#FFFFFF"),"#808000":new ws.style.ComponentColor("#E5B409","#E5B409","#E5B409","#FFFFFF","#FFFFFF"),"#008080":new ws.style.ComponentColor("#08B476","#08B476","#08B476","#FFFFFF","#FFFFFF"),"#FF0080":new ws.style.ComponentColor("#FD487F","#FD487F","#FD487F","#FFFFFF","#FFFFFF"),"#800080":new ws.style.ComponentColor("#61301E","#61301E","#61301E","#FFFFFF","#FFFFFF"),"#646496":new ws.style.ComponentColor("#000000","#000000","#000000","#FFFFFF","#FFFFFF"),"#6C6C6C":new ws.style.ComponentColor("#6D6560","#6D6560","#6D6560","#FFFFFF","#FFFFFF")};
dojo.addOnLoad(function(){
dojo.html.applyBrowserClass(dojo.body());
});
dojo.provide("ws.widget.WSToolbar");
dojo.widget.defineWidget("ws.widget.WSToolbar",dojo.widget.HtmlWidget,{templateString:"<div class=\"wsToolbar\">"+"\t<div class=\"containerNode\" dojoAttachPoint=\"containerNode\" style=\"float: left;\"></div>"+"\t<div class=\"centerNode\" dojoAttachPoint=\"centerNode\" style=\"float: left;\"></div>"+"\t<div class=\"rightNode\" dojoAttachPoint=\"rightNode\" style=\"float: right;\"></div>"+"</div>",templateCssString:".wsToolbar {\r\n\tpadding: 0px;\r\n\tbackground-color: #F4F2F0;\r\n\tbackground: url(\"${images}backgrounds.gif\") -0px -262px repeat-x;\r\n\tborder-bottom: 1px solid #adaaa6;\r\n\theight: 28px;\r\n}\r\n\r\n.wsToolbar .containerNode,\r\n.wsToolbar .centerNode,\r\n.wsToolbar .rightNode {\r\n\tdisplay: inline; /* Fixes the IE double float margin bug */\r\n}\r\n\r\n.wsToolbarBare \r\n{\r\n\tbackground: transparent none;\r\n\tborder-bottom: none;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("../ws/widget/WSToolbar.css"),isContainer:true,vizType:"",postInitialize:function(args,frag){
ws.widget.WSToolbar.superclass.postInitialize.apply(this,arguments);
if(!dojo.string.isBlank(this.vizType)){
dojo.html.addClass(this.domNode,"wsToolbar"+this.vizType);
}
var _fef=dojo.lang.toArray(this.children);
dojo.lang.forEach(_fef,dojo.lang.hitch(this,"_processChild"));
},addToolbarItem:function(_ff0){
this.addChild(_ff0);
this._processChild(_ff0);
},_processChild:function(_ff1){
var _ff2="left";
if(_ff1.toolbarPosition=="right"){
_ff2="right";
}
ws.style.setFloat(_ff1.domNode,_ff2);
var _ff3=(_ff1.toolbarPosition=="center")?this.centerNode:((_ff1.toolbarPosition=="right")?this.rightNode:null);
if(_ff3){
this.removeChild(_ff1);
this.addChild(_ff1,_ff3);
}
},postCreate:function(args,frag){
ws.widget.WSToolbar.superclass.postCreate.apply(this,arguments);
if(dojo.render.html.ie){
dojo.lang.setTimeout(this,"fixButtons",10);
dojo.event.connect(window,"onresize",this,"fixButtons");
var _ff6=this.parent;
while(_ff6&&(_ff6.widgetType!="Dialog")){
_ff6=_ff6.parent;
}
if(_ff6){
dojo.event.connect(_ff6,"onShow",this,"fixButtons");
}
}
},fixButtons:function(){
this.domNode.style.zoom="";
this.domNode.style.zoom=1;
},uninitialize:function(){
dojo.event.disconnect(window,"onresize",this,"fixButtons");
},onResized:function(){
var _ff7=function(_ff8){
var ret=0;
dojo.lang.forEach(_ff8,function(node){
if(node.nodeType==dojo.html.ELEMENT_NODE){
ret+=dojo.html.getMarginBox(node).width+1;
}
});
return ret;
};
var _ffb=_ff7(this.containerNode.childNodes);
var _ffc=_ff7(this.rightNode.childNodes);
var _ffd=_ff7(this.centerNode.childNodes);
var _ffe=ws.style.getContentBoxWidthFast(this.domNode);
var pad=Math.round((_ffe-(_ffb+_ffc+_ffd))/2);
dojo.html.setPositivePixelValue(this.centerNode,"marginLeft",pad);
dojo.html.setContentBox(this.containerNode,{width:Math.min(_ffe,_ffb)});
dojo.html.setContentBox(this.rightNode,{width:Math.min(_ffe,_ffc)});
dojo.html.setContentBox(this.centerNode,{width:Math.min(_ffe,_ffd)});
}});
dojo.lang.extend(dojo.widget.Widget,{toolbarPosition:"left"});
dojo.provide("ws.widget.Dialogs");
ws.widget.Dialogs={show:function(msg,_1001,_1002){
if(!ws.widget.Dialogs.dialog){
ws.widget.Dialogs.dialog=dojo.widget.createWidget("ws:GenericDialog",null,document.body,"first");
}
ws.widget.Dialogs.dialog.show(msg,_1001,_1002);
},ok:function(msg,_1004,_1005){
if(_1005){
ws.widget.Dialogs.okCancel(msg,_1004);
}else{
ws.widget.Dialogs.show(msg,[Config.Strings.OK],_1004);
}
},okCancel:function(msg,_1007){
ws.widget.Dialogs.show(msg,[Config.Strings.Cancel,Config.Strings.OK],function(i){
if(_1007){
_1007(i==1);
}
});
},yesNo:function(msg,_100a){
ws.widget.Dialogs.show(msg,[Config.Strings.No,Config.Strings.Yes],function(i){
if(_100a){
_100a(i==1);
}
});
}};
dojo.widget.defineWidget("ws.widget.GenericDialog",dojo.widget.HtmlWidget,{widgetsInTemplate:true,templateString:"<div>"+"\t<div dojoType=\"dojo:Dialog\" dojoAttachPoint=\"dialog\" bgColor=\"white\" bgOpacity=\"0.75\">"+"\t\t<div style=\"width: 300px; background: #fff; border: 1px solid #000; padding: 8px; overflow: hidden;\">"+"\t\t\t<div dojoAttachPoint=\"textNode\" style=\"padding: 4px 0px 8px 0px;\"></div>"+"\t\t\t<div dojoAttachPoint=\"toolbar\" dojoType=\"ws:WSToolbar\" vizType=\"Bare\"></div>"+"\t\t</div>"+"\t</div>"+"</div>",show:function(msg,_100d,_100e){
dojo.widget.PopupManager.unRegisterAllWindows();
msg=msg.replace(/\\x22/g,"&quot;").replace(/\\n/g,"<br>").replace(/\\x2f/g,"/");
this.textNode.innerHTML=msg;
this.callback=_100e;
this.dialog.show();
this.setupButtons(_100d);
},setupButtons:function(_100f){
this.ensureButtonsExist(_100f.length);
for(var i=0;i<_100f.length;i++){
this.buttons[i].show();
this.buttons[i].setLabel(_100f[i]);
}
for(var i=_100f.length;i<this.buttons.length;i++){
this.buttons[i].hide();
}
this.toolbar.onResized();
},ensureButtonsExist:function(count){
if(!this.buttons){
this.buttons=[];
}
for(var i=this.buttons.length;i<count;i++){
var btn=dojo.widget.createWidget("ws:WSButton",{toolbarPosition:"right",vizType:"Blue"});
btn.onClick=ws.lang.hitch(this,"onButtonClick",i);
this.toolbar.addToolbarItem(btn);
this.buttons.push(btn);
}
},onButtonClick:function(i){
this.dialog.hide();
dojo.widget.PopupManager.registerAllWindows();
if(this.callback){
this.callback(i);
}
}});
dojo.provide("ws.widget.OkCancelDialog");
ws.widget.OkCancelDialog={alert:function(text,_1016,_1017){
ws.widget.Dialogs.ok(text,_1016,_1017);
}};
dojo.provide("ws.io");
dojo.require("dojo.io");
ws.io={rpc:function(reqs){
if(!dojo.lang.isArray(reqs)){
reqs=[reqs];
}
for(var i=0;i<reqs.length;i++){
if(reqs[i].formNode&&dojo.io.formHasFile(reqs[i].formNode)&&dojo.html.getElementWindow(reqs[i].formNode)!=window){
dojo.html.getElementWindow(reqs[i].formNode).ws.io.rpc(reqs[i]);
}else{
ws.io.rpcRequests.push(reqs[i]);
}
}
dojo.lang.setTimeout(ws.io.rpcIssueRequests,0);
},rpcIssueRequests:function(){
if(!dojo.hostenv.post_load_){
dojo.addOnLoad(ws.io.rpcIssueRequests);
return;
}
var reqs=ws.io.rpcRequests;
ws.io.rpcRequests=[];
if(reqs.length==0){
return;
}
var _101b=[];
var _101c=null;
var _101d=true;
var _101e=[];
for(var i=0;i<reqs.length;i++){
if(!reqs[i].content){
reqs[i].content={};
}
reqs[i].content.action=reqs[i].action;
_101e.push(reqs[i].action);
_101b.push(reqs[i].content);
if(reqs[i].formNode){
if(_101c){
dojo.debug("Multiple requests with a formNode!!");
}
_101c=reqs[i].formNode;
}
if(!reqs[i].automatic){
_101d=false;
}
}
var _1020=dojo.json.serialize(_101b);
var _1021=_101c&&dojo.io.formHasFile(_101c);
if(_1021&&dojo.render.html.ie){
_1020=dojo.string.escapeXml(_1020);
}
dojo.io.bind({url:Config.BaseRpcPagesURL+"RPC.aspx?user="+ws.UserContext.UserUID+"&r="+Math.random()+"&a="+_101e.join("-"),method:"post",mimetype:"application/json",encoding:"utf8",timeoutSeconds:180,content:{requests:_1020,automatic:_101d},formNode:_101c,sendTransport:true,handle:function(type,data,evt){
for(var i=0;i<reqs.length;i++){
var _1026=false;
if(type=="load"&&data&&(typeof data!="xml")&&data[i]&&data[i].isSuccess){
if(reqs[i].load){
try{
reqs[i].load(data[i]);
}
catch(e){
dojo.debug("Exception in load handler for action",reqs[i].action,e);
}
}
}else{
if(data&&(typeof data!="xml")&&data[i]){
if(data[i].redirectUrl){
top.location=data[i].redirectUrl;
break;
}else{
if(data[i].fatalError){
top.location=data[i].errorUrl;
break;
}else{
if(data[i].needAuthentication){
ws.widget.OkCancelDialog.alert(data[i].msg,function(){
top.location=data[i].loginUrl;
});
break;
}else{
if(data[i].isSessionExpired){
dojo.event.topic.publish("WSSessionExpired",data[i].msg);
break;
}else{
_1026=true;
}
}
}
}
}else{
_1026=true;
}
}
if(_1026&&reqs[i].error){
try{
if(dojo.render.html.ie60&&data&&data.message&&(data.message.indexOf("IframeTransport Request Error")==0)){
reqs[i].error(Config.Strings.CrossDomainFrameError1+"<br><br>"+Config.Strings.CrossDomainFrameError2);
}else{
reqs[i].error((data&&data[i])?data[i].error:null);
}
}
catch(e){
dojo.debug("Exception in error handler for action",reqs[i].action,e);
}
}
}
}});
},rpcRequests:[],getObjectCookie:function(name){
var _1028=null,_1029=dojo.io.cookie.getCookie(name);
if(_1029){
_1028={};
var pairs=_1029.split("&");
for(var i=0;i<pairs.length;i++){
var pair=pairs[i].split(":");
var value=pair[1];
if(isNaN(value)){
value=unescape(pair[1]);
}
_1028[unescape(pair[0])]=value;
}
}
return _1028;
},print:function(body,title){
html=ws.string.substituteParams("<html><head><title>%{title}</title></head><body>%{body}</body></html>",{title:dojo.string.escapeXml(title||""),body:body});
if(!window.print){
return;
}
var _1030=false;
window.onPrintFrameLoaded=function(){
if(_1030){
return;
}
_1030=true;
_1031.style.visibility="visible";
var win=dojo.io.iframeContentWindow(_1031);
var doc=dojo.io.iframeContentDocument(_1031);
doc.open();
doc.write(html);
doc.close();
win.focus();
win.print();
};
var _1031=dojo.io.createIFrame("PrintingFrame","onPrintFrameLoaded()");
},playSound:function(url){
this.initSound(url);
if(dojo.render.html.ie){
ws.io._bgsoundNode.src=url;
}else{
if(dojo.render.html.moz){
var _1035=ws.io._soundNodes[url];
if(!_1035){
return;
}
try{
_1035.Play();
}
catch(e){
dojo.lang.setTimeout(function(){
ws.io.playSound(url);
},500);
}
}
}
},initSound:function(url){
if(dojo.render.html.ie){
if(!ws.io._bgsoundNode){
ws.io._bgsoundNode=document.createElement("bgsound");
dojo.body().appendChild(ws.io._bgsoundNode);
}
}else{
if(dojo.render.html.moz){
if(!ws.io._soundNodes[url]){
for(var i=0;i<navigator.plugins.length;i++){
var _1038=navigator.plugins[i]["audio/wav"];
if(_1038){
if(_1038.enabledPlugin&&_1038.enabledPlugin.name){
var m=_1038.enabledPlugin.name.match("QuickTime Plug-in ([0-9]*)");
if(m&&m[1]&&(parseInt(m[1])>=7)){
dojo.debug("QuickTime 7+ detected, disabling sound");
break;
}
}
var span=document.createElement("span");
span.innerHTML="<embed src='"+url+"' hidden=true enablejavascript=true autostart=false autoplay=false loop=false></embed>";
var _103b=span.getElementsByTagName("embed")[0];
ws.io._soundNodes[url]=_103b;
dojo.body().appendChild(span);
break;
}
}
}
}
}
},_soundNodes:{},openWindow:function(url,name,_103e){
if(typeof _103e=="undefined"){
_103e="status=yes,resizable=yes,menubar=yes,scrollbars=yes,location=yes,toolbar=yes";
}
var w=window.open(url,name,_103e);
var _1040=false;
if(dojo.string.startsWith(url,"http")&&!dojo.string.startsWith(url,"http://"+document.domain)){
_1040=(w!=null);
}else{
try{
var n=w.name;
_1040=true;
}
catch(e){
}
}
if(!_1040){
ws.widget.OkCancelDialog.alert(Config.Strings.PopupBlocked);
return null;
}
ws.io._childWindows.push(w);
if(!ws.io._notifyChildWindowsAttached){
dojo.event.browser.addListener(window,"onunload",ws.io._notifyChildWindowsOfClose);
}
ws.io.openingWindow=true;
dojo.lang.setTimeout(function(){
ws.io.openingWindow=false;
},1000);
return w;
},closeWindow:function(){
ws.io.closeWindowInProgress=true;
if(dojo.render.html.ie){
window.location.href=Config.EmptyFileURL+"/../closewindow.htm";
}else{
window.close();
}
},_childWindows:[],_notifyChildWindowsOfClose:function(){
dojo.lang.forEach(ws.io._childWindows,function(w){
try{
w.onMainWindowClosed();
}
catch(e){
}
});
},getQueryParameter:function(name,_1044,_1045){
var ret=_1044||null;
_1045=_1045||document.location.search;
var _1047=_1045.match(new RegExp(name+"=([^&]*)"));
if(_1047!=null){
ret=_1047[1];
if(!dojo.string.isBlank(ret)){
ret=decodeURIComponent(ret.replace(/\+/g," "));
}
}
return ret;
},decodeURIComponentAndEscapeDQuote:function(s){
var d=decodeURIComponent(s.replace(/\+/g," "));
if(d.indexOf("\"")!=-1){
d=d.replace(/\"/g,"\\\"");
d=d.replace(/\\\\\"/g,"\\\"");
}
return d;
},getJsonFromQueryParams:function(_104a){
var _104b=null;
var _104c;
_104a=_104a||document.location.search;
if(!_104a){
return null;
}
var args=_104a.replace(/^\?/,"").split("&");
for(var i=0;i<args.length;i++){
var _104c=args[i].split("=");
if(_104c.length!=2){
continue;
}
if(_104b!=null){
_104b+=", ";
}else{
_104b="";
}
var _104f=this.decodeURIComponentAndEscapeDQuote(_104c[0]);
var _1050=this.decodeURIComponentAndEscapeDQuote(_104c[1]);
_104b+="\""+_104f+"\":\""+_1050+"\"";
}
if(_104b!=null){
_104b="{"+_104b+"}";
return eval("("+_104b+")");
}
return null;
}};
dojo.provide("ws.UserContext");
try{
var openerUserContext=opener.ws.UserContext;
ws.UserContext=dojo.lang.shallowCopy(openerUserContext);
}
catch(ex){
ws.UserContext={};
var settingsCookie=ws.io.getObjectCookie("Settings");
if(settingsCookie!=null){
ws.UserContext.UserName=settingsCookie.un;
ws.UserContext.UserScreenName=settingsCookie.usn;
ws.UserContext.UserDomain=settingsCookie.usd;
ws.UserContext.UserDisplayName=settingsCookie.fdn;
ws.UserContext.UserAddress=settingsCookie.uea;
ws.UserContext.UserUID=settingsCookie.uid;
}
var authCookie=ws.io.getObjectCookie("Auth");
if(authCookie!=null){
if(ws.UserContext.UserUID==null){
ws.UserContext.UserUID=authCookie.uid;
}
if(ws.UserContext.UserName==null){
ws.UserContext.UserName=authCookie.un;
}
ws.UserContext.ParentalControls=authCookie.aat;
ws.UserContext.BID=authCookie.bid;
ws.UserContext.AOLCreateDate=authCookie.acd;
ws.UserContext.PriceIndex=authCookie.pix;
ws.UserContext.ClientVersion=authCookie.cv;
ws.UserContext.ConnectionType=authCookie.ct;
ws.UserContext.MasterAccountHash=authCookie.mah;
ws.UserContext.SubAccountHash=authCookie.sah;
ws.UserContext.ScreenNameHash=authCookie.snh;
if(authCookie.uas){
ws.UserContext.UIVariant=authCookie.uas.split(",")[6];
}
}
}
dojo.provide("ws.reporting");
ws.reporting={report:function(_1051,_1052){
try{
opener.ws.reporting.report(_1051,_1052);
}
catch(ex){
ws.reporting._omniture.report(_1051,_1052);
ws.reporting._comscore.report(_1051,_1052);
ws.reporting._ivw.report(_1051,_1052);
}
},reportAction:function(_1053){
try{
opener.ws.reporting.reportAction(_1053);
}
catch(ex){
ws.reporting._omniture.reportAction(_1053);
}
}};
ws.reporting._omniture={report:function(_1054,_1055){
if(!Config.EnableOmnitureReporting){
return;
}
dojo.lang.setTimeout(this,"doReport",100,_1054,_1055);
},reportAction:function(_1056){
if(!Config.EnableOmnitureReporting||!Config.EnableCustomLinkTracking){
return;
}
dojo.lang.setTimeout(this,"doReportAction",100,_1056);
},doReport:function(_1057,_1058){
if(!this.iframe){
this.initialize(_1057,_1058);
return;
}
var props=this.getProps(_1057,_1058);
var win=dojo.html.iframeContentWindow(this.iframe);
if(win.s_dc){
for(var p in props){
win["s_"+p]=props[p];
}
win.s_dc(win.s_account);
}else{
var o=win.s_265||win.s;
dojo.lang.mixin(o,props);
o.t();
}
if(dojo.render.html.moz&&!this.fixedThrobber){
dojo.lang.setTimeout(function(){
ws.reporting._omniture.iframe.contentWindow.stop();
},5000);
this.fixedThrobber=true;
}
},doReportAction:function(_105d){
var win=dojo.html.iframeContentWindow(this.iframe);
if(win.s_dc){
}else{
var o=win.s_265||win.s;
o.linkTrackVars="None";
o.linkTrackEvents="None";
o.tl(dojo.body(),"o",_105d);
}
},getAccount:function(){
if(Config.ClientReportingAccount&&(navigator.userAgent.indexOf("AOL")!=-1)){
return Config.ClientReportingAccount;
}else{
return Config.ReportingAccount;
}
},getClientType:function(){
if(navigator.userAgent.indexOf("AOL")!=-1){
return "Client";
}else{
return "Portal";
}
},getProps:function(_1060,_1061){
var props={pfxID:Config.ReportingPrefix,pageName:Config.ReportingPrefix+" : "+_1060,channel:Config.ReportingChannel,prop1:Config.ReportingPrefix+" : "+Config.ReportingDepartment,prop2:Config.ReportingPrefix+" : "+_1061,prop3:ws.UserContext.BID,prop4:ws.UserContext.AOLCreateDate,prop6:ws.UserContext.MasterAccountHash,prop7:ws.UserContext.SubAccountHash,prop8:ws.UserContext.ConnectionType,prop10:ws.UserContext.ClientVersion,prop12:ws.reporting._comscore.getBeaconURL(_1060,false),prop13:"authenticated",prop16:""};
if(Config.ReportLocale){
props["prop"+Config.ReportLocale]=Config.PageLocale;
}
if(Config.ReportAccountCreateTime){
props["prop"+Config.ReportAccountCreateTime]=ws.UserContext.AOLCreateDate;
}
if(Config.ReportScreenName){
props["prop"+Config.ReportScreenName]=ws.UserContext.ScreenNameHash;
}
if(Config.ReportUIVariant){
props["prop"+Config.ReportUIVariant]=ws.UserContext.UIVariant;
}
if(Config.ReportClientType){
props["prop"+Config.ReportClientType]=this.getClientType();
}
if(Config.ReportHatChannel){
props["hatChannel"]=Config.ReportHatChannel;
}
return props;
},initialize:function(_1063,_1064){
this.initialPageName=_1063;
this.initialTabName=_1064;
this.iframe=dojo.io.createIFrame("wsReporting","ws.reporting._omniture.onIframeLoaded();",Config.EmptyFileURL);
},onIframeLoaded:function(){
var win=dojo.html.iframeContentWindow(this.iframe);
if(dojo.render.html.safari){
win.s_account=this.getAccount();
}else{
win.eval("var s_account = '"+this.getAccount()+"'");
}
var img=win.document.createElement("img");
img.name=img.id="s_i_"+this.getAccount().split(",")[0];
img.src=Config.SpacerImageURL;
win.document.body.appendChild(img);
var _1067=win.document.createElement("script");
_1067.src=Config.OmnitureJsUrl;
win.document.body.appendChild(_1067);
this.watchForScriptLoaded();
},watchForScriptLoaded:function(){
var win=dojo.html.iframeContentWindow(this.iframe);
var _1069=win.s_dc||win.s_265||win.s;
if(_1069){
this.report(this.initialPageName,this.initialTabName);
}else{
dojo.lang.setTimeout(this,"watchForScriptLoaded",100);
}
}};
ws.reporting._comscore={report:function(_106a,_106b){
if(!Config.EnableComscoreReporting){
return;
}
dojo.lang.setTimeout(this,"doReport",100,_106a);
},doReport:function(_106c){
var url=this.getBeaconURL(_106c,true);
dojo.io.bind({url:url});
},getBeaconURL:function(_106e,_106f){
var arg=_106e.replace(/\W/g,"");
var url=Config.BaseBeaconURL+"Beacon"+arg+".htm";
if(_106f){
url+="?rnd="+Math.random();
}
return url;
}};
ws.reporting._ivw={report:function(_1072,_1073){
if(!Config.EnableIVWReporting){
return;
}
dojo.lang.setTimeout(this,"doReport",100);
},doReport:function(){
if(!this.img){
this.img=document.createElement("img");
this.img.width=this.img.height=1;
dojo.body().appendChild(this.img);
}
var url=Config.IVWBeaconURL+"?r="+encodeURIComponent(document.referrer)+"&d="+(Math.random()*100000);
this.img.src=url;
}};
dojo.provide("ws.address.AddressBookUtil");
ws.address.AddressBookUtil={LoadSortDefaults:function(){
},GetRequestParamsForPrint:function(_1075,args){
var _1077;
var _1078=args.sortBy;
var _1079=args.sortDir;
var _107a=args.nameFormat;
var _107b=args.categoryFilter;
if(_1075!="selected"){
if(_1078==null){
this.LoadSortDefaults();
}
if(_1078!=null){
_1077+=ws.string.substituteParams("&sort={0}&sortDir={1}",_1078,_1079);
}
}
if(_1075=="category"){
if(!dojo.string.isBlank(_107b)){
_1077=ws.string.substituteParams("{0}&category={1}",_1077,encodeURIComponent(_107b));
}
}
_1077=_1077+"&nameFormat="+_107a;
_1077=_1077+"&version="+VERSION;
return _1077;
},OpenLocateOnMapWindow:function(_107c){
var left="5";
var top="5";
var width="725";
var _1080="725";
var url=Config.BaseABPagesURL+"addresslist-locate.aspx?"+_107c;
if(ws.UserContext!=null&&ws.UserContext.UserUID!=null){
url+="&user="+ws.UserContext.UserUID;
}
var _1082=ws.string.substituteParams("status=yes,resizable=yes,menubar=yes,scrollbars=yes,left={0},top={1},width={2},height={3}",left,top,width,_1080);
var hw=ws.io.openWindow(url,"",_1082);
hw.focus();
ws.reporting.report("Locate Map","Addresses");
},OpenAddressPrintWindow:function(_1084){
var left="5";
var top="5";
var width="625";
var _1088="500";
var url=Config.BaseABPagesURL+"addresslist-print.aspx?"+_1084;
if(ws.UserContext!=null&&ws.UserContext.UserUID!=null){
url+="&user="+ws.UserContext.UserUID;
}
var _108a=ws.string.substituteParams("status=yes,resizable=yes,menubar=yes,scrollbars=yes,left={0},top={1},width={2},height={3}",left,top,width,_1088);
var hw=ws.io.openWindow(url,"",_108a);
hw.focus();
ws.reporting.report("Print Contacts","Addresses");
},getNameInfoHTML:function(c,fmt,_108e){
var names=[];
if(fmt=="FirstLastNick"){
if(c.firstName){
names.push(c.firstName);
}
if(c.lastName){
names.push(c.lastName);
}
if(c.nickName){
names.push("("+c.nickName+")");
}
}else{
if(fmt=="LastFirstNick"){
if(c.lastName&&c.firstName){
names.push(c.lastName+",");
}else{
if(c.lastName){
names.push(c.lastName);
}
}
if(c.firstName){
names.push(c.firstName);
}
if(c.nickName){
names.push("("+c.nickName+")");
}
}else{
if(fmt=="LastNoCommaFirstNick"){
if(c.lastName){
names.push(c.lastName);
}
if(c.firstName){
names.push(c.firstName);
}
if(c.nickName){
names.push("("+c.nickName+")");
}
}else{
if(fmt=="NickFirstLast"){
if(c.nickName){
names.push("("+c.nickName+")");
}
if(c.firstName){
names.push(c.firstName);
}
if(c.lastName){
names.push(c.lastName);
}
}
}
}
}
var name=names.join(" ");
if(!_108e){
name=dojo.string.escapeXml(name);
}
return name;
}};
dojo.provide("ws.settings");
ws.settings={settingsCookieName:"Settings",getSettingsCookie:function(){
return ws.io.getObjectCookie(ws.settings.settingsCookieName)||{};
},getShowStandardInbox:function(){
return Settings.ShowStandardInbox;
},getInboxFolderName:function(){
return Settings.ShowStandardInbox?"Inbox":"New Mail";
},getPlayNewMailSounds:function(){
return Settings.PlaySound;
},getUseRichEditor:function(){
return Settings.UseRichEditor;
},getSaveImageAttachments:function(){
return Settings.SaveImageAttachments;
},getSpellCheckBeforeSend:function(){
return Settings.SpellCheckBeforeSend;
},enableLinkedScreenName:true};
dojo.provide("ws.address.record");
dojo.declare("ws.address.record",null,function(_1091,str){
var vals=str.split(_1091.DELIMITER_FIELD);
this.uid=vals[0];
this.addressMap=0;
var type,value;
for(var i=1;i<vals.length;i+=2){
type=vals[i];
value=vals[i+1];
switch(type){
case _1091.CONTACT_FNAME:
this.firstName=value;
this.bType="c";
break;
case _1091.CONTACT_LNAME:
this.lastName=value;
this.bType="c";
break;
case _1091.CONTACT_NNAME:
this.nickName=value;
this.bType="c";
break;
case _1091.CONTACT_SNAME:
this.screenName=value;
this.hasEmail=true;
this.bType="c";
break;
case _1091.CONTACT_EMAIL1:
this.email1=value;
this.hasEmail=true;
this.bType="c";
break;
case _1091.CONTACT_EMAIL2:
this.email2=value;
this.hasEmail=true;
this.bType="c";
break;
case _1091.CONTACT_PHONE1:
this.phone1=value;
this.bType="c";
break;
case _1091.CONTACT_PHONE2:
this.phone2=value;
this.bType="c";
break;
case _1091.CONTACT_PHONE3:
this.phone3=value;
this.bType="c";
break;
case _1091.CONTACT_PHONE4:
this.phone4=value;
this.bType="c";
break;
case _1091.CONTACT_PHONE5:
this.phone5=value;
this.bType="c";
break;
case _1091.CONTACT_PHONE1TYPE:
this.phone1Type=value;
this.bType="c";
break;
case _1091.CONTACT_PHONE2TYPE:
this.phone2Type=value;
this.bType="c";
break;
case _1091.CONTACT_PHONE3TYPE:
this.phone3Type=value;
this.bType="c";
break;
case _1091.CONTACT_PHONE4TYPE:
this.phone4Type=value;
this.bType="c";
break;
case _1091.CONTACT_PHONE5TYPE:
this.phone5Type=value;
this.bType="c";
break;
case _1091.CONTACT_CATEGORY:
this.category=parseInt(value);
this.bType="c";
break;
case _1091.DISTROLIST_NAME:
this.name=value;
this.bType="d";
break;
case _1091.DISTROLIST_COUNT:
this.count=value;
this.bType="d";
break;
case _1091.DISTROLIST_ENTRY:
this.composeValue=value;
this.hasEmail=true;
this.bType="d";
break;
case _1091.DISTROLIST_CONTACT_UIDS:
this.contactUids=value;
this.bType="d";
break;
case _1091.SHAREDGROUP_NAME:
this.name=value;
this.bType="s";
break;
case _1091.SHAREDGROUP_ENTRY:
this.composeValue=value;
this.hasEmail=true;
this.bType="s";
break;
case _1091.CONTACT_ADDR_BITMAP:
this.addressMap=parseInt(value);
break;
default:
dojo.debug("Unknown AB field type:",type.charCodeAt(0));
}
}
if(!this.name){
this.name=ws.address.AddressBookUtil.getNameInfoHTML(this,Settings.AddressNameDisplayFormat,true);
}
});
dojo.provide("ws.lang");
ws.lang={hitch:function(_1097,_1098){
if(typeof _1098=="string"){
_1098=_1097[_1098];
}
var args=[];
for(var i=2;i<arguments.length;i++){
args.push(arguments[i]);
}
return function(){
var args2=[];
for(var i=0;i<arguments.length;i++){
args2.push(arguments[i]);
}
return _1098.apply(_1097,args.concat(args2));
};
},shallowCopy:function(obj,deep){
var i,ret;
if(obj===null){
return null;
}
if(ws.lang.isArray(obj)){
ret=[];
for(i=0;i<obj.length;i++){
ret[i]=deep?ws.lang.shallowCopy(obj[i],deep):obj[i];
}
}else{
if(dojo.lang.isObject(obj)){
ret={};
for(i in obj){
if(dojo.lang.isUndefined(ret[i])){
ret[i]=deep?ws.lang.shallowCopy(obj[i],deep):obj[i];
}
}
}else{
ret=obj;
}
}
return ret;
},isArray:function(obj){
return obj.push&&obj.splice&&obj.join;
},isEmptyObject:function(obj){
for(var x in obj){
return false;
}
return true;
},difference:function(arr1,arr2){
var ret=[];
for(var i=0;i<arr1.length;i++){
if(dojo.lang.find(arr2,arr1[i])==-1){
ret.push(arr1[i]);
}
}
return ret;
},intersection:function(arr1,arr2){
return dojo.lang.filter(arr1,function(x){
return dojo.lang.find(arr2,x)!=-1;
});
},findByProp:function(arr,prop,val){
for(var i=0;i<arr.length;i++){
if(arr[i][prop]==val){
return i;
}
}
return -1;
}};
dojo.provide("ws.address.AddressModel");
dojo.declare("ws.address.ABList",null,{DELIMITER_RECORD:"\x01",DELIMITER_FIELD:"\x02",initializer:function(data,_10b0){
this._data=data;
this._compareData=data.toLowerCase();
dojo.lang.mixin(this,_10b0);
this.indices={};
this.getIndex();
this._deletedRecordOffsets=[];
},getRecordAtOffset:function(_10b1){
_10b1+=1;
var end=this._data.indexOf(this.DELIMITER_RECORD,_10b1);
var str=(end==-1)?this._data.substr(_10b1):this._data.substr(_10b1,end-_10b1);
var ret=new ws.address.record(this,str);
return ret;
},getOffsetOfUid:function(uid){
var _10b6=this._data.indexOf(this.DELIMITER_RECORD+uid+this.DELIMITER_FIELD);
if(_10b6==-1){
_10b6=this._data.indexOf(this.DELIMITER_RECORD+uid);
}
return _10b6;
},getUidOfOffset:function(_10b7){
return this._data.substr(_10b7+1,this._data.indexOf(this.DELIMITER_FIELD,_10b7)-_10b7-1);
},getIndex:function(_10b8,types){
if(!_10b8){
_10b8="base";
}
if(!this.indices[_10b8]){
if(types){
this.indices[_10b8]=this.buildTypedIndex(types);
}else{
this.indices[_10b8]=this.buildIndex();
}
}
return this.indices[_10b8];
},buildIndex:function(){
var i=0;
var index={offsets:[]};
if(!this._data){
return index;
}
while(i!=-1){
index.offsets.push(i);
i=this._data.indexOf(this.DELIMITER_RECORD,i+1);
}
return index;
},buildTypedIndex:function(types){
var _10bd=[];
for(var i=0;i<types.length;i++){
_10bd.push(this._getMatches("base",null,this.DELIMITER_FIELD+types[i]+this.DELIMITER_FIELD));
}
var total=0;
for(var i=0;i<_10bd.length;i++){
total+=_10bd[i].offsets.length;
}
var ret={offsets:[],fields:[],typeIndex:types};
var min,_10c2;
var _10c3=dojo.lang.map(_10bd,function(){
return 0;
});
while(ret.offsets.length<total){
min=-1;
for(i=0;i<_10bd.length;i++){
if((_10c3[i]<_10bd[i].offsets.length)&&(min==-1||_10bd[i].offsets[_10c3[i]]<min)){
min=_10bd[i].offsets[_10c3[i]];
_10c2=i;
}
}
ret.offsets.push(min);
ret.fields.push(_10c2);
_10c3[_10c2]=_10c3[_10c2]+1;
}
return ret;
},getMatches:function(_10c4,_10c5,query){
return this._getMatches(_10c4,_10c5,this.DELIMITER_FIELD+query.toLowerCase());
},getMatchesByFieldType:function(_10c7,_10c8,type,query){
return this._getMatches(_10c7,_10c8,this.DELIMITER_FIELD+type+this.DELIMITER_FIELD+query.toLowerCase());
},_getMatches:function(_10cb,_10cc,query){
_10cb=_10cb||"base";
var index=this.getIndex(_10cb,_10cc);
var ret={offsets:[],fields:[]};
var _10d0=index.offsets[0]-1;
var row=0;
var _10d2=index.offsets.length;
while((_10d0=this._compareData.indexOf(query,_10d0+1))!=-1){
while((index.offsets[row]<_10d0)&&(row<_10d2)){
row++;
}
var _10d3=row-1;
var _10d4=index.offsets[_10d3];
var _10d5=this._compareData.indexOf(this.DELIMITER_RECORD,_10d4+1);
if((_10d5!=-1)&&(_10d5<_10d0)){
continue;
}
if(index.fields){
var _10d6=[],_10d7=[];
while(index.offsets[_10d3]==_10d4){
_10d7.unshift(_10d4);
_10d6.unshift(index.fields[_10d3]);
_10d3--;
}
ret.offsets.push.apply(ret.offsets,_10d7);
ret.fields.push.apply(ret.fields,_10d6);
}else{
ret.offsets.push(_10d4);
}
if(row==_10d2){
break;
}
_10d0=index.offsets[row];
}
this._removeOffsetsFromIndex(ret,this._deletedRecordOffsets);
return ret;
},getRolodex:function(_10d8,_10d9,_10da){
var index=this.getIndex(_10d8,_10d9);
if(index.rolodex){
return index.rolodex;
}
index.rolodex=[];
var row=0;
var _10dd=0;
var _10de=0;
var _10df=0;
var _10e0=0;
var _10e1=false;
var _10e2=false;
for(var i=0;i<ws.string.alphabet.length;i++){
_10e2=false;
_10dd=this._compareData.indexOf(this.DELIMITER_FIELD+_10da+this.DELIMITER_FIELD+ws.string.alphabet.charAt(i),_10dd);
if(_10dd==-1){
_10dd=this._compareData.indexOf(this.DELIMITER_FIELD+this.DISTROLIST_NAME+this.DELIMITER_FIELD+ws.string.alphabet.charAt(i),_10dd);
_10e2=(_10dd!=-1)?true:false;
}
_10e0=_10dd;
_10e1=false;
if(_10dd==-1){
index.rolodex.push(-1);
}else{
while(_10e0!=-1){
endRecordOffset=this._compareData.indexOf(this.DELIMITER_RECORD,_10e0);
endRecordOffset=(endRecordOffset==-1)?this._compareData.length:endRecordOffset;
if(_10e2){
var _10e4=this._compareData.indexOf(this.DISTROLIST_COUNT,_10e0)+2;
var _10e5=this._compareData.charAt(_10e4);
if(_10e5!="0"){
_10e1=true;
break;
}
}else{
_10df=this._compareData.indexOf(this.CONTACT_SNAME,_10e0);
if((_10df==-1)||(_10df>endRecordOffset)){
_10df=this._compareData.indexOf(this.CONTACT_EMAIL1,_10e0);
}
if((_10df==-1)||(_10df>endRecordOffset)){
_10df=this._compareData.indexOf(this.CONTACT_EMAIL2,_10e0);
}
if((_10df!=-1)&&(_10df<endRecordOffset)){
_10e1=true;
break;
}
}
_10e0=this._compareData.indexOf(this.DELIMITER_FIELD+_10da+this.DELIMITER_FIELD+ws.string.alphabet.charAt(i),_10e0+1);
}
if(_10e1){
while((row<index.offsets.length)&&(index.offsets[row]<_10dd)){
row++;
}
index.rolodex.push(row-1);
}else{
index.rolodex.push(-1);
}
}
}
return index.rolodex;
},deleteRecordsByOffset:function(_10e6){
var idx;
for(var _10e8 in this.indices){
this._removeOffsetsFromIndex(this.indices[_10e8],_10e6);
}
this._deletedRecordOffsets.push.apply(this._deletedRecordOffsets,_10e6);
},_removeOffsetsFromIndex:function(index,_10ea){
if(!_10ea.length){
return;
}
var idx;
for(var i=0;i<_10ea.length;i++){
while((idx=dojo.lang.find(index.offsets,_10ea[i]))!=-1){
index.offsets.splice(idx,1);
if(index.fields){
index.fields.splice(idx,1);
}
}
}
}});
dojo.lang.declare("ws.address.AddressModelCore",null,{sortByTypes:["None","FirstLastNick","LastFirstNick","NickFirstLast","PreferredEmail","ScreenName","Email1","Email2","PreferredPhone","Cellular","Fax","HomePhone","Pager","WorkPhone"],sortDirectionTypes:["Ascending","Descending"],initializer:function(){
this.hash="";
this.sortBy=Config.DefaultAddressNameSortOrder;
this.sortDirection=this.sortDirectionTypes[0];
this.loadDataInProgress=false;
this.errorState=false;
this.categories=null;
this.waitForDeferredInit=true;
dojo.event.topic.subscribe("SettingsChanged/General",this,"loadData");
},loadData:function(){
if(this.waitForDeferredInit){
return;
}
if(this.loadDataInProgress){
return;
}
this.loadDataInProgress=true;
this._autoCompleteContacts({hash:this.hash});
if((this.sortBy!=Config.DefaultAddressNameSortOrder)||(this.sortDirection!=this.sortDirectionTypes[0])){
var args={hash:this.hash,sortBy:this.sortBy,sortDirection:this.sortDirection};
this._autoCompleteContacts(args,true);
}
},sortData:function(_10ee,_10ef){
if((!_10ee)||(!this.sortDirection)){
return;
}
if((this.sortBy!=_10ee)||(this.sortDirection!=_10ef)){
this.sortBy=_10ee;
this.sortDirection=_10ef;
var args={sortBy:this.sortBy,sortDirection:this.sortDirection};
this._autoCompleteContacts(args,true);
}
},_autoCompleteContacts:function(args,_10f2){
ws.io.rpc({action:"AutoCompleteContacts",content:args?args:{},load:dojo.lang.hitch(this,function(data){
if(!("listString" in data)){
return;
}
this.hash=data.hash;
this.categories=data.categories;
if(_10f2){
this.abListCustomSort=new ws.address.ABList(data.listString,data.listFields);
dojo.event.topic.publish("ws.address.AddressModel.coreUpdated",_10f2);
}else{
this.abList=new ws.address.ABList(data.listString,data.listFields);
dojo.event.topic.publish("ws.address.AddressModel.coreUpdated");
}
this.loadDataInProgress=false;
}),error:dojo.lang.hitch(this,function(err){
this.loadDataInProgress=false;
if(!this.abList){
this.errorState=true;
dojo.event.topic.publish("ws.address.AddressModel.loadError");
}
dojo.debug("AutoCompleteContacts failed: ",err);
})});
},isLoading:function(){
return !this.abList&&(this.waitForDeferredInit||this.loadDataInProgress);
},deferredInit:function(){
this.waitForDeferredInit=false;
this.loadData();
}});
dojo.lang.declare("ws.address.AddressModel",null,{indexName:null,indexTypes:null,initializer:function(_10f5){
if(!this.core){
try{
var core=opener.ws.address.AddressModel.prototype.core;
}
catch(e){
var core=new ws.address.AddressModelCore();
}
ws.address.AddressModel.prototype.core=core;
}
this._abList="abList";
this.filteredIndex={offsets:[],fields:[]};
this.searchFilteredIndex={offsets:[],fields:[]};
this.categoryFilteredIndex={offsets:[],fields:[]};
if(_10f5){
this._isSortableListModel=true;
}
this.selectedUids={};
dojo.event.topic.subscribe("ws.address.AddressModel.coreUpdated",this,"_coreUpdated");
dojo.event.topic.subscribe("ws.address.AddressModel.loadError",this,"modelUpdated");
this._setIndexTypes();
},getActiveAbList:function(){
return this.core[this._abList];
},deferredInit:function(){
this.core.deferredInit();
},isLoading:function(){
return this.core.isLoading();
},isErrorState:function(){
return this.core.errorState;
},_coreUpdated:function(_10f7,_10f8){
if(_10f7){
if(this._isSortableListModel){
this._abList="abListCustomSort";
this._updateViews();
}else{
if(_10f8){
this._abList="abList";
this._updateViews();
}else{
return;
}
}
}else{
this._abList="abList";
this._updateViews();
}
},_updateViews:function(){
this._setIndexTypes();
if((dojo.string.isBlank(this.currentTextSearch))&&(dojo.string.isBlank(this.currentCategorySearch))){
this.modelUpdated();
}else{
if(!dojo.string.isBlank(this.currentTextSearch)){
this.search(this.currentTextSearch);
}
if(!dojo.string.isBlank(this.currentCategorySearch)){
this.categoryFilter(this.currentCategorySearch);
}
}
},modelUpdated:function(){
},change:function(row){
},getCategories:function(){
return this.core.categories;
},getCurrentCategorySearchString:function(){
var ret=null;
if(typeof (this.currentCategorySearch)=="undefined"){
ret=null;
}else{
if((null!==this.currentCategorySearch)&&(this.currentCategorySearch!="")&&(null!=this.getCategories())){
try{
ret=this.getCategories()[this.currentCategorySearch];
}
catch(e){
ret=null;
}
}
}
return ret;
},getRow:function(row){
var _10fc=this.getOffsetForRow(row);
return this.core[this._abList].getRecordAtOffset(_10fc);
},search:function(s){
this.currentTextSearch=s;
this.selectedUids={};
if(this.core[this._abList]){
if(!dojo.string.isBlank(s)){
this.searchFilteredIndex=this.core[this._abList].getMatches(this.indexName,this.indexTypes,s);
}
this.handleFilters();
}
},categoryFilter:function(_10fe){
this.selectedUids={};
this.currentCategorySearch=_10fe.toString();
if(this.core[this._abList]){
if(!dojo.string.isBlank(_10fe.toString())&&this.core[this._abList]){
this.categoryFilteredIndex=this.core[this._abList].getMatchesByFieldType(this.indexName,this.indexTypes,this.core[this._abList].CONTACT_CATEGORY,_10fe.toString());
}
this.handleFilters();
}
},handleFilters:function(){
if((!dojo.string.isBlank(this.currentTextSearch))&&(!dojo.string.isBlank(this.currentCategorySearch))){
this.filteredIndex={offsets:ws.lang.intersection(this.searchFilteredIndex.offsets,this.categoryFilteredIndex.offsets)};
}else{
if(!dojo.string.isBlank(this.currentTextSearch)){
this.filteredIndex=this.searchFilteredIndex;
}else{
if(!dojo.string.isBlank(this.currentCategorySearch)){
this.filteredIndex=this.categoryFilteredIndex;
}
}
}
this.modelUpdated();
},getRecordByUID:function(uid){
var row=this.getRowForUid(uid);
return this.getRow(row);
},getRecordByScreenName:function(sn){
if(this.core[this._abList]){
var _1102=this.core[this._abList].getMatchesByFieldType(null,null,this.core[this._abList].CONTACT_SNAME,sn);
for(var i=0;i<_1102.offsets.length;i++){
var ar=this.core[this._abList].getRecordAtOffset(_1102.offsets[i]);
if(ar.screenName.toLowerCase()==sn.toLowerCase()){
return ar;
}
}
}
return null;
},getRecordByEmail:function(email){
if(!email){
return null;
}
if(this.core[this._abList]){
var _1106=this.core[this._abList].getMatchesByFieldType(null,null,this.core[this._abList].CONTACT_EMAIL1,email);
for(var i=0;i<_1106.offsets.length;i++){
var ar=this.core[this._abList].getRecordAtOffset(_1106.offsets[i]);
if(ar.email1&&(ar.email1.toLowerCase()==email.toLowerCase())){
return ar;
}
}
_1106=this.core[this._abList].getMatchesByFieldType(null,null,this.core[this._abList].CONTACT_EMAIL2,email);
for(var i=0;i<_1106.offsets.length;i++){
var ar=this.core[this._abList].getRecordAtOffset(_1106.offsets[i]);
if(ar.email2&&(ar.email2.toLowerCase()==email.toLowerCase())){
return ar;
}
}
}
return null;
},getRolodex:function(){
var fmt=Settings.AddressNameDisplayFormat;
if(this.core[this._abList]){
var field=(fmt=="FirstLastNick")?this.core[this._abList].CONTACT_FNAME:this.core[this._abList].CONTACT_LNAME;
return this.core[this._abList].getRolodex(this.indexName,this.indexTypes,field);
}else{
var _110b=[];
for(var i=0;i<ws.string.alphabet.length;i++){
_110b[i]=-1;
}
return _110b;
}
},deleteAddresses:function(args){
if(typeof args.rows!="undefined"){
args.uids=this.getUidsForRows(args.rows);
}
this._addressAction("Delete",args);
this._removeAddressesLocal(args.uids);
},getContact:function(args){
args.uids=[args.uid];
this._addressAction("GetContact",args);
},getDistributionList:function(args){
args.uids=[args.uid];
this._addressAction("GetDistributionList",args);
},createOrModifyContact:function(args){
args.uids=[args.uid];
this._addressAction("CreateOrModifyContact",args);
this.core.loadData();
},createOrModifyDistributionList:function(args){
args.uids=[args.uid];
this._addressAction("CreateOrModifyDistributionList",args);
this.core.loadData();
},importContacts:function(args){
this._addressAction("Import",args);
this.core.loadData();
},_addressAction:function(_1113,args){
args.addressAction=_1113;
var _1115=args.formNode;
delete args.formNode;
ws.io.rpc({action:"AddressAction",content:args,formNode:_1115,load:args.load,error:args.error});
},_removeAddressesLocal:function(_1116){
if(this.core[this._abList]){
var _1117=this.getOffsetsForUids(_1116,this._abList);
this.core[this._abList].deleteRecordsByOffset(_1117);
if((this._abList=="abListCustomSort")&&(this.core.abList)){
_1117=this.getOffsetsForUids(_1116,"abList");
this.core.abList.deleteRecordsByOffset(_1117);
}else{
if((this._abList=="abList")&&(this.core.abListCustomSort)){
_1117=this.getOffsetsForUids(_1116,"abListCustomSort");
this.core.abListCustomSort.deleteRecordsByOffset(_1117);
}
}
dojo.lang.forEach(_1116,function(uid){
if(uid in this.selectedUids){
delete this.selectedUids[uid];
}
},this);
if(this.core.abListCustomSort){
dojo.event.topic.publish("ws.address.AddressModel.coreUpdated",true,true);
}else{
dojo.event.topic.publish("ws.address.AddressModel.coreUpdated");
}
}
},_setIndexTypes:function(){
},_getFullIndex:function(){
if((dojo.string.isBlank(this.currentTextSearch))&&(dojo.string.isBlank(this.currentCategorySearch))){
return this.core[this._abList]?this.core[this._abList].getIndex(this.indexName,this.indexTypes):{offsets:[],fields:[]};
}else{
return this.filteredIndex;
}
},_getOffsetIndex:function(){
return this._getFullIndex().offsets;
},getOffsetForRow:function(row){
return this._getOffsetIndex()[row];
},getOffsetsForUids:function(uids,_111b){
var ret=[];
var _111d=_111b?_111b:this._abList;
for(var i=0;i<uids.length;i++){
ret.push(this.core[_111d].getOffsetOfUid(uids[i]));
}
return ret;
},getUidForRow:function(row){
var rec=this.core[this._abList].getRecordAtOffset(this._getOffsetIndex()[row]);
return rec.uid;
},getRowForUid:function(uid){
var _1122=this.core[this._abList].getOffsetOfUid(uid);
if(_1122!=-1){
return dojo.lang.find(this._getOffsetIndex(),_1122);
}else{
return -1;
}
},getUidsForRows:function(rows){
var ret=[];
if(this.core[this._abList]){
for(var i=0;i<rows.length;i++){
ret.push(this.getUidForRow(rows[i]));
}
}
return ret;
},getRowsForUids:function(uids){
var ret=[];
if(this.core[this._abList]){
for(var i=0;i<uids.length;i++){
ret.push(this.getRowForUid(uids[i]));
}
}
return ret;
},getRowCount:function(){
return this._getOffsetIndex().length;
},toggleSelectRow:function(row,sel){
if(this.core[this._abList]){
this.toggleSelectUid(this.getUidForRow(row),sel);
}
},toggleSelectUid:function(uid,sel){
sel=(typeof sel=="undefined")?!this.isSelected(uid):sel;
if(sel){
this.selectedUids[uid]=true;
}else{
delete this.selectedUids[uid];
}
this.change(this.getRowForUid(uid));
},selectRange:function(low,high,sel){
for(var i=low;i<=high;i++){
this.toggleSelectRow(i,sel);
}
return true;
},selectAll:function(){
this.selectedUids={};
var _1131=this._getOffsetIndex();
for(var i=0;i<_1131.length;i++){
this.selectedUids[this.core[this._abList].getUidOfOffset(_1131[i])]=true;
}
this.modelUpdated();
return true;
},deselectAll:function(){
this.selectedUids={};
this.modelUpdated();
},getSelectedUids:function(){
var ret=[];
for(var uid in this.selectedUids){
ret.push(uid);
}
return ret;
},isSelected:function(uid){
return uid in this.selectedUids;
},isAllSelected:function(){
var uids=this.getSelectedUids();
return (uids.length>0)&&(this._getOffsetIndex().length==uids.length);
},isAnySelected:function(){
return !ws.lang.isEmptyObject(this.selectedUids);
}});
ws.address.AddressModel.onMainWindowClosed=function(){
ws.address.AddressModel.prototype.core=new ws.address.AddressModelCore();
ws.address.AddressModel.prototype.core.deferredInit();
};
dojo.declare("ws.address.AllAddressModel",ws.address.AddressModel,{indexName:"emailIndex",_setIndexTypes:function(){
var _1137=this.core[this._abList];
if(_1137){
this.indexTypes=[_1137.CONTACT_SNAME,_1137.CONTACT_EMAIL1,_1137.CONTACT_EMAIL2,_1137.DISTROLIST_ENTRY,_1137.SHAREDGROUP_ENTRY];
}
},getRow:function(row){
var index=this._getFullIndex();
var ar=this.core[this._abList].getRecordAtOffset(index.offsets[row]);
switch(this.indexTypes[index.fields[row]]){
case this.core[this._abList].CONTACT_SNAME:
ar.composeValue=ar.screenName;
break;
case this.core[this._abList].CONTACT_EMAIL1:
ar.composeValue=ar.email1;
break;
case this.core[this._abList].CONTACT_EMAIL2:
ar.composeValue=ar.email2;
break;
}
return ar;
},deleteAddresses:null,_removeAddressesLocal:null,toggleSelectRow:null,toggleSelectUid:null,selectRange:function(){
return false;
},selectAll:function(){
return false;
},deselectAll:null,getSelectedUids:function(){
return [];
},isSelected:function(uid){
return false;
},isAllSelected:function(){
return false;
},getRowForUid:null,getRowsForUids:null});
dojo.provide("dojo.date.common");
dojo.date.setDayOfYear=function(_113c,_113d){
_113c.setMonth(0);
_113c.setDate(_113d);
return _113c;
};
dojo.date.getDayOfYear=function(_113e){
var _113f=_113e.getFullYear();
var _1140=new Date(_113f-1,11,31);
return Math.floor((_113e.getTime()-_1140.getTime())/86400000);
};
dojo.date.setWeekOfYear=function(_1141,week,_1143){
if(arguments.length==1){
_1143=0;
}
dojo.unimplemented("dojo.date.setWeekOfYear");
};
dojo.date.getWeekOfYear=function(_1144,_1145){
if(arguments.length==1){
_1145=0;
}
var _1146=new Date(_1144.getFullYear(),0,1);
var day=_1146.getDay();
_1146.setDate(_1146.getDate()-day+_1145-(day>_1145?7:0));
return Math.floor((_1144.getTime()-_1146.getTime())/604800000);
};
dojo.date.setIsoWeekOfYear=function(_1148,week,_114a){
if(arguments.length==1){
_114a=1;
}
dojo.unimplemented("dojo.date.setIsoWeekOfYear");
};
dojo.date.getIsoWeekOfYear=function(_114b,_114c){
if(arguments.length==1){
_114c=1;
}
dojo.unimplemented("dojo.date.getIsoWeekOfYear");
};
dojo.date.shortTimezones=["IDLW","BET","HST","MART","AKST","PST","MST","CST","EST","AST","NFT","BST","FST","AT","GMT","CET","EET","MSK","IRT","GST","AFT","AGTT","IST","NPT","ALMT","MMT","JT","AWST","JST","ACST","AEST","LHST","VUT","NFT","NZT","CHAST","PHOT","LINT"];
dojo.date.timezoneOffsets=[-720,-660,-600,-570,-540,-480,-420,-360,-300,-240,-210,-180,-120,-60,0,60,120,180,210,240,270,300,330,345,360,390,420,480,540,570,600,630,660,690,720,765,780,840];
dojo.date.getDaysInMonth=function(_114d){
var month=_114d.getMonth();
var days=[31,28,31,30,31,30,31,31,30,31,30,31];
if(month==1&&dojo.date.isLeapYear(_114d)){
return 29;
}else{
return days[month];
}
};
dojo.date.isLeapYear=function(_1150){
var year=_1150.getFullYear();
return (year%400==0)?true:(year%100==0)?false:(year%4==0)?true:false;
};
dojo.date.getTimezoneName=function(_1152){
var str=_1152.toString();
var tz="";
var match;
var pos=str.indexOf("(");
if(pos>-1){
pos++;
tz=str.substring(pos,str.indexOf(")"));
}else{
var pat=/([A-Z\/]+) \d{4}$/;
if((match=str.match(pat))){
tz=match[1];
}else{
str=_1152.toLocaleString();
pat=/ ([A-Z\/]+)$/;
if((match=str.match(pat))){
tz=match[1];
}
}
}
return tz=="AM"||tz=="PM"?"":tz;
};
dojo.date.getOrdinal=function(_1158){
var date=_1158.getDate();
if(date%100!=11&&date%10==1){
return "st";
}else{
if(date%100!=12&&date%10==2){
return "nd";
}else{
if(date%100!=13&&date%10==3){
return "rd";
}else{
return "th";
}
}
}
};
dojo.date.compareTypes={DATE:1,TIME:2};
dojo.date.compare=function(dateA,dateB,_115c){
var dA=dateA;
var dB=dateB||new Date();
var now=new Date();
with(dojo.date.compareTypes){
var opt=_115c||(DATE|TIME);
var d1=new Date((opt&DATE)?dA.getFullYear():now.getFullYear(),(opt&DATE)?dA.getMonth():now.getMonth(),(opt&DATE)?dA.getDate():now.getDate(),(opt&TIME)?dA.getHours():0,(opt&TIME)?dA.getMinutes():0,(opt&TIME)?dA.getSeconds():0);
var d2=new Date((opt&DATE)?dB.getFullYear():now.getFullYear(),(opt&DATE)?dB.getMonth():now.getMonth(),(opt&DATE)?dB.getDate():now.getDate(),(opt&TIME)?dB.getHours():0,(opt&TIME)?dB.getMinutes():0,(opt&TIME)?dB.getSeconds():0);
}
if(d1.valueOf()>d2.valueOf()){
return 1;
}
if(d1.valueOf()<d2.valueOf()){
return -1;
}
return 0;
};
dojo.date.dateParts={YEAR:0,MONTH:1,DAY:2,HOUR:3,MINUTE:4,SECOND:5,MILLISECOND:6,QUARTER:7,WEEK:8,WEEKDAY:9};
dojo.date.add=function(dt,_1164,incr){
if(typeof dt=="number"){
dt=new Date(dt);
}
function fixOvershoot(){
if(sum.getDate()<dt.getDate()){
sum.setDate(0);
}
}
var sum=new Date(dt);
with(dojo.date.dateParts){
switch(_1164){
case YEAR:
sum.setFullYear(dt.getFullYear()+incr);
fixOvershoot();
break;
case QUARTER:
incr*=3;
case MONTH:
sum.setMonth(dt.getMonth()+incr);
fixOvershoot();
break;
case WEEK:
incr*=7;
case DAY:
sum.setDate(dt.getDate()+incr);
break;
case WEEKDAY:
var dat=dt.getDate();
var weeks=0;
var days=0;
var strt=0;
var trgt=0;
var adj=0;
var mod=incr%5;
if(mod==0){
days=(incr>0)?5:-5;
weeks=(incr>0)?((incr-5)/5):((incr+5)/5);
}else{
days=mod;
weeks=parseInt(incr/5);
}
strt=dt.getDay();
if(strt==6&&incr>0){
adj=1;
}else{
if(strt==0&&incr<0){
adj=-1;
}
}
trgt=(strt+days);
if(trgt==0||trgt==6){
adj=(incr>0)?2:-2;
}
sum.setDate(dat+(7*weeks)+days+adj);
break;
case HOUR:
sum.setHours(sum.getHours()+incr);
break;
case MINUTE:
sum.setMinutes(sum.getMinutes()+incr);
break;
case SECOND:
sum.setSeconds(sum.getSeconds()+incr);
break;
case MILLISECOND:
sum.setMilliseconds(sum.getMilliseconds()+incr);
break;
default:
break;
}
}
return sum;
};
dojo.date.diff=function(dtA,dtB,_1170){
if(typeof dtA=="number"){
dtA=new Date(dtA);
}
if(typeof dtB=="number"){
dtB=new Date(dtB);
}
var _1171=dtB.getFullYear()-dtA.getFullYear();
var _1172=(dtB.getMonth()-dtA.getMonth())+(_1171*12);
var _1173=dtB.getTime()-dtA.getTime();
var _1174=_1173/1000;
var _1175=_1174/60;
var _1176=_1175/60;
var _1177=_1176/24;
var _1178=_1177/7;
var delta=0;
with(dojo.date.dateParts){
switch(_1170){
case YEAR:
delta=_1171;
break;
case QUARTER:
var mA=dtA.getMonth();
var mB=dtB.getMonth();
var qA=Math.floor(mA/3)+1;
var qB=Math.floor(mB/3)+1;
qB+=(_1171*4);
delta=qB-qA;
break;
case MONTH:
delta=_1172;
break;
case WEEK:
delta=parseInt(_1178);
break;
case DAY:
delta=_1177;
break;
case WEEKDAY:
var days=Math.round(_1177);
var weeks=parseInt(days/7);
var mod=days%7;
if(mod==0){
days=weeks*5;
}else{
var adj=0;
var aDay=dtA.getDay();
var bDay=dtB.getDay();
weeks=parseInt(days/7);
mod=days%7;
var _1184=new Date(dtA);
_1184.setDate(_1184.getDate()+(weeks*7));
var _1185=_1184.getDay();
if(_1177>0){
switch(true){
case aDay==6:
adj=-1;
break;
case aDay==0:
adj=0;
break;
case bDay==6:
adj=-1;
break;
case bDay==0:
adj=-2;
break;
case (_1185+mod)>5:
adj=-2;
break;
default:
break;
}
}else{
if(_1177<0){
switch(true){
case aDay==6:
adj=0;
break;
case aDay==0:
adj=1;
break;
case bDay==6:
adj=2;
break;
case bDay==0:
adj=1;
break;
case (_1185+mod)<0:
adj=2;
break;
default:
break;
}
}
}
days+=adj;
days-=(weeks*2);
}
delta=days;
break;
case HOUR:
delta=_1176;
break;
case MINUTE:
delta=_1175;
break;
case SECOND:
delta=_1174;
break;
case MILLISECOND:
delta=_1173;
break;
default:
break;
}
}
return Math.round(delta);
};
dojo.provide("ws.date");
ws.date=dojo.date;
ws.date.firstDayOfWeek=Config.FirstDayOfWeek;
ws.date.RFC2445=Config.Strings.DateRFC2445;
ws.date.RFC2445WithTime=Config.Strings.DateRFC2445WithTime;
ws.date.months=[Config.Strings.January,Config.Strings.February,Config.Strings.March,Config.Strings.April,Config.Strings.May,Config.Strings.June,Config.Strings.July,Config.Strings.August,Config.Strings.September,Config.Strings.October,Config.Strings.November,Config.Strings.December];
ws.date.shortMonths=[Config.Strings.Jan,Config.Strings.Feb,Config.Strings.Mar,Config.Strings.Apr,Config.Strings.ShortMay,Config.Strings.Jun,Config.Strings.Jul,Config.Strings.Aug,Config.Strings.Sep,Config.Strings.Oct,Config.Strings.Nov,Config.Strings.Dec];
ws.date.days=[Config.Strings.Sunday,Config.Strings.Monday,Config.Strings.Tuesday,Config.Strings.Wednesday,Config.Strings.Thursday,Config.Strings.Friday,Config.Strings.Saturday];
ws.date.shortDays=[Config.Strings.Sun,Config.Strings.Mon,Config.Strings.Tue,Config.Strings.Wed,Config.Strings.Thu,Config.Strings.Fri,Config.Strings.Sat];
ws.date.monthNames=ws.date.months.concat(ws.date.shortMonths);
ws.date.dayNames=ws.date.days.concat(ws.date.shortDays);
ws.date.abbrevDays=[Config.Strings.AbbSunday,Config.Strings.AbbMonday,Config.Strings.AbbTuesday,Config.Strings.AbbWednesday,Config.Strings.AbbThursday,Config.Strings.AbbFriday,Config.Strings.AbbSaturday];
ws.date.amAbb=Config.Strings.Date_am;
ws.date.pmAbb=Config.Strings.Date_pm;
ws.date.kEmptyDate=null;
ws.date.MONTH_LENGTH=[31,28,31,30,31,30,31,31,30,31,30,31];
ws.date.LEAP_MONTH_LENGTH=[31,29,31,30,31,30,31,31,30,31,30,31];
ws.date.add=function(d,unit,_1188){
var n=_1188;
var v;
switch(unit){
case ws.date.dateParts.YEAR:
v=new Date(d.getFullYear()+n,d.getMonth(),d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds(),d.getMilliseconds());
break;
case ws.date.dateParts.MONTH:
v=new Date(d.getFullYear(),d.getMonth()+n,d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds(),d.getMilliseconds());
break;
case ws.date.dateParts.HOUR:
v=new Date(d.getFullYear(),d.getMonth(),d.getDate(),d.getHours()+n,d.getMinutes(),d.getSeconds(),d.getMilliseconds());
break;
case ws.date.dateParts.MINUTE:
v=new Date(d.getTime()+(n*60000));
break;
case ws.date.dateParts.SECOND:
v=new Date(d.getFullYear(),d.getMonth(),d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds()+n,d.getMilliseconds());
break;
case ws.date.dateParts.MILLISECOND:
v=new Date(d.getFullYear(),d.getMonth(),d.getDate(),d.getHours(),d.getMinutes(),d.getSeconds(),d.getMilliseconds()+n);
break;
default:
v=new Date(d.getFullYear(),d.getMonth(),d.getDate()+n,d.getHours(),d.getMinutes(),d.getSeconds(),d.getMilliseconds());
}
return v;
};
ws.date.getFirstDayOfWeek=function(date){
var _118c=date.getDay();
var _118d=_118c-ws.date.firstDayOfWeek;
if(_118d<0){
_118d+=7;
}
var _118e=ws.date.add(date,ws.date.dateParts.DAY,-_118d);
return _118e;
};
ws.date.getLastDayOfWeek=function(date){
var _1190=date.getDay();
var _1191=((ws.date.firstDayOfWeek-_1190)+6)%7;
var _1192=ws.date.add(date,ws.date.dateParts.DAY,_1191);
return _1192;
};
ws.date.getFirstDayInMonthView=function(date){
var _1194=new Date(date.getFullYear(),date.getMonth(),1);
var _1195=ws.date.getFirstDayOfWeek(_1194);
return _1195;
};
ws.date.getLastDayInMonthView=function(date){
var _1197=ws.date.getFirstDayInMonthView(date);
var _1198=ws.date.add(_1197,ws.date.dateParts.DAY,41);
return _1198;
};
ws.date.getPreviousMonth=function(date){
var _119a=ws.date.add(date,ws.date.dateParts.DAY,-date.getDate());
return _119a;
};
ws.date.getNextMonth=function(date){
var _119c=ws.date.getDaysInMonth(date);
var _119d=new Date(date.getFullYear(),date.getMonth(),1);
var _119e=ws.date.add(_119d,ws.date.dateParts.DAY,_119c);
return _119e;
};
ws.date.daysSpanned=function(date1,date2){
var _11a1=date1.getTimezoneOffset()*60000;
var _11a2=date2.getTimezoneOffset()*60000;
var t1=date1.getTime()-_11a1;
var t2=date2.getTime()-_11a2;
var _11a5=Math.floor(t2/86400000)-Math.floor(t1/86400000);
return _11a5;
};
ws.date.shortestDate=function(date){
var fmt;
var now=new Date();
var _11a9=now.getDate();
var _11aa=now.getMonth();
var _11ab=now.getYear();
var then=new Date(date);
var _11ad=then.getDate();
var _11ae=then.getMonth();
var _11af=then.getYear();
var _11b0=new Date(_11ab,_11aa,_11a9);
var _11b1=new Date(_11af,_11ae,_11ad);
var _11b2=dojo.date.diff(_11b1,_11b0,dojo.date.dateParts.DAY);
if(_11b2==0){
return Config.Strings.Today+" "+ws.date.formatDateTime(then,Config.Strings.DateToday);
}else{
if(_11b2==1){
return Config.Strings.Yesterday+" "+ws.date.formatDateTime(then,Config.Strings.DateToday);
}else{
if(_11b2<7){
return ws.date.formatDateTime(then,Config.Strings.DateWeek);
}else{
if(_11ab==_11af){
return ws.date.formatDateTime(then,Config.Strings.DateThisYear);
}else{
return ws.date.formatDateTime(then,Config.Strings.DateYear);
}
}
}
}
};
ws.date.timeAgo=function(date){
var fmt;
var now=new Date();
var then=new Date(date);
var _11b7=(now-then)/1000;
var _11b8=Math.round(_11b7/60);
var _11b9=Math.floor(_11b7/86400);
if(_11b7<60){
return ws.string.substituteParams(Config.Strings.TimeAgo_NSeconds,Math.round(_11b7));
}else{
if(_11b8==1){
return Config.Strings.TimeAgo_OneMinute;
}else{
if(_11b7<3600){
return ws.string.substituteParams(Config.Strings.TimeAgo_NMinutes,_11b8);
}else{
if(_11b7<5400){
return Config.Strings.TimeAgo_OneHour;
}else{
if(_11b9==0&&(now.getDate()==then.getDate())){
return ws.string.substituteParams(Config.Strings.TimeAgo_NHours,Math.round(_11b7/3600));
}else{
if(_11b9<=1){
return Config.Strings.TimeAgo_OneDay;
}else{
if(_11b9<=7){
return ws.string.substituteParams(Config.Strings.TimeAgo_NDays,_11b9);
}else{
if(now.getYear()==then.getYear()){
return ws.date.formatDateTime(then,Config.Strings.TimeAgo_ThisYearDate);
}else{
return ws.date.formatDateTime(then,Config.Strings.TimeAgo_PreviousYearDate);
}
}
}
}
}
}
}
}
};
ws.date.readableDuration=function(_11ba){
if(_11ba<60){
return Math.round(_11ba)+Config.Strings.SecondsAbbrev;
}
var _11bb=[];
if(_11ba>=86400){
var days=Math.round(_11ba/86400);
_11bb.push(days+Config.Strings.DaysAbbrev);
_11ba%=86400;
}
if(_11ba>=3600){
var hours=Math.round(_11ba/3600);
_11bb.push(hours+Config.Strings.HoursAbbrev);
_11ba%=3600;
}
if(_11ba>=60){
var _11be=Math.round(_11ba/60);
_11bb.push(_11be+Config.Strings.MinutesAbbrev);
_11ba%=60;
}
return _11bb.join(" ");
};
ws.date.formatISO8601=function(date){
var M=date.getMonth()+1;
var d=date.getDate();
var H=date.getHours();
var m=date.getMinutes();
var s=date.getSeconds();
var _11c5=""+date.getFullYear()+((M<0||M>9)?M:"0"+M)+((d<0||d>9)?d:"0"+d)+"T"+((H<0||H>9)?H:"0"+H)+((m<0||m>9)?m:"0"+m)+((s<0||s>9)?s:"0"+s);
return _11c5;
};
ws.date.formatRFC2445=function(date){
var M=date.getMonth()+1;
var d=date.getDate();
var _11c9=""+date.getFullYear()+((M<0||M>9)?M:"0"+M)+((d<0||d>9)?d:"0"+d);
return _11c9;
};
ws.date.formatRFC2445WithTime=function(date){
var M=date.getMonth()+1;
var d=date.getDate();
var H=date.getHours();
var m=date.getMinutes();
var s=date.getSeconds();
var _11d0=""+date.getFullYear()+((M<0||M>9)?M:"0"+M)+((d<0||d>9)?d:"0"+d)+((H<0||H>9)?H:"0"+H)+((m<0||m>9)?m:"0"+m)+((s<0||s>9)?s:"0"+s);
return _11d0;
};
ws.date.formatDateTime=function(date,_11d2){
var y=date.getFullYear()+"";
var M=date.getMonth()+1;
var d=date.getDate();
var E=date.getDay();
var H=date.getHours();
var m=date.getMinutes();
var s=date.getSeconds();
var value=new Object();
value["y"]=y;
value["yyyy"]=y;
value["yy"]=y.substring(2,4);
value["M"]=M;
value["MM"]=(M<0||M>9)?M:"0"+M;
value["MMM"]=ws.date.monthNames[M-1];
value["NNN"]=ws.date.monthNames[M+11];
value["d"]=d;
value["dd"]=(d<0||d>9)?d:"0"+d;
value["E"]=ws.date.dayNames[E+7];
value["EE"]=ws.date.dayNames[E];
value["H"]=H;
value["HH"]=(H<0||H>9)?H:"0"+H;
if(H==0){
value["h"]=12;
}else{
if(H>12){
value["h"]=H-12;
}else{
value["h"]=H;
}
}
value["hh"]=(value["h"]<0||value["h"]>9)?value["h"]:"0"+value["h"];
if(H>11){
value["K"]=H-12;
}else{
value["K"]=H;
}
value["k"]=H+1;
value["KK"]=(value["K"]<0||value["K"]>9)?value["K"]:"0"+value["K"];
value["kk"]=(value["k"]<0||value["k"]>9)?value["k"]:"0"+value["k"];
if(H>11){
value["a"]=ws.date.pmAbb;
}else{
value["a"]=ws.date.amAbb;
}
value["m"]=m;
value["mm"]=(m<0||m>9)?m:"0"+m;
value["s"]=s;
value["ss"]=(s<0||s>9)?s:"0"+s;
var _11db="";
var _11dc=_11d2.split("");
var _11dd=0;
var c=null;
var token=null;
while(_11dd<_11d2.length){
c=_11dc[_11dd];
token="";
while((_11dc[_11dd]==c)&&(_11dd<_11dc.length)){
token+=_11dc[_11dd++];
}
if(value[token]!=null){
_11db=_11db+value[token];
}else{
_11db=_11db+token;
}
}
return _11db;
};
ws.date.formatTime=function(date,_11e1,_11e2){
var H=date.getHours();
var m=date.getMinutes();
var s=date.getSeconds();
var value=new Object();
value["H"]=H;
value["HH"]=(H<0||H>9)?H:"0"+H;
if(H==0){
value["h"]=12;
}else{
if(H>12){
value["h"]=H-12;
}else{
value["h"]=H;
}
}
value["hh"]=(value["h"]<0||value["h"]>9)?value["h"]:"0"+value["h"];
if(H>11){
value["K"]=H-12;
}else{
value["K"]=H;
}
value["k"]=H+1;
value["KK"]=(value["K"]<0||value["K"]>9)?value["K"]:"0"+value["K"];
value["kk"]=(value["k"]<0||value["k"]>9)?value["k"]:"0"+value["k"];
if(H>11){
value["a"]=ws.date.pmAbb;
}else{
value["a"]=ws.date.amAbb;
}
value["m"]=m;
value["mm"]=(m<0||m>9)?m:"0"+m;
value["s"]=s;
value["ss"]=(s<0||s>9)?s:"0"+s;
var f=_11e1;
if(_11e2&&(m==0)){
f=_11e2;
}
var _11e8="";
var _11e9=f.split("");
var _11ea=0;
var c=null;
var token=null;
while(_11ea<f.length){
c=_11e9[_11ea];
token="";
while((_11e9[_11ea]==c)&&(_11ea<_11e9.length)){
token+=_11e9[_11ea++];
}
if(value[token]!=null){
_11e8=_11e8+value[token];
}else{
_11e8=_11e8+token;
}
}
return _11e8;
};
ws.date.formatMinutes=function(_11ed,_11ee,_11ef){
_11ed=_11ed%1440;
var H=Math.floor(_11ed/60);
var m=_11ed-(H*60);
var value=new Object();
value["H"]=H;
value["HH"]=(H<0||H>9)?H:"0"+H;
if(H==0){
value["h"]=12;
}else{
if(H>12){
value["h"]=H-12;
}else{
value["h"]=H;
}
}
value["hh"]=(value["h"]<0||value["h"]>9)?value["h"]:"0"+value["h"];
if(H>11){
value["K"]=H-12;
}else{
value["K"]=H;
}
value["k"]=H+1;
value["KK"]=(value["K"]<0||value["K"]>9)?value["K"]:"0"+value["K"];
value["kk"]=(value["k"]<0||value["k"]>9)?value["k"]:"0"+value["k"];
if(H>11){
value["a"]=ws.date.pmAbb;
}else{
value["a"]=ws.date.amAbb;
}
value["m"]=m;
value["mm"]=(m<0||m>9)?m:"0"+m;
var f=_11ee;
if(_11ef&&(m==0)){
f=_11ef;
}
var _11f4="";
var _11f5=f.split("");
var _11f6=0;
var c=null;
var token=null;
while(_11f6<f.length){
c=_11f5[_11f6];
token="";
while((_11f5[_11f6]==c)&&(_11f6<_11f5.length)){
token+=_11f5[_11f6++];
}
if(value[token]!=null){
_11f4=_11f4+value[token];
}else{
_11f4=_11f4+token;
}
}
return _11f4;
};
ws.date.IsInteger=function(val){
var _11fa="1234567890";
for(var i=0;i<val.length;i++){
if(_11fa.indexOf(val.charAt(i))==-1){
return false;
}
}
return true;
};
ws.date.GetInt=function(str,i,_11fe,_11ff){
for(var x=_11ff;x>=_11fe;x--){
var token=str.substring(i,i+x);
if(token.length<_11fe){
return null;
}
if(ws.date.IsInteger(token)){
return token;
}
}
return null;
};
ws.date.GetDateFromFormat=function(val,_1203){
val=val+"";
_1203=_1203+"";
var i_val=0;
var _1205=0;
var c="";
var token="";
var _1208="";
var x,y;
var now=new Date();
var year=now.getYear();
var month=now.getMonth()+1;
var date=1;
var hh=now.getHours();
var mm=now.getMinutes();
var ss=now.getSeconds();
var ampm="";
while(_1205<_1203.length){
c=_1203.charAt(_1205);
token="";
while((_1203.charAt(_1205)==c)&&(_1205<_1203.length)){
token+=_1203.charAt(_1205++);
}
if(token=="yyyy"||token=="yy"||token=="y"){
if(token=="yyyy"){
x=4;
y=4;
}
if(token=="yy"){
x=2;
y=2;
}
if(token=="y"){
x=2;
y=4;
}
year=ws.date.GetInt(val,i_val,x,y);
if(year==null){
return 0;
}
i_val+=year.length;
if(year.length==2){
if(year>70){
year=1900+(year-0);
}else{
year=2000+(year-0);
}
}
}else{
if(token=="MM"||token=="M"){
month=ws.date.GetInt(val,i_val,token.length,2);
if(month==null||(month<1)||(month>12)){
return 0;
}
i_val+=month.length;
}else{
if(token=="dd"||token=="d"){
date=ws.date.GetInt(val,i_val,token.length,2);
if(date==null||(date<1)||(date>31)){
return 0;
}
i_val+=date.length;
}else{
if(token=="hh"||token=="h"){
hh=ws.date.GetInt(val,i_val,token.length,2);
if(hh==null||(hh<1)||(hh>12)){
return 0;
}
i_val+=hh.length;
}else{
if(token=="HH"||token=="H"){
hh=ws.date.GetInt(val,i_val,token.length,2);
if(hh==null||(hh<0)||(hh>23)){
return 0;
}
i_val+=hh.length;
}else{
if(token=="KK"||token=="K"){
hh=ws.date.GetInt(val,i_val,token.length,2);
if(hh==null||(hh<0)||(hh>11)){
return 0;
}
i_val+=hh.length;
}else{
if(token=="kk"||token=="k"){
hh=ws.date.GetInt(val,i_val,token.length,2);
if(hh==null||(hh<1)||(hh>24)){
return 0;
}
i_val+=hh.length;
hh--;
}else{
if(token=="mm"||token=="m"){
mm=ws.date.GetInt(val,i_val,token.length,2);
if(mm==null||(mm<0)||(mm>59)){
return 0;
}
i_val+=mm.length;
}else{
if(token=="ss"||token=="s"){
ss=ws.date.GetInt(val,i_val,token.length,2);
if(ss==null||(ss<0)||(ss>59)){
return 0;
}
i_val+=ss.length;
}else{
if(token=="a"){
if(val.substring(i_val,i_val+2).toLowerCase()=="am"){
ampm="AM";
}else{
if(val.substring(i_val,i_val+2).toLowerCase()=="pm"){
ampm="PM";
}else{
return 0;
}
}
i_val+=2;
}else{
if(val.substring(i_val,i_val+token.length)!=token){
return 0;
}else{
i_val+=token.length;
}
}
}
}
}
}
}
}
}
}
}
}
if(i_val!=val.length){
return 0;
}
if(month==2){
if(((year%4==0)&&(year%100!=0))||(year%400==0)){
if(date>29){
return 0;
}
}else{
if(date>28){
return 0;
}
}
}
if((month==4)||(month==6)||(month==9)||(month==11)){
if(date>30){
return 0;
}
}
if(hh<12&&ampm=="PM"){
hh=hh-0+12;
}else{
if(hh>11&&ampm=="AM"){
hh-=12;
}
}
var _1213=new Date(year,month-1,date,hh,mm,ss);
return _1213.getTime();
};
ws.date.ParseDate=function(val){
var _1215=(arguments.length==2)?arguments[1]:false;
generalFormats=new Array("y-M-d","MMM d, y","MMM d,y","y-MMM-d","d-MMM-y","MMM d");
monthFirst=new Array("M/d/y","M-d-y","M.d.y","MMM-d","M/d","M-d");
dateFirst=new Array("d/M/y","d-M-y","d.M.y","d-MMM","d/M","d-M");
var _1216=new Array("generalFormats",_1215?"dateFirst":"monthFirst",_1215?"monthFirst":"dateFirst");
var d=null;
for(var i=0;i<_1216.length;i++){
var l=window[_1216[i]];
for(var j=0;j<l.length;j++){
d=ws.date.GetDateFromFormat(val,l[j]);
if(d!=0){
return new Date(d);
}
}
}
return null;
};
ws.date.ParseDateFromFormat=function(val,_121c){
var _121d=null;
try{
_121d=new Date(ws.date.GetDateFromFormat(val,_121c));
if(_121d==null||_121d.getFullYear()<=1970){
_121d=null;
}
}
catch(ex){
_121d=null;
}
return _121d;
};
ws.date.ParseTimeFromFormat=function(_121e,_121f){
var _1220=null;
var today=new Date();
var y=today.getYear()+1900;
var m=today.getMonth()+1;
var d=today.getDate();
var val=m+"/"+d+"/"+y;
var _1226="M/d/yyyy";
var _1227=val+" "+_121e;
var _1228=_1226+" "+_121f;
return ws.date.ParseDateFromFormat(_1227,_1228);
};
ws.date.ParseHourMinTextField=function(_1229,_122a,_122b){
var hr=0;
var min=0;
var _122e=false;
var ret=[];
var _1230=ws.date.ParseTimeFromFormat(_1229,_122a);
if(_1230==null){
_122e=true;
}else{
hr=_1230.getHours();
min=_1230.getMinutes();
}
if(_122e){
_1230=ws.date.ParseTimeFromFormat(_1229,_122b);
if(_1230!=null){
hr=_1230.getHours();
min=0;
}
}
if(_1230==null){
return null;
}
ret.hr=hr;
ret.min=min;
return ret;
};
ws.date.GetPreviousWeekDate=function(aDate){
var _1232=ws.date.add(aDate,ws.date.dateParts.DAY,-7);
return _1232;
};
ws.date.GetNextWeekDate=function(aDate){
var _1234=ws.date.add(aDate,ws.date.dateParts.DAY,7);
return _1234;
};
ws.date.GetFirstDayInWeek=function(date,_1236){
var _1237=date.getDay();
var _1238=_1237-_1236;
if(_1238<0){
_1238+=7;
}
var _1239=ws.date.add(date,ws.date.dateParts.DAY,-_1238);
return _1239;
};
ws.date.GetLastDayInWeek=function(date,_123b){
var _123c=date.getDay();
var _123d=((_123b-_123c)+6)%7;
var _123e=ws.date.add(date,ws.date.dateParts.DAY,_123d);
return _123e;
};
ws.date.IsValidDate=function(date){
return ((date!=ws.date.kEmptyDate)&&date.getTime);
};
ws.date.TimeRangeFormatter=function(_1240,cEnd,_1242,_1243,_1244){
if(_1242||!ws.date.IsValidDate(_1240)){
return "";
}
var _1245;
var _1246=ws.date.formatDateTime(_1240,(_1240.getMinutes()>0?_1243:_1244));
if(!ws.date.IsValidDate(cEnd)||(_1240.getTime()==cEnd.getTime())){
_1245=_1246;
}else{
var sEnd=ws.date.formatDateTime(cEnd,(cEnd.getMinutes()>0?_1243:_1244));
_1245=_1246+"-"+sEnd;
}
return _1245;
};
ws.date.FormatTimeRange=function(start,end,_124a,_124b,_124c){
var _124d=ws.date.TimeRangeFormatter(start,end,_124a,_124b,_124c);
if(_124d){
_124d=_124d.toLowerCase();
}
return _124d;
};
ws.date.IsLeapYear=function(year){
return (year%4==0)&&((year%100!=0)||(year%400==0));
};
ws.date.GetDaysInMonth=function(year,month){
return ws.date.IsLeapYear(year)?ws.date.LEAP_MONTH_LENGTH[month]:ws.date.MONTH_LENGTH[month];
};
ws.date.incrementMonth=function(aDate){
var _1252=aDate.getDate();
var _1253=new Date(aDate.getFullYear(),aDate.getMonth()+1,1);
var _1254=ws.date.GetDaysInMonth(_1253.getFullYear(),_1253.getMonth());
if(_1252<=_1254){
_1253.setDate(_1252);
}else{
_1253.setDate(_1254);
}
return _1253;
};
dojo.provide("ws.calendar.calutil");
ws.calendar.calutil={LocalPopulateCalendarListFromCalArray:function(_1255,_1256,_1257,_1258){
if(_1255!=null&&_1255.length>0){
var i=0;
var _125a=(_1257!=null);
var opts=[];
for(i=0;i<_1255.length;i++){
var _125c=_1255[i];
var calid=_125c[_1256.id];
var _125e=_125c[_1256.displayName];
if(!_125a){
opts.push({display:_125e,value:calid,selected:0==i});
}else{
opts.push({display:_125e,value:calid,selected:calid==_1257});
}
_1258.setOptions(opts);
}
}
},GetDefaultCalid:function(_125f){
var calID=ws.UserContext.UserScreenName;
if(_125f==0){
userID+="^0";
}else{
userID+="^1";
}
return userID;
},DecodeHTMLEntities:function(data){
var _1262=data.match(/&#\d+;?/g);
var len=(_1262)?_1262.length:0;
for(var i=0;i<len;i++){
var _1265=String.fromCharCode((_1262[i]).replace(/\D/g,""));
data=data.replace(/&#\d+;?/,_1265);
}
return data;
},DecodeHTML:function(s){
if(s==null){
return null;
}
var d=s;
d=d.replace(/&#38;|&amp;/g,"&");
d=d.replace(/&#60;|&lt;/g,"<");
d=d.replace(/&#62;|&gt;/g,">");
d=d.replace(/&#34;|&quot;/g,"\"");
d=d.replace(/&#39;|&apos;/g,"'");
d=d.replace(/\\x2f/g,"/");
return d;
},GetNext30MinuteIncrement:function(date){
if(date.getMinutes()<30){
date.setMinutes(30);
}else{
date=ws.date.add(date,ws.date.dateParts.HOUR,1);
date.setMinutes(0);
}
return date;
},GetTimezoneInfo:function(){
var temp;
var now=new Date();
var _126b=new Date(now.getFullYear(),0,1,0,0,0,0);
var _126c=new Date(now.getFullYear(),6,1,0,0,0,0);
var _126d=_126b.getTimezoneOffset();
var _126e=_126c.getTimezoneOffset();
var _126f=ws.string.substituteParams("{0}|{1}",(-_126d),(-_126e));
return _126f;
},GetTimezoneInfoInObject:function(){
var temp;
var now=new Date();
var _1272=new Date(now.getFullYear(),0,1,0,0,0,0);
var _1273=new Date(now.getFullYear(),6,1,0,0,0,0);
var _1274=_1272.getTimezoneOffset();
var _1275=_1273.getTimezoneOffset();
var obj=new Object;
obj.winterOffset=-_1274;
obj.summerOffset=-_1275;
return obj;
},ConvertTimeZoneStringToTZID:function(_1277){
var _1277="";
var obj=this.GetTimezoneInfoInObject();
if(obj!=null){
var _1279=obj.winterOffset;
var _127a=obj.summerOffset;
if(_1279==-480&&_127a==-420){
_1277="America/Los_Angeles";
}else{
if(_1279==-420&&_127a==-360){
_1277="America/Denver";
}else{
if(_1279==-360&&_127a==-300){
_1277="America/Chicago";
}else{
if(_1279==-300&&_127a==-240){
_1277="America/New_York";
}else{
if(_1279==-420&&_127a==-420){
_1277="America/Phoenix";
}else{
if(_1279==-300&&_127a==-300){
_1277="America/Indianapolis";
}else{
if(_1279==-540&&_127a==-480){
_1277="America/Anchorage";
}else{
if(_1279==-600&&_127a==-600){
_1277="Pacific/Honolulu";
}
}
}
}
}
}
}
}
}
return _1277;
}};
dojo.provide("ws.calendar.CalendarViewModel");
dojo.require("dojo.io");
dojo.declare("ws.calendar.CalendarViewModel",null,{initializer:function(){
this.dtstart=null;
this.dtend=null;
this.today=null;
this.totalItems=0;
this.totalMatchingFilter=0;
this.sortBy=null;
this.sortDir=null;
this.isSuccess=false;
this.searchStr=null;
this.currentServerTime=new Date();
this.isDummyCalendarAccount=false;
this.calendars=null;
this.components=null;
this.index=null;
this.dayBucketIndex=null;
this.calendarEnum=null;
this.componentEnum=null;
this.indexEnum=null;
this.loadDataInProgress=false;
dojo.event.topic.subscribe("CalendarViewModel/modelUpdated",this,"doModelUpdated");
dojo.event.topic.subscribe("SettingsChanged/Calendar",this,"requestUpdate");
dojo.event.topic.subscribe("EditCalendar/Delete",this,"requestUpdate");
},setDummyTZID:function(){
var ret=null;
if(this.isDummyCalendarAccount){
ret=ws.calendar.calutil.ConvertTimeZoneStringToTZID();
}
return ret;
},getDefaultArgs:function(_127c,enums){
var args={calendars:true,components:true,index:false,dayBucketIndex:true,enums:(!this.calendarEnum)?true:false,dtstart:(!this.dtstart)?null:ws.date.formatISO8601(this.dtstart),dtend:(!this.dtend)?null:ws.date.formatISO8601(this.dtend),sortBy:this.sortBy,sortDir:this.sortDir};
if(_127c!=null&&_127c){
args.index=true;
}
if(enums!=null&&enums){
args.enums=true;
}
args.dummyTZID=this.setDummyTZID();
return args;
},getDefaultTaskArgs:function(){
var args={compType:"Todo",calendars:true,components:true,index:true,dayBucketIndex:false,enums:true,dtstart:null,dtend:null,sortBy:null,sortDir:null};
args.dummyTZID=this.setDummyTZID();
return args;
},searchUpdated:function(){
},getSearchArgsHelper:function(_1280,_1281,_1282,_1283){
var args={calendars:true,components:true,index:true,dayBucketIndex:true,enums:(!this.calendarEnum)?true:false,dtstart:(!this.dtstart)?null:ws.date.formatISO8601(this.dtstart),dtend:(!this.dtend)?null:ws.date.formatISO8601(this.dtend),search:_1280,searchIn:_1281,sortBy:_1282,sortDir:_1283};
args.dummyTZID=this.setDummyTZID();
this.searchStr=_1280;
this.searchUpdated();
return args;
},getSearchArgs:function(_1285,_1286){
return this.getSearchArgsHelper(_1285,_1286,this.sortBy,this.sortDir);
},setSortData:function(_1287,_1288){
var _1289=this.getSearchArgsHelper(this.searchStr,null,_1287,_1288);
this.getData(_1289);
},setSearchStr:function(str,force){
if((force==null||!force)&&(str==this.searchStr)){
return;
}
this.searchStr=str;
var _128c=this.getSearchArgs(this.searchStr);
this.getData(_128c);
},getSearchString:function(){
return this.searchStr;
},getDefaultCalendarArgs:function(){
var args=this.getDefaultArgs();
var count=this.getCalendarList().length;
var _128f="New Calendar";
while(this.calendars[_128f+count]){
count++;
}
args.displayName=_128f+count;
args.selected=true;
return args;
},getCalendarArgs:function(_1290,_1291){
var args=this.getDefaultArgs(_1291);
for(var field in this.calendarEnum){
switch(field){
case "calType":
case "compType":
case "creatorType":
var f=_1290[this.calendarEnum[field]];
if(f){
args[field]=f.toString();
}
break;
case "writable":
case "selected":
case "syncable":
case "worldReadable":
case "birthdayCal":
args[field]=_1290[this.calendarEnum[field]]?true:false;
break;
default:
args[field]=_1290[this.calendarEnum[field]];
break;
}
}
return args;
},getDefaultComponentArgs:function(_1295){
var args=this.getDefaultArgs(_1295);
args.start=ws.date.formatISO8601(new Date());
args.allDay=true;
args.summary="Appointment";
return args;
},getComponentArgs:function(_1297){
var args=this.getDefaultArgs();
for(var field in this.componentEnum){
switch(field){
case "allDay":
case "reminderEnabled":
args[field]=_1297[this.componentEnum[field]]?true:false;
break;
case "start":
case "recurEnd":
case "end":
var d=_1297[this.componentEnum[field]];
if(d){
args[field]=ws.date.formatISO8601(d);
}
break;
case "compType":
case "recurType":
var f=_1297[this.componentEnum[field]];
if(f){
args[field]=f.toString();
}
break;
default:
args[field]=_1297[this.componentEnum[field]];
break;
}
}
return args;
},getComponentArgsForTask:function(_129c){
var args=this.getComponentArgs(_129c);
args.compType="Todo";
args.calendars=true;
args.components=true;
args.index=true;
args.dayBucketIndex=false;
args.enums=true;
args.sortBy=null;
args.sortDir=null;
return args;
},getDataSettingsChanged:function(){
this.needsRepaint=true;
var _129e=false;
if(this.retrieveIndexOnGetDataCB!=null){
_129e=this.retrieveIndexOnGetDataCB();
}
this.getData(null,_129e,true);
},getData:function(args,_12a0,enums){
if(!args){
args=this.getDefaultArgs(_12a0,enums);
}
this.loadDataInProgress=true;
ws.io.rpc({action:"GetCalendarData",content:args,load:dojo.lang.hitch(this,function(data){
this.processResponse(data);
}),error:function(err){
this.loadDataInProgress=false;
ws.widget.OkCancelDialog.alert(Config.Strings.Cal_ServiceTemporarilyUnavailable);
}});
},saveCalendar:function(args){
if(!args){
args=this.getDefaultCalendarArgs();
}
this.loadDataInProgress=true;
ws.io.rpc({action:"SaveCalendar",content:args,load:dojo.lang.hitch(this,function(data){
this.processResponse(data,true);
if(args.loadCallback){
args.loadCallback();
}
}),error:function(err){
this.loadDataInProgress=false;
if(!args.id){
ws.widget.OkCancelDialog.alert(ws.string.substituteParams(Config.Strings.CalendarAddedError,args.displayName));
}else{
if(args.showNotification){
ws.widget.OkCancelDialog.alert(ws.string.substituteParams(Config.Strings.CalendarUpdatedError,args.displayName));
}
}
if(args.errorCallback){
args.errorCallback();
}
}});
},deleteCalendar:function(args){
if(!args||!args.id){
return;
}
this.loadDataInProgress=true;
ws.io.rpc({action:"DeleteCalendar",content:args,load:dojo.lang.hitch(this,function(data){
this.processResponse(data,true);
if(args.loadCallback){
args.loadCallback();
}
}),error:function(err){
dojo.event.topic.publish("WSFeedbackEnd",Config.Strings.Loading);
this.loadDataInProgress=false;
ws.widget.OkCancelDialog.alert(ws.string.substituteParams(Config.Strings.CalendarDeletedError,args.displayName));
if(args.errorCallback){
args.errorCallback();
}
}});
},saveComponent:function(args,_12ab){
if(!args){
args=this.getDefaultComponentArgs(_12ab);
}
if(_12ab&&!(dojo.string.isBlank(this.searchStr))){
args.search=this.searchStr;
args.searchIn=null;
args.sortBy=this.sortBy;
args.sortDir=this.sortDir;
args.ignoreCache=true;
}
this.loadDataInProgress=true;
ws.io.rpc({action:"SaveComponent",content:args,load:dojo.lang.hitch(this,function(data){
this.processResponse(data,true);
if(args.loadCallback){
args.loadCallback();
}
}),error:function(err){
this.loadDataInProgress=false;
ws.widget.OkCancelDialog.alert(Config.Strings.CalServerErrorSaving);
}});
},importFromFile:function(args){
var _12af=args.formNode;
delete args.formNode;
this.loadDataInProgress=true;
ws.io.rpc({action:"CalendarImport",content:args,formNode:_12af,load:args.load,error:args.error});
this.getData();
},doModelUpdated:function(_12b0){
if(_12b0!=this){
this.requestUpdate();
}
},modelUpdated:function(){
},requestUpdate:function(){
},processResponse:function(data,_12b2){
this.loadDataInProgress=false;
this.dtstart=data.dtstart;
this.dtend=data.dtend;
this.today=data.today;
this.totalItems=data.totalItems;
this.totalMatchingFilter=data.totalMatchingFilter;
this.sortBy=data.sortBy;
this.sortDir=data.sortDir;
this.currentServerTime=data.currentServerTime;
this.isSuccess=data.isSuccess;
if(data.calendars){
this.calendars=data.calendars;
}
if(data.components){
this.components=data.components;
}
if(data.index){
this.index=data.index;
}
if(data.dayBucketIndex){
this.dayBucketIndex=data.dayBucketIndex;
}
if(data.calendarEnum){
this.calendarEnum=data.calendarEnum;
}
if(data.componentEnum){
this.componentEnum=data.componentEnum;
}
if(data.indexEnum){
this.indexEnum=data.indexEnum;
}
if(null!==data.isDummyCalendarAccount){
if((true==this.isDummyCalendarAccount)&&(false==data.isDummyCalendarAccount)){
dojo.event.topic.publish("CalendarViewModel/CalendarAccountCreated");
}
this.isDummyCalendarAccount=data.isDummyCalendarAccount;
}
this.modelUpdated();
if(_12b2){
dojo.event.topic.publish("CalendarViewModel/modelUpdated",this);
}
},toggleSelectRow:function(row){
},deleteEvents:function(args){
dojo.debug("CalendarViewModel.deleteEvents");
if(!args){
return;
}
this.loadDataInProgress=true;
ws.io.rpc({action:"DeleteComponent",content:args,load:dojo.lang.hitch(this,function(data){
this.processResponse(data,true);
if(args.loadCallback){
args.loadCallback();
}
}),error:function(err){
this.loadDataInProgress=false;
}});
},calendarComparator:function(a,b){
var aType=a[3];
var bType=b[3];
if((aType==0)&&(bType!=0)){
return -1;
}
if((aType!=0)&&(bType==0)){
return 1;
}
if((aType==1)&&(bType!=1)){
return -1;
}
if((aType!=1)&&(bType==1)){
return 1;
}
var alc=a[2].toLowerCase();
var blc=b[2].toLowerCase();
if(alc<=blc){
return -1;
}else{
return 1;
}
},isLoading:function(){
return !this.isSuccess||this.loadDataInProgress;
},getCalendarList:function(){
var _12bd=[];
var count=0;
if(!this.calendars){
return _12bd;
}
for(var calid in this.calendars){
_12bd[count]=this.calendars[calid];
count++;
}
_12bd.sort(this.calendarComparator);
return _12bd;
}});
dojo.provide("ws.debug");
dojo.declare("ws.debug.latometer",null,{initializer:function(name,start){
this.reset();
this.name=name;
if(start){
this.start();
}
},reset:function(){
this.startTime=0;
this.stopTime=0;
this.duration=0;
this.counter=0;
this.recent=0;
},start:function(){
this.reset();
this.startTime=new Date();
this.stopTime=0;
this.counter=1;
this.recent=0;
},stop:function(_12c2){
var _12c3=-1;
if((this.startTime!=0)&&(this.stopTime==0)){
this.stopTime=new Date();
_12c3=this.stopTime-this.startTime;
this.recent=_12c3;
this.duration+=_12c3;
}
if(_12c2){
this.report();
}
return this.recent;
},resume:function(){
this.startTime=new Date();
this.stopTime=0;
this.counter+=1;
},getResult:function(){
var _12c4="";
var _12c5=null;
var name=(this.name!=null)?(this.name+": "):"";
if(this.startTime==0){
_12c5="[timer not started]";
}else{
if(this.stopTime==0){
_12c5="[timer still running]";
}else{
if(this.duration<0){
_12c5="[timer has no duration]";
}
}
}
if(_12c5!=null){
return name+_12c5;
}else{
if(this.counter<=1){
return name+this.duration+"ms";
}else{
return name+"\n"+"        Counter: "+this.counter+"\n"+"        Total time: "+this.duration+"ms\n"+"        Avg. time: "+(Math.round(this.duration/this.counter))+"ms";
}
}
},report:function(){
dojo.debug(this.getResult());
}});
dojo.provide("ws.cache");
dojo.declare("ws.cache",null,function(_12c7,_12c8){
this.maxSize=_12c7;
this.discardSize=_12c8;
this.clear();
},{clear:function(){
this.size=0;
this.lastUsed=null;
this.leastUsed=null;
this.data={};
},add:function(uid,obj){
var cobj=this.data[uid];
var cuid=null;
if(cobj){
return;
}
if(this.size>=this.maxSize){
for(var i=0;i<this.discardSize;i++){
cuid=this.leastUsed;
cobj=this.data[cuid];
if(cobj.next!=null){
this.data[cobj.next].prev=null;
this.leastUsed=cobj.next;
delete this.data[cuid];
this.size--;
}else{
break;
}
}
}
cobj={obj:obj,prev:this.lastUsed,next:null};
if(this.lastUsed!=null){
this.data[this.lastUsed].next=uid;
}
this.lastUsed=uid;
if(this.leastUsed==null){
this.leastUsed=uid;
}
this.data[uid]=cobj;
this.size++;
return;
},get:function(uid){
var cobj=this.data[uid];
if(!cobj){
return null;
}
if(this.lastUsed!=uid){
if(cobj.next!=null){
if(this.leastUsed==uid){
this.leastUsed=cobj.next;
this.data[cobj.next].prev=null;
}else{
this.data[cobj.next].prev=cobj.prev;
}
}
if(cobj.prev!=null){
this.data[cobj.prev].next=cobj.next;
}
if(this.lastUsed!=null){
this.data[this.lastUsed].next=uid;
}
cobj.prev=this.lastUsed;
cobj.next=null;
this.lastUsed=uid;
}
return this.data[uid].obj;
},update:function(uids,field,value){
for(var i=0;i<uids.length;i++){
var cobj=this.data[uids[i]];
if(cobj){
cobj.obj[field]=value;
}
}
}});
dojo.provide("ws.CachedList");
dojo.declare("ws.CachedList",null,function(_12d5,_12d6){
this.CacheSize=_12d5?_12d5:this.kDefaultCacheSize;
this.FetchSize=_12d6?_12d6:this.kDefaultFetchSize;
this.Cache=new ws.cache(this.CacheSize,this.kDefaultCacheDiscardSize);
this.seenMessages=[];
this.Clear();
},{kDefaultCacheSize:500,kDefaultFetchSize:100,kDefaultCacheDiscardSize:10,kBackFetchSize:20,kBaseSegmentSize:1000,kFloatingSegmentSize:1000,kIndexBackFetchSize:50,Clear:function(args){
args=args||{};
this.Cache.clear();
this.Index=new Object();
if(!args.preserveSort){
this.CurrentIndex="received";
this.SortDirection="descending";
}
this.IndexDirection="descending";
this.SearchString=null;
this.SearchIn=null;
this.foldersCanMoveTo=null;
this.data=null;
this.requestsInProgress=[];
this.indexRequestsInProgress=[];
this.rowCount=0;
this.indexLoaded=false;
this.errorState=args.errorState;
this.Cleared();
},Cleared:function(){
},FoldersChanged:function(_12d8){
},IndexUpdated:function(){
},RowsUpdated:function(){
},IsIndexReversed:function(){
return this.SortDirection!=this.IndexDirection;
},IsLoading:function(){
return !this.indexLoaded;
},SetFolder:function(_12d9){
if((this.folder==_12d9)&&this.indexLoaded&&!this.SearchString&&!this.SearchIn){
this.RefetchIndex();
return;
}
this.Clear({preserveSort:true});
this.folder=_12d9;
this.GetData({row:0,count:100});
},SetSort:function(_12da,_12db){
this.SortDirection=_12db;
if(this.CurrentIndex==_12da){
this.IndexUpdated();
return;
}
this.CurrentIndex=_12da;
this.GetData({row:0,count:100});
},SetSearch:function(_12dc,_12dd){
if(_12dc==this.SearchString&&_12dd==this.SearchIn){
return;
}
this.Clear({preserveSort:true});
this.SearchString=_12dc;
this.SearchIn=_12dd;
this.GetData({row:0,count:100});
},RefetchIndex:function(args){
this.GetData({row:0,count:20,reqIndex:true,automatic:args&&args.automatic});
var index=this.Index[this.CurrentIndex];
if(index.floatingSegmentStart){
this.GetData({reqRows:false,reqIndex:true,reqInfo:false,indexStart:index.floatingSegmentStart,indexMax:this.kFloatingSegmentSize,automatic:args&&args.automatic});
}
},RefetchInfo:function(){
this.GetData({reqIndex:false,reqRows:false,reqInfo:true});
},GetUID:function(row){
if(this.Cache==null){
return null;
}
var index=this.Index[this.CurrentIndex];
if(index==null){
return null;
}
row=parseInt(row);
if(row>=this.rowCount||row<0){
return null;
}
if(this.IsIndexReversed()){
row=this.rowCount-(row+1);
}
return index.getRow(row);
},GetAvailableRowsForUIDs:function(uids){
if(this.Cache==null){
return [];
}
var index=this.Index[this.CurrentIndex];
if(index==null){
return [];
}
var ret=index.getRowsForUids(uids);
if(this.IsIndexReversed()){
for(var i=0;i<ret.length;i++){
ret[i]=this.rowCount-(ret[i]+1);
}
}
return ret;
},GetAllUIDs:function(){
if(this.rowCount>this.kBaseSegmentSize){
return null;
}
var index=this.Index[this.CurrentIndex];
if(!index){
return null;
}
return index.baseSegment;
},GetRow:function(row){
row=parseInt(row);
if(isNaN(row)){
dojo.debug("CachedList.GetRow: non-numeric parameter");
row=0;
}
var _12e8=this.CurrentIndex;
var index=this.Index[_12e8];
if(this.Cache==null||index==null||row<0||row>=this.rowCount){
return null;
}
if(this.IsIndexReversed()){
row=this.rowCount-(row+1);
}
var uid=index.getRow(row);
if(uid!=null){
var obj=this.Cache.get(uid);
if(obj!=null){
return obj;
}else{
if(this.IsRequestInProgress(row)!=-1){
return null;
}
}
}
if(this.IsIndexReversed()){
var start=row+this.kBackFetchSize-this.FetchSize;
var count=this.FetchSize;
}else{
var start=row-this.kBackFetchSize;
var count=this.FetchSize;
}
start=start<0?0:start;
if(uid!=null){
this.GetData({row:start,count:count});
return this.Cache.get(uid);
}else{
if(this.IsRequestInProgress(row,true)!=-1){
return null;
}
var _12ee=row-this.kIndexBackFetchSize;
if(_12ee<this.kBaseSegmentSize){
_12ee=this.kBaseSegmentSize;
}
this.GetData({row:start,count:count,reqIndex:true,indexStart:_12ee,indexMax:this.kFloatingSegmentSize});
return null;
}
},UpdateCache:function(uids,field,value){
this.Cache.update(uids,field,value);
},DeleteFromIndex:function(uids){
if(!dojo.lang.isArray(uids)){
uids=[uids];
}
for(var key in this.Index){
var index=this.Index[key];
index.deleteUids(uids);
}
this.rowCount-=uids.length;
},GetRowCount:function(){
return this.rowCount==null?0:this.rowCount;
},AddSeenMessage:function(uid){
if(dojo.lang.find(this.seenMessages,uid)==-1){
this.seenMessages.push(uid);
}
},RemoveSeenMessages:function(uids){
this.seenMessages=ws.lang.difference(this.seenMessages,uids);
},ClearSeenMessages:function(){
this.seenMessages=[];
},DeleteSeenMessage:function(uids){
for(var i=0;i<uids.length;i++){
var index=dojo.lang.find(this.seenMessages,uids[i]);
if(index!=-1){
this.seenMessages.splice(index,1);
dojo.debug("delete uid =",uids[i]);
}
}
},GetData:function(args){
var _12fb=this.CurrentIndex;
var _12fc=("reqIndex" in args)?args.reqIndex:(this.Index[_12fb]==null);
var _12fd=("reqRows" in args)?args.reqRows:true;
var _12fe=("reqInfo" in args)?args.reqInfo:true;
var row=("row" in args)?args.row:0;
var count=("count" in args)?args.count:this.FetchSize;
var _1301=("indexStart" in args)?args.indexStart:0;
var _1302=("indexMax" in args)?args.indexMax:this.kBaseSegmentSize;
var _1303=("automatic" in args)?args.automatic:false;
var tag=Math.random();
if(_12fd){
this.AddRequestInProgress(row,count,tag);
}
if(_12fc){
this.AddRequestInProgress(_1301,_1302,tag,true);
}
ws.io.rpc({action:"GetMessageList",automatic:_1303,content:{folder:this.folder,start:row,count:count,indexStart:_1301,indexMax:_1302,index:_12fc,info:_12fe,rows:_12fd,sort:_12fb,sortDir:this.IndexDirection,search:this.SearchString,searchIn:this.SearchIn,seen:this.seenMessages},load:ws.lang.hitch(this,"ProcessResponse",tag),error:ws.lang.hitch(this,function(err){
dojo.debug("GetMessageList error:",null);
this.Clear({errorState:true});
})});
},IsRequestInProgress:function(row,_1307){
var list=_1307?this.indexRequestsInProgress:this.requestsInProgress;
for(var i=0;i<list.length;i++){
var req=list[i];
if((req.start<=row)&&(req.end>=row)){
return i;
}
}
return -1;
},AddRequestInProgress:function(row,count,tag,_130e){
var list=_130e?this.indexRequestsInProgress:this.requestsInProgress;
list.push({start:row,end:row+count-1,tag:tag});
},EndRequestInProgress:function(tag,_1311){
var list=_1311?this.indexRequestsInProgress:this.requestsInProgress;
for(var i=0;i<list.length;i++){
if(list[i].tag==tag){
list.splice(i,1);
}
}
},ProcessResponse:function(tag,data){
var _1316=this.CurrentIndex;
this.data=data;
var start=0;
var end=0;
var _1319=null;
var _131a=[],_131b=[];
if(data.foldersCanMoveTo){
this.foldersCanMoveTo=data.foldersCanMoveTo;
}
if(data.folders){
this.FoldersChanged(data.folders);
}
if(data.index){
if(this.rowCount!=data.totalItems){
this.Index={};
this.rowCount=data.totalItems;
}
if(!(_1316 in this.Index)){
this.Index[_1316]=new ws.CachedList.index;
}
this.Index[_1316].setData(data.index,data.indexStart);
this.indexLoaded=true;
}
if(data.rows){
var uid,obj;
var index=this.Index[this.CurrentIndex];
for(var i=0;i<data.rows.length;i++){
if(data.rows[i]){
uid=data.rows[i][0];
obj=data.rows[i];
this.Cache.add(uid,obj);
_131a.push(uid);
}
}
_131b=index.getRowsForUids(_131a);
if(this.IsIndexReversed()){
for(var i=0;i<_131b.length;i++){
_131b[i]=this.rowCount-(_131b[i]+1);
}
}
}
this.RowsUpdated(_131b);
if(data.index){
this.IndexUpdated();
}
this.EndRequestInProgress(tag);
this.EndRequestInProgress(tag,true);
return _1319;
}});
dojo.declare("ws.CachedList.index",null,function(){
this.baseSegment=[];
this.floatingSegment=[];
this.floatingSegmentStart=null;
},{getRow:function(row){
if(row<this.baseSegment.length){
return this.baseSegment[row];
}else{
if((row>=this.floatingSegmentStart)&&(row-this.floatingSegmentStart<this.floatingSegment.length)){
return this.floatingSegment[row-this.floatingSegmentStart];
}else{
return null;
}
}
},setData:function(rows,start){
if(start==0){
this.baseSegment=rows;
}else{
this.floatingSegment=rows;
this.floatingSegmentStart=start;
}
},getRowsForUids:function(uids){
var ret=[];
for(var i=0;i<uids.length;i++){
var row=dojo.lang.find(this.baseSegment,uids[i]);
if(row!=-1){
ret.push(row);
}else{
row=dojo.lang.find(this.floatingSegment,uids[i]);
if(row!=-1){
ret.push(row+this.floatingSegmentStart);
}
}
}
return ret;
},deleteUids:function(uids){
for(var i=0;i<uids.length;i++){
var row=dojo.lang.find(this.baseSegment,uids[i]);
if(row!=-1){
this.baseSegment.splice(row,1);
if(this.floatingSegmentStart){
this.floatingSegmentStart--;
}
}
row=dojo.lang.find(this.floatingSegment,uids[i]);
if(row!=-1){
this.floatingSegment.splice(row,1);
}
}
}});
dojo.provide("ws.mail.MailModel");
dojo.provide("ws.mail.folderName");
dojo.require("dojo.io");
dojo.lang.declare("ws.mail.MailModel",null,{checkNewMessagesInterval:120000,inboxStateToken:"-1",columns:{UID:0,FromToAddress:1,Subject:3,Received:4,Size:5,Attachment:6,Seen:8,Read:9,Draft:11,Answered:12,Flag:13,Official:14,Priority:15,Billpay:16,Voicemail:17},sortIndices:{FromToAddress:"fromToName",Subject:"subject",Attachment:"attachments",Received:"received",Flag:"flagged",Size:"size"},sort:function(_132a,dir){
if(_132a in this.sortIndices){
this.activeCachedList.SetSort(this.sortIndices[_132a],dir);
}
},initializer:function(_132c){
if(!_132c){
this.standAloneMailModel=false;
this.inboxCachedList=new ws.CachedList(10000,100);
this.otherCachedList=new ws.CachedList(10000,100);
this.activeCachedList=this.inboxCachedList;
var _132d=[this.inboxCachedList,this.otherCachedList];
for(var i=0;i<_132d.length;i++){
var list=_132d[i];
dojo.event.connect(list,"FoldersChanged",this,"_folderListChanged");
dojo.event.connect(list,"Cleared",ws.lang.hitch(this,"cachedListUpdated",list));
dojo.event.connect(list,"IndexUpdated",ws.lang.hitch(this,"cachedListUpdated",list));
dojo.event.connect(list,"RowsUpdated",ws.lang.hitch(this,"changeRows",list));
}
this.folders=[];
this.selectedUids={};
this.filter="all";
this.fetchingNewMail=false;
this.messageCache=new ws.cache(10,1);
this.setFolder(ws.settings.getInboxFolderName());
dojo.event.topic.subscribe("SettingsChanged/Compose",ws.lang.hitch(this,"getInfo"));
dojo.event.topic.subscribe("SettingsChanged/ShowStandardInbox",ws.lang.hitch(this,"getNewInbox"));
dojo.event.topic.subscribe("WSSessionExpired",ws.lang.hitch(this,"onSessionExpired"));
this.checkNewMessagesTimeout=dojo.lang.setTimeout(this,"checkNewMessages",this.checkNewMessagesInterval);
}else{
this.standAloneMailModel=true;
dojo.debug("STAND ALONE Mail model");
}
this.sendAddresses=[ws.UserContext.UserAddress];
this.getInfo();
},cachedListUpdated:function(list){
if(list==this.activeCachedList){
this.modelUpdated();
}
if(this.fetchingNewMail){
this.fetchingNewMail=false;
this.newMailReceived();
}
},modelUpdated:function(){
},changeRow:function(row){
},newMailReceived:function(){
},changeRows:function(list,rows){
if(list!=this.activeCachedList){
return;
}
if(rows){
for(var i=0;i<rows.length;i++){
this.changeRow(rows[i]);
}
}else{
this.modelUpdated();
}
},isLoading:function(){
return this.activeCachedList.IsLoading()&&!this.activeCachedList.errorState;
},isErrorState:function(){
return this.activeCachedList.errorState;
},setFolder:function(_1335){
var _1336=(_1335!=this.currentFolder);
this.currentFolder=_1335;
this.selectedUids={};
this.filter="all";
if(_1335==ws.settings.getInboxFolderName()){
this.activeCachedList=this.inboxCachedList;
}else{
this.activeCachedList=this.otherCachedList;
this.inboxCachedList.ClearSeenMessages();
}
this.activeCachedList.SetFolder(_1335);
if(_1336){
this.modelUpdated();
}
},search:function(query,_1338){
if(query){
this.searchInProgress=true;
}
_1338=_1338||"alltext";
if((_1338=="alltext")&&!this.allowAllTextSearch()){
_1338="from|subject";
}
this.filter="all";
this.activeCachedList.SetSearch(query,_1338);
},getSearchString:function(){
if(this.filter=="all"&&!dojo.string.isBlank(this.activeCachedList.SearchString)){
return this.activeCachedList.SearchString;
}else{
return null;
}
},allowAllTextSearch:function(){
return Config.ImapSearchEnabled&&(Config.AllowSearchAllTextTrash||(this.getCurrentFolder().type!="Deleted"));
},setFilter:function(type){
var types={all:{searchIn:"subject",search:""},unread:{searchIn:"seen",search:"false"},read:{searchIn:"seen",search:"true"},flagged:{searchIn:"flagged",search:"true"},unflagged:{searchIn:"flagged",search:"false"},answered:{searchIn:"answered",search:"true"},unanswered:{searchIn:"answered",search:"false"},attachments:{searchIn:"attachments",search:"true"},noattachments:{searchIn:"attachments",search:"false"}};
this.filter=type;
var _133b=types[type];
this.activeCachedList.SetSearch(_133b.search,_133b.searchIn);
},sendMessage:function(args){
ws.io.rpc({action:"SendMessage",content:args.content,formNode:args.formNode,load:dojo.lang.hitch(this,function(data){
if(!this.standAloneMailModel){
this.refetchFolderIndex(Config.SentItemsFolderName);
}
if(args.content.AnswerUID){
this.changeMessagesLocal(args.content.AnswerFolder,[args.content.AnswerUID],this.columns.Answered,true);
}
if(args.content.DraftMsgFolder&&args.content.DraftMsgUID){
this.removeMessagesLocal(args.content.DraftMsgFolder,[args.content.DraftMsgUID]);
}
if(args.load){
args.load(data);
}
}),error:args.error});
},saveMessage:function(args){
ws.io.rpc({action:"SaveMessage",content:args.content,formNode:args.formNode,load:dojo.lang.hitch(this,function(data){
if(!this.standAloneMailModel){
this.refetchFolderIndex(Config.DraftsFolderName);
}
if(args.content.DraftMsgFolder&&args.content.DraftMsgUID){
this.removeMessagesLocal(args.content.DraftMsgFolder,[args.content.DraftMsgUID]);
}
this.updateFolderCount(Config.DraftsFolderName,1,true);
if(args.load){
args.load(data);
}
}),error:args.error});
},inboxTypeUpdated:function(){
},folderListChanged:function(){
if(Settings.ShowStandardInbox){
if(this.currentFolder=="New Mail"||this.currentFolder=="Old Mail"){
this.currentFolder=ws.settings.getInboxFolderName();
this.inboxTypeUpdated();
}
}else{
if(this.currentFolder=="Inbox"){
this.currentFolder=ws.settings.getInboxFolderName();
this.inboxTypeUpdated();
}
}
},_folderListChanged:function(_1340){
this.folders=[];
for(var i=0;i<_1340.length;i++){
this.folders.push(new ws.mail.folder(_1340[i]));
}
this.folderListChanged();
},getFolderByName:function(name){
for(var i=0;i<this.folders.length;i++){
if(this.folders[i].name==name){
return this.folders[i];
}
}
return null;
},getCurrentFolder:function(){
return this.getFolderByName(this.currentFolder);
},isInboxNewOld:function(_1344){
var type=this.getFolderByName(_1344||this.currentFolder).type;
return (type=="Inbox")||(type=="NewMail")||(type=="OldMail");
},createFolder:function(args){
var _1347=Config.NewFolderPrefix+args.newName;
if(ws.mail.folderName.validate(args.newName,_1347,null,this.folders)){
args.newName=_1347;
this.folderAction("create",args);
}
},deleteFolder:function(args){
var _1349=false;
if(args.name==this.currentFolder){
_1349=true;
args.doNotUpdateCache=true;
var load=args.load;
args.load=dojo.lang.hitch(this,function(data){
if(args.name==this.currentFolder){
this.setFolder(ws.settings.getInboxFolderName());
}
if(load){
load(data);
}
});
}
this.folderAction("delete",args);
},emptyFolder:function(args){
args.load=dojo.lang.hitch(this,function(){
if(args.name==this.currentFolder){
this.activeCachedList.rowCount=0;
this.modelUpdated();
}
});
this.folderAction("empty",args);
},renameFolder:function(args){
var _134e=Config.NewFolderPrefix+args.newName;
if(Config.EnableIMAPFolderHierarchy){
var _134f=this.getFolderByName(args.name);
if(_134f.depth>1){
_134e=_134f.parentName+args.newName;
}
}
if(ws.mail.folderName.validate(args.newName,_134e,args.name,this.folders)){
args.newName=_134e;
this.folderAction("rename",args);
if(args.name==this.currentFolder||Config.EnableIMAPFolderHierarchy){
this.setFolder(args.newName);
}
}
},getFolderInfo:function(args){
this.folderAction("getInfo",args);
},folderAction:function(_1351,args){
ws.io.rpc({action:"FolderAction",content:{folderAction:_1351,folder:args.name,newName:args.newName},load:dojo.lang.hitch(this,function(data){
if(!args.doNotUpdateCache){
this.activeCachedList.RefetchInfo();
}
if(args.load){
args.load(data);
}
}),error:args.error});
},getRowCount:function(){
return this.activeCachedList.GetRowCount();
},getDatum:function(row,col){
if(this.activeCachedList.GetRowCount()==0){
return null;
}
var data=this.activeCachedList.GetRow(row);
if(data==null){
return null;
}
return data[col];
},getRowData:function(row){
if(this.activeCachedList.GetRowCount()==0){
return null;
}
var data=this.activeCachedList.GetRow(row);
if(data==null){
return null;
}
return data;
},getTypeName:function(data){
if(data[this.columns.Seen]&&Config.EnableMsgStatusColumn&&this.isInboxNewOld()){
return "SEEN";
}else{
if(data[this.columns.Official]){
return "OFFICIAL";
}else{
if(data[this.columns.Priority]){
return "PRIORITY";
}else{
if(data[this.columns.Billpay]){
return "BILLPAY";
}else{
if(data[this.columns.Voicemail]){
return "VOICEMAIL";
}else{
if(data[this.columns.Answered]){
return "ANSWERED";
}else{
return "NONE";
}
}
}
}
}
}
},getBaseSubject:function(_135a){
var re=/^([\(\[\{\<\-\s]*(re|fwd|fw|antwort|aw|wg|wtr|trans\. )[:\)\]\}\>\-\s][\s]*)+/i;
_135a=_135a.replace(re,"");
_135a=_135a.replace(/\]+$/,"");
return _135a;
},checkNewMessages:function(){
ws.io.rpc({action:"CheckNewMessages",automatic:true,content:{stateToken:this.inboxStateToken},load:dojo.lang.hitch(this,function(data){
dojo.debug("CheckNewMessages: stateToken ",data.stateToken,", stateChange ",data.stateChange);
if(data.stateToken){
this.inboxStateToken=data.stateToken;
}
switch(data.stateChange){
case this.stateChangeEnum.SomethingChangedAndNewMail:
this.fetchingNewMail=true;
case this.stateChangeEnum.SomethingChanged:
this.inboxCachedList.RefetchIndex({automatic:true});
break;
case this.stateChangeEnum.NothingChanged:
case this.stateChangeEnum.NewMail:
break;
}
if(Settings.AutoRefresh){
this.checkNewMessagesTimeout=dojo.lang.setTimeout(this,"checkNewMessages",this.checkNewMessagesInterval);
}
}),error:dojo.lang.hitch(this,function(err){
dojo.debug("CheckNewMessages error: ",err);
if(Settings.AutoRefresh){
this.checkNewMessagesTimeout=dojo.lang.setTimeout(this,"checkNewMessages",this.checkNewMessagesInterval);
}
})});
},stateChangeEnum:{NothingChanged:1,SomethingChanged:2,SomethingChangedAndNewMail:3,NewMail:4},onSessionExpired:function(){
dojo.lang.clearTimeout(this.checkNewMessagesTimeout);
},refetchFolderIndex:function(_135e){
if(_135e==ws.settings.getInboxFolderName()){
this.inboxCachedList.RefetchIndex();
}else{
if(_135e==this.otherCachedList.folder){
this.otherCachedList.RefetchIndex();
}
}
},getMessage:function(args){
if(this.getFolderByName(args.folder).type=="NewMail"){
this.inboxCachedList.AddSeenMessage(args.uid);
}
if(this.getFolderByName(args.folder).type!="Drafts"){
dojo.lang.setTimeout(this,function(){
this.changeMessagesReadStateLocal(true,null,args.folder,[args.uid]);
this.changeMessagesSeenStateLocal(true,null,args.folder,[args.uid]);
},0);
}
var msg=this.messageCache.get(args.folder+args.uid);
if(msg){
if(args.load){
args.load(msg);
}
this.changeMessagesReadState({uids:[args.uid],read:true});
return;
}
ws.io.rpc({action:"GetMessage",content:{folder:args.folder,uid:args.uid},load:dojo.lang.hitch(this,function(data){
if(args.load){
args.load(data);
}
if(data.body&&data.body.length<100000){
this.messageCache.add(args.folder+args.uid,data);
}
}),error:args.error});
},getMessageStatus:function(args){
ws.io.rpc({action:"GetMessageStatus",content:{folder:args.folder,uids:args.uids},load:args.load,error:args.error});
},getAdjacentMessageUid:function(uid,dir){
var row=this.activeCachedList.GetAvailableRowsForUIDs([uid]);
if(row.length<1){
return null;
}
return this.activeCachedList.GetUID(row[0]+dir);
},messageAction:function(args){
if(typeof args.folder=="undefined"){
args.folder=this.currentFolder;
}
ws.io.rpc({action:"MessageAction",content:{messageAction:args.action,folder:args.folder,uids:args.uids,destFolder:args.destFolder,isSpam:args.isSpam},load:args.load,error:args.error});
},flagMessages:function(args){
args.action=args.flag?"flagged":"unflagged";
this.messageAction(args);
this.changeMessagesLocal(args.folder,args.uids,this.columns.Flag,args.flag);
var _1368=args.folder||this.currentFolder;
var _1369=dojo.lang.map(args.uids,function(uid){
return _1368+uid;
});
this.messageCache.update(_1369,"isFlagged",args.flag);
},changeMessagesReadState:function(args){
args.action=args.read?"seen":"unseen";
this.messageAction(args);
var _136c=this.getCurrentFolder().type;
if(args.read&&Config.EnableMoveForMarkSeen&&(_136c=="NewMail")){
this.removeMessagesLocal(args.folder,args.uids);
this.refetchFolderIndex("Old Mail");
}else{
if(!args.read&&Config.EnableMoveForMarkUnseen&&(_136c=="OldMail")){
this.removeMessagesLocal(args.folder,args.uids);
this.updateUnseenCount("New Mail",args.uids.length,true);
this.refetchFolderIndex("New Mail");
}else{
this.changeMessagesSeenStateLocal(args.read,args.msgInfos,args.folder,args.uids);
}
}
},canChangeMessageReadState:function(_136d){
return Config.EnableMarkOutsideInbox||this.isInboxNewOld(_136d);
},deleteMessages:function(args){
args.action="delete";
this.messageAction(args);
this.removeMessagesLocal(args.folder,args.uids);
if(args.folder!=Config.DeletedItemsFolderName){
this.refetchFolderIndex(Config.DeletedItemsFolderName);
}
},restoreMessages:function(args){
args.action="restore";
this.messageAction(args);
this.removeMessagesLocal(args.folder,args.uids);
},moveMessages:function(args){
args.action="move";
this.messageAction(args);
this.removeMessagesLocal(args.folder,args.uids);
this.refetchFolderIndex(args.destFolder);
},getFoldersCanMoveTo:function(){
return this.activeCachedList.foldersCanMoveTo||[];
},reportSpamMessages:function(args){
args.action="reportSpam";
this.messageAction(args);
this.removeMessagesLocal(args.folder,args.uids);
if(args.isSpam){
this.updateFolderCount(Config.SpamFolderName,args.uids.length,true);
}
this.refetchFolderIndex(args.isSpam?Config.SpamFolderName:ws.settings.getInboxFolderName());
},unsendMessages:function(args){
args.action="unsend";
var _load=args.load;
args.load=dojo.lang.hitch(this,function(data){
this.removeMessagesLocal(args.folder,args.uids);
if(_load){
_load(data);
}
});
this.messageAction(args);
},getInfo:function(){
ws.io.rpc({action:"GetMailInfo",load:dojo.lang.hitch(this,function(data){
this.sendAddresses=data.sendAddresses;
this.richSignature=data.richSignature;
this.plainSignature=data.plainSignature;
window.Settings.MailStorageQuota=data.storageQuota;
window.Settings.MailStorageUsed=data.storageUsed;
window.Settings.HasUnlimitedMailStorage=data.hasUnlimitedStorage;
this.infoUpdated();
}),error:function(err){
dojo.debug("GetMailInfo error:",err);
}});
},infoUpdated:function(){
},toggleSelectRow:function(row,_1378){
var uid=this.activeCachedList.GetUID(row);
if(uid==null){
dojo.debug("No UID found for row",row);
return;
}
var sel=(typeof _1378=="undefined")?!this.isSelected(uid):_1378;
if(sel){
this.selectedUids[uid]=true;
}else{
delete this.selectedUids[uid];
}
this.changeRow(row);
},selectRange:function(low,high,sel){
for(var i=low;i<=high;i++){
if(this.activeCachedList.GetUID(i)==null){
return false;
}
}
for(var i=low;i<=high;i++){
this.toggleSelectRow(i,sel);
}
return true;
},selectAll:function(){
var uids=this.activeCachedList.GetAllUIDs();
if(uids==null){
return false;
}
this.selectedUids={};
for(var i=0;i<uids.length;i++){
this.selectedUids[uids[i]]=true;
}
this.modelUpdated();
return true;
},deselectAll:function(){
this.selectedUids={};
this.modelUpdated();
},isAllSelected:function(){
var _1381=this.activeCachedList.GetAllUIDs();
if(_1381==null){
return false;
}
var _1382=this.getSelectedUids();
return (_1381.length>0)&&(_1382.length==_1381.length);
},isAnySelected:function(){
return !ws.lang.isEmptyObject(this.selectedUids);
},isSelected:function(uid){
return uid in this.selectedUids;
},getSelectedUids:function(){
var ret=[];
for(var uid in this.selectedUids){
ret.push(uid);
}
return ret;
},changeMessagesLocal:function(_1386,uids,col,value){
var list=this.getCachedListForFolder(_1386);
if(!list){
return;
}
list.UpdateCache(uids,col,value);
var rows=list.GetAvailableRowsForUIDs(uids);
this.changeRows(list,rows);
},changeMessagesReadStateLocal:function(read,_138d,_138e,uids){
this._changeMessagesReadStateLocal(read,_138d,_138e,uids);
if(!Config.UseMsgReadFlag){
this._changeMessagesSeenStateLocal(read,_138d,_138e,uids);
}
},changeMessagesSeenStateLocal:function(seen,_1391,_1392,uids){
this._changeMessagesSeenStateLocal(seen,_1391,_1392,uids);
if(!Config.UseMsgReadFlag){
this._changeMessagesReadStateLocal(seen,_1391,_1392,uids);
}
},_changeMessagesReadStateLocal:function(read,_1395,_1396,uids){
this.changeMessagesLocal(_1396,uids,this.columns.Read,read);
if(_1395){
dojo.lang.forEach(_1395,function(info){
info.isRead=read;
});
}
},_changeMessagesSeenStateLocal:function(seen,_139a,_139b,uids){
this.updateUnseenCount(_139b,uids,!seen);
this.changeMessagesLocal(_139b,uids,this.columns.Seen,seen);
if(_139a){
dojo.lang.forEach(_139a,function(info){
info.isSeen=seen;
});
}
},removeMessagesLocal:function(_139e,uids){
var list=this.getCachedListForFolder(_139e);
if(!list){
return;
}
this.updateUnseenCount(_139e,uids,false);
this.updateFolderCount(_139e,uids.length,false);
list.DeleteFromIndex(uids);
list.RemoveSeenMessages(uids);
if((typeof _139e=="undefined")||(_139e==this.currentFolder)){
dojo.lang.forEach(uids,dojo.lang.hitch(this,function(uid){
if(uid in this.selectedUids){
delete this.selectedUids[uid];
}
}));
this.modelUpdated();
}
if(this.getFolderByName(_139e).type=="NewMail"){
this.inboxCachedList.DeleteSeenMessage(uids);
}
},showFolderCount:function(_13a2){
if(!Config.ShowFolderMessageCount){
return false;
}
switch(_13a2){
case Config.SpamFolderName:
case Config.DraftsFolderName:
return true;
default:
return false;
}
},updateFolderCount:function(_13a3,count,_13a5){
if(!this.showFolderCount(_13a3)){
return;
}
var _13a6=this.getFolderByName(_13a3);
if(_13a5){
_13a6.unseenCount+=count;
}else{
_13a6.unseenCount-=count;
}
this.folderListChanged();
},updateUnseenCount:function(_13a7,uids,_13a9){
_13a7=_13a7||this.currentFolder;
if(_13a7!=ws.settings.getInboxFolderName()){
return;
}
var list=this.getCachedListForFolder(_13a7);
if(!list){
return;
}
var _13ab=this.getFolderByName(_13a7);
if(typeof uids=="number"){
if(_13a9){
_13ab.unseenCount+=uids;
}else{
_13ab.unseenCount-=uids;
}
}else{
var rows=list.GetAvailableRowsForUIDs(uids);
var _13ad=this.columns.Seen;
dojo.lang.forEach(rows,function(row){
var data=list.GetRow(row);
if(data){
if(_13a9&&data[_13ad]){
_13ab.unseenCount++;
}else{
if(!_13a9&&!data[_13ad]){
_13ab.unseenCount--;
}
}
}
});
}
this.folderListChanged();
},getCachedListForFolder:function(_13b0){
if(typeof _13b0=="undefined"){
return this.activeCachedList;
}else{
if(_13b0==ws.settings.getInboxFolderName()){
return this.inboxCachedList;
}else{
if(_13b0==this.currentFolder){
return this.otherCachedList;
}else{
return null;
}
}
}
},getNewInbox:function(){
this.activeCachedList.RefetchInfo();
}});
dojo.lang.declare("ws.mail.folder",null,function(data){
this.name=data[0];
this.displayName=data[1];
this.parentName=data[2];
this.depth=data[3];
this.unseenCount=data[6];
this.count=data[7];
this.type=data[8];
this.canMoveTo=data[9];
},{});
ws.mail.folderName={MaxLength:32,DisallowedCharsList:["\\",":","*","?","\"","<",">","|","%"],DisallowedStartCharsList:[" ","%","#"],DisallowedCharsMap:{},DisallowedStartCharsMap:{},DisallowedCharsString:"",DisallowedStartCharsString:"",init:function(){
if(this.getDisallowedHierarchyDelimiter()){
this.DisallowedCharsList.push(this.getDisallowedHierarchyDelimiter());
}
for(var i=0;i<this.DisallowedCharsList.length;i++){
var c=this.DisallowedCharsList[i];
this.DisallowedCharsString+=c+" ";
this.DisallowedCharsMap[c]=true;
}
if(this.DisallowedCharsString.length>0){
this.DisallowedCharsString=this.DisallowedCharsString.substring(0,(this.DisallowedCharsString.length-1));
}
for(var i=0;i<this.DisallowedStartCharsList.length;i++){
var c=this.DisallowedStartCharsList[i];
if(c==" "){
this.DisallowedStartCharsString+=Config.Strings.Space;
}else{
this.DisallowedStartCharsString+=c+" ";
}
this.DisallowedStartCharsMap[c]=true;
}
if(this.DisallowedStartCharsString.length>0){
this.DisallowedStartCharsString=this.DisallowedStartCharsString.substring(0,(this.DisallowedStartCharsString.length-1));
}
},getDisallowedHierarchyDelimiter:function(){
if(!Config.ImapStoreAllowHierarchicalFolderCreation){
return "/";
}else{
return "";
}
},validate:function(_13b4,_13b5,_13b6,_13b7){
var _13b8=(_13b6!=null);
if(!_13b4||!_13b5){
ws.widget.OkCancelDialog.alert(Config.Strings.FolderWarningEmpty);
return false;
}
if(_13b4.length>this.MaxLength){
ws.widget.OkCancelDialog.alert(ws.string.substituteParams(Config.Strings.FolderWarningTooLong,this.MaxLength));
return false;
}
for(var i=0;i<_13b4.length;i++){
if(this.DisallowedCharsMap[_13b4.charAt(i)]){
ws.widget.OkCancelDialog.alert(Config.Strings.FolderWarningLetters+"<br>"+this.DisallowedCharsString);
return false;
}
}
if(this.DisallowedStartCharsMap[_13b4.charAt(0)]){
ws.widget.OkCancelDialog.alert(Config.Strings.FolderWarningStart+"<br>"+this.DisallowedStartCharsString);
return false;
}
if(_13b8&&(_13b4==_13b6)){
ws.widget.OkCancelDialog.alert(Config.Strings.FolderWarningUnchanged);
return false;
}
if(_13b8&&(_13b4.toLowerCase()==_13b6.toLowerCase())){
return true;
}
longNameLower=_13b5.toLowerCase();
for(i=0;i<_13b7.length;i++){
if((_13b7[i]!=null)&&(_13b7[i].name.toLowerCase()==longNameLower)){
var msg=ws.string.substituteParams(Config.Strings.FolderWarningDuplicate,"\""+_13b4+"\"");
ws.widget.OkCancelDialog.alert(msg);
return false;
}
}
return true;
}};
ws.mail.folderName.init();
dojo.provide("ws.pictures.model");
dojo.declare("ws.pictures.model",null,function(){
this.albums=[];
this.albumListLoaded=false;
this.currentAlbum=null;
this.uploadUrl=null;
},{getAlbumList:function(force){
if(this.albumListLoaded&&!force){
return;
}
ws.io.rpc({action:"GetAlbumList",load:dojo.lang.hitch(this,function(data){
this.albums=[];
for(var i=0;i<data.albums.length;i++){
this.albums.push(new ws.pictures.album(data.albums[i],this));
}
this.albumListLoaded=true;
this.albumListUpdated();
}),error:function(err){
dojo.debug("GetAlbumList error: ",err);
}});
},getUploadToken:function(cb){
if(this.uploadUrl){
if(cb){
cb();
}
return;
}
ws.io.rpc({action:"GetUploadToken",load:dojo.lang.hitch(this,function(data){
this.uploadUrl=data.uploadUrl;
if(cb){
cb();
}
}),error:function(err){
dojo.debug("GetUploadToken error:",err);
if(cb){
cb();
}
}});
},saveAttachedImages:function(args){
ws.io.rpc({action:"SaveAttachedImages",content:{folder:args.folder,uid:args.uid,partId:args.partId},load:args.load,error:args.error});
},saveRemoteImage:function(args){
ws.io.rpc({action:"SaveRemoteImage",content:{url:args.url},load:args.load,error:args.error});
},selectAlbum:function(album){
this.currentAlbum=album;
album.loadPictures();
this.currentAlbumUpdated();
},albumListUpdated:function(){
if(this.albums.length>0){
this.selectAlbum(this.albums[0]);
}
},albumUpdated:function(album){
if(album==this.currentAlbum){
this.currentAlbumUpdated();
}
},currentAlbumUpdated:function(){
},isLoading:function(){
return !this.albumListLoaded;
}});
dojo.declare("ws.pictures.album",null,function(data,model){
this.model=model;
this.id=data.id;
this.title=data.title;
this.creationDate=new Date(data.creationDate);
this.pictureCount=data.pictureCount;
this.category=data.category;
this.pictures=[];
this.loaded=false;
},{setPictures:function(_13c8){
this.pictures=[];
if(_13c8){
for(var i=0;i<_13c8.length;i++){
var p=_13c8[i];
var _13cb=new ws.pictures.picture(p);
this.pictures.push(_13cb);
}
}
this.model.albumUpdated(this);
},loadPictures:function(){
if(this.loaded){
return;
}
ws.io.rpc({action:"GetAlbum",content:{id:this.id},load:dojo.lang.hitch(this,function(data){
this.loaded=true;
this.setPictures(data.pictures);
}),error:function(err){
dojo.debug("GetAlbum error: ",err);
}});
},getPictureById:function(id){
for(var i=0;i<this.pictures.length;i++){
if(this.pictures[i].id==id){
return this.pictures[i];
}
}
return null;
}});
dojo.declare("ws.pictures.picture",null,function(data){
this.permalink=data.permalink;
this.permalinkId=data.permalinkId;
this.caption=data.caption;
this.sizes=data.sizes;
this.id=data.id;
this.portrait=this.sizes[0].width<this.sizes[0].height;
},{getPictureSizeForDimensions:function(dims){
for(var i=0;i<this.sizes.length;i++){
var size=this.sizes[i];
if(dims.width<=size.width&&dims.height<=size.height){
return i;
}
}
return this.sizes.length-1;
},getUrlForPictureSize:function(size){
return this.sizes[size].url;
},getDimensionsForShortestEdge:function(edge){
if(this.portrait){
return {height:this.getHeightForWidth(edge),width:edge};
}else{
return {height:edge,width:this.getWidthForHeight(edge)};
}
},getDimensionsForLongestEdge:function(edge){
if(this.portrait){
return {height:edge,width:this.getWidthForHeight(edge)};
}else{
return {height:this.getHeightForWidth(edge),width:edge};
}
},getHeightForWidth:function(width){
for(var i=0;i<this.sizes.length;i++){
var size=this.sizes[i];
if(size.width==width){
return size.height;
}
if(size.width>width){
break;
}
}
var _13da=this.sizes[this.sizes.length-1];
var _13db=Math.round((_13da.height/_13da.width)*width);
return _13db;
},getWidthForHeight:function(_13dc){
for(var i=0;i<this.sizes.length;i++){
var size=this.sizes[i];
if(size.height==_13dc){
return size.width;
}
if(size.height>_13dc){
break;
}
}
var _13df=this.sizes[this.sizes.length-1];
var width=Math.round((_13df.width/_13df.height)*_13dc);
return width;
},getPermalinkForPictureSize:function(size){
var _13e2=["s","t","m","l"];
return this.permalink+"&size="+_13e2[size];
},getImageViewURL:function(){
return Config.PicturesServer+ws.string.substituteParams(Config.SingleImagePath,encodeURIComponent(this.permalinkId));
}});
dojo.provide("ws.suite.InlinePrefsDialog");
dojo.widget.defineWidget("ws.suite.InlinePrefsDialog",dojo.widget.HtmlWidget,{templateString:"<div>\r\n\t<div dojotype=\"dojo:Dialog\" classname=\"inlinePrefsDialog\" dojoattachpoint=\"dialogWidget\" bgcolor=\"white\" bgopacity=\"0.75\">\r\n\t\t<div style=\"width: 335px; background: white; border: 1px solid #000000; padding: 0px 15px 5px;\">\r\n\t\t\t<div style=\"background: url('${images}hatbackground.gif') bottom left repeat-x; margin: 0px -15px;\">\r\n\t\t\t\t<img src=\"${images}hat_logo.gif\">\r\n\t\t\t</div>\r\n\t\t\t<p style=\"margin: 10px 0px 0px; font-weight: bold; font-size: 20px;\">${InlinePrefsDialog_Header}</p>\r\n\t\t\t<p>${InlinePrefsDialog_Text1}</p>\r\n\t\t\t<p>${InlinePrefsDialog_Text2}</p>\r\n\t\t\t<div dojoType=\"ws:WSToolbar\" vizType=\"Bare\">\r\n\t\t\t\t<div dojoType=\"ws:WSButton\" toolbarAlign=\"left\" vizType=\"Blue\" dojoAttachEvent=\"onClick: onClickOk\">${OK}</div>\r\n\t\t\t</div>\r\n\t\t\t<p style=\"margin-top: 2px; font-size: 11px;\" dojoAttachPoint=\"choosePopupsNode\"></p>\r\n\t\t\t<p dojoAttachPoint=\"tipNode\"></p>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n",widgetsInTemplate:true,postCreate:function(args,frag){
this.choosePopupsNode.innerHTML=ws.string.substituteParams(Config.Strings.InlinePrefsDialog_ChoosePopups,"<span class='wsLink'>","</span>");
dojo.event.connect(dojo.html.getElementsByClassName("wsLink",this.choosePopupsNode)[0],"onclick",this,"onClickChoosePopups");
this.tipNode.innerHTML=ws.string.substituteParams(Config.Strings.InlinePrefsDialog_Tip,"<b>","</b>","<span class='wsLink'>","</span>");
dojo.event.connect(dojo.html.getElementsByClassName("wsLink",this.tipNode)[0],"onclick",this,"onClickSettings");
},show:function(){
this.dialogWidget.show();
},onClickOk:function(){
this.updateSettings(false);
this.dialogWidget.hide();
},onClickChoosePopups:function(){
this.updateSettings(true);
this.dialogWidget.hide();
ws.WebSuite.ViewWidget.selectedChildWidget.popOut();
},onClickSettings:function(){
this.onClickOk();
dojo.lang.setTimeout(function(){
dojo.widget.byType("hat")[0].onSettingsClick();
});
},updateSettings:function(_13e5){
ws.io.rpc({action:"LoginState",content:{SeenInlinePrefsDialog:true,ReadInPopup:_13e5,ComposeInPopup:_13e5}});
Settings.SeenInlinePrefsDialog=true;
Settings.ReadInPopup=_13e5;
Settings.ComposeInPopup=_13e5;
}});
dojo.provide("ws.widget.util");
dojo.lang.mixin(ws.widget,{setShowing:function(_13e6,show){
if(show){
_13e6.show();
}else{
_13e6.hide();
}
},setEnabled:function(_13e8,_13e9){
if(_13e9){
_13e8.enable();
}else{
_13e8.disable();
}
},createMenu:function(items){
var menu=dojo.widget.createWidget("ws:WSMenu");
dojo.lang.forEach(items,function(item){
var w=item.separator?"ws:WSMenuSeparator":"ws:WSMenuItem";
menu.addChild(dojo.widget.createWidget(w,item));
});
return menu;
}});
dojo.widget.DomWidget.prototype.strings=Config.Strings;
dojo.lang.mixin(dojo.widget.defaultStrings,{spacer:Config.SpacerImageURL,images:Config.BaseResourcesURL+"images/"});
dojo.widget.DomWidget.prototype._buildRendering=dojo.widget.DomWidget.prototype.buildRendering;
dojo.widget.DomWidget.prototype.buildRendering=function(args,frag){
var ret=this._buildRendering(args,frag);
var obj=this.constructor.superclass;
while(obj!=null){
var cpath=obj.templateCssPath;
var _13f3=obj.templateCssString;
if(cpath&&!dojo.widget._cssFiles[cpath.toString()]){
_13f3=_13f3||dojo.hostenv.getText(cpath);
dojo.widget._cssFiles[cpath.toString()]=true;
}
if(_13f3&&!dojo.widget._cssStrings[_13f3]){
dojo.html.insertCssText(_13f3,null,cpath);
dojo.widget._cssStrings[_13f3]=true;
}
obj=obj.constructor.superclass;
}
return ret;
};
dojo.provide("ws.widget.WelcomeDialog");
dojo.widget.defineWidget("ws.widget.WelcomeDialog",dojo.widget.HtmlWidget,{widgetsInTemplate:true,templateString:"<div>\r\n\t<div dojotype=\"dojo:Dialog\" classname=\"welcomeDialog\" dojoattachpoint=\"dialogWidget\" bgcolor=\"white\" bgopacity=\"0.75\">\r\n\t\t<div class=\"welcomeDialog content\">\r\n\t\t\t<div>\r\n\t\t\t\t<img src=\"${images}hat_logo.gif\" class=\"logo\" style=\"float:left\">\r\n\t\t\t\t<img src=\"${images}space.gif\" dojoattachevent=\"onClick: hide\" class=\"closeButton\" style=\"float:right\">\r\n\t\t\t</div>\r\n\t\t\t<div style=\"clear:both\" class=\"title\">${WelcomeToMail}</div>\r\n\t\t\t<br />\r\n\t\t\t<div class=\"description\">${WelcomeMsg2} </div>\r\n\t\t\t<div class=\"buttonBar\">\r\n\t\t\t\t<div dojotype=\"ws:WSButton\" className=\"tourButton\" vizType=\"Hat\" dojoattachevent=\"onClick: startTour\">${TakeTour}</div>\r\n\t\t\t\t<div dojotype=\"ws:WSButton\" className=\"startButton\" vizType=\"Hat\" dojoattachevent=\"onClick: hide\">${StartUsingAOLMail}</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n",templateCssString:".welcomeDialog.content\r\n{\r\n\twidth: 335px;\r\n\tborder: 1px solid #000;\r\n\tpadding: 8px 8px 14px 18px;\r\n\toverflow: hidden;\r\n\tbackground: #ffffff url(\"${images}welcomebackground.jpg\") top left;\r\n\tcolor: #555555;\r\n\tposition: relative;\r\n}\r\n\r\n.welcomeDialog .logo\r\n{\r\n\tmargin: -7px 7px 7px -7px;\r\n}\r\n\r\n.welcomeDialog .closeButton\r\n{\r\n\twidth: 14px;\r\n\theight: 14px;\r\n\tcursor: pointer;\r\n\tbackground: url(\"${images}main.gif\") -1424px -0px;\r\n}\r\n\r\n.welcomeDialog .closeButton:hover\r\n{\r\n\tbackground-position: -1439px -0px;\r\n}\r\n\r\n.welcomeDialog .title\r\n{\r\n\tfont: bold medium Arial;\r\n\ttext-align: left;\r\n}\r\n\r\n.welcomeDialog .description\r\n{\r\n\ttext-align: left;\r\n\tfont: normal small Arial;\r\n}\r\n\r\n.welcomeDialog .tourButton\r\n{\r\n\tfloat: left;\r\n}\r\n\r\n.welcomeDialog .startButton\r\n{\r\n\tfloat: right;\r\n}\r\n\r\n.welcomeDialog .buttonBar\r\n{\r\n\tpadding: 15px 10px;\r\n}\r\n\r\n.welcomeDialog .wsButtonHat .label\r\n{\r\n\tmargin: 0px auto 0px auto;\r\n\tpadding: 0px 5px 0px 0px;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("../ws/widget/WelcomeDialog.css"),show:function(_13f4){
ws.WebSuite.TodayCurtain.dontCloseYet=true;
this.callback=_13f4;
this.dialogWidget.show();
},startTour:function(){
if(this.callback){
this.callback(ret);
}
dojo.debug(window.location.host);
this.dialogWidget.hide();
var tour=Config.BaseResourcesURL+"tour/mailtour1.html?location="+encodeURIComponent(window.location.host+"/"+Config.PageLocale);
ws.io.openWindow(tour,"","status=yes,resizable=yes,menubar=yes,scrollbars=yes,location=yes,toolbar=yes,top=50,left=50");
ws.reporting.report("Mail Tour","Init");
},hide:function(ret){
if(this.callback){
this.callback(ret);
}
this.dialogWidget.hide();
dojo.lang.setTimeout(function(){
ws.WebSuite.TodayCurtain.dontCloseYet=false;
},1000);
}});
dojo.lang.mixin(ws.widget.WelcomeDialog,{alert:function(_13f7){
ws.widget.WelcomeDialog.createDialog();
ws.widget.WelcomeDialog.theDialog.show(_13f7);
},createDialog:function(){
if(ws.widget.WelcomeDialog.theDialog){
return;
}
ws.widget.WelcomeDialog.theDialog=dojo.widget.createWidget("ws:WelcomeDialog",null,document.body,"first");
}});
dojo.provide("ws.widget.AIMFTUTip");
dojo.widget.defineWidget("ws.widget.AIMFTUTip",dojo.widget.HtmlWidget,{templateString:"<div class=\"AIMFTUTip\" dojoAttachPoint=\"aimftutip\" style=\"display: none;\">\r\n\t<table width=\"100%\" height=\"100%\"><tr>\r\n\t<td><img src=\"${spacer}\" class=\"logo\"></td>\r\n\t<td><span class=\"description\">${AIM_FirstTime_TipMsg}</span></td>\r\n\t<td class=\"closeCell\"><img src=\"${spacer}\" class=\"closeButton\" dojoAttachPoint=\"closeButton\" dojoAttachEvent=\"onClick: closeWindow\"></td>\r\n\t</tr></table>\r\n\t<div class=\"balloonAnchor\">\r\n\t\t<img src=\"${spacer}\">\r\n\t</div>\r\n</div>\r\n\r\n",templateCssString:".AIMFTUTip {\r\n\tposition: absolute;\r\n\theight: 82px;\r\n\tmin-width: 264px;\r\n\tmax-width: 264px;\r\n\tborder: 1px solid white;\r\n\tbackground-color: #68AA00;\r\n\toverflow: visible;\r\n\tz-index: 2000;\r\n}\r\n\r\n.aimvariant {\r\n\tbackground-color: black;\r\n}\r\n\r\n.balloonAnchor {\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tbackground-position: -963px -52px;\r\n\tposition: absolute;\r\n\ttop: 34px; right: -12px;\r\n\twidth: 12px;\r\n\theight: 24px;\r\n}\r\n\r\n.AIMFTUTip .logo {\r\n\tbackground-image: url(\"${images}aim_logos.gif\");\r\n\tbackground-position: 0px 0px;\r\n\twidth: 58px;\r\n\theight: 48px;\r\n\tvertical-align: middle;\r\n}\r\n\r\n.AIMFTUTip .closeButton {\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tbackground-position: -1424px -0px;\t\r\n\tmargin: 2px 2px 2px 2px;\r\n\theight: 14px;\r\n\twidth: 14px;\r\n\tcursor: pointer;\r\n\tvertical-align: top;\r\n}\r\n\r\n.AIMFTUTip .closeCell {\r\n\tvertical-align: top;\r\n}\r\n\r\n.AIMFTUTip .closeButton:hover\t\t{ background-position: -1439px -0px; }\r\n\r\n.AIMFTUTip .description\r\n{\r\n\ttext-align: left;\r\n\tfont: normal small Arial;\r\n\tvertical-align: middle;\r\n\tcolor: white;\r\n}\r\n\r\n",templateCssPath:dojo.uri.dojoUri("../ws/widget/AIMFTUTip.css"),postCreate:function(args,frag){
if(Config.UIVariant=="AIM"){
dojo.html.addClass(this.aimftutip,"aimvariant");
}
},closeWindow:function(){
this.hide();
}});
dojo.provide("ws.WebSuite");
dojo.dnd.dragManager.onKeyDown=function(e){
if(this.selectedSources.length==0){
return;
}
switch(e.keyCode){
case e.KEY_ESCAPE:
this.dropAcceptable=false;
this.onMouseUp(e,true);
break;
}
};
ws.WebSuite={minContentHeight:250,minViewWidth:100,spacerHeight:0,resizeTimer:null,isPanelSplitterInitializing:false,_resize:function(){
this.resize();
},resize:function(){
var lat=new ws.debug.latometer("WebSuite.resize",true);
var _13fc=dojo.html.getViewport().width;
var _13fd=dojo.html.getViewport().height;
var nw=ws.style.getMarginBoxWidthFast(this.NavEl);
var pw=ws.style.getMarginBoxWidthFast(this.PanelEl);
var _1400=Math.max(_13fd-(this.hatHeight+this.footerHeight+(this.spacerHeight*2)),this.minContentHeight);
var _1401=ws.style.getMarginBoxHeightFast(this.SouthwestAdEl);
var _1402=_1400-_1401;
ws.style.setMarginBoxHeightFast(this.NavEl,_1402);
this.Navigation.onResized();
this.SouthwestAdEl.style.top=(this.hatHeight+this.spacerHeight+_1402)+"px";
ws.style.setMarginBoxWidthFast(this.SouthwestAdEl,nw);
this.NavSplitterEl.style.left=(nw-this.NavSplitter.splitterMargin)+"px";
this.NavSplitter.setHeight(_1400);
var _1403=(nw+this.navSplitterWidth)+"px";
this.ViewEl.style.left=_1403;
var _1404=Math.max(_13fc-(nw+this.navSplitterWidth+this.panelSplitterWidth+pw),this.minViewWidth);
this.ViewWidget.resizeTo(_1404,_1400);
this.PanelSplitterEl.style.left=(nw+this.navSplitterWidth+_1404-this.PanelSplitter.splitterMargin)+"px";
this.PanelSplitter.setHeight(_1400);
this.PanelEl.style.left=(nw+this.navSplitterWidth+_1404+this.panelSplitterWidth)+"px";
ws.style.setMarginBoxHeightFast(this.PanelEl,_1400);
this.PanelWidget.onResized();
var _1405=nw+this.navSplitterWidth+_1404+this.panelSplitterWidth+pw;
if(!this.settingsContainer){
this.settingsContainer=dojo.widget.byId("settingsContainer");
}
if(this.settingsContainer&&dojo.html.isShowing(this.settingsContainer.domNode)){
ws.style.setMarginBoxWidthFast(this.settingsContainer.domNode,dojo.html.getViewport().width);
ws.style.setMarginBoxHeightFast(this.settingsContainer.domNode,dojo.html.getViewport().height-(this.hatHeight+this.footerHeight+(this.spacerHeight*2)));
this.settingsContainer.onResized();
}
ws.style.setMarginBoxWidthFast(this.HatEl,_1405);
this.HatWidget.onResized();
ws.style.setMarginBoxWidthFast(this.FooterEl,_1405);
this.FooterEl.style.top=(this.hatHeight+_1400+(this.spacerHeight*2))+"px";
this.TodayCurtain.setSize(_13fc-nw,_1400+this.footerHeight+this.spacerHeight);
lat.stop(true);
},splitterResize:function(){
var lat=new ws.debug.latometer("WebSuite.splitterResize",true);
var _1407=dojo.html.getViewport().width;
var nw=ws.style.getMarginBoxWidthFast(this.NavEl);
var pw=ws.style.getMarginBoxWidthFast(this.PanelEl);
this.Navigation.onResized();
var _140a=(nw+this.navSplitterWidth)+"px";
this.ViewEl.style.left=_140a;
var _140b=Math.max(_1407-(nw+this.navSplitterWidth+this.panelSplitterWidth+pw),this.minViewWidth);
ws.style.setMarginBoxWidthFast(this.ViewEl,_140b);
this.ViewWidget.onResized();
this.PanelWidget.onResized();
lat.stop(true);
},windowResize:function(){
if(dojo.render.html.ie){
if(ws.WebSuite.resizeTimer!=null){
clearTimeout(ws.WebSuite.resizeTimer);
ws.WebSuite.resizeTimer=null;
}
ws.WebSuite.resizeTimer=setTimeout("ws.WebSuite._resize()",100);
}else{
ws.WebSuite.resize();
}
},initialize:function(){
try{
ws.WebSuite._initialize1();
dojo.lang.setTimeout(function(){
try{
ws.WebSuite._initialize2();
}
catch(ex){
DisplayAppLoadError(ex);
}
},50);
}
catch(ex){
DisplayAppLoadError(ex);
}
},_initialize1:function(){
this.theMailModel=new ws.mail.MailModel();
dojo.event.connect(this.theMailModel,"modelUpdated",this,"deferredInit");
dojo.event.connect(this.theMailModel,"inboxTypeUpdated",this,"inboxTypeUpdated");
this.theAddressModel=new ws.address.AddressModel(true);
this.theCalendarModel=new ws.calendar.CalendarViewModel();
dojo.event.connect(this.theCalendarModel,"searchUpdated",this,"deferredInitCal");
this.thePicturesModel=new ws.pictures.model();
},_initialize2:function(){
djConfig.parseWidgets=true;
dojo.hostenv.makeWidgets();
this.HatWidget=dojo.widget.byId("HatWidget");
this.ViewWidget=dojo.widget.byId("ws_view");
this.Navigation=dojo.widget.byId("ws_navpanel");
this.PanelWidget=dojo.widget.byId("ws_panelcontainer");
this.TodayCurtain=dojo.widget.byId("todayCurtain");
this.MessageListView=dojo.widget.byId("messageList");
this.NavSplitter=dojo.widget.byId("ws_navsplitter");
this.PanelSplitter=dojo.widget.byId("ws_panelsplitter");
this.addEditDialog=null;
this.inlineAddEventDialog=null;
this.eventQuickViewWidget=null;
this.quickAddWidget=null;
this.HatWidget.mailModel=this.theMailModel;
this.HatWidget.calendarModel=this.theCalendarModel;
this.HatWidget.searchMailCB=ws.lang.hitch(this,"mailSearch");
this.HatWidget.searchCalendarCB=ws.lang.hitch(this,"calendarSearch");
this.HatWidget.repaintAppplicationCB=ws.lang.hitch(this,"repaintApplication");
this.MessageListView.setModel(this.theMailModel);
this.MessageListView.getComposeCB=ws.lang.hitch(this,"getCompose","messagelist");
dojo.event.connect(this.MessageListView,"openMessage",this,"openMessage");
dojo.event.connect(this.MessageListView,"viewMessageSource",this,"viewMessageSource");
dojo.event.connect(this.MessageListView,"addContact",this,"addContact");
dojo.event.connect(this.MessageListView,"editContact",this,"editContactFromMessageList");
dojo.event.connect(this.MessageListView,"addToCalendar",this,"addToCalendar");
this.Navigation.setMailModel(this.theMailModel);
this.Navigation.setCalendarModel(this.theCalendarModel);
dojo.event.connect(this.Navigation,"composeMessage",this,"composeMessage");
dojo.event.connect(this.Navigation,"displayFolder",this,"displayFolder");
this.initializeSizing();
if(!Settings.PanelsVisible){
this.isPanelSplitterInitializing=true;
this.PanelSplitter.onCollapse();
}
dojo.event.topic.subscribe("Splitter/collapse",this,"onSplitterCollapse");
var _140c=dojo.byId("loadingCurtain");
_140c.style.display="none";
_140c.innerHTML="";
var app=ws.io.getQueryParameter("app");
if(app!=null){
this.selectAppQueryString(app);
}
var _140e=Settings.FirstLogin;
dojo.debug("checking login info"+_140e);
if(_140e){
if(Config.UseAIMFTUTip&&Config.EnableAIMPanel){
var _140f=dojo.widget.createWidget("ws:AIMFTUTip",null,document.body,"first");
var pos=dojo.html.abs(this.PanelWidget.quadNode);
dojo.html.placeOnScreen(_140f.domNode,pos.x-264,pos.y-32,0);
_140f.show();
}
if(Config.WelcomeToMailTour){
ws.widget.WelcomeDialog.alert(null,true);
}
ws.io.rpc({action:"LoginState",content:{FirstLogin:false},load:dojo.lang.hitch(this,function(data){
dojo.debug("FirstLogin:Success");
dojo.debugShallow(data);
}),error:dojo.lang.hitch(this,function(){
dojo.debug("FirstLogin:Error");
})});
}
if(dojo.render.html.ie){
dojo.event.browser.addListener(dojo.doc().body,"onKeyDown",dojo.lang.hitch(this,"onKeyPress"),false);
dojo.event.browser.addListener(dojo.doc().body,"onKeyPress",dojo.lang.hitch(this,"onKeyPress"),false);
}else{
dojo.event.browser.addListener(dojo.doc(),"onKeyPress",dojo.lang.hitch(this,"onKeyPress"),false);
}
},onSplitterCollapse:function(_1412){
if(_1412.id=="ws_panelsplitter"){
this.saveSplitterPrefs(_1412);
}
},splitterPrefsTimeout:null,splitterPrefsDelay:2000,saveSplitterPrefs:function(_1413){
if(this.splitterPrefsTimeout){
dojo.lang.clearTimeout(this.splitterPrefsTimeout);
}
this.splitterPrefsTimeout=dojo.lang.setTimeout(this,"_saveSplitterPrefs",this.splitterPrefsDelay,_1413);
},_saveSplitterPrefs:function(_1414){
this.splitterPrefsTimeout=null;
ws.io.rpc({action:"HiddenSettings",content:{PanelsVisible:!_1414.isCollapsed},load:dojo.lang.hitch(this,function(data){
dojo.debug("saveSplitterPrefs: "+data.toSource());
}),error:dojo.lang.hitch(this,function(){
dojo.debug("saveSplitterPrefs error");
})});
},restoreTodayCurtain:function(){
if(this.TodayCurtain.notShowing==true){
this.TodayCurtain.restore();
}
},deferredInit:function(){
dojo.event.disconnect(this.theMailModel,"modelUpdated",this,"deferredInit");
dojo.lang.setTimeout(dojo.lang.hitch(this,function(){
this.theAddressModel.deferredInit();
this.HatWidget.deferredInit();
}),3000);
ws.reporting.report("Initial View","Init");
},deferredInitCal:function(){
dojo.event.disconnect(this.theCalendarModel,"searchUpdated",this,"deferredInitCal");
dojo.lang.setTimeout(dojo.lang.hitch(this,function(){
this.HatWidget.deferredInitCal();
}),100);
},initializeSizing:function(){
this.HatEl=document.getElementById("ws_hat");
this.FooterEl=document.getElementById("ws_footer");
this.NavEl=document.getElementById("ws_nav");
this.NavSplitterEl=document.getElementById("ws_navsplitter");
this.ViewEl=dojo.widget.byId("ws_view").domNode;
this.PanelSplitterEl=document.getElementById("ws_panelsplitter");
this.PanelEl=document.getElementById("ws_panel");
this.SouthwestAdEl=document.getElementById("ws_southwestad");
this.TodayCurtainEl=dojo.widget.byId("todayCurtain").domNode;
dojo.event.topic.registerPublisher("wsresize",ws.WebSuite,"resize");
dojo.event.topic.subscribe("WSSessionExpired",ws.WebSuite,"handleExpiredSession");
this.navSplitterWidth=this.NavSplitter.splitterWidth;
this.panelSplitterWidth=this.PanelSplitter.splitterWidth;
this.hatHeight=ws.style.getMarginBoxHeightFast(this.HatEl);
this.southwestAdHeight=ws.style.getMarginBoxHeightFast(this.SouthwestAdEl);
this.footerHeight=ws.style.getMarginBoxHeightFast(this.FooterEl);
var top=(this.hatHeight+this.spacerHeight)+"px";
this.NavEl.style.top=top;
this.NavSplitterEl.style.top=top;
this.ViewEl.style.position="absolute";
this.ViewEl.style.top=top;
this.PanelSplitterEl.style.top=top;
this.PanelEl.style.top=top;
this.resize();
dojo.event.connect(window,"onresize",this,"windowResize");
dojo.event.topic.subscribe("Splitter/resize",this,"splitterResize");
dojo.event.connect(this,"splitterResize",turbo.aligner,"align");
dojo.event.connect(this,"_resize",turbo.aligner,"align");
},displayFolder:function(_1417){
this.selectTab("messageList",dojo.lang.hitch(this,function(){
var _1418=this.theMailModel.currentFolder;
this.MessageListView.displayFolder(_1417);
var _1419=(_1418==_1417)?"Message List":"Switch Folder";
ws.reporting.report(_1419,"Mail");
}));
},displayContactListView:function(){
this.selectTab("AddressList",function(){
dojo.widget.byId("AddressList").backToList();
});
},displayNewContactView:function(email){
this.selectTab("AddressList",function(){
var _141b=dojo.widget.byId("AddressList");
_141b.selectView("editContactWidget");
_141b.editContactWidget.showContact(null,null,true);
if(email){
_141b.editContactWidget.email1Input.value=email;
}
});
},displayNewDistListView:function(){
this.selectTab("AddressList",function(){
dojo.widget.byId("AddressList").selectView("distributionListWidget");
});
},openMessage:function(_141c,uid,_141e){
var _141f=Config.EnableInlinePrefsDialog&&!Settings.SeenInlinePrefsDialog;
if(_141e||(Settings.ReadInPopup&&!_141f)){
window.openerContext={model:this.theMailModel,picturesModel:this.thePicturesModel,folder:_141c,uid:uid,Settings:Settings};
ws.io.openWindow(Config.BaseMailPagesURL+"DisplayMessage.aspx","","status=yes,resizable=yes,left=5,top=5,width=885,height=606");
}else{
this._ensureTabExists("displayMessage",dojo.lang.hitch(this,function(){
dojo.widget.byId("displayMessage").displayMessage(_141c,uid,dojo.lang.hitch(this,function(){
this.selectTab("displayMessage",dojo.lang.hitch(this,function(){
if(_141f){
this.showInlinePrefsDialog();
}
}));
}));
}));
}
},hideMessage:function(){
this.selectTab("messageList",function(){
ws.reporting.report("Message List","Mail");
});
},viewMessageSource:function(_1420,uid){
var url=ws.string.substituteParams("%{0}ViewSource.aspx?user=%{1}&folder=%{2}&uid=%{3}",Config.BaseMailPagesURL,encodeURIComponent(ws.UserContext.UserUID),encodeURIComponent(_1420),encodeURIComponent(uid));
ws.io.openWindow(url,"","status=yes,resizable=yes,menubar=yes,scrollbars=yes");
ws.reporting.report("Message Source","Mail");
},composeMessage:function(evt){
var _1424=Config.EnableInlinePrefsDialog&&!Settings.SeenInlinePrefsDialog;
if(evt.ctrlKey||(dojo.render.os.mac&&evt.metaKey)||(Settings.ComposeInPopup&&!_1424)){
this.popupCompose(dojo.lang.hitch(this,function(_1425){
if(dojo.widget.byId("AddressList")){
_1425.reset(this.getContacts());
}else{
_1425.reset();
}
}));
}else{
this.composeSrc="messagelist";
this.selectTab("composeMessage",dojo.lang.hitch(this,function(){
if(dojo.widget.byId("AddressList")){
dojo.widget.byId("composeMessage").reset(this.getContacts());
this.unselectContacts();
}else{
dojo.widget.byId("composeMessage").reset({backToString:"setFolder"});
}
if(_1424){
this.showInlinePrefsDialog();
}
}));
}
evt.preventDefault();
},getCompose:function(src,_1427){
this.ensureLayersLoaded(dojo.lang.hitch(this,function(){
if(Settings.ComposeInPopup){
this.popupCompose(_1427);
}else{
this.selectTab("composeMessage",dojo.lang.hitch(this,function(){
this.composeSrc=src;
_1427(dojo.widget.byId("composeMessage"));
}));
}
}));
},reuseComposeWindow:function(email){
id=dojo.widget.byId("composeMessage");
id.addEmail(email);
},isComposeOpen:function(){
var _1429=this.ViewWidget.selectedChild;
if(_1429=="composeMessage"){
var _142a=dojo.widget.byId("composeMessage");
if(_142a.layoutWidget==_142a.notebook.selectedChildWidget){
return true;
}else{
return false;
}
}else{
return false;
}
},getContacts:function(){
var _142b={};
_142b.backToString="setFolder";
if(dojo.widget.byId("AddressList").model.getSelectedUids().length){
var _142c=dojo.widget.byId("AddressList");
var _142d=_142c.model.getActiveAbList();
var _142e=_142c.model.getOffsetsForUids(_142c.model.getSelectedUids());
var _142f=null;
var _1430="";
var _1431="";
for(var i=0;i<_142e.length;i++){
_142f=_142d.getRecordAtOffset(_142e[i]);
_1430=_142f.screenName||_142f.email1||_142f.email2||_142f.composeValue||"";
if(!dojo.string.isBlank(_1430)){
_1431+=_1430+", ";
}
}
if(!dojo.string.isBlank(_1431)){
_142b.to=_1431;
_142b.isDirty=true;
}
}
return _142b;
},unselectContacts:function(){
dojo.debug("Websuite.js: unselectContacts");
ws.WebSuite.theAddressModel.deselectAll();
},isComposeInTransition:function(){
if(this.isComposeOpen()){
return dojo.widget.byId("composeMessage").inTransition;
}else{
return false;
}
},popupCompose:function(_1433){
window.composeContext={model:this.theMailModel,picturesModel:this.thePicturesModel,callback:_1433};
ws.io.openWindow(Config.BaseMailPagesURL+"ComposeMessage.aspx","","status=yes,resizable=yes,left=5,top=5,width=885,height=606");
},hideCompose:function(_1434,_1435){
if(this.composeSrc=="address"){
this.selectTab("AddressList",function(){
if(_1434){
_1434();
}
ws.reporting.report("Contact List","Addresses");
});
}else{
if(this.composeSrc=="display"&&!_1435){
this.selectTab("displayMessage",function(){
if(_1434){
_1434();
}
});
}else{
if(this.composeSrc=="calendar"){
this.selectTab("calendarView",function(){
if(_1434){
_1434();
}
dojo.widget.byId("calendarView").reportCurrentView();
});
}else{
this.selectTab("messageList",function(){
if(_1434){
_1434();
}
ws.reporting.report("Message List","Mail");
});
}
}
}
},mailSearch:function(_1436,query){
var _1438=this.ViewWidget.selectedChild;
if(_1438!="messageList"&&_1438!="displayMessage"){
this.theMailModel.setFolder(ws.settings.getInboxFolderName());
}
this.selectTab("messageList",ws.lang.hitch(this,"mailSearchHelper",_1436,query));
},mailSearchHelper:function(_1439,query){
var _143b=this.ViewWidget.selectedChild;
if(_143b!="messageList"&&_143b!="displayMessage"){
this.theMailModel.setFolder(ws.settings.getInboxFolderName());
}
this.theMailModel.search(query,_1439);
this.selectTab("messageList",function(){
ws.reporting.report("Search Mail","Mail");
});
},calendarSearch:function(_143c,query){
var _143e=this.ViewWidget.selectedChild;
this.selectTab("calendarView",function(){
dojo.widget.byId("calendarView").selectSearchViewWithArg(_143c,query);
});
},addToCalendar:function(_143f,uid){
this.theMailModel.getMessage({folder:_143f,uid:uid,load:dojo.lang.hitch(this,function(data){
ws.WebSuite.createAddEditWidget(dojo.lang.hitch(this,function(){
var _1442=dojo.html.createNodesFromText(data.body);
var _1443="";
if(_1442){
for(var i=0;i<_1442.length;i++){
_1443+=dojo.html.renderedTextContent(_1442[i]);
}
}
this.addEditDialog.show(2,{summary:data.subject,notes:_1443});
}));
})});
},repaintApplication:function(){
dojo.debug("repaintApplication");
var _1445=this.ViewWidget.selectedChild;
if(_1445=="calendarView"){
dojo.widget.byId("calendarView").repaint();
}else{
if(_1445=="messageList"){
if(this._inboxTypeUpdated){
this.displayFolder(ws.settings.getInboxFolderName());
this._inboxTypeUpdated=false;
}else{
if(Settings.ShowStandardInbox&&(this.theMailModel.currentFolder=="New Mail"||this.theMailModel.currentFolder=="Old Mail")){
this.displayFolder(ws.settings.getInboxFolderName());
}else{
if(!Settings.ShowStandardInbox&&this.theMailModel.currentFolder=="Inbox"){
this.displayFolder(ws.settings.getInboxFolderName());
}
}
}
}else{
if(_1445=="AddressList"){
dojo.widget.byId("AddressList").layout();
}
}
}
},inboxTypeUpdated:function(){
this._inboxTypeUpdated=true;
},editContact:function(uid,data,_1448){
var _1449=dojo.widget.byId("AddressList");
if(_1449&&_1449.editContactWidget){
this.selectTab("AddressList",function(){
_1449.editContact(uid,data,_1448);
});
}else{
this._ensureTabExists("AddressList",dojo.lang.hitch(this,function(){
_1449=dojo.widget.byId("AddressList");
_1449.createEditContactWidget();
this.selectTab("AddressList",function(){
_1449.editContact(uid,data,_1448);
});
}));
}
},editContactFromMessageList:function(rec){
this.theAddressModel.getContact({uid:rec.uid,load:dojo.lang.hitch(this,function(data){
this.selectTab("AddressList",function(){
dojo.widget.byId("AddressList").editContact(rec.uid,data,true);
});
})});
},editDistributionList:function(uid){
var _144d=dojo.widget.byId("AddressList");
if(_144d&&_144d.distributionListWidget){
this.selectTab("AddressList",function(){
_144d.editDistributionList(uid);
});
}else{
this._ensureTabExists("AddressList",dojo.lang.hitch(this,function(){
_144d=dojo.widget.byId("AddressList");
_144d.createDistributionList();
this.selectTab("AddressList",function(){
_144d.editDistributionList(uid);
});
}));
}
},addContact:function(email){
this.getAddEditWidget(dojo.lang.hitch(this,function(){
this.displayNewContactView(email);
}));
},sharedGroup:function(name){
this.selectTab("AddressList",function(){
dojo.widget.byId("AddressList").sharedGroup(name);
});
},selectCalendarApp:function(){
this.selectTab("calendarView",function(){
dojo.widget.byId("calendarView").repaint();
});
},selectAppQueryString:function(qapp){
var app=null;
if(null!=qapp){
if(qapp=="ab"||qapp=="abook"||qapp=="addresses"){
app="AddressList";
}else{
if(qapp=="calendar"||qapp=="cal"){
app="calendarView";
}else{
if(qapp=="mail"){
app="messageList";
var _1452=ws.io.getQueryParameter("folder");
if(_1452&&!dojo.string.isBlank(_1452)){
this.MessageListView.displayFolder(_1452);
}
var _1453=ws.io.getQueryParameter("searchIn");
var query=ws.io.getQueryParameter("query");
if(_1453&&query){
this.theMailModel.search(query,_1453);
}
}else{
if(qapp=="options"||qapp=="settings"){
app=null;
}
}
}
}
}
if(app!=null){
if("calendarView"==app){
this.Navigation.showCalendar(true);
}
if("messageList"!=app){
this.MessageListView.hide();
}
this.selectTab(app);
}
},selectTab:function(_1455,_1456){
var _1457=dojo.widget.byId(this.ViewWidget.selectedChild);
if(_1457.confirmClose){
_1457.confirmClose(dojo.lang.hitch(this,function(){
this._selectTab(_1455,_1456);
}));
}else{
this._selectTab(_1455,_1456);
}
},_selectTab:function(_1458,_1459){
if(_1458==this.ViewWidget.selectedChild){
if(_1459){
_1459();
}
}else{
this._ensureTabExists(_1458,_1459,true);
}
},_ensureTabExists:function(_145a,_145b,_145c){
this.ensureLayersLoaded(dojo.lang.hitch(this,function(){
var tab=dojo.widget.byId(_145a);
if(!tab){
dojo.event.topic.publish("WSFeedbackStart",Config.Strings.Loading);
dojo.lang.setTimeout(dojo.lang.hitch(this,function(){
var _145e={id:_145a};
switch(_145a){
case "displayMessage":
_145e.model=this.theMailModel;
_145e.picturesModel=this.thePicturesModel;
_145e.backToListCB=ws.lang.hitch(this,"hideMessage");
_145e.getComposeCB=ws.lang.hitch(this,"getCompose","display");
_145e.getAddEditWidgetCB=ws.lang.hitch(this,"getAddEditWidget");
_145e.addEditDialog=this.addEditDialog;
_145e.calendarModel=this.theCalendarModel;
_145e.beaconSuffix="Inline";
tab=dojo.widget.createWidget("ws:DisplayMessageWidget",_145e);
break;
case "composeMessage":
_145e.model=this.theMailModel;
_145e.picturesModel=this.thePicturesModel;
_145e.cancelCB=ws.lang.hitch(this,"hideCompose");
_145e.beaconSuffix="Inline";
tab=dojo.widget.createWidget("ws:ComposeMessageWidget",_145e);
break;
case "AddressList":
tab=dojo.widget.createWidget("ws:AddressListView",_145e);
tab.setModel(this.theAddressModel);
tab.getComposeCB=ws.lang.hitch(this,"getCompose","address");
break;
case "calendarView":
this.loadSettings(false,"ws");
tab=dojo.widget.createWidget("ws:CalendarViewWidget",_145e);
tab.setModel(this.theCalendarModel);
tab.getAddEditWidgetCB=ws.lang.hitch(this,"getAddEditWidget");
tab.getComposeCB=ws.lang.hitch(this,"getCompose","calendar");
tab.getInlineAddEventWidgetCB=ws.lang.hitch(this,"getInlineAddEventWidget");
tab.getEventQuickViewWidgetCB=ws.lang.hitch(this,"getEventQuickViewWidget");
tab.getQuickAddWidgetCB=ws.lang.hitch(this,"getQuickAddWidget");
this.Navigation.showCalendarIndexCB=ws.lang.hitch(tab,"isUpcomingView");
break;
case "addCalendar":
tab=dojo.widget.createWidget("ws:EditCalendar",_145e);
tab.setModel(this.theCalendarModel);
break;
case "editCalendar":
tab=dojo.widget.createWidget("ws:EditCalendar",_145e);
tab.setModel(this.theCalendarModel);
break;
case "feedsView":
tab=dojo.widget.createWidget("ws:FeedsPanel",_145e);
break;
}
if(tab.init){
tab.init();
}
this.ViewWidget.addChild(tab);
if(_145c){
this.updateSearchButton((_145a=="calendarView"));
this.ViewWidget.selectChild(tab);
}
if(_145b){
_145b();
}
dojo.event.topic.publish("WSFeedbackEnd",Config.Strings.Loading);
}),0);
}else{
if(_145c){
this.updateSearchButton((_145a=="calendarView"));
this.ViewWidget.selectChild(tab);
}
if(_145b){
_145b();
}
}
}));
},updateSearchButton:function(_145f){
if(Config.ShowCalendarSearchButton){
if(_145f){
this.HatWidget.setSearchScope("calendar",Config.Strings.Calendar);
}else{
this.HatWidget.setSearchScope("alltext",Config.Strings.Mail);
}
}
},getAddEditWidget:function(_1460){
if(this.addEditDialog){
if(_1460){
_1460();
}
}else{
dojo.event.topic.publish("WSFeedbackStart",Config.Strings.Loading);
dojo.lang.setTimeout(this,"createAddEditWidget",0,dojo.lang.hitch(this,function(){
if(_1460){
_1460();
}
dojo.event.topic.publish("WSFeedbackEnd",Config.Strings.Loading);
}));
}
},createAddEditWidget:function(_1461){
this.ensureLayersLoaded(dojo.lang.hitch(this,function(){
dojo.debug("Created new AddEditWidget.");
this.addEditDialog=dojo.widget.createWidget("ws:AddEventDialog",null,document.body,"first");
this.addEditDialog.setModel(this.theCalendarModel);
if(_1461){
_1461();
}
}));
},getEventQuickViewWidget:function(_1462){
if(this.eventQuickViewWidget){
if(_1462){
_1462();
}
}else{
dojo.event.topic.publish("WSFeedbackStart",Config.Strings.Loading);
dojo.lang.setTimeout(this,"createEventQuickViewWidget",0,dojo.lang.hitch(this,function(){
if(_1462){
_1462();
}
dojo.event.topic.publish("WSFeedbackEnd",Config.Strings.Loading);
}));
}
},createEventQuickViewWidget:function(_1463){
this.ensureLayersLoaded(dojo.lang.hitch(this,function(){
dojo.debug("Created new EventQuickViewWidget()");
this.eventQuickViewWidget=dojo.widget.createWidget("ws:EventQuickViewWidget",null,document.body,"first");
this.eventQuickViewWidget.setModel(this.theCalendarModel);
if(_1463){
_1463();
}
}));
},getInlineAddEventWidget:function(_1464){
if(this.inlineAddEventDialog){
if(_1464){
_1464();
}
}else{
dojo.event.topic.publish("WSFeedbackStart",Config.Strings.Loading);
dojo.lang.setTimeout(this,"createInlineAddEventWidget",0,dojo.lang.hitch(this,function(){
if(_1464){
_1464();
}
dojo.event.topic.publish("WSFeedbackEnd",Config.Strings.Loading);
}));
}
},createInlineAddEventWidget:function(_1465){
this.ensureLayersLoaded(dojo.lang.hitch(this,function(){
dojo.debug("Created new InlineAddEventWidget.");
this.inlineAddEventDialog=dojo.widget.createWidget("ws:InlineAddEvent",null,document.body,"first");
this.inlineAddEventDialog.setModel(this.theCalendarModel);
if(_1465){
_1465();
}
}));
},getQuickAddWidget:function(_1466){
if(this.quickAddWidget){
if(_1466){
_1466();
}
}else{
dojo.event.topic.publish("WSFeedbackStart",Config.Strings.Loading);
dojo.lang.setTimeout(this,"createQuickAddWidget",0,dojo.lang.hitch(this,function(){
if(_1466){
_1466();
}
dojo.event.topic.publish("WSFeedbackEnd",Config.Strings.Loading);
}));
}
},createQuickAddWidget:function(_1467){
this.ensureLayersLoaded(dojo.lang.hitch(this,function(){
dojo.debug("Created new QuickAddWidget.");
this.quickAddWidget=dojo.widget.createWidget("ws:QuickAdd",null,document.body,"first");
this.quickAddWidget.setModel(this.theCalendarModel);
if(_1467){
_1467();
}
}));
},showLoginPanel:function(msg,_1469,_146a,_146b){
this.ensureLayersLoaded(dojo.lang.hitch(this,function(){
if(!this.miniLoginWidget){
this.miniLoginWidget=dojo.widget.createWidget("ws:MiniLogin");
}
this.miniLoginWidget.show(msg,this.miniSnsLoginUrl,_146a,_1469);
if(_146b){
_146b();
}
}));
},handleExpiredSession:function(msg){
if(this.miniLoginWidget&&this.miniLoginWidget.isShowing()){
return;
}
this.showLoginPanel(msg,ws.io.getObjectCookie("csts").ausn,false,dojo.lang.hitch(this,function(){
this.miniLoginWidget.moveOffscreen();
var _146d=dojo.widget.byId(this.ViewWidget.selectedChild);
if(_146d.onSessionExpired){
_146d.onSessionExpired(dojo.lang.hitch(this.miniLoginWidget,"moveOnscreen"));
}else{
this.miniLoginWidget.moveOnscreen();
}
}));
},isCalendarHidden:function(){
return ("calendarView"!=this.ViewWidget.selectedChild);
},loadSettings:function(_146e,scope){
if(typeof scope=="undefined"){
scope="core";
}
if(_146e||Settings.isLoaded!=scope){
var _1470=(scope=="core")?"":("scope="+scope+"&");
var uri=Config.BasePagesURL+"common/settings.js.aspx?"+_1470+"rand="+Math.round(Math.random()*100000);
var _1472=dojo.hostenv.getText(uri,null,true);
if(_1472){
dj_eval(_1472);
}else{
dojo.debug("unable to reload settings: "+uri);
}
}
},ensureLayersLoaded:function(_1473){
dojo["require"]("ws.layers.DisplayMessage");
dojo["require"]("ws.layers.ComposeMessage");
dojo["require"]("ws.layers.dojo2");
if(_1473){
dojo.addOnLoad(_1473);
}
},showInlinePrefsDialog:function(){
var dlg=dojo.widget.createWidget("ws:InlinePrefsDialog",null,dojo.body(),"first");
dlg.show();
},isTargetAnInputElement:function(evt){
var _1476=false;
if(evt.target&&evt.target.nodeName){
var _1477=evt.target.nodeName.toLowerCase();
_1476=_1477.indexOf("input")>=0?true:false;
if(!_1476){
_1476=_1477.indexOf("textarea")>=0?true:false;
}
}
return _1476;
},onKeyPress:function(evt){
if(Config.EnableKeyboardShortcuts&&evt.key&&dojo.lang.isString(evt.key)&&!this.isTargetAnInputElement(evt)&&!(evt.ctrlKey||evt.metaKey)&&evt.altKey){
switch(evt.key.toLowerCase()){
case Config.Strings.KeyWriteMail:
this.composeMessage(evt);
break;
}
}
var _1479=true;
if(evt.key&&this.isTargetAnInputElement(evt)){
_1479=false;
}
if(_1479){
dojo.event.topic.publish("Suite/onKeyOnPress",evt);
this.processKeyPress(evt);
}
if(evt.key==dojo.event.browser.keys.KEY_UP_ARROW||evt.key==dojo.event.browser.keys.KEY_DOWN_ARROW||evt.key==dojo.event.browser.keys.KEY_PAGE_UP||evt.key==dojo.event.browser.keys.KEY_PAGE_DOWN||evt.key==dojo.event.browser.keys.KEY_HOME||evt.key==dojo.event.browser.keys.KEY_END){
evt.preventDefault();
}
evt.stopPropagation();
},processKeyPress:function(evt){
},testingOnlyInit:function(){
this.theMailModel=new ws.mail.MailModel();
this.theAddressModel=new ws.address.AddressModel();
dojo.event.connect(this.theMailModel,"modelUpdated",this,"deferredInit");
this.MessageListView=dojo.widget.byId("messageList");
this.MessageListView.setModel(this.theMailModel);
this.MessageListView.getComposeCB=ws.lang.hitch(this,"getCompose","messagelist");
dojo.event.connect(this.MessageListView,"openMessage",this,"openMessage");
}};
dojo.provide("dojo.widget.PopupContainer");
dojo.declare("dojo.widget.PopupContainerBase",null,function(){
this.queueOnAnimationFinish=[];
},{isShowingNow:false,currentSubpopup:null,beginZIndex:1000,parentPopup:null,parent:null,popupIndex:0,aroundBox:dojo.html.boxSizing.BORDER_BOX,openedForWindow:null,processKey:function(evt){
return false;
},applyPopupBasicStyle:function(){
with(this.domNode.style){
display="none";
position="absolute";
}
},aboutToShow:function(){
},open:function(x,y,_147e,_147f,_1480,_1481){
if(this.isShowingNow){
return;
}
if(this.animationInProgress){
this.queueOnAnimationFinish.push(this.open,arguments);
return;
}
this.aboutToShow();
var _1482=false,node,_1484;
if(typeof x=="object"){
node=x;
_1484=_147f;
_147f=_147e;
_147e=y;
_1482=true;
}
this.parent=_147e;
dojo.body().appendChild(this.domNode);
_147f=_147f||_147e["domNode"]||[];
var _1485=null;
this.isTopLevel=true;
while(_147e){
if(_147e!==this&&(_147e.setOpenedSubpopup!=undefined&&_147e.applyPopupBasicStyle!=undefined)){
_1485=_147e;
this.isTopLevel=false;
_1485.setOpenedSubpopup(this);
break;
}
_147e=_147e.parent;
}
this.parentPopup=_1485;
this.popupIndex=_1485?_1485.popupIndex+1:1;
if(this.isTopLevel){
var _1486=dojo.html.isNode(_147f)?_147f:null;
dojo.widget.PopupManager.opened(this,_1486);
}
if(this.isTopLevel&&!dojo.withGlobal(this.openedForWindow||dojo.global(),dojo.html.selection.isCollapsed)){
this._bookmark=dojo.withGlobal(this.openedForWindow||dojo.global(),dojo.html.selection.getBookmark);
}else{
this._bookmark=null;
}
if(_147f instanceof Array){
_147f={left:_147f[0],top:_147f[1],width:0,height:0};
}
with(this.domNode.style){
display="";
zIndex=this.beginZIndex+this.popupIndex;
}
if(_1482){
this.move(node,_1481,_1484);
}else{
this.move(x,y,_1481,_1480);
}
this.domNode.style.display="none";
this.explodeSrc=_147f;
this.show();
this.isShowingNow=true;
},move:function(x,y,_1489,_148a){
var _148b=(typeof x=="object");
if(_148b){
var _148c=_1489;
var node=x;
_1489=y;
if(!_148c){
_148c={"BL":"TL","TL":"BL"};
}
dojo.html.placeOnScreenAroundElement(this.domNode,node,_1489,this.aroundBox,_148c);
}else{
if(!_148a){
_148a="TL,TR,BL,BR";
}
dojo.html.placeOnScreen(this.domNode,x,y,_1489,true,_148a);
}
},close:function(force){
if(force){
this.domNode.style.display="none";
}
if(this.animationInProgress){
this.queueOnAnimationFinish.push(this.close,[]);
return;
}
this.closeSubpopup(force);
this.hide();
if(this.bgIframe){
this.bgIframe.hide();
this.bgIframe.size({left:0,top:0,width:0,height:0});
}
if(this.isTopLevel){
dojo.widget.PopupManager.closed(this);
}
this.isShowingNow=false;
if(this.parent){
setTimeout(dojo.lang.hitch(this,function(){
try{
if(this.parent["focus"]){
this.parent.focus();
}else{
this.parent.domNode.focus();
}
}
catch(e){
dojo.debug("No idea how to focus to parent",e);
}
}),10);
}
if(this._bookmark&&dojo.withGlobal(this.openedForWindow||dojo.global(),dojo.html.selection.isCollapsed)){
if(this.openedForWindow){
this.openedForWindow.focus();
}
try{
dojo.withGlobal(this.openedForWindow||dojo.global(),"moveToBookmark",dojo.html.selection,[this._bookmark]);
}
catch(e){
}
}
this._bookmark=null;
},closeAll:function(force){
if(this.parentPopup){
this.parentPopup.closeAll(force);
}else{
this.close(force);
}
},setOpenedSubpopup:function(popup){
this.currentSubpopup=popup;
},closeSubpopup:function(force){
if(this.currentSubpopup==null){
return;
}
this.currentSubpopup.close(force);
this.currentSubpopup=null;
},onShow:function(){
dojo.widget.PopupContainer.superclass.onShow.apply(this,arguments);
this.openedSize={w:this.domNode.style.width,h:this.domNode.style.height};
if(dojo.render.html.ie){
if(!this.bgIframe){
this.bgIframe=new dojo.html.BackgroundIframe();
this.bgIframe.setZIndex(this.domNode);
}
this.bgIframe.size(this.domNode);
this.bgIframe.show();
}
this.processQueue();
},processQueue:function(){
if(!this.queueOnAnimationFinish.length){
return;
}
var func=this.queueOnAnimationFinish.shift();
var args=this.queueOnAnimationFinish.shift();
func.apply(this,args);
},onHide:function(){
dojo.widget.HtmlWidget.prototype.onHide.call(this);
if(this.openedSize){
with(this.domNode.style){
width=this.openedSize.w;
height=this.openedSize.h;
}
}
this.processQueue();
}});
dojo.widget.defineWidget("dojo.widget.PopupContainer",[dojo.widget.HtmlWidget,dojo.widget.PopupContainerBase],{isContainer:true,fillInTemplate:function(){
this.applyPopupBasicStyle();
dojo.widget.PopupContainer.superclass.fillInTemplate.apply(this,arguments);
}});
dojo.widget.PopupManager=new function(){
this.currentMenu=null;
this.currentButton=null;
this.currentFocusMenu=null;
this.focusNode=null;
this.registeredWindows=[];
this.registerWin=function(win){
if(!win.__PopupManagerRegistered){
dojo.event.connect(win.document,"onmousedown",this,"onClick");
dojo.event.connect(win,"onscroll",this,"onClick");
dojo.event.connect(win.document,"onkey",this,"onKey");
win.__PopupManagerRegistered=true;
this.registeredWindows.push(win);
}
};
this.registerAllWindows=function(_1495){
if(!_1495){
_1495=dojo.html.getDocumentWindow(window.top&&window.top.document||window.document);
}
this.registerWin(_1495);
for(var i=0;i<_1495.frames.length;i++){
try{
var win=dojo.html.getDocumentWindow(_1495.frames[i].document);
if(win){
this.registerAllWindows(win);
}
}
catch(e){
}
}
};
this.unRegisterWin=function(win){
if(win.__PopupManagerRegistered){
dojo.event.disconnect(win.document,"onmousedown",this,"onClick");
dojo.event.disconnect(win,"onscroll",this,"onClick");
dojo.event.disconnect(win.document,"onkey",this,"onKey");
win.__PopupManagerRegistered=false;
}
};
this.unRegisterAllWindows=function(){
for(var i=0;i<this.registeredWindows.length;++i){
this.unRegisterWin(this.registeredWindows[i]);
}
this.registeredWindows=[];
};
dojo.addOnLoad(this,"registerAllWindows");
dojo.addOnUnload(this,"unRegisterAllWindows");
this.closed=function(menu){
if(this.currentMenu==menu){
this.currentMenu=null;
this.currentButton=null;
this.currentFocusMenu=null;
}
};
this.opened=function(menu,_149c){
if(menu==this.currentMenu){
return;
}
if(this.currentMenu){
this.currentMenu.close();
}
this.currentMenu=menu;
this.currentFocusMenu=menu;
this.currentButton=_149c;
};
this.setFocusedMenu=function(menu){
this.currentFocusMenu=menu;
};
this.onKey=function(e){
if(!e.key){
return;
}
if(!this.currentMenu||!this.currentMenu.isShowingNow){
return;
}
var m=this.currentFocusMenu;
while(m){
if(m.processKey(e)){
e.preventDefault();
e.stopPropagation();
break;
}
m=m.parentPopup||m.parentMenu;
}
},this.onClick=function(e){
if(!this.currentMenu){
return;
}
var _14a1=dojo.html.getScroll().offset;
var m=this.currentMenu;
while(m){
if(dojo.html.overElement(m.domNode,e)||dojo.html.isDescendantOf(e.target,m.domNode)){
return;
}
m=m.currentSubpopup;
}
if(this.currentButton&&dojo.html.overElement(this.currentButton,e)){
return;
}
this.currentMenu.closeAll(true);
};
};
dojo.provide("dojo.widget.html.layout");
dojo.widget.html.layout=function(_14a3,_14a4,_14a5){
dojo.html.addClass(_14a3,"dojoLayoutContainer");
_14a4=dojo.lang.filter(_14a4,function(child,idx){
child.idx=idx;
return dojo.lang.inArray(["top","bottom","left","right","client","flood"],child.layoutAlign);
});
if(_14a5&&_14a5!="none"){
var rank=function(child){
switch(child.layoutAlign){
case "flood":
return 1;
case "left":
case "right":
return (_14a5=="left-right")?2:3;
case "top":
case "bottom":
return (_14a5=="left-right")?3:2;
default:
return 4;
}
};
_14a4.sort(function(a,b){
return (rank(a)-rank(b))||(a.idx-b.idx);
});
}
var f={top:dojo.html.getPixelValue(_14a3,"padding-top",true),left:dojo.html.getPixelValue(_14a3,"padding-left",true)};
dojo.lang.mixin(f,dojo.html.getContentBox(_14a3));
dojo.lang.forEach(_14a4,function(child){
var elm=child.domNode;
var pos=child.layoutAlign;
with(elm.style){
left=f.left+"px";
top=f.top+"px";
bottom="auto";
right="auto";
}
dojo.html.addClass(elm,"dojoAlign"+dojo.string.capitalize(pos));
if((pos=="top")||(pos=="bottom")){
dojo.html.setMarginBox(elm,{width:f.width});
var h=dojo.html.getMarginBox(elm).height;
f.height-=h;
if(pos=="top"){
f.top+=h;
}else{
elm.style.top=f.top+f.height+"px";
}
if(child.onResized){
child.onResized();
}
}else{
if(pos=="left"||pos=="right"){
var w=dojo.html.getMarginBox(elm).width;
if(child.resizeTo){
child.resizeTo(w,f.height);
}else{
dojo.html.setMarginBox(elm,{width:w,height:f.height});
}
f.width-=w;
if(pos=="left"){
f.left+=w;
}else{
elm.style.left=f.left+f.width+"px";
}
}else{
if(pos=="flood"||pos=="client"){
if(child.resizeTo){
child.resizeTo(f.width,f.height);
}else{
dojo.html.setMarginBox(elm,{width:f.width,height:f.height});
}
}
}
}
});
};
dojo.html.insertCssText(".dojoLayoutContainer{ position: relative; display: block; overflow: hidden; }\n"+"body .dojoAlignTop, body .dojoAlignBottom, body .dojoAlignLeft, body .dojoAlignRight { position: absolute; overflow: hidden; }\n"+"body .dojoAlignClient { position: absolute }\n"+".dojoAlignClient { overflow: auto; }\n");
dojo.provide("dojo.widget.PageContainer");
dojo.widget.defineWidget("dojo.widget.PageContainer",dojo.widget.HtmlWidget,{isContainer:true,doLayout:true,templateString:"<div dojoAttachPoint='containerNode'></div>",selectedChild:"",fillInTemplate:function(args,frag){
var _14b4=this.getFragNodeRef(frag);
dojo.html.copyStyle(this.domNode,_14b4);
dojo.widget.PageContainer.superclass.fillInTemplate.apply(this,arguments);
},postCreate:function(args,frag){
if(this.children.length){
dojo.lang.forEach(this.children,this._setupChild,this);
var _14b7;
if(this.selectedChild){
this.selectChild(this.selectedChild);
}else{
for(var i=0;i<this.children.length;i++){
if(this.children[i].selected){
this.selectChild(this.children[i]);
break;
}
}
if(!this.selectedChildWidget){
this.selectChild(this.children[0]);
}
}
}
},addChild:function(child){
dojo.widget.PageContainer.superclass.addChild.apply(this,arguments);
this._setupChild(child);
this.onResized();
if(!this.selectedChildWidget){
this.selectChild(child);
}
},_setupChild:function(page){
page.hide();
page.domNode.style.position="relative";
dojo.event.topic.publish(this.widgetId+"-addChild",page);
},removeChild:function(page){
dojo.widget.PageContainer.superclass.removeChild.apply(this,arguments);
if(this._beingDestroyed){
return;
}
dojo.event.topic.publish(this.widgetId+"-removeChild",page);
this.onResized();
if(this.selectedChildWidget===page){
this.selectedChildWidget=undefined;
if(this.children.length>0){
this.selectChild(this.children[0],true);
}
}
},selectChild:function(page,_14bd){
page=dojo.widget.byId(page);
this.correspondingPageButton=_14bd;
if(this.selectedChildWidget){
this._hideChild(this.selectedChildWidget);
}
this.selectedChildWidget=page;
this.selectedChild=page.widgetId;
this._showChild(page);
page.isFirstChild=(page==this.children[0]);
page.isLastChild=(page==this.children[this.children.length-1]);
dojo.event.topic.publish(this.widgetId+"-selectChild",page);
},forward:function(){
var index=dojo.lang.find(this.children,this.selectedChildWidget);
this.selectChild(this.children[index+1]);
},back:function(){
var index=dojo.lang.find(this.children,this.selectedChildWidget);
this.selectChild(this.children[index-1]);
},onResized:function(){
if(this.doLayout&&this.selectedChildWidget){
with(this.selectedChildWidget.domNode.style){
top=dojo.html.getPixelValue(this.containerNode,"padding-top",true);
left=dojo.html.getPixelValue(this.containerNode,"padding-left",true);
}
var _14c0=dojo.html.getContentBox(this.containerNode);
this.selectedChildWidget.resizeTo(_14c0.width,_14c0.height);
}
},_showChild:function(page){
if(this.doLayout){
var _14c2=dojo.html.getContentBox(this.containerNode);
page.resizeTo(_14c2.width,_14c2.height);
}
page.selected=true;
page.show();
},_hideChild:function(page){
page.selected=false;
page.hide();
},closeChild:function(page){
var _14c5=page.onClose(this,page);
if(_14c5){
this.removeChild(page);
page.destroy();
}
},destroy:function(){
this._beingDestroyed=true;
dojo.event.topic.destroy(this.widgetId+"-addChild");
dojo.event.topic.destroy(this.widgetId+"-removeChild");
dojo.event.topic.destroy(this.widgetId+"-selectChild");
dojo.widget.PageContainer.superclass.destroy.apply(this,arguments);
}});
dojo.widget.defineWidget("dojo.widget.PageController",dojo.widget.HtmlWidget,{templateString:"<span wairole='tablist' dojoAttachEvent='onKey'></span>",isContainer:true,containerId:"",buttonWidget:"PageButton","class":"dojoPageController",fillInTemplate:function(){
dojo.html.addClass(this.domNode,this["class"]);
dojo.widget.wai.setAttr(this.domNode,"waiRole","role","tablist");
},postCreate:function(){
this.pane2button={};
var _14c6=dojo.widget.byId(this.containerId);
if(_14c6){
dojo.lang.forEach(_14c6.children,this.onAddChild,this);
}
dojo.event.topic.subscribe(this.containerId+"-addChild",this,"onAddChild");
dojo.event.topic.subscribe(this.containerId+"-removeChild",this,"onRemoveChild");
dojo.event.topic.subscribe(this.containerId+"-selectChild",this,"onSelectChild");
},destroy:function(){
dojo.event.topic.unsubscribe(this.containerId+"-addChild",this,"onAddChild");
dojo.event.topic.unsubscribe(this.containerId+"-removeChild",this,"onRemoveChild");
dojo.event.topic.unsubscribe(this.containerId+"-selectChild",this,"onSelectChild");
dojo.widget.PageController.superclass.destroy.apply(this,arguments);
},onAddChild:function(page){
var _14c8=dojo.widget.createWidget(this.buttonWidget,{label:page.label,closeButton:page.closable});
this.addChild(_14c8);
this.domNode.appendChild(_14c8.domNode);
this.pane2button[page]=_14c8;
page.controlButton=_14c8;
var _this=this;
dojo.event.connect(_14c8,"onClick",function(){
_this.onButtonClick(page);
});
dojo.event.connect(_14c8,"onCloseButtonClick",function(){
_this.onCloseButtonClick(page);
});
},onRemoveChild:function(page){
if(this._currentChild==page){
this._currentChild=null;
}
var _14cb=this.pane2button[page];
if(_14cb){
_14cb.destroy();
}
this.pane2button[page]=null;
},onSelectChild:function(page){
if(this._currentChild){
var _14cd=this.pane2button[this._currentChild];
_14cd.clearSelected();
}
var _14ce=this.pane2button[page];
_14ce.setSelected();
this._currentChild=page;
},onButtonClick:function(page){
var _14d0=dojo.widget.byId(this.containerId);
_14d0.selectChild(page,false,this);
},onCloseButtonClick:function(page){
var _14d2=dojo.widget.byId(this.containerId);
_14d2.closeChild(page);
},onKey:function(evt){
if((evt.keyCode==evt.KEY_RIGHT_ARROW)||(evt.keyCode==evt.KEY_LEFT_ARROW)){
var _14d4=0;
var next=null;
var _14d4=dojo.lang.find(this.children,this.pane2button[this._currentChild]);
if(evt.keyCode==evt.KEY_RIGHT_ARROW){
next=this.children[(_14d4+1)%this.children.length];
}else{
next=this.children[(_14d4+(this.children.length-1))%this.children.length];
}
dojo.event.browser.stopEvent(evt);
next.onClick();
}
}});
dojo.widget.defineWidget("dojo.widget.PageButton",dojo.widget.HtmlWidget,{templateString:"<span class='item'>"+"<span dojoAttachEvent='onClick' dojoAttachPoint='titleNode' class='selectButton'>${this.label}</span>"+"<span dojoAttachEvent='onClick:onCloseButtonClick' class='closeButton'>[X]</span>"+"</span>",label:"foo",closeButton:false,onClick:function(){
this.focus();
},onCloseButtonMouseOver:function(){
dojo.html.addClass(this.closeButtonNode,"closeHover");
},onCloseButtonMouseOut:function(){
dojo.html.removeClass(this.closeButtonNode,"closeHover");
},onCloseButtonClick:function(evt){
},setSelected:function(){
dojo.html.addClass(this.domNode,"current");
this.titleNode.setAttribute("tabIndex","0");
},clearSelected:function(){
dojo.html.removeClass(this.domNode,"current");
this.titleNode.setAttribute("tabIndex","-1");
},focus:function(){
if(this.titleNode.focus){
this.titleNode.focus();
}
}});
dojo.lang.extend(dojo.widget.Widget,{label:"",selected:false,closable:false,onClose:function(){
return true;
}});
dojo.provide("ws.dojofixes");
dojo.uri.dojoUri=function(uri){
return dojo.hostenv.getBaseScriptUri()+uri;
};
if(dojo.render.html.safari){
dojo.widget.getParser().createComponents=function(_14d8,_14d9){
var frags=[_14d8];
var comps=[];
while(frags.length>0){
var frag=frags.shift();
var built=false;
try{
if((frag)&&(frag["tagName"])&&(frag!=frag["nodeRef"])){
var _14de=dojo.widget.tags;
var tna=String(frag["tagName"]).split(";");
for(var x=0;x<tna.length;x++){
var ltn=(tna[x].replace(/^\s+|\s+$/g,"")).toLowerCase();
frag.tagName=ltn;
if(_14de[ltn]){
built=true;
var ret=_14de[ltn](frag,this,_14d9,frag["index"]);
comps.push(ret);
}else{
if(ltn.indexOf(":")==-1){
ltn="dojo:"+ltn;
}
var ret=dojo.widget.buildWidgetFromParseTree(ltn,frag,this,_14d9,frag["index"]);
if(ret){
built=true;
comps.push(ret);
}
}
}
}
}
catch(e){
dojo.debug("dojo.widget.Parse: error:",e);
}
if(!built){
var _14e3,_14e4=[];
for(var item in frag){
_14e3=frag[item];
if((_14e3)&&(typeof _14e3=="object")&&(_14e3!=frag.nodeRef)&&(_14e3!=frag["tagName"])&&!dojo.dom.isNode(_14e3)){
frags.unshift(_14e3);
}
}
}
}
return comps;
};
}
if(dojo.render.html.ie){
dojo.html.setPositivePixelValue=function(node,_14e7,value){
if(isNaN(value)){
return false;
}
var val=Math.max(0,value)+"px";
if(node.style[_14e7]!=val){
node.style[_14e7]=val;
}
return true;
};
}
if(dojo.render.html.safari){
dojo.html.getComputedStyle=function(node,_14eb,value){
node=dojo.byId(node);
if(!node||!node.style){
return value;
}
var s=document.defaultView.getComputedStyle(node,null);
if(_14eb=="margin-right"&&(!s||(s.cssFloat=="none"))){
return "0px";
}
if((node.tagName.toLowerCase()=="td")&&(_14eb=="margin-top"||_14eb=="margin-bottom")){
return "0px";
}
if((_14eb=="display")&&(node.style.display=="none")){
return "none";
}
return (s&&s[dojo.html.toCamelCase(_14eb)])||"";
};
dojo.html.getBorderBox=function(node){
node=dojo.byId(node);
var ret={width:node.offsetWidth,height:node.offsetHeight};
if(ret.width==null){
ret.width=0;
}
if(ret.height==null){
ret.height=0;
}
return ret;
};
dojo.html.iframeContentWindow=function(_14f0){
return _14f0.contentWindow||null;
};
}
dojo.html.getAbsolutePosition=dojo.html.abs=function(node,_14f2,_14f3){
node=dojo.byId(node);
var _14f4=dojo.doc();
var ret={x:0,y:0};
var bs=dojo.html.boxSizing;
if(!_14f3){
_14f3=bs.CONTENT_BOX;
}
var _14f7=2;
var _14f8;
switch(_14f3){
case bs.MARGIN_BOX:
_14f8=3;
break;
case bs.BORDER_BOX:
_14f8=2;
break;
case bs.PADDING_BOX:
default:
_14f8=1;
break;
case bs.CONTENT_BOX:
_14f8=0;
break;
}
var h=dojo.render.html;
var db=_14f4["body"]||_14f4["documentElement"];
if(h.ie){
with(node.getBoundingClientRect()){
ret.x=left-2;
ret.y=top-2;
}
}else{
if(_14f4["getBoxObjectFor"]){
_14f7=1;
try{
var bo=_14f4.getBoxObjectFor(node);
ret.x=bo.x-dojo.html.sumAncestorProperties(node,"scrollLeft");
ret.y=bo.y-dojo.html.sumAncestorProperties(node,"scrollTop");
}
catch(e){
}
}else{
if(node["offsetParent"]){
var _14fc;
if((h.safari)&&(node.style.getPropertyValue("position")=="absolute")&&(node.parentNode==db)){
_14fc=db;
}else{
_14fc=db.parentNode;
}
if(node.parentNode!=db){
var nd=node;
if(dojo.render.html.opera){
nd=db;
}
ret.x-=dojo.html.sumAncestorProperties(nd,"scrollLeft");
ret.y-=dojo.html.sumAncestorProperties(nd,"scrollTop");
}
var _14fe=node;
do{
var n=_14fe["offsetLeft"];
if(!h.opera||n>0){
ret.x+=isNaN(n)?0:n;
}
var m=_14fe["offsetTop"];
ret.y+=isNaN(m)?0:m;
_14fe=_14fe.offsetParent;
}while((_14fe!=_14fc)&&(_14fe!=null));
}else{
if(node["x"]&&node["y"]){
ret.x+=isNaN(node.x)?0:node.x;
ret.y+=isNaN(node.y)?0:node.y;
}
}
}
}
if(_14f2){
var _1501=dojo.html.getScroll();
ret.y+=_1501.top;
ret.x+=_1501.left;
}
var _1502=[dojo.html.getPaddingExtent,dojo.html.getBorderExtent,dojo.html.getMarginExtent];
if(_14f7>_14f8){
for(var i=_14f8;i<_14f7;++i){
ret.y+=_1502[i](node,"top");
ret.x+=_1502[i](node,"left");
}
}else{
if(_14f7<_14f8){
for(var i=_14f8;i>_14f7;--i){
ret.y-=_1502[i-1](node,"top");
ret.x-=_1502[i-1](node,"left");
}
}
}
ret.top=ret.y;
ret.left=ret.x;
return ret;
};
dojo.html.renderedTextContent=function(node){
if(node.tagName&&node.tagName.toLowerCase()=="style"){
return "";
}
node=dojo.byId(node);
var _1505="";
if(node==null){
return _1505;
}
for(var i=0;i<node.childNodes.length;i++){
switch(node.childNodes[i].nodeType){
case 1:
case 5:
var _1507="unknown";
try{
_1507=dojo.html.getStyle(node.childNodes[i],"display");
}
catch(E){
}
switch(_1507){
case "block":
case "list-item":
case "run-in":
case "table":
case "table-row-group":
case "table-header-group":
case "table-footer-group":
case "table-row":
case "table-column-group":
case "table-column":
case "table-cell":
case "table-caption":
_1505+="\n";
_1505+=dojo.html.renderedTextContent(node.childNodes[i]);
_1505+="\n";
break;
case "none":
break;
default:
if(node.childNodes[i].tagName&&node.childNodes[i].tagName.toLowerCase()=="br"){
_1505+="\n";
}else{
_1505+=dojo.html.renderedTextContent(node.childNodes[i]);
}
break;
}
break;
case 3:
case 2:
case 4:
var text=node.childNodes[i].nodeValue;
var _1509="unknown";
try{
_1509=dojo.html.getStyle(node,"text-transform");
}
catch(E){
}
switch(_1509){
case "capitalize":
var words=text.split(" ");
for(var i=0;i<words.length;i++){
words[i]=words[i].charAt(0).toUpperCase()+words[i].substring(1);
}
text=words.join(" ");
break;
case "uppercase":
text=text.toUpperCase();
break;
case "lowercase":
text=text.toLowerCase();
break;
default:
break;
}
switch(_1509){
case "nowrap":
break;
case "pre-wrap":
break;
case "pre-line":
break;
case "pre":
break;
default:
break;
}
_1505+=text;
break;
default:
break;
}
}
return _1505;
};
dojo.widget.PopupManager.registerAllWindows=function(_150b){
if(!_150b){
_150b=dojo.html.getDocumentWindow(window.top&&window.top.document||window.document);
}
this.registerWin(_150b);
};
dojo.widget.PopupManager._unRegisterWin=dojo.widget.PopupManager.unRegisterWin;
dojo.widget.PopupManager.unRegisterWin=function(win){
this._unRegisterWin(win);
this.registeredWindows=ws.lang.difference(this.registeredWindows,[win]);
};
dojo.html._BackgroundIframe=dojo.html.BackgroundIframe;
dojo.html.BackgroundIframe=function(node){
var _150e=document.createElement("iframe");
if(dojo.render.html.ie){
_150e.style.cssText="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; z-index: -1; border: 0px; filter:Alpha(Opacity=\"0\");";
}else{
_150e.style.cssText="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; z-index: -1; border: 0px";
}
if(node){
node.appendChild(_150e);
this.domNode=node;
}else{
document.body.appendChild(_150e);
_150e.style.display="none";
}
this.iframe=_150e;
this.iframe.tabIndex=-1;
};
dojo.inherits(dojo.html.BackgroundIframe,dojo.html._BackgroundIframe);
dojo.widget.PopupContainerBase.prototype.onShow=dojo.widget.PopupContainer.prototype.onShow=function(){
dojo.widget.HtmlWidget.prototype.onShow.apply(this,arguments);
this.openedSize={w:this.domNode.style.width,h:this.domNode.style.height};
this.processQueue();
};
dojo.widget.PopupContainerBase.prototype._move=dojo.widget.PopupContainerBase.prototype.move;
dojo.widget.PopupContainer.prototype._move=dojo.widget.PopupContainer.prototype.move;
dojo.widget.PopupContainerBase.prototype.move=dojo.widget.PopupContainer.prototype.move=function(x,y,_1511,_1512){
this._move(x,y,_1511,_1512);
if(!this.bgIframe){
this.bgIframe=new dojo.html.BackgroundIframe();
this.bgIframe.setZIndex(this.domNode);
}
this.bgIframe.size(this.domNode);
this.bgIframe.show();
};
dojo.widget.html.layout=function(_1513,_1514,_1515){
dojo.html.addClass(_1513,"dojoLayoutContainer");
_1514=dojo.lang.filter(_1514,function(child,idx){
child.idx=idx;
return dojo.lang.inArray(["top","bottom","left","right","client","flood"],child.layoutAlign);
});
if(_1515&&_1515!="none"){
var rank=function(child){
switch(child.layoutAlign){
case "flood":
return 1;
case "left":
case "right":
return (_1515=="left-right")?2:3;
case "top":
case "bottom":
return (_1515=="left-right")?3:2;
default:
return 4;
}
};
_1514.sort(function(a,b){
return (rank(a)-rank(b))||(a.idx-b.idx);
});
}
var f={top:dojo.html.getPixelValue(_1513,"padding-top",true),left:dojo.html.getPixelValue(_1513,"padding-left",true)};
dojo.lang.mixin(f,dojo.html.getContentBox(_1513));
dojo.lang.forEach(_1514,function(child){
var elm=child.domNode;
var pos=child.layoutAlign;
with(elm.style){
left=f.left+"px";
top=f.top+"px";
bottom="auto";
right="auto";
}
dojo.html.addClass(elm,"dojoAlign"+dojo.string.capitalize(pos));
if((pos=="top")||(pos=="bottom")){
dojo.html.setMarginBox(elm,{width:f.width});
if(child.onResized){
child.onResized();
}
var h=dojo.html.getMarginBox(elm).height;
f.height-=h;
if(pos=="top"){
f.top+=h;
}else{
elm.style.top=f.top+f.height+"px";
}
}else{
if(pos=="left"||pos=="right"){
var w=dojo.html.getMarginBox(elm).width;
if(child.resizeTo){
child.resizeTo(w,f.height);
}else{
dojo.html.setMarginBox(elm,{width:w,height:f.height});
}
f.width-=w;
if(pos=="left"){
f.left+=w;
}else{
elm.style.left=f.left+f.width+"px";
}
}else{
if(pos=="flood"||pos=="client"){
if(child.resizeTo){
child.resizeTo(f.width,f.height);
}else{
dojo.html.setMarginBox(elm,{width:f.width,height:f.height});
}
}
}
}
});
};
dojo.widget.PageContainer.prototype._fillInTemplate=dojo.widget.PageContainer.prototype.fillInTemplate;
dojo.widget.PageContainer.prototype.fillInTemplate=function(args,frag){
this._fillInTemplate(args,frag);
this.domNode.style.overflow="hidden";
};
dojo.widget.HtmlWidget.prototype.isReallyShowing=function(){
return this.isShowing()&&((this.parent&&typeof this.parent.isReallyShowing!="undefined")?this.parent.isReallyShowing():true);
};
dojo.widget.HtmlWidget.prototype.__isResized=dojo.widget.HtmlWidget.prototype._isResized;
dojo.widget.HtmlWidget.prototype._isResized=function(){
return this.isReallyShowing()&&this.__isResized();
};
dojo.widget.HtmlWidget.prototype.resizeTo=function(w,h){
dojo.html.setMarginBox(this.domNode,{width:w,height:h});
if(this.isReallyShowing()){
if(typeof w!="undefined"){
this.width=w;
}
if(typeof h!="undefined"){
this.height=h;
}
this.onResized();
}
};
dojo.extend(dojo.widget.html.TurboGrid,{themeable:false,templateCssString:".turbogrid {\r\n\tposition: relative;\r\n\tbackground-color: #EBEADB;\r\n}\r\n\r\n.turbogrid-scrollbox {\r\n\tposition: absolute;\r\n\toverflow: auto;\r\n\tborder-top: 1px solid silver;\r\n}\r\n\r\n.turbogrid-content {\r\n\tposition: relative;\r\n\toverflow: hidden;\r\n\tcursor: default;\r\n\tbackground-color: white;\r\n\tborder-right: 1px solid silver;\r\n}\r\n\r\n.turbogrid-row {\r\n\tposition: relative;\r\n\toverflow: hidden;\r\n\tborder-left: 1px solid #F5F4EB;\r\n\twhite-space: nowrap;\r\n}\r\n\r\n.turbogrid-row-selected {\r\n\tbackground-color: #A6CAF0 !important;\r\n}\r\n\r\n.turbogrid-row-editing {\r\n\tbackground-color: #F4FFF4;\r\n}\r\n\r\n.turbogrid-row-over {\r\n}\r\n\r\n.turbogrid-row-odd {\r\n\tbackground-color: #FDFBF7;\r\n}\r\n\r\n.turbogrid-cell {\r\n\ttext-overflow: ellipsis;\r\n\twhite-space: nowrap;\r\n\toverflow: hidden;\r\n\tpadding: 4px 3px 3px 4px;\r\n\tborder-right: 1px solid #ECE9D8;\r\n\tborder-bottom: 1px solid #D9D0AE;\r\n\tvertical-align: middle;\r\n}\r\n\r\n.turbogrid-cell {\r\n\tdisplay: inline-block;\r\n}\r\n\r\n.turbo-gecko .turbogrid-cell {\r\n\tdisplay: block;\r\n\tposition: absolute;\r\n\ttop: 0;\r\n}\r\n\r\n.turbogrid-row-over .turbogrid-cell {\r\n\tbackground-color: #FFDFAA !important;\r\n}\r\n\r\n.turbogrid-row-selected  .turbogrid-cell {\r\n\tbackground-color: #A6CAF0 !important;\r\n}\r\n\r\n/*.turbogrid-gecko-span-cell*/\r\n/*\r\n.turbo-gecko .turbogrid-cell {\r\n\tdisplay: -moz-inline-box;\r\n}\r\n\r\n.turbogrid-gecko-button-cell {\r\n\tfont-family: Tahoma, Arial, Helvetica, sans-serif;\r\n\tfont-size: 12px;\r\n\tborder: none;\r\n\tborder-right: 1px solid #ECE9D8;\r\n\tbackground-color: transparent;\r\n\ttext-align: left;\r\n\twhite-space: nowrap;\r\n\tpadding: 0;\r\n}\r\n*/\r\n\r\n.turbogrid-over {\r\n\tbackground-color: #FFDFAA !important;\r\n}\r\n\r\n.turbogrid-over.turbogrid-row-selected {\r\n\tbackground-color: #AF7CCB;\r\n}\r\n\r\n.turbogrid-header {\r\n\tposition: relative;\r\n\tbackground-color: #EBEADB;\r\n\toverflow: hidden;\r\n}\r\n\r\n.turbogrid-header-cell {\r\n\tpadding: 0 4px 0 3px;\r\n}\r\n\r\n.turbogrid-header-col {\r\n\tpadding: 2px 0 4px 0;\r\n\tborder-left: 1px solid #E2DEC7;\r\n\tborder-right: 1px solid #D1CAA3;\r\n\toverflow: hidden;\r\n\tbackground:url(../../themes/default/images/underbar.gif) bottom repeat-x;\r\n\tposition: absolute;\r\n\ttop: 0;\r\n}\r\n\r\n.turbo-ie .turbogrid-header-col {\r\n\tborder-bottom: 2px solid;\r\n\tborder-bottom-color: #D1CAA3;\r\n\tpadding-bottom: 2px;\r\n\tbackground: none;\r\n}\r\n\r\n/* follwing can fix turbogrid-header-col offsetLeft == -1 issue in FF */\r\n/*\r\n.turbo-gecko .turbogrid-header-col {\r\n\toverflow: visible;\r\n}\r\n.turbo-gecko .turbogrid-header-cell {\r\n\toverflow: hidden;\r\n}\r\n*/\r\n\r\n\r\n/*\r\n.turbogrid-header-cell {\r\n\tpadding: 2px 2px 4px 2px;\r\n\tbackground:url(../../themes/default/images/underbar.gif) bottom repeat-x;\r\n\tborder-left: 1px solid #E2DEC7;\r\n\tborder-right: 1px solid #D1CAA3;\r\n}\r\n\r\n.turbo-ie .turbogrid-header-cell {\r\n\tbackground: none;\r\n\tborder-bottom: 2px solid;\r\n\tborder-bottom-color: #D1CAA3;\r\n\tpadding-bottom: 2px;\r\n}\r\n*/\r\n\r\n.turbogrid-header-selected /*.turbogrid-header-col*/ {\r\n\tbackground: white url(../../themes/default/images/underbarhi.gif) bottom repeat-x;\r\n}\r\n\r\n.turbo-ie .turbogrid-header-selected /*.turbogrid-header-col*/ {\r\n\tbackground: none;\r\n\tbackground-color: #F8F8F8;\r\n\tborder-bottom-color: #FFB300;\r\n}\r\n\r\n.turbogrid-header-sort-down {\r\n\tbackground: url(../../themes/default/images/down2.gif) no-repeat right center; \r\n\tpadding-right: 16px;\r\n\toverflow: hidden;\r\n\ttext-overflow: ellipsis;\r\n}\r\n\r\n.turbogrid-header-sort-up {\r\n\tbackground: url(../../themes/default/images/up2.gif) no-repeat right center; \r\n\tpadding-right: 16px;\r\n\toverflow: hidden;\r\n\ttext-overflow: ellipsis;\r\n}\r\n\r\n.turbogrid-header-sort-none {\r\n\toverflow: hidden;\r\n\ttext-overflow: ellipsis;\r\n}\r\n\r\n.turbogrid input {\r\n\tmargin: 0;\r\n}\r\n\r\n.turbo-ie .turbogrid-checkbox {\r\n\theight: 16px;\r\n}\r\n\r\n.turbogrid input, .turbogrid button, .turbogrid select {\r\n\tfont-family: Tahoma, Arial, Helvetica, sans-serif;\r\n\tfont-size: inherit;\r\n}\r\n\r\n.turbogrid button, .turbogrid input {\r\n\tfont-size: 9px;\r\n}\r\n\r\n.turbogrid .turbogrid-textinput {\r\n\tpadding: 0;\r\n\tmargin: 0;\r\n\tborder: 0 solid;\r\n}\r\n\r\n.turbogrid .turbogrid-select {\r\n\twidth: 100%;\r\n\tpadding: 0;\r\n\tmargin: 0;\r\n\tborder: 0 solid white;\r\n}\r\n\r\n.turbogrid-left {\r\n\tposition: absolute;\r\n\toverflow: hidden;\r\n\tbackground-color: #EBEADB;\r\n\tborder-top: 1px solid silver;\r\n}\r\n\r\n.turbogrid-left-content {\r\n\tposition: relative;\r\n\toverflow: hidden;\r\n\tcursor: default;\r\n}\r\n\r\n/*.turbogrid-left-content .turbogrid-row {*/\r\n.turbogrid-left-row {\r\n\tposition: relative;\r\n\toverflow: hidden;\r\n\tborder-left: 1px solid #F5F4EB;\r\n\twhite-space: nowrap;\r\n\t/*height: 20px;*/\r\n\tborder-bottom: 1px solid #D9D0AE;\r\n}\r\n\r\n.turbogrid-left-row div {\r\n\toverflow: hidden;\r\n\tpadding: 2px 4px;\r\n\ttext-align: right;\r\n\tvertical-align: middle;\r\n\t/*border-bottom: 1px solid #D9D0AE;*/\r\n}\r\n\r\n.turbogrid-left-row-selected {\r\n\tbackground-color: #EBEAE5;\r\n\t/*color: white;*/\r\n}\r\n\r\n.turbogrid-top {\r\n\tposition: absolute;\r\n\toverflow: hidden;\r\n}\r\n\r\n.turbogrid-top-content {\r\n\tposition: relative;\r\n\toverflow: hidden;\r\n\tcursor: default;\r\n\t/*width: 90000px;*/\r\n}\r\n\r\n.turbogrid-money {\r\n\tfont-family: \"Courier New\", Courier, mono;\r\n}\r\n\r\n.turbogrid-money-neg {\r\n\tcolor: #800040;\r\n\tfont-weight: bold;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("../turbo/widgets/themes/default/TurboGrid.css"),initialize:function(){
dojo.widget.html.TurboGrid.superclass.initialize.apply(this,arguments);
this.setStyledClass(this.domNode,"");
}});
turbo.setStyleBoundsPx=function(_1526,_1527,inTop,_1529,_152a){
var _152b=_1526&&(_1526.style.visibility!="hidden");
turbo.setVisibility(_1526,false);
turbo.setStyleLeftPx(_1526,_1527);
turbo.setStyleTopPx(_1526,inTop);
turbo.setStyleWidthPx(_1526,_1529);
turbo.setStyleHeightPx(_1526,_152a);
turbo.setVisibility(_1526,_152b);
};
if(dojo.render.html.ie){
dojo.html.insertCssText=function(_152c,doc,URI){
if(!_152c){
return;
}
if(!doc){
doc=document;
}
if(URI){
_152c=dojo.html.fixPathsInCssText(_152c,URI);
}
var style;
var _1530=doc.getElementsByTagName("style");
if(_1530.length<25){
style=doc.createElement("style");
var head=doc.getElementsByTagName("head")[0];
if(!head){
dojo.debug("No head tag in document, aborting styles");
return;
}else{
head.appendChild(style);
}
}else{
style=_1530[_1530.length-1];
}
style.setAttribute("type","text/css");
if(style.styleSheet){
style.styleSheet.cssText+="\n"+_152c;
}else{
var _1532=doc.createTextNode("\n"+_152c);
style.appendChild(_1532);
}
return style;
};
}
dojo.html._insertCssText=dojo.html.insertCssText;
dojo.html.insertCssText=function(_1533,doc,URI){
var _1536=_1533.match(/\$\{([^\}]+)\}/g);
if(_1536){
for(var i=0;i<_1536.length;i++){
var key=_1536[i];
key=key.substring(2,key.length-1);
var kval=dojo.widget.defaultStrings[key];
if(kval){
_1533=_1533.replace(_1536[i],kval);
}
}
}
dojo.html._insertCssText(_1533,doc,URI);
};
if(dojo.render.html.ie){
ws.dojofixes.fixScroll=function(){
dojo.body().scrollTop=document.documentElement.scrollTop=0;
dojo.body().scrollLeft=document.documentElement.scrollLeft=0;
};
dojo.addOnLoad(function(){
dojo.event.browser.addListener(dojo.body(),"onscroll",ws.dojofixes.fixScroll);
document.documentElement.onscroll=ws.dojofixes.fixScroll;
});
}
dojo.provide("ws.dom");
ws.dom={forEachNode:function(node,_153b,_153c){
var _153d=node.childNodes;
for(var i=0;i<_153d.length;i++){
var _153f=_153d[i];
var _1540=false;
if(_153b!=null){
_1540=_153b(_153f);
}
if(!_1540){
ws.dom.forEachNode(_153f,_153b,_153c);
if(_153c!=null){
i+=_153c(_153f);
}
}
}
}};
dojo.provide("ws.manifest");
dojo.registerNamespace("ws","ws.widget",function(name){
var ret={"addcategoryitem":"ws.address.EditContactDialog","addressfield":"ws.address.AddressField","addresslistview":"ws.address.AddressListView","distributionlistwidget":"ws.address.DistributionListWidget","contactdetails":"ws.address.ContactDetails","editcontactdialog":"ws.address.EditContactDialog","importcontactswidget":"ws.address.ImportContactsWidget","newcategorywidget":"ws.address.EditContactDialog","peoplepanel":"ws.address.PeoplePanel","peoplepaneladdcontactcard":"ws.address.PeoplePanel","peoplepanelhovercard":"ws.address.PeoplePanel","peoplepicker":"ws.address.PeoplePicker","presencehovercard":"ws.address.PresenceHoverCard","addeventdialog":"ws.calendar.AddEventDialog","calendarviewwidget":"ws.calendar.CalendarViewWidget","columnviewwidget":"ws.calendar.ColumnViewWidget","confirmrecurdialog":"ws.calendar.ConfirmRecurDialog","editcalendar":"ws.calendar.EditCalendar","eventquickviewwidget":"ws.calendar.EventQuickViewWidget","exportcompswidget":"ws.calendar.ExportCompsWidget","gridviewwidget":"ws.calendar.GridViewWidget","importcompswidget":"ws.calendar.ImportCompsWidget","inlineaddevent":"ws.calendar.InlineAddEvent","mysdkaddevent":"ws.calendar.MySdkAddEvent","quickadd":"ws.calendar.QuickAdd","untimedviewwidget":"ws.calendar.UntimedViewWidget","upcomingeventsviewwidget":"ws.calendar.UpcomingEventsViewWidget","feedheadline":"aol.widget.FeedHeadline","feedspanel":"aol.widget.FeedsPanel","feedstree":"aol.widget.FeedsTree","feedstreeficontroller":"aol.widget.FeedsTreeFIController","feedstreenode":"aol.widget.FeedsTreeNode","feedsview":"aol.widget.FeedsView","addbuddycard":"ws.im.AddBuddyCard","buddylist":"ws.im.BuddyList","buddylisthovercard":"ws.im.BuddyList","im":"ws.im.Im","imgroup":"ws.im.ImGroup","impagebutton":"ws.im.ImGroup","impanel":"ws.im.ImPanel","imuser":"ws.im.ImUser","composemessagewidget":"ws.mail.ComposeMessageWidget","displaymessagewidget":"ws.mail.DisplayMessageWidget","editfolderdialog":"ws.mail.EditFolderDialog","mailpanelwidget":"ws.mail.MailPanelWidget","messagelistview":"ws.mail.MessageListView","messagestatusdialog":"ws.mail.MessageStatusDialog","sendconfirmationcard":"ws.mail.SendConfirmationCard","sendconfirmationpage":"ws.mail.SendConfirmationPage","eventpanel":"ws.panels.EventPanel","eventdatepicker":"ws.panels.EventPanel","feedpanel":"ws.panels.FeedPanel","taskpanel":"ws.panels.TaskPanel","taskpanelmoredetailcard":"ws.panels.TaskPanelMoreDetailCard","taskpaneleditdetailcard":"ws.panels.TaskPanelEditDetailCard","pictureeditcontrol":"ws.pictures.PictureEditControl","pictureeditor":"ws.pictures.PictureEditor","picturepicker":"ws.pictures.PicturePicker","thumbnail":"ws.pictures.PicturePicker","pictureuploader":"ws.pictures.PictureUploader","pictureviewcontrol":"ws.pictures.PictureViewControl","footer":"ws.suite.Footer","hat":"ws.suite.Hat","inlineprefsdialog":"ws.suite.InlinePrefsDialog","navigation":"ws.suite.Navigation","panelcontainer":"ws.suite.PanelContainer","todaycurtain":"ws.suite.TodayCurtain","minilogin":"ws.suite.MiniLogin","advertisement":"ws.widget.Advertisement","aimftutip":"ws.widget.AIMFTUTip","buddyicon":"ws.widget.BuddyIcon","defaulttextbox":"ws.widget.DefaultTextbox","defaulttextarea":"ws.widget.DefaultTextbox","genericdialog":"ws.widget.Dialogs","okcanceldialog":"ws.widget.OkCancelDialog","popupdatepicker":"ws.widget.PopupDatePicker","popupdualdatepicker":"ws.widget.PopupDatePicker","popuptimepicker":"ws.widget.PopupTimePicker","smileypalette":"ws.widget.SmileyPalette","spellcheckeditor":"ws.widget.SpellCheckEditor","splitter":"ws.widget.Splitter","wsbutton":"ws.widget.WSButton","wsdropdownbutton":"ws.widget.WSButton","wsdropdownlink":"ws.widget.WSButton","wssplitdropdownbutton":"ws.widget.WSButton","wsdatepicker":"ws.widget.WSDatePicker","wsdualdatepicker":"ws.widget.WSDatePicker","wseditor":"ws.widget.WSEditor","wslayoutcontainer":"ws.widget.WSLayoutContainer","wsmenu":"ws.widget.WSMenu","wsmenuitem":"ws.widget.WSMenu","wsinputablemenuitem":"ws.widget.WSMenu","wsmenuseparator":"ws.widget.WSMenu","wsselect":"ws.widget.WSSelect","wstimepicker":"ws.widget.WSTimePicker","wstoolbar":"ws.widget.WSToolbar","welcomedialog":"ws.widget.WelcomeDialog","settingscontainer":"ws.settings.SettingsContainer","generalsettings":"ws.settings.GeneralSettings","accountsettings":"ws.settings.AccountSettings","composesettings":"ws.settings.ComposeSettings","spamsettings":"ws.settings.SpamSettings","chatsettings":"ws.settings.ChatSettings","calendarsettings":"ws.settings.CalendarSettings","panelsettings":"ws.settings.PanelSettings","feedsettings":"ws.settings.FeedSettings"}[name.toLowerCase()];
this.module=ret.split(".").splice(0,2).join(".");
return ret;
});
dojo.provide("ws.presence");
ws.presence={getBuddyIconUrl:function(_1543,_1544){
var _1545=ws.presence.getScreenNameForContact(_1543,_1544);
if(_1545){
return Config.BuddyIconUrl+encodeURIComponent(_1545);
}else{
return null;
}
},getPresenceIconForScreenName:function(_1546){
var _1547=Config.AIMPresenceUrl+encodeURIComponent(_1546);
return ws.string.substituteParams("<a href=\"#\"><img width=16 height=16 align='absmiddle' src=\"{0}\" border=\"0\"></a>",_1547);
},getPresenceIcon:function(_1548){
var _1549=ws.presence.getScreenNameForContact(_1548);
if(_1549){
return this.getPresenceIconForScreenName(_1549);
}else{
return "&nbsp;";
}
},getScreenNameForContact:function(_154a,_154b){
var ret=_154a.screenName||ws.presence.getScreenNameForAddress(_154a.email)||ws.presence.getScreenNameForAddress(_154a.email1)||ws.presence.getScreenNameForAddress(_154a.email2);
if(!_154b){
ret=ret||_154a.email||_154a.email1||_154a.email2;
}
return ret;
},getScreenNameForAddress:function(_154d){
var info=ws.presence.parseEmailAddress(_154d);
if(info&&dojo.lang.find(Config.KnownDomains,info.domain)!=-1){
return info.name;
}else{
return null;
}
},_launchIM:function(sn){
if(Settings.IMSending=="Aim"){
this.launchClientIM(sn);
}else{
if(Config.EnableAIMPanel){
this.launchAIMPanel(sn);
}else{
this.launchAIMExpress(sn);
}
}
},launchIM:function(_1550,isONS){
if((_1550.indexOf("@")>=0)&&!isONS){
var args={};
args.load=dojo.lang.hitch(this,function(data){
if(data.presenceState==3){
ws.widget.OkCancelDialog.alert(_1550+" "+Config.Strings.NoAIMAccount);
}else{
if(data.presenceState==4){
ws.widget.OkCancelDialog.alert(Config.Strings.ErrorIMServer);
}else{
this._launchIM(data.screenName);
}
}
});
args.content={email:_1550};
this.getScreenNameFromEmail(args);
}else{
this._launchIM(_1550);
}
},launchClientIM:function(sn){
if(!ws.presence.imFrame){
ws.presence.imFrame=dojo.io.createIFrame("IMFrame",null,Config.EmptyFileURL);
}
var url=ws.string.substituteParams(Config.SendIMUrlAIM,sn);
dojo.io.setIFrameSrc(ws.presence.imFrame,url,true);
},launchAIMPanel:function(sn){
var _1557=dojo.widget.byType("panelcontainer")[0];
if(!_1557){
try{
opener.ws.presence.launchAIMPanel(sn);
opener.focus();
}
catch(e){
}
return;
}
var panel=dojo.widget.byType("impanel")[0];
if(panel&&panel.isSignedOn()){
panel.openIm({aimId:sn});
return;
}
var _1559=dojo.widget.byId("ws_panelsplitter");
if(_1559.isCollapsed){
_1559.onCollapse();
}
_1557.selectPanel("AIM");
panel=dojo.widget.byType("impanel")[0];
panel.openIm({aimId:sn});
},launchAIMExpress:function(sn){
var hasSN=typeof sn!="undefined";
var _155c=true;
var left=_155c?screen.availWidth+10000:5;
var top=_155c?screen.availHeight+1000:5;
var width=_155c?1:1006;
var _1560=_155c?1:593;
var url=hasSN?ws.string.substituteParams(Config.IMLaunchAE,encodeURIComponent(sn)):Config.LaunchAE;
var _1562=ws.string.substituteParams("status=yes,resizable=yes,menubar=no,scrollbars=yes,left={0},top={1},width={2},height={3}",left,top,width,_1560);
ws.io.openWindow(url,"",_1562);
},parseEmailAddress:function(_1563){
if((_1563==null)||(_1563=="")){
return null;
}
var name="";
var _1565="";
var _1566=_1563.match(/(.*)@(.*)/);
if((_1566!=null)&&(_1566.length==3)){
name=_1566[1];
_1565=_1566[2];
if(name!=null){
name=name.replace(/\/M/gi,"");
name=name.replace(/\/A/gi,"");
}
if(_1565!=null){
_1565=_1565.toLowerCase();
}
}
return {name:name,domain:_1565};
},getScreenNameFromEmail:function(args){
ws.io.rpc({action:"GetPresenceInfo",content:args.content,load:dojo.lang.hitch(this,function(data){
args.load(data);
}),error:args.error});
}};
dojo.kwCompoundRequire({common:["ws.WebSuite","ws.CachedList","ws.UserContext","ws.browser","ws.date","ws.debug","ws.dojofixes","ws.dom","ws.html","ws.io","ws.lang","ws.manifest","ws.presence","ws.reporting","ws.settings","ws.string","ws.style"]});
dojo.provide("ws.*");
dojo.provide("ws.widget.Advertisement");
dojo.require("dojo.event");
dojo.widget.defineWidget("ws.widget.Advertisement",dojo.widget.HtmlWidget,{widgetType:"Advertisement",adtype:"",location:"",lastRotateTime:0,rotationInterval:Config.AdRotationInterval*1000,blocked:false,screen:"large",templateString:"<div class='adFrameDiv' style='display: none; text-align: center;'></div>",fillInTemplate:function(args,frag){
this.screen=(screen.width<1000)?"small":"large";
this.adConfig=Config.AdInfo[this.adtype+"_"+this.screen]||Config.AdInfo[this.adtype+"_all"];
if((this.adtype.indexOf("mlsidebar")!=-1)&&this.adConfig!=null&&!this.adConfig.url){
this.adConfig=null;
}
if(!this.enabled()){
return;
}
dojo.html.addClass(this.domNode,"adFrameDiv"+this.adConfig.location);
var size=this.adConfig.size;
this.domNode.style.width=this.adConfig.iframeWidth+"px";
this.domNode.style.height=this.adConfig.iframeHeight+"px";
this.domNode.style.display="block";
if(ws.browser.docClickHandlerObj!=null){
dojo.event.connect(ws.browser.docClickHandlerObj,"onclick",this,"onDocumentClick");
}
this.rotateSoon();
},block:function(_156c){
this.blocked=_156c;
this.lastRotateTime=0;
if(_156c){
this.domNode.innerHTML="";
this.createdIframe=false;
}else{
this.rotate();
}
},enabled:function(){
return this.adConfig!=null;
},rotate:function(){
if(!this.enabled()||this.blocked){
return;
}
var now=(new Date()).getTime();
if(now-this.lastRotateTime<this.rotationInterval){
return;
}
this.lastRotateTime=now;
var ran=""+Math.random();
ran=parseInt(ran.substring(2,ran.length-2),10);
if(this.adConfig.url){
var url=ws.string.substituteParams(this.adConfig.url,ran);
}else{
var url=ws.string.substituteParams("%{base}?name=%{name}&screen=%{screen}&rnd=%{rnd}",{base:Config.adPageURL,name:this.adtype,screen:this.screen,rnd:ran});
}
if(!this.createdIframe){
this.domNode.innerHTML=ws.string.substituteParams("<iframe name='%{name}' style='width:%{width}px; height:%{height}px;' marginwidth='0' marginheight='0' hspace='0' vspace='0' frameborder='0' scrolling='no'></iframe>",{name:this.widgetId+"frame",width:this.adConfig.iframeWidth,height:this.adConfig.iframeHeight});
this.createdIframe=true;
}
ws.html.recreateIframe(this.domNode,url);
},onDocumentClick:function(){
dojo.lang.setTimeout(this,function(){
if(!ws.io.openingWindow){
this.rotateSoon();
}
},0);
},rotateSoon:function(){
dojo.lang.setTimeout(this,"rotate",2000);
}});
dojo.provide("ws.widget.BuddyIcon");
dojo.widget.defineWidget("ws.widget.BuddyIcon",dojo.widget.HtmlWidget,{contact:null,templateString:"<div class=\"buddyIcon\" style=\"height: 48px; width: 48px; position: relative;\">"+"\t<img src=\"${spacer}\" style=\"height: 48px; width: 48px; position: absolute; background: url('${images}main.gif') -90px -30px;\">"+"\t<img src=\"${spacer}\" dojoAttachPoint=\"icon\" dojoAttachEvent=\"onLoad: onLoad; onClick: onClick; onError: onError\" border=\"1px solid #85817c\" style=\"display: none; background-color: #FFFFFF; width: 48px; height: 48px; position: absolute;\">"+"</div>",show:function(_1570){
this.contact=_1570;
dojo.html.hide(this.icon);
var url=ws.presence.getBuddyIconUrl(_1570);
this.showIcon=(url!=null);
if(url){
this.icon.src=url;
}
},onLoad:function(){
if(this.showIcon){
dojo.html.show(this.icon);
}
},onClick:function(){
var _1572=ws.presence.getScreenNameForContact(this.contact);
if(_1572){
ws.presence.launchIM(_1572);
}
},onError:function(){
dojo.html.hide(this.icon);
}});
dojo.provide("ws.widget.DefaultTextbox");
dojo.provide("ws.widget.DefaultTextarea");
dojo.widget.defineWidget("ws.widget.DefaultTextbox",dojo.widget.HtmlWidget,{templateString:"<input maxlength='${this.maxlength}' class='wsInput ${this.className}' size='${this.size}' style='padding: 2px 2px 2px 6px; font: normal 11px Verdana;' dojoAttachPoint='textbox' dojoAttachEvent='onBlur: _onBlur; onFocus: _onFocus; onKeyPress: _onKeyPress'>",value:"",defaultValue:"",className:"",size:50,maxlength:255,fillInTemplate:function(){
this.setValue(this.value);
},getValue:function(){
return (this.textbox.value==this.defaultValue)?"":this.textbox.value;
},setValue:function(val,_1574){
this.textbox.value=(dojo.string.isBlank(val)&&_1574!=true)?this.defaultValue:val;
this._updateClass();
},_onFocus:function(){
if(this.textbox.value==this.defaultValue){
this.textbox.value="";
}
this._updateClass();
},_onBlur:function(){
if(dojo.string.isBlank(this.textbox.value)){
this.textbox.value=this.defaultValue;
}
this._updateClass();
},_onKeyPress:function(){
dojo.lang.setTimeout(this,"onChange",0);
},onChange:function(){
},_updateClass:function(){
ws.html.toggleClass(this.textbox,"wsInputDefault",this.textbox.value==this.defaultValue);
}});
dojo.widget.defineWidget("ws.widget.DefaultTextarea",ws.widget.DefaultTextbox,{templateString:"<textarea dojoAttachEvent='onBlur: _onBlur; onFocus: _onFocus; onKeyPress: _onKeyPress' dojoAttachPoint='textbox' class='wsInput ${this.className}' style='padding: 2px 2px 2px 6px; font: normal 11px Verdana;' rows='${this.rows}' cols='${this.cols}'>${this.value}</textarea>",rows:4,cols:70});
dojo.kwCompoundRequire({common:["dojo.html.common","dojo.html.style"]});
dojo.provide("dojo.html.*");
dojo.provide("dojo.dnd.HtmlDragAndDrop");
dojo.declare("dojo.dnd.HtmlDragSource",dojo.dnd.DragSource,{dragClass:"",onDragStart:function(){
var _1575=new dojo.dnd.HtmlDragObject(this.dragObject,this.type);
if(this.dragClass){
_1575.dragClass=this.dragClass;
}
if(this.constrainToContainer){
_1575.constrainTo(this.constrainingContainer||this.domNode.parentNode);
}
return _1575;
},setDragHandle:function(node){
node=dojo.byId(node);
dojo.dnd.dragManager.unregisterDragSource(this);
this.domNode=node;
dojo.dnd.dragManager.registerDragSource(this);
},setDragTarget:function(node){
this.dragObject=node;
},constrainTo:function(_1578){
this.constrainToContainer=true;
if(_1578){
this.constrainingContainer=_1578;
}
},onSelected:function(){
for(var i=0;i<this.dragObjects.length;i++){
dojo.dnd.dragManager.selectedSources.push(new dojo.dnd.HtmlDragSource(this.dragObjects[i]));
}
},addDragObjects:function(el){
for(var i=0;i<arguments.length;i++){
this.dragObjects.push(dojo.byId(arguments[i]));
}
}},function(node,type){
node=dojo.byId(node);
this.dragObjects=[];
this.constrainToContainer=false;
if(node){
this.domNode=node;
this.dragObject=node;
this.type=(type)||(this.domNode.nodeName.toLowerCase());
dojo.dnd.DragSource.prototype.reregister.call(this);
}
});
dojo.declare("dojo.dnd.HtmlDragObject",dojo.dnd.DragObject,{dragClass:"",opacity:0.5,createIframe:true,disableX:false,disableY:false,createDragNode:function(){
var node=this.domNode.cloneNode(true);
if(this.dragClass){
dojo.html.addClass(node,this.dragClass);
}
if(this.opacity<1){
dojo.html.setOpacity(node,this.opacity);
}
var ltn=node.tagName.toLowerCase();
var isTr=(ltn=="tr");
if((isTr)||(ltn=="tbody")){
var doc=this.domNode.ownerDocument;
var table=doc.createElement("table");
if(isTr){
var tbody=doc.createElement("tbody");
table.appendChild(tbody);
tbody.appendChild(node);
}else{
table.appendChild(node);
}
var _1584=((isTr)?this.domNode:this.domNode.firstChild);
var _1585=((isTr)?node:node.firstChild);
var _1586=_1584.childNodes;
var _1587=_1585.childNodes;
for(var i=0;i<_1586.length;i++){
if((_1587[i])&&(_1587[i].style)){
_1587[i].style.width=dojo.html.getContentBox(_1586[i]).width+"px";
}
}
node=table;
}
if((dojo.render.html.ie55||dojo.render.html.ie60)&&this.createIframe){
with(node.style){
top="0px";
left="0px";
}
var outer=document.createElement("div");
outer.appendChild(node);
this.bgIframe=new dojo.html.BackgroundIframe(outer);
outer.appendChild(this.bgIframe.iframe);
node=outer;
}
node.style.zIndex=999;
return node;
},onDragStart:function(e){
dojo.html.clearSelection();
this.scrollOffset=dojo.html.getScroll().offset;
this.dragStartPosition=dojo.html.getAbsolutePosition(this.domNode,true);
this.dragOffset={y:this.dragStartPosition.y-e.pageY,x:this.dragStartPosition.x-e.pageX};
this.dragClone=this.createDragNode();
this.containingBlockPosition=this.domNode.offsetParent?dojo.html.getAbsolutePosition(this.domNode.offsetParent,true):{x:0,y:0};
if(this.constrainToContainer){
this.constraints=this.getConstraints();
}
with(this.dragClone.style){
position="absolute";
top=this.dragOffset.y+e.pageY+"px";
left=this.dragOffset.x+e.pageX+"px";
}
dojo.body().appendChild(this.dragClone);
dojo.event.topic.publish("dragStart",{source:this});
},getConstraints:function(){
if(this.constrainingContainer.nodeName.toLowerCase()=="body"){
var _158b=dojo.html.getViewport();
var width=_158b.width;
var _158d=_158b.height;
var _158e=dojo.html.getScroll().offset;
var x=_158e.x;
var y=_158e.y;
}else{
var _1591=dojo.html.getContentBox(this.constrainingContainer);
width=_1591.width;
_158d=_1591.height;
x=this.containingBlockPosition.x+dojo.html.getPixelValue(this.constrainingContainer,"padding-left",true)+dojo.html.getBorderExtent(this.constrainingContainer,"left");
y=this.containingBlockPosition.y+dojo.html.getPixelValue(this.constrainingContainer,"padding-top",true)+dojo.html.getBorderExtent(this.constrainingContainer,"top");
}
var mb=dojo.html.getMarginBox(this.domNode);
return {minX:x,minY:y,maxX:x+width-mb.width,maxY:y+_158d-mb.height};
},updateDragOffset:function(){
var _1593=dojo.html.getScroll().offset;
if(_1593.y!=this.scrollOffset.y){
var diff=_1593.y-this.scrollOffset.y;
this.dragOffset.y+=diff;
this.scrollOffset.y=_1593.y;
}
if(_1593.x!=this.scrollOffset.x){
var diff=_1593.x-this.scrollOffset.x;
this.dragOffset.x+=diff;
this.scrollOffset.x=_1593.x;
}
},onDragMove:function(e){
this.updateDragOffset();
var x=this.dragOffset.x+e.pageX;
var y=this.dragOffset.y+e.pageY;
if(this.constrainToContainer){
if(x<this.constraints.minX){
x=this.constraints.minX;
}
if(y<this.constraints.minY){
y=this.constraints.minY;
}
if(x>this.constraints.maxX){
x=this.constraints.maxX;
}
if(y>this.constraints.maxY){
y=this.constraints.maxY;
}
}
this.setAbsolutePosition(x,y);
dojo.event.topic.publish("dragMove",{source:this});
},setAbsolutePosition:function(x,y){
if(!this.disableY){
this.dragClone.style.top=y+"px";
}
if(!this.disableX){
this.dragClone.style.left=x+"px";
}
},onDragEnd:function(e){
switch(e.dragStatus){
case "dropSuccess":
dojo.html.removeNode(this.dragClone);
this.dragClone=null;
break;
case "dropFailure":
var _159b=dojo.html.getAbsolutePosition(this.dragClone,true);
var _159c={left:this.dragStartPosition.x+1,top:this.dragStartPosition.y+1};
var anim=dojo.lfx.slideTo(this.dragClone,_159c,300);
var _159e=this;
dojo.event.connect(anim,"onEnd",function(e){
dojo.html.removeNode(_159e.dragClone);
_159e.dragClone=null;
});
anim.play();
break;
}
dojo.event.topic.publish("dragEnd",{source:this});
},constrainTo:function(_15a0){
this.constrainToContainer=true;
if(_15a0){
this.constrainingContainer=_15a0;
}else{
this.constrainingContainer=this.domNode.parentNode;
}
}},function(node,type){
this.domNode=dojo.byId(node);
this.type=type;
this.constrainToContainer=false;
this.dragSource=null;
dojo.dnd.DragObject.prototype.register.call(this);
});
dojo.declare("dojo.dnd.HtmlDropTarget",dojo.dnd.DropTarget,{vertical:false,onDragOver:function(e){
if(!this.accepts(e.dragObjects)){
return false;
}
this.childBoxes=[];
for(var i=0,child;i<this.domNode.childNodes.length;i++){
child=this.domNode.childNodes[i];
if(child.nodeType!=dojo.html.ELEMENT_NODE){
continue;
}
var pos=dojo.html.getAbsolutePosition(child,true);
var inner=dojo.html.getBorderBox(child);
this.childBoxes.push({top:pos.y,bottom:pos.y+inner.height,left:pos.x,right:pos.x+inner.width,height:inner.height,width:inner.width,node:child});
}
return true;
},_getNodeUnderMouse:function(e){
for(var i=0,child;i<this.childBoxes.length;i++){
with(this.childBoxes[i]){
if(e.pageX>=left&&e.pageX<=right&&e.pageY>=top&&e.pageY<=bottom){
return i;
}
}
}
return -1;
},createDropIndicator:function(){
this.dropIndicator=document.createElement("div");
with(this.dropIndicator.style){
position="absolute";
zIndex=999;
if(this.vertical){
borderLeftWidth="1px";
borderLeftColor="black";
borderLeftStyle="solid";
height=dojo.html.getBorderBox(this.domNode).height+"px";
top=dojo.html.getAbsolutePosition(this.domNode,true).y+"px";
}else{
borderTopWidth="1px";
borderTopColor="black";
borderTopStyle="solid";
width=dojo.html.getBorderBox(this.domNode).width+"px";
left=dojo.html.getAbsolutePosition(this.domNode,true).x+"px";
}
}
},onDragMove:function(e,_15ac){
var i=this._getNodeUnderMouse(e);
if(!this.dropIndicator){
this.createDropIndicator();
}
var _15ae=this.vertical?dojo.html.gravity.WEST:dojo.html.gravity.NORTH;
var hide=false;
if(i<0){
if(this.childBoxes.length){
var _15b0=(dojo.html.gravity(this.childBoxes[0].node,e)&_15ae);
if(_15b0){
hide=true;
}
}else{
var _15b0=true;
}
}else{
var child=this.childBoxes[i];
var _15b0=(dojo.html.gravity(child.node,e)&_15ae);
if(child.node===_15ac[0].dragSource.domNode){
hide=true;
}else{
var _15b2=_15b0?(i>0?this.childBoxes[i-1]:child):(i<this.childBoxes.length-1?this.childBoxes[i+1]:child);
if(_15b2.node===_15ac[0].dragSource.domNode){
hide=true;
}
}
}
if(hide){
this.dropIndicator.style.display="none";
return;
}else{
this.dropIndicator.style.display="";
}
this.placeIndicator(e,_15ac,i,_15b0);
if(!dojo.html.hasParent(this.dropIndicator)){
dojo.body().appendChild(this.dropIndicator);
}
},placeIndicator:function(e,_15b4,_15b5,_15b6){
var _15b7=this.vertical?"left":"top";
var child;
if(_15b5<0){
if(this.childBoxes.length){
child=_15b6?this.childBoxes[0]:this.childBoxes[this.childBoxes.length-1];
}else{
this.dropIndicator.style[_15b7]=dojo.html.getAbsolutePosition(this.domNode,true)[this.vertical?"x":"y"]+"px";
}
}else{
child=this.childBoxes[_15b5];
}
if(child){
this.dropIndicator.style[_15b7]=(_15b6?child[_15b7]:child[this.vertical?"right":"bottom"])+"px";
if(this.vertical){
this.dropIndicator.style.height=child.height+"px";
this.dropIndicator.style.top=child.top+"px";
}else{
this.dropIndicator.style.width=child.width+"px";
this.dropIndicator.style.left=child.left+"px";
}
}
},onDragOut:function(e){
if(this.dropIndicator){
dojo.html.removeNode(this.dropIndicator);
delete this.dropIndicator;
}
},onDrop:function(e){
this.onDragOut(e);
var i=this._getNodeUnderMouse(e);
var _15bc=this.vertical?dojo.html.gravity.WEST:dojo.html.gravity.NORTH;
if(i<0){
if(this.childBoxes.length){
if(dojo.html.gravity(this.childBoxes[0].node,e)&_15bc){
return this.insert(e,this.childBoxes[0].node,"before");
}else{
return this.insert(e,this.childBoxes[this.childBoxes.length-1].node,"after");
}
}
return this.insert(e,this.domNode,"append");
}
var child=this.childBoxes[i];
if(dojo.html.gravity(child.node,e)&_15bc){
return this.insert(e,child.node,"before");
}else{
return this.insert(e,child.node,"after");
}
},insert:function(e,_15bf,_15c0){
var node=e.dragObject.domNode;
if(_15c0=="before"){
return dojo.html.insertBefore(node,_15bf);
}else{
if(_15c0=="after"){
return dojo.html.insertAfter(node,_15bf);
}else{
if(_15c0=="append"){
_15bf.appendChild(node);
return true;
}
}
}
return false;
}},function(node,types){
if(arguments.length==0){
return;
}
this.domNode=dojo.byId(node);
dojo.dnd.DropTarget.call(this);
if(types&&dojo.lang.isString(types)){
types=[types];
}
this.acceptedTypes=types||[];
dojo.dnd.dragManager.registerDropTarget(this);
});
dojo.kwCompoundRequire({common:["dojo.dnd.DragAndDrop"],browser:["dojo.dnd.HtmlDragAndDrop"],dashboard:["dojo.dnd.HtmlDragAndDrop"]});
dojo.provide("dojo.dnd.*");
dojo.provide("ws.widget.ListView");
dojo.require("dojo.widget");
dojo.widget.defineWidget("ws.widget.ListView",dojo.widget.HtmlWidget,{widgetsInTemplate:true,speedUp:false,wrapperModelClass:null,gridPrefsTimeout:null,gridPrefsDelay:2000,templateCssString:".listView {\r\n\theight: 100%;\r\n\twidth: 100%;\r\n}\r\n\r\n.listView .turbogrid {\r\n\tbackground-color: #ffffff;\r\n\toverflow: hidden;   /* fixes double-scrollbar bug */\r\n}\r\n\r\n.listView .turbogrid-content { border: none; }\r\n.listView .turbogrid-scrollbox { border-top: 1px solid #d8d6d3; }\r\n.listView .turbogrid-row { border: none; cursor: pointer; }\r\n.listView .turbogrid-cell { border: none; }\r\n.listView .row-selected .turbogrid-cell { background-color: #edebe8 !important; }\r\n.listView .turbogrid-row-over .turbogrid-cell { background-color: #e4edfa !important; }\r\n.listView .turbogrid-header {\r\n\tbackground-color: #ffffff;\r\n\tcolor: #000000;\r\n\tfont-weight: bold;\r\n}\r\n.listView .turbogrid-header-col {\r\n\tbackground: transparent;\r\n\tborder-bottom: none;\r\n\tborder-left: none;\r\n\tborder-right: 1px solid #d8d6d3;\r\n}\r\n.listView .turbogrid-header-col-noBorder\r\n{\r\n\tborder-right: none !important;\r\n}\r\n.turbo-ie .listView .turbogrid-header-col {\r\n\tborder-bottom: none;\r\n}\r\n\r\n.listView .turbogrid .loading {\r\n\twidth: 100%;\r\n\theight: 50%;\r\n}\r\n.listView .turbogrid .loading table {\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\ttext-align: center;\r\n}\r\n\r\n.listView .hoverControl { width: 13px; height: 13px; background-image: url(\"${images}main.gif\"); }\r\n.listView .trashHover { background-position: -375px -0px; float: right; }\r\n.listView .trashHover:hover { background-position: -360px -0px; }\r\n.listView .composeHover { background-position: -0px -0px; float: left; width: 16px; height: 16px; }\r\n.listView .quickActionHover { background-position: -330px -0px; float: left; }\r\n.listView .quickActionHover:hover { background-position: -315px -0px; }\r\n\r\n.listView .gridIcon\r\n{\r\n\twidth: 15px;\r\n\theight: 15px;\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tbackground-repeat: no-repeat;\r\n}\r\n.listView .ckoffCol\t\t\t\t{ background-position: -1110px -0px;\t}\r\n.listView .ckonCol\t\t\t\t{ background-position: -1125px -0px;\t}\r\n.listView .ws_image_chkOnIcon\t{ background-position: -1125px -0px; margin:2px 0px 0px 2px; padding:0px; }\r\n.listView .ws_image_chkOffIcon\t{ background-position: -1110px -0px; margin:2px 0px 0px 2px; padding:0px; }\r\n\r\n/*** DnD ***/\r\n.gridDragObjectNormal\r\n{\r\n\tposition: absolute;\r\n\tborder: 1px solid #ADAAA6;\r\n\tbackground-color: #FFFFFF;\r\n}\r\n\r\n.gridDragObjectNormal img\r\n{\r\n\twidth: 18px;\r\n\theight: 18px;\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tbackground-position: -915px -30px;\r\n}\r\n\r\n.gridDragObjectGoodDrop\r\n{\r\n\tposition: absolute;\r\n\tborder: 1px solid green;\t/* Replace with correct color. */\r\n\tbackground-color: #FFFFFF;\r\n}\r\n\r\n.gridDragObjectGoodDrop img\r\n{\r\n\twidth: 18px;\r\n\theight: 18px;\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tbackground-position: -885px -30px;\r\n}\r\n\r\n.gridDragObjectBadDrop\r\n{\r\n\tposition: absolute;\r\n\tborder: 1px solid red;\t/* Replace with correct color. */\r\n\tbackground-color: #FFFFFF;\r\n}\r\n\r\n.gridDragObjectBadDrop img\r\n{\r\n\twidth: 18px;\r\n\theight: 18px;\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tbackground-position: -945px -30px;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("../ws/widget/ListView.css"),setModel:function(model){
if(model===this.model){
return;
}
this.model=model;
if(this.wrapperModelClass){
this.gridModel=new this.wrapperModelClass(null,this.model);
}else{
this.gridModel=this.model;
}
this.initView();
},initView:function(){
this.grid.setColumns(this.columns);
this.grid.stylizeRow=dojo.lang.hitch(this,"stylizeRow");
this.grid.cellClick=dojo.lang.hitch(this,"onCellClick");
this.grid.header.sortClick=dojo.lang.hitch(this,"onSortClick");
this.grid.cellOut=this.fixedCellOut;
dojo.event.connect("after",this.grid,"build",this,"hookOnScrollHandler");
this.fixSafari();
this.grid.header.click=dojo.lang.hitch(this,"headerClick");
this.grid.header.endResizeColumn=dojo.lang.hitch(this,"headerEndResizeColumn");
if(this.rowHeight){
this.grid.defaultRowHeight=this.rowHeight;
}
this.grid.builder.cellHeightPad=7;
this.grid.builder.cellWidthPad=7;
dojo.event.connect("after",this.grid,"onResized",this,"autosizeColumns");
this.autosizeColumns();
this.initHoverControl();
dojo.event.connect(this.grid.headerNode,"oncontextmenu",this,"onHeaderContextMenu");
dojo.event.connect("after",this.grid.header,"endDragColumn",this,"onHeaderColumnChange");
dojo.event.connect("after",this.grid.header,"endResizeColumn",this,"onHeaderColumnChange");
dojo.event.connect(this.gridModel,"modelUpdated",dojo.lang.hitch(this,function(){
this.grid.scroller.setRowCount(this.gridModel.getRowCount());
this.grid.update();
this.updateHeader();
this.updateZeroRowsView();
this.updateToolbarState();
}));
if(this.speedUp){
this.speedUpTheGrid();
}
this.grid.setModel(this.gridModel);
this.updateZeroRowsView();
this.updateToolbarState();
},layout:function(){
if(dojo.html.isDisplayed(this.domNode)){
if(this.layoutWidget){
this.layoutWidget.onResized();
}
this.grid.refresh();
}
},updateGrid:function(){
this.autosizeColumns();
this.updateHeader();
this.grid.update();
},onCellClick:function(e){
if(e.shiftKey){
if(this.model.selectRange&&("lastSelectRow" in this)){
var sel=this.gridModel.get(this.lastSelectRow,this.gridModel.columns.Select)=="ON";
var low=Math.min(this.lastSelectRow,e.rowIndex);
var high=Math.max(this.lastSelectRow,e.rowIndex);
if(!this.model.selectRange(low,high,sel)){
ws.widget.OkCancelDialog.alert(Config.Strings.TooManyItemsSelect);
}
}else{
this.model.toggleSelectRow(e.rowIndex);
}
this.lastSelectRow=e.rowIndex;
this.updateHeader();
this.updateToolbarState();
}else{
e.colIndex=this.grid.columns.get(e.cellIndex).key;
switch(e.colIndex){
case this.gridModel.columns.Select:
this.model.toggleSelectRow(e.rowIndex);
this.lastSelectRow=e.rowIndex;
this.updateHeader();
this.updateToolbarState();
break;
case this.gridModel.columns.Hover:
this.handleHoverControlClick(e);
break;
default:
this.handleCellClick(e);
break;
}
}
},handleCellClick:function(e){
},updateToolbarState:function(){
},onHeaderContextMenu:function(e){
},onHeaderColumnChange:function(){
},onSortClick:function(){
var ret=this.grid.sortClick();
if(ret&&this.reportingSortName){
ws.reporting.report(this.reportingSortName,this.reportingTab);
}
return ret;
},hookOnScrollHandler:function(){
if(!this.reportingScrollName){
return;
}
this.grid.scrollboxNode.onscroll=dojo.lang.hitch(this,function(){
if(this.reportScrollTimeout){
dojo.lang.clearTimeout(this.reportScrollTimeout);
}
this.reportScrollTimeout=dojo.lang.setTimeout(this,"reportScroll",2000);
this.grid.onscroll();
});
this.gridScrollTop=this.grid.scrollboxNode.scrollTop;
},reportScroll:function(){
var _15cc=this.grid.scrollboxNode.scrollTop;
var _15cd=dojo.html.getContentBox(this.grid.scrollboxNode).height;
if(_15cc>this.gridScrollTop+_15cd||_15cc<this.gridScrollTop-_15cd){
ws.reporting.report(this.reportingScrollName,this.reportingTab);
this.gridScrollTop=_15cc;
}
},fixSafari:function(){
if(!dojo.render.html.safari){
return;
}
this.grid.scroller.updateContentHeight=function(){
};
this.grid.scroller.invalidate=function(){
while(this.stack.length){
this.destroyPage(this.popPage());
}
this.pageHeights=[];
this.height=this.rowCount*this.defaultRowHeight;
this.resize();
};
},scrollToRow:function(row){
var _15cf=this.grid.scroller.findScrollTop(row);
this.grid.scrollboxNode.scrollTop=_15cf;
},stylizeRow:function(_15d0){
this.grid.rowClasses=this.getRowClasses(_15d0);
this.grid.rowState.odd=false;
if(this.disableHover){
this.grid.rowState.over=false;
}
},getRowClasses:function(_15d1){
var cls=[];
if(("Select" in this.gridModel.columns)&&(this.gridModel.get(_15d1,this.gridModel.columns.Select)=="ON")){
cls.push("row-selected");
}
return cls;
},autosizeColumns:function(){
var _15d3=dojo.html.getContentBox(this.grid.domNode).width-18;
for(var i=0;i<this.grid.columns.count();i++){
var col=this.grid.columns.get(i);
if(col.key!=this.autosizeColumnIndex&&!col.hidden){
_15d3-=(col.width+this.grid.builder.cellWidthPad);
}
}
_15d3-=this.grid.builder.cellWidthPad;
if(_15d3<50){
_15d3=50;
}
if(_15d3!=this.autosizeColumnWidth){
this.grid.setColWidth(this.keyToColIndex(this.autosizeColumnIndex),_15d3);
}
this.autosizeColumnWidth=_15d3;
},initHoverControl:function(){
this.gridModel.getHoverColumnCB=dojo.lang.hitch(this,"getHoverColumn");
dojo.event.connect(this.grid,"cellOver",dojo.lang.hitch(this,"onCellOver"));
dojo.event.connect(this.grid,"cellOut",dojo.lang.hitch(this,"onCellOut"));
if(this.rightClickMenuDefinition){
this.grid.docontextmenu=dojo.lang.hitch(this,"onContextMenu");
}
this.disableHover=false;
dojo.event.topic.subscribe("dragStart",this,function(){
this.disableHover=true;
});
dojo.event.topic.subscribe("dragEnd",this,function(){
this.disableHover=false;
});
},getHoverColumn:function(_15d6){
var _15d7=this.getQuickActionMenu(true);
var _15d8=(_15d7&&_15d7.isShowingNow)?this.quickActionRow:this.grid.over.row;
if(_15d6==_15d8&&!this.disableHover){
return this.hoverColumnHtml;
}else{
return "";
}
},onCellOver:function(_15d9,_15da,_15db){
if(!this.grid.columns.get(this.gridModel.columns.Hover).hidden){
this.grid.updateCell(_15da,this.keyToColIndex(this.gridModel.columns.Hover));
}
},onCellOut:function(_15dc,_15dd,_15de){
if(!this.grid.columns.get(this.gridModel.columns.Hover).hidden){
this.grid.updateCell(_15dc,this.keyToColIndex(this.gridModel.columns.Hover));
}
},keyToColIndex:function(key){
for(var i=0;i<this.grid.columns.count();i++){
if(this.grid.columns.get(i).key==key){
return i;
}
}
return -1;
},getQuickActionMenu:function(_15e1){
if(this.quickActionMenu){
return this.quickActionMenu;
}else{
if(!_15e1){
this.createQuickActionMenu();
return this.quickActionMenu;
}else{
return null;
}
}
},getRightClickMenu:function(_15e2){
},handleHoverControlClick:function(e){
if(dojo.html.hasClass(e.target,"quickActionHover")){
var menu=this.getQuickActionMenu();
if(menu.isShowingNow&&this.quickActionRow==e.rowIndex){
menu.close();
}else{
this.quickActionRow=e.rowIndex;
this.updateQuickActionMenu(menu);
menu.open(e.target,null,[]);
this.selectOnlyQuickActionRow();
}
}
},onContextMenu:function(e){
var _15e6=this.getRightClickMenu();
if(_15e6.isShowingNow){
_15e6.close();
}
this.quickActionRow=e.rowIndex;
this.updateRightClickMenu(_15e6);
_15e6.open(e.pageX,e.pageY,null,[]);
this.selectOnlyQuickActionRow();
dojo.event.browser.stopEvent(e);
},selectOnlyQuickActionRow:function(){
if(this.model.isAnySelected&&this.model.isAnySelected()){
this.model.deselectAll();
this.model.toggleSelectRow(this.quickActionRow);
}
},createQuickActionMenu:function(){
this.quickActionMenu=ws.widget.createMenu(this.quickActionMenuDefinition);
dojo.event.connect("after",this.quickActionMenu,"close",dojo.lang.hitch(this,function(){
var row=this.quickActionRow;
this.grid.updateCell(row,this.keyToColIndex(this.gridModel.columns.Hover));
}));
return this.quickActionMenu;
},updateQuickActionMenu:function(menu){
},createRightClickMenu:function(){
},headerEndResizeColumn:function(_15e9){
this.resizingColumn=true;
dojo.lang.setTimeout(this,function(){
this.resizingColumn=false;
},0);
turbo.defer(this.grid,"update",100);
},headerClick:function(e){
if(this.resizingColumn){
return;
}
var key=this.grid.columns.get(e.colIndex).key;
if(this.gridModel&&(key==this.gridModel.columns.Select)&&this.model.selectAll){
if(this.model.isAllSelected()){
this.model.deselectAll();
}else{
if(!this.model.selectAll()){
ws.widget.OkCancelDialog.alert(Config.Strings.TooManyItemsSelect);
}
}
}else{
this.grid.header.setSortColumn(e.colIndex);
if(!this.grid.header.sortClick()){
this.grid.header.setSortColumn(-1);
}
}
},updateHeader:function(){
if(this.gridModel&&("Select" in this.gridModel.columns)){
var all=this.model&&this.model.isAllSelected&&this.model.isAllSelected();
var _15ed=this.keyToColIndex(this.gridModel.columns.Select);
var col=this.grid.columns.get(_15ed);
col.caption="<img src='"+Config.SpacerImageURL+"' class='gridIcon "+(all?"ws_image_chkOnIcon":"ws_image_chkOffIcon")+"' />";
this.grid.header.build();
}
},updateZeroRowsView:function(){
var show=(this.gridModel.getRowCount()==0);
var _15f0=this.model.isLoading&&this.model.isLoading();
var _15f1=this.model.isErrorState&&this.model.isErrorState();
if(show&&!this.zeroRowsNode){
this.zeroRowsNode=document.createElement("div");
this.zeroRowsNode.className="loading";
this.grid.domNode.appendChild(this.zeroRowsNode);
}
if(this.zeroRowsNode){
if(show){
var msg=_15f0?this.getLoadingMessage():(_15f1?this.getErrorMessage():this.getZeroRowsMessage());
this.zeroRowsNode.innerHTML="<table><tr><td valign='center'>"+msg+"</td></tr></table>";
}
dojo.html.setVisibility(this.grid.scrollboxNode,!show);
dojo.html.setVisibility(this.grid.topNode,!show);
dojo.html.setShowing(this.zeroRowsNode,show);
}
},getLoadingMessage:function(){
return ws.string.substituteParams("<img src='{0}images/progressAnimation.gif' style='margin: -3px 4px;' height='16' width='16' align='bottom'>&nbsp;{1}",Config.BaseResourcesURL,Config.Strings.Loading);
},getErrorMessage:function(){
return Config.Strings.Error;
},getZeroRowsMessage:function(){
return Config.Strings.NoMatchesFound;
},baseSprites:{chkBox:{NONE:"",ON:"ckonCol",OFF:"ckoffCol"}},speedUpTheGrid:function(){
this.grid.fastScroll=false;
this.grid.scroller.renderPage=dojo.lang.hitch(this,"fastRenderPage");
this.grid.scroller.getDefaultNodes=function(){
return this.pageNodes[1];
};
},fastRenderPage:function(_15f3){
var start=new Date();
var _15f5=this.grid.scroller;
var nodes=[];
for(var i=0;i<_15f5.colCount;i++){
nodes[i]=_15f5.pageNodes[i][_15f3];
}
var html=[];
var grid=this.grid;
var _15fa=grid.builder;
var data,c,x,col,d,_1600;
var _1601=Config.SpacerImageURL;
var _1602=_15fa.colCount;
var _1603=_15fa.cellWidthPad;
var _1604=_15f3*_15f5.rowsPerPage;
if(this.rowHeight){
var _1605="height: "+(this.rowHeight+_15fa.defaultUnits);
}else{
var _1605="height: "+(_15fa.defaultRowHeight+_15fa.defaultUnits);
}
for(var i=0,j=_1604;i<_15f5.rowsPerPage&&j<_15f5.rowCount;i++,j++){
data=this.gridModel.getRow(j);
html.push("<div class=\"turbogrid-row ",this.getRowClasses(j).join(" "),"\" style=\"",_1605,"\" rowIndex=\"",j,"\">");
for(c=0,x=0;c<_1602;c++){
col=_15fa.columns.get(c);
if(col.hidden){
html.push("<span></span>");
continue;
}
if(!col.preformat){
var f=["height: ",(this.rowHeight?this.rowHeight:_15fa.defaultRowHeight)-_15fa.cellHeightPad,"px; width:",col.width,"px;",col.colStyle];
if(col.align){
f.push("text-align:",col.align,";");
}
col.preStyles=f.join("");
col.preformat="style=\""+col.preStyles;
}
d=data[col.key];
if(col.sprites){
_1600=col.sprites[d];
if(_1600){
d=["<img src='",_1601,"' class='gridIcon ",_1600,"' />"].join("");
}else{
d="";
}
}else{
if("root" in col){
d=["<img src='",col.root,d,"' />"].join("");
}
}
html.push("<span class=\"turbogrid-cell\" ",col.preformat,"; left:",x,"px;\">",d,"</span>");
x+=col.width+_1603;
}
html.push("</div>");
}
nodes[1].innerHTML=html.join("");
var _1608=nodes[1].childNodes;
for(var i=0;i<_1608.length;i++){
var row=_1608[i];
var idx=_1604+i;
grid.rowNodes[idx]=row;
row.rowIndex=idx;
row.dataIndex=idx;
row.builderNode=true;
row._style=_1605;
}
dojo.debug("renderPage: ",new Date()-start);
},fixedCellOut:function(_160b,_160c,_160d){
return dojo.widget.html.TurboGrid.prototype.cellOut.apply(this,[_160b,_160c,false]);
},_onKeyPress:function(evt){
if(!this.isShowing()){
return;
}
var _160f=false;
if(Config.EnableKeyboardShortcuts&&evt.key&&dojo.lang.isString(evt.key)&&!(evt.ctrlKey||evt.altKey||evt.metaKey)){
if(this.grid.lastOverCell){
switch(evt.key.toLowerCase()){
case Config.Strings.KeyListToggleCheckItem:
this.model.toggleSelectRow(this.grid.over.row);
this.lastSelectRow=this.grid.over.row;
this.updateHeader();
this.updateToolbarState();
_160f=true;
break;
case Config.Strings.KeyListOpenQuickActionMenu:
var _1610=this.grid.over.row;
var menu=this.getQuickActionMenu(false);
if(menu&&menu.isShowingNow&&(this.quickActionRow!=_1610)){
menu.close();
}
var cell=this.grid.getCellNode(_1610,3);
if(cell){
this.quickActionRow=_1610;
this.updateQuickActionMenu(menu);
var _1613=dojo.html.getAbsolutePosition(cell);
menu.open(_1613.x+10,_1613.y+10,null,[]);
this.selectOnlyQuickActionRow();
}
_160f=true;
break;
}
}
}else{
if(Config.EnableKeyboardShortcuts&&evt.key){
var menu=this.getQuickActionMenu(true);
if(menu&&menu.isShowingNow){
return;
}
if(dojo.render.os.mac&&evt.metaKey){
if(evt.key==dojo.event.browser.keys.KEY_UP_ARROW){
evt.key=dojo.event.browser.keys.KEY_PAGE_UP;
}else{
if(evt.key==dojo.event.browser.keys.KEY_DOWN_ARROW){
evt.key=dojo.event.browser.keys.KEY_PAGE_DOWN;
}else{
if(evt.key==dojo.event.browser.keys.KEY_LEFT_ARROW){
evt.key=dojo.event.browser.keys.KEY_HOME;
}else{
if(evt.key==dojo.event.browser.keys.KEY_RIGHT_ARROW){
evt.key=dojo.event.browser.keys.KEY_END;
}
}
}
}
}
switch(evt.key){
case dojo.event.browser.keys.KEY_UP_ARROW:
var _1610;
var _1614=0;
if(this.grid.lastOverCell){
_1610=this.grid.over.row;
_1614=this.grid.over.col;
}else{
_1610=Math.floor((this.grid.scrollboxNode.scrollTop+this.grid.scroller.windowHeight)/this.grid.defaultRowHeight);
}
var cell=this.grid.getCellNode(_1610-1,_1614);
if(cell){
var _1615=false;
if(_1610-1<(Math.floor(this.grid.scrollboxNode.scrollTop/this.grid.defaultRowHeight)+1)){
_1615=true;
}
this.grid.cellOut(_1610,_1614,false);
this.grid.cellOver(cell,_1610-1,_1614);
if(_1615){
var _1616=this.grid.scrollboxNode.scrollTop-this.grid.defaultRowHeight;
this.scrollOnKeyPress(_1616);
}
}
_160f=true;
break;
case dojo.event.browser.keys.KEY_DOWN_ARROW:
var _1610;
var _1614=0;
if(this.grid.lastOverCell){
_1610=this.grid.over.row;
_1614=this.grid.over.col;
}else{
_1610=Math.floor(this.grid.scrollboxNode.scrollTop/this.grid.defaultRowHeight);
}
var cell=this.grid.getCellNode(_1610+1,_1614);
if(cell){
var _1615=false;
if(_1610+1>(Math.floor((this.grid.scrollboxNode.scrollTop+this.grid.scroller.windowHeight)/this.grid.defaultRowHeight)-1)){
_1615=true;
}
this.grid.cellOut(_1610,_1614,false);
this.grid.cellOver(cell,_1610+1,_1614);
if(_1615){
var _1616=this.grid.scrollboxNode.scrollTop+this.grid.defaultRowHeight;
this.scrollOnKeyPress(_1616);
}
}
_160f=true;
break;
case dojo.event.browser.keys.KEY_PAGE_UP:
var _1610;
var _1614=0;
if(this.grid.lastOverCell){
_1610=this.grid.over.row;
_1614=this.grid.over.col;
}else{
_1610=Math.floor((this.grid.scrollboxNode.scrollTop+this.grid.scroller.windowHeight)/this.grid.defaultRowHeight);
}
var _1617=this.grid.scrollboxNode.scrollTop/this.grid.defaultRowHeight;
var _1618=Math.ceil(_1617);
var _1615=true;
var _1616=0;
if(_1610>_1618){
if(Math.round(_1617)<_1618){
_1615=true;
_1618--;
_1616=_1618*this.grid.defaultRowHeight;
}else{
_1615=false;
}
}else{
if(_1610==_1618){
var _1619=(_1610+1)*this.grid.defaultRowHeight-this.grid.scroller.windowHeight;
if(_1619<0){
_1619=0;
}
_1618=Math.round(_1619/this.grid.defaultRowHeight);
}
}
var cell=null;
while(_1618<=_1610){
cell=this.grid.getCellNode(_1618,_1614);
if(cell){
break;
}
_1618++;
}
_1616=_1618*this.grid.defaultRowHeight;
if(_1610>_1618){
this.grid.cellOut(_1610,_1614,false);
this.grid.cellOver(cell,_1618,_1614);
if(_1615){
this.scrollOnKeyPress(_1616);
}
}
_160f=true;
break;
case dojo.event.browser.keys.KEY_PAGE_DOWN:
var _1610;
var _1614=0;
if(this.grid.lastOverCell){
_1610=this.grid.over.row;
_1614=this.grid.over.col;
}else{
_1610=Math.floor(this.grid.scrollboxNode.scrollTop/this.grid.defaultRowHeight);
}
var _161a=(this.grid.scrollboxNode.scrollTop+this.grid.scroller.windowHeight)/this.grid.defaultRowHeight;
var _161b=Math.round(_161a)-1;
var _1615=true;
var _1616=0;
if(_1610<_161b){
if(Math.round(_161a)>Math.floor(_161a)){
_1615=true;
_1616=((_161b+1)*this.grid.defaultRowHeight)-this.grid.scroller.windowHeight;
}else{
_1615=false;
}
}else{
if(_1610==_161b){
_161b=Math.round((_1610*this.grid.defaultRowHeight+this.grid.scroller.windowHeight)/this.grid.defaultRowHeight)-1;
_1616=((_161b+1)*this.grid.defaultRowHeight)-this.grid.scroller.windowHeight;
}
}
if(_1610<_161b){
this.grid.cellOut(_1610,_1614,false);
if(_1615){
this.scrollOnKeyPress(_1616);
}
var cell=null;
while(_1610<=_161b){
cell=this.grid.getCellNode(_161b,_1614);
if(cell){
break;
}
_161b--;
}
this.grid.cellOver(cell,_161b,_1614);
}
_160f=true;
break;
case dojo.event.browser.keys.KEY_HOME:
var _1610=0;
var _1614=0;
if(this.grid.lastOverCell){
_1610=this.grid.over.row;
_1614=this.grid.over.col;
this.grid.cellOut(_1610,_1614,false);
}
var cell=this.grid.getCellNode(0,_1614);
if(cell){
this.grid.cellOver(cell,0,_1614);
}
this.scrollOnKeyPress(0);
_160f=true;
break;
case dojo.event.browser.keys.KEY_END:
var _1610=0;
var _1614=0;
if(this.grid.lastOverCell){
_1610=this.grid.over.row;
_1614=this.grid.over.col;
this.grid.cellOut(_1610,_1614,false);
}
var _161c=this.grid.scroller.pageCount*this.grid.scroller.rowsPerPage;
var _1616=(_161c+1)*this.grid.defaultRowHeight-this.grid.scroller.windowHeight;
this.scrollOnKeyPress(_1616);
var _161c=this.grid.rowNodes.length-1;
var cell=this.grid.getCellNode(_161c,_1614);
if(cell){
this.grid.cellOver(cell,_161c,_1614);
}
_160f=true;
break;
case dojo.event.browser.keys.KEY_DELETE:
this.onDelKeyPress();
_160f=true;
break;
case dojo.event.browser.keys.KEY_BACKSPACE:
if(dojo.render.os.mac){
this.onDelKeyPress();
_160f=true;
}
break;
case dojo.event.browser.keys.KEY_ENTER:
this.onEnterKeyPress();
_160f=true;
break;
}
}
}
if(!_160f){
this.onOtherKeyPress(evt);
}else{
evt.preventDefault();
}
},scrollOnKeyPress:function(_161d){
this.grid.scrollboxNode.scrollTop=_161d;
var _161e=function(){
};
this.grid.domouseover=_161e;
this.grid.domouseout=_161e;
var _161f=this.grid.mouseover;
var _1620=this.grid.mouseout;
this.grid.mouseover=_161e;
this.grid.mouseout=_161e;
this.grid.scroller.scroll(this.grid.scrollboxNode.scrollTop);
dojo.lang.setTimeout(ws.lang.hitch(this,"restoreMouseHandler",_161f,_1620),150);
},restoreMouseHandler:function(_1621,_1622){
this.grid.mouseover=_1621;
this.grid.mouseout=_1622;
this.grid.domouseover=this.grid.defaultMouseOver;
this.grid.domouseout=this.grid.defaultMouseOut;
},onEnterKeyPress:function(){
},onDelKeyPress:function(){
},onOtherKeyPress:function(evt){
},saveGridPrefs:function(_1624){
if(this.gridPrefsTimeout){
dojo.lang.clearTimeout(this.gridPrefsTimeout);
}
this.gridPrefsTimeout=dojo.lang.setTimeout(this,"_saveGridPrefs",this.gridPrefsDelay,_1624);
},_saveGridPrefs:function(_1625){
this.gridPrefsTimeout=null;
ws.io.rpc({action:"HiddenSettings",content:_1625,load:dojo.lang.hitch(this,function(data){
dojo.debug("saveGridPrefs: "+data.toSource());
}),error:dojo.lang.hitch(this,function(){
dojo.debug("saveGridPrefs error");
})});
}});
turbo.grid.format.sprite=function(_1627,_1628){
var _1629=(this.sprites&&this.sprites[_1627])?this.sprites[_1627]:null;
if(_1629==null){
return "<img src='"+Config.SpacerImageURL+"' />";
}else{
return ws.string.substituteParams("<img src='%{0}' class='gridIcon %{1}' />",Config.SpacerImageURL,_1629);
}
};
turbo.grid.columns.sprite={align:"center",formatter:turbo.grid.format.sprite};
dojo.lang.declare("ws.widget.GridDragSource",dojo.dnd.HtmlDragSource,function(node,type,_162c){
this.dragObjectCtor=ws.widget.GridDragObject;
this.listView=_162c;
this.fixupDragManager();
this.fixupGrid();
},{onDragStart:function(){
dojo.event.topic.publish("dragStart",{source:this});
var t=dojo.dnd.dragManager.mouseDownTarget;
while(t!=null&&!dojo.html.hasClass(t,"turbogrid-row")){
t=t.parentNode;
}
this.dragObject=t;
this.rowIndex=dojo.html.getAttribute(this.dragObject,"rowindex");
var _162e=new this.dragObjectCtor(this.dragObject,this.type,this.listView);
if(this.dragClass){
_162e.dragClass=this.dragClass;
}
if(this.constrainToContainer){
_162e.constrainTo(this.constrainingContainer||this.domNode.parentNode);
}
return _162e;
},onDragEnd:function(){
dojo.event.topic.publish("dragEnd",{source:this});
},fixupDragManager:function(){
if(ws.widget.GridDragSource.fixedupDragManager){
return;
}
ws.widget.GridDragSource.fixedupDragManager=true;
dojo.event.connect("after",dojo.dnd.dragManager,"onMouseDown",function(e){
dojo.dnd.dragManager.mouseDownTarget=e.target;
});
},fixupGrid:function(){
this.listView.grid.scrollboxNode.onmousedown=null;
this.listView.grid.domousedown=function(){
return true;
};
}});
dojo.lang.declare("ws.widget.GridDragObject",dojo.dnd.HtmlDragObject,function(node,type,_1632){
this.listView=_1632;
},{createDragNode:function(){
var node=document.createElement("div");
var _1634=document.createElement("img");
var _1635=document.createElement("span");
var _1636=this.listView.getDragObjectLabel(dojo.html.getAttribute(this.domNode,"rowindex"));
_1634.src=Config.SpacerImageURL;
_1634.align="absmiddle";
if(dojo.string.isBlank(_1636)){
_1636=Config.Strings.YourMessageNoCaps;
}else{
_1636=dojo.string.summary(dojo.string.escapeXml(_1636),21);
}
_1635.innerHTML=_1636;
dojo.html.setStyle(_1635,"padding","0px 3px 0px 5px");
node.appendChild(_1634);
node.appendChild(_1635);
dojo.html.setClass(node,"gridDragObjectNormal");
new dojo.html.BackgroundIframe(node);
return node;
},onDragStart:function(e){
ws.widget.GridDragObject.superclass.onDragStart.apply(this,arguments);
this.dragOffset={x:15,y:2};
this.onDragMove(e);
}});
dojo.provide("ws.widget.Splitter");
dojo.widget.defineWidget("ws.widget.Splitter",dojo.widget.HtmlWidget,{orientation:"left",splitterWidth:1,splitterMargin:3,minWidth:0,maxWidth:400,collapseThreshhold:40,collapsable:false,isCollapsed:false,templateCssString:".wsSplitter .separator\r\n{\r\n\tbackground-color: #adaaa6;\r\n}\r\n\r\n.wsSplitter.right .separator\r\n{\r\n\tbackground: url(\"${images}main.gif\") -1101px -0px;\r\n\tbackground-repeat: repeat-y;\r\n}\r\n\r\n.wsSplitter .collapseButton\r\n{\r\n\twidth: 9px;\r\n\theight: 22px;\r\n\tleft: -5px;\r\n\ttop: 17px;\r\n\tcursor: hand;\r\n\tcursor: pointer;\r\n\tbackground: url(\"${images}main.gif\") -1090px -0px;\r\n}\r\n.wsSplitter .collapsed\r\n{\r\n\tbackground-position: -1078px -0px;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("../ws/widget/Splitter.css"),fillInTemplate:function(){
this.isOrientationRight=false;
this.mouseDown=false;
this.startX=0;
this.startY=0;
this.size=null;
this.resizeNode=null;
this.resizeNodeSize=null;
this.bounds=null;
this.domNode.style.position="absolute";
this.domNode.className="wsSplitter"+" "+this.orientation;
dojo.html.setMarginBox(this.domNode,{width:this.splitterWidth+2*this.splitterMargin});
this.visibleNode=document.createElement("div");
this.visibleNode.style.height="100%";
this.visibleNode.style.width=this.splitterWidth+"px";
this.visibleNode.style.position="absolute";
this.visibleNode.style.left=this.splitterMargin+"px";
this.visibleNode.className="separator";
this.domNode.appendChild(this.visibleNode);
if(this.collapsable){
this.collapseNode=document.createElement("div");
this.collapseNode.style.position="absolute";
this.collapseNode.style.zIndex=this.domNode.style.zIndex+1;
this.collapseNode.className="collapseButton";
this.domNode.appendChild(this.collapseNode);
dojo.event.connect(this.collapseNode,"onmousedown",this,"onCollapse");
}
if(this.orientation=="right"){
this.isOrientationRight=true;
this.domNode.style.cursor="e-resize";
}else{
this.isOrientationRight=false;
this.domNode.style.cursor="w-resize";
}
dojo.event.connect(this.domNode,"onmousedown",this,"onMouseDown");
dojo.event.connect(this.domNode,"onmouseup",this,"onMouseUp");
dojo.event.connect(this.domNode,"onmousemove",this,"onMouseMove");
dojo.event.connect(this.domNode,"onmouseover",this,"killCapturedEvent");
dojo.event.connect(this.domNode,"onmouseout",this,"killCapturedEvent");
dojo.event.connect(this.domNode,"onkeydown",this,"onKeyDown");
},setHeight:function(_1638){
this.domNode.style.height=_1638+"px";
this.visibleNode.style.height=_1638+"px";
},onMouseDown:function(event){
this.mouseDown=true;
this.startX=parseInt(this.domNode.offsetLeft)+this.splitterMargin;
this.startY=parseInt(this.domNode.offsetTop);
this.size={width:this.splitterWidth,height:dojo.html.getMarginBox(this.domNode).height};
var node=null;
if(this.isOrientationRight){
node=this.domNode.nextSibling;
while(node&&node.nodeType!=1){
node=node.nextSibling;
}
}else{
node=this.domNode.previousSibling;
while(node&&node.nodeType!=1){
node=node.previousSibling;
}
}
this.resizeNode=node;
this.resizeNodeSize={width:dojo.html.getMarginBox(this.resizeNode).width,height:dojo.html.getMarginBox(this.resizeNode).height};
var _163b=0;
var _163c=0;
if(this.isOrientationRight){
var left=parseInt(this.domNode.offsetLeft)+this.size.width;
var right=left+this.resizeNodeSize.width;
_163b=right-this.maxWidth-this.size.width;
_163c=right-this.minWidth-this.size.width;
}else{
var left=parseInt(this.resizeNode.offsetLeft);
_163b=left+this.minWidth;
_163c=left+this.maxWidth;
}
this.bounds={minLeft:_163b,maxLeft:_163c};
turbo.capture(this.domNode);
dojo.event.connect(document.documentElement,"onkeydown",this,"onKeyDown");
document.body.style.cursor=this.domNode.style.cursor;
},onCollapse:function(event){
this.killCapturedEvent(event);
if(!this.isCollapsed){
this.isCollapsed=true;
this.startX=parseInt(this.domNode.offsetLeft)+this.splitterMargin;
this.startY=parseInt(this.domNode.offsetTop);
this.size={width:dojo.html.getMarginBox(this.domNode).width-this.splitterMargin,height:dojo.html.getMarginBox(this.domNode).height};
if(this.isOrientationRight){
var node=this.domNode.nextSibling;
while(node&&node.nodeType!=1){
node=node.nextSibling;
}
this.resizeNode=node;
this.resizeNodeSize={width:dojo.html.getMarginBox(this.resizeNode).width,height:dojo.html.getMarginBox(this.resizeNode).height};
}
var _1641=dojo.html.getViewport().width;
if(dojo.render.html.safari){
_1641-=5;
}
this.domNode.style.left=_1641+"px";
}else{
this.isCollapsed=false;
this.domNode.style.left=dojo.html.getViewport().width-this.minWidth+"px";
}
ws.html.toggleClass(this.collapseNode,"collapsed",this.isCollapsed);
this.resize();
ws.WebSuite.resize();
dojo.event.topic.publish("Splitter/collapse",{id:this.domNode.id,isCollapsed:this.isCollapsed});
},onMouseUp:function(event){
if(this.mouseDown){
this.mouseDown=false;
turbo.release(this.domNode);
dojo.event.disconnect(document.documentElement,"onkeydown",this,"onKeyDown");
document.body.style.cursor="";
this.resize();
}
},onMouseMove:function(event){
if(this.mouseDown){
this.killCapturedEvent(event);
var _1644=event.pageX;
if(this.isOrientationRight){
if(_1644>(this.bounds.maxLeft-this.collapseThreshhold)){
_1644=this.bounds.maxLeft;
}
if(_1644>this.bounds.maxLeft){
_1644=this.bounds.maxLeft;
}
if(_1644<this.bounds.minLeft){
_1644=this.bounds.minLeft;
}
}else{
if(_1644<(this.bounds.minLeft+this.collapseThreshhold)){
_1644=this.bounds.minLeft;
}
if(_1644<this.bounds.minLeft){
_1644=this.bounds.minLeft;
}
if(_1644>this.bounds.maxLeft){
_1644=this.bounds.maxLeft;
}
}
this.domNode.style.left=(_1644-this.splitterMargin)+"px";
this.domNode.style.zIndex=900;
}
},onKeyDown:function(event){
if(this.mouseDown){
this.killCapturedEvent(event);
if(event.keyCode!=event.KEY_ESCAPE){
return;
}
this.cancel();
}
},killCapturedEvent:function(_1646){
if(this.mouseDown&&_1646){
dojo.event.browser.stopEvent(_1646);
}
},resize:function(){
var _1647=false;
if(this.isOrientationRight){
var left=parseInt(this.domNode.offsetLeft)+this.size.width+this.splitterMargin;
var right=this.startX+this.size.width+this.resizeNodeSize.width;
var width=right-left;
this.resizeNode.style.left=left+"px";
dojo.html.setMarginBox(this.resizeNode,{width:width});
_1647=(width<=0)?true:false;
}else{
var _164b=parseInt(this.resizeNode.offsetLeft);
var sLeft=parseInt(this.domNode.offsetLeft)+this.splitterMargin;
var width=sLeft-_164b;
dojo.html.setMarginBox(this.resizeNode,{width:width});
_1647=(width<=0)?true:false;
}
if(_1647){
this.resizeNode.style.display="none";
}else{
this.resizeNode.style.display="";
}
this.domNode.style.zIndex="";
dojo.event.topic.publish("Splitter/resize");
},cancel:function(){
this.mouseDown=false;
turbo.release(this.domNode);
dojo.event.disconnect(document.documentElement,"onkeydown",this,"keydown");
document.body.style.cursor="";
this.domNode.style.left=this.startX+"px";
this.domNode.style.zIndex="";
}});
dojo.provide("dojo.widget.LayoutContainer");
dojo.widget.defineWidget("dojo.widget.LayoutContainer",dojo.widget.HtmlWidget,{isContainer:true,layoutChildPriority:"top-bottom",postCreate:function(){
dojo.widget.html.layout(this.domNode,this.children,this.layoutChildPriority);
},addChild:function(child,_164e,pos,ref,_1651){
dojo.widget.LayoutContainer.superclass.addChild.call(this,child,_164e,pos,ref,_1651);
dojo.widget.html.layout(this.domNode,this.children,this.layoutChildPriority);
},removeChild:function(pane){
dojo.widget.LayoutContainer.superclass.removeChild.call(this,pane);
dojo.widget.html.layout(this.domNode,this.children,this.layoutChildPriority);
},onResized:function(){
dojo.widget.html.layout(this.domNode,this.children,this.layoutChildPriority);
},show:function(){
this.domNode.style.display="";
this.checkSize();
this.domNode.style.display="none";
this.domNode.style.visibility="";
dojo.widget.LayoutContainer.superclass.show.call(this);
}});
dojo.lang.extend(dojo.widget.Widget,{layoutAlign:"none"});
dojo.provide("ws.widget.WSLayoutContainer");
dojo.widget.defineWidget("ws.widget.WSLayoutContainer",dojo.widget.LayoutContainer,{deferred:false,postCreate:function(args,frag){
if(!this.deferred){
ws.widget.WSLayoutContainer.superclass.postCreate.apply(this,arguments);
}
}});
dojo.provide("dojo.widget.Menu2");
dojo.declare("dojo.widget.MenuBase",null,function(){
this.eventNames={open:""};
},{isContainer:true,isMenu:true,eventNaming:"default",templateCssString:"\r\n.dojoPopupMenu2 {\r\n\tposition: absolute;\r\n\tborder: 1px solid #7298d0;\r\n\tbackground:#85aeec url(images/soriaMenuBg.gif) repeat-x bottom left !important;\r\n\tpadding: 1px;\r\n\tmargin-top: 1px;\r\n\tmargin-bottom: 1px;\r\n}\r\n\r\n.dojoMenuItem2{\r\n\twhite-space: nowrap;\r\n\tfont: menu;\r\n\tmargin: 0;\r\n}\r\n\r\n.dojoMenuItem2Hover {\r\n\tbackground-color: #D2E4FD;\r\n\tcursor:pointer;\r\n\tcursor:hand;\r\n}\r\n\r\n.dojoMenuItem2Icon {\r\n\tposition: relative;\r\n\tbackground-position: center center;\r\n\tbackground-repeat: no-repeat;\r\n\twidth: 16px;\r\n\theight: 16px;\r\n\tpadding-right: 3px;\r\n}\r\n\r\n.dojoMenuItem2Label {\r\n\tposition: relative;\r\n\tvertical-align: middle;\r\n}\r\n\r\n/* main label text */\r\n.dojoMenuItem2Label {\r\n\tposition: relative;\r\n\tvertical-align: middle;\r\n}\r\n\r\n.dojoMenuItem2Accel {\r\n\tposition: relative;\r\n\tvertical-align: middle;\r\n\tpadding-left: 3px;\r\n}\r\n\r\n.dojoMenuItem2Disabled .dojoMenuItem2Label,\r\n.dojoMenuItem2Disabled .dojoMenuItem2Accel {\r\n\tcolor: #607a9e;\r\n}\r\n\r\n.dojoMenuItem2Submenu {\r\n\tposition: relative;\r\n\tbackground-position: center center;\r\n\tbackground-repeat: no-repeat;\r\n\tbackground-image: url(images/submenu_off.gif);\r\n\twidth: 5px;\r\n\theight: 9px;\r\n\tpadding-left: 3px;\r\n}\r\n.dojoMenuItem2Hover .dojoMenuItem2Submenu {\r\n\tbackground-image: url(images/submenu_on.gif);\r\n}\r\n\r\n.dojoMenuItem2Disabled .dojoMenuItem2Submenu {\r\n\tbackground-image: url(images/submenu_disabled.gif);\r\n}\r\n\r\n.dojoMenuSeparator2 {\r\n\tfont-size: 1px;\r\n\tmargin: 0;\r\n}\r\n\r\n.dojoMenuSeparator2Top {\r\n\theight: 50%;\r\n\tborder-bottom: 1px solid #7a98c4;\r\n\tmargin: 0px 2px;\r\n\tfont-size: 1px;\r\n}\r\n\r\n.dojoMenuSeparator2Bottom {\r\n\theight: 50%;\r\n\tborder-top: 1px solid #c9deff;\r\n\tmargin: 0px 2px;\r\n\tfont-size: 1px;\r\n}\r\n\r\n.dojoMenuBar2 {\r\n\tbackground:#85aeec url(images/soriaBarBg.gif) repeat-x top left;\r\n\t/*border-bottom:1px solid #6b9fec;*/\r\n\tpadding: 1px;\r\n}\r\n\r\n.dojoMenuBar2 .dojoMenuItem2 {\r\n\twhite-space: nowrap;\r\n\tfont: menu;\r\n\tmargin: 0;\r\n\tposition: relative;\r\n\tvertical-align: middle;\r\n\tz-index: 1;\r\n\tpadding: 3px 8px;\r\n\tdisplay: inline;/* needed in khtml to display correctly */\r\n\tdisplay: -moz-inline-box;/* needed in firefox */\r\n\tcursor:pointer;\r\n\tcursor:hand;\r\n}\r\n\r\n.dojoMenuBar2 .dojoMenuItem2Hover {\r\n\tbackground-color:#d2e4fd;\r\n}\r\n\r\n.dojoMenuBar2 .dojoMenuItem2Disabled span {\r\n\tcolor: #4f6582;\r\n}\r\n",templateCssPath:dojo.uri.moduleUri("dojo.widget","templates/Menu2.css"),submenuDelay:500,initialize:function(args,frag){
if(this.eventNaming=="default"){
for(var _1657 in this.eventNames){
this.eventNames[_1657]=this.widgetId+"/"+_1657;
}
}
},_moveToNext:function(evt){
this._highlightOption(1);
return true;
},_moveToPrevious:function(evt){
this._highlightOption(-1);
return true;
},_moveToParentMenu:function(evt){
if(this._highlighted_option&&this.parentMenu){
if(evt._menu2UpKeyProcessed){
return true;
}else{
this._highlighted_option.onUnhover();
this.closeSubmenu();
evt._menu2UpKeyProcessed=true;
}
}
return false;
},_moveToChildMenu:function(evt){
if(this._highlighted_option&&this._highlighted_option.submenuId){
this._highlighted_option._onClick(true);
return true;
}
return false;
},_selectCurrentItem:function(evt){
if(this._highlighted_option){
this._highlighted_option._onClick();
return true;
}
return false;
},processKey:function(evt){
if(evt.ctrlKey||evt.altKey||!evt.key){
return false;
}
var rval=false;
switch(evt.key){
case evt.KEY_DOWN_ARROW:
rval=this._moveToNext(evt);
break;
case evt.KEY_UP_ARROW:
rval=this._moveToPrevious(evt);
break;
case evt.KEY_RIGHT_ARROW:
rval=this._moveToChildMenu(evt);
break;
case evt.KEY_LEFT_ARROW:
rval=this._moveToParentMenu(evt);
break;
case " ":
case evt.KEY_ENTER:
if(rval=this._selectCurrentItem(evt)){
break;
}
case evt.KEY_ESCAPE:
case evt.KEY_TAB:
this.close(true);
rval=true;
break;
}
return rval;
},_findValidItem:function(dir,_1660){
if(_1660){
_1660=dir>0?_1660.getNextSibling():_1660.getPreviousSibling();
}
for(var i=0;i<this.children.length;++i){
if(!_1660){
_1660=dir>0?this.children[0]:this.children[this.children.length-1];
}
if(_1660.onHover&&_1660.isShowing()){
return _1660;
}
_1660=dir>0?_1660.getNextSibling():_1660.getPreviousSibling();
}
},_highlightOption:function(dir){
var item;
if((!this._highlighted_option)){
item=this._findValidItem(dir);
}else{
item=this._findValidItem(dir,this._highlighted_option);
}
if(item){
if(this._highlighted_option){
this._highlighted_option.onUnhover();
}
item.onHover();
dojo.html.scrollIntoView(item.domNode);
try{
var node=dojo.html.getElementsByClass("dojoMenuItem2Label",item.domNode)[0];
node.focus();
}
catch(e){
}
}
},onItemClick:function(item){
},closeSubmenu:function(force){
if(this.currentSubmenu==null){
return;
}
this.currentSubmenu.close(force);
this.currentSubmenu=null;
this.currentSubmenuTrigger.is_open=false;
this.currentSubmenuTrigger._closedSubmenu(force);
this.currentSubmenuTrigger=null;
}});
dojo.widget.defineWidget("dojo.widget.PopupMenu2",[dojo.widget.HtmlWidget,dojo.widget.PopupContainerBase,dojo.widget.MenuBase],function(){
this.targetNodeIds=[];
},{templateString:"<table class=\"dojoPopupMenu2\" border=0 cellspacing=0 cellpadding=0 style=\"display: none; position: absolute;\">"+"<tbody dojoAttachPoint=\"containerNode\"></tbody>"+"</table>",submenuOverlap:5,contextMenuForWindow:false,parentMenu:null,postCreate:function(){
if(this.contextMenuForWindow){
var doc=dojo.body();
this.bindDomNode(doc);
}else{
if(this.targetNodeIds.length>0){
dojo.lang.forEach(this.targetNodeIds,this.bindDomNode,this);
}
}
this._subscribeSubitemsOnOpen();
},_subscribeSubitemsOnOpen:function(){
var _1668=this.getChildrenOfType(dojo.widget.MenuItem2);
for(var i=0;i<_1668.length;i++){
dojo.event.topic.subscribe(this.eventNames.open,_1668[i],"menuOpen");
}
},getTopOpenEvent:function(){
var menu=this;
while(menu.parentMenu){
menu=menu.parentMenu;
}
return menu.openEvent;
},bindDomNode:function(node){
node=dojo.byId(node);
var win=dojo.html.getElementWindow(node);
if(dojo.html.isTag(node,"iframe")=="iframe"){
win=dojo.html.iframeContentWindow(node);
node=dojo.withGlobal(win,dojo.body);
}
dojo.widget.Menu2.OperaAndKonqFixer.fixNode(node);
dojo.event.kwConnect({srcObj:node,srcFunc:"oncontextmenu",targetObj:this,targetFunc:"onOpen",once:true});
if(dojo.render.html.moz&&win.document.designMode.toLowerCase()=="on"){
dojo.event.browser.addListener(node,"contextmenu",dojo.lang.hitch(this,"onOpen"));
}
dojo.widget.PopupManager.registerWin(win);
},unBindDomNode:function(_166d){
var node=dojo.byId(_166d);
dojo.event.kwDisconnect({srcObj:node,srcFunc:"oncontextmenu",targetObj:this,targetFunc:"onOpen",once:true});
dojo.widget.Menu2.OperaAndKonqFixer.cleanNode(node);
},_openAsSubmenu:function(_166f,_1670,_1671){
if(this.isShowingNow){
return;
}
this.parentMenu=_166f;
this.open(_1670,_166f,_1670,_1671);
},close:function(force){
if(this.animationInProgress){
dojo.widget.PopupContainerBase.prototype.close.call(this,force);
return;
}
if(this._highlighted_option){
this._highlighted_option.onUnhover();
}
dojo.widget.PopupContainerBase.prototype.close.call(this,force);
this.parentMenu=null;
},closeAll:function(force){
if(this.parentMenu){
this.parentMenu.closeAll(force);
}else{
this.close(force);
}
},_openSubmenu:function(_1674,_1675){
_1674._openAsSubmenu(this,_1675.arrow,{"TR":"TL","TL":"TR"});
this.currentSubmenu=_1674;
this.currentSubmenuTrigger=_1675;
this.currentSubmenuTrigger.is_open=true;
},focus:function(){
if(this.currentSubmenuTrigger){
if(this.currentSubmenuTrigger.caption){
try{
this.currentSubmenuTrigger.caption.focus();
}
catch(e){
}
}else{
try{
this.currentSubmenuTrigger.domNode.focus();
}
catch(e){
}
}
}
},onOpen:function(e){
this.openEvent=e;
if(e["target"]){
this.openedForWindow=dojo.html.getElementWindow(e.target);
}else{
this.openedForWindow=null;
}
var x=e.pageX,y=e.pageY;
var win=dojo.html.getElementWindow(e.target);
var _167a=win._frameElement||win.frameElement;
if(_167a){
var cood=dojo.html.abs(_167a,true);
x+=cood.x-dojo.withGlobal(win,dojo.html.getScroll).left;
y+=cood.y-dojo.withGlobal(win,dojo.html.getScroll).top;
}
this.open(x,y,null,[x,y]);
dojo.event.browser.stopEvent(e);
}});
dojo.widget.defineWidget("dojo.widget.MenuItem2",dojo.widget.HtmlWidget,function(){
this.eventNames={engage:""};
},{templateString:"<tr class=\"dojoMenuItem2\" dojoAttachEvent=\"onMouseOver: onHover; onMouseOut: onUnhover; onClick: _onClick; onKey:onKey;\">"+"<td><div class=\"${this.iconClass}\" style=\"${this.iconStyle}\"></div></td>"+"<td tabIndex=\"-1\" class=\"dojoMenuItem2Label\" dojoAttachPoint=\"caption\">${this.caption}</td>"+"<td class=\"dojoMenuItem2Accel\">${this.accelKey}</td>"+"<td><div class=\"dojoMenuItem2Submenu\" style=\"display:${this.arrowDisplay};\" dojoAttachPoint=\"arrow\"></div></td>"+"</tr>",is_hovering:false,hover_timer:null,is_open:false,topPosition:0,caption:"Untitled",accelKey:"",iconSrc:"",disabledClass:"dojoMenuItem2Disabled",iconClass:"dojoMenuItem2Icon",submenuId:"",eventNaming:"default",highlightClass:"dojoMenuItem2Hover",postMixInProperties:function(){
this.iconStyle="";
if(this.iconSrc){
if((this.iconSrc.toLowerCase().substring(this.iconSrc.length-4)==".png")&&(dojo.render.html.ie55||dojo.render.html.ie60)){
this.iconStyle="filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+this.iconSrc+"', sizingMethod='image')";
}else{
this.iconStyle="background-image: url("+this.iconSrc+")";
}
}
this.arrowDisplay=this.submenuId?"block":"none";
dojo.widget.MenuItem2.superclass.postMixInProperties.apply(this,arguments);
},fillInTemplate:function(){
dojo.html.disableSelection(this.domNode);
if(this.disabled){
this.setDisabled(true);
}
if(this.eventNaming=="default"){
for(var _167c in this.eventNames){
this.eventNames[_167c]=this.widgetId+"/"+_167c;
}
}
},onHover:function(){
this.onUnhover();
if(this.is_hovering){
return;
}
if(this.is_open){
return;
}
if(this.parent._highlighted_option){
this.parent._highlighted_option.onUnhover();
}
this.parent.closeSubmenu();
this.parent._highlighted_option=this;
dojo.widget.PopupManager.setFocusedMenu(this.parent);
this._highlightItem();
if(this.is_hovering){
this._stopSubmenuTimer();
}
this.is_hovering=true;
this._startSubmenuTimer();
},onUnhover:function(){
if(!this.is_open){
this._unhighlightItem();
}
this.is_hovering=false;
this.parent._highlighted_option=null;
if(this.parent.parentMenu){
dojo.widget.PopupManager.setFocusedMenu(this.parent.parentMenu);
}
this._stopSubmenuTimer();
},_onClick:function(focus){
var _167e=false;
if(this.disabled){
return false;
}
if(this.submenuId){
if(!this.is_open){
this._stopSubmenuTimer();
this._openSubmenu();
}
_167e=true;
}else{
this.onUnhover();
this.parent.closeAll(true);
}
this.onClick();
dojo.event.topic.publish(this.eventNames.engage,this);
if(_167e&&focus){
dojo.widget.getWidgetById(this.submenuId)._highlightOption(1);
}
return;
},onClick:function(){
this.parent.onItemClick(this);
},_highlightItem:function(){
dojo.html.addClass(this.domNode,this.highlightClass);
},_unhighlightItem:function(){
dojo.html.removeClass(this.domNode,this.highlightClass);
},_startSubmenuTimer:function(){
this._stopSubmenuTimer();
if(this.disabled){
return;
}
var self=this;
var _1680=function(){
return function(){
self._openSubmenu();
};
}();
this.hover_timer=dojo.lang.setTimeout(_1680,this.parent.submenuDelay);
},_stopSubmenuTimer:function(){
if(this.hover_timer){
dojo.lang.clearTimeout(this.hover_timer);
this.hover_timer=null;
}
},_openSubmenu:function(){
if(this.disabled){
return;
}
this.parent.closeSubmenu();
var _1681=dojo.widget.getWidgetById(this.submenuId);
if(_1681){
this.parent._openSubmenu(_1681,this);
}
},_closedSubmenu:function(){
this.onUnhover();
},setDisabled:function(value){
this.disabled=value;
if(this.disabled){
dojo.html.addClass(this.domNode,this.disabledClass);
}else{
dojo.html.removeClass(this.domNode,this.disabledClass);
}
},enable:function(){
this.setDisabled(false);
},disable:function(){
this.setDisabled(true);
},menuOpen:function(_1683){
}});
dojo.widget.defineWidget("dojo.widget.MenuSeparator2",dojo.widget.HtmlWidget,{templateString:"<tr class=\"dojoMenuSeparator2\"><td colspan=4>"+"<div class=\"dojoMenuSeparator2Top\"></div>"+"<div class=\"dojoMenuSeparator2Bottom\"></div>"+"</td></tr>",postCreate:function(){
dojo.html.disableSelection(this.domNode);
}});
dojo.widget.defineWidget("dojo.widget.MenuBar2",[dojo.widget.HtmlWidget,dojo.widget.MenuBase],{menuOverlap:2,templateString:"<div class=\"dojoMenuBar2\" dojoAttachPoint=\"containerNode\" tabIndex=\"0\"></div>",close:function(force){
if(this._highlighted_option){
this._highlighted_option.onUnhover();
}
this.closeSubmenu(force);
},closeAll:function(force){
this.close(force);
},processKey:function(evt){
if(evt.ctrlKey||evt.altKey){
return false;
}
var rval=false;
switch(evt.key){
case evt.KEY_DOWN_ARROW:
rval=this._moveToChildMenu(evt);
break;
case evt.KEY_UP_ARROW:
rval=this._moveToParentMenu(evt);
break;
case evt.KEY_RIGHT_ARROW:
rval=this._moveToNext(evt);
break;
case evt.KEY_LEFT_ARROW:
rval=this._moveToPrevious(evt);
break;
default:
rval=dojo.widget.MenuBar2.superclass.processKey.apply(this,arguments);
break;
}
return rval;
},postCreate:function(){
dojo.widget.MenuBar2.superclass.postCreate.apply(this,arguments);
this.isShowingNow=true;
},_openSubmenu:function(_1688,_1689){
_1688._openAsSubmenu(this,_1689.domNode,{"BL":"TL","TL":"BL"});
this.currentSubmenu=_1688;
this.currentSubmenuTrigger=_1689;
this.currentSubmenuTrigger.is_open=true;
}});
dojo.widget.defineWidget("dojo.widget.MenuBarItem2",dojo.widget.MenuItem2,{templateString:"<span class=\"dojoMenuItem2\" dojoAttachEvent=\"onMouseOver: onHover; onMouseOut: onUnhover; onClick: _onClick;\">${this.caption}</span>"});
dojo.widget.Menu2.OperaAndKonqFixer=new function(){
var _168a=true;
var _168b=false;
if(!dojo.lang.isFunction(dojo.doc().oncontextmenu)){
dojo.doc().oncontextmenu=function(){
_168a=false;
_168b=true;
};
}
if(dojo.doc().createEvent){
try{
var e=dojo.doc().createEvent("MouseEvents");
e.initMouseEvent("contextmenu",1,1,dojo.global(),1,0,0,0,0,0,0,0,0,0,null);
dojo.doc().dispatchEvent(e);
}
catch(e){
}
}else{
_168a=false;
}
if(_168b){
delete dojo.doc().oncontextmenu;
}
this.fixNode=function(node){
if(_168a){
if(!dojo.lang.isFunction(node.oncontextmenu)){
node.oncontextmenu=function(e){
};
}
if(dojo.render.html.opera){
node._menufixer_opera=function(e){
if(e.ctrlKey){
this.oncontextmenu(e);
}
};
dojo.event.connect(node,"onclick",node,"_menufixer_opera");
}else{
node._menufixer_konq=function(e){
if(e.button==2){
e.preventDefault();
this.oncontextmenu(e);
}
};
dojo.event.connect(node,"onmousedown",node,"_menufixer_konq");
}
}
};
this.cleanNode=function(node){
if(_168a){
if(node._menufixer_opera){
dojo.event.disconnect(node,"onclick",node,"_menufixer_opera");
delete node._menufixer_opera;
}else{
if(node._menufixer_konq){
dojo.event.disconnect(node,"onmousedown",node,"_menufixer_konq");
delete node._menufixer_konq;
}
}
if(node.oncontextmenu){
delete node.oncontextmenu;
}
}
};
};
dojo.provide("ws.widget.WSMenu");
dojo.widget.defineWidget("ws.widget.WSMenu",dojo.widget.PopupMenu2,{templateString:"<div class=\"dojoPopupMenu2\" style=\"display: none; position: absolute;\">"+"\t<table border=0 cellspacing=0 cellpadding=0>"+"\t\t<tbody dojoAttachPoint=\"containerNode\"></tbody>"+"\t</table>"+"</div>",templateCssString:null,templateCssString:"body .wsMenu {    /* Needs to be more specific than the rules for .dojoPopupMenu2 */\r\n\tborder-color: #999999;\r\n\tbackground-color: #FFFFFF !important;\r\n\tbackground-image: none !important;\r\n\tpadding: 3px 2px;\r\n\tmargin: 0px;\r\n\toverflow: auto;\r\n\toverflow-x: hidden; /* avoid horizontal scrollbar on IE */\r\n}\r\n\r\n.wsMenu .dojoMenuItem2 {\r\n\tfont-family: Arial, Helvetica, sans-serif;\r\n\tfont-size: 11px;\r\n}\r\n\r\n.wsMenu .dojoMenuItem2Label {\r\n\tcolor: #000000;\r\n\tpadding: 2px 25px 2px 5px;\r\n}\r\n\r\n.wsMenu .dojoMenuItem2Hover {\r\n\tbackground-color: #E4EDFA;\r\n\tcolor: #000000;\r\n}\r\n\r\n.wsMenu .dojoMenuItem2Disabled {  /* Cancel out the hover effect */\r\n\tbackground-color: #FFFFFF !important;\r\n\tcolor: #999999;\r\n\tcursor: default;\r\n}\r\n\r\n.wsMenu .dojoMenuSeparator2 {\r\n\tpadding: 0px;\r\n}\r\n.wsMenu .dojoMenuSeparator2Top {\r\n\tborder-bottom-color: #999999;\r\n\tmargin: 2px;\r\n}\r\n.wsMenu .dojoMenuSeparator2Bottom {\r\n\tborder-top: none;\r\n}\r\n\r\n.wsMenu .ckoffCol\r\n{ \r\n\tbackground-image: url(\"${images}main.gif\");\t\r\n\tbackground-position: -1110px 2px;\r\n\twidth: 13px;\r\n\theight: 13px;\r\n\tmargin-left: 2px;\r\n}\r\n\r\n.wsMenu .ckonCol\r\n{\r\n\tbackground-image: url(\"${images}main.gif\");\t\r\n\tbackground-position: -1125px 2px;\r\n\twidth: 13px;\r\n\theight: 13px;\r\n\tmargin-left: 2px;\r\n}\r\n\r\n.inputContainer\r\n{\r\n\tposition: relative;\r\n\toverflow: auto;  /* Fixes the Firefox no-blinking-cursor bug */\r\n}\r\n\r\n.inputContainer input\r\n{\r\n\twidth: 110px;\r\n\tmargin-bottom: 3px;\r\n\tmargin-right: 2px;\r\n\tborder: 1px solid #85817c;\r\n\tfont: normal 12px Arial;\r\n}\r\n\r\n.inputContainer input.activeInput\r\n{\r\n\tcolor: #000000;\r\n}\r\n\r\n.inputContainer input.defaultInput\r\n{\r\n\tcolor: #A5A5A5;\r\n}\r\n\r\n.inputContainer img\r\n{\r\n\twidth: 18px;\r\n\theight: 18px;\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tbackground-position: -1189px -0px;\r\n\tcursor: pointer;\r\n}\r\n\r\n.inputContainer img.hover\r\n{\r\n\tbackground-position: -1212px -0px;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("../ws/widget/WSMenu.css"),rightClick:false,fillInTemplate:function(args,frag){
ws.widget.WSMenu.superclass.fillInTemplate.apply(this,arguments);
dojo.html.addClass(this.domNode,"wsMenu");
},onShow:function(){
ws.widget.WSMenu.superclass.onShow.apply(this,arguments);
this.domNode.style.height="";
var _1694=dojo.html.getMarginBox(this.domNode).height;
var _1695=dojo.html.getViewport().height;
if(_1694>_1695){
dojo.html.setMarginBox(this.domNode,{height:_1695});
}
},bindDomNode:function(node){
this.boundNode=node;
dojo.event.kwConnect({srcObj:node,srcFunc:this.rightClick?"oncontextmenu":"onclick",targetObj:this,targetFunc:"onOpen",once:true});
},onOpen:function(e){
if(this.rightClick){
return ws.widget.WSMenu.superclass.onOpen.call(this,e);
}else{
if(this.isShowingNow){
return this.close();
}
}
this.openEvent=e;
var src=this.boundNode;
var pos=dojo.html.getAbsolutePosition(src,true,dojo.html.boxSizing.BORDER_BOX);
this.open(pos.x,pos.y+dojo.html.getBorderBox(src).height,null,src);
},getBorderBoxWidth:function(){
if(this.isShowingNow){
return dojo.html.getBorderBox(this.domNode).width;
}
this.domNode.style.left="-9999px";
this.domNode.style.top="-9999px";
this.domNode.style.display="";
var box=dojo.html.getBorderBox(this.domNode).width;
this.domNode.style.display="none";
return box;
}});
dojo.widget.defineWidget("ws.widget.WSMenuItem",dojo.widget.MenuItem2,{templateString:"<tr class=\"dojoMenuItem2\" dojoAttachEvent=\"onMouseOver: onHover; onMouseOut: onUnhover; onClick: _onClick; onKey:onKey;\">"+"<td tabIndex=\"-1\" class=\"\" dojoAttachPoint=\"checkNode\"></td>"+"<td tabIndex=\"-1\" class=\"dojoMenuItem2Label\" dojoAttachPoint=\"labelNode\"></td>"+"<td><div class=\"dojoMenuItem2Submenu\" dojoAttachPoint=\"subMenuNode\"></div></td>"+"</tr>",checkOnClass:"ckonCol",checkOffClass:"ckoffCol",width:0,postCreate:function(){
if(this.width){
this.labelNode.style.width=this.width+"px";
this.domNode.style.whiteSpace="normal";
}
this.subMenuNode.style.display=this.arrowDisplay;
ws.widget.WSMenuItem.superclass.postCreate.apply(this,arguments);
this.setChecked();
this.labelNode.innerHTML=this.caption;
},setChecked:function(_169b){
if(typeof (_169b)!="undefined"){
this.checked=_169b;
}
if(typeof (this.checked)!="undefined"){
if(this.checked){
dojo.html.addClass(this.checkNode,this.checkOnClass);
dojo.html.removeClass(this.checkNode,this.checkOffClass);
}else{
dojo.html.addClass(this.checkNode,this.checkOffClass);
dojo.html.removeClass(this.checkNode,this.checkOnClass);
}
}
},setCaption:function(_169c){
this.labelNode.innerHTML=_169c;
}});
dojo.widget.defineWidget("ws.widget.WSInputableMenuItem",ws.widget.WSMenuItem,{templateString:"<tr class=\"dojoMenuItem2\" dojoAttachEvent=\"onMouseOver: onHover; onMouseOut: onUnhover; onClick: _onClick; onKey: doKey;\">"+"\t<td tabIndex=\"-1\" colspan=\"3\" class=\"dojoMenuItem2Label\" dojoAttachPoint=\"labelNode\">"+"\t\t<div class=\"inputContainer\" dojoAttachEvent=\"onClick: handleClick\">"+"\t\t\t<input class=\"defaultInput\" dojoAttachEvent=\"onKeyPress: onKeyPress; onClick: handleInputClick\" dojoAttachPoint=\"input\" />"+"\t\t\t<img dojoAttachPoint=\"newButton\" dojoAttachEvent=\"onClick: onAdd; onMouseOver: onHoverButton; onMouseOut: onUnhoverButton\" src=\"${spacer}\" class=\"add\" />"+"\t\t</div>"+"\t</td>"+"<td><div class=\"dojoMenuItem2Submenu\" style=\"display:${this.arrowDisplay};\"></div></td>"+"</tr>",templateCssString:"body .wsMenu {    /* Needs to be more specific than the rules for .dojoPopupMenu2 */\r\n\tborder-color: #999999;\r\n\tbackground-color: #FFFFFF !important;\r\n\tbackground-image: none !important;\r\n\tpadding: 3px 2px;\r\n\tmargin: 0px;\r\n\toverflow: auto;\r\n\toverflow-x: hidden; /* avoid horizontal scrollbar on IE */\r\n}\r\n\r\n.wsMenu .dojoMenuItem2 {\r\n\tfont-family: Arial, Helvetica, sans-serif;\r\n\tfont-size: 11px;\r\n}\r\n\r\n.wsMenu .dojoMenuItem2Label {\r\n\tcolor: #000000;\r\n\tpadding: 2px 25px 2px 5px;\r\n}\r\n\r\n.wsMenu .dojoMenuItem2Hover {\r\n\tbackground-color: #E4EDFA;\r\n\tcolor: #000000;\r\n}\r\n\r\n.wsMenu .dojoMenuItem2Disabled {  /* Cancel out the hover effect */\r\n\tbackground-color: #FFFFFF !important;\r\n\tcolor: #999999;\r\n\tcursor: default;\r\n}\r\n\r\n.wsMenu .dojoMenuSeparator2 {\r\n\tpadding: 0px;\r\n}\r\n.wsMenu .dojoMenuSeparator2Top {\r\n\tborder-bottom-color: #999999;\r\n\tmargin: 2px;\r\n}\r\n.wsMenu .dojoMenuSeparator2Bottom {\r\n\tborder-top: none;\r\n}\r\n\r\n.wsMenu .ckoffCol\r\n{ \r\n\tbackground-image: url(\"${images}main.gif\");\t\r\n\tbackground-position: -1110px 2px;\r\n\twidth: 13px;\r\n\theight: 13px;\r\n\tmargin-left: 2px;\r\n}\r\n\r\n.wsMenu .ckonCol\r\n{\r\n\tbackground-image: url(\"${images}main.gif\");\t\r\n\tbackground-position: -1125px 2px;\r\n\twidth: 13px;\r\n\theight: 13px;\r\n\tmargin-left: 2px;\r\n}\r\n\r\n.inputContainer\r\n{\r\n\tposition: relative;\r\n\toverflow: auto;  /* Fixes the Firefox no-blinking-cursor bug */\r\n}\r\n\r\n.inputContainer input\r\n{\r\n\twidth: 110px;\r\n\tmargin-bottom: 3px;\r\n\tmargin-right: 2px;\r\n\tborder: 1px solid #85817c;\r\n\tfont: normal 12px Arial;\r\n}\r\n\r\n.inputContainer input.activeInput\r\n{\r\n\tcolor: #000000;\r\n}\r\n\r\n.inputContainer input.defaultInput\r\n{\r\n\tcolor: #A5A5A5;\r\n}\r\n\r\n.inputContainer img\r\n{\r\n\twidth: 18px;\r\n\theight: 18px;\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tbackground-position: -1189px -0px;\r\n\tcursor: pointer;\r\n}\r\n\r\n.inputContainer img.hover\r\n{\r\n\tbackground-position: -1212px -0px;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("../ws/widget/WSMenu.css"),contactDialog:null,closeCB:null,postCreate:function(){
ws.widget.WSMenuItem.superclass.postCreate.apply(this,arguments);
},setCaption:function(_169d){
this.labelNode.innerHTML=_169d;
},setText:function(text){
this.input.value=text;
if(dojo.html.hasClass(this.input,"activeInput")){
dojo.html.replaceClass(this.input,"defaultInput","activeInput");
}
},handleInputClick:function(evt){
dojo.event.browser.stopEvent(evt);
this.input.value="";
if(dojo.html.hasClass(this.input,"defaultInput")){
dojo.html.replaceClass(this.input,"activeInput","defaultInput");
}
},handleClick:function(evt){
dojo.event.browser.stopEvent(evt);
},onKeyPress:function(evt){
if(evt.keyCode==evt.KEY_ENTER){
if(this.okCB){
this.okCB(this.input.value);
this.restore();
this.parent.closeAll(true);
}
}else{
if(evt.keyCode==evt.KEY_ESCAPE){
this.restore(true);
}
}
evt.stopPropagation();
},onAdd:function(evt){
if(this.okCB){
this.okCB(this.input.value);
}
evt.stopPropagation();
this.parent.closeAll(true);
},onHoverButton:function(){
if(!dojo.html.hasClass(this.newButton,"hover")){
dojo.html.replaceClass(this.newButton,"hover","unHover");
}
},onUnhoverButton:function(){
if(!dojo.html.hasClass(this.newButton,"unHover")){
dojo.html.replaceClass(this.newButton,"unHover","hover");
}
},restore:function(hove){
if(this.originalMenuItem){
this.originalMenuItem.show();
if(!hove){
dojo.html.removeClass(this.originalMenuItem.domNode,"dojoMenuItem2Hover");
}
}
this.hide();
}});
dojo.widget.defineWidget("ws.widget.WSMenuSeparator",dojo.widget.MenuSeparator2,{templateString:"<tr class=\"dojoMenuSeparator2\"><td colspan=3>"+"<div class=\"dojoMenuSeparator2Top\"></div>"+"<div class=\"dojoMenuSeparator2Bottom\"></div>"+"</td></tr>"});
dojo.provide("ws.widget.HoverCardManager");
dojo.declare("ws.widget.HoverCardManager",null,{openDelay:400,closeDelay:400,initializer:function(_16a4,_16a5,_16a6,_16a7,_16a8){
this.gridNode=_16a4;
this.cardWidgetType=_16a5;
this.rowClass=_16a6;
_16a7.manager=this;
this.cardParams=_16a7;
this.shouldOpenFunction=_16a8;
dojo.event.connect(this.gridNode,"onmouseover",this,"onMouseOverGrid");
dojo.event.topic.subscribe("ws_view-addChild",this,"childCreated");
},onMouseOverGrid:function(e){
var t=e.target;
while(t!=null&&!dojo.html.hasClass(t,this.rowClass)){
t=t.parentNode;
}
if(this.card&&this.card.isShowingNow){
if(t){
this.openSoon(t);
}else{
this.closeSoon();
}
}else{
if(t){
this.openSoon(t);
}else{
this.cancelOpen();
}
}
if(!this._tracking){
dojo.event.connect(document.documentElement,"onmousemove",this,"onMouseMove");
this._tracking=true;
}
},onMouseMove:function(e){
this.overCard=this.card&&dojo.html.overElement(this.card.domNode,e);
this.overGridNode=dojo.html.overElement(this.gridNode,e);
if(this.overCard){
this.cancelTimeouts();
}else{
if(!this.overGridNode){
this.closeSoon();
}
}
},openSoon:function(_16ac){
this.cancelTimeouts();
this.openTimer=setTimeout(ws.lang.hitch(this,"open",_16ac),this.openDelay);
},closeSoon:function(){
if(this.closeTimer){
return;
}
this.cancelTimeouts();
this.closeTimer=setTimeout(ws.lang.hitch(this,"close"),this.closeDelay);
},cancelTimeouts:function(){
this.cancelOpen();
this.cancelClose();
},cancelOpen:function(){
if(this.openTimer){
clearTimeout(this.openTimer);
}
this.openTimer=null;
},cancelClose:function(){
if(this.closeTimer){
clearTimeout(this.closeTimer);
}
this.closeTimer=null;
},open:function(_16ad){
if(this.card&&this.card.isShowingNow){
this.close();
}
var _16ae=this.shouldOpenFunction?this.shouldOpenFunction(_16ad):true;
if(_16ae){
if(!this.card){
this.card=dojo.widget.createWidget(this.cardWidgetType,this.cardParams,dojo.body(),"first");
}
this.hoverNode=_16ad;
this.card.populate(this.hoverNode);
this.card.open(_16ad,null,[],{"TL":"TR"});
}
},close:function(){
if(!this.overCard&&!this.overGridNode){
if(this._tracking){
dojo.event.disconnect(document.documentElement,"onmousemove",this,"onMouseMove");
this._tracking=false;
}
}
if(this.card){
this.card.close();
}
},childCreated:function(page){
if(page.widgetId=="composeMessage"){
var _16b0=dojo.widget.byId("composeMessage").editor.iframe;
dojo.event.browser.addListener(_16b0,"onmouseover",dojo.lang.hitch(this,"composeDisplayOverContent"));
dojo.event.topic.subscribe(dojo.widget.byId("composeMessage").notebook.widgetId+"-addChild",this,"sendConfirmationCreated");
}else{
if(page.widgetId=="displayMessage"){
var _16b1=dojo.widget.byId("displayMessage").bodyFrame;
dojo.event.browser.addListener(_16b1,"onmouseover",dojo.lang.hitch(this,"composeDisplayOverContent"));
}
}
},sendConfirmationCreated:function(page){
var _16b3=dojo.widget.byId("composeMessage").sendConfirmation;
if(page.widgetId==_16b3.widgetId){
dojo.event.browser.addListener(_16b3.confirmationAdvertisement.domNode,"onmouseover",dojo.lang.hitch(this,"composeDisplayOverContent"));
}
},composeDisplayOverContent:function(){
if(this.card&&this.card.isShowingNow){
this.closeSoon();
}
}});
dojo.provide("ws.widget.WSSelect");
dojo.widget.defineWidget("ws.widget.WSSelect",dojo.widget.HtmlWidget,{options:null,currentValue:-1,id:"",className:"",enabled:true,isMenuDirty:false,size:"byMenu",templateString:"<div id=\"${this.id}\" class=\"wsSelect ${this.className}\" dojoAttachPoint=\"containerNode\" dojoAttachEvent=\"onClick: toggleMenu\"><span class=\"option\" dojoAttachPoint=\"currentValueNode\"></span><div class=\"arrow\" dojoAttachPoint=\"arrowNode\"></div></div>",templateCssString:".wsSelect {\r\n\twidth: 100px; /* just to start.. it gets resized immediately to fit the options */\r\n\tborder: 1px solid #85817C;\r\n\tpadding: 2px 2px 2px 6px;\r\n\tcolor: #333333;\r\n\tbackground-color: #ffffff;\r\n\tmargin: 3px 4px;\r\n\tcursor: pointer;\r\n\tfont: normal 11px Arial, helvetica, sans-serif; /* match WSMenu font for accurate width measurement */\r\n\tposition: relative;\r\n}\r\n\r\n.wsSelect span {\r\n\twhite-space: nowrap;\r\n}\r\n\r\n.wsSelect .option {\r\n}\r\n\r\n.wsSelect .arrow {\r\n\tfloat: right;\r\n\tposition: absolute;\r\n\ttop: 7px;\r\n\tright: 4px;\r\n\tbackground: url(\"${images}main.gif\") -1022px -2px;\r\n\theight: 6px;\r\n\twidth: 11px;\t\r\n\t\r\n}\r\n\r\n.wsSelectDisabled {\r\n\tcursor: default;\r\n}\r\n.wsSelectDisabled .arrow {\r\n\tdisplay: none;\r\n}\r\n\r\n.wsSelect .wsButton .content {\r\n\tpadding: 2px 6px 2px 6px;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("../ws/widget/WSSelect.css"),fillInTemplate:function(args,frag){
var items=this.getFragNodeRef(frag).getElementsByTagName("li");
var opts=[];
for(var i=0;i<items.length;i++){
opts.push({display:items[i].innerHTML,value:dojo.html.getAttribute(items[i],"value"),selected:dojo.html.getAttribute(items[i],"selected")});
}
if(args["optionTemplate"]){
var items=dojo.html.createNodesFromText(args["optionTemplate"]);
for(var i=0;i<items.length;i++){
opts.push({display:items[i].innerHTML,value:dojo.html.getAttribute(items[i],"value"),selected:dojo.html.getAttribute(items[i],"selected")});
}
}
if(opts.length>0){
this.setOptions(opts);
}
},setOptions:function(opts){
this.options=opts;
this.isMenuDirty=true;
var _16ba=0;
for(var i=0;i<opts.length;i++){
if(opts[i].selected){
_16ba=i;
}
}
this.setOption(_16ba);
this.enabled=opts.length>1;
ws.html.toggleClass(this.domNode,"wsSelectDisabled",!this.enabled);
},getMenu:function(){
if(this.menu&&!this.isMenuDirty){
return this.menu;
}
if(this.menu){
this.menu.destroyChildren();
}else{
this.menu=dojo.widget.createWidget("ws:WSMenu");
dojo.body().appendChild(this.menu.domNode);
}
for(var i=0;i<this.options.length;i++){
var item=dojo.widget.createWidget("ws:WSMenuItem",{caption:this.options[i].display});
item.onClick=ws.lang.hitch(this,"setOption",i,true);
this.menu.addChild(item);
}
this.isMenuDirty=false;
return this.menu;
},toggleMenu:function(){
var menu=this.getMenu();
if(menu.isShowingNow||!this.enabled){
menu.close();
}else{
menu.open(this.domNode,this,this.domNode,{"BL":"TL"});
}
},sizeMyself:function(){
if(this.size=="byMenu"){
var width=this.getMenu().getBorderBoxWidth()-14;
}else{
if(this.size=="byValue"){
var width=dojo.html.getMarginBox(this.currentValueNode).width+15;
}else{
var width=parseInt(this.size);
}
}
dojo.html.setContentBox(this.domNode,{width:width});
},setOption:function(i,_16c1){
if(this.currentValue!=this.options[i].value){
this.currentValueNode.innerHTML=this.options[i].display;
}
this.currentValue=this.options[i].value;
this.sizeMyself();
if(_16c1){
this.valueChanged();
}
},setClass:function(cls){
this.domNode.className="wsSelect "+cls;
},valueChanged:function(){
}});
dojo.provide("ws.address.PeoplePanel");
dojo.declare("ws.address.PeoplePanelGridModel",turbo.data.virtual,function(_16c3,model){
this.model=model;
dojo.event.connect(this.model,"modelUpdated",this,"modelUpdated");
},{columns:{Name:0},modelUpdated:function(){
},get:function(row,col){
var _16c7=this.model.getRow(row);
if(_16c7==null){
return Config.Strings.ContactError;
}
switch(col){
case this.columns.Name:
return dojo.string.escapeXml(_16c7.name||_16c7.email1||_16c7.email2||_16c7.screenName||"");
}
},getRow:function(row){
var _16c9=this.model.getRow(row);
if(_16c9==null){
return [Config.Strings.ContactError];
}
var _16ca=dojo.string.escapeXml(_16c9.name||_16c9.email1||_16c9.email2||_16c9.screenName||"");
return [_16ca];
},getRowCount:function(){
return this.model.getRowCount();
}});
dojo.widget.defineWidget("ws.address.PeoplePanel",ws.widget.ListView,{templateString:"<div style=\"overflow: hidden;\">\r\n\t<div class=\"peoplePanel listView\" dojoType=\"ws:WSLayoutContainer\" deferred=\"true\" dojoAttachPoint=\"layoutWidget\">\r\n\t\t<div dojoType=\"dojo:ContentPane\" layoutAlign=\"top\">\r\n\t\t\t<div class=\"searchInputDiv\" dojoAttachPoint=\"searchInputDiv\">\r\n\t\t\t\t<span><input dojoAttachPoint=\"searchInputNode\" dojoAttachEvent=\"onFocus: onFocusSearch; onBlur: onBlurSearch; onKeyUp: search\" class=\"wsInput default\"></span>\r\n\t\t\t\t<img src=\"${spacer}\" dojoAttachPoint=\"clearSearchButton\" class=\"clearSearchImg\" dojoAttachEvent=\"onClick: clearSearch\">\r\n\t\t\t</div>\r\n\t\t\t<div class=\"addContact\" dojoAttachEvent=\"onClick: openAddContactCard\" dojoAttachPoint=\"addContactLink\">\r\n\t\t\t\t<img src=\"${spacer}\" align=\"bottom\" class=\"icon\">\r\n\t\t\t\t<span class=\"wsLink\">${AddContact}</span>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div dojoType=\"TurboDataGrid\" layoutAlign=\"client\" dojoAttachPoint=\"grid\" defaultLeftWidth=\"0\"></div>\r\n\t</div>\r\n</div>\r\n",templateCssString:"body .peoplePanel .turbogrid {\r\n\tmargin-left: 11px;\r\n}\r\nbody .peoplePanel .turbogrid-scrollbox {\r\n\tborder-top: none;\r\n\tfont: normal 12px Arial;\r\n}\r\n\r\n.peoplePanel .searchInputDiv\r\n{\r\n\twidth: 138px;\r\n\tpadding-left: 6px;\r\n\tmargin: 3px;\r\n\tborder: solid 1px #85817c;\r\n\tbackground-color: #FFF;\t\r\n}\r\n\r\n.peoplePanel input {\r\n\tfont: normal 11px verdana;\r\n\tvertical-align: middle;\r\n\tborder: none;\r\n\tpadding-top: 2px;\r\n\tpadding-bottom: 2px;\r\n}\r\n\r\n.peoplePanel input.default {\r\n\tcolor: #a5a5a5;\r\n}\r\n.peoplePanel .clearSearchImg\r\n{\r\n\tposition: absolute;\r\n\tz-index: 1000;\r\n\twidth: 10px;\r\n\theight: 10px;\r\n\tmargin: 5px 4px 0px 2px;\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tbackground-position: -959px -2px;\r\n\tcursor: pointer;\r\n}\r\n.peoplePanel .clearSearchImgFF { margin: 4px 4px 0px 4px; }\r\n.peoplePanel .clearSearchImg:hover { background-position: -973px -2px; }\r\n\r\n.peoplePanel .addContact {\r\n\tcursor: pointer;\r\n\tmargin-top: 1px;\r\n\ttext-align: left;\r\n}\r\n.peoplePanel .addContact .icon {\r\n\twidth: 12px;\r\n\theight: 12px;\r\n\tbackground: url(\"${images}main.gif\") -1260px -1px;\r\n\tmargin: 3px 0px 0px 3px;\r\n\tpadding-top: 2px;\r\n}\r\n.peoplePanel .addContact .icon:hover {\r\n\tbackground-position: -1275px -1px;\r\n}\r\n.peoplePanel .wsLink  {\r\n\tposition: relative;\r\n\ttop: -3px;\r\n}\r\n\r\n/*\r\n *\tHover card\r\n */\r\n\r\n.peoplePanelHoverCard {\r\n\tbackground-color: #FFFFFF;\r\n\tborder: 1px solid black;\r\n\tposition: absolute;\r\n\tmin-width:250px;\r\n\tmax-width:300px;\r\n\t_width:250px;\r\n}\r\n\r\n.peoplePanelHoverCard .headerDiv\r\n{\r\n\tbackground-color: #E4EDFA;\r\n\tpadding: 4px 7px  0px 12px;\r\n\t_width:250px;\r\n}\r\n\r\n.peoplePanelHoverCard .headerDiv span.headerLinks\r\n{\r\n\tfont-weight: bold;\r\n}\r\n\r\n.peoplePanelHoverCard .headerDiv span.separator\r\n{\r\n\tcolor: #999999;\r\n\tmargin-left: 4px;\r\n\tmargin-right: 4px;\r\n}\r\n\r\n.peoplePanelHoverCard .conentContainer\r\n{\r\n\tpadding: 5px 7px 5px 8px;\t\t\r\n}\r\n\r\n.peoplePanelHoverCard .conentContainer span.deleteLink\r\n{\r\n\tfloat:right;\r\n\tfont-size: 11px;\r\n\tmargin-left:140px;\r\n\tmargin-bottom: 2px;\r\n\t\r\n}\r\n\r\n/*\r\n *\tAdd contact card\r\n */\r\n\r\n.peoplePanelAddContactCard {\r\n\twidth: 250px;\r\n\tpadding: 3px;\r\n\tbackground-color: #FFFFFF;\r\n\tborder: 1px solid #8A8A8A;\r\n\tz-index: 1000;\r\n\tposition: absolute;\r\n\toverflow: auto;  /* Fixes the Firefox no-blinking-cursor bug */\r\n}\r\n\r\n.peoplePanelAddContactCard .closeButton {\r\n\twidth: 12px;\r\n\theight: 12px;\r\n\tcursor: pointer;\r\n\tfloat: right;\r\n\tbackground: url(\"${images}main.gif\") -1425px -1px;\r\n}\r\n.peoplePanelAddContactCard .closeButton:hover {\r\n\tbackground-position: -1440px -1px;\r\n}\r\n\r\n.peoplePanelAddContactCard input {\r\n\twidth: 70px;\r\n\tpadding-left: 2px;\r\n}\r\n\r\n.peoplePanelAddContactCard input.nameInput\r\n{\r\n\twidth: 64px;\r\n\tpadding-left: 2px !important;\r\n}\r\n\r\n.dj_ie .peoplePanelAddContactCard input.ieFirstNameInput\r\n{\r\n\tmargin-right: 5px;\r\n}\r\n\r\n.peoplePanelAddContactCard input.emailInput {\r\n\twidth: 140px;\r\n\tpadding-left: 2px;\r\n}\r\n\r\n.peoplePanelAddContactCard .moreDetailsLink {\r\n\tfloat: left;\r\n}\r\n\r\n.peoplePanelAddContactCard .addContactButton {\r\n\tfloat: right;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("../ws/address/PeoplePanel.css"),wrapperModelClass:ws.address.PeoplePanelGridModel,speedUp:true,searchDefaultValue:Config.Strings.FindContacts,postCreate:function(args,frag){
this.setModel(new ws.address.AddressModel());
this.searchInputNode.value=this.searchDefaultValue;
new ws.widget.HoverCardManager(this.grid.domNode,"ws:PeoplePanelHoverCard","turbogrid-row",{model:this.model});
if(dojo.render.html.moz){
dojo.html.addClass(this.clearSearchButton,"clearSearchImgFF");
}
this.clearSearchButtonWidth=ws.style.getMarginBoxWidthFast(this.clearSearchButton);
dojo.html.hide(this.clearSearchButton);
},initView:function(){
this.columns=[[turbo.grid.format.text,{caption:Config.Strings.Name,align:"left",width:75,colStyle:"padding-left: 1px;"}]];
this.autosizeColumnIndex=this.gridModel.columns.Name;
dojo.html.hide(this.grid.headerNode);
ws.address.PeoplePanel.superclass.initView.apply(this,arguments);
this.grid.docontextmenu=dojo.lang.hitch(this,"onContextMenu");
},openAddContactCard:function(){
if(this.addContactCard){
this.addContactCard.reset();
}else{
this.addContactCard=dojo.widget.createWidget("ws:PeoplePanelAddContactCard",{model:this.model},dojo.body(),"first");
}
this.addContactCard.showCard();
dojo.html.placeOnScreenAroundElement(this.addContactCard.domNode,this.addContactLink,null,null,{"TR":"TR"});
},handleCellClick:function(e){
var _16ce=ws.WebSuite.isComposeInTransition();
if(_16ce){
return;
}
var _16cf=this.model.getRow(e.rowIndex);
var flag=ws.WebSuite.isComposeOpen();
if(_16cf.screenName||_16cf.email1||_16cf.email2||_16cf.composeValue){
dojo.lang.setTimeout(this,function(){
if(flag==true){
ws.WebSuite.reuseComposeWindow(_16cf.screenName||_16cf.email1||_16cf.email2||_16cf.composeValue);
}else{
ws.WebSuite.getCompose(null,function(_16d1){
_16d1.reset({to:_16cf.screenName||_16cf.email1||_16cf.email2||_16cf.composeValue,backToString:"setFolder",isDirty:true});
});
}
},0);
}
},onResized:function(){
this.layoutWidget.domNode.style.width=this.width+"px";
this.layoutWidget.domNode.style.height=this.height+"px";
var w=ws.style.getContentBoxWidthFast(this.layoutWidget.domNode);
ws.style.setMarginBoxWidthFast(this.searchInputDiv,w);
w=ws.style.getContentBoxWidthFast(this.searchInputDiv)-this.clearSearchButtonWidth;
ws.style.setMarginBoxWidthFast(this.searchInputNode,w);
ws.address.PeoplePanel.superclass.onResized.apply(this,arguments);
},positionClearSearch:function(show){
if(show){
dojo.html.show(this.clearSearchButton);
}else{
dojo.html.hide(this.clearSearchButton);
}
},onFocusSearch:function(){
if(this.searchInputNode.value==this.searchDefaultValue){
this.searchInputNode.value="";
dojo.html.removeClass(this.searchInputNode,"default");
}
},onBlurSearch:function(){
if(this.searchInputNode.value==""){
this.searchInputNode.value=this.searchDefaultValue;
dojo.html.addClass(this.searchInputNode,"default");
}
},search:function(){
if(dojo.string.isBlank(this.searchInputNode.value)){
this.positionClearSearch(false);
}else{
this.positionClearSearch(true);
}
this.model.search(this.searchInputNode.value);
},clearSearch:function(){
this.searchInputNode.value="";
this.search();
},getZeroRowsMessage:function(){
if(!dojo.string.isBlank(this.model.currentTextSearch)){
return Config.Strings.NoMatchesFound;
}else{
return Config.Strings.AddressBookEmpty;
}
},getErrorMessage:function(){
return Config.Strings.ErrorLoadingAddressBook;
},onHide:function(){
ws.address.PeoplePanel.superclass.onHide.apply(this,arguments);
if(this.addContactCard&&this.addContactCard.isShowing()){
this.addContactCard.closeCard();
}
},onContextMenu:function(evt){
var _16d5=this.getRightClickMenu();
if(_16d5.isShowingNow){
_16d5.close();
}
this.rightClickMenu.rowIndex=evt.rowIndex;
this.rightClickMenu.contact=this.model.getRow(this.rightClickMenu.rowIndex);
if(!this.rightClickMenu.contact){
return;
}
var _16d6=this.rightClickMenu.contact;
var _16d7=(_16d6.screenName||_16d6.email1||_16d6.email2||_16d6.composeValue);
var hasSn=(this.rightClickMenu.contact.screenName!=null);
this.rightClickMenu.children[3].setDisabled(!_16d7);
this.rightClickMenu.children[4].setDisabled(!hasSn);
_16d5.open(evt.pageX,evt.pageY,null,[]);
evt.preventDefault();
evt.stopPropagation();
},getRightClickMenu:function(){
if(!this.rightClickMenu){
var _16d9=[{caption:Config.Strings.Edit,onClick:ws.lang.hitch(this,"editContact")},{caption:Config.Strings.Delete,onClick:ws.lang.hitch(this,"deleteContact")},{separator:true},{caption:Config.Strings.SendEmail,onClick:ws.lang.hitch(this,"sendEmail")},{caption:Config.Strings.SendIM,onClick:ws.lang.hitch(this,"sendIM")},{separator:true},{caption:Config.Strings.NewContact,_onClick:ws.lang.hitch(this,"addContact")}];
this.rightClickMenu=ws.widget.createMenu(_16d9);
}
return this.rightClickMenu;
},addContact:function(evt){
evt.stopPropagation();
this.rightClickMenu.closeAll(true);
this.openAddContactCard();
},deleteContact:function(evt){
ws.widget.OkCancelDialog.alert(Config.Strings.DeleteContactsConfirmationSingular,dojo.lang.hitch(this,function(_16dc){
if(_16dc){
this.model.deleteAddresses({uids:[this.rightClickMenu.contact.uid],load:function(data){
if(data.isSuccess){
dojo.event.topic.publish("WSFeedbackStart",Config.Strings.ContactDeletedSingular,true);
}
},error:function(err){
ws.widget.OkCancelDialog.alert(dojo.string.isBlank(err)?Config.Strings.ErrorDeletingContactNotFound:err);
}});
}
}),true);
},sendIM:function(){
if(this.rightClickMenu.contact.screenName){
ws.presence.launchIM(this.rightClickMenu.contact.screenName);
}
},editContact:function(){
var _16df=this.rightClickMenu.contact;
if(_16df.bType=="c"){
this.model.getContact({uid:_16df.uid,load:dojo.lang.hitch(this,function(data){
ws.WebSuite.editContact(_16df.uid,data,true);
}),error:function(err){
ws.widget.OkCancelDialog.alert(dojo.string.isBlank(err)?Config.Strings.ErrorLoadingContact:err);
this.close();
}});
}else{
if(_16df.bType=="d"){
ws.WebSuite.editDistributionList(_16df.uid);
}else{
if(_16df.bType=="s"){
ws.WebSuite.sharedGroup(_16df.name);
}
}
}
},sendEmail:function(){
var _16e2=this.rightClickMenu.contact;
var email=(_16e2.screenName||_16e2.email1||_16e2.email2||_16e2.composeValue);
if(email){
ws.WebSuite.getCompose(null,function(_16e4){
_16e4.reset({to:email,backToString:"setFolder"});
});
}
}});
dojo.widget.defineWidget("ws.address.PeoplePanelHoverCard",dojo.widget.PopupContainer,{templateString:"<div class=\"peoplePanelHoverCard dojoPopupContainer\" style=\"display: none;\">\r\n\t<div class=\"headerDiv\">\r\n\t\t<span class=\"wsLink headerLinks\" dojoAttachEvent=\"onClick: onClickIM\" dojoAttachPoint=\"imLink\">${IMshort}</span>\r\n\t\t<span class=\"separator\" dojoAttachPoint=\"imLinkSep\">|</span> \r\n\t\t<span class=\"wsLink headerLinks\" dojoAttachEvent=\"onClick: onClickMail\" dojoAttachPoint=\"mailLink\">${Mail}</span>\r\n\t\t<span class=\"separator\">|</span>\r\n\t\t<span class=\"wsLink headerLinks\" dojoAttachEvent=\"onClick: onClickEdit\">${Edit}</span>\r\n\t</div>\r\n\t<table>\r\n\t\t<tr>\r\n\t\t\t<td valign=\"top\" class=\"conentContainer\">\r\n\t\t\t\t<div dojoType=\"ws:BuddyIcon\" dojoAttachPoint=\"buddyIcon\"></div>\r\n\t\t\t</td>\r\n\t\t\t<td class=\"conentContainer\">\r\n\t\t\t\t<div style=\"font-weight:bold\" dojoAttachPoint=\"nameNode\"></div>\r\n\t\t\t\t<div dojoAttachPoint=\"screenNameNode\" class=\"wsLink\" dojoAttachEvent=\"onClick: onClickIM\"></div>\r\n\t\t\t\t<div dojoAttachPoint=\"email1Node\" class=\"wsLink\" dojoAttachEvent=\"onClick: onClickEmail1\"></div>\r\n\t\t\t\t<div dojoAttachPoint=\"email2Node\" class=\"wsLink\" dojoAttachEvent=\"onClick: onClickEmail2\"></div>\r\n\t\t\t\t<div dojoAttachPoint=\"phone1Row\">\r\n\t\t\t\t\t<span dojoAttachPoint=\"phone1TypeNode\">${Cellular}</span>: <span dojoAttachPoint=\"phone1Node\"></span>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div dojoAttachPoint=\"phone2Row\">\r\n\t\t\t\t\t<span dojoAttachPoint=\"phone2TypeNode\">${Cellular}</span>: <span dojoAttachPoint=\"phone2Node\"></span>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div dojoAttachPoint=\"phone3Row\">\r\n\t\t\t\t\t<span dojoAttachPoint=\"phone3TypeNode\">${Cellular}</span>: <span dojoAttachPoint=\"phone3Node\"></span>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div dojoAttachPoint=\"phone4Row\">\r\n\t\t\t\t\t<span dojoAttachPoint=\"phone4TypeNode\">${Cellular}</span>: <span dojoAttachPoint=\"phone4Node\"></span>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div dojoAttachPoint=\"phone5Row\">\r\n\t\t\t\t\t<span dojoAttachPoint=\"phone5TypeNode\">${Cellular}</span>: <span dojoAttachPoint=\"phone5Node\"></span>\r\n\t\t\t\t</div>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td></td>\r\n\t\t\t<td align=\"right\" class=\"conentContainer\">\r\n\t\t\t\t<span class=\"wsLink deleteLink\" dojoAttachEvent=\"onClick: onClickDelete\" dojoAttachPoint=\"deleteLink\">${Delete}</span>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t</table>\r\n</div>\r\n",templateCssString:"body .peoplePanel .turbogrid {\r\n\tmargin-left: 11px;\r\n}\r\nbody .peoplePanel .turbogrid-scrollbox {\r\n\tborder-top: none;\r\n\tfont: normal 12px Arial;\r\n}\r\n\r\n.peoplePanel .searchInputDiv\r\n{\r\n\twidth: 138px;\r\n\tpadding-left: 6px;\r\n\tmargin: 3px;\r\n\tborder: solid 1px #85817c;\r\n\tbackground-color: #FFF;\t\r\n}\r\n\r\n.peoplePanel input {\r\n\tfont: normal 11px verdana;\r\n\tvertical-align: middle;\r\n\tborder: none;\r\n\tpadding-top: 2px;\r\n\tpadding-bottom: 2px;\r\n}\r\n\r\n.peoplePanel input.default {\r\n\tcolor: #a5a5a5;\r\n}\r\n.peoplePanel .clearSearchImg\r\n{\r\n\tposition: absolute;\r\n\tz-index: 1000;\r\n\twidth: 10px;\r\n\theight: 10px;\r\n\tmargin: 5px 4px 0px 2px;\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tbackground-position: -959px -2px;\r\n\tcursor: pointer;\r\n}\r\n.peoplePanel .clearSearchImgFF { margin: 4px 4px 0px 4px; }\r\n.peoplePanel .clearSearchImg:hover { background-position: -973px -2px; }\r\n\r\n.peoplePanel .addContact {\r\n\tcursor: pointer;\r\n\tmargin-top: 1px;\r\n\ttext-align: left;\r\n}\r\n.peoplePanel .addContact .icon {\r\n\twidth: 12px;\r\n\theight: 12px;\r\n\tbackground: url(\"${images}main.gif\") -1260px -1px;\r\n\tmargin: 3px 0px 0px 3px;\r\n\tpadding-top: 2px;\r\n}\r\n.peoplePanel .addContact .icon:hover {\r\n\tbackground-position: -1275px -1px;\r\n}\r\n.peoplePanel .wsLink  {\r\n\tposition: relative;\r\n\ttop: -3px;\r\n}\r\n\r\n/*\r\n *\tHover card\r\n */\r\n\r\n.peoplePanelHoverCard {\r\n\tbackground-color: #FFFFFF;\r\n\tborder: 1px solid black;\r\n\tposition: absolute;\r\n\tmin-width:250px;\r\n\tmax-width:300px;\r\n\t_width:250px;\r\n}\r\n\r\n.peoplePanelHoverCard .headerDiv\r\n{\r\n\tbackground-color: #E4EDFA;\r\n\tpadding: 4px 7px  0px 12px;\r\n\t_width:250px;\r\n}\r\n\r\n.peoplePanelHoverCard .headerDiv span.headerLinks\r\n{\r\n\tfont-weight: bold;\r\n}\r\n\r\n.peoplePanelHoverCard .headerDiv span.separator\r\n{\r\n\tcolor: #999999;\r\n\tmargin-left: 4px;\r\n\tmargin-right: 4px;\r\n}\r\n\r\n.peoplePanelHoverCard .conentContainer\r\n{\r\n\tpadding: 5px 7px 5px 8px;\t\t\r\n}\r\n\r\n.peoplePanelHoverCard .conentContainer span.deleteLink\r\n{\r\n\tfloat:right;\r\n\tfont-size: 11px;\r\n\tmargin-left:140px;\r\n\tmargin-bottom: 2px;\r\n\t\r\n}\r\n\r\n/*\r\n *\tAdd contact card\r\n */\r\n\r\n.peoplePanelAddContactCard {\r\n\twidth: 250px;\r\n\tpadding: 3px;\r\n\tbackground-color: #FFFFFF;\r\n\tborder: 1px solid #8A8A8A;\r\n\tz-index: 1000;\r\n\tposition: absolute;\r\n\toverflow: auto;  /* Fixes the Firefox no-blinking-cursor bug */\r\n}\r\n\r\n.peoplePanelAddContactCard .closeButton {\r\n\twidth: 12px;\r\n\theight: 12px;\r\n\tcursor: pointer;\r\n\tfloat: right;\r\n\tbackground: url(\"${images}main.gif\") -1425px -1px;\r\n}\r\n.peoplePanelAddContactCard .closeButton:hover {\r\n\tbackground-position: -1440px -1px;\r\n}\r\n\r\n.peoplePanelAddContactCard input {\r\n\twidth: 70px;\r\n\tpadding-left: 2px;\r\n}\r\n\r\n.peoplePanelAddContactCard input.nameInput\r\n{\r\n\twidth: 64px;\r\n\tpadding-left: 2px !important;\r\n}\r\n\r\n.dj_ie .peoplePanelAddContactCard input.ieFirstNameInput\r\n{\r\n\tmargin-right: 5px;\r\n}\r\n\r\n.peoplePanelAddContactCard input.emailInput {\r\n\twidth: 140px;\r\n\tpadding-left: 2px;\r\n}\r\n\r\n.peoplePanelAddContactCard .moreDetailsLink {\r\n\tfloat: left;\r\n}\r\n\r\n.peoplePanelAddContactCard .addContactButton {\r\n\tfloat: right;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("../ws/address/PeoplePanel.css"),widgetsInTemplate:true,isContainer:false,manager:null,model:null,contactPhoneTypes:["Undefined","Cellular","Fax","Home","Pager","Work"],postCreate:function(){
if(!Config.ShowPresenceInfoOnPeoplePanel){
this.buddyIcon.hide();
dojo.html.hide(this.imLink);
dojo.html.hide(this.imLinkSep);
}
},populate:function(_16e5){
var _16e6=dojo.html.getAttribute(_16e5,"rowindex");
this.contact=this.model.getRow(_16e6);
if(!this.contact){
return;
}
var _16e7=function(node,text){
dojo.html.setShowing(node,!dojo.string.isBlank(text));
ws.html.setInnerText(node,dojo.string.summary(text?text:"",30));
};
_16e7(this.nameNode,this.contact.name);
_16e7(this.screenNameNode,this.contact.screenName);
_16e7(this.email1Node,this.contact.email1);
_16e7(this.email2Node,this.contact.email2);
ws.html.toggleClass(this.imLink,"wsLinkDisabled",dojo.string.isBlank(this.contact.screenName));
ws.html.toggleClass(this.mailLink,"wsLinkDisabled",!this.contact.hasEmail);
for(var i=1;i<=5;i++){
dojo.html.setShowing(this["phone"+i+"Row"],this.contact["phone"+i]);
ws.html.setInnerText(this["phone"+i+"TypeNode"],this.localizedPhoneType(this.contact["phone"+i+"Type"]));
ws.html.setInnerText(this["phone"+i+"Node"],this.contact["phone"+i]);
}
this.buddyIcon.show(this.contact);
},localizedPhoneType:function(_16eb){
switch(_16eb){
case this.contactPhoneTypes[5]:
return Config.Strings.Work;
case this.contactPhoneTypes[4]:
return Config.Strings.Pager;
case this.contactPhoneTypes[3]:
return Config.Strings.Home;
case this.contactPhoneTypes[2]:
return Config.Strings.Fax;
case this.contactPhoneTypes[1]:
case this.contactPhoneTypes[0]:
default:
return Config.Strings.Cellular;
}
},onClickIM:function(){
if(this.contact.screenName){
ws.presence.launchIM(this.contact.screenName);
this.manager.close();
}
},onClickEdit:function(){
if(this.contact.bType=="c"){
this.model.getContact({uid:this.contact.uid,load:dojo.lang.hitch(this,function(data){
ws.WebSuite.editContact(this.contact.uid,data,true);
}),error:function(err){
ws.widget.OkCancelDialog.alert(dojo.string.isBlank(err)?Config.Strings.ErrorLoadingContact:err);
this.close();
}});
}else{
if(this.contact.bType=="d"){
ws.WebSuite.editDistributionList(this.contact.uid);
}else{
if(this.contact.bType=="s"){
ws.WebSuite.sharedGroup(this.contact.name);
}
}
}
this.manager.close();
},onClickMail:function(){
this.startCompose(this.contact.screenName||this.contact.email1||this.contact.email2||this.contact.composeValue);
},onClickEmail1:function(){
this.startCompose(this.contact.email1);
},onClickEmail2:function(){
this.startCompose(this.contact.email2);
},startCompose:function(email){
if(email){
ws.WebSuite.getCompose(null,function(_16ef){
_16ef.reset({to:email,backToString:"setFolder"});
});
this.manager.close();
}
},onClickDelete:function(){
ws.widget.OkCancelDialog.alert(Config.Strings.DeleteContactsConfirmationSingular,dojo.lang.hitch(this,function(_16f0){
if(_16f0){
this.model.deleteAddresses({uids:[this.contact.uid],load:function(data){
if(data.isSuccess){
dojo.event.topic.publish("WSFeedbackStart",Config.Strings.ContactDeletedSingular,true);
}
},error:function(err){
ws.widget.OkCancelDialog.alert(dojo.string.isBlank(err)?Config.Strings.ErrorDeletingContactNotFound:err);
}});
}
}),true);
}});
if(ws.address.PeoplePanelHoverCard.prototype.templateString==dojo.widget.PopupContainer.prototype.templateString){
ws.address.PeoplePanelHoverCard.prototype.templateString=null;
}
dojo.widget.defineWidget("ws.address.PeoplePanelAddContactCard",dojo.widget.HtmlWidget,{templateString:"<div class=\"peoplePanelAddContactCard dojoPopupContainer\" style=\"display: none;\">\r\n\t<img src=\"${spacer}\" class=\"closeButton\" dojoAttachEvent=\"onClick: closeCard\">\r\n\t<table>\r\n\t\t<tr>\r\n\t\t\t<td>${Name}</td>\r\n\t\t\t<td colspan=\"2\">\r\n\t\t\t\t<div dojoType=\"ws:DefaultTextBox\" className=\"nameInput ieFirstNameInput\" dojoAttachPoint=\"firstNameInput\" maxlength=\"255\" defaultValue=\"${First}\"></div>\r\n\t\t\t\t<div dojoType=\"ws:DefaultTextBox\" className=\"nameInput\" dojoAttachPoint=\"lastNameInput\" maxlength=\"255\" defaultValue=\"${Last}\"></div>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td>${Email}</td>\r\n\t\t\t<td colspan=\"2\"><input maxlength=\"255\" dojoAttachPoint=\"emailInput\" class=\"wsInput emailInput\"></td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td>${Phone}</td>\r\n\t\t\t<td><input maxlength=\"255\" dojoAttachPoint=\"phoneInput\" class=\"wsInput\"></td>\r\n\t\t\t<td>\r\n\t\t\t\t<ul dojoType=\"ws:WSSelect\" dojoAttachPoint=\"phoneTypeSelect\">\r\n\t\t\t\t\t<li value=\"Cellular\">${Cellular}</li>\r\n\t\t\t\t\t<li value=\"Home\">${Home}</li>\r\n\t\t\t\t\t<li value=\"Work\">${Work}</li>\r\n\t\t\t\t\t<li value=\"Pager\">${Pager}</li>\r\n\t\t\t\t\t<li value=\"Fax\">${Fax}</li>\r\n\t\t\t\t</ul>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t<td>\r\n\t\t\t<span class=\"wsLink moreDetailsLink\" dojoAttachEvent=\"onClick: moreDetails\">${MoreDetails2}</span>\r\n\t\t</td>\r\n\t\t<td colspan=2 align=right>\r\n\t\t\t<div dojoType=\"ws:WSButton\" vizType=\"Blue\" className=\"addContactButton\" dojoAttachEvent=\"onClick: checkRequiredFields\">${AddContact}</div>\r\n\t\t</td>\r\n\t\t</tr>\r\n\t</table>\t\r\n\t<span style=\"clear: both;\"></span>\r\n</div>\r\n",templateCssString:"body .peoplePanel .turbogrid {\r\n\tmargin-left: 11px;\r\n}\r\nbody .peoplePanel .turbogrid-scrollbox {\r\n\tborder-top: none;\r\n\tfont: normal 12px Arial;\r\n}\r\n\r\n.peoplePanel .searchInputDiv\r\n{\r\n\twidth: 138px;\r\n\tpadding-left: 6px;\r\n\tmargin: 3px;\r\n\tborder: solid 1px #85817c;\r\n\tbackground-color: #FFF;\t\r\n}\r\n\r\n.peoplePanel input {\r\n\tfont: normal 11px verdana;\r\n\tvertical-align: middle;\r\n\tborder: none;\r\n\tpadding-top: 2px;\r\n\tpadding-bottom: 2px;\r\n}\r\n\r\n.peoplePanel input.default {\r\n\tcolor: #a5a5a5;\r\n}\r\n.peoplePanel .clearSearchImg\r\n{\r\n\tposition: absolute;\r\n\tz-index: 1000;\r\n\twidth: 10px;\r\n\theight: 10px;\r\n\tmargin: 5px 4px 0px 2px;\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tbackground-position: -959px -2px;\r\n\tcursor: pointer;\r\n}\r\n.peoplePanel .clearSearchImgFF { margin: 4px 4px 0px 4px; }\r\n.peoplePanel .clearSearchImg:hover { background-position: -973px -2px; }\r\n\r\n.peoplePanel .addContact {\r\n\tcursor: pointer;\r\n\tmargin-top: 1px;\r\n\ttext-align: left;\r\n}\r\n.peoplePanel .addContact .icon {\r\n\twidth: 12px;\r\n\theight: 12px;\r\n\tbackground: url(\"${images}main.gif\") -1260px -1px;\r\n\tmargin: 3px 0px 0px 3px;\r\n\tpadding-top: 2px;\r\n}\r\n.peoplePanel .addContact .icon:hover {\r\n\tbackground-position: -1275px -1px;\r\n}\r\n.peoplePanel .wsLink  {\r\n\tposition: relative;\r\n\ttop: -3px;\r\n}\r\n\r\n/*\r\n *\tHover card\r\n */\r\n\r\n.peoplePanelHoverCard {\r\n\tbackground-color: #FFFFFF;\r\n\tborder: 1px solid black;\r\n\tposition: absolute;\r\n\tmin-width:250px;\r\n\tmax-width:300px;\r\n\t_width:250px;\r\n}\r\n\r\n.peoplePanelHoverCard .headerDiv\r\n{\r\n\tbackground-color: #E4EDFA;\r\n\tpadding: 4px 7px  0px 12px;\r\n\t_width:250px;\r\n}\r\n\r\n.peoplePanelHoverCard .headerDiv span.headerLinks\r\n{\r\n\tfont-weight: bold;\r\n}\r\n\r\n.peoplePanelHoverCard .headerDiv span.separator\r\n{\r\n\tcolor: #999999;\r\n\tmargin-left: 4px;\r\n\tmargin-right: 4px;\r\n}\r\n\r\n.peoplePanelHoverCard .conentContainer\r\n{\r\n\tpadding: 5px 7px 5px 8px;\t\t\r\n}\r\n\r\n.peoplePanelHoverCard .conentContainer span.deleteLink\r\n{\r\n\tfloat:right;\r\n\tfont-size: 11px;\r\n\tmargin-left:140px;\r\n\tmargin-bottom: 2px;\r\n\t\r\n}\r\n\r\n/*\r\n *\tAdd contact card\r\n */\r\n\r\n.peoplePanelAddContactCard {\r\n\twidth: 250px;\r\n\tpadding: 3px;\r\n\tbackground-color: #FFFFFF;\r\n\tborder: 1px solid #8A8A8A;\r\n\tz-index: 1000;\r\n\tposition: absolute;\r\n\toverflow: auto;  /* Fixes the Firefox no-blinking-cursor bug */\r\n}\r\n\r\n.peoplePanelAddContactCard .closeButton {\r\n\twidth: 12px;\r\n\theight: 12px;\r\n\tcursor: pointer;\r\n\tfloat: right;\r\n\tbackground: url(\"${images}main.gif\") -1425px -1px;\r\n}\r\n.peoplePanelAddContactCard .closeButton:hover {\r\n\tbackground-position: -1440px -1px;\r\n}\r\n\r\n.peoplePanelAddContactCard input {\r\n\twidth: 70px;\r\n\tpadding-left: 2px;\r\n}\r\n\r\n.peoplePanelAddContactCard input.nameInput\r\n{\r\n\twidth: 64px;\r\n\tpadding-left: 2px !important;\r\n}\r\n\r\n.dj_ie .peoplePanelAddContactCard input.ieFirstNameInput\r\n{\r\n\tmargin-right: 5px;\r\n}\r\n\r\n.peoplePanelAddContactCard input.emailInput {\r\n\twidth: 140px;\r\n\tpadding-left: 2px;\r\n}\r\n\r\n.peoplePanelAddContactCard .moreDetailsLink {\r\n\tfloat: left;\r\n}\r\n\r\n.peoplePanelAddContactCard .addContactButton {\r\n\tfloat: right;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("../ws/address/PeoplePanel.css"),widgetsInTemplate:true,isContainer:false,model:null,closeAddCard:false,showCard:function(){
this.show();
dojo.event.connect(document.documentElement,"onkeypress",this,"_onDocBodyKeyPress");
dojo.event.connect(document.documentElement,"onmousedown",this,"_onDocBodyClick");
dojo.event.connect(dojo.widget.PopupManager,"onClick",this,"_onDocBodyClick");
dojo.event.connect(this.phoneTypeSelect,"valueChanged",this,"phoneSelected");
},moreDetails:function(){
ws.WebSuite.editContact(0,this.getData(),true);
this.closeCard();
},checkRequiredFields:function(){
var _16f3="";
if(!dojo.string.isBlank(this.emailInput.value)&&!this.isEmailAddress(this.emailInput.value)){
_16f3=Config.Strings.ErrorEmailFormat2;
}
if(dojo.string.isBlank(_16f3)){
this.addContact();
}else{
ws.widget.OkCancelDialog.alert(_16f3);
}
},isEmailAddress:function(_16f4){
var _16f5=_16f4.match(/(.+)@(.+)\.(.+)/);
return ((_16f5!=null)&&(_16f5.length==4));
},addContact:function(){
var args=this.getData();
if((args.firstName!="")||(args.lastName!="")){
args.category="General";
args.uid=0;
args.load=dojo.lang.hitch(this,function(){
dojo.event.topic.publish("WSFeedbackStart",Config.Strings.ContactCreated,true);
this.closeCard();
});
args.error=function(err){
ws.widget.OkCancelDialog.alert(dojo.string.isBlank(err)?Config.Strings.ErrorSavingContactServerError:err);
};
this.model.createOrModifyContact(args);
}
},getData:function(){
var first="";
var last="";
if(!dojo.string.isBlank(this.firstNameInput.getValue())){
first=dojo.string.trim(this.firstNameInput.getValue());
}
if(!dojo.string.isBlank(this.lastNameInput.getValue())){
last=dojo.string.trim(this.lastNameInput.getValue());
}
if(first==""&&last==""){
dojo.debug("first and last name are blank..");
}
return {firstName:first,lastName:last,email1:this.emailInput.value,phone1:this.phoneInput.value,phone1Type:this.phoneTypeSelect.currentValue};
},reset:function(){
this.firstNameInput.setValue();
this.lastNameInput.setValue();
this.emailInput.value="";
this.phoneInput.value="";
this.phoneTypeSelect.setOption(0);
},_onDocBodyKeyPress:function(evt){
evt.stopPropagation();
if(evt.keyCode==evt.KEY_ESCAPE){
this.closeCard();
}
},phoneSelected:function(){
this.closeAddCard=true;
},_onDocBodyClick:function(evt){
evt.stopPropagation();
var _16fc=dojo.html.overElement(this.domNode,evt);
if(!_16fc&&!this.closeAddCard){
this.closeCard();
}
},closeCard:function(){
dojo.event.disconnect(document.documentElement,"onkeypress",this,"_onDocBodyKeyPress");
dojo.event.disconnect(document.documentElement,"onmousedown",this,"_onDocBodyClick");
dojo.event.disconnect(dojo.widget.PopupManager,"onClick",this,"_onDocBodyClick");
this.hide();
}});
dojo.provide("ws.calendar.CalendarDragAndDrop");
ws.calendar.CalendarDragAndDrop={TYPE_ALL:-1,TYPE_GRIDVIEWMOVE:0,TYPE_UNTIMEDVIEWMOVE:1,TYPE_COLUMNVIEWMOVE:2,TYPE_COLUMNVIEWRESIZE:3,TYPE_COLUMNVIEWDIRECTENTRY:4};
dojo.declare("ws.calendar.CalendarDragSource",dojo.dnd.DragSource,{dragClass:"",dragObjectConstructor:null,onDragStart:function(){
if(this.disabled){
return null;
}
var _16fd;
var _16fe=ws.calendar.CalendarDragAndDrop;
switch(this.type){
case _16fe.TYPE_GRIDVIEWMOVE:
this.dragClass="gridViewMoveGhost";
this.dragObjectConstructor=ws.calendar.CalendarDragObject;
_16fd=new ws.calendar.CalendarDragObject(this.dragObject,this.type,this.parentWidget,this.constrainToContainer,this.constrainingContainer,this.scrollContainer);
break;
case _16fe.TYPE_UNTIMEDVIEWMOVE:
this.dragClass="untimedViewMoveGhost";
this.dragObjectConstructor=ws.calendar.CalendarDragObject;
_16fd=new ws.calendar.CalendarDragObject(this.dragObject,this.type,this.parentWidget,this.constrainToContainer,this.constrainingContainer,this.scrollContainer);
break;
case _16fe.TYPE_COLUMNVIEWMOVE:
this.dragClass="columnViewMoveGhost";
this.dragObjectConstructor=ws.calendar.TimedGridMoveDragObject;
_16fd=new ws.calendar.TimedGridMoveDragObject(this.dragObject.parentNode,this.type,this.parentWidget,this.constrainToContainer,this.constrainingContainer,this.scrollContainer);
break;
case _16fe.TYPE_COLUMNVIEWRESIZE:
this.dragClass="columnViewResizeGhost";
this.dragObjectConstructor=ws.calendar.TimedGridResizeDragObject;
_16fd=new ws.calendar.TimedGridResizeDragObject(this.dragObject.parentNode,this.type,this.parentWidget,this.constrainToContainer,this.constrainingContainer,this.scrollContainer);
break;
case _16fe.TYPE_COLUMNVIEWDIRECTENTRY:
this.dragClass="columnViewDirectEntryGhost";
this.dragObjectConstructor=ws.calendar.TimedGridDirectEntryDragObject;
_16fd=new ws.calendar.TimedGridDirectEntryDragObject(this.dragObject,this.type,this.parentWidget,this.constrainToContainer,this.constrainingContainer,this.scrollContainer);
break;
default:
this.dragClass="";
this.dragObjectConstructor=Object;
_16fd=new Object();
break;
}
_16fd.dragClass=this.dragClass;
return _16fd;
},setDragHandle:function(node){
node=dojo.byId(node);
dojo.dnd.dragManager.unregisterDragSource(this);
this.domNode=node;
dojo.dnd.dragManager.registerDragSource(this);
},setDragTarget:function(node){
this.dragObject=node;
},onSelected:function(){
for(var i=0;i<this.dragObjects.length;i++){
dojo.dnd.dragManager.selectedSources.push(new this.dragObjectConstructor(this.dragObjects[i]));
}
},addDragObjects:function(el){
for(var i=0;i<arguments.length;i++){
this.dragObjects.push(arguments[i]);
}
}},function(node,type,_1706,_1707,_1708,_1709){
node=dojo.byId(node);
this.disabled=false;
this.dragObjects=[];
if(node){
this.parentWidget=_1706;
this.constrainToContainer=_1707?true:false;
this.constrainingContainer=_1708?_1708:node.parentNode;
this.scrollContainer=_1709?_1709:this.constrainingContainer;
this.domNode=node;
this.dragObject=node;
this.type=(type=="*")?this.TYPE_ALL:type;
dojo.dnd.DragSource.prototype.reregister.call(this);
}
});
dojo.declare("ws.calendar.CalendarDragObject",dojo.dnd.DragObject,{dragClass:"",opacity:0.5,createIframe:true,createDragNode:function(){
var node=this.createDragNodeImpl();
if((dojo.render.html.ie55||dojo.render.html.ie60)&&this.createIframe){
with(node.style){
left="0px";
top="0px";
}
var outer=document.createElement("div");
outer.appendChild(node);
this.bgIframe=new dojo.html.BackgroundIframe(outer);
outer.appendChild(this.bgIframe.iframe);
node=outer;
}
return node;
},createDragNodeImpl:function(){
var node=this.domNode.cloneNode(true);
if(this.dragClass){
dojo.html.addClass(node,this.dragClass);
}
if(this.opacity<1){
dojo.html.setOpacity(node,this.opacity);
}
if(node.tagName.toLowerCase()=="tr"){
var doc=this.domNode.ownerDocument;
var table=doc.createElement("table");
var tbody=doc.createElement("tbody");
table.appendChild(tbody);
tbody.appendChild(node);
var _1710=this.domNode.childNodes;
var _1711=node.childNodes;
for(var i=0;i<_1710.length;i++){
if((_1711[i])&&(_1711[i].style)){
_1711[i].style.width=dojo.html.getContentBox(_1710[i]).width+"px";
}
}
node=table;
}
return node;
},onDragStart:function(e){
dojo.html.clearSelection();
this.parentWidget.cancelClick();
this.dragClone=this.createDragNode();
this.containingBlockPosition=dojo.html.getAbsolutePosition(this.constrainingContainer,true);
this.containingBlockSize=dojo.html.getContentBox(this.constrainingContainer);
if(this.constrainToContainer){
this.constraints=this.getConstraints();
}
this.scrollStartPosition={x:this.scrollContainer.scrollLeft,y:this.scrollContainer.scrollTop};
var _1714=dojo.html.getContentBox(this.scrollContainer);
this.viewportRectangle={x:this.containingBlockPosition.x+this.scrollContainer.scrollLeft,y:this.containingBlockPosition.y+this.scrollContainer.scrollTop,width:_1714.width,height:_1714.height,top:this.containingBlockPosition.y+this.scrollContainer.scrollTop,bottom:this.containingBlockPosition.y+this.scrollContainer.scrollTop+_1714.height,minScrollTop:0,maxScrollTop:ws.style.getMarginBoxHeightFast(this.constrainingContainer)-_1714.height};
this.onDragStartImpl(e);
dojo.event.connect(this.domNode,"onclick",this,"squelchOnClick");
dojo.event.topic.publish("dragStart",{source:this});
},onDragStartImpl:function(e){
this.dragStartPosition=dojo.html.getAbsolutePosition(this.domNode,true);
this.dragOffset={x:this.dragStartPosition.x-e.pageX,y:this.dragStartPosition.y-e.pageY};
with(this.dragClone.style){
position="absolute";
left=this.dragOffset.x+e.pageX+"px";
top=this.dragOffset.y+e.pageY+"px";
}
dojo.body().appendChild(this.dragClone);
},getConstraints:function(){
if(this.constrainingContainer.nodeName.toLowerCase()=="body"){
var _1716=dojo.html.getViewport();
var width=_1716.width;
var _1718=_1716.height;
var x=0;
var y=0;
}else{
var _171b=dojo.html.getContentBox(this.constrainingContainer);
width=_171b.width;
_1718=_171b.height;
x=this.containingBlockPosition.x+dojo.html.getPixelValue(this.constrainingContainer,"padding-left",true)+dojo.html.getBorderExtent(this.constrainingContainer,"left");
y=this.containingBlockPosition.y+dojo.html.getPixelValue(this.constrainingContainer,"padding-top",true)+dojo.html.getBorderExtent(this.constrainingContainer,"top");
}
var mb=dojo.html.getMarginBox(this.domNode);
return {minX:x,minY:y,maxX:x+width-mb.width,maxY:y+_1718-mb.height};
},onDragMove:function(e){
var x=this.dragOffset.x+e.pageX;
var y=this.dragOffset.y+e.pageY;
if(this.constrainToContainer){
if(x<this.constraints.minX){
x=this.constraints.minX;
}
if(y<this.constraints.minY){
y=this.constraints.minY;
}
if(x>this.constraints.maxX){
x=this.constraints.maxX;
}
if(y>this.constraints.maxY){
y=this.constraints.maxY;
}
}
if(!this.disableX){
this.dragClone.style.left=x+"px";
}
if(!this.disableY){
this.dragClone.style.top=y+"px";
}
},onDragEnd:function(e){
this.onDragEndImpl(e);
dojo.event.topic.publish("dragEnd",{source:this});
},onDragEndImpl:function(e){
switch(e.dragStatus){
case "dropSuccess":
dojo.html.removeNode(this.dragClone);
this.dragClone=null;
break;
case "dropFailure":
var _1722={left:this.dragStartPosition.x,top:this.dragStartPosition.y};
this.scrollContainer.scrollLeft=this.scrollStartPosition.x;
this.scrollContainer.scrollTop=this.scrollStartPosition.y;
var anim=dojo.lfx.slideTo(this.dragClone,_1722,500,dojo.lfx.easeOut);
var _1724=this;
dojo.event.connect(anim,"onEnd",function(e){
dojo.lang.setTimeout(function(){
dojo.html.removeNode(_1724.dragClone);
_1724.dragClone=null;
},100);
});
anim.play();
break;
}
},squelchOnClick:function(e){
dojo.event.browser.stopEvent(e);
dojo.lang.setTimeout(function(){
dojo.event.disconnect(this.domNode,"onclick",this,"squelchOnClick");
},50);
}},function(node,type,_1729,_172a,_172b,_172c){
this.domNode=dojo.byId(node);
this.type=type;
this.parentWidget=_1729;
this.constrainToContainer=_172a;
this.constrainingContainer=_172b;
this.scrollContainer=_172c;
this.dragSource=null;
dojo.dnd.DragObject.prototype.register.call(this);
});
dojo.declare("ws.calendar.TimedGridMoveDragObject",ws.calendar.CalendarDragObject,{createDragNodeImpl:function(){
var node=document.createElement("div");
if(this.dragClass){
dojo.html.addClass(node,this.dragClass);
}
if(this.opacity<1){
dojo.html.setOpacity(node,this.opacity);
}
node.innerHTML="<div style='padding: 5px 2px 5px 2px;'>"+this.domNode.childNodes[0].innerHTML+"</div>";
node.style.width=this.domNode.style.width;
node.style.height=this.domNode.style.height;
node.style.backgroundColor=this.domNode.style.backgroundColor;
node.style.borderColor=this.domNode.style.borderColor;
return node;
}});
dojo.declare("ws.calendar.TimedGridResizeDragObject",ws.calendar.CalendarDragObject,{disableX:true,createDragNode:function(){
var node=document.createElement("div");
if(this.dragClass){
dojo.html.addClass(node,this.dragClass);
}
if(this.opacity<1){
dojo.html.setOpacity(node,this.opacity);
}
node.innerHTML="<div style='padding: 5px 2px 5px 2px;'>"+this.domNode.childNodes[0].innerHTML+"</div>";
node.style.width=this.domNode.style.width;
node.style.height=this.domNode.style.height;
node.style.backgroundColor=this.domNode.style.backgroundColor;
node.style.borderColor=this.domNode.style.borderColor;
return node;
},onDragStartImpl:function(e){
this.dragStartPosition={x:e.pageX-this.viewportRectangle.x+this.scrollContainer.scrollLeft,y:e.pageY-this.viewportRectangle.y+this.scrollContainer.scrollTop};
this.dragOffset={x:this.dragStartPosition.x-e.pageX,y:this.dragStartPosition.y-e.pageY};
with(this.dragClone.style){
position="absolute";
left=this.domNode.style.left;
top=this.domNode.style.top;
}
this.scrollContainer.appendChild(this.dragClone);
},getConstraints:function(){
var _1730=dojo.html.getContentBox(this.constrainingContainer);
width=_1730.width;
height=_1730.height;
x=dojo.html.getPixelValue(this.constrainingContainer,"padding-left",true)+dojo.html.getBorderExtent(this.constrainingContainer,"left");
y=dojo.html.getPixelValue(this.constrainingContainer,"padding-top",true)+dojo.html.getBorderExtent(this.constrainingContainer,"top");
return {minX:x,minY:y,maxX:x+width,maxY:y+height};
},onDragMove:function(e){
var y=e.pageY-this.viewportRectangle.y+this.scrollContainer.scrollTop;
if(this.constrainToContainer){
if(y<this.constraints.minY){
y=this.constraints.minY;
}
if(y>this.constraints.maxY){
y=this.constraints.maxY;
}
}
var _1733;
var _1734;
var _1735;
var _1736;
var top=parseInt(this.domNode.style.top);
var _1738=y-top;
if(_1738>=0){
_1735=top;
_1734=Math.ceil(y/this.parentWidget.rowHeight);
_1736=(_1734*this.parentWidget.rowHeight)-_1735-this.parentWidget.cellPadBorderHeight;
_1736-=this.parentWidget.cellPadBorderHeight*2;
}else{
_1733=Math.floor(y/this.parentWidget.rowHeight);
_1735=_1733*this.parentWidget.rowHeight;
var _1739=top+parseInt(this.domNode.style.height);
_1736=_1739-_1735;
}
if(_1736<0){
_1736=0;
}
this.dragClone.style.top=_1735+"px";
this.dragClone.style.height=_1736+"px";
},onDragEndImpl:function(e){
switch(e.dragStatus){
case "dropSuccess":
case "dropFailure":
dojo.html.removeNode(this.dragClone);
this.dragClone=null;
break;
}
}});
dojo.declare("ws.calendar.TimedGridDirectEntryDragObject",ws.calendar.CalendarDragObject,{createDragNode:function(){
if(ws.WebSuite.inlineAddEventDialog&&ws.WebSuite.inlineAddEventDialog.isShowing()){
ws.WebSuite.inlineAddEventDialog.closeCard();
}
var node=document.createElement("div");
if(this.dragClass){
dojo.html.addClass(node,this.dragClass);
}
if(this.opacity<1){
dojo.html.setOpacity(node,this.opacity);
}
node.innerHTML="<span style=\"position: absolute; right: 0px; top: 0px;\"></span><span style=\"position: absolute; right: 0px; bottom: 0px;\"></span>";
return node;
},onDragStartImpl:function(e){
this.dragStartPosition={x:e.pageX-this.viewportRectangle.x+this.scrollContainer.scrollLeft,y:e.pageY-this.viewportRectangle.y+this.scrollContainer.scrollTop};
this.dragOffset={x:this.dragStartPosition.x-e.pageX,y:this.dragStartPosition.y-e.pageY};
with(this.dragClone.style){
position="absolute";
left=this.dragStartPosition.x+"px";
top=this.dragStartPosition.y+"px";
}
this.scrollContainer.appendChild(this.dragClone);
},getConstraints:function(){
var _173d=dojo.html.getContentBox(this.constrainingContainer);
width=_173d.width;
height=_173d.height;
x=dojo.html.getPixelValue(this.constrainingContainer,"padding-left",true)+dojo.html.getBorderExtent(this.constrainingContainer,"left");
y=dojo.html.getPixelValue(this.constrainingContainer,"padding-top",true)+dojo.html.getBorderExtent(this.constrainingContainer,"top");
return {minX:x,minY:y,maxX:x+width,maxY:y+height};
},onDragMove:function(e){
var x=e.pageX-this.viewportRectangle.x+this.scrollContainer.scrollLeft;
var y=e.pageY-this.viewportRectangle.y+this.scrollContainer.scrollTop;
if(this.constrainToContainer){
if(x<this.constraints.minX){
x=this.constraints.minX;
}
if(y<this.constraints.minY){
y=this.constraints.minY;
}
if(x>this.constraints.maxX){
x=this.constraints.maxX;
}
if(y>this.constraints.maxY){
y=this.constraints.maxY;
}
}
var col=0;
var tlw=this.parentWidget.timeLabelWidth;
var _1743=this.parentWidget.cellOffsets;
var i=1;
while(i<_1743.length){
if(x<(tlw+_1743[i])){
break;
}
col++;
i++;
}
var _1745=tlw+_1743[col];
var width=this.parentWidget.cellWidths[col]-this.parentWidget.cellPadBorderWidth;
width-=this.parentWidget.cellPadBorderWidth*2;
var _1747;
var _1748;
var _1749;
var _174a;
var _174b=y-this.dragStartPosition.y;
if(_174b>=0){
_1747=Math.floor(this.dragStartPosition.y/this.parentWidget.rowHeight);
_1749=_1747*this.parentWidget.rowHeight;
_1748=Math.ceil(y/this.parentWidget.rowHeight);
_174a=(_1748*this.parentWidget.rowHeight)-_1749-this.parentWidget.cellPadBorderHeight;
}else{
_1747=Math.floor(y/this.parentWidget.rowHeight);
_1749=_1747*this.parentWidget.rowHeight;
_1748=Math.ceil(this.dragStartPosition.y/this.parentWidget.rowHeight);
_174a=(_1748*this.parentWidget.rowHeight)-_1749-this.parentWidget.cellPadBorderHeight;
}
_174a-=this.parentWidget.cellPadBorderHeight*2;
var _174c=ws.date.formatMinutes(_1747*this.parentWidget.gridInterval,"h:mma","ha");
var _174d=ws.date.formatMinutes(_1748*this.parentWidget.gridInterval,"h:mma","ha");
if(dojo.render.html.ie||dojo.render.html.safari){
this.dragClone.childNodes[0].innerText=_174c;
this.dragClone.childNodes[1].innerText=_174d;
}else{
this.dragClone.childNodes[0].textContent=_174c;
this.dragClone.childNodes[1].textContent=_174d;
}
if(width<0){
width=0;
}
if(_174a<0){
_174a=0;
}
this.dragClone.style.left=_1745+"px";
this.dragClone.style.top=_1749+"px";
this.dragClone.style.width=width+"px";
this.dragClone.style.height=_174a+"px";
},onDragEndImpl:function(e){
switch(e.dragStatus){
case "dropSuccess":
this.dragClone=null;
break;
case "dropFailure":
dojo.html.removeNode(this.dragClone);
this.dragClone=null;
break;
}
}});
dojo.declare("ws.calendar.CalendarDropTarget",dojo.dnd.DropTarget,{onDragOver:function(e){
if(!this.accepts(e.dragObjects)){
return false;
}
this.containingBlockPosition=dojo.html.getAbsolutePosition(this.constrainingContainer,true);
this.containingBlockSize=dojo.html.getContentBox(this.constrainingContainer);
var _1750=dojo.html.getContentBox(this.scrollContainer);
this.viewportRectangle={x:this.containingBlockPosition.x+this.scrollContainer.scrollLeft,y:this.containingBlockPosition.y+this.scrollContainer.scrollTop,width:_1750.width,height:_1750.height,top:this.containingBlockPosition.y+this.scrollContainer.scrollTop,bottom:this.containingBlockPosition.y+this.scrollContainer.scrollTop+_1750.height,minScrollTop:0,maxScrollTop:ws.style.getMarginBoxHeightFast(this.constrainingContainer)-_1750.height};
return true;
},onDragMove:function(e,_1752){
},onDragOut:function(e){
if(this.dropIndicator){
dojo.html.removeNode(this.dropIndicator);
delete this.dropIndicator;
}
this.cancelAutoScroll();
},onDrop:function(e){
this.onDragOut(e);
},cancelAutoScroll:function(){
if(this.autoScrollTimeout!=null){
dojo.lang.clearTimeout(this.autoScrollTimeout);
this.autoScrollTimeout=null;
}
},doAutoScroll:function(_1755){
this.cancelAutoScroll();
var _1756=this.scrollContainer.scrollTop+_1755;
if(_1756<=this.viewportRectangle.minScroll){
this.scrollContainer.scrollTop=minScroll;
return;
}else{
if(_1756>=this.viewportRectangle.maxScroll){
this.scrollContainer.scrollTop=maxScroll;
return;
}else{
this.scrollContainer.scrollTop=_1756;
this.autoScrollTimeout=dojo.lang.setTimeout(this,function(){
this.doAutoScroll(_1755);
},100);
}
}
}},function(node,types,_1759,_175a,_175b){
if(arguments.length==0){
return;
}
this.domNode=dojo.byId(node);
dojo.dnd.DropTarget.call(this);
if(types&&dojo.lang.isString(types)){
types=[types];
}
this.acceptedTypes=types||[];
this.parentWidget=_1759;
this.constrainingContainer=_175a;
this.scrollContainer=_175b;
this.autoScrollEnabled=true;
this.autoScrollTimeout=null;
dojo.dnd.dragManager.registerDropTarget(this);
});
dojo.declare("ws.calendar.GridViewDropTarget",ws.calendar.CalendarDropTarget,{onDragMove:function(e,_175d){
var _175e=_175d[0];
if(_175e==null){
return;
}
var _175f=this.parentWidget.rowHeight;
if(this.autoScrollEnabled){
if(e.pageY<=(this.viewportRectangle.top+_175f)){
this.doAutoScroll(-10);
}else{
if(e.pageY>=(this.viewportRectangle.bottom-_175f)){
this.doAutoScroll(10);
}else{
this.cancelAutoScroll();
}
}
}
if(!this.dropIndicator){
this.dropIndicator=document.createElement("div");
this.dropIndicator.className="dropIndicator";
this.dropIndicator.style.left="0px";
this.dropIndicator.style.top="0px";
this.scrollContainer.appendChild(this.dropIndicator);
var _1760=this.parentWidget.rowHeight-this.parentWidget.cellPadBorderHeight;
ws.style.setMarginBoxHeightFast(this.dropIndicator,_1760);
this.constraints={minX:0,minY:0,maxX:this.containingBlockSize.width,maxY:this.containingBlockSize.height-parseInt(this.dropIndicator.style.height)};
}
var x=e.pageX-this.viewportRectangle.x+this.scrollContainer.scrollLeft;
var y=e.pageY-this.viewportRectangle.y+this.scrollContainer.scrollTop;
if(y>this.constraints.maxY){
y=this.constraints.maxY;
}
var col=0;
var tlw=this.parentWidget.timeLabelWidth;
var _1765=this.parentWidget.cellOffsets;
var i=1;
while(i<_1765.length){
if(x<(tlw+_1765[i])){
break;
}
col++;
i++;
}
var _1767=tlw+_1765[col];
var width=this.parentWidget.cellWidths[col]-this.parentWidget.cellPadBorderWidth;
width-=this.parentWidget.cellPadBorderWidth*2;
var _1769=Math.floor(y/this.parentWidget.rowHeight);
var _176a=_1769*this.parentWidget.rowHeight;
this.dropIndicator.style.left=_1767+"px";
this.dropIndicator.style.top=_176a+"px";
this.dropIndicator.style.width=width+"px";
},onDrop:function(e){
this.onDragOut(e);
var x=e.pageX-this.viewportRectangle.x+this.scrollContainer.scrollLeft;
var y=e.pageY-this.viewportRectangle.y+this.scrollContainer.scrollTop;
if(y>this.constraints.maxY){
y=this.constraints.maxY;
}
var col=0;
var tlw=this.parentWidget.timeLabelWidth;
var _1770=this.parentWidget.cellOffsets;
var i=1;
while(i<_1770.length){
if(x<(tlw+_1770[i])){
break;
}
col++;
i++;
}
var row=Math.floor(y/this.parentWidget.rowHeight);
var _1773=col+(row*this.parentWidget.columns);
var ci=e.dragObject.dragSource.componentInstance;
var model=this.parentWidget.model;
var comp=model.components[ci[model.indexEnum.id]];
var _1777=comp[model.componentEnum.start];
var _1778=comp[model.componentEnum.end];
var _1779=(_1778.getTime()-_1777.getTime())/60000;
var _177a=ws.date.add(this.parentWidget.getFirstDateInView(),ws.date.dateParts.DAY,_1773);
_177a.setHours(_1777.getHours());
_177a.setMinutes(_1777.getMinutes());
var _177b=ws.date.add(_177a,ws.date.dateParts.MINUTE,_1779);
var args=model.getComponentArgs(comp);
args.rid=ci[model.indexEnum.rid];
if(this.parentWidget.widgetType=="UntimedViewWidget"){
args.allDay=true;
}
args.start=ws.date.formatISO8601(_177a);
args.end=ws.date.formatISO8601(_177b);
args.index=true;
model.saveComponent(args);
return true;
}});
dojo.declare("ws.calendar.ColumnViewDropTarget",ws.calendar.CalendarDropTarget,{startDate:null,endDate:null,onDragMove:function(e,_177e){
var _177f=_177e[0];
if(_177f==null){
return;
}
var _1780=this.parentWidget.rowHeight;
if(this.autoScrollEnabled){
if(e.pageY<=(this.viewportRectangle.top+_1780)){
this.doAutoScroll(-_1780);
}else{
if(e.pageY>=(this.viewportRectangle.bottom-_1780)){
this.doAutoScroll(_1780);
}else{
this.cancelAutoScroll();
}
}
}
if(!this.dropIndicator){
var _1781=ws.calendar.CalendarDragAndDrop;
switch(_177f.type){
case _1781.TYPE_UNTIMEDVIEWMOVE:
this.dropIndicator=document.createElement("div");
this.dropIndicator.className="dropIndicator";
this.dropIndicator.style.left=_177f.domNode.style.left;
this.dropIndicator.style.top="0px";
this.dropIndicator.style.width=_177f.domNode.style.width;
this.parentWidget.timedContainer.appendChild(this.dropIndicator);
ws.style.setMarginBoxHeightFast(this.dropIndicator,(this.parentWidget.rowHeight*2)-this.parentWidget.cellPadBorderHeight);
this.constraints={minX:0,minY:0,maxX:ws.style.getContentBoxWidthFast(this.parentWidget.timedGrid)-parseInt(this.dropIndicator.style.width),maxY:ws.style.getContentBoxHeightFast(this.parentWidget.timedGrid)-parseInt(this.dropIndicator.style.height)};
break;
case _1781.TYPE_COLUMNVIEWMOVE:
this.dropIndicator=document.createElement("div");
this.dropIndicator.className="dropIndicator";
this.dropIndicator.style.left=_177f.domNode.style.left;
this.dropIndicator.style.top=_177f.domNode.style.top;
this.dropIndicator.style.width=_177f.domNode.style.width;
this.dropIndicator.style.height=_177f.domNode.style.height;
_177f.scrollContainer.appendChild(this.dropIndicator);
this.constraints={minX:0,minY:0,maxX:this.containingBlockSize.width-parseInt(this.dropIndicator.style.width),maxY:this.containingBlockSize.height-parseInt(this.dropIndicator.style.height)};
break;
}
}
if(!this.dropIndicator){
return;
}
var x=e.pageX-this.viewportRectangle.x+this.scrollContainer.scrollLeft;
var y=e.pageY-this.viewportRectangle.y+this.scrollContainer.scrollTop;
if(y>this.constraints.maxY){
y=this.constraints.maxY;
}
var col=0;
var tlw=this.parentWidget.timeLabelWidth;
var _1786=this.parentWidget.cellOffsets;
var i=1;
while(i<_1786.length){
if(x<(tlw+_1786[i])){
break;
}
col++;
i++;
}
var _1788=tlw+_1786[col];
var width=this.parentWidget.cellWidths[col]-this.parentWidget.cellPadBorderWidth;
width-=this.parentWidget.cellPadBorderWidth*2;
var _178a=Math.floor(y/this.parentWidget.rowHeight);
var _178b=_178a*this.parentWidget.rowHeight;
this.dropIndicator.style.left=_1788+"px";
this.dropIndicator.style.top=_178b+"px";
this.dropIndicator.style.width=width+"px";
},onDrop:function(e){
var x,y,_178f,_1790;
var _1791=ws.calendar.CalendarDragAndDrop;
switch(e.dragObject.type){
case _1791.TYPE_UNTIMEDVIEWMOVE:
case _1791.TYPE_COLUMNVIEWMOVE:
x=parseInt(this.dropIndicator.style.left);
y=parseInt(this.dropIndicator.style.top);
_178f=ws.style.getMarginBoxHeightFast(this.dropIndicator);
break;
default:
x=parseInt(e.dragObject.dragClone.style.left);
y=parseInt(e.dragObject.dragClone.style.top);
_178f=ws.style.getMarginBoxHeightFast(e.dragObject.dragClone);
break;
}
_1790=(Math.ceil((y+_178f)/this.parentWidget.rowHeight)-Math.floor(y/this.parentWidget.rowHeight))*this.parentWidget.gridInterval;
this.onDragOut(e);
var col=0;
var tlw=this.parentWidget.timeLabelWidth;
var _1794=this.parentWidget.cellOffsets;
var i=1;
while(i<_1794.length){
if(x<(tlw+_1794[i])){
break;
}
col++;
i++;
}
var row=Math.floor(y/this.parentWidget.rowHeight);
var _1797=row*this.parentWidget.gridInterval;
var _1798=ws.date.add(this.parentWidget.getFirstDateInView(),ws.date.dateParts.DAY,col);
_1798=ws.date.add(_1798,ws.date.dateParts.MINUTE,_1797);
var _1799=ws.date.add(_1798,ws.date.dateParts.MINUTE,_1790);
if(e.dragObject.type==_1791.TYPE_COLUMNVIEWDIRECTENTRY){
var args=this.parentWidget.model.getDefaultComponentArgs();
args.allDay=false;
args.start=_1798;
args.end=_1799;
var _179b={};
if(this.parentWidget.columns&&this.parentWidget.columns==1){
_179b={"BL":"TL"};
}else{
if((e.dragObject.viewportRectangle.width-(e.dragObject.dragStartPosition.x+dojo.html.getContentBox(e.dragObject.dragClone).width))>(ws.WebSuite.inlineAddEventDialog?(ws.WebSuite.inlineAddEventDialog.width-10):250)){
_179b={"TR":"TL"};
}else{
_179b={"TL":"TR"};
}
}
this.parentWidget.inlineAddEvent(true,args,e.dragObject.dragClone,_179b);
return true;
}
var model=this.parentWidget.model;
var ci=e.dragObject.dragSource.componentInstance;
var args;
if(ci){
var comp=model.components[ci[model.indexEnum.id]];
args=model.getComponentArgs(comp);
args.rid=ci[model.indexEnum.rid];
}else{
args=model.getDefaultComponentArgs();
}
args.allDay=false;
args.start=ws.date.formatISO8601(_1798);
args.end=ws.date.formatISO8601(_1799);
args.index=true;
model.saveComponent(args);
return true;
}});
dojo.declare("ws.calendar.CalendarClickAction",null,{rowHeight:2,dependency:null,row:null,column:null,getConstraints:function(){
var _179f=dojo.html.getContentBox(this.constrainingContainer);
width=_179f.width;
height=_179f.height;
x=dojo.html.getPixelValue(this.constrainingContainer,"padding-left",true)+dojo.html.getBorderExtent(this.constrainingContainer,"left");
y=dojo.html.getPixelValue(this.constrainingContainer,"padding-top",true)+dojo.html.getBorderExtent(this.constrainingContainer,"top");
return {minX:x,minY:y,maxX:x+width,maxY:y+height};
},createClickIndicator:function(){
this.clickIndicator=document.createElement("div");
this.clickIndicator.className="clickIndicator";
this.clickIndicator.style.display="none";
this.scrollContainer.appendChild(this.clickIndicator);
},destroyClickIndicator:function(){
if(this.clickIndicator){
dojo.html.removeNode(this.clickIndicator);
delete this.clickIndicator;
}
},onClick:function(e){
if(ws.WebSuite.inlineAddEventDialog&&ws.WebSuite.inlineAddEventDialog.isShowing()){
ws.WebSuite.inlineAddEventDialog.closeCard();
}
if(this.dependency){
this.dependency.destroyClickIndicator();
}
if(!this.clickIndicator){
this.createClickIndicator();
}else{
this.clickIndicator.style.display="none";
}
this.containingBlockPosition=dojo.html.getAbsolutePosition(this.constrainingContainer,true);
this.constraints=this.getConstraints();
var x=e.pageX-this.containingBlockPosition.x;
var y=e.pageY-this.containingBlockPosition.y;
if(x<this.constraints.minX){
x=this.constraints.minX;
}
if(y<this.constraints.minY){
y=this.constraints.minY;
}
if(x>this.constraints.maxX){
x=this.constraints.maxX;
}
if(y>this.constraints.maxY){
y=this.constraints.maxY;
}
var col=0;
var tlw=this.parentWidget.timeLabelWidth;
var _17a5=this.parentWidget.cellOffsets;
var i=1;
while(i<_17a5.length){
if(x<(tlw+_17a5[i])){
break;
}
col++;
i++;
}
var _17a7=tlw+_17a5[col];
var width=this.parentWidget.cellWidths[col]-this.parentWidget.cellPadBorderWidth;
var _17a9=Math.floor(y/this.parentWidget.rowHeight);
var _17aa=_17a9*this.parentWidget.rowHeight;
var _17ab;
if(this.rowHeight==1){
_17ab=this.parentWidget.rowHeight-this.parentWidget.cellPadBorderHeight;
}else{
_17ab=((_17a9+this.rowHeight)*this.parentWidget.rowHeight)-_17aa-this.parentWidget.cellPadBorderHeight;
if(_17aa+_17ab>this.constraints.maxY){
_17ab=((_17a9+1)*this.parentWidget.rowHeight)-_17aa-this.parentWidget.cellPadBorderHeight;
}
}
this.clickIndicator.style.left=_17a7+"px";
this.clickIndicator.style.top=_17aa+"px";
ws.style.setMarginBoxWidthFast(this.clickIndicator,width);
ws.style.setMarginBoxHeightFast(this.clickIndicator,_17ab);
this.clickIndicator.style.display="block";
this.row=_17a9;
this.column=col;
e.stopPropagation();
}},function(node,_17ad,_17ae,_17af){
if(arguments.length==0){
return;
}
this.domNode=dojo.byId(node);
this.constrainingContainer=_17ae;
this.scrollContainer=_17af;
this.parentWidget=_17ad;
dojo.event.connect(this.domNode,"onclick",this,"onClick");
});
dojo.provide("ws.address.PeoplePicker");
dojo.declare("ws.address.PeoplePickerGridModel",turbo.data.virtual,function(_17b0,model){
this.model=model;
dojo.event.connect(this.model,"modelUpdated",this,"modelUpdated");
},{columns:{NameAndEmail:0},modelUpdated:function(){
},get:function(row,col){
var _17b4=this.model.getRow(row);
if(_17b4==null){
return "Contact Error";
}
switch(col){
case this.columns.NameAndEmail:
var email=(_17b4.bType=="c"||_17b4.bType=="s")?_17b4.composeValue:(_17b4.count==1?Config.Strings.OneAddress:ws.string.substituteParams(Config.Strings.NAddresses,_17b4.count));
return dojo.string.escapeXml(_17b4.name+" ("+email+")");
}
},getRow:function(row){
var _17b7=this.model.getRow(row);
if(_17b7==null){
return ["Contact Error"];
}
var email=(_17b7.bType=="c"||_17b7.bType=="s")?_17b7.composeValue:(_17b7.count==1?Config.Strings.OneAddress:ws.string.substituteParams(Config.Strings.NAddresses,_17b7.count));
var _17b9=dojo.string.escapeXml(_17b7.name+" ("+email+")");
return [_17b9];
},getRowCount:function(){
return this.model.getRowCount();
}});
dojo.widget.defineWidget("ws.address.PeoplePicker",[ws.widget.ListView,dojo.widget.PopupContainerBase],{templateString:"<div class=\"peoplePicker dojoPopupContainer\" style=\"display: none; position: absolute;\">\r\n\t<div class=\"listView\" dojoType=\"dojo:LayoutContainer\" dojoAttachPoint=\"layoutWidget\">\r\n\t\t<div dojoAttachPoint=\"grid\" dojoType=\"TurboDataGrid\" layoutAlign=\"client\" defaultLeftWidth=\"0\"></div>\r\n\t\t<div dojoAttachPoint=\"rolodexPane\" dojoType=\"dojo:ContentPane\" layoutAlign=\"bottom\" class=\"rolodex\"></div>\r\n\t</div>\r\n</div>\r\n",templateCssString:".peoplePicker {\r\n\theight: 250px;\r\n\twidth: 400px;\r\n\tborder: 1px solid #c1c1c1;\r\n\tborder-top: none;\r\n}\r\n\r\n.peoplePicker .turbogrid-scrollbox {\r\n\tborder-top: none;\r\n}\r\n\r\n/* If we're highlighting the selected row, then don't highlight on mouseover */\r\n.peoplePicker .showHighlight .turbogrid-row-over .turbogrid-cell { background-color: transparent !important; }\r\n\r\n.peoplePicker .showHighlight .row-highlight .turbogrid-cell { background-color: #e4edfa !important; }\r\n\r\n.peoplePicker .rolodex {\r\n\tborder-top: 1px solid #c1c1c1;\r\n\tpadding: 5px;\r\n\tbackground-color: #FFF;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("../ws/address/PeoplePicker.css"),isContainer:false,wrapperModelClass:ws.address.PeoplePickerGridModel,speedUp:true,highlightRow:0,initView:function(){
this.columns=[[turbo.grid.format.text,{caption:"Name",align:"left",width:75}]];
this.autosizeColumnIndex=this.gridModel.columns.NameAndEmail;
dojo.html.hide(this.grid.headerNode);
ws.address.PeoplePicker.superclass.initView.apply(this,arguments);
dojo.event.connect(ws.WebSuite,"processKeyPress",this,"onKeyPress");
},showHighlight:function(show){
ws.html.toggleClass(this.grid.domNode,"showHighlight",show);
},handleCellClick:function(e){
var _17bc=this.model.getRow(e.rowIndex);
if(!_17bc){
return;
}
this.onContactSelected(_17bc);
},onContactSelected:function(_17bd){
},searchAndOpen:function(s,x,y,_17c1,_17c2,_17c3,_17c4){
this.highlightRow=0;
this.grid.lastOverCell=null;
this.model.search(s);
if(this.model.getRowCount()==0){
this.close();
}else{
if(!this.isShowingNow){
this.showRolodex(dojo.string.isBlank(s));
this.open(x,y,_17c1,_17c2,_17c3,_17c4);
this.scrollToRow(0);
}
}
},showRolodex:function(show){
ws.widget.setShowing(this.rolodexPane,show);
if(!show){
return;
}
if(!this.rolodexBuilt){
this.rolodexLetters=[];
for(var i=0;i<ws.string.alphabet.length;i++){
var span=document.createElement("span");
var _17c8=ws.string.alphabet.charAt(i);
span.innerHTML=_17c8.toUpperCase();
span.className="wsLink";
this.rolodexPane.domNode.appendChild(span);
this.rolodexPane.domNode.appendChild(document.createTextNode(" "));
dojo.event.browser.addListener(span,"onclick",ws.lang.hitch(this,"scrollToLetter",_17c8));
this.rolodexLetters.push(span);
}
this.rolodexBuilt=true;
}
for(var i=0;i<ws.string.alphabet.length;i++){
ws.html.toggleClass(this.rolodexLetters[i],"wsLinkDisabled",this.model.getRolodex()[i]==-1);
}
},scrollToLetter:function(_17c9){
var idx=ws.string.alphabet.indexOf(_17c9.toLowerCase());
var row=this.model.getRolodex()[idx];
if(row!=-1){
this.scrollToRow(row);
}
},processKeyDown:function(e){
if(!this.isShowingNow){
return false;
}
var _17cd=true;
switch(e.keyCode){
case e.KEY_TAB:
case e.KEY_ENTER:
var _17ce=this.model.getRow(this.highlightRow);
this.onContactSelected(_17ce);
break;
case e.KEY_DOWN_ARROW:
this.setHighlightRow(this.highlightRow+1,true);
break;
case e.KEY_UP_ARROW:
this.setHighlightRow(this.highlightRow-1,false);
break;
case e.KEY_ESCAPE:
this.close();
break;
default:
_17cd=false;
break;
}
if(_17cd){
e.preventDefault();
}
return _17cd;
},setHighlightRow:function(row,_17d0){
if(row<0){
row=0;
}else{
if(row>=this.model.getRowCount()){
row=this.model.getRowCount()-1;
}
}
this.highlightRow=row;
var cell=this.grid.getCellNode(this.highlightRow,0);
if(cell){
var _17d2=false;
if(_17d0){
var _17d3=Math.floor(((this.grid.scrollboxNode.scrollTop+this.grid.scroller.windowHeight)/this.grid.defaultRowHeight)-1);
if(this.highlightRow>_17d3){
_17d2=true;
}
}else{
var _17d3=Math.floor((this.grid.scrollboxNode.scrollTop/this.grid.defaultRowHeight)+1);
if(this.highlightRow<_17d3){
_17d2=true;
}
}
if(_17d2){
var _17d4=_17d0?this.grid.scrollboxNode.scrollTop+this.grid.defaultRowHeight:this.grid.scrollboxNode.scrollTop-this.grid.defaultRowHeight;
this.scrollOnKeyPress(_17d4);
}
}
this.model.modelUpdated();
},getRowClasses:function(_17d5){
var cls=ws.address.PeoplePicker.superclass.getRowClasses.apply(this,arguments);
if(_17d5==this.highlightRow){
cls.push("row-highlight");
}
return cls;
},getHighlightedContact:function(){
if(this.model.getRowCount()>0){
return this.model.getRow(0);
}else{
return null;
}
},onKeyPress:function(evt){
if(this.isShowing()){
this._onKeyPress(evt);
}
},onEnterKeyPress:function(){
if(this.grid.lastOverCell){
var _17d8=this.model.getRow(this.grid.over.row);
this.onContactSelected(_17d8);
}
},onOtherKeyPress:function(evt){
if(Config.EnableKeyboardShortcuts&&evt.key){
switch(evt.key){
case evt.KEY_ESCAPE:
this.close();
break;
}
}
},show:function(){
ws.address.PeoplePicker.superclass.show.apply(this,arguments);
this.layout();
}});
if(ws.address.PeoplePicker.prototype.templateString==dojo.widget.PopupContainerBase.prototype.templateString){
ws.address.PeoplePicker.prototype.templateString=null;
}
dojo.provide("ws.address.AddressField");
dojo.widget.defineWidget("ws.address.AddressField",dojo.widget.HtmlWidget,{templateString:"\t<textarea dojoAttachPoint='field' dojoAttachEvent='onKeyDown; onKeyPress; onFocus; onBlur' tabindex='${this.tabindex}' class='wsInput' style='float: left; height: 1.24em; overflow-x: hidden; overflow-y: auto; width: ${this.textareaWidth}; font-family: Arial, Helvetica, sans-serif; font-size: 12px; padding: 1px 2px;'></textarea>",_wordSeparators:";,",_pickerActive:false,_pickerMode:"explicit",tabindex:500,minHeight:18,maxHeight:45,textareaWidth:"90%",postCreate:function(args,frag){
ws.address.AddressField.superclass.postCreate.apply(this,arguments);
this.selectedContacts=[];
this.createPeoplePicker();
dojo.event.connect(this.peoplePicker,"onContactSelected",this,"onContactSelected");
dojo.event.connect("after",this.peoplePicker,"close",dojo.lang.hitch(this,function(){
this._pickerActive=false;
}));
},createPeoplePicker:function(){
if(this.peoplePicker){
return;
}
ws.address.AddressField.prototype.peoplePicker=dojo.widget.createWidget("ws:PeoplePicker");
this.peoplePicker.setModel(new ws.address.AllAddressModel());
},togglePeoplePicker:function(btn){
if(this._pickerActive){
this.peoplePicker.close();
}else{
this.peoplePicker.showHighlight(false);
var moz=dojo.render.html.moz;
var x=dojo.html.getAbsolutePosition(this.field).x;
var y=dojo.html.getAbsolutePosition(this.field).y+(moz?this.field.scrollTop:0)+dojo.html.getMarginBox(this.field).height;
this.peoplePicker.searchAndOpen("",x,y,this,btn);
this._pickerActive=true;
this._pickerMode="explicit";
}
},getValue:function(){
return this.field.value;
},setValue:function(val){
this.selectedContacts=[];
if(val&&(typeof (val)=="string")){
val=val.replace(/\s+$/,"");
}
if(dojo.string.isBlank(val)){
this.field.value="";
}else{
if(!((val.charAt(val.length-1)==";")||(val.charAt(val.length-1)==","))){
this.field.value=val+this._wordSeparators.substring(1,2)+" ";
}else{
this.field.value=val+" ";
}
}
this.resizeSelf();
},onFocus:function(){
dojo.event.topic.publish("AddressFieldFocusChange",this);
},onBlur:function(){
dojo.event.topic.publish("AddressFieldBlurChange",this);
},onKeyDown:function(e){
if(this._pickerActive){
this._keyHandled=this.peoplePicker.processKeyDown(e);
}else{
this._keyHandled=false;
}
if(dojo.render.html.ie&&e.keyCode==e.KEY_BACKSPACE){
this.onKeyPress(e);
}
},onKeyPress:function(e){
e.stopPropagation();
if(this._keyHandled){
return;
}
if(e.keyCode==e.KEY_ENTER){
e.preventDefault();
e.stopPropagation();
return;
}
if(this.keypressTimeout){
dojo.lang.clearTimeout(this.keypressTimeout);
}
this.keypressTimeout=dojo.lang.setTimeout(this,"_onKeyPress",100,e);
if(this.resizeTimeout){
dojo.lang.clearTimeout(this.resizeTimeout);
}
this.resizeTimeout=dojo.lang.setTimeout(this,"resizeSelf",150);
},_onKeyPress:function(e){
var _17e4=this.matchText();
if(dojo.string.isBlank(_17e4)){
if(this._pickerActive){
this.peoplePicker.close();
}
}else{
if(this.field.value!=this._lastValue){
this._pickerActive=true;
this._pickerMode="autocomplete";
this.peoplePicker.showHighlight(true);
var moz=dojo.render.html.moz;
var x=dojo.html.getAbsolutePosition(this.field).x;
var y=dojo.html.getAbsolutePosition(this.field).y+(moz?this.field.scrollTop:0)+dojo.html.getMarginBox(this.field).height;
this.peoplePicker.searchAndOpen(_17e4,x,y,null,[]);
}
}
this._lastValue=this.field.value;
},matchText:function(){
var _17e8=this.field.value;
var _17e9=(this._lastValue?this._lastValue:"");
var _17ea=this._wordSeparators;
var diff=-1;
if(_17e8==_17e9){
return this._matchValue;
}
var _17ec=(_17e8.length>_17e9.length)?_17e9.length:_17e8.length;
for(i=0;i<_17ec;++i){
if(_17e8.charAt(i)!=_17e9.charAt(i)){
diff=i;
break;
}
}
if(diff<0){
diff=_17e8.length-1;
}
var start=diff;
while((start>0)&&(_17ea.indexOf(_17e8.charAt(start))<0)){
--start;
}
var end=diff;
while((end<_17e8.length)&&(_17ea.indexOf(_17e8.charAt(end))<0)){
end++;
}
var _17ef=_17e8.substring(start,end);
while((_17ef.length>0)&&((_17ea.indexOf(_17ef.charAt(0))>=0)||(_17ef.charAt(0)==" "))){
_17ef=_17ef.substring(1);
++start;
}
this._matchValue=_17ef.toLowerCase();
this._matchStart=start;
this._matchEnd=end;
return _17ef;
},onContactSelected:function(_17f0){
if(!this._pickerActive){
return;
}
if(!_17f0){
return;
}
this.selectedContacts.push(_17f0);
var email=_17f0.composeValue;
if(dojo.string.isBlank(email)){
return;
}
if(this._pickerMode=="autocomplete"){
this.matchText();
if(this._matchEnd==this.field.value.length){
email+=this._wordSeparators.substring(1,2)+" ";
}
if((this._matchStart>=0)&&(this._matchEnd>=0)){
this.field.value=this.field.value.substring(0,this._matchStart)+email+this.field.value.substring(this._matchEnd);
}
this.setInsertionPoint(-1);
this.clearMatch();
this.peoplePicker.close();
}else{
var _17f2=this.field.value;
_17f2=_17f2.replace(/^\s+/,"");
_17f2=_17f2.replace(/\s+$/,"");
this.field.value=_17f2;
if(dojo.string.isBlank(_17f2)){
this.field.value=_17f0.composeValue+this._wordSeparators.substring(1,2)+" ";
}else{
if((_17f2.charAt(_17f2.length-1)==";")||(_17f2.charAt(_17f2.length-1)==",")){
this.field.value+=" "+_17f0.composeValue+this._wordSeparators.substring(1,2)+" ";
}else{
this.field.value+=this._wordSeparators.substring(1,2)+" "+_17f0.composeValue+this._wordSeparators.substring(1,2)+" ";
}
}
this.scrollToEnd();
}
this.resizeSelf();
},setInsertionPoint:function(_17f3){
this.setSelectionRange(_17f3,_17f3);
if(_17f3<0){
this.scrollToEnd();
}
},setSelectionRange:function(_17f4,_17f5){
if((_17f4<0)||(_17f4>this.field.value.length)){
_17f4=this.field.value.length;
}
if((_17f5<0)||(_17f5>this.field.value.length)){
_17f5=this.field.value.length;
}
if(_17f5<_17f4){
_17f5=_17f4;
}
if(this.field.setSelectionRange){
this.field.setSelectionRange(_17f4,_17f5);
}else{
if(this.field.createTextRange){
var range=this.field.createTextRange();
range.collapse(true);
range.moveEnd("character",_17f5);
range.moveStart("character",_17f4);
range.select();
}else{
}
}
},clearMatch:function(){
this._matchValue="";
this._matchStart=-1;
this._matchEnd=-1;
this._insertionPoint=-1;
this._lastValue=this.value;
},focus:function(){
this.field.focus();
},resizeSelf:function(){
this.createMeasureNode();
this.measureNode.innerHTML=this.field.value.replace(/\n/g,"<br>");
dojo.html.setContentBox(this.measureNode,{width:dojo.html.getContentBox(this.field).width});
var _17f7=Math.min(this.maxHeight,Math.max(this.minHeight,dojo.html.getContentBox(this.measureNode).height));
dojo.html.setContentBox(this.field,{height:_17f7});
if(this._pickerActive){
var moz=dojo.render.html.moz;
var x=dojo.html.getAbsolutePosition(this.field).x;
var y=dojo.html.getAbsolutePosition(this.field).y+(moz?this.field.scrollTop:0)+dojo.html.getMarginBox(this.field).height;
this.peoplePicker.move(x,y);
}
this.onResizedSelf();
},createMeasureNode:function(){
if(this.measureNode){
return;
}
this.measureNode=document.createElement("div");
this.measureNode.style.position="absolute";
this.measureNode.style.visibility="hidden";
this.measureNode.style.top="-10000px";
this.measureNode.style.left="10000px";
this.measureNode.style.fontFace="Arial, Helvetica, sans-serif";
this.measureNode.style.fontSize="12px";
dojo.body().appendChild(this.measureNode);
},onResizedSelf:function(){
},scrollToEnd:function(){
this.field.scrollTop=10000;
}});
dojo.provide("ws.calendar.EditCalendar");
dojo.widget.defineWidget("ws.calendar.EditCalendar",dojo.widget.HtmlWidget,{widgetsInTemplate:true,templateString:"<div class=\"editCalendar\">\r\n\t<div dojoAttachPoint=\"toolbar\" display=\"none\" layoutAlign=\"top\" dojoType=\"ws:WSToolbar\">\r\n\t\t<div toolbarPosition=\"left\" dojoType=\"ws:WSButton\" border=\"right\" dojoAttachEvent=\"onClick: onUpdateCalendar\" dojoAttachPoint=\"updateCalendar\">${Save}</div>\r\n\t\t<div toolbarPosition=\"left\" dojoType=\"ws:WSButton\" border=\"right\" dojoAttachEvent=\"onClick: onDeleteCalendar\" dojoAttachPoint=\"deleteCalendar\">${Delete}</div>\r\n\t\t<div toolbarPosition=\"left\" dojoType=\"ws:WSButton\" border=\"right\" dojoAttachEvent=\"onClick: backToCalendarView\" dojoAttachPoint=\"cancel\">${Cancel}</div>\r\n\t</div>\r\n\t<div class=\"editCalendarDiv\" dojoAttachPoint=\"content\" style=\"padding-top:12px; overflow-y:auto; position: absolute\">\r\n\t<table dojoAttachPoint=\"editCalendarTable\" border=0 cellpadding=0 cellspacing=0 width=\"100%\">\r\n\t<tr>\r\n\t<td\tdojoAttachPoint=\"leftBlock\" VALIGN=\"top\" class=\"addCalLeftBlock\">\r\n\t\t\t<div class=\"inputData\">\r\n\t\t\t\t<h3 dojoAttachPoint=\"personalCalendarHeader\" class=\"title\">${PersonalCalendarHeader}</h3>\r\n\t\t\t\t<table border=\"0\" cellpadding=\"1\" cellspacing=\"5\">\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td colspan=\"2\">\r\n\t\t\t\t\t\t<div dojoAttachPoint=\"errorCalendarName\" class=\"error\"></div>\r\n\t\t\t\t\t\t<input class=\"calendarNameInput defaultInputColor\" dojoAttachPoint=\"calendarName\" value=\"${EnterCalendarName}\" dojoAttachEvent=\"onFocus: onCalendarNameFocus; onBlur: onCalendarNameBlur; onKeyPress: onCalendarNameKeyPress; onMouseDown: onCalendarNameMouseDown;\"/>\r\n\t\t\t\t\t\t<div class=\"calendarName\" style=\"display:none\" dojoAttachPoint=\"readOnlyCalendarName\"></div>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td colspan=\"2\">\r\n\t\t\t\t\t\t<div style=\"display:none; white-space:nowrap;\" dojoAttachPoint=\"accessLevel\">\r\n\t\t\t\t\t\t\t<span class=\"labelHeading\">${Cal_EditCalendar_AccessLevel}:</span>\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<span class=\"accessLevelValue\" dojoAttachPoint=\"accessLevelValue\"></span>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t<!--\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t<div dojoType=\"ws:AddressField\" dojoAttachPoint=\"toField\"></div>\r\n\t\t\t\t\t</tr>\r\n\t\t\t-->\r\n\t\t\t\t\t<tr height=6></tr>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td width=230 style='padding-left:0px;'>\r\n\t\t\t\t\t\t\t<ul dojoType=\"ws:WSSelect\" dojoAttachPoint=\"colorSelector\">\r\n\t\t\t\t\t\t\t\t<li value=\"Green\"><span><span id=\"Green\" style=\"background-color:#0F9804\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;${CalColGreen}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>\r\n\t\t\t\t\t\t\t\t<li value=\"Blue\"><span><span id=\"Blue\" style=\"background-color:#2563D3\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;${CalColBlue}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>\r\n\t\t\t\t\t\t\t\t<li value=\"Red\"><span><span id=\"Red\" style=\"background-color:#E02828\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;${CalColRed}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>\r\n\t\t\t\t\t\t\t\t<li value=\"Orange\"><span><span id=\"Orange\" style=\"background-color:#F07E04\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;${CalColOrange}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>\r\n\t\t\t\t\t\t\t\t<li value=\"Yellow\"><span><span id=\"Yellow\" style=\"background-color:#E5B409\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;${CalColYellow}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>\r\n\t\t\t\t\t\t\t\t<li value=\"Violet\"><span><span id=\"Violet\" style=\"background-color:#BC05BC\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;${CalColViolet}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>\r\n\t\t\t\t\t\t\t\t<li value=\"Teal\"><span><span id=\"Teal\" style=\"background-color:#08B476\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;${CalColTeal}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>\r\n\t\t\t\t\t\t\t\t<li value=\"Brown\"><span><span id=\"Brown\" style=\"background-color:#61301E\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;${CalColBrown}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<li value=\"Gray\"><span><span id=\"Gray\" style=\"background-color:#6D6560\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;${CalColGray}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>\r\n\t\t\t\t\t\t\t\t<li value=\"Chartreuse\"><span><span id=\"Chartreuse\" style=\"background-color:#B0CC2A\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;${CalColChartreuse}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>\r\n\t\t\t\t\t\t\t\t<li value=\"Black\"><span><span id=\"Black\" style=\"background-color:#000000\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;${CalColBlack}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<li value=\"Pink\"><span><span id=\"Pink\" style=\"background-color:#FD487F\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;${CalColPink}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>\r\n\t\t\t\t\t\t\t<!--\r\n\t\t\t\t\t\t\t\t<li value=\"Blue\"><span><span id=\"Blue\" style=\"background-color:#0360EB\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;${Blue}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>\r\n\t\t\t\t\t\t\t\t<li value=\"Orange\"><span><span id=\"Orange\" style=\"background-color:#E76808\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;${Orange}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>\r\n\t\t\t\t\t\t\t\t<li value=\"Red\"><span><span id=\"Red\" style=\"background-color:#CC0000\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;${Red}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>\r\n\t\t\t\t\t\t\t\t<li value=\"Green\"><span><span id=\"Green\" style=\"background-color:#009712\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;${Green}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>\r\n\t\t\t\t\t\t\t\t<li value=\"Purple\"><span><span id=\"Purple\" style=\"background-color:#6600FF\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;${Purple}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>\r\n\t\t\t\t\t\t\t\t<li value=\"LightBlue\"><span><span id=\"LightBlue\" style=\"background-color:#0088FF\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;${LightBlue}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>\r\n\t\t\t\t\t\t\t\t<li value=\"Magenta\"><span><span id=\"Magenta\" style=\"background-color:#800080\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;${Magenta}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>\r\n\t\t\t\t\t\t\t\t<li value=\"Aquamarine\"><span><span id=\"Aquamarine\" style=\"background-color:#008080\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;${Aquamarine}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>\r\n\t\t\t\t\t\t\t\t<li value=\"Pink\"><span><span id=\"Pink\" style=\"background-color:#FF0080\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;${Pink}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>\r\n\t\t\t\t\t\t\t\t<li value=\"Yellow\"><span><span id=\"Yellow\" style=\"background-color:#808000\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;${Yellow}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>\r\n\t\t\t\t\t\t\t\t<li value=\"DarkPurple\"><span><span id=\"DarkPurple\" style=\"background-color:#646496\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;${DarkPurple}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>\r\n\t\t\t\t\t\t\t\t<li value=\"Grey\"><span><span id=\"Grey\" style=\"background-color:#6C6C6C\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;${Grey}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>\r\n\t\t\t\t\t\t\t-->\r\n\t\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t<td width=150>\r\n\t\t\t\t\t\t\t<div dojoAttachPoint=\"sampleAllDayEvent\" style=\"color:White; width:110px;\">&nbsp;&nbsp;${ExampleAllDayEvent}</div>\r\n\t\t\t\t\t\t\t<span dojoAttachPoint=\"sampleTimedEvent\" style=\"\">${ExampleTimedEvent}</span>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr height=6></tr>\r\n\t\t\t\t\t<tr dojoAttachPoint=\"shareCalendarRow\">\r\n\t\t\t\t\t\t<td colspan=\"2\">\r\n\t\t\t\t\t\t\t<div class=\"labelHeading\">${ShareMyCalenadrWith}</div>\r\n\t\t\t\t\t\t\t<div dojoAttachPoint=\"errorScreenName\" class=\"error\"></div>\r\n\t\t\t\t\t\t\t<div class=\"addScreenName\">\r\n\t\t\t\t\t\t\t\t<input class=\"screenNameInput defaultInputColor\" dojoAttachPoint=\"screenName\" value=\"${EnterScreenName}\" dojoAttachEvent=\"onFocus: onScreenNameFocus; onBlur: onScreenNameBlur; onKeyPress: onScreenNameKeyPress;\"/>\r\n\t\t\t\t\t\t\t\t<div dojoAttachEvent=\"onClick: onAddScreenName;\"><img src=\"${spacer}\" class=\"addImageDefault\" dojoAttachPoint=\"addImage\"></div>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t<tr dojoAttachPoint=\"screenNameRow\">\r\n\t\t\t\t\t\t<td colspan=\"2\">\r\n\t\t\t\t\t\t\t<table dojoAttachPoint=\"screenNameTable\" border=0 cellpadding=0 cellspacing=0>\r\n\t\t\t\t\t\t\t<thead dojoAttachPoint=\"screenNameTableHead\" style=\"display:none\">\r\n\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td class=\"labelHeading\" style=\"padding-left:8px\" colSpan=\"3\">${CalShareName}</td>\r\n\t\t\t\t\t\t\t\t<td ><b style=\"padding-left:5px\">${CalSharePermission}</b></td>\r\n\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t</thead>\r\n\t\t\t\t\t\t\t<tbody dojoAttachPoint=\"screenNameTableBody\">\r\n\t\t\t\t\t\t\t</tbody>\r\n\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t</td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t</table>\r\n\t\t\t</div>\t\t\r\n\t</td>\r\n\t<td\twidth=10>\t\r\n\t</td>\r\n\t<td VALIGN=\"top\" dojoAttachPoint=\"rightBlock\" class=\"rightBlock\">\t\r\n\t\t<h3 class=\"title\">${PublishedCalendarHeader}</h3>\r\n\t\t${PublishedCalendarText}<br />\r\n\t\t<ul>\r\n\t\t\t<li>${PublishedCalendarItem1}</li>\r\n\t\t\t<li>${PublishedCalendarItem2}</li>\r\n\t\t\t<li>${PublishedCalendarItem3}</li>\r\n\t\t\t<li>${PublishedCalendarItem4}</li>\r\n\t\t</ul>\r\n\t\t<div dojoType=\"ws:WSButton\" vizType=\"Blue\" className=\"button\" dojoAttachEvent=\"onClick: onBrowserCalendars\">${BrowseCalendars}&nbsp;&nbsp;&nbsp;</div>\r\n\t</td>\r\n\t<td\twidth=10>\t\r\n\t</table>\r\n\t</div>\t\r\n</div>\r\n",templateCssString:"﻿.editCalendar\r\n{\r\n\tbackground: #ffff;\r\n}\r\n\r\n.editCalendar input {\r\n\tfont: normal 11px verdana;\r\n\tvertical-align: middle;\r\n\tborder: solid 1px #85817c;\r\n\tpadding: 2px 2px 2px 2px;\r\n\tmargin: 3px;\r\n}\r\n\r\n.editCalendar .wsToolbar .wsButton .content \r\n{\r\n\tpadding: 6px;\r\n}\r\n\r\n.editCalendar .editCalendarDiv\r\n{\r\n\tpadding-left: 15px;\r\n}\r\n\r\n.editCalendar .title\r\n{\r\n\tfont: bold 18px Arial;\r\n\tmargin: 5px 5px 10px 5px;\r\n}\r\n\r\n.editCalendar .addCalLeftBlock {\r\n\tpadding-left: 10px;\r\n\tpadding-right: 10px;\r\n\twidth:370px;\r\n}\r\n\r\n.editCalendar .editCalLeftBlock {\r\n\twidth:100%;\r\n}\r\n\r\n.editCalendar .rightBlock {\r\n\twidth:240px;\r\n\ttext-align: left;\r\n\tpadding-left: 10px;\r\n\tpadding-right: 10px;\r\n\tpadding-bottom: 10px;\r\n\tvertical-align:top;\r\n\tbackground:#EEEEEE;\r\n}\r\n\r\n.editCalendar .inputData\r\n{\r\n\tpadding-top: 0px;\r\n\tpadding-bottom: 4px;\r\n}\r\n\r\n\r\n.editCalendar .addScreenName\r\n{\r\n\tmargin-top: 5px;\r\n\tposition: relative;\r\n\tvertical-align: middle;\r\n}\r\n\r\n.editCalendar .addScreenName .addImageDefault\r\n{\r\n\tposition: absolute;\r\n\tleft: 260px;\t\r\n\ttop: -5px;\r\n\tbackground-repeat: no-repeat;\r\n\tcursor: pointer;\r\n\twidth: 18px;\r\n\theight: 18px;\r\n\tbackground: url(\"${images}main.gif\") -1235px -0px;\r\n\tmargin: 6px 0px 0px 7px;\r\n}\r\n\r\n.editCalendar .addScreenName .addImageEnabled\r\n{\r\n\tposition: absolute;\r\n\tleft: 260px;\t\r\n\ttop: -5px;\r\n\tbackground-repeat: no-repeat;\r\n\tcursor: pointer;\r\n\twidth: 18px;\r\n\theight: 18px;\r\n\tbackground: url(\"${images}main.gif\") -1189px -0px;\r\n\tmargin: 6px 0px 0px 7px;\r\n}\r\n\r\n.editCalendar .addScreenName .addImageEnabled:hover\r\n{\r\n\tbackground-position: -1212px -0px;\r\n}\r\n\r\n\r\n.editCalendar .inputData input.calendarNameInput\r\n{\r\n\twidth: 250px;\r\n\tborder: 1px solid #85817c;\r\n\tfont-size: 16px;\r\n}\r\n\r\n.editCalendar .calendarName\r\n{\r\n\tfont-size: 16px;\r\n}\r\n\r\n.editCalendar .accessLevelValue\r\n{\r\n\tpadding-left: 5px;\r\n}\r\n\r\n.editCalendar .inputData input.screenNameInput\r\n{\r\n\twidth: 250px;\r\n\tborder: 1px solid #85817c;\r\n}\r\n\r\n.editCalendar .inputData input.defaultInputColor \r\n{\r\n\tcolor: #A5A5A5;\r\n}\r\n\r\n.editCalendar .inputData .hoverControl { width: 14px; height: 14px; background-image: url(\"${images}main.gif\"); }\r\n.editCalendar .inputData .deleteHover { background-position: -1394px -0px; float: left; }\r\n.editCalendar .inputData .deleteHover:hover { background-position: -1409px -0px; }\r\n\r\n.editCalendar .screenNameRowHover { background-color:#e4edfa;}\r\n\r\n\r\n.editCalendar .error\r\n{\r\n\tfont: bold 12px Arial;\r\n\tcolor: #FF0000;\r\n}\r\n\r\n.editCalendar .wsSelect \r\n{\r\n\tborder: 1px solid #85817c;\r\n\tmargin-left: 1px;\r\n}\r\n\r\n.editCalendar .labelHeading\r\n{\r\n\tfont-weight:bold;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("../ws/calendar/EditCalendar.css"),calId:null,editCalendar:false,colorMap:{Green:["#0F9804","#009712"],Blue:["#2563D3","#0360EB"],Red:["#E02828","#CC0000"],Orange:["#F07E04","#E76808"],Yellow:["#E5B409","#808000"],Violet:["#BC05BC","#6600FF"],Teal:["#08B476","#008080"],Brown:["#61301E","#800080"],Gray:["#6D6560","#6C6C6C"],Chartreuse:["#B0CC2A","#0088FF"],Black:["#000000","#646496"],Pink:["#FD487F","#FF0080"],"#009712":["#0F9804",0],"#0360EB":["#2563D3",1],"#CC0000":["#E02828",2],"#E76808":["#F07E04",3],"#808000":["#E5B409",4],"#6600FF":["#BC05BC",5],"#008080":["#08B476",6],"#800080":["#61301E",7],"#6C6C6C":["#6D6560",8],"#0088FF":["#B0CC2A",9],"#646496":["#000000",10],"#FF0080":["#FD487F",11]},ScreenNameRegexp:new RegExp("^[a-zA-Z]{1}[a-zA-Z\\d]{2,15}$"),InvalidCalendarNameCharMap:{"|":true,"~":true,"^":true,":":true},currentScreenName:null,sharingMap:null,addressModel:null,onResized:function(){
var wH=ws.style.getMarginBoxHeightFast(this.domNode);
var tH;
tH=25;
this.content.style.height=(wH-tH-22)+"px";
},postCreate:function(args,frag){
this.colorSelector.valueChanged=ws.lang.hitch(this,"onColorSelected");
if(this.editCalendar){
dojo.html.hide(this.rightBlock);
dojo.html.addClass(this.leftBlock,"editCalLeftBlock");
this.personalCalendarHeader.innerHTML=Config.Strings.EditCalendarHeader;
}else{
if(!Config.EnableCalendarDirectoryURL||!Config.EventDirectoryURL){
dojo.html.hide(this.rightBlock);
}
}
this.toolbar.show();
this.currentScreenName=this.normalizedScreenName(ws.io.getObjectCookie("csts").ausn);
this.sharingMap=new Object();
this.addressModel=new ws.address.AddressModel();
},setCalId:function(calId){
this.calId=calId;
},getCalId:function(calId){
return this.calId;
},initEditCalendar:function(){
this.reset();
if(this.editCalendar){
var _1801=this.model.calendarEnum;
var _1802=this.model.calendars;
if(_1802&&_1801){
var _1803=_1802[this.calId];
this.calendarName.value=_1803[_1801.displayName];
this.readOnlyCalendarName.innerHTML=this.calendarName.value;
this.calendarName._origValue=this.calendarName.value;
dojo.html.removeClass(this.calendarName,"defaultInputColor");
var _1804=this.colorMap[_1803[_1801.color]];
var _1805=0;
if(_1804){
_1805=_1804[1];
}
this.colorSelector.setOption(_1805);
this.onColorSelected(true);
var _1806=_1803[_1801.calType];
var _1807=_1803[_1801.displayName];
var _1808=_1803[_1801.writable];
var _1809=_1803[_1801.compType];
if(_1806==0){
this.deleteCalendar.hide();
}else{
this.deleteCalendar.show();
}
dojo.html.show(this.accessLevel);
ws.html.setInnerText(this.accessLevelValue,(_1808)?Config.Strings.Cal_EditCalendar_AccessLevel_ReadWrite:Config.Strings.Cal_EditCalendar_AccessLevel_ReadOnly);
if(_1806==2){
dojo.html.hide(this.shareCalendarRow);
dojo.html.hide(this.screenNameRow);
dojo.html.hide(this.calendarName);
dojo.html.show(this.readOnlyCalendarName);
}else{
dojo.html.show(this.calendarName);
dojo.html.hide(this.readOnlyCalendarName);
if(Config.EnableCalendarSharingTab){
dojo.html.show(this.shareCalendarRow);
dojo.html.show(this.screenNameRow);
this.calendarName.disabled=false;
this.calendarName.select();
var _180a=_1803[_1801.readOnlyList];
var _180b=null;
var sMap=new Object();
if(!dojo.string.isBlank(_180a)){
_180b=_180a.split(",");
for(var i=0;i<_180b.length;i++){
var sn=_180b[i];
if(dojo.string.isBlank(sn)){
continue;
}
var nSn=this.normalizedScreenName(sn);
var sts=new SharingMapState(sn,nSn,false);
sMap[nSn]=sts;
}
}
var _1811=_1803[_1801.readWriteList];
var _1812=null;
if(!dojo.string.isBlank(_1811)){
_1812=_1811.split(",");
for(var i=0;i<_1812.length;i++){
var sn=_1812[i];
if(dojo.string.isBlank(sn)){
continue;
}
var nSn=this.normalizedScreenName(sn);
var sts=new SharingMapState(sn,nSn,true);
sMap[nSn]=sts;
}
}
var _1813=new Array();
for(var csn in sMap){
_1813[_1813.length]=csn;
}
_1813.sort();
for(var i=0;i<_1813.length;i++){
var sts=sMap[_1813[i]];
this.addScreenNameRow(sts.nScreenName,sts.hasWriteAccess);
this.sharingMap[sts.nScreenName]=sts;
}
}else{
dojo.html.hide(this.shareCalendarRow);
dojo.html.hide(this.screenNameRow);
}
}
}
}
},onShow:function(){
if(this.editCalendar){
this.initEditCalendar();
ws.reporting.report("Edit Calendar","Calendar");
}else{
this.calId=null;
var col=this.getSelectedColor();
this.sampleAllDayEvent.style.backgroundColor=col;
this.sampleTimedEvent.style.color=col;
this.deleteCalendar.hide();
dojo.html.hide(this.accessLevel);
if(!Config.EnableCalendarSharingTab){
dojo.html.hide(this.shareCalendarRow);
dojo.html.hide(this.screenNameRow);
}
this.reset();
dojo.html.addClass(this.calendarName,"selectInputColor");
this.calendarName.select();
ws.reporting.report("Add Calendar","Calendar");
}
this.onResized();
},reset:function(){
if(!this.editCalendar){
this.calendarName.value=Config.Strings.EnterCalendarName;
dojo.html.addClass(this.calendarName,"defaultInputColor");
}
this.screenName.value=Config.Strings.EnterScreenName;
dojo.html.addClass(this.screenName,"defaultInputColor");
this.changeButtonState(false);
this.deleteAllScreenNameRows();
this.showErrorCalendarName(false);
this.showErrorScreenName(false);
},getCalendarList:function(){
this.model.getData();
},setModel:function(model){
this.model=model;
if(!this.model.calendars){
this.getCalendarList();
}
},changeButtonState:function(_1817){
if(_1817){
this.updateCalendar.enable();
}else{
if(!_1817){
this.updateCalendar.disable();
}
}
this.dirty=_1817;
},onColorSelected:function(_1818){
var col=this.getSelectedColor();
this.sampleAllDayEvent.style.backgroundColor=col;
this.sampleTimedEvent.style.color=col;
if(!_1818){
this.changeButtonState(true);
}
},onBrowserCalendars:function(){
ws.io.openWindow(Config.EventDirectoryURL,"","status=yes,resizable=yes,menubar=yes,scrollbars=yes,location=yes,toolbar=yes,top=50,left=50");
},onCalendarNameFocus:function(){
var _181a=dojo.html.hasClass(this.calendarName,"selectInputColor");
if(dojo.html.hasClass(this.calendarName,"defaultInputColor")&&!_181a){
this.calendarName.value="";
dojo.html.removeClass(this.calendarName,"defaultInputColor");
}
if(_181a){
dojo.html.removeClass(this.calendarName,"selectInputColor");
}
},onCalendarNameBlur:function(){
var _181b=dojo.string.trim(this.calendarName.value);
if(_181b==""){
this.calendarName.value=Config.Strings.EnterCalendarName;
dojo.html.addClass(this.calendarName,"defaultInputColor");
}
},onCalendarNameMouseDown:function(){
if(dojo.html.hasClass(this.calendarName,"defaultInputColor")){
this.calendarName.value="";
dojo.html.removeClass(this.calendarName,"defaultInputColor");
}
},onCalendarNameKeyPress:function(){
if(dojo.html.hasClass(this.calendarName,"defaultInputColor")){
this.calendarName.value="";
dojo.html.removeClass(this.calendarName,"defaultInputColor");
}
this.changeButtonState(true);
this.showErrorCalendarName(false);
},onScreenNameFocus:function(){
if(dojo.html.hasClass(this.screenName,"defaultInputColor")){
this.screenName.value="";
dojo.html.removeClass(this.screenName,"defaultInputColor");
}
},onScreenNameBlur:function(){
var _181c=dojo.string.trim(this.screenName.value);
if(_181c==""){
this.screenName.value=Config.Strings.EnterScreenName;
dojo.html.addClass(this.screenName,"defaultInputColor");
dojo.html.removeClass(this.addImage,"addImageEnabled");
dojo.html.addClass(this.addImage,"addImageDefault");
}
},onScreenNameKeyPress:function(){
this.changeButtonState(true);
this.showErrorScreenName(false);
dojo.html.removeClass(this.addImage,"addImageDefault");
dojo.html.addClass(this.addImage,"addImageEnabled");
},getSelectedColor:function(_181d){
var col=this.colorMap[this.colorSelector.currentValue];
if(!col){
col=this.colorMap["Green"];
}
if(!_181d){
return col[0];
}else{
return col[1];
}
},normalizedScreenName:function(_181f){
return (!_181f)?null:_181f.replace(/\s/g,"").toLowerCase();
},showErrorCalendarName:function(show,msg){
if(show){
this.errorCalendarName.innerHTML=msg;
dojo.html.show(this.errorCalendarName);
}else{
this.errorCalendarName.innerHTML="";
dojo.html.hide(this.errorCalendarName);
}
},showErrorScreenName:function(show,msg){
if(show){
this.errorScreenName.innerHTML=msg;
dojo.html.show(this.errorScreenName);
}else{
this.errorScreenName.innerHTML="";
dojo.html.hide(this.errorScreenName);
}
},isValidScreenName:function(_1824,_1825){
if(!this.ScreenNameRegexp.test(_1825)){
this.showErrorScreenName(true,Config.Strings.INVALID_SCREENNAME_ERROR_MESSAGE);
return false;
}
if(this.sharingMap[_1825]!=null){
this.showErrorScreenName(true,_1824+" "+Config.Strings.DUPLICATE_SCREENNAME_MESSAGE);
return false;
}
if(_1825==this.currentScreenName){
this.showErrorScreenName(true,Config.Strings.OWNER_SCREENNAME_MESSAGE);
return false;
}
return true;
},getSharingTableRowHtml:function(sn){
var _1827=[];
if(Config.ShowPresenceInfoOnContacts){
var url=ws.presence.getBuddyIconUrl({screenName:sn});
_1827.push("<tr><td style='width:38px; height:38px; padding-top:5px; padding-bottom:5px; padding-left:8px'><img class='buddyIcon' width='32' height='32' border='1' align='absmiddle' src='");
_1827.push(url);
_1827.push("' onerror='this.src=Config.SpacerImageURL;'></td><td style='width:155px'><span title='"+sn+"'>");
_1827.push(sn);
_1827.push("</span></td><td align='left' style='width:30px'><div style='display:none' class='hoverControl deleteHover'></div>");
_1827.push("<td style='width:155px'>");
_1827.push("</td></tr>");
}else{
var url=Config.SpacerImageURL;
_1827.push("<tr><td style='width:0px; height:38px; padding-top:5px; padding-bottom:5px; padding-left:8px'>");
_1827.push("</td><td style='width:155px'><span title='"+sn+"'>");
_1827.push(sn);
_1827.push("</span></td><td align='left' style='width:30px'><div style='display:none' class='hoverControl deleteHover'></div>");
_1827.push("<td style='width:155px'>");
_1827.push("</td></tr>");
}
return _1827.join("");
},getSelectOptionHtml:function(_1829){
var _182a=[];
_182a.push("<li value='"+_1829+":View'>"+Config.Strings.ViewOnly+"&nbsp;&nbsp;</li>");
_182a.push("<li value='"+_1829+":ViewAndEdit'>"+Config.Strings.ViewAndEdit+"&nbsp;&nbsp;</li>");
return _182a.join("");
},addScreenNameRow:function(_182b,_182c){
var trs=this.screenNameTableBody.getElementsByTagName("tr");
if(trs.length==0){
dojo.html.show(this.screenNameTableHead);
}
var _182e=this.getSharingTableRowHtml(_182b);
var tr=dojo.html.createNodesFromText(_182e)[0];
tr.nSn=_182b;
dojo.event.connect(tr,"onmouseover",this,"onMouseOverScreenNameRow");
dojo.event.connect(tr,"onmouseout",this,"onMouseOutScreenNameRow");
var _1830=tr.childNodes[2].getElementsByTagName("div")[0];
dojo.event.connect(_1830,"onclick",this,"onDeleteScreenName");
tr.delDiv=_1830;
this.screenNameTableBody.appendChild(tr);
var sHtml=this.getSelectOptionHtml(_182b);
tr.perSelector=dojo.widget.createWidget("ws:WSSelect",{optionTemplate:sHtml},tr.childNodes[3],"last");
tr.perSelector.domNode.style.border="0px";
tr.perSelector.domNode.style.backgroundColor="transparent";
if(_182c){
tr.perSelector.setOption(1);
}
tr.perSelector.valueChanged=ws.lang.hitch(this,"onAccessLevelChanged",tr.perSelector);
var ar=this.addressModel.getRecordByScreenName(_182b);
if(ar){
this.screenNameFound(ar);
}
},onAddScreenName:function(){
if(!dojo.html.hasClass(this.addImage,"addImageDefault")){
var sn=this.screenName.value;
var _1834=this.normalizedScreenName(sn);
var _1835=true;
if(dojo.html.hasClass(this.screenName,"defaultInputColor")){
this.showErrorScreenName(true,Config.Strings.EMPTY_ADD_MESSAGE);
_1835=false;
}else{
_1835=this.isValidScreenName(sn,_1834);
}
if(_1835){
var _1836=new SharingMapState(sn,_1834,false);
this.sharingMap[_1834]=_1836;
this.addScreenNameRow(_1834);
this.screenName.value=Config.Strings.EnterScreenName;
dojo.html.addClass(this.screenName,"defaultInputColor");
}
this.screenName.focus();
dojo.event.topic.publish("WSFeedbackStart",Config.Strings.SharedContactAdded,true);
}
},onAccessLevelChanged:function(_1837,_1838){
var value=_1837.currentValue;
var index=value.indexOf(":");
var nSn=value.substring(0,index);
var _183c=value.substring(index+1);
var sSte=this.sharingMap[nSn];
if(sSte){
if(_183c=="View"){
sSte.hasWriteAccess=false;
}else{
sSte.hasWriteAccess=true;
}
}
if(!_1838){
this.changeButtonState(true);
}
},onMouseOverScreenNameRow:function(evt){
var tr=evt.currentTarget;
dojo.html.addClass(tr,"screenNameRowHover");
var _1840=tr.childNodes[2].getElementsByTagName("div")[0];
dojo.html.show(_1840);
},onMouseOutScreenNameRow:function(evt){
var tr=evt.currentTarget;
dojo.html.removeClass(tr,"screenNameRowHover");
var _1843=tr.childNodes[2].getElementsByTagName("div")[0];
dojo.html.hide(_1843);
},findParentRow:function(el){
var tr=el;
while(tr.parentNode!=null){
tr=tr.parentNode;
if(tr.tagName.toLowerCase()=="tr"){
break;
}
}
return tr;
},onDeleteScreenName:function(evt){
var tr=this.findParentRow(evt.currentTarget);
this.deleteScreenNameRow(tr);
var trs=this.screenNameTableBody.getElementsByTagName("tr");
if(trs.length==0){
dojo.html.hide(this.screenNameTableHead);
}
this.changeButtonState(true);
dojo.event.topic.publish("WSFeedbackStart",Config.Strings.SharedContactDeleted,true);
},deleteAllScreenNameRows:function(){
var trs=this.screenNameTableBody.getElementsByTagName("tr");
for(var i=trs.length-1;i>=0;i--){
this.deleteScreenNameRow(trs[i]);
}
dojo.html.hide(this.screenNameTableHead);
},deleteScreenNameRow:function(tr){
if(tr){
tr.perSelector.destroy();
tr.perSelector=null;
dojo.event.disconnect(tr,"onmouseover",this,"onMouseOverScreenNameRow");
dojo.event.disconnect(tr,"onmouseout",this,"onMouseOutScreenNameRow");
dojo.event.connect(tr.delDiv,"onclick",this,"onDeleteScreenName");
tr.delDiv=null;
this.sharingMap[tr.nSn]=null;
this.screenNameTable.deleteRow(tr.rowIndex);
}
},backToCalendarView:function(){
ws.WebSuite.Navigation.showCalendar(true);
},isValidCalendarName:function(name){
for(var c in this.InvalidCalendarNameCharMap){
if(name.indexOf(c)!=-1){
return false;
}
}
return true;
},checkCalendarName:function(_184e,_184f){
var valid=true;
if(dojo.html.hasClass(this.calendarName,"defaultInputColor")){
this.showErrorCalendarName(true,Config.Strings.EmptyCalendarName);
this.calendarName.focus();
valid=false;
}else{
if(this.calendarName.value.length>40){
this.showErrorCalendarName(true,Config.Strings.CalNameTooLongOrInvalidChars);
this.calendarName.focus();
valid=false;
}else{
if(!this.isValidCalendarName(this.calendarName.value)){
this.showErrorCalendarName(true,Config.Strings.CalNameTooLongOrInvalidChars);
this.calendarName.focus();
valid=false;
}else{
var _1851=this.model.calendarEnum;
var _1852=this.model.calendars;
if(_1852&&_1851){
for(var calid in _1852){
var _1854=_1852[calid];
var calid=_1854[_1851.id];
if(calid==_184f){
continue;
}
var _1855=_1854[_1851.displayName];
var _1856=_1854[_1851.compType];
if((_1856==0)&&(_184e==_1855)&&(_1855!=this.calendarName._origValue)){
this.showErrorCalendarName(true,Config.Strings.DuplicateCalendarName);
this.calendarName.focus();
valid=false;
break;
}
}
}
}
}
}
return valid;
},getAccessList:function(){
var _1857="";
var _1858="";
for(var sn in this.sharingMap){
var sts=this.sharingMap[sn];
if(sts==null){
continue;
}
if(sts.hasWriteAccess){
_1858+=sts.screenName+",";
}else{
_1857+=sts.screenName+",";
}
}
return [_1857,_1858];
},onAddCalendar:function(){
var _185b=dojo.string.trim(this.calendarName.value);
var _185c=this.checkCalendarName(_185b);
if(_185c){
var args=new Object();
args.color=this.getSelectedColor(true);
args.displayName=_185b;
args.selected=true;
args.components=false;
args.index=false;
args.dayBucketIndex=false;
args.enums=false;
var _185e=this.getAccessList();
args.readOnlyList=_185e[0];
args.readWriteList=_185e[1];
args.loadCallback=function(){
dojo.event.topic.publish("WSFeedbackStart",ws.string.substituteParams(Config.Strings.CalendarAdded,_185b),true);
};
args.errorCallback=function(){
dojo.event.topic.publish("WSFeedbackEnd",Config.Strings.Loading);
};
this.model.saveCalendar(args);
this.dirty=false;
this.backToCalendarView();
}
},onDeleteCalendar:function(){
ws.widget.OkCancelDialog.alert(Config.Strings.ConfirmCalDelete,ws.lang.hitch(this,function(ok){
if(ok){
this.executeDeleteCalendar();
}
}),true);
},executeDeleteCalendar:function(){
var _1860=dojo.string.trim(this.calendarName.value);
var args=new Object();
args.id=this.calId;
args.displayName=_1860;
args.components=false;
args.index=false;
args.enums=false;
args.dayBucketIndex=false;
args.loadCallback=function(){
dojo.event.topic.publish("WSFeedbackStart",ws.string.substituteParams(Config.Strings.CalendarDeleted,_1860),true);
};
args.errorCallback=function(){
dojo.event.topic.publish("WSFeedbackEnd",Config.Strings.Loading);
};
this.model.deleteCalendar(args);
dojo.event.topic.publish("EditCalendar/Delete");
this.dirty=false;
this.backToCalendarView();
},onUpdateCalendar:function(){
if(!this.editCalendar){
this.onAddCalendar();
}else{
var _1862=dojo.string.trim(this.calendarName.value);
var _1863=this.checkCalendarName(_1862,this.calId);
if(_1863){
var args=new Object();
args.id=this.calId;
args.color=this.getSelectedColor(true);
args.displayName=_1862;
args.selected=true;
var _1865=this.getAccessList();
args.readOnlyList=_1865[0];
args.readWriteList=_1865[1];
args.loadCallback=function(){
dojo.event.topic.publish("WSFeedbackStart",ws.string.substituteParams(Config.Strings.CalendarUpdated,_1862),true);
};
this.model.saveCalendar(args);
this.dirty=false;
this.backToCalendarView();
}
}
},confirmClose:function(_1866){
if(this.dirty){
ws.widget.OkCancelDialog.alert(Config.Strings.ConfirmSaveCalendarSetting,function(ok){
if(ok&&_1866){
_1866();
}
},true);
}else{
if(_1866){
_1866();
}
}
},confirmSwitchEditCalendar:function(calId){
var _1869=function(_186a,calId){
_186a.setCalId(calId);
_186a.initEditCalendar();
};
var _186c=this;
if(this.dirty){
ws.widget.OkCancelDialog.alert(Config.Strings.ConfirmSaveSettings,function(ok){
if(ok){
_1869(_186c,calId);
}
},true);
}else{
_1869(_186c,calId);
}
},screenNameFound:function(ar){
if(!this.isShowing()){
return;
}
if(ar.name){
var trs=this.screenNameTableBody.getElementsByTagName("tr");
for(var j=0;j<trs.length;j++){
if(trs[j].nSn.toLowerCase()==ar.screenName.toLowerCase()){
var ele=trs[j].childNodes[1].childNodes[0];
ele.innerHTML=ar.firstName+ar.lastName;
break;
}
}
}
}});
function SharingMapState(_1872,_1873,_1874){
this.screenName=_1872;
this.nScreenName=_1873;
this.hasWriteAccess=_1874;
}
dojo.provide("ws.mail.EditFolderDialog");
dojo.widget.defineWidget("ws.mail.EditFolderDialog",dojo.widget.HtmlWidget,{widgetsInTemplate:true,templateString:"<div>\r\n\t<div dojoType=\"dojo:Dialog\" dojoAttachPoint=\"dialogWidget\" bgColor=\"white\" bgOpacity=\"0.75\">\r\n\t\t<div class=\"editFolder\" style=\"width: 320px; background: #fff; border: 1px solid #000; padding: 8px 10px; overflow: auto;\">\r\n\t\t\t<div class=\"header\">${EditFolder}</div>\r\n\t\t\t\r\n\t\t\t<img src=\"${spacer}\" class=\"close\" dojoAttachEvent=\"onClick: hide\" />\r\n\t\t\t\r\n\t\t\t<div class=\"rename\">\r\n\t\t\t\t<input class=\"wsInput\" dojoAttachPoint=\"renameInput\" />\r\n\t\t\t\t<div dojoType=\"ws:WSButton\" vizType=\"Blue\" dojoAttachEvent=\"onClick: renameFolder\">${Save}</div>\r\n\t\t\t\t<div style=\"clear: both;\"></div>\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t<div class=\"info\" dojoAttachPoint=\"infoNode\">\r\n\t\t\t\t<span dojoAttachPoint=\"msgCountNode\"></span>&nbsp;${Messages} &nbsp;|&nbsp;\r\n\t\t\t\t<span dojoAttachPoint=\"sizeNode\"></span>\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t<div class=\"actions\">\r\n\t\t\t\t<span class=\"wsLink\" dojoAttachEvent=\"onClick: emptyFolder\">${Empty}</span>&nbsp;|&nbsp;\r\n\t\t\t\t<span class=\"wsLink\" dojoAttachEvent=\"onClick: deleteFolder\">${Delete}</span>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n",templateCssString:".editFolder \r\n{\r\n\tpadding: 5px;\r\n}\r\n\r\n.editFolder .header {\r\n\tfont-weight: bold;\r\n\tfont-size: 14px;\r\n\tfloat: left;\r\n}\r\n\r\n.editFolder .close {\r\n\theight: 12px;\r\n\twidth: 12px;\r\n\tcursor: pointer;\r\n\tfloat: right;\r\n\tbackground: url(\"${images}main.gif\") -1425px -1px;\r\n}\r\n.editFolder .close:hover {\r\n\tbackground-position: -1440px -1px;\r\n}\r\n\r\n.editFolder .rename {\r\n\tclear: both;\r\n\tpadding: 15px 0px 0px 0px;\r\n}\r\n\r\n.editFolder .rename input {\r\n\tfloat: left;\r\n\twidth: 200px;\r\n\tborder: solid 1px #85817c;\r\n\tpadding: 2px 2px 2px 6px;\r\n\tmargin: 0px 5px 0px 20px;\r\n\tfont: normal 11px verdana;\r\n}\r\n\r\n.editFolder .rename .wsButton {\r\n\tfloat: left;\r\n}\r\n\r\n.editFolder .info,\r\n.editFolder .actions {\r\n\tmargin-top: 15px;\r\n\tclear: both;\r\n\ttext-align: center;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("../ws/mail/EditFolderDialog.css"),setModel:function(model){
this.model=model;
},show:function(_1876){
for(var i=0;i<this.model.folders.length;i++){
if(this.model.folders[i].name==_1876){
this.folder=this.model.folders[i];
}
}
this.renameInput.value=this.folder.displayName;
this.getFolderInfo();
this.dialogWidget.show();
ws.reporting.reportAction("Edit Folder");
},hide:function(){
this.dialogWidget.hide();
},getFolderInfo:function(){
this.infoNode.style.visibility="hidden";
this.model.getFolderInfo({name:this.folder.name,load:dojo.lang.hitch(this,function(data){
this.folder.count=data.count;
this.msgCountNode.innerHTML=data.count;
this.sizeNode.innerHTML=Math.round(data.size/1024)+"KB";
this.infoNode.style.visibility="visible";
}),error:function(err){
dojo.debug("GetFolderInfo error:",err);
}});
},deleteFolder:function(){
this.hide();
var count=(this.folder.count==-1)?"":this.folder.count;
var msg=(Config.EnableIMAPFolderHierarchy)?ws.string.substituteParams(Config.Strings.DeleteHierarchyFolderConfirmation,this.folder.displayName):ws.string.substituteParams(Config.Strings.DeleteFolderConfirmation,this.folder.displayName,count);
ws.widget.OkCancelDialog.alert(msg,dojo.lang.hitch(this,function(_187c){
if(_187c){
this.model.deleteFolder({load:dojo.lang.hitch(this,function(){
dojo.event.topic.publish("WSFeedbackStart",ws.string.substituteParams(Config.Strings.FolderDeleted,this.folder.displayName),true);
}),name:this.folder.name,error:function(err){
ws.widget.OkCancelDialog.alert(dojo.string.isBlank(err)?Config.Strings.DeleteFolderError:err);
}});
}else{
this.show(this.folder.name);
}
}),true);
},emptyFolder:function(){
this.hide();
var count=(this.folder.count==-1)?"":this.folder.count;
ws.widget.OkCancelDialog.alert(ws.string.substituteParams(Config.Strings.EmptyFolderConfirmation,count,this.folder.displayName),dojo.lang.hitch(this,function(_187f){
if(_187f){
this.model.emptyFolder({load:dojo.lang.hitch(this,function(){
dojo.event.topic.publish("WSFeedbackStart",ws.string.substituteParams(Config.Strings.FolderEmptied,this.folder.name),true);
}),name:this.folder.name,error:function(err){
ws.widget.OkCancelDialog.alert(dojo.string.isBlank(err)?Config.Strings.EmptyFolderError:err);
}});
}
this.show(this.folder.name);
}),true);
},renameFolder:function(){
this.hide();
this.model.renameFolder({name:this.folder.name,newName:this.renameInput.value,error:dojo.lang.hitch(this,function(err){
ws.widget.OkCancelDialog.alert(dojo.string.isBlank(err)?Config.Strings.FolderRenameError:err,dojo.lang.hitch(this,function(){
this.show(this.folder.name);
}));
})});
}});
dojo.provide("ws.suite.Navigation");
dojo.widget.defineWidget("ws.suite.Navigation",dojo.widget.HtmlWidget,{templateString:"<div class=\"WSNavigation\">\r\n\t<div dojoType=\"ws:WSLayoutContainer\" deferred=\"true\" style=\"height: 100%; width: 100%;\">\r\n\t\t<div layoutAlign=\"top\" dojoType=\"ws:WSToolbar\" vizType=\"Bare\">\r\n\t\t\t<div dojoType=\"ws:WSButton\" vizType=\"Compose\" className=\"WSNavComposeButton\" toolbarPosition=\"center\" dojoAttachEvent=\"onClick: composeMessage\">${NavWriteMail}</div>\r\n\t\t</div>\r\n\t\t\r\n\t\t<div layoutAlign=\"client\" dojoType=\"dojo:ContentPane\" class=\"mainPane\">\r\n\t\t\t<!-- Mail -->\r\n\t\t\t<div dojoAttachPoint=\"sysFoldersNode\"></div>\r\n\t\t\t<div class=\"appSeparator\"></div>\r\n\t\t\t\r\n\t\t\t<!-- Contacts -->\r\n\t\t\t<div dojoAttachPoint=\"contactsItem\" class=\"navItem\">\r\n\t\t\t\t<div class=\"icon iconContacts\"></div>\r\n\t\t\t\t<div class=\"text\">${NavContacts}</div>\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t<!-- Feeds -->\r\n\t\t\t\r\n\t\t\t<div class=\"quotaWarning\" dojoAttachPoint=\"quotaWarningContainer\" style=\"display: none;\">\r\n\t\t\t\t<div class=\"closeButton\" dojoAttachEvent=\"onClick: closeQuotaWarning\"></div>\r\n\t\t\t\t<span dojoAttachPoint=\"quotaWarningTextNode\"></span>\r\n\t\t\t</div>\r\n\r\n\t\t\t<!-- Calendar -->\r\n\t\t\t<div dojoAttachPoint=\"calendarItem\" class=\"navItem\">\r\n\t\t\t\t<div class=\"icon iconCalendar\"></div>\r\n\t\t\t\t<div class=\"text\">${NavCalendar}</div>\r\n\t\t\t\t\r\n\t\t\t\t<!---- ---->\r\n\t\t\t\t<span dojoAttachPoint=\"showAddCalendarNode\" class=\"ctrl wsLink\" style=\"display: none;\">${NavAdd}</span>\r\n\t\t\t</div>\r\n\t\t\t<div dojoAttachPoint=\"calendarContainer\" class=\"calendarContainer\" style=\"display: none;\">\r\n\t\t\t\t<div dojoAttachPoint=\"myCalendarsNode\" style=\"overflow: hidden;\"></div>\r\n\t\t\t\t<div class=\"calendarSeparator\"></div>\r\n\t\t\t\t<div dojoAttachPoint=\"subCalendarsNode\" style=\"overflow: hidden;\"></div>\r\n\t\t\t\t<div class=\"calendarPromoNodeItem\" dojoAttachPoint=\"calendarPromoNode\" style=\"overflow: hidden;\">\r\n\t\t\t\t\t<a href=\"#\" class=\"wsLink\" target=\"_blank\" dojoAttachPoint=\"calendarPromoLink\"></a>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div class=\"appSeparator\"></div>\r\n\t\t\t\r\n\t\t\t<!-- My Folders -->\r\n\t\t\t<div dojoAttachPoint=\"myFoldersItem\" dojoAttachEvent=\"onClick: toggleMyFolders\" class=\"navItem\">\r\n\t\t\t\t<div class=\"twisty twistyClosed\"></div>\r\n\t\t\t\t<div class=\"text myFolderText\">${NavMyFolders}</div>\r\n\t\t\t\t<span dojoAttachEvent=\"onClick: showCreateFolder\" class=\"ctrl wsLink\" style=\"display: none;\">${NavAdd}</span>\r\n\t\t\t</div>\r\n\t\t\t<div dojoAttachPoint=\"myFoldersContainer\" style=\"display: none;\">\r\n\t\t\t\t<div dojoAttachPoint=\"myFoldersNode\" style=\"overflow: hidden;\"></div>\r\n\t\t\t\t<div dojoAttachPoint=\"createFolderNode\" class=\"createFolder\" style=\"display: none;\">\r\n\t\t\t\t\t<input class=\"wsInput\" dojoAttachEvent=\"onKeyPress: onCreateFolderKeyPress\" dojoAttachPoint=\"createFolderInput\">\r\n\t\t\t\t\t<div dojoAttachEvent=\"onClick: createFolder\" class=\"add\"></div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n",templateCssString:".WSNavigation\r\n{\r\n\tbackground-color: #f3ece0;\r\n\tbackground-image: url(\"${images}navbackground.gif\"); \r\n\tbackground-position: left bottom;\r\n\tbackground-repeat: repeat-x;\r\n\theight: 100%;\r\n\twidth: 100%;\r\n}\r\n\r\n.WSNavigation .mainPane\r\n{\r\n\toverflow: auto;\r\n\toverflow-x: hidden;\r\n}\r\n\r\n.WSNavigation div\r\n{\r\n\t/* IE Hack */\r\n\t/* position relative can cause really bad layout problems; this works around most of them */\r\n\tzoom: 1;\r\n}\r\n\r\n.WSNavigation hr\r\n{ \r\n\tborder-top: 1px dashed #ababab;\r\n\twidth: 80%;\r\n}\r\n\r\n.WSNavigation .wsToolbar\r\n{\r\n\tpadding: 11px 1px;\r\n}\r\n.WSNavComposeButton\r\n{\r\n\tfont-size: 12px;\r\n}\r\n\r\n.WSNavigation .navItem\r\n{\r\n\tposition: relative;\r\n\toverflow: hidden;\r\n\tcursor: pointer;\r\n\tcursor: hand;\r\n\t/* The padding-top value should be carried over to all absolutely positioned elements */\r\n\t/* within the nav element as the top offset. */\r\n\tpadding-top: 3px;\r\n\tpadding-bottom: 3px;\r\n}\r\n\r\n.WSNavigation .navItemHover,\r\n.WSNavigation .navItemCurrent\r\n{\r\n\tbackground-color: #ffffff;\r\n}\r\n\r\n.WSNavigation .navItemCalendar\r\n{\r\n\tmargin-top: 12px;\r\n}\r\n\r\n.WSNavigation .navItem .twisty\r\n{\r\n\tposition: absolute;\r\n\tleft: 8px;\r\n\ttop: 6px;\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tbackground-repeat: no-repeat;\r\n}\r\n.WSNavigation .navItem .twistyClosed\t{ background-position: -1052px -2px; width: 5px;\theight: 9px; }\r\n.WSNavigation .navItem .twistyOpen\t{ background-position: -1066px -5px; width: 9px;\theight: 5px; margin-left: -2px; margin-top: 2px; }\r\n.dj_ie6 .WSNavigation .navItem .twistyClosed\t{ background-position: -1052px -2px; width: 5px;\theight: 9px; margin-top: 2px; }\r\n.dj_ie6 .WSNavigation .navItem .twistyOpen\t{ background-position: -1066px -5px; width: 9px;\theight: 5px; margin-left: -2px; margin-top: 4px; }\r\n\r\n.WSNavigation .navItem .icon\r\n{\r\n\tposition: absolute;\r\n\tleft: 18px;\r\n\ttop: 4px;\r\n\twidth: 27px;\r\n\theight: 17px;\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tbackground-repeat: no-repeat;\r\n}\r\n\r\n.WSNavigation .navItem .iconInbox,\r\n.WSNavigation .navItem .iconNewMail\t\t{ background-position: -0px -0px;\t}\r\n.WSNavigation .navItem .iconPersonal,\r\n.WSNavigation .navItem .iconSaved,\r\n.WSNavigation .navItem .iconOldMail,\r\n.WSNavigation .navItem .iconDrafts,\r\n.WSNavigation .navItem .iconSent,\r\n.WSNavigation .navItem .iconDeleted,\r\n.WSNavigation .navItem .iconSpam,\r\n.WSNavigation .navItem .iconAutoSavedSent,\r\n.WSNavigation .navItem .iconAutoSavedRead\t{ background-position: -60px -0px;\t}\r\n.WSNavigation .navItem .iconCalendar\t\t{ background-position: -120px -0px;\t}\r\n.WSNavigation .navItem .iconContacts\t\t{ background-position: -180px -0px;\t}\r\n.WSNavigation .navItem .iconToday\t\t\t{ background-position: -0px -0px;\t}\r\n.WSNavigation .navItem .iconFeeds\t\t\t{ background-position: -240px -0px;\t}\r\n\r\n/* This is lame */\r\n.WSNavigation .navItemCurrent\t.iconInbox,\r\n.WSNavigation .navItemHover\t.iconInbox,\r\n.WSNavigation .navItemCurrent\t.iconNewMail,\r\n.WSNavigation .navItemHover\t.iconNewMail\t\t{ background-position: -30px -0px;\t}\r\n.WSNavigation .navItemCurrent\t.iconPersonal,\r\n.WSNavigation .navItemHover\t.iconPersonal,\r\n.WSNavigation .navItemCurrent\t.iconOldMail,\r\n.WSNavigation .navItemHover\t.iconOldMail,\r\n.WSNavigation .navItemCurrent\t.iconDrafts,\r\n.WSNavigation .navItemHover\t.iconDrafts,\r\n.WSNavigation .navItemCurrent\t.iconSent,\r\n.WSNavigation .navItemHover\t.iconSent,\r\n.WSNavigation .navItemCurrent\t.iconDeleted,\r\n.WSNavigation .navItemHover\t.iconDeleted,\r\n.WSNavigation .navItemCurrent\t.iconSpam,\r\n.WSNavigation .navItemHover\t.iconSpam,\r\n.WSNavigation .navItemCurrent\t.iconSaved,\r\n.WSNavigation .navItemHover\t.iconSaved,\r\n.WSNavigation .navItemCurrent\t.iconAutoSavedSent,\r\n.WSNavigation .navItemHover\t.iconAutoSavedSent,\r\n.WSNavigation .navItemCurrent\t.iconAutoSavedRead,\r\n.WSNavigation .navItemHover\t.iconAutoSavedRead\t\t\t\t{ background-position: -90px -0px;\t}\r\n.WSNavigation .navItemCurrent\t.iconCalendar,\r\n.WSNavigation .navItemHover\t.iconCalendar\t\t{ background-position: -150px -0px;\t}\r\n.WSNavigation .navItemCurrent\t.iconContacts,\r\n.WSNavigation .navItemHover\t.iconContacts\t\t{ background-position: -210px -0px;\t}\r\n.WSNavigation .navItemCurrent\t.iconFeeds,\r\n.WSNavigation .navItemHover\t.iconFeeds\t\t{ background-position: -270px -0px;\t}\r\n\r\n.WSNavigation .navItem .iconCB \r\n{\r\n\tposition: absolute;\r\n\tleft: 18px;\r\n\ttop: 4px;\r\n\twidth: 13px;\r\n\theight: 13px;\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tbackground-repeat: no-repeat;\r\n}\r\n\r\n.WSNavigation .navItem .iconCB_009712 { background-image: url(\"${images}main.gif\"); background-position: -225px -60px; }\r\n.WSNavigation .navItem .iconCB_0360EB { background-image: url(\"${images}main.gif\"); background-position: -240px -60px; }\r\n.WSNavigation .navItem .iconCB_CC0000 { background-image: url(\"${images}main.gif\"); background-position: -255px -60px; }\r\n.WSNavigation .navItem .iconCB_E76808 { background-image: url(\"${images}main.gif\"); background-position: -270px -60px; }\r\n.WSNavigation .navItem .iconCB_808000 { background-image: url(\"${images}main.gif\"); background-position: -285px -60px; }\r\n.WSNavigation .navItem .iconCB_6600FF { background-image: url(\"${images}main.gif\"); background-position: -300px -60px; }\r\n.WSNavigation .navItem .iconCB_008080 { background-image: url(\"${images}main.gif\"); background-position: -315px -60px; }\r\n.WSNavigation .navItem .iconCB_800080 { background-image: url(\"${images}main.gif\"); background-position: -330px -60px; }\r\n.WSNavigation .navItem .iconCB_6C6C6C { background-image: url(\"${images}main.gif\"); background-position: -345px -60px; }\r\n.WSNavigation .navItem .iconCB_0088FF { background-image: url(\"${images}main.gif\"); background-position: -360px -60px; }\r\n.WSNavigation .navItem .iconCB_646496 { background-image: url(\"${images}main.gif\"); background-position: -375px -60px; }\r\n.WSNavigation .navItem .iconCB_FF0080 { background-image: url(\"${images}main.gif\"); background-position: -390px -60px; }\r\n\r\n.WSNavigation .navItem .iconCB_009712_checked { background-image: url(\"${images}main.gif\"); background-position: -225px -75px; }\r\n.WSNavigation .navItem .iconCB_0360EB_checked { background-image: url(\"${images}main.gif\"); background-position: -240px -75px; }\r\n.WSNavigation .navItem .iconCB_CC0000_checked { background-image: url(\"${images}main.gif\"); background-position: -255px -75px; }\r\n.WSNavigation .navItem .iconCB_E76808_checked { background-image: url(\"${images}main.gif\"); background-position: -270px -75px; }\r\n.WSNavigation .navItem .iconCB_808000_checked { background-image: url(\"${images}main.gif\"); background-position: -285px -75px; }\r\n.WSNavigation .navItem .iconCB_6600FF_checked { background-image: url(\"${images}main.gif\"); background-position: -300px -75px; }\r\n.WSNavigation .navItem .iconCB_008080_checked { background-image: url(\"${images}main.gif\"); background-position: -315px -75px; }\r\n.WSNavigation .navItem .iconCB_800080_checked { background-image: url(\"${images}main.gif\"); background-position: -330px -75px; }\r\n.WSNavigation .navItem .iconCB_6C6C6C_checked { background-image: url(\"${images}main.gif\"); background-position: -345px -75px; }\r\n.WSNavigation .navItem .iconCB_0088FF_checked { background-image: url(\"${images}main.gif\"); background-position: -360px -75px; }\r\n.WSNavigation .navItem .iconCB_646496_checked { background-image: url(\"${images}main.gif\"); background-position: -375px -75px; }\r\n.WSNavigation .navItem .iconCB_FF0080_checked { background-image: url(\"${images}main.gif\"); background-position: -390px -75px; }\r\n\r\n.WSNavigation .navItem .text\r\n{\r\n\toverflow: hidden;\r\n\twhite-space: nowrap;\r\n\tpadding-left: 42px;\r\n\tline-height: 16px;\r\n}\r\n.WSNavigation .hasUnseen .text\r\n{\r\n\tfont-weight: bold;\r\n}\r\n\r\n.WSNavigation .navItem .text .unseen\r\n{\r\n\tpadding-left: 4px;\r\n}\r\n\r\n.WSNavigation .navItem .myFolderText\r\n{\r\n\tpadding-left: 18px;\r\n}\r\n\r\n.WSNavigation .navItem .ctrl\r\n{\r\n\tposition: absolute;\r\n\tright: 5px;\r\n\ttop: 4px;\r\n\tfont-size: 10px;\r\n\tbackground-color: #ffffff;\t\t/* required to make element opaque. */\r\n\tpadding-left: 6px;\r\n}\r\n\r\n.WSNavigation .createFolder\r\n{\r\n\tposition: relative;\r\n\theight: 27px;\r\n}\r\n\r\n.WSNavigation .createFolder input\r\n{\r\n\tposition: absolute;\r\n\tleft: 43px;\r\n\ttop: 3px;\r\n\twidth: 74px;\r\n\tpadding: 2px;\r\n\tfont: normal 12px Arial;\r\n}\r\n\r\n.WSNavigation .createFolder .add\r\n{\r\n\tposition: absolute;\r\n\tleft: 125px;\r\n\ttop: 5px;\r\n\twidth: 18px;\r\n\theight: 18px;\r\n\tbackground: url(\"${images}main.gif\") -1189px -0px;\r\n\tcursor: pointer;\r\n}\r\n.WSNavigation .createFolder .add:hover\r\n{\r\n\tbackground-position: -1212px -0px;\r\n}\r\n\r\n.WSNavigation .quotaWarning\r\n{\r\n\tmargin: 11px 5px;\r\n\tpadding: 6px;\r\n\tborder: 1px solid #CC0000;\r\n\tbackground-color: #FFFFFF;\r\n\tfont-size: 11px;\r\n\t-moz-border-radius: 4px;\r\n}\r\n.WSNavigation .quotaWarning .closeButton\r\n{\r\n\tfloat: right;\r\n\tmargin-top: -2px;\r\n\tmargin-right: -2px;\r\n\theight: 12px;\r\n\twidth: 12px;\r\n\tbackground: url(\"${images}main.gif\") -1425px -1px;\r\n\tcursor: pointer;\r\n}\r\n\r\n.WSNavigation .quotaWarning .closeButton:hover {\r\n\tbackground-position: -1440px -1px;\r\n}\r\n\r\n.WSNavigation .appSeparator\r\n{\r\n\theight:7px;\r\n}\r\n\r\n.WSNavigation .calendarSeparator\r\n{\r\n\tborder-top:1px solid #CCCCCC;\r\n\tmargin-left:10px;\r\n\tmargin-right: 10px;\t\r\n}\r\n\r\n.WSNavigation .calendarNavItem .text \r\n{\r\n\tline-height: 14px;\r\n\twhite-space: nowrap;\r\n}\r\n\r\n.WSNavigation .calendarContainer\r\n{\r\n\tmargin-bottom: 6px;\r\n}\r\n\r\n.WSNavigation .calendarPromoNodeItem\r\n{\r\n\ttext-align: center;\r\n\tfont-size: 10px;\r\n\tpadding: 2px 5px 2px 5px;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("../ws/suite/Navigation.css"),widgetsInTemplate:true,APP_MAIL:0,APP_CALENDAR:1,APP_CONTACTS:2,APP_TODAY:3,APP_FEEDS:4,APP_SETTINGS:5,APP_ADDCALENDAR:6,APP_EDITCALENDAR:7,DRAGTYPES_MAIL:[],DRAGTYPES_CALENDAR:[ws.calendar.CalendarDragAndDrop.TYPE_GRIDVIEWMOVE,ws.calendar.CalendarDragAndDrop.TYPE_UNTIMEDVIEWMOVE,ws.calendar.CalendarDragAndDrop.TYPE_COLUMNVIEWMOVE],DRAGTYPES_CONTACTS:[],fillInTemplate:function(){
this.selectedApp=null;
this.folderNodes={};
this.calendarNodes={};
this.dropTargets={};
this.disableHover=false;
this.showCalendarIndexCB=null;
},postCreate:function(args,frag){
this.navItemHeight=ws.style.getMarginBoxHeightFast(this.myFoldersItem);
dojo.event.connect(this.calendarItem,"onclick",ws.lang.hitch(this,this.selectApp,this.APP_CALENDAR));
var args=new Object();
args.type="CalendarHead";
dojo.event.connect(this.calendarItem,"oncontextmenu",ws.lang.hitch(this,this.onContextMenu,args));
dojo.event.connect(this.showAddCalendarNode,"onclick",this,"addCalendar");
dojo.event.connect(this.contactsItem,"onclick",ws.lang.hitch(this,this.displayContactListView,this.APP_CONTACTS));
var args=new Object();
args.type="Contacts";
dojo.event.connect(this.contactsItem,"oncontextmenu",ws.lang.hitch(this,this.onContextMenu,args));
dojo.event.connect(this.myFoldersItem,"onmouseover",ws.lang.hitch(this,this.onMouseOverItem,this.myFoldersItem));
dojo.event.connect(this.myFoldersItem,"onmouseout",ws.lang.hitch(this,this.onMouseOutItem,this.myFoldersItem));
dojo.event.connect(this.calendarItem,"onmouseover",ws.lang.hitch(this,this.onMouseOverItem,this.calendarItem));
dojo.event.connect(this.calendarItem,"onmouseout",ws.lang.hitch(this,this.onMouseOutItem,this.calendarItem));
dojo.event.connect(this.contactsItem,"onmouseover",ws.lang.hitch(this,this.onMouseOverItem,this.contactsItem));
dojo.event.connect(this.contactsItem,"onmouseout",ws.lang.hitch(this,this.onMouseOutItem,this.contactsItem));
dojo.event.topic.subscribe("dragStart",this,function(){
this.disableHover=true;
});
dojo.event.topic.subscribe("dragEnd",this,function(){
this.disableHover=false;
});
dojo.event.topic.subscribe("ws_view-selectChild",this,"hiliteCurrentApp");
this.defineMenus();
},onResized:function(){
if(dojo.render.html.ie55||dojo.render.html.ie60){
dojo.debug("Navigation.onResized");
var node=ws.WebSuite.NavEl;
var width=ws.style.getContentBoxWidthFast(node)-20;
if(width<0){
width=0;
}
ws.style.setMarginBoxWidthFast(this.myFoldersNode,width);
ws.style.setMarginBoxWidthFast(this.myCalendarsNode,width);
ws.style.setMarginBoxWidthFast(this.subCalendarsNode,width);
ws.style.setMarginBoxWidthFast(this.calendarPromoNode,width);
}
ws.suite.Navigation.superclass.onResized.apply(this,arguments);
},selectApp:function(app){
if(app==this.selectedApp){
return;
}
if(((this.selectedApp==this.APP_CALENDAR)||(this.selectedApp==this.APP_ADDCALENDAR)||(this.selectedApp==this.APP_EDITCALENDAR))&&(app!=this.APP_ADDCALENDAR)&&(app!=this.APP_EDITCALENDAR)){
this.showCalendar(false);
}
switch(app){
case this.APP_MAIL:
break;
case this.APP_CALENDAR:
this.showCalendar(true);
break;
case this.APP_CONTACTS:
this.showContacts();
break;
case this.APP_EDITCALENDAR:
this.showEditCalendar();
break;
case this.APP_ADDCALENDAR:
this.showAddCalendar();
break;
case this.APP_TODAY:
case this.APP_FEEDS:
default:
break;
}
this.onResized();
},hiliteCurrentApp:function(){
var _1887=dojo.widget.byId("ws_view").selectedChild;
var _1888=null;
var _1889=this.APP_MAIL;
switch(_1887){
case "AddressList":
_1888=this.contactsItem;
this.selectedApp=this.APP_CONTACTS;
this.hideCalendar();
break;
case "calendarView":
this.selectApp(this.APP_CALENDAR);
this.selectedApp=this.APP_CALENDAR;
break;
case "addCalendar":
case "editCalendar":
_1888=this.calendarItem;
this.selectedApp=this.APP_CALENDAR;
break;
default:
if(this.mailModel){
_1888=this.folderNodes[this.mailModel.currentFolder];
}
this.selectedApp=this.APP_MAIL;
this.hideCalendar();
break;
}
if(this.currentHiliteNode){
dojo.html.removeClass(this.currentHiliteNode,"navItemCurrent");
}
if(_1888){
dojo.html.addClass(_1888,"navItemCurrent");
this.currentHiliteNode=_1888;
}
},setMailModel:function(_188a){
this.mailModel=_188a;
dojo.event.connect(this.mailModel,"folderListChanged",this,"updateFolderList");
dojo.event.connect(this.mailModel,"modelUpdated",this,"hiliteCurrentApp");
dojo.event.connect(this.mailModel,"infoUpdated",this,"onMailInfoUpdated");
this.updateFolderList();
this.hiliteCurrentApp();
this.onMailInfoUpdated();
},updateFolderList:function(){
var _188b=this.mailModel.folders;
var _188c=_188b?_188b.length:0;
var _188d=this.sysFoldersNode;
var _188e=this.myFoldersNode;
var _188f={};
var _1890="";
for(var i=0;i<_188c;i++){
var _1892=_188b[i];
var _1893=_1892.type;
var _1894=_1892.name;
var _1895=(_1893=="Inbox")||(_1893=="NewMail");
if(Config.ShowFolderMessageCount){
_1895=_1895||(_1893=="Spam")||(_1893=="Drafts");
}
var _1896=(_1893=="Spam")||(_1893=="Deleted");
var _1897=(_1893=="Personal");
var el=this.folderNodes[_1894];
if(!el){
el=document.createElement("div");
el.className="navItem";
dojo.event.browser.addListener(el,"onclick",ws.lang.hitch(this,"displayFolder",_1894));
dojo.event.browser.addListener(el,"onmouseover",ws.lang.hitch(this,this.onMouseOverItem,el));
dojo.event.browser.addListener(el,"onmouseout",ws.lang.hitch(this,this.onMouseOutItem,el));
var _1899=["Personal","Saved","AutoSavedRead","AutoSavedSent"];
var par=(dojo.lang.find(_1899,_1893)==-1)?_188d:_188e;
if(par==_188d){
if((_1893=="Inbox")||(_1893=="NewMail")){
dojo.dom.prependChild(el,par);
}else{
if(_1893=="OldMail"){
if(this.folderNodes["New Mail"]){
dojo.dom.insertAfter(el,this.folderNodes["New Mail"]);
}else{
dojo.dom.prependChild(el,par);
}
}else{
par.appendChild(el);
}
}
}else{
par.appendChild(el);
}
var html="";
var _189c=dojo.string.escapeXml(_1892.displayName);
_189c=_189c.replace(/ /gm,"&nbsp;");
if(Config.EnableIMAPFolderHierarchy){
if(_1892.depth==1){
_1890=_1892.name;
}
var _189d=Config.FolderHierarchyDelimiter;
var depth="";
for(var d=1;d<_1892.depth;d++){
depth+=" ";
}
for(var d=1;d<_1892.depth;d++){
depth+=_189d;
}
if(depth!=""){
var index=_1892.name.indexOf("/");
var _18a1=_1892.name.substring(0,index);
if(_18a1!=_1890){
html="<div class = \"text\">"+_1892.name.substring(0,index)+"</div>";
_1890=_18a1;
}
}
_189c=dojo.string.escapeXml(depth+_1892.displayName);
_189c=_189c.replace(/ /gm,"&nbsp;");
}
html+="<div class=\"icon icon"+_1893+"\"></div><div class=\"text\"><span>"+_189c+"</span>";
if(_1895){
html+="<span class=\"unseen\"></span>";
}
html+="</div>";
el.innerHTML=html;
var args=new Object();
args.type="Mail";
args.showEdit=_1897;
args.showEmpty=_1896;
args.folderName=_1894;
dojo.event.connect(el,"oncontextmenu",ws.lang.hitch(this,this.onContextMenu,args));
if(_1897){
var _18a3=document.createElement("span");
_18a3.className="ctrl wsLink";
_18a3.style.display="none";
_18a3.innerHTML=Config.Strings.NavEdit;
dojo.event.browser.addListener(_18a3,"onclick",ws.lang.hitch(this,"editFolder",_1894));
el.appendChild(_18a3);
}else{
if(_1896){
var _18a4=document.createElement("span");
_18a4.className="ctrl wsLink";
_18a4.style.display="none";
_18a4.innerHTML=Config.Strings.NavEmpty;
dojo.event.browser.addListener(_18a4,"onclick",ws.lang.hitch(this,"emptyFolder",_1894));
el.appendChild(_18a4);
}
}
this.dropTargets[_1894]=new ws.suite.NavigationDropTarget(el,"message",this,_1894);
this.folderNodes[_1894]=el;
}
if(_1895){
var _18a5=el.childNodes[1].childNodes[1];
dojo.dom.removeNode(_18a5);
_18a5=document.createElement("span");
_18a5.className="unseen";
var _18a6=_1892.unseenCount;
var _18a7=(_18a6>0)?("("+_18a6+")"):"";
_18a5.innerHTML=_18a7;
el.childNodes[1].appendChild(_18a5);
ws.html.toggleClass(el,"hasUnseen",_18a6>0);
if((_1893=="Inbox")||(_1893=="NewMail")){
ws.browser.setWindowTitle(Config.Strings.MessageListTitle+" "+_18a7);
}
}
_188f[_1894]=true;
if(!this._showFolderFirstTime){
this._showFolderFirstTime=true;
dojo.lang.setTimeout(ws.lang.hitch(this,"showMyFolders",true),0);
}
}
for(var _1892 in this.folderNodes){
if(!(_1892 in _188f)){
dojo.dom.removeNode(this.folderNodes[_1892]);
delete this.folderNodes[_1892];
dojo.dnd.dragManager.unregisterDropTarget(this.dropTargets[_1892]);
}
}
},onMailInfoUpdated:function(){
var pct=Settings.HasUnlimitedMailStorage?0:Math.round(100*(Settings.MailStorageUsed/Settings.MailStorageQuota));
ws.html.setInnerText(this.quotaWarningTextNode,ws.string.substituteParams(Config.Strings.QuotaWarning,pct));
dojo.html.setShowing(this.quotaWarningContainer,pct>=90&&!this.closedQuotaWarning);
},closeQuotaWarning:function(){
dojo.html.hide(this.quotaWarningContainer);
this.closedQuotaWarning=true;
},displayFolder:function(_18a9){
this.selectApp(this.APP_MAIL);
this.hideCreateFolder();
},composeMessage:function(){
},showMyFolders:function(show){
this.hideCreateFolder();
var _18ab=this.myFoldersItem.getElementsByTagName("div")[0];
if(show){
dojo.html.show(this.myFoldersContainer);
dojo.html.removeClass(_18ab,"twistyClosed");
dojo.html.addClass(_18ab,"twistyOpen");
}else{
dojo.html.hide(this.myFoldersContainer);
dojo.html.removeClass(_18ab,"twistyOpen");
dojo.html.addClass(_18ab,"twistyClosed");
}
this.onResized();
},toggleMyFolders:function(){
var show=dojo.html.isShowing(this.myFoldersContainer)?false:true;
this.showMyFolders(show);
},showCreateFolder:function(e){
this.showMyFolders(true);
dojo.html.show(this.createFolderNode);
this.createFolderInput.value=Config.Strings.NewFolder;
this.createFolderInput.select();
this.createFolderInput.focus();
var node=ws.WebSuite.NavEl;
var _18af=ws.style.getMarginBoxHeightFast(this.domNode);
node.scrollTop=_18af+ws.style.getMarginBoxHeightFast(this.createFolderNode);
e.stopPropagation();
},hideCreateFolder:function(){
if(dojo.html.isShowing(this.createFolderNode)){
dojo.html.hide(this.createFolderNode);
}
},onCreateFolderKeyPress:function(evt){
if(evt.keyCode==evt.KEY_ENTER){
this.createFolder();
}else{
if(evt.keyCode==evt.KEY_ESCAPE){
this.hideCreateFolder();
}
}
},createFolder:function(){
this._createFolder(this.createFolderInput.value,dojo.lang.hitch(this,"hideCreateFolder"));
},_createFolder:function(_18b1,okCB){
this.mailModel.createFolder({newName:_18b1,load:dojo.lang.hitch(this,function(data){
dojo.event.topic.publish("WSFeedbackStart",Config.Strings.FolderCreated,true);
if(okCB){
okCB();
}
}),error:function(err){
ws.widget.OkCancelDialog.alert(ws.string.substituteParams(Config.Strings.ErrorCreatingFolder,_18b1));
}});
},editFolder:function(_18b5,evt){
if(this.editFolderDialog){
this.editFolderDialog.show(_18b5);
if(evt){
evt.stopPropagation();
}
}else{
dojo.event.topic.publish("WSFeedbackStart",Config.Strings.Loading);
if(evt){
evt.stopPropagation();
}
dojo.lang.setTimeout(this,function(){
this.createEditFolderDialog();
this.editFolderDialog.show(_18b5);
dojo.event.topic.publish("WSFeedbackEnd",Config.Strings.Loading);
},0);
}
},createEditFolderDialog:function(){
this.editFolderDialog=dojo.widget.createWidget("ws:EditFolderDialog",null,document.body,"first");
this.editFolderDialog.setModel(this.mailModel);
},emptyFolder:function(_18b7,evt){
var _18b9=this.mailModel.getFolderByName(_18b7);
ws.widget.OkCancelDialog.alert(ws.string.substituteParams(Config.Strings.DeleteAllMessages,_18b9.displayName),dojo.lang.hitch(this,function(_18ba){
if(_18ba){
this.mailModel.emptyFolder({name:_18b7,error:function(err){
ws.widget.OkCancelDialog.alert(Config.Strings.ErrorEmptyFolder);
}});
}
}),true);
if(evt){
evt.stopPropagation();
}
},deleteFolder:function(_18bc){
var _18bd=this.mailModel.getFolderByName(_18bc);
var count=(_18bd.count==-1)?"":_18bd.count;
var msg=(Config.EnableIMAPFolderHierarchy)?ws.string.substituteParams(Config.Strings.DeleteHierarchyFolderConfirmation,_18bd.displayName):ws.string.substituteParams(Config.Strings.DeleteFolderConfirmation,_18bd.displayName,count);
ws.widget.OkCancelDialog.alert(msg,dojo.lang.hitch(this,function(_18c0){
if(_18c0){
this.mailModel.deleteFolder({load:dojo.lang.hitch(this,function(){
dojo.event.topic.publish("WSFeedbackStart",ws.string.substituteParams(Config.Strings.FolderDeleted,_18bd.displayName),true);
}),name:_18bd.name,error:function(err){
ws.widget.OkCancelDialog.alert(dojo.string.isBlank(err)?Config.Strings.DeleteFolderError:err);
}});
}
}),true);
},changeFolderReadState:function(read){
var uids=this.mailModel.activeCachedList.GetAllUIDs();
if(uids){
this.mailModel.changeMessagesReadState({uids:uids,read:read,error:function(err){
ws.widget.OkCancelDialog.alert(dojo.string.isBlank(err)?Config.Strings.MarkReadError:err);
}});
}
},newFolder:function(evt){
var _18c6=this.rightClickMenu["Mail"];
var _18c7=_18c6.children[7];
if(!this.newFolderInputMenu){
this.newFolderInputMenu=dojo.widget.createWidget("ws:wsinputablemenuitem",{okCB:dojo.lang.hitch(this,"_createFolder"),originalMenuItem:_18c7});
_18c6.addChild(this.newFolderInputMenu);
}
this.newFolderInputMenu.setText(Config.Strings.NewFolder);
_18c7.hide();
this.newFolderInputMenu.show();
this.newFolderInputMenu.input.select();
if(evt){
evt.stopPropagation();
}
},setCalendarModel:function(_18c8){
this.calendarModel=_18c8;
dojo.event.connectOnce(this.calendarModel,"modelUpdated",this,"updateCalendarList");
},updateCalendarList:function(){
var _18c9=this.calendarModel.getCalendarList();
var _18ca=this.calendarModel.calendarEnum;
if(!_18c9||!_18ca){
return;
}
var _18cb={};
for(var i=0;i<_18c9.length;i++){
var _18cd=_18c9[i];
var calid=_18cd[_18ca.id];
var _18cf=_18cd[_18ca.calType];
var color=_18cd[_18ca.color];
var _18d1=((_18cf==0)||(_18cf==1))?this.myCalendarsNode:this.subCalendarsNode;
var _18d2=_18cd[_18ca.displayName];
var _18d3=_18cd[_18ca.selected];
var el=this.calendarNodes[calid];
if(!el){
el=document.createElement("div");
el.className="navItem calendarNavItem";
dojo.event.connect(el,"onmouseover",ws.lang.hitch(this,this.onMouseOverCalItem,el));
dojo.event.connect(el,"onmouseout",ws.lang.hitch(this,this.onMouseOutCalItem,el));
_18d1.appendChild(el);
var icon="iconCB_"+color.substring(1)+(_18d3?"_checked":"");
var html="<div class=\"iconCB "+icon+"\"></div>"+"<div class=\"text\"><span>"+dojo.string.escapeXml(_18d2)+"</span></div>";
el.innerHTML=html;
var cb=dojo.html.getElementsByClass("iconCB",el)[0];
dojo.event.connect(cb,"onclick",ws.lang.hitch(this,this.toggleCalendarItem,calid));
var _18d8=dojo.html.getElementsByClass("text",el)[0];
dojo.event.connect(_18d8,"onclick",ws.lang.hitch(this,this.toggleCalendarItem,calid,cb));
var _18d9=document.createElement("span");
_18d9.className="ctrl wsLink";
_18d9.style.display="none";
_18d9.innerHTML=Config.Strings.NavEdit;
dojo.event.connect(_18d9,"onclick",ws.lang.hitch(this,"editCalendar",calid));
el.appendChild(_18d9);
var args=new Object();
args.type="Calendar";
args.showShare=((_18cf<2)&&Config.EnableCalendarSharingTab);
args.calId=calid;
dojo.event.connect(el,"oncontextmenu",ws.lang.hitch(this,this.onContextMenu,args));
if(_18cd[_18ca.writable]){
new ws.suite.NavigationDropTarget(el,this.DRAGTYPES_CALENDAR,this,calid);
}
this.calendarNodes[calid]=el;
}else{
var sel=el.childNodes[0];
var _18dc=sel.className.split(" ")[1];
var _18dd="iconCB_"+color.substring(1)+(_18d3?"_checked":"");
if(_18dc!=_18dd){
dojo.html.removeClass(sel,_18dc);
dojo.html.addClass(sel,_18dd);
}
sel=el.childNodes[1].childNodes[0];
var _18de=dojo.string.escapeXml(_18d2);
if(sel.innerHTML!=_18de){
sel.innerHTML=_18de;
}
}
_18cb[calid]=true;
}
for(var calid in this.calendarNodes){
if(!(calid in _18cb)){
dojo.dom.removeNode(this.calendarNodes[calid]);
delete this.calendarNodes[calid];
}
}
if(Config.EnableCalendarDirectoryURL&&Config.EventDirectoryURL){
if(null==this.calendarPromoLink.innerText||this.calendarPromoLink.innerText.length==0){
this.calendarPromoLink.href=Config.EventDirectoryURL;
ws.html.setInnerText(this.calendarPromoLink,Config.Strings.Cal_CalendarPanel_EventDirectoryLinkMsg);
}
}
},showCalendar:function(show){
if(show){
dojo.html.addClass(this.calendarContainer,"navItemHover");
dojo.html.show(this.calendarContainer);
ws.WebSuite.selectCalendarApp();
}else{
dojo.html.hide(this.calendarContainer);
}
},hideCalendar:function(){
if(this.calendarContainer){
dojo.html.hide(this.calendarContainer);
}
},editCalendar:function(calId,evt){
var _18e2=dojo.widget.byId("editCalendar");
if(!_18e2){
_18e2=dojo.widget.createWidget("ws:EditCalendar",{id:"editCalendar",editCalendar:true});
_18e2.setModel(ws.WebSuite.theCalendarModel);
ws.WebSuite.ViewWidget.addChild(_18e2);
}
if(_18e2.getCalId()!=calId){
if(_18e2.isShowing()){
_18e2.confirmSwitchEditCalendar(calId);
}else{
_18e2.setCalId(calId);
this.selectApp(this.APP_EDITCALENDAR);
}
}else{
if(!_18e2.isShowing()){
this.selectApp(this.APP_EDITCALENDAR);
}
}
if(evt){
evt.stopPropagation();
}
},showAddCalendar:function(){
ws.WebSuite.selectTab("addCalendar");
dojo.html.show(this.calendarContainer);
},showEditCalendar:function(){
ws.WebSuite.selectTab("editCalendar");
},addCalendar:function(e){
this.selectApp(this.APP_ADDCALENDAR);
e.stopPropagation();
},selectCalendar:function(calid){
var _18e5=this.calendarModel.calendars[calid];
var _18e6=this.calendarModel.calendarEnum;
if(_18e5[_18e6.selected]){
return;
}
var _18e7=false;
if(this.showCalendarIndexCB){
_18e7=this.showCalendarIndexCB();
}
var args=this.calendarModel.getCalendarArgs(_18e5,_18e7);
args.selected=true;
this.calendarModel.saveCalendar(args);
},selectThisCalendarOnly:function(_18e9){
var _18ea=this.calendarModel.calendarEnum;
for(var calid in this.calendarModel.calendars){
var cal=this.calendarModel.calendars[calid];
if(calid!=_18e9){
if(cal[_18ea.selected]){
var args=this.calendarModel.getCalendarArgs(cal,false);
args.selected=false;
this.calendarModel.saveCalendar(args);
}
}else{
if(!cal[_18ea.selected]){
var args=this.calendarModel.getCalendarArgs(cal,false);
args.selected=true;
this.calendarModel.saveCalendar(args);
}
}
}
},toggleCalendarItem:function(calid,icon,evt){
if(!evt){
evt=icon;
icon=evt.target;
}
var _18f1=icon.className.split(" ")[1];
var index=_18f1.indexOf("_checked");
var _18f3=(index==-1)?false:true;
var _18f4=!_18f3;
if(_18f3){
dojo.html.removeClass(icon,_18f1);
dojo.html.addClass(icon,_18f1.substring(0,index));
}else{
dojo.html.removeClass(icon,_18f1);
dojo.html.addClass(icon,_18f1+"_checked");
}
var _18f5=this.calendarModel.calendars[calid];
var _18f6=false;
if(this.showCalendarIndexCB){
_18f6=this.showCalendarIndexCB();
}
var args=this.calendarModel.getCalendarArgs(_18f5,_18f6);
args.selected=_18f4;
if(_18f6){
args.search=this.calendarModel.searchStr;
args.searchIn=null;
args.sortBy=null;
args.sortDir=null;
args.ignoreCache=false;
}
if(_18f4){
dojo.event.topic.publish("WSFeedbackStart",Config.Strings.Loading);
args.loadCallback=function(){
dojo.event.topic.publish("WSFeedbackEnd",Config.Strings.Loading);
};
args.errorCallback=function(){
dojo.event.topic.publish("WSFeedbackEnd",Config.Strings.Loading);
};
}
this.calendarModel.saveCalendar(args);
evt.stopPropagation();
},showContacts:function(){
ws.WebSuite.displayContactListView();
},displayContactListView:function(app){
if(app==this.selectedApp){
ws.WebSuite.displayContactListView();
}else{
this.selectApp(app);
}
},onMouseOverItem:function(item){
if(ws.WebSuite.Navigation.disableHover){
return;
}
dojo.html.addClass(item,"navItemHover");
var ctrls=dojo.html.getElementsByClass("ctrl",item);
if(ctrls.length>0){
dojo.html.show(ctrls[0]);
}
},onMouseOutItem:function(item){
if(ws.WebSuite.Navigation.disableHover){
return;
}
dojo.html.removeClass(item,"navItemHover");
var ctrls=dojo.html.getElementsByClass("ctrl",item);
if(ctrls.length>0){
dojo.html.hide(ctrls[0]);
}
},onMouseOverCalItem:function(item){
if(ws.WebSuite.Navigation.disableHover){
return;
}
var ctrls=dojo.html.getElementsByClass("ctrl",item);
if(ctrls.length>0){
dojo.html.show(ctrls[0]);
}
},onMouseOutCalItem:function(item){
if(ws.WebSuite.Navigation.disableHover){
return;
}
var ctrls=dojo.html.getElementsByClass("ctrl",item);
if(ctrls.length>0){
dojo.html.hide(ctrls[0]);
}
},handleRichtClickAction:function(_1901){
var args=this.rightClickMenuArgs;
switch(_1901){
case "renameFolder":
this.editFolder(args.folderName);
break;
case "emptyFolder":
this.emptyFolder(args.folderName);
break;
case "deleteFolder":
this.deleteFolder(args.folderName);
break;
case "markAllUnRead":
this.changeFolderReadState(false);
break;
case "markAllRead":
this.changeFolderReadState(true);
break;
case "newFolder":
this.newFolder();
break;
case "goToCalendar":
this.selectApp(this.APP_CALENDAR);
break;
case "addCalendar":
this.selectApp(this.APP_ADDCALENDAR);
break;
case "newEvent":
ws.WebSuite.getAddEditWidget(dojo.lang.hitch(this,function(){
ws.WebSuite.addEditDialog.setModel(this.parentWidget.calendarModel);
ws.WebSuite.addEditDialog.show();
}));
break;
case "selectThisCalendar":
var calId=args.calId;
this.selectCalendar(calId);
break;
case "selectThisCalendarOnly":
var calId=args.calId;
this.selectThisCalendarOnly(calId);
break;
case "shareCalendar":
var calId=args.calId;
this.editCalendar(calId);
break;
case "goToContacts":
this.displayContactListView(this.APP_CONTACTS);
break;
case "newContact":
ws.WebSuite.getAddEditWidget(dojo.lang.hitch(this,function(){
ws.WebSuite.displayNewContactView();
}));
break;
case "newDistList":
ws.WebSuite.getAddEditWidget(dojo.lang.hitch(this,function(){
ws.WebSuite.displayNewDistListView();
}));
break;
}
this.rightClickMenuArgs=null;
},defineMenus:function(){
this.rightClickMenuDefinition={"Mail":[{caption:Config.Strings.Rename,onClick:ws.lang.hitch(this,"handleRichtClickAction","renameFolder")},{caption:Config.Strings.Empty,onClick:ws.lang.hitch(this,"handleRichtClickAction","emptyFolder")},{caption:Config.Strings.Delete,onClick:ws.lang.hitch(this,"handleRichtClickAction","deleteFolder")},{separator:true},{caption:"",onClick:ws.lang.hitch(this,"handleRichtClickAction","markAllUnRead")},{caption:"",onClick:ws.lang.hitch(this,"handleRichtClickAction","markAllRead")},{separator:true}],"Contacts":[{caption:Config.Strings.GoToContacts,onClick:ws.lang.hitch(this,"handleRichtClickAction","goToContacts")},{separator:true},{caption:Config.Strings.NewContact,onClick:ws.lang.hitch(this,"handleRichtClickAction","newContact")},{caption:Config.Strings.NewDistList,onClick:ws.lang.hitch(this,"handleRichtClickAction","newDistList")}],"CalendarHead":[{caption:Config.Strings.GoToCalendar,onClick:ws.lang.hitch(this,"handleRichtClickAction","goToCalendar")},{separator:true},{caption:Config.Strings.AddCalendar,onClick:ws.lang.hitch(this,"handleRichtClickAction","addCalendar")},{caption:Config.Strings.NewEventBtn,onClick:ws.lang.hitch(this,"handleRichtClickAction","newEvent")}],"Calendar":[{caption:Config.Strings.ShowThisCalendar,onClick:ws.lang.hitch(this,"handleRichtClickAction","selectThisCalendar")},{caption:Config.Strings.ShowThisCalendarOnly,onClick:ws.lang.hitch(this,"handleRichtClickAction","selectThisCalendarOnly")},{caption:Config.Strings.ShareThisCalendar,onClick:ws.lang.hitch(this,"handleRichtClickAction","shareCalendar")},{separator:true},{caption:Config.Strings.AddCalendar,onClick:ws.lang.hitch(this,"handleRichtClickAction","addCalendar")},{caption:Config.Strings.NewEventBtn,onClick:ws.lang.hitch(this,"handleRichtClickAction","newEvent")}]};
},createRightClickMenu:function(type){
var _1905=this.rightClickMenuDefinition[type];
if(!_1905){
return;
}
this.rightClickMenu[type]=ws.widget.createMenu(_1905);
if(type=="Mail"){
var _1906=dojo.widget.createWidget("ws:WSMenuItem");
_1906.setCaption(Config.Strings.NewFolder);
_1906._onClick=dojo.lang.hitch(this,"newFolder");
var _1907=this.rightClickMenu[type];
_1907.addChild(_1906);
this.newFolderMenu=_1906;
}
return this.rightClickMenu[type];
},getRightClickMenu:function(type){
if(!this.rightClickMenu){
this.rightClickMenu=new Object();
}
var _1909=this.rightClickMenuDefinition[type];
if(!_1909){
return;
}
var menu=this.rightClickMenu[type];
if(!menu){
menu=this.createRightClickMenu(type);
}
return menu;
},updateRightClickMenu:function(menu){
var args=this.rightClickMenuArgs;
var _190d=Config.EnableKeepAsNewButton?Config.Strings.KeepAllAsNewLabel:Config.Strings.MarkAllUnreadLabel;
var _190e=Config.EnableKeepAsNewButton?Config.Strings.IgnoreAllLabel:Config.Strings.MarkAllReadLabel;
if(menu==this.rightClickMenu["Mail"]){
menu.children[4].setCaption(_190d);
menu.children[5].setCaption(_190e);
if(args.showEdit){
menu.children[0].setDisabled(false);
menu.children[2].setDisabled(false);
}else{
menu.children[0].setDisabled(true);
menu.children[2].setDisabled(true);
}
if(this.newFolderInputMenu){
this.newFolderInputMenu.restore();
}
}else{
if(menu==this.rightClickMenu["Calendar"]){
if(args.showShare){
menu.children[2].setDisabled(false);
}else{
menu.children[2].setDisabled(true);
}
}
}
},onContextMenu:function(args,e){
var type=args.type;
var _1912=this.getRightClickMenu(type);
if(!_1912){
return;
}
if(_1912.isShowingNow){
_1912.close();
}
this.rightClickMenuArgs=args;
var _1912=this.getRightClickMenu(type);
this.updateRightClickMenu(_1912);
_1912.open(e.pageX,e.pageY,null,[]);
dojo.event.browser.stopEvent(e);
}});
dojo.declare("ws.suite.NavigationDropTarget",dojo.dnd.DropTarget,{onDragOver:function(e){
if(!this.accepts(e.dragObjects,true)){
dojo.html.setClass(e.dragObjects[0].dragClone,"gridDragObjectBadDrop");
this.dragObjectClone=e.dragObjects[0].dragClone;
return false;
}
dojo.html.addClass(this.domNode,"navItemHover");
dojo.html.setClass(e.dragObjects[0].dragClone,"gridDragObjectGoodDrop");
this.dragObjectClone=e.dragObjects[0].dragClone;
return true;
},onDragMove:function(e,_1915){
},onDragOut:function(e){
dojo.html.removeClass(this.domNode,"navItemHover");
if(this.dragObjectClone){
dojo.html.setClass(this.dragObjectClone,"gridDragObjectNormal");
this.dragObjectClone=null;
}
},accepts:function(_1917,_1918){
var ret=ws.suite.NavigationDropTarget.superclass.accepts.apply(this,arguments);
if(!_1918){
return ret&&dojo.lang.every(_1917,function(o){
return o.type=="message";
});
}
return ret&&dojo.lang.every(_1917,function(o){
return o.type=="message";
})&&dojo.lang.inArray(this.parentWidget.mailModel.getFoldersCanMoveTo(),this.itemid);
},onDrop:function(e){
var _191d;
var c=ws.calendar.CalendarDragAndDrop;
switch(e.dragObject.type){
case c.TYPE_GRIDVIEWMOVE:
case c.TYPE_UNTIMEDVIEWMOVE:
case c.TYPE_COLUMNVIEWMOVE:
_191d=this.onDropCalendar(e);
break;
case "message":
_191d=this.onDropMessage(e);
break;
default:
_191d=false;
break;
}
this.onDragOut(e);
return _191d;
},onDropCalendar:function(e){
var ci=e.dragObject.dragSource.componentInstance;
if(ci==null){
return false;
}
var model=this.parentWidget.calendarModel;
var comp=model.components[ci[model.indexEnum.id]];
var _1923=comp[model.componentEnum.calid];
if(this.itemid==_1923){
return false;
}
var args=model.getComponentArgs(comp);
args.calid=this.itemid;
model.saveComponent(args);
return true;
},onDropMessage:function(e){
var row=e.dragObject.dragSource.rowIndex;
var model=this.parentWidget.mailModel;
var uid=model.getDatum(row,model.columns.UID);
var uids=model.isSelected(uid)?model.getSelectedUids():[uid];
try{
var _192a=e.target.textContent;
}
catch(e){
var _192a="";
}
model.moveMessages({uids:uids,destFolder:this.itemid,load:function(data){
if(!dojo.string.isBlank(_192a)){
if(uids.length==1){
dojo.event.topic.publish("WSFeedbackStart",ws.string.substituteParams(Config.Strings.MessageMoved,_192a),true);
}else{
dojo.event.topic.publish("WSFeedbackStart",ws.string.substituteParams(Config.Strings.MessagesMoved,uids.length,_192a),true);
}
}
},error:function(err){
ws.widget.OkCancelDialog.alert(dojo.string.isBlank(err)?"Error moving message(s).":err);
}});
return true;
}},function(node,types,_192f,_1930){
if(arguments.length==0){
return;
}
this.domNode=dojo.byId(node);
dojo.dnd.DropTarget.call(this);
if(types&&dojo.lang.isString(types)){
types=[types];
}
this.acceptedTypes=types||[];
this.parentWidget=_192f;
this.itemid=_1930;
this.dragObjectClone=null;
dojo.dnd.dragManager.registerDropTarget(this);
});
dojo.provide("ws.suite.PanelContainer");
dojo.widget.defineWidget("ws.suite.PanelContainer",dojo.widget.HtmlWidget,{templateString:"<div class=\"panelContainer\" id=\"${this.widgetId}\">\r\n\t<div class=\"quad\" dojoAttachPoint=\"quadNode\">\r\n\t\t<div class=\"label tl\" dojoAttachPoint=\"labelNodes\" dojoAttachEvent=\"onClick: onClickLabelTL\">\r\n\t\t\t<span class=\"corner cornerTL\"></span>\r\n\t\t\t<span dojoAttachPoint=\"textLabelNodes\"></span>\r\n\t\t</div>\r\n\t\t<div class=\"label tr\" dojoAttachPoint=\"labelNodes\" dojoAttachEvent=\"onClick: onClickLabelTR\">\r\n\t\t\t<span class=\"corner cornerTR\"></span>\r\n\t\t\t<span dojoAttachPoint=\"textLabelNodes\"></span>\r\n\t\t</div>\r\n\t\t<div class=\"label bl\" dojoAttachPoint=\"labelNodes\" dojoAttachEvent=\"onClick: onClickLabelBL\">\r\n\t\t\t<span class=\"corner cornerBL\"></span>\r\n\t\t\t<span dojoAttachPoint=\"textLabelNodes\"></span>\r\n\t\t</div>\r\n\t\t<div class=\"label br\" dojoAttachPoint=\"labelNodes\" dojoAttachEvent=\"onClick: onClickLabelBR\">\r\n\t\t\t<span class=\"corner cornerBR\"></span>\r\n\t\t\t<span dojoAttachPoint=\"textLabelNodes\"></span>\r\n\t\t</div>\r\n\t\t<div class=\"label br menu\" dojoAttachPoint=\"menuButton\" dojoAttachEvent=\"onClick: toggleMenu\">\r\n\t\t\t<span class=\"corner cornerBR\"></span>\r\n\t\t\t<span class=\"arrow\"></span>\r\n\t\t</div>\r\n\t</div>\r\n\t<div dojoType=\"ws:Advertisement\" adtype=\"paneltext\" id=\"PanelAd\" dojoAttachPoint=\"txtAdvertisement\"></div>\t\t\r\n\t<div dojoType=\"dojo:PageContainer\" layoutAlign=\"client\" dojoAttachPoint=\"pageContainer\"></div>\r\n</div>\r\n",templateCssString:".panelContainer\r\n{\r\n\theight: 100%;\r\n\twidth: 100%;\r\n\toverflow: hidden;\r\n}\r\n\r\n.panelContainer .quad\r\n{\r\n\theight: 50px;\r\n\tposition: relative;\r\n}\r\n\r\n.panelContainer .quad .label\r\n{\r\n\tposition: absolute;\r\n\tfont: normal 10px arial;\r\n\tbackground: url(\"${images}backgrounds.gif\") -0px -267px repeat-x;\r\n\twidth: 66px;\r\n\theight: 16px;\r\n\tborder: 1px solid #292929;\r\n\tcursor: pointer;\r\n\tpadding-top: 4px;\r\n\ttext-align: center;\r\n}\r\n.panelContainer .quad .tl\r\n{\r\n\ttop: 5px;\r\n\tleft: 9px;\r\n\tborder-left: none;\r\n}\r\n.panelContainer .quad .tr\r\n{\r\n\ttop: 5px;\r\n\tleft: 75px;\r\n\tborder-right: none;\r\n}\r\n.panelContainer .quad .bl\r\n{\r\n\ttop: 25px;\r\n\tleft: 9px;\r\n\tborder-left: none;\r\n}\r\n.panelContainer .quad .br\r\n{\r\n\ttop: 25px;\r\n\tleft: 75px;\r\n\tborder-right: none;\r\n}\r\n\r\n.panelContainer .quad .corner\r\n{\r\n\twidth: 4px;\r\n\theight: 20px;\r\n\tposition: absolute;\r\n\tbackground: url(\"${images}main.gif\");\r\n}\r\n.panelContainer .quad .cornerTL\r\n{\r\n\tleft: -4px;\r\n\ttop: -1px;\r\n\tbackground-position: -1127px -64px;\r\n\tborder-bottom: 1px solid #292929;\r\n}\r\n.panelContainer .quad .cornerTR\r\n{\r\n\tright: -4px;\r\n\ttop: -1px;\r\n\tbackground-position: -1142px -64px;\r\n\tborder-bottom: 1px solid #292929;\r\n}\r\n.panelContainer .quad .cornerBL\r\n{\r\n\ttop: 0px;\r\n\tleft: -4px;\r\n\tbackground-position: -1157px -64px;\r\n}\r\n.panelContainer .quad .cornerBR\r\n{\r\n\ttop: 0px;\r\n\tright: -4px;\r\n\tbackground-position: -1172px -64px;\r\n}\r\n\r\n.panelContainer .quad .label:hover,\r\n.panelContainer .quad .active\r\n{\r\n\tbackground-position: -0px -295px;\t\r\n}\r\n.panelContainer .quad .tl:hover .corner,\r\n.panelContainer .quad .active .cornerTL { background-position: -1187px -64px; }\r\n.panelContainer .quad .tr:hover .corner,\r\n.panelContainer .quad .active .cornerTR { background-position: -1202px -64px; }\r\n.panelContainer .quad .bl:hover .corner,\r\n.panelContainer .quad .active .cornerBL { background-position: -1217px -64px; }\r\n.panelContainer .quad .br:hover .corner,\r\n.panelContainer .quad .active .cornerBR { background-position: -1232px -64px; }\r\n\r\n.panelContainer .quad .menu\r\n{\r\n\tleft: 135px;\r\n\twidth: 6px;\r\n\theight: 20px;\r\n\tpadding: 0px;\r\n}\r\n.panelContainer .quad .menu .arrow\r\n{\r\n\theight: 5px;\r\n\twidth: 3px;\r\n\tbackground: url(\"${images}main.gif\") -1030px -20px;\r\n\tposition: absolute;\r\n\ttop: 7px;\r\n\tleft: 3px;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("../ws/suite/PanelContainer.css"),widgetsInTemplate:true,initializer:function(){
this.labelNodes=[];
this.textLabelNodes=[];
this.floatingPanelIndex=3;
this.panelConfig=dojo.lang.filter(ws.PanelConfig,function(cfg){
return cfg.enabled;
});
},postCreate:function(args,frag){
ws.suite.PanelContainer.superclass.postCreate.apply(this,arguments);
this.panels={};
var _1934=0;
var _1935=ws.lang.findByProp(this.panelConfig,"id",Settings.SelectedPanel||"");
if(_1935==-1){
_1935=0;
}
ws.WebSuite.ensureLayersLoaded(dojo.lang.hitch(this,function(){
this.getPanel(_1935);
}));
this.updateTabs(_1935);
for(var i=0;i<4&&i<this.panelConfig.length;i++){
ws.html.setInnerText(this.textLabelNodes[i],this.panelConfig[i].label||this.panelConfig[i].description);
}
this.txtAdvertisement.domNode.style.textAlign="left";
},getPanel:function(_1937){
if(this.panels[_1937]){
return this.panels[_1937];
}
var _1938=this.panelConfig[_1937];
var panel=null;
if(dojo.string.startsWith(_1938.type,"dojoWidget")){
if(_1938.widgetPrefix&&_1938.widgetNamespace){
dojo.registerNamespace(_1938.widgetPrefix,_1938.widgetNamespace);
}
if(_1938.widgetPrefix&&_1938.widgetURL){
dojo.registerModulePath(_1938.widgetNamespace,_1938.widgetURL);
}
for(var j=0;j<_1938.widgetRequires.length;j++){
dojo["require"](_1938.widgetRequires[j]);
}
panel=dojo.widget.createWidget(_1938.widgetName,_1938.widgetParams);
}else{
panel=dojo.widget.createWidget("dojo:ContentPane");
if(dojo.string.startsWith(_1938.type,"iframe")){
panel.setContent("<iframe style='width: 100%; height: 100%; border: 0px;' border=0 src='"+_1938.externalUrl+"'></iframe>");
}else{
if(dojo.string.startsWith(_1938.type,"html")){
panel.setContent(_1938.content);
}
}
}
this.panels[_1937]=panel;
this.pageContainer.addChild(panel);
return panel;
},onClickLabelTL:function(){
this.selectPanel(0);
},onClickLabelTR:function(){
this.selectPanel(1);
},onClickLabelBL:function(){
this.selectPanel(2);
},onClickLabelBR:function(){
this.selectPanel(this.floatingPanelIndex);
},selectPanel:function(_193b){
if(typeof _193b=="string"){
_193b=ws.lang.findByProp(this.panelConfig,"id",_193b);
}
var panel=this.getPanel(_193b);
this.pageContainer.selectChild(panel);
if(panel.grid){
panel.grid.refresh();
}
this.updateTabs(_193b);
ws.reporting.reportAction("Panel - "+this.panelConfig[_193b].id);
if(panel.onPanelSelected){
panel.onPanelSelected();
}
this.savePanelPrefs(this.panelConfig[_193b].id);
},updateTabs:function(_193d){
for(var i=0;i<3;i++){
ws.html.toggleClass(this.labelNodes[i],"active",i==_193d);
}
ws.html.toggleClass(this.labelNodes[3],"active",_193d>=3);
if(_193d>=3){
this.floatingPanelIndex=_193d;
ws.html.setInnerText(this.labelNodes[3],this.panelConfig[_193d].label);
}
},toggleMenu:function(){
if(!this.menu){
this.createMenu();
}
if(this.menu.isShowingNow){
this.menu.close();
}else{
this.menu.open(this.menuButton,this,null,{"BR":"TR"});
}
},createMenu:function(){
var items=[];
for(var i=0;i<this.panelConfig.length;i++){
items.push({caption:this.panelConfig[i].label,onClick:ws.lang.hitch(this,"selectPanel",i)});
}
this.menu=ws.widget.createMenu(items);
},panelPrefsTimeout:null,panelPrefsDelay:2000,savePanelPrefs:function(_1941){
if(_1941==Settings.SelectedPanelId){
return;
}
if(this.panelPrefsTimeout){
dojo.lang.clearTimeout(this.panelPrefsTimeout);
}
this.panelPrefsTimeout=dojo.lang.setTimeout(this,"_savePanelPrefs",this.panelPrefsDelay,_1941);
},_savePanelPrefs:function(_1942){
this.panelPrefsTimeout=null;
ws.io.rpc({action:"HiddenSettings",content:{SelectedPanelId:_1942},load:dojo.lang.hitch(this,function(data){
dojo.debug("savePanelPrefs: "+data.toSource());
}),error:dojo.lang.hitch(this,function(){
dojo.debug("savePanelPrefs error");
})});
},onResized:function(){
var _1944=dojo.html.getContentBox(this.domNode);
var _1945=dojo.html.getMarginBox(this.quadNode).height;
var _1946=dojo.html.getMarginBox(this.txtAdvertisement.domNode).height;
this.pageContainer.resizeTo(_1944.width,_1944.height-_1945-_1946);
}});
dojo.provide("ws.suite.TodayCurtain");
dojo.widget.defineWidget("ws.suite.TodayCurtain",dojo.widget.HtmlWidget,{blockedAdIds:[],toggle:"explode",toggleDuration:1000,enabled:Config.publishing.swm,templateString:"<div>\r\n\t<div class=\"todayCurtain\" dojoAttachPoint=\"curtainNode\">\r\n\t\t<div class=\"closeButton\" dojoAttachEvent=\"onClick: onClickCloseButton\">\r\n\t\t\t<img src=\"${spacer}\" class=\"icon\">\r\n\t\t\t${Close}\r\n\t\t</div>\r\n\t\t<div dojoAttachPoint=\"greetingDiv\">\r\n\t\t\t<span dojoAttachPoint=\"greetingNode\"></span>\r\n\t\t</div>\r\n\t\t<div dojoAttachPoint=\"iframeParentNode\" class=\"contentDiv\">\r\n\t\t\t<iframe dojoAttachPoint=\"iframe\" scrolling=\"auto\" frameBorder=\"no\" name=\"${this.widgetId}frame\" allowtransparency=\"true\"></iframe>\r\n\t\t</div>\r\n\t</div>\r\n\r\n\t<div class=\"todayCurtainRestorer\" dojoAttachEvent=\"onClick: restore\" dojoAttachPoint=\"restorerNode\" style=\"display: none;\">\r\n\t\t<img src=\"${spacer}\" class=\"icon\">\r\n\t\t${TodayOnAOL}\r\n\t</div>\r\n\t\r\n\t<div class=\"todayCurtainBackdropParent\" dojoAttachPoint=\"backdropParentNode\">\r\n\t\t<div class=\"backdrop\" dojoAttachEvent=\"onClick: onClickCloseButton\" dojoAttachPoint=\"backdropNode\"></div>\r\n\t</div>\r\n</div>\r\n",templateCssString:".todayCurtain {\r\n\tposition: absolute;\r\n\tbottom: 0px;\r\n\tright: 0px;\r\n\tbackground-color: #F3ECE0;\r\n\tpadding: 3px 8px;\r\n\tz-index: 902; /* needs to be higher than the splitter */\r\n\toverflow: visible;\r\n\ttext-align: center;\r\n\tborder-top: 1px solid #989FA7;\r\n\tborder-left: 1px solid #989FA7;\r\n}\r\n\r\n.dj_ie .todayCurtain .contentDiv {\r\n\tmargin-top: -8px;\t\r\n}\r\n\r\n.todayCurtain iframe {\r\n\theight: 265px;\r\n\twidth: 835px;\r\n\tborder: none;\r\n}\r\n\r\n.todayCurtain .closeButton {\r\n\tposition: absolute;\r\n\theight: 15px;\r\n\tpadding: 0px 8px; \r\n\ttop: -16px;\r\n\tleft: 45px;\r\n\tborder: 1px solid #989FA7;\r\n\tborder-bottom: none;\r\n\tcolor: #0055cc;\r\n\tbackground-color: #F3ECE0;\r\n\tfont-size: 11px;\r\n\tcursor: pointer;\r\n\ttext-align: center;\r\n\t-moz-border-radius: 4px 4px 0px 0px;\r\n}\r\n\r\n.todayCurtain .closeButton .icon {\r\n\twidth: 15px;\r\n\theight: 7px;\r\n\tvertical-align: middle;\r\n\tbackground: url(\"${images}main.gif\") -1005px -2px;\r\n\tmargin-top: -2px;\r\n}\r\n\r\n.todayCurtainRestorer {\r\n\tposition: absolute;\r\n\tleft: 190px;\r\n\tbottom: -16px;\r\n\tcolor: #0055cc;\r\n\tbackground-color: #F3ECE0;\r\n\theight: 15px;\r\n\tborder: 1px solid #989FA7;\r\n\tborder-bottom: none;\r\n\tfont-size: 11px;\r\n\tcursor: pointer;\r\n\tpadding: 1px 8px 0px;\r\n\tz-index: 1;\r\n\t-moz-border-radius: 4px 4px 0px 0px;\r\n}\r\n\r\n.todayCurtainRestorer .icon {\r\n\twidth: 13px;\r\n\theight: 6px;\r\n\tvertical-align: middle;\r\n\tbackground: url(\"${images}main.gif\") -990px -2px;\r\n\tmargin-top: -2px;\r\n}\r\n\r\n.todayCurtainBackdropParent {\r\n\tposition: absolute;\r\n\tbottom: 0px;\r\n\tright: 0px;\r\n\tz-index: 901;\r\n}\r\n\r\n.todayCurtainBackdropParent .backdrop {\r\n\tbackground-color: #FFFFFF;\r\n\theight: 100%;\r\n\twidth: 100%;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("../ws/suite/TodayCurtain.css"),postCreate:function(args,frag){
if(!this.enabled){
dojo.html.hide(this.curtainNode);
dojo.html.hide(this.restorerNode);
dojo.html.hide(this.backdropParentNode);
return;
}
dojo.lang.setTimeout(ws.lang.hitch(this,"blockAds",true),0);
if(ws.browser.docClickHandlerObj!=null){
dojo.event.connect(ws.browser.docClickHandlerObj,"onclick",this,"minimizeHandler");
}
dojo.html.setOpacity(this.backdropNode,0.4);
dojo.lang.setTimeout(this,"targetIframe",1000);
this.bgIframe=new dojo.html.BackgroundIframe(this.backdropParentNode);
this.bgIframe=new dojo.html.BackgroundIframe(this.curtainNode);
this.buildGreetingPane();
},buildGreetingPane:function(){
var _1949=dojo.html.getContentBox(this.iframe);
dojo.html.setStyleAttributes(this.greetingDiv,ws.string.substituteParams("width: {0}px; margin: 0px auto; padding-bottom: {1}px; text-align: left; font-size: 16px; font-weight: bold;",_1949.width,dojo.render.html.ie?8:0));
this.updateGreeting();
},updateGreeting:function(){
if(!Config.DefaultShowWelcomeString){
return;
}
var _194a=new Date().getHours();
var _194b=ws.io.getObjectCookie("csts").ausn;
var _194c="";
if((_194a>=0)&&(_194a<12)){
_194c=ws.string.substituteParams(Config.Strings.GoodMorning,_194b);
}else{
if((_194a>=12)&&(_194a<17)){
_194c=ws.string.substituteParams(Config.Strings.GoodAfternoon,_194b);
}else{
_194c=ws.string.substituteParams(Config.Strings.GoodEvening,_194b);
}
}
this.greetingNode.innerHTML=_194c;
},targetIframe:function(){
ws.html.recreateIframe(this.iframeParentNode,Config.WelcomePageURL);
},onClickCloseButton:function(){
ws.reporting.report("Close Today Curtain","Today");
this.minimize();
},minimizeHandler:function(e){
if(this.dontCloseYet){
return;
}
if(!(dojo.dom.isDescendantOf(e.target,this.curtainNode)||dojo.dom.isDescendantOf(e.target,this.backdropParentNode))){
this.minimize();
}
},minimize:function(){
this.notShowing=true;
if(ws.browser.docClickHandlerObj!=null){
dojo.event.disconnect(ws.browser.docClickHandlerObj,"onclick",this,"minimizeHandler");
}
var anim=dojo.lfx.propertyAnimation(this.curtainNode,{bottom:{start:0,end:-300}},1000,null,{onEnd:dojo.lang.hitch(this,"onMinimize")});
anim.play();
dojo.html.hide(this.backdropParentNode);
},onMinimize:function(){
this.notShowing=true;
ws.html.recreateIframe(this.iframeParentNode);
this.blockAds(false);
dojo.html.hide(this.curtainNode);
dojo.html.show(this.restorerNode);
var anim=dojo.lfx.propertyAnimation(this.restorerNode,{bottom:{start:-16,end:0}},500);
anim.play();
},restore:function(){
this.notShowing=false;
this.blockAds(true);
this.restorerNode.style.bottom="-16px";
dojo.html.hide(this.restorerNode);
dojo.html.show(this.curtainNode);
this.targetIframe();
this.updateGreeting();
var anim=dojo.lfx.propertyAnimation(this.curtainNode,{bottom:{start:-300,end:0}},1000,null,{onEnd:dojo.lang.hitch(this,"onRestore")});
anim.play();
},onRestore:function(){
this.notShowing=false;
if(ws.browser.docClickHandlerObj!=null){
dojo.event.connect(ws.browser.docClickHandlerObj,"onclick",this,"minimizeHandler");
}
dojo.html.show(this.backdropParentNode);
ws.reporting.report("Today Curtain","Today");
},blockAds:function(block){
if(this.blockedAdIds){
dojo.lang.forEach(this.blockedAdIds,function(id){
dojo.widget.byId(id).block(block);
});
}
},setSize:function(width,_1954){
if(!this.enabled){
return;
}
ws.style.setMarginBoxWidthFast(this.curtainNode,width);
dojo.html.setContentBox(this.backdropParentNode,{width:width-1,height:_1954});
this.bgIframe.onResized();
}});
dojo.provide("ws.suite.Hat");
dojo.widget.defineWidget("ws.suite.Hat",dojo.widget.HtmlWidget,{templateString:"<div class=\"WSHat\">\r\n\t<div class=\"topHat\" dojoAttachPoint=\"topHat\">\r\n\t\t<div class=\"salutation\">${Hi}, <span dojoattachpoint=\"lsnNode\"><span class=\"link\" dojoattachpoint=\"screenNameNode\"></span>&nbsp;\r\n\t\t\t<img dojoattachpoint=\"screenNameDropDownIcon\" src=\"${spacer}\" class=\"dropDownIcon\" style=\"display: none\">\r\n\t\t</span></div>\r\n\t\t<a href=\"${this.logoutUrl}\" class=\"signOutLink\">${SignOut} </a>\r\n\t\t<div class=\"hatLinkContainer\">\r\n\t\t\t<table cellpadding=\"0\" cellspacing=\"0\">\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td>\r\n\t\t\t\t\t\t<span class=\"hatLinks\" dojoattachpoint=\"hatLinksNode\"></span>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t\t<td dojoattachpoint=\"inputContainerUSOnly\">\r\n\t\t\t\t\t\t<input type=\"text\" name=\"query\" maxlength=\"256\" class=\"wsInput search\" value=\"${SearchWeb}\" dojoattachpoint=\"searchWebField\" dojoattachevent=\"onFocus: onFocusSearchWebField; onBlur: onBlurSearchWebField; onKeyPress: onKeyPressSearchWebField\" />\r\n\t\t\t\t\t</td>\r\n\t\t\t\t\t<td dojoattachpoint=\"hatLinkContainer\">\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t</table>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"logoArea\"  dojoAttachPoint=\"logoArea\">\r\n\t\t<img src=\"${images}hat_logo.gif\" class=\"logo\">\r\n\t\t<div class=\"logoLinks\"><a href=\"${this.whatsNewUrl}\" target=\"_blank\" style=\"display: none\">\r\n\t\t\t<img src=\"${spacer}\" class=\"newFeaturesIcon\">\r\n\t\t\t${NewFeature} </a>\r\n\t\t\t<div class=\"adminLinks\" style=\"padding-top: 5px\">\r\n\t\t\t\t&nbsp;<span dojoattachevent=\"onClick: onSettingsClick\" class=\"left link\">${Settings}</span> | <span dojoType=\"ws:WSDropDownLink\" dojoAttachEvent=\"onClick: onHelpClick\" dojoattachpoint=\"helpLink\" className=\"right\">${Help}</span>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"searchArea\" dojoattachpoint=\"searchAreaNode\">\r\n\t\t<input type=\"text\" name=\"query\" maxlength=\"256\" class=\"wsInput search\" value=\"${SearchMail}\" dojoattachpoint=\"searchField\" dojoattachevent=\"onFocus: onFocusSearchField; onBlur: onBlurSearchField; onKeyPress: onKeyPressSearchField\">\r\n\t\t<div dojotype=\"ws:WSSplitDropDownButton\" dojoattachpoint=\"searchAppButton\" viztype=\"Hat\" classname=\"searchAppButton\">${Mail}</div>\r\n\t</div>\r\n\t<div dojotype=\"ws:Advertisement\" adtype=\"messagelist\" dojoattachpoint=\"advertisement\" id=\"HatAd\"></div>\r\n\t<div class=\"msgListAdBug\" style=\"display:none\" dojoattachpoint=\"adBug\">\r\n\t\t<img dojoattachpoint=\"adBugImg\" src=\"about:blank\" />\r\n\t</div>\r\n</div>\r\n",templateCssString:"﻿#ws_hat\r\n{\r\n\theight: 116px;\r\n}\r\n\r\n.WSHat\r\n{\r\n\tposition: relative;\r\n\twidth: 100%;\r\n\theight: 115px;\r\n\tfont-size: 10px;\r\n\tcolor: #0066cc;\r\n\tbackground-image: url(\"${images}hatbackground.gif\");\r\n\tbackground-position: top top;\r\n\tbackground-repeat: repeat-x;\r\n\tborder-bottom: 1px solid #adaaa6;\r\n\tfont-family: verdana;\r\n}\r\n\r\n.WSHat .topHat\r\n{\r\n\tpadding: 5px 10px 5px 10px;\r\n\tborder-bottom: 1px solid #85817c;\r\n\theight: 16px;\r\n}\r\n\r\n.WSHat .topHat_ie6\r\n{\r\n\tpadding-bottom: 2px;\r\n}\r\n\r\n.WSHat .salutation\r\n{\r\n\tfloat: left;\r\n\tfont-weight: bold;\r\n\tmargin-right: 10px;\r\n}\r\n\r\n.WSHat .dropDownIcon\r\n{\r\n\tbackground: url(\"${images}main.gif\") -1022px -2px;\r\n\theight: 6px;\r\n\twidth: 11px;\t\r\n}\r\n\r\n.WSHat .signOutLink\r\n{\r\n\tfloat: left;\r\n}\r\n\r\n.WSHat .hatLinkContainer\r\n{\r\n\twidth: auto;\r\n\tfloat: right;\r\n\ttext-align: right;\r\n\twhite-space: nowrap;\r\n\tmargin-top: -2px;\r\n}\r\n\r\n.WSHat .hatLinkContainer .wsButtonHat .content\r\n{\r\n\tpadding: 1px 7px 1px 7px;\r\n\tmargin-top: 2px;\r\n\tmargin-left: 10px;\r\n\tmargin-right: 5px;\r\n}\r\n\r\n.WSHat .hatLinkContainer .wsButtonHat .arrow\r\n{\r\n\tpadding-right: 5px;\r\n\twidth: 11px;\r\n}\r\n\r\n.WSHat .hatLinkContainer .wsButtonHat .arrow img \r\n{\r\n\tmargin-top: 6px;\r\n}\r\n\r\n.WSHat .hatLinks\r\n{\r\n\twidth: auto;\r\n}\r\n\r\n.WSHat .hatLinkContainer .search\r\n{\r\n\tmargin-left: 8px;\r\n}\r\n\r\n.WSHat .hatLinkContainer .searchUSOnly\r\n{\r\n\twidth: 228px;\r\n\tmargin-top: 1px;\r\n\tpadding: 1px 2px 1px 6px;\r\n}\r\n\r\n.WSHat .hatLinkContainer .searchInputDiv .googleSearchImg\r\n{\r\n\twidth: 66px;\r\n\theight: 15px;\r\n\tmargin-top: 1px;\r\n\tbackground-image: url(\"${images}google_search.gif\");\r\n}\r\n\r\n.WSHat .hatLinkContainer .searchWebButtonStyles\r\n{\r\n\tmargin-right: 13px;\r\n\tmargin-left: -5px;\r\n\tfont-weight: bold;\r\n}\r\n\r\n.WSHat .hatLinkContainer .searchWebButtonStylesIE\r\n{\r\n\tmargin-right: 13px;\r\n\tmargin-left: -9px;\r\n\tfont-weight: bold;\r\n}\r\n\r\n.WSHat .logoArea\r\n{\r\n\tposition: absolute;\r\n\ttop: 30px;\r\n\theight: 57px;\r\n\twidth: 286px;\r\n}\r\n\r\n.WSHat .logo\r\n{\r\n\theight: 57px;\r\n\twidth: 157px;\r\n\tfloat: left;\r\n}\r\n\r\n.WSHat .logoLinks\r\n{\r\n\twidth: 127px;\r\n\ttext-align: center;\r\n\tfloat: left;\r\n\tpadding-top: 3px;\r\n}\r\n\r\n.WSHat .newFeaturesIcon\r\n{\r\n\twidth: 13px;\r\n\theight: 13px;\r\n\tvertical-align: middle;\r\n\tmargin-top: -4px;\r\n\tbackground: url(\"${images}main.gif\") -856px -31px;\r\n\tborder: none;\r\n}\r\n\r\n.WSHat .adminLinks\r\n{\r\n\tmargin-top: 17px;\r\n}\r\n\r\n.WSHat .searchArea\r\n{\r\n\tposition: absolute;\r\n\ttop: 82px;\r\n\tpadding: 7px 5px 7px 8px;\r\n\theight: 18px;\r\n\twidth: 350px;\r\n\toverflow: hidden;\r\n}\r\n\r\n.WSHat .hatLinkContainer input\r\n{\r\n\tfont: normal 11px verdana;\r\n\tcolor: #999999;\r\n\twidth: 158px;\r\n\tvertical-align: middle;\r\n\tborder: solid 1px #85817c;\r\n\tpadding: 0px 2px 0px 6px;\r\n\tmargin: -1px 1px 0px 0px;\r\n}\r\n\r\n\r\n.WSHat .searchArea input\r\n{\r\n\tfont: normal 11px verdana;\r\n\tcolor: #999999;\r\n\twidth: 158px;\r\n\tfloat: left;\r\n\tvertical-align: middle;\r\n\tborder: solid 1px #85817c;\r\n\tpadding: 2px 2px 2px 6px;\r\n\tmargin-right: 3px;\r\n}\r\n.WSHat .searchArea .wsButton\r\n{\r\n\tfloat: left;\r\n}\r\n.WSHat .searchArea .wsButton .content\r\n{\r\n\tpadding-bottom: 2px;\r\n}\r\n.WSHat .searchArea .searchAppButton\r\n{\r\n\tmargin-right: 6px;\r\n}\r\n.WSHat .searchArea .searchAppButton .content\r\n{\r\n\tpadding-right: 6px;\r\n}\r\n\r\n.WSHat .adFrameDiv\r\n{\r\n\tposition: absolute;\r\n\ttop: 25px;\r\n\tleft: 287px;\r\n\tbackground-image: none;\r\n}\r\n\r\n.WSHat a, .WSHat a:visited\r\n{\r\n\tcolor: #0066cc;\r\n\ttext-decoration: none;\r\n}\r\n.WSHat .wsLink { color: #0066cc; }\r\n.WSHat a:hover, .WSHat .link:hover\r\n{\r\n\ttext-decoration: underline;\r\n}\r\n.WSHat .link { cursor: pointer; }\r\n.WSHat .left { margin-right: 0px; }\r\n.WSHat .middle { margin-left: 2px; margin-right: 2px; }\r\n.WSHat .right {margin-left: 0px; }\r\n",templateCssPath:dojo.uri.dojoUri("../ws/suite/Hat.css"),widgetsInTemplate:true,minSearchAreaWidth:286,maxSearchFieldWidth:276,logoutUrl:Config.BaseCommonPagesURL+"Logout.aspx",whatsNewUrl:Config.WhatsNewURL,settingsWidget:null,mailModel:null,calendarModel:null,folderDataType:null,searchScope:"alltext",searchFieldColor:"#000000",fillInTemplate:function(){
if(this.showWebSearchPulldown()){
var _1955={id:"searchWebButton",vizType:"Hat"};
this.searchWebButton=this.createWebSearchPulldown(Config.Strings.Search,_1955,this.hatLinkContainer,"first",ws.lang.hitch(this,"searchWebPulldownClick",true),ws.lang.hitch(this,"searchWebUsingUrl",true,Config.Strings.Web),ws.lang.hitch(this,"searchWebUsingUrl",true,Config.Strings.Hat_Web_SearchOption1));
var _1955={id:"searchWebButton2",vizType:"Hat"};
this.searchWebButton2=this.createWebSearchPulldown(Config.Strings.Web,_1955,this.searchAreaNode,"third",ws.lang.hitch(this,"searchWebPulldownClick",false),ws.lang.hitch(this,"searchWebUsingUrl",false,Config.Strings.Web),ws.lang.hitch(this,"searchWebUsingUrl",false,Config.Strings.Hat_Web_SearchOption1));
}else{
if(Config.USOnlyHatSearchBar){
this.createUSOnlySearchBar();
var _1955={id:"searchWebButton",vizType:"Hat",className:"searchWebButtonStyles"};
_1955.className=dojo.render.html.ie?"searchWebButtonStylesIE":"searchWebButtonStyles";
this.searchWebButton=this.createWebSearchButton(Config.Strings.WebSearch,_1955,this.hatLinkContainer,"first",ws.lang.hitch(this,"searchWeb",true));
}else{
var _1955={id:"searchWebButton",vizType:"Hat"};
this.searchWebButton=this.createWebSearchButton(Config.Strings.Search,_1955,this.hatLinkContainer,"first",ws.lang.hitch(this,"searchWeb",true));
}
var _1955={id:"searchWebButton2",vizType:"Hat"};
this.searchWebButton2=this.createWebSearchButton(Config.Strings.Web,_1955,this.searchAreaNode,"third",ws.lang.hitch(this,"searchWeb",false));
}
if(dojo.render.html.ie60){
dojo.html.addClass(this.topHat,"topHat_ie6");
}
},createWebSearchPulldown:function(label,_1957,_1958,_1959,_195a,_195b,_195c){
var _195d=dojo.widget.createWidget("ws:WSSplitDropDownButton",_1957,_1958,_1959);
_195d.onClick=_195a;
_195d.setLabel(label);
_195d.menuDefinition=[{caption:Config.Strings.Web,separator:false,onClick:_195b},{caption:Config.Strings.Hat_Web_SearchOption1,separator:false,onClick:_195c}];
return _195d;
},createWebSearchButton:function(label,_195f,_1960,_1961,_1962){
var _1963=dojo.widget.createWidget("ws:WSButton",_195f,_1960,_1961);
_1963.onClick=_1962;
_1963.setLabel(label);
return _1963;
},createUSOnlySearchBar:function(){
dojo.html.replaceClass(this.searchWebField,"searchUSOnly","search");
dojo.html.setStyleAttributes(this.inputContainerUSOnly,"background-color: #D1E788; padding-top: 1px; padding-bottom: 2px;");
dojo.html.setStyle(this.hatLinksNode,"margin-right",7+"px");
dojo.html.setStyle(this.hatLinkContainer,"background-color","#D1E788");
dojo.html.setStyle(dojo.html.getParentByType(this.hatLinksNode,"td"),"text-align","left");
if(dojo.render.html.ie){
dojo.html.setStyle(this.searchWebField,"margin-left","3px");
}
if((screen.height<768)&&(screen.width<1024)){
dojo.html.setStyle(this.searchWebField,"width","185px");
}
},postCreate:function(args,frag){
ws.suite.Hat.superclass.postCreate.apply(this,arguments);
this.screenNameNode.innerHTML=ws.io.getObjectCookie("csts").ausn;
var _1966="";
for(var i=0;i<Config.HatLinks.length;i++){
var lnk=Config.HatLinks[i];
if(lnk.caption!="placeholder"){
var cls=(i==0)?"first":((i==Config.HatLinks.length-1)?"last":"middle");
var sep=(i==0)?"":" | ";
_1966+=ws.string.substituteParams("{0}<a href=\"{1}\" target=\"new\" class=\"{2}\">{3}</a>",sep,lnk.url,cls,dojo.string.escapeXml(lnk.caption));
}
}
this.hatLinksNode.innerHTML=_1966;
this.initButtons();
if(ws.UserContext.ParentalControls=="K"){
dojo.html.show(this.adBug);
this.adBugImg.src=Config.BaseResourcesURL+"images/AdBug.gif";
}
},initButtons:function(){
dojo.lang.forEach(Config.HelpMenuLinks,function(lnk){
if(lnk.title!="MailTour"){
lnk.onClick=ws.lang.hitch(ws.io,"openWindow",lnk.url);
}else{
var tour=Config.BaseResourcesURL+"tour/mailtour1.html?location="+encodeURIComponent(window.location.host+"/"+Config.PageLocale);
lnk.onClick=ws.lang.hitch(ws.io,"openWindow",tour,"","status=yes,resizable=yes,menubar=yes,scrollbars=yes,location=yes,toolbar=yes,top=50,left=50");
}
});
this.helpLink.menuDefinition=Config.HelpMenuLinks;
this.searchAppButton.menuDefinition=[{caption:Config.Strings.All,onClick:ws.lang.hitch(this,"setSearchScope","alltext",Config.Strings.All)},{caption:Config.Strings.Subject,onClick:ws.lang.hitch(this,"setSearchScope","subject",Config.Strings.Subject)},{caption:Config.Strings.Sender,onClick:ws.lang.hitch(this,"setSearchScope","fromto",Config.Strings.Sender)},{caption:Config.Strings.Calendar,onClick:ws.lang.hitch(this,"setSearchScope","calendar",Config.Strings.Calendar)}];
this.searchAppButton.onClick=ws.lang.hitch(this,"searchApp",this.searchScope);
dojo.event.connect(this.searchAppButton,"updateMenu",this,"updateSearchMenu");
},onResized:function(){
ws.suite.Hat.superclass.onResized.apply(this,arguments);
var _196d=dojo.html.getContentBox(this.domNode).width;
var _196e=dojo.html.getMarginBox(this.advertisement.domNode).width;
var _196f=Math.max(_196d-_196e,this.minSearchAreaWidth);
dojo.html.setMarginBox(this.searchAreaNode,{width:_196f});
var _1970=dojo.html.getMarginBox(this.logoArea).width;
this.advertisement.domNode.style.left=Math.max(_196f,_1970)+"px";
var _1971=dojo.html.getContentBox(this.searchAreaNode).width;
var _1972=dojo.html.getMarginBox(this.searchWebButton2.domNode).width;
var _1973=dojo.html.getMarginBox(this.searchAppButton.domNode).width+_1972;
var _1974=Math.min(_1971-_1973,this.maxSearchFieldWidth);
dojo.html.setMarginBox(this.searchField,{width:_1974});
},onFocusSearchField:function(){
if((this.searchField.value==Config.Strings.SearchMail)&&(this.searchField.style.color=="")){
this.searchField.value="";
}
this.searchField.style.color=this.searchFieldColor;
},clearSearchMailField:function(){
if(this.searchField.value==""){
this.searchField.style.color="";
this.searchField.value=Config.Strings.SearchMail;
}
},onBlurSearchField:function(){
this.clearSearchMailField();
},onKeyPressSearchField:function(evt){
if(evt.keyCode==evt.KEY_ENTER){
this.searchApp();
evt.preventDefault();
}
},onFocusSearchWebField:function(){
if(this.searchWebField.value==Config.Strings.SearchWeb){
this.searchWebField.value="";
}
this.searchWebField.style.color=this.searchFieldColor;
},onBlurSearchWebField:function(){
if(this.searchWebField.value==""){
this.searchWebField.style.color="";
this.searchWebField.value=Config.Strings.SearchWeb;
}
},onKeyPressSearchWebField:function(evt){
if(evt.keyCode==evt.KEY_ENTER){
if(this.showWebSearchPulldown()){
this.searchWebPulldownClick(true);
}else{
this.searchWeb(true);
}
evt.preventDefault();
}
},updateMenuCaptions:function(_1977,_1978,menu){
if(null!=menu&&((_1977!="calendar"&&_1978=="calendar")||(_1977=="calendar"&&_1978!="calendar"))){
if(_1978=="calendar"){
var _197a="{0}: {1}";
menu.children[0].setCaption(ws.string.substituteParams(_197a,Config.Strings.Mail,Config.Strings.All));
menu.children[1].setCaption(ws.string.substituteParams(_197a,Config.Strings.Mail,Config.Strings.Subject));
menu.children[2].setCaption(ws.string.substituteParams(_197a,Config.Strings.Mail,Config.Strings.Sender));
}else{
menu.children[0].setCaption(Config.Strings.All);
menu.children[1].setCaption(Config.Strings.Subject);
menu.children[2].setCaption(Config.Strings.Sender);
}
}
},setSearchScope:function(_197b,label){
var _197d=this.searchScope;
this.searchScope=_197b;
if(label==Config.Strings.Sender){
var _197e=this.mailModel.getCurrentFolder()||{};
var type=_197e.type;
label=(type=="Sent"||type=="Drafts"||type=="AutoSavedSent")?Config.Strings.Recipient:Config.Strings.Sender;
}
this.searchAppButton.setLabel(label);
this.updateMenuCaptions(_197d,_197b,this.searchAppButton.menu);
this.onResized();
},deferredInit:function(){
dojo.event.connect(this.mailModel,"modelUpdated",ws.lang.hitch(this,this.modelUpdated,"mail"));
this.updateLinkedScreenNames();
},deferredInitCal:function(){
dojo.event.connect(this.calendarModel,"searchUpdated",ws.lang.hitch(this,this.modelUpdated,"calendar"));
},searchStrUpdated:function(app){
var _1981=null;
if(app=="mail"){
_1981=this.mailModel.getSearchString();
}else{
if(app=="calendar"&&this.calendarModel!=null){
_1981=this.calendarModel.getSearchString();
}
}
if(_1981==null){
_1981="";
}
if(this.searchField.value!=_1981){
this.searchField.value=_1981;
this.clearSearchMailField();
if(this.searchField.value!=""){
this.searchField.style.color=this.searchFieldColor;
}
}
},updateMenuPulldown:function(menu){
var _1983=this.mailModel.getCurrentFolder()||{};
var type=_1983.type;
if(this.folderDataType==null||this.folderDataType!=type){
var _1985=(type=="Sent"||type=="Drafts"||type=="AutoSavedSent")?Config.Strings.Recipient:Config.Strings.Sender;
menu.children[2].setCaption(_1985);
this.folderDataType=type;
}
},modelUpdated:function(app){
this.searchStrUpdated(app);
},updateSearchMenu:function(menu){
var _1988=this.mailModel.allowAllTextSearch();
var _1989=menu.children[0];
ws.widget.setShowing(_1989,_1988);
this.updateMenuPulldown(menu);
},searchApp:function(){
if(this.settingsWidget!=null&&this.settingsWidget.isReallyShowing()){
this.settingsWidget.onExitSettings();
}
if(this.searchScope=="calendar"){
this.searchCalendar(this.searchScope);
}else{
this.searchMail(this.searchScope);
}
},searchMail:function(_198a){
if(this.searchMailCB&&this.searchField.style.color!=""){
this.searchMailCB(_198a,this.searchField.value);
}
},searchCalendar:function(_198b){
if(this.searchCalendarCB&&this.searchField.style.color!=""){
this.searchCalendarCB(_198b,this.searchField.value);
}
},launchAndReportSearchWindow:function(url,inHat){
ws.reporting.reportAction("Search Web via "+(inHat?"HAT":"HEADER"));
this.newhw=ws.io.openWindow(url);
dojo.lang.setTimeout(this,function(){
this.newhw.focus();
},50);
},searchWebPulldownClick:function(inHat){
var _198f=(inHat)?this.searchWebField.value:this.searchField.value;
var url=null;
if(!inHat&&this.searchWebButton2){
var _1991=this.searchWebButton2.getLabel();
var _1992=this.getWebSearchUrl(inHat,_1991);
url=_1992+encodeURIComponent(_198f);
}else{
url=(inHat?Config.WebSearchUrlHat:Config.WebSearchUrl)+encodeURIComponent(_198f);
}
this.launchAndReportSearchWindow(url,inHat);
},searchWeb:function(inHat){
var _1994="";
if(inHat){
if(this.searchWebField.style.color!=""){
_1994=this.searchWebField.value;
}
}else{
if(this.searchField.style.color!=""){
_1994=this.searchField.value;
}
}
var url=(inHat?Config.WebSearchUrlHat:Config.WebSearchUrl)+encodeURIComponent(_1994);
this.launchAndReportSearchWindow(url,inHat);
},getWebSearchUrl:function(inHat,_1997){
var url=(inHat?Config.WebSearchUrlHat:Config.WebSearchUrl);
switch(_1997){
case Config.Strings.Hat_Web_SearchOption1:
url=Config.WebSearchUrlOption1;
break;
default:
break;
}
return url;
},isDefaultSearchWebValue:function(_1999,inHat){
var b=false;
if(inHat){
b=(_1999==Config.Strings.SearchWeb);
}else{
b=(_1999==Config.Strings.Search);
}
return b;
},searchWebUsingUrl:function(inHat,_199d){
if(!inHat&&this.searchWebButton2){
if(!this.searchWebButton2.IsEqualsLabel(_199d)){
this.searchWebButton2.setLabel(_199d);
this.onResized();
}
}
var _199e=(inHat?this.searchWebField.value:this.searchField.value);
if(this.isDefaultSearchWebValue(_199e,inHat)){
_199e="";
}
var _199f=this.getWebSearchUrl(inHat,_199d);
var url=_199f+encodeURIComponent(_199e);
this.launchAndReportSearchWindow(url,inHat);
},showWebSearchPulldown:function(){
var ret=false;
if("en-in"==Config.PageLocale){
ret=true;
}
return ret;
},onSettingsClick:function(evt){
ws.WebSuite.ensureLayersLoaded(dojo.lang.hitch(this,function(){
var dmw=dojo.widget.byId("displayMessage");
if(dmw&&dmw.isShowing()&&dojo.render.html.safari){
dmw.backToList();
}
var _19a4=dojo.byId("ws_application");
var _19a5=dojo.byId("ws_settings");
dojo.html.hide(_19a4);
_19a5.style.top=ws.WebSuite.hatHeight+"px";
dojo.html.show(_19a5);
this.settingsWidget=dojo.widget.byId("settingsContainer");
if(this.settingsWidget==null){
this.settingsWidget=dojo.widget.createWidget("ws:SettingsContainer",{widgetId:"settingsContainer",settingsExitCallback:this.onSettingsExit},dojo.byId("ws_settingscontainer"));
}
ws.style.setMarginBoxWidthFast(this.settingsWidget.domNode,dojo.html.getViewport().width);
ws.style.setMarginBoxHeightFast(this.settingsWidget.domNode,dojo.html.getViewport().height-(ws.WebSuite.hatHeight+ws.WebSuite.footerHeight+(ws.WebSuite.spacerHeight*2)));
this.settingsWidget.show();
this.settingsWidget.onResized();
}));
},onSettingsExit:function(evt){
dojo.html.hide(dojo.byId("ws_settings"));
dojo.html.show(dojo.byId("ws_application"));
ws.WebSuite.repaintApplication();
ws.WebSuite.resize();
},onHelpClick:function(evt){
if(evt.shiftKey){
ws.io.openWindow(Config.BasePagesURL+"tools/Support.aspx");
}
if(evt.altKey&&Config.CreditsURL!=""){
ws.io.openWindow(Config.CreditsURL);
}
},updateLinkedScreenNames:function(){
ws.io.rpc({action:"GetScreenNames",load:dojo.lang.hitch(this,function(data){
this.screenNames=data.screenNames;
if(data.enabled){
if(!this.screenNameMenu){
this.screenNameMenu=dojo.widget.createWidget("ws:WSMenu");
dojo.body().appendChild(this.screenNameMenu.domNode);
this.screenNameMenu.bindDomNode(this.lsnNode);
}
this.screenNameMenu.destroyChildren();
if(this.screenNames.length>1){
for(var i=0;i<this.screenNames.length;i++){
var info=this.screenNames[i];
var item=dojo.widget.createWidget("ws:WSMenuItem",{caption:info.screenName});
item.onClick=ws.lang.hitch(this,"switchScreenName",info);
this.screenNameMenu.addChild(item);
}
item=dojo.widget.createWidget("ws:WSMenuSeparator");
this.screenNameMenu.addChild(item);
item=dojo.widget.createWidget("ws:WSMenuItem",{caption:Config.Strings.ManageScreenNamesText});
item.onClick=dojo.lang.hitch(this,"manageScreenNames");
this.screenNameMenu.addChild(item);
}else{
var _19ac=Config.Strings.LinkedAccountDescription+"<br><br><span class='wsLink'>"+Config.Strings.LinkedAccountLink+"</span>";
var item=dojo.widget.createWidget("ws:WSMenuItem",{caption:_19ac,width:150});
item.onClick=dojo.lang.hitch(this,"manageScreenNames");
this.screenNameMenu.addChild(item);
}
this.screenNameDropDownIcon.style.display="";
dojo.html.addClass(this.lsnNode,"link");
}
ws.settings.enableLinkedScreenName=data.enabled;
if(!ws.settings.enableLinkedScreenName){
dojo.html.removeClass(this.screenNameNode,"link");
}
}),error:function(err){
dojo.debug("GetScreenNames error:",err);
}});
},switchScreenName:function(info){
ws.io.rpc({action:"SwitchScreenName",content:{screenName:info.screenName},load:function(data){
if(data.url){
document.location.replace(data.url);
}else{
if(data.loginRequired){
ws.WebSuite.showLoginPanel(null,data.screenName,false);
}
}
},error:function(err){
ws.widget.OkCancelDialog.alert(dojo.string.isBlank(err)?"There was an error switching screen names.":err);
}});
},manageScreenNames:function(){
this.manageScreenNamesWindow=ws.io.openWindow(Config.ManageScreenNamesUrl,"","status=no,resizable=no,menubar=no,scrollbars=no,left=250,top=150,width=548,height=351");
if(this.manageScreenNamesWindow){
this.checkManageScreenNamesWindow();
}
},checkManageScreenNamesWindow:function(){
if(this.manageScreenNamesWindow.closed){
ws.widget.OkCancelDialog.alert(Config.Strings.ManageScreenNamesNotification);
this.manageScreenNamesWindow=null;
}else{
dojo.lang.setTimeout(this,"checkManageScreenNamesWindow",500);
}
}});
dojo.provide("ws.suite.Footer");
dojo.widget.defineWidget("ws.suite.Footer",dojo.widget.HtmlWidget,{templateString:"<div class=\"footer_container\">\r\n\t<div class=\"links\" dojoAttachPoint=\"linksNode\"></div>\r\n\t<div class=\"copyright\" dojoAttachPoint=\"copyright\"></div>\r\n\t<div class=\"feedback\" dojoAttachPoint=\"feedbackNode\" style=\"display: none;\">\r\n\t\t<nobr><img src=\"${spacer}\" align=\"absmiddle\" class=\"transitionIcon\" dojoAttachPoint=\"feedbackIcon\"><span dojoAttachPoint=\"feedbackTextNode\"></span></nobr>\r\n\t</div>\r\n\t<br style=\"clear: both;\">\r\n</div>\r\n",templateCssString:"﻿.footer_container\r\n{\r\n\tpadding: 3px 12px;\r\n\tfont-size: 10px;\r\n\tbackground-color: #f3efe6;\r\n\tz-index: 999;\r\n}\r\n\r\n.footer_container .links\r\n{\r\n\tfloat: left;\r\n}\r\n\r\n.footer_container .copyright\r\n{\r\n\tcolor: #666666;\r\n\tfloat: right;\r\n}\r\n\r\n.footer_container a\r\n{\r\n\tmargin-right: 12px;\r\n}\r\n\r\n.footer_container .feedback\r\n{\r\n\tbackground-color: #FEE097;\r\n\ttop: 0px;\r\n\twidth: 75px;\r\n\tmargin: 0px auto;\r\n\tpadding: 0px 8px 0px 9px;\r\n\t-moz-border-radius: 2px;\r\n}\r\n.footer_container .feedback .transitionIcon\r\n{\r\n\twidth: 7px;\r\n\theight: 7px;\r\n\tbackground: url(\"${images}savingAnimation.gif\");\r\n\tmargin-right: 5px;\r\n}\r\n.footer_container .feedback .persistentIcon\r\n{\r\n\twidth: 16px;\r\n\theight: 16px;\r\n\tbackground: url(\"${images}main.gif\") -825px -30px;\r\n\tmargin: 0px 5px 1px 0px;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("../ws/suite/Footer.css"),postCreate:function(){
this.copyright.innerHTML=ws.string.substituteParams(Config.Strings.Copyright,(new Date()).getFullYear());
var _19b1="";
for(var i=0;i<Config.FooterLinks.length;i++){
var lnk=Config.FooterLinks[i];
if(lnk.selfWindow){
_19b1+=ws.string.substituteParams("<a href=\"{0}\" class=\"wsLink\" target=\"_self\">{1}</a>",lnk.url,dojo.string.escapeXml(lnk.caption));
}else{
_19b1+=ws.string.substituteParams("<a href=\"{0}\" class=\"wsLink\" target=\"new\">{1}</a>",lnk.url,dojo.string.escapeXml(lnk.caption));
}
}
this.linksNode.innerHTML=_19b1;
this.feedbackDescriptions=[];
this.feedbackPersistence=[];
dojo.event.topic.subscribe("WSFeedbackStart",this,"onFeedbackStart");
dojo.event.topic.subscribe("WSFeedbackEnd",this,"onFeedbackEnd");
},onFeedbackStart:function(_19b4,_19b5){
if(!_19b5){
this.hideFeedback();
}
this.feedbackDescriptions.push(_19b4);
this.feedbackPersistence.push(_19b5);
this.updateFeedback();
},onFeedbackEnd:function(_19b6){
var idx=dojo.lang.find(this.feedbackDescriptions,_19b6);
if(idx!=-1){
this.feedbackDescriptions.splice(idx,1);
this.feedbackPersistence.splice(idx,1);
}
this.updateFeedback();
},updateFeedback:function(){
if(this.feedbackDescriptions.length==0){
dojo.html.hide(this.feedbackNode);
dojo.event.disconnect(document.documentElement,"onmousedown",this,"hideFeedback");
dojo.event.disconnect(document.documentElement,"onkeydown",this,"hideFeedback");
return;
}
var _19b8=this.feedbackDescriptions[this.feedbackDescriptions.length-1];
var _19b9=this.feedbackPersistence[this.feedbackPersistence.length-1];
dojo.html.show(this.feedbackNode);
ws.html.setInnerText(this.feedbackTextNode,_19b8);
if(_19b9){
dojo.html.setClass(this.feedbackIcon,"persistentIcon");
var width=dojo.html.getMarginBox(this.feedbackTextNode).width+dojo.html.getMarginBox(this.feedbackIcon).width;
}else{
dojo.html.setClass(this.feedbackIcon,"transitionIcon");
var width=dojo.html.getMarginBox(this.feedbackTextNode).width+dojo.html.getMarginBox(this.feedbackIcon).width;
}
dojo.html.setContentBox(this.feedbackNode,{width:width});
dojo.lang.setTimeout(this,function(){
dojo.event.connect(document.documentElement,"onmousedown",this,"hideFeedback");
dojo.event.connect(document.documentElement,"onkeydown",this,"hideFeedback");
},0);
},hideFeedback:function(){
dojo.debug("hideFeedback()");
if(this.feedbackDescriptions.length){
this.onFeedbackEnd(this.feedbackDescriptions[0]);
}
}});
dojo.provide("ws.suite.MiniLogin");
dojo.provide("ws.suite.MiniLoginDialog");
dojo.widget.defineWidget("ws.suite.MiniLogin",dojo.widget.HtmlWidget,{templateString:"<div>\r\n\t<div dojoType=\"dojo:Dialog\" dojoAttachPoint=\"dialogWidget\" bgColor=\"white\" bgOpacity=\"0.75\">\r\n\t\t<div class=\"miniLogin\">\r\n\t\t\t<div class=\"logoArea\">\r\n\t\t\t\t<img src=\"${images}hat_logo.gif\">\r\n\t\t\t</div>\r\n\t\t\t<div class=\"messageArea\" dojoAttachPoint=\"messageNode\"></div>\r\n\t\t\t<iframe dojoAttachPoint=\"loginFrame\" frameborder=\"0\" hspace=\"0\" marginheight=\"0\" marginwidth=\"0\" vspace=\"0\" height=\"196\" width=\"174\" scrolling=\"no\" allowtransparency=\"true\"></iframe> \t\t\t\t\t\r\n\t\t\t<!--\r\n\t\t\t<div>\r\n\t\t\t\t<a href=\"${this.snsHelpUrl}\" target=\"_blank\" class=\"wsLink\">${Help}</a>\r\n\t\t\t</div>\r\n\t\t\t-->\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n",templateCssString:".miniLogin {\r\n\twidth: 285px;\r\n\tbackground: #ffffff;\r\n\tborder: 1px solid #666666;\r\n\toverflow: auto;\r\n\tz-index: 300;\r\n\ttext-align: center;\r\n\tfont-weight: bold;\r\n}\r\n\r\n.miniLogin .logoArea {\r\n\theight: 60px;\r\n\tbackground: url(\"${images}hatbackground.gif\") 0px -25px;\r\n\ttext-align: left;\r\n}\r\n\r\n.miniLogin .messageArea {\r\n\tpadding: 8px;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("../ws/suite/MiniLogin.css"),widgetsInTemplate:true,snsHelpUrl:Config.SNSHelpUrl,miniSnsLoginUrl:"",isShowing:function(){
return this.dialogWidget.isShowing();
},show:function(msg,url,_19bd,_19be){
this.dialogWidget.show();
_19bd=_19bd?"novl":"n";
url=ws.string.substituteParams(url,encodeURIComponent(_19be),_19bd);
dojo.io.setIFrameSrc(this.loginFrame,url,true);
ws.html.setInnerText(this.messageNode,msg||"");
},moveOffscreen:function(){
this.originalTop=this.dialogWidget.domNode.style.top;
this.dialogWidget.domNode.style.top="-10000px";
},moveOnscreen:function(){
this.dialogWidget.domNode.style.top=this.originalTop;
},hide:function(){
this.dialogWidget.hide();
}});
dojo.kwCompoundRequire({common:["ws.suite.Navigation","ws.suite.PanelContainer","ws.suite.TodayCurtain","ws.suite.Hat","ws.suite.Footer","ws.suite.InlinePrefsDialog","ws.suite.MiniLogin"]});
dojo.provide("ws.suite.*");
dojo.provide("ws.mail.MessageStatusDialog");
dojo.widget.defineWidget("ws.mail.MessageStatusDialog",dojo.widget.HtmlWidget,{templateString:"<div>\r\n\t<div dojoType='dojo:Dialog' dojoAttachPoint='dialogWidget' bgColor='white' bgOpacity='0.75'>\r\n\t\t<div dojoType=\"dojo:ContentPane\" class=\"dialogContent\">\r\n\t\t\t<div dojoType=\"dojo:ContentPane\" class=\"dialogStatusesPane\">\r\n\t\t\t\t<div dojoAttachPoint=\"titleNode\" class=\"statusTitle\"></div>\r\n\t\t\t\t<div dojoAttachPoint=\"statusBodyNode\" class=\"statusBody\">\r\n\t\t\t\t\t<table>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td valign='top' align='left' dojoAttachPoint='statusNode'></td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t</table>\r\n\t\t\t\t</div>\t\t\t\t\r\n\t\t\t\t<div dojoAttachPoint=\"additionalStatuses\"></div>\r\n\t\t\t</div>\r\n\t\t\t<div dojoType=\"ws:WSToolbar\" dojoAttachPoint=\"statusToolbar\" vizType=\"Bare\">\r\n\t\t\t\t<div dojoAttachPoint = \"okButtonNode\" dojoType=\"ws:WSButton\" toolbarPosition=\"center\" vizType=\"Blue\" dojoAttachEvent=\"onClick: hide\">${OK}</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n",templateCssString:".dialogContent\r\n{\r\n\twidth: 300px;\r\n\tbackground: #FFF;\r\n\tborder: 1px solid #000;\r\n\tpadding: 14px 14px 6px 14px;\r\n\toverflow: hidden;\r\n}\r\n\r\n.dialogContent .dialogStatusesPane\r\n{\r\n\theight: 192px;\r\n\tmargin-bottom: 14px;\r\n\toverflow: auto;\r\n}\r\n\r\n.dialogContent .dialogStatusesPane .separatorDiv\r\n{\r\n\theight: 24px;\r\n}\r\n\r\n.dialogContent .dialogStatusesPane .statusTitle\r\n{\r\n\tfont-size: 14px;\r\n\tfont-weight: bold;\r\n}\r\n\r\n.dialogContent .dialogStatusesPane .statusBody\r\n{\r\n\tpadding-top: 6px;\r\n}\r\n",templateCssPath:dojo.uri.dojoUri("../ws/mail/MessageStatusDialog.css"),widgetsInTemplate:true,model:null,dateFormat:Config.Strings.MsgListShortDateFormat,multipleMsgs:false,additionalStatusHTML:"<div class=\"separatorDiv\"></div>"+"<div class=\"statusTitle\">{0}</div>"+"<div class=\"statusBody\">"+"\t<table>"+"\t\t<tr>"+"\t\t\t<td valign=\"top\" align=\"left\">{1}</td>"+"\t\t</tr>"+"\t</table>"+"</div>",show:function(_19bf,uids){
this.model.getMessageStatus({folder:_19bf,uids:uids,load:dojo.lang.hitch(this,"statusReceived"),error:dojo.lang.hitch(this,"statusError")});
this.titleNode.innerHTML="&nbsp;";
this.statusNode.innerHTML=Config.Strings.Loading;
this.additionalStatuses.innerHTML="";
this.multipleMsgs=false;
this.dialogWidget.show();
},hide:function(){
this.dialogWidget.hide();
},statusReceived:function(data){
if(data.status){
ws.html.setInnerText(this.statusNode,data.status);
return;
}
for(var i=0;i<data.allMessagesStatus.length;i++){
var _19c3=dojo.string.summary(dojo.string.escapeXml(data.allMessagesStatus[i].subject?data.allMessagesStatus[i].subject:""),30);
if(dojo.string.isBlank(_19c3)){
_19c3=Config.Strings.YourMessageNoCaps;
}
var _19c4="";
dojo.lang.forEach(data.allMessagesStatus[i].statuses,dojo.lang.hitch(this,function(s){
_19c4+=dojo.string.escapeXml(s.address);
_19c4+=" "+s.status;
if(s.time){
_19c4+=" "+ws.date.formatDateTime(new Date(s.time),this.dateFormat);
}
_19c4+="<br>";
}));
this.buildMessageStatusNode(_19c3,_19c4);
this.multipleMsgs=true;
}
this.statusToolbar.onResized();
this.okButtonNode.sizeMyself();
},buildMessageStatusNode:function(_19c6,_19c7){
if(this.multipleMsgs){
var _19c8=ws.string.substituteParams(Config.Strings.MessageStatusHeader,_19c6);
this.additionalStatuses.innerHTML+=ws.string.substituteParams(this.additionalStatusHTML,_19c8,_19c7);
}else{
ws.html.setInnerText(this.titleNode,ws.string.substituteParams(Config.Strings.MessageStatusHeader,_19c6));
this.statusNode.innerHTML=_19c7;
}
},statusError:function(err){
this.statusNode.innerHTML=dojo.string.isBlank(err)?Config.Strings.MessageStatusError:err;
}});
dojo.provide("ws.mail.MessageListView");
dojo.lang.declare("ws.mail.MessageGridModel",turbo.data.virtual,function(_19ca,model){
this.model=model;
dojo.event.connect(this.model,"changeRow",this,"change");
dojo.event.connect(this.model,"modelUpdated",this,"modelUpdated");
},{columns:{Select:0,Type:1,FromTo:2,Hover:3,Attachment:4,Subject:5,Received:6,Flag:7,Size:8},modelUpdated:function(){
},getRowCount:function(){
return this.model.getRowCount();
},get:function(row,col){
if(this.model.getRowCount()==0){
return "";
}
var data=this.model.getRowData(row);
if(data==null){
return (col==this.columns.Subject)?"...":"";
}
var uid=data[this.model.columns.UID];
var cell="Invalid Column";
switch(col){
case this.columns.Select:
cell=this.model.isSelected(uid)?"ON":"OFF";
break;
case this.columns.Type:
cell=this.model.getTypeName(data);
break;
case this.columns.FromTo:
var _19d1=data[this.model.columns.FromToAddress];
if(dojo.string.isBlank(_19d1)){
_19d1=Config.Strings.None;
}
cell=this.markupSearchString(_19d1);
break;
case this.columns.Hover:
cell=this.getHoverColumnCB?this.getHoverColumnCB(row):"";
break;
case this.columns.Attachment:
cell=data[this.model.columns.Attachment]?"ATTACHMENT":"NONE";
break;
case this.columns.Subject:
var _19d2=data[this.model.columns.Subject];
cell=(!dojo.string.isBlank(_19d2)?this.markupSearchString(dojo.string.escapeXml(_19d2)):Config.Strings.NoSubject);
break;
case this.columns.Received:
cell=ws.date.shortestDate(data[this.model.columns.Received]);
break;
case this.columns.Flag:
cell=data[this.model.columns.Flag]?"FLAGGED":"NONE";
break;
case this.columns.Size:
cell=this.getDisplaySize(data[this.model.columns.Size]);
break;
}
return cell;
},getDisplaySize:function(bytes){
var KB=1024;
var MB=1024*1024;
var GB=1024*1024*1024;
if(bytes<KB){
bytes=KB;
}
if(bytes<MB){
return Math.round(bytes/KB)+Config.Strings.KilobytesShort;
}
if(bytes<GB){
return Math.round(bytes/MB)+Config.Strings.MegabytesShort;
}
return Math.round(bytes/GB)+Config.Strings.GigabytesShort;
},getRow:function(row){
if(this.model.getRowCount()==0){
return "";
}
var data=this.model.getRowData(row);
if(data==null){
return ["","","","","","...","","",""];
}
var row=[];
var i=0;
for(var x in this.columns){
switch(i){
case this.columns.Select:
row[i]=this.model.isSelected(data[this.model.columns.UID])?"ON":"OFF";
break;
case this.columns.Type:
row[i]=this.model.getTypeName(data);
break;
case this.columns.FromTo:
var _19db=data[this.model.columns.FromToAddress];
if(dojo.string.isBlank(_19db)){
_19db=Config.Strings.None;
}
row[i]=this.markupSearchString(_19db);
break;
case this.columns.Hover:
row[i]=this.getHoverColumnCB?this.getHoverColumnCB(row):"";
break;
case this.columns.Attachment:
row[i]=data[this.model.columns.Attachment]?"ATTACHMENT":"NONE";
break;
case this.columns.Subject:
var _19dc=data[this.model.columns.Subject];
row[i]=(!dojo.string.isBlank(_19dc)?this.markupSearchString(dojo.string.escapeXml(_19dc)):Config.Strings.NoSubject);
break;
case this.columns.Received:
row[i]=ws.date.shortestDate(data[this.model.columns.Received]);
break;
case this.columns.Flag:
row[i]=data[this.model.columns.Flag]?"FLAGGED":"NONE";
break;
case this.columns.Size:
row[i]=this.getDisplaySize(data[this.model.columns.Size]);
break;
}
i++;
}
return row;
},markupSearchString:function(str){
var _19de=this.model.getSearchString();
if(_19de){
_19de=dojo.string.escapeXml(_19de);
var idx=str.toLowerCase().indexOf(_19de.toLowerCase());
if(idx!=-1){
var str1=str;
var strLc=str1.toLowerCase();
var _19e2=_19de.length;
var _19e3=_19de.toLowerCase();
var _19e4=new Array();
var sItem=strLc.indexOf(_19e3);
while(sItem!=-1){
_19e4[_19e4.length]=str1.substr(0,sItem);
_19e4[_19e4.length]="<span class='searchTerm'>"+str1.substr(sItem,_19e2)+"</span>";
str1=str1.substr(sItem+_19e2);
strLc=strLc.substr(sItem+_19e2);
sItem=strLc.indexOf(_19e3);
}
_19e4[_19e4.length]=str1;
str=_19e4.join("");
}
}
return str;
},getSortColumnIndex:function(_19e6){
var name="";
switch(_19e6){
case this.columns.Type:
name="Info";
break;
case this.columns.FromTo:
name="FromToAddress";
break;
case this.columns.Hover:
name="QuickAction";
break;
case this.columns.Attachment:
name="Attachment";
break;
case this.columns.Subject:
name="Subject";
break;
case this.columns.Received:
name="Received";
break;
case this.columns.Flag:
name="Flag";
break;
case this.columns.Size:
name="Size";
break;
}
return name;
},canSort:function(){
return true;
},sort:function(_19e8,_19e9){
var _19ea=this.getSortColumnIndex(Math.abs(_19e8)-1);
var dir=_19e8<0?"descending":"ascending";
this.model.sort(_19ea,dir);
}});
dojo.widget.defineWidget("ws.mail.MessageListView",ws.widget.ListView,{templateString:"<div>\r\n\t<div class=\"listView messageListView\" dojoType=\"ws:WSLayoutContainer\" deferred=\"true\" dojoAttachPoint=\"layoutWidget\">\r\n\t\t<div dojoType=\"ws:WSToolbar\" dojoAttachPoint=\"viewToolBar\" layoutAlign=\"top\">\r\n\t\t\t<div toolbarPosition=\"left\" dojoType=\"ws:WSButton\" border=\"right\" dojoAttachPoint=\"checkMailButton\">${CheckMail}</div>\r\n\t\t\t<div toolbarPosition=\"left\" dojoType=\"ws:WSButton\" border=\"right\" dojoAttachPoint=\"composeButton\">${Compose}</div>\r\n\t\t\t<div toolbarPosition=\"left\" dojoType=\"ws:WSDropDownButton\" border=\"right\" dojoAttachPoint=\"folderButton\">${MailFolders}</div>\r\n\t\t\t<div dojoType=\"ws:WSMenu\" dojoAttachPoint=\"folderMenuWidget\"></div>\r\n\t\t\t<div toolbarPosition=\"left\" dojoType=\"ws:WSButton\" border=\"right\" dojoAttachPoint=\"restoreButton\" dojoAttachEvent=\"onClick: onClickRestore\">${RestoreButton}</div>\r\n\t\t\t<div toolbarPosition=\"left\" dojoType=\"ws:WSButton\" border=\"right\" dojoAttachPoint=\"keepNewButton\" dojoAttachEvent=\"onClick: markMessagesUnread\">${KeepAsNewActionLabel}</div>\r\n\t\t\t<div toolbarPosition=\"left\" dojoType=\"ws:WSDropDownButton\" border=\"right\" dojoAttachPoint=\"actionButton\">${ActionButton}</div>\r\n\t\t\t<div toolbarPosition=\"left\" dojoType=\"ws:WSButton\" border=\"right\" dojoAttachPoint=\"deleteButton\" dojoAttachEvent=\"onClick: onClickDelete\">${DeleteButton}</div>\r\n\t\t\t<div toolbarPosition=\"left\" dojoType=\"ws:WSButton\" border=\"right\" dojoAttachPoint=\"spamButton\" dojoAttachEvent=\"onClick: reportSpam\">${ReportSpamButton}</div>\r\n\t\t\t<div toolbarPosition=\"left\" dojoType=\"ws:WSButton\" border=\"right\" dojoAttachPoint=\"notSpamButton\" dojoAttachEvent=\"onClick: reportNotSpam\">${NotSpamButton}</div>\r\n\t\t\t<div toolbarPosition=\"left\" dojoType=\"ws:WSButton\" border=\"right\" dojoAttachPoint=\"unsendButton\" dojoAttachEvent=\"onClick: onClickUnsend\">${UnsendButton}</div>\r\n\t\t\t<div toolbarPosition=\"right\" dojoType=\"ws:WSDropDownLink\" dojoAttachPoint=\"filterButton\" className=\"filterLink\"></div>\r\n\t\t</div>\r\n\t\t<div dojoType=\"dojo:ContentPane\" dojoAttachPoint=\"searchInfoPane\" class=\"searchInfo\" layoutAlign=\"top\" style=\"display: none;\">\r\n\t\t\t<span dojoAttachPoint=\"searchResultsNode\"></span>\r\n\t\t\t&nbsp;&nbsp;\r\n\t\t\t<span class=\"wsLink\" dojoAttachEvent=\"onClick: clearSearch\">${Clear}</span>\r\n\t\t</div>\r\n\t\t<div dojoAttachPoint=\"grid\" dojoType=\"TurboDataGrid\" layoutAlign=\"client\" defaultLeftWidth=\"0\"></div>\r\n\t</div>\r\n</div>\r\n",templateCssString:".messageListView .turbogrid-row { color: #000000; font-weight: bold; }\r\n.messageListView .row-read { color: #555555; font-weight: normal; }\r\n\r\n.messageListView .turbogrid-row .searchTerm {\r\n\tbackground-color: #c4f198;\r\n}\r\n\r\n.messageListView .ws_image_typeIcon\t\t{ background-position: -540px -0px; width: 12px; height: 11px; margin:1px 0px 0px 0px; }\r\n\r\nbody .messageListView .ws_image_fSeen\t{ background-position: -1140px -0px; width: 11px; }\r\n.messageListView .ws_image_attachIcon,\r\n.messageListView .ws_image_fAttachment\t\t{ background-position: -615px -0px;\t}\r\n.messageListView .ws_image_flagIcon,\r\n.messageListView .ws_image_fFlagged\t\t{ background-position: -720px -0px;\t}\r\n.messageListView .ws_image_fAnswered\t\t{ background-position: -480px -0px;\t}\r\n.messageListView .ws_image_fOfficial\t\t{ background-position: -855px -0px;\t}\r\n.messageListView .ws_image_fPriority\t\t{ background-position: -855px -0px;\t}\t\t\r\n.messageListView .ws_image_fBillpay\t\t{ background-position: -780px -0px;\t}\r\n.messageListView .ws_image_fVoicemail\t\t{ background-position: -412px -63px;\t}\r\n\r\n.messageListView .ws_image_fUnflagged { display: none; }\r\n.messageListView .turbogrid-row-over .ws_image_fUnflagged { display: inline; background-position: -675px -0px; }\r\n.messageListView .ws_image_fUnflagged:hover { display: inline; background-position: -765px -0px; }\r\n\r\n.messageListView .searchInfo {\r\n\tbackground-color: #c4f198;\r\n\tpadding: 5px 7px;\r\n\tborder-bottom: 1px solid #d8d6d3;\r\n}\r\n\r\n.messageListView .filterLink {\r\n\tpadding: 7px 15px 0px 0px;\r\n}\r\n.messageListView .filterLink .wsLink {\r\n\tcolor: #000000;\r\n\tfont-size: 11px;\r\n}\r\n\r\n.messageListView .turbogrid-header-sort-up \r\n{\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tbackground-position: right -96px;\r\n\tbackground-color:  #e4edfa !important;\r\n\theight: 16px;\r\n\tpadding: 4px 0px 2px 3px;\r\n\tmargin: 0px 0px 0px 0px;\r\n}\r\n\r\n.messageListView .turbogrid-header-sort-down \r\n{\r\n\tbackground-image: url(\"${images}main.gif\");\r\n\tbackground-position: right -111px;\r\n\tbackground-color:  #e4edfa !important;\r\n\theight: 16px;\r\n\tpadding: 4px 0px 2px 3px;\r\n\tmargin: 0px 0px 0px 0px;\r\n}\r\n\r\n.messageListView .turbogrid-header-sort-none \r\n{\r\n\tbackground-color: Transparent !important;\r\n\theight: 16px;\r\n\tpadding: 4px 0px 2px 3px;\r\n\tmargin: 0px 0px 0px 0px;\r\n}\r\n\r\n.messageListView .turbogrid-header-cell \r\n{\r\n\tpadding: 0px 0px 0px 0px !important;\r\n\tmargin: 0px 0px 0px 0px !important;\r\n}\r\n\r\n\r\n.messageListView .turbogrid-header-col \r\n{\r\n\tpadding: 0px 0px 0px 0px !important;\r\n\tmargin: 0px 0px 0px 0px !important;\r\n}\r\n\r\n.messageListView .ws_image_chkOnIcon\t{ margin: 0px 0px 0px 0px !important;}\r\n.messageListView .ws_image_chkOffIcon\t{ margin: 0px 0px 0px 0px !important;}\r\n.messageListView .ckoffCol\t\t\t\t{ margin-left:1px;\t}\r\n.messageListView .ckonCol\t\t\t\t{ margin-left:1px;\t}\r\n\r\n",templateCssPath:dojo.uri.dojoUri("../ws/mail/MessageListView.css"),hoverColumnHtml:"<div class=\"hoverControl trashHover\"></div><div class=\"hoverControl quickActionHover\"></div>",speedUp:true,wrapperModelClass:ws.mail.MessageGridModel,currentSearchIn:"alltext",rowHeight:23,reportingTab:"Mail",reportingSortName:"Sort Messages",reportingScrollName:"Scroll Messages",showCheckMailButton:false,showComposeButton:false,showFolderMenuDropDown:false,showActionButton:true,showDeleteButton:true,showSpamButton:true,showSearchPane:true,showSearchButton:true,showFilterButton:true,columnDefaults:{Select:{order:0,width:18,hidden:false},Type:{order:1,width:18,hidden:false},FromTo:{order:2,width:150,hidden:false},Hover:{order:3,width:30,hidden:false},Attachment:{order:4,width:18,hidden:false},Subject:{order:5,width:250,hidden:false},Received:{order:6,width:115,hidden:false},Flag:{order:7,width:18,hidden:false},Size:{order:8,width:45,hidden:true}},initView:function(){
this.initColumns();
this.defineMenus();
ws.mail.MessageListView.superclass.initView.apply(this,arguments);
dojo.event.connect(this.model,"modelUpdated",this,"modelUpdated");
dojo.event.connect(this.model,"folderListChanged",this,"updateActionMenu");
dojo.event.connect(this.model,"newMailReceived",this,"playNewMailSound");
dojo.event.connect(ws.WebSuite,"processKeyPress",this,"onKeyPress");
dojo.event.connect(this.composeButton,"onClick",this,"composeNewMessage");
dojo.event.connect(this.checkMailButton,"onClick",this,"checkMail");
this.initButtons();
new ws.widget.GridDragSource(this.grid.contentNode,"message",this);
dojo.event.topic.subscribe("Splitter/collapse",this,"onSplitterCollapse");
},initColumns:function(_19ec){
this.columns=[];
var _19ed=this.gridModel.columns;
var prefs=dojo.json.evalJson(Settings.MessageListPrefs);
if(_19ec||!prefs||prefs==""||prefs===Settings.MessageListPrefs){
prefs=this.columnDefaults;
}
try{
_19ed.Select=prefs.Select.order;
_19ed.Type=prefs.Type.order;
_19ed.FromTo=prefs.FromTo.order;
_19ed.Hover=prefs.Hover.order;
_19ed.Attachment=prefs.Attachment.order;
_19ed.Subject=prefs.Subject.order;
_19ed.Received=prefs.Received.order;
_19ed.Size=prefs.Size.order;
_19ed.Flag=prefs.Flag.order;
var _19ef={Select:"<img src='"+Config.SpacerImageURL+"' class='gridIcon ws_image_chkOffIcon' />",Type:"<img src='"+Config.SpacerImageURL+"' class='gridIcon ws_image_typeIcon' />",FromTo:Config.Strings.From,Hover:" ",Attachment:"<img src='"+Config.SpacerImageURL+"' class='gridIcon ws_image_attachIcon' />",Subject:Config.Strings.Subject,Received:Config.Strings.Date,Flag:"<img src='"+Config.SpacerImageURL+"' class='gridIcon ws_image_flagIcon' />",Size:Config.Strings.Size};
this.columns[_19ed.Select]=[turbo.grid.columns.sprite,{caption:_19ef.Select,align:"center",width:prefs.Select.width,hidden:prefs.Select.hidden,sprites:this.baseSprites.chkBox,canResize:false,sortable:false}];
this.columns[_19ed.Type]=[turbo.grid.columns.sprite,{caption:_19ef.Type,align:"center",width:prefs.Type.width,hidden:prefs.Type.hidden,sprites:this.sprites.type,canResize:false,sortable:false}];
this.columns[_19ed.FromTo]=[turbo.grid.format.text,{caption:_19ef.FromTo,align:"left",width:prefs.FromTo.width,hidden:prefs.FromTo.hidden}];
this.columns[_19ed.Hover]=[turbo.grid.format.text,{caption:_19ef.Hover,align:"center",width:prefs.Hover.width,hidden:prefs.Hover.hidden,canResize:false,sortable:false}];
this.columns[_19ed.Attachment]=[turbo.grid.columns.sprite,{caption:_19ef.Attachment,align:"center",width:prefs.Attachment.width,hidden:prefs.Attachment.hidden,sprites:this.sprites.attach,canResize:false,sortable:true}];
this.columns[_19ed.Subject]=[turbo.grid.format.text,{caption:_19ef.Subject,align:"left",width:prefs.Subject.width,hidden:prefs.Subject.hidden}];
this.columns[_19ed.Received]=[turbo.grid.format.text,{caption:_19ef.Received,align:"left",width:prefs.Received.width,hidden:prefs.Received.hidden}];
this.columns[_19ed.Flag]=[turbo.grid.columns.sprite,{caption:_19ef.Flag,align:"center",width:prefs.Flag.width,hidden:prefs.Flag.hidden,sprites:this.sprites.flag,canResize:false,sortable:true}];
this.columns[_19ed.Size]=[turbo.grid.format.text,{caption:_19ef.Size,align:"left",width:prefs.Size.width,hidden:prefs.Size.hidden,canResize:true,sortable:true}];
this.columnMenuSpec=[{caption:Config.Strings.ColumnInfo,checked:false,onClick:ws.lang.hitch(this,"toggleColumn",_19ed.Type)},{caption:Config.Strings.From,checked:false,onClick:ws.lang.hitch(this,"toggleColumn",_19ed.FromTo)},{caption:Config.Strings.ColumnQuick,checked:false,onClick:ws.lang.hitch(this,"toggleColumn",_19ed.Hover)},{caption:Config.Strings.Attachments,checked:false,onClick:ws.lang.hitch(this,"toggleColumn",_19ed.Attachment)},{caption:Config.Strings.Subject,checked:false,onClick:ws.lang.hitch(this,"toggleColumn",_19ed.Subject)},{caption:Config.Strings.Date,checked:false,onClick:ws.lang.hitch(this,"toggleColumn",_19ed.Received)},{caption:Config.Strings.ColumnFlag,checked:false,onClick:ws.lang.hitch(this,"toggleColumn",_19ed.Flag)},{caption:Config.Strings.Size,checked:false,onClick:ws.lang.hitch(this,"toggleColumn",_19ed.Size)},{separator:true},{caption:Config.Strings.ColumnReset,onClick:ws.lang.hitch(this,"toggleColumn","RESET")}];
this.autosizeColumnIndex=_19ed.Subject;
this.grid.header.setSortColumn(_19ed.Received);
this.grid.header.sortDesc=true;
this.grid.header.leftPad=1;
}
catch(e){
if(!_19ec){
this.initColumns(true);
}
dojo.debug("Error initializing message list columns.");
}
},onHeaderColumnChange:function(){
var prefs={};
for(var i=0;i<this.grid.columns.count();i++){
var _19f2=this.gridModel.columns;
var col=this.grid.columns.get(i);
var _19f4={order:i,width:col.width,hidden:col.hidden};
switch(col.key){
case _19f2.Select:
prefs.Select=_19f4;
break;
case _19f2.Type:
prefs.Type=_19f4;
break;
case _19f2.FromTo:
prefs.FromTo=_19f4;
break;
case _19f2.Hover:
prefs.Hover=_19f4;
break;
case _19f2.Attachment:
prefs.Attachment=_19f4;
break;
case _19f2.Subject:
prefs.Subject=_19f4;
break;
case _19f2.Received:
prefs.Received=_19f4;
break;
case _19f2.Flag:
prefs.Flag=_19f4;
break;
case _19f2.Size:
prefs.Size=_19f4;
break;
}
}
if(!ws.WebSuite.isPanelSplitterInitializing){
this.saveGridPrefs({MessageListPrefs:prefs});
}else{
ws.WebSuite.isPanelSplitterInitializing=false;
}
},onHeaderContextMenu:function(e){
dojo.event.browser.stopEvent(e);
var i=this.gridModel.columns;
var menu=this.columnMenuSpec;
menu[0].checked=!this.columns[i.Type][1].hidden;
menu[1].checked=!this.columns[i.FromTo][1].hidden;
menu[2].checked=!this.columns[i.Hover][1].hidden;
menu[3].checked=!this.columns[i.Attachment][1].hidden;
menu[4].checked=!this.columns[i.Subject][1].hidden;
menu[5].checked=!this.columns[i.Received][1].hidden;
menu[6].checked=!this.columns[i.Flag][1].hidden;
menu[7].checked=!this.columns[i.Size][1].hidden;
var menu=ws.widget.createMenu(menu);
if(menu.isShowingNow){
menu.close();
}
menu.open(e.pageX,e.pageY,null,[]);
},toggleColumn:function(_19f8,_19f9){
if(_19f8=="RESET"){
this.initColumns(true);
}else{
this.columns[_19f8][1].width=this.grid.header.columns.get(_19f8).width;
if(typeof (_19f9)=="undefined"){
var _19f9=!this.columns[_19f8][1].hidden;
}
this.columns[_19f8][1].hidden=_19f9;
}
this.grid.setColumns(this.columns);
this.onHeaderColumnChange();
this.autosizeColumnWidth=0;
this.updateGrid();
},onSplitterCollapse:function(_19fa){
if(_19fa.id=="ws_panelsplitter"){
this.toggleColumn(this.gridModel.columns.Size,!_19fa.isCollapsed);
}
},modelUpdated:function(){
this.updateFilterButton();
this.updateSearchInfo();
this.updateColumnCaptions();
this.buildFolderList();
this.maybePlayYgmSound();
this.layout();
},composeNewMessage:function(){
},checkMail:function(){
},buildFolderList:function(){
},initButtons:function(){
if(!this.showCheckMailButton){
this.checkMailButton.hide();
}
if(!this.showComposeButton){
this.composeButton.hide();
}
if(!this.showFolderMenuDropDown){
this.folderButton.hide();
}
if(!this.showActionButton){
this.actionButton.hide();
}
if(!this.showDeleteButton){
this.deleteButton.hide();
}
if(!this.showSpamButton||!Config.EnableSpamButton){
this.spamButton.hide();
}
if(!this.showSearchPane){
this.searchPane.hide();
}
if(!this.showFilterButton){
this.filterButton.hide();
}
this.folderButton.menu=this.folderMenuWidget;
},updateToolbarState:function(){
if(!this.model){
return;
}
var _19fb=this.model.getCurrentFolder();
var _19fc=_19fb?_19fb.name.toLowerCase():"inbox";
var _19fd=(_19fc in Config.FolderButtons)?Config.FolderButtons[_19fc]:Config.FolderButtons.other;
this.buttonViz=dojo.lang.map(_19fd.split(","),function(s){
return dojo.string.trim(s)=="true";
});
if(Config.EnableSpamButton){
ws.widget.setShowing(this.spamButton,this.buttonViz[4]);
}else{
ws.widget.setShowing(this.spamButton,0);
}
ws.widget.setShowing(this.notSpamButton,this.buttonViz[5]);
ws.widget.setShowing(this.restoreButton,this.buttonViz[8]);
if(Config.EnableUnsendButton){
ws.widget.setShowing(this.unsendButton,this.buttonViz[10]);
}else{
ws.widget.setShowing(this.unsendButton,0);
}
ws.widget.setShowing(this.keepNewButton,this.buttonViz[12]);
var _19ff=this.model.getSelectedUids().length>0;
var _1a00=[this.keepNewButton,this.actionButton,this.deleteButton,this.spamButton,this.notSpamButton,this.restoreButton];
dojo.lang.forEach(_1a00,function(btn){
ws.widget.setEnabled(btn,_19ff);
});
ws.widget.setEnabled(this.unsendButton,this.model.getSelectedUids().length==1);
var _1a02=this.model.getSearchString()!=null;
ws.widget.setShowing(this.filterButton,!_1a02);
},updateColumnCaptions:function(){
var _1a03=this.model.getCurrentFolder()||{};
var type=_1a03.type;
var _1a05=(type=="Sent"||type=="Drafts"||type=="AutoSavedSent")?Config.Strings.To:Config.Strings.From;
var _1a06=this.keyToColIndex(this.gridModel.columns.FromTo);
this.grid.header.columns.get(_1a06).caption=_1a05;
},displayFolder:function(name){
this.model.setFolder(name);
},clearSearch:function(){
this.model.search(null);
},updateSearchInfo:function(){
var _1a08=this.model.getSearchString();
if(_1a08){
var count=Math.max(this.model.getRowCount(),0);
this.searchResultsNode.innerHTML=ws.string.substituteParams(Config.Strings.DisplaySearchHeader,count,dojo.string.escapeXml(_1a08));
this.searchInfoPane.show();
}else{
this.searchInfoPane.hide();
}
},onFilterMenu:function(_1a0a){
this.model.setFilter(_1a0a);
ws.reporting.report("Filter Messages","Mail");
},updateFilterButton:function(){
var _1a0b=this.model.filter;
var count=this.model.getRowCount();
var _1a0d={all:Config.Strings.FilterAll,unread:Config.Strings.FilterUnread,read:Config.Strings.FilterRead,flagged:Config.Strings.FilterFlagged,unflagged:Config.Strings.FilterUnflagged,answered:Config.Strings.FilterAnswered,unanswered:Config.Strings.FilterUnanswered};
var _1a0e="<b>"+Config.Strings.FilterPrefix+"</b> "+ws.string.substituteParams(_1a0d[_1a0b],count);
this.filterButton.setLabel(_1a0e);
},updateActionMenu:function(){
var menu=this.actionButton.menu;
if(!menu){
return;
}
if(!("initialChildCount" in menu)){
menu.initialChildCount=menu.children.length;
}
var type=this.model.getCurrentFolder().type;
var _1a11=false;
var _1a12=(type!="Drafts"&&type!="Deleted")&&this.model.canChangeMessageReadState();
var _1a13=(type!="Deleted");
var _1a14=(type!="Drafts");
var _1a15=(type!="Drafts")&&Config.ShowMessageStatus;
ws.widget.setShowing(menu.children[0],_1a11);
ws.widget.setShowing(menu.children[1],_1a12);
ws.widget.setShowing(menu.children[2],_1a12);
ws.widget.setShowing(menu.children[3],_1a12||_1a11);
ws.widget.setShowing(menu.children[4],_1a13);
ws.widget.setShowing(menu.children[5],_1a13);
ws.widget.setShowing(menu.children[6],_1a13);
menu.children[7].onClick=ws.lang.hitch(this,"onClickShowStatus",this.model.currentFolder);
ws.widget.setShowing(menu.children[7],_1a15);
ws.widget.setShowing(menu.children[8],_1a14&&_1a15);
ws.widget.setShowing(menu.children[9],_1a14);
for(var i=menu.children.length-1;i>=menu.initialChildCount;i--){
var item=menu.children[i];
menu.removeChild(item);
if(item!=this.newFolderSeparator&&item!=this.newFolderMenu&&item!=this.newFolderInputMenu){
item.destroy();
}
}
if(_1a14){
dojo.lang.forEach(this.model.folders,dojo.lang.hitch(this,function(_1a18){
if(dojo.lang.inArray(this.model.getFoldersCanMoveTo(),_1a18.name)){
var _1a19=this.getDisplayName(_1a18);
var item=dojo.widget.createWidget("ws:WSMenuItem",{caption:"&nbsp;&nbsp;"+_1a19});
item.onClick=ws.lang.hitch(this,"moveMessages",_1a18.name,_1a18.displayName);
menu.addChild(item);
}
}));
if(!this.newFolderSeparator){
this.newFolderSeparator=dojo.widget.createWidget("ws:WSMenuSeparator",{});
this.newFolderMenu=dojo.widget.createWidget("ws:WSMenuItem",{caption:Config.Strings.NewFolder});
this.newFolderMenu._onClick=ws.lang.hitch(this,"newFolder");
}
menu.addChild(this.newFolderSeparator);
menu.addChild(this.newFolderMenu);
this.newFolderMenu.show();
if(this.newFolderInputMenu){
this.newFolderInputMenu.hide();
}
}
},getDisplayName:function(_1a1b){
var _1a1c=_1a1b.displayName;
if(Config.EnableIMAPFolderHierarchy){
var _1a1d=Config.FolderHierarchyDelimiter;
var depth="";
for(var d=1;d<_1a1b.depth;d++){
depth+="&nbsp;";
}
for(var d=1;d<_1a1b.depth;d++){
depth+=_1a1d;
}
_1a1c=depth+_1a1b.displayName;
}
return _1a1c;
},handleCellClick:function(e){
var uid=this.model.getDatum(e.rowIndex,this.model.columns.UID);
var draft=this.model.getDatum(e.rowIndex,this.model.columns.Draft);
var flag=!this.model.getDatum(e.rowIndex,this.model.columns.Flag);
switch(e.colIndex){
case this.gridModel.columns.Flag:
this.model.flagMessages({uids:[uid],load:function(data){
if(flag){
dojo.event.topic.publish("WSFeedbackStart",Config.Strings.MessageFlagged,true);
}else{
dojo.event.topic.publish("WSFeedbackStart",Config.Strings.MessageUnflagged,true);
}
},flag:flag});
break;
default:
if(draft){
this.getComposeCB(dojo.lang.hitch(this,function(_1a25){
_1a25.openDraft(this.model.currentFolder,uid);
}));
}else{
this.openMessage(this.model.currentFolder,uid,e.ctrlKey||(dojo.render.os.mac&&e.metaKey));
}
break;
}
},openMessage:function(_1a26,uid,_1a28){
},viewMessageSource:function(_1a29,uid){
},deleteMessages:function(uids){
if(this.model.getCurrentFolder().type=="Deleted"){
ws.widget.OkCancelDialog.alert(Config.Strings.PermDeleteSelectedConfirmation,ws.lang.hitch(this,function(ok){
if(ok){
this.deleteMessagesHelper(uids);
}
}),true);
}else{
return this.deleteMessagesHelper(uids);
}
},deleteMessagesHelper:function(uids){
if(!uids){
uids=this.getSelectedUidsAndDeselect();
}
this.model.deleteMessages({uids:uids,load:function(data){
if(uids.length==1){
dojo.event.topic.publish("WSFeedbackStart",Config.Strings.MessageDeleted,true);
}else{
dojo.event.topic.publish("WSFeedbackStart",ws.string.substituteParams(Config.Strings.MessagesDeleted,uids.length),true);
}
},error:function(err){
ws.widget.OkCancelDialog.alert(dojo.string.isBlank(err)?Config.Strings.ErrorDeleting:err);
}});
},onClickDelete:function(evt){
this.deleteMessages();
},restoreMessages:function(uids){
if(!uids){
uids=this.getSelectedUidsAndDeselect();
}
this.model.restoreMessages({uids:uids,error:function(err){
ws.widget.OkCancelDialog.alert(dojo.string.isBlank(err)?Config.Strings.ErrorRestoring:err);
}});
},onClickRestore:function(evt){
this.restoreMessages();
},moveMessages:function(_1a34,_1a35){
var uids=this.getSelectedUidsAndDeselect();
this.model.moveMessages({uids:uids,destFolder:_1a34,load:function(data){
if(uids.length==1){
dojo.event.topic.publish("WSFeedbackStart",ws.string.substituteParams(Config.Strings.MessageMoved,_1a35),true);
}else{
dojo.event.topic.publish("WSFeedbackStart",ws.string.substituteParams(Config.Strings.MessagesMoved,uids.length,_1a35),true);
}
},error:function(err){
ws.widget.OkCancelDialog.alert(dojo.string.isBlank(err)?Config.Strings.MoveMessageError:err);
}});
},moveToNewFolder:function(_1a39){
var _1a3a=dojo.lang.hitch(this,"moveMessages");
this.model.createFolder({newName:_1a39,load:dojo.lang.hitch(this,function(data){
dojo.event.topic.publish("WSFeedbackStart",Config.Strings.FolderCreated,true);
_1a3a(Config.NewFolderPrefix+_1a39,_1a39);
}),error:function(err){
ws.widget.OkCancelDialog.alert(ws.string.substituteParams(Config.Strings.ErrorCreatingFolder,_1a39));
}});
},newFolder:function(evt){
evt.stopPropagation();
var _1a3e=this.actionButton.menu;
if(!_1a3e){
return;
}
this.newFolderMenu.hide();
if(!this.newFolderInputMenu){
this.newFolderInputMenu=dojo.widget.createWidget("ws:wsinputablemenuitem",{okCB:dojo.lang.hitch(this,"moveToNewFolder"),originalMenuItem:this.newFolderMenu});
}
_1a3e.addChild(this.newFolderInputMenu);
this.newFolderInputMenu.setText(Config.Strings.NewFolder);
this.newFolderInputMenu.show();
this.newFolderInputMenu.input.select();
},reportNotSpam:function(){
this.spamAction(false);
},reportSpam:function(){
this.spamAction(true);
},spamAction:function(_1a3f,uids){
if(!uids){
uids=this.getSelectedUidsAndDeselect();
}
this.model.reportSpamMessages({uids:uids,isSpam:_1a3f,load:function(data){
if(_1a3f){
if(uids.length==1){
dojo.event.topic.publish("WSFeedbackStart",Config.Strings.MessageMarkedSpam,true);
}else{
dojo.event.topic.publish("WSFeedbackStart",ws.string.substituteParams(Config.Strings.MessagesMarkedSpam,uids.length),true);
}
}
},error:function(err){
ws.widget.OkCancelDialog.alert(dojo.string.isBlank(err)?Config.Strings.ReportSpamError:err);
}});
},unsendMessages:function(uids){
var _1a44=this.model.getFolderByName(this.model.currentFolder);
var msg=ws.string.substituteParams(Config.Strings.UnsendPluralMessagesConfirmation,_1a44.displayName);
if(!uids){
uids=this.getSelectedUidsAndDeselect();
}
ws.widget.OkCancelDialog.alert(msg,dojo.lang.hitch(this,function(res){
if(!res){
return;
}
this.model.unsendMessages({uids:uids,error:function(err){
ws.widget.OkCancelDialog.alert(dojo.string.isBlank(err)?Config.Strings.UnsendError:err);
}});
}),true);
},onClickUnsend:function(){
this.unsendMessages();
},markMessagesRead:function(){
this.changeMessagesReadState(true);
},markMessagesUnread:function(){
this.changeMessagesReadState(false);
},changeMessagesReadState:function(read,uids){
if(!uids){
uids=this.getSelectedUidsAndDeselect();
}
this.model.changeMessagesReadState({uids:uids,read:read,load:function(data){
if(uids.length==1){
if(read){
dojo.event.topic.publish("WSFeedbackStart",Config.Strings.MessageMarkedRead,true);
}else{
dojo.event.topic.publish("WSFeedbackStart",Config.Strings.MessageMarkedNew,true);
}
}else{
if(read){
dojo.event.topic.publish("WSFeedbackStart",ws.string.substituteParams(Config.Strings.MessagesMarkedRead,uids.length),true);
}else{
dojo.event.topic.publish("WSFeedbackStart",ws.string.substituteParams(Config.Strings.MessagesMarkedNew,uids.length),true);
}
}
},error:function(err){
ws.widget.OkCancelDialog.alert(dojo.string.isBlank(err)?Config.Strings.MarkReadError:err);
}});
},flagMessages:function(flag,uids){
if(!uids){
uids=this.getSelectedUidsAndDeselect();
}
this.model.flagMessages({uids:uids,flag:flag,load:function(data){
if(uids.length==1){
if(flag){
dojo.event.topic.publish("WSFeedbackStart",Config.Strings.MessageFlagged,true);
}else{
dojo.event.topic.publish("WSFeedbackStart",Config.Strings.MessageUnflagged,true);
}
}else{
if(flag){
dojo.event.topic.publish("WSFeedbackStart",ws.string.substituteParams(Config.Strings.MessagesFlagged,uids.length),true);
}else{
dojo.event.topic.publish("WSFeedbackStart",ws.string.substituteParams(Config.Strings.MessagesUnflagged,uids.length),true);
}
}
},error:function(err){
ws.widget.OkCancelDialog.alert(dojo.string.isBlank(err)?Config.Strings.ErrorSettingFlag:err);
}});
},onClickShowStatus:function(){
var uids=this.getSelectedUidsAndDeselect();
this.showStatus(this.model.currentFolder,uids);
},showStatus:function(_1a51,uids){
if(!this.statusDialog){
this.statusDialog=dojo.widget.createWidget("ws:MessageStatusDialog",{model:this.model},document.body,"first");
}
this.statusDialog.show(_1a51,uids);
ws.reporting.reportAction("Message Status");
},onClickFlag:function(evt){
this.flagMessages(true);
},onClickUnflag:function(evt){
this.flagMessages(false);
},getRowClasses:function(_1a55){
var cls=ws.mail.MessageListView.superclass.getRowClasses.apply(this,arguments);
var data=this.model.getRowData(_1a55);
if(data&&data[this.model.columns.Read]){
cls.push("row-read");
}
if(data&&(data[this.model.columns.Official]||data[this.model.columns.Priority])){
cls.push("row-official");
}
return cls;
},handleHoverControlClick:function(e){
var uid=this.model.getDatum(e.rowIndex,this.model.columns.UID);
if(dojo.html.hasClass(e.target,"trashHover")){
this.deleteMessages([uid]);
}else{
ws.mail.MessageListView.superclass.handleHoverControlClick.apply(this,arguments);
}
},handleQuickAction:function(_1a5a){
switch(_1a5a){
case "changeMessagesReadState":
var _1a5b=this.model.getDatum(this.quickActionRow,this.model.columns.Seen);
var uid=this.model.getDatum(this.quickActionRow,this.model.columns.UID);
this.changeMessagesReadState(!_1a5b,[uid]);
break;
case "searchSubject":
var _1a5d=this.model.getDatum(this.quickActionRow,this.model.columns.Subject);
this.model.search(this.model.getBaseSubject(_1a5d),"subject");
break;
case "searchFrom":
var from=this.model.getDatum(this.quickActionRow,this.model.columns.FromToAddress);
this.model.search(from,"from");
break;
case "searchTo":
var to=this.model.getDatum(this.quickActionRow,this.model.columns.FromToAddress);
this.model.search(to,"to");
break;
case "reply":
case "replyAll":
case "forward":
var uid=this.model.getDatum(this.quickActionRow,this.model.columns.UID);
this.getComposeCB(dojo.lang.hitch(this,function(_1a60){
_1a60.fetchAndRespond(this.model.currentFolder,uid,_1a5a);
}));
break;
case "spam":
var uid=this.model.getDatum(this.quickActionRow,this.model.columns.UID);
this.spamAction(true,[uid]);
break;
case "notSpam":
var uid=this.model.getDatum(this.quickActionRow,this.model.columns.UID);
this.spamAction(false,[uid]);
break;
case "unsend":
var uid=this.model.getDatum(this.quickActionRow,this.model.columns.UID);
this.unsendMessages([uid]);
break;
case "restore":
var uid=this.model.getDatum(this.quickActionRow,this.model.columns.UID);
this.restoreMessages([uid]);
break;
case "openInNewWindow":
var uid=this.model.getDatum(this.quickActionRow,this.model.columns.UID);
this.openMessage(this.model.currentFolder,uid,true);
break;
case "viewMessageSource":
var uid=this.model.getDatum(this.quickActionRow,this.model.columns.UID);
this.viewMessageSource(this.model.currentFolder,uid);
break;
case "flagMessage":
var _1a61=this.model.getDatum(this.quickActionRow,this.model.columns.Flag);
var uid=this.model.getDatum(this.quickActionRow,this.model.columns.UID);
this.flagMessages(!_1a61,[uid]);
break;
case "delete":
var uid=this.model.getDatum(this.quickActionRow,this.model.columns.UID);
this.deleteMessages([uid]);
break;
case "addToCalendar":
var uid=this.model.getDatum(this.quickActionRow,this.model.columns.UID);
this.addToCalendar(this.model.currentFolder,uid);
break;
case "addSenderToContact":
var from=this.model.getDatum(this.quickActionRow,this.model.columns.FromToAddress);
var rec=this.isContactExist(from);
if(rec){
this.editContact(rec);
}else{
this.addContact(from);
}
break;
case "addRecipientToContact":
var to=this.model.getDatum(this.quickActionRow,this.model.columns.FromToAddress);
var rec=this.isContactExist(to);
if(rec){
this.editContact(rec);
}else{
this.addContact(to);
}
break;
case "showStatus":
var uid=this.model.getDatum(this.quickActionRow,this.model.columns.UID);
this.showStatus(this.model.currentFolder,[uid]);
break;
}
},isContactExist:function(_1a63){
if(!_1a63){
return null;
}
_1a63=_1a63.toLowerCase();
var rec=ws.WebSuite.theAddressModel.getRecordByEmail(_1a63);
return rec;
},addContact:function(_1a65){
},editContact:function(_1a66){
},addToCalendar:function(_1a67,uid){
},maybePlayYgmSound:function(){
if(this.maybePlayYgmSound.executed){
return;
}
this.maybePlayYgmSound.executed=true;
var data=this.model.getFolderByName(ws.settings.getInboxFolderName());
if(Settings.PlaySound){
if(data&&data.unseenCount){
ws.io.playSound(Config.BaseResourcesURL+"sounds/ygm.wav");
}
ws.io.initSound(Config.BaseResourcesURL+"sounds/newmail.wav");
}
},playNewMailSound:function(){
if(Settings.PlaySound){
ws.io.playSound(Config.BaseResourcesURL+"sounds/newmail.wav");
}
},getZeroRowsMessage:function(){
if(!dojo.string.isBlank(this.model.getSearchString())||(this.model.filter!="all")){
return Config.Strings.SearchMessageNoMatch;
}else{
var _1a6a="ws.WebSuite.restoreTodayCurtain()";
var _1a6b=Config.Strings.FolderEmptyList+" "+Config.Strings.GetLatest+"<a href='#' class='wsLink' onclick="+_1a6a+">"+Config.Strings.TodayOnAOL+"</a>";
return _1a6b;
}
},getLoadingMessage:function(){
var _1a6c=null;
if(this.model.searchInProgress){
_1a6c=ws.string.substituteParams("<img src='{0}images/progressAnimation.gif' style='margin: -3px 4px;' height='16' width='16' align='bottom'>&nbsp;{1}",Config.BaseResourcesURL,Config.Strings.Searching);
}else{
_1a6c=ws.string.substituteParams("<img src='{0}images/progressAnimation.gif' style='margin: -3px 4px;' height='16' width='16' align='bottom'>&nbsp;{1}",Config.BaseResourcesURL,Config.Strings.Loading);
}
this.model.searchInProgress=false;
return _1a6c;
},getErrorMessage:function(){
var _1a6d="dojo.widget.byId(\""+this.widgetId+"\").retryFetch()";
var link="<a href='#' onclick='"+_1a6d+"' class='wsLink'>";
return ws.string.substituteParams(Config.Strings.ErrorRetrievingMessages,link,"</a>");
},retryFetch:function(){
this.model.setFolder(this.model.currentFolder);
},getDragObjectLabel:function(row){
var uid=this.model.getDatum(row,this.model.columns.UID);
var count=this.model.isSelected(uid)?this.model.getSelectedUids().length:1;
return (count==1)?this.model.getDatum(row,this.model.columns.Subject):ws.string.substituteParams(Config.Strings.NMessages,count);
},getSelectedUidsAndDeselect:function(){
var ret=this.model.getSelectedUids();
this.model.deselectAll();
return ret;
},sprites:{type:{NONE:"",SEEN:"ws_image_fSeen",OFFICIAL:"ws_image_fOfficial",PRIORITY:"ws_image_fPriority",BILLPAY:"ws_image_fBillpay",VOICEMAIL:"ws_image_fVoicemail",ANSWERED:"ws_image_fAnswered"},attach:{NONE:"",ATTACHMENT:"ws_image_fAttachment"},flag:{NONE:"ws_image_fUnflagged",FLAGGED:"ws_image_fFlagged"}},defineMenus:function(){
this.quickActionMenuDefinition={"Inbox":[{caption:"",onClick:ws.lang.hitch(this,"handleQuickAction","changeMessagesReadState")},{caption:Config.Strings.SearchForSubject,onClick:ws.lang.hitch(this,"handleQuickAction","searchSubject")},{caption:Config.Strings.SearchForSender,onClick:ws.lang.hitch(this,"handleQuickAction","searchFrom")},{caption:Config.Strings.DisplayReply,onClick:ws.lang.hitch(this,"handleQuickAction","reply")},{caption:Config.Strings.DisplayReplyAll,onClick:ws.lang.hitch(this,"handleQuickAction","replyAll")},{caption:Config.Strings.DisplayForward,onClick:ws.lang.hitch(this,"handleQuickAction","forward")},{caption:Config.Strings.ReportSpam,onClick:ws.lang.hitch(this,"handleQuickAction","spam")},{caption:Config.Strings.ShowMessageStatus,onClick:ws.lang.hitch(this,"handleQuickAction","showStatus")},{caption:Config.Strings.ViewMessageSource,onClick:ws.lang.hitch(this,"handleQuickAction","viewMessageSource")}],"Drafts":[{caption:Config.Strings.SearchForSubject,onClick:ws.lang.hitch(this,"handleQuickAction","searchSubject")},{caption:Config.Strings.SearchForTo,onClick:ws.lang.hitch(this,"handleQuickAction","searchTo")}],"Sent":[{caption:Config.Strings.UnsendButton,onClick:ws.lang.hitch(this,"handleQuickAction","unsend")},{caption:Config.Strings.SearchForSubject,onClick:ws.lang.hitch(this,"handleQuickAction","searchSubject")},{caption:Config.Strings.SearchForTo,onClick:ws.lang.hitch(this,"handleQuickAction","searchTo")},{caption:Config.Strings.DisplayReply,onClick:ws.lang.hitch(this,"handleQuickAction","reply")},{caption:Config.Strings.DisplayReplyAll,onClick:ws.lang.hitch(this,"handleQuickAction","replyAll")},{caption:Config.Strings.DisplayForward,onClick:ws.lang.hitch(this,"handleQuickAction","forward")},{caption:Config.Strings.ShowMessageStatus,onClick:ws.lang.hitch(this,"handleQuickAction","showStatus")}],"Spam":[{caption:Config.Strings.NotSpamButton,onClick:ws.lang.hitch(this,"handleQuickAction","notSpam")},{caption:Config.Strings.SearchForSubject,onClick:ws.lang.hitch(this,"handleQuickAction","searchSubject")},{caption:Config.Strings.SearchForSender,onClick:ws.lang.hitch(this,"handleQuickAction","searchFrom")},{caption:Config.Strings.DisplayReply,onClick:ws.lang.hitch(this,"handleQuickAction","reply")},{caption:Config.Strings.DisplayReplyAll,onClick:ws.lang.hitch(this,"handleQuickAction","replyAll")},{caption:Config.Strings.DisplayForward,onClick:ws.lang.hitch(this,"handleQuickAction","forward")},{caption:Config.Strings.ViewMessageSource,onClick:ws.lang.hitch(this,"handleQuickAction","viewMessageSource")}],"Deleted":[{caption:Config.Strings.RestoreButton,onClick:ws.lang.hitch(this,"handleQuickAction","restore")},{caption:Config.Strings.SearchForSubject,onClick:ws.lang.hitch(this,"handleQuickAction","searchSubject")},{caption:Config.Strings.SearchForSender,onClick:ws.lang.hitch(this,"handleQuickAction","searchFrom")},{caption:Config.Strings.DisplayReply,onClick:ws.lang.hitch(this,"handleQuickAction","reply")},{caption:Config.Strings.DisplayReplyAll,onClick:ws.lang.hitch(this,"handleQuickAction","replyAll")},{caption:Config.Strings.DisplayForward,onClick:ws.lang.hitch(this,"handleQuickAction","forward")},{caption:Config.Strings.ViewMessageSource,onClick:ws.lang.hitch(this,"handleQuickAction","viewMessageSource")}]};
var _1a73=Config.FolderButtons[Config.DeletedItemsFolderName.toLowerCase()];
_1a73=dojo.lang.map(_1a73.split(","),function(s){
return dojo.string.trim(s)=="true";
});
if(!_1a73[8]){
this.quickActionMenuDefinition.Deleted.shift();
}
this.filterButton.menuDefinition=[{caption:Config.Strings.FilterAllMenuItem,onClick:ws.lang.hitch(this,"onFilterMenu","all")},{separator:true},{caption:Config.Strings.FilterUnreadMenuItem,onClick:ws.lang.hitch(this,"onFilterMenu","unread")},{caption:Config.Strings.FilterReadMenuItem,onClick:ws.lang.hitch(this,"onFilterMenu","read")},{separator:true},{caption:Config.Strings.FilterFlaggedMenuItem,onClick:ws.lang.hitch(this,"onFilterMenu","flagged")},{caption:Config.Strings.FilterUnflaggedMenuItem,onClick:ws.lang.hitch(this,"onFilterMenu","unflagged")},{separator:true},{caption:Config.Strings.FilterAnsweredMenuItem,onClick:ws.lang.hitch(this,"onFilterMenu","answered")},{caption:Config.Strings.FilterUnansweredMenuItem,onClick:ws.lang.hitch(this,"onFilterMenu","unanswered")}];
this.actionButton.menuDefinition=[{caption:Config.Strings.UnsendButton,onClick:ws.lang.hitch(this,"onClickUnsend")},{caption:Config.EnableKeepAsNewButton?Config.Strings.KeepAsNewActionLabel:Config.Strings.MarkUnreadActionLabel,onClick:ws.lang.hitch(this,"changeMessagesReadState",false)},{caption:Config.Strings.MarkReadActionLabel,onClick:ws.lang.hitch(this,"changeMessagesReadState",true)},{separator:true},{caption:Config.Strings.FlagQuickActionLabel,onClick:ws.lang.hitch(this,"onClickFlag")},{caption:Config.Strings.ClearFlag,onClick:ws.lang.hitch(this,"onClickUnflag")},{separator:true},{caption:Config.Strings.ShowMessageStatus,onClick:ws.lang.hitch(this,"onClickShowStatus")},{separator:true},{caption:Config.Strings.MoveActionLabel,disabled:true}];
this.rightClickMenuDefinition={"Inbox":[{caption:Config.Strings.OpenInNewWindow,onClick:ws.lang.hitch(this,"handleQuickAction","openInNewWindow")},{separator:true},{caption:Config.Strings.DisplayReply,onClick:ws.lang.hitch(this,"handleQuickAction","reply")},{caption:Config.Strings.DisplayReplyAll,onClick:ws.lang.hitch(this,"handleQuickAction","replyAll")},{caption:Config.Strings.DisplayForward,onClick:ws.lang.hitch(this,"handleQuickAction","forward")},{separator:true},{caption:"",onClick:ws.lang.hitch(this,"handleQuickAction","changeMessagesReadState")},{caption:"",onClick:ws.lang.hitch(this,"handleQuickAction","flagMessage")},{caption:Config.Strings.Delete,onClick:ws.lang.hitch(this,"handleQuickAction","delete")},{caption:Config.Strings.ReportSpam,onClick:ws.lang.hitch(this,"handleQuickAction","spam")},{caption:Config.Strings.ShowMessageStatus,onClick:ws.lang.hitch(this,"handleQuickAction","showStatus")},{separator:true},{caption:Config.Strings.SearchForSender,onClick:ws.lang.hitch(this,"handleQuickAction","searchFrom")},{caption:Config.Strings.SearchForSubject,onClick:ws.lang.hitch(this,"handleQuickAction","searchSubject")},{separator:true},{caption:"",onClick:ws.lang.hitch(this,"handleQuickAction","addSenderToContact")},{caption:Config.Strings.AddMessageToCalendar,onClick:ws.lang.hitch(this,"handleQuickAction","addToCalendar")},{separator:true},{caption:Config.Strings.ViewMessageSource,onClick:ws.lang.hitch(this,"handleQuickAction","viewMessageSource")}],"Drafts":[{caption:Config.Strings.OpenInNewWindow,onClick:ws.lang.hitch(this,"handleQuickAction","openInNewWindow")},{separator:true},{caption:"",onClick:ws.lang.hitch(this,"handleQuickAction","flagMessage")},{caption:Config.Strings.Delete,onClick:ws.lang.hitch(this,"handleQuickAction","delete")}],"Sent":[{caption:Config.Strings.OpenInNewWindow,onClick:ws.lang.hitch(this,"handleQuickAction","openInNewWindow")},{separator:true},{caption:Config.Strings.DisplayReply,onClick:ws.lang.hitch(this,"handleQuickAction","reply")},{caption:Config.Strings.DisplayReplyAll,onClick:ws.lang.hitch(this,"handleQuickAction","replyAll")},{caption:Config.Strings.DisplayForward,onClick:ws.lang.hitch(this,"handleQuickAction","forward")},{separator:true},{caption:"",onClick:ws.lang.hitch(this,"handleQuickAction","changeMessagesReadState")},{caption:"",onClick:ws.lang.hitch(this,"handleQuickAction","flagMessage")},{caption:Config.Strings.Delete,onClick:ws.lang.hitch(this,"handleQuickAction","delete")},{caption:Config.Strings.ShowMessageStatus,onClick:ws.lang.hitch(this,"handleQuickAction","showStatus")},{separator:true},{caption:Config.Strings.SearchForTo,onClick:ws.lang.hitch(this,"handleQuickAction","searchTo")},{caption:Config.Strings.SearchForSubject,onClick:ws.lang.hitch(this,"handleQuickAction","searchSubject")},{separator:true},{caption:"",onClick:ws.lang.hitch(this,"handleQuickAction","addRecipientToContact")}],"Spam":[{caption:Config.Strings.OpenInNewWindow,onClick:ws.lang.hitch(this,"handleQuickAction","openInNewWindow")},{separator:true},{caption:Config.Strings.DisplayReply,onClick:ws.lang.hitch(this,"handleQuickAction","reply")},{caption:Config.Strings.DisplayReplyAll,onClick:ws.lang.hitch(this,"handleQuickAction","replyAll")},{caption:Config.Strings.DisplayForward,onClick:ws.lang.hitch(this,"handleQuickAction","forward")},{separator:true},{caption:"",onClick:ws.lang.hitch(this,"handleQuickAction","changeMessagesReadState")},{caption:"",onClick:ws.lang.hitch(this,"handleQuickAction","flagMessage")},{caption:Config.Strings.Delete,onClick:ws.lang.hitch(this,"handleQuickAction","delete")},{caption:Config.Strings.NotSpamButton,onClick:ws.lang.hitch(this,"handleQuickAction","spam")},{separator:true},{caption:Config.Strings.SearchForSender,onClick:ws.lang.hitch(this,"handleQuickAction","searchFrom")},{caption:Config.Strings.SearchForSubject,onClick:ws.lang.hitch(this,"handleQuickAction","searchSubject")},{separator:true},{caption:Config.Strings.ViewMessageSource,onClick:ws.lang.hitch(this,"handleQuickAction","viewMessageSource")}],"Deleted":[{caption:Config.Strings.OpenInNewWindow,onClick:ws.lang.hitch(this,"handleQuickAction","openInNewWindow")},{separator:true},{caption:Config.Strings.DisplayReply,onClick:ws.lang.hitch(this,"handleQuickAction","reply")},{caption:Config.Strings.DisplayReplyAll,onClick:ws.lang.hitch(this,"handleQuickAction","replyAll")},{caption:Config.Strings.DisplayForward,onClick:ws.lang.hitch(this,"handleQuickAction","forward")},{separator:true},{caption:Config.Strings.RestoreButton,onClick:ws.lang.hitch(this,"handleQuickAction","restore")},{caption:"",onClick:ws.lang.hitch(this,"handleQuickAction","changeMessagesReadState")},{caption:"",onClick:ws.lang.hitch(this,"handleQuickAction","flagMessage")},{caption:Config.Strings.Delete,onClick:ws.lang.hitch(this,"handleQuickAction","delete")},{caption:Config.Strings.ReportSpam,onClick:ws.lang.hitch(this,"handleQuickAction","spam")},{separator:true},{caption:Config.Strings.SearchForSender,onClick:ws.lang.hitch(this,"handleQuickAction","searchFrom")},{caption:Config.Strings.SearchForSubject,onClick:ws.lang.hitch(this,"handleQuickAction","searchSubject")},{separator:true},{caption:"",onClick:ws.lang.hitch(this,"handleQuickAction","addSenderToContact")},{caption:Config.Strings.AddMessageToCalendar,onClick:ws.lang.hitch(this,"handleQuickAction","addToCalendar")},{separator:true},{caption:Config.Strings.ViewMessageSource,onClick:ws.lang.hitch(this,"handleQuickAction","viewMessageSource")}]};
dojo.event.connect("after",this.actionButton,"getMenu",this,"updateActionMenu");
},createQuickActionMenu:function(_1a75){
var _1a76=this.quickActionMenuDefinition[_1a75];
if(!_1a76){
_1a76=this.quickActionMenuDefinition.Inbox;
}
this.quickActionMenu[_1a75]=ws.widget.createMenu(_1a76);
dojo.event.connect("after",this.quickActionMenu[_1a75],"close",dojo.lang.hitch(this,function(){
var row=this.quickActionRow;
this.grid.updateCell(row,this.keyToColIndex(this.gridModel.columns.Hover));
this.updateToolbarState();
}));
return this.quickActionMenu[_1a75];
},getQuickActionMenu:function(_1a78){
if(!this.quickActionMenu){
this.quickActionMenu=new Object();
}
var _1a79=this.model.getFolderByName(this.model.currentFolder).type;
var _1a7a=this.quickActionMenuDefinition[_1a79];
if(!_1a7a){
_1a79="Inbox";
}
var menu=this.quickActionMenu[_1a79];
if(!menu&&!_1a78){
menu=this.createQuickActionMenu(_1a79);
}
return menu;
},updateQuickActionMenu:function(menu){
if(menu==this.quickActionMenu["Inbox"]){
var _1a7d=Config.EnableKeepAsNewButton?Config.Strings.KeepAsNewActionLabel:Config.Strings.MarkUnreadActionLabel;
var _1a7e=Config.Strings.MarkReadActionLabel;
var _1a7f=this.model.getDatum(this.quickActionRow,this.model.columns.Seen);
menu.children[0].setCaption(_1a7f?_1a7d:_1a7e);
ws.widget.setShowing(menu.children[0],this.model.canChangeMessageReadState());
ws.widget.setShowing(menu.children[6],Config.EnableSpamButton);
ws.widget.setShowing(menu.children[7],Config.ShowMessageStatus);
}
if(menu==this.quickActionMenu["Sent"]){
ws.widget.setShowing(menu.children[0],Config.EnableUnsendButton);
ws.widget.setShowing(menu.children[6],Config.ShowMessageStatus);
}
},createRightClickMenu:function(_1a80){
var _1a81=this.rightClickMenuDefinition[_1a80];
if(!_1a81){
_1a81=this.rightClickMenuDefinition.Inbox;
}
this.rightClickMenu[_1a80]=ws.widget.createMenu(_1a81);
dojo.event.connect("after",this.rightClickMenu[_1a80],"close",dojo.lang.hitch(this,function(){
var row=this.quickActionRow;
this.grid.updateCell(row,this.keyToColIndex(this.gridModel.columns.Hover));
}));
return this.rightClickMenu[_1a80];
},getRightClickMenu:function(_1a83){
if(!this.rightClickMenu){
this.rightClickMenu=new Object();
}
var _1a84=this.model.getFolderByName(this.model.currentFolder).type;
var _1a85=this.rightClickMenuDefinition[_1a84];
if(!_1a85){
_1a84="Inbox";
}
var menu=this.rightClickMenu[_1a84];
if(!menu&&!_1a83){
menu=this.createRightClickMenu(_1a84);
}
return menu;
},updateRightClickMenu:function(menu){
var _1a88=null;
var _1a89=null;
var _1a8a=null;
if(menu==this.rightClickMenu["Inbox"]||menu==this.rightClickMenu["Spam"]||menu==this.rightClickMenu["Sent"]){
_1a88=menu.children[6];
_1a89=menu.children[7];
}
if(menu==this.rightClickMenu["Inbox"]){
_1a8a=menu.children[15];
ws.widget.setShowing(menu.children[9],Config.EnableSpamButton);
ws.widget.setShowing(menu.children[10],Config.ShowMessageStatus);
}
if(menu==this.rightClickMenu["Sent"]){
_1a8a=menu.children[14];
ws.widget.setShowing(menu.children[9],Config.ShowMessageStatus);
}
if(menu==this.rightClickMenu["Deleted"]){
_1a88=menu.children[7];
_1a89=menu.children[8];
_1a8a=menu.children[15];
ws.widget.setShowing(menu.children[6],Config.EnableRestoreButton);
ws.widget.setShowing(menu.children[10],Config.EnableSpamButton);
}
if(menu==this.rightClickMenu["Drafts"]){
_1a89=menu.children[2];
}
if(_1a88){
var _1a8b=Config.EnableKeepAsNewButton?Config.Strings.KeepAsNewActionLabel:Config.Strings.MarkUnreadActionLabel;
var _1a8c=Config.Strings.MarkReadActionLabel;
var _1a8d=this.model.getDatum(this.quickActionRow,this.model.columns.Seen);
_1a88.setCaption(_1a8d?_1a8b:_1a8c);
ws.widget.setShowing(_1a88,this.model.canChangeMessageReadState());
}
if(_1a89){
var _1a8e=this.model.getDatum(this.quickActionRow,this.model.columns.Flag);
_1a89.setCaption(_1a8e?Config.Strings.ClearFlag:Config.Strings.FlagForFollowUp);
}
if(_1a8a){
var addr=this.model.getDatum(this.quickActionRow,this.model.columns.FromToAddress);
_1a8a.setCaption(this.isContactExist(addr)?Config.Strings.EditContact:Config.Strings.AddToContact);
}
},onEnterKeyPress:function(){
if(this.grid.lastOverCell){
var uid=this.model.getDatum(this.grid.over.row,this.model.columns.UID);
this.openMessage(this.model.currentFolder,uid,false);
}
},onDelKeyPress:function(){
if(this.grid.lastOverCell){
var uids=[this.model.getDatum(this.grid.over.row,this.model.columns.UID)];
this.deleteMessages(uids);
}
},onKeyPress:function(evt){
if(this.isShowing()){
this._onKeyPress(evt);
}
},onOtherKeyPress:function(evt){
if(Config.EnableKeyboardShortcuts&&evt.key&&dojo.lang.isString(evt.key)&&this.grid.lastOverCell&&!(evt.ctrlKey||evt.altKey||evt.metaKey)){
var uid=this.model.getDatum(this.grid.over.row,this.model.columns.UID);
switch(evt.key.toLowerCase()){
case Config.Strings.KeyMailReply:
this.getComposeCB(dojo.lang.hitch(this,function(_1a95){
_1a95.fetchAndRespond(this.model.currentFolder,uid,"reply");
}));
break;
case Config.Strings.KeyMailReplyAll:
this.getComposeCB(dojo.lang.hitch(this,function(_1a96){
_1a96.fetchAndRespond(this.model.currentFolder,uid,"replyAll");
}));
break;
case Config.Strings.KeyMailReplyAll:
this.getComposeCB(dojo.lang.hitch(this,function(_1a97){
_1a97.fetchAndRespond(this.model.currentFolder,uid,"replyAll");
}));
break;
case Config.Strings.KeyMailForward:
this.getComposeCB(dojo.lang.hitch(this,function(_1a98){
_1a98.fetchAndRespond(this.model.currentFolder,uid,"forward");
}));
break;
case Config.Strings.KeyMailKeepAsNew:
this.changeMessagesReadState(false,[uid]);
break;
}
}
}});

