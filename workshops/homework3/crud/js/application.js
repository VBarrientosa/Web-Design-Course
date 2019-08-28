'use strict';

const booksKey = 'books';
var x = 20;

function insertBook() {
	const title = document.getElementById('title').value;
	const author = document.getElementById('author').value;
	let currentKey = localStorage.getItem('booksLastInsertedId');

	if (!currentKey) {
		localStorage.setItem('booksLastInsertedId', 1);
		currentKey = 1;
	} else {
		currentKey = parseInt(currentKey) + 1;
		localStorage.setItem('booksLastInsertedId', currentKey);
	}

	// create the book object
	const book = {
		title,
		author,
		id: currentKey
	};

	// add it to the database
	let books = JSON.parse(localStorage.getItem(booksKey));
	if (books && books.length > 0) {
		books.push(book);
	} else {
		books = []
		books.push(book)
	}
	localStorage.setItem(booksKey, JSON.stringify(books));

	clearFields();
	// render the books
	renderTable('books', books);
}


function saveBook() {
	const title = document.getElementById('editTitle').value;
	const author = document.getElementById('editAuthor').value;
	const id = document.getElementById('editId').value;

	// create the book object
	const book = {
		title,
		author,
		id
	};
	debugger;
	// add it to the database
	let books = JSON.parse(localStorage.getItem(booksKey));
	let results = books.filter(book => book.id != id);
	results.push(book);
	localStorage.setItem(booksKey, JSON.stringify(results));

	clearFields();
	// render the books
	renderTable('books', books);
}

function clearFields() {
	document.getElementById('title').value = '';
	document.getElementById('author').value = '';
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
	tableData.forEach((book, index) => {
		let row = `<tr><td>${book.title}</td><td>${book.author}</td>`;
		row += `<td> <a onclick="editEntity(this)" data-id="${book.id}" data-entity="${tableName}" class="link edit">Edit</a>  |  <a  onclick="deleteEntity(this);" data-id="${book.id}" data-entity="${tableName}" class="link delete">Delete</a>  </td>`;
		rows += row + '</tr>';
	});
	table.html(rows);
}

function editEntity(element) {
	const dataObj = jQuery(element).data();

	let books = JSON.parse(localStorage.getItem(booksKey));
	let bookFound;
	books.forEach(function (book) {
		if (book.id == dataObj.id) {
			bookFound = book;
			return;
		}
	});

	document.getElementById('editAuthor').value = bookFound.author;
	document.getElementById('editTitle').value = bookFound.title;
	document.getElementById('editId').value = bookFound.id;
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
	jQuery('#add-book-button').bind('click', function (element) {
		insertBook();
	});

	jQuery('#save-book-button').bind('click', function (element) {
		saveBook();
	});
}