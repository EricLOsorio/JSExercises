function reverse(arr){

	let newArr = [];

	arr.forEach(function(str){

 		let newStr='';

		for(let i=str.length -1; i>=0; i--){
			newStr = newStr + str[i];
		};

		newArr.push(newStr)
	});

   return newArr;
}

onmessage = function(message){

	postMessage(reverse(message.data));


}
