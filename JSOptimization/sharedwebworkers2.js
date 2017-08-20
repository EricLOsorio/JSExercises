var start2 = document.getElementById('start2');


start2.addEventListener('click', function(event){

	var testWorker = new SharedWorker('sharedworker.js');

	testWorker.port.postMessage(20);

	testWorker.port.onmessage = function (message){
		console.log('script 2: ', message.data);
	};	
})

