////////////////////////////////////
// VARIABLES
////////////////////////////////////

var boards = [];
var local_key = 'boards';


/////////////////////////////////////
// PROXY
////////////////////////////////////

// Convert Boards list to JSON
function convertToJson(){
    var jstring = JSON.stringify(boards);
    return jstring;
}


/////////////////////////////////////
// BOARD CLASS
/////////////////////////////////////

function Board(title) {
    this.title = title;
    this.lists = [];
    this.id = 'board_'+ this.title;
}


// // Save board to list
// Board.prototype.saveToList = function () {
//     boards.push(this);
// }


// Create new board object
function addNewBoardWithTitle(title, div_id) {
    var board = new Board(title, div_id);
    boards.push(board);
    saveBoardsToLocalStorage();
}


///////////////////////////////////////
// LOCAL STORAGE
////////////////////////////////////////



// Save to local storage
function saveBoardsToLocalStorage() {
    jstring = convertToJson();
    localStorage.setItem(local_key, jstring);
    showLastBoard();
}

// Get data from local storage
function getDataFromLocalStorage() {
    var storage_data = localStorage.getItem(local_key);
    boards = JSON.parse(storage_data);
    if(!boards){
        boards = [];
    }
    return boards;
}



////////////////////////////////////////////
// DISPLAY BOARDS
////////////////////////////////////////////

// Display the new board immediately after it's creation
function showLastBoard() {
    var boards = getDataFromLocalStorage();
    var board = boards[boards.length-1];
    var title = board.title;
    var id = board.id;
    var htmlBoard = $("<div id=" + "'" + id + "'" + " class='board'><p><a href=/ "+ "'" + id + "' >" + title + "</a></p></div>");
    htmlBoard.insertBefore("#add-board-title");
}

// Display all boards on the home screen
function displayBoards() {
    var boards = getDataFromLocalStorage();
    for (var i in boards) {
        var board = boards[i];
        var title = board.title;
        var id = board.id;
        var htmlBoard = $("<div id=" + "'" + id + "'" + " class='board'><p><a href=/"+ "'" + id + "'>" + title + "</a></p></div>");
        htmlBoard.insertBefore("#add-board-title");
    }
}

// Get board from boards lis by ID
function getBoardById(idString){
    for (var i in boards){
        if (idString === boards[i]['id']) {
            return boards[i]['title'];
        }
    }
}


//Hide all Boards when one of them is called and return the it's ID
function clickToHide() {
    $('.board').click(function (event) {
        event.preventDefault();
        $('.board').hide(1000);
        var board_id =  ($(this).attr('id'));
        var title = getBoardById(board_id);
        changeFormId('#add-board-title', 'new-list-title', 'Add new list title');
        currentPageTitle(title);
    });
}


//Change id and placeholder of forms
function changeFormId(oldId, newId, newPlaceHolder){
    $(oldId).attr('id', newId);
    $('#form-input').attr('placeholder', newPlaceHolder);

}

//Change title of current page
function currentPageTitle(pageTitle) {
    $('#page-title-text').text(pageTitle);
}




/////////////////////////////////////
// LISTS CLASS
/////////////////////////////////////

function List(title, boardId) {
    this.title = title;
    this.cards = [];
    this.boardId = 'list_' + this.title;
}


function addNewListWithTitle(title, boardId) {
    var list = new List(title, boardId);
    console.log(list);

    for (var i in boards) {
        if (boardId === boards[i]['id']){
            var board = boards[i]['lists'];
            return board;
        }
    }

    board['lists'].push(list);
    saveBoardsToLocalStorage();

}

////////////////////////////////////////////
// INTERFACE LOGIC
////////////////////////////////////////////

$(document).ready(function() {
    currentPageTitle("Your Boards");
    getDataFromLocalStorage();
    displayBoards();
    clickToHide();
    $("#add-board-title").submit(function (event) {
        event.preventDefault(); //Prevents the default behavior, wouldn't refresh everything
        var title = $("#form-input").val();
        $('#form-input').val('');
        if (title == '') {
            alert("Please enter a title!");
        } else {
            addNewBoardWithTitle(title);
            clickToHide();
        }
    });

    $("#add-list-title").submit(function(event) {
        event.preventDefault()
        var boardId = $("page-title-text").text();
        console.log(boardId);

        var list_title = $("#form-input").val();
        console.log(list_title);
        addNewListWithTitle(list_title, boardId);


    });
});





















