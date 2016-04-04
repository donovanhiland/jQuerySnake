$(document).ready(function() {

  // create snake in array
  var snake = ["_0_2", "_0_1", "_0_0"];
  var food = "";
  var dir = 4;
  var score = 000;
  var speed = 200;
  var gameStatus = 'newgame';



  function initiateGameWindow() {
    $('.game-window').html("");
    for (var r=0;r<20;r++){
      for (var c=0;c<20;c++){
      	$('.game-window').append('<div class=cellSquare id=cell_'+r+'_'+c+'></div>');
      }
    }
    $("#cell_0_0").addClass("snakeCell");
    $("#cell_0_1").addClass("snakeCell");
    $("#cell_0_2").addClass("snakeCell");
    randomFood();
  }
  initiateGameWindow();

  // generate food block randomly
  function randomFood() {
    var fRow = Math.floor(Math.random() * 19);
    var fCol = Math.floor(Math.random() * 19);
    var foodCell = $('#cell_'+fRow+'_'+fCol);
    foodCell.addClass("foodCell");
    food='_'+fRow+'_'+fCol;
  };

  function update() {
    $(".stats-container").text(score);
    gameStatus = 'inProgress';
    // remove tail block of snake
    var tail = snake.pop();
    $('#cell'+tail).removeClass("snakeCell")

    // add head block based on direction
    var head = snake[0];
    var rowCol = head.split("_");
    var sRow = Number(rowCol[1]);
    var sCol = Number(rowCol[2]);
    switch(dir){
      case 1: sRow += 1;  // down
      break;
      case 2: sCol -= 1; // left
      break;
      case 3: sRow -= 1; // up
      break;
      case 4: sCol += 1; // right
      break;
    }
    var newHead = "_"+sRow+"_"+sCol;

    // if snake head is the same coord as food add block to tail,  add 1 to score, and generate new food block.
    if(newHead === food) {
      snake.push(tail);
      $('#cell'+food).removeClass("foodCell")
      score += 1;
      randomFood();
    }
    snake.unshift(newHead);

    // end game if snake hits the border OR hits itself
    if (sCol<0 || sRow<0 || sCol>19 || sRow>19 ||  $('#cell'+newHead).hasClass('snakeCell') ){
    console.log('You lost !');
    snake.push(tail);
    $('#cell'+tail).addClass("snakeCell");
    $('#cell'+snake[1]).addClass("deadSnakeCell");
    gameStatus = 'gameover';
    return;
    }
    else {
      $('#cell'+newHead).addClass('snakeCell');
    }
    setTimeout(function(){update()}, speed);
  }

  // change direction based on key press
  $(document).on('keyup', function(e) {
    if(e.keyCode === 40 && dir !== 3) {
      dir = 1;
    }
    if(e.keyCode === 37 && dir !== 4) {
      dir = 2;
    }
    if(e.keyCode === 38 && dir !== 1) {
      dir = 3;
    }
    if(e.keyCode === 39 && dir !== 2) {
      dir = 4;
    }
    if(e.keyCode === 13 && gameStatus === 'gameover') {
      snake = ["_0_2", "_0_1", "_0_0"];
      food = "";
      dir = 4;
      score = 0;
      gameStatus = 'newgame';
      initiateGameWindow();
      update();
    }
    if(e.keyCode === 13 && gameStatus === 'newgame') {
      update();
    }
  });

});
