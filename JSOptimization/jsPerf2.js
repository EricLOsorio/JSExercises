window.onload=(function() {

let addRows = document.getElementById('addRows');
addRows.addEventListener('click', function () {
    for (let x = 0; x < 50000; x += 1) {
        let table = document.getElementById('myTable'),
            row = document.createElement('tr'),
            cell = document.createElement('td'),
            cell1 = cell.cloneNode(),
            cell2 = cell.cloneNode(),
            cell3 = cell.cloneNode();
 
        cell1.textContent = 'A';
        cell2.textContent = 'B';
        cell3.textContent = 'C';
 
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        table.appendChild(row);
    }
});

})