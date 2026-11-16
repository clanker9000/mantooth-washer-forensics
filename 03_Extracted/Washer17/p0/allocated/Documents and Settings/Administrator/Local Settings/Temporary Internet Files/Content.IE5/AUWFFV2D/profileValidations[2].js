function RegType(){}
RegType.SN=0;
RegType.ONS=1;

function Elmt(){}
Elmt.DN=0;
Elmt.GENDER=1;
Elmt.COUNTRY=2
Elmt.ZIP=3;
Elmt.ASQ=4;
Elmt.EMAIL=5;
Elmt.BDATE=6;
Elmt.COUNT=7;
Elmt.COLS=3;

function Req(){}Req.LOGINID=10;Req.BDATE=11;Req.EMAIL=12;Req.IMG=13;
function Page(){}Page.REG=0;Page.TOS=1;Page.SoftBlock=2;

function validateDisplayName(displayName){	
	if(displayName.length < 1 ){return RetVal.EMPTY_ERR;}
	else if( displayName.length > 16){return RetVal.MIN_MAX_ERR;}
	else{
                        var dNameRegEx = /'.*'/;
                        if (dNameRegEx.test(displayName)) { return RetVal.INVALID_ERR; }

 			var excludeChars="<>\"&%\/\\"; 		
 			for(var i=0;i<displayName.length;i++){
 				if(excludeChars.indexOf(displayName.charAt(i)) != -1){	return RetVal.INVALID_ERR;}  
 			}
 		}		
 	return RetVal.SUCCESS; 
}


function validateAsqCreate(qtn,ans,ansretype,err,ssnQtnId){
var answer = ans.value;
var answerRetype = ansretype.value;
if(err == AsqVal.QTN_ERR){
	if(qtn.value==""){return AsqVal.QTN_ERR;}
}
if(err == AsqVal.ANS_ERR){
	if(qtn.value==ssnQtnId){
	var result1,result2;
	var regExp = /^([0-9]{4})$/; 
	result1 = regExp.test(answer);
	result2= regExp.test(answerRetype);
	if(answer=="0000" || !(result1 && result2)){ return AsqVal.ANS_ERR;}
 	}
	 if(answer.length<1 || answerRetype.length <1 || (answer!= answerRetype) ){ return AsqVal.ANS_ERR;}
	 
}
else {return RetVal.SUCCESS;}
}

function validateNonUSZipCode(zipcode){ 	
	if(zipcode.length < 1){	return RetVal.EMPTY_ERR;}
	else if(zipcode.length > 10){return RetVal.MIN_MAX_ERR ;}
	else {
		var zipRegExp=/^([a-zA-Z0-9]{1})([a-zA-Z0-9\s#-]*)$/;
		var result = (zipRegExp.test(zipcode)) ? RetVal.SUCCESS : RetVal.INVALID_ERR;
		return result;
	}	
 }
 
function y2k(number) { return (number < 1000) ? number + 1900 : number; }

function snsDOBCheck(monthField,dayField,yearField) {
	yearField.value = trimString(yearField.value);
	var yyyy = 	(yearField.value);
	if (monthField.value == "" || dayField.value == "" || yyyy== "yyyy" ) {return false;}	
	var yearRegExp = /^([0-9]{4})$/;
	if (!yearRegExp.test(yyyy)) { return false; }
	if ( yyyy < 1800){ return false; } 
	var mm = (monthField.value);
	var dd = parseInt(dayField.value);
	var mon = mm-1;
	var now = new Date();	
	var today = new Date(now.getFullYear(),now.getMonth(),now.getDate());
	var bdate = new Date(yyyy,mon,dd);	 
	if(bdate.getTime() >= today.getTime()){ return false; }
	else if(dd == 31 && ( mm==4 || mm==6 || mm==9 || mm==11)){ return false;}
	else if(dd >=30 && mm==2){ return false;}
	else if(mm==2 && dd==29 && (! (yyyy%4==0 && (yyyy%100!=0 || yyyy%400==0)))){ return false;}
	else { return true;}    
} 
 
 function isUSCountry(countryVal){ 
 	var result = false;
 	var USList = new Array("US","PR","VI","GU"); 	
 	for(var i=0; i<USList.length; i++){
 		if(countryVal == USList[i]){result = true;}
 	}
 	return result; 
 }
 
function enableZipCodeDesc(formName,zipcodedescId){
 if(formName != null && formName !=""){
	var countryFound = false;
	var zipCodeFound = false;
	var form,currElement;
	var fname = formName.toLowerCase();
	if(fname=='loginform'){form= document.loginForm;}
	else if(fname == 'registrationform'){ form= document.registrationForm; }
	else{ form ="";  } 
	var totalFormElements = form.length;	
	for(var i=0;i< totalFormElements ;i++){
        currElement = form.elements[i].name;
    	if(  currElement == "country"){ countryFound =true; }
     	if( currElement == "zipCode"){zipCodeFound = true; } 
  	}     
 	if( countryFound && zipCodeFound){ 
       ( isUSCountry(form.country.value) )?  document.getElementById(zipcodedescId).style.display="" : document.getElementById(zipcodedescId).style.display="none";        
     } 
 }
}
 
 function checkAsqAnswer(form,isAsqOptional,asqAnsReqId,asqReAnsReqId,ssnQtnId,asqAnsId,asqReAnsId){
 var selectedId = form.asqStdQtnId.value;
 form.asqStdQuestion.value= form.asqStdQtnId.options[form.asqStdQtnId.selectedIndex].innerHTML; 
 if(selectedId!="" && isAsqOptional==1){
 	document.getElementById(asqAnsReqId).style.display="";
 	document.getElementById(asqReAnsReqId).style.display="";
 }else if(selectedId=="" && isAsqOptional==1){
 	document.getElementById(asqAnsReqId).style.display="none";
 	document.getElementById(asqReAnsReqId).style.display="none";
 } 
 if(selectedId==ssnQtnId){
 document.getElementById(asqAnsId).maxLength=4;
 document.getElementById(asqReAnsId).maxLength=4;
 }else{
 document.getElementById(asqAnsId).maxLength=80;
 document.getElementById(asqReAnsId).maxLength=80;
 }
 }
 
 function snsshow_popuperror(err){ alert(err); } 
 
 function snsshow_validation_error(elementId,errMessage){	
	document.getElementById(elementId).style.display="";
	document.getElementById(elementId).innerHTML="<font color=#CC0000>"+errMessage+"</font>";
}


function highlightOrClearValidationError(blockArray,bgColorIdArray,textColorIdArray,clearOrHighlightCode){
 // clearOrHighlightCode='0' means clearing all highlighted rows/blocks. clearOrHighlightCode='1' means highlighting specified row/block.
 	var i; 	
 	if(clearOrHighlightCode=="0"){
 		 for(i=0;i<textColorIdArray.length;i++){
 			document.getElementById(textColorIdArray[i]).style.color="";
 		}
 	}else{ 	
  		for(i=0;i<textColorIdArray.length;i++){
 			document.getElementById(textColorIdArray[i]).style.color="#CC0000";
 		} 	
 	} 
 } 

function snsclearhighlights_Reg(fieldArr,displayBirthDate,regType,prefillId)
{	
	document.getElementById("sns_ErrorBox").innerHTML="";
	document.getElementById("sns_ErrorBox").style.display="none";
	var bgColorIdArray = new Array();
	var textColorIdArray = new Array();
	var blockArray =new Array();
	if(!prefillId){
		textColorIdArray = ["snLbl"];
		if(regType==RegType.ONS){
			textColorIdArray.push("reEmailLbl");
		}
	}	
	textColorIdArray.push("pwdLbl");
	textColorIdArray.push("rePwdLbl");
	if(fieldArr[Elmt.DN][1] || fieldArr[Elmt.DN][2]){
		textColorIdArray.push("dnameLbl");			
	} 
	if(fieldArr[Elmt.ASQ][1] || fieldArr[Elmt.ASQ][2]){
		textColorIdArray.push("asqLbl","asqAnsLbl","asqReAnsLbl");	
	}	
	if(regType==RegType.SN){
            if(fieldArr[Elmt.EMAIL][1] || fieldArr[Elmt.EMAIL][2]){
		textColorIdArray.push("altEmailLbl");
      }		
	}
	if(fieldArr[Elmt.BDATE][1] || fieldArr[Elmt.BDATE][2]){	
	if(displayBirthDate){
			textColorIdArray.push("bdateLbl");	
		}
	}
	if(fieldArr[Elmt.GENDER][1] || fieldArr[Elmt.GENDER][2]){
		textColorIdArray.push("genderLbl");	
	}
	if(fieldArr[Elmt.COUNTRY][1] || fieldArr[Elmt.COUNTRY][2]){
		textColorIdArray.push("countryLbl");
	}
	if(fieldArr[Elmt.ZIP][1] || fieldArr[Elmt.ZIP][2]){
		textColorIdArray.push("zipcodeLbl");
	}
		
	textColorIdArray.push("imageLbl");
	
	highlightOrClearValidationError(blockArray,bgColorIdArray,textColorIdArray,"0");
}	

function validateRegistration(fieldArr,displayBirthDate,errText,form,regType,prefillId,ssnQtnId){
	// the following code is to check if audio popup window	is still open and if its still open then it will close before submitting registration information.
	//popupwin is the open popup window used for audio popup page.It is defined in window.js
	var regValidationResult=true;
	var setFocus=false;
	var bgColorIdArray = new Array();
 	var textColorIdArray = new Array();
 	var blockArray = new Array();
	if(popupwin && popupwin.open && !popupwin.closed){
		popupwin.close();
	}
	var regForm = form;	
	snsclearhighlights_Reg(fieldArr,displayBirthDate,regType,prefillId);
	var SN = regForm.loginId;
		SN.value= trimString(SN.value);
	var SNRetVal;
	var emailErr =false;
	

if (!prefillId) {

 if(regType==RegType.ONS){    
  var reemail=regForm.reemail;
  reemail.value= trimString(reemail.value);
  
  
  if(blkdDomainForONS(SN.value)) {
   emailErr=true;
  }
  
  

  else if((validateEmail(SN.value) != RetVal.SUCCESS) || (validateEmail(reemail.value) != RetVal.SUCCESS) || ((SN.value).toLowerCase() != (reemail.value).toLowerCase())){ 
   emailErr =true;
  } 
 
 
  if(emailErr) { 
   textColorIdArray.push("snLbl");
   textColorIdArray.push("reEmailLbl");  
   SN.value="";
   reemail.value="";
   if(!setFocus) { 
     SN.focus(); 
     setFocus = true; 
    }
    regValidationResult=false;
  }
   
 
 }



 else if(regType==RegType.SN) {
  if(validateSN(SN.value) != RetVal.SUCCESS) {
   textColorIdArray.push("snLbl");    
   if(!setFocus) { 
    SN.focus(); 
    setFocus = true; 
   }
  regValidationResult=false;
 }
}  


}


      var pwd1 = regForm.password; 
	var pw1 = pwd1.value;
	var pwd2 = regForm.passwordretype; 	
	var pw2 = pwd2.value;
	if((validatePassword(pw1) != RetVal.SUCCESS) || (validatePassword(pw2) != RetVal.SUCCESS) || (pw1 != pw2)){
		textColorIdArray.push("pwdLbl");
		textColorIdArray.push("rePwdLbl");		
		pwd1.value=""; pwd2.value="";
	    if(!setFocus){pwd1.focus();setFocus=true;}
		regValidationResult=false;
     }		
	if(fieldArr[Elmt.DN][1] || fieldArr[Elmt.DN][2]){
		var dName = regForm.displayName;
		    dName.value = trimString(dName.value);
		var displayNameVal = dName.value;	
		if( displayNameVal.length > 0 || fieldArr[Elmt.DN][1]){
			if(validateDisplayName(displayNameVal) != RetVal.SUCCESS){
				textColorIdArray.push("dnameLbl");		
		 		if(!setFocus){dName.focus();setFocus=true;}
		 		regValidationResult=false;
			}
	 	}
	}
	if(fieldArr[Elmt.ASQ][1] || fieldArr[Elmt.ASQ][2]){
		var asq = regForm.asqStdQtnId;
		if(asq.value!="" || fieldArr[Elmt.ASQ][1] || regForm.asqAnswer.value.length>0 || regForm.asqAnswerRetype.value.length>0 ){
			if(validateAsqCreate(regForm.asqStdQtnId,regForm.asqAnswer,regForm.asqAnswerRetype,AsqVal.QTN_ERR, ssnQtnId)== AsqVal.QTN_ERR){	
			textColorIdArray.push("asqLbl");
			if(!setFocus){regForm.asqStdQtnId.focus(); setFocus=true;}
		 			regValidationResult=false;			
		}
		
			if(validateAsqCreate(regForm.asqStdQtnId,regForm.asqAnswer,regForm.asqAnswerRetype,AsqVal.ANS_ERR,ssnQtnId)== AsqVal.ANS_ERR){ 
				textColorIdArray.push("asqAnsLbl","asqReAnsLbl");
				if(!setFocus){regForm.asqAnswer.focus();setFocus=true;}
		 		regValidationResult=false;	
			}
		}
	}	
	if(regType==RegType.SN){ 
             if(fieldArr[Elmt.EMAIL][1] || fieldArr[Elmt.EMAIL][2]){
		var email = regForm.email;
		email = trimString(email.value);
		emailErr = false;
                if( email.length > 0 || fieldArr[Elmt.EMAIL][1]){
                    if(validateEmail(email) != RetVal.SUCCESS){emailErr=true;}
                    else if(blkdDomainForSN(email,SN.value)){emailErr=true;}
                    if(emailErr){
                            textColorIdArray.push("altEmailLbl");
                            if(!setFocus){regForm.email.focus();setFocus=true;}
                            regValidationResult=false;
                    }
                }
             }
 	}
 	if(fieldArr[Elmt.BDATE][1] || fieldArr[Elmt.BDATE][2]){	
	if(displayBirthDate){
  		var yyyy = regForm.birthDate_yyyy;
		var mm = regForm.birthDate_mm;
		var dd = regForm.birthDate_dd;
		if(fieldArr[Elmt.BDATE][1] || !(dd.value=="" && mm.value=="" && yyyy.value=="yyyy")){
	  		if(!snsDOBCheck(mm,dd,yyyy)){
	  			textColorIdArray.push("bdateLbl");	
				if(!setFocus){yyyy.focus();setFocus=true;}
				regValidationResult=false;
			}
		}
	}
   }  
   if(fieldArr[Elmt.GENDER][1] || fieldArr[Elmt.GENDER][2]){
      if(fieldArr[Elmt.GENDER][1]){
      	if(!isChecked(regForm.gender)){          
          	textColorIdArray.push("genderLbl");	
          	if(!setFocus){regForm.gender[1].focus();setFocus=true;}
 		  	regValidationResult=false;
	 	}		
	 }
  }
 if(fieldArr[Elmt.COUNTRY][1] || fieldArr[Elmt.COUNTRY][2]){
	if(fieldArr[Elmt.COUNTRY][1]){
	var cntry = regForm.country; 		 
		if(trimString(cntry.value)==""){
 			textColorIdArray.push("countryLbl");	       
        	if(!setFocus){cntry.focus();setFocus=true;}
 			regValidationResult=false; 
 		}	
	}		
}
	var validZip = true;
	validZip = valZip(fieldArr[Elmt.ZIP][2],fieldArr[Elmt.ZIP][1],regForm);
	if(!validZip){
			textColorIdArray.push("zipcodeLbl");	
			if(!setFocus){regForm.zipCode.focus();setFocus=true;}
 			regValidationResult=false; 		
	}
	var  regImg = regForm.regImgWord; 	
  if ( !snscheckregimagtext(regImg)) {		
    textColorIdArray.push("imageLbl");
    if(!setFocus){regImg.focus();setFocus=true;}
	regValidationResult=false;
  }	 
 			
  if(!regValidationResult){ 	
	//snsshow_popuperror(errText);
	highlightOrClearValidationError(blockArray,bgColorIdArray,textColorIdArray,"1");
	snsshow_validation_error("sns_ErrorBox",errText);
 }
 return regValidationResult;
}

function snsclearhighlights_TOS(fieldArr,idType,asqOnfile,asqNotAllowed,disableImgChk,displayBirthDate)
{	
	document.getElementById("sns_ErrorBox").innerHTML="";
	document.getElementById("sns_ErrorBox").style.display="none";
	var bgColorIdArray = new Array();
	var textColorIdArray = new Array();
	var blockArray = new Array();	
	if(fieldArr[Elmt.DN][1] || fieldArr[Elmt.DN][2]){
		
		textColorIdArray = ["dnameLbl"];
		
	}
	if(!(asqOnfile || asqNotAllowed)){
		if(fieldArr[Elmt.ASQ][1] || fieldArr[Elmt.ASQ][2]){
			textColorIdArray.push("asqLbl","asqAnswerLbl","asqReAnswerLbl");
		}
	}
	if(idType==RegType.SN){
            if(fieldArr[Elmt.EMAIL][1] || fieldArr[Elmt.EMAIL][2]){ 			
		textColorIdArray.push("altEmailLbl");
		
            }
	}
	if(fieldArr[Elmt.BDATE][1] || fieldArr[Elmt.BDATE][2]){
		if(displayBirthDate){textColorIdArray.push("bdateLbl");}
	}
	if(fieldArr[Elmt.GENDER][1] || fieldArr[Elmt.GENDER][2]){		
		textColorIdArray.push("genderLbl");		
	}	
	if(fieldArr[Elmt.COUNTRY][1] || fieldArr[Elmt.COUNTRY][2]){
		textColorIdArray.push("countryLbl");
	}	
	if(fieldArr[Elmt.ZIP][1] || fieldArr[Elmt.ZIP][2]){
		textColorIdArray.push("zipcodeLbl");
	}	
	if(!disableImgChk){	
		textColorIdArray.push("imageLbl");
	}
	highlightOrClearValidationError(blockArray,bgColorIdArray,textColorIdArray,"0");	
}	


function TOSValidations(fieldArr,errText,loginForm,idType,asqOnfile,asqNotAllowed,disableImgChk,ssnQtnId,displayBirthDate){
	// the following code is to check if audio popup window	is still open and if its still open then it will close before submitting registration information.
	//popupwin is the open popup window used for audio popup page.It is defined in window.js
	var loginValidationResult=true;
	var setFocus=false;
	var bgColorIdArray = new Array();
 	var textColorIdArray = new Array();
 	var blockArray = new Array();
	if(popupwin && popupwin.open && !popupwin.closed){
		popupwin.close();
	}			
	snsclearhighlights_TOS(fieldArr,idType,asqOnfile,asqNotAllowed,disableImgChk,displayBirthDate);	
	if(fieldArr[Elmt.DN][1] || fieldArr[Elmt.DN][2]){
	var dName = loginForm.displayName;	
	dName.value = trimString(dName.value);
	var displayNameVal = dName.value;	
	if( displayNameVal.length > 0 || fieldArr[Elmt.DN][1]){
		if(validateDisplayName(displayNameVal) != RetVal.SUCCESS){
			textColorIdArray = ["dnameLbl"];			
		  if(!setFocus){dName.focus(); setFocus=true;}
		 loginValidationResult=false;
		}
	}
	}
	if(!(asqOnfile || asqNotAllowed)){
	if(fieldArr[Elmt.ASQ][1] || fieldArr[Elmt.ASQ][2]){
		var asq = loginForm.asqStdQtnId;
		if(asq.value!="" || fieldArr[Elmt.ASQ][1] || loginForm.asqAnswer.value.length>0 || loginForm.asqAnswerRetype.value.length>0){
		if(validateAsqCreate(loginForm.asqStdQtnId,loginForm.asqAnswer,loginForm.asqAnswerRetype,AsqVal.QTN_ERR,ssnQtnId)== AsqVal.QTN_ERR  ){		
			textColorIdArray.push("asqLbl");
			if(!setFocus){asq.focus(); setFocus=true;}
		 			loginValidationResult=false;			
		}			
		 if(validateAsqCreate(loginForm.asqStdQtnId,loginForm.asqAnswer,loginForm.asqAnswerRetype,AsqVal.ANS_ERR,ssnQtnId)== AsqVal.ANS_ERR  ){ 
				textColorIdArray.push("asqAnswerLbl","asqReAnswerLbl");
				if(!setFocus){loginForm.asqAnswer.focus(); setFocus=true;}
		 			loginValidationResult=false;	
		}
	  } 
	}
	}
	if(idType==RegType.SN){
            if(fieldArr[Elmt.EMAIL][1] || fieldArr[Elmt.EMAIL][2]){
                var email = loginForm.email;
                email=trimString(email.value);
                var emailErr = false;
                if( email.length > 0 || fieldArr[Elmt.EMAIL][1]){
                    if(validateEmail(email) != RetVal.SUCCESS ){emailErr=true;}
                    else if( blkdDomainForSN(email,loginForm.loginId.value)){emailErr =true;}
                    if(emailErr){
                            textColorIdArray.push("altEmailLbl");
                            if(!setFocus){loginForm.email.focus();setFocus=true;}
                            loginValidationResult=false;
                    }
                }
             }
       }
     if(fieldArr[Elmt.BDATE][1] || fieldArr[Elmt.BDATE][2]){
	     if(displayBirthDate){
	  		var yyyy = loginForm.birthDate_yyyy;
			var mm = loginForm.birthDate_mm;
			var dd = loginForm.birthDate_dd;
			if(fieldArr[Elmt.BDATE][1] || !(dd.value=="" && mm.value=="" && yyyy.value=="yyyy")){
				if(!snsDOBCheck(mm,dd,yyyy)){
	  				textColorIdArray.push("bdateLbl");	
	  				if(!setFocus){yyyy.focus();setFocus=true;}
					loginValidationResult=false;
				}
			}
		}
	}		
	if(fieldArr[Elmt.GENDER][1] || fieldArr[Elmt.GENDER][2]){
      if(fieldArr[Elmt.GENDER][1]){
      	if(!isChecked(loginForm.gender)){          

          	textColorIdArray.push("genderLbl");
			if(!setFocus){loginForm.gender[1].focus();setFocus=true;}
 		  	loginValidationResult=false;
	 	}		
	 }
  } 
  if(fieldArr[Elmt.COUNTRY][1] || fieldArr[Elmt.COUNTRY][2]){
	if(fieldArr[Elmt.COUNTRY][1]){
	var cntry = loginForm.country; 	 
		if(trimString(cntry.value)==""){
 			textColorIdArray.push("countryLbl");
			if(!setFocus){cntry.focus();setFocus=true;}
 			loginValidationResult=false; 
 		}	
	}		
  }	
  var validZip = true;
  validZip = valZip(fieldArr[Elmt.ZIP][2],fieldArr[Elmt.ZIP][1],loginForm);
  if(!validZip){
		textColorIdArray.push("zipcodeLbl");
		if(!setFocus){loginForm.zipCode.focus();setFocus=true;}
 		loginValidationResult=false; 		
  }
 if(!disableImgChk){
  var  regImg = loginForm.regImgWord; 	
  if ( !snscheckregimagtext(regImg)) {		
    textColorIdArray.push("imageLbl");
    if(!setFocus){regImg.focus();setFocus=true;}
	loginValidationResult=false;
  } 
  } 
   
  if(!loginValidationResult){ 	
	//snsshow_popuperror(errText);
	highlightOrClearValidationError(blockArray,bgColorIdArray,textColorIdArray,"1");
	snsshow_validation_error("sns_ErrorBox",errText);
  }
  return loginValidationResult;
}
	
function valZip(optZip,reqZip,form){
	var validZip = true;
	if(optZip || reqZip){		
		var zip = form.zipCode;
		zip.value = trimString(zip.value);	
		var zipVal = (zip.value);
		if(reqZip){
			if(zipVal.length < 1){validZip = false;}
			else{		
				var cntryVal = form.country.value;
				var zipTest =  /^([0-9]{5})$/.test(zipVal);
				if(isUSCountry(cntryVal) && ((!(/^([0-9]{5})$/.test(zipVal)) || zipVal=="00000"))){ validZip =false;}
				else if(trimString(cntryVal) != "" && (validateNonUSZipCode(zipVal)!= RetVal.SUCCESS)){validZip =false;}
			}
	 	}
	 }		
	return validZip;	
}
	
function isChecked(formField){
	var found =false;
	var length = formField.length;
 	for(var i=0;i<length;i++){
   		if(formField[i].checked){ found = true; break;}
	}  
 	return found; 
 } 
 
function blkdDomain(email,acctType,snVal){

	var splitArr = email.match("^(.+)@(.+)$");	
	if(splitArr != null && splitArr.length ==3){
	  var domain=splitArr[2].toLowerCase();	
	  var emailVal =  splitArr[1].replace(/\s/g,"");
	  snVal = snVal.replace(/\s/g,"");
	  domain = domain.replace(/\s/g,"");
	  if(domain=="aol.com" || domain =="aim.com" || domain=="netscape.net"){
	      if(acctType==RegType.ONS){return true;}
	      else if(emailVal.toLowerCase()== (snVal).toLowerCase()){return true;}
	  }
	 }
       return false;
}

function blkdDomainForONS(emailAddr){
 //  return blkdDomain(emailAddr,RegType.ONS,"");	
    return false;
}

function blkdDomainForSN(emailAddr,snVal){
  return false;	
}

function showErrField(errText,fldType,fld,pageType,regType){
	var bgColorIdArray = new Array();
	var textColorIdArray = new Array();
    var blockArray = new Array();
    //fld.focus();
	switch(fldType){
	case Req.LOGINID:	textColorIdArray.push("snLbl");
        				if(regType==RegType.ONS){
        					textColorIdArray.push("reEmailLbl");  				
        				}
        				break;
    case Req.BDATE:   	textColorIdArray.push("bdateLbl");
						break;
	case Req.EMAIL: if(pageType==Page.REG){						
						textColorIdArray.push("altEmailLbl");
					}else{
						textColorIdArray.push("altEmailLbl");
						}
						break;
   case Elmt.ZIP:   if(pageType==Page.REG){
   						textColorIdArray.push("zipcodeLbl");
					}else{
						textColorIdArray.push("zipcodeLbl");
					}
					break;
   case	Req.IMG:    if(pageType==Page.REG){
   						textColorIdArray.push("imageLbl");
   					}else{
   						textColorIdArray.push("imageLbl");
						}
   					break;
   case Elmt.ASQ: if(pageType==Page.REG){
   						textColorIdArray.push("asqLbl","asqAnswerLbl","asqReAnswerLbl");	
   					}else{
   						textColorIdArray.push("asqLbl","asqAnswerLbl","asqReAnswerLbl");						
   					}
	}	
	snsshow_validation_error("sns_ErrorBox",errText);
	highlightOrClearValidationError(blockArray,bgColorIdArray,textColorIdArray,"1");
}	

// Validate Soft Block Page Validation

function softBlockValidations(fieldArr,errText,loginForm,idType,asqOnfile,asqNotAllowed,ssnQtnId,valBirthDate) {
// the following code is to check if audio popup window	is still open and if its still open then it will close before submitting registration information.
	//popupwin is the open popup window used for audio popup page.It is defined in window.js
	var asqValidationResult=true;
	var setFocus=false;
	var bgColorIdArray = new Array();
 	var textColorIdArray = new Array();
 	var blockArray = new Array();			
	snsclearhighlights_softBlock(fieldArr,idType,asqOnfile,asqNotAllowed,valBirthDate);

	if(!(asqOnfile || asqNotAllowed)){
	if(fieldArr[Elmt.ASQ][1] || fieldArr[Elmt.ASQ][2]) { 
		var asq = loginForm.asqStdQtnId;
                if(asq.value!="" || fieldArr[Elmt.ASQ][1] || loginForm.asqAnswer.value.length>0 || loginForm.asqAnswerRetype.value.length>0){
                    if(validateAsqCreate(loginForm.asqStdQtnId,loginForm.asqAnswer,loginForm.asqAnswerRetype,AsqVal.QTN_ERR,ssnQtnId)== AsqVal.QTN_ERR  ){		
                            textColorIdArray.push("asqLbl");
                           if(!setFocus){asq.focus(); setFocus=true;}
                            asqValidationResult=false;			
                     }
                     if(validateAsqCreate(loginForm.asqStdQtnId,loginForm.asqAnswer,loginForm.asqAnswerRetype,AsqVal.ANS_ERR,ssnQtnId)== AsqVal.ANS_ERR  ){ 
                             textColorIdArray.push("asqAnswerLbl","asqReAnswerLbl");
                             if(!setFocus){loginForm.asqAnswer.focus(); setFocus=true;}
                                asqValidationResult=false;	
                     }
               } 
            }
	}
	if(idType==RegType.SN){
            if(fieldArr[Elmt.EMAIL][1] || fieldArr[Elmt.EMAIL][2]){
                var email = loginForm.email;
                email=trimString(email.value);
                var emailErr = false;
                if( email.length > 0 || fieldArr[Elmt.EMAIL][1]){
                    if(validateEmail(email) != RetVal.SUCCESS ){emailErr=true;}
                    else if( blkdDomainForSN(email,loginForm.loginId.value)){emailErr =true;}
                    if(emailErr){
                            textColorIdArray.push("altEmailLbl");
                             if(!setFocus){loginForm.email.focus();setFocus=true;}
                            asqValidationResult=false;
                    }
                }
             }
       }
		if(fieldArr[Elmt.BDATE][1] || fieldArr[Elmt.BDATE][2]){
	     if(valBirthDate){
	  		var yyyy = loginForm.birthDate_yyyy;
			var mm = loginForm.birthDate_mm;
			var dd = loginForm.birthDate_dd;
			if(fieldArr[Elmt.BDATE][1] || !(dd.value=="" && mm.value=="" && yyyy.value=="yyyy")){
				if(!snsDOBCheck(mm,dd,yyyy)){
		  			textColorIdArray.push("bdateLbl");	
		  			if(!setFocus){yyyy.focus();setFocus=true;}
					asqValidationResult=false;
				}
			}
		}
	}	
      if(fieldArr[Elmt.GENDER][1] || fieldArr[Elmt.GENDER][2]){
          if(fieldArr[Elmt.GENDER][1]){
            if(!isChecked(loginForm.gender)){          
                     textColorIdArray.push("genderLbl");
                            if(!setFocus){loginForm.gender[1].focus();setFocus=true;}
                            asqValidationResult=false;
                    }		
             }
    }
    if(fieldArr[Elmt.COUNTRY][1] || fieldArr[Elmt.COUNTRY][2]) {
	if(fieldArr[Elmt.COUNTRY][1]){
	var cntry = loginForm.country; 	 
		if(trimString(cntry.value)==""){
 			textColorIdArray.push("countryLbl");
			if(!setFocus){cntry.focus();setFocus=true;}
 			asqValidationResult=false; 
 		}	
	}		
   }	
  var validZip = true;
  validZip = valZip(fieldArr[Elmt.ZIP][2],fieldArr[Elmt.ZIP][1],loginForm);
  if(!validZip){
		textColorIdArray.push("zipcodeLbl");
		if(!setFocus){loginForm.zipCode.focus();setFocus=true;}
 		asqValidationResult=false; 		
  }
    if(!asqValidationResult){ 	
            //snsshow_popuperror(errText);
            highlightOrClearValidationError(blockArray,bgColorIdArray,textColorIdArray,"1");
            snsshow_validation_error("sns_ErrorBox",errText);            
      }
    return asqValidationResult;
}

// clear highlighted fiels for Soft block page

function snsclearhighlights_softBlock(fieldArr,idType,asqOnfile,asqNotAllowed,valBirthDate)
{	
	document.getElementById("sns_ErrorBox").innerHTML="";
	document.getElementById("sns_ErrorBox").style.display="none";
	var bgColorIdArray = new Array();
 	var textColorIdArray = new Array();
 	var blockArray = new Array();
	if(!(asqOnfile || asqNotAllowed)){
		if(fieldArr[Elmt.ASQ][1] || fieldArr[Elmt.ASQ][2]){
			textColorIdArray.push("asqLbl","asqAnswerLbl","asqReAnswerLbl");
		}
	}
	if(idType==RegType.SN){
            if(fieldArr[Elmt.EMAIL][1] || fieldArr[Elmt.EMAIL][2]){
 		textColorIdArray.push("altEmailLbl");
    }
	}
	if(fieldArr[Elmt.BDATE][1] || fieldArr[Elmt.BDATE][2]){
		if(valBirthDate){textColorIdArray.push("bdateLbl");}
	}
	if(fieldArr[Elmt.GENDER][1] || fieldArr[Elmt.GENDER][2]){
		textColorIdArray.push("genderLbl");
	}	
	if(fieldArr[Elmt.COUNTRY][1] || fieldArr[Elmt.COUNTRY][2]){
		textColorIdArray.push("countryLbl");
	}	
	if(fieldArr[Elmt.ZIP][1] || fieldArr[Elmt.ZIP][2]){
		textColorIdArray.push("zipcodeLbl");
	}	
	highlightOrClearValidationError(blockArray,bgColorIdArray,textColorIdArray,"0");	
}

function snsclearhighlights_hardBlock(asqOnfile,enableCaptcha)
{	
	document.getElementById("sns_ErrorBox").innerHTML="";
	document.getElementById("sns_ErrorBox").style.display="none";
	var bgColorIdArray = new Array();
 	var textColorIdArray = new Array();
 	var blockArray = new Array();
 	textColorIdArray.push("dnameLbl");
 	if(!(asqOnfile)){
		textColorIdArray.push("asqLbl","asqAnswerLbl","asqReAnswerLbl");
	}
	textColorIdArray.push("altEmailLbl");
	textColorIdArray.push("bdateLbl");
	textColorIdArray.push("genderLbl");		
	textColorIdArray.push("countryLbl");	
	textColorIdArray.push("zipcodeLbl");
	if(enableCaptcha){
		textColorIdArray.push("imageLbl");
	}
	highlightOrClearValidationError(blockArray,bgColorIdArray,textColorIdArray,"0");	
}

function HBlkValidations(errText,loginForm,idType,asqOnfile,enableCaptcha,ssnQtnId){
var loginValidationResult=true;
	var setFocus=false;
	var bgColorIdArray = new Array();
 	var textColorIdArray = new Array();
 	var blockArray = new Array();
	if(popupwin && popupwin.open && !popupwin.closed){
		popupwin.close();
	}
	snsclearhighlights_hardBlock(asqOnfile,enableCaptcha);	
	var dName = loginForm.displayName;	
	dName.value = trimString(dName.value);
	var displayNameVal = dName.value;	
	if( displayNameVal.length > 0 ){
		if(validateDisplayName(displayNameVal) != RetVal.SUCCESS){
			textColorIdArray = ["dnameLbl"];			
		  if(!setFocus){dName.focus(); setFocus=true;}
		 loginValidationResult=false;
		}
	}
	if(!(asqOnfile)){
	var asq = loginForm.asqStdQtnId;
	if(validateAsqCreate(loginForm.asqStdQtnId,loginForm.asqAnswer,loginForm.asqAnswerRetype,AsqVal.QTN_ERR,ssnQtnId)== AsqVal.QTN_ERR  ){		
		textColorIdArray.push("asqLbl");
		if(!setFocus){asq.focus(); setFocus=true;}
	 			loginValidationResult=false;			
	}			
	 if(validateAsqCreate(loginForm.asqStdQtnId,loginForm.asqAnswer,loginForm.asqAnswerRetype,AsqVal.ANS_ERR,ssnQtnId)== AsqVal.ANS_ERR  ){ 
			textColorIdArray.push("asqAnswerLbl","asqReAnswerLbl");
			if(!setFocus){loginForm.asqAnswer.focus(); setFocus=true;}
	 			loginValidationResult=false;	
	}
   }
	var email = loginForm.email;
    email=trimString(email.value);
    var emailErr = false;
    if( email.length > 0 ){
        if(validateEmail(email) != RetVal.SUCCESS ){emailErr=true;}
        else if( blkdDomainForSN(email,loginForm.loginId.value)){emailErr =true;}
        if(emailErr){
                textColorIdArray.push("altEmailLbl");
                if(!setFocus){loginForm.email.focus();setFocus=true;}
                loginValidationResult=false;
        }
    }
    var yyyy = loginForm.birthDate_yyyy;
		var mm = loginForm.birthDate_mm;
		var dd = loginForm.birthDate_dd;
  		if(!snsDOBCheck(mm,dd,yyyy)){
  			textColorIdArray.push("bdateLbl");	
			if(!setFocus){yyyy.focus();setFocus=true;}
			loginValidationResult=false;
		}
    if(!isChecked(loginForm.gender)){          

          	textColorIdArray.push("genderLbl");
			if(!setFocus){loginForm.gender[1].focus();setFocus=true;}
 		  	loginValidationResult=false;
	 	}
	var cntry = loginForm.country; 	 
		if(trimString(cntry.value)==""){
 			textColorIdArray.push("countryLbl");
			if(!setFocus){cntry.focus();setFocus=true;}
 			loginValidationResult=false; 
 	}
 	var validZip = true;
  validZip = valZip(false,true,loginForm);
  if(!validZip){
		textColorIdArray.push("zipcodeLbl");
		if(!setFocus){loginForm.zipCode.focus();setFocus=true;}
 		loginValidationResult=false; 		
  }
  if(enableCaptcha){
  var  regImg = loginForm.regImgWord; 	
  if ( !snscheckregimagtext(regImg)) {		
    textColorIdArray.push("imageLbl");
    if(!setFocus){regImg.focus();setFocus=true;}
	loginValidationResult=false;
  } 
  } 
  if(!loginValidationResult){ 	
	highlightOrClearValidationError(blockArray,bgColorIdArray,textColorIdArray,"1");
	snsshow_validation_error("sns_ErrorBox",errText);
  }
  return loginValidationResult;
}

function clearyear(bYear,defYear)
{
if(bYear.value=='') bYear.value=defYear;
}
function populateyear(bYear,defYear)
{
if(bYear.value==defYear) bYear.value='';
}
