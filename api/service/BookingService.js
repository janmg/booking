'use strict';
const mariadb = require('mariadb');
const pool = mariadb.createPool({host: 'localhost', user: 'booking', password: 'booking', database: 'booking', connectionLimit: 10});

exports.addbooking = function(email,venue,eventdate,duration,people) {
    console.log("added bookings for "+email);
    var now = new Date();
    var createddate = now.toISOString();
    var people = (people === undefined) ? '' : people;
    return new Promise(function(resolve, reject) {
      pool.getConnection()
         .then(conn => {
            conn.query('INSERT INTO booking VALUES (?,?,?,?,?,?,?,?)', [email, createddate, venue, people, eventdate, duration, 25*duration, 'fi'])
               .then(result => {
                   console.log("added booking:"+result);
                   conn.end();
                   resolve(JSON.stringify({ booking: 'success' }));
            })
         })
         .catch(err => {
            console.log("not connected due to error: " + err);
            reject();
         });
  });
}

exports.listbooking = function(email,limit,page) {
  var limit = (limit === undefined || limit > 100) ? 100 : limit;
  var page = (page === undefined || page < 1) ? 1 : page;
  return new Promise(function(resolve, reject) {
      pool.getConnection()
         .then(conn => {
            conn.query('SELECT * FROM booking WHERE email=? LIMIT ?,?', [email, limit*(page-1), limit])
               .then(rows => {
                   console.log("listed bookings:"+email+" page: "+page+" limit: "+limit);
                   conn.end();
                   resolve(JSON.stringify({ booking: rows }));
	    })
         })
         .catch(err => {
            console.log("not connected due to error: " + err);
            reject();
         });
  });
}

