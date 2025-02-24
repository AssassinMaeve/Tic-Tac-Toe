// ==========================
// GAME VARIABLES & ELEMENTS
// ==========================

// Select all Tic-Tac-Toe cells
const boardCells = document.querySelectorAll(".cell");

// Select the status display (shows current player or winner)
const statusDisplay = document.getElementById("gameStatus");

// Select the reset button
const resetButton = document.getElementById("reset");

// Initialize the current player (X starts first)
let currentPlayer = "X";

// Create an empty game board (9 cells)
let gameBoard = ["", "", "", "", "", "", "", "", ""];

// Game state flag (to prevent further moves after game ends)
let gameActive = true;

// ==========================
// WINNING COMBINATIONS
// ==========================

// Winning patterns - combinations that result in a win
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// ==========================
// FUNCTION: CHECK WINNER
// ==========================

const checkWin = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;

        // Check if all three cells match and are not empty
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            statusDisplay.textContent = `🎉 Player ${currentPlayer} wins!`;
            gameActive = false; // Stop further moves
            return;
        }
    }

    // Check for a draw (if all cells are filled and no winner)
    if (!gameBoard.includes("")) {
        statusDisplay.textContent = "It's a draw!";
        gameActive = false; // Stop further moves
    }
};

// ==========================
// FUNCTION: HANDLE PLAYER MOVE
// ==========================

const handleMove = (event) => {
    const index = event.target.dataset.index; // Get the index of the clicked cell

    // Check if the cell is empty and the game is still active
    if (gameBoard[index] === "" && gameActive) {
        gameBoard[index] = currentPlayer; // Update game board array
        event.target.textContent = currentPlayer; // Display the player's symbol
        event.target.classList.add("taken"); // Add a class for styling

        checkWin(); // Check if the move resulted in a win

        // Switch player turn if game is still active
        if (gameActive) {
            currentPlayer = currentPlayer === "X" ? "O" : "X"; // Toggle between X and O
            statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
};

// ==========================
// EVENT LISTENERS: HANDLE CELL CLICKS
// ==========================

// Add click event listener to each Tic-Tac-Toe cell
boardCells.forEach(cell => cell.addEventListener("click", handleMove));

// ==========================
// FUNCTION: RESET GAME
// ==========================

resetButton.addEventListener("click", () => {
    // Reset game board array
    gameBoard = ["", "", "", "", "", "", "", "", ""];

    // Clear all cells and remove "taken" class
    boardCells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });

    // Reset game state
    currentPlayer = "X";
    gameActive = true;
    statusDisplay.textContent = "Player X's turn"; // Reset status message
});
