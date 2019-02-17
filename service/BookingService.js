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
  console.log("viewing bookings for "+email);
  return new Promise(function(resolve, reject) {
      if (limit > 100) limit = 100;
      if (page < 1) page = 1;
      pool.getConnection()
         .then(conn => {
            conn.query('SELECT * FROM booking WHERE email=? LIMIT ?,?', [email, limit*(page-1), limit])
               .then(rows => {
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

