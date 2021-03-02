
// HTML references
const lblTicket1 = document.querySelector('#lblTicket1');
const lblDesktop1 = document.querySelector('#lblDesktop1');
const lblTicket2 = document.querySelector('#lblTicket2');
const lblDesktop2 = document.querySelector('#lblDesktop2');
const lblTicket3 = document.querySelector('#lblTicket3');
const lblDesktop3 = document.querySelector('#lblDesktop3');
const lblTicket4 = document.querySelector('#lblTicket4');
const lblDesktop4 = document.querySelector('#lblDesktop4');

let lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
let lblDesktops = [lblDesktop1, lblDesktop2, lblDesktop3, lblDesktop4];

const socket = io();

// socket.on('connect', () => {
//     console.log('Connected > Server');
// });

// socket.on('disconnect', () => {
//     console.log('Disconnected > Server');
// });

socket.on('current-state', (payload) => {

    const audio = new Audio('audio/new-ticket.mp3');
    audio.play();

    updateLast4(payload);
});

const updateLast4 = (ary) => {
    for(let i = 0; i <= ary.length-1; i++ ) {
        lblTickets[i].innerText = 'Ticket ' + ary[i].number;
        lblDesktops[i].innerText = ary[i].desktop;
    }
};
