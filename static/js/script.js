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

// // Get board from boards list by ID
// function getBoardById(idString){
//     for (var i in boards){
//         if (idString === boards[i]['id']) {
//             return boards[i]['title'];
//         }
//     }
// }

// Get board object by ID from boards list
function getBoardObjectById(idString){
    for (var i in boards){
        if (idString === boards[i]['id']) {
            return boards[i];
        }
    }
}


//Hide all Boards when one of them is called and return the it's ID
function clickToHide() {
    $('.board').click(function (event) {
        event.preventDefault();
        $('.board').hide(1000);
        var board_id =  ($(this).attr('id'));
        var board = getBoardObjectById(board_id);
        var title=board['title'];
        changeFormId('#add-board-title', 'new-list-title', 'Add new list title');
        currentPageTitle(title);
        return board_id;
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
    this.boardId = boardId;
    this.title = title;
    this.cards = [];
    this.listId = 'list_' + this.title;
}


function addNewListWithTitle(title, boardId) {
    var list = new List(title, boardId);
    getDataFromLocalStorage();
    var board = getBoardObjectById(boardId);
    board['lists'].push(list);

    saveBoardsToLocalStorage();



    // if (boards.length > 0){
    //     var board = getBoardObjectById(boardId);
    //     board['lists'].push(list);
    //     saveBoardsToLocalStorage();
    // } else {
    //     getDataFromLocalStorage();
    //     saveBoardsToLocalStorage();
    //     var board = getBoardObjectById(boardId);
    //     var board = getBoardObjectById(boardId);
    //     board['lists'].push(list);
    //     saveBoardsToLocalStorage();
    // }
}
// addNewListWithTitle('ez a list cim', 'board_kati');

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
            var board_id = clickToHide();

        }
    });

    $("#add-list-title").submit(function(event) {
        event.preventDefault();
        var boardId = board_id;
        var list_title = $("#form-input").val();


        addNewListWithTitle(list_title, boardId);
    });
});





















