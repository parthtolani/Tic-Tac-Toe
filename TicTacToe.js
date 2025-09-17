document.addEventListener('DOMContentLoaded', () => {
    const turn = document.getElementById('turn');
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winningConditions = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    cells.forEach(cell => cell.textContent = '');

    function checkResult() {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                turn.textContent = 'Player ' + currentPlayer + ' has won!';
                gameActive = false;
                return;
            }
        }
        if (!board.includes('')) {
            turn.textContent = "It's a draw!";
            gameActive = false;
        }
    }

    cells.forEach(cell => {
        cell.addEventListener('click', function() {
            const idx = this.getAttribute('data-index');
            if (board[idx] !== '' || !gameActive) {
                return;
            }
            board[idx] = currentPlayer;
            this.textContent = currentPlayer;
            checkResult();
            if (gameActive) {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                turn.textContent = "Player " + currentPlayer + "'s turn : " + currentPlayer;
            }
        });
    });

    resetButton.addEventListener('click', function() {
        board = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        gameActive = true;
        turn.textContent = "Player X's turn : X";
    });
});