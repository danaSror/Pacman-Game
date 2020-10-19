$(document).ready(function (e) {

    $("#loginForm").submit(function (e) {
        e.preventDefault(); 
        let userName = document.getElementById("loginUserName").value;
        let userPassword = document.getElementById("loginPassword").value;   
        for (let i = 0; i < usersArr.length; i++) { 
            if (usersArr[i][0] == userName && usersArr[i][1] == userPassword) {
                openPage("gameSettings");
                return; 
            }
        }
        alert("User is not exist");               
    });

});




