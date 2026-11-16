var POP_arr=new Array();
function POP_Obj(id,trk){
	this.id=id;
	this.trk=trk;
	POP_arr=POP_arr.concat(this);
}
function POP_redir(obj,id){
	if(!obj.href)return;
	if((o=POP_get(id))==null)return;
	if(obj.href.indexOf('?')>=0){
		obj.href=obj.href+"&_pop="+o.trk;
	}else{
		obj.href=obj.href+"?_pop="+o.trk;
	}
}
function POP_get(id){
	for (i=0;i<POP_arr.length;i++) {
		if (POP_arr[i].id == id) {
			return POP_arr[i];
		}
	}
	return null;
}
