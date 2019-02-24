# booking

## Summary
The Booking API is prototype to create and list bookings. A prototype does not include extensive input sanitation or error handling. As a prototype it is functional, but it also shows the weaknesses, It's scalable in performance and it demonstrates how XHR works. Proper frameworks however have more features and are a lot prettier.

The starting point is a Swagger OpenAPI 3.0.1 YAML definition and Swagger Codegen to create a NodeJS templates. The BookingService.js is then filled with the logic to persist to a MariaDB database, this requires the mariadb npm module to be installed. The database table was created with the db-init.sql. The application runs with npm start. All queries are logged on the console.

The API is frontended by NGINX with URL's /docs /api-docs and /booking. The predefined bookings for listing are jan@janmg.com and test@janmg.com. Own bookings can be created through the Swagger UI.

The HTML interface is very crude, it's contains an empty table that's filled through javascript from the API with an email address as input. pagination is done through the page variable, the items per page is limited to 10, there are no boundary checks so pages can be negative and higher where no entries are available. The HTML intereface shows how javascript internally works by elements, but it's hardly  a sustainable framework.

I used PrimeNG for Angular because it's similar to PrimeFaces for JAVA JSF. The MVC principles are the same. The Angular table fetches the data from the API, but create/update/delete hooks are not implemented.

## Service
[Booking API](https://api.janmg.com/docs/#/booking)

[Booking HTML](https://www.janmg.com/booking.html)

[Booking Angular](https://api.janmg.com/)

## Installation 
```bash
mysql < db-init.sql
java -jar ../swagger-codegen/modules/swagger-codegen-cli/target/swagger-codegen-cli.jar generate -i booking-1.0.0.yml -l nodejs-server -o .
git checkout service/BookingService.js
npm install mariadb
npm start
```

## Code
Because Codegen will overwrite the BookingService with an empty template, the BookingService can be restored with a GIT checkout. The application only adds minor variable checks to provide defaults for undefined optional values. Through Promise the database statements are executed and the webservice (nodejs-connect) waits for the result. The booking list is created from all the database columns and all the rows filtered by the users email address. Optionally pagination is done in the database through Limit and Offset. The offset is calculated as page*limit. Because the first page starts with offset 0, there is an off-by-one.

There is not much original code and I would definately pick other frameworks for anything past a demo.

