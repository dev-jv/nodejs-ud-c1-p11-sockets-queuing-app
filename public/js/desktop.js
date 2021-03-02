
// HTML references
const lblDesktop = document.querySelector('h1');
const btnAttend = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');
const lblPending = document.querySelector('#lblPending');

const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('desktop')) {
    window.location = 'index.html';
    throw new Error('The desktop is obligatory');
}

const desktop = searchParams.get('desktop');
// console.log(desktop);
lblDesktop.innerText = desktop;
divAlert.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    // console.log('Connected > Server');
    btnAttend.disabled = false;
});

socket.on('disconnect', () => {
    // console.log('Disconnected > Server');
    btnAttend.disabled = true;
});

socket.on('tickets-pending', (tickets) => {
    if ( tickets === 0 ) {
        divAlert.style.display = '';
        lblPending.innerText = '';
        btnAttend.disabled = true;
        lblTicket.innerText = '<empty>';

    } else {
        divAlert.style.display = 'none';
        btnAttend.disabled = false;
        lblPending.innerText = tickets;
    }
});

btnAttend.addEventListener('click', () => {
    // socket.emit('attend-ticket', desktop, ( ticket ) => {
    socket.emit('attend-ticket', {desktop}, ( ticket ) => {
        lblTicket.innerText = 'Ticket ' + ticket.number;
    });
});
