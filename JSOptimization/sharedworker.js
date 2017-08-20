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
 

onconnect = function (event){

    var port = event.ports[0];
    
    let sequence = fibonacci();

    port.onmessage = function(message){
        var fibs = [];

        while (fibs.length < message.data) {
            fibs.push(sequence.next().value);
        };

        port.postMessage(fibs);
    };


};

