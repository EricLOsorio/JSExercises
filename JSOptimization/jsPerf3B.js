window.onload=(function() {

var resize = document.getElementById('resize'),
    divs = Array.from(document.querySelectorAll('div'));
 
resize.addEventListener('click', function () {
    divs.forEach(function (div) {
 
        var width = div.clientWidth;
        requestAnimationFrame(function () {
            div.style.height = Math.floor(Math.random() * width + 10) + 'px';
        });
     });
});

})