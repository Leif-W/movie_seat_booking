// Selecting the DOM elements and placing them into a variable
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// Populate ui based on whats in local storage
populateUI();

// Convert string of price to int
// using let because we reassign this value below
let ticketPrice = +movieSelect.value; // + to convert to int
//console.log(typeof ticketPrice);

// Save selected movie index and price
const SetMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
};

// total the number of seats selected and total the price
// depending on the movie cost
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected'); // check to see if selected seats are in node list (array)
  //console.log(selectedSeats);

  // Copy selected seats into array
  // Map through array
  // return new array of seat index's
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  //console.log(seatsIndex);

  // takes in key value pair
  // JSON.stringify to turn array to string values
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

  const selectedSeatsCount = selectedSeats.length; // check count of selected seats
  //console.log(selectedSeatsCount);

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
};


// Get data from local storage and populate ui
function populateUI() {
  // JSON.parse to turn string values back to array
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  //console.log(selectedSeats);

  // check to see if anything is in selected seats
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value
  SetMovieData(e.target.selectedIndex, e.target.value);


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

// Initial count and total set
updateSelectedCount();





