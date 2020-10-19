$(document).ready(function (e) {

        var up ;
        var down;
        var right;
        var left;
        var Color5Points;
        var Color15points;
        var Color25points;
        var ballNum;
        var gameTime;
        var monstersNum; 

    $("#settingsForm").submit(function (e) { 
         e.preventDefault();   
         openPage("game");
         start(gameSettings());
    });

    //random game
    $('#randomGameButton').click(function (e) {
        e.preventDefault();
        openPage("game");
        start(randomGameSettings());
    });


    function gameSettings(){     
        player= document.getElementById("loginUserName").value;
        Color5Points = $("#ball_5_color").val();
        Color15points = $("#ball_15_color ").val();
        Color25points =$("#ball_25_color ").val();
        ballNum = document.getElementById("ballsNum").value;
        gameTime = document.getElementById("gameTime").value;
        monstersNum= document.getElementById("monstersNum").value;  
        console.log(up);  
        return{up,down,right ,left ,Color5Points,Color15points, Color25points,ballNum,gameTime,monstersNum};   
    }


    function randomGameSettings(){
        player= document.getElementById("loginUserName").value;
        up =$("upKeyInp").value = "ArrowUp";
        down=$("#downKeyInp").value = "ArrowDown";
        right =$("#rightKeyInp").value = "ArrowRight";
        left = $("#LeftKeyInp").value = "ArrowLeft";
        Color5Points =getRandomColor();
        Color15points = getRandomColor();
        Color25points = getRandomColor();
        ballNum=  Math.floor(Math.random() * (90)) + 50;
        gameTime =  Math.floor(Math.random() * (100)) + 60;
        monstersNum = Math.floor(Math.random() * (4)) + 1;
        return{up, down, right,left , Color5Points, Color15points, Color25points, ballNum,gameTime,monstersNum};
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }


      //update keys game
     window.addEventListener("keydown", function(e) {
         if(e.target.id === "upKeyInp"){
            up = e.code; 
            e.target.value = up;
         }
         if(e.target.id === "downKeyInp"){
            down = e.code;
            e.target.value = down;
         }
         if(e.target.id === "rightKeyInp"){
             right = e.code;
            e.target.value = right;
         }
         if(e.target.id === "LeftKeyInp"){
            left = e.code;
            e.target.value = left;
         }

         } , true) ;
     
});
