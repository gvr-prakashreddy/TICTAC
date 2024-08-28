const board = document.getElementById('board');
const squares = document.getElementsByClassName('square');
const players = ['X', 'O'];
let currentPlayer = players[0];
const endMessage = document.createElement('h2');
endMessage.textContent = `${currentPlayer}'s turn!`;
endMessage.style.marginTop = '30px';
endMessage.style.textAlign = 'center';
board.after(endMessage);

// Winning combinations
const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', () => {
        if (squares[i].textContent !== '') {
            return;
        }
        squares[i].textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            endMessage.textContent = `Game over! ${currentPlayer} wins!`;
            return;
        }
        if (checkTie()) {
            endMessage.textContent = 'Game is tied!';
            return;
        }
        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
        endMessage.textContent = `${currentPlayer}'s turn!`;
    });
}

function checkWin(currentPlayer) {
    for (let i = 0; i < winning_combinations.length; i++) {
        const [a, b, c] = winning_combinations[i];
        if (squares[a].textContent === currentPlayer &&
            squares[b].textContent === currentPlayer &&
            squares[c].textContent === currentPlayer) {
            return true;
        }
    }
    return false;
}

function checkTie() {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].textContent === '') {
            return false;
        }
    }
    return true;
}

function restartButton() {
    // Clear the board
    for (let i = 0; i < squares.length; i++) {
        squares[i].textContent = '';
    }
    // Reset the current player
    currentPlayer = players[0];
    // Update the end message
    endMessage.textContent = `${currentPlayer}'s turn!`;
}

// Create and add a restart button
const restartBtn = document.createElement('button');
restartBtn.textContent = 'Restart Game';
restartBtn.style.display = 'block';
restartBtn.style.margin = '20px auto';
restartBtn.addEventListener('click', restartButton);
board.after(restartBtn);
