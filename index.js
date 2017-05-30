var items=document.getElementsByClassName('selection');

var submit=document.getElementById('submit');

submit.addEventListener('click',function(e){
	alert(items[1].value);
  localStorage.setItem(items[0].value,items[1].value);	
  e.preventDefault();
})


