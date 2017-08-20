var button = document.getElementById('start');


button.addEventListener('click', function(event){

	var testWorker = new Worker('worker.js');

	testWorker.postMessage(50);

	testWorker.onmessage = function (message){
		console.log(message.data);
	};	
})

