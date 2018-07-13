import React from 'react';
import ReactDOM from 'react-dom';

export class App extends React.Component {
	constructor(props) {
	    super(props);
	    this.height = 6;
	    this.width = 7;
	    this.boardCapacity = this.height * this.width;
	    this.state = {
	    	board: this.generateBoard(this.height,this.width),
	    	turn: true,
	    	moves: 0,
	    	0: 0,
	    	1: 0,
	    	2: 0,
	    	3: 0,
	    	4: 0,
	    	5: 0,
	    	6: 0,
	    };
	}

	generateBoard(height, width) {
    var board = [];
    var boardRow = [];
    for (var i = 0; i < width; i++) {
      for (var j = 0; j < height; j++) {
        boardRow.push(null);
      }
      board.push(boardRow);
      boardRow = [];
    }
    return board; 
    }

	handleClick(e){
		var obj = {}
		var currentColumn = e.target.getAttribute('name')
		if(this.state[currentColumn] < this.height && this.state.moves !== this.boardCapacity){
		this.state.board[currentColumn][this.state[currentColumn]] = this.state.turn
		obj[currentColumn] = this.state[currentColumn] += 1
		
		this.state.moves = this.state.moves += 1
		this.state.turn = !this.state.turn
		this.setState(obj);
		this.checkBoard();
		}
	}

	checkBoard(){
		var board = this.state.board;

		var recurCheck = (row,col) => {
		row = row || 0;
		col = col || 0;
			if(row > this.height){
				return 	'no win'
			}else if(col > this.width){
				return recurCheck(row + 1)	
			}
			if(!board[col]){
				return recurCheck(row,col+1)
			} else if(board[col][row] === null){
				return recurCheck(row,col+1)
			} else {

				if((board[col][row] === true) && (board[col][row+1] === true) && (board[col][row+2] === true) && (board[col][row+3] === true)){
					return board[col][row]
				}

				if((board[col][row] === false) && (board[col][row+1] === false) && (board[col][row+2] === false) && (board[col][row+3] === false)){
					return board[col][row]
				}

				if(col < this.width - 3){
				if((board[col][row] === true) && (board[col+1][row] === true) && (board[col+2][row] === true) && (board[col+3][row] === true)){
					return board[col][row]
				}

				if((board[col][row] === false) && (board[col+1][row] === false) && (board[col+2][row] === false) && (board[col+3][row] === false)){
					return board[col][row]
				}
				}


				if(col < this.width - 3){
					if((board[col][row] === true) && (board[col+1][row+1] === true) && (board[col+2][row+2] === true) && (board[col+3][row+3] === true)){
						return board[col][row]
					}
					if((board[col][row] === false) && (board[col+1][row+1] === false) && (board[col+2][row+2] === false) && (board[col+3][row+3] === false)){
						return board[col][row]
					}
				}

				if(col > 2){
					if((board[col][row] === true) && (board[col-1][row+1] === true) && (board[col-2][row+2] === true) && (board[col-3][row+3] === true)){
						return board[col][row]
					}
					if((board[col][row] === false) && (board[col-1][row+1] === false) && (board[col-2][row+2] === false) && (board[col-3][row+3] === false)){
						return board[col][row]
					}
				}
			

			}
		
			return recurCheck(row,col+1)

		}

		var win = recurCheck()
		console.log(win)

		if(win !== 'no win'){
			if(win === true){
				alert('Red Wins!')
			} else{
				alert('Blue Wins!')
			}
			this.state.moves = this.boardCapacity;
		} else if(this.state.moves >= this.boardCapacity){
			alert('Tie!')
		}
	}

	columnTemplate(item, index){
		return(
			<div className={item + ' element'} name={index}>{item}</div>
		)
	}

	boardTemplate(element, index){
		return(
		<div className='column' onClick={this.handleClick.bind(this)} name={index}>
			{element.map((item) => (this.columnTemplate(item, index)))}
		</div>
		)
	}

  
	render() {
		return (
		  <div>
		    <h1 className='title'>
		    Connect Four!
		    </h1>
		    <div className = 'board'>
		    {this.state.board.map((element,index) => (this.boardTemplate(element,index)))}
		    </div>
		  </div>
		);
	}

}


