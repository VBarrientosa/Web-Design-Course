'use strict';

const authorsKey = 'authors';
var x = 20;

function insertAuthor() {
	const name = document.getElementById('name').value;
	const lastName = document.getElementById('lastName').value;
	const age = document.getElementById('age').value;
	let currentId = localStorage.getItem('authorsLastInsertedId');

	if (!currentId) {
		localStorage.setItem('authorsLastInsertedId', 1);
		currentId = 1;
	} else {
		currentId = parseInt(currentId) + 1;
		localStorage.setItem('authorsLastInsertedId', currentId);
	}

	// create the book object
	const author = {
		name,
		lastName,
		age,
		id: currentId
	};

	// add it to the database
	let authors = JSON.parse(localStorage.getItem(authorsKey));
	if (authors && authors.length > 0) {
		authors.push(author);
	} else {
		authors = []
		authors.push(author)
	}
	localStorage.setItem(authorsKey, JSON.stringify(authors));

	clearFields();
	// render the authors
	renderTable('authors', authors);
}


function saveAuthor() {
	const name = document.getElementById('editName').value;
	const lastName = document.getElementById('editLastName').value;
	const age = document.getElementById('editAge').value;
	const id = document.getElementById('editId').value;

	// create the book object
	const author = {
		name,
		lastName,
		age,
		id
	};

	// add it to the database
	let authors = JSON.parse(localStorage.getItem(authorsKey));
	let results = authors.filter(author => author.id != id);
	results.push(author);
	localStorage.setItem(authorsKey, JSON.stringify(results));

	clearFields();
	// render the authors
	renderTable('authors', authors);
}

function clearFields() {
	document.getElementById('name').value = '';
	document.getElementById('lastName').value = '';
	document.getElementById('age').value = '';
}


/**
 * Renders an HTML table dinamically
 *
 * @param tableName
 * @param tableData
 */
function renderTable(tableName, tableData) {
	let table = jQuery(`#${tableName}_table`);
	// loop through all the items of table and generates the html
	let rows = "";
	tableData.forEach((author, index) => {
		let row = `<tr><td>${author.name}</td><td>${author.lastName}</td><td>${author.age}</td>`;
		row += `<td> <a onclick="editEntity(this)" data-id="${author.id}" data-entity="${tableName}" class="link edit">Edit</a>  |  <a  onclick="deleteEntity(this);" data-id="${author.id}" data-entity="${tableName}" class="link delete">Delete</a>  </td>`;
		rows += row + '</tr>';
	});
	table.html(rows);
}

function editEntity(element) {
	const dataObj = jQuery(element).data();

	let authors = JSON.parse(localStorage.getItem(authorsKey));
	let authorFound;
	authors.forEach(function (author) {
		if (author.id == dataObj.id) {
			authorFound = author;
			return;
		}
	});

	document.getElementById('editName').value = authorFound.name;
	document.getElementById('editLastName').value = authorFound.lastName;
	document.getElementById('editAge').value = authorFound.age;
	document.getElementById('editId').value = authorFound.id;
}



function deleteEntity(element) {
	const dataObj = jQuery(element).data();
	const newEntities = deleteFromTable(dataObj.entity, dataObj.id);
	renderTable(dataObj.entity, newEntities);
}

function loadTableData(tableName) {
	renderTable(tableName, getTableData(tableName));
}


/**
 * Binds the different events to the different elements of the page
 */
function bindEvents() {
	jQuery('#add-author-button').bind('click', function (element) {
		insertAuthor();
	});

	jQuery('#save-author-button').bind('click', function (element) {
		saveAuthor();
	});
}