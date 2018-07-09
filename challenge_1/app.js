document.addEventListener('DOMContentLoaded', function() {
	
	var currentTurn = true //true=X false=O

	var one = document.getElementsByClassName('one')[0];
	var two = document.getElementsByClassName('two')[0];
	var three = document.getElementsByClassName('three')[0];
	var four = document.getElementsByClassName('four')[0];
	var five = document.getElementsByClassName('five')[0];
	var six = document.getElementsByClassName('six')[0];
	var seven = document.getElementsByClassName('seven')[0];
	var eight = document.getElementsByClassName('eight')[0];
	var nine = document.getElementsByClassName('nine')[0];
	var reset = document.getElementsByClassName('reset')[0];

	var items = [one,two,three,four,five,six,seven,eight,nine];
	var resetItems = ['1','2','3','4','5','6','7','8','9'];
	var moves = 0	

	for(var i = 0; i < items.length; i++)
	items[i].addEventListener('click', function(e){
		handleClick(e);
	});	

	reset.addEventListener('click', function(e){
		handleReset(e);
	})
   
	var handleClick = function(event){
	console.log(event)
		if(event.target.innerHTML === "X" || event.target.innerHTML === "O"){
			//do nothing
		} else {
			if(currentTurn){
			event.target.innerHTML = "X";
			currentTurn = !currentTurn;
			} else{
			event.target.innerHTML = "O";
			currentTurn = !currentTurn;
			}
			checkBoard();
		}
	}

	var handleReset = function(event){
		for(var i = 0; i < items.length; i++){
			items[i].innerHTML = resetItems[i]
		}
		currentTurn = true
		moves = 0
	}

	var checkBoard = function(){
		if(one.innerHTML === two.innerHTML && two.innerHTML === three.innerHTML){
			console.log(one.innerHTML)
			console.log(two.innerHTML)
			console.log(three.innerHTML)
			alert(one.innerHTML + "WINS!")
		}
		if(four.innerHTML === five.innerHTML && five.innerHTML === six.innerHTML){
			alert(four.innerHTML + "WINS!")
		}
		if(seven.innerHTML === eight.innerHTML && eight.innerHTML === nine.innerHTML){
			alert(seven.innerHTML + "WINS!")
		}
		if(one.innerHTML === five.innerHTML && five.innerHTML === nine.innerHTML){
			alert(one.innerHTML + "WINS!")
		}
		if(three.innerHTML === five.innerHTML && five.innerHTML === seven.innerHTML){
			alert(three.innerHTML + "WINS!")
		}
		if(one.innerHTML === four.innerHTML && four.innerHTML === seven.innerHTML){
			alert(one.innerHTML + "WINS!")
		}
		if(two.innerHTML === five.innerHTML && five.innerHTML === eight.innerHTML){
			alert(two.innerHTML + "WINS!")
		}
		if(three.innerHTML === six.innerHTML && six.innerHTML === nine.innerHTML){
			alert(three.innerHTML + "WINS!")
		}

		moves += 1;
		if(moves === 9){
			alert("TIE!")
		}
	}

});

