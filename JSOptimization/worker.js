function* fibonacci() {
    var current = a = b = 1;
 
    yield 1;
 
    while (true) {
        current = b;
 
        yield current;
 
        b = a + b;
        a = current;
    }
}
 
let sequence = fibonacci();

onmessage = function(message){
	var fibs = [];

	while (fibs.length < message.data) {
		fibs.push(sequence.next().value);
	};

	postMessage(fibs);
};

