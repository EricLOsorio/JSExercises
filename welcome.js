window.onload=(function(){
  var choices=document.getElementById("showChoices");
  var formBlock=document.getElementById("preferences");
  var submit=document.getElementById('submit');
	var perfObj={};
  var index=0;

  var greeting=document.getElementById('greeting');
  var backgroundColor=document.getElementById('background-color');
  var fonts=document.getElementById('fonts');
  var size=document.getElementById('size');
  var personal=document.getElementById('personalGreeting');


  while(index<localStorage.length && localStorage.key(index)!=='pagePreferences'){
      index++;
  	};

  	if(index!==localStorage.length){
        perfObj=JSON.parse(localStorage.getItem('pagePreferences'));
  		document.body.style.backgroundColor=perfObj['backgroundColor'];
      personal.innerHTML=perfObj['greeting'];
      document.body.style.fontFamily="'"+perfObj['font']+"'";
      document.body.style.fontSize=perfObj['size'];

  	};


  function showPref(el){
    el.style.display='block';
  }

  function hidePref(el){
  	el.style.display='none';
  }

  choices.addEventListener('click',function(event){ 
 	if(window.getComputedStyle(formBlock,null).getPropertyValue('display')==='none'){ 
 		showPref(formBlock);
 	} else { 
 		hidePref(formBlock);
 	};

  })

  submit.addEventListener('click',function(e){


  	perfObj['greeting']=greeting.value; 
    perfObj['backgroundColor']=backgroundColor.value; 
  	perfObj['font']=fonts.value;
  	perfObj['size']=size.value;
    localStorage.setItem('pagePreferences',JSON.stringify(perfObj));


  	window.location.reload();



  	e.preventDefault();

  })





}(window.console))