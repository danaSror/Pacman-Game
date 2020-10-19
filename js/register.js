$(document).ready(
    function (e) {
        $("#Register").submit(function () {
            event.preventDefault();
            const userName = document.getElementById("userNameR").value;
            const userPassword = document.getElementById("passwordR").value;
            const userFirstName = document.getElementById("firstNameR").value;
            const userLastName = document.getElementById("lastNameR").value;
            const userMail = document.getElementById("emailR").value;
            const userBirthDay = document.getElementById("birthdayR").value;
            const user = [userName, userPassword, userFirstName, userLastName, userMail, userBirthDay];
            usersArr.push(user);
            openPage("login");
        });
    });


  
 