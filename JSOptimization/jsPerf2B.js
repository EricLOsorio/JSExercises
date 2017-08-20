window.onload=(function() {

let addRows = document.getElementById('addRows');
addRows.addEventListener('click', function () {

let table = document.getElementById('myTable'),
    cell = document.createElement('td'),
    docFragment = document.createDocumentFragment();
 
for (let x = 0; x < 50000; x += 1) {
    let row = document.createElement('tr'),
        cell1 = cell.cloneNode(),
        cell2 = cell.cloneNode(),
        cell3 = cell.cloneNode();
 
    cell1.textContent = 'A';
    cell2.textContent = 'B';
    cell3.textContent = 'C';
 
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
 
    docFragment.appendChild(row);
}
 
table.appendChild(docFragment);

});

})