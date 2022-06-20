// global variables
let searchContainer = document.querySelector("#search-container"); //switch to parent div when id is present.)
let genreInput = document.querySelector(".searchGenre");
let cityInput = document.querySelector(".searchCity");

let songSamplesContainer = document.querySelector(".sample-songs")
let searchForm = document.querySelector(".userSearch")




// take in the value of genre and city as parameters for getEventByCityAndGenre
let buttonHandler = (e) => {
  e.preventDefault();


  songSamplesContainer.innerHTML = "";
  let city = cityInput.value;
  let genre = genreInput.value;

  
  //error handling
    if (!city || !genre) {
    // modal code 
    console.log("error");
   
      
      var elems = document.querySelector('.modal');
      console.log(elems);
      // const instance = M.Modal.init(elems);
      // open the modal
      // instance.open();
      return;
 
    } else {
    getEventByCityAndGenre(city, genre)
    };
    
  searchForm.reset();

};



//search by city API
let getEventByCityAndGenre = (city, genre) => {

  let APIKey = "&apikey=MYfmJhBCLx9HATehV1SabFFOewAaaLjb"
  let APIUrl = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&classificationName=" + genre + "&size=10&city=" + city + APIKey

  // grab events info for portland - pass in genera paramater (find by data.classifications.genre.name) 
  fetch(APIUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayResults(data._embedded.events);

      })
    } else {
      throw Error(response.statusText)
    };


  }).catch((error) => {
    alert("Type in a valid city and genre")
    // do something with the songs
  })


};

// create event listener for submit button
let submitBtn = document.querySelector("#searchBtn")
submitBtn.addEventListener("click", buttonHandler,)



// SHAZAAM API, fetch by artist name, list top 3 songs
// for artists with more than one word in name, delete spaces (join characters)
function getTop3Songs(artist) {
  let apiKey = '&rapidapi-key=9cb624da72msh7d25642dc2cde6dp150056jsn019c680e11d5'
  let apiUrl = 'https://shazam.p.rapidapi.com/search?term=' + artist + '&locale=en-US&offset=0&limit=5' + apiKey;
  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      if (response.ok) {
        //for loop to get first three songs listed 
        for (i = 0; i < 3; i++) {

          //displays track name and url
          console.log(data.tracks)
          console.log(data.tracks.hits[i].track.title + " " + data.tracks.hits[i].track.url)

          //display three songs
          songListItem = document.createElement('div')
          playbtnEl = document.createElement('button')

          playbtnEl.className = "songButton"

          songSamplesContainer.appendChild(songListItem)

          // song title and artist name
          playbtnEl.innerHTML = "Play " + data.tracks.hits[i].track.title + " by " + artist

          // append button and song names
          songListItem.appendChild(playbtnEl)
          songSamplesContainer.appendChild(playbtnEl);

          // when use clicks sample song
          playbtnEl.addEventListener("click", function () {
            // new link

          })
        };
      } else {
        throw Error(response.statusText)
      };


    }).catch((error) => {
      console.log("no songs available")
      // do something with the songs
    })

  });
};

//display data in new container 
let displayResults = function (data) {
  console.log(data)
  let city = cityInput.value;
  let genre = genreInput.value;

  //create container parent
  let resultEl = document.createElement('div');
  resultEl.id = "resultEl";
  let resultTitle = document.createElement("h2"); //will this actually be a span element?
  resultTitle.textContent = genre + " Concerts in " + city;
  resultEl.appendChild(resultTitle);

  function getArtistSongs(numArtists) {
    let i = 0;

    const maximum = setInterval(() => {
      //band name

      let bandName = data[i].name;
      console.log(bandName)
      // venue
      let venue = data[i]._embedded.venues[0].name;
      // date 
      let date = data[i].dates.start.localDate;
      // time 
      let time = data[i].dates.start.localTime;

      // add list to container
      // band name list
      // event info list items

      // container for bane name and info 
      let eventEl = document.createElement('div');
      eventEl.id = "eventEl";
      let eventTitleEl = document.createElement('div');
      eventTitleEl.id = "event-title-el";
      let eventTitle = document.createElement('h3');
      eventTitle.textContent = bandName + " at " + venue + " " + date + " " + time;

      //container for buttons
      let btnContainer = document.createElement('div');  //or should this be a list?
      btnContainer.id = "btn-container";

      //call 3 play btns
      getTop3Songs(bandName);
      //append elements
      eventTitleEl.append(eventTitle);
      eventEl.append(eventTitleEl);
      eventEl.append(btnContainer);
      resultEl.append(eventEl);

      i++;

      if (i === numArtists) clearInterval(maximum);
    }, 1500)
  }

  getArtistSongs(5);

  // //ticket url

};

//add event listener to btn and link URL to play that song - do for all three songs
// add event listener to btn to link ticket URL to ticketmaster

