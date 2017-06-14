window.onload=(function(){

//Global variables for the submit and update buttons
  var submit=document.getElementById('submit');
  var update=document.getElementById('update');

//Global variable for array of initial keys that will get stored in session storage
  var initKeyArray=[];


/****************This block gets called at the end of the successful execution of getting all records*****************************/
/****************When the main request to open the database is called*******************************************************/

function deletes(){

  var allDeletes=document.getElementsByClassName('delete');  //get all the delet buttons


  for(var i=0;i<allDeletes.length;i++){ //monitors all the delete buttons to determine which has been clicked

    allDeletes[i].addEventListener('click',function(event){ //event listener to trigger function when a delete button is clicked

  	var request=window.indexedDB.open('myDB',1); //open sub request for database, will be used for deletions

    var indx=event.target.getAttribute('id'); //variable that will hold the id of the clicked element, which will be the same as the record key for the intended record

    document.cookie=('deleteIndexCookie='+indx); //cookie holding the id which equals the key number of the record that was clicked for deletion

    var cookieString=document.cookie; //get the cookie into a string

    var cookieStr=cookieString.split('='); //split the string to separate cookie name from its value, the value is the records key marked for deletion


    request.onsuccess=function(event){ //on success of database request opening, get everything ready for deletion of intended record
    	var db=event.target.result, //db opening
    	    trans=db.transaction('friends','readwrite'), //transaction specification needs readwrite in order to do deletions
    	    objStore=trans.objectStore('friends'), //ojbect store holding records
    	    del=objStore.delete(parseInt(cookieStr[1])); //delete the record marked for deletion per the cookie string value previously stored

    	  del.onsuccess=function(event){  //on a successful deletion of a record

          var keysFromStorage=sessionStorage.getItem('initialKeys'); //get the string of array of keys for the current list of records on the page

          var initialKeysArray=JSON.parse(keysFromStorage); //convert the string to an actual array

          var toDelete=initialKeysArray.indexOf(parseInt(cookieStr[1]));//the array element matching the cookie (key of deleted record) will also be deleted from the session storage tracking current list of records keys

          initialKeysArray.splice(toDelete,1); //delete the key number of record deleted from the tracking array

          sessionStorage.setItem('initialKeys',JSON.stringify(initialKeysArray)); //update the session storage reflecting the current records' keys

    	  };
    }

  event.target.parentElement.parentElement.parentElement.removeChild(event.target.parentElement.parentElement); //delete row from page

  });




 } //alldeletes loop to monitor which delete button has been clicked

}


/*********************This block is used to lock or unlock the records for updates*********************************/

  function updateableRecords(choice){ //choice=true will prevent records from being modified 
  	var	allInputs=document.getElementsByTagName('INPUT');

	      for(var i=0;i<allInputs.length;i++){
	      	allInputs[i].readOnly=choice;
	      };

	      if(!choice){ //if choice=false, the inputs will allow changes and focus will be directed to the first one
	      	allInputs[0].focus();
	      };
	      
  };

  submit.addEventListener('click',function(event){ //submit click will lock inputs to readonly
         updateableRecords(true);
  	
  });

  update.addEventListener('click',function(event){ //update click will unlock inputs to be modified
  	updateableRecords(false);
  });


/****************************************************************************************************/

  if('indexedDB' in window) { //check to see if indexedDB is supported

  	var request=window.indexedDB.open('myDB',1); 

/********************************************Block for initial creation of objectStore*******************************/

    request.onupgradeneeded = function(event){

      var db = event.target.result;

      var objectStore = db.createObjectStore('friends');


      objectStore.transaction.oncomplete = function(event){
        var transaction = db.transaction('friends','readwrite'),
            objectStore = transaction.objectStore('friends'),
            friends = [{name:'john', email:'john@j.com',phone:'444-444-4444'},{name:'mike', email:'mike@m.com',phone:'333-333-3333'},{name:'maria', email:'maria@j.com',phone:'222-444-4444'},{name:'mimi', email:'mimi@m.com',phone:'111-333-3333'},{name:'Karl', email:'karl@k.com',phone:'111-222-3333'}];

        var listBody=document.getElementById('listBody');

        friends.forEach(function(friend,index){ //use index of the array element object ask key

          objectStore.add(friend,index);

          initKeyArray.push(index);

        });

      sessionStorage.setItem('initialKeys',JSON.stringify(initKeyArray)); //store the keys of each record in the order they were stored inside sessionStorage
      }

    }
/*************************************************************************************************/    

/****************************Block for successful opening of DB********************************/

  	request.onsuccess = function(event){
  		var db=event.target.result,
            transaction = db.transaction('friends', 'readonly'),
        	objectStore = transaction.objectStore('friends'),
        	getRequest = objectStore.getAll(),                   //get all records
        	listBody=document.getElementById('listBody');

  		getRequest.onsuccess = function(event) { //create all elements where to show records on page

        var keysFromStorage=sessionStorage.getItem('initialKeys'); //keys will be used for delete button ids

        var initialKeysArray=JSON.parse(keysFromStorage); //turn string of keys into acual arrays


  			for(records in event.target.result){ 

  			  var newRow=document.createElement('TR');

  			  var deleteButtonCell=document.createElement('TD');
  			  var updateButtonCell=document.createElement('TD');

  			  var deleteButton=document.createElement('BUTTON');


  			  deleteButton.className="delete";


  			  deleteButton.innerHTML="delete";

          deleteButton.setAttribute('id',initialKeysArray[records]);

  			  deleteButtonCell.appendChild(deleteButton);



  			  for(fields in event.target.result[records]){

  			    var cell=document.createElement('TD');
  			    var inputField=document.createElement('INPUT');

  				inputField.setAttribute('type','text');
  				inputField.setAttribute('readonly','true');
  				inputField.value=event.target.result[records][fields];

  				inputField.setAttribute('tabIndex','1');

  				cell.appendChild(inputField);
  			    newRow.appendChild(cell);
  			  }  //inner loop

  			  newRow.appendChild(deleteButtonCell);
			  listBody.appendChild(newRow);

  			}; // outer loop

  			deletes();

    };


  	}
/**********************************************************************************************************/

 /***********************Block on error opening the Database**********************************************/   

  	request.onerror = function(event){
  		console.log('error',event.target.errorCode);
  	}
/*********************************************************************************************************/

/****************************************SUBMIT BLOCK***************************************************/
    submit.addEventListener('click',function(event){
      var putRequest=window.indexedDB.open('myDB',1); //open db specifically for modification

      putRequest.onsuccess=function(event){  //get ready for modification of the 'frieds' objectStore
        var db=event.target.result,
            transaction=db.transaction('friends','readwrite'),
            objectStore=transaction.objectStore('friends'),
            
            rowContainer=document.getElementById('listBody'), //get parent of all rows in the page
            allRows=rowContainer.children, //get all rows 
            getRequest=objectStore.getAll(); //get all records


      getRequest.onsuccess = function(event) { //on successfull getting of all records  modify them

        var keysFromStorage=sessionStorage.getItem('initialKeys'); //get the keys of records on the page

        var initialKeysArray=JSON.parse(keysFromStorage); //turn record keys for records on page into array

        for(records in event.target.result){ //go through each record and modify them per the value in each of the relevant row elements
        var rowInputs=allRows[records].getElementsByTagName('INPUT');
        var rowObj=new Object(),
          allInputs=document.getElementsByTagName('INPUT');
      
          rowObj.name=rowInputs[0].value;
          rowObj.email=rowInputs[1].value;
          rowObj.phone=rowInputs[2].value;  

        var update=objectStore.put(rowObj, parseInt(initialKeysArray[records]));//modify  the record


        }

      }


      };



    })

/***************************************************************************************************/



  }


}(window.console))