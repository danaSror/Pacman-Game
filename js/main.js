var usersArr = [[ "p", "p"]];
var player=[ "p", "p"];

function clickPage(choosenPage) {
    if(choosenPage=="welcome")
    openPage("welcome");
    if(choosenPage=="register")
    openPage("register");
    if(choosenPage=="login")
    openPage("login");
}

function openPage(pageScriptName) {
     if(pageScriptName != "game"  ){
         clearIntervals();
        if(isPlaySound){
            _sound.pause();
            isPlaySound = false;
        }
     }

    //remove active class
    const allSectionsActivated = document.getElementsByClassName("activeSection");
    allSectionsActivated[0].classList.remove("activeSection");

    //add active class
    const newActivatedSection = document.getElementById("main").querySelector(`#${pageScriptName}Section`);
    newActivatedSection.classList.add("activeSection");

}

