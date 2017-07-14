window.onload=(function(){
  let choices=document.getElementById("showChoices");
  let formBlock=document.getElementById("preferences");
  let submit=document.getElementById('submit');

//The perfObj was used prior to using a Map  
//	let perfObj={};

  let index=0;

  let greeting=document.getElementById('greeting');
  let backgroundColor=document.getElementById('background-color');
  let fonts=document.getElementById('fonts');
  let size=document.getElementById('size');
  let personal=document.getElementById('personalGreeting');


  while(index<localStorage.length && localStorage.key(index)!=='pagePreferences'){
      index++;
  	};


  	if(index!==localStorage.length){
      perfObj=new Map(JSON.parse(localStorage.getItem('pagePreferences')));


// Alternative code pre ES2015
  		/*document.body.style.backgroundColor=perfObj['backgroundColor'];
      personal.innerHTML=perfObj['greeting'];
      document.body.style.fontFamily="'"+perfObj['font']+"'";
      document.body.style.fontSize=perfObj['size'];*/


      document.body.style.backgroundColor=perfObj.get('backgroundColor');
      personal.innerHTML=perfObj.get('greeting');
      document.body.style.fontFamily=`'${perfObj.get('font')}'`;
      document.body.style.fontSize=perfObj.get('size');      


  	};


  function showPref(el){
    el.style.display='block';
  }

  function hidePref(el){
  	el.style.display='none';
  }

  choices.addEventListener('click', event=>{ 
 	if(window.getComputedStyle(formBlock,null).getPropertyValue('display')==='none'){ 
 		showPref(formBlock);
 	} else { 
 		hidePref(formBlock);
 	};

  })

  submit.addEventListener('click',e=>{

      let perfObj= new Map();  //ES2015 Code

//Pre ES2015 Code      

/*
  	perfObj['greeting']=greeting.value; 
    perfObj['backgroundColor']=backgroundColor.value; 
  	perfObj['font']=fonts.value;
  	perfObj['size']=size.value;
    localStorage.setItem('pagePreferences',JSON.stringify(perfObj));*/

    perfObj.set('greeting',`${greeting.value}`);
    perfObj.set('backgroundColor',`${backgroundColor.value}`);
    perfObj.set('font',`${fonts.value}`);
    perfObj.set('size',`${size.value}`);
    localStorage.setItem('pagePreferences',JSON.stringify([...perfObj]));


  	window.location.reload();



  	e.preventDefault();

  })





}(window.console))