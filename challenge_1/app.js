document.addEventListener('DOMContentLoaded', function() {
	
	var Game = function() {
		this.currentTurn = true //true=X false=O
		this.reset = document.getElementsByClassName('reset')[0];
		this.ticTacToe = document.getElementsByClassName('ticTacToe')[0];
		this.moves = 0
		this.boardO = new Array(3).fill(0)
		this.boardX = new Array(3).fill(0)
		this.fullBoard = [];
		this.playerOneScore = 0;
		this.playerTwoScore = 0;
	}

	Game.prototype.init = function(){

		this.ticTacToe.addEventListener('click', (e) => {
			this.handleClick(e);
		});

		this.reset.addEventListener('click', (e) => {
			this.handleReset(e);
		});

		this.createFullBoard();
		
	}

	Game.prototype.createFullBoard = function(){
		this.fullBoard = new Array(3);

		for(var i = 0; i < this.boardO.length; i++){
			this.fullBoard[i] = this.boardO[i] ^ this.boardX[i]
		}
	}

	Game.prototype.handleClick = function(event){
	var value = event.target.attributes[1].value;
	var elementClassName = event.path[1].className;
		if(elementClassName === 'row1' && (value & this.fullBoard[0]) == value){
			//do nothing, checks if move is valid
		} else if (elementClassName === 'row2' && (value & this.fullBoard[1]) == value){
			//do nothing, checks if move is valid
		} else if (elementClassName === 'row3' && (value & this.fullBoard[2]) == value){
			//do nothing, checks if move is valid
		} else if(this.currentTurn){
			event.target.innerHTML = "X";
			event.target.classList.add('X')
			this.currentTurn = !this.currentTurn;

			if(elementClassName === 'row1'){
				this.boardX[0] = value ^ this.boardX[0]
			} else if (elementClassName === 'row2'){
				this.boardX[1] = value ^ this.boardX[1]
			} else if (elementClassName === 'row3'){
				this.boardX[2] = value ^ this.boardX[2]
			}
			this.checkBoard();

		} else if (!this.currentTurn){
			event.target.innerHTML = "O";
			event.target.classList.add('O')
			this.currentTurn = !this.currentTurn;

			if(elementClassName === 'row1'){
				this.boardO[0] = value ^ this.boardO[0]
			} else if (elementClassName === 'row2'){
				this.boardO[1] = value ^ this.boardO[1]
			} else if (elementClassName === 'row3'){
				this.boardO[2] = value ^ this.boardO[2]
			}
			this.checkBoard();
		}

	}

	Game.prototype.handleReset = function(event){
		this.currentTurn = true
		this.moves = 0
		this.boardO = new Array(3).fill(0)
		this.boardX = new Array(3).fill(0)
		var elements = document.querySelectorAll('.cell')
		for(var i = 0; i < elements.length; i++){
			elements[i].innerHTML = '';
			elements[i].classList.remove('X')
			elements[i].classList.remove('O')
		}
		this.init();
	}

	Game.prototype.checkBoard = function(){
		this.createFullBoard();
		this.moves += 1;

		if(this.boardO.includes(7)){
			this.playerTwoScore += 1
			this.handleWin(this.playerTwo)
		} else if(this.boardX.includes(7)){
			this.playerOneScore += 1
			this.handleWin(this.playerOne)
		} else if((this.boardO[0] & this.boardO[1] & this.boardO[2]) !== 0){
			this.playerTwoScore += 1
			this.handleWin(this.playerTwo)
		} else if((this.boardX[0] & this.boardX[1] & this.boardX[2]) !== 0){
			this.playerOneScore += 1
			this.handleWin(this.playerOne)
		} else if((this.boardO[0] >> 2 & this.boardO[1] >> 1 & this.boardO[2]) == 1 || (this.boardO[0] & this.boardO[1] >> 1 & this.boardO[2] >> 2) == 1){
			this.playerTwoScore += 1
			this.handleWin(this.playerTwo)
		} else if((this.boardX[0] >> 2 & this.boardX[1] >> 1 & this.boardX[2]) == 1 || (this.boardX[0] & this.boardX[1] >> 1 & this.boardX[2] >> 2) == 1){
			this.playerOneScore += 1
			this.handleWin(this.playerOne)
		} else if(this.moves === 9){
			setTimeout(() => alert("TIE!"), 10)
		}
	}

	Game.prototype.handleWin = function(winner){
		setTimeout(() => {alert(`The Winner Is: ${winner}!!`)} , 10)
		document.getElementsByClassName('player1')[0].innerHTML = `${this.playerOne} X: ${this.playerOneScore}`
		document.getElementsByClassName('player2')[0].innerHTML = `${this.playerTwo} O: ${this.playerTwoScore}`
		this.fullBoard = new Array(3).fill(7);
	}

	Game.prototype.players = function(){
		this.playerOne = prompt('Player One\'s Name (X)') || 'Player One'
		this.playerTwo = prompt('Player Two\'s Name (O)') || 'Player Two'

		document.getElementsByClassName('player1')[0].innerHTML = `${this.playerOne} X: ${this.playerOneScore}`
		document.getElementsByClassName('player2')[0].innerHTML = `${this.playerTwo} O: ${this.playerTwoScore}`
	}

var currentGame = new Game;
currentGame.init();
currentGame.players();

});

