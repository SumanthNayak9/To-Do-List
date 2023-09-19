// function formSubmit(event){
// 	const usernameInput = document.querySelector("input[name='username']").value;

// 	event.preventDefault();
// 	console.log("event", event)
// 	console.log('formSubmit')
// 	document.cookie = `userId=${usernameInput}`;
// 	let existingUsers = getCookie('users') || [];

// 	if (!existingUsers.includes(usernameInput)) {
// 		existingUsers.push(usernameInput);
// 	}

// 	usernameInput = JSON.stringify(usernameInput);


// 	document.cookie = `users=${usernameInput}`;
// 	// let users = JSON.parse(cookie.setItem("userin")) || {};
//     // document.cookie = "users=" + usernameInput + "; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/";
//     window.location.href = "file:///var/www/html/sumanth/todo/index2.html";
      
// }

var getCookie = function (name) {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
};

function formSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting by default

    const usernameInput = document.querySelector("input[name='username']").value.trim();

    if (usernameInput !== "") {
        // Get the existing users from the 'users' cookie or create an empty array
        let existingUsers = getCookie('users');

        if (!existingUsers) {
            existingUsers = [];
        } else {
            existingUsers = JSON.parse(existingUsers);
        }

        // Check if the username is already in the list
        if (!existingUsers.includes(usernameInput)) {
            existingUsers.push(usernameInput);

            // Save the updated list of users in the 'users' cookie
            document.cookie = `users=${JSON.stringify(existingUsers)}; expires=Thu, 18 Dec 2099 12:00:00 UTC; path=/`;

            // Save the selected username in a separate 'userId' cookie (optional)
            document.cookie = `userId=${usernameInput}; expires=Thu, 18 Dec 2099 12:00:00 UTC; path=/`;

            // Redirect to the to-do list page (replace the URL with your actual page URL)
            window.location.href = "file:///var/www/html/sumanth/todo/index2.html";
        } else {
            alert("Username already exists. Please choose a different username.");
        }
    } else {
        alert("Please enter a username.");
    }
}
