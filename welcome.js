window.onload=(function(){
  var choices=document.getElementById("showChoices");
  var formBlock=document.getElementById("preferences");
  var submit=document.getElementById('submit');
	var perfObj={};
  var index=0;

  while(index<localStorage.length && localStorage.key(index)!=='pagePreferences'){
      index++;
  	};

  	if(index!==localStorage.length){
        perfObj=JSON.parse(localStorage.getItem('pagePreferences'));
  		document.body.style.backgroundColor=perfObj['backgroundColor'];
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

    var greeting=document.getElementById('greeting');
    var backgroundColor=document.getElementById('background-color');
    var fonts=document.getElementById('fonts');
    var size=document.getElementById('size');
    var personal=document.getElementById('personalGreeting');

  	var i=0;
  

  	console.log(greeting.value);
  	console.log(i);
  	
  	while(i<localStorage.length && localStorage.key(i)!=='pagePreferences'){
      i++;
  	};

  	console.log(i);

  	if(i===localStorage.length){
  		perfObj['greeting']=greeting.value; alert(greeting.value);
  		perfObj['backgroundColor']=backgroundColor.value;
  		perfObj['font']=fonts.value;
  		perfObj['size']=size.value;
  		console.log(perfObj);
  		localStorage.setItem('pagePreferences',JSON.stringify(perfObj));
  	} else { 
  		perfObj['greeting']=greeting.value; alert(greeting.value);
  		perfObj['backgroundColor']=backgroundColor.value; alert(perfObj['backgroundColor']);
  		perfObj['font']=fonts.value;
  		perfObj['size']=size.value;
        localStorage.setItem('pagePreferences',JSON.stringify(perfObj));

  		// document.body.style.backgroundColor=perfObj['backgroundColor'];
  	};

  		  	window.location.reload();



  	e.preventDefault();

  })





}(window.console))