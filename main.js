function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(cell());
        }
    }

    const getBoard = () => board;
    
    const setCell = (row, column, player) => {
        if (board[row][column].getValue() !== '') return;
        board[row][column].setValue(player);
    };

    const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
    };

    return {
        getBoard,
        setCell,
        printBoard
    };
}

function cell() {
    let value = '';

    const getValue = () => value;
    
    const setValue = (player) => {
        value = player;
    };

    return {
        getValue,
        setValue
    };
}

function gameController(
    playerOneName = 'Player 1',
    playerTwoName = 'Player 2',
    playerOneSymbol = 'X',
    playerTwoSymbol = 'O'
) {
    const board = gameBoard();
    const players = [
        { name: playerOneName, symbol: playerOneSymbol },
        { name: playerTwoName, symbol: playerTwoSymbol }
    ];
    let activePlayer = players[0];
    let gameOver = false;

    const getCurrentPlayer = () => activePlayer;

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const checkWinner = () => {
        const b = board.getBoard().map(row => row.map(cell => cell.getValue()));
        const lines = [
            // Rows
            [b[0][0], b[0][1], b[0][2]],
            [b[1][0], b[1][1], b[1][2]],
            [b[2][0], b[2][1], b[2][2]],
            // Columns
            [b[0][0], b[1][0], b[2][0]],
            [b[0][1], b[1][1], b[2][1]],
            [b[0][2], b[1][2], b[2][2]],
            // Diagonals
            [b[0][0], b[1][1], b[2][2]],
            [b[0][2], b[1][1], b[2][0]],
        ];
        for (const line of lines) {
            if (line[0] && line.every(cell => cell === line[0])) return line[0];
        }
        return null;
    };

    const checkDraw = () => {
        return board.getBoard().every(row => row.every(cell => cell.getValue() !== ''));
    };

    const makeMove = (row, column) => {
        if (gameOver) return;

        const cell = board.getBoard()[row][column];
        if (cell.getValue() !== '') {
            console.log('Cell already taken. Choose another.');
            return;
        }

        board.setCell(row, column, getCurrentPlayer().symbol);
        board.printBoard();

        const winner = checkWinner();
        if (winner) {
            console.log(`${getCurrentPlayer().name} wins!`);
            gameOver = true;
            return;
        }

        if (checkDraw()) {
            console.log("It's a draw!");
            gameOver = true;
            return;
        }

        switchPlayer();
        console.log(`${getCurrentPlayer().name}'s turn.`);
    };

    console.log(`${getCurrentPlayer().name}'s turn.`);

    return { getBoard: board.getBoard, makeMove, getCurrentPlayer };
}

const ticTacToe = gameController();
