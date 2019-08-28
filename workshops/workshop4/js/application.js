let users = JSON.parse(localStorage.getItem('users'));

function convertData(pUsers) {
	let usersJson = JSON.stringify(pUsers);
	return usersJson;
}

function saveData(pUsers) {
	localStorage.setItem("users", pUsers);
}

function onClickSave() {
	getUser();
}

function getUser() {
	let users = JSON.parse(localStorage.getItem('users'));
	const firstName = document.getElementById('first_name').value;
	const lastName = document.getElementById('last_name').value;
	const phone = document.getElementById('phone').value;

	let user = new Object();
	user.userName = firstName;
	user.userLastName = lastName;
	user.userPhone = phone;

	users.push(user);
	
	users = convertData(users);
	saveData(users);

}

function clearDataBase() {
	localStorage.clear();
}



