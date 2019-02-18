var page = 1
function populate() {
	  var email = document.getElementById('email').value
	  var bookingapi = "https://api.janmg.com/booking?email="+email+"&limit=10&page="+page;
	  $.getJSON(bookingapi, function(data) {
		      var trHTML = '';
		      $.each(data.booking, function (i, item) {
			            trHTML += '<tr><td>' + item.eventdate + '</td><td>' + item.duration + '</td><td>' + item.venue + '</td><td>' + item.country + '</td><td>' + item.people + '</td><td>' + item.price + '</td></tr>';
			          });
		      document.getElementById('booking').innerHTML = trHTML;
		    });
}

function next() {
	  page += 1
	  populate()
}

function previous() {
	  page -= 1
	  populate()
}
