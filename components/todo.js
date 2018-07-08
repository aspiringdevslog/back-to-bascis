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

function deleteTask(){
	// var id = document.querySelector('.delete:checked').id; //  //TODO: abstract

	var id = document.querySelector(".delTask").id; 

	var array = unjsonify(localStorage.getItem(localKey));
	array.splice(id, 1);
	localStorage.setItem(localKey, jsonify(array));

	display();
}

function editItem(){
	var id = document.querySelector('.edit:checked').id; //  //TODO: abstract
	var editValue = document.getElementById("editField").value;  //TODO: abstract

	var array = unjsonify(localStorage.getItem(localKey));
	array.splice(id, 1, {
		data: editValue
	});
	localStorage.setItem(localKey, jsonify(array));

	display();
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
			// + "onclick='deleteTask()'"
			// + "id ='" + i + "'"
			// + ">"		
			// + "</label>"
			+ "<span onclick='deleteTask()' class='delTask' id='" + i + "'" + "> <img class='cross' src='cross.jpg'> </span>" // controls the delete "button"
			+ toPrint.data 
			+ "<label>" 
			+ "<input type='checkbox'"
			+ "class='edit'"
			+ "id ='" + i + "'"
			+ ">"	
			+ "</label>"
			+ "</li>"
		);

	}
}
