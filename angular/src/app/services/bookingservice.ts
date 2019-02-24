import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../domain/booking';

@Injectable()
export class BookingService {

    constructor(private http: HttpClient) {}
        // return this.http.get<any>('assets/data/test-bookings.json')
    getBookings(email) {
        return this.http.get<any>('https://api.janmg.com/booking?email='+email)
            .toPromise()
            .then(res => <Booking[]> res.booking)
            .then(booking => booking);
    }
    sendBooking(booking) {
        return this.http.post('https://api.janmg.com/booking', booking)
            .toPromise()
    }
}
