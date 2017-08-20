var start1 = document.getElementById('start1');


start1.addEventListener('click', function(event){

	var testWorker = new SharedWorker('sharedworker.js');

	testWorker.port.postMessage(10);

	testWorker.port.onmessage = function (message){
		console.log('script 1: ', message.data);
	};	
})

