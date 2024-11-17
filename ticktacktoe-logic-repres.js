import { existsSync, readFileSync, writeFileSync } from "fs";

const ScoreBoard = {
    win: 0,
    loss: 0,
    draw: 0,
    rollType: ["Rock", "Paper", "Scissors"],
    roll() {
        const roll = Math.floor(Math.random() * 100) + 1;
        if (roll >= 1 && roll <= 30) {
            return this.rollType[0];
        } 
        else if (roll >= 31 && roll <= 60) {
            return this.rollType[1];
        } 
        else if (roll >= 61 && roll <= 100) {
            return this.rollType[2];
        }
    }
};

let player1 = { name: "Anis", win: 0, loss: 0, draw: 0 };
let player2 = { name: "Aiman", win: 0, loss: 0, draw: 0 };

// Load scores from file if available
if (existsSync("scores.json")) {
    const savedScores = JSON.parse(readFileSync("scores.json"));
    player1 = savedScores.player1 || player1;
    player2 = savedScores.player2 || player2;
}

var playerOneRoll = ScoreBoard.roll();
var playerTwoRoll = ScoreBoard.roll();

function determineWinner() {
    if (playerOneRoll === playerTwoRoll) {
        console.log("It's a tie!");
        player1.draw += 1; // Increment draw count for player1
        player2.draw += 1; // Increment draw count for player2
    } else if (playerOneRoll === "Rock") {
        if (playerTwoRoll === "Scissors") {
            player1.win += 1;
            player2.loss += 1;
            console.log("Player One wins!");
        } else if (playerTwoRoll === "Paper") {
            player2.win += 1;
            player1.loss += 1;
            console.log("Player Two wins!");
        }
    } else if (playerOneRoll === "Paper") {
        if (playerTwoRoll === "Rock") {
            player1.win += 1;
            player2.loss += 1;
            console.log("Player One wins!");
        } else if (playerTwoRoll === "Scissors") {
            player2.win += 1;
            player1.loss += 1;
            console.log("Player Two wins!");
        }
    } else if (playerOneRoll === "Scissors") {
        if (playerTwoRoll === "Paper") {
            player1.win += 1;
            player2.loss += 1;
            console.log("Player One wins!");
        } else if (playerTwoRoll === "Rock") {
            player2.win += 1;
            player1.loss += 1;
            console.log("Player Two wins!");
        }
    }
}

// Run the game and determine the winner
determineWinner();

// Save updated scores to file
writeFileSync("scores.json", JSON.stringify({ player1, player2 }));

// Display the updated scores
console.log(`Current Score: Player 1: Wins (${player1.win}) Losses (${player1.loss}) Draws (${player1.draw})`);
console.log(`Current Score: Player 2: Wins (${player2.win}) Losses (${player2.loss}) Draws (${player2.draw})`);
