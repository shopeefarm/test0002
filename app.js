// Initialize Firebase
var firebaseConfig = {
	apiKey: "AIzaSyB-vGEOyySC4JMYdtG1Ret4pbiZLmhknLs",
	authDomain: "jeanycar-25a07.firebaseapp.com",
	databaseURL: "https://jeanycar-25a07-default-rtdb.asia-southeast1.firebasedatabase.app/",
	projectId: "jeanycar-25a07",
	storageBucket: "jeanycar-25a07.appspot.com",
	messagingSenderId: "469828085729",
	appId: "1:469828085729:web:4bc30a96b8e227f0c9d4a0",

};

firebase.initializeApp(firebaseConfig);
// Get a reference to the Firebase Realtime Database

window.onload = function () {
	postFrom.reset();
	setTimeout(function () {
		window.scrollTo(0, 0);
	}, 0);
}

const internetTime = Date.now();
var items = 10;
var database = firebase.database();
var urltext = "";
var posttext = "";

// Get DOM elements

var showFormButton = document.querySelector('#show-form-button');
var moreButton = document.querySelector('#more-button');
var notif = document.querySelector('#header_notify');
var myForm = document.querySelector('#postLink');
var myContent = document.querySelector('#column1');
var saveButton = document.querySelector('#save-button');
var cancelButton = document.querySelector('#cancel-button');
var titleInput = document.querySelector('#title');
var quoteTextarea = document.querySelector('#quote');
var authorInput = document.querySelector('#author');
var quoteTableBody = document.querySelector('#quote-table-body');
var postFrom = document.querySelector('#post-form');
var searchBt = document.querySelector('#search-bt');
var tbn = document.querySelector('#tbn');
var showImage = document.querySelector('#show-image');
var previewImage = document.querySelector('#preview-image');
var toolBar = document.querySelector('#toolbar');
var searchBox = document.querySelector('#search-box');
var banner = document.querySelector('#banner');
var nav = document.querySelector('#navigate');
var backBtn = document.querySelector('#backbtn');
var toolbar1 = document.querySelector('#toolbar-1');
var toolbar2 = document.querySelector('#toolbar-2');
var toolbar3 = document.querySelector('#toolbar-3');
var toolbar4 = document.querySelector('#toolbar-4');


localStorage.setItem("data", internetTime);

const headerImage = document.querySelector("#header-image");
const loading = document.querySelector("#loading-page");
loading.style.display = "flex";
headerImage.src = imageHeader;
previewImage.src = imageURL;

var childNum = 0;

loadDatabase(items, "");


database.ref('quotes').once('value')
	.then((snapshot) => {
		childNum = snapshot.numChildren();
		//console.log("Number of child nodes:", numChildren);
	})
	.catch((error) => {
		console.log("Error retrieving data:", error);
	});

let inputChanged = false;
let more_toggle = false;

// Show form when the "Show Form" button is clicked
showFormButton.addEventListener('click', function () {
	showFormButton.style.display = 'none';
	myContent.style.display = 'none';
	myForm.style.display = 'block';
	notif.style.display = "none";


	searchBox.style.display = "none";
	banner.style.display = "none";
	nav.style.display = "block";


	//tbn.style.backgroundColor = '#dedede';
});

// Hide form when the "Cancel" button is clicked
cancelButton.addEventListener('click', resetPage);

searchBt.addEventListener('click', function () {
	var sk = document.getElementById("search-in").value;
	moreButton.innerHTML = "<b>END OF SEARCH RESULTS</b>";
	more_toggle = true;
	showFormButton.innerHTML = "<b>Search results for \"" + sk + "\"</b>";
	window.location.href = "#top";
	column1.style.backgroundColor = "#f2cbc1";


	loadDatabase(1000, sk);
	document.getElementById("search-in").value = "";
});

const checkbox = document.querySelector('input[type="checkbox"]');
checkbox.addEventListener('change', function () {
	if (!this.checked) {
		authorInput.disabled = true;
		authorInput.style.backgroundColor = '#fff';
		authorInput.style.border = '#none';
		authorInput.placeholder = 'Anonymous';
		authorInput.value = '';


		//tbn.style.backgroundColor = '#dedede';

	} else {
		authorInput.disabled = false;
		authorInput.style.border = '1px solid #aaa;';
		authorInput.placeholder = 'Enter your username';

		//tbn.style.backgroundColor = '#fff';

		authorInput.focus();

	}
});

// Save form data to Firebase Realtime Database when the "Save" button is clicked
// Save form data to Firebase Realtime Database when the "Save" button is clicked

backbtn.addEventListener('click', function (event) {
	showFormButton.style.display = 'block';
	myContent.style.display = 'block';
	myForm.style.display = 'none';
	notif.style.display = "block";


	searchBox.style.display = "block";
	banner.style.display = "block";
	nav.style.display = "none";
});

toolbar1.addEventListener('click', function (event) {
	let rnum = randomNum(0, (gradients.length - 1));
	quoteTextarea.style.paddingTop = "80px";
	quoteTextarea.style.paddingBottom = "80px";
	quoteTextarea.style.fontSize = "1.7rem";
	quoteTextarea.style.textAlign = "center";
	quoteTextarea.style.background = gradients[rnum];
	quoteTextarea.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.4)";
	quoteTextarea.style.color = "#fff";
	quoteTextarea.style.height = "auto";
	quoteTextarea.style.height = `${quoteTextarea.scrollHeight}px`;

	toolbar2.style.display = "none";
	toolbar3.style.display = "none";
	toolbar4.style.display = "block";
	toolbar4.style.textAlign = "right";
});

toolbar4.addEventListener('click', function (event) {
	quoteTextarea.style.padding = "10px";
	quoteTextarea.style.fontSize = "1rem";
	quoteTextarea.style.textAlign = "left";
	quoteTextarea.style.background = "white";
	quoteTextarea.style.textShadow = "none";
	quoteTextarea.style.color = "black";
	quoteTextarea.style.height = "auto";
	quoteTextarea.style.height = `${quoteTextarea.scrollHeight}px`;

	toolbar2.style.display = "block";
	toolbar3.style.display = "block";
	toolbar4.style.display = "none";
});


saveButton.addEventListener('click', function (event) {
	var title = urltext;
	var quote = posttext;
	var author = "" == authorInput.value ? "Farmer" : authorInput.value;

	saveData(title, quote, author);
	location.reload();
});


quoteTextarea.addEventListener("input", function () {
	quoteTextarea.style.height = "auto";
	quoteTextarea.style.height = `${quoteTextarea.scrollHeight}px`;

	let text = quoteTextarea.value;
	const urlRegex = /(https?:\/\/[^\s]+)/g;
	const urls = text.match(urlRegex);
	const validUrlRegex = /^https?:\/\/shp\.ee\/.*$/;
	if (urls && urls.length > 0) {
		for (const url of urls) {
			if (validUrlRegex.test(url)) {
				showImage.style.display = "block";
				toolBar.style.display = "none";
				urltext = url;
				posttext = quoteTextarea.value.replace(urlRegex, '<a>$1</a>');
				//console.log(posttext);
				//text = text.replace(url, '<span style="color: blue;">' + url + '</span>');
			} else {
				showImage.style.display = "none";
				toolBar.style.display = "block";
			}
		}
	} else {
		showImage.style.display = "none";
		toolBar.style.display = "block";
	}
});


// Clear form inputs and selected row
function clearForm() {
	document.getElementById('title').value = '';
	document.getElementById('quote').value = '';
	document.getElementById('author').value = '';
	selectedRow = null;
}




function openLink(url) {
	window.open(url);
}


window.addEventListener('beforeunload', function (e) {
	if (inputChanged) {
		e.preventDefault();
		e.returnValue = '';
	}
});


moreButton.addEventListener('click', function () {


	if (more_toggle) {
		window.location.href = "#top";
		location.reload();
	} else {
		items += 9;

		loadDatabase(items, "");
		if (childNum <= items) {
			moreButton.innerHTML = "<b>&#x2713; YOU'RE ALL CAUGHT UP!</b>"
		}

	}
});

function loadDatabase(itemCount, searchkey) {

	database.ref('quotes').orderByChild('timestamp').limitToLast(itemCount).on('value', function (snapshot) {
		// Clear existing table rows
		quoteTableBody.innerHTML = '';
		// Generate new table rows in reverse order
		var quotes = [];
		snapshot.forEach(function (childSnapshot) {
			var childData = childSnapshot.val();
			childData.key = childSnapshot.key;

			if (((childData.hasOwnProperty('author') && childData.author.indexOf(searchkey) !== -1) || (childData.hasOwnProperty('quote') && childData.quote.indexOf(searchkey) !== -1) || (childData.hasOwnProperty('title') && childData.title.indexOf(searchkey) !== -1))) {
				quotes.push(childData);
			}
		});

		quotes.reverse(); // Reverse the order of the quotes
		quotes.forEach(function (childData) {

			var rrow = document.createElement('tr')

			//////////////////////////////////////////////////////////


			let divStyle = "";


			if ((getTimeString(childData.timestamp)) == "Just now") {
				divStyle = "<td style='padding-top: 8px;padding-bottom: 8px;'><div id = 'rdiv' style='background-color: cornsilk; padding:0px; border: solid 1px orangered;'>";
			} else {
				divStyle = "<td style='padding-top: 8px;padding-bottom: 8px;'><div id = 'rdiv' style='background-color: white; padding:0px; border: solid 1px #ccc;'>";
			}


			let myAuthor = "";

			if ((getTimeString(childData.timestamp)) == "Just now") {
				myAuthor = "<b>" + childData.author + " </b><span class='new-label'><small><small>NEW</small></small></span>";
			} else {
				myAuthor = "<b>" + childData.author + "</b>";
			}

			let myViews = childData.views + " View" + (eval(childData.views) == 1 ? "" : "s");

			let modAuthor = childData.author;
			let myTitle = childData.title;
			let myQuote = "";

			if (childData.quote === "") {
				myQuote = "<img src='" + imageURL + "' alt='Cannot load image' style='width: 100%;'>";
			} else {
				myQuote = "<p style='white-space: pre-line;text-align:center; font-size:24px; word-wrap:break-word;padding:10px'>" + childData.quote + "</p>";
			}

			let timestamps = (childData.timestamp);

			let myTime = getTimeString(childData.timestamp);

			/////////////////////////////////////////////////////////

			var tableHTML = "<table style = 'margin:7px'>" +
				"<tr>" +
				"<td rowspan='2' style='text-align:center;'><img src='avatar.jpg' alt='Profile Image' width='32' style='border-radius: 50%;'></td>" +
				"<td><span style='color:#ed4c2b;font-size: 18px'>" + myAuthor + "</span></td>" +
				"</tr>" +
				"<tr>" +
				"<td><em style='color:#2c94fb;word-wrap: break-word;font-size: 12px'>" + myTitle + "</em></td>" +
				"</tr>" +
				"</table>";


			rrow.innerHTML =
				divStyle + tableHTML + myQuote +
				"<span style='color:#808080; font-size: 14px;'><hr>&nbsp;&nbsp;" + myTime +
				"</span><br><span style='color:#008ba3; font-size: 14px;'>&nbsp;&nbsp;" + myViews + "</span><br><div style='height:10'></div></td>";

			/////////////////////////////////////////////////////////

			quoteTableBody.appendChild(rrow);

			// Add event listener to delete quote on row click
			// Add event listener to delete quote on row click
			rrow.addEventListener("click", function () {
				// Create modal with delete button and close button

				var counter = false;
				var modal = document.createElement('div');


				let myAuthor = "<b style='color:#ed4c2b;'>" + childData.author + "</b>";
				let myTitle = "<em style='color:#2c94fb;word-wrap: break-word;'>" + childData.title + "</em>";
				let tinyMargin = "<small><small><br><br></small></small>";
				let myViews = "<span style='color:#808080'>" + childData.views + " visits | " + childData.views + " views</span>";

				let dButton = "<br><a class='delete-button'>Delete</a>";
				let vButton = "<button class='view-button'>VISIT</button>";

				modal.innerHTML = "<center><div><p>" + myAuthor + "<br>" + myTitle + tinyMargin +
					"</div></div><br><br>" + vButton + dButton + "<div class='close-button'></div>";

				modal.style.position = 'fixed';
				modal.style.top = '36%';
				modal.style.left = '50%';
				modal.style.width = '300px';
				modal.style.height = 'auto';
				modal.style.transform = 'translate(-50%, -50%)';

				modal.style.backgroundColor = 'white';

				modal.style.padding = '20px';
				modal.style.border = '1px #aaa';
				modal.style.borderRadius = '10px';
				modal.style.zIndex = '9999';

				// Style close button
				var closeButton = modal.querySelector('.close-button');
				closeButton.style.position = 'absolute';
				closeButton.style.top = '108%';
				closeButton.style.left = '44%';
				closeButton.style.fontSize = '35px';

				closeButton.style.cursor = 'pointer';

				closeButton.style.background = 'transparent'; // remove the background image property
				closeButton.innerHTML = '<div class="circle"><span><big><big>&times;</span></div>'; // wrap the X icon inside a div element with a class name for the circle
				closeButton.style.fontSize = '35px';
				closeButton.style.cursor = 'pointer';



				// Add overlay with grey background
				var overlay = document.createElement('div');
				overlay.style.position = 'fixed';
				overlay.style.top = '0';
				overlay.style.left = '0';
				overlay.style.width = '100%';
				overlay.style.height = '100%';
				overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
				overlay.style.zIndex = '9998';

				// Add event listener to close button
				closeButton.addEventListener('click', function () {
					modal.remove();
					overlay.remove();
				});


				var viewButton = modal.querySelector('.view-button');
				viewButton.style.marginTop = '5px';
				viewButton.style.marginBottom = '15px';

				viewButton.style.fontWeight = 'bold';
				viewButton.style.borderRadius = '15px';
				viewButton.style.width = '200px';

				var deleteButton = modal.querySelector('.delete-button');

				deleteButton.style.color = '#ccc';
				deleteButton.style.cursor = 'pointer';

				viewButton.addEventListener('click', function () {
					openLink(childData.title);
					database.ref('quotes/' + childData.key).update({
						views: eval(childData.views) + eval(1)
					});
				});

				closeButton.addEventListener('click', function () {
					modal.remove();
					overlay.remove();
				});

				// Delete quote from database when delete button is clicked
				deleteButton.addEventListener('click', function () {

					if (!counter) {
						deleteButton.innerHTML = "&#x2713; Confirm";
						counter = true;
					} else {

						database.ref('quotes/' + childData.key).remove()
							.then(() => {
								console.log("Data successfully deleted");
							})
							.catch((error) => {
								console.log("Error deleting data:", error);
							});
						modal.remove();
						overlay.remove();
						notif.style.display = "none";

					}

				});

				// Add modal and overlay to the page
				document.body.appendChild(modal);
				document.body.appendChild(overlay);
			});

			loading.style.display = 'none';

		});

	}, function (error) {
		console.error("Failed to retrieve quotes:", error);
		if (error.code === "PERMISSION_DENIED") {
			//alert("You don't have permission to save quotes.");
			notif.innerHTML = "Database is locked";
		} else if (error.code === "NETWORK_ERROR") {
			//alert("No internet connection. Please check your network settings and try again.");
			notif.innerHTML = "No internet connection.";
		} else {
			//alert("Failed to save quote. Please try again later.");
			notif.innerHTML = "Failed to save link.";
		}
	});


}


function saveData(title, quote, author) {
	inputChanged = false;
	saveButton.disabled = true;

	if (title === '' || author === '') {
		saveButton.disabled = false;
	} else {
		var lineBreakCount = (quote.match(/\n/g) || []).length;
		if (lineBreakCount > 5) {
			saveButton.disabled = false;
			quoteTextarea.setCustomValidity("Too many line breaks");
		} else {

			if (title.length > 80) {
				title = title.substring(0, 80);
			}

			if (author.length > 50) {
				author = author.substring(0, 50);
			}

			// Save form data to Firebase Realtime Database
			if (navigator.onLine) {

				var quoteRef = database.ref('quotes').push();
				quoteRef.set({
					title: title,
					quote: quote,
					author: author,
					sessionkey: internetTime,
					show: "true",
					views: "0",
					visits: "0",
					timestamp: firebase.database.ServerValue.TIMESTAMP
				}, function (error) {
					if (error) {
						console.error("Failed to save quote:", error);
						notif.style.display = "block";


						if (error.code === "PERMISSION_DENIED") {
							//alert("You don't have permission to save quotes.");
							notif.innerHTML = "Database is locked";
						} else if (error.code === "NETWORK_ERROR") {
							//alert("No internet connection. Please check your network settings and try again.");
							notif.innerHTML = "No internet connection.";
						} else {
							//alert("Failed to save quote. Please try again later.");
							notif.innerHTML = "Failed to save link.";
						}
					} else {
						myForm.style.display = 'none';
						postFrom.reset();
						showFormButton.style.display = 'block';
						myContent.style.display = 'block';
						notif.style.display = "block";
						notif.innerHTML = "Link saved!";
						saveButton.disabled = false;
					}

				});

			} else {
				notif.style.display = "block";
				notif.innerHTML = "No Connection";
			}


		}

	}
}


function loadData(item) {
	var data = localStorage.getItem(item);
	if (data) {
		return data;
	} else {
		return 0;
	}
}

function resetPage() {
	location.reload();
	postFrom.reset();
	window.location.href = "#top";
}