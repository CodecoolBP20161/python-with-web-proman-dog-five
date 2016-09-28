var boards = [];

function Board(title) {
    this.title = title;
}
//Save to local storage
function saveBoardsToLocalStorage() {
    var str = JSON.stringify(boards);
    localStorage.setItem("boards", str);
    showLastBoard();
}

//Remove board from LocalStorage
function removeDataWithId(boardId) {
    boards.slice(boardId, 1);
    saveBoardsToLocalStorage();
}

//remove all Boards
function removeAllBoards() {
    localStorage.removeItem("boards");
}


//Get data from local storage
function getDataFromLocalStorage() {
    var storage_date = localStorage.getItem("boards");
    boards = JSON.parse(storage_date);
    if(!boards){
        boards = [];
    }
    return boards;
}

//After add new Board show the last board
function showLastBoard() {
    var fromList = getDataFromLocalStorage();
    var item = fromList[fromList.length-1];
    var title = item.title;
    $("<div id='board_"+ title + "' class='board'><p>"+title+"</p></div>").insertBefore("#add-board-title");

}
//Show all boards
function listBoards() {
    var fromList = getDataFromLocalStorage();
    for (var i in fromList) {
        var item = fromList[i];
        var title = item.title;

        var new_board = $("<div id='board_" + title + "'class='board'><p>" + title + "</p></div>");
        new_board.insertBefore("#add-board-title");
        clickToHide();
    }
}

//clickToHideAllBoards and return the clicked board's ID
function clickToHide() {
    $('.board').click(function (event) {
        event.preventDefault();
        $('.board').hide(1000);
        // removeAllBoards();
        changeFormId('#add-board-title', 'new-list-title', 'Add new list title');
        return ($(this).attr('id'));

    });
}

//Change id of forms
function changeFormId(oldId, newId, newPlaceHolder){
    $(oldId).attr('id', newId);
    $('#form-input').attr('placeholder', newPlaceHolder);

}

//Change title of current page
function currentPageTitle(pageTitle) {
    $('#page-title-text').text(pageTitle);
}

// Create new board object
function addNewBoardWithTitle(title) {
    var board = new Board(title);
    boards.push(board);
    saveBoardsToLocalStorage();
}


$(document).ready(function(){
    currentPageTitle("Your Boards");
    getDataFromLocalStorage();
    listBoards();
    $("#add-board-title").submit(function(event) {
        event.preventDefault(); //Prevents the default behavior, wouldn't refresh everything
        var title = $("#form-input").val();
        $('#form-input').val('');
        if( title == '' ){
            alert("Please enter a title!");
        } else {
            addNewBoardWithTitle(title);
            clickToHide();
        }
    })
});