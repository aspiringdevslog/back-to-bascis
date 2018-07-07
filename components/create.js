// A generic create function for storging data into localstorage

// function create(userInput, localKey) {
// 	localStorage.setItem(localKey, userInput);
// }

// this creates 

// https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage
// First convert data from array into string with JSON.stringify(array)
// then store that string in local storage
// when retrieving, use JSON.parse

//  INPUT TARGET MUST BE AN ELEMENT ID, OUTPUT TARGET MUST BE A CLASS
function create(inputTarget, outputTarget, storageKey) {

	var input = document.getElementById(inputTarget); // initialize with input id
	var box = document.querySelector(outputTarget); // init with output class

	//var vals = [];

	// The || "[]" is a fallback in case localStorage returns null
	var vals = JSON.parse(localStorage.getItem(storageKey) || "[]");
	var li;

	// this listen for keyup? enter? 
	input.addEventListener("keyup", function(e) {
	  var val = e.target.value;

	  if (e.which == 13) {
	    box.innerHTML = "";
	    input.value = " ";

	    // Push input value array
	    vals.push(val);
	    localStorage.setItem(storageKey, JSON.stringify(vals)); //mylist needs to be replaced with generic variable for localstorage key

	    // Loop input values, by setting it within this loop, basically upon key up, runs READ function as well
	    vals.map(function(item, index) {
	      li = document.createElement("LI");
	      box.appendChild(li);
	      li.innerHTML = JSON.parse(localStorage.getItem(storageKey))[index];
	    });
	  }

	}, false);

	vals.forEach(function(entry) {
	  li = document.createElement("LI");
	  box.appendChild(li);
	  li.innerHTML = entry;
	})



}