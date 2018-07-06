// this conditional initialization makes it so that even first visit will be initialized
if (localStorage.numberTest) { //if there's already a default value, use it
    localStorage.numberTest = Number(localStorage.numberTest);
} else { // else init as 0
    localStorage.numberTest = 0;
}

// populate element with default value
document.getElementById("answer").innerHTML = Number(localStorage.numberTest);
document.getElementById("backup").innerHTML = Number(localStorage.numberBackup);

function increment() {
    // x++;
    // document.getElementById("answer").innerHTML = x;
    localStorage.numberTest ++;
    document.getElementById("answer").innerHTML = localStorage.numberTest;
}

function reset() {
	localStorage.numberTest = 0;
	document.getElementById("answer").innerHTML = localStorage.numberTest;
}
	
function backup() {
	localStorage.numberBackup = localStorage.numberTest;
	document.getElementById("backup").innerHTML = localStorage.numberBackup;
}

function clearLocal() {
	localStorage.clear();
	document.getElementById("answer").innerHTML = localStorage.numberTest;
	document.getElementById("backup").innerHTML = localStorage.numberBackup;
}