# booking

## Summary
Booking is a demo server that offers a REST API for creating and listing bookings.

## Service
[Booking API](https://api.janmg.com/docs/#/booking)

## Installation 
```bash
mysql < db-init.sql
java -jar ../swagger-codegen/modules/swagger-codegen-cli/target/swagger-codegen-cli.jar generate -i booking-1.0.0.yml -l nodejs-server -o .
git checkout service/BookingService.js
npm install mariadb
npm start
```
