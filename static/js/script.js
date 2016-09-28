var boards = [];

function Board(title) {
    this.title = title;
}


// Create new board object
function addNewBoardWithTitle(title) {
    var board = new Board(title);
    boards.push(board);
}

// Get board by index
function getBoardByIndex(index) {
    return boards[index];
}

// List boards
function appendBoards() {
    for (var i in boards) {
        // return boards[i].title
        
        // Depending to the end of what is already there
        var board = boards[i];
        var title = board.title;
        // $("<p>"+title+"</p>").insertBefore("#board-input");
    }
}


$(document).ready(function(){
    $("#add-board-title").submit(function(event) {
        event.preventDefault(); //Prevents the default behavior, wouldn't refresh everything
        
        var title = $("#board-input").val();
        addNewBoardWithTitle(title);
        $("<div id='not-unique-id'><p>"+title+"</p></div>").insertBefore("#add-board-title");
    })

   
});

// THE DIV ID HAS TO BE CHANGED TO UNIQUE FOR EVERY NEW DIV !!!!!!!!!!!!!!