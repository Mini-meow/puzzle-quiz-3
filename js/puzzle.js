var turns = 0;

window.onload = function () {
    for (let i = 0; i < 7; i++) {
        for (var j = 0; j < 4; j++) {
            let tile = document.createElement('div');
            tile.classList.add("tile")

            document.querySelector("#board").append(tile);
        }
    }

    let pieces = [];

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 4; j++) {
            pieces.push(i + "_" + j);
        }
    }

    let correctPieces = Array.from(pieces);

    pieces.reverse();
    for (let i =0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);

        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }

    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = "src/puzzle/" + pieces[i] + ".png";
        tile.classList.add("tile");
        tile.id = pieces[i];

        let tileDiv = document.createElement("div");
        tileDiv.classList.add('hasPiece');
        tileDiv.append(tile);

        document.querySelector("#pieces").append(tileDiv);
    }
    
    $("#pieces > div > img").draggable({
        revert: "invalid",
        scroll: false
    });

    $("#board > div").droppable({
        hoverClass: "droppable-highlight",
        accept: function() {
            return !$(this).hasClass('hasPiece');
        },
        drop: function(event, ui) {
            let piecesElement = ui.draggable;
            let droppedOn = $(this);

            droppedOn.addClass('hasPiece');
            $(piecesElement).addClass('dropped')
                            .css({
                                position: "relative",
                                top: 0,
                                left: 0
                            }).appendTo(droppedOn);

            checkPieces();
            checkPuzzle();
            if (checkIfPuzzleSolved(correctPieces)) {
                Swal.fire(
                    '恭喜！',
                    '你成功完成了拼圖！',
                    'success'
                );
                disableBorder(correctPieces);
                $("#board > div > img").draggable('disable');
            }else {
                console.log("not");
            }
        }
    });

    $("#pieces > div").droppable({
        hoverClass: "droppable-highlight",
        accept: function() {
            return !$(this).hasClass('hasPiece');
        },
        drop: function(event, ui) {
            let piecesElement = ui.draggable;
            let droppedOn = $(this);

            droppedOn.addClass('hasPiece');
            $(piecesElement).addClass('dropped')
                            .css({
                                position: "relative",
                                top: 0,
                                left: 0
                            }).appendTo(droppedOn);
            checkPieces();
            checkPuzzle();
        }
    });
}

function checkDroppableElement(name) {
    let boardPieces = $('#' + name + ' > div');
    for (let i = 0; i < boardPieces.length; i++) {
        if ($(boardPieces[i]).find('img').length == 0) {
            $(boardPieces[i]).removeClass('hasPiece');
        }
    }
}

function checkPuzzle() {
    checkDroppableElement('board');
}

function checkPieces() {
    checkDroppableElement('pieces');
}

function checkIfPuzzleSolved(pieces) {
    let boardPieces = $('#board > div');
    for (let i = 0; i < boardPieces.length; i++) {
        if ($(boardPieces[i]).find('img').length > 0) {
            if ($(boardPieces[i]).find('img')[0].id != pieces[i]) {
                return false;
            }
        }else {
            return false;
        }
    }
    return true;
}

function disableBorder(correctPieces) {
    for (let i = 0; i < correctPieces.length; i++) {
        $('#' + correctPieces[i]).addClass('finished');
    }
    let boardPieces = $('#board > div');
    for (let i = 0; i < boardPieces.length; i++) {
        $(boardPieces[i]).addClass('finished');
    }
}