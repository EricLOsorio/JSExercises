var list=document.getElementById('selectionList');

window.addEventListener('storage',function(event){
	localStorage.setItem(event.key,event.newValue);
	list.innerHTML=event.key+' '+localStorage.getItem(event.key);
})
