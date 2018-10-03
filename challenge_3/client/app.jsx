class App extends React.Component {

	constructor(props){
		super(props);

	    this.handleClickNext = this.handleClickNext.bind(this);
	    this.returnToHomepage = this.returnToHomepage.bind(this);
	    this.transition = this.transition.bind(this);
	    this.nextPage = this.nextPage.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.state = {
     		currentPage: 0,
     		name: '',		
	  		email: '',
	  		password: '',
	  		address1: '',
  			address2: '',
  			city: '',
  			state: '',
  			zip: '',
  			phone: '',
  			ccNum: '',
  			expiry: '',
  			cvv: '',
  			billingZip: ''
		};
	}

	transition(id) {
  	if(id === 0) {
  		return ( 
  			<div><Header />
  			<button onClick={this.handleClickNext}>Checkout</button></div> );
  	} else if (id === 1) {
  		return ( 
  			<div><Header />
  			<UserInformation changePage={this.nextPage.bind(this)} change={this.handleChange.bind(this)}/></div> );
  	} else if (id === 2) {
  		return (
			<div><Header />
			<ShiptTo changePage={this.nextPage.bind(this)} change={this.handleChange.bind(this)}/></div>
  		);
  	} else if (id === 3) {
  		return (
			<div><Header />
			<CreditCard changePage={this.nextPage.bind(this)} change={this.handleChange.bind(this)}/></div>
  		);
  	} else if (id === 4) {
  		return (
			<div><Header />
			<Confirmation backToHomepage={this.returnToHomepage.bind(this)} info={this.state}/></div>
  		);  		
  	}
  };

	handleClickNext(event) {
		event.preventDefault();
		this.nextPage();
	};

	handleChange(event) {
  	var change = {};
  	change[event.target.name] = event.target.value;
	this.setState(change);
  	}

	nextPage() {
		var nextState = this.state.currentPage + 1;
		this.setState({currentPage: nextState});
	}

	returnToHomepage() {
		this.setState({currentPage: 0});
	}

	render() {
		return this.transition(this.state.currentPage);
	};
}

class Header extends React.Component {
   render() {
      return (
         <div>
            <h1>Multistep Checkout Experience</h1>
         </div>
      );
   }
}

class UserInformation extends React.Component {
	constructor(props) {
  	super(props);
  	this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
  	event.preventDefault();
  	this.props.changePage();
  }

  render() {
  	return (
  		<form className='form' onSubmit={this.handleFormSubmit}>
			  <div>
			    <label>Name:</label>
			    <input type="text" onChange={this.props.change} name='name'></input>
			  </div>
			  <div>
			    <label>E-mail:</label>
			    <input type="text" onChange={this.props.change} name='email'></input>
			  </div>
			  <div>
			    <label>Password:</label>
			    <input type="password" onChange={this.props.change} name='password'></input>
			  </div>
			  <div>
			  	<input type="submit" value="Next"></input>
			  </div>
			</form>
  	);
  }
};

class ShiptTo extends React.Component {
	constructor(props) {
  	super(props);
  	this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
  	event.preventDefault();
  	this.props.changePage();
  }

  render() {
  	return (
  		<form className='form' onSubmit={this.handleFormSubmit}>
			  <div>
			    <label>Address 1:</label>
			    <input type="text" onChange={this.props.change} name='address1'></input>
			  </div>
			  <div>
			    <label>Address 2:</label>
			    <input type="text" onChange={this.props.change} name='address2'></input>
			  </div>
			  <div>
			    <label>City:</label>
			    <input type="text" onChange={this.props.change} name='city'></input>
			  </div>
			  <div>
			    <label>State:</label>
			    <input type="text" onChange={this.props.change} name='state'></input>
			  </div>
			  <div>
			    <label>Zip:</label>
			    <input type="text" onChange={this.props.change} name='zip'></input>
			  </div>
			  <div>
			    <label>Phone:</label>
			    <input type="text" onChange={this.props.change} name='phone'></input>
			  </div>			  		  
			  <div>
			  	<input type="submit" value="Next"></input>
			  </div>
			</form>
  	);
  }
};



class CreditCard extends React.Component {
	constructor(props) {
  	super(props);

	this.handleFormSubmit = this.handleFormSubmit.bind(this);

  }

  handleFormSubmit(event) {
  	event.preventDefault();
  	this.props.changePage();
  }

  render() {
  	return (
  		<form className='form' onSubmit={this.handleFormSubmit}>
			  <div>
			    <label>Credit Card Number:</label>
			    <input type="text" onChange={this.props.change} name='ccNum'></input>
			  </div>
			  <div>
			    <label>Experation Date:</label>
			    <input type="text" onChange={this.props.change} name='expiry'></input>
			  </div>
			  <div>
			    <label>CVV code:</label>
			    <input type="text" onChange={this.props.change} name='cvv'></input>
			  </div>
			  <div>
			    <label>Zip:</label>
			    <input type="text" onChange={this.props.change} name='billingZip'></input>
			  </div>
			  <div>
			  	<input type="submit" value="Next"></input>
			  </div>
		</form>  		
  	);
  }
};

class Confirmation extends React.Component {
	constructor(props) {
  	super(props);
  	console.log(props.info)
  };

  purchaseClicked(event) {
  	event.preventDefault();
  	alert('Thank you for your purchase!')
  	this.sendPurchase();
  	this.props.backToHomepage();
  };

  sendPurchase(){
  	var send = this.props.info;
	fetch('http://127.0.0.1:3000/', {
	  method: 'POST',
	  headers: {
	    Accept: 'application/json',
	    'Content-Type': 'application/json',
	  },
	  body: JSON.stringify(send),
	})
    .then((response) => {
    	console.log('success')
      console.log(response);
    })
    .catch((error) => {
    	console.log('error')
      console.error(error);
    });
  }

  render() {
  	return(
  		<form className='form' onSubmit={this.purchaseClicked.bind(this)}>
			  <div className='confirmation'>
			  	<h2>Please confirm your information!</h2>
			  	<span>
			  	Name: {this.props.info.name}
			  	</span>
			  	<span>			  	
			  	E-mail: {this.props.info.email}
			  	</span>
			  	<span>
			  	Address: {this.props.info.address1} {this.props.info.address2} {this.props.info.city} {this.props.info.state} {this.props.info.zip}
			  	</span>
			  	<span>			  	
			  	Phone Number: {this.props.info.phone}
			  	</span>
			  	<span>			  	
			  	Credit Card: {this.props.info.ccNum}
			  	</span>
			  	<span>			  	
			  	Experation: {this.props.info.expiry}
			  	</span>
			  	<span>			  	
			  	CVV: {this.props.info.cvv}
			  	</span>
			  	<span>			  	
			  	Billing Zip: {this.props.info.billingZip}
			  	</span>
			  </div>
		<input type="submit" value="Purchase"></input>
		</form>  
  	)
  }
}


ReactDOM.render(
  <App/>,
  document.getElementById('app')
)