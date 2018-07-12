import React from 'react';
import ReactDOM from 'react-dom';

export class App extends React.Component {
	constructor(props) {
	    super(props);
	    this.height = 6;
	    this.width = 7;
	    this.board = new Array(this.width).fill(new Array(this.height).fill(0))
	    this.boardCapacity = this.height * this.width;
	    this.state = {

	    };
	}

	columnTemplate(item){
		return(
			<div className={item}>{item}</div>
		)
	}

	boardTemplate(element){
		return(
		<div className='column'>
			{element.map((item) => (this.columnTemplate(item)))}
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
		    {this.board.map((element) => (this.boardTemplate(element)))}
		    </div>
		  </div>
		);
	}

}


