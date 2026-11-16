var oIgoUgoJSCreated = (typeof(IgoUgoJS) != 'undefined');
var IgoUgoJS = {
	loadedUris:[],
	loaded_modules_:[],
	loading_modules_:[],
	addedToLoadingCount:[]
};

/*
 #####################################
 Config
 #####################################
*/
// To override the properties, simply create an object called IgoUgoJSConfigExt with properties the name of the function in IgoUgoJS.Config.
// E.g.:
// IgoUgoJSConfigExt = {
//  baseRep:'mypath/igougo', // for BaseRep()
//  beRep:'mypath/be' // for BERep()
//  ...
// }
IgoUgoJS.Config = {
	initialize: function() {
		this.configs = [];
		// defaults
		this.Set('baseRep', '/global/scripts/igougo');
		this.Set('utilRep', this.BaseRep() + '/util');
		this.Set('depRep', this.BaseRep() + '/dependencies');
		this.Set('packageName', '_package');
	},
	Get: function(pKey) {
		if (!pKey) return;
		return this.configs[pKey];
	},
	Set: function(pKey, pValue) {
		if (!pKey) return;
		return this.configs[pKey] = pValue;
	},
	// ---------------------
	// Folders
	// ---------------------
	BaseRep: function() {
		return this.Get('baseRep');
	},
	UtilRep: function() {
		return this.Get('utilRep');
	},
	DepRep: function() {
		return this.Get('depRep');
	},
	PackageName: function() {
		return this.Get('packageName');
	}
}
IgoUgoJS.Config.initialize();

/*
#################################################################
IgoUgo Dyn Load (adaptation of dojo)
#################################################################
*/

if (typeof(IgoUgoJSConfigExt) != 'undefined') {
   for (var option in IgoUgoJSConfigExt) {
		IgoUgoJS.Config.Set(option, IgoUgoJSConfigExt[option]);
	}
}

IgoUgoJS.Inspect = function(obj) {
  var info = [];
  if(typeof obj=="string" || 
     typeof obj=="number") {
    return obj;
  } else {
    for(property in obj)
      if(typeof obj[property]!="function")
        info.push(property + ' => ' + 
          (typeof obj[property] == "string" ?
            '"' + obj[property] + '"' :
            obj[property]));
  }
  return ("'" + obj + "' #" + typeof obj + 
    ": {" + info.join(", ") + "}");
}

IgoUgoJS.Require = function() {
   return IgoUgoJS.LoadModule.apply(this, arguments);
}

IgoUgoJS.Provide = function(packname) {
   var syms = packname.split(/\./);
	if(syms[syms.length-1]=="*") syms.pop();
	return IgoUgoJS.EvalObjPath(syms.join("."), true);
}

IgoUgoJS.Eval = function(pContent) {
	return eval(pContent);
}

IgoUgoJS.LoadUri = function(pUri) {
   if(this.loadedUris[pUri]) return;
	var oContents = this.GetText(pUri, null, true);
	if(oContents == null) return 0;
	this.loadedUris[pUri] = true;
	var value = IgoUgoJS.Eval(oContents);
	return 1;
}

IgoUgoJS.LoadUriAndCheck = function(uri, module, cb){
   var ok = true;
	try{
		ok = this.LoadUri(uri, cb);
	}catch(e){
		alert("failed loading " + uri + " with error: " + e.toString());
	}
	return (ok && this.FindModule(module, false));
}


IgoUgoJS.GetText = function(pUri, pCallback, pFailOK) {
	var oHttp = Ajax.getTransport();
	if(pCallback){
		oHttp.onreadystatechange = function(){ 
			if((oHttp.readyState == 4)&&(oHttp["status"])){
				if(oHttp.status==200){
					pCallback(oHttp.responseText);
				}
			}
		}
	}
	oHttp.open('GET', pUri, pCallback ? true : false);
	oHttp.send(null);
	if(pCallback){
		return null;
	}
	return oHttp.responseText;
}

IgoUgoJS.ROOT = this;
IgoUgoJS.Undef = function(name, obj) {
	if(!obj){ obj = IgoUgoJS.ROOT; }
	return (typeof obj[name] == "undefined");
}

IgoUgoJS.FindModule = function(modulename, must_exist) {
   var lmn = (new String(modulename)).toLowerCase();
	if(this.loaded_modules_[lmn]){
		return this.loaded_modules_[lmn];
	}
	// see if symbol is defined anyway
	var module = IgoUgoJS.EvalObjPath(modulename);
	if((modulename)&&(typeof module != 'undefined')&&(module)){
	   this.loaded_modules_[lmn] = module;
		return module;
	}
	if(must_exist){
		alert("no loaded module named '" + modulename + "'");
	}
	return null;
}

IgoUgoJS.LoadPath = function(relpath, module /*optional*/, cb /*optional*/){
	if((relpath.charAt(0) == '/')||(relpath.match(/^\w+:/))){
		alert("relpath '" + relpath + "'; must be relative");
	}
	var uri = IgoUgoJS.Config.BaseRep() + '/' + relpath;
	try{
		return ((!module) ? this.LoadUri(uri, cb) : this.LoadUriAndCheck(uri, module, cb));
	}catch(e){
		alert("Error in LoadPath: " + e.toString());
		return false;
	}
}

IgoUgoJS.LoadModule = function(modulename, exact_only, omit_module_check){
   if(!modulename) return;
	//omit_module_check = this._global_omit_module_check || omit_module_check;
	var module = this.FindModule(modulename, false);
	if(module) return module;
	// protect against infinite recursion from mutual dependencies
	if(IgoUgoJS.Undef(modulename, this.loading_modules_)){
		this.addedToLoadingCount.push(modulename);
	}
	this.loading_modules_[modulename] = 1;
	// convert periods to slashes
	var relpath = modulename.replace(/\./g, '/') + '.js';
	var syms = modulename.split(".");
	var nsyms = modulename.split(".");
	for (var i = syms.length - 1; i > 0; i--) {
		var parentModule = syms.slice(0, i).join(".");
		//var parentModulePath = this.getModulePrefix(parentModule);
		var parentModulePath = parentModule;
		if (parentModulePath != parentModule) {
			syms.splice(0, i, parentModulePath);
			break;
		}
	}
	var last = syms[syms.length - 1];
	// figure out if we're looking for a full package, if so, we want to do
	// things slightly diffrently
	if(last=="*"){
		modulename = (nsyms.slice(0, -1)).join('.');
		while(syms.length){
			syms.pop();
			syms.push(IgoUgoJS.Config.PackageName());
			relpath = syms.join("/") + '.js';
			if(relpath.charAt(0)=="/"){
				relpath = relpath.slice(1);
			}
			ok = this.LoadPath(relpath, ((!omit_module_check) ? modulename : null));
			if(ok){ break; }
			syms.pop();
		}
	}else{
		relpath = syms.join("/") + '.js';
		modulename = nsyms.join('.');
		var ok = this.LoadPath(relpath, ((!omit_module_check) ? modulename : null));
		//alert('Loading mod ' + modulename);
		if((!ok)&&(!exact_only)){
			syms.pop();
			while(syms.length){
				relpath = syms.join('/') + '.js';
				ok = this.LoadPath(relpath, ((!omit_module_check) ? modulename : null));
				if(ok){ break; }
				syms.pop();
				relpath = syms.join('/') + '/'+ IgoUgoJS.Config.PackageName() +'.js';
				if(relpath.charAt(0)=="/"){
					relpath = relpath.slice(1);
				}
				ok = this.LoadPath(relpath, ((!omit_module_check) ? modulename : null));
				if(ok){ break; }
			}
		}

		if((!ok)&&(!omit_module_check)){
			//dojo.raise("Could not load '" + modulename + "'; last tried '" + relpath + "'");
			alert("Could not load '" + modulename + "'; last tried '" + relpath + "'");
		} else {
		   //alert('mod ' + modulename + ' successfully loaded');
		}
	}

	// check that the symbol was defined
	if(!omit_module_check){
		// pass in false so we can give better error
		module = this.FindModule(modulename, false);
		if(!module){
			alert("symbol '" + modulename + "' is not defined after loading '" + relpath + "'");
		}
	}
	return module;
}

IgoUgoJS.EvalObjPath = function(objpath, create){
	// fast path for no periods
	if(typeof objpath != "string"){ return IgoUgoJS.ROOT; }
	if(objpath.indexOf('.') == -1){
		if((IgoUgoJS.Undef(objpath, IgoUgoJS.ROOT))&&(create)){
			IgoUgoJS.ROOT[objpath] = {};
		}
		return IgoUgoJS.ROOT[objpath];
	}

	var syms = objpath.split(/\./);
	var obj = IgoUgoJS.ROOT;
	for(var i=0;i<syms.length;++i){
		if(!create){
			obj = obj[syms[i]];
			if((typeof obj == 'undefined')||(!obj)){
				return obj;
			}
		}else{
			if(IgoUgoJS.Undef(syms[i], obj)) {
				obj[syms[i]] = {};
			}
			obj = obj[syms[i]];
		}
	}
	return obj;
}

if (!oIgoUgoJSCreated) {
	/*
	#####################
	Third party libs
	#####################
	*/
	/*if (typeof(Prototype) == 'undefined') {
		document.write('<script type="text/javascript" src="' + IgoUgoJS.Config.DepRep() + '/prototype.js"></script>');
	}
	if (typeof(Behaviour) == 'undefined') {
		document.write('<script type="text/javascript" src="' + IgoUgoJS.Config.DepRep() + '/behaviour.js"></script>');
	}
	if (typeof(Effect) == 'undefined') {
		document.write('<script type="text/javascript" src="' + IgoUgoJS.Config.DepRep() + '/effects/builder.js"></script>');
		document.write('<script type="text/javascript" src="' + IgoUgoJS.Config.DepRep() + '/effects/effects.js"></script>');
		//document.write('<script type="text/javascript" src="' + IgoUgoJS.Config.DepRep() + '/effects/dragdrop.js"></script>');
		document.write('<script type="text/javascript" src="' + IgoUgoJS.Config.DepRep() + '/effects/controls.js"></script>');
		document.write('<script type="text/javascript" src="' + IgoUgoJS.Config.DepRep() + '/effects/slider.js"></script>');
	}*/
	if (typeof(Prototype) == 'undefined' || typeof(Effect) == 'undefined') {
		document.write('<script type="text/javascript" language="javascript" src="' + IgoUgoJS.Config.DepRep() + '/protoculous-1.0.2.js"></script>');
	}
	if (typeof(Behaviour) == 'undefined') {
		document.write('<script type="text/javascript" src="' + IgoUgoJS.Config.DepRep() + '/behaviour.js"></script>');
	}
	/*
	#####################
	IgoUgo Core
	#####################
	*/
	if (typeof(IgoUgoJS.Util) == 'undefined') {
		document.write('<script type="text/javascript" src="' + IgoUgoJS.Config.UtilRep() + '/util.js"></script>');
	}
	/*
	if (typeof(IgoUgoJS.BusinessEntity) == 'undefined') {
		document.write('<script type="text/javascript" src="'+ IgoUgoJS.Config.BERep() + '/be.js"></script>');	
	}
	if (typeof(IgoUgoJS.BusinessObject) == 'undefined') {
		document.write('<script type="text/javascript" src="' + IgoUgoJS.Config.BORep() + '/bo.js"></script>');	
	}
	if (typeof(IgoUgoJS.Pager) == 'undefined') {
		document.write('<script type="text/javascript" src="' + IgoUgoJS.Config.PagerRep() + '/common.js"></script>');	
	}
	*/
}