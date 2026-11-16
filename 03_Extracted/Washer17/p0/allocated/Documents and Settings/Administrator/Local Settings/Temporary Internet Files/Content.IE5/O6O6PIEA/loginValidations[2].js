function AsqVal(){}
AsqVal.ANS_EMPTY_ERR=1;AsqVal.REANS_EMPTY_ERR=2;AsqVal.ANS_MISMATCH_ERR=3;AsqVal.QTN_ERR=4;AsqVal.ANS_ERR=5;

function LoginVal(){}
LoginVal.CONTINUE=1;LoginVal.GO_TO_TOS=2;

function QtnIdVal(){}
QtnIdVal.SSN=104;

function validatePassword(pwd){	
	var result = valPassword(pwd,4); 
	return result;
}

function validateSecureID(secureId) {
  var securId = trimString(secureId.value);
  secureId.value =securId; 
	if(securId.length < 1){		
		return RetVal.EMPTY_ERR; 
	}else{
	  var regExp = /^([0-9]{6})$/; 
	  var result = regExp.test(securId)? RetVal.SUCCESS : RetVal.INVALID_ERR;  	 
  	  return result;  
   }
}

function validateAsq(asqAnsId){
	var asq = (asqAnsId.value);
	asqAnsId.value = asq;
	var result = (asq.length < 1 )? RetVal.EMPTY_ERR : RetVal.SUCCESS;
	return result;
}

function snsCheckSecurID(securId,err){
var retVal = validateSecureID(securId)
var result=(retVal == RetVal.SUCCESS)? true:false;
if(!result){alert(err[retVal]);securId.focus();}
return result;
}

function  snsCheckAsq(ansId,err){
if(validateAsq(ansId)== RetVal.EMPTY_ERR){alert(err);	ansId.focus(); return false;}
return true;
}

function snsCheckVerifyPwd(pwdId,pwdErr){
var result, retVal;
retVal = valPassword(pwdId.value,3);
result = (retVal == RetVal.SUCCESS) ? true : false;  
if(!result){alert(pwdErr[retVal]);pwdId.value="";pwdId.focus();return false;}
return true;
}

function snsCheckFgtPwd(loginId,user,errArr){
 stripOffAOLDomains(loginId); 
 var loginIdVal = loginId.value;
 var retVal,result;
 switch(user){
	case User.SNONLY : retVal= validateSN(loginIdVal); break;
	case User.ONSONLY : retVal= validateEmail(loginIdVal);break;
	case User.ALL : retVal= validateLoginId(loginIdVal); break;
 } 
 result = (retVal == RetVal.SUCCESS)?true:false;
 if(!result){alert(errArr[retVal]);loginId.focus();return false;}
 return true;
}	

function snscheckregimagtext(regImg){
	if(	valRegImageText(regImg)==RetVal.SUCCESS){
		return true;
	}else { return false; }
}

function valRegImageText(regImg){
var regImgVal = trimString(regImg.value);
	if(regImgVal.length<1){
	 return RetVal.EMPTY_ERR;
	}else{
		var validDataRegExp = /^([0-9a-zA-Z\s]+)$/; 
		if( validDataRegExp.test(regImgVal)){
		var spaceRegExp = /\s/g;
		regImg.value = regImgVal.replace(spaceRegExp,"");	
		return RetVal.SUCCESS;
		}else { return RetVal.INVALID_ERR; }
	}
}
function valAsqCreateNew(asqQtnId,asqQtn,asqAns,ansRetype,ansErrArr,asqErr,ssnQtnId){
if(valAsqChange(asqQtnId,asqQtn)==RetVal.SUCCESS){
 	var result = valAsqAnswers(asqQtnId,asqAns,ansRetype,ssnQtnId);
 	switch(result){
 	case RetVal.SUCCESS: return true;
 	case AsqVal.ANS_EMPTY_ERR:alert( ansErrArr[result]);asqAns.focus();return false;
 	case AsqVal.ANS_INVALID_ERR:alert( ansErrArr[result]);asqAns.focus();return false;
 	case AsqVal.REANS_EMPTY_ERR:alert( ansErrArr[result]);ansRetype.focus();return false;
 	case AsqVal.ANS_MISMATCH_ERR:alert( ansErrArr[result]);asqAns.value="";ansRetype.value="";asqAns.focus();return false;
 	}
 	return false; 	
 }else{alert(asqErr);asqQtnId.focus();return false;} 
 }

 function valAsqCreate(form,ansErrArr,asqErr,qtnId){
 return valAsqCreateNew(form.asqStdQtnId,form.asqStdQuestion,form.asqAnswer,form.asqAnswerRetype,ansErrArr,asqErr,qtnId);
 }
 function valAsqChange(asqQtnId,asqQtn){
 var qtnId = asqQtn.value;
 if(asqQtnId.value !="" && asqQtnId.length>0){
 	for(var i=0;i<asqQtnId.length;i++){
 		if(qtnId == asqQtnId.options[i].text){asqQtnId.options[i].selected=true;asqQtn.value=qtnId;}
 	}
 }else{return RetVal.INVALID_ERR;}
 return RetVal.SUCCESS;
 }
 
 function valAsqAnswers(asqQtnId,ans,ansretype,ssnQtnId){
 var answer = ans.value;
 var answerRetype = ansretype.value;
 var regExp = /^([0-9]{4})$/;
 var result = regExp.test(answer);
 	if(answer.length<1 ){ return AsqVal.ANS_EMPTY_ERR;}
	else if(answerRetype.length <1 ){return AsqVal.REANS_EMPTY_ERR;}
	else if((asqQtnId.value==ssnQtnId) && !(result)){ return AsqVal.ANS_INVALID_ERR;}
	else if (answer!= answerRetype){ return AsqVal.ANS_MISMATCH_ERR;}
	else{return RetVal.SUCCESS;}
}


function submitSNSForm(loginSubmitVal){
	if(loginSubmitVal == LoginVal.GO_TO_TOS){
		document.loginForm.mcState.value="doTOSCheck";		
	}
	document.loginForm.submit();	
} 
 
 function checkAsqChange(asqStdQtnId,asqStdQuestion,asqAnswer,asqAnswerRetype,QtnId){
 var selectedId = asqStdQtnId.value;
 asqStdQuestion.value= asqStdQtnId.options[asqStdQtnId.selectedIndex].innerHTML;
 if( selectedId == QtnId){
 asqAnswer.maxLength=4;
 asqAnswerRetype.maxLength=4;
 }else{
 asqAnswer.maxLength=80;
 asqAnswerRetype.maxLength=80;
 }
 }
 
 function asqExists(asqQtnList,qtnId){
 var result=false;
 var j=0;
 for(i=0;i<asqQtnList.length;i++){
 	if(asqQtnList.options[i].value==qtnId){result=true;j=i;}
  }
  asqQtnList.options[j].selected=true;
   return result;
 }
