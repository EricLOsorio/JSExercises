window.onload=(function() {

var resize = document.getElementById('resize');


resize.addEventListener('click', function () {

	var start = performance.now();

   requestAnimationFrame(function () {

    var docFragment = document.createDocumentFragment();
   	var sectionOnPage = document.getElementsByTagName("SECTION")[0];
   	var sectionOnPageParent = sectionOnPage.parentNode;
   	var divsOnPage = sectionOnPage.querySelectorAll("DIV");
   	var sectionClone = document.querySelector("#divs").cloneNode(true);
    var clonedDivs = sectionClone.querySelectorAll("DIV");


    sectionClone.id='divs';


   	for(var i=0; i<divsOnPage.length; i++){ 


    var pageDivWidthString = window.getComputedStyle(divsOnPage[i],null).getPropertyValue("width");

    var pattern = /^[0-9]*/gm;

    var width = pageDivWidthString.match(pattern)[0];


 
    	   clonedDivs[i].style.height = Math.floor(Math.random() * width + 10) +`px`;
   

    } //); //forEach loop

    //delete original section node

    	sectionOnPage.parentNode.removeChild(sectionOnPage);

    	docFragment.appendChild(sectionClone);

    	sectionOnPageParent.appendChild(docFragment);

 });

   console.log(`finished in: ${(performance.now() - start).toFixed(2)}ms`);


}); //event listener



})