import { Component, OnInit } from '@angular/core';
import { Booking } from './domain/booking';
import { BookingService } from './services/bookingservice';

export class PrimeBooking implements Booking{
    constructor(public email?, public created?, public eventdate?, public duration?, public venue?, public country?, public people?, public price?) {}
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [BookingService]
})
export class AppComponent implements OnInit {

    bookings: Booking[];
    cols: any[];
    email: "";
    eventdate: Date;
    displayDialog: boolean;
    booking: Booking = new PrimeBooking();
    selectedBooking: Booking;
    newBooking: boolean;

    constructor(private bookingService: BookingService) { }

    ngOnInit() {
        this.cols = [
            { field: 'email', header: 'email' },
            { field: 'created', header: 'created' },
            { field: 'eventdate', header: 'eventdate' },
            { field: 'duration', header: 'duration' },
            { field: 'venue', header: 'venue' },
            { field: 'country', header: 'country' },
            { field: 'people', header: 'people' },
            { field: 'price', header: 'price' }
        ];
    }

    list() {
        this.bookingService.getBookings(this.email).then(bookings => this.bookings = bookings);
    }

    fillTable(email) {
        // TODO: Make table visible
        this.bookingService.getBookings(email).then(bookings => this.bookings = bookings);
    }

    showDialogToAdd() {
        this.newBooking = true;
        this.displayDialog = true;
        this.booking = new PrimeBooking();
    }

    save() {
        const bookings = [...this.bookings];
        if (this.newBooking) {
            bookings.push(this.booking);
            // TODO: This is where the booking would be send to the API
            this.bookingService.sendBooking(this.booking);
        } else {
            bookings[this.findSelectedBookingIndex()] = this.booking;
        }
        this.booking.email = this.email;
        this.booking.created = new Date().toISOString();
        this.booking.eventdate = new Date(this.booking.eventdate).toISOString();

        this.bookings = bookings;
        this.booking = null;
        this.displayDialog = false;
    }

    delete() {
        const index = this.findSelectedBookingIndex();
        this.bookings = this.bookings.filter((val, i) => i !== index);
        this.booking = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newBooking = false;
        this.booking = {...event.data};
        this.displayDialog = true;
    }

    findSelectedBookingIndex(): number {
        return this.bookings.indexOf(this.selectedBooking);
    }
}
