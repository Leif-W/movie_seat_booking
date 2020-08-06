// Selecting the DOM elements and placing them into a variable
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// Convert string of price to int
// using let because we reassign this value below
let ticketPrice = +movieSelect.value; // + to convert to int
//console.log(typeof ticketPrice);

// total the number of seats selected and total the price
// depending on the movie cost
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected'); // check to see if selected seats are in node list (array)
  //console.log(selectedSeats); 
  const selectedSeatsCount = selectedSeats.length; // check count of selected seats
  //console.log(selectedSeatsCount);

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

};

// Movie select event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value
  updateSelectedCount();
});

// Seat click event
// Add the event listener
// More performant to  add it to the container
// as opposed to on the seat element.
container.addEventListener('click', e => {
  //console.log(e.target); // will log any element clicked on inside the container element

  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    //console.log(e.target);
    e.target.classList.toggle('selected');
    // run this function which updates the number of
    // seats selected and the total price
    updateSelectedCount();
  }
});




