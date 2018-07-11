$(document).ready(function(){

	$('.submit').click(function(e){
	 	e.preventDefault();
		var info = $('.text').val();
		var send = {
			text: info,
		}
		$.ajax({
			url: 'http://127.0.0.1:3000/',
		    type: 'POST',
		    data: send,
		    datatype: 'application/JSON',
			success: function(data) {
		      console.log('successful');
		      console.log(data)
		      $('.text').val('')
		      handleData(data);
		    },
		    error: function(err) {
		      console.log('failed');
		      console.log(err);
		    }
		})
	})

	var handleData = function(data){
		var items = ['firstName','lastName','county','city','role','sales']
		for(var i = 0; i < items.length; i++){
			for(var j = 0; j < data.firstName.length; j++){
				$(`.${items[i]}`).append(`<div>${data[items[i]][j]}</div>`)
			}
		}
		$('.csv').val('firstName,lastName,county,city,role,sales\n' + data.csv)
	}

})