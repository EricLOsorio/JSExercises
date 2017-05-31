window.onload=(function(){

	var inputs=document.getElementsByTagName('INPUT');
	var labels=document.getElementsByTagName('LABEL');

    window.addEventListener('click',function(event){
//       console.log(event.target);
       if(event.target.getAttribute('class')==='inputTab'){
         localStorage.setItem('lastTab',event.target.id);
//         alert('localSTorage is '+localStorage.getItem('lastTab'));
       }
    });

//    alert(localStorage.length);

    var i=0;

    while(i<localStorage.length && localStorage.key(i)!=='lastTab'){
    	i++;
    }
    
//    for(var i=0; i<localStorage.length;i++){
//    	alert(localStorage.key(i)+' '+localStorage.getItem(localStorage.key(i)));
	  if(i<localStorage.length){
//		alert("Last Tab Exists "+localStorage.key(i));
		document.getElementById(localStorage.getItem('lastTab')).checked=true;
	  } else {
//	  	alert("Last Tab does not exist");
	  	localStorage.setItem('lastTab', 'one'); 
        document.getElementById(localStorage.getItem('lastTab')).checked=true;	  	   	
      }
//	} 




}(window.console))