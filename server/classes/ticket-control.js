
const path = require('path');
const fs = require('fs');

class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}

class TicketControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last4 = [];

        this.init()
    }

    init() {
        const {last, today, tickets, last4} = require('../data/data.json');
        if (today === this.today) {
            this.tickets = tickets;
            this.last = last;
            this.last4 = last4;
        } else {
            this.resetCounter();
        }
    }

    resetCounter() {
        this.last = 0;
        this.tickets = [];
        this.last4 = [];

        console.log('The system has been initialized');
        this.saveDB();
    }

    saveDB() {

        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4,
        };

        let jsonDataString = JSON.stringify(jsonData);
        const dbPath = path.join(__dirname, '../data/data.json');
        fs.writeFileSync(dbPath, jsonDataString);
        // fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
        // fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

    next() {
        this.last += 1;
        const ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.saveDB();
        return `Ticket ${this.last}`;
    }

    attendTicket(desktop) {
        if(this.tickets.length === 0) {
            // return null;
            return `No more tickets`;
        }
        // <> It is another form!
        const ticketNumber = this.tickets[0].number;
        this.tickets.shift();
        const ticket = new Ticket(ticketNumber, desktop);
        this.last4.unshift(ticket);

        // <> It is another option?!
        // const ticket = new Ticket(this.tickets.shift().number, desktop);

        if(this.last4.length > 4 ) {
            this.last4.splice(-1,1);
        }

        // console.log(ticket);
        // console.log(this.last4);

        this.saveDB();
        return ticket;
    }
}

module.exports = {
    TicketControl
}; // .. {}
