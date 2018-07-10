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
		for(var i = 0; i < data.firstName.length; i++){
			$('.firstname').append(`<div>${data.firstName[i]}</div>`)
			$('.lastname').append(`<div>${data.lastName[i]}</div>`)
			$('.county').append(`<div>${data.county[i]}</div>`)
			$('.city').append(`<div>${data.city[i]}</div>`)
			$('.role').append(`<div>${data.role[i]}</div>`)
			$('.sales').append(`<div>${data.sales[i]}</div>`)
		}
		$('.csv').val('firstName,lastName,county,city,role,sales \n' + data.csv)
	}

})