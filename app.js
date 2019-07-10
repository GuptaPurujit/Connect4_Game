var playerOne = prompt('Player one, please enter your name, your color will be red');
var playerOneColor = 'rgb(255, 0, 0)';
var playerTwo = prompt('Player two, please enter your name, your color will be blue');
var playerTwoColor = 'rgb(0, 0, 255)';


var table = $('tr')

function checkColor(rowIndex, columnIndex) {
    return table.eq(rowIndex).find('td').eq(columnIndex).css('background-color');
}

function changeColor(rowIndex, columnIndex, color) {
    return table.eq(rowIndex).find('td').eq(columnIndex).css('background-color', color);
}

function checkBottom(columnIndex) {
    var colorReport = checkColor(4, columnIndex);
    for (var row = 4; row >= 0; row--) {
        colorReport = checkColor(row, columnIndex);
        if (colorReport === 'rgb(128, 128, 128)') {
            return row;
        }
    }
}

function colorMatchCheck(one, two, three, four) {
    return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined)

}

function horizontalWinCheck() {
    for (var row = 0; row < 5; row++) {
        for (var col = 0; col < 4; col++) {
            if (colorMatchCheck(checkColor(row, col), checkColor(row, col + 1), checkColor(row, col + 2), checkColor(row, col + 3))) {
                console.log('horiz');
                return true;
            }
            else {
                continue;
            }
        }
    }
}

function veritcalWinCheck() {
    for (var col = 0; col < 6; col++) {
        for (var row = 0; row < 2; row++) {
            if (colorMatchCheck(checkColor(row, col), checkColor(row + 1, col), checkColor(row + 2, col), checkColor(row + 3, col))) {
                console.log('vertical');
                return true;
            }
            else {
                continue;
            }
        }
    }
}

function diagonallWinCheck() {
    for (var row = 4; row >= 3; row--) {
        for (var col = 0; col < 4; col++) {
            if (colorMatchCheck(checkColor(row, col), checkColor(row - 1, col + 1), checkColor(row - 2, col + 2), checkColor(row - 3, col + 3))) {
                console.log('diag');
                return true;
            }
            else {
                continue;
            }
        }
    }
    for (var row = 0; row <= 1; row++) {
        for (var col = 0; col < 4; col++) {
            if (colorMatchCheck(checkColor(row, col), checkColor(row + 1, col + 1), checkColor(row + 2, col + 2), checkColor(row + 3, col + 3))) {
                console.log('diag');
                return true;
            }
            else {
                continue;
            }
        }
    }
}

var currentPlayer = 1;
var currentName = playerOne;
var currentColor = playerOneColor;

$('p').text(playerOne + ' its your turn, pick a column to drop in!');

$('td').on('click', function () {
    var col = $(this).index();
    var bottomAvail = checkBottom(col);
    changeColor(bottomAvail, col, currentColor);

    if (horizontalWinCheck() || veritcalWinCheck() || diagonallWinCheck()) {
        $('h1').text(currentName + ', you have won!\nIn order to restart the game click on reload button');
        $('p').fadeOut(1000);
        $('h3').fadeOut(1000);
    }

    currentPlayer = currentPlayer * -1;
    if (currentPlayer === 1) {
        currentName = playerOne;
        $('p').text(currentName + ' it is your turn.')
        currentColor = playerOneColor;
    }
    else {
        currentName = playerTwo;
        $('p').text(currentName + ' it is your turn.')
        currentColor = playerTwoColor;
    }
})
