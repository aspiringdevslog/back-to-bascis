// console.log("Hello World!");

// Global Variable ini

const localKey = "arrayDataSet"; // localKey controls all interaction with localStorage. code technically reusable, somewhat

// environment initialization START
if (!localStorage.getItem(localKey)){
	var array = [{
		data: "initialize"
	}];	
	localStorage.setItem(localKey, jsonify(array));
}
display();
// environment initialization END


// Event listener for enter
// var input = document.getElementById("input");
// document.getElementById("input").addEventListener("keyup", function(){
//     event.preventDefault();
//     if (event.keyCode === 13) {
//         document.getElementById("add").click();
//     }
// };

var input = document.getElementById("input");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("add").click();
    }
});



// HELPER FUNCTIONS
// convert JSON into array
function unjsonify(jsonData){
	return JSON.parse(jsonData);
}
// convert user input into JSON string
function jsonify(userInput){
	return JSON.stringify(userInput);
}

// MAIN FUNCTIONS
function addItem(){
	var insertData = document.getElementById("input").value; //TODO: abstract ElementID for reusable add item (from different input fields)
	var array = unjsonify(localStorage.getItem(localKey));

	array.push({
		data: insertData // treat the data structure as a table, fieldName: dataToBeInserted
	});

	localStorage.setItem(localKey, jsonify(array));
	localStorage.dataId = array.length;

	display();
}

function deleteItem(){
	// var id = document.querySelector('.delete:checked').id; //  //TODO: abstract

	var index = document.querySelector('.delTask').id; 

	var array = unjsonify(localStorage.getItem(localKey));
	array.splice(index, 1);
	localStorage.setItem(localKey, jsonify(array));

	display();
}

function focus(elementId){
	document.getElementById(elementId).focus();
}

function editItem(){

// idea: 1. click = check > open modal > in modal box there's a button that will then check for .edTask:checked. this should remove the error message. Hypothesis: everything runs at the same time and run twice? from console.log, line 56,57,56 again

	modalClick();

	modalDefault(); // the reason why this won't kick in is because after editItem function is called, the modal box will close
	// console.log(index);

	if(document.querySelector('.edTask:checked').id){
		var index = document.querySelector('.edTask:checked').id; //  //TODO: abstract
	} else {
		var index = document.querySelector('.edTask:checked').id; //  //TODO: abstract
	}

	var currentData = document.querySelector('.edTask:checked').data;
	
	// console.log(index);
	var editValue = document.getElementById("editField").value;  //TODO: abstract
	// var editValue = prompt("enter new data: ");  // prompt
	// document.getElementById("modal").style.display = "block";

	var array = unjsonify(localStorage.getItem(localKey));
	array.splice(index, 1, {
		data: editValue
	});
	localStorage.setItem(localKey, jsonify(array));


	display();
	modalClose();

	clearInput("editField");
}

function clearInput(field){
	document.getElementById(field).value = "";
}

// SMELLY FUNCTION
function display(){
	var arrData = unjsonify(localStorage.getItem(localKey));
	var toPrint;

	// right now it doesn't consider the fact that there's already existing data in the HTML element
	// the easiest way is to just wipe everything before appending
	if(document.getElementById("test")) {  //TODO: abstract
		document.getElementById("test").innerHTML = "";  //TODO: abstract
	}

	// basic building blocks
	var mainDiv = $("ol#test");  //TODO: abstract

	for(var i = 1; i < arrData.length;  i ++){
		toPrint = arrData[i]; // the main data are stored in toPrint

		mainDiv.append(  //TODO: abstract, make this code cleaner. seems hard to maintain and susceptible to syntax error
			"<li>" 
			// + "<label class='deleteLabel'>"
			// + "<input type='checkbox'"
			// + "class='delete'"
			// + "onclick='deleteItem()'"
			// + "id ='" + i + "'"
			// + ">"		
			// + "</label>"
			+ "<span onclick='deleteItem()' class='delTask' id='" + i + "'" + "> delete </span>" // controls the delete "button"
			+ toPrint.data 
			// + "<span onclick='editItem()' class='edTask' id='" + i + "'" + ">  Edit </span>" // controls the delete "button"
			// + "<input type='radio' class='edTask id='" + i + "'" + ">"
			+ "<label class='edit' onclick='modalClick()'>" 
			+ "<input type='checkbox' " 
			+ "class='edTask'"
			+ "id ='" + i + "'"
			+ "> edit "	
			+ "</label>"
			+ "</li>"
		);

	}
}

function modalClick(){
	var x = document.getElementsByClassName('modal');
	x[0].style.display="block"; 
	focus("editField");
	modalDefault("originalItem", document.querySelector('.edTask:checked').data);
}

function modalClose(){
	var x = document.getElementsByClassName('modal');
	x[0].style.display="none"; 
}


function modalDefault(elementId, selectedItem){
	document.getElementById(elementId).innerHTML = selectedItem;
}