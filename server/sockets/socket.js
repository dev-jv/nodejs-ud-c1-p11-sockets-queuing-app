const colors = require('colors');

const {io} =require('../server');
const {TicketControl} = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connect', socketClient => { // "connection" event
    // ---------------------------------------------- <> Listening Events on Server > Server
    console.log('Connected client'.gray, socketClient.id);

    socketClient.on('disconnect', () => {
        console.log('Diconnected client'.brightWhite, socketClient.id);
    });

    socketClient.emit('current-state', ticketControl.last4);
    socketClient.emit('last-ticket', ticketControl.last);
    socketClient.emit('tickets-pending', ticketControl.tickets.length);

    socketClient.on('next-ticket', (payload, callback) => {
        let next = ticketControl.next();
        callback(next);

        socketClient.broadcast.emit('tickets-pending', ticketControl.tickets.length);
        // socketClient.emit('last-ticket', ticketControl.last);
        socketClient.broadcast.emit('last-ticket', ticketControl.last);
    });

    socketClient.on('attend-ticket', ({desktop}, callback) => {

        // if(!desktop) { // ...
        //     return callback({
        //         ok: false,
        //         msg: 'The desktop is obligatory!'
        //     });
        // }

        const ticket = ticketControl.attendTicket(desktop);
        socketClient.broadcast.emit('current-state', ticketControl.last4);
        socketClient.emit('tickets-pending', ticketControl.tickets.length);
        socketClient.broadcast.emit('tickets-pending', ticketControl.tickets.length);

        callback(ticket);
    });
});
